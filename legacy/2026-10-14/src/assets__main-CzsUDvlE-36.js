// assets__main-CzsUDvlE 36 — math
// Lines 12093-12371 of readable/assets__main-CzsUDvlE.pretty.js (statement-aligned).
function Dp(e, t) {
  if (!hp(e)) return [t];
  let n = e.section,
    r = e.y ?? 0,
    i = [{ ...t, y0: r - (n.t ?? 0.5), y1: r }];
  for (let t of ne(e)) {
    let [n, a, o] = bp(e, t.x, t.y0, t.z);
    i.push({
      x0: n - t.a,
      x1: n + t.a,
      y0: a,
      y1: r,
      z0: o - t.a,
      z1: o + t.a,
    });
  }
  for (let t of oe(e).rails) {
    if (t.kind !== xe.RAIL) continue;
    let n = { x0: 1 / 0, x1: -1 / 0, y0: r, y1: r, z0: 1 / 0, z1: -1 / 0 };
    for (let r = 0; r < t.path.length; r += 3) {
      let [i, a, o] = bp(e, t.path[r], t.path[r + 1], t.path[r + 2]);
      ((n.x0 = Math.min(n.x0, i - 0.06)),
        (n.x1 = Math.max(n.x1, i + 0.06)),
        (n.z0 = Math.min(n.z0, o - 0.06)),
        (n.z1 = Math.max(n.z1, o + 0.06)),
        (n.y1 = Math.max(n.y1, a)));
    }
    i.push(n);
  }
  return i;
}
var Op = ve();
function kp(e, t, n, r) {
  for (let i = 0; i < t.length; i += 2)
    if (
      r
        ? !yp(e, t[i], n + 0.02, t[i + 1], 0, -1, 0, 0.08, r)
        : !e.col.raySurface(t[i], n + 0.02, t[i + 1], 0, -1, 0, 0.08, Op)
    )
      return !1;
  return !0;
}
var Ap = (e) => (e.name ?? e.kind).toLowerCase();
function jp(e, t, n, r = {}) {
  let { layout: i } = e,
    a = r.ignore,
    o = i.pieces.find((e) => e.kind === `floor`),
    s = n.reduce((e, t) => ({
      x0: Math.min(e.x0, t.x0),
      x1: Math.max(e.x1, t.x1),
      y0: Math.min(e.y0, t.y0),
      y1: Math.max(e.y1, t.y1),
      z0: Math.min(e.z0, t.z0),
      z1: Math.max(e.z1, t.z1),
    }));
  if (
    (o?.kind === `floor` &&
      (s.x0 < o.x - o.w / 2 ||
        s.x1 > o.x + o.w / 2 ||
        s.z0 < o.z - o.d / 2 ||
        s.z1 > o.z + o.d / 2)) ||
    s.y1 > 12.001
  )
    return !1;
  let c = i.spawns[0];
  if (c) {
    let e = {
      x0: c.x - 0.6,
      x1: c.x + 0.6,
      y0: c.y + 0.05,
      y1: c.y + lp,
      z0: c.z - 0.6,
      z1: c.z + 0.6,
    };
    if (n.some((t) => dp(t, e, 0))) return !1;
  }
  for (let [r, i] of t) {
    let t = e.pieces.get(r);
    if (!t || a?.has(r) || t.kind === `floor` || !dp(s, i, 0.05)) continue;
    let o = Np(t, i);
    if (n.some((e) => o.some((t) => dp(e, t, 0.05)))) return !1;
  }
  for (let e of ce(i)) if (!a?.has(e.piece) && fp(s, e.rect, 0.02)) return !1;
  return !(
    r.base &&
    r.base.y > 0.05 &&
    !kp(e, r.base.pts, r.base.y, a ? (e) => a.has(e) : void 0)
  );
}
var Mp = new WeakMap();
function Np(e, t) {
  let n = Mp.get(e);
  return (n || Mp.set(e, (n = Dp(e, t))), n);
}
var Pp = {
    plan: 0.6,
    side: 0.35,
    back: 0.3,
    dy: 0.6,
    cos: 0.7,
    touch: 0.06,
    turnCos: 0.34,
  },
  Fp = 64,
  Ip = 0.02;
