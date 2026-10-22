// check-links.mjs — does every export table in this mirror's derived layer
// name only bindings the layer actually declares?
//
// THE CLASS THIS GATE GUARDS
//   In an ES module, `export { x }` names a binding OF THAT MODULE. When x is
//   not declared there the module does not link: it is a hard SyntaxError
//   ("Export 'x' is not defined"), and the file cannot be imported at all.
//
//   The mirror's own gates do not see this class:
//     - check-exports.mjs compares a CAPTURE's export table with the LAYER's
//       PUBLIC names. It never asks whether the layer's own export statement
//       names a binding the layer declares.
//     - verify.mjs re-hashes the capture and re-derives every slice from its
//       recorded range. A slice that exports a name it does not declare still
//       round-trips byte-exactly.
//
// WHAT IT CHECKS
//   For every module the layer was cut from:
//     1. the module is reassembled from the LAYER's OWN bytes — every slice
//        contributes its payload, and every range the layer does not carry
//        (a skipped tail, a whole-file vendor region) contributes the
//        mirror's own recorded bytes — and the reassembly is linked;
//     2. a slice of that module that carries an export table and whose own
//        strict-ESM check (`node --input-type=module --check -`) reports
//        "Export 'x' is not defined" exports a name it does not declare. If
//        the module links, the binding is declared by a SIBLING SLICE: the
//        layer is cut from one scope, the pieces together are the module, and
//        the slice is a FRAGMENT, not a defect. If the module does not link
//        either, the binding exists NOWHERE and that is a real break, which
//        the gate names.
//
// THE RANGE THE LAYER DOES NOT CARRY
//   A chunk's final export table is an INDEX-ONLY region in this mirror: it
//   is not a file in src/, it is recorded in split-spec.json as a `skipped`
//   section with its own `text`, and the mirror's reading copy holds the same
//   table. Two things follow, and both are handled here rather than
//   suppressed:
//
//     · the reassembly takes those bytes from the mirror's own record
//       (section.text) or from the reading copy's range — never from a
//       capture the layer does not carry;
//     · the recorded bytes are the CAPTURE's spelling. This mirror carries a
//       rename layer, so the layer declares the same binding under a
//       different name in src/, and the export table is rewritten into the
//       LAYER's spelling before the module is linked. The rule is the
//       campaign's own: the LOCAL name of a specifier becomes the layer's
//       name, the EXPORTED name is never touched, and a renamed shorthand
//       becomes `TARGET as ORIGINAL`.
//
// WHY THE ENGINE IS THE JUDGE
//   The question that matters is the one the engine answers: does this text
//   link? So the gate asks the engine — once for the file, once for the
//   module the file belongs to, once per candidate sibling — instead of
//   asking a parser which names it thinks a file declares.
//
// NOTHING IS INVENTED
//   The reassembly is the layer's own bytes plus the mirror's own recorded
//   ranges, and every rename comes from the mirror's own rename record
//   (split-spec.json sources[].renameBindings, cross-checked against
//   the mirror's rename-map.json). Nothing is re-derived and nothing is guessed.
//
// WHAT IT DOES NOT COVER
//   - A module that does not link even after the reassembly (a chunk whose
//     own text is not a module) cannot be judged for this class; the gate says
//     so instead of guessing.
//   - The IMPORT side of the layer graph (a named import the target does not
//     export) is a different class with a different owner.
//
// THIS MIRROR'S CONVENTIONS
//   - The layer is src/ (214 statement-aligned slices over the 50 app
//     chunks). THE LAYER ROOT IS THE ONLY PLACE A LAYER FILE IS LOOKED FOR:
//     this mirror keeps the served captures at the mirror root under the very
//     paths split-spec.json uses (8 of its sections name a file that exists at
//     the root as a capture — e.g. `assets/main-BefG6oT8.css`), so a
//     mirror-root search would mistake a capture for a layer file.
//   - The layer carries a RENAME LAYER (rename-map.json, re-applied by
//     tools/derive.mjs). The recorded tail is therefore in the CAPTURE's
//     spelling — `export { t as patchToon, e as toonMaterial }` — while
//     src/assets/toon-L4_S6Akl-01.js declares `patchToon` and
//     `toonMaterial`. The tail is rewritten into the layer's spelling before
//     the module is linked; without that rewrite this gate reports 42 false
//     breaks on this mirror.
//   - The rename record is read from the mirror's own two records:
//     split-spec.json sources[].renameBindings (per source) and the mirror's
//     rename-map.json (`files` + `scoped`, per slice). A name the two
//     disagree on is a conflict the gate reports instead of guessing.//
// Usage: node tools/check-links.mjs [--quiet]
// Exits 1 if a layer file exports a binding the layer does not declare.

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const PROJ = path.resolve(HERE, "..");
const SRC = path.join(PROJ, "src");
const QUIET = process.argv.includes("--quiet");

