// assets/tagPaint-BOEtbgNi 08 — kind
// Lines 3416-3760 of readable/assets/tagPaint-BOEtbgNi.pretty.js (statement-aligned).
function Yn(e) {
  return z.find((t) => t.id === e);
}
function Xn(e) {
  return z.findIndex((t) => t.id === e);
}
function Zn(e, t) {
  if (!e.starter) return !1;
  let n = 0,
    r = !1;
  return (
    e.goals.forEach((i, a) => {
      t(a) ? n++ : e.starter.includes(i.id) && (r = !0);
    }),
    r && n < e.need
  );
}
var Qn = [
    {
      id: `kickflip`,
      kind: `trick`,
      trick: `Kickflip`,
      text: `Land a Kickflip`,
    },
    { id: `c2500`, kind: `combo`, pts: 2500, text: `Score 2,500 in one combo` },
    {
      id: `grind`,
      kind: `trick`,
      kinds: L,
      on: [22],
      text: `Grind the Big Handrail`,
    },
    {
      id: `gap`,
      kind: `gap`,
      gap: `West Kicker Gap`,
      text: `Clear the West Kicker Gap`,
    },
    {
      id: `spin540`,
      kind: `trick`,
      spin: 3,
      on: [1, 2, 3],
      text: `Land a 540 on the North Vert`,
    },
    {
      id: `five`,
      kind: `combo`,
      pts: 0,
      count: 5,
      text: `Chain a 5-trick combo`,
    },
    {
      id: `manual`,
      kind: `trick`,
      kinds: [y.MANUAL, y.SPECIAL_MANUAL],
      count: 3,
      text: `Link a combo with a Manual`,
    },
    {
      id: `lip`,
      kind: `trick`,
      kinds: [y.LIP],
      text: `Stall a lip trick on the vert`,
    },
    { id: `special`, kind: `trick`, kinds: Jn, text: `Pull off your Special` },
    { id: `c20k`, kind: `combo`, pts: 2e4, text: `Score 20,000 in one combo` },
  ],
  $n = `plaza`,
  er = [6, 4, 2],
  tr = { coin: `pickup_coin`, stash: `pickup_stash`, deck: `pickup_deck` },
  B = (e, t, n, r) => ({ id: e, tier: 0, x: t, y: n, z: r }),
  V = (e, t, n, r) => ({ id: e, tier: 1, x: t, y: n, z: r }),
  H = (e, t, n, r) => ({ id: e, tier: 2, x: t, y: n, z: r }),
  nr = [
    B(0, -3, 1.2, 8),
    B(1, -6, 1.2, 16),
    B(2, 6, 1.2, 16),
    B(3, -14, 1.2, 0),
    B(4, 14, 1.2, 0),
    B(5, 0, 1.2, 22),
    B(6, -20, 1.2, 20),
    B(7, 12, 1.2, 26),
    B(8, -12, 1.2, -28),
    B(9, 12, 1.2, -30),
    B(10, -36, 1.2, 4),
    B(11, -20, 1.2, -18),
    B(12, 22, 1.55, 6),
    B(13, 32, 1.2, -12),
    B(14, 26, 1.2, 20),
    B(15, -26, 1.2, 0),
    B(16, 0, 1.2, -29),
    B(17, 36, 1.2, 20),
    V(18, -9.5, 1.9, 4),
    V(19, 9.5, 1.9, 0),
    V(20, 20, 1.9, -17),
    V(21, 20, 1.95, 15),
    V(22, 37, 2.4, -4),
    V(23, 38, 2.8, 5),
    V(24, 32.5, 2.65, 32),
    V(25, -27, 2.5, 8),
    V(26, -27, 1.9, 33.5),
    V(27, 25, 1.95, -35),
    V(28, 34, 1.5, -42),
    H(29, -4.5, 5.8, 35.5),
    H(30, 9, 5.8, 35.5),
    H(31, 4, 3.8, -34.75),
    H(32, -31, 1.2, 25),
    H(33, -27, 2.6, -8),
    H(34, -33, 4.4, -33),
    H(35, 0, 3.4, 3),
  ],
  rr = null;
