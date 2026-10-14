import { S as e, t, v as n, y as r } from "./Client-CpE02kO_.js";
function i(e) {
  return e.indexOf(`top`) === 0 ? `top` : `bottom`;
}
function a(e) {
  return e.indexOf(`right`) === -1 ? `left` : `right`;
}
function o(e, t, n, r = 0) {
  e.style[t] = n + r + `px`;
  let i = `max(${n}px, env(safe-area-inset-${t}, 0px))`;
  e.style[t] = r ? `calc(${i} + ${r}px)` : i;
}
function s(e) {
  ((e.style.top = `auto`),
    (e.style.right = `auto`),
    (e.style.bottom = `auto`),
    (e.style.left = `auto`));
}
function c(e, t) {
  ((e.style.maxHeight = t), (e.style.maxHeight = t.replace(/vh\b/g, `dvh`)));
}
var l = `(max-width: 640px), (max-height: 480px)`,
  u = `(pointer: coarse)`,
  d = null,
  f = null,
  p = { compact: !1, coarse: !1 },
  m = new Set(),
  h = !1;
function g() {
  return { compact: !!d && d.matches, coarse: !!f && f.matches };
}
function _() {
  if (h) return;
  h = !0;
  let e = function () {
    h && ((h = !1), (p = g()), v());
  };
  (typeof requestAnimationFrame == `function` && requestAnimationFrame(e),
    setTimeout(e, 50));
}
function v() {
  m.forEach(function (e) {
    e(p);
  });
}
function y(e) {
  return (
    m.add(e),
    function () {
      m.delete(e);
    }
  );
}
function b() {
  return p.compact;
}
function x() {
  return p.coarse;
}
function S() {
  !d &&
    typeof window < `u` &&
    window.matchMedia &&
    ((d = window.matchMedia(l)),
    (f = window.matchMedia(u)),
    (p = g()),
    d.addEventListener(`change`, _),
    f.addEventListener(`change`, _),
    window.addEventListener(`resize`, _, { passive: !0 }),
    window.addEventListener(`orientationchange`, _, { passive: !0 }));
}
var C = !1,
  w = `
.cds-surface, .cds-surface * { touch-action: manipulation; }

/* The logo carries a long-press gesture; without this, holding it raises the
   selection callout / context menu instead. */
#debug-logo-container {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    user-select: none;
}

/* Drag surfaces and sliders claim the gesture outright — otherwise a horizontal
   drag on the latency slider scrolls the menu instead of moving the thumb. */
[data-drag], .resize-handle, .cds-range { touch-action: none; }

.cds-scroll {
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    overscroll-behavior: contain;
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
}
.cds-scroll::-webkit-scrollbar { width: 8px; height: 8px; }
.cds-scroll::-webkit-scrollbar-track { background: transparent; }
.cds-scroll::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
}

/* Network-simulation sliders. The gradient fill is re-injected per input event
   (see panel.ts); everything static lives here so a coarse-pointer override can
   win by source order instead of !important. Height lives here rather than
   inline for the same reason. */
.cds-range { height: 20px; }

#latency-slider::-webkit-slider-runnable-track,
#jitter-slider::-webkit-slider-runnable-track {
    height: 6px;
    border-radius: 3px;
    border: none;
}
#latency-slider::-moz-range-track,
#jitter-slider::-moz-range-track {
    height: 6px;
    border-radius: 3px;
    border: none;
}
#latency-slider::-webkit-slider-thumb,
#jitter-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    margin-top: -5px;
    border-radius: 50%;
    border: 2px solid #888;
    background: #fff;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transition: transform 0.1s ease, box-shadow 0.1s ease;
}
#latency-slider::-webkit-slider-thumb:hover,
#jitter-slider::-webkit-slider-thumb:hover {
    transform: scale(1.1);
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
}
#latency-slider::-moz-range-thumb,
#jitter-slider::-moz-range-thumb {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 2px solid #888;
    background: #fff;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transition: transform 0.1s ease;
}
#latency-slider::-moz-range-thumb:hover,
#jitter-slider::-moz-range-thumb:hover { transform: scale(1.1); }

@keyframes debug-pulse { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }

@media (pointer: coarse) {
    /* min-* composes with the inline width/height each control already carries —
       nothing inline sets min-*, so no specificity fight. */
    .cds-hit { min-width: 44px; min-height: 44px; }

    /* Height-only, for controls in a fixed-width row that can't afford 44px each
       (the five Predict mode pills would wrap out of a 240px card). */
    .cds-hit-y { min-height: 44px; }

    .cds-range { height: 32px; }

    #latency-slider::-webkit-slider-runnable-track,
    #jitter-slider::-webkit-slider-runnable-track { height: 10px; border-radius: 5px; }
    #latency-slider::-moz-range-track,
    #jitter-slider::-moz-range-track { height: 10px; border-radius: 5px; }

    #latency-slider::-webkit-slider-thumb,
    #jitter-slider::-webkit-slider-thumb {
        width: 24px;
        height: 24px;
        margin-top: -7px;
    }
    #latency-slider::-moz-range-thumb,
    #jitter-slider::-moz-range-thumb { width: 24px; height: 24px; }
}
`;
function T(e) {
  if (C) return;
  C = !0;
  let t = document.createElement(`style`);
  ((t.id = `colyseus-debug-base-styles`),
    (t.textContent = w),
    e.appendChild(t));
}
var E = new Map(),
  D = 48,
  O = 56,
  k = 60,
  A = new Set(),
  j = {
    maxLatency: 350,
    latencySimulation: { enabled: !1, delay: 0, jitter: 0 },
    panelPosition: { position: `top-right` },
  };
function ee() {
  try {
    let e = localStorage.getItem(`colyseus-debug-preferences`) || `{}`,
      t = JSON.parse(e);
    if (
      (t.position &&
        [`bottom-right`, `bottom-left`, `top-left`, `top-right`].includes(
          t.position,
        ) &&
        (j.panelPosition.position = t.position),
      t.latency !== void 0 && t.latency !== null)
    ) {
      let e = parseInt(t.latency, 10);
      !isNaN(e) &&
        e >= 0 &&
        e <= 500 &&
        ((j.latencySimulation.delay = e),
        (j.latencySimulation.enabled = e > 0));
    }
    if (t.jitter !== void 0 && t.jitter !== null) {
      let e = parseInt(t.jitter, 10);
      !isNaN(e) &&
        e >= 0 &&
        ((j.latencySimulation.jitter = e),
        e > 0 && (j.latencySimulation.enabled = !0));
    }
    sessionStorage.getItem(`colyseus-debug-hidden`) === `true` && (N = !0);
  } catch {}
}
function M() {
  try {
    (localStorage.setItem(
      `colyseus-debug-preferences`,
      JSON.stringify({
        position: j.panelPosition.position,
        latency: j.latencySimulation.delay,
        jitter: j.latencySimulation.jitter,
      }),
    ),
      sessionStorage.setItem(`colyseus-debug-hidden`, N ? `true` : `false`));
  } catch {}
}
var N = !1,
  P = !1,
  F = !1,
  I = null;
function L() {
  if (I) return I;
  let e = document.createElement(`div`);
  return (
    (e.id = `colyseus-debug-shadow-host`),
    [`pointerdown`, `touchstart`, `mousedown`].forEach(function (t) {
      e.addEventListener(t, function (e) {
        e.stopPropagation();
      });
    }),
    (I = e.attachShadow({ mode: `open` })),
    T(I),
    document.body.appendChild(e),
    I
  );
}
function R() {
  let e = j.panelPosition.position;
  return { vertical: i(e), horizontal: a(e) };
}
function te(e, t) {
  let n = t > 0 ? e / t : 0;
  return n <= 0.5
    ? { r: Math.round(n * 2 * 200), g: 200, b: 0 }
    : { r: 200, g: Math.round((1 - (n - 0.5) * 2) * 200), b: 0 };
}
function z(e, t) {
  var n = te(e, j.maxLatency);
  return `rgba(` + n.r + `, ` + n.g + `, ` + n.b + `, ` + t + `)`;
}
function B() {
  if (!N) {
    var e = L(),
      t = e.getElementById(`debug-logo-container`),
      n = e.getElementById(`debug-menu`),
      r = R(),
      i = r.vertical,
      a = r.horizontal;
    (t && (s(t), o(t, i, 14), o(t, a, 14)), n && re(n, i, a), ue(), W());
  }
}
function V(e, t, n) {
  (o(e, `left`, 14),
    o(e, `right`, 14),
    o(e, t, 14, O),
    (e.style.maxWidth = `520px`),
    (e.style.marginLeft = n === `right` ? `auto` : `0`),
    (e.style.marginRight = n === `right` ? `0` : `auto`),
    c(e, `calc(100vh - ${14 + O + 14}px)`));
}
function ne(e) {
  ((e.style.maxWidth = ``),
    (e.style.marginLeft = ``),
    (e.style.marginRight = ``),
    (e.style.maxHeight = ``));
}
function re(e, t, n) {
  (s(e),
    (e.style.overflowX = `hidden`),
    (e.style.overflowY = `auto`),
    (e.style.borderRadius = `8px`),
    b()
      ? (V(e, t, n), (e.style.minWidth = `0`))
      : (ne(e),
        o(e, n, 14),
        (e.style[t] = `60px`),
        (e.style.minWidth = `226px`),
        (e.style.maxWidth = `226px`),
        c(e, `calc(100vh - ${k + 14}px)`)));
}
var H = `colyseus-debug-predict-container`;
function U() {
  return N ? !1 : !b() || (P && !F);
}
function ie() {
  return P;
}
function ae(e) {
  ((P = e), W());
}
function oe(e) {
  ((F = e), W());
}
function W() {
  var e = L(),
    t = U() ? `flex` : `none`,
    n = e.getElementById(G),
    r = e.getElementById(H);
  (n && (n.style.display = t), r && (r.style.display = t));
}
function se() {
  ((N = !0), M());
  var e = L(),
    t = e.getElementById(`debug-logo-container`),
    n = e.getElementById(`debug-menu`),
    r = e.getElementById(G),
    i = e.getElementById(H);
  (t && (t.style.display = `none`),
    n && (n.style.display = `none`),
    r && (r.style.display = `none`),
    i && (i.style.display = `none`));
}
function ce(e) {
  if (e) e < 1 && (e = 1);
  else return `0 B`;
  var t = 1024,
    n = [`B`, `KB`, `MB`, `GB`],
    r = Math.floor(Math.log(e) / Math.log(t));
  return (Math.round(e) / t ** +r).toFixed(1) + ` ` + n[r];
}
var G = `colyseus-debug-panel-stack`;
function le() {
  var e = L(),
    t = e.getElementById(G);
  return (
    t ||
    ((t = document.createElement(`div`)),
    (t.id = G),
    (t.style.position = `fixed`),
    (t.style.display = U() ? `flex` : `none`),
    (t.style.gap = `6px`),
    (t.style.zIndex = `999`),
    (t.style.pointerEvents = `none`),
    e.appendChild(t),
    ue(),
    t)
  );
}
function ue() {
  if (!N) {
    var e = L().getElementById(G);
    if (e) {
      var t = R(),
        n = t.vertical,
        r = t.horizontal;
      (s(e),
        b()
          ? ((e.style.flexDirection =
              n === `bottom` ? `column-reverse` : `column`),
            (e.style.alignItems = `stretch`),
            (e.style.pointerEvents = `auto`),
            e.classList.add(`cds-scroll`),
            V(e, n, r))
          : ((e.style.flexDirection = r === `right` ? `row-reverse` : `row`),
            (e.style.alignItems = n === `top` ? `flex-start` : `flex-end`),
            (e.style.pointerEvents = `none`),
            e.classList.remove(`cds-scroll`),
            (e.style.overflowY = ``),
            ne(e),
            o(e, n, 14),
            o(e, r, 14, D)));
    }
  }
}
function de() {
  return N;
}
var fe = `<svg viewBox="0 0 488.94 541.2" style="width: 100%; height: 100%;">
  <g>
    <g>
      <path fill="#ffffff" d="m80.42,197.14c13.82,11.25,30.56,22.25,50.78,32.11,14.87-28.67,72.09-100.71,233.32-79.68l-14.4-55.35c-200.24-17.18-257.81,77.11-269.7,102.92Z"/>
      <path fill="#ffffff" d="m44.53,167.77c22.44-40.73,99.17-124.23,290.19-105.83L310.19,1.59S109.9-21.63,8.9,109.47c3.62,10.55,13.31,33.34,35.63,58.29Z"/>
      <path fill="#ffffff" d="m407.7,291.25c-32.14,3.35-62.02,4.95-89.63,4.95C123.09,296.2,36.78,219.6,0,164.95v251.98s15.77,162.98,488.94,115.66l-81.24-241.33Z"/>
    </g>
  </g>
</svg>`,
  pe = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="16" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4.5a.5.5 0 0 1-1 0V5.383l-7 4.2-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h5.5a.5.5 0 0 1 0 1H2a2 2 0 0 1-2-1.99zm1 7.105 4.708-2.897L1 5.383zM1 4v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1"></path><path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.354-5.354 1.25 1.25a.5.5 0 0 1-.708.708L13 12.207V14a.5.5 0 0 1-1 0v-1.717l-.28.305a.5.5 0 0 1-.737-.676l1.149-1.25a.5.5 0 0 1 .722-.016"></path></svg>`,
  me = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="16" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4.5a.5.5 0 0 1-1 0V5.383l-7 4.2-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h5.5a.5.5 0 0 1 0 1H2a2 2 0 0 1-2-1.99zm1 7.105 4.708-2.897L1 5.383zM1 4v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1"></path><path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.354-1.646a.5.5 0 0 1-.722-.016l-1.149-1.25a.5.5 0 1 1 .737-.676l.28.305V11a.5.5 0 0 1 1 0v1.793l.396-.397a.5.5 0 0 1 .708.708z"></path></svg>`,
  he = `<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="16" width="16" xmlns="http://www.w3.org/2000/svg"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>`,
  ge = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"/></svg>`,
  _e = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 256 256" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><path d="M160,136v-8H88v64a8,8,0,0,0,8,8h64v-8a16,16,0,0,1,16-16h32a16,16,0,0,1,16,16v32a16,16,0,0,1-16,16H176a16,16,0,0,1-16-16v-8H96a24,24,0,0,1-24-24V80H64A16,16,0,0,1,48,64V32A16,16,0,0,1,64,16H96a16,16,0,0,1,16,16V64A16,16,0,0,1,96,80H88v32h72v-8a16,16,0,0,1,16-16h32a16,16,0,0,1,16,16v32a16,16,0,0,1-16,16H176A16,16,0,0,1,160,136Z"></path></svg>`,
  ve = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><path d="M256 48C141.2 48 48 141.2 48 256s93.2 208 208 208 208-93.2 208-208S370.8 48 256 48zm21 312h-42V235h42v125zm0-166h-42v-42h42v42z"></path></svg>`,
  ye = `<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><path d="M12.003 21c-.732 .001 -1.465 -.438 -1.678 -1.317a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c.886 .215 1.325 .957 1.318 1.694"></path><path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path><path d="M19.001 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path><path d="M19.001 15.5v1.5"></path><path d="M19.001 21v1.5"></path><path d="M22.032 17.25l-1.299 .75"></path><path d="M17.27 20l-1.3 .75"></path><path d="M15.97 17.25l1.3 .75"></path><path d="M20.733 20l1.3 .75"></path></svg>`,
  be = `<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="16" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`,
  xe = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle></svg>`,
  Se = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg>`,
  Ce = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>`,
  we = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49z"></path></svg>`,
  Te = `<svg fill="currentColor" viewBox="0 0 36 36" height="200px" width="200px"><path fill="currentColor" d="M18 24.42a4 4 0 1 0 4 4a4 4 0 0 0-4-4m0 6a2 2 0 1 1 2-2a2 2 0 0 1-2 2" class="clr-i-outline clr-i-outline-path-1"></path><path fill="currentColor" d="M26.21 21.85a1 1 0 0 0-.23-1.4a13.6 13.6 0 0 0-5-2.23l3.87 3.87a1 1 0 0 0 1.36-.24" class="clr-i-outline clr-i-outline-path-2"></path><path fill="currentColor" d="M18.05 10.72a21 21 0 0 0-4.16.43l1.74 1.74a19 19 0 0 1 2.42-.17A18.76 18.76 0 0 1 28.64 16a1 1 0 0 0 1.12-1.65a20.75 20.75 0 0 0-11.71-3.63" class="clr-i-outline clr-i-outline-path-3"></path><path fill="currentColor" d="M33.55 8.2A28.11 28.11 0 0 0 8.11 5.36l1.58 1.57a26 26 0 0 1 22.76 2.94a1 1 0 0 0 1.1-1.67" class="clr-i-outline clr-i-outline-path-4"></path><path fill="currentColor" d="m1.84 4.75l2.43 2.43c-.62.34-1.23.7-1.83 1.1a1 1 0 1 0 1.12 1.66C4.26 9.47 5 9 5.74 8.65l3.87 3.87a20.6 20.6 0 0 0-3.38 1.88A1 1 0 0 0 7.36 16a18.8 18.8 0 0 1 3.77-2l4.16 4.16A13.5 13.5 0 0 0 10 20.55a1 1 0 0 0 1.18 1.61A11.5 11.5 0 0 1 17 20l10.8 10.8l1.41-1.41l-26-26Z" class="clr-i-outline clr-i-outline-path-5"></path><path fill="none" d="M0 0h36v36H0z"></path></svg>`;
