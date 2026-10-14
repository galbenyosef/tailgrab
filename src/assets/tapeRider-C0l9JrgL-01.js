// assets/tapeRider-C0l9JrgL 01 — run
// Lines 1-245 of readable/assets/tapeRider-C0l9JrgL.pretty.js (statement-aligned).
import { Ot as e } from "./tuning-D4mSK766.js";
import { m as t, n, o as r, u as i } from "./types-DM-HODfo.js";
import { i as a } from "./skaterView-DCMhULBk.js";
import { An as o, W as s } from "./tagPaint-BOEtbgNi.js";
import { n as c } from "./parks-C2dnYY6C.js";
import { f as l, h as u } from "./skaters-pUdq6stw.js";
import {
  _ as d,
  d as f,
  g as p,
  h as m,
  i as h,
  m as g,
  p as _,
  v,
  y,
} from "./session-DxCN6jDh.js";
var TapeSim = class {
  tape;
  world;
  sim = t();
  ev = new i();
  inp = {
    dir: 0,
    held: 0,
    pressed: 0,
    released: 0,
    pressDir: 0,
    tapDir: 0,
    stickX: 0,
  };
  i = 0;
  boost = 0;
  bi = 0;
  constructor(e, t) {
    ((this.tape = e), (this.world = t), this.rewind());
  }
  get done() {
    return this.i >= this.tape.n;
  }
  rewind() {
    (p(this.tape.start, this.sim),
      (this.i = 0),
      (this.boost = this.tape.boost0),
      (this.bi = 0));
  }
  key() {
    return {
      at: this.i,
      snap: v(this.sim, new Float64Array(f)),
      boost: this.boost,
      bi: this.bi,
    };
  }
  seek(e) {
    (p(e.snap, this.sim),
      (this.i = e.at),
      (this.boost = e.boost),
      (this.bi = e.bi));
  }
  step() {
    let t = this.tape;
    for (; this.bi < t.boosts.length && t.boosts[this.bi].at <= this.i;)
      this.boost = t.boosts[this.bi++].boost;
    (m(t.inputs, t.n, this.i, this.inp),
      this.ev.reset(),
      y(
        this.sim,
        this.inp,
        this.world,
        u(t.skater, this.boost),
        t.subSteps,
        e / t.subSteps,
        this.ev,
      ),
      this.i++);
  }
};
function* tapeChecksum(e, t, n = 30) {
  let i = [],
    a = [];
  if (e.tickHz !== 30 || e.subSteps !== 2)
    return { ok: !1, why: `version`, landed: i, keys: a };
  let o = new TapeSim(e, t);
  for (; !o.done;)
    (n > 0 && o.i % n === 0 && a.push(o.key()),
      o.step(),
      o.ev.flags & r.COMBO_LANDED &&
        i.push({ at: o.i - 1, score: o.ev.comboScore }),
      yield o.i);
  return d(o.sim) === e.endHash
    ? e.kind === _.COMBO &&
      e.bankAt !== 4294967295 &&
      !i.some((t) => t.at === e.bankAt && t.score === e.score)
      ? { ok: !1, why: `bank`, landed: i, keys: a }
      : { ok: !0, why: ``, landed: i, keys: a }
    : { ok: !1, why: `hash`, landed: i, keys: a };
}
async function S(e, t, n, r = 2, i = 30) {
  let a = tapeChecksum(e, t, i),
    o = performance.now();
  for (let e = 1; ; e++) {
    let t = a.next();
    if (t.done) return t.value;
    !(e & 7) &&
      performance.now() - o > r &&
      (await n(), (o = performance.now()));
  }
}
var C = (e) =>
  new Promise((t, n) => {
    e.aborted
      ? n(new DOMException(`aborted`, `AbortError`))
      : requestAnimationFrame(() => t());
  });
