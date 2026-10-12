// fetch-capture.mjs — capture the tailgrab.io runtime closure to fixpoint
// (PLAN §4) into the repo root (root-served origin: disk rel == served path,
// DISK_PREFIX=""). Records .upstream/capture-log.json (per-file bytes/sha256 +
// the referrer that pulled it in + the ref kind) and .upstream/manifest.json
// (Gen-A capture record over every captured file). Off-origin references
// (Google Tag Manager) stay external and are recorded, never backfilled.
//
// Method: fetch "/" as index.html, then iterate — scan every captured
// HTML/JS/CSS for script/link refs, import/import()/`new URL(...)` specifiers,
// Vite `__vite__mapDeps` tables and asset-path literals, CSS url()/@import —
// fetch every same-origin referenced-but-missing file until a scan round adds
// nothing. Genuine 404s are recorded (a stale probe name is not a capture).
// usage: node tools/fetch-capture.mjs
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const proj = path.resolve(here, "..");
const ORIGIN = "https://tailgrab.io";
const HOST = "tailgrab.io";
const UA = { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/126.0" };

const sha256 = (b) => crypto.createHash("sha256").update(b).digest("hex");
const posix = path.posix;
// Route-vs-directory collision: the origin serves an extensionless HTML route at
// /parks (200) while /parks/<code>/... is a data directory; /parks/index.html
// 404s upstream and /parks/ 308-redirects to /parks. On disk the route page is
// stored as parks/index.html so a static server reproduces it through directory
// indexing (documented layout divergence; tools/update.mjs probes it as /parks).
const ROUTE_HTML = { parks: "parks/index.html" }; // served path (no slash) -> disk rel
const diskRelOf = (servedPath) => ROUTE_HTML[servedPath.replace(/^\//, "")] || servedPath.replace(/^\//, "");
const SERVED_OF = Object.fromEntries(Object.entries(ROUTE_HTML).map(([served, disk]) => [disk, "/" + served]));
const servedOfRel = (rel) => SERVED_OF[rel] || "/" + rel;
const EXT_RE =
  /\.(js|mjs|css|png|jpe?g|webp|gif|svg|ico|bmp|avif|glb|gltf|bin|ktx2|hdr|exr|mp3|ogg|oga|wav|m4a|aac|flac|json|wasm|data|txt|xml|webmanifest|woff2?|ttf|otf|fbx|obj|drc|spz|splat|ply|zip)$/i;

// ── ref extraction ──────────────────────────────────────────────────────
function refsFromHtml(text) {
  const out = [];
  const push = (ref, kind) => out.push({ ref, kind });
  let m;
  const attr = (name) => {
    const re = new RegExp(`\\b${name}\\s*=\\s*["']([^"']+)["']`, "gi");
    let x;
    while ((x = re.exec(text))) push(x[1], name);
  };
  attr("src");
  attr("href");
  attr("poster");
  const srcsetRe = /\bsrcset\s*=\s*["']([^"']+)["']/gi;
  while ((m = srcsetRe.exec(text)))
    for (const part of m[1].split(",")) {
      const u = part.trim().split(/\s+/)[0];
      if (u) push(u, "srcset");
    }
  const metaRe = /<meta\b[^>]*>/gi;
  while ((m = metaRe.exec(text))) {
    const tag = m[0];
    const key = (/\b(?:property|name)\s*=\s*["']([^"']+)["']/i.exec(tag)?.[1] ?? "").toLowerCase();
    if (key === "og:image" || key === "twitter:image") {
      const c = /\bcontent\s*=\s*["']([^"']+)["']/i.exec(tag)?.[1];
      if (c) push(c, "meta-image");
    }
  }
  return out;
}
function refsFromCss(text) {
  const out = [];
  let m;
  const urlRe = /url\(\s*(?:"([^"]*)"|'([^']*)'|([^)'"]*))\s*\)/gi;
  while ((m = urlRe.exec(text))) {
    const u = (m[1] ?? m[2] ?? m[3] ?? "").trim();
    if (u) out.push({ ref: u, kind: "css-url" });
  }
  const impRe = /@import\s+(?:url\(\s*)?["']([^"']+)["']/gi;
  while ((m = impRe.exec(text))) out.push({ ref: m[1], kind: "css-import" });
  return out;
}
function refsFromJs(text) {
  const out = [];
  const push = (ref, kind) => out.push({ ref, kind });
  let m;
  const fromRe = /\bimport\s+[^;('"]*?\bfrom\s*["']([^"']+)["']/g;
  while ((m = fromRe.exec(text))) push(m[1], "from");
  const sideRe = /\bimport\s*["']([^"']+)["']/g;
  while ((m = sideRe.exec(text))) push(m[1], "side-effect");
  const reExpRe = /\bexport\s+[^;()]*?\bfrom\s*["']([^"']+)["']/g;
  while ((m = reExpRe.exec(text))) push(m[1], "re-export");
  const dynRe = /\bimport\s*\(\s*["']([^"']+)["']\s*\)/g;
  while ((m = dynRe.exec(text))) push(m[1], "dynamic");
  const dynTplRe = /\bimport\s*\(\s*`([^`]*)`\s*\)/g;
  while ((m = dynTplRe.exec(text))) if (!m[1].includes("${")) push(m[1], "dynamic");
  const urlRe = /\bnew\s+URL\s*\(\s*["']([^"']+)["']\s*,\s*import\.meta\.url\s*\)/g;
  while ((m = urlRe.exec(text))) push(m[1], "new-URL");
  const strRe = /["'`]([^"'`\s{}()<>]+)["'`]/g;
  while ((m = strRe.exec(text))) {
    const s = m[1];
    if (/^(data|blob|javascript|mailto|tel):/i.test(s) || s.startsWith("#")) continue;
    if (/^https?:\/\//i.test(s)) continue; // absolute URLs handled by the generic branch below
    if (s.startsWith("/") || s.startsWith("./") || s.startsWith("../") || EXT_RE.test(s)) push(s, "literal");
  }
  return out;
}

// ── resolution: ref + referrer served path -> candidate served paths ────
function candidatesFor(ref, referrerServed) {
  ref = ref.trim();
  if (!ref || /^(data|blob|javascript|mailto|tel|about):/i.test(ref) || ref.startsWith("#")) return { skip: true };
  if (ref.startsWith("//")) {
    const u = new URL("https:" + ref);
    if (u.host !== HOST) return { external: ref };
    ref = u.pathname + u.search;
  } else if (/^https?:\/\//i.test(ref)) {
    const u = new URL(ref);
    if (u.host !== HOST) return { external: ref };
    ref = u.pathname + u.search;
  }
  const pathname = ref.split("?")[0].split("#")[0];
  if (!pathname) return { skip: true };
  const norm = (p) => {
    let n = posix.normalize(p);
    if (!n.startsWith("/")) n = "/" + n;
    if (n.endsWith("/")) n += "index.html";
    return n;
  };
  const list = [];
  if (pathname.startsWith("/")) list.push(norm(pathname));
  else if (pathname.startsWith("./") || pathname.startsWith("../"))
    list.push(norm(posix.join(posix.dirname(referrerServed), pathname)));
  else {
    // Vite dep tables / asset literals are base-relative (origin root), but
    // some libraries keep referrer-relative specifiers — try base first.
    list.push(norm("/" + pathname));
    const rel = norm(posix.join(posix.dirname(referrerServed), pathname));
    if (!list.includes(rel)) list.push(rel);
  }
  return { list: [...new Set(list)] };
}

// ── fetch ───────────────────────────────────────────────────────────────
const captured = new Map(); // rel (disk == served path without leading /) -> record
const seenRefs = new Set(); // "<rel>|<ref>" dedupe of scan work
const notFound = new Map(); // candidate -> {ref, referrer}
const external = new Map(); // url -> referrer
let fetches = 0;

async function get(servedPath) {
  const url = ORIGIN + servedPath;
  const r = await fetch(url, { headers: UA, redirect: "follow" });
  fetches++;
  if (r.status !== 200) return { status: r.status, url };
  return { status: 200, url, buf: Buffer.from(await r.arrayBuffer()) };
}

function save(servedPath, buf, referrer, kind) {
  const rel = diskRelOf(servedPath);
  if (captured.has(rel)) return false;
  const abs = path.join(proj, rel.split("/").join(path.sep));
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, buf);
  captured.set(rel, { url: ORIGIN + servedPath, bytes: buf.length, sha256: sha256(buf), referrer, kind });
  console.log(`capture: ${rel} (${buf.length} B) <- ${kind} from ${referrer}`);
  return true;
}

async function tryResolve(ref, referrerServed) {
  const c = candidatesFor(ref, referrerServed);
  if (c.skip) return null;
  if (c.external) {
    if (!external.has(c.external)) external.set(c.external, referrerServed);
    return null;
  }
  for (const cand of c.list) {
    const rel = diskRelOf(cand);
    if (captured.has(rel)) return null; // already captured
    const r = await get(cand);
    if (r.status === 200) {
      save(cand, r.buf, referrerServed, refKindHint(ref));
      return rel;
    }
    if (!notFound.has(cand)) notFound.set(cand, { ref, referrer: referrerServed, status: r.status });
  }
  return null;
}
const refKindHint = (ref) => (/\.(glb|gltf|bin|ktx2|hdr|exr)$/i.test(ref) ? "asset" : "ref");

function scan(rel, buf) {
  const text = buf.toString("utf8");
  // extensionless routes (/parks) serve HTML too — sniff the content
  const isHtml = /\.html?$/i.test(rel) || /^\s*<!doctype html|<html[\s>]/i.test(text.slice(0, 512));
  const isCss = /\.css$/i.test(rel);
  const isJs = /\.(js|mjs)$/i.test(rel);
  const refs = [
    ...(isHtml ? refsFromHtml(text) : []),
    ...(isCss ? refsFromCss(text) : []),
    ...(isJs ? refsFromJs(text) : []),
    ...(isHtml ? refsFromCss(text).filter((x) => x.kind === "css-url") : []), // inline <style> blocks + style attrs
  ];
  return refs;
}

// ── dynamic asset trees ─────────────────────────────────────────────────
// Paths the build constructs at runtime behind template literals — plain
// specifier scanning cannot see the individual files. Ids are read from the
// capture's own data tables (kit.json heads, roster/skin keys, the sticker id
// list, the song table, the built-in park defs), so a refresh re-enumerates
// them from the new bytes. Candidates that 404 are recorded, not assumed.
const dynAttempted = new Set();
function dynamicTargets() {
  const out = [];
  const add = (servedPath, reason, probe = false) => {
    if (captured.has(diskRelOf(servedPath)) || dynAttempted.has(servedPath)) return;
    out.push({ servedPath, reason, probe });
  };
  const rels = [...captured.keys()];

  // skaters/kit/kit.json -> one head model per head key; skaters/clips.json
  const kitRel = rels.find((r) => /^skaters\/kit\/kit\.json$/.test(r));
  if (kitRel) {
    try {
      const kit = JSON.parse(fs.readFileSync(path.join(proj, kitRel.split("/").join(path.sep)), "utf8"));
      for (const head of Object.keys(kit.heads || {})) add(`/skaters/kit/head-${head}.glb`, "kit.json heads table");
    } catch (e) {
      console.log(`dynamic: kit.json unreadable (${e.message}) — head models skipped`);
    }
    const rigRels = rels.filter((r) => /^assets\/skaterRig-.*\.js$/.test(r));
    if (rigRels.some((r) => fs.readFileSync(path.join(proj, r.split("/").join(path.sep)), "utf8").includes("skaters/clips.json")))
      add("/skaters/clips.json", "skaterRig loader (${lt}skaters/clips.json)");
  }
  // roster + secret-skin keys -> portraits
  const keySources = [
    ...rels.filter((r) => /^assets\/skaters-.*\.js$/.test(r)),
    ...rels.filter((r) => /^assets\/secrets-.*\.js$/.test(r)),
  ];
  for (const r of keySources) {
    const text = fs.readFileSync(path.join(proj, r.split("/").join(path.sep)), "utf8");
    for (const m of text.matchAll(/key:\`([a-z][a-z0-9\-]{2,30})\`/g)) add(`/skaters/portraits/${m[1]}.png`, `roster key in ${r}`);
  }
  // sticker ids — three sources: the pack id list in the stickers chunk,
  // declared `sticker:`/`icon:` UI fields (render through the sticker URL
  // builder), and the ids the live UI was observed requesting in the
  // 2026-10-13 network-log cross-check (the counter/pill icons come from
  // direct builder calls a static scan cannot see). Id-array probing is
  // heuristic — its misses are tagged `probe`, not treated as references.
  const stickRel = rels.find((r) => /^assets\/stickers-.*\.js$/.test(r));
  if (stickRel) {
    const text = fs.readFileSync(path.join(proj, stickRel.split("/").join(path.sep)), "utf8");
    const arr = /\[\s*((?:\`[a-z0-9\-]+\`\s*,?\s*)+)\]/.exec(text);
    if (arr) for (const m of arr[1].matchAll(/`([a-z0-9\-]+)`/g)) add(`/stickers/${m[1]}.webp`, `sticker id list in ${stickRel}`);
  }
  for (const r of rels.filter((x) => /^assets\/.*\.js$/.test(x))) {
    const text = fs.readFileSync(path.join(proj, r.split("/").join(path.sep)), "utf8");
    for (const m of text.matchAll(/(?:sticker|icon):\`([a-z][a-z0-9\-]{1,20})\`/g))
      add(`/stickers/${m[1]}.webp`, `UI icon/sticker id in ${r}`);
    if (text.includes("stickers/"))
      for (const arr of text.matchAll(/\[\s*((?:\`[a-z][a-z0-9\-]{1,20}\`\s*,\s*){3,}\`[a-z][a-z0-9\-]{1,20}\`\s*,?\s*)\]/g))
        for (const m of arr[1].matchAll(/`([a-z][a-z0-9\-]{1,20})`/g)) add(`/stickers/${m[1]}.webp`, `id-array probe in ${r}`, true);
  }
  for (const id of [
    "star", "trophy", "spray", "oops", "letters", "horseshoe", "hand-you",
    "hand-shake", "hand-point", "hand-palm", "hand-horns", "hand-clap",
    "flame", "coin", "board",
  ])
    add(`/stickers/${id}.webp`, "runtime-observed sticker id (network-log cross-check 2026-10-13)");
  // song files
  const songsRel = rels.find((r) => /^assets\/songs-.*\.js$/.test(r));
  if (songsRel) {
    const text = fs.readFileSync(path.join(proj, songsRel.split("/").join(path.sep)), "utf8");
    for (const m of text.matchAll(/file:\`((?:\.\/)?[^\`]+\.(?:mp3|ogg|wav))\`/g)) add("/" + m[1].replace(/^\.\//, ""), `song table in ${songsRel}`);
  }
  // props.glb + sedgwick font (single known paths, guarded by their chunk)
  for (const r of rels.filter((x) => /^assets\/decor-.*\.js$/.test(x))) {
    const text = fs.readFileSync(path.join(proj, r.split("/").join(path.sep)), "utf8");
    if (text.includes("props/props.glb")) add("/props/props.glb", `decor loader (${r})`);
  }
  for (const r of rels.filter((x) => /^assets\/tagPaint-.*\.js$/.test(x))) {
    const text = fs.readFileSync(path.join(proj, r.split("/").join(path.sep)), "utf8");
    if (text.includes("fonts/sedgwick-ave-display.woff2")) add("/fonts/sedgwick-ave-display.woff2", `tagPaint FontFace (${r})`);
  }
  // built-in park ids -> park models / thumbs (candidates; real 404s land in the log)
  for (const r of rels.filter((x) => /^assets\/(parks|parkModel)-.*\.js$/.test(x))) {
    const text = fs.readFileSync(path.join(proj, r.split("/").join(path.sep)), "utf8");
    const seen = new Set();
    for (const m of text.matchAll(/id:\`([a-z][a-z0-9\-]*)\`,\s*name:\`[^\`]*\`,\s*(?:half|pieces|spawns|size|range|rect|modes):/g)) seen.add(m[1]);
    for (const id of seen) {
      add(`/parks/${id}.glb`, `built-in park def in ${r}`);
      add(`/parks/thumbs/${id}.webp`, `built-in park thumb in ${r}`);
    }
  }
  return out;
}

async function main() {
  console.log(`closure capture from ${ORIGIN} (root-served; disk rel == served path)`);
  // entry: "/" is the site root; saved as index.html
  const entry = await get("/");
  if (entry.status !== 200) throw new Error(`entry fetch failed: HTTP ${entry.status}`);
  fs.writeFileSync(path.join(proj, "index.html"), entry.buf);
  captured.set("index.html", {
    url: ORIGIN + "/",
    bytes: entry.buf.length,
    sha256: sha256(entry.buf),
    referrer: "(origin root)",
    kind: "entry",
  });
  console.log(`capture: index.html (${entry.buf.length} B) <- entry from ${ORIGIN}/`);
  // stale route-file at the repo root from earlier runs (route page now lives at parks/index.html)
  if (fs.existsSync(path.join(proj, "parks")) && fs.statSync(path.join(proj, "parks")).isFile()) {
    fs.rmSync(path.join(proj, "parks"));
    console.log("capture: removed stale root file parks (route page now parks/index.html)");
  }

  let round = 0;
  let progress = true;
  while (progress) {
    progress = false;
    let added = true;
    while (added) {
      added = false;
      round++;
      const work = [...captured.entries()].filter(
        ([rel]) => /\.(html|js|mjs|css)$/i.test(rel) || !rel.includes("."),
      );
      let scanned = 0;
      for (const [rel, rec] of work) {
        const served = servedOfRel(rel);
        const buf = fs.readFileSync(path.join(proj, rel.split("/").join(path.sep)));
        for (const { ref, kind } of scan(rel, buf)) {
          const key = rel + "|" + ref + "|" + kind;
          if (seenRefs.has(key)) continue;
          seenRefs.add(key);
          const got = await tryResolve(ref, served);
          if (got) added = true;
        }
        scanned++;
      }
      console.log(`round ${round}: scanned ${scanned} file(s), captured now ${captured.size}`);
      if (added) progress = true;
    }
    // dynamic trees: enumerate runtime-built paths from the captured data tables
    const dyn = dynamicTargets();
    if (dyn.length) console.log(`dynamic: ${dyn.length} candidate runtime path(s) to try`);
    for (const { servedPath, reason, probe } of dyn) {
      dynAttempted.add(servedPath);
      const r = await get(servedPath);
      if (r.status === 200) {
        save(servedPath, r.buf, reason, "dynamic-tree");
        progress = true;
      } else if (!notFound.has(servedPath)) {
        notFound.set(servedPath, { ref: servedPath, referrer: reason, status: r.status, probe: probe === true });
        if (probe !== true) console.log(`dynamic 404: ${servedPath} (${reason})`);
      }
    }
  }

  // ── records ───────────────────────────────────────────────────────────
  const generated = new Date().toISOString();
  const log = {
    generated,
    origin: ORIGIN,
    method:
      "closure-to-fixpoint: fetch / as index.html, then scan every captured HTML/JS/CSS for " +
      "script/link/srcset refs, meta og:image/twitter:image, import/import()/new URL(...,import.meta.url) " +
      "specifiers, Vite __vite__mapDeps + asset-path literals, CSS url()/@import; fetch every same-origin " +
      "referenced-but-missing file until a scan round adds nothing (PLAN §4).",
    rounds: round,
    fetches,
    files: Object.fromEntries([...captured.entries()].sort((a, b) => a[0].localeCompare(b[0]))),
    external: [...external.entries()].map(([url, referrer]) => ({ url, referrer, note: "off-origin — stays external, never backfilled" })),
    notFound: [...notFound.entries()].map(([pathname, v]) => ({
      pathname,
      ref: v.ref,
      referrer: v.referrer,
      status: v.status,
      probe: v.probe === true,
      note: v.probe === true ? "heuristic id-array probe miss — not a runtime reference" : "declared reference that 404s upstream",
    })),
  };
  fs.mkdirSync(path.join(proj, ".upstream"), { recursive: true });
  fs.writeFileSync(path.join(proj, ".upstream", "capture-log.json"), JSON.stringify(log, null, 2) + "\n");

  const manifest = {
    generated,
    origin: ORIGIN,
    files: Object.fromEntries(
      [...captured.entries()].sort((a, b) => a[0].localeCompare(b[0])).map(([rel, r]) => [rel, { bytes: r.bytes, sha256: r.sha256 }]),
    ),
  };
  fs.writeFileSync(path.join(proj, ".upstream", "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
  const totalBytes = [...captured.values()].reduce((n, r) => n + r.bytes, 0);
  console.log(`done: ${captured.size} files, ${totalBytes} bytes, ${round} scan round(s), ${fetches} fetch(es)`);
  if (notFound.size) {
    const genuine = [...notFound.values()].filter((v) => v.probe !== true);
    const probeMiss = [...notFound.values()].filter((v) => v.probe === true);
    console.log(`referenced-but-404: ${genuine.length} declared, ${probeMiss.length} probe miss(es)`);
    for (const v of genuine) console.log(`  404 ${v.ref}  (from ${v.referrer})`);
  }
  if (external.size) {
    console.log(`external (${external.size}):`);
    for (const [u, r] of external) console.log(`  ext ${u}  (from ${r})`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
