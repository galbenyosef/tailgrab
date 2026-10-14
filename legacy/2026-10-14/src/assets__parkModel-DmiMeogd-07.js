// assets__parkModel-DmiMeogd 07 — math
// Lines 1642-1975 of readable/assets__parkModel-DmiMeogd.pretty.js (statement-aligned).
var wt = {
    hills: [
      {
        near: [`#A6DB9C`, `#98D197`, `#B3E2A5`],
        nearTop: `#CFF0BC`,
        ground: `#A9DB9C`,
        mid: [`#8FCBB0`, `#B8E5C6`],
        far: [`#A4B3E6`, `#C9D0F3`],
        pine: [`#5FAF8A`, `#6DBB93`],
      },
      {
        near: [`#B7DF9B`, `#A9D690`, `#C6E7AA`],
        nearTop: `#E6F4BF`,
        ground: `#B5DC9C`,
        mid: [`#9FCB9F`, `#C6E6B5`],
        far: [`#B8A9E2`, `#D8CEF2`],
        pine: [`#63A983`, `#79B98C`],
      },
      {
        near: [`#9ED9B1`, `#8FCFA6`, `#AFE1BD`],
        nearTop: `#D3F2DA`,
        ground: `#A3DAAE`,
        mid: [`#86C2BC`, `#B1DDD6`],
        far: [`#9EB9E8`, `#C4D6F4`],
        pine: [`#4FA489`, `#5DB394`],
      },
    ],
    peaks: [
      {
        near: [`#A6D69E`, `#99CD99`, `#B2DDA6`],
        nearTop: `#C9BFE3`,
        ground: `#A8D6A0`,
        mid: [`#8E98D6`, `#B4B6E8`],
        far: [`#A9A3E4`, `#CBC6F2`],
        pine: [`#5A9F87`, `#6AAE8E`],
      },
      {
        near: [`#9FD3A8`, `#92C99E`, `#ACDAB3`],
        nearTop: `#BFD0EA`,
        ground: `#A1D3A6`,
        mid: [`#7FA3D6`, `#A9C1EA`],
        far: [`#9CB1E6`, `#C3D0F3`],
        pine: [`#4E9A85`, `#5DA98D`],
      },
    ],
    mesa: [
      {
        near: [`#F2A48E`, `#F6BE98`, `#EE9A8A`],
        nearTop: `#FBE0BE`,
        ground: `#EFCB9C`,
        mid: [`#E3A08F`, `#F2C3A6`],
        far: [`#D6A2CC`, `#E9C6E0`],
        pine: [`#8DBB82`, `#9CC68A`],
      },
      {
        near: [`#E9A0A6`, `#F1B7A2`, `#E48E98`],
        nearTop: `#FAD9C2`,
        ground: `#F1D0A6`,
        mid: [`#D995A6`, `#EDB9C0`],
        far: [`#B9A2DC`, `#D6C6EE`],
        pine: [`#90BD86`, `#A0C88E`],
      },
    ],
    pines: [
      {
        near: [`#9FD39A`, `#92CB95`, `#ACD9A3`],
        nearTop: `#C4E8B4`,
        ground: `#9CCF98`,
        mid: [`#5FA892`, `#86C2AE`],
        far: [`#95A3DA`, `#BCC6EE`],
        pine: [`#4F9E86`, `#5FAF8C`, `#3F917F`],
      },
      {
        near: [`#A8D69A`, `#9ACD91`, `#B6DEA5`],
        nearTop: `#D0EABA`,
        ground: `#A6D39A`,
        mid: [`#6AAE8B`, `#92C9A5`],
        far: [`#A99FDC`, `#CCC4F0`],
        pine: [`#58A07F`, `#67AE87`, `#4A9278`],
      },
    ],
    skyline: [
      {
        near: [`#A9DA9E`, `#9CD19A`],
        nearTop: `#C9EDB9`,
        ground: `#B2D9A6`,
        mid: [`#B7B4E6`, `#D3D0F3`],
        far: [`#A6B6E6`, `#CAD4F3`],
        pine: [`#5FAF8A`, `#6DBB93`],
      },
      {
        near: [`#ADDBA0`, `#A0D29B`],
        nearTop: `#CCEEBA`,
        ground: `#B5DAA8`,
        mid: [`#C4B2E3`, `#DDD0F1`],
        far: [`#AFB0E6`, `#D0D0F4`],
        pine: [`#63A983`, `#79B98C`],
      },
    ],
    coast: [
      {
        near: [`#A6DB9C`, `#99D29A`, `#B3E2A5`],
        nearTop: `#CFF0BC`,
        ground: `#A9DB9C`,
        mid: [`#8FC4B8`, `#B8E1D8`],
        far: [`#A2B3E6`, `#C7D1F3`],
        pine: [`#5FAF8A`, `#6DBB93`],
      },
      {
        near: [`#B4DE9C`, `#A7D594`, `#C2E6A9`],
        nearTop: `#E1F3BE`,
        ground: `#B3DB9E`,
        mid: [`#9DBFD9`, `#C2D8EC`],
        far: [`#B3A8E2`, `#D4CCF2`],
        pine: [`#63A983`, `#79B98C`],
      },
    ],
  },
  Tt = [
    `#F4A9C0`,
    `#B5ACEB`,
    `#9FD3EC`,
    `#FFD58A`,
    `#B9E6A6`,
    `#F7B996`,
    `#D3B6EE`,
  ],
  Et = [
    [`#9E97DC`, `#7B72C8`],
    [`#8FB0E4`, `#6C8ED2`],
    [`#B597DC`, `#9274C8`],
    [`#879FDA`, `#6781C6`],
    [`#A9B9E8`, `#8496D4`],
    [`#D6A3CE`, `#B67FB0`],
    [`#9CCDE0`, `#74AFC8`],
  ],
  J = `#F5E2B4`,
  Dt = [`#FFFFFF`, `#FFF7F2`, `#F5F2FF`],
  Ot = [`#FF6FA3`, `#FFD35C`, `#6FD3F2`, `#9B7BFF`, `#FF9F5A`, `#5FD39A`];
