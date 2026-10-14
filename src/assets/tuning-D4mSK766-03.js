// assets/tuning-D4mSK766 03 — count
// Lines 645-955 of readable/assets/tuning-D4mSK766.pretty.js (statement-aligned).
var Ce = new (class {
    constructor() {
      let e = null,
        t = null,
        n = null,
        r = !1;
      ((this.root = null),
        (this.buffer = null),
        (this.uint32Array = null),
        (this.uint16Array = null),
        (this.setBVH = (i, a) => {
          if (r)
            throw Error(
              `BVHTraversalHelper: cannot call setBVH during an active traversal.`,
            );
          ((this.root = a),
            (this.buffer = e = i._roots[a]),
            (this.uint16Array = n = new Uint16Array(e)),
            (this.uint32Array = t = new Uint32Array(e)));
        }),
        (this.reset = () => {
          ((this.root = null),
            (this.buffer = e = null),
            (this.uint16Array = n = null),
            (this.uint32Array = t = null));
        }),
        (this.getRangeStart = (e) => {
          let r = e * 2;
          for (; !S(r, n);) ((e = T(e)), (r = e * 2));
          return C(e, t);
        }),
        (this.getRangeEnd = (e) => {
          let r = e * 2;
          for (; !S(r, n);) ((e = E(e, t)), (r = e * 2));
          return C(e, t) + w(r, n);
        }));
      let i = (e, r, a) => {
        let o = S(r * 2, n);
        if (!e(a, o, r) && !o) {
          let n = T(r),
            o = E(r, t);
          (i(e, n, a + 1), i(e, o, a + 1));
        }
      };
      ((this.traverseBuffer = (e) => {
        if (r)
          throw Error(
            `BVHTraversalHelper: cannot start a traversal during an active traversal.`,
          );
        r = !0;
        try {
          i(e, 0, 0);
        } finally {
          r = !1;
        }
      }),
        (this.traverse = (r) => {
          this.traverseBuffer((i, a, o) => {
            if (a) {
              let s = o * 2,
                c = t[o + 6],
                l = n[s + 14];
              return r(i, a, new Float32Array(e, o * 4, 6), c, l);
            }
            {
              let n = D(o, t);
              return r(i, a, new Float32Array(e, o * 4, 6), n);
            }
          });
        }));
    }
  })(),
  we = new o(),
  Te = new Float32Array(6),
  Ee = class {
    constructor() {
      ((this._roots = null),
        (this.primitiveBuffer = null),
        (this.primitiveBufferStride = null));
    }
    init(e) {
      ((e = { ...h, ...e }),
        `maxLeafSize` in e &&
          (console.warn(
            `BVH: "maxLeafSize" option has been deprecated. Use "targetLeafSize", instead.`,
          ),
          (e = { ...e, targetLeafSize: e.maxLeafSize })),
        ce(this, e));
    }
    getRootRanges() {
      throw Error(`BVH: getRootRanges() not implemented`);
    }
    writePrimitiveBounds() {
      throw Error(`BVH: writePrimitiveBounds() not implemented`);
    }
    writePrimitiveRangeBounds(e, t, n, r) {
      let i = 1 / 0,
        a = 1 / 0,
        o = 1 / 0,
        s = -1 / 0,
        c = -1 / 0,
        l = -1 / 0;
      for (let n = e, r = e + t; n < r; n++) {
        this.writePrimitiveBounds(n, Te, 0);
        let [e, t, r, u, d, f] = Te;
        (e < i && (i = e),
          u > s && (s = u),
          t < a && (a = t),
          d > c && (c = d),
          r < o && (o = r),
          f > l && (l = f));
      }
      return (
        (n[r + 0] = i),
        (n[r + 1] = a),
        (n[r + 2] = o),
        (n[r + 3] = s),
        (n[r + 4] = c),
        (n[r + 5] = l),
        n
      );
    }
    computePrimitiveBounds(e, t, n) {
      let r = n.offset || 0;
      for (let i = e, a = e + t; i < a; i++) {
        this.writePrimitiveBounds(i, Te, 0);
        let [e, t, a, o, s, c] = Te,
          l = (e + o) / 2,
          u = (t + s) / 2,
          d = (a + c) / 2,
          f = (o - e) / 2,
          m = (s - t) / 2,
          h = (c - a) / 2,
          g = (i - r) * 6;
        ((n[g + 0] = l),
          (n[g + 1] = f + (Math.abs(l) + f) * p),
          (n[g + 2] = u),
          (n[g + 3] = m + (Math.abs(u) + m) * p),
          (n[g + 4] = d),
          (n[g + 5] = h + (Math.abs(d) + h) * p));
      }
      return n;
    }
    shiftPrimitiveOffsets(e) {
      let t = this._indirectBuffer;
      if (t) for (let n = 0, r = t.length; n < r; n++) t[n] += e;
      else {
        let t = this._roots;
        for (let n = 0; n < t.length; n++) {
          let r = t[n],
            i = new Uint32Array(r),
            a = new Uint16Array(r),
            o = r.byteLength / 32;
          for (let t = 0; t < o; t++) {
            let n = 8 * t;
            S(2 * n, a) && (i[n + 6] += e);
          }
        }
      }
    }
    traverse(e, t = 0) {
      (Ce.setBVH(this, t), Ce.traverse(e), Ce.reset());
    }
    refit() {
      let e = this._roots;
      for (let t = 0, n = e.length; t < n; t++) {
        let n = e[t],
          r = new Uint32Array(n),
          i = new Uint16Array(n),
          a = new Float32Array(n),
          o = n.byteLength / 32;
        for (let e = o - 1; e >= 0; e--) {
          let t = e * 8,
            n = t * 2;
          if (S(n, i)) {
            let e = C(t, r),
              o = w(n, i);
            (this.writePrimitiveRangeBounds(e, o, Te, 0), a.set(Te, t));
          } else {
            let e = T(t),
              n = E(t, r);
            for (let r = 0; r < 3; r++) {
              let i = a[e + r],
                o = a[e + r + 3],
                s = a[n + r],
                c = a[n + r + 3];
              ((a[t + r] = i < s ? i : s), (a[t + r + 3] = o > c ? o : c));
            }
          }
        }
      }
    }
    getBoundingBox(e) {
      return (
        e.makeEmpty(),
        this._roots.forEach((t) => {
          (g(0, new Float32Array(t), we), e.union(we));
        }),
        e
      );
    }
    shapecast(e) {
      let {
        boundsTraverseOrder: t,
        intersectsBounds: n,
        intersectsRange: r,
        intersectsPrimitive: i,
        scratchPrimitive: a,
        iterate: o,
      } = e;
      if (r && i) {
        let e = r;
        r = (t, n, r, s, c) =>
          e(t, n, r, s, c) ? !0 : o(t, n, this, i, r, s, a);
      } else
        r ||= i ? (e, t, n, r) => o(e, t, this, i, n, r, a) : (e, t, n) => n;
      let s = !1,
        c = 0,
        l = this._roots;
      for (let e = 0, i = l.length; e < i; e++) {
        let i = l[e];
        if (((s = pe(this, e, n, r, t, c)), s)) break;
        c += i.byteLength / 32;
      }
      return s;
    }
    bvhcast(e, t, n) {
      let { intersectsRanges: r } = n;
      return Se(this, e, t, r);
    }
  };
