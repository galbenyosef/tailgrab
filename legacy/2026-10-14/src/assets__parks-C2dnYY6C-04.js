// assets__parks-C2dnYY6C 04 — kind
// Lines 3309-3353 of readable/assets__parks-C2dnYY6C.pretty.js (statement-aligned).
function T(e, t, n, r = `concrete`) {
  return {
    id: e,
    kind: `floor`,
    x: (t.x0 + t.x1) / 2,
    y: n,
    z: (t.z0 + t.z1) / 2,
    w: t.x1 - t.x0,
    d: t.z1 - t.z0,
    skin: r,
    tag: !1,
  };
}
function E(n, r, i) {
  let a = e(n.rot ?? 0),
    o = t(n.rot ?? 0);
  return { x: n.x + r * a + i * o, z: n.z - r * o + i * a };
}
function We(e, t, n) {
  let i = n ?? C(e.x, e.z),
    a = [],
    o = i;
  for (let n = 1; n <= t.length; n++) {
    let i = r(s({ plan: t.slice(0, n) })),
      ee = E(e, i.x, i.z),
      te = C(ee.x, ee.z);
    (a.push(te - o), (o = te));
  }
  return { y: i, path: { plan: t, grade: { y0: 0, rises: a, ease: 8 } } };
}
function D(e, t, n, r = `brick`, i = 0) {
  return {
    id: e,
    kind: `box`,
    x: (t.x0 + t.x1) / 2,
    y: i,
    z: (t.z0 + t.z1) / 2,
    w: t.x1 - t.x0,
    d: t.z1 - t.z0,
    h: n,
    skin: r,
    tag: !1,
    grind: `none`,
  };
}
