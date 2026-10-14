// assets__catalog-CGuOpeY8 01 — label
// Lines 1-123 of readable/assets__catalog-CGuOpeY8.pretty.js (statement-aligned).
import { v as e } from "./preload-helper-DR1MrGPZ.js";
import { D as t, T as n } from "./prims-CECOBLSv.js";
import { o as r } from "./compose-C1tLg9l9.js";
import "./secrets-Czes5esN.js";
var i = [
    { id: `ramps`, label: `Ramps`, piece: `quarter` },
    { id: `street`, label: `Street`, piece: `stairs` },
    { id: `rails`, label: `Rails`, piece: `downrail` },
    { id: `levels`, label: `Levels`, piece: `platform` },
    { id: `pools`, label: `Pools`, piece: `kidney` },
    { id: `props`, label: `Props`, piece: `bench` },
  ],
  a = { x: { dir: `x` }, y: { dir: `up` }, z: { dir: `z` } },
  o = [
    `concrete`,
    `concreteDark`,
    `wood`,
    `woodSide`,
    `metal`,
    `brick`,
    `grass`,
    `bubblegum`,
    `mint`,
    `lemon`,
    `peach`,
    `lilac`,
    `coral`,
    `sky`,
  ],
  s = [
    `concrete`,
    `concreteDark`,
    `wood`,
    `brick`,
    `grass`,
    `sky`,
    `mint`,
    `peach`,
  ],
  c = Math.PI,
  l = c / 4,
  u = (e, t, n, r, i = 0.1) => ({ key: e, label: t, min: n, max: r, step: i }),
  d = (e, t, n = ``) => ({
    x: e.split(` `),
    y: t.split(` `),
    z: n ? n.split(` `) : [],
  });
function f(r, i, a, o = !0) {
  let s = e(r),
    c = n(t(s)),
    l = Math.min(
      ...s.segs.map((e) => (e.type === `arc` && e.da > 0 ? e.R : 1 / 0)),
    ),
    u = (e) => Math.ceil((e + 0.65) * 2) / 2,
    d = 2 * u(Math.max(-c.x0, c.x1)),
    f = 2 * u(Math.max(-c.z0, c.z1));
  return {
    kind: `bowl`,
    shape: r,
    h: i,
    r: Math.min(i, 2.4, l - 1),
    w: d,
    d: f,
    sunk: o,
    tileSkin: a === `mint` ? `sky` : `mint`,
    deckSkin: `concrete`,
  };
}
function p(e, t) {
  let n = t / Math.ceil(t / 6),
    r = e < 2.5;
  return {
    every: n,
    from: n / 2,
    u: r ? [0] : [-(e / 2 - 0.5), e / 2 - 0.5],
    size: r ? 0.5 : 0.8,
  };
}
var m = { type: `railing`, h: 1.1 };
function h(e, t, n, i) {
  let {
    id: a,
    x: o,
    y: s,
    z: c,
    rot: l,
    ground: u,
    name: d,
    skin: f,
    ...m
  } = r(0, {
    x: 0,
    z: 0,
    y: 0,
    w: e,
    d: t,
    t: i.t,
    nx: i.nx,
    px: i.px,
    nz: i.ends,
    pz: i.ends,
    pillars: i.pillars === !1 ? void 0 : p(e, t),
    skin: n,
    topSkin: n,
  });
  return m;
}
function g(e, t, n, r, i = !1) {
  return {
    knobs: [u(`s`, `Size`, 0.8, 1.4, 0.05)],
    axes: d(`s`, `s`),
    build: (a) => ({
      kind: `prop`,
      prop: e,
      w: F(t * a.s),
      d: F(n * a.s),
      h: F(r * a.s),
      s: a.s,
      ...(i ? { grind: i } : {}),
    }),
    tag: !1,
  };
}
