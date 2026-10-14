// assets/fxHooks-Cvx_8YWC 09 — math
// Lines 3365-4729 of readable/assets/fxHooks-Cvx_8YWC.pretty.js (statement-aligned).
var Zn = 0.28,
  Qn = new S(0, 1, 0),
  $n = new h(),
  X = new S(),
  er = new S(),
  Z = new S(),
  tr = new S(),
  nr = (e) => 1 - (1 - e) ** 3,
  rr = (e) => e - Math.PI * Math.round(e / Math.PI),
  TrickCallout = class {
    root = new u();
    onCall = () => {};
    target = new u();
    spin = new u();
    ring;
    rim;
    spot;
    spotRim;
    lane = [];
    ghost = new u();
    word;
    drop;
    geos = [];
    mats = [];
    decals = [];
    air = -1;
    shown = !1;
    call = P.NONE;
    t = 0;
    punchT = 9;
    phase = 0;
    ttl = 0;
    ghostA = 0;
    resolving = -1;
    resolveKind = `fade`;
    tinted = null;
    at = new S();
    n = new S(0, 1, 0);
    constructor() {
      let e = (e) => (this.geos.push(e), e),
        t = (e) => (this.mats.push(e), e),
        n = (t) => e(t.rotateX(-Math.PI / 2));
      ((this.rim = new x(n(new r(0.94, 1.03, 64)), t(Y(C, 0.18)))),
        (this.ring = new x(n(new r(0.955, 1, 64)), t(Y(q[1], 0.6)))),
        (this.spot = new x(n(new b(0.5, 40)), t(Y(q[1], 0.14)))),
        (this.spotRim = new x(n(new r(0.47, 0.51, 40)), t(Y(q[1], 0.55)))));
      let i = n(new a(Xn(0.06, 0.24, 0.03))),
        o = t(Y(q[1], 0.45));
      for (let e of [-1.15, -0.75, 0.75, 1.15]) {
        let t = new x(i, o);
        ((t.position.z = e), this.lane.push(t));
      }
      let s = Xn(0.24, 0.84, 0.11),
        u = new x(n(new a(s)), t(Y(Vn, 0.45))),
        d = Xn(0.3, 0.9, 0.14);
      d.holes.push(Xn(0.24, 0.84, 0.11));
      let f = new x(n(new a(d)), t(Y(C, 0.4)));
      (this.ghost.add(u, f),
        [
          this.rim,
          this.ring,
          this.spot,
          this.spotRim,
          ...this.lane,
          u,
          f,
        ].forEach((e, t) => {
          e.renderOrder = 3 + t * 0.01;
        }),
        this.spin.add(this.spot, this.spotRim, ...this.lane, this.ghost),
        this.target.add(this.rim, this.ring, this.spin));
      let p = t(
        new l({
          color: q[1],
          alphaMap: Yn(),
          transparent: !0,
          opacity: 0.35,
          depthWrite: !1,
          fog: !1,
        }),
      );
      ((this.drop = new x(e(new c(1, 1, 1, 6, 1, !0).translate(0, 0.5, 0)), p)),
        (this.drop.renderOrder = 3),
        (this.drop.visible = !1));
      for (let e of this.mats)
        e instanceof l && this.decals.push({ mat: e, base: e.opacity });
      ((this.word = new v(
        t(
          new re({
            map: qn(),
            transparent: !0,
            depthTest: !1,
            depthWrite: !1,
            sizeAttenuation: !1,
            fog: !1,
          }),
        ),
      )),
        (this.word.renderOrder = 7),
        (this.target.visible = !1),
        (this.word.visible = !1),
        this.root.add(this.target, this.word, this.drop));
    }
    resolve(e) {
      this.shown &&
        ((this.shown = !1),
        (this.resolving = 0),
        (this.resolveKind = e ? `clean` : `bail`));
    }
    update(e, t, n, r, i) {
      let a = !!t && t.call !== P.NONE && (r.marker || r.glow);
      (a &&
        t.air !== this.air &&
        ((this.air = t.air), (this.shown = !1), (this.resolving = -1)),
        a &&
          !this.shown &&
          this.resolving < 0 &&
          (t.stake || t.call !== P.CLEAN) &&
          ((this.shown = !0),
          (this.t = 0),
          (this.phase = 0),
          (this.punchT = 9),
          (this.call = P.NONE),
          (this.ttl = t.ticks * ce)),
        this.shown &&
          !a &&
          ((this.shown = !1),
          (this.resolving = 0),
          (this.resolveKind = `fade`)),
        this.shown
          ? this.show(e, t, n, r.marker, r.glow, i)
          : this.resolving >= 0
            ? this.fadeOut(e, i)
            : ((this.target.visible = !1),
              (this.word.visible = !1),
              (this.drop.visible = !1),
              this.tint(null, 0)));
    }
    show(e, t, n, r, i, a) {
      if (t.call !== this.call) {
        let e = this.call;
        ((this.call = t.call),
          e !== P.NONE && (this.punchT = 0),
          this.paint(q[t.call]),
          this.onCall(e, t.call, t));
      }
      ((this.t += e), (this.punchT += e));
      let o = t.ticks * ce;
      this.ttl = Math.abs(this.ttl - o) > 0.05 ? o : Math.max(0, this.ttl - e);
      let s = t.call !== P.CLEAN,
        c = 1 - Math.min(1, this.ttl);
      this.phase += e * Math.PI * 2 * (1.2 + 2.5 * c);
      let l = s && !a ? 0.5 + 0.5 * Math.sin(this.phase) : 1;
      if (((this.target.visible = r), r)) {
        (this.target.scale.setScalar(1),
          this.at.set(t.x, t.y, t.z),
          this.n.set(t.nx, t.ny, t.nz));
        let n = t.tx !== 0 || t.ty !== 0 || t.tz !== 0;
        (Z.set(n ? t.tx : t.fx, n ? t.ty : t.fy, n ? t.tz : t.fz),
          X.crossVectors(this.n, Z).normalize(),
          Z.crossVectors(X, this.n),
          $n.makeBasis(X, er.copy(this.n), Z),
          this.target.quaternion.setFromRotationMatrix($n),
          this.target.position.copy(this.at).addScaledVector(this.n, 0.04));
        for (let e of this.lane) e.visible = n;
        let r = n
          ? Math.atan2(
              t.fx * X.x + t.fy * X.y + t.fz * X.z,
              t.fx * Z.x + t.fy * Z.y + t.fz * Z.z,
            )
          : 0;
        ((this.ghostA += rr(r - this.ghostA) * (a ? 1 : 1 - Math.exp(-25 * e))),
          (this.ghost.rotation.y = this.ghostA));
        let i = a ? 1 : nr(Math.min(1, this.t / Gn)),
          o = a ? 1 : 1 + 0.08 * Math.exp(-this.punchT * 12),
          c = Math.min(Wn, Hn + Un * this.ttl),
          u = i * o;
        (this.ring.scale.setScalar(c * u),
          this.rim.scale.setScalar(c * u),
          this.spin.scale.setScalar(u),
          this.opacity(i * (s ? 0.8 + 0.2 * l : 1)));
      }
      if (((this.drop.visible = r && !!n), this.drop.visible)) {
        tr.copy(n.root.position).sub(this.target.position);
        let e = tr.length() - 0.25;
        e > 0.3
          ? (this.drop.position.copy(this.target.position),
            this.drop.quaternion.setFromUnitVectors(Qn, tr.normalize()),
            this.drop.scale.set(0.018, e, 0.018),
            this.drop.material.alphaMap.repeat.set(1, e / Zn))
          : (this.drop.visible = !1);
      }
      let u = i && (s || !r) ? t.call : P.NONE;
      if (
        (u === P.NONE
          ? this.tint(null, 0)
          : this.tint(n, s ? (a ? 0.15 : 0.1 + 0.1 * l) : 0.1, Bn[u]),
        (this.word.visible = t.call === P.LET_GO),
        this.word.visible)
      ) {
        (i && n
          ? (n.headAnchor(tr).y -= 0.25)
          : tr.copy(this.at).addScaledVector(this.n, 0.9),
          this.word.position.copy(tr));
        let e = a ? 1 : nr(Math.min(1, Math.min(this.t, this.punchT) / Gn));
        (this.word.scale.set(0.22 * e, 0.069 * e, 1),
          (this.word.material.opacity = 0.9 * e));
      }
    }
    fadeOut(e, t) {
      (this.tint(null, 0),
        (this.word.visible = !1),
        (this.drop.visible = !1),
        (this.resolving += e));
      let n = Math.min(
        1,
        this.resolving / (this.resolveKind === `fade` ? 0.15 : Kn),
      );
      if (n >= 1 || !this.target.visible) {
        ((this.resolving = -1),
          (this.target.visible = !1),
          this.target.scale.setScalar(1));
        return;
      }
      if (this.resolveKind === `clean` && !t) {
        let e = Hn + 0.6 * Math.sqrt(n);
        (this.ring.scale.setScalar(e),
          this.rim.scale.setScalar(e),
          this.spin.scale.setScalar(1 + 0.1 * n));
      } else
        this.resolveKind === `bail` &&
          !t &&
          this.target.scale.setScalar(1 - 0.2 * n);
      this.opacity(1 - n);
    }
    paint(e) {
      for (let t of [
        this.ring,
        this.spot,
        this.spotRim,
        this.lane[0],
        this.drop,
      ])
        t.material.color.copy(e);
    }
    opacity(e) {
      for (let t of this.decals) t.mat.opacity = t.base * e;
    }
    tint(e, t, n) {
      (this.tinted && this.tinted !== e && this.tinted.setTint?.(null, 0),
        (this.tinted = e && t > 0 ? e : null),
        e?.setTint?.(n ?? null, t));
    }
    dispose() {
      (this.tint(null, 0), this.root.removeFromParent());
      for (let e of this.geos) e.dispose();
      for (let e of this.mats) e.dispose();
    }
  },
  Q = [`#E9E1F2`, `#D8CFEA`, `#F3EEF8`],
  ar = [`#D3C9E2`, `#C2B7D5`, `#E2DAEC`],
  or = [`#9A90AE`, `#857B9A`, `#B1A8C2`],
  sr = [`#FFE27A`, `#FFB347`, `#FFF6C0`],
  cr = [`#FFD21F`, `#FFF1A0`, `#FFFFFF`],
  lr = [`#FF3D7F`, `#FFD21F`, `#2FD67B`, `#1FC7E8`, `#A55BFF`, `#FF8A1F`],
  ur = [`#1FC7E8`, `#FF5A4F`, `#FFFFFF`, `#FFD21F`],
  dr = [`#6EDCA8`, `#C9F3E0`, `#FFFFFF`],
  $ = { x: 0, y: 0, z: 0 },
  fr =
    typeof location > `u`
      ? void 0
      : Rn.find((e) => e === new URLSearchParams(location.search).get(`cue`)),
  pr = fr ? zn(fr) : null,
  mr = { marker: !0, glow: !1 },
  hr = (je.speed * je.cycle) / 2,
  gr = (Me.speed * Me.cycle) / 2,
  _r = new (class {
    session = null;
    watch = !1;
    announcer = null;
    airOutTold = !1;
    particles = null;
    skins = null;
    lastPushAt = 0;
    sparkAcc = 0;
    stepAcc = 0;
    planted = !1;
    crouch = 0;
    mode = E.GROUND;
    comboHasSpecial = !1;
    beams = null;
    wind = null;
    skidding = !1;
    skidAcc = 0;
    skidSide = 1;
    dragAcc = 0;
    lastFlat = 0;
    decel = 0;
    guide = null;
    edge = null;
    lit = !1;
    cine = null;
    pendingLevel = null;
    bind(e, t, n = !1) {
      (this.unbind(),
        (this.session = e),
        (this.watch = n),
        (this.announcer = t),
        (this.particles = new Particles()),
        (this.particles.scale = e.stage.tier.particles),
        e.stage.scene.add(this.particles.mesh),
        (this.skins = new FunnelRide(this.particles)),
        e.stage.scene.add(this.skins.root),
        (this.beams = new BeamBurst()),
        e.stage.scene.add(this.beams.group),
        (this.wind = new TrailBeam()),
        (this.wind.scale = e.stage.tier.particles),
        e.stage.scene.add(this.wind.mesh),
        (this.guide = new TrickCallout()),
        (this.guide.onCall = (e, t, n) => this.landingCall(e, t, n)),
        e.stage.scene.add(this.guide.root),
        (e.cam.shakeEnabled = M.shake && !M.reducedMotion),
        (e.onRemoteMode = (e, t, n, r) =>
          this.remoteMode(e, t, n, r.x, r.y, r.z)),
        (Ae.bump = (e, t, n, r, i, a) => this.bailBump(e, t, n, r, i, a)),
        this.edge ||
          ((this.edge = document.createElement(`div`)),
          (this.edge.className = `special-edge`),
          document.getElementById(`ui`)?.prepend(this.edge)));
      let r = document.getElementById(`ui`);
      !this.cine && r && (this.cine = new CineBars(r));
    }
    remoteMode(e, t, n, r, i, a) {
      let o = this.particles;
      o &&
        (n === E.GROUND && t !== E.BAIL && t !== E.WALK
          ? o.emit({
              x: r,
              y: i + 0.05,
              z: a,
              count: 8,
              color: Q,
              speed: 2,
              size: [0.2, 0.6],
              life: [0.3, 0.7],
              drag: 3,
              up: 0.35,
            })
          : n === E.GRIND
            ? o.emit({
                x: r,
                y: i + 0.05,
                z: a,
                count: 10,
                color: this.skins?.skinOf(e) === `grindula` ? St : sr,
                speed: 4,
                size: [0.06, 0.02],
                life: [0.2, 0.4],
                gravity: 9,
                shape: 3,
              })
            : n === E.BAIL
              ? o.emit({
                  x: r,
                  y: i + 0.2,
                  z: a,
                  count: 14,
                  color: Q,
                  speed: 2.5,
                  size: [0.25, 0.7],
                  life: [0.5, 0.9],
                  drag: 2.5,
                  up: 0.6,
                })
              : (n === E.WALK || t === E.WALK) &&
                o.emit({
                  x: r,
                  y: i + 0.05,
                  z: a,
                  count: 4,
                  color: Q,
                  speed: 0.8,
                  size: [0.15, 0.35],
                  life: [0.3, 0.5],
                  drag: 3,
                  up: 0.3,
                }));
    }
    bailBump(e, t, n, r, i, a) {
      let o = this.particles;
      if (o) {
        if (i === `pop`) {
          o.emit({
            x: e,
            y: t + 0.1,
            z: n,
            count: 10,
            color: Q,
            speed: 2,
            size: [0.2, 0.6],
            life: [0.3, 0.6],
            drag: 3,
            up: 0.4,
          });
          return;
        }
        (o.emit({
          x: e,
          y: t + 0.03,
          z: n,
          count: 2 + Math.round(r * (i === `body` ? 9 : 5)),
          color: Q,
          speed: 1 + r * 2,
          size: [0.15, 0.5],
          life: [0.3, 0.6],
          drag: 3,
          up: 0.3,
        }),
          a === this.session?.localView &&
            (i === `board` ? N.clatter(r) : N.slam(r)));
      }
    }
    unbind() {
      (this.fireLevel(),
        (Ae.bump = null),
        this.particles?.dispose(),
        (this.particles = null),
        this.skins?.dispose(),
        (this.skins = null),
        this.beams?.dispose(),
        (this.beams = null),
        this.wind?.dispose(),
        (this.wind = null),
        this.guide?.dispose(),
        (this.guide = null),
        this.setLit(!1),
        this.cine?.hide(),
        (this.session = null),
        (this.watch = !1),
        (this.comboHasSpecial = !1),
        (this.skidding = !1),
        (this.lastFlat = this.decel = 0),
        N.silence());
    }
    enterPark(e) {
      oe(
        () => import(`./music-D6fpJLig.js`).then((e) => e.startMusic()),
        __vite__mapDeps([0, 1, 2, 3, 4]),
      );
    }
    update(e) {
      let t = this.session;
      if (!t) return;
      (this.particles && (this.particles.scale = t.stage.tier.particles),
        this.wind && (this.wind.scale = t.stage.tier.particles),
        this.particles?.update(e),
        this.beams?.update(e));
      let n = this.skins;
      if (n) {
        let r = t.stage.camera.position;
        (n.update(e, r),
          t.stage.tier.skinFx &&
            t.eachRider?.((t, i, a) => n.ride(t, a, i, e, r.x, r.z)),
          n.sweep());
      }
      let r = t.local.state;
      ((this.crouch = r.crouch),
        (this.mode = r.mode),
        this.pendingLevel &&
          (r.mode === E.GROUND ||
            r.mode === E.WALK ||
            performance.now() - this.pendingLevel.at > 1500) &&
          this.fireLevel());
      let i = Math.hypot(r.vx, r.vy, r.vz),
        a = r.mode === E.GROUND || r.mode === E.MANUAL,
        o = r.mode === E.GRIND,
        s = o && w[r.trickId]?.kind === T.SLIDE,
        c = r.mode === E.GROUND && r.xfer & ue.SLIDE ? Math.min(1, i / 14) : 0,
        l = c > 0 && !this.skidding;
      if (
        (l && N.skidStart(i),
        (this.skidding = c > 0),
        N.drive(i, a, o, s, o ? (t.rails.segs[r.rail]?.kind ?? -1) : -1, c),
        N.wallride(
          r.mode === E.WALLRIDE,
          i,
          r.vy,
          Math.min(1, (r.simTick - r.modeTick) / 36),
        ),
        this.setLit(r.special >= 200),
        this.wind)
      ) {
        let n = r.mode === E.AIR ? Math.min(1, Math.max(0, -r.vy - 7) / 6) : 0,
          a = M.reducedMotion
            ? 0
            : Math.max(Math.min(1, Math.max(0, i - 12) / 4.5), n),
          o = t.localFrame;
        this.wind.update(e, o.x, o.y + 0.8, o.z, r.vx, r.vy, r.vz, a, this.lit);
      }
      if (this.guide) {
        let n = M.tutorial >= 0;
        ((mr.marker = pr?.marker ?? (n || M.landingMarker)),
          (mr.glow = pr?.glow ?? (n || M.landingGlow)),
          this.guide.update(
            e,
            this.watch ? null : (t.local.landing?.() ?? null),
            t.localView,
            mr,
            M.reducedMotion,
          ));
      }
      if (o && this.particles) {
        this.sparkAcc += e * (8 + i * 2);
        let n = t.localFrame;
        for (; this.sparkAcc > 1;) {
          (--this.sparkAcc, de(n.yaw, n.ux, n.uy, n.uz, $));
          let e = r.railDir >= 0 ? -1 : 1;
          this.particles.emit({
            x: n.x,
            y: n.y + 0.05,
            z: n.z,
            count: 2,
            color: s ? Q : this.sparks(n),
            speed: s ? 1.5 : 4,
            dir: [r.vx * 0.05 * e * -1, 0.6, r.vz * 0.05 * e * -1],
            spread: 0.8,
            size: s ? [0.12, 0.3] : [0.05, 0.02],
            life: [0.2, 0.45],
            gravity: s ? 0 : 9,
            drag: 1.5,
            shape: s ? 0 : 3,
          });
        }
      }
      if (
        (this.brakeDust(e, t, l, c > 0),
        r.mode === E.GROUND &&
          i > 1 &&
          i < 8 &&
          performance.now() - this.lastPushAt > 650)
      ) {
        this.lastPushAt = performance.now();
        let e = t.localFrame;
        (this.particles?.emit({
          x: e.x,
          y: 0.05 + e.y,
          z: e.z,
          count: 3,
          color: Q,
          speed: 0.6,
          size: [0.15, 0.4],
          life: [0.3, 0.6],
          drag: 3,
          up: 0.3,
        }),
          N.push());
      }
      if (r.mode === E.WALK && r.vy === 0) {
        let n = t.localFrame;
        de(n.yaw, n.ux, n.uy, n.uz, $);
        let i = r.vx * $.x + r.vz * $.z < 0 ? gr : hr;
        ((this.stepAcc += Math.hypot(r.vx, r.vz) * e),
          this.stepAcc >= i && ((this.stepAcc -= i), N.step()));
      } else this.stepAcc = 0;
      let u = t.localFrame.planted;
      (u && !this.planted && N.step(), (this.planted = u));
    }
    brakeDust(e, t, n, r) {
      let i = this.particles,
        a = t.local.state,
        o = Math.hypot(a.vx, a.vz),
        s = e > 0 ? (o - this.lastFlat) / e : 0;
      if (
        ((this.decel += (s - this.decel) * Math.min(1, e * 6)),
        (this.lastFlat = o),
        !i || a.mode !== E.GROUND || o < 0.8)
      ) {
        this.skidAcc = this.dragAcc = 0;
        return;
      }
      let c = t.localFrame,
        l = a.vx / o,
        u = a.vz / o;
      if (
        (n &&
          i.emit({
            x: c.x,
            y: c.y + 0.05,
            z: c.z,
            count: 10,
            color: ar,
            speed: 2.2,
            dir: [l * 0.8, 0.2, u * 0.8],
            size: [0.2, 0.6],
            life: [0.4, 0.8],
            drag: 3,
            up: 0.5,
          }),
        r)
      ) {
        this.skidAcc += e * (40 + o * 5);
        let t = Math.floor(this.skidAcc);
        this.skidAcc -= t;
        for (let n = 0; n < t; n++) {
          let r = o * e * (n / t),
            a = (this.skidSide = -this.skidSide) * 0.2,
            s = c.x - l * r - u * a,
            d = c.z - u * r + l * a;
          (i.emit({
            x: s,
            y: c.y + 0.04,
            z: d,
            count: 1,
            color: ar,
            speed: 1.6,
            dir: [l * 1.2, 0.3, u * 1.2],
            spread: 0.7,
            size: [0.12, 0.45],
            life: [0.35, 0.7],
            drag: 3,
            up: 0.4,
          }),
            Math.random() < 0.3 && this.grit(i, s, c.y, d, l, u));
        }
      } else if (this.decel < -6 && a.uy > 0.97 && a.simTick - a.modeTick > 6) {
        (de(c.yaw, c.ux, c.uy, c.uz, $), (this.dragAcc += e * (24 + o * 3)));
        let t = Math.floor(this.dragAcc);
        this.dragAcc -= t;
        for (let n = 0; n < t; n++) {
          let r = o * e * (n / t),
            a = c.x - $.x * 0.36 - l * r,
            s = c.z - $.z * 0.36 - u * r;
          (i.emit({
            x: a,
            y: c.y + 0.03,
            z: s,
            count: 1,
            color: ar,
            speed: 0.8,
            dir: [l * 0.6, 0.2, u * 0.6],
            spread: 0.6,
            size: [0.15, 0.5],
            life: [0.35, 0.7],
            drag: 3,
            up: 0.3,
          }),
            Math.random() < 0.5 && this.grit(i, a, c.y, s, l, u));
        }
      }
    }
    grit(e, t, n, r, i, a) {
      e.emit({
        x: t,
        y: n + 0.04,
        z: r,
        count: 1,
        color: or,
        speed: 1.4,
        dir: [i * 0.4, 1.1, a * 0.4],
        spread: 0.6,
        size: [0.05, 0.03],
        life: [0.2, 0.35],
        gravity: 9,
        drag: 1,
        shape: 1,
      });
    }
    get haptics() {
      return M.haptics && !this.watch;
    }
    scuff(e) {
      (N.skidStart(Math.hypot(e.vx, e.vy, e.vz)),
        this.particles?.emit({
          x: e.x,
          y: e.y + 0.05,
          z: e.z,
          count: 10,
          color: Q,
          speed: 2,
          size: [0.2, 0.55],
          life: [0.3, 0.6],
          drag: 3,
          up: 0.3,
        }));
    }
    sparks(e) {
      return this.skins?.skinAt(e) === `grindula` ? St : sr;
    }
    simEvents(e, t, n) {
      if (n !== this.session || !e.flags) return;
      let r = this.particles,
        i = n.localFrame,
        a = n.cam;
      if (e.flags & D.OLLIE) {
        let e = this.mode,
          n = e === E.GRIND || e === E.WALLRIDE ? 0 : e === E.LIP ? 0.5 : 1;
        (N.pop(Math.min(1, this.crouch / 12), Math.hypot(t.vx, t.vz), n),
          r?.emit({
            x: t.x,
            y: t.y + 0.05,
            z: t.z,
            count: 6,
            color: Q,
            speed: 1.2,
            size: [0.15, 0.45],
            life: [0.3, 0.6],
            drag: 3,
            up: 0.4,
          }));
      }
      if (e.flags & D.TRICK) {
        t.comboMult >= 67 && t.comboMult - e.tricks.length < 67 && N.sixSeven();
        for (let o of e.tricks) {
          let e = w[o & 255];
          e &&
            ((e.kind === T.FLIP ||
              e.kind === T.GRAB ||
              e.kind === T.SPECIAL_AIR) &&
              N.whoosh(e.kind === T.SPECIAL_AIR),
            e.kind === T.PIVOT && t.mode === E.GRIND
              ? (N.grindOn(
                  n.rails.segs[t.rail]?.kind ?? -1,
                  w[t.trickId]?.kind === T.SLIDE,
                  Math.hypot(t.vx, t.vy, t.vz),
                ),
                r?.emit({
                  x: t.x,
                  y: t.y + 0.05,
                  z: t.z,
                  count: 10,
                  color: this.sparks(i),
                  speed: 4,
                  spread: 1,
                  size: [0.06, 0.02],
                  life: [0.2, 0.4],
                  gravity: 9,
                  shape: 3,
                }))
              : (e.kind === T.REVERT || e.kind === T.PIVOT) && this.scuff(t),
            (e.kind === T.SPECIAL_AIR ||
              e.kind === T.SPECIAL_GRIND ||
              e.kind === T.SPECIAL_MANUAL) &&
              ((this.comboHasSpecial = !0),
              N.ui(`specialTrick`),
              this.cine?.show(e.name),
              this.flare(),
              r?.emit({
                x: t.x,
                y: t.y + 0.8,
                z: t.z,
                count: 26,
                color: lr,
                speed: 5,
                size: [0.12, 0.08],
                life: [0.6, 1.1],
                gravity: 6,
                drag: 1.2,
                shape: 2,
              }),
              a.kickFov(6)));
        }
      }
      if (
        (e.flags & D.TURN && this.scuff(t),
        e.flags & D.GRIND_START &&
          (N.grindOn(
            n.rails.segs[e.rail]?.kind ?? -1,
            w[t.trickId]?.kind === T.SLIDE,
            Math.hypot(t.vx, t.vy, t.vz),
          ),
          r?.emit({
            x: t.x,
            y: t.y + 0.05,
            z: t.z,
            count: 14,
            color: this.sparks(i),
            speed: 5,
            spread: 1,
            size: [0.06, 0.02],
            life: [0.2, 0.4],
            gravity: 9,
            shape: 3,
          }),
          a.addTrauma(0.12)),
        e.flags & D.LIP && N.clank(),
        e.flags & D.BOARD &&
          (N.clatter(0.3),
          r?.emit({
            x: i.x,
            y: i.y + 0.05,
            z: i.z,
            count: 5,
            color: Q,
            speed: 0.8,
            size: [0.15, 0.35],
            life: [0.3, 0.5],
            drag: 3,
            up: 0.3,
          })),
        e.flags & (D.LAND | D.BAIL) && this.guide?.resolve(!(e.flags & D.BAIL)),
        e.flags & D.LAND)
      ) {
        let t = Math.min(1, e.impact / 12);
        if (
          (N.land(e.impact),
          r?.emit({
            x: i.x,
            y: i.y + 0.05,
            z: i.z,
            count: 6 + Math.round(t * 12),
            color: Q,
            speed: 1.5 + t * 3,
            size: [0.2, 0.7],
            life: [0.35, 0.8],
            drag: 3,
            up: 0.35,
          }),
          a.addTrauma(0.08 + t * 0.25),
          this.haptics && j.haptic(12 + Math.round(t * 25)),
          e.grade)
        ) {
          n.localView.landGrade?.(e.grade);
          let t = e.grade === pe.PERFECT;
          (N.ui(t ? `perfect` : `sloppy`),
            n.hud?.grade(
              t ? `perfect` : `sloppy`,
              t ? `PERFECT +${se.toLocaleString()}` : `SLOPPY -500`,
              t ? se : -500,
            ),
            t &&
              r?.emit({
                x: i.x,
                y: i.y + 0.1,
                z: i.z,
                count: 10,
                color: cr,
                speed: 2.6,
                up: 0.8,
                size: [0.1, 0.04],
                life: [0.3, 0.55],
                gravity: 5,
                drag: 2,
                shape: 2,
              }));
        }
      }
      if (e.flags & D.BAIL) {
        let i = e.comboScore;
        (N.bail(
          Math.min(
            1,
            Math.max(e.impact / 12, Math.hypot(t.vx, t.vy, t.vz) / 14),
          ),
          i,
        ),
          r?.emit({
            x: t.x,
            y: t.y + 0.2,
            z: t.z,
            count: 20,
            color: Q,
            speed: 3,
            size: [0.25, 0.8],
            life: [0.5, 1],
            drag: 2.5,
            up: 0.6,
          }),
          a.addTrauma(0.45));
        let o =
          [
            ``,
            `Still grabbing!`,
            `Mid-flip!`,
            `Sketchy landing!`,
            `Crooked landing!`,
            `Lost balance!`,
          ][e.bailWhy] ?? ``;
        (this.announcer?.setback(`BAILED!`, o, i, 1100, (e) =>
          n.stage.drain(e),
        ),
          this.haptics && j.haptic([30, 40, 60]));
      }
      if (
        (e.flags & D.WALL && e.impact > 3 && N.wall(e.impact),
        e.flags & D.FLAIL &&
          (r?.emit({
            x: i.x,
            y: i.y + 0.3,
            z: i.z,
            count: 14,
            color: Q,
            speed: 2.5,
            size: [0.2, 0.6],
            life: [0.4, 0.7],
            drag: 2.5,
            up: 0.5,
          }),
          a.addTrauma(0.3),
          this.haptics && (O(0.5, 0.7, 140), j.haptic([25, 20, 35]))),
        e.flags & D.SPECIAL_READY && this.specialReady(),
        e.flags & D.WALLRIDE && N.wallOn(Math.hypot(t.vx, t.vy, t.vz)),
        e.flags & D.RESPAWN)
      ) {
        a.inited = !1;
        let t =
          e.respawnWhy === fe.GRASS
            ? `KEEP OFF THE GRASS!`
            : e.respawnWhy === fe.OUT
              ? `OUT OF BOUNDS!`
              : ``;
        if (t) {
          let r = e.flags & D.COMBO_LOST ? e.comboScore : 0;
          (this.announcer?.setback(
            t,
            r > 0 ? `` : `back to the start`,
            r,
            1300,
            (e) => n.stage.drain(e),
          ),
            N.ui(e.respawnWhy === fe.GRASS ? `grass` : `queueOut`),
            n.cut());
        }
      }
      (e.flags & (D.COMBO_LOST | D.RESPAWN) &&
        ((this.comboHasSpecial = !1), this.cine?.hide()),
        !this.watch &&
          !M.airOut &&
          e.flags & D.LAUNCH &&
          t.vert &&
          t.y < 1 &&
          !this.airOutTold &&
          ((this.airOutTold = !0),
          this.announcer?.toast(
            `Tap ${Se(`ollie`)} on the way up to air out of the pool`,
            `mint`,
            4200,
          )),
        e.flags & D.TRANSFER &&
          (N.pop(0.5, Math.hypot(t.vx, t.vz), 0.5),
          !this.watch &&
            !M.airOut &&
            t.xfer & ue.OUT &&
            ((M.airOut = !0), Te())));
    }
    landingCall(e, t, n) {
      t === P.LET_GO
        ? (N.ui(`landWarn`, 1), this.haptics && O(0.1, 0.2, 50))
        : t === P.BAIL && n.ticks <= 15
          ? (N.ui(`landWarn`, 0), this.haptics && O(0.2, 0.12, 70))
          : t === P.CLEAN &&
            e !== P.NONE &&
            (N.ui(`landOk`),
            this.particles?.emit({
              x: n.x,
              y: n.y + 0.1,
              z: n.z,
              count: 6,
              color: dr,
              speed: 2,
              up: 0.6,
              size: [0.09, 0.04],
              life: [0.25, 0.45],
              gravity: 5,
              drag: 2.5,
              shape: 2,
            }));
    }
    specialReady() {
      (N.ui(`special`),
        this.session?.hud?.specialReady(),
        this.setLit(!0),
        this.haptics && (O(0.5, 0.8, 180), j.haptic([25, 30, 45])));
      let e = this.session;
      if (!e) return;
      let t = e.localFrame,
        n = this.particles;
      (M.reducedMotion || (e.cam.kickFov(6), e.cam.addTrauma(0.15)),
        n?.emit({
          x: t.x,
          y: t.y + 0.9,
          z: t.z,
          count: 36,
          color: sr,
          speed: 7,
          size: [0.08, 0.03],
          life: [0.4, 0.8],
          gravity: 3,
          drag: 1.2,
          shape: 3,
        }));
      for (let e = 0; e < 12; e++) {
        let r = (e * Math.PI) / 6;
        n?.emit({
          x: t.x,
          y: t.y + 0.3,
          z: t.z,
          count: 2,
          color: cr,
          speed: 5,
          dir: [Math.cos(r), 0.25, Math.sin(r)],
          spread: 0.15,
          up: 0.2,
          size: [0.14, 0.06],
          life: [0.4, 0.7],
          gravity: 2,
          drag: 2,
          shape: 2,
        });
      }
    }
    flare() {
      let e = this.edge;
      e &&
        this.lit &&
        (e.classList.remove(`ignite`),
        e.offsetWidth,
        e.classList.add(`ignite`));
    }
    setLit(e) {
      if (e === this.lit) return;
      this.lit = e;
      let t = this.edge;
      t &&
        (t.classList.toggle(`on`, e),
        t.classList.remove(`ignite`),
        e && (t.offsetWidth, t.classList.add(`ignite`)));
    }
    landed(e) {
      (N.ui(this.comboHasSpecial ? `specialLand` : `combo`, e),
        (this.comboHasSpecial = !1));
      let t = this.session;
      if (!t) return;
      let n = t.localFrame;
      (e >= 2500 && t.cam.kickFov(Math.min(8, 2 + e / 5e3)),
        e >= 8e3 &&
          this.particles?.emit({
            x: n.x,
            y: n.y + 1.2,
            z: n.z,
            count: 40,
            color: lr,
            speed: 6,
            size: [0.14, 0.1],
            life: [0.8, 1.4],
            gravity: 5,
            drag: 1,
            shape: 2,
          }));
    }
    paint(e, t, n, r) {
      (this.particles?.emit({
        x: e,
        y: 0.5,
        z: t,
        count: r ? 40 : 20,
        color: [n, n, `#FFFFFF`],
        speed: 5,
        size: [0.25, 0.1],
        life: [0.5, 1],
        gravity: 8,
        drag: 1.5,
        shape: 1,
      }),
        r && N.ui(`letter`));
    }
    burst(e, t, n, r) {
      this.particles?.emit({
        x: e,
        y: t,
        z: n,
        count: 30,
        color: r,
        speed: 4,
        size: [0.2, 0.05],
        life: [0.5, 0.9],
        gravity: 2,
        drag: 2,
        shape: 1,
      });
    }
    dust(e, t, n, r = 12, i = 3) {
      this.particles?.emit({
        x: e,
        y: t + 0.1,
        z: n,
        count: r,
        color: Q,
        speed: i,
        size: [0.3, 0.9],
        life: [0.4, 0.9],
        drag: 3,
        up: 0.35,
      });
    }
    ui(e, t = 0) {
      N.ui(e, t);
    }
    queue(e, t, n) {
      let r = this.session;
      if (
        (N.ui(e === `in` ? `queueIn` : `queueOut`),
        this.haptics &&
          (O(
            e === `in` ? 0.35 : 0.2,
            e === `in` ? 0.7 : 0.35,
            e === `in` ? 150 : 90,
          ),
          j.haptic(e === `in` ? [20, 30, 35] : 15)),
        !r)
      )
        return;
      let i = r.localFrame,
        a = [t, t, `#FFFFFF`, `#FFD21F`];
      if (e === `in`) {
        if (
          (r.cam.kickFov(5),
          this.particles?.emit({
            x: i.x,
            y: i.y + 1.4,
            z: i.z,
            count: 44,
            color: a,
            speed: 6.5,
            up: 0.6,
            size: [0.16, 0.08],
            life: [0.7, 1.2],
            gravity: 6,
            drag: 1.2,
            shape: 2,
          }),
          n)
        )
          for (let e = 0; e < 16; e++) {
            let t = (e * Math.PI) / 8;
            this.particles?.emit({
              x: n.x,
              y: n.y + 0.1,
              z: n.z,
              count: 2,
              color: a,
              speed: 6,
              dir: [Math.cos(t), 0.35, Math.sin(t)],
              spread: 0.12,
              up: 0.2,
              size: [0.14, 0.06],
              life: [0.4, 0.7],
              gravity: 3,
              drag: 2,
              shape: 2,
            });
          }
      } else
        this.particles?.emit({
          x: i.x,
          y: i.y + 1.6,
          z: i.z,
          count: 18,
          color: [t, `#FFFFFF`],
          speed: 2.5,
          size: [0.14, 0.06],
          life: [0.5, 0.9],
          gravity: 7,
          drag: 1.5,
          shape: 2,
        });
    }
    get levelPending() {
      return !!this.pendingLevel;
    }
    levelUp(e, t) {
      ((this.pendingLevel = { level: e, perks: t, at: performance.now() }),
        this.session || this.fireLevel());
    }
    fireLevel() {
      let e = this.pendingLevel;
      e &&
        ((this.pendingLevel = null),
        this.announcer
          ? this.announcer.level(e.level, e.perks, () => this.levelShow())
          : this.levelShow());
    }
    levelShow() {
      (N.ui(`levelUp`), this.haptics && j.haptic([20, 40, 20, 40, 70]));
      let e = this.session;
      if (!e) return;
      if (!M.reducedMotion) {
        let t = document.createElement(`div`);
        ((t.className = `lvl-flash`),
          document.getElementById(`ui`)?.append(t),
          setTimeout(() => t.remove(), 700),
          e.cam.kickFov(7),
          e.cam.addTrauma(0.22));
      }
      this.beams?.spawn(() => e.localFrame, !0);
      let t = e.localFrame,
        n = this.particles;
      if (n) {
        (n.emit({
          x: t.x,
          y: t.y + 0.2,
          z: t.z,
          count: 40,
          color: sr,
          speed: 9,
          dir: [0, 1, 0],
          spread: 0.35,
          size: [0.08, 0.03],
          life: [0.6, 1.1],
          gravity: 6,
          drag: 0.8,
          shape: 3,
        }),
          n.emit({
            x: t.x,
            y: t.y + 1.8,
            z: t.z,
            count: 70,
            color: lr,
            speed: 7,
            size: [0.16, 0.1],
            life: [1, 1.7],
            gravity: 5,
            drag: 1,
            shape: 2,
          }));
        for (let e = 0; e < 8; e++) {
          let r = (e * Math.PI) / 4;
          n.emit({
            x: t.x,
            y: t.y + 0.05,
            z: t.z,
            count: 3,
            color: Q,
            speed: 4,
            dir: [Math.cos(r), 0.15, Math.sin(r)],
            spread: 0.25,
            up: 0.2,
            size: [0.25, 0.6],
            life: [0.4, 0.8],
            drag: 2.5,
          });
        }
      }
    }
    levelUpAt(e) {
      let t = this.session,
        n = t?.posOf(e);
      if (!t || !n) return;
      let r = t.localFrame;
      Math.hypot(n.x - r.x, n.z - r.z) > 60 ||
        (this.beams?.spawn(() => t.posOf(e), !1),
        this.particles?.emit({
          x: n.x,
          y: n.y + 1.6,
          z: n.z,
          count: 30,
          color: lr,
          speed: 5,
          size: [0.14, 0.1],
          life: [0.8, 1.4],
          gravity: 5,
          drag: 1,
          shape: 2,
        }),
        N.ui(`levelUpFar`));
    }
    tag(e, t) {
      let n = this.session,
        r = this.particles,
        i = t !== `other`;
      (r?.emit({
        x: e.x,
        y: e.y + 0.9,
        z: e.z,
        count: i ? 46 : 26,
        color: ur,
        speed: i ? 8 : 6,
        size: [0.16, 0.08],
        life: [0.5, 1],
        gravity: 6,
        drag: 1.6,
        shape: 2,
      }),
        r?.emit({
          x: e.x,
          y: e.y + 0.9,
          z: e.z,
          count: i ? 22 : 12,
          color: sr,
          speed: 10,
          size: [0.07, 0.03],
          life: [0.2, 0.45],
          gravity: 4,
          drag: 1,
          shape: 3,
        }));
      for (let t = 0; t < 10; t++) {
        let n = (t * Math.PI) / 5;
        r?.emit({
          x: e.x,
          y: e.y + 0.05,
          z: e.z,
          count: 2,
          color: Q,
          speed: 5,
          dir: [Math.cos(n), 0.1, Math.sin(n)],
          spread: 0.15,
          up: 0.1,
          size: [0.25, 0.6],
          life: [0.3, 0.6],
          drag: 3,
        });
      }
      if (!n) return;
      if (t === `other`) {
        let t = n.localFrame,
          r = Math.hypot(e.x - t.x, e.z - t.z);
        (r < 12 && n.cam.addTrauma(0.15 * (1 - r / 12)),
          r < 40 && N.ui(`tagFar`));
        return;
      }
      let a = t === `victim`;
      if (
        (N.ui(a ? `tagged` : `bonk`),
        n.cam.addTrauma(a ? 0.55 : 0.35),
        n.cam.kickFov(a ? 10 : 7),
        this.haptics &&
          (O(a ? 1 : 0.6, a ? 0.8 : 0.5, a ? 260 : 160),
          j.haptic(a ? [40, 30, 80] : 35)),
        M.reducedMotion)
      )
        return;
      n.hitStop(a ? 70 : 55);
      let o = document.createElement(`div`);
      ((o.className = `tag-flash ${a ? `victim` : `tagger`}`),
        document.getElementById(`ui`)?.append(o),
        setTimeout(() => o.remove(), 450));
    }
    skinTag(e, t) {
      let n = this.session?.posOf(t);
      n && this.skins?.tag(e, n);
    }
    skinPerform(e) {
      this.skins?.perform(e);
    }
    celebrate() {
      N.ui(`mission`);
      let e = this.session;
      if (!e) return;
      let t = e.localFrame;
      this.particles?.emit({
        x: t.x,
        y: t.y + 1.6,
        z: t.z,
        count: 60,
        color: lr,
        speed: 7,
        size: [0.16, 0.1],
        life: [1, 1.6],
        gravity: 5,
        drag: 1,
        shape: 2,
      });
    }
  })();
