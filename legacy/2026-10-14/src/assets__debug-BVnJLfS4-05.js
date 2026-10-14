// assets__debug-BVnJLfS4 05 — style
// Lines 1154-1483 of readable/assets__debug-BVnJLfS4.pretty.js (statement-aligned).
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
