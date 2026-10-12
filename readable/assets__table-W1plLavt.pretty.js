var e = (e) => ({ kind: `shop`, price: e }),
  t = (e, t) => ({
    kind: `any`,
    of: [
      { kind: `career`, level: e },
      { kind: `shop`, price: t },
    ],
  }),
  n = e(400),
  r = [
    { id: `hawk`, name: `Hawk` },
    { id: `duck`, name: `Duck`, unlock: n },
    { id: `axolotl`, name: `Axolotl` },
    { id: `muskrat`, name: `Muskrat` },
    { id: `fox`, name: `Fox`, unlock: n },
    { id: `wolf`, name: `Wolf`, unlock: n },
    { id: `koala`, name: `Koala`, unlock: n },
    { id: `pony`, name: `Pony`, unlock: n },
    { id: `camel`, name: `Camel`, unlock: n },
    { id: `otter`, name: `Otter` },
    { id: `glider`, name: `Glider`, unlock: n },
    { id: `cat`, name: `Cat`, unlock: n },
    { id: `seal`, name: `Seal`, unlock: n },
    { id: `goat`, name: `Goat`, unlock: n },
    { id: `toad`, name: `Toad`, unlock: n },
    { id: `puffin`, name: `Puffin`, unlock: n },
    { id: `bear`, name: `Bear`, unlock: n },
    { id: `giraffe`, name: `Giraffe`, unlock: n },
    { id: `hare`, name: `Hare`, unlock: n },
    { id: `shrew`, name: `Shrew`, unlock: n },
    { id: `goose`, name: `Goose`, unlock: n },
    { id: `collie`, name: `Collie`, unlock: n },
    { id: `sagui`, name: `Sagui`, unlock: n, secret: `saci` },
    { id: `tamarin`, name: `Tamarin`, unlock: n, secret: `curupira` },
    { id: `alien`, name: `Alien`, unlock: n, secret: `varginha` },
    { id: `yeti`, name: `Yeti`, unlock: n, secret: `abominollie` },
    { id: `spider`, name: `Spider`, unlock: n, secret: `itsy` },
    { id: `bat`, name: `Bat`, unlock: n, secret: `grindula` },
    { id: `hyena`, name: `Hyena`, unlock: n, secret: `jester` },
    { id: `chupa`, name: `Chupa`, unlock: n, secret: `chupacabra` },
    { id: `ranger`, name: `Ranger`, unlock: n, secret: `sentai` },
  ],
  i = [
    { id: `tee`, name: `Tee` },
    { id: `hoodie`, name: `Hoodie`, unlock: e(160) },
    { id: `tank`, name: `Tank Top`, unlock: e(100) },
    { id: `longsleeve`, name: `Long Sleeve`, unlock: e(220) },
    { id: `dress`, name: `Fairy Dress`, unlock: e(360) },
    { id: `bare`, name: `No Shirt`, unlock: e(150), secret: `varginha` },
    { id: `suit`, name: `Ranger Suit`, unlock: e(600), secret: `sentai` },
  ],
  a = [
    { id: `shorts`, name: `Shorts` },
    { id: `pants`, name: `Pants`, unlock: e(100) },
    { id: `baggies`, name: `Baggies`, unlock: e(140) },
    { id: `boots`, name: `Ranger Boots`, unlock: e(400), secret: `sentai` },
  ],
  o = [
    { id: `none`, name: `No Hat` },
    { id: `cap`, name: `Cap`, unlock: e(120) },
    { id: `cap-back`, name: `Backwards Cap`, unlock: e(120) },
    { id: `beanie`, name: `Beanie`, unlock: e(120) },
    { id: `beanie-pom`, name: `Pompom Beanie`, unlock: e(140) },
    { id: `docker`, name: `Docker Beanie`, unlock: e(80) },
    { id: `docker-pom`, name: `Docker Pompom`, unlock: e(140) },
    { id: `helmet`, name: `Helmet`, unlock: e(160) },
    { id: `headband`, name: `Headband`, unlock: e(160) },
    { id: `bucket`, name: `Bucket Hat`, unlock: e(60) },
    { id: `visor`, name: `Visor`, unlock: e(260) },
    { id: `bandana`, name: `Bandana`, unlock: e(240) },
    { id: `aviator`, name: `Aviator Cap`, unlock: t(`hangar`, 400) },
    { id: `hardhat`, name: `Hard Hat`, unlock: t(`bridge`, 400) },
    { id: `crown`, name: `Crown`, unlock: e(900) },
    { id: `propeller`, name: `Propeller Beanie`, unlock: e(500) },
    { id: `party`, name: `Party Hat`, unlock: e(300) },
    { id: `carapuca`, name: `Carapuça`, unlock: e(700), secret: `saci` },
    { id: `jester-cap`, name: `Jester Cap`, unlock: e(700), secret: `jester` },
  ],
  s = [
    { id: `none`, name: `Nothing` },
    { id: `boombox`, name: `Boombox`, unlock: e(240) },
    { id: `backpack`, name: `Backpack`, unlock: e(180) },
    { id: `wings`, name: `Fairy Wings`, unlock: e(400) },
    { id: `surfboard`, name: `Surfboard`, unlock: t(`beach`, 400) },
    { id: `cape`, name: `Cape`, unlock: e(600) },
    { id: `balloon`, name: `Balloon`, unlock: e(300) },
    { id: `spare-deck`, name: `Spare Deck`, unlock: e(500) },
    { id: `mini-ufo`, name: `Mini UFO`, unlock: e(800), secret: `varginha` },
    { id: `spider-legs`, name: `Spider Legs`, unlock: e(800), secret: `itsy` },
  ],
  c = { head: r, top: i, bottom: a, hat: o, acc: s },
  l = new Set([`hoodie`, `longsleeve`, `suit`]),
  u = new Set([`boots`]);
