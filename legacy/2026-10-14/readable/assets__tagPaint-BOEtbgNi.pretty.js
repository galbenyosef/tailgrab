const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      "assets/skaterRig-CWjsS5UF.js",
      "assets/skaterRig-CvzHL-r4.js",
      "assets/three.core-DVWDmH0S.js",
      "assets/toon-CycGToy9.js",
      "assets/palette-DQTkVEn_.js",
      "assets/tuning-D4mSK766.js",
      "assets/outline-BufNikL2.js",
      "assets/table-W1plLavt.js",
      "assets/poses-DwKBijP_.js",
      "assets/types-DM-HODfo.js",
      "assets/dmath-_BI8hNwF.js",
      "assets/skaterView-DCMhULBk.js",
      "assets/bailPhysics-C1H0uy1H.js",
      "assets/verlet-BVVzuOqv.js",
      "assets/kit-C-OErpbU.js",
      "assets/GLTFLoader-BAb7LzOS.js",
    ]),
) => i.map((i) => d[i]);
import {
  _ as e,
  a as t,
  b as n,
  c as r,
  d as i,
  f as a,
  g as o,
  h as s,
  i as c,
  l,
  m as u,
  n as d,
  o as f,
  p,
  r as m,
  s as h,
  t as g,
  u as _,
  x as v,
} from "./Client-CpE02kO_.js";
import {
  I as ee,
  M as te,
  P as ne,
  c as re,
  n as ie,
  r as ae,
  t as oe,
} from "./preload-helper-DR1MrGPZ.js";
import {
  $ as se,
  Q as ce,
  X as le,
  Y as ue,
  _t as de,
  c as y,
  ct as fe,
  ft as pe,
  gt as me,
  ht as he,
  ot as ge,
  st as _e,
  vt as ve,
  yt as ye,
} from "./table-W1plLavt.js";
import { a as b, n as x, p as be } from "./types-DM-HODfo.js";
import { t as xe } from "./skaterView-DCMhULBk.js";
import {
  a as Se,
  c as Ce,
  l as we,
  n as Te,
  o as Ee,
  s as S,
  u as De,
} from "./parks-C2dnYY6C.js";
import { E as Oe, n as ke, t as Ae } from "./secrets-Czes5esN.js";
import { o as je } from "./sfx-6jovSU2-.js";
import {
  a as Me,
  i as C,
  l as Ne,
  m as Pe,
  s as Fe,
} from "./skaters-pUdq6stw.js";
import { f as Ie, m as Le } from "./missions-eXNMrvRm.js";
var Re = Object.assign({
    "./skaterRig.ts": () =>
      oe(
        () => import(`./skaterRig-CWjsS5UF.js`),
        __vite__mapDeps([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]),
      ),
  }),
  ze = null,
  w = null;
async function Be() {
  if (w) return !0;
  let e = Re[`./skaterRig.ts`];
  if (!e) return !1;
  try {
    return ((ze = await e()), (w = await ze.loadSkaterAssets()), !0);
  } catch (e) {
    return (
      console.warn(`[skaters] baked assets unavailable, using placeholders`, e),
      (ze = null),
      (w = null),
      !1
    );
  }
}
function Ve(e) {
  if (ze && w)
    try {
      return new ze.SkaterRigView(e, w);
    } catch (e) {
      console.warn(`[skaters] rig view failed`, e);
    }
  return new xe(e);
}
function He() {
  return w?.kit ?? null;
}
(ArrayBuffer.isView ||
  (ArrayBuffer.isView = (e) =>
    typeof e == `object` && !!e && e.buffer instanceof ArrayBuffer),
  typeof globalThis > `u` &&
    typeof window < `u` &&
    (window.globalThis = window),
  typeof FormData > `u` && (globalThis.FormData = class {}));
var Ue = class {
    setState(e) {}
    getState() {
      return null;
    }
    patch(e) {}
    teardown() {}
    handshake(e) {}
  },
  We = (e) => Math.max(e * 2, 600),
  Ge = class e {
    static get(t, n = {}) {
      let r = new e();
      return (
        r.configure(Ke(t.clock ?? null, n.ttlMs ?? We)),
        n.onReject && r.configure({ onReject: n.onReject }),
        r
      );
    }
    entries = new Map();
    accepted = new Set();
    cfg = {};
    configure(e) {
      this.cfg = { ...this.cfg, ...e };
    }
    predict(e, t) {
      return (
        this.entries.set(e, t ?? this.cfg.now?.() ?? performance.now()),
        {
          key: e,
          cancel: () => {
            (this.entries.delete(e), this.accepted.delete(e));
          },
          accept: () => {
            this.entries.has(e) && this.accepted.add(e);
          },
        }
      );
    }
    has(e) {
      return this.entries.has(e);
    }
    confirm(e) {
      (this.entries.delete(e), this.accepted.delete(e));
    }
    reject(e) {
      this.entries.delete(e) &&
        (this.accepted.delete(e), this.cfg.onReject?.(e));
    }
    prune(e, t) {
      let n = e ?? this.cfg.now?.() ?? performance.now(),
        r = this.cfg.ttlMs,
        i = t ?? (typeof r == `function` ? r() : r) ?? 1 / 0;
      for (let [e, t] of this.entries)
        this.accepted.has(e) ||
          (n - t > i && (this.entries.delete(e), this.cfg.onReject?.(e)));
    }
    clear() {
      (this.entries.clear(), this.accepted.clear());
    }
    get size() {
      return this.entries.size;
    }
    dead = !1;
    dispose() {
      ((this.dead = !0), this.entries.clear(), this.accepted.clear());
    }
  };
function Ke(e, t) {
  return {
    now: () => e?.serverNow() ?? performance.now(),
    ttlMs: typeof t == `function` ? () => t(e?.smoothedRtt() ?? 0) : t,
  };
}
var qe = 0.1,
  Je = 0.9;
function Ye() {
  return { ema: 0, peak: 0 };
}
function Xe(e, t) {
  ((e.ema += (t - e.ema) * qe), (e.peak = Math.max(t, e.peak * Je)));
}
function Ze(e) {
  ((e.ema = 0), (e.peak = 0));
}
var Qe = 0.001;
function $e(e, t) {
  let n = t !== void 0 && t > Qe ? t : Qe;
  return e.ema >= n ? `diverging` : e.peak >= n ? `jitter` : `matched`;
}
function et() {
  return u();
}
var tt = -1 / 0,
  nt = 1e3;
function rt() {
  console.warn(
    `@colyseus/sdk predict: a predicted value was read BEFORE this frame's input.send() calls. Reads between predict.tick() and the frame's sends are one fixed step stale and stutter on late frames. Send the frame's due inputs right after predict.tick(now) — tick and pump in your earliest per-frame callback, before anything reads value()/pose(). For game logic (zone checks, hit-reg) read .state/.world instead. See PREDICTION.md §4 (frame order).`,
  );
}
function it(e, t) {
  console.warn(
    t === ``
      ? `@colyseus/sdk predict: two key-less ctx.memo calls ran in one step (input seq ${e}) — the key-less form is ONE shared slot per step, so replay returns one frozen value for both (silent re-simulation corruption). Pass distinct keys: ctx.memo("a", …) / ctx.memo("b", …).`
      : `@colyseus/sdk predict: ctx.memo("${t}") ran twice in one step (input seq ${e}) — both calls share one slot on replay. Give each call site its own key (include the loop index for a per-iteration memo).`,
  );
}
function at(e, t, n, r) {
  let i = o();
  if (i - tt < nt) return;
  tt = i;
  let a = ``,
    s = -1;
  for (let e in t) {
    let n = t[e],
      r = n < 0 ? -n : n;
    r > s && ((s = r), (a = e));
  }
  let c = a ? t[a] : n;
  console.warn(
    `@colyseus/sdk predict: prediction is diverging at input seq ${e} — rolling drift ${n.toFixed(3)} ≥ tolerance ${r}; "${a}" currently off by ${c.toFixed(3)}. Most likely the client and server simulations disagree: a different fixed dt, mismatched constants, a step function that isn't shared, or an input the server skipped. See PREDICTION.md §5 (Determinism).`,
  );
}
var ot = class {
    byTick = new Map();
    diagTick = -1;
    diagKeys = new Set();
    warnedKeys = new Set();
    run(e, t, n, r) {
      if (t) return this.byTick.get(e)?.get(n);
      et() &&
        (e === this.diagTick
          ? this.diagKeys.has(n) &&
            !this.warnedKeys.has(n) &&
            (this.warnedKeys.add(n), it(e, n))
          : ((this.diagTick = e), this.diagKeys.clear()),
        this.diagKeys.add(n));
      let i = r();
      if (i !== void 0) {
        let t = this.byTick.get(e);
        (t === void 0 && ((t = new Map()), this.byTick.set(e, t)), t.set(n, i));
      }
      return i;
    }
    prune(e) {
      for (let t of this.byTick.keys()) t <= e && this.byTick.delete(t);
    }
    clear() {
      (this.byTick.clear(), (this.diagTick = -1), this.diagKeys.clear());
    }
  },
  st = 0;
function ct() {
  return st > 0;
}
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
function gt(e, t, n, r) {
  let i = [];
  if (n.field !== void 0) {
    let r = new Map();
    (i.push(
      e.onAdd(n.collection, (i, a) => {
        r.has(i) ||
          r.set(
            i,
            e.listen(
              i,
              n.field,
              (e) => {
                e === n.equals && t.confirm(a);
              },
              !1,
            ),
          );
      }),
    ),
      i.push(
        e.onRemove(n.collection, (e) => {
          (r.get(e)?.(), r.delete(e));
        }),
      ),
      i.push(() => {
        for (let e of r.values()) e();
        r.clear();
      }));
  } else
    n.event === `remove`
      ? i.push(
          e.onRemove(n.collection, (e, n) => {
            t.confirm(n);
          }),
        )
      : i.push(
          e.onAdd(
            n.collection,
            (e) => {
              (n.mine === void 0 || e[n.mine] === r?.()) && t.confirm();
            },
            !1,
          ),
        );
  return () => {
    for (let e of i.splice(0)) e?.();
  };
}
var T = 16,
  E = 0,
  D = 1,
  O = 2,
  k = 3,
  _t = 4,
  vt = 5,
  yt = 6,
  bt = 7,
  xt = 8,
  St = 9,
  A = 41,
  Ct = 3,
  wt = 1.5,
  Tt = 250,
  j = 7,
  Et = 0,
  Dt = 1,
  Ot = 2,
  kt = 3,
  At = 4,
  jt = 5,
  Mt = 6,
  M = 0,
  Nt = 0,
  Pt = 1,
  Ft = 2,
  It = 3,
  Lt = 4,
  Rt = 5,
  zt = { lerp: Nt, extrapolate: Pt, damped: Ft, reckon: It, raw: Lt },
  N = {
    mode: `lerp`,
    delay: 100,
    smoothMs: 50,
    maxExtrapolate: 200,
    tickInterval: 0,
    snap: 0,
    angle: !1,
  },
  Bt = { step: void 0, smoothMs: 50, substep: 16, snap: 0 };
function Vt(e) {
  return typeof e != `object` || !e ? !1 : Array.isArray(e.fields);
}
var Ht = 0,
  Ut = !1;
function Wt() {
  Ut ||
    ((Ut = !0),
    console.warn(
      `@colyseus/sdk Predict: room.clock isn't server-synced because the server room didn't call defineInput(). Server-time interpolation and lag compensation fall back to local time. Add defineInput() on the server room to enable them — or ignore this if you only need local smoothing.`,
    ));
}
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
(m(`schema`, d),
  m(`none`, Ue),
  n(
    {
      dir: v.uint8(),
      held: v.uint8(),
      pressed: v.uint8(),
      released: v.uint8(),
      pressDir: v.uint8(),
      tapDir: v.uint8(),
      stickX: v.int8(),
    },
    `MoveInput`,
  ));
