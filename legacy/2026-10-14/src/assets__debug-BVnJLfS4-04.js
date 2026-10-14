// assets__debug-BVnJLfS4 04 — style
// Lines 948-1153 of readable/assets__debug-BVnJLfS4.pretty.js (statement-aligned).
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
