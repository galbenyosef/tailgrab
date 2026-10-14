// assets/preload-helper-DR1MrGPZ 14 — math
// Lines 4232-4575 of readable/assets/preload-helper-DR1MrGPZ.pretty.js (statement-aligned).
var qn = 2 ** 32 - 1,
  Jn = class {
    constructor(e, t) {
      if (
        !e ||
        typeof e != `object` ||
        !e.triangles ||
        !e.halfedges ||
        !e.coords
      )
        throw Error(`Expected an object with Delaunator output`);
      if (
        e.triangles.length % 3 ||
        e.halfedges.length !== e.triangles.length ||
        e.coords.length % 2
      )
        throw Error(`Delaunator output appears inconsistent`);
      if (e.triangles.length < 3) throw Error(`No edges in triangulation`);
      this.del = e;
      let n = e.coords.length >> 1,
        r = e.triangles.length;
      ((this.vertMap = new Uint32Array(n).fill(qn)),
        (this.flips = new Wn(r)),
        (this.consd = new Wn(r)));
      let i = e.triangles,
        a = this.vertMap;
      for (let e = 0; e < r; e++) a[i[e]] === qn && this.updateVert(e);
      t && this.constrainAll(t);
    }
    constrainOne(e, t) {
      let { triangles: n, halfedges: r } = this.del,
        i = this.vertMap,
        a = this.consd,
        o = i[e];
      if (o === qn || i[t] === qn)
        throw Error(
          `Cannot constrain between points that are not triangulated`,
        );
      let s = o;
      do {
        let i = n[s],
          a = Gn(s);
        if (i === t) return this.protect(s);
        let o = Kn(s),
          c = n[o];
        if (c === t) return (this.protect(a), a);
        if (this.intersectSegments(e, t, c, i)) {
          s = o;
          break;
        }
        s = r[a];
      } while (s !== -1 && s !== o);
      let c = s,
        l = -1;
      for (; s !== -1;) {
        let i = r[s],
          o = Kn(s),
          u = Kn(i),
          d = Gn(i);
        if (i === -1) throw Error(`Constraining edge exited the hull`);
        if (a.has(s)) throw Error(`Edge intersects already constrained edge`);
        if (this.isCollinear(e, t, n[s]) || this.isCollinear(e, t, n[i]))
          throw Error(`Constraining edge intersects point`);
        if (!this.intersectSegments(n[s], n[i], n[o], n[u])) {
          if ((l === -1 && (l = s), n[u] === t)) {
            if (s === l) throw Error(`Infinite loop: non-convex quadrilateral`);
            ((s = l), (l = -1));
            continue;
          }
          if (this.intersectSegments(e, t, n[u], n[i])) s = u;
          else if (this.intersectSegments(e, t, n[d], n[u])) s = d;
          else if (l === s)
            throw Error(`Infinite loop: no further intersect after non-convex`);
          continue;
        }
        if (
          (this.flipDiagonal(s),
          this.intersectSegments(e, t, n[o], n[u]) &&
            (l === -1 && (l = o), l === o))
        )
          throw Error(`Infinite loop: flipped diagonal still intersects`);
        n[u] === t
          ? ((c = u), (s = l), (l = -1))
          : this.intersectSegments(e, t, n[d], n[u]) && (s = d);
      }
      let u = this.flips;
      this.protect(c);
      do {
        var d = 0;
        u.forEach((e) => {
          u.delete(e);
          let t = r[e];
          t !== -1 &&
            (u.delete(t), this.isDelaunay(e) || (this.flipDiagonal(e), d++));
        });
      } while (d > 0);
      return this.findEdge(e, t);
    }
    delaunify(e = !1) {
      let t = this.del.halfedges,
        n = this.flips,
        r = this.consd,
        i = t.length;
      do {
        var a = 0;
        for (let e = 0; e < i; e++) {
          if (r.has(e)) continue;
          n.delete(e);
          let i = t[e];
          i !== -1 &&
            (n.delete(i), this.isDelaunay(e) || (this.flipDiagonal(e), a++));
        }
      } while (e && a > 0);
      return this;
    }
    constrainAll(e) {
      let t = e.length;
      for (let n = 0; n < t; n++) {
        let t = e[n];
        this.constrainOne(t[0], t[1]);
      }
      return this;
    }
    isConstrained(e) {
      return this.consd.has(e);
    }
    findEdge(e, t) {
      let n = this.vertMap[t],
        r = this.del.triangles,
        i = this.del.halfedges,
        a = n,
        o = -1;
      do {
        if (r[a] === e) return a;
        ((o = Gn(a)), (a = i[o]));
      } while (a !== -1 && a !== n);
      return r[Gn(o)] === e ? -o : 1 / 0;
    }
    untriangulatedPoints() {
      let e = [],
        t = this.vertMap,
        n = t.length;
      for (let r = 0; r < n; r++) t[r] === qn && e.push(r);
      return e;
    }
    protect(e) {
      let t = this.del.halfedges[e],
        n = this.flips,
        r = this.consd;
      return (
        n.delete(e),
        r.add(e),
        t === -1 ? -e : (n.delete(t), r.add(t), t)
      );
    }
    markFlip(e) {
      let t = this.del.halfedges,
        n = this.flips;
      if (this.consd.has(e)) return !1;
      let r = t[e];
      return (r !== -1 && (n.add(e), n.add(r)), !0);
    }
    flipDiagonal(e) {
      let t = this.del.triangles,
        n = this.del.halfedges,
        r = this.flips,
        i = this.consd,
        a = n[e],
        o = Kn(e),
        s = Gn(e),
        c = Kn(a),
        l = Gn(a),
        u = n[o],
        d = n[c];
      if (i.has(e)) throw Error(`Trying to flip a constrained edge`);
      return (
        (t[e] = t[c]),
        (n[e] = d),
        r.set(e, r.has(c)) || i.set(e, i.has(c)),
        d !== -1 && (n[d] = e),
        (n[o] = c),
        (t[a] = t[o]),
        (n[a] = u),
        r.set(a, r.has(o)) || i.set(a, i.has(o)),
        u !== -1 && (n[u] = a),
        (n[c] = o),
        this.markFlip(e),
        this.markFlip(s),
        this.markFlip(a),
        this.markFlip(l),
        r.add(o),
        i.delete(o),
        r.add(c),
        i.delete(c),
        this.updateVert(e),
        this.updateVert(s),
        this.updateVert(a),
        this.updateVert(l),
        o
      );
    }
    isDelaunay(e) {
      let t = this.del.triangles,
        n = this.del.halfedges[e];
      if (n === -1) return !0;
      let r = t[Kn(e)],
        i = t[e],
        a = t[Gn(e)],
        o = t[Kn(n)];
      return !this.inCircle(r, i, a, o);
    }
    updateVert(e) {
      let t = this.del.triangles,
        n = this.del.halfedges,
        r = this.vertMap,
        i = t[e],
        a = Kn(e),
        o = n[a];
      for (; o !== -1 && o !== e;) ((a = Kn(o)), (o = n[a]));
      return ((r[i] = a), a);
    }
    intersectSegments(e, t, n, r) {
      let i = this.del.coords;
      return e === n || e === r || t === n || t === r
        ? !1
        : Yn(
            i[e * 2],
            i[e * 2 + 1],
            i[t * 2],
            i[t * 2 + 1],
            i[n * 2],
            i[n * 2 + 1],
            i[r * 2],
            i[r * 2 + 1],
          );
    }
    inCircle(e, t, n, r) {
      let i = this.del.coords;
      return (
        An(
          i[e * 2],
          i[e * 2 + 1],
          i[t * 2],
          i[t * 2 + 1],
          i[n * 2],
          i[n * 2 + 1],
          i[r * 2],
          i[r * 2 + 1],
        ) < 0
      );
    }
    isCollinear(e, t, n) {
      let r = this.del.coords;
      return (
        Yt(
          r[e * 2],
          r[e * 2 + 1],
          r[t * 2],
          r[t * 2 + 1],
          r[n * 2],
          r[n * 2 + 1],
        ) === 0
      );
    }
  };
