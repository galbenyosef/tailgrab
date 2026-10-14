// assets/skaterRig-CvzHL-r4 02 — copy
// Lines 332-680 of readable/assets/skaterRig-CvzHL-r4.pretty.js (statement-aligned).
var FrameSampler = class {
  q;
  v;
  shownQ;
  prevQ;
  srcQ;
  srcW;
  shownV;
  prevV;
  srcV;
  srcU;
  next = 0;
  dur = 0;
  t = 0;
  lastDt = 0;
  frames = 0;
  constructor(e, t) {
    ((this.q = e), (this.v = t));
    let r = () => e.map(() => new n()),
      i = (e) => Array.from({ length: e }, () => new f());
    ((this.shownQ = r()),
      (this.prevQ = r()),
      (this.srcQ = r()),
      (this.srcW = i(e.length)),
      (this.shownV = i(t.length)),
      (this.prevV = i(t.length)),
      (this.srcV = i(t.length)),
      (this.srcU = i(t.length)));
  }
  request(e) {
    e > 0 ? (this.next = e) : this.cut();
  }
  cut() {
    ((this.next = 0), (this.dur = 0));
  }
  reframe(e, t, n) {
    for (let n of t)
      for (let t of [this.shownQ, this.prevQ, this.srcQ]) t[n].premultiply(e);
    for (let n of t) this.srcW[n].applyQuaternion(e);
    for (let t of n)
      for (let n of [this.shownV, this.prevV, this.srcV, this.srcU])
        n[t].applyQuaternion(e);
  }
  apply(e) {
    let { q: t, v: n } = this;
    if (this.next > 0 && this.frames > 0) {
      let e = this.frames > 1 ? this.lastDt : 0;
      for (let n = 0; n < t.length; n++)
        (this.srcQ[n].copy(this.shownQ[n]),
          e > 0
            ? et(this.prevQ[n], this.shownQ[n], e, this.srcW[n])
            : this.srcW[n].set(0, 0, 0));
      for (let t = 0; t < n.length; t++) {
        this.srcV[t].copy(this.shownV[t]);
        let n = this.srcU[t];
        (e > 0
          ? n.subVectors(this.shownV[t], this.prevV[t]).divideScalar(e)
          : n.set(0, 0, 0),
          n.length() > $e && n.setLength($e));
      }
      ((this.dur = this.next), (this.t = 0));
    }
    if (((this.next = 0), this.dur > 0)) {
      this.t += e;
      let r = 1 - Xe(this.t / this.dur);
      if (r >= 1) this.dur = 0;
      else {
        let e = (1 - Math.exp(-20 * this.t)) / Ze;
        for (let n = 0; n < t.length; n++) {
          let i = this.srcW[n],
            a = i.length() * e;
          (a > 1e-9
            ? T.setFromAxisAngle(Ke.copy(i).normalize(), a).multiply(
                this.srcQ[n],
              )
            : T.copy(this.srcQ[n]),
            t[n].copy(T.slerp(t[n], r)));
        }
        for (let t = 0; t < n.length; t++)
          n[t].lerp(
            Ke.copy(this.srcV[t]).addScaledVector(this.srcU[t], e),
            1 - r,
          );
      }
    }
    for (let e = 0; e < t.length; e++)
      (this.prevQ[e].copy(this.shownQ[e]), this.shownQ[e].copy(t[e]));
    for (let e = 0; e < n.length; e++)
      (this.prevV[e].copy(this.shownV[e]), this.shownV[e].copy(n[e]));
    ((this.lastDt = e), (this.frames = Math.min(this.frames + 1, 2)));
  }
};
function makeTrick(e, t, n) {
  n.set(0, 0, 0);
  let r = e.name.includes(`Double`) ? 2 : 1;
  switch (
    e.clip.startsWith(`special-flip`)
      ? `special-flip`
      : e.clip.startsWith(`special-spin`)
        ? `special-spin`
        : e.clip
  ) {
    case `flip-kick`:
      return (
        (n.z = C * r * t),
        e.name.includes(`Hardflip`)
          ? (n.y = Math.PI * t)
          : e.name.includes(`Varial`) && (n.y = -Math.PI * t),
        !0
      );
    case `flip-heel`:
      return (
        (n.z = -C * r * t),
        e.name.includes(`Varial`) && (n.y = Math.PI * t),
        !0
      );
    case `flip-hard`:
      return ((n.z = C * t), (n.y = Math.PI * t), !0);
    case `flip-varial-kick`:
      return ((n.z = C * t), (n.y = -Math.PI * t), !0);
    case `flip-varial-heel`:
      return ((n.z = -C * t), (n.y = Math.PI * t), !0);
    case `flip-tre`:
      return ((n.z = C * t), (n.y = -C * t), !0);
    case `flip-shove`:
      return (
        (n.y =
          -Math.PI *
          t *
          (e.name.includes(`540`) ? 3 : e.name.includes(`360`) ? 2 : 1)),
        !0
      );
    case `flip-impossible`:
      return ((n.x = -C * r * t), !0);
    case `special-flip`:
      return (
        e.name.includes(`Tailwhip`)
          ? (n.y = -C * 2 * t)
          : e.name.includes(`Hardflip`)
            ? ((n.z = C * t), (n.y = Math.PI * t))
            : (n.z = e.name.includes(`Heelflip`) ? -C * 2 * t : C * 2 * t),
        !0
      );
    case `special-spin`:
      return e.name.includes(`Kickflip`)
        ? ((n.z = C * w(Math.min(1, Math.max(0, (t - 0.2) / 0.5)))), !0)
        : !1;
  }
  return !1;
}
var nt = class {
    back = !1;
    def = null;
    p = 0;
    lastT = 0;
    rate = 0;
    fix = new n();
    fixT = -1;
    update(e, t, n) {
      let r = se[t.trickId];
      if (
        t.mode === v.AIR &&
        r &&
        (r.kind === g.FLIP || r.kind === g.SPECIAL_AIR) &&
        makeTrick(r, 0, k)
      ) {
        let e = Math.min(1, t.trickT / Math.max(r.ticks / 30, 0.001));
        (this.def && (this.rate > 0 || t.trickT + 1e-4 < this.lastT)
          ? this.fold()
          : this.def &&
            this.def !== r &&
            (this.fix.setFromEuler((makeTrick(r, w(e), k), k)).invert(),
            this.fix.premultiply(
              T.setFromEuler((makeTrick(this.def, w(this.p), k), k)),
            ),
            (this.fixT = 0)),
          (this.def = r),
          (this.p = e),
          (this.lastT = t.trickT));
      } else if (this.def) {
        if (this.rate === 0 && this.p < 1) {
          let e = this.def.ticks / 30;
          this.rate =
            (1 - this.p) / Math.max(0.05, Math.min(0.15, (1 - this.p) * e));
        }
        ((this.p = Math.min(1, this.p + this.rate * n)),
          this.p >= 1 && this.fold());
      }
      if (
        (e.identity(),
        this.def && e.setFromEuler((makeTrick(this.def, w(this.p), k), k)),
        this.fixT >= 0)
      ) {
        let t = Xe(this.fixT / Ye);
        ((this.fixT = t > 0 ? this.fixT + n : -1),
          e.premultiply(T.identity().slerp(this.fix, t)));
      }
      this.back && e.multiply(Je);
    }
    reset() {
      ((this.back = !1),
        (this.def = null),
        (this.p = this.rate = 0),
        (this.fixT = -1));
    }
    fold() {
      (makeTrick(this.def, 1, k),
        Math.round(k.y / Math.PI) & 1 && (this.back = !this.back),
        (this.def = null),
        (this.p = this.rate = 0),
        (this.fixT = -1));
    }
  },
  rt = 0.15,
  it = 10,
  at = 13,
  ot = 0.06,
  st = 1.5,
  PoseBlend = class {
    lastP = new f();
    lastQ = new n();
    lastUp = new f();
    shownP = new f();
    shownQ = new n();
    turnQ = new n();
    offP = new f();
    offQ = new n();
    pace = new f();
    mode = -1;
    t = -1;
    init = !1;
    keepTurn = !1;
    skip() {
      this.keepTurn = !0;
    }
    apply(e, t, n, r, i) {
      qe.set(0, 1, 0).applyQuaternion(t);
      let a = !this.init || e.distanceToSquared(this.lastP) > st * st;
      if (a) ((this.t = -1), this.pace.set(0, 0, 0));
      else if (r > 0) {
        (O.subVectors(e, this.lastP),
          E.copy(this.pace).multiplyScalar(r),
          D.set(n.vx, n.vy, n.vz).multiplyScalar(r).sub(E));
        let a = D.lengthSq(),
          o =
            a > 1e-12
              ? Math.max(0, Math.min(1, Ke.subVectors(O, E).dot(D) / a))
              : 0;
        E.addScaledVector(D, o);
        let s = O.distanceTo(E),
          c = this.lastQ.angleTo(t) / r,
          l = this.lastUp.angleTo(qe) / r;
        n.mode !== this.mode ||
        s > ot ||
        l > it ||
        (!i && c > (n.mode === v.AIR ? at : it))
          ? (this.offP.copy(this.shownP).add(E).sub(e),
            this.offQ
              .copy(t)
              .invert()
              .premultiply(this.shownQ)
              .premultiply(this.turnQ),
            (this.t = 0),
            this.pace.copy(E).divideScalar(r))
          : this.pace.copy(O).divideScalar(r);
      }
      (this.lastP.copy(e),
        this.lastQ.copy(t),
        this.lastUp.copy(qe),
        (this.mode = n.mode),
        (this.init = !0));
      let o = this.keepTurn;
      if (((this.keepTurn = !1), o && this.offQ.identity(), this.t >= 0)) {
        let n = Xe(this.t / rt);
        ((this.t += r),
          n <= 0
            ? (this.t = -1)
            : (e.addScaledVector(this.offP, n),
              t.premultiply(T.identity().slerp(this.offQ, n))));
      }
      (a || o
        ? this.turnQ.identity()
        : r > 0 &&
          this.turnQ.copy(this.shownQ).invert().premultiply(t).normalize(),
        this.shownP.copy(e),
        this.shownQ.copy(t));
    }
  },
  lt = `/`.replace(/\/?$/, `/`),
  ut = new i(new f(0, 0.6, 0), 3);
