// assets__preload-helper-DR1MrGPZ 04 — skin
// Lines 1034-1270 of readable/assets__preload-helper-DR1MrGPZ.pretty.js (statement-aligned).
function et(e, t, n, r) {
  for (let i = 0; i < e.length; i++)
    for (let a = i + 1; a < e.length; a++) {
      let o = e[i],
        s = e[a];
      if (s.s - o.s < 2 * t) continue;
      let c = o.px - s.px,
        l = o.pz - s.pz;
      if (!(c * c + l * l >= t * t) && Math.abs(o.py - s.py) < n + ze.clear)
        throw Error(
          `${r}: s ${o.s.toFixed(1)} and s ${s.s.toFixed(1)} pass ${Math.abs(o.py - s.py).toFixed(2)} m apart — a coil needs ${(n + ze.clear).toFixed(2)} m`,
        );
    }
}
function tt(e, t, n, r = `grade`) {
  for (let i of e)
    if (Math.abs(i.g) > t + 1e-9)
      throw Error(
        `${n}: ${r} ${i.g.toFixed(3)} at s ${i.s.toFixed(1)} is over ${t}`,
      );
}
function nt(e) {
  let t = `path ${e.id}`,
    n = e.section;
  if (n.posts !== void 0 && !(n.posts > 0.5))
    throw Error(`${t}: posts must be > 0.5 m apart`);
  if (n.pillars && !(n.pillars.every > 1))
    throw Error(`${t}: pillars must be > 1 m apart`);
  let r = q(e.path),
    i = re(r),
    a = e.section;
  if (a.type !== `deck` && e.path.bank) throw Error(`${t}: only decks bank`);
  if (a.type !== `deck` && e.ends?.includes(`lip`))
    throw Error(`${t}: only a deck has lip ends`);
  switch (a.type) {
    case `ledge`:
      return (tt(i, ze.grade.ledge, t), ot(e, a, r, i, t));
    case `rail`:
      return (tt(i, ze.grade.rail, t), st(e, a, r, i, t));
    case `deck`:
      return (tt(i, ze.grade.deck, t), ut(e, a, r, i, t));
    case `quarter`:
      return (tt(i, ze.grade.quarter, t), dt(e, a, i, t));
    case `channel`:
      return (tt(i, ze.grade.channel, t), ft(e, a, i, t));
  }
}
var rt = (e) => (e.ground ?? 0) - (e.y ?? 0),
  it = (e, t) =>
    (e.y ?? 0) === 0 && (e.ground ?? 0) === 0 && t.every((e) => e.y === 0);
