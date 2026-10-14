// assets/parkModel-DmiMeogd 08 — math
// Lines 1976-2208 of readable/assets/parkModel-DmiMeogd.pretty.js (statement-aligned).
function Rt(e, t) {
  let n = e.R;
  for (let r = 0; r < t; r++) {
    let t = K(n, 5, 14),
      r = 5 + Math.floor(n() * 7),
      i = Array.from({ length: r }, () => {
        let e = (n() - 0.5) * 2 * t,
          r = K(n, 1, 2.8) * (1 - (Math.abs(e) / t) * 0.55);
        return { a: e, e: r * K(n, 0, 0.35), r };
      });
    e.spec.banks.push({
      bearing: n() * 360,
      elev: K(n, 1.2, 4),
      puffs: i,
      col: q(n, Dt),
    });
  }
}
var zt = {
    hills: [`ferris`, `turbines`, `balloons`, `sign`, `mast`, `blimp`],
    peaks: [`mast`, `balloons`, `blimp`, `sign`, `turbines`],
    mesa: [`turbines`, `mast`, `balloons`, `blimp`, `sign`],
    pines: [`mast`, `balloons`, `sign`, `blimp`, `turbines`],
    skyline: [`ferris`, `blimp`, `mast`, `balloons`],
    coast: [`ferris`, `blimp`, `balloons`],
  },
  Bt = [`mast`, `blimp`, `balloons`, `ferris`];
