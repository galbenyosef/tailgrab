// assets/parks-vuvy8Lj9 01 — vieweroptions
// Lines 1-316 of readable/assets/parks-vuvy8Lj9.pretty.js (statement-aligned).
const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      "assets/decor-EQ8VRNuO.js",
      "assets/decor-Tyb8Za1u.js",
      "assets/three.core-DVWDmH0S.js",
      "assets/toon-CycGToy9.js",
      "assets/palette-DQTkVEn_.js",
      "assets/preload-helper-DR1MrGPZ.js",
      "assets/dmath-_BI8hNwF.js",
      "assets/tuning-D4mSK766.js",
      "assets/prims-CECOBLSv.js",
      "assets/scene-DiAs2bfK.js",
      "assets/outline-BufNikL2.js",
      "assets/types-DM-HODfo.js",
      "assets/sfx-6jovSU2-.js",
      "assets/verlet-BVVzuOqv.js",
      "assets/GLTFLoader-BAb7LzOS.js",
      "assets/toon-L4_S6Akl.js",
      "assets/outline-DM9oZu0n.js",
    ]),
) => i.map((i) => d[i]);
import "./modulepreload-polyfill-P2Xu9kJm.js";
import {
  Rt as e,
  St as t,
  vr as n,
  xt as r,
  yr as i,
} from "./three.core-DVWDmH0S.js";
import { c as a, g as o, t as s } from "./preload-helper-DR1MrGPZ.js";
import { Zt as c } from "./tuning-D4mSK766.js";
import {
  B as l,
  L as u,
  O as d,
  R as f,
  d as p,
  p as m,
  t as ee,
  x as h,
  y as g,
} from "./scene-DiAs2bfK.js";
import { t as _ } from "./parks-C2dnYY6C.js";
import { s as v } from "./missions-eXNMrvRm.js";
import { t as te } from "./parkMesh-CjoleZJz.js";
import { t as y } from "./OrbitControls-CQWqkYLs.js";
import { t as b } from "./lil-gui.esm-uYN4JE7y.js";
import { t as loadPark } from "./parkModel-DmiMeogd.js";
var S = {
    plaza: [0, 5.5, 1, 0, 2.6, -18],
    schoolyard: [22, 13, 26, 0, 1, -2],
    warehouse: [20, 12, 22, -2, 1, -4],
    pier: [26, 14, 26, 0, 1, -4],
    mall: [26, 14, 26, 0, 1, -4],
    city: [60, 38, -95, -5, 6, 20],
    hangar: [-33, 7, -27, 8, 1.5, 12],
    beach: [30, 14, -20, -10, 2, 26],
    bridge: [30, 12, -30, -5, 4, 15],
    lab: [-22, 14, -22, 6, 0, 18],
  },
  C = document.getElementById(`view`),
  w = document.getElementById(`hud`),
  T = new ee(C),
  E = new y(T.camera, C);
((E.enableDamping = !0), (E.maxPolarAngle = Math.PI * 0.9));
var D = new URLSearchParams(location.search),
  O = Object.keys(_).filter((e) => e !== `test`),
  viewerOptions = {
    park: D.get(`park`) && _[D.get(`park`)] ? D.get(`park`) : `plaza`,
    outlines: D.get(`outlines`) !== `0`,
    collision: D.get(`collision`) === `1`,
    decor: D.get(`decor`) !== `0`,
    wideShadows: D.get(`wide`) !== `0`,
    paintOnClick: !0,
    tod:
      p.includes(D.get(`tod`) ?? ``) || D.get(`tod`) === `park`
        ? D.get(`tod`)
        : `day`,
  },
  A = [160, 420],
  fogDefaults = D.get(`fog`) === `park`,
  M = D.has(`day`) ? Number(D.get(`day`)) : v(Date.now());
function N() {
  let e = viewerOptions.tod === `park` ? m(viewerOptions.park).tod : viewerOptions.tod;
  T.setLook({ ...m(viewerOptions.park), fog: fogDefaults ? m(viewerOptions.park).fog : A, tod: e });
}
var P = null,
  F = null,
  I = null,
  L = 0,
  R = [`#FF3D7F`, `#FFD21F`, `#2FD67B`, `#1FC7E8`, `#FF8A1F`, `#9B6BFF`],
  z = 0,
  B = {
    a: (e) => ({ pos: [e * 1.15, e * 0.95, e * 1.2], target: [0, 0, 0] }),
    b: (e) => ({ pos: [-e * 1.25, e * 0.55, -e * 1.05], target: [0, 0, 0] }),
    c: (e) => ({ pos: [e * 0.05, e * 2.3, e * 0.35], target: [0, 0, 0] }),
  };
