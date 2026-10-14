// assets/tagPaint-BOEtbgNi 10 — math
// Lines 4100-4444 of readable/assets/tagPaint-BOEtbgNi.pretty.js (statement-aligned).
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
      for (let e of skoolDaze)
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
