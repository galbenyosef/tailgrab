// assets/debug-BVnJLfS4 01 — style
// Lines 1-346 of readable/assets/debug-BVnJLfS4.pretty.js (statement-aligned).
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
