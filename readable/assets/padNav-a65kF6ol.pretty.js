import { b as e, x as t } from "./Client-CpE02kO_.js";
import { Q as n, Y as r } from "./table-W1plLavt.js";
import {
  E as i,
  Ht as a,
  J as o,
  K as s,
  M as c,
  N as l,
  Ut as u,
  at as d,
  b as f,
  bt as ee,
  gn as p,
  k as te,
  ot as m,
  qt as ne,
  un as h,
  vt as re,
  w as g,
  wt as ie,
  x as _,
  yn as v,
  z as y,
} from "./tagPaint-BOEtbgNi.js";
import { N as b, i as x } from "./juice-6UyTKeka.js";
import { i as S } from "./secrets-Czes5esN.js";
import { o as C, t as w } from "./sfx-6jovSU2-.js";
import { n as ae } from "./catalog-CGuOpeY8.js";
import { c as T, d as oe, i as E } from "./skaters-pUdq6stw.js";
var se = { IDLE: 0, LAUNCHING: 1 },
  ce = e(
    {
      name: t.string().default(``),
      skater: t.uint16().default(0),
      look: t.string().default(``),
      color: t.uint8().default(0),
      level: t.uint8().default(1),
      ready: t.boolean().default(!1),
      connected: t.boolean().default(!0),
      order: t.uint8().default(0),
      where: t.string().default(``),
      room: t.string().default(``),
    },
    `PartyMember`,
  ),
  le = e(
    {
      code: t.string().default(``),
      leader: t.string().default(``),
      dest: t.string().default(``),
      phase: t.uint8().default(0),
      members: t.map(ce),
    },
    `PartyState`,
  ),
  ue = { KICKED: 4410, REPLACED: 4411 },
  de = [`maker`, `daily`, `invite`, `community`];
function fe(e) {
  let t = e;
  if (typeof t == `string`) {
    if (!t) return { kind: `public` };
    try {
      t = JSON.parse(t);
    } catch {
      return null;
    }
  }
  if (!t || typeof t != `object`) return null;
  let n = t;
  if (n.kind === `public`) return { kind: `public` };
  if (
    n.kind !== `park` ||
    typeof n.code != `string` ||
    !ae.test(n.code) ||
    typeof n.via != `string` ||
    !de.includes(n.via)
  )
    return null;
  let r = { kind: `park`, code: n.code, via: n.via };
  return (
    typeof n.name == `string` && n.name && (r.name = n.name.slice(0, 28)),
    r
  );
}
function pe(e) {
  return e.connected && e.where === ``;
}
var D = `tailgrab-party`,
  me = 18e5,
  O = null,
  k = null,
  he = 0,
  A = null,
  j = null,
  M = new Set(),
  N = new Set(),
  P = new Set(),
  ge = {
    get view() {
      return k;
    },
    get connecting() {
      return j !== null;
    },
  };
