// assets/preload-helper-DR1MrGPZ 01 — math
// Lines 1-334 of readable/assets/preload-helper-DR1MrGPZ.pretty.js (statement-aligned).
import { a as e, c as t, o as n, r, s as i, t as a } from "./dmath-_BI8hNwF.js";
import { Xt as o, Yt as s, Zt as c, et as l } from "./tuning-D4mSK766.js";
import {
  C as u,
  D as d,
  E as f,
  O as p,
  S as m,
  T as h,
  _ as g,
  a as _,
  b as v,
  c as y,
  d as b,
  f as x,
  g as S,
  h as C,
  i as w,
  l as T,
  m as E,
  n as D,
  o as O,
  p as k,
  r as A,
  s as j,
  t as M,
  u as N,
  v as P,
  w as F,
  x as I,
  y as L,
} from "./prims-CECOBLSv.js";
var R = 0.1047,
  z = 0.0524,
  B = 1200,
  V = (e) => (`line` in e ? e.line : Math.abs(e.turn) * e.arc);
function checkStep(e) {
  let t = [],
    r = 0,
    a = 0,
    o = 0,
    s = 0;
  for (let c of e) {
    let e = V(c);
    if (!(e > 0))
      throw Error(
        `path: a plan step needs a positive length (${JSON.stringify(c)})`,
      );
    if (`line` in c)
      (t.push({
        s0: s,
        len: e,
        x0: r,
        z0: a,
        h0: o,
        cx: 0,
        cz: 0,
        R: 0,
        turn: 0,
      }),
        (r += i(o) * e),
        (a += n(o) * e));
    else {
      if (!(c.arc > 0)) throw Error(`path: an arc needs a positive radius`);
      let l = c.turn > 0 ? 1 : -1,
        u = r + l * c.arc * n(o),
        d = a - l * c.arc * i(o);
      (t.push({
        s0: s,
        len: e,
        x0: r,
        z0: a,
        h0: o,
        cx: u,
        cz: d,
        R: c.arc,
        turn: c.turn,
      }),
        (o += c.turn),
        (r = u - l * c.arc * n(o)),
        (a = d + l * c.arc * i(o)));
    }
    s += e;
  }
  return t;
}
function U(e, t) {
  if (e.turn === 0)
    return { x: e.x0 + i(e.h0) * t, z: e.z0 + n(e.h0) * t, h: e.h0 };
  let r = e.h0 + e.turn * (t / e.len),
    a = e.turn > 0 ? 1 : -1;
  return { x: e.cx - a * e.R * n(r), z: e.cz + a * e.R * i(r), h: r };
}
function checkRise(e, t, n) {
  let r = e.length,
    i = e.reduce((e, t) => e + t.len, 0),
    a = t.y0 ?? 0,
    o = t.rises ?? e.map((e) => ((t.rise ?? 0) * e.len) / i);
  if (o.length !== r)
    throw Error(`path: ${o.length} rises for ${r} plan steps`);
  let s = o.reduce((e, t) => e + t, 0);
  if (n && Math.abs(s) > 1e-9) throw Error(`path: a closed path can't rise`);
  let c = t.ease ?? 6,
    l = t.slope0 ?? 0,
    u = t.slope1 ?? 0,
    d = [];
  for (let t = 1; t < r; t++)
    d.push(Math.min(c, e[t - 1].len / 2, e[t].len / 2));
  let f = n ? 0 : Math.min(c, e[0].len / 2),
    p = n ? 0 : Math.min(c, e[r - 1].len / 2),
    m = e.map((e, t) => {
      let n = e.len,
        i = o[t];
      return (
        t === 0 && f > 0 && ((n -= f / 2), (i -= (l * f) / 2)),
        t === r - 1 && p > 0 && ((n -= p / 2), (i -= (u * p) / 2)),
        i / n
      );
    }),
    h = [];
  (h.push({ s: 0, g: f > 0 ? l : m[0] }), f > 0 && h.push({ s: f, g: m[0] }));
  for (let t = 1; t < r; t++) {
    let n = e[t].s0,
      r = d[t - 1];
    h.push({ s: n - r / 2, g: m[t - 1] }, { s: n + r / 2, g: m[t] });
  }
  (p > 0 && h.push({ s: i - p, g: m[r - 1] }),
    h.push({ s: i, g: p > 0 ? u : m[r - 1] }));
  let g = [],
    _ = a;
  for (let e = 0; e < h.length; e++)
    (e > 0 && (_ += ((h[e].s - h[e - 1].s) * (h[e].g + h[e - 1].g)) / 2),
      g.push({ s: h[e].s, g: h[e].g, y: _ }));
  return ((g[g.length - 1].y = a + s), g);
}
function checkBank(e, t) {
  if (!t) return [];
  let n = e.length,
    r = t.ease ?? 6,
    i =
      t.angles ??
      e.map((e) => (e.turn === 0 ? 0 : (t.auto ?? 0) * (e.turn > 0 ? 1 : -1)));
  if (i.length !== n)
    throw Error(`path: ${i.length} bank angles for ${n} plan steps`);
  let a = e[n - 1].s0 + e[n - 1].len,
    o = Math.min(r, e[0].len / 4),
    s = Math.min(r, e[n - 1].len / 4),
    c = [
      { s: 0, b: t.b0 ?? 0 },
      { s: o, b: i[0] },
    ];
  for (let t = 1; t < n; t++) {
    let n = e[t].s0,
      a = Math.min(r, e[t - 1].len / 2, e[t].len / 2);
    c.push({ s: n - a / 2, b: i[t - 1] }, { s: n + a / 2, b: i[t] });
  }
  return (c.push({ s: a - s, b: i[n - 1] }, { s: a, b: t.b1 ?? 0 }), c);
}
function K(e, t) {
  let n = e.knots;
  if (t <= n[0].s) return { y: n[0].y + (t - n[0].s) * n[0].g, g: n[0].g };
  for (let e = 1; e < n.length; e++) {
    let r = n[e - 1],
      i = n[e];
    if (t > i.s && e < n.length - 1) continue;
    if (t >= i.s) return { y: i.y + (t - i.s) * i.g, g: i.g };
    let a = i.s - r.s,
      o = a > 0 ? r.g + ((i.g - r.g) * (t - r.s)) / a : i.g;
    return { y: r.y + ((t - r.s) * (r.g + o)) / 2, g: o };
  }
  let r = n[n.length - 1];
  return { y: r.y, g: r.g };
}
function ee(e, t) {
  let n = e.bankKnots;
  if (!n.length) return 0;
  if (t <= n[0].s) return n[0].b;
  for (let e = 1; e < n.length; e++) {
    let r = n[e - 1],
      i = n[e];
    if (t > i.s) continue;
    let a = i.s - r.s;
    return a > 0 ? r.b + ((i.b - r.b) * (t - r.s)) / a : i.b;
  }
  return n[n.length - 1].b;
}
function checkPlan(e) {
  if (!e.plan.length) throw Error(`path: empty plan`);
  if (e.step !== void 0 && !(e.step >= 0.1))
    throw Error(`path: step must be ≥ 0.1 m`);
  for (let t of e.plan)
    if (!Number.isFinite(`line` in t ? t.line : t.arc * t.turn))
      throw Error(`path: plan steps must be finite`);
  let t = checkStep(e.plan),
    n = t.reduce((e, t) => e + t.len, 0),
    r = checkRise(t, e.grade ?? {}, !!e.closed),
    i = {
      spec: e,
      segs: t,
      length: n,
      knots: r,
      bankKnots: checkBank(t, e.bank),
      ox: 0,
      oz: 0,
      y0: r[0].y,
      y1: r[r.length - 1].y,
    };
  if (e.closed) {
    let n = e.plan.reduce((e, t) => e + (`turn` in t ? t.turn : 0), 0),
      r = U(t[t.length - 1], t[t.length - 1].len);
    if (
      Math.abs(Math.abs(n) - 6.283185307179586) > 1e-9 ||
      Math.abs(r.x) > 1e-6 ||
      Math.abs(r.z) > 1e-6
    )
      throw Error(
        `path: a closed plan must end where it starts, one full turn round`,
      );
  }
  if (e.anchor === `center`) {
    let e = 1 / 0,
      t = -1 / 0,
      n = 1 / 0,
      r = -1 / 0;
    for (let a of checkSamples(i)) {
      let o = J(i, a);
      ((e = Math.min(e, o.x)),
        (t = Math.max(t, o.x)),
        (n = Math.min(n, o.z)),
        (r = Math.max(r, o.z)));
    }
    ((i.ox = -(e + t) / 2), (i.oz = -(n + r) / 2));
  }
  return i;
}
function J(e, t) {
  let n = e.segs,
    r = 0;
  for (; r < n.length - 1 && t > n[r].s0 + n[r].len;) r++;
  let i = n[r],
    a = U(i, Math.min(Math.max(t - i.s0, 0), i.len));
  return {
    x: a.x + e.ox,
    z: a.z + e.oz,
    h: a.h,
    k: i.turn === 0 ? 0 : i.turn / i.len,
  };
}
function te(e, t) {
  let r = J(e, t),
    { y: a, g: o } = K(e, t),
    s = i(r.h),
    c = n(r.h),
    l = Math.sqrt(1 + o * o);
  return {
    x: r.x,
    y: a,
    z: r.z,
    tx: s / l,
    ty: o / l,
    tz: c / l,
    lx: -c,
    lz: s,
    bank: ee(e, t),
    s: t,
    k: r.k,
    g: o,
    h: r.h,
  };
}
function checkSamples(t) {
  let n = t.spec.step ?? 1.25,
    r = [];
  for (let e of t.segs) {
    let t = Math.max(1, Math.ceil(e.len / n), Math.ceil(Math.abs(e.turn) / R));
    for (let n = 0; n < t; n++) r.push(e.s0 + (e.len * n) / t);
  }
  let i = t.knots;
  for (let t = 1; t < i.length; t++) {
    let n = i[t - 1],
      a = i[t];
    if (a.s - n.s <= 1e-9 || n.g === a.g) continue;
    let o = Math.abs(e(a.g, 1) - e(n.g, 1)),
      s = Math.ceil(o / z);
    for (let e = 1; e < s; e++) r.push(n.s + ((a.s - n.s) * e) / s);
    r.push(n.s, a.s);
  }
  (t.spec.closed || r.push(t.length), r.sort((e, t) => e - t));
  let a = [];
  for (let e of r)
    e < -1e-9 ||
      e > t.length + 1e-9 ||
      (t.spec.closed && e >= t.length - 1e-6) ||
      ((!a.length || e - a[a.length - 1] > 1e-6) &&
        a.push(Math.min(Math.max(e, 0), t.length)));
  if (a.length > 1200)
    throw Error(
      `path: ${a.length} samples (max ${B}); split it into shorter pieces`,
    );
  return a;
}
function re(e) {
  return checkSamples(e).map((t) => te(e, t));
}
function ie(e) {
  let t = te(e, e.length);
  return { x: t.x, y: t.y, z: t.z, h: t.h, g: t.g, bank: t.bank };
}
function ae(e) {
  let t = (e.left === !1 ? -1 : 1) * r * e.turns,
    n = e.lead ?? 0;
  return n <= 0
    ? { plan: [{ arc: e.R, turn: t }], grade: { rise: e.rise, ease: e.ease } }
    : {
        plan: [{ line: n }, { arc: e.R, turn: t }, { line: n }],
        grade: { rises: [0, e.rise, 0], ease: e.ease },
      };
}
function oe(e) {
  let t = ie(checkPlan(e.path)),
    r = e.rot ?? 0,
    a = n(r),
    o = i(r);
  return {
    x: e.x + t.x * a + t.z * o,
    y: (e.y ?? 0) + t.y,
    z: e.z - t.x * o + t.z * a,
    rot: r + t.h,
  };
}
var se = (e) => {
  let t = e - r * Math.floor(e / r);
  return t >= 6.283185307179586 ? 0 : t;
};
