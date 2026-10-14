// assets__session-DxCN6jDh 03 — air
// Lines 567-840 of readable/assets__session-DxCN6jDh.pretty.js (statement-aligned).
function Qn(e) {
  let t = Zn.get(e);
  if (!t) {
    let n = Ee;
    ((t = {
      air: Math.fround(e.air * n.air),
      speed: Math.fround(e.speed * n.speed),
      spin: Math.fround(e.spin * n.spin),
      balance: Math.fround(e.balance * n.balance),
      specials: e.specials,
    }),
      Zn.set(e, t));
  }
  return t;
}
var $n = 3221225472;
function er(e) {
  let t = 0;
  for (let n = 0; n < 3; n++) {
    let r = (e >>> (n * 10)) & 1023;
    if (!r) continue;
    let i = Math.min(63, (r >>> 4) + 1);
    t |= ((r & 15) | (i << 4)) << (n * 10);
  }
  return (t | (e & $n)) >>> 0;
}
function tr(e, t) {
  return ((((e << 10) | (t & 15)) & 1073741823) | (e & $n)) >>> 0;
}
function nr(e, t) {
  return (e >>> (t * 10)) & 15;
}
function rr(e, t) {
  return ((e >>> (t * 10)) >>> 4) & 63;
}
function ir(e) {
  let t = F[e],
    n = Vt[e];
  return n > 0 && t === 0
    ? k.U
    : n < 0 && t === 0
      ? k.D
      : t > 0 && n === 0
        ? k.R
        : t < 0 && n === 0
          ? k.L
          : e;
}
function ar(e, t, n, r, i) {
  return ir(nr(e, 0)) !== n || ir(nr(e, 1)) !== t
    ? !1
    : rr(e, 0) <= i && rr(e, 1) - rr(e, 0) <= r;
}
var or = 1 << 24,
  sr = 1056964608,
  cr = 1073741824,
  lr = 2130706432;