function at(e, t, n, r, i, a) {
  if (e.path.closed) return;
  let [o, s] = e.ends ?? [`cap`, `cap`];
  (o === `cap` && N(t, n[0], r, -1, i, a),
    s === `cap` && N(t, n[n.length - 1], r, 1, i, a));
}
function ot(e, t, n, r, i) {
  let { w: a, h: o } = t,
    s = a / 2,
    c = t.skirt ?? 0,
    l = e.skin ?? `concrete`,
    u = t.topSkin ?? l,
    d = !!e.path.closed,
    f = x(r, !0),
    p,
    m;
  if (t.profile === `jersey`) {
    let e = a / 0.6,
      [[t, n], [r, i], [s, d]] = He,
      f = o / Ve;
    ((p = [
      { u: t * e, v: -c, skin: l },
      { u: t * e, v: n * f, skin: l },
      { u: r * e, v: i * f, skin: l },
      { u: s * e, v: d * f, skin: u },
      { u: -s * e, v: d * f, skin: l },
      { u: -r * e, v: i * f, skin: l },
      { u: -t * e, v: n * f, skin: l },
      { u: -t * e, v: -c, skin: l },
    ]),
      (m = s * e));
  } else
    ((p = [
      { u: s, v: -c, skin: l },
      { u: s, v: o, skin: u },
      ...Je(s, -s, 1.25).map((e) => ({ u: e, v: o, skin: u })),
      { u: -s, v: o, skin: l },
      { u: -s, v: -c, skin: l },
    ]),
      (m = s));
  let h = qe(p),
    g = new y();
  if ((P(g, f, d, () => h, { who: i }), at(e, g, f, p, l, !0), t.fill)) {
    let n = e.path.plan.reduce((e, t) => e + (`turn` in t ? t.turn : 0), 0);
    if (!d) throw Error(`${i}: only a closed ledge can be filled`);
    let a = n > 0 ? -m : m,
      s = f.map((e) => {
        let [t, , n] = C(e, { u: a, v: 0 });
        return { x: t, z: n };
      }),
      c = 0,
      l = 0;
    for (let e of s) ((c += e.x), (l += e.z));
    k(g, s, c / s.length, l / s.length, r[0].y + o - 0.06, t.fill);
  }
  let _ = t.grind ?? `both`,
    v = [],
    b = t.profile === `jersey` ? He[2][1] * (o / Ve) : o;
  t.profile === `jersey`
    ? _ !== `none` && v.push(Ye(f, 0, b, w.RAIL, 0, d))
    : ((_ === `both` || _ === `right`) && v.push(Ye(f, m, b, w.LEDGE, 1, d)),
      (_ === `both` || _ === `left`) && v.push(Ye(f, -m, b, w.LEDGE, -1, d)));
  let S = t.profile === `jersey` ? He[0][0] * (a / 0.6) : s;
  return {
    prims: [g.prim(`soft`)],
    rails: v,
    ...(it(e, r) ? { outline: Ze(f, S, -S, d) } : {}),
  };
}
function st(e, t, n, r, i) {
  let { h: o } = t,
    s = t.skirt ?? 0,
    c = !!e.path.closed,
    l = x(r, !0),
    u = e.skin ?? `metal`,
    d = [Xe(l, 0, o, D, u, c)],
    f = n.length,
    p = t.posts ?? 3,
    m = c ? Math.max(3, Math.round(f / p)) : Math.max(2, Math.round(f / p) + 1);
  for (let e = 0; e < m; e++) {
    let t = Qe(n, c ? (f * e) / m : f * (0.04 + (0.92 * e) / (m - 1)), !0),
      [r, i, a] = C(t, { u: 0, v: -s }),
      [, l] = C(t, { u: 0, v: o - D });
    d.push({
      type: `tube`,
      path: [r, i, a, r, l, a],
      radius: 0.035,
      skin: u,
      caps: !1,
    });
  }
  let h = 0.05,
    g = new y();
  for (let e of [h, -0.05]) {
    let t = e > 0 ? 1 : -1,
      n = [
        { u: e, v: -s, nu: t, nv: 0, skin: u },
        { u: e, v: o, nu: t, nv: 0, skin: u },
      ];
    P(g, l, c, () => n, { who: i, maxTurn: a });
  }
  return (
    at(
      e,
      g,
      l,
      [
        { u: h, v: -s },
        { u: h, v: o },
        { u: -0.05, v: o },
        { u: -0.05, v: -s },
      ],
      u,
      !0,
    ),
    d.push(g.prim(`none`, { render: !1, rail: !0 })),
    { prims: d, rails: [Ye(l, 0, o, w.RAIL, 0, c)] }
  );
}
function ct(e) {
  if (!e) return { shape: [[0, 0]], rails: [] };
  switch (e.type) {
    case `lip`:
      return {
        shape: [[0, 0]],
        rails: [{ d: 0, v: 0, kind: w.LEDGE, out: !0 }],
      };
    case `railing`:
      return {
        shape: [[0, 0]],
        rails: [{ d: 0.08, v: e.h, kind: w.RAIL, out: !1 }],
        railing: { d: 0.08, h: e.h, posts: e.posts ?? 2.4 },
      };
    case `curb`:
      return {
        shape: [
          [0.3, 0],
          [0.3, e.h],
          [0, e.h],
        ],
        rails: [{ d: 0.3, v: e.h, kind: w.LEDGE, out: !1 }],
      };
    case `parapet`: {
      let t = e.grind ?? `in`,
        n = [];
      return (
        t !== `none` && n.push({ d: e.w, v: e.h, kind: w.LEDGE, out: !1 }),
        t === `both` && n.push({ d: 0, v: e.h, kind: w.LEDGE, out: !0 }),
        {
          shape: [
            [e.w, 0],
            [e.w, e.h],
            [0, e.h],
          ],
          rails: n,
        }
      );
    }
    case `jersey`: {
      let t = e.grind ?? `in`,
        [[n, r], [i, a], [o, s]] = He,
        c = [];
      return (
        t !== `none` && c.push({ d: 2 * o, v: s, kind: w.LEDGE, out: !1 }),
        t === `both` && c.push({ d: 0, v: s, kind: w.LEDGE, out: !0 }),
        {
          shape: [
            [n + o, 0],
            [n + o, r],
            [i + o, a],
            [2 * o, s],
            [0, s],
          ],
          rails: c,
        }
      );
    }
  }
}
function lt(e, t) {
  let n = (e) => !!e.abs && Math.abs(e.v - t) < 1e-4;
  return (t, r) => {
    let i = e[r],
      a = e[(r + 1) % e.length];
    return n(i[t]) && n(i[t + 1]) && n(a[t]) && n(a[t + 1]);
  };
}
