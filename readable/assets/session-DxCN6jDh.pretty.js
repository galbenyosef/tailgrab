const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      "assets/parkModel-D9KlCEyZ.js",
      "assets/parkModel-DmiMeogd.js",
      "assets/three.core-DVWDmH0S.js",
      "assets/toon-CycGToy9.js",
      "assets/palette-DQTkVEn_.js",
      "assets/preload-helper-DR1MrGPZ.js",
      "assets/dmath-_BI8hNwF.js",
      "assets/tuning-D4mSK766.js",
      "assets/prims-CECOBLSv.js",
      "assets/scene-DiAs2bfK.js",
      "assets/outline-BufNikL2.js",
      "assets/missions-eXNMrvRm.js",
      "assets/table-W1plLavt.js",
      "assets/skaters-pUdq6stw.js",
      "assets/types-DM-HODfo.js",
      "assets/parkMesh-CjoleZJz.js",
      "assets/GLTFLoader-BAb7LzOS.js",
      "assets/verlet-BVVzuOqv.js",
      "assets/decor-Tyb8Za1u.js",
      "assets/sfx-6jovSU2-.js",
      "assets/ground-ufcYH9Hx.js",
    ]),
) => i.map((i) => d[i]);
import {
  In as e,
  R as t,
  Rt as n,
  St as r,
  V as i,
  Vn as a,
  Xn as o,
  bt as s,
  c,
  d as l,
  jn as u,
  l as d,
  xt as f,
  yr as p,
} from "./three.core-DVWDmH0S.js";
import { a as m } from "./toon-CycGToy9.js";
import {
  a as h,
  c as g,
  i as _,
  l as v,
  n as y,
  o as b,
  r as x,
  s as S,
} from "./dmath-_BI8hNwF.js";
import {
  D as C,
  E as w,
  O as T,
  T as E,
  g as ee,
  k as te,
  t as ne,
  u as re,
  w as ie,
} from "./preload-helper-DR1MrGPZ.js";
import {
  At as ae,
  B as oe,
  Ct as se,
  D as ce,
  Dt as le,
  E as ue,
  G as de,
  Gt as fe,
  H as pe,
  Ht as me,
  I as he,
  J as ge,
  K as _e,
  L as ve,
  Mt as ye,
  Nt as be,
  O as xe,
  Ot as Se,
  Qt as Ce,
  Rt as we,
  S as Te,
  St as Ee,
  T as De,
  Tt as Oe,
  V as ke,
  W as Ae,
  Wt as je,
  X as Me,
  Xt as Ne,
  Y as Pe,
  Z as Fe,
  Zt as Ie,
  _t as Le,
  a as Re,
  ct as ze,
  d as Be,
  f as Ve,
  g as He,
  gt as Ue,
  h as We,
  it as Ge,
  jt as Ke,
  k as qe,
  kt as Je,
  lt as Ye,
  mt as Xe,
  n as Ze,
  nt as Qe,
  p as $e,
  qt as et,
  rt as tt,
  s as nt,
  t as rt,
  tt as it,
  u as at,
  ut as ot,
  vt as st,
  w as ct,
  wt as lt,
  x as ut,
  xt as dt,
  y as ft,
  yt as pt,
  zt as mt,
} from "./tuning-D4mSK766.js";
import { i as ht } from "./prims-CECOBLSv.js";
import { c as gt, f as _t, l as vt, p as yt } from "./scene-DiAs2bfK.js";
import {
  J as bt,
  K as D,
  _ as xt,
  c as O,
  d as St,
  f as Ct,
  g as wt,
  h as Tt,
  i as Et,
  l as Dt,
  m as Ot,
  n as kt,
  o as At,
  p as jt,
  q as Mt,
  r as Nt,
  t as Pt,
  u as Ft,
  v as It,
  y as Lt,
} from "./table-W1plLavt.js";
import {
  _ as Rt,
  a as k,
  c as A,
  d as j,
  f as zt,
  g as M,
  h as Bt,
  i as Vt,
  l as Ht,
  m as Ut,
  n as N,
  o as P,
  r as F,
  s as Wt,
  t as Gt,
  u as Kt,
  v as I,
} from "./types-DM-HODfo.js";
import { i as qt } from "./skaterView-DCMhULBk.js";
import {
  A as Jt,
  An as Yt,
  J as Xt,
  K as Zt,
  S as Qt,
  c as $t,
  f as en,
  g as tn,
  gt as nn,
  kn as rn,
  m as an,
  nt as on,
  o as sn,
  ot as cn,
  p as ln,
  r as un,
  s as dn,
  v as fn,
} from "./tagPaint-BOEtbgNi.js";
import {
  _ as pn,
  b as mn,
  c as hn,
  d as gn,
  f as _n,
  g as vn,
  h as yn,
  l as bn,
  m as L,
  n as xn,
  o as Sn,
  p as Cn,
  s as wn,
  u as Tn,
  v as En,
  x as Dn,
  y as On,
} from "./secrets-Czes5esN.js";
import { o as kn } from "./sfx-6jovSU2-.js";
import { f as An, h as jn, r as Mn } from "./skaters-pUdq6stw.js";
import { s as Nn } from "./missions-eXNMrvRm.js";
import { t as Pn } from "./parkMesh-CjoleZJz.js";
var R = Ie(),
  Fn = {
    dist: 1,
    height: 1,
    lookY: 0.9,
    floor: 0.8,
    minDist: 2.2,
    fadeAt: 2.9,
  },
  In = class {
    yaw = 0;
    pos = new p(0, 4, -8);
    shown = new p();
    pipeYaw = 0;
    pipeT = 0;
    held = !1;
    look = new p();
    lookV = new p();
    trauma = 0;
    fovKick = 0;
    t = 0;
    _f = { x: 0, y: 0, z: 0 };
    shakeEnabled = !0;
    lastVert = !1;
    vertH = NaN;
    col = null;
    pull = 1;
    floorY = 0;
    ridePiece = 0;
    closeness = 0;
    baseFov = 62;
    tune = { ...Fn };
    inited = !1;
    lookBack = !1;
    wasBack = !1;
    orbit = 0;
    addTrauma(e) {
      this.trauma = Math.min(1, this.trauma + e);
    }
    kickFov(e) {
      this.fovKick = Math.max(this.fovKick, e);
    }
    update(e, t, n, r, i) {
      this.t += i;
      let a = Math.hypot(n, r),
        o = Math.min(1, a / 14);
      if (this.inited && this.inPipe(t)) {
        this.pos.copy(this.shown);
        let a = -t.uz,
          s = t.ux;
        if (Math.hypot(a, s) > 0.3) {
          let e = Math.atan2(a, s),
            t = n * a + r * s,
            i = e - this.yaw;
          ((i -= Math.PI * 2 * Math.round(i / (Math.PI * 2))),
            (this.pipeYaw = (
              Math.abs(t) > 1 ? t < 0 : Math.abs(i) > Math.PI / 2
            )
              ? e + Math.PI
              : e));
        }
        ((this.pipeT = 0.8), (this.held = !0));
        let c = this.tune.lookY;
        (this.lookV.set(t.x + t.ux * c, t.y + t.uy * c, t.z + t.uz * c),
          this.look.lerp(this.lookV, 1 - Math.exp(-10 * i)),
          e.position.copy(this.shown),
          (this.closeness = Math.max(
            0,
            Math.min(
              1,
              (this.tune.fadeAt - this.shown.distanceTo(this.lookV)) / 1.2,
            ),
          )),
          this.finish(e, o, i));
        return;
      }
      let s = this.yaw,
        c = t.mode === A.LIP,
        l = t.mode === A.AIR && t.uy < 0.5;
      if (c)
        (M(t.yaw, t.ux, t.uy, t.uz, this._f),
          (s = Math.atan2(-this._f.z, this._f.x)),
          (this.vertH = NaN));
      else if (l && Math.hypot(t.ux, t.uz) > 0.3) {
        let e = Math.atan2(-t.ux, -t.uz);
        if (!Number.isNaN(this.vertH)) {
          let t = e - this.vertH;
          ((t -= Math.PI * 2 * Math.round(t / (Math.PI * 2))),
            (this.yaw += t),
            (s = this.yaw));
        }
        this.vertH = e;
      } else this.vertH = NaN;
      (!l &&
        !c &&
        (a > 1.5 && t.mode !== A.WALK
          ? (s = Math.atan2(n, r))
          : (M(t.yaw, t.ux, t.uy, t.uz, this._f),
            Math.hypot(this._f.x, this._f.z) > 0.3 &&
              (s = Math.atan2(this._f.x, this._f.z)))),
        this.pipeT > 0 &&
          (this.held && (this.yaw = this.pipeYaw),
          (this.pipeT -= i),
          (s = this.pipeYaw)),
        (this.held = !1));
      let u = s - this.yaw;
      u -= Math.PI * 2 * Math.round(u / (Math.PI * 2));
      let d = t.mode === A.AIR ? 2.2 : t.mode === A.GRIND ? 4 : c ? 5 : 3.5;
      ((this.yaw += u * (1 - Math.exp(-d * i))), this.inited || (this.yaw = s));
      let f = c || t.uy < 0.55 || (t.mode === A.AIR && this.lastVert);
      this.lastVert =
        t.mode === A.AIR ? this.lastVert || t.uy < 0.55 : c || t.uy < 0.55;
      let p = this.tune,
        m = (3.4 + o * 2 + (f ? 1.6 : 0)) * p.dist,
        h = (1.75 + o * 0.35 + (f ? 1.8 : 0)) * p.height,
        g = 1 - Math.exp(-(t.mode === A.AIR ? 4 : 8) * i),
        _ = g > 0 ? (i * (1 - g)) / g : 0,
        v = (this.lookBack ? this.yaw + Math.PI : this.yaw) + this.orbit,
        y = t.x - Math.sin(v) * m + n * _,
        b = t.z - Math.cos(v) * m + r * _,
        x = t.y + h;
      this.inited ||= (this.pos.set(y, x, b), !0);
      let S = this.lookBack !== this.wasBack;
      ((this.wasBack = this.lookBack),
        S && ((this.pos.x = y), (this.pos.z = b), (this.pull = 1)),
        (this.pos.x += (y - this.pos.x) * g),
        (this.pos.z += (b - this.pos.z) * g),
        (this.pos.y +=
          (x - this.pos.y) *
          (1 - Math.exp(-(t.mode === A.AIR ? 2.5 : 6) * i))));
      let C = 1 / 0;
      (this.col &&
        this.col.raySurface(t.x, t.y + 1.2, t.z, 0, 1, 0, 6, R) &&
        (C = R.py),
        this.col &&
          this.col.raySurface(
            this.pos.x,
            t.y + 1.2,
            this.pos.z,
            0,
            1,
            0,
            6,
            R,
          ) &&
          (C = Math.min(C, R.py)),
        this.pos.y > C - 0.4 && (this.pos.y = Math.max(t.y + 0.6, C - 0.4)));
      let w = Math.min(Math.max(this.pos.y, t.y) + 4, C - 0.05);
      (this.col &&
        this.col.raySurface(this.pos.x, w, this.pos.z, 0, -1, 0, 40, R) &&
        (this.floorY = R.py),
        this.pos.y < this.floorY + p.floor &&
          (this.pos.y = this.floorY + p.floor));
      let T = c ? 0 : 1.5;
      if (
        (this.lookV.set(
          t.x + Math.sin(v) * T,
          t.y + p.lookY,
          t.z + Math.cos(v) * T,
        ),
        S
          ? this.look.copy(this.lookV)
          : this.look.lerp(this.lookV, 1 - Math.exp(-10 * i)),
        e.position.copy(this.pos),
        (this.closeness = 0),
        this.col)
      ) {
        let n = t.x,
          r = t.y + 1.1,
          a = t.z,
          o = this.pos.x - n,
          s = this.pos.y - r,
          c = this.pos.z - a,
          l = Math.hypot(o, s, c),
          u = 1;
        (l > 0.01 &&
          ((o /= l),
          (s /= l),
          (c /= l),
          this.col.raySurface(n, r, a, o, s, c, l, R) &&
            (R.piece !== this.ridePiece || R.ny < 0.5) &&
            (u = (R.dist - 0.35) / l)),
          (this.pull +=
            (u - this.pull) * (u < this.pull ? 1 : 1 - Math.exp(-4 * i))));
        let d = Math.min(1, p.minDist / Math.max(l, 0.01)),
          f = Math.max(d, this.pull),
          m = this.pull < d ? (d - this.pull) * l * 0.9 : 0;
        ((f < 0.999 || m > 0) &&
          e.position.set(
            n + o * l * f,
            Math.min(r + s * l * f + m, Math.max(t.y + 0.6, C - 0.4)),
            a + c * l * f,
          ),
          (this.closeness = Math.max(
            0,
            Math.min(1, (p.fadeAt - l * f) / 1.2),
          )));
      }
      (this.shown.copy(e.position), this.finish(e, o, i));
    }
    inPipe(e) {
      return (e.mode !== A.GROUND && e.mode !== A.MANUAL) ||
        e.uy >= 0.3 ||
        !this.col
        ? !1
        : this.col.raySurface(
            e.x + e.ux * 0.6,
            e.y + e.uy * 0.6,
            e.z + e.uz * 0.6,
            0,
            1,
            0,
            4,
            R,
          ) && R.ny < 0;
    }
    finish(e, t, n) {
      this.trauma = Math.max(0, this.trauma - n * 1.6);
      let r = this.shakeEnabled ? this.trauma * this.trauma : 0;
      (r > 0 &&
        ((e.position.x +=
          (Math.sin(this.t * 47.3) + Math.sin(this.t * 23.1)) * 0.09 * r),
        (e.position.y +=
          (Math.sin(this.t * 53.7) + Math.sin(this.t * 31.9)) * 0.09 * r)),
        e.lookAt(this.look),
        (this.fovKick = Math.max(0, this.fovKick - n * 12)));
      let i = this.baseFov + t * 8 + this.fovKick;
      Math.abs(e.fov - i) > 0.05 && ((e.fov = i), e.updateProjectionMatrix());
    }
    get heading() {
      return this.yaw;
    }
  };
function Ln(e, t, n, r, i, a, o) {
  if (
    ((e.simTick = (e.simTick + 1) >>> 0),
    (Kn = i),
    (qn = a),
    (Jn = r),
    (t.held & N.OLLIE || Vt[t.dir] > 0) && (e.rolling = !0),
    (e.taps = er(e.taps)),
    e.queued & sr &&
      (e.queued = (e.queued & sr) === or ? e.queued & ~lr : e.queued - or),
    t.tapDir &&
      ((e.taps = tr(e.taps, t.tapDir)),
      (e.mode === A.AIR ||
        e.mode === A.GRIND ||
        e.mode === A.LIP ||
        e.mode === A.WALLRIDE) &&
        ur(e)),
    t.pressed & N.GRIND ? (e.grindBuf = 8) : e.grindBuf > 0 && e.grindBuf--,
    e.queued & 255 &&
      ((e.queued += 65536), ((e.queued >>> 16) & 255) > 6 && (e.queued &= lr)),
    e.coyote > 0 && e.coyote--,
    t.pressed & N.RESET)
  ) {
    (Ni(e, n, o), pr(e, t), Fi(e));
    return;
  }
  (e.special >= 200 && (r = Qn(r)),
    e.rail >= n.rails.segs.length &&
      ((e.rail = -1), (e.mode === A.GRIND || e.mode === A.LIP) && mi(e, o)),
    t.pressed & N.WALK &&
      (e.mode === A.WALK
        ? Ti(e, n, o)
        : (e.mode === A.GROUND || e.mode === A.MANUAL) && wi(e, o)));
  let s = !1,
    c = !1;
  switch (e.mode) {
    case A.GROUND:
    case A.MANUAL:
      br(e, t, n, r, o);
      break;
    case A.AIR:
      Lr(e, t, n, r, o);
      break;
    case A.GRIND:
    case A.LIP:
    case A.WALLRIDE:
      si(e, t, n, r, o);
      break;
    case A.BAIL:
      s = Si(e, n);
      break;
    case A.WALK:
      c = Oi(e, n);
  }
  for (let l = 0; l < i; l++)
    switch (e.mode) {
      case A.BAIL:
        s ? (s = Ci(e, n, a, o)) : Or(e, t, n, r, a, o);
        break;
      case A.GROUND:
      case A.MANUAL:
        Or(e, t, n, r, a, o);
        break;
      case A.AIR:
        zr(e, t, n, r, a, o);
        break;
      case A.GRIND:
        _i(e, n, a, o);
        break;
      case A.LIP:
        break;
      case A.WALLRIDE:
        vi(e, t, n, r, a, o);
        break;
      case A.WALK:
        c = ki(e, t, n, c, a);
    }
  (Mi(e, n, o), pr(e, t), Fi(e));
}
var z = { x: 0, y: 0, z: 0 },
  B = { x: 0, y: 0, z: 0 },
  Rn = { x: 0, y: 0, z: 0 },
  V = Ie(),
  H = Ie(),
  U = Ce(),
  W = Ce(),
  zn = w(),
  Bn = w(),
  G = C(),
  K = { x: 0, y: 0, z: 0 },
  Vn = { x: 0, y: 0, z: 0 },
  q = { x: 0, z: 0 },
  J = E(),
  Hn = Ut(),
  Un = new Kt(),
  Wn = {
    dir: 0,
    held: N.GRIND,
    pressed: 0,
    released: 0,
    pressDir: 0,
    tapDir: 0,
    stickX: 0,
  },
  Gn = P.GRIND_START | P.LIP | P.WALLRIDE,
  Kn = 1,
  qn = 0,
  Jn = null,
  Yn = Object.keys(Ut());
