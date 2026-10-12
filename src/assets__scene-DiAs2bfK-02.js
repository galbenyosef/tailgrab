// assets__scene-DiAs2bfK 02 — math
// Lines 348-629 of readable/assets__scene-DiAs2bfK.pretty.js (statement-aligned).
var R = [`morning`, `day`, `evening`, `night`],
  Fe = {
    morning: {
      sunDir: [0.75, 0.55, -0.35],
      sun: `#FFE3A6`,
      sunI: 2,
      hemiSky: `#EEF3FF`,
      hemiGround: `#A9A2EA`,
      hemiI: 1.05,
      skyTop: `#86C4F2`,
      skyHorizon: `#FFE9D6`,
      skyBottom: `#FBEDE4`,
      disc: `#FFE9C4`,
      fog: `#F6E6DE`,
      haze: 0.8,
      rimShade: [0.62, 0.6, 0.95],
      rimSun: [1, 0.88, 0.7],
      lamps: 0,
      stars: 0,
    },
    day: {
      sunDir: [-0.45, 0.8, -0.35],
      sun: ue,
      sunI: 2.1,
      hemiSky: `#FFFFFF`,
      hemiGround: le,
      hemiI: 1.18,
      skyTop: ce,
      skyHorizon: de,
      skyBottom: `#FBEFF5`,
      disc: `#FFF6D6`,
      fog: fe,
      haze: 1,
      rimShade: [0.62, 0.55, 0.95],
      rimSun: [1, 0.86, 0.72],
      lamps: 0,
      stars: 0,
    },
    evening: {
      sunDir: [-0.7, 0.52, 0.45],
      sun: `#FFC48F`,
      sunI: 2.2,
      hemiSky: `#D9C4F0`,
      hemiGround: `#6A55B8`,
      hemiI: 0.8,
      skyTop: `#6F6FC9`,
      skyHorizon: `#FFB38A`,
      skyBottom: `#F6C7B8`,
      disc: `#FFD08A`,
      fog: `#F4C1B0`,
      haze: 1,
      rimShade: [0.55, 0.42, 0.9],
      rimSun: [1, 0.68, 0.48],
      lamps: 0.5,
      stars: 0,
    },
    night: {
      sunDir: [0.3, 0.85, 0.4],
      sun: `#A9BCFF`,
      sunI: 0.9,
      hemiSky: `#7D83E0`,
      hemiGround: `#2B2250`,
      hemiI: 0.55,
      skyTop: `#1B1E4A`,
      skyHorizon: `#4A3A7A`,
      skyBottom: `#2A2350`,
      disc: `#DCE6FF`,
      fog: `#3A3266`,
      haze: 0.8,
      rimShade: [0.25, 0.28, 0.55],
      rimSun: [0.35, 0.4, 0.65],
      lamps: 1,
      stars: 1,
    },
  },
  Ie = `#FFD9A0`,
  Le = `#FFA850`,
  Re = 0.5,
  ze = 3.55,
  z = 8,
  B = 0,
  V = null;
