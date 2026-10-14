// assets/fxHooks-Cvx_8YWC 03 — math
// Lines 784-1110 of readable/assets/fxHooks-Cvx_8YWC.pretty.js (statement-aligned).
function makeTextSprite(e, t, n) {
  let r = e.getContext(`2d`);
  r.font = `99.84px "${Be}", system-ui, sans-serif`;
  let i = Math.ceil(r.measureText(t).width) + 52;
  ((e.width = i),
    (e.height = 154),
    (r.font = `99.84px "${Be}", system-ui, sans-serif`),
    (r.textAlign = `center`),
    (r.textBaseline = `middle`),
    (r.lineJoin = `round`));
  let a = i / 2,
    o = e.height / 2 + 4;
  ((r.strokeStyle = `#FFFFFF`),
    (r.lineWidth = 30),
    r.strokeText(t, a, o + 3),
    (r.strokeStyle = C),
    (r.lineWidth = 14),
    r.strokeText(t, a, o + 5),
    (r.strokeStyle = C),
    (r.lineWidth = 14),
    r.strokeText(t, a, o),
    (r.fillStyle = n),
    r.fillText(t, a, o));
}
var z = 14,
  We = 0.07,
  Ge = null;
function Ke() {
  return (Ge ??= new f({
    transparent: !0,
    depthWrite: !1,
    side: 2,
    uniforms: { uInk: { value: new y(C) }, uGap: { value: 0 } },
    vertexShader: `
      varying vec2 vUv;
      void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
    fragmentShader: `
      uniform vec3 uInk; uniform float uGap;
      varying vec2 vUv;
      void main() {
        if (abs(vUv.x - 0.5) < uGap) discard; // snapped: each half pulled back to its end
        float across = abs(vUv.y - 0.5) * 2.0;
        gl_FragColor = vec4(mix(vec3(1.0), uInk, step(0.62, across)), 1.0);
        #include <colorspace_fragment>
      }`,
  }));
}
var TrailMesh = class {
    mesh;
    pos;
    attr;
    mat;
    constructor() {
      let t = new te();
      ((this.pos = new Float32Array(90)),
        (this.attr = new g(this.pos, 3).setUsage(e)),
        t.setAttribute(`position`, this.attr));
      let n = new Float32Array(60),
        r = [];
      for (let e = 0; e <= z; e++)
        if ((n.set([e / z, 0, e / z, 1], e * 4), e < z)) {
          let t = e * 2;
          r.push(t, t + 1, t + 2, t + 1, t + 3, t + 2);
        }
      (t.setAttribute(`uv`, new g(n, 2)),
        t.setIndex(r),
        (this.mat = Ke().clone()),
        (this.mesh = new x(t, this.mat)),
        (this.mesh.frustumCulled = !1),
        (this.mesh.renderOrder = 3));
    }
    set(e, t, n, r, i, a, o, s, c = 0) {
      this.mat.uniforms.uGap.value = c;
      let l = this.pos;
      for (let c = 0; c <= z; c++) {
        let u = c / z,
          d = e + (r - e) * u,
          f = t + (i - t) * u - o * 4 * u * (1 - u),
          p = n + (a - n) * u,
          m = r - e,
          h = i - t - o * 4 * (1 - 2 * u),
          g = a - n,
          _ = s.x - d,
          v = s.y - f,
          ee = s.z - p,
          y = h * ee - g * v,
          te = g * _ - m * ee,
          b = m * v - h * _,
          ne = We / 2 / (Math.hypot(y, te, b) || 1);
        ((y *= ne),
          (te *= ne),
          (b *= ne),
          l.set([d - y, f - te, p - b, d + y, f + te, p + b], c * 6));
      }
      this.attr.needsUpdate = !0;
    }
    dispose() {
      (this.mesh.removeFromParent(),
        this.mesh.geometry.dispose(),
        this.mat.dispose());
    }
  },
  Je = `#C9D6F2`,
  Ye = `#9FE6FF`,
  Xe = `#A58BFF`,
  Ze = new y(`#FFD21F`),
  Qe = new y(`#C98A12`),
  $e = `#B8FF5A`,
  et = 6,
  tt = null,
  nt = null,
  rt = 0,
  it = -1;
function at(e, t) {
  let n = e.index ? e.toNonIndexed() : e,
    r = typeof t == `string` ? new y(t) : t,
    i = n.getAttribute(`position`).count,
    a = new Float32Array(i * 3);
  for (let e = 0; e < i; e++) a.set([r.r, r.g, r.b], e * 3);
  return (n.setAttribute(`color`, new g(a, 3)), n);
}
function ot() {
  let e = new u(),
    t = new ee(
      [
        [0, -0.08],
        [0.2, -0.075],
        [0.36, -0.035],
        [0.4, 0],
        [0.37, 0.035],
        [0.22, 0.065],
        [0, 0.075],
      ].map(([e, t]) => new ie(e, t)),
      24,
    ),
    n = new p(0.17, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2).translate(
      0,
      0.06,
      0,
    ),
    r = new m(0.39, 0.03, 6, 32).rotateX(Math.PI / 2),
    i = new b(0.14, 20).rotateX(Math.PI / 2).translate(0, -0.082, 0),
    a = ke([at(t, Je), at(n, Ye), at(r, Xe)]);
  e.add(new x(a, toonMaterial({ vertexColors: !0 })));
  let o = [];
  for (let e = 0; e < et; e++) {
    let t = (e / et) * Math.PI * 2;
    o.push(
      at(
        new p(0.04, 8, 5).translate(Math.cos(t) * 0.41, 0, Math.sin(t) * 0.41),
        Ze,
      ),
    );
  }
  return (
    (rt = o[0].getAttribute(`position`).count),
    o.push(at(i, $e)),
    (nt = ke(o)),
    e.add(new x(nt, new l({ vertexColors: !0 }))),
    addOutlines(e),
    e
  );
}
function st() {
  return ((tt ??= ot()), tt.clone(!0));
}
function ct(e) {
  let t = Math.floor(e * 8) % et;
  if (!nt || t === it) return;
  it = t;
  let n = nt.getAttribute(`color`);
  for (let e = 0; e < et; e++) {
    let r = (e - t + et) % 3 == 0 ? Ze : Qe;
    for (let t = e * rt; t < (e + 1) * rt; t++) n.setXYZ(t, r.r, r.g, r.b);
  }
  n.needsUpdate = !0;
}
var lt = [`#B8FF5A`, `#22D3EE`],
  ut = [`#EAF6FF`, `#DDF1FF`],
  dt = [`#5BB8F0`, `#8FD3F5`],
  ft = [`#FFFFFF`, `#F4EEDC`],
  pt = `#FF4D6D`,
  mt = [`#D9B98A`, `#C9A26B`, `#E8D3B0`],
  ht = [`#2FD67B`, `#3BBF5C`],
  gt = `#FF3B2F`,
  _t = [`#3BBF5C`, `#1E9E5A`, `#3BBF5C`, `#1E9E5A`, `#FF8A1F`],
  vt = `#2E8B57`,
  yt = `#1E4D2B`,
  bt = `#1FC7E8`,
  xt = [`#3B3349`, `#1D1A3A`, `#2A2438`],
  St = [`#D9203F`, `#FF4D6D`, `#FF8FB8`],
  Ct = [`#A55BFF`, `#FFD21F`, `#FF3D7F`],
  wt = [
    [`#22C55E`, `#7CE3A0`, `#15803D`],
    [`#2E6BFF`, `#8FB0FF`, `#1D4ED8`],
    [`#FF2E2E`, `#FF8A80`, `#C81E1E`],
    [`#FFC21F`, `#FFE27A`, `#E09A00`],
    [`#FF5FA8`, `#FFB3D4`, `#D63A82`],
  ],
  Tt = 4.5,
  Et = 0.6,
  Dt = 2.9,
  Ot = 0.08,
  kt = {
    park: {
      ufoY: Dt,
      zip: 6,
      crop: 0.95,
      rollK: 1,
      print: 1,
      printW: 1,
      sprout: 3,
      word: 1,
      wordY: 1.75,
      wordRise: 0.6,
      wordOut: 0.95,
      devil: 3.5,
      devilSide: 0,
      devilK: 1,
      devilShrink: 0,
      funnel: 1,
      drainY: 0.9,
      cloud: 1,
      cloudY: 1.9,
      rain: 1,
      flakeY: 0.3,
      flakeH: 0.9,
      batOut: 2.2,
      batUp: 1.6,
      wool: 3,
    },
    close: {
      ufoY: 1.85,
      zip: 3,
      crop: 0.7,
      rollK: 0.8,
      print: 1,
      printW: 2,
      sprout: 2,
      word: 1.3,
      wordY: 1.2,
      wordRise: 0.3,
      wordOut: 0.6,
      devil: 2.4,
      devilSide: 0.5,
      devilK: 0.6,
      devilShrink: 0.5,
      funnel: 0.85,
      drainY: 0.55,
      cloud: 1.6,
      cloudY: 1.65,
      rain: 2.2,
      flakeY: 0.15,
      flakeH: 0.35,
      batOut: 1.2,
      batUp: 2.4,
      wool: 1.6,
    },
  },
  At = 0.15,
  jt = 0.25,
  Mt = 0.55,
  Nt = 0.18,
  Pt = 0.35,
  Ft = 2.5,
  It = 3,
  Lt = 2,
  Rt = 1.4,
  zt = 0.3,
  Bt = 0.1,
  Vt = 0.2,
  B = 0.6,
  Ht = 0.7,
  Ut = 0.6,
  Wt = (8 * Ht) / (B * B),
  Gt = 0.3,
  Kt = 0.8,
  qt = [
    { c: 0, out: -3, near: -0.66, y: 0.4, k: 1, at: 0 },
    { c: 4, out: 3, near: 0.66, y: 0.4, k: 1, at: 0 },
    { c: 1, out: -1.4, near: -0.48, y: 1.3, k: 1, at: 0.1 },
    { c: 3, out: 1.4, near: 0.48, y: 1.3, k: 1, at: 0.1 },
    { c: 2, out: 0, near: 0, y: 1.75, k: 1.05, at: 0.2 },
  ],
  Jt = 0.2,
  Yt = -0.1,
  Xt = 0.05,
  Zt = new c(0.35, 1, 1, 28, 1, !0).translate(0, 0.5, 0),
  Qt = new c(1, 0.35, 2, 32, 8, !0).translate(0, 1, 0),
  $t = `
  uniform vec2 uLean; uniform float uWobble; uniform float uTime;
  varying vec2 vUv; varying float vEdge; varying float vNear;
  void main() {
    vUv = uv;
    vec3 p = position;
    p.xz += uLean * uv.y; // the top follows a lagging saucer
    p.x += sin(p.y * 2.7 - uTime * 6.0) * uWobble * p.y;
    p.z += cos(p.y * 2.3 - uTime * 5.0) * uWobble * p.y;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vEdge = 1.0 - abs(dot(normalize(normalMatrix * normal), normalize(-mv.xyz)));
    vNear = smoothstep(1.5, 3.5, -mv.z); // the chase camera passing through fades it
    gl_Position = projectionMatrix * mv;
  }`,
  V = (e) => e === E.GROUND || e === E.MANUAL,
  en = { x: 0, z: 0 },
  tn = new S(0, 1, 0),
  H = new S(),
  U = new S(),
  nn = new S(),
  rn = [0, 0, 0],
  W = { ax: 0, az: 1, lx: 1, lz: 0 };
function an(e) {
  (H.set(e.ux, e.uy, e.uz).normalize(),
    U.set(0, 1, 0),
    Math.abs(H.y) > 0.9 && U.set(1, 0, 0),
    U.cross(H).normalize(),
    nn.crossVectors(H, U));
}
function G(e) {
  let t = Math.hypot(e.vx, e.vz);
  return (
    t > 0.3
      ? ((en.x = e.vx / t), (en.z = e.vz / t))
      : ((en.x = Math.sin(e.yaw)), (en.z = Math.cos(e.yaw))),
    en
  );
}
