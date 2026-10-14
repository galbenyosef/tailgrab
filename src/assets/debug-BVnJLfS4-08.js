// assets/debug-BVnJLfS4 08 — style
// Lines 2125-2459 of readable/assets/debug-BVnJLfS4.pretty.js (statement-aligned).
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
