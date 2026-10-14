// assets/preload-helper-DR1MrGPZ 17 — math
// Lines 5325-5670 of readable/assets/preload-helper-DR1MrGPZ.pretty.js (statement-aligned).
function Ar(e, t) {
  if (
    t.nax * t.nax + t.naz * t.naz < 0.25 ||
    t.nbx * t.nbx + t.nbz * t.nbz < 0.25
  )
    return [0, t.len];
  let n = Math.max(2, Math.ceil(t.len / Cr) + 1),
    r = [],
    i = 0,
    a = kr(e, t, 0),
    o = a ? 0 : -1;
  for (let s = 1; s < n; s++) {
    let c = s === n - 1 ? t.len : (t.len * s) / (n - 1),
      l = kr(e, t, c);
    if (l !== a) {
      let n = i,
        s = c;
      for (let r = 0; r < 7; r++) {
        let r = (n + s) / 2;
        kr(e, t, r) === a ? (n = r) : (s = r);
      }
      let u = (n + s) / 2;
      l ? (o = u) : (r.push(o, u), (o = -1));
    }
    ((i = c), (a = l));
  }
  o >= 0 && r.push(o, t.len);
  let s = [];
  for (let e = 0; e < r.length; e += 2) {
    let n = r[e] < Tr ? 0 : r[e],
      i = r[e + 1] > t.len - Tr ? t.len : r[e + 1];
    ((n === 0 && i === t.len) || i - n >= wr) && s.push(n, i);
  }
  return s;
}
function jr(e, t, n) {
  let r = [],
    i = Array(e.length).fill(-1),
    a = Array(e.length).fill(-1),
    o = [];
  for (let s of e) {
    let e = n?.[s.id] ?? Ar(t, s);
    for (let t = 0; t < e.length; t += 2) {
      let n = e[t],
        c = e[t + 1],
        l = r.length;
      if (
        (n === 0 && (i[s.id] = l),
        c === s.len && (a[s.id] = l),
        o.push(s),
        n === 0 && c === s.len)
      ) {
        r.push({ ...s, id: l, prev: -1, next: -1 });
        continue;
      }
      let u = Ee(s, n, { x: 0, z: 0 }),
        d = Ee(s, c, { x: 0, z: 0 }),
        f = u.x + d.x,
        p = u.z + d.z,
        m = Math.sqrt(f * f + p * p);
      (m > 1e-9 && ((f /= m), (p /= m)),
        r.push({
          ...s,
          id: l,
          ax: Fr(s.ax + s.tx * n),
          ay: Fr(s.ay + s.ty * n),
          az: Fr(s.az + s.tz * n),
          bx: Fr(s.ax + s.tx * c),
          by: Fr(s.ay + s.ty * c),
          bz: Fr(s.az + s.tz * c),
          len: Fr(c - n),
          nx: Fr(f),
          nz: Fr(p),
          nax: Fr(u.x),
          naz: Fr(u.z),
          nbx: Fr(d.x),
          nbz: Fr(d.z),
          prev: -1,
          next: -1,
        }));
    }
  }
  for (let e of r) {
    let t = o[e.id];
    (i[t.id] === e.id && t.prev >= 0 && a[t.prev] >= 0 && (e.prev = a[t.prev]),
      a[t.id] === e.id &&
        t.next >= 0 &&
        i[t.next] >= 0 &&
        (e.next = i[t.next]));
  }
  return r;
}
function Mr(e) {
  let t = [];
  for (let n of e.pieces) Nr(e, n, t);
  return t;
}
function Nr(e, t, r) {
  let a = t.rot ?? 0,
    o = n(a),
    s = i(a),
    c = t.x,
    l = t.y ?? 0,
    u = t.z;
  for (let n of ur(e, t).rails) {
    let e = n.path,
      i = e.length / 3,
      a = r.length,
      d = n.closed ? i : i - 1,
      f = (t) => c + e[t * 3] * o + e[t * 3 + 2] * s,
      p = (t) => u - e[t * 3] * s + e[t * 3 + 2] * o,
      m = (e) => (n.ns ? n.ns[e * 2] : n.nx),
      h = (e) => (n.ns ? n.ns[e * 2 + 1] : n.nz);
    for (let c = 0; c < d; c++) {
      let u = c,
        d = (c + 1) % i,
        g = f(u),
        _ = l + e[u * 3 + 1],
        v = p(u),
        y = f(d),
        b = l + e[d * 3 + 1],
        x = p(d),
        S = y - g,
        C = b - _,
        w = x - v,
        T = Math.sqrt(S * S + C * C + w * w),
        E = m(u) * o + h(u) * s,
        D = -m(u) * s + h(u) * o,
        O = m(d) * o + h(d) * s,
        k = -m(d) * s + h(d) * o,
        A = E + O,
        j = D + k,
        M = Math.sqrt(A * A + j * j);
      M > 1e-9 && ((A /= M), (j /= M));
      let N = r.length;
      (r.push({
        id: N,
        kind: n.kind,
        ax: Fr(g),
        ay: Fr(_),
        az: Fr(v),
        bx: Fr(y),
        by: Fr(b),
        bz: Fr(x),
        tx: Fr(S / T),
        ty: Fr(C / T),
        tz: Fr(w / T),
        len: Fr(T),
        nx: Fr(A),
        nz: Fr(j),
        nax: Fr(E),
        naz: Fr(D),
        nbx: Fr(O),
        nbz: Fr(k),
        flags: (n.spine ? Te.SPINE : 0) | (n.launch ? Te.LAUNCH : 0),
        prev: N > a ? N - 1 : -1,
        next: -1,
        chain: -1,
        piece: t.id,
      }),
        N > a && (r[N - 1].next = N));
    }
    n.closed &&
      r.length > a + 1 &&
      ((r[r.length - 1].next = a), (r[a].prev = r.length - 1));
  }
}
function Pr(e) {
  let t = 0,
    n = [];
  for (let r of e)
    if (!(r.chain >= 0)) {
      for (r.chain = t, n.push(r.id); n.length;) {
        let r = e[n.pop()];
        for (let i of [r.prev, r.next])
          i >= 0 && e[i].chain < 0 && ((e[i].chain = t), n.push(i));
      }
      t++;
    }
}
var Fr = Math.fround,
  SpatialIndex = class {
    cells = new Map();
    constructor(e, t) {
      for (let n of e) {
        let e = Lr(Math.floor(t ? n.bx : n.ax), Math.floor(t ? n.bz : n.az)),
          r = this.cells.get(e);
        r ? r.push(n.id) : this.cells.set(e, [n.id]);
      }
    }
    near(e, t) {
      let n = Math.floor(e),
        r = Math.floor(t),
        i = [];
      for (let e = -1; e <= 1; e++)
        for (let t = -1; t <= 1; t++) {
          let a = this.cells.get(Lr(n + e, r + t));
          a && i.push(...a);
        }
      return i.sort((e, t) => e - t);
    }
  },
  Lr = (e, t) => (e + 32768) * 65536 + (t + 32768),
  Rr = 0.03,
  zr = l;
