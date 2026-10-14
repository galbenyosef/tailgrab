// assets__fxHooks-Cvx_8YWC 07 — math
// Lines 3007-3351 of readable/assets__fxHooks-Cvx_8YWC.pretty.js (statement-aligned).
function Sn(e) {
  return e >= 5e4
    ? { text: `INSANE!!`, tone: `pink` }
    : e >= 2e4
      ? { text: `GNARLY!`, tone: `pink` }
      : e >= 8e3
        ? { text: `SICK!`, tone: `gold` }
        : e >= 2500
          ? { text: `SWEET!`, tone: `mint` }
          : e >= 600
            ? { text: `NICE!`, tone: `sky` }
            : null;
}
var Cn = 1300,
  wn = class {
    top;
    bot;
    timer = 0;
    constructor(e) {
      ((this.top = k(`div`, `cine-bar top`)),
        (this.bot = k(`div`, `cine-bar bot`)),
        e.append(this.top, this.bot));
    }
    show(e) {
      let t = k(`span`, `cine-tag`);
      t.append(be(`star`), `SPECIAL`);
      let n = k(`div`, `cine-text`);
      (n.append(t, e.toUpperCase()),
        this.bot.replaceChildren(n),
        document.body.classList.add(`cine-on`),
        clearTimeout(this.timer),
        (this.timer = window.setTimeout(() => this.hide(), Cn)));
    }
    hide() {
      (clearTimeout(this.timer), document.body.classList.remove(`cine-on`));
    }
  },
  Tn = `#FFD21F`,
  En = `#2FD67B`,
  Dn = `#FFF6C0`,
  On = null;