function Xn(e, t) {
  for (let n of Yn) t[n] = e[n];
  return t;
}
var Zn = new WeakMap();
function Qn(e) {
  let t = Zn.get(e);
  if (!t) {
    let n = Ee;
    ((t = {
      air: Math.fround(e.air * n.air),
      speed: Math.fround(e.speed * n.speed),
      spin: Math.fround(e.spin * n.spin),
      balance: Math.fround(e.balance * n.balance),
      specials: e.specials,
    }),
      Zn.set(e, t));
  }
  return t;
}
var $n = 3221225472;
function er(e) {
  let t = 0;
  for (let n = 0; n < 3; n++) {
    let r = (e >>> (n * 10)) & 1023;
    if (!r) continue;
    let i = Math.min(63, (r >>> 4) + 1);
    t |= ((r & 15) | (i << 4)) << (n * 10);
  }
  return (t | (e & $n)) >>> 0;
}
function tr(e, t) {
  return ((((e << 10) | (t & 15)) & 1073741823) | (e & $n)) >>> 0;
}
function nr(e, t) {
  return (e >>> (t * 10)) & 15;
}
function rr(e, t) {
  return ((e >>> (t * 10)) >>> 4) & 63;
}
function ir(e) {
  let t = F[e],
    n = Vt[e];
  return n > 0 && t === 0
    ? k.U
    : n < 0 && t === 0
      ? k.D
      : t > 0 && n === 0
        ? k.R
        : t < 0 && n === 0
          ? k.L
          : e;
}
function ar(e, t, n, r, i) {
  return ir(nr(e, 0)) !== n || ir(nr(e, 1)) !== t
    ? !1
    : rr(e, 0) <= i && rr(e, 1) - rr(e, 0) <= r;
}
var or = 1 << 24,
  sr = 1056964608,
  cr = 1073741824,
  lr = 2130706432;
