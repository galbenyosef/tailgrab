// assets/main-CzsUDvlE 27 — append
// Lines 8222-8502 of readable/assets/main-CzsUDvlE.pretty.js (statement-aligned).
function qu(e) {
  return {
    id: `play`,
    title: `Play a mode`,
    hue: `#FF8A1F`,
    backdrop: `dim`,
    build(t) {
      let n = j(`div`, `play-list`),
        r = new Map();
      yr.forEach((e, i) => {
        let a = q[e],
          o = j(`button`, `play-mode`);
        ((o.type = `button`),
          o.style.setProperty(`--mc`, a.color),
          i === 0 && (o.dataset.autofocus = ``));
        let s = j(`span`, `pm-words`);
        s.append(
          j(`span`, `pm-name`, a.name),
          j(`span`, `pm-blurb`, a.blurb),
          j(`span`, `pm-size`, Wu(e)),
        );
        let c = j(`span`, `pm-count`);
        (r.set(e, c),
          o.append(B(a.icon, `pm-stk`), s, c),
          o.addEventListener(`click`, () => t.resolve(e)),
          n.append(o));
      });
      let i = () => {
        for (let [t, n] of r) {
          let r = e(t),
            i = r.count
              ? r.left >= 0
                ? `${r.count} in · ${Nt(r.left)}`
                : `${r.count} waiting`
              : ``;
          n.textContent !== i && (n.textContent = i);
        }
      };
      i();
      let a = setInterval(i, 250);
      (t.own(() => clearInterval(a)), t.body.append(n));
    },
  };
}
var Ju = (e) => e.toLocaleString(`en-US`),
  Yu = (e) =>
    `${e}${e % 100 >= 11 && e % 100 <= 13 ? `th` : ([`th`, `st`, `nd`, `rd`][e % 10] ?? `th`)}`;