function kn() {
  if (On) return On;
  let e = document.createElement(`canvas`);
  ((e.width = 4), (e.height = 128));
  let t = e.getContext(`2d`),
    n = t.createLinearGradient(0, 128, 0, 0);
  return (
    n.addColorStop(0, `rgba(255,255,255,1)`),
    n.addColorStop(0.3, `rgba(255,255,255,0.55)`),
    n.addColorStop(1, `rgba(255,255,255,0)`),
    (t.fillStyle = n),
    t.fillRect(0, 0, 4, 128),
    (On = new _(e)),
    (On.colorSpace = d),
    On
  );
}
var An = 1.7,
  jn = class {
    group = new u();
    beams = [];
    beamGeo = new c(1, 1, 1, 24, 1, !0).translate(0, 0.5, 0);
    ringGeo = new r(0.88, 1, 48).rotateX(-Math.PI / 2);
    spawn(e, t = !0) {
      let n = e();
      if (!n) return;
      let r = (e) =>
          new l({
            map: kn(),
            color: e,
            transparent: !0,
            depthWrite: !1,
            blending: 2,
            side: 2,
            forceSinglePass: !0,
          }),
        i = new x(this.beamGeo, r(Tn)),
        a = new x(this.beamGeo, r(Dn)),
        o = [Tn, En].map(
          (e) =>
            new x(
              this.ringGeo,
              new l({
                color: e,
                transparent: !0,
                depthWrite: !1,
                side: 2,
                forceSinglePass: !0,
              }),
            ),
        );
      for (let e of [i, a, ...o]) e.renderOrder = 6;
      let s = new u();
      for (
        s.add(i, a, ...o),
          s.position.set(n.x, n.y, n.z),
          this.group.add(s),
          this.beams.push({
            pos: e,
            t: 0,
            scale: t ? 1 : 0.6,
            root: s,
            beam: i,
            core: a,
            rings: o,
          });
        this.beams.length > 6;
      )
        this.drop(0);
    }
    update(e) {
      for (let t = this.beams.length - 1; t >= 0; t--) {
        let n = this.beams[t];
        n.t += e;
        let r = n.t,
          i = n.scale;
        if (r >= An) {
          this.drop(t);
          continue;
        }
        let a = n.pos();
        a && n.root.position.set(a.x, a.y, a.z);
        let o = 1 - (1 - Math.min(1, r / 0.2)) ** 3,
          s = r < 0.5 ? 1 : Math.max(0, 1 - (r - 0.5) / 1.1),
          c = 9 * i * o,
          l = 0.6 * i * (0.5 + 0.5 * s) * (1 + 0.2 * Math.max(0, 1 - r / 0.3));
        (n.beam.scale.set(l, c, l),
          n.core.scale.set(l * 0.3, c * 1.06, l * 0.3),
          (n.beam.material.opacity = 0.45 * s),
          (n.core.material.opacity = 0.8 * s),
          n.rings.forEach((e, t) => {
            let n = r - t * 0.12,
              a = Math.max(0, Math.min(1, n / 0.6)),
              o = 0.4 + 3.6 * i * (1 - (1 - a) ** 2);
            ((e.visible = n > 0 && a < 1),
              e.scale.set(o, 1, o),
              (e.position.y = 0.06 + t * 0.01),
              (e.material.opacity = 0.75 * (1 - a)));
          }));
      }
    }
    drop(e) {
      let t = this.beams[e];
      for (let e of [t.beam, t.core, ...t.rings]) e.material.dispose();
      (t.root.removeFromParent(), this.beams.splice(e, 1));
    }
    dispose() {
      for (; this.beams.length;) this.drop(0);
      (this.beamGeo.dispose(),
        this.ringGeo.dispose(),
        this.group.removeFromParent());
    }
  },
  K = 64,
  Mn = 0.5,
  Nn = new y(`#FFFFFF`),
  Pn = new y(`#6A5F8C`),
  Fn = new y(`#FFF1A0`),
  In = new y(`#E09A12`),
  Ln = class {
    mesh;
    scale = 1;
    geo;
    aTail;
    aSpan;
    aAlpha;
    peak = new Float32Array(K);
    life = new Float32Array(K);
    max = new Float32Array(K);
    core;
    rim;
    next = 0;
    acc = 0;
    constructor() {
      let n = new s(1, 1, 8, 1);
      ((this.geo = new i()),
        (this.geo.index = n.index),
        this.geo.setAttribute(`position`, n.getAttribute(`position`)),
        this.geo.setAttribute(`uv`, n.getAttribute(`uv`)),
        (this.aTail = new t(new Float32Array(192), 3).setUsage(e)),
        (this.aSpan = new t(new Float32Array(256), 4).setUsage(e)),
        (this.aAlpha = new t(new Float32Array(K), 1).setUsage(e)),
        this.geo.setAttribute(`iTail`, this.aTail),
        this.geo.setAttribute(`iSpan`, this.aSpan),
        this.geo.setAttribute(`iAlpha`, this.aAlpha),
        (this.geo.instanceCount = K),
        (this.core = Nn.clone()),
        (this.rim = Pn.clone()));
      let r = new f({
        transparent: !0,
        depthWrite: !1,
        blending: 1,
        uniforms: { uCore: { value: this.core }, uRim: { value: this.rim } },
        vertexShader: `
        attribute vec3 iTail; attribute vec4 iSpan; attribute float iAlpha;
        varying vec2 vUv; varying float vAlpha;
        void main() {
          vUv = uv;
          vec4 a = modelViewMatrix * vec4(iTail, 1.0);
          vec4 b = modelViewMatrix * vec4(iTail + iSpan.xyz, 1.0);
          // an end at or behind the camera would smear across the screen
          vAlpha = (a.z > -0.4 || b.z > -0.4) ? 0.0 : iAlpha;
          vec2 ax = b.xy / -b.z - a.xy / -a.z;
          vec2 side = dot(ax, ax) > 1e-10 ? normalize(vec2(-ax.y, ax.x)) : vec2(0.0, 1.0);
          vec4 p = mix(a, b, uv.x);
          p.xy += side * (uv.y - 0.5) * iSpan.w * sqrt(sin(3.14159265 * uv.x));
          gl_Position = projectionMatrix * p;
        }`,
        fragmentShader: `
        uniform vec3 uCore; uniform vec3 uRim;
        varying vec2 vUv; varying float vAlpha;
        void main() {
          float along = sin(3.14159265 * vUv.x);
          float across = 1.0 - abs(vUv.y - 0.5) * 2.0;
          float a = vAlpha * along * smoothstep(0.0, 0.2, across);
          if (a < 0.004) discard;
          gl_FragColor = vec4(mix(uRim, uCore, smoothstep(0.3, 0.55, across)), a);
          #include <colorspace_fragment>
        }`,
      });
      ((this.mesh = new x(this.geo, r)),
        (this.mesh.frustumCulled = !1),
        (this.mesh.renderOrder = 3));
    }
    update(e, t, n, r, i, a, o, s, c) {
      let l = 1 - Math.exp(-6 * e);
      (this.core.lerp(c ? Fn : Nn, l), this.rim.lerp(c ? In : Pn, l));
      let u = Math.hypot(i, a, o);
      if (s > 0 && u > 1)
        for (this.acc += e * s * 45 * this.scale; this.acc >= 1;)
          (--this.acc, this.spawn(t, n, r, i / u, a / u, o / u, u, s));
      else this.acc = 0;
      for (let t = 0; t < K; t++) {
        if (this.life[t] <= 0) {
          this.aAlpha.setX(t, 0);
          continue;
        }
        this.life[t] = Math.max(0, this.life[t] - e);
        let n = 1 - this.life[t] / this.max[t];
        this.aAlpha.setX(t, this.peak[t] * Math.sin(Math.PI * n));
      }
      this.aAlpha.needsUpdate = !0;
    }
    spawn(e, t, n, r, i, a, o, s) {
      let c = a,
        l = -r,
        u = Math.hypot(c, l);
      u < 0.2 ? ((c = 1), (l = 0)) : ((c /= u), (l /= u));
      let d = l * i,
        f = c * a - l * r,
        p = -c * i,
        m = Math.random() * 12,
        h = (1.6 + Math.random() * 2.8) * (Math.random() < 0.5 ? -1 : 1),
        g = -0.3 + Math.random() * 2.8,
        _ = o * (0.07 + Math.random() * 0.05),
        v = this.next;
      ((this.next = (this.next + 1) % K),
        this.aTail.setXYZ(
          v,
          e + r * m + c * h + d * g,
          t + i * m + f * g,
          n + a * m + l * h + p * g,
        ),
        this.aSpan.setXYZW(v, r * _, i * _, a * _, 0.05 + Math.random() * 0.04),
        (this.aTail.needsUpdate = !0),
        (this.aSpan.needsUpdate = !0),
        (this.max[v] = this.life[v] = 0.5 + Math.random() * 0.3),
        (this.peak[v] = Mn * (0.5 + 0.5 * s) * (0.6 + Math.random() * 0.4)));
    }
    dispose() {
      (this.mesh.removeFromParent(),
        this.geo.dispose(),
        this.mesh.material.dispose());
    }
  },
  Rn = [`both`, `target`, `rider`, `off`],
  zn = (e) => ({
    marker: e === `both` || e === `target`,
    glow: e === `both` || e === `rider`,
  }),
  Bn = [`#FFFFFF`, `#6EDCA8`, `#FFD45C`, `#FF6B6B`],
  q = Bn.map((e) => new y(e)),
  Vn = new y(`#FFFFFF`),
  Hn = 0.55,
  Un = 2.2,
  Wn = 2.4,
  Gn = 0.25,
  Kn = 0.25,
  J = null;
