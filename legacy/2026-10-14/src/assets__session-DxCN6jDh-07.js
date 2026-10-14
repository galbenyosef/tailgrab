// assets__session-DxCN6jDh 07 — raildir
// Lines 1820-2160 of readable/assets__session-DxCN6jDh.pretty.js (statement-aligned).
function ii(e, t, n, r, i, a, o) {
  let s = ei(e),
    c = e.rail >= 0 && t.rails.segs[e.rail].chain === n.chain;
  M(e.yaw, e.ux, e.uy, e.uz, z);
  let l = Math.sqrt(z.x * z.x + z.z * z.z) || 1,
    u =
      (z.x * n.tx + z.z * n.tz) /
      l /
      (Math.sqrt(n.tx * n.tx + n.tz * n.tz) || 1),
    d = Math.abs(u) < 0.64,
    f = e.vx * n.tx + e.vy * n.ty + e.vz * n.tz;
  ((e.railDir = Math.abs(f) > 0.3 ? (f > 0 ? 1 : -1) : u >= 0 ? 1 : -1),
    Math.abs(f) <= 0.3 &&
      (e.railDir > 0 ? n.next < 0 && n.len - r < 0.3 : n.prev < 0 && r < 0.3) &&
      (e.railDir = -e.railDir));
  let p = Math.sqrt(e.vx * e.vx + e.vz * e.vz),
    m = Math.max(Math.abs(f), p * 0.55, ue),
    h = i.pressDir || i.dir,
    v = d ? xt[h] : Et[h],
    y = !1,
    b = vr(e, a, N.GRIND, [O.SPECIAL_GRIND]);
  (b && ((v = b), (y = !0)),
    ti(e, s, o),
    ni(e, t, n.piece, o),
    X(e, A.GRIND),
    (e.grindBuf = 0),
    (e.rail = n.id),
    (e.railT = _(r, 0, n.len)),
    (e.x = n.ax + n.tx * e.railT),
    (e.y = n.ay + n.ty * e.railT),
    (e.z = n.az + n.tz * e.railT),
    ri(n, B),
    (e.ux = B.x),
    (e.uy = B.y),
    (e.uz = B.z));
  let x, S, C;
  if (d) {
    let e = B.y * n.tz - B.z * n.ty,
      t = B.z * n.tx - B.x * n.tz,
      r = B.x * n.ty - B.y * n.tx;
    (e * z.x + t * z.y + r * z.z < 0 && ((e = -e), (t = -t), (r = -r)),
      (x = e),
      (S = t),
      (C = r));
  } else {
    let e = u >= 0 ? 1 : -1;
    ((x = n.tx * e), (S = n.ty * e), (C = n.tz * e));
  }
  ((e.yaw = I(x, S, C, e.ux, e.uy, e.uz, e.yaw)),
    (e.vx = n.tx * e.railDir * m),
    (e.vy = n.ty * e.railDir * m),
    (e.vz = n.tz * e.railDir * m),
    (e.spinVel = 0),
    (e.vert = !1),
    (e.bal = g(e.simTick, n.id + 1) * 0.15),
    (e.balVel = 0),
    mn(e, pn.GRIND, c),
    (e.trickId = v),
    (e.trickTick = e.simTick),
    (e.trickEnd = 0));
  let w = +(!d && e.railDir * (u >= 0 ? 1 : -1) < 0);
  (L(e, v, 0, w | (y ? 2 : 0), D[v].base, o),
    mr(e, n.piece, o),
    (o.flags |= P.GRIND_START),
    (o.rail = n.id),
    (e.airPiece = n.piece));
}
function ai(e, t, n, r, i) {
  let a = r.pressDir || r.dir,
    o = Dt[a];
  (X(e, A.LIP),
    (e.grindBuf = 0),
    (e.rail = t.id),
    (e.railT = _(n, 0, t.len)),
    T(t, e.railT, q),
    (e.railDir = t.flags & ie.SPINE && q.x * e.vnx + q.z * e.vnz < 0 ? -1 : 1),
    (e.x = t.ax + t.tx * e.railT),
    (e.y = t.ay + t.ty * e.railT),
    (e.z = t.az + t.tz * e.railT),
    (e.ux = 0),
    (e.uy = 1),
    (e.uz = 0),
    (e.yaw = I(-q.x * e.railDir, 0, -q.z * e.railDir, 0, 1, 0, e.yaw)),
    (e.vx = 0),
    (e.vy = 0),
    (e.vz = 0),
    (e.spinVel = 0),
    (e.bal = g(e.simTick, t.id + 99) * 0.15),
    (e.balVel = 0),
    mn(e, pn.LIP),
    (e.trickId = o),
    (e.trickTick = e.simTick),
    (e.trickEnd = 0),
    L(e, o, 0, 0, D[o].base, i),
    mr(e, t.piece, i),
    (i.flags |= P.LIP),
    (i.rail = t.id));
}
function oi(e, t, n, r, i) {
  (X(e, A.WALLRIDE), (e.vnx = t), (e.vnz = n), (e.vd = t * e.x + n * e.z));
  let a = e.vx * t + e.vz * n;
  ((e.vx -= a * t),
    (e.vz -= a * n),
    e.vy < 1.5 && (e.vy = 1.5),
    (e.ux = t),
    (e.uy = 0),
    (e.uz = n));
  let o = Math.sqrt(e.vx * e.vx + e.vz * e.vz) || 1;
  ((e.yaw = I(e.vx / o, 0, e.vz / o, e.ux, e.uy, e.uz, e.yaw)),
    (e.spinVel = 0),
    (e.trickId = Mt),
    (e.trickTick = e.simTick),
    (e.trickEnd = 0),
    L(e, Mt, 0, 0, D[Mt].base, i),
    r && mr(e, r, i),
    (i.flags |= P.WALLRIDE));
}
function si(e, t, n, r, i) {
  let a = e.simTick;
  if (
    (t.held & N.OLLIE && (e.crouch = Math.min(12, e.crouch + 1)),
    e.mode === A.WALLRIDE)
  ) {
    (Sn(e, D[Mt].perTick),
      Sr(e, t)
        ? ((e.vx += e.vnx * 4),
          (e.vz += e.vnz * 4),
          (e.vy = Math.max(e.vy, 0) + v(de, Ae, Cr(e)) * r.air),
          (e.ux = 0),
          (e.uy = 1),
          (e.uz = 0),
          (e.crouch = 0),
          (i.flags |= P.OLLIE),
          mi(e, i))
        : a - e.modeTick > 36 &&
          ((e.vx += e.vnx * 1.5), (e.vz += e.vnz * 1.5), mi(e, i)));
    return;
  }
  if (
    (li(e, F[t.dir], r, e.mode === A.LIP ? 1.3 : 1, n, i),
    e.mode === A.GRIND || e.mode === A.LIP)
  ) {
    if (
      (Sn(e, D[e.trickId]?.perTick ?? 0),
      t.pressed & (N.FLIP | N.GRAB) &&
        (e.queued = (t.pressed & N.FLIP ? N.FLIP : N.GRAB) | (hr(t) << 8)),
      e.mode === A.LIP)
    ) {
      let r = Sr(e, t);
      (r && (e.crouch = 0), (r || a - e.modeTick > 150) && gi(e, n, i));
      return;
    }
    if (
      (t.pressed & (N.SPIN_L | N.SPIN_R) && $r(e, t, i),
      t.pressed & N.GRIND && t.dir)
    ) {
      let n = D[e.trickId].kind,
        r = n === O.SLIDE ? xt[t.dir] : n === O.GRIND ? Et[t.dir] : 0;
      r &&
        r !== e.trickId &&
        ((e.trickId = r),
        (e.trickTick = a),
        L(e, r, 0, +!!gr(e), D[r].base, i));
    }
    Sr(e, t) && ci(e, n, r, t, i);
  }
}
function ci(e, t, n, r, i) {
  let a = (r.stickX ? r.stickX / 127 : F[r.dir]) * 3,
    o = Math.sqrt(e.vx * e.vx + e.vz * e.vz);
  if (a && o > 0.5) {
    let t = e.vx / o,
      n = e.vz / o;
    ((e.vx -= n * a), (e.vz += t * a));
    let r = Math.sqrt(e.vx * e.vx + e.vz * e.vz),
      i = e.vx / r,
      s = e.vz / r;
    e.yaw += h(i * n - s * t, i * t + s * n);
  }
  ri(t.rails.segs[e.rail], B);
  let s = v(de, Ae, Cr(e)) * n.air;
  ((e.vx += B.x * s),
    (e.vy += B.y * s),
    (e.vz += B.z * s),
    (e.x += B.x * Qe),
    (e.y += B.y * Qe),
    (e.z += B.z * Qe),
    (e.crouch = 0),
    (i.flags |= P.OLLIE),
    mi(e, i));
}
function li(e, t, n, r, i, a) {
  r *= On(e);
  let o = (4 * r) / n.balance,
    s = g(e.simTick >> 3, e.rail + 3 + e.mode) * nt * r,
    c = Se;
  ((e.balVel += (e.bal * o + s + t * 7) * c),
    (e.balVel *= Re),
    (e.bal += e.balVel * c),
    (e.bal > 1 || e.bal < -1) && ui(e, i, a));
}
function ui(e, t, n) {
  let r = e.bal > 0 ? 1 : -1;
  if (e.mode === A.MANUAL) {
    if (r === (bt(e.trickId) === _r(e) ? 1 : -1)) {
      fi(e, n);
      return;
    }
  } else if (e.mode === A.GRIND) {
    if (pi(e, t, r, n)) return;
  } else if (e.mode === A.LIP) {
    if (r > 0) {
      (di(e), gi(e, t, n));
      return;
    }
    let i = t.rails.segs[e.rail];
    if (i.flags & ie.SPINE) {
      (di(e), (e.railDir = -e.railDir), gi(e, t, n, !0));
      return;
    }
    (T(i, e.railT, q),
      (e.vx = -q.x * e.railDir * 1),
      (e.vz = -q.z * e.railDir * 1));
  }
  ((n.bailWhy = Gt.BALANCE), xi(e, n));
}
function di(e) {
  ((e.bal = e.bal > 0 ? 0.9 : -0.9), (e.balVel = 0));
}
function fi(e, t) {
  (X(e, A.GROUND),
    (e.trickId = 0),
    wn(e, t),
    (t.flags |= P.LAND),
    (t.impact = Math.max(t.impact, 2)));
}
function pi(e, t, n, r) {
  let i = t.rails.segs[e.rail];
  if (i.kind !== ht.COPING) return !1;
  T(i, e.railT, q);
  let a = q.x,
    o = q.z;
  if ((-i.tz * a + i.tx * o) * e.railDir * n < 0) {
    if (!(i.flags & ie.SPINE)) return !1;
    ((a = -a), (o = -o));
  }
  let s = i.ax + i.tx * e.railT,
    c = i.ay + i.ty * e.railT,
    l = i.az + i.tz * e.railT;
  if (
    !t.col.raySurface(s + a * 0.5, c - 0.35, l + o * 0.5, -a, 0, -o, 1, H) ||
    H.ny > 0.9
  )
    return !1;
  M(e.yaw, e.ux, e.uy, e.uz, z);
  let u = Y(e),
    d = e.vx * z.x + e.vy * z.y + e.vz * z.z,
    f = (Math.abs(d) > u * 0.5 ? d : z.x * a + z.z * o) >= 0 ? 1 : -1,
    p = H.ny,
    m = H.nx * p,
    h = p * p - 1,
    g = H.nz * p,
    _ = Math.sqrt(m * m + h * h + g * g);
  ((m /= _), (h /= _), (g /= _));
  let v = u * Ue,
    y = Math.max(u * Le, 2.5),
    b = e.railDir;
  return (
    di(e),
    Mr(e, i.tx * b * v + m * y, i.ty * b * v + h * y, i.tz * b * v + g * y, f),
    (e.rail = -1),
    (e.trickId = 0),
    (e.spinVel = 0),
    X(e, A.GROUND),
    mr(e, H.piece, r),
    (r.flags |= P.GRIND_END | P.LAND),
    (r.impact = Math.max(r.impact, 2)),
    Xr(e, 0),
    !0
  );
}
function mi(e, t) {
  (e.mode === A.WALLRIDE && ((e.ux = 0), (e.uy = 1), (e.uz = 0)),
    e.mode === A.GRIND && hi(e));
  let n = e.lastPiece;
  ((e.airFakie = _r(e)),
    X(e, A.AIR),
    (e.vert = !1),
    (e.xfer = 0),
    (e.vturn = 0),
    (e.airYaw0 = e.yaw),
    (e.airFirst = e.comboTricks),
    (e.airPiece = n),
    (e.trickId = 0),
    (e.trickEnd = 0),
    (e.spinVel = 0),
    (e.coyote = 5),
    (t.flags |= P.GRIND_END));
}
function hi(e) {
  if (e.vx * e.vx + e.vz * e.vz < 0.25) return;
  M(e.yaw, e.ux, e.uy, e.uz, z);
  let t = h(e.vx * z.z - e.vz * z.x, e.vx * z.x + e.vz * z.z);
  (t > 3.141592653589793 / 2
    ? (t -= y)
    : t < -3.141592653589793 / 2 && (t += y),
    (e.yaw += t));
}
function gi(e, t, n, r = !1) {
  let i = t.rails.segs[e.rail];
  T(i, e.railT, q);
  let a = q.x * e.railDir,
    o = q.z * e.railDir,
    s = i.ax + i.tx * e.railT,
    c = i.ay + i.ty * e.railT,
    l = i.az + i.tz * e.railT;
  t.col.raySurface(s + a * 0.5, c - 0.35, l + o * 0.5, -a, 0, -o, 1, H) &&
  H.ny < 0.9
    ? ((e.x = H.px),
      (e.y = H.py),
      (e.z = H.pz),
      (e.ux = H.nx),
      (e.uy = H.ny),
      (e.uz = H.nz))
    : ((e.x = s + a * 0.06),
      (e.y = c - 0.35),
      (e.z = l + o * 0.06),
      (e.ux = a),
      (e.uy = 0),
      (e.uz = o));
  let u = !r && e.trickId && D[e.trickId].fakieOut;
  ((e.yaw = I(0, u ? 1 : -1, 0, e.ux, e.uy, e.uz, e.yaw)),
    (e.vx = 0),
    (e.vy = -2.5),
    (e.vz = 0),
    (e.rail = -1),
    (e.trickId = 0),
    X(e, A.GROUND),
    (n.flags |= P.GRIND_END | P.LAND),
    Xr(e, 0));
}