function V(e, t = 0) {
  let n = _[viewerOptions.park];
  if (((A = e === `play` ? [55, 170] : [160, 420]), N(), e === `play`)) {
    let e = n.spawns[t % n.spawns.length],
      r = Math.sin(e.yaw),
      i = Math.cos(e.yaw);
    (T.camera.position.set(e.x - r * 5, e.y + 2.4, e.z - i * 5),
      E.target.set(e.x + r * 3, e.y + 0.9, e.z + i * 3));
  } else if (e.startsWith(`at:`) || (e === `hero` && S[viewerOptions.park])) {
    let t = e === `hero` ? S[viewerOptions.park] : e.slice(3).split(`,`).map(Number);
    (T.camera.position.set(t[0], t[1], t[2]), E.target.set(t[3], t[4], t[5]));
  } else if (e.startsWith(`hz:`)) {
    let [t, r] = e.slice(3).split(`,`).map(Number),
      i = l(n, { baked: !0, tiled: !1 }),
      a = (F ? o(F, i.cx, i.cz) : 0) + (r || Math.max(2.5, i.wallH - 2)),
      s = (t * Math.PI) / 180;
    (T.camera.position.set(i.cx, a, i.cz),
      E.target.set(
        i.cx + Math.sin(s) * 60,
        a + Math.tan(0.05) * 60,
        i.cz - Math.cos(s) * 60,
      ));
  } else {
    let t = (B[e] ?? B.a)(n.half);
    (T.camera.position.set(...t.pos), E.target.set(...t.target));
  }
  E.update();
}
async function H(e) {
  let n = ++L,
    r = _[e],
    i = await loadPark(r, { outlines: viewerOptions.outlines, decor: viewerOptions.decor, day: M });
  if (n !== L) {
    i.dispose();
    return;
  }
  (P?.dispose(),
    I?.removeFromParent(),
    (P = i),
    (viewerOptions.park = e),
    (F = a(r)),
    T.scene.add(P.group));
  let o = te(r).group;
  (o.traverse((e) => {
    let n = e;
    n.isMesh &&
      (n.material.dispose(),
      (n.material = new t({
        color: `#3B2C4F`,
        wireframe: !0,
        transparent: !0,
        opacity: 0.35,
        depthTest: !0,
      })));
  }),
    (o.visible = viewerOptions.collision),
    (I = o),
    T.scene.add(o),
    U(),
    V(D.get(`view`) ?? `a`));
}
function U() {
  let e = _[viewerOptions.park],
    t = P?.scenery;
  w.textContent = `${e.name} · ${P?.baked ? `baked GLB` : `recipe fallback`} · ${t ? `scenery ${d(t.pin)}` : `no scenery`} · click a piece to paint`;
}
function W(e) {
  if (!P) return;
  let t = e === `park` ? f(viewerOptions.park, m(viewerOptions.park).scenery ?? [], M) : u(e);
  if (t === null && e !== `park`) {
    console.warn(`[parks] not a scenery pin: ${e}`);
    return;
  }
  P.setScenery(t === `off` ? null : t);
  let n = P.scenery;
  (n &&
    ((G.theme = n.pin.theme),
    (G.seed = n.pin.seed),
    (G.marks = n.pin.marks?.join(`,`) ?? `auto`)),
    U());
}
var G = { theme: `hills`, seed: 1, marks: `auto` },
  K = () =>
    `${G.theme}:${G.seed}${G.marks === `auto` ? `` : `+${G.marks === `none` ? `` : G.marks}`}`,
  q = c(),
  J = new n();
