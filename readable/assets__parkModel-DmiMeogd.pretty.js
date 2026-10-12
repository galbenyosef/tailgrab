import {
  I as e,
  St as t,
  T as n,
  Ut as r,
  V as i,
  Wn as a,
  Xt as o,
  bt as s,
  c,
  h as l,
  kt as u,
  l as d,
  q as f,
  xt as p,
  yr as m,
} from "./three.core-DVWDmH0S.js";
import { a as h, i as g } from "./toon-CycGToy9.js";
import { n as _, r as v } from "./preload-helper-DR1MrGPZ.js";
import {
  A as y,
  B as b,
  C as x,
  D as S,
  E as C,
  F as w,
  H as T,
  I as E,
  L as ee,
  M as te,
  N as ne,
  O as re,
  P as ie,
  R as ae,
  S as oe,
  T as se,
  U as ce,
  V as D,
  _ as le,
  a as O,
  b as k,
  g as A,
  h as j,
  i as ue,
  j as de,
  k as fe,
  m as M,
  o as pe,
  p as me,
  r as he,
  s as ge,
  v as _e,
  w as ve,
  z as ye,
} from "./scene-DiAs2bfK.js";
import { a as be, r as N } from "./palette-DQTkVEn_.js";
import { a as P, t as xe } from "./outline-BufNikL2.js";
import { s as Se } from "./missions-eXNMrvRm.js";
import { i as F, n as Ce, t as we } from "./parkMesh-CjoleZJz.js";
import { t as Te } from "./GLTFLoader-BAb7LzOS.js";
import { t as Ee } from "./decor-Tyb8Za1u.js";
import { n as De, r as Oe, t as ke } from "./ground-ufcYH9Hx.js";
var I = Ce,
  Ae = 0.6,
  je = `
uniform sampler2D uZones;
uniform float uGTime;
flat varying float vZone;
varying vec3 vGWorld;
float gHash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float gNoise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(gHash(i), gHash(i + vec2(1.0, 0.0)), f.x), mix(gHash(i + vec2(0.0, 1.0)), gHash(i + vec2(1.0, 1.0)), f.x), f.y);
}
`,
  Me = `
{
  int gz = int(vZone + 0.5);
  if (gz > 0) {
    vec4 gNew = texelFetch(uZones, ivec2(gz, 0), 0);
    vec4 gOld = texelFetch(uZones, ivec2(gz, 2), 0);
    if (gNew.a > 0.0 || gOld.a > 0.0) {
      vec4 gAnim = texelFetch(uZones, ivec2(gz, 1), 0);
      float gTopY = texelFetch(uZones, ivec2(gz, 3), 0).x;
      vec3 gp = vGWorld;
      vec3 fn = normalize(cross(dFdx(gp), dFdy(gp)));
      float vert = 1.0 - abs(fn.y);
      float t = clamp((uGTime - gAnim.z) / ${Ae.toFixed(2)}, 0.0, 1.0);
      float reach = gAnim.w * (1.0 - (1.0 - t) * (1.0 - t) * (1.0 - t));
      vec2 d = gp.xz - gAnim.xy;
      float dist = length(vec3(d.x, (gTopY - gp.y) * 0.8, d.y));
      float n = gNoise(gp.xz * 2.7 + gp.y * 1.9) * 0.6 + gNoise(gp.xz * 8.0 - gp.y * 5.0) * 0.3;
      // drips: thin vertical fingers running ahead of the front on walls/sides
      float col = floor((gp.x + gp.z) * 9.0);
      float drip = pow(gHash(vec2(col, float(gz))), 4.0) * 0.8 * vert * (1.0 - t * t);
      float front = reach - dist + (n - 0.45) * 0.55 + drip;
      float cover = smoothstep(0.0, 0.035, front);
      vec3 paint = gNew.rgb;
      // spray texture: fine speckle + soft diagonal bands
      float speck = gHash(floor(gp.xz * 38.0) + floor(gp.y * 38.0));
      paint *= 0.95 + 0.07 * speck;
      paint *= mix(0.93, 1.0, smoothstep(0.35, 0.65, fract((gp.x - gp.z + gp.y) * 0.9)));
      // wet edge while the flood runs
      paint = mix(paint, vec3(1.0), 0.45 * cover * (1.0 - smoothstep(0.0, 0.14, front)) * (1.0 - t));
      vec3 base = mix(diffuseColor.rgb, gOld.rgb, 0.86 * gOld.a);
      diffuseColor.rgb = mix(base, paint, 0.88 * gNew.a * cover);
    }
  }
}
`,
  Ne = class {
    texture;
    uniforms = { uZones: { value: null }, uGTime: { value: 0 } };
    data;
    boxes = new Map();
    time = 0;
    _c = new l();
    constructor() {
      ((this.data = new Float32Array(I * 4 * 4)),
        (this.texture = new n(this.data, I, 4, o, e)),
        (this.texture.minFilter = u),
        (this.texture.magFilter = u),
        (this.texture.generateMipmaps = !1),
        (this.texture.needsUpdate = !0),
        (this.uniforms.uZones.value = this.texture));
    }
    measure(e) {
      let t = e.getAttribute(`position`),
        n = e.getAttribute(`zone`);
      if (t && n)
        for (let e = 0; e < t.count; e++) {
          let r = Math.round(n.getX(e));
          if (r <= 0) continue;
          let i = t.getX(e),
            a = t.getY(e),
            o = t.getZ(e),
            s = this.boxes.get(r);
          (s ||
            this.boxes.set(
              r,
              (s = { minX: i, maxX: i, minY: a, maxY: a, minZ: o, maxZ: o }),
            ),
            (s.minX = Math.min(s.minX, i)),
            (s.maxX = Math.max(s.maxX, i)),
            (s.minY = Math.min(s.minY, a)),
            (s.maxY = Math.max(s.maxY, a)),
            (s.minZ = Math.min(s.minZ, o)),
            (s.maxZ = Math.max(s.maxZ, o)));
        }
    }
    patch(e) {
      let t = e.onBeforeCompile,
        n = e.customProgramCacheKey.bind(e),
        r = this.uniforms;
      ((e.onBeforeCompile = (n, i) => {
        (t.call(e, n, i),
          (n.uniforms.uZones = r.uZones),
          (n.uniforms.uGTime = r.uGTime),
          (n.vertexShader = n.vertexShader
            .replace(
              `#include <common>`,
              `#include <common>
attribute float zone;
flat varying float vZone;
varying vec3 vGWorld;`,
            )
            .replace(
              `#include <project_vertex>`,
              `#include <project_vertex>
  vZone = zone;
  vGWorld = (modelMatrix * vec4(transformed, 1.0)).xyz;`,
            )),
          (n.fragmentShader = n.fragmentShader
            .replace(
              `#include <common>`,
              `#include <common>
` + je,
            )
            .replace(
              `#include <color_fragment>`,
              `#include <color_fragment>
` + Me,
            )));
      }),
        (e.customProgramCacheKey = () => n() + `|graffiti`),
        (e.needsUpdate = !0));
    }
    paint(e, t, n) {
      if (e <= 0 || e >= I) return;
      let r = this.data,
        i = e * 4,
        a = (I + e) * 4,
        o = (I * 2 + e) * 4,
        s = (I * 3 + e) * 4;
      if (t === null) {
        ((r[i + 3] = 0), (r[o + 3] = 0), (this.texture.needsUpdate = !0));
        return;
      }
      (r[i + 3] > 0 &&
        ((r[o] = r[i]),
        (r[o + 1] = r[i + 1]),
        (r[o + 2] = r[i + 2]),
        (r[o + 3] = 1)),
        this._c.set(t),
        (r[i] = this._c.r),
        (r[i + 1] = this._c.g),
        (r[i + 2] = this._c.b),
        (r[i + 3] = 1));
      let c = this.boxes.get(e),
        l = n?.x ?? (c ? (c.minX + c.maxX) / 2 : 0),
        u = n?.z ?? (c ? (c.minZ + c.maxZ) / 2 : 0),
        d = 4;
      if (c) {
        d = 0;
        for (let e of [c.minX, c.maxX])
          for (let t of [c.minZ, c.maxZ])
            d = Math.max(d, Math.hypot(e - l, (c.maxY - c.minY) * 0.8, t - u));
        d += 0.8;
      }
      ((r[a] = l),
        (r[a + 1] = u),
        (r[a + 2] = this.time),
        (r[a + 3] = d),
        (r[s] = c ? c.maxY : 0),
        (this.texture.needsUpdate = !0));
    }
    update(e) {
      ((this.time += e), (this.uniforms.uGTime.value = this.time));
    }
    dispose() {
      this.texture.dispose();
    }
  },
  L = Math.PI / 180,
  R = new l(),
  z = class {
    p = [];
    n = [];
    c = [];
    k = [];
    g = [];
    l = [];
    floorY;
    constructor(e) {
      this.floorY = e;
    }
    get tris() {
      return this.p.length / 9;
    }
    tri(e, t, n, r, i, a = N.PAINT, o = 0) {
      let s = t[0] - e[0],
        c = t[1] - e[1],
        l = t[2] - e[2],
        u = n[0] - e[0],
        d = n[1] - e[1],
        f = n[2] - e[2],
        p = c * f - l * d,
        m = l * u - s * f,
        h = s * d - c * u,
        g = Math.hypot(p, m, h);
      if (g < 1e-9) return;
      ((p /= g), (m /= g), (h /= g));
      let _ = (e[0] + t[0] + n[0]) / 3 - i[0],
        v = (e[1] + t[1] + n[1]) / 3 - i[1],
        y = (e[2] + t[2] + n[2]) / 3 - i[2],
        b = [e, t, n];
      (p * _ + m * v + h * y < 0 &&
        ((b = [e, n, t]), (p = -p), (m = -m), (h = -h)),
        R.set(r));
      for (let e of b)
        (this.p.push(e[0], e[1], e[2]),
          this.n.push(p, m, h),
          this.c.push(R.r, R.g, R.b),
          this.k.push(a / 8),
          this.g.push(o),
          this.l.push(Math.max(0, Math.min(1, (e[1] - this.floorY) / 10))));
    }
    quad(e, t, n, r, i, a, o, s) {
      (this.tri(e, t, n, i, a, o, s), this.tri(e, n, r, i, a, o, s));
    }
    box(e, t, n, r, i, a, o, s, c = s, l = 0) {
      let u = Math.cos(o),
        d = Math.sin(o),
        f = (t, r, i) => [e + t * u + i * d, r, n - t * d + i * u],
        p = r / 2,
        m = a / 2,
        h = t + i,
        g = [e, t + i / 2, n],
        _ = [f(-p, t, -m), f(p, t, -m), f(p, t, m), f(-p, t, m)],
        v = [f(-p, h, -m), f(p, h, -m), f(p, h, m), f(-p, h, m)];
      for (let e = 0; e < 4; e++)
        this.quad(_[e], _[(e + 1) % 4], v[(e + 1) % 4], v[e], s, g, N.PAINT, l);
      this.quad(v[0], v[1], v[2], v[3], c, g, N.PAINT, l);
    }
    beam(e, t, n, r, i = 0) {
      let a = t[0] - e[0],
        o = t[1] - e[1],
        s = t[2] - e[2],
        c = Math.hypot(a, o, s) || 1,
        l = a / c,
        u = o / c,
        d = s / c,
        f = -d,
        p = 0,
        m = l;
      Math.hypot(f, m) < 0.001 && ((f = 1), (p = 0), (m = 0));
      let h = Math.hypot(f, p, m);
      ((f /= h), (p /= h), (m /= h));
      let g = u * m - d * p,
        _ = d * f - l * m,
        v = l * p - u * f,
        y = n / 2,
        b = (e) =>
          [
            [1, 1],
            [-1, 1],
            [-1, -1],
            [1, -1],
          ].map(([t, n]) => [
            e[0] + (f * t + g * n) * y,
            e[1] + (p * t + _ * n) * y,
            e[2] + (m * t + v * n) * y,
          ]),
        x = b(e),
        S = b(t),
        C = [(e[0] + t[0]) / 2, (e[1] + t[1]) / 2, (e[2] + t[2]) / 2];
      for (let e = 0; e < 4; e++)
        this.quad(x[e], x[(e + 1) % 4], S[(e + 1) % 4], S[e], r, C, N.PAINT, i);
    }
    prism(e, t, n, r, i, a, o, s, c, l = 0, u = 0) {
      let d = [e, (n + r) / 2, t],
        f = (n, r, i) => {
          let a = u + (n / o) * Math.PI * 2;
          return [e + Math.cos(a) * i, r, t + Math.sin(a) * i];
        };
      for (let e = 0; e < o; e++)
        this.quad(
          f(e, n, i),
          f(e + 1, n, i),
          f(e + 1, r, a),
          f(e, r, a),
          s,
          d,
          N.PAINT,
          l,
        );
      if (c)
        for (let n = 0; n < o; n++)
          this.tri(
            f(n, r, a),
            f(n + 1, r, a),
            [e, r, t],
            c,
            [e, r - 1, t],
            N.PAINT,
            l,
          );
    }
    cone(e, t, n, r, i, a, o, s = 0) {
      let c = [e, n + r, t],
        l = [e, n + r * 0.3, t];
      for (let r = 0; r < a; r++) {
        let u = s + (r / a) * Math.PI * 2,
          d = s + ((r + 1) / a) * Math.PI * 2;
        this.tri(
          [e + Math.cos(u) * i, n, t + Math.sin(u) * i],
          [e + Math.cos(d) * i, n, t + Math.sin(d) * i],
          c,
          o,
          l,
        );
      }
    }
    build(e = !0) {
      let t = new d();
      return (
        t.setAttribute(`position`, new c(new Float32Array(this.p), 3)),
        t.setAttribute(`normal`, new c(new Float32Array(this.n), 3)),
        t.setAttribute(`color`, new c(new Float32Array(this.c), 3)),
        e &&
          (t.setAttribute(`kind`, new c(new Float32Array(this.k), 1)),
          t.setAttribute(`glow`, new c(new Float32Array(this.g), 1)),
          t.setAttribute(`lift`, new c(new Float32Array(this.l), 1))),
        t.computeBoundingSphere(),
        t
      );
    }
  };
