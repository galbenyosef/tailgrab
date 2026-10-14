import {
  S as e,
  Ut as t,
  V as n,
  Zn as r,
  bt as i,
  f as a,
  s as o,
  xt as s,
  yr as c,
} from "./three.core-DVWDmH0S.js";
import { a as l } from "./toon-CycGToy9.js";
import "./tuning-D4mSK766.js";
import { u } from "./palette-DQTkVEn_.js";
import { J as d, K as f, c as p } from "./table-W1plLavt.js";
import { c as m, g as h } from "./types-DM-HODfo.js";
function g() {
  return {
    x: 0,
    y: 0,
    z: 0,
    yaw: 0,
    ux: 0,
    uy: 1,
    uz: 0,
    mode: 0,
    trickId: 0,
    trickT: 0,
    modeT: 0,
    crouch: 0,
    bal: 0,
    speed: 0,
    vx: 0,
    vy: 0,
    vz: 0,
    fakie: !1,
    grabHeld: !1,
    slide: !1,
    planted: !1,
    spin: 0,
  };
}
var _ = 0.3,
  v = 0.3,
  y = (e) => e === m.GROUND || e === m.MANUAL,
  b = Math.PI / 2,
  x = class {
    off = 0;
    size = 0;
    off0 = 0;
    t = 0;
    yaw = NaN;
    mode = -1;
    last = { x: 0, y: 0, z: 0, ux: 0, uy: 1, uz: 0 };
    get progress() {
      return this.size ? Math.min(1, this.t / _) : 1;
    }
    update(e, t) {
      let n = this.last,
        r = e.yaw - this.yaw,
        i = e.x - n.x,
        a = e.y - n.y,
        o = e.z - n.z;
      if (
        Number.isNaN(r) ||
        i * i + a * a + o * o > 2.25 ||
        (e.mode === m.WALK && this.mode !== m.WALK)
      )
        this.off = this.off0 = this.size = 0;
      else if (
        e.ux * n.ux + e.uy * n.uy + e.uz * n.uz > 0.98 &&
        ((y(e.mode) &&
          y(this.mode) &&
          Math.abs(r) > Math.max(v, 10.2 * 1.2 * t)) ||
          (e.mode === m.GRIND && this.mode === m.GRIND && Math.abs(r) > b))
      )
        ((this.off0 = this.off - r),
          (this.off = this.off0),
          (this.size = Math.abs(this.off0)),
          (this.t = 0));
      else if (this.size) {
        this.t += t;
        let e = Math.min(1, this.t / _);
        this.off =
          e >= 1 ? (this.off0 = this.size = 0) : this.off0 * (1 - e) ** 3;
      }
      return (
        (this.yaw = e.yaw),
        (this.mode = e.mode),
        (n.x = e.x),
        (n.y = e.y),
        (n.z = e.z),
        (n.ux = e.ux),
        (n.uy = e.uy),
        (n.uz = e.uz),
        e.yaw + this.off
      );
    }
  },
  S = { x: 0, y: 0, z: 0 },
  C = new i(),
  w = new c(),
  T = new c(),
  E = new c(),
  D = new t(),
  O = new t();
