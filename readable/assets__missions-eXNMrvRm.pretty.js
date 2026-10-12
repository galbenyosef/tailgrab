import { c as e } from "./table-W1plLavt.js";
import { i as t } from "./skaters-pUdq6stw.js";
var n = [`daily`, `weekly`];
function r(e) {
  return e.kind === `best` || e.kind === `chain` || e.kind === `runScore`
    ? `max`
    : e.kind === `modes` || e.kind === `parks`
      ? `set`
      : `sum`;
}
var i = [e.FLIP],
  a = [e.SPECIAL_AIR, e.SPECIAL_GRIND, e.SPECIAL_MANUAL],
  o = (e, t, n, r, i, a, o, s = {}) => ({
    id: `d.${e}`,
    cadence: `daily`,
    family: t,
    text: n,
    short: r,
    obj: i,
    goal: a,
    xp: o,
    ...s,
  }),
  s = (e, t, n, r, i, a, o, s = {}) => ({
    id: `w.${e}`,
    cadence: `weekly`,
    family: t,
    text: n,
    short: r,
    obj: i,
    goal: a,
    xp: o,
    ...s,
  }),
  c = [
    o(
      `kickflip`,
      `trick`,
      `Land {n} Kickflips`,
      `Kickflips`,
      { kind: `tricks`, f: { trick: `Kickflip` } },
      [5, 10, 15],
      225,
    ),
    o(
      `heelflip`,
      `trick`,
      `Land {n} Heelflips`,
      `Heelflips`,
      { kind: `tricks`, f: { trick: `Heelflip` } },
      [5, 10, 15],
      225,
    ),
    o(
      `flips`,
      `trick`,
      `Land {n} flip tricks`,
      `Flip tricks`,
      { kind: `tricks`, f: { kinds: i } },
      [10, 20, 30],
      225,
    ),
    o(
      `grabs`,
      `trick`,
      `Land {n} grabs`,
      `Grabs`,
      { kind: `tricks`, f: { kinds: [e.GRAB] } },
      [8, 15, 25],
      225,
    ),
    o(
      `grinds`,
      `trick`,
      `Land {n} grinds`,
      `Grinds`,
      { kind: `tricks`, f: { kinds: [e.GRIND] } },
      [5, 10, 15],
      225,
    ),
    o(
      `spin360`,
      `trick`,
      `Spin {n} 360s or bigger`,
      `360s`,
      { kind: `tricks`, f: { spin: 2 } },
      [3, 6, 10],
      300,
      { one: `Spin a 360` },
    ),
    o(
      `slides`,
      `trick`,
      `Land {n} slides`,
      `Slides`,
      { kind: `tricks`, f: { kinds: [e.SLIDE] } },
      [4, 8, 12],
      250,
    ),
    o(
      `lips`,
      `trick`,
      `Stall {n} lip tricks`,
      `Lip tricks`,
      { kind: `tricks`, f: { kinds: [e.LIP] } },
      [2, 4, 6],
      300,
    ),
    o(
      `wallride`,
      `trick`,
      `Land {n} wallrides`,
      `Wallrides`,
      { kind: `tricks`, f: { kinds: [e.WALLRIDE] } },
      [2, 4, 6],
      300,
    ),
    o(
      `special`,
      `trick`,
      `Pull off {n} Specials`,
      `Specials`,
      { kind: `tricks`, f: { kinds: a } },
      [1, 2, 3],
      375,
      { one: `Pull off a Special` },
    ),
    o(
      `gaps`,
      `skill`,
      `Clear {n} gaps`,
      `Gaps`,
      { kind: `gaps` },
      [3, 6, 10],
      300,
    ),
    o(
      `grind`,
      `skill`,
      `Grind {n} m`,
      `Grind`,
      { kind: `grind` },
      [40, 100, 200],
      300,
      { unit: `m` },
    ),
    o(
      `manual`,
      `skill`,
      `Manual for {n} seconds`,
      `Manual`,
      { kind: `manual` },
      [8, 20, 40],
      300,
      { unit: `s` },
    ),
    o(
      `combo`,
      `skill`,
      `Land a {n}-point combo`,
      `Best combo`,
      { kind: `best` },
      [1500, 5e3, 12e3],
      350,
    ),
    o(
      `chain`,
      `skill`,
      `Chain {n} tricks in one combo`,
      `Longest chain`,
      { kind: `chain` },
      [5, 8, 12],
      350,
    ),
    o(
      `bank`,
      `skill`,
      `Bank {n} combo points`,
      `Points`,
      { kind: `bank` },
      [15e3, 5e4, 15e4],
      300,
    ),
    o(
      `combos`,
      `skill`,
      `Land {n} combos worth 1,000+`,
      `Big combos`,
      { kind: `combos`, min: 1e3 },
      [5, 10, 20],
      300,
    ),
    o(
      `matches`,
      `play`,
      `Finish {n} portal matches`,
      `Matches`,
      { kind: `matches` },
      [1, 2, 3],
      250,
      { one: `Finish a portal match` },
    ),
    o(
      `win`,
      `play`,
      `Win {n} matches`,
      `Wins`,
      { kind: `wins` },
      [1, 1, 2],
      375,
      { one: `Win a match` },
    ),
    o(
      `run`,
      `play`,
      `Skate {n} career runs`,
      `Career runs`,
      { kind: `runs` },
      [1, 2, 3],
      250,
      { one: `Skate a career run` },
    ),
    o(
      `parks`,
      `play`,
      `Land combos in {n} different parks`,
      `Parks`,
      { kind: `parks` },
      [2, 2, 3],
      300,
    ),
    o(
      `trick`,
      `play`,
      `Finish {n} Trick Attack matches`,
      `Trick Attack`,
      { kind: `matches`, mode: `trick` },
      [1, 2, 2],
      300,
      { one: `Finish a Trick Attack match` },
    ),
    o(
      `skate`,
      `play`,
      `Finish {n} S-K-A-T-E matches`,
      `S-K-A-T-E`,
      { kind: `matches`, mode: `skate` },
      [1, 1, 2],
      300,
      { one: `Finish a S-K-A-T-E match` },
    ),
    s(
      `flips`,
      `trick`,
      `Land {n} flip tricks`,
      `Flip tricks`,
      { kind: `tricks`, f: { kinds: i } },
      [60, 120, 200],
      800,
    ),
    s(
      `grabs`,
      `trick`,
      `Land {n} grabs`,
      `Grabs`,
      { kind: `tricks`, f: { kinds: [e.GRAB] } },
      [50, 100, 160],
      800,
    ),
    s(
      `specials`,
      `trick`,
      `Pull off {n} Specials`,
      `Specials`,
      { kind: `tricks`, f: { kinds: a } },
      [5, 10, 20],
      1050,
    ),
    s(
      `bank`,
      `skill`,
      `Bank {n} combo points`,
      `Points`,
      { kind: `bank` },
      [15e4, 5e5, 15e5],
      1050,
    ),
    s(
      `combo`,
      `skill`,
      `Land a {n}-point combo`,
      `Best combo`,
      { kind: `best` },
      [8e3, 25e3, 6e4],
      1050,
    ),
    s(
      `gaps`,
      `skill`,
      `Clear {n} gaps`,
      `Gaps`,
      { kind: `gaps` },
      [20, 40, 70],
      950,
    ),
    s(
      `grind`,
      `skill`,
      `Grind {n} m`,
      `Grind`,
      { kind: `grind` },
      [300, 800, 1500],
      950,
      { unit: `m` },
    ),
    s(
      `wins`,
      `play`,
      `Win {n} matches`,
      `Wins`,
      { kind: `wins` },
      [3, 5, 10],
      1300,
    ),
    s(
      `matches`,
      `play`,
      `Finish {n} portal matches`,
      `Matches`,
      { kind: `matches` },
      [8, 15, 25],
      1050,
    ),
    s(
      `modes`,
      `play`,
      `Play {n} different modes`,
      `Modes`,
      { kind: `modes` },
      [3, 4, 5],
      1050,
    ),
    s(
      `runs`,
      `play`,
      `Skate {n} career runs`,
      `Career runs`,
      { kind: `runs` },
      [5, 10, 15],
      950,
    ),
    s(
      `runScore`,
      `play`,
      `Score {n} in one career run`,
      `Best run`,
      { kind: `runScore` },
      [15e3, 4e4, 1e5],
      1050,
    ),
    s(
      `parks`,
      `play`,
      `Land combos in {n} different parks`,
      `Parks`,
      { kind: `parks` },
      [3, 4, 5],
      950,
    ),
    o(
      `coins`,
      `play`,
      `Grab {n} coins in the Skate Hub`,
      `Hub coins`,
      { kind: `pickups` },
      [4, 6, 8],
      250,
    ),
  ],
  l = new Map(c.map((e) => [e.id, e])),
  u = (e) => l.get(e),
  d = 16;
