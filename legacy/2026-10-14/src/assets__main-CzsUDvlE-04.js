// assets__main-CzsUDvlE 04 — math
// Lines 819-1241 of readable/assets__main-CzsUDvlE.pretty.js (statement-aligned).
var Oo = class {
    stage;
    park = null;
    parkId = `plaza`;
    wantPark = `plaza`;
    parkSeq = 0;
    a = _o;
    view = null;
    group = new c();
    cast = new c();
    crowdGroup = new c();
    tv = null;
    tvSet = { parkId: `plaza`, cast: this.cast, all: this.group };
    bestSeq = 0;
    t = 0;
    frame = Je();
    focus = 0;
    goofy = !1;
    spot = new T(0, 0, -6);
    dead = !1;
    shot = `home`;
    cur = null;
    shown = null;
    net = null;
    crowd = new Map();
    crowdOff = [];
    friends = new Map();
    turnGoal = 0;
    turn = 0;
    sway = 1;
    fx = null;
    act = null;
    staged = null;
    spun = 0;
    constructor(e) {
      ((this.stage = e),
        this.cast.add(this.crowdGroup),
        this.group.add(this.cast),
        e.scene.add(this.group));
    }
    async load() {
      ((this.park = await ha(Sr.plaza, { day: ua(vn()) })),
        this.group.add(this.park.group),
        this.stage.setLook(Ce(`plaza`)));
    }
    async setPark(e, t) {
      if (e === this.wantPark) return;
      this.wantPark = e;
      let n = ++this.parkSeq;
      if (e === this.parkId) return;
      let r = null,
        i = null;
      try {
        ((r = await t()),
          r &&
            n === this.parkSeq &&
            !this.dead &&
            (i = await ha(r, { day: ua(vn()) })));
      } catch (t) {
        console.warn(`[showroom] park`, e, t);
      }
      if (n !== this.parkSeq || this.dead || !r || !i) {
        (i?.dispose(), n === this.parkSeq && (this.wantPark = this.parkId));
        return;
      }
      (this.park?.dispose(),
        (this.park = i),
        this.group.add(i.group),
        (this.parkId = r.id));
      let a = Do(r);
      (this.spot.set(a.x, a.y, a.z),
        (this.a = a.a),
        (this.crowdGroup.visible = r.id === `plaza`));
      let o = this.tvSet.parkId;
      ((this.tvSet = { ...this.tvSet, parkId: r.id }),
        this.tv?.rehome(o, this.tvSet),
        this.group.visible && this.stage.setLook(Ce(r.id)),
        (this.cur = null));
    }
    setShot(e) {
      this.shot = e;
    }
    setTurn(e) {
      this.turnGoal = e;
      let t = this.turn - e;
      this.turn = e + t - Math.round(t / (2 * Math.PI)) * 2 * Math.PI;
    }
    setParty(e) {
      let t = new Set();
      e.slice(0, ho.length - 1).forEach((e, n) => {
        t.add(e.key);
        let r = Ie(e.look),
          i = this.friends.get(e.key);
        if (
          (i &&
            i.lk !== r &&
            !i.view.recolor?.(e.look) &&
            (i.view.dispose(), (i = void 0)),
          !i)
        ) {
          let t = Ze(e.look);
          (this.cast.add(t.root),
            t.playPose?.(`greet`),
            (i = {
              view: t,
              lk: r,
              slot: 0,
              goofy: !1,
              frame: Je(),
              phase: Math.random() * 6,
            }));
        }
        ((i.lk = r),
          (i.slot = n + 1),
          (i.goofy = e.look.stance === `goofy`),
          this.friends.set(e.key, i));
      });
      for (let [e, n] of this.friends)
        t.has(e) || (n.view.dispose(), this.friends.delete(e));
    }
    setBest(e) {
      let t = ++this.bestSeq;
      me(
        async () => {
          let { BestTv: e } = await import(`./bestTv-zah2thYf.js`);
          return { BestTv: e };
        },
        __vite__mapDeps([
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
          20, 21, 22, 23, 24, 25, 26, 27,
        ]),
      )
        .then(async ({ BestTv: n }) => {
          if (t !== this.bestSeq) return;
          let r = this.tv;
          r ||
            ((r = this.tv = new n(this.stage)),
            (r.root.visible = !1),
            r.root.scale.setScalar(wo),
            this.cast.add(r.root),
            await r.build());
          let i = await e;
          t === this.bestSeq && (await r.tune(i, this.tvSet));
        })
        .catch((e) => console.warn(`[tv]`, e));
    }
    tvRect() {
      return this.tv?.rect(this.shot === `home` && !!this.view) ?? null;
    }
    riderRect() {
      if (this.shot !== `home` || !this.view || !this.group.visible)
        return { x: 0, y: 0, w: 0, h: 0, on: !1 };
      let e = this.stage.camera,
        t = this.stage.box,
        n = 1 / 0,
        r = 1 / 0,
        i = -1 / 0,
        a = -1 / 0;
      for (let o of [-0.4, bo])
        for (let s of [-0.4, bo])
          for (let c of [0, yo]) {
            po.set(this.spot.x + o, this.spot.y + c, this.spot.z + s).project(
              e,
            );
            let l = t.left + ((po.x + 1) / 2) * t.width,
              u = t.top + ((1 - po.y) / 2) * t.height;
            ((n = Math.min(n, l)),
              (i = Math.max(i, l)),
              (r = Math.min(r, u)),
              (a = Math.max(a, u)));
          }
      return { x: n, y: r, w: i - n, h: a - r, on: !0 };
    }
    wave(e) {
      this.friends.get(e)?.view.playPose?.(`greet`);
    }
    slotRects() {
      let e = this.stage.camera,
        t = this.stage.box,
        n = e.aspect < 1,
        r = this.shot === `home` && !!this.view;
      return (n ? go : ho).map((i, a) => {
        (this.slotPos(a, n, po), (po.y += yo), po.project(e));
        let o = r && po.z < 1 && Math.abs(po.x) < 1.05 && Math.abs(po.y) < 1.05;
        return {
          x: t.left + ((po.x + 1) / 2) * t.width,
          y: t.top + ((1 - po.y) / 2) * t.height,
          on: o,
        };
      });
    }
    slotPos(e, t, n) {
      return this.spotAt((t ? go : ho)[e], n);
    }
    spotAt([e, t], n) {
      let r = this.a;
      return n.set(
        this.spot.x + Math.cos(r) * e - Math.sin(r) * t,
        this.spot.y,
        this.spot.z - Math.sin(r) * e - Math.cos(r) * t,
      );
    }
    watch(e) {
      (this.unwatch(), (this.net = e));
      let t = e.callbacks;
      (this.crowdOff.push(
        t.onAdd(`skaters`, (t, n) => {
          if (n === e.room.sessionId || this.crowd.has(n)) return;
          let r = ma(n, t, e.world.col);
          (this.crowdGroup.add(r.view.root, r.ring), this.crowd.set(n, r));
        }),
      ),
        this.crowdOff.push(
          t.onRemove(`skaters`, (e, t) => {
            let n = this.crowd.get(t);
            n && (va(n), this.crowd.delete(t));
          }),
        ));
    }
    unwatch() {
      for (let e of this.crowdOff) e();
      this.crowdOff = [];
      for (let e of this.crowd.values()) va(e);
      (this.crowd.clear(), (this.net = null));
    }
    get crowdSize() {
      return this.crowd.size;
    }
    show(e, t = !1, n = !1) {
      let r = e ? `${Ie(e)}${t ? `|locked` : ``}` : null,
        i = e && n && !t ? Mr(De(e)) : void 0;
      if (!i) ((this.staged = null), (this.act = null));
      else if (
        i.key !== this.staged &&
        ((this.staged = i.key),
        (this.act = null),
        this.stage.tier.skinFx &&
          !document.body.classList.contains(`reduce-motion`) &&
          ((this.act = { look: De(e), show: co[i.key], t: -0.15 }),
          (this.sway = 0),
          !this.fx))
      ) {
        let e = new Aa();
        e.scale = this.stage.tier.particles;
        let t = new Ta(e, !0);
        (this.cast.add(e.mesh, t.root), (this.fx = { p: e, skins: t }));
      }
      if (r !== this.shown || (r !== null && !this.view)) {
        if (((this.shown = r), e && this.view?.recolor?.(e))) {
          ((this.goofy = e.stance === `goofy`), this.view.setSilhouette?.(t));
          return;
        }
        if ((this.view?.dispose(), (this.view = null), !e)) {
          this.focus = 0;
          return;
        }
        ((this.goofy = e.stance === `goofy`),
          (this.view = Ze(e)),
          this.view.setSilhouette?.(t),
          this.cast.add(this.view.root),
          this.act || this.view.playPose?.(`greet`),
          (this.focus = 1));
      }
    }
    setHidden(e) {
      ((this.group.visible = !e),
        e || (this.stage.setLook(Ce(this.parkId)), (this.cur = null)));
    }
    idle(e) {
      this.net?.predict.tick(e);
    }
    frameUpdate(e, t) {
      if (((this.t += e), this.net)) {
        let n = this.net.predict;
        n.tick(t);
        let r = _a(this.stage.camera);
        for (let t of this.crowd.values()) ga(t, n, e, !0, void 0, r);
      }
      let n = this.stage.camera;
      if (this.view) {
        let t = this.frame;
        ((t.x = this.spot.x), (t.y = this.spot.y), (t.z = this.spot.z));
        let r = this.a,
          i = document.body.classList.contains(`reduce-motion`),
          a = i ? 1 : 1 - Math.exp(-12 * e);
        ((this.turn += (this.turnGoal - this.turn) * a),
          (this.sway +=
            ((this.act ? 0 : this.turnGoal === 0 ? 1 : 0.15) - this.sway) *
            (i ? 1 : 1 - Math.exp(-3 * e))),
          (t.yaw =
            (this.goofy ? -Math.PI / 2 : Math.PI / 2) +
            r +
            this.turn +
            this.spun +
            Math.sin(this.t * 0.8) * 0.45 * this.sway),
          (t.mode = Ge.GROUND),
          (t.speed = 0),
          (t.vx = t.vy = t.vz = 0),
          (t.crouch = 0),
          (t.trickId = 0),
          (t.trickT = 0),
          (t.spin = 0),
          (t.fakie = !1),
          this.act && this.playAct(this.act, t, e),
          this.view.animate(t, e),
          this.fx && this.effects(e));
        let o = this.shot === `home`;
        for (let t of this.friends.values()) {
          if (((t.view.root.visible = o), !o)) continue;
          let i = t.frame;
          (this.slotPos(t.slot, n.aspect < 1, po),
            (i.x = po.x),
            (i.y = po.y),
            (i.z = po.z));
          let a = t.slot === 2 ? -0.3 : 0.3;
          ((i.yaw =
            (t.goofy ? -Math.PI / 2 : Math.PI / 2) +
            r +
            a +
            Math.sin(this.t * 0.8 + t.phase) * 0.35),
            (i.mode = Ge.GROUND),
            (i.speed = 0),
            t.view.animate(i, e));
        }
        let s = this.tv;
        s &&
          ((s.root.visible = o),
          this.spotAt(n.aspect < 1 ? So : xo, s.root.position),
          (s.root.rotation.y = r + Co),
          o && s.pass(e, this.tvSet));
        let c = mo(
            this.shot,
            n.aspect < 1,
            this.friends.size,
            this.act && this.act.t < this.act.show.focus ? this.act.show : null,
          ),
          l = (this.cur ??= { ...c }),
          u = document.body.classList.contains(`reduce-motion`)
            ? 1
            : 1 - Math.exp(-9 * e);
        ((l.x += (c.x - l.x) * u),
          (l.y += (c.y - l.y) * u),
          (l.dist += (c.dist - l.dist) * u));
        let d = l.dist,
          f = this.spot.y;
        (n.position.set(
          this.spot.x + Math.sin(r) * d,
          f + 1.4,
          this.spot.z + Math.cos(r) * d,
        ),
          n.lookAt(this.spot.x, f + 0.7, this.spot.z),
          n.updateMatrixWorld());
        let p = d * Math.tan((n.fov * Math.PI) / 360);
        (lo.setFromMatrixColumn(n.matrixWorld, 0),
          uo.setFromMatrixColumn(n.matrixWorld, 1),
          fo
            .set(this.spot.x, f + 0.7, this.spot.z)
            .addScaledVector(lo, -l.x * p * n.aspect)
            .addScaledVector(uo, -l.y * p),
          n.lookAt(fo));
      } else {
        let e = this.t * 0.05;
        (n.position.set(Math.sin(e) * 34, 15, Math.cos(e) * 34),
          n.lookAt(0, 1, 0));
      }
      (this.stage.followShadow(this.spot),
        this.park?.update(e, n.position, this.stage.tier.drawDist),
        this.stage.render());
    }
    playAct(e, t, n) {
      let r = this.view;
      if (r.ready !== !1) {
        let t = e.t;
        e.t += n;
        let i = e.show.poseAt ?? 0;
        e.show.pose && t < i && e.t >= i && r.playEmote?.(e.show.pose);
      }
      let i = Eo,
        a = this.a;
      ((i.nx = Math.sin(t.yaw)),
        (i.nz = Math.cos(t.yaw)),
        (i.lx = -Math.cos(a)),
        (i.lz = Math.sin(a)),
        (i.upright = this.stage.camera.aspect < 1),
        e.show.move?.(Math.max(0, e.t), t, i));
    }
    effects(e) {
      let { p: t, skins: n } = this.fx,
        r = this.act,
        i = this.stage.camera.position;
      if (
        ((n.upright = this.stage.camera.aspect < 1),
        n.update(e, i),
        r && r.t >= 0)
      ) {
        n.ride(To, r.look, this.frame, e, i.x, i.z);
        let t = r.show.at,
          a = r.t - e;
        (t !== void 0 && a < t && r.t >= t && n.perform(To),
          a < r.show.focus && r.t >= r.show.focus && n.settle(0.35));
      }
      (n.sweep(),
        t.update(e),
        r &&
          r.t >= r.show.s &&
          ((this.spun += r.show.spin ?? 0), (this.act = null)));
    }
    dispose() {
      ((this.dead = !0),
        this.bestSeq++,
        this.tv?.dispose(),
        (this.tv = null),
        this.unwatch());
      for (let e of this.friends.values()) e.view.dispose();
      (this.friends.clear(),
        this.view?.dispose(),
        this.fx?.p.dispose(),
        this.fx?.skins.dispose(),
        this.park?.dispose(),
        this.group.removeFromParent());
    }
  },
  ko = [`skaters`, `career`, `home`, `missions`, `parks`, `ranks`];
