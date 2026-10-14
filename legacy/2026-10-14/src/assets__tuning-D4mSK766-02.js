// assets__tuning-D4mSK766 02 — offset
// Lines 331-644 of readable/assets__tuning-D4mSK766.pretty.js (statement-aligned).
function se(e, t, n, r, i, a) {
  let {
      maxDepth: o,
      verbose: s,
      targetLeafSize: c,
      _strictLeafSize: l = 1 / 0,
      strategy: u,
      onProgress: d,
    } = i,
    f = e.primitiveBuffer,
    p = e.primitiveBufferStride,
    m = new Float32Array(6),
    h = !1,
    g = new F();
  return (k(t, n, r, g.boundingData, m), y(g, n, r, m), g);
  function v(e) {
    d && d((e - a.offset) / a.count);
  }
  function y(e, n, r, i = null, a = 0) {
    !h &&
      a >= o &&
      ((h = !0),
      s &&
        console.warn(
          `BVH: Max depth of ${o} reached when generating BVH. Consider increasing maxDepth.`,
        ));
    let d = r > l;
    if ((r <= c && !d) || a >= o)
      return (v(n + r), (e.offset = n), (e.count = r), e);
    let g = ee(e.boundingData, i, t, n, r, u),
      b = g.axis === -1 ? -1 : te(f, p, t, n, r, g);
    if (g.axis === -1 || b === n || b === n + r) {
      if (!d) return (v(n + r), (e.offset = n), (e.count = r), e);
      ((g.axis = Math.max(0, _(e.boundingData))),
        (b = n + Math.max(1, Math.floor(r / 2))));
    }
    e.splitAxis = g.axis;
    let x = new F(),
      S = n,
      C = b - n;
    ((e.left = x), k(t, S, C, x.boundingData, m), y(x, S, C, m, a + 1));
    let w = new F(),
      T = b,
      E = r - C;
    return (
      (e.right = w),
      k(t, T, E, w.boundingData, m),
      y(w, T, E, m, a + 1),
      e
    );
  }
}
function ce(e, t) {
  let n = t.useSharedArrayBuffer ? SharedArrayBuffer : ArrayBuffer,
    r = e.getRootRanges(t.range),
    i = r[0],
    a = r[r.length - 1],
    o = { offset: i.offset, count: a.offset + a.count - i.offset },
    s = new Float32Array(6 * o.count);
  ((s.offset = o.offset),
    e.computePrimitiveBounds(o.offset, o.count, s),
    (e._roots = r.map((r) => {
      let i = se(e, s, r.offset, r.count, t, o),
        a = ie(i),
        c = new n(32 * a);
      return (ae(0, i, c), c);
    })));
}
var le = class {
    constructor(e) {
      ((this._getNewPrimitive = e), (this._primitives = []));
    }
    getPrimitive() {
      let e = this._primitives;
      return e.length === 0 ? this._getNewPrimitive() : e.pop();
    }
    releasePrimitive(e) {
      this._primitives.push(e);
    }
  },
  z = new (class {
    constructor() {
      ((this.float32Array = null),
        (this.uint16Array = null),
        (this.uint32Array = null));
      let e = [],
        t = null;
      ((this.setBuffer = (n) => {
        (t && e.push(t),
          (t = n),
          (this.float32Array = new Float32Array(n)),
          (this.uint16Array = new Uint16Array(n)),
          (this.uint32Array = new Uint32Array(n)));
      }),
        (this.clearBuffer = () => {
          ((t = null),
            (this.float32Array = null),
            (this.uint16Array = null),
            (this.uint32Array = null),
            e.length !== 0 && this.setBuffer(e.pop()));
        }));
    }
  })(),
  B,
  ue,
  de = [],
  fe = new le(() => new o());
function pe(e, t, n, r, i, a) {
  ((B = fe.getPrimitive()),
    (ue = fe.getPrimitive()),
    de.push(B, ue),
    z.setBuffer(e._roots[t]));
  let o = me(0, e.geometry, n, r, i, a);
  (z.clearBuffer(),
    fe.releasePrimitive(B),
    fe.releasePrimitive(ue),
    de.pop(),
    de.pop());
  let s = de.length;
  return (s > 0 && ((ue = de[s - 1]), (B = de[s - 2])), o);
}
function me(e, t, n, r, i = null, a = 0, o = 0) {
  let { float32Array: s, uint16Array: c, uint32Array: l } = z,
    u = e * 2;
  if (S(u, c)) {
    let t = C(e, l),
      n = w(u, c);
    return (g(O(e), s, B), r(t, n, !1, o, a + e / 8, B));
  }
  {
    let u = T(e),
      d = E(e, l),
      f = u,
      p = d,
      m,
      h,
      _,
      v;
    if (
      i &&
      ((_ = B),
      (v = ue),
      g(O(f), s, _),
      g(O(p), s, v),
      (m = i(_)),
      (h = i(v)),
      h < m)
    ) {
      ((f = d), (p = u));
      let e = m;
      ((m = h), (h = e), (_ = v));
    }
    _ || ((_ = B), g(O(f), s, _));
    let y = S(f * 2, c),
      b = n(_, y, m, o + 1, a + f / 8),
      x;
    if (b === 2) {
      let e = j(f);
      x = r(e, M(f) - e, !0, o + 1, a + f / 8, _);
    } else x = b && me(f, t, n, r, i, a, o + 1);
    if (x) return !0;
    ((v = ue), g(O(p), s, v));
    let D = S(p * 2, c),
      k = n(v, D, h, o + 1, a + p / 8),
      A;
    if (k === 2) {
      let e = j(p);
      A = r(e, M(p) - e, !0, o + 1, a + p / 8, v);
    } else A = k && me(p, t, n, r, i, a, o + 1);
    return !!A;
    function j(e) {
      let { uint16Array: t, uint32Array: n } = z,
        r = e * 2;
      for (; !S(r, t);) ((e = T(e)), (r = e * 2));
      return C(e, n);
    }
    function M(e) {
      let { uint16Array: t, uint32Array: n } = z,
        r = e * 2;
      for (; !S(r, t);) ((e = E(e, n)), (r = e * 2));
      return C(e, n) + w(r, t);
    }
  }
}
var he = new z.constructor(),
  ge = new z.constructor(),
  V = new le(() => new o()),
  _e = new o(),
  ve = new o(),
  ye = new o(),
  be = new o(),
  xe = !1;