function ur(e) {
  let t = ar(e.taps, k.D, k.U, 12, 0);
  (t || ar(e.taps, k.U, k.D, 12, 0)) &&
    (e.queued = (e.queued & 16777215) | (21 * or) | (t ? cr : 0));
}
function dr(e, t) {
  let n = F[t.dir],
    r = e.taps >>> 30;
  if (!n || !r || !t.tapDir || F[t.tapDir] !== n) return n ? r : 0;
  for (let t = 1; t < 3; t++) {
    let i = F[nr(e.taps, t)];
    if (i) return i === n ? r : 0;
  }
  return r;
}
function fr(e, t) {
  return (
    t.dir === k.U &&
    !(t.held & (N.FLIP | N.GRAB)) &&
    nr(e.taps, 0) === k.U &&
    rr(e.taps, 0) >= 4
  );
}
function pr(e, t) {
  let n = F[t.dir] ? Math.min(3, dr(e, t) + 1) : 0;
  e.taps = ((e.taps & 1073741823) | (n << 30)) >>> 0;
}
function Y(e) {
  return Math.sqrt(e.vx * e.vx + e.vy * e.vy + e.vz * e.vz);
}
function X(e, t) {
  (t !== e.mode && Dn(e),
    t !== A.GROUND && (e.xfer &= ~(j.SLIDE | zt)),
    (t === A.GRIND || t === A.LIP || t === A.WALLRIDE) &&
      (e.queued &= -2130706433),
    (e.mode = t),
    (e.modeTick = e.simTick));
}
function mr(e, t, n) {
  ((e.lastPiece = t),
    t && n.pieces.length < 8 && (n.pieces.push(t), (n.flags |= P.PIECE)));
}
function hr(e) {
  return e.pressDir || e.dir;
}
function gr(e) {
  return e.mode === A.AIR ? e.airFakie : _r(e);
}
function _r(e) {
  return (
    M(e.yaw, e.ux, e.uy, e.uz, z),
    e.vx * z.x + e.vy * z.y + e.vz * z.z < -0.5
  );
}
function vr(e, t, n, r) {
  if (e.special < 200) return 0;
  for (let i of t.specials)
    if (
      i.btn === n &&
      r.includes(D[i.trick].kind) &&
      ar(e.taps, i.d1, i.d2, 14, 14)
    )
      return i.trick;
  return 0;
}
function yr(e, t, n, r = !1) {
  ((e.queued &= -2130706433),
    (e.trickId = t),
    (e.trickTick = e.simTick),
    (e.trickEnd = 0));
  let i = !!gr(e) | (r ? 2 : 0);
  L(e, t, 0, i, D[t].base, n);
}
function br(e, t, n, r, i) {
  t.held & N.OLLIE && (e.crouch = Math.min(12, e.crouch + 1));
  let a = Y(e),
    o = !1;
  if (e.mode === A.GROUND) {
    if (e.xfer & j.REVERT) {
      let n = t.pressed & (N.SPIN_L | N.SPIN_R),
        r = e.xfer & (j.REV_L | j.REV_R);
      n
        ? Zr(e, (n & N.SPIN_L) !== 0, i)
        : r
          ? Zr(e, r === j.REV_L, i)
          : e.simTick - e.modeTick >= 8 && (e.xfer &= ~zt);
    } else Qr(e, t, i);
    a > 0.8 &&
      !(e.xfer & j.REVERT) &&
      (ar(e.taps, k.U, k.D, 9, 1)
        ? wr(e, Ft, i)
        : ar(e.taps, k.D, k.U, 9, 1) && wr(e, Ct, i));
  } else {
    if ((li(e, -Vt[t.dir], r, 0.85, n, i), e.mode !== A.MANUAL)) return;
    if (
      (Sn(e, D[e.trickId].perTick),
      t.pressed & (N.SPIN_L | N.SPIN_R) && $r(e, t, i),
      t.pressed & (N.FLIP | N.GRAB))
    ) {
      let n = vr(e, r, t.pressed & N.FLIP ? N.FLIP : N.GRAB, [
        O.SPECIAL_MANUAL,
      ]);
      if (n) yr(e, n, i, !0);
      else if (
        t.pressed & N.GRAB &&
        !(t.held & N.OLLIE) &&
        e.simTick - e.trickTick >= 8
      ) {
        let n = (D[e.trickId].nose ? jt : St)[1 + F[t.dir]];
        n !== e.trickId && (yr(e, n, i), (o = !0));
      }
    }
  }
  if (
    (t.pressed & (N.FLIP | N.GRAB) &&
      !o &&
      (e.queued = (t.pressed & N.FLIP ? N.FLIP : N.GRAB) | (hr(t) << 8)),
    t.pressed & N.GRIND && e.mode === A.GROUND && a > 2)
  ) {
    let t = De / Math.max(a, 1);
    if (
      (Kr(e),
      n.rails.sweep(
        e.x,
        e.y + 0.2,
        e.z,
        e.x + e.vx * t,
        e.y + 0.2 + e.vy * t,
        e.z + e.vz * t,
        0.9,
        1.2,
        0.2,
        zn,
        G,
      ) && xr(e, n, r))
    ) {
      Tr(e, r, i, ct);
      return;
    }
  }
  Sr(e, t) && Tr(e, r, i, Cr(e));
}
function xr(e, t, n) {
  let r = Xn(e, Hn),
    i = Un;
  (i.reset(), Tr(r, n, i, ct));
  for (let e = 0; e < Kn && r.mode === A.AIR; e++) zr(r, Wn, t, n, qn, i);
  (Mi(r, t, i), pr(r, Wn), Fi(r));
  for (let e = 0; !(i.flags & Gn) && r.mode === A.AIR && e < 45; e++)
    (i.reset(), Ln(r, Wn, t, Jn, Kn, qn, i));
  return (i.flags & Gn) !== 0;
}
function Sr(e, t) {
  return (
    (t.released & N.OLLIE) !== 0 &&
    (e.crouch > 0 || (t.pressed & N.OLLIE) !== 0)
  );
}
function Cr(e) {
  return _(e.crouch / 12, 0, 1);
}
function wr(e, t, n) {
  (X(e, A.MANUAL),
    (e.bal = g(e.simTick, 7) * 0.12),
    (e.balVel = 0),
    mn(e, pn.MANUAL),
    yr(e, t, n),
    (n.flags |= P.MANUAL));
}
function Tr(e, t, n, r) {
  e.mode === A.GROUND && e.bankTick && wn(e, n);
  let i = v(de, Ae, r) * t.air,
    a = !1;
  if (e.uy < 0.5 && e.mode !== A.AIR)
    ((e.vy += i * 0.35 + oe), (a = e.vy > 0), a && Er(e));
  else {
    let t = e.vx,
      n = e.vz,
      r = e.ux * 0.55,
      a = e.uy * 0.55 + 0.45,
      o = e.uz * 0.55,
      s = Math.sqrt(r * r + a * a + o * o);
    ((r /= s),
      (a /= s),
      (o /= s),
      (e.vx += r * i),
      (e.vy += a * i),
      (e.vz += o * i),
      Ur(e, t, n));
  }
  ((e.crouch = 0), (n.flags |= P.OLLIE | P.LAUNCH), Dr(e, a, t, n));
}
function Er(e) {
  let t = e.ux,
    n = e.uz,
    r = Math.sqrt(t * t + n * n) || 1;
  ((t /= r), (n /= r), (e.vnx = t), (e.vnz = n), (e.vd = t * e.x + n * e.z));
}
function Dr(e, t, n, r) {
  let i = e.mode;
  if (((e.airFakie = _r(e)), X(e, A.AIR), (e.vert = t), t)) {
    ((e.lipY = e.y), e.vy > 10.5 * n.air && (e.vy = ye * n.air));
    let t = e.vx * e.vnx + e.vz * e.vnz;
    ((e.vx -= t * e.vnx), (e.vz -= t * e.vnz));
  }
  ((e.airYaw0 = e.yaw),
    (e.airFirst = e.comboTricks),
    (e.airPiece = e.lastPiece),
    (e.xfer = 0),
    (e.vturn = 0),
    (e.spinVel = 0),
    (e.bankTick = 0),
    (e.trickId = 0),
    (e.trickEnd = 0),
    (e.rail = -1),
    (i === A.GROUND || i === A.MANUAL) && mr(e, e.lastPiece, r));
}
function Or(e, t, n, r, i, a) {
  let o = e.mode === A.BAIL,
    s = o ? 0 : F[t.dir],
    c = o ? 0 : Vt[t.dir],
    l = Y(e);
  M(e.yaw, e.ux, e.uy, e.uz, z);
  let u = e.vx * e.ux + e.vy * e.uy + e.vz * e.uz,
    d = e.vx - u * e.ux,
    f = e.vy - u * e.uy,
    p = e.vz - u * e.uz,
    m = o ? 0 : _((e.uy - Oe) / Oe, 0, 1);
  if (s) {
    let n = _(l / 17, 0, 1),
      r = v(ae, Je, n);
    (t.held & N.OLLIE && (r *= We),
      e.mode === A.MANUAL && (r *= 0.6),
      Rt(z.x, z.y, z.z, e.ux, e.uy, e.uz, Rn));
    let a = d * z.x + f * z.y + p * z.z,
      o = d * Rn.x + f * Rn.y + p * Rn.z;
    ((e.yaw -= s * r * i),
      M(e.yaw, e.ux, e.uy, e.uz, z),
      Rt(z.x, z.y, z.z, e.ux, e.uy, e.uz, Rn),
      (d += m * (a * z.x + o * Rn.x - d)),
      (f += m * (a * z.y + o * Rn.y - f)),
      (p += m * (a * z.z + o * Rn.z - p)));
  }
  let h = d * z.x + f * z.y + p * z.z,
    g = d - h * z.x,
    y = f - h * z.y,
    b = p - h * z.z;
  if (!o) {
    let n = (t.held & N.OLLIE) !== 0,
      a = (n ? Me : He) * r.speed;
    if (e.mode === A.GROUND && e.rolling && e.uy > 0.85 && c >= 0) {
      let t = h >= -0.2 ? 1 : -1,
        n = Math.abs(h);
      n < a && (h += t * Math.min(9 * (e.special >= 200 ? dt : 1) * i, a - n));
    }
    if (c < 0 && e.mode === A.GROUND && e.uy > 0.85) {
      let t = Math.abs(h),
        n = t > (e.xfer & j.SLIDE ? 3 : pt * r.speed);
      e.xfer = n ? e.xfer | j.SLIDE : e.xfer & ~j.SLIDE;
      let a = Math.min(t, (n ? 16 : 10) * i);
      h -= (h >= 0 ? 1 : -1) * a;
    } else e.xfer &= ~j.SLIDE;
    n &&
      e.uy < 0.97 &&
      e.uy > 0.2 &&
      z.y * h > 0 &&
      (h += (h > 0 ? 1 : -1) * Pe * i);
  }
  let x = v(1, ce, m);
  ((d = z.x * h + g * x), (f = z.y * h + y * x), (p = z.z * h + b * x));
  let S = _((e.uy - qe) / (le - qe), 0, 1),
    C = o ? 1 : v(f > 0 ? Ye : ze, 1, S),
    w = 17 * e.uy;
  ((d += w * e.ux * i * C),
    (f += (-17 + w * e.uy) * i * C),
    (p += w * e.uz * i * C));
  let T = 1 - (o ? (e.uy < 0.3 ? 0 : Ze) : ot) * i;
  if (
    ((d *= T), (f *= T), (p *= T), (l = Math.sqrt(d * d + f * f + p * p)), !o)
  ) {
    let t = Me * r.speed;
    if (e.uy > 0.94 && e.uy < 0.9995 && f < 0 && l > t) {
      let e = Math.max(0, 1 - (xe * (l - t) * i) / l);
      ((d *= e), (f *= e), (p *= e), (l *= e));
    } else
      e.mode === A.GROUND &&
        (c < 0 || !e.rolling) &&
        e.uy > 0.96 &&
        l < 0.5 &&
        ((d = 0), (f = 0), (p = 0), (l = 0), (e.rolling = !1));
  }
  let E = 17 * Math.min(1, r.speed);
  if (l > E) {
    let e = E / l;
    ((d *= e), (f *= e), (p *= e), (l = E));
  }
  let ee = e.x,
    te = e.y,
    ne = e.z;
  ((e.x += d * i),
    (e.y += f * i),
    (e.z += p * i),
    (e.vx = d),
    (e.vy = f),
    (e.vz = p));
  let re = e.x + e.ux * Xe,
    ie = e.y + e.uy * Xe,
    oe = e.z + e.uz * Xe;
  if (n.col.raySurface(re, ie, oe, -e.ux, -e.uy, -e.uz, 0.75, V)) {
    let t = Xe - V.dist,
      i = V.nx * e.ux + V.ny * e.uy + V.nz * e.uz,
      s = V.nx * d + V.ny * f + V.nz * p;
    if (t > 0.3 || (i < 0.7 && s < 0)) {
      ((e.x = ee),
        (e.y = te),
        (e.z = ne),
        Fr(e, -z.x * Math.sign(h || 1), 0, -z.z * Math.sign(h || 1), l, a));
      return;
    }
    if (V.ny < -0.2 && (o || !kr(e, n))) {
      o || Nr(e, r, a);
      return;
    }
    if (i < 0.7 && !o) {
      jr(e, n, r, c, a) || Nr(e, r, a);
      return;
    }
    ((e.x = V.px),
      (e.y = V.py),
      (e.z = V.pz),
      (e.ux = V.nx),
      (e.uy = V.ny),
      (e.uz = V.nz));
    let u = e.vx * e.ux + e.vy * e.uy + e.vz * e.uz,
      m = e.vx - u * e.ux,
      g = e.vy - u * e.uy,
      _ = e.vz - u * e.uz,
      v = Math.sqrt(m * m + g * g + _ * _);
    if (v > 1e-6) {
      let e = l / v;
      ((m *= e), (g *= e), (_ *= e));
    }
    ((e.vx = m),
      (e.vy = g),
      (e.vz = _),
      V.piece !== e.lastPiece && (e.lastPiece = V.piece),
      e.uy < 0.3 && Ar(e, n));
  } else if (o) return;
  else {
    jr(e, n, r, c, a) || Nr(e, r, a);
    return;
  }
  Pr(e, n, l, a);
}
function kr(e, t) {
  let n = e.uy < _e,
    r = V.px,
    i = V.py,
    a = V.pz,
    o = V.nx,
    s = V.ny,
    c = V.nz,
    l = -s * o,
    u = 1 - s * s,
    d = -s * c,
    f = Math.sqrt(l * l + u * u + d * d);
  if (f < 1e-6) return n;
  ((l /= f), (u /= f), (d /= f));
  let p = e.vx * l + e.vy * u + e.vz * d;
  if (!n && p <= 0) return !1;
  let m = Xe,
    h = pe;
  if (
    !t.col.raySurface(
      r + l * h + o * m,
      i + u * h + s * m,
      a + d * h + c * m,
      -o,
      -s,
      -c,
      m + h,
      H,
    )
  )
    return !1;
  let g = (H.px - r) * l + (H.py - i) * u + (H.pz - a) * d,
    _ = (H.px - r) * o + (H.py - i) * s + (H.pz - a) * c;
  if (
    ((h *= 2),
    !t.col.raySurface(
      r + l * h + o * m,
      i + u * h + s * m,
      a + d * h + c * m,
      -o,
      -s,
      -c,
      m + h,
      H,
    ))
  )
    return !1;
  let v = (H.px - r) * l + (H.py - i) * u + (H.pz - a) * d,
    y = (H.px - r) * o + (H.py - i) * s + (H.pz - a) * c,
    b = 2 * (g * y - v * _);
  if (!(Math.abs(b) > 1e-9)) return !1;
  let x = g * g + _ * _,
    S = v * v + y * y,
    C = (x * y - S * _) / b,
    w = (g * S - v * x) / b;
  if (w <= 0) return !1;
  let T = Math.sqrt(C * C + w * w),
    E = C * u + w * s,
    ee = 17 * Ye,
    te = n ? ke : 1;
  return p <= 0
    ? p * p >= te * ee * E
    : p * p - 2 * ee * (E + T) >= te * ee * T;
}
function Ar(e, t) {
  let n = e.ux,
    r = e.uz;
  if (
    !t.col.raySurface(
      e.x + n * 0.25,
      e.y + 0.3,
      e.z + r * 0.25,
      0,
      -1,
      0,
      0.6,
      H,
    ) ||
    H.ny < 0.7
  )
    return;
  M(e.yaw, e.ux, e.uy, e.uz, z);
  let i = e.vx * z.x + e.vy * z.y + e.vz * z.z >= 0 ? 1 : -1;
  ((e.x = H.px),
    (e.y = H.py),
    (e.z = H.pz),
    (e.ux = H.nx),
    (e.uy = H.ny),
    (e.uz = H.nz));
  let a = e.vx * e.ux + e.vy * e.uy + e.vz * e.uz;
  ((e.vx -= a * e.ux), (e.vy -= a * e.uy), (e.vz -= a * e.uz));
  let o = Y(e);
  e.yaw =
    o > 0.5
      ? I(
          (i * e.vx) / o,
          (i * e.vy) / o,
          (i * e.vz) / o,
          e.ux,
          e.uy,
          e.uz,
          e.yaw,
        )
      : I(n, 0, r, e.ux, e.uy, e.uz, e.yaw);
}
function jr(e, t, n, r, i) {
  if (e.mode !== A.GROUND || e.uy < 0.85) return !1;
  let a = Math.sqrt(e.vx * e.vx + e.vz * e.vz);
  if (
    a < 0.001 ||
    !t.rails.nearestCoping(
      e.x,
      e.y,
      e.z,
      0.5,
      0.3,
      0.3,
      e.vx / a,
      e.vz / a,
      0,
      J,
    )
  )
    return !1;
  let o = J.nx,
    s = J.nz,
    c = e.vx * o + e.vz * s;
  if (
    c < 0.3 ||
    !t.col.raySurface(
      J.px + o * 0.5,
      J.py - 0.35,
      J.pz + s * 0.5,
      -o,
      0,
      -s,
      1,
      H,
    ) ||
    H.ny > 0.9
  )
    return !1;
  M(e.yaw, e.ux, e.uy, e.uz, z);
  let l = e.vx * z.x + e.vz * z.z >= 0 ? 1 : -1,
    u = -s,
    d = o,
    f = e.vx * u + e.vz * d;
  if (r > 0 && c >= 2 && c >= a * 0.7) {
    let t = Math.min(c, ft);
    return (
      (e.vx = u * f + o * t),
      (e.vy = -Math.max(2.5, 0.8 * c)),
      (e.vz = d * f + s * t),
      Nr(e, n, i),
      !0
    );
  }
  return (
    Mr(e, u * f, -Math.max(2.5, 0.8 * c), d * f, l),
    mr(e, H.piece, i),
    !0
  );
}
function Mr(e, t, n, r, i) {
  ((e.x = H.px),
    (e.y = H.py),
    (e.z = H.pz),
    (e.ux = H.nx),
    (e.uy = H.ny),
    (e.uz = H.nz));
  let a = t * e.ux + n * e.uy + r * e.uz;
  ((t -= a * e.ux),
    (n -= a * e.uy),
    (r -= a * e.uz),
    (e.vx = t),
    (e.vy = n),
    (e.vz = r));
  let o = Y(e);
  e.yaw = I((i * t) / o, (i * n) / o, (i * r) / o, e.ux, e.uy, e.uz, e.yaw);
}
function Nr(e, t, n) {
  let r = e.uy < 0.3 && e.uy >= -0.2 && e.vy > 0;
  (r && Er(e),
    e.mode === A.GROUND && e.bankTick && wn(e, n),
    (n.flags |= P.LAUNCH),
    Dr(e, r, t, n),
    (e.coyote = 5));
}
function Pr(e, t, n, r) {
  for (let i = 0; i < 2; i++) {
    let a = i ? at : Ve,
      o = i ? Be : $e;
    ((K.x = e.x + e.ux * a),
      (K.y = e.y + e.uy * a),
      (K.z = e.z + e.uz * a),
      t.col.sphereWalls(K, o, e.ux, e.uy, e.uz, U) &&
        ((e.x += U.dx),
        (e.y += U.dy),
        (e.z += U.dz),
        Fr(e, U.nx, U.ny, U.nz, n, r)));
  }
}
function Fr(e, t, n, r, i, a) {
  let o = -(e.vx * t + e.vy * n + e.vz * r);
  if (o <= 0) return;
  ((a.flags |= P.WALL), (a.impact = Math.max(a.impact, o)));
  let s = o > i * 0.8;
  e.mode !== A.BAIL && o > 10 && s && Ir(e, a);
  let c = s && e.mode !== A.BAIL,
    l = c ? 1 + et : 1;
  if (
    ((e.vx += t * o * l),
    (e.vy += n * o * l),
    (e.vz += r * o * l),
    (e.vx *= 0.85),
    (e.vy *= 0.85),
    (e.vz *= 0.85),
    e.mode === A.GROUND || e.mode === A.MANUAL)
  ) {
    let i = Y(e);
    if (i > 0.3)
      e.yaw = I(e.vx / i, e.vy / i, e.vz / i, e.ux, e.uy, e.uz, e.yaw);
    else if (c) e.yaw = I(t, n, r, e.ux, e.uy, e.uz, e.yaw);
    else {
      M(e.yaw, e.ux, e.uy, e.uz, z);
      let i = z.x * t + z.y * n + z.z * r,
        a = z.x - i * t,
        o = z.y - i * n,
        s = z.z - i * r,
        c = Math.sqrt(a * a + o * o + s * s);
      c > 0.001 && (e.yaw = I(a / c, o / c, s / c, e.ux, e.uy, e.uz, e.yaw));
    }
  }
}
function Ir(e, t) {
  (e.mode === A.MANUAL && (X(e, A.GROUND), (e.trickId = 0)),
    wn(e, t),
    (t.flags |= P.FLAIL));
}
function Lr(e, t, n, r, i) {
  let a = e.simTick,
    o = e.trickId ? D[e.trickId] : null;
  if (
    t.released & N.OLLIE &&
    e.coyote > 0 &&
    e.comboTricks === e.airFirst &&
    e.crouch > 0
  ) {
    e.coyote = 0;
    let t = v(de, Ae, Cr(e)) * r.air;
    (e.vy < 0 && (e.vy = 0),
      e.vert
        ? (e.vy = Math.max(e.vy, Math.min(ye * r.air, e.vy + t * 0.35 + oe)))
        : (e.vy += t),
      (e.crouch = 0),
      (i.flags |= P.OLLIE));
  } else
    ((t.pressed & N.OLLIE && e.vert && e.vy > 0 && e.crouch === 0 && !e.xfer) ||
      (e.vert &&
        e.vy > 0 &&
        !e.xfer &&
        e.simTick - e.modeTick < 6 &&
        fr(e, t))) &&
      (e.xfer = j.ARMED);
  (e.xfer === j.ARMED && (!e.vert || e.vy <= 0 ? (e.xfer = 0) : Vr(e, n, i)),
    t.held & N.OLLIE || (e.crouch = 0));
  let s = t.pressed & (N.SPIN_L | N.SPIN_R);
  if (s && e.vert && e.vy <= 0) {
    let t = 4 * Se;
    e.y - e.lipY <= -e.vy * t + 8.5 * t * t &&
      (e.xfer =
        (e.xfer & ~(j.REV_L | j.REV_R)) | (s & N.SPIN_L ? j.REV_L : j.REV_R));
  }
  o &&
    o.kind === O.GRAB &&
    e.trickEnd === 0 &&
    (t.held & N.GRAB
      ? a - e.trickTick > o.ticks && Sn(e, o.perTick)
      : (e.trickEnd = a));
  let c =
      o !== null &&
      (o.kind === O.FLIP || o.kind === O.SPECIAL_AIR) &&
      a < e.trickTick + o.ticks,
    l =
      o !== null &&
      o.kind === O.GRAB &&
      (e.trickEnd === 0 || a < e.trickEnd + 3),
    u = c || l,
    d = t.pressed & (N.FLIP | N.GRAB);
  if (d) {
    let n = d & N.FLIP ? N.FLIP : N.GRAB,
      s = vr(e, r, n, [O.SPECIAL_AIR]);
    if (n === N.FLIP && o && c && Pt[e.trickId] && a - e.trickTick <= 8) {
      let t = Pt[e.trickId],
        n = yn(e, (e.comboTricks - 1) & 65535);
      (Cn(e, 0, t, 0, hn(n), D[t].base - D[bn(n)].base),
        (e.trickId = t),
        (i.flags |= P.TRICK),
        i.tricks.length < 8 && i.tricks.push(_n(t, 0, hn(n))));
    } else
      s && !u
        ? yr(e, s, i, !0)
        : u
          ? (e.queued = (e.queued & lr) | n | (hr(t) << 8))
          : Rr(e, n, hr(t), i);
  } else if (e.queued & 255 && !u) {
    let t = e.queued & 255,
      n = (e.queued >> 8) & 255;
    ((e.queued = 0), Rr(e, t, n, i));
  }
}
function Rr(e, t, n, r) {
  let i = t === N.FLIP ? kt[n] : Nt[n];
  if (t === N.GRAB && e.trickId && D[e.trickId].kind === O.GRAB) {
    ((e.trickId = i),
      (e.trickTick = e.simTick),
      (e.trickEnd = 0),
      (e.queued &= -2130706433));
    return;
  }
  yr(e, i, r);
}
function zr(e, t, n, r, i, a) {
  if (((e.vy -= 17 * i), e.vert)) {
    e.y > e.lipY - 1.5 && Br(e, n);
    let t = e.vx * e.vnx + e.vz * e.vnz;
    ((e.vx -= t * e.vnx), (e.vz -= t * e.vnz));
    let r = e.vnx * e.x + e.vnz * e.z - (e.vd + be);
    ((e.x -= e.vnx * r * 0.5),
      (e.z -= e.vnz * r * 0.5),
      e.vy < 0 &&
        e.y < e.lipY - 0.4 &&
        !n.col.raySurface(
          e.x + e.vnx * 0.3,
          e.y,
          e.z + e.vnz * 0.3,
          -e.vnx,
          0,
          -e.vnz,
          1.2,
          H,
        ) &&
        ((e.vert = !1), (e.xfer = j.LOST)));
  }
  let o =
    e.xfer & (j.REV_L | j.REV_R)
      ? 0
      : (t.held & N.SPIN_L ? 1 : 0) - (t.held & N.SPIN_R ? 1 : 0);
  if ((!o && dr(e, t) >= 3 && (o = -F[t.dir]), o)) {
    let t = o * lt * r.spin - e.spinVel,
      n = 70 * i;
    e.spinVel += t > n ? n : t < -n ? -n : t;
  } else e.spinVel = 0;
  e.yaw += e.spinVel * i;
  let s = D[e.trickId];
  if (s?.spinHalves && e.simTick - e.trickTick < s.ticks) {
    let t = ((s.spinHalves * y) / s.ticks) * (i / Se);
    ((e.yaw += t), (e.airYaw0 += t));
  }
  if (e.vert) Bt(e, e.vnx, 0, e.vnz, Ke);
  else if (!(e.xfer & j.LOST)) {
    let t = Y(e),
      r = 0,
      i = 1,
      a = 0;
    (((t > 1 &&
      n.col.raySurface(
        e.x,
        e.y + 0.3,
        e.z,
        e.vx / t,
        e.vy / t,
        e.vz / t,
        6,
        H,
      ) &&
      H.ny > 0.2) ||
      (n.col.raySurface(e.x, e.y + 0.3, e.z, 0, -1, 0, 25, H) && H.ny > 0.2)) &&
      ((r = H.nx), (i = H.ny), (a = H.nz)),
      Bt(e, r, i, a, rt));
  }
  let c = e.x,
    l = e.y,
    u = e.z;
  if (
    ((e.x += e.vx * i),
    (e.y += e.vy * i),
    (e.z += e.vz * i),
    Kr(e),
    e.rail >= 0 && e.simTick - e.modeTick < 10)
  ) {
    let t = n.rails.segs[e.rail],
      r = _(e.railT, 0, t.len);
    ((G.chain = t.chain),
      (G.x = t.ax + t.tx * r),
      (G.y = t.ay + t.ty * r),
      (G.z = t.az + t.tz * r),
      (G.r = it));
  }
  if (
    (e.grindBuf > 0 || t.held & N.GRIND) &&
    e.simTick - e.modeTick > 1 &&
    qr(e, n, c, l, u)
  ) {
    let i = n.rails.segs[zn.seg];
    if (
      i.kind === ht.COPING &&
      e.vert &&
      e.grindBuf > 0 &&
      e.vy > -6 &&
      Math.abs(e.vx * i.tx + e.vz * i.tz) < 2.5
    ) {
      ai(e, i, zn.t, t, a);
      return;
    }
    if (i.kind !== ht.COPING || !e.vert || e.vy <= 0 || e.grindBuf > 0) {
      ii(e, n, i, zn.t, t, r, a);
      return;
    }
  }
  let d = e.x - c,
    f = e.y - l,
    p = e.z - u,
    m = Math.sqrt(d * d + f * f + p * p),
    h = Y(e),
    g = !1;
  if (
    m > 1e-6 &&
    n.col.raySurface(c, l, u, d / m, f / m, p / m, m + 0.02, V) &&
    V.ny > -0.05 &&
    V.nx * e.vx + V.ny * e.vy + V.nz * e.vz < 0.1 * h
  ) {
    if (V.ny >= 0.3 || e.vert || Wr(n)) g = !0;
    else {
      Gr(e, a);
      return;
    }
  } else
    e.simTick - e.modeTick > 1 &&
      n.col.raySurface(
        e.x + e.ux * 0.35,
        e.y + e.uy * 0.35,
        e.z + e.uz * 0.35,
        -e.ux,
        -e.uy,
        -e.uz,
        0.4,
        V,
      ) &&
      V.ny > -0.05 &&
      V.nx * e.vx + V.ny * e.vy + V.nz * e.vz < 0.1 * h &&
      V.nx * e.ux + V.ny * e.uy + V.nz * e.uz > 0.3 &&
      (V.ny >= 0.3 || e.vert) &&
      (g = !0);
  if (g) {
    Yr(e, n, a);
    return;
  }
  for (let r = 0; r < 2; r++) {
    let i = r ? at : Ve,
      o = r ? Be : $e;
    if (
      ((K.x = e.x + e.ux * i),
      (K.y = e.y + e.uy * i),
      (K.z = e.z + e.uz * i),
      !n.col.sphereWalls(K, o, 0, 1, 0, U))
    )
      continue;
    let s = Math.sqrt(U.nx * U.nx + U.nz * U.nz),
      c = Math.sqrt(e.vx * e.vx + e.vz * e.vz),
      l = c > 0 ? Math.abs(e.vx * U.nx + e.vz * U.nz) / (c * (s || 1)) : 1;
    if (
      (e.grindBuf > 0 || t.held & N.GRIND) &&
      s > 0.9 &&
      c > 3.5 &&
      l < 0.75 &&
      !e.vert &&
      !(U.surf & Ne.RAIL)
    ) {
      let t = U.nx / s,
        r = U.nz / s,
        i = Jr(n, o, t, r);
      if (
        !(i && i === e.airPiece && t * e.vnx + r * e.vnz > 0.9) &&
        bi(n, i ? H.px : e.x + U.dx, e.y, i ? H.pz : e.z + U.dz, t, r)
      ) {
        ((e.x += U.dx), (e.z += U.dz), oi(e, t, r, i, a));
        return;
      }
    }
    ((e.x += U.dx), (e.y += U.dy), (e.z += U.dz));
    let u = -(e.vx * U.nx + e.vy * U.ny + e.vz * U.nz);
    if (u > 0) {
      let t = e.vx,
        n = e.vz;
      ((e.vx += U.nx * u),
        (e.vy += U.ny * u),
        (e.vz += U.nz * u),
        Ur(e, t, n),
        (a.flags |= P.WALL),
        (a.impact = Math.max(a.impact, u)));
    }
  }
}
function Br(e, t) {
  if (
    !t.rails.nearestCoping(e.x, e.y, e.z, 1.2, 1.5, 6, e.vnx, e.vnz, 0.866, J)
  )
    return;
  let n = e.vnx,
    r = e.vnz;
  Hr(e, J.nx, J.nz) &&
    ((e.vd = J.nx * J.px + J.nz * J.pz),
    (e.vnx - n) * e.vx + (e.vnz - r) * e.vz > 0 &&
      (e.vturn += Math.abs(h(n * e.vnz - r * e.vnx, n * e.vnx + r * e.vnz))));
}
function Vr(e, t, n) {
  if (
    !t.rails.nearestCoping(e.x, e.y, e.z, 1.2, 0.5, 6, e.vnx, e.vnz, 0.866, J)
  )
    return;
  let r = J.nx,
    i = J.nz;
  if (t.rails.segs[J.seg].flags & ie.SPINE) {
    ((e.vnx = -r),
      (e.vnz = -i),
      (e.vd = t.col.raySurface(
        J.px - r * 0.6,
        J.py - 0.3,
        J.pz - i * 0.6,
        r,
        0,
        i,
        1,
        H,
      )
        ? -(r * H.px + i * H.pz)
        : -(r * J.px + i * J.pz)));
    let a = -r * 0.3,
      o = -i * 0.3,
      s = Math.sqrt(a * a + 1 + o * o);
    ((e.ux = a / s),
      (e.uy = 1 / s),
      (e.uz = o / s),
      (e.xfer = j.SPINE),
      (n.flags |= P.TRANSFER));
    return;
  }
  if (e.y < J.py + 0.25) return;
  ((e.vert = !1), (e.vx -= r * 2), (e.vz -= i * 2));
  let a = Math.sqrt(e.vx * e.vx + e.vz * e.vz);
  if (a > 0.5) {
    let t = S(e.yaw),
      n = b(e.yaw),
      r = e.vx / a,
      i = e.vz / a;
    r * t + i * n < 0 && ((r = -r), (i = -i));
    let o = h(r * n - i * t, r * t + i * n);
    ((e.yaw += o), (e.airYaw0 += o));
  }
  ((e.xfer = j.OUT), (n.flags |= P.TRANSFER));
}
function Hr(e, t, n) {
  let r = t * e.vnz - n * e.vnx;
  if (r < 1e-6 && r > -1e-6) return !1;
  let i = t * e.vnx + n * e.vnz,
    a = e.vx,
    o = e.vz;
  ((e.vx = a * i + o * r),
    (e.vz = -a * r + o * i),
    (a = e.ux),
    (o = e.uz),
    (e.ux = a * i + o * r),
    (e.uz = -a * r + o * i));
  let s = h(r, i);
  return ((e.yaw += s), (e.airYaw0 += s), (e.vnx = t), (e.vnz = n), !0);
}
function Ur(e, t, n) {
  if (e.vert || e.vx * e.vx + e.vz * e.vz < 1) return;
  t * t + n * n < 1 && ((t = S(e.yaw)), (n = b(e.yaw)));
  let r = h(e.vx * n - e.vz * t, e.vx * t + e.vz * n);
  (r > 3.141592653589793 / 2
    ? (r -= y)
    : r < -3.141592653589793 / 2 && (r += y),
    (e.yaw += r),
    (e.airYaw0 += r));
}
function Wr(e) {
  let t = Math.sqrt(V.nx * V.nx + V.nz * V.nz);
  return (
    t > 0.5 &&
    e.rails.nearestCoping(
      V.px,
      V.py,
      V.pz,
      0.5,
      3,
      0.05,
      V.nx / t,
      V.nz / t,
      0.866,
      J,
    )
  );
}
function Gr(e, t) {
  ((e.x = V.px + V.nx * $e),
    (e.y = V.py + V.ny * $e),
    (e.z = V.pz + V.nz * $e));
  let n = -(e.vx * V.nx + e.vy * V.ny + e.vz * V.nz);
  if (n > 0) {
    let r = e.vx,
      i = e.vz;
    ((e.vx += V.nx * n),
      (e.vy += V.ny * n),
      (e.vz += V.nz * n),
      Ur(e, r, i),
      (t.flags |= P.WALL),
      (t.impact = Math.max(t.impact, n)));
  }
}
function Kr(e) {
  ((G.chain = -1),
    (G.r = 0),
    (G.vx = e.vx),
    (G.vy = e.vy),
    (G.vz = e.vz),
    (G.ramp = e.mode === A.AIR && e.vert ? e.airPiece : -1));
}
function qr(e, t, n, r, i) {
  if (!t.rails.sweep(n, r, i, e.x, e.y, e.z, 0.55, 0.35, 0.9, zn, G)) return !1;
  if (
    t.rails.segs[zn.seg].piece !== e.airPiece ||
    e.rail >= 0 ||
    e.vert ||
    e.vy <= -1.5
  )
    return !0;
  let a = e.vy > 0 ? e.vy / 17 : 0;
  return (
    (G.ramp = e.airPiece),
    t.rails.sweep(
      n,
      r,
      i,
      e.x + e.vx * a,
      e.y + e.vy * a * 0.5,
      e.z + e.vz * a,
      0.55,
      0.6,
      0,
      Bn,
      G,
    )
      ? t.rails.sweep(n, r, i, e.x, e.y, e.z, Ge, tt, Fe, zn, G)
      : ((G.ramp = -1), !0)
  );
}
function Jr(e, t, n, r) {
  return e.col.raySurface(K.x + n * 0.5, K.y, K.z + r * 0.5, -n, 0, -r, 1, H) ||
    e.col.raySurface(
      K.x + n * 0.5,
      K.y - t * 0.9,
      K.z + r * 0.5,
      -n,
      0,
      -r,
      1,
      H,
    )
    ? H.piece
    : 0;
}
function Yr(e, t, n) {
  let r = V.nx,
    i = V.ny,
    a = V.nz,
    o = e.ux * r + e.uy * i + e.uz * a;
  M(e.yaw, e.ux, e.uy, e.uz, z);
  let s = z.x * r + z.y * i + z.z * a,
    c = z.x - s * r,
    l = z.y - s * i,
    u = z.z - s * a,
    d = Math.sqrt(c * c + l * l + u * u) || 1;
  ((c /= d), (l /= d), (u /= d));
  let f = e.vx * r + e.vy * i + e.vz * a,
    p = e.vx - f * r,
    m = e.vy - f * i,
    h = e.vz - f * a,
    g = Math.sqrt(p * p + m * m + h * h),
    y = -f,
    x = o > 0.57 || (!e.vert && e.uy > 0.5),
    C = x ? Gt.NONE : Gt.ANGLE,
    w = 1,
    T = -1;
  if (g > 1) {
    let t = (c * p + l * m + u * h) / g,
      n = v(ve, he, _((g - 3) / (He - 3), 0, 1));
    if (((T = Math.abs(t)), (w = t >= 0 ? 1 : -1), e.vert)) {
      let t = -p * e.vnz + h * e.vnx,
        n = p + t * e.vnz,
        r = h - t * e.vnx,
        i = Math.sqrt(n * n + m * m + r * r);
      T =
        i <= 1
          ? -1
          : Math.max(
              T,
              Math.abs(c * n + l * m + u * r) / i,
              Math.abs(c * p - l * m + u * h) / g,
            );
    } else {
      let t = Math.sqrt(e.vx * e.vx + e.vz * e.vz),
        n = t > 1 ? (S(e.yaw) * e.vx + b(e.yaw) * e.vz) / t : 0;
      Math.abs(n) > T && ((T = Math.abs(n)), (w = n >= 0 ? 1 : -1));
    }
    x && T >= 0 && T <= n && ((x = !1), (C = Gt.SPIN));
  }
  let E = e.trickId ? D[e.trickId] : null;
  E &&
    ((E.kind === O.FLIP || E.kind === O.SPECIAL_AIR) &&
      e.simTick + 4 < e.trickTick + E.ticks &&
      ((x = !1), (C = Gt.FLIP)),
    E.kind === O.GRAB && e.trickEnd === 0 && ((x = !1), (C = Gt.GRAB)));
  let ee = ei(e),
    te = e.queued & sr && !e.vert ? (e.queued & cr ? Ct : Ft) : 0,
    ne = e.vert,
    re = e.vert ? e.xfer & (j.REV_L | j.REV_R) : 0;
  if (
    ((e.x = V.px),
    (e.y = V.py),
    (e.z = V.pz),
    (e.ux = r),
    (e.uy = i),
    (e.uz = a),
    (e.vert = !1),
    (e.spinVel = 0),
    (n.impact = Math.max(n.impact, y)),
    !x)
  ) {
    ((e.vx = p), (e.vy = m), (e.vz = h), (n.bailWhy = C), xi(e, n));
    return;
  }
  if (g > 1) {
    let t = w / g;
    e.yaw = I(p * t, m * t, h * t, r, i, a, e.yaw);
  } else e.yaw = I(c, l, u, r, i, a, e.yaw);
  ((e.vx = p),
    (e.vy = m),
    (e.vz = h),
    ti(e, ee, n),
    ni(e, t, V.piece, n),
    e.xfer & j.SPINE
      ? L(e, Lt, 0, 0, D[Lt].base, n)
      : e.vturn >= 0.45 && L(e, At, 0, 0, D[At].base, n),
    (e.xfer = 0),
    (e.vturn = 0),
    ee >= 2 &&
      T >= 0 &&
      (T >= 0.985
        ? (Sn(e, ge), (n.grade = Wt.PERFECT))
        : T < 0.707 &&
          e.comboBase > 750 &&
          (Sn(e, -500), (n.grade = Wt.SLOPPY))),
    mr(e, V.piece, n),
    (e.trickId = 0),
    (e.queued = 0),
    (n.flags |= P.LAND),
    (n.landSpin = ee),
    te
      ? wr(e, te, n)
      : (X(e, A.GROUND),
        ne ? Xr(e, re) : e.comboMult > 0 && (e.bankTick = e.simTick + 4)));
}
function Xr(e, t) {
  ((e.xfer = (e.xfer & ~zt) | j.REVERT | t),
    e.comboMult > 0 && (e.bankTick = e.simTick + 8));
}
function Zr(e, t, n) {
  ((e.xfer &= ~zt),
    (e.yaw += t ? y : -y),
    L(e, wt, 0, 0, D[wt].base, n),
    e.comboMult > 0 && (e.bankTick = e.simTick + 10));
}
function Qr(e, t, n) {
  let r = e.xfer & (j.REV_L | j.REV_R);
  if (!r) {
    let n = t.pressed & (N.SPIN_L | N.SPIN_R);
    n && (e.xfer = (e.xfer & -8) | (n & N.SPIN_L ? j.REV_L : j.REV_R));
    return;
  }
  let i = (e.xfer & 7) + 1;
  if (t.held & (r === j.REV_L ? N.SPIN_L : N.SPIN_R)) {
    e.xfer = i > 7 ? e.xfer & ~(zt | 7) : (e.xfer & -8) | i;
    return;
  }
  ((e.xfer &= ~(zt | 7)),
    !((t.held | t.released) & N.OLLIE) &&
      ((e.yaw += r === j.REV_L ? y : -y), (n.flags |= P.TURN)));
}
function $r(e, t, n) {
  if (e.simTick - e.trickTick < 9) return;
  ((e.yaw += t.pressed & N.SPIN_L ? y : -y),
    e.mode === A.MANUAL && ((e.bal = -e.bal), (e.balVel = -e.balVel)),
    En(e, 30),
    (e.trickTick = e.simTick));
  let r = e.mode === A.MANUAL && !bt(e.trickId) ? Ot : Tt;
  L(e, r, 0, 0, D[r].base, n);
}
function ei(e) {
  let t = Math.abs(e.yaw - e.airYaw0);
  return Math.floor((t + se) / y);
}
function ti(e, t, n) {
  if (t <= 0) return;
  let r = vn(t);
  if (e.comboTricks !== e.airFirst) {
    let n = e.airFirst & 65535,
      i = yn(e, n),
      a = (e.comboTricks - 1 - n) & 65535;
    a < 8 ? Cn(e, a, bn(i), Math.min(t, 15), hn(i), r) : Sn(e, r);
  } else L(e, It, Math.min(t, 15), +!!gr(e), r, n);
}
function ni(e, t, n, r) {
  let i = t.layout.gaps;
  if (i && e.airPiece && n)
    for (let t = 0; t < i.length; t++) {
      let a = i[t];
      if (a.from.includes(e.airPiece) && a.to.includes(n)) {
        L(e, 200 + t, 0, 0, a.points, r);
        return;
      }
    }
}
function ri(e, t) {
  let n = e.ty,
    r = -n * e.tx,
    i = 1 - n * e.ty,
    a = -n * e.tz,
    o = Math.sqrt(r * r + i * i + a * a) || 1;
  return ((t.x = r / o), (t.y = i / o), (t.z = a / o), t);
}
function ii(e, t, n, r, i, a, o) {
  let s = ei(e),
    c = e.rail >= 0 && t.rails.segs[e.rail].chain === n.chain;
  M(e.yaw, e.ux, e.uy, e.uz, z);
  let l = Math.sqrt(z.x * z.x + z.z * z.z) || 1,
    u =
      (z.x * n.tx + z.z * n.tz) /
      l /
      (Math.sqrt(n.tx * n.tx + n.tz * n.tz) || 1),
    d = Math.abs(u) < 0.64,
    f = e.vx * n.tx + e.vy * n.ty + e.vz * n.tz;
  ((e.railDir = Math.abs(f) > 0.3 ? (f > 0 ? 1 : -1) : u >= 0 ? 1 : -1),
    Math.abs(f) <= 0.3 &&
      (e.railDir > 0 ? n.next < 0 && n.len - r < 0.3 : n.prev < 0 && r < 0.3) &&
      (e.railDir = -e.railDir));
  let p = Math.sqrt(e.vx * e.vx + e.vz * e.vz),
    m = Math.max(Math.abs(f), p * 0.55, ue),
    h = i.pressDir || i.dir,
    v = d ? xt[h] : Et[h],
    y = !1,
    b = vr(e, a, N.GRIND, [O.SPECIAL_GRIND]);
  (b && ((v = b), (y = !0)),
    ti(e, s, o),
    ni(e, t, n.piece, o),
    X(e, A.GRIND),
    (e.grindBuf = 0),
    (e.rail = n.id),
    (e.railT = _(r, 0, n.len)),
    (e.x = n.ax + n.tx * e.railT),
    (e.y = n.ay + n.ty * e.railT),
    (e.z = n.az + n.tz * e.railT),
    ri(n, B),
    (e.ux = B.x),
    (e.uy = B.y),
    (e.uz = B.z));
  let x, S, C;
  if (d) {
    let e = B.y * n.tz - B.z * n.ty,
      t = B.z * n.tx - B.x * n.tz,
      r = B.x * n.ty - B.y * n.tx;
    (e * z.x + t * z.y + r * z.z < 0 && ((e = -e), (t = -t), (r = -r)),
      (x = e),
      (S = t),
      (C = r));
  } else {
    let e = u >= 0 ? 1 : -1;
    ((x = n.tx * e), (S = n.ty * e), (C = n.tz * e));
  }
  ((e.yaw = I(x, S, C, e.ux, e.uy, e.uz, e.yaw)),
    (e.vx = n.tx * e.railDir * m),
    (e.vy = n.ty * e.railDir * m),
    (e.vz = n.tz * e.railDir * m),
    (e.spinVel = 0),
    (e.vert = !1),
    (e.bal = g(e.simTick, n.id + 1) * 0.15),
    (e.balVel = 0),
    mn(e, pn.GRIND, c),
    (e.trickId = v),
    (e.trickTick = e.simTick),
    (e.trickEnd = 0));
  let w = +(!d && e.railDir * (u >= 0 ? 1 : -1) < 0);
  (L(e, v, 0, w | (y ? 2 : 0), D[v].base, o),
    mr(e, n.piece, o),
    (o.flags |= P.GRIND_START),
    (o.rail = n.id),
    (e.airPiece = n.piece));
}
function ai(e, t, n, r, i) {
  let a = r.pressDir || r.dir,
    o = Dt[a];
  (X(e, A.LIP),
    (e.grindBuf = 0),
    (e.rail = t.id),
    (e.railT = _(n, 0, t.len)),
    T(t, e.railT, q),
    (e.railDir = t.flags & ie.SPINE && q.x * e.vnx + q.z * e.vnz < 0 ? -1 : 1),
    (e.x = t.ax + t.tx * e.railT),
    (e.y = t.ay + t.ty * e.railT),
    (e.z = t.az + t.tz * e.railT),
    (e.ux = 0),
    (e.uy = 1),
    (e.uz = 0),
    (e.yaw = I(-q.x * e.railDir, 0, -q.z * e.railDir, 0, 1, 0, e.yaw)),
    (e.vx = 0),
    (e.vy = 0),
    (e.vz = 0),
    (e.spinVel = 0),
    (e.bal = g(e.simTick, t.id + 99) * 0.15),
    (e.balVel = 0),
    mn(e, pn.LIP),
    (e.trickId = o),
    (e.trickTick = e.simTick),
    (e.trickEnd = 0),
    L(e, o, 0, 0, D[o].base, i),
    mr(e, t.piece, i),
    (i.flags |= P.LIP),
    (i.rail = t.id));
}
function oi(e, t, n, r, i) {
  (X(e, A.WALLRIDE), (e.vnx = t), (e.vnz = n), (e.vd = t * e.x + n * e.z));
  let a = e.vx * t + e.vz * n;
  ((e.vx -= a * t),
    (e.vz -= a * n),
    e.vy < 1.5 && (e.vy = 1.5),
    (e.ux = t),
    (e.uy = 0),
    (e.uz = n));
  let o = Math.sqrt(e.vx * e.vx + e.vz * e.vz) || 1;
  ((e.yaw = I(e.vx / o, 0, e.vz / o, e.ux, e.uy, e.uz, e.yaw)),
    (e.spinVel = 0),
    (e.trickId = Mt),
    (e.trickTick = e.simTick),
    (e.trickEnd = 0),
    L(e, Mt, 0, 0, D[Mt].base, i),
    r && mr(e, r, i),
    (i.flags |= P.WALLRIDE));
}
function si(e, t, n, r, i) {
  let a = e.simTick;
  if (
    (t.held & N.OLLIE && (e.crouch = Math.min(12, e.crouch + 1)),
    e.mode === A.WALLRIDE)
  ) {
    (Sn(e, D[Mt].perTick),
      Sr(e, t)
        ? ((e.vx += e.vnx * 4),
          (e.vz += e.vnz * 4),
          (e.vy = Math.max(e.vy, 0) + v(de, Ae, Cr(e)) * r.air),
          (e.ux = 0),
          (e.uy = 1),
          (e.uz = 0),
          (e.crouch = 0),
          (i.flags |= P.OLLIE),
          mi(e, i))
        : a - e.modeTick > 36 &&
          ((e.vx += e.vnx * 1.5), (e.vz += e.vnz * 1.5), mi(e, i)));
    return;
  }
  if (
    (li(e, F[t.dir], r, e.mode === A.LIP ? 1.3 : 1, n, i),
    e.mode === A.GRIND || e.mode === A.LIP)
  ) {
    if (
      (Sn(e, D[e.trickId]?.perTick ?? 0),
      t.pressed & (N.FLIP | N.GRAB) &&
        (e.queued = (t.pressed & N.FLIP ? N.FLIP : N.GRAB) | (hr(t) << 8)),
      e.mode === A.LIP)
    ) {
      let r = Sr(e, t);
      (r && (e.crouch = 0), (r || a - e.modeTick > 150) && gi(e, n, i));
      return;
    }
    if (
      (t.pressed & (N.SPIN_L | N.SPIN_R) && $r(e, t, i),
      t.pressed & N.GRIND && t.dir)
    ) {
      let n = D[e.trickId].kind,
        r = n === O.SLIDE ? xt[t.dir] : n === O.GRIND ? Et[t.dir] : 0;
      r &&
        r !== e.trickId &&
        ((e.trickId = r),
        (e.trickTick = a),
        L(e, r, 0, +!!gr(e), D[r].base, i));
    }
    Sr(e, t) && ci(e, n, r, t, i);
  }
}
function ci(e, t, n, r, i) {
  let a = (r.stickX ? r.stickX / 127 : F[r.dir]) * 3,
    o = Math.sqrt(e.vx * e.vx + e.vz * e.vz);
  if (a && o > 0.5) {
    let t = e.vx / o,
      n = e.vz / o;
    ((e.vx -= n * a), (e.vz += t * a));
    let r = Math.sqrt(e.vx * e.vx + e.vz * e.vz),
      i = e.vx / r,
      s = e.vz / r;
    e.yaw += h(i * n - s * t, i * t + s * n);
  }
  ri(t.rails.segs[e.rail], B);
  let s = v(de, Ae, Cr(e)) * n.air;
  ((e.vx += B.x * s),
    (e.vy += B.y * s),
    (e.vz += B.z * s),
    (e.x += B.x * Qe),
    (e.y += B.y * Qe),
    (e.z += B.z * Qe),
    (e.crouch = 0),
    (i.flags |= P.OLLIE),
    mi(e, i));
}
function li(e, t, n, r, i, a) {
  r *= On(e);
  let o = (4 * r) / n.balance,
    s = g(e.simTick >> 3, e.rail + 3 + e.mode) * nt * r,
    c = Se;
  ((e.balVel += (e.bal * o + s + t * 7) * c),
    (e.balVel *= Re),
    (e.bal += e.balVel * c),
    (e.bal > 1 || e.bal < -1) && ui(e, i, a));
}
function ui(e, t, n) {
  let r = e.bal > 0 ? 1 : -1;
  if (e.mode === A.MANUAL) {
    if (r === (bt(e.trickId) === _r(e) ? 1 : -1)) {
      fi(e, n);
      return;
    }
  } else if (e.mode === A.GRIND) {
    if (pi(e, t, r, n)) return;
  } else if (e.mode === A.LIP) {
    if (r > 0) {
      (di(e), gi(e, t, n));
      return;
    }
    let i = t.rails.segs[e.rail];
    if (i.flags & ie.SPINE) {
      (di(e), (e.railDir = -e.railDir), gi(e, t, n, !0));
      return;
    }
    (T(i, e.railT, q),
      (e.vx = -q.x * e.railDir * 1),
      (e.vz = -q.z * e.railDir * 1));
  }
  ((n.bailWhy = Gt.BALANCE), xi(e, n));
}
function di(e) {
  ((e.bal = e.bal > 0 ? 0.9 : -0.9), (e.balVel = 0));
}
function fi(e, t) {
  (X(e, A.GROUND),
    (e.trickId = 0),
    wn(e, t),
    (t.flags |= P.LAND),
    (t.impact = Math.max(t.impact, 2)));
}
function pi(e, t, n, r) {
  let i = t.rails.segs[e.rail];
  if (i.kind !== ht.COPING) return !1;
  T(i, e.railT, q);
  let a = q.x,
    o = q.z;
  if ((-i.tz * a + i.tx * o) * e.railDir * n < 0) {
    if (!(i.flags & ie.SPINE)) return !1;
    ((a = -a), (o = -o));
  }
  let s = i.ax + i.tx * e.railT,
    c = i.ay + i.ty * e.railT,
    l = i.az + i.tz * e.railT;
  if (
    !t.col.raySurface(s + a * 0.5, c - 0.35, l + o * 0.5, -a, 0, -o, 1, H) ||
    H.ny > 0.9
  )
    return !1;
  M(e.yaw, e.ux, e.uy, e.uz, z);
  let u = Y(e),
    d = e.vx * z.x + e.vy * z.y + e.vz * z.z,
    f = (Math.abs(d) > u * 0.5 ? d : z.x * a + z.z * o) >= 0 ? 1 : -1,
    p = H.ny,
    m = H.nx * p,
    h = p * p - 1,
    g = H.nz * p,
    _ = Math.sqrt(m * m + h * h + g * g);
  ((m /= _), (h /= _), (g /= _));
  let v = u * Ue,
    y = Math.max(u * Le, 2.5),
    b = e.railDir;
  return (
    di(e),
    Mr(e, i.tx * b * v + m * y, i.ty * b * v + h * y, i.tz * b * v + g * y, f),
    (e.rail = -1),
    (e.trickId = 0),
    (e.spinVel = 0),
    X(e, A.GROUND),
    mr(e, H.piece, r),
    (r.flags |= P.GRIND_END | P.LAND),
    (r.impact = Math.max(r.impact, 2)),
    Xr(e, 0),
    !0
  );
}
function mi(e, t) {
  (e.mode === A.WALLRIDE && ((e.ux = 0), (e.uy = 1), (e.uz = 0)),
    e.mode === A.GRIND && hi(e));
  let n = e.lastPiece;
  ((e.airFakie = _r(e)),
    X(e, A.AIR),
    (e.vert = !1),
    (e.xfer = 0),
    (e.vturn = 0),
    (e.airYaw0 = e.yaw),
    (e.airFirst = e.comboTricks),
    (e.airPiece = n),
    (e.trickId = 0),
    (e.trickEnd = 0),
    (e.spinVel = 0),
    (e.coyote = 5),
    (t.flags |= P.GRIND_END));
}
function hi(e) {
  if (e.vx * e.vx + e.vz * e.vz < 0.25) return;
  M(e.yaw, e.ux, e.uy, e.uz, z);
  let t = h(e.vx * z.z - e.vz * z.x, e.vx * z.x + e.vz * z.z);
  (t > 3.141592653589793 / 2
    ? (t -= y)
    : t < -3.141592653589793 / 2 && (t += y),
    (e.yaw += t));
}
function gi(e, t, n, r = !1) {
  let i = t.rails.segs[e.rail];
  T(i, e.railT, q);
  let a = q.x * e.railDir,
    o = q.z * e.railDir,
    s = i.ax + i.tx * e.railT,
    c = i.ay + i.ty * e.railT,
    l = i.az + i.tz * e.railT;
  t.col.raySurface(s + a * 0.5, c - 0.35, l + o * 0.5, -a, 0, -o, 1, H) &&
  H.ny < 0.9
    ? ((e.x = H.px),
      (e.y = H.py),
      (e.z = H.pz),
      (e.ux = H.nx),
      (e.uy = H.ny),
      (e.uz = H.nz))
    : ((e.x = s + a * 0.06),
      (e.y = c - 0.35),
      (e.z = l + o * 0.06),
      (e.ux = a),
      (e.uy = 0),
      (e.uz = o));
  let u = !r && e.trickId && D[e.trickId].fakieOut;
  ((e.yaw = I(0, u ? 1 : -1, 0, e.ux, e.uy, e.uz, e.yaw)),
    (e.vx = 0),
    (e.vy = -2.5),
    (e.vz = 0),
    (e.rail = -1),
    (e.trickId = 0),
    X(e, A.GROUND),
    (n.flags |= P.GRIND_END | P.LAND),
    Xr(e, 0));
}
function _i(e, t, n, r) {
  let i = t.rails.segs[e.rail],
    a = Math.sqrt(e.vx * e.vx + e.vy * e.vy + e.vz * e.vz),
    o = D[e.trickId]?.kind === O.SLIDE;
  if (
    ((a += -17 * i.ty * e.railDir * n),
    a > 4.5 && (a = Math.max(ue, a - (o ? st : Te) * n)),
    a > 17 && (a = 17),
    a < 1.6)
  ) {
    ((e.vy += 1), mi(e, r));
    return;
  }
  e.railT += e.railDir * a * n;
  for (let n = 0; n < 4 && (e.railT > i.len || e.railT < 0); n++) {
    let n = e.railT > i.len ? e.railT - i.len : -e.railT,
      o = e.railT > i.len,
      s = o ? i.next : i.prev,
      c = o ? i.bx : i.ax,
      l = o ? i.by : i.ay,
      u = o ? i.bz : i.az,
      d = i.tx * e.railDir,
      f = i.ty * e.railDir,
      p = i.tz * e.railDir;
    if (s < 0) {
      ((e.x = c),
        (e.y = l),
        (e.z = u),
        (e.vx = d * a),
        (e.vy = f * a + ut),
        (e.vz = p * a),
        mi(e, r));
      return;
    }
    let m = t.rails.segs[s],
      g =
        (m.ax - c) * (m.ax - c) +
          (m.ay - l) * (m.ay - l) +
          (m.az - u) * (m.az - u) <
        (m.bx - c) * (m.bx - c) +
          (m.by - l) * (m.by - l) +
          (m.bz - u) * (m.bz - u),
      _ = g ? 1 : -1;
    if (d * m.tx * _ + f * m.ty * _ + p * m.tz * _ < 0.7) {
      ((e.x = c),
        (e.y = l),
        (e.z = u),
        (e.vx = d * a),
        (e.vy = f * a + ut),
        (e.vz = p * a),
        mi(e, r));
      return;
    }
    let v = m.tx * _,
      y = m.tz * _,
      b = v * p - y * d,
      x = v * d + y * p;
    ((b > 1e-7 || b < -1e-7) && (e.yaw += h(b, x)),
      (e.rail = m.id),
      (e.railDir = _),
      (e.railT = g ? n : m.len - n),
      m.piece !== i.piece && mr(e, m.piece, r),
      (i = m));
  }
  ((e.x = i.ax + i.tx * e.railT),
    (e.y = i.ay + i.ty * e.railT),
    (e.z = i.az + i.tz * e.railT),
    (e.vx = i.tx * e.railDir * a),
    (e.vy = i.ty * e.railDir * a),
    (e.vz = i.tz * e.railDir * a),
    ri(i, B),
    (e.ux = B.x),
    (e.uy = B.y),
    (e.uz = B.z));
}
function vi(e, t, n, r, i, a) {
  if (
    ((e.vy -= 17 * fe * i),
    (e.x += e.vx * i),
    (e.y += e.vy * i),
    (e.z += e.vz * i),
    !n.col.raySurface(
      e.x + e.vnx * 0.4,
      e.y + 0.5,
      e.z + e.vnz * 0.4,
      -e.vnx,
      0,
      -e.vnz,
      0.8,
      H,
    ) || H.surf & Ne.RAIL)
  ) {
    if (
      (e.grindBuf > 0 || t.held & N.GRIND) &&
      n.rails.sweep(e.x, e.y, e.z, e.x, e.y + 0.6, e.z, 0.55, 0.35, 0.9, zn)
    ) {
      ii(e, n, n.rails.segs[zn.seg], zn.t, t, r, a);
      return;
    }
    mi(e, a);
    return;
  }
  let o = Math.sqrt(H.nx * H.nx + H.nz * H.nz);
  if (
    (o > 0.9 && Hr(e, H.nx / o, H.nz / o),
    (e.x = H.px + e.vnx * 0.02),
    (e.z = H.pz + e.vnz * 0.02),
    n.col.raySurface(
      e.x + e.vnx * 0.3,
      e.y + 0.2,
      e.z + e.vnz * 0.3,
      0,
      -1,
      0,
      0.3,
      H,
    ) &&
      (e.vy < 0 || H.ny < 0.99))
  ) {
    ((e.ux = 0),
      (e.uy = 1),
      (e.uz = 0),
      (e.x += e.vnx * 0.3),
      (e.z += e.vnz * 0.3),
      e.y < H.py + 0.02 && (e.y = H.py + 0.02),
      mi(e, a));
    return;
  }
  for (let t = 0; t < 2; t++) {
    if (!yi(n, e.x, e.y, e.z, e.vnx, e.vnz, t)) continue;
    e.mode === A.WALLRIDE && mi(e, a);
    let r = Math.min(0, W.dx * e.vnx + W.dz * e.vnz);
    ((e.x += W.dx - r * e.vnx), (e.y += W.dy), (e.z += W.dz - r * e.vnz));
    let i = -(e.vx * W.nx + e.vy * W.ny + e.vz * W.nz);
    if (i > 0) {
      let t = e.vx,
        n = e.vz;
      ((e.vx += W.nx * i),
        (e.vy += W.ny * i),
        (e.vz += W.nz * i),
        Ur(e, t, n),
        (a.flags |= P.WALL),
        (a.impact = Math.max(a.impact, i)));
    }
  }
}
function yi(e, t, n, r, i, a, o) {
  let s = o ? at : Ve;
  return (
    (Vn.x = t + i * s),
    (Vn.y = n),
    (Vn.z = r + a * s),
    e.col.sphereWalls(Vn, o ? Be : $e, 0, 1, 0, W)
  );
}
function bi(e, t, n, r, i, a) {
  return (
    (t += i * 0.02),
    (r += a * 0.02),
    !yi(e, t, n, r, i, a, 0) && !yi(e, t, n, r, i, a, 1)
  );
}
function xi(e, t) {
  (gn(e, t),
    X(e, A.BAIL),
    (e.trickId = 0),
    (e.rail = -1),
    (e.vert = !1),
    (e.xfer = 0),
    (e.vturn = 0),
    (e.queued = 0),
    (e.crouch = 0),
    (e.spinVel = 0),
    (t.flags |= P.BAIL));
}
function Si(e, t) {
  if (
    !t.col.raySurface(
      e.x + e.ux * 0.1,
      e.y + e.uy * 0.1,
      e.z + e.uz * 0.1,
      -e.ux,
      -e.uy,
      -e.uz,
      0.25,
      H,
    )
  )
    return (Bt(e, 0, 1, 0, 0.3), !0);
  if (
    e.simTick - e.modeTick >= 42 &&
    e.uy > 0.7 &&
    (X(e, A.GROUND), (e.vx *= 0.2), (e.vy *= 0.2), (e.vz *= 0.2), e.uy < 0.97)
  ) {
    let t = e.ux * e.uy,
      n = e.uy * e.uy - 1,
      r = e.uz * e.uy,
      i = Math.sqrt(t * t + n * n + r * r);
    ((t /= i), (n /= i), (r /= i));
    let a = Y(e);
    ((e.vx = t * a),
      (e.vy = n * a),
      (e.vz = r * a),
      (e.yaw = I(t, n, r, e.ux, e.uy, e.uz, e.yaw)));
  }
  return !1;
}
function Ci(e, t, n, r) {
  e.vy -= 17 * n;
  let i = e.x,
    a = e.y,
    o = e.z;
  ((e.x += e.vx * n), (e.y += e.vy * n), (e.z += e.vz * n));
  let s = e.x - i,
    c = e.y - a,
    l = e.z - o,
    u = Math.sqrt(s * s + c * c + l * l);
  if (
    u > 1e-6 &&
    t.col.raySurface(i, a, o, s / u, c / u, l / u, u + 0.02, V) &&
    V.ny > -0.2
  ) {
    if (V.ny < 0.3) return (Gr(e, r), !0);
    ((e.x = V.px),
      (e.y = V.py),
      (e.z = V.pz),
      (e.ux = V.nx),
      (e.uy = V.ny),
      (e.uz = V.nz));
    let t = e.vx * e.ux + e.vy * e.uy + e.vz * e.uz;
    return (
      t < 0 &&
        ((e.vx -= t * e.ux),
        (e.vy -= t * e.uy),
        (e.vz -= t * e.uz),
        (r.impact = Math.max(r.impact, -t))),
      (e.modeTick = Math.max(e.modeTick, e.simTick - 18)),
      !1
    );
  }
  return (Pr(e, t, Y(e), r), !0);
}
function wi(e, t) {
  if (e.uy < 0.8) return;
  let n = _r(e) ? -1 : 1;
  M(e.yaw, e.ux, e.uy, e.uz, z);
  let r = n / Math.sqrt(z.x * z.x + z.z * z.z);
  ((e.yaw = I(z.x * r, 0, z.z * r, 0, 1, 0, e.yaw)),
    (e.ux = 0),
    (e.uy = 1),
    (e.uz = 0),
    (e.vy = 0),
    Ei(e, 4),
    (e.trickId = 0),
    (e.trickEnd = 0),
    (e.queued = 0),
    (e.crouch = 0),
    (e.coyote = 0),
    (e.grindBuf = 0),
    X(e, A.WALK),
    wn(e, t),
    (e.bal = 0),
    (e.balVel = 0),
    (t.flags |= P.BOARD));
}
function Ti(e, t, n) {
  if (e.simTick - e.modeTick < 6 || e.vy < 0 || !Di(e, t)) return;
  let r = H.nx,
    i = H.ny,
    a = H.nz;
  M(e.yaw, 0, 1, 0, z);
  let o = z.x * r + z.z * a,
    s = z.x - o * r,
    c = -o * i,
    l = z.z - o * a,
    u = Math.sqrt(s * s + c * c + l * l);
  ((s /= u),
    (c /= u),
    (l /= u),
    (e.x = H.px),
    (e.y = H.py),
    (e.z = H.pz),
    (e.ux = r),
    (e.uy = i),
    (e.uz = a),
    (e.yaw = I(s, c, l, r, i, a, e.yaw)));
  let d = Math.max(me, e.vx * s + e.vz * l);
  ((e.vx = s * d),
    (e.vy = c * d),
    (e.vz = l * d),
    (e.rolling = !0),
    (e.crouch = 0),
    X(e, A.GROUND),
    (n.flags |= P.BOARD));
}
function Ei(e, t) {
  let n = Math.sqrt(e.vx * e.vx + e.vz * e.vz);
  if (n > t) {
    let r = t / n;
    ((e.vx *= r), (e.vz *= r));
  }
}
function Di(e, t) {
  return (
    t.col.raySurface(e.x, e.y + 0.5, e.z, 0, -1, 0, 0.75, H) &&
    H.ny >= 0.8 &&
    H.py - e.y <= 0.3
  );
}
function Oi(e, t) {
  return e.vy < -0.5 || !Di(e, t);
}
function ki(e, t, n, r, i) {
  if (((e.yaw -= F[t.dir] * je * i), r)) return Ai(e, n, i);
  M(e.yaw, 0, 1, 0, z);
  let a = Vt[t.dir],
    o = a > 0 ? 3 : a < 0 ? -we : 0,
    s = z.x * o - e.vx,
    c = z.z * o - e.vz,
    l = Math.sqrt(s * s + c * c),
    u = 14 * i;
  (l > u && ((s *= u / l), (c *= u / l)), (e.vx += s), (e.vz += c), (e.vy = 0));
  let d = e.x,
    f = e.z;
  if (
    ((e.x += e.vx * i),
    (e.z += e.vz * i),
    !n.col.raySurface(e.x, e.y + 0.5, e.z, 0, -1, 0, 0.75, V))
  )
    return !0;
  let p = V.py - e.y;
  if (V.ny < 0.8) {
    if (p <= 0) return !0;
    ((e.x = d), (e.z = f));
    let t = Math.sqrt(V.nx * V.nx + V.nz * V.nz);
    if (t > 1e-6) {
      let n = V.nx / t,
        r = V.nz / t,
        i = -(e.vx * n + e.vz * r);
      i > 0 && ((e.vx += n * i), (e.vz += r * i));
    }
  } else
    p > 0.3
      ? ((e.x = d), (e.z = f), (e.vx = 0), (e.vz = 0))
      : ((e.y = V.py), (e.lastPiece = V.piece));
  return (ji(e, n, !1), !1);
}
function Ai(e, t, n) {
  e.vy -= 17 * n;
  let r = e.x,
    i = e.y,
    a = e.z;
  ((e.x += e.vx * n), (e.y += e.vy * n), (e.z += e.vz * n));
  let o = e.x - r,
    s = e.y - i,
    c = e.z - a,
    l = Math.sqrt(o * o + s * s + c * c);
  if (
    l > 1e-6 &&
    t.col.raySurface(r, i, a, o / l, s / l, c / l, l + 0.02, V) &&
    V.ny > -0.2
  ) {
    if (V.ny >= 0.8)
      return (
        (e.x = V.px),
        (e.y = V.py),
        (e.z = V.pz),
        (e.vy = 0),
        Ei(e, 4),
        !1
      );
    ((e.x = V.px + V.nx * 0.01),
      (e.y = V.py + V.ny * 0.01),
      (e.z = V.pz + V.nz * 0.01));
    let t = e.vx * V.nx + e.vy * V.ny + e.vz * V.nz;
    t < 0 && ((e.vx -= t * V.nx), (e.vy -= t * V.ny), (e.vz -= t * V.nz));
  }
  return (ji(e, t, !0), !0);
}
function ji(e, t, n) {
  for (let r = 0; r < 2; r++) {
    let i = r ? at : mt,
      a = r ? Be : $e;
    if (
      ((K.x = e.x),
      (K.y = e.y + i),
      (K.z = e.z),
      !t.col.sphereWalls(K, a, 0, 1, 0, U))
    )
      continue;
    ((e.x += U.dx), (e.z += U.dz), n && (e.y += U.dy));
    let o = Math.sqrt(U.nx * U.nx + U.nz * U.nz);
    if (o < 1e-6) continue;
    let s = U.nx / o,
      c = U.nz / o,
      l = -(e.vx * s + e.vz * c);
    l > 0 && ((e.vx += s * l), (e.vz += c * l));
  }
}
function Mi(e, t, n) {
  (e.mode === A.GROUND && e.bankTick && e.simTick >= e.bankTick && wn(e, n),
    e.mode === A.MANUAL &&
      Y(e) < 0.8 &&
      (X(e, A.GROUND), (e.trickId = 0), wn(e, n)),
    e.comboMult === 0 &&
      e.special > 0 &&
      e.special < 200 &&
      e.simTick % 20 == 0 &&
      e.special--);
  let r = t.box;
  (e.y < t.killY || e.x > r.x1 || e.x < r.x0 || e.z > r.z1 || e.z < r.z0) &&
    Ni(e, t, n, Ht.OUT);
  let i = t.lawn;
  (i &&
    (e.x < i.rect.x0 ||
      e.x > i.rect.x1 ||
      e.z < i.rect.z0 ||
      e.z > i.rect.z1) &&
    e.y <= re(i, e.x, e.z) &&
    Ni(e, t, n, Ht.GRASS),
    (!Number.isFinite(e.x) || !Number.isFinite(e.y) || !Number.isFinite(e.z)) &&
      Ni(e, t, n));
}
function Ni(e, t, n, r = Ht.KEY) {
  gn(e, n);
  let i = t.layout.spawns,
    a = 0,
    o = 1 / 0;
  for (let t = 0; t < i.length; t++) {
    let n = i[t],
      r =
        (n.x - e.x) * (n.x - e.x) +
        (n.z - e.z) * (n.z - e.z) +
        25 * (n.y - e.y) * (n.y - e.y);
    Number.isFinite(r) && r < o && ((o = r), (a = t));
  }
  let s = i[a];
  ((e.x = s.x),
    (e.y = s.y),
    (e.z = s.z),
    (e.vx = 0),
    (e.vy = 0),
    (e.vz = 0),
    (e.yaw = s.yaw + x * Math.round((e.yaw - s.yaw) / x)),
    (e.ux = 0),
    (e.uy = 1),
    (e.uz = 0),
    (e.spinVel = 0),
    (e.vert = !1),
    (e.rail = -1),
    (e.trickId = 0),
    (e.queued = 0),
    (e.crouch = 0),
    (e.rolling = !1),
    (e.xfer = 0),
    (e.vturn = 0),
    (e.bal = 0),
    (e.balVel = 0),
    X(e, A.GROUND),
    (n.flags |= P.RESPAWN),
    (n.respawnWhy = r));
}
var Pi = [
  `x`,
  `y`,
  `z`,
  `vx`,
  `vy`,
  `vz`,
  `yaw`,
  `ux`,
  `uy`,
  `uz`,
  `spinVel`,
  `airYaw0`,
  `vnx`,
  `vnz`,
  `vd`,
  `lipY`,
  `railT`,
  `bal`,
  `balVel`,
  `vturn`,
];
function Fi(e) {
  for (let t of Pi) e[t] = Math.fround(e[t]);
}
var Ii = { COMBO: 0, RUN: 1 },
  Li = 4294967295,
  Z = rn.length;
