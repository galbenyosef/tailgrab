// assets/session-DxCN6jDh 09 — yaw
// Lines 2508-2852 of readable/assets/session-DxCN6jDh.pretty.js (statement-aligned).
function Ai(e, t, n) {
  e.vy -= 17 * n;
  let r = e.x,
    i = e.y,
    a = e.z;
  ((e.x += e.vx * n), (e.y += e.vy * n), (e.z += e.vz * n));
  let o = e.x - r,
    s = e.y - i,
    c = e.z - a,
    l = Math.sqrt(o * o + s * s + c * c);
  if (
    l > 1e-6 &&
    t.col.raySurface(r, i, a, o / l, s / l, c / l, l + 0.02, V) &&
    V.ny > -0.2
  ) {
    if (V.ny >= 0.8)
      return (
        (e.x = V.px),
        (e.y = V.py),
        (e.z = V.pz),
        (e.vy = 0),
        Ei(e, 4),
        !1
      );
    ((e.x = V.px + V.nx * 0.01),
      (e.y = V.py + V.ny * 0.01),
      (e.z = V.pz + V.nz * 0.01));
    let t = e.vx * V.nx + e.vy * V.ny + e.vz * V.nz;
    t < 0 && ((e.vx -= t * V.nx), (e.vy -= t * V.ny), (e.vz -= t * V.nz));
  }
  return (ji(e, t, !0), !0);
}
function ji(e, t, n) {
  for (let r = 0; r < 2; r++) {
    let i = r ? at : mt,
      a = r ? Be : $e;
    if (
      ((K.x = e.x),
      (K.y = e.y + i),
      (K.z = e.z),
      !t.col.sphereWalls(K, a, 0, 1, 0, U))
    )
      continue;
    ((e.x += U.dx), (e.z += U.dz), n && (e.y += U.dy));
    let o = Math.sqrt(U.nx * U.nx + U.nz * U.nz);
    if (o < 1e-6) continue;
    let s = U.nx / o,
      c = U.nz / o,
      l = -(e.vx * s + e.vz * c);
    l > 0 && ((e.vx += s * l), (e.vz += c * l));
  }
}
function Mi(e, t, n) {
  (e.mode === A.GROUND && e.bankTick && e.simTick >= e.bankTick && wn(e, n),
    e.mode === A.MANUAL &&
      Y(e) < 0.8 &&
      (X(e, A.GROUND), (e.trickId = 0), wn(e, n)),
    e.comboMult === 0 &&
      e.special > 0 &&
      e.special < 200 &&
      e.simTick % 20 == 0 &&
      e.special--);
  let r = t.box;
  (e.y < t.killY || e.x > r.x1 || e.x < r.x0 || e.z > r.z1 || e.z < r.z0) &&
    Ni(e, t, n, Ht.OUT);
  let i = t.lawn;
  (i &&
    (e.x < i.rect.x0 ||
      e.x > i.rect.x1 ||
      e.z < i.rect.z0 ||
      e.z > i.rect.z1) &&
    e.y <= re(i, e.x, e.z) &&
    Ni(e, t, n, Ht.GRASS),
    (!Number.isFinite(e.x) || !Number.isFinite(e.y) || !Number.isFinite(e.z)) &&
      Ni(e, t, n));
}
function Ni(e, t, n, r = Ht.KEY) {
  gn(e, n);
  let i = t.layout.spawns,
    a = 0,
    o = 1 / 0;
  for (let t = 0; t < i.length; t++) {
    let n = i[t],
      r =
        (n.x - e.x) * (n.x - e.x) +
        (n.z - e.z) * (n.z - e.z) +
        25 * (n.y - e.y) * (n.y - e.y);
    Number.isFinite(r) && r < o && ((o = r), (a = t));
  }
  let s = i[a];
  ((e.x = s.x),
    (e.y = s.y),
    (e.z = s.z),
    (e.vx = 0),
    (e.vy = 0),
    (e.vz = 0),
    (e.yaw = s.yaw + x * Math.round((e.yaw - s.yaw) / x)),
    (e.ux = 0),
    (e.uy = 1),
    (e.uz = 0),
    (e.spinVel = 0),
    (e.vert = !1),
    (e.rail = -1),
    (e.trickId = 0),
    (e.queued = 0),
    (e.crouch = 0),
    (e.rolling = !1),
    (e.xfer = 0),
    (e.vturn = 0),
    (e.bal = 0),
    (e.balVel = 0),
    X(e, A.GROUND),
    (n.flags |= P.RESPAWN),
    (n.respawnWhy = r));
}
var Pi = [
  `x`,
  `y`,
  `z`,
  `vx`,
  `vy`,
  `vz`,
  `yaw`,
  `ux`,
  `uy`,
  `uz`,
  `spinVel`,
  `airYaw0`,
  `vnx`,
  `vnz`,
  `vd`,
  `lipY`,
  `railT`,
  `bal`,
  `balVel`,
  `vturn`,
];
function Fi(e) {
  for (let t of Pi) e[t] = Math.fround(e[t]);
}
var Ii = { COMBO: 0, RUN: 1 },
  Li = 4294967295,
  Z = rn.length;
