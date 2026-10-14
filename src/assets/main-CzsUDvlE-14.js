// assets/main-CzsUDvlE 14 — append
// Lines 4099-4442 of readable/assets/main-CzsUDvlE.pretty.js (statement-aligned).
function Dc(e, t) {
  let n = j(`div`, `pf`);
  e.append(n);
  let r = j(`div`, `pf-side`),
    i = Oc();
  if ((Lo && r.append(V(`PACKS`, `primary`, t)), !N.profile))
    return (
      n.append(H(`No account yet: progress isn't being saved.`), r),
      i && r.append(i),
      { live: !1, sync() {}, dispose() {} }
    );
  let a = j(`div`, `pf-hero`),
    o = j(`div`, `pf-name`),
    s = ka(),
    c = j(`span`, `lvl-tier`),
    l = j(`div`, `pf-meta`);
  a.append(o, s, c, l);
  let u = j(`div`, `pf-main`),
    d = new StatPointsBank(),
    f = `+${+(Zi * 100).toFixed(1)}%`;
  u.append(
    d.el,
    j(
      `p`,
      `page-text sp-how`,
      `Every point adds ${f} to one stat, on top of your level. It kicks in as soon as you're rolling (portal matches run on level alone), and you can take one back any time.`,
    ),
  );
  let p = j(`div`, `pf-nums`),
    m = profileStats.map(([e]) => {
      let t = j(`div`, `pf-num`),
        n = j(`b`, ``);
      return (t.append(n, j(`span`, ``, e)), p.append(t), n);
    });
  (r.append(W(`Lifetime`), p), i && r.append(i), n.append(a, u, r));
  let h = () => {
    let e = N.profile;
    if (!e) return;
    o.textContent = e.name || J.name || `Skater`;
    let t = xn();
    t && o.append(j(`span`, `pf-tag`, t));
    let n = ka();
    (s.replaceWith(n), (s = n));
    let r = Ft(e.xp).level,
      i = Na(r);
    ((c.dataset.tier = String(Ma(r))),
      (c.textContent = i.name),
      (c.title = i.range),
      l.replaceChildren(
        j(
          `span`,
          ``,
          Da(r) ?? `Full speed and pop: your level's maxed out the ramp`,
        ),
      ));
    let a = Ca();
    if (a) {
      let e = j(`span`, `pf-next`);
      (e.append(j(`b`, ``, `Next unlock`), ` ${a}`), l.append(e));
    }
    profileStats.forEach(([, t], n) => {
      m[n].textContent = t(e);
    });
  };
  return (h(), { live: !0, sync: h, dispose: () => d.dispose() });
}
function Oc() {
  let e = I.account;
  if (e && !e.answered()) return null;
  let t = j(`div`, `pf-acct`);
  return (e ? Nc(t, e) : Ac(t, null), N.account && t.append(kc()), t);
}
function kc() {
  let e = j(`div`, `pf-del`),
    t = j(`div`, `pf-err`);
  return (
    e.append(
      V(`DELETE ACCOUNT`, `ghost pf-del-open`, () => {
        let n = si(`DELETE FOREVER`, `danger`, async () => {
          t.textContent = ``;
          try {
            await kt();
          } catch (e) {
            t.textContent = `Couldn't delete it: ${P(e)}`;
          }
        });
        e.replaceChildren(
          W(`Delete account`),
          j(
            `p`,
            `page-text`,
            `Your level, skaters, Your Style, parks and board scores are deleted for good, and this device starts over as a new guest. Store packs aren't lost: Restore Purchases brings them back to any account.`,
          ),
          n,
          t,
        );
      }),
    ),
    e
  );
}
function Ac(e, t) {
  e.replaceChildren();
  let n = N.account;
  if (!n) {
    e.append(
      W(`Account`),
      H(`The account server didn't answer. Reload to try again.`),
    );
    return;
  }
  let r = (t) => Ac(e, t),
    i = j(`div`, `pf-acts`),
    a = j(`div`, `pf-err`),
    o = I.signIns.find((e) => n[e]),
    s = I.id === `app` ? `on this device` : `in this browser`;
  if (n.anonymous && !o) {
    let n = I.signIns.includes(`apple`);
    e.append(
      W(`Save your progress`),
      j(
        `p`,
        `page-text`,
        `You're skating as a guest: progress lives ${s} only. ${n ? `Sign in with Apple, or add an email and password,` : `Add an email and password`} to keep it and use it on other devices.`,
      ),
    );
    for (let e of I.signIns) i.append(Mc(e, a));
    t === `claim`
      ? e.append(Pc(`SAVE MY PROGRESS`, pt, () => r(null)))
      : i.append(
          V(`SAVE MY PROGRESS`, I.signIns.length ? `ghost` : `primary`, () =>
            r(`claim`),
          ),
        );
  } else {
    let t = o ? `with ${oauthProviders[o]}` : `as ${n.email ?? `your account`}`;
    e.append(
      W(`Account`),
      j(
        `p`,
        `page-text`,
        `Signed in ${t}. Your progress follows you to any device you sign in on.`,
      ),
    );
    for (let e of I.signIns) n[e] || i.append(Mc(e, a, !0));
    i.append(V(`SIGN OUT`, `ghost`, () => void un()));
  }
  (t !== `signin` &&
    i.append(
      V(
        n.anonymous && !o ? `I HAVE AN ACCOUNT` : `SWITCH ACCOUNT`,
        `ghost`,
        () => r(`signin`),
      ),
    ),
    e.append(i, a),
    t === `signin` &&
      (e.append(W(n.anonymous ? `Already have an account?` : `Switch account`)),
      n.anonymous &&
        e.append(
          j(
            `p`,
            `page-text`,
            `Signing in swaps to that account; this guest's progress stays behind.`,
          ),
        ),
      e.append(Pc(`SIGN IN`, Cn))),
    e.querySelector(`input`)?.focus());
}
var oauthProviders = { apple: `Apple`, google: `Google` };
function Mc(e, t, n = !1) {
  let r = V(
    `${n ? `LINK` : `SIGN IN WITH`} ${oauthProviders[e].toUpperCase()}`,
    `signin-${e}`,
    async () => {
      ((t.textContent = ``), (r.disabled = !0));
      try {
        await lt(e);
      } catch (n) {
        t.textContent = `${oauthProviders[e]} sign-in didn't finish: ${P(n)}`;
      }
      r.disabled = !1;
    },
  );
  return r;
}
function Nc(e, t) {
  let n = N.account;
  if (!n) {
    e.append(
      W(`Account`),
      H(`The account server didn't answer. Reload to try again.`),
    );
    return;
  }
  if (n.poki) {
    let n = t.username();
    (e.append(W(`Saved with Poki`)),
      e.append(
        j(
          `p`,
          `page-text`,
          `Your progress is saved to your Poki account${n ? ` (${n})` : ``} and follows you to any device you log in on.`,
        ),
      ));
    return;
  }
  (e.append(W(`Save your progress`)),
    e.append(
      j(
        `p`,
        `page-text`,
        `You're skating as a guest: progress lives in this browser only. Log in to Poki to keep it and play it on any device.`,
      ),
    ));
  let r = j(`div`, `pf-err`),
    i = V(`LOG IN WITH POKI`, `primary`, async () => {
      ((r.textContent = ``),
        (i.disabled = !0),
        (await t.login()) || (r.textContent = `The Poki login didn't finish.`),
        (i.disabled = !1));
    });
  e.append(i, r);
}
function Pc(e, t, n) {
  let r = j(`form`, `pf-form`),
    i = j(`input`, `field line`);
  ((i.type = `email`), (i.placeholder = `email`), (i.autocomplete = `email`));
  let a = j(`input`, `field line`);
  ((a.type = `password`),
    (a.placeholder = `password (6+ characters)`),
    (a.autocomplete = e === `SIGN IN` ? `current-password` : `new-password`));
  let o = j(`div`, `pf-err`),
    s = V(e, `primary`, () => r.requestSubmit());
  return (
    r.addEventListener(`submit`, async (e) => {
      (e.preventDefault(), (o.textContent = ``), (s.disabled = !0));
      try {
        (await t(i.value.trim(), a.value), n?.());
      } catch (e) {
        o.textContent = P(e);
      } finally {
        s.disabled = !1;
      }
    }),
    a.addEventListener(`keydown`, (e) => {
      e.key === `Enter` && r.requestSubmit();
    }),
    r.append(i, a, s, o),
    r
  );
}
var Fc = Ki.find((e) => Qe(e.id)?.kind === `complete`),
  Ic = {
    head: `head`,
    top: `top`,
    bottom: `bottoms`,
    hat: `hat`,
    acc: `accessory`,
  };