function k(e, t, n) {
  if (t.mode === m.LIP) return n.set(-1, 0, 0);
  n.set(t.vx, t.vy, t.vz).applyQuaternion(O.copy(e).invert());
  let r = Math.hypot(n.x, n.z);
  return r > 0.5 ? n.set(n.x / r, 0, n.z / r) : n.set(0, 0, 1);
}
var A = class {
  root = new n();
  squash = new n();
  body = new n();
  board = new n();
  boardFlip = new n();
  head;
  goofy;
  landPulse = 0;
  lastMode = -1;
  turn = new x();
  constructor(t) {
    this.goofy = t.stance === `goofy`;
    let i = t.c,
      c = (e) => l({ color: u(e) }),
      d = c(i.fur),
      f = c(i.accent),
      p = c(i.top),
      m = c(i.bottom),
      h = c(i.shoes),
      g = c(i.hat),
      _ = new s(new o(0.26, 0.035, 0.82), c(i.deck0));
    _.position.y = 0.1;
    let v = new s(new o(0.25, 0.01, 0.78), c(`#2B2533`));
    ((v.position.y = 0.122), this.boardFlip.add(_, v));
    for (let t of [-0.27, 0.27]) {
      let n = new s(new o(0.2, 0.04, 0.05), c(`#C9D6F2`));
      (n.position.set(0, 0.065, t), this.boardFlip.add(n));
      for (let n of [-0.11, 0.11]) {
        let r = new s(new e(0.035, 0.035, 0.04, 10), c(i.deck1));
        ((r.rotation.z = Math.PI / 2),
          r.position.set(n, 0.035, t),
          this.boardFlip.add(r));
      }
    }
    ((this.boardFlip.position.y = 0), this.board.add(this.boardFlip));
    let y = new s(new a(0.11, 0.18, 4, 10), m);
    y.position.y = 0.33;
    let b = new s(new a(0.17, 0.12, 4, 12), p);
    b.position.y = 0.58;
    let x = new n();
    x.position.y = 0.9;
    let S = new s(new r(0.24, 18, 14), d);
    S.scale.set(1, 0.92, 0.95);
    let C = new s(new r(0.1, 12, 10), f);
    (C.position.set(0, -0.05, 0.19), C.scale.set(1.2, 0.8, 0.9), x.add(S, C));
    for (let e of [-1, 1]) {
      let t = new s(new r(0.035, 8, 8), c(`#1D1A3A`));
      (t.position.set(e * 0.09, 0.03, 0.2), x.add(t));
      let n = new s(new r(0.08, 10, 8), d);
      (n.position.set(e * 0.17, 0.2, -0.02),
        n.scale.set(0.8, 1.2, 0.6),
        x.add(n));
    }
    if (t.hat !== `none`) {
      let e = new s(new r(0.255, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2), g);
      ((e.position.y = 0.03), x.add(e));
    }
    this.head = x;
    let w = new s(new a(0.05, 0.22, 4, 8), d);
    (w.position.set(-0.21, 0.56, 0), (w.rotation.z = 0.5));
    let T = w.clone();
    ((T.position.x = 0.21), (T.rotation.z = -0.5));
    let E = new s(new o(0.16, 0.08, 0.5), h);
    ((E.position.y = 0.17),
      this.body.add(y, b, x, w, T, E),
      (this.body.rotation.y = this.goofy ? -Math.PI / 2 : Math.PI / 2));
    for (let e of [this.body, this.board])
      e.traverse((e) => {
        e.isMesh && (e.castShadow = !0);
      });
    (this.squash.add(this.body, this.board), this.root.add(this.squash));
  }
  setPose(e, t = e.yaw) {
    (this.root.position.set(e.x, e.y, e.z),
      h(t, e.ux, e.uy, e.uz, S),
      T.set(e.ux, e.uy, e.uz),
      E.set(S.x, S.y, S.z),
      w.crossVectors(T, E),
      C.makeBasis(w, T, E),
      D.setFromRotationMatrix(C),
      this.root.quaternion.copy(D));
  }
  animate(e, t) {
    this.setPose(e, this.turn.update(e, t));
    let n = e.trickT,
      r = f[e.trickId];
    (this.boardFlip.rotation.set(0, 0, 0),
      this.board.position.set(0, 0, 0),
      this.body.position.set(0, 0, 0),
      (this.body.rotation.x = 0),
      (this.body.rotation.z = 0),
      (this.body.rotation.y =
        e.mode === m.WALK ? 0 : this.goofy ? -Math.PI / 2 : Math.PI / 2));
    let i = e.crouch;
    switch (
      (e.mode !== this.lastMode &&
        (e.mode === m.GROUND &&
          (this.lastMode === m.AIR || this.lastMode === m.GRIND) &&
          (this.landPulse = 1),
        (this.lastMode = e.mode)),
      e.mode)
    ) {
      case m.AIR:
        if (((i = 0.6), r && (r.kind === p.FLIP || r.kind === p.SPECIAL_AIR))) {
          let e = Math.min(1, n / (r.ticks / 30)),
            t = r.name.includes(`Double`) ? 2 : 1;
          (r.clip === `flip-shove` || r.clip.startsWith(`special-spin`)
            ? (this.boardFlip.rotation.y =
                e *
                Math.PI *
                (r.name.includes(`360`) || r.name.includes(`540`) ? 2 : 1) *
                (r.name.includes(`540`) ? 1.5 : 1))
            : r.clip === `flip-impossible`
              ? (this.boardFlip.rotation.x = e * Math.PI * 2 * t)
              : (this.boardFlip.rotation.z =
                  e * Math.PI * 2 * t * (r.clip.includes(`heel`) ? -1 : 1)),
            (this.board.position.y = Math.sin(e * Math.PI) * 0.18),
            (i = 0.8));
        } else
          r &&
            r.kind === p.GRAB &&
            ((this.board.position.y = 0.15),
            (i = 1),
            (this.body.rotation.z = 0.25));
        break;
      case m.GRIND:
      case m.LIP:
        ((i = 0.4),
          k(this.root.quaternion, e, w),
          this.body.quaternion.premultiply(D.setFromAxisAngle(w, e.bal * 0.6)));
        break;
      case m.MANUAL:
        ((this.boardFlip.rotation.x = -0.25 * (d(e.trickId) ? 1 : -1)),
          k(this.root.quaternion, e, w),
          this.body.quaternion.premultiply(
            D.setFromAxisAngle(w.set(w.z, 0, -w.x), -e.bal * 0.4),
          ));
        break;
      case m.WALK:
        (this.board.position.set(this.goofy ? -0.3 : 0.3, 0.12, 0),
          (this.boardFlip.rotation.z = Math.PI / 2));
        break;
      case m.BAIL: {
        let t = Math.min(1, e.modeT / 0.6);
        ((this.body.rotation.z = t * 1.4),
          (this.body.position.y = -t * 0.25),
          this.board.position.set(0.3 * t, 0, 0.4 * t),
          (this.boardFlip.rotation.z = t * 2.5));
        break;
      }
    }
    this.landPulse = Math.max(0, this.landPulse - t * 5);
    let a = 1 - i * 0.18 - this.landPulse * 0.22;
    this.body.scale.set(1 + (1 - a) * 0.5, a, 1 + (1 - a) * 0.5);
  }
  setGhost(e) {
    let t = e < 0.99;
    this.root.traverse((n) => {
      let r = n;
      if (!r.isMesh) return;
      let i = r.material;
      ((i.transparent = t), (i.opacity = e), (i.depthWrite = !t));
    });
  }
  playEmote(e) {
    this.landPulse = 1;
  }
  playPose() {
    this.landPulse = 1;
  }
  headAnchor(e) {
    return this.head.getWorldPosition(e).add(T.set(0, 0.45, 0));
  }
  dispose() {
    (this.root.traverse((e) => {
      let t = e;
      t.isMesh && (t.geometry.dispose(), t.material.dispose());
    }),
      this.root.removeFromParent());
  }
};
export { g as i, x as n, k as r, A as t };
