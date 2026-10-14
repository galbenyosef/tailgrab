// assets__bailPhysics-C1H0uy1H 05 — math
// Lines 1285-1495 of readable/assets__bailPhysics-C1H0uy1H.pretty.js (statement-aligned).
var Ne = 0.02,
  Pe = f.width / 2 - Ne,
  Y = f.length / 2 - 0.03,
  X = h(Y) - Ne,
  Fe = [
    [f.wheelX, f.wheelR, f.truckZ],
    [-f.wheelX, f.wheelR, f.truckZ],
    [f.wheelX, f.wheelR, -f.truckZ],
    [-f.wheelX, f.wheelR, -f.truckZ],
    [Pe, X, Y],
    [-Pe, X, Y],
    [Pe, X, -Y],
    [-Pe, X, -Y],
  ],
  Ie = [0, 1, 4, 5],
  Le = [2, 3, 6, 7],
  Re = [4, 5, 6, 7],
  ze = [0, 1, 2, 3],
  Z = Fe.reduce(
    (e, t) => [e[0] + t[0] / 8, e[1] + t[1] / 8, e[2] + t[2] / 8],
    [0, 0, 0],
  ),
  Q = new n(),
  $ = new n(),
  Be = new n(),
  Ve = f.width / 2,
  He = -Z[1],
  Ue = X + Ne - Z[1],
  We = f.length / 2,
  Ge = 0.15,
  Ke = 6,
  qe = 0.004,
  Je = class {
    body = new i(8);
    mirror = 1;
    rider = null;
    clock = 0;
    constructor() {
      let e = this.body;
      Fe.forEach((t, n) => {
        (e.set(n, t[0], t[1], t[2]),
          (e.r[n] = n < 4 ? f.wheelR : Ne),
          (e.roll[n] = +(n < 4)));
      });
      for (let t = 0; t < 8; t++) for (let n = t + 1; n < 8; n++) e.stick(t, n);
      ((e.drag = 0.1),
        (e.canSleep = !0),
        (e.pre = (t) => {
          if (
            ((this.clock += t),
            this.axes(e.p),
            (e.rollAxis.x = z.x),
            (e.rollAxis.y = z.y),
            (e.rollAxis.z = z.z),
            (e.rolling = R.y > 0.5),
            Math.abs(z.y) > 0.75)
          ) {
            let n = z.y > 0 ? Ie : Le,
              r = Ke * t * t;
            for (let t of n)
              ((e.p[t * 3] -= R.x * r), (e.p[t * 3 + 2] -= R.z * r));
          }
        }),
        (e.solve = () => {
          this.shove(!0);
        }));
    }
    shove(e) {
      let t = this.rider;
      if (!t || this.clock < Ge) return !1;
      let n = this.body.p,
        r = t.p,
        i = 0,
        a = 0,
        o = 0;
      for (let e = 0; e < 8; e++)
        ((i += n[e * 3] / 8), (a += n[e * 3 + 1] / 8), (o += n[e * 3 + 2] / 8));
      let s = !1;
      for (let c = 0; c < t.n; c++) {
        let l = t.r[c],
          u = r[c * 3] - i,
          d = r[c * 3 + 1] - a,
          f = r[c * 3 + 2] - o,
          p = u * L.x + d * L.y + f * L.z,
          m = u * R.x + d * R.y + f * R.z,
          h = u * z.x + d * z.y + f * z.z,
          g = Math.max(-Ve, Math.min(Ve, p)),
          _ = Math.max(He, Math.min(Ue, m)),
          v = Math.max(-We, Math.min(We, h)),
          y = p - g,
          b = m - _,
          x = h - v,
          S = Math.sqrt(y * y + b * b + x * x);
        if (S >= l) continue;
        if (
          (S < 1e-6
            ? ((y = 0), (b = m > (He + Ue) / 2 ? 1 : -1), (x = 0), (S = 0))
            : ((y /= S), (b /= S), (x /= S)),
          (s = !0),
          !e)
        )
          return !0;
        let C = S === 0 ? l + Math.abs(m - (b > 0 ? Ue : He)) : l - S,
          w = -(L.x * y + R.x * b + z.x * x) * C,
          T = -(L.y * y + R.y * b + z.y * x) * C,
          E = -(L.z * y + R.z * b + z.z * x) * C,
          D = Math.max(0, 1 - qe / Math.max(C, 1e-9)),
          O = this.body.o;
        for (let e = 0; e < 8; e++)
          ((n[e * 3] += w),
            (n[e * 3 + 1] += T),
            (n[e * 3 + 2] += E),
            (O[e * 3] += w * D),
            (O[e * 3 + 1] += T * D),
            (O[e * 3 + 2] += E * D));
        ((i += w), (a += T), (o += E));
      }
      return s;
    }
    start(e, t, n, r, i, a = k.rand, o = k) {
      let s = this.body;
      (s.reset(),
        (s.col = r),
        (s.planeY = i),
        (this.clock = 0),
        s.mu.fill(o.boardMu),
        s.e.fill(o.boardBounce),
        (s.muRoll = o.boardRoll),
        (this.mirror = e.determinant() < 0 ? -1 : 1),
        Fe.forEach((t, n) => {
          (Q.set(t[0], t[1], t[2]).applyMatrix4(e), s.set(n, Q.x, Q.y, Q.z));
        }),
        s.o.set(s.p),
        this.axes(s.p),
        this.center($));
      let c = Math.hypot(t.x, t.y, t.z),
        l = (a() - 0.5) * 2,
        u,
        d,
        f;
      if (c < 1) {
        let e = (a() < 0.5 ? -1 : 1) * 1.2;
        ((u = n.x * o.boardPop + L.x * e),
          (d = n.y * o.boardPop + L.y * e),
          (f = n.z * o.boardPop + L.z * e));
      } else {
        let e = o.boardPop + Math.min(c, 10) * o.boardPopPerSpeed,
          r = o.boardKeep;
        ((u = t.x * r + n.x * e + L.x * l),
          (d = t.y * r + n.y * e + L.y * l),
          (f = t.z * r + n.z * e + L.z * l));
      }
      let [p, m] = o.boardFlip,
        [h, g] = o.boardYaw,
        _ = (a() < 0.5 ? -1 : 1) * (p + a() * (m - p)),
        v = (a() - 0.5) * 2 * (h + a() * (g - h)),
        y = z.x * _ + n.x * v,
        b = z.y * _ + n.y * v,
        x = z.z * _ + n.z * v;
      for (let e = 0; e < 8; e++) {
        let t = e * 3,
          n = s.p[t] - $.x,
          r = s.p[t + 1] - $.y,
          i = s.p[t + 2] - $.z;
        ((s.v[t] = u + b * i - x * r),
          (s.v[t + 1] = d + x * n - y * i),
          (s.v[t + 2] = f + y * r - b * n));
      }
    }
    step(e) {
      (this.body.sleeping &&
        this.rider &&
        (this.axes(this.body.p), this.shove(!1) && this.body.wake()),
        this.body.step(e));
    }
    center(e) {
      let t = this.body.lerped();
      e.set(0, 0, 0);
      for (let n = 0; n < 8; n++)
        ((e.x += t[n * 3] / 8),
          (e.y += t[n * 3 + 1] / 8),
          (e.z += t[n * 3 + 2] / 8));
      return e;
    }
    matrix(e) {
      return (
        this.axes(this.body.lerped()),
        this.center($),
        e.makeBasis(L, R, z),
        Q.set(Z[0], Z[1], Z[2]).applyMatrix4(e),
        e.scale(Be.set(this.mirror, 1, 1)),
        e.setPosition($.sub(Q))
      );
    }
    axes(e) {
      (Ye(e, Ie, z),
        Ye(e, Le, Q),
        z.sub(Q).normalize(),
        Ye(e, Re, R),
        Ye(e, ze, Q),
        R.sub(Q),
        R.addScaledVector(z, -R.dot(z)).normalize(),
        L.crossVectors(R, z));
    }
  };
function Ye(e, t, n) {
  n.set(0, 0, 0);
  for (let r of t)
    ((n.x += e[r * 3]), (n.y += e[r * 3 + 1]), (n.z += e[r * 3 + 2]));
  return n.multiplyScalar(1 / t.length);
}
