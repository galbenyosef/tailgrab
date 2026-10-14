// assets__skaters-pUdq6stw 01 — kind
// Lines 1-46 of readable/assets__skaters-pUdq6stw.pretty.js (statement-aligned).
import {
  A as e,
  B as t,
  C as n,
  D as r,
  E as i,
  F as a,
  G as ee,
  H as o,
  I as s,
  L as c,
  M as l,
  N as u,
  O as d,
  P as f,
  Q as p,
  R as m,
  S as te,
  T as h,
  U as g,
  V as _,
  W as v,
  Y as ne,
  b as y,
  j as b,
  k as x,
  nt as S,
  ut as C,
  w,
  x as T,
  z as re,
} from "./table-W1plLavt.js";
import { a as ie, n as ae } from "./types-DM-HODfo.js";
var E = (e, t, n, r) => ({ trick: e, d1: t, d2: n, btn: r }),
  { U: D, D: O, L: k, R: A } = ie,
  { FLIP: j, GRAB: M, GRIND: N } = ae,
  P = (e) => ({
    kind: `any`,
    of: [{ kind: `starter` }, { kind: `xp`, level: e }, { kind: `ad` }],
  }),
  F = (e) => ({ kind: `any`, of: [{ kind: `stars`, n: e }, { kind: `ad` }] }),
  I = { hair: `#8A5A3C`, acc: `#FFD21F` };
function L(e) {
  let t = { ...I, sole: S(e.look.c.shoes), ...e.look.c };
  return { ...e, look: { ...e.look, head: e.species, stance: e.stance, c: t } };
}
