// propose-names.mjs — propose semantic renames from evidence and merge them into
// tools/names.json (the campaign worklist applied by tools/apply-names.mjs).
//
//   node tools/propose-names.mjs            # propose + merge into tools/names.json
//   node tools/propose-names.mjs --dry      # print proposals, write nothing
//
// Evidence used (never guesses). Tailgrab's build keeps a couple of re-export
// FACADES next to their real chunks (e.g. skaterRig-CWjsS5UF.js imports from
// skaterRig-CvzHL-r4.js and re-exports with semantic public names), so the
// facade chain is the strongest evidence in this capture:
//
//   1. A chunk's own export table. `export { <local> as <SemanticName> }` ties a
//      minified local binding to the semantic name its consumers use — so the
//      LOCAL gets renamed (the public name is the served API and never changes).
//   2. Facade flow: when a chunk imports `{ P as L }` from chunk T and exports
//      `{ L as Semantic }`, then T's public name P IS `Semantic`; the local in
//      the facade and the local bound to P in T both get renamed.
//   3. Any other chunk's import clauses: `import { P as L } from "./T.js"` where
//      (T, P) is known semantic — rename the importing local to that name.
//   4. A public name that already reads as a semantic name (length ≥ 4 or an
//      underscore) is semantic wherever it appears.
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

// ── pass 1: parse every app chunk; collect its export table + imports ───
const chunkOf = new Map(); // capture rel -> { sourceFile, publics:Map(public->local), imports:[{imported,local,fromRel}] }
const relOfSpec = (from, capRel) => {
  if (!from.startsWith(".")) return null;
  const dir = path.posix.dirname(capRel);
  return path.posix.normalize(path.posix.join(dir, from));
};
for (const src of spec.sources) {
  if (!/\.pretty\.js$/.test(src.sourceFile || "") || !src.capture.endsWith(".js")) continue;
  if (!src.derived.startsWith("readable +")) continue; // app chunks only — vendor stays minified
  const code = fs.readFileSync(path.join(proj, ...src.sourceFile.split("/")), "utf8");
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
        if (s.type === "ImportSpecifier")
          imports.push({ imported: s.imported.name, local: s.local.name, fromRel: relOfSpec(st.source.value, src.capture) });
      }
    } else if (st.type === "ExportNamedDeclaration") {
      for (const s of st.specifiers || []) {
        if (s.local && s.exported && s.local.start !== s.exported.start) publics.set(s.exported.name, s.local.name);
      }
    }
  }
  chunkOf.set(src.capture, { sourceFile: src.sourceFile, publics, imports });
}

// ── pass 2: facade flow — (chunk, public) -> semantic name ──────────────
const semanticPublic = new Map(); // `${capRel}|${public}` -> semantic
const notePublic = (capRel, publicName, semanticName) => {
  if (!capRel) return;
  const k = `${capRel}|${publicName}`;
  if (!semanticPublic.has(k)) semanticPublic.set(k, semanticName);
};
// (4) public names that already read as semantic names
const semanticNameSet = new Set();
for (const { publics } of chunkOf.values()) for (const p of publics.keys()) if (semantic(p)) semanticNameSet.add(p);
for (const [capRel, { publics }] of chunkOf)
  for (const [publicName] of publics) if (semantic(publicName)) notePublic(capRel, publicName, publicName);
// (2) facade flow: import { P as L } from T; export { L as Semantic } => T's P is Semantic
for (const [capRel, { publics, imports }] of chunkOf) {
  const importByLocal = new Map(imports.map((i) => [i.local, i]));
  for (const [publicName, local] of publics) {
    if (!semantic(publicName)) continue;
    const imp = importByLocal.get(local);
    if (!imp) continue;
    notePublic(imp.fromRel, imp.imported, publicName); // the imported public name in T
    notePublic(capRel, publicName, publicName); // and this chunk's own export
  }
}

// ── pass 3: propose per chunk ───────────────────────────────────────────
const added = new Map(); // capture -> Map(name -> {to, why})
const note = (capture, from, to, why) => {
  if (!capture || from === to) return;
  if (!added.has(capture)) added.set(capture, new Map());
  const m = added.get(capture);
  if (!m.has(from)) m.set(from, { to, why });
};
for (const [capture, info] of chunkOf) {
  // evidence 1 + 2 + 4: own export table, local side
  for (const [publicName, local] of info.publics) {
    const known = semanticPublic.get(`${capture}|${publicName}`);
    const target = known || (semantic(publicName) ? publicName : null);
    if (!target || local === target) continue;
    note(capture, local, target, `own export table: local \`${local}\` is exported as \`${target}\``);
  }
  // evidence 3: imports whose (source chunk, public name) is known semantic
  for (const imp of info.imports) {
    const known = imp.fromRel ? semanticPublic.get(`${imp.fromRel}|${imp.imported}`) : null;
    const target = known || (semanticNameSet.has(imp.imported) ? imp.imported : null);
    if (!target || imp.local === target) continue;
    note(
      capture,
      imp.local,
      target,
      `import { ${imp.imported} as ${imp.local} } from "${imp.fromRel}" — public name is semantic`,
    );
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
      note: "evidence-driven proposals (tools/propose-names.mjs): own export table + facade flow + semantic imports",
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
