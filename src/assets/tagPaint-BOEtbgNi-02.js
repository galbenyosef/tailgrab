// assets/tagPaint-BOEtbgNi 02 — fields
// Lines 289-1026 of readable/assets/tagPaint-BOEtbgNi.pretty.js (statement-aligned).
var lt = class {
    lastCorrection = {};
    lastCorrectionMag = 0;
    reconcileSeq = 0;
    drift = Ye();
    error = {};
    prev = {};
    renderedBefore = {};
    lastTick = -1;
    lastAcked = 0;
    lastEpoch;
    replayFrom = 0;
    predictedSeq = 0;
    catching = !1;
    unsubscribeSend = () => {};
    renderAcc = 0;
    tickSeq = 0;
    clampedReadTick = -1;
    warnedStaleRead = !1;
    stepCtx;
    ackWatermark = () => this.input_.lastProcessed;
    memos = new ot();
    smoothMs;
    snapThreshold;
    stepMs;
    input_;
    onReconcile;
    warnTolerance;
    clock;
    constructor(e) {
      ((this.input_ = e.input),
        (this.clock = e.clock),
        (this.smoothMs =
          e.smoothMs ?? (this.input_.patchRate ? this.input_.patchRate : 50)),
        (this.snapThreshold = e.snap ?? 0));
      let t =
        e.stepMs ??
        this.input_.stepMs ??
        (e.stepSeconds === void 0 ? void 0 : e.stepSeconds * 1e3);
      if (t === void 0)
        throw Error(
          `@colyseus/sdk reconciler: fixed simulation step is unknown. The server room must call setFixedTimestep() (or setTimestep()) so the input handle advertises a tick rate, or pass stepMs/stepSeconds explicitly — a wrong dt silently diverges rollback-replay.`,
        );
      this.stepMs = t;
      let n = e.stepSeconds ?? this.input_.stepSeconds ?? t / 1e3,
        r = e.subSteps ?? this.input_.subSteps ?? 1;
      ((this.stepCtx = {
        dt: n,
        dtMs: t,
        tick: 0,
        isReplay: !1,
        reckonTime: 0,
        lagCompActive: !1,
        subSteps: r,
        subDt: n / r,
        subDtMs: t / r,
        memo: (e, t) =>
          typeof e == `string`
            ? this.memos.run(this.stepCtx.tick, this.stepCtx.isReplay, e, t)
            : this.memos.run(this.stepCtx.tick, this.stepCtx.isReplay, ``, e),
        predict: (e, t) => {
          this.stepCtx.isReplay ||
            e._predictFromSim(this.stepCtx.tick, t, this.ackWatermark);
        },
      }),
        (this.onReconcile = e.onReconcile),
        (this.warnTolerance = e.warnOnDivergence),
        (this.lastAcked = this.input_.lastProcessed),
        (this.lastEpoch = this.input_.epoch),
        (this.predictedSeq = this.input_.sentCount),
        (this.unsubscribeSend = this.input_.onSend(() => this.catchUp())));
    }
    tick(e) {
      this.tickSeq++;
      let t = this.lastTick < 0 ? 0 : e - this.lastTick;
      ((this.lastTick = e), t > 0 && this.stepMs > 0 && (this.renderAcc += t));
      let n = this.input_.epoch;
      n !== this.lastEpoch && ((this.lastEpoch = n), this.reset());
      let r = this.input_.lastProcessed;
      if (
        (r > this.lastAcked && ((this.lastAcked = r), this.reconcile(r)),
        this.markDirty(),
        t <= 0)
      )
        return;
      let i = this.smoothMs <= 0 ? 1 : 1 - Math.exp(-t / this.smoothMs);
      for (let e of this.smoothedFields()) this.error[e] -= this.error[e] * i;
    }
    renderAlpha() {
      if (this.stepMs <= 0) return 1;
      let e = this.renderAcc / this.stepMs;
      return e < 0 ? 0 : e > 1 ? 1 : e;
    }
    noteRenderRead() {
      this.catching ||
        this.stepMs <= 0 ||
        this.renderAcc < this.stepMs ||
        (this.clampedReadTick = this.tickSeq);
    }
    catchUp() {
      let e = this.input_.sentCount;
      if (!(this.predictedSeq >= e || this.catching)) {
        (this.clampedReadTick === this.tickSeq &&
          !this.warnedStaleRead &&
          ((this.warnedStaleRead = !0), rt()),
          (this.catching = !0),
          (this.stepCtx.isReplay = !1));
        for (let t = this.predictedSeq + 1; t <= e; t++) {
          let e = this.input_.at(t);
          (e !== void 0 &&
            (this.snapshotPrev(),
            this.runStep(t, e),
            this.refreshRender(),
            (this.renderAcc -= this.stepMs),
            this.renderAcc < 0
              ? (this.renderAcc = 0)
              : this.renderAcc >= this.stepMs &&
                (this.renderAcc %= this.stepMs)),
            (this.predictedSeq = t));
        }
        this.catching = !1;
      }
    }
    runStep(e, t) {
      this.stepCtx.tick = e;
      let n = this.input_.reckonTimeAt(e);
      ((this.stepCtx.lagCompActive = n > 0),
        (this.stepCtx.reckonTime =
          n > 0 ? n : this.clock === void 0 ? 0 : this.clock.serverNow()),
        this.applyStep(t));
    }
    reconcile(e) {
      let t = this.warnTolerance !== void 0 || et();
      if (this.truthMatchesAt(e)) {
        if (t) {
          for (let e of this.smoothedFields()) this.lastCorrection[e] = 0;
          ((this.lastCorrectionMag = 0), Xe(this.drift, 0));
        }
        (this.reconcileSeq++, this.memos.prune(e), this.onReconcile?.(e));
        return;
      }
      let n = this.renderedBefore;
      for (let e of this.smoothedFields())
        n[e] = this.readCurrent(e) + this.error[e];
      this.adoptTruth();
      let r = Math.max(e, this.replayFrom);
      ((this.stepCtx.isReplay = !0), (this.catching = !0), st++);
      try {
        for (let e = r + 1; e <= this.input_.sentCount; e++) {
          let t = this.input_.at(e);
          t !== void 0 && this.runStep(e, t);
        }
      } finally {
        st--;
      }
      ((this.catching = !1),
        this.refreshRender(),
        (this.predictedSeq = this.input_.sentCount));
      let i = this.smoothMs <= 0,
        a = t || this.snapThreshold > 0,
        o = 0;
      for (let e of this.smoothedFields()) {
        let r = n[e] - this.readCurrent(e);
        if (((this.error[e] = i ? 0 : r), a)) {
          let e = r < 0 ? -r : r;
          e > o && (o = e);
        }
        t && (this.lastCorrection[e] = r);
      }
      let s = this.snapThreshold > 0 && o > this.snapThreshold;
      if (s)
        for (let e of this.smoothedFields())
          ((this.error[e] = 0), (this.prev[e] = this.readCurrent(e)));
      (this.reconcileSeq++,
        t &&
          ((this.lastCorrectionMag = o),
          s ||
            (Xe(this.drift, o),
            this.warnTolerance !== void 0 &&
              $e(this.drift, this.warnTolerance) === `diverging` &&
              at(e, this.lastCorrection, this.drift.ema, this.warnTolerance))),
        this.memos.prune(e),
        this.onReconcile?.(e));
    }
    get pendingCount() {
      return this.input_.pendingCount;
    }
    reset() {
      (this.reseedState(),
        Ze(this.drift),
        (this.replayFrom = this.input_.sentCount),
        (this.predictedSeq = this.input_.sentCount),
        (this.lastAcked = this.input_.lastProcessed),
        (this.renderAcc = 0),
        this.memos.clear(),
        this.markDirty());
    }
    dead = !1;
    disposedHooks = [];
    onDisposed(e) {
      this.disposedHooks.push(e);
    }
    dispose() {
      ((this.dead = !0), this.unsubscribeSend());
      for (let e of this.disposedHooks.splice(0)) e();
    }
    truthMatchesAt(e) {
      return !1;
    }
    refreshRender() {}
    markDirty() {}
  },
  ut = 0,
  dt = class {
    opts;
    store;
    entries = new Map();
    now;
    cooldownUntil = -1 / 0;
    warnedReplayPredict = !1;
    constructor(e, t) {
      ((this.opts = e),
        (this.now = () => t?.serverNow() ?? performance.now()),
        (this.store = Ge.get(
          { clock: t },
          {
            ttlMs: e.ttlMs ?? We,
            onReject: (e) => {
              let t = this.entries.get(e);
              (this.entries.delete(e), t && this.opts.onReject?.(t.payload));
            },
          },
        )));
    }
    _predictFromSim(e, t, n) {
      this.add(e, t, n);
    }
    predict(e) {
      if (ct()) {
        this.warnedReplayPredict ||
          ((this.warnedReplayPredict = !0),
          console.warn(
            `@colyseus/sdk: PredictedEventChannel${this.opts.label ? ` "${this.opts.label}"` : ``}.predict() was called during a rollback replay and ignored. Inside a reconciler step, use ctx.predict(channel, payload).`,
          ));
        return;
      }
      this.add(-1, e);
    }
    add(e, t, n) {
      let r =
        this.opts.uniqueBy === void 0
          ? typeof t == `string` || typeof t == `number`
            ? t
            : ut
          : this.opts.uniqueBy(t);
      if (this.entries.has(r)) return;
      let i = this.now();
      if (this.opts.cooldownMs !== void 0) {
        if (i < this.cooldownUntil) return;
        this.cooldownUntil = i + this.opts.cooldownMs;
      }
      let a = this.store.predict(r, i);
      (n !== void 0 && a.accept(),
        this.entries.set(r, { payload: t, seq: e, acked: n }),
        this.opts.onPredict?.(t));
    }
    has(e) {
      return e === void 0 ? this.entries.size > 0 : this.entries.has(e);
    }
    get pendingCount() {
      return this.entries.size;
    }
    confirm(e) {
      let t = 0;
      for (let n of this.settleKeys(e)) {
        let e = this.entries.get(n);
        e !== void 0 &&
          (this.entries.delete(n),
          this.store.confirm(n),
          this.opts.onConfirm?.(e.payload),
          t++);
      }
      return (t === 0 && this.opts.onUnpredicted?.(e), t);
    }
    reject(e) {
      let t = 0;
      for (let n of this.settleKeys(e))
        this.entries.has(n) && (this.store.reject(n), t++);
      return t;
    }
    settleKeys(e) {
      return e === void 0 ? [...this.entries.keys()] : [e];
    }
    clear() {
      (this.entries.clear(), this.store.clear());
    }
    prune() {
      if (this.entries.size > 0) {
        let e = this.opts.graceTicks ?? 10;
        for (let [t, n] of [...this.entries])
          n.acked !== void 0 && n.acked() >= n.seq + e && this.store.reject(t);
      }
      this.store.prune();
    }
    dead = !1;
    teardowns = [];
    _addTeardown(e) {
      this.teardowns.push(e);
    }
    dispose() {
      for (let e of this.teardowns.splice(0)) e();
      ((this.dead = !0), this.clear(), this.store.dispose());
    }
  },
  ft = class {
    opts;
    clock;
    correlate;
    ttl;
    byId = new Map();
    byServer = new Map();
    nextId = 1;
    lastTickAt;
    detach;
    dead = !1;
    constructor(e = {}, t = null) {
      ((this.opts = e),
        (this.clock = t),
        (this.correlate = e.correlate ?? `fifo`),
        (this.ttl = e.ttl ?? We));
    }
    attach(e) {
      (this.detach?.(), (this.detach = e(this.handleAdd, this.handleRemove)));
    }
    spawn(e) {
      let t = this.nextId++,
        n = this.makeData(),
        r = {
          id: t,
          server: void 0,
          local: e,
          state: `pending`,
          at: this.now(),
          leadMs: 0,
          accepted: !1,
          data: n,
        };
      return (
        this.byId.set(t, r),
        {
          id: t,
          local: e,
          data: n,
          cancel: () => {
            let e = this.byId.get(t);
            e && e.state === `pending` && this.byId.delete(t);
          },
          accept: () => {
            let e = this.byId.get(t);
            e && (e.accepted = !0);
          },
        }
      );
    }
    handleAdd = (e, t) => {
      if (this.byServer.has(e)) return;
      let n = this.isOwned(e) ? this.takeMatch(e) : void 0;
      if (n) this.confirmEntry(n, e);
      else {
        let t = {
          id: this.nextId++,
          server: e,
          local: void 0,
          state: `confirmed`,
          at: void 0,
          leadMs: 0,
          accepted: !1,
          data: this.makeData(),
        };
        (this.byId.set(t.id, t), this.byServer.set(e, t));
      }
    };
    confirmEntry(e, t) {
      ((e.server = t), (e.state = `confirmed`));
      let n = this.opts.spawnTime;
      (n !== void 0 && e.at !== void 0 && (e.leadMs = n(t) - e.at),
        this.byServer.set(t, e));
    }
    handleRemove = (e, t) => {
      let n = this.byServer.get(e);
      n && (this.byServer.delete(e), this.byId.delete(n.id));
    };
    takeMatch(e) {
      let t = this.correlate;
      if (typeof t != `function`) {
        for (let e of this.byId.values()) if (e.state === `pending`) return e;
        return;
      }
      for (let n of this.byId.values())
        if (n.state === `pending` && t(n.local, e)) return n;
    }
    isOwned(e) {
      return !this.opts.owned || this.opts.owned(e);
    }
    makeData() {
      return this.opts.data ? this.opts.data() : void 0;
    }
    tick(e = performance.now()) {
      let t = this.opts.step,
        n = this.clock === null ? e : this.clock.serverNow();
      if (t !== void 0 && this.lastTickAt !== void 0) {
        let e = Math.max(0, (n - this.lastTickAt) / 1e3);
        if (e > 0)
          for (let n of this.byId.values())
            n.state === `pending` && t(n.local, e);
      }
      this.lastTickAt = n;
    }
    prune() {
      if (this.byId.size === 0) return;
      let e = this.now(),
        t = this.ttl(this.clock?.smoothedRtt() ?? 0);
      for (let n of this.byId.values())
        n.state === `pending` &&
          !n.accepted &&
          n.at !== void 0 &&
          e - n.at > t &&
          (this.byId.delete(n.id), this.opts.onReject?.(n.local, n.id));
    }
    entries() {
      return this.byId.values();
    }
    entryFor(e) {
      return this.byServer.get(e);
    }
    value(e, t) {
      return e.server === void 0 ? e.local[t] : this.readServer(e.server, t);
    }
    bindReader(e) {
      this.readServer = e;
    }
    readServer = (e, t) => e[t];
    alive(e) {
      return this.byId.has(e);
    }
    get size() {
      return this.byId.size;
    }
    clear() {
      (this.byId.clear(), this.byServer.clear());
    }
    dispose() {
      ((this.dead = !0), this.detach?.(), (this.detach = void 0), this.clear());
    }
    now() {
      return this.clock?.serverNow() ?? performance.now();
    }
  },
  pt = (e) => (typeof e == `number` ? e : typeof e == `boolean` ? +!!e : NaN),
  mt = class extends lt {
    local = {};
    fields;
    numericFields = [];
    step;
    instance;
    wireRound = [];
    history;
    historySeq;
    historySize;
    historyOn;
    undeclared = null;
    devView = null;
    constructor(e, t) {
      (super(t), (this.instance = e));
      let n = t.fields,
        r = n ?? a(e).fields;
      if (n === void 0 && r.length === 0)
        throw Error(
          "predict.reconciler(): no `fields` given and none derivable — the instance has no schema metadata (a plain object, or a schema with no scalar fields). Pass the decoded instance from room.state, or list `fields` explicitly.",
        );
      ((this.fields = r), (this.step = t.step));
      let i = this.fields.length > 0;
      for (let t of this.fields) {
        let n = e[t];
        ((this.local[t] = n),
          typeof n == `number`
            ? (this.numericFields.push(t),
              (this.prev[t] = n),
              (this.error[t] = 0))
            : typeof n != `boolean` && (i = !1),
          this.wireRound.push(p(e, t)));
      }
      if (
        ((this.historyOn = i),
        (this.historySize = this.input_.replayBufferSize ?? 64),
        (this.history = new Float64Array(
          this.historyOn ? this.historySize * this.fields.length : 0,
        )),
        (this.historySeq = new Float64Array(
          this.historyOn ? this.historySize : 0,
        ).fill(-1)),
        n !== void 0)
      ) {
        let t = new Set(this.fields),
          n = a(e).fields.filter((e) => !t.has(e));
        n.length > 0 && (this.undeclared = new Set(n));
      }
    }
    get state() {
      return this.local;
    }
    get boundRegistrations() {
      return [
        {
          source: this.instance,
          fields: this.numericFields,
          poseKeys: this.numericFields,
        },
      ];
    }
    value(e) {
      this.noteRenderRead();
      let t = this.local[e];
      if (typeof t != `number`) return t;
      let n = t + (this.error[e] ?? 0),
        r = this.prev[e] ?? n;
      return r + (n - r) * this.renderAlpha();
    }
    smoothedFields() {
      return this.numericFields;
    }
    readCurrent(e) {
      return this.local[e];
    }
    applyStep(e) {
      let t = this.undeclared !== null && et() ? this.stepView() : this.local;
      if ((this.step(this.stepCtx, t, e), this.historyOn)) {
        let e = this.stepCtx.tick,
          t = e % this.historySize,
          n = t * this.fields.length;
        for (let e = 0; e < this.fields.length; e++)
          this.history[n + e] = pt(this.local[this.fields[e]]);
        this.historySeq[t] = e;
      }
    }
    stepView() {
      if (this.devView !== null) return this.devView;
      let e = this.undeclared,
        t = new Set(),
        n = (n, r) => {
          typeof r == `string` &&
            e.has(r) &&
            !t.has(r) &&
            (t.add(r),
            console.warn(
              `@colyseus/sdk predict: step ${n} "${r}" — a schema field NOT in this reconciler's \`fields\` list, so it is never mirrored or replayed: prediction integrates on top of a stale value and rubber-bands under latency. Add "${r}" to \`fields\`, or omit \`fields\` to mirror every scalar field. Read adopt-only fields off the raw instance instead of the predicted state.`,
            ));
        };
      return (
        (this.devView = new Proxy(this.local, {
          get(e, t, r) {
            return (n(`read`, t), Reflect.get(e, t, r));
          },
          set(e, t, r, i) {
            return (n(`wrote`, t), Reflect.set(e, t, r, i));
          },
        })),
        this.devView
      );
    }
    truthMatchesAt(e) {
      if (!this.historyOn) return !1;
      let t = e % this.historySize;
      if (this.historySeq[t] !== e) return !1;
      let n = t * this.fields.length,
        r = this.instance;
      for (let e = 0; e < this.fields.length; e++)
        if (this.wireRound[e](this.history[n + e]) !== pt(r[this.fields[e]]))
          return !1;
      return !0;
    }
    snapshotPrev() {
      for (let e of this.numericFields)
        this.prev[e] = this.local[e] + this.error[e];
    }
    adoptTruth() {
      let e = this.instance;
      for (let t of this.fields) this.local[t] = e[t];
    }
    reseedState() {
      let e = this.instance;
      for (let t of this.fields) this.local[t] = e[t];
      for (let e of this.numericFields)
        ((this.prev[e] = this.local[e]), (this.error[e] = 0));
      this.historySeq.fill(-1);
    }
  },
  ht = class extends lt {
    worldHandle;
    bindings = [];
    curPose = {};
    poseFields = [];
    customFields = [];
    fieldsReady = !1;
    poseA = {};
    poseB = {};
    renderPose = {};
    poseDirty = !0;
    step;
    adopt;
    readPose;
    interpolate;
    constructor(e) {
      super(e);
      let t = e.world;
      for (let e of Object.keys(t)) {
        let n = t[e];
        if (typeof n != `object` || !n) continue;
        if (_(n) === void 0) {
          if (l(n) !== void 0)
            throw Error(
              `predict.sim(): world.${e} is a schema instance that hasn't been decoded (no refId). Pass the decoded instance from room.state (e.g. inside onAdd), or a plain object for opaque scratch.`,
            );
          continue;
        }
        let { fields: r, numeric: i } = a(n);
        if (r.length === 0)
          throw Error(
            `predict.sim(): world.${e} is a decoded ref with no scalar fields to bind. Binding a whole COLLECTION isn't supported (yet) — spread its children into world parts (one entry per entity, fixed at construction). Nest a scalar-less instance below a plain wrapper if you meant it as an opaque handle.`,
          );
        let o = {};
        for (let e of r) o[e] = n[e];
        t[e] = o;
        let s = i.map((t) => `${e}.${t}`);
        this.bindings.push({
          source: n,
          mirror: o,
          fields: r,
          numeric: i,
          poseKeys: s,
        });
      }
      if (this.bindings.length === 0 && e.adopt === void 0)
        throw Error(
          `predict.sim(): no restore point — world has no schema-bound entries and no adopt() was provided. Put decoded schema instances in world (auto-bound), or provide adopt().`,
        );
      ((this.worldHandle = e.world),
        (this.step = e.step),
        (this.adopt = e.adopt),
        (this.readPose = e.pose),
        (this.interpolate = e.interpolate),
        this.refreshPose());
      for (let e of this.poseFields)
        ((this.prev[e] = this.curPose[e]), (this.error[e] = 0));
    }
    refreshPose() {
      let e = this.curPose;
      for (let t of this.bindings) {
        let { mirror: n, numeric: r, poseKeys: i } = t;
        for (let t = 0; t < r.length; t++) e[i[t]] = n[r[t]];
      }
      if (this.readPose !== void 0) {
        let t = this.readPose(this.worldHandle);
        this.fieldsReady || (this.customFields = Object.keys(t));
        for (let n of this.customFields) e[n] = t[n];
      }
      if (!this.fieldsReady) {
        let e = [];
        for (let t of this.bindings) for (let n of t.poseKeys) e.push(n);
        for (let t of this.customFields) e.includes(t) || e.push(t);
        ((this.poseFields = e), (this.fieldsReady = !0));
      }
      this.poseDirty = !0;
    }
    get world() {
      return this.worldHandle;
    }
    get boundRegistrations() {
      return this.bindings.map((e) => ({
        source: e.source,
        fields: e.numeric,
        poseKeys: e.poseKeys,
      }));
    }
    value(e) {
      if ((this.noteRenderRead(), this.interpolate)) return this.pose()[e];
      let t = this.curPose[e] + (this.error[e] ?? 0),
        n = this.prev[e] ?? t;
      return n + (t - n) * this.renderAlpha();
    }
    pose() {
      if ((this.noteRenderRead(), !this.poseDirty)) return this.renderPose;
      let e = this.renderAlpha(),
        t = this.poseA,
        n = this.poseB;
      for (let e of this.poseFields)
        ((t[e] = this.prev[e] ?? this.curPose[e]),
          (n[e] = this.curPose[e] + (this.error[e] ?? 0)));
      if (this.interpolate) {
        let r = this.interpolate(t, n, e);
        for (let e of this.poseFields) this.renderPose[e] = r[e];
      } else
        for (let r of this.poseFields)
          this.renderPose[r] = t[r] + (n[r] - t[r]) * e;
      return ((this.poseDirty = !1), this.renderPose);
    }
    smoothedFields() {
      return this.poseFields;
    }
    readCurrent(e) {
      return this.curPose[e];
    }
    applyStep(e) {
      this.step(this.stepCtx, this.worldHandle, e);
    }
    adoptTruth() {
      for (let e of this.bindings) {
        let { source: t, mirror: n, fields: r } = e;
        for (let e = 0; e < r.length; e++) n[r[e]] = t[r[e]];
      }
      this.adopt?.(this.worldHandle);
    }
    refreshRender() {
      this.refreshPose();
    }
    markDirty() {
      this.poseDirty = !0;
    }
    snapshotPrev() {
      for (let e of this.poseFields)
        this.prev[e] = this.curPose[e] + this.error[e];
    }
    reseedState() {
      (this.adoptTruth(), this.refreshPose());
      for (let e of this.poseFields)
        ((this.prev[e] = this.curPose[e]), (this.error[e] = 0));
    }
  };
