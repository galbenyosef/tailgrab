// assets__scene-DiAs2bfK 03 — renderer
// Lines 630-914 of readable/assets__scene-DiAs2bfK.pretty.js (statement-aligned).
var Xe = class {
    renderer;
    scene = new o();
    camera = new t(62, 1, 0.1, 1e3);
    sun;
    hemi;
    sky;
    stars;
    sunDir = new g();
    sunRight = new g();
    sunUp = new g();
    look = I;
    todOverride = null;
    tier = Z.high;
    scale = 1;
    box = new DOMRect();
    lens = null;
    lensLoad = Promise.resolve();
    drainWarm = 0;
    constructor(e, t = {}) {
      let r = new URLSearchParams(location.search).get(`aa`) !== `0`;
      ((this.renderer = new ae({
        canvas: e,
        antialias: r,
        powerPreference: `high-performance`,
        preserveDrawingBuffer: !!t.preserveDrawingBuffer,
      })),
        (this.renderer.outputColorSpace = c),
        (this.renderer.toneMapping = 0),
        (this.renderer.shadowMap.enabled = !0),
        (this.renderer.shadowMap.type = 1),
        (this.scene.fog = new n(16777215)),
        (this.scene.background = new m()),
        (this.hemi = new a()),
        this.scene.add(this.hemi),
        (this.sun = new te()),
        (this.sun.castShadow = !0));
      let i = this.sun.shadow.camera;
      ((i.left = -14),
        (i.right = 14),
        (i.top = 14),
        (i.bottom = -14),
        (i.near = 1),
        (i.far = 80),
        (this.sun.shadow.bias = -6e-4),
        (this.sun.shadow.normalBias = 0.03),
        this.scene.add(this.sun, this.sun.target),
        (this.sky = et(this.sunDir)),
        (this.stars = tt()),
        this.sky.add(this.stars),
        this.scene.add(this.sky),
        this.applyTier(this.tier),
        this.resize(),
        window.addEventListener(`resize`, () => this.resize()),
        G && this.setLens(!0));
    }
    setLens(e) {
      return e
        ? this.lens
          ? Promise.resolve()
          : (this.lensLoad = se(
              () =>
                import(`./lens-BwVvQcWW.js`).then((e) => {
                  ((this.lens = new e.Lens(W.lens)), this.resize());
                }),
              __vite__mapDeps([0, 1, 2]),
            ))
        : (this.lens?.dispose(), (this.lens = null), Promise.resolve());
    }
    drain(e) {
      this.renderer.domElement.classList.toggle(
        `drained`,
        e && this.tier.drain,
      );
    }
    precompile() {
      this.renderer.compileAsync(this.scene, this.camera).catch(() => {});
    }
    warmDrain() {
      this.drainWarm === 0 &&
        this.tier.drain &&
        (this.renderer.domElement.classList.add(`drain-warm`),
        (this.drainWarm = 20));
    }
    get ready() {
      return this.lensLoad;
    }
    applyTier(e) {
      ((this.tier = e),
        this.applyRatio(),
        this.sun.shadow.mapSize.set(e.shadowSize, e.shadowSize),
        this.sun.shadow.map?.dispose(),
        (this.sun.shadow.map = null),
        e.outlines
          ? this.camera.layers.enable(1)
          : this.camera.layers.disable(1),
        (Q = e.worldShadows),
        this.scene.traverse((e) => {
          e.userData.worldCaster && (e.castShadow = Q);
        }),
        (v.uTex.value = +!!e.textures),
        qe(e.liteScenery),
        this.warmDrain(),
        this.applyMood());
    }
    setScale(e) {
      e !== this.scale && ((this.scale = e), this.applyRatio());
    }
    applyRatio() {
      (this.renderer.setPixelRatio(
        Math.min(window.devicePixelRatio || 1, this.tier.pixelRatio) *
          this.scale,
      ),
        this.lens && this.resize());
    }
    resize() {
      let e = window.innerWidth,
        t = window.innerHeight;
      if (
        (this.renderer.setSize(e, t, !1),
        (this.box = this.renderer.domElement.getBoundingClientRect()),
        (this.camera.aspect = e / t),
        (this.camera.fov = e < t ? 72 : 62),
        this.camera.updateProjectionMatrix(),
        this.lens)
      ) {
        let e = this.renderer.getDrawingBufferSize(Qe);
        this.lens.setSize(e.x, e.y);
      }
    }
    setLook(e) {
      ((this.look = e), (v.uSlab.value = e.slab ?? 4), this.applyMood());
    }
    setTodOverride(e) {
      ((this.todOverride = e), this.applyMood());
    }
    applyMood() {
      let e = Fe[this.todOverride ?? this.look.tod];
      (this.hemi.color.set(e.hemiSky),
        this.hemi.groundColor.set(e.hemiGround),
        (this.hemi.intensity = e.hemiI),
        this.sun.color.set(e.sun),
        (this.sun.intensity = e.sunI));
      let t = this.scene.fog;
      (t.color.set(e.fog),
        (t.near = this.look.fog[0] * e.haze),
        (t.far = Math.min(this.look.fog[1] * e.haze, this.tier.drawDist - 10)),
        this.scene.background.set(e.skyHorizon));
      let n = this.sky.material.uniforms;
      (n.top.value.set(e.skyTop),
        n.horizon.value.set(e.skyHorizon),
        n.bottom.value.set(e.skyBottom),
        n.sunCol.value.set(e.disc),
        this.sunDir.fromArray(e.sunDir).normalize(),
        this.sunRight.crossVectors(Ze, this.sunDir).normalize(),
        this.sunUp.crossVectors(this.sunDir, this.sunRight),
        _.uRimShade.value.fromArray(e.rimShade),
        _.uRimSun.value.fromArray(e.rimSun),
        Ve(e.lamps),
        We(e, t.near, t.far),
        (this.stars.material.opacity = e.stars),
        (this.stars.visible = e.stars > 0));
    }
    followShadow(e, t = 0, n = this.camera) {
      let r = $e.copy(e);
      if (t) {
        (n.getWorldDirection($), ($.y = 0));
        let e = $.length();
        e > 0.1 && r.addScaledVector($, t / e);
      }
      let i = 28 / this.tier.shadowSize,
        a = this.sunRight,
        o = this.sunUp,
        s = this.sunDir,
        c = Math.round(r.dot(a) / i) * i,
        l = Math.round(r.dot(o) / i) * i,
        u = r.dot(s),
        d = this.sun.target.position
          .set(0, 0, 0)
          .addScaledVector(a, c)
          .addScaledVector(o, l)
          .addScaledVector(s, u);
      (this.sun.position.copy(d).addScaledVector(s, 40),
        this.sky.position.copy(n.position));
    }
    render() {
      (this.drainWarm > 0 &&
        --this.drainWarm === 0 &&
        ((this.drainWarm = -1),
        this.renderer.domElement.classList.remove(`drain-warm`)),
        this.lens
          ? this.lens.render(this.renderer, this.scene, this.camera)
          : this.renderer.render(this.scene, this.camera));
    }
  },
  Ze = new g(0, 1, 0),
  Qe = new re(),
  $e = new g(),
  $ = new g();
