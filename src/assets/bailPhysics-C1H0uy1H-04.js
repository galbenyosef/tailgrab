// assets/bailPhysics-C1H0uy1H 04 — math
// Lines 1013-1284 of readable/assets/bailPhysics-C1H0uy1H.pretty.js (statement-aligned).
function Ee(e, t, n) {
  let { p: r, w: i, n: a } = e,
    o = 0,
    s = 0,
    c = 0,
    l = 0;
  for (let e = 0; e < a; e++) {
    let t = 1 / i[e];
    ((o += r[e * 3] * t),
      (s += r[e * 3 + 1] * t),
      (c += r[e * 3 + 2] * t),
      (l += t));
  }
  ((o /= l), (s /= l), (c /= l));
  let u = 0,
    d = 0,
    f = 0,
    p = 0,
    m = 0,
    h = 0,
    g = 0,
    _ = 0,
    v = 0;
  for (let e = 0; e < a; e++) {
    let n = 1 / i[e],
      a = e * 3,
      l = r[a] - o,
      y = r[a + 1] - s,
      b = r[a + 2] - c,
      x = t[a],
      S = t[a + 1],
      C = t[a + 2];
    ((u += n * (y * C - b * S)),
      (d += n * (b * x - l * C)),
      (f += n * (l * S - y * x)),
      (p += n * (y * y + b * b)),
      (m += n * (l * l + b * b)),
      (h += n * (l * l + y * y)),
      (g -= n * l * y),
      (_ -= n * l * b),
      (v -= n * y * b));
  }
  let y = m * h - v * v,
    b = _ * v - g * h,
    x = g * v - _ * m,
    S = p * y + g * b + _ * x;
  if (Math.abs(S) < 1e-12) return !1;
  let C = p * h - _ * _,
    w = g * _ - p * v,
    T = p * m - g * g;
  return (
    (n[0] = (y * u + b * d + x * f) / S),
    (n[1] = (b * u + C * d + w * f) / S),
    (n[2] = (x * u + w * d + T * f) / S),
    (K[0] = o),
    (K[1] = s),
    (K[2] = c),
    !0
  );
}
function De(e, t) {
  let n = e.p,
    r = G[0] * t,
    i = G[1] * t,
    a = G[2] * t;
  for (let t = 0; t < e.n; t++) {
    let e = t * 3,
      o = n[e] - K[0],
      s = n[e + 1] - K[1],
      c = n[e + 2] - K[2];
    ((n[e] += i * c - a * s),
      (n[e + 1] += a * o - r * c),
      (n[e + 2] += r * s - i * o));
  }
}
var BoneMapper = class {
  q;
  m;
  rot = new e();
  ids;
  constructor(e) {
    ((this.ids = e),
      (this.q = new Float64Array(e.length * 3)),
      (this.m = Float64Array.from(e, (e) => 1 / v[e].w)));
  }
  start(e, t) {
    let n = y,
      { ids: r, q: i, m: a } = this,
      o = 0,
      s = 0,
      c = 0,
      l = 0;
    (r.forEach((e, t) => {
      ((o += n[e][0] * a[t]),
        (s += n[e][1] * a[t]),
        (c += n[e][2] * a[t]),
        (l += a[t]));
    }),
      r.forEach((e, r) => {
        ((i[r * 3] = (n[e][0] - o / l) * t),
          (i[r * 3 + 1] = n[e][1] - s / l),
          (i[r * 3 + 2] = n[e][2] - c / l));
      }),
      this.rot.identity(),
      this.fit(e.p, 30));
  }
  match(e) {
    this.fit(e.p, 20);
    let { ids: t, q: n } = this,
      r = e.p;
    H.makeRotationFromQuaternion(this.rot);
    let i = H.elements;
    t.forEach((e, t) => {
      let a = n[t * 3],
        o = n[t * 3 + 1],
        s = n[t * 3 + 2];
      ((r[e * 3] = K[0] + i[0] * a + i[4] * o + i[8] * s),
        (r[e * 3 + 1] = K[1] + i[1] * a + i[5] * o + i[9] * s),
        (r[e * 3 + 2] = K[2] + i[2] * a + i[6] * o + i[10] * s));
    });
  }
  fit(e, t) {
    let { ids: n, q: r, m: i } = this,
      a = 0,
      o = 0,
      s = 0,
      c = 0;
    (n.forEach((t, n) => {
      ((a += e[t * 3] * i[n]),
        (o += e[t * 3 + 1] * i[n]),
        (s += e[t * 3 + 2] * i[n]),
        (c += i[n]));
    }),
      (a /= c),
      (o /= c),
      (s /= c),
      (K[0] = a),
      (K[1] = o),
      (K[2] = s));
    let l = Ce;
    (l.fill(0),
      n.forEach((t, n) => {
        let c = (e[t * 3] - a) * i[n],
          u = (e[t * 3 + 1] - o) * i[n],
          d = (e[t * 3 + 2] - s) * i[n];
        for (let e = 0; e < 3; e++) {
          let t = r[n * 3 + e];
          ((l[e * 3] += c * t),
            (l[e * 3 + 1] += u * t),
            (l[e * 3 + 2] += d * t));
        }
      }));
    for (let e = 0; e < t; e++) {
      H.makeRotationFromQuaternion(this.rot);
      let e = H.elements,
        t = 0,
        n = 0,
        r = 0,
        i = 0;
      for (let a = 0; a < 3; a++) {
        let o = e[a * 4],
          s = e[a * 4 + 1],
          c = e[a * 4 + 2],
          u = l[a * 3],
          d = l[a * 3 + 1],
          f = l[a * 3 + 2];
        ((t += s * f - c * d),
          (n += c * u - o * f),
          (r += o * d - s * u),
          (i += o * u + s * d + c * f));
      }
      let a = 1 / (Math.abs(i) + 1e-9);
      ((t *= a), (n *= a), (r *= a));
      let o = Math.sqrt(t * t + n * n + r * r);
      if (o < 1e-6) break;
      (ye.setFromAxisAngle(V.set(t / o, n / o, r / o), o),
        this.rot.premultiply(ye).normalize());
    }
  }
};
function ke(e) {
  let t = _.PELVIS * 3,
    n = _.NECK * 3,
    r = e[n] - e[t],
    i = e[n + 1] - e[t + 1],
    a = e[n + 2] - e[t + 2];
  return Math.abs(i) / (Math.sqrt(r * r + i * i + a * a) || 1);
}
function Ae(e, t, n, r, i, a, o, s) {
  (L.set(
    e[n * 3] - e[r * 3],
    e[n * 3 + 1] - e[r * 3 + 1],
    e[n * 3 + 2] - e[r * 3 + 2],
  ).normalize(),
    z.set(
      e[i * 3] - e[a * 3],
      e[i * 3 + 1] - e[a * 3 + 1],
      e[i * 3 + 2] - e[a * 3 + 2],
    ),
    R.crossVectors(z, L).normalize().multiplyScalar(o),
    z.crossVectors(L, R).multiplyScalar(o),
    (s[0] = e[t * 3]),
    (s[1] = e[t * 3 + 1]),
    (s[2] = e[t * 3 + 2]),
    (s[3] = L.x),
    (s[4] = L.y),
    (s[5] = L.z),
    (s[6] = R.x),
    (s[7] = R.y),
    (s[8] = R.z),
    (s[9] = z.x),
    (s[10] = z.y),
    (s[11] = z.z));
}
function je(e, t, n, r) {
  let i = y,
    a = (e, t, n, a, o) => {
      ((r[e * 3] = t - i[o][0]),
        (r[e * 3 + 1] = n - i[o][1]),
        (r[e * 3 + 2] = a - i[o][2]));
    },
    o = (e, t, n, r) => {
      let o = Math.cos(n),
        s = Math.sin(n),
        [c, l, u] = i[t],
        [d, f, p] = i[e];
      a(e, d, l + (f - l) * o - (p - u) * s, u + (f - l) * s + (p - u) * o, r);
    };
  for (let t of N) o(t, _.PELVIS, -e.arch * P, _.PELVIS);
  o(_.HEAD, _.NECK, -e.nod * P, _.CHEST);
  let s = () => (n() - 0.5) * 2 * t,
    c = (e, t, n, o, c, l, u) => {
      let d = s(),
        f = s(),
        p = s();
      (B.set(o[0] * l + d * l, o[1] + f, o[2] + p).normalize(),
        V.set(
          c[0] * l + (d + s() * 0.3) * l,
          c[1] + f + s() * 0.3,
          c[2] + p + s() * 0.3,
        ).normalize());
      let m = Math.hypot(
          i[t][0] - i[e][0],
          i[t][1] - i[e][1],
          i[t][2] - i[e][2],
        ),
        h = Math.hypot(i[n][0] - i[t][0], i[n][1] - i[t][1], i[n][2] - i[t][2]),
        g = i[e][0] + B.x * m,
        _ = i[e][1] + B.y * m,
        v = i[e][2] + B.z * m;
      (a(t, g, _, v, u),
        (r[n * 3] = V.x * h),
        (r[n * 3 + 1] = V.y * h),
        (r[n * 3 + 2] = V.z * h));
    };
  (c(_.HIP_L, _.KN_L, _.AN_L, e.thigh, e.shin, 1, _.PELVIS),
    c(_.HIP_R, _.KN_R, _.AN_R, e.thigh, e.shin, -1, _.PELVIS),
    c(_.SH_L, _.EL_L, _.WR_L, e.arm, e.fore, 1, _.CHEST),
    c(_.SH_R, _.EL_R, _.WR_R, e.arm, e.fore, -1, _.CHEST));
}
function Me(e, t, n, r, i) {
  (L.subVectors(e, t).normalize(),
    z.subVectors(n, r),
    R.crossVectors(z, L).normalize(),
    z.crossVectors(L, R),
    i.setFromRotationMatrix(H.makeBasis(L, R, z)));
}
function J(e, t, n, r, i) {
  (B.subVectors(r, n).normalize().applyQuaternion(ve.copy(t).invert()),
    V.copy(e).applyQuaternion(i),
    i.premultiply(ye.setFromUnitVectors(V, B)).normalize());
}
