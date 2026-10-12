// assets__parks-C2dnYY6C 10 — arena
// Lines 5644-5689 of readable/assets__parks-C2dnYY6C.pretty.js (statement-aligned).
function dn(e) {
  let t = e.indexOf(`:`);
  return t < 0
    ? { parkId: e, arena: `` }
    : { parkId: e.slice(0, t), arena: e.slice(t + 1) };
}
function fn(e) {
  let { parkId: t, arena: n } = dn(e),
    r = un[t];
  if (!r) return;
  let i = n ? r.arenas?.find((e) => e.id === n) : void 0;
  return i ? `${r.name} · ${i.name}` : r.name;
}
function pn(e) {
  let t = $.get(e);
  if (t) return t;
  let { parkId: n, arena: r } = dn(e),
    i = un[n] ?? ve,
    a = r ? i.arenas?.find((e) => e.id === r) : void 0;
  if (!a) return ((t = $.get(i.id) ?? te(i)), $.set(i.id, t), $.set(e, t), t);
  let o = pn(i.id),
    s = a.rect;
  return (
    (t = {
      ...o,
      layout: {
        ...o.layout,
        spawns: a.spawns,
        letters: a.letters ?? [],
        horse: a.horse ?? a.spawns,
        botPaths: a.botPaths ?? o.layout.botPaths,
        bounds: s,
        arena: a.id,
      },
      bounds: s,
      box: {
        x0: Math.max(s.x0 - 8, o.box.x0),
        x1: Math.min(s.x1 + 8, o.box.x1),
        z0: Math.max(s.z0 - 8, o.box.z0),
        z1: Math.min(s.z1 + 8, o.box.z1),
      },
    }),
    $.set(e, t),
    t
  );
}
