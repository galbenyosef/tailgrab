// assets__tuning-D4mSK766 06 — copy
// Lines 1524-1857 of readable/assets__tuning-D4mSK766.pretty.js (statement-aligned).
((q.prototype.update = (function () {
  return function () {
    let e = this.matrix,
      t = this.min,
      n = this.max,
      r = this.points;
    for (let i = 0; i <= 1; i++)
      for (let a = 0; a <= 1; a++)
        for (let o = 0; o <= 1; o++) {
          let s = r[(1 * i) | (2 * a) | (4 * o)];
          ((s.x = i ? n.x : t.x),
            (s.y = a ? n.y : t.y),
            (s.z = o ? n.z : t.z),
            s.applyMatrix4(e));
        }
    let i = this.satBounds,
      a = this.satAxes,
      o = r[0];
    for (let e = 0; e < 3; e++) {
      let t = a[e],
        n = i[e],
        s = r[1 << e];
      (t.subVectors(o, s), n.setFromPoints(t, r));
    }
    let s = this.alignedSatBounds;
    (s[0].setFromPointsField(r, `x`),
      s[1].setFromPointsField(r, `y`),
      s[2].setFromPointsField(r, `z`),
      this.invMatrix.copy(this.matrix).invert(),
      (this.needsUpdate = !1));
  };
})()),
  (q.prototype.intersectsBox = (function () {
    let e = new U();
    return function (t) {
      this.needsUpdate && this.update();
      let n = t.min,
        r = t.max,
        i = this.satBounds,
        a = this.satAxes,
        o = this.alignedSatBounds;
      if (
        ((e.min = n.x),
        (e.max = r.x),
        o[0].isSeparated(e) ||
          ((e.min = n.y), (e.max = r.y), o[1].isSeparated(e)) ||
          ((e.min = n.z), (e.max = r.z), o[2].isSeparated(e)))
      )
        return !1;
      for (let n = 0; n < 3; n++) {
        let r = a[n],
          o = i[n];
        if ((e.setFromBox(r, t), o.isSeparated(e))) return !1;
      }
      return !0;
    };
  })()),
  (q.prototype.intersectsTriangle = (function () {
    let e = new K(),
      t = [, , ,],
      n = new U(),
      r = new U(),
      i = new u();
    return function (a) {
      (this.needsUpdate && this.update(),
        a.isExtendedTriangle
          ? a.needsUpdate && a.update()
          : (e.copy(a), e.update(), (a = e)));
      let o = this.satBounds,
        s = this.satAxes;
      ((t[0] = a.a), (t[1] = a.b), (t[2] = a.c));
      for (let e = 0; e < 3; e++) {
        let r = o[e],
          i = s[e];
        if ((n.setFromPoints(i, t), r.isSeparated(n))) return !1;
      }
      let c = a.satBounds,
        l = a.satAxes,
        u = this.points;
      for (let e = 0; e < 3; e++) {
        let t = c[e],
          r = l[e];
        if ((n.setFromPoints(r, u), t.isSeparated(n))) return !1;
      }
      for (let e = 0; e < 3; e++) {
        let a = s[e];
        for (let e = 0; e < 4; e++) {
          let o = l[e];
          if (
            (i.crossVectors(a, o),
            n.setFromPoints(i, t),
            r.setFromPoints(i, u),
            n.isSeparated(r))
          )
            return !1;
        }
      }
      return !0;
    };
  })()),
  (q.prototype.closestPointToPoint = (function () {
    return function (e, t) {
      return (
        this.needsUpdate && this.update(),
        t
          .copy(e)
          .applyMatrix4(this.invMatrix)
          .clamp(this.min, this.max)
          .applyMatrix4(this.matrix),
        t
      );
    };
  })()),
  (q.prototype.distanceToPoint = (function () {
    let e = new u();
    return function (t) {
      return (this.closestPointToPoint(t, e), t.distanceTo(e));
    };
  })()),
  (q.prototype.distanceToBox = (function () {
    let e = [`x`, `y`, `z`],
      t = Array(12)
        .fill()
        .map(() => new c()),
      n = Array(12)
        .fill()
        .map(() => new c()),
      r = new u(),
      i = new u();
    return function (a, o = 0, s = null, c = null) {
      if ((this.needsUpdate && this.update(), this.intersectsBox(a)))
        return (
          (s || c) &&
            (a.getCenter(i),
            this.closestPointToPoint(i, r),
            a.closestPointToPoint(r, i),
            s && s.copy(r),
            c && c.copy(i)),
          0
        );
      let l = o * o,
        u = a.min,
        d = a.max,
        f = this.points,
        p = 1 / 0;
      for (let e = 0; e < 8; e++) {
        let t = f[e];
        i.copy(t).clamp(u, d);
        let n = t.distanceToSquared(i);
        if (n < p && ((p = n), s && s.copy(t), c && c.copy(i), n < l))
          return Math.sqrt(n);
      }
      let m = 0;
      for (let r = 0; r < 3; r++)
        for (let i = 0; i <= 1; i++)
          for (let a = 0; a <= 1; a++) {
            let o = (r + 1) % 3,
              s = (r + 2) % 3,
              c = (i << o) | (a << s),
              l = (1 << r) | (i << o) | (a << s),
              p = f[c],
              h = f[l];
            t[m].set(p, h);
            let g = e[r],
              _ = e[o],
              v = e[s],
              y = n[m],
              b = y.start,
              x = y.end;
            ((b[g] = u[g]),
              (b[_] = i ? u[_] : d[_]),
              (b[v] = a ? u[v] : d[_]),
              (x[g] = d[g]),
              (x[_] = i ? u[_] : d[_]),
              (x[v] = a ? u[v] : d[_]),
              m++);
          }
      for (let e = 0; e <= 1; e++)
        for (let t = 0; t <= 1; t++)
          for (let n = 0; n <= 1; n++) {
            ((i.x = e ? d.x : u.x),
              (i.y = t ? d.y : u.y),
              (i.z = n ? d.z : u.z),
              this.closestPointToPoint(i, r));
            let a = i.distanceToSquared(r);
            if (a < p && ((p = a), s && s.copy(r), c && c.copy(i), a < l))
              return Math.sqrt(a);
          }
      for (let e = 0; e < 12; e++) {
        let a = t[e];
        for (let e = 0; e < 12; e++) {
          let t = n[e];
          Re(a, t, r, i);
          let o = r.distanceToSquared(i);
          if (o < p && ((p = o), s && s.copy(r), c && c.copy(i), o < l))
            return Math.sqrt(o);
        }
      }
      return Math.sqrt(p);
    };
  })()));