var Kt = n(
    {
      x: v.float32(),
      y: v.float32(),
      z: v.float32(),
      vx: v.float32(),
      vy: v.float32(),
      vz: v.float32(),
      yaw: v.float32(),
      ux: v.float32(),
      uy: v.float32().default(1),
      uz: v.float32(),
      spinVel: v.float32(),
      simTick: v.uint32(),
      mode: v.uint8(),
      modeTick: v.uint32(),
      rolling: v.boolean(),
      crouch: v.uint8(),
      coyote: v.uint8(),
      bankTick: v.uint32(),
      airYaw0: v.float32(),
      airFakie: v.boolean(),
      vert: v.boolean(),
      vnx: v.float32(),
      vnz: v.float32(),
      vd: v.float32(),
      lipY: v.float32(),
      airFirst: v.uint16(),
      airPiece: v.uint16(),
      xfer: v.uint8(),
      vturn: v.float32(),
      rail: v.int16().default(-1),
      railT: v.float32(),
      railDir: v.int8().default(1),
      bal: v.float32(),
      balVel: v.float32(),
      balClock: v.uint32(),
      balCarry: v.uint32(),
      trickId: v.uint8(),
      trickTick: v.uint32(),
      trickEnd: v.uint32(),
      queued: v.uint32(),
      grindBuf: v.uint8(),
      taps: v.uint32(),
      lastPiece: v.uint16(),
      comboBase: v.uint32(),
      comboMult: v.uint16(),
      comboTricks: v.uint16(),
      ring0: v.uint32(),
      ring1: v.uint32(),
      ring2: v.uint32(),
      ring3: v.uint32(),
      comboSeq: v.uint16(),
      special: v.uint8(),
      name: v.string().default(``),
      skater: v.uint8().default(0),
      look: v.string().default(``),
      color: v.uint8().default(0),
      boost: v.uint32().default(0),
      warpSeq: v.uint8().default(0),
      score: v.uint32().default(0),
      best: v.uint32().default(0),
      away: v.boolean().default(!1),
      bot: v.boolean().default(!1),
      queue: v.string().default(``),
    },
    `Skater`,
  ),
  qt =
    `x.y.z.vx.vy.vz.yaw.ux.uy.uz.spinVel.simTick.mode.modeTick.rolling.crouch.coyote.bankTick.airYaw0.airFakie.vert.vnx.vnz.vd.lipY.airFirst.airPiece.xfer.vturn.rail.railT.railDir.bal.balVel.balClock.balCarry.trickId.trickTick.trickEnd.queued.grindBuf.taps.lastPiece.comboBase.comboMult.comboTricks.ring0.ring1.ring2.ring3.comboSeq.special`.split(
      `.`,
    ),
  Jt = { IDLE: 0, FILLING: 1, LAUNCHING: 2 },
  Yt = n(
    {
      count: v.uint8().default(0),
      status: v.uint8().default(0),
      launchAt: v.number().default(0),
      startVotes: v.uint8().default(0),
    },
    `Portal`,
  ),
  Xt = n(
    {
      code: v.string().default(``),
      parkId: v.string().default(``),
      skaters: v.map(Kt),
      portals: v.map(Yt),
    },
    `HubState`,
  ),
  Zt = n(
    {
      name: v.string().default(``),
      skater: v.uint8().default(0),
      look: v.string().default(``),
      color: v.uint8().default(0),
      connected: v.boolean().default(!0),
      left: v.boolean().default(!1),
      loaded: v.boolean().default(!1),
      rematch: v.boolean().default(!1),
      score: v.uint32().default(0),
      best: v.uint32().default(0),
      bestTricks: v.string().default(``),
      bails: v.uint16().default(0),
      pieces: v.uint8().default(0),
      paint: v.uint32().default(0),
      letters: v.uint8().default(0),
      lettersAt: v.uint32().default(0),
      itMs: v.uint32().default(0),
      tags: v.uint16().default(0),
      horse: v.uint8().default(0),
      out: v.boolean().default(!1),
      ot: v.boolean().default(!1),
      rank: v.uint8().default(0),
    },
    `Competitor`,
  ),
  Qt = n(
    { owner: v.string().default(``), score: v.uint32().default(0) },
    `Piece`,
  ),
  $t = { SETUP: 0, ACTIVE: 1, RESULT: 2 },
  en = n(
    {
      activeId: v.string().default(``),
      setterId: v.string().default(``),
      target: v.uint32().default(0),
      stage: v.uint8().default(0),
      stageEndsAt: v.number().default(0),
      round: v.uint8().default(0),
      spot: v.uint8().default(0),
      verdict: v.uint8().default(0),
      lastScore: v.uint32().default(0),
      order: v.string().default(``),
      last: v.boolean().default(!1),
    },
    `HorseState`,
  ),
  tn = n(
    {
      x: v.float32().default(0),
      y: v.float32().default(0),
      z: v.float32().default(0),
    },
    `LetterSpot`,
  ),
  nn = n(
    {
      itId: v.string().default(``),
      graceUntil: v.number().default(0),
      noBackId: v.string().default(``),
      noBackUntil: v.number().default(0),
    },
    `TagState`,
  ),
  rn = n(
    {
      id: v.string().default(``),
      done: v.boolean().default(!1),
      now: v.boolean().default(!1),
    },
    `CareerGoal`,
  ),
  an = n(
    {
      x: v.float32().default(0),
      y: v.float32().default(0),
      z: v.float32().default(0),
      goal: v.uint8().default(0),
      item: v.string().default(``),
    },
    `CareerSpot`,
  ),
  on = n(
    {
      level: v.string().default(``),
      goals: v.array(rn),
      spots: v.array(an),
      got: v.uint32().default(0),
    },
    `CareerState`,
  ),
  sn = n(
    {
      mode: v.string().default(`trick`),
      parkId: v.string().default(``),
      phase: v.uint8().default(0),
      phaseEndsAt: v.number().default(0),
      countdownAt: v.number().default(0),
      playStartsAt: v.number().default(0),
      freezeAt: v.number().default(0),
      hubCode: v.string().default(``),
      skaters: v.map(Kt),
      roster: v.map(Zt),
      graffiti: v.map(Qt),
      letters: v.array(tn),
      horse: v.ref(en),
      tag: v.ref(nn),
      career: v.ref(on),
    },
    `MatchState`,
  ),
  cn = n(
    {
      code: v.string().default(``),
      parkId: v.string().default(``),
      name: v.string().default(``),
      ownerName: v.string().default(``),
      meta: v.string().default(``),
      pieces: v.map(`string`),
      rev: v.uint32().default(0),
      openBuild: v.boolean().default(!1),
      published: v.boolean().default(!1),
      owners: v.map(`boolean`),
      builders: v.map(`boolean`),
      daily: v.boolean().default(!1),
      editing: v.map(`boolean`),
      skaters: v.map(Kt),
    },
    `ParkState`,
  ),
  ln = n(
    {
      x: v.float32().default(0),
      y: v.float32().default(0),
      z: v.float32().default(0),
      vx: v.float32().default(0),
      vy: v.float32().default(0),
      vz: v.float32().default(0),
      yaw: v.float32().default(0),
      ux: v.float32().default(0),
      uy: v.float32().default(1),
      uz: v.float32().default(0),
      simTick: v.uint32().default(0),
      mode: v.uint8().default(0),
      modeTick: v.uint32().default(0),
      crouch: v.uint8().default(0),
      bal: v.float32().default(0),
      trickId: v.uint8().default(0),
      trickTick: v.uint32().default(0),
      trickEnd: v.uint32().default(0),
      name: v.string().default(``),
      skater: v.uint8().default(0),
      look: v.string().default(``),
      color: v.uint8().default(0),
      live: v.boolean().default(!1),
    },
    `Ghost`,
  ),
  un = n({ skaters: v.map(ln) }, `GhostState`),
  dn = `wss://backend.tailgrab.io`,
  P = new g(dn),
  fn = dn.replace(/^ws/, `http`).replace(/\/$/, ``),
  pn = 220;
function mn(e) {
  let t = { mode: `lerp`, delay: e, snap: 5, smoothMs: 20 },
    n = { mode: `lerp`, delay: e, smoothMs: 20 };
  return {
    x: t,
    y: t,
    z: t,
    ux: n,
    uy: n,
    uz: n,
    yaw: n,
    simTick: { mode: `lerp`, delay: e },
  };
}
var hn = mn(110),
  F = () => ({ name: je.name, skater: je.skater, color: je.color });
async function gn(e = {}) {
  let t = { ...F(), spectate: e.spectate };
  return _n(
    e.id ? await P.joinById(e.id, t, Xt) : await P.joinOrCreate(`hub`, t, Xt),
  );
}
async function _n(t) {
  await yn(t);
  let n = e.get(t),
    r = Te(t.state.parkId),
    i = Gt.get(t, { mode: `lerp`, delay: 110, name: `skaters` });
  return (
    i.attachAll(`skaters`, hn),
    { kind: `hub`, room: t, callbacks: n, predict: i, world: r }
  );
}
function vn(e, t = 5e3) {
  let n = e.room;
  return n.connection.isOpen
    ? (n.send(`play`, F()),
      new Promise((e, r) => {
        let i = () => {
            n.state.skaters.has(n.sessionId) && a();
          },
          a = (t) => {
            (clearTimeout(o), n.onStateChange.remove(i), t ? r(t) : e());
          },
          o = setTimeout(() => a(Error(`no skater after play`)), t);
        (n.onStateChange(i), i());
      }))
    : Promise.reject(Error(`plaza connection closed`));
}
function yn(e) {
  return e.state?.parkId
    ? Promise.resolve()
    : new Promise((t, n) => {
        (e.onStateChange.once(() => t()),
          e.onLeave.once((e, t) => n(Error(t || `room closed`))));
      });
}
async function bn(e) {
  return Sn(await P.consumeSeatReservation(e, sn));
}
async function xn(e) {
  return Sn(await P.create(`career`, { level: e, ...F() }, sn));
}
async function Sn(t) {
  await yn(t);
  let n = e.get(t),
    r = Te(t.state.parkId),
    i = Gt.get(t, { mode: `lerp`, delay: 110, name: `skaters` });
  return (
    i.attachAll(`skaters`, hn),
    { kind: `match`, room: t, callbacks: n, predict: i, world: r }
  );
}
async function Cn(t) {
  let n = await P.joinOrCreate(`ghost`, { level: t, ...F() }, un);
  await Promise.race([yn(n), new Promise((e) => setTimeout(e, 3e3))]);
  let r = e.get(n),
    i = Gt.get(n, { mode: `lerp`, delay: pn, name: `skaters` });
  return (
    i.attachAll(`skaters`, mn(pn)),
    { room: n, callbacks: r, predict: i }
  );
}
function wn(e) {
  let t = JSON.parse(e.meta),
    n = [...e.pieces.values()].map((e) => JSON.parse(e));
  return Oe(e.code, e.name, t, n);
}
async function Tn(e, t = !1) {
  return Dn(
    await P.joinOrCreate(t ? `daily` : `park`, { park: e, ...F() }, cn),
  );
}
async function En(e) {
  return Dn(await P.joinById(e, F(), cn));
}
async function Dn(t) {
  await yn(t);
  let n = e.get(t),
    r = re(wn(t.state)),
    i = Gt.get(t, { mode: `lerp`, delay: 110, name: `skaters` });
  return (
    i.attachAll(`skaters`, hn),
    { kind: `park`, room: t, callbacks: n, predict: i, world: r }
  );
}
async function On(e) {
  return e.kind === `hub`
    ? _n(await P.consumeSeatReservation(e.reservation, Xt))
    : Dn(await P.consumeSeatReservation(e.reservation, cn));
}
var kn = [
    `Sick!`,
    `Gnarly!`,
    `GG`,
    `Nice line!`,
    `Let's go!`,
    `Oops!`,
    `Wait up!`,
    `Follow me!`,
  ],
  An = [
    `flame`,
    `hand-horns`,
    `hand-shake`,
    `hand-clap`,
    `board`,
    `oops`,
    `hand-palm`,
    `hand-point`,
  ],
  jn = /[\u0000-\u001f\u007f-\u009f​-‏‪-‮⁦-⁩﻿]/g;
function Mn(e, t = 80) {
  return e.replace(jn, ``).replace(/\s+/g, ` `).trim().slice(0, t);
}
function Nn(e) {
  return typeof e == `string` ? Mn(e, 16) : ``;
}
var Pn = [
    `fuck`,
    `shit`,
    `bitch`,
    `cunt`,
    `dick`,
    `pussy`,
    `asshole`,
    `bastard`,
    `slut`,
    `whore`,
    `fag`,
    `nigg`,
    `retard`,
  ],
  Fn = {
    0: `o`,
    1: `i`,
    3: `e`,
    4: `a`,
    5: `s`,
    $: `s`,
    "@": `a`,
    7: `t`,
    "!": `i`,
  },
  In = `#@$%&!*`;
function Ln(e) {
  let t = [...e.toLowerCase()].map((e) => Fn[e] ?? e),
    n = [...e],
    r = t.join(``);
  for (let e of Pn) {
    let t = r.indexOf(e);
    for (; t >= 0;) {
      for (let r = t; r < t + e.length; r++) n[r] !== ` ` && (n[r] = In[r % 7]);
      t = r.indexOf(e, t + 1);
    }
  }
  return n.join(``);
}
var Rn = `Try another name`,
  zn = /\p{Extended_Pictographic}/u;
