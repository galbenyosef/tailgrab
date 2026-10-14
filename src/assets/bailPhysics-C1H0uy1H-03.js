// assets/bailPhysics-C1H0uy1H 03 — math
// Lines 370-1012 of readable/assets/bailPhysics-C1H0uy1H.pretty.js (statement-aligned).
var M = [_.PELVIS, _.BUTT, _.HIP_L, _.HIP_R],
  N = [_.CHEST, _.STERNUM, _.SH_L, _.SH_R, _.NECK],
  te = [_.KN_L, _.AN_L, _.KN_R, _.AN_R],
  ne = [_.EL_L, _.WR_L, _.EL_R, _.WR_R],
  re = [...te, ...ne],
  ie = {
    [_.AN_L]: _.KN_L,
    [_.AN_R]: _.KN_R,
    [_.WR_L]: _.EL_L,
    [_.WR_R]: _.EL_R,
  },
  ae = (e) => e.reduce((e, t) => e + 1 / v[t].w, 0),
  oe = ae(M),
  se = ae(N),
  P = Math.PI / 180,
  ce = 0.1,
  le = 10,
  ue = 0.5,
  de = 0.01,
  fe = { fwd: 115 * P, back: 25 * P, out: 70 * P, across: 25 * P },
  pe = 25 * P,
  me = [
    [_.HIP_L, _.KN_L, _.AN_L, 1],
    [_.HIP_R, _.KN_R, _.AN_R, -1],
  ],
  F = new n(0, -1, 0),
  he = new n(0, o.headC[1] - o.neckY, o.headC[2]).normalize(),
  I = v.map(() => new n()),
  L = new n(),
  R = new n(),
  z = new n(),
  B = new n(),
  V = new n(),
  H = new t(),
  U = new e(),
  W = new e(),
  ge = new e(),
  _e = new e(),
  ve = new e(),
  ye = new e(),
  be = new Float64Array(12),
  xe = new Float64Array(v.length * 3),
  Se = new Float64Array(v.length * 3),
  G = new Float64Array(3),
  K = new Float64Array(3),
  Ce = new Float64Array(9),
  q = new Float64Array(3),
  we = r(),
  Te = class {
    body = new i(v.length);
    target = new n();
    targetV = new n();
    tune = k;
    mirror = 1;
    braces = [];
    spine = [];
    spineLimits = [];
    neck = [];
    braceT = 0;
    limpAt = -1;
    clock = 0;
    downAt = -1;
    blocks = [new Oe(M), new Oe(N)];
    reachT = new Float64Array(v.length * 3);
    splatT = new Float64Array(v.length * 3);
    constructor() {
      let e = this.body;
      (v.forEach((t, n) => {
        ((e.r[n] = t.r), (e.w[n] = t.w));
      }),
        (e.walls[_.NECK] = 0));
      let t = y,
        n = (n, r, i = 1, a = !1, o = 1) =>
          e.stick(
            n,
            r,
            i,
            a,
            Math.hypot(
              t[r][0] - t[n][0],
              t[r][1] - t[n][1],
              t[r][2] - t[n][2],
            ) * o,
          ),
        {
          PELVIS: r,
          BUTT: i,
          CHEST: a,
          STERNUM: o,
          NECK: s,
          HEAD: c,
          SH_L: l,
          EL_L: u,
          WR_L: d,
          SH_R: f,
          EL_R: p,
          WR_R: m,
          HIP_L: h,
          KN_L: g,
          AN_L: b,
          HIP_R: x,
          KN_R: S,
          AN_R: C,
        } = _;
      for (let [e, t] of [
        [r, i],
        [r, h],
        [r, x],
        [h, x],
        [i, h],
        [i, x],
      ])
        n(e, t);
      for (let [e, t] of [
        [a, o],
        [a, l],
        [a, f],
        [l, f],
        [o, l],
        [o, f],
        [s, a],
        [s, l],
        [s, f],
        [s, o],
      ])
        n(e, t);
      n(r, a);
      for (let [t, s] of [
        [i, a],
        [r, o],
        [h, l],
        [x, f],
      ]) {
        let r = n(t, s);
        (this.spine.push(r),
          this.spineLimits.push(
            e.stick(t, s, 0, !0, r.rest),
            e.stick(t, s, 0, !1, r.rest, !0),
          ));
      }
      n(s, c);
      for (let e of [l, f, o]) this.neck.push(n(e, c));
      for (let [e, t] of [
        [l, u],
        [u, d],
        [f, p],
        [p, m],
        [h, g],
        [g, b],
        [x, S],
        [S, C],
      ])
        n(e, t);
      (n(h, b, 1, !0, 0.6),
        n(x, C, 1, !0, 0.6),
        n(l, d, 1, !0, 0.5),
        n(f, m, 1, !0, 0.5));
      for (let t of [g, S]) e.stick(t, o, 1, !0, 0.18);
      for (let t of [b, C]) e.stick(t, i, 1, !0, 0.15);
      for (let t of [d, m, u, p]) e.stick(t, c, 1, !0, 0.22);
      (e.stick(g, S, 1, !0, 0.1), e.stick(b, C, 1, !0, 0.1));
      for (let [e, t] of [
        [h, b],
        [r, b],
        [i, b],
        [x, C],
        [r, C],
        [i, C],
        [r, s],
        [i, o],
        [h, f],
        [x, l],
      ])
        this.braces.push(n(e, t, 0));
      ((e.pre = (t) => {
        this.clock += t;
        for (let t of this.blocks) t.match(e);
        (this.downAt < 0 && this.grounded(0) && (this.downAt = this.clock),
          this.brace(t),
          this.resist(t),
          this.leash(t),
          this.airAim(t),
          this.capRoll(t),
          xe.set(e.p),
          this.muscles());
        let n = this.tune,
          r = e.p,
          i =
            this.downAt < 0
              ? 0
              : Math.min(1, Math.max(0, (0.75 - ke(r)) / 0.25));
        e.spinDamp = n.damp + (n.rollDamp - n.damp) * i;
      }),
        (e.solve = () => this.hinges()),
        (e.post = () => {
          for (let t of this.blocks) t.match(e);
          this.keepSpin();
        }));
    }
    start(e, t, n, r, i, a, o, s, c, l = k.rand, u = null) {
      let d = this.body;
      (d.reset(), (d.col = s), (d.planeY = c), (this.mirror = o));
      let f = Math.hypot(t.x, t.y, t.z),
        p = t.x * n.x + t.y * n.y + t.z * n.z;
      B.set(t.x - n.x * p, t.y - n.y * p, t.z - n.z * p);
      let m = B.length(),
        h =
          m > 0.5
            ? Math.acos(
                Math.max(
                  -1,
                  Math.min(1, (B.x * r.x + B.y * r.y + B.z * r.z) / m),
                ),
              )
            : 0,
        g = u ? Math.hypot(u.x, u.y, u.z) : 0,
        v = g > ce,
        y =
          v && m > 0.5
            ? (u.x * (n.y * B.z - n.z * B.y) +
                u.y * (n.z * B.x - n.x * B.z) +
                u.z * (n.x * B.y - n.y * B.x)) /
              (g * m)
            : 0,
        b = (this.tune = k.pick
          ? {
              ...k,
              ...k.pick({ speed: f, off: h, bal: a, lean: y, leaned: v }, l),
            }
          : k);
      d.mu.fill(b.bodyMu);
      for (let e of re) d.mu[e] = b.limbMu;
      (d.e.fill(b.bodyBounce), (d.gravity = b.gravity), (d.spinDamp = b.damp));
      for (let e of this.spine) e.k = b.spine;
      for (let e of this.neck) e.k = b.neck;
      this.spineLimits.forEach((e, t) => {
        ((e.k = +(b.spineRange > 0)),
          (e.rest =
            this.spine[t >> 1].rest *
            (1 + (t & 1 ? b.spineRange : -b.spineRange))));
      });
      for (let t = 0; t < d.n * 3; t++) d.p[t] = d.o[t] = e[t];
      for (let e of this.braces)
        e.rest = Math.hypot(
          d.p[e.b * 3] - d.p[e.a * 3],
          d.p[e.b * 3 + 1] - d.p[e.a * 3 + 1],
          d.p[e.b * 3 + 2] - d.p[e.a * 3 + 2],
        );
      ((this.braceT = 0), (this.limpAt = -1), (this.clock = 0));
      for (let e of this.blocks) e.start(d, o);
      ((this.downAt = -1), (d.mu[_.AN_L] = d.mu[_.AN_R] = b.footMu));
      let x, S, C, w;
      if (f > 1.5) {
        if (
          (B.lengthSq() < 0.25 && B.set(r.x, r.y, r.z),
          B.normalize(),
          (x = (n.y * B.z - n.z * B.y) * b.fall),
          (S = (n.z * B.x - n.x * B.z) * b.fall),
          (C = (n.x * B.y - n.y * B.x) * b.fall),
          (w = Math.min(
            b.tripMax,
            Math.max(1, b.tripBase + b.tripPerSpeed * f),
          )),
          v)
        ) {
          let e = w / (Math.hypot(x, S, C) || 1),
            t = b.leanFall / g;
          ((x = x * e + u.x * t),
            (S = S * e + u.y * t),
            (C = C * e + u.z * t),
            (w = Math.hypot(x, S, C)));
        }
      } else if (v) ((x = u.x), (S = u.y), (C = u.z), (w = b.leanFall));
      else {
        let e = a > 0.05 ? -1 : a < -0.05 ? 1 : l() < 0.5 ? -1 : 1;
        ((x = r.x * e), (S = r.y * e), (C = r.z * e), (w = b.topple));
      }
      let T = Math.hypot(x, S, C) || 1,
        E = (l() - 0.5) * 2 * b.twist,
        D = (x / T) * w + n.x * E,
        O = (S / T) * w + n.y * E,
        A = (C / T) * w + n.z * E,
        j = d.p,
        ee = (j[_.AN_L * 3] + j[_.AN_R * 3]) / 2,
        M = (j[_.AN_L * 3 + 1] + j[_.AN_R * 3 + 1]) / 2,
        N = (j[_.AN_L * 3 + 2] + j[_.AN_R * 3 + 2]) / 2;
      for (let e = 0; e < d.n; e++) {
        let r = e * 3,
          i = j[r] - ee,
          a = j[r + 1] - M,
          o = j[r + 2] - N,
          s = e === _.AN_L || e === _.AN_R || e === _.KN_L || e === _.KN_R,
          c = s ? b.feetKeep : 1,
          l = s ? 0 : b.lift;
        ((d.v[r] = t.x * c + n.x * l + O * o - A * a),
          (d.v[r + 1] = t.y * c + n.y * l + A * i - D * o),
          (d.v[r + 2] = t.z * c + n.z * l + D * a - O * i));
      }
      b.reach &&
        (je(b.reach, b.jitter, l, this.reachT),
        je(b.splat ?? b.reach, b.jitter, l, this.splatT));
    }
    step(e) {
      this.body.step(e);
    }
    grounded(e) {
      let t = this.body.air;
      return (
        Math.min(t[_.PELVIS], t[_.BUTT], t[_.CHEST], t[_.STERNUM], t[_.HEAD]) <=
        e
      );
    }
    gap() {
      let e = this.body.p;
      return Math.hypot(
        e[0] - this.target.x,
        e[1] - this.target.y,
        e[2] - this.target.z,
      );
    }
    brace(e) {
      let t = this.tune;
      if (this.limpAt >= 0 && this.braceT - this.limpAt > t.braceFade) return;
      ((this.braceT += e),
        this.limpAt < 0 &&
          (this.braceT >= t.braceT || this.grounded(0) || this.aloft()) &&
          (this.limpAt = this.braceT));
      let n =
        this.limpAt < 0
          ? t.braceK
          : t.braceK *
            Math.max(
              0,
              1 - (this.braceT - this.limpAt) / Math.max(t.braceFade, 1e-6),
            );
      for (let e of this.braces) e.k = n;
      n === 0 && (this.body.mu[_.AN_L] = this.body.mu[_.AN_R] = t.limbMu);
    }
    aloft() {
      let e = 1 / 0;
      for (let t of this.body.air) e = Math.min(e, t);
      return e > 0.08;
    }
    resist(e) {
      let { p: t, o: n, n: r, air: i } = this.body;
      if (Math.min(i[_.AN_L], i[_.AN_R]) > 0.05) return;
      let a = this.tune,
        o =
          Math.min(1, a.resist * e) *
          (this.braces[0].k / Math.max(a.braceK, 1e-6));
      if (o <= 0) return;
      let s = _.AN_L * 3,
        c = _.AN_R * 3,
        l = (t[s] - n[s] + t[c] - n[c]) / 2,
        u = (t[s + 1] - n[s + 1] + t[c + 1] - n[c + 1]) / 2,
        d = (t[s + 2] - n[s + 2] + t[c + 2] - n[c + 2]) / 2;
      for (let e = 0; e < r; e++) {
        if (e === _.AN_L || e === _.AN_R) continue;
        let r = e * 3;
        ((t[r] -= (t[r] - n[r] - l) * o),
          (t[r + 1] -= (t[r + 1] - n[r + 1] - u) * o),
          (t[r + 2] -= (t[r + 2] - n[r + 2] - d) * o));
      }
    }
    muscles() {
      let e = this.tune;
      if (!e.reach) return;
      let t =
          this.downAt < 0
            ? 0
            : Math.min(
                1,
                (this.clock - this.downAt) / Math.max(e.splatT, 1e-6),
              ),
        n = e.muscle[0] + (e.muscle[1] - e.muscle[0]) * t,
        r = e.core[0] + (e.core[1] - e.core[0]) * t,
        i = this.braces[0].k / Math.max(e.braceK, 1e-6),
        a = Math.min(1, this.clock / 0.1),
        o = this.body.p;
      if (
        (Ae(o, _.PELVIS, _.HIP_L, _.HIP_R, _.PELVIS, _.BUTT, this.mirror, be),
        this.blockStep(M, oe),
        n * (1 - i) > 0)
      )
        for (let e of te) this.pull(e, t, n * (1 - i), M, oe);
      if (r * (1 - i) > 0) for (let e of N) this.pull(e, t, r * (1 - i), M, oe);
      (Ae(o, _.CHEST, _.SH_L, _.SH_R, _.STERNUM, _.CHEST, this.mirror, be),
        this.blockStep(N, se));
      for (let e of ne) this.pull(e, t, n * a, N, se);
      this.pull(_.HEAD, t, r * a, N, se);
    }
    blockStep(e, t) {
      let { p: n, o: r, w: i } = this.body;
      q[0] = q[1] = q[2] = 0;
      for (let a of e) {
        let e = 1 / i[a] / t;
        ((q[0] += (n[a * 3] - r[a * 3]) * e),
          (q[1] += (n[a * 3 + 1] - r[a * 3 + 1]) * e),
          (q[2] += (n[a * 3 + 2] - r[a * 3 + 2]) * e));
      }
    }
    keepSpin() {
      let { p: e } = this.body;
      for (let t = 0; t < e.length; t++) Se[t] = e[t] - xe[t];
      Ee(this.body, Se, G) && De(this.body, -1);
    }
    capRoll(e) {
      let t = this.tune,
        n = this.body;
      if (t.rollCap <= 0 || this.downAt < 0 || !Ee(n, n.v, G)) return;
      let r = Math.hypot(G[0], G[2]);
      if (r <= t.rollCap) return;
      let i = ((r - t.rollCap) / r) * e;
      ((G[0] *= i), (G[1] = 0), (G[2] *= i), De(n, -1));
    }
    airAim(e) {
      let t = this.tune,
        n = this.body,
        r = n.p;
      if (t.airAim <= 0 || this.downAt >= 0 || !this.aloft()) return;
      let i = _.PELVIS * 3,
        a = _.NECK * 3,
        o = r[a] - r[i],
        s = r[a + 1] - r[i + 1],
        c = r[a + 2] - r[i + 2],
        l = Math.sqrt(o * o + s * s + c * c) || 1;
      ((o /= l), (s /= l), (c /= l));
      let u = c,
        d = -o,
        f = Math.sqrt(u * u + d * d);
      if (f < 0.2) return;
      ((u /= f), (d /= f));
      let p = n.planeY;
      if (n.col) {
        if (!n.col.raySurface(r[i], r[i + 1] + 0.1, r[i + 2], 0, -1, 0, 30, we))
          return;
        p = we.py;
      }
      let m = 0,
        h = 0;
      for (let e = 0; e < n.n; e++) {
        let t = 1 / n.w[e];
        ((m += n.v[e * 3 + 1] * t), (h += t));
      }
      m /= h;
      let g = Math.max(0, r[i + 1] - p - 0.15),
        v = n.gravity,
        y = Math.max(0.12, (m + Math.sqrt(Math.max(0, m * m + 2 * v * g))) / v),
        b = (Math.PI / 2 - Math.acos(Math.max(-1, Math.min(1, s)))) / y;
      if (!Ee(n, n.v, G)) return;
      let x = (b - (G[0] * u + G[2] * d)) * Math.min(1, t.airAim * e);
      ((G[0] = u * x * e), (G[1] = 0), (G[2] = d * x * e), De(n, 1));
    }
    pull(e, t, n, r, i) {
      if (n <= 0) return;
      let a = this.reachT,
        o = this.splatT,
        s = e * 3,
        c = this.body.p,
        l = be,
        u = a[s] + (o[s] - a[s]) * t,
        d = a[s + 1] + (o[s + 1] - a[s + 1]) * t,
        f = a[s + 2] + (o[s + 2] - a[s + 2]) * t,
        p = ie[e] ?? -1,
        m = p < 0 ? l[0] : c[p * 3],
        h = p < 0 ? l[1] : c[p * 3 + 1],
        g = p < 0 ? l[2] : c[p * 3 + 2],
        _ = (m + l[3] * u + l[6] * d + l[9] * f - c[s]) * n,
        y = (h + l[4] * u + l[7] * d + l[10] * f - c[s + 1]) * n,
        b = (g + l[5] * u + l[8] * d + l[11] * f - c[s + 2]) * n,
        x = Math.sqrt(_ * _ + y * y + b * b);
      if (x > de) {
        let e = de / x;
        ((_ *= e), (y *= e), (b *= e));
      }
      let S = this.body.o,
        C = this.tune.muscleDamp;
      ((_ -= (c[s] - S[s] - q[0]) * C),
        (y -= (c[s + 1] - S[s + 1] - q[1]) * C),
        (b -= (c[s + 2] - S[s + 2] - q[2]) * C),
        (c[s] += _),
        (c[s + 1] += y),
        (c[s + 2] += b));
      let w = 1 / v[e].w / i;
      for (let e of r)
        ((c[e * 3] -= _ * w), (c[e * 3 + 1] -= y * w), (c[e * 3 + 2] -= b * w));
    }
    leash(e) {
      let t = this.body,
        n = t.p,
        r = t.o,
        i = this.target,
        a = i.x - n[0],
        o = i.y - n[1],
        s = i.z - n[2],
        c = Math.sqrt(a * a + o * o + s * s),
        l = this.tune.slack;
      if (c > l) {
        let e = ((c - l) / c) * 0.2;
        for (let r = 0; r < t.n; r++)
          ((n[r * 3] += a * e),
            (n[r * 3 + 1] += o * e),
            (n[r * 3 + 2] += s * e));
      }
      if (!this.grounded(0.1)) return;
      let u = 0,
        d = 0,
        f = 0;
      for (let e = 0; e < t.n; e++) {
        let i = 1 / t.w[e];
        ((u += (n[e * 3] - r[e * 3]) * i),
          (d += (n[e * 3 + 2] - r[e * 3 + 2]) * i),
          (f += i));
      }
      let p = Math.min(1, le * e),
        m = (this.targetV.x * e - u / f) * p,
        h = (this.targetV.z * e - d / f) * p,
        g = a * ue * e,
        _ = s * ue * e;
      for (let e = 0; e < t.n; e++)
        ((n[e * 3] += m + g),
          (n[e * 3 + 2] += h + _),
          (r[e * 3] += g),
          (r[e * 3 + 2] += _));
    }
    hinges() {
      this.hipCones();
      let e = this.mirror;
      (this.hinge(_.HIP_L, _.KN_L, _.AN_L, _.HIP_L, _.HIP_R, e),
        this.hinge(_.HIP_R, _.KN_R, _.AN_R, _.HIP_L, _.HIP_R, e),
        this.hinge(_.SH_L, _.EL_L, _.WR_L, _.SH_L, _.SH_R, -e),
        this.hinge(_.SH_R, _.EL_R, _.WR_R, _.SH_L, _.SH_R, -e));
    }
    hipCones() {
      let e = this.body.p,
        t = be;
      Ae(e, _.PELVIS, _.HIP_L, _.HIP_R, _.PELVIS, _.BUTT, this.mirror, t);
      for (let [n, r, i, a] of me) {
        let o = e[r * 3] - e[n * 3],
          s = e[r * 3 + 1] - e[n * 3 + 1],
          c = e[r * 3 + 2] - e[n * 3 + 2],
          l = Math.sqrt(o * o + s * s + c * c);
        if (l < 1e-6) continue;
        let u = ((o * t[3] + s * t[4] + c * t[5]) / l) * a,
          d = (o * t[6] + s * t[7] + c * t[8]) / l,
          f = (o * t[9] + s * t[10] + c * t[11]) / l,
          p = Math.acos(Math.max(-1, Math.min(1, -d)));
        if (p < pe) continue;
        let m = Math.hypot(u, f),
          h = m > 1e-6 ? u / m : 0,
          g = m > 1e-6 ? f / m : 1,
          _ = g >= 0 ? fe.fwd : fe.back,
          y = h >= 0 ? fe.out : fe.across,
          b = 1 / Math.sqrt((g * g) / (_ * _) + (h * h) / (y * y));
        if (p <= b) continue;
        let x = Math.sin(b),
          S = Math.cos(b),
          C = h * x * a,
          w = -S,
          T = g * x,
          E = (t[3] * C + t[6] * w + t[9] * T) * l,
          D = (t[4] * C + t[7] * w + t[10] * T) * l,
          O = (t[5] * C + t[8] * w + t[11] * T) * l,
          k = e[n * 3] + E - e[r * 3],
          A = e[n * 3 + 1] + D - e[r * 3 + 1],
          j = e[n * 3 + 2] + O - e[r * 3 + 2];
        for (let t of [r, i])
          ((e[t * 3] += k), (e[t * 3 + 1] += A), (e[t * 3 + 2] += j));
        let ee = (1 / v[r].w + 1 / v[i].w) / oe;
        for (let t of M)
          ((e[t * 3] -= k * ee),
            (e[t * 3 + 1] -= A * ee),
            (e[t * 3 + 2] -= j * ee));
      }
    }
    hinge(e, t, n, r, i, a) {
      let o = this.body.p,
        s = o[n * 3] - o[e * 3],
        c = o[n * 3 + 1] - o[e * 3 + 1],
        l = o[n * 3 + 2] - o[e * 3 + 2],
        u = o[r * 3] - o[i * 3],
        d = o[r * 3 + 1] - o[i * 3 + 1],
        f = o[r * 3 + 2] - o[i * 3 + 2],
        p = Math.sqrt(s * s + c * c + l * l),
        m = Math.sqrt(u * u + d * d + f * f);
      if (p < 1e-6 || m < 1e-6) return;
      ((s /= p), (c /= p), (l /= p), (u /= m), (d /= m), (f /= m));
      let h = c * f - l * d,
        g = l * u - s * f,
        _ = s * d - c * u,
        v = Math.sqrt(h * h + g * g + _ * _),
        y = Math.min(1, Math.max(0, (v - 0.25) / 0.35));
      if (y === 0) return;
      ((h /= v), (g /= v), (_ /= v));
      let b =
        (o[t * 3] - o[e * 3]) * h +
        (o[t * 3 + 1] - o[e * 3 + 1]) * g +
        (o[t * 3 + 2] - o[e * 3 + 2]) * _;
      if (b * a >= 0) return;
      let x = b * y;
      ((o[t * 3] -= h * x), (o[t * 3 + 1] -= g * x), (o[t * 3 + 2] -= _ * x));
    }
    pose(e, t) {
      let n = this.body.lerped();
      for (let t = 0; t < I.length; t++)
        I[t].fromArray(n, t * 3).applyMatrix4(e);
      (Me(I[_.HIP_L], I[_.HIP_R], I[_.PELVIS], I[_.BUTT], U),
        Me(I[_.SH_L], I[_.SH_R], I[_.STERNUM], I[_.CHEST], W),
        ge.slerpQuaternions(U, W, 0.5));
      let r = t.q;
      (t.hips.copy(I[_.PELVIS]),
        r.Hips.copy(U),
        r.Spine.copy(ve.copy(U).invert()).multiply(ge),
        r.Chest.copy(ve.copy(ge).invert()).multiply(W),
        J(he, W, I[_.NECK], I[_.HEAD], r.Head),
        J(F, W, I[_.SH_L], I[_.EL_L], r.LeftArm),
        J(
          F,
          _e.copy(W).multiply(r.LeftArm),
          I[_.EL_L],
          I[_.WR_L],
          r.LeftForeArm,
        ),
        J(F, W, I[_.SH_R], I[_.EL_R], r.RightArm),
        J(
          F,
          _e.copy(W).multiply(r.RightArm),
          I[_.EL_R],
          I[_.WR_R],
          r.RightForeArm,
        ),
        J(F, U, I[_.HIP_L], I[_.KN_L], r.LeftUpLeg),
        J(F, _e.copy(U).multiply(r.LeftUpLeg), I[_.KN_L], I[_.AN_L], r.LeftLeg),
        J(F, U, I[_.HIP_R], I[_.KN_R], r.RightUpLeg),
        J(
          F,
          _e.copy(U).multiply(r.RightUpLeg),
          I[_.KN_R],
          I[_.AN_R],
          r.RightLeg,
        ));
    }
  };