function Pe(e) {
  let t = e >>> 0;
  return () => {
    t = (t + 1831565813) >>> 0;
    let e = t;
    return (
      (e = Math.imul(e ^ (e >>> 15), e | 1)),
      (e ^= e + Math.imul(e ^ (e >>> 7), e | 61)),
      ((e ^ (e >>> 14)) >>> 0) / 4294967296 - 0.5
    );
  };
}
var Fe = `
  gl_Position.z = gl_Position.w;`;
function Ie(e, t) {
  let n = e.onBeforeCompile,
    r = e.customProgramCacheKey.bind(e);
  ((e.onBeforeCompile = (t, r) => {
    (n.call(e, t, r),
      (t.vertexShader = t.vertexShader.replace(
        `#include <fog_vertex>`,
        `#include <fog_vertex>${Fe}`,
      )));
  }),
    (e.customProgramCacheKey = () => `${r()}-${t}`));
}
function Le(e) {
  let t = e.onBeforeCompile,
    n = e.customProgramCacheKey.bind(e);
  ((e.onBeforeCompile = (n, r) => {
    (t.call(e, n, r),
      (n.uniforms.uFogStretch = O.uFogStretch),
      (n.uniforms.uHazeMax = O.uHazeMax),
      (n.vertexShader = n.vertexShader.replace(
        `void main() {`,
        `attribute float lift;
varying float vLift;
void main() {
  vLift = lift;`,
      )),
      (n.fragmentShader = n.fragmentShader
        .replace(
          `void main() {`,
          `uniform float uFogStretch, uHazeMax;
varying float vLift;
void main() {`,
        )
        .replace(
          `#include <fog_fragment>`,
          `#ifdef USE_FOG
          float fogA = smoothstep(fogNear, fogFar, vFogDepth);
          float fogB = uHazeMax * smoothstep(fogNear, fogFar * uFogStretch, vFogDepth);
          gl_FragColor.rgb = mix(gl_FragColor.rgb, fogColor, mix(fogA, fogB, vLift));
        #endif`,
        )));
  }),
    (e.customProgramCacheKey = () => `${n()}-lift`));
}
var B = null;
function V() {
  if (B) return B;
  let e = () => {
      let e = g(h({ vertexColors: !0 }), { rim: 0.12, kind: !0, glow: !0 });
      return (Le(e), e);
    },
    t = (e) => {
      let t = g(h({ vertexColors: !0 }), { rim: e, kind: !0 });
      return (Ie(t, `apron`), (t.depthWrite = !1), t);
    };
  return (
    (B = {
      near: e(),
      nearInstanced: e(),
      apronBaked: t(0.12),
      apronFlat: t(0),
      far: ze(),
      water: Be(),
    }),
    B
  );
}
var Re = `
  vec3 skyAt(vec3 d) { return d.y > 0.0 ? mix(uHorizon, uSkyTop, pow(clamp(d.y, 0.0, 1.0), 0.55)) : uHorizon; }`;
