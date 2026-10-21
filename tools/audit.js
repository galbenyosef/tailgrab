// audit.js — integrity gate (PLAN §5), tailored to tailgrab's shape.
//
// Tailgrab (https://tailgrab.io/) is capture-class: a Vite production build of
// a free multiplayer skateboarding game (three.js r186 + Colyseus SDK) served
// at the origin root by Cloudflare. There is no authored source in the mirror,
// so the derived pipeline is:
//
//   capture assets/<name>.js|css -> readable/assets/<name>.pretty.js|css  (pinned prettier 3.9.6, single pass;
//                                                                    served paths, never __-flattened)
//   readable app chunks          -> src/assets/<name>-NN.js               (statement-aligned slices)
//   readable vendor chunks       -> split-spec wholeFile sections   (vendor rule: never sliced)
//   readable toon vendor region  -> split-spec wholeFile section    (minifier-merged three.js r186
//                                                                    WebGLRenderer bundle, content-anchored)
//   readable loader/export parts -> split-spec skipped sections     (final export tables)
//   capture index.html + parks/index.html -> inline <script>/<style> scan
//                                   (twins + index-inline-map.json; application/ld+json is
//                                    structured data — recorded in notRendered, no twin)
//   src/assets/*.js              -> the PLAN §5 identifier rename campaign, recorded in
//                                   rename-map.json (word-boundary + token-index records)
//
// split-spec.json records that pipeline and this gate keeps it honest:
//
//   1. split-spec.json parses, carries a note + renderOptions, and a defaultFile exists.
//   2. Every section resolves: ranged slices have a src/*.js file on disk, a readable
//      *.pretty.js|css sourceFile and in-bounds startLine/endLine; wholeFile sections
//      (vendor chunks, toon vendor region, stylesheets, inline twins) must NOT have a
//      src file; `skipped` sections (final export tables) must NOT have a src file and
//      are re-verified textually against their recorded firstLine/lastLine.
//   3. The ranges of each sourceFile tile it exactly: first starts at line 1, each next
//      starts at previous end + 1, last ends at EOF — no gaps, no overlaps.
//   4. Byte-exact round-trip THROUGH the recorded rename layer: every src slice minus
//      its exact 2-line header equals its recorded sourceFile range with the recorded
//      rename map applied (tools/engine/rename-layer.mjs applyRecordedMap; an unrenamed
//      slice has no record and round-trips verbatim). A body that differs with no
//      recorded map is a problem — renames must be recorded, never ad hoc.
//   5. Every slice parses standalone with the exact gate command
//      `node --input-type=module --check -` (stdin), as does every readable *.pretty.js.
//   6. src/*.js on disk and the spec's ranged slices are the same set — no unlisted or
//      missing reversals; wholeFile/skipped names are not on disk.
//   7. Every readable pretty is referenced by the spec, its capture source exists, is
//      recorded in .upstream/manifest.json, and is NOT byte-identical to the pretty
//      (prettier did run). Every captured .js/.css file has a readable twin (layer
//      completeness). When the pinned prettier 3.9.6 is importable, each pretty is
//      re-rendered under the recorded options and byte-compared (best-effort: missing
//      prettier is a note, a mismatch is a problem). Two sources are flagged
//      idempotent:false (a member chain / a media-query collapse prettier only settles
//      on a second pass) — the stored pretty is the deterministic single-pass rendering
//      this check re-renders.
//   8. The hard rule — src/ import resolution: relative specifiers (static from-imports,
//      side-effect imports, re-exports, dynamic import() incl. non-interpolated template
//      literals) resolve to files the CAPTURE carries. `node:` and `vite/*` bare
//      specifiers are whitelisted machinery; other bare/URL specifiers are flagged.
//   9. Inline-block scan: every inline <script>/<style> content block in a captured HTML
//      document has its readable twin and a readable/index-inline-map.json entry whose
//      byte range + sha256 match the capture bytes; typed data blocks (application/ld+json)
//      are recorded in split-spec notRendered with matching range + sha256 and carry no twin.
//  10. Derived layers never enter the capture sums: no readable/, src/, legacy/,
//      split-spec.json or rename-map.json path may appear in .upstream/manifest.json.
//  11. Rename-map honesty (the campaign gate, PLAN §5): rename-map.json parses and
//      carries its recovery note; every recorded src file is a ranged slice on disk;
//      every indexed record addresses the recorded identifier token in its slice's range
//      and never an import/export specifier (foreign) position; no record maps a name
//      to itself; every renamed slice reproduces byte-exact through its map (rule 4).
//
// usage: node tools/audit.js
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { spawnSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";
import { applyRecordedMap, foreignNameIndices, tokens } from "./engine/rename-layer.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const proj = path.resolve(here, "..");
const srcDir = path.join(proj, "src");
const readableDir = path.join(proj, "readable");
const PINNED = "3.9.6";
const ROOT = ""; // root-served capture: served path == disk rel

const problems = [];
const problem = (msg) => problems.push(msg);

// ── helpers ─────────────────────────────────────────────────────────────
const readLines = (abs) => {
  const t = fs.readFileSync(abs, "utf8");
  const l = t.split("\n");
  if (l.length && l[l.length - 1] === "") l.pop();
  return l;
};
const linesCache = new Map();
const getLines = (abs) => {
  if (!linesCache.has(abs)) linesCache.set(abs, readLines(abs));
  return linesCache.get(abs);
};
const sha256 = (buf) => crypto.createHash("sha256").update(buf).digest("hex");
const srcAbs = (relFile) => path.join(srcDir, ...String(relFile).split("/"));
const walkRel = (relDir, test, out = []) => {
  const abs = path.join(proj, ...relDir.split("/"));
  if (!fs.existsSync(abs)) return out;
  for (const e of fs.readdirSync(abs, { withFileTypes: true })) {
    const rel = relDir + "/" + e.name;
    if (e.isDirectory()) walkRel(rel, test, out);
    else if (test(e.name)) out.push(rel);
  }
  return out;
};

// capture-relative path -> readable twin path (served path kept, never flattened)
const prettyNameOf = (capRel) => {
  const rel = capRel.startsWith(ROOT) ? capRel.slice(ROOT.length) : capRel;
  return "readable/" + rel.replace(/\.(js|css)$/i, "") + (/\.css$/i.test(rel) ? ".pretty.css" : ".pretty.js");
};
const captureByPretty = new Map(); // readable/<x>.pretty.js|css -> capture rel

// A whole-file section may name the PRISTINE it was rendered from in
// `source`/`origin`/`from` (or in `wholeFile` when that names a path). That
// capture is what the public-export gate compares the reading copy against.
const readingCopyCapture = (s) => {
  if (typeof s.wholeFile === "string" && s.wholeFile) return s.wholeFile;
  for (const f of ["source", "origin", "from"]) {
    if (typeof s[f] === "string" && s[f]) return s[f];
  }
  return null;
};

// parse check — the exact standalone gate: node --input-type=module --check - < file
function parseCheck(abs, rel) {
  const r = spawnSync(process.execPath, ["--input-type=module", "--check", "-"], {
    input: fs.readFileSync(abs),
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });
  if (r.status !== 0)
    problem(`standalone ESM parse failed: ${rel} — ${(r.stderr || "").trim().split("\n").slice(-2).join(" | ")}`);
  return r.status === 0;
}

// inline <script>/<style> scan (byte-exact, same shape as tools/derive.mjs)
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
      if (j < 0) {
        problem(`unterminated <${kind}> opened at byte ${i}`);
        break;
      }
      const tag = buf.subarray(i, tagEnd + 1).toString("utf8");
      const external = /\bsrc\s*=\s*["']/i.test(tag);
      if (!external) {
        n++;
        const content = buf.subarray(tagEnd + 1, j);
        blocks.push({
          kind: /\btype\s*=\s*["']importmap["']/i.test(tag) ? "importmap" : kind,
          tag,
          block: n,
          contentStart: tagEnd + 1,
          contentEnd: j,
          bytes: content.length,
          sha256: sha256(content),
        });
      }
      p = j + close.length;
    }
  }
  return blocks.sort((a, b) => a.contentStart - b.contentStart);
}