function Lc(e) {
  for (let [t, n] of Object.entries(ze)) {
    let r = n.find((t) => bn(t.unlock) === e);
    if (r) return { cat: t, item: r };
  }
  return null;
}
function Rc(e) {
  return (
    ln.find((t) => nt(e, t.id) && !Mt(e, t.id)) ??
    [...ln].reverse().find((t) => nt(e, t.id)) ??
    ln[0]
  );
}
function zc() {
  return {
    id: `career`,
    title: `Career`,
    hue: `#A55BFF`,
    build(e) {
      let t = null,
        n = j(`div`, `road`),
        r = j(`div`, `lv-detail`),
        i = ``,
        a = (n) => {
          let a = ln.find((e) => e.id === t) ?? ln[0],
            o = [
              a.id,
              nt(n, a.id),
              Fn(n, a.id).join(),
              n.career[a.id]?.best ?? 0,
              Et(n).earned,
              gn(n, 1),
              ft(n).size,
            ].join(`|`);
          o !== i &&
            ((i = o),
            r.replaceChildren(
              ...Uc(n, a, ln.indexOf(a), () => e.resolve(a.id)),
            ));
        },
        o = (e) => {
          if (e !== t && N.profile) {
            t = e;
            for (let t of n.querySelectorAll(`.lv-tile`))
              t.classList.toggle(`on`, t.dataset.level === e);
            a(N.profile);
          }
        },
        s = () => {
          let i = N.profile;
          if (!i) {
            e.body.replaceChildren(H(`Loading your career…`));
            return;
          }
          ((t ??= Rc(i).id), Bc(e, i));
          let s = n.scrollLeft,
            c = ln.flatMap((e, n) => [
              ...(n > 0 && (e.tour ?? 1) !== (ln[n - 1].tour ?? 1)
                ? [Vc(e.tour ?? 1)]
                : []),
              Hc(i, e, n, e.id === t, () => o(e.id)),
            ]);
          (St(n, c) || n.replaceChildren(...c),
            (n.scrollLeft = s),
            a(i),
            n.isConnected ||
              (e.body.replaceChildren(n, r),
              requestAnimationFrame(() => {
                let e = n.querySelector(`.on`);
                e &&
                  (n.scrollLeft =
                    e.offsetLeft - (n.clientWidth - e.offsetWidth) / 2);
              })));
        };
      (e.own(M(s)),
        N.profile ||
          In().then(() => {
            e.signal.aborted || s();
          }),
        s());
    },
  };
}
