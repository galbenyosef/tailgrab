// assets/fxHooks-Cvx_8YWC 06 — append
// Lines 2640-3006 of readable/assets/fxHooks-Cvx_8YWC.pretty.js (statement-aligned).
var yn = class {
    el;
    badgeBox = k(`span`, `xp-meter-badge`);
    fill = k(`i`, ``);
    txt = k(`span`, `xp-txt`);
    xp = 0;
    run = 0;
    constructor(e) {
      this.el = k(`div`, `level-row xp-meter`);
      let t = k(`div`, `xp-bar`);
      (t.append(this.fill, this.txt),
        this.el.append(this.badgeBox, t),
        this.set(e));
    }
    get shown() {
      return this.xp;
    }
    set(e) {
      (this.run++, this.show(e));
    }
    show(e) {
      this.xp = e;
      let { level: t, into: n, span: r } = A(e);
      (this.badgeBox.dataset.level !== String(t) &&
        ((this.badgeBox.dataset.level = String(t)),
        this.badgeBox.replaceChildren(_n(t))),
        (this.fill.style.width = `${(n / r) * 100}%`),
        (this.txt.textContent = `${(r - n).toLocaleString()} XP to LV ${t + 1}`));
    }
    animateTo(e, t = () => !1, n) {
      let r = this.xp;
      if (e <= r) return (this.set(e), Promise.resolve());
      let i = ++this.run,
        a = A(r).level,
        o = Math.min(1400, 450 + (e - r) / 4),
        s = performance.now();
      return new Promise((c) => {
        let l = (u) => {
          if (i !== this.run) {
            c();
            return;
          }
          let d = t() || me() ? 1 : Math.min(1, (u - s) / o),
            f = Math.round(r + (e - r) * (1 - (1 - d) ** 3)),
            p = A(f);
          if ((this.show(f), p.level > a)) {
            for (; a < p.level;) n?.(++a);
            (ye(this.badgeBox, `lvl-go`), N.ui(`letter`));
          } else d < 1 && N.ui(`tick`, p.into / p.span);
          d < 1 ? requestAnimationFrame(l) : c();
        };
        requestAnimationFrame(l);
      });
    }
  },
  bn = class {
    el;
    badge;
    fill;
    gain;
    pts;
    ptsN;
    off;
    sum = 0;
    sumUntil = 0;
    burst = null;
    lastFree = -1;
    flying = 0;
    constructor(e, t) {
      ((this.el = k(`div`, `lv-chip off`)),
        (this.badge = k(`div`, `lv-chip-badge`)));
      let n = k(`div`, `xp-bar`);
      ((this.fill = k(`i`, ``)),
        n.append(this.fill),
        (this.gain = k(`span`, `xp-gain`)),
        (this.pts = k(`button`, `lv-pts`)),
        (this.pts.type = `button`),
        (this.pts.hidden = !0),
        this.pts.addEventListener(`click`, t),
        (this.ptsN = k(`span`, ``)),
        this.pts.append(be(`star`), this.ptsN),
        this.el.append(this.badge, n, this.pts, this.gain),
        e.prepend(this.el),
        (this.off = ge((e, t) => this.render(t))),
        this.render([]));
    }
    paint() {
      let e = _e.profile;
      if (!e || this.burst) return;
      let { level: t, into: n, span: r } = A(e.xp);
      (this.badge.dataset.level !== String(t) &&
        ((this.badge.dataset.level = String(t)),
        this.badge.replaceChildren(_n(t))),
        (this.fill.style.width = `${Math.round((n / r) * 100)}%`));
    }
    levelUp() {
      (this.burst && clearTimeout(this.burst),
        (this.fill.style.width = `100%`),
        (this.burst = setTimeout(() => {
          ((this.burst = null),
            (this.fill.style.transition = `none`),
            (this.fill.style.width = `0%`),
            this.fill.offsetWidth,
            (this.fill.style.transition = ``),
            this.paint(),
            ye(this.el, `lvl-burst`),
            ye(this.badge, `lvl-go`));
        }, 450)));
    }
    showPoints(e) {
      ((this.pts.hidden = e <= 0),
        (this.ptsN.textContent = String(e)),
        this.pts.setAttribute(
          `aria-label`,
          `${e} stat point${e === 1 ? `` : `s`} to spend`,
        ));
    }
    flyPoint() {
      (this.flying++, (this.pts.hidden = !1));
      let e = Ce(2600),
        t = new DOMRect(innerWidth / 2 - 30, innerHeight * 0.3 - 30, 60, 60);
      e.wait(450)
        .then(() => e.fly(t, this.pts, `star`, 0, 650))
        .then(() => {
          (this.flying--,
            this.showPoints(this.lastFree),
            ye(this.pts, `pop`),
            N.ui(`star`));
        });
    }
    render(e) {
      let t = _e.profile;
      if ((this.el.classList.toggle(`off`, !t), !t)) return;
      let { level: n, into: r, span: i } = A(t.xp);
      (e.some((e) => e.kind === `levelUp`) && this.badge.dataset.level && !me()
        ? this.levelUp()
        : this.paint(),
        (this.el.title = `${(i - r).toLocaleString()} XP to LV ${n + 1}`));
      let a = ve(t).free,
        o =
          this.lastFree >= 0 &&
          a > this.lastFree &&
          e.some((e) => e.kind === `goal`);
      ((this.lastFree = a),
        o ? this.flyPoint() : this.flying || this.showPoints(a));
      let s = e.reduce((e, t) => e + (t.kind === `xp` ? t.gained : 0), 0);
      if (s) {
        let e = performance.now();
        ((this.sum = e < this.sumUntil ? this.sum + s : s),
          (this.sumUntil = e + 1200),
          (this.gain.textContent = `+${this.sum.toLocaleString()} XP`),
          this.gain.classList.remove(`on`),
          this.gain.offsetWidth,
          this.gain.classList.add(`on`));
      }
    }
    dispose() {
      (this.off(), this.burst && clearTimeout(this.burst), this.el.remove());
    }
  },
  xn = class {
    root;
    toasts;
    queue = [];
    busyUntil = 0;
    holdUntil = 0;
    hideLive = null;
    constructor(e) {
      ((this.root = k(`div`, `announcer`)),
        (this.toasts = k(`div`, `toasts`)),
        e.append(this.root, this.toasts));
      let t = document.querySelector(`#boot:not(.fade):not(.gone)`);
      if (t) {
        let e = this.setbackEl(`BAILED!`, `Lost balance!`, 1e3);
        this.root.append(e);
        let n = setTimeout(() => e.classList.add(`out`), 700),
          r = new MutationObserver(() => i()),
          i = () => {
            (clearTimeout(n), e.remove(), r.disconnect());
          };
        (r.observe(t, { attributes: !0, attributeFilter: [`class`] }),
          setTimeout(i, 1200));
      }
    }
    big(e, t = `gold`, n, r = 1100, i = !1, a) {
      this.push({
        text: e,
        sub: n,
        tone: t,
        ms: r,
        hold: i,
        at: performance.now(),
        icon: a,
      });
    }
    landing(e, t, n, r, i) {
      this.push({
        text: e,
        sub: n,
        tone: t,
        ms: r,
        hold: !1,
        at: performance.now(),
        fly: i,
      });
    }
    setback(e, t, n, r, i) {
      this.push({
        text: e,
        tone: `white`,
        ms: r,
        hold: !1,
        at: performance.now(),
        render: () => this.setbackEl(e, t, n),
        onShow: i && (() => i(!0)),
        onHide: i && (() => i(!1)),
      });
    }
    setbackEl(e, t, n) {
      let r = k(`div`, `shout setback`),
        i = k(`div`, `setback-word`);
      i.append(k(`div`, `setback-text`, e));
      for (let e of [`l`, `r`])
        for (let t of [`p1`, `p2`, `p3`]) i.append(k(`i`, `puff ${e} ${t}`));
      let a = k(`div`, `setback-sub`);
      return (
        t && a.append(k(`span`, ``, t)),
        n > 0 && a.append(k(`span`, `lost`, `-${n.toLocaleString()}`)),
        r.append(i, a),
        r
      );
    }
    level(e, t, n) {
      this.push({
        text: `LEVEL ${e}!`,
        tone: `gold`,
        ms: 3e3,
        hold: !0,
        at: performance.now(),
        render: () => {
          let n = k(`div`, `shout shout-level`),
            r = k(`div`, `lvl-shield`);
          r.append(_n(Math.max(1, e - 1)));
          let i = k(`div`, `lvl-perks`);
          return (
            t.forEach((e, t) => {
              let n = k(`span`, `lvl-perk`, e.toUpperCase());
              (n.style.setProperty(`--i`, String(t)), i.append(n));
            }),
            n.append(
              k(`div`, `rays`),
              k(`div`, `lvl-kicker ribbon`, `LEVEL UP!`),
              r,
              i,
            ),
            setTimeout(() => {
              (r.replaceChildren(_n(e)), r.classList.add(`turned`, `lvl-go`));
            }, 380),
            n
          );
        },
        onShow: n,
      });
    }
    push(e) {
      for (this.queue.push(e); this.queue.length > 3;) {
        let e = this.queue.findIndex((e) => !e.hold);
        this.queue.splice(e < 0 ? 0 : e, 1);
      }
    }
    busy() {
      return (
        performance.now() < this.holdUntil || this.queue.some((e) => e.hold)
      );
    }
    toast(e, t = `white`, n = 3200, r) {
      let i = k(`div`, `toast tone-${t}`, e);
      for (
        r && i.prepend(typeof r == `string` ? be(r, `lead`) : r),
          this.toasts.append(i),
          setTimeout(() => i.classList.add(`out`), n),
          setTimeout(() => i.remove(), n + 400);
        this.toasts.children.length > 4;
      )
        this.toasts.firstElementChild?.remove();
    }
    update(e) {
      if (
        e < this.busyUntil ||
        ((this.queue = this.queue.filter((t) => t.hold || e - t.at < 1200)),
        !this.queue.length)
      )
        return;
      let t = this.queue.shift();
      ((this.busyUntil =
        e + (t.hold ? t.ms : t.fly ? 650 : Math.min(450, t.ms * 0.4))),
        t.hold && (this.holdUntil = e + t.ms + 450));
      for (let e of this.root.querySelectorAll(`.shout:not(.out)`))
        e.classList.add(`out`);
      this.hideLive?.();
      let n;
      if (t.render) n = t.render();
      else if (
        ((n = k(`div`, `shout tone-${t.tone}`)),
        n.append(k(`div`, `shout-text`, t.text)),
        t.sub)
      ) {
        let e = k(`div`, `shout-sub`, t.sub);
        (t.icon && e.prepend(be(t.icon, `lead`)), n.append(e));
      }
      (this.root.append(n), t.onShow?.());
      let r = t.onHide,
        i = (this.hideLive = () => {
          (r?.(), (r = void 0));
        });
      if (t.fly) {
        let e = t.fly;
        setTimeout(() => this.flyOff(n, e), 380);
      }
      (setTimeout(() => {
        (n.classList.add(`out`), i());
      }, t.ms),
        setTimeout(() => n.remove(), t.ms + 450));
    }
    flyOff(e, t) {
      let n = e.querySelector(`.shout-text`),
        r = t.to();
      if (!n || !r || !e.isConnected || me()) {
        t.land();
        return;
      }
      let i = n.getBoundingClientRect(),
        a = r.getBoundingClientRect(),
        o = i.left + i.width / 2,
        s = i.top + i.height / 2,
        c = a.left + a.width / 2 - o,
        l = a.top + a.height / 2 - s,
        u = k(`div`, `shout-fly`, n.textContent ?? ``);
      ((u.style.cssText = `left:${o}px;top:${s}px;color:${getComputedStyle(n).color}`),
        this.root.after(u),
        (n.style.visibility = `hidden`));
      let d = () => {
        (u.remove(), t.land());
      };
      u.animate(
        [
          { transform: `translate(-50%, -50%) rotate(-4deg)` },
          {
            transform: `translate(calc(-50% + ${c * 0.2}px), calc(-50% + ${l * 0.1 - 40}px)) rotate(-4deg) scale(.85)`,
            offset: 0.3,
          },
          {
            transform: `translate(calc(-50% + ${c}px), calc(-50% + ${l}px)) scale(.35)`,
            opacity: 0.85,
          },
        ],
        {
          duration: 560,
          easing: `cubic-bezier(.55, 0, .75, .35)`,
          fill: `forwards`,
        },
      ).finished.then(d, d);
    }
    dispose() {
      (this.hideLive?.(), this.root.remove(), this.toasts.remove());
    }
  };
