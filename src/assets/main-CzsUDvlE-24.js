// assets/main-CzsUDvlE 24 — kind
// Lines 7097-7433 of readable/assets/main-CzsUDvlE.pretty.js (statement-aligned).
function Tu(e, t = {}) {
  return new Promise((n) => {
    let r = t.park && Wn(t.park) ? t.park : ``,
      i = r ? { kind: `park`, code: r, via: `invite` } : { kind: `public` };
    J.name || (J.name = vi());
    let a = () => {},
      o = t.toast ?? (() => {}),
      s = !1,
      c = (e) =>
        me(
          () =>
            import(`./tag-BoiZZ9xV.js`).then((t) =>
              t.tagPage({ skater: ai(), color: J.color, rename: e }),
            ),
          __vite__mapDeps([
            34, 10, 11, 5, 6, 7, 1, 8, 12, 13, 14, 2, 3, 15, 16, 17, 18, 19, 20,
            29, 9, 30, 31, 35,
          ]),
        ),
      l = async () => {
        if (
          J.tutorial > 0 ||
          s ||
          e.pagesOpen ||
          e.section !== `home` ||
          !ot(N.profile)
        )
          return;
        (sn(), (s = !0));
        let t = await e.open(c(!1));
        ((s = !1), t && (e.recue(), a()));
      },
      u = async () => {
        (await e.open(c(!0))) && a();
      },
      d = !1,
      f = (t) => {
        d || ((d = !0), Ir(), _u(), e.clearLobby(), n(t));
      },
      p = () => {
        let e = X.view;
        return Cu(e) ? Su(e.dest) : i;
      },
      m = (e) => {
        i = e;
        let t = xu(e);
        (X.view?.isLeader && t && Gr(`dest`, t), a());
      },
      h = (t) => {
        let n = X.view;
        if (!Cu(n)) return f(t);
        if (!n.isLeader)
          return o(`The party leader picks where to go`, `white`);
        if (t.kind === `career`)
          return o(`Career is solo — leave the party to play it`, `white`);
        (m(t), e.go(`home`));
      };
    (e.setLobby(
      {
        id: `home`,
        shot: `home`,
        backdrop: `none`,
        build(n) {
          let r = Au(
              () => void e.open(Tc()),
              () => void u(),
              o,
            ),
            s = j(`div`, `lb-tools`);
          (I.linksOut &&
            s.append(
              ku(`discord`, `Discord`, () =>
                window.open(bu, `_blank`, `noopener`),
              ),
            ),
            s.append(
              ku(`gear`, `Settings`, () => void e.open(Pl())),
              ku(`help`, `Help`, () => void e.open(Hl())),
            ));
          let c = j(`img`, `lb-logo`);
          ((c.src = `/logo.webp`),
            (c.alt = `Tailgrab`),
            (c.width = 1e3),
            (c.height = 381));
          let d = new fu({
              nav: e,
              slots: t.slots ?? (() => []),
              wave: t.wave ?? (() => {}),
              toast: o,
              signal: n.signal,
            }),
            h = j(`button`, `lb-dest`);
          h.type = `button`;
          let g = j(`span`, `lb-dest-art`),
            _ = j(`span`, `lb-dest-words`);
          (h.append(g, _, U(`chevR`, `lb-dest-chev`)),
            h.addEventListener(`click`, async () => {
              let n = X.view;
              if (Cu(n) && !n.isLeader) {
                o(`The party leader picks where to go`, `white`);
                return;
              }
              let r = await e.open(
                Ul(p(), { skating: t.skating, party: Cu(n) }),
              );
              r && m(r);
            }));
          let v = () => {
              let e = X.view;
              t.preview?.(p());
              let [n, r, i] = Du(p(), t.skating?.() ?? 0);
              g.replaceChildren(tr(n));
              let a = Cu(e) && !e.isLeader ? `Leader picks` : `Destination`;
              (_.replaceChildren(
                j(`span`, `lb-dest-kicker`, a),
                j(`span`, `lb-dest-title`, r),
                j(`span`, `lb-dest-sub`, i),
              ),
                h.classList.toggle(`locked`, Cu(e) && !e.isLeader));
            },
            y = V(`PLAY`, `big primary play`, () => S());
          y.dataset.autofocus = ``;
          let b = j(`span`, `lb-play-note`),
            x = j(`div`, `lb-play-col`),
            S = () => {
              let e = X.view;
              if (!Cu(e)) return f(p());
              if (e.launching) return;
              if (e.isLeader) {
                let t = e.members.filter((e) => !e.me && e.present),
                  n = t.filter((e) => !e.ready);
                if (n.length) {
                  (d.shake(n.map((e) => e.sid)),
                    o(
                      `Waiting for ${n.map((e) => e.name).join(`, `)} to ready up`,
                      `white`,
                    ));
                  return;
                }
                if (!t.length) return f(p());
                Gr(`start`);
                return;
              }
              let t = e.leader;
              if (
                t &&
                !t.present &&
                t.room &&
                (t.where === `plaza` || t.where === `park`)
              )
                return f({ kind: `follow`, where: t.where, room: t.room });
              Gr(`ready`, { on: !e.me.ready });
            },
            C = () => {
              let e = X.view,
                t = `PLAY`,
                n = ``,
                r = ``;
              if (Cu(e)) {
                let i = e.members.filter((e) => !e.me && e.present),
                  a = i.filter((e) => e.ready).length,
                  o = e.leader;
                e.launching
                  ? ((t = `GOING…`), (r = `going`))
                  : e.isLeader
                    ? (i.length && (n = `${a}/${i.length} ready`),
                      i.length && a === i.length && (r = `pulse`))
                    : o &&
                        !o.present &&
                        o.room &&
                        (o.where === `plaza` || o.where === `park`)
                      ? ((t = `JOIN`),
                        (n = `${o.name} is in ${wu[o.where]}`),
                        (r = `pulse`))
                      : ((t = e.me.ready ? `READY ✓` : `READY`),
                        (r = e.me.ready ? `ready` : ``),
                        (n =
                          o && !o.present
                            ? `${o.name} is in ${wu[o.where] ?? `a game`}`
                            : e.me.ready
                              ? `Waiting for the leader`
                              : `Ready up to go together`));
              }
              ((y.textContent = t),
                (y.className = `btn big primary play ${r}`),
                (b.textContent = n));
            },
            ee = j(`div`, `lb-play`);
          (C(), x.append(d.dock, b, y), ee.append(h, x));
          let te = j(`button`, `credit lb-credit`, `Credits`);
          ((te.type = `button`),
            te.addEventListener(`click`, () => void e.open(Bl())));
          let w = uu((t) => {
            (wl(t ?? null), e.go(`missions`));
          }, n.signal);
          (n.body.append(d.layer, r.el, s, c, w.el, ee, te),
            t.rider &&
              n.body.prepend(Ou(t.rider, () => e.go(`skaters`), n.signal)));
          let T = t.tv;
          (T &&
            t.best?.then((t) => {
              t &&
                !n.signal.aborted &&
                n.body.prepend(
                  pu(
                    t,
                    T,
                    () =>
                      void e.open(
                        me(
                          () =>
                            import(`./replay-_5kwzkRi.js`).then((e) =>
                              e.replayPage(
                                {
                                  replay: t.id,
                                  name: t.name || `Skater`,
                                  score: t.score,
                                  rank: t.rank,
                                },
                                t.title,
                                t,
                              ),
                            ),
                          __vite__mapDeps([
                            28, 1, 7, 4, 2, 3, 5, 6, 8, 9, 13, 10, 11, 12, 14,
                            15, 16, 17, 18, 19, 20, 29, 30, 31, 21, 22, 32, 24,
                            33, 27,
                          ]),
                        ),
                      ),
                    n.signal,
                  ),
                );
            }),
            v(),
            (a = () => {
              (r.refresh(), v(), C());
            }));
          let E = setInterval(() => {
            p().kind === `public` && v();
          }, 2e3);
          (n.own(() => clearInterval(E)),
            n.own(
              M(() => {
                (r.refresh(), w.refresh(), Eu(e), l(), Yr());
              }),
            ));
          let D = null;
          (n.own(
            Vr((e) => {
              if (
                (e?.isLeader && D && !D.isLeader && Cu(e) && (i = Su(e.dest)),
                e?.isLeader && (!D || D.code !== e.code))
              ) {
                let e = xu(i);
                e && Gr(`dest`, e);
              }
              ((D = e), v(), C());
            }),
          ),
            n.own(
              qr((e) => {
                e.kind === `go`
                  ? f({ kind: `go`, go: e.go })
                  : e.kind === `failed` && (d.shake(e.sids), o(e.text, `red`));
              }),
            ),
            n.onReveal(() => a()),
            queueMicrotask(() => void l()));
        },
      },
      [
        Ao(
          `skaters`,
          `Skaters`,
          `skaters`,
          () => {
            let t = qs();
            return (Eu(e), t);
          },
          (t) => {
            if (`career` in t) return h({ kind: `career`, level: t.career });
            (Us(t), Yr(), e.go(`home`), a(), l());
          },
        ),
        Ao(
          `career`,
          `Career`,
          `career`,
          () => zc(),
          (e) => h({ kind: `career`, level: e }),
        ),
        Ao(`missions`, `Missions`, `missions`, () => $l()),
        { id: `home`, label: `Lobby`, icon: `deck` },
        Ao(
          `parks`,
          `Parks`,
          `parks`,
          () => El(),
          (e) => h({ kind: `park`, code: e.code, via: e.via, name: e.name }),
        ),
        Ao(`ranks`, `Ranks`, `ranks`, () => Ml()),
        ...(Lo ? [Ao(`packs`, `Packs`, `chest`, () => gs())] : []),
      ],
    ),
      Eu(e));
  });
}
function Eu(e) {
  e.badge(`skaters`, ni() ? `NEW` : null);
  let t = N.profile ? $i(N.profile.missions) : 0;
  e.badge(`missions`, t > 0 ? String(t) : null);
}
function Du(e, t) {
  switch (e.kind) {
    case `public`:
      return [
        `plaza`,
        `Skate Hub`,
        t ? `${t} skating · 5 modes` : `Public hub · 5 modes`,
      ];
    case `park`: {
      let t = e.name || `Park ${e.code}`;
      return e.via === `maker`
        ? [`lab`, `Park Maker`, t]
        : e.via === `daily`
          ? [`lab`, `Map of the Day`, t]
          : e.via === `community`
            ? [`lab`, t, `A community park`]
            : [`lab`, t, `A player-built park`];
    }
    case `career`: {
      let t = R(e.level);
      return [t?.parkId ?? `plaza`, `Career`, t?.name ?? e.level];
    }
  }
}
