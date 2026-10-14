// assets/main-CzsUDvlE 42 — gizmos
// Lines 13517-15417 of readable/assets/main-CzsUDvlE.pretty.js (statement-aligned).
var Em = (e) => (e.min.x + e.max.x) / 2,
  Dm = (e) => (e.min.z + e.max.z) / 2,
  Om = (e) => ({
    x0: e.min.x,
    x1: e.max.x,
    y0: e.min.y,
    y1: e.max.y,
    z0: e.min.z,
    z1: e.max.z,
  }),
  km = new T(),
  Am = new T(),
  jm = 5,
  Mm = 350,
  Nm = 3e3,
  Pm = 100,
  Fm = 1.2,
  Im = 0.2,
  Lm = 0.35,
  $ = {
    a: 0,
    b: 1,
    x: 2,
    y: 3,
    lb: 4,
    rb: 5,
    lt: 6,
    rt: 7,
    view: 8,
    up: 12,
    down: 13,
    left: 14,
    right: 15,
  },
  Rm = (e) => ((Math.round(e / (Math.PI / 2)) % 4) + 4) % 4,
  zm = new T(0, 1, 0),
  Bm = { x: `↔`, y: `↕`, z: `⤢` },
  Vm = class {
    active = !1;
    d;
    gizmos;
    controls = null;
    hud = null;
    world;
    boxes = new Map();
    armed = null;
    spawning = null;
    selected = null;
    draft = null;
    settle = 0;
    sent = new Map();
    carry = null;
    sizing = null;
    down = null;
    hover = { x: 0, y: 0, z: 0 };
    aimAt = { x: 0, y: 0, z: 0 };
    lock = null;
    camY = 0;
    through = new Set();
    supports = null;
    ghost = null;
    joints = null;
    hovered = null;
    device = `mouse`;
    panel = null;
    padPrev = null;
    padAim = ``;
    wheel = 0;
    lastPt = { x: NaN, y: NaN };
    boxCache = new Map();
    gripSides = ``;
    pending = new Map();
    undos = [];
    idMap = new Map();
    seq = 0;
    held = new Set();
    ray = new v();
    ndc = new te();
    plane = new r(zm, 0);
    _p = new T();
    _v = new T();
    offs = [];
    constructor(e) {
      ((this.d = e),
        (this.world = e.session.net.world),
        (this.gizmos = new pm(e.stage.scene)),
        this.onWorld(this.world));
      let t = e.room;
      (this.offs.push(
        t.onMessage(`buildOk`, (e) => this.reply(e.reqId, e.id, null, e.ids)),
      ),
        this.offs.push(
          t.onMessage(`buildError`, (e) => this.reply(e.reqId, 0, e.reason)),
        ),
        window.addEventListener(`keydown`, this.onKey),
        window.addEventListener(`keyup`, this.onKeyUp),
        window.addEventListener(`blur`, this.onBlur));
    }
    toggle() {
      this.active ? this.exit() : this.enter();
    }
    enter() {
      if (this.active || !this.d.canBuild()) return;
      this.active = !0;
      let { stage: e, session: t, room: n } = this.d;
      (n.send(`build:mode`, { on: !0 }),
        z.hold(`build`),
        document.body.classList.add(`building`));
      let r = e.camera,
        i = t.localFrame;
      (this._v.set(i.x - r.position.x, 0, i.z - r.position.z),
        this._v.lengthSq() < 0.001 && this._v.set(0, 0, 1),
        this._v.normalize());
      let a = new T(i.x + this._v.x * 8, 0, i.z + this._v.z * 8);
      r.position.set(a.x - this._v.x * 16, 18, a.z - this._v.z * 16);
      let o = new ap(r, e.renderer.domElement);
      (o.target.copy(a),
        (o.enableDamping = !0),
        (o.dampingFactor = 0.12),
        (o.minDistance = 4),
        (o.maxDistance = 140),
        (o.maxPolarAngle = Math.PI * 0.46),
        (o.zoomToCursor = !0),
        o.update(),
        (this.controls = o),
        (t.camOverride = (e) => this.frame(e)));
      let s = e.renderer.domElement;
      (s.addEventListener(`pointerdown`, this.onDown, { capture: !0 }),
        s.addEventListener(`pointermove`, this.onMove),
        s.addEventListener(`pointerup`, this.onUp),
        s.addEventListener(`pointerleave`, this.onLeave),
        s.addEventListener(`wheel`, this.onWheel, { capture: !0, passive: !1 }),
        s.addEventListener(`contextmenu`, this.onContext),
        (this.hud = new wm(
          this.d.ui,
          {
            arm: (e) => this.arm(e),
            knob: (e, t, n) => this.knob(e, t, n),
            resizeStart: () => this.resizeStart(`mouse`, null),
            resize: (e, t, n) =>
              this.resizeBy(n ? { x: e, z: -t } : { x: e, y: -t }),
            resizeEnd: (e) => this.resizeEnd(e),
            skin: (e) => this.setSkin(e),
            rotate: (e) => this.rotate(e),
            duplicate: () => this.duplicate(),
            remove: () => this.remove(),
            cancel: () => this.cancel(),
            undo: () => this.undo(),
            spawn: () => this.startSpawn(),
            settings: () => this.openSettings(),
            done: () => this.exit(),
            level: () => this.cycleLevel(-1),
          },
          this.d.state.name,
        )),
        this.hud.setOwner(this.d.isOwner()),
        this.hud.setUndo(this.undos.length),
        (this.camY = 0),
        this.showLevel(),
        Ba()
          .then((e) => {
            (lm(e),
              this.active &&
                (this.boxCache.clear(),
                this.gizmos.clearGhost(),
                this.armed && this.updateGhost(),
                this.selected &&
                  (this.gizmos.select(this.selected), this.showSelected())));
          })
          .catch(() => {}),
        this.d.padOverlay(() => this.overlay()),
        (this.padPrev = null),
        this.setDevice(
          mu() ? `touch` : z.lastSource === `pad` ? `pad` : `mouse`,
        ),
        (this.gizmos.visible = !0),
        this.refreshJoints(),
        this.refreshHint());
    }
    exit(e = !0) {
      if (!this.active) return;
      let { stage: t, session: n, room: r } = this.d;
      (this.endCarry(!1),
        this.sizing && this.resizeEnd(!1),
        e ? this.flush() : this.dropDraft(),
        (this.active = !1));
      let i = this.controls?.target;
      (e &&
        i &&
        r.send(`build:mode`, {
          on: !1,
          x: i.x,
          z: i.z,
          y: this.levelAt(i.x, i.z),
        }),
        this.controls?.dispose(),
        (this.controls = null),
        (n.camOverride = null),
        (n.cam.inited = !1));
      let a = t.renderer.domElement;
      (a.removeEventListener(`pointerdown`, this.onDown, { capture: !0 }),
        a.removeEventListener(`pointermove`, this.onMove),
        a.removeEventListener(`pointerup`, this.onUp),
        a.removeEventListener(`pointerleave`, this.onLeave),
        a.removeEventListener(`wheel`, this.onWheel, { capture: !0 }),
        a.removeEventListener(`contextmenu`, this.onContext),
        (a.style.cursor = ``),
        this.d.padOverlay(null),
        (this.panel = null),
        z.release(`build`),
        z.clear(),
        this.held.clear(),
        document.body.classList.remove(`building`),
        (this.armed = null),
        (this.spawning = null),
        (this.lock = null),
        this.deselect(!1),
        this.setHovered(null),
        this.gizmos.clearGhost(),
        this.gizmos.setCursor(null),
        (this.gizmos.visible = !1),
        (this.joints = null),
        this.gizmos.setJoints(null),
        this.hud?.dispose(),
        (this.hud = null));
    }
    onWorld(e) {
      ((this.world = e),
        (this.boxes = up(e.col)),
        this.gizmos.setLayout(e.layout));
      let t = this.meta();
      t && !this.spawning && this.gizmos.setSpawn(t.spawn);
      for (let [t, n] of this.sent)
        (n.acked || !e.pieces.has(t)) && this.sent.delete(t);
      if (this.selected) {
        let t = e.pieces.get(this.selected.id);
        t
          ? ((this.selected = t),
            this.gizmos.select(t),
            this.showSelected(),
            !this.draft &&
              !this.carry &&
              !this.sizing &&
              this.inspectSelected())
          : this.deselect(!1);
      }
      (this.hovered && this.setHovered(e.pieces.get(this.hovered.id) ?? null),
        (this.padAim = ``),
        this.active && this.refreshJoints(),
        this.armed && this.updateGhost());
    }
    refreshJoints() {
      (this.hud?.setBudget(
        sp(this.world),
        this.world.layout.pieces.length - 1,
        op.pieces,
      ),
        (this.joints = Lp(this.world)),
        this.gizmos.setJoints(this.joints),
        (this.gizmos.ghostJointsKey = ``));
    }
    ghostJoints(e, t, n, r) {
      let i = this.ghost;
      if (!i) return;
      let a = `${i.key}|${e}|${t}|${n}|${r ? [...r].join(`,`) : ``}`;
      if (this.gizmos.ghostJointsKey === a) return;
      i.rails ??= le({
        id: `ghost`,
        name: ``,
        half: 100,
        pieces: [i.piece],
        spawns: [],
      });
      let o = i.rails.map((r) => ({
        ...r,
        ax: r.ax + e,
        ay: r.ay + t,
        az: r.az + n,
        bx: r.bx + e,
        by: r.by + t,
        bz: r.bz + n,
        piece: -1,
      }));
      this.gizmos.setGhostJoints(Lp(this.world, { extra: o, ignore: r }), a);
    }
    jointTags() {
      let e = [];
      for (let t of this.gizmos.ghostJoints?.near ?? [])
        e.push({
          x: t.at.x,
          y: t.at.y + 0.3,
          z: t.at.z,
          text: Kp(t, !0),
          own: !0,
        });
      let t = this.controls?.target ?? this.aimAt,
        n = [];
      for (let e of this.joints?.near ?? []) {
        let r = (e.at.x + e.other.x) / 2,
          i = Math.max(e.at.y, e.other.y) + 0.3,
          a = (e.at.z + e.other.z) / 2;
        n.push({
          x: r,
          y: i,
          z: a,
          text: Kp(e),
          d: (r - t.x) * (r - t.x) + (a - t.z) * (a - t.z),
        });
      }
      return (n.sort((e, t) => e.d - t.d), [...e, ...n]);
    }
    dispose() {
      this.exit(!1);
      for (let e of this.offs) e();
      (window.removeEventListener(`keydown`, this.onKey),
        window.removeEventListener(`keyup`, this.onKeyUp),
        window.removeEventListener(`blur`, this.onBlur),
        this.gizmos.dispose());
    }
    startSpawn() {
      if (!this.active) return;
      (this.endCarry(!1), this.armed && this.disarm(), this.deselect());
      let e = this.meta();
      ((this.spawning = e ? { ...e.spawn } : { x: 0, z: 0, yaw: 0 }),
        this.hud?.inspectSpawn(),
        this.device === `pad` && (this.padAim = ``),
        this.refreshHint());
    }
    openSettings() {
      let e = this.d.state,
        t = this.meta();
      this.d.isOwner() &&
        t &&
        Tm(
          this.d.ui,
          {
            name: e.name,
            size: t.size,
            floor: t.floor,
            openBuild: e.openBuild,
            published: e.published,
            code: e.code,
          },
          (e, t) => {
            let n = ++this.seq;
            ((e === `build:size` || e === `build:floor`) &&
              this.pending.set(n, { inverse: null, at: performance.now() }),
              this.d.room.send(e, { reqId: n, ...t }));
          },
          () => this.d.share(),
        );
    }
    frame(e) {
      let t = this.controls;
      if (!t) return !1;
      let n = this.d.stage.camera,
        r = this.pollPad(e),
        i = 0,
        a = 0,
        o = 0,
        s = 0;
      ((this.held.has(`w`) || this.held.has(`arrowup`)) && (a += 1),
        (this.held.has(`s`) || this.held.has(`arrowdown`)) && --a,
        (this.held.has(`d`) || this.held.has(`arrowright`)) && (i += 1),
        (this.held.has(`a`) || this.held.has(`arrowleft`)) && --i,
        this.held.has(`q`) && --o,
        this.held.has(`e`) && (o += 1));
      let c = this.camY;
      ((this.camY +=
        ((this.device === `pad` ? this.aimAt.y : (this.lock ?? 0)) -
          this.camY) *
        Math.min(1, e * 8)),
        this.camY !== c &&
          ((t.target.y += this.camY - c), (n.position.y += this.camY - c)));
      let l = 1;
      if (
        (r &&
          ((i += r.lx), (a -= r.ly), (o += r.rx), (s += r.ry), (l = r.fine)),
        i || a)
      ) {
        let r = this._v.subVectors(t.target, n.position).setY(0).normalize(),
          o = n.position.distanceTo(t.target) * 1.1 * e * l,
          s = -r.z,
          c = r.x,
          u = (r.x * a + s * i) * o,
          d = (r.z * a + c * i) * o;
        ((t.target.x += u),
          (t.target.z += d),
          (n.position.x += u),
          (n.position.z += d));
      }
      if (o) {
        let r = o * 1.6 * e * l,
          i = n.position.x - t.target.x,
          a = n.position.z - t.target.z;
        ((n.position.x = t.target.x + i * Math.cos(r) - a * Math.sin(r)),
          (n.position.z = t.target.z + i * Math.sin(r) + a * Math.cos(r)));
      }
      if (s) {
        let r = this._v.subVectors(n.position, t.target),
          i = r.length(),
          a = Math.min(
            t.maxDistance,
            Math.max(t.minDistance, i * Math.exp(s * 1.4 * e * l)),
          );
        n.position.copy(t.target).addScaledVector(r, a / i);
      }
      let u = this.world.layout.half + 10,
        d = Math.max(-u, Math.min(u, t.target.x)) - t.target.x,
        f = Math.max(-u, Math.min(u, t.target.z)) - t.target.z;
      return (
        (d || f) &&
          ((t.target.x += d),
          (t.target.z += f),
          (n.position.x += d),
          (n.position.z += f)),
        (t.target.y = this.camY),
        t.update(e),
        this.device === `pad` && this.padCursor(),
        this.selected && !this.carry && !this.sizing && this.followGrips(),
        this.d.stage.followShadow(t.target),
        this.gizmos.frame(n),
        this.hud?.joints(n, this.jointTags()),
        !0
      );
    }
    blocked() {
      return !!this.panel || z.holding(`padnav`) || this.menuUp();
    }
    menuUp() {
      return (
        z.holding(`nav`) ||
        z.holding(`chat`) ||
        !!this.d.ui.querySelector(`.modal-back`)
      );
    }
    pollPad(e) {
      let t = Jt();
      if (!t) return ((this.padPrev = null), null);
      let n = [];
      for (let e = 0; e < 16; e++)
        n[e] =
          e === $.lt || e === $.rt
            ? (t.buttons[e]?.value ?? 0) > 0.5
            : !!t.buttons[e]?.pressed;
      let r = this.padPrev ?? n;
      if (((this.padPrev = n), this.blocked()))
        return (this.sizing?.by === `pad` && this.resizeEnd(!1), null);
      let i = (e) => n[e] && !r[e],
        a = (e, t) => {
          let n = Math.hypot(e, t);
          if (n < Im) return [0, 0];
          let r = Math.min(1, (n - Im) / 0.8) / n;
          return [e * r, t * r];
        },
        [o, s] = a(t.axes[0] ?? 0, t.axes[1] ?? 0),
        [c, l] = a(t.axes[2] ?? 0, t.axes[3] ?? 0);
      if (
        (this.device !== `pad` &&
          (n.some((e, t) => e && !r[t]) || o || s || c || l) &&
          this.setDevice(`pad`),
        this.device !== `pad`)
      )
        return null;
      let u = n[$.lt] ? Lm : 1;
      if (
        (i($.rt) && this.resizeStart(`pad`, null), this.sizing?.by === `pad`)
      ) {
        if (i($.b)) this.resizeEnd(!1);
        else if (!n[$.rt]) this.resizeEnd(!0);
        else {
          let t = (240 / Fm) * e * u;
          (o || s || l) && this.resizeBy({ x: o * t, y: -s * t, z: -l * t });
        }
        return { lx: 0, ly: 0, rx: 0, ry: 0, fine: u };
      }
      return (
        i($.a) && this.padA(),
        i($.b) && this.padB(),
        i($.x) && this.remove(),
        (i($.y) || i($.left)) && this.setPanel(`palette`),
        i($.right) && this.padInspect(),
        i($.up) && this.duplicate(),
        i($.down) && this.cycleLevel(-1),
        i($.lb) && this.rotate(-1),
        i($.rb) && this.rotate(1),
        i($.view) && this.undo(),
        { lx: o, ly: s, rx: c, ry: l, fine: u }
      );
    }
    padA() {
      let e = this.controls?.target;
      if (!e) return;
      let t = this.levelAt(e.x, e.z);
      if (this.spawning) {
        this.placeSpawn(e.x, t, e.z);
        return;
      }
      if (this.carry) {
        this.drop();
        return;
      }
      if (this.armed) {
        (this.moveGhost(e.x, t, e.z), this.place());
        return;
      }
      let n = this.hovered;
      if (!n) {
        this.deselect();
        return;
      }
      (this.select(n), this.startCarry(`pad`));
    }
    padB() {
      this.carry ? this.endCarry(!1) : this.cancel();
    }
    padInspect() {
      (this.carry && this.drop(),
        !this.armed &&
          !this.selected &&
          this.hovered &&
          this.select(this.hovered),
        (this.armed || this.selected) && this.setPanel(`inspector`));
    }
    padCursor() {
      let e = this.controls.target,
        t = `${e.x.toFixed(2)},${e.z.toFixed(2)},${this.lock}`;
      if (t === this.padAim) return;
      this.padAim = t;
      let n = this.levelAt(e.x, e.z);
      if (
        ((this.aimAt = { x: e.x, y: n, z: e.z }),
        this.gizmos.setCursor(this.aimAt),
        this.showLevel(),
        this.carry)
      )
        this.carryTo(e.x, n, e.z);
      else if (this.spawning) this.moveSpawn(e.x, n, e.z);
      else if (this.armed) this.moveGhost(e.x, n, e.z);
      else {
        let t = this.d.stage.camera;
        (this.ray.ray.origin.copy(t.position),
          this.ray.ray.direction
            .copy(this._v.set(e.x, n, e.z))
            .sub(t.position)
            .normalize(),
          this.setHovered(this.pickPiece()));
      }
    }
    setDevice(e) {
      (e === this.device && this.hud) ||
        ((this.device = e),
        (this.gizmos.touch = e === `touch`),
        e === `pad`
          ? ((this.padAim = ``), this.gizmos.showGhostMesh(!0))
          : this.gizmos.setCursor(null),
        this.hud &&
          (this.hud.keys =
            e === `pad`
              ? { rotL: hi().lb, rotR: hi().rb, dup: `▲`, del: hi().x }
              : { rotL: `Q`, rotR: `E`, dup: `F`, del: `Del` }),
        this.refreshHint());
    }
    setPanel(e) {
      (e === `inspector` && !this.hud?.inspecting && (e = null),
        e !== this.panel &&
          (e && this.carry && this.drop(),
          e && this.sizing && this.resizeEnd(!1),
          (this.panel = e),
          this.hud?.setPanel(e),
          e || document.activeElement?.blur?.(),
          this.refreshHint()));
    }
    overlay() {
      let e = this.hud,
        t = this.panel;
      return !e || !t
        ? null
        : t === `inspector` && !e.inspecting
          ? ((this.panel = null), e.setPanel(null), null)
          : {
              roots: [e.palette, e.inspector],
              main: t === `palette` ? e.palette : e.inspector,
              focus: t === `palette` ? e.paletteFocus() : e.inspectorFocus(),
              back: () => this.setPanel(null),
              backLabel: `Park`,
              tabs:
                t === `palette`
                  ? { step: (t) => e.stepCat(t), label: `Pieces` }
                  : null,
            };
    }
    aim(e) {
      let t = this.d.stage.renderer.domElement.getBoundingClientRect();
      (this.ndc.set(
        ((e.clientX - t.left) / t.width) * 2 - 1,
        -((e.clientY - t.top) / t.height) * 2 + 1,
      ),
        this.ray.setFromCamera(this.ndc, this.d.stage.camera));
    }
    levels(e, t) {
      return Ep(
        this.world,
        e,
        t,
        this.through.size ? (e) => this.through.has(e) : void 0,
      ).map((e) => e.y);
    }
    levelAt(e, t, n = 1 / 0) {
      let r = Math.min(this.lock ?? 1 / 0, n);
      return this.levels(e, t).find((e) => e <= r + 0.01) ?? 0;
    }
    firstHit(e) {
      let t = this.ray.ray,
        n = t.direction,
        r = null,
        i = 1 / 0;
      for (let a of this.world.col.bvh.raycast(t, 2, 0, 600)) {
        if (!a.face || a.distance >= i) continue;
        let t = a.face.normal;
        if (t.x * n.x + t.y * n.y + t.z * n.z >= 0) continue;
        let o = this.world.col.pieces[a.face.a];
        this.through.has(o) ||
          e?.(o) ||
          ((i = a.distance),
          (r = { x: a.point.x, y: a.point.y, z: a.point.z, piece: o }));
      }
      return r;
    }
    pointerAim() {
      if (this.lock !== null) {
        let e = this.ray.ray.intersectPlane(
          this.plane.set(zm, -this.lock),
          this._p,
        );
        return e ? { x: e.x, y: this.levelAt(e.x, e.z), z: e.z } : null;
      }
      let e = this.firstHit();
      if (e) return { x: e.x, y: this.levelAt(e.x, e.z, e.y + 0.05), z: e.z };
      let t = this.ray.ray.intersectPlane(this.plane.set(zm, 0), this._p);
      return t ? { x: t.x, y: this.levelAt(t.x, t.z, 0.05), z: t.z } : null;
    }
    roofs() {
      let e = new Set();
      if (this.lock === null) return e;
      let t = this.ray.ray.intersectPlane(
        this.plane.set(zm, -this.lock),
        this._p,
      );
      if (t)
        for (let n of Ep(this.world, t.x, t.z))
          n.y > this.lock + 0.05 && e.add(n.piece);
      return e;
    }
    pickPiece() {
      let e = this.roofs(),
        t = this.firstHit((t) => e.has(t));
      if (t) {
        let e = this.world.pieces.get(t.piece);
        if (e && e.kind !== `floor`) return e;
      }
      let n = null,
        r = 0.2025;
      for (let t of this.world.rails.segs) {
        if (e.has(t.piece)) continue;
        let i = this.ray.ray.distanceSqToSegment(
          km.set(t.ax, t.ay, t.az),
          Am.set(t.bx, t.by, t.bz),
        );
        if (i >= r) continue;
        let a = this.world.pieces.get(t.piece);
        a && a.kind !== `floor` && ((r = i), (n = a));
      }
      return n;
    }
    setHovered(e) {
      let t = e && e.id !== this.selected?.id ? e : null,
        n = (this.hovered?.id ?? -1) !== (e?.id ?? -1);
      ((this.hovered = e), this.gizmos.hover(t), n && this.refreshHint());
    }
    moved(e) {
      let t = Number.isNaN(this.lastPt.x),
        n =
          !t &&
          Math.abs(e.clientX - this.lastPt.x) +
            Math.abs(e.clientY - this.lastPt.y) >
            3;
      return ((n || t) && (this.lastPt = { x: e.clientX, y: e.clientY }), n);
    }
    onDown = (e) => {
      if (
        !this.active ||
        this.sizing ||
        (this.setDevice(e.pointerType === `touch` ? `touch` : `mouse`),
        (this.lastPt = { x: e.clientX, y: e.clientY }),
        (this.down = { x: e.clientX, y: e.clientY, button: e.button }),
        e.button !== 0 || this.armed || this.spawning || this.held.has(` `))
      )
        return;
      this.aim(e);
      let t = this.gizmos.hitGrip(this.ray.ray);
      if (t && this.resizeStart(`mouse`, t)) {
        this.down = null;
        let n = this.d.stage.renderer.domElement;
        (this.controls && (this.controls.enabled = !1),
          bm(
            n,
            e,
            (e, n) => this.gripDrag(t, e, n),
            (e) => {
              (this.controls && (this.controls.enabled = !0),
                this.resizeEnd(e));
            },
          ));
        return;
      }
      let n = this.pickPiece();
      !n ||
        (e.pointerType === `touch` && n.id !== this.selected?.id) ||
        (this.select(n),
        this.startCarry(`mouse`),
        this.carry &&
          this.d.stage.renderer.domElement.setPointerCapture(e.pointerId));
    };
    onMove = (e) => {
      if (
        !this.active ||
        this.sizing ||
        (this.moved(e) &&
          this.setDevice(e.pointerType === `touch` ? `touch` : `mouse`),
        this.device === `pad`)
      )
        return;
      if (
        (this.aim(e),
        this.gizmos.showGhostMesh(!0),
        this.carry && e.buttons & 2)
      ) {
        this.endCarry(!1);
        return;
      }
      if (this.carry || this.spawning || this.armed) {
        this.aimPointer();
        return;
      }
      let t = this.d.stage.renderer.domElement,
        n = e.buttons ? null : this.gizmos.hitGrip(this.ray.ray);
      if ((this.hotGrip(n), e.buttons)) return;
      let r = n ? null : this.pickPiece();
      (this.setHovered(r), (t.style.cursor = n ? `grab` : r ? `move` : ``));
    };
    aimPointer() {
      let e = this.pointerAim();
      e &&
        ((this.aimAt = e),
        this.showLevel(),
        this.carry
          ? this.carryTo(e.x, e.y, e.z)
          : this.spawning
            ? this.moveSpawn(e.x, e.y, e.z)
            : this.armed && this.moveGhost(e.x, e.y, e.z));
    }
    cycleLevel(e) {
      let t = this.aimAt,
        n = this.levels(t.x, t.z);
      n.length || n.push(0);
      let r = this.lock ?? n[0],
        i =
          e < 0
            ? n.find((e) => e < r - 0.01)
            : [...n].reverse().find((e) => e > r + 0.01);
      ((this.lock = i === void 0 || i >= n[0] - 0.01 ? null : i),
        (this.padAim = ``),
        this.device !== `pad` &&
          (this.aimPointer(),
          !this.carry &&
            !this.armed &&
            !this.spawning &&
            this.setHovered(this.pickPiece())),
        this.showLevel(),
        this.refreshHint());
    }
    showLevel() {
      let e = this.aimAt.y,
        t = e > 0.05 ? `${Number(e.toFixed(2))} m` : `Ground`;
      this.hud?.setLevel(
        this.lock === null ? t : `Under · ${t}`,
        this.lock !== null,
      );
    }
    moveSpawn(e, t, n) {
      let r = this.spawning;
      r && ((r.x = Ti(e)), (r.z = Ti(n)), (r.y = t), this.gizmos.setSpawn(r));
    }
    onUp = (e) => {
      if (!this.active || this.sizing) return;
      let t =
        !!this.down &&
        this.down.button === e.button &&
        Math.hypot(e.clientX - this.down.x, e.clientY - this.down.y) < jm;
      if (((this.down = null), e.button === 2)) {
        t && this.cancel();
        return;
      }
      if (e.button !== 0) return;
      if (this.carry?.by === `mouse`) {
        this.drop();
        return;
      }
      if (!t) return;
      this.aim(e);
      let n = this.pointerAim();
      if (this.spawning) {
        n && this.placeSpawn(n.x, n.y, n.z);
        return;
      }
      if (this.armed) {
        if (!n) return;
        (this.moveGhost(n.x, n.y, n.z), this.place());
        return;
      }
      let r = this.pickPiece();
      r ? this.select(r) : this.deselect();
    };
    onLeave = () => {
      this.device !== `pad` &&
        (this.gizmos.showGhostMesh(!1),
        this.setHovered(null),
        this.hotGrip(null));
    };
    onWheel = (e) => {
      if (this.carry)
        for (
          e.preventDefault(),
            e.stopImmediatePropagation(),
            this.wheel += e.deltaY;
          Math.abs(this.wheel) >= Pm;
        ) {
          let e = this.wheel > 0 ? 1 : -1;
          ((this.wheel -= e * Pm), this.rotate(e));
        }
    };
    onContext = (e) => {
      e.preventDefault();
    };
    arm(e, t) {
      (this.deselect(),
        (this.spawning = null),
        (this.armed = {
          pre: e,
          r8: t?.r8 ?? 0,
          kn: { ...(t?.kn ?? e.kn) },
          skin: t?.skin ?? e.skin,
        }),
        this.hud?.setArmed(e.id),
        this.hud?.inspect({
          preset: e,
          kn: this.armed.kn,
          skin: this.armed.skin,
          placed: !1,
        }),
        this.panel
          ? this.setPanel(null)
          : this.device !== `pad` && document.activeElement?.blur?.(),
        this.updateGhost());
      let n = this.controls?.target;
      (n && this.moveGhost(n.x, this.levelAt(n.x, n.z), n.z),
        (this.padAim = ``),
        this.refreshHint());
    }
    disarm() {
      ((this.armed = null),
        this.hud?.setArmed(null),
        this.hud?.inspect(null),
        this.gizmos.clearGhost(),
        this.panel === `inspector` && this.setPanel(null));
    }
    place() {
      let e = this.armed;
      if (!e || !this.gizmos.hasGhost) return;
      let t = {
        pre: e.pre.id,
        x: this.hover.x,
        z: this.hover.z,
        r8: e.r8,
        kn: { ...e.kn },
        skin: e.skin,
      };
      (this.hover.y && (t.y = this.hover.y),
        this.send({ type: `build:add`, req: t }));
    }
    placeSpawn(e, t, n) {
      let r = this.spawning;
      r &&
        (this.send({
          type: `build:spawn`,
          x: Ti(e),
          z: Ti(n),
          yaw: Rm(r.yaw),
          ...(t ? { y: t } : {}),
        }),
        (this.spawning = null),
        this.hud?.inspect(null),
        this.refreshHint());
    }
    ghostKey(e) {
      return JSON.stringify([e.pre, e.r8, e.kn, e.skin]);
    }
    updateGhost() {
      let e = this.armed;
      e &&
        (this.showGhost({
          pre: e.pre.id,
          x: 0,
          z: 0,
          r8: e.r8,
          kn: e.kn,
          skin: e.skin,
        }),
        this.moveGhost(this.aimAt.x, this.aimAt.y, this.aimAt.z));
    }
    showGhost(e) {
      let t = this.ghostKey(e),
        n = Ni(e);
      if ((this.gizmos.showGhost(n, t), !n || !this.gizmos.hasGhost)) {
        this.ghost = null;
        return;
      }
      this.ghost?.key !== t &&
        (this.ghost = { piece: n, key: t, req: e, solids: null });
    }
    fits(e, t, n, r, i = !1) {
      let a = this.ghost,
        o = this.gizmos.ghostBounds;
      if (!a) return !1;
      if (!a.solids)
        try {
          a.solids = Dp(a.piece, Om(o));
        } catch {
          return !1;
        }
      let s = a.solids.map((r) => ({
        x0: r.x0 + e,
        x1: r.x1 + e,
        y0: r.y0 + t,
        y1: r.y1 + t,
        z0: r.z0 + n,
        z1: r.z1 + n,
      }));
      if (i)
        return (
          vp(this.world, e + Em(o), n + Dm(o)).some(
            (e) =>
              e.ny < -0.9999 && Math.abs(e.y - t) < 0.05 && !r?.has(e.piece),
          ) && jp(this.world, this.boxes, s, { ignore: r })
        );
      let c = this.gizmos.ghostBasePoints.map((t, r) => t + (r % 2 ? n : e));
      return jp(this.world, this.boxes, s, {
        ignore: r,
        base: { pts: c, y: t + o.min.y },
      });
    }
    ceilingAt(e, t, n) {
      let r = null;
      for (let i of vp(this.world, e, t))
        i.ny > -0.9999 ||
          i.y <= n + 0.5 ||
          this.through.has(i.piece) ||
          ((r === null || i.y < r) && (r = i.y));
      return r;
    }
    placeLevel(e, t, n, r) {
      return e
        ? Mi(e)
          ? 0
          : zi(e)
            ? Oi(this.ceilingAt(t, r, n) ?? n + 4)
            : n
        : n;
    }
    roofed(e, t, n) {
      return (this.levels(e, n)[0] ?? 0) > t + 0.05;
    }
    moveGhost(e, t, n) {
      this.aimAt = { x: e, y: t, z: n };
      let r = this.placeLevel(this.armed?.pre, e, t, n),
        i = this.gizmos.ghostBounds,
        a = { x: e - Em(i), z: n - Dm(i) },
        { x: o, z: s } = this.ghost
          ? Vi({ ...this.ghost.req, ...a })
          : { x: Ti(a.x), z: Ti(a.z) };
      (this.gizmos.placeGhost(
        o,
        r,
        s,
        this.fits(o, r, s, void 0, !!this.armed && zi(this.armed.pre)),
      ),
        this.gizmos.ghostXray(this.roofed(e, r, n)),
        this.ghostJoints(o, r, s),
        (this.hover = { x: o, y: r, z: s }));
    }
    base() {
      let e = this.selected;
      return e ? (this.draft ?? this.sent.get(e.id)?.req ?? Ci(e)) : null;
    }
    committed(e) {
      let t = this.sent.get(e)?.req;
      if (t) return t;
      let n = this.world.pieces.get(e);
      return n ? Ci(n) : null;
    }
    select(e) {
      (this.selected && this.selected.id !== e.id && this.flush(),
        this.armed && this.disarm());
      let t = this.selected?.id === e.id;
      ((this.selected = e),
        t || (this.draft = null),
        this.gizmos.select(e),
        this.setHovered(this.hovered),
        this.showSelected(),
        this.inspectSelected(),
        this.refreshHint());
    }
    inspectSelected() {
      let e = this.selected,
        t = this.base(),
        n = e && Ai(e.pre);
      e &&
        n &&
        t &&
        this.hud?.inspect({
          preset: n,
          kn: t.kn ?? e.kn,
          skin: t.skin ?? e.skin ?? n.skin,
          placed: !0,
        });
    }
    deselect(e = !0) {
      (this.endCarry(!1),
        this.sizing && !this.armed && this.resizeEnd(!1),
        e ? this.flush() : this.dropDraft(),
        (this.selected = null),
        (this.draft = null),
        this.gizmos.select(null),
        this.gizmos.setGrips(null),
        (this.gripSides = ``),
        this.armed ||
          (this.gizmos.clearGhost(),
          this.hud?.inspect(null),
          this.panel === `inspector` && this.setPanel(null)),
        this.setHovered(this.hovered),
        this.refreshHint());
    }
    showSelected() {
      let e = this.selected,
        t = this.base();
      e &&
        t &&
        (this.carry || JSON.stringify(Fi(t, e.id)) !== JSON.stringify(e)
          ? this.previewSelected(t)
          : this.gizmos.clearGhost(),
        this.updateGrips(t));
    }
    previewSelected(e) {
      let t = this.selected;
      if (!t) return;
      this.showGhost(e);
      let n = Ai(e.pre),
        r = n && Mi(n) ? 0 : (e.y ?? 0),
        i = new Set([t.id, ...this.ridersOf(t.id)]);
      (this.gizmos.placeGhost(
        e.x,
        r,
        e.z,
        this.fits(e.x, r, e.z, i, !!n && zi(n)),
      ),
        this.ghostJoints(e.x, r, e.z, i));
      let a = this.gizmos.ghostBounds;
      this.gizmos.ghostXray(this.roofed(e.x + Em(a), r, e.z + Dm(a)));
      let o = this.committed(t.id),
        s = o ? this.ridersFor(o, e, t.id) : [];
      this.gizmos.setRiders(s.map((e) => Fi(e.req, e.id)).filter((e) => !!e));
    }
    ridersOf(e) {
      return (
        this.supports?.world !== this.world &&
          (this.supports = { world: this.world, on: Sp(this.world) }),
        Cp(this.supports.on, e)
      );
    }
    ridersFor(e, t, n) {
      let r = this.localBox(e),
        i = this.localBox(t);
      if (!r || !i) return [];
      let a = e.x + Em(r),
        o = e.z + Dm(r),
        s = t.x + Em(i),
        c = t.z + Dm(i),
        l = (((t.r8 - e.r8) % 8) + 8) % 8,
        u = Bi(l),
        d = Math.cos(u),
        f = Math.sin(u),
        p = (t.y ?? 0) - (e.y ?? 0) + (i.max.y - r.max.y),
        m = [];
      for (let e of this.ridersOf(n)) {
        let t = this.committed(e),
          n = t && this.localBox(t);
        if (!t || !n) continue;
        let r = t.x + Em(n) - a,
          i = t.z + Dm(n) - o,
          u = (t.r8 + l) % 8,
          h = this.localBox({ ...t, r8: u });
        if (!h) continue;
        let g = s + r * d + i * f,
          _ = c - r * f + i * d,
          v = Vi({ ...t, r8: u, x: g - Em(h), z: _ - Dm(h) }),
          y = Oi((t.y ?? 0) + p);
        (y ? (v.y = y) : delete v.y,
          JSON.stringify(Fi(v, e)) !== JSON.stringify(Fi(t, e)) &&
            m.push({ id: e, req: v }));
      }
      return m;
    }
    flush() {
      this.settle &&= (clearTimeout(this.settle), 0);
      let e = this.selected,
        t = this.draft;
      if (!e || !t || this.carry) return;
      this.draft = null;
      let n = this.committed(e.id);
      if (n && JSON.stringify(Fi(t, e.id)) === JSON.stringify(Fi(n, e.id))) {
        (this.showSelected(), this.hud?.setValues(n.kn ?? e.kn));
        return;
      }
      let r = n ? this.ridersFor(n, t, e.id) : [];
      (r.length
        ? this.send({
            type: `build:batch`,
            ops: [
              { op: `set`, id: e.id, req: t },
              ...r.map((e) => ({ op: `set`, id: e.id, req: e.req })),
            ],
          })
        : this.send({ type: `build:set`, id: e.id, req: t }),
        this.showSelected());
    }
    schedule(e) {
      ((this.draft = e),
        this.showSelected(),
        this.settle && clearTimeout(this.settle),
        (this.settle = window.setTimeout(() => {
          ((this.settle = 0), this.flush());
        }, Mm)));
    }
    dropDraft() {
      ((this.settle &&= (clearTimeout(this.settle), 0)),
        this.draft &&
          ((this.draft = null), this.showSelected(), this.inspectSelected()));
    }
    startCarry(e) {
      this.flush();
      let t = this.selected,
        n = this.base(),
        r = n && this.localBox(n);
      if (!t || !n || !r) return;
      this.through.clear();
      for (let e of [t.id, ...this.ridersOf(t.id)]) this.through.add(e);
      let i = this.controls?.target,
        a =
          e === `mouse`
            ? this.pointerAim()
            : i
              ? { x: i.x, y: this.levelAt(i.x, i.z), z: i.z }
              : null;
      if (!a) {
        this.through.clear();
        return;
      }
      ((this.carry = {
        offX: n.x + Em(r) - a.x,
        offZ: n.z + Dm(r) - a.z,
        by: e,
      }),
        (this.draft = n),
        (this.aimAt = a),
        this.controls && e === `mouse` && (this.controls.enabled = !1),
        this.gizmos.setGrips(null),
        this.setHovered(null),
        this.refreshHint());
    }
    carryTo(e, t, n) {
      let r = this.carry,
        i = this.draft ?? this.base(),
        a = i && this.localBox(i);
      if (!r || !i || !a) return;
      this.aimAt = { x: e, y: t, z: n };
      let o = Vi({ ...i, x: e + r.offX - Em(a), z: n + r.offZ - Dm(a) }),
        s = this.placeLevel(Ai(i.pre), e, t, n);
      (s ? (o.y = s) : delete o.y, (this.draft = o), this.previewSelected(o));
    }
    drop() {
      this.carry &&
        ((this.carry = null),
        this.controls && (this.controls.enabled = !0),
        this.flush(),
        this.through.clear(),
        this.refreshHint());
    }
    endCarry(e) {
      if (this.carry) {
        if (e) {
          this.drop();
          return;
        }
        ((this.carry = null),
          this.through.clear(),
          this.controls && (this.controls.enabled = !0),
          (this.draft = null),
          (this.settle &&= (clearTimeout(this.settle), 0)),
          this.showSelected(),
          this.inspectSelected(),
          this.refreshHint());
      }
    }
    knob(e, t, n) {
      let r = this.target();
      r && this.applyKn({ ...r.kn, [e]: t }, n ? `settle` : `preview`);
    }
    target() {
      if (this.armed) return { pre: this.armed.pre, kn: this.armed.kn };
      let e = this.selected,
        t = e && Ai(e.pre),
        n = this.base();
      return e && t ? { pre: t, kn: n?.kn ?? e.kn } : null;
    }
    applyKn(e, t) {
      if ((this.hud?.setValues(e), this.armed)) {
        ((this.armed.kn = e), this.updateGhost());
        return;
      }
      let n = this.base();
      if (!n) return;
      if (this.carry) {
        ((this.draft = { ...n, kn: e }),
          this.carryTo(this.aimAt.x, this.aimAt.y, this.aimAt.z));
        return;
      }
      let r = this.keepCentre(n, { ...n, kn: e });
      t === `settle`
        ? this.schedule(r)
        : t === `now`
          ? ((this.draft = r), this.flush())
          : ((this.draft = r), this.showSelected());
    }
    resizeStart(e, t) {
      let n = this.target();
      return !n || this.sizing
        ? !1
        : ((this.sizing = {
            base: { ...n.kn },
            before: this.draft,
            x: 0,
            y: 0,
            z: 0,
            by: e,
            grip: t,
          }),
          this.hotGrip(t),
          this.refreshHint(),
          !0);
    }
    resizeBy(e) {
      let t = this.sizing,
        n = this.target();
      if (!t || !n) return;
      ((t.x += e.x ?? 0), (t.y += e.y ?? 0), (t.z += e.z ?? 0));
      let r = Pi(n.pre),
        i = Di(n.pre),
        a = Ei(n.pre),
        o = { ...t.base },
        s = [];
      for (let e of [`x`, `y`, `z`])
        r[e].forEach((n, r) => {
          let c = i.find((e) => e.key === n);
          c &&
            ((o[n] = Li(
              c,
              t.base[n] + (t[e] * (c.max - c.min)) / 240,
              t.base[n],
            )),
            r === 0 &&
              (!t.grip || t.grip === e) &&
              s.push(`${Bm[e]} ${a[e].label ?? c.label} ${o[n]}`));
        });
      (this.hud?.readout(s.join(`   `), t.grip ? sm[t.grip] : void 0),
        this.applyKn(o, `preview`));
    }
    resizeEnd(e) {
      let t = this.sizing;
      ((this.sizing = null),
        this.hud?.readout(null),
        this.hotGrip(null),
        this.refreshHint());
      let n = this.target();
      if (t && n) {
        if (e) {
          !this.armed && !this.carry && this.applyKn(n.kn, `now`);
          return;
        }
        if (this.armed || this.carry) {
          this.applyKn(t.base, `preview`);
          return;
        }
        ((this.draft = t.before),
          this.hud?.setValues(t.base),
          this.showSelected());
      }
    }
    gripDrag(e, t, n) {
      let r = this.gizmos.gripPose(e);
      if (!r) return;
      let i = this.d.stage.camera,
        a = this.d.stage.renderer.domElement,
        o = this._v.copy(r.at).project(i),
        s = o.x,
        c = o.y,
        l = this._p.copy(r.at).add(r.dir).project(i),
        u = ((l.x - s) * a.clientWidth) / 2,
        d = (-(l.y - c) * a.clientHeight) / 2,
        f = Math.hypot(u, d);
      (f < 20 ? ((u = 0), (d = -1)) : ((u /= f), (d /= f)),
        this.resizeBy({ [e]: t * u + n * d }));
    }
    hotGrip(e) {
      if ((this.gizmos.setHotGrip(e), this.sizing)) return;
      let t = this.target();
      if (!e || !t) {
        this.hud?.readout(null);
        return;
      }
      let n = Pi(t.pre)[e][0],
        r = Di(t.pre).find((e) => e.key === n);
      r &&
        this.hud?.readout(
          `${Bm[e]} ${Ei(t.pre)[e].label ?? r.label} ${t.kn[n]}`,
          sm[e],
        );
    }
    updateGrips(e) {
      let t = Ai(e.pre),
        n = t && this.localBox({ ...e, r8: 0 });
      if (!t || !n || this.carry || this.armed || this.spawning) {
        (this.gizmos.setGrips(null), (this.gripSides = ``));
        return;
      }
      let r = Bi(e.r8),
        i = Math.cos(r),
        a = Math.sin(r),
        o = e.y ?? 0,
        s = (t, n, r) => new T(e.x + t * i + r * a, o + n, e.z - t * a + r * i),
        c = (n.min.x + n.max.x) / 2,
        l = (n.min.z + n.max.z) / 2,
        u = Math.max(n.max.y, 0),
        d = Math.min(1, Math.max(0.3, u / 2)),
        [f, p] = this.facing(e, n);
      this.gripSides = `${e.x},${e.z},${e.r8},${f},${p}`;
      let m = Pi(t),
        h = Ei(t),
        g = [];
      for (let e of [`x`, `y`, `z`]) {
        if (!m[e].length) continue;
        let t = h[e];
        if (t.dir === `x`)
          g.push({
            axis: e,
            at: s(f > 0 ? n.max.x + 0.15 : n.min.x - 0.15, d, l),
            dir: new T(i * f, 0, -a * f),
          });
        else if (t.dir === `z`)
          g.push({
            axis: e,
            at: s(c, d, p > 0 ? n.max.z + 0.15 : n.min.z - 0.15),
            dir: new T(a * p, 0, i * p),
          });
        else if (t.dir === `down`)
          g.push({ axis: e, at: s(c, u + 0.3, l), dir: new T(0, -1, 0) });
        else {
          let r =
              t.at === `+x` ? n.max.x - 0.3 : t.at === `-x` ? n.min.x + 0.3 : c,
            i =
              t.at === `+z` ? n.max.z - 0.3 : t.at === `-z` ? n.min.z + 0.3 : l;
          g.push({ axis: e, at: s(r, u + 0.15, i), dir: zm.clone() });
        }
      }
      this.gizmos.setGrips(g);
    }
    facing(e, t) {
      let n = Bi(e.r8),
        r = Math.cos(n),
        i = Math.sin(n),
        a = this.d.stage.camera.position,
        o = (t.min.x + t.max.x) / 2,
        s = (t.min.z + t.max.z) / 2,
        c = a.x - (e.x + o * r + s * i),
        l = a.z - (e.z - o * i + s * r);
      return [c * r - l * i >= 0 ? 1 : -1, c * i + l * r >= 0 ? 1 : -1];
    }
    followGrips() {
      let e = this.base();
      if (!this.gripSides || !e) return;
      let t = this.localBox({ ...e, r8: 0 });
      if (!t) return;
      let [n, r] = this.facing(e, t);
      `${e.x},${e.z},${e.r8},${n},${r}` !== this.gripSides &&
        this.updateGrips(e);
    }
    setSkin(e) {
      if (this.armed) {
        ((this.armed.skin = e),
          this.updateGhost(),
          this.hud?.inspect({
            preset: this.armed.pre,
            kn: this.armed.kn,
            skin: e,
            placed: !1,
          }));
        return;
      }
      let t = this.base();
      t &&
        (this.carry
          ? ((this.draft = { ...t, skin: e }),
            this.carryTo(this.aimAt.x, this.aimAt.y, this.aimAt.z))
          : this.schedule({ ...t, skin: e }),
        this.inspectSelected());
    }
    rotate(e) {
      if (this.spawning) {
        ((this.spawning.yaw += (e * Math.PI) / 2),
          this.gizmos.setSpawn(this.spawning));
        return;
      }
      if (this.armed) {
        let t = ki(this.armed.pre) ? 2 : 1;
        ((this.armed.r8 = (this.armed.r8 + e * t + 8) % 8), this.updateGhost());
        return;
      }
      let t = this.selected,
        n = t && Ai(t.pre),
        r = this.base();
      if (!t || !n || !r) return;
      let i = (r.r8 + e * (ki(n) ? 2 : 1) + 8) % 8;
      if (this.carry) {
        ((this.draft = { ...r, r8: i }),
          this.carryTo(this.aimAt.x, this.aimAt.y, this.aimAt.z));
        return;
      }
      this.schedule(this.keepCentre(r, { ...r, r8: i }));
    }
    keepCentre(e, t) {
      let n = this.localBox(e),
        r = this.localBox(t);
      return !n || !r
        ? t
        : Vi({
            ...t,
            x: e.x + (n.min.x + n.max.x) / 2 - (r.min.x + r.max.x) / 2,
            z: e.z + (n.min.z + n.max.z) / 2 - (r.min.z + r.max.z) / 2,
          });
    }
    localBox(e) {
      let t = JSON.stringify([e.pre, e.r8, e.kn]);
      if (this.boxCache.has(t)) return this.boxCache.get(t);
      let n = null,
        r = Ni(e);
      if (r)
        try {
          let e = dm(r);
          (e.geometry.dispose(), (n = e.box));
        } catch {}
      return (
        this.boxCache.size > 300 && this.boxCache.clear(),
        this.boxCache.set(t, n),
        n
      );
    }
    duplicate() {
      let e = this.selected,
        t = e && Ai(e.pre),
        n = this.base();
      e &&
        t &&
        n &&
        (this.carry && this.drop(),
        this.arm(t, { r8: n.r8, kn: n.kn ?? e.kn, skin: n.skin ?? t.skin }));
    }
    remove() {
      let e = this.selected;
      if (!e) return;
      (this.endCarry(!1), this.dropDraft());
      let t = this.ridersOf(e.id);
      if (!t.length) {
        this.send({ type: `build:del`, id: e.id });
        return;
      }
      let n = t.length;
      this.send(
        {
          type: `build:batch`,
          ops: [e.id, ...t].map((e) => ({ op: `del`, id: e })),
        },
        !1,
        `Removed the ${Ap(e)} and ${n === 1 ? `the piece` : `${n} pieces`} on it`,
      );
    }
    cancel() {
      if (this.sizing) this.resizeEnd(!1);
      else if (this.carry) this.endCarry(!1);
      else if (this.armed) this.disarm();
      else if (this.spawning) {
        ((this.spawning = null), this.hud?.inspect(null));
        let e = this.meta();
        e && this.gizmos.setSpawn(e.spawn);
      } else if (this.selected) this.deselect();
      else return !1;
      return (this.refreshHint(), !0);
    }
    meta() {
      try {
        return JSON.parse(this.d.state.meta);
      } catch {
        return null;
      }
    }
    inverseOf(e) {
      if (e.op === `add`) return (e, t) => ({ op: `del`, id: e[t] });
      let t = this.committed(e.id),
        n = e.id;
      return t
        ? e.op === `set`
          ? () => ({ op: `set`, id: n, req: t })
          : () => ({ op: `add`, req: t, replaces: n })
        : null;
    }
    send(e, t = !1, n) {
      let r = ++this.seq,
        i = { inverse: null, at: performance.now(), done: n };
      if (t)
        e.type === `build:add`
          ? (i.replaces = [e.replaces])
          : e.type === `build:batch` &&
            (i.replaces = e.ops
              .filter((e) => e.op === `add`)
              .map((e) => (e.op === `add` ? e.replaces : void 0)));
      else if (e.type === `build:add`)
        i.inverse = (e) => ({ type: `build:del`, id: e });
      else if (e.type === `build:set` || e.type === `build:del`) {
        let t = this.committed(e.id),
          n = e.id;
        t &&
          (i.inverse =
            e.type === `build:set`
              ? () => ({ type: `build:set`, id: n, req: t })
              : () => ({ type: `build:add`, req: t, replaces: n }));
      } else if (e.type === `build:batch`) {
        let t = 0,
          n = e.ops.map((e) => ({
            f: this.inverseOf(e),
            k: e.op === `add` ? t++ : -1,
          }));
        n.every((e) => e.f) &&
          (i.inverse = (e, t) => ({
            type: `build:batch`,
            ops: n.map((e) => e.f(t, e.k)).reverse(),
          }));
      } else {
        let e = this.meta();
        e &&
          (i.inverse = () => ({
            type: `build:spawn`,
            x: e.spawn.x,
            z: e.spawn.z,
            yaw: Rm(e.spawn.yaw),
            y: e.spawn.y,
          }));
      }
      this.pending.set(r, i);
      let a =
        e.type === `build:batch`
          ? e.ops
          : e.type === `build:set`
            ? [{ op: `set`, id: e.id, req: e.req }]
            : e.type === `build:del`
              ? [{ op: `del`, id: e.id }]
              : [];
      for (let e of a)
        e.op === `set`
          ? this.sent.set(e.id, { req: e.req, reqId: r, acked: !1 })
          : e.op === `del` && this.sent.delete(e.id);
      let o;
      ((o =
        e.type === `build:add`
          ? { ...e.req }
          : e.type === `build:set`
            ? { ...e.req, id: e.id }
            : e.type === `build:del`
              ? { id: e.id }
              : e.type === `build:batch`
                ? {
                    ops: e.ops.map((e) =>
                      e.op === `add`
                        ? { op: `add`, ...e.req }
                        : e.op === `set`
                          ? { op: `set`, id: e.id, ...e.req }
                          : { op: `del`, id: e.id },
                    ),
                  }
                : { x: e.x, z: e.z, yaw: e.yaw, ...(e.y ? { y: e.y } : {}) }),
        this.d.room.send(e.type, { reqId: r, ...o }));
    }
    reply(e, t, n, r = t ? [t] : []) {
      let i = this.pending.get(e);
      if (!i) return;
      this.pending.delete(e);
      let a = !1;
      for (let [t, r] of this.sent)
        r.reqId === e &&
          (n ? this.sent.delete(t) : (r.acked = !0),
          (a ||= t === this.selected?.id));
      if (n) {
        (this.d.toast(n, `red`),
          a && !this.carry && this.dropDraft(),
          this.showSelected(),
          !this.draft && !this.sizing && this.inspectSelected(),
          this.armed && this.updateGhost());
        return;
      }
      (i.replaces?.forEach((e, t) => {
        e !== void 0 && r[t] && this.idMap.set(e, r[t]);
      }),
        i.inverse &&
          (this.undos.push(i.inverse(t, r)),
          this.undos.length > 60 && this.undos.shift()),
        i.done && this.d.toast(i.done, `mint`),
        this.hud?.setUndo(this.undos.length));
    }
    resolve(e) {
      let t = e;
      for (let e = 0; e < 64 && this.idMap.has(t); e++) t = this.idMap.get(t);
      return t;
    }
    undo() {
      if (this.carry) {
        this.endCarry(!1);
        return;
      }
      if (this.draft) {
        this.dropDraft();
        return;
      }
      let e = performance.now();
      for (let [t, n] of this.pending) e - n.at > Nm && this.pending.delete(t);
      if (this.pending.size) return;
      let t = this.undos.pop();
      if ((this.hud?.setUndo(this.undos.length), !t)) return;
      if (
        ((t.type === `build:set` || t.type === `build:del`) &&
          (t.id = this.resolve(t.id)),
        t.type === `build:batch`)
      ) {
        for (let e of t.ops) e.op !== `add` && (e.id = this.resolve(e.id));
        if (
          ((t.ops = t.ops.filter(
            (e) => e.op === `add` || this.world.pieces.has(e.id),
          )),
          !t.ops.length)
        )
          return;
      }
      let n =
        t.type === `build:batch`
          ? t.ops
          : t.type === `build:del`
            ? [{ op: `del`, id: t.id }]
            : t.type === `build:set`
              ? [{ op: `set`, id: t.id, req: t.req }]
              : [];
      (n.some((e) => e.op === `del` && e.id === this.selected?.id) &&
        this.deselect(!1),
        this.send(t, !0),
        n.some((e) => e.op === `set` && e.id === this.selected?.id) &&
          (this.showSelected(), this.inspectSelected()));
    }
    typing(e) {
      let t = e.target;
      return (
        !!t && (fi(t) || t.isContentEditable || t instanceof HTMLSelectElement)
      );
    }
    onKey = (e) => {
      if (this.typing(e)) return;
      let t = e.key.toLowerCase();
      if (t === `b` && !e.ctrlKey && !e.metaKey && !e.altKey) {
        if (e.repeat || this.menuUp()) return;
        (this.active || this.d.canBuild()) &&
          (e.preventDefault(), this.toggle());
        return;
      }
      if (!this.active) return;
      if (t === `escape`) {
        if (e.defaultPrevented || e.repeat || this.menuUp()) return;
        (e.preventDefault(),
          this.panel ? this.setPanel(null) : this.cancel() || this.d.menu());
        return;
      }
      if (this.menuUp() || e.repeat) return;
      if ((e.ctrlKey || e.metaKey) && t === `z`) {
        (e.preventDefault(), this.undo());
        return;
      }
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      let n = e.target instanceof HTMLInputElement && e.target.type === `range`;
      if (t === ` `) {
        (e.preventDefault(), this.held.add(t));
        return;
      }
      if (
        (t === `q` || t === `e`) &&
        (this.armed || this.carry || this.selected || this.spawning)
      ) {
        this.rotate(t === `q` ? -1 : 1);
        return;
      }
      if (t === `r`) {
        this.rotate(e.shiftKey ? -1 : 1);
        return;
      }
      if (t === `delete` || t === `backspace`) {
        (e.preventDefault(), this.remove());
        return;
      }
      if (t === `tab`) {
        (e.preventDefault(), this.cycleLevel(e.shiftKey ? 1 : -1));
        return;
      }
      if (t === `f`) {
        this.duplicate();
        return;
      }
      (n && t.startsWith(`arrow`)) ||
        ([
          `w`,
          `a`,
          `s`,
          `d`,
          `q`,
          `e`,
          `arrowup`,
          `arrowdown`,
          `arrowleft`,
          `arrowright`,
        ].includes(t) &&
          (e.preventDefault(), this.held.add(t)));
    };
    onKeyUp = (e) => {
      let t = e.key.toLowerCase();
      (t === ` ` && this.active && this.held.has(t) && e.preventDefault(),
        this.held.delete(t));
    };
    onBlur = () => {
      this.held.clear();
    };
    refreshHint() {
      let e = this.hud;
      if (!e) return;
      let t = [],
        n = (e, n) => t.push({ keys: e, label: n }),
        r = this.armed?.pre ?? (this.selected && Ai(this.selected.pre)),
        i = this.lock === null ? `Under` : `Next level`,
        a = (e) => {
          if (!r) return ``;
          let t = Pi(r)[e][0];
          return t
            ? (Ei(r)[e].label ?? Di(r).find((e) => e.key === t)?.label ?? ``)
            : ``;
        };
      if (this.device === `pad`) {
        let e = hi();
        this.sizing
          ? (n([e.ls], `↔ ${a(`x`)}  ↕ ${a(`y`)}`),
            r && Pi(r).z.length && n([e.rs], `↕ ${a(`z`)}`),
            n([e.lt], `Fine`),
            n([e.b], `Cancel`))
          : this.spawning
            ? (n([e.a], `Skaters start here`),
              n([e.lb, e.rb], `Turn`),
              n([e.b], `Cancel`))
            : this.carry
              ? (n([e.a], `Drop`),
                n([e.b], `Put back`),
                n([e.lb, e.rb], `Rotate`),
                n([e.rt], `Resize`),
                n([`▼`], i),
                n([e.x], `Delete`))
              : this.armed
                ? (n([e.a], `Place`),
                  n([e.lb, e.rb], `Rotate`),
                  n([e.rt], `Resize`),
                  n([`▼`], i),
                  n([`▶`], `Tweak`),
                  n([e.y], `Pieces`),
                  n([e.b], `Done`))
                : this.selected
                  ? (n([e.a], this.hovered ? `Pick up` : `Deselect`),
                    n([e.lb, e.rb], `Rotate`),
                    n([e.rt], `Resize`),
                    n([`▶`], `Tweak`),
                    n([e.x], `Delete`),
                    n([`▲`], `Copy`),
                    n([e.b], `Done`))
                  : (this.hovered && n([e.a], `Pick up`),
                    n([e.y], `Pieces`),
                    n([e.ls], `Move`),
                    n([e.rs], `Look`),
                    n([e.view], `Undo`),
                    n([e.start], `Menu`));
      } else
        this.device === `touch`
          ? this.spawning
            ? n([], `Tap where skaters start · ⟲ ⟳ turn the flag`)
            : this.armed
              ? n([], `Tap the park to place it · drag the ✥ pad to resize`)
              : this.selected
                ? n([], `Drag it to move · drag the arrows to resize`)
                : n([], `Pick a piece, or tap one in the park to edit it`)
          : this.sizing
            ? n([`Esc`], `Cancel`)
            : this.spawning
              ? (n([`Click`], `Skaters start here`),
                n([`Q`, `E`], `Turn`),
                n([`Esc`], `Cancel`))
              : this.carry
                ? (n([`Q`, `E`], `Rotate`),
                  n([`Wheel`], `Rotate`),
                  n([`Tab`], i),
                  n([`Right-click`], `Put back`))
                : this.armed
                  ? (n([`Click`], `Place`),
                    n([`Q`, `E`], `Rotate`),
                    n([`Tab`], i),
                    n([`Esc`], `Done`))
                  : this.selected
                    ? (n([`Drag`], `Move`),
                      n([`↔`, `↕`, `⤢`], `Resize`),
                      n([`Q`, `E`], `Rotate`),
                      n([`F`], `Copy`),
                      n([`Del`], `Delete`),
                      n([`Esc`], `Done`))
                    : (n([`Drag`], `Move a piece`),
                      n([`Right-drag`], `Orbit`),
                      n([`WASD`], `Pan`),
                      n([`Space`], `+ drag pans`),
                      n([`Esc`], `Menu`));
      e.hint(t);
    }
  },
  Hm = class {
    pill;
    name;
    build;
    constructor(e, t, n, r, i) {
      ((this.pill = j(`div`, `park-pill interactive`)),
        (this.name = j(`b`, ``, ``)));
      let a = j(`button`, `ico-btn`);
      ((a.type = `button`),
        a.setAttribute(`aria-label`, `Invite`),
        a.append(U(`invite`)),
        a.addEventListener(`click`, r),
        this.pill.append(
          U(`parks`, `pp-ico`),
          this.name,
          j(`span`, `pp-by`, `by ${n}`),
          a,
        ),
        t.prepend(this.pill),
        (this.build = V(``, `primary park-build`, i)),
        this.build.append(
          U(`build`),
          j(`span`, ``, `BUILD`),
          j(`kbd`, ``, `B`),
        ),
        e.append(this.build));
    }
    update(e, t) {
      (this.name.textContent !== e && (this.name.textContent = e),
        this.build.classList.toggle(`on`, t));
    }
    dispose() {
      (this.pill.remove(), this.build.remove());
    }
  };
