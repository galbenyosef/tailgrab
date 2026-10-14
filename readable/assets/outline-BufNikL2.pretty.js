import {
  St as e,
  Yn as t,
  c as n,
  h as r,
  q as i,
  xt as a,
  yr as o,
} from "./three.core-DVWDmH0S.js";
import { n as s } from "./palette-DQTkVEn_.js";
var c = { uOutline: { value: 0.0032 } };
function l(e) {
  if (e.getAttribute(`outlineNormal`)) return;
  let t = e.getAttribute(`position`),
    r = e.getAttribute(`normal`);
  if (!t || !r) return;
  let i = new Map();
  for (let e = 0; e < t.count; e++) {
    let n = `${t.getX(e).toFixed(3)},${t.getY(e).toFixed(3)},${t.getZ(e).toFixed(3)}`,
      r = i.get(n);
    r ? r.push(e) : i.set(n, [e]);
  }
  let a = new Float32Array(t.count * 3),
    s = new o();
  for (let e of i.values()) {
    s.set(0, 0, 0);
    for (let t of e)
      ((s.x += r.getX(t)), (s.y += r.getY(t)), (s.z += r.getZ(t)));
    if (s.lengthSq() < 1e-4)
      for (let t of e)
        ((a[t * 3] = r.getX(t)),
          (a[t * 3 + 1] = r.getY(t)),
          (a[t * 3 + 2] = r.getZ(t)));
    else {
      s.normalize();
      for (let t of e) s.toArray(a, t * 3);
    }
  }
  e.setAttribute(`outlineNormal`, new n(a, 3));
}
var u = `
  if (dot(outlineObjNormal, outlineObjNormal) > 0.25) {
    vec3 oN = normalize(normalMatrix * outlineObjNormal);
    vec2 dir = (projectionMatrix * vec4(oN, 0.0)).xy;
    dir = dir / max(length(dir), 1e-5);
    gl_Position.xy += dir * uOutline * gl_Position.w * uOutlineScale;
  } else {
    gl_Position = vec4(0.0, 0.0, 2.0, 1.0);
  }
`,
  d = new Map();
function f(t, n = s, i = 1, a = !1) {
  let o = `${t}|${n}|${i}|${a}`,
    l = d.get(o);
  return (
    l ||
    ((l = new e({ color: new r(n), side: 1, fog: !0 })),
    a &&
      ((l.polygonOffset = !0),
      (l.polygonOffsetFactor = 1),
      (l.polygonOffsetUnits = 2)),
    (l.onBeforeCompile = (e) => {
      ((e.uniforms.uOutline = c.uOutline),
        (e.uniforms.uOutlineScale = { value: i }),
        (e.vertexShader = e.vertexShader
          .replace(
            `void main() {`,
            `uniform float uOutline;
uniform float uOutlineScale;
attribute vec3 outlineNormal;
void main() {
  vec3 outlineObjNormal = outlineNormal;
#ifdef USE_INSTANCING
  outlineObjNormal = mat3(instanceMatrix) * outlineNormal;
#endif`,
          )
          .replace(
            `#include <project_vertex>`,
            `#include <project_vertex>
` + u,
          )),
        t &&
          (e.vertexShader = e.vertexShader.replace(
            `#include <skinning_vertex>`,
            `#include <skinning_vertex>
#ifdef USE_SKINNING
  outlineObjNormal = (skinMatrix * vec4(outlineNormal, 0.0)).xyz;
#endif`,
          )));
    }),
    (l.customProgramCacheKey = () => `ink-${t}`),
    d.set(o, l),
    l)
  );
}
function p(e, n = 1, r = s, o = !1) {
  let c = [],
    u = [];
  e.traverse((e) => {
    let t = e;
    t.isMesh && !t.userData.outlineShell && !t.userData.noOutline && u.push(t);
  });
  for (let e of u) {
    l(e.geometry);
    let s;
    if (e.isSkinnedMesh) {
      let i = e,
        a = i.geometry,
        o = a.userData.inkHeadStart,
        c = f(!0, r, n);
      o !== void 0 &&
        a.index &&
        (a.clearGroups(),
        a.addGroup(0, o, 0),
        a.addGroup(o, a.index.count - o, 1),
        (c = [f(!0, r, n), f(!0, r, n, !0)]));
      let l = new t(a, c);
      (l.bind(i.skeleton, i.bindMatrix),
        (l.bindMode = i.bindMode),
        (l.boundingSphere = i.boundingSphere),
        (l.frustumCulled = i.frustumCulled && !!i.boundingSphere),
        (s = l));
    } else if (e.isInstancedMesh) {
      let t = e,
        a = new i(t.geometry, f(!1, r, n), t.count);
      ((a.instanceMatrix = t.instanceMatrix), (a.frustumCulled = !1), (s = a));
    } else
      ((s = new a(e.geometry, f(!1, r, n))),
        (s.frustumCulled = e.frustumCulled));
    ((s.userData.outlineShell = !0),
      s.layers.set(1),
      o && (s.frustumCulled = !0),
      (s.castShadow = !1),
      (s.receiveShadow = !1),
      e.add(s),
      c.push(s));
  }
  return c;
}
function m(e) {
  let t = [];
  e.traverse((e) => {
    e.userData.outlineShell && t.push(e);
  });
  for (let e of t) e.removeFromParent();
}
export { m as a, c as i, l as n, f as r, p as t };
