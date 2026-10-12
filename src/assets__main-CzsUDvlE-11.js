// assets__main-CzsUDvlE 11 — append
// Lines 3105-3437 of readable/assets__main-CzsUDvlE.pretty.js (statement-aligned).
var Rs = `#4F6BFF`,
  zs = () => Nr.filter((e) => Xt(N.profile, e.key)),
  Bs = () => [...Ki.map((e) => e.id), ...zs().map(Or)],
  Vs = { [Ke.FLIP]: `Flip`, [Ke.GRAB]: `Grab`, [Ke.GRIND]: `Grind` },
  Hs = [
    [`air`, `Air`],
    [`speed`, `Speed`],
    [`spin`, `Spin`],
    [`balance`, `Balance`],
  ];
function Us(e) {
  let t = e.skater !== J.skater || e.color !== J.color || !!e.edited;
  return ((J.skater = e.skater), (J.color = e.color), Ir(), t);
}
var Ws = [
    {
      id: `xp`,
      title: `Level up`,
      stk: `sparkle`,
      note: (e) => `you're LV ${Ft(e?.xp ?? 0).level}`,
    },
    { id: `career`, title: `Career`, stk: `flag`, note: () => `clear a level` },
    {
      id: `stars`,
      title: `Star Road`,
      stk: `star`,
      note: (e) => `${(e?.missions.stars ?? 0).toLocaleString(`en-US`)} stars`,
    },
    { id: `feat`, title: `Feats`, stk: `trophy`, note: () => `keep skating` },
  ],
  Gs = (e) =>
    e.rule.kind === `career`
      ? wn(e.rule.level)
      : e.rule.kind === `complete`
        ? 1 / 0
        : e.need,
  Ks = (e) => (N.profile ? nt(N.profile, e) : wn(e) === 0);
