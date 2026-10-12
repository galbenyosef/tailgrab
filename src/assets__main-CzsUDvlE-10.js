// assets__main-CzsUDvlE 10 — append
// Lines 2423-3104 of readable/assets__main-CzsUDvlE.pretty.js (statement-aligned).
function Ls(e) {
  return {
    id: `custom`,
    title: `Your Style`,
    hue: `#A55BFF`,
    backdrop: `side`,
    shot: `detail`,
    build(t) {
      let n = ui(),
        r = `${Ie(n?.look ?? An(je, Lt(N.profile)))}|${n?.style ?? Ui.length - 1}`,
        i = Fs() ?? n,
        a = !!Fs(),
        o = Me(An(i?.look ?? je, Lt(N.profile))),
        s = i?.style ?? Ui.length - 1,
        c = J.color,
        l = () => J.skater === 255 && !!ui(),
        u = !1,
        d = `head`,
        f = null,
        p = null,
        m = {
          head: o.head,
          top: o.top,
          bottom: o.bottom,
          hat: o.hat,
          acc: o.acc,
        },
        h = { ...o.c },
        g = () => {
          let e = Lt(N.profile);
          for (let t of Object.keys(ze))
            e.has(`${t}:${Cs(o, t)}`) && (m[t] = Cs(o, t));
          for (let t of Ae)
            e.has(Ne(Ue(t), o.c[t].slice(1))) && (h[t] = o.c[t]);
        },
        _ = ri(),
        v = (e) => {
          e !== `riding` && di([..._].filter((t) => t.startsWith(`${e}:`)));
        },
        y = () => di([..._].filter((e) => e.startsWith(`color:${d}:`)));
      t.own(() => {
        (v(d), f && y());
      });
      let b = j(`div`, `sd-hero`),
        x = j(`div`, `sd-art`);
      (b.append(x), zn(b, t));
      let S = j(`div`, `sd-info cas-info`),
        C = j(`div`, `cas-tabs`);
      C.dataset.padTabs = ``;
      let ee = j(`div`, `sd-kicker`, `Choose your`),
        te = j(`div`, `sd-name`),
        w = j(`div`, `cas-panel`);
      (S.append(C, ee, te, w),
        S.addEventListener(
          `scroll`,
          () => S.classList.toggle(`scrolled`, S.scrollTop > 4),
          { passive: !0 },
        ));
      let T = j(`div`, `sd-foot`),
        E = j(`span`, `cas-status`),
        D = V(`RIDE`, `big primary sd-go`, () => void Ge());
      D.dataset.autofocus = ``;
      let ne = V(``, `big secondary cas-undo`, () => fe());
      (ne.append(U(`undo`)),
        ne.setAttribute(`aria-label`, `Undo`),
        (ne.dataset.pad = `y`),
        (ne.dataset.padLabel = `Undo`),
        (ne.disabled = !a));
      let re = j(`span`, `cas-keep`, `Changes save when you leave`);
      ((re.hidden = !0), T.append(E, re, ne, D), t.body.append(b, S, T));
      let ie = j(`span`, `coin-pill cas-purse`),
        ae = j(`span`, ``, Os().toLocaleString(`en-US`));
      (ie.append(B(`coin`), ae), t.extra.append(ie));
      let oe = Os(),
        se = () => {
          let e = Os();
          (Ds(ae, oe, e), (oe = e));
        },
        ce = null;
      t.own(() => {
        ce && clearTimeout(ce);
      });
      let le = () => {
          (er(t.root, o),
            t.cue({ look: o }),
            t.live &&
              (ce && clearTimeout(ce),
              (ce = setTimeout(
                () => x.replaceChildren(G(o, `sd-portrait`)),
                180,
              ))));
        },
        ue = a
          ? [
              {
                look: Me(An(n?.look ?? je, Lt(N.profile))),
                style: n?.style ?? Ui.length - 1,
              },
            ]
          : [],
        de = () => {
          (ue.push({ look: o, style: s }),
            ue.length > 60 && ue.shift(),
            (ne.disabled = !1));
        },
        fe = () => {
          let e = ue.pop();
          ((ne.disabled = !ue.length),
            e &&
              ((o = e.look),
              (s = e.style),
              (E.textContent = ``),
              Y.ui(`click`),
              le(),
              Pe()));
        };
      window.addEventListener(
        `keydown`,
        (e) => {
          e.key.toLowerCase() === `z` &&
            (e.metaKey || e.ctrlKey) &&
            !e.shiftKey &&
            !(e.target instanceof HTMLInputElement) &&
            (e.preventDefault(), fe());
        },
        { signal: t.signal },
      );
      let pe = (e) => {
          (de(), (o = Me(o)), e(o), g(), (E.textContent = ``), le(), Pe());
        },
        me = () => {
          let e = Lt(N.profile),
            t = Me(o);
          for (let n of Object.keys(ze))
            e.has(`${n}:${Cs(t, n)}`) || (t[n] = m[n]);
          for (let n of Ae)
            e.has(Ne(Ue(n), t.c[n].slice(1))) || (t.c[n] = h[n]);
          return An(t, e);
        },
        he = () => `${Ie(me())}|${s}` !== r;
      t.own(() => {
        if (u || !N.profile) return;
        let t = me(),
          n = l() && c !== J.color;
        if ((n && ((J.color = c), Ir()), `${Ie(t)}|${s}` === r)) {
          n && e?.(Promise.resolve(!0));
          return;
        }
        let i = N.account?.id ?? ``;
        e?.(
          Dn(t, s).then(
            () => (Ps(null), !0),
            (e) => (
              console.warn(`[style]`, P(e)),
              Ps({ look: t, style: s, uid: i }),
              !1
            ),
          ),
        );
      });
      let ge = () => {
          let e = Ts(o),
            t = e[0],
            n = ks(e.map(Ln));
          if (
            ((re.textContent = n
              ? `${n} ${e.length > 1 ? `come` : `comes`} off unless you buy ${e.length > 1 ? `them` : `it`}`
              : a
                ? `Not saved last time: saves when you leave`
                : `Changes save when you leave`),
            (re.hidden = !n && !he()),
            D.replaceChildren(),
            D.classList.toggle(`cas-buying`, !!t),
            !t)
          ) {
            D.textContent = l() ? `DONE` : `RIDE`;
            return;
          }
          let r = j(`span`, `cas-buy-line`);
          (r.append(`BUY · `, Es(bt(N.profile).get(t) ?? 0, `cas-buy-price`)),
            D.append(r, j(`span`, `sd-go-sub`, Ln(t))));
        },
        _e = (e, t) =>
          pe((n) => {
            n[e] = t;
          }),
        ve = (e, t) =>
          pe((n) => {
            n.c[e] = t;
          }),
        ye = (e) => {
          let t = He(e);
          if (!t) {
            let t = e.split(`:`)[0];
            _e(t, m[t]);
            return;
          }
          pe((e) => {
            for (let n of Fe[t.tab]) e.c[n] === `#${t.id}` && (e.c[n] = h[n]);
          });
        },
        be = (e, t, n) => {
          let r = Lt(N.profile),
            i = Me(o),
            a = new Set(js(o)),
            s = [];
          if (n && e !== `riding`) {
            let t = Cs(o, e);
            r.has(`${e}:${t}`) || ((i[e] = m[e]), s.push(Le(e, t)?.name ?? t));
          }
          let c = s.length > 0;
          for (let n of t) {
            let t = o.c[n];
            r.has(Ne(e, t.slice(1))) ||
              ((i.c[n] = h[n]), (c = !0), a.has(n) && s.push(Re(t)?.name ?? t));
          }
          return (c && (o = i), [...new Set(s)]);
        },
        xe = (e) => {
          E.textContent = e.length ? `Took off ${ks(e)}: not bought yet` : ``;
        },
        Se = () => {
          let e = Lt(N.profile),
            t = Os(),
            n = bt(N.profile);
          C.replaceChildren(
            ..._s.map((r) => {
              let i = j(`button`, `cas-tab ${r.id === d ? `on` : ``}`);
              ((i.type = `button`),
                i.append(
                  U(r.ico, `cas-tab-ico`),
                  j(`span`, `cas-tab-label`, r.label),
                ));
              let a =
                r.id in ze &&
                [...n].some(
                  ([n, i]) => n.startsWith(`${r.id}:`) && !e.has(n) && i <= t,
                );
              a && i.append(B(`coin`, `cas-tab-coin`));
              let s = [..._].some((e) => e.startsWith(`${r.id}:`));
              return (
                s && i.append(j(`span`, `cas-tab-new`, `NEW`)),
                i.setAttribute(`aria-pressed`, String(r.id === d)),
                i.setAttribute(
                  `aria-label`,
                  `${r.label}${s ? ` (new pieces)` : ``}${a ? ` (pieces you can buy)` : ``}`,
                ),
                i.addEventListener(`click`, () => {
                  if (d === r.id) return;
                  (v(d), f && y());
                  let e = o;
                  (xe(be(d, Fe[d], !0)),
                    (d = r.id),
                    (f = null),
                    o !== e && le(),
                    Pe());
                }),
                i
              );
            }),
          );
          let r = vs.get(d);
          te.textContent = r.word;
        },
        O = new AbortController();
      t.own(() => O.abort());
      let Ce = new Map(),
        we = new Map(),
        Te = (e, t) => {
          let n = j(`span`, `cas-art`),
            r = j(`span`, `cas-ph ${e === `head` ? `cas-ph-sil` : ``}`);
          (r.append(e === `head` ? Bn(t) : U(vs.get(e).ico)), n.append(r));
          let i = ws(o, e, t),
            a = `${Ie(i)}@${bs[e]}`,
            s = `${e}:${t}`,
            c = Ce.get(s);
          if (c) c.naturalWidth && n.classList.add(`has-img`);
          else {
            ((c = new Image()), (c.alt = ``), (c.decoding = `async`));
            let e = c;
            e.onload = () => e.parentElement?.classList.add(`has-img`);
          }
          if (c.dataset.want !== a) {
            let t = c;
            ((t.dataset.want = a),
              Un(i, bs[e], xs, O.signal).then((e) => {
                e && t.dataset.want === a && (t.src = e);
              }));
          }
          return (we.set(s, c), n.append(c), n);
        },
        Ee = (e) => {
          let t = Lt(N.profile),
            n = Os(),
            r = bt(N.profile),
            i = j(`div`, `cas-grid`),
            a = (n) => {
              let i = `${e}:${n.id}`;
              return _.has(i) ? 0 : t.has(i) ? 1 : r.has(i) ? 2 : 3;
            },
            s = ze[e].filter((t) => $t(N.profile, `${e}:${t.id}`));
          for (let c of s.sort((e, t) => a(e) - a(t))) {
            let a = `${e}:${c.id}`,
              s = t.has(a),
              l = r.get(a),
              u = !s && l !== void 0,
              d = Cs(o, e) === c.id,
              f = j(
                `button`,
                `cas-item ${d ? `on` : ``} ${s ? `` : `locked`} ${u ? `for-sale` : ``}`,
              );
            ((f.type = `button`), (f.dataset.key = a));
            let p;
            if (
              e === `head` &&
              !s &&
              !c.secret &&
              !Ki.some((e) => e.species === c.id && t.has(`pro:${e.id}`))
            ) {
              let e = Ki.find((e) => e.species === c.id);
              ((p = j(`span`, `cas-art cas-sil`)),
                p.append(e ? G(e, ``, !0) : j(`span`, `cas-ph`)));
            } else p = Te(e, c.id);
            if (
              (u && d && p.append(j(`span`, `cas-buy-cue`, `BUY`)),
              f.append(p, j(`span`, `cas-label`, c.name)),
              u
                ? f.append(Es(l, `cas-price ${l > n ? `short` : ``}`))
                : s && _.has(a) && f.append(j(`span`, `cas-new`, `NEW`)),
              s)
            )
              _.has(a) && f.setAttribute(`aria-label`, `${c.name} (new)`);
            else {
              let e = vt(Rt(a));
              (f.append(U(`lock`, `cas-lock`)),
                e && !u && f.append(j(`span`, `cas-hint`, e)),
                f.setAttribute(
                  `aria-label`,
                  `${c.name}, ${u ? `${l} coins${e ? ` (or ${e})` : ``}${d ? `, tap again to buy` : ``}` : `locked: ${e}`}`,
                ));
            }
            (f.addEventListener(`click`, () => {
              if (!s && !u) {
                E.textContent = `${c.name}: ${vt(Rt(a))}`;
                return;
              }
              if (u && d) {
                Be(a);
                return;
              }
              _e(e, c.id);
            }),
              i.append(f));
          }
          return i;
        },
        De = () => {
          let e = new Set(js(o)),
            t = Fe[d].filter((t) => e.has(t));
          f && !t.includes(f) && (f = null);
          let n = f !== p;
          if (((p = f), !t.length)) return [];
          let r = j(`div`, `cas-paints`),
            i = Lt(N.profile),
            a = bt(N.profile),
            s = [..._].some((e) => e.startsWith(`color:${d}:`)),
            c = null;
          for (let e of t) {
            let t = f === e,
              l = ys[e],
              u = l === `Color` ? `${vs.get(d).label} color` : l,
              p = j(
                `button`,
                `cas-paint ${t ? `on` : ``} ${s ? `has-new` : ``}`,
              );
            p.type = `button`;
            let m = j(`span`, `cas-dot`);
            if (
              ((m.style.background = o.c[e]),
              p.append(m, j(`span`, ``, l)),
              p.setAttribute(`aria-expanded`, String(t)),
              p.setAttribute(
                `aria-label`,
                `${u}: change colour${s ? ` (new colours)` : ``}`,
              ),
              p.addEventListener(`click`, () => {
                f && y();
                let n = o;
                (t ||
                  xe(
                    be(
                      d,
                      Fe[d].filter((t) => t !== e),
                      !1,
                    ),
                  ),
                  (f = t ? null : e),
                  o !== n && le(),
                  Pe());
              }),
              r.append(p),
              t)
            ) {
              c = j(`div`, `swatches cas-swatches ${n ? `opening` : ``}`);
              for (let t of Ve) {
                let n = `#${t.id}`,
                  r = Ne(d, t.id),
                  s = i.has(r),
                  l = a.get(r),
                  f = o.c[e] === n,
                  p = V(
                    ``,
                    `swatch ${f ? `on` : ``} ${s ? `` : `locked`}`,
                    () => {
                      if (s) {
                        ve(e, n);
                        return;
                      }
                      let i = vt(Rt(r));
                      if (l === void 0) {
                        E.textContent = `${t.name}: ${i}`;
                        return;
                      }
                      if (f) {
                        Be(r);
                        return;
                      }
                      (ve(e, n),
                        (E.textContent = `${t.name}: ${l} coins${i ? ` or ${i.toLowerCase()}` : ``} · tap again to buy`));
                    },
                  );
                ((p.style.background = n),
                  (p.dataset.key = r),
                  s
                    ? _.has(r) && p.append(j(`span`, `cas-sw-new`))
                    : p.append(U(`lock`, `cas-sw-lock`)),
                  p.setAttribute(
                    `aria-label`,
                    `${u}: ${t.name}${s ? (_.has(r) ? ` (new)` : ``) : l === void 0 ? `, locked` : `, ${l} coins`}`,
                  ),
                  c.append(p));
              }
            }
          }
          return c ? [r, c] : [r];
        },
        Oe = () => {
          let e = [],
            t = j(`div`, `chips`);
          (Ui.forEach((e, n) =>
            t.append(
              V(e.name, `chip ${n === s ? `on` : ``}`, () => {
                n !== s && (de(), (s = n), Pe());
              }),
            ),
          ),
            e.push(t, j(`p`, `sd-bio`, Ui[s].blurb), ...fc(Ui[s].stats)));
          let n = j(`div`, `chips`);
          for (let e of [`regular`, `goofy`])
            n.append(
              V(
                e === `regular` ? `Regular` : `Goofy`,
                `chip ${o.stance === e ? `on` : ``}`,
                () =>
                  pe((t) => {
                    t.stance = e;
                  }),
              ),
            );
          let r = De();
          return (
            e.push(j(`div`, `sd-sub`, `Stance`), n),
            r.length && e.push(j(`div`, `sd-sub`, `Board`), ...r),
            e.push(
              pc(c, (e) => {
                c = e;
              }),
            ),
            e
          );
        },
        ke = ``,
        Pe = () => {
          if (((_ = ri()), d === `riding`)) w.replaceChildren(...Oe());
          else {
            let e = `${d}|${Ie(ws(o, d, ze[d][0].id))}`;
            (e !== ke && (O.abort(), (O = new AbortController()), (ke = e)),
              (we = new Map()),
              w.replaceChildren(...De(), Ee(d)),
              (Ce = we));
          }
          (Se(), ge(), se());
        },
        k = null,
        Be = (e) => {
          if (!N.profile) {
            E.textContent = `No account yet — nothing can be bought.`;
            return;
          }
          k?.close();
          let n = He(e),
            [r, i] = e.split(`:`),
            a = bt(N.profile).get(e) ?? 0,
            s = rt(dn(), Ln(e), `cas-buy`, () => {
              k?.key === e && (k = null);
            }),
            c = j(`span`, `cas-buy-art`);
          (er(c, o),
            n &&
              (c.classList.add(`cas-buy-paint`),
              c.style.setProperty(`--paint`, `#${n.id}`)));
          let l = new Image();
          ((l.alt = ``),
            (l.onload = () => c.classList.add(`has-img`)),
            Un(n ? o : ws(o, r, i), n ? `portrait` : bs[r], Ss).then((e) => {
              e && (l.src = e);
            }),
            c.append(l));
          let u = j(
              `div`,
              `sd-kicker`,
              n ? `${vs.get(n.tab).label} color` : vs.get(r).label,
            ),
            d = Es(a, `cas-buy-cost`),
            f = j(`div`, `cas-buy-bal`),
            p = j(`p`, `cas-buy-note`);
          s.body.append(c, u, d, f, p);
          let m = Os(),
            h = { key: e, paint: () => v(), close: s.close, busy: !1 };
          k = h;
          let g = async (t) => {
              ((t.disabled = !0), (h.busy = !0));
              try {
                await st(e);
              } catch (e) {
                ((h.busy = !1),
                  (p.textContent = `Couldn't buy it: ${P(e)}`),
                  (t.disabled = !1));
                return;
              }
              (s.close(), We(e));
            },
            _ = async (t) => {
              ((t.disabled = !0), (h.busy = !0));
              try {
                let n = await bi(e);
                if (n) {
                  let e = sr(1600),
                    r = t.getBoundingClientRect(),
                    i = f.querySelector(`.ico`) ?? f;
                  await Promise.all(
                    Array.from(
                      { length: Math.min(6, Math.ceil(n / 20)) },
                      (t, n) =>
                        e
                          .fly(r, i, `coin`, n * 70, 460)
                          .then(() => Y.ui(`coin`)),
                    ),
                  );
                }
                ((h.busy = !1),
                  v(),
                  n &&
                    (L(f, `pop`),
                    s.foot.querySelector(`.cas-buy-go`)?.focus()));
              } catch (e) {
                ((h.busy = !1), (p.textContent = P(e)), (t.disabled = !1));
              }
            },
            v = () => {
              let n = Os(),
                r = a - n;
              f.replaceChildren(B(`coin`));
              let i = j(`b`, ``, m.toLocaleString(`en-US`));
              (f.append(`You have `, i),
                Ds(i, m, n),
                (m = n),
                r <= 0 &&
                  f.append(` → `, j(`b`, ``, (n - a).toLocaleString(`en-US`))));
              let o = V(`TAKE IT OFF`, `big ghost cas-buy-off`, () => {
                (s.close(), ye(e));
              });
              if (r <= 0) {
                p.textContent = ``;
                let e = V(`BUY · `, `big primary cas-buy-go`, () => void g(e));
                (e.append(Es(a, `cas-buy-price`)),
                  (e.dataset.autofocus = ``),
                  s.foot.replaceChildren(o, e));
                return;
              }
              if (As()) {
                let e = Math.min(r, 100),
                  t = ct(N.profile, ua(vn())),
                  n = Zr() ? `A tap` : `An ad`;
                p.textContent = `${r.toLocaleString(`en-US`)} more coins to go. ${e < r ? `${n} covers ${e}` : `${n} covers it`} (${t} left today).`;
                let i = xi(
                  `big secondary cas-buy-ad`,
                  () => void _(i),
                  `CLAIM · +${e}`,
                  `WATCH AD · +${e}`,
                );
                ((i.dataset.autofocus = ``), s.foot.replaceChildren(o, i));
                return;
              }
              let c = Hr()
                ? ` Today's top-ups are used: they're back tomorrow.`
                : ``;
              p.textContent = `${r.toLocaleString(`en-US`)} more coins to go. Grab the Skate Hub's daily coins, find its stashes and every career level's secret deck.${c}`;
              let l = V(`KEEP SKATING`, `big secondary`, () => s.close());
              l.dataset.autofocus = ``;
              let u = Lo
                ? gt.find((t) => ut[t].keys?.includes(e) && !Ut(N.profile, t))
                : void 0;
              u
                ? (p.append(` Or get it in the ${ut[u].name}.`),
                  s.foot.replaceChildren(
                    o,
                    V(`SEE PACK`, `big ghost cas-buy-pack`, () => {
                      (s.close(), t.push(gs(u)));
                    }),
                    l,
                  ))
                : s.foot.replaceChildren(o, l);
            };
          v();
        };
      t.own(() => k?.close());
      let We = async (e) => {
          di([e]);
          let t = w.querySelector(`[data-key="${e}"]`);
          Y.ui(`claim`);
          let n = sr(2400),
            r = ie.getBoundingClientRect();
          if (
            (L(ie, `pop`),
            await Promise.all(
              [0, 80, 160].map((e) => n.fly(r, t ?? D, `coin`, e, 480)),
            ),
            (E.textContent = `${Ln(e)} is yours!`),
            !t?.isConnected)
          )
            return;
          let i = U(`lock`, `cas-lock cas-lock-off`);
          (t.append(i), setTimeout(() => i.remove(), 700), L(t, `cas-won`));
          let a = ir(t);
          (n.confetti(a.x, a.y, 30, 0.8),
            n.float(a.x, a.r.top, `UNLOCKED!`, `gain`),
            Y.ui(`stamp`));
        },
        Ge = async () => {
          if (!N.profile) {
            E.textContent = `No account yet — your rider can't be saved.`;
            return;
          }
          let e = Ts(o)[0];
          if (e) {
            Be(e);
            return;
          }
          let n = he() || !ui();
          ((D.disabled = !0), (E.textContent = n ? `Saving…` : ``));
          try {
            (n && (await Dn(o, s)),
              Ps(null),
              (u = !0),
              t.resolve({ skater: 255, color: c, edited: n }));
          } catch (e) {
            E.textContent = `Couldn't save: ${P(e)}`;
          } finally {
            D.disabled = !1;
          }
        };
      (t.own(
        M(() => {
          (g(), Pe(), k && !k.busy && k.paint());
        }),
      ),
        Pe(),
        le());
    },
  };
}
