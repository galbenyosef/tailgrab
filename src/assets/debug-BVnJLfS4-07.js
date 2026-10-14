// assets/debug-BVnJLfS4 07 — style
// Lines 1823-2124 of readable/assets/debug-BVnJLfS4.pretty.js (statement-aligned).
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
