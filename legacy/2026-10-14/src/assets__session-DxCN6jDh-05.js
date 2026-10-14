// assets__session-DxCN6jDh 05 — vert
// Lines 1180-1493 of readable/assets__session-DxCN6jDh.pretty.js (statement-aligned).
function Fr(e, t, n, r, i, a) {
  let o = -(e.vx * t + e.vy * n + e.vz * r);
  if (o <= 0) return;
  ((a.flags |= P.WALL), (a.impact = Math.max(a.impact, o)));
  let s = o > i * 0.8;
  e.mode !== A.BAIL && o > 10 && s && Ir(e, a);
  let c = s && e.mode !== A.BAIL,
    l = c ? 1 + et : 1;
  if (
    ((e.vx += t * o * l),
    (e.vy += n * o * l),
    (e.vz += r * o * l),
    (e.vx *= 0.85),
    (e.vy *= 0.85),
    (e.vz *= 0.85),
    e.mode === A.GROUND || e.mode === A.MANUAL)
  ) {
    let i = Y(e);
    if (i > 0.3)
      e.yaw = I(e.vx / i, e.vy / i, e.vz / i, e.ux, e.uy, e.uz, e.yaw);
    else if (c) e.yaw = I(t, n, r, e.ux, e.uy, e.uz, e.yaw);
    else {
      M(e.yaw, e.ux, e.uy, e.uz, z);
      let i = z.x * t + z.y * n + z.z * r,
        a = z.x - i * t,
        o = z.y - i * n,
        s = z.z - i * r,
        c = Math.sqrt(a * a + o * o + s * s);
      c > 0.001 && (e.yaw = I(a / c, o / c, s / c, e.ux, e.uy, e.uz, e.yaw));
    }
  }
}
function Ir(e, t) {
  (e.mode === A.MANUAL && (X(e, A.GROUND), (e.trickId = 0)),
    wn(e, t),
    (t.flags |= P.FLAIL));
}
function Lr(e, t, n, r, i) {
  let a = e.simTick,
    o = e.trickId ? D[e.trickId] : null;
  if (
    t.released & N.OLLIE &&
    e.coyote > 0 &&
    e.comboTricks === e.airFirst &&
    e.crouch > 0
  ) {
    e.coyote = 0;
    let t = v(de, Ae, Cr(e)) * r.air;
    (e.vy < 0 && (e.vy = 0),
      e.vert
        ? (e.vy = Math.max(e.vy, Math.min(ye * r.air, e.vy + t * 0.35 + oe)))
        : (e.vy += t),
      (e.crouch = 0),
      (i.flags |= P.OLLIE));
  } else
    ((t.pressed & N.OLLIE && e.vert && e.vy > 0 && e.crouch === 0 && !e.xfer) ||
      (e.vert &&
        e.vy > 0 &&
        !e.xfer &&
        e.simTick - e.modeTick < 6 &&
        fr(e, t))) &&
      (e.xfer = j.ARMED);
  (e.xfer === j.ARMED && (!e.vert || e.vy <= 0 ? (e.xfer = 0) : Vr(e, n, i)),
    t.held & N.OLLIE || (e.crouch = 0));
  let s = t.pressed & (N.SPIN_L | N.SPIN_R);
  if (s && e.vert && e.vy <= 0) {
    let t = 4 * Se;
    e.y - e.lipY <= -e.vy * t + 8.5 * t * t &&
      (e.xfer =
        (e.xfer & ~(j.REV_L | j.REV_R)) | (s & N.SPIN_L ? j.REV_L : j.REV_R));
  }
  o &&
    o.kind === O.GRAB &&
    e.trickEnd === 0 &&
    (t.held & N.GRAB
      ? a - e.trickTick > o.ticks && Sn(e, o.perTick)
      : (e.trickEnd = a));
  let c =
      o !== null &&
      (o.kind === O.FLIP || o.kind === O.SPECIAL_AIR) &&
      a < e.trickTick + o.ticks,
    l =
      o !== null &&
      o.kind === O.GRAB &&
      (e.trickEnd === 0 || a < e.trickEnd + 3),
    u = c || l,
    d = t.pressed & (N.FLIP | N.GRAB);
  if (d) {
    let n = d & N.FLIP ? N.FLIP : N.GRAB,
      s = vr(e, r, n, [O.SPECIAL_AIR]);
    if (n === N.FLIP && o && c && Pt[e.trickId] && a - e.trickTick <= 8) {
      let t = Pt[e.trickId],
        n = yn(e, (e.comboTricks - 1) & 65535);
      (Cn(e, 0, t, 0, hn(n), D[t].base - D[bn(n)].base),
        (e.trickId = t),
        (i.flags |= P.TRICK),
        i.tricks.length < 8 && i.tricks.push(_n(t, 0, hn(n))));
    } else
      s && !u
        ? yr(e, s, i, !0)
        : u
          ? (e.queued = (e.queued & lr) | n | (hr(t) << 8))
          : Rr(e, n, hr(t), i);
  } else if (e.queued & 255 && !u) {
    let t = e.queued & 255,
      n = (e.queued >> 8) & 255;
    ((e.queued = 0), Rr(e, t, n, i));
  }
}
function Rr(e, t, n, r) {
  let i = t === N.FLIP ? kt[n] : Nt[n];
  if (t === N.GRAB && e.trickId && D[e.trickId].kind === O.GRAB) {
    ((e.trickId = i),
      (e.trickTick = e.simTick),
      (e.trickEnd = 0),
      (e.queued &= -2130706433));
    return;
  }
  yr(e, i, r);
}
function zr(e, t, n, r, i, a) {
  if (((e.vy -= 17 * i), e.vert)) {
    e.y > e.lipY - 1.5 && Br(e, n);
    let t = e.vx * e.vnx + e.vz * e.vnz;
    ((e.vx -= t * e.vnx), (e.vz -= t * e.vnz));
    let r = e.vnx * e.x + e.vnz * e.z - (e.vd + be);
    ((e.x -= e.vnx * r * 0.5),
      (e.z -= e.vnz * r * 0.5),
      e.vy < 0 &&
        e.y < e.lipY - 0.4 &&
        !n.col.raySurface(
          e.x + e.vnx * 0.3,
          e.y,
          e.z + e.vnz * 0.3,
          -e.vnx,
          0,
          -e.vnz,
          1.2,
          H,
        ) &&
        ((e.vert = !1), (e.xfer = j.LOST)));
  }
  let o =
    e.xfer & (j.REV_L | j.REV_R)
      ? 0
      : (t.held & N.SPIN_L ? 1 : 0) - (t.held & N.SPIN_R ? 1 : 0);
  if ((!o && dr(e, t) >= 3 && (o = -F[t.dir]), o)) {
    let t = o * lt * r.spin - e.spinVel,
      n = 70 * i;
    e.spinVel += t > n ? n : t < -n ? -n : t;
  } else e.spinVel = 0;
  e.yaw += e.spinVel * i;
  let s = D[e.trickId];
  if (s?.spinHalves && e.simTick - e.trickTick < s.ticks) {
    let t = ((s.spinHalves * y) / s.ticks) * (i / Se);
    ((e.yaw += t), (e.airYaw0 += t));
  }
  if (e.vert) Bt(e, e.vnx, 0, e.vnz, Ke);
  else if (!(e.xfer & j.LOST)) {
    let t = Y(e),
      r = 0,
      i = 1,
      a = 0;
    (((t > 1 &&
      n.col.raySurface(
        e.x,
        e.y + 0.3,
        e.z,
        e.vx / t,
        e.vy / t,
        e.vz / t,
        6,
        H,
      ) &&
      H.ny > 0.2) ||
      (n.col.raySurface(e.x, e.y + 0.3, e.z, 0, -1, 0, 25, H) && H.ny > 0.2)) &&
      ((r = H.nx), (i = H.ny), (a = H.nz)),
      Bt(e, r, i, a, rt));
  }
  let c = e.x,
    l = e.y,
    u = e.z;
  if (
    ((e.x += e.vx * i),
    (e.y += e.vy * i),
    (e.z += e.vz * i),
    Kr(e),
    e.rail >= 0 && e.simTick - e.modeTick < 10)
  ) {
    let t = n.rails.segs[e.rail],
      r = _(e.railT, 0, t.len);
    ((G.chain = t.chain),
      (G.x = t.ax + t.tx * r),
      (G.y = t.ay + t.ty * r),
      (G.z = t.az + t.tz * r),
      (G.r = it));
  }
  if (
    (e.grindBuf > 0 || t.held & N.GRIND) &&
    e.simTick - e.modeTick > 1 &&
    qr(e, n, c, l, u)
  ) {
    let i = n.rails.segs[zn.seg];
    if (
      i.kind === ht.COPING &&
      e.vert &&
      e.grindBuf > 0 &&
      e.vy > -6 &&
      Math.abs(e.vx * i.tx + e.vz * i.tz) < 2.5
    ) {
      ai(e, i, zn.t, t, a);
      return;
    }
    if (i.kind !== ht.COPING || !e.vert || e.vy <= 0 || e.grindBuf > 0) {
      ii(e, n, i, zn.t, t, r, a);
      return;
    }
  }
  let d = e.x - c,
    f = e.y - l,
    p = e.z - u,
    m = Math.sqrt(d * d + f * f + p * p),
    h = Y(e),
    g = !1;
  if (
    m > 1e-6 &&
    n.col.raySurface(c, l, u, d / m, f / m, p / m, m + 0.02, V) &&
    V.ny > -0.05 &&
    V.nx * e.vx + V.ny * e.vy + V.nz * e.vz < 0.1 * h
  ) {
    if (V.ny >= 0.3 || e.vert || Wr(n)) g = !0;
    else {
      Gr(e, a);
      return;
    }
  } else
    e.simTick - e.modeTick > 1 &&
      n.col.raySurface(
        e.x + e.ux * 0.35,
        e.y + e.uy * 0.35,
        e.z + e.uz * 0.35,
        -e.ux,
        -e.uy,
        -e.uz,
        0.4,
        V,
      ) &&
      V.ny > -0.05 &&
      V.nx * e.vx + V.ny * e.vy + V.nz * e.vz < 0.1 * h &&
      V.nx * e.ux + V.ny * e.uy + V.nz * e.uz > 0.3 &&
      (V.ny >= 0.3 || e.vert) &&
      (g = !0);
  if (g) {
    Yr(e, n, a);
    return;
  }
  for (let r = 0; r < 2; r++) {
    let i = r ? at : Ve,
      o = r ? Be : $e;
    if (
      ((K.x = e.x + e.ux * i),
      (K.y = e.y + e.uy * i),
      (K.z = e.z + e.uz * i),
      !n.col.sphereWalls(K, o, 0, 1, 0, U))
    )
      continue;
    let s = Math.sqrt(U.nx * U.nx + U.nz * U.nz),
      c = Math.sqrt(e.vx * e.vx + e.vz * e.vz),
      l = c > 0 ? Math.abs(e.vx * U.nx + e.vz * U.nz) / (c * (s || 1)) : 1;
    if (
      (e.grindBuf > 0 || t.held & N.GRIND) &&
      s > 0.9 &&
      c > 3.5 &&
      l < 0.75 &&
      !e.vert &&
      !(U.surf & Ne.RAIL)
    ) {
      let t = U.nx / s,
        r = U.nz / s,
        i = Jr(n, o, t, r);
      if (
        !(i && i === e.airPiece && t * e.vnx + r * e.vnz > 0.9) &&
        bi(n, i ? H.px : e.x + U.dx, e.y, i ? H.pz : e.z + U.dz, t, r)
      ) {
        ((e.x += U.dx), (e.z += U.dz), oi(e, t, r, i, a));
        return;
      }
    }
    ((e.x += U.dx), (e.y += U.dy), (e.z += U.dz));
    let u = -(e.vx * U.nx + e.vy * U.ny + e.vz * U.nz);
    if (u > 0) {
      let t = e.vx,
        n = e.vz;
      ((e.vx += U.nx * u),
        (e.vy += U.ny * u),
        (e.vz += U.nz * u),
        Ur(e, t, n),
        (a.flags |= P.WALL),
        (a.impact = Math.max(a.impact, u)));
    }
  }
}
function Br(e, t) {
  if (
    !t.rails.nearestCoping(e.x, e.y, e.z, 1.2, 1.5, 6, e.vnx, e.vnz, 0.866, J)
  )
    return;
  let n = e.vnx,
    r = e.vnz;
  Hr(e, J.nx, J.nz) &&
    ((e.vd = J.nx * J.px + J.nz * J.pz),
    (e.vnx - n) * e.vx + (e.vnz - r) * e.vz > 0 &&
      (e.vturn += Math.abs(h(n * e.vnz - r * e.vnx, n * e.vnx + r * e.vnz))));
}
