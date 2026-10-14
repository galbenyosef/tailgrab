// assets/table-W1plLavt 01 — unlock
// Lines 1-313 of readable/assets/table-W1plLavt.pretty.js (statement-aligned).
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