function ze() {
  let e = O;
  return new a({
    depthWrite: !1,
    fog: !1,
    uniforms: {
      uFog: e.uFog,
      uHorizon: e.uHorizon,
      uSkyTop: e.uSkyTop,
      uSunDir: e.uSunDir,
      uSunTint: e.uSunTint,
      uShadeTint: e.uShadeTint,
      uLamps: e.uLamps,
      uHaze: e.uHaze,
      uTime: e.uTime,
    },
    vertexShader: `
      attribute vec3 tint;
      // x: haze (≥ 2: the horizon band, tint.r its height share), y: lock to the camera's height, z: windows, w: blinks
      attribute vec4 far;
      varying vec3 vTint;
      varying vec4 vFar;
      varying vec3 vW;
      void main() {
        vec3 p = position;
        p.y += far.y * cameraPosition.y;
        vec4 w = modelMatrix * vec4(p, 1.0);
        vW = w.xyz;
        vTint = tint;
        vFar = far;
        vec4 c = projectionMatrix * viewMatrix * w;
        gl_Position = c.xyww;
      }`,
    fragmentShader: `
      uniform vec3 uFog, uHorizon, uSkyTop, uSunDir, uSunTint, uShadeTint;
      uniform float uLamps, uHaze, uTime;
      varying vec3 vTint;
      varying vec4 vFar;
      varying vec3 vW;
      ${Re}
      float fHash(vec2 p) { vec3 q = fract(vec3(p.xyx) * 0.1031); q += dot(q, q.yzx + 33.33); return fract((q.x + q.y) * q.z); }
      void main() {
        vec3 dir = normalize(vW - cameraPosition);
        vec3 dx = dFdx(vW), dy = dFdy(vW);
        if (vFar.x > 1.5) {
          // the horizon band: fog below, the sky above
          gl_FragColor = vec4(mix(uFog, skyAt(dir), smoothstep(0.0, 1.0, vTint.r)), 1.0);
          #include <colorspace_fragment>
          return;
        }
        vec3 n = normalize(cross(dx, dy));
        if (dot(n, dir) > 0.0) n = -n;
        vec3 c = vTint * mix(uShadeTint, uSunTint, smoothstep(0.02, 0.2, dot(n, normalize(uSunDir))));
        if (vFar.z > 0.5 && abs(n.y) < 0.5) {
          // window grid on the walls, lit as the evening comes on
          vec2 t = normalize(vec2(-n.z, n.x));
          vec2 uv = vec2(dot(vW.xz, t) / 7.0, vW.y / 9.0);
          vec2 cell = floor(uv), f = fract(uv);
          float aa = max(fwidth(uv.x), fwidth(uv.y));
          float win = step(0.28, f.x) * step(f.x, 0.72) * step(0.3, f.y) * step(f.y, 0.78) * (1.0 - smoothstep(0.25, 0.6, aa));
          float on = step(fHash(cell), 0.18 + 0.55 * uLamps) * uLamps;
          vec3 glass = mix(c * vec3(0.92, 0.97, 1.12) + 0.04, vec3(1.0, 0.82, 0.55), on);
          c = mix(c, glass, win * (0.45 + 0.55 * on));
        }
        if (vFar.w > 0.5) c = mix(c, vec3(1.0, 0.22, 0.3), step(0.5, fract(uTime * 0.7)) * (0.35 + 0.65 * uLamps));
        // aerial haze: the sky behind it (a touch bluer), fog at the foot
        vec3 hazeCol = mix(uFog, mix(skyAt(dir), uSkyTop, 0.3), smoothstep(-0.004, 0.05, dir.y));
        float hz = max(clamp(vFar.x * uHaze, 0.0, 0.95), 1.0 - smoothstep(-0.003, 0.03, dir.y));
        gl_FragColor = vec4(mix(c, hazeCol, hz), 1.0);
        #include <colorspace_fragment>
      }`,
  });
}
function Be() {
  let e = O;
  return new a({
    depthWrite: !1,
    fog: !1,
    uniforms: {
      uFog: e.uFog,
      uHorizon: e.uHorizon,
      uSkyTop: e.uSkyTop,
      uSunDir: e.uSunDir,
      uSunTint: e.uSunTint,
      uShadeTint: e.uShadeTint,
      uDisc: e.uDisc,
      uTime: e.uTime,
      uFogNear: e.uFogNear,
      uFogFar: e.uFogFar,
      uLamps: e.uLamps,
      uShallow: { value: new l(`#7FDCD6`) },
      uDeep: { value: new l(`#4FA3DB`) },
    },
    vertexShader: `
      attribute float shore;
      varying float vShore;
      varying vec3 vW;
      void main() {
        vec4 w = modelMatrix * vec4(position, 1.0);
        vW = w.xyz;
        vShore = shore;
        vec4 c = projectionMatrix * viewMatrix * w;
        gl_Position = c.xyww;
      }`,
    fragmentShader: `
      uniform vec3 uFog, uHorizon, uSkyTop, uSunDir, uSunTint, uShadeTint, uDisc, uShallow, uDeep;
      uniform float uTime, uFogNear, uFogFar, uLamps;
      varying float vShore;
      varying vec3 vW;
      ${Re}
      void main() {
        vec3 v = vW - cameraPosition;
        float dist = length(v);
        vec3 dir = v / dist;
        vec3 c = mix(uShallow, uDeep, smoothstep(0.0, 70.0, vShore)) * mix(uShadeTint, uSunTint, 0.6);
        // wave lines, gone before they'd shimmer
        float w = sin(dot(vW.xz, vec2(0.11, 0.06)) + uTime * 0.9) * sin(dot(vW.xz, vec2(-0.045, 0.09)) - uTime * 0.7);
        float line = smoothstep(0.62, 0.7, w) * (1.0 - smoothstep(60.0, 240.0, dist));
        c = mix(c, c * 1.3 + 0.04, line * 0.6);
        // foam at the shoreline
        float edge = 2.2 + 0.9 * sin(uTime * 1.2 + (vW.x + vW.z) * 0.05);
        c = mix(c, uSunTint * 0.95, (1.0 - smoothstep(edge * 0.6, edge, vShore)) * 0.9);
        // the sky in it at a glance, the sun's glint
        vec3 r = reflect(dir, vec3(0.0, 1.0, 0.0));
        c = mix(c, skyAt(r), pow(1.0 - clamp(-dir.y, 0.0, 1.0), 4.0) * 0.55);
        c += uDisc * pow(max(dot(r, normalize(uSunDir)), 0.0), 220.0) * (1.2 + line);
        // fog, then the horizon line melts into the band
        c = mix(c, uFog, 0.6 * smoothstep(uFogNear, uFogFar * 2.5, dist));
        c = mix(c, uFog, smoothstep(-0.008, -0.0005, dir.y));
        gl_FragColor = vec4(c, 1.0);
        #include <colorspace_fragment>
      }`,
  });
}
function Ve(e, t) {
  let n = new z(t.floorY),
    r = e.rect,
    i = t.floorY,
    a = t.sea ? D(e, t.sea) : null,
    o = t.sea?.beach ?? 0,
    s = [e.cx, i - 100, e.cz],
    c = e.baked ? ie : () => be.grass;
  for (let e = 0; e < M.length - 1; e++) {
    let l = M[e],
      u = M[e + 1],
      d = x(l, u);
    for (let e = 0; e < 4; e++) {
      let f = (t, n) => {
          let a = r.x0 - t,
            o = r.x1 + t,
            s = r.z0 - t,
            c = r.z1 + t;
          return e === 0
            ? [a + (o - a) * n, i, c]
            : e === 1
              ? [o, i, c + (s - c) * n]
              : e === 2
                ? [o + (a - o) * n, i, s]
                : [a, i, s + (c - s) * n];
        },
        p = e % 2 == 0 ? r.x1 - r.x0 + 2 * u : r.z1 - r.z0 + 2 * u,
        m = Math.ceil(p / d);
      for (let e = 0; e < m; e++) {
        let i = [
            f(l, e / m),
            f(u, e / m),
            f(u, (e + 1) / m),
            f(l, (e + 1) / m),
          ],
          d = (i[0][0] + i[1][0] + i[2][0] + i[3][0]) / 4,
          p = (i[0][2] + i[1][2] + i[2][2] + i[3][2]) / 4,
          h = w(
            c(d, p),
            t.ground.far,
            Math.min(1, Math.max(0, (S(r, d, p) - 50) / 250)),
          ),
          g = N.GRASS;
        if (a) {
          if (Math.min(...i.map((e) => a.s(e[0], e[2]))) > 0) continue;
          Math.max(...i.map((e) => a.s(e[0], e[2]))) > -o &&
            ((h = t.ground.sand), (g = N.PAINT));
        }
        n.quad(i[0], i[1], i[2], i[3], h, s, g);
      }
    }
  }
  let l = new p(n.build(), e.baked ? V().apronBaked : V().apronFlat);
  return (
    (l.name = `scenery:apron`),
    (l.renderOrder = _e.apron),
    (l.frustumCulled = !1),
    { mesh: l, tris: n.tris }
  );
}
function He(e, t) {
  if (!t.sea) return null;
  let n = D(e, t.sea),
    r = Math.min(n.latMax, 4e3),
    i = [];
  for (let e = 0; e <= 64; e++) {
    let t = (e / 64) * 2 - 1;
    i.push(Math.sign(t) * Math.abs(t) ** 2.2 * r);
  }
  let a = [],
    o = [],
    s = (e, r) => {
      let i = n.at(e, r);
      (a.push(i.x, t.floorY, i.z), o.push(r));
    };
  for (let e = 0; e < k.length - 1; e++)
    for (let t = 0; t < 64; t++) {
      let n = k[e],
        r = k[e + 1],
        a = i[t],
        o = i[t + 1];
      (s(a, n), s(o, n), s(o, r), s(a, n), s(o, r), s(a, r));
    }
  let l = new d();
  (l.setAttribute(`position`, new c(new Float32Array(a), 3)),
    l.setAttribute(`shore`, new c(new Float32Array(o), 1)));
  let u = V().water;
  (u.uniforms.uShallow.value.set(t.sea.shallow),
    u.uniforms.uDeep.value.set(t.sea.deep));
  let f = new p(l, u);
  return (
    (f.name = `scenery:water`),
    (f.renderOrder = _e.water),
    (f.frustumCulled = !1),
    { mesh: f, tris: a.length / 9 }
  );
}
var Ue = class {
  p = [];
  t = [];
  f = [];
  wind(e, t, n, r, i) {
    let a = t[0] - e[0],
      o = t[1] - e[1],
      s = t[2] - e[2],
      c = n[0] - e[0],
      l = n[1] - e[1],
      u = n[2] - e[2],
      d = o * u - s * l,
      f = s * c - a * u,
      p = a * l - o * c,
      m = r[0] - (e[0] + t[0] + n[0]) / 3,
      h = r[1] - (e[1] + t[1] + n[1]) / 3,
      g = r[2] - (e[2] + t[2] + n[2]) / 3;
    return d * m + f * h + p * g > 0 === i ? [e, t, n] : [e, n, t];
  }
  tri(e, t, n, r, i, a, o, s = 0, c = 0, l = 0) {
    R.set(r);
    for (let r of this.wind(e, t, n, a, o))
      (this.p.push(r[0], r[1], r[2]),
        this.t.push(R.r, R.g, R.b),
        this.f.push(i, s, c, l));
  }
  band(e, t, n, r, i, a, o) {
    let s = this.wind(e, t, n, o, !0),
      c = new Map([
        [e, r],
        [t, i],
        [n, a],
      ]);
    for (let e of s)
      (this.p.push(e[0], e[1], e[2]),
        this.t.push(c.get(e), 0, 0),
        this.f.push(2, 1, 0, 0));
  }
  get tris() {
    return this.p.length / 9;
  }
};
function We(e, t) {
  let n = new Ue(),
    r = e.cx,
    i = e.cz,
    a = t.floorY,
    o = (e, t, n) => [r + se(e) * t, n, i + C(e) * t],
    s = [r, a, i],
    l = Math.tan(-0.25 * L) * j,
    u = Math.tan(1.4 * L) * j;
  for (let e = 0; e < 90; e++) {
    let t = (e / 90) * 360,
      r = ((e + 1) / 90) * 360,
      i = o(t, j, l),
      a = o(r, j, l),
      c = o(t, j, 0),
      d = o(r, j, 0),
      f = o(t, j, u),
      p = o(r, j, u);
    (n.band(i, a, d, 0, 0, 0.12, s),
      n.band(i, d, c, 0, 0.12, 0.12, s),
      n.band(c, d, p, 0.12, 0.12, 1, s),
      n.band(c, p, f, 0.12, 1, 1, s));
  }
  for (let e of t.banks)
    for (let t of e.puffs) {
      let r = e.bearing + t.a,
        i = e.elev + t.e,
        a = Math.tan(e.elev * L) * A,
        c = o(r, A, Math.tan(i * L) * A),
        l = (e) => {
          let n = o(r + Math.cos(e) * t.r, A, 0);
          return [
            n[0],
            Math.max(a, c[1] + Math.sin(e) * Math.tan(t.r * L) * A),
            n[2],
          ];
        };
      for (let t = 0; t < 12; t++) {
        let r = (t / 12) * Math.PI * 2,
          i = ((t + 1) / 12) * Math.PI * 2;
        n.tri(
          c,
          l(r),
          l(i),
          Math.sin((r + i) / 2) < -0.2 ? T(e.col, 0.93) : e.col,
          0.22,
          s,
          !0,
          1,
        );
      }
    }
  let f = [];
  for (let e of t.ranges)
    f.push({
      r: e.r,
      draw() {
        let t = Pe(e.seed),
          r = Math.max(...e.elev.map((t) => Math.tan(t * L) * e.r)),
          i = (n) => {
            let r = e.from + n * e.step,
              i = Math.tan(e.elev[n] * L) * e.r;
            return {
              base: o(r, e.r, a),
              mid: o(
                r + t() * e.step * 0.4,
                e.r * (1.04 + t() * 0.02),
                a + i * (0.5 + t() * 0.18),
              ),
              crest: o(r, e.r * 1.09, a + i),
              h: i,
            };
          },
          c = i(0);
        for (let a = 1; a < e.elev.length; a++) {
          let o = i(a);
          if (c.h < 0.5 && o.h < 0.5) {
            c = o;
            continue;
          }
          let l = Math.max(c.h, o.h) > e.snow * r,
            u = T(e.col, 0.97 + t() * 0.06),
            d = l ? `#F7F5FF` : w(e.col, e.top, 0.45 + t() * 0.3);
          (n.tri(c.base, o.base, o.mid, u, e.haze, s, !0),
            n.tri(c.base, o.mid, c.mid, u, e.haze, s, !0),
            n.tri(
              c.mid,
              o.mid,
              o.crest,
              l && o.h > e.snow * r * 1.08 ? `#F7F5FF` : d,
              e.haze,
              s,
              !0,
            ),
            n.tri(c.mid, o.crest, c.crest, d, e.haze, s, !0),
            (c = o));
        }
      },
    });
  for (let e of t.towers)
    f.push({
      r: e.r,
      draw() {
        let t = o(e.bearing, e.r, a),
          r = -e.bearing * L,
          i = e.w,
          s = a,
          c = a;
        for (let a = 0; a < e.tiers; a++) {
          let o =
            e.h *
            (a === 0 ? 0.62 : 0.38 / (e.tiers - 1)) *
            (e.tiers === 1 ? 1 / 0.62 : 1);
          (Ge(n, t, i, i * 0.7, s, s + o, r, e.col, e.roof, e.haze),
            (s += o),
            (c = s),
            (i *= 0.72));
        }
        if (e.antenna) {
          let i = e.h * 0.18,
            a = Math.max(1.5, e.w * 0.04);
          Ge(n, t, a, a, c, c + i, r, e.roof, e.roof, e.haze, 0, 1);
        }
      },
    });
  f.sort((e, t) => t.r - e.r);
  for (let e of f) e.draw();
  let m = new d();
  (m.setAttribute(`position`, new c(new Float32Array(n.p), 3)),
    m.setAttribute(`tint`, new c(new Float32Array(n.t), 3)),
    m.setAttribute(`far`, new c(new Float32Array(n.f), 4)));
  let h = new p(m, V().far);
  return (
    (h.name = `scenery:far`),
    (h.renderOrder = _e.far),
    (h.frustumCulled = !1),
    { mesh: h, tris: n.tris }
  );
}
function Ge(e, t, n, r, i, a, o, s, c, l, u = 1, d = 0) {
  let f = Math.cos(o),
    p = Math.sin(o),
    m = (e, n, r) => [t[0] + e * f + r * p, n, t[2] - e * p + r * f],
    h = n / 2,
    g = r / 2,
    _ = [t[0], (i + a) / 2, t[2]],
    v = [m(-h, i, g), m(h, i, g), m(h, a, g), m(-h, a, g)],
    y = [m(-h, i, -g), m(h, i, -g), m(h, a, -g), m(-h, a, -g)],
    b = T(s, 0.9);
  (e.tri(v[0], y[0], y[3], b, l, _, !1, 0, u, d),
    e.tri(v[0], y[3], v[3], b, l, _, !1, 0, u, d),
    e.tri(v[1], y[1], y[2], b, l, _, !1, 0, u, d),
    e.tri(v[1], y[2], v[2], b, l, _, !1, 0, u, d),
    e.tri(v[3], v[2], y[2], c, l, _, !1, 0, 0, d),
    e.tri(v[3], y[2], y[3], c, l, _, !1, 0, 0, d),
    e.tri(v[0], v[1], v[2], s, l, _, !1, 0, u, d),
    e.tri(v[0], v[2], v[3], s, l, _, !1, 0, u, d));
}
function Ke(e, t, n) {
  let r = Pe(t.seed),
    { rho: i, y: a } = fe(t.shape, t.rings),
    o = i.length,
    s = [];
  for (let e = 0; e < o; e++) {
    let o = [];
    for (let s = 0; s < t.seg; s++) {
      let c = (s / t.seg) * Math.PI * 2 + (e % 2) * (Math.PI / t.seg),
        l = 1 + r() * (t.shape === `mesa` ? 0.1 : 0.22),
        u = de(t, Math.cos(c) * t.rx * i[e] * l, Math.sin(c) * t.rz * i[e] * l);
      o.push([u.x, n + (e === 0 ? 0 : t.h * a[e] * (1 + r() * 0.16)), u.z]);
    }
    s.push(o);
  }
  let c = [
      t.x + r() * t.rx * 0.15,
      n + t.h * (t.shape === `mesa` ? 1 : 1 + r() * 0.1),
      t.z + r() * t.rz * 0.15,
    ],
    l = [t.x, n - t.h * 0.6, t.z],
    u = (e) => {
      let r = (e - n) / t.h;
      return r > t.snow
        ? `#F7F5FF`
        : t.bands
          ? t.bands[
              Math.min(
                t.bands.length - 1,
                Math.floor(r * t.bands.length * 0.999),
              )
            ]
          : w(t.col, t.top, Math.max(0, Math.min(1, r * 1.1)) ** 1.3);
    },
    d = t.bands || t.snow < 1 ? N.PAINT : N.GRASS;
  for (let n = 0; n < o; n++) {
    let i = s[n],
      a = n + 1 < o ? s[n + 1] : null;
    for (let o = 0; o < t.seg; o++) {
      let s = (o + 1) % t.seg;
      if (!a) {
        let t = (i[o][1] + i[s][1] + c[1]) / 3;
        e.tri(i[o], i[s], c, T(u(t), 1 + r() * 0.05), l, d);
        continue;
      }
      let f = i[o],
        p = i[s],
        m = n % 2 ? a[s] : a[o],
        h = n % 2 ? a[o] : a[(o + t.seg - 1) % t.seg];
      (e.tri(f, p, m, T(u((f[1] + p[1] + m[1]) / 3), 1 + r() * 0.06), l, d),
        e.tri(f, m, h, T(u((f[1] + m[1] + h[1]) / 3), 1 + r() * 0.06), l, d));
    }
  }
  if (t.sand) {
    let r = s[0].map((e) => {
      let r = e[0] - t.x,
        i = e[2] - t.z;
      return [t.x + r * 1.18, n, t.z + i * 1.18];
    });
    for (let i = 0; i < t.seg; i++) {
      let a = (i + 1) % t.seg;
      e.quad(r[i], r[a], s[0][a], s[0][i], t.sand, [t.x, n - 50, t.z]);
    }
  }
}
function qe(e, t, n) {
  let r = Math.cos(t.yaw),
    i = Math.sin(t.yaw),
    a = (e, n, a) => [t.x + e * r + a * i, n, t.z - e * i + a * r],
    o = T(t.col, 0.78);
  e.box(t.x, n - 0.3, t.z, t.w, t.h + 0.3, t.d, t.yaw, t.col, o);
  let s = n + t.h,
    c = t.w / 2,
    l = t.d / 2;
  if (t.roof === `pitched`) {
    let n = Math.min(t.w, t.d) * 0.35,
      r = [t.x, s, t.z],
      i = a(-c, s + n, 0),
      u = a(c, s + n, 0);
    (e.quad(a(-c, s, l), a(c, s, l), u, i, o, r),
      e.quad(a(-c, s, -l), a(c, s, -l), u, i, o, r),
      e.tri(a(-c, s, l), a(-c, s, -l), i, t.col, r),
      e.tri(a(c, s, l), a(c, s, -l), u, t.col, r));
  } else e.box(t.x, s, t.z, t.w + 0.6, 0.7, t.d + 0.6, t.yaw, T(t.col, 0.9), o);
  let u = Math.max(1, Math.floor(t.w / 3.4)),
    d = Math.max(1, Math.floor((t.h - 1.2) / 3.2)),
    f = 1.3,
    p = 1.5,
    m = l + 0.06,
    h = [t.x, n + t.h / 2, t.z];
  for (let r = 0; r < d; r++)
    for (let i = 0; i < u; i++) {
      let o = -c + (t.w / u) * (i + 0.5),
        s = n + 1.6 + r * 3.2;
      e.quad(
        a(o - f / 2, s, m),
        a(o + f / 2, s, m),
        a(o + f / 2, s + p, m),
        a(o - f / 2, s + p, m),
        `#FFE7B0`,
        h,
        N.PAINT,
        1,
      );
    }
}
function Je(e, t, n, r, i, a, o) {
  (e.cone(t, r, n, i * 0.62, a, 5, o, t * 0.1),
    e.cone(t, r, n + i * 0.38, i * 0.62, a * 0.68, 5, T(o, 1.12), r * 0.1));
}
function Ye(e, t, n, r) {
  let i = Math.cos(r),
    a = Math.sin(r);
  return (r, o, s) => [e + r * i + s * a, t + o, n - r * a + s * i];
}
var H = () => new z(-1e4);
function Xe(e, t) {
  let n = new p(e.build(), V().near);
  return ((n.name = t), (n.userData.noOutline = !0), n);
}
function Ze(e, t, n) {
  let r = new f(e.build(), V().nearInstanced, t);
  return ((r.name = n), (r.frustumCulled = !1), (r.userData.noOutline = !0), r);
}
var Qe = new s(),
  $e = new r(),
  et = new m(),
  tt = new m(1, 1, 1),
  nt = new l(),
  rt = new m(1, 0, 0),
  it = new m(0, 1, 0),
  at = new m(0, 0, 1),
  ot = new r(),
  U = new r();