function Ri(e, t = new Float64Array(Z)) {
  return (
    (t[0] = e.x),
    (t[1] = e.y),
    (t[2] = e.z),
    (t[3] = e.vx),
    (t[4] = e.vy),
    (t[5] = e.vz),
    (t[6] = e.yaw),
    (t[7] = e.ux),
    (t[8] = e.uy),
    (t[9] = e.uz),
    (t[10] = e.spinVel),
    (t[11] = e.simTick),
    (t[12] = e.mode),
    (t[13] = e.modeTick),
    (t[14] = +e.rolling),
    (t[15] = e.crouch),
    (t[16] = e.coyote),
    (t[17] = e.bankTick),
    (t[18] = e.airYaw0),
    (t[19] = +e.airFakie),
    (t[20] = +e.vert),
    (t[21] = e.vnx),
    (t[22] = e.vnz),
    (t[23] = e.vd),
    (t[24] = e.lipY),
    (t[25] = e.airFirst),
    (t[26] = e.airPiece),
    (t[27] = e.xfer),
    (t[28] = e.vturn),
    (t[29] = e.rail),
    (t[30] = e.railT),
    (t[31] = e.railDir),
    (t[32] = e.bal),
    (t[33] = e.balVel),
    (t[34] = e.balClock),
    (t[35] = e.balCarry),
    (t[36] = e.trickId),
    (t[37] = e.trickTick),
    (t[38] = e.trickEnd),
    (t[39] = e.queued),
    (t[40] = e.grindBuf),
    (t[41] = e.taps),
    (t[42] = e.lastPiece),
    (t[43] = e.comboBase),
    (t[44] = e.comboMult),
    (t[45] = e.comboTricks),
    (t[46] = e.ring0),
    (t[47] = e.ring1),
    (t[48] = e.ring2),
    (t[49] = e.ring3),
    (t[50] = e.comboSeq),
    (t[51] = e.special),
    t
  );
}
function zi(e, t) {
  return (
    (t.x = e[0]),
    (t.y = e[1]),
    (t.z = e[2]),
    (t.vx = e[3]),
    (t.vy = e[4]),
    (t.vz = e[5]),
    (t.yaw = e[6]),
    (t.ux = e[7]),
    (t.uy = e[8]),
    (t.uz = e[9]),
    (t.spinVel = e[10]),
    (t.simTick = e[11]),
    (t.mode = e[12]),
    (t.modeTick = e[13]),
    (t.rolling = e[14] !== 0),
    (t.crouch = e[15]),
    (t.coyote = e[16]),
    (t.bankTick = e[17]),
    (t.airYaw0 = e[18]),
    (t.airFakie = e[19] !== 0),
    (t.vert = e[20] !== 0),
    (t.vnx = e[21]),
    (t.vnz = e[22]),
    (t.vd = e[23]),
    (t.lipY = e[24]),
    (t.airFirst = e[25]),
    (t.airPiece = e[26]),
    (t.xfer = e[27]),
    (t.vturn = e[28]),
    (t.rail = e[29]),
    (t.railT = e[30]),
    (t.railDir = e[31]),
    (t.bal = e[32]),
    (t.balVel = e[33]),
    (t.balClock = e[34]),
    (t.balCarry = e[35]),
    (t.trickId = e[36]),
    (t.trickTick = e[37]),
    (t.trickEnd = e[38]),
    (t.queued = e[39]),
    (t.grindBuf = e[40]),
    (t.taps = e[41]),
    (t.lastPiece = e[42]),
    (t.comboBase = e[43]),
    (t.comboMult = e[44]),
    (t.comboTricks = e[45]),
    (t.ring0 = e[46]),
    (t.ring1 = e[47]),
    (t.ring2 = e[48]),
    (t.ring3 = e[49]),
    (t.comboSeq = e[50]),
    (t.special = e[51]),
    t
  );
}
var Bi = new Float64Array(Z),
  Vi = new Uint32Array(Bi.buffer);
