import { a as e, o as t, s as n } from "./dmath-_BI8hNwF.js";
var r = -0.3;
function i(e, t, n) {
  return t > -0.5 ? 1 + t : (e * e + n * n) / (1 - t);
}
function a(e, r, a, o, s) {
  let c = n(e),
    l = t(e),
    u = -(r * c + o * l),
    d = i(r, a, o),
    f = d > 0 ? u / d : 0;
  return ((s.x = c + r * f), (s.y = u), (s.z = l + o * f), s);
}
function o(e, t, n, r, i, a, o) {
  return (
    (o.x = t * a - n * i),
    (o.y = n * r - e * a),
    (o.z = e * i - t * r),
    o
  );
}
function s(t, n, r, a, o, s, l) {
  let u = i(a, o, s),
    d = u > 0 ? n / u : 0,
    f = t - a * d,
    p = r - s * d;
  return l + c(e(f, p) - l);
}
function c(e) {
  let t = 6.283185307179586;
  return e - t * Math.round(e / t);
}
function l(e, t, n, i, a) {
  let o = e.ux + (t - e.ux) * a,
    s = e.uy + (n - e.uy) * a,
    c = e.uz + (i - e.uz) * a,
    l = Math.sqrt(o * o + s * s + c * c);
  if (!(l < 1e-6)) {
    if (((o /= l), (s /= l), (c /= l), s < -0.3)) {
      s = r;
      let e = Math.sqrt(o * o + c * c),
        t = e > 1e-6 ? Math.sqrt(1 - s * s) / e : 0;
      ((o *= t), (c *= t));
    }
    ((e.ux = o), (e.uy = s), (e.uz = c));
  }
}
var u = {
    GROUND: 0,
    AIR: 1,
    GRIND: 2,
    MANUAL: 3,
    LIP: 4,
    WALLRIDE: 5,
    BAIL: 6,
    WALK: 7,
  },
  d = {
    OLLIE: 1,
    FLIP: 2,
    GRAB: 4,
    GRIND: 8,
    SPIN_L: 16,
    SPIN_R: 32,
    RESET: 64,
    WALK: 128,
  },
  f = { NONE: 0, U: 1, UR: 2, R: 3, DR: 4, D: 5, DL: 6, L: 7, UL: 8 },
  p = [0, 0, 1, 1, 1, 0, -1, -1, -1],
  m = [0, 1, 1, 0, -1, -1, -1, 0, 1];
function h(e, t) {
  if (e === 0 && t === 0) return f.NONE;
  for (let n = 1; n <= 8; n++) if (p[n] === e && m[n] === t) return n;
  return f.NONE;
}
var g = {
    LAUNCH: 1,
    LAND: 2,
    BAIL: 4,
    TRICK: 8,
    GRIND_START: 16,
    GRIND_END: 32,
    LIP: 64,
    MANUAL: 128,
    COMBO_LANDED: 256,
    COMBO_LOST: 512,
    PIECE: 1024,
    WALL: 2048,
    PUSH: 4096,
    SPECIAL_READY: 8192,
    OLLIE: 16384,
    RESPAWN: 32768,
    WALLRIDE: 65536,
    TRANSFER: 1 << 17,
    BOARD: 1 << 18,
    FLAIL: 1 << 19,
    TURN: 1 << 20,
  },
  _ = {
    SPINE: 1,
    OUT: 2,
    ARMED: 4,
    SLIDE: 8,
    LOST: 16,
    REVERT: 32,
    REV_L: 64,
    REV_R: 128,
  },
  v = _.REVERT | _.REV_L | _.REV_R,
  y = { NONE: 0, GRAB: 1, FLIP: 2, ANGLE: 3, SPIN: 4, BALANCE: 5 },
  b = { NONE: 0, PERFECT: 1, SLOPPY: 2 },
  x = { KEY: 0, GRASS: 1, OUT: 2 },
  S = class {
    flags = 0;
    tricks = [];
    pieces = [];
    rail = -1;
    comboScore = 0;
    comboTricks = 0;
    comboSeq = 0;
    impact = 0;
    landSpin = 0;
    grade = 0;
    bailWhy = 0;
    respawnWhy = 0;
    reset() {
      ((this.flags = 0),
        (this.tricks.length = 0),
        (this.pieces.length = 0),
        (this.rail = -1),
        (this.comboScore = 0),
        (this.comboTricks = 0),
        (this.comboSeq = 0),
        (this.impact = 0),
        (this.landSpin = 0),
        (this.grade = 0),
        (this.bailWhy = 0),
        (this.respawnWhy = 0));
    }
  };
function C(e = 0, t = 0, n = 0, r = 0) {
  return {
    x: e,
    y: t,
    z: n,
    vx: 0,
    vy: 0,
    vz: 0,
    yaw: r,
    ux: 0,
    uy: 1,
    uz: 0,
    spinVel: 0,
    simTick: 0,
    mode: u.GROUND,
    modeTick: 0,
    rolling: !1,
    crouch: 0,
    coyote: 0,
    bankTick: 0,
    airYaw0: 0,
    airFakie: !1,
    vert: !1,
    vnx: 0,
    vnz: 0,
    vd: 0,
    lipY: 0,
    airFirst: 0,
    airPiece: 0,
    xfer: 0,
    vturn: 0,
    rail: -1,
    railT: 0,
    railDir: 1,
    bal: 0,
    balVel: 0,
    balClock: 0,
    balCarry: 0,
    trickId: 0,
    trickTick: 0,
    trickEnd: 0,
    queued: 0,
    grindBuf: 0,
    taps: 0,
    lastPiece: 0,
    comboBase: 0,
    comboMult: 0,
    comboTricks: 0,
    ring0: 0,
    ring1: 0,
    ring2: 0,
    ring3: 0,
    comboSeq: 0,
    special: 0,
  };
}
export {
  o as _,
  f as a,
  u as c,
  _ as d,
  v as f,
  a as g,
  l as h,
  m as i,
  x as l,
  C as m,
  d as n,
  g as o,
  h as p,
  p as r,
  b as s,
  y as t,
  S as u,
  s as v,
};
