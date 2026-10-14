// derive.mjs — rebuild the derived layers (readable/ + src/ + split-spec.json)
// from the tailgrab capture (PLAN §3/§5). Tailgrab (https://tailgrab.io/) is
// capture-class: a Vite production build of a free multiplayer skateboarding
// game (THPS-inspired, three.js + Colyseus), root-served by Cloudflare. The
// live backend (Colyseus matchmaking/auth) stays external — the mirror is the
// client. §0.4 fork-over-mirror was checked on 2026-10-13 — no upstream
// repository is referenced anywhere in the capture (the page credits its
// author but publishes no source repo), so the mirror stands. The capture is
// untouched; every source file is re-hashed against .upstream/manifest.json
// before it is rendered, so a drifted capture fails loudly instead of being
// silently re-derived.
//
// Structure (PLAN §5, 2026-10-14): the served path is the truth. A captured
// file at assets/main-CzsUDvlE.js derives to
// readable/assets/main-CzsUDvlE.pretty.js and slices to
// src/assets/main-CzsUDvlE-NN.js — real subdirectories, served file names
// (hash included); the __-flattening of the first cut is gone (it lives in
// legacy/2026-10-14/).
//
// Rename layer (PLAN §5, campaign run 2026-10-14): rename-map.json is the
// RECORDED semantic rename map (recovered from the committed slices by
// tools/recover-scoped-map.mjs). Every slice is cut as `applyRecordedMap(range,
// record)` (index-validated by tools/engine/rename-layer.mjs), so derive →
// committed slices is deterministic; a slice with no record is cut verbatim.
// The authored rules from tools/names.json that actually fired are recorded
// per source in split-spec.json as `renameBindings` for the reconstruction
// gates. Vendor/machinery regions are never renamed and carry no records.
//
// Pipeline:
//   each capture assets/*.js -> pinned prettier 3.9.6 (module API — the CLI
//                        respects .gitignore and can silently echo its input),
//                        single pass (deterministic from the capture; one chunk is not
//                        a prettier fixed point — flagged per source) -> readable/assets/<name>.pretty.js
//                        (capture-relative path kept, never flattened).
//   fonts/fonts.css    -> readable/fonts/fonts.pretty.css, wholeFile section.
//   vendor chunks      -> readable/ + wholeFile section (vendor rule): the
//                        three.js r186 core build, the GLTFLoader (DRACO/KTX2/
//                        meshopt) and OrbitControls addons, the lil-gui build,
//                        the Colyseus SDK client, and the Vite modulepreload
//                        polyfill (build machinery) are indexed whole, never
//                        sliced.
//   the toon chunk     -> mixed: its tail carries the app's toon material,
//                        but its body is the minifier-merged three.js r186
//                        WebGLRenderer bundle. The vendor region is
//                        content-anchored (statements 2..the `Xr = { uSlab … }`
//                        statement, which merges the renderer class and the
//                        app's uniform record into one var statement) and
//                        asserted; the app imports and the toon material tail
//                        are sliced. A missing anchor fails the run.
//   app chunks         -> statement-aligned slices src/assets/<name>-NN.js at
//                        top-level declaration boundaries, ~250-350 line
//                        windows (oversized single declarations stay whole),
//                        exact 2-line provenance header (served tag, no
//                        __-flattening); every slice is re-cut through the
//                        recorded rename map, parse-checked with `node
//                        --input-type=module --check -` and round-trips
//                        byte-exact to its readable line range.
//   entry documents    -> inline <script>/<style> scan (byte ranges + sha256):
//                        index.html carries an inline critical <style>, an
//                        inline gtag bootstrap and a typed application/ld+json
//                        data block (data, not code — recorded, no twin);
//                        parks/index.html (the stored /parks route page)
//                        carries an inline <style>. Twins are named after
//                        their document's served path (readable/<dir>/<doc>-inline-N.pretty.*).
//
// Non-standalone parts are indexed but never sliced (skipped sections): each
// app chunk's final `export {…}` table (the bindings live in the earlier
// slices). The PLAN §5 identifier rename campaign runs through
// tools/apply-names.mjs -> tools/recover-scoped-map.mjs; this file re-applies
// the recorded map. usage:
//   node tools/derive.mjs
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { spawnSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";
import { applyRecordedMap } from "./engine/rename-layer.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const proj = path.resolve(here, "..");
const PINNED = "3.9.6";
const MIN_WINDOW = 250;
const MAX_WINDOW = 350;
const TODAY = "2026-10-14";
const ROOT = ""; // root-served capture: served path == disk rel

const sha256 = (buf) => crypto.createHash("sha256").update(buf).digest("hex");
const readLines = (abs) => {
  const t = fs.readFileSync(abs, "utf8");
  const l = t.split("\n");
  if (l.length && l[l.length - 1] === "") l.pop();
  return l;
};
const linesOf = (text) => text.replace(/\n$/, "").split("\n");
const lineOf = (text, offset) => text.slice(0, offset).split("\n").length;

// capture-relative path -> served tag (path kept, extension dropped): the
// served path IS the derived name — assets/main-CzsUDvlE.js -> assets/main-CzsUDvlE
const tagOf = (capRel) => {
  const rel = capRel.startsWith(ROOT) ? capRel.slice(ROOT.length) : capRel;
  return rel.replace(/\.(js|css)$/i, "");
};
const prettyRelFor = (capRel) =>
  "readable/" + capRel.replace(/\.(js|css)$/i, "") + (/\.css$/i.test(capRel) ? ".pretty.css" : ".pretty.js");
// write a derived file, creating the served subdirectories as needed
const writeDerived = (relPosix, text) => {
  const abs = path.join(proj, ...relPosix.split("/"));
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, text);
};

