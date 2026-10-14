// assets/session-DxCN6jDh 12 — stage
// Lines 3769-4029 of readable/assets/session-DxCN6jDh.pretty.js (statement-aligned).
function Ca(e, t, n, r = !0, i, a) {
  let o = e.frame,
    s = e.sk;
  ((o.x = t.value(s, `x`)),
    (o.y = t.value(s, `y`)),
    (o.z = t.value(s, `z`)),
    (o.yaw = t.value(s, `yaw`)),
    (o.ux = t.value(s, `ux`)),
    (o.uy = t.value(s, `uy`)),
    (o.uz = t.value(s, `uz`)));
  let c = Math.hypot(o.ux, o.uy, o.uz) || 1;
  ((o.ux /= c), (o.uy /= c), (o.uz /= c));
  let l = t.value(s, `simTick`);
  (Oa(o, e.anim.at(l), l, !1),
    (e.lag += n),
    xa.center.set(o.x, o.y, o.z),
    (xa.radius = va),
    (!a || a.intersectsSphere(xa) || ++e.skips >= _a) &&
      (e.view.animate(o, e.lag), (e.lag = 0), (e.skips = 0)),
    (e.view.root.visible = r),
    e.view.setGhost(i ?? (s.away ? 0.4 : 1)),
    ha(e.ring, e.view, o.mode));
}
function wa(e) {
  (e.anim.dispose(), e.view.dispose(), e.ring.removeFromParent());
}
var Ta = new p(),
  Ea = { x: 0, y: 0, z: 0 },
  Da = class {
    stage;
    net;
    park = null;
    fence = null;
    riddles = null;
    local;
    localView;
    remotes = new Map();
    cam = new In();
    hud;
    localFrame = qt();
    selfSid;
    selfLook;
    opts;
    disposers = [];
    placeholderPark = null;
    lastFade = 1;
    touch = { world: null, each: (e) => this.eachRider(e) };
    localRing;
    lastTarget = ``;
    holdUntil = 0;
    onFrame = () => {};
    camOverride = null;
    onRemoteAdd = () => {};
    onRemoteMode = () => {};
    onRemoteRemove = () => {};
    constructor(e, t, n, r = {}) {
      ((this.stage = e), (this.net = t), (this.opts = r));
      let i = t.room;
      this.selfSid = i.sessionId;
      let a = i.state.skaters.get(i.sessionId);
      ((this.local = new $i(i, t.predict, a, t.world, r.canSkate)),
        (this.local.onWarp = () => this.cut()),
        (this.localView = Yt(An(a.skater, a.look))),
        (this.localView.col = t.world.col),
        (this.selfLook = a.look),
        (this.localRing = ma(a.color, !0)),
        e.scene.add(this.localView.root, this.localRing));
      let o = t.callbacks;
      (this.disposers.push(
        o.onAdd(`skaters`, (n, r) => {
          if (r === i.sessionId || this.remotes.has(r)) return;
          let a = ga(r, n, t.world.col);
          (e.scene.add(a.view.root, a.ring),
            this.remotes.set(r, a),
            this.onRemoteAdd(r, n));
        }),
      ),
        this.disposers.push(
          o.onRemove(`skaters`, (e, t) => {
            let n = this.remotes.get(t);
            n && (wa(n), this.remotes.delete(t), this.onRemoteRemove(t));
          }),
        ),
        (this.hud = new na(n, t.world.layout)),
        (this.cam.col = t.world.col),
        vt &&
          ((this.cam.tune = { ...gt.cam.tune }),
          (this.cam.baseFov = gt.cam.fov)));
    }
    async loadPark(e) {
      ((this.park = await ia(this.net.world.layout, { day: Nn(on()), ...e })),
        this.stage.scene.add(this.park.group),
        this.stage.setLook(yt(this.net.world.layout.id)),
        (this.fence = fa(this.net.world)),
        this.fence && this.stage.scene.add(this.fence),
        (this.riddles = new ua(
          this.net.world.layout.id,
          this.stage.tier.liteScenery,
        )),
        this.riddles.seat(this.park.group),
        this.stage.scene.add(this.riddles.group),
        this.stage.precompile());
    }
    setWorld(e) {
      ((this.net.world = e),
        this.local.setWorld(e),
        (this.localView.col = e.col));
      for (let t of this.remotes.values()) t.view.col = e.col;
      ((this.cam.col = e.col), this.hud.setLayout(e.layout));
    }
    cut() {
      this.cam.inited = !1;
      let e = document.getElementById(`ui`);
      e &&
        (e.classList.remove(`warp-flash`),
        e.offsetWidth,
        e.classList.add(`warp-flash`));
    }
    hitStop(e) {
      this.holdUntil = Math.max(this.holdUntil, performance.now() + e);
    }
    get holding() {
      return performance.now() < this.holdUntil;
    }
    get rails() {
      return this.net.world.rails;
    }
    frame(e, t) {
      Qt();
      let n = this.net.predict.tick(e);
      if ((n > 0 && this.local.step(n), this.holding)) {
        (this.onFrame(0, e), this.stage.render());
        return;
      }
      let r = this.local.state,
        i = this.localFrame;
      ((i.x = this.local.value(`x`)),
        (i.y = this.local.value(`y`)),
        (i.z = this.local.value(`z`)),
        (i.yaw = this.local.value(`yaw`)),
        (i.ux = this.local.value(`ux`)),
        (i.uy = this.local.value(`uy`)),
        (i.uz = this.local.value(`uz`)));
      let a = Math.hypot(i.ux, i.uy, i.uz) || 1;
      ((i.ux /= a),
        (i.uy /= a),
        (i.uz /= a),
        Oa(i, r, this.local.value(`simTick`), cn.isHeld(`grab`)),
        this.localView.animate(i, t),
        (this.localView.root.visible = !this.opts.hidden?.(this.selfSid)),
        ha(this.localRing, this.localView, i.mode));
      let o = this.net.predict,
        s = Sa(this.stage.camera);
      for (let e of this.remotes.values()) {
        Ca(e, o, t, !this.opts.hidden?.(e.sid), void 0, s);
        let n = e.frame.mode;
        n !== e.lastMode &&
          (e.lastMode >= 0 && this.onRemoteMode(e.sid, e.lastMode, n, e.frame),
          (e.lastMode = n));
      }
      let c = this.opts.camTarget?.() ?? this.selfSid,
        l = c === this.selfSid ? void 0 : this.remotes.get(c);
      if (
        (c !== this.lastTarget &&
          (this.lastTarget && this.cut(), (this.lastTarget = c)),
        (this.cam.lookBack = cn.isHeld(`look`)),
        (this.cam.orbit = this.opts.orbit?.() ?? 0),
        !this.camOverride?.(t))
      ) {
        if (l) {
          let e = l.anim.at(o.value(l.sk, `simTick`));
          (this.cam.update(this.stage.camera, l.frame, e.vx, e.vz, t),
            this.stage.followShadow(
              Ta.set(l.frame.x, l.frame.y, l.frame.z),
              8,
            ));
        } else {
          ((this.cam.ridePiece = r.lastPiece),
            this.cam.update(this.stage.camera, i, r.vx, r.vz, t),
            this.stage.followShadow(Ta.set(i.x, i.y, i.z), 8));
          let e = 1 - this.cam.closeness * 0.65;
          (Math.abs(e - this.lastFade) > 0.02 ||
            (e === 1 && this.lastFade !== 1)) &&
            (this.localView.setGhost(e), (this.lastFade = e));
        }
      }
      (this.hud.update(r, this.local.value(`bal`)),
        (this.touch.world = this.net.world),
        this.park?.update(
          t,
          this.stage.camera.position,
          this.stage.tier.drawDist,
          this.touch,
        ),
        this.riddles?.update(
          this.stage.camera.position,
          this.stage.tier.drawDist,
        ),
        this.onFrame(t, e),
        this.stage.render());
    }
    anchor(e, t) {
      if (e === this.selfSid)
        return this.localView.root.visible
          ? (this.localView.headAnchor(t), !0)
          : !1;
      let n = this.remotes.get(e);
      return !n || !n.view.root.visible ? !1 : (n.view.headAnchor(t), !0);
    }
    posOf(e) {
      return e === this.selfSid
        ? this.localFrame
        : (this.remotes.get(e)?.frame ?? null);
    }
    eachRider(e) {
      this.localView.root.visible &&
        e(this.selfSid, this.localFrame, this.selfLook);
      for (let t of this.remotes.values())
        t.view.root.visible && e(t.sid, t.frame, t.sk.look);
    }
    viewOf(e) {
      return e === this.selfSid
        ? this.localView
        : (this.remotes.get(e)?.view ?? null);
    }
    dispose() {
      for (let e of this.disposers) e();
      (this.local.dispose(), this.localView.dispose());
      for (let e of this.remotes.values()) wa(e);
      (this.localRing.removeFromParent(),
        this.remotes.clear(),
        this.park?.dispose(),
        this.riddles?.dispose(),
        this.fence &&
          (this.fence.removeFromParent(),
          this.fence.geometry.dispose(),
          this.fence.material.dispose()),
        this.stage.setLook(_t),
        this.placeholderPark?.removeFromParent(),
        this.hud.dispose(),
        this.net.predict.dispose());
    }
  };
function Oa(e, t, n, r) {
  ((e.mode = t.mode),
    (e.trickId = t.trickId),
    (e.trickT = Math.max(0, (n - t.trickTick) / 30)),
    (e.modeT = Math.max(0, (n - t.modeTick) / 30)),
    (e.crouch = t.crouch / 12),
    (e.bal = t.bal),
    (e.speed = Math.hypot(t.vx, t.vy, t.vz)),
    (e.vx = t.vx),
    (e.vy = t.vy),
    (e.vz = t.vz),
    M(t.yaw, t.ux, t.uy, t.uz, Ea),
    (e.fakie = t.vx * Ea.x + t.vy * Ea.y + t.vz * Ea.z < -0.5),
    (e.grabHeld = r || (D[t.trickId]?.kind === O.GRAB && t.trickEnd === 0)),
    (e.slide = t.mode === A.GROUND && (t.xfer & j.SLIDE) !== 0),
    (e.planted = t.mode === A.GROUND && !t.rolling && e.speed < 0.05),
    (e.spin = t.mode === A.AIR ? t.yaw - t.airYaw0 : 0));
}
