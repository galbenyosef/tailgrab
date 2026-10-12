// assets__fxHooks-Cvx_8YWC 08 — absarc
// Lines 3352-3364 of readable/assets__fxHooks-Cvx_8YWC.pretty.js (statement-aligned).
function Xn(e, t, r) {
  let i = new n(),
    a = e / 2,
    o = t / 2;
  return (
    i.moveTo(-a, -o + r),
    i.lineTo(-a, o - r),
    i.absarc(-a + r, o - r, r, Math.PI, 0, !0),
    i.lineTo(a, -o + r),
    i.absarc(a - r, -o + r, r, 0, -Math.PI, !0),
    i
  );
}
