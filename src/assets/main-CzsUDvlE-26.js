// assets/main-CzsUDvlE 26 — append
// Lines 7738-8221 of readable/assets/main-CzsUDvlE.pretty.js (statement-aligned).
var Gu = (e) => e[0].toUpperCase() + e.slice(1),
  Ku = class {
    prompt;
    card;
    chip;
    party;
    board;
    boardKey = ``;
    boardAt = 0;
    near = ``;
    hintKey = ``;
    chipKey = ``;
    promptKey = ``;
    count = -1;
    send;
    invite;
    hooks;
    partyKey = ``;
    state = null;
    gateMode = ``;
    doorAt = ``;
    doors;
    queued = ``;
    leftMode = ``;
    asked = ``;
    voted = null;
    grounded = !1;
    hold = null;
    unPress;
    constructor(e, t, n, r, i = {}) {
      ((this.send = t),
        (this.hooks = r),
        (this.doors = i),
        (this.card = j(`div`, `portal-card`)),
        (this.chip = j(`div`, `queue-chip interactive`)),
        (this.party = j(`div`, `party-code interactive`)),
        (this.prompt = j(`div`, `gate-prompt`)),
        (this.invite = n),
        (this.board = j(`div`, `plaza-board`)),
        e.match.append(this.card, this.board),
        e.lane.append(this.chip),
        e.me.append(this.party),
        (this.unPress = z.onPress(this.onPress)));
    }
    onPress = (e) => {
      e === `grind` && this.doorAt
        ? (L(this.prompt, `stamp`),
          this.hooks.press(),
          this.doors[this.doorAt].enter())
        : e === `grind` && this.gateMode
          ? this.gateMode !== this.queued && this.gateMode !== this.asked
            ? ((this.leftMode = ``),
              (this.asked = this.gateMode),
              this.send(`queue`, { mode: this.gateMode }),
              L(this.prompt, `stamp`),
              this.hooks.press())
            : this.voted ||
              (this.hold = {
                kind: `start`,
                from: performance.now(),
                ticks: 0,
                mode: this.gateMode,
              })
          : e === `grab` &&
            this.queued &&
            this.grounded &&
            (this.hold = { kind: `leave`, from: performance.now(), ticks: 0 });
    };
    join(e) {
      e !== this.queued &&
        ((this.leftMode = ``), this.send(`queue`, { mode: e }));
    }
    leave() {
      let e = this.queued;
      ((this.hold = null),
        (this.asked = ``),
        (this.voted = null),
        e &&
          (this.send(`unqueue`),
          (this.leftMode = e),
          (this.queued = ``),
          this.hooks.left(e)));
    }
    start() {
      let e = this.queued || this.asked;
      ((this.hold = null),
        e &&
          !this.voted &&
          (this.send(`startNow`),
          (this.voted = { mode: e, at: performance.now() }),
          this.hooks.ready(e, this.solo(e))));
    }
    solo(e) {
      return (this.state?.portals.get(e)?.count ?? 0) <= 1;
    }
    actions() {
      let e = this.queued;
      if (!e) return null;
      let t = [],
        n = this.solo(e);
      return (
        this.voted ||
          t.push({
            id: `start`,
            label: n ? Gu(Uu(e, n)) : `I'm ready: start now`,
            short: n ? `Start` : `Ready`,
            icon: `flame`,
            run: () => this.start(),
          }),
        t.push({
          id: `unqueue`,
          label: `Leave the queue`,
          short: `Leave`,
          icon: `close`,
          run: () => this.leave(),
        }),
        t.push({
          id: `invite`,
          label: `Invite friends`,
          short: `Invite`,
          icon: `party`,
          run: this.invite,
        }),
        t
      );
    }
    setParty(e, t) {
      let n = e && `${e}:${t}`;
      if (
        n === this.partyKey ||
        ((this.partyKey = n),
        this.party.replaceChildren(),
        this.party.classList.toggle(`on`, !!e),
        !e)
      )
        return;
      let r = j(`button`, `ico-btn`);
      ((r.type = `button`),
        r.setAttribute(`aria-label`, `Invite`),
        r.append(U(`invite`)),
        r.addEventListener(`click`, this.invite),
        this.party.append(
          j(`span`, ``, t > 1 ? `PARTY · ${t}` : `PARTY`),
          j(`b`, ``, e),
          r,
        ));
    }
    updateBoard(e, t) {
      let n = performance.now();
      if (n < this.boardAt) return;
      this.boardAt = n + 250;
      let r = [...e.skaters.entries()]
          .filter(([, e]) => e.best > 0)
          .sort(([, e], [, t]) => t.best - e.best)
          .slice(0, 5),
        i = r.map(([e, t]) => e + t.best).join(`|`);
      if (i === this.boardKey) return;
      if (((this.boardKey = i), this.board.replaceChildren(), !r.length)) {
        this.board.classList.remove(`on`);
        return;
      }
      this.board.classList.add(`on`);
      let a = j(`div`, `pb-title`);
      (a.append(U(`ranks`), j(`span`, ``, `Best combos`)),
        this.board.append(a),
        r.forEach(([e, n], r) => {
          let i = j(`div`, `pb-row ${e === t ? `me` : ``}`);
          (i.append(
            j(`span`, `pb-rank`, String(r + 1)),
            j(`span`, `pb-name`, n.name),
            j(`span`, `pb-score`, n.best.toLocaleString()),
          ),
            this.board.append(i));
        }));
    }
    update(e, t, n, r, i) {
      ((this.state = e), this.updateBoard(e, t));
      let a = nr(),
        o = null,
        s = 81;
      for (let e of r) {
        let t = (e.x - n.x) ** 2 + (e.z - n.z) ** 2;
        t < s && ((s = t), (o = e));
      }
      let c = e.skaters.get(t),
        l = c?.queue && gr(c.queue) ? c.queue : ``;
      this.leftMode && (l === this.leftMode ? (l = ``) : (this.leftMode = ``));
      let u = this.queued;
      ((this.queued = l),
        l && l !== u && this.hooks.joined(l, u),
        (this.grounded =
          n.mode === Ge.GROUND || n.mode === Ge.MANUAL || n.mode === Ge.WALK));
      let d = o && this.doors[o.mode] ? o.mode : ``,
        f = o && !d && wr(o.mode) ? o.mode : ``,
        p = o ? o.r + Vu : 0,
        m = !!o && this.grounded && s < p * p && Math.abs(n.y - (o.y ?? 0)) < 2,
        h = f && m ? f : ``,
        g = d && m && !this.doors[d].shut() ? d : ``;
      (g !== this.doorAt && ((this.doorAt = g), g && this.hooks.gate(g)),
        h !== this.gateMode &&
          ((this.gateMode = h), h && h !== l && this.hooks.gate(h)),
        this.asked &&
          (this.asked === l || this.asked !== h) &&
          (this.asked = ``));
      let _ = this.voted;
      _ &&
        (_.mode !== l ||
          (!e.portals.get(_.mode)?.startVotes &&
            performance.now() - _.at > Hu)) &&
        (this.voted = null);
      let v = h && (h === l || h === this.asked) ? h : ``,
        y = 0,
        b = this.hold;
      if (b) {
        let e = !!b.mode && (b.mode === l || b.mode === this.asked);
        if (
          !(b.kind === `leave`
            ? l && this.grounded && z.isHeld(`grab`)
            : e && this.grounded && !this.voted && z.isHeld(`grind`))
        )
          this.hold = null;
        else {
          let e = performance.now() - b.from;
          y = Math.min(1, e / (b.kind === `leave` ? 700 : 800));
          let t = Math.floor(y * 3);
          (t > b.ticks && t < 3 && ((b.ticks = t), this.hooks.tick(t)),
            y >= 1
              ? (b.kind === `leave` ? (this.leave(), (l = ``)) : this.start(),
                (y = 0))
              : e < Bu && (y = 0));
        }
      }
      let x = y > 0 && this.hold ? this.hold.kind : ``,
        S = h && !v ? h : ``,
        C = v || (this.hold?.kind === `start` ? (this.hold.mode ?? ``) : ``),
        ee = C && !this.voted ? C : ``;
      return (
        g
          ? (document.body.dataset.gate = `enter`)
          : S
            ? (document.body.dataset.gate = `join`)
            : ee
              ? (document.body.dataset.gate = `start`)
              : delete document.body.dataset.gate,
        this.updateCard(e, d || f, h, l, i, a),
        this.updatePrompt(S, ee, l, x, y, a),
        this.updateChip(e, l, !!C, x, y, i, a),
        g || h
      );
    }
    updateCard(e, t, n, r, i, a) {
      let o = t ? this.doors[t] : void 0;
      if (t !== this.near) {
        ((this.near = t), (this.hintKey = ``), this.card.replaceChildren());
        let e = o ?? (gr(t) ? q[t] : null);
        (e &&
          (this.card.style.setProperty(`--mc`, e.color),
          this.card.append(
            F(`div`, `pc-title ribbon`, e.icon, e.name),
            j(`div`, `pc-blurb`, e.blurb),
          ),
          !o && gr(t) && this.card.append(j(`div`, `pc-meta`, Wu(t))),
          this.card.append(
            j(`div`, `pc-count`),
            j(`div`, `pc-hint`),
            j(`div`, `pc-sub`),
          )),
          this.card.classList.toggle(`on`, !!e));
      }
      if (o) {
        let e = o.shut(),
          t = `door|${e}|${Zn()}`;
        if (t === this.hintKey) return;
        this.hintKey = t;
        let n = this.card.querySelector(`.pc-hint`);
        (n.classList.toggle(`go`, !e),
          e
            ? n.replaceChildren(e)
            : n.replaceChildren(
                `Roll in · tap `,
                Xn(`grind`, a),
                ` ${o.does}`,
              ));
        return;
      }
      if (!gr(t)) return;
      let s = t,
        c = e.portals.get(s),
        l = c?.count ?? 0,
        u = c && l >= 2 && c.status === Ct.FILLING;
      this.card.querySelector(`.pc-count`).textContent = l
        ? u
          ? `${l} queued · starts in ${Nt(c.launchAt - i)}`
          : `${l} queued`
        : `Nobody queued yet`;
      let d = l <= 1,
        f =
          r === s
            ? this.voted
              ? `ready`
              : n
                ? `start`
                : `in`
            : n
              ? `gate`
              : `out`,
        p = `${f}|${d}|${Zn()}`;
      if (p === this.hintKey) return;
      this.hintKey = p;
      let m = this.card.querySelector(`.pc-hint`),
        h = this.card.querySelector(`.pc-sub`);
      m.classList.toggle(`go`, f === `gate` || f === `start`);
      let g = Uu(s, d);
      (f === `ready`
        ? m.replaceChildren(d ? `Starting…` : `Ready! Waiting for the others`)
        : f === `start`
          ? m.replaceChildren(`Hold `, Xn(`grind`, a), ` to ${g}!`)
          : f === `in`
            ? m.replaceChildren(
                `You're in! In the gate, hold `,
                Xn(`grind`, a),
                ` to ${g}`,
              )
            : f === `gate`
              ? m.replaceChildren(`Tap `, Xn(`grind`, a), ` to join!`)
              : m.replaceChildren(
                  `Roll into the gate · `,
                  Xn(`grind`, a),
                  ` to join`,
                ),
        r === s
          ? h.replaceChildren(`Hold `, Xn(`grab`, a), ` to leave`)
          : h.replaceChildren());
    }
    updatePrompt(e, t, n, r, i, a) {
      let o = this.doorAt ? this.doors[this.doorAt] : null,
        s =
          r === `leave` && n
            ? `leave`
            : o
              ? `enter`
              : e
                ? `join`
                : t
                  ? `start`
                  : ``,
        c = s === `leave` ? n : s === `join` ? e : s === `start` ? t : ``,
        l = !c || this.solo(c),
        u = s && `${s}|${s === `enter` ? this.doorAt : c}|${!!n}|${l}|${Zn()}`;
      if (u !== this.promptKey) {
        if (
          ((this.promptKey = u),
          (this.prompt.className = `gate-prompt ${s}`),
          this.prompt.replaceChildren(),
          s === `enter` && o)
        ) {
          this.prompt.style.setProperty(`--mc`, o.color);
          let e = j(`span`, `gp-key`);
          e.append(Xn(`grind`, a));
          let t = j(`span`, `gp-words`);
          (t.append(
            j(`span`, `gp-verb`, o.verb),
            F(`b`, `gp-mode`, o.icon, o.name),
          ),
            this.prompt.append(e, t));
        } else if (s && c) {
          let e = q[c];
          this.prompt.style.setProperty(`--mc`, e.color);
          let t = j(`span`, `gp-key`);
          t.append(Xn(s === `leave` ? `grab` : `grind`, a));
          let r = j(`span`, `gp-words`);
          (s === `join`
            ? r.append(
                j(`span`, `gp-verb`, n ? `SWITCH TO` : `JOIN`),
                F(`b`, `gp-mode`, e.icon, e.name),
              )
            : s === `start`
              ? r.append(
                  j(`span`, `gp-verb`, `HOLD TO`),
                  F(`b`, `gp-mode`, e.icon, Uu(c, l).toUpperCase()),
                )
              : r.append(
                  j(`span`, `gp-verb`, `LEAVING`),
                  F(`b`, `gp-mode`, e.icon, e.name),
                ),
            this.prompt.append(t, r));
        }
      }
      (this.prompt.classList.toggle(`holding`, s === `start` && r === `start`),
        this.prompt.style.setProperty(`--hold`, i.toFixed(3)));
    }
    updateChip(e, t, n, r, i, a, o) {
      let s = t ? e.portals.get(t) : void 0,
        c = t ? q[t] : null,
        l = !s || s.count <= 1,
        u = t ? `${t}|${l}|${!!this.voted}|${n}|${Zn()}` : ``;
      if (u !== this.chipKey) {
        let e = !!t && !this.chipKey.startsWith(`${t}|`);
        if (
          ((this.chipKey = u),
          this.chip.replaceChildren(),
          (this.count = -1),
          t && c && s)
        ) {
          this.chip.style.setProperty(`--mc`, c.color);
          let r = j(`div`, `qc-label`);
          (r.append(
            F(`b`, `ribbon`, c.icon, c.name),
            j(`span`, `qc-count`, ``),
          ),
            this.chip.append(r, j(`span`, `qc-time`, ``)));
          let i = j(`div`, `qc-btns`);
          if (this.voted)
            i.append(j(`span`, `qc-ready`, l ? `STARTING…` : `READY`));
          else {
            let e = j(`button`, `qc-hold qc-start`);
            ((e.type = `button`),
              (e.title = Gu(Uu(t, l))),
              e.append(
                j(`span`, `qc-ring`),
                `Hold `,
                Xn(`grind`, o),
                n ? ` to ${Uu(t, l)}` : ` in the gate to ${Uu(t, l)}`,
              ),
              e.addEventListener(`click`, (e) => {
                (e.stopPropagation(), this.start());
              }),
              i.append(e));
          }
          i.append(V(`Invite`, `tiny`, this.invite));
          let a = j(`button`, `qc-hold qc-leave`);
          ((a.type = `button`),
            (a.title = `Leave the queue`),
            a.append(j(`span`, `qc-ring`), `Hold `, Xn(`grab`, o), ` to leave`),
            a.addEventListener(`click`, (e) => {
              (e.stopPropagation(), this.leave());
            }),
            i.append(a),
            this.chip.append(i),
            e && L(this.chip, `slam`));
        }
        this.chip.classList.toggle(`on`, !!t);
      }
      if (!t || !s || !c) return;
      if (s.count !== this.count) {
        let e = this.chip.querySelector(`.qc-count`);
        (e &&
          ((e.textContent = `${s.count}/${c.max}`),
          this.count >= 0 && L(e, `bump`)),
          (this.count = s.count));
      }
      let d = this.chip.querySelector(`.qc-time`);
      if (d) {
        let e = s.launchAt - a,
          t = !l && s.status === Ct.FILLING;
        ((d.textContent = l
          ? this.voted
            ? `Starting…`
            : `Waiting for skaters…`
          : t
            ? `starts in ${Nt(e)}${s.startVotes ? ` · ${s.startVotes}/${s.count} ready` : ``}`
            : ``),
          d.classList.toggle(`hot`, t && e < 3500));
      }
      for (let [e, t] of [
        [`.qc-start`, `start`],
        [`.qc-leave`, `leave`],
      ]) {
        let n = this.chip.querySelector(e);
        n &&
          (n.style.setProperty(`--hold`, r === t ? i.toFixed(3) : `0`),
          n.classList.toggle(`holding`, r === t));
      }
    }
    dispose() {
      (this.unPress(),
        delete document.body.dataset.gate,
        this.card.remove(),
        this.chip.remove(),
        this.board.remove(),
        this.party.remove(),
        this.prompt.remove());
    }
  };
