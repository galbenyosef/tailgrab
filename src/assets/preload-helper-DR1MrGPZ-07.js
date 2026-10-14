// assets/preload-helper-DR1MrGPZ 07 — push
// Lines 1851-2173 of readable/assets/preload-helper-DR1MrGPZ.pretty.js (statement-aligned).
function vt(e) {
  switch (e.type) {
    case `round`:
      return f(e.R);
    case `oval`:
      return F(e.L, e.R);
    case `kidney`:
      return u(e.R1, e.R2, e.D, e.Rh);
    case `clover`:
      return m(e.n, e.rho, e.Rl, e.Rh, e.phi ?? 0);
  }
}
function yt(e) {
  let { h: t, r: n, w: r, d: i } = e;
  if (t < n - 1e-6)
    throw Error(`bowl ${e.id}: h ${t} < r ${n} (the lip must go vert)`);
  let a = vt(e.shape);
  p(a, n);
  let o = d(a),
    s = { x0: -r / 2, x1: r / 2, z0: -i / 2, z1: i / 2 },
    c = h(o);
  if (
    c.x0 < s.x0 + 0.6 ||
    c.x1 > s.x1 - 0.6 ||
    c.z0 < s.z0 + 0.6 ||
    c.z1 > s.z1 - 0.6
  )
    throw Error(
      `bowl ${e.id}: rim needs 0.6 m of deck inside its ${r} × ${i} footprint`,
    );
  let l = e.sunk ? 0 : t,
    u = e.skin ?? `sky`,
    f = e.tileSkin ?? `mint`,
    m = e.deckSkin ?? `concrete`,
    _ = new y(),
    b = j(t, n, u, f).map((e) => ({ ...e, y: e.y + l }));
  (g(_, o, !0, b),
    k(
      _,
      o.map((e) => ({ x: e.x + e.nx * n, z: e.z + e.nz * n })),
      a.cx,
      a.cz,
      l - t,
      u,
    ));
  let x = [_.prim(`none`)],
    S = new y();
  (v(S, o, a.cx, a.cz, s, l, m),
    e.sunk || E(S, s, 0, t, e.skin === void 0 ? `woodSide` : m),
    x.push(S.prim(`soft`, e.sunk ? { floorLike: !0 } : {})));
  let C = [],
    T = [];
  for (let e of o) (C.push(e.x, l, e.z), T.push(e.nx, e.nz));
  x.push({
    type: `tube`,
    path: C,
    radius: M,
    skin: `metal`,
    caps: !1,
    closed: !0,
  });
  let D = [{ kind: w.COPING, path: C, nx: 0, nz: 0, ns: T, closed: !0 }];
  if (!e.sunk) {
    let { x0: e, x1: n, z0: r, z1: i } = s;
    D.push(
      { kind: w.LEDGE, path: [e, t, r, n, t, r], nx: 0, nz: -1 },
      { kind: w.LEDGE, path: [n, t, r, n, t, i], nx: 1, nz: 0 },
      { kind: w.LEDGE, path: [n, t, i, e, t, i], nx: 0, nz: 1 },
      { kind: w.LEDGE, path: [e, t, i, e, t, r], nx: -1, nz: 0 },
    );
  }
  return { prims: x, rails: D, hole: s };
}
function bt(e, t) {
  let n = [];
  for (let r of e) n.push(r.x + r.nx * t, r.z + r.nz * t);
  return n;
}
var xt = 0.35;
function St(e, t) {
  (e.prims.push(...t.prims), e.rails.push(...t.rails));
}
function Ct(e, t, n, r, i, a) {
  let o = 0.8,
    s = o / 2,
    c = { prims: [], rails: [] };
  for (let l of [1, -1]) {
    let u = l * (e / 2 + s);
    (c.prims.push(
      ht([t, 0, r, 0, r, i, t, n], [0, 0, 0, 0], [1, 0, 0, 0], o, a, `soft`, {
        x0: u - s,
        x1: u + s,
      }),
    ),
      c.rails.push(
        { kind: w.LEDGE, path: [u - s, n, t, u - s, i, r], nx: -1, nz: 0 },
        { kind: w.LEDGE, path: [u + s, i, r, u + s, n, t], nx: 1, nz: 0 },
      ));
  }
  return c;
}
function wt(e, t, n, r, i) {
  let a = Math.abs(r - t),
    o = [
      {
        type: `tube`,
        path: [e, n, t, e, i, r],
        radius: D,
        skin: `metal`,
        caps: !0,
      },
    ],
    s = Math.max(2, Math.round(a / 3) + 1);
  for (let a = 0; a < s; a++) {
    let c = 0.08 + 0.84 * (a / (s - 1)),
      l = t + (r - t) * c,
      u = n + (i - n) * c;
    o.push({
      type: `tube`,
      path: [e, 0, l, e, u - D, l],
      radius: 0.035,
      skin: `metal`,
      caps: !1,
    });
  }
  let c = new y(),
    l = A / 2,
    u = (e, t, n, r, i) => c.v(e, t, n, r, 0, i);
  for (let a of [-l, l]) {
    let o = a < 0 ? -1 : 1;
    c.quad(
      u(e + a, 0, t, o, 0),
      u(e + a, 0, r, o, 0),
      u(e + a, i, r, o, 0),
      u(e + a, n, t, o, 0),
      `metal`,
    );
  }
  for (let [a, o, s] of [
    [t, n, t < r ? -1 : 1],
    [r, i, t < r ? 1 : -1],
  ])
    c.quad(
      u(e - l, 0, a, 0, s),
      u(e + l, 0, a, 0, s),
      u(e + l, o, a, 0, s),
      u(e - l, o, a, 0, s),
      `metal`,
    );
  return (
    o.push(c.prim(`none`, { render: !1, rail: !0 })),
    {
      prims: o,
      rails: [{ kind: w.RAIL, path: [e, n, t, e, i, r], nx: 0, nz: 0 }],
    }
  );
}
function Tt(e, t) {
  let n = e / 2,
    r = t[0],
    i = t[1],
    a = [],
    o = [];
  for (let e = t.length - 2; e >= 0; e -= 2) a.push(n, t[e + 1], t[e]);
  for (let e = 0; e < t.length; e += 2) o.push(-n, t[e + 1], t[e]);
  return [
    { kind: w.LEDGE, path: [n, i, r, -n, i, r], nx: 0, nz: 1, launch: !0 },
    { kind: w.LEDGE, path: a, nx: 1, nz: 0 },
    { kind: w.LEDGE, path: o, nx: -1, nz: 0 },
  ];
}
function Et(e) {
  return d(f(e)).map((e) => ({ ...e, nx: -e.nx, nz: -e.nz }));
}
function Dt(e, t, n, r, i, a) {
  let o = 0;
  for (let e = 0; e < n.length; e++) {
    let t = n[e],
      r = n[(e + 1) % n.length];
    o += t[0] * r[1] - r[0] * t[1];
  }
  let s = (o > 0 ? n.map((e, t) => t) : n.map((e, t) => n.length - 1 - t)).map(
      (e) => n[e],
    ),
    c = [];
  for (let [e, t] of s) c.push(e, t);
  let l = s.map(([n, a]) => e.v(t.x + t.nx * n, a, t.z + t.nz * n, r, 0, i)),
    u = L(c);
  for (let t = 0; t < u.length; t += 3)
    e.tri(l[u[t]], l[u[t + 1]], l[u[t + 2]], a);
}
function Ot(e) {
  let { R: t, sweep: n, r, h: o, back: s } = e;
  if (o < r - 1e-6) throw Error(`curve ${e.id}: h ${o} < r ${r}`);
  let c = !!e.pocket;
  if (s === `square` && (!c || Math.abs(n - 1.5707963267948966) > 1e-9))
    throw Error(`curve ${e.id}: a square back needs a pocket of sweep π/2`);
  if (s === `fill` && (c || n > 3.141592654589793))
    throw Error(`curve ${e.id}: a filled deck needs a hip of sweep ≤ π`);
  let l = s === `fill` ? t : e.deck,
    u = I(t, n, c ? a : -a, c, s === `square`);
  if ((p(u, r), !c && s !== `fill` && t - l < 0.3))
    throw Error(`curve ${e.id}: deck ${l} too deep for a hip of radius ${t}`);
  let f = d(u),
    m = e.skin ?? `woodSide`,
    h = j(o, r, `wood`, `wood`).map((e) => ({ ...e, y: e.y + o })),
    _ = s
      ? h
      : [
          { u: -l, y: 0, nu: -1, ny: 0, skin: m },
          { u: -l, y: o, nu: -1, ny: 0, skin: m },
          { u: -l, y: o, nu: 0, ny: 1, skin: `concrete` },
          { u: 0, y: o, nu: 0, ny: 1, skin: `concrete` },
          ...h,
        ],
    v = new y();
  g(v, f, !1, _);
  let b = [
    [-l, 0],
    [-l, o],
    [0, o],
  ];
  for (let e of h) {
    let t = b[b.length - 1];
    (Math.abs(e.u - t[0]) > 1e-9 || Math.abs(e.y - t[1]) > 1e-9) &&
      b.push([e.u, e.y]);
  }
  let x = f[0],
    C = f[1],
    E = f[f.length - 2],
    D = f[f.length - 1],
    O = C.x - x.x,
    k = C.z - x.z,
    A = Math.sqrt(O * O + k * k),
    N = D.x - E.x,
    P = D.z - E.z,
    F = Math.sqrt(N * N + P * P);
  (Dt(v, x, b, -O / A, -k / A, m), Dt(v, D, b, N / F, P / F, m));
  let L = [],
    R = [];
  for (let e of f) (L.push(e.x, o, e.z), R.push(e.nx, e.nz));
  let z = f.map((e) => ({
      x: e.x + e.nx * r,
      z: e.z + e.nz * r,
      nx: e.nx,
      nz: e.nz,
    })),
    B = (e, t, n) => ({
      kind: w.LEDGE,
      path: [e.x, o, e.z, e.x - e.nx * l, o, e.z - e.nz * l],
      nx: t,
      nz: n,
    }),
    V = [{ kind: w.COPING, path: L, nx: 0, nz: 0, ns: R }],
    H;
  if (s === `square`) {
    let e = t + l,
      n = f.length >> 1,
      r = { x: -x.nx, z: -x.nz },
      i = { x: -D.nx, z: -D.nz },
      a = { x: 0, z: e * Math.SQRT2 },
      s = f.map((t, o) => {
        if (o === 0 || o === f.length - 1)
          return { x: t.x - t.nx * l, z: t.z - t.nz * l };
        if (o === n) return a;
        let s = o < n ? r : i,
          c = (e - (t.x * s.x + t.z * s.z)) / -(t.nx * s.x + t.nz * s.z);
        return { x: t.x - t.nx * c, z: t.z - t.nz * c };
      });
    (T(v, f, s, o, `concrete`),
      S(v, s.slice(0, n + 1), r.x, r.z, 0, o, m),
      S(v, s.slice(n), i.x, i.z, 0, o, m));
    let c = s[0],
      u = s[s.length - 1];
    (V.push(
      { kind: w.LEDGE, path: [u.x, o, u.z, a.x, o, a.z], nx: i.x, nz: i.z },
      { kind: w.LEDGE, path: [a.x, o, a.z, c.x, o, c.z], nx: r.x, nz: r.z },
    ),
      (H = [
        ...bt(z, xt),
        u.x + i.x * xt,
        u.z + i.z * xt,
        a.x,
        a.z + xt * Math.SQRT2,
        c.x + r.x * xt,
        c.z + r.z * xt,
      ]));
  } else if (s === `fill`)
    (T(
      v,
      f,
      f.map(() => ({ x: 0, z: 0 })),
      o,
      `concrete`,
    ),
      (H = [...bt(z, xt), 0, xt / i(n / 2)]));
  else {
    let e = f
        .map((e) => ({
          x: e.x - e.nx * l,
          z: e.z - e.nz * l,
          nx: -e.nx,
          nz: -e.nz,
        }))
        .reverse(),
      t = [],
      n = [];
    for (let r of e) (t.push(r.x, o, r.z), n.push(r.nx, r.nz));
    (V.push({ kind: w.LEDGE, path: t, nx: 0, nz: 0, ns: n }),
      (H = [...bt(z, xt), ...bt(e, xt)]));
  }
  return (
    V.push(B(x, -O / A, -k / A), B(D, N / F, P / F)),
    {
      prims: [
        v.prim(`lip`),
        { type: `tube`, path: L, radius: M, skin: `metal`, caps: !0 },
      ],
      rails: V,
      outline: H,
    }
  );
}