function Hi(e) {
  Ri(e, Bi);
  let t = 2166136261;
  for (let e = 0; e < Vi.length; e++) t = Math.imul(t ^ Vi[e], 16777619);
  return t >>> 0;
}
function Ui(e, t, n, r) {
  return (
    (r.dir = e[n]),
    (r.held = e[t + n]),
    (r.pressed = e[2 * t + n]),
    (r.released = e[3 * t + n]),
    (r.pressDir = e[4 * t + n]),
    (r.tapDir = e[5 * t + n]),
    (r.stickX = (e[6 * t + n] << 24) >> 24),
    r
  );
}
new TextEncoder();
var Wi = new TextDecoder();
function Gi(e) {
  let t = new DataView(e.buffer, e.byteOffset, e.byteLength),
    n = 0,
    r = (t) => {
      if (n + t > e.byteLength) throw Error(`truncated tape`);
    };
  r(6);
  let i = t.getUint8(n++);
  if (i > 2) throw Error(`tape v${i} is newer than v2`);
  let a = t.getUint8(n++),
    o = t.getUint8(n++),
    s = t.getUint8(n++),
    c = t.getUint16(n, !0);
  n += 2;
  let l = () => {
      r(2);
      let i = t.getUint16(n, !0);
      ((n += 2), r(i));
      let a = Wi.decode(e.subarray(n, n + i));
      return ((n += i), a);
    },
    u = l(),
    d = l(),
    f = l();
  r(22);
  let p = () => {
      let e = t.getUint32(n, !0);
      return ((n += 4), e);
    },
    m = p(),
    h = p(),
    g = p(),
    _ = p(),
    v = p();
  if (h > 2e4) throw Error(`tape too long (${h} steps)`);
  let y = t.getUint16(n, !0);
  ((n += 2), r(8 * y));
  let b = [];
  for (let e = 0; e < y; e++) b.push({ at: p(), boost: p() });
  let x = i < 2 ? 6 : 7;
  r(8 * Z + x * h);
  let S = new Float64Array(Z);
  for (let e = 0; e < Z; e++) ((S[e] = t.getFloat64(n, !0)), (n += 8));
  let C = new Uint8Array(7 * h);
  return (
    C.set(e.subarray(n, n + x * h)),
    {
      v: i,
      kind: a,
      tickHz: o,
      subSteps: s,
      skater: c,
      board: u,
      place: d,
      look: f,
      score: m,
      n: h,
      bankAt: g,
      endHash: _,
      boost0: v,
      boosts: b,
      start: S,
      inputs: C,
    }
  );
}