const read = (p) => {
  try {
    return fs.readFileSync(p, "utf8");
  } catch {
    return null;
  }
};

/**
 * The engine's own verdict on a text: does it link as an ES module?
 * `--input-type=module --check -` is the strict-ESM path: the CJS path lets an
 * export table name a binding the module never declares through.
 */
function esmCheck(text) {
  const r = spawnSync(process.execPath, ["--input-type=module", "--check", "-"], {
    input: text,
    encoding: "utf8",
    maxBuffer: 256 * 1024 * 1024,
  });
  if (r.status === 0) return { ok: true, missing: null, error: null };
  const err = String(r.stderr || "") + String(r.stdout || "");
  const m = /Export '([^']+)' is not defined/.exec(err);
  const lines = err.trim().split("\n").filter((l) => l.trim());
  const said = lines.find((l) => /Error/.test(l)) || lines[lines.length - 1] || err.trim();
  return {
    ok: false,
    missing: m ? m[1] : null,
    error: said.trim(),
  };
}

const ESCAPE_RE = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** The export tables of a text, as [start, end) spans. */
function exportTableSpans(text) {
  const spans = [];
  const re = /\bexport\s*\{/g;
  let m;
  while ((m = re.exec(text)) !== null) {
    const brace = text.indexOf("{", m.index);
    if (brace < 0) break;
    let depth = 1;
    let i = brace + 1;
    while (i < text.length && depth > 0) {
      if (text[i] === "{") depth++;
      else if (text[i] === "}") depth--;
      i++;
    }
    if (depth !== 0) break;
    spans.push([m.index, i]);
    re.lastIndex = i;
  }
  return spans;
}

/**
 * The names a file's export statement exports that the file itself does not
 * declare. The engine names one per check, so the check is repeated with the
 * offending specifier removed each time: what is left is the whole list.
 */
function undeclaredExports(text) {
  const out = [];
  let probe = text;
  for (let i = 0; i < 500; i++) {
    const v = esmCheck(probe);
    if (v.ok || !v.missing) break;
    if (out.includes(v.missing)) break;
    out.push(v.missing);
    const next = blankSpecifier(probe, v.missing);
    if (next === probe) break;
    probe = next;
  }
  return out;
}

/** Remove the export specifier whose SOURCE name is `name` (the probe only). */
function blankSpecifier(text, name) {
  return text.replace(/\bexport\s*\{([^}]*)\}/g, (whole, body) => {
    const kept = body.split(",").filter((part) => {
      const seg = part.trim();
      if (!seg) return false; // an empty element is a syntax error
      const m = /^([A-Za-z_$][\w$]*)\s+as\s+/.exec(seg);
      return (m ? m[1] : seg) !== name;
    });
    return whole.replace(body, kept.join(", "));
  });
}

/**
 * Erase every mention of `name` in a text, EXCEPT inside an export table:
 * the export table is the question being asked, so it must keep naming the
 * name. A module whose declaration of the name has been erased then fails to
 * link, and that is how the declaring slice is found.
 */
function eraseName(text, name, probe) {
  const spans = exportTableSpans(text);
  const re = new RegExp(`(?<![\\w$])${ESCAPE_RE(name)}(?![\\w$])`, "g");
  let out = "";
  let at = 0;
  for (const [s, e] of spans) {
    out += text.slice(at, s).replace(re, probe);
    out += text.slice(s, e);
    at = e;
  }
  out += text.slice(at).replace(re, probe);
  return out;
}

/** The slice's payload: its text without the header comment lines. */
function payloadLines(text) {
  const raw = text.split("\n");
  if (raw.length && raw[raw.length - 1] === "") raw.pop(); // the final newline
  let h = 0;
  while (h < raw.length && /^\s*\/\//.test(raw[h])) h++;
  return raw.slice(h);
}

/** Every .js file under a directory. */
function walkJs(dir, out = []) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walkJs(p, out);
    else if (e.name.endsWith(".js")) out.push(p);
  }
  return out;
}