function f() {
  return {
    daily: { period: 0, slots: [], crate: !1 },
    weekly: { period: 0, slots: [], crate: !1 },
    rerollDay: 0,
    streak: { n: 0, day: 0 },
    stars: 0,
  };
}
var p = (e) =>
  typeof e == `number` && Number.isFinite(e) ? Math.max(0, Math.floor(e)) : 0;
function m(e) {
  let t = f();
  if (!e || typeof e != `object`) return t;
  let i = e;
  for (let e of n) {
    let n = i[e];
    if (!n || typeof n != `object`) continue;
    ((t[e].period = p(n.period)), (t[e].crate = n.crate === !0));
    let a = Array.isArray(n.slots) ? n.slots : [];
    for (let n of a) {
      let i = n && typeof n == `object` ? u(String(n.id)) : void 0;
      if (
        !i ||
        i.cadence !== e ||
        t[e].slots.length >= 3 ||
        t[e].slots.some((e) => e.id === i.id)
      )
        continue;
      let a = Math.max(1, Math.min(i.goal[2], p(n.goal) || i.goal[0])),
        o = { id: i.id, goal: a, n: 0, claimed: n.claimed === !0 };
      if (r(i.obj) === `set`) {
        let e = Array.isArray(n.seen)
          ? [...new Set(n.seen.filter((e) => typeof e == `string`))].slice(0, d)
          : [];
        ((o.seen = e), (o.n = Math.min(a, e.length)));
      } else {
        let e = typeof n.n == `number` && Number.isFinite(n.n) ? n.n : 0;
        o.n = Math.max(0, Math.min(a, h(e)));
      }
      t[e].slots.push(o);
    }
  }
  return (
    (t.rerollDay = p(i.rerollDay)),
    (t.streak = { n: p(i.streak?.n), day: p(i.streak?.day) }),
    (t.stars = p(i.stars)),
    t
  );
}
var h = (e) => Math.round(e * 10) / 10,
  g = 864e5,
  _ = (e) => Math.floor(e / g),
  v = (e, t) => (e === `daily` ? (t + 1) * g : ((t + 1) * 7 + 4) * g),
  y = { daily: 1, weekly: 3 },
  b = { daily: { xp: 400, stars: 2 }, weekly: { xp: 1e3, stars: 5 } },
  x = (e, t) => (e.streak.day >= t - 1 ? e.streak.n : 0),
  S = (e) => e.n >= e.goal,
  C = (e) => !e.crate && e.slots.length > 0 && e.slots.every((e) => e.claimed);