function _e(e) {
  return (M.add(e), e(k), () => M.delete(e));
}
function ve(e) {
  return (N.add(e), e(j !== null), () => N.delete(e));
}
function ye(e) {
  return (P.add(e), () => P.delete(e));
}
var F = (e) => {
  for (let t of P) t(e);
};
function I(e, t = {}) {
  O?.connection.isOpen && O.send(e, t);
}
function be(e, t = ``) {
  I(`where`, { where: e, room: t });
}
function xe() {
  I(`set`, v());
}
function Se(e) {
  return d.link({ party: e });
}
function L(e) {
  let t = (j ?? Promise.resolve())
      .catch(() => {})
      .then(e)
      .finally(() => {
        if (j === t) {
          j = null;
          for (let e of N) e(!1);
        }
      }),
    n = j;
  if (((j = t), !n)) for (let e of N) e(!0);
  return t;
}
function Ce() {
  return L(async () => {
    O || (await y(), await B(await p.create(`party`, v(), le)));
  });
}
function R(e) {
  return L(async () => {
    if (k?.code === e) return;
    await y();
    let t = await p.joinById(e, v(), le);
    (z(!0), await B(t));
  });
}
async function we() {
  let e = Ee();
  if (!(O || !e || Date.now() - e.at > me))
    try {
      await R(e.code);
    } catch {
      U(null);
    }
}
function z(e = !1) {
  let t = O;
  t && (V(), U(null), t.leave(!0).catch(() => {}), e || H());
}
function B(e) {
  ((O = e),
    U({ code: e.roomId, at: Date.now() }),
    (A = setInterval(() => {
      O && U({ code: O.roomId, at: Date.now() });
    }, 3e4)));
  let t = new Map();
  return (
    e.onStateChange(() => {
      if (O !== e) return;
      let n = new Map(
        [...e.state.members.entries()].map(([e, t]) => [e, t.name]),
      );
      if (t.size) {
        let r = new Set(t.values()),
          i = new Set(n.values());
        for (let [t, i] of n)
          t !== e.sessionId &&
            i &&
            !r.has(i) &&
            F({
              kind: `toast`,
              text: `${i} joined your party!`,
              tone: `mint`,
              icon: `popper`,
            });
        for (let e of r)
          i.has(e) ||
            F({ kind: `toast`, text: `${e} left the party`, tone: `white` });
      }
      (n.size && (t = n), H());
    }),
    e.onMessage(`go`, (e) => {
      let t = fe(e.dest);
      t &&
        F({
          kind: `go`,
          go: { kind: e.kind, reservation: e.reservation, dest: t },
        });
    }),
    e.onMessage(`launchFailed`, (e) =>
      F({ kind: `failed`, text: e.text, sids: e.sids ?? [] }),
    ),
    e.onMessage(`kicked`, () => {}),
    e.onMessage(`replaced`, () => {}),
    e.onLeave((t) => {
      O === e &&
        (V(),
        U(null),
        H(),
        t === ue.KICKED
          ? F({
              kind: `toast`,
              text: `You were removed from the party`,
              tone: `red`,
            })
          : t === ue.REPLACED
            ? F({
                kind: `toast`,
                text: `Your party moved to another tab`,
                tone: `white`,
              })
            : F({
                kind: `toast`,
                text: `Lost the party connection`,
                tone: `red`,
              }));
    }),
    H(),
    new Promise((t) => {
      let n = () => {
          (M.delete(r), clearTimeout(i), t());
        },
        r = (t) => {
          (t || O !== e) && n();
        },
        i = setTimeout(n, 5e3);
      (M.add(r), r(k));
    })
  );
}
function V() {
  (A && clearInterval(A), (A = null), (O = null));
}
function H() {
  k = O ? Te(O) : null;
  for (let e of M) e(k);
}
function Te(e) {
  let t = e.state,
    n = [...t.members.entries()]
      .map(([n, r]) => ({
        sid: n,
        name: r.name,
        skater: r.skater,
        look: r.look,
        color: r.color,
        level: r.level,
        ready: r.ready,
        connected: r.connected,
        where: r.where,
        room: r.room,
        order: r.order,
        leader: n === t.leader,
        me: n === e.sessionId,
        present: pe(r),
      }))
      .sort((e, t) => e.order - t.order),
    r = n.find((e) => e.me);
  return r
    ? {
        code: t.code,
        me: r,
        leader: n.find((e) => e.leader) ?? null,
        isLeader: r.leader,
        dest: fe(t.dest) ?? { kind: `public` },
        launching: t.phase === se.LAUNCHING,
        members: n,
        v: ++he,
      }
    : null;
}
function Ee() {
  try {
    let e = JSON.parse(localStorage.getItem(D) ?? `null`);
    return e && typeof e.code == `string` && typeof e.at == `number`
      ? { code: e.code, at: e.at }
      : null;
  } catch {
    return null;
  }
}
function U(e) {
  try {
    e ? localStorage.setItem(D, JSON.stringify(e)) : localStorage.removeItem(D);
  } catch {}
}
var W = d.ads.kind === `off` ? `off` : d.ads.kind,
  G = () => W !== `poki` && ne(s.profile),
  De = () => G() || W !== `off`;
function Oe(e, t, n = `UNLOCK`, r = `WATCH AD`) {
  if (G()) return g(n, e, t);
  let i = g(r, e, t);
  return (i.prepend(b(`play`)), i);
}
var ke = 5;
function Ae() {
  (m.hold(`ad`),
    w.pause(!0),
    document.pointerLockElement && document.exitPointerLock());
  let e = [...document.querySelectorAll(`.page, .modal-back`)].filter(
    (e) => !e.inert,
  );
  for (let t of e) t.inert = !0;
  return () => {
    for (let t of e) t.inert = !1;
    (w.pause(!1), m.release(`ad`));
  };
}
async function K() {
  if (G()) return !0;
  if (W === `off`) return !1;
  let e = Ae(),
    t = performance.now();
  try {
    return W === `fake` ? await Me() : await d.ads.rewarded();
  } finally {
    (e(), x(`reward`), x(`rewardS`, Math.round((performance.now() - t) / 1e3)));
  }
}
async function je() {
  if (d.ads.kind === `off` || G()) return;
  let e = Ae(),
    t = performance.now();
  try {
    await d.ads.interstitial();
  } finally {
    (e(), x(`break`), x(`breakS`, Math.round((performance.now() - t) / 1e3)));
  }
}
function Me() {
  return new Promise((e) => {
    let t = i(`div`, `fake-ad`),
      n = i(`b`, `fake-ad-count`, String(ke)),
      r = g(``, `ico-btn fake-ad-close`, () => c(!1));
    (r.setAttribute(`aria-label`, `Skip the ad (no reward)`),
      r.append(b(`close`)),
      t.append(
        i(`span`, `fake-ad-tag`, `AD · placeholder`),
        n,
        i(`span`, `fake-ad-sub`, `Your reward is on its way…`),
        r,
      ));
    let a = ke,
      o = setInterval(() => {
        ((n.textContent = String(--a)), a <= 0 && c(!0));
      }, 1e3),
      s = (e) => {
        e.key === `Escape` && (e.stopImmediatePropagation(), c(!1));
      };
    window.addEventListener(`keydown`, s, !0);
    let c = (n) => {
      (clearInterval(o),
        window.removeEventListener(`keydown`, s, !0),
        t.remove(),
        e(n));
    };
    (document.body.append(t), r.focus());
  });
}
async function Ne(e) {
  return (await K()) ? (await l(e), !0) : !1;
}
async function Pe(e) {
  return (await K()) ? c(e) : 0;
}
function Fe() {
  let e = s.profile,
    t = e?.custom,
    r = t ? n(t.look) : null;
  return t && r ? { look: re(r, u(e)), style: t.style } : null;
}
function Ie(e) {
  return e === 255
    ? (Fe()?.look ?? r)
    : T(e)
      ? E[e].look
      : (S(e)?.look ?? E[0].look);
}
function Le() {
  let e = C.skater,
    t = s.profile,
    n = S(e);
  return n
    ? ee(t, n.key)
      ? e
      : (t?.starter ?? 0)
    : !t || !T(e) || a(t).has(e)
      ? e
      : (t.starter ?? 0);
}
var Re = () => Ie(Le()),
  ze = () => Re().head,
  Be = () => oe(Math.random(), ze());
