// assets__preload-helper-DR1MrGPZ 12 — math
// Lines 3755-4102 of readable/assets__preload-helper-DR1MrGPZ.pretty.js (statement-aligned).
function An(e, t, n, r, i, a, o, s) {
  let c = e - o,
    l = n - o,
    u = i - o,
    d = t - s,
    f = r - s,
    p = a - s,
    m = l * p,
    h = u * f,
    g = c * c + d * d,
    _ = u * d,
    v = c * p,
    y = l * l + f * f,
    b = c * f,
    x = l * d,
    S = u * u + p * p,
    C = g * (m - h) + y * (_ - v) + S * (b - x),
    w =
      (Math.abs(m) + Math.abs(h)) * g +
      (Math.abs(_) + Math.abs(v)) * y +
      (Math.abs(b) + Math.abs(x)) * S,
    T = Xt * w;
  return C > T || -C > T ? C : kn(e, t, n, r, i, a, o, s, w);
}
((16 + 224 * Ft) * Ft,
  (5 + 72 * Ft) * Ft,
  (71 + 1408 * Ft) * Ft * Ft,
  Z(4),
  Z(4),
  Z(4),
  Z(4),
  Z(4),
  Z(4),
  Z(4),
  Z(4),
  Z(4),
  Z(4),
  Z(24),
  Z(24),
  Z(24),
  Z(24),
  Z(24),
  Z(24),
  Z(24),
  Z(24),
  Z(24),
  Z(24),
  Z(1152),
  Z(1152),
  Z(1152),
  Z(1152),
  Z(1152),
  Z(2304),
  Z(2304),
  Z(3456),
  Z(5760),
  Z(8),
  Z(8),
  Z(8),
  Z(16),
  Z(24),
  Z(48),
  Z(48),
  Z(96),
  Z(192),
  Z(384),
  Z(384),
  Z(384),
  Z(768),
  Z(96),
  Z(96),
  Z(96),
  Z(1152));