function st(e, t) {
  let n = e.s,
    r = 24 * n,
    a = r + 5 * n,
    o = 3.2 * n,
    s = Ye(e.x, e.y, e.z, e.yaw);
  t.box(
    e.x,
    e.y,
    e.z,
    16 * n,
    1.4 * n,
    11 * n,
    e.yaw,
    T(e.accent, 0.9),
    e.accent,
  );
  for (let r of [-o, o])
    (t.beam(s(-10 * n, 0, r * 1.25), s(0, a, r), 1.3 * n, e.col),
      t.beam(s(10 * n, 0, r * 1.25), s(0, a, r), 1.3 * n, e.col));
  t.beam(
    s(0, a, -o - 1.2 * n),
    s(0, a, o + 1.2 * n),
    1.6 * n,
    T(e.accent, 0.85),
  );
  let c = new i();
  (c.position.set(...s(0, a, 0)), (c.rotation.y = e.yaw));
  let l = new i();
  c.add(l);
  let u = H(),
    d = (e, t) => {
      let n = (e / 24) * Math.PI * 2;
      return [Math.cos(n) * r, Math.sin(n) * r, t];
    };
  for (let t of [-o * 0.8, o * 0.8]) {
    for (let r = 0; r < 24; r++)
      u.beam(d(r, t), d(r + 1, t), 0.9 * n, e.col, 1);
    for (let r = 0; r < 12; r++)
      u.beam([0, 0, t], d(r * 2, t), 0.45 * n, T(e.col, 0.92));
  }
  for (let t = 0; t < 12; t++)
    u.beam(d(t * 2, -o * 0.8), d(t * 2, o * 0.8), 0.5 * n, e.accent);
  l.add(Xe(u, `mark:ferris-wheel`));
  let f = H();
  (f.box(0, -3.4 * n, 0, 3.2 * n, 3.2 * n, 2.6 * n, 0, `#FFFFFF`, `#FFFFFF`),
    f.beam([0, -0.2 * n, 0], [0, 0, 0], 0.3 * n, `#FFFFFF`));
  let p = Ze(f, 12, `mark:ferris-cabins`),
    m = [`#FF8FB8`, `#FFD970`, `#8FDDF5`, `#B6A0FF`, `#FFB27A`, `#8FE3B4`];
  for (let e = 0; e < 12; e++) p.setColorAt(e, nt.set(m[e % m.length]));
  c.add(p);
  let h = 0.05 + (e.seed % 100) / 4e3,
    g = (e) => {
      let t = e * h;
      l.rotation.z = t;
      for (let e = 0; e < 12; e++) {
        let n = t + (e / 12) * Math.PI * 2;
        p.setMatrixAt(
          e,
          Qe.makeTranslation(Math.cos(n) * r, Math.sin(n) * r, 0),
        );
      }
      p.instanceMatrix.needsUpdate = !0;
    };
  return (
    g(0),
    {
      object: c,
      update: (e) => g(e),
      dispose() {
        c.traverse((e) => {
          e.isMesh && e.geometry.dispose();
        });
      },
    }
  );
}
function ct(e, t, n) {
  let r = e.pts ?? [],
    i = [];
  for (let [a, o] of r.entries()) {
    let r = 46 * o.s,
      s = Math.atan2(n.cx - o.x, n.cz - o.z);
    t.prism(
      o.x,
      o.z,
      o.y - 0.5,
      o.y + r,
      1.7 * o.s,
      0.9 * o.s,
      6,
      `#FFFFFF`,
      `#FFFFFF`,
    );
    let c = Ye(o.x, o.y + r, o.z, s),
      l = c(0, 0, -2.2 * o.s);
    (t.box(
      l[0],
      l[1] - 1.2 * o.s,
      l[2],
      2.6 * o.s,
      2.6 * o.s,
      5 * o.s,
      s,
      `#F2F4FB`,
      `#FFFFFF`,
    ),
      i.push({
        p: new m(...c(0, 0.1 * o.s, 0.6 * o.s)),
        yaw: s,
        s: o.s,
        w: 0.9 + ((e.seed >> a) % 7) / 14,
        ph: a * 1.7,
      }));
  }
  let a = H();
  for (let e = 0; e < 3; e++) {
    let t = (e / 3) * Math.PI * 2;
    a.beam([0, 0, 0], [Math.cos(t) * 21, Math.sin(t) * 21, 0], 1.1, `#FFFFFF`);
  }
  a.box(0, -1, 0, 2, 2, 2, 0, e.accent, e.accent);
  let o = Ze(a, Math.max(1, i.length), `mark:rotors`);
  o.count = i.length;
  let s = (e) => {
    (i.forEach((t, n) => {
      (ot.setFromAxisAngle(it, t.yaw),
        U.setFromAxisAngle(at, e * t.w + t.ph),
        o.setMatrixAt(
          n,
          Qe.compose(t.p, $e.copy(ot).multiply(U), tt.setScalar(t.s)),
        ));
    }),
      (o.instanceMatrix.needsUpdate = !0));
  };
  return (
    s(0),
    {
      object: o,
      update: (e) => s(e),
      dispose() {
        o.geometry.dispose();
      },
    }
  );
}
var lt = null;
function ut(e, n) {
  let r = 95 * e.s;
  for (let t = 0; t < 6; t++) {
    let i = t / 6,
      a = (t + 1) / 6;
    n.prism(
      e.x,
      e.z,
      e.y - 0.5 + i * r,
      e.y + a * r,
      4 * e.s * (1 - i * 0.72),
      4 * e.s * (1 - a * 0.72),
      4,
      t % 2 ? `#FFFFFF` : e.accent,
      void 0,
      0,
      Math.PI / 4,
    );
  }
  (n.beam(
    [e.x, e.y + r, e.z],
    [e.x, e.y + r + 10 * e.s, e.z],
    0.5 * e.s,
    `#FFFFFF`,
  ),
    (lt ??= new t({ color: `#FF3B4E`, fog: !1 })));
  let i = new z(0),
    a = 1.6 * e.s,
    o = [
      [a, 0, 0],
      [0, 0, a],
      [-a, 0, 0],
      [0, 0, -a],
    ];
  for (let e = 0; e < 4; e++)
    (i.tri(o[e], o[(e + 1) % 4], [0, a, 0], `#FFFFFF`, [0, 0, 0]),
      i.tri(o[e], o[(e + 1) % 4], [0, -a, 0], `#FFFFFF`, [0, 0, 0]));
  let s = new p(i.build(!1), lt);
  (s.position.set(e.x, e.y + r + 10 * e.s, e.z), (s.name = `mark:mast-light`));
  let c = (e.seed % 1e3) / 1e3;
  return {
    object: s,
    update: (e) => {
      s.visible = (e * 0.75 + c) % 1 < 0.35;
    },
    dispose() {
      s.geometry.dispose();
    },
  };
}
var dt = [
    [0.7, 0],
    [2.8, 1.3],
    [6.2, 5.2],
    [7.4, 9],
    [6.8, 12.4],
    [4.6, 14.8],
    [0.01, 16],
  ],
  ft = [
    [`#FF7FAE`, `#FFFFFF`],
    [`#FFD35C`, `#FF8F6B`],
    [`#7FD8F2`, `#FFFFFF`],
    [`#A98BFF`, `#FFE08A`],
    [`#7FE0B0`, `#FFFFFF`],
    [`#FF9F5A`, `#FFE9A8`],
  ];