function H(e) {
  e.onBeforeCompile = (e) => {
    e.fragmentShader = e.fragmentShader.replace(
      `#include <fog_fragment>`,
      `#ifdef USE_FOG
  gl_FragColor.rgb *= 1.0 - smoothstep(fogNear, fogFar, vFogDepth);
#endif`,
    );
  };
}
function Be() {
  if (V) return V;
  let e = document.createElement(`canvas`);
  e.width = e.height = 64;
  let t = e.getContext(`2d`),
    n = t.createRadialGradient(32, 32, 0, 32, 32, 32);
  (n.addColorStop(0, `rgba(255,255,255,1)`),
    n.addColorStop(0.3, `rgba(255,255,255,0.5)`),
    n.addColorStop(1, `rgba(255,255,255,0)`),
    (t.fillStyle = n),
    t.fillRect(0, 0, 64, 64));
  let r = { map: new p(e), transparent: !0, depthWrite: !1, blending: 2 };
  return (
    (V = {
      halo: new l({ ...r, color: Ie, size: 2.6, sizeAttenuation: !0 }),
      pool: new i({
        ...r,
        color: Le,
        polygonOffset: !0,
        polygonOffsetFactor: -2,
        polygonOffsetUnits: -2,
      }),
    }),
    H(V.halo),
    H(V.pool),
    U(),
    V
  );
}
function U() {
  ((_.uLampGlow.value = B),
    V &&
      ((V.halo.opacity = B),
      (V.pool.opacity = B * Re),
      (V.halo.visible = V.pool.visible = B > 0)));
}
function Ve(e) {
  ((B = e), U());
}
function He(t) {
  let n = new s();
  if (((n.name = `lamp-glow`), !t.length)) return { group: n, dispose() {} };
  let { halo: i, pool: a } = Be(),
    o = new Float32Array(t.length * 3);
  t.forEach((e, t) => o.set([e.x, e.y + ze * e.s, e.z], t * 3));
  let c = new h();
  c.setAttribute(`position`, new f(o, 3));
  let l = new e(c, i);
  l.name = `lamp-glow:halo`;
  let u = new r(z, z).rotateX(-Math.PI / 2),
    d = new ne(u, a, t.length);
  d.name = `lamp-glow:pool`;
  let p = new ee();
  return (
    t.forEach((e, t) =>
      d.setMatrixAt(
        t,
        p.makeScale(e.s, 1, e.s).setPosition(e.x, e.y + 0.03, e.z),
      ),
    ),
    d.computeBoundingSphere(),
    n.add(l, d),
    {
      group: n,
      dispose() {
        (n.removeFromParent(), c.dispose(), u.dispose(), d.dispose());
      },
    }
  );
}
var W = {
    lens: { barrel: 0.55, chroma: 1.4, tape: 1, vignette: 0.55 },
    cam: {
      tune: {
        dist: 0.6,
        height: 0.42,
        lookY: 0.62,
        floor: 0.35,
        minDist: 1.3,
        fadeAt: 1.4,
      },
      fov: 86,
    },
  },
  G = typeof location < `u` && new URLSearchParams(location.search).has(`vx`),
  K = {
    uFog: { value: new m() },
    uHorizon: { value: new m() },
    uSkyTop: { value: new m() },
    uSunDir: { value: new g(0, 1, 0) },
    uSunTint: { value: new m(1, 1, 1) },
    uShadeTint: { value: new m(0.8, 0.8, 0.8) },
    uDisc: { value: new m() },
    uLamps: { value: 0 },
    uHaze: { value: 1 },
    uTime: { value: 0 },
    uFogNear: { value: 85 },
    uFogFar: { value: 210 },
    uFogStretch: { value: 3 },
    uHazeMax: { value: 0.6 },
    uMoon: { value: 0 },
    uMoonDir: { value: new g(0, 0.4, -1).normalize() },
    uMoonPhase: { value: 0.5 },
  },
  q = !1,
  J = 0,
  Y = !1,
  Ue = new m(),
  X = new m();
function We(e, t, n) {
  let r = K;
  (r.uFog.value.set(e.fog),
    r.uHorizon.value.set(e.skyHorizon),
    r.uSkyTop.value.set(e.skyTop),
    r.uSunDir.value.fromArray(e.sunDir).normalize(),
    r.uDisc.value.set(e.disc),
    X.set(e.hemiSky).multiplyScalar(e.hemiI * 0.68),
    r.uShadeTint.value.copy(X),
    r.uSunTint.value.copy(X).add(Ue.set(e.sun).multiplyScalar(e.sunI * 0.16)),
    (r.uLamps.value = e.lamps),
    (r.uHaze.value = 1 / e.haze),
    (r.uFogNear.value = t),
    (r.uFogFar.value = n),
    (J = Math.max(e.stars, 0.6 * e.lamps)),
    (r.uMoon.value = q ? J : 0));
}
function Ge(e) {
  if (((q = !!e), e)) {
    let t = (e.bearing * Math.PI) / 180,
      n = (e.elev * Math.PI) / 180;
    (K.uMoonDir.value.set(
      Math.sin(t) * Math.cos(n),
      Math.sin(n),
      -Math.cos(t) * Math.cos(n),
    ),
      (K.uMoonPhase.value = e.phase));
  }
  K.uMoon.value = q ? J : 0;
}
function Ke(e) {
  K.uFogStretch.value = e ? 1.4 : 3;
}
function qe(e) {
  Y = e;
}
function Je() {
  return Y;
}
var Z = {
    low: {
      pixelRatio: 1,
      shadowSize: 512,
      outlines: !1,
      particles: 0.4,
      drawDist: 240,
      textures: !1,
      liteScenery: !0,
      skinFx: !1,
      drain: !1,
      worldShadows: !1,
    },
    med: {
      pixelRatio: 1.5,
      shadowSize: 1024,
      outlines: !0,
      particles: 0.7,
      drawDist: 290,
      textures: !0,
      liteScenery: !1,
      skinFx: !0,
      drain: !0,
      worldShadows: !0,
    },
    high: {
      pixelRatio: 2,
      shadowSize: 2048,
      outlines: !0,
      particles: 1,
      drawDist: 340,
      textures: !0,
      liteScenery: !1,
      skinFx: !0,
      drain: !0,
      worldShadows: !0,
    },
  },
  Q = !0;
function Ye(e) {
  ((e.userData.worldCaster = !0), (e.castShadow = Q));
}
