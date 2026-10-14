// assets__main-CzsUDvlE 08 — append
// Lines 2058-2401 of readable/assets__main-CzsUDvlE.pretty.js (statement-aligned).
function fs(e, t) {
  let n = ut[e];
  return new Promise((e) => {
    let r,
      i = rt(dn(), n.name, `pack-show pack-show-${n.kind}`, () => {
        (clearTimeout(r), e());
      }),
      a = (e = !0) => {
        let t = ir(i.body),
          n = sr(1800);
        (n.confetti(t.x, t.y, e ? 48 : 24, e ? 1 : 0.6),
          e && n.rays(t.x, t.y, 40, 900));
      },
      o = (e) => {
        let t = V(e, `big primary`, i.close);
        ((t.dataset.autofocus = ``), i.foot.replaceChildren(t), t.focus());
      };
    if (n.kind === `secrets`) {
      let e = t.flatMap((e) =>
          e.startsWith(`skin:`) ? (jr(e.slice(5)) ?? []) : [],
        ),
        n = 0,
        s = () => {
          if ((clearTimeout(r), n >= e.length)) {
            i.close();
            return;
          }
          let t = e[n++];
          (i.body.replaceChildren(ps(t)), Y.secret(), a(n === 1));
          let o = n >= e.length,
            c = V(o ? `DONE` : `NEXT`, `big primary`, s);
          ((c.dataset.autofocus = ``),
            i.foot.replaceChildren(
              ...(o ? [] : [V(`SKIP`, `big ghost`, i.close)]),
              c,
            ),
            c.focus(),
            A() || (r = setTimeout(s, Zo)));
        };
      if (e.length) {
        s();
        return;
      }
      (i.body.replaceChildren(
        j(`p`, `pack-show-line`, `Every secret skater to come is yours too.`),
      ),
        o(`NICE`));
      return;
    }
    let s = j(`div`, `pack-show-kicker`),
      c = j(`p`, `pack-show-line`),
      l = j(`div`, `pack-show-art`);
    if (n.kind === `noads`)
      ((s.textContent = `THANK YOU!`),
        l.append(B(n.sticker, `pack-show-stk`)),
        (c.textContent = `No more ad breaks, and every ad reward is a tap.`));
    else if (n.kind === `pros`) {
      let e = t.flatMap((e) =>
        e.startsWith(`pro:`) ? (Ki[Number(e.slice(4))] ?? []) : [],
      );
      ((s.textContent = `YOURS NOW!`),
        e.forEach((e, t) => {
          let n = G(e, `pack-show-pro`);
          (n.style.setProperty(`--i`, String(t)), l.append(n));
        }),
        (c.textContent = e.length
          ? `${e.length} new pro${e.length === 1 ? `` : `s`}, and every pro to come.`
          : `Every pro to come is yours too.`));
    } else {
      let e = oi(),
        n = t.filter((e) => !e.startsWith(`color:`));
      ((s.textContent = `NEW IN YOUR STYLE`),
        n.forEach((t, n) => {
          let r = cs(t, e, `pack-show-piece`, 192);
          (r.style.setProperty(`--i`, String(n)), l.append(r));
        }),
        (c.textContent = n.length
          ? `${n.length} new piece${n.length === 1 ? `` : `s`} to wear.`
          : `All of it was yours already.`));
    }
    (i.body.replaceChildren(s, l, c), Y.ui(`fanfare`), a(), o(`NICE`));
  });
}
function ps(e) {
  let t = j(`div`, `pack-show-skin`),
    n = j(`span`, `pack-show-skin-art`);
  (er(n, e), n.append(G(e.look, `pack-show-skin-pic`)));
  for (let [e, t, r] of [
    [-6, -10, 0],
    [88, 4, 1],
    [80, 82, 2],
    [-4, 70, 3],
  ]) {
    let i = B(`sparkle`, `pack-show-spark`);
    ((i.style.cssText = `left:${e}%;top:${t}%;--i:${r}`), n.append(i));
  }
  let r = j(`div`, `pack-show-skin-words`);
  return (
    r.append(
      j(`span`, `pack-show-kicker`, `SECRET UNLOCKED`),
      j(`span`, `pack-show-skin-name`, e.name),
      j(`span`, `pack-show-deed`, `The deed: ${e.deed}`),
    ),
    t.append(n, r),
    t
  );
}
var ms = {
    noads: [`#ffd21f`, `#ff8a1f`],
    pros: [`#1fc7e8`, `#4f6bff`],
    secrets: [`#a55bff`, `#3a1d7a`],
    "style:street": [`#2fd67b`, `#139e9a`],
    "style:party": [`#ff3d7f`, `#a55bff`],
    "style:royal": [`#ff8a1f`, `#c2286b`],
  },
  hs = 4;