function ir(e) {
  if (rr?.day === e) return rr.drops;
  let t = [];
  return (
    er.forEach((n, r) => {
      let i = nr
        .filter((e) => e.tier === r)
        .map((t) => ({ d: t, k: ae(ie(`drop`, e, t.id))() }))
        .sort((e, t) => e.k - t.k || e.d.id - t.d.id);
      t.push(...i.slice(0, n).map((e) => e.d));
    }),
    (rr = { day: e, drops: t }),
    t
  );
}
var U = (e, t, n, r) => ({
    id: `hub.${e}`,
    kind: `stash`,
    park: $n,
    x: t,
    y: n,
    z: r,
    coins: 25,
  }),
  W = (e, t, n, r) => ({
    id: `deck.${e}`,
    kind: `deck`,
    level: e,
    x: t,
    y: n,
    z: r,
    coins: 50,
  }),
  ar = [
    U(`vert`, 0, 1.2, 42),
    U(`vertdeck`, -8, 4.6, 38.2),
    U(`pocket`, -39, 1.2, -39),
    U(`pool`, -33, -1.4, 25),
    U(`deck`, 43, 2.4, 7),
    U(`bankbox`, 37.5, 2.2, 34.8),
    U(`curb`, 42, 1.2, -42),
    U(`banktop`, -38.2, 2.3, -6),
    U(`corner`, -41, 1.2, 41),
    U(`mini`, 8, 3.6, -43.6),
    W(`skool`, 16, 3.9, 30.6),
    W(`crates`, -12, 4.2, -8),
    W(`pier`, 21, 3.8, 30),
    W(`mall`, 35, 2.7, 23),
    W(`city`, I.deck.x, I.deck.y, I.deck.z),
    W(`hangar`, 30, 8, -8),
    W(`beach`, 35.5, 4.4, 40.5),
    W(`bridge`, 30, 2, -38.4),
  ],
  or = new Map(ar.map((e) => [e.id, e])),
  sr = (e) => or.get(e),
  cr = (e) => ar.filter((t) => t.kind === `stash` && t.park === e),
  lr = (e) => or.get(`deck.${e}`),
  ur = [
    `noads`,
    `pros`,
    `secrets`,
    `style:street`,
    `style:party`,
    `style:royal`,
  ],
  G = (e) => ({ apple: `tailgrab.${e}`, google: `tailgrab.${e}` }),
  dr = {
    noads: {
      id: `noads`,
      kind: `noads`,
      name: `Supporter`,
      blurb: `No ad breaks, and every ad reward with a tap.`,
      sticker: `star`,
      skus: G(`noads`),
      listing: {
        usd: `4.99`,
        about: `No ad breaks, and every ad reward with a tap.`,
      },
    },
    pros: {
      id: `pros`,
      kind: `pros`,
      name: `The Whole Crew`,
      blurb: `Every pro, and every pro still to come.`,
      sticker: `trophy`,
      skus: G(`pros`),
      listing: {
        usd: `9.99`,
        about: `Every pro, and every pro still to come.`,
      },
    },
    secrets: {
      id: `secrets`,
      kind: `secrets`,
      name: `Sealed Secrets`,
      blurb: `Every secret skater, out there now and still to come. Skip the riddles.`,
      sticker: `sparkle`,
      skus: G(`secrets`),
      listing: { usd: `4.99`, about: `Every secret skater, now and to come.` },
    },
    "style:street": {
      id: `style:street`,
      kind: `style`,
      name: `Street Pack`,
      blurb: `Hoodie, baggies, two hats, a backpack and a boombox.`,
      sticker: `spray`,
      skus: G(`style.street`),
      listing: {
        usd: `1.99`,
        about: `Hoodie, baggies, two hats, backpack, boombox.`,
      },
      keys: [
        `top:hoodie`,
        `bottom:baggies`,
        `hat:cap-back`,
        `hat:beanie-pom`,
        `acc:backpack`,
        `acc:boombox`,
      ],
    },
    "style:party": {
      id: `style:party`,
      kind: `style`,
      name: `Party Pack`,
      blurb: `Party hat, propeller, balloon, fairy dress and wings.`,
      sticker: `popper`,
      skus: G(`style.party`),
      listing: {
        usd: `1.99`,
        about: `Party hat, propeller, balloon, dress, wings.`,
      },
      keys: [
        `hat:party`,
        `hat:propeller`,
        `acc:balloon`,
        `top:dress`,
        `acc:wings`,
      ],
    },
    "style:royal": {
      id: `style:royal`,
      kind: `style`,
      name: `Royal Pack`,
      blurb: `Crown, cape, visor and a spare deck.`,
      sticker: `trophy`,
      skus: G(`style.royal`),
      listing: { usd: `1.99`, about: `Crown, cape, visor and a spare deck.` },
      keys: [`hat:crown`, `acc:cape`, `hat:visor`, `acc:spare-deck`],
    },
  },
  fr = (e) => Object.hasOwn(dr, e);