function Y(e, t, n, r) {
  if (
    S(e.ctx.rect, t, n) < 40 + r ||
    Math.hypot(t - e.ctx.cx, n - e.ctx.cz) > e.markMax - r
  )
    return !1;
  if (!e.frame) return !0;
  let i = Math.atan2(t - e.ctx.cx, -(n - e.ctx.cz)) / W;
  return (
    e.frame.s(t, n) < -(e.beach + r) && Math.abs(oe(i, e.spec.sea.bearing)) > At
  );
}
var kt = 1.25,
  At = 50;
function jt(e) {
  let t = Math.min(e.rect.x1 - e.rect.x0, e.rect.z1 - e.rect.z0) / 2,
    n = Math.atan2(Math.max(0, e.wallH - 2.5), t) / W;
  return 1 + Math.max(0, n - 3) / 20;
}
function Mt(e, t, n, r, i, a, o) {
  let s = e.R,
    c = q(s, a.shapes),
    l = a.aspect ? K(s, a.aspect[0], a.aspect[1]) : K(s, 0.65, 1),
    u = K(s, a.elev[0], a.elev[1]),
    d =
      o * (c === `peak` ? 1.5 : c === `mesa` ? 1 : c === `dune` ? 0.35 : 0.85),
    f = Math.max(4, Math.min(d, r * Math.tan(u * W) + 2.5));
  return {
    x: t,
    z: n,
    rx: o,
    rz: o * l,
    yaw: -i * W + (s() - 0.5) * 0.5,
    h: f,
    shape: c,
    seg: Math.round(K(s, a.seg?.[0] ?? 8, a.seg?.[1] ?? 12)),
    rings:
      c === `mesa` ? 4 : Math.round(K(s, a.rings?.[0] ?? 3, a.rings?.[1] ?? 4)),
    col: q(s, a.cols),
    top: a.top,
    snow: a.snow ?? 2,
    bands: a.bands ? [...a.bands] : void 0,
    sand: a.sand,
    seed: Math.floor(s() * 1e9),
  };
}
function X(e, t) {
  let n = e.R,
    r = n() * 360;
  for (let i = 0; i < t.n; i++) {
    let a = r + (i / t.n) * 360 + (n() - 0.5) * (300 / t.n),
      o = K(n, t.r[0], t.r[1]),
      s = Math.max(40 + o * kt, K(n, t.d[0], t.d[1])),
      c = E(e.ctx, a, s);
    Y(e, c.x, c.z, o * 0.6) && e.spec.hills.push(Mt(e, c.x, c.z, c.t, a, t, o));
  }
}
function Nt(e, t, n, r, i, a) {
  let o = e.R;
  for (let s = 0; s < r; s++) {
    let r = E(e.ctx, t + (o() - 0.5) * i, Math.max(42, n + (o() - 0.5) * 40));
    if (!Y(e, r.x, r.z, 2)) continue;
    let s = 0;
    for (let t of e.spec.hills) s = Math.max(s, y(t, r.x, r.z));
    let c = K(o, a[0], a[1]);
    e.spec.pines.push({
      x: r.x,
      y: e.ctx.floorY + s - 0.6,
      z: r.z,
      h: c,
      r: c * K(o, 0.26, 0.34),
      col: q(o, e.pal.pine),
    });
  }
}
function Z(e, t, n, r, i = [9, 20]) {
  let a = e.R;
  for (let o = 0; o < t; o++)
    Nt(
      e,
      a() * 360,
      K(e.R, r[0], r[1]),
      Math.round(K(a, n[0], n[1])),
      K(a, 8, 22),
      i,
    );
}
function Pt(e, t) {
  let n = e.R;
  for (let r = 0; r < t; r++) {
    let t = n() * 360,
      r = K(n, 9, 18),
      i = K(n, 8, 14),
      a = K(n, 44 + r / 2, 170),
      o = E(e.ctx, t, a);
    if (!Y(e, o.x, o.z, r / 2)) continue;
    let s = q(n, Tt);
    e.spec.blocks.push({
      x: o.x,
      z: o.z,
      w: r,
      d: i,
      h: K(n, 5, 8) + (a / 170) * K(n, 0, 14),
      yaw: -t * W,
      col: s,
      roof: n() < 0.35 ? `pitched` : `flat`,
    });
  }
}
var Ft = { hills: 2.5, peaks: 1.5, mesa: 1.5, pines: 1 },
  It = {
    hills: [
      [5, 0.6],
      [11, 0.3],
      [23, 0.1],
    ],
    peaks: [
      [7, 0.5],
      [15, 0.3],
      [33, 0.2],
    ],
    mesa: [
      [6, 0.7],
      [14, 0.3],
    ],
    pines: [
      [4, 0.6],
      [9, 0.4],
    ],
  };