function qs() {
  let e = new Set([...ri()].filter(ii));
  return (
    mi(),
    {
      id: `skaters`,
      title: `Skaters`,
      hue: Rs,
      build(t) {
        let n = j(`div`, `sk-body`),
          r = () => {
            let t = N.profile,
              r = ft(t),
              o = [...ri()].some((e) => !ii(e)),
              d = zs(),
              f = zt(t),
              p = 0,
              m = Ki.filter((e) => r.has(e.id)),
              h = [
                Js(
                  o,
                  a,
                  () => void s(),
                  () => void c(),
                  () => void l(),
                ),
                ...m.map((t) =>
                  Zs(t, ++p, !0, e.has(`pro:${t.id}`), () => void i(t.id)),
                ),
              ],
              g = [
                $s(
                  `crew`,
                  `Your crew`,
                  null,
                  `${m.length} of ${Ki.length} pros`,
                  h,
                  `sk-row`,
                ),
              ];
            if (f.length) {
              let e = f.map((e) =>
                ec(qi(e), et(Qe(e), t), ++p, () => void i(e), u(e)),
              );
              g.push(
                $s(`next`, `Up next`, null, `closest first`, e, `sk-next-list`),
              );
            }
            let _ = j(`div`, `sk-top`);
            ((_.dataset.nest = ``),
              (_.dataset.key = `top`),
              (_.dataset.sig = String(g.length)),
              _.append(...g));
            let v = [_];
            d.length &&
              v.push(
                $s(
                  `secrets`,
                  `Secrets`,
                  `sparkle`,
                  ``,
                  d.map((t) =>
                    Qs(t, ++p, e.has(`skin:${t.key}`), () => void i(Or(t))),
                  ),
                  `sk-grid`,
                ),
              );
            let y = Ki.filter((e) => !r.has(e.id) && !f.includes(e.id))
              .map((e) => ({ d: e, r: et(Qe(e.id), t) }))
              .filter((e) => !!e.r);
            for (let e of Ws) {
              let n = y
                .filter((t) => pn(t.r) === e.id)
                .sort((e, t) => Gs(e.r) - Gs(t.r));
              n.length &&
                v.push(
                  $s(
                    e.id,
                    e.title,
                    e.stk,
                    e.note(t),
                    n.map(({ d: e, r: t }) =>
                      Zs(e, ++p, !1, !1, () => void i(e.id), t),
                    ),
                    `sk-grid sk-small`,
                  ),
                );
            }
            St(n, v) || n.replaceChildren(...v);
            for (let e of n.querySelectorAll(`[data-autofocus]`))
              delete e.dataset.autofocus;
            let b = n.querySelector(`.current`);
            (b?.matches(`button`)
              ? b
              : b?.querySelector(`button`)
            )?.setAttribute(`data-autofocus`, ``);
          },
          i = async (e) => {
            let n = await t.push(lc(e));
            n && t.resolve(n);
          },
          a = 0,
          o = async () => {
            let e = !!Fs(),
              n = await Is();
            return !t.signal.aborted && (e && n && a++, r(), n);
          },
          s = async () => {
            let e = !!Fs();
            (await o())
              ? t.resolve({ skater: 255, color: J.color, edited: e })
              : Y.ui(`nope`);
          },
          c = async () => {
            let e = {},
              n = await t.push(
                Ls((t) => {
                  e.kept = t;
                }),
              );
            if (n) {
              t.resolve(n);
              return;
            }
            if (!e.kept) return;
            let i = await e.kept;
            t.signal.aborted ||
              (i && a++,
              i && t.live && J.skater === 255
                ? t.resolve({ skater: 255, color: J.color, edited: !0 })
                : r());
          },
          l = async () => {
            (await o()) || Y.ui(`nope`);
          },
          u = (e) => {
            let n = Qe(e),
              r = et(n, N.profile);
            if (r?.rule.kind === `career` && Ks(r.rule.level)) {
              let e = r.rule.level,
                n = V(`PLAY`, `tiny primary sk-cta`, () =>
                  t.resolve({ career: e }),
                );
              return (
                n.setAttribute(`aria-label`, `Play ${R(e)?.name ?? e}`),
                n
              );
            }
            if (!Hr() || !On(n)) return null;
            let i = xi(`tiny secondary sk-cta`, () => void d(i, e));
            return i;
          },
          d = async (e, t) => {
            e.disabled = !0;
            try {
              (await Qr(`pro:${t}`)) || (e.disabled = !1);
            } catch (t) {
              ((e.disabled = !1), Y.ui(`nope`), console.warn(`[ad]`, P(t)));
            }
          };
        (r(),
          t.own(M(r)),
          t.onReveal(r),
          t.body.append(n),
          requestAnimationFrame(() => {
            let e = n.querySelector(`.current`),
              r = t.body;
            if (!e || t.signal.aborted) return;
            let i = e.offsetTop - r.offsetTop;
            i + e.offsetHeight > r.clientHeight &&
              (r.scrollTop = i - (r.clientHeight - e.offsetHeight) / 2);
          }));
      },
    }
  );
}
function Js(e, t, n, r, i) {
  let a = ui(),
    o = Fs(),
    s = o ?? a,
    c = !!s && J.skater === 255,
    l = s?.look ?? je,
    u = j(`div`, `sk-style ${c ? `current` : ``} ${s ? `` : `is-new`}`);
  (u.style.setProperty(`--i`, `0`),
    (u.dataset.key = `custom`),
    (u.dataset.sig = `${s ? `${Ie(s.look)}|${s.style}` : ``}|${!!o}|${c}|${e}|${t}`),
    er(u, l));
  let d = j(`div`, `sk-style-art`);
  d.append(G(l, `sk-art`));
  let f = j(`div`, `sk-style-side`);
  f.append(
    j(`span`, `sk-style-title`, `Your Style`),
    j(
      `span`,
      `sk-style-sub`,
      s ? `${Ui[s.style]?.name ?? `All-round`} skater` : `Make your own skater`,
    ),
  );
  let p = V(
    s ? `EDIT` : `MAKE YOURS`,
    `tiny ${c || !s ? `primary` : `secondary`} sk-edit`,
    r,
  );
  (p.prepend(U(s ? `pencil` : `plus`)),
    e && s && p.append(j(`span`, `sk-edit-new`, `NEW`)),
    p.setAttribute(
      `aria-label`,
      `${s ? `Edit your style` : `Make your own skater`}${e ? ` (new pieces)` : ``}`,
    ));
  let m = j(`div`, `sk-style-acts`);
  if (c && !o) {
    let e = j(`span`, `sk-riding`, `Riding`);
    (e.prepend(U(`check`)), f.append(e));
  } else if (s) {
    let e = V(`RIDE`, `tiny primary sk-use`, n);
    (e.prepend(U(`play`)),
      e.setAttribute(
        `aria-label`,
        o ? `Save and ride your style` : `Ride your style`,
      ),
      m.append(e));
  }
  if (
    (m.append(p),
    f.append(m),
    s || d.append(j(`span`, `sk-tag sk-free`, `FREE`)),
    o)
  ) {
    let e = j(`button`, `sk-tag sk-saved failed`, `NOT SAVED`);
    ((e.type = `button`),
      e.append(j(`small`, ``, `TAP TO RETRY`)),
      e.addEventListener(`click`, i),
      e.setAttribute(`aria-label`, `Your style isn't saved: try again`),
      d.append(e));
  } else t && d.append(j(`span`, `sk-tag sk-saved`, `SAVED`));
  return (
    d.addEventListener(`click`, (e) => {
      e.target.closest(`button`) || (s && !c ? n : r)();
    }),
    u.append(d, f),
    u
  );
}
var Ys = (e) => !kr(e) && !ft(N.profile).has(e),
  Xs = (e) => {
    let t = kr(e);
    return t ? Xt(N.profile, t.key) : ft(N.profile).has(e);
  };
