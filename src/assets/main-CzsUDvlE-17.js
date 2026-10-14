// assets/main-CzsUDvlE 17 — append
// Lines 5019-5318 of readable/assets/main-CzsUDvlE.pretty.js (statement-aligned).
function Al(e, t, n) {
  let r = j(`section`, `pk-col pk-community`),
    i = j(`div`, `pk-top`),
    a = j(`div`, `chips pk-sorts`);
  ((a.dataset.padTabs = ``), i.append(j(`span`, `pk-kicker`, `Community`), a));
  let o = j(`div`, `pk-grid`);
  r.append(i, o);
  let s = null;
  Jc().then(
    ({ park: r, endsAt: i }) => {
      if (!r || t.aborted) return;
      ((s = kl(r, 0, () => e({ code: r.code, name: r.name, via: `daily` }))),
        s.classList.add(`pk-daily`),
        s
          .querySelector(`.pk-art`)
          .append(j(`span`, `pk-ribbon`, `MAP OF THE DAY`)));
      let a = j(`span`, `pk-clock`);
      a.append(U(`clock`), j(`span`));
      let l = () => {
        a.lastElementChild.textContent = `new map in ${vl(i - vn())}`;
      };
      l();
      let u = setInterval(l, 3e4);
      (t.addEventListener(`abort`, () => clearInterval(u)),
        s.querySelector(`.pk-words`).append(a),
        o.querySelector(`.pk-card[data-code="${r.code}"]`)?.remove(),
        o.prepend(s),
        n && c(s));
    },
    () => {},
  );
  let c = (e) => {
      (o
        .querySelectorAll(`[data-autofocus]`)
        .forEach((e) => delete e.dataset.autofocus),
        (e.dataset.autofocus = ``));
    },
    l = 0,
    u = async (r) => {
      let i = ++l,
        u = o.contains(document.activeElement);
      (a
        .querySelectorAll(`.chip`)
        .forEach((e) => e.classList.toggle(`on`, e.dataset.sort === r)),
        o.replaceChildren(...(s ? [s] : []), H(`Loading…`)),
        (o.scrollTop = 0));
      try {
        let a = (await Wc(r)).filter((e) => e.code !== s?.dataset.code);
        if (i !== l || t.aborted) return;
        let d = a.map((t, n) =>
          kl(t, n + 1, () =>
            e({ code: t.code, name: t.name, via: `community` }),
          ),
        );
        (n && (s ?? d[0]) && c(s ?? d[0]),
          o.replaceChildren(
            ...(s ? [s] : []),
            ...(d.length
              ? d
              : [
                  H(
                    r === `live`
                      ? `Nobody's skating a community park right now. Try Top or New.`
                      : `No published parks yet. Build one and publish it!`,
                  ),
                ]),
          ),
          u && o.querySelector(`.pk-card`)?.focus({ preventScroll: !0 }));
      } catch (e) {
        i === l &&
          !t.aborted &&
          o.replaceChildren(H(`Couldn't load parks: ${P(e)}`));
      }
    };
  for (let [e, t] of [
    [`top`, `Top`],
    [`new`, `New`],
    [`live`, `Live now`],
  ]) {
    let n = j(`button`, `chip`, t);
    ((n.type = `button`),
      (n.dataset.sort = e),
      n.addEventListener(`click`, () => void u(e)),
      a.append(n));
  }
  return (u(`top`), r);
}
function jl(e, t, n) {
  let r = j(`section`, `pk-col pk-yours`),
    i = j(`span`, `pk-count`),
    a = j(`div`, `pk-top`);
  a.append(j(`span`, `pk-kicker`, `Your parks`), i);
  let o = j(`div`, `pk-new`),
    s = j(`input`, `field line`);
  ((s.placeholder = `Name your park`), (s.maxLength = 28), (s.spellcheck = !1));
  let c = j(`div`, `pf-err`),
    l = V(``, `primary pk-make`, async () => {
      ((l.disabled = !0), (c.textContent = ``));
      try {
        let t = s.value.trim() || `${N.profile?.name || `My`}'s Park`;
        e({ code: await Kc(t), name: t, via: `maker` });
      } catch (e) {
        ((c.textContent = P(e)), (l.disabled = !1));
      }
    });
  (l.append(U(`build`), j(`span`, ``, `NEW PARK`)),
    n && (l.dataset.autofocus = ``),
    s.addEventListener(`keydown`, (e) => {
      (e.stopPropagation(), e.key === `Enter` && l.click());
    }),
    o.append(s, l));
  let u = j(`div`, `pk-mine`),
    d = j(`div`, `pk-join`),
    f = fr((t) => e({ code: t, via: `invite` }));
  (d.append(
    j(`span`, `pk-join-label`, `Got a park code?`),
    f.el,
    V(`JOIN`, `secondary`, f.go),
  ),
    r.append(a, o, c, u, d));
  let p = (t, n) => {
      let r = j(`div`, `pk-row`);
      r.style.setProperty(`--i`, String(n));
      let i = j(`span`, `pk-state`);
      (i.append(
        j(
          `span`,
          t.published ? `pk-pub` : `pk-draft`,
          t.published ? `Published` : `Draft`,
        ),
      ),
        t.players && i.append(Ol(t.players)));
      let a = 0,
        o = V(``, `tiny ghost pk-del`, async () => {
          if (Date.now() > a) {
            ((a = Date.now() + 3e3),
              o.replaceChildren(`DELETE?`),
              o.classList.add(`armed`),
              setTimeout(() => {
                Date.now() > a &&
                  o.isConnected &&
                  (o.replaceChildren(U(`trash`)), o.classList.remove(`armed`));
              }, 3100));
            return;
          }
          a = 0;
          try {
            (await qc(t.code), m());
          } catch (e) {
            c.textContent = P(e);
          }
        });
      return (
        o.append(U(`trash`)),
        o.setAttribute(`aria-label`, `Delete ${t.name}`),
        r.append(
          gl(t.code, t.updatedAt, `pk-mini`),
          j(`b`, `pk-name`, t.name),
          i,
          V(`OPEN`, `primary pk-open`, () =>
            e({ code: t.code, name: t.name, via: `maker` }),
          ),
          o,
        ),
        r
      );
    },
    m = async () => {
      if ((await In(), !t.aborted)) {
        if (!N.account) {
          u.replaceChildren(
            H(
              `Building needs an account, and the server didn't hand us one. Reload to try again.`,
            ),
          );
          return;
        }
        u.childElementCount || u.replaceChildren(H(`Loading…`));
        try {
          let e = await Gc();
          if (t.aborted) return;
          ((i.textContent = e.length ? String(e.length) : ``),
            u.replaceChildren(
              ...(e.length
                ? e.map(p)
                : [H(`Nothing built yet: name a park and hit NEW PARK.`)]),
            ));
        } catch (e) {
          t.aborted ||
            u.replaceChildren(H(`Couldn't load your parks: ${P(e)}`));
        }
      }
    };
  return (m(), r);
}
function Ml(e = {}) {
  return {
    id: `ranks`,
    title: `Ranks`,
    hue: `#FF8A1F`,
    build(t) {
      let n = [
          [`xp`, `XP`],
          [`combo`, `Best combo`],
          ...ln.map((e) => [`run:${e.id}`, e.name]),
        ],
        r = j(`div`, `chips`),
        i = j(`div`, `rank-list`),
        a = 0,
        o = async (o) => {
          let s = ++a;
          (r
            .querySelectorAll(`.chip`)
            .forEach((e) => e.classList.toggle(`on`, e.dataset.id === o)),
            i.replaceChildren(H(`Loading…`)));
          try {
            let r = await It(o);
            if (s !== a || t.signal.aborted) return;
            (i.replaceChildren(),
              r.rows.length || i.append(H(`Nobody here yet. Be the first!`)),
              (r.me ? [...r.rows, r.me] : r.rows).forEach((a, s) => {
                a === r.me && i.append(j(`div`, `rank-gap`, `⋯`));
                let c = j(
                  `div`,
                  `rank-row ${a.me ? `me` : ``} ${a.rank <= 3 ? `top top-${a.rank}` : ``}`,
                );
                c.style.setProperty(`--i`, String(s));
                let l = j(`span`, `rank-name`, a.name || `Skater`);
                (a.tag && l.append(j(`span`, `rank-tag`, a.tag)),
                  c.append(
                    j(`span`, `rank-n`, String(a.rank)),
                    l,
                    j(`span`, `rank-score`, a.score.toLocaleString()),
                  ));
                let u = e.watch === !1 ? void 0 : a.replay;
                if (u) {
                  let e = j(`button`, `rank-watch`);
                  ((e.type = `button`),
                    (e.title = `Watch the replay`),
                    e.append(U(`play`)));
                  let r = n.find(([e]) => e === o)?.[1] ?? ``;
                  (e.addEventListener(
                    `click`,
                    () =>
                      void t.push(
                        me(
                          () =>
                            import(`./replay-_5kwzkRi.js`).then((e) =>
                              e.replayPage(
                                {
                                  replay: u,
                                  name: a.name || `Skater`,
                                  score: a.score,
                                  rank: a.rank,
                                },
                                r,
                              ),
                            ),
                          __vite__mapDeps([
                            28, 1, 7, 4, 2, 3, 5, 6, 8, 9, 13, 10, 11, 12, 14,
                            15, 16, 17, 18, 19, 20, 29, 30, 31, 21, 22, 32, 24,
                            33, 27,
                          ]),
                        ),
                      ),
                  ),
                    c.append(e));
                } else c.append(j(`span`, `rank-watch-none`));
                i.append(c);
              }));
          } catch (e) {
            s === a && i.replaceChildren(H(`Couldn't load the board: ${P(e)}`));
          }
        };
      for (let [e, t] of n) {
        let n = j(`button`, `chip`, t);
        ((n.type = `button`),
          (n.dataset.id = e),
          n.addEventListener(`click`, () => void o(e)),
          r.append(n));
      }
      (t.body.append(r, i), o(`xp`));
    },
  };
}
var Nl = [
  [`up`, `Forward / trick ↑`],
  [`down`, `Brake / trick ↓`],
  [`left`, `Turn left`],
  [`right`, `Turn right`],
  [`ollie`, `Ollie`],
  [`flip`, `Flip`],
  [`grab`, `Grab`],
  [`grind`, `Grind / lip`],
  [`spinL`, `Spin left`],
  [`spinR`, `Spin right`],
  [`reset`, `Reset`],
  [`look`, `Look back`],
  [`walk`, `Walk / ride`],
];
