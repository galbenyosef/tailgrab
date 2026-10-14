// assets/padNav-a65kF6ol 03 — main
// Lines 647-1238 of readable/assets/padNav-a65kF6ol.pretty.js (statement-aligned).
var Q = (e) =>
    e instanceof HTMLTextAreaElement ||
    (e instanceof HTMLInputElement &&
      ![`range`, `checkbox`, `radio`, `button`, `submit`].includes(e.type)),
  pt = `navpress`,
  mt = (e, t) => e.main.dispatchEvent(new CustomEvent(pt, { detail: t })),
  PadNav = class {
    nav;
    ui;
    hints;
    ring;
    ringMain = null;
    prev = [];
    dir = null;
    stickDir = null;
    nextRepeat = 0;
    lastNow = 0;
    src = null;
    held = !1;
    latch = !1;
    keysDown = new Set();
    holding = null;
    main = null;
    last = null;
    scrollHost = null;
    hintKey = ``;
    canScroll = { at: -1 / 0, on: !1 };
    px = NaN;
    py = NaN;
    onMenu = null;
    overlay = null;
    constructor(e, t) {
      ((this.nav = e),
        (this.ui = t),
        (this.hints = i(`div`, `pad-hints`)),
        (this.ring = i(`div`, `pad-ring`)),
        t.append(this.ring, this.hints));
      let n = () => this.engage(null);
      (window.addEventListener(
        `pointermove`,
        (e) => {
          let t =
            Math.abs(e.clientX - this.px) + Math.abs(e.clientY - this.py) > 3;
          (t && !Number.isNaN(this.px) && n(),
            (t || Number.isNaN(this.px)) &&
              ((this.px = e.clientX), (this.py = e.clientY)));
        },
        { capture: !0, passive: !0 },
      ),
        window.addEventListener(`pointerdown`, n, { capture: !0, passive: !0 }),
        window.addEventListener(`keydown`, this.onKey),
        window.addEventListener(`keyup`, this.onKeyUp),
        window.addEventListener(`blur`, () => {
          (this.keysDown.clear(), this.endHold());
        }));
    }
    get engaged() {
      return this.src !== null;
    }
    update(e) {
      let t = Math.min(0.1, (e - this.lastNow) / 1e3);
      this.lastNow = e;
      let n = f();
      if (!n) {
        ((this.prev = []),
          (this.dir = this.stickDir = null),
          this.holding?.src === `pad` && this.endHold(),
          this.src === `pad` && this.engage(null),
          this.apply(this.engaged || this.keysDown.size ? this.scope() : null));
        return;
      }
      let r = (e) => !!n.buttons[e]?.pressed,
        i = (e) => r(e) && !this.prev[e],
        a = this.scope();
      (a && a.main !== this.main && (this.nextRepeat = 1 / 0),
        a?.kind === `build` && a.main !== this.main && this.engage(`pad`));
      let o = this.readDir(n, r);
      o && o !== this.dir && a && mt(a, o);
      let s = {
        move: this.repeat(o, e),
        a: i(Z.a),
        b: i(Z.b),
        y: i(Z.y),
        lb: i(Z.lb),
        rb: i(Z.rb),
        start: i(Z.start),
      };
      this.prev = n.buttons.map((e) => e.pressed);
      let c = this.handle(s, `pad`);
      (this.holding?.src === `pad` && !r(Z.a) && this.endHold(),
        c && this.scroll(c, n, t),
        this.apply(this.scope()));
    }
    handle(e, t) {
      let n = this.scope();
      t === `pad` &&
        (e.start || (n && (e.a || e.b || e.y || e.lb || e.rb))) &&
        (this.latch = !0);
      let r = e.start ? this.owned(n, `start`) : null;
      if (r) (this.engage(t), r.click());
      else if (e.start) {
        if (n?.kind === `nav` && this.nav.live)
          for (; this.nav.pagesOpen && this.nav.back(););
        else
          n?.startBacks
            ? n.back?.()
            : (!n || n.kind === `results`) &&
              this.nav.live &&
              !m.holding(`chat`) &&
              (this.onMenu?.(), this.nav.topRoot && this.engage(t));
        n = this.scope();
      }
      if (!n) return null;
      let i = e.move,
        a = e.a,
        o = !!(i || e.a || e.b || e.y || e.lb || e.rb);
      (!this.engaged && o
        ? (this.engage(t), (i = null), (a = !1))
        : o && this.engage(t),
        this.engaged && this.keep(n));
      let s = document.activeElement;
      if (
        (i &&
          (s instanceof HTMLInputElement &&
          s.type === `range` &&
          (i === `left` || i === `right`)
            ? this.slide(s, i === `right` ? 1 : -1)
            : this.move(n, i)),
        e.a && this.valid(s, n) && s.hasAttribute(`data-hold`)
          ? Xe(s) && (this.holding = { el: s, src: t })
          : a && this.valid(s, n) && !Q(s) && s.click(),
        e.b)
      ) {
        Q(s) && s.blur();
        let e = this.owned(n, `b`);
        e ? e.click() : n.back?.();
      }
      return (
        e.y && this.owned(n, `y`)?.click(),
        (e.lb || e.rb) && n.tabs?.step(e.rb ? 1 : -1),
        n
      );
    }
    onKey = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      let t = e.code;
      if (t === `Escape`) {
        if (e.defaultPrevented || e.repeat || m.holding(`build`)) return;
        let t = this.scope();
        ((!t || t.kind === `results`) &&
          this.handle(
            { move: null, a: !1, b: !1, y: !1, lb: !1, rb: !1, start: !0 },
            `kb`,
          ),
          this.apply(this.scope()));
        return;
      }
      if (t === `Tab`) {
        let e = this.scope();
        e && e.kind !== `build` && this.engage(`kb`);
        return;
      }
      let n = it[t] ?? null,
        r = confirmKeys.has(t),
        i = t === `KeyQ`,
        a = t === `KeyE`;
      if (!n && !r && !i && !a) {
        this.src === `pad` && this.engage(null);
        return;
      }
      let o = this.scope();
      if (!o || o.kind === `build`) return;
      let s = document.activeElement;
      Q(s) ||
        s instanceof HTMLSelectElement ||
        (e.preventDefault(),
        this.keysDown.add(t),
        n && !e.repeat && mt(o, n),
        (!e.repeat || n) &&
          (r && !this.engaged && this.valid(s, o) && this.engage(`kb`),
          this.handle(
            { move: n, a: r, b: !1, y: !1, lb: i, rb: a, start: !1 },
            `kb`,
          ),
          this.apply(this.scope())));
    };
    onKeyUp = (e) => {
      (this.keysDown.delete(e.code) && e.code === `Space` && e.preventDefault(),
        confirmKeys.has(e.code) && this.holding?.src === `kb` && this.endHold());
    };
    endHold() {
      this.holding &&= (Ze(this.holding.el), null);
    }
    scope() {
      let e = this.ui.querySelectorAll(`.modal-back .modal`),
        t = e[e.length - 1];
      if (t)
        return {
          kind: `modal`,
          roots: [t],
          main: t,
          back: () => t.querySelector(`.modal-x`)?.click(),
          backLabel: `Close`,
          startBacks: !1,
          tabs: null,
        };
      let n = this.nav.topRoot;
      if (n) {
        let e = !this.nav.live,
          t = this.nav.pagesOpen > 0,
          r = this.nav.bars.filter(
            (e) => e.checkVisibility?.({ opacityProperty: !0 }) ?? !0,
          );
        return {
          kind: `nav`,
          roots: e && !t ? [n, ...r] : [n],
          main: n,
          back:
            this.nav.level > 0 && !this.nav.topSticky
              ? () => this.nav.back()
              : null,
          backLabel: `Back`,
          startBacks: !1,
          tabs: this.navTabs(n, e && !t),
        };
      }
      if (m.holding(`chat`)) return null;
      if (m.holding(`build`)) {
        let e = this.overlay?.();
        return e ? { kind: `build`, ...e, startBacks: !0 } : null;
      }
      let r = this.ui.querySelector(`.results.on`);
      return r
        ? {
            kind: `results`,
            roots: [r],
            main: r,
            back: null,
            backLabel: ``,
            startBacks: !1,
            tabs: null,
          }
        : null;
    }
    navTabs(e, t) {
      if (t) return { step: (e) => this.nav.cycle(e), label: `Sections` };
      let n = e.querySelector(`[data-pad='next']`),
        r = e.querySelector(`[data-pad='prev']`);
      if (n || r)
        return {
          step: (e) => {
            let t = e > 0 ? n : r;
            t && this.usable(t) && t.click();
          },
          label: (n ?? r)?.dataset.padLabel ?? `Browse`,
        };
      let i = [...e.querySelectorAll(`[data-pad-tabs]`)].filter(
        (e) => e.isConnected && e.getClientRects().length,
      );
      return i.length
        ? {
            label: `Tabs`,
            step: (e) => {
              let t = i.find((e) => e.isConnected);
              if (!t) return;
              let n = [...t.querySelectorAll(`button`)].filter((e) =>
                this.usable(e),
              );
              n[n.findIndex((e) => e.classList.contains(`on`)) + e]?.click();
            },
          }
        : null;
    }
    owned(e, t) {
      if (e?.kind !== `nav`) return null;
      let n = e.main.querySelector(`[data-pad="${t}"]`);
      return n && this.usable(n) ? n : null;
    }
    candidates(e) {
      let t = [];
      for (let n of e.roots)
        for (let e of n.querySelectorAll(rt)) this.usable(e) && t.push(e);
      return t;
    }
    usable(e) {
      if (
        e.disabled ||
        e.closest(
          this.src === `kb`
            ? `[inert], [hidden]`
            : `[inert], [data-pad-skip], [hidden]`,
        )
      )
        return !1;
      let t = e.getBoundingClientRect();
      return !t.width || !t.height
        ? !1
        : (e.checkVisibility?.({ visibilityProperty: !0 }) ?? !0);
    }
    valid(e, t) {
      return (
        e instanceof HTMLElement &&
        e.matches(rt) &&
        t.roots.some((t) => t.contains(e)) &&
        this.usable(e)
      );
    }
    keep(e) {
      let t = e.main !== this.main;
      t && ((this.main = e.main), (this.last = null));
      let n = document.activeElement;
      if (this.valid(n, e) && !(t && e.focus)) {
        this.remember(n);
        return;
      }
      let r = this.candidates(e);
      if (!r.length) return;
      let i;
      !t && this.last && (i = this.relocate(r, this.last));
      let a = r.filter(yt);
      ((i ??=
        (t && e.focus && r.includes(e.focus) ? e.focus : void 0) ??
        r.find((e) => e.hasAttribute(`data-autofocus`)) ??
        a.find((e) => e.closest(`.page-body`)) ??
        r.find(
          (e) => e.closest(`[data-pad-tabs]`) && e.classList.contains(`on`),
        ) ??
        a[0] ??
        r[0]),
        this.focus(i));
    }
    relocate(e, t) {
      let n = (e) => {
        let n,
          r = 1 / 0;
        for (let i of e) {
          let e = i.getBoundingClientRect(),
            a = Math.hypot(
              e.left + e.width / 2 - (t.rect.left + t.rect.width / 2),
              e.top + e.height / 2 - (t.rect.top + t.rect.height / 2),
            );
          a < r && ((r = a), (n = i));
        }
        return n;
      };
      return n(e.filter((e) => _t(e) === t.sig)) ?? n(e);
    }
    remember(e) {
      this.last = { rect: e.getBoundingClientRect(), sig: _t(e) };
    }
    focus(e) {
      (e.focus({ preventScroll: !0 }), this.reveal(e), this.remember(e));
    }
    move(e, t) {
      let n = document.activeElement,
        r = this.valid(n, e) ? n.getBoundingClientRect() : this.last?.rect;
      if (!r) return;
      let i = null,
        a = 1 / 0;
      for (let o of this.candidates(e)) {
        if (o === n) continue;
        let e = gt(r, o.getBoundingClientRect(), t);
        e < a && ((a = e), (i = o));
      }
      if (t === `up` || t === `down`) {
        let a = t === `down` ? 1 : -1,
          o = i ? vt(i, `y`, e) : this.hostFor(e, `y`);
        if (o) {
          let e = o.getBoundingClientRect(),
            t = i?.getBoundingClientRect(),
            n = t ? (a > 0 ? t.bottom - e.bottom : e.top - t.top) : 1 / 0,
            r =
              a > 0
                ? o.scrollTop + o.clientHeight < o.scrollHeight - 1
                : o.scrollTop > 0;
          if (n > e.height / 2 && r) {
            o.scrollBy({
              top: a * e.height * 0.6,
              behavior: xt() ? `auto` : `smooth`,
            });
            return;
          }
        }
        let s = n instanceof HTMLElement ? n.closest(`[data-pad-wrap]`) : null;
        s && !(i && s.contains(i)) && (i = this.wrapEnd(e, s, r, t) ?? i);
      }
      i && this.focus(i);
    }
    wrapEnd(e, t, n, r) {
      let i = t.getBoundingClientRect(),
        a = new DOMRect(
          n.x,
          r === `up` ? i.bottom + 2 : i.top - n.height - 2,
          n.width,
          n.height,
        ),
        o = null,
        s = 1 / 0;
      for (let n of this.candidates(e)) {
        if (!t.contains(n)) continue;
        let e = gt(a, n.getBoundingClientRect(), r);
        e < s && ((s = e), (o = n));
      }
      return o;
    }
    reveal(e) {
      let t = bt(2),
        n = xt() ? `auto` : `smooth`;
      for (
        let r = e.parentElement;
        r && r !== document.body;
        r = r.parentElement
      ) {
        let i = getComputedStyle(r),
          a = e.getBoundingClientRect(),
          o = r.getBoundingClientRect(),
          s = o.top + t + (parseFloat(i.scrollPaddingTop) || 0),
          c = o.bottom - t - (parseFloat(i.scrollPaddingBottom) || 0),
          l = 0,
          u = 0;
        ($(r, `y`) &&
          (a.top < s
            ? (u = a.top - s)
            : a.bottom > c && (u = Math.min(a.bottom - c, a.top - s))),
          $(r, `x`) &&
            (a.left < o.left + t
              ? (l = a.left - o.left - t)
              : a.right > o.right - t &&
                (l = Math.min(a.right - o.right + t, a.left - o.left - t))),
          (l || u) && r.scrollBy({ left: l, top: u, behavior: n }));
      }
    }
    slide(e, t) {
      (t > 0 ? e.stepUp() : e.stepDown(),
        e.dispatchEvent(new Event(`input`, { bubbles: !0 })),
        e.dispatchEvent(new Event(`change`, { bubbles: !0 })));
    }
    scroll(e, t, n) {
      let r = t.axes[2] ?? 0,
        i = t.axes[3] ?? 0;
      (Math.abs(i) >= 0.25 &&
        this.hostFor(e, `y`)?.scrollBy({ top: i * ut * n }),
        Math.abs(r) >= 0.25 &&
          this.hostFor(e, `x`)?.scrollBy({ left: r * ut * n }));
    }
    hostFor(e, t) {
      let n = document.activeElement,
        r = n instanceof HTMLElement ? vt(n, t, e) : null;
      if (r || t === `x`) return r;
      let i = this.scrollHost;
      return (
        (i?.main !== e.main ||
          (i.el ? !i.el.isConnected : this.lastNow - i.at > 1e3)) &&
          (this.scrollHost = {
            main: e.main,
            el:
              [e.main, ...e.main.querySelectorAll(`*`)].find((e) =>
                $(e, `y`),
              ) ?? null,
            at: this.lastNow,
          }),
        this.scrollHost.el
      );
    }
    readDir(e, t) {
      if (t(Z.up)) return `up`;
      if (t(Z.down)) return `down`;
      if (t(Z.left)) return `left`;
      if (t(Z.right)) return `right`;
      let n = e.axes[0] ?? 0,
        r = e.axes[1] ?? 0,
        i = (e) =>
          e === `left` ? -n : e === `right` ? n : e === `up` ? -r : r;
      return this.stickDir &&
        i(this.stickDir) > lt &&
        Math.abs(i(this.stickDir)) >=
          Math.abs(
            this.stickDir === `left` || this.stickDir === `right` ? r : n,
          )
        ? this.stickDir
        : ((this.stickDir = null),
          Math.max(Math.abs(n), Math.abs(r)) < ct
            ? null
            : ((this.stickDir =
                Math.abs(n) > Math.abs(r)
                  ? n > 0
                    ? `right`
                    : `left`
                  : r > 0
                    ? `down`
                    : `up`),
              this.stickDir));
    }
    repeat(e, t) {
      return e === this.dir
        ? e && t >= this.nextRepeat
          ? ((this.nextRepeat = t + st), e)
          : null
        : ((this.dir = e), (this.nextRepeat = t + ot), e);
    }
    engage(e) {
      e !== this.src &&
        ((this.src = e),
        e && m.noteSource(e),
        document.body.classList.toggle(`pad-nav`, !!e),
        (this.hintKey = ``),
        e || this.hints.classList.toggle(`on`, !1));
    }
    apply(e) {
      (e || (this.main = null),
        this.holding &&
          (document.activeElement !== this.holding.el ||
            !this.holding.el.isConnected) &&
          this.endHold(),
        this.place(e),
        this.prev.some(Boolean) || (this.latch = !1));
      let t =
        this.latch ||
        this.keysDown.size > 0 ||
        (!!e && e.kind !== `nav` && this.engaged);
      t !== this.held &&
        ((this.held = t), t ? m.hold(`padnav`) : m.release(`padnav`));
      let n = !!e && this.engaged;
      if ((this.hints.classList.toggle(`on`, n), !n)) {
        this.hintKey = ``;
        return;
      }
      let r = this.src === `kb`,
        a = padLabels[r ? `kb` : (_ ?? `xbox`)],
        o = document.activeElement,
        s =
          o instanceof HTMLInputElement && o.type === `range`
            ? `slider`
            : Q(o)
              ? `text`
              : o instanceof HTMLElement && o.hasAttribute(`data-hold`)
                ? `hold`
                : ``,
        c = !r && e.kind === `nav` && this.nav.live;
      this.lastNow - this.canScroll.at > 500 &&
        (this.canScroll = {
          at: this.lastNow,
          on: !r && !!this.hostFor(e, `y`),
        });
      let l = [`b`, `y`, `start`]
          .map((t) => [t, this.owned(e, t)?.dataset.padLabel ?? ``])
          .filter(([, e]) => e),
        u = `${this.src}|${_}|${e.back ? e.backLabel : ``}|${e.startBacks}|${e.tabs?.label ?? ``}|${c}|${s}|${this.canScroll.on}|${l.join()}`;
      if (u === this.hintKey) return;
      this.hintKey = u;
      let d = (e, t) => {
          let n = i(`span`, `pad-hint`);
          for (let t of e) n.append(i(`span`, `pad-key`, t));
          return (n.append(i(`span`, ``, t)), n);
        },
        f = [
          s === `slider`
            ? d([`◀`, `▶`], `Adjust`)
            : s === `text`
              ? d([], `Type`)
              : d([a.a], s === `hold` ? `Hold` : `Select`),
        ];
      if (
        (e.back &&
          f.push(d(e.startBacks && !r ? [a.b, a.start] : [a.b], e.backLabel)),
        !r)
      )
        for (let [e, t] of l) f.push(d([a[e]], t));
      (e.tabs && f.push(d([a.lb, a.rb], e.tabs.label)),
        c && f.push(d([a.start], `Resume`)),
        this.canScroll.on && f.push(d([a.rs], `Scroll`)),
        this.hints.replaceChildren(...f));
    }
    place(e) {
      let t = document.activeElement,
        n = !!e && this.engaged && this.valid(t, e);
      if ((this.ring.classList.toggle(`on`, n), !n)) {
        this.ringMain = null;
        return;
      }
      let r = t.getBoundingClientRect(),
        i = bt(0.45),
        a = this.ring.style;
      ((a.transition = e.main === this.ringMain ? `` : `none`),
        (this.ringMain = e.main),
        (a.translate = `${r.left - i}px ${r.top - i}px`),
        (a.width = `${r.width + i * 2}px`),
        (a.height = `${r.height + i * 2}px`));
      let o = getComputedStyle(t).borderTopLeftRadius;
      a.borderRadius = o.endsWith(`%`) ? o : `${(parseFloat(o) || 0) + i}px`;
    }
  };
