// assets/parks-C2dnYY6C 06 — plan
// Lines 3727-3916 of readable/assets/parks-C2dnYY6C.pretty.js (statement-aligned).
function it() {
  let e = C(P.x, P.z),
    t = [],
    n = e;
  for (let e = 1; e <= F.length; e++) {
    let i = r(s({ plan: F.slice(0, e) })),
      a = E(P, i.x, i.z),
      o = C(a.x, a.z);
    (t.push(o - n), (n = o));
  }
  return { y0: e, rises: t, ease: 10 };
}
var I = it(),
  ditchPark = {
    id: 3e3,
    kind: `path`,
    ...P,
    name: `The Ditch`,
    skin: `concrete`,
    tag: !1,
    path: {
      plan: F,
      grade: {
        y0: I.y0 - 2.4,
        rises: [I.rises[0], I.rises[1], I.rises[2] - 2, I.rises[3], I.rises[4]],
        ease: 6,
      },
    },
    section: {
      type: `channel`,
      w: 4,
      r: 1.8,
      lip: I,
      apron: 1.5,
      sunk: !0,
      apronSkin: `concreteDark`,
    },
  },
  L = E(P, r(s({ plan: F.slice(0, 2) })).x, r(s({ plan: F.slice(0, 2) })).z),
  ot = C(L.x, L.z) + 0.03,
  st = 2,
  ct = {
    id: 3001,
    kind: `path`,
    x: L.x - 14.5,
    y: ot,
    z: L.z,
    rot: rt / 2,
    name: `Ditch Bridge`,
    tag: !1,
    path: {
      plan: [{ line: 8.5 }, { line: 12 }, { line: 8.5 }],
      grade: { rises: [st, 0, -2], ease: 3 },
    },
    section: {
      type: `deck`,
      w: 6,
      t: 0.25,
      base: `slab`,
      edges: [
        { type: `railing`, h: 1 },
        { type: `railing`, h: 1 },
      ],
      topSkin: `concreteDark`,
    },
    ground: ot - 8,
  },
  lt = { w: 2.2, r: 1.4, lip: { y0: 2.9 }, apron: 1.2 },
  ut = {
    id: 3010,
    kind: `path`,
    x: -165,
    z: -150,
    rot: rt / 2,
    name: `Culvert Run`,
    path: { plan: [{ line: 16 }], grade: { y0: 0.4 } },
    section: { type: `channel`, ...lt },
    ends: [`cap`, `open`],
  },
  dt = {
    id: 3011,
    kind: `path`,
    ...c(ut),
    y: 0,
    name: `Culvert Pipe`,
    path: { plan: [{ line: 10 }], grade: { y0: 0.4 } },
    section: { type: `channel`, ...lt, roof: { cover: 0.5 } },
    ends: [`cap`, `cap`],
  },
  ft = {
    id: 3012,
    kind: `path`,
    ...c(dt),
    y: 0,
    name: `Culvert Run`,
    path: { plan: [{ line: 16 }], grade: { y0: 0.4 } },
    section: { type: `channel`, ...lt },
    ends: [`open`, `cap`],
  },
  pt = T(8, w.basin, 0, `concrete`);
function mt(e) {
  let t = i(s(ditchPark.path), e),
    n = a(s({ plan: F, grade: I }), e).y,
    r = E(P, t.x, t.z);
  return { x: r.x, y: n + 1, z: r.z };
}
var culvertBank = {
    id: `ditch`,
    name: `The Ditch`,
    range: [3e3, 3999],
    rect: w.ditch,
    pieces: [
      ditchPark,
      ct,
      ut,
      dt,
      ft,
      {
        id: 3020,
        kind: `wedge`,
        x: -157,
        z: -143.3,
        w: 8,
        len: 3,
        h: 2.9,
        rot: rt,
        name: `Culvert Bank`,
        skin: `concrete`,
      },
      {
        id: 3021,
        kind: `ledge`,
        x: -130,
        z: -128,
        w: 14,
        d: 0.8,
        h: 0.5,
        name: `Basin Ledge`,
        skin: `peach`,
      },
    ],
    terrain: [ee(ditchPark, 10), { f: `pad`, floor: 8, blend: 10 }],
    gaps: [
      { name: `Ditch Bridge Hop`, points: 250, from: [3001], to: [1, 3e3] },
      { name: `Culvert Gap`, points: 400, from: [3010], to: [3012] },
    ],
    spawns: [{ x: -120, y: 0, z: -135, yaw: 0 }],
    letters: [
      { x: L.x, y: ot + st + 2, z: L.z },
      { x: -140, y: 7, z: -150 },
      { x: -130, y: 1.8, z: -128 },
      mt(20),
      mt(110),
      mt(150),
    ],
    botPaths: [
      [
        { x: -169, z: -125 },
        { x: -110, z: -125 },
        { x: -110, z: -165 },
        { x: -169, z: -165 },
      ],
    ],
  },
  R = Math.PI,
  gt = T(9, w.garage, 0, `asphalt`),
  z = {
    id: 4e3,
    kind: `path`,
    x: 102,
    z: -100,
    rot: R / 2,
    name: `Spiral Ramp`,
    path: {
      plan: [{ line: 6 }, { arc: 16, turn: 6 * R }, { line: 33 }],
      grade: { rises: [0, 13.5, 0], ease: 6 },
    },
    section: {
      type: `deck`,
      w: 7,
      t: 0.5,
      topSkin: `asphalt`,
      edges: [{ type: `parapet`, h: 1, w: 0.3 }, { type: `jersey` }],
      pillars: { every: 9, u: [5.6] },
    },
  };
function B(e, t = 1.2) {
  let n = i(s(z.path), e);
  return { x: z.x + n.z, y: n.y + t, z: z.z - n.x };
}