// ── the mirror's own record of the layer ───────────────────────────────────
const specPath = path.join(PROJ, "split-spec.json");
if (!fs.existsSync(specPath)) {
  console.log("check-links: no split-spec.json - this mirror has no derived layer to check");
  process.exit(0);
}
const spec = JSON.parse(fs.readFileSync(specPath, "utf8"));

/** The layer file a section names, if it is on disk under the layer root. */
function layerFileOf(sec) {
  const rel = String(sec.file || "").replace(/\\/g, "/");
  if (!rel) return null;
  const c = path.join(SRC, rel);
  try {
    if (fs.existsSync(c) && fs.statSync(c).isFile()) return c;
  } catch {
    /* not a layer file */
  }
  return null;
}

/** A text of the mirror's own record for a section: its recorded text, or its
 *  range in the reading copy the section was cut from. */
function recordedText(sec, sourceFile) {
  if (typeof sec.text === "string" && sec.text.length) return sec.text;
  const orig = read(path.join(PROJ, sourceFile));
  if (orig === null) return null;
  if (!Number.isInteger(sec.startLine) || !Number.isInteger(sec.endLine)) return null;
  const lines = orig.split("\n");
  return lines.slice(sec.startLine - 1, sec.endLine).join("\n");
}

// ── the rename record ──────────────────────────────────────────────────────
// The mirror records, per source, the capture-side name of every binding the
// rename layer renamed and the layer-side name it became
// (split-spec.json sources[].renameBindings). rename-map.json is the same
// record in its own shape (per slice); it is read as a cross-check, and it
// lives at the mirror ROOT in this fleet's mirrors.
const renameMapPath = [
  path.join(PROJ, "rename-map.json"),
  path.join(PROJ, "tools", "rename-map.json"),
].find((p) => fs.existsSync(p));
const renameMapFile = renameMapPath
  ? JSON.parse(fs.readFileSync(renameMapPath, "utf8"))
  : null;

function sourceRecord(sourceFile) {
  for (const s of spec.sources || []) {
    if (s.sourceFile === sourceFile) return s;
  }
  return null;
}

/**
 * The rename map of one module: capture-side name -> layer-side name.
 * The spec's own record is the primary source; the per-slice map only fills
 * in names the spec does not record, and a name the two disagree on is a
 * conflict the gate refuses to guess about.
 */
function moduleRenameMap(sourceFile, sliceFiles) {
  const map = new Map();
  const conflicts = [];
  const places = new Map(); // layer-side name -> the slice(s) the rename record puts it in
  const rec = sourceRecord(sourceFile);
  for (const [from, to] of Object.entries((rec && rec.renameBindings) || {})) {
    map.set(from, to);
  }
  if (renameMapFile) {
    for (const f of sliceFiles) {
      const per = (renameMapFile.files || {})[f] || {};
      for (const [from, to] of Object.entries(per)) {
        if (!map.has(from)) map.set(from, to);
        else if (map.get(from) !== to) conflicts.push(`${from} -> ${map.get(from)} / ${to}`);
        if (!places.has(to)) places.set(to, new Set());
        places.get(to).add(f);
      }
      const scoped = (renameMapFile.scoped || {})[f] || {};
      for (const [from, list] of Object.entries(scoped)) {
        for (const [, to] of list) {
          if (!map.has(from)) map.set(from, to);
          else if (map.get(from) !== to) conflicts.push(`${from} -> ${map.get(from)} / ${to}`);
          if (!places.has(to)) places.set(to, new Set());
          places.get(to).add(f);
        }
      }
    }
  }
  return { map, conflicts, places };
}

/**
 * Rewrite an export table into the LAYER's spelling.
 *
 * The campaign's own rule: the LOCAL name of a specifier becomes the layer's
 * name, the EXPORTED name is never touched, and a renamed shorthand becomes
 * `TARGET as ORIGINAL`. A local the rename layer never renamed is left alone.
 */
let rewrittenSpecifiers = 0;