var jn = 2 ** -52,
  Mn = new Uint32Array(512),
  Nn = class e {
    static from(t, n = Vn, r = Hn) {
      let i = t.length,
        a = new Float64Array(i * 2);
      for (let e = 0; e < i; e++) {
        let i = t[e];
        ((a[2 * e] = n(i)), (a[2 * e + 1] = r(i)));
      }
      return new e(a);
    }
    constructor(e) {
      let t = e.length >> 1;
      if (t > 0 && typeof e[0] != `number`)
        throw Error(`Expected coords to contain numbers.`);
      this.coords = e;
      let n = Math.max(2 * t - 5, 0);
      ((this._triangles = new Uint32Array(n * 3)),
        (this._halfedges = new Int32Array(n * 3)),
        (this._hashSize = Math.ceil(Math.sqrt(t))),
        (this._hullPrev = new Uint32Array(t)),
        (this._hullNext = new Uint32Array(t)),
        (this._hullTri = new Uint32Array(t)),
        (this._hullHash = new Int32Array(this._hashSize)),
        (this._ids = new Uint32Array(t)),
        (this._dists = new Float64Array(t)),
        (this.trianglesLen = 0),
        (this._cx = 0),
        (this._cy = 0),
        (this._hullStart = 0),
        (this.hull = this._triangles),
        (this.triangles = this._triangles),
        (this.halfedges = this._halfedges),
        this.update());
    }
    update() {
      let {
          coords: e,
          _hullPrev: t,
          _hullNext: n,
          _hullTri: r,
          _hullHash: i,
        } = this,
        a = e.length >> 1,
        o = 1 / 0,
        s = 1 / 0,
        c = -1 / 0,
        l = -1 / 0;
      for (let t = 0; t < a; t++) {
        let n = e[2 * t],
          r = e[2 * t + 1];
        (n < o && (o = n),
          r < s && (s = r),
          n > c && (c = n),
          r > l && (l = r),
          (this._ids[t] = t));
      }
      let u = (o + c) / 2,
        d = (s + l) / 2,
        f = 0,
        p = 0,
        m = 0;
      for (let t = 0, n = 1 / 0; t < a; t++) {
        let r = Fn(u, d, e[2 * t], e[2 * t + 1]);
        r < n && ((f = t), (n = r));
      }
      let h = e[2 * f],
        g = e[2 * f + 1];
      for (let t = 0, n = 1 / 0; t < a; t++) {
        if (t === f) continue;
        let r = Fn(h, g, e[2 * t], e[2 * t + 1]);
        r < n && r > 0 && ((p = t), (n = r));
      }
      let _ = e[2 * p],
        v = e[2 * p + 1],
        y = 1 / 0;
      for (let t = 0; t < a; t++) {
        if (t === f || t === p) continue;
        let n = Ln(h, g, _, v, e[2 * t], e[2 * t + 1]);
        n < y && ((m = t), (y = n));
      }
      let b = e[2 * m],
        x = e[2 * m + 1];
      if (y === 1 / 0) {
        for (let t = 0; t < a; t++)
          this._dists[t] = e[2 * t] - e[0] || e[2 * t + 1] - e[1];
        zn(this._ids, this._dists, 0, a - 1);
        let t = new Uint32Array(a),
          n = 0;
        for (let e = 0, r = -1 / 0; e < a; e++) {
          let i = this._ids[e],
            a = this._dists[i];
          a > r && ((t[n++] = i), (r = a));
        }
        ((this.hull = t.subarray(0, n)),
          (this.triangles = new Uint32Array()),
          (this.halfedges = new Int32Array()));
        return;
      }
      if (Yt(h, g, _, v, b, x) < 0) {
        let e = p,
          t = _,
          n = v;
        ((p = m), (_ = b), (v = x), (m = e), (b = t), (x = n));
      }
      let S = Rn(h, g, _, v, b, x);
      ((this._cx = S.x), (this._cy = S.y));
      for (let t = 0; t < a; t++)
        this._dists[t] = Fn(e[2 * t], e[2 * t + 1], S.x, S.y);
      (zn(this._ids, this._dists, 0, a - 1), (this._hullStart = f));
      let C = 3;
      ((n[f] = t[m] = p),
        (n[p] = t[f] = m),
        (n[m] = t[p] = f),
        (r[f] = 0),
        (r[p] = 1),
        (r[m] = 2),
        i.fill(-1),
        (i[this._hashKey(h, g)] = f),
        (i[this._hashKey(_, v)] = p),
        (i[this._hashKey(b, x)] = m),
        (this.trianglesLen = 0),
        this._addTriangle(f, p, m, -1, -1, -1));
      for (let a = 0, o = 0, s = 0; a < this._ids.length; a++) {
        let c = this._ids[a],
          l = e[2 * c],
          u = e[2 * c + 1];
        if (
          (a > 0 && Math.abs(l - o) <= jn && Math.abs(u - s) <= jn) ||
          ((o = l), (s = u), c === f || c === p || c === m)
        )
          continue;
        let d = 0;
        for (
          let e = 0, t = this._hashKey(l, u);
          e < this._hashSize &&
          ((d = i[(t + e) % this._hashSize]), d === -1 || d === n[d]);
          e++
        );
        d = t[d];
        let h = d,
          g;
        for (
          ;
          (g = n[h]),
            Yt(l, u, e[2 * h], e[2 * h + 1], e[2 * g], e[2 * g + 1]) >= 0;
        )
          if (((h = g), h === d)) {
            h = -1;
            break;
          }
        if (h === -1) continue;
        let _ = this._addTriangle(h, c, n[h], -1, -1, r[h]);
        ((r[c] = this._legalize(_ + 2)), (r[h] = _), C++);
        let v = n[h];
        for (
          ;
          (g = n[v]),
            Yt(l, u, e[2 * v], e[2 * v + 1], e[2 * g], e[2 * g + 1]) < 0;
        )
          ((_ = this._addTriangle(v, c, g, r[c], -1, r[v])),
            (r[c] = this._legalize(_ + 2)),
            (n[v] = v),
            C--,
            (v = g));
        if (h === d)
          for (
            ;
            (g = t[h]),
              Yt(l, u, e[2 * g], e[2 * g + 1], e[2 * h], e[2 * h + 1]) < 0;
          )
            ((_ = this._addTriangle(g, c, h, -1, r[h], r[g])),
              this._legalize(_ + 2),
              (r[g] = _),
              (n[h] = h),
              C--,
              (h = g));
        ((this._hullStart = t[c] = h),
          (n[h] = t[v] = c),
          (n[c] = v),
          (i[this._hashKey(l, u)] = c),
          (i[this._hashKey(e[2 * h], e[2 * h + 1])] = h));
      }
      this.hull = new Uint32Array(C);
      for (let e = 0, t = this._hullStart; e < C; e++)
        ((this.hull[e] = t), (t = n[t]));
      ((this.triangles = this._triangles.subarray(0, this.trianglesLen)),
        (this.halfedges = this._halfedges.subarray(0, this.trianglesLen)));
    }
    _hashKey(e, t) {
      return (
        Math.floor(Pn(e - this._cx, t - this._cy) * this._hashSize) %
        this._hashSize
      );
    }
    _legalize(e) {
      let { _triangles: t, _halfedges: n, coords: r } = this,
        i = 0,
        a = 0;
      for (;;) {
        let o = n[e],
          s = e - (e % 3);
        if (((a = s + ((e + 2) % 3)), o === -1)) {
          if (i === 0) break;
          e = Mn[--i];
          continue;
        }
        let c = o - (o % 3),
          l = s + ((e + 1) % 3),
          u = c + ((o + 2) % 3),
          d = t[a],
          f = t[e],
          p = t[l],
          m = t[u];
        if (
          In(
            r[2 * d],
            r[2 * d + 1],
            r[2 * f],
            r[2 * f + 1],
            r[2 * p],
            r[2 * p + 1],
            r[2 * m],
            r[2 * m + 1],
          )
        ) {
          ((t[e] = m), (t[o] = d));
          let r = n[u];
          if (r === -1) {
            let t = this._hullStart;
            do {
              if (this._hullTri[t] === u) {
                this._hullTri[t] = e;
                break;
              }
              t = this._hullPrev[t];
            } while (t !== this._hullStart);
          }
          (this._link(e, r), this._link(o, n[a]), this._link(a, u));
          let s = c + ((o + 1) % 3);
          i < Mn.length && (Mn[i++] = s);
        } else {
          if (i === 0) break;
          e = Mn[--i];
        }
      }
      return a;
    }
    _link(e, t) {
      ((this._halfedges[e] = t), t !== -1 && (this._halfedges[t] = e));
    }
    _addTriangle(e, t, n, r, i, a) {
      let o = this.trianglesLen;
      return (
        (this._triangles[o] = e),
        (this._triangles[o + 1] = t),
        (this._triangles[o + 2] = n),
        this._link(o, r),
        this._link(o + 1, i),
        this._link(o + 2, a),
        (this.trianglesLen += 3),
        o
      );
    }
  };
function Pn(e, t) {
  let n = e / (Math.abs(e) + Math.abs(t));
  return (t > 0 ? 3 - n : 1 + n) / 4;
}
function Fn(e, t, n, r) {
  let i = e - n,
    a = t - r;
  return i * i + a * a;
}
