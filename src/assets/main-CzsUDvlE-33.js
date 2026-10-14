// assets/main-CzsUDvlE 33 — append
// Lines 11079-11405 of readable/assets/main-CzsUDvlE.pretty.js (statement-aligned).
function Sf(e, t) {
  if (e === `push` || e === `steer`) {
    if (t === `kb`) {
      if (J.layout === `auto`) {
        let t = j(`span`, `cap-pair`);
        return (
          t.append(
            xf(e, (e) => rr(Jn.wasd[e][0])),
            j(`small`, `cap-or`, `or`),
            xf(e, (e) => rr(Jn.arrows[e][0])),
          ),
          t
        );
      }
      return xf(e, (e) => or(e, t));
    }
    let n = e === `push` ? `↑` : `↔`;
    if (t === `touch`) return j(`span`, `cap-stick solo`, n);
    let r = j(`span`, `cap-stick`, `L`);
    return (r.append(j(`small`, ``, n)), r);
  }
  if (t === `touch`) return j(`span`, `cap-tch m-${e}`, or(e, t));
  if (t === `pad`) {
    let n = j(`span`, `cap-face`, or(e, t)),
      r = ur(e, t);
    return (r && (n.style.color = r), n);
  }
  return j(`kbd`, ``, or(e, t));
}
var Cf = class {
    el;
    dots;
    title;
    body;
    shown = ``;
    started = ``;
    busy = !1;
    steps;
    key;
    first;
    onStep;
    onDone;
    constructor(e, t, n, r) {
      ((this.steps = yf.filter((e) => e.part === t)),
        (this.key = bf[t]),
        (this.first = yf.findIndex((e) => e.part === t)),
        (this.onStep = n),
        (this.onDone = r),
        (this.el = j(`div`, `coach`)),
        (this.dots = j(`div`, `coach-dots`)),
        (this.title = j(`b`, `coach-title`)),
        (this.body = j(`div`, `coach-body`)));
      let i = j(`div`, `coach-head`);
      i.append(this.dots, this.title);
      let a = j(`button`, `btn tiny ghost coach-skip`, `SKIP TUTORIAL`);
      ((a.type = `button`),
        a.addEventListener(`click`, () => this.skip()),
        this.el.append(i, this.body, a),
        e.append(this.el),
        this.render());
    }
    get at() {
      return J[this.key];
    }
    get active() {
      return this.at >= 0 && this.at < this.steps.length;
    }
    skip() {
      this.active &&
        (qn(`tutorial`, this.steps[this.at].id, `skip`),
        (J.tutorial = J.tips = -1),
        this.finish(!0));
    }
    restart() {
      ((J.tutorial = J.tips = 0), Ir(), (this.busy = !1), this.render());
    }
    events(e, t) {
      this.active &&
        !this.busy &&
        this.steps[this.at].done?.(e, t) &&
        this.advance();
    }
    hold(e) {
      this.el.classList.toggle(`held`, e);
    }
    frame() {
      this.active && this.view() !== this.shown && this.render(!1);
    }
    view() {
      return `${this.at}|${Zn()}|${J.layout}`;
    }
    advance() {
      ((this.busy = !0), this.el.classList.add(`nailed`));
      let e = this.steps[this.at].id;
      (this.onStep(e),
        qn(`tutorial`, e, `complete`),
        setTimeout(() => {
          ((this.busy = !1),
            this.el.classList.remove(`nailed`),
            J[this.key]++,
            Ir(),
            this.at >= this.steps.length ? this.finish(!1) : this.render());
        }, 650));
    }
    finish(e) {
      ((J[this.key] = -1), Ir(), this.render(), this.onDone(e));
    }
    render(e = !0) {
      let t = this.active;
      if ((this.el.classList.toggle(`off`, !t), !t)) {
        (delete document.body.dataset.coach, (this.shown = ``));
        return;
      }
      let n = this.steps[this.at],
        r = this.first + this.at,
        i = nr();
      ((this.shown = this.view()),
        n.id !== this.started && qn(`tutorial`, n.id, `start`),
        (this.started = n.id),
        this.dots.replaceChildren(
          ...yf.map((e, t) => j(`i`, t < r ? `ok` : t === r ? `now` : ``)),
        ),
        (this.title.textContent = n.title),
        this.body.replaceChildren());
      let a = n.line?.(i);
      if (a) {
        let e = j(`span`, `coach-line`);
        (e.append(...a.map((e) => (typeof e == `string` ? e : Sf(e.key, i)))),
          this.body.append(e));
      }
      if (n.moves) {
        let e = j(`span`, `coach-moves`);
        for (let t of n.moves(i)) {
          let n = j(`span`, `coach-move m-${t.key}`);
          (n.append(Sf(t.key, i)),
            t.verb && n.append(j(`small`, ``, t.verb)),
            n.append(j(`b`, ``, t.name)),
            e.append(n));
        }
        this.body.append(e);
      }
      if (n.chain) {
        let e = j(`span`, `coach-moves coach-chain`);
        (n.chain.forEach((t, n) => {
          (n && e.append(j(`i`, ``, `›`)), e.append(Sf(t, i)));
        }),
          e.append(j(`i`, ``, `›`), j(`b`, ``, `LAND IT!`)),
          this.body.append(e));
      }
      ((document.body.dataset.coach = n.id),
        e &&
          (this.el.classList.remove(`pop`),
          this.el.offsetWidth,
          this.el.classList.add(`pop`)));
    }
    dispose() {
      (delete document.body.dataset.coach, this.el.remove());
    }
  },
  wf = class {
    el;
    list;
    chip;
    corner = Jo();
    off;
    panel = null;
    constructor(e, t = !0) {
      this.el = j(`div`, `goals interactive ${t ? `` : `off`}`);
      let n = j(
        `button`,
        this.corner ? `ico-btn goals-btn` : `btn tiny goals-chip`,
      );
      ((n.type = `button`),
        (this.chip = n),
        (this.list = j(`div`, `goals-list`)),
        this.chip.addEventListener(`click`, () =>
          this.toggle(!this.el.classList.contains(`open`)),
        ),
        this.el.append(this.chip, this.list),
        e.append(this.el),
        (this.off = M((e, t) => {
          (this.render(),
            t.some((e) => e.kind === `plazaGoal`) && L(this.chip, `ping`));
        })),
        this.render());
    }
    toggle(e) {
      (this.el.classList.toggle(`open`, e),
        this.panel?.(),
        (this.panel =
          e && this.corner ? Xo([this.el], () => this.toggle(!1)) : null),
        this.render());
    }
    render() {
      let e = new Set(N.profile?.plaza ?? []),
        t = `${qt.filter((t) => e.has(t.id)).length}/${qt.length}`;
      (this.corner
        ? (this.chip.replaceChildren(
            U(`career`),
            j(`span`, `ico-label`, `Goals`),
            j(`b`, `ico-count`, t),
          ),
          this.chip.setAttribute(`aria-label`, `Goals ${t}`))
        : this.chip.replaceChildren(U(`career`), j(`span`, ``, `Goals ${t}`)),
        this.list.replaceChildren());
      for (let t of qt) {
        let n = j(`div`, `goal ${e.has(t.id) ? `done` : ``}`);
        (n.append(
          j(`span`, `goal-box`, e.has(t.id) ? `✓` : ``),
          j(`span`, ``, t.text),
        ),
          this.list.append(n));
      }
      N.account ||
        this.list.append(
          j(`div`, `goal-note`, `Offline: goals won't be saved`),
        );
    }
    reveal() {
      this.el.classList.contains(`off`) &&
        (this.el.classList.remove(`off`), L(this.chip, `ping`));
    }
    hide() {
      (this.toggle(!1), this.el.classList.add(`off`));
    }
    dispose() {
      (this.panel?.(), this.off(), this.el.remove());
    }
  },
  Tf = class {
    el;
    btn;
    corner = Jo();
    off;
    last = ``;
    constructor(e, t, n = !0) {
      ((this.el = j(`div`, `ms-dock interactive ${n ? `` : `off`}`)),
        (this.btn = j(
          `button`,
          this.corner ? `ico-btn ms-btn` : `btn tiny goals-chip ms-chip`,
        )),
        (this.btn.type = `button`),
        this.btn.addEventListener(`click`, () => {
          let e = N.profile;
          for (let t of e ? da : []) {
            let n = e.missions[t].slots.findIndex((e) => ea(e) && !e.claimed);
            if (n >= 0) {
              wl({ cadence: t, i: n });
              break;
            }
          }
          t();
        }),
        this.el.append(this.btn),
        e.append(this.el),
        (this.off = M(() => this.render())),
        this.render());
    }
    render() {
      let e = N.profile;
      if (((this.el.hidden = !e || !e.missions.daily.slots.length), !e)) return;
      let t = e.missions.daily.slots,
        n = $i(e.missions),
        r = t
          .filter((e) => !ea(e))
          .sort((e, t) => t.n / t.goal - e.n / e.goal)[0],
        i = r && aa(r.id),
        a = n ? `CLAIM!` : i ? fa(i, r) : `All done today`;
      this.btn.classList.toggle(`ready`, n > 0);
      let o = `${t.filter(ea).length}/${t.length}`;
      this.corner
        ? (this.btn.replaceChildren(
            U(`missions`),
            j(`span`, `ico-label`, `Missions`),
            j(`b`, `ico-count`, o),
          ),
          this.btn.setAttribute(
            `aria-label`,
            `Missions ${o}${n ? `, claim` : ``}`,
          ))
        : this.btn.replaceChildren(
            U(`missions`),
            j(`span`, ``, `Missions ${o}`),
            j(`small`, `ms-chip-sub`, a),
          );
      let s = t.map((e) => e.n).join() + n;
      (this.last && s !== this.last && L(this.btn, `pop`), (this.last = s));
    }
    reveal() {
      this.el.classList.remove(`off`);
    }
    hide() {
      this.el.classList.add(`off`);
    }
    dispose() {
      (this.off(), this.el.remove());
    }
  },
  Ef = new T(),
  Df = `.dock, .zone-r, .lane > *, .corner-btns, .coach`,
  Of = `<svg viewBox="0 0 24 18" aria-hidden="true"><path d="M12 2 L22 16 H2 Z"/></svg>`,
  kf = 3.2,
  Af = 1.9,
  jf = 0.4,
  Mf = 0.8,
  Nf = 0.5,
  Pf = 0.4;
function Ff() {
  let e = (e) => [e.left, e.top, e.right, e.bottom],
    t = [...document.querySelectorAll(Df)]
      .map((e) => e.getBoundingClientRect())
      .filter((e) => e.width > 0 && e.height > 0)
      .map(e),
    n = [...document.querySelectorAll(`.touch-layer .tbtn`)]
      .map((e) => e.getBoundingClientRect())
      .filter((e) => e.width > 0);
  return (
    n.length &&
      t.push([
        Math.min(...n.map((e) => e.left)),
        Math.min(...n.map((e) => e.top)),
        Math.max(...n.map((e) => e.right)),
        Math.max(...n.map((e) => e.bottom)),
      ]),
    t
  );
}