function Bn(e) {
  let t = Nn(e);
  return t
    ? t.includes(`#`) || zn.test(t) || Ln(t) !== t
      ? Rn
      : null
    : `Type a name or roll one`;
}
function Vn(e) {
  let t = 2166136261;
  for (let n = 0; n < e.length; n++)
    ((t ^= e.charCodeAt(n)), (t = Math.imul(t, 16777619)));
  return `#` + String((t >>> 0) % 1e4).padStart(4, `0`);
}
function Hn(e) {
  return `Player ${Vn(e).slice(1)}`;
}
function Un(e, t) {
  if (e.length >= 16) return null;
  if (t === ` `) return e && !e.endsWith(` `) ? e + ` ` : null;
  let n = !e || e.endsWith(` `);
  return e + (/[a-z]/i.test(t) ? (n ? t.toUpperCase() : t.toLowerCase()) : t);
}
function Wn(e, t, n) {
  let r = ee(ne(e.path), t),
    i = De(e, r.x, r.z);
  return { x: i.x, y: (e.y ?? 0) + r.y + n, z: i.z };
}
var Gn = we[0].y ?? 0,
  Kn = (() => {
    let e = ee(ne(Ce.path), 76),
      t = te(ne({ plan: Ce.path.plan, grade: Ce.section.lip }), 76).y,
      n = De(Ce, e.x, e.z);
    return { x: n.x, y: t + 1.2, z: n.z };
  })(),
  qn = Se[4],
  I = {
    summit: { x: -152, y: Gn + 2.2, z: 164 },
    spillway: Kn,
    pipe: { x: -144, y: 1.7, z: -150 },
    roof: S(330, 1.4),
    ramp: S(4, 1.2),
    bend: Wn(qn, ne(qn.path).length / 2, 1.6),
    tickets: [S(45, 1.3), S(125, 1.3), S(205, 1.3), S(285, 1.3), S(322, 1.3)],
    tape: { x: 108, y: 14.2, z: -116 },
    deck: { x: -118, y: (we[2].y ?? 0) + 1.6, z: 119 },
    helixId: Ee.id,
  },
  L = [y.GRIND, y.SLIDE, y.SPECIAL_GRIND],
  Jn = [y.SPECIAL_AIR, y.SPECIAL_GRIND, y.SPECIAL_MANUAL],
  R = (e, t, n) => [
    {
      id: `high`,
      kind: `score`,
      pts: e,
      text: `High Score: ${e.toLocaleString(`en-US`)}`,
    },
    {
      id: `pro`,
      kind: `score`,
      pts: t,
      text: `Pro Score: ${t.toLocaleString(`en-US`)}`,
    },
    {
      id: `sick`,
      kind: `score`,
      pts: n,
      text: `Sick Score: ${n.toLocaleString(`en-US`)}`,
    },
  ],
  z = [
    {
      id: `skool`,
      name: `Skool Daze`,
      parkId: `schoolyard`,
      need: 3,
      unlocks: 1,
      blurb: `Detention's over. Hit the big set before the janitor does.`,
      starter: [`high`, `bigset`, `longrail`],
      goals: [
        ...R(2500, 15e3, 4e4),
        {
          id: `skate`,
          kind: `skate`,
          text: `Collect S-K-A-T-E`,
          spots: [
            { x: 0, y: 3.4, z: 14.6 },
            { x: 0, y: 1.6, z: -10 },
            { x: -6.5, y: 2.2, z: 2 },
            { x: 32, y: 4.4, z: -8 },
            { x: -18, y: 3.2, z: 14 },
          ],
        },
        {
          id: `homework`,
          kind: `collect`,
          item: `homework`,
          text: `Find 5 lost homeworks`,
          spots: [
            { x: 22, y: 2.2, z: -20 },
            { x: -14, y: 2.1, z: -12 },
            { x: 22, y: 1.6, z: 10 },
            { x: -34.5, y: 2.6, z: -18 },
            { x: 8, y: 1.2, z: -21 },
          ],
        },
        {
          id: `bigset`,
          kind: `gap`,
          gap: `Big Set Gap`,
          text: `Clear the Big Set Gap`,
          at: { x: 0, y: 1.6, z: 16.5 },
        },
        {
          id: `longrail`,
          kind: `trick`,
          kinds: L,
          on: [14],
          text: `Grind the Long Rail`,
          at: { x: 0, y: 0.55, z: -10 },
        },
        {
          id: `kickflip`,
          kind: `trick`,
          trick: `Kickflip`,
          on: [16],
          text: `Kickflip off the Planter Kicker`,
        },
        {
          id: `tailgrab`,
          kind: `trick`,
          trick: `Tailgrab`,
          on: [20],
          text: `Tailgrab out of the Gym Quarter`,
        },
        {
          id: `combo`,
          kind: `combo`,
          pts: 4e3,
          count: 4,
          text: `Land a 4-trick combo worth 4,000`,
        },
        {
          id: `tape`,
          kind: `spot`,
          spot: { x: 32, y: 5.6, z: -12 },
          text: `Find the secret tape`,
        },
      ],
    },
    {
      id: `crates`,
      name: `Crate Warehouse`,
      parkId: `warehouse`,
      need: 4,
      unlocks: 7,
      blurb: `Forklifts parked, lights on. The half-pipe is all yours.`,
      starter: [`high`, `skate`, `tapes`, `crategap`, `transfer`],
      goals: [
        ...R(1e4, 3e4, 75e3),
        {
          id: `skate`,
          kind: `skate`,
          text: `Collect S-K-A-T-E`,
          spots: [
            { x: -16, y: 5.8, z: 22 },
            { x: 16, y: 3.6, z: 22 },
            { x: 9, y: 2.8, z: 8 },
            { x: 30.5, y: 1.4, z: -12 },
            { x: 10, y: 4.8, z: -21.5 },
          ],
        },
        {
          id: `tapes`,
          kind: `collect`,
          item: `bubblewrap`,
          text: `Collect 5 bubble wraps`,
          spots: [
            { x: 0, y: 2.6, z: -2 },
            { x: 26, y: 1.6, z: -4 },
            { x: -26, y: 1.5, z: -6 },
            { x: 0, y: 4.8, z: -21.5 },
            { x: -16, y: 1.4, z: 17 },
          ],
        },
        {
          id: `crategap`,
          kind: `gap`,
          gap: `Crate Gap`,
          text: `Clear the Crate Gap`,
          at: { x: 5, y: 1, z: 8 },
        },
        {
          id: `transfer`,
          kind: `trick`,
          trick: `Spine Transfer`,
          on: [22],
          text: `Transfer over the Pallet Spine`,
          at: { x: -12, y: 1.6, z: -8 },
        },
        {
          id: `vert540`,
          kind: `trick`,
          spin: 3,
          on: [1, 2],
          text: `Land a 540 on the Big Half-Pipe`,
        },
        {
          id: `combo`,
          kind: `combo`,
          pts: 1e4,
          count: 6,
          text: `Land a 6-trick combo worth 10,000`,
        },
        {
          id: `tape`,
          kind: `spot`,
          spot: { x: 16, y: 4.2, z: 25.5 },
          text: `Find the secret tape`,
        },
      ],
    },
    {
      id: `pier`,
      name: `Pier Pressure`,
      parkId: `pier`,
      need: 5,
      unlocks: 10,
      blurb: `Salt air, loose planks, and a container gap the harbour master swears is impossible.`,
      starter: [`high`, `skate`, `fish`, `dockrail`, `containergap`, `vert720`],
      goals: [
        ...R(2e4, 5e4, 12e4),
        {
          id: `skate`,
          kind: `skate`,
          text: `Collect S-K-A-T-E`,
          spots: [
            { x: 13.5, y: 4, z: 22 },
            { x: -14, y: 6.6, z: 27.2 },
            { x: 38, y: 1.6, z: 4 },
            { x: -14, y: 2.8, z: -15 },
            { x: 27.5, y: 2.9, z: 22 },
          ],
        },
        {
          id: `fish`,
          kind: `collect`,
          item: `fish`,
          text: `Catch 5 flying fish`,
          spots: [
            { x: 0.2, y: 3, z: 4 },
            { x: 24, y: 2.2, z: -14 },
            { x: 22, y: 4.6, z: -32.4 },
            { x: -22, y: 3.2, z: -21 },
            { x: 24, y: 0.9, z: 4 },
          ],
        },
        {
          id: `containergap`,
          kind: `gap`,
          gap: `Container Gap`,
          text: `Clear the Container Gap`,
          at: { x: 11, y: 2.6, z: 22 },
        },
        {
          id: `dockrail`,
          kind: `trick`,
          kinds: L,
          on: [30],
          text: `Grind the Dock Rail`,
          at: { x: 38, y: 0.6, z: 0 },
        },
        {
          id: `vert720`,
          kind: `trick`,
          spin: 4,
          on: [1, 2],
          text: `Land a 720 on the Lighthouse Vert`,
          at: { x: -18, y: 2, z: 19 },
        },
        {
          id: `combo`,
          kind: `combo`,
          pts: 25e3,
          count: 8,
          text: `Land an 8-trick combo worth 25,000`,
        },
        {
          id: `tape`,
          kind: `spot`,
          spot: { x: -24, y: 7.8, z: 10 },
          text: `Find the secret tape`,
        },
      ],
    },
    {
      id: `mall`,
      name: `Mall Rats`,
      parkId: `mall`,
      need: 6,
      unlocks: 11,
      blurb: `Security's on a donut break. The fountain was never meant for this.`,
      starter: [`high`, `skate`, `bags`, `escalator`, `atrium`, `special`],
      goals: [
        ...R(35e3, 9e4, 2e5),
        {
          id: `skate`,
          kind: `skate`,
          text: `Collect S-K-A-T-E`,
          spots: [
            { x: -12, y: 5.6, z: 18 },
            { x: -7.4, y: 3.4, z: 19.8 },
            { x: 0, y: 6.8, z: -32.6 },
            { x: 19.6, y: 4.2, z: -14 },
            { x: 12, y: 4.2, z: 29 },
          ],
        },
        {
          id: `bags`,
          kind: `collect`,
          item: `bag`,
          text: `Grab 5 shopping bags`,
          spots: [
            { x: -12, y: 1.2, z: 6 },
            { x: 26, y: 2.5, z: 34 },
            { x: -33, y: 4.8, z: 12 },
            { x: -32, y: 8.4, z: 30 },
            { x: 3, y: 4.6, z: 22.4 },
          ],
        },
        {
          id: `atrium`,
          kind: `gap`,
          gap: `Atrium Gap`,
          text: `Drop the Atrium Gap into the fountain`,
          at: { x: -10, y: 3.6, z: 22.5 },
        },
        {
          id: `escalator`,
          kind: `trick`,
          kinds: L,
          on: [6, 7],
          text: `Grind an Escalator Hubba`,
          at: { x: -22.4, y: 2.3, z: 0 },
        },
        {
          id: `special`,
          kind: `trick`,
          kinds: Jn,
          on: [20],
          text: `Land a Special in the Fountain Bowl`,
          at: { x: -12, y: 0.5, z: 10.5 },
        },
        {
          id: `combo`,
          kind: `combo`,
          pts: 5e4,
          count: 10,
          text: `Land a 10-trick combo worth 50,000`,
        },
        {
          id: `tape`,
          kind: `spot`,
          spot: { x: 14.5, y: 7.8, z: -33.2 },
          text: `Find the secret tape`,
        },
      ],
    },
    {
      id: `city`,
      name: `Gridlock 'n' Roll`,
      parkId: `city`,
      need: 8,
      unlocks: 4,
      durationMs: 18e4,
      blurb: `Rush hour's cancelled. Bomb the hill, drain the ditch, take the freeway home.`,
      starter: [
        `high`,
        `skate`,
        `tickets`,
        `handrail`,
        `barrier`,
        `wallride`,
        `freeway`,
        `terrace`,
        `pipe`,
      ],
      goals: [
        ...R(6e4, 15e4, 32e4),
        {
          id: `skate`,
          kind: `skate`,
          text: `Collect S-K-A-T-E across the city`,
          spots: [I.summit, I.spillway, I.pipe, I.roof, I.bend],
        },
        {
          id: `tickets`,
          kind: `collect`,
          item: `ticket`,
          text: `Snag 5 parking tickets up the Spiral Ramp`,
          spots: [...I.tickets],
        },
        {
          id: `freeway`,
          kind: `gap`,
          gap: `Freeway Gap`,
          text: `Jump the Freeway Gap off the garage roof`,
          at: I.roof,
        },
        {
          id: `terrace`,
          kind: `gap`,
          gap: `Terrace Drop`,
          text: `Drop off a hill terrace's wall`,
          at: { x: -115, y: 7, z: 79 },
        },
        {
          id: `handrail`,
          kind: `trick`,
          kinds: L,
          on: [2e3],
          text: `Grind the Hill Street Handrail`,
          at: { x: -44.4, y: 1, z: 27 },
        },
        {
          id: `wallride`,
          kind: `trick`,
          kinds: [y.WALLRIDE],
          on: [5010, 5011],
          text: `Wallride a wall beside the Freeway`,
          at: { x: 132, y: 1.6, z: 0 },
        },
        {
          id: `barrier`,
          kind: `trick`,
          kinds: L,
          on: [I.helixId],
          text: `Grind the Spiral Ramp's barrier`,
          at: I.ramp,
        },
        {
          id: `pipe`,
          kind: `trick`,
          spin: 2,
          on: [3011],
          text: `Spin a 360 in the Culvert Pipe`,
          at: I.pipe,
        },
        {
          id: `combo`,
          kind: `combo`,
          pts: 8e4,
          count: 12,
          text: `Land a 12-trick combo worth 80,000`,
        },
        {
          id: `tape`,
          kind: `spot`,
          spot: I.tape,
          text: `Find the secret tape`,
        },
      ],
    },
    {
      id: `hangar`,
      name: `Hangtime Hangar`,
      parkId: `hangar`,
      need: 8,
      tour: 2,
      blurb: `Air show's grounded. The lights hang low over the pipe, the rafters are open and nobody's guarding the biplane.`,
      goals: [
        ...R(7e4, 17e4, 36e4),
        {
          id: `skate`,
          kind: `skate`,
          text: `Collect S-K-A-T-E`,
          spots: [
            { x: -22, y: 5.2, z: 18.6 },
            { x: 14, y: 2.6, z: -6 },
            { x: 0, y: 4.6, z: 27.5 },
            { x: 30.5, y: 8, z: 27.5 },
            { x: -11, y: 4.4, z: -27 },
          ],
        },
        {
          id: `wrenches`,
          kind: `collect`,
          item: `wrench`,
          text: `Find 5 lost wrenches`,
          spots: [
            { x: 27, y: 4.4, z: -24 },
            { x: 34, y: 7.8, z: 28.5 },
            { x: 20, y: 2.2, z: -4.5 },
            { x: -24, y: 4.4, z: 27.5 },
            { x: -22, y: 1.2, z: 11 },
          ],
        },
        {
          id: `biglight`,
          kind: `gap`,
          gap: `Big Light Hopper`,
          text: `Hop the Big Light over the pipe`,
        },
        {
          id: `rafters`,
          kind: `trick`,
          kinds: L,
          on: [32, 33, 34],
          text: `Grind a rafter`,
        },
        {
          id: `pipe720`,
          kind: `trick`,
          spin: 4,
          on: [1, 2],
          text: `Land a 720 on the Big Pipe`,
        },
        {
          id: `combo`,
          kind: `combo`,
          pts: 1e5,
          count: 12,
          text: `Land a 12-trick combo worth 100,000`,
        },
        {
          id: `tape`,
          kind: `spot`,
          spot: { x: 34.5, y: 7.6, z: -28.5 },
          text: `Find the secret tape`,
        },
      ],
    },
    {
      id: `beach`,
      name: `Mussel Beach`,
      parkId: `beach`,
      need: 9,
      tour: 2,
      blurb: `Sun's going down on the boardwalk. Every roof's a launch pad if you want it bad enough.`,
      goals: [
        ...R(8e4, 19e4, 4e5),
        {
          id: `skate`,
          kind: `skate`,
          text: `Collect S-K-A-T-E`,
          spots: [
            { x: -29.5, y: 4.4, z: 37 },
            { x: -11.5, y: 5.5, z: 37 },
            { x: -30, y: 4.9, z: 6 },
            { x: 39.5, y: 5.2, z: -30 },
            { x: 0, y: 2, z: -36 },
          ],
        },
        {
          id: `shells`,
          kind: `collect`,
          item: `shell`,
          text: `Collect 5 seashells`,
          spots: [
            { x: -11.5, y: 1, z: 39 },
            { x: 2, y: 7.4, z: 34 },
            { x: -28, y: 3.8, z: 3.5 },
            { x: 40.5, y: 5, z: -31 },
            { x: -6, y: 0.6, z: 4 },
          ],
        },
        {
          id: `canyon`,
          kind: `gap`,
          gap: `Canyon Hop`,
          text: `Drop the Canyon Hop off the gym roof`,
        },
        {
          id: `nineset`,
          kind: `gap`,
          gap: `Nine Set`,
          text: `Clear the Nine Set`,
        },
        {
          id: `pagoda`,
          kind: `trick`,
          kinds: L,
          on: [40, 41],
          text: `Grind the Pagoda`,
        },
        {
          id: `special`,
          kind: `trick`,
          kinds: Jn,
          on: [1],
          text: `Land a Special in the Pit`,
        },
        {
          id: `combo`,
          kind: `combo`,
          pts: 12e4,
          count: 13,
          text: `Land a 13-trick combo worth 120,000`,
        },
        {
          id: `tape`,
          kind: `spot`,
          spot: { x: -4.6, y: 10, z: 38.5 },
          text: `Find the secret tape`,
        },
      ],
    },
    {
      id: `bridge`,
      name: `Troll Bridge`,
      parkId: `bridge`,
      need: 10,
      tour: 2,
      durationMs: 15e4,
      blurb: `Pour your own. Everything under the bridge is fair game — and so is the bridge.`,
      goals: [
        ...R(9e4, 21e4, 45e4),
        {
          id: `skate`,
          kind: `skate`,
          text: `Collect S-K-A-T-E`,
          spots: [
            { x: -10, y: 5.6, z: 33.6 },
            { x: 32, y: 0.6, z: 29 },
            { x: -0.5, y: 4.6, z: 17 },
            { x: 0, y: 9.4, z: 17 },
            { x: -32, y: 6, z: -35 },
          ],
        },
        {
          id: `roses`,
          kind: `collect`,
          item: `rose`,
          text: `Pick 5 roses`,
          spots: [
            { x: -14, y: 1.8, z: -20 },
            { x: 38.5, y: 3.6, z: -20 },
            { x: 25, y: 9.2, z: 17 },
            { x: 10, y: 4.8, z: 35.3 },
            { x: 8, y: 3.6, z: 7 },
          ],
        },
        {
          id: `bridgedrop`,
          kind: `gap`,
          gap: `Bridge Drop`,
          text: `Drop off the bridge`,
        },
        {
          id: `beams`,
          kind: `trick`,
          kinds: L,
          on: [72, 73],
          text: `Grind a support beam`,
        },
        {
          id: `parapet`,
          kind: `trick`,
          kinds: L,
          on: [80, 81, 82, 83],
          text: `Grind the bridge's parapet`,
        },
        {
          id: `eyeball540`,
          kind: `trick`,
          spin: 3,
          on: [50],
          text: `Land a 540 in the Eyeball Pool`,
        },
        {
          id: `combo`,
          kind: `combo`,
          pts: 15e4,
          count: 14,
          text: `Land a 14-trick combo worth 150,000`,
        },
        {
          id: `tape`,
          kind: `spot`,
          spot: { x: -20.5, y: 4.8, z: 17 },
          text: `Find the secret tape`,
        },
      ],
    },
  ];
