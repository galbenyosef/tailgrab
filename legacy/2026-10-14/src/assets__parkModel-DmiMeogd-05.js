// assets__parkModel-DmiMeogd 05 — math
// Lines 1038-1382 of readable/assets__parkModel-DmiMeogd.pretty.js (statement-aligned).
function st(e, t) {
  let n = e.s,
    r = 24 * n,
    a = r + 5 * n,
    o = 3.2 * n,
    s = Ye(e.x, e.y, e.z, e.yaw);
  t.box(
    e.x,
    e.y,
    e.z,
    16 * n,
    1.4 * n,
    11 * n,
    e.yaw,
    T(e.accent, 0.9),
    e.accent,
  );
  for (let r of [-o, o])
    (t.beam(s(-10 * n, 0, r * 1.25), s(0, a, r), 1.3 * n, e.col),
      t.beam(s(10 * n, 0, r * 1.25), s(0, a, r), 1.3 * n, e.col));
  t.beam(
    s(0, a, -o - 1.2 * n),
    s(0, a, o + 1.2 * n),
    1.6 * n,
    T(e.accent, 0.85),
  );
  let c = new i();
  (c.position.set(...s(0, a, 0)), (c.rotation.y = e.yaw));
  let l = new i();
  c.add(l);
  let u = H(),
    d = (e, t) => {
      let n = (e / 24) * Math.PI * 2;
      return [Math.cos(n) * r, Math.sin(n) * r, t];
    };
  for (let t of [-o * 0.8, o * 0.8]) {
    for (let r = 0; r < 24; r++)
      u.beam(d(r, t), d(r + 1, t), 0.9 * n, e.col, 1);
    for (let r = 0; r < 12; r++)
      u.beam([0, 0, t], d(r * 2, t), 0.45 * n, T(e.col, 0.92));
  }
  for (let t = 0; t < 12; t++)
    u.beam(d(t * 2, -o * 0.8), d(t * 2, o * 0.8), 0.5 * n, e.accent);
  l.add(Xe(u, `mark:ferris-wheel`));
  let f = H();
  (f.box(0, -3.4 * n, 0, 3.2 * n, 3.2 * n, 2.6 * n, 0, `#FFFFFF`, `#FFFFFF`),
    f.beam([0, -0.2 * n, 0], [0, 0, 0], 0.3 * n, `#FFFFFF`));
  let p = Ze(f, 12, `mark:ferris-cabins`),
    m = [`#FF8FB8`, `#FFD970`, `#8FDDF5`, `#B6A0FF`, `#FFB27A`, `#8FE3B4`];
  for (let e = 0; e < 12; e++) p.setColorAt(e, nt.set(m[e % m.length]));
  c.add(p);
  let h = 0.05 + (e.seed % 100) / 4e3,
    g = (e) => {
      let t = e * h;
      l.rotation.z = t;
      for (let e = 0; e < 12; e++) {
        let n = t + (e / 12) * Math.PI * 2;
        p.setMatrixAt(
          e,
          Qe.makeTranslation(Math.cos(n) * r, Math.sin(n) * r, 0),
        );
      }
      p.instanceMatrix.needsUpdate = !0;
    };
  return (
    g(0),
    {
      object: c,
      update: (e) => g(e),
      dispose() {
        c.traverse((e) => {
          e.isMesh && e.geometry.dispose();
        });
      },
    }
  );
}
function ct(e, t, n) {
  let r = e.pts ?? [],
    i = [];
  for (let [a, o] of r.entries()) {
    let r = 46 * o.s,
      s = Math.atan2(n.cx - o.x, n.cz - o.z);
    t.prism(
      o.x,
      o.z,
      o.y - 0.5,
      o.y + r,
      1.7 * o.s,
      0.9 * o.s,
      6,
      `#FFFFFF`,
      `#FFFFFF`,
    );
    let c = Ye(o.x, o.y + r, o.z, s),
      l = c(0, 0, -2.2 * o.s);
    (t.box(
      l[0],
      l[1] - 1.2 * o.s,
      l[2],
      2.6 * o.s,
      2.6 * o.s,
      5 * o.s,
      s,
      `#F2F4FB`,
      `#FFFFFF`,
    ),
      i.push({
        p: new m(...c(0, 0.1 * o.s, 0.6 * o.s)),
        yaw: s,
        s: o.s,
        w: 0.9 + ((e.seed >> a) % 7) / 14,
        ph: a * 1.7,
      }));
  }
  let a = H();
  for (let e = 0; e < 3; e++) {
    let t = (e / 3) * Math.PI * 2;
    a.beam([0, 0, 0], [Math.cos(t) * 21, Math.sin(t) * 21, 0], 1.1, `#FFFFFF`);
  }
  a.box(0, -1, 0, 2, 2, 2, 0, e.accent, e.accent);
  let o = Ze(a, Math.max(1, i.length), `mark:rotors`);
  o.count = i.length;
  let s = (e) => {
    (i.forEach((t, n) => {
      (ot.setFromAxisAngle(it, t.yaw),
        U.setFromAxisAngle(at, e * t.w + t.ph),
        o.setMatrixAt(
          n,
          Qe.compose(t.p, $e.copy(ot).multiply(U), tt.setScalar(t.s)),
        ));
    }),
      (o.instanceMatrix.needsUpdate = !0));
  };
  return (
    s(0),
    {
      object: o,
      update: (e) => s(e),
      dispose() {
        o.geometry.dispose();
      },
    }
  );
}
var lt = null;
function ut(e, n) {
  let r = 95 * e.s;
  for (let t = 0; t < 6; t++) {
    let i = t / 6,
      a = (t + 1) / 6;
    n.prism(
      e.x,
      e.z,
      e.y - 0.5 + i * r,
      e.y + a * r,
      4 * e.s * (1 - i * 0.72),
      4 * e.s * (1 - a * 0.72),
      4,
      t % 2 ? `#FFFFFF` : e.accent,
      void 0,
      0,
      Math.PI / 4,
    );
  }
  (n.beam(
    [e.x, e.y + r, e.z],
    [e.x, e.y + r + 10 * e.s, e.z],
    0.5 * e.s,
    `#FFFFFF`,
  ),
    (lt ??= new t({ color: `#FF3B4E`, fog: !1 })));
  let i = new z(0),
    a = 1.6 * e.s,
    o = [
      [a, 0, 0],
      [0, 0, a],
      [-a, 0, 0],
      [0, 0, -a],
    ];
  for (let e = 0; e < 4; e++)
    (i.tri(o[e], o[(e + 1) % 4], [0, a, 0], `#FFFFFF`, [0, 0, 0]),
      i.tri(o[e], o[(e + 1) % 4], [0, -a, 0], `#FFFFFF`, [0, 0, 0]));
  let s = new p(i.build(!1), lt);
  (s.position.set(e.x, e.y + r + 10 * e.s, e.z), (s.name = `mark:mast-light`));
  let c = (e.seed % 1e3) / 1e3;
  return {
    object: s,
    update: (e) => {
      s.visible = (e * 0.75 + c) % 1 < 0.35;
    },
    dispose() {
      s.geometry.dispose();
    },
  };
}
var dt = [
    [0.7, 0],
    [2.8, 1.3],
    [6.2, 5.2],
    [7.4, 9],
    [6.8, 12.4],
    [4.6, 14.8],
    [0.01, 16],
  ],
  ft = [
    [`#FF7FAE`, `#FFFFFF`],
    [`#FFD35C`, `#FF8F6B`],
    [`#7FD8F2`, `#FFFFFF`],
    [`#A98BFF`, `#FFE08A`],
    [`#7FE0B0`, `#FFFFFF`],
    [`#FF9F5A`, `#FFE9A8`],
  ];
