// assets__tuning-D4mSK766 08 — applymatrix4
// Lines 2188-2498 of readable/assets__tuning-D4mSK766.pretty.js (statement-aligned).
function At(e, t, n, r = {}, i = {}, a = 0, o = 1 / 0) {
  (t.boundingBox || t.computeBoundingBox(),
    wt.set(t.boundingBox.min, t.boundingBox.max, n),
    (wt.needsUpdate = !0));
  let s = e.geometry,
    c = s.attributes.position,
    l = s.index,
    u = t.attributes.position,
    d = t.index,
    f = J.getPrimitive(),
    p = J.getPrimitive(),
    m = Et,
    h = Dt,
    g = null,
    _ = null;
  i && ((g = Ot), (_ = kt));
  let v = 1 / 0,
    y = null,
    b = null;
  return (
    Ct.copy(n).invert(),
    Tt.matrix.copy(Ct),
    e.shapecast({
      boundsTraverseOrder: (e) => wt.distanceToBox(e),
      intersectsBounds: (e, t, n) =>
        n < v &&
        n < o &&
        (t && (Tt.min.copy(e.min), Tt.max.copy(e.max), (Tt.needsUpdate = !0)),
        !0),
      intersectsRange: (e, r) => {
        if (t.boundsTree)
          return t.boundsTree.shapecast({
            boundsTraverseOrder: (e) => Tt.distanceToBox(e),
            intersectsBounds: (e, t, n) => n < v && n < o,
            intersectsRange: (t, i) => {
              for (let o = t, s = t + i; o < s; o++) {
                (Q(p, 3 * o, d, u),
                  p.a.applyMatrix4(n),
                  p.b.applyMatrix4(n),
                  p.c.applyMatrix4(n),
                  (p.needsUpdate = !0));
                for (let t = e, n = e + r; t < n; t++) {
                  (Q(f, 3 * t, l, c), (f.needsUpdate = !0));
                  let e = f.distanceToTriangle(p, m, g);
                  if (
                    (e < v &&
                      (h.copy(m), _ && _.copy(g), (v = e), (y = t), (b = o)),
                    e < a)
                  )
                    return !0;
                }
              }
            },
          });
        {
          let i = ke(t);
          for (let t = 0, o = i; t < o; t++) {
            (Q(p, 3 * t, d, u),
              p.a.applyMatrix4(n),
              p.b.applyMatrix4(n),
              p.c.applyMatrix4(n),
              (p.needsUpdate = !0));
            for (let n = e, i = e + r; n < i; n++) {
              (Q(f, 3 * n, l, c), (f.needsUpdate = !0));
              let e = f.distanceToTriangle(p, m, g);
              if (
                (e < v &&
                  (h.copy(m), _ && _.copy(g), (v = e), (y = n), (b = t)),
                e < a)
              )
                return !0;
            }
          }
        }
      },
    }),
    J.releasePrimitive(f),
    J.releasePrimitive(p),
    v === 1 / 0
      ? null
      : (r.point ? r.point.copy(h) : (r.point = h.clone()),
        (r.distance = v),
        (r.faceIndex = y),
        i &&
          (i.point ? i.point.copy(_) : (i.point = _.clone()),
          i.point.applyMatrix4(Ct),
          h.applyMatrix4(Ct),
          (i.distance = h.sub(i.point).length()),
          (i.faceIndex = b)),
        r)
  );
}
function jt(e, t = null) {
  t && Array.isArray(t) && (t = new Set(t));
  let n = e.geometry,
    r = n.index ? n.index.array : null,
    i = n.attributes.position,
    a,
    o,
    s,
    c,
    l = 0,
    u = e._roots;
  for (let e = 0, t = u.length; e < t; e++)
    ((a = u[e]),
      (o = new Uint32Array(a)),
      (s = new Uint16Array(a)),
      (c = new Float32Array(a)),
      d(0, l),
      (l += a.byteLength));
  function d(n, a, l = !1) {
    let u = n * 2;
    if (S(u, s)) {
      let t = C(n, o),
        a = w(u, s),
        l = 1 / 0,
        d = 1 / 0,
        f = 1 / 0,
        p = -1 / 0,
        m = -1 / 0,
        h = -1 / 0;
      for (let n = t, o = t + a; n < o; n++) {
        let t = 3 * e.resolveTriangleIndex(n);
        for (let e = 0; e < 3; e++) {
          let n = t + e;
          n = r ? r[n] : n;
          let a = i.getX(n),
            o = i.getY(n),
            s = i.getZ(n);
          (a < l && (l = a),
            a > p && (p = a),
            o < d && (d = o),
            o > m && (m = o),
            s < f && (f = s),
            s > h && (h = s));
        }
      }
      return c[n + 0] !== l ||
        c[n + 1] !== d ||
        c[n + 2] !== f ||
        c[n + 3] !== p ||
        c[n + 4] !== m ||
        c[n + 5] !== h
        ? ((c[n + 0] = l),
          (c[n + 1] = d),
          (c[n + 2] = f),
          (c[n + 3] = p),
          (c[n + 4] = m),
          (c[n + 5] = h),
          !0)
        : !1;
    }
    {
      let e = T(n),
        r = E(n, o),
        i = l,
        s = !1,
        u = !1;
      if (t) {
        if (!i) {
          let n = e / 8 + a / 32,
            o = r / 8 + a / 32;
          ((s = t.has(n)), (u = t.has(o)), (i = !s && !u));
        }
      } else ((s = !0), (u = !0));
      let f = i || s,
        p = i || u,
        m = !1;
      f && (m = d(e, a, i));
      let h = !1;
      p && (h = d(r, a, i));
      let g = m || h;
      if (g)
        for (let t = 0; t < 3; t++) {
          let i = e + t,
            a = r + t,
            o = c[i],
            s = c[i + 3],
            l = c[a],
            u = c[a + 3];
          ((c[n + t] = o < l ? o : l), (c[n + t + 3] = s > u ? s : u));
        }
      return g;
    }
  }
}
function Mt(e, t, n, r, i, a, o) {
  (z.setBuffer(e._roots[t]), Nt(0, e, n, r, i, a, o), z.clearBuffer());
}
function Nt(e, t, n, r, i, a, o) {
  let { float32Array: s, uint16Array: c, uint32Array: l } = z,
    u = e * 2;
  if (S(u, c)) st(t, n, r, C(e, l), w(u, c), i, a, o);
  else {
    let c = T(e);
    $(c, s, r, a, o) && Nt(c, t, n, r, i, a, o);
    let u = E(e, l);
    $(u, s, r, a, o) && Nt(u, t, n, r, i, a, o);
  }
}
var Pt = [`x`, `y`, `z`];
function Ft(e, t, n, r, i, a) {
  z.setBuffer(e._roots[t]);
  let o = It(0, e, n, r, i, a);
  return (z.clearBuffer(), o);
}
function It(e, t, n, r, i, a) {
  let { float32Array: o, uint16Array: s, uint32Array: c } = z,
    l = e * 2;
  if (S(l, s)) return ct(t, n, r, C(e, c), w(l, s), i, a);
  {
    let s = D(e, c),
      l = Pt[s],
      u = r.direction[l] >= 0,
      d,
      f;
    u ? ((d = T(e)), (f = E(e, c))) : ((d = E(e, c)), (f = T(e)));
    let p = $(d, o, r, i, a) ? It(d, t, n, r, i, a) : null;
    if (p) {
      let e = p.point[l];
      if (u ? e <= o[f + s] : e >= o[f + s + 3]) return p;
    }
    let m = $(f, o, r, i, a) ? It(f, t, n, r, i, a) : null;
    return p && m ? (p.distance <= m.distance ? p : m) : p || m || null;
  }
}
var Lt = new o(),
  Rt = new K(),
  zt = new K(),
  Bt = new r(),
  Vt = new q(),
  Ht = new q();