function Yn(e) {
  return z.find((t) => t.id === e);
}
function Xn(e) {
  return z.findIndex((t) => t.id === e);
}
function Zn(e, t) {
  if (!e.starter) return !1;
  let n = 0,
    r = !1;
  return (
    e.goals.forEach((i, a) => {
      t(a) ? n++ : e.starter.includes(i.id) && (r = !0);
    }),
    r && n < e.need
  );
}
var Qn = [
    {
      id: `kickflip`,
      kind: `trick`,
      trick: `Kickflip`,
      text: `Land a Kickflip`,
    },
    { id: `c2500`, kind: `combo`, pts: 2500, text: `Score 2,500 in one combo` },
    {
      id: `grind`,
      kind: `trick`,
      kinds: L,
      on: [22],
      text: `Grind the Big Handrail`,
    },
    {
      id: `gap`,
      kind: `gap`,
      gap: `West Kicker Gap`,
      text: `Clear the West Kicker Gap`,
    },
    {
      id: `spin540`,
      kind: `trick`,
      spin: 3,
      on: [1, 2, 3],
      text: `Land a 540 on the North Vert`,
    },
    {
      id: `five`,
      kind: `combo`,
      pts: 0,
      count: 5,
      text: `Chain a 5-trick combo`,
    },
    {
      id: `manual`,
      kind: `trick`,
      kinds: [y.MANUAL, y.SPECIAL_MANUAL],
      count: 3,
      text: `Link a combo with a Manual`,
    },
    {
      id: `lip`,
      kind: `trick`,
      kinds: [y.LIP],
      text: `Stall a lip trick on the vert`,
    },
    { id: `special`, kind: `trick`, kinds: Jn, text: `Pull off your Special` },
    { id: `c20k`, kind: `combo`, pts: 2e4, text: `Score 20,000 in one combo` },
  ],
  $n = `plaza`,
  er = [6, 4, 2],
  tr = { coin: `pickup_coin`, stash: `pickup_stash`, deck: `pickup_deck` },
  B = (e, t, n, r) => ({ id: e, tier: 0, x: t, y: n, z: r }),
  V = (e, t, n, r) => ({ id: e, tier: 1, x: t, y: n, z: r }),
  H = (e, t, n, r) => ({ id: e, tier: 2, x: t, y: n, z: r }),
  nr = [
    B(0, -3, 1.2, 8),
    B(1, -6, 1.2, 16),
    B(2, 6, 1.2, 16),
    B(3, -14, 1.2, 0),
    B(4, 14, 1.2, 0),
    B(5, 0, 1.2, 22),
    B(6, -20, 1.2, 20),
    B(7, 12, 1.2, 26),
    B(8, -12, 1.2, -28),
    B(9, 12, 1.2, -30),
    B(10, -36, 1.2, 4),
    B(11, -20, 1.2, -18),
    B(12, 22, 1.55, 6),
    B(13, 32, 1.2, -12),
    B(14, 26, 1.2, 20),
    B(15, -26, 1.2, 0),
    B(16, 0, 1.2, -29),
    B(17, 36, 1.2, 20),
    V(18, -9.5, 1.9, 4),
    V(19, 9.5, 1.9, 0),
    V(20, 20, 1.9, -17),
    V(21, 20, 1.95, 15),
    V(22, 37, 2.4, -4),
    V(23, 38, 2.8, 5),
    V(24, 32.5, 2.65, 32),
    V(25, -27, 2.5, 8),
    V(26, -27, 1.9, 33.5),
    V(27, 25, 1.95, -35),
    V(28, 34, 1.5, -42),
    H(29, -4.5, 5.8, 35.5),
    H(30, 9, 5.8, 35.5),
    H(31, 4, 3.8, -34.75),
    H(32, -31, 1.2, 25),
    H(33, -27, 2.6, -8),
    H(34, -33, 4.4, -33),
    H(35, 0, 3.4, 3),
  ],
  rr = null;
