// assets/tagPaint-BOEtbgNi 11 — http
// Lines 4445-4783 of readable/assets/tagPaint-BOEtbgNi.pretty.js (statement-aligned).
function Ai(e, t, n) {
  let r = (e) => e.replace(/[/^]/g, `-`);
  try {
    Ci()?.measure?.(r(e), r(t), r(n));
  } catch {}
}
async function ji(e) {
  return Mi(e);
}
function Mi(e) {
  let t = new URL(location.origin + location.pathname);
  for (let [n, r] of Object.entries(e)) t.searchParams.set(n, r);
  return t.href;
}
function Ni(e, t = new URLSearchParams(location.search)) {
  return t.get(`gd${e}`) ?? t.get(e);
}
var Pi = {
    id: `web`,
    init: Ti,
    loaded: Ei,
    playing: Di,
    measure(e, t, n) {
      (Ai(e, t, n), window.gtag?.(`event`, `${e}_${n}`, { what: t }));
    },
    ads: { kind: `off`, rewarded: ki, interstitial: Oi },
    link: ji,
    href: Mi,
    param: Ni,
    store: null,
    signIns: [],
    signIn: async () => null,
    account: null,
    haptic: (e) => void navigator.vibrate?.(e),
    onPause: () => {},
    freeChat: !0,
    linksOut: !0,
    ownsFullscreen: !1,
    reloadOnChunkError: !0,
  },
  Z = { account: null, profile: null },
  Fi = new Set();
function Ii(e) {
  return (Fi.add(e), () => Fi.delete(e));
}
function Q(e, t = []) {
  Z.profile = Pr(e);
  for (let e of Fi) e(Z.profile, t);
}
var Li = 0,
  Ri = (e) => {
    typeof e == `number` && (Li = e - Date.now());
  },
  zi = () => Date.now() + Li,
  Bi = async () => (await P.http.get(`/me`)).data;
function Vi(e) {
  (Ri(e.now),
    (Z.account = {
      id: e.id,
      email: e.email,
      anonymous: e.anonymous,
      poki: !!e.poki,
      apple: !!e.apple,
      google: !!e.google,
    }),
    Q(e.profile, e.events ?? []));
}
async function Hi() {
  Vi(await Bi());
}
async function Ui(e) {
  try {
    let t = (await P.http.post(`/auth/poki`, { body: { token: e } })).data;
    P.auth.token = t.token;
    try {
      localStorage.setItem(P.auth.settings.key, t.token);
    } catch {}
  } catch (e) {
    console.warn(
      `[account] Poki sign-in failed, keeping this browser's account`,
      e,
    );
  }
}
var Wi = (e) => e?.code,
  Gi = null;
function Ki(e = 5e3) {
  return (Gi ??= (async () => {
    let t = async () => {
        let e = Pi.account ? await Pi.account.player(2e3) : void 0;
        if ((e && (await Ui(e.token)), P.auth.token))
          try {
            let t = await Bi();
            if (!(e === null && t.poki)) {
              Vi(t);
              return;
            }
          } catch (e) {
            if (Wi(e) !== 401) throw e;
          }
        (await P.auth.signInAnonymously(), await Hi());
      },
      n,
      r = new Promise((t, r) => {
        n = setTimeout(() => r(Error(`account timeout`)), e);
      });
    try {
      await Promise.race([t(), r]);
    } catch (e) {
      console.warn(`[account] playing as a guest without progress`, e);
    } finally {
      clearTimeout(n);
    }
  })());
}
function qi() {
  return ia(async () => {
    try {
      await Hi();
    } catch (e) {
      console.warn(`[account] refresh failed`, e);
    }
  });
}
async function Ji(e, t) {
  return (await P.http.post(`/me/stats`, { body: { stat: e, delta: t } })).data
    .profile;
}
async function Yi(e, t) {
  let n = (await P.http.post(`/me/look`, { body: { look: se(e), style: t } }))
    .data;
  Q(n.profile);
}
async function Xi(e, t = !1) {
  let n = (await P.http.post(`/me/name`, { body: { name: e, ad: t } })).data;
  Q(n.profile);
}
var Zi = () => (Z.account ? Vn(Z.account.id) : ``),
  Qi = () => !!Z.account && si(Z.profile, Z.account.id);