function Ut(e, t, n, r) {
  z.setBuffer(e._roots[t]);
  let i = Wt(0, e, n, r);
  return (z.clearBuffer(), i);
}
function Wt(e, t, n, r, i = null) {
  let { float32Array: a, uint16Array: o, uint32Array: s } = z,
    c = e * 2;
  if (
    (i === null &&
      (n.boundingBox || n.computeBoundingBox(),
      Vt.set(n.boundingBox.min, n.boundingBox.max, r),
      (i = Vt)),
    S(c, o))
  ) {
    let i = t.geometry,
      l = i.index,
      u = i.attributes.position,
      d = n.index,
      f = n.attributes.position,
      p = C(e, s),
      m = w(c, o);
    if ((Bt.copy(r).invert(), n.boundsTree))
      return (
        g(O(e), a, Ht),
        Ht.matrix.copy(Bt),
        (Ht.needsUpdate = !0),
        n.boundsTree.shapecast({
          intersectsBounds: (e) => Ht.intersectsBox(e),
          intersectsTriangle: (e) => {
            (e.a.applyMatrix4(r),
              e.b.applyMatrix4(r),
              e.c.applyMatrix4(r),
              (e.needsUpdate = !0));
            for (let n = p, r = m + p; n < r; n++)
              if (
                (Q(zt, 3 * t.resolveTriangleIndex(n), l, u),
                (zt.needsUpdate = !0),
                e.intersectsTriangle(zt))
              )
                return !0;
            return !1;
          },
        })
      );
    {
      let e = ke(n);
      for (let n = p, r = m + p; n < r; n++) {
        (Q(Rt, 3 * t.resolveTriangleIndex(n), l, u),
          Rt.a.applyMatrix4(Bt),
          Rt.b.applyMatrix4(Bt),
          Rt.c.applyMatrix4(Bt),
          (Rt.needsUpdate = !0));
        for (let t = 0, n = e * 3; t < n; t += 3)
          if (
            (Q(zt, t, d, f), (zt.needsUpdate = !0), Rt.intersectsTriangle(zt))
          )
            return !0;
      }
    }
  } else {
    let o = T(e),
      c = E(e, s);
    return (
      g(O(o), a, Lt),
      !!(
        (i.intersectsBox(Lt) && Wt(o, t, n, r, i)) ||
        (g(O(c), a, Lt), i.intersectsBox(Lt) && Wt(c, t, n, r, i))
      )
    );
  }
}
var Gt = new r(),
  Kt = new q(),
  qt = new q(),
  Jt = new u(),
  Yt = new u(),
  Xt = new u(),
  Zt = new u();