function ir(e) {
  if (rr?.day === e) return rr.drops;
  let t = [];
  return (
    er.forEach((n, r) => {
      let i = nr
        .filter((e) => e.tier === r)
        .map((t) => ({ d: t, k: ae(ie(`drop`, e, t.id))() }))
        .sort((e, t) => e.k - t.k || e.d.id - t.d.id);
      t.push(...i.slice(0, n).map((e) => e.d));
    }),
    (rr = { day: e, drops: t }),
    t
  );
}
var U = (e, t, n, r) => ({
    id: `hub.${e}`,
    kind: `stash`,
    park: $n,
    x: t,
    y: n,
    z: r,
    coins: 25,
  }),
  W = (e, t, n, r) => ({
    id: `deck.${e}`,
    kind: `deck`,
    level: e,
    x: t,
    y: n,
    z: r,
    coins: 50,
  }),
  ar = [
    U(`vert`, 0, 1.2, 42),
    U(`vertdeck`, -8, 4.6, 38.2),
    U(`pocket`, -39, 1.2, -39),
    U(`pool`, -33, -1.4, 25),
    U(`deck`, 43, 2.4, 7),
    U(`bankbox`, 37.5, 2.2, 34.8),
    U(`curb`, 42, 1.2, -42),
    U(`banktop`, -38.2, 2.3, -6),
    U(`corner`, -41, 1.2, 41),
    U(`mini`, 8, 3.6, -43.6),
    W(`skool`, 16, 3.9, 30.6),
    W(`crates`, -12, 4.2, -8),
    W(`pier`, 21, 3.8, 30),
    W(`mall`, 35, 2.7, 23),
    W(`city`, I.deck.x, I.deck.y, I.deck.z),
    W(`hangar`, 30, 8, -8),
    W(`beach`, 35.5, 4.4, 40.5),
    W(`bridge`, 30, 2, -38.4),
  ],
  or = new Map(ar.map((e) => [e.id, e])),
  sr = (e) => or.get(e),
  cr = (e) => ar.filter((t) => t.kind === `stash` && t.park === e),
  lr = (e) => or.get(`deck.${e}`),
  ur = [
    `noads`,
    `pros`,
    `secrets`,
    `style:street`,
    `style:party`,
    `style:royal`,
  ],
  G = (e) => ({ apple: `tailgrab.${e}`, google: `tailgrab.${e}` }),
  dr = {
    noads: {
      id: `noads`,
      kind: `noads`,
      name: `Supporter`,
      blurb: `No ad breaks, and every ad reward with a tap.`,
      sticker: `star`,
      skus: G(`noads`),
      listing: {
        usd: `4.99`,
        about: `No ad breaks, and every ad reward with a tap.`,
      },
    },
    pros: {
      id: `pros`,
      kind: `pros`,
      name: `The Whole Crew`,
      blurb: `Every pro, and every pro still to come.`,
      sticker: `trophy`,
      skus: G(`pros`),
      listing: {
        usd: `9.99`,
        about: `Every pro, and every pro still to come.`,
      },
    },
    secrets: {
      id: `secrets`,
      kind: `secrets`,
      name: `Sealed Secrets`,
      blurb: `Every secret skater, out there now and still to come. Skip the riddles.`,
      sticker: `sparkle`,
      skus: G(`secrets`),
      listing: { usd: `4.99`, about: `Every secret skater, now and to come.` },
    },
    "style:street": {
      id: `style:street`,
      kind: `style`,
      name: `Street Pack`,
      blurb: `Hoodie, baggies, two hats, a backpack and a boombox.`,
      sticker: `spray`,
      skus: G(`style.street`),
      listing: {
        usd: `1.99`,
        about: `Hoodie, baggies, two hats, backpack, boombox.`,
      },
      keys: [
        `top:hoodie`,
        `bottom:baggies`,
        `hat:cap-back`,
        `hat:beanie-pom`,
        `acc:backpack`,
        `acc:boombox`,
      ],
    },
    "style:party": {
      id: `style:party`,
      kind: `style`,
      name: `Party Pack`,
      blurb: `Party hat, propeller, balloon, fairy dress and wings.`,
      sticker: `popper`,
      skus: G(`style.party`),
      listing: {
        usd: `1.99`,
        about: `Party hat, propeller, balloon, dress, wings.`,
      },
      keys: [
        `hat:party`,
        `hat:propeller`,
        `acc:balloon`,
        `top:dress`,
        `acc:wings`,
      ],
    },
    "style:royal": {
      id: `style:royal`,
      kind: `style`,
      name: `Royal Pack`,
      blurb: `Crown, cape, visor and a spare deck.`,
      sticker: `trophy`,
      skus: G(`style.royal`),
      listing: { usd: `1.99`, about: `Crown, cape, visor and a spare deck.` },
      keys: [`hat:crown`, `acc:cape`, `hat:visor`, `acc:spare-deck`],
    },
  },
  fr = (e) => Object.hasOwn(dr, e);
function pr(e, t) {
  return e === `fake`
    ? fr(t)
      ? t
      : void 0
    : ur.find((n) => dr[n].skus[e] === t);
}
var mr = (e, t) => !!e && e.paid.includes(t),
  hr = (e) => mr(e, `noads`),
  K = [`air`, `speed`, `spin`, `balance`],
  gr = 8,
  _r = {
    goal: 500,
    clear: 1500,
    plazaGoal: 250,
    match: 250,
    win: 750,
    botMatch: 50,
    botWin: 100,
    tutorial: 500,
  };
function q(e) {
  let t = z.find((t) => t.unlocks === e);
  return t ? { kind: `career`, level: t.id } : (C[e]?.unlock ?? null);
}
var vr = (e, t) =>
    !!e && (e.kind === t || (e.kind === `any` && e.of.some((e) => vr(e, t)))),
  yr = C.map((e) => e.id).filter((e) => vr(q(e), `starter`)),
  br = (e) => vr(e, `ad`);
[
  ...C.filter((e) => br(q(e.id))).map((e) => `pro:${e.id}`),
  ...Object.entries(ge).flatMap(([e, t]) =>
    t.filter((e) => br(e.unlock)).map((t) => `${e}:${t.id}`),
  ),
];
function xr(e) {
  if (e?.kind === `career`) return e.level;
  if (e?.kind !== `any`) return null;
  for (let t of e.of) {
    let e = xr(t);
    if (e) return e;
  }
  return null;
}
function Sr(e) {
  if (e?.kind === `shop`) return e.price;
  if (e?.kind !== `any`) return null;
  for (let t of e.of) {
    let e = Sr(t);
    if (e !== null) return e;
  }
  return null;
}
var Cr = (e) =>
    Object.entries(ge).flatMap(([t, n]) =>
      n.flatMap((n) => {
        let r = Sr(n.unlock);
        return r !== null && !!n.secret === e ? [[`${t}:${n.id}`, r]] : [];
      }),
    ),
  wr = new Map([
    ...Cr(!1),
    ...pe.flatMap((e) =>
      _e.filter((t) => !fe[e].has(t.id)).map((t) => [de(e, t.id), 40]),
    ),
  ]),
  Tr = new Map(Cr(!0));
function Er(e) {
  let [t, n] = e.split(`:`);
  return t in ge ? me(t, n)?.secret : void 0;
}
function Dr(e, t) {
  let n = Er(t);
  return !n || kr(e, n) || (!!e && t in e.bought);
}
function Or(e) {
  if (!e || !Ae.some((t) => kr(e, t.key))) return wr;
  let t = new Map(wr);
  for (let [n, r] of Tr) Dr(e, n) && t.set(n, r);
  return t;
}
function kr(e, t) {
  return (
    !!e &&
    !!ke(t) &&
    (e.secrets.includes(t) || mr(e, `secrets`) || e.cheats.includes(`secret`))
  );
}
function Ar(e, t) {
  return !!e && e.secrets.includes(t);
}
var jr = [`top`, `bottom`, `hat`, `acc`];
function Mr(e) {
  if (e.startsWith(`color:`)) return !!ve(e);
  let t = e.split(`:`)[0];
  return t === `pro` || t === `skin` || t in ge;
}
function Nr() {
  return {
    v: 3,
    name: ``,
    named: !1,
    xp: 0,
    stats: { air: 0, speed: 0, spin: 0, balance: 0 },
    career: {},
    plaza: [],
    extraSkaters: [],
    starter: null,
    ads: [],
    cheats: [],
    secrets: [],
    kept: [],
    seeded: !1,
    life: {
      banked: 0,
      bestCombo: 0,
      runs: 0,
      matches: 0,
      wins: 0,
      missions: 0,
      bails: 0,
    },
    custom: null,
    missions: Ie(),
    coins: 0,
    bought: {},
    found: [],
    drops: { day: 0, got: [] },
    adDay: 0,
    adTopUps: 0,
    paid: [],
    tutored: !1,
  };
}
var J = (e, t = 2 ** 53 - 1) =>
    typeof e == `number` && Number.isFinite(e)
      ? Math.max(0, Math.min(t, Math.floor(e)))
      : 0,
  Y = (e) =>
    Array.isArray(e) ? [...new Set(e.filter((e) => typeof e == `string`))] : [];
function Pr(e) {
  let t = Nr();
  if (!e || typeof e != `object`) return t;
  let n = e;
  ((t.name = typeof n.name == `string` ? n.name.slice(0, 32) : ``),
    (t.named =
      typeof n.named == `boolean`
        ? n.named
        : !!t.name && !Fe(t.name) && !Bn(t.name)),
    (t.xp = J(n.xp)));
  for (let e of K) t.stats[e] = J(n.stats?.[e], gr);
  if (n.career && typeof n.career == `object`)
    for (let [e, r] of Object.entries(n.career))
      Yn(e) &&
        r &&
        typeof r == `object` &&
        (t.career[e] = { goals: Y(r.goals), best: J(r.best) });
  ((t.plaza = Y(n.plaza)),
    (t.extraSkaters = Array.isArray(n.extraSkaters)
      ? [
          ...new Set(
            n.extraSkaters.filter(
              (e) => Number.isInteger(e) && e >= 0 && e < C.length,
            ),
          ),
        ]
      : []),
    (t.starter =
      typeof n.starter == `number` && yr.includes(n.starter)
        ? n.starter
        : null),
    (t.ads = Y(n.ads)),
    (t.cheats = Y(n.cheats).filter(pi)),
    (t.secrets = Y(n.secrets)),
    (t.kept = Y(n.kept)),
    (t.seeded = n.seeded === !0));
  let r = n.life;
  t.life = {
    banked: J(r?.banked),
    bestCombo: J(r?.bestCombo),
    runs: J(r?.runs),
    matches: J(r?.matches),
    wins: J(r?.wins),
    missions: J(r?.missions),
    bails: J(r?.bails),
  };
  let i = n.custom;
  if (
    (i &&
      typeof i == `object` &&
      typeof i.look == `string` &&
      i.look.length <= 160 &&
      ce(i.look) &&
      Number.isInteger(i.style) &&
      i.style >= 0 &&
      i.style < Me.length &&
      (t.custom = { look: i.look, style: i.style }),
    (t.missions = Le(n.missions)),
    (t.coins = J(n.coins)),
    n.bought && typeof n.bought == `object`)
  )
    for (let [e, r] of Object.entries(n.bought))
      typeof r == `number` && Number.isFinite(r) && (t.bought[e] = J(r));
  t.found = Y(n.found);
  let a = n.drops;
  (a &&
    typeof a == `object` &&
    (t.drops = {
      day: J(a.day),
      got: Array.isArray(a.got)
        ? [...new Set(a.got.filter((e) => Number.isInteger(e) && e >= 0))]
        : [],
    }),
    (t.adDay = J(n.adDay)),
    (t.adTopUps = J(n.adTopUps, 3)),
    (t.paid = Y(n.paid)),
    (t.tutored = n.tutored === !0));
  let o = n.v;
  return (o === 1 && Fr(t), (o === 1 || o === 2) && zr(t), t);
}
function Fr(e) {
  let t = X(e.xp).level,
    n = [0, 2, 3, 5, 6, 8, 9, ...(t >= 3 ? [16] : []), ...(t >= 5 ? [14] : [])];
  e.extraSkaters = [...new Set([...e.extraSkaters, ...n])];
}
var Ir = [
    `FF3D7F`,
    `FF8A1F`,
    `FFD21F`,
    `2FD67B`,
    `1FC7E8`,
    `4F6BFF`,
    `B9804F`,
    `8A5A3C`,
    `FFFFFF`,
    `FFF4E0`,
    `1D1A3A`,
    `3B2C4F`,
  ],
  Lr = [`FF7A7A`, `FFB38A`, `9BE08C`, `5C4033`, `6B6F80`],
  Rr = {
    "hat:bucket": { kind: `xp`, level: 2 },
    "hat:docker": { kind: `xp`, level: 3 },
    "top:tank": { kind: `xp`, level: 4 },
    "bottom:baggies": { kind: `xp`, level: 6 },
    "acc:backpack": { kind: `xp`, level: 8 },
    "top:longsleeve": { kind: `xp`, level: 10 },
    "hat:visor": { kind: `xp`, level: 12 },
  };
