// assets/main-CzsUDvlE 03 — focus
// Lines 643-818 of readable/assets/main-CzsUDvlE.pretty.js (statement-aligned).
var to = 1.85,
  no = 3.2,
  ro = 0.5,
  io = 0.5,
  ao = 0.18,
  oo = 0.45 / no,
  so = 0.5759375,
  co = {
    varginha: {
      s: 2.2,
      focus: 1.7,
      move: (e, t) => eo(e, t, 0.25, 1.25, 0.35),
    },
    abominollie: {
      s: 1.5,
      focus: 1.05,
      ground: !0,
      move: (e, t) => {
        Qa(e, t, 0.45, 0.6, 0.5);
      },
    },
    saci: {
      s: 2,
      focus: 1.25,
      spin: 4 * Math.PI,
      move: (e, t) => {
        let n = 0.8,
          r = Qa(e, t, 0.25, n, 0.6),
          i = r >= 0 ? r / n : +(e > 0.25);
        ((t.yaw += 4 * Math.PI * i), r >= 0 && (t.spin = 4 * Math.PI * i));
      },
    },
    curupira: {
      s: 2,
      focus: 1.0759375,
      spin: 2 * Math.PI,
      ground: !0,
      move: (e, t, { nx: n, nz: r, lx: i, lz: a, upright: o }) => {
        let s = o ? e + oo : e,
          c = 0.3959375,
          l,
          u;
        if (s < c) ((u = no), (l = to - no * s));
        else if (s < so) {
          let e = s - c,
            n = 2.7 / ao;
          ((u = no - n * e),
            (l = to - no * c - (no * e - (n * e * e) / 2)),
            (t.crouch = 1));
        } else
          s < 1.0759375
            ? ((u = ro), (l = ro * (1.0759375 - s)))
            : ((u = 0), (l = 0));
        let d = o ? 0.3 : (l / to) * 0.3;
        ((t.x += -n * l - a * d),
          (t.z += -r * l + i * d),
          (t.vx = n * u),
          (t.vz = r * u),
          (t.speed = u));
        let f = Qa(s, t, so, io, 0.45),
          p = f >= 0 ? f / io : +(s >= so);
        ((t.yaw += Math.PI * (1 + p)),
          f >= 0 && (t.spin = Math.PI * p),
          (t.fakie = s < 1.0759375),
          f >= 0 && f < 0.45 && ((t.trickId = Be), (t.trickT = f)));
      },
    },
    itsy: {
      s: 1.9,
      focus: 1.35,
      at: 0,
      move: (e, t) => {
        Qa(e, t, 0.8, 0.55, 0.45);
      },
    },
    grindula: { s: 1.9, focus: 1.2, pose: `fidget-scheme`, at: 0.3 },
    jester: {
      s: 1.9,
      focus: 1.1,
      move: (e, t) => {
        let n = Qa(e, t, 0.25, 0.84, 0.55);
        n >= 0 &&
          n < 0.82 &&
          ((t.trickId = n < 0.41 ? Be : Pe),
          (t.trickT = n < 0.41 ? n : n - 0.41));
      },
    },
    chupacabra: {
      s: 1.9,
      focus: 1.15,
      at: 0.36,
      pose: `victory-flex`,
      poseAt: 0.7,
      move: (e, t, { lx: n, lz: r }) => {
        let i =
            e < 0.03
              ? 0
              : e < 0.2
                ? $a((e - 0.03) / 0.17)
                : e < 0.5
                  ? 1
                  : e < 0.75
                    ? 1 - $a((e - 0.5) / 0.25)
                    : 0,
          a =
            e < 0.12
              ? 0
              : e < 0.26
                ? 0.3 * $a((e - 0.12) / 0.14)
                : e < 0.4
                  ? 0.3
                  : e < 0.7
                    ? 0.3 * (1 - $a((e - 0.4) / 0.3))
                    : 0;
        ((t.yaw -= 1.35 * i),
          (t.x += (n * 0.78 - r * 0.62) * a),
          (t.z += (r * 0.78 + n * 0.62) * a),
          e > 0.1 && e < 0.38 && (t.crouch = 1));
      },
    },
    sentai: { s: 1.7, focus: 1.1, pose: `victory-sentai`, at: 0.4 },
  },
  lo = new T(),
  uo = new T(),
  fo = new T(),
  po = new T();
function mo(e, t, n = 0, r = null) {
  let i = n ? (n > 1 ? 1 : 0.6) * (t ? 2 : 1) : 0;
  return r && e === `detail`
    ? t
      ? { x: 0, y: r.ground ? 0.47 : 0.37, dist: 6.2 }
      : { x: -0.61, y: -0.28, dist: 4.65 }
    : t
      ? e === `home`
        ? { x: 0, y: 0.1, dist: 3.7 + i }
        : e === `detail`
          ? { x: 0, y: 0.5, dist: 3.4 }
          : { x: 0, y: 1.9, dist: 3.9 }
      : e === `home`
        ? { x: 0.04, y: -0.04, dist: 3.4 + i }
        : e === `detail`
          ? { x: -0.48, y: -0.02, dist: 2.9 }
          : { x: -1.9, y: 0, dist: 3.6 };
}
var ho = [
    [0, 0],
    [0.95, 0.3],
    [-0.95, 0.3],
    [1.8, 0.7],
  ],
  go = [
    [0, 0],
    [0.75, 0.5],
    [-0.75, 0.5],
    [1.35, 1.1],
  ],
  _o = 0.35,
  vo = 4,
  yo = 1.45,
  bo = 0.4,
  xo = [-1.8, 0.7],
  So = [-1.15, 2.2],
  Co = 0.3,
  wo = 1.25,
  To = `showroom`,
  Eo = { nx: 0, nz: 1, lx: -1, lz: 0, upright: !1 };
function Do(e) {
  if (e.id === `plaza`) return { x: 0, y: 0, z: -6, a: _o };
  let t = e.spawns[0] ?? { x: 0, y: 0, z: 0, yaw: 0 };
  return {
    x: t.x + Math.sin(t.yaw) * vo,
    y: t.y,
    z: t.z + Math.cos(t.yaw) * vo,
    a: t.yaw + Math.PI + _o,
  };
}
