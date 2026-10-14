// assets__missions-eXNMrvRm 03 — math
// Lines 383-500 of readable/assets__missions-eXNMrvRm.pretty.js (statement-aligned).
function f() {
  return {
    daily: { period: 0, slots: [], crate: !1 },
    weekly: { period: 0, slots: [], crate: !1 },
    rerollDay: 0,
    streak: { n: 0, day: 0 },
    stars: 0,
  };
}
var p = (e) =>
  typeof e == `number` && Number.isFinite(e) ? Math.max(0, Math.floor(e)) : 0;
function m(e) {
  let t = f();
  if (!e || typeof e != `object`) return t;
  let i = e;
  for (let e of n) {
    let n = i[e];
    if (!n || typeof n != `object`) continue;
    ((t[e].period = p(n.period)), (t[e].crate = n.crate === !0));
    let a = Array.isArray(n.slots) ? n.slots : [];
    for (let n of a) {
      let i = n && typeof n == `object` ? u(String(n.id)) : void 0;
      if (
        !i ||
        i.cadence !== e ||
        t[e].slots.length >= 3 ||
        t[e].slots.some((e) => e.id === i.id)
      )
        continue;
      let a = Math.max(1, Math.min(i.goal[2], p(n.goal) || i.goal[0])),
        o = { id: i.id, goal: a, n: 0, claimed: n.claimed === !0 };
      if (r(i.obj) === `set`) {
        let e = Array.isArray(n.seen)
          ? [...new Set(n.seen.filter((e) => typeof e == `string`))].slice(0, d)
          : [];
        ((o.seen = e), (o.n = Math.min(a, e.length)));
      } else {
        let e = typeof n.n == `number` && Number.isFinite(n.n) ? n.n : 0;
        o.n = Math.max(0, Math.min(a, h(e)));
      }
      t[e].slots.push(o);
    }
  }
  return (
    (t.rerollDay = p(i.rerollDay)),
    (t.streak = { n: p(i.streak?.n), day: p(i.streak?.day) }),
    (t.stars = p(i.stars)),
    t
  );
}
var h = (e) => Math.round(e * 10) / 10,
  g = 864e5,
  _ = (e) => Math.floor(e / g),
  v = (e, t) => (e === `daily` ? (t + 1) * g : ((t + 1) * 7 + 4) * g),
  y = { daily: 1, weekly: 3 },
  b = { daily: { xp: 400, stars: 2 }, weekly: { xp: 1e3, stars: 5 } },
  x = (e, t) => (e.streak.day >= t - 1 ? e.streak.n : 0),
  S = (e) => e.n >= e.goal,
  C = (e) => !e.crate && e.slots.length > 0 && e.slots.every((e) => e.claimed);
function w(e) {
  let t = 0;
  for (let r of n) {
    for (let n of e[r].slots) !n.claimed && S(n) && t++;
    C(e[r]) && t++;
  }
  return t;
}
var T = (e) => e.toLocaleString(`en-US`);
function E(e, t) {
  if (t === 1 && e.one) return e.one;
  let n = T(t);
  return e.text
    .replace(/\ba \{n\}/, /^(8|1[18](\D|$))/.test(n) ? `an ${n}` : `a ${n}`)
    .replace(`{n}`, n);
}
function D(e, t) {
  return `${e.short} ${O(e, t)}`;
}
function O(e, t) {
  let n = Math.min(t.n, t.goal);
  return `${k(Math.floor(n))}/${k(t.goal)}${e.unit ? ` ${e.unit}` : ``}`;
}
function k(e) {
  return e >= 1e6
    ? `${+(e / 1e6).toFixed(1)}M`
    : e >= 1e4
      ? `${+(e / 1e3).toFixed(e >= 1e5 ? 0 : 1)}k`
      : T(e);
}
var A = [
    { at: 10, xp: 750 },
    { at: 60, xp: 1e3 },
    { at: 140, xp: 1500 },
    { at: 230, xp: 2e3 },
    { at: 340, xp: 2500 },
  ],
  j = 400,
  M = 50,
  N = 2500;
function P(e) {
  return e
    ? e.kind === `stars`
      ? e.n
      : e.kind === `any`
        ? Math.max(0, ...e.of.map(P))
        : 0
    : 0;
}
var F = t.map((e) => ({ at: P(e.unlock), pro: e.id })).filter((e) => e.at > 0);
function I(e) {
  let t = [...F, ...A].filter((t) => t.at <= e);
  for (let n = 450; n <= e; n += M) t.push({ at: n, xp: N });
  return t.sort((e, t) => e.at - t.at || (e.pro === void 0 ? 1 : -1));
}
function L(e) {
  return I(Math.max(e + M, 450)).find((t) => t.at > e);
}
var R = Math.max(j, ...F.map((e) => e.at));