function Ri(e, t = new Float64Array(Z)) {
  return (
    (t[0] = e.x),
    (t[1] = e.y),
    (t[2] = e.z),
    (t[3] = e.vx),
    (t[4] = e.vy),
    (t[5] = e.vz),
    (t[6] = e.yaw),
    (t[7] = e.ux),
    (t[8] = e.uy),
    (t[9] = e.uz),
    (t[10] = e.spinVel),
    (t[11] = e.simTick),
    (t[12] = e.mode),
    (t[13] = e.modeTick),
    (t[14] = +e.rolling),
    (t[15] = e.crouch),
    (t[16] = e.coyote),
    (t[17] = e.bankTick),
    (t[18] = e.airYaw0),
    (t[19] = +e.airFakie),
    (t[20] = +e.vert),
    (t[21] = e.vnx),
    (t[22] = e.vnz),
    (t[23] = e.vd),
    (t[24] = e.lipY),
    (t[25] = e.airFirst),
    (t[26] = e.airPiece),
    (t[27] = e.xfer),
    (t[28] = e.vturn),
    (t[29] = e.rail),
    (t[30] = e.railT),
    (t[31] = e.railDir),
    (t[32] = e.bal),
    (t[33] = e.balVel),
    (t[34] = e.balClock),
    (t[35] = e.balCarry),
    (t[36] = e.trickId),
    (t[37] = e.trickTick),
    (t[38] = e.trickEnd),
    (t[39] = e.queued),
    (t[40] = e.grindBuf),
    (t[41] = e.taps),
    (t[42] = e.lastPiece),
    (t[43] = e.comboBase),
    (t[44] = e.comboMult),
    (t[45] = e.comboTricks),
    (t[46] = e.ring0),
    (t[47] = e.ring1),
    (t[48] = e.ring2),
    (t[49] = e.ring3),
    (t[50] = e.comboSeq),
    (t[51] = e.special),
    t
  );
}
function zi(e, t) {
  return (
    (t.x = e[0]),
    (t.y = e[1]),
    (t.z = e[2]),
    (t.vx = e[3]),
    (t.vy = e[4]),
    (t.vz = e[5]),
    (t.yaw = e[6]),
    (t.ux = e[7]),
    (t.uy = e[8]),
    (t.uz = e[9]),
    (t.spinVel = e[10]),
    (t.simTick = e[11]),
    (t.mode = e[12]),
    (t.modeTick = e[13]),
    (t.rolling = e[14] !== 0),
    (t.crouch = e[15]),
    (t.coyote = e[16]),
    (t.bankTick = e[17]),
    (t.airYaw0 = e[18]),
    (t.airFakie = e[19] !== 0),
    (t.vert = e[20] !== 0),
    (t.vnx = e[21]),
    (t.vnz = e[22]),
    (t.vd = e[23]),
    (t.lipY = e[24]),
    (t.airFirst = e[25]),
    (t.airPiece = e[26]),
    (t.xfer = e[27]),
    (t.vturn = e[28]),
    (t.rail = e[29]),
    (t.railT = e[30]),
    (t.railDir = e[31]),
    (t.bal = e[32]),
    (t.balVel = e[33]),
    (t.balClock = e[34]),
    (t.balCarry = e[35]),
    (t.trickId = e[36]),
    (t.trickTick = e[37]),
    (t.trickEnd = e[38]),
    (t.queued = e[39]),
    (t.grindBuf = e[40]),
    (t.taps = e[41]),
    (t.lastPiece = e[42]),
    (t.comboBase = e[43]),
    (t.comboMult = e[44]),
    (t.comboTricks = e[45]),
    (t.ring0 = e[46]),
    (t.ring1 = e[47]),
    (t.ring2 = e[48]),
    (t.ring3 = e[49]),
    (t.comboSeq = e[50]),
    (t.special = e[51]),
    t
  );
}
var Bi = new Float64Array(Z),
  Vi = new Uint32Array(Bi.buffer);
