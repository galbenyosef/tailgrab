// assets__main-CzsUDvlE 39 — pointerid
// Lines 13057-13119 of readable/assets__main-CzsUDvlE.pretty.js (statement-aligned).
function hm(e, t) {
  let n = e.attributes.position.array,
    r = [];
  for (let e = 0; e < n.length; e += 3)
    n[e + 1] < t.min.y + 0.01 && r.push(n[e], n[e + 2]);
  let i = r.length / 2;
  if (!i) return [];
  let a = 0,
    o = 0;
  for (let e = 0; e < r.length; e += 2) ((a += r[e]), (o += r[e + 1]));
  ((a /= i), (o /= i));
  let s = [],
    c = Math.max(1, Math.floor(i / 16));
  for (let e = 0; e < i; e += c)
    s.push(
      r[e * 2] + (a - r[e * 2]) * 0.05,
      r[e * 2 + 1] + (o - r[e * 2 + 1]) * 0.05,
    );
  return s;
}
var gm = new T(0, 1, 0),
  _m = new s(),
  vm = new T(),
  ym = new T();
function bm(e, t, n, r) {
  if (
    (t.preventDefault(),
    e.setPointerCapture?.(t.pointerId),
    t.pointerType === `mouse`)
  )
    try {
      e.requestPointerLock()?.catch?.(() => {});
    } catch {}
  let i = t.clientX,
    a = t.clientY,
    o = (r) => {
      if (r.pointerId !== t.pointerId) return;
      let o = document.pointerLockElement === e,
        s = o ? r.movementX : r.clientX - i,
        c = o ? r.movementY : r.clientY - a;
      ((i = r.clientX), (a = r.clientY), (s || c) && n(s, c, r));
    },
    s = (t) => {
      (e.removeEventListener(`pointermove`, o),
        e.removeEventListener(`pointerup`, c),
        e.removeEventListener(`pointercancel`, l),
        window.removeEventListener(`keydown`, u, !0),
        document.pointerLockElement === e && document.exitPointerLock(),
        r(t));
    },
    c = (e) => {
      e.pointerId === t.pointerId && s(!0);
    },
    l = () => s(!1),
    u = (e) => {
      e.key === `Escape` &&
        (e.preventDefault(), e.stopImmediatePropagation(), s(!1));
    };
  (e.addEventListener(`pointermove`, o),
    e.addEventListener(`pointerup`, c),
    e.addEventListener(`pointercancel`, l),
    window.addEventListener(`keydown`, u, !0));
}