function Lp(e, t = {}) {
  let n = e.rails.segs,
    r = (n) => !!t.ignore?.has(n) || e.pieces.get(n)?.kind === `prop`,
    i = (e) => !t.kinds || t.kinds.includes(e.kind),
    a = [],
    o = new Set(),
    s = [];
  for (let e of n)
    if (!r(e.piece) && i(e))
      for (let [i, c] of [
        [e.prev, !1],
        [e.next, !0],
      ]) {
        let l = i >= 0 ? n[i] : null;
        if (l && !r(l.piece)) {
          if (l.piece !== e.piece && !t.extra) {
            let t = Math.min(e.id, l.id) * 65536 + Math.max(e.id, l.id);
            o.has(t) ||
              (o.add(t),
              a.push({
                x: c ? e.bx : e.ax,
                y: c ? e.by : e.ay,
                z: c ? e.bz : e.az,
                tx: e.tx,
                ty: e.ty,
                tz: e.tz,
                kind: e.kind,
                pieces: [e.piece, l.piece],
              }));
          }
          continue;
        }
        s.push(Hp(e, c));
      }
  let c = new Map();
  for (let e of s) {
    let t = Up(Math.floor(e.x), Math.floor(e.z)),
      n = c.get(t);
    n ? n.push(e) : c.set(t, [e]);
  }
  let l = t.extra
      ? t.extra
          .filter(i)
          .flatMap((e) => [
            ...(e.prev < 0 ? [Hp(e, !1)] : []),
            ...(e.next < 0 ? [Hp(e, !0)] : []),
          ])
      : s,
    u = [],
    d = new Set(),
    f = [];
  for (let e of l) {
    let n = Math.floor(e.x),
      r = Math.floor(e.z);
    for (let i = -1; i <= 1; i++)
      for (let a = -1; a <= 1; a++)
        for (let o of c.get(Up(n + i, r + a)) ?? []) {
          if (o.piece === e.piece) continue;
          let n = o.x - e.x,
            r = o.y - e.y,
            i = o.z - e.z,
            a = Math.sqrt(n * n + r * r + i * i),
            s = -(e.tx * o.tx + e.ty * o.ty + e.tz * o.tz);
          if (t.extra && a <= 0.03 && s >= ae) {
            (u.push({
              x: e.x,
              y: e.y,
              z: e.z,
              tx: e.tx,
              ty: e.ty,
              tz: e.tz,
              kind: e.kind,
              pieces: [e.piece, o.piece],
            }),
              d.add(e));
            continue;
          }
          let c = a <= Pp.touch && s >= Pp.turnCos && s < ae;
          if (!c && s < Pp.cos) continue;
          let l = Math.sqrt(e.tx * e.tx + e.tz * e.tz) || 1,
            p = e.tx / l,
            m = e.tz / l,
            h = Math.sqrt(n * n + i * i),
            g = n * p + i * m,
            _ = Math.abs(n * m - i * p);
          if (
            !c &&
            (h > Pp.plan || _ > Pp.side || g < -Pp.back || Math.abs(r) > Pp.dy)
          )
            continue;
          let v = Wp(g, _, r, c);
          if (!v.length) continue;
          let y = (180 / Math.PI) * Math.acos(Math.max(-1, Math.min(1, s)));
          f.push({
            at: e,
            other: o,
            gap: h,
            along: g,
            side: _,
            dy: r,
            angle: y,
            faults: v,
            score: h + Math.abs(r) + (1 - s),
          });
        }
  }
  f.sort((e, t) => e.score - t.score);
  let p = new Set(),
    m = [];
  for (let { score: e, ...t } of f)
    if (
      !(p.has(t.at) || p.has(t.other)) &&
      (p.add(t.at), p.add(t.other), m.push(t), m.length >= Fp)
    )
      break;
  let h = Rp(e, r);
  for (let t of l) {
    if (m.length >= Fp) break;
    if (p.has(t) || d.has(t) || !h(t)) continue;
    let n = Vp(e, t, r);
    n && m.push(n);
  }
  return { joined: a.slice(0, 256), near: m, would: u };
}
function Rp(e, t) {
  let n = new Map(),
    r = (e, t, n, r, i) => {
      for (let a = Math.floor(e / 4); a <= Math.floor(t / 4); a++)
        for (let e = Math.floor(n / 4); e <= Math.floor(r / 4); e++)
          i(Up(a, e));
    };
  for (let [i, a] of up(e.col)) {
    let o = e.pieces.get(i);
    !o ||
      ba(o) ||
      t(i) ||
      r(a.x0, a.x1, a.z0, a.z1, (e) => {
        let t = n.get(e);
        t ? t.push([i, a]) : n.set(e, [[i, a]]);
      });
  }
  let i = Pp.plan;
  return (e) => {
    let t = e.x - i,
      a = e.x + i,
      o = e.z - i,
      s = e.z + i,
      c = e.y - Pp.dy,
      l = e.y + Pp.dy,
      u = !1;
    return (
      r(t, a, o, s, (r) => {
        if (!u) {
          for (let [i, d] of n.get(r) ?? [])
            if (
              i !== e.piece &&
              d.x1 >= t &&
              d.x0 <= a &&
              d.z1 >= o &&
              d.z0 <= s &&
              d.y1 >= c &&
              d.y0 <= l
            ) {
              u = !0;
              break;
            }
        }
      }),
      u
    );
  };
}
var zp = ve(),
  Bp = 0.05;
