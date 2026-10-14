// assets/main-CzsUDvlE 32 — root
// Lines 10736-11078 of readable/assets/main-CzsUDvlE.pretty.js (statement-aligned).
function of() {
  if (af) return af;
  let e = document.createElement(`canvas`);
  e.width = e.height = 64;
  let t = e.getContext(`2d`),
    n = t.createRadialGradient(32, 32, 0, 32, 32, 32);
  return (
    n.addColorStop(0, `rgba(255,255,255,1)`),
    n.addColorStop(0.45, `rgba(255,255,255,0.45)`),
    n.addColorStop(1, `rgba(255,255,255,0)`),
    (t.fillStyle = n),
    t.fillRect(0, 0, 64, 64),
    (af = new m(e)),
    (af.colorSpace = l),
    af
  );
}
var SkateLetters = class {
    group = new c();
    items = [];
    owned = [];
    t = 0;
    dead = !1;
    constructor(e) {
      (e.forEach((e, t) => {
        let n = e.item ?? (e.prop ? `` : `SKATE`[t]),
          r = Cr.indexOf(n),
          a = new c();
        a.position.set(e.x, e.y, e.z);
        let s = document.createElement(`canvas`);
        s.width = s.height = 256;
        let u = s.getContext(`2d`);
        ((u.font = `200px 'Lilita One', system-ui`),
          (u.textAlign = `center`),
          (u.textBaseline = `middle`),
          (u.lineJoin = `round`),
          (u.lineWidth = 26),
          (u.strokeStyle = `#3B2C4F`),
          (u.fillStyle = rf[(r >= 0 ? r : t) % 5]),
          r >= 0 && (u.strokeText(n, 128, 138), u.fillText(n, 128, 138)));
        let d = new m(s);
        if (((d.colorSpace = l), Ra(n))) {
          let e = new Image();
          ((e.onload = () => {
            (u.drawImage(e, 0, 0, 256, 256), (d.needsUpdate = !0));
          }),
            (e.src = Pn(n)));
        }
        let f = e.size ?? 1.1,
          p = new i(f * 1.36, f * 1.36),
          g = new o({
            map: d,
            transparent: !0,
            side: 2,
            forceSinglePass: !0,
            depthWrite: !1,
          });
        this.owned.push(d, p, g);
        let _ = new w(p, g);
        if (e.glow !== !1) {
          let e = new ee({
            map: of(),
            color: 16774848,
            transparent: !0,
            opacity: 0.55,
            depthWrite: !1,
          });
          this.owned.push(e);
          let t = new h(e);
          (t.scale.setScalar(f * 2.2), a.add(t));
        }
        (a.add(_), this.group.add(a), this.items.push({ root: a, base: e.y }));
      }),
        loadProps()
          .then((t) => {
            if (this.dead) return;
            let n = new Map(),
              r = (e = ``) => {
                let t = n.get(e);
                if (!t) {
                  let r = toonMaterial({ vertexColors: !0 });
                  (e && r.color.set(e),
                    patchToon(r, { rim: 0.35, ao: !0 }),
                    n.set(e, r),
                    this.owned.push(r),
                    (t = r));
                }
                return t;
              };
            this.items.forEach((n, i) => {
              let a = e[i],
                o = a.item ?? `SKATE`[i],
                s = !a.prop && `SKATE`.includes(o),
                l = t.get(a.prop ?? (s ? `letter_${o}` : `pickup_${o}`));
              if (!l) return;
              let u = new w(l, r(a.tint));
              ((u.castShadow = a.glow !== !1), l.computeBoundingBox());
              let d = l.boundingBox;
              if (s)
                (u.scale.setScalar(1.3 / (d.max.y - d.min.y || 1)),
                  (u.position.y = -0.65));
              else {
                let e = d.getSize(new T()),
                  t = d.getCenter(new T()),
                  n = (a.size ?? 1.1) / (Math.max(e.x, e.y, e.z) || 1);
                (u.scale.setScalar(n), u.position.copy(t).multiplyScalar(-n));
              }
              addOutlines(u, 1);
              let f = new c();
              (f.add(u),
                n.root.remove(n.root.children[n.root.children.length - 1]),
                n.root.add(f));
            });
          })
          .catch(() => {}));
    }
    update(e, t) {
      ((this.t += e),
        this.items.forEach((n, r) => {
          let i = (typeof t == `number` ? t & (1 << r) : t(r)) ? 0.001 : 1,
            a = n.root.scale.x + (i - n.root.scale.x) * Math.min(1, e * 10);
          (n.root.scale.setScalar(a),
            (n.root.visible = a > 0.02),
            (n.root.position.y = n.base + Math.sin(this.t * 2 + r) * 0.2),
            (n.root.children[n.root.children.length - 1].rotation.y =
              this.t * 1.8 + r));
        }));
    }
    dispose() {
      ((this.dead = !0), this.group.removeFromParent());
      for (let e of this.owned) e.dispose();
      this.owned.length = 0;
    }
  },
  cf = [`#FFB066`, `#E3E9F5`, `#FFD21F`],
  lf = (e) => ({
    x: e.x,
    y: e.y,
    z: e.z,
    prop: Xe.coin,
    tint: cf[e.tier],
    size: 0.8,
    glow: !1,
  }),
  uf = (e) =>
    e.kind === `stash`
      ? { x: e.x, y: e.y, z: e.z, prop: Xe.stash, size: 1.1 }
      : { x: e.x, y: e.y, z: e.z, prop: Xe.deck, size: 1.3 },
  Collectibles = class {
    layer = null;
    day = -1;
    drops = [];
    finds;
    coins;
    add;
    constructor(e, t, n) {
      this.add = n;
      let r = t ? en(t) : void 0;
      ((this.finds = t ? (r ? [r] : []) : Sn(e)),
        (this.coins = !t && e === `plaza`));
    }
    update(e, t, n, r = !0) {
      if (t !== this.day) {
        ((this.day = t),
          (this.drops = this.coins ? En(t) : []),
          this.layer?.dispose());
        let e = [...this.drops.map(lf), ...this.finds.map(uf)];
        ((this.layer = e.length ? new SkateLetters(e) : null),
          this.layer && this.add(this.layer));
      }
      if (!this.layer) return;
      let i = n ? Kt(n, t) : [],
        a = this.drops.length;
      this.layer.update(
        e,
        (e) =>
          !r ||
          !n ||
          (e < a
            ? i.includes(this.drops[e].id)
            : n.found.includes(this.finds[e - a].id)),
      );
    }
    dispose() {
      (this.layer?.dispose(), (this.layer = null));
    }
  },
  ff = new T();