function pt(e) {
  let t = new i(),
    n = [];
  (e.pts ?? []).forEach((r, i) => {
    let a = H(),
      [o, s] = ft[(e.seed + i * 3) % ft.length],
      c = r.s,
      l = (e, t) => {
        let [n, r] = dt[e],
          i = (t / 10) * Math.PI * 2;
        return [Math.cos(i) * n * c, r * c, Math.sin(i) * n * c];
      };
    for (let e = 0; e < dt.length - 1; e++)
      for (let t = 0; t < 10; t++)
        a.quad(
          l(e, t),
          l(e, t + 1),
          l(e + 1, t + 1),
          l(e + 1, t),
          t % 2 ? o : s,
          [0, 8 * c, 0],
        );
    a.box(0, -4.4 * c, 0, 2.4 * c, 1.8 * c, 2.4 * c, 0, `#C98A5A`, `#B27448`);
    for (let [e, t] of [
      [1, 1],
      [-1, 1],
      [-1, -1],
      [1, -1],
    ])
      a.beam(
        [e * 1.1 * c, -2.6 * c, t * 1.1 * c],
        [e * 0.6 * c, 0, t * 0.6 * c],
        0.12 * c,
        `#8A6A5A`,
      );
    let u = Xe(a, `mark:balloon`);
    (t.add(u),
      n.push({
        mesh: u,
        base: new m(r.x, r.y, r.z),
        ph: i * 2.1 + (e.seed % 17),
        r: 10 + ((i * 7) % 9),
      }));
  });
  let r = (e, t) => {
    n.forEach((n, r) => {
      n.mesh.visible = !t || r < 2;
      let i = e * 0.05 + n.ph;
      (n.mesh.position.set(
        n.base.x + Math.cos(i) * n.r,
        n.base.y + Math.sin(e * 0.35 + n.ph) * 2.4,
        n.base.z + Math.sin(i) * n.r,
      ),
        (n.mesh.rotation.y = e * 0.03 + n.ph));
    });
  };
  return (
    r(0, !1),
    {
      object: t,
      update: r,
      dispose() {
        for (let e of n) e.mesh.geometry.dispose();
      },
    }
  );
}
function mt(e, t) {
  let n = H(),
    r = 6.6,
    i = (e, t) => {
      let n = -22 + (44 * e) / 8,
        i = r * Math.sqrt(Math.max(0.004, 1 - (n / 22) ** 2)),
        a = (t / 10) * Math.PI * 2;
      return [n, Math.cos(a) * i, Math.sin(a) * i];
    };
  for (let t = 0; t < 8; t++) {
    let r = t === 3 || t === 4;
    for (let a = 0; a < 10; a++)
      n.quad(
        i(t, a),
        i(t, a + 1),
        i(t + 1, a + 1),
        i(t + 1, a),
        r ? e.accent : e.col,
        [0, 0, 0],
      );
  }
  for (let [t, i] of [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ]) {
    let a = [-20.9, t * r * 1.1, i * r * 1.1];
    n.beam([-13.64, t * r * 0.35, i * r * 0.35], a, 1.6, e.accent);
  }
  n.box(0, -8.2, 0, 8, 1.8, 2.6, 0, `#F4F4FA`, e.accent);
  let a = Xe(n, `mark:blimp`),
    o = e.orbit ?? 300,
    s = e.alt ?? 90,
    c = Math.atan2(e.x - t.cx, e.z - t.cz),
    l = 5.5 / o,
    u = (e) => {
      let n = c + e * l;
      (a.position.set(
        t.cx + Math.sin(n) * o,
        t.floorY + s + Math.sin(e * 0.2) * 1.5,
        t.cz + Math.cos(n) * o,
      ),
        a.rotation.set(0, n, Math.sin(e * 0.3) * 0.03));
    };
  return (
    u(0),
    {
      object: a,
      update: (e) => u(e),
      dispose() {
        a.geometry.dispose();
      },
    }
  );
}
var ht = {
  T: [`11111`, `00100`, `00100`, `00100`, `00100`, `00100`, `00100`],
  A: [`01110`, `10001`, `10001`, `11111`, `10001`, `10001`, `10001`],
  I: [`111`, `010`, `010`, `010`, `010`, `010`, `111`],
  L: [`10000`, `10000`, `10000`, `10000`, `10000`, `10000`, `11111`],
  G: [`01110`, `10001`, `10000`, `10111`, `10001`, `10001`, `01111`],
  R: [`11110`, `10001`, `10001`, `11110`, `10100`, `10010`, `10001`],
  B: [`11110`, `10001`, `10001`, `11110`, `10001`, `10001`, `11110`],
};
function gt(e, t, n) {
  let r = e.hill === void 0 ? null : n.hills[e.hill],
    i = 2.1 * e.s,
    a = 3.4 * e.s,
    o = 1.4 * e.s,
    s = [
      `#FF6FA3`,
      `#FFC94D`,
      `#4FC9E8`,
      `#9B7BFF`,
      `#FF8F5A`,
      `#5FD39A`,
      `#FF6FA3`,
      `#FFC94D`,
    ],
    c = `TAILGRAB`,
    l = [...c].map((e) => ht[e][0].length),
    u = -(l.reduce((e, t) => e + t, 0) + 7) / 2,
    d = Math.cos(e.yaw),
    f = Math.sin(e.yaw);
  for (let [n, p] of [...c].entries()) {
    let c = ht[p],
      m = s[(n + e.seed) % s.length],
      h = (u + l[n] / 2) * i,
      g = e.x + h * d,
      _ = e.z - h * f,
      v = e.y + (r ? Math.max(0, y(r, g, _)) : 0) - 0.8 * e.s,
      b = ``,
      x = 0,
      S = (n, r, s) => {
        if (s)
          for (let l of s.split(`;`)) {
            let [s, p] = l.split(`,`).map(Number),
              h = (u + s) * i,
              g = (u + p + 1) * i,
              _ = (h + g) / 2,
              y = v + (c.length - r - 1) * a;
            t.box(
              e.x + _ * d,
              y,
              e.z - _ * f,
              g - h,
              (r - n + 1) * a,
              o,
              e.yaw,
              m,
              `#FFFFFF`,
              1,
            );
          }
      };
    (c.forEach((e, t) => {
      let n = [];
      for (let t = 0; t < e.length; t++) {
        if (e[t] !== `1`) continue;
        let r = t;
        for (; r + 1 < e.length && e[r + 1] === `1`;) r++;
        (n.push(`${t},${r}`), (t = r));
      }
      let r = n.join(`;`);
      if (t === 0) {
        ((b = r), (x = 0));
        return;
      }
      r !== b && (S(x, t - 1, b), (b = r), (x = t));
    }),
      S(x, c.length - 1, b),
      (u += l[n] + 1));
  }
  return { object: null, dispose() {} };
}
var _t = null;
function vt(e, n) {
  let r = e.s,
    i = 24 * r,
    a = e.y;
  n.box(e.x, a - 0.5, e.z, 9 * r, 4.2 * r, 7 * r, e.yaw, `#F4F1EA`, e.accent);
  for (let t = 0; t < 4; t++) {
    let o = t / 4,
      s = (t + 1) / 4;
    n.prism(
      e.x,
      e.z,
      a - 0.5 + o * i,
      a + s * i,
      3.2 * r - o * 1 * r,
      3.2 * r - s * 1 * r,
      8,
      t % 2 ? e.accent : `#FFFFFF`,
    );
  }
  (n.prism(
    e.x,
    e.z,
    a + i,
    a + i + 0.7 * r,
    3.1 * r,
    3.1 * r,
    8,
    `#3B2C4F`,
    `#E8E4F4`,
  ),
    n.prism(
      e.x,
      e.z,
      a + i + 0.7 * r,
      a + i + 3.6 * r,
      1.8 * r,
      1.8 * r,
      8,
      `#FFF3B0`,
      void 0,
      1,
    ),
    n.prism(
      e.x,
      e.z,
      a + i + 3.6 * r,
      a + i + 3.9 * r,
      2.2 * r,
      2.2 * r,
      8,
      e.accent,
      e.accent,
    ),
    n.cone(e.x, e.z, a + i + 3.9 * r, 2.4 * r, 2.2 * r, 8, e.accent),
    (_t ??= new t({
      color: `#FFE9B0`,
      vertexColors: !0,
      transparent: !0,
      depthWrite: !1,
      blending: 2,
      side: 2,
      forceSinglePass: !0,
      fog: !1,
    })));
  let o = new d(),
    s = [],
    l = [];
  for (let e of [150, -150])
    (s.push(0, 0, 0, e, -8, 0, e, 8, 0, 0, 0, 0, e, 0, -8, e, 0, 8),
      l.push(1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0));
  (o.setAttribute(`position`, new c(new Float32Array(s), 3)),
    o.setAttribute(`color`, new c(new Float32Array(l), 3)));
  let u = new p(o, _t);
  return (
    u.position.set(e.x, a + i + 2.2 * r, e.z),
    (u.name = `mark:lighthouse-beam`),
    (u.renderOrder = 2),
    {
      object: u,
      update: (e) => {
        let t = Math.max(0, O.uLamps.value - 0.6) / 0.4;
        ((u.visible = t > 0),
          (_t.opacity = 0.35 * t),
          u.rotation.set(0, e * 0.5, 0));
      },
      dispose() {
        o.dispose();
      },
    }
  );
}
function yt(e, t, n) {
  let r = H();
  (r.box(0, -0.6, 0, 8, 1.8, 3, 0, `#FFFFFF`, `#E9E4F2`),
    r.box(-1, 1.2, 0, 3, 1.4, 2.2, 0, `#FFFFFF`, `#FFFFFF`),
    r.beam([1, 1.2, 0], [1, 10, 0], 0.3, `#8A7A9A`),
    r.tri([1.2, 1.8, 0], [1.2, 9.6, 0], [5.4, 1.8, 0], `#FFFFFF`, [1.2, 3, -1]),
    r.tri([1.2, 1.8, 0], [1.2, 9.6, 0], [5.4, 1.8, 0], `#FFFFFF`, [1.2, 3, 1]));
  let i = e.pts ?? [],
    a = Ze(r, Math.max(1, i.length), `mark:boats`),
    o = [`#FFD1E0`, `#FFF1B8`, `#CFEFFF`, `#E2D6FF`, `#FFE0C8`];
  i.forEach((t, n) => a.setColorAt(n, nt.set(o[(e.seed + n) % o.length])));
  let s = n.sea,
    c = s
      ? (() => {
          let e = D(t, s),
            n = e.at(0, 100),
            r = e.at(100, 100);
          return new m(r.x - n.x, 0, r.z - n.z).normalize();
        })()
      : new m(1, 0, 0),
    l = Math.atan2(c.x, c.z) - Math.PI / 2,
    u = (t, n) => {
      ((a.count = n ? Math.min(2, i.length) : i.length),
        i.forEach((n, r) => {
          let i = r * 1.9 + (e.seed % 13),
            o = Math.sin(t * 0.02 + i) * 30;
          (et.set(
            n.x + c.x * o,
            n.y + Math.sin(t * 0.9 + i) * 0.18,
            n.z + c.z * o,
          ),
            $e.setFromAxisAngle(
              it,
              l + (Math.cos(t * 0.02 + i) > 0 ? 0 : Math.PI),
            ),
            U.setFromAxisAngle(rt, Math.sin(t * 0.7 + i) * 0.05),
            a.setMatrixAt(
              r,
              Qe.compose(et, $e.multiply(U), tt.setScalar(n.s)),
            ));
        }),
        (a.instanceMatrix.needsUpdate = !0));
    };
  return (
    u(0, !1),
    {
      object: a,
      update: u,
      dispose() {
        a.geometry.dispose();
      },
    }
  );
}
function bt(e, t, n, r) {
  switch (e.kind) {
    case `ferris`:
      return st(e, t);
    case `turbines`:
      return ct(e, t, n);
    case `mast`:
      return ut(e, t);
    case `balloons`:
      return pt(e);
    case `blimp`:
      return mt(e, n);
    case `sign`:
      return gt(e, t, r);
    case `lighthouse`:
      return vt(e, t);
    case `boats`:
      return yt(e, n, r);
  }
}
var W = Math.PI / 180,
  xt = (e, t, n) => e + (t - e) * n,
  G = (e) => Math.max(0, Math.min(1, e)),
  St = (e) => e * e * (3 - 2 * e),
  K = (e, t, n) => t + (n - t) * e(),
  q = (e, t) => t[Math.floor(e() * t.length) % t.length];
function Ct(e, t) {
  let n = t.map(([t]) => Array.from({ length: t }, () => e())),
    r = t.reduce((e, [, t]) => e + t, 0);
  return (e) => {
    let i = 0;
    return (
      t.forEach(([t, r], a) => {
        let o = ((((e / 360) * t) % t) + t) % t,
          s = Math.floor(o),
          c = n[a];
        i += r * xt(c[s], c[(s + 1) % t], St(o - s));
      }),
      i / r
    );
  };
}
var wt = {
    hills: [
      {
        near: [`#A6DB9C`, `#98D197`, `#B3E2A5`],
        nearTop: `#CFF0BC`,
        ground: `#A9DB9C`,
        mid: [`#8FCBB0`, `#B8E5C6`],
        far: [`#A4B3E6`, `#C9D0F3`],
        pine: [`#5FAF8A`, `#6DBB93`],
      },
      {
        near: [`#B7DF9B`, `#A9D690`, `#C6E7AA`],
        nearTop: `#E6F4BF`,
        ground: `#B5DC9C`,
        mid: [`#9FCB9F`, `#C6E6B5`],
        far: [`#B8A9E2`, `#D8CEF2`],
        pine: [`#63A983`, `#79B98C`],
      },
      {
        near: [`#9ED9B1`, `#8FCFA6`, `#AFE1BD`],
        nearTop: `#D3F2DA`,
        ground: `#A3DAAE`,
        mid: [`#86C2BC`, `#B1DDD6`],
        far: [`#9EB9E8`, `#C4D6F4`],
        pine: [`#4FA489`, `#5DB394`],
      },
    ],
    peaks: [
      {
        near: [`#A6D69E`, `#99CD99`, `#B2DDA6`],
        nearTop: `#C9BFE3`,
        ground: `#A8D6A0`,
        mid: [`#8E98D6`, `#B4B6E8`],
        far: [`#A9A3E4`, `#CBC6F2`],
        pine: [`#5A9F87`, `#6AAE8E`],
      },
      {
        near: [`#9FD3A8`, `#92C99E`, `#ACDAB3`],
        nearTop: `#BFD0EA`,
        ground: `#A1D3A6`,
        mid: [`#7FA3D6`, `#A9C1EA`],
        far: [`#9CB1E6`, `#C3D0F3`],
        pine: [`#4E9A85`, `#5DA98D`],
      },
    ],
    mesa: [
      {
        near: [`#F2A48E`, `#F6BE98`, `#EE9A8A`],
        nearTop: `#FBE0BE`,
        ground: `#EFCB9C`,
        mid: [`#E3A08F`, `#F2C3A6`],
        far: [`#D6A2CC`, `#E9C6E0`],
        pine: [`#8DBB82`, `#9CC68A`],
      },
      {
        near: [`#E9A0A6`, `#F1B7A2`, `#E48E98`],
        nearTop: `#FAD9C2`,
        ground: `#F1D0A6`,
        mid: [`#D995A6`, `#EDB9C0`],
        far: [`#B9A2DC`, `#D6C6EE`],
        pine: [`#90BD86`, `#A0C88E`],
      },
    ],
    pines: [
      {
        near: [`#9FD39A`, `#92CB95`, `#ACD9A3`],
        nearTop: `#C4E8B4`,
        ground: `#9CCF98`,
        mid: [`#5FA892`, `#86C2AE`],
        far: [`#95A3DA`, `#BCC6EE`],
        pine: [`#4F9E86`, `#5FAF8C`, `#3F917F`],
      },
      {
        near: [`#A8D69A`, `#9ACD91`, `#B6DEA5`],
        nearTop: `#D0EABA`,
        ground: `#A6D39A`,
        mid: [`#6AAE8B`, `#92C9A5`],
        far: [`#A99FDC`, `#CCC4F0`],
        pine: [`#58A07F`, `#67AE87`, `#4A9278`],
      },
    ],
    skyline: [
      {
        near: [`#A9DA9E`, `#9CD19A`],
        nearTop: `#C9EDB9`,
        ground: `#B2D9A6`,
        mid: [`#B7B4E6`, `#D3D0F3`],
        far: [`#A6B6E6`, `#CAD4F3`],
        pine: [`#5FAF8A`, `#6DBB93`],
      },
      {
        near: [`#ADDBA0`, `#A0D29B`],
        nearTop: `#CCEEBA`,
        ground: `#B5DAA8`,
        mid: [`#C4B2E3`, `#DDD0F1`],
        far: [`#AFB0E6`, `#D0D0F4`],
        pine: [`#63A983`, `#79B98C`],
      },
    ],
    coast: [
      {
        near: [`#A6DB9C`, `#99D29A`, `#B3E2A5`],
        nearTop: `#CFF0BC`,
        ground: `#A9DB9C`,
        mid: [`#8FC4B8`, `#B8E1D8`],
        far: [`#A2B3E6`, `#C7D1F3`],
        pine: [`#5FAF8A`, `#6DBB93`],
      },
      {
        near: [`#B4DE9C`, `#A7D594`, `#C2E6A9`],
        nearTop: `#E1F3BE`,
        ground: `#B3DB9E`,
        mid: [`#9DBFD9`, `#C2D8EC`],
        far: [`#B3A8E2`, `#D4CCF2`],
        pine: [`#63A983`, `#79B98C`],
      },
    ],
  },
  Tt = [
    `#F4A9C0`,
    `#B5ACEB`,
    `#9FD3EC`,
    `#FFD58A`,
    `#B9E6A6`,
    `#F7B996`,
    `#D3B6EE`,
  ],
  Et = [
    [`#9E97DC`, `#7B72C8`],
    [`#8FB0E4`, `#6C8ED2`],
    [`#B597DC`, `#9274C8`],
    [`#879FDA`, `#6781C6`],
    [`#A9B9E8`, `#8496D4`],
    [`#D6A3CE`, `#B67FB0`],
    [`#9CCDE0`, `#74AFC8`],
  ],
  J = `#F5E2B4`,
  Dt = [`#FFFFFF`, `#FFF7F2`, `#F5F2FF`],
  Ot = [`#FF6FA3`, `#FFD35C`, `#6FD3F2`, `#9B7BFF`, `#FF9F5A`, `#5FD39A`];
