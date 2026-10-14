// assets/session-DxCN6jDh 08 — math
// Lines 2161-2507 of readable/assets/session-DxCN6jDh.pretty.js (statement-aligned).
function _i(e, t, n, r) {
  let i = t.rails.segs[e.rail],
    a = Math.sqrt(e.vx * e.vx + e.vy * e.vy + e.vz * e.vz),
    o = D[e.trickId]?.kind === O.SLIDE;
  if (
    ((a += -17 * i.ty * e.railDir * n),
    a > 4.5 && (a = Math.max(ue, a - (o ? st : Te) * n)),
    a > 17 && (a = 17),
    a < 1.6)
  ) {
    ((e.vy += 1), mi(e, r));
    return;
  }
  e.railT += e.railDir * a * n;
  for (let n = 0; n < 4 && (e.railT > i.len || e.railT < 0); n++) {
    let n = e.railT > i.len ? e.railT - i.len : -e.railT,
      o = e.railT > i.len,
      s = o ? i.next : i.prev,
      c = o ? i.bx : i.ax,
      l = o ? i.by : i.ay,
      u = o ? i.bz : i.az,
      d = i.tx * e.railDir,
      f = i.ty * e.railDir,
      p = i.tz * e.railDir;
    if (s < 0) {
      ((e.x = c),
        (e.y = l),
        (e.z = u),
        (e.vx = d * a),
        (e.vy = f * a + ut),
        (e.vz = p * a),
        mi(e, r));
      return;
    }
    let m = t.rails.segs[s],
      g =
        (m.ax - c) * (m.ax - c) +
          (m.ay - l) * (m.ay - l) +
          (m.az - u) * (m.az - u) <
        (m.bx - c) * (m.bx - c) +
          (m.by - l) * (m.by - l) +
          (m.bz - u) * (m.bz - u),
      _ = g ? 1 : -1;
    if (d * m.tx * _ + f * m.ty * _ + p * m.tz * _ < 0.7) {
      ((e.x = c),
        (e.y = l),
        (e.z = u),
        (e.vx = d * a),
        (e.vy = f * a + ut),
        (e.vz = p * a),
        mi(e, r));
      return;
    }
    let v = m.tx * _,
      y = m.tz * _,
      b = v * p - y * d,
      x = v * d + y * p;
    ((b > 1e-7 || b < -1e-7) && (e.yaw += h(b, x)),
      (e.rail = m.id),
      (e.railDir = _),
      (e.railT = g ? n : m.len - n),
      m.piece !== i.piece && mr(e, m.piece, r),
      (i = m));
  }
  ((e.x = i.ax + i.tx * e.railT),
    (e.y = i.ay + i.ty * e.railT),
    (e.z = i.az + i.tz * e.railT),
    (e.vx = i.tx * e.railDir * a),
    (e.vy = i.ty * e.railDir * a),
    (e.vz = i.tz * e.railDir * a),
    ri(i, B),
    (e.ux = B.x),
    (e.uy = B.y),
    (e.uz = B.z));
}
function vi(e, t, n, r, i, a) {
  if (
    ((e.vy -= 17 * fe * i),
    (e.x += e.vx * i),
    (e.y += e.vy * i),
    (e.z += e.vz * i),
    !n.col.raySurface(
      e.x + e.vnx * 0.4,
      e.y + 0.5,
      e.z + e.vnz * 0.4,
      -e.vnx,
      0,
      -e.vnz,
      0.8,
      H,
    ) || H.surf & Ne.RAIL)
  ) {
    if (
      (e.grindBuf > 0 || t.held & N.GRIND) &&
      n.rails.sweep(e.x, e.y, e.z, e.x, e.y + 0.6, e.z, 0.55, 0.35, 0.9, zn)
    ) {
      ii(e, n, n.rails.segs[zn.seg], zn.t, t, r, a);
      return;
    }
    mi(e, a);
    return;
  }
  let o = Math.sqrt(H.nx * H.nx + H.nz * H.nz);
  if (
    (o > 0.9 && Hr(e, H.nx / o, H.nz / o),
    (e.x = H.px + e.vnx * 0.02),
    (e.z = H.pz + e.vnz * 0.02),
    n.col.raySurface(
      e.x + e.vnx * 0.3,
      e.y + 0.2,
      e.z + e.vnz * 0.3,
      0,
      -1,
      0,
      0.3,
      H,
    ) &&
      (e.vy < 0 || H.ny < 0.99))
  ) {
    ((e.ux = 0),
      (e.uy = 1),
      (e.uz = 0),
      (e.x += e.vnx * 0.3),
      (e.z += e.vnz * 0.3),
      e.y < H.py + 0.02 && (e.y = H.py + 0.02),
      mi(e, a));
    return;
  }
  for (let t = 0; t < 2; t++) {
    if (!yi(n, e.x, e.y, e.z, e.vnx, e.vnz, t)) continue;
    e.mode === A.WALLRIDE && mi(e, a);
    let r = Math.min(0, W.dx * e.vnx + W.dz * e.vnz);
    ((e.x += W.dx - r * e.vnx), (e.y += W.dy), (e.z += W.dz - r * e.vnz));
    let i = -(e.vx * W.nx + e.vy * W.ny + e.vz * W.nz);
    if (i > 0) {
      let t = e.vx,
        n = e.vz;
      ((e.vx += W.nx * i),
        (e.vy += W.ny * i),
        (e.vz += W.nz * i),
        Ur(e, t, n),
        (a.flags |= P.WALL),
        (a.impact = Math.max(a.impact, i)));
    }
  }
}
function yi(e, t, n, r, i, a, o) {
  let s = o ? at : Ve;
  return (
    (Vn.x = t + i * s),
    (Vn.y = n),
    (Vn.z = r + a * s),
    e.col.sphereWalls(Vn, o ? Be : $e, 0, 1, 0, W)
  );
}
function bi(e, t, n, r, i, a) {
  return (
    (t += i * 0.02),
    (r += a * 0.02),
    !yi(e, t, n, r, i, a, 0) && !yi(e, t, n, r, i, a, 1)
  );
}
function xi(e, t) {
  (gn(e, t),
    X(e, A.BAIL),
    (e.trickId = 0),
    (e.rail = -1),
    (e.vert = !1),
    (e.xfer = 0),
    (e.vturn = 0),
    (e.queued = 0),
    (e.crouch = 0),
    (e.spinVel = 0),
    (t.flags |= P.BAIL));
}
function Si(e, t) {
  if (
    !t.col.raySurface(
      e.x + e.ux * 0.1,
      e.y + e.uy * 0.1,
      e.z + e.uz * 0.1,
      -e.ux,
      -e.uy,
      -e.uz,
      0.25,
      H,
    )
  )
    return (Bt(e, 0, 1, 0, 0.3), !0);
  if (
    e.simTick - e.modeTick >= 42 &&
    e.uy > 0.7 &&
    (X(e, A.GROUND), (e.vx *= 0.2), (e.vy *= 0.2), (e.vz *= 0.2), e.uy < 0.97)
  ) {
    let t = e.ux * e.uy,
      n = e.uy * e.uy - 1,
      r = e.uz * e.uy,
      i = Math.sqrt(t * t + n * n + r * r);
    ((t /= i), (n /= i), (r /= i));
    let a = Y(e);
    ((e.vx = t * a),
      (e.vy = n * a),
      (e.vz = r * a),
      (e.yaw = I(t, n, r, e.ux, e.uy, e.uz, e.yaw)));
  }
  return !1;
}
function Ci(e, t, n, r) {
  e.vy -= 17 * n;
  let i = e.x,
    a = e.y,
    o = e.z;
  ((e.x += e.vx * n), (e.y += e.vy * n), (e.z += e.vz * n));
  let s = e.x - i,
    c = e.y - a,
    l = e.z - o,
    u = Math.sqrt(s * s + c * c + l * l);
  if (
    u > 1e-6 &&
    t.col.raySurface(i, a, o, s / u, c / u, l / u, u + 0.02, V) &&
    V.ny > -0.2
  ) {
    if (V.ny < 0.3) return (Gr(e, r), !0);
    ((e.x = V.px),
      (e.y = V.py),
      (e.z = V.pz),
      (e.ux = V.nx),
      (e.uy = V.ny),
      (e.uz = V.nz));
    let t = e.vx * e.ux + e.vy * e.uy + e.vz * e.uz;
    return (
      t < 0 &&
        ((e.vx -= t * e.ux),
        (e.vy -= t * e.uy),
        (e.vz -= t * e.uz),
        (r.impact = Math.max(r.impact, -t))),
      (e.modeTick = Math.max(e.modeTick, e.simTick - 18)),
      !1
    );
  }
  return (Pr(e, t, Y(e), r), !0);
}
function wi(e, t) {
  if (e.uy < 0.8) return;
  let n = _r(e) ? -1 : 1;
  M(e.yaw, e.ux, e.uy, e.uz, z);
  let r = n / Math.sqrt(z.x * z.x + z.z * z.z);
  ((e.yaw = I(z.x * r, 0, z.z * r, 0, 1, 0, e.yaw)),
    (e.ux = 0),
    (e.uy = 1),
    (e.uz = 0),
    (e.vy = 0),
    Ei(e, 4),
    (e.trickId = 0),
    (e.trickEnd = 0),
    (e.queued = 0),
    (e.crouch = 0),
    (e.coyote = 0),
    (e.grindBuf = 0),
    X(e, A.WALK),
    wn(e, t),
    (e.bal = 0),
    (e.balVel = 0),
    (t.flags |= P.BOARD));
}
function Ti(e, t, n) {
  if (e.simTick - e.modeTick < 6 || e.vy < 0 || !Di(e, t)) return;
  let r = H.nx,
    i = H.ny,
    a = H.nz;
  M(e.yaw, 0, 1, 0, z);
  let o = z.x * r + z.z * a,
    s = z.x - o * r,
    c = -o * i,
    l = z.z - o * a,
    u = Math.sqrt(s * s + c * c + l * l);
  ((s /= u),
    (c /= u),
    (l /= u),
    (e.x = H.px),
    (e.y = H.py),
    (e.z = H.pz),
    (e.ux = r),
    (e.uy = i),
    (e.uz = a),
    (e.yaw = I(s, c, l, r, i, a, e.yaw)));
  let d = Math.max(me, e.vx * s + e.vz * l);
  ((e.vx = s * d),
    (e.vy = c * d),
    (e.vz = l * d),
    (e.rolling = !0),
    (e.crouch = 0),
    X(e, A.GROUND),
    (n.flags |= P.BOARD));
}
function Ei(e, t) {
  let n = Math.sqrt(e.vx * e.vx + e.vz * e.vz);
  if (n > t) {
    let r = t / n;
    ((e.vx *= r), (e.vz *= r));
  }
}
function Di(e, t) {
  return (
    t.col.raySurface(e.x, e.y + 0.5, e.z, 0, -1, 0, 0.75, H) &&
    H.ny >= 0.8 &&
    H.py - e.y <= 0.3
  );
}
function Oi(e, t) {
  return e.vy < -0.5 || !Di(e, t);
}
function ki(e, t, n, r, i) {
  if (((e.yaw -= F[t.dir] * je * i), r)) return Ai(e, n, i);
  M(e.yaw, 0, 1, 0, z);
  let a = Vt[t.dir],
    o = a > 0 ? 3 : a < 0 ? -we : 0,
    s = z.x * o - e.vx,
    c = z.z * o - e.vz,
    l = Math.sqrt(s * s + c * c),
    u = 14 * i;
  (l > u && ((s *= u / l), (c *= u / l)), (e.vx += s), (e.vz += c), (e.vy = 0));
  let d = e.x,
    f = e.z;
  if (
    ((e.x += e.vx * i),
    (e.z += e.vz * i),
    !n.col.raySurface(e.x, e.y + 0.5, e.z, 0, -1, 0, 0.75, V))
  )
    return !0;
  let p = V.py - e.y;
  if (V.ny < 0.8) {
    if (p <= 0) return !0;
    ((e.x = d), (e.z = f));
    let t = Math.sqrt(V.nx * V.nx + V.nz * V.nz);
    if (t > 1e-6) {
      let n = V.nx / t,
        r = V.nz / t,
        i = -(e.vx * n + e.vz * r);
      i > 0 && ((e.vx += n * i), (e.vz += r * i));
    }
  } else
    p > 0.3
      ? ((e.x = d), (e.z = f), (e.vx = 0), (e.vz = 0))
      : ((e.y = V.py), (e.lastPiece = V.piece));
  return (ji(e, n, !1), !1);
}
