// assets/main-CzsUDvlE 25 — append
// Lines 7434-7737 of readable/assets/main-CzsUDvlE.pretty.js (statement-aligned).
function Ou(e, t, n) {
  let r = j(`div`, `lb-rider off`);
  (r.setAttribute(`role`, `button`),
    r.setAttribute(`aria-label`, `Skaters`),
    r.addEventListener(`click`, t));
  let i = 0,
    a = ``,
    o = () => {
      let t = e();
      r.classList.toggle(`off`, !t?.on);
      let n = t?.on
        ? `${t.x.toFixed(1)},${t.y.toFixed(1)},${t.w.toFixed(1)},${t.h.toFixed(1)}`
        : a;
      (n !== a &&
        ((a = n),
        (r.style.transform = `translate(${t.x.toFixed(1)}px, ${t.y.toFixed(1)}px)`),
        (r.style.width = `${t.w.toFixed(1)}px`),
        (r.style.height = `${t.h.toFixed(1)}px`)),
        (i = requestAnimationFrame(o)));
    };
  return (
    (i = requestAnimationFrame(o)),
    n.addEventListener(`abort`, () => cancelAnimationFrame(i)),
    r
  );
}
function ku(e, t, n) {
  let r = j(`button`, `ico-btn`);
  return (
    (r.type = `button`),
    r.setAttribute(`aria-label`, t),
    r.append(U(e), j(`span`, `ico-label`, t)),
    r.addEventListener(`click`, n),
    r
  );
}
function Au(e, t, n) {
  let r = j(`div`, `lb-chip`),
    i = j(`button`, `lb-face`);
  ((i.type = `button`),
    i.setAttribute(`aria-label`, `Profile`),
    i.addEventListener(`click`, e));
  let a = j(`div`, `lb-who`),
    o = j(`div`, `lb-name-row`),
    s = j(`button`, `lb-name`);
  s.type = `button`;
  let c = j(`span`, `lb-edit`);
  (c.append(U(`pencil`)), s.setAttribute(`aria-label`, `Change your name`));
  let l = j(`button`, `lb-level`);
  ((l.type = `button`),
    l.setAttribute(`aria-label`, `Profile`),
    l.addEventListener(`click`, e));
  let u = j(`span`, `lb-coins`);
  (u.setAttribute(`aria-label`, `Coins`), a.append(o, l, u));
  let d = j(`button`, `lb-pts-call`);
  ((d.type = `button`), (d.hidden = !0), d.addEventListener(`click`, e));
  let f = j(`span`, ``);
  (d.append(B(`star`), f), r.append(i, a, d));
  let p = () => {
    let e = ai(),
      t = e !== 255 && Wi(e) ? Ki[e] : null;
    (i.replaceChildren(G(t ?? oi())),
      s.replaceChildren(j(`span`, ``, J.name), c),
      l.replaceChildren(ka()));
    let n = bc();
    if (n > 0) {
      let e = j(`span`, `nav-badge lb-pts`);
      (e.append(B(`star`), `+${n}`), l.append(e));
    }
    (l.setAttribute(
      `aria-label`,
      n > 0 ? `Profile: ${xc(n)} to spend` : `Profile`,
    ),
      (d.hidden = n <= 0),
      (f.textContent = `${xc(n)} to spend!`));
    let r = N.profile;
    ((u.hidden = !r?.coins),
      u.replaceChildren(B(`coin`), (r ? cn(r) : 0).toLocaleString(`en-US`)),
      !o.contains(s) && !o.querySelector(`input`) && o.replaceChildren(s));
  };
  return (
    s.addEventListener(`click`, () => {
      if (nr() === `pad` || Ye()) {
        t();
        return;
      }
      let e = j(`input`, `lb-name-input`);
      ((e.maxLength = 16),
        (e.value = J.name),
        (e.spellcheck = !1),
        (e.autocomplete = `off`),
        (e.enterKeyHint = `done`),
        e.setAttribute(`aria-label`, `Your skater name`));
      let r = j(`button`, `ico-btn lb-dice`);
      ((r.type = `button`),
        r.setAttribute(`aria-label`, `Random name`),
        r.append(U(`dice`)));
      let i = !1;
      (r.addEventListener(`pointerdown`, () => {
        i = !0;
      }),
        r.addEventListener(`click`, () => {
          ((e.value = yi()), i && e.focus(), (i = !1));
        }));
      let a = () => {
        if (i) return;
        let t = J.name;
        ((J.name = e.value.trim() || t),
          Ir(),
          Yr(),
          o.replaceChildren(s),
          p(),
          N.account &&
            J.name !== t &&
            Bt(J.name).catch(() => {
              ((J.name = N.profile?.named ? N.profile.name : t),
                Ir(),
                Yr(),
                p(),
                n(`Try another name`, `red`));
            }));
      };
      e.addEventListener(`keydown`, (t) => {
        (t.stopPropagation(),
          (t.key === `Enter` || t.key === `Escape`) && e.blur());
      });
      let c = (t) => {
        t.relatedTarget !== e && t.relatedTarget !== r && setTimeout(a, 0);
      };
      (e.addEventListener(`blur`, c),
        r.addEventListener(`blur`, c),
        o.replaceChildren(e, r),
        e.focus(),
        e.select());
    }),
    o.append(s),
    p(),
    { el: r, refresh: p }
  );
}
var ju = (e) => (t) => {
    (t.resolve(), e());
  },
  Mu = 3e3,
  Nu = 250;
