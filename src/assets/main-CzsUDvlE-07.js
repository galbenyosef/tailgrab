// assets/main-CzsUDvlE 07 — append
// Lines 1755-2057 of readable/assets/main-CzsUDvlE.pretty.js (statement-aligned).
async function Vo() {
  if (!Io || !Lo) return new Map();
  let e = gt.flatMap((e) => Ro(e) ?? []),
    t = new Map();
  for (let [n, r] of await Io.prices(e)) {
    let e = Vt(Lo, n);
    e && t.set(e, r);
  }
  return t;
}
var Ho = (e) => e?.code ?? 0;
async function Uo(e, t = !1, n = !1) {
  if (!Io || !Lo || !e.length) return { held: [], pending: [], events: [] };
  let r;
  try {
    r = (
      await an.http.post(`/iap/claim`, {
        body: { store: Lo, items: e.map((e) => e.claim), move: t },
      })
    ).data;
  } catch (t) {
    let n = Ho(t);
    if (n >= 400 && n < 500) for (let t of e) Io.finish(t).catch(() => {});
    throw t;
  }
  Tt(r.profile, n ? r.events : []);
  for (let t of e) Io.finish(t).catch((e) => console.warn(`[store] finish`, e));
  return { held: r.held, pending: r.pending, events: r.events };
}
async function Wo(e) {
  let t = Ro(e);
  if (!Io || !t) throw Error(`not sold here`);
  let n = await Io.purchase(t, await Bo());
  return n ? Uo([n]) : null;
}
async function Go(e = !1) {
  return Io ? Uo(await Io.owned(!0), e) : { held: [], pending: [], events: [] };
}
function Ko() {
  Io &&
    (Io.onUpdate(
      (e) =>
        void In()
          .then(() => Uo([e], !1, !0))
          .catch((e) => console.warn(`[store] update`, e)),
    ),
    In()
      .then(async () => Uo(await Io.owned(), !1, !0))
      .catch((e) => console.warn(`[store] launch check`, e)));
}
function qo(e) {
  let t = j(`div`, `dock`),
    n = j(`div`, `zone-r`),
    r = j(`div`, `zr-head`);
  n.append(r);
  let i = j(`div`, `lane`);
  return (
    e.append(t, n, i),
    new ResizeObserver(() =>
      e.style.setProperty(`--lane-h`, `${i.offsetHeight}px`),
    ).observe(i),
    { root: e, me: t, match: n, head: r, lane: i }
  );
}
var Jo = () => document.body.classList.contains(`touch`),
  Yo = 0;
function Xo(e, t) {
  let n = (n) => {
    e.some((e) => e.contains(n.target)) || t();
  };
  (document.addEventListener(`pointerdown`, n, !0),
    document.body.classList.add(`panel-open`),
    Yo++);
  let r = !0;
  return () => {
    r &&
      ((r = !1),
      document.removeEventListener(`pointerdown`, n, !0),
      --Yo === 0 && document.body.classList.remove(`panel-open`));
  };
}
var Zo = 6e3,
  Qo = 550,
  $o = [
    [-5, -16],
    [84, -20],
    [101, 34],
    [58, 96],
    [-7, 74],
    [30, -24],
    [95, 86],
  ];
