// assets/preload-helper-DR1MrGPZ 05 — skin
// Lines 1271-1510 of readable/assets/preload-helper-DR1MrGPZ.pretty.js (statement-aligned).
function checkBankSurface(e, t, n, r, i) {
  let { w: o } = t,
    s = o / 2,
    c = t.t ?? 0.5,
    l = rt(e),
    u = !!e.path.closed;
  for (let e of r)
    if (Math.abs(e.bank) > ze.bank + 1e-9)
      throw Error(`${i}: bank over 30° at s ${e.s.toFixed(1)}`);
  let d = x(r, !1),
    f = t.sideSkin ?? e.skin ?? `concrete`,
    p = t.topSkin ?? `asphalt`,
    m = `concrete`,
    [h, g] = [checkLipProfile(t.edges?.[0]), checkLipProfile(t.edges?.[1])],
    _ = (e) => Math.min(C(e, { u: s, v: -c })[1], C(e, { u: -s, v: -c })[1]),
    v = t.base ?? `auto`;
  if (v === `slab`) {
    for (let e of d)
      if (_(e) - l < ze.clear - 1e-9)
        throw Error(
          `${i}: a slab needs ${ze.clear} m under it (s ${e.s.toFixed(1)})`,
        );
  }
  let b = d.map((e) => v === `solid` || (v === `auto` && _(e) - l < ze.clear));
  et(d, o, c, i);
  let S = s - h.shape[0][0],
    T = s - g.shape[0][0],
    E = (e) => {
      let t = (t, n) =>
          b[e] ? { u: t, v: l, abs: !0, skin: f, n } : { u: t, v: -c, skin: f },
        n = [...h.shape]
          .reverse()
          .map(([e, t], n, r) => ({
            u: s - e,
            v: t,
            skin: n === r.length - 1 ? p : m,
          })),
        r = g.shape.map(([e, t], n, r) => ({
          u: -(s - e),
          v: t,
          skin: n === r.length - 1 ? f : m,
        }));
      return [
        t(s, [1, 0]),
        ...n,
        ...Je(S, -T, 2).map((e) => ({ u: e, v: 0, skin: p })),
        ...r,
        t(-s, [0, -1]),
        ...Je(-s, s, 2).map((e) => t(e)),
        t(s),
      ];
    },
    O = d.map((e, t) => qe(E(t)));
  O[0].length;
  let k = new y(),
    A = (e) => {
      let t = O[0][e];
      return !t.abs && t.nv > 0.5 && t.v > -1e-9;
    };
  P(k, d, u, (e) => O[e], { who: i, skip: lt(O, l), quiet: (e) => !A(e) });
  let [j, M] = u ? [`open`, `open`] : (e.ends ?? [`cap`, `cap`]);
  if (!u) {
    let e = (e) => E(e).slice(0, -1);
    (j !== `open` && N(k, d[0], e(0), -1, f),
      M !== `open` && N(k, d[d.length - 1], e(d.length - 1), 1, f));
  }
  let F = [k.prim(`soft`)],
    I = [];
  for (let [e, t, n] of [
    [j, d[0], -1],
    [M, d[d.length - 1], 1],
  ]) {
    if (e !== `lip`) continue;
    let [r, i, a] = C(t, { u: S, v: 0 }),
      [o, s, c] = C(t, { u: -T, v: 0 }),
      l = Math.sqrt(t.tx * t.tx + t.tz * t.tz);
    I.push({
      kind: w.LEDGE,
      path: [r, i, a, o, s, c],
      nx: (n * t.tx) / l,
      nz: (n * t.tz) / l,
    });
  }
  for (let [e, t] of [
    [1, h],
    [-1, g],
  ]) {
    for (let n of t.rails)
      I.push(
        Ye(
          d,
          e * (s - n.d),
          n.v,
          n.kind,
          n.kind === w.RAIL ? 0 : n.out ? e : -e,
          u,
        ),
      );
    if (!t.railing) continue;
    let r = e * (s - t.railing.d),
      o = t.railing.h;
    F.push(Xe(d, r, o, D, `metal`, u));
    let c = Math.max(2, Math.round(n.length / t.railing.posts) + 1);
    for (let e = 0; e < c; e++) {
      let t = Qe(n, (n.length * e) / (c - 1), !1),
        [i, a, s] = C(t, { u: r, v: 0 }),
        [l, u, d] = C(t, { u: r, v: o - D });
      F.push({
        type: `tube`,
        path: [i, a, s, l, u, d],
        radius: 0.035,
        skin: `metal`,
        caps: !1,
      });
    }
    let l = new y();
    for (let e of [0.05, -0.05]) {
      let t = e > 0 ? 1 : -1,
        n = [
          { u: r + e, v: 0, nu: t, nv: 0, skin: `metal` },
          { u: r + e, v: o, nu: t, nv: 0, skin: `metal` },
        ];
      P(l, d, u, () => n, { who: i, maxTurn: a });
    }
    F.push(l.prim(`none`, { render: !1, rail: !0 }));
  }
  let L = [];
  if ((Ge.set(e, L), t.pillars)) {
    let e = t.pillars,
      r = (e.size ?? 0.8) / 2,
      a = new y();
    for (let t = e.from ?? e.every / 2; t <= n.length - 1e-6; t += e.every) {
      let o = Qe(n, t, !1);
      if (_(o) - l < ze.clear) continue;
      let u = Math.sqrt(o.tx * o.tx + o.tz * o.tz);
      for (let n of e.u ?? [0]) {
        let [e, p, m] = C(o, { u: n, v: -c / 2 });
        for (let a of d) {
          if (a.py > p - c) continue;
          let o = e - a.px,
            l = m - a.pz,
            u = o * a.hx + l * a.hz,
            d = Math.abs(o * a.hz - l * a.hx);
          if (Math.abs(u) < s + r && d < r + 0.7)
            throw Error(
              `${i}: the pillar at s ${t.toFixed(1)}, u ${n} stands on the deck below (s ${a.s.toFixed(1)}) — move it off the lane`,
            );
        }
        ($e(a, e, m, o.tx / u, o.tz / u, r, l, p, f),
          L.push({ x: e, z: m, a: r, y0: l, y1: p }));
      }
    }
    a.tris.length && F.push(a.prim(`soft`));
  }
  return { prims: F, rails: I };
}
function checkBerm(t, r, a, o) {
  let { r: s, h: c, deck: l } = r,
    u = r.side === `left` ? -1 : 1,
    d = !!t.path.closed,
    f = x(a, !0),
    p = t.skin ?? `woodSide`,
    m = c < s - 1e-6,
    h = [
      { u: -l, v: 0, nu: -1, nv: 0, skin: p },
      { u: -l, v: c, nu: -1, nv: 0, skin: p },
      { u: -l, v: c, nu: 0, nv: 1, skin: `concrete` },
      { u: 0, v: c, nu: 0, nv: 1, skin: `concrete` },
    ],
    g;
  if (!m)
    (h.push(
      ...j(c, s, `wood`, `wood`).map((e) => ({
        u: e.u,
        v: e.y + c,
        nu: e.nu,
        nv: e.ny,
        skin: e.skin,
      })),
    ),
      (g = s));
  else {
    let t = 1 - c / s,
      r = Math.sqrt(1 - t * t),
      a = e(r, t);
    if (a > 0.6981)
      throw Error(
        `${o}: a berm lip at ${(a * 57.3).toFixed(0)}° launches — keep h ≤ ${(s * (1 - n(0.6981))).toFixed(2)}`,
      );
    g = s * r;
    for (let e = 0; e <= 6; e++) {
      let t = a * (1 - e / 6),
        r = i(t),
        o = n(t);
      h.push({ u: g - s * r, v: s - s * o, nu: r, nv: o, skin: `wood` });
    }
  }
  let _ = h.map((e) => ({ ...e, u: u * e.u, nu: u * e.nu })),
    v = new y();
  P(v, f, d, () => _, { who: o });
  let b = [];
  for (let e of _) {
    let t = b[b.length - 1];
    (!t || Math.abs(t.u - e.u) > 1e-9 || Math.abs(t.v - e.v) > 1e-9) &&
      b.push({ u: e.u, v: e.v });
  }
  at(t, v, f, b, p, !0);
  let S = [v.prim(`lip`)],
    T = [];
  if (
    (m
      ? T.push(Ye(f, 0, c, w.LEDGE, u, d))
      : (S.push(Xe(f, 0, c, M, `metal`, d)),
        T.push(Ye(f, 0, c, w.COPING, u, d))),
    T.push(Ye(f, -u * l, c, w.LEDGE, -u, d)),
    !d)
  ) {
    let [e, n] = t.ends ?? [`cap`, `cap`];
    for (let [t, r, i] of [
      [e, f[0], -1],
      [n, f[f.length - 1], 1],
    ]) {
      if (t !== `cap`) continue;
      let [e, n, a] = C(r, { u: 0, v: c }),
        [o, s, d] = C(r, { u: -u * l, v: c }),
        f = Math.sqrt(r.tx * r.tx + r.tz * r.tz);
      T.push({
        kind: w.LEDGE,
        path: [e, n, a, o, s, d],
        nx: (i * r.tx) / f,
        nz: (i * r.tz) / f,
      });
    }
  }
  return {
    prims: S,
    rails: T,
    ...(it(t, a) ? { outline: Ze(f, u > 0 ? g : l, u > 0 ? -l : -g, d) } : {}),
  };
}
