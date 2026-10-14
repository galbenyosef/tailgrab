// assets/tagPaint-BOEtbgNi 05 — float32
// Lines 2283-2623 of readable/assets/tagPaint-BOEtbgNi.pretty.js (statement-aligned).
(m(`schema`, d),
  m(`none`, Ue),
  n(
    {
      dir: v.uint8(),
      held: v.uint8(),
      pressed: v.uint8(),
      released: v.uint8(),
      pressDir: v.uint8(),
      tapDir: v.uint8(),
      stickX: v.int8(),
    },
    `MoveInput`,
  ));
var Skater = n(
    {
      x: v.float32(),
      y: v.float32(),
      z: v.float32(),
      vx: v.float32(),
      vy: v.float32(),
      vz: v.float32(),
      yaw: v.float32(),
      ux: v.float32(),
      uy: v.float32().default(1),
      uz: v.float32(),
      spinVel: v.float32(),
      simTick: v.uint32(),
      mode: v.uint8(),
      modeTick: v.uint32(),
      rolling: v.boolean(),
      crouch: v.uint8(),
      coyote: v.uint8(),
      bankTick: v.uint32(),
      airYaw0: v.float32(),
      airFakie: v.boolean(),
      vert: v.boolean(),
      vnx: v.float32(),
      vnz: v.float32(),
      vd: v.float32(),
      lipY: v.float32(),
      airFirst: v.uint16(),
      airPiece: v.uint16(),
      xfer: v.uint8(),
      vturn: v.float32(),
      rail: v.int16().default(-1),
      railT: v.float32(),
      railDir: v.int8().default(1),
      bal: v.float32(),
      balVel: v.float32(),
      balClock: v.uint32(),
      balCarry: v.uint32(),
      trickId: v.uint8(),
      trickTick: v.uint32(),
      trickEnd: v.uint32(),
      queued: v.uint32(),
      grindBuf: v.uint8(),
      taps: v.uint32(),
      lastPiece: v.uint16(),
      comboBase: v.uint32(),
      comboMult: v.uint16(),
      comboTricks: v.uint16(),
      ring0: v.uint32(),
      ring1: v.uint32(),
      ring2: v.uint32(),
      ring3: v.uint32(),
      comboSeq: v.uint16(),
      special: v.uint8(),
      name: v.string().default(``),
      skater: v.uint8().default(0),
      look: v.string().default(``),
      color: v.uint8().default(0),
      boost: v.uint32().default(0),
      warpSeq: v.uint8().default(0),
      score: v.uint32().default(0),
      best: v.uint32().default(0),
      away: v.boolean().default(!1),
      bot: v.boolean().default(!1),
      queue: v.string().default(``),
    },
    `Skater`,
  ),
  qt =
    `x.y.z.vx.vy.vz.yaw.ux.uy.uz.spinVel.simTick.mode.modeTick.rolling.crouch.coyote.bankTick.airYaw0.airFakie.vert.vnx.vnz.vd.lipY.airFirst.airPiece.xfer.vturn.rail.railT.railDir.bal.balVel.balClock.balCarry.trickId.trickTick.trickEnd.queued.grindBuf.taps.lastPiece.comboBase.comboMult.comboTricks.ring0.ring1.ring2.ring3.comboSeq.special`.split(
      `.`,
    ),
  Jt = { IDLE: 0, FILLING: 1, LAUNCHING: 2 },
  Portal = n(
    {
      count: v.uint8().default(0),
      status: v.uint8().default(0),
      launchAt: v.number().default(0),
      startVotes: v.uint8().default(0),
    },
    `Portal`,
  ),
  HubState = n(
    {
      code: v.string().default(``),
      parkId: v.string().default(``),
      skaters: v.map(Skater),
      portals: v.map(Portal),
    },
    `HubState`,
  ),
  Competitor = n(
    {
      name: v.string().default(``),
      skater: v.uint8().default(0),
      look: v.string().default(``),
      color: v.uint8().default(0),
      connected: v.boolean().default(!0),
      left: v.boolean().default(!1),
      loaded: v.boolean().default(!1),
      rematch: v.boolean().default(!1),
      score: v.uint32().default(0),
      best: v.uint32().default(0),
      bestTricks: v.string().default(``),
      bails: v.uint16().default(0),
      pieces: v.uint8().default(0),
      paint: v.uint32().default(0),
      letters: v.uint8().default(0),
      lettersAt: v.uint32().default(0),
      itMs: v.uint32().default(0),
      tags: v.uint16().default(0),
      horse: v.uint8().default(0),
      out: v.boolean().default(!1),
      ot: v.boolean().default(!1),
      rank: v.uint8().default(0),
    },
    `Competitor`,
  ),
  Piece = n(
    { owner: v.string().default(``), score: v.uint32().default(0) },
    `Piece`,
  ),
  $t = { SETUP: 0, ACTIVE: 1, RESULT: 2 },
  HorseState = n(
    {
      activeId: v.string().default(``),
      setterId: v.string().default(``),
      target: v.uint32().default(0),
      stage: v.uint8().default(0),
      stageEndsAt: v.number().default(0),
      round: v.uint8().default(0),
      spot: v.uint8().default(0),
      verdict: v.uint8().default(0),
      lastScore: v.uint32().default(0),
      order: v.string().default(``),
      last: v.boolean().default(!1),
    },
    `HorseState`,
  ),
  LetterSpot = n(
    {
      x: v.float32().default(0),
      y: v.float32().default(0),
      z: v.float32().default(0),
    },
    `LetterSpot`,
  ),
  TagState = n(
    {
      itId: v.string().default(``),
      graceUntil: v.number().default(0),
      noBackId: v.string().default(``),
      noBackUntil: v.number().default(0),
    },
    `TagState`,
  ),
  CareerGoal = n(
    {
      id: v.string().default(``),
      done: v.boolean().default(!1),
      now: v.boolean().default(!1),
    },
    `CareerGoal`,
  ),
  CareerSpot = n(
    {
      x: v.float32().default(0),
      y: v.float32().default(0),
      z: v.float32().default(0),
      goal: v.uint8().default(0),
      item: v.string().default(``),
    },
    `CareerSpot`,
  ),
  CareerState = n(
    {
      level: v.string().default(``),
      goals: v.array(CareerGoal),
      spots: v.array(CareerSpot),
      got: v.uint32().default(0),
    },
    `CareerState`,
  ),
  MatchState = n(
    {
      mode: v.string().default(`trick`),
      parkId: v.string().default(``),
      phase: v.uint8().default(0),
      phaseEndsAt: v.number().default(0),
      countdownAt: v.number().default(0),
      playStartsAt: v.number().default(0),
      freezeAt: v.number().default(0),
      hubCode: v.string().default(``),
      skaters: v.map(Skater),
      roster: v.map(Competitor),
      graffiti: v.map(Piece),
      letters: v.array(LetterSpot),
      horse: v.ref(HorseState),
      tag: v.ref(TagState),
      career: v.ref(CareerState),
    },
    `MatchState`,
  ),
  ParkState = n(
    {
      code: v.string().default(``),
      parkId: v.string().default(``),
      name: v.string().default(``),
      ownerName: v.string().default(``),
      meta: v.string().default(``),
      pieces: v.map(`string`),
      rev: v.uint32().default(0),
      openBuild: v.boolean().default(!1),
      published: v.boolean().default(!1),
      owners: v.map(`boolean`),
      builders: v.map(`boolean`),
      daily: v.boolean().default(!1),
      editing: v.map(`boolean`),
      skaters: v.map(Skater),
    },
    `ParkState`,
  ),
  Ghost = n(
    {
      x: v.float32().default(0),
      y: v.float32().default(0),
      z: v.float32().default(0),
      vx: v.float32().default(0),
      vy: v.float32().default(0),
      vz: v.float32().default(0),
      yaw: v.float32().default(0),
      ux: v.float32().default(0),
      uy: v.float32().default(1),
      uz: v.float32().default(0),
      simTick: v.uint32().default(0),
      mode: v.uint8().default(0),
      modeTick: v.uint32().default(0),
      crouch: v.uint8().default(0),
      bal: v.float32().default(0),
      trickId: v.uint8().default(0),
      trickTick: v.uint32().default(0),
      trickEnd: v.uint32().default(0),
      name: v.string().default(``),
      skater: v.uint8().default(0),
      look: v.string().default(``),
      color: v.uint8().default(0),
      live: v.boolean().default(!1),
    },
    `Ghost`,
  ),
  GhostState = n({ skaters: v.map(Ghost) }, `GhostState`),
  backendUrl = `wss://backend.tailgrab.io`,
  P = new g(backendUrl),
  createClient = backendUrl.replace(/^ws/, `http`).replace(/\/$/, ``),
  pn = 220;