function pr(e, t) {
  return e === `fake`
    ? fr(t)
      ? t
      : void 0
    : ur.find((n) => dr[n].skus[e] === t);
}
var mr = (e, t) => !!e && e.paid.includes(t),
  hr = (e) => mr(e, `noads`),
  K = [`air`, `speed`, `spin`, `balance`],
  gr = 8,
  _r = {
    goal: 500,
    clear: 1500,
    plazaGoal: 250,
    match: 250,
    win: 750,
    botMatch: 50,
    botWin: 100,
    tutorial: 500,
  };
function q(e) {
  let t = z.find((t) => t.unlocks === e);
  return t ? { kind: `career`, level: t.id } : (C[e]?.unlock ?? null);
}
var vr = (e, t) =>
    !!e && (e.kind === t || (e.kind === `any` && e.of.some((e) => vr(e, t)))),
  yr = C.map((e) => e.id).filter((e) => vr(q(e), `starter`)),
  br = (e) => vr(e, `ad`);
[
  ...C.filter((e) => br(q(e.id))).map((e) => `pro:${e.id}`),
  ...Object.entries(ge).flatMap(([e, t]) =>
    t.filter((e) => br(e.unlock)).map((t) => `${e}:${t.id}`),
  ),
];
function xr(e) {
  if (e?.kind === `career`) return e.level;
  if (e?.kind !== `any`) return null;
  for (let t of e.of) {
    let e = xr(t);
    if (e) return e;
  }
  return null;
}
function Sr(e) {
  if (e?.kind === `shop`) return e.price;
  if (e?.kind !== `any`) return null;
  for (let t of e.of) {
    let e = Sr(t);
    if (e !== null) return e;
  }
  return null;
}
var Cr = (e) =>
    Object.entries(ge).flatMap(([t, n]) =>
      n.flatMap((n) => {
        let r = Sr(n.unlock);
        return r !== null && !!n.secret === e ? [[`${t}:${n.id}`, r]] : [];
      }),
    ),
  wr = new Map([
    ...Cr(!1),
    ...pe.flatMap((e) =>
      _e.filter((t) => !fe[e].has(t.id)).map((t) => [de(e, t.id), 40]),
    ),
  ]),
  Tr = new Map(Cr(!0));
function Er(e) {
  let [t, n] = e.split(`:`);
  return t in ge ? me(t, n)?.secret : void 0;
}
function Dr(e, t) {
  let n = Er(t);
  return !n || kr(e, n) || (!!e && t in e.bought);
}
function Or(e) {
  if (!e || !Ae.some((t) => kr(e, t.key))) return wr;
  let t = new Map(wr);
  for (let [n, r] of Tr) Dr(e, n) && t.set(n, r);
  return t;
}
