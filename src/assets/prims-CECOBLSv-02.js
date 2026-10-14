// assets/prims-CECOBLSv 02 — math
// Lines 317-633 of readable/assets/prims-CECOBLSv.pretty.js (statement-aligned).
function S(e, t, n, r) {
  let i = [];
  for (let n of t)
    i.push(
      r.map((t) =>
        e.v(
          n.x + n.nx * t.u,
          t.y,
          n.z + n.nz * t.u,
          n.nx * t.nu,
          t.ny,
          n.nz * t.nu,
        ),
      ),
    );
  let a = t.length,
    o = n ? a : a - 1,
    s = 0;
  for (let n = 0; n < o; n++) {
    let o = i[n],
      c = i[(n + 1) % a],
      l = t[n],
      u = t[(n + 1) % a],
      d =
        s +
        Math.sqrt((u.x - l.x) * (u.x - l.x) + (u.z - l.z) * (u.z - l.z)) / 2;
    s = d * 2 - s;
    let f = Math.floor(d / x) % 2 ? 0.965 : 1.035;
    for (let t = 0; t + 1 < r.length; t++)
      e.quad(
        o[t],
        c[t],
        c[t + 1],
        o[t + 1],
        r[t].skin,
        r[t].skin === `wood` ? f : 1,
      );
  }
  return i;
}
function C(e, t, n, r, i, a, o = 1, s = 1.25) {
  let c = 0;
  for (let e of t)
    c = Math.max(c, Math.sqrt((e.x - n) * (e.x - n) + (e.z - r) * (e.z - r)));
  let l = Math.max(1, Math.ceil(c / s)),
    u = t.length,
    d = t.map((t) => e.v(t.x, i, t.z, 0, o, 0));
  for (let s = 1; s < l; s++) {
    let c = 1 - s / l,
      f = t.map((t) => e.v(n + (t.x - n) * c, i, r + (t.z - r) * c, 0, o, 0));
    for (let t = 0; t < u; t++)
      e.quad(d[t], d[(t + 1) % u], f[(t + 1) % u], f[t], a);
    d = f;
  }
  let f = e.v(n, i, r, 0, o, 0);
  for (let t = 0; t < u; t++) e.tri(d[t], d[(t + 1) % u], f, a);
}
function w(t, n, r, i, a, s, c, l = 1.6) {
  let u = n.length,
    d = n.map((e) => {
      let t = e.x - r,
        n = e.z - i,
        o = 1 / 0;
      return (
        t > 0
          ? (o = Math.min(o, (a.x1 - r) / t))
          : t < 0 && (o = Math.min(o, (a.x0 - r) / t)),
        n > 0
          ? (o = Math.min(o, (a.z1 - i) / n))
          : n < 0 && (o = Math.min(o, (a.z0 - i) / n)),
        { x: r + t * o, z: i + n * o }
      );
    }),
    f = 0;
  for (let e = 0; e < u; e++)
    f = Math.max(
      f,
      Math.sqrt(
        (d[e].x - n[e].x) * (d[e].x - n[e].x) +
          (d[e].z - n[e].z) * (d[e].z - n[e].z),
      ),
    );
  let p = Math.max(1, Math.ceil(f / l)),
    m = (e) =>
      n.map((n, r) =>
        t.v(
          n.x + (d[r].x - n.x) * (e / p),
          s,
          n.z + (d[r].z - n.z) * (e / p),
          0,
          1,
          0,
        ),
      ),
    h = m(0);
  for (let e = 1; e < p; e++) {
    let n = m(e);
    for (let e = 0; e < u; e++)
      t.quad(h[e], h[(e + 1) % u], n[(e + 1) % u], n[e], c);
    h = n;
  }
  let g = d.map((e) => t.v(e.x, s, e.z, 0, 1, 0)),
    _ = [
      { x: a.x1, z: a.z1 },
      { x: a.x0, z: a.z1 },
      { x: a.x0, z: a.z0 },
      { x: a.x1, z: a.z0 },
    ],
    v = _.map((t) => e(t.z - i, t.x - r)),
    y = _.map((e) => t.v(e.x, s, e.z, 0, 1, 0));
  for (let a = 0; a < u; a++) {
    let s = (a + 1) % u,
      l = e(n[a].z - i, n[a].x - r),
      d = o(e(n[s].z - i, n[s].x - r) - l),
      f = [0, 1, 2, 3]
        .map((e) => ({ k: e, d: o(v[e] - l) }))
        .filter((e) => e.d > 0 && e.d < d)
        .sort((e, t) => e.d - t.d)
        .map((e) => y[e.k]),
      p = [h[a], h[s], g[s], ...f.reverse(), g[a]].reverse(),
      m = [];
    for (let e of p) m.push(t.pos[e * 3], t.pos[e * 3 + 2]);
    let _ = k(m);
    for (let e = 0; e < _.length; e += 3)
      t.tri(p[_[e]], p[_[e + 1]], p[_[e + 2]], c);
  }
}
function T(e, t, n, r, i) {
  let a = new Set([t.x0, t.x1]);
  for (let e of n)
    (e.x0 > t.x0 && e.x0 < t.x1 && a.add(e.x0),
      e.x1 > t.x0 && e.x1 < t.x1 && a.add(e.x1));
  let o = [...a].sort((e, t) => e - t);
  for (let a = 0; a + 1 < o.length; a++) {
    let s = o[a],
      c = o[a + 1],
      l = (s + c) / 2,
      u = n
        .filter((e) => e.x0 < l && e.x1 > l)
        .map((e) => [Math.max(e.z0, t.z0), Math.min(e.z1, t.z1)])
        .sort((e, t) => e[0] - t[0]),
      d = t.z0,
      f = [];
    for (let [e, t] of u) (e > d && f.push([d, e]), (d = Math.max(d, t)));
    d < t.z1 && f.push([d, t.z1]);
    for (let [t, n] of f) {
      let a = e.v(s, r, t, 0, 1, 0),
        o = e.v(c, r, t, 0, 1, 0),
        l = e.v(c, r, n, 0, 1, 0),
        u = e.v(s, r, n, 0, 1, 0);
      e.quad(a, o, l, u, i);
    }
  }
}
function E(e, t, n, r, i, a = 1.25) {
  let o = [
      [t.x0, t.z0, t.x1, t.z0, 0, -1],
      [t.x1, t.z0, t.x1, t.z1, 1, 0],
      [t.x1, t.z1, t.x0, t.z1, 0, 1],
      [t.x0, t.z1, t.x0, t.z0, -1, 0],
    ],
    s = Math.max(1, Math.ceil((r - n) / 1));
  for (let [t, c, l, u, d, f] of o) {
    let o = Math.sqrt((l - t) * (l - t) + (u - c) * (u - c)),
      p = Math.max(1, Math.ceil(o / a)),
      m = [];
    for (let i = 0; i <= p; i++) {
      let a = t + ((l - t) * i) / p,
        o = c + ((u - c) * i) / p,
        h = [];
      for (let t = 0; t <= s; t++)
        h.push(e.v(a, n + ((r - n) * t) / s, o, d, 0, f));
      m.push(h);
    }
    for (let t = 0; t < p; t++)
      for (let n = 0; n < s; n++)
        e.quad(m[t][n], m[t + 1][n], m[t + 1][n + 1], m[t][n + 1], i);
  }
}
function D(e, t, n, r, i, a = 1.6) {
  let o = 0;
  for (let e = 0; e < t.length; e++) {
    let r = n[e].x - t[e].x,
      i = n[e].z - t[e].z;
    o = Math.max(o, Math.sqrt(r * r + i * i));
  }
  let s = Math.max(1, Math.ceil(o / a)),
    c = (i) =>
      t.map((t, a) =>
        e.v(
          t.x + (n[a].x - t.x) * (i / s),
          r,
          t.z + (n[a].z - t.z) * (i / s),
          0,
          1,
          0,
        ),
      ),
    l = c(0);
  for (let n = 1; n <= s; n++) {
    let r = c(n);
    for (let n = 0; n + 1 < t.length; n++)
      e.quad(l[n], l[n + 1], r[n + 1], r[n], i);
    l = r;
  }
}
function O(e, t, n, r, i, a, o, s = 1.25) {
  let c = Math.max(1, Math.ceil((a - i) / 1)),
    l = [t[0]];
  for (let e = 0; e + 1 < t.length; e++) {
    let n = t[e],
      r = t[e + 1],
      i = r.x - n.x,
      a = r.z - n.z,
      o = Math.max(1, Math.ceil(Math.sqrt(i * i + a * a) / s));
    for (let e = 1; e <= o; e++)
      l.push({ x: n.x + (i * e) / o, z: n.z + (a * e) / o });
  }
  let u = l.map((t) => {
    let o = [];
    for (let s = 0; s <= c; s++)
      o.push(e.v(t.x, i + ((a - i) * s) / c, t.z, n, 0, r));
    return o;
  });
  for (let t = 0; t + 1 < u.length; t++)
    for (let n = 0; n < c; n++)
      e.quad(u[t][n], u[t + 1][n], u[t + 1][n + 1], u[t][n + 1], o);
}
function k(e) {
  let t = e.length / 2,
    n = Array.from({ length: t }, (e, t) => t),
    r = [],
    i = (t, n, r) =>
      (e[n * 2] - e[t * 2]) * (e[r * 2 + 1] - e[t * 2 + 1]) -
      (e[n * 2 + 1] - e[t * 2 + 1]) * (e[r * 2] - e[t * 2]),
    a = (e, t, n, r) => i(t, n, e) >= 0 && i(n, r, e) >= 0 && i(r, t, e) >= 0,
    o = t * t;
  for (; n.length > 3 && o-- > 0;) {
    let e = !1;
    for (let t = 0; t < n.length; t++) {
      let o = n[(t - 1 + n.length) % n.length],
        s = n[t],
        c = n[(t + 1) % n.length];
      if (i(o, s, c) <= 1e-12) continue;
      let l = !0;
      for (let e of n)
        if (e !== o && e !== s && e !== c && a(e, o, s, c)) {
          l = !1;
          break;
        }
      if (l) {
        (r.push(o, s, c), n.splice(t, 1), (e = !0));
        break;
      }
    }
    if (!e) break;
  }
  return (n.length === 3 && r.push(n[0], n[1], n[2]), r);
}
function A(e, t) {
  return e.map((e) => {
    if (t)
      return {
        px: e.x,
        py: e.y,
        pz: e.z,
        rx: e.lx,
        ry: 0,
        rz: e.lz,
        vx: 0,
        vy: 1,
        vz: 0,
        tx: e.tx,
        ty: e.ty,
        tz: e.tz,
        hx: e.lx,
        hz: e.lz,
        s: e.s,
      };
    let r = 0 * e.tz - e.lz * e.ty,
      a = e.lz * e.tx - e.lx * e.tz,
      o = e.lx * e.ty - 0 * e.tx,
      s = Math.sqrt(r * r + a * a + o * o),
      c = n(e.bank),
      l = i(e.bank),
      u = r / s,
      d = a / s,
      f = o / s;
    return {
      px: e.x,
      py: e.y,
      pz: e.z,
      rx: e.lx * c + u * l,
      ry: d * l,
      rz: e.lz * c + f * l,
      vx: u * c - e.lx * l,
      vy: d * c,
      vz: f * c - e.lz * l,
      tx: e.tx,
      ty: e.ty,
      tz: e.tz,
      hx: e.lx,
      hz: e.lz,
      s: e.s,
    };
  });
}
function j(e, t) {
  return t.abs
    ? [e.px + e.hx * t.u, t.v, e.pz + e.hz * t.u]
    : [
        e.px + e.rx * t.u + e.vx * t.v,
        e.py + e.ry * t.u + e.vy * t.v,
        e.pz + e.rz * t.u + e.vz * t.v,
      ];
}
var M = 0.9396926207859084;
