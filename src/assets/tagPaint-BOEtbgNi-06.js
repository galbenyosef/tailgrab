// assets/tagPaint-BOEtbgNi 06 — parkstate
// Lines 2624-2758 of readable/assets/tagPaint-BOEtbgNi.pretty.js (statement-aligned).
async function Cn(t) {
  let n = await P.joinOrCreate(`ghost`, { level: t, ...F() }, GhostState);
  await Promise.race([yn(n), new Promise((e) => setTimeout(e, 3e3))]);
  let r = e.get(n),
    i = Gt.get(n, { mode: `lerp`, delay: pn, name: `skaters` });
  return (
    i.attachAll(`skaters`, mn(pn)),
    { room: n, callbacks: r, predict: i }
  );
}
function wn(e) {
  let t = JSON.parse(e.meta),
    n = [...e.pieces.values()].map((e) => JSON.parse(e));
  return Oe(e.code, e.name, t, n);
}
async function Tn(e, t = !1) {
  return Dn(
    await P.joinOrCreate(t ? `daily` : `park`, { park: e, ...F() }, ParkState),
  );
}
async function En(e) {
  return Dn(await P.joinById(e, F(), ParkState));
}
async function Dn(t) {
  await yn(t);
  let n = e.get(t),
    r = re(wn(t.state)),
    i = Gt.get(t, { mode: `lerp`, delay: 110, name: `skaters` });
  return (
    i.attachAll(`skaters`, hn),
    { kind: `park`, room: t, callbacks: n, predict: i, world: r }
  );
}
async function On(e) {
  return e.kind === `hub`
    ? _n(await P.consumeSeatReservation(e.reservation, HubState))
    : Dn(await P.consumeSeatReservation(e.reservation, ParkState));
}
var quickChat = [
    `Sick!`,
    `Gnarly!`,
    `GG`,
    `Nice line!`,
    `Let's go!`,
    `Oops!`,
    `Wait up!`,
    `Follow me!`,
  ],
  emoteIds = [
    `flame`,
    `hand-horns`,
    `hand-shake`,
    `hand-clap`,
    `board`,
    `oops`,
    `hand-palm`,
    `hand-point`,
  ],
  jn = /[\u0000-\u001f\u007f-\u009f​-‏‪-‮⁦-⁩﻿]/g;
function Mn(e, t = 80) {
  return e.replace(jn, ``).replace(/\s+/g, ` `).trim().slice(0, t);
}
function Nn(e) {
  return typeof e == `string` ? Mn(e, 16) : ``;
}
var bannedWords = [
    `fuck`,
    `shit`,
    `bitch`,
    `cunt`,
    `dick`,
    `pussy`,
    `asshole`,
    `bastard`,
    `slut`,
    `whore`,
    `fag`,
    `nigg`,
    `retard`,
  ],
  Fn = {
    0: `o`,
    1: `i`,
    3: `e`,
    4: `a`,
    5: `s`,
    $: `s`,
    "@": `a`,
    7: `t`,
    "!": `i`,
  },
  maskChars = `#@$%&!*`;
function Ln(e) {
  let t = [...e.toLowerCase()].map((e) => Fn[e] ?? e),
    n = [...e],
    r = t.join(``);
  for (let e of bannedWords) {
    let t = r.indexOf(e);
    for (; t >= 0;) {
      for (let r = t; r < t + e.length; r++) n[r] !== ` ` && (n[r] = maskChars[r % 7]);
      t = r.indexOf(e, t + 1);
    }
  }
  return n.join(``);
}
var Rn = `Try another name`,
  zn = /\p{Extended_Pictographic}/u;
function Bn(e) {
  let t = Nn(e);
  return t
    ? t.includes(`#`) || zn.test(t) || Ln(t) !== t
      ? Rn
      : null
    : `Type a name or roll one`;
}
function Vn(e) {
  let t = 2166136261;
  for (let n = 0; n < e.length; n++)
    ((t ^= e.charCodeAt(n)), (t = Math.imul(t, 16777619)));
  return `#` + String((t >>> 0) % 1e4).padStart(4, `0`);
}
function Hn(e) {
  return `Player ${Vn(e).slice(1)}`;
}
function Un(e, t) {
  if (e.length >= 16) return null;
  if (t === ` `) return e && !e.endsWith(` `) ? e + ` ` : null;
  let n = !e || e.endsWith(` `);
  return e + (/[a-z]/i.test(t) ? (n ? t.toUpperCase() : t.toLowerCase()) : t);
}
function Wn(e, t, n) {
  let r = ee(ne(e.path), t),
    i = De(e, r.x, r.z);
  return { x: i.x, y: (e.y ?? 0) + r.y + n, z: i.z };
}
