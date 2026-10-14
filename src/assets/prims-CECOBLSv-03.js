// assets/prims-CECOBLSv 03 — map
// Lines 634-834 of readable/assets/prims-CECOBLSv.pretty.js (statement-aligned).
function N(e, t, r, i, a = {}) {
  let o = t.length,
    s = a.who ?? `path`,
    c = t.map((e, t) => i(t)),
    l = c[0].length;
  for (let e of c)
    if (e.length !== l)
      throw Error(`${s}: every sample needs ${l} section rows`);
  let u = c.map((e, n) => e.map((e) => j(t[n], e))),
    d = a.maxTurn === void 0 ? M : n(a.maxTurn),
    f = [];
  for (let e = 0; e < o; e++) {
    let n = r ? (e + 1) % o : Math.min(e + 1, o - 1),
      i = r ? (e - 1 + o) % o : Math.max(e - 1, 0),
      a = t[e],
      s = [];
    for (let t = 0; t < l; t++) {
      let r = c[e][t],
        o = u[n][t],
        l = u[i][t],
        d = o[0] - l[0],
        f = o[1] - l[1],
        p = o[2] - l[2],
        m = r.abs ? [a.hx, 0, a.hz] : [a.rx, a.ry, a.rz],
        h = r.abs ? [0, 1, 0] : [a.vx, a.vy, a.vz],
        g = m[0] * r.nv - h[0] * r.nu,
        _ = m[1] * r.nv - h[1] * r.nu,
        v = m[2] * r.nv - h[2] * r.nu,
        y = f * v - p * _,
        b = p * g - d * v,
        x = d * _ - f * g,
        S = m[0] * r.nu + h[0] * r.nv,
        C = m[1] * r.nu + h[1] * r.nv,
        w = m[2] * r.nu + h[2] * r.nv;
      y * S + b * C + x * w < 0 && ((y = -y), (b = -b), (x = -x));
      let T = Math.sqrt(y * y + b * b + x * x);
      s.push(T > 1e-12 ? [y / T, b / T, x / T] : [S, C, w]);
    }
    f.push(s);
  }
  let p = r ? o : o - 1;
  for (let e = 0; e < p; e++) {
    let n = (e + 1) % o,
      r = t[e];
    for (let t = 0; t < l; t++) {
      let i = u[e][t],
        o = u[n][t];
      if (
        (o[0] - i[0]) * r.tx + (o[1] - i[1]) * r.ty + (o[2] - i[2]) * r.tz <=
        0
      )
        throw Error(
          `${s}: the section folds at s ${r.s.toFixed(2)} (row ${t}, u ${c[e][t].u}) — the turn is too tight for its width`,
        );
      if (a.quiet?.(t)) continue;
      let l = f[e][t],
        p = f[n][t];
      if (l[0] * p[0] + l[1] * p[1] + l[2] * p[2] < d)
        throw Error(
          `${s}: the surface turns too sharply at s ${r.s.toFixed(2)} (row ${t})`,
        );
    }
  }
  let m = u.map((t, n) =>
      t.map((t, r) =>
        e.v(t[0], t[1], t[2], f[n][r][0], f[n][r][1], f[n][r][2]),
      ),
    ),
    h = 0;
  for (let n = 0; n < p; n++) {
    let r = (n + 1) % o,
      i = Math.sqrt(
        (t[r].px - t[n].px) * (t[r].px - t[n].px) +
          (t[r].pz - t[n].pz) * (t[r].pz - t[n].pz),
      ),
      s = Math.floor((h + i / 2) / x) % 2 ? 0.965 : 1.035;
    h += i;
    for (let t = 0; t + 1 < l; t++) {
      if (a.skip?.(t, n)) continue;
      let i = a.skin?.(t, n) ?? c[n][t].skin;
      e.quad(
        m[n][t],
        m[r][t],
        m[r][t + 1],
        m[n][t + 1],
        i,
        i === `wood` ? s : 1,
      );
    }
  }
  return m;
}
function P(e, t, n, r, i, a = !1) {
  let o = n.map((e) => j(t, e)),
    s = a ? t.hx : t.rx,
    c = a ? 0 : t.ry,
    l = a ? t.hz : t.rz,
    u = a ? 0 : t.vx,
    d = a ? 1 : t.vy,
    f = a ? 0 : t.vz,
    p = o.map(([e, n, r]) => [
      (e - t.px) * s + (n - t.py) * c + (r - t.pz) * l,
      (e - t.px) * u + (n - t.py) * d + (r - t.pz) * f,
    ]),
    m = 0;
  for (let e = 0; e < p.length; e++) {
    let t = p[e],
      n = p[(e + 1) % p.length];
    m += t[0] * n[1] - n[0] * t[1];
  }
  let h = p.map((e, t) => t);
  m < 0 && h.reverse();
  let g = t.tx * r,
    _ = t.ty * r,
    v = t.tz * r;
  if (a) {
    let e = Math.sqrt(g * g + v * v);
    ((g /= e), (_ = 0), (v /= e));
  }
  let y = h.map((t) => e.v(o[t][0], o[t][1], o[t][2], g, _, v)),
    b = [];
  for (let e of h) b.push(p[e][0], p[e][1]);
  let x = k(b);
  for (let t = 0; t < x.length; t += 3)
    e.tri(y[x[t]], y[x[t + 1]], y[x[t + 2]], i);
}
var F = { RAIL: 0, LEDGE: 1, COPING: 2 };
function I(e, t, n, r = `both`) {
  let i = [];
  return (
    r !== `none` &&
      i.push({
        kind: F.LEDGE,
        path: [-e / 2, n, -t / 2, e / 2, n, -t / 2],
        nx: 0,
        nz: -1,
      }),
    r === `both` &&
      i.push({
        kind: F.LEDGE,
        path: [e / 2, n, t / 2, -e / 2, n, t / 2],
        nx: 0,
        nz: 1,
      }),
    i
  );
}
var L = 0.05,
  R = 0.045,
  z = 0.28;
function B(e, t, r, o) {
  let s = e - t,
    c = [],
    l = (e, t) => c.push({ u: 0, y: e, nu: 1, ny: 0, skin: t });
  if (s >= 0.33) {
    l(0, o);
    let e = Math.max(1, Math.ceil((s - z) / 1));
    for (let t = 0; t < e; t++) l(-0.28 - ((s - z) * t) / e, r);
  } else s > 0.001 && l(0, o);
  for (let e = 0; e <= 8; e++) {
    let l = (a * e) / 8,
      u = n(l),
      d = i(l);
    c.push({
      u: t - t * u,
      y: -s - t * d,
      nu: u,
      ny: d,
      skin: e === 0 && s <= 0.001 ? o : r,
    });
  }
  return c;
}
function V(e, t, n, r) {
  let i = new b(),
    a = H / 2,
    o = (e, t, n, r, a) => i.v(e, t, n, r, 0, a);
  for (let s of [-a, a]) {
    let a = s < 0 ? -1 : 1;
    i.quad(
      o(e, 0, s, 0, a),
      o(n, 0, s, 0, a),
      o(n, r, s, 0, a),
      o(e, t, s, 0, a),
      `metal`,
    );
  }
  for (let [s, c, l] of [
    [e, t, -1],
    [n, r, 1],
  ])
    i.quad(
      o(s, 0, -a, l, 0),
      o(s, 0, a, l, 0),
      o(s, c, a, l, 0),
      o(s, c, -a, l, 0),
      `metal`,
    );
  return i.prim(`none`, { render: !1, rail: !0 });
}
var H = 0.1;
