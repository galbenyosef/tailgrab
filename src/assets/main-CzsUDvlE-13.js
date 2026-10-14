// assets/main-CzsUDvlE 13 — append
// Lines 3771-4098 of readable/assets/main-CzsUDvlE.pretty.js (statement-aligned).
function mc(e) {
  let t = Qe(e.id),
    n = et(t, N.profile),
    r = [
      ...(e.nick ? [j(`div`, `sd-kicker`, `“${e.nick}”`)] : []),
      j(`div`, `sd-name`, e.name),
    ];
  if (!n)
    return [
      ...r,
      j(
        `p`,
        `sd-bio sd-mystery`,
        On(t)
          ? Zr()
            ? `Yours to unlock.`
            : `Unlocks with an ad.`
          : `Unlock to find out more.`,
      ),
    ];
  let i = j(`div`, `sd-how`);
  i.append(ic(n, `sd-mark`), j(`span`, ``, vt(n.rule)));
  let a = j(`div`, `sd-prog`);
  (a.append(sc(n), j(`span`, `sd-count`, oc(n))),
    r.push(j(`div`, `sd-sub`, `How to unlock`), i, a));
  let o = cc(n);
  return (
    o && r.push(j(`p`, `sd-tip`, o)),
    n.ad && Zr()
      ? r.push(j(`p`, `sd-tip sd-or`, `Or skip the wait: unlock this pro now.`))
      : n.ad &&
        Si !== `off` &&
        r.push(
          j(
            `p`,
            `sd-tip sd-or`,
            `Or skip the wait: one ad unlocks this pro for good.`,
          ),
        ),
    r
  );
}
function hc(e, t, n) {
  let r = [e.nick ? `“${e.nick}”` : ``, `a nod to ${e.homage}`, e.stance]
    .filter(Boolean)
    .join(` · `);
  return [
    j(`div`, `sd-kicker`, r),
    j(`div`, `sd-name`, e.name),
    j(`p`, `sd-bio`, e.bio),
    ...fc(e.stats),
    pc(t, n),
  ];
}
function gc(e, t, n) {
  let r = Ui[e.style],
    i = [e.nick ? `“${e.nick}”` : ``, `secret`, `rides ${r.name}`]
      .filter(Boolean)
      .join(` · `);
  return [
    j(`div`, `sd-kicker`, i),
    j(`div`, `sd-name`, e.name),
    j(`p`, `sd-bio`, e.legend),
    j(
      `p`,
      `sd-deed`,
      `${on(N.profile, e.key) ? `Earned` : `The deed`}: ${e.deed}`,
    ),
    ...fc(r.stats),
    pc(t, n),
  ];
}
function _c(e, t, n) {
  let r = e === J.skater && t === J.color,
    i = V(
      r ? `SELECTED` : `SELECT`,
      `big primary sd-go ${r ? `is-mine` : ``}`,
      n,
    );
  return ((i.dataset.autofocus = ``), [i]);
}
var statDefs = {
    air: { label: `Air`, icon: `air`, what: `Higher ollies, bigger vert air` },
    speed: {
      label: `Speed`,
      icon: `bolt`,
      what: `Faster pushes and top speed`,
    },
    spin: { label: `Spin`, icon: `spin`, what: `Quicker rotation` },
    balance: {
      label: `Balance`,
      icon: `balance`,
      what: `Steadier manuals, grinds and lips`,
    },
  },
  yc = Qt * Tn.length,
  bc = () => (N.profile ? Et(N.profile).free : 0),
  xc = (e) => `${e} stat point${e === 1 ? `` : `s`}`,
  Sc = (e) => `+${+(Zi * 100 * e).toFixed(1)}%`;