function Y(e, t, n, r) {
  if (
    S(e.ctx.rect, t, n) < 40 + r ||
    Math.hypot(t - e.ctx.cx, n - e.ctx.cz) > e.markMax - r
  )
    return !1;
  if (!e.frame) return !0;
  let i = Math.atan2(t - e.ctx.cx, -(n - e.ctx.cz)) / W;
  return (
    e.frame.s(t, n) < -(e.beach + r) && Math.abs(oe(i, e.spec.sea.bearing)) > At
  );
}
var kt = 1.25,
  At = 50;
function jt(e) {
  let t = Math.min(e.rect.x1 - e.rect.x0, e.rect.z1 - e.rect.z0) / 2,
    n = Math.atan2(Math.max(0, e.wallH - 2.5), t) / W;
  return 1 + Math.max(0, n - 3) / 20;
}
function Mt(e, t, n, r, i, a, o) {
  let s = e.R,
    c = q(s, a.shapes),
    l = a.aspect ? K(s, a.aspect[0], a.aspect[1]) : K(s, 0.65, 1),
    u = K(s, a.elev[0], a.elev[1]),
    d =
      o * (c === `peak` ? 1.5 : c === `mesa` ? 1 : c === `dune` ? 0.35 : 0.85),
    f = Math.max(4, Math.min(d, r * Math.tan(u * W) + 2.5));
  return {
    x: t,
    z: n,
    rx: o,
    rz: o * l,
    yaw: -i * W + (s() - 0.5) * 0.5,
    h: f,
    shape: c,
    seg: Math.round(K(s, a.seg?.[0] ?? 8, a.seg?.[1] ?? 12)),
    rings:
      c === `mesa` ? 4 : Math.round(K(s, a.rings?.[0] ?? 3, a.rings?.[1] ?? 4)),
    col: q(s, a.cols),
    top: a.top,
    snow: a.snow ?? 2,
    bands: a.bands ? [...a.bands] : void 0,
    sand: a.sand,
    seed: Math.floor(s() * 1e9),
  };
}
function X(e, t) {
  let n = e.R,
    r = n() * 360;
  for (let i = 0; i < t.n; i++) {
    let a = r + (i / t.n) * 360 + (n() - 0.5) * (300 / t.n),
      o = K(n, t.r[0], t.r[1]),
      s = Math.max(40 + o * kt, K(n, t.d[0], t.d[1])),
      c = E(e.ctx, a, s);
    Y(e, c.x, c.z, o * 0.6) && e.spec.hills.push(Mt(e, c.x, c.z, c.t, a, t, o));
  }
}
function Nt(e, t, n, r, i, a) {
  let o = e.R;
  for (let s = 0; s < r; s++) {
    let r = E(e.ctx, t + (o() - 0.5) * i, Math.max(42, n + (o() - 0.5) * 40));
    if (!Y(e, r.x, r.z, 2)) continue;
    let s = 0;
    for (let t of e.spec.hills) s = Math.max(s, y(t, r.x, r.z));
    let c = K(o, a[0], a[1]);
    e.spec.pines.push({
      x: r.x,
      y: e.ctx.floorY + s - 0.6,
      z: r.z,
      h: c,
      r: c * K(o, 0.26, 0.34),
      col: q(o, e.pal.pine),
    });
  }
}
function Z(e, t, n, r, i = [9, 20]) {
  let a = e.R;
  for (let o = 0; o < t; o++)
    Nt(
      e,
      a() * 360,
      K(e.R, r[0], r[1]),
      Math.round(K(a, n[0], n[1])),
      K(a, 8, 22),
      i,
    );
}
function Pt(e, t) {
  let n = e.R;
  for (let r = 0; r < t; r++) {
    let t = n() * 360,
      r = K(n, 9, 18),
      i = K(n, 8, 14),
      a = K(n, 44 + r / 2, 170),
      o = E(e.ctx, t, a);
    if (!Y(e, o.x, o.z, r / 2)) continue;
    let s = q(n, Tt);
    e.spec.blocks.push({
      x: o.x,
      z: o.z,
      w: r,
      d: i,
      h: K(n, 5, 8) + (a / 170) * K(n, 0, 14),
      yaw: -t * W,
      col: s,
      roof: n() < 0.35 ? `pitched` : `flat`,
    });
  }
}
var Ft = { hills: 2.5, peaks: 1.5, mesa: 1.5, pines: 1 },
  It = {
    hills: [
      [5, 0.6],
      [11, 0.3],
      [23, 0.1],
    ],
    peaks: [
      [7, 0.5],
      [15, 0.3],
      [33, 0.2],
    ],
    mesa: [
      [6, 0.7],
      [14, 0.3],
    ],
    pines: [
      [4, 0.6],
      [9, 0.4],
    ],
  };
function Q(e, t, n, r, i, a = {}) {
  let o = e.R,
    s = a.from ?? 0,
    c = a.to ?? 360,
    l = Math.max(2, Math.round((c - s) / Ft[t]) + 1),
    u = (c - s) / (l - 1),
    d = Ct(o, It[t]),
    f = r[0] * e.boost,
    p = r[1] * e.boost,
    m = [];
  for (let e = 0; e < l; e++) {
    let r = s + e * u,
      i = G((d(r) - 0.2) / 0.6),
      c;
    ((c =
      t === `hills`
        ? St(i)
        : t === `peaks`
          ? G(i ** 1.5 + (o() - 0.5) * 0.14)
          : t === `mesa`
            ? i > 0.55
              ? 0.82 + 0.18 * i
              : 0.18 + 0.25 * i
            : 0.3 + 0.7 * St(i) + (e % 2 ? 0 : 0.4 / Math.max(1, p - f))),
      m.push((f + (p - f) * c) * (a.fade ? a.fade(r, n) : 1)));
  }
  return {
    kind: t,
    r: n,
    from: s,
    to: c,
    step: u,
    elev: m,
    col: i[0],
    top: i[1],
    snow: a.snow ?? 2,
    haze: a.haze ?? 0.25,
    seed: Math.floor(o() * 1e9),
  };
}
function Lt(e, t, n, r) {
  let i = e.R,
    a = e.spec;
  for (let o = 0; o < r; o++) {
    let r = (i() + i()) / 2 - 0.5,
      o = t + r * n,
      s = e.R0 * K(i, 1.02, 1.35),
      c = 1 - Math.abs(r) * 1.2,
      l = K(i, 2, 5) + c * K(i, 0, 6) + (i() < 0.12 ? K(i, 3, 6) : 0),
      u = s * Math.tan(l * e.boost * W),
      [d, f] = q(i, Et);
    a.towers.push({
      bearing: o,
      r: s,
      w: K(i, 24, 64),
      h: u,
      tiers: l > 7 ? 2 + +(i() < 0.4) : 1,
      col: d,
      roof: f,
      antenna: i() < 0.35,
      haze: K(i, 0.1, 0.28),
    });
  }
  a.towers.sort((e, t) => t.r - e.r);
}
function Rt(e, t) {
  let n = e.R;
  for (let r = 0; r < t; r++) {
    let t = K(n, 5, 14),
      r = 5 + Math.floor(n() * 7),
      i = Array.from({ length: r }, () => {
        let e = (n() - 0.5) * 2 * t,
          r = K(n, 1, 2.8) * (1 - (Math.abs(e) / t) * 0.55);
        return { a: e, e: r * K(n, 0, 0.35), r };
      });
    e.spec.banks.push({
      bearing: n() * 360,
      elev: K(n, 1.2, 4),
      puffs: i,
      col: q(n, Dt),
    });
  }
}
var zt = {
    hills: [`ferris`, `turbines`, `balloons`, `sign`, `mast`, `blimp`],
    peaks: [`mast`, `balloons`, `blimp`, `sign`, `turbines`],
    mesa: [`turbines`, `mast`, `balloons`, `blimp`, `sign`],
    pines: [`mast`, `balloons`, `sign`, `blimp`, `turbines`],
    skyline: [`ferris`, `blimp`, `mast`, `balloons`],
    coast: [`ferris`, `blimp`, `balloons`],
  },
  Bt = [`mast`, `blimp`, `balloons`, `ferris`];
