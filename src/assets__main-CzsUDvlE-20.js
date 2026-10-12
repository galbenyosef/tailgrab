// assets__main-CzsUDvlE 20 — gain
// Lines 5841-6102 of readable/assets__main-CzsUDvlE.pretty.js (statement-aligned).
var Yl = class {
  t;
  show = null;
  live = 0;
  skipping = !1;
  xpTo = 0;
  starsShown = 0;
  count = null;
  gain = null;
  lvl = null;
  chests = Promise.resolve();
  unlocks = [];
  announcing = !1;
  constructor(e) {
    this.t = e;
  }
  get busy() {
    return this.live > 0;
  }
  skip() {
    ((this.skipping = !0), this.show && (this.show.skipping = !0));
  }
  async claim(e, t, n) {
    e.catch(() => {});
    let r = this.begin(),
      i = t.querySelector(`.ms-pay`) ?? t,
      a = i.getBoundingClientRect();
    try {
      let o = ir(t);
      (t.append(j(`div`, `ms-stamp`, `DONE!`)),
        t.classList.add(`claiming`),
        t.querySelector(`.ms-claim`)?.setAttribute(`disabled`, ``),
        Y.ui(`claim`),
        await r.wait(100),
        Y.ui(`stamp`),
        L(t, `thud`),
        r.confetti(o.x, o.y, 30, 0.8),
        n && r.float(o.x, o.r.top + 10, `+${n.toLocaleString()} XP`),
        await r.wait(140));
      let s = await e,
        c = s.events.find((e) => e.kind === `claimed`);
      if (!c) return;
      (t.classList.add(`claimed`),
        await this.payout(r, s, Kl(i, a), c.xp, c.stars));
    } finally {
      this.end();
    }
  }
  async crate(e, t) {
    e.catch(() => {});
    let n = this.begin(),
      r = t.querySelector(`.ms-crate-art`) ?? t,
      i = r.getBoundingClientRect();
    try {
      let a = !1,
        o = () => {
          a = !0;
        },
        s = e.then(o, o);
      (t.classList.add(`opening`),
        t.querySelector(`.ms-open`)?.setAttribute(`disabled`, ``));
      for (let e = 0; e < 3; e++)
        (L(r, `rattle`), Y.ui(`rattle`), await n.wait(240 - e * 50));
      for (; !a;)
        (L(r, `rattle`),
          Y.ui(`rattle`),
          await Promise.race([s, new Promise((e) => setTimeout(e, 160))]));
      let c = await e,
        l = c.events.find((e) => e.kind === `crate`);
      if (!l) return;
      let u = ql(Kl(r, i));
      (t.classList.add(`burst`),
        Y.ui(`crate`),
        n.rays(u.x, u.y, 60, 1100),
        n.confetti(u.x, u.y, 70, 1.4),
        n.float(u.x, u.y - 40, `+${l.xp.toLocaleString()} XP`, `big`),
        l.streak > 1 &&
          setTimeout(
            () =>
              n.float(
                u.x,
                u.y + 30,
                `${l.streak}-day streak!`,
                `streak`,
                `flame`,
              ),
            200,
          ),
        await n.wait(450),
        await this.payout(n, c, u.r, l.xp, l.stars));
    } finally {
      this.end();
    }
  }
  begin() {
    return (
      this.live++ ||
        ((this.show = new lr(!1)),
        (this.show.skipping = this.skipping),
        (this.xpTo = this.t.xp.shown),
        (this.starsShown = Number(this.t.starCount.textContent) || 0)),
      this.show
    );
  }
  end() {
    --this.live ||
      (this.show?.end(),
      (this.show = this.gain = this.lvl = null),
      this.announce());
  }
  async payout(e, t, n, r, i) {
    let a = wt(t.profile),
      o = t.events.filter((e) => e.kind === `chest`),
      s = o.reduce((e, t) => e + t.xp, 0),
      c = t.was ? Math.max(0, a.xp - t.was.xp - s) : r;
    if (
      (await Promise.all([this.flyXp(e, n, c), this.flyStars(e, n, i)]),
      o.length)
    ) {
      let t = this.chests.then(() => this.popChests(e, o));
      ((this.chests = t.catch(() => {})), await t);
    }
    let l = t.was?.missions.stars ?? a.missions.stars - i,
      u = t.events.reduce(
        (e, t) => (t.kind === `levelUp` ? Math.max(e, t.level) : e),
        0,
      );
    for (let e of t.events) {
      if (e.kind !== `skater`) continue;
      let t = Qi(a.missions.stars).some((t) => t.pro === e.skater && t.at > l);
      this.unlocks.push(
        Xl(
          e.skater,
          t ? `from the Star Road` : u ? `for reaching LV ${u}` : ``,
        ),
      );
    }
  }
  async flyXp(e, t, n) {
    let r = this.t,
      i = r.xp.el.querySelector(`.lvl-badge`) ?? r.xp.el,
      a = Array.from({ length: Gl }, (n, a) =>
        e.fly(t, i, `bolt`, a * 60).then(() => {
          (L(r.xp.el, `hit`), Y.ui(`xp`, a));
        }),
      );
    await Promise.all([...a, a[0].then(() => this.addXp(e, n, !0))]);
  }
  async flyStars(e, t, n) {
    let r = this.t,
      i = r.stars.querySelector(`.ico`) ?? r.stars;
    await Promise.all(
      Array.from({ length: n }, (n, a) =>
        e.fly(t, i, `star`, 150 + a * 90).then(() => {
          ((r.starCount.textContent = String(++this.starsShown)),
            L(r.stars, `pop`),
            Y.ui(`star`));
        }),
      ),
    );
  }
  addXp(e, t, n) {
    let r = this.t;
    if (n && t) {
      if (this.gain?.el.isConnected)
        ((this.gain.n += t),
          (this.gain.el.textContent = `+${this.gain.n.toLocaleString()} XP`),
          this.gain.el.animate([{ scale: 1.3 }, { scale: 1 }], {
            duration: 220,
            easing: `cubic-bezier(.3,1.8,.5,1)`,
          }));
      else {
        let n = ir(r.xp.el);
        this.gain = {
          el: e.float(
            n.x,
            n.r.bottom + 28,
            `+${t.toLocaleString()} XP`,
            `gain`,
          ),
          n: t,
        };
      }
    }
    ((this.xpTo += t), r.xp.el.classList.add(`filling`));
    let i = (this.count = r.xp.animateTo(
      this.xpTo,
      () => e.skipping,
      (t) => this.levelUp(e, t),
    ));
    return i.then(() => {
      this.count === i && r.xp.el.classList.remove(`filling`);
    });
  }
  levelUp(e, t) {
    let n = ir(this.t.xp.el);
    (this.gain?.el.remove(),
      (this.gain = null),
      this.lvl?.isConnected
        ? ((this.lvl.textContent = `LEVEL ${t}!`),
          this.lvl.animate([{ scale: 1.5 }, { scale: 1 }], {
            duration: 260,
            easing: `cubic-bezier(.3,1.8,.5,1)`,
          }))
        : (this.lvl = e.float(n.x, n.y + 30, `LEVEL ${t}!`, `lvl`)),
      e.confetti(n.x, n.y, 24, 0.6));
  }
  async popChests(e, t) {
    for (let n of t)
      (await Jl(e, n.xp),
        L(this.t.xp.el, `hit`),
        Y.ui(`xp`),
        await this.addXp(e, n.xp, !1));
  }
  async announce() {
    if (!this.announcing) {
      this.announcing = !0;
      try {
        for (; this.unlocks.length && !this.busy;)
          await this.t.push(this.unlocks.shift());
      } finally {
        this.announcing = !1;
      }
    }
  }
};
function Xl(e, t) {
  let n = qi(e);
  return {
    id: `unlock`,
    title: ``,
    hue: `#FFB800`,
    backdrop: `solid`,
    build(e) {
      let r = j(`div`, `unlock`),
        i = j(`div`, `rays still`),
        a = G(n, `unlock-art`, !0),
        o = j(`div`, `unlock-words`);
      (o.append(
        j(`div`, `unlock-kicker`, `NEW SKATER UNLOCKED`),
        j(`div`, `unlock-name`, n.name),
      ),
        t && o.append(j(`div`, `unlock-sub`, t)));
      let s = V(`SWEET!`, `big primary unlock-ok`, () => e.resolve());
      ((s.dataset.autofocus = ``), r.append(i, a, o, s), e.body.append(r));
      let c = setTimeout(
        () => {
          (a.classList.remove(`locked`), L(a, `flip`), Y.ui(`fanfare`));
          let e = ir(a);
          if (!A()) {
            let t = new lr(!1);
            (t.confetti(e.x, e.y, 90, 1.6), setTimeout(() => t.end(), 1800));
          }
        },
        A() ? 0 : 650,
      );
      e.own(() => clearTimeout(c));
    },
  };
}
var Zl = { daily: `Daily`, weekly: `Weekly` },
  Ql = `.ms-claim:not([disabled]), .ms-open:not([disabled])`;
