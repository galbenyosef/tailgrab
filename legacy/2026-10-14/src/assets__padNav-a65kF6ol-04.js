// assets__padNav-a65kF6ol 04 — left
// Lines 1239-1322 of readable/assets__padNav-a65kF6ol.pretty.js (statement-aligned).
function gt(e, t, n) {
  let r = n === `left` || n === `right`,
    i = n === `right` || n === `down` ? 1 : -1,
    a = r ? e.left + e.width / 2 : e.top + e.height / 2,
    o = r ? t.left + t.width / 2 : t.top + t.height / 2;
  if (
    (o - a) * i <= 1 ||
    (r
      ? Math.min(e.right, t.right) - Math.max(e.left, t.left)
      : Math.min(e.bottom, t.bottom) - Math.max(e.top, t.top)) >
      Math.min(r ? e.width : e.height, r ? t.width : t.height) / 2
  )
    return 1 / 0;
  let s = Math.max(
      0,
      i > 0
        ? r
          ? t.left - e.right
          : t.top - e.bottom
        : r
          ? e.left - t.right
          : e.top - t.bottom,
    ),
    c = r
      ? Math.max(0, t.top - e.bottom, e.top - t.bottom)
      : Math.max(0, t.left - e.right, e.left - t.right);
  if (r && c > s) return 1 / 0;
  let l = Math.abs(
    r
      ? t.top + t.height / 2 - (e.top + e.height / 2)
      : t.left + t.width / 2 - (e.left + e.width / 2),
  );
  return s + c * 2 + l * 0.05 + Math.abs(o - a) * 0.01;
}
function _t(e) {
  let t = Object.entries(e.dataset)
    .filter(([e]) => e !== `autofocus`)
    .map(([e, t]) => `${e}=${t}`)
    .join(`,`);
  return `${e.tagName}|${e.getAttribute(`aria-label`) ?? ``}|${t}|${(e.textContent ?? ``).trim().slice(0, 40)}`;
}
function $(e, t) {
  let n = getComputedStyle(e);
  return t === `y`
    ? /auto|scroll/.test(n.overflowY) && e.scrollHeight > e.clientHeight + 1
    : /auto|scroll/.test(n.overflowX) && e.scrollWidth > e.clientWidth + 1;
}
function vt(e, t, n) {
  if (!n.roots.some((t) => t.contains(e))) return null;
  for (
    let r = e.parentElement;
    r && n.roots.some((e) => e.contains(r));
    r = r.parentElement
  )
    if ($(r, t)) return r;
  return null;
}
function yt(e) {
  let t = e.getBoundingClientRect();
  if (
    t.bottom <= 0 ||
    t.top >= innerHeight ||
    t.right <= 0 ||
    t.left >= innerWidth
  )
    return !1;
  for (let n = e.parentElement; n && n !== document.body; n = n.parentElement) {
    if (!$(n, `y`) && !$(n, `x`)) continue;
    let e = n.getBoundingClientRect();
    if (
      t.bottom <= e.top ||
      t.top >= e.bottom ||
      t.right <= e.left ||
      t.left >= e.right
    )
      return !1;
  }
  return !0;
}
var bt = (e) =>
    e * parseFloat(getComputedStyle(document.documentElement).fontSize),
  xt = () =>
    matchMedia(`(prefers-reduced-motion: reduce)`).matches ||
    document.body.classList.contains(`reduce-motion`);