function zr(e) {
  let t = new Set([...Ir, ...(X(e.xp).level >= 5 ? Lr : [])]);
  for (let n in e.bought) /^color:[0-9A-F]{6}$/.test(n) && t.add(n.slice(6));
  let n = new Set();
  for (let r of Yr(e)) {
    let e = C[r];
    n.add(`head:${e.species}`);
    for (let t of jr) n.add(`${t}:${e.look[t]}`);
    for (let n of le) t.add(e.look.c[n].slice(1));
  }
  for (let [t, r] of Object.entries(Rr)) qr(e, r, t) && n.add(t);
  for (let e of t) for (let t of pe) n.add(de(t, e));
  let r = Jr(e);
  e.kept = [...new Set([...e.kept, ...[...n].filter((e) => !r.has(e))])];
}
function Br(e) {
  return 250 * e * (e - 1);
}
function X(e) {
  let t = 1;
  for (; e >= Br(t + 1);) t++;
  return { level: t, into: e - Br(t), span: Br(t + 1) - Br(t) };
}
function Vr(e, t) {
  let n = Yn(t),
    r = e.career[t]?.goals ?? [];
  return n ? r.filter((e) => n.goals.some((t) => t.id === e)) : [];
}
function Hr(e, t) {
  let n = Yn(t);
  return !!n && Vr(e, t).length >= n.need;
}
function Ur(e, t) {
  let n = Xn(t);
  return n === 0 || (n > 0 && Hr(e, z[n - 1].id));
}
function Wr(e, t) {
  let n = 0,
    r = 0;
  for (let i of z)
    (t === void 0 || (i.tour ?? 1) === t) &&
      ((n += Vr(e, i.id).length), (r += i.goals.length));
  return r ? n / r : 0;
}
function Gr(e) {
  let t = 0;
  for (let n of z) t += Vr(e, n.id).length;
  let n = K.reduce((t, n) => t + e.stats[n], 0);
  return {
    earned: t,
    spent: n,
    free: Math.max(0, Math.min(t, gr * K.length) - n),
  };
}
function Kr(e, t = !0) {
  let n = Ne(X(e.xp).level) << 16;
  return (
    t &&
      K.forEach((t, r) => {
        n |= (Math.min(gr, e.stats[t]) & 15) << (r * 4);
      }),
    n
  );
}
function qr(e, t, n) {
  if (!t) return !0;
  if (t.kind === `any`) return t.of.some((t) => qr(e, t, n));
  if (!e) return !1;
  switch (t.kind) {
    case `career`:
      return Hr(e, t.level);
    case `xp`:
      return X(e.xp).level >= t.level;
    case `feat`:
      return e.life[t.stat] >= t.n;
    case `complete`:
      return Wr(e, 1) >= 1;
    case `stars`:
      return e.missions.stars >= t.n;
    case `starter`:
      return e.starter !== null && n === `pro:${e.starter}`;
    case `ad`:
      return e.ads.includes(n);
    case `shop`:
      return n in e.bought;
  }
}
function Jr(e) {
  let t = new Set(),
    n = !!e?.cheats.includes(`skaters`) || mr(e, `pros`);
  for (let r of C)
    (n || qr(e, q(r.id), `pro:${r.id}`) || e?.extraSkaters.includes(r.id)) &&
      t.add(`pro:${r.id}`);
  for (let n of Ae) kr(e, n.key) && t.add(`skin:${n.key}`);
  for (let [n, r] of Object.entries(ge))
    for (let i of r) qr(e, i.unlock, `${n}:${i.id}`) && t.add(`${n}:${i.id}`);
  for (let n of pe)
    for (let r of _e) {
      let i = de(n, r.id);
      (fe[n].has(r.id) || (e && i in e.bought)) && t.add(i);
    }
  for (let n of e?.kept ?? []) t.add(n);
  for (let n of e?.paid ?? [])
    for (let e of (fr(n) && dr[n].keys) || []) t.add(e);
  return t;
}
function Yr(e) {
  let t = new Set();
  for (let n of Jr(e)) n.startsWith(`pro:`) && t.add(Number(n.slice(4)));
  return t;
}
function Xr(e) {
  let [t, n] = e.split(`:`);
  if (t === `pro`) return q(Number(n));
  if (t === `color`) {
    let t = ve(e);
    return t && !fe[t.tab].has(t.id) ? { kind: `shop`, price: 40 } : null;
  }
  return t in ge ? (me(t, n)?.unlock ?? null) : null;
}
function Zr(e) {
  if (!e) return ``;
  switch (e.kind) {
    case `any`:
      return e.of
        .filter(
          (e) => e.kind !== `ad` && e.kind !== `starter` && e.kind !== `shop`,
        )
        .map(Zr)
        .filter(Boolean)
        .join(` or `);
    case `starter`:
      return `Pick as your starter`;
    case `ad`:
      return `Watch an ad`;
    case `shop`:
      return ``;
    case `career`:
      return `Clear ${Yn(e.level)?.name ?? e.level} in Career`;
    case `xp`:
      return `Reach LV ${e.level}`;
    case `stars`:
      return `Collect ${e.n} stars on the Star Road`;
    case `complete`:
      return `Finish 100% of the Career`;
    case `feat`: {
      let t = e.n.toLocaleString(`en-US`);
      return {
        wins: `Win ${t} matches`,
        matches: `Play ${t} matches`,
        runs: `Skate ${t} career runs`,
        bestCombo: `Land a ${t}-point combo`,
        banked: `Bank ${t} combo points`,
        missions: `Complete ${t} missions`,
        bails: `Bail ${t} times`,
      }[e.stat];
    }
  }
}
function Qr(e) {
  if (!e) return null;
  if (e.kind !== `any`)
    return e.kind === `starter` || e.kind === `ad` || e.kind === `shop`
      ? null
      : e;
  for (let t of e.of) {
    let e = Qr(t);
    if (e) return e;
  }
  return null;
}
function $r(e, t) {
  let n = Qr(e);
  if (!n) return null;
  let r = 0,
    i = 1,
    a = 0;
  switch (n.kind) {
    case `xp`: {
      let e = X(t?.xp ?? 0);
      ((r = e.level),
        (i = n.level),
        (a = (e.level - 1 + e.into / e.span) / Math.max(1, i - 1)));
      break;
    }
    case `career`:
      ((r = t ? Vr(t, n.level).length : 0),
        (i = Yn(n.level)?.need ?? 1),
        (a = r / i));
      break;
    case `stars`:
      ((r = t?.missions.stars ?? 0), (i = n.n), (a = r / i));
      break;
    case `feat`:
      ((r = t?.life[n.stat] ?? 0), (i = n.n), (a = r / i));
      break;
    case `complete`:
      i = 0;
      for (let e of z)
        (e.tour ?? 1) === 1 &&
          ((i += e.goals.length), t && (r += Vr(t, e.id).length));
      a = i ? r / i : 1;
  }
  return {
    rule: n,
    have: Math.min(r, i),
    need: i,
    frac: Math.max(0, Math.min(1, a)),
    ad: br(e),
  };
}
var ei = (e) => (e.rule.kind === `complete` ? `career` : e.rule.kind),
  ti = [`career`, `xp`, `stars`, `feat`];
function ni(e, t = 3) {
  let n = Yr(e),
    r = (t) =>
      t.rule.kind === `career` &&
      (e ? Ur(e, t.rule.level) : Xn(t.rule.level) === 0),
    i = (e, t) =>
      r(e) === r(t)
        ? e.frac === t.frac
          ? e.need - e.have < t.need - t.have
          : e.frac > t.frac
        : r(e),
    a = new Map();
  for (let t of C) {
    if (n.has(t.id)) continue;
    let r = $r(q(t.id), e);
    if (!r) continue;
    let o = ei(r),
      s = a.get(o);
    (!s || i(r, s.r)) && a.set(o, { id: t.id, r });
  }
  return [...a]
    .sort(
      ([e, t], [n, r]) => r.r.frac - t.r.frac || ti.indexOf(e) - ti.indexOf(n),
    )
    .slice(0, t)
    .map(([, e]) => e.id);
}
function ri(e, t) {
  let n = ue,
    r = {};
  for (let i of le) r[i] = t.has(de(ye(i), e.c[i].slice(1))) ? e.c[i] : n.c[i];
  return {
    ...e,
    head: t.has(`head:${e.head}`) ? e.head : n.head,
    top: t.has(`top:${e.top}`) ? e.top : n.top,
    bottom: t.has(`bottom:${e.bottom}`) ? e.bottom : n.bottom,
    hat: t.has(`hat:${e.hat}`) ? e.hat : n.hat,
    acc: t.has(`acc:${e.acc}`) ? e.acc : n.acc,
    c: r,
  };
}
function ii(e) {
  let t = Jr(e),
    n = new Map();
  for (let e of C) {
    let r = ai(q(e.id)),
      i = `pro:${e.id}`;
    r && !t.has(i) && n.set(r, [...(n.get(r) ?? []), i]);
  }
  let r = Math.min(...n.keys());
  return Number.isFinite(r) ? { level: r, keys: n.get(r) } : null;
}
function ai(e) {
  if (e?.kind === `xp`) return e.level;
  if (e?.kind !== `any`) return 0;
  let t = e.of.map(ai).filter((e) => e > 0);
  return t.length ? Math.min(...t) : 0;
}
function oi(e) {
  return !!e && !e.named;
}
function si(e, t) {
  return !!e && e.named && e.name !== Hn(t);
}
function ci(e) {
  let [t, n] = e.split(`:`);
  return t === `pro`
    ? Pe(Number(n)).name
    : t === `skin`
      ? (ke(n)?.name ?? n)
      : t === `color`
        ? (he(ve(e)?.id ?? ``)?.name ?? e)
        : (me(t, n)?.name ?? n);
}
function li(e) {
  let t = [];
  for (let n of e)
    n.startsWith(`pro:`) && t.push({ kind: `pro`, pro: Number(n.slice(4)) });
  for (let n of e)
    n.startsWith(`skin:`) && t.push({ kind: `skin`, skin: n.slice(5) });
  let n = { kind: `loose`, pieces: [], colors: [] };
  for (let t of e)
    t.startsWith(`pro:`) ||
      t.startsWith(`skin:`) ||
      !Mr(t) ||
      t.startsWith(`head:`) ||
      (t.startsWith(`color:`) ? n.colors : n.pieces).push(t);
  return n.pieces.length || n.colors.length ? [...t, n] : t;
}
var ui = (e) =>
  e.flatMap((e) =>
    e.kind === `skater`
      ? [`pro:${e.skater}`]
      : e.kind === `secret`
        ? [`skin:${e.skin}`]
        : e.kind === `item`
          ? [e.item]
          : [],
  );
function di(e, t, n) {
  return !K.includes(t) ||
    (n > 0 && (Gr(e).free <= 0 || e.stats[t] >= gr)) ||
    (n < 0 && e.stats[t] <= 0)
    ? !1
    : ((e.stats[t] += n), !0);
}
var fi = [`skaters`, `secret`],
  pi = (e) => fi.includes(e);
function mi(e) {
  let t = 0;
  for (let n in e.bought) t += e.bought[n];
  return Math.max(0, e.coins - t);
}
function hi(e, t) {
  return e.drops.day === t ? e.drops.got : [];
}
function gi(e, t) {
  return t > e.adDay ? 3 : t === e.adDay ? Math.max(0, 3 - e.adTopUps) : 0;
}
var _i = (e, t) => gi(e, t) > 0,
  vi = {
    ollie: x.OLLIE,
    flip: x.FLIP,
    grab: x.GRAB,
    grind: x.GRIND,
    spinL: x.SPIN_L,
    spinR: x.SPIN_R,
    reset: x.RESET,
    walk: x.WALK,
  },
  yi = 90,
  bi = class {
    held = { kb: new Set(), pad: new Set(), touch: new Set() };
    stick = { pad: { x: 0, y: 0 }, touch: { x: 0, y: 0 } };
    pressed = 0;
    released = 0;
    pressDir = 0;
    tapDir = 0;
    lastDir = 0;
    lastCard = 0;
    lastNonZeroDir = 0;
    lastNonZeroAt = 0;
    flicks = [];
    holds = new Set();
    pressFns = new Set();
    lastSource = `kb`;
    get capturing() {
      return this.holds.size > 0;
    }
    hold(e) {
      this.holds.size ? this.holds.add(e) : (this.holds.add(e), this.clear());
    }
    release(e) {
      this.holds.delete(e);
    }
    holding(e) {
      return this.holds.has(e);
    }
    onPress(e) {
      return (this.pressFns.add(e), () => this.pressFns.delete(e));
    }
    noteSource(e) {
      this.lastSource = e;
    }
    set(e, t, n) {
      if (this.capturing && n) return;
      let r = this.held[e],
        i = this.isHeld(t);
      n ? r.add(t) : r.delete(t);
      let a = this.isHeld(t),
        o = vi[t];
      if (
        (o &&
          (!i &&
            a &&
            ((this.pressed |= o), (this.pressDir = this.lookbackDir())),
          i && !a && (this.released |= o)),
        n && (this.lastSource = e),
        this.trackDir(),
        !i && a)
      )
        for (let e of this.pressFns) e(t);
    }
    setStick(e, t, n) {
      this.capturing && ((t = 0), (n = 0));
      let r = this.stick[e];
      ((r.x = t),
        (r.y = n),
        (t || n) && (this.lastSource = e),
        this.trackDir());
    }
    tap(e) {
      let t = vi[e];
      t && (this.pressed |= t);
    }
    flick(...e) {
      this.capturing || this.flicks.push(...e);
    }
    clear(e) {
      (!e || e === `touch`) && (this.flicks.length = 0);
      for (let t of e ? [e] : [`kb`, `pad`, `touch`]) {
        for (let e of [...this.held[t]]) this.set(t, e, !1);
        t !== `kb` && this.setStick(t, 0, 0);
      }
    }
    isHeld(e) {
      return (
        this.held.kb.has(e) || this.held.pad.has(e) || this.held.touch.has(e)
      );
    }
    dir() {
      let e = +!!this.isHeld(`right`) - !!this.isHeld(`left`),
        t = +!!this.isHeld(`up`) - !!this.isHeld(`down`);
      for (let n of [this.stick.pad, this.stick.touch]) {
        if (Math.hypot(n.x, n.y) < 0.35) continue;
        let r = Math.atan2(n.y, n.x),
          i = Math.round(r / (Math.PI / 4));
        ((e = Math.round(Math.cos((i * Math.PI) / 4))),
          (t = Math.round(Math.sin((i * Math.PI) / 4))));
      }
      return be(e, t);
    }
    stickX() {
      let e = 0;
      for (let t of [this.stick.pad, this.stick.touch]) {
        let n = Math.hypot(t.x, t.y);
        n >= 0.35 && (e = t.x / Math.max(1, n));
      }
      return Math.round(e * 127) || 0;
    }
    lookbackDir() {
      return (
        this.dir() ||
        (performance.now() - this.lastNonZeroAt < yi ? this.lastNonZeroDir : 0)
      );
    }
    trackDir() {
      let e = this.dir();
      e &&
        ((this.lastNonZeroDir = e), (this.lastNonZeroAt = performance.now()));
      let t = xi(e, this.lastDir, this.lastCard);
      (t && t !== this.lastCard && (this.tapDir = t),
        (this.lastCard = e ? t : 0),
        (this.lastDir = e));
    }
    heldBits() {
      let e = 0;
      for (let t of Object.keys(vi)) this.isHeld(t) && (e |= vi[t]);
      return e;
    }
    consume(e, t) {
      ((e.dir = this.dir()),
        (e.stickX = this.stickX()),
        (e.held = this.heldBits()));
      let n = this.flicks.shift() ?? 0;
      return (
        t
          ? ((e.pressed = this.pressed),
            (e.released = this.released),
            (e.pressDir = this.pressed ? this.pressDir : 0),
            (e.tapDir = n || this.tapDir),
            n || (this.tapDir = 0),
            (this.pressed = 0),
            (this.released = 0),
            (this.pressDir = 0))
          : ((e.pressed = 0),
            (e.released = 0),
            (e.pressDir = 0),
            (e.tapDir = n)),
        e
      );
    }
  };
