// assets/padNav-a65kF6ol 01 — kind
// Lines 1-350 of readable/assets/padNav-a65kF6ol.pretty.js (statement-aligned).
import { b as e, x as t } from "./Client-CpE02kO_.js";
import { Q as n, Y as r } from "./table-W1plLavt.js";
import {
  E as i,
  Ht as a,
  J as o,
  K as s,
  M as c,
  N as l,
  Ut as u,
  at as d,
  b as f,
  bt as ee,
  gn as p,
  k as te,
  ot as m,
  qt as ne,
  un as h,
  vt as re,
  w as g,
  wt as ie,
  x as _,
  yn as v,
  z as y,
} from "./tagPaint-BOEtbgNi.js";
import { N as b, i as x } from "./juice-6UyTKeka.js";
import { i as S } from "./secrets-Czes5esN.js";
import { o as C, t as w } from "./sfx-6jovSU2-.js";
import { n as ae } from "./catalog-CGuOpeY8.js";
import { c as T, d as oe, i as E } from "./skaters-pUdq6stw.js";
var se = { IDLE: 0, LAUNCHING: 1 },
  ce = e(
    {
      name: t.string().default(``),
      skater: t.uint16().default(0),
      look: t.string().default(``),
      color: t.uint8().default(0),
      level: t.uint8().default(1),
      ready: t.boolean().default(!1),
      connected: t.boolean().default(!0),
      order: t.uint8().default(0),
      where: t.string().default(``),
      room: t.string().default(``),
    },
    `PartyMember`,
  ),
  le = e(
    {
      code: t.string().default(``),
      leader: t.string().default(``),
      dest: t.string().default(``),
      phase: t.uint8().default(0),
      members: t.map(ce),
    },
    `PartyState`,
  ),
  ue = { KICKED: 4410, REPLACED: 4411 },
  de = [`maker`, `daily`, `invite`, `community`];
function fe(e) {
  let t = e;
  if (typeof t == `string`) {
    if (!t) return { kind: `public` };
    try {
      t = JSON.parse(t);
    } catch {
      return null;
    }
  }
  if (!t || typeof t != `object`) return null;
  let n = t;
  if (n.kind === `public`) return { kind: `public` };
  if (
    n.kind !== `park` ||
    typeof n.code != `string` ||
    !ae.test(n.code) ||
    typeof n.via != `string` ||
    !de.includes(n.via)
  )
    return null;
  let r = { kind: `park`, code: n.code, via: n.via };
  return (
    typeof n.name == `string` && n.name && (r.name = n.name.slice(0, 28)),
    r
  );
}
function pe(e) {
  return e.connected && e.where === ``;
}
var D = `tailgrab-party`,
  me = 18e5,
  O = null,
  k = null,
  he = 0,
  A = null,
  j = null,
  M = new Set(),
  N = new Set(),
  P = new Set(),
  ge = {
    get view() {
      return k;
    },
    get connecting() {
      return j !== null;
    },
  };