function gs(e) {
  return {
    id: `packs`,
    title: `Packs`,
    hue: `#FF8A1F`,
    build(t) {
      let n = j(`div`, `pack-grid`),
        r = j(`p`, `page-note pack-msg`),
        i = j(`div`, `pack-acts`),
        a = new Map(),
        o = !1,
        s = !1,
        c = (t, n) => {
          let r = ut[t],
            i = N.profile,
            c = j(
              `div`,
              `pack-card pack-${r.kind} ${s ? `` : `in`} ${t === e ? `focus` : ``}`,
            );
          ((c.style.cssText = `--c1:${ms[t][0]};--c2:${ms[t][1]};--i:${n}`),
            (c.dataset.pack = t));
          let l = Lt(i),
            d = j(`div`, `pack-art`),
            f = r.blurb,
            p = !1;
          if (r.kind === `noads`) d.append(j(`span`, `pack-noad`, `AD`));
          else if (r.kind === `pros`) {
            let e = Ki.filter((e) => l.has(`pro:${e.id}`)),
              t = Ki.filter((e) => !l.has(`pro:${e.id}`)),
              n = j(`span`, `pack-crew`);
            ([...e, ...t].slice(0, hs).forEach((e, t) => {
              let r = G(e, `pack-pro`, !l.has(`pro:${e.id}`));
              (r.style.setProperty(`--k`, String(t)), n.append(r));
            }),
              Ki.length > hs &&
                n.append(j(`span`, `pack-more`, `+${Ki.length - hs}`)),
              d.append(n),
              (f = `${e.length} of ${Ki.length} yours. ${r.blurb}`));
          } else if (r.kind === `secrets`) {
            let e = j(`span`, `pack-foil`);
            e.append(j(`b`, ``, `?`));
            for (let t of [0, 1, 2]) {
              let n = B(`sparkle`, `pack-spark`);
              (n.style.setProperty(`--k`, String(t)), e.append(n));
            }
            d.append(e);
          } else {
            let e = oi(),
              n = r.keys ?? [],
              a = n.filter((e) => !l.has(e)),
              o = j(`span`, `pack-pieces`);
            for (let t of n.slice(0, 4)) {
              let n = cs(t, e, `pack-piece ${l.has(t) ? `have` : ``}`, 160);
              o.append(n);
            }
            (d.append(o),
              (p = !a.length),
              (f = Ut(i, t)
                ? r.blurb
                : p
                  ? `You have all of these already.`
                  : `${a.length} new for you. ${r.blurb}`));
          }
          let m = B(r.sticker, `pack-stk`),
            h = j(`div`, `pack-foot`);
          if (Ut(i, t)) h.append(j(`span`, `pack-owned`, `OWNED`));
          else if (!p) {
            let n = a.get(t),
              r = V(
                n ? `BUY · ${n}` : `BUY`,
                `primary pack-buy`,
                () => void u(() => Wo(t), t),
              );
            ((r.disabled = o || !n),
              t === e && (r.dataset.autofocus = ``),
              h.append(r));
          }
          return (
            c.append(
              m,
              d,
              j(`div`, `pack-name`, r.name),
              j(`p`, `pack-sub`, f),
              h,
            ),
            c
          );
        },
        l = () => {
          (n.replaceChildren(...gt.map(c)), (s = !0));
        },
        u = async (e, t) => {
          ((o = !0), (r.textContent = ``), l());
          let n = null;
          try {
            n = await e();
          } catch (e) {
            r.textContent = P(e);
          }
          if (((o = !1), l(), n)) {
            if (
              (n.pending.length &&
                (r.textContent = `Waiting for your payment: it unlocks once it clears.`),
              n.held.length)
            ) {
              let e = [
                ...new Set(n.held.map((e) => `${e.name} #${e.tag}`)),
              ].join(`, `);
              ((r.textContent = `${n.held.map((e) => ut[e.product].name).join(`, `)} ${n.held.length === 1 ? `is` : `are`} on ${e}. Move ${n.held.length === 1 ? `it` : `them`} here?`),
                i.replaceChildren(
                  V(`MOVE THEM HERE`, `primary`, () => void u(() => Go(!0))),
                  d,
                ));
            } else i.replaceChildren(d);
            for (let e of n.events)
              e.kind === `paid` &&
                (e.product === t || !t) &&
                (await fs(e.product, e.keys));
            !t &&
              !n.held.length &&
              !n.pending.length &&
              !n.events.some((e) => e.kind === `paid`) &&
              (r.textContent = `Nothing new to restore.`);
          }
        },
        d = V(`RESTORE PURCHASES`, `ghost`, () => void u(() => Go()));
      (i.append(d),
        t.body.append(n, r, i),
        t.own(M(l)),
        l(),
        e &&
          requestAnimationFrame(() => {
            let r = n.querySelector(`[data-pack="${e}"]`),
              i = t.body;
            if (!r || t.signal.aborted) return;
            let a = r.offsetTop - i.offsetTop;
            a + r.offsetHeight > i.clientHeight &&
              (i.scrollTop = a - (i.clientHeight - r.offsetHeight) / 2);
          }),
        Vo().then(
          (e) => {
            ((a = e), l());
          },
          (e) => {
            r.textContent = `The store didn't answer: ${P(e)}`;
          },
        ));
    },
  };
}
var _s = [
    { id: `head`, label: `Critter`, word: `Critter`, ico: `face` },
    { id: `top`, label: `Top`, word: `Top`, ico: `tee` },
    { id: `bottom`, label: `Bottoms`, word: `Bottoms`, ico: `shorts` },
    { id: `hat`, label: `Hat`, word: `Hat`, ico: `cap` },
    { id: `acc`, label: `Gear`, word: `Gear`, ico: `backpack` },
    { id: `riding`, label: `Riding`, word: `Riding style`, ico: `deck` },
  ],
  vs = new Map(_s.map((e) => [e.id, e])),
  ys = {
    fur: `Fur`,
    accent: `Markings`,
    hair: `Hair & spots`,
    top: `Color`,
    bottom: `Color`,
    shoes: `Shoes`,
    sole: `Soles`,
    hat: `Color`,
    acc: `Color`,
    deck0: `Deck`,
    deck1: `Deck print`,
  },
  bs = { head: `head`, top: `top`, bottom: `bottom`, hat: `hat`, acc: `acc` },
  xs = 160,
  Ss = 256,
  Cs = (e, t) => e[t],
  ws = (e, t, n) => ({ ...e, [t]: n, c: { ...e.c } });
