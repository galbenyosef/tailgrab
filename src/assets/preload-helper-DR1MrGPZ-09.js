// assets/preload-helper-DR1MrGPZ 09 — push
// Lines 2327-2675 of readable/assets/preload-helper-DR1MrGPZ.pretty.js (statement-aligned).
function Pt(e) {
  switch (e.kind) {
    case `path`:
      return We(e);
    case `terrain`:
      return { prims: [], rails: [] };
    case `prop`: {
      let t = { ...gt(e.w, e.d, 0, e.h, `metal`, `none`), render: !1 };
      return (
        Mt.has(e.prop) && (t.loose = !0),
        { prims: [t], rails: e.grind ? _(e.w, e.d, e.h) : [] }
      );
    }
    case `bowl`:
      return yt(e);
    case `curve`:
      return Ot(e);
    case `pyramid`:
      return kt(e);
    case `volcano`:
      return At(e);
    case `cone`:
      return jt(e);
    case `hubba`: {
      let { len: t, d: n, h: r, h2: i } = e,
        a = t / 2,
        o = n / 2;
      return {
        prims: [
          ht(
            [-a, 0, a, 0, a, i, -a, r],
            [0, 0, 0, 0],
            [1, 0, 0, 0],
            n,
            e.skin ?? `concrete`,
            `soft`,
          ),
        ],
        rails: [
          { kind: w.LEDGE, path: [-o, r, -a, -o, i, a], nx: -1, nz: 0 },
          { kind: w.LEDGE, path: [o, i, a, o, r, -a], nx: 1, nz: 0 },
        ],
      };
    }
    case `polejam`: {
      let { len: t, h2: n } = e,
        r = t / 2,
        i = [-r, D, 0, r, n, 0];
      return {
        prims: [
          {
            type: `tube`,
            path: i,
            radius: D * 1.4,
            skin: e.skin ?? `metal`,
            caps: !0,
          },
          {
            type: `tube`,
            path: [-r - 0.08, 0, 0, -r + 0.08, 0.1, 0],
            radius: 0.09,
            skin: `metal`,
            caps: !0,
          },
          O(-r, D, r, n),
        ],
        rails: [{ kind: w.RAIL, path: i, nx: 0, nz: 0 }],
      };
    }
    case `spine`: {
      let { w: t, r, h: o } = e,
        s = M,
        c = o > r + 0.001,
        l = [-s - r, 0, s + r, 0],
        u = [0, 1, 0, 1];
      for (let e = 1; e <= 12; e++) {
        let t = (a * e) / 12,
          o = i(t),
          d = n(t);
        (l.push(s + r - r * o, r - r * d),
          e === 12 && !c ? u.push(0, 0) : u.push(o, d));
      }
      (c && (l.push(s, o), u.push(0, 0)),
        l.push(-s, o),
        u.push(0, 0),
        c && (l.push(-s, r), u.push(-1, 0)));
      for (let e = 11; e >= 1; e--) {
        let t = (a * e) / 12,
          o = i(t),
          c = n(t);
        (l.push(-s - r + r * o, r - r * c), u.push(-o, c));
      }
      let d = l.length / 2,
        f = Array(d).fill(0);
      f[0] = 1;
      let p = Array(d).fill(`wood`),
        m = c ? 13 : 12;
      p[m] = `metal`;
      let h = ht(l, Array(d).fill(0), f, t, e.skin ?? `woodSide`, `lip`, {
          edgeSkin: p,
          normals: u,
        }),
        g = [-t / 2, o, 0, t / 2, o, 0];
      return {
        prims: [
          h,
          { type: `tube`, path: g, radius: M, skin: `metal`, caps: !0 },
        ],
        rails: [{ kind: w.COPING, path: g, nx: 0, nz: -1, spine: !0 }],
      };
    }
    case `floor`: {
      let t = gt(e.w, e.d, -0.5, 0, e.skin ?? `concrete`, `none`, !1);
      return ((t.hidden = [1, 1, 0, 1]), { prims: [t], rails: [] });
    }
    case `quarter`: {
      let { r: t, h: n, deck: r, w: i } = e,
        o = n > t + 0.001,
        s = [0, 0, t + r, 0, t + r, n, t, n],
        c = [0, 1, 0, 0, 0, 0, 0, 0];
      o && (s.push(t, t), c.push(-1, 0));
      let l = [],
        u = [];
      _t(t, 12, a, 0, l, u);
      for (let e = 2; e < l.length - 2; e += 2)
        (s.push(l[e], l[e + 1]), c.push(u[e], u[e + 1]));
      let d = s.length / 2,
        f = Array(d).fill(0);
      f[0] = 1;
      let p = Array(d).fill(null);
      p[2] = `concrete`;
      for (let e = 3; e < d; e++) p[e] = `wood`;
      let m = ht(s, Array(d).fill(0), f, i, e.skin ?? `woodSide`, `lip`, {
          edgeSkin: p,
          normals: c,
        }),
        h = i / 2,
        g = t + r;
      return {
        prims: [
          m,
          {
            type: `tube`,
            path: [-h, n, t, h, n, t],
            radius: M,
            skin: `metal`,
            caps: !0,
          },
        ],
        rails: [
          { kind: w.COPING, path: [-h, n, t, h, n, t], nx: 0, nz: -1 },
          { kind: w.LEDGE, path: [h, n, g, -h, n, g], nx: 0, nz: 1 },
          { kind: w.LEDGE, path: [h, n, t, h, n, g], nx: 1, nz: 0 },
          { kind: w.LEDGE, path: [-h, n, g, -h, n, t], nx: -1, nz: 0 },
        ],
      };
    }
    case `kicker`: {
      let { len: t, h: n, w: r } = e,
        i = (t * t + n * n) / (2 * n),
        a = [0, 0, t, 0, t, n],
        o = [0, 1, 0, 0, 0, 0],
        s = [t, n];
      for (let e = 7; e >= 1; e--) {
        let n = (e / 8) * t,
          r = i - Math.sqrt(i * i - n * n);
        (a.push(n, r), o.push(-n / i, (i - r) / i), s.push(n, r));
      }
      s.push(0, 0);
      let c = a.length / 2,
        l = Array(c).fill(0);
      l[0] = 1;
      let u = Array(c).fill(null);
      for (let e = 2; e < c; e++) u[e] = `wood`;
      return {
        prims: [
          ht(a, Array(c).fill(0), l, r, e.skin ?? `woodSide`, `lip`, {
            edgeSkin: u,
            normals: o,
          }),
        ],
        rails: Tt(r, s),
      };
    }
    case `wedge`: {
      let { len: t, h: n, w: r } = e,
        i = {
          prims: [
            ht(
              [0, 0, t, 0, t, n],
              [0, 0, 0],
              [1, 0, 0],
              r,
              e.skin ?? `concrete`,
              `soft`,
            ),
          ],
          rails: Tt(r, [t, n, 0, 0]),
        };
      return (e.hubbas && St(i, Ct(r, 0, 0.5, t, n + 0.5, `concreteDark`)), i);
    }
    case `funbox`: {
      let { w: t, d: n, h: r, slope: i } = e,
        a = n / 2,
        o = ht(
          [-a - i, 0, a + i, 0, a, r, -a, r],
          [0, 0, 0, 0],
          [1, 0, 0, 0],
          t,
          e.skin ?? `concrete`,
          `soft`,
        ),
        s = t / 2,
        c = -a - i,
        l = a + i;
      return {
        prims: [o],
        rails: [
          {
            kind: w.LEDGE,
            path: [s, 0, c, s, r, -a, s, r, a, s, 0, l],
            nx: 1,
            nz: 0,
          },
          {
            kind: w.LEDGE,
            path: [-s, 0, l, -s, r, a, -s, r, -a, -s, 0, c],
            nx: -1,
            nz: 0,
          },
        ],
      };
    }
    case `ledge`:
      return {
        prims: [gt(e.w, e.d, 0, e.h, e.skin ?? `concrete`, `soft`)],
        rails: _(e.w, e.d, e.h, e.grind),
      };
    case `wall`:
      return {
        prims: [gt(e.w, e.d, 0, e.h, e.skin ?? `brick`, `soft`)],
        rails: _(e.w, e.d, e.h, e.grind),
      };
    case `box`: {
      let { w: t, d: n, h: r } = e,
        i = t / 2,
        a = n / 2,
        o =
          e.grind === `none`
            ? []
            : [
                ..._(t, n, r),
                { kind: w.LEDGE, path: [i, r, -a, i, r, a], nx: 1, nz: 0 },
                { kind: w.LEDGE, path: [-i, r, a, -i, r, -a], nx: -1, nz: 0 },
              ];
      return {
        prims: [gt(t, n, 0, r, e.skin ?? `concrete`, `pillow`)],
        rails: o,
      };
    }
    case `rail`: {
      let { len: t, h: n } = e,
        r = e.h2 ?? n,
        i = t / 2,
        a = [
          {
            type: `tube`,
            path: [-i, n, 0, i, r, 0],
            radius: D,
            skin: e.skin ?? `metal`,
            caps: !0,
          },
        ];
      if (e.hang) {
        for (let o of [0.15, 0.85]) {
          let s = -i + t * o,
            c = n + (r - n) * o;
          a.push({
            type: `tube`,
            path: [s, c + D, 0, s, c + e.hang, 0],
            radius: 0.02,
            skin: `metal`,
            caps: !1,
            hang: !0,
          });
        }
        return {
          prims: a,
          rails: [{ kind: w.RAIL, path: [-i, n, 0, i, r, 0], nx: 0, nz: 0 }],
        };
      }
      let o = Math.max(2, Math.round(t / 3) + 1);
      for (let e = 0; e < o; e++) {
        let s = 0.08 + 0.84 * (e / (o - 1)),
          c = -i + t * s,
          l = n + (r - n) * s;
        a.push({
          type: `tube`,
          path: [c, 0, 0, c, l - D, 0],
          radius: 0.035,
          skin: `metal`,
          caps: !1,
        });
      }
      return (
        a.push(O(-i, n, i, r)),
        {
          prims: a,
          rails: [{ kind: w.RAIL, path: [-i, n, 0, i, r, 0], nx: 0, nz: 0 }],
        }
      );
    }
    case `stairs`: {
      let { w: t, steps: n, rise: r, run: i, top: a } = e,
        o = n * r,
        s = n * i,
        c = e.skin ?? `concrete`,
        l = [
          ht(
            [-a, 0, s, 0, 0, o, -a, o],
            [0, 0, 0, 0],
            [1, 0, 0, 0],
            t,
            c,
            `none`,
            { render: !1 },
          ),
          {
            ...gt(t, a, 0, o, c, `soft`),
            profile: [-a, 0, 0, 0, 0, o, -a, o],
            collide: !1,
          },
        ];
      for (let e = 0; e < n - 1; e++) {
        let n = e * i,
          a = (e + 1) * i,
          s = o - (e + 1) * r;
        l.push({
          ...gt(t, i, 0, s, c, `soft`),
          profile: [n, 0, a, 0, a, s, n, s],
          collide: !1,
        });
      }
      let u = { prims: l, rails: [] };
      for (let t of e.rails ?? []) St(u, wt(t, -0.4, o + 0.9, s + 0.55, 0.55));
      return (e.hubbas && St(u, Ct(t, 0, o + 0.45, s, 0.5, c)), u);
    }
  }
}
