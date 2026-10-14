// assets/secrets-Czes5esN 01 — math
// Lines 1-253 of readable/assets/secrets-Czes5esN.pretty.js (statement-aligned).
import {
  Ot as e,
  _ as t,
  c as n,
  i as r,
  l as i,
  o as a,
  r as o,
} from "./tuning-D4mSK766.js";
import { $ as s, K as c, c as l, nt as u, t as ee } from "./table-W1plLavt.js";
import { c as d, o as f } from "./types-DM-HODfo.js";
var p = { S: 48, M: 72, L: 96 },
  m = 9999;
function h(e) {
  return `u-${e}`;
}
function g(e, t, n, r) {
  let i = p[n.size] ?? p.M,
    a = [...r].sort((e, t) => e.id - t.id);
  return {
    id: h(e),
    name: t,
    half: i / 2,
    pieces: [
      { id: 1, kind: `floor`, x: 0, z: 0, w: i, d: i, tag: !1, skin: n.floor },
      ...a,
    ],
    spawns: [
      { x: n.spawn.x, y: n.spawn.y ?? 0, z: n.spawn.z, yaw: n.spawn.yaw },
    ],
  };
}
function _(e, t) {
  return g(e, t.name, t, t.pieces);
}
var v = { MANUAL: 0, GRIND: 1, LIP: 2 };
function y(e) {
  return e === d.MANUAL
    ? v.MANUAL
    : e === d.GRIND
      ? v.GRIND
      : e === d.LIP
        ? v.LIP
        : -1;
}
var b = [0, 10, 20],
  x = [1023, 1023, 127],
  S = 27,
  C = [0.05, 0.1, 0.2, 0.35, 0.55, 0.8, 1.2],
  te = 6,
  w = (e, t) => (e.balClock >>> b[t]) & x[t];
function T(e, t, n) {
  let r = x[t] << b[t];
  e.balClock = ((e.balClock & ~r) | (Math.min(n, x[t]) << b[t])) >>> 0;
}
function E(e, t) {
  return w(e, t) * 2;
}
function D(t) {
  let r = y(t.mode);
  return 1 + (E(t, r) + t.simTick - t.modeTick) * e * n[r];
}
function O(e) {
  return (((e.balClock >>> S) & 15) / 15) * o[v.GRIND];
}
function k(e, t) {
  let n = (e.balCarry >>> (t * 10)) & 1023,
    r = n >>> 6;
  if (!r) return null;
  let i = n & 31;
  return {
    bal: (i === 31 ? 1 : i / 30) * (n & 32 ? -1 : 1),
    vel: C[(r & 7) - 1] * (r & 8 ? -1 : 1),
  };
}
function A(e, t, n, r) {
  let i = Math.abs(n),
    a = i >= 1 ? 31 : Math.min(30, Math.round(i * 30)),
    o = Math.abs(r),
    s = 0;
  for (let e = 1; e < C.length; e++)
    Math.abs(C[e] - o) < Math.abs(C[s] - o) && (s = e);
  let c = a | (n < 0 ? 32 : 0) | ((s + 1) << 6) | (r < 0 ? 512 : 0);
  e.balCarry = ((e.balCarry & ~(1023 << (t * 10))) | (c << (t * 10))) >>> 0;
}
function j(e) {
  let t = y(e.mode);
  if (t < 0 || e.comboMult === 0) return;
  let n = e.simTick - e.modeTick;
  T(e, t, w(e, t) + ((n + 1) >> 1));
  let s = o[t] * Math.max(0, 1 - n / r[t]),
    c = e.bal * a[t],
    l = e.balVel * i[t],
    u = c > 0 ? 1 : c < 0 || l < 0 ? -1 : 1;
  if (t === v.GRIND) {
    let n = Math.round((s / o[t]) * 15);
    e.balClock = ((e.balClock & -2013265921) | (n << S)) >>> 0;
  } else c += s * u;
  A(e, t, c, l === 0 ? u * C[0] : l);
}
function M(e, t, n = !1) {
  let r = k(e, t);
  if (
    (r && ((e.bal = r.bal), (e.balVel = r.vel)),
    t === v.GRIND &&
      (n && (T(e, t, w(e, t) + 30), (e.bal += O(e) * (e.bal < 0 ? -1 : 1))),
      (e.balClock = (e.balClock & -2013265921) >>> 0)),
    e.bal >= 1 || e.bal <= -1)
  ) {
    let t = e.bal < 0 ? -1 : 1;
    ((e.bal = 0.9 * t), (e.balVel = te * t));
  }
}
function N(e, t) {
  let n = y(e.mode);
  n >= 0 && T(e, n, w(e, n) + (t >> 1));
}
function P(e) {
  ((e.balClock = 0), (e.balCarry = 0));
}
function F(e, t) {
  let n = t & 7,
    r =
      n >> 1
        ? n >> 1 == 1
          ? e.ring1
          : n >> 1 == 2
            ? e.ring2
            : e.ring3
        : e.ring0;
  return (n & 1 ? r >>> 16 : r) & 65535;
}
function I(e, t, n) {
  let r = t & 7,
    i = r & 1,
    a = (e) =>
      i ? ((e & 65535) | (n << 16)) >>> 0 : ((e & 4294901760) | n) >>> 0;
  switch (r >> 1) {
    case 0:
      e.ring0 = a(e.ring0);
      break;
    case 1:
      e.ring1 = a(e.ring1);
      break;
    case 2:
      e.ring2 = a(e.ring2);
      break;
    default:
      e.ring3 = a(e.ring3);
  }
}
var L = (e) => e & 255,
  R = (e) => (e >> 8) & 15,
  z = (e) => (e >> 12) & 15,
  B = (e, t, n) => (e & 255) | ((t & 15) << 8) | ((n & 15) << 12);
