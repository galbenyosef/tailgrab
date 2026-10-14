// assets/scene-DiAs2bfK 01 — math
// Lines 1-347 of readable/assets/scene-DiAs2bfK.pretty.js (statement-aligned).
const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      "assets/lens-BwVvQcWW.js",
      "assets/lens-Csl3PMnC.js",
      "assets/three.core-DVWDmH0S.js",
    ]),
) => i.map((i) => d[i]);
import {
  Bt as e,
  It as t,
  L as n,
  Rt as r,
  St as i,
  U as a,
  Un as o,
  V as s,
  Vn as c,
  Vt as l,
  Wn as u,
  Zn as d,
  bt as ee,
  c as f,
  d as p,
  h as m,
  k as te,
  l as h,
  q as ne,
  vr as re,
  xt as ie,
  yr as g,
} from "./three.core-DVWDmH0S.js";
import { c as ae, r as _, s as v } from "./toon-CycGToy9.js";
import { i as y, k as oe, n as b, t as se } from "./preload-helper-DR1MrGPZ.js";
import {
  c as ce,
  i as le,
  l as ue,
  s as de,
  t as fe,
} from "./palette-DQTkVEn_.js";
import "./outline-BufNikL2.js";
var x = [`hills`, `peaks`, `mesa`, `pines`, `skyline`, `coast`],
  sceneryMarks = [
    `ferris`,
    `turbines`,
    `mast`,
    `balloons`,
    `blimp`,
    `sign`,
    `lighthouse`,
    `boats`,
  ],
  C = [`#B6E6A6`, `#A3DB9A`],
  w = 4e3,
  pe = 1e3,
  T = { sky: 0.1, stars: 0.2, apron: 0.3, water: 0.4, far: 0.5 },
  E = 1600,
  D = 1800,
  me = {
    plaza: { pool: x, face: -20 },
    warehouse: { pool: [`skyline`, `peaks`, `mesa`, `hills`], face: -40 },
    schoolyard: { pool: [`hills`, `pines`, `peaks`, `skyline`], face: -38 },
    pier: { pool: [`coast`], face: -41, sea: 90 },
    mall: { pool: [`skyline`, `peaks`, `coast`], face: -41 },
    city: { pool: [`peaks`, `hills`, `coast`, `pines`], face: -150 },
    hangar: { pool: [`mesa`, `hills`, `pines`, `peaks`], face: 133 },
    beach: { pool: [`coast`], face: -139, sea: 90 },
    bridge: { pool: [`skyline`, `coast`, `peaks`], face: -142 },
  };
