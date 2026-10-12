// assets__main-CzsUDvlE 43 — kind
// Lines 15418-15456 of readable/assets__main-CzsUDvlE.pretty.js (statement-aligned).
function Um(e) {
  if (e.kind === `park`)
    return [Dr(e.code), async () => Fr(e.code, await Yc(e.code))];
  let t = e.kind === `career` ? (R(e.level)?.parkId ?? `plaza`) : `plaza`;
  return [t, () => Sr[t] ?? Sr.plaza];
}
var Wm = {
    skaters: `Every pro unlocked`,
    secret: `Every secret skin unlocked`,
  },
  Gm = (e) =>
    e
      ? e.members
          .filter((e) => !e.me)
          .map((e) => ({ key: e.sid, look: Gi(e.skater, e.look) }))
      : [],
  Km = Math.random() < 0.5 ? 0 : 1;
function qm() {
  let [e, t] = Km++ % 2 ? [`run`, `combo`] : [`combo`, `run`];
  return dt(e)
    .then((e) => e ?? dt(t))
    .catch((e) => (console.warn(`[tv]`, e), null));
}
function Jm(e) {
  if (e.kind === `pro`) return `New skater: ${qi(e.pro).name}!`;
  if (e.kind === `skin`) return `Secret unlocked: ${Ln(`skin:${e.skin}`)}!`;
  let t = e.pieces.length + e.colors.length,
    n = [
      e.pieces.length
        ? `${e.pieces.length} piece${e.pieces.length === 1 ? `` : `s`}`
        : ``,
      e.colors.length
        ? `${e.colors.length} color${e.colors.length === 1 ? `` : `s`}`
        : ``,
    ]
      .filter(Boolean)
      .join(` · `);
  return `New in Your Style: ${t === 1 ? Ln(e.pieces[0] ?? e.colors[0]) : n}!`;
}
