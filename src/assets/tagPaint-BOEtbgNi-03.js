// assets/tagPaint-BOEtbgNi 03 — push
// Lines 1027-1128 of readable/assets/tagPaint-BOEtbgNi.pretty.js (statement-aligned).
function gt(e, t, n, r) {
  let i = [];
  if (n.field !== void 0) {
    let r = new Map();
    (i.push(
      e.onAdd(n.collection, (i, a) => {
        r.has(i) ||
          r.set(
            i,
            e.listen(
              i,
              n.field,
              (e) => {
                e === n.equals && t.confirm(a);
              },
              !1,
            ),
          );
      }),
    ),
      i.push(
        e.onRemove(n.collection, (e) => {
          (r.get(e)?.(), r.delete(e));
        }),
      ),
      i.push(() => {
        for (let e of r.values()) e();
        r.clear();
      }));
  } else
    n.event === `remove`
      ? i.push(
          e.onRemove(n.collection, (e, n) => {
            t.confirm(n);
          }),
        )
      : i.push(
          e.onAdd(
            n.collection,
            (e) => {
              (n.mine === void 0 || e[n.mine] === r?.()) && t.confirm();
            },
            !1,
          ),
        );
  return () => {
    for (let e of i.splice(0)) e?.();
  };
}
var T = 16,
  E = 0,
  D = 1,
  O = 2,
  k = 3,
  _t = 4,
  vt = 5,
  yt = 6,
  bt = 7,
  xt = 8,
  St = 9,
  A = 41,
  Ct = 3,
  wt = 1.5,
  Tt = 250,
  j = 7,
  Et = 0,
  Dt = 1,
  Ot = 2,
  kt = 3,
  At = 4,
  jt = 5,
  Mt = 6,
  M = 0,
  Nt = 0,
  Pt = 1,
  Ft = 2,
  It = 3,
  Lt = 4,
  Rt = 5,
  zt = { lerp: Nt, extrapolate: Pt, damped: Ft, reckon: It, raw: Lt },
  N = {
    mode: `lerp`,
    delay: 100,
    smoothMs: 50,
    maxExtrapolate: 200,
    tickInterval: 0,
    snap: 0,
    angle: !1,
  },
  Bt = { step: void 0, smoothMs: 50, substep: 16, snap: 0 };
function Vt(e) {
  return typeof e != `object` || !e ? !1 : Array.isArray(e.fields);
}
var Ht = 0,
  Ut = !1;
function Wt() {
  Ut ||
    ((Ut = !0),
    console.warn(
      `@colyseus/sdk Predict: room.clock isn't server-synced because the server room didn't call defineInput(). Server-time interpolation and lag compensation fall back to local time. Add defineInput() on the server room to enable them — or ignore this if you only need local smoothing.`,
    ));
}
