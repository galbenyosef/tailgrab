// assets__preload-helper-DR1MrGPZ 15 — math
// Lines 4576-5002 of readable/assets__preload-helper-DR1MrGPZ.pretty.js (statement-aligned).
function tr(e, r) {
  let a = e.terrain,
    o = e.rect,
    s = `terrain ${a.id}`,
    c = a.fine ?? 0.75,
    l = a.coarse ?? 6,
    u = a.tol ?? 0.02,
    d = { y: 0, gx: 0, gz: 0 },
    f = [],
    p = [],
    m = new Map(),
    h = new Map(),
    g = new Set(),
    _ = (e, t) => (e < t ? `${e},${t}` : `${t},${e}`),
    v = (e, t) => (f.push(e, t), f.length / 2 - 1),
    b = (e, t, n) => {
      let r = t ? e.length : e.length - 1;
      for (let t = 0; t < r; t++) {
        let r = e[t],
          i = e[(t + 1) % e.length];
        (p.push([r, i]), n && g.add(_(r, i)));
      }
    },
    x = (e, t) => {
      let n = [],
        r = (e, r, i, a) => {
          let o = Math.max(
            1,
            Math.ceil(Math.sqrt((i - e) * (i - e) + (a - r) * (a - r)) / t),
          );
          for (let t = 0; t < o; t++)
            n.push(v(e + ((i - e) * t) / o, r + ((a - r) * t) / o));
        };
      return (
        r(e.x0, e.z0, e.x1, e.z0),
        r(e.x1, e.z0, e.x1, e.z1),
        r(e.x1, e.z1, e.x0, e.z1),
        r(e.x0, e.z1, e.x0, e.z0),
        b(n, !0, !0),
        n
      );
    },
    S = x(o, Math.min(l, 3)),
    C = e.floors.map((e) => ({ f: e, ids: x(e.rect, 1) }));
  for (let e of r) {
    let t = [];
    for (let n = 0; n < e.pts.length; n += 3) {
      let r = v(e.pts[n], e.pts[n + 2]);
      (m.set(r, e.pts[n + 1]),
        h.set(r, [e.nrm[n], e.nrm[n + 1], e.nrm[n + 2]]),
        t.push(r));
    }
    b(t, !0, !0);
  }
  let T = a.features.filter((e) => e.f === `path` && !e.plain),
    E = new er(f.slice(), p.slice()),
    D = T.map((e) => ({
      f: e,
      c: q(e.path),
      cs: n(e.rot ?? 0),
      sn: i(e.rot ?? 0),
    }));
  for (let [t, n] of D.entries()) {
    let i = n.f,
      a = n.c.length,
      s = Math.max(2, Math.ceil(a / 1.5)),
      c = [i.w / 2, -i.w / 2];
    (i.walk ?? 0) > 0 && c.push(i.w / 2 + i.walk, -(i.w / 2 + i.walk));
    for (let l of c) {
      let c = [],
        u = () => {
          (c.length >= 2 && b(c, !1, !1), (c = []));
        };
      for (let d = 0; d <= s; d++) {
        let f = te(n.c, (a * d) / s),
          p = f.x + f.lx * l,
          m = f.z + f.lz * l,
          h = i.x + p * n.cs + m * n.sn,
          g = i.z - p * n.sn + m * n.cs;
        Zn(o, h, g, -0.5) &&
        !e.floors.some((e) => Zn(e.rect, h, g, 0.4)) &&
        !r.some((e) => Qn(e.pts, h, g)) &&
        !E.near(h, g, 0.4) &&
        !D.some((e, n) => n !== t && nr(e, h, g))
          ? c.push(v(h, g))
          : u();
      }
      u();
    }
  }
  let O = (t, n) => {
    let i = [],
      a = -1,
      s = () => {
        (i.length >= 2 && b(i, !1, !1), (i = []));
      };
    for (let c = 0; c <= t.length; c++) {
      let l = t[c % t.length],
        u = n[c % t.length];
      if (
        !Zn(o, l, u, -0.5) ||
        e.floors.some((e) => Zn(e.rect, l, u, 0.4)) ||
        r.some((e) => Qn(e.pts, l, u)) ||
        E.near(l, u, 0.4) ||
        D.some((e) => nr(e, l, u))
      ) {
        s();
        continue;
      }
      if (c === t.length) {
        i.push(a);
        break;
      }
      let d = v(l, u);
      (c === 0 && (a = d), i.push(d));
    }
    s();
  };
  for (let e of a.features)
    if (e.f === `flat` && e.skin) {
      let t = [],
        n = [],
        r = (e, r, i, a) => {
          let o = Math.max(
            1,
            Math.ceil(Math.sqrt((i - e) * (i - e) + (a - r) * (a - r)) / 1.5),
          );
          for (let s = 0; s < o; s++)
            (t.push(e + ((i - e) * s) / o), n.push(r + ((a - r) * s) / o));
        };
      (r(e.x0, e.z0, e.x1, e.z0),
        r(e.x1, e.z0, e.x1, e.z1),
        r(e.x1, e.z1, e.x0, e.z1),
        r(e.x0, e.z1, e.x0, e.z0),
        O(t, n));
    } else if (e.f === `paint`) {
      let t = [],
        n = [];
      for (let r = 0; r < e.loop.length; r += 2) {
        let i = e.loop[r],
          a = e.loop[r + 1],
          o = e.loop[(r + 2) % e.loop.length],
          s = e.loop[(r + 3) % e.loop.length],
          c = Math.max(
            1,
            Math.ceil(Math.sqrt((o - i) * (o - i) + (s - a) * (s - a)) / 1.5),
          );
        for (let e = 0; e < c; e++)
          (t.push(i + ((o - i) * e) / c), n.push(a + ((s - a) * e) / c));
      }
      O(t, n);
    }
  let k = new er(f, p),
    A = (t, n) => {
      let r = l,
        i = 0.5;
      e.sample(t + i, n, d);
      let a = d.gx,
        o = d.gz;
      e.sample(t - i, n, d);
      let s = d.gx,
        f = d.gz;
      e.sample(t, n + i, d);
      let p = d.gx,
        m = d.gz;
      e.sample(t, n - i, d);
      let h = d.gx,
        g = d.gz,
        _ = (a - s) / (2 * i),
        v = (m - g) / (2 * i),
        y = (o - f + p - h) / (4 * i),
        b = Math.sqrt(_ * _ + 2 * y * y + v * v);
      b > 1e-9 && (r = Math.min(r, Math.sqrt((8 * u) / b)));
      for (let i of e.floors) {
        let e = Math.max(i.rect.x0 - t, 0, t - i.rect.x1),
          a = Math.max(i.rect.z0 - n, 0, n - i.rect.z1);
        e * e + a * a < 9 && (r = Math.min(r, 1));
      }
      return Math.max(c, r);
    },
    j = 0;
  for (; l / (1 << j) > c * 1.0001;) j++;
  let M = l / (1 << j),
    N = Math.ceil((o.x1 - o.x0) / l),
    P = Math.ceil((o.z1 - o.z0) / l),
    F = 1 << j,
    I = [];
  for (let e = 0; e < N; e++)
    for (let t = 0; t < P; t++)
      I.push({ ix: e * F, iz: t * F, span: F, depth: 0, kids: null });
  let L = (e) => o.x0 + e * M,
    R = (e) => o.z0 + e * M,
    z = new Map(),
    B = (e, t) => {
      let n = e * 1048576 + t,
        r = z.get(n);
      return (r === void 0 && z.set(n, (r = A(L(e), R(t)))), r);
    },
    V = (e) => {
      let t = e.span / 2;
      e.kids = [
        [0, 0],
        [t, 0],
        [0, t],
        [t, t],
      ].map(([n, r]) => ({
        ix: e.ix + n,
        iz: e.iz + r,
        span: t,
        depth: e.depth + 1,
        kids: null,
      }));
    },
    H = (e) => {
      if (
        (e.depth < j &&
          e.span * M >
            Math.min(
              B(e.ix + e.span / 2, e.iz + e.span / 2),
              B(e.ix, e.iz),
              B(e.ix + e.span, e.iz + e.span),
            ) *
              1.001 &&
          V(e),
        e.kids)
      )
        for (let t of e.kids) H(t);
    };
  for (let e of I) H(e);
  let U = (e, t) => {
    let n = Math.floor(e / F),
      r = Math.floor(t / F);
    if (n < 0 || r < 0 || n >= N || r >= P) return null;
    let i = I[n * P + r];
    for (; i.kids;)
      i = i.kids[+(e >= i.ix + i.span / 2) + (t >= i.iz + i.span / 2 ? 2 : 0)];
    return i;
  };
  for (let e = !0; e;) {
    e = !1;
    let t = [],
      n = (e) => {
        e.kids ? e.kids.forEach(n) : t.push(e);
      };
    I.forEach(n);
    for (let n of t)
      for (let [t, r] of [
        [-1, 0],
        [n.span, 0],
        [0, -1],
        [0, n.span],
      ]) {
        let i = U(n.ix + t, n.iz + r);
        i && i.depth < n.depth - 1 && (V(i), (e = !0));
      }
  }
  let W = new Set(),
    G = (t) => {
      if (t.kids) {
        t.kids.forEach(G);
        return;
      }
      for (let [n, i] of [
        [0, 0],
        [t.span, 0],
        [0, t.span],
        [t.span, t.span],
      ]) {
        let a = t.ix + n,
          s = t.iz + i,
          c = a * 1048576 + s;
        if (W.has(c)) continue;
        W.add(c);
        let l = L(a),
          u = R(s);
        Zn(o, l, u) &&
          (e.floors.some((e) => Zn(e.rect, l, u, 0.05)) ||
            r.some((e) => Qn(e.pts, l, u)) ||
            k.near(l, u, Xn * Math.max(t.span * M, 1)) ||
            v(l, u));
      }
    };
  I.forEach(G);
  let K = new Nn(Float64Array.from(f));
  new Jn(K).constrainAll(p);
  let ee = K.triangles,
    J = [];
  for (let t = 0; t < ee.length; t += 3) {
    let n = ee[t],
      i = ee[t + 1],
      a = ee[t + 2],
      s = (f[n * 2] + f[i * 2] + f[a * 2]) / 3,
      c = (f[n * 2 + 1] + f[i * 2 + 1] + f[a * 2 + 1]) / 3;
    Zn(o, s, c) &&
      (e.floors.some((e) => Zn(e.rect, s, c)) ||
        r.some((e) => Qn(e.pts, s, c)) ||
        J.push(n, i, a));
  }
  let ne = new y(),
    re = new Map(),
    ie = [],
    ae = { x: 0, y: 0, z: 0 },
    oe = (t) => {
      let n = re.get(t);
      if (n !== void 0) return n;
      let r = f[t * 2],
        i = f[t * 2 + 1],
        a = m.get(t) ?? e.sample(r, i, d).y,
        o = h.get(t);
      return (
        o
          ? (n = ne.v(r, a, i, o[0], o[1], o[2]))
          : (e.normal(r, i, ae), (n = ne.v(r, a, i, ae.x, ae.y, ae.z))),
        re.set(t, n),
        (ie[t] = a),
        n
      );
    };
  for (let n = 0; n < J.length; n += 3) {
    let r = J[n],
      i = J[n + 1],
      a = J[n + 2],
      o = (f[r * 2] + f[i * 2] + f[a * 2]) / 3,
      s = (f[r * 2 + 1] + f[i * 2 + 1] + f[a * 2 + 1]) / 3,
      c = e.paint(o, s),
      l = 1 + 0.03 * t(Math.round(o * 4), Math.round(s * 4));
    ne.tri(oe(r), oe(i), oe(a), c, l);
  }
  rr(
    s,
    f,
    J,
    g,
    o,
    e.floors.map((e) => e.rect),
    r,
  );
  let se = new y(),
    ce = [],
    le = a.wallSkin ?? `concrete`;
  for (let { f: t, ids: n } of C) {
    let r = n.length;
    for (let i = 0; i < r; i++) {
      let o = n[i],
        s = n[(i + 1) % r],
        c = f[o * 2],
        l = f[o * 2 + 1],
        u = f[s * 2],
        p = f[s * 2 + 1],
        m = ie[o] ?? e.sample(c, l, d).y,
        h = ie[s] ?? e.sample(u, p, d).y,
        g = m - t.y,
        _ = h - t.y;
      if (Math.abs(g) < 1e-4 && Math.abs(_) < 1e-4) continue;
      let v = u - c,
        y = p - l,
        b = Math.sqrt(v * v + y * y),
        x = (c + u) / 2 - (t.rect.x0 + t.rect.x1) / 2,
        S = (l + p) / 2 - (t.rect.z0 + t.rect.z1) / 2,
        C = (y / b) * x + (-v / b) * S < 0 ? -1 : 1,
        T = (C * y) / b,
        E = (C * -v) / b,
        D = (e, n, r, i, a, o) => {
          let s = (r + o) / 2 - t.y > 0 ? -1 : 1,
            c = (e) => Math.min(e, t.y) - 0.05,
            l = (e) => Math.max(e, t.y),
            u = se.v(e, c(r), n, T * s, 0, E * s),
            d = se.v(i, c(o), a, T * s, 0, E * s),
            f = se.v(i, l(o), a, T * s, 0, E * s),
            p = se.v(e, l(r), n, T * s, 0, E * s);
          se.quad(u, d, f, p, le);
        };
      if (g * _ < 0) {
        let e = g / (g - _),
          n = c + v * e,
          r = l + y * e;
        (D(c, l, m, n, r, t.y), D(n, r, t.y, u, p, h));
      } else D(c, l, m, u, p, h);
      if (a.ledges && Math.min(Math.abs(g), Math.abs(_)) >= 0.3 && g * _ > 0) {
        let e = g > 0,
          n = e ? -1 : 1;
        ce.push({
          kind: w.LEDGE,
          path: [c, e ? m : t.y, l, u, e ? h : t.y, p],
          nx: T * n,
          nz: E * n,
        });
      }
    }
  }
  let ue = new y(),
    de = 1 / 0;
  for (let t of S)
    de = Math.min(de, ie[t] ?? e.sample(f[t * 2], f[t * 2 + 1], d).y);
  let fe = (o.x0 + o.x1) / 2,
    pe = (o.z0 + o.z1) / 2;
  for (let t = 0; t < S.length; t++) {
    let n = S[t],
      r = S[(t + 1) % S.length],
      i = f[n * 2],
      s = f[n * 2 + 1],
      c = f[r * 2],
      l = f[r * 2 + 1],
      u = (i + c) / 2 - fe,
      p = (s + l) / 2 - pe,
      m =
        Math.abs(u) * (o.z1 - o.z0) > Math.abs(p) * (o.x1 - o.x0)
          ? Math.sign(u)
          : 0,
      h = m ? 0 : Math.sign(p),
      g = ie[n] ?? e.sample(i, s, d).y,
      _ = ie[r] ?? e.sample(c, l, d).y;
    ue.quad(
      ue.v(i, de - 1, s, m, 0, h),
      ue.v(c, de - 1, l, m, 0, h),
      ue.v(c, _, l, m, 0, h),
      ue.v(i, g, s, m, 0, h),
      a.skin ?? `grass`,
    );
  }
  let me = [ne.prim(`none`)];
  return (
    se.tris.length && me.push(se.prim(`none`)),
    me.push(ue.prim(`none`)),
    { prims: me, rails: ce }
  );
}
