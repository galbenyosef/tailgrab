# Tailgrab — offline mirror

Full mirror of **Tailgrab** (https://tailgrab.io/) — "A free multiplayer
skateboarding game in your browser, inspired by Tony Hawk's Pro Skater".

Source: https://tailgrab.io/

![Tailgrab](docs/cover.png)

## Stack

- **Vite production build, root-served** — a hashed `/assets/*.js` chunk graph
  (56 chunks) behind a modulepreload polyfill; the entry document inlines the
  critical CSS, the splash markup and the gtag bootstrap
- **three.js r186 in the chunk graph** — `assets/three.core-DVWDmH0S.js` (the
  core build) plus the WebGLRenderer bundle the minifier merged into the
  `toon` chunk (the app's toon material/shader code lives at that chunk's
  tail), the GLTFLoader addon (DRACO/KTX2/meshopt) and the OrbitControls addon
- **Colyseus SDK client bundled** — `assets/Client-CpE02kO_.js` is the
  multiplayer client; the game talks to the live backend at
  `backend.tailgrab.io` (`/me`, `/matchmake/joinOrCreate/hub`, websocket) —
  the backend stays external, the mirror is the client
- **A second page for the park viewer** — the origin serves an extensionless
  `/parks` route (`assets/parks-vuvy8Lj9.js` plus its own small chunk graph)
- **Assets are fetched at runtime** — skater kit GLBs (body + board + 31 head
  models), `skaters/clips.json` (2.9 MB of animation clips), 8 park models +
  10 park thumbs, 22 pro portraits, 28 sticker/icon webps, three songs, one
  SFX, `props/props.glb`

## What this is

Tailgrab (tailgrab.io) — a browser skateboarding game in the THPS mould: a
Skate Hub full of riders, mode gates (Trick Attack, Graffiti, H-O-R-S-E,
S-K-A-T-E, Tag, Career), animal pros and secret skaters, a mission/goal
system, and parks you build yourself (the park viewer at `/parks` renders
shared parks). It is a Vite production build: the app code is minified into
hashed chunks, and every skater, park, song and sticker is a runtime fetch
from the asset trees below. The mirror carries the whole runtime closure —
177 files, 30,046,159 bytes (30.0 MB).

External at runtime (documented gaps, never backfilled):

- **the multiplayer backend** — `backend.tailgrab.io` (auth `/me`, Colyseus
  `/matchmake/…` + websocket). The hub seen in the boot/cover screenshots is
  the live multiplayer room: the local client joins it over the network.
  Backend endpoints referenced by the client that 404 to an anonymous GET
  (they need a session or another verb) are recorded in
  `.upstream/capture-log.json`: `/me/*`, `/auth`, `/iap/*`, `/boards/:id`,
  `/replays/:id`, `/parks/daily`, `/parks/:code/doc`.
- **analytics** — `googletagmanager.com` / `google-analytics.com` (the
  inline gtag bootstrap and the external gtag script).
- Two stale dev-branch dynamic imports 404 upstream and are recorded as
  genuine 404s (`/assets/skaterRig.ts`, `/assets/parkModel.ts`).

## Layout

- `index.html` — the entry document as served (byte-exact): external chunk
  refs, an inline critical `<style>`, an inline gtag bootstrap, and an
  `application/ld+json` structured-data block (data, not code)
- `parks/index.html` — the stored `/parks` route page. Layout divergence
  (recorded): the origin serves that HTML at `/parks` (200) and 308-redirects
  `/parks/` → `/parks` while `/parks/index.html` 404s; on disk it is stored as
  `parks/index.html` so a static server reproduces the route through directory
  indexing. `tools/update.mjs` probes it as `/parks`.
- `assets/` — 56 hashed JS chunks + `main-BefG6oT8.css` (byte-exact)
- `skaters/`, `parks/`, `props/`, `music/`, `sfx/`, `stickers/`, `fonts/`,
  `splash/` — the runtime asset trees (byte-exact)
- `readable/` — prettified derived layer (pinned prettier 3.9.6, module API):
  61 pretties under the **served paths** (2026-10-14 structure pass —
  `assets/*.pretty.js` 56, `assets/main-BefG6oT8.pretty.css`,
  `fonts/fonts.pretty.css`, the three inline twins
  `index-inline-1.pretty.css` / `index-inline-2.pretty.js` /
  `parks/index-inline-1.pretty.css`) + `readable/index-inline-map.json`
- `src/` — 214 statement-aligned slices `src/assets/<chunk>-NN.js` across the
  50 app chunks (served-path form), exact 2-line provenance header, re-cut
  through the recorded semantic rename map
- `rename-map.json` — the recorded per-slice rename layer (word-boundary
  `files` + token-index `scoped` records) over `src/`, recovered mechanically
  by `tools/recover-scoped-map.mjs`
- `legacy/2026-10-14/` — the superseded derived layer (the previous
  `__`-flattened `readable/` + 214-slice flat `src/` + its `split-spec.json`),
  kept as the rollback copy
- `.upstream/manifest.json` — Gen-A sha256 record for all 177 captured files;
  `.upstream/capture-log.json` — per-file referrer + ref kind, the external
  refs and every genuine 404 (plus tagged heuristic probe misses)
- `split-spec.json` — the derivation record (273 sections, sources, inline
  map, rename layer, notRendered)
- `tools/fetch-capture.mjs` — re-fetch the runtime closure to fixpoint
  (scan HTML/JS/CSS refs + Vite dep tables + data-table-driven dynamic trees)
- `tools/derive.mjs` — rebuild `readable/` + `src/` + `split-spec.json`
  (re-applies the recorded rename map)
- `tools/apply-names.mjs` / `tools/names.json` — the campaign writer + reviewed
  worklist; `tools/propose-names.mjs` — evidence-driven proposals
- `tools/recover-scoped-map.mjs` — record the achieved map into
  `rename-map.json`
- `tools/verify-rename.mjs` — per-slice rename gate
  (reproduces / references / bindings); `tools/check-chunk.mjs` — whole-chunk
  gate (re-splice + cross-slice resolve); `tools/refcheck.mjs`,
  `tools/engine/rename-layer.mjs`, `tools/lib-acorn.mjs` — the shared
  scope/token engine the rename tools use (acorn installs into `tools/.deps`,
  gitignored, authoring-time only)
- `tools/serve.mjs` — loopback static server used for the serve probe
- `tools/verify.mjs` — re-hash the capture against the manifest
- `tools/update.mjs` — read-only drift probe against the live origin
- `tools/audit.js` — integrity gate for the derived layers + rename map
  (`AUDIT PASS`)
- `docs/cover.png` — actual gameplay (skater mid-Impossible in the Skate Hub);
  `docs/boot-2026-10-13.png` — boot evidence (hub rendered, tutorial step 1)

## Assets

- **models — skater kit** — 33 file(s): `skaters/kit/` (`body.glb`,
  `board.glb`, `head-<species>.glb` × 31: hawk, duck, axolotl, muskrat, fox,
  wolf, koala, pony, camel, otter, glider, cat, seal, goat, toad, puffin,
  bear, giraffe, hare, shrew, goose, collie, sagui, tamarin, alien, yeti,
  spider, bat, hyena, chupa, ranger)
- **models — parks** — 8 file(s): `parks/*.glb` (plaza, warehouse, schoolyard,
  pier, mall, hangar, beach, bridge)
- **models — props** — 1 file: `props/props.glb` (lamps, benches, pickups)
- **animation data** — 2 file(s): `skaters/kit/kit.json` (kit + 31 head
  definitions), `skaters/clips.json` (2.9 MB of animation clips)
- **images — portraits** — 22 file(s): `skaters/portraits/*.png` (pro roster)
- **images — park thumbs** — 10 file(s): `parks/thumbs/*.webp`
- **images — branding/splash** — 6 file(s): `logo.webp`, `og.jpg`,
  `favicon.png`, `apple-touch-icon.png`, `splash/wide.webp`, `splash/tall.webp`
- **UI — stickers/icons** — 28 file(s): `stickers/*.webp` (pack stickers,
  quick-chat emotes, coin/star/trophy UI glyphs)
- **audio — music** — 3 file(s): `music/*.mp3` (Recomeçar, Sobre Você,
  Reencontrar)
- **audio — sfx** — 1 file: `sfx/six-seven.mp3`
- **fonts** — 4 file(s): `fonts/` (baloo2.woff2, lilita-one.woff2,
  sedgwick-ave-display.woff2, fonts.css)

## Run

Serve the repo root with any static file server (the capture is a static site;
no build step):

```
npx serve .
```

The game boots to the Skate Hub. It joins the live multiplayer backend
(`backend.tailgrab.io`) over the network — the client code is all local, the
backend stays external; with no backend reachable, network features (hub
roster, matchmaking) fail while the client still runs.

## Verify

```
node tools/verify.mjs                # re-hash the capture against the manifest
node tools/audit.js                  # derived-layer + rename-map integrity gate
node tools/verify-rename.mjs --all   # rename layer: reproduces/references/bindings
node tools/check-chunk.mjs --all     # re-splice + cross-slice resolve
```

Last run: `177 files checked, 0 problems` and `AUDIT PASS` (273 sections,
214/214 slice round-trips through the recorded rename map, 61/61 pretties
re-render byte-exact, 253/254 imports resolve, 1 whitelisted dynamic asset URL).

Rebuild the derived layers from the frozen capture (byte-identical, proven):

```
node tools/derive.mjs && node tools/apply-names.mjs --all && node tools/recover-scoped-map.mjs
```

## Updating from upstream

```
node tools/update.mjs     # read-only drift probe: what changed upstream
```

The probe never rewrites the capture — a mirror is a point-in-time snapshot.
Refreshing means re-running `tools/fetch-capture.mjs` into a clean tree,
copying every replaced file into `legacy/<date>/`, re-cutting
`.upstream/manifest.json`, and re-deriving `readable/` + `src/` from the new
bytes with `node tools/derive.mjs`. After a refresh the chunk hashes change,
so the rename layer is re-cut with the new bytes: `tools/derive.mjs` re-applies
the recorded `rename-map.json` where the chunk shape is unchanged; a changed
chunk makes `tools/apply-names.mjs` refuse loudly (it keys on the capture rels
and the pristine readable ranges) rather than rename the wrong spans —
re-author the batch, then re-run `apply-names.mjs --all` →
`recover-scoped-map.mjs` and the four gates. Known noise: `_mirror-report.json`
and `.upstream/capture-log.json` are local records and are never probed; the
record tools (`verify.mjs` / `update.mjs`) are manifest-driven and never walk
the tree, so `src/`, `legacy/`, `split-spec.json`, `rename-map.json` and
`_mirror-report.json` cannot enter the capture record (audit re-checks).

### 2026-10-13 capture + readable/src derivation

The capture and both derived layers are in place (capture bytes untouched —
`node tools/verify.mjs` re-hashes all 177 files):

- **Capture** — closure fetched to fixpoint from `https://tailgrab.io/`
  (entry fetched live and byte-compared to the recon copy: identical, 9,679
  B): 6 scan rounds, 352 fetches, 177 files, 30,046,159 bytes. The static
  scan covers script/link/srcset refs, meta og/twitter images,
  import/`import()`/`new URL(..., import.meta.url)` specifiers, Vite
  `__vite__mapDeps` tables and asset-path literals, and CSS `url()`/@import.
  Because the build constructs whole asset trees behind template literals,
  `tools/fetch-capture.mjs` additionally enumerates them from the capture's
  own data tables (kit.json heads → 31 head GLBs; roster/skin keys → 22
  portraits; the sticker id list + declared `sticker:`/`icon:` fields + ids
  observed live → 28 stickers; the song table → 3 MP3s; built-in park defs →
  8 park GLBs + 10 thumbs; `props/props.glb`; `skaters/clips.json`; the
  Sedgwick font), fetching every candidate and recording genuine 404s.
  **Network-log cross-check (the important one):** the live UI requested 15
  sticker icons the static enumeration had missed (`star`, `trophy`, `coin`,
  `letters`, `horseshoe`, `hand-you`, the `hand-*` emote set) — caught by
  diffing the browser's request log against the capture, then fixed and
  re-verified: the final hub session shows **zero same-origin requests
  outside the capture and zero same-origin 404s** (`performance` resource
  log, 78 same-origin entries), with the only off-origin hosts being the
  external backend (`backend.tailgrab.io/me`, `/matchmake/joinOrCreate/hub`)
  and analytics.
- **`readable/`** — pinned prettier 3.9.6 (module API, default options,
  single pass — never the CLI: it respects `.gitignore` and can silently echo
  its input) rendered all 56 captured JS chunks and both stylesheets
  (`assets/main-BefG6oT8.css`, `fonts/fonts.css`) to `*.pretty.js|css`
  (61 files); names are capture-relative with `/` flattened to `__`. Every
  pretty is provably not a byte copy of its capture source, and 61/61
  re-render byte-exact under the pinned version. Two sources
  (`preload-helper-DR1MrGPZ.js`, `main-BefG6oT8.css`) are not prettier fixed
  points (a member chain / a media-query collapse only settles on a second
  pass) — flagged `idempotent:false` in `split-spec.json`; the stored pretty
  is the deterministic single-pass rendering the audit re-renders.
- **`src/`** — 214 statement-aligned slices (`src/<tag>-NN.js`, exact 2-line
  provenance header) across the 50 app chunks, recorded in `split-spec.json`
  (273 sections): 214/214 parse standalone (`node --input-type=module --check
  -`) and round-trip byte-exact to their readable line ranges. Cuts land only
  on top-level declaration boundaries (~250-350 line windows); oversized
  single declarations stay whole (largest: `assets__main-CzsUDvlE-01.js`,
  343 lines). The entry chunk yields 45 slices; 47 final `export {…}` tables
  are skipped sections (the bindings live in the earlier slices).
- **Vendor rule — wholeFile sections, never sliced (12):** `three.core`
  (r186 core build, guarded on `__THREE__` + `` `186` ``), GLTFLoader
  (DRACO/KTX2/meshopt), OrbitControls, lil-gui, the Colyseus SDK client, the
  Vite modulepreload polyfill, both stylesheets, and the three inline twins.
  Mixed chunk: `toon-CycGToy9` is app code wrapped around the minifier-merged
  three.js r186 **WebGLRenderer bundle** — content-anchored (statements 2..the
  var statement that merges the renderer class with the app's
  `Xr = { uSlab … }` uniform record), guarded and asserted as a wholeFile
  vendor region; the app's imports and its toon material/shader tail are
  sliced.
- **Inline blocks** — `index.html`: critical `<style>` and gtag bootstrap
  twins + `readable/index-inline-map.json`; its `application/ld+json` block
  is structured data, recorded in `notRendered` (118 notRendered entries
  total: 117 payloads + 1 inline data block). `parks/index.html`: viewer
  `<style>` twin.
- **Gates:** `node tools/verify.mjs` → `177 files checked, 0 problems`;
  `node tools/audit.js` → `AUDIT PASS` (above); `node tools/update.mjs` →
  `up to date: 177 captured files identical upstream`; serve probe — mirror
  root served on loopback (`/`, `/assets/main-CzsUDvlE.js`, `/parks`,
  `/parks/plaza.glb`, `/music/recomecar.mp3` … HTTP 200, byte-identical to
  the capture), listener killed, port 4390 closed (netstat: no LISTENING,
  probe → connection refused). Boot + cover captured in the opencli browser
  against the served mirror: the hub rendered with bots and the tutorial
  ("Roll out"), then actual gameplay — the skater rolling, ollieing and
  landing an Impossible in the Skate Hub (`docs/cover.png`).
- **§0.4 fork-over-mirror checked 2026-10-13 (this project's own repo only):**
  nothing in the capture references an upstream repository (zero
  `github.com`/`gitlab.com` references in the whole capture), and a GitHub
  repository search for "tailgrab" finds only unrelated projects (a VRChat log
  parser, a Sea of Thieves tool, an Astro scratch) plus this mirror itself —
  the origin publishes the deployment only, so the mirror stands.
- Open task (PLAN §5): identifiers in `src/` are the bundle's own minified
  names — the rename campaign is not claimed here. **Closed 2026-10-14** by
  the structure pass + identifier rename campaign below (the flat names quoted
  in this section describe the superseded layer, archived at
  `legacy/2026-10-14/`).

### 2026-10-14 structure pass + identifier rename campaign (the open task, closed)

Mission of this pass: converge `readable/` and `src/` on the real project
shape and run the PLAN §5 identifier rename campaign. The capture was **not**
touched — `node tools/verify.mjs` still re-hashes all 177 files (0 problems) —
so this section is entirely about `readable/`, `src/`, `split-spec.json`,
`rename-map.json`, `legacy/` and `tools/`.

- **Inventory (source maps + module boundaries) — both negative, recorded**:
  - *Source maps*: zero `sourceMappingURL` occurrences across the capture
    (html/js/css) and no `.map` file in it, so no original tree can be
    reconstructed from maps; the derivation stays the prettier/slice pass.
  - *Module boundaries*: the build is **flat Vite/Rollup ESM** — every chunk
    is a single top-level statement list (the entry chunk opens with the
    `__vite__mapDeps` chunk table, the modulepreload polyfill and the preload
    helper; app chunks end in a plain `export {…}` table), and there is no
    webpack/Turbopack factory family (`push([[...]])` — checked) to split on.
    The factory-family module-extraction precedents (spawn-dust-2-dm /
    kettuvellam / futbol-island / browserboxing / kittu / nba-2k) are
    therefore **not applicable**; the stillwater / taipei flat-ESM precedent
    applies — the statement-aligned slice is the true boundary this bundle
    exposes, and the served chunk graph itself is the real file structure.
    Two more real boundaries the bundle does expose are recorded: the
    **re-export facades** (`assets/toon-L4_S6Akl.js`, `decor-EQ8VRNuO.js`,
    `lens-BwVvQcWW.js`, `outline-DM9oZu0n.js`, `parkModel-D9KlCEyZ.js`,
    `skaterRig-CWjsS5UF.js` are tiny modules that import a minified public
    name and re-export it under the game's own API name — `patchToon`,
    `toonMaterial`, `loadProps`, `Lens`, `addOutlines`, `loadPark`,
    `SkaterRigView`, `loadSkaterAssets`, `parseClips`), and the
    content-anchored vendor regions (toon's merged three.js r186
    WebGLRenderer bundle; the inlined three-mesh-bvh inside `tuning`; the
    inlined Delaunator inside `preload-helper`; the bundled
    `@colyseus/sdk` predict internals inside `tagPaint`; the Colyseus
    devtools panel chunk `debug`).
- **Structure — `readable/` and `src/` now mirror the served paths** (PLAN §5:
  "the served path is the truth"): a captured file at
  `assets/main-CzsUDvlE.js` derives to
  `readable/assets/main-CzsUDvlE.pretty.js` and slices to
  `src/assets/main-CzsUDvlE-NN.js`; `fonts/fonts.css` →
  `readable/fonts/fonts.pretty.css`; the `__`-flattening of the first cut is
  gone. Slice headers carry the served tag (`// assets/main-CzsUDvlE 07 — …`);
  `split-spec.json`'s `file`/`sourceFile`/`defaultFile` all use the new
  paths; the index-only section names read as served paths
  (`assets/<chunk>-vendor.js`, `assets/toon-CycGToy9-three-vendor.js`,
  `assets/<chunk>-tail-export.js`, `assets/main-BefG6oT8.css`,
  `parks/index-inline-1.css`). Inline twins stay document-anchored
  (`readable/index-inline-1.pretty.css`, `readable/index-inline-2.pretty.js`,
  `readable/parks/index-inline-1.pretty.css`) with
  `readable/index-inline-map.json` at the root. Before/after counts:
  `readable/` 61 flat pretties + map → 61 under `readable/assets/` (57),
  `readable/fonts/` (1), `readable/parks/` (1) + the two root twins + map
  (bytes unchanged, path-only re-rooting); `src/` 214 flat slices → 214 under
  `src/assets/`; the section count is unchanged (273). The superseded layer
  (the previous `__`-flattened `readable/` + 214-slice flat `src/` + its
  `split-spec.json`) is archived at `legacy/2026-10-14/`.
- **Rename campaign (PLAN §5) — applied and gated**: `tools/names.json` is the
  reviewed worklist — **336 rules over 46 app chunks (285 curated semantic
  rules with per-name evidence read out of the code's own strings/identifiers
  + 51 evidence-driven proposals from `tools/propose-names.mjs`: own export
  tables, the facade→target flow, semantic imports)**, applied by
  `tools/apply-names.mjs` as **334 names / 926 identifier splices, 2 refused**
  (both recorded by the writer's guards: a shorthand import `{a}` and an
  unaliased export specifier `{x}` — the key/public name shares the token),
  recovered into `rename-map.json` (**386 word-boundary records + 85 indexed
  names over 175 occurrences**, 140 renamed slices) by
  `tools/recover-scoped-map.mjs`, and re-applied by `tools/derive.mjs` on every
  re-cut. Highlights: the entry chunk (`GameApp`, `ParkStage`, `AppRouter`,
  `TabNav`, `GhostNet`, `MatchHud`, `ChatPanel`, `EmoteWheel`, `SkaterTags`,
  `PortalPrompts`, `PartyDock`, `UnlockQueue`, `StatPointsBank`,
  `StarRoadRewards`, `LevelUnlock`, `ScreenWipe`, `Coach`, `GoalsPanel`,
  `MissionsDock`, `EdgeMarkers`, `PerfMeter`, `BuilderHud`, `ParkEditor`,
  `CoinChip`, `NowPlaying`, `Collectibles`, `SkateLetters`, `GatePopup`,
  `MapControls`, `credits`/`controlHelp`/`modeBlurbs`/`careerStats`/
  `profileStats`/`statDefs`/`styleSlots`/`styleGroups`/`swatchColors`/
  `oauthProviders`/`qualityTiers`); the trick catalogue (`table`: the full
  `kickflip…truckstand` trick table, `headTable`/`topsTable`/`bottomsTable`/
  `hatsTable`/`accessoriesTable`, `colorNames`/`styleKeys`/`furColors`/
  `skinColors`/`defaultStyle`); the park pipeline (`parks`: `plazaPark`,
  `warehousePark`, `schoolyardPark`, `pierPark`, `mallPark`, `kitLabPark`,
  `downtownPark`, `overpassPark`, `garagePark`, `ditchPark`, `cityModes`,
  `modeParks`; `parkModel-DmiMeogd`: `ParkBuilder`, `PaintTexture`,
  `loadParkModel`, `loadParkManifest`; `compose`/`catalog`: `buildStairs`/
  `buildLedge`/`buildPlanter`/`buildEscalator`/`buildBeam`/`deckSlab`/
  `flatTop`, `rampTable`/`materialTable`/`zoneMaterials`; `preload-helper`:
  the whole plan checker family `checkStep`/`checkPlan`/`checkTerrain`/
  `checkPosts`/`checkLedgeFill`/`checkLipProfile`/`checkBowl`/`checkBerm`/
  `checkDitchLip`/`checkRim`/`checkSweep`… + `CopingGrid`/`SpatialIndex`);
  the skater pipeline (`skaterRig-CvzHL-r4`: `SkaterRigView`,
  `loadSkaterAssets`, `parseClips`, `SkaterKit`, `FrameSampler`, `PoseBlend`,
  `lipTricks`; `skaterView`: `SkaterView`, `GhostRig`; `bailPhysics`:
  `Ragdoll`, `RagdollBody`, `BoneMapper`; `decor-Tyb8Za1u`: `LooseBodies`,
  `loadProps`, the `buildBush`/`buildLamp`/`buildCloud`/`portalDefs` set;
  `skaters`: `proRoster`, `skillStyles`, `defaultNames`); the session and
  network layer (`session`: `GameSession`, `SkaterMotion`, `ComboHud`,
  `PredictReconciler`, `simFields`; `tapeRider`: `TapeSim`, `TapeRunner`,
  `compressTape`; `tagPaint`: the schema classes `Skater`/`Portal`/`HubState`/
  `MatchState`/`CareerState`/`Piece`/`Ghost`/…, `backendUrl`, `createClient`,
  `quickChat`, `emoteIds`, `bannedWords`); the effects (`fxHooks`:
  `Particles`/`Decals`/`SpriteText`/`TrailMesh`/`TrailBeam`/`TrickCallout`/
  `Announcer`/`XpMeter`/`LevelChip`/`CineBars`/`skillTiers`); audio (`sfx`:
  `AudioEngine`, `wavBlob`, `audioUnlock`, `settingsKey`); and `scene`'s
  `SkyRig`/`sceneryKinds`/`timesOfDay`.
- **What the campaign deliberately does not rename** (honest scope):
  - **vendor identifiers** — the wholeFile vendor chunks (three.js r186 core,
    the GLTFLoader/OrbitControls/lil-gui addons, the Colyseus SDK client, the
    modulepreload polyfill), the toon WebGLRenderer region (region-guarded
    against reference orphaning), the inlined three-mesh-bvh inside `tuning`,
    the inlined Delaunator inside `preload-helper`, the bundled
    `@colyseus/sdk` predict internals inside `tagPaint` and the Colyseus
    devtools panel chunk (`debug`) stay minified by construction;
  - **public API names** — the aliased side of every `export { local as
    Public }` (importers in other chunks use them); the campaign renames the
    *local* side; each chunk's fired binding rules are recorded in
    `split-spec.sources[].renameBindings` (334 rules over 46 sources) and
    re-read by the reconstruction gates;
  - **locals inside function bodies** — the campaign renames program-scope
    bindings and import aliases only (the same declared scope as the
    precedents);
  - **4 of the 50 app chunks carry no renames** (`debug` — the Colyseus
    devtools library, `dmath` — trig helpers, `palette` — color constants,
    `verlet` — two tiny verlet helpers); their tooling exists for further
    batches;
  - the map holds **both record kinds** — 386 word-boundary records where a
    name reaches one target everywhere in the slice, and 85 token-index
    records (175 occurrences) where the minifier reused a spelling across
    scopes (the tooling from the aeloria / zombie precedent, including the
    brace-aware object-key guard and the exact 2-line header stripper the
    stillwater / madrid-rush verifiers proved).
- **Gates (verbatim tails, 2026-10-14)**:

```
node tools/verify.mjs
177 files checked, 0 problems

node tools/audit.js
AUDIT PASS — 273 spec sections (214/214 src↔pretty round-trips byte-exact through the recorded rename map, 61/61 pretty sources tiled contiguously, 47/47 skipped export-table sections re-verified textually, 214/214 src slices + 57/57 readable/*.pretty.js parse standalone (node --input-type=module --check -), 61/61 pretties provably distinct from their capture source, 59 index-only wholeFile/skipped sections carry no src file, 3 inline content block(s) with twins + index-inline-map.json, 1 typed data block(s) recorded in notRendered, 253/254 imports resolve inside the capture (1 whitelisted machinery), rename map: 386 word-boundary record(s) + 85 indexed name(s) over 175 occurrence(s) (140 renamed slice(s), mapOK 165 slice(s) token-validated, no foreign position), 61/61 pretties re-render byte-exact under pinned prettier 3.9.6, capture manifest free of derived layers)

node tools/verify-rename.mjs --all
verify-rename: 214/214 slice(s) reproduce byte-exact, 140 renamed slice(s) (175 indexed occurrence(s)), 50/50 chunk(s) references+bindings YES

node tools/check-chunk.mjs --all
check-chunk: 50 chunk(s), 214 slice body(ies) substituted — all cross-slice calls resolve

node tools/derive.mjs
derive: 61 readable file(s), 214 src slices (214/214 parse standalone, 214/214 round-trip byte-exact through the recorded map, 140 renamed slice(s)), 47 skipped, 12 wholeFile, 57 pretty js parse clean, 118 notRendered, 2 non-idempotent source(s), 0 orphan(s) pruned — self-check clean

node tools/update.mjs
up to date: 177 captured files identical upstream
```

- Derive re-run reproducibility: snapshotting all 278 derived entries
  (`readable/` + `src/` + `split-spec.json` + `rename-map.json`) before and
  after a full-pipeline re-run (`derive.mjs && apply-names.mjs --all &&
  recover-scoped-map.mjs`) reproduces **278/278 byte-identical** (0 diffs).
  Write order matters: `derive.mjs` records `renameBindings` from the map, so
  the pipeline is apply → recover → derive → gates.
- Serve probe (capture bytes unchanged, so the 2026-10-13 boot/cover evidence
  stands; the read-only probe re-confirms the mirror serves the game):
  loopback `node tools/serve.mjs 4390` — `/` (9,679 B), `/assets/main-CzsUDvlE.js`
  (335,134 B, re-hashed byte-identical to the capture), `/assets/main-BefG6oT8.css`
  (229,010 B), `/parks` (2,686 B — the stored route page through directory
  indexing), `/parks/plaza.glb` (846,100 B), `/music/recomecar.mp3`
  (2,089,003 B), `/skaters/clips.json` (2,914,922 B) and the derived
  `/readable/assets/main-CzsUDvlE.pretty.js` (538,549 B) +
  `/src/assets/main-CzsUDvlE-01.js` (5,532 B) all HTTP 200; a missing path
  answers an honest 404. Listener killed (PID 12800), port 4390 proven closed
  (`netstat`: no LISTENING row; curl: connection refused).
- Record tools stay manifest-driven (`verify.mjs` / `update.mjs` never walk the
  tree), so `src/`, `legacy/`, `split-spec.json`, `rename-map.json` and
  `_mirror-report.json` cannot enter the capture record — `audit.js` re-checks
  that.

## Mirror conventions

- **Capture layer** — the captured files are byte-exact copies of what the
  origin served; nothing in them is edited. Vendor files (three.js, lil-gui,
  the Colyseus SDK, fonts) stay byte-exact exactly as served — never
  re-minified, re-versioned or re-hosted; external dependencies
  (`backend.tailgrab.io`, Google Tag Manager/Analytics) stay external and are
  never backfilled.
- **Readable layer** — `readable/` is derived (prettified) and never shipped
  to a browser; it exists so the minified chunks can actually be read.
- **Provenance** — `.upstream/manifest.json` records sha256 for each captured
  artifact, `.upstream/capture-log.json` records why each file was fetched
  (referrer + kind), and `tools/verify.mjs` re-checks the manifest.
- **Drift** — `tools/update.mjs` is read-only: it reports what changed
  upstream and never rewrites the capture.
- **Rename layer** — `rename-map.json` is the recorded semantic rename map over
  `src/` (word-boundary + token-index records, recovered mechanically); a
  re-cut re-applies it (`tools/derive.mjs`), and `tools/verify-rename.mjs`,
  `tools/check-chunk.mjs` and `tools/audit.js` re-prove it. Vendor identifiers
  stay minified by construction; the PLAN §5 identifier rename campaign is
  **closed** (2026-10-14) with the honest limits recorded above.
- **Layout divergence (recorded)** — the `/parks` route page is stored as
  `parks/index.html` (served path vs disk path differs for that one file);
  everything else is served path == disk path (`DISK_PREFIX=""`).

## Fleet status

<!-- mirror-status:start — feeds _standard/REPO-INDEX.md. Update ONLY your own mirror's block; never edit the shared index (PLAN §8). Rebuild: node _standard/build-index.mjs -->
<!-- cols: cls=classification · ver=verify 0 problems · upd=drift probe · man=manifest · rdbl=readable re-derived · src=reversed src · boot=boot test · top=offline-mirror topic · tag=backup tag · staged=staged not committed -->
| # | repo | cls | ver | upd | man | rdbl | src | boot | top | tag | staged |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 297 | tailgrab | mirror | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | — | — |
<!-- mirror-status:end -->
