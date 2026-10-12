// assets__juice-6UyTKeka 03 — layer
// Lines 682-954 of readable/assets__juice-6UyTKeka.pretty.js (statement-aligned).
var nt = {
    look: { xbox: `RS`, playstation: `R3` },
    walk: { xbox: `LS`, playstation: `L3` },
    ollie: { xbox: `A`, playstation: `✕` },
    flip: { xbox: `X`, playstation: `□` },
    grab: { xbox: `B`, playstation: `○` },
    grind: { xbox: `Y`, playstation: `△` },
  },
  rt = {
    ollie: { xbox: `#3ee07f`, playstation: `#8fb1ff` },
    flip: { xbox: `#6a98ff`, playstation: `#ff94dc` },
    grab: { xbox: `#ff6a4a`, playstation: `#ff6b78` },
    grind: { xbox: `#ffd21f`, playstation: `#3fe3b0` },
  },
  it = {
    look: `LOOK`,
    walk: `WALK`,
    ollie: `OLLIE`,
    flip: `FLIP`,
    grab: `GRAB`,
    grind: `GRIND`,
  };
function at(e, t = q()) {
  return t === `pad`
    ? (nt[e]?.[b ?? `xbox`] ?? e)
    : t === `touch`
      ? (it[e] ?? e)
      : tt((x.binds[e] ?? W()[e])[0] ?? ``);
}
var ot = () => `${q()}|${b}|${Je}`;
function st(e, t = q()) {
  let n = document.createElement(`kbd`);
  return ((n.textContent = at(e, t)), n);
}
function ct(e, t = q()) {
  return t === `pad` ? (rt[e]?.[b ?? `xbox`] ?? null) : null;
}
var lt = Array.from(crypto.getRandomValues(new Uint8Array(12)), (e) =>
    (e % 36).toString(36),
  ).join(``),
  J = [],
  Y = { arrows: 0, wasd: 0, space: 0, other: 0, first: [] },
  X = { n: 0, ms: 0, cpu: 0, slow: 0, stall: 0, max: 0 },
  Z = { n: 0, first: [] },
  Q = {},
  ut = ``,
  dt = 0,
  $ = !1,
  ft = () => ({ screen: `boot` }),
  pt = () => Math.round(performance.now() / 100) / 10;
function mt(e, t, n) {
  (g.measure(e, t, n),
    J.push({ t: pt(), e: `${e}/${t}/${n}` }),
    J.length > 40 && J.shift());
}
function ht(e) {
  ft = e;
}
function gt(e, t = 1) {
  Q[e] = (Q[e] ?? 0) + t;
}
function _t(e, t) {
  if (!(e <= 0)) {
    if ($) {
      $ = !1;
      return;
    }
    (X.n++,
      (X.ms += e),
      (X.cpu += t),
      e > 20 && X.slow++,
      e > 50 && X.stall++,
      e > X.max && (X.max = e));
  }
}
function vt(e) {
  ut = e;
}
function yt() {
  let e;
  try {
    e = ft();
  } catch {
    e = { screen: `?` };
  }
  return {
    v: 1,
    sid: lt,
    uid: h.account?.id ?? ``,
    portal: g.id,
    t: pt(),
    where: e,
    tutorial: x.tutorial,
    tips: x.tips,
    trail: J,
    keys: Y,
    device: q(),
    layout: x.layout,
    layoutPicked: x.layoutPicked,
    frames: {
      ...X,
      ms: Math.round(X.ms),
      cpu: Math.round(X.cpu),
      max: Math.round(X.max),
    },
    tier: ut,
    hidden: dt,
    errors: Z,
    counts: Q,
  };
}
function bt() {
  try {
    navigator.sendBeacon?.(
      `${_}/beacon/leave`,
      new Blob([JSON.stringify(yt())], { type: `text/plain` }),
    );
  } catch {}
}
var xt = (e) =>
  e instanceof HTMLElement &&
  (e.isContentEditable || e.tagName === `INPUT` || e.tagName === `TEXTAREA`);
window.addEventListener(
  `keydown`,
  (e) => {
    if (e.repeat || xt(e.target)) return;
    let t = e.code;
    (t.startsWith(`Arrow`)
      ? Y.arrows++
      : t === `KeyW` || t === `KeyA` || t === `KeyS` || t === `KeyD`
        ? Y.wasd++
        : t === `Space`
          ? Y.space++
          : Y.other++,
      Y.first.length < 12 && t && !Y.first.includes(t) && Y.first.push(t));
  },
  { capture: !0, passive: !0 },
);
function St(e) {
  (Z.n++, Z.first.length < 3 && Z.first.push(e.slice(0, 160)));
}
(window.addEventListener(`error`, (e) =>
  St(e.message || String(e.error ?? `error`)),
),
  window.addEventListener(`unhandledrejection`, (e) => {
    let t = e.reason;
    St(
      `unhandled: ${typeof t?.message == `string` ? t.message : String(e.reason)}`,
    );
  }),
  document.addEventListener(`visibilitychange`, () => {
    document.visibilityState === `hidden` && (dt++, ($ = !0), bt());
  }),
  window.addEventListener(`pagehide`, bt));