function mn(e) {
  let t = { mode: `lerp`, delay: e, snap: 5, smoothMs: 20 },
    n = { mode: `lerp`, delay: e, smoothMs: 20 };
  return {
    x: t,
    y: t,
    z: t,
    ux: n,
    uy: n,
    uz: n,
    yaw: n,
    simTick: { mode: `lerp`, delay: e },
  };
}
var hn = mn(110),
  F = () => ({ name: je.name, skater: je.skater, color: je.color });
async function gn(e = {}) {
  let t = { ...F(), spectate: e.spectate };
  return _n(
    e.id ? await P.joinById(e.id, t, HubState) : await P.joinOrCreate(`hub`, t, HubState),
  );
}
async function _n(t) {
  await yn(t);
  let n = e.get(t),
    r = Te(t.state.parkId),
    i = Gt.get(t, { mode: `lerp`, delay: 110, name: `skaters` });
  return (
    i.attachAll(`skaters`, hn),
    { kind: `hub`, room: t, callbacks: n, predict: i, world: r }
  );
}
function vn(e, t = 5e3) {
  let n = e.room;
  return n.connection.isOpen
    ? (n.send(`play`, F()),
      new Promise((e, r) => {
        let i = () => {
            n.state.skaters.has(n.sessionId) && a();
          },
          a = (t) => {
            (clearTimeout(o), n.onStateChange.remove(i), t ? r(t) : e());
          },
          o = setTimeout(() => a(Error(`no skater after play`)), t);
        (n.onStateChange(i), i());
      }))
    : Promise.reject(Error(`plaza connection closed`));
}
function yn(e) {
  return e.state?.parkId
    ? Promise.resolve()
    : new Promise((t, n) => {
        (e.onStateChange.once(() => t()),
          e.onLeave.once((e, t) => n(Error(t || `room closed`))));
      });
}
async function bn(e) {
  return Sn(await P.consumeSeatReservation(e, MatchState));
}
async function xn(e) {
  return Sn(await P.create(`career`, { level: e, ...F() }, MatchState));
}
async function Sn(t) {
  await yn(t);
  let n = e.get(t),
    r = Te(t.state.parkId),
    i = Gt.get(t, { mode: `lerp`, delay: 110, name: `skaters` });
  return (
    i.attachAll(`skaters`, hn),
    { kind: `match`, room: t, callbacks: n, predict: i, world: r }
  );
}