function O(e) {
  return me[e] ?? { pool: x };
}
function he(e) {
  let t = O(e).pool;
  return {
    theme: t[b(`scenery`, e) % t.length],
    seed: b(`scenery-seed`, e) % 1e3,
  };
}
function ge(e, t, n) {
  if (!t.length) return null;
  let r = t.length;
  return t[(((n + b(`scenery-day`, e)) % r) + r) % r];
}
function k(e) {
  if (!e) return null;
  if (e === `off`) return `off`;
  let t = /^([a-z]+):(\d+)(?:\+([a-z,]*))?$/.exec(e);
  if (!t || !x.includes(t[1])) return null;
  let n = { theme: t[1], seed: Number(t[2]) };
  if (t[3] !== void 0) {
    let e = t[3] ? t[3].split(`,`) : [];
    if (!e.every((e) => sceneryMarks.includes(e))) return null;
    n.marks = e;
  }
  return n;
}
function _e(e) {
  return `${e.theme}:${e.seed}${e.marks ? `+${e.marks.join(`,`)}` : ``}`;
}
function ve(e, t) {
  let n = oe(e),
    r;
  if (n) r = { ...n.rect };
  else {
    r = { x0: 1 / 0, x1: -1 / 0, z0: 1 / 0, z1: -1 / 0 };
    for (let t of e.pieces)
      t.kind === `floor` &&
        ((r.x0 = Math.min(r.x0, t.x - t.w / 2)),
        (r.x1 = Math.max(r.x1, t.x + t.w / 2)),
        (r.z0 = Math.min(r.z0, t.z - t.d / 2)),
        (r.z1 = Math.max(r.z1, t.z + t.d / 2)));
    if (!(r.x0 < r.x1)) {
      let t = e.half;
      r = { x0: -t, x1: t, z0: -t, z1: t };
    }
  }
  let i = 0;
  for (let t of e.pieces)
    t.kind === `wall` && (i = Math.max(i, (t.y ?? 0) + t.h));
  let a = n
      ? (e, t) =>
          n.y(
            Math.min(Math.max(e, r.x0), r.x1),
            Math.min(Math.max(t, r.z0), r.z1),
          ) - 0.03
      : () => y,
    o = y;
  if (n) {
    for (let e = r.x0; e <= r.x1; e += 4)
      o = Math.min(o, a(e, r.z0), a(e, r.z1));
    for (let e = r.z0; e <= r.z1; e += 4)
      o = Math.min(o, a(r.x0, e), a(r.x1, e));
  }
  let s = (r.x0 + r.x1) / 2,
    c = (r.z0 + r.z1) / 2;
  return {
    id: e.id,
    rect: r,
    cx: s,
    cz: c,
    diag: Math.hypot(r.x1 - s, r.z1 - c),
    wallH: i,
    edgeY: a,
    floorY: o - 0.05,
    terrain: !!n,
    baked: t.baked,
    tiled: t.tiled,
  };
}
function ye(e, t, n) {
  return Math.max(e.x0 - t, t - e.x1, e.z0 - n, n - e.z1);
}
var A = Math.PI / 180,
  j = (e) => Math.sin(e * A),
  M = (e) => -Math.cos(e * A);
function N(e, t) {
  let n = ((((e - t) % 360) + 540) % 360) - 180;
  return n === -180 ? 180 : n;
}
function P(e, t, n) {
  let r = j(t),
    i = M(t),
    a = (e.rect.x1 - e.rect.x0) / 2,
    o = (e.rect.z1 - e.rect.z0) / 2,
    s = Math.min(
      Math.abs(r) > 1e-6 ? (n + a) / Math.abs(r) : 1 / 0,
      Math.abs(i) > 1e-6 ? (n + o) / Math.abs(i) : 1 / 0,
    );
  return { x: e.cx + r * s, z: e.cz + i * s, t: s };
}
function be(e, t) {
  let n =
    0.5 +
    0.25 * Math.sin(e * 0.061 + 1.7) * Math.cos(t * 0.047 - 0.3) +
    0.25 * Math.sin((e + t) * 0.023);
  return F(C[0], C[1], Math.max(0, Math.min(1, n)));
}
function F(e, t, n) {
  let r = parseInt(e.slice(1), 16),
    i = parseInt(t.slice(1), 16),
    a = 0;
  for (let e of [16, 8, 0]) {
    let t = (r >> e) & 255,
      o = (i >> e) & 255;
    a |= Math.round(t + (o - t) * n) << e;
  }
  return `#${a.toString(16).padStart(6, `0`).toUpperCase()}`;
}
function xe(e, t) {
  let n = parseInt(e.slice(1), 16),
    r = 0;
  for (let e of [16, 8, 0])
    r |= Math.min(255, Math.round(((n >> e) & 255) * t)) << e;
  return `#${r.toString(16).padStart(6, `0`).toUpperCase()}`;
}
function Se(e, t) {
  if (e === `mesa`) return { rho: [1, 0.93, 0.86, 0.8], y: [0, 0.42, 0.84, 1] };
  let n = [],
    r = [];
  for (let i = 0; i < t; i++) {
    let a = i / t;
    e === `peak`
      ? (n.push(1 - a), r.push(a ** 0.85))
      : (n.push(Math.cos((a * Math.PI) / 2)),
        r.push(Math.sin((a * Math.PI) / 2)));
  }
  return { rho: n, y: r };
}
function Ce(e, t, n) {
  let r = Math.cos(e.yaw),
    i = Math.sin(e.yaw);
  return { x: e.x + t * r + n * i, z: e.z - t * i + n * r };
}
function we(e, t, n) {
  let r = t - e.x,
    i = n - e.z,
    a = Math.cos(e.yaw),
    o = Math.sin(e.yaw),
    s = r * a - i * o,
    c = r * o + i * a,
    l = Math.hypot(s / e.rx, c / e.rz);
  return l >= 1
    ? -1
    : e.shape === `peak`
      ? e.h * (1 - l) ** 0.85
      : e.shape === `mesa`
        ? l < 0.8
          ? e.h
          : e.h * (1 - (l - 0.8) / 0.2)
        : e.h * Math.sqrt(1 - l * l);
}
function Te(e, t) {
  let n = j(t.bearing),
    r = M(t.bearing),
    i = P(e, t.bearing, t.d).t,
    a = (e) => t.bend * (e / 100) ** 2 + t.wave * Math.sin(e * t.k + t.phase);
  return {
    s(t, o) {
      let s = t - e.cx,
        c = o - e.cz,
        l = -s * r + c * n;
      return s * n + c * r - (i + a(l));
    },
    at(t, o) {
      let s = i + a(t) + o;
      return { x: e.cx + n * s - r * t, z: e.cz + r * s + n * t };
    },
    latMax: t.bend > 0 ? Math.min(w, 100 * Math.sqrt((w - i) / t.bend)) : w,
  };
}
var Ee = [36, 44, 54, 70, 95, 135, 200, 300, 480, 800, 1400, 2400, w];
function De(e, t) {
  return Math.max(8, (t - e) * 0.9);
}
function Oe(e) {
  return e.seg * (2 * e.rings - 1) + (e.sand ? e.seg * 2 : 0);
}
function ke(e) {
  return (e.elev.length - 1) * 4;
}
function Ae(e) {
  return e.tiers * 10 + (e.antenna ? 4 : 0);
}
function je(e) {
  return e.puffs.length * 12;
}
var Me = [0, 3, 8, 18, 40, 90, 200, 450, 1e3, 2200, w],
  I = { fog: [85, 210], tod: `day`, slab: 4 };
