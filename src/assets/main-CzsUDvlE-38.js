// assets/main-CzsUDvlE 38 — group
// Lines 12661-13056 of readable/assets/main-CzsUDvlE.pretty.js (statement-aligned).
var pm = class {
    group = new c();
    ghost = null;
    ghostKey = ``;
    ghostLocal = new b();
    ghostBase = [];
    ghostShown = !0;
    riders = new Map();
    ghostMat = toonMaterial({
      vertexColors: !0,
      transparent: !0,
      opacity: 0.62,
      depthWrite: !1,
    });
    foot;
    footMat = new o({
      color: rm,
      transparent: !0,
      opacity: 0.35,
      depthWrite: !1,
      side: 2,
      forceSinglePass: !0,
    });
    sel = null;
    selMat = toonMaterial({
      vertexColors: !0,
      transparent: !0,
      opacity: 0.45,
      depthWrite: !1,
      polygonOffset: !0,
      polygonOffsetFactor: -2,
      polygonOffsetUnits: -2,
    });
    selFoot;
    hov = null;
    hovKey = ``;
    hovMat = toonMaterial({
      vertexColors: !0,
      transparent: !0,
      opacity: 0.3,
      depthWrite: !1,
      polygonOffset: !0,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1,
    });
    grips = new Map();
    hotGrip = null;
    touch = !1;
    cursor = new c();
    grid = null;
    gridKey = ``;
    flag = new c();
    joints = new tm();
    ghostJ = null;
    ghostJointsKey = ``;
    constructor(e) {
      ((this.group.name = `builder`),
        (this.ghostMat.emissiveIntensity = 0.35),
        (this.selMat.emissive = am.clone()),
        (this.selMat.emissiveIntensity = 0.5),
        (this.hovMat.emissive = new _(`#FFFFFF`)),
        (this.hovMat.emissiveIntensity = 0.55));
      let t = new i(1, 1).rotateX(-Math.PI / 2);
      ((this.foot = new w(t, this.footMat)),
        (this.foot.renderOrder = 3),
        (this.selFoot = new w(
          t,
          new o({
            color: am,
            transparent: !0,
            opacity: 0.3,
            depthWrite: !1,
            side: 2,
            forceSinglePass: !0,
          }),
        )),
        (this.selFoot.renderOrder = 3),
        (this.foot.visible = this.selFoot.visible = !1));
      let r = new o({ color: `#FFD21F` }),
        s = new o({ color: om }),
        l = new w(new a(0.05, 0.05, 2.2, 8).translate(0, 1.1, 0), s),
        d = new w(
          new u(0.45, 0.9, 3).rotateZ(-Math.PI / 2).translate(0.45, 1.9, 0),
          r,
        ),
        f = new w(
          new n(0.55, 0.8, 32).rotateX(-Math.PI / 2).translate(0, 0.03, 0),
          r,
        ),
        p = new w(
          new u(0.3, 0.7, 3).rotateX(Math.PI / 2).translate(0, 0.08, 1.2),
          r,
        );
      this.flag.add(l, d, f, p);
      let m = fm(),
        h = fm(1.35);
      for (let e of [`x`, `y`, `z`]) {
        let t = new c(),
          n = new w(m, new o({ color: sm[e], depthTest: !1 })),
          r = new w(h, new o({ color: om, side: 1, depthTest: !1 }));
        (r.scale.set(1, 1.06, 1),
          (r.position.y = -0.03),
          (n.renderOrder = 12),
          (r.renderOrder = 11),
          t.add(r, n),
          (t.visible = !1),
          this.grips.set(e, { group: t, pose: null, base: new T() }),
          this.group.add(t));
      }
      let g = new o({
          color: `#FFFFFF`,
          depthTest: !1,
          transparent: !0,
          opacity: 0.95,
        }),
        v = new o({ color: om, depthTest: !1 }),
        y = new w(new n(0.42, 0.56, 40).rotateX(-Math.PI / 2), g),
        b = new w(new n(0.36, 0.62, 40).rotateX(-Math.PI / 2), v),
        S = new w(new x(0.1, 16).rotateX(-Math.PI / 2), g);
      ((b.renderOrder = 13),
        (y.renderOrder = S.renderOrder = 14),
        this.cursor.add(b, y, S),
        (this.cursor.visible = !1),
        this.group.add(
          this.foot,
          this.selFoot,
          this.flag,
          this.cursor,
          this.joints.group,
        ),
        e.add(this.group),
        (this.group.visible = !1));
    }
    set visible(e) {
      this.group.visible = e;
    }
    setLayout(e) {
      let n = Ha(e),
        r = JSON.stringify(n);
      if (!n || r === this.gridKey) return;
      ((this.gridKey = r),
        this.grid &&
          (this.grid.removeFromParent(),
          this.grid.geometry.dispose(),
          this.grid.material.dispose()));
      let i = Math.max(n.x1 - n.x0, n.z1 - n.z0);
      this.grid = new t(i, i, 3877967, 3877967);
      let a = this.grid.material;
      ((a.transparent = !0),
        (a.opacity = 0.12),
        (a.depthWrite = !1),
        this.grid.position.set((n.x0 + n.x1) / 2, 0.02, (n.z0 + n.z1) / 2),
        this.group.add(this.grid));
    }
    setSpawn(e) {
      (this.flag.position.set(e.x, e.y ?? 0, e.z),
        (this.flag.rotation.y = e.yaw));
    }
    showGhost(e, t = ``) {
      if (!e) return (this.clearGhost(), null);
      if (t !== this.ghostKey || !this.ghost) {
        this.clearGhost();
        let n;
        try {
          n = dm(e);
        } catch {
          return null;
        }
        let { geometry: r, box: i } = n;
        ((this.ghost = new w(r, this.ghostMat)),
          (this.ghost.renderOrder = 4),
          (this.ghost.visible = this.ghostShown),
          (this.ghostLocal = i),
          (this.ghostBase = hm(r, i)),
          (this.ghostKey = t),
          this.group.add(this.ghost));
      }
      return this.ghostLocal;
    }
    placeGhost(e, t, n, r) {
      if (!this.ghost) return null;
      this.ghost.position.set(e, t + 0.02, n);
      let i = r ? rm : im;
      (this.ghostMat.emissive.copy(i), this.footMat.color.copy(i));
      let a = this.ghostLocal;
      ((this.foot.visible = this.ghostShown),
        this.foot.position.set(
          e + (a.min.x + a.max.x) / 2,
          t + a.min.y + 0.035,
          n + (a.min.z + a.max.z) / 2,
        ),
        this.foot.scale.set(
          a.max.x - a.min.x + 0.2,
          1,
          a.max.z - a.min.z + 0.2,
        ));
      for (let e of this.riders.values()) e.visible = this.ghostShown;
      return {
        x0: e + a.min.x,
        x1: e + a.max.x,
        y0: t + a.min.y,
        y1: t + a.max.y,
        z0: n + a.min.z,
        z1: n + a.max.z,
      };
    }
    ghostXray(e) {
      this.ghostMat.depthTest !== !e &&
        ((this.ghostMat.depthTest = !e),
        (this.ghostMat.opacity = e ? 0.45 : 0.62),
        (this.footMat.depthTest = !e),
        (this.ghostMat.needsUpdate = this.footMat.needsUpdate = !0));
    }
    get ghostBounds() {
      return this.ghostLocal;
    }
    get ghostBasePoints() {
      return this.ghostBase;
    }
    setRiders(e) {
      let t = new Map();
      for (let n of e ?? []) t.set(mm(n), n);
      for (let [e, n] of this.riders)
        t.has(e) ||
          (n.removeFromParent(), n.geometry.dispose(), this.riders.delete(e));
      for (let [e, n] of t) {
        let t = this.riders.get(e);
        if (!t) {
          try {
            t = new w(dm(n).geometry, this.ghostMat);
          } catch {
            continue;
          }
          ((t.renderOrder = 4), this.riders.set(e, t), this.group.add(t));
        }
        ((t.visible = this.ghostShown), t.position.set(n.x, 0.02, n.z));
      }
    }
    get hasGhost() {
      return !!this.ghost;
    }
    showGhostMesh(e) {
      ((this.ghostShown = e),
        this.joints.showGhost(e),
        this.ghost && ((this.ghost.visible = e), (this.foot.visible = e)));
      for (let t of this.riders.values()) t.visible = e;
    }
    setJoints(e) {
      this.joints.setWorld(e);
    }
    setGhostJoints(e, t = ``) {
      ((this.ghostJ = e), (this.ghostJointsKey = t), this.joints.setGhost(e));
    }
    get ghostJoints() {
      return this.ghostShown ? this.ghostJ : null;
    }
    clearGhost() {
      (this.setGhostJoints(null),
        (this.ghost &&=
          (this.ghost.removeFromParent(), this.ghost.geometry.dispose(), null)),
        (this.ghostKey = ``),
        (this.foot.visible = !1),
        this.setRiders(null),
        this.ghostXray(!1));
    }
    setGrips(e) {
      for (let [t, n] of this.grips) {
        let r = e?.find((e) => e.axis === t) ?? null;
        ((n.pose = r),
          (n.group.visible = !!r),
          r &&
            (this.standOff(n),
            n.group.quaternion.copy(_m.setFromUnitVectors(gm, r.dir))));
      }
      this.hotGrip &&
        !this.grips.get(this.hotGrip).pose &&
        (this.hotGrip = null);
    }
    gripPose(e) {
      return this.grips.get(e)?.pose ?? null;
    }
    hitGrip(e) {
      if (!this.group.visible) return null;
      let t = null,
        n = 1 / 0;
      for (let [r, i] of this.grips) {
        if (!i.pose) continue;
        let a = i.group.scale.x;
        (vm.copy(i.base), ym.copy(i.pose.dir).multiplyScalar(a).add(i.base));
        let o = 0.34 * a,
          s = e.distanceSqToSegment(vm, ym);
        s < o * o && s < n && ((n = s), (t = r));
      }
      return t;
    }
    standOff(e) {
      let t = e.pose;
      if (!t) return;
      let n = e.group.scale.x;
      (e.base
        .copy(t.at)
        .addScaledVector(t.dir, t.dir.y < 0 ? -1.3 * n : 0.3 * n),
        e.group.position.copy(e.base));
    }
    setHotGrip(e) {
      this.hotGrip = e;
    }
    setCursor(e) {
      ((this.cursor.visible = !!e),
        e && this.cursor.position.set(e.x, e.y + 0.05, e.z));
    }
    frame(e) {
      let t = this.touch ? 1.45 : 1;
      for (let [n, r] of this.grips) {
        if (!r.pose) continue;
        let i =
          Math.min(6, Math.max(0.5, e.position.distanceTo(r.pose.at) * 0.055)) *
          t *
          (n === this.hotGrip ? 1.25 : 1);
        (r.group.scale.setScalar(i), this.standOff(r));
      }
      (this.cursor.visible &&
        this.cursor.scale.setScalar(
          Math.min(
            6,
            Math.max(0.6, e.position.distanceTo(this.cursor.position) * 0.04),
          ),
        ),
        this.joints.frame(e, t));
    }
    select(e) {
      if (
        ((this.sel &&=
          (this.sel.removeFromParent(), this.sel.geometry.dispose(), null)),
        (this.selFoot.visible = !1),
        !e)
      )
        return;
      let { geometry: t, box: n } = dm(e);
      ((this.sel = new w(t, this.selMat)),
        (this.sel.renderOrder = 5),
        this.sel.position.set(e.x, 0.01, e.z),
        this.group.add(this.sel),
        (this.selFoot.visible = !0),
        this.selFoot.position.set(
          e.x + (n.min.x + n.max.x) / 2,
          n.min.y + 0.03,
          e.z + (n.min.z + n.max.z) / 2,
        ),
        this.selFoot.scale.set(
          n.max.x - n.min.x + 0.3,
          1,
          n.max.z - n.min.z + 0.3,
        ));
    }
    hover(e) {
      let t = e ? JSON.stringify(e) : ``;
      if (
        t !== this.hovKey &&
        ((this.hovKey = t),
        (this.hov &&=
          (this.hov.removeFromParent(), this.hov.geometry.dispose(), null)),
        e)
      ) {
        try {
          let { geometry: t } = dm(e);
          this.hov = new w(t, this.hovMat);
        } catch {
          return;
        }
        ((this.hov.renderOrder = 4),
          this.hov.position.set(e.x, 0.012, e.z),
          this.group.add(this.hov));
      }
    }
    dispose() {
      (this.clearGhost(),
        this.select(null),
        this.hover(null),
        this.group.removeFromParent());
      let e = new Set(),
        t = new Set();
      this.group.traverse((n) => {
        let r = n;
        r.isMesh && (e.add(r.geometry), t.add(r.material));
      });
      for (let t of e) t.dispose();
      for (let e of t) e.dispose();
      (this.grid &&
        (this.grid.geometry.dispose(), this.grid.material.dispose()),
        this.ghostMat.dispose(),
        this.selMat.dispose(),
        this.hovMat.dispose());
    }
  },
  mm = (e) => JSON.stringify({ ...e, x: 0, z: 0 });
