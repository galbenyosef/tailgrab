// assets__tuning-D4mSK766 07 — geometry
// Lines 1858-2187 of readable/assets__tuning-D4mSK766.pretty.js (statement-aligned).
function Q(e, t, n, r) {
  let i = e.a,
    a = e.b,
    o = e.c,
    s = t,
    c = t + 1,
    l = t + 2;
  (n && ((s = n.getX(s)), (c = n.getX(c)), (l = n.getX(l))),
    (i.x = r.getX(s)),
    (i.y = r.getY(s)),
    (i.z = r.getZ(s)),
    (a.x = r.getX(c)),
    (a.y = r.getY(c)),
    (a.z = r.getZ(c)),
    (o.x = r.getX(l)),
    (o.y = r.getY(l)),
    (o.z = r.getZ(l)));
}
function rt(e, t, n, r, i, a, o, s) {
  let { geometry: c, _indirectBuffer: l } = e;
  for (let e = r, l = r + i; e < l; e++) nt(c, t, n, e, a, o, s);
}
function it(e, t, n, r, i, a, o) {
  let { geometry: s, _indirectBuffer: c } = e,
    l = 1 / 0,
    u = null;
  for (let e = r, c = r + i; e < c; e++) {
    let r;
    ((r = nt(s, t, n, e, null, a, o)),
      r && r.distance < l && ((u = r), (l = r.distance)));
  }
  return u;
}
function at(e, t, n, r, i, a, o) {
  let { geometry: s } = n,
    { index: c } = s,
    l = s.attributes.position;
  for (let n = e, s = t + e; n < s; n++) {
    let e;
    if (((e = n), Q(o, e * 3, c, l), (o.needsUpdate = !0), r(o, e, i, a)))
      return !0;
  }
  return !1;
}
function ot(e, t = null) {
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
  function d(e, n, a = !1) {
    let l = e * 2;
    if (S(l, s)) {
      let t = C(e, o),
        n = w(l, s),
        a = 1 / 0,
        u = 1 / 0,
        d = 1 / 0,
        f = -1 / 0,
        p = -1 / 0,
        m = -1 / 0;
      for (let e = 3 * t, o = 3 * (t + n); e < o; e++) {
        let t = r[e],
          n = i.getX(t),
          o = i.getY(t),
          s = i.getZ(t);
        (n < a && (a = n),
          n > f && (f = n),
          o < u && (u = o),
          o > p && (p = o),
          s < d && (d = s),
          s > m && (m = s));
      }
      return c[e + 0] !== a ||
        c[e + 1] !== u ||
        c[e + 2] !== d ||
        c[e + 3] !== f ||
        c[e + 4] !== p ||
        c[e + 5] !== m
        ? ((c[e + 0] = a),
          (c[e + 1] = u),
          (c[e + 2] = d),
          (c[e + 3] = f),
          (c[e + 4] = p),
          (c[e + 5] = m),
          !0)
        : !1;
    }
    {
      let r = T(e),
        i = E(e, o),
        s = a,
        l = !1,
        u = !1;
      if (t) {
        if (!s) {
          let e = r / 8 + n / 32,
            a = i / 8 + n / 32;
          ((l = t.has(e)), (u = t.has(a)), (s = !l && !u));
        }
      } else ((l = !0), (u = !0));
      let f = s || l,
        p = s || u,
        m = !1;
      f && (m = d(r, n, s));
      let h = !1;
      p && (h = d(i, n, s));
      let g = m || h;
      if (g)
        for (let t = 0; t < 3; t++) {
          let n = r + t,
            a = i + t,
            o = c[n],
            s = c[n + 3],
            l = c[a],
            u = c[a + 3];
          ((c[e + t] = o < l ? o : l), (c[e + t + 3] = s > u ? s : u));
        }
      return g;
    }
  }
}
function $(e, t, n, r, i) {
  let a,
    o,
    s,
    c,
    l,
    u,
    d = 1 / n.direction.x,
    f = 1 / n.direction.y,
    p = 1 / n.direction.z,
    m = n.origin.x,
    h = n.origin.y,
    g = n.origin.z,
    _ = t[e],
    v = t[e + 3],
    y = t[e + 1],
    b = t[e + 3 + 1],
    x = t[e + 2],
    S = t[e + 3 + 2];
  return (
    d >= 0
      ? ((a = (_ - m) * d), (o = (v - m) * d))
      : ((a = (v - m) * d), (o = (_ - m) * d)),
    f >= 0
      ? ((s = (y - h) * f), (c = (b - h) * f))
      : ((s = (b - h) * f), (c = (y - h) * f)),
    a > c ||
    s > o ||
    ((s > a || isNaN(a)) && (a = s),
    (c < o || isNaN(o)) && (o = c),
    p >= 0
      ? ((l = (x - g) * p), (u = (S - g) * p))
      : ((l = (S - g) * p), (u = (x - g) * p)),
    a > u || l > o)
      ? !1
      : ((l > a || a !== a) && (a = l),
        (u < o || o !== o) && (o = u),
        a <= i && o >= r)
  );
}
function st(e, t, n, r, i, a, o, s) {
  let { geometry: c, _indirectBuffer: l } = e;
  for (let e = r, u = r + i; e < u; e++) nt(c, t, n, l ? l[e] : e, a, o, s);
}
function ct(e, t, n, r, i, a, o) {
  let { geometry: s, _indirectBuffer: c } = e,
    l = 1 / 0,
    u = null;
  for (let e = r, d = r + i; e < d; e++) {
    let r;
    ((r = nt(s, t, n, c ? c[e] : e, null, a, o)),
      r && r.distance < l && ((u = r), (l = r.distance)));
  }
  return u;
}
function lt(e, t, n, r, i, a, o) {
  let { geometry: s } = n,
    { index: c } = s,
    l = s.attributes.position;
  for (let s = e, u = t + e; s < u; s++) {
    let e;
    if (
      ((e = n.resolveTriangleIndex(s)),
      Q(o, e * 3, c, l),
      (o.needsUpdate = !0),
      r(o, e, i, a))
    )
      return !0;
  }
  return !1;
}
function ut(e, t, n, r, i, a, o) {
  (z.setBuffer(e._roots[t]), dt(0, e, n, r, i, a, o), z.clearBuffer());
}
function dt(e, t, n, r, i, a, o) {
  let { float32Array: s, uint16Array: c, uint32Array: l } = z,
    u = e * 2;
  if (S(u, c)) rt(t, n, r, C(e, l), w(u, c), i, a, o);
  else {
    let c = T(e);
    $(c, s, r, a, o) && dt(c, t, n, r, i, a, o);
    let u = E(e, l);
    $(u, s, r, a, o) && dt(u, t, n, r, i, a, o);
  }
}
var ft = [`x`, `y`, `z`];
function pt(e, t, n, r, i, a) {
  z.setBuffer(e._roots[t]);
  let o = mt(0, e, n, r, i, a);
  return (z.clearBuffer(), o);
}
function mt(e, t, n, r, i, a) {
  let { float32Array: o, uint16Array: s, uint32Array: c } = z,
    l = e * 2;
  if (S(l, s)) return it(t, n, r, C(e, c), w(l, s), i, a);
  {
    let s = D(e, c),
      l = ft[s],
      u = r.direction[l] >= 0,
      d,
      f;
    u ? ((d = T(e)), (f = E(e, c))) : ((d = E(e, c)), (f = T(e)));
    let p = $(d, o, r, i, a) ? mt(d, t, n, r, i, a) : null;
    if (p) {
      let e = p.point[l];
      if (u ? e <= o[f + s] : e >= o[f + s + 3]) return p;
    }
    let m = $(f, o, r, i, a) ? mt(f, t, n, r, i, a) : null;
    return p && m ? (p.distance <= m.distance ? p : m) : p || m || null;
  }
}
var ht = new o(),
  gt = new K(),
  _t = new K(),
  vt = new r(),
  yt = new q(),
  bt = new q();
