// assets__main-CzsUDvlE 12 — append
// Lines 3438-3770 of readable/assets__main-CzsUDvlE.pretty.js (statement-aligned).
function $s(e, t, n, r, i, a) {
  let o = j(`section`, `sk-sec`);
  o.dataset.nest = ``;
  let s = j(`div`, `sk-head`);
  ((s.dataset.key = `head:${e}`),
    (s.dataset.sig = `${t}|${r}`),
    n && s.append(B(n)),
    s.append(j(`span`, `sk-title`, t)),
    r && s.append(j(`span`, `sk-note`, r)));
  let c = j(`div`, a);
  return (
    (c.dataset.nest = ``),
    (c.dataset.key = `list:${e}`),
    (c.dataset.sig = i.map((e) => e.dataset.key).join(`,`)),
    c.append(...i),
    o.append(s, c),
    o
  );
}
function ec(e, t, n, r, i) {
  let a = j(`div`, `sk-next`);
  (a.style.setProperty(`--i`, String(n)),
    (a.dataset.key = `next:${e.id}`),
    (a.dataset.sig = `${t.have}|${t.frac.toFixed(3)}|${i?.textContent ?? ``}`));
  let o = j(`button`, `sk-next-main`);
  ((o.type = `button`),
    o.setAttribute(
      `aria-label`,
      `${e.name} (locked): ${vt(t.rule)}, ${oc(t)}`,
    ));
  let s = j(`span`, `sk-next-how`);
  s.append(ic(t), ac(t));
  let c = j(`span`, `sk-next-text`);
  return (
    c.append(
      j(`span`, `sk-next-name`, e.name),
      s,
      sc(t),
      j(`span`, `sk-next-count`, oc(t)),
    ),
    o.append(G(e, `sk-next-art`, !0), c),
    o.addEventListener(`click`, r),
    a.append(o),
    i && (a.classList.add(`has-cta`), a.append(i)),
    a
  );
}
var tc = {
    wins: `wins`,
    matches: `matches`,
    runs: `runs`,
    bestCombo: `pt combo`,
    banked: `points`,
    missions: `missions`,
    bails: `bails`,
  },
  nc = new Intl.NumberFormat(`en-US`, { notation: `compact` });
