// assets/skaters-pUdq6stw 03 — math
// Lines 777-916 of readable/assets/skaters-pUdq6stw.pretty.js (statement-aligned).
function z(e) {
  let t = proRoster[e];
  if (!t) throw Error(`skaterDef: no pro with id ${e}`);
  return t;
}
var B = (e) => Number.isInteger(e) && e >= 0 && e < proRoster.length,
  skillStyles = [
    {
      id: 200,
      key: `vert`,
      name: `Vert`,
      blurb: `Big air, fast spins.`,
      stats: {
        air: 1.08,
        speed: 0.96,
        spin: 1.04,
        balance: 0.92,
        specials: [E(y, A, O, M), E(a, A, k, j)],
      },
    },
    {
      id: 201,
      key: `street`,
      name: `Street`,
      blurb: `Speed for the long lines.`,
      stats: {
        air: 0.96,
        speed: 1.08,
        spin: 0.96,
        balance: 1,
        specials: [E(r, k, A, N), E(o, D, O, j)],
      },
    },
    {
      id: 202,
      key: `tech`,
      name: `Tech`,
      blurb: `Steady manuals, quick flips.`,
      stats: {
        air: 0.92,
        speed: 1,
        spin: 1.04,
        balance: 1.04,
        specials: [E(h, O, D, j), E(x, D, k, j)],
      },
    },
    {
      id: 203,
      key: `allround`,
      name: `All-round`,
      blurb: `A bit of everything.`,
      stats: {
        air: 1,
        speed: 1,
        spin: 1,
        balance: 1,
        specials: [E(t, D, O, M), E(v, k, A, N)],
      },
    },
  ],
  H = (e) => Number.isInteger(e) && e >= 200 && e < 200 + skillStyles.length;
function U(e) {
  return B(e) ? proRoster[e].stats : H(e) ? skillStyles[e - 200].stats : oe;
}
var oe = { air: 1, speed: 1, spin: 1, balance: 1, specials: [] };
function W(e, t) {
  return (t ? p(t) : null) || (B(e) ? proRoster[e].look : ne);
}
var G = 0.025,
  K = { full: 10, floor: 0.88 };
function q(e) {
  return Math.max(0, Math.min(K.full - 1, K.full - Math.floor(e)));
}
function J(e) {
  return 1 - ((1 - K.floor) * Math.min(e, K.full - 1)) / (K.full - 1);
}
function Y(e, t) {
  let n = J((t >>> 16) & 15),
    r = (e, n, r) => Math.fround(e * r * (1 + G * Math.min(8, (t >> n) & 15)));
  return {
    air: r(e.air, 0, n),
    speed: r(e.speed, 4, n),
    spin: r(e.spin, 8, 1),
    balance: r(e.balance, 12, 1),
    specials: e.specials,
  };
}
var X = new Map();
function se(e, t) {
  let n = U(e);
  if (!t) return n;
  let r = (e & 255) * 1048576 + (t & 1048575),
    i = X.get(r);
  return (i || X.set(r, (i = Y(n, t))), i);
}
var ce = [
    `#FF3D7F`,
    `#FF8A1F`,
    `#FFD21F`,
    `#2FD67B`,
    `#1FC7E8`,
    `#4F6BFF`,
    `#A55BFF`,
    `#FF5A36`,
  ],
  Z =
    `Gnarly.Rad.Sketchy.Tubular.Stoked.Radical.Mellow.Sick.Epic.Wobbly.Fakie.Chill.Comet.Turbo.Goofy.Salty.Spicy.Zippy.Bonkers.Groovy.Crispy.Fuzzy.Sneaky.Cosmic.Lucky.Bouncy.Breezy.Funky.Jazzy.Rowdy.Wavy.Mighty.Hyper`.split(
      `.`,
    ),
  defaultNames = [
    `Newt`,
    `Gecko`,
    `Pigeon`,
    `Llama`,
    `Walrus`,
    `Beaver`,
    `Moose`,
    `Puffin`,
    `Raccoon`,
    `Badger`,
    `Sloth`,
    `Grom`,
    `Ripper`,
    `Rookie`,
    `Legend`,
    `Shredder`,
    `Kid`,
  ],
  $ = new Map(C.map((e) => [e.id, e.name])),
  le = new Set($.values());
function ue(e = Math.random(), t) {
  return `${Z[Math.floor(e * Z.length) % Z.length]} ${(t && $.get(t)) || defaultNames[Math.floor(e * 7919) % defaultNames.length]}`;
}
function de(e, t = Math.random) {
  return `${Z[Math.floor(t() * Z.length)]} ${(t() < 2 / 3 ? $.get(e) : defaultNames[Math.floor(t() * defaultNames.length)]) ?? defaultNames[0]}`;
}
function fe(e) {
  let [t, n, r] = e.split(` `);
  return !r && Z.includes(t) && (defaultNames.includes(n) || le.has(n));
}