function Br(e) {
  let t = Rr * Rr,
    n = zr,
    r = new SpatialIndex(e, !1),
    i = new SpatialIndex(e, !0);
  for (let i of e)
    if (!(i.next >= 0))
      for (let a of r.near(i.bx, i.bz)) {
        let r = e[a];
        if (r === i || r.prev >= 0) continue;
        let o = r.ax - i.bx,
          s = r.ay - i.by,
          c = r.az - i.bz;
        if (
          !(o * o + s * s + c * c > t) &&
          !(i.tx * r.tx + i.ty * r.ty + i.tz * r.tz < n)
        ) {
          ((i.next = r.id), (r.prev = i.id));
          break;
        }
      }
  for (let a of e) {
    if (a.next < 0)
      for (let r of i.near(a.bx, a.bz)) {
        let i = e[r];
        if (i === a || i.next >= 0) continue;
        let o = i.bx - a.bx,
          s = i.by - a.by,
          c = i.bz - a.bz;
        if (
          !(o * o + s * s + c * c > t) &&
          !(-(a.tx * i.tx + a.ty * i.ty + a.tz * i.tz) < n)
        ) {
          ((a.next = i.id), (i.next = a.id));
          break;
        }
      }
    if (a.prev < 0)
      for (let i of r.near(a.ax, a.az)) {
        let r = e[i];
        if (r === a || r.prev >= 0) continue;
        let o = r.ax - a.ax,
          s = r.ay - a.ay,
          c = r.az - a.az;
        if (
          !(o * o + s * s + c * c > t) &&
          !(-(a.tx * r.tx + a.ty * r.ty + a.tz * r.tz) < n)
        ) {
          ((a.prev = r.id), (r.prev = a.id));
          break;
        }
      }
  }
}
function Vr(e) {
  let t = new Map();
  for (let n of e.pieces) t.set(n.id, n);
  let n = Kr(e) ? ni(e) : null,
    r = n ? n.data : gr(e),
    i = 0,
    a = 0;
  for (let e = 1; e < r.positions.length; e += 3) {
    let t = r.positions[e];
    (t < i && (i = t), t > a && (a = t));
  }
  let o = or(e),
    c = new s(r);
  return {
    layout: e,
    col: c,
    rails: new CopingGrid(n ? n.rails(c) : yr(e, c)),
    pieces: t,
    bounds: o,
    box: { x0: o.x0 - ar, x1: o.x1 + ar, z0: o.z0 - ar, z1: o.z1 + ar },
    killY: e.killY ?? Math.min(-20, i - 15),
    yTop: Math.max(40, Math.ceil(a) + 4),
    lawn: Hr(e),
  };
}
function Hr(e) {
  let t = checkSingleTerrain(e);
  if (t) return { rect: t.rect, y: ir, ground: t };
  let n = 1 / 0,
    r = -1 / 0,
    i = 1 / 0,
    a = -1 / 0;
  for (let t of e.pieces)
    t.kind === `floor` &&
      ((n = Math.min(n, t.x - t.w / 2)),
      (r = Math.max(r, t.x + t.w / 2)),
      (i = Math.min(i, t.z - t.d / 2)),
      (a = Math.max(a, t.z + t.d / 2)));
  return n < r
    ? { rect: { x0: n, x1: r, z0: i, z1: a }, y: ir, ground: null }
    : null;
}
function Ur(e, t, n) {
  if (!e.ground) return e.y;
  let r = e.rect;
  return (
    e.ground.y(
      Math.min(Math.max(t, r.x0), r.x1),
      Math.min(Math.max(n, r.z0), r.z1),
    ) - 0.03
  );
}
var Wr = c();
function Gr(e, t, n, r = e.yTop) {
  return e.col.raySurface(t, r, n, 0, -1, 0, r - e.killY, Wr) ? Wr.py : 0;
}
var Kr = (e) => e.id.startsWith(`u-`);
function qr(e) {
  let t = JSON.stringify(checkFloorHole(e)),
    n = e.pieces.filter((e) => e.kind === `floor`),
    r = (e, t) =>
      (
        n.find(
          (n) => Math.abs(e - n.x) <= n.w / 2 && Math.abs(t - n.z) <= n.d / 2,
        ) ?? n[0]
      )?.id ?? 0;
  return e.pieces.map(
    (e) => JSON.stringify(e) + (e.kind === `floor` ? t : `|${r(e.x, e.z)}`),
  );
}
var Jr = new Map(),
  Yr = 1200;
function Xr(e) {
  let t = JSON.stringify(e),
    n = Jr.get(t);
  return (
    n ? Jr.delete(t) : (n = pieceDefaults(e)),
    Jr.set(t, n),
    Jr.size > Yr && Jr.delete(Jr.keys().next().value),
    n
  );
}
var Zr = new Map(),
  Qr = 8,
  $r = 0.5,
  ei = 0.2,
  ti = 0.5;