function Xu(e, t, n) {
  let r = e.portals.get(t);
  return r && r.count >= 2 && r.status === Ct.FILLING
    ? Math.max(0, r.launchAt - n)
    : -1;
}
function Zu(e, t, n, r, i, a) {
  if (a)
    return {
      title: `Skate Hub`,
      sub: `The portals open when the tutorial ends.`,
      rows: [],
      line: `Tutorial: the portals open when it ends`,
    };
  let o = e.skaters.get(t)?.queue ?? ``;
  if (wr(o)) return $u(e, t, o, n);
  let s = [],
    c = [];
  for (let t of yr) {
    let r = e.portals.get(t)?.count ?? 0,
      i = Xu(e, t, n);
    (r && c.push(`${q[t].name}: ${r}`),
      s.push({
        sticker: q[t].icon,
        text: q[t].name,
        value: r ? (i >= 0 ? `${r} in · ${Nt(i)}` : `${r} waiting`) : ``,
        dim: !r,
      }));
  }
  if (r) {
    s.push({ head: !0, text: `Party ${r.code} · ${r.members.length}/4` });
    for (let e of r.members)
      s.push({
        icon: `user`,
        text: e.me ? `You` : e.name,
        value: Qu(e, i),
        me: e.me,
        dim: !e.connected,
      });
  }
  return {
    title: `Portals`,
    rows: s,
    line: c.length
      ? `Waiting · ${c.join(` · `)}`
      : `Nobody's queued yet: start one!`,
  };
}
function Qu(e, t) {
  if (!e.connected) return `away`;
  switch (e.where) {
    case `plaza`:
      return e.room === t ? `here` : `Skate Hub`;
    case `match`:
      return `in a match`;
    case `park`:
      return `in a park`;
    case `career`:
      return `Career`;
    default:
      return `home screen`;
  }
}
function $u(e, t, n, r) {
  let i = q[n],
    a = e.portals.get(n),
    o = a?.count ?? 1,
    s = Xu(e, n, r),
    c = [];
  for (let [r, i] of e.skaters)
    i.queue === n &&
      !i.bot &&
      c.push({ icon: `user`, text: r === t ? `You` : i.name, me: r === t });
  o < i.max && c.push({ text: `${i.max - o} more can join`, dim: !0 });
  let l =
    o <= 1
      ? `Just you so far: start now to ${i.min > 1 ? `play a PRO` : `skate it solo`}, or wait for more.`
      : `${a?.startVotes ?? 0} of ${o} ready. Everyone ready starts it in 3 s.`;
  return {
    title: i.name,
    sticker: i.icon,
    clock: s >= 0 ? Nt(s) : void 0,
    sub: l,
    rows: c,
    line: `${i.name} · ${o}/${i.max}${s >= 0 ? ` · starts in ${Nt(s)}` : ``}`,
  };
}
function ed(e, t, n) {
  return e.mode === `horse`
    ? e.horse.last && e.phase === K.PLAYING
      ? `Final round`
      : `Round ${Math.max(1, e.horse.round)}`
    : e.phase === K.PLAYING
      ? Nt(e.phaseEndsAt - t)
      : e.phase === K.OVERTIME
        ? `LAND IT!`
        : e.phase === K.INTRO || e.phase === K.COUNTDOWN
          ? Nt(n)
          : ``;
}
function td(e, t, n) {
  let r = R(e.career.level),
    i = e.career;
  if (!r) return { title: `Career`, rows: [], line: `` };
  let a = i.goals.filter((e) => e.done).length,
    o = ed(e, t, r.durationMs ?? q.career.durationMs),
    s = n?.career[r.id]?.best ?? 0,
    c = r.goals.map((e, t) => {
      let n = i.goals[t],
        r = [...i.spots]
          .map((e, t) => ({ s: e, j: t }))
          .filter(({ s: e }) => e.goal === t),
        a = r.filter(({ j: e }) => i.got & (1 << e)).length,
        o = !n?.done && r.length > 1 ? `${a}/${r.length}` : void 0;
      return { tick: !!n?.done, text: e.text, value: o, me: !!n?.now };
    });
  return {
    title: r.name,
    sticker: `trophy`,
    clock: o,
    rows: c,
    sub: `${a} of ${r.goals.length} goals${s ? ` · best run ${Ju(s)}` : ``}`,
    line: `${a}/${r.goals.length} goals${o && o !== `LAND IT!` ? ` · ${o} left` : ``}`,
  };
}
function nd(e, t, n) {
  let r = e.mode,
    i = q[r],
    a = ed(e, n, i.durationMs),
    o = [...e.roster.entries()]
      .filter(([, e]) => !e.left)
      .sort(([, e], [, t]) => Tr(r, e, t)),
    s = o.findIndex(([e]) => e === t) + 1;
  return {
    title: i.name,
    sticker: i.icon,
    clock: a,
    sub: i.blurb,
    rows: o.map(([n, i], a) => ({
      rank: a + 1,
      text: n === t ? `You` : i.name,
      value: mr(r, i),
      me: n === t,
      dim: !i.connected,
      pro: !!e.skaters.get(n)?.bot,
    })),
    line: [
      a && (/\d:\d/.test(a) ? `${a} left` : a),
      s && o.length > 1 ? `you're ${Yu(s)} of ${o.length}` : ``,
    ]
      .filter(Boolean)
      .join(` · `),
  };
}
function rd(e, t) {
  let n = [],
    r = 0;
  for (let [i, a] of e.skaters) {
    let o = !!e.editing.get(i);
    (o && r++,
      n.push({
        icon: o ? `build` : `deck`,
        text: i === t ? `You` : a.name,
        value: o ? `building` : `skating`,
        me: i === t,
      }));
  }
  let i = e.daily
    ? `Map of the Day, built by ${e.ownerName}`
    : e.openBuild
      ? `${e.ownerName}'s park · open build: anyone here can build`
      : `${e.ownerName}'s park`;
  return {
    title: e.name,
    sticker: e.daily ? `star` : `hammer`,
    clock: e.daily ? void 0 : e.code,
    sub: i,
    rows: n,
    line: `${n.length} here${r ? ` · ${r} building` : ``}`,
  };
}
var id = class {
  el;
  card;
  constructor(e) {
    ((this.el = j(`div`, `wipe`)),
      (this.card = j(`div`, `wipe-card`)),
      this.el.append(this.card),
      e.append(this.el));
  }
  async cover(e, t, n = {}) {
    this.card.replaceChildren();
    let r = n.mode ? q[n.mode] : null;
    if (
      (r
        ? this.el.style.setProperty(`--wipe`, r.color)
        : this.el.style.removeProperty(`--wipe`),
      this.card.append(
        n.icon
          ? F(`div`, `wipe-kicker`, n.icon, e)
          : j(`div`, `wipe-kicker`, e),
      ),
      r && this.card.append(F(`div`, `wipe-title`, r.icon, r.name)),
      this.card.append(j(`div`, `wipe-sub`, t)),
      n.roster?.length)
    ) {
      let e = j(`div`, `wipe-roster`);
      for (let t of n.roster) {
        let n = j(`div`, `wipe-chip`);
        (n.append(
          Gn(t.skater, t.look ?? ``, `wipe-face`),
          j(`span`, ``, t.name),
        ),
          e.append(n));
      }
      this.card.append(e);
    }
    (this.el.classList.add(`on`), await od(520));
  }
  async reveal() {
    (this.el.classList.add(`leaving`),
      await od(520),
      this.el.classList.remove(`on`, `leaving`));
  }
  get covered() {
    return this.el.classList.contains(`on`);
  }
};
function ad(e, t = e) {
  return xr(e) ?? t;
}
function od(e) {
  return new Promise((t) => setTimeout(t, e));
}
