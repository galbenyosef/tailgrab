// assets__prims-CECOBLSv 01 — math
// Lines 1-316 of readable/assets__prims-CECOBLSv.pretty.js (statement-aligned).
import { a as e, n as t, o as n, r, s as i, t as a } from "./dmath-_BI8hNwF.js";
function o(e) {
  let t = e - r * Math.floor(e / r);
  return t >= 6.283185307179586 ? 0 : t;
}
var s = (t, n) => e(n, t);
function c(e, t, n, r, i) {
  return { type: `arc`, cx: e, cz: t, R: n, a0: r, da: i };
}
function l(e) {
  return { segs: [c(0, 0, e, 0, r)], cx: 0, cz: 0, closed: !0 };
}
function u(e, n) {
  let r = e / 2;
  return {
    segs: [
      c(r, 0, n, -t / 2, t),
      { type: `line`, x0: r, z0: n, x1: -r, z1: n },
      c(-r, 0, n, t / 2, t),
      { type: `line`, x0: -r, z0: -n, x1: r, z1: -n },
    ],
    cx: 0,
    cz: 0,
    closed: !0,
  };
}
function d(e, t, n, r) {
  let i = -n / 2,
    a = n / 2,
    l = (e - t) / n,
    u = Math.sqrt(1 - l * l),
    d = i + e * l,
    f = e * u,
    p = a + t * l,
    m = t * u,
    h = e + r,
    g = t + r,
    _ = (n * n + h * h - g * g) / (2 * n),
    v = i + _,
    y = -Math.sqrt(h * h - _ * _),
    b = s(l, u),
    x = s(v - i, y),
    S = s(v - a, y),
    C = s(i - v, -y),
    w = s(a - v, -y);
  return {
    segs: [
      { type: `line`, x0: p, z0: m, x1: d, z1: f },
      c(i, 0, e, b, o(x - b)),
      c(v, y, r, C, -o(C - w)),
      c(a, 0, t, S, o(b - S)),
    ],
    cx: (i * t + a * e) / (e + t),
    cz: ((m + f) / 2 + y + r) / 2,
    closed: !0,
  };
}
function f(a, l, u, d, f = 0) {
  let p = t / a,
    m = i(p),
    h = n(p),
    g = l * h + Math.sqrt((u + d) * (u + d) - l * l * m * m),
    _ = e(g * m, g * h - l),
    v = [];
  for (let e = 0; e < a; e++) {
    let t = f + (r * e) / a,
      m = t + p,
      h = t + 2 * p,
      y = l * n(t),
      b = l * i(t),
      x = g * n(m),
      S = g * i(m),
      C = l * n(h),
      w = l * i(h);
    v.push(c(y, b, u, t - _, 2 * _));
    let T = s(y - x, b - S),
      E = s(C - x, w - S);
    v.push(c(x, S, d, T, -o(T - E)));
  }
  return { segs: v, cx: 0, cz: 0, closed: !0 };
}
function p(e, t, n, r, i = !1) {
  let a = r ? n - t / 2 : n + t / 2,
    o = r ? t : -t;
  return {
    segs: i
      ? [c(0, 0, e, a, o / 2), c(0, 0, e, a + o / 2, o / 2)]
      : [c(0, 0, e, a, o)],
    cx: 0,
    cz: 0,
    closed: !1,
  };
}
function m(e, t = {}) {
  let r = t.step ?? 0.6,
    a = t.turn ?? 0.1745,
    o = t.lineStep ?? 1.25,
    s = [],
    c = (e, t, r) => {
      let a = e.a0 + (e.da * t) / r,
        o = n(a),
        c = i(a),
        l = e.da > 0 ? -1 : 1;
      s.push({
        x: e.cx + e.R * o,
        z: e.cz + e.R * c,
        nx: l * o,
        nz: l * c,
        R: e.da > 0 ? e.R : -e.R,
      });
    };
  for (let t of e.segs)
    if (t.type === `arc`) {
      let e = Math.max(
        1,
        Math.ceil(Math.max((Math.abs(t.da) * t.R) / r, Math.abs(t.da) / a)),
      );
      for (let n = 0; n < e; n++) c(t, n, e);
    } else {
      let e = t.x1 - t.x0,
        n = t.z1 - t.z0,
        r = Math.sqrt(e * e + n * n),
        i = Math.max(1, Math.ceil(r / o)),
        a = -n / r,
        c = e / r;
      for (let r = 0; r < i; r++)
        s.push({
          x: t.x0 + (e * r) / i,
          z: t.z0 + (n * r) / i,
          nx: a,
          nz: c,
          R: 0,
        });
    }
  if (!e.closed) {
    let t = e.segs[e.segs.length - 1];
    if (t.type === `arc`) c(t, 1, 1);
    else {
      let e = t.x1 - t.x0,
        n = t.z1 - t.z0,
        r = Math.sqrt(e * e + n * n);
      s.push({ x: t.x1, z: t.z1, nx: -n / r, nz: e / r, R: 0 });
    }
  }
  return s;
}
function h(e) {
  if (e.type === `line`) {
    let t = e.x1 - e.x0,
      n = e.z1 - e.z0,
      r = Math.sqrt(t * t + n * n);
    return [e.x0, e.z0, t / r, n / r];
  }
  let t = n(e.a0),
    r = i(e.a0),
    a = e.da > 0 ? 1 : -1;
  return [e.cx + e.R * t, e.cz + e.R * r, -r * a, t * a];
}
function g(e) {
  if (e.type === `line`) {
    let t = e.x1 - e.x0,
      n = e.z1 - e.z0,
      r = Math.sqrt(t * t + n * n);
    return [e.x1, e.z1, t / r, n / r];
  }
  let t = e.a0 + e.da,
    r = n(t),
    a = i(t),
    o = e.da > 0 ? 1 : -1;
  return [e.cx + e.R * r, e.cz + e.R * a, -a * o, r * o];
}
function _(e, t, n = 1, i = 1) {
  let a = e.segs;
  for (let e of a)
    for (let t of Object.values(e))
      if (typeof t == `number` && !Number.isFinite(t))
        throw Error(`rim parameters don't meet (NaN)`);
  let o = 0;
  for (let r = 0; r < a.length; r++) {
    let i = a[r];
    if (i.type === `arc` && ((o += i.da), i.da > 0 && i.R - t < n - 1e-9))
      throw Error(`pocket R ${i.R} leaves a toe radius under ${n}`);
    if (!e.closed && r === a.length - 1) break;
    let [s, c, l, u] = g(i),
      [d, f, p, m] = h(a[(r + 1) % a.length]);
    if (Math.abs(s - d) > 1e-6 || Math.abs(c - f) > 1e-6)
      throw Error(`rim gap at junction ${r}`);
    if (Math.abs(l - p) > 1e-6 || Math.abs(u - m) > 1e-6)
      throw Error(`rim kink at junction ${r}`);
  }
  if (e.closed && Math.abs(o - 6.283185307179586) > 1e-6)
    throw Error(`rim turns ${o}, not 2π`);
  if (!e.closed) return;
  let c = m(e);
  for (let n of [0, t]) {
    let t = NaN,
      i = 0;
    for (let a = 0; a <= c.length; a++) {
      let o = c[a % c.length],
        l = s(o.x + o.nx * n - e.cx, o.z + o.nz * n - e.cz);
      if (a > 0) {
        let e = l - t - r * Math.round((l - t) / r);
        if (e <= 0)
          throw Error(`rim not star-shaped at sample ${a} (offset ${n})`);
        i += e;
      }
      t = l;
    }
    if (Math.abs(i - 6.283185307179586) > 1e-6)
      throw Error(`rim winds ${i} around its centre`);
  }
  let l = c.map((e) => e.x + e.nx * t),
    u = c.map((e) => e.z + e.nz * t),
    d = c.length,
    f = [0];
  for (let e = 1; e <= d; e++)
    f.push(
      f[e - 1] +
        Math.sqrt(
          (l[e % d] - l[e - 1]) * (l[e % d] - l[e - 1]) +
            (u[e % d] - u[e - 1]) * (u[e % d] - u[e - 1]),
        ),
    );
  let p = f[d],
    _ = i * 2.2;
  for (let e = 0; e < d; e++)
    for (let t = 0; t < d; t++) {
      let n = (t + 1) % d,
        r = Math.abs(f[e] - f[t]),
        a = Math.abs(f[e] - f[t + 1]);
      if (
        !(Math.min(r, p - r) < _ || Math.min(a, p - a) < _) &&
        v(l[e], u[e], l[t], u[t], l[n], u[n]) < i - 1e-9
      )
        throw Error(
          `toe loop pinches to under ${i} m near (${l[e].toFixed(2)}, ${u[e].toFixed(2)})`,
        );
    }
}
function v(e, t, n, r, i, a) {
  let o = i - n,
    s = a - r,
    c = o * o + s * s,
    l = c > 0 ? ((e - n) * o + (t - r) * s) / c : 0;
  l = l < 0 ? 0 : l > 1 ? 1 : l;
  let u = n + o * l - e,
    d = r + s * l - t;
  return Math.sqrt(u * u + d * d);
}
function y(e) {
  let t = 1 / 0,
    n = -1 / 0,
    r = 1 / 0,
    i = -1 / 0;
  for (let a of e)
    (a.x < t && (t = a.x),
      a.x > n && (n = a.x),
      a.z < r && (r = a.z),
      a.z > i && (i = a.z));
  return { x0: t, x1: n, z0: r, z1: i };
}
var b = class {
    pos = [];
    nrm = [];
    tris = [];
    skins = [];
    shade = [];
    v(e, t, n, r, i, a) {
      return (
        this.pos.push(e, t, n),
        this.nrm.push(r, i, a),
        this.pos.length / 3 - 1
      );
    }
    tri(e, t, n, r, i = 1) {
      let a = this.pos,
        o = this.nrm,
        s = a[t * 3] - a[e * 3],
        c = a[t * 3 + 1] - a[e * 3 + 1],
        l = a[t * 3 + 2] - a[e * 3 + 2],
        u = a[n * 3] - a[e * 3],
        d = a[n * 3 + 1] - a[e * 3 + 1],
        f = a[n * 3 + 2] - a[e * 3 + 2],
        p = c * f - l * d,
        m = l * u - s * f,
        h = s * d - c * u;
      if (p * p + m * m + h * h < 1e-14) return;
      let g = o[e * 3] + o[t * 3] + o[n * 3],
        _ = o[e * 3 + 1] + o[t * 3 + 1] + o[n * 3 + 1],
        v = o[e * 3 + 2] + o[t * 3 + 2] + o[n * 3 + 2];
      (p * g + m * _ + h * v < 0
        ? this.tris.push(e, n, t)
        : this.tris.push(e, t, n),
        this.skins.push(r),
        this.shade.push(i));
    }
    quad(e, t, n, r, i, a = 1) {
      (this.tri(e, t, n, i, a), this.tri(e, n, r, i, a));
    }
    prim(e, t = {}) {
      let n = this.shade.some((e) => e !== 1);
      return {
        type: `mesh`,
        pos: this.pos,
        nrm: this.nrm,
        tris: this.tris,
        skins: this.skins,
        bevel: e,
        collide: !0,
        render: !0,
        ...(n ? { shade: this.shade } : {}),
        ...t,
      };
    }
  },
  x = 1.22;
