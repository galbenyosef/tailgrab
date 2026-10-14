// assets/main-CzsUDvlE 21 — append
// Lines 6103-6417 of readable/assets/main-CzsUDvlE.pretty.js (statement-aligned).
function $l() {
  return {
    id: `missions`,
    title: `Missions`,
    hue: `#FF8A1F`,
    build(e) {
      let t = N.profile,
        n = new Map(),
        r = new Set(),
        i = new Map(),
        a = !1,
        o = -1,
        s = new Sa(t?.xp ?? 0),
        c = j(`div`, `ms-stars`),
        l = j(`b`, ``, String(t?.missions.stars ?? 0));
      (c.append(B(`star`), l), e.extra.replaceChildren(s.el, c));
      let u = j(`div`, `ms-body`);
      e.body.append(u);
      let d = (t = 20) => {
          let n = u.querySelector(Ql);
          n &&
            !e.signal.aborted &&
            (n.focus({ preventScroll: !0 }),
            document.activeElement !== n &&
              t > 0 &&
              setTimeout(() => d(t - 1), 50));
        },
        f = new Yl({
          xp: s,
          stars: c,
          starCount: l,
          push: async (t) => {
            (await e.push(t), d());
          },
        });
      e.signal.addEventListener(`abort`, () => f.skip());
      let p = (e, t, i) => {
          (n.set(e, N.profile?.missions[t].period ?? 0), r.add(i));
        },
        m = (t, i, a) => {
          (b(),
            d(),
            t
              .catch((t) => {
                (tu(e, P(t)), Dt());
              })
              .finally(() => {
                (n.delete(i),
                  r.delete(a),
                  delete a.dataset.sig,
                  e.signal.aborted || b());
              }));
        },
        h = (e, t, r) => {
          let i = `${e}:${t}`;
          n.has(i) || (p(i, e, r), m(f.claim(_t(e, t), r, eu(e, t)), i, r));
        },
        g = (e, t) => {
          let r = `${e}:crate`;
          n.has(r) || (p(r, e, t), m(f.crate(Ht(e), t), r, t));
        },
        _ = (t, n) => {
          ((n.disabled = !0),
            tn(t)
              .catch((t) => {
                (tu(e, P(t)), Dt());
              })
              .finally(() => {
                ((n.disabled = !1), e.signal.aborted || b());
              }));
        },
        v = () => {
          let e = N.profile;
          if (!e || !n.size) return e;
          let t = structuredClone(e);
          for (let [e, r] of n) {
            let [n, i] = e.split(`:`),
              a = t.missions[n];
            a.period === r &&
              (i === `crate`
                ? (a.crate = !0)
                : a.slots[+i] && (a.slots[+i].claimed = !0));
          }
          return t;
        },
        y = (e = !1) => {
          let t = u.querySelector(`.sr-road`),
            n = t?.querySelector(`.sr-stop.next`);
          if (!t || !n) return;
          let r = n.previousElementSibling ?? n;
          t.scrollTo({
            left: n.offsetLeft - (t.clientWidth - n.offsetWidth) / 2,
            top: r.offsetTop - parseFloat(getComputedStyle(t).paddingTop),
            behavior: e && !A() ? `smooth` : `instant`,
          });
        },
        b = () => {
          let t = v();
          if (!t) {
            u.replaceChildren(H(`Loading your missions…`));
            return;
          }
          let c = o;
          !f.busy && !n.size
            ? (s.set(t.xp),
              (l.textContent = String(t.missions.stars)),
              (o = t.missions.stars))
            : o < 0 && (o = t.missions.stars);
          let d = !a;
          a = !0;
          let p = {
              enter: d,
              changed: (e, t) => {
                let n = i.get(e);
                return (i.set(e, t), d || n !== t);
              },
            },
            m = u.querySelector(`.sr-road`),
            b = m && { left: m.scrollLeft, top: m.scrollTop },
            x = [
              nu(e, t, `daily`, { claim: h, crate: g, reroll: _ }, p),
              nu(e, t, `weekly`, { claim: h, crate: g, reroll: _ }, p),
              cu(t, o, d ? -1 : c),
            ];
          (d || !St(u, x, (e) => r.has(e))) && u.replaceChildren(...x);
          for (let e of u.querySelectorAll(`[data-autofocus]`))
            delete e.dataset.autofocus;
          let S = u.querySelector(Ql);
          S && (S.dataset.autofocus = ``);
          let C = u.querySelector(`.sr-road`);
          if (C && C !== m) {
            if (!b) requestAnimationFrame(() => y());
            else {
              C.scrollTo({ ...b, behavior: `instant` });
              let e = Number(C.closest(`.ms-road`)?.dataset.grow ?? 0);
              setTimeout(
                () => {
                  C.isConnected && y(!0);
                },
                e * su + 400,
              );
            }
          }
        };
      e.own(M(b));
      let x = () => requestAnimationFrame(() => y()),
        S = matchMedia(`(orientation: portrait)`);
      (S.addEventListener(`change`, x),
        e.own(() => S.removeEventListener(`change`, x)),
        b(),
        N.profile ||
          In().then(() => {
            e.signal.aborted || b();
          }));
      let C = Cl;
      if (C) {
        wl(null);
        let t = `${C.cadence}:${C.i}`,
          i = eu(C.cadence, C.i),
          a = _t(C.cadence, C.i);
        a.catch(() => {});
        let o = u.querySelector(`[data-slot="${t}"]`);
        (o && (p(t, C.cadence, o), o.scrollIntoView({ block: `nearest` })),
          setTimeout(() => {
            if (o?.isConnected && !e.signal.aborted) {
              m(f.claim(a, o, i), t, o);
              return;
            }
            (n.delete(t),
              o && r.delete(o),
              a.catch(() => void Dt()),
              e.signal.aborted || b());
          }, 300));
      }
    },
  };
}
function eu(e, t) {
  let n = N.profile?.missions[e].slots[t];
  return (n && aa(n.id)?.xp) || 0;
}
function tu(e, t) {
  e.body.querySelector(`.ms-toast`)?.remove();
  let n = j(`div`, `ms-toast`, t);
  (e.body.append(n), setTimeout(() => n.remove(), 2600));
}
function nu(e, t, n, r, i) {
  let a = t.missions,
    o = j(`section`, `ms-col ms-${n}`);
  o.dataset.nest = ``;
  let s = j(`div`, `ms-top`);
  s.append(
    j(`span`, `ms-kicker`, Zl[n]),
    Sl(n, e.signal, () => void Dt()),
  );
  let c = ua(vn()),
    l = pa(a, c);
  if (n === `daily` && l > 0) {
    let e = j(`span`, `ms-streak`);
    (e.append(U(`flame`), j(`b`, ``, String(l)), j(`span`, ``, `-day streak`)),
      (e.title = `Open the daily crate every day: +50 XP a day, up to +300`),
      s.append(e));
  }
  let u = n === `daily` && a.rerollDay !== c;
  n === `daily` &&
    s.append(
      j(
        `span`,
        `ms-hint`,
        u ? `1 free swap today` : `Swap used · back tomorrow`,
      ),
    );
  let d = j(`div`, `ms-cards`);
  d.dataset.nest = ``;
  let f = a[n].slots,
    p = +(n === `weekly`);
  (f.forEach((e, t) => {
    let o = ru(n, e, t, u, r);
    ((o.dataset.key = `${n}:${t}:${a[n].period}:${e.id}`),
      (o.dataset.sig = `${e.n}/${e.goal}:${e.claimed}:${u}`),
      i.changed(`${n}:${t}`, `${a[n].period}:${e.id}`) &&
        (o.classList.add(`in`), o.style.setProperty(`--i`, String(p++))),
      d.append(o));
  }),
    f.length || d.append(H(`New missions are on their way…`)));
  let m = ou(t, n, r),
    h = i.changed(`${n}:crate`, String(a[n].period)),
    g = sa(a[n]);
  return (
    (m.dataset.key = `${n}:crate:${a[n].period}`),
    (m.dataset.sig = `${g}:${a[n].crate}:${f.filter((e) => e.claimed).length}`),
    i.changed(`${n}:ready`, String(g)) && g && !h && m.classList.add(`woke`),
    h && m.classList.add(`in`),
    o.append(s, d, m),
    o
  );
}
function ru(e, t, n, r, i) {
  let a = aa(t.id),
    o = ea(t),
    s = j(`div`, `ms-card ${o ? `done` : ``} ${t.claimed ? `claimed` : ``}`);
  s.dataset.slot = `${e}:${n}`;
  let c = j(`div`, `ms-ico`);
  c.append(U(_l(a)));
  let l = j(`div`, `ms-pay`);
  l.append(j(`span`, `ms-xp`, `+${a.xp.toLocaleString()} XP`), au(ia[e]));
  let u = j(`div`, `ms-foot`);
  if (t.claimed) u.append(j(`div`, `ms-stamp still`, `DONE!`));
  else if (o) {
    let t = V(`CLAIM`, `primary ms-claim`, () => i.claim(e, n, s));
    ((t.dataset.claim = `${e}:${n}`), u.append(t));
  } else if (e === `daily` && r) {
    let e = V(``, `tiny ghost ms-reroll`, () => i.reroll(n, e));
    ((e.dataset.reroll = String(n)),
      (e.title = `Swap this mission for another (once a day)`),
      e.append(U(`dice`), j(`span`, ``, `Swap`)),
      u.append(e));
  }
  return (
    u.childElementCount || s.classList.add(`bare`),
    s.append(c, iu(ta(a, t.goal)), l, xl(a, t), u),
    s
  );
}
function iu(e) {
  let t = j(`div`, `ms-text`);
  for (let n of e.split(/(\S*-\S*)/))
    n && t.append(n.includes(`-`) ? j(`span`, `nb`, n) : n);
  return t;
}
function au(e) {
  let t = j(`span`, `ms-star`);
  return (t.append(B(`star`), j(`b`, ``, String(e))), t);
}
function ou(e, t, n) {
  let r = e.missions[t],
    i = sa(r),
    a = r.slots.filter((e) => e.claimed).length,
    o = j(`div`, `ms-crate ${i ? `ready` : ``} ${r.crate ? `opened` : ``}`),
    s = j(`div`, `ms-crate-art`);
  s.append(U(`crate`));
  let c = j(`div`, `ms-crate-words`),
    l = j(`span`, `ms-crate-loot`, `+${oa[t].xp.toLocaleString()} XP · `);
  if ((l.append(B(`star`), String(oa[t].stars)), t === `daily`)) {
    let e = j(`span`, `ms-crate-bonus`, ` · `);
    (e.append(B(`flame`), ` streak +${(300).toLocaleString()}`), l.append(e));
  }
  let u = r.slots.length || 3;
  if (
    (c.append(
      j(
        `span`,
        `ms-crate-kicker`,
        r.crate
          ? `Crate opened`
          : i
            ? `Your crate is ready!`
            : `Claim all ${u} to open · ${a}/${u}`,
      ),
      j(`b`, ``, `${Zl[t]} Crate`),
    ),
    !i && !r.crate && c.append(j(`span`, `ms-crate-n`, `${a}/${u}`)),
    c.append(l),
    o.append(s, c),
    i)
  ) {
    let e = V(`OPEN`, `primary ms-open`, () => n.crate(t, o));
    ((e.dataset.crate = t), o.append(e));
  } else
    r.crate
      ? o.append(j(`div`, `ms-stamp still`, `OPENED`))
      : o.append(U(`lock`, `ms-crate-lock`));
  return o;
}
var su = 700;