function Hi(e) {
  Ri(e, Bi);
  let t = 2166136261;
  for (let e = 0; e < Vi.length; e++) t = Math.imul(t ^ Vi[e], 16777619);
  return t >>> 0;
}
function Ui(e, t, n, r) {
  return (
    (r.dir = e[n]),
    (r.held = e[t + n]),
    (r.pressed = e[2 * t + n]),
    (r.released = e[3 * t + n]),
    (r.pressDir = e[4 * t + n]),
    (r.tapDir = e[5 * t + n]),
    (r.stickX = (e[6 * t + n] << 24) >> 24),
    r
  );
}
new TextEncoder();
var Wi = new TextDecoder();
function Gi(e) {
  let t = new DataView(e.buffer, e.byteOffset, e.byteLength),
    n = 0,
    r = (t) => {
      if (n + t > e.byteLength) throw Error(`truncated tape`);
    };
  r(6);
  let i = t.getUint8(n++);
  if (i > 2) throw Error(`tape v${i} is newer than v2`);
  let a = t.getUint8(n++),
    o = t.getUint8(n++),
    s = t.getUint8(n++),
    c = t.getUint16(n, !0);
  n += 2;
  let l = () => {
      r(2);
      let i = t.getUint16(n, !0);
      ((n += 2), r(i));
      let a = Wi.decode(e.subarray(n, n + i));
      return ((n += i), a);
    },
    u = l(),
    d = l(),
    f = l();
  r(22);
  let p = () => {
      let e = t.getUint32(n, !0);
      return ((n += 4), e);
    },
    m = p(),
    h = p(),
    g = p(),
    _ = p(),
    v = p();
  if (h > 2e4) throw Error(`tape too long (${h} steps)`);
  let y = t.getUint16(n, !0);
  ((n += 2), r(8 * y));
  let b = [];
  for (let e = 0; e < y; e++) b.push({ at: p(), boost: p() });
  let x = i < 2 ? 6 : 7;
  r(8 * Z + x * h);
  let S = new Float64Array(Z);
  for (let e = 0; e < Z; e++) ((S[e] = t.getFloat64(n, !0)), (n += 8));
  let C = new Uint8Array(7 * h);
  return (
    C.set(e.subarray(n, n + x * h)),
    {
      v: i,
      kind: a,
      tickHz: o,
      subSteps: s,
      skater: c,
      board: u,
      place: d,
      look: f,
      score: m,
      n: h,
      bankAt: g,
      endHash: _,
      boost0: v,
      boosts: b,
      start: S,
      inputs: C,
    }
  );
}
var Q = { NONE: 0, CLEAN: 1, LET_GO: 2, BAIL: 3 },
  Ki = 0.5,
  qi = 45,
  Ji = 11,
  Yi = N.GRAB | N.SPIN_L | N.SPIN_R,
  Xi = 0.6,
  Zi = 3,
  Qi = class {
    out = {
      call: Q.NONE,
      why: 0,
      ticks: 0,
      x: 0,
      y: 0,
      z: 0,
      nx: 0,
      ny: 1,
      nz: 0,
      tx: 0,
      ty: 0,
      tz: 0,
      fx: 0,
      fy: 0,
      fz: 1,
      stake: !1,
      air: -1,
    };
    sim = Ut();
    start = new Float64Array(Z);
    ev = new Kt();
    inp = { dir: 0, held: 0, pressed: 0, released: 0, pressDir: 0, tapDir: 0 };
    f = { x: 0, y: 0, z: 0 };
    line = new Float64Array(qi * Z);
    step = new Float64Array(Z);
    lineLen = 0;
    lineTick = 0;
    lineHeld = 0;
    lineDir = 0;
    lineWorld = null;
    lineStats = null;
    lineCall = Q.NONE;
    lineTicks = 0;
    run(e, t, n, r, i) {
      let a = this.out;
      if (((a.call = Q.NONE), e.mode !== A.AIR || e.vy > Ki)) return a;
      ((a.air = e.modeTick),
        (a.stake =
          e.comboTricks !== e.airFirst ||
          Math.abs(e.yaw - e.airYaw0) > Xi ||
          Math.abs(e.spinVel) > Zi),
        Ri(e, this.start));
      let o = this.along(t, n, r, i);
      return (
        o > 0
          ? ((a.call = this.lineCall), (a.ticks = this.lineTicks - o))
          : (a.call = this.probe(t, n, r, i, !0)),
        a.call === Q.BAIL &&
          (t & Yi || F[n] !== 0) &&
          this.probe(t & ~Yi, 0, r, i, !1) === Q.CLEAN &&
          (a.call = Q.LET_GO),
        a
      );
    }
    along(e, t, n, r) {
      if (
        !this.lineLen ||
        e !== this.lineHeld ||
        t !== this.lineDir ||
        n !== this.lineWorld ||
        r !== this.lineStats
      )
        return 0;
      let i = this.start,
        a = i[Ji] - this.lineTick;
      if (!(a >= 1 && a <= this.lineLen)) return 0;
      let o = (a - 1) * Z;
      for (let e = 0; e < Z; e++) if (this.line[o + e] !== i[e]) return 0;
      return a;
    }
    probe(e, t, n, r, i) {
      let a = zi(this.start, this.sim),
        o = this.ev,
        s = this.inp,
        c = this.f;
      ((s.held = e),
        (s.dir = t),
        i &&
          ((this.lineLen = 0),
          (this.lineTick = this.start[Ji]),
          (this.lineHeld = e),
          (this.lineDir = t),
          (this.lineWorld = n),
          (this.lineStats = r)));
      for (let e = 1; e <= qi; e++) {
        (M(a.yaw, a.ux, a.uy, a.uz, c),
          o.reset(),
          Ln(a, s, n, r, 2, Se / 2, o));
        let t =
          o.flags & P.RESPAWN
            ? Q.NONE
            : a.mode === A.AIR
              ? -1
              : o.flags & P.BAIL
                ? Q.BAIL
                : o.flags & P.LAND
                  ? Q.CLEAN
                  : Q.NONE;
        if (t < 0) {
          i && this.line.set(Ri(a, this.step), (e - 1) * Z);
          continue;
        }
        return (
          i &&
            ((this.lineLen = e - 1),
            (this.lineCall = t),
            (this.lineTicks = e),
            t !== Q.NONE && this.fill(a, c, e, o.bailWhy)),
          t
        );
      }
      return (i && (this.lineLen = 0), Q.NONE);
    }
    fill(e, t, n, r) {
      let i = this.out,
        a = e.ux,
        o = e.uy,
        s = e.uz;
      ((i.ticks = n),
        (i.why = r),
        (i.x = e.x),
        (i.y = e.y),
        (i.z = e.z),
        (i.nx = a),
        (i.ny = o),
        (i.nz = s));
      let c = e.vx * a + e.vy * o + e.vz * s,
        l = e.vx - c * a,
        u = e.vy - c * o,
        d = e.vz - c * s,
        f = Math.sqrt(l * l + u * u + d * d);
      f > 1
        ? ((i.tx = l / f), (i.ty = u / f), (i.tz = d / f))
        : ((i.tx = 0), (i.ty = 0), (i.tz = 0));
      let p = t.x * a + t.y * o + t.z * s,
        m = t.x - p * a,
        h = t.y - p * o,
        g = t.z - p * s,
        _ = Math.sqrt(m * m + h * h + g * g) || 1;
      ((i.fx = m / _), (i.fy = h / _), (i.fz = g / _));
    }
  },
  $i = class {
    recon;
    input;
    combos;
    ev = new Kt();
    staged = {
      dir: 0,
      held: 0,
      pressed: 0,
      released: 0,
      pressDir: 0,
      tapDir: 0,
      stickX: 0,
    };
    lastWarp;
    onEvents = () => {};
    onCombo = () => {};
    onComboRejected = () => {};
    onWarp = () => {};
    self;
    world;
    forecast = new Qi();
    fcKey = { tick: -1, held: -1, dir: -1, y: NaN };
    canSkate;
    constructor(e, t, n, r, i = () => !0) {
      ((this.self = n),
        (this.world = r),
        (this.canSkate = i),
        (this.input = e.input({ mode: `reliable` })),
        (this.combos = t.defineEvent({
          label: `combo`,
          uniqueBy: (e) => e.seq,
          onPredict: (e) => this.onCombo(e),
          onReject: (e) => this.onComboRejected(e),
        })),
        (this.lastWarp = n.warpSeq),
        (this.recon = t.reconciler(n, {
          input: this.input,
          fields: [...rn],
          smoothMs: 60,
          step: (e, t, n) => {
            let r = this.ev;
            if ((r.reset(), !this.canSkate(e.reckonTime))) return;
            let i = t;
            (Ln(
              i,
              n,
              this.world,
              jn(this.self.skater, this.self.boost),
              e.subSteps,
              e.subDt,
              r,
            ),
              r.flags & P.COMBO_LANDED &&
                e.predict(this.combos, {
                  seq: r.comboSeq,
                  score: r.comboScore,
                  tricks: r.comboTricks,
                }),
              e.isReplay || this.onEvents(r, i));
          },
        })));
    }
    step(e) {
      this.self.warpSeq !== this.lastWarp &&
        ((this.lastWarp = this.self.warpSeq),
        this.recon.reset(),
        this.onWarp());
      let t = this.input.data,
        n = this.state,
        r =
          (cn.capturing || document.hidden) && n.mode === A.GROUND && n.rolling;
      for (let n = 0; n < e; n++)
        (cn.consume(this.staged, n === 0),
          (t.dir = r ? k.D : this.staged.dir),
          (t.held = this.staged.held),
          (t.pressed = this.staged.pressed),
          (t.released = this.staged.released),
          (t.pressDir = this.staged.pressDir),
          (t.tapDir = this.staged.tapDir),
          (t.stickX = this.staged.stickX),
          this.input.send());
    }
    setWorld(e) {
      this.world = e;
    }
    get state() {
      return this.recon.state;
    }
    landing() {
      let e = this.state,
        t = this.input.data,
        n = this.fcKey;
      return n.tick === e.simTick &&
        n.held === t.held &&
        n.dir === t.dir &&
        n.y === e.y
        ? this.forecast.out
        : ((n.tick = e.simTick),
          (n.held = t.held),
          (n.dir = t.dir),
          (n.y = e.y),
          this.forecast.run(
            e,
            t.held,
            t.dir,
            this.world,
            jn(this.self.skater, this.self.boost),
          ));
    }
    value(e) {
      return this.recon.value(e);
    }
    dispose() {
      this.recon.dispose();
    }
  },
  ea = [
    `simTick`,
    `mode`,
    `modeTick`,
    `trickId`,
    `trickTick`,
    `trickEnd`,
    `crouch`,
    `bal`,
    `rail`,
    `vx`,
    `vy`,
    `vz`,
    `yaw`,
    `ux`,
    `uy`,
    `uz`,
    `comboMult`,
    `comboBase`,
    `special`,
    `vert`,
    `xfer`,
    `rolling`,
  ],
  ta = class {
    ring = [];
    head = 0;
    count = 0;
    lastTick = -1;
    sk;
    scratch = Ut();
    constructor(e) {
      this.sk = e;
      for (let e = 0; e < 16; e++) this.ring.push(Ut());
    }
    sample() {
      let e = this.sk.simTick;
      if (e === this.lastTick) return;
      this.lastTick = e;
      let t = this.ring[this.head],
        n = this.sk;
      for (let e of ea) n[e] !== void 0 && (t[e] = n[e]);
      ((this.head = (this.head + 1) % this.ring.length),
        (this.count = Math.min(this.count + 1, this.ring.length)));
    }
    at(e) {
      this.sample();
      let t = null;
      for (let n = 0; n < this.count; n++) {
        let r =
          this.ring[(this.head - 1 - n + this.ring.length) % this.ring.length];
        if (r.simTick <= e + 0.5) {
          t = r;
          break;
        }
      }
      return (
        (t ||= this.count
          ? this.ring[
              (this.head - this.count + this.ring.length) % this.ring.length
            ]
          : this.scratch),
        t
      );
    }
    dispose() {
      this.ring.length = 0;
    }
  },
  na = class {
    el;
    combo;
    tricks;
    score;
    special;
    specialFill;
    balance;
    balNeedle;
    lastKey = ``;
    lastTricks = ``;
    lastMult = 0;
    lastD = ``;
    seen = new Float64Array(7).fill(NaN);
    lastSp = -1;
    balOn = !1;
    balTick = 0;
    layout;
    gradeEl;
    gradeUntil = 0;
    gradeBanked = !1;
    count = null;
    constructor(e, t) {
      ((this.layout = t),
        (this.el = $(`div`, `hud`)),
        (this.combo = $(`div`, `combo`)),
        (this.tricks = $(`div`, `combo-tricks`)),
        (this.score = $(`div`, `combo-score`)),
        (this.gradeEl = $(`div`, `combo-grade`)),
        this.combo.append(this.gradeEl, this.tricks, this.score),
        (this.special = $(`div`, `special`)),
        (this.specialFill = $(`div`, `special-fill`)));
      let n = $(`div`, `special-label`);
      n.textContent = `SPECIAL`;
      let r = $(`div`, `special-track`);
      (r.append(this.specialFill),
        this.special.append(r, n),
        (this.balance = $(`div`, `balance`)),
        (this.balNeedle = $(`div`, `balance-needle`)),
        this.balance.append($(`div`, `balance-arc`), this.balNeedle),
        this.el.append(this.combo, this.balance),
        e.root.append(this.el),
        e.me.append(this.special));
    }
    setLayout(e) {
      this.layout = e;
    }
    specialReady() {
      let e = this.special,
        t = e.parentElement;
      if (
        (e.classList.remove(`burst`),
        e.offsetWidth,
        e.classList.add(`burst`),
        !t)
      )
        return;
      t.querySelector(`.special-flag`)?.remove();
      let n = $(`div`, `special-flag`, `READY!`);
      if (
        (n.append($(`small`, ``, `every stat up`)),
        (n.style.left = `${e.offsetLeft + e.offsetWidth + 14}px`),
        (n.style.top = `${e.offsetTop - 8}px`),
        t.append(n),
        setTimeout(() => n.classList.add(`out`), 1900),
        setTimeout(() => n.remove(), 2200),
        !Jt())
      )
        for (let n = 0; n < 7; n++) {
          let r = fn(`star`, `special-star`);
          ((r.style.left = `${e.offsetLeft + 20 + n * 20}px`),
            (r.style.top = `${e.offsetTop}px`),
            t.append(r));
          let i = (Math.random() * 2 - 1) * 14,
            a = 8 + Math.random() * 12;
          r.animate(
            [
              { translate: `0 0`, scale: 0.2 },
              { translate: `${i}rem ${a}rem`, scale: 1, offset: 0.6 },
              {
                translate: `${i * 1.2}rem ${a + 6}rem`,
                scale: 0.6,
                opacity: 0,
              },
            ],
            {
              duration: 800,
              easing: `cubic-bezier(.2, .8, .4, 1)`,
              fill: `forwards`,
            },
          ).finished.then(
            () => r.remove(),
            () => r.remove(),
          );
        }
    }
    grade(e, t, n) {
      ((this.gradeEl.className = `combo-grade ${e}`),
        (this.gradeEl.textContent = t),
        (this.gradeUntil = performance.now() + 900),
        (this.gradeBanked = !1),
        (this.count = { from: NaN, delta: n, at: performance.now() }),
        this.score.classList.remove(`perfect`, `sloppy`),
        this.score.offsetWidth,
        this.score.classList.add(e));
    }
    endGrade() {
      ((this.gradeUntil = 0), (this.count = null));
    }
    update(e, t = e.bal) {
      let n = e.comboMult,
        r = performance.now();
      if (
        (this.gradeUntil &&
          (n === 0
            ? (this.gradeBanked = !0)
            : this.gradeBanked && this.endGrade(),
          r > this.gradeUntil && this.endGrade()),
        this.gradeUntil && n === 0)
      )
        this.count && this.countScore(r);
      else if (n > 0) {
        !this.gradeUntil &&
          this.gradeEl.className !== `combo-grade` &&
          ((this.gradeEl.className = `combo-grade`),
          this.score.classList.remove(`perfect`, `sloppy`));
        let t = this.seen;
        if (
          t[0] !== n ||
          t[1] !== e.comboTricks ||
          t[2] !== e.ring0 ||
          t[3] !== e.ring1 ||
          t[4] !== e.ring2 ||
          t[5] !== e.ring3 ||
          t[6] !== e.comboBase
        ) {
          ((t[0] = n),
            (t[1] = e.comboTricks),
            (t[2] = e.ring0),
            (t[3] = e.ring1),
            (t[4] = e.ring2),
            (t[5] = e.ring3),
            (t[6] = e.comboBase));
          let r = Math.max(0, n - 8),
            i = [],
            a = [];
          for (let t = r; t < n; t++) {
            let r = yn(e, (e.comboTricks - n + t) & 65535);
            (i.push(Tn(r, (e) => this.layout.gaps?.[e]?.name ?? `Gap`)),
              a.push(!!(hn(r) & 2)));
          }
          let o = i.join(`|`);
          o !== this.lastTricks &&
            ((this.lastTricks = o),
            this.tricks.replaceChildren(r > 0 ? `… + ` : ``),
            i.forEach((e, t) => {
              if ((t && this.tricks.append(` + `), !a[t])) {
                this.tricks.append(e);
                return;
              }
              let r = $(
                `span`,
                t === i.length - 1 && n !== this.lastMult
                  ? `combo-special fresh`
                  : `combo-special`,
              );
              (r.append(fn(`star`), e), this.tricks.append(r));
            }));
          let s = o + e.comboBase;
          s !== this.lastKey &&
            ((this.lastKey = s),
            (this.score.innerHTML = `<b>${e.comboBase.toLocaleString()}</b> <i>×</i> <b class="mult">${n}</b>`),
            n !== this.lastMult && this.pop(this.score),
            (this.lastMult = n));
        }
        (this.count &&
          Number.isNaN(this.count.from) &&
          ((this.count.from = e.comboBase - this.count.delta),
          (this.count.at = r)),
          (this.countTo = e.comboBase),
          this.count && this.countScore(r),
          this.combo.classList.add(`on`));
      } else
        this.combo.classList.contains(`on`) &&
          (this.combo.classList.remove(`on`),
          (this.lastKey = this.lastTricks = ``),
          (this.lastMult = 0),
          this.seen.fill(NaN));
      let i = e.special / 200;
      (i !== this.lastSp &&
        ((this.lastSp = i),
        (this.specialFill.style.transform = `scaleX(${i})`)),
        this.special.classList.toggle(`full`, e.special >= 200));
      let a = e.mode === A.GRIND || e.mode === A.LIP || e.mode === A.MANUAL;
      if ((this.balance.classList.toggle(`on`, a), a)) {
        this.balOn || (this.balTick = e.simTick);
        let n = Math.max(
          -1,
          Math.min(1, e.simTick === this.balTick ? e.bal : t),
        );
        (this.balance.classList.toggle(`vertical`, e.mode === A.MANUAL),
          (this.balNeedle.style.transform = `rotate(${n * 70}deg)`));
        let r = Math.abs(n),
          i = r.toFixed(2);
        (i !== this.lastD &&
          ((this.lastD = i), this.balance.style.setProperty(`--d`, i)),
          this.balance.classList.toggle(`hot`, r > 0.7),
          this.balance.classList.toggle(`still`, kn.reducedMotion));
      } else
        this.balOn && e.mode !== A.BAIL && this.balance.classList.remove(`hot`);
      this.balOn = a;
    }
    countTo = 0;
    countScore(e) {
      let t = this.count;
      if (Number.isNaN(t.from)) return;
      let n = Math.min(1, (e - t.at) / 300),
        r = this.score.querySelector(`b`);
      (r &&
        (r.textContent = Math.round(
          t.from + (this.countTo - t.from) * n,
        ).toLocaleString()),
        n >= 1 && (this.count = null));
    }
    pop(e) {
      (e.classList.remove(`pop`), e.offsetWidth, e.classList.add(`pop`));
    }
    dispose() {
      (this.el.remove(), this.special.remove());
    }
  };
