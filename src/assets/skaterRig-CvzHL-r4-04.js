// assets/skaterRig-CvzHL-r4 04 — math
// Lines 691-1787 of readable/assets/skaterRig-CvzHL-r4.pretty.js (statement-aligned).
var Z = new Float64Array(me.length * 3),
  Nt = new s().makeTranslation(0, -b.flipPivotY, 0),
  Pt = 0.5,
  Ft = 0.05,
  It = 4,
  Lt = 5,
  Rt = Math.PI / 2,
  zt = 0.3,
  Bt = 0.12,
  Vt = 1.45,
  Ht = 20,
  Ut = 0.65,
  Wt = 0.26,
  Gt = 0.22,
  Kt = 0.21,
  Q = { OFF: 0, RAGDOLL: 1, BLEND: 2 },
  $ = {
    ollie: 0.15,
    land: 0.18,
    flip: 0.15,
    grab: 0.18,
    air: 0.25,
    grind: 0.2,
    lip: 0.32,
    manual: 0.2,
    wallride: 0.2,
    bail: 0.1,
    kick: 0.1,
    crouch: 0.15,
    brake: 0.2,
    push: 0.2,
    ride: 0.3,
    emote: 0.25,
    slide: 0.12,
    flail: 0.08,
    plant: 0.2,
  },
  lipTricks = new Set([`lip-handplant`, `lip-invert`, `lip-andrecht`, `lip-onefoot`]),
  Jt = Object.fromEntries(
    [
      `lip-handplant`,
      `lip-invert`,
      `lip-andrecht`,
      `lip-onefoot`,
      `lip-axle`,
      `lip-disaster`,
      `lip-nose`,
    ].map((e) => [e, e.replace(`lip-`, `lip-out-`)]),
  ),
  Yt = 1.05,
  Xt = new t({ color: 0 }),
  SkaterRigView = class {
    root = new r();
    squash = new r();
    lean = new r();
    stance = new r();
    rig = new r();
    boardAnchor = new r();
    boardFlip = new r();
    look;
    goofy;
    assets;
    mixer = null;
    col = null;
    body = null;
    boardMesh = null;
    head = null;
    bones = null;
    jig = [];
    boneBy = new Map();
    animQ = [];
    animHips = new f();
    animBoardP = new f();
    animBoardQ = new n();
    poseBlend = null;
    spin = new nt();
    glide = new PoseBlend();
    simQ = new n();
    drawnQ = new n();
    lipCut = !1;
    grade = 0;
    rootQs = [];
    materials = [];
    shells = [];
    disposed = !1;
    ghost = 1;
    proto = null;
    constructor(e, t) {
      ((this.look = e),
        (this.assets = t),
        (this.goofy = e.stance === `goofy`),
        (this.root.name = `skater-${e.head}`),
        (this.stance.scale.x = this.goofy ? -1 : 1),
        (this.rig.rotation.y = -Math.PI / 2),
        (this.boardAnchor.name = `BoardAnchor`),
        (this.boardAnchor.rotation.y = Math.PI / 2),
        (this.boardFlip.name = `BoardFlip`),
        (this.boardFlip.position.y = b.flipPivotY),
        this.boardAnchor.add(this.boardFlip),
        this.rig.add(this.boardAnchor),
        this.stance.add(this.rig),
        this.lean.add(this.stance),
        this.squash.add(this.lean),
        this.root.add(this.squash));
      let n = t.kit.proto(e);
      n
        ? this.attach(n)
        : t.kit.protoAsync(e).then(
            (e) => {
              this.disposed || this.attach(e);
            },
            (e) => console.error(e),
          );
    }
    get ready() {
      return this.body !== null;
    }
    attach(e) {
      ((this.proto = e), this.assets.kit.retain(e));
      let t = ke(e.scene),
        n = t.getObjectByName(`body`),
        r = t.getObjectByName(`board`),
        i = t.getObjectByName(`Hips`),
        a = patchToon(toonMaterial({ vertexColors: !0 }), { ao: !0, rider: !0 }),
        o = patchToon(toonMaterial({ vertexColors: !0 }), { ao: !0, rider: !0 });
      ((this.materials = [a, o]),
        (n.material = a),
        (r.material = o),
        (n.boundingSphere = ut),
        (n.castShadow = !0),
        (n.customDepthMaterial = h),
        (r.castShadow = !0),
        this.rig.add(i, n),
        (r.position.y = -b.flipPivotY),
        this.boardFlip.add(r),
        (this.body = n),
        (this.boardMesh = r),
        this.paintSilhouette(),
        (this.head = i.getObjectByName(`Head`) ?? null));
      let s = {};
      for (let e of [
        `Hips`,
        `Chest`,
        `Head`,
        `LeftArm`,
        `RightArm`,
        `LeftEar`,
        `RightEar`,
        `Acc`,
        `Tail1`,
        `Tail2`,
      ])
        s[e] = e === `Hips` ? i : i.getObjectByName(e);
      ((this.bones = s),
        i.traverse((e) => {
          e.isBone && this.boneBy.set(e.name, e);
        }),
        (this.animQ = [...this.boneBy.values()].map((e) => ({
          bone: e,
          q: e.quaternion.clone(),
        }))),
        this.animHips.copy(i.position),
        this.animBoardP.copy(this.boardAnchor.position),
        this.animBoardQ.copy(this.boardAnchor.quaternion),
        (this.poseBlend = new FrameSampler(
          [
            ...this.animQ.map((e) => e.bone.quaternion),
            this.boardAnchor.quaternion,
          ],
          [i.position, this.boardAnchor.position],
        )),
        (this.rootQs = [
          this.animQ.findIndex((e) => e.bone === i),
          this.animQ.length,
        ]));
      let c = (e, t, n, r, i, a) => ({
        bone: e,
        dir: new f(...t).normalize(),
        len: n,
        stiff: r,
        damp: i,
        max: a,
        p: new f(),
        v: new f(),
        init: !1,
      });
      ((this.jig = [
        c(s.LeftEar, [0, 1, 0], 0.12, 170, 11, 0.5),
        c(s.RightEar, [0, 1, 0], 0.12, 170, 11, 0.5),
        c(s.Acc, [0, -1, -0.5], 0.14, 120, 9, 0.6),
        c(s.Tail1, [0, -0.3, -1], 0.14, 90, 8, 0.6),
        c(s.Tail2, [0, -0.2, -1], 0.14, 110, 8, 0.7),
      ]),
        (this.shells = addOutlines(this.root, vt)),
        (this.mixer = new d(this.rig)),
        this.onAttached(),
        this.ghost < 1 && this.setGhost(this.ghost));
    }
    onAttached() {
      this.bindClips();
    }
    setPose(e, t = e.yaw) {
      (this.root.position.set(e.x, e.y, e.z),
        ue(t, e.ux, e.uy, e.uz, j),
        N.set(e.ux, e.uy, e.uz),
        ht.set(j.x, j.y, j.z),
        mt.crossVectors(N, ht),
        M.makeBasis(mt, N, ht),
        P.setFromRotationMatrix(M),
        this.root.quaternion.copy(P));
    }
    charTurn(e) {
      return (
        this.stance.updateMatrix(),
        this.rig.updateMatrix(),
        Dt.multiplyMatrices(this.stance.matrix, this.rig.matrix),
        Ot.copy(Dt)
          .invert()
          .multiply(kt.makeRotationFromQuaternion(e))
          .multiply(Dt),
        e.setFromRotationMatrix(Ot)
      );
    }
    landGrade(e) {
      this.grade = e;
    }
    animate(e, t) {
      (this.easeUp(t),
        this.setPose(e, this.turn.update(e, t) + this.upYaw),
        this.root.position.add(this.upPos));
      let n = this.simQ.angleTo(this.root.quaternion) > Yt;
      (this.simQ.copy(this.root.quaternion),
        (this.lipCut =
          n &&
          (e.mode === v.LIP && this.lastMode !== v.LIP
            ? lipTricks.has(se[e.trickId]?.clip ?? ``)
            : e.mode === v.GROUND &&
              this.lastMode === v.LIP &&
              Jt[this.curName] !== void 0)),
        (this.stepsOffBack(e) || this.lipCut) && this.glide.skip(),
        this.glide.apply(
          this.root.position,
          this.root.quaternion,
          e,
          t,
          this.turn.size > 0,
        ),
        this.lipCut &&
          this.poseBlend &&
          this.poseBlend.reframe(
            this.charTurn(
              Et.copy(this.root.quaternion).invert().multiply(this.drawnQ),
            ),
            this.rootQs,
            [0, 1],
          ),
        this.drawnQ.copy(this.root.quaternion),
        this.slideSwing(e, t),
        this.mixer && this.drive(e, t));
    }
    headAnchor(e) {
      return this.head
        ? this.head.getWorldPosition(e).add(F.set(0, 0.8, 0))
        : this.root.getWorldPosition(e).add(F.set(0, 1.4, 0));
    }
    playEmote(e) {
      ((this.emote = e),
        (this.emoteT = 0),
        (this.fidget = !1),
        (this.stillT = 0));
      let t = e.startsWith(`carry-`);
      if ((this.lastMode === v.WALK) !== t) {
        this.emote = ``;
        return;
      }
      this.mixer &&
        (this.lastMode === v.GROUND || t) &&
        !this.oneShot &&
        this.play(e, $.emote, !0);
    }
    playPose(e, t = Math.random) {
      let n = le(e, this.look.head, t, this.lastPose.get(e));
      (this.lastPose.set(e, n),
        this.playEmote(n),
        (this.fidget = e === `fidget` || e === `carry`));
    }
    silhouette = !1;
    setSilhouette(e) {
      e !== this.silhouette && ((this.silhouette = e), this.paintSilhouette());
    }
    paintSilhouette() {
      (this.body &&
        (this.body.material = this.silhouette ? Xt : this.materials[0]),
        this.boardMesh &&
          (this.boardMesh.material = this.silhouette ? Xt : this.materials[1]));
    }
    tintK = 0;
    tintHex = null;
    setTint(e, t) {
      if ((e || (t = 0), e !== this.tintHex)) {
        if (((this.tintHex = e), e))
          for (let t of this.materials) t.emissive.set(e);
        for (let t of this.shells) {
          let n = t.isSkinnedMesh === !0,
            r = (t) => ie(n, e ?? `#3B2C4F`, e ? yt : vt, t);
          t.material = Array.isArray(t.material) ? [r(!1), r(!0)] : r(!1);
        }
      }
      if (t !== this.tintK) {
        this.tintK = t;
        for (let e of this.materials) e.emissiveIntensity = t;
      }
    }
    ghostApplied = 1;
    setGhost(e) {
      if (e === this.ghostApplied) return;
      ((this.ghostApplied = e), (this.ghost = e));
      let t = e >= 0.999;
      for (let n of this.materials) {
        let r = n.transparent === t;
        ((n.transparent = !t),
          (n.opacity = e),
          (n.depthWrite = !0),
          r && (n.needsUpdate = !0));
      }
      for (let e of this.shells) e.visible = t;
      (this.body && (this.body.castShadow = t),
        this.boardMesh && (this.boardMesh.castShadow = t));
    }
    recolor(e) {
      if (!ce(e, this.look)) return !1;
      ((this.look = e),
        (this.goofy = e.stance === `goofy`),
        (this.stance.scale.x = this.goofy ? -1 : 1));
      for (let t of [this.body, this.boardMesh]) {
        if (!t) continue;
        if (!t.userData.ownGeometry) {
          ((t.geometry = t.geometry.clone()), (t.userData.ownGeometry = !0));
          for (let e of t.children)
            e.userData.outlineShell && (e.geometry = t.geometry);
        }
        let n = t.geometry.getAttribute(`color`);
        (n.array.set(this.assets.kit.colors(t.geometry.userData.paint, e)),
          (n.needsUpdate = !0));
      }
      return !0;
    }
    dispose() {
      ((this.disposed = !0),
        this.mixer?.stopAllAction(),
        this.mixer?.uncacheRoot(this.rig));
      for (let e of this.materials) e.dispose();
      for (let e of [this.body, this.boardMesh])
        e?.userData.ownGeometry && e.geometry.dispose();
      (this.proto && this.assets.kit.release(this.proto),
        (this.proto = null),
        this.root.removeFromParent());
    }
    emote = ``;
    emoteT = 0;
    fidget = !1;
    lastPose = new Map();
    stillT = 0;
    fidgetAt = It + Math.random() * 3;
    actions = new Map();
    cur = null;
    curName = ``;
    lastMode = -1;
    planted = !1;
    oneShot = ``;
    oneShotT = 0;
    lastSpeed = 0;
    accel = 0;
    flailPeak = 0;
    lastYaw = 0;
    rideYaw = 0;
    lastX = 0;
    lastZ = 0;
    landPulse = 0;
    popPulse = 0;
    landWas = 0;
    squashT = 0;
    fakieK = 0;
    leanX = 0;
    leanZ = 0;
    bailLean = new f();
    wallK = 0;
    bank = 0;
    bankTo = 0;
    lastTrick = 0;
    lastTrickT = 0;
    bail = Q.OFF;
    bailPending = !1;
    ragdoll = null;
    boardBody = null;
    rdPose = ye();
    blendT = 0;
    blendDur = 0.3;
    boardFree = !1;
    hopWait = -1;
    hopT = 0;
    hopDur = 0;
    hopH = 0;
    hopTurns = 0;
    hop0P = new f();
    hop0Q = new n();
    clock = 0;
    bumpBody = 0;
    bumpBoard = 0;
    turn = new fe();
    slideK = 0;
    slideSide = 1;
    upYaw = 0;
    upPos = new f();
    upYaw0 = 0;
    upPos0 = new f();
    upT = -1;
    upName = `getup`;
    bindClips() {
      for (let [e, t] of this.assets.clips) {
        let n = this.mixer.clipAction(t),
          r = !!t.userData.loop;
        (n.setLoop(r ? l : te, 1 / 0),
          (n.clampWhenFinished = !r),
          this.actions.set(e, n));
      }
      this.play(`ride-idle`, 0);
    }
    resolve(e) {
      if (this.actions.has(e)) return e;
      for (let [t, n] of [
        [`grab-`, `grab-indy`],
        [`grind-`, `grind-5050`],
        [`slide-`, `slide-board`],
        [`flip-`, `flip-kick`],
        [`lip-`, `lip-axle`],
        [`manual-nose`, `manual-nose`],
        [`manual`, `manual`],
        [`special-spin`, `special-spin`],
        [`special-flip`, `special-flip`],
        [`special-grab`, `special-grab`],
        [`special-`, `air-idle`],
        [`emote-`, `ride-idle`],
        [`greet-`, `emote-wave`],
        [`victory-`, `victory`],
        [`lose-`, `lose`],
        [`fidget-`, `ride-idle`],
        [`carry-`, `walk-idle`],
        [`walk`, `idle-stand`],
        [`step-`, `idle-stand`],
      ])
        if (e.startsWith(t) && this.actions.has(n)) return n;
      return this.actions.has(`ride-idle`)
        ? `ride-idle`
        : (this.actions.keys().next().value ?? ``);
    }
    play(e, t = 0.25, n = !1) {
      e = this.resolve(e);
      let r = this.actions.get(e);
      return r
        ? r === this.cur && !n
          ? r
          : (r.reset(),
            (r.timeScale = 1),
            r.play(),
            this.cur && this.cur !== r && this.cur.stop(),
            this.cur ? this.poseBlend.request(t) : this.poseBlend.cut(),
            (this.cur = r),
            (this.curName = e),
            r)
        : null;
    }
    startOneShot(e) {
      let t = this.resolve(e),
        n = this.actions.get(t);
      n &&
        ((this.oneShot = t),
        (this.oneShotT = n.getClip().duration),
        this.play(
          t,
          t.startsWith(`getup`)
            ? 0
            : t.startsWith(`land`)
              ? $.land
              : t === `flail`
                ? $.flail
                : $.ollie,
          !0,
        ));
    }
    drive(e, t) {
      let n = e.mode,
        r = se[e.trickId],
        i = this.lastMode,
        a = t > 0 ? (e.speed - this.lastSpeed) / t : 0;
      ((this.accel += (a - this.accel) * Math.min(1, t * 6)),
        (this.lastSpeed = e.speed));
      let o = (e.x - this.lastX) ** 2 + (e.z - this.lastZ) ** 2 > 2.25;
      ((this.lastX = e.x), (this.lastZ = e.z));
      let s = e.trickId !== this.lastTrick || e.trickT + 1e-4 < this.lastTrickT;
      ((this.lastTrick = e.trickId),
        (this.lastTrickT = e.trickT),
        n !== i &&
          (n === v.BAIL
            ? (this.bailPending = !0)
            : ((this.bailPending = !1),
              this.bail === Q.RAGDOLL && this.handOver(n !== v.GROUND, e)),
          n === v.GROUND && (i === v.AIR || i === v.WALLRIDE)
            ? (this.startOneShot(
                this.grade === de.PERFECT
                  ? `land-perfect`
                  : this.grade === de.SLOPPY
                    ? `land-sloppy`
                    : `land`,
              ),
              (this.landPulse = 1))
            : n === v.GROUND &&
                i === v.BAIL &&
                !this.oneShot.startsWith(`getup`)
              ? this.startOneShot(this.upName)
              : n === v.AIR && (i === v.GROUND || i === v.MANUAL)
                ? (this.startOneShot(`ollie`), (this.popPulse = 1))
                : n === v.WALK && (i === v.GROUND || i === v.MANUAL)
                  ? (this.startOneShot(
                      this.stepsOffBack(e) ? `step-off-fakie` : `step-off`,
                    ),
                    (this.fakieK = 0))
                  : n === v.GROUND && i === v.WALK
                    ? o || this.startOneShot(`step-on`)
                    : n === v.GROUND &&
                        i === v.LIP &&
                        this.lipCut &&
                        this.actions.has(Jt[this.curName])
                      ? this.startOneShot(Jt[this.curName])
                      : n === v.GROUND &&
                        (i === v.GRIND || i === v.LIP || i === v.MANUAL) &&
                        (this.landPulse = 0.6),
          (n !== v.GROUND || i === v.WALK) && (this.emote = ``),
          n !== v.GROUND && n !== v.AIR && n !== v.WALK && (this.oneShot = ``),
          n !== v.AIR && (this.grade = 0),
          (this.stillT = 0),
          (this.lastMode = n)),
        e.planted !== this.planted &&
          n === v.GROUND &&
          i === v.GROUND &&
          !o &&
          this.startOneShot(e.planted ? `plant` : `push-off`),
        (this.planted = e.planted));
      let c =
        (n === v.GROUND || n === v.MANUAL) &&
        (i === v.GROUND || i === v.MANUAL) &&
        !o;
      switch (
        ((this.flailPeak = c
          ? Math.max(e.speed, this.flailPeak - Ht * t)
          : e.speed),
        n === v.GROUND &&
          this.flailPeak >= 10 &&
          e.speed < this.flailPeak * Ut &&
          (this.startOneShot(`flail`), (this.flailPeak = e.speed)),
        this.oneShot &&
          ((this.oneShotT -= t), this.oneShotT <= 0 && (this.oneShot = ``)),
        n)
      ) {
        case v.AIR: {
          let t = r ? r.ticks / 30 : 0;
          if (
            r &&
            (r.kind === g.FLIP || r.kind === g.SPECIAL_AIR) &&
            e.trickT < t + 0.05
          ) {
            let n = this.play(r.clip, $.flip, s);
            (n &&
              ((n.time =
                Math.min(1, e.trickT / Math.max(t, 0.001)) *
                n.getClip().duration),
              (n.timeScale = 0)),
              (this.oneShot = ``));
          } else
            r && r.kind === g.GRAB && e.grabHeld
              ? (this.play(r.clip, $.grab), (this.oneShot = ``))
              : this.oneShot !== `ollie` && this.play(`air-idle`, $.air);
          break;
        }
        case v.GRIND:
          this.play(r?.clip || `grind-5050`, $.grind);
          break;
        case v.LIP:
          this.play(r?.clip || `lip-axle`, $.lip);
          break;
        case v.MANUAL:
          this.play(r?.clip || `manual`, $.manual);
          break;
        case v.WALLRIDE:
          this.play(`wallride`, $.wallride);
          break;
        case v.BAIL:
          (this.bail === Q.RAGDOLL || this.bailPending) &&
            (this.play(`bail`, $.bail),
            this.bail === Q.RAGDOLL &&
              e.modeT >= 42 / 30 - Pt &&
              this.ragdoll.grounded(0.25) &&
              (this.handOver(!1, e), this.startOneShot(this.upName)));
          break;
        case v.WALK:
          this.walk(e, t);
          break;
        default:
          this.ground(e, t);
      }
      ((n === v.GROUND || n === v.MANUAL) &&
        Math.abs(e.yaw - this.lastYaw) < 0.3 &&
        (this.rideYaw = e.yaw),
        (this.lastYaw = e.yaw));
      let l = this.bones.Hips,
        u = this.boardAnchor;
      for (let e of this.animQ) e.bone.quaternion.copy(e.q);
      (l.position.copy(this.animHips),
        u.position.copy(this.animBoardP),
        u.quaternion.copy(this.animBoardQ),
        this.mixer.update(t));
      for (let e of this.animQ) e.q.copy(e.bone.quaternion);
      (this.animHips.copy(l.position),
        this.animBoardP.copy(u.position),
        this.animBoardQ.copy(u.quaternion),
        this.poseBlend.apply(t),
        this.post(e, t));
    }
    ground(e, t) {
      if (!this.oneShot) {
        if (this.emote) {
          if (
            e.speed > 3.5 ||
            (this.fidget && (e.speed > 0.3 || e.crouch > 0.3 || this.accel > 1))
          )
            this.emote = ``;
          else if (this.posing(e, t)) return;
        }
        if (e.planted && e.crouch < 0.3) {
          this.play(`planted`, $.plant);
          return;
        }
        this.idle(e.speed < 0.15 && e.crouch < 0.3, `fidget`, t) ||
          (e.slide
            ? this.play(`powerslide`, $.slide)
            : this.kicking()
              ? this.play(`crouch`, $.kick)
              : e.crouch > 0.3
                ? this.play(`crouch`, $.crouch)
                : this.accel < -6 && e.speed > 0.8
                  ? this.play(`brake`, $.brake)
                  : this.accel > 3 && e.speed > 0.3 && e.speed < 10
                    ? this.play(e.fakie ? `push-fakie` : `push`, $.push)
                    : (this.curName.startsWith(`push`) && this.accel > 1) ||
                      this.play(`ride-idle`, $.ride));
      }
    }
    posing(e, t) {
      this.emoteT += t;
      let n = this.play(this.emote, $.emote)?.getClip(),
        r = !!n?.userData?.loop;
      return n &&
        (r
          ? this.emoteT <= n.duration * 3 || e.speed <= 0.2
          : this.emoteT <= n.duration)
        ? !0
        : ((this.emote = ``), !1);
    }
    idle(e, t, n) {
      return e
        ? ((this.stillT += n),
          this.stillT < this.fidgetAt
            ? !1
            : (this.playPose(t), (this.fidgetAt = Lt + Math.random() * 5), !0))
        : ((this.stillT = 0), (this.fidgetAt = It + Math.random() * 3), !1);
    }
    stepsOffBack(e) {
      return (
        e.mode === v.WALK &&
        (this.lastMode === v.GROUND || this.lastMode === v.MANUAL) &&
        Math.cos(e.yaw - this.rideYaw) < 0
      );
    }
    walk(e, t) {
      if (((this.bankTo = 0), this.oneShot)) return;
      let n = t > 0 ? (e.yaw - this.lastYaw) / t : 0,
        r = Math.abs(n) > 0.5;
      ue(e.yaw, e.ux, e.uy, e.uz, j);
      let i = e.vx * j.x + e.vz * j.z;
      (Math.abs(n) < 6 &&
        (this.bankTo = Math.max(-0.21, Math.min(Kt, (-0.2 * i * n) / 9.8))),
        this.curName === `walk-fall` && e.vy > -0.5 && (this.landPulse = 0.5));
      let a = e.vy >= -2 && Math.abs(i) <= 0.2 && !r;
      if (this.emote) {
        if (!a) this.emote = ``;
        else if (this.posing(e, t)) return;
      }
      if (!this.idle(a, `carry`, t)) {
        if (e.vy < -2) this.play(`walk-fall`, 0.12);
        else if (i > 0.2) {
          let e = this.play(`walk`, 0.15);
          e && (e.timeScale = Math.min(1.4, i / be.speed));
        } else if (i < -0.2) {
          let e = this.play(`walk-back`, 0.2);
          e && (e.timeScale = Math.min(1.4, -i / xe.speed));
        } else r ? this.play(`walk-turn`, 0.15) : this.play(`walk-idle`, 0.25);
      }
    }
    slideSwing(e, t) {
      e.slide && (this.slideSide = (this.goofy ? -1 : 1) * (e.fakie ? -1 : 1));
      let n = +!!e.slide;
      ((this.slideK += (n - this.slideK) * (1 - Math.exp(-t * (n ? 16 : 10)))),
        !(this.slideK < 0.001) &&
          this.root.quaternion.multiply(
            P.setFromAxisAngle(gt, this.slideSide * Vt * I(this.slideK)),
          ));
    }
    kicking() {
      return this.turn.size >= Rt;
    }
    post(e, t) {
      this.spin.update(this.boardFlip.quaternion, e, t);
      let n = this.bail !== Q.OFF || this.bailPending;
      (this.bailPending &&
        this.bailLean
          .set(this.leanX, 0, this.leanZ)
          .applyQuaternion(this.root.quaternion),
        n &&
          ((this.landPulse = 0),
          (this.popPulse = 0),
          (this.leanX = this.leanZ = this.wallK = 0),
          (this.fakieK = 0)),
        this.landPulse > this.landWas + 1e-6 && (this.squashT = 0));
      let r =
          Math.sin(this.landPulse * Math.PI * 0.5) *
          I(Math.min(1, this.squashT / Ft)),
        i = Math.sin(this.popPulse * Math.PI);
      (this.squash.scale.set(
        1 + 0.12 * r - 0.05 * i,
        1 - 0.18 * r + 0.1 * i,
        1 + 0.12 * r - 0.05 * i,
      ),
        (this.landPulse = Math.max(0, this.landPulse - t * 4.5)),
        (this.landWas = this.landPulse),
        (this.popPulse = Math.max(0, this.popPulse - t * 6)),
        (this.squashT += t));
      let a = e.mode === v.GRIND || e.mode === v.MANUAL || e.mode === v.LIP,
        o = 1 - Math.exp(-t * 10),
        s = a ? Math.max(-1, Math.min(1, e.bal)) : 0,
        c = e.mode === v.MANUAL;
      (pe(this.root.quaternion, e, F),
        (this.leanX += ((c ? -0.22 * s * F.z : Wt * s * F.x) - this.leanX) * o),
        (this.leanZ += ((c ? Gt * s * F.x : Wt * s * F.z) - this.leanZ) * o));
      let l = 0;
      if (
        (e.mode === v.WALLRIDE &&
          (P.copy(this.root.quaternion).invert(),
          F.set(0, 1, 0).applyQuaternion(P),
          (l = Math.max(
            -0.9,
            Math.min(0.9, -Math.atan2(F.x, Math.max(0.2, F.y)) * 0.55),
          ))),
        (this.wallK += (l - this.wallK) * o),
        (this.bank +=
          ((e.mode === v.WALK && !n ? this.bankTo : 0) - this.bank) *
          (1 - Math.exp(-t * 8))),
        this.lean.rotation.set(
          this.leanX,
          0,
          this.leanZ + this.wallK + this.bank,
        ),
        this.lean.position.set(0, 0, 0),
        this.kicking() && !n && e.mode !== v.WALK)
      ) {
        let t =
          Math.sin(Math.PI * this.turn.progress) *
          Math.min(1, this.turn.size / Math.PI);
        if (e.mode === v.GRIND) this.lean.position.y = Bt * t;
        else {
          let n = e.mode === v.MANUAL && !oe(e.trickId) ? 1 : -1,
            r = n * zt * t,
            i = (n * b.length) / 2;
          ((this.lean.rotation.x += r),
            this.lean.position.set(0, i * Math.sin(r), i * (1 - Math.cos(r))));
        }
      }
      let u = (Math.hypot(this.leanX, this.leanZ) / (c ? Gt : Wt)) * 0.45;
      u > 0.01 &&
        this.bones &&
        (this.bones.LeftArm.quaternion.premultiply(P.setFromAxisAngle(_t, u)),
        this.bones.RightArm.quaternion.premultiply(P.setFromAxisAngle(_t, -u)));
      let ee =
        e.fakie &&
        !e.slide &&
        this.curName !== `push-fakie` &&
        (e.mode === v.GROUND || e.mode === v.MANUAL || e.mode === v.GRIND)
          ? 1
          : 0;
      ((this.fakieK += (ee - this.fakieK) * (1 - Math.exp(-t * 6))),
        this.fakieK > 0.01 &&
          this.bones &&
          (this.bones.Head.quaternion.premultiply(
            P.setFromAxisAngle(gt, -1.3 * this.fakieK),
          ),
          this.bones.Chest.quaternion.premultiply(
            P.setFromAxisAngle(gt, -0.3 * this.fakieK),
          )),
        n && this.bailLayer(e, t),
        this.springs(t));
    }
    springs(e) {
      if (!this.jig.length || e <= 0) return;
      let t = Math.min(e, 1 / 30);
      (this.root.updateMatrixWorld(!0), L.copy(this.rig.matrixWorld).invert());
      for (let e of this.jig) {
        if (
          (M.multiplyMatrices(L, e.bone.matrixWorld).decompose(R, z, bt),
          xt.copy(e.dir).applyQuaternion(z).multiplyScalar(e.len).add(R),
          B.copy(xt).applyMatrix4(this.rig.matrixWorld),
          !e.init || e.p.distanceToSquared(B) > 1)
        ) {
          (e.p.copy(B), e.v.set(0, 0, 0), (e.init = !0));
          continue;
        }
        (F.copy(B)
          .sub(e.p)
          .multiplyScalar(e.stiff)
          .addScaledVector(e.v, -e.damp),
          e.v.addScaledVector(F, t),
          e.p.addScaledVector(e.v, t),
          V.copy(e.p).applyMatrix4(L).sub(R).normalize(),
          H.copy(xt).sub(R).normalize());
        let n = H.angleTo(V);
        (n > e.max && V.lerp(H, 1 - e.max / n).normalize(),
          St.setFromUnitVectors(H, V),
          Ct.copy(z).multiply(wt.copy(e.bone.quaternion).invert()),
          e.bone.quaternion.copy(Ct.invert().multiply(St).multiply(z)),
          e.bone.updateMatrixWorld(!0));
      }
    }
    startBail(e) {
      if (!this.boardMesh) return;
      let t = (this.ragdoll ??= new Ce()),
        n = (this.boardBody ??= new Se());
      (me.forEach((e, t) => {
        (this.boneBy
          .get(e.bone)
          .localToWorld(F.set(e.off[0], e.off[1], e.off[2])),
          (Z[t * 3] = F.x),
          (Z[t * 3 + 1] = F.y),
          (Z[t * 3 + 2] = F.z));
      }),
        ue(e.yaw, e.ux, e.uy, e.uz, j));
      let r = { x: e.ux, y: e.uy, z: e.uz },
        i = {
          x: e.uy * j.z - e.uz * j.y,
          y: e.uz * j.x - e.ux * j.z,
          z: e.ux * j.y - e.uy * j.x,
        },
        a = { x: e.vx, y: e.vy, z: e.vz },
        o = this.rig.matrixWorld.determinant() < 0 ? -1 : 1;
      t.start(Z, a, r, j, i, e.bal, o, this.col, e.y, void 0, this.bailLean);
      for (let e of ve) this.rdPose.q[e].copy(this.boneBy.get(e).quaternion);
      (n.start(
        this.boardMesh.matrixWorld,
        a,
        r,
        this.col,
        e.y,
        t.tune.rand,
        t.tune,
      ),
        (n.rider = t.body),
        (this.bail = Q.RAGDOLL),
        (this.upName = `getup`),
        (this.boardFree = !0),
        (this.hopWait = -1),
        (this.hopDur = 0),
        (this.bumpBody = this.bumpBoard = -1));
    }
    handOver(e, t) {
      ((this.bail = Q.BLEND), (this.blendT = 0));
      let n = this.ragdoll.tune;
      ((this.blendDur = e ? 0.12 : n.blend),
        (this.upName = e ? `getup` : this.layGetUp(t)),
        this.boardFree && (e ? this.startHop(!0) : (this.hopWait = n.hopWait)));
    }
    startHop(e = !1) {
      let t = this.ragdoll.tune;
      (this.boardBody.matrix(U).decompose(this.hop0P, this.hop0Q, K),
        this.boardHome(Tt).decompose(W, G, K));
      let n = this.hop0P.distanceTo(W);
      if (e || n > 5) {
        (n > 5 &&
          (this.bump(this.hop0P.x, this.hop0P.y, this.hop0P.z, 1, `pop`),
          this.bump(W.x, W.y, W.z, 1, `pop`)),
          this.resetBoard());
        return;
      }
      ((this.hopT = 0),
        (this.hopDur = t.hop),
        (this.hopH = Math.min(1, t.hopHeight + 0.1 * n)),
        (this.hopTurns = +(n > 1.2)));
    }
    layGetUp(e) {
      let t = this.ragdoll.body.lerped();
      q.set(e.ux, e.uy, e.uz);
      let n = y.PELVIS * 3,
        r = y.NECK * 3,
        i = y.CHEST * 3,
        a = y.STERNUM * 3;
      if (
        (J.set(t[r] - t[n], t[r + 1] - t[n + 1], t[r + 2] - t[n + 2]),
        J.addScaledVector(q, -J.dot(q)),
        J.lengthSq() < 0.1 * 0.1)
      )
        return `getup`;
      let o =
          (t[a] - t[i]) * q.x +
            (t[a + 1] - t[i + 1]) * q.y +
            (t[a + 2] - t[i + 2]) * q.z <
          0
            ? `getup-front`
            : `getup-back`,
        s = Mt(this.assets.clips.get(o));
      if (!s) return `getup`;
      if (
        (this.root.updateMatrixWorld(!0),
        Y.copy(s.spine).transformDirection(this.rig.matrixWorld),
        Y.addScaledVector(q, -Y.dot(q)),
        Y.lengthSq() < 1e-6)
      )
        return o;
      let c = Math.atan2(X.crossVectors(Y, J).dot(q), Y.dot(J));
      return (
        Y.copy(s.hips)
          .applyMatrix4(this.rig.matrixWorld)
          .sub(this.root.position)
          .applyAxisAngle(q, c),
        X.set(t[n], t[n + 1], t[n + 2])
          .sub(this.root.position)
          .sub(Y),
        X.addScaledVector(q, -X.dot(q)),
        (this.upYaw0 = this.upYaw + c),
        this.upPos0.copy(this.upPos).add(X),
        (this.upT = 0),
        this.easeUp(0),
        o
      );
    }
    easeUp(e) {
      if (this.upT < 0) return;
      this.upT += e;
      let t = this.upT < At ? 1 : 1 - I(Math.min(1, (this.upT - At) / jt));
      ((this.upYaw = this.upYaw0 * t),
        this.upPos.copy(this.upPos0).multiplyScalar(t),
        t === 0 && (this.upT = -1));
    }
    stopBail() {
      ((this.bail = Q.OFF),
        (this.bailPending = !1),
        (this.upT = -1),
        (this.upYaw = 0),
        this.upPos.set(0, 0, 0),
        this.resetBoard());
    }
    resetBoard() {
      ((this.boardFree = !1), (this.hopWait = -1), (this.hopDur = 0));
      let e = this.boardMesh;
      e &&
        (e.position.set(0, -b.flipPivotY, 0),
        e.quaternion.identity(),
        e.scale.set(1, 1, 1));
    }
    boardHome(e) {
      return e.multiplyMatrices(this.boardFlip.matrixWorld, Nt);
    }
    bailLayer(e, t) {
      if (
        (this.root.updateMatrixWorld(!0),
        this.bailPending &&
          ((this.bailPending = !1), this.startBail(e), this.bail === Q.OFF))
      )
        return;
      let n = this.ragdoll;
      if (
        ((this.clock += t),
        n.target.set(e.x + e.ux * 0.15, e.y + e.uy * 0.15, e.z + e.uz * 0.15),
        n.targetV.set(e.vx, e.vy, e.vz),
        n.gap() > 3)
      ) {
        this.stopBail();
        return;
      }
      (n.step(t),
        this.boardFree && this.hopDur === 0 && this.boardBody.step(t),
        this.bumps(),
        L.copy(this.rig.matrixWorld).invert(),
        n.pose(L, this.rdPose));
      let r =
        this.bail === Q.BLEND ? I(Math.min(1, this.blendT / this.blendDur)) : 0;
      for (let e of ve) {
        let t = this.boneBy.get(e).quaternion;
        (P.copy(t), t.copy(this.rdPose.q[e]).slerp(P, r));
      }
      let i = this.bones.Hips.position;
      (F.copy(i),
        i.copy(this.rdPose.hips).lerp(F, r),
        this.placeBoard(t),
        this.bail === Q.BLEND &&
          ((this.blendT += t),
          this.blendT >= this.blendDur &&
            !this.boardFree &&
            (this.bail = Q.OFF)));
    }
    placeBoard(e) {
      let t = this.boardMesh;
      if (
        t &&
        this.boardFree &&
        !(
          this.hopWait >= 0 &&
          (this.hopWait -= e) < 0 &&
          (this.startHop(), !this.boardFree)
        )
      ) {
        if (this.hopDur === 0) this.boardBody.matrix(U);
        else {
          this.hopT += e;
          let t = I(Math.min(1, this.hopT / this.hopDur));
          if (t >= 1) {
            this.resetBoard();
            return;
          }
          (this.boardHome(Tt).decompose(W, G, K),
            W.lerpVectors(this.hop0P, W, t),
            (W.y += 4 * t * (1 - t) * this.hopH),
            G.slerpQuaternions(this.hop0Q, G, t).multiply(
              St.setFromAxisAngle(_t, Math.PI * 2 * this.hopTurns * t),
            ),
            U.compose(W, G, K));
        }
        M.copy(this.boardFlip.matrixWorld)
          .invert()
          .multiply(U)
          .decompose(t.position, t.quaternion, t.scale);
      }
    }
    bumps() {
      let e = this.ragdoll.body,
        t = this.boardBody.body;
      if (e.impact > 3 && this.clock - this.bumpBody > 0.12) {
        let t = e.impactAt * 3;
        (this.bump(
          e.p[t],
          e.p[t + 1] - e.r[e.impactAt],
          e.p[t + 2],
          Math.min(1, e.impact / 9),
          `body`,
        ),
          (this.bumpBody = this.clock));
      }
      if (this.boardFree && t.impact > 2 && this.clock - this.bumpBoard > 0.1) {
        let e = t.impactAt * 3;
        (this.bump(
          t.p[e],
          t.p[e + 1] - t.r[t.impactAt],
          t.p[e + 2],
          Math.min(1, t.impact / 7),
          `board`,
        ),
          (this.bumpBoard = this.clock));
      }
      ((e.impact = 0), (t.impact = 0));
    }
    bump(e, t, n, r, i) {
      he.bump?.(e, t, n, r, i, this);
    }
    debugPose(e, t) {
      if (!this.mixer) return;
      (this.stopBail(),
        this.spin.reset(),
        this.poseBlend?.cut(),
        this.boardFlip.quaternion.identity(),
        this.squash.scale.set(1, 1, 1),
        this.lean.rotation.set(0, 0, 0),
        (this.cur = null),
        (this.curName = ``));
      for (let e of this.actions.values()) e.stop();
      let n = this.actions.get(e);
      n &&
        (n.reset().play(),
        (n.time = Math.min(t, n.getClip().duration)),
        (n.weight = 1),
        this.mixer.update(0));
    }
  };