function Vt(e, t) {
  let n = e.R,
    r = [...zt[t]];
  e.ctx.wallH >= 5 && (r = r.filter((e) => Bt.includes(e)));
  let i = t === `coast` ? +(n() < 0.5) : 1 + Math.floor(n() * 2.2),
    a = [];
  for (; a.length < i && r.length;)
    a.push(r.splice(Math.floor(n() * r.length), 1)[0]);
  return (t === `coast` && a.push(`lighthouse`, `boats`), a);
}
function Ht(e, t, n, r) {
  let i = null;
  for (let a = 0; a < 60; a++) {
    let a = e.R() * 360;
    if (r(a)) {
      if (t.every((e) => Math.abs(oe(a, e)) >= n)) return a;
      i ??= a;
    }
  }
  return i;
}
function Ut(e, t, n) {
  let { R: r, ctx: i, spec: a } = e,
    o = [],
    s = i.wallH >= 5 ? 1.35 : 1,
    c = (t, n, r) => {
      let a = E(i, t, n);
      return Y(e, a.x, a.z, r);
    };
  t.forEach((t) => {
    let l =
        a.marks.length === 0 &&
        n !== void 0 &&
        t !== `lighthouse` &&
        t !== `boats`,
      u = (t, i) => {
        if (l)
          for (let e = 0; e < 16; e++) {
            let e = n + (r() - 0.5) * 44;
            if (c(e, t, i)) return e;
          }
        return Ht(e, o, 55, (e) => c(e, t, i));
      },
      d = q(r, Ot),
      f = (e, n, a = {}) => {
        let s = E(i, e, n);
        return (
          o.push(e),
          {
            kind: t,
            x: s.x,
            y: i.floorY,
            z: s.z,
            yaw: Math.atan2(i.cx - s.x, i.cz - s.z),
            s: 1,
            seed: Math.floor(r() * 1e9),
            col: `#FFFFFF`,
            accent: d,
            ...a,
          }
        );
      };
    if (t === `ferris`) {
      let e = K(r, 80, 160),
        t = u(e, 40);
      t !== null &&
        a.marks.push(
          f(t, e, {
            s: K(r, 0.95, 1.2) * s,
            col: q(r, [`#FFFFFF`, `#FFE9F1`, `#EEF0FF`]),
          }),
        );
    } else if (t === `mast`) {
      let e = K(r, 110, 240),
        t = u(e, 12);
      t !== null &&
        a.marks.push(
          f(t, e, {
            s: K(r, 0.9, 1.25) * s,
            col: `#FFFFFF`,
            accent: `#FF6F7D`,
          }),
        );
    } else if (t === `turbines`) {
      let t = K(r, 150, 300),
        n = u(t, 20);
      if (n === null) return;
      let o = f(n, t, { col: `#FFFFFF`, accent: `#E9ECF8` });
      o.pts = [];
      let s = 3 + Math.floor(r() * 5),
        c = K(r, 16, 34);
      for (let a = 0; a < s; a++) {
        let l = E(
          i,
          n + (a / Math.max(1, s - 1) - 0.5) * c + (r() - 0.5) * 3,
          t + (r() - 0.5) * 90,
        );
        Y(e, l.x, l.z, 10) &&
          o.pts.push({ x: l.x, y: i.floorY, z: l.z, s: K(r, 0.85, 1.15) });
      }
      o.pts.length && a.marks.push(o);
    } else if (t === `balloons`) {
      let t = l ? n + (r() - 0.5) * 30 : Ht(e, o, 40, () => !0),
        c = f(t, 120);
      c.pts = [];
      let u = 2 + Math.floor(r() * 3);
      for (let e = 0; e < u; e++) {
        let e = E(i, t + (r() - 0.5) * 50, K(r, 30, 200));
        c.pts.push({
          x: e.x,
          y: i.floorY + K(r, 32, 90) * s,
          z: e.z,
          s: K(r, 0.85, 1.2),
        });
      }
      a.marks.push(c);
    } else if (t === `blimp`) {
      let t = f(l ? n : Ht(e, o, 40, () => !0), 150, {
        alt: K(r, 75, 110) * s,
        orbit: Math.min(e.markMax - 40, i.diag + K(r, 140, 280)),
        col: q(r, [`#FFE27A`, `#DDE3F2`, `#FFB7CF`]),
        accent: q(r, [`#7A6FE0`, `#FF6FA3`, `#3FB6E0`]),
      });
      a.marks.push(t);
    } else if (t === `sign`) {
      let n = Math.max(42 + 40 * kt, K(r, 85, 125)),
        c = u(n, 60);
      if (c === null) return;
      let l = E(i, c, n);
      if (!Y(e, l.x, l.z, 40)) return;
      let f = {
        x: l.x,
        z: l.z,
        rx: 78,
        rz: 40,
        yaw: -c * W,
        h: Math.min(34, l.t * Math.tan(7 * W) + 6),
        shape: `dome`,
        seg: 14,
        rings: 4,
        col: q(r, e.pal.near),
        top: e.pal.nearTop,
        snow: 2,
        seed: Math.floor(r() * 1e9),
      };
      a.hills.push(f);
      let p = de(f, 0, f.rz * 0.5);
      (o.push(c),
        a.marks.push({
          kind: t,
          x: p.x,
          y: i.floorY,
          z: p.z,
          yaw: Math.atan2(i.cx - p.x, i.cz - p.z),
          s,
          seed: Math.floor(r() * 1e9),
          col: `#FFFFFF`,
          accent: d,
          hill: a.hills.length - 1,
        }));
    } else if (t === `lighthouse` && e.frame) {
      let n = e.frame,
        o = Math.min(170, n.latMax * 0.6),
        c = (r() < 0.5 ? -1 : 1) * K(r, 50, o),
        l = n.at(c, -4);
      for (
        ;
        Math.hypot(l.x - i.cx, l.z - i.cz) > e.markMax - 30 && Math.abs(c) > 10;
      )
        ((c *= 0.8), (l = n.at(c, -4)));
      a.marks.push({
        kind: t,
        x: l.x,
        y: i.floorY,
        z: l.z,
        yaw: Math.atan2(i.cx - l.x, i.cz - l.z),
        s: K(r, 0.95, 1.2) * s,
        seed: Math.floor(r() * 1e9),
        col: `#FFFFFF`,
        accent: `#FF6F7D`,
      });
    } else if (t === `boats` && e.frame) {
      let n = e.frame,
        o = Math.min(260, n.latMax * 0.6),
        s = {
          kind: t,
          x: 0,
          y: i.floorY,
          z: 0,
          yaw: 0,
          s: 1,
          seed: Math.floor(r() * 1e9),
          col: `#FFFFFF`,
          accent: d,
          pts: [],
        },
        c = 2 + Math.floor(r() * 4);
      for (let t = 0; t < c * 4 && s.pts.length < c; t++) {
        let t = n.at((r() - 0.5) * 2 * o, K(r, 40, 320));
        Math.hypot(t.x - i.cx, t.z - i.cz) < e.markMax - 20 &&
          s.pts.push({ x: t.x, y: i.floorY, z: t.z, s: K(r, 0.8, 1.3) });
      }
      s.pts.length && ((s.x = s.pts[0].x), (s.z = s.pts[0].z), a.marks.push(s));
    }
  });
}
var Wt = {
  hills(e) {
    let { R: t, pal: n } = e;
    (X(e, {
      n: 14 + Math.floor(t() * 6),
      d: [42, 110],
      r: [30, 68],
      elev: [2.5, 6],
      shapes: [`dome`],
      cols: n.near,
      top: n.nearTop,
    }),
      X(e, {
        n: 10 + Math.floor(t() * 5),
        d: [110, 230],
        r: [45, 95],
        elev: [4, 8],
        shapes: [`dome`],
        cols: n.near,
        top: n.nearTop,
      }),
      Z(e, 3 + Math.floor(t() * 4), [5, 12], [44, 150]),
      e.spec.ranges.push(
        Q(e, `hills`, e.R0, [2.5, 5.5], n.mid, { haze: 0.15 }),
      ),
      e.spec.ranges.push(
        Q(e, t() < 0.5 ? `hills` : `peaks`, e.R0 * 1.45, [4, 8.5], n.far, {
          snow: 0.82,
          haze: 0.3,
        }),
      ));
  },
  peaks(e) {
    let { R: t, pal: n } = e;
    (X(e, {
      n: 13 + Math.floor(t() * 5),
      d: [42, 120],
      r: [30, 65],
      elev: [2.5, 6],
      shapes: [`dome`],
      cols: n.near,
      top: n.near[0],
    }),
      X(e, {
        n: 6 + Math.floor(t() * 4),
        d: [120, 230],
        r: [40, 80],
        elev: [5, 10],
        shapes: [`peak`],
        cols: n.near,
        top: n.nearTop,
        snow: 0.8,
      }),
      Z(e, 3 + Math.floor(t() * 3), [5, 12], [44, 140]),
      e.spec.ranges.push(Q(e, `hills`, e.R0, [3, 6.5], n.mid, { haze: 0.15 })),
      e.spec.ranges.push(
        Q(e, `peaks`, e.R0 * 1.4, [7, 15], n.far, { snow: 0.62, haze: 0.28 }),
      ),
      e.spec.ranges.push(
        Q(e, `peaks`, e.R0 * 2, [9, 19], [n.far[1], `#E4E2F8`], {
          snow: 0.74,
          haze: 0.45,
        }),
      ));
  },
  mesa(e) {
    let { R: t, pal: n } = e;
    (X(e, {
      n: 8 + Math.floor(t() * 5),
      d: [42, 120],
      r: [30, 60],
      elev: [1.5, 3.5],
      shapes: [`dome`],
      aspect: [0.5, 0.8],
      cols: [n.ground, n.nearTop],
      top: n.nearTop,
    }),
      X(e, {
        n: 7 + Math.floor(t() * 5),
        d: [60, 225],
        r: [28, 66],
        elev: [3, 8],
        shapes: [`mesa`],
        cols: n.near,
        top: n.nearTop,
        bands: [n.near[0], n.near[1], n.nearTop, n.near[2]],
      }),
      e.spec.ranges.push(Q(e, `mesa`, e.R0, [2, 6.5], n.mid, { haze: 0.15 })),
      e.spec.ranges.push(
        Q(e, `mesa`, e.R0 * 1.5, [3.5, 9], n.far, { haze: 0.32 }),
      ));
  },
  pines(e) {
    let { R: t, pal: n } = e;
    (X(e, {
      n: 12 + Math.floor(t() * 5),
      d: [42, 140],
      r: [35, 75],
      elev: [2, 5],
      shapes: [`dome`],
      cols: n.near,
      top: n.nearTop,
    }),
      Z(e, 9 + Math.floor(t() * 5), [7, 14], [42, 170], [10, 24]),
      e.spec.ranges.push(
        Q(e, `pines`, e.R0, [2.5, 5.5], n.mid, { haze: 0.15 }),
      ),
      e.spec.ranges.push(
        Q(e, `peaks`, e.R0 * 1.5, [6, 13], n.far, { snow: 0.6, haze: 0.32 }),
      ));
  },
  skyline(e, t) {
    let { R: n, pal: r } = e;
    (Pt(e, 24 + Math.floor(n() * 20)),
      X(e, {
        n: 6 + Math.floor(n() * 4),
        d: [150, 230],
        r: [40, 80],
        elev: [2, 4.5],
        shapes: [`dome`],
        cols: r.near,
        top: r.nearTop,
      }),
      Z(e, 2 + Math.floor(n() * 3), [4, 9], [44, 140]),
      Lt(
        e,
        (t ?? n() * 360) + (n() - 0.5) * 40,
        K(n, 160, 300),
        40 + Math.floor(n() * 30),
      ),
      e.spec.ranges.push(
        Q(e, n() < 0.5 ? `hills` : `peaks`, e.R0 * 1.7, [3, 7], r.far, {
          snow: 0.7,
          haze: 0.4,
        }),
      ));
  },
  coast(e) {
    let { R: t, pal: n, ctx: r } = e,
      i = e.frame,
      a = (e, t) => G(-i.s(r.cx + se(e) * t, r.cz + C(e) * t) / (0.35 * t));
    (X(e, {
      n: 10 + Math.floor(t() * 5),
      d: [42, 90],
      r: [26, 50],
      elev: [1, 2.5],
      shapes: [`dune`],
      aspect: [0.35, 0.6],
      cols: [J, `#EFDCAA`],
      top: `#FFF1CC`,
    }),
      X(e, {
        n: 10 + Math.floor(t() * 5),
        d: [90, 220],
        r: [40, 85],
        elev: [3, 7],
        shapes: [`dome`],
        cols: n.near,
        top: n.nearTop,
      }),
      Z(e, 2 + Math.floor(t() * 3), [4, 9], [60, 160]));
    let o = 1 + Math.floor(t() * 3),
      s = Math.min(260, i.latMax * 0.6);
    for (let a = 0; a < o; a++) {
      let a = i.at((t() - 0.5) * 2 * s, K(t, 120, 360)),
        o = Math.hypot(a.x - r.cx, a.z - r.cz),
        c = K(t, 22, 55);
      if (o > e.markMax - c) continue;
      let l = {
        n: 1,
        d: [0, 0],
        r: [c, c],
        elev: [3, 7],
        shapes: [`dome`, `peak`],
        cols: n.near,
        top: n.nearTop,
        sand: J,
      };
      e.spec.hills.push(
        Mt(e, a.x, a.z, o, Math.atan2(a.x - r.cx, -(a.z - r.cz)) / W, l, c),
      );
    }
    let c = t() < 0.5 ? `hills` : `peaks`;
    (e.spec.ranges.push(
      Q(e, c, e.R0, [2.5, 6], n.mid, { haze: 0.15, fade: a }),
    ),
      e.spec.ranges.push(
        Q(e, `peaks`, e.R0 * 1.5, [5, 12], n.far, {
          snow: 0.65,
          haze: 0.3,
          fade: a,
        }),
      ));
    for (let r = 0; r < 2 + Math.floor(t() * 3); r++) {
      let r = e.spec.sea.bearing + (t() - 0.5) * 70,
        i = e.R0 * K(t, 1.05, 1.6),
        o = K(t, 4, 12);
      a(r, i) > 0.05 ||
        e.spec.ranges.push(
          Q(e, `hills`, i, [0.8, 2.6], n.mid, {
            haze: 0.25,
            from: r - o / 2,
            to: r + o / 2,
            fade: (e) => Math.sin(G((e - (r - o / 2)) / o) * Math.PI),
          }),
        );
    }
    e.spec.ranges.sort((e, t) => t.r - e.r);
  },
};
function Gt(e, t) {
  let n = v(_(`scenery`, t.theme, t.seed)),
    r = ne(e.id),
    i = q(n, wt[t.theme]),
    a = Math.max(700, e.diag + 480),
    o = {
      pin: t,
      rect: { ...e.rect },
      cx: e.cx,
      cz: e.cz,
      floorY: e.floorY,
      ground: { far: i.ground, sand: J },
      sea: null,
      hills: [],
      skirt: e.terrain,
      pines: [],
      blocks: [],
      ranges: [],
      towers: [],
      banks: [],
      marks: [],
      moon: null,
    },
    s = {
      ctx: e,
      R: n,
      spec: o,
      pal: i,
      R0: a,
      markMax: Math.min(a - 60, le - e.diag - 20),
      boost: jt(e),
      frame: null,
      beach: 0,
    };
  if (t.theme === `coast`) {
    let t =
        r.sea === void 0
          ? (r.face ?? n() * 360) + (n() - 0.5) * 60
          : r.sea + (n() - 0.5) * 30,
      i = K(n, 8, 16),
      a = K(n, 4, 18),
      c = n() < 0.3 ? K(n, 0, 30) : K(n, 60, 260),
      l = se(t),
      u = C(t),
      d = e.rect,
      f = 0;
    for (let [t, n] of [
      [d.x0 - 38, d.z0 - 38],
      [d.x1 + 38, d.z0 - 38],
      [d.x0 - 38, d.z1 + 38],
      [d.x1 + 38, d.z1 + 38],
    ])
      f = Math.max(f, (t - e.cx) * l + (n - e.cz) * u);
    let p = 38 + i + a + K(n, 4, 30);
    for (; E(e, t, p).t < f + i + a + 2;) p += 4;
    ((o.sea = {
      bearing: t,
      d: p,
      bend: c,
      wave: a,
      k: K(n, 0.004, 0.012),
      phase: n() * Math.PI * 2,
      beach: i,
      shallow: `#7FDCD6`,
      deep: `#4FA3DB`,
      sand: J,
    }),
      (s.frame = D(e, o.sea)),
      (s.beach = i));
  }
  return (
    Wt[t.theme](s, r.face),
    Rt(s, 1 + Math.floor(n() * 3)),
    Ut(s, t.marks ?? Vt(s, t.theme), r.face),
    (o.moon = {
      bearing: (r.face ?? n() * 360) + (n() - 0.5) * 70,
      elev: K(n, 14, 30),
      phase: K(n, 0.25, 0.75),
    }),
    o
  );
}
var Kt = {
    ferris: 1500,
    turbines: 110,
    mast: 140,
    balloons: 200,
    blimp: 320,
    sign: 1400,
    lighthouse: 260,
    boats: 40,
  },
  qt = {
    ferris: 2,
    turbines: 1,
    mast: 1,
    balloons: 1,
    blimp: 1,
    sign: 0,
    lighthouse: 1,
    boats: 1,
  },
  Jt = [`turbines`, `balloons`, `boats`];
