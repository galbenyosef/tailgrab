// assets/lens-Csl3PMnC 01 — material
// Lines 1-131 of readable/assets/lens-Csl3PMnC.pretty.js (statement-aligned).
import {
  Cr as e,
  F as t,
  H as n,
  Pt as r,
  Wn as i,
  l as a,
  vr as o,
  xt as s,
} from "./three.core-DVWDmH0S.js";
var c = new r(-1, 1, 1, -1, 0, 1),
  l = new (class extends a {
    constructor() {
      (super(),
        this.setAttribute(
          `position`,
          new t([-1, 3, 0, -1, -1, 0, 3, -1, 0], 3),
        ),
        this.setAttribute(`uv`, new t([0, 2, 0, 0, 2, 0], 2)));
    }
  })(),
  u = class {
    constructor(e) {
      this._mesh = new s(l, e);
    }
    dispose() {
      this._mesh.geometry.dispose();
    }
    render(e) {
      e.render(this._mesh, c);
    }
    get material() {
      return this._mesh.material;
    }
    set material(e) {
      this._mesh.material = e;
    }
  },
  d = (e) => {
    let t = String(+e.toFixed(5));
    return /[.e]/.test(t) ? t : `${t}.0`;
  };
function f(e) {
  return new i({
    uniforms: {
      tDiffuse: { value: null },
      uRes: { value: new o(1, 1) },
      uPx: { value: 1 },
      uFrame: { value: 0 },
    },
    depthTest: !1,
    depthWrite: !1,
    vertexShader: `
      varying vec2 vUv;
      void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
    fragmentShader: `
      uniform sampler2D tDiffuse;
      uniform vec2 uRes;
      uniform float uPx, uFrame;
      varying vec2 vUv;
      float hash(vec2 p) { vec3 q = fract(vec3(p.xyx) * 0.1031); q += dot(q, q.yzx + 33.33); return fract((q.x + q.y) * q.z); }
      // barrel: the sides' midpoints stay put, the centre swells, the corners fall off the glass
      vec2 bend(float k) {
        vec2 asp = vec2(uRes.x / uRes.y, 1.0);
        vec2 d = (vUv - 0.5) * asp;
        return 0.5 + (vUv - 0.5) * (1.0 + k * dot(d, d)) / (1.0 + k * 0.25 * asp.x * asp.x);
      }
      vec3 tap(vec2 uv) {
        vec2 m = smoothstep(vec2(0.0), vec2(0.012), uv) * (1.0 - smoothstep(vec2(0.988), vec2(1.0), uv));
        return texture2D(tDiffuse, uv).rgb * (m.x * m.y);
      }
      void main() {
        float k = ${d(e.barrel)};
        vec2 px = uPx / uRes;
        float ca = ${d(e.chroma)} * 0.012;
        vec2 ur = bend(k * (1.0 + ca)), ug = bend(k), ub = bend(k * (1.0 - ca));
        // tape: chroma smears sideways, luma stays (almost) sharp
        vec2 sm = vec2(${d(2.2 * e.tape)} * px.x, 0.0);
        vec3 c;
        c.r = (tap(ur + sm).r + tap(ur + 2.0 * sm).r + tap(ur).r) / 3.0;
        c.g = (2.0 * tap(ug).g + tap(ug + 0.4 * sm).g + tap(ug - 0.4 * sm).g) / 4.0;
        c.b = (tap(ub - sm).b + tap(ub - 2.0 * sm).b + tap(ub).b) / 3.0;
        // the grade is in display space, like the tape's
        c = linearToOutputTexel(vec4(c, 1.0)).rgb;
        float l = dot(c, vec3(0.299, 0.587, 0.114));
        c = mix(vec3(l), c, 1.0 + 0.16 * ${d(e.tape)});
        c = (c - 0.5) * (1.0 + 0.1 * ${d(e.tape)}) + 0.5;
        c = c * vec3(1.03, 1.0, 0.95) + vec3(0.012, 0.03, 0.035) * ${d(e.tape)} * (1.0 - c);
        c *= 1.0 - 0.035 * ${d(e.tape)} * (0.5 + 0.5 * sin(vUv.y * 480.0 * 3.14159));
        c += (hash(floor(gl_FragCoord.xy / (1.5 * uPx)) + uFrame * 3.7) - 0.5) * 0.045 * ${d(e.tape)};
        vec2 asp = vec2(uRes.x / uRes.y, 1.0);
        vec2 d = (vUv - 0.5) * asp;
        c *= 1.0 - ${d(e.vignette)} * smoothstep(0.35, 1.15, dot(d, d) / (0.25 * asp.x * asp.x));
        gl_FragColor = vec4(c, 1.0);
      }`,
  });
}
var p = class {
  target = new e(1, 1, { type: n, samples: 4 });
  material;
  quad;
  frame = 0;
  constructor(e) {
    ((this.material = f(e)),
      (this.material.uniforms.tDiffuse.value = this.target.texture),
      (this.quad = new u(this.material)));
  }
  setSize(e, t) {
    (this.target.setSize(e, t),
      this.material.uniforms.uRes.value.set(e, t),
      (this.material.uniforms.uPx.value = t / 720));
  }
  render(e, t, n) {
    let r = e.getRenderTarget();
    (e.setRenderTarget(this.target),
      e.render(t, n),
      e.setRenderTarget(r),
      (this.material.uniforms.uFrame.value = ++this.frame),
      this.quad.render(e));
  }
  pass(e, t) {
    let n = this.material.uniforms;
    ((n.tDiffuse.value = t),
      (n.uFrame.value = ++this.frame),
      this.quad.render(e),
      (n.tDiffuse.value = this.target.texture));
  }
  dispose() {
    (this.target.dispose(), this.material.dispose(), this.quad.dispose());
  }
};
