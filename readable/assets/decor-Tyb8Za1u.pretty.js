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
var j = {
    kick: 1.15,
    maxSpeed: 8.5,
    lift: 0.12,
    liftMax: 1.6,
    tumble: 1.3,
    tumbleMax: 9,
    spin: 2.5,
    bump: 0.35,
    rest: 0.06,
    still: 0.3,
    wait: 1.5,
    maxLoose: 6,
    fall: 3,
    clear: 1.2,
    out: 0.18,
    in: 0.38,
    hear: 30,
  },
  M = (e, t, n, r, i) =>
    Array.from({ length: e }, (a, o) => [
      t * Math.cos((2 * Math.PI * o) / e),
      n,
      t * Math.sin((2 * Math.PI * o) / e),
      r,
      i,
    ]),
  pe = {
    cone: {
      pts: [
        [0.2, 0.03, 0.2, 0.03, 0.6],
        [-0.2, 0.03, 0.2, 0.03, 0.6],
        [-0.2, 0.03, -0.2, 0.03, 0.6],
        [0.2, 0.03, -0.2, 0.03, 0.6],
        [0, 0.53, 0, 0.03, 2],
      ],
      bottom: [0, 1, 2, 3],
      top: [4],
      xp: [0, 3],
      xn: [1, 2],
      r0: 0.18,
      r1: 0.05,
      mu: 0.9,
      spinDamp: 1.2,
      roll: 1.6,
    },
    trash_can: {
      pts: [
        ...M(6, 0.24, 0.035, 0.035, 1),
        ...M(6, 0.28, 0.68, 0.035, 1),
        [0, 0.84, 0, 0.045, 1.5],
      ],
      bottom: [0, 1, 2, 3, 4, 5],
      top: [6, 7, 8, 9, 10, 11],
      xp: [0],
      xn: [3],
      r0: 0.27,
      r1: 0.31,
      mu: 0.8,
      spinDamp: 2,
      roll: 3.5,
    },
  },
  N = 0,
  P = 1,
  F = 2,
  I = 3,
  me = [
    [0.1, -0.32, 0.13],
    [0.1, 0, 0.13],
    [0.1, 0.32, 0.13],
    [b, 0, x + 0.03],
    [S, 0, y],
  ],
  he = [
    [0.15, 0.1, 0.16],
    [C, 0, x],
    [S, 0, y],
  ],
  ge = 1.6,
  _e = 3,
  L = new c(),
  R = new c(),
  z = new c(),
  B = new c(),
  V = new c(),
  H = new c(),
  U = new c(),
  W = new c(),
  G = { x: 0, y: 0, z: 1 },
  K = new n(),
  ve = new n(),
  ye = new n(),
  be = new e(),
  xe = new c(0, 1, 0),
  Se = new Float64Array(16);
