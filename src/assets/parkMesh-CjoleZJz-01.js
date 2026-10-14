// assets/parkMesh-CjoleZJz 01 — kind
// Lines 1-278 of readable/assets/parkMesh-CjoleZJz.pretty.js (statement-aligned).
import {
  V as e,
  c as t,
  h as n,
  l as r,
  xt as i,
  yr as a,
} from "./three.core-DVWDmH0S.js";
import { a as toonMaterial, i as patchToon } from "./toon-CycGToy9.js";
import { f as c, l, m as u } from "./preload-helper-DR1MrGPZ.js";
import { y as d } from "./prims-CECOBLSv.js";
import { a as f, o as p } from "./palette-DQTkVEn_.js";
var m = 1024;
function h(e) {
  return e.kind === `floor` || e.kind === `terrain`;
}
function g(e) {
  return e.tag !== !1 && !h(e) && e.kind !== `wall` && e.kind !== `prop`;
}
function _(e) {
  let t = new Map();
  for (let n of e.pieces) g(n) && t.set(n.id, t.size + 1);
  return t;
}
var v = new n(),
  y = new Map();
function parkVertexAttrs(n) {
  let a = new Map(),
    d = (e) => {
      let t = a.get(e);
      return (t === void 0 && a.set(e, (t = a.size + 1)), t);
    },
    f = l(n) ? y.get(n.id) : void 0;
  l(n) &&
    (f ? y.delete(n.id) : (f = { now: new Map(), last: new Map() }),
    y.set(n.id, f),
    y.size > 4 && y.delete(y.keys().next().value));
  let p = f ? u(n) : null,
    m = p ? new Map(n.pieces.map((e, t) => [e, p[t]])) : null,
    h = new Map(),
    g = [],
    _ = c(n);
  for (let e = 0; e < _.length;) {
    let t = e;
    for (; t < _.length && _[t].piece === _[e].piece;) t++;
    let n = _[e].piece,
      r = m?.get(n),
      i = r === void 0 ? void 0 : (h.get(r) ?? f.now.get(r) ?? f.last.get(r));
    ((i ||= extrudePiece(_.slice(e, t))),
      r !== void 0 && h.set(r, i),
      g.push({ piece: n, chunk: i }),
      (e = t));
  }
  f && ((f.last = f.now), (f.now = h));
  let v = 0;
  for (let { chunk: e } of g) v += e.tagged.length;
  let b = new Float32Array(v * 3),
    S = new Float32Array(v * 3),
    C = new Float32Array(v * 3),
    w = new Float32Array(v),
    T = new Float32Array(v),
    E = 0;
  for (let { piece: e, chunk: t } of g) {
    if (
      (b.set(t.pos, E * 3),
      S.set(t.nrm, E * 3),
      C.set(t.col, E * 3),
      T.set(t.kind, E),
      t.tags)
    ) {
      let n = d(e.id);
      for (let e = 0; e < t.tagged.length; e++) t.tagged[e] && (w[E + e] = n);
    }
    E += t.tagged.length;
  }
  let D = new r();
  (D.setAttribute(`position`, new t(b, 3)),
    D.setAttribute(`normal`, new t(S, 3)),
    D.setAttribute(`color`, new t(C, 3)),
    D.setAttribute(`zone`, new t(w, 1)),
    D.setAttribute(`kind`, new t(T, 1)),
    D.computeBoundingSphere());
  let O = new i(D, patchToon(toonMaterial({ vertexColors: !0 }), { rim: 0, kind: !0 }));
  ((O.receiveShadow = !0), (O.name = `park`));
  let k = new e();
  return (k.add(O), { group: k, zoneOf: (e) => a.get(e) ?? 0 });
}
function extrudePiece(e) {
  let t = { pos: [], nrm: [], col: [], zone: [], kind: [] },
    n = !1;
  for (let { piece: r, prim: i, cos: a, sin: o, id: s } of e) {
    let e = g(r) && s === r.id;
    n ||= e;
    let c = +!!e;
    i.type === `extrude`
      ? i.render && C(t, i, r, a, o, c)
      : i.type === `mesh`
        ? i.render && w(t, i, r, a, o, c)
        : P(t, i, r, a, o, c);
  }
  return {
    pos: new Float32Array(t.pos),
    nrm: new Float32Array(t.nrm),
    col: new Float32Array(t.col),
    kind: new Float32Array(t.kind),
    tagged: new Uint8Array(t.zone),
    tags: n,
  };
}
function S(e, t, n, r, i, a, o, s, c, l, u, d, m = 1) {
  let h = t.x,
    g = t.y ?? 0,
    _ = t.z;
  (e.pos.push(h + i * n + o * r, g + a, _ - i * r + o * n),
    e.nrm.push(s * n + l * r, c, -s * r + l * n),
    v.set(f[u]).multiplyScalar(m),
    e.col.push(v.r, v.g, v.b),
    e.zone.push(d),
    e.kind.push(p[u] / 8));
}
function C(e, t, n, r, i, a) {
  let o = t.profile,
    s = o.length / 2,
    c = [],
    l = [];
  for (let e = 0; e < s; e++) {
    let t = (e + 1) % s,
      n = o[t * 2] - o[e * 2],
      r = o[t * 2 + 1] - o[e * 2 + 1],
      i = Math.sqrt(n * n + r * r) || 1;
    (c.push(r / i), l.push(-n / i));
  }
  let u = (e, n) => {
    let r = t.normals;
    if (r && (r[e * 2] !== 0 || r[e * 2 + 1] !== 0))
      return [r[e * 2], r[e * 2 + 1]];
    if (t.smooth[e]) {
      let t = (e - 1 + s) % s,
        n = c[t] + c[e],
        r = l[t] + l[e],
        i = Math.sqrt(n * n + r * r) || 1;
      return [n / i, r / i];
    }
    return [c[n], l[n]];
  };
  for (let c = 0; c < s; c++) {
    if (t.hidden[c]) continue;
    let l = (c + 1) % s,
      d = t.edgeSkin?.[c] ?? t.skin,
      [f, p] = u(c, c),
      [m, h] = u(l, c),
      g = (t, s, c, l) =>
        S(e, n, r, i, t, o[s * 2 + 1], o[s * 2], 0, l, c, d, a);
    (g(t.x0, c, f, p),
      g(t.x1, c, f, p),
      g(t.x1, l, m, h),
      g(t.x0, c, f, p),
      g(t.x1, l, m, h),
      g(t.x0, l, m, h));
  }
  if (n.kind === `floor`) return;
  let f = d(o),
    p = t.skin;
  for (let s of [0, 1]) {
    let c = s ? t.x1 : t.x0,
      l = s ? 1 : -1;
    for (let t = 0; t < f.length; t += 3) {
      let u = s ? [f[t], f[t + 2], f[t + 1]] : [f[t], f[t + 1], f[t + 2]];
      for (let t of u)
        S(e, n, r, i, c, o[t * 2 + 1], o[t * 2], l, 0, 0, p, a, 0.93);
    }
  }
}
function w(e, t, n, r, i, a) {
  let o = t.pos,
    s = t.nrm;
  for (let c = 0; c < t.tris.length; c += 3) {
    let l = t.skins[c / 3],
      u = t.shade?.[c / 3] ?? 1;
    for (let d = 0; d < 3; d++) {
      let f = t.tris[c + d] * 3;
      S(
        e,
        n,
        r,
        i,
        o[f],
        o[f + 1],
        o[f + 2],
        s[f],
        s[f + 1],
        s[f + 2],
        l,
        a,
        u,
      );
    }
  }
}
var T = new a(),
  E = new a(),
  D = new a(),
  O = new a(),
  k = new a(),
  A = new a(),
  j = new a(),
  M = new a(0, 1, 0),
  N = new a(1, 0, 0);