// ── specifier extraction + export tables (the hard rule) ────────────────
function extractSpecifiers(code) {
  const out = [];
  const push = (spec, kind, clause) => out.push({ spec, kind, clause: clause || "" });
  let m;
  const fromRe = /\bimport\s+([^;('"]*?)\s*from\s*(["'])([^"']+)\2/g;
  while ((m = fromRe.exec(code))) push(m[3], "from", m[1]);
  const sideRe = /\bimport\s*(["'])([^"']+)\1/g;
  while ((m = sideRe.exec(code))) push(m[2], "side-effect", "");
  const reExpRe = /\bexport\s+[^;()]*?\bfrom\s*(["'])([^"']+)\1/g;
  while ((m = reExpRe.exec(code))) push(m[2], "re-export", "");
  const dynRe = /\bimport\s*\(\s*(["'])([^"']+)\1\s*\)/g;
  while ((m = dynRe.exec(code))) push(m[2], "dynamic", "");
  const dynTplRe = /\bimport\s*\(\s*`([^`]*)`\s*\)/g;
  while ((m = dynTplRe.exec(code))) if (!m[1].includes("${")) push(m[1], "dynamic", "");
  const urlRe = /\bnew\s+URL\s*\(\s*(["'`])([^"'`]+)\1\s*,/g;
  while ((m = urlRe.exec(code))) push(m[2], "worker-url", "");
  if (/\brequire\s*\(/.test(code)) push("<require()>", "require", "");
  return out;
}
function namedImports(clause) {
  const names = [];
  const brace = /\{([^}]*)\}/s.exec(clause);
  if (brace) {
    for (let part of brace[1].split(",")) {
      part = part.trim();
      if (!part) continue;
      const as = /\s+as\s+([\w$]+)\s*$/.exec(part);
      names.push(as ? part.slice(0, as.index).trim() : part); // imported name precedes `as`
    }
  } else {
    const head = clause.split(",")[0].trim();
    if (head && !head.startsWith("*")) names.push(head); // default import
  }
  return names.filter(Boolean);
}
function exportsOf(code) {
  const names = new Set();
  for (const m of code.matchAll(/\bexport\s*\{([^}]*)\}/g)) {
    for (let part of m[1].split(",")) {
      part = part.trim();
      if (!part) continue;
      const as = /\s+as\s+([\w$]+)\s*$/.exec(part);
      names.add(as ? as[1] : part); // in an EXPORT clause the public name follows `as`
    }
  }
  for (const m of code.matchAll(/\bexport\s+(?:async\s+)?(?:function|class)\s+([\w$]+)/g)) names.add(m[1]);
  for (const m of code.matchAll(/\bexport\s+(?:const|let|var)\s+([\w$]+)/g)) names.add(m[1]);
  if (/\bexport\s+default\b/.test(code)) names.add("default");
  if (/\bexport\s+\*\s+from\b/.test(code)) names.add("*");
  return names;
}

// ── capture manifest ────────────────────────────────────────────────────
let manifest = null;
try {
  manifest = JSON.parse(fs.readFileSync(path.join(proj, ".upstream", "manifest.json"), "utf8"));
} catch (e) {
  problem(`.upstream/manifest.json does not parse: ${e.message}`);
}
const normRel = (r) => r.split(path.sep).join("/");
const captured = manifest?.files ? Object.keys(manifest.files).map(normRel).sort() : [];
for (const rel of captured) {
  if (/\.(js|css)$/i.test(rel)) captureByPretty.set(prettyNameOf(rel), rel);
}

// ── split-spec.json ─────────────────────────────────────────────────────
const specPath = path.join(proj, "split-spec.json");
if (!fs.existsSync(specPath)) problem("split-spec.json missing at repo root");
let spec = null;
try {
  spec = specPath && JSON.parse(fs.readFileSync(specPath, "utf8"));
} catch (e) {
  problem(`split-spec.json does not parse: ${e.message}`);
}
const sections = Array.isArray(spec?.sections) ? spec.sections : [];
if (spec && !Array.isArray(spec?.sections)) problem("split-spec.json has no sections array");
if (!String(spec?.note ?? "").trim()) problem("split-spec.json has no note (derivation record)");
if (!spec?.renderOptions || typeof spec.renderOptions !== "object")
  problem("split-spec.json records no renderOptions (prettier options for re-derivation)");
if (!Array.isArray(spec?.notRendered))
  problem("split-spec.json records no notRendered array (non-code payload blocks)");
if (spec?.defaultFile) {
  const df = srcAbs(String(spec.defaultFile).replace(/^src\//, ""));
  if (!fs.existsSync(df)) problem(`split-spec defaultFile "${spec.defaultFile}" does not exist`);
}

// ── recorded rename map (the campaign record this gate re-proves) ──────
const renameMapPath = path.join(proj, "rename-map.json");
let renameMap = null;
if (fs.existsSync(renameMapPath)) {
  try {
    const rm = JSON.parse(fs.readFileSync(renameMapPath, "utf8"));
    renameMap = { files: rm.files || {}, scoped: rm.scoped || {}, note: rm.note || "" };
    if (!String(renameMap.note).trim()) problem("rename-map.json has no note (recovery record)");
  } catch (e) {
    problem(`rename-map.json does not parse: ${e.message}`);
  }
}
const recordsFor = (file) => {
  if (!renameMap) return null;
  const files = renameMap.files[file];
  const scoped = renameMap.scoped[file];
  return files || scoped ? { files, scoped } : null;
};

const seen = new Set();
const rangedFiles = new Set();
const indexOnlyFiles = new Set();
const readingCopySections = [];
for (const s of sections) {
  if (!s.file) {
    problem("split-spec section without a file");
    continue;
  }
  if (seen.has(s.file)) problem(`split-spec lists ${s.file} twice`);
  seen.add(s.file);
  const isWhole = s.wholeFile === true;
  const isSkipped = s.skipped === true;
  if (isWhole && isSkipped) problem(`section ${s.file}: both wholeFile and skipped`);
  if (typeof s.startLine !== "number" || typeof s.endLine !== "number")
    problem(`section ${s.file}: no startLine/endLine range recorded`);
  if (typeof s.sourceFile !== "string") problem(`section ${s.file}: no sourceFile provenance recorded`);
  if (isWhole || isSkipped) indexOnlyFiles.add(s.file);
  else rangedFiles.add(s.file);
  // A whole-file section in the READING-COPY shape: its `file` IS the derived
  // text (the readable pretty the vendor bundle was re-rendered into) and it
  // names the PRISTINE it was rendered from (the served capture). It is
  // recognised by the reading copy being a file under readable/ that EXISTS —
  // the older shape, whose `file` is an index label for a slice that is never
  // cut (or the capture itself, for a stylesheet), is not a reading copy. The
  // shape is accepted only when it is sound (§ reading-copy shape below).
  if (
    isWhole &&
    !isSkipped &&
    typeof s.file === "string" &&
    s.file.startsWith("readable/") &&
    fs.existsSync(path.join(proj, ...s.file.split("/")))
  )
    readingCopySections.push({ s, capture: readingCopyCapture(s) });
}
if (!rangedFiles.size) problem("no ranged src slices in split-spec.json (no reversed layer)");

const onDisk = walkRel("src", (n) => n.endsWith(".js")).map((r) => r.slice("src/".length)).sort();
if (!onDisk.length) problem("src/ missing or empty (no reversed layer)");
for (const f of onDisk) if (!rangedFiles.has(f)) problem(`src/${f} exists but is not a ranged slice in split-spec.json`);
for (const f of rangedFiles) if (!onDisk.includes(f)) problem(`split-spec lists ${f} but it is not on disk`);
for (const f of indexOnlyFiles)
  if (onDisk.includes(f)) problem(`index-only section ${f} must not have a src file on disk (wholeFile/skipped)`);

// ── ranges: existence, bounds, tiling ───────────────────────────────────
const bySource = new Map();
for (const s of sections) {
  if (!s.file || typeof s.sourceFile !== "string") continue;
  const src = path.join(proj, s.sourceFile);
  if (!fs.existsSync(src)) {
    problem(`section ${s.file}: sourceFile missing: ${s.sourceFile}`);
    continue;
  }
  if (!/\.pretty\.(js|css)$/i.test(s.sourceFile)) {
    problem(`section ${s.file}: sourceFile is not a readable pretty: ${s.sourceFile}`);
    continue;
  }
  const srcLines = getLines(src);
  const A = s.startLine,
    B = s.endLine;
  if (!Number.isInteger(A) || !Number.isInteger(B) || A < 1 || B < A || B > srcLines.length) {
    problem(`section ${s.file}: bad range ${A}-${B} vs ${s.sourceFile} (${srcLines.length} lines)`);
    continue;
  }
  if (!bySource.has(s.sourceFile)) bySource.set(s.sourceFile, []);
  bySource.get(s.sourceFile).push({ s, A, B });
}
let tiledOK = 0;
for (const [sourceFile, list] of bySource) {
  let ok = true;
  list.sort((x, y) => x.A - y.A);
  const srcLines = getLines(path.join(proj, sourceFile));
  if (list[0].A !== 1) {
    problem(`${sourceFile}: first section starts at line ${list[0].A}, not 1`);
    ok = false;
  }
  for (let k = 1; k < list.length; k++) {
    if (list[k].A !== list[k - 1].B + 1) {
      problem(
        `${sourceFile}: ranges not contiguous at ${list[k].s.file} (starts ${list[k].A}, previous ends ${list[k - 1].B})`,
      );
      ok = false;
    }
  }
  if (list[list.length - 1].B !== srcLines.length) {
    problem(`${sourceFile}: last section ends at ${list[list.length - 1].B}, not ${srcLines.length}`);
    ok = false;
  }
  if (ok) tiledOK++;
}

// ── byte-exact round-trip through the rename map + header provenance ────
let roundOK = 0,
  ranged = 0,
  renamedSlices = 0;
for (const [, list] of bySource) {
  for (const { s, A, B } of list) {
    if (s.wholeFile === true || s.skipped === true) continue;
    ranged++;
    const abs = srcAbs(s.file);
    if (!fs.existsSync(abs)) continue; // already reported
    const text = fs.readFileSync(abs, "utf8");
    const nl1 = text.indexOf("\n");
    const nl2 = nl1 >= 0 ? text.indexOf("\n", nl1 + 1) : -1;
    if (nl2 < 0) {
      problem(`src/${s.file}: missing 2-line header`);
      continue;
    }
    const header1 = text.slice(0, nl1);
    const header2 = text.slice(nl1 + 1, nl2);
    const nn = path.basename(String(s.file)).match(/-(\d+)\.js$/)?.[1];
    if (!nn) problem(`src/${s.file}: file name carries no -NN slice number`);
    else if (!new RegExp(`^// .+ ${nn} — .+$`).test(header1))
      problem(`src/${s.file}: header line 1 does not match "// <tag> ${nn} — <marker>": ${header1}`);
    const want2 = `// Lines ${A}-${B} of ${s.sourceFile} (statement-aligned).`;
    if (header2 !== want2) problem(`src/${s.file}: header line 2 is not the recorded range: ${header2}`);
    const body = text.slice(nl2 + 1);
    const srcLines = getLines(path.join(proj, ...s.sourceFile.split("/")));
    const range = srcLines.slice(A - 1, B).join("\n") + "\n";
    const record = recordsFor(s.file);
    let expected = range;
    if (record) {
      renamedSlices++;
      try {
        expected = applyRecordedMap(range, record);
      } catch (e) {
        problem(`src/${s.file}: recorded rename map does not apply: ${e.message}`);
        continue;
      }
    }
    if (body === expected) roundOK++;
    else if (!record) problem(`src/${s.file}: body differs from its readable range but rename-map.json records no map (unrecorded rename)`);
    else problem(`src/${s.file}: body is not a byte-exact round-trip of ${s.sourceFile} lines ${A}-${B} through the recorded rename map`);
  }
}

// ── rename-map honesty: every record addresses an eligible identifier ──
let mapOK = 0;
if (renameMap) {
  for (const [file, rec] of [
    ...Object.entries(renameMap.files).map(([f, m]) => [f, { flat: m, scoped: {} }]),
    ...Object.entries(renameMap.scoped).map(([f, m]) => [f, { flat: {}, scoped: m }]),
  ]) {
    if (!rangedFiles.has(file)) problem(`rename-map.json records ${file} but it is not a ranged slice in split-spec.json`);
    else if (!onDisk.includes(file)) problem(`rename-map.json records ${file} but it is not on disk`);
    const sec = sections.find((s) => s.file === file);
    if (!sec || typeof sec.startLine !== "number") continue;
    const lines = getLines(path.join(proj, ...sec.sourceFile.split("/")));
    const range = lines.slice(sec.startLine - 1, sec.endLine).join("\n") + "\n";
    const ts = tokens(range);
    const foreign = foreignNameIndices(ts);
    let ok = true;
    for (const [name, hits] of Object.entries(rec.scoped)) {
      for (const [i, target] of hits) {
        const t = ts[i];
        if (!t || t.t !== "id" || t.v !== name) {
          problem(`rename-map.json ${file}: index ${i} is not the identifier "${name}" (${t ? t.t : "none"})`);
          ok = false;
        } else if (foreign.has(i)) {
          problem(`rename-map.json ${file}: index ${i} ("${name}") is an import/export specifier (foreign) position`);
          ok = false;
        } else if (target === name) {
          problem(`rename-map.json ${file}: "${name}" maps to itself at ${i}`);
          ok = false;
        }
      }
    }
    for (const [name, target] of Object.entries(rec.flat)) if (target === name) problem(`rename-map.json ${file}: "${name}" maps to itself`);
    if (ok) mapOK++;
  }
}

// ── skipped sections: textual re-verification ───────────────────────────
let skippedOK = 0,
  skippedTotal = 0;
for (const s of sections) {
  if (s.skipped !== true || typeof s.sourceFile !== "string") continue;
  skippedTotal++;
  const src = path.join(proj, s.sourceFile);
  if (!fs.existsSync(src)) {
    problem(`skipped section ${s.file}: sourceFile missing: ${s.sourceFile}`);
    continue;
  }
  const lines = getLines(src);
  if (!Number.isInteger(s.startLine) || !Number.isInteger(s.endLine) || s.startLine < 1 || s.endLine > lines.length)
    continue;
  const first = lines[s.startLine - 1],
    last = lines[s.endLine - 1];
  if (typeof s.firstLine !== "string" || typeof s.lastLine !== "string")
    problem(`skipped section ${s.file}: no firstLine/lastLine recorded`);
  else if (first !== s.firstLine || last !== s.lastLine)
    problem(`skipped section ${s.file}: range text does not match the recorded first/last lines`);
  else skippedOK++;
}

// ── every src + pretty parses standalone ────────────────────────────────
let checkOK = 0;
for (const f of onDisk) if (parseCheck(srcAbs(f), `src/${f}`)) checkOK++;

const prettyFiles = [];
const walkPretty = (dir) => {
  if (!fs.existsSync(dir)) return;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walkPretty(p);
    else if (/\.pretty\.(js|css)$/i.test(e.name)) prettyFiles.push(p);
  }
};
walkPretty(readableDir);
if (!prettyFiles.length) problem("readable/ has no *.pretty.js|css (derived layer missing)");
let prettyOK = 0,
  prettyParsed = 0;
for (const abs of prettyFiles) {
  const rel = path.relative(proj, abs).split(path.sep).join("/");
  if (!/\.pretty\.js$/i.test(rel)) continue; // CSS pretties are indexed, not ESM-parsed
  prettyParsed++;
  if (parseCheck(abs, rel)) prettyOK++;
}

// ── inline-block twins + map + typed-data record (deliverable rule) ─────
const inlineMapPath = path.join(readableDir, "index-inline-map.json");
let inlineMap = null;
if (fs.existsSync(inlineMapPath)) {
  try {
    inlineMap = JSON.parse(fs.readFileSync(inlineMapPath, "utf8"));
  } catch (e) {
    problem(`readable/index-inline-map.json does not parse: ${e.message}`);
  }
}
const DATA_TYPES = new Set(["application/ld+json", "application/json", "importmap", "speculationrules"]);
const notRendered = Array.isArray(spec?.notRendered) ? spec.notRendered : [];
const inlineTwinRels = new Set();
let inlineBlocks = 0,
  inlineDataBlocks = 0;
for (const capRel of captured) {
  if (!/\.html$/i.test(capRel)) continue;
  const buf = fs.readFileSync(path.join(proj, capRel));
  const blocks = scanBlocks(buf);
  const entryTag = capRel.replace(/\.html$/i, ""); // served path of the document, dirs kept
  for (const b of blocks) {
    const type = (/\btype\s*=\s*["']?([^"'\s>]+)/i.exec(b.tag)?.[1] ?? "").toLowerCase();
    if (b.kind === "script" && DATA_TYPES.has(type)) {
      // typed data (application/ld+json) — recorded in notRendered, never a twin
      inlineDataBlocks++;
      const rec = notRendered.find((x) => x.capture === capRel && x.kind === "inline-data" && x.block === b.block);
      if (!rec) {
        problem(`${capRel}: typed data block #${b.block} (type=${type}) is not recorded in split-spec notRendered`);
        continue;
      }
      if (rec.byteStart !== b.contentStart || rec.byteEnd !== b.contentEnd || rec.sha256 !== b.sha256)
        problem(`${capRel}: notRendered block #${b.block} range/sha256 does not match the capture bytes`);
      continue;
    }
    inlineBlocks++;
    const twinExt = b.kind === "style" ? "css" : b.kind === "importmap" ? "json" : "js";
    const twin = `readable/${entryTag}-inline-${b.block}.pretty.${twinExt}`;
    inlineTwinRels.add(twin);
    if (!fs.existsSync(path.join(proj, twin))) problem(`${capRel}: inline ${b.kind} #${b.block} has no twin ${twin}`);
    else {
      const twinText = fs.readFileSync(path.join(proj, twin), "utf8");
      const content = buf.subarray(b.contentStart, b.contentEnd);
      if (twinText === content.toString("utf8"))
        problem(`${twin}: byte-identical to its capture block (prettier did not run?)`);
      if (twinExt === "json") {
        try {
          JSON.parse(twinText);
        } catch (e) {
          problem(`${twin}: does not parse as JSON: ${e.message}`);
        }
      }
    }
    const rec = inlineMap?.blocks?.find((x) => x.file === twin && x.source === capRel);
    if (!rec) {
      problem(`${capRel}: inline ${b.kind} #${b.block} is missing from readable/index-inline-map.json`);
      continue;
    }
    if (rec.byteStart !== b.contentStart || rec.byteEnd !== b.contentEnd || rec.sha256 !== b.sha256)
      problem(`${twin}: recorded inline byte range/sha256 does not match the capture bytes`);
  }
}
if (inlineMap && inlineBlocks === 0) problem("readable/index-inline-map.json exists but the capture has no inline blocks");

// ── every pretty referenced + provably derived + layer completeness ─────
const referenced = new Set();
for (const [sourceFile] of bySource) referenced.add(sourceFile.split(path.sep).join("/"));
let derivedOK = 0;
for (const abs of prettyFiles) {
  const rel = path.relative(proj, abs).split(path.sep).join("/");
  if (!referenced.has(rel))
    problem(`readable/${path.basename(rel)} exists but is not referenced by split-spec.json`);
  if (inlineTwinRels.has(rel)) {
    derivedOK++; // inline twins are byte-compared against their capture block above
    continue;
  }
  const capRel = captureByPretty.get(rel);
  const capAbs = capRel ? path.join(proj, capRel) : null;
  if (!capAbs || !fs.existsSync(capAbs)) {
    problem(`${rel}: capture source missing (no captured .js/.css maps to this pretty)`);
    continue;
  }
  if (manifest && !manifest.files?.[capRel])
    problem(`${rel}: capture source ${capRel} is not recorded in .upstream/manifest.json`);
  if (fs.readFileSync(capAbs).equals(fs.readFileSync(abs)))
    problem(`${rel}: byte-identical to its capture source (prettier did not run?)`);
  else derivedOK++;
}
if (manifest) {
  for (const capRel of captured) {
    if (!/\.(js|css)$/i.test(capRel)) continue;
    if (!prettyFiles.some((abs) => captureByPretty.get(path.relative(proj, abs).split(path.sep).join("/")) === capRel))
      problem(`captured ${capRel} has no readable twin referenced by the spec`);
  }
}

// ── the reading-copy shape: a whole-file section and the capture it is compared to ──
// The vendor bundles are indexed whole: the served capture is re-rendered into
// a reading copy under readable/ and never sliced, so the whole-file section
// names the reading copy as its DERIVED text and the capture as its PRISTINE:
//
//   { "file": "readable/assets/three.core-DVWDmH0S.pretty.js",
//     "wholeFile": true, "source": "assets/three.core-DVWDmH0S.js" }
//
// The frozen export gate then compares the capture's export table with the
// reading copy's — two DIFFERENT files, so the comparison is real rather than
// a file compared with itself.
//
// The rule below accepts that shape only when it is SOUND, so nothing is let
// through that the older rules would have caught:
//
//   - the reading copy is the capture's pretty under the mirror's own
//     served-path naming rule, and the recorded range covers it whole;
//   - the capture exists on disk and is a captured file: .upstream/
//     manifest.json records it, byte for byte;
//   - the two are DIFFERENT files (a copy of the capture would make the
//     comparison a self-compare, which can only ever pass and proves nothing);
//   - the section names the capture in `source`/`origin`/`from` and NOT in a
//     `capture` field: the gate rebinds a source's whole-file link to the
//     section naming that same capture, and the check would compare the
//     capture with itself;
//   - the two carry the SAME public export surface: no public export name of
//     the capture is missing from the reading copy, and the reading copy
//     exports no name the capture does not.
let readingCopyOK = 0;
for (const { s, capture } of readingCopySections) {
  const label = `section ${s.file}`;
  const copyRel = String(s.file);
  const copyAbs = path.join(proj, ...copyRel.split("/"));
  if (!capture) {
    problem(`${label}: the reading copy names no capture (source/origin/from) — the export gate has no pristine to compare it with`);
    continue;
  }
  if (typeof s.capture === "string" && s.capture) {
    problem(`${label}: the reading copy names its capture in \`capture\` — the export gate would rebind the source's whole-file link to this section and compare the capture with itself`);
    continue;
  }
  const capRel = String(capture);
  const capAbs = path.join(proj, ...capRel.split("/"));
  if (!fs.existsSync(capAbs) || !fs.statSync(capAbs).isFile()) {
    problem(`${label}: the capture is missing on disk: ${capRel}`);
    continue;
  }
  if (!manifest?.files?.[capRel]) {
    problem(`${label}: the capture ${capRel} is not a captured file (.upstream/manifest.json)`);
    continue;
  }
  const capBuf = fs.readFileSync(capAbs);
  if (sha256(capBuf) !== manifest.files[capRel].sha256) {
    problem(`${label}: the capture ${capRel} does not match .upstream/manifest.json`);
    continue;
  }
  // the two must be DIFFERENT files — different paths, and not byte-identical
  const copyBuf = fs.readFileSync(copyAbs);
  if (path.resolve(capAbs) === path.resolve(copyAbs) || capBuf.equals(copyBuf)) {
    problem(`${label}: the reading copy IS its capture (${capRel}) — a self-compare proves nothing`);
    continue;
  }
  // the mirror's own naming rule ties the reading copy to THAT capture
  const want = prettyNameOf(capRel);
  if (want !== copyRel) {
    problem(`${label}: the naming rule maps ${capRel} to ${want}, not to ${copyRel}`);
    continue;
  }
  // the recorded range must fit the reading copy it describes, and cover it whole
  const copyLines = getLines(copyAbs).length;
  if (
    !Number.isInteger(s.startLine) ||
    !Number.isInteger(s.endLine) ||
    s.startLine !== 1 ||
    s.endLine !== copyLines
  ) {
    problem(
      `${label}: the recorded range ${s.startLine}-${s.endLine} does not cover the reading copy ${copyRel} whole (${copyLines} lines)`,
    );
    continue;
  }
  // the two public export surfaces must be the same
  const capNames = exportsOf(capBuf.toString("utf8"));
  const copyNames = exportsOf(copyBuf.toString("utf8"));
  if (capNames.size) {
    if (!copyNames.size) {
      problem(`${label}: the reading copy ${copyRel} carries no export table`);
      continue;
    }
    const lost = [...capNames].filter((n) => !copyNames.has(n));
    if (lost.length) {
      problem(`${label}: a public export name of ${capRel} is missing from the reading copy: ${lost.join(", ")}`);
      continue;
    }
    const gained = [...copyNames].filter((n) => !capNames.has(n));
    if (gained.length) {
      problem(`${label}: the reading copy exports a name ${capRel} does not: ${gained.join(", ")}`);
      continue;
    }
  }
  readingCopyOK++;
}

// ── vendor rule: wholeFile sections carry the recorded shape ────────────
// The vendor bundles' whole-file section names its READING COPY (the file
// that exists); the toon vendor REGION is still an index label for a region
// that is never cut. The guards are keyed by the section's own `file`, so the
// bundle guards follow the reading copy.
const VENDOR_GUARDS = [
  ["readable/assets/three.core-DVWDmH0S.pretty.js", /__THREE__/, /`186`/],
  ["readable/assets/GLTFLoader-BAb7LzOS.pretty.js", /GLTFLoader/, /DRACOLoader|DRACO/],
  ["readable/assets/OrbitControls-CQWqkYLs.pretty.js", /OrbitControls/, /DEG2RAD/],
  ["readable/assets/lil-gui.esm-uYN4JE7y.pretty.js", /lil-gui/, /domElement/],
  ["readable/assets/Client-CpE02kO_.pretty.js", /matchmake/, /colyseus/i],
  ["readable/assets/modulepreload-polyfill-P2Xu9kJm.pretty.js", /modulepreload/, /MutationObserver/],
  ["assets/toon-CycGToy9-three-vendor.js", /WebGLRenderer:/, /uSlab/],
];
for (const [file, reA, reB] of VENDOR_GUARDS) {
  const sec = sections.find((s) => s.file === file);
  if (!sec) continue; // absence is fine; presence must hold its guard
  if (sec.wholeFile !== true) {
    problem(`vendor section ${file} is not wholeFile`);
    continue;
  }
  const text = getLines(path.join(proj, sec.sourceFile))
    .slice(sec.startLine - 1, sec.endLine)
    .join("\n");
  if (!reA.test(text) || !reB.test(text)) problem(`vendor section ${file}: content guard failed — readable changed shape`);
}

// ── the hard rule: src/ import resolution against the capture ───────────
let checkedImports = 0,
  resolvedImports = 0,
  whitelisted = 0;
for (const s of sections) {
  if (s.wholeFile === true || s.skipped === true) continue;
  if (!s.file || typeof s.sourceFile !== "string") continue;
  const srcPathAbs = srcAbs(s.file);
  if (!fs.existsSync(srcPathAbs)) continue;
  const capRel = captureByPretty.get(s.sourceFile);
  const baseDir = capRel ? path.posix.dirname(capRel) : null;
  const code = fs.readFileSync(srcPathAbs, "utf8");
  for (const { spec, kind, clause } of extractSpecifiers(code)) {
    checkedImports++;
    if (kind === "worker-url") {
      // runtime asset URL (`new URL("…", document.baseURI)`): interpolated
      // templates are dynamic asset-tree lookups (statically unenumerable —
      // whitelisted); plain paths resolve at the origin root against the capture.
      if (spec.includes("${")) {
        whitelisted++;
        continue;
      }
      const atRoot = spec.replace(/^(\.\/|\/)/, "");
      if (fs.existsSync(path.join(proj, atRoot))) {
        resolvedImports++;
        continue;
      }
      if (baseDir && fs.existsSync(path.join(proj, path.posix.normalize(path.posix.join(baseDir, spec))))) {
        resolvedImports++;
        continue;
      }
      problem(`src/${s.file}: runtime asset URL "${spec}" is not carried by the capture`);
      continue;
    }
    if (spec.startsWith("./") || spec.startsWith("../")) {
      if (!baseDir) {
        problem(`src/${s.file}: ${kind} import "${spec}" but no capture provenance is known`);
        continue;
      }
      const target = path.posix.normalize(path.posix.join(baseDir, spec));
      if (!fs.existsSync(path.join(proj, target))) {
        problem(`src/${s.file}: unresolvable ${kind} import "${spec}" (capture carries no ${target})`);
        continue;
      }
      resolvedImports++;
      const targetCode = fs.readFileSync(path.join(proj, target), "utf8");
      const targetExports = exportsOf(targetCode);
      for (const n of namedImports(clause)) {
        if (n === "*" || targetExports.has(n) || targetExports.has("*")) continue;
        problem(`src/${s.file}: imports { ${n} } from "${spec}" but ${target} does not export it`);
      }
      continue;
    }
    if (spec.startsWith("node:") || spec.startsWith("vite/") || spec.startsWith("/")) {
      whitelisted++;
      continue;
    }
    problem(`src/${s.file}: unresolvable ${kind} import "${spec}" — bare/URL specifier not whitelisted`);
  }
}

// ── derived layers must never enter the capture sums ────────────────────
if (manifest) {
  for (const rel of captured) {
    if (/^(readable|src|legacy)\//.test(rel) || rel === "split-spec.json" || rel === "rename-map.json")
      problem(`derived layer leaked into the capture manifest: ${rel}`);
  }
}

// ── best-effort: re-render every pretty with the pinned prettier 3.9.6 ─
const prettierCandidates = [
  process.env.PRETTIER_MJS,
  path.join(proj, "node_modules", "prettier", "index.mjs"),
  "D:/repos/mirrors/metropolygonia/node_modules/prettier/index.mjs",
].filter(Boolean);
function loadPinnedPrettier() {
  for (const c of prettierCandidates) {
    if (!fs.existsSync(c)) continue;
    try {
      const pkg = JSON.parse(fs.readFileSync(path.join(path.dirname(c), "package.json"), "utf8"));
      if (pkg.version !== PINNED) continue;
      return c;
    } catch {
      /* keep looking */
    }
  }
  return null;
}

(async () => {
  let renderNote = `prettier ${PINNED} not importable — renderOptions recorded, re-render check skipped`;
  const prettierPath = loadPinnedPrettier();
  if (prettierPath) {
    const prettier = (await import(pathToFileURL(prettierPath).href)).default;
    let renderOK = 0;
    let renderTotal = 0;
    // file pretties re-render from their capture file (one pass, matching derive)
    for (const abs of prettyFiles) {
      const rel = path.relative(proj, abs).split(path.sep).join("/");
      if (inlineTwinRels.has(rel)) continue;
      const capRel = captureByPretty.get(rel);
      const capAbs = capRel ? path.join(proj, capRel) : null;
      if (!capAbs || !fs.existsSync(capAbs)) continue; // already reported
      renderTotal++;
      const parser = /\.pretty\.css$/i.test(rel) ? "css" : "babel";
      const got = await prettier.format(fs.readFileSync(capAbs, "utf8"), { parser });
      const want = fs.readFileSync(abs, "utf8");
      if (got === want) renderOK++;
      else problem(`${rel}: does not re-render byte-exact under pinned prettier ${PINNED} ({parser:${parser}})`);
    }
    // inline twins re-render from their capture byte range
    for (const capRel of captured) {
      if (!/\.html$/i.test(capRel)) continue;
      const buf = fs.readFileSync(path.join(proj, capRel));
      for (const b of scanBlocks(buf)) {
        const type = (/\btype\s*=\s*["']?([^"'\s>]+)/i.exec(b.tag)?.[1] ?? "").toLowerCase();
        if (b.kind === "script" && DATA_TYPES.has(type)) continue; // data block, no twin
        const entryTag = capRel.replace(/\.html$/i, ""); // served path of the document, dirs kept
        const twinExt = b.kind === "style" ? "css" : b.kind === "importmap" ? "json" : "js";
        const twin = path.join(proj, "readable", `${entryTag}-inline-${b.block}.pretty.${twinExt}`);
        if (!fs.existsSync(twin)) continue; // already reported
        renderTotal++;
        const parser = twinExt === "json" ? "json" : twinExt === "css" ? "css" : "babel";
        const got = await prettier.format(buf.subarray(b.contentStart, b.contentEnd).toString("utf8"), { parser });
        const want = fs.readFileSync(twin, "utf8");
        if (got === want) renderOK++;
        else problem(`readable/${path.basename(twin)}: does not re-render byte-exact under pinned prettier ${PINNED} ({parser})`);
      }
    }
    renderNote = `${renderOK}/${renderTotal} pretties re-render byte-exact under pinned prettier ${PINNED}`;
  }

  if (problems.length) {
    console.error(`AUDIT FAIL — ${problems.length} problem(s)`);
    for (const p of problems) console.error("  " + p);
    process.exit(1);
  }
  const renameNote = renameMap
    ? `rename map: ${Object.values(renameMap.files).reduce((n, m) => n + Object.keys(m).length, 0)} word-boundary record(s) + ` +
      `${Object.values(renameMap.scoped).reduce((n, m) => n + Object.keys(m).length, 0)} indexed name(s) over ` +
      `${Object.values(renameMap.scoped).reduce((n, m) => n + Object.values(m).reduce((k, h) => k + h.length, 0), 0)} occurrence(s) ` +
      `(${renamedSlices} renamed slice(s), mapOK ${mapOK} slice(s) token-validated, no foreign position), `
    : "no rename-map.json (campaign not run), ";
  console.log(
    `AUDIT PASS — ${sections.length} spec sections (${roundOK}/${ranged} src↔pretty round-trips byte-exact through the recorded rename map, ` +
      `${tiledOK}/${bySource.size} pretty sources tiled contiguously, ` +
      `${skippedOK}/${skippedTotal} skipped export-table sections re-verified textually, ` +
      `${checkOK}/${onDisk.length} src slices + ${prettyOK}/${prettyParsed} readable/*.pretty.js parse standalone (node --input-type=module --check -), ` +
      `${derivedOK}/${prettyFiles.length} pretties provably distinct from their capture source, ` +
      `${indexOnlyFiles.size} index-only wholeFile/skipped sections carry no src file, ` +
      `${readingCopyOK}/${readingCopySections.length} whole-file reading-copy section(s) compared against their capture, ` +
      `${inlineBlocks} inline content block(s) with twins + index-inline-map.json, ${inlineDataBlocks} typed data block(s) recorded in notRendered, ` +
      `${resolvedImports}/${checkedImports} imports resolve inside the capture (${whitelisted} whitelisted machinery), ` +
      `${renameNote}` +
      `${renderNote}, capture manifest free of derived layers)`,
  );
})();