function rewriteExportTables(text, renames) {
  if (!renames || renames.size === 0) return text;
  const spans = exportTableSpans(text);
  if (!spans.length) return text;
  let out = "";
  let at = 0;
  for (const [s, e] of spans) {
    out += text.slice(at, s);
    const whole = text.slice(s, e);
    const brace = whole.indexOf("{");
    const head = whole.slice(0, brace + 1);
    const body = whole.slice(brace + 1, whole.length - 1);
    const tail = whole.slice(whole.length - 1);
    const rewritten = body
      .split(",")
      .map((part) => {
        const seg = part.trim();
        if (!seg) return part;
        const m = /^([A-Za-z_$][\w$]*)\s+as\s+([A-Za-z_$][\w$]*)$/.exec(seg);
        const local = m ? m[1] : seg;
        const exported = m ? m[2] : seg;
        if (!/^[A-Za-z_$][\w$]*$/.test(local)) return part;
        const layer = renames.get(local);
        if (!layer || layer === local) return part;
        // a renamed shorthand keeps the ORIGINAL name as the exported name
        rewrittenSpecifiers++;
        return m ? `${layer} as ${exported}` : `${layer} as ${local}`;
      })
      .join(",");
    out += head + rewritten + tail;
    at = e;
  }
  out += text.slice(at);
  return out;
}

// ── the module ─────────────────────────────────────────────────────────────
/**
 * The parts of one module, in order: every slice contributes its payload, and
 * every range the layer does not carry contributes the mirror's own recorded
 * bytes.
 *
 * The slices are CONCATENATED, not mapped onto line numbers: a slice is cut
 * mid-statement, so its payload is a fragment, and a fragment only means
 * anything in the company of its neighbours.
 */
function moduleParts(sourceFile, sections) {
  const orig = read(path.join(PROJ, sourceFile));
  const pristine = orig === null ? null : orig.split("\n");
  const parts = [];
  let prevEnd = 0;
  let sliceNo = 0;
  for (const sec of sections) {
    if (!Number.isInteger(sec.startLine) || !Number.isInteger(sec.endLine)) continue;
    if (pristine && sec.startLine > prevEnd + 1) {
      parts.push({
        kind: "original",
        file: sourceFile,
        text: pristine.slice(prevEnd, sec.startLine - 1).join("\n"),
      });
    }
    const f = layerFileOf(sec);
    if (f) {
      parts.push({
        kind: "slice",
        file: path.relative(PROJ, f).replace(/\\/g, "/"),
        text: payloadLines(read(f)).join("\n"),
        sliceNo: sliceNo++,
      });
    } else {
      const t = recordedText(sec, sourceFile);
      if (t !== null) parts.push({ kind: "original", file: sourceFile, text: t });
    }
    if (sec.endLine > prevEnd) prevEnd = sec.endLine;
  }
  return parts;
}

const moduleText = (parts) => parts.map((p) => p.text).join("\n");

/**
 * The slice that DECLARES `name`, when the module's declaration statement
 * begins in an EARLIER slice than its declarator does.
 *
 * A cut module can split one declaration statement across slices: the
 * `var`/`let`/`const` head sits in one slice and the declarators that
 * follow it in the next. The name is bound by the statement, so the slice
 * that holds the HEAD is the one that declares it.
 */
function declarationHeadSlice(parts, name, afterSlice) {
  const text = moduleText(parts);
  const re = new RegExp(`(?<![\\w$])${ESCAPE_RE(name)}(?![\\w$])`, "g");
  let m;
  while ((m = re.exec(text)) !== null) {
    const at = m.index;
    let offset = 0;
    let sliceOf = null;
    for (const part of parts) {
      const end = offset + part.text.length;
      if (at >= offset && at < end) {
        sliceOf = part;
        break;
      }
      offset = end + 1;
    }
    if (!sliceOf || sliceOf.kind !== "slice") continue;
    if (afterSlice !== null && sliceOf.sliceNo > afterSlice) continue;
    const beforeName = text.slice(0, at).replace(/\s+$/, "");
    if (!/(,|=)$/.test(beforeName)) continue;
    let depth = 0;
    for (let i = at - 1; i >= 0; i--) {
      const c = text[i];
      if (c === "}" || c === ")" || c === "]") {
        depth++;
        continue;
      }
      if (c === "{" || c === "(" || c === "[") {
        if (depth === 0) break;
        depth--;
        continue;
      }
      if (depth !== 0) continue;
      const head = /(^|[^\w$])(var|let|const)\s*$/.exec(text.slice(Math.max(0, i - 6), i + 1));
      if (head) {
        const headAt = text.lastIndexOf(head[2], at);
        if (headAt >= 0) {
          let off = 0;
          for (const part of parts) {
            const end = off + part.text.length;
            if (headAt >= off && headAt < end) return part.kind === "slice" ? part.file : null;
            off = end + 1;
          }
        }
        return null;
      }
    }
  }
  return null;
}

