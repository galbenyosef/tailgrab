// assets__decor-Tyb8Za1u 03 — math
// Lines 393-903 of readable/assets__decor-Tyb8Za1u.pretty.js (statement-aligned).
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
