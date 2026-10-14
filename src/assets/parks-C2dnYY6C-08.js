// assets/parks-C2dnYY6C 08 — flatmap
// Lines 4372-4425 of readable/assets/parks-C2dnYY6C.pretty.js (statement-aligned).
function Pt() {
  let e = new Set(),
    t = [],
    n = (n, r) => {
      if (e.has(n.id)) throw Error(`city: piece id ${n.id} used twice`);
      if (r && (n.id < r[0] || n.id > r[1]))
        throw Error(
          `city: piece ${n.id} is outside its district's ids ${r[0]}–${r[1]}`,
        );
      if (!r && n.id >= 1e3)
        throw Error(`city: city-wide piece ${n.id} must be under 1000`);
      (e.add(n.id), t.push(n));
    };
  (n({
    id: 1,
    kind: `terrain`,
    x: 0,
    z: 0,
    rect: S,
    base: 0,
    tag: !1,
    maxDeg: 28,
    wallSkin: `brick`,
    ledges: !0,
    coarse: 8,
    features: [
      ...Be,
      ...W.flatMap((e) => e.terrain ?? []),
      { f: `pad`, floor: 2, blend: 10 },
    ],
  }),
    n(T(2, w.downtown, 0, `concrete`)));
  for (let e of [...Je, pt, gt, kt]) n(e);
  for (let e of jt) n(e);
  for (let e of Nt) n(e);
  for (let e of W) for (let t of e.pieces) n(t, e.range);
  let r = [...At, ...W.flatMap((e) => e.gaps ?? [])];
  if (r.length > 56) throw Error(`city: ${r.length} gaps (max 56)`);
  return {
    id: `city`,
    name: `Sherbet City`,
    half: 176,
    bounds: { x0: S.x0 + 6, x1: S.x1 - 6, z0: S.z0 + 6, z1: S.z1 - 6 },
    tileSize: 64,
    pieces: t,
    spawns: W.flatMap((e) => e.spawns ?? []),
    horse: W.flatMap((e) => e.horse ?? []),
    gaps: r,
    letters: W.flatMap((e) => e.letters ?? []),
    botPaths: W.flatMap((e) => e.botPaths ?? []),
    props: W.flatMap((e) => e.props ?? []),
    arenas: Mt,
  };
}