/**
 * The slice of the module that DECLARES `name`, found by asking the engine:
 * the name is erased from a prefix of the slices at a time, and the slice
 * whose erasure breaks the module is the one that declared it.
 */
function declaringSlice(parts, name) {
  const slices = parts.filter((p) => p.kind === "slice");
  if (slices.length < 2) return null;
  const probe = "__probe_" + name.replace(/[^A-Za-z0-9_$]/g, "_");
  const withPrefix = (k) => {
    let n = -1;
    return parts
      .map((p) => {
        if (p.kind !== "slice") return p.text;
        n++;
        return n <= k ? eraseName(p.text, name, probe) : p.text;
      })
      .join("\n");
  };
  if (esmCheck(withPrefix(slices.length - 1)).ok) return null;
  let lo = 0;
  let hi = slices.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (esmCheck(withPrefix(mid)).ok) lo = mid + 1;
    else hi = mid;
  }
  const found = slices[lo];
  const head = declarationHeadSlice(parts, name, found.sliceNo);
  return head || found.file;
}

// ── the layer ──────────────────────────────────────────────────────────────
const files = walkJs(SRC).sort();
if (!files.length) {
  console.log("check-links: no layer file under src/ - nothing to check");
  process.exit(0);
}

// the modules, by the original they were cut from
const modules = new Map();
for (const sec of spec.sections || []) {
  if (!sec.file || !sec.sourceFile) continue;
  if (!Number.isInteger(sec.startLine) || !Number.isInteger(sec.endLine)) continue;
  // A section whose kind says it is a MODULE FACTORY is a whole ES module of
  // its own: two factories of one chunk do not share a scope, so they must
  // not be grouped by sourceFile. This mirror has no such section; the
  // guard is here so the gate says so instead of merging unrelated modules.
  if (sec.kind === "module-factory") {
    console.log(`check-links: refusing to group ${sec.file} with its chunk (kind: module-factory)`);
    process.exit(1);
  }
  if (!modules.has(sec.sourceFile)) modules.set(sec.sourceFile, []);
  modules.get(sec.sourceFile).push(sec);
}
for (const list of modules.values()) list.sort((a, b) => a.startLine - b.startLine);

const problems = [];
const fragments = [];
const unjudged = [];
let withTable = 0;
let modulesChecked = 0;
let modulesWithTable = 0;