function Ee(e, t) {
  return e.replace(
    /height="[^"]*" width="[^"]*"/,
    `height="${t}" width="${t}"`,
  );
}
function De(e, t) {
  return (
    `<span style="display:inline-flex;align-items:center;width:${t}px;height:${t}px;">` +
    Ee(e, t) +
    `</span>`
  );
}
var K = `#888`,
  q = `rgba(255, 255, 255, 0.15)`,
  J = {
    background: `rgba(255, 255, 255, 0.05)`,
    border: `rgba(255, 255, 255, 0.2)`,
    hover: `rgba(255, 255, 255, 0.12)`,
    foreground: `#bbb`,
    activeBackground: `rgba(255, 255, 255, 0.18)`,
    activeBorder: `rgba(255, 255, 255, 0.4)`,
    activeForeground: `#fff`,
  };
function Oe(e, t) {
  ((e.dataset.active = t ? `true` : `false`),
    (e.style.background = t ? J.activeBackground : J.background),
    (e.style.borderColor = t ? J.activeBorder : J.border),
    (e.style.color = t ? J.activeForeground : J.foreground));
}
function ke(e, t, n) {
  (e.addEventListener(`mouseenter`, function () {
    (e.dataset.active !== `true` && (e.style.background = J.hover), t?.());
  }),
    e.addEventListener(`mouseleave`, function () {
      (e.dataset.active !== `true` && (e.style.background = J.background),
        n?.());
    }));
}
var Ae = 450,
  je = 10;
function Me(e) {
  var t = document.createElement(`div`);
  ((t.id = `debug-menu`),
    (t.className = `cds-surface cds-scroll`),
    (t.style.position = `fixed`),
    (t.style.boxSizing = `border-box`),
    (t.style.backgroundColor = `rgba(18, 18, 20, 0.97)`),
    (t.style.color = `#fff`),
    (t.style.padding = `0 0 4px 0`),
    (t.style.border = `1px solid rgba(255, 255, 255, 0.08)`),
    (t.style.fontFamily = `system-ui, -apple-system, sans-serif`),
    (t.style.fontSize = `12px`),
    (t.style.zIndex = `1001`),
    (t.style.boxShadow = `0 8px 28px rgba(0, 0, 0, 0.55)`),
    (t.style.display = `none`));
  function n() {
    var e = document.createElement(`div`);
    return (
      (e.style.cssText = `height:1px;flex-shrink:0;background:rgba(255,255,255,0.16);box-shadow:0 1px 0 rgba(0,0,0,0.4)`),
      e
    );
  }
  function r(e, t) {
    var n = document.createElement(`div`);
    return (
      (n.style.cssText = `display:flex;align-items:center;gap:6px;font-size:10px;font-weight:600;letter-spacing:0.6px;text-transform:uppercase;color:#8a8a8a;margin-bottom:8px`),
      (n.innerHTML = De(e, 12) + `<span>` + t + `</span>`),
      n
    );
  }
  var o = document.createElement(`div`);
  o.style.cssText = `display:flex;align-items:center;gap:8px;padding:9px 12px;cursor:default;background:rgba(255,255,255,0.04);border-bottom:1px solid rgba(255,255,255,0.16);border-top-left-radius:8px;border-top-right-radius:8px`;
  var s = document.createElement(`span`);
  s.style.cssText = `flex-shrink:0;width:7px;height:7px;border-radius:50%;background:#666;box-shadow:0 0 0 3px rgba(255,255,255,0.04)`;
  var c = document.createElement(`div`);
  ((c.id = `debug-menu-host`),
    (c.style.cssText = `flex:1;min-width:0;font-size:11px;color:#eee;font-family:monospace;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-weight:500`));
  function l() {
    var e = `N/A`,
      t = E.size > 0;
    if (t) {
      var n = E.values().next().value;
      n && n.host && (e = n.host);
    }
    ((c.textContent = e), (s.style.background = t ? `#22c55e` : `#666`));
  }
  (l(), o.appendChild(s), o.appendChild(c), t.appendChild(o));
  var u = document.createElement(`div`);
  ((u.style.padding = `8px 12px`), (u.style.cursor = `default`));
  var d = document.createElement(`div`);
  ((d.style.marginBottom = `8px`),
    (d.style.display = `flex`),
    (d.style.alignItems = `center`),
    (d.style.justifyContent = `space-between`));
  var f = document.createElement(`span`);
  ((f.id = `latency-value`),
    (f.style.color = `#888`),
    (f.style.fontSize = `11px`),
    (f.textContent = j.latencySimulation.delay + `ms`));
  var p = document.createElement(`span`);
  ((p.textContent = `Latency (RTT)`),
    (p.style.cssText = `font-size:11px;color:#ccc`),
    d.appendChild(p),
    d.appendChild(f));
  var m = document.createElement(`input`);
  ((m.type = `range`),
    (m.min = `0`),
    (m.max = j.maxLatency.toString()),
    (m.value = j.latencySimulation.delay.toString()),
    (m.className = `cds-range`),
    (m.style.border = `none`),
    (m.style.width = `100%`),
    (m.style.padding = `0`),
    (m.style.margin = `0`),
    (m.style.outline = `none`),
    (m.style.cursor = `pointer`),
    (m.style.webkitAppearance = `none`),
    (m.style.appearance = `none`),
    (m.style.background = `transparent`),
    (m.id = `latency-slider`));
  function h(e) {
    var t = te(e, j.maxLatency);
    return `rgb(` + t.r + `, ` + t.g + `, ` + t.b + `)`;
  }
  function g(e) {
    var t = h(e),
      n = (e / j.maxLatency) * 100,
      r = h(j.maxLatency / 2);
    return e <= j.maxLatency / 2
      ? `linear-gradient(to right, #00c800 0%, ${r} ${n}%, #333 ${n}%, #333 100%)`
      : `linear-gradient(to right, #00c800 0%, ${r} 50%, ${t} ${n}%, #333 ${n}%, #333 100%)`;
  }
  function _(e, t) {
    var n = L(),
      r = e + `-style`,
      i = n.getElementById(r);
    i && i.remove();
    var a = document.createElement(`style`);
    ((a.id = r),
      (a.textContent = `
            #${e}::-webkit-slider-runnable-track { background: ${t}; }
            #${e}::-moz-range-track { background: ${t}; }
        `),
      n.appendChild(a));
  }
  function y(e) {
    _(`latency-slider`, g(e));
  }
  y(parseInt(m.value));
  function x() {
    var e = L().getElementById(`debug-logo-container`);
    e && (e.style.borderColor = z(j.latencySimulation.delay, 0.7));
  }
  (m.addEventListener(`input`, function () {
    var e = parseInt(m.value);
    ((f.textContent = e + `ms`),
      (j.latencySimulation.delay = e),
      (j.latencySimulation.enabled = e > 0 || j.latencySimulation.jitter > 0),
      y(e),
      x(),
      M(),
      F());
  }),
    u.appendChild(d),
    u.appendChild(m),
    t.appendChild(u));
  var S = document.createElement(`div`);
  ((S.style.padding = `8px 12px 12px`), (S.style.cursor = `default`));
  var C = document.createElement(`div`);
  C.style.cssText = `margin-bottom:8px;display:flex;align-items:center;justify-content:space-between`;
  var w = document.createElement(`span`);
  ((w.id = `jitter-value`),
    (w.style.cssText = `color:#888;font-size:11px`),
    (w.textContent = j.latencySimulation.jitter + `ms`));
  var T = document.createElement(`span`);
  ((T.textContent = `Jitter`),
    (T.style.cssText = `font-size:11px;color:#ccc`),
    C.appendChild(T),
    C.appendChild(w));
  var D = document.createElement(`input`);
  ((D.type = `range`),
    (D.min = `0`),
    (D.max = j.maxLatency.toString()),
    (D.value = j.latencySimulation.jitter.toString()),
    (D.id = `jitter-slider`),
    (D.className = `cds-range`),
    (D.style.cssText = `border:none;width:100%;padding:0;margin:0;outline:none;cursor:pointer;-webkit-appearance:none;appearance:none;background:transparent`));
  function O(e) {
    _(`jitter-slider`, g(e));
  }
  (O(parseInt(D.value)),
    D.addEventListener(`input`, function () {
      var e = parseInt(D.value);
      ((w.textContent = e + `ms`),
        (j.latencySimulation.jitter = e),
        (j.latencySimulation.enabled = j.latencySimulation.delay > 0 || e > 0),
        O(e),
        M(),
        F());
    }),
    S.appendChild(C),
    S.appendChild(D),
    t.appendChild(S));
  var k = [
    { label: `Off`, title: `No simulated latency`, delay: 0, jitter: 0 },
    {
      label: `Low`,
      title: `Low latency · 60ms, no jitter`,
      delay: 60,
      jitter: 0,
    },
    {
      label: `Med`,
      title: `Medium latency + jitter · 150ms ± 30ms`,
      delay: 150,
      jitter: 30,
    },
    {
      label: `Large`,
      title: `Large latency + jitter · 300ms ± 60ms`,
      delay: 300,
      jitter: 60,
    },
  ];
  function ee(e, t) {
    ((j.latencySimulation.delay = e),
      (j.latencySimulation.jitter = t),
      (j.latencySimulation.enabled = e > 0 || t > 0),
      (m.value = e.toString()),
      (D.value = t.toString()),
      (f.textContent = e + `ms`),
      (w.textContent = t + `ms`),
      y(e),
      O(t),
      x(),
      M(),
      F());
  }
  function N() {
    for (
      var e = j.latencySimulation.delay, t = j.latencySimulation.jitter, n = 0;
      n < k.length;
      n++
    )
      if (k[n].delay === e && k[n].jitter === t) return n;
    return -1;
  }
  var P = [];
  function F() {
    for (var e = N(), t = 0; t < P.length; t++) Oe(P[t], t === e);
  }
  var I = document.createElement(`div`);
  ((I.style.padding = `12px 12px 0`), (I.style.cursor = `default`));
  var R = r(Ce, `Network simulation`),
    B = document.createElement(`div`);
  ((B.style.cssText = `display:flex;gap:4px`),
    k.forEach(function (e) {
      var t = document.createElement(`button`);
      ((t.type = `button`),
        (t.className = `cds-hit`),
        (t.textContent = e.label),
        (t.title = e.title),
        (t.style.cssText = `flex:1;padding:4px 6px;border:1px solid;border-radius:4px;cursor:pointer;font-size:10px;font-family:inherit;transition:background 0.2s,border-color 0.2s`),
        Oe(t, !1),
        ke(t),
        t.addEventListener(`click`, function (t) {
          (t.stopPropagation(), ee(e.delay, e.jitter));
        }),
        P.push(t),
        B.appendChild(t));
    }),
    I.appendChild(R),
    I.appendChild(B),
    t.insertBefore(I, u),
    F(),
    t.appendChild(n()));
  var V = document.createElement(`div`);
  ((V.style.padding = `12px`), (V.style.cursor = `default`));
  var ne = r(xe, `Auth token`),
    re = document.createElement(`div`);
  ((re.textContent = `None`),
    (re.style.cssText = `color:#666;font-size:11px;font-style:italic`));
  var H = document.createElement(`div`);
  H.style.cssText = `display:flex;gap:4px;align-items:center;margin-bottom:6px`;
  var U = document.createElement(`div`);
  U.style.cssText = `flex:1;min-width:0;font-family:monospace;font-size:10px;color:#ddd;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);border-radius:4px;padding:4px 6px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;cursor:pointer`;
  var W = document.createElement(`button`);
  ((W.type = `button`),
    (W.className = `cds-hit`),
    (W.title = `Copy token`),
    (W.style.cssText = `flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;padding:0;border:1px solid rgba(255,255,255,0.2);border-radius:4px;background:rgba(255,255,255,0.05);color:#fff;cursor:pointer;transition:background 0.2s,border-color 0.2s`));
  var ce = De(Se, 13);
  ((W.innerHTML = ce), H.appendChild(U), H.appendChild(W));
  var G = document.createElement(`button`);
  ((G.type = `button`),
    (G.className = `cds-hit`),
    (G.textContent = `Clear token`),
    (G.style.cssText = `width:100%;padding:5px 8px;border:1px solid rgba(239,68,68,0.5);border-radius:4px;background:rgba(239,68,68,0.2);color:#ef4444;font-size:11px;font-family:inherit;cursor:pointer;transition:background 0.2s,border-color 0.2s`),
    V.appendChild(ne),
    V.appendChild(re),
    V.appendChild(H),
    V.appendChild(G));
  var le = null;
  function ue() {
    var e = null;
    if (
      (A.forEach(function (t) {
        !e && t.token && (e = t.token);
      }),
      e)
    )
      return e;
    try {
      return localStorage.getItem(`colyseus-auth-token`);
    } catch {
      return null;
    }
  }
  function de(e) {
    return e.length > 22 ? e.slice(0, 12) + `…` + e.slice(-8) : e;
  }
  function fe() {
    var e = ue();
    le = e;
    var t = !!e;
    ((re.style.display = t ? `none` : `block`),
      (H.style.display = t ? `flex` : `none`),
      (G.style.display = t ? `block` : `none`),
      e && ((U.textContent = de(e)), (U.title = e)));
  }
  fe();
  var pe = null;
  function me() {
    ((W.innerHTML = `<span style="display:inline-flex;align-items:center;justify-content:center;width:13px;height:13px;color:#22c55e;font-size:12px;">✓</span>`),
      (W.style.borderColor = `rgba(34,197,94,0.6)`),
      pe && clearTimeout(pe),
      (pe = setTimeout(function () {
        ((W.innerHTML = ce), (W.style.borderColor = `rgba(255,255,255,0.2)`));
      }, 1e3)));
  }
  function he() {
    if (le)
      try {
        var e = navigator.clipboard && navigator.clipboard.writeText(le);
        e && e.then ? e.then(me, me) : me();
      } catch {
        me();
      }
  }
  (W.addEventListener(`mouseenter`, function () {
    W.style.background = `rgba(255,255,255,0.15)`;
  }),
    W.addEventListener(`mouseleave`, function () {
      W.style.background = `rgba(255,255,255,0.05)`;
    }),
    W.addEventListener(`click`, function (e) {
      (e.stopPropagation(), he());
    }),
    U.addEventListener(`click`, function (e) {
      (e.stopPropagation(), he());
    }),
    G.addEventListener(`mouseenter`, function () {
      ((G.style.background = `rgba(239,68,68,0.35)`),
        (G.style.borderColor = `rgba(239,68,68,0.7)`));
    }),
    G.addEventListener(`mouseleave`, function () {
      ((G.style.background = `rgba(239,68,68,0.2)`),
        (G.style.borderColor = `rgba(239,68,68,0.5)`));
    }),
    G.addEventListener(`click`, function (e) {
      (e.stopPropagation(),
        A.forEach(function (e) {
          e.token && e.signOut();
        }));
      try {
        localStorage.removeItem(`colyseus-auth-token`);
      } catch {}
      fe();
    }),
    t.appendChild(V),
    t.appendChild(n()));
  var ge = document.createElement(`div`);
  ge.style.cssText = `display:flex;align-items:stretch;gap:8px;padding:12px;cursor:default`;
  var _e = [
      { value: `top-left`, label: `Top left` },
      { value: `top-right`, label: `Top right` },
      { value: `bottom-left`, label: `Bottom left` },
      { value: `bottom-right`, label: `Bottom right` },
    ],
    ve = document.createElement(`div`);
  ((ve.style.cssText = `flex:1;min-width:0;display:flex;flex-direction:column`),
    ve.appendChild(r(ye, `Position`)));
  var we = document.createElement(`div`);
  we.style.cssText = `flex:1;display:grid;grid-template-columns:1fr 1fr;grid-auto-rows:minmax(32px, 1fr);gap:4px`;
  var Te = [];
  function Ee() {
    for (var e = 0; e < Te.length; e++)
      Oe(Te[e], Te[e].dataset.value === j.panelPosition.position);
  }
  (_e.forEach(function (e) {
    var t = document.createElement(`button`);
    ((t.type = `button`),
      (t.className = `cds-hit`),
      (t.dataset.value = e.value),
      (t.title = e.label),
      t.setAttribute(`aria-label`, e.label),
      (t.style.cssText = `position:relative;padding:0;border:1px solid;border-radius:4px;cursor:pointer;transition:background 0.2s,border-color 0.2s`));
    var n = document.createElement(`span`);
    ((n.style.cssText =
      `position:absolute;width:10px;height:6px;border-radius:2px;background:currentColor;` +
      i(e.value) +
      `:6px;` +
      a(e.value) +
      `:6px`),
      t.appendChild(n),
      Oe(t, !1),
      ke(t),
      t.addEventListener(`click`, function (t) {
        (t.stopPropagation(),
          (j.panelPosition.position = e.value),
          M(),
          v(),
          Ee());
      }),
      Te.push(t),
      we.appendChild(t));
  }),
    ve.appendChild(we),
    Ee());
  var K = document.createElement(`div`);
  ((K.style.cssText = `flex:1;min-width:0;display:flex;flex-direction:column`),
    K.appendChild(r(be, `Visibility`)));
  var q = document.createElement(`button`);
  ((q.type = `button`),
    (q.className = `cds-hit`),
    (q.title = `Hide the dev tools until you reload the page`),
    (q.style.cssText = `flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;padding:6px 8px;border:1px solid rgba(255,255,255,0.2);border-radius:4px;background:rgba(255,255,255,0.05);color:#fff;font-size:10px;line-height:1.3;text-align:center;font-family:inherit;cursor:pointer;transition:background 0.2s,border-color 0.2s`),
    (q.innerHTML = De(be, 14) + `<span>Hide for this session</span>`),
    q.addEventListener(`mouseenter`, function () {
      ((q.style.background = `rgba(255, 255, 255, 0.15)`),
        (q.style.borderColor = `rgba(255, 255, 255, 0.3)`));
    }),
    q.addEventListener(`mouseleave`, function () {
      ((q.style.background = `rgba(255, 255, 255, 0.05)`),
        (q.style.borderColor = `rgba(255, 255, 255, 0.2)`));
    }),
    q.addEventListener(`click`, function (e) {
      (e.stopPropagation(), Ne(!1), se());
    }),
    K.appendChild(q),
    ge.appendChild(ve),
    ge.appendChild(K),
    t.appendChild(ge));
  var J = document.createElement(`div`);
  ((J.style.cssText = `padding:0 12px 12px;font-size:10px;line-height:1.4;color:#666`),
    (J.innerHTML = `Remove <code style="background:rgba(255,255,255,0.08);padding:1px 4px;border-radius:3px;font-family:monospace;">debug.js</code> from your HTML to disable this UI.`),
    t.appendChild(J),
    L().appendChild(t));
  var Me = !1,
    Y = null;
  function Ne(e) {
    ((Me = e),
      (t.style.display = e ? `block` : `none`),
      oe(e),
      e
        ? (l(), fe(), (Y = setInterval(l, 1e3)))
        : (Y &&= (clearInterval(Y), null)));
  }
  var X = null,
    Pe = !1,
    Fe = { x: 0, y: 0 };
  function Ie(t) {
    e.style.transform = t ? `scale(0.92)` : ``;
  }
  function Le() {
    ((X &&= (clearTimeout(X), null)), Ie(!1));
  }
  (e.addEventListener(`pointerdown`, function (e) {
    b() &&
      !X &&
      ((Pe = !1),
      (Fe = { x: e.clientX, y: e.clientY }),
      Ie(!0),
      (X = setTimeout(function () {
        ((X = null), (Pe = !0), Ie(!1), Ne(!0));
      }, Ae)));
  }),
    e.addEventListener(`pointermove`, function (e) {
      X &&
        (Math.abs(e.clientX - Fe.x) > je || Math.abs(e.clientY - Fe.y) > je) &&
        Le();
    }),
    e.addEventListener(`pointerup`, Le),
    e.addEventListener(`pointerleave`, Le),
    e.addEventListener(`pointercancel`, function () {
      (Le(), (Pe = !1));
    }),
    e.addEventListener(`contextmenu`, function (e) {
      e.preventDefault();
    }),
    e.addEventListener(`click`, function (e) {
      if ((e.stopPropagation(), !b())) {
        Ne(!Me);
        return;
      }
      if (Pe) {
        Pe = !1;
        return;
      }
      if (Me) {
        Ne(!1);
        return;
      }
      ae(!ie());
    }),
    document.addEventListener(`click`, function (n) {
      var r =
          typeof n.composedPath == `function` ? n.composedPath() : [n.target],
        i = r.indexOf(t) !== -1,
        a = r.indexOf(e) !== -1;
      Me && !i && !a && Ne(!1);
    }));
}
var Y = [],
  Ne = 1e4;