Jn.intersectSegments = Yn;
function Yn(e, t, n, r, i, a, o, s) {
  let c = Yt(e, t, i, a, o, s),
    l = Yt(n, r, i, a, o, s);
  if ((c > 0 && l > 0) || (c < 0 && l < 0)) return !1;
  let u = Yt(i, a, e, t, n, r),
    d = Yt(o, s, e, t, n, r);
  return (u > 0 && d > 0) || (u < 0 && d < 0)
    ? !1
    : c === 0 && l === 0 && u === 0 && d === 0
      ? !(
          Math.max(i, o) < Math.min(e, n) ||
          Math.max(e, n) < Math.min(i, o) ||
          Math.max(a, s) < Math.min(t, r) ||
          Math.max(t, r) < Math.min(a, s)
        )
      : !0;
}
var Xn = 0.45,
  Zn = (e, t, n, r = 0) =>
    t > e.x0 - r && t < e.x1 + r && n > e.z0 - r && n < e.z1 + r;
function Qn(e, t, n) {
  let r = !1,
    i = e.length / 3;
  for (let a = 0, o = i - 1; a < i; o = a++) {
    let i = e[a * 3],
      s = e[a * 3 + 2],
      c = e[o * 3],
      l = e[o * 3 + 2];
    s > n != l > n && t < ((c - i) * (n - s)) / (l - s) + i && (r = !r);
  }
  return r;
}
function $n(e, t, n, r, i, a) {
  let o = i - n,
    s = a - r,
    c = o * o + s * s,
    l = c > 0 ? ((e - n) * o + (t - r) * s) / c : 0;
  l = l < 0 ? 0 : l > 1 ? 1 : l;
  let u = n + o * l - e,
    d = r + s * l - t;
  return u * u + d * d;
}
var er = class {
  cells = new Map();
  P;
  E;
  constructor(e, t) {
    ((this.P = e),
      (this.E = t),
      t.forEach(([t, n], r) => {
        let i = Math.min(e[t * 2], e[n * 2]),
          a = Math.max(e[t * 2], e[n * 2]),
          o = Math.min(e[t * 2 + 1], e[n * 2 + 1]),
          s = Math.max(e[t * 2 + 1], e[n * 2 + 1]);
        for (let e = Math.floor(i / 2); e <= Math.floor(a / 2); e++)
          for (let t = Math.floor(o / 2); t <= Math.floor(s / 2); t++) {
            let n = (e + 32768) * 65536 + (t + 32768),
              i = this.cells.get(n);
            i ? i.push(r) : this.cells.set(n, [r]);
          }
      }));
  }
  near(e, t, n) {
    let r = this.P,
      i = n * n;
    for (let a = Math.floor((e - n) / 2); a <= Math.floor((e + n) / 2); a++)
      for (let o = Math.floor((t - n) / 2); o <= Math.floor((t + n) / 2); o++) {
        let n = this.cells.get((a + 32768) * 65536 + (o + 32768));
        if (n)
          for (let a of n) {
            let [n, o] = this.E[a];
            if ($n(e, t, r[n * 2], r[n * 2 + 1], r[o * 2], r[o * 2 + 1]) < i)
              return !0;
          }
      }
    return !1;
  }
};
