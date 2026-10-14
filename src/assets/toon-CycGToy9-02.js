// assets/toon-CycGToy9 02 — float
// Lines 14155-14417 of readable/assets/toon-CycGToy9.pretty.js (statement-aligned).
function Qr(e) {
  return `varying vec3 vTexP;\nvarying vec3 vTexN;\n${
    e === `attribute`
      ? `attribute float kind;
varying float vKind;
`
      : ``
  }`;
}
function $r(e, t) {
  return (
    (e
      ? `
  vTexP = position;
  vTexN = normal;`
      : `
  vTexP = (modelMatrix * vec4(transformed, 1.0)).xyz;
  vTexN = normalize(mat3(modelMatrix) * objectNormal);`) +
    (t === `attribute`
      ? `
  vKind = kind;`
      : ``)
  );
}
function ei(e, t) {
  let n = e ? 12 : 1,
    r = t !== null;
  return `
    varying vec3 vTexP;
    varying vec3 vTexN;
    uniform float uTex;
    ${r ? `uniform float uSlab;\n${t === `attribute` ? `varying float vKind;` : `const float vKind = ${Zr(t / 8)};`}` : ``}
    float dHash(vec2 p) { vec3 q = fract(vec3(p.xyx) * 0.1031); q += dot(q, q.yzx + 33.33); return fract((q.x + q.y) * q.z); }
    vec2 dHash2(vec2 p) { return vec2(dHash(p), dHash(p + 17.17)); }
    float dNoise(vec2 p) {
      vec2 i = floor(p), f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      return mix(mix(dHash(i), dHash(i + vec2(1.0, 0.0)), f.x), mix(dHash(i + vec2(0.0, 1.0)), dHash(i + vec2(1.0, 1.0)), f.x), f.y);
    }
    // how much of a pattern with this period (m) survives when a pixel covers px metres
    float dFade(float px, float period) { return 1.0 - smoothstep(0.1, 0.4, px / period); }
    // the plane a face lies in
    vec2 dPlane(vec3 p, vec3 n) { vec3 a = abs(n); return a.y > 0.62 ? p.xz : (a.x > a.z ? p.zy : p.xy); }
    // across a face, level: boards run up a ramp, bricks along a wall
    vec2 dAcross(vec3 n) { return dot(n.xz, n.xz) > 0.02 ? normalize(vec2(-n.z, n.x)) : vec2(1.0, 0.0); }
    float dTri(vec2 p, float r) {
      const float k = 1.7320508;
      p.x = abs(p.x) - r; p.y = p.y + r / k;
      if (p.x + k * p.y > 0.0) p = vec2(p.x - k * p.y, -k * p.x - p.y) / 2.0;
      p.x -= clamp(p.x, -2.0 * r, 0.0);
      return -length(p) * sign(p.y);
    }
    // cell i + g's shape, as seen from f (a point in cell i)
    float dShape(vec2 i, vec2 g, vec2 f, float size, float keep, float tri) {
      if (dHash(i + g + 5.5) > keep) return 0.0;
      vec2 h = dHash2(i + g);
      vec2 q = g + 0.2 + 0.6 * h - f;
      float r = size * (0.55 + 0.45 * h.y);
      float a = h.x * 6.2832;
      float sd = tri > 0.5 ? dTri(mat2(cos(a), -sin(a), sin(a), cos(a)) * q, r) : length(q) - r;
      return 1.0 - smoothstep(-0.02, 0.02, sd);
    }
    // one shape a cell, in a share of the cells: round specks (tri 0) or little triangles (tri 1).
    // Centres sit 0.2–0.8 across a cell, so a neighbour's shape reaches only \`bleed\` in: look there only that close
    float dScatter(vec2 uv, float size, float keep, float tri) {
      vec2 i = floor(uv), f = fract(uv);
      float bleed = size * (tri > 0.5 ? 1.1548 : 1.0) + 0.02 - 0.2; // reach (+ the edge's smoothstep) past 0.2
      vec2 s = sign(f - 0.5), near = step(0.5 - bleed, abs(f - 0.5));
      float m = dShape(i, vec2(0.0), f, size, keep, tri);
      if (near.x > 0.0) m = max(m, dShape(i, vec2(s.x, 0.0), f, size, keep, tri));
      if (near.y > 0.0) m = max(m, dShape(i, vec2(0.0, s.y), f, size, keep, tri));
      if (near.x * near.y > 0.0) m = max(m, dShape(i, s, f, size, keep, tri));
      return m;
    }

    vec3 surfaceDetail(vec3 c) {
      if (uTex < 0.5) return c;
      vec3 n = normalize(vTexN);
      vec2 uv = dPlane(vTexP, n) * ${Zr(n)};
      // metres a pixel covers. Every derivative is taken up here: they're undefined inside a branch
      float px = max(length(dFdx(uv)), length(dFdy(uv)));
      {
        float k = 1.0;
        // round, flat-edged shapes (one octave): laid on with a brush, not weathered.
        // A layer faded out by distance skips its noise
        float fb = dFade(px, 1.8), fs = dFade(px, 0.14), g = 0.0;
        if (fb > 0.0) {
          float blot = smoothstep(0.47, 0.53, dNoise(uv * 0.42)) - 0.5;         // big two-tone blotches
          float spot = smoothstep(0.62, 0.66, dNoise(uv * 1.3 + 11.0));          // smaller lighter dabs
          g += fb * (0.09 * blot + 0.06 * spot);
        }
        if (fs > 0.0) g += fs * 0.05 * (dNoise(vec2(uv.x * 0.8 + uv.y * 0.3, uv.y * 8.0)) - 0.5); // brush streaks
        c *= 1.0 + k * g;
        float f = dFade(px, 0.5);
        if (f > 0.0) c *= 1.0 - k * 0.1 * f * dScatter(uv * 1.6, 0.11, 0.3, 0.0);
      }
      ${
        r
          ? `
      {
        float k = 1.0;
        int kind = int(vKind * 8.0 + 0.5);
        float up = smoothstep(0.55, 0.7, n.y), side = 1.0 - smoothstep(0.35, 0.55, abs(n.y));
        vec2 dir = dAcross(n);
        float across = dot(vTexP.xz, dir), aAcross = fwidth(across), aY = fwidth(vTexP.y);
        if (kind == ${W.CONCRETE}) {
          // poured in slabs, a few pebbles
          vec2 g = abs(fract(uv / uSlab + 0.5) - 0.5) * uSlab;
          float joint = (1.0 - smoothstep(0.02, 0.02 + px * 1.5, min(g.x, g.y))) * up * dFade(px, 0.25);
          float f = dFade(px, 0.35);
          float peb = f > 0.0 ? dScatter(uv * 2.6, 0.12, 0.45, 0.0) - 0.7 * dScatter(uv * 1.4 + 9.0, 0.2, 0.22, 0.0) : 0.0;
          c *= 1.0 - k * (0.24 * joint + 0.1 * peb * f);
        } else if (kind == ${W.TARMAC}) {
          // coarse, busy
          float f = dFade(px, 0.25);
          if (f > 0.0) c *= 1.0 - k * 0.1 * f * (dScatter(uv * 4.0, 0.2, 0.7, 0.0) - 0.8 * dScatter(uv * 3.1 + 4.0, 0.16, 0.4, 0.0));
        } else if (kind == ${W.WOOD}) {
          // boards with a seam between, each a touch its own tone, grain along it
          float b = across / 0.32, along = dot(vTexP.xz, vec2(-dir.y, dir.x)) + vTexP.y;
          float id = floor(b), aa = aAcross / 0.32, fw = 1.0 - smoothstep(0.1, 0.4, aa);
          if (fw > 0.0) {
            float seam = 1.0 - smoothstep(0.035, 0.035 + aa * 1.5, 0.5 - abs(fract(b) - 0.5));
            float grain = dNoise(vec2(b * 9.0, along * 1.6 + id * 13.0)) - 0.5;
            c *= 1.0 + k * fw * ((dHash(vec2(id, 3.0)) - 0.5) * 0.12 + 0.06 * grain - 0.22 * seam);
          }
        } else if (kind == ${W.BRICK}) {
          // running bond on anything upright
          float v = vTexP.y / 0.22, row = floor(v);
          float u = across / 0.5 + 0.5 * mod(row, 2.0);
          vec2 f = vec2(fract(u), fract(v)), aa = vec2(aAcross / 0.5, aY / 0.22);
          float mortar = max(1.0 - smoothstep(0.035, 0.035 + aa.x * 1.5, min(f.x, 1.0 - f.x)), 1.0 - smoothstep(0.08, 0.08 + aa.y * 1.5, min(f.y, 1.0 - f.y)));
          c *= 1.0 + k * side * (1.0 - smoothstep(0.1, 0.4, max(aa.x, aa.y))) * ((dHash(vec2(floor(u), row)) - 0.5) * 0.18 + 0.26 * mortar);
        } else if (kind == ${W.GRASS}) {
          // little triangles of darker and lighter green
          float f = dFade(px, 1.1) * up;
          if (f > 0.0) c *= 1.0 - k * f * (0.18 * dScatter(uv * 0.75, 0.2, 0.6, 1.0) - 0.12 * dScatter(uv * 0.55 + 7.0, 0.16, 0.35, 1.0));
        }
      }`
          : ``
      }
      return c;
    }`;
}
var ti = null,
  ni = new i(),
  ri = new i();