function Ve() {
  return s.account
    ? h(s.account.id)
    : /^Player \d{4}$/.test(C.name)
      ? C.name
      : h(String(Math.random()));
}
var He = `freeskater-seen-unlocks-3`;
function q() {
  try {
    let e = localStorage.getItem(He);
    return e ? new Set(JSON.parse(e)) : null;
  } catch {
    return null;
  }
}
function Ue(e) {
  try {
    localStorage.setItem(He, JSON.stringify([...e]));
  } catch {}
}
function J() {
  let e = s.profile;
  if (!e) return new Set();
  let t = [...u(e)].filter(ie),
    n = q();
  return n ? new Set(t.filter((e) => !n.has(e))) : (Ue(new Set(t)), new Set());
}
function We(e) {
  let t = q() ?? new Set(),
    n = t.size;
  for (let n of e) t.add(n);
  t.size !== n && Ue(t);
}
o(() => {
  q() || J();
});
var Ge = () => We([...J()].filter(Ke)),
  Ke = (e) => e.startsWith(`pro:`) || e.startsWith(`skin:`),
  qe = () => J().size > 0,
  Je = 150,
  Y = new WeakMap();
function Ye(e, t, n, r = {}) {
  let a = i(`button`, `btn hold ${t}`);
  ((a.type = `button`), (a.dataset.hold = ``));
  let o = i(`span`, `hold-tag`, `HOLD`);
  (o.append(i(`kbd`)),
    a.append(
      i(`span`, `hold-fill`),
      i(`span`, `hold-label`, e),
      i(`span`, `hold-sub`),
      o,
    ),
    Y.set(a, {
      run: n,
      opts: r,
      armAt: performance.now() + (r.armMs ?? 0),
      from: 0,
      k: 0,
      ticks: 0,
      done: !1,
      raf: 0,
    }),
    a.addEventListener(`pointerdown`, (e) => {
      if (e.button === 0) {
        try {
          a.setPointerCapture(e.pointerId);
        } catch {}
        Xe(a);
      }
    }));
  for (let e of [`pointerup`, `pointercancel`, `lostpointercapture`])
    a.addEventListener(e, () => Ze(a));
  return (
    a.addEventListener(`click`, (e) => {
      (e.preventDefault(), e.stopPropagation());
    }),
    a.addEventListener(`contextmenu`, (e) => e.preventDefault()),
    a
  );
}
function Xe(e) {
  let t = Y.get(e);
  if (!t) return !1;
  let n = e,
    r = performance.now();
  if (t.done || t.from || n.disabled || r < t.armAt) return !0;
  (cancelAnimationFrame(t.raf),
    (t.from = r - t.k * 600),
    (t.ticks = Math.floor(t.k * 3)),
    n.classList.remove(`held`),
    n.classList.add(`holding`));
  let i = () => {
    if (!t.from) return;
    if (!n.isConnected) {
      t.from = 0;
      return;
    }
    let e = Math.min(1, (performance.now() - t.from) / 600);
    tt(n, t, e);
    let r = Math.floor(e * 3);
    if (
      (r > t.ticks && r < 3 && ((t.ticks = r), t.opts.sfx?.(`tick`, r / 3)),
      e < 1)
    ) {
      t.raf = requestAnimationFrame(i);
      return;
    }
    ((t.from = 0),
      (t.done = !0),
      n.classList.remove(`holding`),
      te(n, `held`),
      t.opts.sfx?.(`stamp`),
      t.run(),
      t.opts.again &&
        setTimeout(() => {
          ((t.done = !1), nt(n, t));
        }, 400));
  };
  return (i(), !0);
}
function Ze(e) {
  let t = Y.get(e);
  if (!t?.from) return;
  let n = e;
  (cancelAnimationFrame(t.raf),
    (t.from = 0),
    n.classList.remove(`holding`),
    te(n, `nudge`),
    nt(n, t));
}
function Qe(e, t) {
  X(e.querySelector(`.hold-label`), t);
}
function $e(e, t) {
  X(e.querySelector(`.hold-sub`), t);
}
function et(e, t) {
  for (let n of e.querySelectorAll(`.hold-tag kbd`)) X(n, t);
}
function tt(e, t, n) {
  ((t.k = n), e.style.setProperty(`--hold`, n.toFixed(3)));
}
function nt(e, t) {
  let n = t.k,
    r = performance.now(),
    i = () => {
      if (t.from || t.done) return;
      let a = n * Math.max(0, 1 - (performance.now() - r) / Je);
      (tt(e, t, a), a > 0 && (t.raf = requestAnimationFrame(i)));
    };
  i();
}
function X(e, t) {
  e && e.textContent !== t && (e.textContent = t);
}
var Z = {
    a: 0,
    b: 1,
    y: 3,
    lb: 4,
    rb: 5,
    start: 9,
    up: 12,
    down: 13,
    left: 14,
    right: 15,
  },
  rt = `button, input, select, textarea, [tabindex]:not([tabindex='-1'])`,
  it = {
    ArrowUp: `up`,
    KeyW: `up`,
    ArrowDown: `down`,
    KeyS: `down`,
    ArrowLeft: `left`,
    KeyA: `left`,
    ArrowRight: `right`,
    KeyD: `right`,
  },
  at = new Set([`Enter`, `NumpadEnter`, `Space`]),
  ot = 400,
  st = 110,
  ct = 0.5,
  lt = 0.3,
  ut = 1400,
  dt = {
    xbox: {
      a: `A`,
      b: `B`,
      x: `X`,
      y: `Y`,
      lb: `LB`,
      rb: `RB`,
      lt: `LT`,
      rt: `RT`,
      ls: `LS`,
      rs: `RS`,
      view: `⧉`,
      start: `☰`,
    },
    playstation: {
      a: `✕`,
      b: `○`,
      x: `□`,
      y: `△`,
      lb: `L1`,
      rb: `R1`,
      lt: `L2`,
      rt: `R2`,
      ls: `L`,
      rs: `R`,
      view: `CREATE`,
      start: `OPTIONS`,
    },
    kb: {
      a: `Enter`,
      b: `Esc`,
      x: ``,
      y: ``,
      lb: `Q`,
      rb: `E`,
      lt: ``,
      rt: ``,
      ls: ``,
      rs: ``,
      view: ``,
      start: `Esc`,
    },
  };
