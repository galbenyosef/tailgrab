// assets/session-DxCN6jDh 04 — math
// Lines 841-1179 of readable/assets/session-DxCN6jDh.pretty.js (statement-aligned).
function Or(e, t, n, r, i, a) {
  let o = e.mode === A.BAIL,
    s = o ? 0 : F[t.dir],
    c = o ? 0 : Vt[t.dir],
    l = Y(e);
  M(e.yaw, e.ux, e.uy, e.uz, z);
  let u = e.vx * e.ux + e.vy * e.uy + e.vz * e.uz,
    d = e.vx - u * e.ux,
    f = e.vy - u * e.uy,
    p = e.vz - u * e.uz,
    m = o ? 0 : _((e.uy - Oe) / Oe, 0, 1);
  if (s) {
    let n = _(l / 17, 0, 1),
      r = v(ae, Je, n);
    (t.held & N.OLLIE && (r *= We),
      e.mode === A.MANUAL && (r *= 0.6),
      Rt(z.x, z.y, z.z, e.ux, e.uy, e.uz, Rn));
    let a = d * z.x + f * z.y + p * z.z,
      o = d * Rn.x + f * Rn.y + p * Rn.z;
    ((e.yaw -= s * r * i),
      M(e.yaw, e.ux, e.uy, e.uz, z),
      Rt(z.x, z.y, z.z, e.ux, e.uy, e.uz, Rn),
      (d += m * (a * z.x + o * Rn.x - d)),
      (f += m * (a * z.y + o * Rn.y - f)),
      (p += m * (a * z.z + o * Rn.z - p)));
  }
  let h = d * z.x + f * z.y + p * z.z,
    g = d - h * z.x,
    y = f - h * z.y,
    b = p - h * z.z;
  if (!o) {
    let n = (t.held & N.OLLIE) !== 0,
      a = (n ? Me : He) * r.speed;
    if (e.mode === A.GROUND && e.rolling && e.uy > 0.85 && c >= 0) {
      let t = h >= -0.2 ? 1 : -1,
        n = Math.abs(h);
      n < a && (h += t * Math.min(9 * (e.special >= 200 ? dt : 1) * i, a - n));
    }
    if (c < 0 && e.mode === A.GROUND && e.uy > 0.85) {
      let t = Math.abs(h),
        n = t > (e.xfer & j.SLIDE ? 3 : pt * r.speed);
      e.xfer = n ? e.xfer | j.SLIDE : e.xfer & ~j.SLIDE;
      let a = Math.min(t, (n ? 16 : 10) * i);
      h -= (h >= 0 ? 1 : -1) * a;
    } else e.xfer &= ~j.SLIDE;
    n &&
      e.uy < 0.97 &&
      e.uy > 0.2 &&
      z.y * h > 0 &&
      (h += (h > 0 ? 1 : -1) * Pe * i);
  }
  let x = v(1, ce, m);
  ((d = z.x * h + g * x), (f = z.y * h + y * x), (p = z.z * h + b * x));
  let S = _((e.uy - qe) / (le - qe), 0, 1),
    C = o ? 1 : v(f > 0 ? Ye : ze, 1, S),
    w = 17 * e.uy;
  ((d += w * e.ux * i * C),
    (f += (-17 + w * e.uy) * i * C),
    (p += w * e.uz * i * C));
  let T = 1 - (o ? (e.uy < 0.3 ? 0 : Ze) : ot) * i;
  if (
    ((d *= T), (f *= T), (p *= T), (l = Math.sqrt(d * d + f * f + p * p)), !o)
  ) {
    let t = Me * r.speed;
    if (e.uy > 0.94 && e.uy < 0.9995 && f < 0 && l > t) {
      let e = Math.max(0, 1 - (xe * (l - t) * i) / l);
      ((d *= e), (f *= e), (p *= e), (l *= e));
    } else
      e.mode === A.GROUND &&
        (c < 0 || !e.rolling) &&
        e.uy > 0.96 &&
        l < 0.5 &&
        ((d = 0), (f = 0), (p = 0), (l = 0), (e.rolling = !1));
  }
  let E = 17 * Math.min(1, r.speed);
  if (l > E) {
    let e = E / l;
    ((d *= e), (f *= e), (p *= e), (l = E));
  }
  let ee = e.x,
    te = e.y,
    ne = e.z;
  ((e.x += d * i),
    (e.y += f * i),
    (e.z += p * i),
    (e.vx = d),
    (e.vy = f),
    (e.vz = p));
  let re = e.x + e.ux * Xe,
    ie = e.y + e.uy * Xe,
    oe = e.z + e.uz * Xe;
  if (n.col.raySurface(re, ie, oe, -e.ux, -e.uy, -e.uz, 0.75, V)) {
    let t = Xe - V.dist,
      i = V.nx * e.ux + V.ny * e.uy + V.nz * e.uz,
      s = V.nx * d + V.ny * f + V.nz * p;
    if (t > 0.3 || (i < 0.7 && s < 0)) {
      ((e.x = ee),
        (e.y = te),
        (e.z = ne),
        Fr(e, -z.x * Math.sign(h || 1), 0, -z.z * Math.sign(h || 1), l, a));
      return;
    }
    if (V.ny < -0.2 && (o || !kr(e, n))) {
      o || Nr(e, r, a);
      return;
    }
    if (i < 0.7 && !o) {
      jr(e, n, r, c, a) || Nr(e, r, a);
      return;
    }
    ((e.x = V.px),
      (e.y = V.py),
      (e.z = V.pz),
      (e.ux = V.nx),
      (e.uy = V.ny),
      (e.uz = V.nz));
    let u = e.vx * e.ux + e.vy * e.uy + e.vz * e.uz,
      m = e.vx - u * e.ux,
      g = e.vy - u * e.uy,
      _ = e.vz - u * e.uz,
      v = Math.sqrt(m * m + g * g + _ * _);
    if (v > 1e-6) {
      let e = l / v;
      ((m *= e), (g *= e), (_ *= e));
    }
    ((e.vx = m),
      (e.vy = g),
      (e.vz = _),
      V.piece !== e.lastPiece && (e.lastPiece = V.piece),
      e.uy < 0.3 && Ar(e, n));
  } else if (o) return;
  else {
    jr(e, n, r, c, a) || Nr(e, r, a);
    return;
  }
  Pr(e, n, l, a);
}
function kr(e, t) {
  let n = e.uy < _e,
    r = V.px,
    i = V.py,
    a = V.pz,
    o = V.nx,
    s = V.ny,
    c = V.nz,
    l = -s * o,
    u = 1 - s * s,
    d = -s * c,
    f = Math.sqrt(l * l + u * u + d * d);
  if (f < 1e-6) return n;
  ((l /= f), (u /= f), (d /= f));
  let p = e.vx * l + e.vy * u + e.vz * d;
  if (!n && p <= 0) return !1;
  let m = Xe,
    h = pe;
  if (
    !t.col.raySurface(
      r + l * h + o * m,
      i + u * h + s * m,
      a + d * h + c * m,
      -o,
      -s,
      -c,
      m + h,
      H,
    )
  )
    return !1;
  let g = (H.px - r) * l + (H.py - i) * u + (H.pz - a) * d,
    _ = (H.px - r) * o + (H.py - i) * s + (H.pz - a) * c;
  if (
    ((h *= 2),
    !t.col.raySurface(
      r + l * h + o * m,
      i + u * h + s * m,
      a + d * h + c * m,
      -o,
      -s,
      -c,
      m + h,
      H,
    ))
  )
    return !1;
  let v = (H.px - r) * l + (H.py - i) * u + (H.pz - a) * d,
    y = (H.px - r) * o + (H.py - i) * s + (H.pz - a) * c,
    b = 2 * (g * y - v * _);
  if (!(Math.abs(b) > 1e-9)) return !1;
  let x = g * g + _ * _,
    S = v * v + y * y,
    C = (x * y - S * _) / b,
    w = (g * S - v * x) / b;
  if (w <= 0) return !1;
  let T = Math.sqrt(C * C + w * w),
    E = C * u + w * s,
    ee = 17 * Ye,
    te = n ? ke : 1;
  return p <= 0
    ? p * p >= te * ee * E
    : p * p - 2 * ee * (E + T) >= te * ee * T;
}
function Ar(e, t) {
  let n = e.ux,
    r = e.uz;
  if (
    !t.col.raySurface(
      e.x + n * 0.25,
      e.y + 0.3,
      e.z + r * 0.25,
      0,
      -1,
      0,
      0.6,
      H,
    ) ||
    H.ny < 0.7
  )
    return;
  M(e.yaw, e.ux, e.uy, e.uz, z);
  let i = e.vx * z.x + e.vy * z.y + e.vz * z.z >= 0 ? 1 : -1;
  ((e.x = H.px),
    (e.y = H.py),
    (e.z = H.pz),
    (e.ux = H.nx),
    (e.uy = H.ny),
    (e.uz = H.nz));
  let a = e.vx * e.ux + e.vy * e.uy + e.vz * e.uz;
  ((e.vx -= a * e.ux), (e.vy -= a * e.uy), (e.vz -= a * e.uz));
  let o = Y(e);
  e.yaw =
    o > 0.5
      ? I(
          (i * e.vx) / o,
          (i * e.vy) / o,
          (i * e.vz) / o,
          e.ux,
          e.uy,
          e.uz,
          e.yaw,
        )
      : I(n, 0, r, e.ux, e.uy, e.uz, e.yaw);
}
function jr(e, t, n, r, i) {
  if (e.mode !== A.GROUND || e.uy < 0.85) return !1;
  let a = Math.sqrt(e.vx * e.vx + e.vz * e.vz);
  if (
    a < 0.001 ||
    !t.rails.nearestCoping(
      e.x,
      e.y,
      e.z,
      0.5,
      0.3,
      0.3,
      e.vx / a,
      e.vz / a,
      0,
      J,
    )
  )
    return !1;
  let o = J.nx,
    s = J.nz,
    c = e.vx * o + e.vz * s;
  if (
    c < 0.3 ||
    !t.col.raySurface(
      J.px + o * 0.5,
      J.py - 0.35,
      J.pz + s * 0.5,
      -o,
      0,
      -s,
      1,
      H,
    ) ||
    H.ny > 0.9
  )
    return !1;
  M(e.yaw, e.ux, e.uy, e.uz, z);
  let l = e.vx * z.x + e.vz * z.z >= 0 ? 1 : -1,
    u = -s,
    d = o,
    f = e.vx * u + e.vz * d;
  if (r > 0 && c >= 2 && c >= a * 0.7) {
    let t = Math.min(c, ft);
    return (
      (e.vx = u * f + o * t),
      (e.vy = -Math.max(2.5, 0.8 * c)),
      (e.vz = d * f + s * t),
      Nr(e, n, i),
      !0
    );
  }
  return (
    Mr(e, u * f, -Math.max(2.5, 0.8 * c), d * f, l),
    mr(e, H.piece, i),
    !0
  );
}
function Mr(e, t, n, r, i) {
  ((e.x = H.px),
    (e.y = H.py),
    (e.z = H.pz),
    (e.ux = H.nx),
    (e.uy = H.ny),
    (e.uz = H.nz));
  let a = t * e.ux + n * e.uy + r * e.uz;
  ((t -= a * e.ux),
    (n -= a * e.uy),
    (r -= a * e.uz),
    (e.vx = t),
    (e.vy = n),
    (e.vz = r));
  let o = Y(e);
  e.yaw = I((i * t) / o, (i * n) / o, (i * r) / o, e.ux, e.uy, e.uz, e.yaw);
}
function Nr(e, t, n) {
  let r = e.uy < 0.3 && e.uy >= -0.2 && e.vy > 0;
  (r && Er(e),
    e.mode === A.GROUND && e.bankTick && wn(e, n),
    (n.flags |= P.LAUNCH),
    Dr(e, r, t, n),
    (e.coyote = 5));
}
function Pr(e, t, n, r) {
  for (let i = 0; i < 2; i++) {
    let a = i ? at : Ve,
      o = i ? Be : $e;
    ((K.x = e.x + e.ux * a),
      (K.y = e.y + e.uy * a),
      (K.z = e.z + e.uz * a),
      t.col.sphereWalls(K, o, e.ux, e.uy, e.uz, U) &&
        ((e.x += U.dx),
        (e.y += U.dy),
        (e.z += U.dz),
        Fr(e, U.nx, U.ny, U.nz, n, r)));
  }
}
