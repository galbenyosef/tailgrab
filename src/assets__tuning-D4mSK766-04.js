// assets__tuning-D4mSK766 04 — start
// Lines 956-1215 of readable/assets__tuning-D4mSK766.pretty.js (statement-aligned).
var Ie = class extends Ee {
    get indirect() {
      return !!this._indirectBuffer;
    }
    get primitiveStride() {
      return null;
    }
    get primitiveBufferStride() {
      return this.indirect ? 1 : this.primitiveStride;
    }
    set primitiveBufferStride(e) {}
    get primitiveBuffer() {
      return this.indirect ? this._indirectBuffer : this.geometry.index.array;
    }
    set primitiveBuffer(e) {}
    constructor(e, t = {}) {
      if (!e.isBufferGeometry)
        throw Error(`BVH: Only BufferGeometries are supported.`);
      if (e.index && e.index.isInterleavedBufferAttribute)
        throw Error(
          `BVH: InterleavedBufferAttribute is not supported for the index attribute.`,
        );
      if (t.useSharedArrayBuffer && !De())
        throw Error(`BVH: SharedArrayBuffer is not available.`);
      (super(),
        (this.geometry = e),
        (this.resolvePrimitiveIndex = t.indirect
          ? (e) => this._indirectBuffer[e]
          : (e) => e),
        (this.primitiveBuffer = null),
        (this.primitiveBufferStride = null),
        (this._indirectBuffer = null),
        (t = { ...h, ...t }),
        t[m] || this.init(t));
    }
    init(e) {
      let { geometry: t, primitiveStride: n } = this;
      if (e.indirect) {
        let r = Fe(Pe(t, e.range, n), e.useSharedArrayBuffer);
        this._indirectBuffer = r;
      } else je(t, e);
      (super.init(e),
        !t.boundingBox &&
          e.setBoundingBox &&
          (t.boundingBox = this.getBoundingBox(new o())));
    }
    getRootRanges(e) {
      return this.indirect
        ? [{ offset: 0, count: this._indirectBuffer.length }]
        : Pe(this.geometry, e, this.primitiveStride);
    }
    raycastObject3D() {
      throw Error(`BVH: raycastObject3D() not implemented`);
    }
  },
  U = class {
    constructor() {
      ((this.min = 1 / 0), (this.max = -1 / 0));
    }
    setFromPointsField(e, t) {
      let n = 1 / 0,
        r = -1 / 0;
      for (let i = 0, a = e.length; i < a; i++) {
        let a = e[i][t];
        ((n = a < n ? a : n), (r = a > r ? a : r));
      }
      ((this.min = n), (this.max = r));
    }
    setFromPoints(e, t) {
      let n = 1 / 0,
        r = -1 / 0;
      for (let i = 0, a = t.length; i < a; i++) {
        let a = t[i],
          o = e.dot(a);
        ((n = o < n ? o : n), (r = o > r ? o : r));
      }
      ((this.min = n), (this.max = r));
    }
    isSeparated(e) {
      return this.min > e.max || e.min > this.max;
    }
  };
