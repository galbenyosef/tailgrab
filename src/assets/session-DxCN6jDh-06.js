// assets/session-DxCN6jDh 06 — math
// Lines 1494-1819 of readable/assets/session-DxCN6jDh.pretty.js (statement-aligned).
function Vr(e, t, n) {
  if (
    !t.rails.nearestCoping(e.x, e.y, e.z, 1.2, 0.5, 6, e.vnx, e.vnz, 0.866, J)
  )
    return;
  let r = J.nx,
    i = J.nz;
  if (t.rails.segs[J.seg].flags & ie.SPINE) {
    ((e.vnx = -r),
      (e.vnz = -i),
      (e.vd = t.col.raySurface(
        J.px - r * 0.6,
        J.py - 0.3,
        J.pz - i * 0.6,
        r,
        0,
        i,
        1,
        H,
      )
        ? -(r * H.px + i * H.pz)
        : -(r * J.px + i * J.pz)));
    let a = -r * 0.3,
      o = -i * 0.3,
      s = Math.sqrt(a * a + 1 + o * o);
    ((e.ux = a / s),
      (e.uy = 1 / s),
      (e.uz = o / s),
      (e.xfer = j.SPINE),
      (n.flags |= P.TRANSFER));
    return;
  }
  if (e.y < J.py + 0.25) return;
  ((e.vert = !1), (e.vx -= r * 2), (e.vz -= i * 2));
  let a = Math.sqrt(e.vx * e.vx + e.vz * e.vz);
  if (a > 0.5) {
    let t = S(e.yaw),
      n = b(e.yaw),
      r = e.vx / a,
      i = e.vz / a;
    r * t + i * n < 0 && ((r = -r), (i = -i));
    let o = h(r * n - i * t, r * t + i * n);
    ((e.yaw += o), (e.airYaw0 += o));
  }
  ((e.xfer = j.OUT), (n.flags |= P.TRANSFER));
}
function Hr(e, t, n) {
  let r = t * e.vnz - n * e.vnx;
  if (r < 1e-6 && r > -1e-6) return !1;
  let i = t * e.vnx + n * e.vnz,
    a = e.vx,
    o = e.vz;
  ((e.vx = a * i + o * r),
    (e.vz = -a * r + o * i),
    (a = e.ux),
    (o = e.uz),
    (e.ux = a * i + o * r),
    (e.uz = -a * r + o * i));
  let s = h(r, i);
  return ((e.yaw += s), (e.airYaw0 += s), (e.vnx = t), (e.vnz = n), !0);
}
function Ur(e, t, n) {
  if (e.vert || e.vx * e.vx + e.vz * e.vz < 1) return;
  t * t + n * n < 1 && ((t = S(e.yaw)), (n = b(e.yaw)));
  let r = h(e.vx * n - e.vz * t, e.vx * t + e.vz * n);
  (r > 3.141592653589793 / 2
    ? (r -= y)
    : r < -3.141592653589793 / 2 && (r += y),
    (e.yaw += r),
    (e.airYaw0 += r));
}
function Wr(e) {
  let t = Math.sqrt(V.nx * V.nx + V.nz * V.nz);
  return (
    t > 0.5 &&
    e.rails.nearestCoping(
      V.px,
      V.py,
      V.pz,
      0.5,
      3,
      0.05,
      V.nx / t,
      V.nz / t,
      0.866,
      J,
    )
  );
}
function Gr(e, t) {
  ((e.x = V.px + V.nx * $e),
    (e.y = V.py + V.ny * $e),
    (e.z = V.pz + V.nz * $e));
  let n = -(e.vx * V.nx + e.vy * V.ny + e.vz * V.nz);
  if (n > 0) {
    let r = e.vx,
      i = e.vz;
    ((e.vx += V.nx * n),
      (e.vy += V.ny * n),
      (e.vz += V.nz * n),
      Ur(e, r, i),
      (t.flags |= P.WALL),
      (t.impact = Math.max(t.impact, n)));
  }
}
function Kr(e) {
  ((G.chain = -1),
    (G.r = 0),
    (G.vx = e.vx),
    (G.vy = e.vy),
    (G.vz = e.vz),
    (G.ramp = e.mode === A.AIR && e.vert ? e.airPiece : -1));
}
function qr(e, t, n, r, i) {
  if (!t.rails.sweep(n, r, i, e.x, e.y, e.z, 0.55, 0.35, 0.9, zn, G)) return !1;
  if (
    t.rails.segs[zn.seg].piece !== e.airPiece ||
    e.rail >= 0 ||
    e.vert ||
    e.vy <= -1.5
  )
    return !0;
  let a = e.vy > 0 ? e.vy / 17 : 0;
  return (
    (G.ramp = e.airPiece),
    t.rails.sweep(
      n,
      r,
      i,
      e.x + e.vx * a,
      e.y + e.vy * a * 0.5,
      e.z + e.vz * a,
      0.55,
      0.6,
      0,
      Bn,
      G,
    )
      ? t.rails.sweep(n, r, i, e.x, e.y, e.z, Ge, tt, Fe, zn, G)
      : ((G.ramp = -1), !0)
  );
}
function Jr(e, t, n, r) {
  return e.col.raySurface(K.x + n * 0.5, K.y, K.z + r * 0.5, -n, 0, -r, 1, H) ||
    e.col.raySurface(
      K.x + n * 0.5,
      K.y - t * 0.9,
      K.z + r * 0.5,
      -n,
      0,
      -r,
      1,
      H,
    )
    ? H.piece
    : 0;
}
function Yr(e, t, n) {
  let r = V.nx,
    i = V.ny,
    a = V.nz,
    o = e.ux * r + e.uy * i + e.uz * a;
  M(e.yaw, e.ux, e.uy, e.uz, z);
  let s = z.x * r + z.y * i + z.z * a,
    c = z.x - s * r,
    l = z.y - s * i,
    u = z.z - s * a,
    d = Math.sqrt(c * c + l * l + u * u) || 1;
  ((c /= d), (l /= d), (u /= d));
  let f = e.vx * r + e.vy * i + e.vz * a,
    p = e.vx - f * r,
    m = e.vy - f * i,
    h = e.vz - f * a,
    g = Math.sqrt(p * p + m * m + h * h),
    y = -f,
    x = o > 0.57 || (!e.vert && e.uy > 0.5),
    C = x ? Gt.NONE : Gt.ANGLE,
    w = 1,
    T = -1;
  if (g > 1) {
    let t = (c * p + l * m + u * h) / g,
      n = v(ve, he, _((g - 3) / (He - 3), 0, 1));
    if (((T = Math.abs(t)), (w = t >= 0 ? 1 : -1), e.vert)) {
      let t = -p * e.vnz + h * e.vnx,
        n = p + t * e.vnz,
        r = h - t * e.vnx,
        i = Math.sqrt(n * n + m * m + r * r);
      T =
        i <= 1
          ? -1
          : Math.max(
              T,
              Math.abs(c * n + l * m + u * r) / i,
              Math.abs(c * p - l * m + u * h) / g,
            );
    } else {
      let t = Math.sqrt(e.vx * e.vx + e.vz * e.vz),
        n = t > 1 ? (S(e.yaw) * e.vx + b(e.yaw) * e.vz) / t : 0;
      Math.abs(n) > T && ((T = Math.abs(n)), (w = n >= 0 ? 1 : -1));
    }
    x && T >= 0 && T <= n && ((x = !1), (C = Gt.SPIN));
  }
  let E = e.trickId ? D[e.trickId] : null;
  E &&
    ((E.kind === O.FLIP || E.kind === O.SPECIAL_AIR) &&
      e.simTick + 4 < e.trickTick + E.ticks &&
      ((x = !1), (C = Gt.FLIP)),
    E.kind === O.GRAB && e.trickEnd === 0 && ((x = !1), (C = Gt.GRAB)));
  let ee = ei(e),
    te = e.queued & sr && !e.vert ? (e.queued & cr ? Ct : Ft) : 0,
    ne = e.vert,
    re = e.vert ? e.xfer & (j.REV_L | j.REV_R) : 0;
  if (
    ((e.x = V.px),
    (e.y = V.py),
    (e.z = V.pz),
    (e.ux = r),
    (e.uy = i),
    (e.uz = a),
    (e.vert = !1),
    (e.spinVel = 0),
    (n.impact = Math.max(n.impact, y)),
    !x)
  ) {
    ((e.vx = p), (e.vy = m), (e.vz = h), (n.bailWhy = C), xi(e, n));
    return;
  }
  if (g > 1) {
    let t = w / g;
    e.yaw = I(p * t, m * t, h * t, r, i, a, e.yaw);
  } else e.yaw = I(c, l, u, r, i, a, e.yaw);
  ((e.vx = p),
    (e.vy = m),
    (e.vz = h),
    ti(e, ee, n),
    ni(e, t, V.piece, n),
    e.xfer & j.SPINE
      ? L(e, Lt, 0, 0, D[Lt].base, n)
      : e.vturn >= 0.45 && L(e, At, 0, 0, D[At].base, n),
    (e.xfer = 0),
    (e.vturn = 0),
    ee >= 2 &&
      T >= 0 &&
      (T >= 0.985
        ? (Sn(e, ge), (n.grade = Wt.PERFECT))
        : T < 0.707 &&
          e.comboBase > 750 &&
          (Sn(e, -500), (n.grade = Wt.SLOPPY))),
    mr(e, V.piece, n),
    (e.trickId = 0),
    (e.queued = 0),
    (n.flags |= P.LAND),
    (n.landSpin = ee),
    te
      ? wr(e, te, n)
      : (X(e, A.GROUND),
        ne ? Xr(e, re) : e.comboMult > 0 && (e.bankTick = e.simTick + 4)));
}
function Xr(e, t) {
  ((e.xfer = (e.xfer & ~zt) | j.REVERT | t),
    e.comboMult > 0 && (e.bankTick = e.simTick + 8));
}
function Zr(e, t, n) {
  ((e.xfer &= ~zt),
    (e.yaw += t ? y : -y),
    L(e, wt, 0, 0, D[wt].base, n),
    e.comboMult > 0 && (e.bankTick = e.simTick + 10));
}
function Qr(e, t, n) {
  let r = e.xfer & (j.REV_L | j.REV_R);
  if (!r) {
    let n = t.pressed & (N.SPIN_L | N.SPIN_R);
    n && (e.xfer = (e.xfer & -8) | (n & N.SPIN_L ? j.REV_L : j.REV_R));
    return;
  }
  let i = (e.xfer & 7) + 1;
  if (t.held & (r === j.REV_L ? N.SPIN_L : N.SPIN_R)) {
    e.xfer = i > 7 ? e.xfer & ~(zt | 7) : (e.xfer & -8) | i;
    return;
  }
  ((e.xfer &= ~(zt | 7)),
    !((t.held | t.released) & N.OLLIE) &&
      ((e.yaw += r === j.REV_L ? y : -y), (n.flags |= P.TURN)));
}
function $r(e, t, n) {
  if (e.simTick - e.trickTick < 9) return;
  ((e.yaw += t.pressed & N.SPIN_L ? y : -y),
    e.mode === A.MANUAL && ((e.bal = -e.bal), (e.balVel = -e.balVel)),
    En(e, 30),
    (e.trickTick = e.simTick));
  let r = e.mode === A.MANUAL && !bt(e.trickId) ? Ot : Tt;
  L(e, r, 0, 0, D[r].base, n);
}
function ei(e) {
  let t = Math.abs(e.yaw - e.airYaw0);
  return Math.floor((t + se) / y);
}
function ti(e, t, n) {
  if (t <= 0) return;
  let r = vn(t);
  if (e.comboTricks !== e.airFirst) {
    let n = e.airFirst & 65535,
      i = yn(e, n),
      a = (e.comboTricks - 1 - n) & 65535;
    a < 8 ? Cn(e, a, bn(i), Math.min(t, 15), hn(i), r) : Sn(e, r);
  } else L(e, It, Math.min(t, 15), +!!gr(e), r, n);
}
function ni(e, t, n, r) {
  let i = t.layout.gaps;
  if (i && e.airPiece && n)
    for (let t = 0; t < i.length; t++) {
      let a = i[t];
      if (a.from.includes(e.airPiece) && a.to.includes(n)) {
        L(e, 200 + t, 0, 0, a.points, r);
        return;
      }
    }
}
function ri(e, t) {
  let n = e.ty,
    r = -n * e.tx,
    i = 1 - n * e.ty,
    a = -n * e.tz,
    o = Math.sqrt(r * r + i * i + a * a) || 1;
  return ((t.x = r / o), (t.y = i / o), (t.z = a / o), t);
}