function X(e) {
  if (!e) return;
  let t = Y.indexOf(e);
  (t > -1 && Y.splice(t, 1), Y.push(e));
  var n = L();
  Y.forEach((e, t) => {
    n.contains(e) && (e.style.zIndex = (Ne + t).toString());
  });
}
function Pe(e) {
  let t = Y.indexOf(e);
  t > -1 && Y.splice(t, 1);
}
document.addEventListener(`keydown`, function (e) {
  if (e.key === `Escape` && Y.length > 0) {
    let e = Y[Y.length - 1];
    e && L().contains(e) && e.remove();
  }
});
function Fe(e, t) {
  var n = e.querySelectorAll(`.resize-handle`);
  if (b()) {
    ([`top`, `right`, `bottom`, `left`].forEach(function (t) {
      o(e, t, 0);
    }),
      (e.style.width = `auto`),
      (e.style.height = `auto`),
      (e.style.minWidth = `0`),
      (e.style.minHeight = `0`),
      (e.style.maxWidth = `none`),
      (e.style.maxHeight = `none`),
      (e.style.transform = `none`),
      (e.style.borderRadius = `0`),
      n.forEach(function (e) {
        e.style.display = `none`;
      }));
    return;
  }
  ((e.style.right = `auto`),
    (e.style.bottom = `auto`),
    (e.style.borderRadius = `8px`),
    (e.style.width = t.width || ``),
    (e.style.height = t.height || ``),
    (e.style.minWidth = t.minWidth || ``),
    (e.style.minHeight = t.minHeight || ``),
    (e.style.maxWidth = t.maxWidth || ``),
    t.maxHeight ? c(e, t.maxHeight) : (e.style.maxHeight = ``),
    (e.style.top = t.top || `50%`),
    (e.style.left = t.left || `50%`),
    (e.style.transform = t.transform || `translate(-50%, -50%)`),
    n.forEach(function (e) {
      e.style.display = ``;
    }));
}
function Ie(e) {
  var t = e || {},
    n = document.createElement(`div`);
  (t.id && (n.id = t.id),
    (n.className = `cds-surface`),
    (n.style.position = `fixed`),
    (n.style.backgroundColor = t.backgroundColor || `#1e1e1e`),
    (n.style.boxShadow = `0 8px 32px rgba(0, 0, 0, 0.5)`),
    (n.style.color = `#fff`),
    (n.style.fontFamily = `system-ui, -apple-system, sans-serif`),
    (n.style.zIndex = Ne.toString()),
    (n.style.display = `flex`),
    (n.style.flexDirection = `column`),
    (n.style.overflow = `hidden`),
    Fe(n, t));
  var r = b(),
    i = y(function (e) {
      e.compact !== r && ((r = e.compact), Fe(n, t));
    });
  (n.addEventListener(`pointerdown`, function (e) {
    X(n);
  }),
    X(n));
  var a = n.remove.bind(n);
  return (
    (n.remove = function () {
      if ((Pe(n), i(), t.room && t.trackOnLeave && t.onLeaveCallback)) {
        var e = t.onLeaveCallback.current || t.onLeaveCallback;
        t.room.onLeave.remove(e);
      }
      (t.onRemove && t.onRemove(), a());
    }),
    n
  );
}
function Le(e) {
  var t = e || {},
    n = document.createElement(`div`);
  ((n.style.display = `flex`),
    (n.style.justifyContent = `space-between`),
    (n.style.alignItems = `center`),
    (n.style.padding = t.padding || `8px`),
    (n.style.borderBottom = `1px solid rgba(255, 255, 255, 0.15)`),
    (n.style.paddingBottom = t.paddingBottom || `4px`),
    (n.style.marginBottom = t.marginBottom || `6px`),
    (n.style.cursor = t.draggable !== !1 && !b() ? `move` : `default`),
    (n.style.userSelect = `none`),
    (n.style.flexShrink = `0`),
    (n.style.position = `relative`),
    (n.style.zIndex = `1`));
  var r = document.createElement(`div`);
  if (
    ((r.textContent = t.title || ``),
    (r.style.margin = `0`),
    (r.style.fontSize = t.titleSize || `11px`),
    (r.style.fontWeight = `bold`),
    (r.style.fontFamily = t.titleFont || `monospace`),
    (r.style.flex = `1`),
    (r.style.display = `flex`),
    (r.style.alignItems = `center`),
    t.statusDot)
  ) {
    var i = document.createElement(`div`);
    ((i.style.width = `8px`),
      (i.style.height = `8px`),
      (i.style.borderRadius = `50%`),
      (i.style.marginRight = `8px`),
      (i.style.flexShrink = `0`),
      (i.style.transition = `background-color 0.3s`),
      (i.style.backgroundColor = t.statusColor || `#22c55e`),
      r.insertBefore(i, r.firstChild),
      t.statusDotRef && (t.statusDotRef.element = i));
  }
  var a = document.createElement(`button`);
  return (
    (a.className = `cds-hit`),
    (a.innerHTML = we),
    (a.style.background = `none`),
    (a.style.border = `none`),
    (a.style.color = `#fff`),
    (a.style.fontSize = `18px`),
    (a.style.cursor = `pointer`),
    (a.style.padding = `0`),
    (a.style.margin = `auto`),
    (a.style.width = `20px`),
    (a.style.height = `20px`),
    (a.style.display = `flex`),
    (a.style.alignItems = `center`),
    (a.style.justifyContent = `center`),
    (a.style.borderRadius = `4px`),
    (a.style.transition = `background-color 0.2s`),
    (a.style.opacity = `0.6`),
    a.addEventListener(`mouseenter`, function () {
      ((a.style.backgroundColor = `rgba(255, 255, 255, 0.1)`),
        (a.style.opacity = `1`));
    }),
    a.addEventListener(`mouseleave`, function () {
      ((a.style.backgroundColor = `transparent`), (a.style.opacity = `0.6`));
    }),
    a.addEventListener(`click`, function (e) {
      (e.stopPropagation(),
        t.onClose ? t.onClose() : t.modal && t.modal.remove());
    }),
    n.appendChild(r),
    n.appendChild(a),
    { header: n, title: r, closeButton: a }
  );
}
function Re(e, t) {
  var n = null,
    r = 0,
    i = 0;
  t.setAttribute(`data-drag`, ``);
  var a = function (a) {
      if (n === null && (a.pointerType !== `mouse` || a.button === 0) && !b()) {
        var o = e.getBoundingClientRect();
        ((r = a.clientX - o.left),
          (i = a.clientY - o.top),
          (e.style.left = o.left + `px`),
          (e.style.top = o.top + `px`),
          (e.style.transform = `none`),
          (n = a.pointerId),
          t.setPointerCapture(a.pointerId),
          a.preventDefault());
      }
    },
    o = function (t) {
      t.pointerId === n &&
        ((e.style.left = t.clientX - r + `px`),
        (e.style.top = t.clientY - i + `px`));
    },
    s = function (e) {
      e.pointerId === n &&
        (t.hasPointerCapture(e.pointerId) &&
          t.releasePointerCapture(e.pointerId),
        (n = null));
    };
  return (
    t.addEventListener(`pointerdown`, a),
    t.addEventListener(`pointermove`, o),
    t.addEventListener(`pointerup`, s),
    t.addEventListener(`pointercancel`, s),
    function () {
      (t.removeEventListener(`pointerdown`, a),
        t.removeEventListener(`pointermove`, o),
        t.removeEventListener(`pointerup`, s),
        t.removeEventListener(`pointercancel`, s));
    }
  );
}
function ze(e) {
  var t = E.get(e);
  if (!t || !t.room) {
    console.warn(`Room not found for panel:`, e);
    return;
  }
  var n = t.room,
    r = t.messageTypes;
  if (!r) {
    console.warn(`No message types available for this room`);
    return;
  }
  var i = L().getElementById(`debug-send-messages-modal`);
  i && i.remove();
  var a = {},
    o = null,
    s = { current: null };
  let c = () => {
    a.element &&
      (a.element.style.backgroundColor = n.connection?.isOpen
        ? `#22c55e`
        : `#ef4444`);
  };
  ((s.current = c), n.onLeave(c));
  let l = Ie({
      id: `debug-send-messages-modal`,
      width: `400px`,
      minWidth: `300px`,
      maxWidth: `90vw`,
      maxHeight: `90vh`,
      room: n,
      trackOnLeave: !0,
      onLeaveCallback: s,
    }),
    u = Le({
      title: t.roomName + ` - Send Message`,
      modal: l,
      statusDot: !0,
      statusColor: n.connection?.isOpen ? `#22c55e` : `#ef4444`,
      statusDotRef: a,
    });
  (l.appendChild(u.header), Re(l, u.header), c());
  var d = document.createElement(`div`);
  ((d.style.padding = `8px`),
    (d.style.overflowY = `auto`),
    (d.style.backgroundColor = `#1e1e1e`));
  var f = document.createElement(`label`);
  ((f.textContent = `Message Type`),
    (f.style.display = `block`),
    (f.style.fontSize = `11px`),
    (f.style.fontWeight = `600`),
    (f.style.marginBottom = `4px`),
    (f.style.color = `rgba(255, 255, 255, 0.9)`));
  var p = document.createElement(`select`);
  ((p.style.width = `100%`),
    (p.style.padding = `6px 8px`),
    (p.style.backgroundColor = `rgba(255, 255, 255, 0.1)`),
    (p.style.border = `1px solid rgba(255, 255, 255, 0.2)`),
    (p.style.borderRadius = `4px`),
    (p.style.color = `#fff`),
    (p.style.fontSize = `12px`),
    (p.style.cursor = `pointer`),
    (p.style.outline = `none`),
    (p.style.marginBottom = `12px`));
  var m = document.createElement(`option`);
  ((m.value = ``),
    (m.textContent = `Select a message type`),
    (m.disabled = !0),
    (m.selected = !0),
    p.appendChild(m),
    Object.keys(r).forEach(function (e) {
      var t = document.createElement(`option`);
      ((t.value = e),
        (t.style.color = `#000`),
        (t.textContent = e),
        p.appendChild(t));
    }));
  var h = document.createElement(`option`);
  ((h.value = `*`),
    (h.textContent = `* (Custom)`),
    p.appendChild(h),
    d.appendChild(f),
    d.appendChild(p));
  var g = document.createElement(`div`);
  ((g.style.display = `none`), (g.style.marginBottom = `12px`));
  var _ = document.createElement(`label`);
  ((_.textContent = `Message Type`),
    (_.style.display = `block`),
    (_.style.fontSize = `11px`),
    (_.style.fontWeight = `600`),
    (_.style.marginBottom = `4px`),
    (_.style.color = `rgba(255, 255, 255, 0.9)`));
  var v = document.createElement(`input`);
  ((v.type = `text`),
    (v.placeholder = `Enter message type name`),
    (v.style.width = `100%`),
    (v.style.padding = `6px 8px`),
    (v.style.backgroundColor = `rgba(255, 255, 255, 0.05)`),
    (v.style.border = `1px solid rgba(255, 255, 255, 0.2)`),
    (v.style.borderRadius = `4px`),
    (v.style.color = `#fff`),
    (v.style.fontSize = `11px`),
    (v.style.fontFamily = `monospace`),
    (v.style.outline = `none`),
    g.appendChild(_),
    g.appendChild(v),
    d.appendChild(g));
  var y = document.createElement(`div`);
  ((y.style.display = `none`), (y.style.marginBottom = `12px`));
  var b = document.createElement(`label`);
  ((b.textContent = `Payload`),
    (b.style.display = `block`),
    (b.style.fontSize = `11px`),
    (b.style.fontWeight = `600`),
    (b.style.marginBottom = `4px`),
    (b.style.color = `rgba(255, 255, 255, 0.9)`));
  var x = document.createElement(`div`);
  ((x.style.backgroundColor = `rgba(255, 255, 255, 0.05)`),
    (x.style.border = `1px solid rgba(255, 255, 255, 0.2)`),
    (x.style.borderRadius = `4px`),
    (x.style.padding = `8px`),
    (x.style.fontFamily = `monospace`),
    (x.style.fontSize = `11px`));
  var S = document.createElement(`textarea`);
  ((S.style.width = `100%`),
    (S.style.minHeight = `80px`),
    (S.style.padding = `6px 8px`),
    (S.style.backgroundColor = `rgba(255, 255, 255, 0.05)`),
    (S.style.border = `1px solid rgba(255, 255, 255, 0.2)`),
    (S.style.borderRadius = `4px`),
    (S.style.color = `#fff`),
    (S.style.fontSize = `11px`),
    (S.style.fontFamily = `monospace`),
    (S.style.outline = `none`),
    (S.style.resize = `vertical`),
    (S.placeholder = `{}`),
    (S.value = `{}`),
    y.appendChild(b),
    y.appendChild(x),
    y.appendChild(S),
    d.appendChild(y));
  var C = document.createElement(`div`);
  ((C.style.display = `none`),
    (C.style.padding = `6px 8px`),
    (C.style.backgroundColor = `rgba(220, 38, 38, 0.2)`),
    (C.style.border = `1px solid rgba(220, 38, 38, 0.4)`),
    (C.style.borderRadius = `4px`),
    (C.style.marginBottom = `8px`),
    (C.style.fontSize = `11px`),
    (C.style.color = `#fca5a5`),
    d.appendChild(C));
  var w = {},
    T = ``;
  p.addEventListener(`change`, function () {
    var e = p.value;
    if (((T = e), e)) {
      (e === `*`
        ? ((g.style.display = `block`), v.focus())
        : (g.style.display = `none`),
        (y.style.display = `block`),
        (C.style.display = `none`),
        (w = {}),
        (x.innerHTML = ``));
      var t = r[e];
      t && t.properties && Object.keys(t.properties).length > 0
        ? ((S.style.display = `none`),
          (x.style.display = `block`),
          Object.keys(t.properties).forEach(function (e) {
            var n = t.properties[e],
              r = document.createElement(`div`);
            r.style.marginBottom = `8px`;
            var i = document.createElement(`label`);
            ((i.textContent = e),
              t.required && t.required.includes(e) && (i.textContent += ` *`),
              (i.style.display = `block`),
              (i.style.fontSize = `10px`),
              (i.style.marginBottom = `3px`),
              (i.style.color = `rgba(255, 255, 255, 0.8)`));
            var a;
            if (
              (n.type === `boolean`
                ? ((a = document.createElement(`input`)),
                  (a.type = `checkbox`),
                  (a.style.width = `16px`),
                  (a.style.height = `16px`),
                  (a.style.cursor = `pointer`))
                : n.type === `number` || n.type === `integer`
                  ? ((a = document.createElement(`input`)),
                    (a.type = `number`),
                    n.type === `integer` && (a.step = `1`),
                    (a.style.width = `100%`),
                    (a.style.padding = `4px 6px`),
                    (a.style.backgroundColor = `rgba(255, 255, 255, 0.05)`),
                    (a.style.border = `1px solid rgba(255, 255, 255, 0.2)`),
                    (a.style.borderRadius = `3px`),
                    (a.style.color = `#fff`),
                    (a.style.fontSize = `11px`),
                    (a.style.outline = `none`))
                  : ((a = document.createElement(`input`)),
                    (a.type = `text`),
                    (a.style.width = `100%`),
                    (a.style.padding = `4px 6px`),
                    (a.style.backgroundColor = `rgba(255, 255, 255, 0.05)`),
                    (a.style.border = `1px solid rgba(255, 255, 255, 0.2)`),
                    (a.style.borderRadius = `3px`),
                    (a.style.color = `#fff`),
                    (a.style.fontSize = `11px`),
                    (a.style.outline = `none`)),
              n.description)
            ) {
              var o = document.createElement(`div`);
              ((o.textContent = n.description),
                (o.style.fontSize = `9px`),
                (o.style.color = `rgba(255, 255, 255, 0.5)`),
                (o.style.marginTop = `2px`),
                r.appendChild(i),
                r.appendChild(a),
                r.appendChild(o));
            } else (r.appendChild(i), r.appendChild(a));
            (x.appendChild(r), (w[e] = { input: a, schema: n }));
          }))
        : ((S.style.display = `block`),
          (x.style.display = `none`),
          (S.value = `{}`),
          (S.placeholder = t
            ? `{}`
            : `Enter JSON payload (no message format defined)

Example:
{
  "key": "value"
}`));
    } else y.style.display = `none`;
  });
  var D = document.createElement(`button`);
  ((D.textContent = `Send`),
    (D.style.width = `100%`),
    (D.style.padding = `8px 12px`),
    (D.style.backgroundColor = `#8b5cf6`),
    (D.style.border = `none`),
    (D.style.borderRadius = `4px`),
    (D.style.color = `#fff`),
    (D.style.fontSize = `12px`),
    (D.style.fontWeight = `600`),
    (D.style.cursor = `pointer`),
    (D.style.transition = `background-color 0.2s`));
  var O = !1,
    k = `#7c3aed`,
    A = `#8b5cf6`;
  (D.addEventListener(`mouseenter`, function () {
    !O && !D.disabled && (D.style.backgroundColor = k);
  }),
    D.addEventListener(`mouseleave`, function () {
      !O && !D.disabled && (D.style.backgroundColor = A);
    }),
    (o = function () {
      let e = n.connection?.isOpen;
      (a.element &&
        (a.element.style.backgroundColor = e ? `#22c55e` : `#ef4444`),
        (D.disabled = !e),
        e
          ? O ||
            ((D.style.backgroundColor = A),
            (D.style.cursor = `pointer`),
            (D.style.opacity = `1`))
          : ((D.style.backgroundColor = `#6b7280`),
            (D.style.cursor = `not-allowed`),
            (D.style.opacity = `0.5`)));
    }),
    n.onLeave.remove(s.current),
    n.onLeave(o),
    (s.current = o),
    o(),
    D.addEventListener(`click`, function () {
      if (((C.style.display = `none`), !n.connection?.isOpen)) {
        ((C.textContent = `Cannot send message: Room is not connected`),
          (C.style.display = `block`));
        return;
      }
      if (!T) {
        ((C.textContent = `Please select a message type`),
          (C.style.display = `block`));
        return;
      }
      var e = T;
      if (T === `*` && ((e = v.value.trim()), !e)) {
        ((C.textContent = `Please enter a message type name`),
          (C.style.display = `block`));
        return;
      }
      try {
        var t;
        if (Object.keys(w).length > 0) {
          t = {};
          var i = r[T];
          for (var a in w) {
            var o = w[a],
              s = o.input,
              c = o.schema,
              l =
                c.type === `boolean`
                  ? s.checked
                  : c.type === `number` || c.type === `integer`
                    ? s.value
                      ? parseFloat(s.value)
                      : void 0
                    : s.value || void 0;
            (l !== void 0 || (i.required && i.required.includes(a))) &&
              (t[a] = l);
          }
        } else t = JSON.parse(S.value);
        (n.send(e, t),
          (O = !0),
          (D.textContent = `Message sent!`),
          (D.style.backgroundColor = `#22c55e`),
          (D.style.cursor = `default`),
          setTimeout(function () {
            ((O = !1),
              (D.textContent = `Send`),
              (D.style.backgroundColor = A),
              (D.style.cursor = `pointer`));
          }, 800));
      } catch (e) {
        ((C.textContent = `Error: ` + e.message), (C.style.display = `block`));
      }
    }),
    d.appendChild(D),
    l.appendChild(d),
    L().appendChild(l));
}
var Z = {
    string: `#CE9178`,
    number: `#B5CEA8`,
    boolean: `#569CD6`,
    nullish: `#858585`,
  },
  Be = `#DCDCAA`,
  Ve = 200,
  He = class {
    container;
    getState;
    expandedPaths = new Set([`root`]);
    refIds = new Map();
    nextRefId = 1;
    valueIndex = new Map();
    fullRenderTimer = null;
    lastFullRender = 0;
    dirty = !1;
    constructor(e, t) {
      ((this.container = e),
        (this.getState = t),
        this.container.addEventListener(`click`, (e) => {
          let t = e.target.closest(`[data-expand-button]`);
          t && (e.stopPropagation(), this.toggleExpand(t));
        }),
        document.addEventListener(`visibilitychange`, this.onVisibilityChange));
    }
    dispose() {
      (document.removeEventListener(
        `visibilitychange`,
        this.onVisibilityChange,
      ),
        (this.fullRenderTimer &&= (clearTimeout(this.fullRenderTimer), null)));
    }
    onVisibilityChange = () => {
      !document.hidden && this.dirty && ((this.dirty = !1), this.render());
    };
    render() {
      ((this.fullRenderTimer &&= (clearTimeout(this.fullRenderTimer), null)),
        (this.lastFullRender = Date.now()),
        (this.refIds = new Map()),
        (this.nextRefId = 1));
      let e;
      try {
        e = this.renderNode(this.getState() || {});
      } catch (e) {
        ((this.container.innerHTML =
          `<div style="color: #e74856; padding: 20px;">Error accessing room state: ` +
          Q(e.message) +
          `</div>`),
          (this.valueIndex = new Map()));
        return;
      }
      ((this.container.innerHTML =
        `<div style="font-family: 'Consolas', 'Monaco', 'Courier New', monospace; font-size: 12px; line-height: 1.5; color: #d4d4d4; padding: 8px;">` +
        e +
        `</div>`),
        this.buildValueIndex());
    }
    applyChanges(e) {
      if (document.hidden) {
        this.dirty = !0;
        return;
      }
      if (this.dirty) {
        ((this.dirty = !1), this.render());
        return;
      }
      if (this.fullRenderTimer) return;
      let t = this.collectPatches(e);
      if (t === null) {
        this.scheduleFullRender();
        return;
      }
      for (let e = 0; e < t.length; e++) this.applyPatch(t[e]);
    }
    collectPatches(e) {
      let t = [];
      for (let n = 0; n < e.length; n++) {
        let r = e[n];
        if (!Ke(r.value)) return null;
        let i = this.refIds.get(r.ref);
        if (i === void 0) return null;
        let a = r.field === void 0 ? r.dynamicIndex : r.field,
          o = this.valueIndex.get(i + `|` + String(a));
        if (!o || o.length === 0) return null;
        t.push({ els: o, value: r.value });
      }
      return t;
    }
    applyPatch(e) {
      let t = Xe(e.value);
      for (let n = 0; n < e.els.length; n++) {
        let r = e.els[n];
        ((r.textContent = t.text), (r.style.color = t.color));
      }
    }
    scheduleFullRender() {
      if (this.fullRenderTimer) return;
      let e = Math.max(0, Ve - (Date.now() - this.lastFullRender));
      e === 0
        ? this.render()
        : (this.fullRenderTimer = setTimeout(() => {
            ((this.fullRenderTimer = null), this.render());
          }, e));
    }
    buildValueIndex() {
      this.valueIndex = new Map();
      let e = this.container.querySelectorAll(`[data-vk]`);
      for (let t = 0; t < e.length; t++) {
        let n = e[t],
          r = n.getAttribute(`data-vk`);
        if (r === null) continue;
        let i = this.valueIndex.get(r);
        i ? i.push(n) : this.valueIndex.set(r, [n]);
      }
    }
    localIdFor(e) {
      let t = this.refIds.get(e);
      return (
        t === void 0 && ((t = this.nextRefId++), this.refIds.set(e, t)),
        t
      );
    }
    toggleExpand(e) {
      let t = e.nextElementSibling,
        n = e.querySelector(`[data-expand-icon]`);
      if (!t || !t.style) return;
      let r = t.style.display === `none`;
      ((t.style.display = r ? `block` : `none`),
        n && (n.textContent = r ? `▼` : `▶`));
      let i = e.closest(`[data-path]`);
      if (i) {
        let e = i.getAttribute(`data-path`);
        e !== null &&
          (r ? this.expandedPaths.add(e) : this.expandedPaths.delete(e));
      }
    }
    renderNode(e, t = 0, n = ``, r = ``, i = null, a = null) {
      if (t > 10)
        return `<span style="color: #858585; font-style: italic;">[Max depth reached]</span>`;
      if (e == null) return Ze(e, a);
      let o = typeof e;
      if (o === `string` || o === `number` || o === `boolean`) return Ze(e, a);
      let s = t * 6,
        c = r ? r + `.` + (n || ``) : n || `root`,
        l = this.expandedPaths.has(c);
      if (typeof e.forEach == `function`) {
        let n = e.size || e.length || null,
          r = n === null ? `?` : n,
          a = this.localIdFor(e),
          o = Je(t, l),
          u = i === null ? (o.isRoot ? `State` : ``) : i,
          d =
            `<div style="margin-left: ` + s + `px;" data-path="` + Ue(c) + `">`;
        ((d += Ye(o, u, r)),
          (d += `<div style="display: ` + o.initialDisplay + `;">`));
        let f =
          e instanceof Set || (e.constructor && e.constructor.name === `Set`);
        try {
          e.forEach((e, n) => {
            if (f) d += this.renderNode(e, t + 1, String(n), c);
            else {
              let r = typeof n == `number` ? `[` + String(n) + `]` : String(n);
              d += this.renderKeyValue(
                n,
                e,
                t + 1,
                c,
                r,
                typeof n == `string`,
                a,
              );
            }
          });
        } catch (e) {
          let n = (t + 1) * 6;
          d +=
            `<div style="margin-left: ` +
            n +
            `px; color: #e74856;">Error iterating: ` +
            Q(e.message) +
            `</div>`;
        }
        return ((d += `</div></div>`), d);
      }
      if (o === `object`) {
        let n = We(e),
          r = this.localIdFor(e),
          a = Je(t, l),
          o = i === null ? (a.isRoot ? `state` : ``) : i,
          u =
            `<div style="margin-left: ` + s + `px;" data-path="` + Ue(c) + `">`;
        if (n.length === 0)
          u += o
            ? `<span style="color: ` +
              qe(o) +
              `;">` +
              Q(String(o)) +
              `</span><span style="color: #858585;"> {}</span>`
            : `<span style="color: #858585;">{}</span>`;
        else {
          ((u += Ye(a, o, null)),
            (u += `<div style="display: ` + a.initialDisplay + `;">`));
          for (let i = 0; i < n.length; i++) {
            let a = n[i];
            a !== `~refId` &&
              (u += this.renderKeyValue(a, e[a], t + 1, c, a, !1, r));
          }
          u += `</div>`;
        }
        return ((u += `</div>`), u);
      }
      return Ze(e, a);
    }
    renderKeyValue(e, t, n, r, i, a, o) {
      if (Ge(t))
        return i === null
          ? this.renderNode(t, n, String(e), r)
          : this.renderNode(t, n, String(e), r, i);
      let s = n * 6,
        c = o + `|` + String(e),
        l = `<div style="margin-left: ` + s + `px; padding-left: 14px;">`;
      if (i !== null) {
        let e = a ? Z.string : Be,
          t = a ? `"` + Q(String(i)) + `"` : Q(String(i));
        l +=
          `<span style="color: ` +
          e +
          `;">` +
          t +
          `</span><span style="color: #858585;">: </span>`;
      } else
        l +=
          `<span style="color: #DCDCAA;">` +
          Q(String(e)) +
          `</span><span style="color: #858585;">: </span>`;
      return (
        (l += this.renderNode(t, n + 1, String(e), r, null, c)),
        (l += `</div>`),
        l
      );
    }
  };