U.prototype.setFromBox = (function () {
  let e = new u();
  return function (t, n) {
    let r = n.min,
      i = n.max,
      a = 1 / 0,
      o = -1 / 0;
    for (let n = 0; n <= 1; n++)
      for (let s = 0; s <= 1; s++)
        for (let c = 0; c <= 1; c++) {
          ((e.x = r.x * n + i.x * (1 - n)),
            (e.y = r.y * s + i.y * (1 - s)),
            (e.z = r.z * c + i.z * (1 - c)));
          let l = t.dot(e);
          ((a = Math.min(l, a)), (o = Math.max(l, o)));
        }
    ((this.min = a), (this.max = o));
  };
})();
var Le = (function () {
    let e = new u(),
      t = new u(),
      n = new u();
    return function (r, i, a) {
      let o = r.start,
        s = e,
        c = i.start,
        l = t;
      (n.subVectors(o, c),
        e.subVectors(r.end, r.start),
        t.subVectors(i.end, i.start));
      let u = n.dot(l),
        d = l.dot(s),
        f = l.dot(l),
        p = n.dot(s),
        m = s.dot(s) * f - d * d,
        h,
        g;
      ((h = m === 0 ? 0 : (u * d - p * f) / m),
        (g = (u + h * d) / f),
        (a.x = h),
        (a.y = g));
    };
  })(),
  Re = (function () {
    let e = new l(),
      t = new u(),
      n = new u();
    return function (r, i, a, o) {
      Le(r, i, e);
      let s = e.x,
        c = e.y;
      if (s >= 0 && s <= 1 && c >= 0 && c <= 1) {
        (r.at(s, a), i.at(c, o));
        return;
      }
      if (s >= 0 && s <= 1) {
        (c < 0 ? i.at(0, o) : i.at(1, o), r.closestPointToPoint(o, !0, a));
        return;
      }
      if (c >= 0 && c <= 1) {
        (s < 0 ? r.at(0, a) : r.at(1, a), i.closestPointToPoint(a, !0, o));
        return;
      }
      {
        let e;
        e = s < 0 ? r.start : r.end;
        let l;
        l = c < 0 ? i.start : i.end;
        let u = t,
          d = n;
        if (
          (r.closestPointToPoint(l, !0, t),
          i.closestPointToPoint(e, !0, n),
          u.distanceToSquared(l) <= d.distanceToSquared(e))
        ) {
          (a.copy(u), o.copy(l));
          return;
        }
        (a.copy(e), o.copy(d));
        return;
      }
    };
  })(),
  ze = (function () {
    let e = new u(),
      n = new u(),
      r = new t(),
      i = new c();
    return function (t, a) {
      let { radius: o, center: s } = t,
        { a: c, b: l, c: u } = a;
      if (
        ((i.start = c),
        (i.end = l),
        i.closestPointToPoint(s, !0, e).distanceTo(s) <= o ||
          ((i.start = c),
          (i.end = u),
          i.closestPointToPoint(s, !0, e).distanceTo(s) <= o) ||
          ((i.start = l),
          (i.end = u),
          i.closestPointToPoint(s, !0, e).distanceTo(s) <= o))
      )
        return !0;
      let d = a.getPlane(r);
      if (Math.abs(d.distanceToPoint(s)) <= o) {
        let e = d.projectPoint(s, n);
        if (a.containsPoint(e)) return !0;
      }
      return !1;
    };
  })(),
  Be = [`x`, `y`, `z`],
  W = 1e-15,
  Ve = W * W;
function G(e) {
  return Math.abs(e) < W;
}
var K = class extends s {
  constructor(...e) {
    (super(...e),
      (this.isExtendedTriangle = !0),
      (this.satAxes = [, , , ,].fill().map(() => new u())),
      (this.satBounds = [, , , ,].fill().map(() => new U())),
      (this.points = [this.a, this.b, this.c]),
      (this.plane = new t()),
      (this.isDegenerateIntoSegment = !1),
      (this.isDegenerateIntoPoint = !1),
      (this.degenerateSegment = new c()),
      (this.needsUpdate = !0));
  }
  intersectsSphere(e) {
    return ze(e, this);
  }
  update() {
    let e = this.a,
      t = this.b,
      n = this.c,
      r = this.points,
      i = this.satAxes,
      a = this.satBounds,
      o = i[0],
      s = a[0];
    (this.getNormal(o), s.setFromPoints(o, r));
    let c = i[1],
      l = a[1];
    (c.subVectors(e, t), l.setFromPoints(c, r));
    let u = i[2],
      d = a[2];
    (u.subVectors(t, n), d.setFromPoints(u, r));
    let f = i[3],
      p = a[3];
    (f.subVectors(n, e), p.setFromPoints(f, r));
    let m = c.length(),
      h = u.length(),
      g = f.length();
    ((this.isDegenerateIntoPoint = !1),
      (this.isDegenerateIntoSegment = !1),
      m < W
        ? h < W || g < W
          ? (this.isDegenerateIntoPoint = !0)
          : ((this.isDegenerateIntoSegment = !0),
            this.degenerateSegment.start.copy(e),
            this.degenerateSegment.end.copy(n))
        : h < W
          ? g < W
            ? (this.isDegenerateIntoPoint = !0)
            : ((this.isDegenerateIntoSegment = !0),
              this.degenerateSegment.start.copy(t),
              this.degenerateSegment.end.copy(e))
          : g < W &&
            ((this.isDegenerateIntoSegment = !0),
            this.degenerateSegment.start.copy(n),
            this.degenerateSegment.end.copy(t)),
      this.plane.setFromNormalAndCoplanarPoint(o, e),
      (this.needsUpdate = !1));
  }
};