// ── recorded rename map (optional input; see engine header) ─────────────
function loadRenameMap() {
  const p = path.join(proj, "rename-map.json");
  if (!fs.existsSync(p)) return { files: {}, scoped: {}, present: false };
  const rm = JSON.parse(fs.readFileSync(p, "utf8"));
  return { files: rm.files || {}, scoped: rm.scoped || {}, present: true };
}
const recordsFor = (rm, file) => {
  const files = rm.files[file];
  const scoped = rm.scoped[file];
  if (!files && !scoped) return null;
  return { files, scoped };
};
// The authored binding map (tools/names.json): chunk capture rel -> {old: new}
// for the chunk's top-level bindings. Recorded into split-spec per source as
// `renameBindings` (only the rules that actually fired) so the reconstruction
// gates can re-read every recorded rename.
function loadNames() {
  const p = path.join(here, "names.json");
  if (!fs.existsSync(p)) return {};
  const all = JSON.parse(fs.readFileSync(p, "utf8"));
  const out = {};
  for (const [k, v] of Object.entries(all)) if (!k.startsWith("__")) out[k] = v.renames || v;
  return out;
}

// ── pinned prettier (module API, exactly 3.9.6) ─────────────────────────
async function loadPrettier() {
  const candidates = [
    process.env.PRETTIER_MJS,
    path.join(proj, "node_modules", "prettier", "index.mjs"),
    "D:/repos/mirrors/metropolygonia/node_modules/prettier/index.mjs",
  ].filter(Boolean);
  for (const c of candidates) {
    if (!fs.existsSync(c)) continue;
    try {
      const pkg = JSON.parse(fs.readFileSync(path.join(path.dirname(c), "package.json"), "utf8"));
      if (pkg.version !== PINNED) continue;
      const mod = (await import(pathToFileURL(c).href)).default;
      if (mod.version === PINNED) return { mod, at: c };
    } catch {
      /* try next */
    }
  }
  throw new Error(`pinned prettier ${PINNED} not found (set PRETTIER_MJS to its index.mjs)`);
}

// single pass, verified deterministic: prettier.format(capture) must reproduce
// byte-exact, so audit's one-pass re-render is byte-exact by construction. One
// chunk (preload-helper-DR1MrGPZ) is NOT a prettier fixed point — a member
// chain prettier joins only on a second pass — so the idempotency flag is
// recorded per source instead of asserted; the stored pretty is still the
// deterministic single-pass rendering audit re-renders.
async function formatOnce(prettier, text, parser) {
  const out = await prettier.format(text, { parser });
  if ((await prettier.format(text, { parser })) !== out)
    throw new Error(`prettier ${parser} is not deterministic on this input`);
  const again = await prettier.format(out, { parser });
  return { out, idempotent: again === out };
}

// ── parse check: the exact standalone gate (ESM stdin) ──────────────────
function parses(text) {
  const r = spawnSync(process.execPath, ["--input-type=module", "--check", "-"], {
    input: text,
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });
  return { ok: r.status === 0, why: (r.stderr || "").trim().split("\n").slice(-3).join(" | ") };
}

