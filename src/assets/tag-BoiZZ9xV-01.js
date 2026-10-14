// assets/tag-BoiZZ9xV 01 — append
// Lines 1-82 of readable/assets/tag-BoiZZ9xV.pretty.js (statement-aligned).
import {
  $ as e,
  A as t,
  E as n,
  K as r,
  V as i,
  X as a,
  a as o,
  c as s,
  d as c,
  dn as l,
  f as u,
  g as d,
  h as f,
  i as p,
  k as m,
  l as h,
  ln as g,
  m as _,
  mn as v,
  n as y,
  o as b,
  ot as ee,
  p as x,
  q as te,
  r as S,
  s as C,
  t as w,
  u as T,
  v as E,
  w as D,
} from "./tagPaint-BOEtbgNi.js";
import { N as O, a as k, l as ne, r as re, w as ie } from "./juice-6UyTKeka.js";
import { a as ae, o as A, t as j } from "./sfx-6jovSU2-.js";
import {
  C as oe,
  E as se,
  P as ce,
  S as le,
  _ as ue,
  r as M,
  u as de,
  y as fe,
} from "./padNav-a65kF6ol.js";
import { c as pe, i as me, p as he, r as N } from "./skaters-pUdq6stw.js";
var keyRows = [`1234567890`, `QWERTYUIOP`, `ASDFGHJKL-`, `ZXCVBNM.'`];
function ge(e) {
  let t = n(`div`, `pg`),
    r = (e, t, r, i = e) => {
      let a = n(`button`, `pg-k ${t}`, e);
      return (
        (a.type = `button`),
        a.setAttribute(`aria-label`, i),
        a.addEventListener(`click`, () => {
          (m(a, `hit`), r());
        }),
        a
      );
    };
  keyRows.forEach((i, a) => {
    let o = n(`div`, `pg-row`);
    for (let t of i) o.append(r(t, ``, () => e.onChar(t)));
    if (a === keyRows.length - 1) {
      let t = r(`DEL`, `del`, e.onDel, `Delete`);
      (Object.assign(t.dataset, { pad: `b`, padLabel: `Delete` }), o.append(t));
    }
    t.append(o);
  });
  let i = r(`ROLL`, `roll`, e.onRoll, `Roll a name`);
  Object.assign(i.dataset, { pad: `y`, padLabel: `Roll` });
  let a = r(`DONE`, `done`, e.onDone);
  return (
    Object.assign(a.dataset, { pad: `start`, padLabel: `Tag it` }),
    t.append(n(`div`, `pg-row`)),
    t.lastElementChild.append(
      i,
      r(`SPACE`, `space`, () => e.onChar(` `), `Space`),
      a,
    ),
    t
  );
}
