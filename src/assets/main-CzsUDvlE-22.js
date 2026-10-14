// assets/main-CzsUDvlE 22 — append
// Lines 6418-6761 of readable/assets/main-CzsUDvlE.pretty.js (statement-aligned).
function cu(e, t, n) {
  let r = ft(e),
    i = Qi(Math.max(la, t) + 100),
    a = i.find((e) => e.at > t),
    o = j(`section`, `ms-col ms-road`);
  ((o.dataset.key = `road:${t}:${[...r].join(`,`)}`), (o.dataset.sig = ``));
  let s = j(`div`, `ms-top`),
    c = ca(t),
    l = j(`span`, `sr-next`);
  l.append(
    B(`star`),
    j(`b`, ``, String(c.at - t)),
    ` to ${c.pro === void 0 ? `${c.xp?.toLocaleString()} XP chest` : qi(c.pro).name}`,
  );
  let u = i.filter((e) => e.pro !== void 0),
    d = j(`span`, `sr-tally`);
  (d.append(
    j(`b`, ``, String(u.filter((e) => r.has(e.pro)).length)),
    `/${u.length} skaters`,
  ),
    s.append(j(`span`, `ms-kicker`, `Star Road`), l, d));
  let f = j(`div`, `sr-wrap`),
    p = j(`div`, `sr-road`),
    m = 0,
    h = 0;
  return (
    i.forEach((e, i) => {
      let o = n >= 0 && n < t && n < e.at && t > m;
      (p.append(lu(e, m, t, n, r, e === a, i, o ? h++ : -1)), (m = e.at));
    }),
    (o.dataset.grow = String(h)),
    f.append(p),
    o.append(s, f),
    n < 0 && o.classList.add(`in`),
    o
  );
}
function lu(e, t, n, r, i, a, o, s) {
  let c = n >= e.at,
    l = e.pro !== void 0 && i.has(e.pro),
    u = (n) =>
      String(Math.max(0, Math.min(1, (n - t) / Math.max(1, e.at - t)))),
    d = j(`div`, `sr-stop ${c ? `got` : a ? `next` : l ? `own` : `ahead`}`);
  d.style.setProperty(`--i`, String(o));
  let f = j(`div`, `sr-seg`);
  if (
    (f.style.setProperty(`--fill`, u(n)),
    s >= 0 &&
      (d.style.setProperty(`--k`, String(s)),
      f.style.setProperty(`--from`, u(r)),
      f.classList.add(`grow`),
      c && d.classList.add(`fresh`)),
    d.append(f),
    a)
  ) {
    let e = j(`div`, `sr-ring ${s >= 0 ? `grow` : ``}`);
    (e.style.setProperty(`--sr-p`, u(n)),
      s >= 0 && e.style.setProperty(`--from`, u(r)),
      d.append(e));
  }
  let p = j(`div`, `sr-at`);
  p.append(B(`star`), j(`b`, ``, String(e.at)));
  let m, h, g;
  if (e.pro !== void 0) {
    let t = qi(e.pro);
    ((m = G(t, `sr-art`, !l)),
      (h = t.name),
      (g = c ? `Unlocked` : l ? `Yours already` : `Skater`));
  } else
    ((m = j(`div`, `sr-art sr-chest`)),
      c && m.append(U(`chestOpen`)),
      (!c || d.classList.contains(`fresh`)) &&
        m.append(U(`chest`, c ? `sr-shut` : ``)),
      (h = `${e.xp?.toLocaleString()} XP`),
      (g = c ? `Opened` : `Chest`));
  a && (g = `${e.at - n} to go`);
  let _ = j(`div`, `sr-words`);
  return (
    _.append(j(`span`, `sr-sub`, g), j(`b`, ``, h)),
    d.append(p, m, _),
    c || l
      ? d.append(U(`check`, `sr-tick`))
      : a || d.append(U(`lock`, `sr-lock`)),
    d
  );
}
function uu(e, t) {
  let n = j(`div`, `today interactive`),
    r = j(`button`, `today-head`);
  r.type = `button`;
  let i = j(`span`, `today-count`);
  (r.append(
    U(`missions`),
    j(`span`, `today-title`, `Today`),
    Sl(`daily`, t),
    i,
  ),
    r.addEventListener(`click`, () => e()));
  let a = j(`div`, `today-rows`),
    o = j(`button`, `today-week`);
  ((o.type = `button`),
    o.addEventListener(`click`, () => e()),
    n.append(r, a, o));
  let s = [],
    c = () => {
      let t = N.profile;
      if (((n.hidden = !t || !t.missions.daily.slots.length), !t)) return;
      let r = t.missions.daily;
      ((i.textContent = `${r.slots.filter((e) => e.claimed).length}/${r.slots.length}`),
        a.replaceChildren(
          ...r.slots.map((t, n) => {
            let i = aa(t.id),
              a = ea(t) && !t.claimed,
              o = `${r.period}:${t.id}`,
              c = j(
                `button`,
                `today-row ${a ? `ready` : ``} ${t.claimed ? `claimed` : ``} ${s[n] === o ? `` : `in`}`,
              );
            ((s[n] = o),
              (c.type = `button`),
              (c.dataset.today = String(n)),
              c.style.setProperty(`--i`, String(n)));
            let l = j(`div`, `today-words`);
            return (
              l.append(j(`span`, `today-text`, ta(i, t.goal)), xl(i, t)),
              c.append(U(t.claimed ? `check` : _l(i), `today-ico`), l),
              a && c.append(j(`span`, `today-cta`, `CLAIM`)),
              c.addEventListener(`click`, () =>
                e(a ? { cadence: `daily`, i: n } : void 0),
              ),
              c
            );
          }),
        ));
      let c = sa(r);
      if (c) {
        let t = j(
          `button`,
          `today-row ready crate ${s[r.slots.length] === `ready` ? `` : `in`}`,
        );
        ((t.type = `button`),
          t.append(
            U(`crate`, `today-ico`),
            j(`span`, `today-text`, `Daily Crate`),
            j(`span`, `today-cta`, `OPEN`),
          ),
          t.addEventListener(`click`, () => e()),
          a.append(t));
      }
      s[r.slots.length] = c ? `ready` : ``;
      let l = t.missions.weekly,
        u = l.slots.some((e) => ea(e) && !e.claimed) || sa(l);
      (o.classList.toggle(`ready`, u),
        (o.textContent = `Weekly ${l.slots.filter((e) => e.claimed).length}/${l.slots.length}${u ? ` · rewards waiting!` : ``}`));
    };
  return (c(), { el: n, refresh: c });
}
function du(e) {
  if (!e.connected) return `RECONNECTING…`;
  switch (e.where) {
    case `plaza`:
      return `IN THE SKATE HUB`;
    case `match`:
      return `IN A MATCH`;
    case `park`:
      return `IN A PARK`;
    case `career`:
      return `IN CAREER`;
  }
  return e.ready ? `READY` : ``;
}
var fu = class {
  layer;
  dock;
  nav;
  slots;
  wave;
  toast;
  add;
  plates = new Map();
  open = ``;
  busy = !1;
  raf = 0;
  constructor(e) {
    ((this.nav = e.nav),
      (this.slots = e.slots),
      (this.wave = e.wave),
      (this.toast = e.toast),
      (this.layer = j(`div`, `lb-party`)),
      (this.dock = j(`div`, `lb-party-dock`)),
      (this.add = j(`button`, `pp-add`)),
      (this.add.type = `button`),
      this.add.setAttribute(`aria-label`, `Invite friends`),
      this.add.append(U(`plus`), j(`span`, `pp-add-label`, `INVITE`)),
      this.add.addEventListener(`click`, () => void this.invite()),
      this.layer.append(this.add));
    let t = Vr((e) => this.render(e)),
      n = ci((e) => {
        (this.add.classList.toggle(`wait`, e),
          this.add.setAttribute(`aria-disabled`, String(e)),
          this.add.setAttribute(`aria-busy`, String(e)));
      }),
      r = () => {
        (this.place(), (this.raf = requestAnimationFrame(r)));
      };
    ((this.raf = requestAnimationFrame(r)),
      e.signal.addEventListener(`abort`, () => {
        (t(), n(), cancelAnimationFrame(this.raf));
      }));
  }
  shake(e) {
    for (let t of e) {
      let e = this.plates.get(t);
      e && L(e.el, `shake`);
    }
  }
  async invite() {
    if (this.busy || X.connecting) return;
    if (!X.view) {
      this.busy = !0;
      try {
        await Ur();
      } catch (e) {
        this.toast(`Couldn't start a party: ${P(e)}`, `red`);
        return;
      } finally {
        this.busy = !1;
      }
    }
    let e = X.view?.code;
    e && this.nav.open(Wa(e));
  }
  async join() {
    let e = await this.nav.open(Ga());
    if (!e || this.busy) return;
    if (`create` in e) return this.invite();
    let { code: t } = e;
    this.busy = !0;
    try {
      (await Jr(t), this.toast(`You're in the party!`, `mint`, `popper`));
    } catch (e) {
      this.toast(`Couldn't join ${t}: ${P(e)}`, `red`);
    } finally {
      this.busy = !1;
    }
  }
  render(e) {
    if ((this.dock.replaceChildren(), e)) {
      let t = j(`button`, `pp-code`);
      ((t.type = `button`),
        t.setAttribute(`aria-label`, `Party ${e.code}: invite`),
        t.append(j(`span`, `pp-code-k`, `PARTY`), j(`b`, ``, e.code)),
        t.addEventListener(`click`, () => void this.invite()));
      let n = V(`LEAVE`, `tiny ghost pp-leave`, () => {
        if (!n.classList.contains(`armed`)) {
          (n.classList.add(`armed`),
            (n.textContent = `LEAVE?`),
            setTimeout(() => {
              (n.classList.remove(`armed`), (n.textContent = `LEAVE`));
            }, 3e3));
          return;
        }
        li();
      });
      this.dock.append(t, n);
    } else {
      let e = V(``, `secondary pp-join`, () => void this.join());
      (e.append(U(`party`), j(`span`, ``, `JOIN PARTY`)), this.dock.append(e));
    }
    let t = e ? e.members.filter((e) => !e.me) : [],
      n = e && t.length ? [e.me, ...t] : [],
      r = new Set();
    n.forEach((t, n) => {
      r.add(t.sid);
      let i = this.plates.get(t.sid);
      if (!i) {
        let e = j(`div`, `pp-plate`);
        (this.layer.append(e),
          (i = { el: e, slot: n }),
          this.plates.set(t.sid, i));
      }
      ((i.slot = t.me ? 0 : n), this.fill(i.el, t, e));
    });
    for (let [e, t] of this.plates)
      r.has(e) || (t.el.remove(), this.plates.delete(e));
    (this.open && !r.has(this.open) && (this.open = ``),
      (this.add.dataset.slot = String(t.length + 1)),
      this.add.classList.toggle(`gone`, t.length >= 3),
      this.place());
  }
  fill(e, t, n) {
    e.className = `pp-plate ${t.me ? `me` : ``} ${t.ready ? `ready` : ``} ${t.present ? `` : `away`} ${this.open === t.sid ? `open` : ``}`;
    let r = j(`button`, `pp-tag`);
    ((r.type = `button`),
      r.setAttribute(
        `aria-label`,
        t.me ? `You` : n.isLeader ? `${t.name}: party options` : t.name,
      ),
      t.me && (r.dataset.padSkip = ``),
      t.leader && r.append(U(`crown`, `pp-crown`)),
      r.append(
        j(`span`, `pp-lv`, String(t.level)),
        j(`span`, `pp-name`, t.me ? `YOU` : t.name),
      ),
      r.addEventListener(`click`, () => {
        t.me ||
          (this.wave(t.sid),
          n.isLeader &&
            ((this.open = this.open === t.sid ? `` : t.sid),
            X.view && this.render(X.view)));
      }),
      e.replaceChildren(r));
    let i = du(t);
    if (
      (i && e.append(j(`span`, `pp-status`, i)),
      this.open === t.sid && n.isLeader && !t.me)
    ) {
      let n = j(`div`, `pp-acts`),
        r = V(`MAKE LEADER`, `tiny secondary`, () => {
          ((this.open = ``), Gr(`promote`, { sid: t.sid }));
        });
      t.connected || (r.disabled = !0);
      let i = V(`KICK`, `tiny ghost`, () => {
        if (!i.classList.contains(`armed`)) {
          (i.classList.add(`armed`), (i.textContent = `KICK?`));
          return;
        }
        ((this.open = ``), Gr(`kick`, { sid: t.sid }));
      });
      (n.append(r, i), e.append(n));
    }
  }
  place() {
    let e = this.slots(),
      t = (t, n, r) => {
        let i = e[n];
        (t.classList.toggle(`off`, !i?.on),
          i?.on &&
            (t.style.transform = `translate(${i.x.toFixed(1)}px, ${i.y.toFixed(1)}px) translate(${r})`));
      };
    for (let e of this.plates.values()) t(e.el, e.slot, `-50%, -100%`);
    t(this.add, Number(this.add.dataset.slot ?? 1), `-50%, 80%`);
  }
};