function _e(e) {
  return (M.add(e), e(k), () => M.delete(e));
}
function ve(e) {
  return (N.add(e), e(j !== null), () => N.delete(e));
}
function ye(e) {
  return (P.add(e), () => P.delete(e));
}
var F = (e) => {
  for (let t of P) t(e);
};
function I(e, t = {}) {
  O?.connection.isOpen && O.send(e, t);
}
function be(e, t = ``) {
  I(`where`, { where: e, room: t });
}
function xe() {
  I(`set`, v());
}
function Se(e) {
  return d.link({ party: e });
}
function L(e) {
  let t = (j ?? Promise.resolve())
      .catch(() => {})
      .then(e)
      .finally(() => {
        if (j === t) {
          j = null;
          for (let e of N) e(!1);
        }
      }),
    n = j;
  if (((j = t), !n)) for (let e of N) e(!0);
  return t;
}
function Ce() {
  return L(async () => {
    O || (await y(), await B(await p.create(`party`, v(), le)));
  });
}
function R(e) {
  return L(async () => {
    if (k?.code === e) return;
    await y();
    let t = await p.joinById(e, v(), le);
    (z(!0), await B(t));
  });
}
async function we() {
  let e = Ee();
  if (!(O || !e || Date.now() - e.at > me))
    try {
      await R(e.code);
    } catch {
      U(null);
    }
}
function z(e = !1) {
  let t = O;
  t && (V(), U(null), t.leave(!0).catch(() => {}), e || H());
}
function B(e) {
  ((O = e),
    U({ code: e.roomId, at: Date.now() }),
    (A = setInterval(() => {
      O && U({ code: O.roomId, at: Date.now() });
    }, 3e4)));
  let t = new Map();
  return (
    e.onStateChange(() => {
      if (O !== e) return;
      let n = new Map(
        [...e.state.members.entries()].map(([e, t]) => [e, t.name]),
      );
      if (t.size) {
        let r = new Set(t.values()),
          i = new Set(n.values());
        for (let [t, i] of n)
          t !== e.sessionId &&
            i &&
            !r.has(i) &&
            F({
              kind: `toast`,
              text: `${i} joined your party!`,
              tone: `mint`,
              icon: `popper`,
            });
        for (let e of r)
          i.has(e) ||
            F({ kind: `toast`, text: `${e} left the party`, tone: `white` });
      }
      (n.size && (t = n), H());
    }),
    e.onMessage(`go`, (e) => {
      let t = fe(e.dest);
      t &&
        F({
          kind: `go`,
          go: { kind: e.kind, reservation: e.reservation, dest: t },
        });
    }),
    e.onMessage(`launchFailed`, (e) =>
      F({ kind: `failed`, text: e.text, sids: e.sids ?? [] }),
    ),
    e.onMessage(`kicked`, () => {}),
    e.onMessage(`replaced`, () => {}),
    e.onLeave((t) => {
      O === e &&
        (V(),
        U(null),
        H(),
        t === ue.KICKED
          ? F({
              kind: `toast`,
              text: `You were removed from the party`,
              tone: `red`,
            })
          : t === ue.REPLACED
            ? F({
                kind: `toast`,
                text: `Your party moved to another tab`,
                tone: `white`,
              })
            : F({
                kind: `toast`,
                text: `Lost the party connection`,
                tone: `red`,
              }));
    }),
    H(),
    new Promise((t) => {
      let n = () => {
          (M.delete(r), clearTimeout(i), t());
        },
        r = (t) => {
          (t || O !== e) && n();
        },
        i = setTimeout(n, 5e3);
      (M.add(r), r(k));
    })
  );
}
function V() {
  (A && clearInterval(A), (A = null), (O = null));
}
function H() {
  k = O ? Te(O) : null;
  for (let e of M) e(k);
}
function Te(e) {
  let t = e.state,
    n = [...t.members.entries()]
      .map(([n, r]) => ({
        sid: n,
        name: r.name,
        skater: r.skater,
        look: r.look,
        color: r.color,
        level: r.level,
        ready: r.ready,
        connected: r.connected,
        where: r.where,
        room: r.room,
        order: r.order,
        leader: n === t.leader,
        me: n === e.sessionId,
        present: pe(r),
      }))
      .sort((e, t) => e.order - t.order),
    r = n.find((e) => e.me);
  return r
    ? {
        code: t.code,
        me: r,
        leader: n.find((e) => e.leader) ?? null,
        isLeader: r.leader,
        dest: fe(t.dest) ?? { kind: `public` },
        launching: t.phase === se.LAUNCHING,
        members: n,
        v: ++he,
      }
    : null;
}
function Ee() {
  try {
    let e = JSON.parse(localStorage.getItem(D) ?? `null`);
    return e && typeof e.code == `string` && typeof e.at == `number`
      ? { code: e.code, at: e.at }
      : null;
  } catch {
    return null;
  }
}
function U(e) {
  try {
    e ? localStorage.setItem(D, JSON.stringify(e)) : localStorage.removeItem(D);
  } catch {}
}
var W = d.ads.kind === `off` ? `off` : d.ads.kind,
  G = () => W !== `poki` && ne(s.profile),
  De = () => G() || W !== `off`;
function Oe(e, t, n = `UNLOCK`, r = `WATCH AD`) {
  if (G()) return g(n, e, t);
  let i = g(r, e, t);
  return (i.prepend(b(`play`)), i);
}
var ke = 5;
function Ae() {
  (m.hold(`ad`),
    w.pause(!0),
    document.pointerLockElement && document.exitPointerLock());
  let e = [...document.querySelectorAll(`.page, .modal-back`)].filter(
    (e) => !e.inert,
  );
  for (let t of e) t.inert = !0;
  return () => {
    for (let t of e) t.inert = !1;
    (w.pause(!1), m.release(`ad`));
  };
}
async function K() {
  if (G()) return !0;
  if (W === `off`) return !1;
  let e = Ae(),
    t = performance.now();
  try {
    return W === `fake` ? await Me() : await d.ads.rewarded();
  } finally {
    (e(), x(`reward`), x(`rewardS`, Math.round((performance.now() - t) / 1e3)));
  }
}
async function je() {
  if (d.ads.kind === `off` || G()) return;
  let e = Ae(),
    t = performance.now();
  try {
    await d.ads.interstitial();
  } finally {
    (e(), x(`break`), x(`breakS`, Math.round((performance.now() - t) / 1e3)));
  }
}