function Cc(e, t) {
  (e.classList.toggle(`off`, !t), e.setAttribute(`aria-disabled`, String(!t)));
}
var StatPointsBank = class {
  el = j(`div`, `sp`);
  bank = j(`div`, `sp-bank`);
  bankStar = j(`span`, `sp-bank-star`);
  bankN = j(`b`, `sp-bank-n`);
  bankLabel = j(`span`, `sp-bank-label`);
  bankSub = j(`span`, `sp-bank-sub`);
  err = j(`div`, `sp-err`);
  rows = new Map();
  pending = [];
  chain = Promise.resolve();
  lastEarned = -1;
  errTimer;
  off;
  constructor() {
    this.bankStar.append(B(`star`));
    let e = j(`div`, `sp-bank-words`);
    (e.append(this.bankLabel, this.bankSub),
      this.bank.append(this.bankStar, this.bankN, e));
    let t = j(`div`, `sp-rows`);
    (Tn.forEach((e, n) => {
      let r = statDefs[e],
        i = j(`div`, `sp-row`);
      i.style.setProperty(`--i`, String(n));
      let a = j(`span`, `sp-ico`);
      a.append(U(r.icon));
      let o = j(`div`, `sp-words`);
      o.append(j(`span`, `sp-label`, r.label), j(`span`, `sp-what`, r.what));
      let s = j(`div`, `sp-pipbox`),
        c = j(`span`, `segs sp-pips`),
        l = Array.from({ length: Qt }, () => c.appendChild(j(`i`, ``)));
      s.append(c, j(`span`, `sp-max`, `MAX`));
      let u = j(`b`, ``),
        d = j(`span`, `sp-next`),
        f = j(`div`, `sp-bonus`);
      f.append(u, d);
      let p = V(`−`, `tiny ghost sp-step sp-minus`, () => this.tap(e, -1)),
        m = V(`+`, `primary sp-step sp-plus`, () => this.tap(e, 1));
      (p.setAttribute(`aria-label`, `${r.label} down`),
        m.setAttribute(`aria-label`, `${r.label} up`));
      let h = (e) => i.classList.toggle(`preview`, e);
      (m.addEventListener(`pointerenter`, () => h(!0)),
        m.addEventListener(`pointerleave`, () =>
          h(document.activeElement === m),
        ),
        m.addEventListener(`focus`, () => h(!0)),
        m.addEventListener(`blur`, () => h(!1)),
        i.append(a, o, s, f, p, m),
        t.append(i),
        this.rows.set(e, {
          el: i,
          pips: l,
          box: s,
          bonus: u,
          next: d,
          minus: p,
          plus: m,
        }));
    }),
      this.el.append(this.bank, t, this.err),
      this.sync());
    let n = [...this.rows.values()].find(
      (e) => !e.plus.classList.contains(`off`),
    );
    (n && (n.plus.dataset.autofocus = ``), (this.off = M(() => this.sync())));
  }
  dispose() {
    (this.off(), clearTimeout(this.errTimer));
  }
  view() {
    if (!N.profile) return null;
    let e = structuredClone(N.profile);
    for (let t of this.pending) xt(e, t.k, t.d);
    return e;
  }
  sync() {
    let e = this.view();
    if (!e) return;
    let t = Et(e),
      n = t.spent >= yc;
    (this.bank.classList.toggle(`has`, t.free > 0),
      (this.bankN.textContent = String(t.free)),
      (this.bankLabel.textContent = n
        ? `EVERY STAT MAXED!`
        : t.free > 0
          ? t.free === 1
            ? `POINT TO SPEND!`
            : `POINTS TO SPEND!`
          : t.earned
            ? `ALL SET!`
            : `NO POINTS YET`),
      (this.bankSub.textContent =
        t.earned >= yc
          ? `All ${yc} earned`
          : `${t.earned}/${yc} earned · every career goal earns one`),
      this.lastEarned >= 0 &&
        t.earned > this.lastEarned &&
        (L(this.bank, `up`), Y.ui(`star`)),
      (this.lastEarned = t.earned));
    for (let n of Tn) {
      let r = this.rows.get(n),
        i = e.stats[n],
        a = t.free > 0 && i < Qt;
      (r.pips.forEach((e, t) => {
        (e.classList.toggle(`on`, t < i),
          e.classList.toggle(`next`, a && t === i));
      }),
        r.el.classList.toggle(`maxed`, i >= Qt),
        r.el.classList.toggle(`can`, a),
        (r.bonus.textContent = Sc(i)),
        (r.next.textContent = a ? `→ ${Sc(i + 1)}` : ``),
        Cc(r.plus, a),
        Cc(r.minus, i > 0),
        r.plus.classList.toggle(`glow`, a));
    }
  }
  tap(e, t) {
    let n = this.view();
    if (!n || !xt(n, e, t)) {
      this.nope(e, t, n);
      return;
    }
    (this.pending.push({ k: e, d: t }),
      this.sync(),
      this.celebrate(e, t, n),
      (this.chain = this.chain.then(async () => {
        let n = null;
        try {
          n = await Wt(e, t);
        } catch (e) {
          console.warn(`[stats]`, e);
        }
        (this.pending.shift(), n ? Tt(n) : this.failed(e));
      })));
  }
  celebrate(e, t, n) {
    let r = this.rows.get(e),
      i = n.stats[e];
    if ((L(this.bankN, `pop`), t < 0)) {
      (r.pips[i].classList.remove(`in`),
        A() || L(r.pips[i], `out`),
        Y.ui(`statDown`));
      return;
    }
    let a = r.pips[i - 1];
    if (
      (a.classList.remove(`out`),
      Y.ui(`statUp`, i / Qt),
      Et(n).free === 0 && Et(n).spent < yc && L(this.bank, `done`),
      A())
    )
      return;
    L(a, `in`);
    let o = sr(2e3);
    o.fly(this.bankStar.getBoundingClientRect(), a, `star`, 0, 300).then(() => {
      if (!a.isConnected) return;
      let t = ir(a);
      if (
        (L(r.bonus, `pop`),
        o.confetti(t.x, t.y, 10, 0.3),
        o.float(t.x, t.y - 30, `${Sc(1)} ${statDefs[e].label.toUpperCase()}`, `gain`),
        i < Qt)
      )
        return;
      let n = ir(r.box);
      r.box.querySelector(`.sp-stamp`)?.remove();
      let s = j(`span`, `sp-stamp`, `MAXED!`);
      (r.box.append(s),
        setTimeout(() => s.remove(), 1500),
        o.rays(n.x, n.y, 28, 900),
        o.confetti(n.x, n.y, 40, 0.7),
        Y.ui(`statMax`));
    });
  }
  nope(e, t, n) {
    let r = this.rows.get(e);
    (L(t > 0 ? r.plus : r.minus, `shake`),
      Y.ui(`bonk`),
      t > 0 && n && Et(n).free <= 0 && L(this.bankSub, `flash`));
  }
  failed(e) {
    (this.sync(),
      L(this.rows.get(e).el, `shake`),
      (this.err.textContent = `Couldn't save that one. Check your connection and try again.`),
      clearTimeout(this.errTimer),
      (this.errTimer = setTimeout(() => {
        this.err.textContent = ``;
      }, 3500)));
  }
};
function Tc() {
  return {
    id: `profile`,
    title: `Profile`,
    hue: `#FF3D7F`,
    build(e) {
      let t = null,
        n = () => {
          (t?.dispose(),
            e.body.replaceChildren(),
            (t = Dc(e.body, () => void e.push(gs()))));
        };
      (n(),
        e.own(
          M(() => {
            t?.live ? t.sync() : n();
          }),
        ),
        e.own(() => t?.dispose()),
        N.account ||
          In().then(() => {
            e.signal.aborted || n();
          }));
    },
  };
}
var profileStats = [
  [`career`, (e) => `${Math.round(gn(e) * 100)}%`],
  [`best combo`, (e) => e.life.bestCombo.toLocaleString()],
  [`points banked`, (e) => e.life.banked.toLocaleString()],
  [`career runs`, (e) => String(e.life.runs)],
  [`matches`, (e) => String(e.life.matches)],
  [`wins`, (e) => String(e.life.wins)],
  [`bails`, (e) => String(e.life.bails)],
  [`hub goals`, (e) => String(e.plaza.length)],
];