function parseClips(e) {
  let t = new Map();
  for (let n of e) {
    let e = ne.parse(n);
    t.set(e.name, e);
  }
  return t;
}
var ft = null;
function loadSkaterAssets() {
  return (
    (ft ??= Promise.all([
      fetch(`${lt}skaters/clips.json`).then((e) => {
        if (!e.ok) throw Error(`skaters/clips.json: ${e.status}`);
        return e.json();
      }),
      SkaterKit.load(),
    ]).then(([e, t]) => ({ kit: t, clips: parseClips(e) }))),
    ft
  );
}
var j = { x: 0, y: 0, z: 0 },
  M = new s(),
  mt = new f(),
  N = new f(),
  ht = new f(),
  P = new n(),
  F = new f(),
  gt = new f(0, 1, 0),
  _t = new f(0, 0, 1),
  I = (e) => e * e * (3 - 2 * e),
  vt = 1.4,
  yt = 2,
  L = new s(),
  R = new f(),
  z = new n(),
  bt = new f(),
  xt = new f(),
  B = new f(),
  V = new f(),
  H = new f(),
  St = new n(),
  Ct = new n(),
  wt = new n(),
  U = new s(),
  Tt = new s(),
  W = new f(),
  G = new n(),
  K = new f(),
  q = new f(),
  J = new f(),
  Y = new f(),
  X = new f(),
  Et = new n(),
  Dt = new s(),
  Ot = new s(),
  kt = new s(),
  At = 0.2,
  jt = 0.5;
