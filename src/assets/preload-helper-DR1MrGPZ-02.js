// assets/preload-helper-DR1MrGPZ 02 — math
// Lines 335-683 of readable/assets/preload-helper-DR1MrGPZ.pretty.js (statement-aligned).
function ce(t, r, a) {
  ((r -= t.ox), (a -= t.oz));
  let o = { s: 0, u: 0, d: 1 / 0, sx: 0, sz: 0, dx: 0, dz: 0 };
  for (let s of t.segs) {
    let t,
      c = 1;
    if (s.turn === 0) {
      let e = i(s.h0),
        o = n(s.h0);
      t = Math.min(Math.max((r - s.x0) * e + (a - s.z0) * o, 0), s.len);
    } else {
      let n = s.turn > 0 ? 1 : -1,
        i = e(a - s.cz, r - s.cx),
        o = n > 0 ? Math.PI - i : -i,
        l = se(n > 0 ? o - s.h0 : s.h0 - o),
        u = Math.abs(s.turn);
      if (l <= u) t = (l / u) * s.len;
      else {
        let e = U(s, 0),
          n = U(s, s.len);
        t =
          (e.x - r) * (e.x - r) + (e.z - a) * (e.z - a) <=
          (n.x - r) * (n.x - r) + (n.z - a) * (n.z - a)
            ? 0
            : s.len;
      }
      let d = Math.sqrt((r - s.cx) * (r - s.cx) + (a - s.cz) * (a - s.cz));
      c = d > 1e-9 ? s.R / d : 1;
    }
    let l = U(s, t),
      u = r - l.x,
      d = a - l.z,
      f = Math.sqrt(u * u + d * d);
    if (f < o.d) {
      let e = -n(l.h),
        r = i(l.h),
        a = i(l.h),
        p = n(l.h),
        m = t > 1e-9 && t < s.len - 1e-9;
      o = {
        s: s.s0 + t,
        u: u * e + d * r,
        d: f,
        sx: m ? a * c : 0,
        sz: m ? p * c : 0,
        dx: f > 1e-12 ? u / f : 0,
        dz: f > 1e-12 ? d / f : 0,
      };
    }
  }
  return o;
}
var le = (e) => e * e * e * (10 - 15 * e + 6 * e * e),
  ue = (e) => 30 * e * e * (1 - e) * (1 - e),
  de = 0,
  fe = 0,
  pe = 0,
  me = 0,
  he = 0;
function ge(e, t) {
  if (e <= 0) {
    ((de = 1), (fe = 0));
    return;
  }
  if (e >= t) {
    ((de = 0), (fe = 0));
    return;
  }
  let n = e / t;
  ((de = 1 - le(n)), (fe = -ue(n) / t));
}
function _e(e, t, n) {
  let r = t < e.x0 ? t - e.x0 : t > e.x1 ? t - e.x1 : 0,
    i = n < e.z0 ? n - e.z0 : n > e.z1 ? n - e.z1 : 0,
    a = Math.sqrt(r * r + i * i);
  ((pe = a), (me = a > 0 ? r / a : 0), (he = a > 0 ? i / a : 0));
}
var ve = (e, t, n, r) =>
    t > e.box.x0 - r &&
    t < e.box.x1 + r &&
    n > e.box.z0 - r &&
    n < e.box.z1 + r,
  ye = (e, t, n, r = 0) =>
    t >= e.x0 - r && t <= e.x1 + r && n >= e.z0 - r && n <= e.z1 + r;
