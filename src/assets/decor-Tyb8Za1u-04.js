// assets/decor-Tyb8Za1u 04 — math
// Lines 904-1193 of readable/assets/decor-Tyb8Za1u.pretty.js (statement-aligned).
function we(e, t, n) {
  for (let r = 0; r < e.n * 3; r += 3)
    ((e.p[r] += t.x * n),
      (e.p[r + 1] += t.y * n),
      (e.p[r + 2] += t.z * n),
      (e.o[r] += t.x * n),
      (e.o[r + 1] += t.y * n),
      (e.o[r + 2] += t.z * n));
}
function Te(e, t, n) {
  for (let r = 0; r < e.n * 3; r += 3)
    ((e.v[r] += t.x * n), (e.v[r + 1] += t.y * n), (e.v[r + 2] += t.z * n));
}
function Ee(e, t, n, r, i, a) {
  let o = i - n,
    s = a - r,
    c = o * o + s * s,
    l =
      c > 1e-12 ? Math.max(0, Math.min(1, ((e - n) * o + (t - r) * s) / c)) : 0,
    u = e - n - o * l,
    d = t - r - s * l;
  return u * u + d * d;
}
function De(e, t, n, r, i, a, o) {
  let s = t.x - e.x,
    c = t.y - e.y,
    l = t.z - e.z,
    u = Math.sqrt(s * s + c * c + l * l) || 1e-9,
    d = i.x - e.x,
    f = i.y - e.y,
    p = i.z - e.z,
    m = (d * s + f * c + p * l) / u;
  if (m < -a || m > u + a) return null;
  let h = Math.min(1, Math.max(0, m / u)),
    g = d - (s / u) * m,
    _ = f - (c / u) * m,
    v = p - (l / u) * m,
    y = Math.sqrt(g * g + _ * _ + v * v),
    b = n + (r - n) * h;
  if (y - b >= a) return null;
  let x = Math.max(0, y - b),
    S = m < 0 ? m : m > u ? m - u : 0,
    C = Math.hypot(x, S);
  if (C > 1e-6) {
    if (C >= a) return null;
    let e = y > 1e-6 ? x / y : 0,
      t = S / u;
    return (
      o.set(g * e + s * t, _ * e + c * t, v * e + l * t).normalize(),
      { depth: a - C, t: h }
    );
  }
  return (
    y > 1e-6 ? o.set(g / y, _ / y, v / y) : o.set(1, 0, 0),
    { depth: a + b - y, t: h }
  );
}
function Oe(e, t, n, r) {
  let i = t.x - e.x,
    a = t.y - e.y,
    o = t.z - e.z,
    s = r.x - n.x,
    c = r.y - n.y,
    l = r.z - n.z,
    u = e.x - n.x,
    d = e.y - n.y,
    f = e.z - n.z,
    p = i * i + a * a + o * o,
    m = s * s + c * c + l * l,
    h = s * u + c * d + l * f,
    g = (e) => Math.min(1, Math.max(0, e));
  if (p < 1e-12 && m < 1e-12) return [0, 0];
  if (p < 1e-12) return [0, g(h / m)];
  let _ = i * u + a * d + o * f;
  if (m < 1e-12) return [g(-_ / p), 0];
  let v = i * s + a * c + o * l,
    y = p * m - v * v,
    b = y > 1e-12 ? g((v * h - _ * m) / y) : 0,
    x = (v * b + h) / m;
  return (
    x < 0
      ? ((x = 0), (b = g(-_ / p)))
      : x > 1 && ((x = 1), (b = g((v - _) / p))),
    [b, x]
  );
}
var ke = `/`.replace(/\/?$/, `/`),
  J = new Map();
function Ae() {
  return je(`${ke}props/props.glb`);
}
function je(e) {
  let t = J.get(e);
  return (
    t ||
    ((t = new ne()
      .loadAsync(e)
      .then((e) => {
        let t = new Map();
        e.scene.updateMatrixWorld(!0);
        for (let r of e.scene.children) {
          let e = [];
          (r.traverse((t) => {
            let i = t;
            if (!i.isMesh) return;
            let a = i.geometry.clone(),
              o = new n().copy(r.matrixWorld).invert().multiply(i.matrixWorld);
            (a.applyMatrix4(o), e.push(a));
          }),
            e.length && t.set(r.name, Ne(e.map((e) => ({ g: e, m: null })))));
        }
        return t;
      })
      .catch((t) => {
        throw (J.delete(e), t);
      })),
    J.set(e, t),
    t)
  );
}
var Y = [
    [`position`, [`position`], 3, 1],
    [`normal`, [`normal`], 3, 1],
    [`color`, [`color`], 3, 1],
    [`ao`, [`ao`, `_ao`], 1, 1],
    [`glow`, [`glow`, `_zone`], 1, 0],
  ],
  X = new c(),
  Z = new c(),
  Me = new l();
