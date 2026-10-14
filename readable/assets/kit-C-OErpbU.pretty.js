import { it as e, pt as t } from "./table-W1plLavt.js";
import { d as n, f as r } from "./bailPhysics-C1H0uy1H.js";
var i = (e) => (e < 0 ? 0 : e > 1 ? 1 : e);
function a(e, t, n) {
  if (typeof e == `number`) return e;
  let [r, a, o] = e;
  return r * i((t - a) / (o - a)) * i((-0.05 - n) / 0.06);
}
function o(n, r) {
  let i = (e) => e in r.items,
    a = [`top:${n.top}`, `bottom:${n.bottom}`];
  (e.has(n.bottom) || a.push(`shoes`),
    n.acc !== `none` && a.push(`acc:${n.acc}`));
  let o = [`head`];
  n.hat === `none` ? i(`hair`) && o.push(`hair`) : o.push(`hat:${n.hat}`);
  let s = t.has(n.top) ? `arms:sleeve` : `arms:bare`;
  return (i(s) && o.push(s), { body: a, head: o.filter(i), back: r.back });
}
function s(e, t) {
  let r = { ...t.bones, ...(t.hatBones[e.hat] ?? {}) };
  return n.map((e) => (r[e.name] ?? e.head).slice());
}
var c = [r.LeftFoot, r.RightFoot];
function l(e, t) {
  let i = t.hide?.length ? new Set(t.hide.map((e) => r[e])) : null,
    a = i && e.bone.some((e) => i.has(e)) ? i : null,
    o = !!t.feet?.turn,
    s = t.feet?.scale ?? 1,
    l = (o || s !== 1) && c.some((t) => e.bone.includes(t));
  if (!a && !l) return e;
  let u = { ...e };
  if (l) {
    ((u.position = e.position.slice()),
      (u.normal = e.normal.slice()),
      (u.outline = e.outline.slice()));
    for (let t = 0; t < e.bone.length; t++) {
      let r = e.bone[t];
      if (r !== c[0] && r !== c[1]) continue;
      let [i, , a] = n[r].head,
        l = t * 3,
        d = e.position[l] - i,
        f = e.position[l + 2] - a,
        p = e.normal[l],
        m = e.normal[l + 2],
        h = e.outline[l],
        g = e.outline[l + 2];
      (o && ((d = -d), (f = -f), (p = -p), (m = -m), (h = -h), (g = -g)),
        (u.position[l] = i + d * s),
        (u.position[l + 2] = a + f * s));
      let _ = e.normal[l + 1],
        v = Math.hypot(p / s, _, m / s) || 1;
      ((u.normal[l] = p / s / v),
        (u.normal[l + 1] = _ / v),
        (u.normal[l + 2] = m / s / v),
        (u.outline[l] = h),
        (u.outline[l + 2] = g));
    }
  }
  if (a) {
    let t = [];
    for (let n = 0; n < e.index.length; n += 3) {
      let r = e.index[n],
        i = e.index[n + 1],
        o = e.index[n + 2];
      !a.has(e.bone[r]) &&
        !a.has(e.bone[i]) &&
        !a.has(e.bone[o]) &&
        t.push(r, i, o);
    }
    u.index =
      e.index instanceof Uint32Array
        ? Uint32Array.from(t)
        : Uint16Array.from(t);
  }
  return u;
}
function u(e) {
  let t = 0,
    n = 0;
  for (let { mesh: r } of e) ((t += r.paint.length), (n += r.index.length));
  let r = {
      position: new Float32Array(t * 3),
      normal: new Float32Array(t * 3),
      paint: new Uint16Array(t),
      bone: new Uint8Array(t),
      ao: new Uint8Array(t),
      outline: new Int8Array(t * 3),
      index: t > 65535 ? new Uint32Array(n) : new Uint16Array(n),
    },
    i = 0,
    o = 0;
  for (let { mesh: t, dz: n = 0 } of e) {
    let e = t.paint.length;
    if ((r.position.set(t.position, i * 3), n))
      for (let t = 0; t < e; t++) {
        let e = (i + t) * 3;
        r.position[e + 2] += a(n, r.position[e + 1], r.position[e + 2]);
      }
    (r.normal.set(t.normal, i * 3),
      r.paint.set(t.paint, i),
      r.bone.set(t.bone, i),
      r.ao.set(t.ao, i),
      r.outline.set(t.outline, i * 3));
    for (let e = 0; e < t.index.length; e++) r.index[o + e] = t.index[e] + i;
    ((i += e), (o += t.index.length));
  }
  return r;
}
function d(e, t, n = new Uint8Array(e.length * 3)) {
  for (let r = 0; r < e.length; r++) {
    let i = e[r] * 3;
    ((n[r * 3] = t[i]), (n[r * 3 + 1] = t[i + 1]), (n[r * 3 + 2] = t[i + 2]));
  }
  return n;
}
export { l as a, d as i, o as n, u as r, s as t };
