// assets/ground-ufcYH9Hx 01 — math
// Lines 1-102 of readable/assets/ground-ufcYH9Hx.pretty.js (statement-aligned).
import {
  Ft as e,
  Gn as t,
  Kn as n,
  V as r,
  xt as i,
} from "./three.core-DVWDmH0S.js";
import { a, i as patchToon } from "./toon-CycGToy9.js";
import { i as s, k as c } from "./preload-helper-DR1MrGPZ.js";
import "./scene-DiAs2bfK.js";
import { a as l, r as u } from "./palette-DQTkVEn_.js";
var d = 0.45,
  f = 260;
function p(e) {
  let t = null;
  for (let n of e.pieces) {
    if (n.kind !== `floor`) continue;
    let e = {
      x0: n.x - n.w / 2,
      x1: n.x + n.w / 2,
      z0: n.z - n.d / 2,
      z1: n.z + n.d / 2,
    };
    t = t
      ? {
          x0: Math.min(t.x0, e.x0),
          x1: Math.max(t.x1, e.x1),
          z0: Math.min(t.z0, e.z0),
          z1: Math.max(t.z1, e.z1),
        }
      : e;
  }
  return t;
}
var m = (e, t) => patchToon(a({ color: e }), { rim: 0, kind: t });
function h(e, t, n, r, i) {
  return (
    i.moveTo(e, -n),
    i.lineTo(t, -n),
    i.lineTo(t, -r),
    i.lineTo(e, -r),
    i.closePath(),
    i
  );
}
function g(a) {
  let o = a.pieces.find((e) => e.kind === `terrain`);
  if (o?.kind === `terrain`) return _(o.rect, c(a));
  let f = p(a);
  if (!f) return null;
  let g = new r();
  g.name = `ground`;
  let v = h(f.x0 - 38, f.x1 + 38, f.z0 - 38, f.z1 + 38, new t());
  v.holes.push(h(f.x0 - d, f.x1 + d, f.z0 - d, f.z1 + d, new e()));
  let y = new i(
    new n(v, 48).rotateX(-Math.PI / 2).translate(0, s, 0),
    m(l.grass, u.GRASS),
  );
  ((y.receiveShadow = !0), (y.userData.noOutline = !0));
  let b = h(f.x0 - d, f.x1 + d, f.z0 - d, f.z1 + d, new t());
  b.holes.push(h(f.x0, f.x1, f.z0, f.z1, new e()));
  let x = new i(
    new n(b).rotateX(-Math.PI / 2).translate(0, -0.005, 0),
    m(l.concreteDark, u.CONCRETE),
  );
  return ((x.receiveShadow = !0), (x.userData.noOutline = !0), g.add(y, x), g);
}
function _(a, o) {
  let s = 1 / 0;
  for (let e = 0; e <= 1; e += 1 / 64)
    s = Math.min(
      s,
      o.y(a.x0 + (a.x1 - a.x0) * e, a.z0),
      o.y(a.x0 + (a.x1 - a.x0) * e, a.z1),
      o.y(a.x0, a.z0 + (a.z1 - a.z0) * e),
      o.y(a.x1, a.z0 + (a.z1 - a.z0) * e),
    );
  let c = new r();
  c.name = `ground`;
  let d = new t();
  (d.absarc(
    (a.x0 + a.x1) / 2,
    -(a.z0 + a.z1) / 2,
    f + Math.max(a.x1 - a.x0, a.z1 - a.z0) / 2,
    0,
    Math.PI * 2,
    !1,
  ),
    d.holes.push(h(a.x0, a.x1, a.z0, a.z1, new e())));
  let p = new i(
    new n(d, 48).rotateX(-Math.PI / 2).translate(0, s - 0.5, 0),
    m(l.grass, u.GRASS),
  );
  return ((p.receiveShadow = !0), (p.userData.noOutline = !0), c.add(p), c);
}
function v(e) {
  (e.removeFromParent(),
    e.traverse((e) => {
      let t = e;
      t.isMesh && (t.geometry.dispose(), t.material.dispose());
    }));
}
