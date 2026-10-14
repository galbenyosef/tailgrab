// assets/main-CzsUDvlE 40 — append
// Lines 13120-13452 of readable/assets/main-CzsUDvlE.pretty.js (statement-aligned).
var xm = 6,
  Sm = new T(),
  Cm = (e, t) => (t >= 1 ? String(e) : e.toFixed(t >= 0.1 ? 1 : 2)),
  BuilderHud = class {
    root;
    palette;
    inspector;
    hooks;
    cards = new Map();
    tabs = new Map();
    grid;
    readoutEl;
    rows = new Map();
    hintEl;
    hintKey = ``;
    jointsEl = j(`div`, `bh-joints`);
    jointTags = [];
    undoBtn;
    levelBtn;
    budgetEl = j(`div`, `bh-budget`);
    budgetFill = j(`i`, ``);
    gear;
    cat = `ramps`;
    armedId = null;
    keys = { rotL: `Q`, rotR: `E`, dup: `F`, del: `Del` };
    constructor(e, t, n) {
      ((this.hooks = t), (this.root = j(`div`, `builder-hud`)));
      let r = j(`div`, `bh-top interactive`);
      (r.append(F(`div`, `bh-title`, `hammer`, n)),
        (this.undoBtn = V(`↶`, `icon-btn`, () => t.undo())),
        (this.undoBtn.title = `Undo (Ctrl+Z)`),
        (this.undoBtn.disabled = !0));
      let i = V(``, `icon-btn`, () => t.spawn());
      (i.append(B(`flag`)),
        (i.title = `Move the spawn`),
        (this.gear = V(``, `icon-btn`, () => t.settings())),
        this.gear.append(U(`gear`)),
        (this.gear.title = `Park settings`));
      let a = V(`SKATE ▶`, `primary bh-done`, () => t.done());
      ((a.title = `Back to skating (B)`),
        (this.levelBtn = V(``, `tiny bh-level`, () => t.level())),
        (this.levelBtn.title = `Build under it (Tab)`),
        this.budgetEl.append(this.budgetFill),
        r.append(this.budgetEl, this.levelBtn, this.undoBtn, i, this.gear, a),
        (this.palette = j(`div`, `bh-palette interactive`)));
      let o = j(`div`, `bh-tabs`);
      o.dataset.padTabs = ``;
      for (let e of Ri) {
        let t = V(``, `tiny tab`, () => this.showCat(e.id));
        (t.append(B(za(e.piece), `bt-ico`), j(`span`, `bt-label`, e.label)),
          (t.title = e.label),
          this.tabs.set(e.id, t),
          o.append(t));
      }
      ((this.grid = j(`div`, `bh-grid`)),
        this.palette.append(o, this.grid),
        (this.inspector = j(`div`, `bh-inspector interactive`)),
        (this.readoutEl = j(`div`, `bh-readout`)),
        (this.hintEl = j(`div`, `bh-hint`)),
        this.root.append(
          this.jointsEl,
          r,
          this.palette,
          this.inspector,
          this.readoutEl,
          this.hintEl,
        ),
        e.append(this.root),
        this.showCat(`ramps`),
        this.inspect(null));
    }
    showCat(e) {
      this.cat = e;
      for (let [t, n] of this.tabs) n.classList.toggle(`on`, t === e);
      (this.grid.replaceChildren(), this.cards.clear());
      for (let t of ji) {
        if (t.cat !== e) continue;
        let n = V(``, `bh-card`, () => this.hooks.arm(t));
        (n.style.setProperty(`--sk`, Te[t.skin]),
          (n.dataset.pre = t.id),
          n.append(B(za(t.id), `bh-ico`), j(`span`, `bh-label`, t.label)),
          n.classList.toggle(`on`, t.id === this.armedId),
          this.cards.set(t.id, n),
          this.grid.append(n));
      }
      this.grid.scrollTop = 0;
    }
    stepCat(e) {
      let t = Ri.findIndex((e) => e.id === this.cat),
        n = Ri[(t + e + Ri.length) % Ri.length];
      this.showCat(n.id);
    }
    paletteFocus() {
      return (
        (this.armedId && this.cards.get(this.armedId)) ||
        this.grid.firstElementChild
      );
    }
    inspectorFocus() {
      return (
        this.inspector.querySelector(`input[type=range]`) ??
        this.inspector.querySelector(`button`)
      );
    }
    get inspecting() {
      return this.inspector.classList.contains(`on`);
    }
    setArmed(e) {
      this.armedId = e;
      for (let [t, n] of this.cards) n.classList.toggle(`on`, t === e);
    }
    setOwner(e) {
      this.gear.hidden = !e;
    }
    setUndo(e) {
      this.undoBtn.disabled = e === 0;
    }
    setBudget(e, t, n) {
      let r = Math.min(100, Math.round(e.used * 100));
      ((this.budgetFill.style.width = `${r}%`),
        (this.budgetEl.dataset.level =
          r >= 95 ? `full` : r >= 80 ? `high` : ``),
        (this.budgetEl.title = `Park budget ${r}% · ${t} of ${n} pieces · detail ${Math.round(e.tris * 100)}%`));
    }
    setLevel(e, t) {
      (this.levelBtn.textContent !== e && (this.levelBtn.textContent = e),
        this.levelBtn.classList.toggle(`on`, t));
    }
    setPanel(e) {
      ((this.root.dataset.panel = e ?? ``),
        this.hintEl.classList.toggle(`off`, !!e));
    }
    hint(e) {
      let t = JSON.stringify(e);
      t !== this.hintKey &&
        ((this.hintKey = t),
        this.hintEl.replaceChildren(
          ...e.map((e) => {
            let t = j(`span`, `pad-hint`);
            for (let n of e.keys) t.append(j(`span`, `pad-key`, n));
            return (t.append(j(`span`, ``, e.label)), t);
          }),
        ));
    }
    inspect(e) {
      if (
        (this.inspector.replaceChildren(),
        this.rows.clear(),
        this.inspector.classList.toggle(`on`, !!e),
        !e)
      )
        return;
      let t = j(`div`, `bi-head`);
      t.append(B(za(e.preset.id), `bi-ico`), j(`b`, ``, e.preset.label));
      let n = V(`✕`, `icon-btn bi-x`, () => this.hooks.cancel());
      ((n.title = `Esc`),
        (n.dataset.padSkip = ``),
        t.append(n),
        this.inspector.append(t, this.pad(e.preset)));
      for (let t of Di(e.preset)) {
        let n = j(`div`, `bi-knob`),
          r = j(`span`, `bi-val`, Cm(e.kn[t.key], t.step)),
          i = j(`input`);
        ((i.type = `range`),
          (i.min = String(t.min)),
          (i.max = String(t.max)),
          (i.step = String(t.step)),
          (i.value = String(e.kn[t.key])),
          i.setAttribute(`aria-label`, t.label),
          i.addEventListener(`input`, () => {
            ((r.textContent = Cm(Number(i.value), t.step)),
              this.hooks.knob(t.key, Number(i.value), !1));
          }),
          i.addEventListener(`change`, () => {
            (this.hooks.knob(t.key, Number(i.value), !0),
              document.body.classList.contains(`pad-nav`) || i.blur());
          }));
        let a = j(`span`, `bi-name`, t.label);
        ((a.title = `Drag ↔ to change ${t.label.toLowerCase()}`),
          a.addEventListener(`pointerdown`, (e) => {
            let n = Number(i.value),
              o = 0,
              s = n;
            (a.classList.add(`on`),
              bm(
                a,
                e,
                (e) => {
                  ((o += e),
                    (s = Li(t, n + (o * (t.max - t.min)) / 240, n)),
                    (i.value = String(s)),
                    (r.textContent = Cm(s, t.step)),
                    this.hooks.knob(t.key, s, !1));
                },
                (e) => {
                  (a.classList.remove(`on`),
                    e ||
                      ((i.value = String(n)), (r.textContent = Cm(n, t.step))),
                    this.hooks.knob(t.key, e ? s : n, !0));
                },
              ));
          }),
          this.rows.set(t.key, { range: i, val: r, step: t.step }),
          n.append(a, i, r),
          this.inspector.append(n));
      }
      if (Hi(e.preset)) {
        let t = j(`div`, `bi-skins`);
        for (let n of wi) {
          let r = V(``, `swatch ${n === e.skin ? `on` : ``}`, () =>
            this.hooks.skin(n),
          );
          ((r.style.background = Te[n]),
            (r.title = n),
            r.setAttribute(`aria-label`, n),
            t.append(r));
        }
        this.inspector.append(t);
      }
      let r = j(`div`, `bi-acts`),
        i = V(`⟲`, `tiny`, () => this.hooks.rotate(-1));
      ((i.title = `Rotate (${this.keys.rotL})`),
        i.setAttribute(`aria-label`, `Rotate left`));
      let a = V(`⟳`, `tiny`, () => this.hooks.rotate(1));
      if (
        ((a.title = `Rotate (${this.keys.rotR})`),
        a.setAttribute(`aria-label`, `Rotate right`),
        r.append(i, a),
        e.placed)
      ) {
        let e = V(`Duplicate`, `tiny`, () => this.hooks.duplicate());
        e.title = this.keys.dup;
        let t = V(`Delete`, `tiny bi-del`, () => this.hooks.remove());
        ((t.title = this.keys.del), t.prepend(U(`trash`)), r.append(e, t));
      }
      this.inspector.append(r);
    }
    inspectSpawn() {
      (this.inspector.replaceChildren(),
        this.rows.clear(),
        this.inspector.classList.add(`on`));
      let e = j(`div`, `bi-head`);
      e.append(B(`flag`, `bi-ico`), j(`b`, ``, `Spawn`));
      let t = V(`✕`, `icon-btn bi-x`, () => this.hooks.cancel());
      ((t.title = `Esc`), e.append(t));
      let n = j(`div`, `bi-acts`),
        r = V(`⟲`, `tiny`, () => this.hooks.rotate(-1));
      ((r.title = `Turn (${this.keys.rotL})`),
        r.setAttribute(`aria-label`, `Turn left`));
      let i = V(`⟳`, `tiny`, () => this.hooks.rotate(1));
      ((i.title = `Turn (${this.keys.rotR})`),
        i.setAttribute(`aria-label`, `Turn right`),
        n.append(r, i),
        this.inspector.append(
          e,
          j(
            `p`,
            `bi-note`,
            `Put the flag where skaters start, facing the way they go.`,
          ),
          n,
        ));
    }
    pad(e) {
      let t = Pi(e),
        n = (t) => Di(e).find((e) => e.key === t[0])?.label ?? ``,
        r = j(`div`, `bi-pad`);
      r.append(j(`span`, `bi-pad-ico`, `✥`));
      let i = j(`span`, `bi-pad-legend`);
      return (
        i.append(j(`span`, ``, `↔ ${n(t.x)}`), j(`span`, ``, `↕ ${n(t.y)}`)),
        t.z.length && i.append(j(`span`, `bi-pad-z`, `⇧↕ ${n(t.z)}`)),
        r.append(i),
        (r.title = `Drag to resize`),
        r.addEventListener(`pointerdown`, (e) => {
          e.button === 0 &&
            this.hooks.resizeStart() &&
            (r.classList.add(`on`),
            bm(
              r,
              e,
              (e, t, n) => this.hooks.resize(e, t, n.shiftKey),
              (e) => {
                (r.classList.remove(`on`), this.hooks.resizeEnd(e));
              },
            ));
        }),
        r
      );
    }
    setValues(e) {
      for (let [t, n] of this.rows) {
        let r = e[t];
        r !== void 0 &&
          ((n.range.value = String(r)), (n.val.textContent = Cm(r, n.step)));
      }
    }
    readout(e, t) {
      ((this.readoutEl.textContent = e ?? ``),
        this.readoutEl.classList.toggle(`on`, !!e),
        this.readoutEl.style.setProperty(`--grip`, t ?? `var(--lemon)`));
    }
    joints(e, t) {
      let n = this.root.clientWidth,
        r = this.root.clientHeight,
        i = 0;
      for (let a of t) {
        if (i >= xm) break;
        if (
          (Sm.set(a.x, a.y, a.z),
          Sm.distanceTo(e.position) > 45 ||
            (Sm.project(e),
            Sm.z > 1 || Math.abs(Sm.x) > 1 || Math.abs(Sm.y) > 1))
        )
          continue;
        let t = this.jointTags[i];
        (t ||
          ((t = j(`div`, `bh-joint`)),
          this.jointTags.push(t),
          this.jointsEl.append(t)),
          t.textContent !== a.text && (t.textContent = a.text),
          t.classList.toggle(`own`, !!a.own),
          (t.style.transform = `translate3d(${((Sm.x * 0.5 + 0.5) * n).toFixed(1)}px, ${((-Sm.y * 0.5 + 0.5) * r).toFixed(1)}px, 0) translate(-50%, -130%)`),
          (t.hidden = !1),
          i++);
      }
      for (let e = i; e < this.jointTags.length; e++)
        this.jointTags[e].hidden = !0;
    }
    dispose() {
      this.root.remove();
    }
  };
