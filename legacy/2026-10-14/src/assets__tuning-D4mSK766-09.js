// assets__tuning-D4mSK766 09 — copy
// Lines 2499-2603 of readable/assets__tuning-D4mSK766.pretty.js (statement-aligned).
function Qt(e, t, n, r = {}, i = {}, a = 0, o = 1 / 0) {
  (t.boundingBox || t.computeBoundingBox(),
    Kt.set(t.boundingBox.min, t.boundingBox.max, n),
    (Kt.needsUpdate = !0));
  let s = e.geometry,
    c = s.attributes.position,
    l = s.index,
    u = t.attributes.position,
    d = t.index,
    f = J.getPrimitive(),
    p = J.getPrimitive(),
    m = Jt,
    h = Yt,
    g = null,
    _ = null;
  i && ((g = Xt), (_ = Zt));
  let v = 1 / 0,
    y = null,
    b = null;
  return (
    Gt.copy(n).invert(),
    qt.matrix.copy(Gt),
    e.shapecast({
      boundsTraverseOrder: (e) => Kt.distanceToBox(e),
      intersectsBounds: (e, t, n) =>
        n < v &&
        n < o &&
        (t && (qt.min.copy(e.min), qt.max.copy(e.max), (qt.needsUpdate = !0)),
        !0),
      intersectsRange: (r, i) => {
        if (t.boundsTree) {
          let s = t.boundsTree;
          return s.shapecast({
            boundsTraverseOrder: (e) => qt.distanceToBox(e),
            intersectsBounds: (e, t, n) => n < v && n < o,
            intersectsRange: (t, o) => {
              for (let x = t, S = t + o; x < S; x++) {
                let t = s.resolveTriangleIndex(x);
                (Q(p, 3 * t, d, u),
                  p.a.applyMatrix4(n),
                  p.b.applyMatrix4(n),
                  p.c.applyMatrix4(n),
                  (p.needsUpdate = !0));
                for (let t = r, n = r + i; t < n; t++) {
                  let n = e.resolveTriangleIndex(t);
                  (Q(f, 3 * n, l, c), (f.needsUpdate = !0));
                  let r = f.distanceToTriangle(p, m, g);
                  if (
                    (r < v &&
                      (h.copy(m), _ && _.copy(g), (v = r), (y = t), (b = x)),
                    r < a)
                  )
                    return !0;
                }
              }
            },
          });
        }
        {
          let o = ke(t);
          for (let t = 0, s = o; t < s; t++) {
            (Q(p, 3 * t, d, u),
              p.a.applyMatrix4(n),
              p.b.applyMatrix4(n),
              p.c.applyMatrix4(n),
              (p.needsUpdate = !0));
            for (let n = r, o = r + i; n < o; n++) {
              let r = e.resolveTriangleIndex(n);
              (Q(f, 3 * r, l, c), (f.needsUpdate = !0));
              let i = f.distanceToTriangle(p, m, g);
              if (
                (i < v &&
                  (h.copy(m), _ && _.copy(g), (v = i), (y = n), (b = t)),
                i < a)
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
          i.point.applyMatrix4(Gt),
          h.applyMatrix4(Gt),
          (i.distance = h.sub(i.point).length()),
          (i.faceIndex = b)),
        r)
  );
}
function $t(e, t, n) {
  return e === null
    ? null
    : (e.point.applyMatrix4(t.matrixWorld),
      (e.distance = e.point.distanceTo(n.ray.origin)),
      (e.object = t),
      e);
}
