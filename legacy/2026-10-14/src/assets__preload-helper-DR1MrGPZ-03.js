// assets__preload-helper-DR1MrGPZ 03 — math
// Lines 684-1033 of readable/assets__preload-helper-DR1MrGPZ.pretty.js (statement-aligned).
function we(e) {
  if (Ce.has(e.pieces)) return Ce.get(e.pieces);
  let t = e.pieces.filter((e) => e.kind === `terrain`);
  if (t.length > 1) throw Error(`${e.id}: one terrain per park`);
  let n = t.length
    ? xe(
        t[0],
        e.pieces.filter((e) => e.kind === `floor`),
      )
    : null;
  return (Ce.set(e.pieces, n), n);
}
var Te = { SPINE: 1, LAUNCH: 2 };
function Ee(e, t, n) {
  let r = e.len > 0 ? t / e.len : 0,
    i = e.nax + (e.nbx - e.nax) * r,
    a = e.naz + (e.nbz - e.naz) * r,
    o = Math.sqrt(i * i + a * a) || 1;
  return ((n.x = i / o), (n.z = a / o), n);
}
function De() {
  return { seg: -1, t: 0, dist: 0, s: 0 };
}
function Oe() {
  return { chain: -1, x: 0, y: 0, z: 0, r: 0, vx: 0, vy: 0, vz: 0, ramp: -1 };
}
var ke = Oe(),
  Ae = 2,
  je = class {
    segs;
    grid = new Map();
    stamp;
    stampId = 0;
    constructor(e, t = 1) {
      ((this.segs = e), (this.stamp = new Int32Array(e.length)));
      for (let n of e) {
        let e = Math.floor((Math.min(n.ax, n.bx) - t) / Ae),
          r = Math.floor((Math.max(n.ax, n.bx) + t) / Ae),
          i = Math.floor((Math.min(n.az, n.bz) - t) / Ae),
          a = Math.floor((Math.max(n.az, n.bz) + t) / Ae);
        for (let t = e; t <= r; t++)
          for (let e = i; e <= a; e++) {
            let r = Fe(t, e),
              i = this.grid.get(r);
            (i || this.grid.set(r, (i = [])), i.push(n.id));
          }
      }
    }
    sweep(e, t, n, r, i, a, o, s, c, l, u = ke) {
      let { vx: d, vy: f, vz: p } = u,
        m = Math.sqrt(d * d + p * p),
        h = Math.floor((Math.min(e, r) - o) / Ae),
        g = Math.floor((Math.max(e, r) + o) / Ae),
        _ = Math.floor((Math.min(n, a) - o) / Ae),
        v = Math.floor((Math.max(n, a) + o) / Ae),
        y = ++this.stampId,
        b = -1,
        x = 1 / 0,
        S = 0,
        C = 0;
      for (let l = h; l <= g; l++)
        for (let h = _; h <= v; h++) {
          let g = this.grid.get(Fe(l, h));
          if (g)
            for (let l of g) {
              if (this.stamp[l] === y) continue;
              this.stamp[l] = y;
              let h = this.segs[l];
              if (h.chain === u.chain || (h.piece === u.ramp && h.kind !== Ne))
                continue;
              Le(e, t, n, r, i, a, h.ax, h.ay, h.az, h.bx, h.by, h.bz, Ie);
              let g = Ie.s,
                _ = Ie.t,
                v = e + (r - e) * g,
                w = t + (i - t) * g,
                T = n + (a - n) * g,
                E = h.ax + (h.bx - h.ax) * _,
                D = h.ay + (h.by - h.ay) * _,
                O = h.az + (h.bz - h.az) * _,
                k = w - D;
              if (k < -s || k > c) continue;
              let A = E - u.x,
                j = D - u.y,
                M = O - u.z;
              if (
                (u.r > 0 && A * A + j * j + M * M < u.r * u.r) ||
                (h.flags & Te.LAUNCH &&
                  m > 0 &&
                  (Ee(h, _ * h.len, Pe), d * Pe.x + p * Pe.z > 0.34 * m))
              )
                continue;
              let N = d * h.tx + f * h.ty + p * h.tz;
              if (
                N > 0.3
                  ? h.next < 0 && (1 - _) * h.len < 0.3
                  : N < -0.3 && h.prev < 0 && _ * h.len < 0.3
              )
                continue;
              let P = v - E,
                F = T - O,
                I = P * h.tx + F * h.tz;
              if (I > 0.25 || I < -0.25) continue;
              let L = P - h.tx * I,
                R = F - h.tz * I;
              if (Math.sqrt(L * L + R * R) > o) continue;
              let z = Math.sqrt(P * P + F * F) + Math.abs(k) * 0.5;
              (z < x || (z === x && l < b)) &&
                ((b = l), (x = z), (S = _ * h.len), (C = g));
            }
        }
      return b < 0 ? !1 : ((l.seg = b), (l.t = S), (l.dist = x), (l.s = C), !0);
    }
    nearestCoping(e, t, n, r, i, a, o, s, c, l) {
      let u = Math.floor((e - r) / Ae),
        d = Math.floor((e + r) / Ae),
        f = Math.floor((n - r) / Ae),
        p = Math.floor((n + r) / Ae),
        m = ++this.stampId,
        h = -1,
        g = 1 / 0;
      for (let _ = u; _ <= d; _++)
        for (let u = f; u <= p; u++) {
          let d = this.grid.get(Fe(_, u));
          if (d)
            for (let u of d) {
              if (this.stamp[u] === m) continue;
              this.stamp[u] = m;
              let d = this.segs[u];
              if (d.kind !== Ne) continue;
              let f = d.bx - d.ax,
                p = d.bz - d.az,
                _ = f * f + p * p,
                v = _ > 0 ? ((e - d.ax) * f + (n - d.az) * p) / _ : 0;
              v = v < 0 ? 0 : v > 1 ? 1 : v;
              let y = d.ax + f * v,
                b = d.az + p * v,
                x = d.ay + (d.by - d.ay) * v,
                S = t - x;
              if (S < -i || S > a) continue;
              let C = Math.sqrt((e - y) * (e - y) + (n - b) * (n - b));
              if (C > r || C > g || (C === g && u > h)) continue;
              Ee(d, v * d.len, Pe);
              let w = Pe.x,
                T = Pe.z;
              (d.flags & Te.SPINE && w * o + T * s < 0 && ((w = -w), (T = -T)),
                !(w * o + T * s < c) &&
                  ((h = u),
                  (g = C),
                  (l.seg = u),
                  (l.t = v * d.len),
                  (l.px = y),
                  (l.py = x),
                  (l.pz = b),
                  (l.nx = w),
                  (l.nz = T),
                  (l.dist = C)));
            }
        }
      return h >= 0;
    }
  };
