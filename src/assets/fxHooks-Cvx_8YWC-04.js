// assets/fxHooks-Cvx_8YWC 04 — math
// Lines 1111-2552 of readable/assets/fxHooks-Cvx_8YWC.pretty.js (statement-aligned).
var FunnelRide = class {
    root = new u();
    decals = new Decals();
    words = new SpriteText();
    p;
    riders = new Map();
    drains = [];
    devils = [];
    tick = 0;
    time = { value: 0 };
    beamMat;
    funnelMat;
    cam = null;
    close;
    k;
    upright = !1;
    constructor(e, t = !1) {
      ((this.p = e),
        (this.close = t),
        (this.k = t ? kt.close : kt.park),
        this.root.add(this.decals.mesh, this.words.group));
      let n = (e, t) =>
        new f({
          transparent: !0,
          depthWrite: !1,
          side: 2,
          blending: 1,
          uniforms: {
            uTime: this.time,
            uGlow: { value: 0 },
            uWobble: { value: 0 },
            uLean: { value: new ie() },
            ...t,
          },
          vertexShader: $t,
          fragmentShader: e,
        });
      ((this.beamMat = n(
        `
      uniform float uTime; uniform float uGlow; uniform float uHeight; uniform float uCut; uniform float uFront; uniform vec3 uRim; uniform vec3 uBody; uniform vec3 uBand;
      varying vec2 vUv; varying float vEdge; varying float vNear;
      void main() {
        if (vUv.y < uCut) discard; // pulled up into the saucer
        // three hard bands climbing at 2.5 m/s
        float m = vUv.y * uHeight - uTime * 2.5;
        float k = abs(fract(m / (uHeight / 3.0)) - 0.5) * uHeight / 3.0;
        float aa = fwidth(k) + 1e-4;
        float band = 1.0 - smoothstep(0.04 - aa, 0.04, k);
        float rim = pow(vEdge, 2.0);
        float fade = smoothstep(0.0, 0.12, vUv.y - uCut);
        vec3 col = mix(mix(uBody, uRim, rim), uBand, band);
        float front = gl_FrontFacing ? mix(1.0 - uFront, 1.0, rim) : 1.0; // close up, the near face crosses him
        float a = uGlow * fade * vNear * front * max(mix(0.18, 0.8, rim), 0.7 * band) * mix(1.0, 0.5, smoothstep(0.6, 1.0, vUv.y));
        if (a < 0.005) discard;
        gl_FragColor = vec4(col, a);
        #include <colorspace_fragment>
      }`,
        {
          uHeight: { value: 2.8 },
          uCut: { value: 0 },
          uFront: { value: t ? 0.8 : 0 },
          uRim: { value: new y(`#22D3EE`) },
          uBody: { value: new y(`#B8FF5A`) },
          uBand: { value: new y(`#EFFFD6`) },
        },
      )),
        (this.funnelMat = n(
          `
      uniform float uGlow; uniform float uPhase; uniform vec3 uDust; uniform vec3 uEdge;
      varying vec2 vUv; varying float vEdge; varying float vNear;
      void main() {
        // four helical streaks winding up, turning with him (1.5× his spin); clear between, so he shows
        float w = vUv.x * 6.2831853 * 4.0 + vUv.y * 8.0 - uPhase * 4.0;
        float s = sin(w);
        float body = smoothstep(0.22, 0.32, s);
        float core = smoothstep(0.45, 0.6, s);
        float fade = smoothstep(0.0, 0.15, vUv.y) * smoothstep(1.0, 0.8, vUv.y);
        float front = gl_FrontFacing ? mix(0.2, 1.0, vEdge * vEdge) : 1.0; // the near half crosses his face
        float a = uGlow * fade * vNear * front * max(0.75 * body, 0.12 * pow(vEdge, 2.0));
        if (a < 0.005) discard;
        gl_FragColor = vec4(mix(uEdge, uDust, core), a);
        #include <colorspace_fragment>
      }`,
          {
            uPhase: { value: 0 },
            uDust: { value: new y(`#B8895A`) },
            uEdge: { value: new y(`#6E4A2A`) },
          },
        )),
        (this.funnelMat.uniforms.uWobble.value = 0.05));
    }
    update(e, t) {
      ((this.cam = t),
        (this.time.value += e),
        ct(this.time.value),
        this.decals.update(e),
        this.words.update(e));
      for (let t of this.drains) {
        t.left -= e;
        for (let n = this.dueOf(t, 40, e); n > 0; n--) {
          let e = t.from,
            n = t.n++ % 4 == 0;
          this.p.emit({
            x: e.x + (Math.random() - 0.5) * 0.5,
            y: e.y + 0.5 + Math.random() * 0.8,
            z: e.z + (Math.random() - 0.5) * 0.5,
            count: 1,
            color: pt,
            speed: 4,
            up: 0.9,
            size: n ? [0.24, 0.16] : [0.16, 0.1],
            life: [0.7, 0.8],
            drag: 0,
            shape: n ? 10 : 1,
            ink: !0,
            spin: 0,
            home: t.to,
            homeY: this.k.drainY,
          });
        }
      }
      this.drains.some((e) => e.left <= 0) &&
        (this.drains = this.drains.filter((e) => e.left > 0));
      for (let t of this.devils) {
        ((t.t += e),
          t.t < Gt
            ? ((t.x = t.f.x + t.ox), (t.y = t.f.y), (t.z = t.f.z + t.oz))
            : ((t.x += (t.f.vx + t.sx * this.k.devil) * e),
              (t.z += (t.f.vz + t.sz * this.k.devil) * e)));
        let n = Math.max(0, (t.t - Gt) / 0.5);
        (t.mesh.position.set(t.x, t.y, t.z),
          t.mesh.scale.setScalar(
            (1 + 0.2 * Math.min(1, t.t * 5)) *
              (1 - this.k.devilShrink * n) *
              this.k.devilK,
          ));
        let r = t.mesh.material;
        ((r.uniforms.uPhase.value += t.spin * e),
          (r.uniforms.uGlow.value = 1 - n * n));
      }
      if (this.devils.some((e) => e.t >= Kt)) {
        for (let e of this.devils)
          e.t >= Kt && (e.mesh.removeFromParent(), e.mesh.material.dispose());
        this.devils = this.devils.filter((e) => e.t < Kt);
      }
    }
    ride(e, t, n, r, i, a) {
      let o = this.riders.get(e);
      if (!o || o.look !== t) {
        let r = we(t);
        if ((o && this.drop(o), !r)) {
          this.riders.delete(e);
          return;
        }
        ((o = {
          skin: r.key,
          f: n,
          look: t,
          seen: 0,
          mode: n.mode,
          trick: n.trickId,
          trickT: n.trickT,
          spin: n.spin,
          turn: 0,
          airTurn: 0,
          popped: !1,
          a: 0,
          b: 0,
          c: 0,
          gx: n.x,
          gy: n.y,
          gz: n.z,
          gnx: 0,
          gny: 1,
          gnz: 0,
          column: null,
          glow: 0,
          phase: 0,
          ufo: null,
          ufoT: 0,
          leave: -1,
          silk: null,
          wall: n.mode === E.WALLRIDE,
          hold: !1,
          webAt: -99,
          offAt: -99,
          wnx: 0,
          wnz: 0,
          sx: 0,
          sy: 0,
          sz: 0,
          snap: -1,
          rain: -1,
          stride: 0,
          foot: 1,
          prints: 0,
          flips: 0,
          juggle: !1,
          hand: 1,
          ball: 0,
          special: 0,
          roll: -1,
          rfx: 0,
          rfz: 1,
        }),
          this.riders.set(e, o));
      }
      if (((o.f = n), (o.seen = this.tick), r <= 0)) return;
      let s = o.mode,
        c = n.mode,
        l = n.trickId !== o.trick || n.trickT < o.trickT - 0.05,
        u = c === E.AIR && s === E.AIR ? n.spin - o.spin : 0;
      ((o.turn +=
        ((Math.abs(u) > 1.5 ? 0 : u / r) - o.turn) * Math.min(1, r * 12)),
        c === E.AIR &&
          s !== E.AIR &&
          ((o.airTurn = 0), (o.popped = V(s) && n.vy > 0.5)),
        c === E.AIR && (o.airTurn = Math.abs(n.spin)));
      let d = (n.x - i) ** 2 + (n.z - a) ** 2 < 2025;
      switch (o.skin) {
        case `varginha`:
          this.saucer(o, s, d, r);
          break;
        case `abominollie`:
          d && this.snow(o, s, r);
          break;
        case `saci`:
          this.whirl(o, s, d, r);
          break;
        case `curupira`:
          d && this.forest(o, l, r);
          break;
        case `itsy`:
          this.web(o, s, d, r);
          break;
        case `grindula`:
          d && this.bats(o, s, r);
          break;
        case `jester`:
          d && this.jest(o, s, l, r);
          break;
        case `sentai`:
          this.rollCall(o, s, l, d, r);
      }
      (V(c) &&
        ((o.gx = n.x),
        (o.gy = n.y),
        (o.gz = n.z),
        (o.gnx = n.ux),
        (o.gny = n.uy),
        (o.gnz = n.uz)),
        (o.mode = c),
        (o.trick = n.trickId),
        (o.trickT = n.trickT),
        (o.spin = n.spin));
    }
    sweep() {
      for (let [e, t] of this.riders)
        t.seen !== this.tick && (this.drop(t), this.riders.delete(e));
      this.tick++;
    }
    dispose() {
      this.root.removeFromParent();
      for (let e of this.riders.values()) this.drop(e);
      this.riders.clear();
      for (let e of this.devils) e.mesh.material.dispose();
      ((this.devils = []),
        (this.drains = []),
        this.beamMat.dispose(),
        this.funnelMat.dispose(),
        this.decals.dispose(),
        this.words.dispose());
    }
    skinAt(e) {
      for (let t of this.riders.values()) if (t.f === e) return t.skin;
      return null;
    }
    skinOf(e) {
      return this.riders.get(e)?.skin ?? null;
    }
    tag(e, t) {
      let n = this.riders.get(e);
      n?.skin === `chupacabra` &&
        (this.p.emit({
          x: t.x,
          y: t.y + 0.8,
          z: t.z,
          count: 9,
          color: ft,
          speed: this.k.wool,
          up: 0.6,
          vel: [t.vx * 0.7, 0.4, t.vz * 0.7],
          size: [0.3, 0.5],
          life: [0.8, 1],
          drag: 3,
          gravity: -0.5,
          shape: 9,
          ink: !0,
          spin: 0.6,
        }),
        this.drains.push({ from: t, to: n.f, left: Et, acc: 0, n: 0 }));
    }
    perform(e) {
      let t = this.riders.get(e);
      if (!t) return;
      let n = t.f,
        { ax: r, az: i, lx: a, lz: o } = this.fromCam(n);
      switch (t.skin) {
        case `sentai`:
          this.callRoll(t);
          break;
        case `grindula`:
          for (let e = 0; e < 8; e++) {
            let t = e < (this.upright ? 3 : 5) ? 1 : -1,
              s = r * 0.5 + a * t * 0.85,
              c = i * 0.5 + o * t * 0.85;
            this.bat(
              n.x + a * t * 0.25 + r * 0.1,
              n.y + 0.75,
              n.z + o * t * 0.25 + i * 0.1,
              s,
              c,
              1.6,
            );
          }
          break;
        case `chupacabra`:
          this.tag(e, {
            ...n,
            x: n.x + a * 0.5 + r * 0.4,
            z: n.z + o * 0.5 + i * 0.4,
            vx: 0,
            vz: 0,
          });
          break;
        case `itsy`: {
          let e = n.x + a * 0.5 + r * 0.85,
            s = n.y + 1,
            c = n.z + o * 0.5 + i * 0.85;
          (this.decals.lay({
            x: e,
            y: s,
            z: c,
            nx: -r * 0.87 - a * 0.5,
            ny: 0,
            nz: -i * 0.87 - o * 0.5,
            dx: 0,
            dy: 1,
            dz: 0,
            w: 0.6,
            h: 0.6,
            kind: L.WEB,
            color: `#FFFFFF`,
            ink: `#4A3F6B`,
            life: 2.6,
            pop: 0.18,
          }),
            (t.sx = e),
            (t.sy = s),
            (t.sz = c),
            (t.webAt = this.time.value),
            (t.silk ??= new TrailMesh()),
            this.root.add(t.silk.mesh),
            (t.snap = -1),
            (t.rain = -1),
            (t.hold = t.wall = !0));
          break;
        }
      }
    }
    drop(e) {
      ((e.column &&=
        (e.column.removeFromParent(), e.column.material.dispose(), null)),
        e.ufo?.removeFromParent(),
        (e.ufo = null),
        e.silk?.dispose(),
        (e.silk = null));
    }
    due(e, t, n, r) {
      e[t] += n * this.p.scale * r;
      let i = Math.floor(e[t]);
      return ((e[t] -= i), i);
    }
    dueOf(e, t, n) {
      e.acc += t * this.p.scale * n;
      let r = Math.floor(e.acc);
      return ((e.acc -= r), r);
    }
    columnOf(e, t) {
      if (!e.column) {
        let n = t.clone();
        ((n.uniforms.uTime = this.time),
          (e.column = new x(t === this.funnelMat ? Qt : Zt, n)),
          (e.column.renderOrder = 3),
          (e.column.frustumCulled = !1),
          this.root.add(e.column));
      }
      return e.column;
    }
    saucer(e, t, n, r) {
      let i = e.f,
        a = this.p,
        o = i.mode === E.AIR;
      if (!n) {
        (e.ufo && (e.ufo.visible = !1),
          e.column && (e.column.visible = !1),
          (e.leave = -1));
        return;
      }
      if (o && (t !== E.AIR || !e.ufo?.visible)) {
        let t = G(i);
        (this.decals.lay({
          x: e.gx,
          y: e.gy,
          z: e.gz,
          nx: e.gnx,
          ny: e.gny,
          nz: e.gnz,
          dx: t.x,
          dy: 0,
          dz: t.z,
          w: this.k.crop * (this.upright ? 0.75 : 1),
          h: this.k.crop * (this.upright ? 0.75 : 1),
          kind: L.CROP,
          color: `#9BFF3D`,
          ink: `#1E9E5A`,
          alpha: 0.55,
          life: 1.4,
          pop: 0.15,
        }),
          e.ufo || ((e.ufo = st()), this.root.add(e.ufo)),
          (e.ufo.visible = !0),
          e.ufo.position.set(i.x, i.y + this.k.ufoY, i.z),
          (e.ufoT = 0),
          (e.leave = -1),
          (e.glow = 0));
      }
      let s = e.ufo;
      if (!s || !s.visible) return;
      ((e.ufoT += r),
        o
          ? (e.leave = -1)
          : e.leave < 0
            ? ((e.leave = 0), this.p.cut(s.position, 0.12))
            : (e.leave += r));
      let c = 1 - Math.exp(-r / Ot),
        l = e.leave > At ? (e.leave - At) / jt : 0,
        u = this.close ? (this.upright ? 3 : 1.5) * l * l : 0;
      (u && this.fromCam(i),
        (s.position.x += (i.x - W.lx * u - s.position.x) * c),
        (s.position.z += (i.z - W.lz * u - s.position.z) * c),
        l > 0
          ? (s.position.y =
              e.gy +
              this.k.ufoY +
              this.k.zip * (this.upright ? 0.3 : 1) * l * l)
          : (s.position.y += (i.y + this.k.ufoY - s.position.y) * c));
      let d = Math.min(1, e.ufoT / 0.15);
      if (
        (s.scale.setScalar(
          (d < 0.7
            ? 1.15 * Math.sin((d / 0.7) * Math.PI * 0.5)
            : 1.15 - (0.15 * (d - 0.7)) / 0.3) *
            (this.close ? 1 - 0.7 * Math.min(1, l) : 1),
        ),
        s.rotation.set(
          Math.sin(e.ufoT * 5) * 0.14,
          s.rotation.y + r * 2,
          Math.cos(e.ufoT * 4) * 0.12,
        ),
        l >= 1)
      ) {
        ((s.visible = !1), e.column && (e.column.visible = !1));
        return;
      }
      let f = this.columnOf(e, this.beamMat),
        p = f.material;
      e.glow += (1 - e.glow) * Math.min(1, r * 14);
      let m = this.close ? Math.min(i.y, e.gy) : i.y,
        h = Math.max(0.5, s.position.y - 0.09 - m);
      if (
        ((f.visible = !0),
        f.position.set(i.x, m, i.z),
        f.scale.set(1, h, 1),
        (p.uniforms.uHeight.value = h),
        (p.uniforms.uGlow.value = e.glow),
        (p.uniforms.uCut.value = e.leave >= 0 ? Math.min(1, e.leave / At) : 0),
        p.uniforms.uLean.value.set(s.position.x - i.x, s.position.z - i.z),
        o)
      )
        for (let t = this.due(e, `a`, 12, r); t > 0; t--) {
          let e = Math.random() * Math.PI * 2,
            t = 0.3 + Math.random() * 0.45;
          a.emit({
            x: i.x + Math.sin(e) * t,
            y: i.y + 0.1,
            z: i.z + Math.cos(e) * t,
            count: 1,
            color: lt,
            exact: !0,
            speed: 1,
            dir: [i.vx, i.vy + 2, i.vz],
            drag: 0,
            size: [0.12, 0.09],
            life: [0.9, 1.1],
            shape: 1,
            ink: !0,
            home: s.position,
            homeY: -0.05,
          });
        }
    }
    snow(e, t, n) {
      let r = e.f,
        i = this.p,
        a = (t, n, a, o, s) => {
          let c = G(r),
            l = c.z,
            u = -c.x;
          this.decals.lay({
            x: t,
            y: n,
            z: a,
            nx: e.gnx,
            ny: e.gny,
            nz: e.gnz,
            dx: c.x,
            dy: 0,
            dz: c.z,
            w: o / 2,
            h: o / 2,
            kind: L.FROST,
            color: `#DDF1FF`,
            ink: `#3E86C6`,
            alpha: 0.6,
            life: 1.6,
            pop: 0.12,
          });
          for (let r of [-1, 1]) {
            let i = Math.cos(s * r),
              o = Math.sin(s * r);
            this.decals.lay({
              x: t + l * r * 0.32,
              y: n,
              z: a + u * r * 0.32,
              nx: e.gnx,
              ny: e.gny,
              nz: e.gnz,
              dx: c.x * i + l * o,
              dy: 0,
              dz: c.z * i + u * o,
              w: 0.175,
              h: 0.3,
              kind: L.CLAW,
              color: `#3E86C6`,
              ink: `#1D3F66`,
              alpha: 0.85,
              life: 1.8,
              pop: 0.12,
            });
          }
          let d = this.close ? c.x : l,
            f = this.close ? c.z : u;
          for (let e = 0; e < 7; e++) {
            let t = e % 2 ? 1 : -1,
              a = 1.5 + Math.random() * 1.3;
            i.emit({
              x: r.x + d * t * 0.3,
              y: n + 0.2,
              z: r.z + f * t * 0.3,
              count: 1,
              color: ut,
              exact: !0,
              speed: 1,
              dir: [
                r.vx + d * t * a + c.x * (Math.random() - 0.5),
                0.5 + Math.random(),
                r.vz + f * t * a + c.z * (Math.random() - 0.5),
              ],
              drag: 4,
              size: [0.5, 0.9],
              life: [0.5, 0.65],
              shape: 9,
              ink: !0,
              spin: 0.5,
            });
          }
          for (let e = 0; e < 4; e++)
            i.emit({
              x: r.x - c.x * 0.45,
              y: n + 0.15,
              z: r.z - c.z * 0.45,
              count: 1,
              color: ut,
              exact: !0,
              speed: 1,
              dir: [
                r.vx * 0.8 + (Math.random() - 0.5) * 0.6,
                2 + Math.random() * 1.2,
                r.vz * 0.8 + (Math.random() - 0.5) * 0.6,
              ],
              drag: 3,
              size: [0.3, 0.6],
              life: [0.45, 0.6],
              shape: 9,
              ink: !0,
              spin: 0.5,
            });
        },
        o = this.close && this.upright ? 0.3 : 0,
        s = o ? this.fromCam(r) : null,
        c = s ? s.ax * o : 0,
        l = s ? s.az * o : 0;
      if (
        (r.mode === E.AIR &&
          t !== E.AIR &&
          e.popped &&
          a(e.gx + c, e.gy, e.gz + l, 1.2, 0),
        r.mode === E.AIR && e.popped)
      )
        for (let t = this.due(e, `a`, 9, n); t > 0; t--) {
          let t = Math.random() * Math.PI * 2;
          i.emit({
            x: Math.sin(t) * 0.6,
            y: this.k.flakeY + Math.random() * this.k.flakeH,
            z: Math.cos(t) * 0.6,
            count: 1,
            color: dt,
            exact: !0,
            speed: 1,
            dir: [0, 0.15, 0],
            drag: 0,
            size: [0.26, 0.26],
            life: [0.9, 0.9],
            shape: 7,
            ink: !0,
            spin: 1.5,
            anchor: e.f,
            orbit: 3,
          });
        }
      else e.a = 0;
      V(r.mode) &&
        t === E.AIR &&
        e.popped &&
        ((e.popped = !1), a(r.x + c, r.y, r.z + l, 1.4, 0.2));
    }
    whirl(e, t, n, r) {
      let i = e.f,
        a = this.p,
        o = Math.abs(e.turn),
        s = e.turn < 0 ? -1 : 1,
        c = n && i.mode === E.AIR && o > Tt;
      if (
        ((e.glow += (+!!c - e.glow) * Math.min(1, r * (c ? 10 : 5))),
        e.column || c)
      ) {
        let t = this.columnOf(e, this.funnelMat),
          n = t.material;
        ((e.phase += e.turn * 1.5 * r),
          (n.uniforms.uPhase.value = e.phase),
          (n.uniforms.uGlow.value = e.glow),
          t.position.set(i.x, i.y, i.z),
          t.quaternion.setFromUnitVectors(tn, H.set(i.ux, i.uy, i.uz)),
          t.scale.setScalar((0.85 + 0.15 * e.glow) * this.k.funnel),
          (t.visible = e.glow > 0.01));
      }
      if (c) {
        let t = 4 * Math.PI * s,
          n = (e, t, n) => {
            let r = Math.random() * Math.PI * 2,
              a = Math.cos(r) * e,
              o = Math.sin(r) * e;
            return (
              (n[0] = U.x * a + nn.x * o + i.ux * t),
              (n[1] = U.y * a + nn.y * o + i.uy * t),
              (n[2] = U.z * a + nn.z * o + i.uz * t),
              n
            );
          };
        an(i);
        for (let o = this.due(e, `a`, 11, r); o > 0; o--) {
          let [e, r, o] = n(
            0.8 + Math.random() * 0.2,
            0.2 + Math.random() * 1.2,
            rn,
          );
          a.emit({
            x: e,
            y: r,
            z: o,
            count: 1,
            color: ht,
            exact: !0,
            speed: 0.6,
            dir: [i.ux, i.uy, i.uz],
            drag: 0,
            size: [0.22, 0.22],
            life: [0.6, 0.75],
            shape: 6,
            ink: !0,
            spin: 6,
            anchor: i,
            orbit: t,
            axis: i,
          });
        }
        for (let o = this.due(e, `b`, 4, r); o > 0; o--) {
          let [e, r, o] = n(
            0.8 + Math.random() * 0.2,
            0.4 + Math.random() * 1,
            rn,
          );
          a.emit({
            x: e,
            y: r,
            z: o,
            count: 1,
            color: gt,
            exact: !0,
            speed: 0.6,
            dir: [i.ux, i.uy, i.uz],
            drag: 0,
            size: [0.14, 0.14],
            life: [0.6, 0.75],
            shape: 2,
            ink: !0,
            spin: 8,
            anchor: i,
            orbit: t,
            axis: i,
          });
        }
        for (let o = this.due(e, `c`, 8, r); o > 0; o--) {
          let [e, r, o] = n(
            0.45 + Math.random() * 0.25,
            Math.random() * 0.4,
            rn,
          );
          a.emit({
            x: e,
            y: r,
            z: o,
            count: 1,
            color: mt,
            exact: !0,
            speed: 0.2,
            dir: [i.ux, i.uy, i.uz],
            drag: 0,
            size: [0.22, 0.32],
            life: [0.45, 0.55],
            shape: 9,
            ink: !0,
            spin: 1,
            anchor: i,
            orbit: t,
            axis: i,
          });
        }
      } else e.a = e.b = e.c = 0;
      if (V(i.mode) && t === E.AIR && e.airTurn >= Math.PI * 2.9 && n) {
        let t = G(i),
          n = this.cam,
          r = t.z,
          a = -t.x;
        n && (i.x - n.x) * r + (i.z - n.z) * a < 0 && ((r = -r), (a = -a));
        let o = 0,
          c = 0;
        if (n && this.close) {
          let e = this.fromCam(i);
          ((r = (e.lx + e.ax * 0.7) / 1.22), (a = (e.lz + e.az * 0.7) / 1.22));
          let t = this.k.devilSide * (this.upright ? 0.7 : 1);
          ((o = e.lx * t),
            (c = e.lz * t),
            this.upright &&
              ((r = (e.lx * 0.5 + e.ax) / 1.12),
              (a = (e.lz * 0.5 + e.az) / 1.12)));
        }
        let l = this.funnelMat.clone();
        ((l.uniforms.uTime = this.time),
          (l.uniforms.uPhase.value = e.phase),
          (l.uniforms.uGlow.value = 1));
        let u = new x(Qt, l);
        ((u.renderOrder = 3),
          (u.frustumCulled = !1),
          u.quaternion.setFromUnitVectors(tn, H.set(i.ux, i.uy, i.uz)),
          this.root.add(u),
          this.devils.push({
            mesh: u,
            f: i,
            t: 0,
            x: i.x + o,
            y: i.y,
            z: i.z + c,
            sx: r,
            sz: a,
            ox: o,
            oz: c,
            spin: 18 * s,
          }),
          (e.glow = 0),
          e.column && (e.column.visible = !1),
          this.decals.lay({
            x: i.x,
            y: i.y,
            z: i.z,
            nx: i.ux,
            ny: i.uy,
            nz: i.uz,
            dx: t.x,
            dy: 0,
            dz: t.z,
            w: 0.6,
            h: 0.6,
            kind: L.SPIRAL,
            color: `#C9A26B`,
            ink: `#7A5A34`,
            alpha: 0.6,
            life: 1,
            pop: 0.15,
            left: s < 0,
          }));
      }
    }
    forest(e, t, n) {
      let r = e.f,
        i = this.p;
      if (!r.fakie || r.mode === E.BAIL || r.mode === E.WALK) {
        ((e.a = 0), (e.stride = 0));
        return;
      }
      let a = G(r),
        o = a.z,
        s = -a.x;
      if (t && r.trickId) {
        for (let t of [-1, 1])
          this.footprint({
            x: e.gx + o * t * 0.2,
            y: e.gy,
            z: e.gz + s * t * 0.2,
            nx: e.gnx,
            ny: e.gny,
            nz: e.gnz,
            dx: -a.x,
            dy: 0,
            dz: -a.z,
            w: 0.12 * this.k.printW,
            h: 0.26 * this.k.print,
            kind: L.FOOT,
            color: vt,
            ink: yt,
            alpha: 0.85,
            life: 2.5,
            left: t < 0,
          });
        for (let e = 0; e < 10; e++) {
          let t = (e / 10) * Math.PI * 2,
            n = 0.35 + Math.random() * 0.65;
          i.emit({
            x: r.x,
            y: r.y + 0.3,
            z: r.z,
            count: 1,
            color: _t,
            exact: !0,
            speed: 1,
            dir: [
              r.vx * 0.9 + Math.cos(t) * Math.cos(n) * 3,
              r.vy * 0.9 + Math.sin(n) * 3,
              r.vz * 0.9 + Math.sin(t) * Math.cos(n) * 3,
            ],
            drag: 2,
            gravity: 1,
            size: [0.2, 0.2],
            life: [0.8, 1.1],
            shape: 6,
            ink: !0,
            spin: 7,
          });
        }
      }
      if (!V(r.mode) || r.speed < 2) {
        e.a = 0;
        return;
      }
      if (((e.stride += r.speed * n), e.stride >= Mt)) {
        ((e.stride -= Mt), (e.foot = -e.foot));
        let t = r.x + o * e.foot * Nt * this.k.print,
          n = r.z + s * e.foot * Nt * this.k.print,
          c = this.close ? 0.47 * e.foot : 0,
          l = Math.cos(c),
          u = Math.sin(c);
        (this.footprint({
          x: t,
          y: r.y,
          z: n,
          nx: r.ux,
          ny: r.uy,
          nz: r.uz,
          dx: -a.x * l + o * u,
          dy: 0,
          dz: -a.z * l + s * u,
          w: 0.1 * this.k.printW,
          h: 0.21 * this.k.print,
          kind: L.FOOT,
          color: vt,
          ink: yt,
          alpha: 0.8,
          life: 2.5,
          left: e.foot < 0,
        }),
          ++e.prints % this.k.sprout === 0 &&
            i.emit({
              x: t,
              y: r.y + Pt / 2,
              z: n,
              count: 1,
              color: `#2FD67B`,
              exact: !0,
              speed: 0,
              size: [Pt, Pt],
              life: [2, 2],
              shape: 11,
              ink: !0,
              spin: 0,
              solid: !0,
              pop: 0.2,
            }));
      }
      for (let t = this.due(e, `a`, 5, n); t > 0; t--) {
        let e = Math.random() < 0.5 ? -1 : 1,
          t = 0.3 + Math.random() * 0.15;
        i.emit({
          x: r.x + a.x * 0.3 + o * e * t,
          y: r.y + 0.7,
          z: r.z + a.z * 0.3 + s * e * t,
          count: 1,
          color: _t,
          exact: !0,
          speed: 1,
          dir: [
            r.vx * 0.6 + o * e * Math.random() * 0.8,
            0.6,
            r.vz * 0.6 + s * e * Math.random() * 0.8,
          ],
          gravity: 0.8,
          drag: 1.5,
          size: [0.28, 0.28],
          life: [0.9, 1.2],
          shape: 6,
          ink: !0,
          spin: 7,
        });
      }
    }
    web(e, t, n, r) {
      let i = e.f,
        a = this.p;
      e.hold && !V(i.mode) && (e.hold = !1);
      let o = i.mode === E.WALLRIDE || e.hold,
        s = Math.hypot(i.ux, i.uz) || 1,
        c = i.ux / s,
        l = i.uz / s;
      if (o && !e.wall && n) {
        let t = i.x + c * 0.04,
          n = i.y + 0.35,
          r = i.z + l * 0.04,
          a = this.time.value;
        (a - e.offAt < zt ||
          (a - e.webAt < Lt && Math.hypot(t - e.sx, n - e.sy, r - e.sz) < Rt) ||
          ((e.sx = t),
          (e.sy = n),
          (e.sz = r),
          (e.webAt = this.time.value),
          this.decals.lay({
            x: t,
            y: n,
            z: r,
            nx: c,
            ny: 0,
            nz: l,
            dx: 0,
            dy: 1,
            dz: 0,
            w: 0.8,
            h: 0.8,
            kind: L.WEB,
            color: `#FFFFFF`,
            ink: `#4A3F6B`,
            life: 2.6,
            pop: 0.18,
          }),
          (e.wnx = c),
          (e.wnz = l),
          this.corner(e, 0.6, 3),
          (e.stride = 0),
          (e.prints = 1)),
          (e.silk ??= new TrailMesh()),
          this.root.add(e.silk.mesh),
          (e.snap = -1),
          (e.rain = -1));
      }
      o &&
        ((e.wnx = c),
        (e.wnz = l),
        (e.stride += i.speed * r),
        e.stride >= Ft &&
          e.prints < It &&
          n &&
          ((e.stride -= Ft), e.prints++, this.corner(e, 0.45, 2)));
      let u = e.silk;
      if (u?.mesh.parent) {
        (!o && e.snap < 0 && (e.snap = 0), e.snap >= 0 && (e.snap += r));
        let t = e.snap >= 0 ? Math.min(0.5, (e.snap / 0.15) * 0.5) : 0;
        if (t >= 0.5 || !n) u.mesh.removeFromParent();
        else if (this.cam) {
          let n = i.x + i.ux * 0.55,
            r = i.y + i.uy * 0.55 + 0.25,
            a = i.z + i.uz * 0.55,
            o = Math.hypot(n - e.sx, r - e.sy, a - e.sz);
          u.set(e.sx, e.sy, e.sz, n, r, a, 0.125 * o, this.cam, t);
        }
      }
      if (
        (!o && e.wall && (e.offAt = this.time.value),
        !o && e.wall && n && (e.rain = 0),
        (e.wall = o),
        o && (e.rain = -1),
        e.rain >= 0)
      ) {
        let n = e.rain;
        if (((e.rain += r), n < Bt && e.rain >= Bt)) {
          let t = this.fromCam(i);
          for (let n of this.close ? [0, -1, 1] : [0]) {
            let r = this.k.cloud * (n ? 0.8 : 1);
            a.emit({
              x: e.wnx * 0.7 + t.lx * n * 0.22,
              y: this.k.cloudY + (n ? -0.1 : 0.05),
              z: e.wnz * 0.7 + t.lz * n * 0.22,
              count: 1,
              color: `#B9C6E8`,
              exact: !0,
              speed: 0,
              size: [1.1 * r, 1.15 * r],
              life: [0.6, 0.6],
              shape: 9,
              ink: !0,
              spin: 0,
              anchor: i,
              solid: !0,
            });
          }
        }
        if (e.rain >= Bt && e.rain < 0.6)
          for (let t = this.due(e, `a`, 48 * this.k.rain, r); t > 0; t--)
            a.emit({
              x: i.x + e.wnx * 0.7 + (Math.random() - 0.5) * 0.8,
              y: i.y + this.k.cloudY - 0.2,
              z: i.z + e.wnz * 0.7 + (Math.random() - 0.5) * 0.8,
              count: 1,
              color: bt,
              exact: !0,
              speed: 1,
              dir: [i.vx, i.vy - 9, i.vz],
              drag: 0,
              size: [0.08, 0.07],
              life: [0.25, 0.35],
              shape: 3,
              spin: 0,
            });
        if (V(i.mode) && !V(t) && e.rain >= Bt) {
          let t = G(i);
          this.decals.lay({
            x: i.x,
            y: i.y,
            z: i.z,
            nx: i.ux,
            ny: i.uy,
            nz: i.uz,
            dx: t.x,
            dy: 0,
            dz: t.z,
            w: 0.55,
            h: 0.55,
            kind: L.SPLAT,
            color: bt,
            ink: `#1A6F8E`,
            life: 1,
            pop: 0.1,
          });
          for (let e = 0; e < 7; e++) {
            let e = Math.random() * Math.PI * 2;
            a.emit({
              x: i.x,
              y: i.y + 0.1,
              z: i.z,
              count: 1,
              color: bt,
              exact: !0,
              speed: 1,
              dir: [
                i.vx * 0.8 + Math.cos(e),
                2.5 + Math.random(),
                i.vz * 0.8 + Math.sin(e),
              ],
              gravity: 12,
              drag: 0.5,
              size: [0.1, 0.08],
              life: [0.35, 0.45],
              shape: 1,
              ink: !0,
            });
          }
          e.rain = -1;
        } else e.rain > 1.5 && (e.rain = -1);
      }
    }
    footprint(e) {
      let t = this.cam;
      if (this.close && t) {
        let n = t.x - e.x,
          r = t.z - e.z,
          i = Math.hypot(n, r) || 1;
        ((e.nx += (n / i) * 0.58),
          (e.nz += (r / i) * 0.58),
          (e.y += e.w * 0.5));
      }
      this.decals.lay(e);
    }
    corner(e, t, n) {
      let r = e.f,
        i = G(r),
        a = e.wnx || r.ux,
        o = e.wnz || r.uz;
      this.decals.lay({
        x: r.x + i.x * 1.3 + t * 0.7 * a,
        y: e.gy + t * 0.75,
        z: r.z + i.z * 1.3 + t * 0.7 * o,
        nx: -i.x * 0.75 + a * 0.55,
        ny: 0.35,
        nz: -i.z * 0.75 + o * 0.55,
        dx: 0,
        dy: 1,
        dz: 0,
        w: t,
        h: t,
        kind: L.WEB,
        color: `#FFFFFF`,
        ink: `#4A3F6B`,
        life: n,
        pop: 0.18,
      });
    }
    bats(e, t, n) {
      let r = e.f;
      if (r.mode !== E.GRIND) {
        e.a = 0;
        return;
      }
      if (t !== E.GRIND)
        for (let e = 0; e < 5; e++) this.bat(r.x, r.y + 0.2, r.z);
      this.due(e, `a`, 2.5, n) > 0 && this.bat(r.x, r.y + 0.2, r.z);
    }
    bat(e, t, n, r = 0, i = 0, a = 3.5) {
      let o =
        r || i
          ? Math.atan2(r, i) + (Math.random() - 0.5) * a
          : Math.random() * Math.PI * 2;
      this.p.emit({
        x: e,
        y: t,
        z: n,
        count: 1,
        color: xt,
        exact: !0,
        speed: 1,
        dir: [
          Math.sin(o) * this.k.batOut,
          this.k.batUp + Math.random() * 1.4,
          Math.cos(o) * this.k.batOut,
        ],
        gravity: -1.2,
        drag: 0.7,
        size: [0.34, 0.42],
        life: [1, 1.6],
        shape: 4,
        spin: 24,
      });
    }
    jest(e, t, n, r) {
      let i = e.f,
        a = this.p,
        o = G(i),
        s = o.z,
        c = -o.x;
      if (
        (i.mode === E.BAIL &&
          t !== E.BAIL &&
          this.words.say(`HAHAHA`, `#FFD21F`, 0, 2, 0, 0.55, 0, 0.9, 0.5, i),
        i.mode !== E.AIR)
      ) {
        (e.juggle && a.cut(i, 0.12, 8),
          (e.flips = 0),
          (e.juggle = !1),
          (e.a = 0));
        return;
      }
      let l = (s + o.x * 0.7) / 1.22,
        u = (c + o.z * 0.7) / 1.22;
      if (n && w[i.trickId]?.kind === T.FLIP) {
        (e.flips++, (e.juggle = !0));
        let t = e.flips % 2 ? 1 : -1,
          n = e.flips === 3,
          r = this.close ? this.fromCam(i) : null,
          d = r ? r.lx : l,
          f = r ? r.lz : u;
        this.words.say(
          n ? `HA HA!` : `HA`,
          `#FFD21F`,
          d * t * this.k.wordOut,
          this.k.wordY,
          f * t * this.k.wordOut,
          (n ? 0.6 : 0.45) * this.k.word,
          t * 0.44,
          0.7,
          this.k.wordRise,
          i,
        );
        for (let e = 0; e < 10; e++) {
          let t = e % 2 ? 1 : -1,
            n = (Math.random() - 0.5) * 1.6,
            r = s * t * Math.cos(n) + o.x * Math.sin(n),
            l = c * t * Math.cos(n) + o.z * Math.sin(n);
          a.emit({
            x: i.x,
            y: i.y + 0.6,
            z: i.z,
            count: 1,
            color: Ct,
            exact: !0,
            speed: 1,
            dir: [i.vx + r * 2.5, i.vy + 0.8, i.vz + l * 2.5],
            drag: 2.5,
            gravity: 4,
            size: [0.16, 0.13],
            life: [0.6, 0.75],
            shape: e % 3 ? 5 : 2,
            ink: !0,
          });
        }
      }
      if (e.juggle)
        for (e.a += r; e.a >= Vt; e.a -= Vt) {
          e.hand = -e.hand;
          let t = (4 * Ht) / B,
            n = (Ut / B) * -e.hand;
          a.emit({
            x: (l * e.hand * Ut) / 2,
            y: 0.95,
            z: (u * e.hand * Ut) / 2,
            count: 1,
            color: Ct[e.ball++ % 3],
            exact: !0,
            speed: 1,
            dir: [l * n, t, u * n],
            gravity: Wt,
            drag: 0,
            size: [0.22, 0.22],
            life: [B, B],
            shape: 8,
            ink: !0,
            spin: 0,
            anchor: i,
            solid: !0,
          });
        }
    }
    rollCall(e, t, n, r, i) {
      let a = e.f,
        o = w[a.trickId]?.kind ?? 0;
      if (
        (n &&
          (o === T.SPECIAL_AIR ||
            o === T.SPECIAL_GRIND ||
            o === T.SPECIAL_MANUAL) &&
          (e.special = o),
        e.special &&
          a.mode !== t &&
          (a.mode === E.BAIL
            ? (e.special = 0)
            : (e.special !== T.SPECIAL_AIR || V(a.mode)) &&
              ((e.special = 0), r && this.callRoll(e))),
        e.roll === -1)
      )
        return;
      let s = e.roll;
      e.roll += i;
      for (let t of qt)
        (s < t.at && e.roll >= t.at && this.flash(e, t),
          s < t.at + Xt && e.roll >= t.at + Xt && this.smoke(e, t));
      e.roll > qt[qt.length - 1].at + Xt && (e.roll = -1);
    }
    get rollK() {
      return this.k.rollK * (this.close && this.upright ? 0.8 : 1);
    }
    callRoll(e) {
      let t = e.f,
        n = this.cam,
        r = n ? t.x - n.x : 0,
        i = n ? t.z - n.z : 0,
        a = Math.hypot(r, i),
        o = G(t);
      ((e.rfx = a > 0.5 ? r / a : o.x),
        (e.rfz = a > 0.5 ? i / a : o.z),
        (e.roll = -1e-4));
    }
    settle(e) {
      (this.decals.hurry(e), this.words.hurry(e), this.p.hurry(e));
      for (let t of this.devils) t.t = Math.max(t.t, Kt - e);
    }
    fromCam(e) {
      let t = this.cam,
        n = t ? e.x - t.x : 0,
        r = t ? e.z - t.z : 0,
        i = Math.hypot(n, r);
      if (i > 0.5) ((n /= i), (r /= i));
      else {
        let t = G(e);
        ((n = t.x), (r = t.z));
      }
      return ((W.ax = n), (W.az = r), (W.lx = r), (W.lz = -n), W);
    }
    blastAt(e, t) {
      let n = e.rfx,
        r = e.rfz,
        i = r,
        a = -n,
        o = this.close ? t.near : t.out,
        s = o ? Math.abs(o) * Jt : Yt;
      return [i * o + n * s, t.y, a * o + r * s, i, a];
    }
    flash(e, t) {
      let n = e.f,
        r = this.p,
        i = t.k * this.rollK,
        [a, o, s, c, l] = this.blastAt(e, t);
      r.emit({
        x: a,
        y: o,
        z: s,
        count: 1,
        color: `#FFFFFF`,
        exact: !0,
        speed: 0,
        size: [1.5 * i, 1.5 * i],
        life: [0.1, 0.1],
        shape: 5,
        ink: !0,
        spin: 0,
        rot: 0,
        anchor: n,
        pop: 0.05,
        solid: !0,
      });
      for (let e = 0; e < 3; e++) {
        let u = Math.PI / 6 + (e + 0.2 + Math.random() * 0.6) * (Math.PI / 4.5),
          d = 7 + Math.random() * 2,
          f = c * Math.cos(u),
          p = Math.sin(u),
          m = l * Math.cos(u),
          h = 0.5 * i;
        r.emit({
          x: a + f * h,
          y: o + p * h,
          z: s + m * h,
          count: 1,
          color: wt[t.c][0],
          exact: !0,
          speed: 1,
          dir: [f * d, p * d, m * d],
          drag: 2,
          gravity: 6,
          size: [0.42 * i, 0.34 * i],
          life: [0.2, 0.26],
          shape: 12,
          ink: !0,
          spin: 0,
          rot: u - Math.PI / 2,
          anchor: n,
        });
      }
    }
    smoke(e, t) {
      let n = e.f,
        r = this.p,
        i = t.k * this.rollK,
        [a, o, s, c, l] = this.blastAt(e, t),
        [u, d, f] = wt[t.c];
      for (let e = 0; e < 6; e++) {
        let t = e < 2,
          p = e === 2,
          m = e === 5,
          h = t
            ? Math.PI / 2 + (e ? 0.35 : -0.35) + (Math.random() - 0.5) * 0.2
            : Math.PI / 18 + ((Math.PI * 8) / 9) * Math.random(),
          g = t
            ? 2.2 + Math.random() * 0.4
            : p
              ? 0.6
              : m
                ? 0
                : 1.6 + Math.random() * 0.8,
          _ = t ? 1.2 : p ? 1.25 : m ? 0.5 : 0.7 + Math.random() * 0.3;
        r.emit({
          x: a,
          y: m ? o - 0.1 * i : o,
          z: s,
          count: 1,
          color: t ? d : m ? f : u,
          exact: !0,
          speed: 1,
          dir: [
            c * Math.cos(h) * g,
            Math.sin(h) * g + (m ? 0.3 : 0.6),
            l * Math.cos(h) * g,
          ],
          drag: 5,
          gravity: t || p || m ? -6 : -4,
          size: [0.4 * i, _ * i],
          life: m ? [0.58, 0.64] : [0.62, 0.72],
          shape: t ? 9 : 1,
          ink: !0,
          spin: 0,
          anchor: n,
          pop: 0.06,
          solid: !0,
          shrink: 0.14,
        });
      }
    }
  },
  sn = { host: null, feature: null };