var Ct = [`#FF3D7F`, `#FFD21F`, `#2FD67B`, `#1FC7E8`, `#A55BFF`, `#FF8A1F`],
  wt = 440,
  Tt = class {
    layer;
    skipping = !1;
    onTap = () => {
      this.skipping = !0;
    };
    constructor(e = !0) {
      ((this.layer = m(`div`, `reward-layer ${e ? `` : `passive`}`)),
        document.body.append(this.layer),
        e && this.layer.addEventListener(`pointerdown`, this.onTap));
    }
    wait(e) {
      return this.skipping || p()
        ? Promise.resolve()
        : new Promise((t) => {
            let n = performance.now(),
              r = () =>
                this.skipping || performance.now() - n >= e
                  ? t()
                  : requestAnimationFrame(r);
            requestAnimationFrame(r);
          });
    }
    confetti(e, t, n = 36, r = 1) {
      if (!p())
        for (let i = 0; i < n; i++) {
          let n = m(`i`, `cf`),
            a = Math.random() * Math.PI * 2,
            o = (120 + Math.random() * 260) * r;
          ((n.style.cssText = `left:${e}px;top:${t}px;--dx:${Math.cos(a) * o}px;--dy:${Math.sin(a) * o * 0.7 - 120 * r}px;--rot:${Math.random() * 900 - 450}deg;--c:${Ct[i % Ct.length]};--d:${Math.random() * 90}ms;--s:${0.6 + Math.random() * 0.8}`),
            this.layer.append(n),
            setTimeout(() => n.remove(), 1700));
        }
    }
    rays(e, t, n = 60, r = 1600) {
      let i = m(`div`, `rays`);
      return (
        (i.style.cssText = `left:${e}px;top:${t}px;--size:${n}rem`),
        this.layer.append(i),
        setTimeout(() => i.classList.add(`out`), r),
        setTimeout(() => i.remove(), r + 500),
        i
      );
    }
    float(e, t, n, r = ``, i) {
      let a = m(`div`, `reward-float ${r}`, n);
      (i && a.prepend(y(i, `lead`)),
        (a.style.cssText = `left:${e}px;top:${t}px`),
        this.layer.append(a));
      let o = a.offsetWidth / 2 + 8;
      return (
        (a.style.left = `${Math.min(Math.max(e, o), innerWidth - o)}px`),
        setTimeout(() => a.remove(), 1400),
        a
      );
    }
    fly(e, t, n, r = 0, i = wt) {
      let a = t.getBoundingClientRect();
      if (p() || this.skipping) return Promise.resolve();
      let o = m(`div`, `reward-fly`);
      o.append(n === `star` || n === `coin` ? y(n) : B(n));
      let s = e.left + e.width / 2,
        c = e.top + e.height / 2,
        l = a.left + a.width / 2,
        u = a.top + a.height / 2,
        d = (s + l) / 2 + (Math.random() - 0.5) * 120,
        ee = Math.min(c, u) - 140 - Math.random() * 60;
      ((o.style.cssText = `left:0;top:0;opacity:0`), this.layer.append(o));
      let f = o.animate(
          [
            {
              transform: `translate(${s}px,${c}px) translate(-50%,-50%) scale(.4)`,
              opacity: 1,
            },
            {
              transform: `translate(${d}px,${ee}px) translate(-50%,-50%) scale(1.5) rotate(180deg)`,
              opacity: 1,
              offset: 0.45,
            },
            {
              transform: `translate(${l}px,${u}px) translate(-50%,-50%) scale(.7) rotate(360deg)`,
              opacity: 1,
            },
          ],
          {
            duration: i,
            delay: r,
            easing: `cubic-bezier(.5,0,.4,1)`,
            fill: `both`,
          },
        ),
        te = setInterval(() => {
          this.skipping && f.finish();
        }, 50);
      return f.finished
        .then(
          () => void 0,
          () => void 0,
        )
        .finally(() => {
          (clearInterval(te), o.remove());
        });
    }
    end() {
      this.layer.classList.contains(`out`) ||
        (this.layer.classList.add(`out`),
        setTimeout(() => this.layer.remove(), 400));
    }
  };
function Et(e = 1800) {
  let t = new Tt(!1);
  return (setTimeout(() => t.end(), e), t);
}
var Dt = (e) => {
  let t = e.getBoundingClientRect();
  return { x: t.left + t.width / 2, y: t.top + t.height / 2, r: t };
};
