// assets/tagPaint-BOEtbgNi 01 — entries
// Lines 1-288 of readable/assets/tagPaint-BOEtbgNi.pretty.js (statement-aligned).
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
