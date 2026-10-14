// assets/fxHooks-Cvx_8YWC 02 — math
// Lines 103-783 of readable/assets/fxHooks-Cvx_8YWC.pretty.js (statement-aligned).
var Le = class {
    mesh;
    geo;
    aPos;
    aCol;
    aMisc;
    px = new Float32Array(F);
    py = new Float32Array(F);
    pz = new Float32Array(F);
    vx = new Float32Array(F);
    vy = new Float32Array(F);
    vz = new Float32Array(F);
    life = new Float32Array(F);
    max = new Float32Array(F);
    s0 = new Float32Array(F);
    s1 = new Float32Array(F);
    grav = new Float32Array(F);
    drag = new Float32Array(F);
    shape = new Float32Array(F);
    rot = new Float32Array(F);
    spin = new Float32Array(F);
    home = Array(F).fill(null);
    homeY = new Float32Array(F);
    anchor = Array(F).fill(null);
    orbit = new Float32Array(F);
    axis = Array(F).fill(null);
    solid = new Uint8Array(F);
    pop = new Float32Array(F);
    shrink = new Float32Array(F);
    free = new Uint16Array(F).map((e, t) => 1199 - t);
    nFree = F;
    hi = 0;
    colLo = F;
    colHi = -1;
    scale = 1;
    constructor() {
      let n = new s(1, 1);
      ((this.geo = new i()),
        (this.geo.index = n.index),
        this.geo.setAttribute(`position`, n.getAttribute(`position`)),
        this.geo.setAttribute(`uv`, n.getAttribute(`uv`)),
        (this.aPos = new t(new Float32Array(F * 3), 3).setUsage(e)),
        (this.aCol = new t(new Float32Array(F * 3), 3).setUsage(e)),
        (this.aMisc = new t(new Float32Array(F * 4), 4).setUsage(e)),
        this.geo.setAttribute(`iPos`, this.aPos),
        this.geo.setAttribute(`iCol`, this.aCol),
        this.geo.setAttribute(`iMisc`, this.aMisc),
        (this.geo.instanceCount = 0));
      let r = new f({
        transparent: !0,
        depthWrite: !1,
        blending: 1,
        uniforms: { uInk: { value: new y(C) } },
        vertexShader: `
        attribute vec3 iPos; attribute vec3 iCol; attribute vec4 iMisc;
        varying vec2 vUv; varying vec3 vCol; varying float vAlpha; varying float vShape; varying float vPhase; varying float vInk;
        void main() {
          float sh = mod(iMisc.z, 16.0);
          vec4 mv = modelViewMatrix * vec4(iPos, 1.0);
          float depth = -mv.z;
          // the chase camera drives through what it leaves behind: fade out close up, never more than a tenth of the screen tall
          vUv = uv; vCol = iCol; vAlpha = iMisc.y * smoothstep(1.4, 3.0, depth); vShape = sh; vPhase = iMisc.w; vInk = step(15.5, iMisc.z);
          float size = min(iMisc.x, 0.2 * depth / projectionMatrix[1][1]);
          // a bat stays upright (its angle is the wingbeat's phase), and so does a sprout
          bool upright = (sh > 3.5 && sh < 4.5) || (sh > 10.5 && sh < 11.5);
          float c = upright ? 1.0 : cos(iMisc.w), s = upright ? 0.0 : sin(iMisc.w);
          vec2 p = mat2(c, -s, s, c) * position.xy;
          if (sh > 2.5 && sh < 4.5) p.y *= 3.5; // sparks streak; bats keep the tall cut they shipped with
          mv.xy += p * size;
          gl_Position = projectionMatrix * mv;
        }`,
        fragmentShader: `
        uniform vec3 uInk;
        varying vec2 vUv; varying vec3 vCol; varying float vAlpha; varying float vShape; varying float vPhase; varying float vInk;
        /** The rim's width, in the quad's -1..1 units. */
        const float RIM = 0.14;
        void main() {
          vec2 q = (vUv - 0.5) * 2.0;
          float r = length(q);
          vec3 col = vCol;
          float a;
          if (vShape < 0.5) a = smoothstep(1.0, 0.2, r);
          else if (vShape > 2.5 && vShape < 3.5) a = smoothstep(1.0, 0.0, r);
          else if (vShape > 3.5 && vShape < 4.5) {
            // bat: a round body, ears, and scalloped wings beating with the phase
            float ax = abs(q.x), flap = sin(vPhase);
            float top = 0.1 + ax * (0.15 + 0.55 * flap) - ax * ax * 0.25;
            float bottom = top - 0.42 * (1.0 - ax) - 0.1 * abs(sin(ax * 9.42));
            float wing = step(0.12, ax) * step(ax, 0.96) * step(bottom, q.y) * step(q.y, top);
            float body = step(length(q / vec2(0.2, 0.32)), 1.0);
            float ears = step(0.08, ax) * step(ax, 0.2) * step(0.2, q.y) * step(q.y, 0.42 - (ax - 0.08) * 1.5);
            a = max(wing, max(body, ears));
          } else {
            // the rest are distance fields (q units, < 0 inside), so an ink rim can wrap any of them
            if (vInk > 0.5) { q *= 1.0 + RIM; r *= 1.0 + RIM; }
            float sd;
            if (vShape > 11.5) sd = length(vec2(q.x, max(abs(q.y) - 0.72, 0.0))) - 0.22; // dash: a capsule down the quad
            else if (vShape > 10.5) {
              // sprout: a stem from the foot, two leaves fanned off its top
              float stem = max(abs(q.x + 0.04 * q.y) - 0.07, max(-0.98 - q.y, q.y - 0.3));
              vec2 l = vec2(abs(q.x), q.y) - vec2(0.42, 0.42);
              l = mat2(0.866, -0.5, 0.5, 0.866) * l; // into the leaf's frame: it points up and out at 30°
              float leaf = (length(l / vec2(0.46, 0.24)) - 1.0) * 0.24;
              sd = min(stem, leaf);
              if (abs(l.y) < 0.035 && abs(l.x) < 0.36) col *= 0.75; // a midrib
            } else if (vShape > 9.5) {
              // heart: two lobes over a point
              vec2 h = vec2(abs(q.x), q.y);
              float lobes = length(h - vec2(0.36, 0.28)) - 0.44;
              float point = max((h.x - (q.y + 0.86) * 0.62) * 0.85, q.y - 0.4);
              sd = min(lobes, point);
            } else if (vShape > 8.5) {
              // cloud: three puffs on a flat base, shaded underneath
              float c = min(min(length(q - vec2(-0.48, -0.12)) - 0.38, length(q - vec2(0.02, 0.12)) - 0.52), length(q - vec2(0.5, -0.08)) - 0.4);
              sd = max(c, -0.5 - q.y);
              col *= mix(0.8, 1.0, smoothstep(-0.5, 0.05, q.y));
            } else if (vShape < 1.5 || vShape > 7.5) sd = r - 0.92;
            else if (vShape < 2.5) sd = max(abs(q.x), abs(q.y)) - 1.0;
            else if (vShape < 5.5) sd = (abs(q.x) * 1.7 + abs(q.y) - 1.0) / 1.97; // harlequin diamond, taller than wide
            else if (vShape < 6.5) {
              // leaf: two arcs meeting at the tips, a darker midrib
              sd = max(length(q - vec2(0.5, 0.0)), length(q + vec2(0.5, 0.0))) - 0.95;
              if (abs(q.x) < 0.045 && abs(q.y) < 0.62) col *= 0.72;
            } else {
              // snowflake: six arms with a pair of twigs each, and a heart
              float th = atan(q.y, q.x);
              float seg = 1.0471976;
              float k = th - seg * floor(th / seg + 0.5); // angle off the nearest arm
              vec2 v = vec2(cos(k), sin(k)) * r; // along the arm, across it
              float arm = max(abs(v.y) - 0.08, v.x - 0.95);
              vec2 tw = vec2(v.x - 0.55, abs(v.y));
              float twig = max(abs(dot(tw, vec2(-0.7071, 0.7071))) - 0.06, max(-tw.x, tw.x - 0.3));
              sd = min(min(arm, twig), r - 0.26);
            }
            float aa = fwidth(sd) + 1e-4;
            a = 1.0 - smoothstep(-aa, 0.0, sd);
            if (vShape > 7.5 && vShape < 11.5) {
              // toon ball: a shaded side away from the light, a hard highlight towards it
              col *= mix(1.0, 0.7, step(0.55, dot(q, vec2(0.6, -0.8)) + 0.25 * r));
              col = mix(col, vec3(1.0), 0.85 * (1.0 - smoothstep(0.17 - aa, 0.17, length((q - vec2(-0.34, 0.4)) * vec2(1.0, 1.4)))));
            }
            if (vInk > 0.5) {
              float w = vShape > 6.5 && vShape < 7.5 ? 0.07 : RIM; // a flake's arms sit close: a thin rim keeps the gaps
              col = mix(uInk, col, a);
              a = 1.0 - smoothstep(w - aa, w, sd);
            }
          }
          if (vAlpha * a < 0.01) discard;
          gl_FragColor = vec4(col, vAlpha * a);
          #include <colorspace_fragment>
        }`,
      });
      ((this.mesh = new x(this.geo, r)),
        (this.mesh.frustumCulled = !1),
        (this.mesh.renderOrder = 3),
        (this.mesh.visible = !1));
    }
    emit(e) {
      let t = Math.max(1, Math.round(e.count * this.scale)),
        n = Array.isArray(e.color) ? e.color : [e.color],
        r = e.spread ?? 1,
        [i, a, o] = e.dir ?? [0, 0, 0];
      for (let s = 0; s < t && this.nFree; s++) {
        let t = this.free[--this.nFree];
        if (
          (t >= this.hi && (this.hi = t + 1),
          (this.px[t] = e.x),
          (this.py[t] = e.y),
          (this.pz[t] = e.z),
          e.exact)
        )
          ((this.vx[t] = i * e.speed),
            (this.vy[t] = a * e.speed),
            (this.vz[t] = o * e.speed));
        else {
          let n = Math.random() * 2 - 1,
            s = Math.random() * Math.PI * 2,
            c = Math.sqrt(1 - n * n),
            l = e.speed * (0.4 + Math.random() * 0.6);
          ((this.vx[t] = (c * Math.cos(s) * r + i) * l),
            (this.vy[t] = (Math.abs(n) * r * (e.up ?? 1) + a) * l),
            (this.vz[t] = (c * Math.sin(s) * r + o) * l));
        }
        (e.vel &&
          ((this.vx[t] += e.vel[0]),
          (this.vy[t] += e.vel[1]),
          (this.vz[t] += e.vel[2])),
          (this.home[t] = e.home ?? null),
          (this.homeY[t] = e.homeY ?? 0),
          (this.anchor[t] = e.anchor ?? null),
          (this.orbit[t] = e.orbit ?? 0),
          (this.axis[t] = e.axis ?? null),
          (this.solid[t] = +!!e.solid),
          (this.pop[t] = e.pop ?? 0),
          (this.shrink[t] = e.shrink ?? 0));
        let [c, l] = e.life ?? [0.4, 0.8];
        this.max[t] = this.life[t] = c + Math.random() * (l - c);
        let [u, d] = e.size ?? [0.2, 0.5];
        ((this.s0[t] = u),
          (this.s1[t] = d),
          (this.grav[t] = e.gravity ?? 0),
          (this.drag[t] = e.drag ?? 2),
          (this.shape[t] = (e.shape ?? 0) + (e.ink ? Fe : 0)),
          (this.rot[t] = e.rot ?? Math.random() * 6.28),
          (this.spin[t] =
            e.spin === void 0
              ? (Math.random() - 0.5) *
                (e.shape === 2 || e.shape === 5 ? 14 : 3)
              : e.spin * (0.8 + Math.random() * 0.4)));
        let f = Pe(n[s % n.length]);
        (this.aCol.setXYZ(t, f.r, f.g, f.b),
          t < this.colLo && (this.colLo = t),
          t > this.colHi && (this.colHi = t));
      }
    }
    cut(e, t, n = -1) {
      for (let r = 0; r < this.hi; r++)
        this.life[r] <= t ||
          (this.home[r] !== e && this.anchor[r] !== e) ||
          (n >= 0 && this.shape[r] % Fe !== n) ||
          this.end(r, t);
    }
    hurry(e) {
      for (let t = 0; t < this.hi; t++) this.life[t] > e && this.end(t, e);
    }
    end(e, t) {
      let n = 1 - this.life[e] / this.max[e];
      ((this.max[e] = t / Math.max(0.001, 1 - Math.max(n, 0.9))),
        (this.life[e] = t));
    }
    update(e) {
      let t = 0;
      for (let n = 0; n < this.hi; n++) {
        if (this.life[n] <= 0) continue;
        if (((this.life[n] -= e), this.life[n] <= 0)) {
          (this.aMisc.setXYZW(n, 0, 0, 0, 0),
            (this.home[n] = this.anchor[n] = this.axis[n] = null),
            (this.free[this.nFree++] = n));
          continue;
        }
        t = n + 1;
        let r = Math.max(0, 1 - this.drag[n] * e);
        ((this.vx[n] *= r),
          (this.vy[n] = this.vy[n] * r - this.grav[n] * e),
          (this.vz[n] *= r));
        let i = this.home[n];
        if (i) {
          let t = i.x - this.px[n],
            r = i.y + this.homeY[n] - this.py[n],
            a = i.z - this.pz[n];
          ((this.vx[n] += (81 * t - 18 * this.vx[n]) * e),
            (this.vy[n] += (81 * r - 18 * this.vy[n]) * e),
            (this.vz[n] += (81 * a - 18 * this.vz[n]) * e),
            t * t + r * r + a * a < 0.06 &&
              ((this.life[n] = Math.min(this.life[n], 0.05)),
              (this.home[n] = null)));
        }
        ((this.px[n] += this.vx[n] * e),
          (this.py[n] += this.vy[n] * e),
          (this.pz[n] += this.vz[n] * e));
        let a = this.anchor[n];
        if (a) {
          let t = this.orbit[n] * e,
            r = this.axis[n];
          if (t !== 0 && r)
            (Ie(this.px, this.py, this.pz, n, r, t),
              Ie(this.vx, this.vy, this.vz, n, r, t));
          else if (t !== 0) {
            let e = Math.cos(t),
              r = Math.sin(t),
              i = this.px[n],
              a = this.pz[n],
              o = this.vx[n],
              s = this.vz[n];
            ((this.px[n] = i * e + a * r),
              (this.pz[n] = a * e - i * r),
              (this.vx[n] = o * e + s * r),
              (this.vz[n] = s * e - o * r));
          }
        } else
          this.py[n] < 0.02 &&
            this.grav[n] > 0 &&
            ((this.py[n] = 0.02),
            (this.vy[n] *= -0.3),
            (this.vx[n] *= 0.6),
            (this.vz[n] *= 0.6));
        this.rot[n] += this.spin[n] * e;
        let o = 1 - this.life[n] / this.max[n],
          s = this.s0[n] + (this.s1[n] - this.s0[n]) * o;
        if (this.pop[n] > 0) {
          let e = Math.min(1, (this.max[n] - this.life[n]) / this.pop[n]);
          s *=
            e < 0.6
              ? 1.2 * (1 - (1 - e / 0.6) ** 2)
              : 1.2 - 0.2 * ((e - 0.6) / 0.4);
        }
        this.life[n] < this.shrink[n] && (s *= this.life[n] / this.shrink[n]);
        let c = this.solid[n]
          ? Math.min(1, (1 - o) / 0.08)
          : o < 0.1
            ? o * 10
            : 1 - Math.max(0, (o - 0.55) / 0.45);
        (a
          ? this.aPos.setXYZ(
              n,
              a.x + this.px[n],
              a.y + this.py[n],
              a.z + this.pz[n],
            )
          : this.aPos.setXYZ(n, this.px[n], this.py[n], this.pz[n]),
          this.aMisc.setXYZW(
            n,
            Math.max(0, s),
            Math.max(0, c),
            this.shape[n],
            this.rot[n],
          ));
      }
      ((this.hi = t),
        (this.geo.instanceCount = t),
        (this.mesh.visible = t > 0),
        t &&
          (this.aPos.addUpdateRange(0, t * 3),
          (this.aPos.needsUpdate = !0),
          this.aMisc.addUpdateRange(0, t * 4),
          (this.aMisc.needsUpdate = !0),
          this.colHi >= this.colLo &&
            (this.aCol.addUpdateRange(
              this.colLo * 3,
              (this.colHi - this.colLo + 1) * 3,
            ),
            (this.aCol.needsUpdate = !0),
            (this.colLo = F),
            (this.colHi = -1))));
    }
    dispose() {
      (this.mesh.removeFromParent(),
        this.geo.dispose(),
        this.mesh.material.dispose());
    }
  },
  I = 200,
  L = {
    RING: 0,
    FOOT: 1,
    WEB: 2,
    CLAW: 3,
    CROP: 4,
    FROST: 5,
    SPIRAL: 6,
    SPLAT: 7,
  },
  R = new y(),
  Re = new y(C),
  ze = class {
    mesh;
    geo;
    aPos;
    aU;
    aV;
    aCol;
    aInk;
    aMisc;
    life = new Float32Array(I);
    max = new Float32Array(I);
    peak = new Float32Array(I);
    pop = new Float32Array(I);
    mirror = new Int8Array(I);
    next = 0;
    constructor() {
      let n = new s(2, 2);
      ((this.geo = new i()),
        (this.geo.index = n.index),
        this.geo.setAttribute(`position`, n.getAttribute(`position`)));
      let r = (n) => new t(new Float32Array(I * n), n).setUsage(e);
      ((this.aPos = r(3)),
        (this.aU = r(3)),
        (this.aV = r(3)),
        (this.aCol = r(3)),
        (this.aInk = r(3)),
        (this.aMisc = r(4)),
        this.geo.setAttribute(`iPos`, this.aPos),
        this.geo.setAttribute(`iU`, this.aU),
        this.geo.setAttribute(`iV`, this.aV),
        this.geo.setAttribute(`iCol`, this.aCol),
        this.geo.setAttribute(`iInk`, this.aInk),
        this.geo.setAttribute(`iMisc`, this.aMisc),
        (this.geo.instanceCount = I));
      let a = new f({
        transparent: !0,
        depthWrite: !1,
        polygonOffset: !0,
        polygonOffsetFactor: -2,
        polygonOffsetUnits: -4,
        blending: 1,
        vertexShader: `
        attribute vec3 iPos; attribute vec3 iU; attribute vec3 iV; attribute vec3 iCol; attribute vec3 iInk; attribute vec4 iMisc;
        varying vec2 vQ; varying vec3 vCol; varying vec3 vInk; varying vec4 vMisc;
        void main() {
          vQ = position.xy; vCol = iCol; vInk = iInk; vMisc = iMisc;
          vec3 p = iPos + (iU * position.x + iV * position.y) * abs(iMisc.w);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }`,
        fragmentShader: `
        varying vec2 vQ; varying vec3 vCol; varying vec3 vInk; varying vec4 vMisc;
        const float RIM = 0.07;
        float sdEllipse(vec2 p, vec2 c, vec2 r) { return (length((p - c) / r) - 1.0) * min(r.x, r.y); }
        float hash(float n) { return fract(sin(n * 127.1) * 43758.5453); }
        float sdSeg(vec2 p, vec2 a, vec2 b) { vec2 pa = p - a, ba = b - a; return length(pa - ba * clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0)); }
        void main() {
          float kind = vMisc.x, t = vMisc.z;
          vec2 q = vQ * (1.0 + RIM);
          if (vMisc.w < 0.0) q.x = -q.x;
          float r = length(q), a = atan(q.y, q.x);
          float sd, rim = RIM;
          // lines: ink drawn inside the fill (cracks); back: a faint ink disc behind open shapes (a web)
          float lines = 1.0, back = 0.0;
          if (kind < 0.5) {
            // a ring that grows and thins as it goes
            float rad = 0.35 + 0.6 * sqrt(t), w = 0.12 * (1.0 - t) + 0.03;
            sd = abs(r - rad) - w;
          } else if (kind < 1.5) {
            // footprint (toes up the quad): sole, heel, the arch cut in, five round toes clear of the sole
            sd = min(sdEllipse(q, vec2(0.0, 0.02), vec2(0.44, 0.45)), sdEllipse(q, vec2(-0.02, -0.55), vec2(0.36, 0.36)));
            sd = max(sd, -(sdEllipse(q, vec2(-0.52, -0.12), vec2(0.2, 0.42))));
            for (int i = 0; i < 5; i++) {
              float fi = float(i);
              vec2 c = vec2(-0.36 + fi * 0.18, 0.78 - abs(fi - 1.0) * 0.06);
              sd = min(sd, sdEllipse(q, c, vec2(fi < 0.5 ? 0.13 : 0.095, fi < 0.5 ? 0.14 : 0.11)));
            }
          } else if (kind < 2.5) {
            // web: eight spokes, a spiral of chords between them, on a faint disc so it reads on a pale wall
            float k = (fract(a / 0.7853982 + 0.5) - 0.5) * 0.7853982;
            float rc = r * cos(k) / cos(0.3926991);
            float ring = abs(fract(rc * 4.8 - a / 6.2831853) - 0.5) / 4.8;
            sd = min(abs(sin(k)) * r - 0.04, ring - 0.04);
            sd = max(sd, r - 0.95);
            rim = 0.03;
            back = 0.35 * (1.0 - smoothstep(0.9, 0.95, r));
          } else if (kind < 3.5) {
            // a yeti's foot: a broad sole, four toes, a claw off each
            sd = sdEllipse(q, vec2(0.0, -0.28), vec2(0.78, 0.62));
            for (int i = 0; i < 4; i++) {
              float x = -0.6 + float(i) * 0.4;
              float y = 0.5 - abs(x) * 0.15;
              sd = min(sd, sdEllipse(q, vec2(x, y), vec2(0.17, 0.2)));
              sd = min(sd, sdEllipse(q, vec2(x * 1.08, y + 0.3), vec2(0.06, 0.13)));
            }
          } else if (kind < 4.5) {
            // crop pattern: one ring, a trail of satellites on an arc off it
            sd = abs(r - 0.6) - 0.07;
            for (int i = 0; i < 4; i++) {
              float an = 0.35 + float(i) * 0.42, rr = 0.6 + float(i) * 0.09;
              sd = min(sd, length(q - vec2(cos(an), sin(an)) * (rr + 0.2)) - (0.14 - float(i) * 0.025));
            }
          } else if (kind < 5.5) {
            // frost: an angular patch of ice, straight cracks across it
            float seg = 0.6981317; // nine corners
            float i0 = floor(a / seg), f0 = a / seg - i0;
            float edge = mix(0.72 + 0.22 * hash(i0), 0.72 + 0.22 * hash(i0 + 1.0), f0);
            sd = (r - edge) * 0.8;
            for (int i = 0; i < 6; i++) {
              float fi = float(i);
              float an = fi * 1.0471976 + (hash(fi + 7.0) - 0.5) * 0.6;
              vec2 dir = vec2(cos(an), sin(an)), side = vec2(-dir.y, dir.x);
              vec2 mid = dir * (0.3 + 0.2 * hash(fi + 3.0)) + side * (hash(fi + 5.0) - 0.5) * 0.25;
              vec2 end = dir * 0.9;
              lines = min(lines, min(sdSeg(q, vec2(0.0), mid), sdSeg(q, mid, end)));
            }
            rim = 0.04;
          } else if (kind < 6.5) {
            // an Archimedean spiral, two turns out to the rim, thinning as it goes
            float ap = a + 3.1415927;
            float d = min(abs(r - 0.0716 * ap), abs(r - 0.0716 * (ap + 6.2831853)));
            sd = max(d - 0.07 * (1.05 - r), r - 0.95);
          } else {
            // splash: a lumpy blob and a few drops thrown off it
            float edge = 0.55 + 0.1 * sin(a * 3.0 + 1.0) + 0.07 * sin(a * 5.0 + 2.0) + 0.05 * sin(a * 8.0);
            sd = (r - edge) * 0.8;
            for (int i = 0; i < 5; i++) {
              float an = float(i) * 1.2566371 + 0.4 + hash(float(i)) * 0.6;
              sd = min(sd, length(q - vec2(cos(an), sin(an)) * (0.78 + 0.12 * hash(float(i) + 2.0))) - 0.06 - 0.05 * hash(float(i) + 4.0));
            }
          }
          float aa = fwidth(sd) + 1e-4;
          float fill = 1.0 - smoothstep(-aa, 0.0, sd);
          float alpha = 1.0 - smoothstep(rim - aa, rim, sd);
          vec3 col = mix(vInk, vCol, fill);
          float la = fwidth(lines) + 1e-4;
          col = mix(col, vInk, (1.0 - smoothstep(0.022 - la, 0.022, lines)) * fill);
          float under = max(alpha, back);
          col = mix(vInk, col, alpha / max(under, 1e-4));
          alpha = under * vMisc.y;
          if (alpha < 0.01) discard;
          gl_FragColor = vec4(col, alpha);
          #include <colorspace_fragment>
        }`,
      });
      ((this.mesh = new x(this.geo, a)),
        (this.mesh.frustumCulled = !1),
        (this.mesh.renderOrder = 2));
    }
    lay(e) {
      let t = this.next;
      this.next = (this.next + 1) % I;
      let n = Math.hypot(e.nx, e.ny, e.nz) || 1,
        r = e.nx / n,
        i = e.ny / n,
        a = e.nz / n,
        o = e.dx * r + e.dy * i + e.dz * a,
        s = e.dx - o * r,
        c = e.dy - o * i,
        l = e.dz - o * a;
      ((n = Math.hypot(s, c, l) || 1), (s /= n), (c /= n), (l /= n));
      let u = c * a - l * i,
        d = l * r - s * a,
        f = s * i - c * r;
      (this.aPos.setXYZ(t, e.x + r * 0.02, e.y + i * 0.02, e.z + a * 0.02),
        this.aU.setXYZ(t, u * e.w, d * e.w, f * e.w),
        this.aV.setXYZ(t, s * e.h, c * e.h, l * e.h),
        R.set(e.color),
        this.aCol.setXYZ(t, R.r, R.g, R.b),
        e.ink ? R.set(e.ink) : R.copy(Re),
        this.aInk.setXYZ(t, R.r, R.g, R.b),
        this.aMisc.setXYZW(t, e.kind, 0, 0, 0),
        (this.max[t] = this.life[t] = e.life),
        (this.peak[t] = e.alpha ?? 1),
        (this.pop[t] = e.pop ?? 0.12),
        (this.mirror[t] = e.left ? -1 : 1),
        (this.aPos.needsUpdate =
          this.aU.needsUpdate =
          this.aV.needsUpdate =
          this.aCol.needsUpdate =
          this.aInk.needsUpdate =
            !0));
    }
    hurry(e) {
      for (let t = 0; t < I; t++) {
        if (this.life[t] <= e) continue;
        let n = Math.min(1, (3 * this.life[t]) / this.max[t]);
        ((this.life[t] = e), (this.max[t] = (3 * e) / Math.max(n, 0.001)));
      }
    }
    update(e) {
      for (let t = 0; t < I; t++) {
        if (this.life[t] <= 0) {
          this.aMisc.getW(t) !== 0 && this.aMisc.setXYZW(t, 0, 0, 0, 0);
          continue;
        }
        this.life[t] = Math.max(0, this.life[t] - e);
        let n = this.max[t] - this.life[t],
          r = n / this.max[t],
          i = Math.min(1, n / this.pop[t]),
          a =
            i < 0.6
              ? 0.3 + 0.8 * (1 - (1 - i / 0.6) ** 2)
              : 1.1 - 0.1 * ((i - 0.6) / 0.4);
        this.aMisc.setXYZW(
          t,
          this.aMisc.getX(t),
          this.peak[t] * Math.min(1, (1 - r) * 3),
          r,
          a * this.mirror[t],
        );
      }
      this.aMisc.needsUpdate = !0;
    }
    dispose() {
      (this.mesh.removeFromParent(),
        this.geo.dispose(),
        this.mesh.material.dispose());
    }
  },
  Be = `Lilita One`,
  Ve = 10,
  He = class {
    group = new u();
    tex = new Map();
    words = [];
    constructor() {
      for (let e = 0; e < Ve; e++) {
        let e = new v(new re({ transparent: !0, depthWrite: !1 }));
        ((e.visible = !1),
          (e.renderOrder = 4),
          this.group.add(e),
          this.words.push({
            sprite: e,
            age: 0,
            life: 0,
            size: 0,
            tilt: 0,
            rise: 0,
            anchor: null,
            x: 0,
            y: 0,
            z: 0,
            out: -1,
            outS: 0,
          }));
      }
      document.fonts?.load(`64px "${Be}"`).then(() => {
        for (let [e, t] of this.tex) Ue(t.image, e, t.userData.fill);
        for (let e of this.tex.values()) e.needsUpdate = !0;
      });
    }
    say(e, t, n, r, i, a, o, s = 0.6, c = 0.6, l = null) {
      let u = this.words.reduce((e, t) =>
          e.life - e.age < t.life - t.age ? e : t,
        ),
        f = `${e}|${t}`,
        p = this.tex.get(f);
      if (!p) {
        let n = document.createElement(`canvas`);
        (Ue(n, e, t),
          (p = new _(n)),
          (p.colorSpace = d),
          (p.minFilter = ne),
          (p.userData.fill = t),
          this.tex.set(f, p));
      }
      let m = u.sprite.material;
      ((m.map = p),
        (m.needsUpdate = !0),
        Object.assign(u, {
          age: 0,
          life: s,
          size: a,
          tilt: o,
          rise: c,
          anchor: l,
          x: n,
          y: r,
          z: i,
          out: -1,
        }),
        (u.sprite.visible = !0));
    }
    hurry(e) {
      for (let t of this.words)
        t.sprite.visible &&
          t.life - t.age > e &&
          t.out < 0 &&
          (t.out = t.outS = e);
    }
    update(e) {
      for (let t of this.words) {
        if (!t.sprite.visible) continue;
        if (((t.age += e), t.out >= 0 && (t.out -= e) <= 0)) {
          t.sprite.visible = !1;
          continue;
        }
        if (t.age >= t.life) {
          t.sprite.visible = !1;
          continue;
        }
        let n = t.age / t.life,
          r =
            n < 0.2
              ? 0.4 + 0.8 * Math.sin((n / 0.2) * Math.PI * 0.5)
              : 1.2 - 0.2 * Math.min(1, (n - 0.2) / 0.15),
          i = t.sprite.material.map.image;
        t.sprite.scale.set(t.size * r * (i.width / i.height), t.size * r, 1);
        let a = t.anchor;
        t.sprite.position.set(
          (a?.x ?? 0) + t.x,
          (a?.y ?? 0) + t.y + t.rise * Math.sqrt(n),
          (a?.z ?? 0) + t.z,
        );
        let o = t.sprite.material;
        ((o.rotation = t.tilt),
          (o.opacity =
            (n > 0.7 ? 1 - (n - 0.7) / 0.3 : 1) *
            (t.out > 0 ? t.out / t.outS : 1)));
      }
    }
    dispose() {
      this.group.removeFromParent();
      for (let e of this.words) e.sprite.material.dispose();
      for (let e of this.tex.values()) e.dispose();
    }
  };