function xi(e, t, n) {
  if (!e) return 0;
  if (e === b.U || e === b.D || e === b.L || e === b.R) return e;
  let r = (e) => e === t || e === n,
    [i, a] = {
      [b.UR]: [b.U, b.R],
      [b.DR]: [b.D, b.R],
      [b.DL]: [b.D, b.L],
      [b.UL]: [b.U, b.L],
    }[e];
  return r(i) && !r(a) ? a : r(a) && !r(i) ? i : n || i;
}
var Si = new bi(),
  Ci = () => void 0,
  wi = !1;
function Ti() {}
function Ei() {
  Ci()?.gameLoadingFinished();
}
function Di(e) {
  let t = Ci();
  if (t && !e) {
    wi && ((wi = !1), t.gameplayStop());
    return;
  }
}
async function Oi() {}
async function ki() {
  return !1;
}
function Ai(e, t, n) {
  let r = (e) => e.replace(/[/^]/g, `-`);
  try {
    Ci()?.measure?.(r(e), r(t), r(n));
  } catch {}
}
async function ji(e) {
  return Mi(e);
}
function Mi(e) {
  let t = new URL(location.origin + location.pathname);
  for (let [n, r] of Object.entries(e)) t.searchParams.set(n, r);
  return t.href;
}
function Ni(e, t = new URLSearchParams(location.search)) {
  return t.get(`gd${e}`) ?? t.get(e);
}
var Pi = {
    id: `web`,
    init: Ti,
    loaded: Ei,
    playing: Di,
    measure(e, t, n) {
      (Ai(e, t, n), window.gtag?.(`event`, `${e}_${n}`, { what: t }));
    },
    ads: { kind: `off`, rewarded: ki, interstitial: Oi },
    link: ji,
    href: Mi,
    param: Ni,
    store: null,
    signIns: [],
    signIn: async () => null,
    account: null,
    haptic: (e) => void navigator.vibrate?.(e),
    onPause: () => {},
    freeChat: !0,
    linksOut: !0,
    ownsFullscreen: !1,
    reloadOnChunkError: !0,
  },
  Z = { account: null, profile: null },
  Fi = new Set();
function Ii(e) {
  return (Fi.add(e), () => Fi.delete(e));
}
function Q(e, t = []) {
  Z.profile = Pr(e);
  for (let e of Fi) e(Z.profile, t);
}
var Li = 0,
  Ri = (e) => {
    typeof e == `number` && (Li = e - Date.now());
  },
  zi = () => Date.now() + Li,
  Bi = async () => (await P.http.get(`/me`)).data;
function Vi(e) {
  (Ri(e.now),
    (Z.account = {
      id: e.id,
      email: e.email,
      anonymous: e.anonymous,
      poki: !!e.poki,
      apple: !!e.apple,
      google: !!e.google,
    }),
    Q(e.profile, e.events ?? []));
}
async function Hi() {
  Vi(await Bi());
}
async function Ui(e) {
  try {
    let t = (await P.http.post(`/auth/poki`, { body: { token: e } })).data;
    P.auth.token = t.token;
    try {
      localStorage.setItem(P.auth.settings.key, t.token);
    } catch {}
  } catch (e) {
    console.warn(
      `[account] Poki sign-in failed, keeping this browser's account`,
      e,
    );
  }
}
var Wi = (e) => e?.code,
  Gi = null;
function Ki(e = 5e3) {
  return (Gi ??= (async () => {
    let t = async () => {
        let e = Pi.account ? await Pi.account.player(2e3) : void 0;
        if ((e && (await Ui(e.token)), P.auth.token))
          try {
            let t = await Bi();
            if (!(e === null && t.poki)) {
              Vi(t);
              return;
            }
          } catch (e) {
            if (Wi(e) !== 401) throw e;
          }
        (await P.auth.signInAnonymously(), await Hi());
      },
      n,
      r = new Promise((t, r) => {
        n = setTimeout(() => r(Error(`account timeout`)), e);
      });
    try {
      await Promise.race([t(), r]);
    } catch (e) {
      console.warn(`[account] playing as a guest without progress`, e);
    } finally {
      clearTimeout(n);
    }
  })());
}
function qi() {
  return ia(async () => {
    try {
      await Hi();
    } catch (e) {
      console.warn(`[account] refresh failed`, e);
    }
  });
}
async function Ji(e, t) {
  return (await P.http.post(`/me/stats`, { body: { stat: e, delta: t } })).data
    .profile;
}
async function Yi(e, t) {
  let n = (await P.http.post(`/me/look`, { body: { look: se(e), style: t } }))
    .data;
  Q(n.profile);
}
async function Xi(e, t = !1) {
  let n = (await P.http.post(`/me/name`, { body: { name: e, ad: t } })).data;
  Q(n.profile);
}
var Zi = () => (Z.account ? Vn(Z.account.id) : ``),
  Qi = () => !!Z.account && si(Z.profile, Z.account.id);
async function $i(e) {
  let t = (await P.http.post(`/me/ad-unlock`, { body: { key: e } })).data;
  Q(t.profile, t.events);
}
async function ea(e) {
  let t = (await P.http.post(`/me/cheat`, { body: { cheat: e } })).data;
  Q(t.profile);
}
async function ta(e) {
  let t = (await P.http.post(`/me/shop/buy`, { body: { key: e } })).data;
  Q(t.profile);
}
async function na(e) {
  let t = (await P.http.post(`/me/shop/ad-coins`, { body: { key: e } })).data;
  return (
    Ri(t.now),
    Q(t.profile),
    t.events.reduce((e, t) => e + (t.kind === `coins` ? t.gained : 0), 0)
  );
}
var ra = Promise.resolve();
function ia(e) {
  let t = ra.then(e);
  return ((ra = t.catch(() => {})), t);
}
function aa(e, t) {
  return ia(async () => {
    let n = (await P.http.post(e, { body: t })).data;
    return (Ri(n.now), n);
  });
}
async function oa(e, t, n) {
  let r = await aa(e, t),
    i = Z.profile;
  return (
    Q(r.profile, r.events.some((e) => e.kind === n) ? [] : r.events),
    { ...r, was: i }
  );
}
function sa(e, t) {
  return oa(`/me/missions/claim`, { cadence: e, i: t }, `claimed`);
}
function ca(e) {
  return oa(`/me/missions/crate`, { cadence: e }, `crate`);
}
async function la(e) {
  let t = await aa(`/me/missions/reroll`, { i: e });
  Q(t.profile, t.events);
}
async function ua(e, t) {
  (await P.auth.registerWithEmailAndPassword(e, t), await Hi());
}
async function da(e, t) {
  (await P.auth.signInWithEmailAndPassword(e, t), location.reload());
}
async function fa() {
  (await P.auth.signOut(), location.reload());
}
async function pa(e) {
  let t = await Pi.signIn(e);
  if (!t) return !1;
  let n = (await P.http.post(`/auth/${e}`, { body: { idToken: t } })).data;
  P.auth.token = n.token;
  try {
    localStorage.setItem(P.auth.settings.key, n.token);
  } catch {}
  return (location.reload(), !0);
}
async function ma() {
  (await P.http.post(`/me/delete`, { body: { confirm: `DELETE` } }),
    await fa());
}
async function ha(e) {
  return (await P.http.get(`/boards/:id`, { params: { id: e } })).data;
}
async function ga(e) {
  return (await P.http.get(`/replays/:id`, { params: { id: e } })).data;
}
async function _a(e) {
  return (await P.http.get(`/boards/:id/best`, { params: { id: e } })).data
    .best;
}
function va(e) {
  let t = e?.message ?? String(e);
  return (
    {
      invalid_credentials: `Wrong email or password.`,
      email_already_in_use: `That email already has an account — sign in instead.`,
      email_malformed: `That doesn't look like an email.`,
      password_too_short: `Password needs at least 6 characters.`,
    }[t] ?? t
  );
}
function $(e, t = ``, n = ``) {
  let r = document.createElement(e);
  return (t && (r.className = t), n && (r.textContent = n), r);
}
function ya(e, t, n) {
  let r = $(`button`, `btn ${t}`, e);
  return (
    (r.type = `button`),
    r.addEventListener(`click`, (e) => {
      (e.stopPropagation(), n());
    }),
    r
  );
}
function ba(e, t = `pop`) {
  (e.classList.remove(t), e.offsetWidth, e.classList.add(t));
}
function xa(e, t, n) {
  let r = [...e.children];
  return (
    r.length === t.length &&
    (t.forEach((e, t) => {
      let i = r[t];
      if (
        (i.dataset.nest !== void 0 &&
          e.dataset.nest !== void 0 &&
          xa(i, [...e.children], n)) ||
        (e.dataset.key &&
          i.dataset.key === e.dataset.key &&
          (n?.(i) || i.dataset.sig === e.dataset.sig))
      )
        return;
      let a = document.activeElement === i;
      (e.classList.add(`swapped`),
        i.replaceWith(e),
        a && e.focus({ preventScroll: !0 }));
    }),
    !0)
  );
}
function Sa(e) {
  let t = Math.max(0, Math.ceil(e / 1e3));
  return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, `0`)}`;
}
var Ca = () => document.getElementById(`ui`),
  wa = () =>
    matchMedia(`(prefers-reduced-motion: reduce)`).matches ||
    document.body.classList.contains(`reduce-motion`);
function Ta(e, t, n = ``, r) {
  let i = $(`div`, `modal-back interactive`),
    a = $(`div`, `card modal ${n}`),
    o = $(`div`, `modal-head`),
    s = $(`div`, `modal-body`),
    c = $(`div`, `modal-foot`),
    l = (e) => {
      e.key === `Escape` && u();
    },
    u = () => {
      i.isConnected &&
        (i.remove(), window.removeEventListener(`keydown`, l), r?.());
    },
    d = ya(`✕`, `icon-btn modal-x`, u);
  return (
    d.setAttribute(`aria-label`, `Close`),
    o.append($(`h2`, ``, t), d),
    a.append(o, s, c),
    i.append(a),
    i.addEventListener(`click`, (e) => {
      e.target === i && u();
    }),
    window.addEventListener(`keydown`, l),
    e.append(i),
    { body: s, foot: c, close: u }
  );
}
var Ea = [
    [0, `ollie`],
    [2, `flip`],
    [1, `grab`],
    [3, `grind`],
    [4, `spinL`],
    [5, `spinR`],
    [8, `reset`],
    [10, `walk`],
    [12, `up`],
    [13, `down`],
    [14, `left`],
    [15, `right`],
  ],
  Da = [],
  Oa = !1,
  ka = null;
function Aa() {
  let e = navigator.getGamepads?.() ?? [],
    t =
      [...e].find((e) => e && e.connected && e.mapping === `standard`) ??
      [...e].find((e) => e?.connected) ??
      null;
  return (
    (ka = t
      ? /054c|playstation|dualsense|dualshock/i.test(t.id)
        ? `playstation`
        : `xbox`
      : null),
    t
  );
}
function ja() {
  let e = Aa();
  if (!e) {
    Oa &&= (Si.clear(`pad`), !1);
    return;
  }
  let t = !Oa;
  Oa = !0;
  let n = (e, n, r, i = !1) => {
    (r !== !!Da[e] && !t && Si.set(`pad`, n, r || i), (Da[e] = r));
  };
  for (let [t, r] of Ea) n(t, r, !!e.buttons[t]?.pressed);
  (n(6, `spinL`, (e.buttons[6]?.value ?? 0) > 0.5, !!e.buttons[4]?.pressed),
    n(7, `spinR`, (e.buttons[7]?.value ?? 0) > 0.5, !!e.buttons[5]?.pressed),
    n(11, `look`, !!e.buttons[11]?.pressed || (e.axes[3] ?? 0) > 0.6));
  let r = e.axes[0] ?? 0,
    i = -(e.axes[1] ?? 0);
  Si.setStick(`pad`, Math.abs(r) > 0.2 ? r : 0, Math.abs(i) > 0.2 ? i : 0);
}
function Ma(e, t, n) {
  Aa()
    ?.vibrationActuator?.playEffect?.(`dual-rumble`, {
      duration: n,
      strongMagnitude: e,
      weakMagnitude: t,
    })
    ?.catch(() => {});
}
var Na = `/`.replace(/\/?$/, `/`),
  Pa = (e) => `${Na}stickers/${e}.webp`;
function Fa(e, t = ``) {
  let n = new Image();
  return (
    (n.className = `ico stk ${t}`),
    (n.alt = ``),
    (n.decoding = `async`),
    (n.draggable = !1),
    (n.src = Pa(e)),
    n
  );
}
function Ia(e, t, n, r) {
  let i = $(e, t);
  return (i.append(Fa(n, `lead`), r), i);
}
var La = `/`.replace(/\/?$/, `/`),
  Ra = `Sedgwick Ave Display`,
  za = `"${Ra}", "Lilita One", cursive`,
  Ba = 2500,
  Va = null;
function Ha() {
  return (
    (Va ??= (async () => {
      let e = new FontFace(
        Ra,
        `url(${La}fonts/sedgwick-ave-display.woff2) format("woff2")`,
      );
      (await e.load(), document.fonts.add(e));
    })()),
    Va
  );
}
function Ua() {
  let e = Ha().then(
    () => !0,
    () => !1,
  );
  return Promise.race([e, new Promise((e) => setTimeout(() => e(!1), Ba))]);
}
var Wa = () => Ha().catch(() => {}),
  Ga = `#22181c`,
  Ka = `#FFD21F`,
  qa = Math.PI * 2,
  Ja = (e, t = e.size) => `${t}px ${e.font}`;