function $(e, t = ``, n = ``) {
  let r = document.createElement(e);
  return (t && (r.className = t), n && (r.textContent = n), r);
}
var ra = Object.assign({
  "./parkModel.ts": () =>
    ne(
      () => import(`./parkModel-D9KlCEyZ.js`),
      __vite__mapDeps([
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
        20,
      ]),
    ),
});
async function ia(e, t) {
  let n = ra[`./parkModel.ts`];
  if (n)
    try {
      return await (await n()).loadPark(e, t);
    } catch (e) {
      console.warn(`[park] baked park unavailable, using recipe mesh`, e);
    }
  let { group: r, zoneOf: i } = Pn(e);
  return {
    group: r,
    zoneOf: i,
    paint: () => {},
    update: () => {},
    rebuild(e) {
      let t = r.children[0],
        n = Pn(e).group.children[0];
      (t.geometry.dispose(), (t.geometry = n.geometry));
    },
    dispose: () => r.removeFromParent(),
  };
}
var aa = [
    {
      secret: `saci`,
      park: `schoolyard`,
      x: 34,
      y: 1.4,
      z: -8,
      nx: 1,
      nz: 0,
      w: 4,
      h: 2,
      lines: [`REDEMOINHO`, `SPIN THREE TIMES ROUND`, `THEN STAND ON ONE LEG`],
      color: `#FF5A36`,
    },
    {
      secret: `curupira`,
      park: `city`,
      x: -44,
      y: 2.1,
      z: -162,
      nx: 0,
      nz: 1,
      w: 6,
      h: 3,
      lines: [`PÉS PRA TRÁS`, `HIS TRACKS RUN BACKWARDS`, `25 IN A ROW`],
      color: `#FF8A1F`,
    },
    {
      secret: `varginha`,
      park: `city`,
      x: -11,
      y: 2.66,
      z: 160,
      nx: 0,
      nz: -1,
      w: 6,
      h: 3,
      lines: [`ABDUZIDO`, `HANG 1.8 SECONDS`, `THEY'RE WATCHING`],
      color: `#1FC7E8`,
    },
    {
      secret: `abominollie`,
      park: `hangar`,
      x: 37,
      y: 5.05,
      z: -25,
      nx: -1,
      nz: 0,
      w: 5,
      h: 2.5,
      lines: [`ONE GIANT OLLIE`, `NO GRABS NO FLIPS NO SPINS`, `28 METRES`],
      color: `#8FD3F5`,
    },
    {
      secret: `itsy`,
      park: `mall`,
      x: -40,
      y: 5,
      z: -0.5,
      nx: 1,
      nz: 0,
      w: 4,
      h: 2,
      lines: [`UP THE WATER SPOUT`, `8 WALLRIDES`, `1 COMBO`],
      color: `#1FC7E8`,
    },
    {
      secret: `grindula`,
      park: `bridge`,
      x: 4,
      y: 1.4,
      z: 10.5,
      nx: 0,
      nz: 1,
      w: 4,
      h: 2,
      lines: [`COUNT TO 13`, `ON THE RAILS`, `BEFORE DAWN`],
      color: `#FF3D7F`,
    },
    {
      secret: `jester`,
      park: `pier`,
      x: 7,
      y: 1.4,
      z: 20.5,
      nx: 0,
      nz: -1,
      w: 4,
      h: 2,
      lines: [`JUGGLE THREE`, `IN ONE AIR`],
      color: `#FFD21F`,
    },
    {
      secret: `chupacabra`,
      park: `plaza`,
      x: 32.5,
      y: 0.75,
      z: -8,
      nx: 0,
      nz: -1,
      w: 3,
      h: 0.7,
      lines: [`TAG THE G.O.A.T.`, `THREE TIMES`],
      color: `#FF5A36`,
    },
    {
      secret: `sentai`,
      park: `warehouse`,
      x: -32,
      y: 1.65,
      z: 17,
      nx: 1,
      nz: 0,
      w: 5,
      h: 2.5,
      lines: [`GATTAI!`, `FLIP GRAB GRIND MANUAL LIP`, `FINISH ON A SPECIAL`],
      color: `#EE2A2A`,
    },
  ],
  oa = (e) => aa.filter((t) => t.park === e && xn(t.secret)),
  sa = null,
  ca = 0.01,
  la = 0.04,
  ua = class {
    group = new i();
    tags = [];
    pxPerM;
    off = null;
    fontReady = !1;
    constructor(e, t = !1) {
      this.pxPerM = t ? 128 : 256;
      for (let t of oa(e)) {
        let e = document.createElement(`canvas`);
        ((e.width = Math.round(t.w * this.pxPerM)),
          (e.height = Math.round(t.h * this.pxPerM)));
        let r = new l(e);
        r.colorSpace = a;
        let i = m({
            map: r,
            transparent: !0,
            depthWrite: !1,
            polygonOffset: !0,
            polygonOffsetFactor: -1,
            polygonOffsetUnits: -4,
          }),
          o = new f(new n(t.w, t.h), i);
        (o.position.set(t.x + t.nx * la, t.y, t.z + t.nz * la),
          (o.rotation.y = Math.atan2(t.nx, t.nz)),
          (o.visible = !1),
          this.group.add(o),
          this.tags.push({ r: t, canvas: e, tex: r, mesh: o, crowned: null }));
      }
      this.tags.length &&
        (tn().then(() => {
          ((this.fontReady = !0), this.paint());
        }),
        (this.off = Xt(() => this.paint())));
    }
    seat(e) {
      let t = new u(),
        n = new p();
      for (let r of this.tags) {
        let { r: i } = r;
        (n.set(i.nx, 0, i.nz),
          t.set(
            new p(i.x + i.nx * 0.4, i.y, i.z + i.nz * 0.4),
            n.clone().negate(),
          ),
          (t.far = 0.6));
        let a = t
          .intersectObject(e, !0)
          .find((e) => e.object !== r.mesh && e.object.visible);
        a && r.mesh.position.copy(a.point).addScaledVector(n, ca);
      }
    }
    update(e, t) {
      if (this.fontReady)
        for (let n of this.tags)
          n.mesh.visible = e.distanceTo(n.mesh.position) < t;
    }
    paint() {
      if (this.fontReady)
        for (let e of this.tags) {
          let t = nn(Zt.profile, e.r.secret);
          t !== e.crowned &&
            ((e.crowned = t), da(e.canvas, e.r, t), (e.tex.needsUpdate = !0));
        }
    }
    dispose() {
      this.off?.();
      for (let e of this.tags)
        (e.mesh.geometry.dispose(), e.mesh.material.dispose(), e.tex.dispose());
      this.group.removeFromParent();
    }
  };