function L(...e) {
  return e.map((e) => {
    let t = k(e);
    if (!t || t === `off`) throw Error(`parkLook: not a scenery pin: ${e}`);
    return t;
  });
}
var Ne = {
  plaza: { slab: 5, scenery: L(`hills:1`, `peaks:1`, `skyline:1`) },
  warehouse: {
    slab: 5,
    scenery: L(
      `skyline:1`,
      `peaks:1`,
      `mesa:1`,
      `hills:1`,
      `skyline:2`,
      `peaks:2`,
    ),
  },
  schoolyard: {
    tod: `morning`,
    scenery: L(
      `pines:2`,
      `hills:2`,
      `hills:1`,
      `pines:1`,
      `peaks:1`,
      `skyline:1`,
    ),
  },
  pier: {
    tod: `evening`,
    scenery: L(
      `coast:2`,
      `coast:1`,
      `coast:3`,
      `coast:4`,
      `coast:5`,
      `coast:6`,
    ),
  },
  mall: { tod: `night`, scenery: L(`skyline:2`, `skyline:1`) },
  city: { fog: [110, 300], tod: `evening`, scenery: L(`peaks:2`, `peaks:1`) },
  hangar: {
    tod: `morning`,
    slab: 5,
    scenery: L(`peaks:1`, `mesa:2`, `hills:1`, `pines:1`, `hills:2`),
  },
  beach: {
    tod: `evening`,
    scenery: L(
      `coast:3`,
      `coast:2`,
      `coast:4`,
      `coast:5`,
      `coast:1`,
      `coast:6`,
    ),
  },
  bridge: {
    tod: `night`,
    scenery: L(
      `coast:2`,
      `skyline:2`,
      `skyline:1`,
      `peaks:1`,
      `peaks:2`,
      `coast:1`,
    ),
  },
};
function Pe(e) {
  return { ...I, scenery: [he(e)], ...Ne[e] };
}