function q(e, t, n) {
  n.set(0, 0, 0);
  for (let r of t)
    ((n.x += e[r * 3]), (n.y += e[r * 3 + 1]), (n.z += e[r * 3 + 2]));
  return n.multiplyScalar(1 / t.length);
}
var Ce = class {
  group = new t();
  bodies = [];
  meshes = [];
  riders = [];
  nRiders = 0;
  last = new Map();
  seen = new Set();
  world = null;
  dt = 0;
  eye = null;
  sound;
  rand;
  ground = (e, t) => {
    let n = this.world?.lawn;
    return !n ||
      (e >= n.rect.x0 && e <= n.rect.x1 && t >= n.rect.z0 && t <= n.rect.z1)
      ? -1 / 0
      : v(n, e, t);
  };
  constructor(e, t, n, r = null, i = Math.random) {
    ((this.sound = r), (this.rand = i), (this.group.name = `loose`));
    let a = new Map();
    for (let n of e) {
      if (!pe[n.prop] || !t(n.prop)) continue;
      let e = a.get(n.prop);
      e ? e.push(n) : a.set(n.prop, [n]);
    }
    for (let [e, r] of a) {
      let i = new o(t(e), n, r.length);
      ((i.name = `loose:${e}`),
        (i.castShadow = !0),
        (i.customDepthMaterial = f),
        (i.receiveShadow = !0),
        (i.frustumCulled = !1),
        this.group.add(i),
        this.meshes.push(i),
        r.forEach((t, n) => this.bodies.push(this.body(t, pe[e], i, n))));
    }
    for (let e of this.bodies) this.draw(e);
  }
  body(e, t, r, i) {
    let a = t.pts.length,
      o = new te(a),
      s = new n().compose(
        B.set(e.x, e.y, e.z),
        be.setFromAxisAngle(xe, e.rot),
        V.setScalar(e.s),
      ),
      l = new Float64Array(a),
      u = new c();
    t.pts.forEach(([t, n, r, i, c], d) => {
      ((u.x += t / a),
        (u.y += n / a),
        (u.z += r / a),
        H.set(t, n, r).applyMatrix4(s),
        o.set(d, H.x, H.y, H.z),
        (o.r[d] = i * e.s),
        (o.w[d] = c),
        (l[d] = 1 / c));
    });
    for (let e = 0; e < a; e++) for (let t = e + 1; t < a; t++) o.stick(e, t);
    ((o.drag = 0.15),
      (o.spinDamp = t.spinDamp),
      o.mu.fill(t.mu),
      o.e.fill(0.3),
      (o.planeY = e.y),
      (o.ground = this.ground),
      o.o.set(o.p));
    let d = {
      item: e,
      shape: t,
      mesh: r,
      slot: i,
      v: o,
      m: l,
      mass: l.reduce((e, t) => e + t, 0),
      phase: N,
      t: 0,
      rest: 0,
      still: 0,
      asleep: !0,
      drawn: !1,
      home: s,
      homeP: Float64Array.from(o.p),
      homeC: u.clone().applyMatrix4(s),
      c0: u,
      near: [],
      touching: new Set(),
      touched: new Set(),
      sub: 0,
      popR: new n(),
      popC: new c(),
    };
    return ((o.pre = (e) => this.contact(d, e)), d);
  }
  update(e, t, n) {
    if (e <= 0 || !this.bodies.length) return;
    ((this.dt = e),
      (this.eye = n ?? null),
      (this.world = t?.world ?? null),
      this.gather(t));
    for (let t of this.bodies) this.frame(t, e);
    this.bump();
    let r = !1;
    for (let e of this.bodies) this.draw(e) && (r = !0);
    if (r) for (let e of this.meshes) e.instanceMatrix.needsUpdate = !0;
  }
  state() {
    return this.bodies.map(
      (e) => (
        this.axes(e, e.v.p),
        {
          prop: e.item.prop,
          d: this.center(e, e.v.p, H).distanceTo(e.homeC),
          up: R.y,
          phase: e.phase,
        }
      ),
    );
  }
  dispose() {
    this.group.removeFromParent();
    for (let e of this.meshes) e.dispose();
  }
  gather(e) {
    ((this.nRiders = 0),
      this.seen.clear(),
      e?.each((e, t) => {
        let n = this.riders[this.nRiders];
        (n ||
          this.riders.push(
            (n = {
              key: ``,
              ax: 0,
              ay: 0,
              az: 0,
              bx: 0,
              by: 0,
              bz: 0,
              ux: 0,
              uy: 1,
              uz: 0,
              fx: 0,
              fy: 0,
              fz: 1,
              vx: 0,
              vy: 0,
              vz: 0,
              walk: !1,
            }),
          ),
          this.nRiders++,
          (n.key = e),
          (n.bx = t.x),
          (n.by = t.y),
          (n.bz = t.z));
        let r = this.last.get(e),
          i = !!r && Math.hypot(t.x - r.x, t.y - r.y, t.z - r.z) <= _e;
        ((n.ax = i ? r.x : t.x),
          (n.ay = i ? r.y : t.y),
          (n.az = i ? r.z : t.z),
          (n.ux = t.ux),
          (n.uy = t.uy),
          (n.uz = t.uz),
          k(t.yaw, t.ux, t.uy, t.uz, G),
          (n.fx = G.x),
          (n.fy = G.y),
          (n.fz = G.z),
          (n.vx = t.vx),
          (n.vy = t.vy),
          (n.vz = t.vz),
          (n.walk = t.mode === O.WALK),
          r
            ? ((r.x = t.x), (r.y = t.y), (r.z = t.z))
            : this.last.set(e, { x: t.x, y: t.y, z: t.z }),
          this.seen.add(e));
      }));
    for (let e of this.last.keys()) this.seen.has(e) || this.last.delete(e);
  }
  frame(e, t) {
    if (((e.t += t), e.phase === F)) {
      e.t >= j.out &&
        (this.reset(e), this.go(e, I), this.say(e, `pop`, 0.6, e.homeC));
      return;
    }
    if (e.phase === I) {
      e.t >= j.in && this.go(e, N);
      return;
    }
    ((e.near.length = 0), this.center(e, e.v.p, H));
    for (let t = 0; t < this.nRiders; t++) {
      let n = this.riders[t];
      H.y < Math.min(n.ay, n.by) - 1 ||
        H.y > Math.max(n.ay, n.by) + 2.2 ||
        (Ee(H.x, H.z, n.ax, n.az, n.bx, n.bz) < ge * ge && e.near.push(t));
    }
    if ((e.near.length && e.asleep && this.wake(e), e.asleep))
      e.touching.clear();
    else {
      ((e.sub = 0),
        e.touched.clear(),
        (e.v.col = this.world?.col ?? null),
        e.v.step(t),
        ([e.touching, e.touched] = [e.touched, e.touching]),
        (e.drawn = !1),
        this.roll(e, t),
        e.v.impact > 2.5 && this.say(e, `land`, Math.min(1, e.v.impact / 8)),
        (e.v.impact = 0));
      let n = 0,
        r = e.v.v;
      for (let e = 0; e < r.length; e += 3)
        n = Math.max(
          n,
          r[e] * r[e] + r[e + 1] * r[e + 1] + r[e + 2] * r[e + 2],
        );
      ((e.still = n < j.rest * j.rest ? e.still + t : 0),
        e.still >= j.still && !e.near.length && (e.asleep = !0));
    }
    if (e.phase !== P) return;
    if (
      ((e.rest = e.asleep ? e.rest + t : 0),
      this.center(e, e.v.p, H),
      e.asleep &&
        (this.axes(e, e.v.p), H.distanceTo(e.homeC) < 0.03 && R.y > 0.995))
    ) {
      (this.reset(e), this.go(e, N));
      return;
    }
    if (
      !(H.y < e.item.y - j.fall) &&
      ((e.rest < j.wait && e.t < j.maxLoose) || !this.clear(e))
    )
      return;
    let n = e.v.lerped();
    (this.axes(e, n),
      e.popR.makeBasis(L, R, z),
      this.center(e, n, e.popC),
      this.go(e, F));
  }
  roll(e, t) {
    let { air: n, v: r } = e.v,
      i = !1;
    for (let e = 0; e < n.length && !i; e++) i = n[e] < 0.05;
    if (!i) return;
    this.velocity(e, W);
    let a = 1 - Math.exp(-e.shape.roll * t),
      o = W.x * a,
      s = W.z * a;
    for (let e = 0; e < r.length; e += 3) ((r[e] -= o), (r[e + 2] -= s));
  }
  go(e, t) {
    ((e.phase = t), (e.t = 0), (e.drawn = !1));
  }
  wake(e) {
    (e.phase === N && (this.go(e, P), e.v.reset()),
      (e.asleep = !1),
      (e.still = 0));
  }
  clear(e) {
    let t = e.homeC;
    for (let n = 0; n < this.nRiders; n++) {
      let r = this.riders[n];
      if (
        Math.abs(r.by - e.item.y) < 2 &&
        Math.hypot(r.bx - t.x, r.bz - t.z) < j.clear
      )
        return !1;
    }
    return !0;
  }
  reset(e) {
    let t = e.v;
    (t.p.set(e.homeP),
      t.o.set(e.homeP),
      t.reset(),
      (e.asleep = !0),
      (e.still = 0),
      (e.rest = 0),
      e.touching.clear());
  }
  contact(e, t) {
    if (((e.sub += t), !e.near.length)) return;
    let n = Math.min(1, e.sub / this.dt),
      { p: r, o: i, v: a } = e.v,
      o = e.shape.pts.length,
      s = e.item.s,
      c = e.shape;
    for (let l of e.near) {
      let u = this.riders[l],
        d = u.ax + (u.bx - u.ax) * n,
        f = u.ay + (u.by - u.ay) * n,
        p = u.az + (u.bz - u.az) * n;
      for (let [n, l, m] of u.walk ? he : me) {
        (q(r, c.bottom, B),
          q(r, c.top, V),
          H.set(
            d + u.ux * n + u.fx * l,
            f + u.uy * n + u.fy * l,
            p + u.uz * n + u.fz * l,
          ));
        let h = De(B, V, c.r0 * s, c.r1 * s, H, m, U);
        if (!h) continue;
        this.weigh(e, h.t, B, V);
        let g = h.depth / ((1 - h.t) * (1 - h.t) + h.t * h.t);
        for (let e = 0; e < o; e++) {
          let t = g * Se[e];
          ((r[e * 3] -= U.x * t),
            (r[e * 3 + 1] -= U.y * t),
            (r[e * 3 + 2] -= U.z * t),
            (i[e * 3] -= U.x * t),
            (i[e * 3 + 1] -= U.y * t),
            (i[e * 3 + 2] -= U.z * t));
        }
        this.velocity(e, W);
        let _ = (W.x - u.vx) * U.x + (W.y - u.vy) * U.y + (W.z - u.vz) * U.z;
        if (_ <= 0.1) continue;
        let v = !e.touching.has(u.key) && !e.touched.has(u.key);
        e.touched.add(u.key);
        let y = Math.hypot(W.x, W.y, W.z),
          b = Math.max(0, Math.min(_ * j.kick, j.maxSpeed - y)),
          x = v ? Math.min(j.liftMax, _ * j.lift) : 0,
          S = _ * j.kick - b,
          C = 0,
          w = 0;
        if (S > 0) {
          let t = Math.hypot(u.vx, u.vz) || 1,
            n = -u.vz / t,
            i = u.vx / t;
          this.center(e, r, R);
          let a = (R.x - d) * n + (R.z - p) * i,
            o = Math.abs(a) > 0.02 ? Math.sign(a) : this.rand() < 0.5 ? -1 : 1;
          ((C = n * o * S * 0.45),
            (w = i * o * S * 0.45),
            v && (x = Math.min(j.liftMax * 1.5, x + S * 0.25)));
        }
        let T = v
            ? (this.rand() < 0.5 ? -1 : 1) *
              j.spin *
              Math.min(1.5, _ / 8) *
              (0.5 + this.rand())
            : 0,
          E = v
            ? Math.min(j.tumbleMax, j.tumble * _) * (0.7 + 0.6 * this.rand())
            : 0,
          D = Math.hypot(U.x, U.z) || 1,
          O = -U.x / D,
          k = -U.z / D,
          ee = B.x + O * c.r0 * s,
          te = B.y,
          ne = B.z + k * c.r0 * s;
        (L.subVectors(V, B).normalize(), this.center(e, r, R));
        for (let e = 0; e < o; e++) {
          let n = r[e * 3] - R.x,
            i = r[e * 3 + 1] - R.y,
            o = r[e * 3 + 2] - R.z,
            s = r[e * 3] - ee,
            c = r[e * 3 + 1] - te,
            l = r[e * 3 + 2] - ne,
            u = L.x * T,
            d = L.y * T,
            f = L.z * T,
            p = -U.x * b + C + (d * o - f * i) + O * c * E,
            m = -U.y * b + x + (f * n - u * o) - (O * s + k * l) * E,
            h = -U.z * b + w + (u * i - d * n) + k * c * E;
          ((a[e * 3] += p),
            (a[e * 3 + 1] += m),
            (a[e * 3 + 2] += h),
            (r[e * 3] += p * t),
            (r[e * 3 + 1] += m * t),
            (r[e * 3 + 2] += h * t));
        }
        v && this.say(e, `knock`, Math.min(1, _ / 9), H);
      }
    }
  }
  weigh(e, t, n, r) {
    let i = e.v.p;
    z.subVectors(r, n);
    let a = z.lengthSq() || 1;
    for (let r = 0; r < e.m.length; r++) {
      let e = Math.min(
        1,
        Math.max(
          0,
          ((i[r * 3] - n.x) * z.x +
            (i[r * 3 + 1] - n.y) * z.y +
            (i[r * 3 + 2] - n.z) * z.z) /
            a,
        ),
      );
      Se[r] = 1 - Math.abs(e - t);
    }
  }
  bump() {
    for (let e of this.bodies)
      if (!(e.phase !== P || e.asleep))
        for (let t of this.bodies) {
          if (
            t === e ||
            t.phase === F ||
            t.phase === I ||
            (this.center(e, e.v.p, H),
            this.center(t, t.v.p, W),
            H.distanceToSquared(W) > 2.25)
          )
            continue;
          (q(e.v.p, e.shape.bottom, B),
            q(e.v.p, e.shape.top, V),
            q(t.v.p, t.shape.bottom, L),
            q(t.v.p, t.shape.top, R));
          let [n, r] = Oe(B, V, L, R);
          (z.lerpVectors(B, V, n), U.lerpVectors(L, R, r), U.subVectors(z, U));
          let i = U.length(),
            a = (e.shape.r0 + (e.shape.r1 - e.shape.r0) * n) * e.item.s,
            o = (t.shape.r0 + (t.shape.r1 - t.shape.r0) * r) * t.item.s;
          if (i >= a + o || i < 1e-6) continue;
          (U.multiplyScalar(1 / i), this.wake(t));
          let s = (a + o - i) / 2;
          (we(e.v, U, s),
            we(t.v, U, -s),
            this.velocity(e, B),
            this.velocity(t, V));
          let c = (B.x - V.x) * U.x + (B.y - V.y) * U.y + (B.z - V.z) * U.z;
          if (c >= -0.1) continue;
          let l = (-(1 + j.bump) * c) / 2;
          (Te(e.v, U, l),
            Te(t.v, U, -l),
            this.say(t, `knock`, Math.min(1, -c / 9), W));
        }
  }
  draw(e) {
    let t = e.item.s;
    if (e.phase === N)
      return (
        !e.drawn && ((e.drawn = !0), e.mesh.setMatrixAt(e.slot, e.home), !0)
      );
    if (e.phase === P) {
      if (e.drawn) return !1;
      e.drawn = e.asleep;
      let n = e.v.lerped();
      return (
        this.axes(e, n),
        this.center(e, n, H),
        K.makeBasis(L, R, z),
        B.copy(e.c0).multiplyScalar(t).applyMatrix4(K),
        K.scale(V.setScalar(t)).setPosition(H.sub(B)),
        e.mesh.setMatrixAt(e.slot, K),
        !0
      );
    }
    if (e.phase === F) {
      let n = Math.min(1, e.t / j.out),
        r =
          n < 0.3
            ? 1 + 0.15 * Math.sin((n / 0.3) * (Math.PI / 2))
            : 1.15 * (1 - ((n - 0.3) / 0.7) ** 2);
      return (
        K.copy(e.popR).setPosition(e.popC),
        K.multiply(ve.makeScale(t * r, t * r, t * r)).multiply(
          ye.makeTranslation(-e.c0.x, -e.c0.y, -e.c0.z),
        ),
        e.mesh.setMatrixAt(e.slot, K),
        !0
      );
    }
    let n = Math.min(1, e.t / j.in),
      r = Math.exp(-5 * n),
      i = 1 - r * Math.cos(3.5 * Math.PI * n),
      a = r * Math.sin(3.5 * Math.PI * n),
      o = Math.max(0.001, i * (1 - 0.15 * a)),
      s = Math.max(0.001, i * (1 + 0.3 * a));
    return (
      K.copy(e.home).multiply(ve.makeScale(o, s, o)),
      e.mesh.setMatrixAt(e.slot, K),
      !0
    );
  }
  axes(e, t) {
    (q(t, e.shape.top, R),
      q(t, e.shape.bottom, W),
      R.sub(W).normalize(),
      q(t, e.shape.xp, L),
      q(t, e.shape.xn, W),
      L.sub(W),
      L.addScaledVector(R, -L.dot(R)).normalize(),
      z.crossVectors(L, R));
  }
  center(e, t, n) {
    let r = e.m.length;
    n.set(0, 0, 0);
    for (let e = 0; e < r; e++)
      ((n.x += t[e * 3]), (n.y += t[e * 3 + 1]), (n.z += t[e * 3 + 2]));
    return n.multiplyScalar(1 / r);
  }
  velocity(e, t) {
    let n = e.v.v;
    t.set(0, 0, 0);
    for (let r = 0; r < e.m.length; r++)
      ((t.x += n[r * 3] * e.m[r]),
        (t.y += n[r * 3 + 1] * e.m[r]),
        (t.z += n[r * 3 + 2] * e.m[r]));
    return t.multiplyScalar(1 / e.mass);
  }
  say(e, t, n, r) {
    if (!this.sound) return;
    let i = r ?? this.center(e, e.v.p, W),
      a = this.eye ? 1 - this.eye.distanceTo(i) / j.hear : 1;
    a > 0 && this.sound(e.item.prop, t, n * a);
  }
};
function we(e, t, n) {
  for (let r = 0; r < e.n * 3; r += 3)
    ((e.p[r] += t.x * n),
      (e.p[r + 1] += t.y * n),
      (e.p[r + 2] += t.z * n),
      (e.o[r] += t.x * n),
      (e.o[r + 1] += t.y * n),
      (e.o[r + 2] += t.z * n));
}
function Te(e, t, n) {
  for (let r = 0; r < e.n * 3; r += 3)
    ((e.v[r] += t.x * n), (e.v[r + 1] += t.y * n), (e.v[r + 2] += t.z * n));
}
function Ee(e, t, n, r, i, a) {
  let o = i - n,
    s = a - r,
    c = o * o + s * s,
    l =
      c > 1e-12 ? Math.max(0, Math.min(1, ((e - n) * o + (t - r) * s) / c)) : 0,
    u = e - n - o * l,
    d = t - r - s * l;
  return u * u + d * d;
}
function De(e, t, n, r, i, a, o) {
  let s = t.x - e.x,
    c = t.y - e.y,
    l = t.z - e.z,
    u = Math.sqrt(s * s + c * c + l * l) || 1e-9,
    d = i.x - e.x,
    f = i.y - e.y,
    p = i.z - e.z,
    m = (d * s + f * c + p * l) / u;
  if (m < -a || m > u + a) return null;
  let h = Math.min(1, Math.max(0, m / u)),
    g = d - (s / u) * m,
    _ = f - (c / u) * m,
    v = p - (l / u) * m,
    y = Math.sqrt(g * g + _ * _ + v * v),
    b = n + (r - n) * h;
  if (y - b >= a) return null;
  let x = Math.max(0, y - b),
    S = m < 0 ? m : m > u ? m - u : 0,
    C = Math.hypot(x, S);
  if (C > 1e-6) {
    if (C >= a) return null;
    let e = y > 1e-6 ? x / y : 0,
      t = S / u;
    return (
      o.set(g * e + s * t, _ * e + c * t, v * e + l * t).normalize(),
      { depth: a - C, t: h }
    );
  }
  return (
    y > 1e-6 ? o.set(g / y, _ / y, v / y) : o.set(1, 0, 0),
    { depth: a + b - y, t: h }
  );
}
function Oe(e, t, n, r) {
  let i = t.x - e.x,
    a = t.y - e.y,
    o = t.z - e.z,
    s = r.x - n.x,
    c = r.y - n.y,
    l = r.z - n.z,
    u = e.x - n.x,
    d = e.y - n.y,
    f = e.z - n.z,
    p = i * i + a * a + o * o,
    m = s * s + c * c + l * l,
    h = s * u + c * d + l * f,
    g = (e) => Math.min(1, Math.max(0, e));
  if (p < 1e-12 && m < 1e-12) return [0, 0];
  if (p < 1e-12) return [0, g(h / m)];
  let _ = i * u + a * d + o * f;
  if (m < 1e-12) return [g(-_ / p), 0];
  let v = i * s + a * c + o * l,
    y = p * m - v * v,
    b = y > 1e-12 ? g((v * h - _ * m) / y) : 0,
    x = (v * b + h) / m;
  return (
    x < 0
      ? ((x = 0), (b = g(-_ / p)))
      : x > 1 && ((x = 1), (b = g((v - _) / p))),
    [b, x]
  );
}
var ke = `/`.replace(/\/?$/, `/`),
  J = new Map();