function da(e, t, n) {
  let r = e.getContext(`2d`);
  sa ??= document
    .createElement(`canvas`)
    .getContext(`2d`, { willReadFrequently: !0 });
  let i = e.width,
    a = e.height;
  r.clearRect(0, 0, i, a);
  let o = { ctx: r, octx: sa, font: an, size: 1, color: t.color },
    s = a * 0.16,
    c = [];
  t.lines.forEach((e, t) => {
    let n = a * (t === 0 ? 0.36 : 0.22);
    r.font = sn(o, n);
    let l = r.measureText(e).width * 0.93;
    ((o.size = Math.floor(l > i * 0.92 ? (n * i * 0.92) / l : n)),
      (r.font = sn(o)),
      (s += o.size * 0.92));
    let u = (i - r.measureText(e).width * 0.93) / 2;
    (c.push({ letters: dn(o, e, u, s), size: o.size }), (s += o.size * 0.12));
  });
  for (let e of c) {
    o.size = e.size;
    for (let t of e.letters) $t(o, t, !0);
    if (n) for (let t of e.letters) ln(o, t);
    for (let t of e.letters) en(o, t);
  }
  n && c[0]?.letters.length && ((o.size = c[0].size), un(o, c[0].letters[0]));
}
function fa(e) {
  if (!e.layout.arena) return null;
  let t = e.bounds,
    n = te(e.layout),
    i = [],
    a = [],
    o = [],
    s = (t, r, s, c) => {
      let l = Math.max(1, Math.ceil(Math.hypot(s - t, c - r) / 2)),
        u = i.length / 3;
      for (let a = 0; a <= l; a++) {
        let u = t + ((s - t) * a) / l,
          d = r + ((c - r) * a) / l,
          f = n ? n.y(u, d) : ee(e, u, d);
        (i.push(u, f, d, u, f + 1.6, d), o.push(0.5, 0));
      }
      for (let e = 0; e < l; e++) {
        let t = u + e * 2;
        a.push(t, t + 2, t + 1, t + 1, t + 2, t + 3);
      }
    };
  (s(t.x0, t.z0, t.x1, t.z0),
    s(t.x1, t.z0, t.x1, t.z1),
    s(t.x1, t.z1, t.x0, t.z1),
    s(t.x0, t.z1, t.x0, t.z0));
  let l = new d();
  l.setAttribute(`position`, new c(new Float32Array(i), 3));
  let u = new Float32Array((i.length / 3) * 4);
  for (let e = 0; e < o.length; e++) u.set([1, 0.24, 0.5, o[e]], e * 4);
  (l.setAttribute(`color`, new c(u, 4)), l.setIndex(a));
  let p = new f(
    l,
    new r({ vertexColors: !0, transparent: !0, side: 2, depthWrite: !1 }),
  );
  return (
    (p.name = `arena-fence`),
    (p.userData.noOutline = !0),
    (p.renderOrder = 5),
    p
  );
}
var pa = new e(0.42, 0.56, 28).rotateX(-Math.PI / 2).translate(0, 0.03, 0);
function ma(e, t) {
  let n = new f(
    pa,
    new r({
      color: Mn[e] ?? `#fff`,
      transparent: !0,
      opacity: t ? 0.9 : 0.75,
      side: 2,
      forceSinglePass: !0,
      depthWrite: !1,
    }),
  );
  return ((n.renderOrder = 2), n);
}
function ha(e, t, n) {
  (e.position.copy(t.root.position),
    e.quaternion.copy(t.root.quaternion),
    (e.visible = t.root.visible && n !== A.AIR && n !== A.BAIL));
}
function ga(e, t, n = null) {
  let r = Yt(An(t.skater, t.look));
  return (
    (r.col = n),
    {
      view: r,
      sk: t,
      frame: qt(),
      anim: new ta(t),
      sid: e,
      lastMode: -1,
      ring: ma(t.color, !1),
      lag: 0,
      skips: 0,
    }
  );
}
var _a = 4,
  va = 5,
  ya = new t(),
  ba = new s(),
  xa = new o();