function Me() {
  return { seg: -1, t: 0, px: 0, py: 0, pz: 0, nx: 0, nz: 0, dist: 0 };
}
var Ne = 2,
  Pe = { x: 0, z: 0 };
function Fe(e, t) {
  return (e + 32768) * 65536 + (t + 32768);
}
var Ie = { s: 0, t: 0 };
function Le(e, t, n, r, i, a, o, s, c, l, u, d, f) {
  let p = r - e,
    m = i - t,
    h = a - n,
    g = l - o,
    _ = u - s,
    v = d - c,
    y = e - o,
    b = t - s,
    x = n - c,
    S = p * p + m * m + h * h,
    C = g * g + _ * _ + v * v,
    w = g * y + _ * b + v * x,
    T = 0,
    E = 0;
  if (S <= 1e-12 && C <= 1e-12) {
    ((f.s = 0), (f.t = 0));
    return;
  }
  if (S <= 1e-12) E = Re(w / C);
  else {
    let e = p * y + m * b + h * x;
    if (C <= 1e-12) T = Re(-e / S);
    else {
      let t = p * g + m * _ + h * v,
        n = S * C - t * t;
      ((T = n > 1e-12 ? Re((t * w - e * C) / n) : 0),
        (E = (t * T + w) / C),
        E < 0
          ? ((E = 0), (T = Re(-e / S)))
          : E > 1 && ((E = 1), (T = Re((t - e) / S))));
    }
  }
  ((f.s = T), (f.t = E));
}
function Re(e) {
  return e < 0 ? 0 : e > 1 ? 1 : e;
}
var ze = {
    grade: {
      deck: 0.3,
      ledge: 0.35,
      rail: 0.75,
      quarter: 0.12,
      channel: 0.75,
      lip: 0.12,
    },
    bank: 0.5236,
    clear: 2.2,
  },
  Be = 0.35,
  Ve = 0.81,
  He = [
    [0.3, 0.075],
    [0.1214, 0.33],
    [0.071, Ve],
  ],
  Ue = new WeakMap();
