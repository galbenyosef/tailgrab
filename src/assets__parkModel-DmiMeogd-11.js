// assets__parkModel-DmiMeogd 11 — dispose
// Lines 2863-2962 of readable/assets__parkModel-DmiMeogd.pretty.js (statement-aligned).
async function ln(e, t = {}) {
  if (e.tileSize && t.baked !== !1) {
    let n = await sn(e.id);
    if (n) return cn(e, n, t);
  }
  let n = t.decor !== !1,
    r = (e) => Ee(e).catch((e) => (console.warn(`[park] decor`, e), null)),
    [a, o] = await Promise.all([
      t.baked === !1 ? Promise.resolve(null) : an(e.id),
      n ? r(e) : Promise.resolve(null),
    ]),
    s = o,
    c = !!a,
    l = a ?? on(e),
    u = new Ne(),
    d = h({ vertexColors: !0 });
  (g(d, { rim: 0.12, ao: !0, kind: !0 }),
    u.patch(d),
    (l.material = d),
    (l.receiveShadow = !0),
    (l.castShadow = !1),
    (t.castShadow ?? !0) && he(l),
    u.measure(l.geometry));
  let f = new i();
  ((f.name = `park:${e.id}`), f.add(l), s && f.add(s.group));
  let p = c ? null : ke(e);
  p && f.add(p);
  let m = tn(f, e, { baked: c, tiled: !1 }, en(e, t)),
    _ = (e) => JSON.stringify(Oe(e)),
    v = (e) =>
      JSON.stringify([Oe(e), e.pieces.filter((e) => e.kind === `prop`)]),
    y = _(e),
    b = v(e),
    x = !1,
    S = F(e),
    C = t.outlineScale ?? 0.55,
    w = !1,
    T = (e) => {
      e !== w &&
        ((w = e),
        e ? (xe(l, C), s?.setOutlines(!0)) : (P(l), s?.setOutlines(!1)));
    };
  return (
    T(t.outlines ?? !0),
    {
      group: f,
      baked: c,
      get scenery() {
        return m.view;
      },
      setScenery: (e) => m.set(e),
      zoneOf: (e) => S.get(e) ?? 0,
      paint(e, t, n) {
        u.paint(S.get(e) ?? 0, t, n);
      },
      update(e, t, n, r) {
        (u.update(e), s?.update(e, r, t), m.view?.update(e));
      },
      setOutlines: T,
      rebuild(e) {
        if (c || x) return;
        let t = on(e),
          i = w;
        (i && T(!1),
          l.geometry.dispose(),
          (l.geometry = t.geometry),
          u.measure(l.geometry),
          i && T(!0),
          (S = F(e)));
        let a = _(e);
        a !== y &&
          ((y = a), p && De(p), (p = ke(e)), p && f.add(p), m.relayout(e));
        let o = v(e);
        n &&
          o !== b &&
          ((b = o),
          r(e).then((e) => {
            if (e) {
              if (x || b !== o) {
                e.dispose();
                return;
              }
              (s?.dispose(), (s = e), f.add(e.group), w && e.setOutlines(!0));
            }
          }));
      },
      dispose() {
        ((x = !0),
          f.removeFromParent(),
          P(l),
          l.geometry.dispose(),
          d.dispose(),
          u.dispose(),
          s?.dispose(),
          p && De(p),
          m.set(null));
      },
    }
  );
}
