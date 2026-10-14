// assets/parkModel-DmiMeogd 10 — mesh
// Lines 2555-2862 of readable/assets/parkModel-DmiMeogd.pretty.js (statement-aligned).
function Qt(e, t, n) {
  let r = b(e, n),
    a = Gt(r, t),
    o = new i();
  o.name = `scenery`;
  let s = Ve(r, a),
    c = He(r, a),
    l = We(r, a);
  (o.add(s.mesh, l.mesh), c && o.add(c.mesh));
  let u = new ParkBuilder(a.floorY);
  for (let e of a.hills) Ke(u, e, a.floorY);
  a.skirt && $t(u, r, a);
  for (let e of a.blocks) qe(u, e, a.floorY);
  let d = [],
    f = u.p.length / 3;
  (a.marks.forEach((e, t) => {
    (d.push(bt(e, u, r, a)), t < 2 && (f = u.p.length / 3));
  }),
    a.marks.length || (f = u.p.length / 3));
  for (let e of a.pines) Je(u, e.x, e.y, e.z, e.h, e.r, e.col);
  let m = u.p.length / 3,
    h = new p(u.build(), V().near);
  ((h.name = `scenery:near`), (h.userData.noOutline = !0), o.add(h));
  for (let e of d) e.object && o.add(e.object);
  let g = {};
  ((Zt = g), ge(a.moon), pe(n.tiled));
  let _ = 0,
    v = null,
    y = (e) => {
      ((v = e),
        h.geometry.setDrawRange(0, e ? f : 1 / 0),
        d.forEach((t, n) => {
          t.object && (t.object.visible = !e || n < 2);
        }));
    };
  return (
    y(ue()),
    {
      group: o,
      pin: t,
      spec: a,
      update(e) {
        ((_ += e),
          (O.uTime.value = _),
          ue() !== v && y(ue()),
          d.forEach((e, t) => {
            (!v || t < 2) && e.update?.(_, !!v);
          }));
      },
      info() {
        let e = s.tris + l.tris + (c?.tris ?? 0) + (v ? f : m) / 3,
          n = 3 + +!!c;
        return (
          o.traverse((t) => {
            let r = t;
            if (
              !r.isMesh ||
              !t.visible ||
              t === h ||
              t === s.mesh ||
              t === l.mesh ||
              t === c?.mesh
            )
              return;
            let i = r.geometry,
              a =
                (i.index ? i.index.count : i.getAttribute(`position`).count) /
                3;
            ((e += a * (t.count ?? 1)), n++);
          }),
          {
            pin: re(t),
            marks: a.marks.map((e) => e.kind),
            tris: Math.round(e),
            calls: n,
            estimate: Xt(a, v ? `low` : `high`),
          }
        );
      },
      dispose() {
        (o.removeFromParent(),
          s.mesh.geometry.dispose(),
          l.mesh.geometry.dispose(),
          c?.mesh.geometry.dispose(),
          h.geometry.dispose());
        for (let e of d) e.dispose();
        Zt === g && ((Zt = null), ge(null));
      },
    }
  );
}
function $t(e, t, n) {
  let r = t.rect,
    i = n.floorY,
    a = 37.5,
    o = [t.cx, i - 200, t.cz];
  for (let n = 0; n < 4; n++) {
    let s = (e, t) => {
        let i = r.x0 - e,
          a = r.x1 + e,
          o = r.z0 - e,
          s = r.z1 + e;
        return n === 0
          ? [i + (a - i) * t, s]
          : n === 1
            ? [a, s + (o - s) * t]
            : n === 2
              ? [a + (i - a) * t, o]
              : [i, o + (s - o) * t];
      },
      c = n % 2 == 0 ? r.x1 - r.x0 + 196 : r.z1 - r.z0 + 196,
      l = Math.ceil(c / 8);
    for (let n = 0; n < l; n++) {
      let r = s(a, n / l),
        c = s(a, (n + 1) / l),
        u = s(98, n / l),
        d = s(98, (n + 1) / l),
        f = t.edgeY(r[0], r[1]) - 0.05,
        p = t.edgeY(c[0], c[1]) - 0.05;
      (f - i < 0.3 && p - i < 0.3) ||
        e.quad(
          [r[0], f, r[1]],
          [c[0], p, c[1]],
          [d[0], i, d[1]],
          [u[0], i, u[1]],
          ie((r[0] + d[0]) / 2, (r[1] + d[1]) / 2),
          o,
          N.GRASS,
        );
    }
  }
}
function en(e, t) {
  if (t.scenery === !1) return null;
  if (t.scenery) return t.scenery;
  let n =
    typeof location > `u`
      ? null
      : ee(new URLSearchParams(location.search).get(`scenery`));
  return n === `off`
    ? null
    : (n ?? ae(e.id, me(e.id).scenery ?? [], t.day ?? Se(Date.now())));
}
function tn(e, t, n, r) {
  let i = null,
    a = (r, a = t) => {
      (i?.dispose(),
        (t = a),
        (i = r ? Qt(a, r, n) : null),
        i && e.add(i.group));
    };
  return (
    a(r),
    {
      get view() {
        return i;
      },
      set: a,
      relayout(e) {
        a(i?.pin ?? null, e);
      },
    }
  );
}
var nn = `/`.replace(/\/?$/, `/`),
  rn = new Te();
