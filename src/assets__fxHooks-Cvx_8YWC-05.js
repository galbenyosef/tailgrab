// assets__fxHooks-Cvx_8YWC 05 — min
// Lines 2553-2639 of readable/assets__fxHooks-Cvx_8YWC.pretty.js (statement-aligned).
function cn() {
  let e = he(_e.profile);
  if (!e) return null;
  let t = e.keys.filter((e) => e.startsWith(`color:`)),
    n = e.keys.filter((e) => !e.startsWith(`color:`)).map(xe);
  return (
    t.length && n.push(t.length === 1 ? xe(t[0]) : `${t.length} new colors`),
    `LV ${e.level}: ${n.join(`, `)}`
  );
}
function ln(e) {
  return Math.round(Oe(Ee(e)) * 100);
}
function un(e) {
  return e >= De.full
    ? null
    : `Riding at ${ln(e)}% speed & pop · full at LV ${De.full}`;
}
var dn = [
  { min: 1, name: `Grom` },
  { min: 5, name: `Local` },
  { min: 10, name: `Ripper` },
  { min: 15, name: `Am` },
  { min: 20, name: `Flow` },
  { min: 30, name: `Pro` },
];
function fn(e) {
  let t = 0;
  return (
    dn.forEach((n, r) => {
      e >= n.min && (t = r);
    }),
    t
  );
}
function pn(e) {
  let t = fn(e),
    n = dn[t + 1],
    { min: r, name: i } = dn[t];
  return {
    name: i,
    range: n
      ? `LV ${r}–${n.min - 1}, ${n.name} at LV ${n.min}`
      : `LV ${r} and up`,
  };
}
var mn = `cx="66" cy="52" rx="58" ry="19"`,
  hn = `M0-11C1.2-2.5 2.5-1.2 11 0C2.5 1.2 1.2 2.5 0 11C-1.2 2.5-2.5 1.2-11 0C-2.5-1.2-1.2-2.5 0-11Z`,
  gn = 0;
function _n(e) {
  let t = fn(e),
    n = ++gn,
    r = t === dn.length - 1,
    i = `<ellipse ${mn} class="orbit-ink"/><ellipse ${mn} class="orbit"${r ? ` style="stroke:url(#lvh${n})"` : ``}/><ellipse ${mn} class="comet" pathLength="100"/>`,
    a = [72, 58, 46][Math.min(2, String(e).length - 1)],
    o = (e) => (e + a * 0.35).toFixed(1),
    s = k(`b`, `lvl-badge`);
  return (
    (s.dataset.tier = String(t)),
    s.setAttribute(`role`, `img`),
    s.setAttribute(`aria-label`, `Level ${e}`),
    (s.innerHTML =
      `<svg viewBox="0 0 132 100" aria-hidden="true"><defs><clipPath id="lvc${n}"><rect x="-30" y="52" width="200" height="60"/></clipPath>` +
      (r
        ? `<linearGradient id="lvh${n}" x1="0" y1="0" x2="1" y2="1" spreadMethod="reflect"><stop offset="0" stop-color="#ff9cbd"/><stop offset=".25" stop-color="#ffe489"/><stop offset=".5" stop-color="#93f0bc"/><stop offset=".75" stop-color="#9aaaff"/><stop offset="1" stop-color="#ff9cbd"/><animateTransform attributeName="gradientTransform" type="translate" from="-1 -1" to="1 1" dur="5s" repeatCount="indefinite"/></linearGradient>`
        : ``) +
      `</defs><g transform="rotate(-12 66 52)">${i}</g><g class="numg"><g transform="translate(68 0) skewX(-9) translate(-68 0)"><text x="71" y="${o(57)}" font-size="${a}" stroke-width="13" class="drop">${e}</text><text x="68" y="${o(52)}" font-size="${a}" stroke-width="13" class="num">${e}</text></g></g><g transform="rotate(-12 66 52)" clip-path="url(#lvc${n})">${i}</g><text x="22" y="30" font-size="22" stroke-width="7" class="lv" transform="rotate(-12 22 30)">LV</text></svg><i class="lvl-spark"><svg viewBox="-13 -13 26 26" aria-hidden="true"><path class="spark" d="${hn}"/></svg></i>`),
    s
  );
}
function vn() {
  let { level: e, into: t, span: n } = A(_e.profile?.xp ?? 0),
    r = k(`div`, `level-row`),
    i = k(`div`, `xp-bar`),
    a = k(`i`, ``);
  ((a.style.width = `${Math.round((t / n) * 100)}%`),
    i.append(
      a,
      k(`span`, `xp-txt`, `${(n - t).toLocaleString()} XP to LV ${e + 1}`),
    ),
    r.append(_n(e), i));
  let o = cn();
  return (
    (r.title = `Level ${e} (${pn(e).name}) · ${(n - t).toLocaleString()} XP to go${o ? ` · next unlock: ${o}` : ``}`),
    r
  );
}