function Ya(e, t, n, r, i = []) {
  let a = e.ctx,
    o = e.size;
  a.font = Ja(e);
  let s = i.slice(),
    c = i.at(-1);
  c && (n = c.x + c.adv);
  for (let e = i.length; e < t.length; e++) {
    let i = t[e],
      c = a.measureText(i).width,
      l = so(co(`${e}${i}`));
    (s.push({
      ch: i,
      x: n,
      y: r + (l() * 2 - 1) * o * 0.06,
      rot: (l() * 2 - 1) * 0.08,
      w: c,
      adv: c * 0.93,
      seed: co(i + e),
      pts: null,
      low: [],
      drips: [],
    }),
      (n += c * 0.93));
  }
  return s;
}
function Xa(e, t) {
  if (t.pts) return t.pts;
  let n = e.size,
    r = Math.ceil(n * 0.27),
    i = Math.ceil(t.w + r * 2),
    a = Math.ceil(n * 1.7),
    o = Math.ceil(n * 1.2),
    s = e.octx;
  ((s.canvas.width = i),
    (s.canvas.height = a),
    (s.font = Ja(e)),
    (s.fillStyle = `#000`),
    s.save(),
    s.translate(r, o),
    s.rotate(t.rot),
    s.fillText(t.ch, 0, 0),
    s.restore());
  let c = s.getImageData(0, 0, i, a).data,
    l = n > 90 ? 2 : 1,
    u = [],
    d = new Map();
  for (let e = 0; e < a; e += l)
    for (let n = 0; n < i; n += l) {
      if (c[(e * i + n) * 4 + 3] <= 150) continue;
      let a = t.x - r + n,
        s = t.y - o + e;
      u.push(a, s);
      let f = Math.floor(n / (l * 4)),
        p = d.get(f);
      (!p || p[1] < s) && d.set(f, [a, s]);
    }
  return ((t.pts = u), (t.low = [...d.values()]), u);
}
function Za(e, t, n, r, i) {
  ((e.globalAlpha = i), e.beginPath(), e.arc(t, n, r, 0, qa), e.fill());
}
function Qa(e, t, n, r = 0, i = 0) {
  let a = e.ctx;
  (a.save(),
    (a.font = Ja(e)),
    a.translate(t.x + r, t.y + i),
    a.rotate(t.rot),
    n(a),
    a.restore());
}
function $a(e, t) {
  Qa(e, t, (n) => {
    ((n.globalAlpha = 1),
      (n.fillStyle = e.color),
      (n.shadowColor = e.color),
      (n.shadowBlur = 3),
      n.fillText(t.ch, 0, 0));
  });
}
function eo(e, t) {
  let n = Xa(e, t),
    r = n.length / 2,
    i = e.size / 150;
  if (!r) return;
  let a = so(t.seed);
  e.ctx.fillStyle = e.color;
  for (let t = 0; t < 160; t++) {
    let t = ((a() * r) | 0) * 2,
      o = a() * qa,
      s = (4 + a() * 16) * i;
    Za(
      e.ctx,
      n[t] + Math.cos(o) * s,
      n[t + 1] + Math.sin(o) * s,
      (0.8 + a() * 1.6) * i,
      0.2,
    );
  }
  e.ctx.globalAlpha = 1;
}
function to(e, t, n, r) {
  let i = e.ctx;
  ((i.globalAlpha = 1),
    (i.strokeStyle = e.color),
    (i.lineWidth = t.w),
    (i.lineCap = `round`),
    i.beginPath(),
    i.moveTo(t.x, t.y + n),
    i.lineTo(t.x, t.y + r),
    i.stroke());
}
function no(e, t) {
  ((e.ctx.fillStyle = e.color),
    Za(e.ctx, t.x, t.y + t.len, t.w * 0.85, 1),
    (e.ctx.globalAlpha = 1));
}
function ro(e, t, n) {
  if ((Xa(e, t), (t.drips = []), !t.low.length)) return;
  let r = so(t.seed ^ 1540483477),
    i = r(),
    a = i < 0.3 ? 0 : i < 0.75 ? 1 : 2,
    o = e.size / 150;
  for (let e = 0; e < a; e++) {
    let e = t.low[(r() * t.low.length) | 0],
      i = (14 + r() * 58) * o;
    t.drips.push({
      x: e[0],
      y: e[1] - 3 * o,
      len: n ? i : 0,
      max: i,
      v: (80 + r() * 60) * o,
      w: (3 + r() * 2.5) * o,
      done: n,
    });
  }
}
function io(e, t) {
  (eo(e, t), $a(e, t));
  for (let n of t.drips) (to(e, n, 0, n.len), n.done && no(e, n));
}
function ao(e, t) {
  let n = e.size / 150;
  (Qa(
    e,
    t,
    (e) => {
      ((e.fillStyle = Ga), e.fillText(t.ch, 0, 0));
    },
    8 * n,
    9 * n,
  ),
    Qa(e, t, (e) => {
      ((e.lineJoin = `round`),
        (e.strokeStyle = Ga),
        (e.lineWidth = 22 * n),
        e.strokeText(t.ch, 0, 0),
        (e.strokeStyle = `#fff`),
        (e.lineWidth = 12 * n),
        e.strokeText(t.ch, 0, 0));
    }));
}
function oo(e, t) {
  let n = e.ctx,
    r = e.size,
    i = r * 0.42,
    a = r * 0.26;
  (n.save(),
    n.translate(t.x + r * 0.03, t.y - r),
    n.rotate(-0.16),
    n.beginPath(),
    n.moveTo(0, a),
    n.lineTo(0, 0),
    n.lineTo(i * 0.25, a * 0.55),
    n.lineTo(i * 0.5, -a * 0.2),
    n.lineTo(i * 0.75, a * 0.55),
    n.lineTo(i, 0),
    n.lineTo(i, a),
    n.closePath(),
    (n.globalAlpha = 1),
    (n.lineJoin = `round`),
    (n.lineWidth = Math.max(2, r * 0.04)),
    (n.strokeStyle = Ga),
    (n.fillStyle = Ka),
    n.fill(),
    n.stroke(),
    n.restore());
}
function so(e) {
  let t = e >>> 0;
  return () => {
    t = (t + 1831565813) | 0;
    let e = Math.imul(t ^ (t >>> 15), 1 | t);
    return (
      (e = (e + Math.imul(e ^ (e >>> 7), 61 | e)) ^ e),
      ((e ^ (e >>> 14)) >>> 0) / 4294967296
    );
  };
}
function co(e) {
  let t = 2166136261;
  for (let n = 0; n < e.length; n++)
    ((t ^= e.charCodeAt(n)), (t = Math.imul(t, 16777619)));
  return t >>> 0;
}
export {
  Qi as $,
  tr as $t,
  wa as A,
  Ve as An,
  q as At,
  ea as B,
  $r as Bt,
  Ma as C,
  En as Cn,
  Ur as Ct,
  Ta as D,
  $t as Dn,
  ii as Dt,
  $ as E,
  vn as En,
  oi as Et,
  ta as F,
  gi as Ft,
  pa as G,
  dr as Gt,
  _a as H,
  Yr as Ht,
  ua as I,
  li as It,
  Ii as J,
  fr as Jt,
  Z as K,
  ur as Kt,
  sa as L,
  Zr as Lt,
  na as M,
  He as Mn,
  Or as Mt,
  $i as N,
  di as Nt,
  xa as O,
  Jt as On,
  Pr as Ot,
  Q as P,
  Gr as Pt,
  qi as Q,
  nr as Qt,
  ma as R,
  ui as Rt,
  ja as S,
  Tn as Sn,
  Hr as St,
  Sa as T,
  wn as Tn,
  X as Tt,
  ha as U,
  Jr as Ut,
  va as V,
  Xr as Vt,
  ga as W,
  ni as Wt,
  Xi as X,
  pr as Xt,
  ca as Y,
  mr as Yt,
  Ji as Z,
  $n as Zt,
  Ia as _,
  On as _n,
  hi as _t,
  to as a,
  Qn as an,
  Pi as at,
  Aa as b,
  Cn as bn,
  kr as bt,
  ro as c,
  Zn as cn,
  gr as ct,
  $a as d,
  Un as dn,
  Dr as dt,
  lr as en,
  la as et,
  io as f,
  kn as fn,
  _i as ft,
  Wa as g,
  P as gn,
  Ar as gt,
  Ua as h,
  fn as hn,
  mi as ht,
  Za as i,
  z as in,
  fa as it,
  Ca as j,
  Be as jn,
  ei as jt,
  ba as k,
  qt as kn,
  Kr as kt,
  eo as l,
  Bn as ln,
  _r as lt,
  za as m,
  Nn as mn,
  Wr as mt,
  no as n,
  sr as nn,
  zi as nt,
  Ja as o,
  Yn as on,
  Si as ot,
  ao as p,
  An as pn,
  xr as pt,
  Zi as q,
  hr as qt,
  oo as r,
  cr as rn,
  da as rt,
  Ya as s,
  Xn as sn,
  K as st,
  Ga as t,
  ir as tn,
  Yi as tt,
  Xa as u,
  Hn as un,
  br as ut,
  Fa as v,
  xn as vn,
  ri as vt,
  ya as w,
  gn as wn,
  Mr as wt,
  ka as x,
  bn as xn,
  pi as xt,
  Pa as y,
  F as yn,
  Vr as yt,
  Ki as z,
  ci as zt,
};