function d(e, t) {
  return c[e].find((e) => e.id === t);
}
var f = [
    { id: `FF3D7F`, name: `Bubblegum` },
    { id: `FF5A36`, name: `Tomato` },
    { id: `FF8A1F`, name: `Tangerine` },
    { id: `FFD21F`, name: `Lemon` },
    { id: `2FD67B`, name: `Lime` },
    { id: `1FC7E8`, name: `Pool` },
    { id: `4F6BFF`, name: `Blueberry` },
    { id: `A55BFF`, name: `Grape` },
    { id: `FF8FB8`, name: `Candy` },
    { id: `FF7A7A`, name: `Coral` },
    { id: `FFB38A`, name: `Peach` },
    { id: `FFE27A`, name: `Butter` },
    { id: `9BE08C`, name: `Pistachio` },
    { id: `7FE3C4`, name: `Seafoam` },
    { id: `8FD3F5`, name: `Sky` },
    { id: `B9A4FF`, name: `Lilac` },
    { id: `FFB3C7`, name: `Blush` },
    { id: `E6BD7B`, name: `Honey` },
    { id: `D9B48F`, name: `Sand` },
    { id: `B9804F`, name: `Caramel` },
    { id: `FF8A3D`, name: `Pumpkin` },
    { id: `8A5A3C`, name: `Cocoa` },
    { id: `7A5236`, name: `Walnut` },
    { id: `5C4033`, name: `Espresso` },
    { id: `FFFFFF`, name: `White` },
    { id: `FFF4E0`, name: `Cream` },
    { id: `F7E1C8`, name: `Biscuit` },
    { id: `E8ECF7`, name: `Cloud` },
    { id: `C9D6F2`, name: `Periwinkle` },
    { id: `A3A9B8`, name: `Pebble` },
    { id: `8E97B2`, name: `Slate` },
    { id: `6B6F80`, name: `Graphite` },
    { id: `3B3349`, name: `Plum` },
    { id: `23304A`, name: `Navy` },
    { id: `1D1A3A`, name: `Midnight` },
    { id: `3B2C4F`, name: `Aubergine` },
  ],
  p = {
    head: [`fur`, `accent`, `hair`],
    top: [`top`],
    bottom: [`bottom`, `shoes`, `sole`],
    hat: [`hat`],
    acc: [`acc`],
    riding: [`deck0`, `deck1`],
  },
  m = Object.keys(p);
