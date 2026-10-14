// assets/catalog-CGuOpeY8 03 — math
// Lines 1079-1206 of readable/assets/catalog-CGuOpeY8.pretty.js (statement-aligned).
function C(e) {
  return S.get(e);
}
function w(e) {
  return b[e.shape].knobs;
}
function T(e) {
  return b[e.shape].axes;
}
function E(e) {
  return { ...a, ...b[e.shape].grips };
}
function D(e) {
  return !!b[e.shape].quarterOnly;
}
function O(e) {
  return !!b[e.shape].groundOnly;
}
function k(e) {
  return !!b[e.shape].hang;
}
function A(e) {
  return b[e.shape].build({}, `concrete`, 0).kind !== `prop`;
}
var j = (e) => Math.round(e * 2) / 2;
function M(e, t, n) {
  let r = typeof t == `number` && Number.isFinite(t) ? t : n,
    i =
      e.min +
      Math.round((Math.min(e.max, Math.max(e.min, r)) - e.min) / e.step) *
        e.step;
  return Number(Math.min(e.max, i).toFixed(3));
}
function N(e) {
  let t = ((Math.round(e) % 8) + 8) % 8;
  return t === 0 ? 0 : t * l;
}
function P(e) {
  return Number(
    (typeof e == `number` && Number.isFinite(e)
      ? Math.min(12, Math.max(0, e))
      : 0
    ).toFixed(2),
  );
}
var F = (e) => Number(e.toFixed(3));
function I(e) {
  return ((Math.round((e ?? 0) / l) % 8) + 8) % 8;
}
function L(e) {
  let t = S.get(e.pre);
  if (!t) return null;
  let n = b[t.shape],
    r = {};
  for (let i of n.knobs) r[i.key] = M(i, e.kn?.[i.key], t.kn[i.key]);
  let i = Number(e.r8),
    a = Number.isFinite(i) ? ((Math.round(i) % 8) + 8) % 8 : 0;
  return (n.quarterOnly && (a &= -2), { pre: t, shape: n, kn: r, r8: a });
}
var R = Math.SQRT1_2,
  z = [1, R, 0, -R, -1, -R, 0, R],
  B = [0, R, 1, R, 0, -R, -1, -R];
function V(e, t, n, r, i) {
  let [a, o] = e.anchor?.(t) ?? [0, 0];
  if (!a && !o) return [j(r), j(i)];
  let s = z[n],
    c = B[n],
    l = a * s + o * c,
    u = -a * c + o * s;
  return [F(j(r + l) - l), F(j(i + u) - u)];
}
function H(e) {
  let t = L(e);
  if (!t || !Number.isFinite(e.x) || !Number.isFinite(e.z)) return e;
  let [n, r] = V(t.shape, t.kn, t.r8, e.x, e.z);
  return { ...e, x: n, z: r };
}
function U(e, t, n) {
  let r = L(e);
  if (
    !r ||
    !Number.isInteger(t) ||
    t < 2 ||
    t > 9999 ||
    !Number.isFinite(e.x) ||
    !Number.isFinite(e.z)
  )
    return null;
  let { pre: i, shape: a, kn: s, r8: c } = r,
    l = o.includes(e.skin) ? e.skin : i.skin,
    u = a.groundOnly ? 0 : P(e.y),
    [d, f] = n ? V(a, s, c, e.x, e.z) : [e.x, e.z],
    p = {
      ...a.build(s, l, c),
      id: t,
      x: d,
      z: f,
      rot: N(c),
      skin: l,
      name: i.label,
      pre: i.id,
      kn: s,
    },
    m = F(u + (a.lift?.(s) ?? 0));
  if ((m && (p.y = m), a.sink !== void 0 && p.kind === `path`)) {
    let e = F(u - a.sink);
    e && (p.ground = e);
  }
  return (u && (p.lv = u), a.tag === !1 && (p.tag = !1), p);
}
function W(e, t) {
  return U(e, t, !0);
}
function G(e, t = 2) {
  return U({ ...e, x: 0, z: 0, y: 0 }, t, !1);
}
function K(e) {
  let t = {
    pre: e.pre,
    x: e.x,
    z: e.z,
    r8: I(e.rot),
    kn: { ...e.kn },
    skin: e.skin,
  };
  return (e.lv && (t.y = e.lv), t);
}
var q = /^[A-Z2-9]{6}$/;