function ii() {
  if (ti) return ti;
  let e = new Uint8Array([120, 150, 205, 235, 250, 255, 255, 255]);
  return (
    (ti = new N(e, e.length, 1, x)),
    (ti.minFilter = be),
    (ti.magFilter = be),
    (ti.generateMipmaps = !1),
    (ti.needsUpdate = !0),
    ti
  );
}
var ai = `getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] )`,
  oi = G.lights_fragment_begin.replace(
    ai,
    `shadowEdgeFade( ${ai}, vDirectionalShadowCoord[ i ] )`,
  );
oi === G.lights_fragment_begin &&
  console.warn(
    `[toon] three's lights_fragment_begin changed: shadow edges won't fade`,
  );
var si = `
  float shadowEdgeFade(float shadow, vec4 coord) {
    vec2 uv = coord.xy / coord.w;
    float edge = min(min(uv.x, 1.0 - uv.x), min(uv.y, 1.0 - uv.y));
    return mix(1.0, shadow, smoothstep(0.0, 0.125, edge));
  }`;
function toonMaterial(e = {}) {
  return new c({ gradientMap: ii(), ...e });
}
var li = {
  uRimShade: { value: new H(0.62, 0.55, 0.95) },
  uRimSun: { value: new H(1, 0.86, 0.72) },
  uLampGlow: { value: 0 },
};
function patchToon(e, t = {}) {
  let n = t.rim ?? 0.35,
    r = !!t.ao,
    i = !!t.glow,
    a = !!t.rider,
    o = t.kind === !0 ? `attribute` : typeof t.kind == `number` ? t.kind : null;
  return (
    (e.onBeforeCompile = (e) => {
      ((e.uniforms.uRim = { value: n }),
        (e.uniforms.uRimShade = li.uRimShade),
        (e.uniforms.uRimSun = li.uRimSun),
        i && (e.uniforms.uLampGlow = li.uLampGlow),
        (e.uniforms.uTex = Xr.uTex),
        o !== null && (e.uniforms.uSlab = Xr.uSlab));
      let t =
          (r
            ? `attribute float ao;
varying float vAO;
`
            : ``) +
          (i
            ? `attribute float glow;
varying float vGlow;
`
            : ``) +
          Qr(o),
        s =
          (r
            ? `
  vAO = ao;`
            : ``) +
          (i
            ? `
  vGlow = glow;`
            : ``);
      ((e.vertexShader = e.vertexShader
        .replace(`void main() {`, `${t}void main() {${s}`)
        .replace(
          `#include <project_vertex>`,
          `#include <project_vertex>${$r(a, o)}`,
        )),
        (e.fragmentShader = e.fragmentShader
          .replace(
            `void main() {`,
            `uniform float uRim;\nuniform vec3 uRimShade, uRimSun;\n${
              r
                ? `varying float vAO;
`
                : ``
            }${
              i
                ? `uniform float uLampGlow;
varying float vGlow;
`
                : ``
            }${ei(a, o)}${si}\nvoid main() {`,
          )
          .replace(`#include <lights_fragment_begin>`, oi)
          .replace(
            `#include <lights_toon_fragment>`,
            `diffuseColor.rgb = surfaceDetail( diffuseColor.rgb );
#include <lights_toon_fragment>`,
          )
          .replace(
            `#include <opaque_fragment>`,
            `
        {
          ${r ? `outgoingLight *= mix(0.55, 1.0, vAO);` : ``}
          vec3 vdir = normalize(vViewPosition);
          float fres = 1.0 - clamp(dot(normal, vdir), 0.0, 1.0);
          float band = smoothstep(0.6, 0.7, fres);
          outgoingLight += band * uRim * mix(uRimShade, uRimSun, clamp(normal.y * 0.5 + 0.5, 0.0, 1.0)) * (0.25 + diffuseColor.rgb);
          ${i ? `outgoingLight = mix(outgoingLight, diffuseColor.rgb * 1.2, vGlow * uLampGlow);` : ``}
        }
        #include <opaque_fragment>`,
          )));
    }),
    (e.customProgramCacheKey = () => `toon-${n}-${r}-${i}-${a}-${o}`),
    (e.needsUpdate = !0),
    e
  );
}