function h(e) {
  return m.find((t) => p[t].includes(e));
}
var g = [`FFFFFF`, `A3A9B8`, `6B6F80`, `1D1A3A`, `23304A`, `D9B48F`, `8A5A3C`],
  _ = {
    head: new Set([
      `F7E1C8`,
      `FFB38A`,
      `E6BD7B`,
      `D9B48F`,
      `B9804F`,
      `8A5A3C`,
      `7A5236`,
      `5C4033`,
    ]),
    top: new Set(g),
    bottom: new Set(g),
    hat: new Set(g),
    acc: new Set(g),
    riding: new Set(g),
  },
  v = (e, t) => `color:${e}:${t}`;
function ee(e) {
  let [t, n, r] = e.split(`:`);
  return t === `color` && n in p && y(r ?? ``) ? { tab: n, id: r } : null;
}
f.map((e) => `#${e.id}`);
function y(e) {
  let t = e.replace(`#`, ``).toUpperCase();
  return f.find((e) => e.id === t);
}
var b = [
    `fur`,
    `accent`,
    `hair`,
    `top`,
    `bottom`,
    `shoes`,
    `hat`,
    `acc`,
    `deck0`,
    `deck1`,
    `sole`,
  ],
  x = {
    head: `hawk`,
    top: `tee`,
    bottom: `shorts`,
    hat: `none`,
    acc: `none`,
    stance: `regular`,
    c: {
      fur: `#B9804F`,
      accent: `#F7E1C8`,
      hair: `#8A5A3C`,
      top: `#FFFFFF`,
      bottom: `#23304A`,
      shoes: `#FFFFFF`,
      hat: `#1D1A3A`,
      acc: `#6B6F80`,
      deck0: `#1D1A3A`,
      deck1: `#FFFFFF`,
      sole: `#D9B48F`,
    },
  };
function S(e) {
  let t = parseInt(e.slice(1), 16);
  return (0.2126 * ((t >> 16) & 255) +
    0.7152 * ((t >> 8) & 255) +
    0.0722 * (t & 255)) /
    255 <
    0.8
    ? `#FFFFFF`
    : `#B9A4FF`;
}
var C = `2`,
  te = new Map([
    [`1`, b.indexOf(`sole`)],
    [C, b.length],
  ]),
  ne = /^#?([0-9a-fA-F]{6})$/;
function re(e) {
  let t = typeof e == `string` ? ne.exec(e) : null;
  return t ? `#${t[1].toUpperCase()}` : null;
}
function w(e) {
  return `${C}:${[e.head, e.top, e.bottom, e.hat, e.acc, e.stance === `goofy` ? `g` : `r`].join(`.`)}.${b.map((t) => e.c[t].slice(1)).join(``)}`;
}
var T = (e, t, n) => (e.some((e) => e.id === t) ? t : n);
function E(e) {
  if (typeof e != `string` || e.length > 160) return null;
  let t = e.indexOf(`:`),
    n = t > 0 ? te.get(e.slice(0, t)) : void 0;
  if (n === void 0) return null;
  let c = e.slice(t + 1).split(`.`);
  if (c.length !== 7) return null;
  let [l, u, d, f, p, m, h] = c;
  if (
    (m !== `r` && m !== `g`) ||
    !/^[0-9a-fA-F]*$/.test(h) ||
    h.length !== n * 6
  )
    return null;
  let g = x,
    _ = {};
  return (
    b.forEach((e, t) => {
      _[e] = re(h.slice(t * 6, t * 6 + 6)) ?? g.c[e];
    }),
    n < b.length && (_.sole = S(_.shoes)),
    {
      head: T(r, l, g.head),
      top: T(i, u, g.top),
      bottom: T(a, d, g.bottom),
      hat: T(o, f, g.hat),
      acc: T(s, p, g.acc),
      stance: m === `g` ? `goofy` : `regular`,
      c: _,
    }
  );
}
var D = w;
function ie(e) {
  return { ...e, c: { ...e.c } };
}
function ae(e, t) {
  return (
    e.head === t.head &&
    e.top === t.top &&
    e.bottom === t.bottom &&
    e.hat === t.hat &&
    e.acc === t.acc
  );
}
var O = {
    NONE: 0,
    FLIP: 1,
    GRAB: 2,
    GRIND: 3,
    SLIDE: 4,
    MANUAL: 5,
    LIP: 6,
    SPECIAL_AIR: 7,
    SPECIAL_GRIND: 8,
    SPIN: 9,
    WALLRIDE: 10,
    GAP: 11,
    SPECIAL_MANUAL: 12,
    TRANSFER: 13,
    REVERT: 14,
    PIVOT: 15,
  },
  k = [];