function pf(e, t, n, r) {
  ff.set(t, n, r).project(e);
  let i = ff.z < 1,
    a = i ? (ff.x * 0.5 + 0.5) * innerWidth : innerWidth / 2,
    o = i ? (-ff.y * 0.5 + 0.5) * innerHeight : innerHeight / 2;
  return new DOMRect(a - 20, o - 20, 40, 40);
}
var CoinChip = class {
    el = j(`div`, `coin-chip off`);
    ico = B(`coin`, `coin-ico`);
    n = j(`span`, `coin-n`);
    off;
    flying = 0;
    shown = 0;
    constructor(e) {
      (this.el.append(this.ico, this.n),
        this.el.setAttribute(`aria-label`, `Coins`),
        e.append(this.el),
        (this.off = M(() => this.paint())),
        this.paint());
    }
    paint() {
      let e = N.profile;
      (this.el.classList.toggle(`off`, !e || e.coins === 0),
        e && !this.flying && this.set(cn(e)));
    }
    set(e) {
      ((this.shown = e), (this.n.textContent = e.toLocaleString(`en-US`)));
    }
    fly(e, t) {
      (this.el.classList.remove(`off`),
        this.flying++,
        sr(1400)
          .fly(e, this.ico, `coin`, 0, 520)
          .then(() => {
            this.flying--;
            let e = N.profile;
            (this.set(!this.flying && e ? cn(e) : this.shown + t),
              L(this.el, `pop`));
          }));
    }
    dispose() {
      (this.off(), this.el.remove());
    }
  },
  hf = 4500,
  NowPlaying = class {
    el = j(`div`, `now-playing`);
    text = j(`span`, `np-text`);
    timer = 0;
    constructor(e) {
      (this.el.append(U(`note`, `np-ico`), this.text),
        this.el.addEventListener(`animationend`, () => {
          this.el.classList.contains(`out`) &&
            this.el.classList.remove(`on`, `out`);
        }),
        e.append(this.el),
        La((e) => this.show(e)));
    }
    show(e) {
      (this.text.replaceChildren(j(`b`, ``, e.artist), ` · ${e.title}`),
        clearTimeout(this.timer),
        this.el.classList.remove(`out`),
        this.el.classList.add(`on`),
        (this.timer = window.setTimeout(
          () => this.el.classList.add(`out`),
          hf,
        )));
    }
  };
