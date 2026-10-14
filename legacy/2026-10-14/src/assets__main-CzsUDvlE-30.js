// assets__main-CzsUDvlE 30 — append
// Lines 9415-10400 of readable/assets__main-CzsUDvlE.pretty.js (statement-aligned).
var Ad = {
    trick: `Biggest score wins`,
    graffiti: `Paint the most pieces`,
    skate: `Grab all five letters first`,
    tag: `Someone's IT at GO — keep away!`,
  },
  jd = 1,
  Md = 2,
  Nd = 3,
  Pd = 4,
  Q = (e) => e.toLocaleString(),
  Fd = 900,
  Id = 1500,
  Ld = () => (nr() === `pad` ? hi().a : `Enter`),
  Rd = (e) => e.text.split(`:`)[0].toUpperCase(),
  zd = (e) => e.split(` `)[0],
  Bd = class {
    root;
    clock;
    board;
    widget;
    side;
    center;
    results;
    mode;
    lastPhase = -1;
    lastCount = -1;
    boardKey = ``;
    widgetKey = ``;
    send;
    leave;
    onGo = () => {};
    now = () => 0;
    onCount = () => {};
    onMenu = () => {};
    onLevels = () => {};
    onNext = () => {};
    onStats = () => {};
    news = [];
    newsEl = j(`div`, `rs-news`);
    career = null;
    trackerOpen = null;
    clearing = new Map();
    goalsNow = null;
    outSize = new Map();
    onRound = () => {};
    sfx = () => {};
    comboOf = () => 0;
    clockSub = j(`div`, `clock-sub`);
    horseEls = null;
    stripKey = ``;
    cardKey = ``;
    cardCount = null;
    countdown = null;
    horseCue = ``;
    dangerEl = null;
    run = null;
    shown = 0;
    target = 0;
    tween = null;
    holdUntil = 0;
    stamp = null;
    chipKey = ``;
    constructor(e, t, n, r) {
      ((this.mode = t),
        (this.send = n),
        (this.leave = r),
        (this.root = j(`div`, `match-hud mode-${t}`)),
        (this.clock = j(`div`, `match-clock`)),
        (this.board = j(`div`, `scoreboard`)),
        (this.widget = j(`div`, `mode-widget mode-${t}`)),
        (this.side = j(`div`, `mode-side mode-${t}`)),
        (this.center = j(`div`, `center-stage`)),
        (this.results = j(`div`, `results interactive`)),
        this.root.append(this.center, this.results));
      for (let e of [this.root, this.clock, this.board, this.widget, this.side])
        e.style.setProperty(`--mc`, q[t].color);
      (e.root.append(this.root),
        t === `career` &&
          (this.career = new Cd(this.results, this.news, {
            send: n,
            leave: r,
            menu: () => this.onMenu(),
            levels: () => this.onLevels(),
            stats: () => this.onStats(),
            next: (e) => this.onNext(e),
            sfx: (e, t) => this.sfx(e, t),
            now: () => this.now(),
            armMs: Fd,
          })),
        e.head.prepend(this.clock),
        e.match.append(
          this.clockSub,
          ...(t === `career` || t === `horse` ? [] : [this.board]),
          this.side,
        ),
        e.lane.append(this.widget),
        (t === `trick` || t === `career`) &&
          ((this.run = {
            el: j(`div`, `run mode-${t}`),
            score: j(`div`, `run-score`, `0`),
            chip: j(`div`, `run-chip off`),
          }),
          this.run.el.style.setProperty(`--mc`, q[t].color),
          this.run.el.append(this.run.score, this.run.chip),
          e.me.prepend(this.run.el)));
    }
    get scoreEl() {
      return this.run?.score ?? null;
    }
    holdScore(e) {
      this.holdUntil = performance.now() + e;
    }
    releaseScore() {
      this.holdUntil = 0;
    }
    update(e, t, n) {
      (q[this.mode], e.phase !== this.lastPhase && this.enterPhase(e, t));
      let r = this.mode === `horse`,
        i = e.phase === K.INTRO || e.phase === K.COUNTDOWN,
        a = ``,
        o = ``;
      (e.phase === K.PLAYING && !r
        ? (a = Nt(e.phaseEndsAt - n))
        : e.phase === K.OVERTIME
          ? (a = `LAND IT!`)
          : e.phase === K.GATHER
            ? ((a = `Waiting for skaters…`),
              (o = `warm up — nothing counts until GO`))
            : r && (i || e.phase === K.PLAYING)
              ? (a =
                  e.horse.last && e.phase === K.PLAYING
                    ? `FINAL ROUND`
                    : `ROUND ${Math.max(1, e.horse.round)} / 12`)
              : i && (a = Nt(this.playMs(e))),
        this.clock.textContent !== a && (this.clock.textContent = a),
        this.clockSub.textContent !== o && (this.clockSub.textContent = o),
        this.clock.classList.toggle(
          `hurry`,
          e.phase === K.PLAYING && e.phaseEndsAt - n < 1e4 && !r,
        ),
        this.clock.classList.toggle(`ot`, e.phase === K.OVERTIME),
        this.clock.classList.toggle(`round`, r));
      let s = e.playStartsAt > 0 && n >= e.playStartsAt;
      if (e.phase === K.COUNTDOWN && !s) {
        let r = e.playStartsAt - n,
          i = Math.ceil(r / 1e3);
        i !== this.lastCount &&
          i >= 1 &&
          i <= 3 &&
          ((this.lastCount = i),
          this.bigCenter(String(i), `c${i}`, this.cue(e, t)),
          this.onCount(i));
      } else
        this.lastCount > 0 &&
          s &&
          (e.phase === K.COUNTDOWN || e.phase === K.PLAYING) &&
          ((this.lastCount = 0),
          r ? this.clearCenter() : (this.bigCenter(`GO!`, `go`), this.onGo()));
      let c = [...e.roster.entries()]
          .filter(([, e]) => !e.left)
          .sort(([, e], [, t]) => Tr(this.mode, e, t)),
        l = c
          .map(([e, t]) => `${e}:${mr(this.mode, t)}:${t.connected}`)
          .join(`|`);
      (l !== this.boardKey &&
        ((this.boardKey = l),
        this.board.replaceChildren(),
        c.forEach(([e, n], r) => {
          let i = j(
              `div`,
              `sb-row ${e === t ? `me` : ``} ${n.connected ? `` : `away`}`,
            ),
            a = j(`span`, `sb-dot`);
          ((a.style.background = Xi[n.color] ?? `#fff`),
            i.append(
              j(`span`, `sb-rank`, String(r + 1)),
              a,
              j(`span`, `sb-name`, n.name),
              Vd(this.mode, n, `sb-fig`),
            ),
            this.board.append(i));
        })),
        this.updateWidget(e, t, n, c),
        this.run && this.updateRun(e, t, c));
    }
    updateRun(e, t, n) {
      let r = this.run,
        i = performance.now(),
        a = e.roster.get(t)?.score ?? 0,
        o = this.shown;
      if (
        (a < this.target || e.phase === K.GATHER || e.phase === K.INTRO
          ? ((this.target = this.shown = a), (this.tween = null))
          : (this.target = a),
        !this.tween &&
          this.shown < this.target &&
          i >= this.holdUntil &&
          (A()
            ? (this.shown = this.target)
            : ((this.tween = { from: this.shown, to: this.target, t0: i }),
              L(r.score, `bump`))),
        this.tween)
      ) {
        let e = Math.min(1, (i - this.tween.t0) / 650);
        ((this.shown = Math.round(
          this.tween.from +
            (this.tween.to - this.tween.from) * (1 - (1 - e) ** 3),
        )),
          e >= 1 && (this.tween = null));
      }
      let s = Q(this.shown);
      (r.score.textContent !== s && (r.score.textContent = s),
        this.updateChip(e, t, n, o, i));
    }
    updateChip(e, t, n, r, i) {
      let a = ``,
        o = !1,
        s = [];
      if (this.mode === `career`) {
        let t = R(e.career.level),
          n = !!t && Zt(t, (t) => !!e.career.goals[t]?.done),
          c = (t?.goals ?? [])
            .flatMap((r, i) =>
              r.kind === `score` &&
              (!e.career.goals[i]?.done || e.career.goals[i]?.now) &&
              (!n || t?.starter?.includes(r.id))
                ? [r]
                : [],
            )
            .sort((e, t) => e.pts - t.pts);
        for (let e of c)
          r < e.pts &&
            this.shown >= e.pts &&
            (this.stamp = { text: `${Rd(e)} ✓`, until: i + 1600 });
        if (this.stamp && i < this.stamp.until)
          ((a = this.stamp.text), (o = !0));
        else {
          let e = c.find((e) => e.pts > this.shown);
          e && ((a = Rd(e)), (s = [`in `, { n: e.pts - this.shown }]));
        }
      } else if (n.length > 1) {
        let e = n.findIndex(([e]) => e === t),
          r = n[e]?.[1].score ?? 0;
        if (e === 0) {
          let e = r - n[1][1].score;
          ((a = `#1`), (s = e > 0 ? [{ n: e }, ` ahead`] : [`tied`]));
        } else if (e > 0) {
          let t = n[0][1],
            i = t.score - r;
          ((a = `#${e + 1}`),
            (s =
              i > 0
                ? [{ n: i }, ` behind ${zd(t.name)}`]
                : [`tied with ${zd(t.name)}`]));
        }
      }
      let c = `${a}|${s.map((e) => (typeof e == `string` ? e : e.n)).join(``)}`;
      if (c === this.chipKey) return;
      let l = o && !this.chipKey.startsWith(`${a}|`);
      this.chipKey = c;
      let u = this.run.chip;
      if (
        (u.classList.toggle(`off`, !a),
        u.classList.toggle(`done`, o),
        u.replaceChildren(),
        !a)
      )
        return;
      let d = j(`span`, `run-tag`, a),
        f = j(`span`, ``);
      (f.append(
        ...s.map((e) => (typeof e == `string` ? e : j(`b`, ``, Q(e.n)))),
      ),
        u.append(d, f),
        l && L(d, `stamp`));
    }
    updateWidget(e, t, n, r) {
      let i = e.roster.get(t),
        a = ``;
      switch (this.mode) {
        case `graffiti`: {
          let t = e.graffiti.size || 1;
          if (
            ((a = r.map(([e, t]) => `${e}:${t.pieces}`).join(`|`) + t),
            a === this.widgetKey)
          )
            return;
          this.widget.replaceChildren();
          let n = j(`div`, `territory`),
            o = 0;
          for (let [, e] of r) {
            if (!e.pieces) continue;
            o += e.pieces;
            let t = j(`div`, `terr-seg`);
            ((t.style.flex = String(e.pieces)),
              (t.style.background = Xi[e.color]),
              n.append(t));
          }
          let s = j(`div`, `terr-seg empty`);
          ((s.style.flex = String(Math.max(0, t - o))),
            n.append(s),
            this.widget.append(
              F(
                `div`,
                `w-label`,
                `spray`,
                `${i?.pieces ?? 0} of ${t} pieces are yours`,
              ),
              n,
              j(`div`, `w-sub`, `Land combos of 250+ on pieces to paint them`),
            ));
          break;
        }
        case `skate`: {
          if (((a = String(i?.letters ?? 0)), a === this.widgetKey)) return;
          this.widget.replaceChildren();
          let e = j(`div`, `letter-chips`);
          for (let t = 0; t < 5; t++) {
            let n = j(
              `span`,
              `lchip ${(i?.letters ?? 0) & (1 << t) ? `on` : ``}`,
              Cr[t],
            );
            e.append(n);
          }
          this.widget.append(e);
          break;
        }
        case `tag`: {
          let r = e.tag.itId,
            i = r === t,
            o = e.phase === K.PLAYING || e.phase === K.OVERTIME,
            s = i && n < e.tag.graceUntil,
            c = nr();
          if (((a = `${r}|${i}|${s}|${Zn()}|${o}`), a === this.widgetKey))
            return;
          this.widget.replaceChildren();
          let l = e.roster.get(r)?.name ?? ``,
            u =
              !o || !r
                ? ``
                : i
                  ? s
                    ? `GET READY…`
                    : `YOU'RE IT! GO GET 'EM!`
                  : `${l} is IT — keep away!`,
            d = j(`div`, `w-sub tag-hint`);
          (o && i
            ? d.append(
                `Bump into someone to pass it · `,
                Xn(`look`, c),
                ` look behind`,
              )
            : d.append(`Hold `, Xn(`look`, c), ` to look behind`),
            u &&
              this.widget.append(
                j(`div`, `tag-banner ${i ? `me` : ``} ${s ? `grace` : ``}`, u),
              ),
            this.widget.append(d));
          break;
        }
        case `horse`:
          this.horseHud(e, t, n);
          return;
        case `career`: {
          let t = R(e.career.level);
          if (!t) return;
          let n = e.career,
            r = e.phase === K.PLAYING || e.phase === K.OVERTIME,
            i = this.trackerOpen ?? !r,
            o = performance.now(),
            s = this.goalsNow;
          ((this.goalsNow = n.goals.map((e) => e.now)),
            n.goals.forEach((e, t) => {
              e.now && s?.[t] === !1 && this.clearing.set(t, o);
            }));
          for (let [e, t] of this.clearing)
            (o - t >= Id || !n.goals[e]?.now) && this.clearing.delete(e);
          if (
            (this.clearing.size || this.outSize.clear(),
            (a =
              n.goals.map((e) => `${+!!e.done}${+!!e.now}`).join(``) +
              `|${n.got}|${n.spots.length}|${i}|${[...this.clearing.keys()]}`),
            a === this.widgetKey)
          )
            return;
          let c = new Map([...this.clearing].map(([e, t]) => [e, o - t]));
          (this.side.replaceChildren(
            Hd(t, e, i, c, () => {
              ((this.trackerOpen = !i), (this.widgetKey = ``));
            }),
          ),
            this.sizeOuts());
          break;
        }
        default:
          if (((a = ``), this.widgetKey === a)) return;
          this.widget.replaceChildren();
      }
      this.widgetKey = a;
    }
    sizeOuts() {
      for (let e of this.side.querySelectorAll(`.cg-out`)) {
        let t = e.dataset.out,
          n = this.outSize.get(t);
        (n || this.outSize.set(t, (n = [e.offsetWidth, e.offsetHeight])),
          e.style.setProperty(`--w`, `${n[0]}px`),
          e.style.setProperty(`--h`, `${n[1]}px`));
      }
    }
    enterPhase(e, t) {
      let n =
        e.phase === K.INTRO ||
        (e.phase === K.COUNTDOWN && this.lastPhase !== K.INTRO);
      if (
        ((this.lastPhase = e.phase),
        this.results.classList.remove(`on`),
        e.phase !== K.RESULTS && this.career?.stop(),
        e.phase === K.INTRO)
      ) {
        let t = q[this.mode],
          n = this.mode === `career` ? R(e.career.level) : void 0;
        this.center.replaceChildren();
        let r = j(`div`, `intro-sticker`);
        if (n) {
          let i = e.career.goals.filter((e) => e.done).length,
            a =
              i >= n.need
                ? `${i}/${n.goals.length} goals · cleared — go for 100%!`
                : Zt(n, (t) => !!e.career.goals[t]?.done)
                  ? `${i}/${n.need} goals to clear`
                  : `${i}/${n.goals.length} goals · land ${n.need} to clear`;
          r.append(
            F(`div`, `is-mode ribbon`, t.icon, n.name),
            j(`div`, `is-park`, ad(e.parkId)),
            j(`div`, `is-blurb`, n.blurb),
            j(`div`, `intro-goals`, a),
          );
        } else
          r.append(
            F(`div`, `is-mode ribbon`, t.icon, t.name),
            j(`div`, `is-park`, ad(e.parkId)),
            j(`div`, `is-blurb`, t.blurb),
          );
        (r.append(j(`div`, `is-ready`, `GET READY`)), this.center.append(r));
      } else
        e.phase === K.COUNTDOWN || e.phase === K.PLAYING
          ? (e.phase === K.COUNTDOWN || this.lastCount < 0) &&
            this.clearCenter()
          : e.phase === K.RESULTS &&
            (this.center.replaceChildren(),
            this.danger(!1),
            this.showResults(e, t));
      n &&
        ((this.lastCount = -1),
        (this.news.length = 0),
        (this.cardKey = ``),
        (this.horseCue = ``),
        (this.stripKey = ``),
        this.onRound());
    }
    playMs(e) {
      return this.mode === `career`
        ? (R(e.career.level)?.durationMs ?? q.career.durationMs)
        : q[this.mode].durationMs;
    }
    cue(e, t) {
      if (this.mode === `horse`) {
        let n = e.horse.order.split(`,`)[0] ?? ``;
        return `${n === t ? `You set` : `${e.roster.get(n)?.name ?? `…`} sets`} first · one combo each`;
      }
      return this.mode === `career`
        ? `Every goal you land stays done`
        : (Ad[this.mode] ?? ``);
    }
    clearCenter() {
      for (let e of [...this.center.children])
        e.classList.contains(`out`) ||
          (e.classList.contains(`intro-sticker`)
            ? (e.classList.add(`out`), setTimeout(() => e.remove(), 400))
            : e.remove());
      ((this.cardCount = null), (this.countdown = null));
    }
    addNews(e) {
      (e.kind === `xp` ||
        e.kind === `cleared` ||
        e.kind === `skater` ||
        e.kind === `item` ||
        e.kind === `levelUp` ||
        e.kind === `goal` ||
        e.kind === `mission` ||
        e.kind === `coins`) &&
        (this.news.push(e),
        this.career
          ? this.career.refresh()
          : this.newsEl.isConnected && this.renderNews());
    }
    renderNews() {
      let e = this.newsEl;
      e.replaceChildren();
      let t = (t, n, r, i) => {
          let a = j(i ? `button` : `div`, `rs-new`);
          a.style.setProperty(`--i`, String(e.childElementCount));
          let o = j(`div`, `rs-new-words`);
          (o.append(
            j(`span`, `rs-new-kicker`, t),
            j(`span`, `rs-new-title`, n),
          ),
            a.append(r, o),
            i &&
              a instanceof HTMLButtonElement &&
              ((a.type = `button`),
              a.classList.add(`rs-spend`),
              a.append(j(`span`, `rs-spend-go`, `SPEND`)),
              a.addEventListener(`click`, i)),
            e.append(a));
        },
        n = this.news.reduce((e, t) => e + (t.kind === `xp` ? t.gained : 0), 0),
        r = this.news.reduce(
          (e, t) => (t.kind === `levelUp` ? Math.max(e, t.level) : e),
          0,
        );
      r
        ? t(
            r <= Ji.full
              ? `+${n.toLocaleString()} XP · FASTER & HIGHER`
              : `+${n.toLocaleString()} XP`,
            `You're LV ${r}!`,
            U(`ranks`, `rs-new-ico`),
          )
        : n &&
          t(`EARNED`, `+${n.toLocaleString()} XP`, U(`ranks`, `rs-new-ico`));
      let i = this.news.reduce(
        (e, t) => e + (t.kind === `coins` ? t.gained : 0),
        0,
      );
      i &&
        t(
          this.news.some(
            (e) => e.kind === `coins` && e.find?.startsWith(`deck.`),
          )
            ? `SECRET DECK FOUND`
            : `PICKED UP`,
          `+${i.toLocaleString()} coins`,
          B(`coin`, `rs-new-ico`),
        );
      for (let e of mt(At(this.news)))
        if (e.kind === `pro`)
          t(`NEW SKATER`, qi(e.pro).name, G(qi(e.pro), `rs-art`));
        else if (e.kind === `skin`) {
          let n = jr(e.skin);
          n && t(`SECRET UNLOCKED`, n.name, G(n.look, `rs-art`));
        } else
          t(
            `NEW IN YOUR STYLE`,
            e.pieces.length + e.colors.length === 1
              ? Ln(e.pieces[0] ?? e.colors[0])
              : Od(e),
            B(`star`, `rs-new-ico`),
          );
      for (let e of this.news)
        e.kind === `cleared`
          ? t(
              `${R(e.level)?.name ?? `LEVEL`} CLEARED`,
              e.next ? `${R(e.next)?.name ?? ``} unlocked` : `Career complete!`,
              B(`star`, `rs-new-ico`),
            )
          : e.kind === `mission` &&
            t(
              `MISSION COMPLETE · CLAIM IT`,
              e.text,
              U(`missions`, `rs-new-ico`),
            );
      let a = this.news.filter((e) => e.kind === `goal`).length,
        o = N.profile ? Et(N.profile).earned : 0,
        s = Math.max(0, Math.min(a, Qt * Tn.length - (o - a))),
        c = N.profile ? Et(N.profile).free : 0;
      (s &&
        t(
          c ? `TAP TO SPEND` : `EARNED`,
          `+${s} stat point${s > 1 ? `s` : ``}`,
          B(`star`, `rs-new-ico`),
          c ? () => this.onStats() : void 0,
        ),
        e.classList.toggle(`off`, !e.childElementCount));
    }
    bigCenter(e, t, n = ``) {
      let r = this.countdown;
      (r ||
        (this.clearCenter(),
        (r = this.countdown =
          {
            wrap: j(`div`, `count-wrap`),
            num: j(`div`, `count-num`),
            cue: j(`div`, `count-cue`),
          }),
        r.wrap.append(r.num, r.cue),
        this.center.append(r.wrap)),
        (r.wrap.className = `count-wrap ${t}`));
      let i = j(`div`, `count-num`, e);
      (r.num.replaceWith(i), (r.num = i));
      let a = t === `go`;
      if (
        (r.cue.textContent !== (a ? `` : n) && (r.cue.textContent = a ? `` : n),
        a)
      ) {
        let e = r.wrap;
        setTimeout(() => {
          (e.remove(), this.countdown?.wrap === e && (this.countdown = null));
        }, 1200);
      }
    }
    danger(e) {
      if (e && !this.dangerEl) {
        let e = j(`div`, `tag-danger`),
          t = j(`div`, `td-how`);
        (t.append(`hold `, Xn(`look`), ` to look`),
          e.append(j(`div`, `td-title`, `IT'S BEHIND YOU!`), t),
          this.root.append(e),
          (this.dangerEl = e));
      } else
        !e && this.dangerEl && (this.dangerEl.remove(), (this.dangerEl = null));
    }
    horseHud(e, t, n) {
      let r = e.horse;
      if (!this.horseEls) {
        let e = j(`div`, `horse-banner`),
          t = j(`span`, `hb-what`),
          n = j(`span`, `hb-time`),
          r = j(`div`, `w-sub horse-sub`);
        e.append(t, n);
        let i = j(`div`, `hb-fill`),
          a = j(`div`, `hb-label`),
          o = j(`div`, `horse-bar`);
        o.append(i, a);
        let s = j(`div`, `horse-strip`);
        (this.widget.replaceChildren(e, o, r),
          this.side.replaceChildren(s),
          (this.horseEls = {
            banner: e,
            what: t,
            time: n,
            bar: o,
            fill: i,
            barLabel: a,
            sub: r,
            strip: s,
          }));
      }
      let i = this.horseEls,
        a = r.order ? r.order.split(`,`) : [],
        o = (t) => e.roster.get(t)?.name ?? `…`,
        s = (e.phase === K.PLAYING || e.phase === K.OVERTIME) && !!r.activeId,
        c = r.activeId,
        l = c === t,
        u = c === r.setterId,
        d = r.stage === it.SETUP && n >= r.stageEndsAt,
        f = s ? (d ? it.ACTIVE : r.stage) : -1,
        p = d ? vr / 1e3 : Math.max(0, Math.ceil((r.stageEndsAt - n) / 1e3)),
        m = u ? 500 : r.target,
        h = f === it.ACTIVE ? this.comboOf(c) : 0,
        g = ``,
        _ = ``,
        v = ``;
      if (!s) {
        let e = a[0];
        ((g = e ? (e === t ? `You set first` : `${o(e)} sets first`) : ``),
          (_ = `One combo each — beat the set or take a letter`));
      } else if (f === it.SETUP)
        ((g = l
          ? u
            ? `YOUR TURN — SET A SCORE`
            : `YOUR TURN — BEAT ${Q(r.target)}`
          : u
            ? `${o(c)} is setting`
            : `${o(c)} must beat ${Q(r.target)}`),
          (_ = l ? `get ready…` : this.horseWaiting(e, t, a)));
      else if (f === it.ACTIVE) {
        let n = u ? `SET ${Q(500)}+` : `BEAT ${Q(r.target)}`;
        ((g = h > 0 ? `LAND IT!` : l ? n : `${o(c)}: ${n}`),
          (v = `${p}s`),
          (_ = l
            ? `ONE COMBO — the first one you land is your score`
            : this.horseWaiting(e, t, a)));
      } else _ = this.horseWaiting(e, t, a);
      (i.what.textContent !== g && (i.what.textContent = g),
        i.time.textContent !== v && (i.time.textContent = v),
        i.time.classList.toggle(`hurry`, !!v && p <= 3),
        i.sub.textContent !== _ && (i.sub.textContent = _),
        i.banner.classList.toggle(`me`, s && l),
        i.banner.classList.toggle(`off`, !g));
      let y = f === it.ACTIVE && m > 0;
      if ((i.bar.classList.toggle(`on`, y), y)) {
        ((i.fill.style.width = `${Math.min(100, (h / m) * 100).toFixed(1)}%`),
          i.bar.classList.toggle(`ok`, h >= m));
        let e = `${Q(h)} / ${Q(m)}`;
        i.barLabel.textContent !== e && (i.barLabel.textContent = e);
      }
      let b =
        a
          .map((t) => {
            let n = e.roster.get(t);
            return `${t}:${n?.horse}:${n?.out}:${n?.left}`;
          })
          .join(`|`) + `|${s && c}|${s && r.target > 0 && r.setterId}`;
      b !== this.stripKey &&
        ((this.stripKey = b),
        i.strip.replaceChildren(
          ...a.map((n) => {
            let i = e.roster.get(n),
              a = j(
                `div`,
                `horse-row ${i?.out ? `out` : ``} ${i?.left ? `left` : ``} ${s && n === c ? `active` : ``} ${n === t ? `me` : ``}`,
              ),
              o = j(`span`, `hr-mark`, s && n === c ? `▶` : ``);
            (s &&
              n !== c &&
              r.target > 0 &&
              n === r.setterId &&
              o.append(B(`star`)),
              a.append(o, j(`span`, `hr-name`, i?.name ?? `?`)));
            let l = j(`span`, `hr-letters`);
            for (let e = 0; e < 5; e++)
              l.append(j(`i`, e < (i?.horse ?? 0) ? `on` : ``, _r[e]));
            return (a.append(l), a);
          }),
        ));
      let x = s
        ? `${r.round}|${c}|${f}|${f === it.RESULT ? r.verdict : ``}`
        : ``;
      if (
        (x !== this.cardKey &&
          ((this.cardKey = x),
          s
            ? this.horseCard(e, t, f, p)
            : this.center.querySelector(`.horse-card`) && this.clearCenter()),
        !s)
      )
        return;
      let S = ``;
      if (f === it.SETUP) {
        let e = Math.max(1, Math.min(3, p));
        ((S = `${x}|${e}`),
          S !== this.horseCue &&
            (this.cardCount &&
              ((this.cardCount.textContent = String(e)),
              L(this.cardCount, `zoom`)),
            l ? this.onCount(e) : this.sfx(`tick`)));
      } else if (f === it.ACTIVE) {
        let e = p <= 3 && p >= 1 && h === 0 ? p : 0;
        ((S = `${x}|${e}`),
          S !== this.horseCue &&
            (this.horseCue.startsWith(x)
              ? e && this.sfx(`hurry`)
              : l
                ? this.onGo()
                : this.sfx(`hurry`)));
      } else if (f === it.RESULT && ((S = x), S !== this.horseCue)) {
        let t = e.roster.get(c);
        this.sfx(
          r.verdict === jd
            ? `horseSet`
            : r.verdict === Nd
              ? `horseSafe`
              : r.verdict === Pd
                ? t?.out
                  ? `horseOut`
                  : `horseLetter`
                : `stamp`,
        );
      }
      this.horseCue = S;
    }
    horseWaiting(e, t, n) {
      let r = e.horse,
        i = e.roster.get(t);
      if (!i) return ``;
      if (i.out) return `you're out — cheer them on`;
      if (r.activeId === t) return ``;
      if (r.activeId === r.setterId) return `if it's set, you're up to beat it`;
      if (t === r.setterId) return `your set stands: they need ${Q(r.target)}`;
      let a = n.indexOf(r.setterId),
        o = [];
      for (let t = 1; t < n.length; t++) {
        let r = n[(a + t) % n.length],
          i = e.roster.get(r);
        i && !i.out && !i.left && o.push(r);
      }
      let s = o.indexOf(r.activeId),
        c = o.indexOf(t);
      return c < 0 || c < s
        ? `you've had your go — watching`
        : c === s + 1
          ? `you're up next`
          : `you're up after ${e.roster.get(o[c - 1])?.name ?? `…`}`;
    }
    horseCard(e, t, n, r) {
      let i = e.horse,
        a = i.activeId === t,
        o = i.activeId === i.setterId,
        s = (e.roster.get(i.activeId)?.name ?? `…`).toUpperCase();
      this.clearCenter();
      let c = j(`div`, `horse-card ${a ? `me` : ``}`);
      if (n === it.SETUP)
        (c.classList.add(`setup`),
          (this.cardCount = j(
            `div`,
            `hc-count`,
            String(Math.max(1, Math.min(3, r))),
          )),
          c.append(
            j(`div`, `hc-kicker`, i.last ? `FINAL ROUND` : `ROUND ${i.round}`),
            j(
              `div`,
              `hc-title ribbon`,
              a
                ? o
                  ? `SET A SCORE`
                  : `BEAT ${Q(i.target)}`
                : o
                  ? `${s} SETS`
                  : `${s} MUST BEAT ${Q(i.target)}`,
            ),
            j(
              `div`,
              `hc-sub`,
              o
                ? `One combo · ${Q(500)}+ sets it`
                : `One combo · tie it and you're safe`,
            ),
            this.cardCount,
          ));
      else if (n === it.ACTIVE) {
        if (!a) return;
        (c.classList.add(`go`),
          c.append(j(`div`, `count-num go`, `GO!`)),
          setTimeout(() => c.remove(), 1200));
      } else {
        let t = e.roster.get(i.activeId),
          n = i.lastScore,
          r = n > 0 ? `${Q(n)} vs ${Q(i.target)}` : `no combo landed`;
        c.classList.add(
          `verdict`,
          [``, `set`, `noset`, `safe`, t?.out ? `out` : `letter`][i.verdict] ??
            ``,
        );
        let o = j(`div`, `hc-title ribbon`),
          l = ``,
          u = ``;
        if (i.verdict === jd)
          ((o.textContent = `SET!`),
            (l = Q(n)),
            (u = a
              ? `everyone has to beat it`
              : `beat ${Q(n)} or take a letter`));
        else if (i.verdict === Md)
          ((o.textContent = `NO SET`),
            (l = n > 0 ? `${Q(n)} — needed ${Q(500)}` : `no combo landed`),
            (u = `the next skater sets`));
        else if (i.verdict === Nd) ((o.textContent = `SAFE!`), (l = r));
        else if (i.verdict === Pd && t?.out)
          ((o.textContent = `OUT!`),
            (l = `H-O-R-S-E`),
            (u = a ? `spelled it — you're out` : `${s} is out`));
        else if (i.verdict === Pd) {
          let e = t?.horse ?? 1;
          for (let t = 0; t < e; t++)
            o.append(
              j(`span`, t === e - 1 ? `hc-new` : ``, _r[t]),
              t < e - 1 ? `-` : ``,
            );
          ((l = r), (u = `takes a letter`));
        }
        (c.append(
          j(`div`, `hc-kicker`, a ? `YOU` : s),
          o,
          j(`div`, `hc-fig`, l),
        ),
          u && c.append(j(`div`, `hc-sub`, u)));
      }
      this.center.append(c);
    }
    showResults(e, t) {
      if (this.career) {
        this.career.show(e, t);
        return;
      }
      let n = q[this.mode],
        r = [...e.roster.entries()].sort(([, e], [, t]) => e.rank - t.rank),
        i = e.roster.get(t),
        a = r.filter(([, e]) => e.rank === i?.rank && !e.left).length > 1,
        o =
          r.length < 2
            ? `NICE RUN!`
            : i?.rank === 1
              ? a
                ? `IT'S A TIE!`
                : `YOU WIN!`
              : `#${i?.rank ?? `?`}${a ? ` (TIE)` : ``}`;
      this.results.replaceChildren(
        F(`div`, `rs-kicker`, n.icon, `${n.name} · ${ad(e.parkId)}`),
        j(`h2`, `rs-title ribbon`, o),
      );
      let s = j(`div`, `rs-podium`),
        c = new Map();
      (r.forEach(([e, n], r) => {
        let i = j(
          `div`,
          `rs-slot ${e === t ? `me` : ``} ${n.left ? `left` : ``} ${n.rank === 1 ? `first` : ``}`,
        );
        i.style.setProperty(`--i`, String(r));
        let a = Gn(n.skater, n.look, `rs-art`),
          o = Vd(this.mode, n, `rs-fig`, `div`),
          l = n.bestTricks
            ? n.bestTricks
                .split(`,`)
                .slice(0, 3)
                .map((e) => Pr(Number(e)))
                .join(` + `)
            : ``;
        (i.append(
          a,
          j(`span`, `rs-medal`, n.rank === 1 ? `1st` : `#${n.rank}`),
          j(`span`, `rs-ready`, `READY`),
          j(`div`, `rs-name`, n.name),
          o,
        ),
          l &&
            i.append(j(`div`, `rs-best`, `${n.best.toLocaleString()} · ${l}`)),
          kd(o.firstElementChild, 450 + r * 110),
          s.append(i),
          c.set(e, i));
      }),
        this.renderNews(),
        this.results.append(this.newsEl));
      let l = this.holdOpts(),
        u = si(
          `REMATCH`,
          `big secondary`,
          () => {
            (this.send(`rematch`, { on: !0 }),
              u.classList.add(`voted`),
              pi(u, `READY ✓`));
          },
          l,
        ),
        d = si(`SKATE HUB`, `big primary`, this.leave, l);
      d.dataset.autofocus = ``;
      let f = r.filter(([e, t]) => !t.left && !e.startsWith(`bot-`)).length,
        p = n.min > 1 && f < 2 && !r.some(([e]) => e.startsWith(`bot-`));
      p && ((u.disabled = !0), gi(u, `needs ${n.min} players`));
      let m = j(`div`, `rs-btns`);
      (m.append(u, d), this.results.append(s, m));
      let h = () => {
        if (!m.isConnected) return;
        let r = Math.max(0, Math.ceil((e.phaseEndsAt - this.now()) / 1e3)),
          i = [...e.roster.values()].filter((e) => e.connected && !e.left),
          a = i.filter((e) => e.rematch).length,
          o = !!e.roster.get(t)?.rematch && a >= n.min;
        (gi(d, o ? `` : `in ${r}s`), p || gi(u, `${a}/${i.length} ready`));
        for (let [t, n] of c) {
          let r = e.roster.get(t);
          n.classList.toggle(`ready`, !!r?.rematch && !r.left);
        }
        (ei(this.results, Ld()), setTimeout(h, 250));
      };
      (h(), this.results.classList.add(`on`));
    }
    holdOpts(e = !1) {
      return { armMs: Fd, again: e, sfx: (e, t) => this.sfx(e, t) };
    }
    dispose() {
      this.career?.stop();
      for (let e of [
        this.root,
        this.clock,
        this.clockSub,
        this.board,
        this.widget,
        this.side,
        this.run?.el,
      ])
        e?.remove();
    }
  };
