// assets__parkModel-DmiMeogd 04 — math
// Lines 746-1037 of readable/assets__parkModel-DmiMeogd.pretty.js (statement-aligned).
function We(e, t) {
  let n = new Ue(),
    r = e.cx,
    i = e.cz,
    a = t.floorY,
    o = (e, t, n) => [r + se(e) * t, n, i + C(e) * t],
    s = [r, a, i],
    l = Math.tan(-0.25 * L) * j,
    u = Math.tan(1.4 * L) * j;
  for (let e = 0; e < 90; e++) {
    let t = (e / 90) * 360,
      r = ((e + 1) / 90) * 360,
      i = o(t, j, l),
      a = o(r, j, l),
      c = o(t, j, 0),
      d = o(r, j, 0),
      f = o(t, j, u),
      p = o(r, j, u);
    (n.band(i, a, d, 0, 0, 0.12, s),
      n.band(i, d, c, 0, 0.12, 0.12, s),
      n.band(c, d, p, 0.12, 0.12, 1, s),
      n.band(c, p, f, 0.12, 1, 1, s));
  }
  for (let e of t.banks)
    for (let t of e.puffs) {
      let r = e.bearing + t.a,
        i = e.elev + t.e,
        a = Math.tan(e.elev * L) * A,
        c = o(r, A, Math.tan(i * L) * A),
        l = (e) => {
          let n = o(r + Math.cos(e) * t.r, A, 0);
          return [
            n[0],
            Math.max(a, c[1] + Math.sin(e) * Math.tan(t.r * L) * A),
            n[2],
          ];
        };
      for (let t = 0; t < 12; t++) {
        let r = (t / 12) * Math.PI * 2,
          i = ((t + 1) / 12) * Math.PI * 2;
        n.tri(
          c,
          l(r),
          l(i),
          Math.sin((r + i) / 2) < -0.2 ? T(e.col, 0.93) : e.col,
          0.22,
          s,
          !0,
          1,
        );
      }
    }
  let f = [];
  for (let e of t.ranges)
    f.push({
      r: e.r,
      draw() {
        let t = Pe(e.seed),
          r = Math.max(...e.elev.map((t) => Math.tan(t * L) * e.r)),
          i = (n) => {
            let r = e.from + n * e.step,
              i = Math.tan(e.elev[n] * L) * e.r;
            return {
              base: o(r, e.r, a),
              mid: o(
                r + t() * e.step * 0.4,
                e.r * (1.04 + t() * 0.02),
                a + i * (0.5 + t() * 0.18),
              ),
              crest: o(r, e.r * 1.09, a + i),
              h: i,
            };
          },
          c = i(0);
        for (let a = 1; a < e.elev.length; a++) {
          let o = i(a);
          if (c.h < 0.5 && o.h < 0.5) {
            c = o;
            continue;
          }
          let l = Math.max(c.h, o.h) > e.snow * r,
            u = T(e.col, 0.97 + t() * 0.06),
            d = l ? `#F7F5FF` : w(e.col, e.top, 0.45 + t() * 0.3);
          (n.tri(c.base, o.base, o.mid, u, e.haze, s, !0),
            n.tri(c.base, o.mid, c.mid, u, e.haze, s, !0),
            n.tri(
              c.mid,
              o.mid,
              o.crest,
              l && o.h > e.snow * r * 1.08 ? `#F7F5FF` : d,
              e.haze,
              s,
              !0,
            ),
            n.tri(c.mid, o.crest, c.crest, d, e.haze, s, !0),
            (c = o));
        }
      },
    });
  for (let e of t.towers)
    f.push({
      r: e.r,
      draw() {
        let t = o(e.bearing, e.r, a),
          r = -e.bearing * L,
          i = e.w,
          s = a,
          c = a;
        for (let a = 0; a < e.tiers; a++) {
          let o =
            e.h *
            (a === 0 ? 0.62 : 0.38 / (e.tiers - 1)) *
            (e.tiers === 1 ? 1 / 0.62 : 1);
          (Ge(n, t, i, i * 0.7, s, s + o, r, e.col, e.roof, e.haze),
            (s += o),
            (c = s),
            (i *= 0.72));
        }
        if (e.antenna) {
          let i = e.h * 0.18,
            a = Math.max(1.5, e.w * 0.04);
          Ge(n, t, a, a, c, c + i, r, e.roof, e.roof, e.haze, 0, 1);
        }
      },
    });
  f.sort((e, t) => t.r - e.r);
  for (let e of f) e.draw();
  let m = new d();
  (m.setAttribute(`position`, new c(new Float32Array(n.p), 3)),
    m.setAttribute(`tint`, new c(new Float32Array(n.t), 3)),
    m.setAttribute(`far`, new c(new Float32Array(n.f), 4)));
  let h = new p(m, V().far);
  return (
    (h.name = `scenery:far`),
    (h.renderOrder = _e.far),
    (h.frustumCulled = !1),
    { mesh: h, tris: n.tris }
  );
}
function Ge(e, t, n, r, i, a, o, s, c, l, u = 1, d = 0) {
  let f = Math.cos(o),
    p = Math.sin(o),
    m = (e, n, r) => [t[0] + e * f + r * p, n, t[2] - e * p + r * f],
    h = n / 2,
    g = r / 2,
    _ = [t[0], (i + a) / 2, t[2]],
    v = [m(-h, i, g), m(h, i, g), m(h, a, g), m(-h, a, g)],
    y = [m(-h, i, -g), m(h, i, -g), m(h, a, -g), m(-h, a, -g)],
    b = T(s, 0.9);
  (e.tri(v[0], y[0], y[3], b, l, _, !1, 0, u, d),
    e.tri(v[0], y[3], v[3], b, l, _, !1, 0, u, d),
    e.tri(v[1], y[1], y[2], b, l, _, !1, 0, u, d),
    e.tri(v[1], y[2], v[2], b, l, _, !1, 0, u, d),
    e.tri(v[3], v[2], y[2], c, l, _, !1, 0, 0, d),
    e.tri(v[3], y[2], y[3], c, l, _, !1, 0, 0, d),
    e.tri(v[0], v[1], v[2], s, l, _, !1, 0, u, d),
    e.tri(v[0], v[2], v[3], s, l, _, !1, 0, u, d));
}
function Ke(e, t, n) {
  let r = Pe(t.seed),
    { rho: i, y: a } = fe(t.shape, t.rings),
    o = i.length,
    s = [];
  for (let e = 0; e < o; e++) {
    let o = [];
    for (let s = 0; s < t.seg; s++) {
      let c = (s / t.seg) * Math.PI * 2 + (e % 2) * (Math.PI / t.seg),
        l = 1 + r() * (t.shape === `mesa` ? 0.1 : 0.22),
        u = de(t, Math.cos(c) * t.rx * i[e] * l, Math.sin(c) * t.rz * i[e] * l);
      o.push([u.x, n + (e === 0 ? 0 : t.h * a[e] * (1 + r() * 0.16)), u.z]);
    }
    s.push(o);
  }
  let c = [
      t.x + r() * t.rx * 0.15,
      n + t.h * (t.shape === `mesa` ? 1 : 1 + r() * 0.1),
      t.z + r() * t.rz * 0.15,
    ],
    l = [t.x, n - t.h * 0.6, t.z],
    u = (e) => {
      let r = (e - n) / t.h;
      return r > t.snow
        ? `#F7F5FF`
        : t.bands
          ? t.bands[
              Math.min(
                t.bands.length - 1,
                Math.floor(r * t.bands.length * 0.999),
              )
            ]
          : w(t.col, t.top, Math.max(0, Math.min(1, r * 1.1)) ** 1.3);
    },
    d = t.bands || t.snow < 1 ? N.PAINT : N.GRASS;
  for (let n = 0; n < o; n++) {
    let i = s[n],
      a = n + 1 < o ? s[n + 1] : null;
    for (let o = 0; o < t.seg; o++) {
      let s = (o + 1) % t.seg;
      if (!a) {
        let t = (i[o][1] + i[s][1] + c[1]) / 3;
        e.tri(i[o], i[s], c, T(u(t), 1 + r() * 0.05), l, d);
        continue;
      }
      let f = i[o],
        p = i[s],
        m = n % 2 ? a[s] : a[o],
        h = n % 2 ? a[o] : a[(o + t.seg - 1) % t.seg];
      (e.tri(f, p, m, T(u((f[1] + p[1] + m[1]) / 3), 1 + r() * 0.06), l, d),
        e.tri(f, m, h, T(u((f[1] + m[1] + h[1]) / 3), 1 + r() * 0.06), l, d));
    }
  }
  if (t.sand) {
    let r = s[0].map((e) => {
      let r = e[0] - t.x,
        i = e[2] - t.z;
      return [t.x + r * 1.18, n, t.z + i * 1.18];
    });
    for (let i = 0; i < t.seg; i++) {
      let a = (i + 1) % t.seg;
      e.quad(r[i], r[a], s[0][a], s[0][i], t.sand, [t.x, n - 50, t.z]);
    }
  }
}
function qe(e, t, n) {
  let r = Math.cos(t.yaw),
    i = Math.sin(t.yaw),
    a = (e, n, a) => [t.x + e * r + a * i, n, t.z - e * i + a * r],
    o = T(t.col, 0.78);
  e.box(t.x, n - 0.3, t.z, t.w, t.h + 0.3, t.d, t.yaw, t.col, o);
  let s = n + t.h,
    c = t.w / 2,
    l = t.d / 2;
  if (t.roof === `pitched`) {
    let n = Math.min(t.w, t.d) * 0.35,
      r = [t.x, s, t.z],
      i = a(-c, s + n, 0),
      u = a(c, s + n, 0);
    (e.quad(a(-c, s, l), a(c, s, l), u, i, o, r),
      e.quad(a(-c, s, -l), a(c, s, -l), u, i, o, r),
      e.tri(a(-c, s, l), a(-c, s, -l), i, t.col, r),
      e.tri(a(c, s, l), a(c, s, -l), u, t.col, r));
  } else e.box(t.x, s, t.z, t.w + 0.6, 0.7, t.d + 0.6, t.yaw, T(t.col, 0.9), o);
  let u = Math.max(1, Math.floor(t.w / 3.4)),
    d = Math.max(1, Math.floor((t.h - 1.2) / 3.2)),
    f = 1.3,
    p = 1.5,
    m = l + 0.06,
    h = [t.x, n + t.h / 2, t.z];
  for (let r = 0; r < d; r++)
    for (let i = 0; i < u; i++) {
      let o = -c + (t.w / u) * (i + 0.5),
        s = n + 1.6 + r * 3.2;
      e.quad(
        a(o - f / 2, s, m),
        a(o + f / 2, s, m),
        a(o + f / 2, s + p, m),
        a(o - f / 2, s + p, m),
        `#FFE7B0`,
        h,
        N.PAINT,
        1,
      );
    }
}
function Je(e, t, n, r, i, a, o) {
  (e.cone(t, r, n, i * 0.62, a, 5, o, t * 0.1),
    e.cone(t, r, n + i * 0.38, i * 0.62, a * 0.68, 5, T(o, 1.12), r * 0.1));
}
function Ye(e, t, n, r) {
  let i = Math.cos(r),
    a = Math.sin(r);
  return (r, o, s) => [e + r * i + s * a, t + o, n - r * a + s * i];
}
var H = () => new z(-1e4);
function Xe(e, t) {
  let n = new p(e.build(), V().near);
  return ((n.name = t), (n.userData.noOutline = !0), n);
}
function Ze(e, t, n) {
  let r = new f(e.build(), V().nearInstanced, t);
  return ((r.name = n), (r.frustumCulled = !1), (r.userData.noOutline = !0), r);
}
var Qe = new s(),
  $e = new r(),
  et = new m(),
  tt = new m(1, 1, 1),
  nt = new l(),
  rt = new m(1, 0, 0),
  it = new m(0, 1, 0),
  at = new m(0, 0, 1),
  ot = new r(),
  U = new r();
