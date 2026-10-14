// assets/preload-helper-DR1MrGPZ 16 — push
// Lines 5003-5324 of readable/assets/preload-helper-DR1MrGPZ.pretty.js (statement-aligned).
function nr(e, t, n) {
  let r = t - e.f.x,
    i = n - e.f.z;
  return (
    ce(e.c, r * e.cs - i * e.sn, r * e.sn + i * e.cs).d <
    e.f.w / 2 + (e.f.walk ?? 0) + 0.4
  );
}
function checkMeshTris(e, t, n, r, i, a, o) {
  let s = 0,
    c = new Map();
  for (let r = 0; r < n.length; r += 3) {
    let i = n[r],
      a = n[r + 1],
      o = n[r + 2],
      l =
        (t[a * 2] - t[i * 2]) * (t[o * 2 + 1] - t[i * 2 + 1]) -
        (t[a * 2 + 1] - t[i * 2 + 1]) * (t[o * 2] - t[i * 2]);
    if (Math.abs(l) < 1e-12)
      throw Error(
        `${e}: a degenerate triangle at (${t[i * 2].toFixed(2)}, ${t[i * 2 + 1].toFixed(2)})`,
      );
    s += Math.abs(l) / 2;
    for (let [e, t] of [
      [i, a],
      [a, o],
      [o, i],
    ]) {
      let n = e < t ? `${e},${t}` : `${t},${e}`;
      c.set(n, (c.get(n) ?? 0) + 1);
    }
  }
  let l = (i.x1 - i.x0) * (i.z1 - i.z0);
  for (let e of a) l -= (e.x1 - e.x0) * (e.z1 - e.z0);
  for (let e of o) {
    let t = 0,
      n = e.pts.length / 3;
    for (let r = 0, i = n - 1; r < n; i = r++)
      t += e.pts[i * 3] * e.pts[r * 3 + 2] - e.pts[r * 3] * e.pts[i * 3 + 2];
    l -= Math.abs(t) / 2;
  }
  if (Math.abs(s - l) > 1e-6 * l)
    throw Error(
      `${e}: the mesh covers ${s.toFixed(3)} m², not ${l.toFixed(3)} (a gap or an overlap)`,
    );
  for (let [t, n] of c) {
    if (n > 2) throw Error(`${e}: edge ${t} is shared by ${n} triangles`);
    if (n === 1 && !r.has(t))
      throw Error(`${e}: an open edge inside the ground (${t})`);
  }
  for (let t of r)
    if (c.get(t) !== 1)
      throw Error(`${e}: boundary edge ${t} isn't the mesh's edge`);
}
var ir = -0.04,
  ar = 8;
function or(e) {
  let t = e.half;
  return e.bounds ?? { x0: -t, x1: t, z0: -t, z1: t };
}
var sr = 0.05,
  cr = 0.05,
  lr = new WeakMap();
