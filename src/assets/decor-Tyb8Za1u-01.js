// assets/decor-Tyb8Za1u 01 — math
// Lines 1-290 of readable/assets/decor-Tyb8Za1u.pretty.js (statement-aligned).
import {
  Ut as e,
  V as t,
  bt as n,
  c as r,
  j as i,
  l as a,
  q as o,
  xt as s,
  yr as c,
  yt as l,
} from "./three.core-DVWDmH0S.js";
import { a as u, i as d, t as f } from "./toon-CycGToy9.js";
import {
  I as p,
  P as m,
  _ as h,
  k as g,
  s as _,
  u as v,
} from "./preload-helper-DR1MrGPZ.js";
import { d as y, f as b, p as x, u as S, zt as C } from "./tuning-D4mSK766.js";
import { r as w, u as T } from "./scene-DiAs2bfK.js";
import { a as E, t as D } from "./outline-BufNikL2.js";
import { c as O, g as k } from "./types-DM-HODfo.js";
import { t as ee } from "./sfx-6jovSU2-.js";
import { t as te } from "./verlet-BVVzuOqv.js";
import { t as ne } from "./GLTFLoader-BAb7LzOS.js";
var re = {
  trick: `portal_trick`,
  graffiti: `portal_graffiti`,
  horse: `portal_horse`,
  skate: `portal_skate`,
  tag: `portal_tag`,
  career: `portal_career`,
};
function ie(e) {
  let t = e >>> 0;
  return () => {
    t = (t + 1831565813) >>> 0;
    let e = t;
    return (
      (e = Math.imul(e ^ (e >>> 15), e | 1)),
      (e ^= e + Math.imul(e ^ (e >>> 7), e | 61)),
      ((e ^ (e >>> 14)) >>> 0) / 4294967296
    );
  };
}
function ae(e) {
  let t = 2166136261;
  for (let n = 0; n < e.length; n++)
    t = Math.imul(t ^ e.charCodeAt(n), 16777619);
  return t >>> 0;
}
function oe(e) {
  let t = { minX: 1 / 0, maxX: -1 / 0, minZ: 1 / 0, maxZ: -1 / 0 };
  for (let n of e.pieces)
    n.kind === `floor` &&
      ((t.minX = Math.min(t.minX, n.x - n.w / 2)),
      (t.maxX = Math.max(t.maxX, n.x + n.w / 2)),
      (t.minZ = Math.min(t.minZ, n.z - n.d / 2)),
      (t.maxZ = Math.max(t.maxZ, n.z + n.d / 2)));
  return t;
}
var A = [`tree_round`, `tree_tall`, `tree_blossom`];
function se(e, t, n, r) {
  let i = [],
    a = r.count * 30,
    o = 0;
  for (; o < r.count && a-- > 0;) {
    let a = Math.floor(n() * 4),
      s = n(),
      c = r.inner + n() ** 1.6 * (r.outer - r.inner),
      l,
      u;
    a === 0
      ? ((l = t.minX - c + (t.maxX - t.minX + 2 * c) * s), (u = t.maxZ + c))
      : a === 1
        ? ((l = t.minX - c + (t.maxX - t.minX + 2 * c) * s), (u = t.minZ - c))
        : a === 2
          ? ((u = t.minZ - c + (t.maxZ - t.minZ + 2 * c) * s), (l = t.maxX + c))
          : ((u = t.minZ - c + (t.maxZ - t.minZ + 2 * c) * s),
            (l = t.minX - c));
    let d = n() < 0.3,
      f = d ? 1.2 : 2.6;
    if (i.some((e) => (e.x - l) ** 2 + (e.z - u) ** 2 < (e.rad + f) ** 2))
      continue;
    i.push({ x: l, z: u, rad: f });
    let p = d ? `bush` : A[Math.floor(n() * A.length)];
    (e.push({
      prop: p,
      x: l,
      y: 0,
      z: u,
      rot: n() * Math.PI * 2,
      s: d ? 0.9 + n() * 0.5 : 0.85 + n() * 0.45,
    }),
      o++);
  }
}
function ce(e, t, n, r, i = 6, a = 5) {
  let o = [
    [t.minX, t.maxZ + n, 1, 0, Math.PI],
    [t.minX, t.minZ - n, 1, 0, 0],
    [t.maxX + n, t.minZ, 0, 1, -Math.PI / 2],
    [t.minX - n, t.minZ, 0, 1, Math.PI / 2],
  ];
  for (let [n, s, c, l, u] of o) {
    let o = c ? t.maxX - t.minX : t.maxZ - t.minZ,
      d = Math.floor((o - 2 * a) / r) + 1,
      f = Math.min(i, (o - (d - 1) * r) / 2);
    for (let t = 0; t < d; t++) {
      let i = f + t * r;
      e.push({ prop: `lamp`, x: n + c * i, y: 0, z: s + l * i, rot: u, s: 1 });
    }
  }
}
function le(e, t, n) {
  let r = [];
  for (let i = 0; i < t; i++) {
    let a = (i / t) * Math.PI * 2 + e() * 0.5,
      o = n * (0.45 + e() * 0.55);
    r.push({
      prop: `cloud_${`abc`[i % 3]}`,
      x: Math.cos(a) * o,
      y: 30 + e() * 22,
      z: Math.sin(a) * o,
      rot: e() * Math.PI * 2,
      s: 1.6 + e() * 1.6,
      speed: 0.6 + e() * 0.7,
    });
  }
  return r;
}
var ue = {
  plaza(e, t) {
    for (let n of e.portals ?? []) {
      let e = re[n.mode];
      e &&
        (t.push({
          prop: e,
          x: n.x,
          y: 0,
          z: n.z,
          rot: n.rot,
          s: 1,
          gate: n.mode,
        }),
        t.push({
          prop: `portal_pad`,
          x: n.x,
          y: 0,
          z: n.z,
          rot: n.rot,
          s: n.r,
          gate: n.mode,
        }));
    }
  },
};
function de(e, t, n, r) {
  let { positions: i, pieces: a } = _(e),
    o = new Map();
  for (let t = 0; t < a.length; t++) {
    let n = a[t];
    if (n === 0 || e.pieces.find((e) => e.id === n)?.kind === `terrain`)
      continue;
    let r = o.get(n);
    r ||
      o.set(n, (r = { minX: 1 / 0, maxX: -1 / 0, minZ: 1 / 0, maxZ: -1 / 0 }));
    let s = i[t * 3],
      c = i[t * 3 + 2];
    ((r.minX = Math.min(r.minX, s)),
      (r.maxX = Math.max(r.maxX, s)),
      (r.minZ = Math.min(r.minZ, c)),
      (r.maxZ = Math.max(r.maxZ, c)));
  }
  let s = (t, n, r) => {
      for (let e of o.values())
        if (
          t > e.minX - r &&
          t < e.maxX + r &&
          n > e.minZ - r &&
          n < e.maxZ + r
        )
          return !0;
      return e.spawns.some(
        (e) => (e.x - t) * (e.x - t) + (e.z - n) * (e.z - n) < 36,
      );
    },
    c = { x: 0, y: 0, z: 0 },
    l = t.rect,
    u = 0;
  for (let e = l.x0 + 9 / 2; e < l.x1; e += 9)
    for (let i = l.z0 + 9 / 2; i < l.z1; i += 9) {
      let a = e + (r() - 0.5) * 9 * 0.7,
        o = i + (r() - 0.5) * 9 * 0.7;
      if (
        r() > 0.3 ||
        u >= 140 ||
        a < l.x0 + 2 ||
        a > l.x1 - 2 ||
        o < l.z0 + 2 ||
        o > l.z1 - 2 ||
        t.paint(a, o) !== `grass` ||
        (t.normal(a, o, c), c.y < 0.9945) ||
        s(a, o, 2.5)
      )
        continue;
      let d = r() < 0.3;
      (n.push({
        prop: d ? `bush` : A[Math.floor(r() * A.length)],
        x: a,
        y: t.y(a, o) - 0.05,
        z: o,
        rot: r() * Math.PI * 2,
        s: d ? 0.9 + r() * 0.5 : 0.85 + r() * 0.45,
      }),
        u++);
    }
  for (let e of t.terrain.features) {
    if (e.f !== `path` || e.plain || !(e.walk ?? 0)) continue;
    let r = m(e.path),
      i = Math.cos(e.rot ?? 0),
      a = Math.sin(e.rot ?? 0);
    for (let o = 6; o < r.length - 3; o += 18) {
      let c = p(r, o);
      for (let r of [1, -1]) {
        let o = r * (e.w / 2 + e.walk - 0.35),
          l = c.x + c.lx * o,
          u = c.z + c.lz * o,
          d = e.x + l * i + u * a,
          f = e.z - l * a + u * i;
        if (
          s(d, f, 1) ||
          t.floors.some(
            (e) =>
              d > e.rect.x0 - 1 &&
              d < e.rect.x1 + 1 &&
              f > e.rect.z0 - 1 &&
              f < e.rect.z1 + 1,
          )
        )
          continue;
        let p = e.x + c.x * i + c.z * a,
          m = e.z - c.x * a + c.z * i;
        n.push({
          prop: `lamp`,
          x: d,
          y: t.y(d, f),
          z: f,
          rot: Math.atan2(p - d, m - f),
          s: 1,
        });
      }
    }
  }
}
function fe(e) {
  let t = ie(ae(e.id)),
    n = [],
    r = g(e),
    i = oe(e);
  e.decorAuto === !1 ||
    (r
      ? de(e, r, n, t)
      : Number.isFinite(i.minX) &&
        (se(n, i, t, { count: 26, inner: 5, outer: 28 }), ce(n, i, 0.6, 14)));
  let a = (e, t) => (r ? r.y(e, t) : 0);
  for (let t of e.props ?? [])
    n.push({
      prop: t.prop,
      x: t.x,
      y: t.y ?? a(t.x, t.z),
      z: t.z,
      rot: t.rot ?? 0,
      s: t.s ?? 1,
    });
  for (let t of e.pieces)
    t.kind === `prop` &&
      n.push({
        prop: t.prop,
        x: t.x,
        y: t.y ?? a(t.x, t.z),
        z: t.z,
        rot: t.rot ?? 0,
        s: t.s ?? 1,
      });
  return (ue[e.id]?.(e, n, t), { items: n, clouds: le(t, 12, 150) });
}