function be(e, t, n) {
  let r = !1;
  for (let i = 0, a = e.length - 2; i < e.length; a = i, i += 2) {
    let o = e[i],
      s = e[i + 1],
      c = e[a],
      l = e[a + 1];
    s > n != l > n && t < ((c - o) * (n - s)) / (l - s) + o && (r = !r);
  }
  return r;
}
function xe(e, r) {
  let a = `terrain ${e.id}`;
  if (e.coarse !== void 0 && !(e.coarse >= 1))
    throw Error(`${a}: coarse must be ≥ 1 m`);
  if (e.fine !== void 0 && !(e.fine >= 0.25))
    throw Error(`${a}: fine must be ≥ 0.25 m`);
  for (let t of e.features)
    if (t.f === `noise` && !(t.cell > 0))
      throw Error(`${a}: noise cell must be > 0`);
  if (e.x !== 0 || e.z !== 0 || (e.y ?? 0) !== 0 || (e.rot ?? 0) !== 0)
    throw Error(
      `${a}: terrain sits at the origin, unrotated (its rect places it)`,
    );
  let o = e.rect,
    s = r
      .filter(
        (e) =>
          e.x + e.w / 2 > o.x0 &&
          e.x - e.w / 2 < o.x1 &&
          e.z + e.d / 2 > o.z0 &&
          e.z - e.d / 2 < o.z1,
      )
      .map((e) => {
        if ((e.rot ?? 0) !== 0)
          throw Error(
            `${a}: floor ${e.id} must be unrotated on a terrain park`,
          );
        let t = {
          x0: e.x - e.w / 2,
          x1: e.x + e.w / 2,
          z0: e.z - e.d / 2,
          z1: e.z + e.d / 2,
        };
        if (
          t.x0 < o.x0 + 0.5 ||
          t.x1 > o.x1 - 0.5 ||
          t.z0 < o.z0 + 0.5 ||
          t.z1 > o.z1 - 0.5
        )
          throw Error(
            `${a}: floor ${e.id} must sit ≥ 0.5 m inside the terrain rect`,
          );
        return { id: e.id, rect: t, y: e.y ?? 0 };
      }),
    c = [],
    l = e.features.map((e) => {
      if (e.f === `path`) {
        let t = e.w / 2 + (e.walk ?? 0) + e.blend;
        for (let n of e.path.plan)
          if (`arc` in n && n.arc < t / 0.8)
            throw Error(
              `${a}: a street arc of radius ${n.arc} is too tight for its width and blend (needs ≥ ${(t / 0.8).toFixed(1)})`,
            );
        let r = q(e.path),
          o = { x0: 1 / 0, x1: -1 / 0, z0: 1 / 0, z1: -1 / 0 };
        for (let e = 0; e <= r.length; e += 0.5) {
          let t = te(r, Math.min(e, r.length));
          ((o.x0 = Math.min(o.x0, t.x)),
            (o.x1 = Math.max(o.x1, t.x)),
            (o.z0 = Math.min(o.z0, t.z)),
            (o.z1 = Math.max(o.z1, t.z)));
        }
        let s = { f: e, c: r, cs: n(e.rot ?? 0), sn: i(e.rot ?? 0), box: o };
        return (c.push(s), s);
      }
      if (e.f === `pad` && !s.some((t) => t.id === e.floor))
        throw Error(
          `${a}: pad names floor ${e.floor}, which isn't on the terrain`,
        );
      return e;
    }),
    u = [
      ...l.filter((e) => !(`f` in e && e.f === `pad`)),
      ...l.filter((e) => `f` in e && e.f === `pad`),
    ],
    d = (r, a, o) => {
      let c = e.base,
        l = 0,
        d = 0;
      for (let e of u) {
        if (`c` in e) {
          let t = e.f,
            n = r - t.x,
            i = a - t.z,
            o = n * e.cs - i * e.sn,
            s = n * e.sn + i * e.cs,
            u = t.w / 2 + (t.walk ?? 0);
          if (!ve(e, o, s, u + t.blend)) continue;
          let f = ce(e.c, o, s);
          ge(f.d - u, t.blend);
          let p = de,
            m = fe;
          if (p <= 0) continue;
          let h = K(e.c, f.s),
            g = (t.y ?? 0) + h.y,
            _ = h.g * f.sx,
            v = h.g * f.sz,
            y = m * f.dx,
            b = m * f.dz,
            x = _ * e.cs + v * e.sn,
            S = -_ * e.sn + v * e.cs,
            C = y * e.cs + b * e.sn,
            w = -y * e.sn + b * e.cs;
          ((l = (1 - p) * l + p * x + (g - c) * C),
            (d = (1 - p) * d + p * S + (g - c) * w),
            (c = (1 - p) * c + p * g));
          continue;
        }
        switch (e.f) {
          case `hill`: {
            let t = e.rz ?? e.r,
              o = n(e.rot ?? 0),
              s = i(e.rot ?? 0),
              u = r - e.x,
              f = a - e.z,
              p = u * o - f * s,
              m = u * s + f * o,
              h = Math.sqrt((p * p) / (e.r * e.r) + (m * m) / (t * t));
            if (h >= 1) break;
            if (((c += e.h * (1 - le(h))), h > 1e-12)) {
              let n = (-e.h * ue(h)) / h,
                r = (n * p) / (e.r * e.r),
                i = (n * m) / (t * t);
              ((l += r * o + i * s), (d += -r * s + i * o));
            }
            break;
          }
          case `tilt`: {
            let t = i(e.dir),
              o = n(e.dir);
            ((c += e.grade * ((r - e.x) * t + (a - e.z) * o)),
              (l += e.grade * t),
              (d += e.grade * o));
            break;
          }
          case `noise`: {
            let n = r / e.cell,
              i = a / e.cell,
              o = Math.floor(n),
              s = Math.floor(i),
              u = n - o,
              f = i - s,
              p = (n, r) =>
                t(n * 73856093 + e.seed, r * 19349663 + e.seed * 83492791),
              m = p(o, s),
              h = p(o + 1, s),
              g = p(o, s + 1),
              _ = p(o + 1, s + 1),
              v = u * u * (3 - 2 * u),
              y = f * f * (3 - 2 * f),
              b = 6 * u * (1 - u),
              x = 6 * f * (1 - f),
              S = m + (h - m) * v,
              C = g + (_ - g) * v;
            ((c += e.amp * (S + (C - S) * y)),
              (l += (e.amp * (h - m + (_ - g - (h - m)) * y) * b) / e.cell),
              (d += (e.amp * (C - S) * x) / e.cell));
            break;
          }
          case `flat`:
          case `pad`: {
            let t = e.f === `flat` ? e : s.find((t) => t.id === e.floor).rect,
              n = e.f === `flat` ? e.y : s.find((t) => t.id === e.floor).y;
            _e(t, r, a);
            let i = pe,
              o = me,
              u = he;
            ge(e.f === `pad` ? i - 0.1 : i, e.blend);
            let f = de,
              p = fe;
            if (f <= 0) break;
            ((l = (1 - f) * l + (n - c) * p * o),
              (d = (1 - f) * d + (n - c) * p * u),
              (c = (1 - f) * c + f * n));
            break;
          }
        }
      }
      return ((o.y = c), (o.gx = l), (o.gz = d), o);
    },
    f = { y: 0, gx: 0, gz: 0 },
    p = {
      terrain: e,
      rect: o,
      floors: s,
      sample: d,
      normal(e, t, n) {
        d(e, t, f);
        let r = Math.sqrt(f.gx * f.gx + 1 + f.gz * f.gz);
        ((n.x = -f.gx / r), (n.y = 1 / r), (n.z = -f.gz / r));
      },
      y(e, t) {
        for (let n of s) if (ye(n.rect, e, t)) return n.y;
        return ye(o, e, t) ? d(e, t, f).y : 0;
      },
      minUnder(e) {
        let t = 1 / 0;
        for (let n = 0; n < e.length; n++) {
          let r = e[n],
            i = e[(n + 1) % e.length],
            a = Math.max(
              1,
              Math.ceil(
                Math.sqrt(
                  (i.x - r.x) * (i.x - r.x) + (i.z - r.z) * (i.z - r.z),
                ) / 0.5,
              ),
            );
          for (let e = 0; e < a; e++)
            t = Math.min(
              t,
              p.y(r.x + ((i.x - r.x) * e) / a, r.z + ((i.z - r.z) * e) / a),
            );
        }
        return t;
      },
      paint(t, n) {
        let r = e.skin ?? `grass`;
        for (let e of l)
          if (`c` in e) {
            if (e.f.plain) continue;
            let i = e.f,
              a = t - i.x,
              o = n - i.z,
              s = ce(e.c, a * e.cs - o * e.sn, a * e.sn + o * e.cs).d;
            s <= i.w / 2
              ? (r = i.skin ?? `asphalt`)
              : s <= i.w / 2 + (i.walk ?? 0) && (r = i.walkSkin ?? `concrete`);
          } else
            ((e.f === `flat` && e.skin && ye(e, t, n)) ||
              (e.f === `paint` && be(e.loop, t, n))) &&
              (r = e.skin);
        return r;
      },
    };
  return (Se(p, a), p);
}
function Se(e, t) {
  let r = e.terrain.maxDeg ?? 15,
    a = i((r * Math.PI) / 180) / n((r * Math.PI) / 180),
    o = { y: 0, gx: 0, gz: 0 },
    s = e.rect;
  for (let n = s.x0; n <= s.x1; n += 2)
    for (let i = s.z0; i <= s.z1; i += 2) {
      if (e.floors.some((e) => ye(e.rect, n, i, -0.01))) continue;
      e.sample(n, i, o);
      let s = Math.sqrt(o.gx * o.gx + o.gz * o.gz);
      if (s > a + 1e-6)
        throw Error(
          `${t}: ${((Math.atan(s) * 180) / Math.PI).toFixed(1)}° at (${n.toFixed(1)}, ${i.toFixed(1)}) — over ${r}° (widen a blend or a hill)`,
        );
    }
}
var Ce = new WeakMap();
