// assets__main-CzsUDvlE 37 — core
// Lines 12372-12660 of readable/assets__main-CzsUDvlE.pretty.js (statement-aligned).
function Vp(e, t, n) {
  let r = Math.sqrt(t.tx * t.tx + t.tz * t.tz);
  if (r < 0.3) return null;
  let i = t.tx / r,
    a = t.tz / r,
    o = e.col.raySurface(
      t.x - i * Bp,
      t.y - 0.02,
      t.z - a * Bp,
      0,
      -1,
      0,
      50,
      zp,
    )
      ? zp.py
      : -1 / 0,
    s = (r) => {
      if (
        !e.col.raySurface(
          t.x + i * r,
          t.y + Pp.dy,
          t.z + a * r,
          0,
          -1,
          0,
          2 * Pp.dy,
          zp,
        ) ||
        zp.ny < 0.7
      )
        return null;
      let s = e.pieces.get(zp.piece);
      return !s ||
        zp.piece === t.piece ||
        n(zp.piece) ||
        ba(s) ||
        zp.py < o + 0.15
        ? null
        : [zp.py, zp.piece];
    };
  for (let e = Bp; e <= Pp.plan + 1e-9; e += Bp) {
    let n = s(e);
    if (!n) continue;
    let r = e - Bp,
      o = e;
    for (let e = 0; e < 5; e++) {
      let e = (r + o) / 2,
        t = s(e);
      t ? ((o = e), (n = t)) : (r = e);
    }
    let [c, l] = n,
      u = c - t.y,
      d = o <= Ip ? 0 : o;
    return !d && Math.abs(u) <= Ip
      ? null
      : {
          at: t,
          other: {
            x: t.x + i * o,
            y: c,
            z: t.z + a * o,
            tx: -i,
            ty: 0,
            tz: -a,
            kind: -1,
            piece: l,
            seg: -1,
          },
          gap: d,
          along: d,
          side: 0,
          dy: u,
          angle: 0,
          faults: Wp(d, 0, u, !1),
        };
  }
  return null;
}
function Hp(e, t) {
  let n = t ? 1 : -1;
  return {
    x: t ? e.bx : e.ax,
    y: t ? e.by : e.ay,
    z: t ? e.bz : e.az,
    tx: e.tx * n,
    ty: e.ty * n,
    tz: e.tz * n,
    kind: e.kind,
    piece: e.piece,
    seg: e.id,
  };
}
var Up = (e, t) => (e + 32768) * 65536 + (t + 32768);
function Wp(e, t, n, r) {
  let i = [];
  return (
    e > Ip && i.push([`gap`, e]),
    e < -0.02 && i.push([`overlap`, -e]),
    t > Ip && i.push([`side`, t]),
    n > Ip && i.push([`low`, n]),
    n < -0.02 && i.push([`high`, -n]),
    r && i.push([`turn`, 1]),
    i.sort((e, t) => t[1] - e[1]).map(([e]) => e)
  );
}
var Gp = (e) => `${Math.max(1, Math.round(Math.abs(e) * 100))} cm`;
function Kp(e, t = !1) {
  return e.faults
    .slice(0, 2)
    .map((n) => {
      switch (n) {
        case `gap`:
          return `${Gp(e.along)} gap`;
        case `overlap`:
          return `${Gp(e.along)} overlap`;
        case `side`:
          return `${Gp(e.side)} off line`;
        case `high`:
          return t ? `${Gp(e.dy)} too high` : `${Gp(e.dy)} step`;
        case `low`:
          return t ? `${Gp(e.dy)} too low` : `${Gp(e.dy)} step`;
        case `turn`:
          return `${Math.round(e.angle)}° turn`;
      }
    })
    .join(` · `);
}
var qp = 128,
  Jp = new _(`#B4F03C`),
  Yp = new _(`#FF5A36`),
  Xp = new _(`#3B2C4F`),
  Zp = class {
    core;
    rim;
    marks = [];
    constructor(e, t, n, r) {
      ((this.core = new S(e, new o({ color: `#ffffff`, depthTest: n }), qp)),
        (this.rim = new S(t, new o({ color: Xp, side: 1, depthTest: n }), qp)),
        (this.core.renderOrder = r + 1),
        (this.rim.renderOrder = r));
      for (let e of [this.core, this.rim])
        ((e.count = 0), (e.frustumCulled = !1));
    }
  },
  Qp = new f(),
  $p = new T(),
  em = new T(0, 1, 0),
  tm = class {
    group = new c();
    joined;
    near;
    bars;
    world = null;
    ghost = null;
    ghostOn = !0;
    constructor() {
      let e = new d(0.16, 0.045, 8, 24),
        t = new d(0.16, 0.075, 8, 24),
        n = new a(0.035, 0.035, 1, 8).translate(0, 0.5, 0),
        r = new a(0.06, 0.06, 1, 8).translate(0, 0.5, 0);
      ((this.joined = new Zp(e, t, !0, 8)),
        (this.near = new Zp(e, t, !1, 13)),
        (this.bars = new Zp(n, r, !1, 13)));
      for (let e of [this.joined, this.near, this.bars])
        this.group.add(e.rim, e.core);
    }
    setWorld(e) {
      ((this.world = e), this.rebuild());
    }
    setGhost(e) {
      ((this.ghost = e), this.rebuild());
    }
    showGhost(e) {
      e !== this.ghostOn && ((this.ghostOn = e), this.rebuild());
    }
    rebuild() {
      ((this.joined.marks = []),
        (this.near.marks = []),
        (this.bars.marks = []));
      for (let e of this.world?.joined ?? [])
        this.joined.marks.push(nm(e, Jp, !1));
      let e = this.ghostOn ? this.ghost : null;
      for (let t of [this.world, e])
        for (let e of t?.near ?? []) {
          this.near.marks.push(nm(e.at, Yp, !1), nm(e.other, Yp, !1));
          let t = new T(e.at.x, e.at.y, e.at.z),
            n = new T(e.other.x, e.other.y, e.other.z),
            r = t.distanceTo(n);
          r > 0.03 &&
            this.bars.marks.push({
              at: t,
              q: new s().setFromUnitVectors(em, n.sub(t).divideScalar(r)),
              len: r,
              color: Yp,
              pulse: !1,
            });
        }
      for (let t of e?.would ?? []) this.near.marks.push(nm(t, Jp, !0));
    }
    frame(e, t = 1) {
      let n = 1 + 0.25 * Math.sin(performance.now() * 0.009);
      for (let r of [this.joined, this.near, this.bars]) {
        let i = Math.min(qp, r.marks.length);
        for (let a = 0; a < i; a++) {
          let i = r.marks[a],
            o =
              Math.min(5, Math.max(0.6, e.position.distanceTo(i.at) * 0.05)) *
              t *
              (i.pulse ? n : 1);
          ($p.set(o, r === this.bars ? i.len : o, o),
            Qp.compose(i.at, i.q, $p),
            r.core.setMatrixAt(a, Qp),
            r.rim.setMatrixAt(a, Qp),
            r.core.setColorAt(a, i.color));
        }
        ((r.core.count = r.rim.count = i),
          (r.core.instanceMatrix.needsUpdate =
            r.rim.instanceMatrix.needsUpdate =
              !0),
          r.core.instanceColor && (r.core.instanceColor.needsUpdate = !0));
      }
    }
    dispose() {
      for (let e of [this.joined, this.near, this.bars])
        for (let t of [e.core, e.rim])
          (t.geometry.dispose(), t.material.dispose(), t.dispose());
      this.group.removeFromParent();
    }
  };