function ft() {
  return dt[_ ?? `xbox`];
}
var Q = (e) =>
    e instanceof HTMLTextAreaElement ||
    (e instanceof HTMLInputElement &&
      ![`range`, `checkbox`, `radio`, `button`, `submit`].includes(e.type)),
  pt = `navpress`,
  mt = (e, t) => e.main.dispatchEvent(new CustomEvent(pt, { detail: t })),
  ht = class {
    nav;
    ui;
    hints;
    ring;
    ringMain = null;
    prev = [];
    dir = null;
    stickDir = null;
    nextRepeat = 0;
    lastNow = 0;
    src = null;
    held = !1;
    latch = !1;
    keysDown = new Set();
    holding = null;
    main = null;
    last = null;
    scrollHost = null;
    hintKey = ``;
    canScroll = { at: -1 / 0, on: !1 };
    px = NaN;
    py = NaN;
    onMenu = null;
    overlay = null;
    constructor(e, t) {
      ((this.nav = e),
        (this.ui = t),
        (this.hints = i(`div`, `pad-hints`)),
        (this.ring = i(`div`, `pad-ring`)),
        t.append(this.ring, this.hints));
      let n = () => this.engage(null);
      (window.addEventListener(
        `pointermove`,
        (e) => {
          let t =
            Math.abs(e.clientX - this.px) + Math.abs(e.clientY - this.py) > 3;
          (t && !Number.isNaN(this.px) && n(),
            (t || Number.isNaN(this.px)) &&
              ((this.px = e.clientX), (this.py = e.clientY)));
        },
        { capture: !0, passive: !0 },
      ),
        window.addEventListener(`pointerdown`, n, { capture: !0, passive: !0 }),
        window.addEventListener(`keydown`, this.onKey),
        window.addEventListener(`keyup`, this.onKeyUp),
        window.addEventListener(`blur`, () => {
          (this.keysDown.clear(), this.endHold());
        }));
    }
    get engaged() {
      return this.src !== null;
    }
    update(e) {
      let t = Math.min(0.1, (e - this.lastNow) / 1e3);
      this.lastNow = e;
      let n = f();
      if (!n) {
        ((this.prev = []),
          (this.dir = this.stickDir = null),
          this.holding?.src === `pad` && this.endHold(),
          this.src === `pad` && this.engage(null),
          this.apply(this.engaged || this.keysDown.size ? this.scope() : null));
        return;
      }
      let r = (e) => !!n.buttons[e]?.pressed,
        i = (e) => r(e) && !this.prev[e],
        a = this.scope();
      (a && a.main !== this.main && (this.nextRepeat = 1 / 0),
        a?.kind === `build` && a.main !== this.main && this.engage(`pad`));
      let o = this.readDir(n, r);
      o && o !== this.dir && a && mt(a, o);
      let s = {
        move: this.repeat(o, e),
        a: i(Z.a),
        b: i(Z.b),
        y: i(Z.y),
        lb: i(Z.lb),
        rb: i(Z.rb),
        start: i(Z.start),
      };
      this.prev = n.buttons.map((e) => e.pressed);
      let c = this.handle(s, `pad`);
      (this.holding?.src === `pad` && !r(Z.a) && this.endHold(),
        c && this.scroll(c, n, t),
        this.apply(this.scope()));
    }
    handle(e, t) {
      let n = this.scope();
      t === `pad` &&
        (e.start || (n && (e.a || e.b || e.y || e.lb || e.rb))) &&
        (this.latch = !0);
      let r = e.start ? this.owned(n, `start`) : null;
      if (r) (this.engage(t), r.click());
      else if (e.start) {
        if (n?.kind === `nav` && this.nav.live)
          for (; this.nav.pagesOpen && this.nav.back(););
        else
          n?.startBacks
            ? n.back?.()
            : (!n || n.kind === `results`) &&
              this.nav.live &&
              !m.holding(`chat`) &&
              (this.onMenu?.(), this.nav.topRoot && this.engage(t));
        n = this.scope();
      }
      if (!n) return null;
      let i = e.move,
        a = e.a,
        o = !!(i || e.a || e.b || e.y || e.lb || e.rb);
      (!this.engaged && o
        ? (this.engage(t), (i = null), (a = !1))
        : o && this.engage(t),
        this.engaged && this.keep(n));
      let s = document.activeElement;
      if (
        (i &&
          (s instanceof HTMLInputElement &&
          s.type === `range` &&
          (i === `left` || i === `right`)
            ? this.slide(s, i === `right` ? 1 : -1)
            : this.move(n, i)),
        e.a && this.valid(s, n) && s.hasAttribute(`data-hold`)
          ? Xe(s) && (this.holding = { el: s, src: t })
          : a && this.valid(s, n) && !Q(s) && s.click(),
        e.b)
      ) {
        Q(s) && s.blur();
        let e = this.owned(n, `b`);
        e ? e.click() : n.back?.();
      }
      return (
        e.y && this.owned(n, `y`)?.click(),
        (e.lb || e.rb) && n.tabs?.step(e.rb ? 1 : -1),
        n
      );
    }
    onKey = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      let t = e.code;
      if (t === `Escape`) {
        if (e.defaultPrevented || e.repeat || m.holding(`build`)) return;
        let t = this.scope();
        ((!t || t.kind === `results`) &&
          this.handle(
            { move: null, a: !1, b: !1, y: !1, lb: !1, rb: !1, start: !0 },
            `kb`,
          ),
          this.apply(this.scope()));
        return;
      }
      if (t === `Tab`) {
        let e = this.scope();
        e && e.kind !== `build` && this.engage(`kb`);
        return;
      }
      let n = it[t] ?? null,
        r = at.has(t),
        i = t === `KeyQ`,
        a = t === `KeyE`;
      if (!n && !r && !i && !a) {
        this.src === `pad` && this.engage(null);
        return;
      }
      let o = this.scope();
      if (!o || o.kind === `build`) return;
      let s = document.activeElement;
      Q(s) ||
        s instanceof HTMLSelectElement ||
        (e.preventDefault(),
        this.keysDown.add(t),
        n && !e.repeat && mt(o, n),
        (!e.repeat || n) &&
          (r && !this.engaged && this.valid(s, o) && this.engage(`kb`),
          this.handle(
            { move: n, a: r, b: !1, y: !1, lb: i, rb: a, start: !1 },
            `kb`,
          ),
          this.apply(this.scope())));
    };
    onKeyUp = (e) => {
      (this.keysDown.delete(e.code) && e.code === `Space` && e.preventDefault(),
        at.has(e.code) && this.holding?.src === `kb` && this.endHold());
    };
    endHold() {
      this.holding &&= (Ze(this.holding.el), null);
    }
    scope() {
      let e = this.ui.querySelectorAll(`.modal-back .modal`),
        t = e[e.length - 1];
      if (t)
        return {
          kind: `modal`,
          roots: [t],
          main: t,
          back: () => t.querySelector(`.modal-x`)?.click(),
          backLabel: `Close`,
          startBacks: !1,
          tabs: null,
        };
      let n = this.nav.topRoot;
      if (n) {
        let e = !this.nav.live,
          t = this.nav.pagesOpen > 0,
          r = this.nav.bars.filter(
            (e) => e.checkVisibility?.({ opacityProperty: !0 }) ?? !0,
          );
        return {
          kind: `nav`,
          roots: e && !t ? [n, ...r] : [n],
          main: n,
          back:
            this.nav.level > 0 && !this.nav.topSticky
              ? () => this.nav.back()
              : null,
          backLabel: `Back`,
          startBacks: !1,
          tabs: this.navTabs(n, e && !t),
        };
      }
      if (m.holding(`chat`)) return null;
      if (m.holding(`build`)) {
        let e = this.overlay?.();
        return e ? { kind: `build`, ...e, startBacks: !0 } : null;
      }
      let r = this.ui.querySelector(`.results.on`);
      return r
        ? {
            kind: `results`,
            roots: [r],
            main: r,
            back: null,
            backLabel: ``,
            startBacks: !1,
            tabs: null,
          }
        : null;
    }
    navTabs(e, t) {
      if (t) return { step: (e) => this.nav.cycle(e), label: `Sections` };
      let n = e.querySelector(`[data-pad='next']`),
        r = e.querySelector(`[data-pad='prev']`);
      if (n || r)
        return {
          step: (e) => {
            let t = e > 0 ? n : r;
            t && this.usable(t) && t.click();
          },
          label: (n ?? r)?.dataset.padLabel ?? `Browse`,
        };
      let i = [...e.querySelectorAll(`[data-pad-tabs]`)].filter(
        (e) => e.isConnected && e.getClientRects().length,
      );
      return i.length
        ? {
            label: `Tabs`,
            step: (e) => {
              let t = i.find((e) => e.isConnected);
              if (!t) return;
              let n = [...t.querySelectorAll(`button`)].filter((e) =>
                this.usable(e),
              );
              n[n.findIndex((e) => e.classList.contains(`on`)) + e]?.click();
            },
          }
        : null;
    }
    owned(e, t) {
      if (e?.kind !== `nav`) return null;
      let n = e.main.querySelector(`[data-pad="${t}"]`);
      return n && this.usable(n) ? n : null;
    }
    candidates(e) {
      let t = [];
      for (let n of e.roots)
        for (let e of n.querySelectorAll(rt)) this.usable(e) && t.push(e);
      return t;
    }
    usable(e) {
      if (
        e.disabled ||
        e.closest(
          this.src === `kb`
            ? `[inert], [hidden]`
            : `[inert], [data-pad-skip], [hidden]`,
        )
      )
        return !1;
      let t = e.getBoundingClientRect();
      return !t.width || !t.height
        ? !1
        : (e.checkVisibility?.({ visibilityProperty: !0 }) ?? !0);
    }
    valid(e, t) {
      return (
        e instanceof HTMLElement &&
        e.matches(rt) &&
        t.roots.some((t) => t.contains(e)) &&
        this.usable(e)
      );
    }
    keep(e) {
      let t = e.main !== this.main;
      t && ((this.main = e.main), (this.last = null));
      let n = document.activeElement;
      if (this.valid(n, e) && !(t && e.focus)) {
        this.remember(n);
        return;
      }
      let r = this.candidates(e);
      if (!r.length) return;
      let i;
      !t && this.last && (i = this.relocate(r, this.last));
      let a = r.filter(yt);
      ((i ??=
        (t && e.focus && r.includes(e.focus) ? e.focus : void 0) ??
        r.find((e) => e.hasAttribute(`data-autofocus`)) ??
        a.find((e) => e.closest(`.page-body`)) ??
        r.find(
          (e) => e.closest(`[data-pad-tabs]`) && e.classList.contains(`on`),
        ) ??
        a[0] ??
        r[0]),
        this.focus(i));
    }
    relocate(e, t) {
      let n = (e) => {
        let n,
          r = 1 / 0;
        for (let i of e) {
          let e = i.getBoundingClientRect(),
            a = Math.hypot(
              e.left + e.width / 2 - (t.rect.left + t.rect.width / 2),
              e.top + e.height / 2 - (t.rect.top + t.rect.height / 2),
            );
          a < r && ((r = a), (n = i));
        }
        return n;
      };
      return n(e.filter((e) => _t(e) === t.sig)) ?? n(e);
    }
    remember(e) {
      this.last = { rect: e.getBoundingClientRect(), sig: _t(e) };
    }
    focus(e) {
      (e.focus({ preventScroll: !0 }), this.reveal(e), this.remember(e));
    }
    move(e, t) {
      let n = document.activeElement,
        r = this.valid(n, e) ? n.getBoundingClientRect() : this.last?.rect;
      if (!r) return;
      let i = null,
        a = 1 / 0;
      for (let o of this.candidates(e)) {
        if (o === n) continue;
        let e = gt(r, o.getBoundingClientRect(), t);
        e < a && ((a = e), (i = o));
      }
      if (t === `up` || t === `down`) {
        let a = t === `down` ? 1 : -1,
          o = i ? vt(i, `y`, e) : this.hostFor(e, `y`);
        if (o) {
          let e = o.getBoundingClientRect(),
            t = i?.getBoundingClientRect(),
            n = t ? (a > 0 ? t.bottom - e.bottom : e.top - t.top) : 1 / 0,
            r =
              a > 0
                ? o.scrollTop + o.clientHeight < o.scrollHeight - 1
                : o.scrollTop > 0;
          if (n > e.height / 2 && r) {
            o.scrollBy({
              top: a * e.height * 0.6,
              behavior: xt() ? `auto` : `smooth`,
            });
            return;
          }
        }
        let s = n instanceof HTMLElement ? n.closest(`[data-pad-wrap]`) : null;
        s && !(i && s.contains(i)) && (i = this.wrapEnd(e, s, r, t) ?? i);
      }
      i && this.focus(i);
    }
    wrapEnd(e, t, n, r) {
      let i = t.getBoundingClientRect(),
        a = new DOMRect(
          n.x,
          r === `up` ? i.bottom + 2 : i.top - n.height - 2,
          n.width,
          n.height,
        ),
        o = null,
        s = 1 / 0;
      for (let n of this.candidates(e)) {
        if (!t.contains(n)) continue;
        let e = gt(a, n.getBoundingClientRect(), r);
        e < s && ((s = e), (o = n));
      }
      return o;
    }
    reveal(e) {
      let t = bt(2),
        n = xt() ? `auto` : `smooth`;
      for (
        let r = e.parentElement;
        r && r !== document.body;
        r = r.parentElement
      ) {
        let i = getComputedStyle(r),
          a = e.getBoundingClientRect(),
          o = r.getBoundingClientRect(),
          s = o.top + t + (parseFloat(i.scrollPaddingTop) || 0),
          c = o.bottom - t - (parseFloat(i.scrollPaddingBottom) || 0),
          l = 0,
          u = 0;
        ($(r, `y`) &&
          (a.top < s
            ? (u = a.top - s)
            : a.bottom > c && (u = Math.min(a.bottom - c, a.top - s))),
          $(r, `x`) &&
            (a.left < o.left + t
              ? (l = a.left - o.left - t)
              : a.right > o.right - t &&
                (l = Math.min(a.right - o.right + t, a.left - o.left - t))),
          (l || u) && r.scrollBy({ left: l, top: u, behavior: n }));
      }
    }
    slide(e, t) {
      (t > 0 ? e.stepUp() : e.stepDown(),
        e.dispatchEvent(new Event(`input`, { bubbles: !0 })),
        e.dispatchEvent(new Event(`change`, { bubbles: !0 })));
    }
    scroll(e, t, n) {
      let r = t.axes[2] ?? 0,
        i = t.axes[3] ?? 0;
      (Math.abs(i) >= 0.25 &&
        this.hostFor(e, `y`)?.scrollBy({ top: i * ut * n }),
        Math.abs(r) >= 0.25 &&
          this.hostFor(e, `x`)?.scrollBy({ left: r * ut * n }));
    }
    hostFor(e, t) {
      let n = document.activeElement,
        r = n instanceof HTMLElement ? vt(n, t, e) : null;
      if (r || t === `x`) return r;
      let i = this.scrollHost;
      return (
        (i?.main !== e.main ||
          (i.el ? !i.el.isConnected : this.lastNow - i.at > 1e3)) &&
          (this.scrollHost = {
            main: e.main,
            el:
              [e.main, ...e.main.querySelectorAll(`*`)].find((e) =>
                $(e, `y`),
              ) ?? null,
            at: this.lastNow,
          }),
        this.scrollHost.el
      );
    }
    readDir(e, t) {
      if (t(Z.up)) return `up`;
      if (t(Z.down)) return `down`;
      if (t(Z.left)) return `left`;
      if (t(Z.right)) return `right`;
      let n = e.axes[0] ?? 0,
        r = e.axes[1] ?? 0,
        i = (e) =>
          e === `left` ? -n : e === `right` ? n : e === `up` ? -r : r;
      return this.stickDir &&
        i(this.stickDir) > lt &&
        Math.abs(i(this.stickDir)) >=
          Math.abs(
            this.stickDir === `left` || this.stickDir === `right` ? r : n,
          )
        ? this.stickDir
        : ((this.stickDir = null),
          Math.max(Math.abs(n), Math.abs(r)) < ct
            ? null
            : ((this.stickDir =
                Math.abs(n) > Math.abs(r)
                  ? n > 0
                    ? `right`
                    : `left`
                  : r > 0
                    ? `down`
                    : `up`),
              this.stickDir));
    }
    repeat(e, t) {
      return e === this.dir
        ? e && t >= this.nextRepeat
          ? ((this.nextRepeat = t + st), e)
          : null
        : ((this.dir = e), (this.nextRepeat = t + ot), e);
    }
    engage(e) {
      e !== this.src &&
        ((this.src = e),
        e && m.noteSource(e),
        document.body.classList.toggle(`pad-nav`, !!e),
        (this.hintKey = ``),
        e || this.hints.classList.toggle(`on`, !1));
    }
    apply(e) {
      (e || (this.main = null),
        this.holding &&
          (document.activeElement !== this.holding.el ||
            !this.holding.el.isConnected) &&
          this.endHold(),
        this.place(e),
        this.prev.some(Boolean) || (this.latch = !1));
      let t =
        this.latch ||
        this.keysDown.size > 0 ||
        (!!e && e.kind !== `nav` && this.engaged);
      t !== this.held &&
        ((this.held = t), t ? m.hold(`padnav`) : m.release(`padnav`));
      let n = !!e && this.engaged;
      if ((this.hints.classList.toggle(`on`, n), !n)) {
        this.hintKey = ``;
        return;
      }
      let r = this.src === `kb`,
        a = dt[r ? `kb` : (_ ?? `xbox`)],
        o = document.activeElement,
        s =
          o instanceof HTMLInputElement && o.type === `range`
            ? `slider`
            : Q(o)
              ? `text`
              : o instanceof HTMLElement && o.hasAttribute(`data-hold`)
                ? `hold`
                : ``,
        c = !r && e.kind === `nav` && this.nav.live;
      this.lastNow - this.canScroll.at > 500 &&
        (this.canScroll = {
          at: this.lastNow,
          on: !r && !!this.hostFor(e, `y`),
        });
      let l = [`b`, `y`, `start`]
          .map((t) => [t, this.owned(e, t)?.dataset.padLabel ?? ``])
          .filter(([, e]) => e),
        u = `${this.src}|${_}|${e.back ? e.backLabel : ``}|${e.startBacks}|${e.tabs?.label ?? ``}|${c}|${s}|${this.canScroll.on}|${l.join()}`;
      if (u === this.hintKey) return;
      this.hintKey = u;
      let d = (e, t) => {
          let n = i(`span`, `pad-hint`);
          for (let t of e) n.append(i(`span`, `pad-key`, t));
          return (n.append(i(`span`, ``, t)), n);
        },
        f = [
          s === `slider`
            ? d([`◀`, `▶`], `Adjust`)
            : s === `text`
              ? d([], `Type`)
              : d([a.a], s === `hold` ? `Hold` : `Select`),
        ];
      if (
        (e.back &&
          f.push(d(e.startBacks && !r ? [a.b, a.start] : [a.b], e.backLabel)),
        !r)
      )
        for (let [e, t] of l) f.push(d([a[e]], t));
      (e.tabs && f.push(d([a.lb, a.rb], e.tabs.label)),
        c && f.push(d([a.start], `Resume`)),
        this.canScroll.on && f.push(d([a.rs], `Scroll`)),
        this.hints.replaceChildren(...f));
    }
    place(e) {
      let t = document.activeElement,
        n = !!e && this.engaged && this.valid(t, e);
      if ((this.ring.classList.toggle(`on`, n), !n)) {
        this.ringMain = null;
        return;
      }
      let r = t.getBoundingClientRect(),
        i = bt(0.45),
        a = this.ring.style;
      ((a.transition = e.main === this.ringMain ? `` : `none`),
        (this.ringMain = e.main),
        (a.translate = `${r.left - i}px ${r.top - i}px`),
        (a.width = `${r.width + i * 2}px`),
        (a.height = `${r.height + i * 2}px`));
      let o = getComputedStyle(t).borderTopLeftRadius;
      a.borderRadius = o.endsWith(`%`) ? o : `${(parseFloat(o) || 0) + i}px`;
    }
  };
