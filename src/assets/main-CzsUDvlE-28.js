// assets/main-CzsUDvlE 28 — append
// Lines 8503-9384 of readable/assets/main-CzsUDvlE.pretty.js (statement-aligned).
var sd = new T(),
  cd = new T(),
  SkaterTags = class {
    root;
    edge;
    tags = new Map();
    prompts = new Map();
    enabled = !0;
    constructor(e) {
      ((this.root = j(`div`, `bubbles`)),
        (this.edge = j(`div`, `edge-pills`)),
        e.append(this.root, this.edge));
    }
    upsert(e, t, n, r, i = !1) {
      let a = this.tags.get(e);
      if (!a) {
        let t = j(`div`, `tag`),
          n = j(`div`, `bubble-stack`),
          i = j(`div`, `plate`),
          o = j(`div`, `badge`),
          s = j(`div`, `tag-slot`),
          c = this.prompts.get(e);
        (c && s.append(c),
          t.append(n, s, o, i),
          this.root.append(t),
          (a = {
            el: t,
            plate: i,
            badge: o,
            stack: n,
            slot: s,
            self: r,
            bubbles: [],
            hidden: !1,
            far: !1,
            x: NaN,
            y: 0,
            s: 0,
            z: 0,
          }),
          this.tags.set(e, a));
      }
      ((a.plate.textContent = t),
        a.plate.style.setProperty(`--pc`, n),
        a.el.classList.toggle(`self`, r),
        a.el.classList.toggle(`ghost`, i));
    }
    remove(e) {
      (this.tags.get(e)?.el.remove(), this.tags.delete(e));
    }
    badge(e, t, n = ``, r = ``, i) {
      let a = this.tags.get(e);
      a &&
        ((a.badge.textContent = t ?? ``),
        t && i && a.badge.prepend(B(i, `lead`)),
        (a.badge.className = `badge ${t ? `on` : ``} ${n}`),
        r
          ? a.badge.style.setProperty(`--bc`, r)
          : a.badge.style.removeProperty(`--bc`));
    }
    prompt(e, t) {
      t ? this.prompts.set(e, t) : this.prompts.delete(e);
      let n = this.tags.get(e);
      n && n.slot.replaceChildren(...(t ? [t] : []));
    }
    say(e, t, n = performance.now()) {
      let r = this.tags.get(e);
      if (!r || !this.enabled) return;
      let i = j(`div`, `bubble`, t.length > 78 ? t.slice(0, 77) + `…` : t),
        a = Math.min(6e3, 2500 + t.length * 50);
      for (
        r.stack.append(i), r.bubbles.push({ el: i, until: n + a });
        r.bubbles.length > 2;
      )
        r.bubbles.shift().el.remove();
      (r.bubbles.forEach((e, t) =>
        e.el.classList.toggle(`old`, t < r.bubbles.length - 1),
      ),
        r.self || this.edgePill(r, t));
    }
    emote(e, t) {
      this.pop(e, nn[t] ?? ``, ``, 1800, yn[t] ?? `sparkle`);
    }
    pop(e, t, n = ``, r = 1800, i) {
      let a = this.tags.get(e);
      if (!a) return;
      let o = j(`div`, `emote-pop ${n}`, t);
      (i && o.prepend(B(i, `lead`)),
        a.stack.append(o),
        setTimeout(() => o.remove(), r));
    }
    edgePill(e, t) {
      if (e.el.classList.contains(`hidden`)) {
        let n = j(`div`, `edge-pill`);
        for (
          n.append(
            j(`b`, ``, e.plate.textContent ?? ``),
            document.createTextNode(` ` + t.slice(0, 22)),
          ),
            n.style.setProperty(`--pc`, e.plate.style.getPropertyValue(`--pc`)),
            this.edge.append(n);
          this.edge.children.length > 3;
        )
          this.edge.firstElementChild?.remove();
        setTimeout(() => n.remove(), 2600);
      }
    }
    update(e, t, n = performance.now()) {
      let r = window.innerWidth,
        i = window.innerHeight;
      e.getWorldPosition(cd);
      for (let [a, o] of this.tags) {
        for (let e = o.bubbles.length - 1; e >= 0; e--) {
          let t = o.bubbles[e];
          n > t.until &&
            (t.el.classList.add(`out`),
            setTimeout(() => t.el.remove(), 300),
            o.bubbles.splice(e, 1));
        }
        let s = !t(a, sd),
          c = 0;
        if (
          ((s ||=
            ((c = sd.distanceTo(cd)),
            sd.project(e),
            sd.z > 1 ||
              sd.x < -1.1 ||
              sd.x > 1.1 ||
              sd.y < -1.2 ||
              sd.y > 1.1 ||
              c > 60)),
          s !== o.hidden &&
            ((o.hidden = s), o.el.classList.toggle(`hidden`, s)),
          s)
        )
          continue;
        let l = (sd.x * 0.5 + 0.5) * r,
          u = (-sd.y * 0.5 + 0.5) * i,
          d = Math.max(0.55, Math.min(1, 9 / c));
        (Math.abs(l - o.x) > 0.25 ||
          Math.abs(u - o.y) > 0.25 ||
          Math.abs(d - o.s) > 0.002) &&
          ((o.x = l),
          (o.y = u),
          (o.s = d),
          (o.el.style.transform = `translate3d(${l.toFixed(1)}px, ${u.toFixed(1)}px, 0) translate(-50%, -100%) scale(${d.toFixed(3)})`));
        let f = 1e3 - Math.round(c * 2);
        f !== o.z && ((o.z = f), (o.el.style.zIndex = String(f)));
        let p = c > 30;
        p !== o.far && ((o.far = p), o.el.classList.toggle(`far`, p));
      }
    }
    clear() {
      for (let e of this.tags.values()) e.el.remove();
      (this.tags.clear(), this.prompts.clear());
    }
    dispose() {
      (this.root.remove(), this.edge.remove());
    }
  },
  ud = 19,
  dd = 13,
  fd = 0.45,
  EmoteWheel = class {
    el;
    hub;
    pills;
    send;
    inside;
    panel = null;
    cx = 0;
    cy = 0;
    rem = 10;
    mode = ``;
    aim = -1;
    busy = !1;
    constructor(e, t, n) {
      ((this.send = t), (this.inside = n), (this.el = j(`div`, `emote-wheel`)));
      let r = j(`div`, `ew-ring`);
      ((this.hub = j(`div`, `ew-hub`)),
        (this.pills = nn.map((e, t) => {
          let n = -Math.PI / 2 + (t * 2 * Math.PI) / nn.length,
            r = V(e, `emote ew-pill`, () => this.fire(t));
          return (
            r.prepend(B(yn[t], `lead`)),
            r.append(j(`kbd`, ``, String(t + 1))),
            (r.style.cssText = `--x: ${(Math.cos(n) * ud).toFixed(2)}rem; --y: ${(Math.sin(n) * dd).toFixed(2)}rem; --i: ${t}`),
            r
          );
        })),
        r.append(this.hub, ...this.pills),
        this.el.append(r),
        e.append(this.el),
        this.setAim(-1));
    }
    show(e) {
      (this.mode ||
        (this.el.classList.add(`on`),
        (this.cx = innerWidth / 2),
        (this.cy = innerHeight / 2),
        (this.rem =
          parseFloat(getComputedStyle(document.documentElement).fontSize) ||
          10),
        (this.panel = Xo([this.el, ...this.inside], () => {
          this.busy || this.hide();
        }))),
        (this.mode = e),
        (this.el.dataset.mode = e),
        this.setAim(-1));
    }
    hide() {
      this.mode &&
        ((this.mode = ``),
        (this.busy = !1),
        this.setAim(-1),
        this.el.classList.remove(`on`),
        this.panel?.(),
        (this.panel = null));
    }
    fire(e = this.aim) {
      (e >= 0 && e < this.pills.length && this.send(e), this.hide());
    }
    aimAt(e, t) {
      let n = (e - this.cx) / (ud * this.rem),
        r = (t - this.cy) / (dd * this.rem);
      if (Math.hypot(n, r) < fd) {
        this.setAim(-1);
        return;
      }
      let i = this.pills.length,
        a = Math.round((Math.atan2(r, n) + Math.PI / 2) / ((2 * Math.PI) / i));
      this.setAim(((a % i) + i) % i);
    }
    setAim(e) {
      (e === this.aim && this.hub.firstChild) ||
        (this.pills[this.aim]?.classList.remove(`aim`),
        (this.aim = e),
        this.pills[e]?.classList.add(`aim`),
        this.hub.replaceChildren(e >= 0 ? B(yn[e]) : U(`chat`)));
    }
    dispose() {
      (this.hide(), this.el.remove());
    }
  },
  md = 220,
  hd = 12,
  ChatPanel = class {
    root;
    log;
    form;
    field;
    chatBtn;
    wheel;
    send;
    onKey;
    onKeyUp;
    onMouse;
    gAt = 0;
    press = null;
    muted = new Set();
    constructor(e, t, n, r, i = !0) {
      ((this.send = n),
        (this.root = j(`div`, `chat`)),
        (this.log = j(`div`, `chat-log`)),
        (this.form = j(`div`, `chat-form interactive`)),
        (this.field = j(`input`, `chat-field`)),
        (this.field.maxLength = 80),
        (this.field.placeholder = `Say something nice…  (Enter)`),
        (this.field.enterKeyHint = `send`));
      let a = V(`➤`, `chat-send`, () => this.submit());
      (this.form.append(this.field, a),
        (this.chatBtn = j(
          `button`,
          `btn ico-btn chat-btn ${i ? `` : `quick`}`,
        )),
        (this.chatBtn.type = `button`),
        this.chatBtn.setAttribute(`aria-label`, `Emotes`));
      let o = j(`span`, `ico-label`, `Emotes `);
      (o.append(j(`kbd`, ``, `G`)),
        this.chatBtn.append(U(`chat`), o),
        (this.wheel = new EmoteWheel(t, r, [this.chatBtn])),
        this.wireButton(),
        this.root.append(this.log, ...(i ? [this.form] : [])),
        e.append(this.root),
        this.field.addEventListener(`keydown`, (e) => {
          (e.stopPropagation(),
            e.key === `Enter`
              ? this.submit()
              : e.key === `Escape` && this.close());
        }),
        this.field.addEventListener(`blur`, () =>
          setTimeout(() => {
            document.activeElement !== this.field && this.close();
          }, 80),
        ));
      let s = this.wheel;
      ((this.onKey = (e) => {
        if (!(
          e.repeat ||
          e.defaultPrevented ||
          document.activeElement instanceof HTMLInputElement ||
          z.holding(`nav`)
        )) {
          if (e.key === `Escape`) {
            s.hide();
            return;
          }
          i && (e.key === `Enter` || e.key === `t` || e.key === `T`)
            ? (e.preventDefault(), s.hide(), this.open())
            : e.key.toLowerCase() === `g`
              ? s.mode === `stay`
                ? s.hide()
                : s.mode || (s.show(`hold`), (this.gAt = e.timeStamp))
              : s.mode && /^[1-8]$/.test(e.key) && s.fire(Number(e.key) - 1);
        }
      }),
        (this.onKeyUp = (e) => {
          e.key.toLowerCase() !== `g` ||
            s.mode !== `hold` ||
            this.press ||
            (s.aim >= 0
              ? s.fire()
              : e.timeStamp - this.gAt < md
                ? s.show(`stay`)
                : s.hide());
        }),
        (this.onMouse = (e) => {
          s.mode === `hold` && !this.press && s.aimAt(e.clientX, e.clientY);
        }),
        window.addEventListener(`keydown`, this.onKey),
        window.addEventListener(`keyup`, this.onKeyUp),
        window.addEventListener(`mousemove`, this.onMouse));
    }
    get showing() {
      return this.form.classList.contains(`on`) || !!this.wheel.mode;
    }
    mountButton(e) {
      e.prepend(this.chatBtn);
    }
    wireButton() {
      let e = this.chatBtn,
        t = this.wheel;
      (e.addEventListener(`pointerdown`, (n) => {
        if (n.button !== 0 || this.press) return;
        (n.preventDefault(), e.setPointerCapture(n.pointerId));
        let r = window.setTimeout(() => {
          this.press && !t.mode && (t.show(`hold`), (t.busy = !0));
        }, md);
        this.press = {
          id: n.pointerId,
          x: n.clientX,
          y: n.clientY,
          moved: !1,
          wasOpen: !!t.mode,
          timer: r,
        };
      }),
        e.addEventListener(`pointermove`, (e) => {
          let n = this.press;
          n &&
            e.pointerId === n.id &&
            (!n.moved &&
              Math.hypot(e.clientX - n.x, e.clientY - n.y) > hd &&
              ((n.moved = !0),
              t.mode !== `hold` && t.show(`hold`),
              (t.busy = !0)),
            n.moved && t.aimAt(e.clientX, e.clientY));
        }),
        e.addEventListener(`pointerup`, (e) => {
          let n = this.press;
          n &&
            e.pointerId === n.id &&
            (clearTimeout(n.timer),
            (this.press = null),
            (t.busy = !1),
            n.moved
              ? t.aim >= 0
                ? t.fire()
                : t.hide()
              : t.mode === `hold`
                ? t.show(`stay`)
                : n.wasOpen
                  ? t.hide()
                  : t.show(`stay`));
        }),
        e.addEventListener(`pointercancel`, (e) => {
          this.press?.id === e.pointerId &&
            (clearTimeout(this.press.timer),
            (this.press = null),
            t.mode === `hold` && t.hide());
        }),
        e.addEventListener(`click`, (e) => {
          e.detail === 0 && (t.mode ? t.hide() : t.show(`stay`));
        }));
    }
    open() {
      (this.form.classList.add(`on`), z.hold(`chat`), this.field.focus());
    }
    close() {
      (this.form.classList.remove(`on`), z.release(`chat`), this.field.blur());
    }
    submit() {
      let e = this.field.value.trim();
      (e && this.send(e), (this.field.value = ``), this.close());
    }
    line(e, t, n, r = ``) {
      if (r && this.muted.has(r)) return;
      let i = j(`div`, `chat-line`),
        a = j(`b`, `interactive`, e);
      ((a.style.color = t),
        (a.title = `Click to mute / unmute`),
        r &&
          a.addEventListener(`click`, () => {
            this.muted.has(r)
              ? (this.muted.delete(r), this.system(`Unmuted ${e}`))
              : (this.muted.add(r),
                this.system(`Muted ${e} — click their name again to unmute`));
          }),
        i.append(a, document.createTextNode(` ` + n)),
        this.push(i));
    }
    system(e) {
      this.push(j(`div`, `chat-line system`, e));
    }
    push(e) {
      for (this.log.append(e); this.log.children.length > 7;)
        this.log.firstElementChild?.remove();
      setTimeout(() => e.classList.add(`fade`), 9e3);
    }
    dispose() {
      (this.close(),
        this.wheel.dispose(),
        window.removeEventListener(`keydown`, this.onKey),
        window.removeEventListener(`keyup`, this.onKeyUp),
        window.removeEventListener(`mousemove`, this.onMouse),
        this.root.remove(),
        this.chatBtn.remove());
    }
  },
  _d = 2e4,
  vd = 2600,
  yd = 2600,
  bd = 800,
  xd = 450,
  Sd = new Set([`ollie`, `flip`, `grab`, `grind`]),
  LevelUnlock = class {
    root;
    news;
    hooks;
    st = null;
    sid = ``;
    beats = [];
    beat = -1;
    armAt = 0;
    timers = [];
    unPress = null;
    newsEl = null;
    constructor(e, t, n) {
      ((this.root = e), (this.news = t), (this.hooks = n));
    }
    show(e, t) {
      (this.stop(), (this.st = e), (this.sid = t), this.root.replaceChildren());
      let n = R(e.career.level),
        r = e.roster.get(t);
      if (!n || !r) return;
      let i = this.slams(n),
        a = i.length + 1;
      ((this.beats = i.length
        ? [
            () => this.runBeat(n, r, a),
            ...i.map((e, t) => () => this.slamBeat(e, t + 1, a)),
            () => this.card(n, r, !1),
          ]
        : [() => this.card(n, r, !0)]),
        (this.beat = -1),
        i.length &&
          ((this.unPress = z.onPress((e) => {
            Sd.has(e) && this.skip();
          })),
          this.root.addEventListener(`pointerdown`, this.skip)),
        this.root.classList.add(`on`),
        this.advance());
    }
    refresh() {
      this.newsEl?.isConnected && this.renderNews();
    }
    stop() {
      (this.clearTimers(),
        this.unbind(),
        (this.beats = []),
        (this.newsEl = null));
    }
    skip = () => {
      this.beat < this.beats.length - 1 &&
        performance.now() >= this.armAt &&
        this.advance();
    };
    advance() {
      this.clearTimers();
      let e = this.beats[++this.beat];
      e && e();
    }
    pace(e, t) {
      ((this.armAt = performance.now() + t),
        this.later(e, () => this.advance()));
    }
    later(e, t) {
      this.timers.push(window.setTimeout(t, e));
    }
    clearTimers() {
      for (let e of this.timers) clearTimeout(e);
      this.timers = [];
    }
    unbind() {
      (this.unPress?.(),
        (this.unPress = null),
        this.root.removeEventListener(`pointerdown`, this.skip));
    }
    slams(e) {
      let t = [],
        n = this.clearedEvent(e);
      if (n) {
        let r = n.next ? R(n.next) : null;
        r
          ? t.push({
              title: `LEVEL UNLOCKED!`,
              rc: `var(--lime)`,
              art: tr(r.parkId, `cr-slam-park`),
              name: r.name,
              sub: `${e.name} cleared · ${Ed(r)} is open`,
            })
          : t.push({
              title: `CAREER COMPLETE!`,
              rc: `var(--lemon)`,
              art: B(`trophy`, `cr-slam-ico`),
              name: `Every level cleared`,
              sub: `Go back for every last goal`,
            });
      }
      let r = mt(At(this.news));
      for (let e of r)
        if (e.kind === `pro`) {
          let n = qi(e.pro);
          t.push({
            title: `NEW SKATER!`,
            rc: `var(--bubblegum)`,
            art: G(n, `cr-slam-art`),
            name: n.name,
            sub: `Now in your lineup`,
          });
        } else if (e.kind === `skin`) {
          let n = jr(e.skin);
          n &&
            t.push({
              title: `SECRET UNLOCKED!`,
              rc: `var(--grape)`,
              art: G(n.look, `cr-slam-art`),
              name: n.name,
              sub: `${n.deed} · now in your lineup`,
            });
        }
      let i = n ? Lc(e.id) : null;
      if (
        i &&
        r.some(
          (e) =>
            e.kind === `loose` && e.pieces.includes(`${i.cat}:${i.item.id}`),
        )
      ) {
        let e = Me(oi());
        ((e[i.cat] = i.item.id),
          t.push({
            title: `NEW GEAR!`,
            rc: `var(--teal)`,
            art: G(e, `cr-slam-art`),
            name: i.item.name,
            sub: `In Your Style · ${Ic[i.cat]}`,
          }));
      }
      return t;
    }
    runBeat(e, t, n) {
      let r = this.st,
        i = j(`div`, `cr-beat cr-run`),
        a = r.career.goals.filter((e) => e.now).length,
        o = j(`div`, `rs-score`, t.score.toLocaleString());
      kd(o, 350);
      let s = j(`ul`, `rs-goals`),
        c = 0;
      (e.goals.forEach((e, t) => {
        let n = r.career.goals[t],
          i = j(
            `li`,
            `lv-goal ${n?.done && !n.now ? `done` : ``} ${n?.now ? `now` : ``}`,
          );
        i.style.setProperty(`--i`, String(t));
        let a = j(`span`, `tick`, ``);
        (n?.now
          ? (a.append(B(`star`)),
            i.style.setProperty(`--k`, String(c)),
            this.later(wd + c++ * Td, () => this.hooks.sfx(`star`)))
          : n?.done && a.append(U(`check`)),
          i.append(a, j(`span`, ``, e.text)),
          s.append(i));
      }),
        i.append(...this.head(e, t, a, o), s),
        this.root.replaceChildren(i, this.hint(0, n)),
        this.pace(Math.max(vd, wd + a * Td + 900), bd));
    }
    slamBeat(e, t, n) {
      let r = j(`div`, `cr-beat cr-slam`),
        i = j(`h2`, `rs-title ribbon cr-slam-title`, e.title);
      (i.style.setProperty(`--rc`, e.rc),
        r.append(
          j(`div`, `rays`),
          i,
          e.art,
          j(`div`, `cr-slam-name`, e.name),
          j(`div`, `cr-slam-sub`, e.sub),
        ),
        this.root.replaceChildren(r, this.hint(t, n)),
        this.hooks.sfx(`fanfare`),
        A() ||
          requestAnimationFrame(() => {
            if (e.art.isConnected) {
              let t = ir(e.art);
              sr(1800).confetti(t.x, t.y, 44, 1.2);
            }
          }),
        this.pace(yd, xd));
    }
    hint(e, t) {
      let n = j(`button`, `cr-hint`);
      ((n.type = `button`),
        (n.dataset.autofocus = ``),
        n.addEventListener(`click`, this.skip),
        nr() === `touch`
          ? n.append(j(`span`, ``, `tap to skip`))
          : n.append(Xn(`ollie`), j(`span`, ``, `skip`)));
      let r = j(`span`, `cr-dots`);
      for (let n = 0; n < t; n++) r.append(j(`i`, n <= e ? `on` : ``));
      return (n.append(r), n);
    }
    card(e, t, n) {
      this.unbind();
      let r = this.st,
        i = r.career.goals.filter((e) => e.now).length,
        a = j(`div`, `rs-score`, t.score.toLocaleString());
      n && kd(a, 350);
      let o = j(`div`, `cr-head`);
      o.append(...this.head(e, t, i, a));
      let s = j(`div`, `cr-goals`),
        c = (e, t, n, r) => {
          let i = j(`div`, `lv-goal ${e}`);
          i.style.setProperty(`--i`, String(r));
          let a = j(`span`, `tick`, ``);
          return (t && a.append(t), i.append(a, j(`span`, ``, n)), i);
        },
        l = e.goals.filter((e, t) => r.career.goals[t]?.now),
        u = e.goals.filter((e, t) => !r.career.goals[t]?.done),
        d = e.goals.filter(
          (e, t) => r.career.goals[t]?.done && !r.career.goals[t]?.now,
        ).length,
        f = 0;
      (l.length &&
        s.append(
          j(`div`, `cr-group`, `THIS RUN · ${l.length}`),
          ...l.map((e) => c(`now`, B(`star`), e.text, f++)),
        ),
        u.length &&
          s.append(
            j(`div`, `cr-group open`, `STILL OPEN · ${u.length}`),
            ...u.map((e) => c(``, null, e.text, f++)),
          ));
      let p = e.goals.length - u.length;
      d &&
        s.append(
          c(
            `done before`,
            U(`check`),
            `${d} done before · ${p} of ${e.goals.length} goals`,
            f++,
          ),
        );
      let m = j(`div`, `cr-rewards`),
        h = performance.now() + this.hooks.armMs,
        g = this.nextLevel(e, m, h);
      ((this.newsEl = j(`div`, `cr-news`)),
        m.append(this.newsEl),
        this.renderNews());
      let _ = j(`div`, `cr-sum`);
      _.append(o, m, s);
      let v = j(`div`, `rs-btns cr-btns`),
        y = !1,
        b = Dd(`RETRY`, g?.hero ? `big secondary` : `big primary`, h, () => {
          y ||
            ((y = !0),
            ti().then(() => {
              ((y = !1), this.hooks.send(`rematch`, { on: !0 }));
            }));
        }),
        x = Dd(`SKATE HUB`, `big ghost`, h, this.hooks.leave, `home`),
        S = Dd(`MAIN MENU`, `big ghost`, h, this.hooks.menu, `deck`),
        C = Dd(`BACK`, `big ghost`, h, this.hooks.levels, `back`);
      (v.append(S, x, C, b), this.root.replaceChildren(_, v));
      let ee = g?.hero ? g.el : b;
      ((ee.dataset.autofocus = ``), ee.focus({ preventScroll: !0 }));
      let te = () => {
        if (!v.isConnected) return;
        let e = r.phaseEndsAt - this.hooks.now(),
          t = x.querySelector(`.btn-sub`),
          n = e <= _d ? `in ${Math.max(0, Math.ceil(e / 1e3))}s` : ``;
        (t.textContent !== n && (t.textContent = n), this.later(250, te));
      };
      te();
    }
    nextLevel(e, t, n) {
      let r = this.clearedEvent(e),
        i = ln[wn(e.id) + 1],
        a = N.profile;
      if (r && !i) {
        let n = j(`div`, `cr-done`),
          r = j(`div`, `cr-words`);
        return (
          r.append(
            j(`span`, `rs-new-kicker`, `${e.name.toUpperCase()} CLEARED`),
            j(`span`, `cr-next-name`, `Career complete!`),
          ),
          n.append(B(`trophy`, `cr-done-ico`), r),
          t.append(n),
          null
        );
      }
      if (!i || !(r || (a && nt(a, i.id)))) return null;
      let o = !!r,
        s = j(`div`, `cr-next ${o ? `hero` : ``}`),
        c = j(`div`, `cr-next-art`);
      (c.append(tr(i.parkId)),
        o &&
          c.append(B(`star`, `cr-burst`), j(`span`, `cr-badge`, `UNLOCKED!`)));
      let l = j(`div`, `cr-words`);
      (l.append(
        j(
          `span`,
          `rs-new-kicker ${o ? `` : `up`}`,
          o
            ? `${e.name.toUpperCase()} CLEARED`
            : `NEXT UP · ${Ed(i).toUpperCase()}`,
        ),
        j(`span`, `cr-next-name`, i.name),
      ),
        o && l.append(j(`span`, `cr-next-sub`, `${Ed(i)} · next up`)));
      let u = Dd(`NEXT LEVEL ▶`, o ? `big primary` : `secondary`, n, () =>
        this.hooks.next(i.id),
      );
      return (l.append(u), s.append(c, l), t.append(s), { el: u, hero: o });
    }
    renderNews() {
      let e = this.newsEl;
      if (!e) return;
      e.replaceChildren();
      let t = 0,
        n = (e, n, r, i, a = ``, o) => {
          let s = j(o ? `button` : `div`, `rs-new`);
          s.style.setProperty(`--i`, String(t++));
          let c = j(`div`, `rs-new-words`);
          (c.append(
            j(`span`, `rs-new-kicker`, n),
            j(`span`, `rs-new-title`, r),
          ),
            a && c.append(j(`span`, `rs-new-sub`, a)),
            s.append(i, c),
            o &&
              s instanceof HTMLButtonElement &&
              ((s.type = `button`),
              s.classList.add(`rs-spend`),
              s.append(j(`span`, `rs-spend-go`, `SPEND`)),
              s.addEventListener(`click`, o)),
            e.append(s));
        },
        r = j(`div`, `cr-features`);
      for (let e of mt(At(this.news)))
        if (e.kind === `pro`)
          n(
            r,
            `NEW SKATER`,
            qi(e.pro).name,
            G(qi(e.pro), `rs-art`),
            `Now in your lineup`,
          );
        else if (e.kind === `skin`) {
          let t = jr(e.skin);
          t && n(r, `SECRET UNLOCKED`, t.name, G(t.look, `rs-art`), t.deed);
        } else
          n(
            r,
            `NEW IN YOUR STYLE`,
            e.pieces.length + e.colors.length === 1
              ? Ln(e.pieces[0] ?? e.colors[0])
              : Od(e),
            B(`star`, `rs-new-ico`),
          );
      let i = j(`div`, `cr-chips`),
        a = this.news.reduce((e, t) => e + (t.kind === `xp` ? t.gained : 0), 0),
        o = this.news.reduce(
          (e, t) => (t.kind === `levelUp` ? Math.max(e, t.level) : e),
          0,
        );
      o
        ? n(
            i,
            o <= Ji.full
              ? `+${a.toLocaleString()} XP · FASTER & HIGHER`
              : `+${a.toLocaleString()} XP`,
            `LV ${o}!`,
            U(`ranks`, `rs-new-ico`),
          )
        : a &&
          n(i, `EARNED`, `+${a.toLocaleString()} XP`, U(`ranks`, `rs-new-ico`));
      let s = this.news.reduce(
        (e, t) => e + (t.kind === `coins` ? t.gained : 0),
        0,
      );
      s &&
        n(
          i,
          this.news.some(
            (e) => e.kind === `coins` && e.find?.startsWith(`deck.`),
          )
            ? `SECRET DECK FOUND`
            : `PICKED UP`,
          `+${s.toLocaleString()} coins`,
          B(`coin`, `rs-new-ico`),
        );
      for (let e of this.news)
        e.kind === `mission` &&
          n(
            i,
            `MISSION COMPLETE · CLAIM IT`,
            e.text,
            U(`missions`, `rs-new-ico`),
          );
      let c = this.news.filter((e) => e.kind === `goal`).length,
        l = N.profile ? Et(N.profile) : null,
        u = Math.max(0, Math.min(c, Qt * Tn.length - ((l?.earned ?? 0) - c)));
      (u &&
        n(
          i,
          l?.free ? `TAP TO SPEND` : `EARNED`,
          `+${u} stat point${u > 1 ? `s` : ``}`,
          B(`star`, `rs-new-ico`),
          ``,
          l?.free ? () => this.hooks.stats() : void 0,
        ),
        r.childElementCount && e.append(r),
        r.childElementCount &&
          i.childElementCount &&
          e.append(j(`div`, `cr-rule`)),
        i.childElementCount && e.append(i));
    }
    head(e, t, n, r) {
      return [
        F(`div`, `rs-kicker`, `trophy`, `Career · ${e.name}`),
        j(
          `h2`,
          `rs-title ribbon`,
          n ? `${n} GOAL${n > 1 ? `S` : ``}!` : `RUN OVER`,
        ),
        r,
        j(
          `div`,
          `rs-sub`,
          `run score${t.best ? ` · best combo ${t.best.toLocaleString()}` : ``}${t.bails ? ` · ${t.bails} bail${t.bails > 1 ? `s` : ``}` : ``}`,
        ),
      ];
    }
    clearedEvent(e) {
      return this.news.find((t) => t.kind === `cleared` && t.level === e.id);
    }
  },
  wd = 900,
  Td = 300;
