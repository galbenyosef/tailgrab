// assets__debug-BVnJLfS4 11 — latencysimulation
// Lines 3019-3206 of readable/assets__debug-BVnJLfS4.pretty.js (statement-aligned).
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