function pt(e) {
  let t = new i(),
    n = [];
  (e.pts ?? []).forEach((r, i) => {
    let a = H(),
      [o, s] = ft[(e.seed + i * 3) % ft.length],
      c = r.s,
      l = (e, t) => {
        let [n, r] = dt[e],
          i = (t / 10) * Math.PI * 2;
        return [Math.cos(i) * n * c, r * c, Math.sin(i) * n * c];
      };
    for (let e = 0; e < dt.length - 1; e++)
      for (let t = 0; t < 10; t++)
        a.quad(
          l(e, t),
          l(e, t + 1),
          l(e + 1, t + 1),
          l(e + 1, t),
          t % 2 ? o : s,
          [0, 8 * c, 0],
        );
    a.box(0, -4.4 * c, 0, 2.4 * c, 1.8 * c, 2.4 * c, 0, `#C98A5A`, `#B27448`);
    for (let [e, t] of [
      [1, 1],
      [-1, 1],
      [-1, -1],
      [1, -1],
    ])
      a.beam(
        [e * 1.1 * c, -2.6 * c, t * 1.1 * c],
        [e * 0.6 * c, 0, t * 0.6 * c],
        0.12 * c,
        `#8A6A5A`,
      );
    let u = Xe(a, `mark:balloon`);
    (t.add(u),
      n.push({
        mesh: u,
        base: new m(r.x, r.y, r.z),
        ph: i * 2.1 + (e.seed % 17),
        r: 10 + ((i * 7) % 9),
      }));
  });
  let r = (e, t) => {
    n.forEach((n, r) => {
      n.mesh.visible = !t || r < 2;
      let i = e * 0.05 + n.ph;
      (n.mesh.position.set(
        n.base.x + Math.cos(i) * n.r,
        n.base.y + Math.sin(e * 0.35 + n.ph) * 2.4,
        n.base.z + Math.sin(i) * n.r,
      ),
        (n.mesh.rotation.y = e * 0.03 + n.ph));
    });
  };
  return (
    r(0, !1),
    {
      object: t,
      update: r,
      dispose() {
        for (let e of n) e.mesh.geometry.dispose();
      },
    }
  );
}
function mt(e, t) {
  let n = H(),
    r = 6.6,
    i = (e, t) => {
      let n = -22 + (44 * e) / 8,
        i = r * Math.sqrt(Math.max(0.004, 1 - (n / 22) ** 2)),
        a = (t / 10) * Math.PI * 2;
      return [n, Math.cos(a) * i, Math.sin(a) * i];
    };
  for (let t = 0; t < 8; t++) {
    let r = t === 3 || t === 4;
    for (let a = 0; a < 10; a++)
      n.quad(
        i(t, a),
        i(t, a + 1),
        i(t + 1, a + 1),
        i(t + 1, a),
        r ? e.accent : e.col,
        [0, 0, 0],
      );
  }
  for (let [t, i] of [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ]) {
    let a = [-20.9, t * r * 1.1, i * r * 1.1];
    n.beam([-13.64, t * r * 0.35, i * r * 0.35], a, 1.6, e.accent);
  }
  n.box(0, -8.2, 0, 8, 1.8, 2.6, 0, `#F4F4FA`, e.accent);
  let a = Xe(n, `mark:blimp`),
    o = e.orbit ?? 300,
    s = e.alt ?? 90,
    c = Math.atan2(e.x - t.cx, e.z - t.cz),
    l = 5.5 / o,
    u = (e) => {
      let n = c + e * l;
      (a.position.set(
        t.cx + Math.sin(n) * o,
        t.floorY + s + Math.sin(e * 0.2) * 1.5,
        t.cz + Math.cos(n) * o,
      ),
        a.rotation.set(0, n, Math.sin(e * 0.3) * 0.03));
    };
  return (
    u(0),
    {
      object: a,
      update: (e) => u(e),
      dispose() {
        a.geometry.dispose();
      },
    }
  );
}
var ht = {
  T: [`11111`, `00100`, `00100`, `00100`, `00100`, `00100`, `00100`],
  A: [`01110`, `10001`, `10001`, `11111`, `10001`, `10001`, `10001`],
  I: [`111`, `010`, `010`, `010`, `010`, `010`, `111`],
  L: [`10000`, `10000`, `10000`, `10000`, `10000`, `10000`, `11111`],
  G: [`01110`, `10001`, `10000`, `10111`, `10001`, `10001`, `01111`],
  R: [`11110`, `10001`, `10001`, `11110`, `10100`, `10010`, `10001`],
  B: [`11110`, `10001`, `10001`, `11110`, `10001`, `10001`, `11110`],
};