function De() {
  return typeof SharedArrayBuffer < `u`;
}
function Oe(e) {
  return e.index ? e.index.count : e.attributes.position.count;
}
function ke(e) {
  return Oe(e) / 3;
}
function Ae(e, t = ArrayBuffer) {
  return e > 65535
    ? new Uint32Array(new t(4 * e))
    : new Uint16Array(new t(2 * e));
}
function je(e, t) {
  if (!e.index) {
    let n = e.attributes.position.count,
      r = Ae(n, t.useSharedArrayBuffer ? SharedArrayBuffer : ArrayBuffer);
    e.setIndex(new i(r, 1));
    for (let e = 0; e < n; e++) r[e] = e;
  }
}
function Me(e, t, n) {
  let r = Oe(e) / n,
    i = t || e.drawRange,
    a = i.start / n,
    o = (i.start + i.count) / n,
    s = Math.max(0, a),
    c = Math.min(r, o) - s;
  return { offset: Math.floor(s), count: Math.floor(c) };
}
function Ne(e, t) {
  return e.groups.map((e) => ({ offset: e.start / t, count: e.count / t }));
}
function Pe(e, t, n) {
  let r = Me(e, t, n),
    i = Ne(e, n);
  if (!i.length) return [r];
  let a = [],
    o = r.offset,
    s = r.offset + r.count,
    c = Oe(e) / n,
    l = [];
  for (let e of i) {
    let { offset: t, count: n } = e,
      r = t,
      i = t + (isFinite(n) ? n : c - t);
    r < s &&
      i > o &&
      (l.push({ pos: Math.max(o, r), isStart: !0 }),
      l.push({ pos: Math.min(s, i), isStart: !1 }));
  }
  l.sort((e, t) =>
    e.pos === t.pos ? (e.type === `end` ? -1 : 1) : e.pos - t.pos,
  );
  let u = 0,
    d = null;
  for (let e of l) {
    let t = e.pos;
    (u !== 0 && t !== d && a.push({ offset: d, count: t - d }),
      (u += e.isStart ? 1 : -1),
      (d = t));
  }
  return a;
}
function Fe(e, t) {
  let n = e[e.length - 1],
    r = n.offset + n.count > 2 ** 16,
    i = e.reduce((e, t) => e + t.count, 0),
    a = r ? 4 : 2,
    o = t ? new SharedArrayBuffer(i * a) : new ArrayBuffer(i * a),
    s = r ? new Uint32Array(o) : new Uint16Array(o),
    c = 0;
  for (let t = 0; t < e.length; t++) {
    let { offset: n, count: r } = e[t];
    for (let e = 0; e < r; e++) s[c + e] = n + e;
    c += r;
  }
  return s;
}
