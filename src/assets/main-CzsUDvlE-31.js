// assets/main-CzsUDvlE 31 — math
// Lines 10401-10735 of readable/assets/main-CzsUDvlE.pretty.js (statement-aligned).
function Vd(e, t, n, r = `span`) {
  let i = j(r, n);
  i.append(j(`span`, ``, mr(e, t)));
  let a = hr[e];
  return (a && i.append(B(a, `fig-stk`)), i);
}
function Hd(e, t, n, r, i) {
  let a = t.career,
    o = j(`div`, `cg interactive ${A() ? `still` : ``}`),
    s = a.goals.filter((e) => e.done).length,
    c = Zt(e, (e) => !!a.goals[e]?.done),
    l = (t) => !c || !!e.starter?.includes(t.id),
    u = j(`button`, `cg-head`);
  u.type = `button`;
  let d = j(
    `span`,
    r.size ? `cg-bump` : ``,
    `${s}/${c ? e.need : e.goals.length}`,
  );
  (r.size && Wd(d, Math.min(...r.values())),
    u.append(j(`span`, ``, e.name), d),
    u.addEventListener(`click`, i),
    o.append(u));
  let f = e.goals.flatMap((e, t) => {
      let i = a.goals[t];
      if (!i || e.kind === `skate` || e.kind === `collect`) return [];
      let o = r.get(t);
      return i.now
        ? n
          ? [{ g: e, i: t, now: !0 }]
          : o !== void 0 && e.kind !== `score`
            ? [{ g: e, i: t, now: !0, age: o }]
            : []
        : i.done || !l(e) || e.kind === `score`
          ? []
          : [{ g: e, i: t, now: !1 }];
    }),
    p = (t) => {
      let n = e.starter?.indexOf(t.id) ?? -1;
      return n < 0 ? 1 / 0 : n;
    };
  c && f.sort((e, t) => p(e.g) - p(t.g));
  let m = n ? 1 / 0 : 3,
    h = 0,
    g = 0;
  for (let { g: e, i: t, now: n, age: r } of f) {
    let i = r === void 0 ? g++ < m : h < m;
    if ((h++, !i)) continue;
    let a = j(`div`, `goal ${n ? `done now` : ``}`),
      s = j(`span`, `goal-box`);
    n && s.append(B(`star`));
    let c = j(`span`, `goal-text`, e.text);
    (a.append(s, c),
      r !== void 0 && ((c.dataset.text = e.text), Ud(a, `g${t}`, r)),
      o.append(a));
  }
  g > m && o.append(j(`div`, `cg-more`, `+${g - m} more`));
  let _ = j(`div`, `cg-picks`),
    v = 0,
    y = 1 / 0;
  return (
    e.goals.forEach((e, t) => {
      let n = [...a.spots]
          .map((e, t) => ({ s: e, j: t }))
          .filter(({ s: e }) => e.goal === t),
        i = r.get(t);
      if (!n.length || e.kind === `spot` || (a.goals[t]?.done && i === void 0))
        return;
      let o = (e) => !!(a.got & (1 << e));
      if (!l(e) && i === void 0 && !n.some(({ j: e }) => o(e))) return;
      let s = j(`span`, `cg-pick`);
      if (e.kind === `skate`)
        for (let { s: e, j: t } of n)
          s.append(j(`b`, o(t) ? `on` : ``, e.item));
      else
        e.kind === `collect` &&
          s.append(
            F(
              `span`,
              ``,
              e.item,
              `${n.filter(({ j: e }) => o(e)).length}/${n.length}`,
            ),
          );
      s.childElementCount &&
        (i !== void 0 && (Ud(s, `p${t}`, i), v++, (y = Math.min(y, i))),
        _.append(s));
    }),
    v && v === _.childElementCount && Ud(_, `picks`, y),
    _.childElementCount && o.append(_),
    o
  );
}
function Ud(e, t, n) {
  (e.classList.add(`cg-out`), (e.dataset.out = t), Wd(e, n));
}
function Wd(e, t) {
  e.style.setProperty(`--t`, `${-Math.round(t)}ms`);
}
var Gd = new Map();
function Kd(e, t) {
  let n = Gd.get(e);
  return (
    n || ((n = new Image()), (n.src = Pn(e)), Gd.set(e, n)),
    n.complete || n.addEventListener(`load`, t, { once: !0 }),
    n
  );
}
var qd = 0.45,
  Jd = 3.2,
  Yd = 4.05,
  Xd = new i(2.36, 0.66),
  Zd = 3.52,
  Qd = 0.125,
  $d = `#3B2C4F`;
