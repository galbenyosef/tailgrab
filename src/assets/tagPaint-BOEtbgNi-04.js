// assets/tagPaint-BOEtbgNi 04 — smoothms
// Lines 1129-2282 of readable/assets/tagPaint-BOEtbgNi.pretty.js (statement-aligned).
var Gt = class n {
  static get(e, t = {}) {
    return new n(e, t);
  }
  callbacks;
  sessionSource;
  slotBuf = new Float64Array(2624);
  slotCount = 0;
  slotDetach = [];
  slotAngle = [];
  freeSlots = [];
  slotByRef = new Map();
  simByRef = new Map();
  boundBySlot = new Map();
  boundProfileIdx = -1;
  renderTime = 0;
  defaultMode;
  reckonDefaults;
  clock;
  useRenderClock = !1;
  fixedStepMs;
  stepAcc = 0;
  lastFrameNow = -1;
  static MAX_STEPS_PER_FRAME = 5;
  profileBuf = new Float64Array(56);
  profileCount = 0;
  profileKeys = new Map();
  profileLabels = [];
  profileComputers = [];
  trackListeners = [];
  name;
  disposeListeners = [];
  driven = [];
  constructor(t, n) {
    ((this.callbacks = e.get(t)), (this.sessionSource = t));
    let { clock: r, ...i } = n;
    this.defaultMode = i.mode ?? `lerp`;
    let a = this.defaultMode !== `reckon` && this.defaultMode !== `raw`,
      o = a
        ? (() => {
            let e = i;
            return {
              mode: e.mode ?? N.mode,
              delay: e.delay ?? N.delay,
              smoothMs: e.smoothMs ?? N.smoothMs,
              maxExtrapolate: e.maxExtrapolate ?? N.maxExtrapolate,
              tickInterval: e.tickInterval ?? N.tickInterval,
              snap: e.snap ?? N.snap,
              angle: e.angle ?? N.angle,
            };
          })()
        : { ...N },
      l = a ? (i.smoothMs ?? 0) : 0;
    if (
      this.allocProfile(
        this.defaultMode,
        o.delay,
        o.smoothMs,
        l,
        o.maxExtrapolate,
        o.tickInterval,
        o.snap,
        !1,
      ) !== M
    )
      throw Error(`Predict: defaults profile must be at index 0`);
    if (this.defaultMode === `reckon`) {
      let e = i;
      this.reckonDefaults = {
        step: e.step,
        smoothMs: e.smoothMs ?? Bt.smoothMs,
        substep: e.substep ?? Bt.substep,
        snap: e.snap ?? Bt.snap,
      };
    } else this.reckonDefaults = { ...Bt };
    ((this.clock = r ?? t.clock ?? void 0),
      (this.useRenderClock = i.renderPresent !== !1),
      this.clock === c && Wt(),
      (this.name = i.name ?? `predict#${++Ht}`),
      s(`predict`, this.makeCoreHandle()));
  }
  get mode() {
    return this.defaultMode;
  }
  presentFn() {
    let e = this.clock;
    if (e)
      return this.useRenderClock && e.renderNow
        ? e.renderNow.bind(e)
        : e.serverNow.bind(e);
  }
  makeCoreHandle() {
    return {
      name: this.name,
      mode: () => this.defaultMode,
      smoothingDefaults: () => this.readSmoothingDefaults(),
      reckonDefaults: () => ({ ...this.reckonDefaults }),
      reconcilers: () => this.snapshotReconcilers(),
      attachedCount: () => this.slotByRef.size,
      setDefaults: (e) => this.setDefaults(e),
      profiles: () => this.snapshotProfiles(),
      setProfile: (e, t) => this.setProfile(e, t),
      onTrack: (e) => (
        this.trackListeners.push(e),
        () => {
          let t = this.trackListeners.indexOf(e);
          t >= 0 && this.trackListeners.splice(t, 1);
        }
      ),
      onDispose: (e) => (
        this.disposeListeners.push(e),
        () => {
          let t = this.disposeListeners.indexOf(e);
          t >= 0 && this.disposeListeners.splice(t, 1);
        }
      ),
    };
  }
  snapshotReconcilers() {
    let e = [],
      t = 0;
    for (let n of this.driven) {
      let r = n;
      if (!r.drift) continue;
      let i = r.warnTolerance;
      e.push({
        label: `reconciler #${t++}`,
        status: $e(r.drift, i),
        severity: i !== void 0 && i > 0 ? r.drift.ema / i : void 0,
        ema: r.drift.ema,
        peak: r.drift.peak,
        lastCorrectionMag: r.lastCorrectionMag ?? 0,
        reconcileSeq: r.reconcileSeq ?? 0,
      });
    }
    return e;
  }
  readSmoothingDefaults() {
    let e = this.profileBuf,
      t = e[0] | 0;
    return {
      mode:
        t === Nt
          ? `lerp`
          : t === Pt
            ? `extrapolate`
            : t === Ft
              ? `damped`
              : t === It
                ? `reckon`
                : `raw`,
      delay: e[1],
      smoothMs: e[2],
      lerpSmoothMs: e[6],
      maxExtrapolate: e[3],
      tickInterval: e[4],
      snap: e[5],
    };
  }
  allocProfile(e, t, n, r, i, a, o, s, c) {
    let l = typeof e == `number` ? e : zt[e],
      u = ``;
    if (s) {
      u = `${c ?? ``}|${l}|${t}|${n}|${r}|${i}|${a}|${o}`;
      let e = this.profileKeys.get(u);
      if (e !== void 0) return e;
    }
    let d = this.profileCount++;
    if ((d + 1) * j > this.profileBuf.length) {
      let e = new Float64Array(this.profileBuf.length * 2);
      (e.set(this.profileBuf), (this.profileBuf = e));
    }
    let f = d * j;
    return (
      (this.profileBuf[f + Et] = l),
      (this.profileBuf[f + Dt] = t),
      (this.profileBuf[f + Ot] = n),
      (this.profileBuf[f + Mt] = r),
      (this.profileBuf[f + kt] = i),
      (this.profileBuf[f + At] = a),
      (this.profileBuf[f + jt] = o),
      (this.profileLabels[d] = c),
      (this.profileComputers[d] = this.computerForMode(l)),
      s && this.profileKeys.set(u, d),
      d
    );
  }
  computerForMode(e) {
    return e === Nt
      ? this.computeLerp
      : e === Pt
        ? this.computeExtrapolate
        : e === Ft
          ? this.computeDamped
          : e === It
            ? this.computeReckon
            : e === Rt
              ? this.computeBound
              : this.computeRaw;
  }
  profileFromOpts(e) {
    if (
      e.mode === void 0 &&
      e.delay === void 0 &&
      e.smoothMs === void 0 &&
      e.maxExtrapolate === void 0 &&
      e.tickInterval === void 0 &&
      e.snap === void 0
    )
      return M;
    let t = this.readSmoothingDefaults(),
      n = e.mode ?? t.mode,
      r = e.delay ?? t.delay,
      i = e.smoothMs ?? t.smoothMs,
      a = e.smoothMs ?? t.lerpSmoothMs,
      o = e.maxExtrapolate ?? t.maxExtrapolate,
      s = e.tickInterval ?? t.tickInterval,
      c = e.snap ?? t.snap;
    return n === t.mode &&
      r === t.delay &&
      i === t.smoothMs &&
      a === t.lerpSmoothMs &&
      o === t.maxExtrapolate &&
      s === t.tickInterval &&
      c === t.snap
      ? M
      : this.allocProfile(n, r, i, a, o, s, c, !0);
  }
  groupProfile(e, t) {
    let n = this.readSmoothingDefaults(),
      r = e.mode ?? this.defaultMode;
    return this.allocProfile(
      r,
      e.delay ?? n.delay,
      e.smoothMs ?? n.smoothMs,
      e.smoothMs ?? n.lerpSmoothMs,
      e.maxExtrapolate ?? n.maxExtrapolate,
      e.tickInterval ?? n.tickInterval,
      e.snap ?? n.snap,
      !0,
      t,
    );
  }
  setDefaults(e) {
    let t = e.mode;
    if (t !== void 0) {
      this.defaultMode = t;
      let e = zt[t];
      ((this.profileBuf[0] = e),
        (this.profileComputers[M] = this.computerForMode(e)));
    }
    let n = e,
      r = this.profileBuf;
    (n.delay !== void 0 && (r[1] = n.delay),
      n.smoothMs !== void 0 && ((r[2] = n.smoothMs), (r[6] = n.smoothMs)),
      n.maxExtrapolate !== void 0 && (r[3] = n.maxExtrapolate),
      n.tickInterval !== void 0 && (r[4] = n.tickInterval),
      n.snap !== void 0 &&
        ((r[5] = n.snap), (this.reckonDefaults.snap = n.snap)));
    let i = e;
    (i.step !== void 0 && (this.reckonDefaults.step = i.step),
      i.smoothMs !== void 0 && (this.reckonDefaults.smoothMs = i.smoothMs),
      i.substep !== void 0 && (this.reckonDefaults.substep = i.substep));
  }
  snapshotProfiles() {
    let e = [];
    for (let t = 0; t < this.profileCount; t++) {
      let n = t * j,
        r = this.profileBuf[n + Et] | 0;
      if (r === Rt) continue;
      let i =
        r === Nt
          ? `lerp`
          : r === Pt
            ? `extrapolate`
            : r === Ft
              ? `damped`
              : r === It
                ? `reckon`
                : `raw`;
      e.push({
        id: t,
        isDefault: t === M,
        label: this.profileLabels[t],
        mode: i,
        delay: this.profileBuf[n + Dt],
        smoothMs: this.profileBuf[n + (r === Nt ? Mt : Ot)],
        maxExtrapolate: this.profileBuf[n + kt],
        tickInterval: this.profileBuf[n + At],
        snap: this.profileBuf[n + jt],
      });
    }
    return e;
  }
  setProfile(e, t) {
    if (e < 0 || e >= this.profileCount) return;
    let n = e * j,
      r = this.profileBuf;
    if ((r[n + Et] | 0) !== Rt) {
      if (t.mode !== void 0) {
        let i = zt[t.mode];
        ((r[n + Et] = i),
          (this.profileComputers[e] = this.computerForMode(i)),
          e === M && (this.defaultMode = t.mode));
      }
      (t.delay !== void 0 && (r[n + Dt] = t.delay),
        t.smoothMs !== void 0 &&
          ((r[n + Ot] = t.smoothMs), (r[n + Mt] = t.smoothMs)),
        t.maxExtrapolate !== void 0 && (r[n + kt] = t.maxExtrapolate),
        t.tickInterval !== void 0 && (r[n + At] = t.tickInterval),
        t.snap !== void 0 && (r[n + jt] = t.snap));
    }
  }
  dispose() {
    for (let e of new Set([...this.slotByRef.keys(), ...this.simByRef.keys()]))
      this.detachByRef(e);
    this.trackListeners.length = 0;
    for (let e of this.driven.splice(0)) e.dispose?.();
    for (let e of this.disposeListeners.splice(0)) e();
  }
  track(e, t, n = {}) {
    return this.trackWithProfile(e, t, this.profileFromOpts(n), n.angle ?? !1);
  }
  trackWithProfile(e, t, n, r = !1) {
    let i = _(e);
    if (i === void 0)
      throw Error(
        `Predict.track(): instance has no refId — track/attach must run AFTER the decoder delivers the instance (e.g. inside onAdd).`,
      );
    let a = h(e, t),
      o = e[t] ?? 0,
      s,
      c = this.slotByRef.get(i)?.get(t);
    c !== void 0 &&
      ((s = this.boundBySlot.get(c)),
      s === void 0 ? this.untrackSlot(i, t) : this.freeStash(s));
    let l = this.allocSlot(),
      u = this.slotBuf,
      d = l * A;
    if (
      ((u[d + E] = o),
      (u[d + D] = o),
      (u[d + O] = performance.now()),
      (u[d + xt] = o),
      (u[d + k] = n),
      (u[d + _t] = i),
      (u[d + vt] = a),
      (u[d + yt] = 0),
      (u[d + bt] = 0),
      (this.slotAngle[l] = r),
      s !== void 0)
    )
      s.stash = l;
    else {
      let e = this.slotByRef.get(i);
      (e === void 0 && ((e = new Map()), this.slotByRef.set(i, e)),
        e.set(t, l));
    }
    for (let e = 0; e < this.trackListeners.length; e++)
      this.trackListeners[e](n, t);
    let f = this.callbacks.listen(
      e,
      t,
      (e) => {
        let t =
            this.clock && this.clock.lastServerTime() > 0
              ? this.clock.lastServerTime()
              : performance.now(),
          n = this.slotBuf,
          i = l * A;
        if (r) {
          let t = n[i + E];
          e = t + Math.atan2(Math.sin(e - t), Math.cos(e - t));
        }
        let a = (n[i + k] | 0) * j,
          o = this.profileBuf[a + At],
          s = n[i + yt] | 0,
          c = n[i + bt] | 0,
          u = this.profileBuf[a + jt];
        u > 0 &&
          c > 0 &&
          Math.abs(e - n[i + E]) > u &&
          ((s = 0), (c = 0), (n[i + D] = e), (n[i + xt] = e));
        let d = c === 0 ? -1 / 0 : n[i + St + (s === 0 ? 15 : s - 1) * 2],
          f = t;
        if (o > 0 && isFinite(d)) {
          let e = t - d;
          f = d + (e > 0 ? Math.max(1, Math.round(e / o)) : 1) * o;
          let n = t + o;
          f > n && (f = n);
        }
        n[i + E] = e;
        let p = i + St;
        if (c >= 2 && isFinite(d)) {
          let e = s === 0 ? 15 : s - 1,
            t = d - n[p + (e === 0 ? 15 : e - 1) * 2],
            r = this.clock?.patchInterval ? this.clock.patchInterval() : 0,
            i = r > 0 ? r : t,
            a = r > 0 ? wt * r : Ct * t;
          if (i > 0 && f - d > a) {
            let t = i < Tt ? i : Tt,
              r = p + s * 2;
            ((n[r] = f - t),
              (n[r + 1] = n[p + e * 2 + 1]),
              (s = s + 1 >= T ? 0 : s + 1),
              c < T && c++);
          }
        }
        let m = p + s * 2;
        ((n[m] = f),
          (n[m + 1] = e),
          (n[i + yt] = s + 1 >= T ? 0 : s + 1),
          c < T && (n[i + bt] = c + 1));
      },
      !0,
    );
    return ((this.slotDetach[l] = f), () => this.untrackSlot(i, t));
  }
  untrack(e, t) {
    let n = _(e);
    n !== void 0 && this.untrackSlot(n, t);
  }
  untrackSlot(e, t) {
    let n = this.slotByRef.get(e),
      r = n?.get(t);
    if (r === void 0) return;
    let i = this.boundBySlot.get(r);
    if (i !== void 0) {
      this.freeStash(i);
      return;
    }
    (this.slotDetach[r]?.(),
      (this.slotDetach[r] = void 0),
      this.freeSlots.push(r),
      n.delete(t),
      n.size === 0 && this.slotByRef.delete(e));
  }
  freeStash(e) {
    e.stash < 0 ||
      (this.slotDetach[e.stash]?.(),
      (this.slotDetach[e.stash] = void 0),
      this.freeSlots.push(e.stash),
      (e.stash = -1));
  }
  allocSlot() {
    if (this.freeSlots.length > 0) return this.freeSlots.pop();
    let e = this.slotCount++;
    if ((e + 1) * A > this.slotBuf.length) {
      let e = new Float64Array(this.slotBuf.length * 2);
      (e.set(this.slotBuf), (this.slotBuf = e));
    }
    return e;
  }
  registerBound(e, t, n, r, i) {
    let a = _(t),
      o = this.slotByRef.get(a);
    o === void 0 && ((o = new Map()), this.slotByRef.set(a, o));
    let s = [];
    for (let c = 0; c < n.length; c++) {
      let l = n[c],
        u = o.get(l),
        d = -1;
      if (u !== void 0) {
        let e = this.boundBySlot.get(u);
        e === void 0
          ? (d = u)
          : (console.warn(
              `@colyseus/sdk Predict: "${l}" (refId ${a}) is already bound to a controller — the newer registration wins.`,
            ),
            (d = e.stash),
            this.boundBySlot.delete(u),
            this.freeSlots.push(u));
      }
      let f = this.allocSlot(),
        p = this.slotBuf,
        m = f * A,
        g = t[l] ?? 0;
      ((p[m + E] = g),
        (p[m + D] = g),
        (p[m + O] = 0),
        (p[m + xt] = g),
        (p[m + k] = i),
        (p[m + _t] = a),
        (p[m + vt] = h(t, l)),
        (p[m + yt] = 0),
        (p[m + bt] = 0),
        (this.slotAngle[f] = !1),
        this.boundBySlot.set(f, { ctrl: e, key: r[c], stash: d }),
        o.set(l, f),
        s.push(f));
      for (let e = 0; e < this.trackListeners.length; e++)
        this.trackListeners[e](i, l);
    }
    return () => {
      for (let t = 0; t < s.length; t++) {
        let r = s[t],
          i = this.boundBySlot.get(r);
        if (i === void 0 || i.ctrl !== e) continue;
        (this.boundBySlot.delete(r), this.freeSlots.push(r));
        let o = this.slotByRef.get(a);
        o?.get(n[t]) === r &&
          (i.stash >= 0
            ? o.set(n[t], i.stash)
            : (o.delete(n[t]), o.size === 0 && this.slotByRef.delete(a)));
      }
    };
  }
  installBoundOverlay(e) {
    let t = [];
    for (let n of e.boundRegistrations)
      n.fields.length !== 0 &&
        _(n.source) !== void 0 &&
        (this.boundProfileIdx < 0 &&
          (this.boundProfileIdx = this.allocProfile(
            Rt,
            0,
            0,
            0,
            0,
            0,
            0,
            !1,
            `bound`,
          )),
        t.push(
          this.registerBound(
            e,
            n.source,
            n.fields,
            n.poseKeys,
            this.boundProfileIdx,
          ),
        ));
    t.length > 0 &&
      e.onDisposed(() => {
        for (let e of t) e();
      });
  }
  trackStepped(e, t) {
    let n = t.substep ?? 16,
      a = t.fields,
      o = a.map((t) => h(e, t)),
      s = t.step,
      c = this.clock,
      l = this.presentFn(),
      u =
        t.forwardMs ??
        (l
          ? () => {
              let e = c.lastServerTime();
              return e > 0 ? Math.max(0, l() - e) : 0;
            }
          : () => 0),
      d = t.elapsedMs ?? l ?? (() => performance.now()),
      p = e[f],
      m =
        t.snapshot === void 0 &&
        Array.isArray(p) &&
        o.every((e) => e >= 0 && e < p.length),
      g;
    if (m) {
      let t = new e.constructor(),
        r = t[f];
      g = (e, i, a, c) => {
        let l = e[f];
        for (let e = 0; e < l.length; e++) r[e] = l[e];
        let u = i,
          d = c - i;
        for (; u > 0;) {
          let e = u < n ? u : n;
          ((d += e), s(t, e / 1e3, d), (u -= e));
        }
        for (let e = 0; e < o.length; e++) a[e] = r[o[e]];
      };
    } else {
      let o = i(e),
        c = t.snapshot ?? (o.length > 0 ? r(o) : (e) => ({ ...e })),
        l = [...a];
      g = (e, t, r, i) => {
        let a = c(e),
          o = t,
          u = i - t;
        for (; o > 0;) {
          let e = o < n ? o : n;
          ((u += e), s(a, e / 1e3, u), (o -= e));
        }
        for (let e = 0; e < l.length; e++) r[e] = a[l[e]];
      };
    }
    return this.trackSimulated(e, {
      fields: a,
      forwardMs: u,
      elapsedMs: d,
      smoothMs: t.smoothMs,
      snap: t.snap,
      advance: g,
    });
  }
  trackSimulated(e, t) {
    let n = _(e);
    if (n === void 0)
      throw Error(
        `Predict.trackStepped(): instance has no refId — must run AFTER the decoder delivers the instance (e.g. inside onAdd).`,
      );
    let r = t.fields,
      i = r.length,
      a = r.map((t) => h(e, t)),
      o = 0;
    for (let e of a) e > o && (o = e);
    let s = new Int8Array(o + 1).fill(-1);
    for (let e = 0; e < i; e++) a[e] >= 0 && (s[a[e]] = e);
    let c = new Float64Array(i);
    for (let t = 0; t < i; t++) c[t] = e[r[t]] ?? 0;
    let l = this.presentFn(),
      u = t.elapsedMs ?? l ?? (() => performance.now()),
      d = {
        instance: e,
        fieldIds: a,
        posOf: s,
        forwardMs: t.forwardMs,
        elapsedMs: u,
        advance: t.advance,
        smoothMs: t.smoothMs ?? 50,
        snap: t.snap ?? 0,
        smoothed: c,
        out: new Float64Array(i),
        valueOut: new Float64Array(i),
        offset: new Float64Array(i),
        outPrev: new Float64Array(i),
        frameVel: new Float64Array(i),
        lastBaseT: NaN,
        lastApplyTime: -1 / 0,
      };
    return (this.simByRef.set(n, d), () => this.untrackSimulated(n));
  }
  untrackSimulated(e) {
    this.simByRef.delete(e);
  }
  attach(e, t) {
    let n = this.makeGroup(`(attach)`, t);
    return this.attachWithPlan(e, this.planFor(n, e));
  }
  makeGroup(e, t) {
    return {
      label: e,
      config: t,
      basePlan: this.buildGroupPlan(t, e),
      planByCtor: new Map(),
    };
  }
  planFor(e, t) {
    let n = t.constructor,
      r = e.planByCtor.get(n);
    return (
      r === void 0 &&
        ((r = this.resolveCtorPlan(e, t)), e.planByCtor.set(n, r)),
      r
    );
  }
  resolveCtorPlan(e, t) {
    let n = l(t),
      r = t.constructor?.name || `?`,
      i = e.config;
    if (!Vt(i)) {
      if (n === void 0) return e.basePlan;
      let t = Object.keys(i).filter((e) => i[e] !== void 0);
      if (t.every((e) => typeof n[e] == `number`)) return e.basePlan;
      let a = {};
      for (let e of t) typeof n[e] == `number` && (a[e] = i[e]);
      return this.buildGroupPlan(a, `${e.label}:${r}`);
    }
    let a = i,
      o = a.fields;
    if (n !== void 0) {
      let e = o.filter((e) => typeof n[e] == `number`);
      e.length !== o.length && (o = e);
    }
    return o === a.fields
      ? e.basePlan
      : this.buildGroupPlan({ ...a, fields: o }, `${e.label}:${r}`);
  }
  buildGroupPlan(e, t) {
    let n = [];
    if (Vt(e)) {
      let r = e;
      if (!Array.isArray(r.fields))
        throw Error("Predict.attach(): `fields` must be a numeric-key array.");
      let i = r.mode ?? this.defaultMode,
        a = r.step ?? this.reckonDefaults.step,
        o = i === `reckon`;
      if (o && typeof a != `function`)
        throw Error(
          "Predict.attach(): reckon mode requires a 'step' function. Either pass `step` in the attach config OR construct the Predict with `Predict.get(room, { mode: 'reckon', step: yourStepFn })` so it can be inherited.",
        );
      let s = this.groupProfile(
        { mode: i, snap: r.snap, smoothMs: r.smoothMs },
        t,
      );
      for (let e of r.fields)
        n.push({ field: e, profileIdx: s, angle: r.angle });
      return {
        label: t,
        isReckon: o,
        reckonFields: o ? r.fields : void 0,
        reckonStep: o ? a : void 0,
        reckonSmoothMs: r.smoothMs ?? this.reckonDefaults.smoothMs,
        reckonSubstep: r.substep ?? this.reckonDefaults.substep,
        reckonSnap: r.snap ?? this.reckonDefaults.snap,
        reckonSnapshot: r.snapshot,
        fieldProfiles: n,
      };
    }
    let r = e;
    for (let e of Object.keys(r)) {
      let i = r[e];
      if (i === void 0) continue;
      let a = typeof i == `string` ? { mode: i } : i;
      n.push({ field: e, profileIdx: this.groupProfile(a, t), angle: a.angle });
    }
    return { label: t, isReckon: !1, fieldProfiles: n };
  }
  attachToGroup(e, t, n) {
    let r = [];
    t.isReckon &&
      r.push(
        this.trackStepped(e, {
          fields: t.reckonFields,
          step: t.reckonStep,
          smoothMs: t.reckonSmoothMs,
          substep: t.reckonSubstep,
          snap: t.reckonSnap,
          snapshot: t.reckonSnapshot,
          forwardMs: n,
        }),
      );
    for (let { field: n, profileIdx: i, angle: a } of t.fieldProfiles)
      r.push(this.trackWithProfile(e, n, i, !!a));
    return () => {
      for (let e of r) e();
    };
  }
  attachWithPlan(e, t) {
    let n = _(e);
    if (n === void 0)
      throw Error(
        `Predict.attach(): instance has no refId — attach must run AFTER the decoder delivers the instance (e.g. inside onAdd).`,
      );
    return (this.attachToGroup(e, t), () => this.detachByRef(n));
  }
  detach(e) {
    let t = _(e);
    t !== void 0 && this.detachByRef(t);
  }
  detachByRef(e) {
    let t = this.slotByRef.get(e);
    if (t) {
      for (let n of [...t.keys()]) {
        let r = t.get(n);
        if (r === void 0) continue;
        let i = this.boundBySlot.get(r);
        i === void 0
          ? this.untrackSlot(e, n)
          : (this.freeStash(i),
            this.boundBySlot.delete(r),
            this.freeSlots.push(r),
            t.delete(n));
      }
      t.size === 0 && this.slotByRef.delete(e);
    }
    this.simByRef.delete(e);
  }
  attachAll(...e) {
    let t = typeof e[0] == `string`,
      n = t ? void 0 : e[0],
      r = t ? e[0] : e[1],
      i = t ? e[1] : e[2],
      a = this.makeGroup(r, i),
      o = new Set(),
      s = (e) => {
        (this.attachWithPlan(e, this.planFor(a, e)), o.add(e));
      },
      c = (e) => {
        (o.delete(e), this.detach(e));
      },
      l = t ? this.callbacks.onAdd(r, s) : this.callbacks.onAdd(n, r, s),
      u = t ? this.callbacks.onRemove(r, c) : this.callbacks.onRemove(n, r, c);
    return () => {
      (l?.(), u?.());
      for (let e of o) this.detach(e);
      o.clear();
    };
  }
  tick(e = performance.now()) {
    this.renderTime = e;
    let t = 0,
      r = this.fixedStepMs;
    if (r !== void 0 && r > 0) {
      let i = this.lastFrameNow < 0 ? 0 : e - this.lastFrameNow;
      ((this.stepAcc += i),
        (t = Math.floor(this.stepAcc / r)),
        t > n.MAX_STEPS_PER_FRAME
          ? ((this.stepAcc = 0), (t = n.MAX_STEPS_PER_FRAME))
          : (this.stepAcc -= t * r));
    }
    this.lastFrameNow = e;
    let i = this.driven,
      a = 0;
    for (let t = 0; t < i.length; t++) {
      let n = i[t];
      n.dead || (n.tick?.(e), n.prune?.(), a !== t && (i[a] = n), a++);
    }
    return (a !== i.length && (i.length = a), t);
  }
  defineEvent(e) {
    let { confirmOn: t, ...n } = e,
      r = new dt(n, this.clock ?? null);
    if (t !== void 0) {
      if (t.mine !== void 0 && typeof this.sessionSource.sessionId != `string`)
        throw Error(
          `Predict.defineEvent: confirmOn.mine ("${t.mine}") requires a Predict built from a Room (it compares against room.sessionId); confirm manually instead.`,
        );
      r._addTeardown(
        gt(this.callbacks, r, t, () => this.sessionSource.sessionId),
      );
    }
    return (this.driven.push(r), r);
  }
  spawns(e, t = {}) {
    let n = new ft(t, this.clock ?? null),
      r = t.fields,
      i = t.step,
      a =
        r !== void 0 && i !== void 0
          ? this.makeGroup(String(e), {
              mode: `reckon`,
              fields: r,
              step: i,
              smoothMs: t.smoothMs ?? 0,
              substep: t.substep,
            })
          : void 0,
      o = a === void 0 ? void 0 : new Map(),
      s = this.clock;
    return (
      n.attach((t, r) => {
        let i = this.callbacks.onAdd(e, (e, r) => {
            if ((t(e, r), a === void 0 || o.has(e))) return;
            let i = n.entryFor(e)?.leadMs ?? 0,
              c = s
                ? () => {
                    let e = s.lastServerTime(),
                      t = e > 0 ? Math.max(0, s.serverNow() - e) : 0;
                    return Math.max(0, t + i);
                  }
                : () => Math.max(0, i);
            o.set(e, this.attachToGroup(e, this.planFor(a, e), c));
          }),
          c = this.callbacks.onRemove(e, (e, t) => {
            (o?.get(e)?.(), o?.delete(e), r(e, t));
          });
        return () => {
          if ((i?.(), c?.(), o !== void 0)) {
            for (let e of o.values()) e();
            o.clear();
          }
        };
      }),
      a !== void 0 && n.bindReader((e, t) => this.value(e, t)),
      this.driven.push(n),
      n
    );
  }
  canonicalDelay() {
    return this.profileBuf[1];
  }
  bindInputRenderDelay(e) {
    e instanceof t && e.bindRenderDelay(() => this.canonicalDelay());
  }
  reconciler(e, t) {
    let n = new mt(e, { ...t, clock: t.clock ?? this.clock });
    return (
      this.adoptFixedStep(n.stepMs),
      this.bindInputRenderDelay(t.input),
      this.installBoundOverlay(n),
      this.driven.push(n),
      n
    );
  }
  sim(e) {
    let t = new ht({ ...e, clock: e.clock ?? this.clock });
    return (
      this.adoptFixedStep(t.stepMs),
      this.bindInputRenderDelay(e.input),
      this.installBoundOverlay(t),
      this.driven.push(t),
      t
    );
  }
  adoptFixedStep(e) {
    if (this.fixedStepMs === void 0) {
      ((this.fixedStepMs = e), (this.stepAcc = 0), (this.lastFrameNow = -1));
      return;
    }
    Math.abs(this.fixedStepMs - e) > 1e-6 &&
      console.warn(
        `@colyseus/sdk Predict: a reconciler's fixed step (${e}ms) differs from this Predict's (${this.fixedStepMs}ms). tick() paces one rate for the whole room; use a separate Predict per rate.`,
      );
  }
  value(e, t) {
    let n = _(e),
      r = n === void 0 ? void 0 : this.slotByRef.get(n)?.get(t);
    if (r === void 0) return e[t];
    let i = this.slotBuf[r * A + k] | 0;
    return this.profileComputers[i](r);
  }
  valueAt(e, t, n) {
    let r = _(e),
      i = r === void 0 ? void 0 : this.slotByRef.get(r)?.get(t);
    if (i === void 0) return e[t];
    let a = i * A,
      o = this.slotBuf[a + k] | 0;
    if (this.profileComputers[o] !== this.computeReckon)
      return this.profileComputers[o](i);
    let s = this.simByRef.get(this.slotBuf[a + _t]);
    if (s !== void 0) {
      let e = this.slotBuf[a + vt] | 0,
        t = e < s.posOf.length ? s.posOf[e] : -1;
      if (t >= 0) {
        let e = this.clock?.lastServerTime?.() ?? NaN,
          r = Number.isNaN(e) ? 0 : Math.max(0, n - e);
        return (s.advance(s.instance, r, s.valueOut, n), s.valueOut[t]);
      }
    }
    return this.slotBuf[a + E];
  }
  read(e, t, n) {
    let r = n ?? {},
      i = _(e),
      a = i === void 0 ? void 0 : this.slotByRef.get(i);
    for (let n = 0; n < t.length; n++) {
      let i = t[n],
        o = a?.get(i);
      r[i] =
        o === void 0
          ? e[i]
          : this.profileComputers[this.slotBuf[o * A + k] | 0](o);
    }
    return r;
  }
  readAt(e, t, n, r) {
    let i = r ?? {},
      a = _(e),
      o = a === void 0 ? void 0 : this.slotByRef.get(a),
      s,
      c = !1;
    for (let r = 0; r < t.length; r++) {
      let a = t[r],
        l = o?.get(a);
      if (l === void 0) {
        i[a] = e[a];
        continue;
      }
      let u = l * A,
        d = this.slotBuf[u + k] | 0;
      if (this.profileComputers[d] !== this.computeReckon) {
        i[a] = this.profileComputers[d](l);
        continue;
      }
      if (
        !c &&
        ((c = !0), (s = this.simByRef.get(this.slotBuf[u + _t])), s !== void 0)
      ) {
        let e = this.clock?.lastServerTime?.() ?? NaN,
          t = Number.isNaN(e) ? 0 : Math.max(0, n - e);
        s.advance(s.instance, t, s.valueOut, n);
      }
      if (s !== void 0) {
        let e = this.slotBuf[u + vt] | 0,
          t = e < s.posOf.length ? s.posOf[e] : -1;
        if (t >= 0) {
          i[a] = s.valueOut[t];
          continue;
        }
      }
      i[a] = this.slotBuf[u + E];
    }
    return i;
  }
  computeDamped = (e) => {
    let t = this.slotBuf,
      n = e * A,
      r = this.profileBuf,
      i = (t[n + k] | 0) * j,
      a = this.renderTime,
      o = t[n + E],
      s = a - t[n + O];
    t[n + O] = a;
    let c = t[n + D];
    if (s > 0) {
      let e = r[i + Ot],
        a = e > 0 ? 1 - Math.exp(-s / e) : 1;
      ((c += (o - c) * a), (t[n + D] = c));
    }
    return c;
  };
  computeLerp = (e) => {
    let t = this.computeLerpRaw(e),
      n = this.slotBuf,
      r = e * A,
      i = this.profileBuf[(n[r + k] | 0) * j + Mt],
      a = this.renderTime;
    if (i <= 0) return ((n[r + D] = t), (n[r + xt] = t), (n[r + O] = a), t);
    let o = a - n[r + O];
    if (o <= 0) return n[r + D];
    let s = n[r + xt],
      c = n[r + D],
      l = o / i,
      u = (t - s) / l,
      d = t - u + (c - s + u) * Math.exp(-l);
    return ((n[r + D] = d), (n[r + xt] = t), (n[r + O] = a), d);
  };
  computeLerpRaw(e) {
    let t = this.slotBuf,
      n = e * A,
      r = this.profileBuf,
      i = (t[n + k] | 0) * j,
      a = this.renderTime,
      o = t[n + bt] | 0;
    if (o === 0) return t[n + E];
    let s = t[n + yt] | 0,
      c = n + St,
      l = (s - o + T) % T,
      u = c + ((l + o - 1) % T) * 2;
    if (o === 1) return t[u + 1];
    let d = r[i + Dt],
      f =
        this.clock && this.clock.lastServerTime() > 0
          ? this.clock.serverNow() - d - this.clock.smoothedRtt() / 2
          : a - d,
      p = c + l * 2;
    if (f <= t[p]) return t[p + 1];
    if (f >= t[u]) return t[u + 1];
    let m = o - 2,
      h = (l + m) % T;
    for (; m > 0 && !(t[c + h * 2] <= f);) (m--, (h = h === 0 ? 15 : h - 1));
    let g = c + h * 2,
      _ = c + (h + 1 >= T ? 0 : h + 1) * 2,
      v = t[g],
      ee = t[_] - v;
    if (ee <= 0) return t[_ + 1];
    let te = (f - v) / ee,
      ne = t[g + 1];
    return ne + (t[_ + 1] - ne) * te;
  }
  computeExtrapolate = (e) => {
    let t = this.slotBuf,
      n = e * A,
      r = this.profileBuf,
      i = (t[n + k] | 0) * j,
      a = this.renderTime,
      o = t[n + bt] | 0;
    if (o === 0) return t[n + E];
    let s = t[n + yt] | 0,
      c = n + St,
      l = (s - o + T) % T,
      u = c + ((l + o - 1) % T) * 2,
      d = t[u],
      f = t[u + 1],
      p;
    if (o === 1) p = f;
    else {
      let e = o >= 3 ? 2 : 1,
        n = c + ((l + o - 1 - e + T) % T) * 2,
        s = t[n],
        u = t[n + 1],
        m = d - s;
      if (m <= 0) p = f;
      else {
        let e = (f - u) / m,
          t = r[i + kt],
          n = a - d;
        (n < 0 ? (n = 0) : n > t && (n = t), (p = f + e * n));
      }
    }
    let m = t[n + O];
    t[n + O] = a;
    let h = r[i + Ot];
    if (h <= 0) return ((t[n + D] = p), p);
    let g = a - m,
      _ = t[n + D];
    if (g > 0) {
      let e = 1 - Math.exp(-g / h);
      ((_ += (p - _) * e), (t[n + D] = _));
    }
    return _;
  };
  computeReckon = (e) => {
    let t = this.slotBuf,
      n = e * A,
      r = t[n + _t],
      i = t[n + vt] | 0,
      a = this.simByRef.get(r);
    if (a !== void 0) {
      let e = i < a.posOf.length ? a.posOf[i] : -1;
      if (e >= 0) return this.applySimulation(a, e);
    }
    return t[n + E];
  };
  computeRaw = (e) => this.slotBuf[e * A + E];
  computeBound = (e) => {
    let t = this.boundBySlot.get(e);
    return t === void 0 ? this.slotBuf[e * A + E] : t.ctrl.value(t.key);
  };
  applySimulation(e, t) {
    let n = this.renderTime;
    if (e.lastApplyTime !== n) {
      let t = e.out,
        r = e.smoothed,
        i = e.offset,
        a = r.length,
        o = this.clock?.lastServerTime?.() ?? NaN;
      if (
        (e.advance(e.instance, e.forwardMs(), t, e.elapsedMs()),
        e.lastApplyTime === -1 / 0 || e.smoothMs <= 0)
      )
        for (let e = 0; e < a; e++) ((i[e] = 0), (r[e] = t[e]));
      else if (Number.isNaN(o)) {
        let i = Math.max(0, Math.min(n - e.lastApplyTime, 100)),
          o = 1 - Math.exp(-i / e.smoothMs);
        for (let e = 0; e < a; e++) r[e] += (t[e] - r[e]) * o;
      } else {
        let s = Math.max(0, Math.min(n - e.lastApplyTime, 100));
        if (o !== e.lastBaseT && !Number.isNaN(e.lastBaseT)) {
          let n = e.snap,
            o = e.frameVel;
          for (let e = 0; e < a; e++) {
            let a = r[e] + o[e] * s - t[e];
            i[e] = n > 0 && Math.abs(a) > n ? 0 : a;
          }
        } else if (s > 0) {
          let n = e.outPrev,
            r = e.frameVel;
          for (let e = 0; e < a; e++) r[e] = (t[e] - n[e]) / s;
        }
        let c = Math.exp(-s / e.smoothMs);
        for (let e = 0; e < a; e++) ((i[e] *= c), (r[e] = t[e] + i[e]));
      }
      let s = e.outPrev;
      for (let e = 0; e < a; e++) s[e] = t[e];
      ((e.lastBaseT = o), (e.lastApplyTime = n));
    }
    return e.smoothed[t];
  }
};