function Q(e, t, n, r, i, a = {}) {
  let o = e.R,
    s = a.from ?? 0,
    c = a.to ?? 360,
    l = Math.max(2, Math.round((c - s) / Ft[t]) + 1),
    u = (c - s) / (l - 1),
    d = Ct(o, It[t]),
    f = r[0] * e.boost,
    p = r[1] * e.boost,
    m = [];
  for (let e = 0; e < l; e++) {
    let r = s + e * u,
      i = G((d(r) - 0.2) / 0.6),
      c;
    ((c =
      t === `hills`
        ? St(i)
        : t === `peaks`
          ? G(i ** 1.5 + (o() - 0.5) * 0.14)
          : t === `mesa`
            ? i > 0.55
              ? 0.82 + 0.18 * i
              : 0.18 + 0.25 * i
            : 0.3 + 0.7 * St(i) + (e % 2 ? 0 : 0.4 / Math.max(1, p - f))),
      m.push((f + (p - f) * c) * (a.fade ? a.fade(r, n) : 1)));
  }
  return {
    kind: t,
    r: n,
    from: s,
    to: c,
    step: u,
    elev: m,
    col: i[0],
    top: i[1],
    snow: a.snow ?? 2,
    haze: a.haze ?? 0.25,
    seed: Math.floor(o() * 1e9),
  };
}
function Lt(e, t, n, r) {
  let i = e.R,
    a = e.spec;
  for (let o = 0; o < r; o++) {
    let r = (i() + i()) / 2 - 0.5,
      o = t + r * n,
      s = e.R0 * K(i, 1.02, 1.35),
      c = 1 - Math.abs(r) * 1.2,
      l = K(i, 2, 5) + c * K(i, 0, 6) + (i() < 0.12 ? K(i, 3, 6) : 0),
      u = s * Math.tan(l * e.boost * W),
      [d, f] = q(i, Et);
    a.towers.push({
      bearing: o,
      r: s,
      w: K(i, 24, 64),
      h: u,
      tiers: l > 7 ? 2 + +(i() < 0.4) : 1,
      col: d,
      roof: f,
      antenna: i() < 0.35,
      haze: K(i, 0.1, 0.28),
    });
  }
  a.towers.sort((e, t) => t.r - e.r);
}
