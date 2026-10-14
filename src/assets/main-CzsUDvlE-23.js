// assets/main-CzsUDvlE 23 — pointerid
// Lines 6762-7096 of readable/assets/main-CzsUDvlE.pretty.js (statement-aligned).
function pu(e, t, n, r) {
  let i = j(`a`, `lb-tv off`);
  ((i.tabIndex = 0),
    i.setAttribute(
      `aria-label`,
      `Watch ${e.name}'s ${e.title.toLowerCase()}: ${e.score.toLocaleString()}`,
    ),
    (i.href = I.href({ replay: e.id })));
  let a = j(`span`, `lb-tv-glass`);
  a.append(U(`play`));
  let o = j(`span`, `lb-tv-plate`),
    s = j(`span`, `lb-tv-name`, e.name || `Skater`);
  e.tag && s.append(j(`span`, `lb-tv-tag`, e.tag));
  let c = ln.find((t) => e.board === `run:${t.id}`),
    l = c ? `Best Run` : e.title;
  (o.append(j(`span`, `lb-tv-title`, e.rank > 1 ? `${l} #${e.rank}` : l)),
    c && o.append(j(`span`, `lb-tv-where`, c.name)),
    o.append(s, j(`span`, `lb-tv-score`, e.score.toLocaleString())),
    i.append(a, o),
    i.addEventListener(`click`, (e) => {
      e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey ||
        (e.preventDefault(), n());
    }));
  let u = 0,
    d = ``,
    f = () => {
      let e = t(),
        n = !!e?.on;
      i.classList.toggle(`off`, !n);
      let r =
        e && n
          ? `${e.x.toFixed(1)},${e.y.toFixed(1)},${e.w.toFixed(1)},${e.h.toFixed(1)}`
          : d;
      (r !== d &&
        ((d = r),
        (i.style.transform = `translate(${e.x.toFixed(1)}px, ${e.y.toFixed(1)}px)`),
        (i.style.width = `${e.w.toFixed(1)}px`),
        (i.style.height = `${e.h.toFixed(1)}px`)),
        (u = requestAnimationFrame(f)));
    };
  return (
    (u = requestAnimationFrame(f)),
    r.addEventListener(`abort`, () => cancelAnimationFrame(u)),
    i
  );
}
function mu() {
  return (
    matchMedia(`(pointer: coarse)`).matches ||
    `ontouchstart` in window ||
    new URLSearchParams(location.search).has(`touch`)
  );
}
function hu() {
  let e = (e) => e.preventDefault();
  for (let t of [`gesturestart`, `gesturechange`, `gestureend`])
    document.addEventListener(t, e, { passive: !1 });
  document.addEventListener(`contextmenu`, (e) => {
    e.target?.closest?.(`input, textarea, [contenteditable]`) ||
      e.preventDefault();
  });
}
function gu(e) {
  document.body.classList.add(`touch`);
  let t = document.createElement(`div`);
  ((t.className = `touch-layer`),
    (t.innerHTML = `
    <div class="stick-zone"><div class="stick-base"><div class="stick-knob"></div></div></div>
    <div class="pad">
      <div class="tbtn grind" data-a="grind"><i class="mv up"></i><i class="mv dn"></i><span class="cap">GRIND</span></div>
      <div class="tbtn flip" data-a="flip"><span class="cap">FLIP</span></div>
      <div class="tbtn grab" data-a="grab"><span class="cap">GRAB</span></div>
      <div class="tbtn ollie" data-a="ollie"><span class="cap">OLLIE</span></div>
      <div class="tbtn spin spinL" data-a="spinL"><span class="cap"></span></div>
      <div class="tbtn spin spinR" data-a="spinR"><span class="cap"></span></div>
      <div class="tbtn spin look" data-a="look"><span class="cap"></span></div>
      <div class="tbtn spin walk" data-a="walk"><span class="cap"></span></div>
    </div>`));
  let n = (e) => t.querySelector(`.tbtn.${e} .cap`);
  (n(`spinL`).append(U(`turn`)),
    n(`spinR`).append(U(`turn`)),
    n(`look`).append(U(`eye`)),
    n(`walk`).append(U(`deck`)));
  for (let e of t.querySelectorAll(`.tbtn.grind .mv`)) e.append(U(`chevL`));
  e.append(t);
  let r = (e) => {
    e.cancelable && e.preventDefault();
  };
  for (let e of [`touchstart`, `touchmove`, `touchend`])
    t.addEventListener(e, r, { passive: !1 });
  let i = document.createElement(`div`);
  ((i.className = `rotate-hint`),
    (i.innerHTML = `<div class="rotate-phone"></div><b>Turn sideways to skate</b><span>The park plays in landscape</span>`),
    document.body.append(i));
  let a = () => {
    (t.style.setProperty(`--ts`, String(yu())),
      t.style.setProperty(`--to`, String(J.touchOpacity)),
      t.classList.toggle(`lefty`, J.leftHanded));
  };
  (a(), window.addEventListener(`resize`, a));
  let o = t.querySelector(`.stick-zone`),
    s = t.querySelector(`.stick-base`),
    c = t.querySelector(`.stick-knob`),
    l = -1,
    u = 0,
    d = 0,
    f = 0,
    p = 0;
  (o.addEventListener(`pointerdown`, (e) => {
    if (l !== -1) return;
    ((l = e.pointerId),
      o.setPointerCapture(e.pointerId),
      (u = e.clientX),
      (d = e.clientY));
    let t = o.getBoundingClientRect();
    ((f = t.left),
      (p = t.top),
      (s.style.transform = `translate(${u - f - 70}px, ${d - p - 70}px)`),
      s.classList.add(`on`),
      (c.style.transform = `translate(0,0)`),
      e.preventDefault());
  }),
    o.addEventListener(`pointermove`, (e) => {
      if (e.pointerId !== l) return;
      let t = e.clientX - u,
        n = e.clientY - d,
        r = Math.hypot(t, n);
      if (r > 56) {
        let e = 56 / r;
        (J.touchStick === `follow` &&
          ((u += t * (1 - e)),
          (d += n * (1 - e)),
          (s.style.transform = `translate(${u - f - 70}px, ${d - p - 70}px)`)),
          (t *= e),
          (n *= e));
      }
      ((c.style.transform = `translate(${t}px, ${n}px)`),
        z.setStick(`touch`, t / 56, -n / 56));
    }));
  let m = (e) => {
    e.pointerId === l &&
      ((l = -1), s.classList.remove(`on`), z.setStick(`touch`, 0, 0));
  };
  (o.addEventListener(`pointerup`, m), o.addEventListener(`pointercancel`, m));
  let h = t.querySelector(`.pad`),
    g = [...h.querySelectorAll(`.tbtn`)].map((e) => ({
      el: e,
      action: e.dataset.a,
    })),
    _ = new Map(),
    v = [],
    y = 0,
    b = () => {
      ((v = g.map((e) => e.el.getBoundingClientRect())),
        (y = Math.max(16, 24 * yu())));
    },
    x = (e, t) => {
      for (let n = 0; n < g.length; n++) {
        let r = v[n];
        if (
          r &&
          e >= r.left - 10 &&
          e <= r.right + 10 &&
          t >= r.top - 10 &&
          t <= r.bottom + 10
        )
          return g[n];
      }
      return null;
    },
    S = (e, t) => {
      let n = _.get(e) ?? null;
      n !== t &&
        (n && (z.set(`touch`, n.action, !1), n.el.classList.remove(`down`)),
        t &&
          (z.set(`touch`, t.action, !0),
          t.el.classList.add(`down`),
          J.haptics && I.haptic(6)),
        _.set(e, t));
    },
    C = g.find((e) => e.action === `grind`),
    ee = C.el.querySelector(`.cap`),
    [te, w] = [...C.el.querySelectorAll(`.mv`)],
    T = null,
    E = new Set(),
    D = (e) => {
      let t = e ? Math.max(-1, Math.min(1, e / y)) : 0;
      ((ee.style.translate = t ? `0 ${(t * y * 0.4).toFixed(1)}px` : ``),
        te.style.setProperty(`--p`, String(Math.max(0, -t))),
        w.style.setProperty(`--p`, String(Math.max(0, t))));
    },
    ne = () => {
      let e = ee.style.translate;
      ((T = null),
        C.el.classList.remove(`drag`),
        D(0),
        e &&
          ee.animate([{ translate: e }, { translate: `0 0` }], {
            duration: 160,
            easing: `cubic-bezier(.3,1.7,.5,1)`,
          }));
    },
    re = (e) => {
      let t = T,
        n = 1 - Math.exp(-(e.timeStamp - t.t) / 600);
      ((t.ax += (t.px - t.ax) * n),
        (t.ay += (t.py - t.ay) * n),
        (t.px = e.clientX),
        (t.py = e.clientY),
        (t.t = e.timeStamp));
      let r = t.px - t.ax,
        i = t.py - t.ay,
        a = Math.abs(r) <= Math.abs(i) * 0.7;
      if (Math.abs(i) < y || !a) return (D(a ? i : 0), !1);
      let o = i > 0;
      (z.flick(o ? We.U : We.D, o ? We.D : We.U),
        S(e.pointerId, null),
        E.add(e.pointerId),
        (T = null),
        C.el.classList.remove(`drag`),
        D(0),
        (o ? w : te).style.setProperty(`--p`, `1`),
        J.haptics && I.haptic(12));
      let s = o ? 1 : -1;
      return (
        (o ? w : te).animate(
          [
            { opacity: 1, translate: `0 0`, scale: 1.25 },
            { opacity: 0, translate: `0 ${s * y * 0.5}px`, scale: 1 },
          ],
          { duration: 360, easing: `cubic-bezier(.2,.8,.3,1)` },
        ),
        ee.animate(
          [{ translate: `0 ${s * y * 0.45}px` }, { translate: `0 0` }],
          { duration: 220, easing: `cubic-bezier(.3,1.7,.5,1)` },
        ),
        !0
      );
    };
  (h.addEventListener(`pointerdown`, (e) => {
    (h.setPointerCapture(e.pointerId),
      b(),
      S(e.pointerId, x(e.clientX, e.clientY)),
      _.get(e.pointerId) === C &&
        !T &&
        ((T = {
          id: e.pointerId,
          ax: e.clientX,
          ay: e.clientY,
          px: e.clientX,
          py: e.clientY,
          t: e.timeStamp,
        }),
        C.el.classList.add(`drag`),
        D(0)),
      e.preventDefault());
  }),
    h.addEventListener(`pointermove`, (e) => {
      if (
        !_.has(e.pointerId) ||
        E.has(e.pointerId) ||
        (T?.id === e.pointerId && re(e))
      )
        return;
      let t = x(e.clientX, e.clientY);
      (S(e.pointerId, t), T?.id === e.pointerId && t && t !== C && ne());
    }));
  let ie = (e) => {
    (S(e.pointerId, null),
      _.delete(e.pointerId),
      E.delete(e.pointerId),
      T?.id === e.pointerId && ne());
  };
  (h.addEventListener(`pointerup`, ie),
    h.addEventListener(`pointercancel`, ie));
  let ae = () => {
    z.clear(`touch`);
    for (let e of g) e.el.classList.remove(`down`);
    (_.clear(), E.clear(), (T = null), C.el.classList.remove(`drag`), D(0));
  };
  return (
    window.addEventListener(`blur`, ae),
    () => {
      (window.removeEventListener(`blur`, ae),
        t.remove(),
        document.body.classList.remove(`touch`));
    }
  );
}
function _u() {
  if (
    I.ownsFullscreen ||
    !matchMedia(`(pointer: coarse)`).matches ||
    document.fullscreenElement
  )
    return;
  let e = screen.orientation;
  document.documentElement
    .requestFullscreen?.({ navigationUI: `hide` })
    ?.then(() => e.lock?.(`landscape`))
    .catch(() => {});
}
function vu() {
  let e = document.querySelector(`.touch-layer`);
  e &&
    (e.style.setProperty(`--ts`, String(yu())),
    e.style.setProperty(`--to`, String(J.touchOpacity)),
    e.classList.toggle(`lefty`, J.leftHanded));
}
function yu() {
  let e = Math.max(0.58, Math.min(1, window.innerHeight / 560));
  return J.touchScale * e;
}
var discordInvite = `https://discord.gg/8fYyEs3zSF`,
  xu = (e) =>
    e.kind === `career`
      ? null
      : e.kind === `public`
        ? e
        : { kind: `park`, code: e.code, via: e.via, name: e.name },
  Su = (e) =>
    e.kind === `public`
      ? e
      : { kind: `park`, code: e.code, via: e.via, name: e.name },
  Cu = (e) => !!e && e.members.length > 1,
  whereLabels = {
    plaza: `the Skate Hub`,
    park: `a park`,
    match: `a match`,
    career: `career`,
  };
