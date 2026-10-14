// assets/preload-helper-DR1MrGPZ 10 — abs
// Lines 2676-2996 of readable/assets/preload-helper-DR1MrGPZ.pretty.js (statement-aligned).
var Ft = 11102230246251565e-32,
  Y = 134217729,
  It = 3.000000000000001 * Ft;
function Lt(e, t, n, r, i) {
  let a,
    o,
    s,
    c,
    l = t[0],
    u = r[0],
    d = 0,
    f = 0;
  u > l == u > -l ? ((a = l), (l = t[++d])) : ((a = u), (u = r[++f]));
  let p = 0;
  if (d < e && f < n)
    for (
      u > l == u > -l
        ? ((o = l + a), (s = a - (o - l)), (l = t[++d]))
        : ((o = u + a), (s = a - (o - u)), (u = r[++f])),
        a = o,
        s !== 0 && (i[p++] = s);
      d < e && f < n;
    )
      (u > l == u > -l
        ? ((o = a + l), (c = o - a), (s = a - (o - c) + (l - c)), (l = t[++d]))
        : ((o = a + u), (c = o - a), (s = a - (o - c) + (u - c)), (u = r[++f])),
        (a = o),
        s !== 0 && (i[p++] = s));
  for (; d < e;)
    ((o = a + l),
      (c = o - a),
      (s = a - (o - c) + (l - c)),
      (l = t[++d]),
      (a = o),
      s !== 0 && (i[p++] = s));
  for (; f < n;)
    ((o = a + u),
      (c = o - a),
      (s = a - (o - c) + (u - c)),
      (u = r[++f]),
      (a = o),
      s !== 0 && (i[p++] = s));
  return ((a !== 0 || p === 0) && (i[p++] = a), p);
}
function Rt(e, t, n, r, i, a, o, s) {
  return Lt(Lt(e, t, n, r, o), o, i, a, s);
}
function X(e, t, n, r) {
  let i, a, o, s, c, l, u, d, f, p, m;
  ((u = Y * n), (p = u - (u - n)), (m = n - p));
  let h = t[0];
  ((i = h * n),
    (u = Y * h),
    (d = u - (u - h)),
    (f = h - d),
    (o = f * m - (i - d * p - f * p - d * m)));
  let g = 0;
  o !== 0 && (r[g++] = o);
  for (let _ = 1; _ < e; _++)
    ((h = t[_]),
      (s = h * n),
      (u = Y * h),
      (d = u - (u - h)),
      (f = h - d),
      (c = f * m - (s - d * p - f * p - d * m)),
      (a = i + c),
      (l = a - i),
      (o = i - (a - l) + (c - l)),
      o !== 0 && (r[g++] = o),
      (i = s + a),
      (o = a - (i - s)),
      o !== 0 && (r[g++] = o));
  return ((i !== 0 || g === 0) && (r[g++] = i), g);
}
function zt(e, t) {
  let n = t[0];
  for (let r = 1; r < e; r++) n += t[r];
  return n;
}
function Z(e) {
  return new Float64Array(e);
}
var Bt = (3 + 16 * Ft) * Ft,
  Vt = (2 + 12 * Ft) * Ft,
  Ht = (9 + 64 * Ft) * Ft * Ft,
  Ut = Z(4),
  Wt = Z(8),
  Gt = Z(12),
  Kt = Z(16),
  qt = Z(4);