function Sa(e) {
  return ya.setFromProjectionMatrix(
    ba.multiplyMatrices(e.projectionMatrix, e.matrixWorldInverse),
  );
}
function Ca(e, t, n, r = !0, i, a) {
  let o = e.frame,
    s = e.sk;
  ((o.x = t.value(s, `x`)),
    (o.y = t.value(s, `y`)),
    (o.z = t.value(s, `z`)),
    (o.yaw = t.value(s, `yaw`)),
    (o.ux = t.value(s, `ux`)),
    (o.uy = t.value(s, `uy`)),
    (o.uz = t.value(s, `uz`)));
  let c = Math.hypot(o.ux, o.uy, o.uz) || 1;
  ((o.ux /= c), (o.uy /= c), (o.uz /= c));
  let l = t.value(s, `simTick`);
  (Oa(o, e.anim.at(l), l, !1),
    (e.lag += n),
    xa.center.set(o.x, o.y, o.z),
    (xa.radius = va),
    (!a || a.intersectsSphere(xa) || ++e.skips >= _a) &&
      (e.view.animate(o, e.lag), (e.lag = 0), (e.skips = 0)),
    (e.view.root.visible = r),
    e.view.setGhost(i ?? (s.away ? 0.4 : 1)),
    ha(e.ring, e.view, o.mode));
}
function wa(e) {
  (e.anim.dispose(), e.view.dispose(), e.ring.removeFromParent());
}
var Ta = new p(),
  Ea = { x: 0, y: 0, z: 0 },
  Da = class {
    stage;
    net;
    park = null;
    fence = null;
    riddles = null;
    local;
    localView;
    remotes = new Map();
    cam = new In();
    hud;
    localFrame = qt();
    selfSid;
    selfLook;
    opts;
    disposers = [];
    placeholderPark = null;
    lastFade = 1;
    touch = { world: null, each: (e) => this.eachRider(e) };
    localRing;
    lastTarget = ``;
    holdUntil = 0;
    onFrame = () => {};
    camOverride = null;
    onRemoteAdd = () => {};
    onRemoteMode = () => {};
    onRemoteRemove = () => {};
    constructor(e, t, n, r = {}) {
      ((this.stage = e), (this.net = t), (this.opts = r));
      let i = t.room;
      this.selfSid = i.sessionId;
      let a = i.state.skaters.get(i.sessionId);
      ((this.local = new $i(i, t.predict, a, t.world, r.canSkate)),
        (this.local.onWarp = () => this.cut()),
        (this.localView = Yt(An(a.skater, a.look))),
        (this.localView.col = t.world.col),
        (this.selfLook = a.look),
        (this.localRing = ma(a.color, !0)),
        e.scene.add(this.localView.root, this.localRing));
      let o = t.callbacks;
      (this.disposers.push(
        o.onAdd(`skaters`, (n, r) => {
          if (r === i.sessionId || this.remotes.has(r)) return;
          let a = ga(r, n, t.world.col);
          (e.scene.add(a.view.root, a.ring),
            this.remotes.set(r, a),
            this.onRemoteAdd(r, n));
        }),
      ),
        this.disposers.push(
          o.onRemove(`skaters`, (e, t) => {
            let n = this.remotes.get(t);
            n && (wa(n), this.remotes.delete(t), this.onRemoteRemove(t));
          }),
        ),
        (this.hud = new na(n, t.world.layout)),
        (this.cam.col = t.world.col),
        vt &&
          ((this.cam.tune = { ...gt.cam.tune }),
          (this.cam.baseFov = gt.cam.fov)));
    }
    async loadPark(e) {
      ((this.park = await ia(this.net.world.layout, { day: Nn(on()), ...e })),
        this.stage.scene.add(this.park.group),
        this.stage.setLook(yt(this.net.world.layout.id)),
        (this.fence = fa(this.net.world)),
        this.fence && this.stage.scene.add(this.fence),
        (this.riddles = new ua(
          this.net.world.layout.id,
          this.stage.tier.liteScenery,
        )),
        this.riddles.seat(this.park.group),
        this.stage.scene.add(this.riddles.group),
        this.stage.precompile());
    }
    setWorld(e) {
      ((this.net.world = e),
        this.local.setWorld(e),
        (this.localView.col = e.col));
      for (let t of this.remotes.values()) t.view.col = e.col;
      ((this.cam.col = e.col), this.hud.setLayout(e.layout));
    }
    cut() {
      this.cam.inited = !1;
      let e = document.getElementById(`ui`);
      e &&
        (e.classList.remove(`warp-flash`),
        e.offsetWidth,
        e.classList.add(`warp-flash`));
    }
    hitStop(e) {
      this.holdUntil = Math.max(this.holdUntil, performance.now() + e);
    }
    get holding() {
      return performance.now() < this.holdUntil;
    }
    get rails() {
      return this.net.world.rails;
    }
    frame(e, t) {
      Qt();
      let n = this.net.predict.tick(e);
      if ((n > 0 && this.local.step(n), this.holding)) {
        (this.onFrame(0, e), this.stage.render());
        return;
      }
      let r = this.local.state,
        i = this.localFrame;
      ((i.x = this.local.value(`x`)),
        (i.y = this.local.value(`y`)),
        (i.z = this.local.value(`z`)),
        (i.yaw = this.local.value(`yaw`)),
        (i.ux = this.local.value(`ux`)),
        (i.uy = this.local.value(`uy`)),
        (i.uz = this.local.value(`uz`)));
      let a = Math.hypot(i.ux, i.uy, i.uz) || 1;
      ((i.ux /= a),
        (i.uy /= a),
        (i.uz /= a),
        Oa(i, r, this.local.value(`simTick`), cn.isHeld(`grab`)),
        this.localView.animate(i, t),
        (this.localView.root.visible = !this.opts.hidden?.(this.selfSid)),
        ha(this.localRing, this.localView, i.mode));
      let o = this.net.predict,
        s = Sa(this.stage.camera);
      for (let e of this.remotes.values()) {
        Ca(e, o, t, !this.opts.hidden?.(e.sid), void 0, s);
        let n = e.frame.mode;
        n !== e.lastMode &&
          (e.lastMode >= 0 && this.onRemoteMode(e.sid, e.lastMode, n, e.frame),
          (e.lastMode = n));
      }
      let c = this.opts.camTarget?.() ?? this.selfSid,
        l = c === this.selfSid ? void 0 : this.remotes.get(c);
      if (
        (c !== this.lastTarget &&
          (this.lastTarget && this.cut(), (this.lastTarget = c)),
        (this.cam.lookBack = cn.isHeld(`look`)),
        (this.cam.orbit = this.opts.orbit?.() ?? 0),
        !this.camOverride?.(t))
      ) {
        if (l) {
          let e = l.anim.at(o.value(l.sk, `simTick`));
          (this.cam.update(this.stage.camera, l.frame, e.vx, e.vz, t),
            this.stage.followShadow(
              Ta.set(l.frame.x, l.frame.y, l.frame.z),
              8,
            ));
        } else {
          ((this.cam.ridePiece = r.lastPiece),
            this.cam.update(this.stage.camera, i, r.vx, r.vz, t),
            this.stage.followShadow(Ta.set(i.x, i.y, i.z), 8));
          let e = 1 - this.cam.closeness * 0.65;
          (Math.abs(e - this.lastFade) > 0.02 ||
            (e === 1 && this.lastFade !== 1)) &&
            (this.localView.setGhost(e), (this.lastFade = e));
        }
      }
      (this.hud.update(r, this.local.value(`bal`)),
        (this.touch.world = this.net.world),
        this.park?.update(
          t,
          this.stage.camera.position,
          this.stage.tier.drawDist,
          this.touch,
        ),
        this.riddles?.update(
          this.stage.camera.position,
          this.stage.tier.drawDist,
        ),
        this.onFrame(t, e),
        this.stage.render());
    }
    anchor(e, t) {
      if (e === this.selfSid)
        return this.localView.root.visible
          ? (this.localView.headAnchor(t), !0)
          : !1;
      let n = this.remotes.get(e);
      return !n || !n.view.root.visible ? !1 : (n.view.headAnchor(t), !0);
    }
    posOf(e) {
      return e === this.selfSid
        ? this.localFrame
        : (this.remotes.get(e)?.frame ?? null);
    }
    eachRider(e) {
      this.localView.root.visible &&
        e(this.selfSid, this.localFrame, this.selfLook);
      for (let t of this.remotes.values())
        t.view.root.visible && e(t.sid, t.frame, t.sk.look);
    }
    viewOf(e) {
      return e === this.selfSid
        ? this.localView
        : (this.remotes.get(e)?.view ?? null);
    }
    dispose() {
      for (let e of this.disposers) e();
      (this.local.dispose(), this.localView.dispose());
      for (let e of this.remotes.values()) wa(e);
      (this.localRing.removeFromParent(),
        this.remotes.clear(),
        this.park?.dispose(),
        this.riddles?.dispose(),
        this.fence &&
          (this.fence.removeFromParent(),
          this.fence.geometry.dispose(),
          this.fence.material.dispose()),
        this.stage.setLook(_t),
        this.placeholderPark?.removeFromParent(),
        this.hud.dispose(),
        this.net.predict.dispose());
    }
  };
function Oa(e, t, n, r) {
  ((e.mode = t.mode),
    (e.trickId = t.trickId),
    (e.trickT = Math.max(0, (n - t.trickTick) / 30)),
    (e.modeT = Math.max(0, (n - t.modeTick) / 30)),
    (e.crouch = t.crouch / 12),
    (e.bal = t.bal),
    (e.speed = Math.hypot(t.vx, t.vy, t.vz)),
    (e.vx = t.vx),
    (e.vy = t.vy),
    (e.vz = t.vz),
    M(t.yaw, t.ux, t.uy, t.uz, Ea),
    (e.fakie = t.vx * Ea.x + t.vy * Ea.y + t.vz * Ea.z < -0.5),
    (e.grabHeld = r || (D[t.trickId]?.kind === O.GRAB && t.trickEnd === 0)),
    (e.slide = t.mode === A.GROUND && (t.xfer & j.SLIDE) !== 0),
    (e.planted = t.mode === A.GROUND && !t.rolling && e.speed < 0.05),
    (e.spin = t.mode === A.AIR ? t.yaw - t.airYaw0 : 0));
}
export {
  Hi as _,
  ga as a,
  In as b,
  ia as c,
  Z as d,
  Li as f,
  zi as g,
  Ui as h,
  Oa as i,
  na as l,
  Gi as m,
  Ca as n,
  Sa as o,
  Ii as p,
  wa as r,
  fa as s,
  Da as t,
  Q as u,
  Ri as v,
  Ln as y,
};