function xt(e, t, n, r) {
  z.setBuffer(e._roots[t]);
  let i = St(0, e, n, r);
  return (z.clearBuffer(), i);
}
function St(e, t, n, r, i = null) {
  let { float32Array: a, uint16Array: o, uint32Array: s } = z,
    c = e * 2;
  if (
    (i === null &&
      (n.boundingBox || n.computeBoundingBox(),
      yt.set(n.boundingBox.min, n.boundingBox.max, r),
      (i = yt)),
    S(c, o))
  ) {
    let i = t.geometry,
      l = i.index,
      u = i.attributes.position,
      d = n.index,
      f = n.attributes.position,
      p = C(e, s),
      m = w(c, o);
    if ((vt.copy(r).invert(), n.boundsTree))
      return (
        g(O(e), a, bt),
        bt.matrix.copy(vt),
        (bt.needsUpdate = !0),
        n.boundsTree.shapecast({
          intersectsBounds: (e) => bt.intersectsBox(e),
          intersectsTriangle: (e) => {
            (e.a.applyMatrix4(r),
              e.b.applyMatrix4(r),
              e.c.applyMatrix4(r),
              (e.needsUpdate = !0));
            for (let t = p * 3, n = (m + p) * 3; t < n; t += 3)
              if (
                (Q(_t, t, l, u),
                (_t.needsUpdate = !0),
                e.intersectsTriangle(_t))
              )
                return !0;
            return !1;
          },
        })
      );
    {
      let e = ke(n);
      for (let t = p * 3, n = (m + p) * 3; t < n; t += 3) {
        (Q(gt, t, l, u),
          gt.a.applyMatrix4(vt),
          gt.b.applyMatrix4(vt),
          gt.c.applyMatrix4(vt),
          (gt.needsUpdate = !0));
        for (let t = 0, n = e * 3; t < n; t += 3)
          if (
            (Q(_t, t, d, f), (_t.needsUpdate = !0), gt.intersectsTriangle(_t))
          )
            return !0;
      }
    }
  } else {
    let o = T(e),
      c = E(e, s);
    return (
      g(O(o), a, ht),
      !!(
        (i.intersectsBox(ht) && St(o, t, n, r, i)) ||
        (g(O(c), a, ht), i.intersectsBox(ht) && St(c, t, n, r, i))
      )
    );
  }
}
var Ct = new r(),
  wt = new q(),
  Tt = new q(),
  Et = new u(),
  Dt = new u(),
  Ot = new u(),
  kt = new u();
