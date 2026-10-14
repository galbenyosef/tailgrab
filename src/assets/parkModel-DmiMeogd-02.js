// assets/parkModel-DmiMeogd 02 — math
// Lines 63-403 of readable/assets/parkModel-DmiMeogd.pretty.js (statement-aligned).
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
