// assets__parkModel-DmiMeogd 06 — math
// Lines 1383-1641 of readable/assets__parkModel-DmiMeogd.pretty.js (statement-aligned).
function gt(e, t, n) {
  let r = e.hill === void 0 ? null : n.hills[e.hill],
    i = 2.1 * e.s,
    a = 3.4 * e.s,
    o = 1.4 * e.s,
    s = [
      `#FF6FA3`,
      `#FFC94D`,
      `#4FC9E8`,
      `#9B7BFF`,
      `#FF8F5A`,
      `#5FD39A`,
      `#FF6FA3`,
      `#FFC94D`,
    ],
    c = `TAILGRAB`,
    l = [...c].map((e) => ht[e][0].length),
    u = -(l.reduce((e, t) => e + t, 0) + 7) / 2,
    d = Math.cos(e.yaw),
    f = Math.sin(e.yaw);
  for (let [n, p] of [...c].entries()) {
    let c = ht[p],
      m = s[(n + e.seed) % s.length],
      h = (u + l[n] / 2) * i,
      g = e.x + h * d,
      _ = e.z - h * f,
      v = e.y + (r ? Math.max(0, y(r, g, _)) : 0) - 0.8 * e.s,
      b = ``,
      x = 0,
      S = (n, r, s) => {
        if (s)
          for (let l of s.split(`;`)) {
            let [s, p] = l.split(`,`).map(Number),
              h = (u + s) * i,
              g = (u + p + 1) * i,
              _ = (h + g) / 2,
              y = v + (c.length - r - 1) * a;
            t.box(
              e.x + _ * d,
              y,
              e.z - _ * f,
              g - h,
              (r - n + 1) * a,
              o,
              e.yaw,
              m,
              `#FFFFFF`,
              1,
            );
          }
      };
    (c.forEach((e, t) => {
      let n = [];
      for (let t = 0; t < e.length; t++) {
        if (e[t] !== `1`) continue;
        let r = t;
        for (; r + 1 < e.length && e[r + 1] === `1`;) r++;
        (n.push(`${t},${r}`), (t = r));
      }
      let r = n.join(`;`);
      if (t === 0) {
        ((b = r), (x = 0));
        return;
      }
      r !== b && (S(x, t - 1, b), (b = r), (x = t));
    }),
      S(x, c.length - 1, b),
      (u += l[n] + 1));
  }
  return { object: null, dispose() {} };
}
var _t = null;
function vt(e, n) {
  let r = e.s,
    i = 24 * r,
    a = e.y;
  n.box(e.x, a - 0.5, e.z, 9 * r, 4.2 * r, 7 * r, e.yaw, `#F4F1EA`, e.accent);
  for (let t = 0; t < 4; t++) {
    let o = t / 4,
      s = (t + 1) / 4;
    n.prism(
      e.x,
      e.z,
      a - 0.5 + o * i,
      a + s * i,
      3.2 * r - o * 1 * r,
      3.2 * r - s * 1 * r,
      8,
      t % 2 ? e.accent : `#FFFFFF`,
    );
  }
  (n.prism(
    e.x,
    e.z,
    a + i,
    a + i + 0.7 * r,
    3.1 * r,
    3.1 * r,
    8,
    `#3B2C4F`,
    `#E8E4F4`,
  ),
    n.prism(
      e.x,
      e.z,
      a + i + 0.7 * r,
      a + i + 3.6 * r,
      1.8 * r,
      1.8 * r,
      8,
      `#FFF3B0`,
      void 0,
      1,
    ),
    n.prism(
      e.x,
      e.z,
      a + i + 3.6 * r,
      a + i + 3.9 * r,
      2.2 * r,
      2.2 * r,
      8,
      e.accent,
      e.accent,
    ),
    n.cone(e.x, e.z, a + i + 3.9 * r, 2.4 * r, 2.2 * r, 8, e.accent),
    (_t ??= new t({
      color: `#FFE9B0`,
      vertexColors: !0,
      transparent: !0,
      depthWrite: !1,
      blending: 2,
      side: 2,
      forceSinglePass: !0,
      fog: !1,
    })));
  let o = new d(),
    s = [],
    l = [];
  for (let e of [150, -150])
    (s.push(0, 0, 0, e, -8, 0, e, 8, 0, 0, 0, 0, e, 0, -8, e, 0, 8),
      l.push(1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0));
  (o.setAttribute(`position`, new c(new Float32Array(s), 3)),
    o.setAttribute(`color`, new c(new Float32Array(l), 3)));
  let u = new p(o, _t);
  return (
    u.position.set(e.x, a + i + 2.2 * r, e.z),
    (u.name = `mark:lighthouse-beam`),
    (u.renderOrder = 2),
    {
      object: u,
      update: (e) => {
        let t = Math.max(0, O.uLamps.value - 0.6) / 0.4;
        ((u.visible = t > 0),
          (_t.opacity = 0.35 * t),
          u.rotation.set(0, e * 0.5, 0));
      },
      dispose() {
        o.dispose();
      },
    }
  );
}
function yt(e, t, n) {
  let r = H();
  (r.box(0, -0.6, 0, 8, 1.8, 3, 0, `#FFFFFF`, `#E9E4F2`),
    r.box(-1, 1.2, 0, 3, 1.4, 2.2, 0, `#FFFFFF`, `#FFFFFF`),
    r.beam([1, 1.2, 0], [1, 10, 0], 0.3, `#8A7A9A`),
    r.tri([1.2, 1.8, 0], [1.2, 9.6, 0], [5.4, 1.8, 0], `#FFFFFF`, [1.2, 3, -1]),
    r.tri([1.2, 1.8, 0], [1.2, 9.6, 0], [5.4, 1.8, 0], `#FFFFFF`, [1.2, 3, 1]));
  let i = e.pts ?? [],
    a = Ze(r, Math.max(1, i.length), `mark:boats`),
    o = [`#FFD1E0`, `#FFF1B8`, `#CFEFFF`, `#E2D6FF`, `#FFE0C8`];
  i.forEach((t, n) => a.setColorAt(n, nt.set(o[(e.seed + n) % o.length])));
  let s = n.sea,
    c = s
      ? (() => {
          let e = D(t, s),
            n = e.at(0, 100),
            r = e.at(100, 100);
          return new m(r.x - n.x, 0, r.z - n.z).normalize();
        })()
      : new m(1, 0, 0),
    l = Math.atan2(c.x, c.z) - Math.PI / 2,
    u = (t, n) => {
      ((a.count = n ? Math.min(2, i.length) : i.length),
        i.forEach((n, r) => {
          let i = r * 1.9 + (e.seed % 13),
            o = Math.sin(t * 0.02 + i) * 30;
          (et.set(
            n.x + c.x * o,
            n.y + Math.sin(t * 0.9 + i) * 0.18,
            n.z + c.z * o,
          ),
            $e.setFromAxisAngle(
              it,
              l + (Math.cos(t * 0.02 + i) > 0 ? 0 : Math.PI),
            ),
            U.setFromAxisAngle(rt, Math.sin(t * 0.7 + i) * 0.05),
            a.setMatrixAt(
              r,
              Qe.compose(et, $e.multiply(U), tt.setScalar(n.s)),
            ));
        }),
        (a.instanceMatrix.needsUpdate = !0));
    };
  return (
    u(0, !1),
    {
      object: a,
      update: u,
      dispose() {
        a.geometry.dispose();
      },
    }
  );
}
function bt(e, t, n, r) {
  switch (e.kind) {
    case `ferris`:
      return st(e, t);
    case `turbines`:
      return ct(e, t, n);
    case `mast`:
      return ut(e, t);
    case `balloons`:
      return pt(e);
    case `blimp`:
      return mt(e, n);
    case `sign`:
      return gt(e, t, r);
    case `lighthouse`:
      return vt(e, t);
    case `boats`:
      return yt(e, n, r);
  }
}
var W = Math.PI / 180,
  xt = (e, t, n) => e + (t - e) * n,
  G = (e) => Math.max(0, Math.min(1, e)),
  St = (e) => e * e * (3 - 2 * e),
  K = (e, t, n) => t + (n - t) * e(),
  q = (e, t) => t[Math.floor(e() * t.length) % t.length];
function Ct(e, t) {
  let n = t.map(([t]) => Array.from({ length: t }, () => e())),
    r = t.reduce((e, [, t]) => e + t, 0);
  return (e) => {
    let i = 0;
    return (
      t.forEach(([t, r], a) => {
        let o = ((((e / 360) * t) % t) + t) % t,
          s = Math.floor(o),
          c = n[a];
        i += r * xt(c[s], c[(s + 1) % t], St(o - s));
      }),
      i / r
    );
  };
}
