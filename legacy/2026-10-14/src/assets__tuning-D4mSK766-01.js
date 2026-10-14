// assets__tuning-D4mSK766 01 — candidate
// Lines 1-330 of readable/assets__tuning-D4mSK766.pretty.js (statement-aligned).
import {
  An as e,
  Lt as t,
  Xn as n,
  bt as r,
  c as i,
  l as a,
  o,
  or as s,
  rt as c,
  vr as l,
  yr as u,
} from "./three.core-DVWDmH0S.js";
var d = 1.25,
  f = 65535,
  p = 2 ** -24,
  m = Symbol(`SKIP_GENERATION`),
  h = {
    strategy: 0,
    maxDepth: 40,
    targetLeafSize: 10,
    useSharedArrayBuffer: !1,
    setBoundingBox: !0,
    onProgress: null,
    indirect: !1,
    verbose: !0,
    range: null,
    [m]: !1,
  };
function g(e, t, n) {
  return (
    (n.min.x = t[e]),
    (n.min.y = t[e + 1]),
    (n.min.z = t[e + 2]),
    (n.max.x = t[e + 3]),
    (n.max.y = t[e + 4]),
    (n.max.z = t[e + 5]),
    n
  );
}
function _(e) {
  let t = -1,
    n = -1 / 0;
  for (let r = 0; r < 3; r++) {
    let i = e[r + 3] - e[r];
    i > n && ((n = i), (t = r));
  }
  return t;
}
function v(e, t) {
  t.set(e);
}
function y(e, t, n) {
  let r, i;
  for (let a = 0; a < 3; a++) {
    let o = a + 3;
    ((r = e[a]),
      (i = t[a]),
      (n[a] = r < i ? r : i),
      (r = e[o]),
      (i = t[o]),
      (n[o] = r > i ? r : i));
  }
}
function b(e, t, n) {
  for (let r = 0; r < 3; r++) {
    let i = t[e + 2 * r],
      a = t[e + 2 * r + 1],
      o = i - a,
      s = i + a;
    (o < n[r] && (n[r] = o), s > n[r + 3] && (n[r + 3] = s));
  }
}
function x(e) {
  let t = e[3] - e[0],
    n = e[4] - e[1],
    r = e[5] - e[2];
  return 2 * (t * n + n * r + r * t);
}
function S(e, t) {
  return t[e + 15] === f;
}
function C(e, t) {
  return t[e + 6];
}
function w(e, t) {
  return t[e + 14];
}
function T(e) {
  return e + 8;
}
function E(e, t) {
  return e + t[e + 6] * 8;
}
function D(e, t) {
  return t[e + 7];
}
function O(e) {
  return e;
}
function k(e, t, n, r, i) {
  let a = 1 / 0,
    o = 1 / 0,
    s = 1 / 0,
    c = -1 / 0,
    l = -1 / 0,
    u = -1 / 0,
    d = 1 / 0,
    f = 1 / 0,
    p = 1 / 0,
    m = -1 / 0,
    h = -1 / 0,
    g = -1 / 0,
    _ = e.offset || 0;
  for (let r = (t - _) * 6, i = (t + n - _) * 6; r < i; r += 6) {
    let t = e[r + 0],
      n = e[r + 1],
      i = t - n,
      _ = t + n;
    (i < a && (a = i), _ > c && (c = _), t < d && (d = t), t > m && (m = t));
    let v = e[r + 2],
      y = e[r + 3],
      b = v - y,
      x = v + y;
    (b < o && (o = b), x > l && (l = x), v < f && (f = v), v > h && (h = v));
    let S = e[r + 4],
      C = e[r + 5],
      w = S - C,
      T = S + C;
    (w < s && (s = w), T > u && (u = T), S < p && (p = S), S > g && (g = S));
  }
  ((r[0] = a),
    (r[1] = o),
    (r[2] = s),
    (r[3] = c),
    (r[4] = l),
    (r[5] = u),
    (i[0] = d),
    (i[1] = f),
    (i[2] = p),
    (i[3] = m),
    (i[4] = h),
    (i[5] = g));
}
var A = 32,
  j = (e, t) => e.candidate - t.candidate,
  M = Array(A)
    .fill()
    .map(() => ({
      count: 0,
      bounds: new Float32Array(6),
      rightCacheBounds: new Float32Array(6),
      leftCacheBounds: new Float32Array(6),
      candidate: 0,
    })),
  N = new Float32Array(6);