function Yt(e) {
  let t = e.rect.x1 - e.rect.x0,
    n = e.rect.z1 - e.rect.z0,
    r = 0;
  for (let e = 0; e < M.length - 1; e++) {
    let i = M[e],
      a = M[e + 1],
      o = x(i, a);
    for (let e = 0; e < 4; e++)
      r += 2 * Math.ceil((e % 2 == 0 ? t + 2 * a : n + 2 * a) / o);
  }
  return r;
}
function Xt(e, t) {
  let n = t === `low`,
    r = Yt(e) + 360,
    i = 3;
  e.sea && ((r += (k.length - 1) * 64 * 2), i++);
  for (let t of e.ranges) r += ye(t);
  for (let t of e.towers) r += ce(t);
  for (let t of e.banks) r += ve(t);
  for (let t of e.hills) r += te(t);
  (n || (r += e.pines.length * 10), (r += e.blocks.length * 60));
  let a = n ? e.marks.slice(0, 2) : e.marks;
  for (let e of a) {
    let t = Jt.includes(e.kind)
      ? Math.min(e.pts?.length ?? 1, n && e.kind !== `turbines` ? 2 : 1 / 0)
      : 1;
    ((r += Kt[e.kind] * t), (i += qt[e.kind]));
  }
  return { tris: r, calls: i };
}
var Zt = null;
function Qt(e, t, n) {
  let r = b(e, n),
    a = Gt(r, t),
    o = new i();
  o.name = `scenery`;
  let s = Ve(r, a),
    c = He(r, a),
    l = We(r, a);
  (o.add(s.mesh, l.mesh), c && o.add(c.mesh));
  let u = new z(a.floorY);
  for (let e of a.hills) Ke(u, e, a.floorY);
  a.skirt && $t(u, r, a);
  for (let e of a.blocks) qe(u, e, a.floorY);
  let d = [],
    f = u.p.length / 3;
  (a.marks.forEach((e, t) => {
    (d.push(bt(e, u, r, a)), t < 2 && (f = u.p.length / 3));
  }),
    a.marks.length || (f = u.p.length / 3));
  for (let e of a.pines) Je(u, e.x, e.y, e.z, e.h, e.r, e.col);
  let m = u.p.length / 3,
    h = new p(u.build(), V().near);
  ((h.name = `scenery:near`), (h.userData.noOutline = !0), o.add(h));
  for (let e of d) e.object && o.add(e.object);
  let g = {};
  ((Zt = g), ge(a.moon), pe(n.tiled));
  let _ = 0,
    v = null,
    y = (e) => {
      ((v = e),
        h.geometry.setDrawRange(0, e ? f : 1 / 0),
        d.forEach((t, n) => {
          t.object && (t.object.visible = !e || n < 2);
        }));
    };
  return (
    y(ue()),
    {
      group: o,
      pin: t,
      spec: a,
      update(e) {
        ((_ += e),
          (O.uTime.value = _),
          ue() !== v && y(ue()),
          d.forEach((e, t) => {
            (!v || t < 2) && e.update?.(_, !!v);
          }));
      },
      info() {
        let e = s.tris + l.tris + (c?.tris ?? 0) + (v ? f : m) / 3,
          n = 3 + +!!c;
        return (
          o.traverse((t) => {
            let r = t;
            if (
              !r.isMesh ||
              !t.visible ||
              t === h ||
              t === s.mesh ||
              t === l.mesh ||
              t === c?.mesh
            )
              return;
            let i = r.geometry,
              a =
                (i.index ? i.index.count : i.getAttribute(`position`).count) /
                3;
            ((e += a * (t.count ?? 1)), n++);
          }),
          {
            pin: re(t),
            marks: a.marks.map((e) => e.kind),
            tris: Math.round(e),
            calls: n,
            estimate: Xt(a, v ? `low` : `high`),
          }
        );
      },
      dispose() {
        (o.removeFromParent(),
          s.mesh.geometry.dispose(),
          l.mesh.geometry.dispose(),
          c?.mesh.geometry.dispose(),
          h.geometry.dispose());
        for (let e of d) e.dispose();
        Zt === g && ((Zt = null), ge(null));
      },
    }
  );
}
function $t(e, t, n) {
  let r = t.rect,
    i = n.floorY,
    a = 37.5,
    o = [t.cx, i - 200, t.cz];
  for (let n = 0; n < 4; n++) {
    let s = (e, t) => {
        let i = r.x0 - e,
          a = r.x1 + e,
          o = r.z0 - e,
          s = r.z1 + e;
        return n === 0
          ? [i + (a - i) * t, s]
          : n === 1
            ? [a, s + (o - s) * t]
            : n === 2
              ? [a + (i - a) * t, o]
              : [i, o + (s - o) * t];
      },
      c = n % 2 == 0 ? r.x1 - r.x0 + 196 : r.z1 - r.z0 + 196,
      l = Math.ceil(c / 8);
    for (let n = 0; n < l; n++) {
      let r = s(a, n / l),
        c = s(a, (n + 1) / l),
        u = s(98, n / l),
        d = s(98, (n + 1) / l),
        f = t.edgeY(r[0], r[1]) - 0.05,
        p = t.edgeY(c[0], c[1]) - 0.05;
      (f - i < 0.3 && p - i < 0.3) ||
        e.quad(
          [r[0], f, r[1]],
          [c[0], p, c[1]],
          [d[0], i, d[1]],
          [u[0], i, u[1]],
          ie((r[0] + d[0]) / 2, (r[1] + d[1]) / 2),
          o,
          N.GRASS,
        );
    }
  }
}
function en(e, t) {
  if (t.scenery === !1) return null;
  if (t.scenery) return t.scenery;
  let n =
    typeof location > `u`
      ? null
      : ee(new URLSearchParams(location.search).get(`scenery`));
  return n === `off`
    ? null
    : (n ?? ae(e.id, me(e.id).scenery ?? [], t.day ?? Se(Date.now())));
}
function tn(e, t, n, r) {
  let i = null,
    a = (r, a = t) => {
      (i?.dispose(),
        (t = a),
        (i = r ? Qt(a, r, n) : null),
        i && e.add(i.group));
    };
  return (
    a(r),
    {
      get view() {
        return i;
      },
      set: a,
      relayout(e) {
        a(i?.pin ?? null, e);
      },
    }
  );
}
var nn = `/`.replace(/\/?$/, `/`),
  rn = new Te();
async function an(e, t = `${e}.glb`) {
  try {
    let e = await rn.loadAsync(`${nn}parks/${t}`),
      n = null;
    if (
      (e.scene.traverse((e) => {
        !n && e.isMesh && (n = e);
      }),
      !n)
    )
      return null;
    let r = n;
    (r.updateWorldMatrix(!0, !1), r.geometry.applyMatrix4(r.matrixWorld));
    let i = r.geometry;
    if (
      (i.getAttribute(`_ao`) &&
        (i.setAttribute(`ao`, i.getAttribute(`_ao`)), i.deleteAttribute(`_ao`)),
      i.getAttribute(`_zone`) &&
        (i.setAttribute(`zone`, i.getAttribute(`_zone`)),
        i.deleteAttribute(`_zone`)),
      i.getAttribute(`_kind`) &&
        (i.setAttribute(`kind`, i.getAttribute(`_kind`)),
        i.deleteAttribute(`_kind`)),
      !i.getAttribute(`zone`) || !i.getAttribute(`ao`))
    )
      return null;
    let a = new p(i);
    return ((a.name = `park`), a);
  } catch {
    return null;
  }
}
function on(e) {
  let { group: t } = we(e),
    n = t.children[0],
    r = n.geometry,
    i = r.getAttribute(`position`).count;
  return (
    r.setAttribute(`ao`, new c(new Float32Array(i).fill(1), 1)),
    n.material.dispose(),
    n.removeFromParent(),
    n
  );
}
async function sn(e) {
  try {
    let t = await fetch(`${nn}parks/${e}/manifest.json`);
    return t.ok ? await t.json() : null;
  } catch {
    return null;
  }
}
var $ = (e, t, n) => {
  let r = Math.max(e[0] - t, 0, t - e[3]),
    i = Math.max(e[2] - n, 0, n - e[5]);
  return Math.sqrt(r * r + i * i);
};
async function cn(e, t, n) {
  let r = e.spawns[0] ?? { x: 0, z: 0 },
    a = new i();
  a.name = `park:${e.id}`;
  let o = new Ne(),
    s = h({ vertexColors: !0 });
  (g(s, { rim: 0.12, ao: !0, kind: !0 }), o.patch(s));
  let c = n.outlineScale ?? 0.55,
    l = n.outlines ?? !0,
    u = !1,
    d = [],
    f = (e, t) => {
      ((t.material = s),
        (t.receiveShadow = !0),
        (n.castShadow ?? !0) && e.key !== `far` && he(t),
        (t.name = `tile:${e.key}`),
        o.measure(t.geometry),
        l && e.key !== `far` && xe(t, c, void 0, !0),
        a.add(t),
        d.push({ e, mesh: t }));
    },
    p = [...t.tiles].sort((e, t) => $(e.box, r.x, r.z) - $(t.box, r.x, r.z));
  t.far && p.unshift(t.far);
  let m = p.filter((e) => e.key === `far` || $(e.box, r.x, r.z) < 120).length,
    _ = 0,
    v = 0,
    y = () => {},
    b = new Promise((e) => {
      y = e;
    }),
    x = async () => {
      for (; _ < p.length;) {
        let t = _++,
          n = p[t],
          r = await an(e.id, `${e.id}/${n.file}`);
        if (u) {
          r?.geometry.dispose();
          return;
        }
        (r && f(n, r), t < m && ++v === m && y());
      }
    };
  m || y();
  for (let e = 0; e < 4; e++) x();
  let S =
      n.decor === !1
        ? Promise.resolve(null)
        : Ee(e).catch((e) => (console.warn(`[park] decor`, e), null)),
    [C] = await Promise.all([S, b]);
  (C && a.add(C.group), C && l && C.setOutlines(!0));
  let w = tn(a, e, { baked: !0, tiled: !0 }, en(e, n)),
    T = F(e);
  return {
    group: a,
    baked: !0,
    get scenery() {
      return w.view;
    },
    setScenery: (e) => w.set(e),
    zoneOf: (e) => T.get(e) ?? 0,
    paint(e, t, n) {
      o.paint(T.get(e) ?? 0, t, n);
    },
    update(e, t, n, r) {
      if ((o.update(e), C?.update(e, r, t), w.view?.update(e), !t)) return;
      let i = n ?? 340;
      for (let e of d)
        e.e.key !== `far` && (e.mesh.visible = $(e.e.box, t.x, t.z) < i);
    },
    setOutlines(e) {
      if (e !== l) {
        l = e;
        for (let t of d)
          t.e.key !== `far` && (e ? xe(t.mesh, c, void 0, !0) : P(t.mesh));
        C?.setOutlines(e);
      }
    },
    rebuild() {},
    dispose() {
      ((u = !0), a.removeFromParent());
      for (let e of d) (P(e.mesh), e.mesh.geometry.dispose());
      (s.dispose(), o.dispose(), C?.dispose(), w.set(null));
    },
  };
}
async function ln(e, t = {}) {
  if (e.tileSize && t.baked !== !1) {
    let n = await sn(e.id);
    if (n) return cn(e, n, t);
  }
  let n = t.decor !== !1,
    r = (e) => Ee(e).catch((e) => (console.warn(`[park] decor`, e), null)),
    [a, o] = await Promise.all([
      t.baked === !1 ? Promise.resolve(null) : an(e.id),
      n ? r(e) : Promise.resolve(null),
    ]),
    s = o,
    c = !!a,
    l = a ?? on(e),
    u = new Ne(),
    d = h({ vertexColors: !0 });
  (g(d, { rim: 0.12, ao: !0, kind: !0 }),
    u.patch(d),
    (l.material = d),
    (l.receiveShadow = !0),
    (l.castShadow = !1),
    (t.castShadow ?? !0) && he(l),
    u.measure(l.geometry));
  let f = new i();
  ((f.name = `park:${e.id}`), f.add(l), s && f.add(s.group));
  let p = c ? null : ke(e);
  p && f.add(p);
  let m = tn(f, e, { baked: c, tiled: !1 }, en(e, t)),
    _ = (e) => JSON.stringify(Oe(e)),
    v = (e) =>
      JSON.stringify([Oe(e), e.pieces.filter((e) => e.kind === `prop`)]),
    y = _(e),
    b = v(e),
    x = !1,
    S = F(e),
    C = t.outlineScale ?? 0.55,
    w = !1,
    T = (e) => {
      e !== w &&
        ((w = e),
        e ? (xe(l, C), s?.setOutlines(!0)) : (P(l), s?.setOutlines(!1)));
    };
  return (
    T(t.outlines ?? !0),
    {
      group: f,
      baked: c,
      get scenery() {
        return m.view;
      },
      setScenery: (e) => m.set(e),
      zoneOf: (e) => S.get(e) ?? 0,
      paint(e, t, n) {
        u.paint(S.get(e) ?? 0, t, n);
      },
      update(e, t, n, r) {
        (u.update(e), s?.update(e, r, t), m.view?.update(e));
      },
      setOutlines: T,
      rebuild(e) {
        if (c || x) return;
        let t = on(e),
          i = w;
        (i && T(!1),
          l.geometry.dispose(),
          (l.geometry = t.geometry),
          u.measure(l.geometry),
          i && T(!0),
          (S = F(e)));
        let a = _(e);
        a !== y &&
          ((y = a), p && De(p), (p = ke(e)), p && f.add(p), m.relayout(e));
        let o = v(e);
        n &&
          o !== b &&
          ((b = o),
          r(e).then((e) => {
            if (e) {
              if (x || b !== o) {
                e.dispose();
                return;
              }
              (s?.dispose(), (s = e), f.add(e.group), w && e.setOutlines(!0));
            }
          }));
      },
      dispose() {
        ((x = !0),
          f.removeFromParent(),
          P(l),
          l.geometry.dispose(),
          d.dispose(),
          u.dispose(),
          s?.dispose(),
          p && De(p),
          m.set(null));
      },
    }
  );
}
export { ln as t };
