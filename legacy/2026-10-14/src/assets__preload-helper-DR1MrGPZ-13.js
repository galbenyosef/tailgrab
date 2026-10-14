// assets__preload-helper-DR1MrGPZ 13 — add
// Lines 4103-4231 of readable/assets__preload-helper-DR1MrGPZ.pretty.js (statement-aligned).
function In(e, t, n, r, i, a, o, s) {
  let c = e - o,
    l = t - s,
    u = n - o,
    d = r - s,
    f = i - o,
    p = a - s,
    m = c * c + l * l,
    h = u * u + d * d,
    g = f * f + p * p;
  return c * (d * g - h * p) - l * (u * g - h * f) + m * (u * p - d * f) < 0;
}
function Ln(e, t, n, r, i, a) {
  let o = n - e,
    s = r - t,
    c = i - e,
    l = a - t,
    u = o * o + s * s,
    d = c * c + l * l,
    f = 0.5 / (o * l - s * c),
    p = (l * u - s * d) * f,
    m = (o * d - c * u) * f;
  return p * p + m * m;
}
function Rn(e, t, n, r, i, a) {
  let o = n - e,
    s = r - t,
    c = i - e,
    l = a - t,
    u = o * o + s * s,
    d = c * c + l * l,
    f = 0.5 / (o * l - s * c);
  return { x: e + (l * u - s * d) * f, y: t + (o * d - c * u) * f };
}
function zn(e, t, n, r) {
  if (r - n <= 20)
    for (let i = n + 1; i <= r; i++) {
      let r = e[i],
        a = t[r],
        o = i - 1;
      for (; o >= n && t[e[o]] > a;) e[o + 1] = e[o--];
      e[o + 1] = r;
    }
  else {
    let i = (n + r) >> 1,
      a = n + 1,
      o = r;
    (Bn(e, i, a),
      t[e[n]] > t[e[r]] && Bn(e, n, r),
      t[e[a]] > t[e[r]] && Bn(e, a, r),
      t[e[n]] > t[e[a]] && Bn(e, n, a));
    let s = e[a],
      c = t[s];
    for (;;) {
      do a++;
      while (t[e[a]] < c);
      do o--;
      while (t[e[o]] > c);
      if (o < a) break;
      Bn(e, a, o);
    }
    ((e[n + 1] = e[o]),
      (e[o] = s),
      r - a + 1 >= o - n
        ? (zn(e, t, a, r), zn(e, t, n, o - 1))
        : (zn(e, t, n, o - 1), zn(e, t, a, r)));
  }
}
function Bn(e, t, n) {
  let r = e[t];
  ((e[t] = e[n]), (e[n] = r));
}
function Vn(e) {
  return e[0];
}
function Hn(e) {
  return e[1];
}
var Un = class {
    constructor(e, t) {
      ((this.W = e), (this.bs = t));
    }
    add(e) {
      let t = this.W,
        n = (e / t) | 0,
        r = e % t;
      return ((this.bs[n] |= 1 << r), this);
    }
    delete(e) {
      let t = this.W,
        n = (e / t) | 0,
        r = e % t;
      return ((this.bs[n] &= ~(1 << r)), this);
    }
    set(e, t) {
      let n = this.W,
        r = (e / n) | 0,
        i = 1 << (e % n);
      return ((this.bs[r] ^= (-t ^ this.bs[r]) & i), t);
    }
    has(e) {
      let t = this.W,
        n = (e / t) | 0,
        r = e % t;
      return !!(this.bs[n] & (1 << r));
    }
    forEach(e) {
      let t = this.W,
        n = this.bs,
        r = n.length;
      for (let i = 0; i < r; i++) {
        let r = 0;
        for (; n[i] && r < t;) (n[i] & (1 << r) && e(i * t + r), r++);
      }
      return this;
    }
  },
  Wn = class extends Un {
    constructor(e) {
      let t = new Uint8Array(Math.ceil(e / 8)).fill(0);
      super(8, t);
    }
  };
function Gn(e) {
  return e % 3 == 2 ? e - 2 : e + 1;
}
function Kn(e) {
  return e % 3 == 0 ? e + 2 : e - 1;
}