function Ts(e) {
  let t = Lt(N.profile),
    n = Object.keys(ze).map((t) => `${t}:${Cs(e, t)}`),
    r = js(e).map((t) => Ne(Ue(t), e.c[t].slice(1)));
  return [...new Set([...n, ...r])].filter((e) => !t.has(e));
}
function Es(e, t = `cas-price`) {
  let n = j(`span`, t);
  return (n.append(B(`coin`), e.toLocaleString(`en-US`)), n);
}
function Ds(e, t, n, r = 450) {
  let i = (e) => Math.round(e).toLocaleString(`en-US`);
  if (t === n || A()) {
    e.textContent = i(n);
    return;
  }
  let a = performance.now(),
    o = () => {
      let s = Math.min(1, (performance.now() - a) / r);
      ((e.textContent = i(t + (n - t) * (1 - (1 - s) ** 3))),
        s < 1 && requestAnimationFrame(o));
    };
  requestAnimationFrame(o);
}
var Os = () => (N.profile ? cn(N.profile) : 0),
  ks = (e) =>
    e.length > 1
      ? `${e.slice(0, -1).join(`, `)} and ${e[e.length - 1]}`
      : (e[0] ?? ``),
  As = () => Hr() && !!N.profile && rn(N.profile, ua(vn()));
function js(e) {
  let t = yt();
  if (!t) return [...Ae];
  let n = t.manifest,
    r = n.heads[e.head],
    i = Fa(e, r),
    a = new Set(n.board.slots);
  for (let e of i.body) for (let t of n.body[e]?.slots ?? []) a.add(t);
  for (let e of i.head) for (let t of r.items[e].slots) a.add(t);
  return Ae.filter((e) => a.has(e));
}
var Ms = `freeskater-style-draft`,
  Ns = (() => {
    try {
      let e = JSON.parse(sessionStorage.getItem(Ms) ?? `null`),
        t = e ? ke(e.look) : null;
      return e && t ? { look: t, style: e.style, uid: e.uid } : null;
    } catch {
      return null;
    }
  })();
