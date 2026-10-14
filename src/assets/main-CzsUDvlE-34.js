// assets/main-CzsUDvlE 34 — math
// Lines 11406-11750 of readable/assets/main-CzsUDvlE.pretty.js (statement-aligned).
var If = (e, t, n) =>
    e[0] < t[2] + n && t[0] < e[2] + n && e[1] < t[3] + n && t[1] < e[3] + n,
  EdgeMarkers = class {
    root;
    badges = new Map();
    hud = [];
    rem = 10;
    measureAt = 0;
    seen = new Set();
    spots = [];
    pool = [];
    constructor(e) {
      ((this.root = j(`div`, `edge-markers`)), e.append(this.root));
    }
    measure(e = performance.now()) {
      if (e < this.measureAt) return;
      this.measureAt = e + 500;
      let t =
        parseFloat(getComputedStyle(document.documentElement).fontSize) || 10;
      if (t !== this.rem) for (let e of this.badges.values()) e.text = `\0`;
      ((this.rem = t), (this.hud = Ff()));
    }
    update(e, t) {
      let n = window.innerWidth,
        r = window.innerHeight;
      this.measureAt || this.measure();
      let i = this.rem,
        a = kf * i,
        o = n / 2,
        s = r / 2,
        c = o - a,
        l = s - a,
        u = this.seen,
        d = this.spots;
      u.clear();
      for (let e of d) this.pool.push(e);
      d.length = 0;
      for (let n of t) {
        u.add(n.key);
        let t = this.badge(n);
        Ef.set(n.x, n.y, n.z).project(e);
        let r = Ef.z > 1,
          i = Ef.x,
          a = Ef.y;
        r && ((i = -i), (a = -a));
        let f = !r && i > -0.92 && i < 0.92 && a > -0.9 && a < 0.9;
        if (
          (f !== t.hidden &&
            ((t.hidden = f), t.el.classList.toggle(`hidden`, f)),
          f)
        )
          continue;
        let p = i * o,
          m = -a * s,
          h = Math.hypot(p, m) || 1,
          g = 1 / Math.max(Math.abs(p) / c, Math.abs(m) / l, 1e-6),
          _ = this.pool.pop() ?? {
            b: t,
            x: 0,
            y: 0,
            dx: 0,
            dy: 0,
            lx: 0,
            ly: 0,
          };
        ((_.b = t),
          (_.x = o + p * g),
          (_.y = s + m * g),
          (_.dx = p / h),
          (_.dy = m / h),
          (_.lx = 0),
          (_.ly = 0),
          d.push(_));
      }
      let f = 4 * (c + l),
        p = (e, t) =>
          t <= s - l + 0.5
            ? e - (o - c)
            : e >= o + c - 0.5
              ? 2 * c + t - (s - l)
              : t >= s + l - 0.5
                ? 2 * c + 2 * l + (o + c - e)
                : 4 * c + 2 * l + (s + l - t),
        m = (e, t) => {
          ((t = ((t % f) + f) % f),
            t < 2 * c
              ? ((e.x = o - c + t), (e.y = s - l))
              : t < 2 * c + 2 * l
                ? ((e.x = o + c), (e.y = s - l + t - 2 * c))
                : t < 4 * c + 2 * l
                  ? ((e.x = o + c - (t - 2 * c - 2 * l)), (e.y = s + l))
                  : ((e.x = o - c), (e.y = s + l - (t - 4 * c - 2 * l))));
          let { b: a } = e,
            u = Mf * i,
            d =
              Af * i +
              jf * i +
              (Math.abs(e.dx) * a.pw + Math.abs(e.dy) * a.ph) / 2;
          ((e.lx = Math.min(
            n - u - a.pw / 2,
            Math.max(u + a.pw / 2, e.x - e.dx * d),
          )),
            (e.ly = Math.min(
              r - u - a.ph / 2,
              Math.max(u + a.ph / 2, e.y - e.dy * d),
            )));
        },
        h = (e) => {
          let t = Af * i,
            n = [[e.x - t, e.y - t, e.x + t, e.y + t]];
          return (
            e.b.text &&
              n.push([
                e.lx - e.b.pw / 2,
                e.ly - e.b.ph / 2,
                e.lx + e.b.pw / 2,
                e.ly + e.b.ph / 2,
              ]),
            n
          );
        },
        g = [],
        _ = Nf * i,
        v = Pf * i;
      for (let e of d) {
        let t = p(e.x, e.y),
          n = null;
        for (let r = 0; !n && r * _ < f / 2; r++)
          for (let i of r ? [t + r * _, t - r * _] : [t]) {
            m(e, i);
            let t = h(e);
            if (
              !t.some(
                (e) =>
                  this.hud.some((t) => If(e, t, v)) ||
                  g.some((t) => If(e, t, v)),
              )
            ) {
              n = t;
              break;
            }
          }
        ((n ||= (m(e, t), h(e))), g.push(...n));
      }
      for (let e of d) {
        let t = e.b,
          n = Math.round(e.x),
          r = Math.round(e.y),
          i = Math.round(Math.atan2(e.dx, -e.dy) * 100),
          a = `${n},${r},${i}`;
        if (
          (a !== t.css &&
            ((t.css = a),
            (t.el.style.transform = `translate(${n}px, ${r}px)`),
            t.el.style.setProperty(`--ang`, `${i / 100}rad`)),
          !t.text)
        )
          continue;
        let o = Math.round(e.lx - e.x),
          s = Math.round(e.ly - e.y),
          c = `${o},${s}`;
        c !== t.pillCss &&
          ((t.pillCss = c),
          (t.pill.style.transform = `translate(${o}px, ${s}px) translate(-50%, -50%)`));
      }
      for (let [e, t] of this.badges)
        u.has(e) || (t.el.remove(), this.badges.delete(e));
    }
    badge(e) {
      let t = this.badges.get(e.key);
      if (!t) {
        let n = j(`div`, `edge-marker`),
          r = j(`div`, `em-head`),
          i = j(`div`, `em-nub`),
          a = j(`div`, `em-pill`),
          o = e.sticker ? B(e.sticker, `em-glyph`) : j(`span`, `em-glyph`);
        ((i.innerHTML = Of),
          r.append(i, o),
          n.append(r, a),
          this.root.append(n),
          (t = {
            el: n,
            glyph: o,
            pill: a,
            text: `\0`,
            pw: 0,
            ph: 0,
            glyphText: ``,
            color: ``,
            hot: !1,
            hidden: !1,
            css: ``,
            pillCss: ``,
          }),
          this.badges.set(e.key, t));
      }
      let n = !e.sticker && e.label.length <= 2,
        r = e.sticker ? `` : n ? e.label : e.label.charAt(0).toUpperCase();
      r !== t.glyphText &&
        ((t.glyphText = r), e.sticker || (t.glyph.textContent = r));
      let i = !!e.hot;
      (i !== t.hot && ((t.hot = i), t.el.classList.toggle(`hot`, i)),
        e.color !== t.color &&
          ((t.color = e.color), t.el.style.setProperty(`--mc`, e.color)));
      let a = n || e.label === e.sticker ? `` : e.label;
      return (
        a !== t.text &&
          ((t.text = a),
          (t.pill.textContent = a),
          (t.pill.hidden = !a),
          (t.pw = t.pill.offsetWidth),
          (t.ph = t.pill.offsetHeight)),
        t
      );
    }
    dispose() {
      this.root.remove();
    }
  },
  Rf = 2e3,
  PingPill = class {
    el = j(`div`, `ping-pill`);
    room;
    timer;
    ms = -1;
    constructor(e) {
      ((this.room = e),
        (this.el.hidden = !0),
        this.el.setAttribute(`aria-label`, `Ping`),
        (this.timer = setInterval(() => this.refresh(), Rf)),
        this.refresh());
    }
    refresh() {
      ((this.el.hidden = !J.ping || this.ms < 0),
        J.ping && this.room.ping((e) => this.show(e)));
    }
    show(e) {
      ((this.ms = e),
        (this.el.hidden = !J.ping),
        (this.el.textContent = `${e} ms`),
        (this.el.dataset.q = e < 80 ? `good` : e < 160 ? `ok` : `bad`));
    }
    dispose() {
      (clearInterval(this.timer), this.el.remove());
    }
  },
  Bf = 4096,
  Vf = 500,
  PerfMeter = class {
    el = j(`div`, `perf-meter`);
    forced = new URLSearchParams(location.search).has(`perf`);
    dt = new Float32Array(Bf);
    cpu = new Float32Array(Bf);
    calls = new Uint32Array(Bf);
    tris = new Uint32Array(Bf);
    n = 0;
    lastAt = 0;
    winStart = 0;
    winFrames = 0;
    winWorst = 0;
    winCpu = 0;
    shownAt = 0;
    tierName;
    snapshot = {
      fps: 0,
      worstMs: 0,
      cpuMs: 0,
      calls: 0,
      tris: 0,
      tier: ``,
      ratio: 1,
      w: 0,
      h: 0,
    };
    constructor(e) {
      ((this.tierName = e),
        this.el.setAttribute(`aria-hidden`, `true`),
        this.refresh(),
        document.body.append(this.el));
    }
    refresh() {
      this.el.hidden = !(J.showFps || this.forced);
    }
    frame(e, t, n) {
      let r = n.info.render,
        i = this.lastAt ? e - this.lastAt : 0;
      if (
        ((this.lastAt = e),
        ar(i, t),
        this.n < Bf &&
          ((this.dt[this.n] = i),
          (this.cpu[this.n] = t),
          (this.calls[this.n] = r.calls),
          (this.tris[this.n] = r.triangles),
          this.n++),
        (this.winStart ||= e),
        this.winFrames++,
        (this.winWorst = Math.max(this.winWorst, i)),
        (this.winCpu += t),
        e - this.winStart < 1e3)
      )
        return;
      let a = this.snapshot,
        o = n.getDrawingBufferSize(Uf);
      ((a.fps = Math.round((this.winFrames * 1e3) / (e - this.winStart))),
        (a.worstMs = this.winWorst),
        (a.cpuMs = this.winCpu / this.winFrames),
        (a.calls = r.calls),
        (a.tris = r.triangles),
        (a.tier = this.tierName()),
        (a.ratio = n.getPixelRatio()),
        (a.w = o.x),
        (a.h = o.y),
        cr(`${a.tier} ${a.ratio.toFixed(2)}`),
        (this.winStart = e),
        (this.winFrames = 0),
        (this.winWorst = 0),
        (this.winCpu = 0),
        !(this.el.hidden || e - this.shownAt < Vf) &&
          ((this.shownAt = e),
          (this.el.textContent = `${a.fps} fps · worst ${a.worstMs.toFixed(0)} ms · cpu ${a.cpuMs.toFixed(1)} ms · ${a.calls} draws · ${(a.tris / 1e3).toFixed(0)}k tris · ${a.tier} ${a.ratio.toFixed(2)}× ${a.w}×${a.h}`)));
    }
    drain() {
      let e = this.n;
      return (
        (this.n = 0),
        {
          dt: [...this.dt.subarray(0, e)],
          cpu: [...this.cpu.subarray(0, e)],
          calls: [...this.calls.subarray(0, e)],
          tris: [...this.tris.subarray(0, e)],
        }
      );
    }
  },
  Uf = new te(),
  Wf = [`low`, `med`, `high`].find(
    (e) => e === new URLSearchParams(location.search).get(`quality`),
  );
function Gf() {
  return Wf ?? J.quality;
}
var qualityTiers = [`low`, `med`, `high`],
  qf = `freeskater-quality-settled`,
  Jf = 6048e5;