function Ne(e) {
  let t = 0,
    n = 0;
  for (let { g: r } of e)
    ((t += r.getAttribute(`position`).count),
      (n += r.index ? r.index.count : r.getAttribute(`position`).count));
  let i = Y.map(([, , e]) => new Float32Array(t * e)),
    o = new Uint32Array(n),
    s = 0,
    c = 0;
  for (let { g: t, m: n } of e) {
    let e = t.getAttribute(`position`);
    if (
      (n && Me.getNormalMatrix(n),
      Y.forEach(([, r, a, o], c) => {
        let l = r.map((e) => t.getAttribute(e)).find(Boolean),
          u = i[c];
        for (let t = 0; t < e.count; t++) {
          let e = (s + t) * a;
          if (!l) {
            u.fill(o, e, e + a);
            continue;
          }
          c === 0
            ? (Z.fromBufferAttribute(l, t),
              n && Z.applyMatrix4(n),
              (u[e] = Z.x),
              (u[e + 1] = Z.y),
              (u[e + 2] = Z.z))
            : c === 1
              ? (X.fromBufferAttribute(l, t),
                n && X.applyMatrix3(Me).normalize(),
                (u[e] = X.x),
                (u[e + 1] = X.y),
                (u[e + 2] = X.z))
              : ((u[e] = l.getX(t)),
                a > 1 && ((u[e + 1] = l.getY(t)), (u[e + 2] = l.getZ(t))));
        }
      }),
      t.index)
    )
      for (let e = 0; e < t.index.count; e++) o[c + e] = t.index.getX(e) + s;
    else for (let t = 0; t < e.count; t++) o[c + t] = s + t;
    ((s += e.count), (c += t.index ? t.index.count : e.count));
  }
  let l = new a();
  return (
    Y.forEach(([e, , t], n) => l.setAttribute(e, new r(i[n], t))),
    l.setIndex(new r(o, 1)),
    l.computeBoundingSphere(),
    l
  );
}
function Pe(e = 0.22, t = !1) {
  let n = u({ vertexColors: !0 });
  return (d(n, { rim: e, ao: !0, glow: t }), n);
}
var Q = new e(),
  Fe = new i(),
  $ = new c(),
  Ie = new n(),
  Le = 190;
async function Re(e, r) {
  let i = r ?? (await Ae()),
    { items: a, clouds: c } = fe(e),
    l = new t();
  l.name = `decor`;
  let u = [],
    d = new Map(),
    f = a.filter((e) => h.has(e.prop));
  for (let e of a) {
    let t = i.get(e.prop);
    if (!t || h.has(e.prop)) continue;
    Q.setFromEuler(Fe.set(0, e.rot, 0));
    let r = {
      g: t,
      m: new n().compose(Z.set(e.x, e.y, e.z), Q, $.setScalar(e.s)),
    };
    if (!e.gate) {
      u.push(r);
      continue;
    }
    let a = d.get(e.gate) ?? [];
    (a.push(r), d.set(e.gate, a));
  }
  let p = Pe(0.22, !0),
    m = [],
    g = (e, t) => {
      let n = new s(Ne(e), p);
      return (
        (n.name = t),
        w(n),
        (n.receiveShadow = !0),
        l.add(n),
        m.push(n),
        n
      );
    };
  u.length && g(u, `decor:static`);
  for (let [e, t] of d) g(t, `gate:${e}`);
  let _ = T(a.filter((e) => e.prop === `lamp` && i.has(`lamp`)));
  l.add(_.group);
  let v = new Ce(
    f,
    (e) => i.get(e),
    p,
    (e, t, n) => ee.knock(e, t, n),
  );
  l.add(v.group);
  let y = Pe(0.3),
    b = new Map();
  for (let e of c) {
    if (!i.get(e.prop)) continue;
    let t = b.get(e.prop);
    t ? t.push(e) : b.set(e.prop, [e]);
  }
  let x = [];
  for (let [e, t] of b) {
    let n = new o(i.get(e), y, t.length);
    ((n.name = `decor:${e}`),
      (n.frustumCulled = !1),
      (n.userData.noOutline = !0),
      x.push({ mesh: n, items: t, x: t.map((e) => e.x) }),
      l.add(n));
  }
  let S = () => {
    for (let e of x)
      (e.items.forEach((t, n) => {
        (Q.setFromEuler(Fe.set(0, t.rot, 0)),
          e.mesh.setMatrixAt(
            n,
            Ie.compose(Z.set(e.x[n], t.y, t.z), Q, $.setScalar(t.s)),
          ));
      }),
        (e.mesh.instanceMatrix.needsUpdate = !0));
  };
  return (
    S(),
    {
      group: l,
      update(e, t, n) {
        v.update(e, t, n);
        for (let t of x)
          for (let n = 0; n < t.x.length; n++)
            ((t.x[n] += t.items[n].speed * e), t.x[n] > Le && (t.x[n] -= 380));
        S();
      },
      setOutlines(e) {
        for (let t of [...m, v.group]) e ? D(t, 0.8) : E(t);
      },
      dispose() {
        l.removeFromParent();
        for (let e of m) (E(e), e.geometry.dispose());
        (_.dispose(), E(v.group), v.dispose());
        for (let e of x) e.mesh.dispose();
        (p.dispose(), y.dispose());
      },
    }
  );
}
