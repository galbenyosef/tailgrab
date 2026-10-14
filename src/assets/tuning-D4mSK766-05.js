// assets/tuning-D4mSK766 05 — copy
// Lines 1216-1523 of readable/assets/tuning-D4mSK766.pretty.js (statement-aligned).
((K.prototype.closestPointToSegment = (function () {
  let e = new u(),
    t = new u(),
    n = new c();
  return function (r, i = null, a = null) {
    let { start: o, end: s } = r,
      c = this.points,
      l,
      u = 1 / 0;
    for (let o = 0; o < 3; o++) {
      let s = (o + 1) % 3;
      (n.start.copy(c[o]),
        n.end.copy(c[s]),
        Re(n, r, e, t),
        (l = e.distanceToSquared(t)),
        l < u && ((u = l), i && i.copy(e), a && a.copy(t)));
    }
    return (
      this.closestPointToPoint(o, e),
      (l = o.distanceToSquared(e)),
      l < u && ((u = l), i && i.copy(e), a && a.copy(o)),
      this.closestPointToPoint(s, e),
      (l = s.distanceToSquared(e)),
      l < u && ((u = l), i && i.copy(e), a && a.copy(s)),
      Math.sqrt(u)
    );
  };
})()),
  (K.prototype.intersectsTriangle = (function () {
    let e = new K(),
      t = new U(),
      n = new U(),
      r = new u(),
      i = new u(),
      a = new u(),
      o = new u(),
      s = new c(),
      d = new c(),
      f = new u(),
      p = new l(),
      m = new l();
    function h(e, i, a, s) {
      let c = r;
      !e.isDegenerateIntoPoint && !e.isDegenerateIntoSegment
        ? c.copy(e.plane.normal)
        : c.copy(i.plane.normal);
      let l = e.satBounds,
        u = e.satAxes;
      for (let r = 1; r < 4; r++) {
        let a = l[r],
          s = u[r];
        if (
          (t.setFromPoints(s, i.points),
          a.isSeparated(t) ||
            (o.copy(c).cross(s),
            t.setFromPoints(o, e.points),
            n.setFromPoints(o, i.points),
            t.isSeparated(n)))
        )
          return !1;
      }
      let d = i.satBounds,
        f = i.satAxes;
      for (let r = 1; r < 4; r++) {
        let a = d[r],
          s = f[r];
        if (
          (t.setFromPoints(s, e.points),
          a.isSeparated(t) ||
            (o.crossVectors(c, s),
            t.setFromPoints(o, e.points),
            n.setFromPoints(o, i.points),
            t.isSeparated(n)))
        )
          return !1;
      }
      return (
        a &&
          (s ||
            console.warn(
              `ExtendedTriangle.intersectsTriangle: Triangles are coplanar which does not support an output edge. Setting edge to 0, 0, 0.`,
            ),
          a.start.set(0, 0, 0),
          a.end.set(0, 0, 0)),
        !0
      );
    }
    function g(e, t, n, r, i, a, o, s, c, l, u) {
      let d = o / (o - s);
      ((l.x = r + (i - r) * d),
        u.start.subVectors(t, e).multiplyScalar(d).add(e),
        (d = o / (o - c)),
        (l.y = r + (a - r) * d),
        u.end.subVectors(n, e).multiplyScalar(d).add(e));
    }
    function _(e, t, n, r, i, a, o, s, c, l, u) {
      if (i > 0) g(e.c, e.a, e.b, r, t, n, c, o, s, l, u);
      else if (a > 0) g(e.b, e.a, e.c, n, t, r, s, o, c, l, u);
      else if (s * c > 0 || o != 0) g(e.a, e.b, e.c, t, n, r, o, s, c, l, u);
      else if (s != 0) g(e.b, e.a, e.c, n, t, r, s, o, c, l, u);
      else if (c != 0) g(e.c, e.a, e.b, r, t, n, c, o, s, l, u);
      else return !0;
      return !1;
    }
    function v(e, t, n, i) {
      let a = t.degenerateSegment,
        o = e.plane.distanceToPoint(a.start),
        s = e.plane.distanceToPoint(a.end);
      return G(o)
        ? G(s)
          ? h(e, t, n, i)
          : (n && (n.start.copy(a.start), n.end.copy(a.start)),
            e.containsPoint(a.start))
        : G(s)
          ? (n && (n.start.copy(a.end), n.end.copy(a.end)),
            e.containsPoint(a.end))
          : e.plane.intersectLine(a, r) != null &&
            (n && (n.start.copy(r), n.end.copy(r)), e.containsPoint(r));
    }
    function y(e, t, n) {
      let r = t.a;
      return G(e.plane.distanceToPoint(r)) && e.containsPoint(r)
        ? (n && (n.start.copy(r), n.end.copy(r)), !0)
        : !1;
    }
    function b(e, t, n) {
      let i = e.degenerateSegment,
        a = t.a;
      return (
        i.closestPointToPoint(a, !0, r),
        a.distanceToSquared(r) < Ve &&
          (n && (n.start.copy(a), n.end.copy(a)), !0)
      );
    }
    function x(e, t, n, o) {
      if (e.isDegenerateIntoSegment) {
        if (t.isDegenerateIntoSegment) {
          let o = e.degenerateSegment,
            s = t.degenerateSegment,
            c = i,
            l = a;
          (o.delta(c), s.delta(l));
          let u = r.subVectors(s.start, o.start),
            d = c.x * l.y - c.y * l.x;
          if (G(d)) return !1;
          let f = (u.x * l.y - u.y * l.x) / d,
            p = -(c.x * u.y - c.y * u.x) / d;
          return f < 0 || f > 1 || p < 0 || p > 1
            ? !1
            : G(o.start.z + c.z * f - (s.start.z + l.z * p))
              ? (n &&
                  (n.start.copy(o.start).addScaledVector(c, f),
                  n.end.copy(o.start).addScaledVector(c, f)),
                !0)
              : !1;
        }
        return t.isDegenerateIntoPoint ? b(e, t, n) : v(t, e, n, o);
      }
      if (e.isDegenerateIntoPoint)
        return t.isDegenerateIntoPoint
          ? t.a.distanceToSquared(e.a) < Ve &&
              (n && (n.start.copy(e.a), n.end.copy(e.a)), !0)
          : t.isDegenerateIntoSegment
            ? b(t, e, n)
            : y(t, e, n);
      if (t.isDegenerateIntoPoint) return y(e, t, n);
      if (t.isDegenerateIntoSegment) return v(e, t, n, o);
    }
    return function (t, n = null, r = !1) {
      (this.needsUpdate && this.update(),
        t.isExtendedTriangle
          ? t.needsUpdate && t.update()
          : (e.copy(t), e.update(), (t = e)));
      let o = x(this, t, n, r);
      if (o !== void 0) return o;
      let c = this.plane,
        l = t.plane,
        u = l.distanceToPoint(this.a),
        g = l.distanceToPoint(this.b),
        v = l.distanceToPoint(this.c);
      (G(u) && (u = 0), G(g) && (g = 0), G(v) && (v = 0));
      let y = u * g,
        b = u * v;
      if (y > 0 && b > 0) return !1;
      let S = c.distanceToPoint(t.a),
        C = c.distanceToPoint(t.b),
        w = c.distanceToPoint(t.c);
      (G(S) && (S = 0), G(C) && (C = 0), G(w) && (w = 0));
      let T = S * C,
        E = S * w;
      if (T > 0 && E > 0) return !1;
      (i.copy(c.normal), a.copy(l.normal));
      let D = i.cross(a),
        O = 0,
        k = Math.abs(D.x),
        A = Math.abs(D.y);
      (A > k && ((k = A), (O = 1)), Math.abs(D.z) > k && (O = 2));
      let j = Be[O],
        M = this.a[j],
        N = this.b[j],
        ee = this.c[j],
        P = t.a[j],
        F = t.b[j],
        te = t.c[j];
      if (
        _(this, M, N, ee, y, b, u, g, v, p, s) ||
        _(t, P, F, te, T, E, S, C, w, m, d)
      )
        return h(this, t, n, r);
      if (p.y < p.x) {
        let e = p.y;
        ((p.y = p.x),
          (p.x = e),
          f.copy(s.start),
          s.start.copy(s.end),
          s.end.copy(f));
      }
      if (m.y < m.x) {
        let e = m.y;
        ((m.y = m.x),
          (m.x = e),
          f.copy(d.start),
          d.start.copy(d.end),
          d.end.copy(f));
      }
      return p.y < m.x || m.y < p.x
        ? !1
        : (n &&
            (m.x > p.x ? n.start.copy(d.start) : n.start.copy(s.start),
            m.y < p.y ? n.end.copy(d.end) : n.end.copy(s.end)),
          !0);
    };
  })()),
  (K.prototype.distanceToPoint = (function () {
    let e = new u();
    return function (t) {
      return (this.closestPointToPoint(t, e), t.distanceTo(e));
    };
  })()),
  (K.prototype.distanceToTriangle = (function () {
    let e = new u(),
      t = new u(),
      n = [`a`, `b`, `c`],
      r = new c(),
      i = new c();
    return function (a, o = null, s = null) {
      let c = o || s ? r : null;
      if (this.intersectsTriangle(a, c, !0))
        return ((o || s) && (o && c.getCenter(o), s && c.getCenter(s)), 0);
      let l = 1 / 0;
      for (let t = 0; t < 3; t++) {
        let r,
          i = n[t],
          c = a[i];
        (this.closestPointToPoint(c, e),
          (r = c.distanceToSquared(e)),
          r < l && ((l = r), o && o.copy(e), s && s.copy(c)));
        let u = this[i];
        (a.closestPointToPoint(u, e),
          (r = u.distanceToSquared(e)),
          r < l && ((l = r), o && o.copy(u), s && s.copy(e)));
      }
      for (let c = 0; c < 3; c++) {
        let u = n[c],
          d = n[(c + 1) % 3];
        r.set(this[u], this[d]);
        for (let c = 0; c < 3; c++) {
          let u = n[c],
            d = n[(c + 1) % 3];
          (i.set(a[u], a[d]), Re(r, i, e, t));
          let f = e.distanceToSquared(t);
          f < l && ((l = f), o && o.copy(e), s && s.copy(t));
        }
      }
      return Math.sqrt(l);
    };
  })()));
var q = class {
  constructor(e, t, n) {
    ((this.isOrientedBox = !0),
      (this.min = new u()),
      (this.max = new u()),
      (this.matrix = new r()),
      (this.invMatrix = new r()),
      (this.points = Array(8)
        .fill()
        .map(() => new u())),
      (this.satAxes = [, , ,].fill().map(() => new u())),
      (this.satBounds = [, , ,].fill().map(() => new U())),
      (this.alignedSatBounds = [, , ,].fill().map(() => new U())),
      (this.needsUpdate = !1),
      e && this.min.copy(e),
      t && this.max.copy(t),
      n && this.matrix.copy(n));
  }
  set(e, t, n) {
    (this.min.copy(e),
      this.max.copy(t),
      this.matrix.copy(n),
      (this.needsUpdate = !0));
  }
  copy(e) {
    (this.min.copy(e.min),
      this.max.copy(e.max),
      this.matrix.copy(e.matrix),
      (this.needsUpdate = !0));
  }
};