function Ae() {
  return je(`${ke}props/props.glb`);
}
function je(e) {
  let t = J.get(e);
  return (
    t ||
    ((t = new ne()
      .loadAsync(e)
      .then((e) => {
        let t = new Map();
        e.scene.updateMatrixWorld(!0);
        for (let r of e.scene.children) {
          let e = [];
          (r.traverse((t) => {
            let i = t;
            if (!i.isMesh) return;
            let a = i.geometry.clone(),
              o = new n().copy(r.matrixWorld).invert().multiply(i.matrixWorld);
            (a.applyMatrix4(o), e.push(a));
          }),
            e.length && t.set(r.name, Ne(e.map((e) => ({ g: e, m: null })))));
        }
        return t;
      })
      .catch((t) => {
        throw (J.delete(e), t);
      })),
    J.set(e, t),
    t)
  );
}
var Y = [
    [`position`, [`position`], 3, 1],
    [`normal`, [`normal`], 3, 1],
    [`color`, [`color`], 3, 1],
    [`ao`, [`ao`, `_ao`], 1, 1],
    [`glow`, [`glow`, `_zone`], 1, 0],
  ],
  X = new c(),
  Z = new c(),
  Me = new l();
function Ne(e) {
  let t = 0,
    n = 0;
  for (let { g: r } of e)
    ((t += r.getAttribute(`position`).count),
      (n += r.index ? r.index.count : r.getAttribute(`position`).count));
  let i = Y.map(([, , e]) => new Float32Array(t * e)),
    o = new Uint32Array(n),
    s = 0,
    c = 0;
  for (let { g: t, m: n } of e) {
    let e = t.getAttribute(`position`);
    if (
      (n && Me.getNormalMatrix(n),
      Y.forEach(([, r, a, o], c) => {
        let l = r.map((e) => t.getAttribute(e)).find(Boolean),
          u = i[c];
        for (let t = 0; t < e.count; t++) {
          let e = (s + t) * a;
          if (!l) {
            u.fill(o, e, e + a);
            continue;
          }
          c === 0
            ? (Z.fromBufferAttribute(l, t),
              n && Z.applyMatrix4(n),
              (u[e] = Z.x),
              (u[e + 1] = Z.y),
              (u[e + 2] = Z.z))
            : c === 1
              ? (X.fromBufferAttribute(l, t),
                n && X.applyMatrix3(Me).normalize(),
                (u[e] = X.x),
                (u[e + 1] = X.y),
                (u[e + 2] = X.z))
              : ((u[e] = l.getX(t)),
                a > 1 && ((u[e + 1] = l.getY(t)), (u[e + 2] = l.getZ(t))));
        }
      }),
      t.index)
    )
      for (let e = 0; e < t.index.count; e++) o[c + e] = t.index.getX(e) + s;
    else for (let t = 0; t < e.count; t++) o[c + t] = s + t;
    ((s += e.count), (c += t.index ? t.index.count : e.count));
  }
  let l = new a();
  return (
    Y.forEach(([e, , t], n) => l.setAttribute(e, new r(i[n], t))),
    l.setIndex(new r(o, 1)),
    l.computeBoundingSphere(),
    l
  );
}
function Pe(e = 0.22, t = !1) {
  let n = u({ vertexColors: !0 });
  return (d(n, { rim: e, ao: !0, glow: t }), n);
}
var Q = new e(),
  Fe = new i(),
  $ = new c(),
  Ie = new n(),
  Le = 190;
