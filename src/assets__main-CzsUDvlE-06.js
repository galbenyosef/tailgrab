// assets__main-CzsUDvlE 06 — root
// Lines 1245-1754 of readable/assets__main-CzsUDvlE.pretty.js (statement-aligned).
var jo = Math.random().toString(36).slice(2),
  Mo = () => matchMedia(`(orientation: portrait)`).matches,
  No = () => matchMedia(`(pointer: coarse)`).matches,
  Po = class {
    root;
    head;
    extra;
    body;
    live;
    view;
    nav;
    ac = new AbortController();
    offs = [];
    reveals = [];
    tabRow = null;
    constructor(e, t, n, r, i, a) {
      ((this.nav = e),
        (this.root = t),
        (this.head = n),
        (this.extra = r),
        (this.body = i),
        (this.live = a));
    }
    get signal() {
      return this.ac.signal;
    }
    resolve(e) {
      this.nav.resolveView(this.view, e);
    }
    push(e) {
      return this.nav.open(e);
    }
    own(e) {
      this.offs.push(e);
    }
    onReveal(e) {
      this.reveals.push(e);
    }
    cue(e) {
      (Object.assign(this.view.cue, e), this.nav.cueIfTop(this.view));
    }
    tabs(e, t, n) {
      ((this.tabRow ??= j(`div`, `page-tabs`)),
        (this.tabRow.dataset.padTabs = ``),
        this.head.insertBefore(this.tabRow, this.extra),
        this.tabRow.replaceChildren());
      let r = -1,
        i = e.map(([e, t], n) => {
          let r = j(`button`, `htab`, t);
          return (
            (r.type = `button`),
            (r.dataset.tab = e),
            r.addEventListener(`click`, () => a(e, n)),
            r
          );
        }),
        a = (t, a = e.findIndex(([e]) => e === t)) => {
          i.forEach((e, t) => {
            (e.classList.toggle(`on`, t === a),
              e.setAttribute(`aria-selected`, String(t === a)));
          });
          let o = r;
          ((r = a),
            n(t),
            !(o < 0 || A()) &&
              (this.body.style.setProperty(`--tdir`, String(Math.sign(a - o))),
              this.body.classList.remove(`tab-in`),
              this.body.offsetWidth,
              this.body.classList.add(`tab-in`)));
        };
      return (
        this.body.addEventListener(`animationend`, (e) => {
          e.animationName === `tabIn` && this.body.classList.remove(`tab-in`);
        }),
        this.tabRow.append(...i),
        a(t),
        (e) => a(e)
      );
    }
    dispose() {
      this.ac.abort();
      for (let e of this.offs.splice(0)) e();
    }
  },
  Fo = class {
    el;
    stage;
    scrim;
    rail = null;
    tabbar = null;
    home = null;
    sectionView = null;
    sectionId = null;
    sections = [];
    pages = [];
    gen = 0;
    seq = 0;
    inflight = 0;
    syncQueued = !1;
    pendingUrl = null;
    held = !1;
    openers = new WeakMap();
    onCue = null;
    constructor(e) {
      ((this.el = j(`div`, `nav`)),
        (this.scrim = j(`div`, `nav-scrim`)),
        (this.stage = j(`div`, `nav-stage`)),
        this.el.append(this.scrim, this.stage),
        e.append(this.el),
        history.replaceState({ nav: 0, boot: jo }, ``),
        window.addEventListener(`popstate`, this.onPop),
        window.addEventListener(`keydown`, (e) => {
          e.key === `Escape` &&
            !e.defaultPrevented &&
            this.level > 0 &&
            (e.preventDefault(), this.back());
        }),
        this.refresh());
    }
    get level() {
      return +!!this.sectionId + this.pages.length;
    }
    get top() {
      return this.topView()?.page.id ?? null;
    }
    get section() {
      return this.home ? (this.sectionId ?? `home`) : null;
    }
    get live() {
      return !this.home;
    }
    get pagesOpen() {
      return this.pages.length;
    }
    get topSticky() {
      return !!this.pages.at(-1)?.page.sticky;
    }
    get topRoot() {
      return this.topView()?.root ?? null;
    }
    get bars() {
      return [this.rail, this.tabbar].filter((e) => !!e);
    }
    setLobby(e, t) {
      ((this.sections = t),
        (this.home = this.mount(e, `home`, () => {})),
        (this.home.cue = { shot: e.shot ?? `home` }),
        this.stage.prepend(this.home.root),
        this.animateIn(this.home, 0),
        this.buildRail(),
        this.buildTabbar(),
        this.refresh(),
        this.emitCue(this.home));
    }
    clearLobby() {
      this.gen++;
      for (let e of this.pages.splice(0).reverse()) this.drop(e, null);
      (this.sectionView && this.drop(this.sectionView, null),
        (this.sectionView = null),
        (this.sectionId = null));
      let e = [this.home?.root, this.rail, this.tabbar].filter((e) => !!e);
      (this.home && this.home.ctx.dispose(),
        (this.home = null),
        (this.rail = this.tabbar = null));
      for (let t of e)
        (t.classList.add(`clearing`),
          setTimeout(() => t.remove(), A() ? 0 : 320));
      this.refresh();
    }
    go(e) {
      if (!this.home || this.topSticky) return;
      let t = this.sectionId ?? `home`,
        n = this.pages.length > 0;
      for (let e of this.pages.splice(0).reverse()) this.drop(e, null, 0);
      if (e === t) {
        (n && this.reveal(this.sectionView ?? this.home, 0), this.refresh());
        return;
      }
      let r = this.sectionDir(t, e),
        i = this.sectionView ?? this.home,
        a;
      if (e === `home`)
        ((a = this.home), (this.sectionView = null), (this.sectionId = null));
      else {
        let t = this.sections.find((t) => t.id === e);
        if (!t?.page) return;
        ((a = this.mount(t.page(), `section`, (e) => t.done?.(e))),
          (this.sectionView = a),
          (this.sectionId = e),
          this.stage.append(a.root));
      }
      (i.kind === `home`
        ? this.cover(i, r)
        : (i.ctx.dispose(), this.animateOut(i, r, !0)),
        a.kind === `home`
          ? this.reveal(a, r)
          : (this.animateIn(a, r), this.focus(a), this.emitCue(a)),
        this.refresh());
    }
    cycle(e) {
      if (!this.home) return;
      let t = Mo()
          ? ko
          : [
              `home`,
              ...this.sections.map((e) => e.id).filter((e) => e !== `home`),
            ],
        n = t[t.indexOf(this.sectionId ?? `home`) + e];
      n && this.go(n);
    }
    badge(e, t) {
      for (let n of [this.rail, this.tabbar]) {
        let r = n?.querySelector(`[data-tab="${e}"] .nav-badge`);
        r && ((r.textContent = t ?? ``), (r.hidden = !t));
      }
    }
    open(e) {
      if (e instanceof Promise) {
        let t = this.gen;
        return e.then((e) => (t === this.gen ? this.open(e) : null));
      }
      return this.top === e.id
        ? Promise.resolve(null)
        : new Promise((t) => {
            let n = this.topView(),
              r = this.mount(e, `page`, t);
            (this.openers.set(r, document.activeElement),
              this.pages.push(r),
              this.stage.append(r.root),
              n && this.cover(n, 1),
              this.animateIn(r, 1),
              this.focus(r),
              this.emitCue(r),
              this.refresh());
          });
    }
    back() {
      let e = this.pages.at(-1);
      return e?.page.sticky
        ? !1
        : e
          ? (this.popFrom(this.pages.length - 1, null), !0)
          : this.sectionId
            ? (this.go(`home`), !0)
            : !1;
    }
    closeAll() {
      if ((this.gen++, !this.pages.length)) return;
      for (let e of this.pages.splice(0).reverse()) this.drop(e, null, 0);
      let e = this.topView();
      (e && this.reveal(e, 0), this.refresh());
    }
    replaceUrl(e) {
      this.inflight
        ? (this.pendingUrl = e)
        : history.replaceState(history.state, ``, e);
    }
    resolveView(e, t) {
      if (e.kind === `section`) {
        e.settle(t);
        return;
      }
      let n = this.pages.indexOf(e);
      n >= 0 && this.popFrom(n, t);
    }
    cueIfTop(e) {
      this.topView() === e && this.emitCue(e);
    }
    recue() {
      let e = this.topView();
      e && this.emitCue(e);
    }
    popFrom(e, t) {
      let n = this.pages.splice(e);
      for (let e = n.length - 1; e >= 0; e--)
        this.drop(n[e], e === 0 ? t : null, -1);
      let r = this.topView();
      r && this.reveal(r, -1);
      let i = this.openers.get(n[0]);
      (this.live && !this.pages.length
        ? document.activeElement?.blur?.()
        : i instanceof HTMLElement &&
          i.isConnected &&
          !No() &&
          i.focus({ preventScroll: !0 }),
        this.refresh());
    }
    drop(e, t, n = -1) {
      (e.ctx.dispose(),
        e.kind === `page` && e.settle(t),
        n === 0 || A() ? e.root.remove() : this.animateOut(e, n, !0));
    }
    topView() {
      return this.pages.at(-1) ?? this.sectionView ?? this.home;
    }
    mount(e, t, n) {
      let r = j(
        `section`,
        `page page-${e.id} ${t === `section` ? `is-section` : ``}`,
      );
      ((r.dataset.page = e.id),
        (r.tabIndex = -1),
        e.hue && r.style.setProperty(`--page-hue`, e.hue));
      let i = j(`header`, `page-head`),
        a = j(`div`, `page-extra`),
        o = j(`div`, `page-body`);
      if (e.title) {
        let t = j(`button`, `ico-btn page-back`);
        ((t.type = `button`),
          t.setAttribute(`aria-label`, `Back`),
          t.append(U(`back`)),
          t.addEventListener(`click`, () => this.back()),
          i.append(t, j(`h1`, `page-title`, e.title), a),
          r.append(i));
      }
      r.append(o);
      let s = new Po(this, r, i, a, o, !this.home),
        c = !1,
        l = {
          kind: t,
          page: e,
          root: r,
          ctx: s,
          anim: 0,
          cue: { shot: e.shot ?? `away` },
          settle: (e) => {
            c || ((c = !0), n(e));
          },
        };
      return (t === `section` && (l.settle = n), (s.view = l), e.build(s), l);
    }
    sectionDir(e, t) {
      return Mo()
        ? Math.sign(ko.indexOf(t) - ko.indexOf(e)) || 1
        : t === `home`
          ? -1
          : 1;
    }
    animateIn(e, t) {
      let n = ++this.seq;
      ((e.anim = n),
        e.root.classList.remove(`leave`, `covered`),
        (e.root.inert = !1),
        !(A() || (t === 0 && e.kind !== `home`)) &&
          (e.root.style.setProperty(`--dir`, String(t)),
          e.root.classList.remove(`enter`),
          e.root.offsetWidth,
          e.root.classList.add(`enter`),
          this.after(e.root, () => {
            e.anim === n && e.root.classList.remove(`enter`);
          })));
    }
    animateOut(e, t, n) {
      let r = ++this.seq;
      ((e.anim = r), (e.root.inert = !0));
      let i = () => {
        e.anim === r &&
          (e.root.classList.remove(`leave`),
          n ? e.root.remove() : e.root.classList.add(`covered`));
      };
      if (A()) {
        i();
        return;
      }
      (e.root.style.setProperty(`--dir`, String(t)),
        e.root.classList.remove(`enter`),
        e.root.offsetWidth,
        e.root.classList.add(`leave`),
        this.after(e.root, i));
    }
    cover(e, t) {
      this.animateOut(e, t, !1);
    }
    reveal(e, t) {
      this.animateIn(e, t);
      for (let t of e.ctx.reveals) t();
      this.emitCue(e);
    }
    after(e, t) {
      let n = !1,
        r = () => {
          n || ((n = !0), e.removeEventListener(`animationend`, i), t());
        },
        i = (t) => {
          t.target === e && r();
        };
      (e.addEventListener(`animationend`, i), setTimeout(r, 450));
    }
    focus(e) {
      let t = e.root.querySelector(`[data-autofocus]`);
      t && !No()
        ? t.focus({ preventScroll: !0 })
        : e.root.focus({ preventScroll: !0 });
    }
    emitCue(e) {
      this.home && this.topView() === e && this.onCue?.({ ...e.cue });
    }
    buildRail() {
      this.rail = j(`nav`, `rail`);
      for (let e of this.sections)
        e.id !== `home` && this.rail.append(this.tabButton(e, `rail-item`));
      this.el.append(this.rail);
    }
    buildTabbar() {
      this.tabbar = j(`nav`, `tabbar`);
      for (let e of ko) {
        let t = this.sections.find((t) => t.id === e);
        t &&
          this.tabbar.append(
            this.tabButton(t, `tab-item ${e === `home` ? `tab-home` : ``}`),
          );
      }
      this.el.append(this.tabbar);
    }
    tabButton(e, t) {
      let n = j(`button`, `ico-btn ${t}`);
      ((n.type = `button`), (n.dataset.tab = e.id));
      let r = j(`span`, `nav-badge`);
      return (
        (r.hidden = !0),
        n.append(U(e.icon), j(`span`, `ico-label`, e.label), r),
        n.addEventListener(`click`, () => this.go(e.id)),
        n
      );
    }
    refresh() {
      let e = this.level,
        t = this.topView(),
        n = this.section;
      ((this.el.dataset.ctx = this.home ? `lobby` : `live`),
        (this.el.dataset.level = String(e)),
        n ? (this.el.dataset.section = n) : delete this.el.dataset.section,
        (this.el.dataset.pages = String(this.pages.length)),
        this.el.classList.toggle(`sticky`, this.topSticky));
      let r = e > 0 ? (t?.page.backdrop ?? `solid`) : `none`;
      ((this.scrim.dataset.backdrop = r),
        t?.page.hue && this.scrim.style.setProperty(`--page-hue`, t.page.hue));
      for (let e of [this.rail, this.tabbar])
        e?.querySelectorAll(`[data-tab]`).forEach((e) => {
          let t = e.dataset.tab === n;
          (e.classList.toggle(`on`, t),
            t
              ? e.setAttribute(`aria-current`, `page`)
              : e.removeAttribute(`aria-current`));
        });
      document.body.classList.toggle(`nav-open`, e > 0);
      let i = !!this.home || e > 0;
      (i !== this.held &&
        ((this.held = i), i ? z.hold(`nav`) : z.release(`nav`)),
        this.sync());
    }
    marker() {
      let e = history.state;
      return e?.boot === jo ? (e.nav ?? 0) : 0;
    }
    sync() {
      this.syncQueued ||
        ((this.syncQueued = !0),
        queueMicrotask(() => {
          ((this.syncQueued = !1), this.reconcile());
        }));
    }
    reconcile() {
      if (this.inflight) return;
      let e = this.marker(),
        t = this.level;
      if (e < t) {
        for (let n = e + 1; n <= t; n++)
          history.pushState({ nav: n, boot: jo }, ``);
        this.flushUrl();
      } else
        e > t
          ? (this.inflight++,
            history.go(t - e),
            setTimeout(() => {
              this.inflight &&
                ((this.inflight = 0), this.flushUrl(), this.reconcile());
            }, 1e3))
          : this.flushUrl();
    }
    flushUrl() {
      this.pendingUrl &&=
        (history.replaceState(history.state, ``, this.pendingUrl), null);
    }
    onPop = () => {
      if (this.inflight) {
        (this.inflight--, this.inflight || (this.flushUrl(), this.reconcile()));
        return;
      }
      let e = history.state;
      if (e?.boot && e.boot !== jo) {
        history.back();
        return;
      }
      let t = this.marker();
      for (; this.level > t && this.back(););
      t !== this.level && this.reconcile();
    };
  },
  Io = I.store,
  Lo = Io?.kind ?? null,
  Ro = (e) => (Lo === `fake` ? e : Lo ? ut[e].skus[Lo] : void 0),
  zo = null,
  Bo = () =>
    (zo ??= an.http
      .get(`/iap/token`)
      .then((e) => e.data.token)
      .catch((e) => {
        throw ((zo = null), e);
      }));
