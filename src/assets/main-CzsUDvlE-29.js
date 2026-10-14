// assets/main-CzsUDvlE 29 — math
// Lines 9385-9414 of readable/assets/main-CzsUDvlE.pretty.js (statement-aligned).
function Ed(e) {
  let t = `Level ${wn(e.id) + 1}`;
  return (e.tour ?? 1) > 1 ? `Tour ${e.tour} · ${t}` : t;
}
function Dd(e, t, n, r, i) {
  let a = V(``, `${t} stack`, () => {
      performance.now() >= n && r();
    }),
    o = j(`span`, `btn-label`, e);
  return (i && o.prepend(U(i)), a.append(o, j(`span`, `btn-sub`)), a);
}
function Od(e) {
  let t = e.pieces.length,
    n = e.colors.length;
  return `+${[t ? `${t} piece${t === 1 ? `` : `s`}` : ``, n ? `${n} color${n === 1 ? `` : `s`}` : ``].filter(Boolean).join(` · `)}`;
}
function kd(e, t) {
  let n = e.textContent ?? ``,
    r = Number(n.replace(/[^0-9]/g, ``));
  if (!r || !/^[0-9,]+$/.test(n.trim()) || A()) return;
  e.textContent = `0`;
  let i = performance.now() + t,
    a = (t) => {
      if (!e.isConnected) return;
      let n = Math.max(0, Math.min(1, (t - i) / 700));
      ((e.textContent = Math.round(r * (1 - (1 - n) ** 3)).toLocaleString()),
        n < 1 && requestAnimationFrame(a));
    };
  requestAnimationFrame(a);
}
