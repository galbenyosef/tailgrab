// assets/parkModel-DmiMeogd 09 — math
// Lines 2209-2554 of readable/assets/parkModel-DmiMeogd.pretty.js (statement-aligned).
var Wt = {
  hills(e) {
    let { R: t, pal: n } = e;
    (X(e, {
      n: 14 + Math.floor(t() * 6),
      d: [42, 110],
      r: [30, 68],
      elev: [2.5, 6],
      shapes: [`dome`],
      cols: n.near,
      top: n.nearTop,
    }),
      X(e, {
        n: 10 + Math.floor(t() * 5),
        d: [110, 230],
        r: [45, 95],
        elev: [4, 8],
        shapes: [`dome`],
        cols: n.near,
        top: n.nearTop,
      }),
      Z(e, 3 + Math.floor(t() * 4), [5, 12], [44, 150]),
      e.spec.ranges.push(
        Q(e, `hills`, e.R0, [2.5, 5.5], n.mid, { haze: 0.15 }),
      ),
      e.spec.ranges.push(
        Q(e, t() < 0.5 ? `hills` : `peaks`, e.R0 * 1.45, [4, 8.5], n.far, {
          snow: 0.82,
          haze: 0.3,
        }),
      ));
  },
  peaks(e) {
    let { R: t, pal: n } = e;
    (X(e, {
      n: 13 + Math.floor(t() * 5),
      d: [42, 120],
      r: [30, 65],
      elev: [2.5, 6],
      shapes: [`dome`],
      cols: n.near,
      top: n.near[0],
    }),
      X(e, {
        n: 6 + Math.floor(t() * 4),
        d: [120, 230],
        r: [40, 80],
        elev: [5, 10],
        shapes: [`peak`],
        cols: n.near,
        top: n.nearTop,
        snow: 0.8,
      }),
      Z(e, 3 + Math.floor(t() * 3), [5, 12], [44, 140]),
      e.spec.ranges.push(Q(e, `hills`, e.R0, [3, 6.5], n.mid, { haze: 0.15 })),
      e.spec.ranges.push(
        Q(e, `peaks`, e.R0 * 1.4, [7, 15], n.far, { snow: 0.62, haze: 0.28 }),
      ),
      e.spec.ranges.push(
        Q(e, `peaks`, e.R0 * 2, [9, 19], [n.far[1], `#E4E2F8`], {
          snow: 0.74,
          haze: 0.45,
        }),
      ));
  },
  mesa(e) {
    let { R: t, pal: n } = e;
    (X(e, {
      n: 8 + Math.floor(t() * 5),
      d: [42, 120],
      r: [30, 60],
      elev: [1.5, 3.5],
      shapes: [`dome`],
      aspect: [0.5, 0.8],
      cols: [n.ground, n.nearTop],
      top: n.nearTop,
    }),
      X(e, {
        n: 7 + Math.floor(t() * 5),
        d: [60, 225],
        r: [28, 66],
        elev: [3, 8],
        shapes: [`mesa`],
        cols: n.near,
        top: n.nearTop,
        bands: [n.near[0], n.near[1], n.nearTop, n.near[2]],
      }),
      e.spec.ranges.push(Q(e, `mesa`, e.R0, [2, 6.5], n.mid, { haze: 0.15 })),
      e.spec.ranges.push(
        Q(e, `mesa`, e.R0 * 1.5, [3.5, 9], n.far, { haze: 0.32 }),
      ));
  },
  pines(e) {
    let { R: t, pal: n } = e;
    (X(e, {
      n: 12 + Math.floor(t() * 5),
      d: [42, 140],
      r: [35, 75],
      elev: [2, 5],
      shapes: [`dome`],
      cols: n.near,
      top: n.nearTop,
    }),
      Z(e, 9 + Math.floor(t() * 5), [7, 14], [42, 170], [10, 24]),
      e.spec.ranges.push(
        Q(e, `pines`, e.R0, [2.5, 5.5], n.mid, { haze: 0.15 }),
      ),
      e.spec.ranges.push(
        Q(e, `peaks`, e.R0 * 1.5, [6, 13], n.far, { snow: 0.6, haze: 0.32 }),
      ));
  },
  skyline(e, t) {
    let { R: n, pal: r } = e;
    (Pt(e, 24 + Math.floor(n() * 20)),
      X(e, {
        n: 6 + Math.floor(n() * 4),
        d: [150, 230],
        r: [40, 80],
        elev: [2, 4.5],
        shapes: [`dome`],
        cols: r.near,
        top: r.nearTop,
      }),
      Z(e, 2 + Math.floor(n() * 3), [4, 9], [44, 140]),
      Lt(
        e,
        (t ?? n() * 360) + (n() - 0.5) * 40,
        K(n, 160, 300),
        40 + Math.floor(n() * 30),
      ),
      e.spec.ranges.push(
        Q(e, n() < 0.5 ? `hills` : `peaks`, e.R0 * 1.7, [3, 7], r.far, {
          snow: 0.7,
          haze: 0.4,
        }),
      ));
  },
  coast(e) {
    let { R: t, pal: n, ctx: r } = e,
      i = e.frame,
      a = (e, t) => G(-i.s(r.cx + se(e) * t, r.cz + C(e) * t) / (0.35 * t));
    (X(e, {
      n: 10 + Math.floor(t() * 5),
      d: [42, 90],
      r: [26, 50],
      elev: [1, 2.5],
      shapes: [`dune`],
      aspect: [0.35, 0.6],
      cols: [J, `#EFDCAA`],
      top: `#FFF1CC`,
    }),
      X(e, {
        n: 10 + Math.floor(t() * 5),
        d: [90, 220],
        r: [40, 85],
        elev: [3, 7],
        shapes: [`dome`],
        cols: n.near,
        top: n.nearTop,
      }),
      Z(e, 2 + Math.floor(t() * 3), [4, 9], [60, 160]));
    let o = 1 + Math.floor(t() * 3),
      s = Math.min(260, i.latMax * 0.6);
    for (let a = 0; a < o; a++) {
      let a = i.at((t() - 0.5) * 2 * s, K(t, 120, 360)),
        o = Math.hypot(a.x - r.cx, a.z - r.cz),
        c = K(t, 22, 55);
      if (o > e.markMax - c) continue;
      let l = {
        n: 1,
        d: [0, 0],
        r: [c, c],
        elev: [3, 7],
        shapes: [`dome`, `peak`],
        cols: n.near,
        top: n.nearTop,
        sand: J,
      };
      e.spec.hills.push(
        Mt(e, a.x, a.z, o, Math.atan2(a.x - r.cx, -(a.z - r.cz)) / W, l, c),
      );
    }
    let c = t() < 0.5 ? `hills` : `peaks`;
    (e.spec.ranges.push(
      Q(e, c, e.R0, [2.5, 6], n.mid, { haze: 0.15, fade: a }),
    ),
      e.spec.ranges.push(
        Q(e, `peaks`, e.R0 * 1.5, [5, 12], n.far, {
          snow: 0.65,
          haze: 0.3,
          fade: a,
        }),
      ));
    for (let r = 0; r < 2 + Math.floor(t() * 3); r++) {
      let r = e.spec.sea.bearing + (t() - 0.5) * 70,
        i = e.R0 * K(t, 1.05, 1.6),
        o = K(t, 4, 12);
      a(r, i) > 0.05 ||
        e.spec.ranges.push(
          Q(e, `hills`, i, [0.8, 2.6], n.mid, {
            haze: 0.25,
            from: r - o / 2,
            to: r + o / 2,
            fade: (e) => Math.sin(G((e - (r - o / 2)) / o) * Math.PI),
          }),
        );
    }
    e.spec.ranges.sort((e, t) => t.r - e.r);
  },
};
function Gt(e, t) {
  let n = v(_(`scenery`, t.theme, t.seed)),
    r = ne(e.id),
    i = q(n, wt[t.theme]),
    a = Math.max(700, e.diag + 480),
    o = {
      pin: t,
      rect: { ...e.rect },
      cx: e.cx,
      cz: e.cz,
      floorY: e.floorY,
      ground: { far: i.ground, sand: J },
      sea: null,
      hills: [],
      skirt: e.terrain,
      pines: [],
      blocks: [],
      ranges: [],
      towers: [],
      banks: [],
      marks: [],
      moon: null,
    },
    s = {
      ctx: e,
      R: n,
      spec: o,
      pal: i,
      R0: a,
      markMax: Math.min(a - 60, le - e.diag - 20),
      boost: jt(e),
      frame: null,
      beach: 0,
    };
  if (t.theme === `coast`) {
    let t =
        r.sea === void 0
          ? (r.face ?? n() * 360) + (n() - 0.5) * 60
          : r.sea + (n() - 0.5) * 30,
      i = K(n, 8, 16),
      a = K(n, 4, 18),
      c = n() < 0.3 ? K(n, 0, 30) : K(n, 60, 260),
      l = se(t),
      u = C(t),
      d = e.rect,
      f = 0;
    for (let [t, n] of [
      [d.x0 - 38, d.z0 - 38],
      [d.x1 + 38, d.z0 - 38],
      [d.x0 - 38, d.z1 + 38],
      [d.x1 + 38, d.z1 + 38],
    ])
      f = Math.max(f, (t - e.cx) * l + (n - e.cz) * u);
    let p = 38 + i + a + K(n, 4, 30);
    for (; E(e, t, p).t < f + i + a + 2;) p += 4;
    ((o.sea = {
      bearing: t,
      d: p,
      bend: c,
      wave: a,
      k: K(n, 0.004, 0.012),
      phase: n() * Math.PI * 2,
      beach: i,
      shallow: `#7FDCD6`,
      deep: `#4FA3DB`,
      sand: J,
    }),
      (s.frame = D(e, o.sea)),
      (s.beach = i));
  }
  return (
    Wt[t.theme](s, r.face),
    Rt(s, 1 + Math.floor(n() * 3)),
    Ut(s, t.marks ?? Vt(s, t.theme), r.face),
    (o.moon = {
      bearing: (r.face ?? n() * 360) + (n() - 0.5) * 70,
      elev: K(n, 14, 30),
      phase: K(n, 0.25, 0.75),
    }),
    o
  );
}
var Kt = {
    ferris: 1500,
    turbines: 110,
    mast: 140,
    balloons: 200,
    blimp: 320,
    sign: 1400,
    lighthouse: 260,
    boats: 40,
  },
  qt = {
    ferris: 2,
    turbines: 1,
    mast: 1,
    balloons: 1,
    blimp: 1,
    sign: 0,
    lighthouse: 1,
    boats: 1,
  },
  Jt = [`turbines`, `balloons`, `boats`];
