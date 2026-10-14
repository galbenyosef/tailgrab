// assets/main-CzsUDvlE 35 — math
// Lines 11751-12092 of readable/assets/main-CzsUDvlE.pretty.js (statement-aligned).
function Yf() {
  try {
    let [e, t] = (localStorage.getItem(qf) ?? ``).split(`@`);
    return Kf.includes(e) && Date.now() - Number(t) < Jf ? e : null;
  } catch {
    return null;
  }
}
function Xf(e) {
  let t = Kf.find((t) => O[t] === e);
  try {
    t && localStorage.setItem(qf, `${t}@${Date.now()}`);
  } catch {}
}
function Zf() {
  try {
    localStorage.removeItem(qf);
  } catch {}
}
function Qf() {
  let e = /iPhone|iPad|iPod|Macintosh/.test(navigator.userAgent),
    t = navigator.deviceMemory ?? 0,
    n = Math.min(screen.width, screen.height) >= 820;
  return e || t >= 6 || (n && (navigator.hardwareConcurrency ?? 4) > 4);
}
function $f() {
  return O[
    matchMedia(`(pointer: coarse)`).matches ? (Qf() ? `med` : `low`) : `high`
  ];
}
function ep(e = Gf()) {
  if (e === `low` || e === `med` || e === `high`) return O[e];
  let t = $f(),
    n = Yf();
  return n && Kf.indexOf(n) < Kf.findIndex((e) => O[e] === t) ? O[n] : t;
}
var tp = new r(),
  np = new v(),
  rp = new te(),
  ip = new T(),
  ap = class extends Va {
    constructor(e, t) {
      (super(e, t),
        (this.screenSpacePanning = !1),
        (this.mouseButtons = { LEFT: g.PAN, MIDDLE: g.DOLLY, RIGHT: g.ROTATE }),
        (this.touches = { ONE: y.PAN, TWO: y.DOLLY_ROTATE }),
        (this._panWorldStart = new T()));
    }
    _handleMouseDownPan(e) {
      if (
        (super._handleMouseDownPan(e),
        this._panOffset.set(0, 0, 0),
        this.screenSpacePanning === !0)
      )
        return;
      tp.setFromNormalAndCoplanarPoint(this.object.up, this.target);
      let t = this.domElement.getBoundingClientRect();
      ((rp.x = ((e.clientX - t.left) / t.width) * 2 - 1),
        (rp.y = -((e.clientY - t.top) / t.height) * 2 + 1),
        np.setFromCamera(rp, this.object),
        np.ray.intersectPlane(tp, this._panWorldStart));
    }
    _handleMouseMovePan(e) {
      if (this.screenSpacePanning === !0) {
        super._handleMouseMovePan(e);
        return;
      }
      let t = this.domElement.getBoundingClientRect();
      ((rp.x = ((e.clientX - t.left) / t.width) * 2 - 1),
        (rp.y = -((e.clientY - t.top) / t.height) * 2 + 1),
        np.setFromCamera(rp, this.object),
        np.ray.intersectPlane(tp, ip) &&
          (ip.sub(this._panWorldStart),
          this._panOffset.copy(ip).negate(),
          this.update()));
    }
  },
  op = { pieces: 400, tris: 8e4, rails: 8e3 };
function sp(e) {
  let t = (e.layout.pieces.length - 1) / op.pieces,
    n = (e.col.geometry.index?.count ?? 0) / 3 / op.tris,
    r = e.rails.segs.length / op.rails;
  return { pieces: t, tris: n, rails: r, used: Math.max(t, n, r) };
}
var cp = be + ye;
(_e * _e) / 34 + cp;
var lp = he.clear;
function up(e) {
  let t = e.geometry.attributes.position.array,
    n = e.pieces,
    r = new Map();
  for (let e = 0; e < n.length; e++) {
    let i = r.get(n[e]);
    i ||
      r.set(
        n[e],
        (i = {
          x0: 1 / 0,
          x1: -1 / 0,
          y0: 1 / 0,
          y1: -1 / 0,
          z0: 1 / 0,
          z1: -1 / 0,
        }),
      );
    let a = t[e * 3],
      o = t[e * 3 + 1],
      s = t[e * 3 + 2];
    (a < i.x0 && (i.x0 = a),
      a > i.x1 && (i.x1 = a),
      o < i.y0 && (i.y0 = o),
      o > i.y1 && (i.y1 = o),
      s < i.z0 && (i.z0 = s),
      s > i.z1 && (i.z1 = s));
  }
  return r;
}
var dp = (e, t, n) =>
    Math.min(e.x1, t.x1) - Math.max(e.x0, t.x0) > n &&
    Math.min(e.y1, t.y1) - Math.max(e.y0, t.y0) > n &&
    Math.min(e.z1, t.z1) - Math.max(e.z0, t.z0) > n,
  fp = (e, t, n) =>
    Math.min(e.x1, t.x1) - Math.max(e.x0, t.x0) > n &&
    Math.min(e.z1, t.z1) - Math.max(e.z0, t.z0) > n,
  pp = new e();
