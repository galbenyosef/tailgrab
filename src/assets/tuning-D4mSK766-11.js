// assets/tuning-D4mSK766 11 — center
// Lines 2887-3191 of readable/assets/tuning-D4mSK766.pretty.js (statement-aligned).
var dn = 0.5,
  fn = 2,
  SurfaceProbe = class {
    geometry;
    bvh;
    normals;
    pieces;
    surf;
    index;
    _ray = new e();
    _sphere = new n();
    _p = new u();
    _n = new u();
    _en = new u();
    constructor(e) {
      ((this.geometry = new a()),
        this.geometry.setAttribute(`position`, new i(e.positions, 3)),
        this.geometry.setIndex(new i(e.indices, 1)),
        (this.normals = e.normals),
        (this.pieces = e.pieces),
        (this.surf = e.surf ?? new Uint8Array(e.pieces.length)),
        (this.bvh = new sn(this.geometry)),
        (this.index = this.geometry.index.array));
    }
    raySurface(e, t, n, r, i, a, o, s) {
      let c = this._ray;
      (c.origin.set(e, t, n), c.direction.set(r, i, a));
      let l = this.bvh.raycastFirst(c, 0, 0, o);
      if (l && this.surf[l.face.a] & cn.LOOSE) {
        l = null;
        for (let e of this.bvh.raycast(c, 0, 0, o))
          !(this.surf[e.face.a] & cn.LOOSE) &&
            (!l || e.distance < l.distance) &&
            (l = e);
      }
      if (!l || l.distance > o) return !1;
      let { a: u, b: d, c: f } = l.face,
        p = this.geometry.attributes.position.array,
        m = p[u * 3],
        h = p[u * 3 + 1],
        g = p[u * 3 + 2],
        _ = p[d * 3] - m,
        v = p[d * 3 + 1] - h,
        y = p[d * 3 + 2] - g,
        b = p[f * 3] - m,
        x = p[f * 3 + 1] - h,
        S = p[f * 3 + 2] - g,
        C = l.point.x,
        w = l.point.y,
        T = l.point.z,
        E = C - m,
        D = w - h,
        O = T - g,
        k = _ * _ + v * v + y * y,
        A = _ * b + v * x + y * S,
        j = b * b + x * x + S * S,
        M = E * _ + D * v + O * y,
        N = E * b + D * x + O * S,
        ee = k * j - A * A,
        P = 0,
        F = 0;
      ee > 1e-12 && ((P = (j * M - A * N) / ee), (F = (k * N - A * M) / ee));
      let te = 1 - P - F,
        I = this.normals,
        L = I[u * 3] * te + I[d * 3] * P + I[f * 3] * F,
        R = I[u * 3 + 1] * te + I[d * 3 + 1] * P + I[f * 3 + 1] * F,
        ne = I[u * 3 + 2] * te + I[d * 3 + 2] * P + I[f * 3 + 2] * F,
        re = Math.sqrt(L * L + R * R + ne * ne) || 1;
      return (
        (L /= re),
        (R /= re),
        (ne /= re),
        (s.dist = l.distance),
        (s.px = C),
        (s.py = w),
        (s.pz = T),
        (s.nx = L),
        (s.ny = R),
        (s.nz = ne),
        (s.piece = this.pieces[u]),
        (s.surf = this.surf[u]),
        !0
      );
    }
    probeNearest(e, t, n, r, i, a, o, s) {
      let c = this._ray;
      (c.origin.set(e, t, n), c.direction.set(r, i, a));
      let l = this.bvh
          .raycast(c, 0, 0, o)
          .filter((e) => !(this.surf[e.face.a] & cn.LOOSE)),
        u = 1 / 0;
      for (let e of l) e.distance <= o && e.distance < u && (u = e.distance);
      if (u === 1 / 0) return !1;
      let d = this.geometry.attributes.position.array,
        f = this.normals;
      for (let e of l) {
        if (e.distance > u + 1e-6) continue;
        let { a: t, b: n, c: r } = e.face,
          i = d[t * 3],
          a = d[t * 3 + 1],
          o = d[t * 3 + 2],
          c = d[n * 3] - i,
          l = d[n * 3 + 1] - a,
          p = d[n * 3 + 2] - o,
          m = d[r * 3] - i,
          h = d[r * 3 + 1] - a,
          g = d[r * 3 + 2] - o,
          _ = e.point.x - i,
          v = e.point.y - a,
          y = e.point.z - o,
          b = c * c + l * l + p * p,
          x = c * m + l * h + p * g,
          S = m * m + h * h + g * g,
          C = _ * c + v * l + y * p,
          w = _ * m + v * h + y * g,
          T = b * S - x * x,
          E = 0,
          D = 0;
        T > 1e-12 && ((E = (S * C - x * w) / T), (D = (b * w - x * C) / T));
        let O = 1 - E - D,
          k = f[t * 3] * O + f[n * 3] * E + f[r * 3] * D,
          A = f[t * 3 + 1] * O + f[n * 3 + 1] * E + f[r * 3 + 1] * D,
          j = f[t * 3 + 2] * O + f[n * 3 + 2] * E + f[r * 3 + 2] * D,
          M = Math.sqrt(k * k + A * A + j * j) || 1;
        if (s(k / M, A / M, j / M)) return !0;
      }
      return !1;
    }
    sphereWalls(e, t, n, r, i, a) {
      let o = this._sphere,
        s = this._p,
        c = this._n,
        l = this._en,
        u = this.surf,
        d = this.index,
        f = e.x,
        p = e.y,
        m = e.z,
        h = !1,
        g = 0;
      ((a.nx = 0), (a.ny = 0), (a.nz = 0), (a.surf = 0));
      for (let f = 0; f < fn; f++) {
        (o.center.set(e.x, e.y, e.z), (o.radius = t));
        let f = !1,
          p = -1 / 0,
          m = 0;
        if (
          (this.bvh.shapecast({
            intersectsBounds: (e) => e.intersectsSphere(o),
            intersectsTriangle: (e, h) => {
              if (u[d[h * 3]] & cn.LOOSE) return !1;
              e.closestPointToPoint(o.center, s);
              let _ = o.center.x - s.x,
                v = o.center.y - s.y,
                y = o.center.z - s.z,
                b = _ * _ + v * v + y * y;
              if (
                b >= t * t ||
                (e.getNormal(c), c.x * n + c.y * r + c.z * i >= dn)
              )
                return !1;
              let x = c.x * _ + c.y * v + c.z * y;
              if (x <= 1e-6)
                return (
                  b - x * x <= 1e-6 &&
                    x > p &&
                    ((p = x), l.copy(c), (m = u[d[h * 3]])),
                  !1
                );
              let S = Math.sqrt(b);
              ((_ /= S), (v /= S), (y /= S));
              let C = t - S;
              return (
                (o.center.x += _ * C),
                (o.center.y += v * C),
                (o.center.z += y * C),
                C > g &&
                  ((g = C),
                  (a.nx = c.x),
                  (a.ny = c.y),
                  (a.nz = c.z),
                  (a.surf = u[d[h * 3]])),
                (f = !0),
                !1
              );
            },
          }),
          p > -1 / 0)
        ) {
          let e = t - p;
          ((o.center.x += l.x * e),
            (o.center.y += l.y * e),
            (o.center.z += l.z * e),
            e > g &&
              ((g = e), (a.nx = l.x), (a.ny = l.y), (a.nz = l.z), (a.surf = m)),
            (f = !0));
        }
        if (!f) break;
        ((h = !0), (e.x = o.center.x), (e.y = o.center.y), (e.z = o.center.z));
      }
      return ((a.dx = e.x - f), (a.dy = e.y - p), (a.dz = e.z - m), h);
    }
  },
  mn = 1 / 30,
  hn = 8.2,
  gn = 10.8,
  _n = 9.5,
  vn = 0.04,
  yn = 0.18,
  bn = 3.4,
  xn = 2.3,
  Sn = 1.2,
  Cn = 0.4,
  wn = 0.6,
  Tn = 0.985,
  En = 0.94,
  Dn = 0.32,
  On = 0.96,
  kn = 0.5,
  An = 10.5,
  jn = 1.6,
  Mn = 0.5,
  Nn = 0.25,
  Pn = 0.3,
  Fn = 0.7,
  In = -0.2,
  Ln = 0.5,
  Rn = 0.5,
  zn = -0.05,
  Bn = 0.3,
  Vn = 0.7,
  Hn = 0.85,
  Un = 0.5,
  Wn = 0.3,
  Gn = 2.5,
  Kn = 0.7,
  qn = 4.6,
  Jn = 6.6,
  Yn = 2.2,
  Xn = 9.5,
  Zn = 0.12,
  Qn = 0.2,
  $n = 0.03,
  er = 0.25,
  tr = 0.45,
  nr = 0.3,
  rr = 1.2,
  ir = 1.5,
  ar = 0.866,
  or = 0.57,
  sr = 0.5,
  cr = 0.5,
  lr = 0.5,
  ur = 0.17,
  dr = 1.05,
  fr = 0.985,
  pr = 0.707,
  mr = 1e3,
  hr = 0.55,
  gr = 0.35,
  _r = 0.9,
  vr = 0.6,
  yr = 1.5,
  br = 1.6,
  xr = 4.5,
  Sr = 0.5,
  Cr = 0.9,
  wr = 1.5,
  Tr = 0.03,
  Er = 0.7,
  Dr = 1.1,
  Or = 0.35,
  kr = 0.15,
  Ar = 0.34,
  jr = 0.3,
  Mr = 0.3,
  Nr = 2.5,
  Pr = 1.2,
  Fr = 0.97,
  Ir = [0.085, 0.097, 0.35],
  Lr = [0.8, 0.55, 1],
  Rr = [0.25, 0.2, 1],
  zr = [0.175, 0.625, 0.5],
  Br = [50, 15, 90],
  Vr = 0.866,
  Hr = 0.5,
  Ur = 0.8,
  Wr = 0.3,
  Gr = 3.5,
  Kr = 0.35,
  qr = 3.2,
  Jr = 0.35,
  Yr = 0.25,
  Xr = 0.85,
  Zr = 0.3,
  Qr = 1.3,
  $r = 3.6,
  ei = 0.8,
  ti = 0.25,
  ni = 0.55,
  ri = 3.5,
  ii = 0.5,
  ai = { speed: 1.2, air: 1.05, spin: 1.1, balance: 1.15 },
  oi = 1.6,
  si = [100, 75, 50, 25, 10];
