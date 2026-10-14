// assets__fxHooks-Cvx_8YWC 01 — math
// Lines 1-102 of readable/assets__fxHooks-Cvx_8YWC.pretty.js (statement-aligned).
const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      "assets/music-D6fpJLig.js",
      "assets/sfx-6jovSU2-.js",
      "assets/prims-CECOBLSv.js",
      "assets/dmath-_BI8hNwF.js",
      "assets/songs-B3nWAdc6.js",
    ]),
) => i.map((i) => d[i]);
import {
  A as e,
  G as t,
  Gn as n,
  In as r,
  K as i,
  Kn as a,
  Pn as o,
  Rt as s,
  S as c,
  St as l,
  V as u,
  Vn as d,
  Wn as f,
  Zn as p,
  ar as m,
  bt as h,
  c as g,
  d as _,
  er as v,
  et as ee,
  h as y,
  l as te,
  p as b,
  st as ne,
  tr as re,
  vr as ie,
  xt as x,
  yr as S,
} from "./three.core-DVWDmH0S.js";
import { a as ae } from "./toon-CycGToy9.js";
import { t as oe } from "./preload-helper-DR1MrGPZ.js";
import { J as se, Ot as ce } from "./tuning-D4mSK766.js";
import { n as C } from "./palette-DQTkVEn_.js";
import { t as le } from "./outline-BufNikL2.js";
import { K as w, c as T } from "./table-W1plLavt.js";
import {
  c as E,
  d as ue,
  g as de,
  l as fe,
  o as D,
  s as pe,
} from "./types-DM-HODfo.js";
import {
  A as me,
  C as O,
  Dt as he,
  E as k,
  J as ge,
  K as _e,
  Pt as ve,
  Tt as A,
  at as j,
  k as ye,
  v as be,
  zt as xe,
} from "./tagPaint-BOEtbgNi.js";
import { p as Se, r as Ce } from "./juice-6UyTKeka.js";
import { r as we } from "./secrets-Czes5esN.js";
import { a as Te, o as M, t as N } from "./sfx-6jovSU2-.js";
import { l as Ee, n as De, u as Oe } from "./skaters-pUdq6stw.js";
import { u as P } from "./session-DxCN6jDh.js";
import { n as ke } from "./verlet-BVVzuOqv.js";
import { c as Ae, m as je, p as Me } from "./bailPhysics-C1H0uy1H.js";
var F = 1200,
  Ne = new Map(),
  Pe = (e) => {
    let t = Ne.get(e);
    return (t || Ne.set(e, (t = new y(e))), t);
  },
  Fe = 16;
function Ie(e, t, n, r, i, a) {
  let o = Math.hypot(i.ux, i.uy, i.uz) || 1,
    s = i.ux / o,
    c = i.uy / o,
    l = i.uz / o,
    u = e[r],
    d = t[r],
    f = n[r],
    p = Math.cos(a),
    m = Math.sin(a),
    h = (s * u + c * d + l * f) * (1 - p),
    g = c * f - l * d,
    _ = l * u - s * f,
    v = s * d - c * u;
  ((e[r] = u * p + g * m + s * h),
    (t[r] = d * p + _ * m + c * h),
    (n[r] = f * p + v * m + l * h));
}