// ── markers for titles (top tokens, lowercase; fleet convention) ────────
const STOP = new Set(
  ("function return typeof undefined object string number boolean prototype length value default " +
    "exports import this that with from then else case break continue delete instanceof constructor " +
    "arguments void null true false call apply name type text target window document globalthis self " +
    "require module async await yield static class const let var new for while switch throw try catch " +
    "finally extends super using debugger of in do if has own hasown get set")
    .split(" ")
    .filter(Boolean),
);
function markers(text, n = 2) {
  // URLs/identifiers living inside string literals (import paths, asset names)
  // are not code tokens — strip quoted strings before counting
  const code = text.replace(/`[^`]*`|"[^"\n]*"|'[^'\n]*'/g, " ");
  const counts = new Map();
  for (const m of code.matchAll(/[A-Za-z][A-Za-z0-9_]{2,}/g)) {
    const w = m[0].toLowerCase();
    if (STOP.has(w)) continue;
    counts.set(w, (counts.get(w) || 0) + 1);
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, n);
}
const markerText = (ms) => ms.map(([w, c]) => `${w}(${c})`).join(", ");

// ── windowize: cut only at statement starts; ≤350 lines, a single ───────
// ── oversized declaration is a window of its own ────────────────────────
function windowize(stmts) {
  const out = [];
  let cur = null;
  for (const s of stmts) {
    if (!cur) {
      cur = { first: s, last: s, count: 1, startLine: s.startLine, endLine: s.endLine };
      continue;
    }
    const projected = s.endLine - cur.startLine + 1;
    if (projected > MAX_WINDOW) {
      out.push(cur);
      cur = { first: s, last: s, count: 1, startLine: s.startLine, endLine: s.endLine };
    } else {
      cur.last = s;
      cur.count++;
      cur.endLine = s.endLine;
    }
  }
  if (cur) out.push(cur);
  return out;
}

// ── inline block scan (byte-exact, over the raw entry buffer) ───────────
function scanBlocks(buf) {
  const blocks = [];
  for (const [open, close, kind] of [
    ["<script", "</script", "script"],
    ["<style", "</style", "style"],
  ]) {
    let p = 0;
    let n = 0;
    while (true) {
      const i = buf.indexOf(open, p);
      if (i < 0) break;
      const after = buf[i + open.length];
      const boundary =
        after === 0x3e || after === 0x2f || after === 0x20 || after === 0x09 || after === 0x0a || after === 0x0d;
      if (!boundary) {
        p = i + open.length;
        continue;
      }
      const tagEnd = buf.indexOf(">", i);
      if (tagEnd < 0) break;
      const j = buf.indexOf(close, tagEnd + 1);
      if (j < 0) throw new Error(`unterminated <${kind}> opened at byte ${i}`);
      const tag = buf.subarray(i, tagEnd + 1).toString("utf8");
      const external = /\bsrc\s*=\s*["']/i.test(tag);
      if (external) {
        blocks.push({ kind, external: true, tag, openStart: i, contentStart: tagEnd + 1, contentEnd: j });
      } else {
        n++;
        const content = buf.subarray(tagEnd + 1, j);
        blocks.push({
          kind: /\btype\s*=\s*["']importmap["']/i.test(tag) ? "importmap" : kind,
          external: false,
          block: n,
          tag,
          openStart: i,
          contentStart: tagEnd + 1,
          contentEnd: j,
          bytes: content.length,
          sha256: sha256(content),
          text: content.toString("utf8"),
        });
      }
      p = j + close.length;
    }
  }
  return blocks.sort((a, b) => a.openStart - b.openStart);
}

// ── curated content-anchored classification (guards fail loudly) ────────
// Vendor rule (PLAN §1): third-party builds are indexed whole in readable/,
// never sliced or rewritten.
const WHOLE_FILE = {
  "assets/three.core-DVWDmH0S": {
    title: "assets/three.core-DVWDmH0S — three.js r186 core build (vendor, whole-file, never sliced)",
    desc:
      "The bundled three.js r186 core build (constants, math (Vector3/Matrix4/Quaternion), BufferGeometry, " +
      "textures, materials, scene graph, loaders' shared machinery, the `window.__THREE__` revision 186 " +
      "registration) — the renderer itself is split into the toon chunk by the build. Vendor, not app code. " +
      "Vendor rule — indexed whole-file in readable/, never sliced or rewritten.",
    guard: (t) => /__THREE__/.test(t) && /`186`/.test(t) && /isVector3/.test(t) && /isBufferGeometry/.test(t),
    what: "three.js r186 core build",
  },
  "assets/GLTFLoader-BAb7LzOS": {
    title: "assets/GLTFLoader-BAb7LzOS — three.js GLTFLoader addon (vendor, whole-file, never sliced)",
    desc:
      "The bundled three.js examples/jsm GLTFLoader with its KHR_* extension callbacks plus the DRACO mesh " +
      "compression path, the KTX2 texture loader hook and the meshopt decoder hook — vendor, not app code. " +
      "Vendor rule — indexed whole-file in readable/, never sliced or rewritten.",
    guard: (t) => /GLTFLoader/.test(t) && /DRACOLoader|DRACO/.test(t) && /KTX2Loader|KTX2/.test(t) && /meshopt/i.test(t),
    what: "three.js GLTFLoader addon (DRACO/KTX2/meshopt)",
  },
  "assets/OrbitControls-CQWqkYLs": {
    title: "assets/OrbitControls-CQWqkYLs — three.js OrbitControls addon (vendor, whole-file, never sliced)",
    desc:
      "The bundled three.js examples/jsm OrbitControls (camera orbit/dolly/pan with pointer + touch handling) " +
      "used by the park viewer — vendor, not app code. Vendor rule — indexed whole-file in readable/, never " +
      "sliced or rewritten.",
    guard: (t) => /OrbitControls/.test(t) && /DEG2RAD/.test(t) && /dolly/i.test(t),
    what: "three.js OrbitControls addon",
  },
  "assets/lil-gui.esm-uYN4JE7y": {
    title: "assets/lil-gui.esm-uYN4JE7y — lil-gui build (vendor, whole-file, never sliced)",
    desc:
      "The bundled lil-gui control panel library (Controller/BooleanController/… with its DOM controller tree) " +
      "used by the park viewer's debug UI — vendor, not app code. Vendor rule — indexed whole-file in " +
      "readable/, never sliced or rewritten.",
    guard: (t) => /lil-gui/.test(t) && /domElement/.test(t) && /gui/i.test(t),
    what: "lil-gui build",
  },
  "assets/Client-CpE02kO_": {
    title: "assets/Client-CpE02kO_ — Colyseus SDK client (vendor, whole-file, never sliced)",
    desc:
      "The bundled Colyseus multiplayer SDK client (Room/Client transport, schema encoding via @colyseus/schema, " +
      "the /matchmake + /auth HTTP/WS handshake) that talks to the game's live backend — vendor, not app code; " +
      "the backend itself is external (see README). Vendor rule — indexed whole-file in readable/, never sliced " +
      "or rewritten.",
    guard: (t) => /matchmake/.test(t) && /colyseus/i.test(t),
    what: "Colyseus SDK client",
  },
  "assets/modulepreload-polyfill-P2Xu9kJm": {
    title: "assets/modulepreload-polyfill-P2Xu9kJm — Vite modulepreload polyfill (build machinery, whole-file, never sliced)",
    desc:
      "The Vite-generated modulepreload polyfill (`link[rel=modulepreload]` relList.supports check + " +
      "MutationObserver fetch warm-up) — build machinery, not app code. Indexed whole-file in readable/, never " +
      "sliced.",
    guard: (t) => /modulepreload/.test(t) && /MutationObserver/.test(t) && /relList/.test(t),
    what: "Vite modulepreload polyfill",
  },
};
const VENDOR_TAGS = new Set(Object.keys(WHOLE_FILE));
const TOON_TAG = "assets/toon-CycGToy9";

async function main() {
  const { mod: prettier, at } = await loadPrettier();
  console.log(`pinned prettier ${PINNED} (${at})`);

  const manifest = JSON.parse(fs.readFileSync(path.join(proj, ".upstream", "manifest.json"), "utf8"));
  const captured = Object.keys(manifest.files).map((r) => r.split(path.sep).join("/")).sort();
  const captureBytes = (rel) => {
    const abs = path.join(proj, rel);
    if (!fs.existsSync(abs)) throw new Error(`capture file missing: ${rel}`);
    const buf = fs.readFileSync(abs);
    if (sha256(buf) !== manifest.files[rel].sha256)
      throw new Error(`${rel} on disk does not match .upstream/manifest.json — re-verify the capture first`);
    return buf;
  };

  const readableDir = path.join(proj, "readable");
  const srcDir = path.join(proj, "src");
  fs.mkdirSync(readableDir, { recursive: true });
  fs.mkdirSync(srcDir, { recursive: true });
  const written = { readable: new Set(), src: new Set() };

  // recorded rename layer + authored worklist (see header)
  const renameMap = loadRenameMap();
  if (renameMap.present)
    console.log(
      `rename map: ${Object.keys(renameMap.files).length} word-boundary file(s), ${Object.keys(renameMap.scoped).length} indexed file(s)`,
    );
  const names = { byCapture: loadNames() };
  let renamedFiles = 0;
  let renamedNames = 0;
  let renamedOccurrences = 0;

  const sources = [];
  const sections = [];
  const notRendered = [];
  const notIdempotent = [];
  let inlineFiles = [];
  let slicedTotal = 0;
  let skippedTotal = 0;

  const jsRelsAll = captured.filter((r) => /\.js$/i.test(r));
  const cssRels = captured.filter((r) => /\.css$/i.test(r));
  const htmlRels = captured.filter((r) => /\.html$/i.test(r));
  // reading order: the entry chunk first, then the app chunks, then vendor
  const rank = (rel) => {
    const tag = tagOf(rel);
    if (tag === "assets/main-CzsUDvlE") return 0;
    if (VENDOR_TAGS.has(tag)) return 2;
    return 1;
  };
  const jsRels = jsRelsAll.slice().sort((a, b) => rank(a) - rank(b) || a.localeCompare(b));
  const isVendor = (rel) => VENDOR_TAGS.has(tagOf(rel));

  // non-code payloads ride along in the manifest but are never rendered
  for (const rel of captured) {
    if (/\.(js|css|html)$/i.test(rel)) continue;
    const buf = captureBytes(rel);
    notRendered.push({
      capture: rel,
      kind: "payload",
      bytes: buf.length,
      sha256: sha256(buf),
      rendered: false,
      reason: "non-code payload — recorded with bytes + sha256, no pretty/slice pass",
    });
  }

  // ── 1) JS: vendor -> wholeFile; app -> statement-aligned slices ─────────
  for (const rel of jsRels) {
    const buf = captureBytes(rel);
    const text = buf.toString("utf8");
    if (!Buffer.from(text, "utf8").equals(buf)) throw new Error(`${rel} does not round-trip through utf8`);
    const { out: pretty, idempotent } = await formatOnce(prettier, text, "babel");
    if (!idempotent) notIdempotent.push(rel);
    if (pretty === text)
      throw new Error(`${rel}: prettier output is byte-identical to the capture — nothing to derive`);
    const sourceFile = prettyRelFor(rel);
    writeDerived(sourceFile, pretty);
    written.readable.add(sourceFile);
    const lines = linesOf(pretty);
    const tag = tagOf(rel);
    const cls = WHOLE_FILE[tag];

    if (cls) {
      if (cls.guard && !cls.guard(pretty))
        throw new Error(`${rel}: whole-file guard failed — readable changed shape`);
      sections.push({
        file: `${tag}-vendor.js`,
        wholeFile: true,
        title: cls.title,
        desc: `Lines 1-${lines.length} of ${sourceFile}: ${cls.desc}`,
        note: "whole-file (vendor rule): indexed in readable/, never sliced",
        startLine: 1,
        endLine: lines.length,
        sourceFile,
      });
      sources.push({
        sourceFile,
        capture: rel,
        captureKind: "file",
        captureSha256: manifest.files[rel].sha256,
        captureBytes: buf.length,
        prettyLines: lines.length,
        prettyBytes: Buffer.byteLength(pretty, "utf8"),
        prettyPasses: 1,
        idempotent,
        tag,
        slices: 0,
        derived: "readable only (vendor bundle, wholeFile)",
        what: cls.what,
      });
      console.log(`derive: ${rel} -> ${sourceFile} (${lines.length} lines, wholeFile vendor)`);
      continue;
    }

    // ── app chunk: statement-aligned slicing ────────────────────────────
    const dbg = await prettier.__debug.parse(pretty, { parser: "babel" });
    const top = (dbg.ast.program || dbg.ast).body;
    const stmts = top.map((n) => ({
      node: n,
      startLine: lineOf(pretty, n.start),
      endLine: lineOf(pretty, n.end),
      text: pretty.slice(n.start, n.end),
    }));
    for (let i = 1; i < stmts.length; i++)
      if (stmts[i].startLine <= stmts[i - 1].endLine)
        throw new Error(`${rel}: statements ${i - 1}/${i} share a line — cannot slice at line boundaries`);

    const specials = [];
    const covered = new Array(stmts.length).fill(false);
    const claim = (a, b, block) => {
      if (a < 0 || b < a || b >= stmts.length) throw new Error(`${rel}: bad ${block.file} range ${a}-${b}`);
      for (let i = a; i <= b; i++) {
        if (covered[i]) throw new Error(`${rel}: ${block.file} overlaps another block at statement ${i}`);
        covered[i] = true;
      }
      specials.push({ ...block, A: stmts[a].startLine, B: stmts[b].endLine });
    };

    if (tag === TOON_TAG) {
      // statements 0-1: the app's imports of the three.js core build and the palette
      if (!/three\.core-DVWDmH0S\.js/.test(stmts[0].text))
        throw new Error(`${rel}: first statement is not the three.core import — readable changed shape`);
      // the minifier-merged three.js r186 WebGLRenderer bundle: statements 2..the
      // statement that merges the renderer class with the app's `Xr = { uSlab … }`
      // uniform record (content-anchored, guarded and asserted)
      if (stmts.length < 10 || !/setAnimationLoop/.test(stmts[2].text))
        throw new Error(`${rel}: vendor region start anchor (WebGLAnimation) not found`);
      const vendEnd = stmts.findIndex((s, i) => i > 2 && /uSlab/.test(s.text) && /__THREE_DEVTOOLS__/.test(s.text));
      if (vendEnd < 0) throw new Error(`${rel}: vendor region end anchor (renderer class + uSlab record) not found`);
      const regionText = lines.slice(stmts[2].startLine - 1, stmts[vendEnd].endLine).join("\n");
      for (const [re, what] of [
        [/WebGLRenderer:/, "WebGLRenderer warning strings"],
        [/THREE\.WebGLRenderer/, "THREE.WebGLRenderer error label"],
        [/__THREE_DEVTOOLS__/, "WebGLRenderer class (devtools hook)"],
        [/DFG_LUT/, "PMREM DFG LUT"],
        [/getShadow\(/, "shadow-map shader chunk glue"],
        [/uSlab/, "app uniform record merged into the same var statement"],
      ])
        if (!re.test(regionText)) throw new Error(`${rel}: vendor region guard failed (${what}) — readable changed shape`);
      claim(2, vendEnd, {
        kind: "whole",
        file: `${tag}-three-vendor.js`,
        title: `${tag} — bundled three.js r186 WebGLRenderer bundle (vendor region, whole-file, never sliced)`,
        body:
          "the minifier-merged three.js r186 renderer bundle the build inlined into this chunk (WebGLAnimation, " +
          "WebGLAttributes/BindingStates/Geometries/Objects/Programs/State/Textures/Uniforms, PMREM " +
          "DFG_LUT/CubeUV generation, shadow-map shader chunks, WebGLRenderer itself with its " +
          "`WebGLRenderer:` warning strings and `THREE.WebGLRenderer` error labels, `window.__THREE__` " +
          "consumption) — vendor, not app code. The region ends where the minifier merged the renderer class " +
          "with the app's `Xr = { uSlab … }` toon uniform record in one var statement; that statement stays in " +
          "the vendor region whole (statement-aligned cuts cannot split inside it). Vendor rule — indexed " +
          "whole-file in readable/, never sliced or rewritten.",
      });
    }

    let exportSkip = null;
    const lastStmt = stmts[stmts.length - 1];
    if (
      lastStmt &&
      lastStmt.node.type === "ExportNamedDeclaration" &&
      !covered[stmts.length - 1] &&
      /^export\s*\{[\s\S]*\}\s*;?$/.test(lastStmt.text.trim()) &&
      !/\bfrom\b/.test(lastStmt.text)
    ) {
      claim(stmts.length - 1, stmts.length - 1, {
        kind: "skip",
        file: `${tag}-tail-export.js`,
        title: `${tag} — final export table (not sliced)`,
        desc: `Lines ${lastStmt.startLine}-${lastStmt.endLine}. The chunk's final export {…} table — the exported bindings live in the earlier slices; a standalone tail carries no new statements, so it is indexed only.`,
      });
    }

    // runs of uncovered statements -> windows
    const runs = [];
    for (let i = 0; i < stmts.length; i++) {
      if (covered[i]) continue;
      const run = [stmts[i]];
      while (i + 1 < stmts.length && !covered[i + 1]) run.push(stmts[++i]);
      runs.push(run);
    }
    const slices = [];
    for (const run of runs) for (const w of windowize(run)) slices.push(w);

    // blocks in line order, then re-tile so every line of the pretty is owned
    const blocks = [...specials, ...slices.map((w) => ({ kind: "slice", A: w.startLine, B: w.endLine, count: w.count }))];
    blocks.sort((a, b) => a.A - b.A);
    for (let i = 0; i < blocks.length; i++) {
      if (i === 0) blocks[i].A = 1;
      if (i + 1 < blocks.length) blocks[i].B = blocks[i + 1].A - 1;
      else blocks[i].B = lines.length;
    }

    let nn = 0;
    let perFileSkipped = 0;
    let perFileVendor = 0;
    let perFileRenamed = 0;
    const targetsByOld = new Map(); // rename map: old name -> Set(targets) seen in this chunk's slices
    const noteTarget = (old, target) => {
      if (!targetsByOld.has(old)) targetsByOld.set(old, new Set());
      targetsByOld.get(old).add(target);
    };
    for (const b of blocks) {
      if (b.kind === "slice") {
        nn++;
        const num = String(nn).padStart(2, "0");
        const file = `${tag}-${num}.js`;
        const rawBody = lines.slice(b.A - 1, b.B).join("\n") + "\n";
        const record = recordsFor(renameMap, file);
        const body = record ? applyRecordedMap(rawBody, record) : rawBody;
        if (body.split("\n").length !== rawBody.split("\n").length)
          throw new Error(`${rel}: slice ${file} rename changed the line count — refusing`);
        if (record) {
          perFileRenamed++;
          for (const [old, target] of Object.entries(record.files || {})) noteTarget(old, target);
          for (const [old, hits] of Object.entries(record.scoped || {}))
            for (const [, target] of hits) noteTarget(old, target);
        }
        const ms = markers(body);
        const topWord = ms.length ? ms[0][0] : /^\s*import\b/.test(body) ? "imports" : tag.toLowerCase();
        const oversized = b.count === 1 && b.B - b.A + 1 > MAX_WINDOW;
        const sliceText =
          `// ${tag} ${num} — ${topWord}\n` +
          `// Lines ${b.A}-${b.B} of ${sourceFile} (statement-aligned).\n` +
          body;
        const chk = parses(sliceText);
        if (!chk.ok) throw new Error(`generated src/${file} does not parse standalone: ${chk.why}`);
        writeDerived("src/" + file, sliceText);
        written.src.add("src/" + file);
        sections.push({
          file,
          title: `${tag} ${num} — ${topWord}`,
          desc: `${oversized ? "Oversized single declaration (kept whole). " : ""}Lines ${b.A}-${b.B}. Markers: ${markerText(ms)}.${record ? " Range re-cut through the recorded semantic rename map." : ""}`,
          startLine: b.A,
          endLine: b.B,
          sourceFile,
        });
      } else if (b.kind === "whole") {
        perFileVendor++;
        sections.push({
          file: b.file,
          wholeFile: true,
          title: b.title,
          desc: `Lines ${b.A}-${b.B} of ${sourceFile}: ${b.body}`,
          note: "whole-file region (vendor rule): indexed in readable/, never sliced",
          startLine: b.A,
          endLine: b.B,
          sourceFile,
        });
      } else {
        perFileSkipped++;
        sections.push({
          file: b.file,
          skipped: true,
          title: b.title,
          desc: b.desc,
          startLine: b.A,
          endLine: b.B,
          sourceFile,
          firstLine: lines[b.A - 1],
          lastLine: lines[b.B - 1],
        });
      }
    }
    slicedTotal += nn;
    skippedTotal += perFileSkipped;
    if (perFileRenamed) renamedFiles++;
    // the authored rules that actually fired (evidence: their targets appear in
    // this chunk's recorded map) — the chunk's binding map, recorded in the spec
    // so the reconstruction gates can re-read every recorded rename
    const authored = names.byCapture?.[rel] || {};
    const renameBindings = {};
    for (const [old, target] of Object.entries(authored)) {
      if (targetsByOld.get(old)?.has(target)) {
        renameBindings[old] = target;
        renamedNames++;
      }
    }
    sources.push({
      sourceFile,
      capture: rel,
      captureKind: "file",
      captureSha256: manifest.files[rel].sha256,
      captureBytes: buf.length,
      prettyLines: lines.length,
      prettyBytes: Buffer.byteLength(pretty, "utf8"),
      prettyPasses: 1,
      idempotent,
      tag,
      slices: nn,
      renameBindings,
      derived:
        `readable + ${nn} statement-aligned slice(s)` +
        (perFileRenamed ? ` (${perFileRenamed} through the recorded rename map)` : "") +
        (perFileVendor ? ` + ${perFileVendor} wholeFile region(s)` : "") +
        (perFileSkipped ? ` + ${perFileSkipped} skipped section(s)` : ""),
    });
    console.log(
      `derive: ${rel} -> ${sourceFile} (${lines.length} lines, ${nn} slices${perFileRenamed ? `, ${perFileRenamed} renamed` : ""}, ${perFileVendor} wholeFile, ${perFileSkipped} skipped)`,
    );
  }

  // ── 2) CSS: readable pretty, wholeFile section (stylesheet rule) ────────
  for (const rel of cssRels) {
    const buf = captureBytes(rel);
    const text = buf.toString("utf8");
    const { out: pretty, idempotent } = await formatOnce(prettier, text, "css");
    if (!idempotent) notIdempotent.push(rel);
    if (pretty === text) throw new Error(`${rel}: prettier output is byte-identical to the capture`);
    const sourceFile = prettyRelFor(rel);
    writeDerived(sourceFile, pretty);
    written.readable.add(sourceFile);
    const lines = linesOf(pretty);
    const tag = tagOf(rel);
    sections.push({
      file: `${tag}.css`,
      wholeFile: true,
      title: `${tag} — stylesheet (whole-file, never sliced)`,
      desc: `Lines 1-${lines.length} of ${sourceFile}. Whole-file (stylesheet rule): the capture stylesheet is indexed whole in readable/, never sliced.`,
      note: "whole-file (stylesheet, not sliced): CSS is indexed whole in readable/",
      startLine: 1,
      endLine: lines.length,
      sourceFile,
    });
    sources.push({
      sourceFile,
      capture: rel,
      captureKind: "file",
      captureSha256: manifest.files[rel].sha256,
      captureBytes: buf.length,
      prettyLines: lines.length,
      prettyBytes: Buffer.byteLength(pretty, "utf8"),
      prettyPasses: 1,
      idempotent,
      tag,
      slices: 0,
      derived: "readable only (stylesheet, wholeFile)",
    });
    console.log(`derive: ${rel} -> ${sourceFile} (${lines.length} lines, wholeFile stylesheet)`);
  }

  // ── 3) HTML entry documents: inline <script>/<style> scan + twins ───────
  const inlineMap = { generated: TODAY, note: "", blocks: [] };
  for (const rel of htmlRels) {
    const buf = captureBytes(rel);
    const blocks = scanBlocks(buf);
    const inline = blocks.filter((b) => !b.external);
    const external = blocks.filter((b) => b.external);
    inlineFiles.push(rel);
    for (const b of external)
      console.log(`derive: ${rel}: external ${b.kind} (not derived): ${b.tag.slice(0, 90)}`);
    if (!inline.length) {
      console.log(`derive: ${rel}: no inline <script>/<style> content blocks — no inline twins`);
      continue;
    }
    const entryTag = rel.replace(/\.html$/i, ""); // served path of the document, dirs kept
    for (const b of inline) {
      const isImportmap = b.kind === "importmap";
      const parser = isImportmap ? "json" : b.kind === "style" ? "css" : "babel";
      const DATA_TYPES = new Set(["application/ld+json", "application/json", "importmap", "speculationrules"]);
      const type = (/\btype\s*=\s*["']?([^"'\s>]+)/i.exec(b.tag)?.[1] ?? "").toLowerCase();
      if (b.kind === "script" && DATA_TYPES.has(type)) {
        notRendered.push({
          capture: rel,
          kind: "inline-data",
          block: b.block,
          type,
          byteStart: b.contentStart,
          byteEnd: b.contentEnd,
          bytes: b.bytes,
          sha256: b.sha256,
          rendered: false,
          reason: `typed data block (<script type="${type}">) — structured data, not JS; recorded with range + sha256, no pretty pass`,
        });
        console.log(`derive: ${rel}: inline data block #${b.block} (type=${type}) recorded, no twin`);
        continue;
      }
      const tag = `${entryTag}-inline-${b.block}`;
      const twinExt = isImportmap ? "json" : b.kind === "style" ? "css" : "js";
      const prettyFile = `readable/${tag}.pretty.${twinExt}`;
      const { out: pretty, idempotent } = await formatOnce(prettier, b.text, parser);
      if (!idempotent) notIdempotent.push(`${rel}#inline-${b.block}`);
      if (pretty === b.text)
        throw new Error(`${prettyFile} would be byte-identical to its capture source`);
      writeDerived(prettyFile, pretty);
      written.readable.add(prettyFile);
      const lines = linesOf(pretty);
      const prettyBuf = Buffer.from(pretty, "utf8");
      sections.push({
        file: `${tag}.${twinExt}`,
        wholeFile: true,
        title: `${tag} — inline ${b.kind} block (whole-file, never sliced)`,
        desc: `Lines 1-${lines.length} of ${prettyFile}. Whole-file: the entry document's inline ${b.kind} block (${b.bytes} B at bytes ${b.contentStart}-${b.contentEnd} of ${rel}) is indexed whole and never sliced.`,
        note: `whole-file (entry inline ${b.kind} block, not sliced)`,
        startLine: 1,
        endLine: lines.length,
        sourceFile: prettyFile,
      });
      inlineMap.blocks.push({
        file: prettyFile,
        source: rel,
        section: `${tag}.${twinExt}`,
        kind: b.kind,
        block: b.block,
        byteStart: b.contentStart,
        byteEnd: b.contentEnd,
        bytes: b.bytes,
        sha256: b.sha256,
      });
      sources.push({
        sourceFile: prettyFile,
        capture: rel,
        captureKind: `inline-${b.kind}`,
        captureByteStart: b.contentStart,
        captureByteEnd: b.contentEnd,
        captureSha256: b.sha256,
        captureBytes: b.bytes,
        prettyLines: lines.length,
        prettyBytes: prettyBuf.length,
        prettySha256: sha256(prettyBuf),
        tag,
        slices: 0,
        derived: "readable only (inline block, wholeFile)",
      });
      console.log(`derive: ${rel}: inline ${b.kind} #${b.block} -> ${prettyFile} (${lines.length} lines)`);
    }
  }
  if (inlineMap.blocks.length) {
    inlineMap.note =
      "byte ranges + sha256 of every inline <script>/<style> content block in the captured HTML documents " +
      "(index.html: the critical <style>, the gtag bootstrap script; parks/index.html: the viewer <style>); " +
      "twins are the prettified (prettier 3.9.6, module API) renderings and are never shipped to a browser. " +
      "Typed data blocks (application/ld+json) are recorded in split-spec notRendered instead — data, not code.";
    fs.writeFileSync(path.join(readableDir, "index-inline-map.json"), JSON.stringify(inlineMap, null, 2) + "\n");
  }

  // ── 4) prune orphan derived files (capture untouched) ──────────────────
  // recursive: the derived layers carry the served subdirectories; empty dirs
  // left behind by a re-cut are removed too.
  let pruned = 0;
  const pruneWalk = (dirAbs, keep, exts) => {
    for (const e of fs.readdirSync(dirAbs, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
      const abs = path.join(dirAbs, e.name);
      if (e.isDirectory()) {
        pruneWalk(abs, keep, exts);
        if (!fs.readdirSync(abs).length) fs.rmdirSync(abs);
        continue;
      }
      const rel = path.relative(proj, abs).split(path.sep).join("/");
      if (exts.test(e.name) && !keep.has(rel)) {
        fs.rmSync(abs);
        pruned++;
        console.log(`derive: pruned orphan derived file ${rel}`);
      }
    }
  };
  for (const [dirAbs, keep, exts] of [
    [readableDir, written.readable, /\.(pretty\.js|pretty\.css)$/],
    [srcDir, written.src, /\.js$/],
  ])
    pruneWalk(dirAbs, keep, exts);

  // ── 5) split-spec.json (2-space indent + trailing newline) ─────────────
  const appJs = sources.filter((s) => s.derived.startsWith("readable +"));
  const vendorJsS = sources.filter((s) => /wholeFile\)$/.test(s.derived) && s.capture.endsWith(".js"));
  const cssSources = sources.filter((s) => s.sourceFile.endsWith(".pretty.css"));
  const firstSlice = sections.find((s) => !s.wholeFile && !s.skipped);
  const spec = {
    project: "tailgrab",
    kind: "statement-aligned-slices",
    defaultFile: `src/${firstSlice ? firstSlice.file : ""}`,
    note:
      "Tailgrab (https://tailgrab.io/) is capture-class: a Vite production build of a free multiplayer " +
      "skateboarding game (three.js r186 + Colyseus SDK) served at the origin root by Cloudflare. §0.4 " +
      "fork-over-mirror was checked on 2026-10-13 — nothing in the capture references an upstream repository " +
      "(the page credits its author but publishes no source), so the mirror stands. Structure (2026-10-14): the " +
      "served path is the truth — a captured file at assets/main-CzsUDvlE.js derives to " +
      "readable/assets/main-CzsUDvlE.pretty.js (nested directories kept, never __-flattened) and slices to " +
      "src/assets/main-CzsUDvlE-NN.js with a slice header carrying the served tag. Derived pipeline: capture → " +
      "pinned prettier 3.9.6 (module API, default options, single pass — deterministic from the capture; " +
      "preload-helper-DR1MrGPZ is not a prettier fixed point (a member chain only joins on a second pass) and is " +
      "flagged idempotent:false in sources — never the CLI: it " +
      "respects .gitignore and can silently echo its input) → readable/<served>.pretty.js|css per captured " +
      "JS/CSS file (every pretty provably NOT byte-identical to its capture source) → statement-aligned slices " +
      "src/<served>-NN.js of every APP chunk " +
      "(top-level declaration boundaries only, ~250-350 line windows; oversized single declarations stay " +
      "whole) with an exact 2-line provenance header. Every slice parses standalone under `node " +
      "--input-type=module --check -` and round-trips byte-exact to its recorded readable line range through " +
      "the recorded semantic rename map (rename-map.json; PLAN §5 identifier rename campaign — a slice with no " +
      "map record round-trips verbatim; identifiers are semantic on app code, vendor identifiers stay minified). Vendor " +
      "rule — wholeFile sections, never sliced: three.core (the r186 core build), the GLTFLoader " +
      "(DRACO/KTX2/meshopt) and OrbitControls addons, the lil-gui build, the Colyseus SDK client, and the Vite " +
      "modulepreload polyfill (build machinery). Mixed chunk: toon-CycGToy9 body is the minifier-merged " +
      "three.js r186 WebGLRenderer bundle — content-anchored between the app's three.core import and the " +
      "statement that merges the renderer class with the app's `Xr = { uSlab … }` uniform record, guarded and " +
      "asserted as a wholeFile vendor region; the app's import statements and its toon-material/shader tail " +
      "are sliced. Inline <script>/<style> scan: index.html carries the critical <style> and the gtag " +
      "bootstrap (both twins + readable/index-inline-map.json), plus an application/ld+json structured-data " +
      "block recorded in notRendered (data, not code); parks/index.html (the stored /parks route page) " +
      "carries its viewer <style> twin (readable/parks/index-inline-1.pretty.css). Non-standalone parts are " +
      "skipped sections, indexed but never sliced: every app chunk's final export {…} table (the bindings live " +
      "in the earlier slices; the campaign renames their local side through split-spec sources[].renameBindings, " +
      "the public side is the capture's own API). Capture bytes are untouched by everything above; re-cut with `node " +
      "tools/derive.mjs` after any capture refresh. `node tools/audit.js` is the gate.",
    renderOptions: {
      _default:
        "prettier 3.9.6, module API, default options, single pass; every pretty re-renders byte-exact from its capture bytes (audit re-renders one pass) — non-fixed-point sources are flagged idempotent:false — never the CLI: it respects .gitignore and can silently echo its input",
      js: "parser babel, no plugins",
      css: "parser css, no plugins",
      json: "parser json, no plugins (inline importmap blocks, if any)",
    },
    source:
      `readable/: ${sources.filter((s) => s.sourceFile?.endsWith(".pretty.js")).length} JS pretties ` +
      `(${appJs.length} app chunk(s) sliced, ${vendorJsS.length} vendor wholeFile) + ` +
      `${cssSources.length} CSS pretties; ` +
      `src/: ${appJs.reduce((n, s) => n + s.slices, 0)} statement-aligned slices across ${appJs.length} app chunk(s); ` +
      `${sections.filter((s) => s.skipped).length} skipped section(s); ` +
      `${sections.filter((s) => s.wholeFile).length} wholeFile section(s); ` +
      `capture: ${captured.length} files under .upstream/manifest.json; inline scan: ${inlineFiles.join(", ")} ` +
      `(${inlineMap.blocks.length} inline content block(s) with twins, ${notRendered.filter((n) => n.kind === "inline-data").length} inline data block(s) notRendered); ` +
      `notRendered: ${notRendered.length}.`,
    inline: {
      scanned: inlineFiles,
      contentBlocks: inlineMap.blocks.length,
      notRendered: notRendered.length,
      note:
        "index.html carries an inline critical <style> and an inline gtag bootstrap (twins " +
        "readable/index-inline-1.pretty.css / index-inline-2.pretty.js + readable/index-inline-map.json); its " +
        "application/ld+json block is structured data, recorded in notRendered with range + sha256. " +
        "parks/index.html carries its viewer <style> twin (readable/parks/index-inline-1.pretty.css).",
    },
    rename: {
      map: "rename-map.json",
      chunks: renamedFiles,
      names: renamedNames,
      indexedOccurrences: renamedOccurrences,
      note:
        "Semantic renames are recorded per slice in rename-map.json (word-boundary `files` records + `scoped` " +
        "token-index records); this file re-applies them when it re-cuts src/. Vendor identifiers (wholeFile " +
        "regions and the vendor chunks) are never renamed; each chunk's fired binding map is recorded per " +
        "source as renameBindings for the reconstruction gates (tools/verify-rename.mjs, tools/check-chunk.mjs).",
    },
    sources,
    sections,
    notRendered,
  };
  fs.writeFileSync(path.join(proj, "split-spec.json"), JSON.stringify(spec, null, 2) + "\n");

  // ── 6) self-check (tools/audit.js is the authoritative gate) ────────────
  let bad = 0;
  const bySource = new Map();
  for (const s of sections) {
    if (!bySource.has(s.sourceFile)) bySource.set(s.sourceFile, []);
    bySource.get(s.sourceFile).push(s);
  }
  for (const [sourceFile, list] of bySource) {
    const lines = readLines(path.join(proj, sourceFile));
    const sorted = [...list].sort((a, b) => a.startLine - b.startLine);
    if (sorted[0].startLine !== 1) {
      console.error(`TILING FAIL ${sourceFile}: starts at line ${sorted[0].startLine}`);
      bad++;
    }
    for (let i = 1; i < sorted.length; i++)
      if (sorted[i].startLine !== sorted[i - 1].endLine + 1) {
        console.error(`TILING FAIL ${sourceFile}: gap/overlap at ${sorted[i].file}`);
        bad++;
      }
    if (sorted[sorted.length - 1].endLine !== lines.length) {
      console.error(`TILING FAIL ${sourceFile}: does not reach EOF (${lines.length})`);
      bad++;
    }
  }
  let parsed = 0;
  let ranged = 0;
  let roundOK = 0;
  let renamedSlices = 0;
  for (const s of sections) {
    if (s.wholeFile || s.skipped) continue;
    ranged++;
    const abs = path.join(srcDir, ...s.file.split("/"));
    const text = fs.readFileSync(abs, "utf8");
    const nl2 = text.indexOf("\n", text.indexOf("\n") + 1);
    const body = text.slice(nl2 + 1);
    const raw = readLines(path.join(proj, s.sourceFile)).slice(s.startLine - 1, s.endLine).join("\n") + "\n";
    const record = recordsFor(renameMap, s.file);
    const expected = record ? applyRecordedMap(raw, record) : raw;
    if (record) renamedSlices++;
    if (body !== expected) {
      console.error(`ROUND-TRIP FAIL ${s.file}`);
      bad++;
    } else roundOK++;
    if (!parses(text).ok) {
      console.error(`PARSE FAIL src/${s.file}`);
      bad++;
    } else parsed++;
  }
  let prettyParsed = 0;
  for (const s of sources) {
    if (!s.sourceFile?.endsWith(".pretty.js")) continue;
    if (!parses(fs.readFileSync(path.join(proj, s.sourceFile), "utf8")).ok) {
      console.error(`PARSE FAIL ${s.sourceFile}`);
      bad++;
    } else prettyParsed++;
  }
  renamedOccurrences = Object.values(renameMap.scoped).reduce(
    (n, m) => n + Object.values(m).reduce((k, hits) => k + hits.length, 0),
    0,
  );
  console.log(
    `derive: ${written.readable.size} readable file(s), ${written.src.size} src slices ` +
      `(${parsed}/${ranged} parse standalone, ${roundOK}/${ranged} round-trip byte-exact through the recorded map, ` +
      `${renamedSlices} renamed slice(s)), ` +
      `${skippedTotal} skipped, ${sections.filter((s) => s.wholeFile).length} wholeFile, ` +
      `${prettyParsed} pretty js parse clean, ${notRendered.length} notRendered, ` +
      `${notIdempotent.length} non-idempotent source(s), ${pruned} orphan(s) pruned — ` +
      `self-check ${bad ? bad + " FAILURE(S)" : "clean"}`,
  );
  if (bad) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