async function Re(e, r) {
  let i = r ?? (await Ae()),
    { items: a, clouds: c } = fe(e),
    l = new t();
  l.name = `decor`;
  let u = [],
    d = new Map(),
    f = a.filter((e) => h.has(e.prop));
  for (let e of a) {
    let t = i.get(e.prop);
    if (!t || h.has(e.prop)) continue;
    Q.setFromEuler(Fe.set(0, e.rot, 0));
    let r = {
      g: t,
      m: new n().compose(Z.set(e.x, e.y, e.z), Q, $.setScalar(e.s)),
    };
    if (!e.gate) {
      u.push(r);
      continue;
    }
    let a = d.get(e.gate) ?? [];
    (a.push(r), d.set(e.gate, a));
  }
  let p = Pe(0.22, !0),
    m = [],
    g = (e, t) => {
      let n = new s(Ne(e), p);
      return (
        (n.name = t),
        w(n),
        (n.receiveShadow = !0),
        l.add(n),
        m.push(n),
        n
      );
    };
  u.length && g(u, `decor:static`);
  for (let [e, t] of d) g(t, `gate:${e}`);
  let _ = T(a.filter((e) => e.prop === `lamp` && i.has(`lamp`)));
  l.add(_.group);
  let v = new Ce(
    f,
    (e) => i.get(e),
    p,
    (e, t, n) => ee.knock(e, t, n),
  );
  l.add(v.group);
  let y = Pe(0.3),
    b = new Map();
  for (let e of c) {
    if (!i.get(e.prop)) continue;
    let t = b.get(e.prop);
    t ? t.push(e) : b.set(e.prop, [e]);
  }
  let x = [];
  for (let [e, t] of b) {
    let n = new o(i.get(e), y, t.length);
    ((n.name = `decor:${e}`),
      (n.frustumCulled = !1),
      (n.userData.noOutline = !0),
      x.push({ mesh: n, items: t, x: t.map((e) => e.x) }),
      l.add(n));
  }
  let S = () => {
    for (let e of x)
      (e.items.forEach((t, n) => {
        (Q.setFromEuler(Fe.set(0, t.rot, 0)),
          e.mesh.setMatrixAt(
            n,
            Ie.compose(Z.set(e.x[n], t.y, t.z), Q, $.setScalar(t.s)),
          ));
      }),
        (e.mesh.instanceMatrix.needsUpdate = !0));
  };
  return (
    S(),
    {
      group: l,
      update(e, t, n) {
        v.update(e, t, n);
        for (let t of x)
          for (let n = 0; n < t.x.length; n++)
            ((t.x[n] += t.items[n].speed * e), t.x[n] > Le && (t.x[n] -= 380));
        S();
      },
      setOutlines(e) {
        for (let t of [...m, v.group]) e ? D(t, 0.8) : E(t);
      },
      dispose() {
        l.removeFromParent();
        for (let e of m) (E(e), e.geometry.dispose());
        (_.dispose(), E(v.group), v.dispose());
        for (let e of x) e.mesh.dispose();
        (p.dispose(), y.dispose());
      },
    }
  );
}
export { je as n, Ae as r, Re as t };