function Yt(e) {
  let t = e.rect.x1 - e.rect.x0,
    n = e.rect.z1 - e.rect.z0,
    r = 0;
  for (let e = 0; e < M.length - 1; e++) {
    let i = M[e],
      a = M[e + 1],
      o = x(i, a);
    for (let e = 0; e < 4; e++)
      r += 2 * Math.ceil((e % 2 == 0 ? t + 2 * a : n + 2 * a) / o);
  }
  return r;
}
function Xt(e, t) {
  let n = t === `low`,
    r = Yt(e) + 360,
    i = 3;
  e.sea && ((r += (k.length - 1) * 64 * 2), i++);
  for (let t of e.ranges) r += ye(t);
  for (let t of e.towers) r += ce(t);
  for (let t of e.banks) r += ve(t);
  for (let t of e.hills) r += te(t);
  (n || (r += e.pines.length * 10), (r += e.blocks.length * 60));
  let a = n ? e.marks.slice(0, 2) : e.marks;
  for (let e of a) {
    let t = Jt.includes(e.kind)
      ? Math.min(e.pts?.length ?? 1, n && e.kind !== `turbines` ? 2 : 1 / 0)
      : 1;
    ((r += Kt[e.kind] * t), (i += qt[e.kind]));
  }
  return { tris: r, calls: i };
}
var Zt = null;
