// assets/tuning-D4mSK766 10 — index
// Lines 2604-2886 of readable/assets/tuning-D4mSK766.pretty.js (statement-aligned).
var en = new q(),
  tn = new e(),
  nn = new u(),
  rn = new r(),
  an = new u(),
  on = [`getX`, `getY`, `getZ`],
  sn = class e extends Ie {
    static serialize(e, t = {}) {
      t = { cloneBuffers: !0, ...t };
      let n = e.geometry,
        r = e._roots,
        i = e._indirectBuffer,
        a = n.getIndex(),
        o = { version: 1, roots: null, index: null, indirectBuffer: null };
      return (
        t.cloneBuffers
          ? ((o.roots = r.map((e) => e.slice())),
            (o.index = a ? a.array.slice() : null),
            (o.indirectBuffer = i ? i.slice() : null))
          : ((o.roots = r),
            (o.index = a ? a.array : null),
            (o.indirectBuffer = i)),
        o
      );
    }
    static deserialize(t, n, r = {}) {
      r = { setIndex: !0, indirect: !!t.indirectBuffer, ...r };
      let { index: a, roots: o, indirectBuffer: s } = t;
      t.version ||
        (console.warn(
          `MeshBVH.deserialize: Serialization format has been changed and will be fixed up. It is recommended to regenerate any stored serialized data.`,
        ),
        l(o));
      let c = new e(n, { ...r, [m]: !0 });
      if (((c._roots = o), (c._indirectBuffer = s || null), r.setIndex)) {
        let e = n.getIndex();
        if (e === null) {
          let e = new i(t.index, 1, !1);
          n.setIndex(e);
        } else e.array !== a && (e.array.set(a), (e.needsUpdate = !0));
      }
      return c;
      function l(e) {
        for (let t = 0; t < e.length; t++) {
          let n = e[t],
            r = new Uint32Array(n),
            i = new Uint16Array(n);
          for (let e = 0, t = n.byteLength / 32; e < t; e++) {
            let t = 8 * e;
            S(2 * t, i) || (r[t + 6] = r[t + 6] / 8 - e);
          }
        }
      }
    }
    get primitiveStride() {
      return 3;
    }
    get resolveTriangleIndex() {
      return this.resolvePrimitiveIndex;
    }
    constructor(e, t = {}) {
      (t.maxLeafTris &&
        (console.warn(
          `MeshBVH: "maxLeafTris" option has been deprecated. Use "targetLeafSize", instead.`,
        ),
        (t = { ...t, targetLeafSize: t.maxLeafTris })),
        super(e, t));
    }
    shiftTriangleOffsets(e) {
      return super.shiftPrimitiveOffsets(e);
    }
    writePrimitiveBounds(e, t, n) {
      let r = this.geometry,
        i = this._indirectBuffer,
        a = r.attributes.position,
        o = r.index ? r.index.array : null,
        s = (i ? i[e] : e) * 3,
        c = s + 0,
        l = s + 1,
        u = s + 2;
      o && ((c = o[c]), (l = o[l]), (u = o[u]));
      for (let e = 0; e < 3; e++) {
        let r = a[on[e]](c),
          i = a[on[e]](l),
          o = a[on[e]](u),
          s = r;
        (i < s && (s = i), o < s && (s = o));
        let d = r;
        (i > d && (d = i),
          o > d && (d = o),
          (t[n + e] = s),
          (t[n + e + 3] = d));
      }
      return t;
    }
    computePrimitiveBounds(e, t, n) {
      let r = this.geometry,
        i = this._indirectBuffer,
        a = r.attributes.position,
        o = r.index ? r.index.array : null,
        s = a.normalized;
      if (e < 0 || t + e - n.offset > n.length / 6)
        throw Error(`MeshBVH: compute triangle bounds range is invalid.`);
      let c = a.array,
        l = a.offset || 0,
        u = 3;
      a.isInterleavedBufferAttribute && (u = a.data.stride);
      let d = [`getX`, `getY`, `getZ`],
        f = n.offset;
      for (let r = e, m = e + t; r < m; r++) {
        let e = (i ? i[r] : r) * 3,
          t = (r - f) * 6,
          m = e + 0,
          h = e + 1,
          g = e + 2;
        (o && ((m = o[m]), (h = o[h]), (g = o[g])),
          s || ((m = m * u + l), (h = h * u + l), (g = g * u + l)));
        for (let e = 0; e < 3; e++) {
          let r, i, o;
          s
            ? ((r = a[d[e]](m)), (i = a[d[e]](h)), (o = a[d[e]](g)))
            : ((r = c[m + e]), (i = c[h + e]), (o = c[g + e]));
          let l = r;
          (i < l && (l = i), o < l && (l = o));
          let u = r;
          (i > u && (u = i), o > u && (u = o));
          let f = (u - l) / 2,
            _ = e * 2;
          ((n[t + _ + 0] = l + f), (n[t + _ + 1] = f + (Math.abs(l) + f) * p));
        }
      }
      return n;
    }
    raycastObject3D(e, t, n = []) {
      let { material: r } = e;
      if (r === void 0) return;
      (rn.copy(e.matrixWorld).invert(),
        tn.copy(t.ray).applyMatrix4(rn),
        an.setFromMatrixScale(e.matrixWorld),
        nn.copy(tn.direction).multiply(an));
      let i = nn.length(),
        a = t.near / i,
        o = t.far / i;
      if (t.firstHitOnly === !0) {
        let i = this.raycastFirst(tn, r, a, o);
        ((i = $t(i, e, t)), i && n.push(i));
      } else {
        let i = this.raycast(tn, r, a, o);
        for (let r = 0, a = i.length; r < a; r++) {
          let a = $t(i[r], e, t);
          a && n.push(a);
        }
      }
      return n;
    }
    refit(e = null) {
      return (this.indirect ? jt : ot)(this, e);
    }
    raycast(e, t = 0, n = 0, r = 1 / 0) {
      let i = this._roots,
        a = [],
        o = this.indirect ? Mt : ut;
      for (let s = 0, c = i.length; s < c; s++) o(this, s, t, e, a, n, r);
      return a;
    }
    raycastFirst(e, t = 0, n = 0, r = 1 / 0) {
      let i = this._roots,
        a = null,
        o = this.indirect ? Ft : pt;
      for (let s = 0, c = i.length; s < c; s++) {
        let i = o(this, s, t, e, n, r);
        i != null && (a == null || i.distance < a.distance) && (a = i);
      }
      return a;
    }
    intersectsGeometry(e, t) {
      let n = !1,
        r = this._roots,
        i = this.indirect ? Ut : xt;
      for (let a = 0, o = r.length; a < o && ((n = i(this, a, e, t)), !n); a++);
      return n;
    }
    shapecast(e) {
      let t = J.getPrimitive(),
        n = super.shapecast({
          ...e,
          intersectsPrimitive: e.intersectsTriangle,
          scratchPrimitive: t,
          iterate: this.indirect ? lt : at,
        });
      return (J.releasePrimitive(t), n);
    }
    bvhcast(t, n, r) {
      let { intersectsRanges: i, intersectsTriangles: a } = r,
        o = J.getPrimitive(),
        s = this.geometry.index,
        c = this.geometry.attributes.position,
        l = this.indirect
          ? (e) => {
              let t = this.resolveTriangleIndex(e);
              Q(o, t * 3, s, c);
            }
          : (e) => {
              Q(o, e * 3, s, c);
            },
        u = J.getPrimitive(),
        d = t.geometry.index,
        f = t.geometry.attributes.position,
        p = t.indirect
          ? (e) => {
              let n = t.resolveTriangleIndex(e);
              Q(u, n * 3, d, f);
            }
          : (e) => {
              Q(u, e * 3, d, f);
            };
      if (a) {
        if (!(t instanceof e))
          throw Error(
            `MeshBVH: "intersectsTriangles" callback can only be used with another MeshBVH.`,
          );
        let r = (e, t, r, i, s, c, d, f) => {
          for (let m = r, h = r + i; m < h; m++) {
            (p(m),
              u.a.applyMatrix4(n),
              u.b.applyMatrix4(n),
              u.c.applyMatrix4(n),
              (u.needsUpdate = !0));
            for (let n = e, r = e + t; n < r; n++)
              if ((l(n), (o.needsUpdate = !0), a(o, u, n, m, s, c, d, f)))
                return !0;
          }
          return !1;
        };
        if (i) {
          let e = i;
          i = function (t, n, i, a, o, s, c, l) {
            return e(t, n, i, a, o, s, c, l) ? !0 : r(t, n, i, a, o, s, c, l);
          };
        } else i = r;
      }
      return super.bvhcast(t, n, { intersectsRanges: i });
    }
    intersectsBox(e, t) {
      return (
        en.set(e.min, e.max, t),
        (en.needsUpdate = !0),
        this.shapecast({
          intersectsBounds: (e) => en.intersectsBox(e),
          intersectsTriangle: (e) => en.intersectsTriangle(e),
        })
      );
    }
    intersectsSphere(e) {
      return this.shapecast({
        intersectsBounds: (t) => e.intersectsBox(t),
        intersectsTriangle: (t) => t.intersectsSphere(e),
      });
    }
    closestPointToGeometry(e, t, n = {}, r = {}, i = 0, a = 1 / 0) {
      return (this.indirect ? Qt : At)(this, e, t, n, r, i, a);
    }
    closestPointToPoint(e, t = {}, n = 0, r = 1 / 0) {
      return We(this, e, t, n, r);
    }
  },
  cn = { RAIL: 1, LOOSE: 2 };
function ln() {
  return {
    dist: 0,
    px: 0,
    py: 0,
    pz: 0,
    nx: 0,
    ny: 1,
    nz: 0,
    piece: 0,
    surf: 0,
  };
}
function un() {
  return { dx: 0, dy: 0, dz: 0, nx: 0, ny: 0, nz: 0, surf: 0 };
}