function We(e) {
  let t = Ue.get(e);
  return (t || Ue.set(e, (t = nt(e))), t);
}
var Ge = new WeakMap();
function Ke(e) {
  return (We(e), Ge.get(e) ?? []);
}
function qe(e) {
  let t = e.length,
    n = [];
  for (let r = 0; r + 1 < t; r++) {
    let t = e[r],
      i = e[r + 1];
    if (t.n) {
      n.push(t.n);
      continue;
    }
    let a = i.u - t.u,
      o = i.v - t.v,
      s = Math.sqrt(a * a + o * o) || 1;
    n.push([o / s, -a / s]);
  }
  let r = [];
  for (let i = 0; i < t; i++) {
    let a = e[i],
      o = i > 0 ? n[i - 1] : null,
      s = i < t - 1 ? n[i] : null;
    if (o && s && a.smooth) {
      let e = o[0] + s[0],
        t = o[1] + s[1],
        n = Math.sqrt(e * e + t * t) || 1;
      r.push({
        u: a.u,
        v: a.v,
        abs: a.abs,
        nu: e / n,
        nv: t / n,
        skin: a.skin,
      });
      continue;
    }
    (o &&
      r.push({ u: a.u, v: a.v, abs: a.abs, nu: o[0], nv: o[1], skin: a.skin }),
      s &&
        r.push({
          u: a.u,
          v: a.v,
          abs: a.abs,
          nu: s[0],
          nv: s[1],
          skin: a.skin,
        }));
  }
  return r;
}
function Je(e, t, n) {
  let r = Math.max(1, Math.ceil(Math.abs(t - e) / n)),
    i = [];
  for (let n = 1; n < r; n++) i.push(e + ((t - e) * n) / r);
  return i;
}
function Ye(e, t, n, r, i, a, o = !1) {
  let s = [],
    c = [];
  for (let r of e) {
    let [e, a, l] = C(r, { u: t, v: n, abs: o });
    (s.push(e, a, l), c.push(r.hx * i, r.hz * i));
  }
  return i === 0
    ? { kind: r, path: s, nx: 0, nz: 0, closed: a }
    : { kind: r, path: s, nx: 0, nz: 0, ns: c, closed: a };
}
function Xe(e, t, n, r, i, a, o = !1) {
  let s = [];
  for (let r of e) s.push(...C(r, { u: t, v: n, abs: o }));
  return { type: `tube`, path: s, radius: r, skin: i, caps: !a, closed: a };
}
function Ze(e, t, n, r) {
  let i = [],
    a = (e, t) => {
      i.push(e.px + e.hx * t, e.pz + e.hz * t);
    };
  if (r) {
    for (let n of e) a(n, t + Be);
    return i;
  }
  for (let n of e) a(n, t + Be);
  for (let t = e.length - 1; t >= 0; t--) a(e[t], n - Be);
  return i;
}
function Qe(e, t, n) {
  return x([te(e, t)], n)[0];
}
function $e(e, t, n, r, i, a, o, s, c) {
  let l = -i,
    u = r,
    d = [
      [1, 1],
      [1, -1],
      [-1, -1],
      [-1, 1],
    ].map(([e, o]) => [t + (r * e + l * o) * a, n + (i * e + u * o) * a]),
    f = Math.max(1, Math.ceil((s - o) / 1.25));
  for (let r = 0; r < 4; r++) {
    let i = d[r],
      a = d[(r + 1) % 4],
      l = (i[0] + a[0]) / 2 - t,
      u = (i[1] + a[1]) / 2 - n,
      p = Math.sqrt(l * l + u * u),
      m = l / p,
      h = u / p,
      g = [e.v(i[0], o, i[1], m, 0, h), e.v(a[0], o, a[1], m, 0, h)];
    for (let t = 1; t <= f; t++) {
      let n = o + ((s - o) * t) / f,
        r = [e.v(i[0], n, i[1], m, 0, h), e.v(a[0], n, a[1], m, 0, h)];
      (e.quad(g[0], g[1], r[1], r[0], c), (g = r));
    }
  }
  let p = d.map(([t, n]) => e.v(t, s, n, 0, 1, 0));
  e.quad(p[0], p[1], p[2], p[3], c);
}
