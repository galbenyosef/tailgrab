// assets__session-DxCN6jDh 02 — math
// Lines 220-566 of readable/assets__session-DxCN6jDh.pretty.js (statement-aligned).
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