function Q(e) {
  let t = document.createElement(`div`);
  return ((t.textContent = e), t.innerHTML);
}
function Ue(e) {
  return String(e)
    .replace(/&/g, `&amp;`)
    .replace(/"/g, `&quot;`)
    .replace(/</g, `&lt;`)
    .replace(/>/g, `&gt;`);
}
function We(e) {
  return r.isSchema(e)
    ? Object.keys(n.getFields(e.constructor))
    : Object.keys(e);
}
function Ge(e) {
  if (e == null) return !1;
  let t = typeof e,
    n = t === `object` && !(e instanceof Array),
    r = t === `object` && typeof e.forEach == `function`,
    i = e instanceof Array;
  return n || i || r;
}
function Ke(e) {
  if (e === null) return !0;
  let t = typeof e;
  return t === `string` || t === `number` || t === `boolean`;
}
function qe(e) {
  return typeof e == `string` && e.startsWith(`"`) ? Z.string : Be;
}
function Je(e, t) {
  let n = e === 0;
  return {
    isRoot: n,
    initialDisplay: n || t ? `block` : `none`,
    initialIcon: n || t ? `▼` : `▶`,
    rootClass: n ? ` data-root-node="true"` : ``,
  };
}
function Ye(e, t, n) {
  let r = e.isRoot ? `default` : `pointer`,
    i = e.isRoot ? `` : `this.style.backgroundColor='rgba(255,255,255,0.05)'`,
    a = e.isRoot ? `` : `this.style.backgroundColor='transparent'`,
    o =
      `<div data-expand-button` +
      e.rootClass +
      ` style="display: flex; align-items: center; cursor: ` +
      r +
      `; user-select: none; margin: 0; padding: 1px 0;" onmouseover="` +
      i +
      `" onmouseout="` +
      a +
      `">`;
  return (
    (o +=
      `<span data-expand-icon style="margin-right: 4px; color: #858585; font-size: 10px; width: 10px; display: inline-block; text-align: center; user-select: none;">` +
      e.initialIcon +
      `</span>`),
    t &&
      (o += `<span style="color: ` + qe(t) + `;">` + Q(String(t)) + `</span>`),
    n != null &&
      n !== `?` &&
      (o += ` <span style="color: #858585;">(` + n + `) </span>`),
    (o += `</div>`),
    o
  );
}
function Xe(e) {
  if (e === null) return { text: `null`, color: Z.nullish };
  if (e === void 0) return { text: `undefined`, color: Z.nullish };
  switch (typeof e) {
    case `string`:
      return { text: `"` + e + `"`, color: Z.string };
    case `number`:
      return { text: String(e), color: Z.number };
    case `boolean`:
      return { text: String(e), color: Z.boolean };
    default:
      return { text: String(e), color: Z.nullish };
  }
}
function Ze(e, t) {
  let n = Xe(e);
  return (
    `<span` +
    (t === null ? `` : ` data-vk="` + Ue(t) + `" data-kind="value"`) +
    ` style="color: ` +
    n.color +
    `;">` +
    Q(n.text) +
    `</span>`
  );
}
function Qe(e) {
  var t = E.get(e);
  if (!t || !t.room) {
    console.warn(`Room not found for panel:`, e);
    return;
  }
  var n = t.room,
    r = L().getElementById(`debug-state-inspector-modal`);
  r && r.remove();
  var i = null;
  try {
    var a = localStorage.getItem(`colyseus-state-inspector-preferences`);
    a && (i = JSON.parse(a));
  } catch {}
  var o = 600,
    s = 500,
    c = `50%`,
    l = `50%`,
    u = `translate(-50%, -50%)`;
  if (
    i &&
    (i.width && i.width >= 300 && (o = i.width),
    i.height && i.height >= 200 && (s = i.height),
    i.left !== void 0 && i.top !== void 0)
  ) {
    var d = window.innerWidth - o,
      f = window.innerHeight - s,
      p = Math.max(0, Math.min(i.left, d)),
      m = Math.max(0, Math.min(i.top, f));
    ((c = p + `px`), (l = m + `px`), (u = `none`));
  }
  function h() {
    try {
      var e = y.getBoundingClientRect(),
        t = { width: e.width, height: e.height, left: e.left, top: e.top };
      localStorage.setItem(
        `colyseus-state-inspector-preferences`,
        JSON.stringify(t),
      );
    } catch {}
  }
  var g = {};
  let _ = () => {
    g.element &&
      (g.element.style.backgroundColor = n.connection?.isOpen
        ? `#22c55e`
        : `#ef4444`);
  };
  n.onLeave(_);
  let v = {
      id: `debug-state-inspector-modal`,
      width: o + `px`,
      height: s + `px`,
      minWidth: `300px`,
      minHeight: `200px`,
      maxWidth: `90vw`,
      maxHeight: `90vh`,
      top: l,
      left: c,
      transform: u,
      room: n,
      trackOnLeave: !0,
      onLeaveCallback: _,
    },
    y = Ie(v),
    S = Le({
      title: `${t.roomName} - State Viewer`,
      modal: y,
      statusDot: !0,
      statusColor: n.connection?.isOpen ? `#22c55e` : `#ef4444`,
      statusDotRef: g,
    }),
    C = S.header,
    w = S.closeButton;
  (y.appendChild(C), _());
  var T = document.createElement(`div`);
  ((T.style.padding = `8px`),
    (T.style.overflowY = `auto`),
    (T.style.flex = `1`),
    (T.style.minHeight = `0`),
    (T.style.backgroundColor = `#1e1e1e`),
    (T.id = `debug-state-content`));
  var D = new He(T, function () {
    return n.state || {};
  });
  D.render();
  let O = n.serializer.decoder.triggerChanges;
  ((n.serializer.decoder.triggerChanges = function (e) {
    (O?.apply(this, arguments), D.applyChanges(e));
  }),
    y.appendChild(T),
    L().appendChild(y));
  var k = !1,
    A = 0,
    j = 0,
    ee = 0,
    M = 0,
    N = !1,
    P = null,
    F = 0,
    I = 0,
    R = 0,
    te = 0,
    z = 0,
    B = 0;
  (C.setAttribute(`data-drag`, ``),
    C.addEventListener(`pointerdown`, function (e) {
      if (b()) return;
      let t = e.target;
      if (
        !(t.classList && t.classList.contains(`resize-handle`)) &&
        !(t === w || w.contains(t))
      ) {
        ((k = !0), (A = e.clientX), (j = e.clientY));
        var n = y.getBoundingClientRect();
        ((ee = n.left),
          (M = n.top),
          (y.style.cursor = `move`),
          C.setPointerCapture(e.pointerId),
          e.preventDefault());
      }
    }));
  var V = function (e) {
    if (N && P) {
      var t = e.clientX - F,
        n = e.clientY - I,
        r = R,
        i = te,
        a = z,
        o = B;
      (P.includes(`e`) && (r = R + t),
        P.includes(`w`) && ((r = R - t), (a = z + t)),
        P.includes(`s`) && (i = te + n),
        P.includes(`n`) && ((i = te - n), (o = B + n)),
        (r = Math.max(
          parseInt(y.style.minWidth) || 300,
          Math.min(r, window.innerWidth - a),
        )),
        (i = Math.max(
          parseInt(y.style.minHeight) || 200,
          Math.min(i, window.innerHeight - o),
        )),
        (y.style.width = r + `px`),
        (y.style.height = i + `px`),
        (y.style.left = a + `px`),
        (y.style.top = o + `px`),
        (y.style.transform = `none`));
    } else if (k) {
      var t = e.clientX - A,
        n = e.clientY - j,
        s = ee + t,
        c = M + n,
        l = window.innerWidth - y.offsetWidth,
        u = window.innerHeight - y.offsetHeight;
      ((s = Math.max(0, Math.min(s, l))),
        (c = Math.max(0, Math.min(c, u))),
        (y.style.left = s + `px`),
        (y.style.top = c + `px`),
        (y.style.transform = `none`));
    }
  };
  document.addEventListener(`pointermove`, V);
  var ne = function () {
    (k && ((k = !1), (y.style.cursor = ``), h()),
      N && ((N = !1), (P = null), h()));
  };
  (document.addEventListener(`pointerup`, ne),
    document.addEventListener(`pointercancel`, ne));
  var re = x() ? 12 : 8,
    H = x() ? 20 : 12;
  ([`n`, `s`, `e`, `w`].forEach(function (e) {
    var t = document.createElement(`div`);
    ((t.className = `resize-handle resize-` + e),
      (t.style.position = `absolute`),
      (t.style.backgroundColor = `transparent`),
      (t.style.zIndex = `10000`),
      (t.style.pointerEvents = `auto`),
      e === `n` || e === `s`
        ? ((t.style.height = re + `px`),
          (t.style.left = H + `px`),
          (t.style.right = H + `px`),
          e === `n`
            ? ((t.style.top = `0`), (t.style.cursor = `n-resize`))
            : ((t.style.bottom = `0`), (t.style.cursor = `s-resize`)))
        : ((t.style.width = re + `px`),
          (t.style.top = H + `px`),
          (t.style.bottom = H + `px`),
          e === `e`
            ? ((t.style.right = `0`), (t.style.cursor = `e-resize`))
            : ((t.style.left = `0`), (t.style.cursor = `w-resize`))),
      t.addEventListener(`pointerdown`, function (n) {
        (n.stopPropagation(),
          n.preventDefault(),
          (N = !0),
          (P = e),
          (F = n.clientX),
          (I = n.clientY));
        var r = y.getBoundingClientRect();
        ((R = r.width),
          (te = r.height),
          (z = r.left),
          (B = r.top),
          t.setPointerCapture(n.pointerId));
      }),
      y.appendChild(t));
  }),
    [`nw`, `ne`, `sw`, `se`].forEach(function (e) {
      var t = document.createElement(`div`);
      ((t.className = `resize-handle resize-` + e),
        (t.style.position = `absolute`),
        (t.style.backgroundColor = `transparent`),
        (t.style.zIndex = `10002`),
        (t.style.pointerEvents = `auto`),
        (t.style.width = H + `px`),
        (t.style.height = H + `px`),
        e === `nw`
          ? ((t.style.top = `0`),
            (t.style.left = `0`),
            (t.style.cursor = `nw-resize`))
          : e === `ne`
            ? ((t.style.top = `0`),
              (t.style.right = `0`),
              (t.style.cursor = `ne-resize`))
            : e === `sw`
              ? ((t.style.bottom = `0`),
                (t.style.left = `0`),
                (t.style.cursor = `sw-resize`))
              : e === `se` &&
                ((t.style.bottom = `0`),
                (t.style.right = `0`),
                (t.style.cursor = `se-resize`)),
        t.addEventListener(`pointerdown`, function (n) {
          (n.stopPropagation(),
            n.preventDefault(),
            (N = !0),
            (P = e),
            (F = n.clientX),
            (I = n.clientY));
          var r = y.getBoundingClientRect();
          ((R = r.width),
            (te = r.height),
            (z = r.left),
            (B = r.top),
            t.setPointerCapture(n.pointerId));
        }),
        y.appendChild(t));
    }),
    Fe(y, v));
  var U = y.remove;
  y.remove = function () {
    ((n.serializer.decoder.triggerChanges = O),
      D.dispose(),
      document.removeEventListener(`pointermove`, V),
      document.removeEventListener(`pointerup`, ne),
      document.removeEventListener(`pointercancel`, ne),
      U.call(this));
  };
}
function $e() {
  if (!de()) {
    var e = document.createElement(`div`);
    ((e.id = `debug-logo-container`),
      (e.className = `cds-surface`),
      (e.style.position = `fixed`),
      (e.style.zIndex = `1000`),
      (e.style.width = `21px`),
      (e.style.height = `21px`),
      (e.style.backgroundColor = `rgba(0, 0, 0, 0.7)`),
      (e.style.border = `3px solid ` + z(j.latencySimulation.delay, 0.7)),
      (e.style.borderRadius = `50%`),
      (e.style.padding = `10px`),
      (e.style.boxSizing = `content-box`),
      (e.style.display = `flex`),
      (e.style.justifyContent = `center`),
      (e.style.alignItems = `center`),
      (e.style.boxShadow = `0 2px 8px rgba(0, 0, 0, 0.3)`),
      (e.style.transition = `border-color 0.3s ease, background-color 0.3s ease, transform 0.12s ease`),
      (e.style.cursor = `pointer`),
      B(),
      e.addEventListener(`mouseenter`, function () {
        ((e.style.backgroundColor = `rgba(0, 0, 0, 0.9)`),
          (e.style.borderColor = z(j.latencySimulation.delay, 0.9)));
      }),
      e.addEventListener(`mouseleave`, function () {
        ((e.style.backgroundColor = `rgba(0, 0, 0, 0.7)`),
          (e.style.borderColor = z(j.latencySimulation.delay, 0.7)));
      }));
    var t = document.createElement(`div`);
    ((t.style.width = `100%`),
      (t.style.height = `100%`),
      (t.style.display = `flex`),
      (t.style.justifyContent = `center`),
      (t.style.alignItems = `center`),
      t.insertAdjacentHTML(`beforeend`, fe),
      e.appendChild(t),
      L().appendChild(e),
      Me(e),
      B(),
      rt(),
      nt());
  }
}
function et(t, n) {
  var r = L().getElementById(`debug-panel-` + t);
  if (r) return r;
  var i = document.createElement(`div`);
  ((i.id = `debug-panel-` + t),
    (i.className = `cds-surface`),
    (i.style.backgroundColor = `rgba(0, 0, 0, 0.85)`),
    (i.style.color = `#fff`),
    (i.style.padding = `8px`),
    (i.style.borderRadius = `6px`),
    (i.style.fontFamily = `monospace`),
    (i.style.fontSize = `11px`),
    (i.style.minWidth = `180px`),
    (i.style.pointerEvents = `auto`),
    (i.style.flexShrink = `0`),
    (i.style.boxShadow = `0 4px 12px rgba(0, 0, 0, 0.5)`),
    (i.style.display = de() ? `none` : `block`));
  var a = document.createElement(`div`);
  ((a.id = `debug-title-` + t),
    (a.className = `debug-title`),
    (a.style.fontWeight = `bold`),
    (a.style.borderBottom = `1px solid rgba(255, 255, 255, 0.15)`),
    (a.style.paddingBottom = `4px`),
    (a.style.display = `flex`),
    (a.style.alignItems = `center`),
    (a.style.justifyContent = `space-between`),
    (a.style.gap = `8px`),
    (a.style.position = `relative`),
    (a.innerHTML =
      `<span id="debug-title-text-` +
      t +
      `"><span class="debug-room-name"></span><span class="debug-info-icon" style="display: inline-flex; align-items: center; margin-left: 4px; cursor: pointer; opacity: 0.6; vertical-align: middle;">` +
      Ee(ve, 10) +
      `</span></span><span style="display:flex;align-items:center;gap:8px;font-weight:normal"><span id="debug-ping-` +
      t +
      `" style="font-size: 10px; color: #888;" title="Ping time">--</span><span class="debug-chevron" style="color:#888;display:none">▾</span></span>`));
  var o = document.createElement(`div`);
  ((o.id = `debug-tooltip-` + t),
    (o.style.position = `absolute`),
    (o.style.top = `100%`),
    (o.style.left = `0`),
    (o.style.marginTop = `4px`),
    (o.style.padding = `6px 8px`),
    (o.style.backgroundColor = `rgba(0, 0, 0, 0.95)`),
    (o.style.color = `#fff`),
    (o.style.borderRadius = `4px`),
    (o.style.fontSize = `10px`),
    (o.style.fontFamily = `monospace`),
    (o.style.zIndex = `1000`),
    (o.style.display = `none`),
    (o.style.boxShadow = `0 2px 8px rgba(0, 0, 0, 0.5)`),
    (o.style.lineHeight = `1.4`),
    (o.innerHTML =
      `<div><strong>Room ID:</strong> ` +
      n.roomId +
      `</div><div><strong>Session ID:</strong> N/A</div>`));
  var s = document.createElement(`div`);
  s.id = `debug-content-` + t;
  var c = document.createElement(`div`);
  ((c.id = `debug-actions-` + t),
    (c.style.display = `flex`),
    (c.style.gap = `4px`),
    (c.style.marginTop = `8px`),
    (c.style.paddingTop = `6px`),
    (c.style.borderTop = `1px solid rgba(255, 255, 255, 0.15)`),
    (c.style.position = `relative`));
  function l(e, t, n, r) {
    var i = document.createElement(`button`);
    return (
      (i.id = e),
      (i.className = `cds-hit`),
      (i.style.display = `flex`),
      (i.style.alignItems = `center`),
      (i.style.justifyContent = `center`),
      (i.style.gap = `4px`),
      (i.style.padding = `4px 8px`),
      (i.style.border = `1px solid rgba(255, 255, 255, 0.2)`),
      (i.style.borderRadius = `4px`),
      (i.style.background = `rgba(255, 255, 255, 0.05)`),
      (i.style.color = `#fff`),
      (i.style.fontSize = `9px`),
      (i.style.cursor = `pointer`),
      (i.style.transition = `background 0.2s, border-color 0.2s`),
      (i.innerHTML = De(t, 12) + `<span>` + n + `</span>`),
      i.addEventListener(`mouseenter`, function () {
        ((i.style.background = `rgba(255, 255, 255, 0.15)`),
          (i.style.borderColor = `rgba(255, 255, 255, 0.3)`));
      }),
      i.addEventListener(`mouseleave`, function () {
        ((i.style.background = `rgba(255, 255, 255, 0.05)`),
          (i.style.borderColor = `rgba(255, 255, 255, 0.2)`));
      }),
      i.addEventListener(`click`, function (e) {
        (e.stopPropagation(), r());
      }),
      i
    );
  }
  var u = l(`debug-state-btn-` + t, _e, `State`, function () {
      Qe(t);
    }),
    d = l(`debug-message-btn-` + t, ge, `Send`, function () {
      ze(t);
    });
  d.style.display = `none`;
  var f = l(`debug-disconnect-btn-` + t, Te, `Drop`, function () {
      var n = E.get(t);
      n &&
        n.room &&
        n.room.connection &&
        n.room.connection.close(e.MAY_TRY_RECONNECT);
    }),
    p = !1;
  function m() {
    ((f.style.background = `rgba(239, 68, 68, 0.2)`),
      (f.style.borderColor = `rgba(239, 68, 68, 0.5)`),
      (f.style.color = `#ef4444`),
      (f.style.animation = ``),
      (f.style.pointerEvents = `auto`),
      (f.style.opacity = `1`));
    var e = f.querySelector(`span:last-child`);
    e && (e.textContent = `Drop`);
  }
  function h() {
    ((f.style.background = `rgba(251, 146, 60, 0.3)`),
      (f.style.borderColor = `rgba(251, 146, 60, 0.6)`),
      (f.style.color = `#fb923c`),
      (f.style.animation = `debug-pulse 1.5s ease-in-out infinite`),
      (f.style.pointerEvents = `none`),
      (f.style.opacity = `0.8`));
    var e = f.querySelector(`span:last-child`);
    e && (e.textContent = `Reconnecting...`);
  }
  (m(),
    n.room &&
      (n.room.onDrop(function () {
        ((p = !0), h());
      }),
      n.room.onReconnect(function () {
        ((p = !1), m());
      })),
    f.addEventListener(`mouseenter`, function () {
      p ||
        ((f.style.background = `rgba(239, 68, 68, 0.35)`),
        (f.style.borderColor = `rgba(239, 68, 68, 0.7)`));
    }),
    f.addEventListener(`mouseleave`, function () {
      p ||
        ((f.style.background = `rgba(239, 68, 68, 0.2)`),
        (f.style.borderColor = `rgba(239, 68, 68, 0.5)`));
    }),
    a.appendChild(o));
  var g = a.querySelector(`.debug-info-icon`),
    _ = null,
    v = function () {
      ((_ &&= (clearTimeout(_), null)), (o.style.display = `block`));
    },
    y = function () {
      _ = setTimeout(function () {
        o.style.display = `none`;
      }, 100);
    };
  ((o.style.pointerEvents = `auto`),
    g &&
      (g.addEventListener(`click`, function (e) {
        (e.stopPropagation(),
          x() &&
            (o.style.display = o.style.display === `block` ? `none` : `block`));
      }),
      g.addEventListener(`mouseenter`, function () {
        x() || v();
      }),
      g.addEventListener(`mouseleave`, function () {
        x() || y();
      }),
      o.addEventListener(`mouseenter`, v),
      o.addEventListener(`mouseleave`, function () {
        x() || y();
      })),
    c.appendChild(u),
    c.appendChild(d),
    c.appendChild(f));
  var S = document.createElement(`div`);
  ((S.id = `debug-body-` + t),
    (S.style.marginTop = `6px`),
    S.appendChild(s),
    S.appendChild(c),
    i.appendChild(a),
    i.appendChild(S),
    a.addEventListener(`click`, function () {
      b() && tt(i, i.dataset.expanded !== `1`);
    }),
    tt(i, !0));
  var C = le();
  return (C.insertBefore(i, C.querySelector(`#` + H)), i);
}
function tt(e, t) {
  var n = e.querySelector(`[id^="debug-body-"]`),
    r = e.querySelector(`.debug-title`),
    i = e.querySelector(`.debug-chevron`),
    a = b();
  ((e.dataset.expanded = t ? `1` : `0`),
    n && (n.style.display = t ? `block` : `none`),
    r &&
      ((r.style.cursor = a ? `pointer` : `default`),
      (r.style.borderBottomColor = t
        ? `rgba(255, 255, 255, 0.15)`
        : `transparent`),
      (r.style.paddingBottom = t ? `4px` : `0`)),
    i &&
      ((i.style.display = a ? `inline` : `none`),
      (i.textContent = t ? `▾` : `▸`)));
}
function nt() {
  document.addEventListener(`click`, function () {
    L()
      .querySelectorAll(`[id^="debug-tooltip-"]`)
      .forEach(function (e) {
        e.style.display = `none`;
      });
  });
}
function rt() {
  var e = b();
  y(function (t) {
    t.compact !== e &&
      ((e = t.compact),
      t.compact && ae(!1),
      L()
        .querySelectorAll(`[id^="debug-panel-"]`)
        .forEach(function (e) {
          tt(e, !0);
        }));
  });
}
function it(e, t) {
  var n = L(),
    r = `debug-content-` + e,
    i = `debug-panel-` + e,
    a = `debug-title-` + e,
    o = n.getElementById(r),
    s = n.getElementById(i);
  (n.getElementById(a),
    (!o || !s) &&
      (s
        ? ((o = n.getElementById(r)), n.getElementById(a))
        : (et(e, t), (o = n.getElementById(r)), n.getElementById(a), ue())));
  var c = n
    .getElementById(`debug-title-text-` + e)
    ?.querySelector(`.debug-room-name`);
  (c && (c.textContent = t.roomName),
    (n.getElementById(`debug-tooltip-` + e).innerHTML =
      `<div><strong>Room ID:</strong> ` +
      t.roomId +
      `</div><div><strong>Session ID:</strong> ` +
      t.sessionId +
      `</div>`));
  var l = t.pingMs === null ? `--` : t.pingMs + `ms`,
    u =
      t.pingMs === null
        ? `#888`
        : t.pingMs < 100
          ? `#22c55e`
          : t.pingMs < 200
            ? `#eab308`
            : `#ef4444`,
    d = n.getElementById(`debug-ping-` + e);
  d && ((d.textContent = l), (d.style.color = u));
  var f = t.room && t.room.clock,
    p = !!(
      f &&
      typeof f.jitter == `function` &&
      typeof f.patchInterval == `function` &&
      f.patchInterval() > 0
    ),
    m = p ? f.jitter() : 0,
    h = (m < 10 ? m.toFixed(1) : m.toFixed(0)) + `ms`,
    g = `#a78bfa`,
    _ = `<div style="line-height: 1.3;">`;
  ((_ += `<div style="font-size: 10px; display: flex; gap: 8px;">`),
    (_ += `<div style="flex: 1;">`),
    (_ +=
      `<div style="margin-bottom: 4px;"><div style="display: flex; align-items: center; gap: 6px;"><span style="display: inline-flex; align-items: center; width: 18px; height: 18px; color: #FF9800;">` +
      pe +
      `</span><span style="color: #FF9800;">` +
      ce(t.bytesSentPerSec) +
      `/s</span></div><div style="margin-left: 24px; opacity: 0.7; font-size: 9px;">` +
      t.messagesSentPerSec.toFixed(0) +
      ` messages</div></div>`),
    (_ +=
      `<div` +
      (p ? ` style="margin-bottom: 4px;"` : ``) +
      `><div style="display: flex; align-items: center; gap: 6px;"><span style="display: inline-flex; align-items: center; width: 18px; height: 18px; color: #2196F3;">` +
      me +
      `</span><span style="color: #2196F3;">` +
      ce(t.bytesReceivedPerSec) +
      `/s</span></div><div style="margin-left: 24px; opacity: 0.7; font-size: 9px;">` +
      t.messagesReceivedPerSec.toFixed(0) +
      ` messages</div></div>`),
    p &&
      (_ +=
        `<div><div style="display: flex; align-items: center; gap: 6px;"><span style="display: inline-flex; align-items: center; width: 18px; height: 18px; color: ` +
        g +
        `;">` +
        he +
        `</span><span style="color: ` +
        g +
        `;">jitter</span></div><div style="margin-left: 24px; opacity: 0.7; font-size: 9px;">±` +
        h +
        `</div></div>`),
    (_ += `</div>`),
    (_ += `<div style="display: flex; flex-direction: column; gap: 4px; align-items: flex-end;">`),
    (_ +=
      `<canvas id="graph-sent-` +
      e +
      `" width="80" height="30" style="display: block;"></canvas>`),
    (_ +=
      `<canvas id="graph-received-` +
      e +
      `" width="80" height="30" style="display: block;"></canvas>`),
    p &&
      (_ +=
        `<canvas id="graph-jitter-` +
        e +
        `" width="80" height="30" style="display: block;"></canvas>`),
    (_ += `</div>`),
    (_ += `</div>`),
    (_ += `</div>`),
    (o.innerHTML = _),
    setTimeout(function () {
      (at(`graph-sent-` + e, t.bytesSentHistory, `#FF9800`),
        at(`graph-received-` + e, t.bytesReceivedHistory, `#2196F3`),
        p && at(`graph-jitter-` + e, t.jitterHistory, g));
    }, 10));
}
function at(e, t, n) {
  var r = L().getElementById(e);
  if (r) {
    var i = r.getContext(`2d`),
      a = r.width,
      o = r.height;
    if ((i.clearRect(0, 0, a, o), t && t.length !== 0)) {
      var s = Math.max.apply(Math, t),
        c = Math.min.apply(Math, t),
        l = s - c || 1,
        u = 2,
        d = a - u * 2,
        f = o - u * 2;
      ((i.strokeStyle = `rgba(255, 255, 255, 0.1)`), (i.lineWidth = 0.5));
      for (var p = 0; p <= 4; p++) {
        var m = u + (f / 4) * p;
        (i.beginPath(), i.moveTo(u, m), i.lineTo(a - u, m), i.stroke());
      }
      ((i.strokeStyle = n), (i.lineWidth = 1.5), i.beginPath());
      for (var p = 0; p < t.length; p++) {
        var h = u + (d / (t.length - 1 || 1)) * p,
          g = (t[p] - c) / l,
          m = u + f - g * f;
        p === 0 ? i.moveTo(h, m) : i.lineTo(h, m);
      }
      (i.stroke(),
        t.length > 0 &&
          (i.lineTo(a - u, o - u),
          i.lineTo(u, o - u),
          i.closePath(),
          (i.fillStyle = n),
          (i.globalAlpha = 0.2),
          i.fill(),
          (i.globalAlpha = 1)));
    }
  }
}
function ot(e) {
  var t = Date.now(),
    n = (t - e.lastUpdate) / 1e3;
  if (n > 0) {
    ((e.bytesSentPerSec = e.bytesSentDelta / n),
      (e.bytesReceivedPerSec = e.bytesReceivedDelta / n),
      (e.messagesSentPerSec = e.messagesSentDelta / n),
      (e.messagesReceivedPerSec = e.messagesReceivedDelta / n),
      e.bytesSentHistory.push(e.bytesSentPerSec),
      e.bytesReceivedHistory.push(e.bytesReceivedPerSec));
    var r = e.room && e.room.clock;
    r &&
      typeof r.jitter == `function` &&
      typeof r.patchInterval == `function` &&
      r.patchInterval() > 0 &&
      e.jitterHistory.push(r.jitter());
    var i = e.maxHistoryLength || 60;
    (e.bytesSentHistory.length > i &&
      (e.bytesSentHistory.shift(), e.bytesReceivedHistory.shift()),
      e.jitterHistory.length > i && e.jitterHistory.shift(),
      (e.bytesSentDelta = 0),
      (e.bytesReceivedDelta = 0),
      (e.messagesSentDelta = 0),
      (e.messagesReceivedDelta = 0),
      (e.lastUpdate = t));
  }
  it(e.uniquePanelId, e);
}
function st(e) {
  let t = new Map();
  return (
    e.onTrack((e, n) => {
      let r = t.get(e);
      (r || ((r = new Set()), t.set(e, r)), r.add(n));
    }),
    {
      name: e.name,
      mode: () => e.mode(),
      smoothingDefaults: () => e.smoothingDefaults(),
      reckonDefaults: () => e.reckonDefaults(),
      attachedCount: () => e.attachedCount(),
      reconcilers: () => e.reconcilers(),
      setDefaults: (t) => e.setDefaults(t),
      setProfile: (t, n) => e.setProfile(t, n),
      onDispose: (t) => e.onDispose(t),
      profiles: () =>
        e
          .profiles()
          .map((e) => ({ ...e, fields: t.get(e.id) ? [...t.get(e.id)] : [] })),
    }
  );
}
var ct = new Map(),
  $ = null,
  lt = null,
  ut = 250,
  dt = `240px`,
  ft = [`lerp`, `extrapolate`, `damped`, `reckon`, `raw`],
  pt = `width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"`,
  mt = {
    lerp: `<svg ${pt}><circle cx="3.5" cy="12.5" r="1.4" fill="currentColor" stroke="none"/><circle cx="12.5" cy="3.5" r="1.4" fill="currentColor" stroke="none"/><line x1="4.6" y1="11.4" x2="11.4" y2="4.6"/></svg>`,
    extrapolate: `<svg ${pt}><circle cx="2.5" cy="8" r="1.4" fill="currentColor" stroke="none"/><line x1="3.8" y1="8" x2="13" y2="8"/><polyline points="9.5,4.5 13,8 9.5,11.5"/></svg>`,
    damped: `<svg ${pt}><path d="M2 8 C 3 3 5 3 6 8 C 6.8 11 7.8 11 8.6 8 C 9.2 6.2 10 6.2 13 7.6"/></svg>`,
    reckon: `<span style="font:italic 700 11px/1 ui-monospace,monospace">fn</span>`,
    raw: `<svg ${pt}><polyline points="2,13 5.5,13 5.5,9 9,9 9,5 13,5"/></svg>`,
  };
function ht(e) {
  if (ct.has(e.name)) return;
  let t = st(e),
    n = Nt(t);
  vt().appendChild(n);
  let r = { handle: t, el: n, refresh: () => Bt(t, r), histories: new Map() };
  (ct.set(t.name, r),
    t.onDispose(() => {
      let e = ct.get(t.name);
      e && (e.el.remove(), ct.delete(t.name), ct.size === 0 && Zt(), gt());
    }),
    Xt(),
    gt());
}
function gt() {
  let e = ct.size > 1;
  for (let t of ct.values()) {
    let n = t.el.querySelector(`[data-role="name"]`);
    n && (n.textContent = e ? ` ${t.handle.name}` : ``);
  }
}
var _t = 12;
function vt() {
  return (
    $ ||
    (($ = document.createElement(`div`)),
    ($.id = H),
    ($.className = `cds-surface`),
    Object.assign($.style, {
      display: U() ? `flex` : `none`,
      flexDirection: `column`,
      gap: `8px`,
      fontFamily: `monospace`,
      fontSize: `11px`,
      color: `#fff`,
      pointerEvents: `auto`,
    }),
    yt(),
    $)
  );
}
function yt() {
  if (!$) return;
  let e = $.style,
    t = $.querySelectorAll(`[data-name]`);
  if (b()) {
    let n = le();
    ($.parentNode !== n && n.appendChild($),
      (e.position = `static`),
      s($),
      (e.width = `auto`),
      (e.maxHeight = `none`),
      (e.zIndex = ``),
      (e.flexShrink = `0`),
      $.classList.remove(`cds-scroll`));
    for (let e of t) e.style.width = `auto`;
    return;
  }
  let n = L();
  $.parentNode !== n && n.appendChild($);
  let r = j.panelPosition.position,
    l = i(r),
    u = a(r) === `right` ? `left` : `right`;
  ((e.position = `fixed`),
    (e.zIndex = `2147483645`),
    (e.width = ``),
    (e.flexShrink = ``),
    $.classList.add(`cds-scroll`),
    s($),
    o($, l, _t),
    o($, u, _t),
    c($, `80vh`));
  for (let e of t) e.style.width = dt;
}
var bt = `colyseus-debug-predict-collapsed`,
  xt = `colyseus-debug-predict-tuning`;
function St(e) {
  try {
    let t = JSON.parse(sessionStorage.getItem(e) || `[]`);
    return new Set(Array.isArray(t) ? t : []);
  } catch {
    return new Set();
  }
}
function Ct(e, t, n) {
  let r = St(e);
  n ? r.add(t) : r.delete(t);
  try {
    sessionStorage.setItem(e, JSON.stringify([...r]));
  } catch {}
}
var wt = () => St(bt),
  Tt = (e, t) => Ct(bt, e, t),
  Et = null;
function Dt() {
  return (
    Et ||
    ((Et = document.createElement(`div`)),
    (Et.style.cssText = `position:fixed;z-index:2147483646;pointer-events:none;display:none;white-space:nowrap;background:rgba(0,0,0,0.95);color:#fff;font-family:monospace;font-size:10px;padding:3px 6px;border-radius:4px;box-shadow:0 2px 8px rgba(0,0,0,0.5)`),
    L().appendChild(Et),
    Et)
  );
}
function Ot(e, t) {
  let n = Dt();
  ((n.textContent = e), (n.style.display = `block`));
  let r = t.getBoundingClientRect();
  ((n.style.left = `${r.left}px`), (n.style.top = `${r.bottom + 4}px`));
}
function kt() {
  Et && (Et.style.display = `none`);
}
function At(e, t, n) {
  let r = document.createElement(`button`);
  return (
    (r.type = `button`),
    (r.className = `cds-hit-y`),
    (r.dataset.value = e),
    r.setAttribute(`aria-label`, e),
    (r.innerHTML = mt[e] ?? e),
    (r.style.cssText = `flex:1;display:inline-flex;align-items:center;justify-content:center;padding:4px 6px;line-height:0;border:1px solid;border-radius:4px;cursor:pointer;transition:background .2s,border-color .2s`),
    Oe(r, t),
    ke(
      r,
      () => {
        x() || Ot(e, r);
      },
      kt,
    ),
    r.addEventListener(`click`, (e) => {
      (e.stopPropagation(), n());
    }),
    r
  );
}
function jt(e, t, n) {
  e.innerHTML = ``;
  for (let r of ft)
    e.appendChild(
      At(r, r === t, () => {
        for (let t of e.querySelectorAll(`button`))
          Oe(t, t.dataset.value === r);
        n(r);
      }),
    );
}
function Mt(e, t) {
  for (let n of e.querySelectorAll(`button`)) Oe(n, n.dataset.value === t);
}
function Nt(e) {
  let t = document.createElement(`div`);
  ((t.dataset.name = e.name),
    (t.style.cssText = `width:${dt};background:rgba(0,0,0,0.85);color:#fff;font-family:monospace;font-size:11px;border-radius:6px;padding:8px;box-shadow:0 4px 12px rgba(0,0,0,0.5)`),
    b() && (t.style.width = `auto`));
  let n = wt().has(e.name);
  ((t.innerHTML = `
        <div data-role="header" class="cds-hit-y" style="display:flex;align-items:center;justify-content:space-between;gap:8px;font-weight:bold;border-bottom:1px solid ${q};padding-bottom:4px;cursor:pointer;user-select:none">
            <span>Predict<span data-role="name" style="color:${K};font-weight:normal"></span></span>
            <span style="display:flex;align-items:center;gap:8px;font-weight:normal">
                <span data-role="attached" title="attached instances" style="color:${K};font-variant-numeric:tabular-nums"></span>
                <span data-role="chevron" style="color:${K}">${n ? `▸` : `▾`}</span>
            </span>
        </div>
        <div data-role="body" style="display:${n ? `none` : `flex`};flex-direction:column;gap:8px;margin-top:6px">
            <div data-role="reconcilers" style="display:none;flex-direction:column;gap:6px"></div>
            <div data-role="profiles" style="display:none;flex-direction:column;gap:6px"></div>
        </div>
    `),
    (t.querySelector(`[data-role="attached"]`).textContent = String(
      e.attachedCount(),
    )));
  let r = t.querySelector(`[data-role="header"]`),
    i = t.querySelector(`[data-role="body"]`),
    a = t.querySelector(`[data-role="chevron"]`);
  return (
    r.addEventListener(`click`, () => {
      let t = i.style.display !== `none`;
      ((i.style.display = t ? `none` : `flex`),
        (a.textContent = t ? `▸` : `▾`),
        Tt(e.name, t));
    }),
    Pt(t, e),
    t
  );
}
function Pt(e, t) {
  let n = e.querySelector(`[data-role="profiles"]`),
    r = t.profiles().filter((e) => !e.isDefault || e.fields.length > 0);
  n.style.display = r.length ? `flex` : `none`;
  let i = r.map((e) => e.id).join(`,`);
  if (n.dataset.key !== i) {
    ((n.dataset.key = i), (n.innerHTML = ``));
    for (let e of r) n.appendChild(Ft(t, e));
  } else {
    let e = n.children;
    for (let n = 0; n < r.length; n++) Lt(e[n], t, r[n]);
  }
}
function Ft(e, t) {
  let n = document.createElement(`div`);
  ((n.dataset.profileId = String(t.id)),
    (n.dataset.tuneKey = `${e.name}#${t.id}`),
    (n.style.cssText = `border-top:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.03);border-radius:4px;padding:6px;display:flex;flex-direction:column;gap:4px`),
    (n.innerHTML = `
        <div data-role="fields" style="font-size:10px;display:flex;align-items:baseline;gap:6px">
            <span data-role="cat" style="color:#fff;font-weight:bold"></span>
            <span data-role="fieldnames" style="color:${K}"></span>
        </div>
        <div data-role="modes" style="display:flex;gap:4px;flex-wrap:wrap"></div>
        <button data-role="tune" type="button" class="cds-hit-y" style="display:none;align-items:center;gap:5px;
            width:100%;padding:3px 2px;border:none;border-radius:3px;background:none;color:${K};
            font-family:inherit;font-size:10px;text-align:left;cursor:pointer;
            transition:background .15s,color .15s">
            <span data-role="tune-chevron">▸</span><span data-role="tune-label"></span>
        </button>
        <div data-role="sliders" style="display:none;flex-direction:column;gap:3px"></div>
    `),
    jt(n.querySelector(`[data-role="modes"]`), t.mode, (r) => {
      try {
        (e.setProfile(t.id, { mode: r }), Rt(n, e, t.id, r));
      } catch (e) {
        console.error(`[predict-debug] setProfile failed:`, e);
      }
    }));
  let r = n.querySelector(`[data-role="tune"]`);
  return (
    r.addEventListener(`mouseenter`, () => {
      ((r.style.background = J.background), (r.style.color = `#fff`));
    }),
    r.addEventListener(`mouseleave`, () => {
      ((r.style.background = `none`), (r.style.color = K));
    }),
    r.addEventListener(`click`, (e) => {
      e.stopPropagation();
      let t = n.dataset.tuneKey;
      (Ct(xt, t, !St(xt).has(t)), It(n));
    }),
    Lt(n, e, t),
    n
  );
}
function It(e) {
  let t = e.querySelector(`[data-role="sliders"]`),
    n = e.querySelector(`[data-role="tune"]`),
    r = e.querySelector(`[data-role="tune-chevron"]`),
    i = e.querySelector(`[data-role="tune-label"]`),
    a = t.children.length;
  if (a === 0) {
    ((n.style.display = `none`), (t.style.display = `none`));
    return;
  }
  let o = St(xt).has(e.dataset.tuneKey);
  ((n.style.display = `flex`),
    (r.textContent = o ? `▾` : `▸`),
    (i.textContent = `${a} parameter${a === 1 ? `` : `s`}`),
    (t.style.display = o ? `flex` : `none`));
}
function Lt(e, t, n) {
  let r = e.querySelector(`[data-role="cat"]`),
    i = e.querySelector(`[data-role="fieldnames"]`);
  ((r.textContent = n.label ? `${n.label} ·` : n.isDefault ? `default ·` : ``),
    (i.textContent =
      n.fields.length === 0 ? `(no fields)` : n.fields.join(`, `)),
    Mt(e.querySelector(`[data-role="modes"]`), n.mode),
    e.querySelector(`[data-role="sliders"]`).dataset.mode !== n.mode &&
      Rt(e, t, n.id, n.mode));
}
function Rt(e, t, n, r) {
  let i = e.querySelector(`[data-role="sliders"]`);
  ((i.dataset.mode = r), (i.innerHTML = ``));
  let a = t.profiles().find((e) => e.id === n);
  if (!a) {
    It(e);
    return;
  }
  if (
    (r === `lerp`
      ? (zt(i, `delay (ms)`, 0, 300, a.delay, (e) =>
          t.setProfile(n, { delay: e }),
        ),
        zt(i, `tickInterval (ms, 0=off)`, 0, 100, a.tickInterval ?? 0, (e) =>
          t.setProfile(n, { tickInterval: e }),
        ),
        zt(i, `smoothMs (0=off)`, 0, 300, a.smoothMs, (e) =>
          t.setProfile(n, { smoothMs: e }),
        ))
      : r === `extrapolate`
        ? (zt(i, `maxExtrapolate (ms)`, 0, 300, a.maxExtrapolate, (e) =>
            t.setProfile(n, { maxExtrapolate: e }),
          ),
          zt(i, `tickInterval (ms, 0=off)`, 0, 100, a.tickInterval ?? 0, (e) =>
            t.setProfile(n, { tickInterval: e }),
          ),
          zt(i, `smoothMs (0=off)`, 0, 300, a.smoothMs, (e) =>
            t.setProfile(n, { smoothMs: e }),
          ))
        : r === `damped` &&
          zt(i, `smoothMs (0=snap)`, 0, 300, a.smoothMs, (e) =>
            t.setProfile(n, { smoothMs: e }),
          ),
    r === `lerp` || r === `extrapolate` || r === `damped`)
  ) {
    let e = a.snap ?? 0;
    zt(i, `snap (units, 0=off)`, 0, Math.max(20, Math.ceil(e * 2)), e, (e) =>
      t.setProfile(n, { snap: e }),
    );
  }
  It(e);
}
function zt(e, t, n, r, i, a) {
  let o = document.createElement(`label`);
  ((o.style.cssText = `display:flex;flex-direction:column;gap:2px;font-size:10px;color:${K}`),
    (o.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:baseline;gap:6px">
            <span>${t}</span>
            <span data-role="val" style="color:#fff;font-variant-numeric:tabular-nums"></span>
        </div>
        <input type="range" min="${n}" max="${r}" value="${i}" style="width:100%;margin:0;accent-color:#fff"/>
    `));
  let s = o.querySelector(`input`),
    c = o.querySelector(`[data-role="val"]`);
  ((c.textContent = String(i)),
    s.addEventListener(`input`, () => {
      let e = Number(s.value);
      c.textContent = String(e);
      try {
        a(e);
      } catch (e) {
        console.error(`[predict-debug] slider update failed:`, e);
      }
    }),
    e.appendChild(o));
}
function Bt(e, t) {
  ((t.el.querySelector(`[data-role="attached"]`).textContent = String(
    e.attachedCount(),
  )),
    qt(t, e),
    Pt(t.el, e));
}
var Vt = 64,
  Ht = 200,
  Ut = 30;
function Wt(e) {
  return e < 0.001
    ? `0`
    : e < 1
      ? e.toFixed(3)
      : e < 10
        ? e.toFixed(2)
        : e.toFixed(1);
}
var Gt = {
  matched: { word: `✓ matched`, color: `#6c9`, action: `` },
  jitter: {
    word: `~ jitter`,
    color: `#dc7`,
    action: `transient spikes (packet loss / reorder) — raise smoothMs or ignore; not a bug`,
  },
  diverging: {
    word: `✗ diverging`,
    color: `#e66`,
    action: `client/server sim disagree — check dt · shared step · constants · skipped inputs`,
  },
};
function Kt(e, t) {
  return `predict-rc-graph-${e.replace(/[^a-z0-9]/gi, `-`)}-${t}`;
}
function qt(e, t) {
  let n = e.el.querySelector(`[data-role="reconcilers"]`),
    r = t.reconcilers();
  if (r.length === 0) {
    n.style.display = `none`;
    return;
  }
  if (((n.style.display = `flex`), n.childElementCount !== r.length)) {
    n.innerHTML = ``;
    for (let e = 0; e < r.length; e++) n.appendChild(Jt(Kt(t.name, e)));
  }
  for (let i = 0; i < r.length; i++) Yt(n.children[i], r[i], e, Kt(t.name, i));
}
function Jt(e) {
  let t = document.createElement(`div`);
  return (
    (t.style.cssText = `border:1px solid ${q};border-left:3px solid ${K};background:rgba(255,255,255,0.04);border-radius:4px;padding:6px;display:flex;flex-direction:column;gap:4px`),
    (t.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;gap:6px">
            <span data-role="rc-label" style="color:#fff;font-weight:bold"></span>
            <span data-role="rc-status" style="font-weight:bold;white-space:nowrap"></span>
        </div>
        <canvas id="${e}" width="${Ht}" height="${Ut}" title="drift peak over time (auto-scaled; flat when matched)" style="display:block;width:100%;height:${Ut}px"></canvas>
        <div data-role="rc-action" style="font-size:10px;line-height:1.3"></div>
        <div data-role="rc-stats" style="color:${K};font-size:10px;font-variant-numeric:tabular-nums"></div>
    `),
    t
  );
}
function Yt(e, t, n, r) {
  let i = n.histories.get(t.label);
  (i || ((i = []), n.histories.set(t.label, i)),
    i.push(t.status === `matched` ? 0 : t.peak),
    i.length > Vt && i.shift());
  let a = Gt[t.status] ?? Gt.matched,
    o =
      t.status === `diverging` && t.severity !== void 0
        ? `  ${t.severity.toFixed(1)}× tol`
        : ``;
  ((e.style.borderLeftColor = a.color),
    (e.querySelector(`[data-role="rc-label"]`).textContent = t.label));
  let s = e.querySelector(`[data-role="rc-status"]`);
  ((s.style.color = a.color),
    (s.textContent = `${a.word}${o}`),
    at(r, i, a.color));
  let c = e.querySelector(`[data-role="rc-action"]`);
  ((c.style.display = a.action ? `block` : `none`),
    (c.style.color = a.color),
    (c.textContent = a.action),
    (e.querySelector(`[data-role="rc-stats"]`).textContent =
      `drift ${Wt(t.ema)} · pk ${Wt(t.peak)} · Δ ${Wt(t.lastCorrectionMag)}`));
}
function Xt() {
  lt === null &&
    (lt = setInterval(() => {
      for (let e of ct.values()) e.refresh();
    }, ut));
}
function Zt() {
  lt !== null && (clearInterval(lt), (lt = null));
}
var Qt = null;
(ee(), S(), y(B), y(yt));
function $t(e, t, n) {
  if (!j.latencySimulation.enabled || (e <= 0 && t <= 0)) return -1;
  let r = t > 0 ? (Math.random() * 2 - 1) * t : 0,
    i = performance.now(),
    a = Math.max(i + e + r, n.t + 0.5);
  return ((n.t = a), a - i);
}
globalThis.__net = (e = 0, t = 0) => {
  ((j.latencySimulation.delay = e),
    (j.latencySimulation.jitter = t),
    (j.latencySimulation.enabled = e > 0 || t > 0),
    M(),
    console.log(
      `[net] RTT ${e}±${t}ms (split both ways) — ${e > 0 || t > 0 ? `ON` : `OFF`}`,
    ));
};
function en() {
  Qt === null &&
    (Qt = setInterval(function () {
      (E.forEach(function (e, t) {
        ot(e);
      }),
        E.size === 0 && (clearInterval(Qt), (Qt = null)));
    }, 1e3));
}
function tn() {
  function e(e) {
    if (!e) return e;
    let t = e.roomId,
      n = e.sessionId,
      r =
        t +
        `_` +
        (n && n !== `N/A` && n !== ``
          ? n
          : Date.now() + `-` + Math.random().toString(36).substring(2, 9)),
      i = e.connection?.transport,
      a = i?.ws?.url ?? i?.url ?? `N/A`,
      o = `N/A`;
    try {
      o = new URL(a).host;
    } catch {}
    let s = {
      uniquePanelId: r,
      roomId: t,
      roomName: e.name || `N/A`,
      sessionId: n || `N/A`,
      endpoint: a,
      host: o,
      room: e,
      bytesSent: 0,
      bytesReceived: 0,
      messagesSent: 0,
      messagesReceived: 0,
      bytesSentDelta: 0,
      bytesReceivedDelta: 0,
      messagesSentDelta: 0,
      messagesReceivedDelta: 0,
      bytesSentPerSec: 0,
      bytesReceivedPerSec: 0,
      messagesSentPerSec: 0,
      messagesReceivedPerSec: 0,
      lastUpdate: Date.now(),
      bytesSentHistory: [],
      bytesReceivedHistory: [],
      jitterHistory: [],
      maxHistoryLength: 60,
      messageTypes: null,
      pingMs: null,
      pingInterval: null,
    };
    (E.set(r, s),
      (s.pingInterval = setInterval(() => {
        e.ping((e) => {
          s.pingMs = e;
        });
      }, 2e3)),
      e.ping((e) => {
        s.pingMs = e;
      }),
      e.onMessage(`__playground_message_types`, (e) => {
        s.messageTypes = e;
        var t = L().getElementById(`debug-message-btn-` + r);
        t && (t.style.display = e ? `flex` : `none`);
      }));
    function c(e) {
      var t = 0;
      if (e instanceof Blob) t = e.size;
      else if (e instanceof ArrayBuffer) t = e.byteLength;
      else if (typeof e == `string`) t = new Blob([e]).size;
      else if (e)
        try {
          t = new Blob([JSON.stringify(e)]).size;
        } catch {
          t = new Blob([String(e)]).size;
        }
      (s.messagesReceived++,
        s.messagesReceivedDelta++,
        (s.bytesReceived += t),
        (s.bytesReceivedDelta += t));
    }
    function l(e) {
      (e instanceof Blob
        ? e.size
        : e instanceof ArrayBuffer
          ? e.byteLength
          : typeof e == `string` && new Blob([e]).size,
        s.messagesSent++,
        s.messagesSentDelta++,
        (s.bytesSent += e.length),
        (s.bytesSentDelta += e.length));
    }
    let u = { t: 0 },
      d = { t: 0 },
      f = i.events.onmessage;
    i.events.onmessage = function (e) {
      var t = e.data;
      (t instanceof Blob
        ? (t = t.slice())
        : t instanceof ArrayBuffer
          ? (t = t.slice(0))
          : typeof t == `string` && (t = t),
        c(t));
      let n = $t(
        j.latencySimulation.delay / 2,
        j.latencySimulation.jitter / 2,
        u,
      );
      if (n >= 0)
        setTimeout(function () {
          var n = {
            data: t,
            target: e.target,
            currentTarget: e.currentTarget,
            type: `message`,
          };
          f.call(e.target, n);
        }, n);
      else return f.apply(this, arguments);
    };
    let p = i.events.onclose;
    i.events.onclose = function (e) {
      if (
        j.latencySimulation.enabled &&
        (j.latencySimulation.delay > 0 || j.latencySimulation.jitter > 0)
      )
        setTimeout(
          function () {
            p && p.call(this, e);
          },
          j.latencySimulation.delay + j.latencySimulation.jitter + 1,
        );
      else if (p) return p.apply(this, arguments);
    };
    let m = e.connection.send.bind(e.connection);
    return (
      (e.connection.send = function (e) {
        l(e);
        let t = $t(
          j.latencySimulation.delay / 2,
          j.latencySimulation.jitter / 2,
          d,
        );
        if (t >= 0) {
          var n = e;
          (e instanceof ArrayBuffer || e instanceof Blob
            ? (n = e.slice(0))
            : (e instanceof Uint8Array ||
                e instanceof DataView ||
                (e.buffer && e.buffer instanceof ArrayBuffer)) &&
              (n = new Uint8Array(e).buffer),
            setTimeout(function () {
              m(n);
            }, t));
        } else return m(e);
      }),
      it(r, s),
      en(),
      e.onLeave.once(() => {
        (s.pingInterval !== null &&
          (clearInterval(s.pingInterval), (s.pingInterval = null)),
          E.delete(r));
        var e = L().getElementById(`debug-panel-` + r);
        (e && (e.remove(), ue()),
          E.size === 0 && Qt !== null && (clearInterval(Qt), (Qt = null)));
      }),
      e
    );
  }
  let n = globalThis,
    r = n.__colyseusDebug?.__buffer,
    i = {
      publish(t, n) {
        t === `predict` ? ht(n) : t === `room` && e(n);
      },
    };
  if (((n.__colyseusDebug = i), r))
    for (let [e, t] of r) {
      let n = t.deref();
      n && i.publish(e, n);
    }
  [`joinOrCreate`, `join`, `create`, `joinById`, `reconnect`].forEach((e) => {
    let n = t.prototype[e];
    typeof n == `function` &&
      (t.prototype[e] = function (...e) {
        return (this.auth && A.add(this.auth), n.apply(this, e));
      });
  });
}
(tn(),
  document.readyState === `loading`
    ? document.addEventListener(`DOMContentLoaded`, $e)
    : $e());