function et(e) {
  let t = new u({
      side: 1,
      depthWrite: !1,
      fog: !1,
      uniforms: {
        top: { value: new m() },
        horizon: { value: new m() },
        bottom: { value: new m() },
        sunDir: { value: e },
        sunCol: { value: new m() },
        uMoon: K.uMoon,
        uMoonDir: K.uMoonDir,
        uMoonPhase: K.uMoonPhase,
      },
      vertexShader: `
      varying vec3 vDir;
      void main() {
        vDir = normalize(position);
        vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        gl_Position = p.xyww;
      }`,
      fragmentShader: `
      uniform vec3 top, horizon, bottom, sunDir, sunCol, uMoonDir;
      uniform float uMoon, uMoonPhase;
      varying vec3 vDir;
      void main() {
        vec3 d = normalize(vDir);
        float h = d.y;
        vec3 c = h > 0.0 ? mix(horizon, top, pow(clamp(h, 0.0, 1.0), 0.55)) : mix(horizon, bottom, clamp(-h * 4.0, 0.0, 1.0));
        float s = max(dot(d, normalize(sunDir)), 0.0);
        // the scenery's moon takes over from the night's overhead glow
        c += sunCol * (pow(s, 64.0) * 0.9 + pow(s, 6.0) * 0.18) * (1.0 - uMoon);
        if (uMoon > 0.0) {
          // a crescent: the disc less one pushed sideways by how new it is
          const float R = 0.99926; // cos 2.2°
          float m = dot(d, uMoonDir);
          vec3 side = normalize(cross(uMoonDir, vec3(0.0, 1.0, 0.0)));
          float cut = dot(d, normalize(uMoonDir + side * 0.045 * (1.0 - uMoonPhase)));
          float aa = fwidth(m);
          float disc = smoothstep(R - aa, R + aa, m) * (1.0 - smoothstep(R - aa, R + aa, cut));
          c = mix(c, sunCol * 1.05, disc * uMoon);
          c += sunCol * pow(max(m, 0.0), 900.0) * 0.18 * uMoon;
        }
        gl_FragColor = vec4(c, 1.0);
        #include <colorspace_fragment>
      }`,
    }),
    n = new ie(new d(300, 32, 16), t);
  return ((n.renderOrder = T.sky), (n.frustumCulled = !1), n);
}
function tt() {
  let t = new Float32Array(1260),
    n = new Float32Array(1260),
    r = 7,
    i = () => ((r = (r * 16807) % 2147483647) - 1) / 2147483646;
  for (let e = 0; e < 420; e++) {
    let r = 0.06 + 0.94 * Math.sqrt(i()),
      a = i() * Math.PI * 2,
      o = Math.sqrt(1 - r * r);
    (t.set([Math.cos(a) * o * 280, r * 280, Math.sin(a) * o * 280], e * 3),
      n.fill(0.35 + 0.65 * i() ** 2, e * 3, e * 3 + 3));
  }
  let a = new h();
  (a.setAttribute(`position`, new f(t, 3)),
    a.setAttribute(`color`, new f(n, 3)));
  let o = new l({
    size: 2,
    sizeAttenuation: !1,
    vertexColors: !0,
    fog: !1,
    transparent: !1,
    depthWrite: !1,
    blending: 2,
  });
  ((o.onBeforeCompile = (e) => {
    e.vertexShader = e.vertexShader.replace(
      `#include <project_vertex>`,
      `#include <project_vertex>
  gl_Position.z = gl_Position.w;`,
    );
  }),
    (o.customProgramCacheKey = () => `stars-far`));
  let s = new e(a, o);
  return ((s.frustumCulled = !1), (s.renderOrder = T.stars), s);
}