function A(e, t, n, r, i, a, o = {}) {
  let s = k.length;
  return (
    k.push({
      id: s,
      name: e,
      kind: t,
      base: n,
      ticks: r,
      perTick: i,
      clip: a,
      ...o,
    }),
    s
  );
}
A(``, O.NONE, 0, 0, 0, ``);
var j = A(`Kickflip`, O.FLIP, 100, 12, 0, `flip-kick`),
  M = A(`Heelflip`, O.FLIP, 100, 12, 0, `flip-heel`),
  N = A(`Pop Shove-It`, O.FLIP, 100, 10, 0, `flip-shove`),
  P = A(`Impossible`, O.FLIP, 200, 14, 0, `flip-impossible`),
  F = A(`Hardflip`, O.FLIP, 300, 14, 0, `flip-hard`),
  I = A(`Varial Heelflip`, O.FLIP, 300, 14, 0, `flip-varial-heel`),
  L = A(`Varial Kickflip`, O.FLIP, 300, 14, 0, `flip-varial-kick`),
  R = A(`360 Shove-It`, O.FLIP, 200, 13, 0, `flip-shove`),
  z = A(`Double Kickflip`, O.FLIP, 300, 19, 0, `flip-kick`),
  B = A(`Double Heelflip`, O.FLIP, 300, 19, 0, `flip-heel`),
  V = A(`Double Impossible`, O.FLIP, 450, 21, 0, `flip-impossible`),
  H = A(`540 Shove-It`, O.FLIP, 400, 18, 0, `flip-shove`),
  U = A(`Nosegrab`, O.GRAB, 200, 4, 10, `grab-nose`),
  W = A(`Tailgrab`, O.GRAB, 200, 4, 10, `grab-tail`),
  G = A(`Indy`, O.GRAB, 250, 4, 12, `grab-indy`),
  K = A(`Melon`, O.GRAB, 250, 4, 12, `grab-melon`),
  q = A(`Method`, O.GRAB, 300, 5, 14, `grab-method`),
  J = A(`Stalefish`, O.GRAB, 300, 5, 14, `grab-stalefish`),
  oe = A(`Benihana`, O.GRAB, 350, 5, 14, `grab-benihana`),
  se = A(`Crail Grab`, O.GRAB, 300, 5, 14, `grab-crail`),
  ce = A(`Airwalk`, O.GRAB, 400, 6, 16, `grab-airwalk`),
  le = A(`50-50`, O.GRIND, 100, 0, 12, `grind-5050`),
  ue = A(`Nosegrind`, O.GRIND, 150, 0, 14, `grind-nose`),
  de = A(`5-0`, O.GRIND, 150, 0, 14, `grind-50`),
  fe = A(`Smith`, O.GRIND, 200, 0, 16, `grind-smith`),
  pe = A(`Feeble`, O.GRIND, 200, 0, 16, `grind-feeble`),
  me = A(`Crooked`, O.GRIND, 200, 0, 16, `grind-crooked`),
  he = A(`Overcrook`, O.GRIND, 250, 0, 18, `grind-overcrook`),
  ge = A(`Salad`, O.GRIND, 200, 0, 16, `grind-salad`),
  _e = A(`Suski`, O.GRIND, 250, 0, 18, `grind-suski`),
  Y = A(`Boardslide`, O.SLIDE, 150, 0, 14, `slide-board`),
  ve = A(`Lipslide`, O.SLIDE, 200, 0, 16, `slide-lip`),
  X = A(`Noseslide`, O.SLIDE, 200, 0, 16, `slide-nose`),
  Z = A(`Tailslide`, O.SLIDE, 200, 0, 16, `slide-tail`),
  Q = A(`Bluntslide`, O.SLIDE, 250, 0, 18, `slide-blunt`),
  ye = A(`Manual`, O.MANUAL, 100, 0, 10, `manual`),
  be = A(`Nose Manual`, O.MANUAL, 150, 0, 12, `manual-nose`, { nose: !0 }),
  xe = A(`Axle Stall`, O.LIP, 250, 0, 20, `lip-axle`),
  Se = A(`Rock to Fakie`, O.LIP, 250, 0, 20, `lip-rock`, { fakieOut: !0 }),
  Ce = A(`Handplant`, O.LIP, 400, 0, 24, `lip-handplant`),
  we = A(`Disaster`, O.LIP, 300, 0, 22, `lip-disaster`),
  Te = A(`Spin`, O.SPIN, 100, 0, 0, ``),
  Ee = A(`Wallride`, O.WALLRIDE, 250, 0, 12, `wallride`),
  De = A(`The 900 Squawk`, O.SPECIAL_AIR, 3e3, 40, 0, `special-spin-900`, {
    spinHalves: 5,
  }),
  Oe = A(`Webfoot Smith`, O.SPECIAL_GRIND, 1500, 0, 40, `grind-smith`),
  ke = A(`Mullet Casper`, O.SPECIAL_MANUAL, 1200, 0, 40, `manual-nose`, {
    nose: !0,
  }),
  Ae = A(`Boombox Grind`, O.SPECIAL_GRIND, 1500, 0, 40, `grind-5050`),
  je = A(`Tailwhip Rocket`, O.SPECIAL_AIR, 2e3, 30, 0, `special-flip-tailwhip`),
  Me = A(`Full Moon Darkslide`, O.SPECIAL_GRIND, 1800, 0, 45, `slide-board`),
  Ne = A(
    `Gum Tree Hardflip`,
    O.SPECIAL_AIR,
    2e3,
    32,
    0,
    `special-flip-gumtree`,
  ),
  Pe = A(`Caballo-rial`, O.SPECIAL_AIR, 2200, 34, 0, `special-spin-cab`, {
    spinHalves: 2,
  }),
  Fe = A(`Hump Day Flip`, O.SPECIAL_AIR, 2e3, 30, 0, `special-flip-humpday`),
  Ie = A(`Otter Space Grind`, O.SPECIAL_GRIND, 1600, 0, 42, `grind-nose`),
  Le = A(
    `Wingsuit Madonna`,
    O.SPECIAL_AIR,
    2400,
    34,
    0,
    `special-grab-madonna`,
  ),
  Re = A(`Nine Lives Leap`, O.SPECIAL_AIR, 2500, 36, 0, `special-grab-leap`),
  ze = A(
    `Kickflip McTwist`,
    O.SPECIAL_AIR,
    2600,
    36,
    0,
    `special-spin-mctwist`,
    { spinHalves: 3 },
  ),
  Be = A(`Superman`, O.SPECIAL_AIR, 2e3, 30, 0, `special-grab`),
  Ve = A(`Catwalk Crooked`, O.SPECIAL_GRIND, 1600, 0, 42, `grind-crooked`),
  He = A(`Howling Tailslide`, O.SPECIAL_GRIND, 1700, 0, 44, `slide-tail`),
  Ue = A(`Hip Transfer`, O.TRANSFER, 300, 0, 0, ``),
  We = A(`Spine Transfer`, O.TRANSFER, 400, 0, 0, ``),
  Ge = A(
    `Fadinha Heelflip`,
    O.SPECIAL_AIR,
    2200,
    32,
    0,
    `special-flip-fadinha`,
  ),
  Ke = A(`Nollie 270 Bleat-slide`, O.SPECIAL_GRIND, 1800, 0, 45, `slide-lip`),
  qe = A(`Lily Pad Nosegrind`, O.SPECIAL_GRIND, 1700, 0, 44, `grind-nose`),
  Je = A(`Sweet Child o' Grind`, O.SPECIAL_GRIND, 1700, 0, 44, `grind-smith`),
  Ye = A(`Honey Pot 540`, O.SPECIAL_AIR, 2600, 36, 0, `special-spin-540`, {
    spinHalves: 3,
  }),
  Xe = A(
    `Tall Order Kickflip`,
    O.SPECIAL_AIR,
    2400,
    34,
    0,
    `special-flip-tallorder`,
  ),
  Ze = A(`Hare-Trigger Back Tail`, O.SPECIAL_GRIND, 1800, 0, 45, `slide-tail`),
  Qe = A(`Shrewd 720`, O.SPECIAL_AIR, 2800, 38, 0, `special-spin-720`, {
    spinHalves: 4,
  }),
  $e = A(
    `Russian Honkless`,
    O.SPECIAL_AIR,
    2400,
    34,
    0,
    `special-grab-honkless`,
  ),
  et = A(`Invert`, O.LIP, 450, 0, 26, `lip-invert`),
  tt = A(`Andrecht Invert`, O.LIP, 500, 0, 28, `lip-andrecht`),
  nt = A(`One Foot Invert`, O.LIP, 550, 0, 30, `lip-onefoot`),
  rt = A(`Nose Stall`, O.LIP, 250, 0, 20, `lip-nose`),
  it = A(`Blunt to Fakie`, O.LIP, 300, 0, 22, `lip-blunt`, { fakieOut: !0 }),
  at = A(`360 Flip`, O.FLIP, 300, 14, 0, `flip-tre`),
  ot = A(`Revert`, O.REVERT, 100, 0, 0, ``),
  st = A(`One Foot Manual`, O.MANUAL, 250, 0, 14, `manual-onefoot`),
  ct = A(`Spacewalk`, O.MANUAL, 300, 0, 16, `manual-spacewalk`),
  lt = A(`Truckstand`, O.MANUAL, 300, 0, 16, `manual-truckstand`),
  ut = A(`One Foot Nose Manual`, O.MANUAL, 300, 0, 16, `manual-nose-onefoot`, {
    nose: !0,
  }),
  dt = A(`Nose Spacewalk`, O.MANUAL, 350, 0, 18, `manual-nose-spacewalk`, {
    nose: !0,
  }),
  ft = A(
    `Crossfoot Nose Manual`,
    O.MANUAL,
    300,
    0,
    16,
    `manual-nose-crossfoot`,
    { nose: !0 },
  ),
  $ = A(`Pivot`, O.PIVOT, 250, 0, 0, ``),
  pt = A(`Nose Pivot`, O.PIVOT, 250, 0, 0, ``, { nose: !0 }),
  mt = A(`Barkslide`, O.SPECIAL_GRIND, 1800, 0, 45, `slide-board`),
  ht = [j, P, I, M, R, N, L, at, F],
  gt = [W, U, J, K, se, oe, ce, G, q],
  _t = [le, ue, he, pe, _e, de, ge, fe, me],
  vt = [Y, X, X, ve, Z, Z, Q, Q, Y],
  yt = [xe, Ce, et, we, it, Se, rt, tt, nt],
  bt = { [j]: z, [M]: B, [P]: V, [R]: H };