function V(e, t) {
  let n = 0;
  for (let r = 0; r < 8; r++) L(F(e, r)) === t && F(e, r) !== 0 && n++;
  return n;
}
function H(e, n, r) {
  let i = V(e, n);
  return Math.floor((r * t[i < 4 ? i : 4]) / 100);
}
function U(e, t, n, r, i, a) {
  let o = H(e, t, i),
    s = B(t, n, r);
  (I(e, e.comboTricks, s),
    (e.comboTricks = (e.comboTricks + 1) & 65535),
    e.comboMult++,
    (e.comboBase += o),
    (e.bankTick = 0),
    K(e, (o >> 5) + 3, a),
    (a.flags |= f.TRICK),
    a.tricks.length < 8 && a.tricks.push(s));
}
function W(e, t, n, r, i, a) {
  (I(e, (e.comboTricks - 1 - t) & 65535, B(n, r, i)), (e.comboBase += a));
}
function G(e, t) {
  e.comboBase += t;
}
function K(e, t, n) {
  let r = e.special;
  ((e.special = Math.min(200, e.special + t)),
    r < 200 && e.special >= 200 && (n.flags |= f.SPECIAL_READY));
}
function q(e, t) {
  ((e.bankTick = 0),
    P(e),
    !(e.comboMult <= 0) &&
      ((t.flags |= f.COMBO_LANDED),
      (t.comboScore = e.comboBase * e.comboMult),
      (t.comboTricks = e.comboMult),
      (e.comboSeq = (e.comboSeq + 1) & 65535),
      (t.comboSeq = e.comboSeq),
      (e.comboBase = 0),
      (e.comboMult = 0)));
}
function J(e, t) {
  ((e.bankTick = 0),
    P(e),
    e.comboMult > 0 &&
      ((t.flags |= f.COMBO_LOST),
      (t.comboScore = e.comboBase * e.comboMult),
      (t.comboTricks = e.comboMult)),
    (e.comboBase = 0),
    (e.comboMult = 0),
    (e.special = 0));
}
function Y(e) {
  return 50 * e * (e + 1);
}
function X(e) {
  return String(e * 180);
}
function Z(e, t) {
  let n = L(e),
    r = R(e),
    i = z(e),
    a;
  return (
    n >= 200
      ? (a = t ? t(n - 200) : `Gap`)
      : c[n]?.kind === l.SPIN
        ? (a = X(r))
        : ((a = c[n]?.name ?? `?`), r > 0 && (a = `${X(r)} ${a}`)),
    i & 1 && n < 200 && c[n]?.kind !== l.SPIN && (a = `Fakie ${a}`),
    a
  );
}
var ne = Object.fromEntries(
  [
    `varginha`,
    `abominollie`,
    `chupacabra`,
    `saci`,
    `curupira`,
    `itsy`,
    `grindula`,
    `jester`,
    `sentai`,
  ].map((e, t) => [e, t]),
);
(l.FLIP,
  l.GRAB,
  l.GRIND,
  l.SLIDE,
  l.MANUAL,
  l.LIP,
  l.SPECIAL_AIR,
  l.SPECIAL_GRIND,
  l.SPECIAL_MANUAL);