function nm(e, t, n) {
  let r = new s().setFromUnitVectors(
    new T(0, 0, 1),
    new T(e.tx, e.ty, e.tz).normalize(),
  );
  return { at: new T(e.x, e.y, e.z), q: r, len: 0, color: t, pulse: n };
}
var rm = new _(`#2FD67B`),
  im = new _(`#FF5A36`),
  am = new _(`#FFD21F`),
  om = `#3B2C4F`,
  sm = { x: `#FF5A36`, y: `#2FD67B`, z: `#4F6BFF` },
  cm = null;
function lm(e) {
  cm = e;
}
function um(e) {
  let t = cm?.get(e.prop),
    n;
  return (
    t
      ? ((n = t.clone()), n.scale(e.s ?? 1, e.s ?? 1, e.s ?? 1))
      : ((n = new C(e.w, e.h, e.d).translate(0, e.h / 2, 0)),
        n.setAttribute(
          `color`,
          new p(
            new Float32Array(n.attributes.position.count * 3).fill(0.75),
            3,
          ),
        )),
    n.rotateY(e.rot ?? 0).translate(0, e.y ?? 0, 0)
  );
}
function dm(e) {
  if (e.kind === `prop`) {
    let t = um(e);
    return (
      t.computeBoundingBox(),
      { geometry: t, box: t.boundingBox.clone() }
    );
  }
  let t = {
      id: `ghost`,
      name: ``,
      half: 100,
      pieces: [{ ...e, x: 0, z: 0 }],
      spawns: [],
    },
    n = xa(t).group.children[0];
  n.material.dispose();
  let r = n.geometry;
  return (r.computeBoundingBox(), { geometry: r, box: r.boundingBox.clone() });
}
function fm(e = 1) {
  let t = new a(0.08 * e, 0.08 * e, 0.55, 10).translate(0, 0.275, 0),
    n = new u(0.24 * e, 0.45, 12).translate(0, 0.775, 0),
    r = Pa([t.toNonIndexed(), n.toNonIndexed()]);
  return (t.dispose(), n.dispose(), r);
}
