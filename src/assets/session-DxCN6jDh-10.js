// assets/session-DxCN6jDh 10 — count
// Lines 2853-3420 of readable/assets/session-DxCN6jDh.pretty.js (statement-aligned).
var Q = { NONE: 0, CLEAN: 1, LET_GO: 2, BAIL: 3 },
  Ki = 0.5,
  qi = 45,
  Ji = 11,
  Yi = N.GRAB | N.SPIN_L | N.SPIN_R,
  Xi = 0.6,
  Zi = 3,
  Qi = class {
    out = {
      call: Q.NONE,
      why: 0,
      ticks: 0,
      x: 0,
      y: 0,
      z: 0,
      nx: 0,
      ny: 1,
      nz: 0,
      tx: 0,
      ty: 0,
      tz: 0,
      fx: 0,
      fy: 0,
      fz: 1,
      stake: !1,
      air: -1,
    };
    sim = Ut();
    start = new Float64Array(Z);
    ev = new Kt();
    inp = { dir: 0, held: 0, pressed: 0, released: 0, pressDir: 0, tapDir: 0 };
    f = { x: 0, y: 0, z: 0 };
    line = new Float64Array(qi * Z);
    step = new Float64Array(Z);
    lineLen = 0;
    lineTick = 0;
    lineHeld = 0;
    lineDir = 0;
    lineWorld = null;
    lineStats = null;
    lineCall = Q.NONE;
    lineTicks = 0;
    run(e, t, n, r, i) {
      let a = this.out;
      if (((a.call = Q.NONE), e.mode !== A.AIR || e.vy > Ki)) return a;
      ((a.air = e.modeTick),
        (a.stake =
          e.comboTricks !== e.airFirst ||
          Math.abs(e.yaw - e.airYaw0) > Xi ||
          Math.abs(e.spinVel) > Zi),
        Ri(e, this.start));
      let o = this.along(t, n, r, i);
      return (
        o > 0
          ? ((a.call = this.lineCall), (a.ticks = this.lineTicks - o))
          : (a.call = this.probe(t, n, r, i, !0)),
        a.call === Q.BAIL &&
          (t & Yi || F[n] !== 0) &&
          this.probe(t & ~Yi, 0, r, i, !1) === Q.CLEAN &&
          (a.call = Q.LET_GO),
        a
      );
    }
    along(e, t, n, r) {
      if (
        !this.lineLen ||
        e !== this.lineHeld ||
        t !== this.lineDir ||
        n !== this.lineWorld ||
        r !== this.lineStats
      )
        return 0;
      let i = this.start,
        a = i[Ji] - this.lineTick;
      if (!(a >= 1 && a <= this.lineLen)) return 0;
      let o = (a - 1) * Z;
      for (let e = 0; e < Z; e++) if (this.line[o + e] !== i[e]) return 0;
      return a;
    }
    probe(e, t, n, r, i) {
      let a = zi(this.start, this.sim),
        o = this.ev,
        s = this.inp,
        c = this.f;
      ((s.held = e),
        (s.dir = t),
        i &&
          ((this.lineLen = 0),
          (this.lineTick = this.start[Ji]),
          (this.lineHeld = e),
          (this.lineDir = t),
          (this.lineWorld = n),
          (this.lineStats = r)));
      for (let e = 1; e <= qi; e++) {
        (M(a.yaw, a.ux, a.uy, a.uz, c),
          o.reset(),
          Ln(a, s, n, r, 2, Se / 2, o));
        let t =
          o.flags & P.RESPAWN
            ? Q.NONE
            : a.mode === A.AIR
              ? -1
              : o.flags & P.BAIL
                ? Q.BAIL
                : o.flags & P.LAND
                  ? Q.CLEAN
                  : Q.NONE;
        if (t < 0) {
          i && this.line.set(Ri(a, this.step), (e - 1) * Z);
          continue;
        }
        return (
          i &&
            ((this.lineLen = e - 1),
            (this.lineCall = t),
            (this.lineTicks = e),
            t !== Q.NONE && this.fill(a, c, e, o.bailWhy)),
          t
        );
      }
      return (i && (this.lineLen = 0), Q.NONE);
    }
    fill(e, t, n, r) {
      let i = this.out,
        a = e.ux,
        o = e.uy,
        s = e.uz;
      ((i.ticks = n),
        (i.why = r),
        (i.x = e.x),
        (i.y = e.y),
        (i.z = e.z),
        (i.nx = a),
        (i.ny = o),
        (i.nz = s));
      let c = e.vx * a + e.vy * o + e.vz * s,
        l = e.vx - c * a,
        u = e.vy - c * o,
        d = e.vz - c * s,
        f = Math.sqrt(l * l + u * u + d * d);
      f > 1
        ? ((i.tx = l / f), (i.ty = u / f), (i.tz = d / f))
        : ((i.tx = 0), (i.ty = 0), (i.tz = 0));
      let p = t.x * a + t.y * o + t.z * s,
        m = t.x - p * a,
        h = t.y - p * o,
        g = t.z - p * s,
        _ = Math.sqrt(m * m + h * h + g * g) || 1;
      ((i.fx = m / _), (i.fy = h / _), (i.fz = g / _));
    }
  },
  PredictReconciler = class {
    recon;
    input;
    combos;
    ev = new Kt();
    staged = {
      dir: 0,
      held: 0,
      pressed: 0,
      released: 0,
      pressDir: 0,
      tapDir: 0,
      stickX: 0,
    };
    lastWarp;
    onEvents = () => {};
    onCombo = () => {};
    onComboRejected = () => {};
    onWarp = () => {};
    self;
    world;
    forecast = new Qi();
    fcKey = { tick: -1, held: -1, dir: -1, y: NaN };
    canSkate;
    constructor(e, t, n, r, i = () => !0) {
      ((this.self = n),
        (this.world = r),
        (this.canSkate = i),
        (this.input = e.input({ mode: `reliable` })),
        (this.combos = t.defineEvent({
          label: `combo`,
          uniqueBy: (e) => e.seq,
          onPredict: (e) => this.onCombo(e),
          onReject: (e) => this.onComboRejected(e),
        })),
        (this.lastWarp = n.warpSeq),
        (this.recon = t.reconciler(n, {
          input: this.input,
          fields: [...rn],
          smoothMs: 60,
          step: (e, t, n) => {
            let r = this.ev;
            if ((r.reset(), !this.canSkate(e.reckonTime))) return;
            let i = t;
            (Ln(
              i,
              n,
              this.world,
              jn(this.self.skater, this.self.boost),
              e.subSteps,
              e.subDt,
              r,
            ),
              r.flags & P.COMBO_LANDED &&
                e.predict(this.combos, {
                  seq: r.comboSeq,
                  score: r.comboScore,
                  tricks: r.comboTricks,
                }),
              e.isReplay || this.onEvents(r, i));
          },
        })));
    }
    step(e) {
      this.self.warpSeq !== this.lastWarp &&
        ((this.lastWarp = this.self.warpSeq),
        this.recon.reset(),
        this.onWarp());
      let t = this.input.data,
        n = this.state,
        r =
          (cn.capturing || document.hidden) && n.mode === A.GROUND && n.rolling;
      for (let n = 0; n < e; n++)
        (cn.consume(this.staged, n === 0),
          (t.dir = r ? k.D : this.staged.dir),
          (t.held = this.staged.held),
          (t.pressed = this.staged.pressed),
          (t.released = this.staged.released),
          (t.pressDir = this.staged.pressDir),
          (t.tapDir = this.staged.tapDir),
          (t.stickX = this.staged.stickX),
          this.input.send());
    }
    setWorld(e) {
      this.world = e;
    }
    get state() {
      return this.recon.state;
    }
    landing() {
      let e = this.state,
        t = this.input.data,
        n = this.fcKey;
      return n.tick === e.simTick &&
        n.held === t.held &&
        n.dir === t.dir &&
        n.y === e.y
        ? this.forecast.out
        : ((n.tick = e.simTick),
          (n.held = t.held),
          (n.dir = t.dir),
          (n.y = e.y),
          this.forecast.run(
            e,
            t.held,
            t.dir,
            this.world,
            jn(this.self.skater, this.self.boost),
          ));
    }
    value(e) {
      return this.recon.value(e);
    }
    dispose() {
      this.recon.dispose();
    }
  },
  simFields = [
    `simTick`,
    `mode`,
    `modeTick`,
    `trickId`,
    `trickTick`,
    `trickEnd`,
    `crouch`,
    `bal`,
    `rail`,
    `vx`,
    `vy`,
    `vz`,
    `yaw`,
    `ux`,
    `uy`,
    `uz`,
    `comboMult`,
    `comboBase`,
    `special`,
    `vert`,
    `xfer`,
    `rolling`,
  ],
  SampleRing = class {
    ring = [];
    head = 0;
    count = 0;
    lastTick = -1;
    sk;
    scratch = Ut();
    constructor(e) {
      this.sk = e;
      for (let e = 0; e < 16; e++) this.ring.push(Ut());
    }
    sample() {
      let e = this.sk.simTick;
      if (e === this.lastTick) return;
      this.lastTick = e;
      let t = this.ring[this.head],
        n = this.sk;
      for (let e of simFields) n[e] !== void 0 && (t[e] = n[e]);
      ((this.head = (this.head + 1) % this.ring.length),
        (this.count = Math.min(this.count + 1, this.ring.length)));
    }
    at(e) {
      this.sample();
      let t = null;
      for (let n = 0; n < this.count; n++) {
        let r =
          this.ring[(this.head - 1 - n + this.ring.length) % this.ring.length];
        if (r.simTick <= e + 0.5) {
          t = r;
          break;
        }
      }
      return (
        (t ||= this.count
          ? this.ring[
              (this.head - this.count + this.ring.length) % this.ring.length
            ]
          : this.scratch),
        t
      );
    }
    dispose() {
      this.ring.length = 0;
    }
  },
  ComboHud = class {
    el;
    combo;
    tricks;
    score;
    special;
    specialFill;
    balance;
    balNeedle;
    lastKey = ``;
    lastTricks = ``;
    lastMult = 0;
    lastD = ``;
    seen = new Float64Array(7).fill(NaN);
    lastSp = -1;
    balOn = !1;
    balTick = 0;
    layout;
    gradeEl;
    gradeUntil = 0;
    gradeBanked = !1;
    count = null;
    constructor(e, t) {
      ((this.layout = t),
        (this.el = $(`div`, `hud`)),
        (this.combo = $(`div`, `combo`)),
        (this.tricks = $(`div`, `combo-tricks`)),
        (this.score = $(`div`, `combo-score`)),
        (this.gradeEl = $(`div`, `combo-grade`)),
        this.combo.append(this.gradeEl, this.tricks, this.score),
        (this.special = $(`div`, `special`)),
        (this.specialFill = $(`div`, `special-fill`)));
      let n = $(`div`, `special-label`);
      n.textContent = `SPECIAL`;
      let r = $(`div`, `special-track`);
      (r.append(this.specialFill),
        this.special.append(r, n),
        (this.balance = $(`div`, `balance`)),
        (this.balNeedle = $(`div`, `balance-needle`)),
        this.balance.append($(`div`, `balance-arc`), this.balNeedle),
        this.el.append(this.combo, this.balance),
        e.root.append(this.el),
        e.me.append(this.special));
    }
    setLayout(e) {
      this.layout = e;
    }
    specialReady() {
      let e = this.special,
        t = e.parentElement;
      if (
        (e.classList.remove(`burst`),
        e.offsetWidth,
        e.classList.add(`burst`),
        !t)
      )
        return;
      t.querySelector(`.special-flag`)?.remove();
      let n = $(`div`, `special-flag`, `READY!`);
      if (
        (n.append($(`small`, ``, `every stat up`)),
        (n.style.left = `${e.offsetLeft + e.offsetWidth + 14}px`),
        (n.style.top = `${e.offsetTop - 8}px`),
        t.append(n),
        setTimeout(() => n.classList.add(`out`), 1900),
        setTimeout(() => n.remove(), 2200),
        !Jt())
      )
        for (let n = 0; n < 7; n++) {
          let r = fn(`star`, `special-star`);
          ((r.style.left = `${e.offsetLeft + 20 + n * 20}px`),
            (r.style.top = `${e.offsetTop}px`),
            t.append(r));
          let i = (Math.random() * 2 - 1) * 14,
            a = 8 + Math.random() * 12;
          r.animate(
            [
              { translate: `0 0`, scale: 0.2 },
              { translate: `${i}rem ${a}rem`, scale: 1, offset: 0.6 },
              {
                translate: `${i * 1.2}rem ${a + 6}rem`,
                scale: 0.6,
                opacity: 0,
              },
            ],
            {
              duration: 800,
              easing: `cubic-bezier(.2, .8, .4, 1)`,
              fill: `forwards`,
            },
          ).finished.then(
            () => r.remove(),
            () => r.remove(),
          );
        }
    }
    grade(e, t, n) {
      ((this.gradeEl.className = `combo-grade ${e}`),
        (this.gradeEl.textContent = t),
        (this.gradeUntil = performance.now() + 900),
        (this.gradeBanked = !1),
        (this.count = { from: NaN, delta: n, at: performance.now() }),
        this.score.classList.remove(`perfect`, `sloppy`),
        this.score.offsetWidth,
        this.score.classList.add(e));
    }
    endGrade() {
      ((this.gradeUntil = 0), (this.count = null));
    }
    update(e, t = e.bal) {
      let n = e.comboMult,
        r = performance.now();
      if (
        (this.gradeUntil &&
          (n === 0
            ? (this.gradeBanked = !0)
            : this.gradeBanked && this.endGrade(),
          r > this.gradeUntil && this.endGrade()),
        this.gradeUntil && n === 0)
      )
        this.count && this.countScore(r);
      else if (n > 0) {
        !this.gradeUntil &&
          this.gradeEl.className !== `combo-grade` &&
          ((this.gradeEl.className = `combo-grade`),
          this.score.classList.remove(`perfect`, `sloppy`));
        let t = this.seen;
        if (
          t[0] !== n ||
          t[1] !== e.comboTricks ||
          t[2] !== e.ring0 ||
          t[3] !== e.ring1 ||
          t[4] !== e.ring2 ||
          t[5] !== e.ring3 ||
          t[6] !== e.comboBase
        ) {
          ((t[0] = n),
            (t[1] = e.comboTricks),
            (t[2] = e.ring0),
            (t[3] = e.ring1),
            (t[4] = e.ring2),
            (t[5] = e.ring3),
            (t[6] = e.comboBase));
          let r = Math.max(0, n - 8),
            i = [],
            a = [];
          for (let t = r; t < n; t++) {
            let r = yn(e, (e.comboTricks - n + t) & 65535);
            (i.push(Tn(r, (e) => this.layout.gaps?.[e]?.name ?? `Gap`)),
              a.push(!!(hn(r) & 2)));
          }
          let o = i.join(`|`);
          o !== this.lastTricks &&
            ((this.lastTricks = o),
            this.tricks.replaceChildren(r > 0 ? `… + ` : ``),
            i.forEach((e, t) => {
              if ((t && this.tricks.append(` + `), !a[t])) {
                this.tricks.append(e);
                return;
              }
              let r = $(
                `span`,
                t === i.length - 1 && n !== this.lastMult
                  ? `combo-special fresh`
                  : `combo-special`,
              );
              (r.append(fn(`star`), e), this.tricks.append(r));
            }));
          let s = o + e.comboBase;
          s !== this.lastKey &&
            ((this.lastKey = s),
            (this.score.innerHTML = `<b>${e.comboBase.toLocaleString()}</b> <i>×</i> <b class="mult">${n}</b>`),
            n !== this.lastMult && this.pop(this.score),
            (this.lastMult = n));
        }
        (this.count &&
          Number.isNaN(this.count.from) &&
          ((this.count.from = e.comboBase - this.count.delta),
          (this.count.at = r)),
          (this.countTo = e.comboBase),
          this.count && this.countScore(r),
          this.combo.classList.add(`on`));
      } else
        this.combo.classList.contains(`on`) &&
          (this.combo.classList.remove(`on`),
          (this.lastKey = this.lastTricks = ``),
          (this.lastMult = 0),
          this.seen.fill(NaN));
      let i = e.special / 200;
      (i !== this.lastSp &&
        ((this.lastSp = i),
        (this.specialFill.style.transform = `scaleX(${i})`)),
        this.special.classList.toggle(`full`, e.special >= 200));
      let a = e.mode === A.GRIND || e.mode === A.LIP || e.mode === A.MANUAL;
      if ((this.balance.classList.toggle(`on`, a), a)) {
        this.balOn || (this.balTick = e.simTick);
        let n = Math.max(
          -1,
          Math.min(1, e.simTick === this.balTick ? e.bal : t),
        );
        (this.balance.classList.toggle(`vertical`, e.mode === A.MANUAL),
          (this.balNeedle.style.transform = `rotate(${n * 70}deg)`));
        let r = Math.abs(n),
          i = r.toFixed(2);
        (i !== this.lastD &&
          ((this.lastD = i), this.balance.style.setProperty(`--d`, i)),
          this.balance.classList.toggle(`hot`, r > 0.7),
          this.balance.classList.toggle(`still`, kn.reducedMotion));
      } else
        this.balOn && e.mode !== A.BAIL && this.balance.classList.remove(`hot`);
      this.balOn = a;
    }
    countTo = 0;
    countScore(e) {
      let t = this.count;
      if (Number.isNaN(t.from)) return;
      let n = Math.min(1, (e - t.at) / 300),
        r = this.score.querySelector(`b`);
      (r &&
        (r.textContent = Math.round(
          t.from + (this.countTo - t.from) * n,
        ).toLocaleString()),
        n >= 1 && (this.count = null));
    }
    pop(e) {
      (e.classList.remove(`pop`), e.offsetWidth, e.classList.add(`pop`));
    }
    dispose() {
      (this.el.remove(), this.special.remove());
    }
  };
