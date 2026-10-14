// propose-names.mjs — propose semantic renames from evidence and merge them into
// tools/names.json (the campaign worklist applied by tools/apply-names.mjs).
//
//   node tools/propose-names.mjs            # propose + merge into tools/names.json
//   node tools/propose-names.mjs --dry      # print proposals, write nothing
//
// Evidence used (never guesses):
//
//   1. A chunk's own export table. `export { <local> as <SemanticName> }` ties a
//      minified local binding to the semantic name its consumers use — so the
//      LOCAL gets renamed (the public name is the served API and never changes).
//      A public name is treated as semantic when it looks like one (length ≥ 4
//      or contains `_`), which keeps minified publics (`C`, `At`, `_`) untouched.
//
//   2. Other chunks' import clauses. `import { <Public> as <local> } from "./x.js"`
//      where `<Public>` is a semantic public name of x.js (evidence 1) means the
//      importing local binding IS that thing — rename the local to the public
//      name. This is how a name learned from one chunk's export table reaches
//      every consumer of that chunk.
//
// Curated entries already present in names.json are never overwritten.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getAcorn } from "./lib-acorn.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const proj = path.resolve(here, "..");
const dry = process.argv.includes("--dry");
const acorn = await getAcorn();

const spec = JSON.parse(fs.readFileSync(path.join(proj, "split-spec.json"), "utf8"));
const namesPath = path.join(here, "names.json");
const names = fs.existsSync(namesPath) ? JSON.parse(fs.readFileSync(namesPath, "utf8")) : {};

const semantic = (n) =>
  /^[A-Za-z_$][\w$]*$/.test(n) &&
  n.length >= 4 &&
  /[A-Za-z]/.test(n) &&
  !/^[A-Z]{2,3}$/.test(n) &&
  !/^(default|arguments|eval|undefined|NaN|Infinity)$/.test(n);

// ── pass 1: semantic public names per chunk ─────────────────────────────
const chunkOf = new Map(); // capture rel -> { sourceFile, publics:Set, imports:[…] }
for (const src of spec.sources) {
  if (!/\.pretty\.js$/.test(src.sourceFile || "") || !src.capture.endsWith(".js")) continue;
  if (!src.derived.startsWith("readable +")) continue; // app chunks only — vendor stays minified
  const code = fs.readFileSync(path.join(proj, src.sourceFile), "utf8");
  let ast;
  try {
    ast = acorn.parse(code, { ecmaVersion: 2023, sourceType: "module" });
  } catch {
    continue;
  }
  const publics = new Map(); // public name -> local name
  const imports = [];
  for (const st of ast.body) {
    if (st.type === "ImportDeclaration") {
      for (const s of st.specifiers) {
        if (s.type === "ImportSpecifier") imports.push({ imported: s.imported.name, local: s.local.name, from: st.source.value });
      }
    } else if (st.type === "ExportNamedDeclaration") {
      for (const s of st.specifiers || []) {
        if (s.local && s.exported && s.local.start !== s.exported.start) publics.set(s.exported.name, s.local.name);
      }
    }
  }
  chunkOf.set(src.capture, { sourceFile: src.sourceFile, publics, imports });
}

// public name -> semantic public name (only when the public name itself reads)
const semanticPublics = new Set();
for (const { publics } of chunkOf.values()) for (const p of publics.keys()) if (semantic(p)) semanticPublics.add(p);

// ── pass 2: propose per chunk ───────────────────────────────────────────
const added = new Map(); // capture -> { name: target, evidence }
const note = (capture, from, to, why) => {
  if (!added.has(capture)) added.set(capture, new Map());
  added.get(capture).set(from, { to, why });
};
for (const [capture, info] of chunkOf) {
  // evidence 1: own export table, local side
  for (const [publicName, local] of info.publics) {
    if (!semantic(publicName)) continue;
    if (local === publicName) continue;
    note(capture, local, publicName, `own export table: local \`${local}\` is exported as \`${publicName}\``);
  }
  // evidence 2: imports whose public name is a known semantic public
  for (const imp of info.imports) {
    if (!semanticPublics.has(imp.imported)) continue;
    if (imp.local === imp.imported) continue;
    note(capture, imp.local, imp.imported, `import { ${imp.imported} as ${imp.local} } from "${imp.from}" — public name is semantic`);
  }
}

let merged = 0;
let skippedExisting = 0;
for (const [capture, rules] of [...added].sort()) {
  const entry = names[capture];
  if (!entry) {
    if (dry) {
      console.log(`${capture}: would add ${rules.size} proposed rename(s)`);
      continue;
    }
    names[capture] = {
      note: "evidence-driven proposals (tools/propose-names.mjs): own export table + semantic imports",
      renames: {},
    };
  }
  const renames = names[capture].renames || names[capture];
  const why = names[capture].evidence || (names[capture].evidence = {});
  for (const [from, { to, why: reason }] of [...rules].sort()) {
    if (Object.prototype.hasOwnProperty.call(renames, from)) {
      skippedExisting++;
      continue;
    }
    renames[from] = to;
    why[from] = reason;
    merged++;
  }
}

const chunkCount = new Set([...added.keys()]).size;
console.log(
  `propose-names: ${merged} rename(s) merged across ${chunkCount} chunk(s)` +
    (skippedExisting ? `, ${skippedExisting} already present (kept)` : "") +
    (dry ? " — dry run, nothing written" : ""),
);
if (!dry) fs.writeFileSync(namesPath, JSON.stringify(names, null, 2) + "\n");