for (const [sourceFile, sections] of [...modules.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
  // the slices of this module that the layer actually carries
  const carriers = [];
  for (const sec of sections) {
    const f = layerFileOf(sec);
    if (!f) continue;
    const text = read(f);
    if (text === null || !/\bexport\s*\{/.test(text)) continue;
    withTable++;
    carriers.push({ sec, file: f, rel: path.relative(PROJ, f).replace(/\\/g, "/") });
  }
  const sliceCount = sections.filter((s) => layerFileOf(s)).length;
  if (sliceCount === 0) continue; // the layer carries no slice of this source: not a module of the layer
  modulesChecked++;

  const sliceFiles = sections.filter((s) => layerFileOf(s)).map((s) => String(s.file).replace(/\\/g, "/"));
  const { map: renames, conflicts, places } = moduleRenameMap(sourceFile, sliceFiles);
  if (conflicts.length) {
    unjudged.push(
      `${sourceFile}: the mirror's two rename records disagree (${conflicts.join("; ")}) - the export table cannot be rewritten into the layer's spelling, so the module is not judged`,
    );
    continue;
  }

  const parts = moduleParts(sourceFile, sections);
  // The ranges the layer does not carry are the mirror's own recorded bytes:
  // they are the capture's spelling, so an export table among them is
  // rewritten into the layer's spelling before the module is linked.
  for (const p of parts) {
    if (p.kind === "original") p.text = rewriteExportTables(p.text, renames);
  }

  const text = moduleText(parts);
  if (!/\bexport\s*\{/.test(text)) continue; // the module carries no export table
  modulesWithTable++;

  let module = esmCheck(text);
  if (!module.ok && !module.missing) {
    const spans = exportTableSpans(text);
    if (spans.length) {
      let at = 0;
      let body = "";
      const tables = [];
      for (const [s, e] of spans) {
        body += text.slice(at, s);
        tables.push(text.slice(s, e));
        at = e;
      }
      body += text.slice(at);
      const alt = esmCheck(body + "\n" + tables.join("\n") + "\n");
      if (alt.ok || alt.missing) module = alt;
    }
  }

  if (!module.ok && module.missing) {
    // The module as the LAYER's own bytes export a name nothing declares.
    const names = undeclaredExports(text);
    const listed = names.length ? names : [module.missing];
    // Where the binding should have been declared: the mirror's own rename
    // record places it, and where there is no rename record the layer files
    // that still mention the name are the ones to look at.
    const where = [];
    for (const name of listed) {
      const at = places.get(name);
      if (at && at.size) {
        where.push(`${name} (the rename record puts it in ${[...at].map((f) => `src/${f}`).join(", ")})`);
        continue;
      }
      const re = new RegExp(`(?<![\\w$])${ESCAPE_RE(name)}(?![\\w$])`);
      const mentions = parts
        .filter((p) => p.kind === "slice" && re.test(p.text))
        .map((p) => p.file);
      if (mentions.length) {
        where.push(
          `${name} (the layer file(s) that mention it: ${mentions.slice(0, 4).join(", ")}${mentions.length > 4 ? `, … (${mentions.length} in all)` : ""})`,
        );
      } else {
        const slices = parts.filter((p) => p.kind === "slice").map((p) => p.file);
        where.push(
          `${name} (the module's layer file(s): ${slices.slice(0, 4).join(", ")}${slices.length > 4 ? `, … (${slices.length} in all)` : ""})`,
        );
      }
    }
    problems.push(
      `${sourceFile}: the layer's own bytes export { ${listed.join(", ")} } but no binding named ${listed[0]} is declared in any slice of that module — ${where.join("; ")} (export table in: ${carriers.map((c) => c.rel).join(", ") || "an index-only tail"})`,
    );
    continue;
  }
  if (!module.ok) {
    unjudged.push(`${sourceFile}: the module does not link as an ES module (${module.error}) - the binding cannot be located`);
    continue;
  }

  for (const c of carriers) {
    const missing = undeclaredExports(read(c.file));
    if (!missing.length) continue; // the file links on its own, or fails for another reason
    const where = [];
    for (const name of missing) {
      const s = declaringSlice(parts, name);
      where.push(`${name} (declared by ${s ? s : "a sibling slice"})`);
    }
    fragments.push(
      `${c.rel}: exports { ${missing.join(", ")} } - ${where.join("; ")}: a sibling slice of ${sourceFile} declares it, so the module is whole (fragment, not a defect)`,
    );
  }
}

if (!QUIET) {
  console.log(`check-links: ${files.length} file(s) in src/`);
  console.log(`  modules of the layer (a source the layer carries a slice of): ${modulesChecked}`);
  console.log(`  modules carrying an export table: ${modulesWithTable}`);
  console.log(`  files carrying an export table: ${withTable}`);
  console.log(`  export specifiers rewritten into the layer's spelling: ${rewrittenSpecifiers}`);
  console.log(
    `  rename records: split-spec.json sources[].renameBindings + ${
      renameMapPath ? path.relative(PROJ, renameMapPath) : "(no rename map in this mirror)"
    }`,
  );
  console.log(`  fragment exports (a sibling slice of the same module declares the binding): ${fragments.length}`);
  for (const f of fragments) console.log(`    ${f}`);
  if (unjudged.length) {
    console.log(`  not judged (the module does not link, so the binding cannot be located): ${unjudged.length}`);
    for (const u of unjudged) console.log(`    ${u}`);
  }
  if (problems.length) {
    console.log(`  LINK PROBLEMS: ${problems.length}`);
    for (const p of problems) console.log(`    ${p}`);
  }
}
if (problems.length) process.exit(1);
if (!QUIET) console.log("  every export table names a binding the layer declares: YES");