function P(e, t, n, r, i, a) {
  let o = t.skin,
    s = t.path,
    c = s.length / 3,
    l = !!t.closed,
    u = (e, t) => t.set(s[e * 3], s[e * 3 + 1], s[e * 3 + 2]),
    d = [];
  for (let e = 0; e < c; e++) {
    let n = l ? (e - 1 + c) % c : Math.max(0, e - 1),
      r = l ? (e + 1) % c : Math.min(c - 1, e + 1);
    (u(e, T),
      A.subVectors(T, u(n, E)),
      n === e ? A.set(0, 0, 0) : A.normalize(),
      j.subVectors(u(r, E), T),
      r === e ? j.set(0, 0, 0) : j.normalize(),
      D.addVectors(A, j).normalize());
    let i = Math.abs(D.y) < 0.9 ? M : N;
    (O.crossVectors(i, D).normalize(), k.crossVectors(D, O));
    let a = [];
    for (let e = 0; e < 8; e++) {
      let n = (e / 8) * Math.PI * 2,
        r = Math.cos(n),
        i = Math.sin(n),
        o = O.x * r + k.x * i,
        s = O.y * r + k.y * i,
        c = O.z * r + k.z * i;
      a.push(
        T.x + o * t.radius,
        T.y + s * t.radius,
        T.z + c * t.radius,
        o,
        s,
        c,
      );
    }
    d.push(a);
  }
  let f = l ? c : c - 1;
  for (let t = 0; t < f; t++) {
    let s = d[t],
      l = d[(t + 1) % c];
    for (let t = 0; t < 8; t++) {
      let c = (t + 1) % 8;
      for (let [u, d] of [
        [s, t],
        [l, c],
        [s, c],
        [s, t],
        [l, t],
        [l, c],
      ]) {
        let t = d * 6;
        S(
          e,
          n,
          r,
          i,
          u[t],
          u[t + 1],
          u[t + 2],
          u[t + 3],
          u[t + 4],
          u[t + 5],
          o,
          a,
        );
      }
    }
  }
}