function w(e) {
  let t = 0;
  for (let r of n) {
    for (let n of e[r].slots) !n.claimed && S(n) && t++;
    C(e[r]) && t++;
  }
  return t;
}
var T = (e) => e.toLocaleString(`en-US`);
function E(e, t) {
  if (t === 1 && e.one) return e.one;
  let n = T(t);
  return e.text
    .replace(/\ba \{n\}/, /^(8|1[18](\D|$))/.test(n) ? `an ${n}` : `a ${n}`)
    .replace(`{n}`, n);
}
function D(e, t) {
  return `${e.short} ${O(e, t)}`;
}
function O(e, t) {
  let n = Math.min(t.n, t.goal);
  return `${k(Math.floor(n))}/${k(t.goal)}${e.unit ? ` ${e.unit}` : ``}`;
}
function k(e) {
  return e >= 1e6
    ? `${+(e / 1e6).toFixed(1)}M`
    : e >= 1e4
      ? `${+(e / 1e3).toFixed(e >= 1e5 ? 0 : 1)}k`
      : T(e);
}
var A = [
    { at: 10, xp: 750 },
    { at: 60, xp: 1e3 },
    { at: 140, xp: 1500 },
    { at: 230, xp: 2e3 },
    { at: 340, xp: 2500 },
  ],
  j = 400,
  M = 50,
  N = 2500;
function P(e) {
  return e
    ? e.kind === `stars`
      ? e.n
      : e.kind === `any`
        ? Math.max(0, ...e.of.map(P))
        : 0
    : 0;
}
var F = t.map((e) => ({ at: P(e.unlock), pro: e.id })).filter((e) => e.at > 0);
function I(e) {
  let t = [...F, ...A].filter((t) => t.at <= e);
  for (let n = 450; n <= e; n += M) t.push({ at: n, xp: N });
  return t.sort((e, t) => e.at - t.at || (e.pro === void 0 ? 1 : -1));
}
function L(e) {
  return I(Math.max(e + M, 450)).find((t) => t.at > e);
}
var R = Math.max(j, ...F.map((e) => e.at));
export {
  I as _,
  w as a,
  S as c,
  E as d,
  f,
  O as g,
  v as h,
  y as i,
  u as l,
  m,
  b as n,
  C as o,
  L as p,
  R as r,
  _ as s,
  n as t,
  D as u,
  x as v,
};