function _f(e, t, n) {
  if (e.phase === K.RESULTS || e.phase === K.ABORTED || e.phase === K.GATHER)
    return !0;
  if (e.phase === K.INTRO || e.phase === K.COUNTDOWN)
    return e.playStartsAt > 0 && n >= e.playStartsAt;
  if (e.countdownAt > 0 && n >= e.countdownAt && n < e.playStartsAt) return !1;
  let r = e.roster.get(t);
  if (e.freezeAt > 0 && n >= e.freezeAt && !r?.ot) return !1;
  if (e.mode === `horse` && (e.phase === K.PLAYING || e.phase === K.OVERTIME)) {
    let r = e.horse;
    return (
      !!r &&
      r.activeId === t &&
      (r.stage === 1 || (r.stage === 0 && n >= r.stageEndsAt))
    );
  }
  return !0;
}
var vf = (e, t) =>
    (e.flags & qe.TRICK) !== 0 && e.tricks.some((e) => Oe[Ar(e)]?.kind === t),
  yf = [
    {
      id: `roll`,
      part: `hub`,
      title: `Roll out`,
      line: (e) => (e === `touch` ? [`Drag on the left side:`] : null),
      moves: (e) =>
        e === `touch`
          ? [
              { key: `push`, verb: `up`, name: `Roll` },
              { key: `steer`, verb: `sideways`, name: `Steer` },
            ]
          : [
              { key: `push`, name: `Roll` },
              { key: `steer`, name: `Steer` },
            ],
      done: (e, t) =>
        t.rolling && t.mode === Ge.GROUND && t.vx * t.vx + t.vz * t.vz > 25,
    },
    {
      id: `ollie`,
      part: `hub`,
      title: `Ollie`,
      line: () => [
        `Hold `,
        { key: `ollie` },
        ` to crouch and pick up speed, then`,
      ],
      moves: () => [{ key: `ollie`, verb: `let go`, name: `Ollie` }],
      done: (e) => (e.flags & qe.OLLIE) !== 0,
    },
    {
      id: `air`,
      part: `hub`,
      title: `Air trick`,
      line: () => [`Let go of `, { key: `push` }, `, then in the air:`],
      moves: () => [
        { key: `flip`, verb: `tap`, name: `Kickflip` },
        { key: `grab`, verb: `hold`, name: `Grab` },
      ],
      done: (e) => vf(e, k.FLIP) || vf(e, k.GRAB),
    },
    {
      id: `grind`,
      part: `run`,
      title: `Grind`,
      line: () => [`Ollie onto a rail or ledge, then`],
      moves: () => [{ key: `grind`, verb: `tap`, name: `Grind` }],
      done: (e) => (e.flags & qe.GRIND_START) !== 0,
    },
    {
      id: `land`,
      part: `run`,
      title: `Land a combo`,
      line: () => [`Chain tricks, then land clean:`],
      chain: [`ollie`, `flip`, `grind`],
      done: (e) => (e.flags & qe.COMBO_LANDED) !== 0,
    },
  ],
  bf = { hub: `tutorial`, run: `tips` };
function xf(e, t) {
  if (e === `push`) return j(`kbd`, ``, t(`up`));
  let n = j(`span`, `cap-pair`);
  return (n.append(j(`kbd`, ``, t(`left`)), j(`kbd`, ``, t(`right`))), n);
}