function es(e, t) {
  e.classList.add(`secret`);
  let n = j(`span`, `uc-art`);
  (er(n, t), n.append(G(t.look, `uc-portrait`)));
  let r = j(`div`, `uc-words`);
  r.append(
    j(`span`, `uc-kicker`, `SECRET UNLOCKED`),
    j(`span`, `uc-name`, t.name),
    j(`span`, `uc-deed`, t.deed),
  );
  let i = j(`div`, `sx-frame`);
  i.append(n, r);
  let a = $o.map(([e, t], n) => {
    let r = B(`sparkle`, `sx-spark`);
    return ((r.style.cssText = `left:${e}%;top:${t}%;--i:${n}`), r);
  });
  if (
    (e.replaceChildren(i, j(`i`, `sx-sheen`), ...a),
    e.setAttribute(`aria-label`, `Secret unlocked: ${t.name}`),
    Y.secret(),
    A())
  )
    return () => {};
  let o = e.getBoundingClientRect(),
    s = innerWidth * 0.72,
    c = innerHeight * 0.07,
    l = o.left + o.width * 0.16,
    u = o.top + o.height / 2,
    d = Math.atan2(u - c, l - s),
    f = j(`div`, `sx-streak`);
  (document.body.append(f),
    f.animate(
      [
        { transform: `translate(${s}px,${c}px) rotate(${d}rad) scale(.6)` },
        { transform: `translate(${l}px,${u}px) rotate(${d}rad) scale(1.1)` },
      ],
      { duration: Qo, easing: `cubic-bezier(.45,0,.85,.7)`, fill: `both` },
    ));
  let p = setTimeout(() => {
    f.remove();
    let e = sr(1500);
    (e.rays(l, u, 18, 800), e.confetti(l, u, 16, 0.4));
  }, Qo);
  return () => {
    (clearTimeout(p), f.remove());
  };
}
var ts = 4500,
  ns = 3e3,
  rs = 1500,
  is = 8e3,
  as = () => (Jo() ? { thumbs: 2, dots: 2 } : { thumbs: 3, dots: 4 }),
  os = 96,
  UnlockQueue = class {
    wait;
    el;
    card;
    queue = [];
    cur = null;
    shownAt = 0;
    until = 0;
    thumbs = new AbortController();
    reveal = () => {};
    constructor(e) {
      ((this.wait = e),
        (this.el = j(`div`, `unlock-slot`)),
        (this.card = j(`div`, `unlock-card`)),
        this.card.setAttribute(`role`, `status`),
        this.el.append(this.card));
    }
    add(e) {
      for (let t of e) {
        if (t.kind !== `loose`) {
          this.queue.push(t);
          continue;
        }
        let e =
          this.cur?.kind === `loose` && this.until
            ? this.cur
            : this.queue.find((e) => e.kind === `loose`);
        if (!e) {
          this.queue.push({
            kind: `loose`,
            pieces: [...t.pieces],
            colors: [...t.colors],
          });
          continue;
        }
        (e.pieces.push(...t.pieces.filter((t) => !e.pieces.includes(t))),
          e.colors.push(...t.colors.filter((t) => !e.colors.includes(t))),
          e === this.cur &&
            ((this.until = Math.min(
              this.shownAt + is,
              Math.max(this.until, performance.now() + rs),
            )),
            this.render(e)));
      }
    }
    clear() {
      ((this.queue = []), this.hide());
    }
    update(e) {
      (this.cur && e >= this.until && this.hide(),
        !(this.cur || !this.queue.length || this.wait()) &&
          ((this.cur = this.queue.shift()),
          (this.shownAt = e),
          (this.until =
            e + (this.cur.kind === `skin` ? Zo : this.queue.length ? ns : ts)),
          this.render(this.cur),
          this.card.classList.remove(`out`),
          this.card.classList.add(`on`),
          this.cur.kind !== `skin` && Y.ui(`letter`)));
    }
    hide() {
      this.cur &&
        ((this.cur = null),
        (this.until = 0),
        this.thumbs.abort(),
        this.reveal(),
        (this.reveal = () => {}),
        this.card.classList.remove(`on`),
        this.card.classList.add(`out`));
    }
    render(e) {
      if (
        (this.thumbs.abort(),
        (this.thumbs = new AbortController()),
        this.reveal(),
        (this.reveal = () => {}),
        this.card.classList.remove(`secret`),
        e.kind === `skin`)
      ) {
        let t = jr(e.skin);
        t && (this.reveal = es(this.card, t));
        return;
      }
      let t = j(`span`, `uc-art`),
        n = j(`div`, `uc-words`);
      if (e.kind === `pro`) {
        let r = qi(e.pro);
        (er(t, r),
          t.append(G(r, `uc-portrait`)),
          n.append(
            j(`span`, `uc-kicker`, `NEW SKATER`),
            j(`span`, `uc-name`, r.name),
          ),
          this.card.replaceChildren(t, n),
          this.card.setAttribute(`aria-label`, `New skater: ${r.name}`));
        return;
      }
      let r = oi();
      (e.pieces.length
        ? t.append(cs(e.pieces[0], r, `uc-thumb`, os, this.thumbs.signal))
        : t.append(ls(e.colors[0], `uc-blob`)),
        n.append(
          j(`span`, `uc-kicker`, `NEW IN YOUR STYLE`),
          j(`span`, `uc-name`, us(e)),
        ));
      let i = e.pieces.slice(1),
        { thumbs: a, dots: o } = as(),
        s = j(`span`, `uc-row`);
      for (let e of i.slice(0, a))
        s.append(cs(e, r, `uc-thumb`, os, this.thumbs.signal));
      let c = e.pieces.length ? e.colors : e.colors.slice(1);
      for (let e of c.slice(0, o)) s.append(ls(e, `uc-dot`));
      let l = Math.max(0, i.length - a) + Math.max(0, c.length - o);
      (l && s.append(j(`span`, `uc-more`, `+${l}`)),
        s.childElementCount && n.append(s),
        this.card.replaceChildren(t, n),
        this.card.setAttribute(
          `aria-label`,
          `New in Your Style: ${us(e)}${i.length + c.length ? `, with ${ds(i.length, c.length)}` : ``}`,
        ));
    }
  };
function cs(e, t, n, r = os, i) {
  let [a, o] = e.split(`:`),
    s = j(`span`, n),
    c = new Image();
  return (
    (c.alt = ``),
    (c.decoding = `async`),
    s.append(c),
    Un({ ...t, [a]: o, c: { ...t.c } }, a, r, i).then((e) => {
      e && ((c.src = e), s.classList.add(`has-img`));
    }),
    s
  );
}
function ls(e, t) {
  let n = j(`span`, t);
  return ((n.style.background = `#${e.slice(-6)}`), n);
}
function us(e) {
  let t = e.pieces.length + e.colors.length;
  return t === 1
    ? Ln(e.pieces[0] ?? e.colors[0])
    : e.colors.length
      ? e.pieces.length
        ? ds(e.pieces.length, e.colors.length)
        : `${t} new colors`
      : `${t} new pieces`;
}
function ds(e, t) {
  return [
    e ? `${e} piece${e === 1 ? `` : `s`}` : ``,
    t ? `${t} color${t === 1 ? `` : `s`}` : ``,
  ]
    .filter(Boolean)
    .join(` · `);
}
