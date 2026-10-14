// assets__verlet-BVVzuOqv 02 — math
// Lines 239-572 of readable/assets__verlet-BVVzuOqv.pretty.js (statement-aligned).
var s = 1 / 120,
  c = 6,
  l = 0.12,
  u = r(),
  d = n(),
  f = { x: 0, y: 0, z: 0 },
  p = class {
    n;
    p;
    o;
    v;
    r;
    w;
    mu;
    e;
    walls;
    roll;
    air;
    cn;
    vn0;
    hit;
    sticks = [];
    col = null;
    planeY = 0;
    ground = null;
    gravity = 17;
    drag = 0.15;
    spinDamp = 0;
    iterations = 6;
    rolling = !1;
    rollAxis = { x: 0, y: 0, z: 1 };
    muRoll = 0.05;
    impact = 0;
    impactAt = -1;
    sleeping = !1;
    canSleep = !1;
    t = 1;
    still = 0;
    acc = 0;
    view;
    pre = null;
    solve = null;
    post = null;
    constructor(e) {
      ((this.n = e),
        (this.p = new Float64Array(e * 3)),
        (this.o = new Float64Array(e * 3)),
        (this.v = new Float64Array(e * 3)),
        (this.cn = new Float64Array(e * 3)),
        (this.r = new Float64Array(e).fill(0.05)),
        (this.w = new Float64Array(e).fill(1)),
        (this.mu = new Float64Array(e).fill(0.5)),
        (this.e = new Float64Array(e).fill(0.2)),
        (this.vn0 = new Float64Array(e)),
        (this.air = new Float64Array(e)),
        (this.walls = new Uint8Array(e).fill(1)),
        (this.roll = new Uint8Array(e)),
        (this.hit = new Uint8Array(e)),
        (this.view = new Float64Array(e * 3)));
    }
    stick(e, t, n = 1, r = !1, i = -1, a = !1) {
      let o = this.p;
      i < 0 &&
        (i = Math.hypot(
          o[t * 3] - o[e * 3],
          o[t * 3 + 1] - o[e * 3 + 1],
          o[t * 3 + 2] - o[e * 3 + 2],
        ));
      let s = { a: e, b: t, rest: i, k: n, min: r, max: a };
      return (this.sticks.push(s), s);
    }
    wake() {
      ((this.sleeping = !1), (this.still = 0));
    }
    set(e, t, n, r) {
      ((this.p[e * 3] = t), (this.p[e * 3 + 1] = n), (this.p[e * 3 + 2] = r));
    }
    reset() {
      (this.v.fill(0),
        this.air.fill(1),
        (this.impact = 0),
        (this.impactAt = -1),
        (this.sleeping = !1),
        (this.still = 0),
        (this.acc = 0),
        (this.t = 1));
    }
    step(e) {
      for (this.acc = Math.min(this.acc + e, s * c); this.acc >= s;)
        ((this.acc -= s), this.sleeping || this.sub(s));
      this.t = this.sleeping ? 1 : this.acc / s;
    }
    lerped() {
      let { p: e, o: t, t: n, view: r } = this;
      if (n >= 1) r.set(e);
      else for (let i = 0; i < r.length; i++) r[i] = t[i] + (e[i] - t[i]) * n;
      return r;
    }
    sub(e) {
      let { n: t, p: n, o: r, v: i, w: a } = this,
        o = Math.max(0, 1 - this.drag * e);
      for (let s = 0; s < t; s++) {
        let t = s * 3;
        ((r[t] = n[t]),
          (r[t + 1] = n[t + 1]),
          (r[t + 2] = n[t + 2]),
          a[s] !== 0 &&
            ((i[t + 1] -= this.gravity * e),
            (i[t] *= o),
            (i[t + 1] *= o),
            (i[t + 2] *= o),
            (n[t] += i[t] * e),
            (n[t + 1] += i[t + 1] * e),
            (n[t + 2] += i[t + 2] * e)));
      }
      this.pre?.(e);
      for (let e = 0; e < this.iterations; e++) (this.relax(), this.solve?.());
      (this.post?.(), this.collide());
      for (let a = 0; a < t * 3; a++) i[a] = (n[a] - r[a]) / e;
      this.spinDamp > 0 && this.damp(e);
      let s = 0;
      for (let n = 0; n < t; n++) {
        let t = n * 3;
        (this.hit[n] && this.respond(n),
          (this.air[n] =
            this.hit[n] && this.cn[t + 1] > 0.3 ? 0 : this.air[n] + e),
          (s = Math.max(
            s,
            i[t] * i[t] + i[t + 1] * i[t + 1] + i[t + 2] * i[t + 2],
          )));
      }
      if (this.canSleep) {
        let a = !0;
        for (let e = 0; e < t && a; e++) a = this.air[e] < 0.1;
        ((this.still = a && s < 0.01 ? this.still + e : 0),
          this.still > 0.25 && ((this.sleeping = !0), i.fill(0), r.set(n)));
      }
    }
    damp(e) {
      let { n: t, v: n, w: r } = this,
        i = 0,
        a = 0,
        o = 0,
        s = 0;
      for (let e = 0; e < t; e++) {
        if (r[e] === 0) continue;
        let t = 1 / r[e],
          c = e * 3;
        ((i += n[c] * t), (a += n[c + 1] * t), (o += n[c + 2] * t), (s += t));
      }
      if (s === 0) return;
      ((i /= s), (a /= s), (o /= s));
      let c = Math.min(1, this.spinDamp * e);
      for (let e = 0; e < t; e++) {
        if (r[e] === 0) continue;
        let t = e * 3;
        ((n[t] += (i - n[t]) * c),
          (n[t + 1] += (a - n[t + 1]) * c),
          (n[t + 2] += (o - n[t + 2]) * c));
      }
    }
    relax() {
      let { p: e, w: t } = this;
      for (let n of this.sticks) {
        let r = n.a * 3,
          i = n.b * 3,
          a = e[i] - e[r],
          o = e[i + 1] - e[r + 1],
          s = e[i + 2] - e[r + 2],
          c = Math.sqrt(a * a + o * o + s * s);
        if (c < 1e-9 || (n.min && c >= n.rest) || (n.max && c <= n.rest))
          continue;
        let l = t[n.a] + t[n.b];
        if (l === 0) continue;
        let u = (((c - n.rest) / c) * n.k) / l,
          d = t[n.a] * u,
          f = t[n.b] * u;
        ((e[r] += a * d),
          (e[r + 1] += o * d),
          (e[r + 2] += s * d),
          (e[i] -= a * f),
          (e[i + 1] -= o * f),
          (e[i + 2] -= s * f));
      }
    }
    collide() {
      let { n: e, p: t, o: n, v: r, r: i, cn: a, col: o } = this;
      for (let s = 0; s < e; s++) {
        let e = s * 3,
          c = i[s];
        this.hit[s] = 0;
        let p = 0,
          m = 0,
          h = 0;
        if (!o)
          t[e + 1] - c < this.planeY &&
            ((t[e + 1] = this.planeY + c), (m = 1), (this.hit[s] = 1));
        else {
          let r = t[e] - n[e],
            i = t[e + 1] - n[e + 1],
            a = t[e + 2] - n[e + 2],
            g = Math.sqrt(r * r + i * i + a * a);
          if (
            g > 1e-5 &&
            o.raySurface(
              n[e],
              n[e + 1],
              n[e + 2],
              r / g,
              i / g,
              a / g,
              g + c,
              u,
            )
          ) {
            let n =
              (t[e] - u.px) * u.nx +
              (t[e + 1] - u.py) * u.ny +
              (t[e + 2] - u.pz) * u.nz;
            if (n < c) {
              let r = c - n;
              ((t[e] += u.nx * r),
                (t[e + 1] += u.ny * r),
                (t[e + 2] += u.nz * r),
                (p = u.nx),
                (m = u.ny),
                (h = u.nz),
                (this.hit[s] = 1));
            }
          }
          if (
            o.raySurface(t[e], t[e + 1] + l, t[e + 2], 0, -1, 0, l + c, u) &&
            u.ny > 0.3
          ) {
            let n =
              (t[e] - u.px) * u.nx +
              (t[e + 1] - u.py) * u.ny +
              (t[e + 2] - u.pz) * u.nz;
            if (n < c) {
              let r = c - n;
              ((t[e] += u.nx * r),
                (t[e + 1] += u.ny * r),
                (t[e + 2] += u.nz * r),
                (p = u.nx),
                (m = u.ny),
                (h = u.nz),
                (this.hit[s] = 1));
            }
          }
          if (
            (this.walls[s] &&
              ((f.x = t[e]),
              (f.y = t[e + 1]),
              (f.z = t[e + 2]),
              o.sphereWalls(f, c, 0, 1, 0, d) &&
                ((t[e] = f.x),
                (t[e + 1] = f.y),
                (t[e + 2] = f.z),
                (!this.hit[s] || m < 0.3) &&
                  ((p = d.nx), (m = d.ny), (h = d.nz)),
                (this.hit[s] = 1))),
            this.ground)
          ) {
            let n = this.ground(t[e], t[e + 2]);
            t[e + 1] - c < n &&
              ((t[e + 1] = n + c),
              (!this.hit[s] || m < 0.3) && ((p = 0), (m = 1), (h = 0)),
              (this.hit[s] = 1));
          }
        }
        this.hit[s] &&
          ((a[e] = p),
          (a[e + 1] = m),
          (a[e + 2] = h),
          (this.vn0[s] = r[e] * p + r[e + 1] * m + r[e + 2] * h));
      }
    }
    respond(e) {
      let { v: t, cn: n } = this,
        r = e * 3,
        i = n[r],
        a = n[r + 1],
        o = n[r + 2],
        s = this.vn0[e],
        c = t[r],
        l = t[r + 1],
        u = t[r + 2],
        d = c * i + l * a + u * o,
        f = d;
      (s < -1.5 ? (f = Math.max(d, -this.e[e] * s)) : d < 0 && (f = 0),
        (f = Math.min(f, Math.max(0, -this.e[e] * s) + 0.5)),
        (c += i * (f - d)),
        (l += a * (f - d)),
        (u += o * (f - d)),
        -s > this.impact && ((this.impact = -s), (this.impactAt = e)));
      let p = Math.max(0, f - s),
        h = c * i + l * a + u * o,
        g = c - i * h,
        _ = l - a * h,
        v = u - o * h;
      if (this.roll[e] && this.rolling) {
        let n = this.rollAxis,
          s = n.x,
          c = n.y,
          l = n.z,
          u = s * i + c * a + l * o;
        ((s -= i * u), (c -= a * u), (l -= o * u));
        let d = Math.sqrt(s * s + c * c + l * l);
        if (d > 1e-6) {
          ((s /= d), (c /= d), (l /= d));
          let n = g * s + _ * c + v * l,
            u = g - s * n,
            f = _ - c * n,
            y = v - l * n,
            b = m(Math.abs(n), this.muRoll * p),
            x = m(Math.sqrt(u * u + f * f + y * y), this.mu[e] * p);
          ((g = s * n * b + u * x),
            (_ = c * n * b + f * x),
            (v = l * n * b + y * x),
            (t[r] = i * h + g),
            (t[r + 1] = a * h + _),
            (t[r + 2] = o * h + v));
          return;
        }
      }
      let y = m(Math.sqrt(g * g + _ * _ + v * v), this.mu[e] * p);
      ((t[r] = i * h + g * y),
        (t[r + 1] = a * h + _ * y),
        (t[r + 2] = o * h + v * y));
    }
  };
function m(e, t) {
  return e > 1e-9 ? Math.max(0, 1 - t / e) : 0;
}