function Jt(e, t, n, r, i, a, o) {
  let s,
    c,
    l,
    u,
    d,
    f,
    p,
    m,
    h,
    g,
    _,
    v,
    y,
    b,
    x,
    S,
    C,
    w,
    T = e - i,
    E = n - i,
    D = t - a,
    O = r - a;
  ((b = T * O),
    (f = Y * T),
    (p = f - (f - T)),
    (m = T - p),
    (f = Y * O),
    (h = f - (f - O)),
    (g = O - h),
    (x = m * g - (b - p * h - m * h - p * g)),
    (S = D * E),
    (f = Y * D),
    (p = f - (f - D)),
    (m = D - p),
    (f = Y * E),
    (h = f - (f - E)),
    (g = E - h),
    (C = m * g - (S - p * h - m * h - p * g)),
    (_ = x - C),
    (d = x - _),
    (Ut[0] = x - (_ + d) + (d - C)),
    (v = b + _),
    (d = v - b),
    (y = b - (v - d) + (_ - d)),
    (_ = y - S),
    (d = y - _),
    (Ut[1] = y - (_ + d) + (d - S)),
    (w = v + _),
    (d = w - v),
    (Ut[2] = v - (w - d) + (_ - d)),
    (Ut[3] = w));
  let k = zt(4, Ut),
    A = Vt * o;
  if (
    k >= A ||
    -k >= A ||
    ((d = e - T),
    (s = e - (T + d) + (d - i)),
    (d = n - E),
    (l = n - (E + d) + (d - i)),
    (d = t - D),
    (c = t - (D + d) + (d - a)),
    (d = r - O),
    (u = r - (O + d) + (d - a)),
    s === 0 && c === 0 && l === 0 && u === 0) ||
    ((A = Ht * o + It * Math.abs(k)),
    (k += T * u + O * s - (D * l + E * c)),
    k >= A || -k >= A)
  )
    return k;
  ((b = s * O),
    (f = Y * s),
    (p = f - (f - s)),
    (m = s - p),
    (f = Y * O),
    (h = f - (f - O)),
    (g = O - h),
    (x = m * g - (b - p * h - m * h - p * g)),
    (S = c * E),
    (f = Y * c),
    (p = f - (f - c)),
    (m = c - p),
    (f = Y * E),
    (h = f - (f - E)),
    (g = E - h),
    (C = m * g - (S - p * h - m * h - p * g)),
    (_ = x - C),
    (d = x - _),
    (qt[0] = x - (_ + d) + (d - C)),
    (v = b + _),
    (d = v - b),
    (y = b - (v - d) + (_ - d)),
    (_ = y - S),
    (d = y - _),
    (qt[1] = y - (_ + d) + (d - S)),
    (w = v + _),
    (d = w - v),
    (qt[2] = v - (w - d) + (_ - d)),
    (qt[3] = w));
  let j = Lt(4, Ut, 4, qt, Wt);
  ((b = T * u),
    (f = Y * T),
    (p = f - (f - T)),
    (m = T - p),
    (f = Y * u),
    (h = f - (f - u)),
    (g = u - h),
    (x = m * g - (b - p * h - m * h - p * g)),
    (S = D * l),
    (f = Y * D),
    (p = f - (f - D)),
    (m = D - p),
    (f = Y * l),
    (h = f - (f - l)),
    (g = l - h),
    (C = m * g - (S - p * h - m * h - p * g)),
    (_ = x - C),
    (d = x - _),
    (qt[0] = x - (_ + d) + (d - C)),
    (v = b + _),
    (d = v - b),
    (y = b - (v - d) + (_ - d)),
    (_ = y - S),
    (d = y - _),
    (qt[1] = y - (_ + d) + (d - S)),
    (w = v + _),
    (d = w - v),
    (qt[2] = v - (w - d) + (_ - d)),
    (qt[3] = w));
  let M = Lt(j, Wt, 4, qt, Gt);
  return (
    (b = s * u),
    (f = Y * s),
    (p = f - (f - s)),
    (m = s - p),
    (f = Y * u),
    (h = f - (f - u)),
    (g = u - h),
    (x = m * g - (b - p * h - m * h - p * g)),
    (S = c * l),
    (f = Y * c),
    (p = f - (f - c)),
    (m = c - p),
    (f = Y * l),
    (h = f - (f - l)),
    (g = l - h),
    (C = m * g - (S - p * h - m * h - p * g)),
    (_ = x - C),
    (d = x - _),
    (qt[0] = x - (_ + d) + (d - C)),
    (v = b + _),
    (d = v - b),
    (y = b - (v - d) + (_ - d)),
    (_ = y - S),
    (d = y - _),
    (qt[1] = y - (_ + d) + (d - S)),
    (w = v + _),
    (d = w - v),
    (qt[2] = v - (w - d) + (_ - d)),
    (qt[3] = w),
    Kt[Lt(M, Gt, 4, qt, Kt) - 1]
  );
}
function Yt(e, t, n, r, i, a) {
  let o = (t - a) * (n - i),
    s = (e - i) * (r - a),
    c = o - s,
    l = Math.abs(o + s);
  return Math.abs(c) >= Bt * l ? c : -Jt(e, t, n, r, i, a, l);
}
((7 + 56 * Ft) * Ft,
  (3 + 28 * Ft) * Ft,
  (26 + 288 * Ft) * Ft * Ft,
  Z(4),
  Z(4),
  Z(4),
  Z(4),
  Z(4),
  Z(4),
  Z(4),
  Z(4),
  Z(4),
  Z(8),
  Z(8),
  Z(8),
  Z(4),
  Z(8),
  Z(8),
  Z(8),
  Z(12),
  Z(192),
  Z(192));
var Xt = (10 + 96 * Ft) * Ft,
  Zt = (4 + 48 * Ft) * Ft,
  Qt = (44 + 576 * Ft) * Ft * Ft,
  $t = Z(4),
  en = Z(4),
  tn = Z(4),
  nn = Z(4),
  rn = Z(4),
  an = Z(4),
  on = Z(4),
  sn = Z(4),
  cn = Z(8),
  ln = Z(8),
  un = Z(8),
  dn = Z(8),
  fn = Z(8),
  pn = Z(8),
  mn = Z(8),
  hn = Z(8),
  gn = Z(8),
  _n = Z(4),
  vn = Z(4),
  yn = Z(4),
  Q = Z(8),
  $ = Z(16),
  bn = Z(16),
  xn = Z(16),
  Sn = Z(32),
  Cn = Z(32),
  wn = Z(48),
  Tn = Z(64),
  En = Z(1152),
  Dn = Z(1152);
function On(e, t, n) {
  e = Lt(e, En, t, n, Dn);
  let r = En;
  return ((En = Dn), (Dn = r), e);
}