function ef(e, t) {
  let n = document.createElement(`canvas`);
  ((n.width = 1024), (n.height = 288));
  let r = new m(n);
  r.colorSpace = l;
  let i = () => {
    let i = n.getContext(`2d`);
    (i.clearRect(0, 0, 1024, 288), (i.font = `224px 'Lilita One', system-ui`));
    let a = Math.min(224, 212800 / i.measureText(e).width);
    ((i.font = `${a}px 'Lilita One', system-ui`),
      (i.textAlign = `center`),
      (i.lineJoin = `round`),
      (i.lineWidth = a * 0.13),
      (i.strokeStyle = $d),
      (i.fillStyle = t));
    let o = 144 + i.measureText(e).actualBoundingBoxAscent / 2;
    (i.strokeText(e, 512, o), i.fillText(e, 512, o), (r.needsUpdate = !0));
  };
  (i(), document.fonts.load(`224px 'Lilita One'`).then(i));
  let a = new o({
      map: r,
      transparent: !0,
      depthWrite: !1,
      polygonOffset: !0,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -4,
    }),
    s = new c();
  for (let e of [1, -1]) {
    let t = new w(Xd, a);
    (t.position.set(0, Zd, e * Qd),
      (t.rotation.y = e > 0 ? 0 : Math.PI),
      s.add(t));
  }
  return s;
}
var tf = new n(0.86, 1, 64),
  GatePopup = class {
    group = new c();
    items = new Map();
    waves = [];
    t = 0;
    constructor(e, t, r) {
      for (let i of e) {
        let e = t(i.mode);
        if (!e) continue;
        let s = new _(e.color),
          c = i.y ?? 0,
          u = new w(
            new n(i.r - 0.35, i.r, 48),
            new o({
              color: s,
              transparent: !0,
              opacity: 0.85,
              side: 2,
              forceSinglePass: !0,
              depthWrite: !1,
            }),
          );
        ((u.rotation.x = -Math.PI / 2), u.position.set(i.x, c + 0.03, i.z));
        let d = new w(
          new a(i.r * 0.95, i.r, 4, 32, 1, !0),
          new o({
            color: s,
            transparent: !0,
            opacity: 0.08,
            side: 0,
            depthWrite: !1,
          }),
        );
        d.position.set(i.x, c + 2, i.z);
        let f = document.createElement(`canvas`);
        ((f.width = 512), (f.height = 256));
        let p = new m(f);
        p.colorSpace = l;
        let g = new h(new ee({ map: p, transparent: !0, depthWrite: !1 }));
        (g.center.set(0.5, 0),
          g.scale.set(Jd, Jd / 2, 1),
          g.position.set(i.x, c + Yd, i.z),
          (g.renderOrder = 5));
        let v = ef(e.name, e.color);
        (v.position.set(i.x, c, i.z),
          (v.rotation.y = i.rot),
          this.group.add(u, d, g, v));
        let y = {
          look: e,
          arch: r?.getObjectByName(`gate:${i.mode}`) ?? null,
          sign: v,
          ring: u,
          beam: d,
          label: g,
          canvas: f,
          tex: p,
          last: null,
          phase: Math.random() * 6,
          x: i.x,
          y: c,
          z: i.z,
          r: i.r,
          color: s,
          flash: 0,
          pop: 0,
          count: -1,
        };
        (this.items.set(i.mode, y), this.draw(y, ``));
      }
    }
    draw(e, t) {
      if (e.last === t) return;
      e.last = t;
      let n = e.canvas.getContext(`2d`);
      n.clearRect(0, 0, 512, 256);
      let r = Kd(e.look.icon, () => {
        e.last = null;
      });
      (r.complete && r.naturalWidth && n.drawImage(r, 172, 84, 168, 168),
        t &&
          ((n.font = `66px 'Lilita One', system-ui`),
          (n.textAlign = `center`),
          (n.lineJoin = `round`),
          (n.lineWidth = 14),
          (n.strokeStyle = $d),
          (n.fillStyle = `#FFFFFF`),
          n.strokeText(t, 256, 64, 500),
          n.fillText(t, 256, 64, 500)),
        (e.tex.needsUpdate = !0));
    }
    show(e) {
      for (let [t, n] of this.items) {
        let r = e(t);
        ((n.ring.visible =
          n.beam.visible =
          n.label.visible =
          n.sign.visible =
            r),
          n.arch && (n.arch.visible = r));
      }
    }
    burst(e, t) {
      let n = this.items.get(e);
      if (!n) return;
      let r = (e, t, r, i, a = 0) => {
        let s = new w(
          tf,
          new o({
            color: n.color,
            transparent: !0,
            opacity: 0,
            side: 2,
            forceSinglePass: !0,
            depthWrite: !1,
          }),
        );
        ((s.rotation.x = -Math.PI / 2),
          s.position.set(n.x, n.y + 0.05, n.z),
          (s.renderOrder = 3),
          s.scale.setScalar(e),
          this.group.add(s),
          this.waves.push({ mesh: s, t: -a, dur: r, r0: e, r1: t, op: i }));
      };
      t === `in`
        ? (r(n.r * 0.8, n.r * 2.8, 0.6, 1),
          r(n.r * 0.6, n.r * 2, 0.55, 0.8, 0.12),
          (n.flash = 0.7),
          (n.pop = qd))
        : t === `out`
          ? (r(n.r * 1.6, n.r * 0.2, 0.45, 0.9), (n.flash = 0), (n.pop = qd))
          : r(n.r, n.r * 1.7, 0.45, 0.55);
    }
    update(e, t) {
      this.t += e;
      for (let [n, r] of this.items) {
        if (!r.ring.visible) continue;
        let { count: i, mine: a, armed: o, left: s, shut: c } = t(n);
        (r.count >= 0 &&
          i > r.count &&
          !(a && r.flash > 0) &&
          this.burst(n, `ping`),
          (r.count = i),
          (r.flash = Math.max(0, r.flash - e)),
          (r.pop = Math.max(0, r.pop - e)));
        let l = 0.5 + 0.5 * Math.sin(this.t * (o ? 7 : 3) + r.phase);
        ((r.ring.material.opacity = c
          ? 0.2
          : o
            ? 0.85 + l * 0.15
            : 0.55 + l * 0.4),
          r.ring.scale.setScalar(o ? 1.08 + 0.04 * l : 1 + (a ? 0.06 * l : 0)),
          (r.beam.material.opacity = c
            ? 0.02
            : (o ? 0.18 : a ? 0.16 : 0.05) + l * 0.04 + r.flash * 0.5));
        let u = r.pop > 0 ? Math.sin((1 - r.pop / qd) * Math.PI) * 0.22 : 0;
        (r.label.scale.set(Jd * (1 + u), (Jd / 2) * (1 + u), 1),
          (r.label.position.y =
            r.y + Yd + (0.5 + 0.5 * Math.sin(this.t * 1.6 + r.phase)) * 0.12));
        let d = a ? `YOU'RE IN · ${i}` : i ? `${i} waiting` : ``;
        this.draw(r, s >= 0 && d ? `${d} · ${Nt(s)}` : d);
      }
      for (let t = this.waves.length - 1; t >= 0; t--) {
        let n = this.waves[t];
        n.t += e;
        let r = Math.max(0, n.t / n.dur),
          i = 1 - (1 - Math.min(1, r)) ** 3;
        (n.mesh.scale.setScalar(n.r0 + (n.r1 - n.r0) * i),
          (n.mesh.material.opacity = n.t < 0 ? 0 : n.op * (1 - Math.min(1, r))),
          r >= 1 &&
            (n.mesh.removeFromParent(),
            n.mesh.material.dispose(),
            this.waves.splice(t, 1)));
      }
    }
    dispose() {
      this.group.removeFromParent();
      for (let e of this.items.values()) e.tex.dispose();
      for (let e of this.waves) e.mesh.material.dispose();
      this.waves.length = 0;
    }
  },
  rf = [`#FF3D7F`, `#FF8A1F`, `#FFD21F`, `#2FD67B`, `#1FC7E8`],
  af = null;
