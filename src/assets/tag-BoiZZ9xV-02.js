// assets/tag-BoiZZ9xV 02 — math
// Lines 83-397 of readable/assets/tag-BoiZZ9xV.pretty.js (statement-aligned).
var F = Math.PI * 2,
  TagEditor = class {
    el;
    canvas;
    ctx;
    p;
    can;
    mist;
    sfx;
    ro;
    W = 0;
    H = 0;
    name = ``;
    letters = [];
    painted = 0;
    queued = 0;
    outlined = 0;
    tag = ``;
    gen = 0;
    queue = Promise.resolve();
    dripRaf = 0;
    dripAt = 0;
    homeT = 0;
    sizeRaf = 0;
    constructor(e, t) {
      ((this.el = e),
        (this.sfx = t.sfx ?? (() => {})),
        (this.canvas = n(`canvas`, `tg-canvas`)),
        (this.ctx = this.canvas.getContext(`2d`)));
      let r = document
        .createElement(`canvas`)
        .getContext(`2d`, { willReadFrequently: !0 });
      ((this.p = {
        ctx: this.ctx,
        octx: r,
        font: t.font,
        size: 150,
        color: `#FF3D7F`,
      }),
        (this.can = n(`div`, `tg-can`)),
        this.can.append(E(`spray`)),
        (this.mist = n(`div`, `tg-mist`)),
        e.append(this.canvas, this.mist, this.can),
        (this.ro = new ResizeObserver(() => {
          (cancelAnimationFrame(this.sizeRaf),
            (this.sizeRaf = requestAnimationFrame(() => this.resize())));
        })),
        this.ro.observe(e),
        this.resize());
    }
    setName(e, t = !1) {
      let n = this.name;
      if (((this.name = e), !this.W)) return;
      let r = 0;
      for (; r < n.length && r < e.length && n[r] === e[r];) r++;
      let i = this.fit(e);
      if (t || i !== this.p.size || r < n.length || this.tag) {
        (this.gen++, (this.tag = ``), (this.outlined = 0));
        let n = !t && i === this.p.size ? this.letters.slice(0, r) : [];
        ((this.p.size = i),
          (this.letters = this.layout(e, n)),
          (this.painted = t ? e.length : Math.min(this.painted, r)));
        for (let e of this.letters.slice(0, this.painted))
          e.pts || s(this.p, e, !0);
        ((this.queued = this.painted),
          (this.queue = Promise.resolve()),
          this.scale(),
          this.repaint());
      } else this.letters = this.layout(e, this.letters.slice(0, r));
      let a = this.gen;
      for (let e = this.queued; e < this.letters.length; e++) {
        let t = this.letters[e];
        this.queue = this.queue.then(() => this.spray(t, a));
      }
      ((this.queued = this.letters.length),
        this.queue.then(() => {
          a === this.gen && this.canHome();
        }));
    }
    setColor(e) {
      ((this.p.color = e),
        this.mist.style.setProperty(`--mist`, e),
        this.repaint());
    }
    idle() {
      return this.queue;
    }
    async burner(e) {
      await this.queue;
      let n = this.gen;
      this.tag = e;
      for (let e = 1; e <= this.painted; e++) {
        if (n !== this.gen) return;
        ((this.outlined = e), this.repaint());
        let r = this.letters[e - 1];
        r.pts?.length &&
          !t() &&
          (this.moveCan(r),
          this.sfx(`spray`, 0.1),
          await new Promise((e) => setTimeout(e, 55)));
      }
      this.canHome();
    }
    unburn() {
      ((this.tag = ``), (this.outlined = 0), this.repaint());
    }
    spots(e) {
      let t = this.letters.filter((e) => e.pts?.length);
      return t.length
        ? Array.from({ length: e }, (n, r) => {
            let i = t[Math.floor(((r + 0.5) * t.length) / e)];
            return { x: i.x + i.w * 0.3, y: i.y - this.p.size * 0.85 };
          })
        : [];
    }
    centre() {
      let e = this.el.getBoundingClientRect(),
        t = this.letters.at(-1),
        n = t ? t.x + t.adv : this.W / 2,
        r = this.letters[0]?.x ?? this.W / 2,
        i = this.W ? e.width / this.W : 1;
      return {
        x: e.left + ((r + n) / 2) * i,
        y: e.top + (this.base() - this.p.size * 0.45) * i,
      };
    }
    dispose() {
      (this.gen++,
        cancelAnimationFrame(this.dripRaf),
        cancelAnimationFrame(this.sizeRaf),
        clearTimeout(this.homeT),
        this.ro.disconnect());
    }
    resize() {
      let e = this.el.clientWidth,
        t = this.el.clientHeight;
      if (!e || !t || (e === this.W && t === this.H)) return;
      ((this.W = e), (this.H = t));
      let n = Math.min(2, window.devicePixelRatio || 1);
      ((this.canvas.width = Math.round(e * n)),
        (this.canvas.height = Math.round(t * n)),
        this.ctx.setTransform(n, 0, 0, n, 0, 0),
        this.relayout());
    }
    relayout() {
      if (!this.W) return;
      let e = this.tag;
      (this.gen++,
        (this.p.size = this.fit(this.name)),
        (this.letters = this.layout(this.name, [])),
        (this.painted = this.queued = this.letters.length));
      for (let e of this.letters) s(this.p, e, !0);
      ((this.tag = e),
        (this.outlined = e ? this.painted : 0),
        (this.queue = Promise.resolve()),
        this.scale(),
        this.repaint(),
        this.canHome(0));
    }
    base() {
      return this.H * 0.6;
    }
    fit(e) {
      let t = Math.min(
        this.W * (this.W < this.H * 2 ? 0.22 : 0.16),
        this.H * 0.46,
      );
      this.ctx.font = b(this.p, t);
      let n = this.ctx.measureText(e).width * 0.93,
        r = this.W * 0.9;
      return Math.max(12, Math.floor(n > r ? (t * r) / n : t));
    }
    layout(e, t) {
      return C(this.p, e, this.W * 0.04, this.base(), t);
    }
    scale() {
      ((this.can.style.fontSize = `${this.p.size * 0.62}px`),
        this.mist.style.setProperty(`--d`, `${this.p.size * 0.95}px`));
    }
    crew(e) {
      let t = this.ctx;
      (t.save(),
        (t.globalAlpha = 1),
        (t.font = b(this.p, Math.round(this.p.size * 0.32))),
        (t.fillStyle = w),
        t.translate(e.x + e.adv * 0.4, e.y + this.p.size * 0.42),
        t.rotate(-0.1),
        t.fillText(this.tag, 0, 0),
        t.restore());
    }
    repaint() {
      if (!this.W) return;
      this.ctx.clearRect(0, 0, this.W, this.H);
      let e = this.letters.slice(0, this.painted);
      if (this.tag) for (let t of e.slice(0, this.outlined)) x(this.p, t);
      for (let t of e) u(this.p, t);
      this.tag &&
        this.outlined >= this.painted &&
        e.length &&
        (S(this.p, e[0]), this.crew(e[e.length - 1]));
    }
    spray(e, n) {
      return new Promise((r) => {
        if (n !== this.gen) {
          r();
          return;
        }
        let i = T(this.p, e),
          a = i.length / 2,
          l = this.p.size / 150;
        if (!a) {
          (this.painted++, r());
          return;
        }
        let u = t();
        u || (this.moveCan(e), this.sfx(`spray`, 0.24));
        let d = performance.now(),
          f = u ? 0 : 230,
          m = (t) => {
            if (n !== this.gen) {
              r();
              return;
            }
            let g = f ? Math.min(1, (t - d) / f) : 1,
              _ = Math.ceil(a * 0.07);
            if (((this.ctx.fillStyle = this.p.color), f)) {
              for (let e = 0; e < _; e++) {
                let e = ((Math.random() * a) | 0) * 2;
                p(
                  this.ctx,
                  i[e] + (Math.random() * 2 - 1) * 1.6 * l,
                  i[e + 1] + (Math.random() * 2 - 1) * 1.6 * l,
                  (1.2 + Math.random() * 2.2) * l,
                  0.8,
                );
              }
              for (let e = 0; e < _ * 0.15; e++) {
                let e = ((Math.random() * a) | 0) * 2,
                  t = Math.random() * F,
                  n = (5 + Math.random() * 16) * l;
                p(
                  this.ctx,
                  i[e] + Math.cos(t) * n,
                  i[e + 1] + Math.sin(t) * n,
                  (0.7 + Math.random() * 1.5) * l,
                  0.22,
                );
              }
              this.ctx.globalAlpha = 1;
            }
            if (g < 1) {
              requestAnimationFrame(m);
              return;
            }
            if (
              (f || h(this.p, e),
              c(this.p, e),
              s(this.p, e, u),
              this.painted++,
              u)
            )
              for (let t of e.drips) (o(this.p, t, 0, t.len), y(this.p, t));
            else this.startDrips();
            r();
          };
        f ? requestAnimationFrame(m) : m(d);
      });
    }
    startDrips() {
      this.dripRaf ||=
        ((this.dripAt = performance.now()),
        requestAnimationFrame(this.dripTick));
    }
    dripTick = (e) => {
      let t = Math.min(0.05, (e - this.dripAt) / 1e3);
      this.dripAt = e;
      let n = !1;
      for (let e of this.letters.slice(0, this.painted))
        for (let r of e.drips) {
          if (r.done) continue;
          let e = Math.min(r.max - r.len, r.v * t);
          (o(this.p, r, r.len, r.len + e),
            (r.len += e),
            (r.v *= 0.3 ** t),
            r.len >= r.max - 0.01 || r.v < 5
              ? ((r.done = !0), (r.max = r.len), y(this.p, r))
              : (n = !0));
        }
      this.dripRaf = n ? requestAnimationFrame(this.dripTick) : 0;
    };
    moveCan(e) {
      (clearTimeout(this.homeT),
        this.can.classList.add(`spraying`),
        (this.can.style.translate = `${e.x + e.w * 0.55}px ${e.y - this.p.size * 1.22}px`),
        (this.mist.style.translate = `${e.x + e.w * 0.45}px ${e.y - this.p.size * 0.42}px`),
        this.mist.animate(
          [
            { opacity: 0, scale: 0.6 },
            { opacity: 0.95, scale: 1 },
            { opacity: 0, scale: 1.25 },
          ],
          { duration: 360 },
        ));
    }
    canHome(e = 420) {
      (clearTimeout(this.homeT),
        (this.homeT = window.setTimeout(() => {
          (this.can.classList.remove(`spraying`),
            (this.can.style.translate = `${this.W * 0.9}px ${this.H * 0.18}px`));
        }, e)));
    }
  },
  I = (e, t) => j.ui(e, t),
  L = `YOUR NAME`,
  R = `Retag with an ad · coming soon`;