var J = new (class extends le {
    constructor() {
      super(() => new K());
    }
  })(),
  He = new u(),
  Ue = new u();
function We(e, t, n = {}, r = 0, i = 1 / 0) {
  let a = r * r,
    o = i * i,
    s = 1 / 0,
    c = null;
  if (
    (e.shapecast({
      boundsTraverseOrder: (e) => (
        He.copy(t).clamp(e.min, e.max),
        He.distanceToSquared(t)
      ),
      intersectsBounds: (e, t, n) => n < s && n < o,
      intersectsTriangle: (e, n) => {
        e.closestPointToPoint(t, He);
        let r = t.distanceToSquared(He);
        return (r < s && (Ue.copy(He), (s = r), (c = n)), r < a);
      },
    }),
    s === 1 / 0)
  )
    return null;
  let l = Math.sqrt(s);
  return (
    n.point ? n.point.copy(Ue) : (n.point = Ue.clone()),
    (n.distance = l),
    (n.faceIndex = c),
    n
  );
}
var Ge = !0,
  Y = new u(),
  X = new u(),
  Z = new u(),
  Ke = new l(),
  qe = new l(),
  Je = new l(),
  Ye = new u(),
  Xe = new u(),
  Ze = new u(),
  Qe = new u();
function $e(e, t, n, r, i, a, o, s) {
  let c;
  if (
    ((c =
      a === 1
        ? e.intersectTriangle(r, n, t, !0, i)
        : e.intersectTriangle(t, n, r, a !== 2, i)),
    c === null)
  )
    return null;
  let l = e.origin.distanceTo(i);
  return l < o || l > s ? null : { distance: l, point: i.clone() };
}
function et(e, t, n, r, i, a, o, c, d, f, p) {
  (Y.fromBufferAttribute(t, a),
    X.fromBufferAttribute(t, o),
    Z.fromBufferAttribute(t, c));
  let m = $e(e, Y, X, Z, Qe, d, f, p);
  if (m) {
    if (r) {
      (Ke.fromBufferAttribute(r, a),
        qe.fromBufferAttribute(r, o),
        Je.fromBufferAttribute(r, c),
        (m.uv = new l()));
      let e = s.getInterpolation(Qe, Y, X, Z, Ke, qe, Je, m.uv);
      Ge || (m.uv = e);
    }
    if (i) {
      (Ke.fromBufferAttribute(i, a),
        qe.fromBufferAttribute(i, o),
        Je.fromBufferAttribute(i, c),
        (m.uv1 = new l()));
      let e = s.getInterpolation(Qe, Y, X, Z, Ke, qe, Je, m.uv1);
      Ge || (m.uv1 = e);
    }
    if (n) {
      (Ye.fromBufferAttribute(n, a),
        Xe.fromBufferAttribute(n, o),
        Ze.fromBufferAttribute(n, c),
        (m.normal = new u()));
      let t = s.getInterpolation(Qe, Y, X, Z, Ye, Xe, Ze, m.normal);
      (m.normal.dot(e.direction) > 0 && m.normal.multiplyScalar(-1),
        Ge || (m.normal = t));
    }
    let t = { a, b: o, c, normal: new u(), materialIndex: 0 };
    if ((s.getNormal(Y, X, Z, t.normal), (m.face = t), (m.faceIndex = a), Ge)) {
      let e = new u();
      (s.getBarycoord(Qe, Y, X, Z, e), (m.barycoord = e));
    }
  }
  return m;
}
function tt(e) {
  return e && e.isMaterial ? e.side : e;
}
function nt(e, t, n, r, i, a, o) {
  let s = r * 3,
    c = s + 0,
    l = s + 1,
    u = s + 2,
    { index: d, groups: f } = e;
  e.index && ((c = d.getX(c)), (l = d.getX(l)), (u = d.getX(u)));
  let { position: p, normal: m, uv: h, uv1: g } = e.attributes;
  if (Array.isArray(t)) {
    let e = r * 3;
    for (let s = 0, d = f.length; s < d; s++) {
      let { start: d, count: _, materialIndex: v } = f[s];
      if (e >= d && e < d + _) {
        let e = tt(t[v]),
          s = et(n, p, m, h, g, c, l, u, e, a, o);
        if (s) {
          if (((s.faceIndex = r), (s.face.materialIndex = v), i)) i.push(s);
          else return s;
        }
      }
    }
  } else {
    let e = tt(t),
      s = et(n, p, m, h, g, c, l, u, e, a, o);
    if (s) {
      if (((s.faceIndex = r), (s.face.materialIndex = 0), i)) i.push(s);
      else return s;
    }
  }
  return null;
}