function qn() {
  if (J) return J;
  let e = document.createElement(`canvas`);
  ((e.width = 512), (e.height = 160));
  let t = () => {
    let t = e.getContext(`2d`);
    (t.clearRect(0, 0, 512, 160),
      (t.font = `96px "Lilita One", system-ui, sans-serif`),
      (t.textAlign = `center`),
      (t.textBaseline = `middle`),
      (t.lineJoin = `round`),
      (t.lineWidth = 16),
      (t.strokeStyle = C),
      t.strokeText(`LET GO!`, 256, 84),
      (t.fillStyle = `#FFD45C`),
      t.fillText(`LET GO!`, 256, 84));
  };
  return (
    t(),
    (J = new _(e)),
    (J.colorSpace = d),
    document.fonts?.load(`96px "Lilita One"`).then(() => {
      (t(), (J.needsUpdate = !0));
    }),
    J
  );
}
var Jn = null;
function Yn() {
  if (Jn) return Jn;
  let e = document.createElement(`canvas`);
  ((e.width = 2), (e.height = 32));
  let t = e.getContext(`2d`);
  return (
    (t.fillStyle = `#fff`),
    t.fillRect(0, 0, 2, 18),
    (Jn = new _(e)),
    (Jn.wrapT = o),
    Jn
  );
}
function Y(e, t) {
  return new l({
    color: e,
    transparent: !0,
    opacity: t,
    depthWrite: !1,
    side: 2,
    forceSinglePass: !0,
    fog: !1,
    polygonOffset: !0,
    polygonOffsetFactor: -2,
    polygonOffsetUnits: -4,
  });
}
