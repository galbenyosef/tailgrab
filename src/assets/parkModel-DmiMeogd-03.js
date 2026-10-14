// assets/parkModel-DmiMeogd 03 — push
// Lines 404-745 of readable/assets/parkModel-DmiMeogd.pretty.js (statement-aligned).
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