function Se(e, t, n, i) {
  if (xe) throw Error(`MeshBVH: Recursive calls to bvhcast not supported.`);
  xe = !0;
  let a = e._roots,
    o = t._roots,
    s,
    c = 0,
    l = 0,
    u = new r().copy(n).invert();
  for (let e = 0, t = a.length; e < t; e++) {
    (he.setBuffer(a[e]), (l = 0));
    let t = V.getPrimitive();
    (g(O(0), he.float32Array, t), t.applyMatrix4(u));
    for (
      let e = 0, r = o.length;
      e < r &&
      (ge.setBuffer(o[e]),
      (s = H(0, 0, n, u, i, c, l, 0, 0, t)),
      ge.clearBuffer(),
      (l += o[e].byteLength / 32),
      !s);
      e++
    );
    if (
      (V.releasePrimitive(t), he.clearBuffer(), (c += a[e].byteLength / 32), s)
    )
      break;
  }
  return ((xe = !1), s);
}
function H(e, t, n, r, i, a = 0, o = 0, s = 0, c = 0, l = null, u = !1) {
  let d, f;
  u ? ((d = ge), (f = he)) : ((d = he), (f = ge));
  let p = d.float32Array,
    m = d.uint32Array,
    h = d.uint16Array,
    _ = f.float32Array,
    v = f.uint32Array,
    y = f.uint16Array,
    b = e * 2,
    x = t * 2,
    D = S(b, h),
    k = S(x, y),
    A = !1;
  if (k && D)
    A = u
      ? i(
          C(t, v),
          w(t * 2, y),
          C(e, m),
          w(e * 2, h),
          c,
          o + t / 8,
          s,
          a + e / 8,
        )
      : i(
          C(e, m),
          w(e * 2, h),
          C(t, v),
          w(t * 2, y),
          s,
          a + e / 8,
          c,
          o + t / 8,
        );
  else if (k) {
    let l = V.getPrimitive();
    (g(O(t), _, l), l.applyMatrix4(n));
    let d = T(e),
      f = E(e, m);
    (g(O(d), p, _e), g(O(f), p, ve));
    let h = l.intersectsBox(_e),
      v = l.intersectsBox(ve);
    ((A =
      (h && H(t, d, r, n, i, o, a, c, s + 1, l, !u)) ||
      (v && H(t, f, r, n, i, o, a, c, s + 1, l, !u))),
      V.releasePrimitive(l));
  } else {
    let d = T(t),
      f = E(t, v);
    (g(O(d), _, ye), g(O(f), _, be));
    let h = l.intersectsBox(ye),
      y = l.intersectsBox(be);
    if (h && y)
      A =
        H(e, d, n, r, i, a, o, s, c + 1, l, u) ||
        H(e, f, n, r, i, a, o, s, c + 1, l, u);
    else if (h) {
      if (D) A = H(e, d, n, r, i, a, o, s, c + 1, l, u);
      else {
        let t = V.getPrimitive();
        t.copy(ye).applyMatrix4(n);
        let l = T(e),
          f = E(e, m);
        (g(O(l), p, _e), g(O(f), p, ve));
        let h = t.intersectsBox(_e),
          _ = t.intersectsBox(ve);
        ((A =
          (h && H(d, l, r, n, i, o, a, c, s + 1, t, !u)) ||
          (_ && H(d, f, r, n, i, o, a, c, s + 1, t, !u))),
          V.releasePrimitive(t));
      }
    } else if (y) {
      if (D) A = H(e, f, n, r, i, a, o, s, c + 1, l, u);
      else {
        let t = V.getPrimitive();
        t.copy(be).applyMatrix4(n);
        let l = T(e),
          d = E(e, m);
        (g(O(l), p, _e), g(O(d), p, ve));
        let h = t.intersectsBox(_e),
          _ = t.intersectsBox(ve);
        ((A =
          (h && H(f, l, r, n, i, o, a, c, s + 1, t, !u)) ||
          (_ && H(f, d, r, n, i, o, a, c, s + 1, t, !u))),
          V.releasePrimitive(t));
      }
    }
  }
  return A;
}