ve();
var mp = (e) => e?.kind === `path` && e.section.type === `deck`,
  hp = (e) => mp(e) && e.section.type === `deck` && e.section.base === `slab`,
  gp = (e) => e.kind === `rail` && !!e.hang,
  _p = (e) =>
    e.kind === `path` &&
    (e.section.type === `ledge` || e.section.type === `rail`) &&
    !!e.section.skirt;
function vp(e, t, n) {
  return (
    pp.origin.set(t, e.yTop, n),
    pp.direction.set(0, -1, 0),
    e.col.bvh
      .raycast(pp, 2, 0, e.yTop - e.killY)
      .filter((e) => e.face)
      .map((t) => ({
        y: t.point.y,
        ny: t.face.normal.y,
        piece: e.col.pieces[t.face.a],
      }))
      .sort((e, t) => t.y - e.y)
  );
}
function yp(e, t, n, r, i, a, o, s, c) {
  (pp.origin.set(t, n, r), pp.direction.set(i, a, o));
  let l = null;
  for (let t of e.col.bvh.raycast(pp, 2, 0, s)) {
    if (!t.face) continue;
    let n = t.face.normal;
    if (n.x * i + n.y * a + n.z * o >= 0) continue;
    let r = e.col.pieces[t.face.a];
    (typeof c == `number` ? r === c : c(r)) ||
      ((!l || t.distance < l.d) &&
        (l = { piece: r, d: t.distance, y: t.point.y }));
  }
  return l;
}
function bp(e, t, n, r) {
  let i = Math.cos(e.rot ?? 0),
    a = Math.sin(e.rot ?? 0);
  return [e.x + t * i + r * a, (e.y ?? 0) + n, e.z - t * a + r * i];
}
function xp(e, t = {}) {
  let { layout: n, col: r } = e,
    i = ue(n),
    a = r.geometry.attributes.position.array,
    o = r.pieces,
    s = [],
    c = new Map(),
    l = (e, t, n) => !!i && i.y(e, t) >= n - 0.05,
    u = (e, t) => {
      let n = c.get(e);
      (n || c.set(e, (n = new Set())), n.add(t));
    },
    d = (t, n, r, i) => yp(e, n, r + 0.02, i, 0, -1, 0, 0.08, t),
    f = new Map();
  for (let t = 0; t < o.length; t++) {
    let n = e.pieces.get(o[t]);
    if (
      !n ||
      mp(n) ||
      n.kind === `bowl` ||
      ba(n) ||
      gp(n) ||
      _p(n) ||
      (n.y ?? 0) <= 0.05 ||
      Math.abs(a[t * 3 + 1] - (n.y ?? 0)) > 0.01
    )
      continue;
    let r = f.get(n.id) ?? [];
    (r.length < 400 && r.push([a[t * 3], a[t * 3 + 2]]), f.set(n.id, r));
  }
  for (let [t, n] of f) {
    let r = e.pieces.get(t).y ?? 0,
      i = 0,
      a = 0;
    for (let [e, t] of n) ((i += e), (a += t));
    ((i /= n.length), (a /= n.length));
    let o = Math.max(1, Math.floor(n.length / 16));
    for (let e = 0; e < n.length; e += o) {
      let o = n[e][0] + (i - n[e][0]) * 0.05,
        c = n[e][1] + (a - n[e][1]) * 0.05;
      if (l(o, c, r)) continue;
      let f = d(t, o, r, c);
      if (!f) {
        s.push({
          piece: t,
          msg: `floats at (${o.toFixed(1)}, ${r}, ${c.toFixed(1)})`,
        });
        break;
      }
      u(t, f.piece);
    }
  }
  for (let r of n.pieces) {
    if (hp(r)) {
      let t = r.section,
        n = ne(r);
      if (n.length) {
        for (let e of n) {
          let [t, n, i] = bp(r, e.x, e.y0, e.z);
          if (l(t, i, n)) continue;
          let a = d(r.id, t, n, i);
          if (!a) {
            s.push({
              piece: r.id,
              msg: `a pillar floats at (${t.toFixed(1)}, ${n.toFixed(2)}, ${i.toFixed(1)})`,
            });
            break;
          }
          u(r.id, a.piece);
        }
        continue;
      }
      if (r.path.closed) continue;
      let i = ie(r.path),
        a = t.t ?? 0.5,
        o = i.length,
        c = Math.min(0.3, o / 4);
      for (let [t, n] of [
        [c, -1],
        [o - c, 1],
      ]) {
        let c = re(i, t),
          [f, p, m] = bp(r, c.x, c.y - a, c.z),
          h = l(f, m, p) ? { piece: 0, d: 0, y: p } : d(r.id, f, p, m);
        if (!h) {
          let t = re(i, n < 0 ? 0.05 : o - 0.05),
            [s, c, l] = bp(r, t.x, t.y - a / 2, t.z),
            u = r.rot ?? 0,
            d = Math.cos(u),
            f = Math.sin(u),
            p = (t.tx * d + t.tz * f) * n,
            m = (-t.tx * f + t.tz * d) * n,
            g = Math.hypot(p, m);
          h = yp(e, s, c, l, p / g, 0, m / g, 0.25, r.id);
        }
        if (!h) {
          s.push({
            piece: r.id,
            msg: `an end floats at (${f.toFixed(1)}, ${p.toFixed(2)}, ${m.toFixed(1)})`,
          });
          break;
        }
        h.piece && u(r.id, h.piece);
      }
      continue;
    }
    if (r.kind === `rail` && r.hang) {
      let n = r.h2 ?? r.h;
      for (let i of [0.15, 0.85]) {
        let [a, o, c] = bp(
            r,
            -r.len / 2 + r.len * i,
            r.h + (n - r.h) * i + r.hang,
            0,
          ),
          l = yp(e, a, o - 0.05, c, 0, 1, 0, 0.15, r.id);
        if (l) {
          u(r.id, l.piece);
          continue;
        }
        if (!t.hangFree?.(r.id)) {
          s.push({
            piece: r.id,
            msg: `hangs from nothing at (${a.toFixed(1)}, ${o.toFixed(2)}, ${c.toFixed(1)})`,
          });
          break;
        }
      }
    }
  }
  return { issues: s, on: c };
}
function Sp(e) {
  return xp(e).on;
}
function Cp(e, t) {
  let n = [],
    r = new Set([t]);
  for (let i = -1; i < n.length; i++) {
    let a = i < 0 ? t : n[i];
    for (let [t, i] of e) !r.has(t) && i.has(a) && (r.add(t), n.push(t));
  }
  return n;
}
var wp = new WeakMap(),
  Tp = (e, t) => {
    let n = e.pieces.get(t);
    return !!n && ge(n);
  };
function Ep(e, t, n, r) {
  let i = wp.get(e);
  i || wp.set(e, (i = new Set(ce(e.layout).map((e) => e.piece))));
  let a = (t) =>
      t.ny > 0.9999 &&
      t.y > -0.01 &&
      !i.has(t.piece) &&
      !r?.(t.piece) &&
      !Tp(e, t.piece),
    o = vp(e, t, n).filter(a);
  if (!o.length) return [];
  let s = [
      [0.15, 0],
      [-0.15, 0],
      [0, 0.15],
      [0, -0.15],
    ].map(([r, i]) => vp(e, t + r, n + i).filter(a)),
    c = [];
  for (let e of o)
    (c.length && c[c.length - 1].y - e.y < 0.02) ||
      (s.every((t) =>
        t.some((t) => t.piece === e.piece && Math.abs(t.y - e.y) < 0.01),
      ) &&
        c.push({ y: Number(e.y.toFixed(3)) + 0, piece: e.piece }));
  return c;
}