function xt(e) {
  return !k[e]?.nose;
}
var St = [st, ct, lt],
  Ct = [ut, dt, ft];
export {
  w as $,
  Ze as A,
  Be as B,
  Ae as C,
  Me as D,
  Ve as E,
  ze as F,
  Le as G,
  je as H,
  qe as I,
  xt as J,
  k as K,
  Re as L,
  $e as M,
  He as N,
  Ge as O,
  Fe as P,
  E as Q,
  Ie as R,
  Ke as S,
  ke as T,
  Xe as U,
  Je as V,
  Oe as W,
  b as X,
  x as Y,
  ie as Z,
  vt as _,
  v as _t,
  M as a,
  a as at,
  De as b,
  O as c,
  _ as ct,
  St as d,
  p as dt,
  D as et,
  be as f,
  m as ft,
  ot as g,
  d as gt,
  $ as h,
  y as ht,
  _t as i,
  u as it,
  Ye as j,
  Ne as k,
  yt as l,
  o as lt,
  pt as m,
  i as mt,
  ht as n,
  S as nt,
  Ue as o,
  c as ot,
  Ct as p,
  l as pt,
  Ee as q,
  gt as r,
  s as rt,
  j as s,
  f as st,
  bt as t,
  ae as tt,
  ye as u,
  r as ut,
  Te as v,
  ee as vt,
  Pe as w,
  mt as x,
  We as y,
  h as yt,
  Qe as z,
};