if (
  (C.addEventListener(`pointerdown`, (e) => J.set(e.clientX, e.clientY)),
  C.addEventListener(`pointerup`, (e) => {
    if (
      !viewerOptions.paintOnClick ||
      !F ||
      !P ||
      J.distanceTo(new n(e.clientX, e.clientY)) > 4
    )
      return;
    let t = new i(
        (e.clientX / innerWidth) * 2 - 1,
        -(e.clientY / innerHeight) * 2 + 1,
        0.5,
      ).unproject(T.camera),
      r = T.camera.position,
      a = t.sub(r).normalize();
    F.col.raySurface(r.x, r.y, r.z, a.x, a.y, a.z, 500, q) &&
      P.zoneOf(q.piece) &&
      P.paint(q.piece, e.shiftKey ? null : R[z++ % R.length], {
        x: q.px,
        z: q.pz,
      });
  }),
  !D.has(`nogui`))
) {
  let e = new b({ title: `Parks` });
  (e.add(viewerOptions, `park`, O).onChange((e) => H(e)),
    e.add(viewerOptions, `outlines`).onChange((e) => P?.setOutlines(e)),
    e
      .add(viewerOptions, `collision`)
      .name(`collision overlay`)
      .onChange((e) => {
        I && (I.visible = e);
      }),
    e.add(viewerOptions, `decor`).onChange(() => H(viewerOptions.park)),
    e
      .add(viewerOptions, `tod`, [`park`, ...p])
      .name(`time of day`)
      .onChange(N),
    e.add(viewerOptions, `wideShadows`).name(`park-wide shadows`),
    e.add(viewerOptions, `paintOnClick`).name(`paint on click (shift clears)`),
    e.add({ paintAll: () => Y() }, `paintAll`).name(`paint everything`),
    e.add({ clear: () => Y(null) }, `clear`).name(`clear paint`));
  for (let t of [`a`, `b`, `c`, `play`])
    e.add({ [t]: () => V(t) }, t).name(`view ${t}`);
  let t = e.addFolder(`scenery`);
  (t
    .add(G, `theme`, [...h])
    .onChange(() => W(K()))
    .listen(),
    t
      .add(G, `seed`, 0, 999, 1)
      .onFinishChange(() => W(K()))
      .listen(),
    t
      .add(G, `marks`, [`auto`, `none`, ...g])
      .onChange(() => W(K()))
      .listen(),
    t.add(
      {
        reroll: () => {
          ((G.seed = Math.floor(Math.random() * 1e3)), W(K()));
        },
      },
      `reroll`,
    ),
    t.add({ park: () => W(`park`) }, `park`).name(`the park's pin today`),
    t.add({ off: () => W(`off`) }, `off`));
  for (let e of [`0`, `90`, `180`, `270`])
    t.add({ [e]: () => V(`hz:${e}`) }, e).name(`horizon ${e}°`);
}
function Y(e) {
  let t = _[viewerOptions.park],
    n = 0;
  for (let r of t.pieces)
    P?.zoneOf(r.id) &&
      P.paint(r.id, e === null ? null : (e ?? R[n++ % R.length]));
}
var X = new i(),
  Z = performance.now(),
  Q = 0;
function $(e) {
  let t = Math.min(0.1, (e - Z) / 1e3);
  if (
    ((Z = e), E.update(), P?.update(t), T.followShadow(E.target), viewerOptions.wideShadows)
  ) {
    let e = (D.has(`props`) ? 30 : _[viewerOptions.park].half) + 8;
    (X.copy(T.sun.position).sub(T.sun.target.position).normalize(),
      T.sun.target.position.set(0, 0, 0),
      T.sun.position.copy(X).multiplyScalar(160));
    let t = T.sun.shadow.camera;
    ((t.left = -e),
      (t.right = e),
      (t.top = e),
      (t.bottom = -e),
      (t.near = 10),
      (t.far = 340),
      t.updateProjectionMatrix());
  }
  (T.render(), Q++, requestAnimationFrame($));
}
window.__parks = {
  ready: !1,
  frames: () => Q,
  setPark: H,
  setView: V,
  paint: (e, t, n) => P?.paint(e, t, n),
  paintAll: Y,
  set: (e, t) => {
    if (e === `scenery`) {
      W(t);
      return;
    }
    ((viewerOptions[e] = t),
      e === `outlines` && P?.setOutlines(t),
      e === `collision` && I && (I.visible = t));
  },
  scenery: () => P?.scenery?.info() ?? null,
  info: () => {
    let e = T.renderer.info;
    return {
      calls: e.render.calls,
      triangles: e.render.triangles,
      baked: P?.baked,
      park: viewerOptions.park,
    };
  },
  advance: (e) => P?.update(e),
};