function rc(e) {
  let t = j(`span`, `sk-route`),
    n = e.rule;
  return (
    n.kind === `stars`
      ? t.append(B(`star`), nc.format(n.n))
      : (t.textContent =
          n.kind === `xp`
            ? `LV ${n.level}`
            : n.kind === `career`
              ? (R(n.level)?.name ?? n.level)
              : n.kind === `complete`
                ? `100%`
                : `${nc.format(n.n)} ${tc[n.stat]}`),
    t
  );
}
function ic(e, t = ``) {
  let n = e.rule;
  return n.kind === `xp`
    ? j(`span`, `sk-lv ${t}`, String(n.level))
    : B(
        n.kind === `stars`
          ? `star`
          : n.kind === `feat`
            ? n.stat === `bails`
              ? `oops`
              : `trophy`
            : `flag`,
        t,
      );
}
function ac(e) {
  let t = e.rule;
  return t.kind === `career`
    ? `Clear ${R(t.level)?.name ?? t.level}`
    : t.kind === `stars`
      ? `Collect ${t.n.toLocaleString(`en-US`)} stars`
      : t.kind === `complete`
        ? `Finish the Career`
        : vt(t);
}
function oc(e) {
  let t = (e) => e.toLocaleString(`en-US`),
    n = e.rule;
  return n.kind === `xp`
    ? `LV ${e.have} of ${e.need}`
    : n.kind === `stars`
      ? `${t(e.have)} of ${t(e.need)} stars`
      : n.kind === `feat`
        ? `${t(e.have)} of ${t(e.need)} ${tc[n.stat]}`
        : `${e.have} of ${e.need} goals`;
}
function sc(e) {
  let t = j(`span`, `sk-bar`),
    n = j(`b`);
  return ((n.style.width = `${Math.round(e.frac * 100)}%`), t.append(n), t);
}
function cc(e) {
  let t = e.rule;
  if (t.kind === `xp`) return `XP comes from combos, matches and Career goals.`;
  if (t.kind === `stars`) return `Stars come from daily and weekly missions.`;
  if (t.kind === `career` && !Ks(t.level)) {
    let e = wn(t.level);
    return `${R(t.level)?.name ?? t.level} opens once you clear ${ln[e - 1]?.name ?? `the level before it`}.`;
  }
  return ``;
}
function lc(e) {
  return {
    id: `skater`,
    title: `Skaters`,
    hue: Rs,
    backdrop: `side`,
    shot: `detail`,
    build(t) {
      let n = Bs(),
        r = Math.max(0, n.indexOf(e)),
        i = J.color,
        a = () => n[r],
        o = j(`div`, `sd-hero`),
        s = j(`div`, `sd-art`),
        c = uc(`chevL`, `Previous skater`, () => p(-1)),
        l = uc(`chevR`, `Next skater`, () => p(1));
      o.append(s, c, l);
      let u = zn(o, t),
        d = j(`div`, `sd-info`),
        f = j(`div`, `sd-foot`);
      t.body.append(o, d, f);
      let p = (e) => {
          ((r = (r + e + n.length) % n.length),
            d.style.setProperty(`--fdir`, String(e)),
            x(!0));
        },
        m = () => {
          Xs(a()) && t.resolve({ skater: a(), color: i });
        },
        h = async (e, t) => {
          e.disabled = !0;
          try {
            (await Qr(`pro:${a()}`))
              ? f.querySelector(`.sd-go`)?.focus()
              : (e.disabled = !1);
          } catch (n) {
            ((t.textContent = P(n)), (e.disabled = !1));
          }
        },
        g = (e) => {
          if (Xs(e)) return _c(e, i, m);
          let n = Qe(e),
            r = et(n, N.profile);
          if (r?.rule.kind === `career` && Ks(r.rule.level)) {
            let e = r.rule.level,
              n = V(`PLAY`, `big primary sd-go sd-play`, () =>
                t.resolve({ career: e }),
              );
            return (
              n.append(j(`span`, `sd-go-sub`, R(e)?.name ?? e)),
              (n.dataset.autofocus = ``),
              [n]
            );
          }
          let a =
            Lo && !Ut(N.profile, `pros`)
              ? [
                  V(
                    `GET EVERY PRO`,
                    `big ghost sd-pack`,
                    () => void t.push(gs(`pros`)),
                  ),
                ]
              : [];
          if (!On(n) || !Hr()) return a;
          let o = j(`span`, `cas-status`),
            s = xi(`big secondary sd-ad`, () => void h(s, o));
          return ((s.dataset.autofocus = ``), [o, ...a, s]);
        },
        _ = (e) => {
          ((i = e), Xs(a()) && f.replaceChildren(...g(a())));
        },
        v = (e) => {
          let t = N.profile,
            n = kr(e) ? null : et(Qe(e), t);
          return `${Ys(e)}|${t ? `${mn(t)}|${Ft(t.xp).level}` : ``}|${n ? `${n.have}|${n.frac.toFixed(2)}|${dc(n)}` : ``}`;
        },
        y = ``,
        b = !1,
        x = (e) => {
          let n = a(),
            r = kr(n),
            o = r ? null : qi(n),
            c = r?.look ?? o.look,
            l = Ys(n);
          if (((y = v(n)), (b = l), e)) {
            let [e, i] = l ? [`var(--grape)`, `var(--bubblegum)`] : Rn(r ?? o);
            (t.root.style.setProperty(`--fur`, e),
              t.root.style.setProperty(`--top`, i),
              t.live && s.replaceChildren(G(o ?? c, `sd-portrait`, l)),
              t.cue(
                r
                  ? { look: c, locked: !1, preview: !0 }
                  : { look: void 0, skater: n, locked: l, preview: !1 },
              ),
              u());
          }
          (d.classList.remove(`flip`),
            d.replaceChildren(...(r ? gc(r, i, _) : l ? mc(o) : hc(o, i, _))),
            f.replaceChildren(...g(n)),
            e && (d.offsetWidth, d.classList.add(`flip`)));
        },
        S = -1,
        C = (e) => {
          (e.addEventListener(`pointerdown`, (e) => {
            S =
              e.pointerType === `mouse` || e.target.closest(`button`)
                ? -1
                : e.clientX;
          }),
            e.addEventListener(`pointerup`, (e) => {
              if (S < 0) return;
              let t = e.clientX - S;
              ((S = -1), Math.abs(t) > 40 && p(t < 0 ? 1 : -1));
            }));
        };
      (C(d),
        t.live && C(o),
        window.addEventListener(
          `keydown`,
          (e) => {
            e.target instanceof HTMLInputElement ||
              (e.key === `ArrowLeft`
                ? p(-1)
                : e.key === `ArrowRight`
                  ? p(1)
                  : e.key === `Enter` &&
                    !(e.target instanceof HTMLButtonElement) &&
                    f.querySelector(`.sd-go`)?.click());
          },
          { signal: t.signal },
        ),
        t.own(
          M(() => {
            if (v(a()) === y) return;
            let e =
              d.contains(document.activeElement) ||
              f.contains(document.activeElement);
            (x(Ys(a()) !== b),
              e &&
                f
                  .querySelector(`[data-autofocus]`)
                  ?.focus({ preventScroll: !0 }));
          }),
        ),
        x(!0));
    },
  };
}
function uc(e, t, n) {
  let r = j(`button`, `ico-btn sd-arrow sd-${e}`);
  return (
    (r.type = `button`),
    r.setAttribute(`aria-label`, t),
    (r.dataset.pad = e === `chevL` ? `prev` : `next`),
    r.append(U(e)),
    r.addEventListener(`click`, n),
    r
  );
}
var dc = (e) => e.rule.kind === `career` && Ks(e.rule.level);
function fc(e) {
  let t = (e) => Math.round(Math.max(0, Math.min(1, (e - 0.7) / 0.45)) * 10),
    n = N.profile ? mn(N.profile) : 0,
    r = Yi(e, n),
    i = Yi(e, n & 65535),
    a = j(`div`, `sd-stats`);
  for (let [e, n] of Hs) {
    let o = t(r[e]),
      s = t(i[e]),
      c = j(`span`, `segs`);
    for (let e = 0; e < 10; e++)
      c.append(j(`i`, e < o ? `on` : e < s ? `ghost` : ``));
    let l = j(`div`, `sd-stat`);
    (l.append(j(`span`, `sd-stat-label`, n), c), a.append(l));
  }
  let o = N.profile ? Da(Ft(N.profile.xp).level) : null;
  o && a.append(j(`div`, `sd-ramp`, o));
  let s = j(`div`, `sd-specials`);
  s.append(j(`div`, `sd-sub`, `Specials · meter full`));
  for (let t of e.specials) {
    let e = j(`div`, `sd-special`);
    (e.append(
      j(`span`, ``, Oe[t.trick].name),
      j(`kbd`, ``, `${Hn(t.d1)} ${Hn(t.d2)} + ${Vs[t.btn] ?? `?`}`),
    ),
      s.append(e));
  }
  return [a, s];
}
function pc(e, t) {
  let n = j(`div`, `sd-paint`);
  n.append(j(`div`, `sd-sub`, `Paint`));
  let r = j(`div`, `swatches`);
  return (
    Xi.forEach((n, i) => {
      let a = V(``, `swatch ${i === e ? `on` : ``}`, () => {
        for (let e of r.children) e.classList.toggle(`on`, e === a);
        t(i);
      });
      ((a.style.background = n),
        a.setAttribute(`aria-label`, `Paint ${i + 1}`),
        r.append(a));
    }),
    n.append(r),
    n
  );
}
