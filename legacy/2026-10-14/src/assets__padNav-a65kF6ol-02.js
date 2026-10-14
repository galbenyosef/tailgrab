// assets__padNav-a65kF6ol 02 — look
// Lines 351-646 of readable/assets__padNav-a65kF6ol.pretty.js (statement-aligned).
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