async function compressTape(e, t, n) {
  let r = performance.now(),
    i = n ?? (await s(e)),
    a = performance.now(),
    o = Uint8Array.from(atob(i.tape), (e) => e.charCodeAt(0)),
    l = new Blob([o])
      .stream()
      .pipeThrough(new DecompressionStream(`deflate-raw`)),
    u = g(new Uint8Array(await new Response(l).arrayBuffer())),
    d = performance.now(),
    f = c(u.place),
    p = performance.now(),
    m = await S(u, f, () => C(t), 6),
    h = performance.now();
  return {
    res: i,
    tape: u,
    world: f,
    check: m,
    times: {
      fetchMs: a - r,
      inflateMs: d - a,
      worldMs: p - d,
      checkMs: h - p,
      steps: u.n,
    },
  };
}
var T = 3,
  TapeRunner = class {
    run;
    frame = a();
    view;
    onStep = () => {};
    onCut = () => {};
    onEnd = () => {};
    loaded;
    prev = { x: 0, y: 0, z: 0, yaw: 0, ux: 0, uy: 1, uz: 0, bal: 0, tick: 0 };
    acc = 0;
    ended = !1;
    constructor(e) {
      ((this.loaded = e),
        (this.run = new TapeSim(e.tape, e.world)),
        (this.view = o(l(e.tape.skater, e.tape.look))),
        (this.view.col = e.world.col),
        this.keep());
    }
    get sim() {
      return this.run.sim;
    }
    async ready() {
      let e = this.view;
      for (; e.ready === !1;) await new Promise((e) => setTimeout(e, 50));
    }
    seek(e) {
      let t;
      for (let n of this.loaded.check.keys)
        if (n.at <= e) t = n;
        else break;
      for (
        t ? this.run.seek(t) : this.run.rewind();
        this.run.i < e && !this.run.done;
      )
        this.run.step();
      (this.keep(), (this.acc = 0), (this.ended = !1));
    }
    update(t) {
      if (t > 0)
        for (
          this.acc += t, this.acc > 0.25 && (this.acc = 0.25);
          this.acc >= e;
        )
          ((this.acc -= e), this.tick());
      let r = this.run.sim,
        i = this.prev,
        a = this.frame,
        o = t > 0 ? this.acc / e : 1;
      ((a.x = i.x + (r.x - i.x) * o),
        (a.y = i.y + (r.y - i.y) * o),
        (a.z = i.z + (r.z - i.z) * o),
        (a.yaw = i.yaw + (r.yaw - i.yaw) * o),
        (a.ux = i.ux + (r.ux - i.ux) * o),
        (a.uy = i.uy + (r.uy - i.uy) * o),
        (a.uz = i.uz + (r.uz - i.uz) * o));
      let s = Math.hypot(a.ux, a.uy, a.uz) || 1;
      ((a.ux /= s), (a.uy /= s), (a.uz /= s));
      let c = this.loaded.tape,
        l = Math.max(0, this.run.i - 1);
      return (
        h(
          a,
          r,
          i.tick + (r.simTick - i.tick) * o,
          (c.inputs[c.n + l] & n.GRAB) !== 0,
        ),
        this.view.animate(a, t),
        i.bal + (r.bal - i.bal) * o
      );
    }
    tick() {
      if (this.run.done) {
        this.ended || ((this.ended = !0), this.keep(), this.onEnd());
        return;
      }
      (this.keep(), this.run.step());
      let e = this.run.sim,
        t = this.run.ev,
        n = this.prev;
      ((t.flags & r.RESPAWN ||
        Math.hypot(e.x - n.x, e.y - n.y, e.z - n.z) > T) &&
        (this.keep(), this.onCut()),
        this.onStep(t, e));
    }
    keep() {
      let e = this.run.sim,
        t = this.prev;
      ((t.x = e.x),
        (t.y = e.y),
        (t.z = e.z),
        (t.yaw = e.yaw),
        (t.ux = e.ux),
        (t.uy = e.uy),
        (t.uz = e.uz),
        (t.bal = e.bal),
        (t.tick = e.simTick));
    }
    dispose() {
      this.view.dispose();
    }
  };
