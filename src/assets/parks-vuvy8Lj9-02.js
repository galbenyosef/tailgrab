// assets/parks-vuvy8Lj9 02 — startswith
// Lines 317-372 of readable/assets/parks-vuvy8Lj9.pretty.js (statement-aligned).
async function loadViewerModules() {
  let { loadProps: n } = await s(
      async () => {
        let { loadProps: e } = await import(`./decor-EQ8VRNuO.js`);
        return { loadProps: e };
      },
      __vite__mapDeps([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]),
    ),
    { toonMaterial: i, patchToon: a } = await s(
      async () => {
        let { toonMaterial: e, patchToon: t } = await import(
          `./toon-L4_S6Akl.js`
        );
        return { toonMaterial: e, patchToon: t };
      },
      __vite__mapDeps([15, 3, 2, 4]),
    ),
    { addOutlines: o } = await s(
      async () => {
        let { addOutlines: e } = await import(`./outline-DM9oZu0n.js`);
        return { addOutlines: e };
      },
      __vite__mapDeps([16, 10, 2, 4]),
    ),
    c = await n(),
    l = i({ vertexColors: !0 });
  a(l, { rim: 0.22, ao: !0 });
  let u = new r(new e(80, 40), new t({ color: `#EDE8F5` }));
  ((u.rotation.x = -Math.PI / 2), (u.receiveShadow = !0), T.scene.add(u));
  let d = 0;
  for (let [e, t] of c) {
    let n = new r(t, l),
      i = e.startsWith(`portal_`) || e.startsWith(`cloud`),
      a = d % 9,
      s = Math.floor(d / 9);
    (n.position.set(
      (a - 4) * 4.2,
      e.startsWith(`cloud`) || e.startsWith(`letter`) ? 1.8 : 0,
      s * 5 - 6,
    ),
      e.startsWith(`cloud`) && n.scale.setScalar(0.8),
      (n.castShadow = !0),
      (n.name = e),
      o(n, i ? 0.8 : 1),
      T.scene.add(n),
      d++);
  }
  ((w.textContent = `${c.size} props`),
    (window.__parks.ready = !0),
    requestAnimationFrame($));
}
D.has(`props`)
  ? loadViewerModules()
  : Promise.all([H(viewerOptions.park), T.ready]).then(() => {
      ((window.__parks.ready = !0), requestAnimationFrame($));
    });