function Pu(e) {
  let t = Jo();
  return {
    id: `menu`,
    title: `Menu`,
    hue: e.hue,
    backdrop: t ? `light` : `dim`,
    build(n) {
      (n.root.classList.add(t ? `menu-docked` : `menu-boarded`),
        n.extra.append(j(`span`, `menu-place`, e.place)));
      let r = j(`div`, `menu-line`),
        i = j(`div`, `menu-board`),
        a = {
          id: `resume`,
          label: e.resume ?? `Resume`,
          icon: `play`,
          act: (e) => e.resolve(),
        };
      if (t) {
        let t = {
            id: `more`,
            label: `More`,
            icon: `menu`,
            badge: e.more.find((e) => e.badge)?.badge,
            act: (t) => void t.push(Fu(e, t)),
          },
          i = j(`div`, `menu-dock`);
        for (let r of [a, ...e.actions, ...(e.out ? [e.out] : []), t])
          i.append(Lu(r, n, r === a ? `resume` : ``));
        n.body.append(r, i);
      } else {
        let t = j(`div`, `menu-list`);
        if (
          ((t.dataset.padWrap = ``),
          t.append(Iu(a, n, `resume`), ...e.actions.map((e) => Iu(e, n))),
          e.more.length)
        ) {
          let r = j(`div`, `menu-strip`);
          (r.append(...e.more.map((e) => Lu(e, n))),
            t.append(j(`div`, `menu-eyebrow`, `More`), r));
        }
        ([...(e.out ? [e.out] : []), ...e.quits].forEach((e, r) =>
          t.append(Iu(e, n, r === 0 ? `menu-quit first` : `menu-quit`)),
        ),
          e.note && t.append(j(`p`, `menu-note`, e.note)));
        let o = j(`div`, `menu-wrap`);
        (o.append(t, i), n.body.append(r, o));
      }
      n.body.querySelector(`[data-menu='resume']`).dataset.autofocus = ``;
      let o = ``,
        s = () => {
          let n = e.board(),
            a = JSON.stringify(n);
          a !== o &&
            ((o = a),
            (r.textContent = n.line),
            t || i.replaceChildren(...zu(n)));
        };
      s();
      let c = setInterval(s, Nu);
      n.own(() => clearInterval(c));
    },
  };
}
function Fu(e, t) {
  return {
    id: `menu-more`,
    title: `More`,
    hue: e.hue,
    backdrop: `dim`,
    build(n) {
      let r = j(`div`, `menu-list`);
      ((r.dataset.padWrap = ``),
        r.append(...e.more.map((e) => Iu(e, n, ``, t))),
        e.quits.forEach((e, i) =>
          r.append(Iu(e, n, i === 0 ? `menu-quit first` : `menu-quit`, t)),
        ),
        r.firstElementChild?.setAttribute(`data-autofocus`, ``),
        n.body.append(r));
    },
  };
}
function Iu(e, t, n = ``, r = t) {
  let i = j(`button`, `menu-item ${n}`),
    a = j(`span`, `menu-label`, e.label);
  return (
    i.append(U(e.icon), a),
    e.badge && i.append(j(`span`, `menu-badge`, e.badge)),
    Ru(i, a, e, e.label, t, r)
  );
}
function Lu(e, t, n = ``) {
  let r = j(`button`, `menu-tile ${n}`),
    i = e.short ?? e.label,
    a = j(`span`, `menu-label`, i);
  return (
    r.append(U(e.icon), a),
    e.badge && r.append(j(`span`, `menu-badge`, e.badge)),
    Ru(r, a, e, i, t, t)
  );
}
function Ru(e, t, n, r, i, a) {
  ((e.type = `button`), (e.dataset.menu = n.id));
  let o = null,
    s = () => {
      ((o = null), e.classList.remove(`armed`), (t.textContent = r));
    };
  return (
    e.addEventListener(`click`, () => {
      if (n.confirm && !o) {
        ((t.textContent = n.confirm),
          e.classList.add(`armed`),
          (o = setTimeout(s, Mu)));
        return;
      }
      (o && (clearTimeout(o), s()), n.act(a));
    }),
    i.own(() => {
      o && clearTimeout(o);
    }),
    e
  );
}
function zu(e) {
  let t = j(`div`, `mb-head`);
  (e.sticker && t.append(B(e.sticker)),
    t.append(j(`span`, `mb-title`, e.title)),
    e.clock && t.append(j(`span`, `mb-clock`, e.clock)));
  let n = [t];
  e.sub && n.push(j(`p`, `mb-sub`, e.sub));
  for (let t of e.rows) {
    let e = j(
      `div`,
      `mb-row${t.head ? ` head` : ``}${t.me ? ` me` : ``}${t.dim ? ` dim` : ``}${t.tick ? ` done` : ``}`,
    );
    if (t.rank) e.append(j(`span`, `mb-rank`, String(t.rank)));
    else if (t.tick !== void 0) {
      let n = j(`span`, `mb-tick${t.tick ? ` on` : ``}`);
      (t.tick && n.append(U(`check`)), e.append(n));
    } else t.sticker ? e.append(B(t.sticker)) : t.icon && e.append(U(t.icon));
    (e.append(j(`span`, `mb-text`, t.text)),
      t.pro && e.append(j(`span`, `mb-pro`, `PRO`)),
      t.value && e.append(j(`span`, `mb-value`, t.value)),
      n.push(e));
  }
  return n;
}
var Bu = 140,
  Vu = 1.2,
  Hu = 1500;
function Uu(e, t) {
  return t ? (q[e].min > 1 ? `play vs PRO` : `start solo`) : `ready up`;
}
function Wu(e) {
  let t = q[e];
  return t.min === 1
    ? `Solo or up to ${t.max} skaters`
    : `${t.min}–${t.max} skaters, or you vs a PRO`;
}