function ee(e, t, n, r, i, a) {
  let o = -1,
    s = 0;
  if (a === 0) ((o = _(t)), o !== -1 && (s = (t[o] + t[o + 3]) / 2));
  else if (a === 1) ((o = _(e)), o !== -1 && (s = P(n, r, i, o)));
  else if (a === 2) {
    let a = x(e),
      c = d * i,
      l = n.offset || 0,
      u = (r - l) * 6,
      f = (r + i - l) * 6;
    for (let e = 0; e < 3; e++) {
      let r = t[e],
        l = (t[e + 3] - r) / A;
      if (i < A / 4) {
        let t = [...M];
        t.length = i;
        let r = 0;
        for (let i = u; i < f; i += 6, r++) {
          let a = t[r];
          ((a.candidate = n[i + 2 * e]), (a.count = 0));
          let { bounds: o, leftCacheBounds: s, rightCacheBounds: c } = a;
          for (let e = 0; e < 3; e++)
            ((c[e] = 1 / 0),
              (c[e + 3] = -1 / 0),
              (s[e] = 1 / 0),
              (s[e + 3] = -1 / 0),
              (o[e] = 1 / 0),
              (o[e + 3] = -1 / 0));
          b(i, n, o);
        }
        t.sort(j);
        let l = i;
        for (let e = 0; e < l; e++) {
          let n = t[e];
          for (; e + 1 < l && t[e + 1].candidate === n.candidate;)
            (t.splice(e + 1, 1), l--);
        }
        for (let r = u; r < f; r += 6) {
          let i = n[r + 2 * e];
          for (let e = 0; e < l; e++) {
            let a = t[e];
            i >= a.candidate
              ? b(r, n, a.rightCacheBounds)
              : (b(r, n, a.leftCacheBounds), a.count++);
          }
        }
        for (let n = 0; n < l; n++) {
          let r = t[n],
            l = r.count,
            u = i - r.count,
            f = r.leftCacheBounds,
            p = r.rightCacheBounds,
            m = 0;
          l !== 0 && (m = x(f) / a);
          let h = 0;
          u !== 0 && (h = x(p) / a);
          let g = 1 + d * (m * l + h * u);
          g < c && ((o = e), (c = g), (s = r.candidate));
        }
      } else {
        for (let e = 0; e < A; e++) {
          let t = M[e];
          ((t.count = 0), (t.candidate = r + l + e * l));
          let n = t.bounds;
          for (let e = 0; e < 3; e++) ((n[e] = 1 / 0), (n[e + 3] = -1 / 0));
        }
        for (let t = u; t < f; t += 6) {
          let i = ~~((n[t + 2 * e] - r) / l);
          i >= A && (i = 31);
          let a = M[i];
          (a.count++, b(t, n, a.bounds));
        }
        let t = M[31];
        v(t.bounds, t.rightCacheBounds);
        for (let e = 30; e >= 0; e--) {
          let t = M[e],
            n = M[e + 1];
          y(t.bounds, n.rightCacheBounds, t.rightCacheBounds);
        }
        let p = 0;
        for (let t = 0; t < 31; t++) {
          let n = M[t],
            r = n.count,
            l = n.bounds,
            u = M[t + 1].rightCacheBounds;
          (r !== 0 && (p === 0 ? v(l, N) : y(l, N, N)), (p += r));
          let f = 0,
            m = 0;
          p !== 0 && (f = x(N) / a);
          let h = i - p;
          h !== 0 && (m = x(u) / a);
          let g = 1 + d * (f * p + m * h);
          g < c && ((o = e), (c = g), (s = n.candidate));
        }
      }
    }
  } else console.warn(`BVH: Invalid build strategy value ${a} used.`);
  return { axis: o, pos: s };
}
function P(e, t, n, r) {
  let i = 0,
    a = e.offset;
  for (let o = t, s = t + n; o < s; o++) i += e[(o - a) * 6 + r * 2];
  return i / n;
}
var F = class {
  constructor() {
    this.boundingData = new Float32Array(6);
  }
};
function te(e, t, n, r, i, a) {
  let o = r,
    s = r + i - 1,
    c = a.pos,
    l = a.axis * 2,
    u = n.offset || 0;
  for (;;) {
    for (; o <= s && n[(o - u) * 6 + l] < c;) o++;
    for (; o <= s && n[(s - u) * 6 + l] >= c;) s--;
    if (o < s) {
      for (let n = 0; n < t; n++) {
        let r = e[o * t + n];
        ((e[o * t + n] = e[s * t + n]), (e[s * t + n] = r));
      }
      for (let e = 0; e < 6; e++) {
        let t = o - u,
          r = s - u,
          i = n[t * 6 + e];
        ((n[t * 6 + e] = n[r * 6 + e]), (n[r * 6 + e] = i));
      }
      (o++, s--);
    } else return o;
  }
}
var I,
  L,
  R,
  ne,
  re = 2 ** 32;
function ie(e) {
  return `count` in e ? 1 : 1 + ie(e.left) + ie(e.right);
}
function ae(e, t, n) {
  return (
    (I = new Float32Array(n)),
    (L = new Uint32Array(n)),
    (R = new Uint16Array(n)),
    (ne = new Uint8Array(n)),
    oe(e, t)
  );
}
function oe(e, t) {
  let n = e / 4,
    r = e / 2,
    i = `count` in t,
    a = t.boundingData;
  for (let e = 0; e < 6; e++) I[n + e] = a[e];
  if (i)
    return t.buffer
      ? (ne.set(new Uint8Array(t.buffer), e), e + t.buffer.byteLength)
      : ((L[n + 6] = t.offset), (R[r + 14] = t.count), (R[r + 15] = f), e + 32);
  {
    let { left: r, right: i, splitAxis: a } = t,
      o = oe(e + 32, r),
      s = e / 32,
      c = o / 32 - s;
    if (c > re)
      throw Error(
        `MeshBVH: Cannot store relative child node offset greater than 32 bits.`,
      );
    return ((L[n + 6] = c), (L[n + 7] = a), oe(o, i));
  }
}