function ur(e, t) {
  if (t.kind !== `terrain`) return Kr(e) ? Xr(t) : pieceDefaults(t);
  let r = lr.get(e.pieces);
  if (!r) {
    let t = checkSingleTerrain(e),
      a = [];
    for (let t of e.pieces) {
      let e = t.kind === `terrain` ? void 0 : pieceDefaults(t).holeLoop;
      if (!e) continue;
      let r = n(t.rot ?? 0),
        o = i(t.rot ?? 0),
        s = [],
        c = [];
      for (let n = 0; n < e.pts.length; n += 3) {
        s.push(...dr(t, r, o, e.pts[n], e.pts[n + 1], e.pts[n + 2]));
        let i = e.nrm[n],
          a = e.nrm[n + 1],
          l = e.nrm[n + 2];
        c.push(i * r + l * o, a, -i * o + l * r);
      }
      a.push({ pts: s, nrm: c });
    }
    let o = tr(t, a);
    lr.set(e.pieces, (r = { prims: o.prims, rails: o.rails }));
  }
  return r;
}
function dr(e, t, n, r, i, a) {
  let o = e.x,
    s = e.y ?? 0,
    c = e.z;
  return [o + r * t + a * n, s + i, c - r * n + a * t];
}
function checkFloorHole(e) {
  let t = [];
  for (let r of e.pieces) {
    let o = ur(e, r).hole;
    if (!o) continue;
    let s = r.rot ?? 0,
      c = Math.round(s / a);
    if (Math.abs(s - c * 1.5707963267948966) > 1e-9)
      throw Error(`piece ${r.id}: a floor hole needs a quarter-turn rot`);
    let l = n(s),
      u = i(s),
      d = [],
      f = [];
    for (let [e, t] of [
      [o.x0, o.z0],
      [o.x1, o.z1],
    ])
      (d.push(r.x + e * l + t * u), f.push(r.z - e * u + t * l));
    t.push({
      piece: r.id,
      rect: {
        x0: Math.min(...d),
        x1: Math.max(...d),
        z0: Math.min(...f),
        z1: Math.max(...f),
      },
      y: r.y ?? 0,
    });
  }
  return t;
}
var pr = (e, t) => Math.abs((e.y ?? 0) - t) < 0.05;
function mr(e, t) {
  let n = new y(),
    r = e.x - e.w / 2,
    i = e.x + e.w / 2,
    a = e.z - e.d / 2,
    o = e.z + e.d / 2,
    s = t
      .filter((t) => pr(e, t.y))
      .map((e) => e.rect)
      .filter((e) => e.x0 < i && e.x1 > r && e.z0 < o && e.z1 > a)
      .map((t) => ({
        x0: t.x0 - e.x + sr,
        x1: t.x1 - e.x - sr,
        z0: t.z0 - e.z + sr,
        z1: t.z1 - e.z - sr,
      }));
  return (
    b(
      n,
      { x0: -e.w / 2, x1: e.w / 2, z0: -e.d / 2, z1: e.d / 2 },
      s,
      0,
      e.skin ?? `concrete`,
    ),
    n.prim(`none`)
  );
}
function checkFloorMesh(e) {
  let t = checkFloorHole(e),
    r = e.pieces.filter((e) => e.kind === `floor`),
    a = (e, t) =>
      (
        r.find(
          (n) => Math.abs(e - n.x) <= n.w / 2 && Math.abs(t - n.z) <= n.d / 2,
        ) ?? r[0]
      )?.id ?? 0,
    o = [];
  for (let r of e.pieces) {
    let s = r.rot ?? 0,
      c = n(s),
      l = i(s);
    if (r.kind === `floor` && t.length) {
      if (s !== 0) throw Error(`floor ${r.id}: holes need an unrotated floor`);
      o.push({ piece: r, prim: mr(r, t), cos: 1, sin: 0, id: r.id });
      continue;
    }
    for (let t of ur(e, r).prims) {
      let e = t.type === `mesh` && t.floorLike ? a(r.x, r.z) : r.id;
      o.push({ piece: r, prim: t, cos: c, sin: l, id: e });
    }
  }
  if (checkSingleTerrain(e))
    for (let e of r) {
      if (e.kind !== `floor`) continue;
      let t = new y(),
        n = e.w / 2 + cr,
        r = e.d / 2 + cr;
      (t.quad(
        t.v(-n, 0, -r, 0, 1, 0),
        t.v(n, 0, -r, 0, 1, 0),
        t.v(n, 0, r, 0, 1, 0),
        t.v(-n, 0, r, 0, 1, 0),
        e.skin ?? `concrete`,
      ),
        o.push({
          piece: e,
          prim: t.prim(`none`, { render: !1 }),
          cos: 1,
          sin: 0,
          id: e.id,
        }));
    }
  return o;
}
function gr(e) {
  let t = [],
    n = [],
    r = [],
    i = [],
    a = [];
  for (let { piece: o, prim: s, cos: c, sin: l, id: u } of checkFloorMesh(e))
    s.type !== `tube` &&
      s.collide &&
      (s.type === `extrude`
        ? vr(s, o, c, l, t, n, r, i, a)
        : _r(s, o, u, c, l, t, n, r, i, a));
  return {
    positions: new Float32Array(t),
    normals: new Float32Array(n),
    pieces: new Uint16Array(r),
    indices: new Uint32Array(a),
    surf: new Uint8Array(i),
  };
}
function _r(e, t, n, r, i, a, s, c, l, u) {
  let d = a.length / 3,
    f = e.pos,
    p = e.nrm,
    m = e.rail ? o.RAIL : 0;
  for (let e = 0; e < f.length; e += 3)
    (a.push(...dr(t, r, i, f[e], f[e + 1], f[e + 2])),
      s.push(p[e] * r + p[e + 2] * i, p[e + 1], -p[e] * i + p[e + 2] * r),
      c.push(n),
      l.push(m));
  for (let t of e.tris) u.push(d + t);
}
function vr(e, t, n, r, i, a, s, c, l) {
  let u = t.x,
    d = t.y ?? 0,
    f = t.z,
    p = t.id,
    m = e.loose ? o.LOOSE : 0,
    h = (e, t, o, l, h, g) => {
      let _ = i.length / 3;
      return (
        i.push(u + e * n + o * r, d + t, f - e * r + o * n),
        a.push(l * n + g * r, h, -l * r + g * n),
        s.push(p),
        c.push(m),
        _
      );
    },
    g = e.profile,
    _ = g.length / 2,
    v = [],
    y = [];
  for (let e = 0; e < _; e++) {
    let t = (e + 1) % _,
      n = g[t * 2] - g[e * 2],
      r = g[t * 2 + 1] - g[e * 2 + 1],
      i = Math.sqrt(n * n + r * r) || 1;
    (v.push(r / i), y.push(-n / i));
  }
  let b = (t, n) => {
    let r = e.normals;
    if (r && (r[t * 2] !== 0 || r[t * 2 + 1] !== 0))
      return [r[t * 2], r[t * 2 + 1]];
    if (e.smooth[t]) {
      let e = (t - 1 + _) % _,
        n = v[e] + v[t],
        r = y[e] + y[t],
        i = Math.sqrt(n * n + r * r) || 1;
      return ((n /= i), (r /= i), [n, r]);
    }
    return [v[n], y[n]];
  };
  for (let t = 0; t < _; t++) {
    if (e.hidden[t]) continue;
    let n = (t + 1) % _,
      [r, i] = b(t, t),
      [a, o] = b(n, t),
      s = h(e.x0, g[t * 2 + 1], g[t * 2], 0, i, r),
      c = h(e.x1, g[t * 2 + 1], g[t * 2], 0, i, r),
      u = h(e.x1, g[n * 2 + 1], g[n * 2], 0, o, a),
      d = h(e.x0, g[n * 2 + 1], g[n * 2], 0, o, a);
    l.push(s, c, u, s, u, d);
  }
  let x = L(g);
  for (let t of [0, 1]) {
    let n = t ? e.x1 : e.x0,
      r = t ? 1 : -1,
      a = i.length / 3;
    for (let e = 0; e < _; e++) h(n, g[e * 2 + 1], g[e * 2], r, 0, 0);
    for (let e = 0; e < x.length; e += 3)
      t
        ? l.push(a + x[e], a + x[e + 2], a + x[e + 1])
        : l.push(a + x[e], a + x[e + 1], a + x[e + 2]);
  }
}
function yr(e, t = new s(gr(e))) {
  let n = jr(Mr(e), t);
  return (Br(n), Pr(n), n);
}
var br = 0.2,
  xr = 0.3,
  Sr = 0.15,
  Cr = 0.25,
  wr = 0.3,
  Tr = 0.05,
  Er = { x: 0, z: 0 },
  Dr = (e, t) => t > 0.2,
  Or = (e, t) => t < 0.5 && t > -0.5;
function kr(e, t, n) {
  Ee(t, n, Er);
  let r = Er.x,
    i = Er.z,
    a = t.ax + t.tx * n,
    o = t.ay + t.ty * n,
    s = t.az + t.tz * n;
  return !(
    e.probeNearest(a + r * br, o + xr, s + i * br, 0, -1, 0, 0.35, Dr) ||
    e.probeNearest(a - r * 0.05, o + Sr, s - i * 0.05, r, 0, i, 0.25, Or)
  );
}
