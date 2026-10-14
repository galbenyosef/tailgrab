// assets/preload-helper-DR1MrGPZ 06 — abs
// Lines 1511-1850 of readable/assets/preload-helper-DR1MrGPZ.pretty.js (statement-aligned).
function ft(e, t, r, o) {
  let { w: s, r: c } = t,
    l = s / 2,
    u = t.apron ?? 1,
    d = rt(e),
    f = !!e.path.closed,
    p = t.wall ?? 1.5707963267948966,
    m = i(p),
    h = n(p),
    g = p > a - 1e-9,
    _ = !!t.sunk;
  if (_ && (f || t.roof))
    throw Error(`${o}: a sunk ditch is one open run (no ring, no roof)`);
  let v = q({ ...e.path, grade: t.lip, bank: void 0 }),
    b = r.map((e) => K(v, e.s));
  for (let [e, t] of r.entries())
    if (Math.abs(b[e].g) > ze.grade.lip + 1e-9)
      throw Error(
        `${o}: lip grade ${b[e].g.toFixed(3)} at s ${t.s.toFixed(1)} is over ${ze.grade.lip}`,
      );
  let S = c - c * h,
    T = l + c * m,
    E = 0;
  r.forEach((e, t) => {
    let n = b[t].y - e.y;
    if (n < S + 0.05)
      throw Error(
        `${o}: ${n.toFixed(2)} m deep at s ${e.s.toFixed(1)}: the lip must clear the transition (${S.toFixed(2)} m)`,
      );
    if (!_ && e.y < d - 1e-6)
      throw Error(
        `${o}: the bottom dips under the ground at s ${e.s.toFixed(1)} (sunk ditches need terrain)`,
      );
    E = Math.max(E, n - S);
  });
  let D = Math.max(1, Math.ceil(E / 1)),
    O = Math.max(2, Math.ceil(p / 0.2618)),
    k = t.wallSkin ?? e.skin ?? `concrete`,
    A = t.bottomSkin ?? k,
    j = t.apronSkin ?? `concrete`,
    F = g ? 0 : h / m,
    I = (e) => T + (b[e].y - r[e].y - S) * F,
    L = x(r, !0);
  if (t.roof) {
    if (!g) throw Error(`${o}: a culvert needs vertical walls`);
    return pt(
      e,
      t,
      t.roof,
      r,
      L,
      b.map((e) => e.y),
      {
        hw: l,
        r: c,
        apron: u,
        ground: d,
        nWall: D,
        nArc: O,
        wallSkin: k,
        bottom: A,
      },
      o,
    );
  }
  let R = (e) => {
      let t = r[e].y,
        a = b[e].y,
        o = I(e),
        s = o + u,
        f = [
          ...(_ ? [] : [{ u: s, v: d, smooth: !1, part: `outer` }]),
          { u: s, v: a, smooth: !1, part: `apron` },
          ...Je(s, o, 1.25).map((e) => ({
            u: e,
            v: a,
            smooth: !1,
            part: `apron`,
          })),
          { u: o, v: a, smooth: !1, part: `wall` },
        ];
      for (let e = 1; e < D; e++) {
        let n = a - ((a - t - S) * e) / D;
        f.push({ u: T + (n - t - S) * F, v: n, smooth: !0, part: `wall` });
      }
      for (let e = 0; e <= O; e++) {
        let r = p * (1 - e / O);
        f.push({
          u: l + c * i(r),
          v: t + c - c * n(r),
          smooth: e > 0 || !g,
          part: e === O ? `bottom` : `wall`,
        });
      }
      return f;
    },
    z = { outer: k, apron: j, wall: k, bottom: A },
    B = (e) => {
      let t = R(e),
        n = t.map((e) => ({
          u: e.u,
          v: e.v,
          abs: !0,
          smooth: e.smooth,
          skin: z[e.part],
        }));
      n.push(
        ...Je(l, -l, 1.25).map((t) => ({ u: t, v: r[e].y, abs: !0, skin: A })),
      );
      let i = [...t].reverse();
      return (
        i.forEach((e, t) =>
          n.push({
            u: -e.u,
            v: e.v,
            abs: !0,
            smooth: e.smooth,
            skin: t + 1 < i.length ? z[i[t + 1].part] : k,
          }),
        ),
        n
      );
    },
    V = L.map((e, t) => qe(B(t))),
    H = V[0].length,
    U = new y();
  if (
    (P(U, L, f, (e) => V[e], {
      who: o,
      skip: lt(V, d),
      quiet: (e) => e < 2 || e > H - 3,
    }),
    !f)
  ) {
    let [t, n] = e.ends ?? [`cap`, `cap`],
      r = _ ? -1 : 1;
    (t === `cap` && N(U, L[0], B(0), -r, k, !0),
      n === `cap` && N(U, L[L.length - 1], B(L.length - 1), r, k, !0));
  }
  let W = [U.prim(`soft`)],
    G = [];
  for (let e of [1, -1]) {
    let t = [],
      n = [];
    (L.forEach((r, i) => {
      let [a, o, s] = C(r, { u: e * I(i), v: b[i].y, abs: !0 });
      (t.push(a, o, s), n.push(-e * r.hx, -e * r.hz));
    }),
      G.push({
        kind: g ? w.COPING : w.LEDGE,
        path: t,
        nx: 0,
        nz: 0,
        ns: n,
        closed: f,
      }),
      g &&
        W.push({
          type: `tube`,
          path: t,
          radius: M,
          skin: `metal`,
          caps: !f,
          closed: f,
        }));
  }
  if (_) {
    let e = [],
      t = [],
      n = (n, r) => {
        (e.push(...C(L[n], { u: r * (I(n) + u), v: b[n].y, abs: !0 })),
          t.push(0, 1, 0));
      };
    for (let e = 0; e < L.length; e++) n(e, 1);
    for (let e = L.length - 1; e >= 0; e--) n(e, -1);
    return { prims: W, rails: G, holeLoop: { pts: e, nrm: t } };
  }
  let ee = Math.max(...r.map((e, t) => I(t))) + u;
  return {
    prims: W,
    rails: G,
    ...((e.y ?? 0) === 0 && d === 0 ? { outline: Ze(L, ee, -ee, f) } : {}),
  };
}
function pt(e, t, r, o, s, c, l, u) {
  let {
      hw: d,
      r: f,
      apron: p,
      ground: m,
      nWall: h,
      nArc: g,
      wallSkin: _,
      bottom: v,
    } = l,
    b = !!e.path.closed,
    x = d + f,
    S = r.cover ?? 0.5,
    C = r.topSkin ?? t.apronSkin ?? `concrete`,
    w = Math.max(6, Math.ceil(Math.PI / 0.2618)),
    T = x + p,
    E = (e) => c[e] + x + S,
    D = (e) => {
      let t = o[e].y,
        r = c[e],
        s = [];
      for (let e = 0; e < h; e++)
        s.push({
          u: x,
          v: r - ((r - t - f) * e) / h,
          abs: !0,
          skin: _,
          smooth: !0,
        });
      for (let e = 0; e <= g; e++) {
        let r = a * (1 - e / g);
        s.push({
          u: d + f * i(r),
          v: t + f - f * n(r),
          abs: !0,
          skin: e === g ? v : _,
          smooth: !0,
        });
      }
      s.push(...Je(d, -d, 1.25).map((e) => ({ u: e, v: t, abs: !0, skin: v })));
      for (let e = 0; e <= g; e++) {
        let r = (e / g) * a;
        s.push({
          u: -(d + f * i(r)),
          v: t + f - f * n(r),
          abs: !0,
          skin: _,
          smooth: !0,
        });
      }
      for (let e = 1; e <= h; e++)
        s.push({
          u: -x,
          v: t + f + ((r - t - f) * e) / h,
          abs: !0,
          skin: _,
          smooth: !0,
        });
      for (let e = 1; e < w; e++) {
        let t = Math.PI * (1 - e / w);
        s.push({ u: x * n(t), v: r + x * i(t), abs: !0, skin: _, smooth: !0 });
      }
      return (s.push({ ...s[0] }), s);
    },
    O = s.map((e, t) => qe(D(t))),
    k = new y();
  P(k, s, b, (e) => O[e], { who: u, skip: lt(O, m) });
  let A = (e) => [
      { u: T, v: m, abs: !0, skin: _ },
      { u: T, v: E(e), abs: !0, skin: C },
      ...Je(T, -T, 1.25).map((t) => ({ u: t, v: E(e), abs: !0, skin: C })),
      { u: -T, v: E(e), abs: !0, skin: _ },
      { u: -T, v: m, abs: !0, skin: _ },
    ],
    j = s.map((e, t) => qe(A(t)));
  if ((P(k, s, b, (e) => j[e], { who: u }), !b)) {
    let [t, r] = e.ends ?? [`cap`, `cap`],
      l = (e, t) => {
        let r = o[e].y,
          l = c[e],
          u = E(e);
        for (let o of [1, -1]) {
          let c = [
            { u: 0, v: m, abs: !0 },
            { u: o * T, v: m, abs: !0 },
            { u: o * T, v: u, abs: !0 },
            { u: 0, v: u, abs: !0 },
          ];
          for (let e = 0; e <= w / 2; e++) {
            let t = a * (1 - (2 * e) / w);
            c.push({ u: o * x * n(t), v: l + x * i(t), abs: !0 });
          }
          l - r - f > 1e-6 && c.push({ u: o * x, v: r + f, abs: !0 });
          for (let e = 1; e <= g; e++) {
            let t = a * (1 - e / g);
            c.push({ u: o * (d + f * i(t)), v: r + f - f * n(t), abs: !0 });
          }
          (c.push({ u: 0, v: r, abs: !0 }),
            r - m < 1e-6 && c.shift(),
            N(k, s[e], c, t, _, !0));
        }
      };
    (t === `cap` && l(0, -1), r === `cap` && l(s.length - 1, 1));
  }
  return { prims: [k.prim(`soft`)], rails: [] };
}
function mt(e, t) {
  let n = e.section;
  if (n.type !== `channel` || !n.sunk)
    throw Error(`path ${e.id}: only a sunk ditch has a levee`);
  if ((n.wall ?? 1.5707963267948966) < 1.5707963257948965)
    throw Error(
      `path ${e.id}: a levee needs vertical walls (the rim width must stay put)`,
    );
  let r = n.w / 2 + n.r + (n.apron ?? 1);
  return {
    f: `path`,
    x: e.x,
    z: e.z,
    rot: e.rot,
    y: e.y ?? 0,
    path: { ...e.path, grade: n.lip, bank: void 0 },
    w: 2 * r + 0.2,
    walk: 0,
    blend: t,
    plain: !0,
  };
}
function ht(e, t, n, r, i, a, o = {}) {
  return {
    type: `extrude`,
    profile: e,
    smooth: t,
    hidden: n,
    x0: -r / 2,
    x1: r / 2,
    skin: i,
    bevel: a,
    collide: !0,
    render: !0,
    ...o,
  };
}
function gt(e, t, n, r, i, a, o = !0) {
  let s = t / 2;
  return ht([-s, n, s, n, s, r, -s, r], [0, 0, 0, 0], [+!!o, 0, 0, 0], e, i, a);
}
function _t(e, t, r, a, o, s) {
  for (let c = 0; c <= t; c++) {
    let l = r + (a - r) * (c / t),
      u = i(l),
      d = n(l);
    (o.push(e * u, e - e * d), s.push(-u, d));
  }
}