function Vt(e, t) {
  let n = e.R,
    r = [...zt[t]];
  e.ctx.wallH >= 5 && (r = r.filter((e) => Bt.includes(e)));
  let i = t === `coast` ? +(n() < 0.5) : 1 + Math.floor(n() * 2.2),
    a = [];
  for (; a.length < i && r.length;)
    a.push(r.splice(Math.floor(n() * r.length), 1)[0]);
  return (t === `coast` && a.push(`lighthouse`, `boats`), a);
}
function Ht(e, t, n, r) {
  let i = null;
  for (let a = 0; a < 60; a++) {
    let a = e.R() * 360;
    if (r(a)) {
      if (t.every((e) => Math.abs(oe(a, e)) >= n)) return a;
      i ??= a;
    }
  }
  return i;
}
function Ut(e, t, n) {
  let { R: r, ctx: i, spec: a } = e,
    o = [],
    s = i.wallH >= 5 ? 1.35 : 1,
    c = (t, n, r) => {
      let a = E(i, t, n);
      return Y(e, a.x, a.z, r);
    };
  t.forEach((t) => {
    let l =
        a.marks.length === 0 &&
        n !== void 0 &&
        t !== `lighthouse` &&
        t !== `boats`,
      u = (t, i) => {
        if (l)
          for (let e = 0; e < 16; e++) {
            let e = n + (r() - 0.5) * 44;
            if (c(e, t, i)) return e;
          }
        return Ht(e, o, 55, (e) => c(e, t, i));
      },
      d = q(r, Ot),
      f = (e, n, a = {}) => {
        let s = E(i, e, n);
        return (
          o.push(e),
          {
            kind: t,
            x: s.x,
            y: i.floorY,
            z: s.z,
            yaw: Math.atan2(i.cx - s.x, i.cz - s.z),
            s: 1,
            seed: Math.floor(r() * 1e9),
            col: `#FFFFFF`,
            accent: d,
            ...a,
          }
        );
      };
    if (t === `ferris`) {
      let e = K(r, 80, 160),
        t = u(e, 40);
      t !== null &&
        a.marks.push(
          f(t, e, {
            s: K(r, 0.95, 1.2) * s,
            col: q(r, [`#FFFFFF`, `#FFE9F1`, `#EEF0FF`]),
          }),
        );
    } else if (t === `mast`) {
      let e = K(r, 110, 240),
        t = u(e, 12);
      t !== null &&
        a.marks.push(
          f(t, e, {
            s: K(r, 0.9, 1.25) * s,
            col: `#FFFFFF`,
            accent: `#FF6F7D`,
          }),
        );
    } else if (t === `turbines`) {
      let t = K(r, 150, 300),
        n = u(t, 20);
      if (n === null) return;
      let o = f(n, t, { col: `#FFFFFF`, accent: `#E9ECF8` });
      o.pts = [];
      let s = 3 + Math.floor(r() * 5),
        c = K(r, 16, 34);
      for (let a = 0; a < s; a++) {
        let l = E(
          i,
          n + (a / Math.max(1, s - 1) - 0.5) * c + (r() - 0.5) * 3,
          t + (r() - 0.5) * 90,
        );
        Y(e, l.x, l.z, 10) &&
          o.pts.push({ x: l.x, y: i.floorY, z: l.z, s: K(r, 0.85, 1.15) });
      }
      o.pts.length && a.marks.push(o);
    } else if (t === `balloons`) {
      let t = l ? n + (r() - 0.5) * 30 : Ht(e, o, 40, () => !0),
        c = f(t, 120);
      c.pts = [];
      let u = 2 + Math.floor(r() * 3);
      for (let e = 0; e < u; e++) {
        let e = E(i, t + (r() - 0.5) * 50, K(r, 30, 200));
        c.pts.push({
          x: e.x,
          y: i.floorY + K(r, 32, 90) * s,
          z: e.z,
          s: K(r, 0.85, 1.2),
        });
      }
      a.marks.push(c);
    } else if (t === `blimp`) {
      let t = f(l ? n : Ht(e, o, 40, () => !0), 150, {
        alt: K(r, 75, 110) * s,
        orbit: Math.min(e.markMax - 40, i.diag + K(r, 140, 280)),
        col: q(r, [`#FFE27A`, `#DDE3F2`, `#FFB7CF`]),
        accent: q(r, [`#7A6FE0`, `#FF6FA3`, `#3FB6E0`]),
      });
      a.marks.push(t);
    } else if (t === `sign`) {
      let n = Math.max(42 + 40 * kt, K(r, 85, 125)),
        c = u(n, 60);
      if (c === null) return;
      let l = E(i, c, n);
      if (!Y(e, l.x, l.z, 40)) return;
      let f = {
        x: l.x,
        z: l.z,
        rx: 78,
        rz: 40,
        yaw: -c * W,
        h: Math.min(34, l.t * Math.tan(7 * W) + 6),
        shape: `dome`,
        seg: 14,
        rings: 4,
        col: q(r, e.pal.near),
        top: e.pal.nearTop,
        snow: 2,
        seed: Math.floor(r() * 1e9),
      };
      a.hills.push(f);
      let p = de(f, 0, f.rz * 0.5);
      (o.push(c),
        a.marks.push({
          kind: t,
          x: p.x,
          y: i.floorY,
          z: p.z,
          yaw: Math.atan2(i.cx - p.x, i.cz - p.z),
          s,
          seed: Math.floor(r() * 1e9),
          col: `#FFFFFF`,
          accent: d,
          hill: a.hills.length - 1,
        }));
    } else if (t === `lighthouse` && e.frame) {
      let n = e.frame,
        o = Math.min(170, n.latMax * 0.6),
        c = (r() < 0.5 ? -1 : 1) * K(r, 50, o),
        l = n.at(c, -4);
      for (
        ;
        Math.hypot(l.x - i.cx, l.z - i.cz) > e.markMax - 30 && Math.abs(c) > 10;
      )
        ((c *= 0.8), (l = n.at(c, -4)));
      a.marks.push({
        kind: t,
        x: l.x,
        y: i.floorY,
        z: l.z,
        yaw: Math.atan2(i.cx - l.x, i.cz - l.z),
        s: K(r, 0.95, 1.2) * s,
        seed: Math.floor(r() * 1e9),
        col: `#FFFFFF`,
        accent: `#FF6F7D`,
      });
    } else if (t === `boats` && e.frame) {
      let n = e.frame,
        o = Math.min(260, n.latMax * 0.6),
        s = {
          kind: t,
          x: 0,
          y: i.floorY,
          z: 0,
          yaw: 0,
          s: 1,
          seed: Math.floor(r() * 1e9),
          col: `#FFFFFF`,
          accent: d,
          pts: [],
        },
        c = 2 + Math.floor(r() * 4);
      for (let t = 0; t < c * 4 && s.pts.length < c; t++) {
        let t = n.at((r() - 0.5) * 2 * o, K(r, 40, 320));
        Math.hypot(t.x - i.cx, t.z - i.cz) < e.markMax - 20 &&
          s.pts.push({ x: t.x, y: i.floorY, z: t.z, s: K(r, 0.8, 1.3) });
      }
      s.pts.length && ((s.x = s.pts[0].x), (s.z = s.pts[0].z), a.marks.push(s));
    }
  });
}