function gt(e, t, n) {
  let r = n === `left` || n === `right`,
    i = n === `right` || n === `down` ? 1 : -1,
    a = r ? e.left + e.width / 2 : e.top + e.height / 2,
    o = r ? t.left + t.width / 2 : t.top + t.height / 2;
  if (
    (o - a) * i <= 1 ||
    (r
      ? Math.min(e.right, t.right) - Math.max(e.left, t.left)
      : Math.min(e.bottom, t.bottom) - Math.max(e.top, t.top)) >
      Math.min(r ? e.width : e.height, r ? t.width : t.height) / 2
  )
    return 1 / 0;
  let s = Math.max(
      0,
      i > 0
        ? r
          ? t.left - e.right
          : t.top - e.bottom
        : r
          ? e.left - t.right
          : e.top - t.bottom,
    ),
    c = r
      ? Math.max(0, t.top - e.bottom, e.top - t.bottom)
      : Math.max(0, t.left - e.right, e.left - t.right);
  if (r && c > s) return 1 / 0;
  let l = Math.abs(
    r
      ? t.top + t.height / 2 - (e.top + e.height / 2)
      : t.left + t.width / 2 - (e.left + e.width / 2),
  );
  return s + c * 2 + l * 0.05 + Math.abs(o - a) * 0.01;
}
function _t(e) {
  let t = Object.entries(e.dataset)
    .filter(([e]) => e !== `autofocus`)
    .map(([e, t]) => `${e}=${t}`)
    .join(`,`);
  return `${e.tagName}|${e.getAttribute(`aria-label`) ?? ``}|${t}|${(e.textContent ?? ``).trim().slice(0, 40)}`;
}
function $(e, t) {
  let n = getComputedStyle(e);
  return t === `y`
    ? /auto|scroll/.test(n.overflowY) && e.scrollHeight > e.clientHeight + 1
    : /auto|scroll/.test(n.overflowX) && e.scrollWidth > e.clientWidth + 1;
}
function vt(e, t, n) {
  if (!n.roots.some((t) => t.contains(e))) return null;
  for (
    let r = e.parentElement;
    r && n.roots.some((e) => e.contains(r));
    r = r.parentElement
  )
    if ($(r, t)) return r;
  return null;
}
function yt(e) {
  let t = e.getBoundingClientRect();
  if (
    t.bottom <= 0 ||
    t.top >= innerHeight ||
    t.right <= 0 ||
    t.left >= innerWidth
  )
    return !1;
  for (let n = e.parentElement; n && n !== document.body; n = n.parentElement) {
    if (!$(n, `y`) && !$(n, `x`)) continue;
    let e = n.getBoundingClientRect();
    if (
      t.bottom <= e.top ||
      t.top >= e.bottom ||
      t.right <= e.left ||
      t.left >= e.right
    )
      return !1;
  }
  return !0;
}
var bt = (e) =>
    e * parseFloat(getComputedStyle(document.documentElement).fontSize),
  xt = () =>
    matchMedia(`(prefers-reduced-motion: reduce)`).matches ||
    document.body.classList.contains(`reduce-motion`);
export {
  _e as A,
  De as C,
  Ce as D,
  K as E,
  Se as F,
  I,
  be as L,
  ye as M,
  ge as N,
  R as O,
  xe as P,
  we as R,
  G as S,
  Ne as T,
  Ie as _,
  et as a,
  je as b,
  qe as c,
  J as d,
  Ke as f,
  Le as g,
  Re as h,
  Ye as i,
  ve as j,
  z as k,
  Fe as l,
  We as m,
  Q as n,
  Qe as o,
  Ge as p,
  ft as r,
  $e as s,
  ht as t,
  Ve as u,
  Be as v,
  Pe as w,
  Oe as x,
  W as y,
};