function Zs(e, t, n, r, i, a = null) {
  let o = e.id === ai(),
    s = j(
      `button`,
      `sk-tile ${n ? `` : `locked mystery`} ${o ? `current` : ``}`,
    );
  if (
    ((s.type = `button`),
    n && er(s, e),
    s.style.setProperty(`--i`, String(t)),
    (s.dataset.key = `pro:${e.id}`),
    (s.dataset.sig = `${n}|${o}|${r}`),
    s.append(G(e, `sk-art`, !n), j(`span`, `sk-name`, e.name)),
    o
      ? s.append(j(`span`, `sk-tag`, `YOU`))
      : r && n && s.append(j(`span`, `sk-tag sk-new`, `NEW`)),
    !n && (a && s.append(rc(a)), Si !== `off` && !Zr() && On(Qe(e.id))))
  ) {
    let e = j(`span`, `sk-ad`, `AD`);
    (e.prepend(U(`play`)), s.append(e));
  }
  return (
    s.setAttribute(
      `aria-label`,
      `${e.name}${n ? `` : ` (locked: ${a ? vt(a.rule) : `unlocks with an ad`})`}`,
    ),
    s.addEventListener(`click`, i),
    s
  );
}
function Qs(e, t, n, r) {
  let i = Or(e) === ai(),
    a = j(`button`, `sk-tile sk-skin ${i ? `current` : ``}`);
  return (
    (a.type = `button`),
    er(a, e),
    a.style.setProperty(`--i`, String(t)),
    (a.dataset.key = `skin:${e.key}`),
    (a.dataset.sig = `${i}|${n}`),
    a.append(G(e.look, `sk-art`), j(`span`, `sk-name`, e.name)),
    i
      ? a.append(j(`span`, `sk-tag`, `YOU`))
      : n && a.append(j(`span`, `sk-tag sk-new`, `NEW`)),
    a.setAttribute(`aria-label`, `${e.name} (secret)`),
    a.addEventListener(`click`, r),
    a
  );
}