async function $i(e) {
  let t = (await P.http.post(`/me/ad-unlock`, { body: { key: e } })).data;
  Q(t.profile, t.events);
}
async function ea(e) {
  let t = (await P.http.post(`/me/cheat`, { body: { cheat: e } })).data;
  Q(t.profile);
}
async function ta(e) {
  let t = (await P.http.post(`/me/shop/buy`, { body: { key: e } })).data;
  Q(t.profile);
}
async function na(e) {
  let t = (await P.http.post(`/me/shop/ad-coins`, { body: { key: e } })).data;
  return (
    Ri(t.now),
    Q(t.profile),
    t.events.reduce((e, t) => e + (t.kind === `coins` ? t.gained : 0), 0)
  );
}
var ra = Promise.resolve();
function ia(e) {
  let t = ra.then(e);
  return ((ra = t.catch(() => {})), t);
}
function aa(e, t) {
  return ia(async () => {
    let n = (await P.http.post(e, { body: t })).data;
    return (Ri(n.now), n);
  });
}
async function oa(e, t, n) {
  let r = await aa(e, t),
    i = Z.profile;
  return (
    Q(r.profile, r.events.some((e) => e.kind === n) ? [] : r.events),
    { ...r, was: i }
  );
}
function sa(e, t) {
  return oa(`/me/missions/claim`, { cadence: e, i: t }, `claimed`);
}
function ca(e) {
  return oa(`/me/missions/crate`, { cadence: e }, `crate`);
}
async function la(e) {
  let t = await aa(`/me/missions/reroll`, { i: e });
  Q(t.profile, t.events);
}
async function ua(e, t) {
  (await P.auth.registerWithEmailAndPassword(e, t), await Hi());
}
async function da(e, t) {
  (await P.auth.signInWithEmailAndPassword(e, t), location.reload());
}
async function fa() {
  (await P.auth.signOut(), location.reload());
}
async function pa(e) {
  let t = await Pi.signIn(e);
  if (!t) return !1;
  let n = (await P.http.post(`/auth/${e}`, { body: { idToken: t } })).data;
  P.auth.token = n.token;
  try {
    localStorage.setItem(P.auth.settings.key, n.token);
  } catch {}
  return (location.reload(), !0);
}
async function ma() {
  (await P.http.post(`/me/delete`, { body: { confirm: `DELETE` } }),
    await fa());
}
async function ha(e) {
  return (await P.http.get(`/boards/:id`, { params: { id: e } })).data;
}
async function ga(e) {
  return (await P.http.get(`/replays/:id`, { params: { id: e } })).data;
}
async function _a(e) {
  return (await P.http.get(`/boards/:id/best`, { params: { id: e } })).data
    .best;
}
function va(e) {
  let t = e?.message ?? String(e);
  return (
    {
      invalid_credentials: `Wrong email or password.`,
      email_already_in_use: `That email already has an account — sign in instead.`,
      email_malformed: `That doesn't look like an email.`,
      password_too_short: `Password needs at least 6 characters.`,
    }[t] ?? t
  );
}
function $(e, t = ``, n = ``) {
  let r = document.createElement(e);
  return (t && (r.className = t), n && (r.textContent = n), r);
}
function ya(e, t, n) {
  let r = $(`button`, `btn ${t}`, e);
  return (
    (r.type = `button`),
    r.addEventListener(`click`, (e) => {
      (e.stopPropagation(), n());
    }),
    r
  );
}
function ba(e, t = `pop`) {
  (e.classList.remove(t), e.offsetWidth, e.classList.add(t));
}
function xa(e, t, n) {
  let r = [...e.children];
  return (
    r.length === t.length &&
    (t.forEach((e, t) => {
      let i = r[t];
      if (
        (i.dataset.nest !== void 0 &&
          e.dataset.nest !== void 0 &&
          xa(i, [...e.children], n)) ||
        (e.dataset.key &&
          i.dataset.key === e.dataset.key &&
          (n?.(i) || i.dataset.sig === e.dataset.sig))
      )
        return;
      let a = document.activeElement === i;
      (e.classList.add(`swapped`),
        i.replaceWith(e),
        a && e.focus({ preventScroll: !0 }));
    }),
    !0)
  );
}
function Sa(e) {
  let t = Math.max(0, Math.ceil(e / 1e3));
  return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, `0`)}`;
}
var Ca = () => document.getElementById(`ui`),
  wa = () =>
    matchMedia(`(prefers-reduced-motion: reduce)`).matches ||
    document.body.classList.contains(`reduce-motion`);
function Ta(e, t, n = ``, r) {
  let i = $(`div`, `modal-back interactive`),
    a = $(`div`, `card modal ${n}`),
    o = $(`div`, `modal-head`),
    s = $(`div`, `modal-body`),
    c = $(`div`, `modal-foot`),
    l = (e) => {
      e.key === `Escape` && u();
    },
    u = () => {
      i.isConnected &&
        (i.remove(), window.removeEventListener(`keydown`, l), r?.());
    },
    d = ya(`✕`, `icon-btn modal-x`, u);
  return (
    d.setAttribute(`aria-label`, `Close`),
    o.append($(`h2`, ``, t), d),
    a.append(o, s, c),
    i.append(a),
    i.addEventListener(`click`, (e) => {
      e.target === i && u();
    }),
    window.addEventListener(`keydown`, l),
    e.append(i),
    { body: s, foot: c, close: u }
  );
}
var Ea = [
    [0, `ollie`],
    [2, `flip`],
    [1, `grab`],
    [3, `grind`],
    [4, `spinL`],
    [5, `spinR`],
    [8, `reset`],
    [10, `walk`],
    [12, `up`],
    [13, `down`],
    [14, `left`],
    [15, `right`],
  ],
  Da = [],
  Oa = !1,
  ka = null;
function Aa() {
  let e = navigator.getGamepads?.() ?? [],
    t =
      [...e].find((e) => e && e.connected && e.mapping === `standard`) ??
      [...e].find((e) => e?.connected) ??
      null;
  return (
    (ka = t
      ? /054c|playstation|dualsense|dualshock/i.test(t.id)
        ? `playstation`
        : `xbox`
      : null),
    t
  );
}
