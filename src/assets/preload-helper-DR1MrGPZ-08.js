// assets/preload-helper-DR1MrGPZ 08 — math
// Lines 2174-2326 of readable/assets/preload-helper-DR1MrGPZ.pretty.js (statement-aligned).
function kt(e) {
  let { w: t, d: n, h: r, slope: i } = e,
    a = e.skin ?? `concrete`,
    o = new y(),
    s = t / 2,
    c = n / 2,
    l = s + i,
    u = c + i,
    d = Math.sqrt(i * i + r * r),
    f = i / d,
    p = r / d,
    m = [
      [-l, -u, l, -u, -s, -c, s, -c, 0, -1],
      [l, -u, l, u, s, -c, s, c, 1, 0],
      [l, u, -l, u, s, c, -s, c, 0, 1],
      [-l, u, -l, -u, -s, c, -s, -c, -1, 0],
    ];
  for (let [e, t, n, i, s, c, l, u, h, g] of m) {
    let m = Math.max(
        1,
        Math.ceil(Math.sqrt((n - e) * (n - e) + (i - t) * (i - t)) / 1.25),
      ),
      _ = Math.max(1, Math.ceil(d / 1.25)),
      v = [];
    for (let a = 0; a <= m; a++) {
      let d = [];
      for (let v = 0; v <= _; v++) {
        let y = a / m,
          b = v / _,
          x = e + (n - e) * y,
          S = t + (i - t) * y,
          C = s + (l - s) * y,
          w = c + (u - c) * y;
        d.push(o.v(x + (C - x) * b, r * b, S + (w - S) * b, h * p, f, g * p));
      }
      v.push(d);
    }
    for (let e = 0; e < m; e++)
      for (let t = 0; t < _; t++)
        o.quad(v[e][t], v[e + 1][t], v[e + 1][t + 1], v[e][t + 1], a);
  }
  let h = o,
    g = e.grind === !1 ? 0 : 0.06,
    _ = (e) => {
      let t = Math.max(1, Math.ceil((2 * e) / 1.25)),
        n = [-e];
      g && n.push(-e + g);
      for (let r = 1; r < t; r++) {
        let i = -e + (2 * e * r) / t;
        i > -e + g + 0.05 && i < e - g - 0.05 && n.push(i);
      }
      return (g && n.push(e - g), n.push(e), n);
    },
    v = _(s),
    b = _(c),
    x = v.map((e) => b.map((t) => h.v(e, r, t, 0, 1, 0))),
    S = e.topSkin ?? `concrete`;
  for (let e = 0; e + 1 < v.length; e++)
    for (let t = 0; t + 1 < b.length; t++) {
      let n =
        g > 0 &&
        (e === 0 || t === 0 || e === v.length - 2 || t === b.length - 2);
      h.quad(
        x[e][t],
        x[e + 1][t],
        x[e + 1][t + 1],
        x[e][t + 1],
        n ? `metal` : S,
      );
    }
  let C =
    e.grind === !1
      ? []
      : [
          { kind: w.LEDGE, path: [-s, r, -c, s, r, -c], nx: 0, nz: -1 },
          { kind: w.LEDGE, path: [s, r, -c, s, r, c], nx: 1, nz: 0 },
          { kind: w.LEDGE, path: [s, r, c, -s, r, c], nx: 0, nz: 1 },
          { kind: w.LEDGE, path: [-s, r, c, -s, r, -c], nx: -1, nz: 0 },
        ];
  return {
    prims: [o.prim(`soft`)],
    rails: C,
    footprint: { x0: -l, x1: l, z0: -u, z1: u },
  };
}
function At(e) {
  let { r: t, h: n, len: r } = e,
    i = e.skin ?? `concrete`,
    a = (r * r + n * n) / (2 * n),
    o = [];
  for (let e = 8; e >= 0; e--) {
    let t = (r * e) / 8,
      n = a - Math.sqrt(a * a - t * t);
    o.push({ u: r - t, y: n, nu: t / a, ny: (a - n) / a, skin: i });
  }
  let s = Et(t),
    c = new y();
  (g(c, s, !0, o), k(c, s, 0, 0, n, e.topSkin ?? e.skin ?? `concrete`));
  let l = [],
    u = [];
  for (let e of s) (l.push(e.x, n, e.z), u.push(e.nx, e.nz));
  let d = s.map((e) => ({
    x: e.x + e.nx * r,
    z: e.z + e.nz * r,
    nx: e.nx,
    nz: e.nz,
  }));
  return {
    prims: [
      c.prim(`soft`),
      { type: `tube`, path: l, radius: M, skin: `metal`, caps: !1, closed: !0 },
    ],
    rails: [{ kind: w.LEDGE, path: l, nx: 0, nz: 0, ns: u, closed: !0 }],
    outline: bt(d, xt),
  };
}
function jt(e) {
  let { h: t, len: n } = e,
    r = e.skin ?? `concrete`,
    i = d(I(n, a, -a, !1)).map((e) => ({ ...e, x: 0, z: 0 })),
    o = Math.sqrt(n * n + t * t),
    s = t / o,
    c = n / o,
    l = Math.max(1, Math.ceil(o / 1.25)),
    u = [];
  for (let e = 0; e <= l; e++)
    u.push({ u: (n * e) / l, y: t - (t * e) / l, nu: s, ny: c, skin: r });
  let f = new y();
  g(f, i, !1, u);
  let p = i[0],
    m = i[i.length - 1],
    h = -p.nz,
    _ = p.nx,
    v = m.nz,
    b = -m.nx,
    x = [
      [0, 0],
      [0, t],
      [n, 0],
    ];
  (Dt(f, p, x, h, _, r), Dt(f, m, x, v, b, r));
  let S = i.map((e) => ({ x: e.nx * n, z: e.nz * n, nx: e.nx, nz: e.nz }));
  return {
    prims: [f.prim(`soft`)],
    rails: [
      { kind: w.LEDGE, path: [p.nx * n, 0, p.nz * n, 0, t, 0], nx: h, nz: _ },
      { kind: w.LEDGE, path: [0, t, 0, m.nx * n, 0, m.nz * n], nx: v, nz: b },
    ],
    outline: [...bt(S, xt), 0, xt * Math.SQRT2],
  };
}
var Mt = new Set([`cone`, `trash_can`]),
  Nt = (e) => e.kind === `prop` && Mt.has(e.prop);