async function loadParkModel(e, t = `${e}.glb`) {
  try {
    let e = await rn.loadAsync(`${nn}parks/${t}`),
      n = null;
    if (
      (e.scene.traverse((e) => {
        !n && e.isMesh && (n = e);
      }),
      !n)
    )
      return null;
    let r = n;
    (r.updateWorldMatrix(!0, !1), r.geometry.applyMatrix4(r.matrixWorld));
    let i = r.geometry;
    if (
      (i.getAttribute(`_ao`) &&
        (i.setAttribute(`ao`, i.getAttribute(`_ao`)), i.deleteAttribute(`_ao`)),
      i.getAttribute(`_zone`) &&
        (i.setAttribute(`zone`, i.getAttribute(`_zone`)),
        i.deleteAttribute(`_zone`)),
      i.getAttribute(`_kind`) &&
        (i.setAttribute(`kind`, i.getAttribute(`_kind`)),
        i.deleteAttribute(`_kind`)),
      !i.getAttribute(`zone`) || !i.getAttribute(`ao`))
    )
      return null;
    let a = new p(i);
    return ((a.name = `park`), a);
  } catch {
    return null;
  }
}
function on(e) {
  let { group: t } = we(e),
    n = t.children[0],
    r = n.geometry,
    i = r.getAttribute(`position`).count;
  return (
    r.setAttribute(`ao`, new c(new Float32Array(i).fill(1), 1)),
    n.material.dispose(),
    n.removeFromParent(),
    n
  );
}
async function loadParkManifest(e) {
  try {
    let t = await fetch(`${nn}parks/${e}/manifest.json`);
    return t.ok ? await t.json() : null;
  } catch {
    return null;
  }
}
var $ = (e, t, n) => {
  let r = Math.max(e[0] - t, 0, t - e[3]),
    i = Math.max(e[2] - n, 0, n - e[5]);
  return Math.sqrt(r * r + i * i);
};
async function cn(e, t, n) {
  let r = e.spawns[0] ?? { x: 0, z: 0 },
    a = new i();
  a.name = `park:${e.id}`;
  let o = new PaintTexture(),
    s = toonMaterial({ vertexColors: !0 });
  (patchToon(s, { rim: 0.12, ao: !0, kind: !0 }), o.patch(s));
  let c = n.outlineScale ?? 0.55,
    l = n.outlines ?? !0,
    u = !1,
    d = [],
    f = (e, t) => {
      ((t.material = s),
        (t.receiveShadow = !0),
        (n.castShadow ?? !0) && e.key !== `far` && he(t),
        (t.name = `tile:${e.key}`),
        o.measure(t.geometry),
        l && e.key !== `far` && addOutlines(t, c, void 0, !0),
        a.add(t),
        d.push({ e, mesh: t }));
    },
    p = [...t.tiles].sort((e, t) => $(e.box, r.x, r.z) - $(t.box, r.x, r.z));
  t.far && p.unshift(t.far);
  let m = p.filter((e) => e.key === `far` || $(e.box, r.x, r.z) < 120).length,
    _ = 0,
    v = 0,
    y = () => {},
    b = new Promise((e) => {
      y = e;
    }),
    x = async () => {
      for (; _ < p.length;) {
        let t = _++,
          n = p[t],
          r = await loadParkModel(e.id, `${e.id}/${n.file}`);
        if (u) {
          r?.geometry.dispose();
          return;
        }
        (r && f(n, r), t < m && ++v === m && y());
      }
    };
  m || y();
  for (let e = 0; e < 4; e++) x();
  let S =
      n.decor === !1
        ? Promise.resolve(null)
        : Ee(e).catch((e) => (console.warn(`[park] decor`, e), null)),
    [C] = await Promise.all([S, b]);
  (C && a.add(C.group), C && l && C.setOutlines(!0));
  let w = tn(a, e, { baked: !0, tiled: !0 }, en(e, n)),
    T = F(e);
  return {
    group: a,
    baked: !0,
    get scenery() {
      return w.view;
    },
    setScenery: (e) => w.set(e),
    zoneOf: (e) => T.get(e) ?? 0,
    paint(e, t, n) {
      o.paint(T.get(e) ?? 0, t, n);
    },
    update(e, t, n, r) {
      if ((o.update(e), C?.update(e, r, t), w.view?.update(e), !t)) return;
      let i = n ?? 340;
      for (let e of d)
        e.e.key !== `far` && (e.mesh.visible = $(e.e.box, t.x, t.z) < i);
    },
    setOutlines(e) {
      if (e !== l) {
        l = e;
        for (let t of d)
          t.e.key !== `far` && (e ? addOutlines(t.mesh, c, void 0, !0) : P(t.mesh));
        C?.setOutlines(e);
      }
    },
    rebuild() {},
    dispose() {
      ((u = !0), a.removeFromParent());
      for (let e of d) (P(e.mesh), e.mesh.geometry.dispose());
      (s.dispose(), o.dispose(), C?.dispose(), w.set(null));
    },
  };
}
