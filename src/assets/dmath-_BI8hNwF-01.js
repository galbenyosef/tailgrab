// assets/dmath-_BI8hNwF 01 — math
// Lines 1-105 of readable/assets/dmath-_BI8hNwF.pretty.js (statement-aligned).
var e = 1.5707963267341256,
  t = 6077100506506192e-26,
  n = 3.141592653589793,
  r = 6.283185307179586,
  i = 1.5707963267948966,
  a = 0.6366197723675814;
function o(e) {
  let t = e * e;
  return (
    e *
    (1 +
      t *
        (-1 / 6 +
          t *
            (1 / 120 +
              t * (-1 / 5040 + t * (1 / 362880 + (-1 / 39916800) * t)))))
  );
}
function s(e) {
  let t = e * e;
  return (
    1 +
    t *
      (-1 / 2 +
        t *
          (1 / 24 +
            t *
              (-1 / 720 +
                t * (1 / 40320 + t * (-1 / 3628800 + (1 / 479001600) * t)))))
  );
}
function c(n) {
  let r = Math.round(n * a),
    i = n - r * e - r * t;
  switch (((r % 4) + 4) % 4) {
    case 0:
      return o(i);
    case 1:
      return s(i);
    case 2:
      return -o(i);
    default:
      return -s(i);
  }
}
function l(n) {
  let r = Math.round(n * a),
    i = n - r * e - r * t;
  switch (((r % 4) + 4) % 4) {
    case 0:
      return s(i);
    case 1:
      return -o(i);
    case 2:
      return -s(i);
    default:
      return o(i);
  }
}
function u(e) {
  let t = e / (1 + Math.sqrt(1 + e * e));
  t /= 1 + Math.sqrt(1 + t * t);
  let n = t * t;
  return (
    4 *
    (t *
      (1 +
        n *
          (-1 / 3 +
            n *
              (1 / 5 +
                n *
                  (-1 / 7 +
                    n *
                      (1 / 9 +
                        n * (-1 / 11 + n * (1 / 13 + (-1 / 15) * n))))))))
  );
}
function d(e) {
  return e > 1 ? i - u(1 / e) : e < -1 ? -1.5707963267948966 - u(1 / e) : u(e);
}
function f(e, t) {
  return t > 0
    ? d(e / t)
    : t < 0
      ? e >= 0
        ? d(e / t) + n
        : d(e / t) - n
      : e > 0
        ? i
        : e < 0
          ? -1.5707963267948966
          : 0;
}
function p(e, t) {
  let n = Math.imul(e | 0, 668265261) ^ Math.imul(t | 0, 374761393);
  return (
    (n = Math.imul(n ^ (n >>> 15), 2246822507)),
    (n = Math.imul(n ^ (n >>> 13), 3266489909)),
    (n ^= n >>> 16),
    (n | 0) * 4656612873077393e-25
  );
}
var m = (e, t, n) => (e < t ? t : e > n ? n : e),
  h = (e, t, n) => e + (t - e) * n;