function ur(e) {
  let t = ar(e.taps, k.D, k.U, 12, 0);
  (t || ar(e.taps, k.U, k.D, 12, 0)) &&
    (e.queued = (e.queued & 16777215) | (21 * or) | (t ? cr : 0));
}
function dr(e, t) {
  let n = F[t.dir],
    r = e.taps >>> 30;
  if (!n || !r || !t.tapDir || F[t.tapDir] !== n) return n ? r : 0;
  for (let t = 1; t < 3; t++) {
    let i = F[nr(e.taps, t)];
    if (i) return i === n ? r : 0;
  }
  return r;
}
function fr(e, t) {
  return (
    t.dir === k.U &&
    !(t.held & (N.FLIP | N.GRAB)) &&
    nr(e.taps, 0) === k.U &&
    rr(e.taps, 0) >= 4
  );
}
function pr(e, t) {
  let n = F[t.dir] ? Math.min(3, dr(e, t) + 1) : 0;
  e.taps = ((e.taps & 1073741823) | (n << 30)) >>> 0;
}
function Y(e) {
  return Math.sqrt(e.vx * e.vx + e.vy * e.vy + e.vz * e.vz);
}
function X(e, t) {
  (t !== e.mode && Dn(e),
    t !== A.GROUND && (e.xfer &= ~(j.SLIDE | zt)),
    (t === A.GRIND || t === A.LIP || t === A.WALLRIDE) &&
      (e.queued &= -2130706433),
    (e.mode = t),
    (e.modeTick = e.simTick));
}
function mr(e, t, n) {
  ((e.lastPiece = t),
    t && n.pieces.length < 8 && (n.pieces.push(t), (n.flags |= P.PIECE)));
}
function hr(e) {
  return e.pressDir || e.dir;
}
function gr(e) {
  return e.mode === A.AIR ? e.airFakie : _r(e);
}
function _r(e) {
  return (
    M(e.yaw, e.ux, e.uy, e.uz, z),
    e.vx * z.x + e.vy * z.y + e.vz * z.z < -0.5
  );
}
function vr(e, t, n, r) {
  if (e.special < 200) return 0;
  for (let i of t.specials)
    if (
      i.btn === n &&
      r.includes(D[i.trick].kind) &&
      ar(e.taps, i.d1, i.d2, 14, 14)
    )
      return i.trick;
  return 0;
}
function yr(e, t, n, r = !1) {
  ((e.queued &= -2130706433),
    (e.trickId = t),
    (e.trickTick = e.simTick),
    (e.trickEnd = 0));
  let i = !!gr(e) | (r ? 2 : 0);
  L(e, t, 0, i, D[t].base, n);
}
function br(e, t, n, r, i) {
  t.held & N.OLLIE && (e.crouch = Math.min(12, e.crouch + 1));
  let a = Y(e),
    o = !1;
  if (e.mode === A.GROUND) {
    if (e.xfer & j.REVERT) {
      let n = t.pressed & (N.SPIN_L | N.SPIN_R),
        r = e.xfer & (j.REV_L | j.REV_R);
      n
        ? Zr(e, (n & N.SPIN_L) !== 0, i)
        : r
          ? Zr(e, r === j.REV_L, i)
          : e.simTick - e.modeTick >= 8 && (e.xfer &= ~zt);
    } else Qr(e, t, i);
    a > 0.8 &&
      !(e.xfer & j.REVERT) &&
      (ar(e.taps, k.U, k.D, 9, 1)
        ? wr(e, Ft, i)
        : ar(e.taps, k.D, k.U, 9, 1) && wr(e, Ct, i));
  } else {
    if ((li(e, -Vt[t.dir], r, 0.85, n, i), e.mode !== A.MANUAL)) return;
    if (
      (Sn(e, D[e.trickId].perTick),
      t.pressed & (N.SPIN_L | N.SPIN_R) && $r(e, t, i),
      t.pressed & (N.FLIP | N.GRAB))
    ) {
      let n = vr(e, r, t.pressed & N.FLIP ? N.FLIP : N.GRAB, [
        O.SPECIAL_MANUAL,
      ]);
      if (n) yr(e, n, i, !0);
      else if (
        t.pressed & N.GRAB &&
        !(t.held & N.OLLIE) &&
        e.simTick - e.trickTick >= 8
      ) {
        let n = (D[e.trickId].nose ? jt : St)[1 + F[t.dir]];
        n !== e.trickId && (yr(e, n, i), (o = !0));
      }
    }
  }
  if (
    (t.pressed & (N.FLIP | N.GRAB) &&
      !o &&
      (e.queued = (t.pressed & N.FLIP ? N.FLIP : N.GRAB) | (hr(t) << 8)),
    t.pressed & N.GRIND && e.mode === A.GROUND && a > 2)
  ) {
    let t = De / Math.max(a, 1);
    if (
      (Kr(e),
      n.rails.sweep(
        e.x,
        e.y + 0.2,
        e.z,
        e.x + e.vx * t,
        e.y + 0.2 + e.vy * t,
        e.z + e.vz * t,
        0.9,
        1.2,
        0.2,
        zn,
        G,
      ) && xr(e, n, r))
    ) {
      Tr(e, r, i, ct);
      return;
    }
  }
  Sr(e, t) && Tr(e, r, i, Cr(e));
}
function xr(e, t, n) {
  let r = Xn(e, Hn),
    i = Un;
  (i.reset(), Tr(r, n, i, ct));
  for (let e = 0; e < Kn && r.mode === A.AIR; e++) zr(r, Wn, t, n, qn, i);
  (Mi(r, t, i), pr(r, Wn), Fi(r));
  for (let e = 0; !(i.flags & Gn) && r.mode === A.AIR && e < 45; e++)
    (i.reset(), Ln(r, Wn, t, Jn, Kn, qn, i));
  return (i.flags & Gn) !== 0;
}
function Sr(e, t) {
  return (
    (t.released & N.OLLIE) !== 0 &&
    (e.crouch > 0 || (t.pressed & N.OLLIE) !== 0)
  );
}
function Cr(e) {
  return _(e.crouch / 12, 0, 1);
}
function wr(e, t, n) {
  (X(e, A.MANUAL),
    (e.bal = g(e.simTick, 7) * 0.12),
    (e.balVel = 0),
    mn(e, pn.MANUAL),
    yr(e, t, n),
    (n.flags |= P.MANUAL));
}
function Tr(e, t, n, r) {
  e.mode === A.GROUND && e.bankTick && wn(e, n);
  let i = v(de, Ae, r) * t.air,
    a = !1;
  if (e.uy < 0.5 && e.mode !== A.AIR)
    ((e.vy += i * 0.35 + oe), (a = e.vy > 0), a && Er(e));
  else {
    let t = e.vx,
      n = e.vz,
      r = e.ux * 0.55,
      a = e.uy * 0.55 + 0.45,
      o = e.uz * 0.55,
      s = Math.sqrt(r * r + a * a + o * o);
    ((r /= s),
      (a /= s),
      (o /= s),
      (e.vx += r * i),
      (e.vy += a * i),
      (e.vz += o * i),
      Ur(e, t, n));
  }
  ((e.crouch = 0), (n.flags |= P.OLLIE | P.LAUNCH), Dr(e, a, t, n));
}
function Er(e) {
  let t = e.ux,
    n = e.uz,
    r = Math.sqrt(t * t + n * n) || 1;
  ((t /= r), (n /= r), (e.vnx = t), (e.vnz = n), (e.vd = t * e.x + n * e.z));
}
function Dr(e, t, n, r) {
  let i = e.mode;
  if (((e.airFakie = _r(e)), X(e, A.AIR), (e.vert = t), t)) {
    ((e.lipY = e.y), e.vy > 10.5 * n.air && (e.vy = ye * n.air));
    let t = e.vx * e.vnx + e.vz * e.vnz;
    ((e.vx -= t * e.vnx), (e.vz -= t * e.vnz));
  }
  ((e.airYaw0 = e.yaw),
    (e.airFirst = e.comboTricks),
    (e.airPiece = e.lastPiece),
    (e.xfer = 0),
    (e.vturn = 0),
    (e.spinVel = 0),
    (e.bankTick = 0),
    (e.trickId = 0),
    (e.trickEnd = 0),
    (e.rail = -1),
    (i === A.GROUND || i === A.MANUAL) && mr(e, e.lastPiece, r));
}
