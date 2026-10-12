// assets__debug-BVnJLfS4 03 — style
// Lines 465-947 of readable/assets__debug-BVnJLfS4.pretty.js (statement-aligned).
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
