import {
  Cr as e,
  It as t,
  U as n,
  Un as r,
  Vn as i,
  k as a,
  yr as o,
} from "./three.core-DVWDmH0S.js";
import { i as s, l as c, u as l } from "./palette-DQTkVEn_.js";
import "./outline-BufNikL2.js";
import { $ as u, et as d } from "./table-W1plLavt.js";
import { n as ee, t as f } from "./poses-DwKBijP_.js";
import { i as te } from "./skaterView-DCMhULBk.js";
import {
  A as p,
  An as ne,
  E as m,
  K as h,
  Mn as re,
  at as g,
  hn as _,
  ot as v,
  v as y,
  x as b,
} from "./tagPaint-BOEtbgNi.js";
import { t as ie } from "./secrets-Czes5esN.js";
import { o as x, s as S } from "./sfx-6jovSU2-.js";
import { n as C } from "./catalog-CGuOpeY8.js";
import { f as w, i as T } from "./skaters-pUdq6stw.js";
var ae = {
    portrait: {
      bone: null,
      at: [-0.1, 0.55, 0.04],
      cam: [1.15, 0.45, 2.16],
      fov: 28,
      pose: null,
    },
    head: {
      bone: `Head`,
      at: [0, 0.2, 0],
      cam: [0.6, 0.12, 1.3],
      fov: 30,
      pose: `idle-stand`,
    },
    hat: {
      bone: `Head`,
      at: [0, 0.33, 0],
      cam: [0.78, 0.24, 1.15],
      fov: 30,
      pose: `idle-stand`,
    },
    top: {
      bone: `Chest`,
      at: [0, -0.04, 0],
      cam: [0.5, 0.1, 1.05],
      fov: 30,
      pose: `idle-stand`,
    },
    bottom: {
      bone: `Hips`,
      at: [0, -0.15, 0],
      cam: [0.45, 0.1, 0.92],
      fov: 30,
      pose: `idle-stand`,
    },
    acc: {
      bone: `Chest`,
      at: [0, 0.08, -0.1],
      cam: [0.9, 0.22, -1.25],
      fov: 30,
      pose: `idle-stand`,
    },
  },
  oe = 0.5,
  se = 150,
  ce = 2e3,
  E = null,
  D = new Map();
function le(e) {
  E = e;
}
function ue(e, t = 256) {
  return de(e, `portrait`, t);
}
var O = [],
  k = new Map();
function de(e, t, n = 160, r) {
  let i = `${d(e)}@${t}@${n}`,
    a = D.get(i);
  if (a) {
    (D.delete(i), D.set(i, a));
    let e = k.get(i);
    return (e && fe(e, r), a);
  }
  let o,
    s = new Promise((r) => {
      o = { key: i, look: e, frame: t, size: n, live: 0, done: r };
    });
  (fe(o, r), k.set(i, o), D.set(i, s));
  for (let [e] of D) {
    if (D.size <= se) break;
    k.has(e) || D.delete(e);
  }
  return (O.push(o), pe(), s);
}
function fe(e, t) {
  if (!t) {
    e.live = 1 / 0;
    return;
  }
  t.aborted ||
    (e.live++,
    t.addEventListener(
      `abort`,
      () => {
        e.live--;
      },
      { once: !0 },
    ));
}
var A = !1;
async function pe() {
  if (!A) {
    A = !0;
    try {
      for (let e = O.shift(); e; e = O.shift()) {
        let t = null;
        (e.live > 0 &&
          (await me(),
          (t = await ve(e.look, e.frame, e.size).catch(
            (e) => (console.warn(`[portrait]`, e), null),
          ))),
          k.delete(e.key),
          t === null && D.delete(e.key),
          e.done(t));
      }
    } finally {
      A = !1;
    }
  }
}
var me = () => new Promise((e) => requestAnimationFrame(() => e())),
  j = null,
  M = new Map(),
  N = null,
  P = null;
function he() {
  if (j) return j;
  let e = new r(),
    i = new n(l(`#FFFFFF`), l(s), 1.35),
    u = new a(l(c), 2.1);
  (u.position.copy(new o(-0.45, 0.8, -0.35).normalize().multiplyScalar(20)),
    e.add(i, u));
  let d = new t(30, 1, 0.1, 20);
  return (d.layers.enable(1), (j = { scene: e, cam: d }));
}
function ge(t) {
  let n = M.get(t);
  return (
    n ||
      ((n = new e(t, t, { samples: 4 })),
      (n.texture.colorSpace = i),
      M.set(t, n)),
    n
  );
}
function _e(e) {
  (N?.dispose(),
    (N = e),
    P && clearTimeout(P),
    (P = setTimeout(() => {
      (N?.dispose(), (N = null));
      for (let e of M.values()) e.dispose();
      M.clear();
    }, ce)));
}
async function ve(e, t, n) {
  let r = re();
  if (!E || !r) return null;
  await r.loadHead(e.head);
  let i = E,
    { scene: a, cam: s } = he(),
    c = ne({ ...e, stance: `regular` }),
    u = c;
  a.add(c.root);
  let d = te();
  ((d.uy = 1), u.setPose?.(d));
  let p = ae[t];
  u.debugPose?.(p.pose ?? f[e.head], p.pose ? oe : ee);
  let m = c.root.getObjectByName(`board`);
  m && p.pose && (m.visible = !1);
  let h = (e) => new o(-e[2], e[1], e[0]);
  a.updateMatrixWorld(!0);
  let g = h(p.at),
    _ = p.bone ? c.root.getObjectByName(p.bone) : null;
  (_ && g.add(_.getWorldPosition(new o())),
    (s.fov = p.fov),
    s.updateProjectionMatrix(),
    s.position.copy(g).add(h(p.cam)),
    s.lookAt(g),
    a.updateMatrixWorld(!0));
  let v = ge(n),
    y = i.getRenderTarget(),
    b = i.getClearAlpha(),
    ie = i.getClearColor(l(`#000000`).clone()),
    x = new Uint8Array(n * n * 4);
  try {
    (i.setRenderTarget(v),
      i.setClearColor(0, 0),
      i.clear(),
      i.render(a, s),
      i.readRenderTargetPixels(v, 0, 0, n, n, x));
  } finally {
    (i.setRenderTarget(y),
      i.setClearColor(ie, b),
      c.root.removeFromParent(),
      _e(c));
  }
  let S = document.createElement(`canvas`);
  S.width = S.height = n;
  let C = S.getContext(`2d`),
    w = C.createImageData(n, n);
  for (let e = 0; e < n; e++)
    w.data.set(x.subarray((n - 1 - e) * n * 4, (n - e) * n * 4), e * n * 4);
  return (C.putImageData(w, 0, 0), S.toDataURL(`image/png`));
}
var ye = { 1: `↑`, 2: `↗`, 3: `→`, 4: `↘`, 5: `↓`, 6: `↙`, 7: `←`, 8: `↖` };
function be(e) {
  return ye[e] ?? ``;
}
var F = (e, t) => `style="fill:var(${e},${t})"`,
  I = `#22181c`,
  L = (e, t = `#fff`) =>
    `<path d="${e}" fill="none" stroke="${I}" stroke-width="13"/><path d="${e}" fill="none" style="stroke:var(--i1,${t})" stroke-width="6"/>`;
function R(e, t, n, r) {
  let i = [];
  for (let a = 0; a < 10; a++) {
    let o = -Math.PI / 2 + (a * Math.PI) / 5,
      s = a % 2 ? r : n;
    i.push(
      `${(e + Math.cos(o) * s).toFixed(1)} ${(t + Math.sin(o) * s).toFixed(1)}`,
    );
  }
  return `M${i.join(`L`)}Z`;
}
function xe(e, t, n) {
  let r = [],
    i = (e, t) =>
      `${(24 + Math.cos(e) * t).toFixed(1)} ${(24 + Math.sin(e) * t).toFixed(1)}`;
  for (let a = 0; a < e; a++) {
    let o = (a * 2 * Math.PI) / e,
      s = Math.PI / e;
    r.push(
      i(o - s * 0.9, n),
      i(o - s * 0.45, t),
      i(o + s * 0.45, t),
      i(o + s * 0.9, n),
    );
  }
  return `M${r.join(`L`)}Z`;
}
var z = (e, t, n) =>
    `<path d="M${7 + e} 43C${7 + e} 31 ${15 + e} 27 ${24 + e} 27C${33 + e} 27 ${41 + e} 31 ${41 + e} 43Z" ${F(`--i2`, n)}/><circle cx="${24 + e}" cy="15" r="9.5" ${F(`--i1`, t)}/>`,
  Se = {
    back: `<path d="M6 24L24 7V17H41V31H24V41Z" ${F(`--i1`, `#fff`)}/>`,
    close: `<path d="M10 15L15 10L24 19L33 10L38 15L29 24L38 33L33 38L24 29L15 38L10 33L19 24Z" ${F(`--i1`, `#fff`)}/>`,
    gear: `<path d="${xe(8, 21, 15)}" ${F(`--i1`, `#E3E7F2`)}/><circle cx="24" cy="24" r="6.5" ${F(`--i2`, `#8A90A6`)}/>`,
    help: `<circle cx="24" cy="24" r="19" ${F(`--i1`, `#1FC7E8`)}/><text x="24" y="34" text-anchor="middle" font-family="Lilita One, system-ui" font-size="29" fill="#fff" stroke-width="4">?</text>`,
    user: z(0, `#FFE0B8`, `#FF8A1F`),
    party: z(6, `#FFE0B8`, `#1FC7E8`) + z(-6, `#FFE0B8`, `#FF3D7F`),
    skaters: `<ellipse cx="24" cy="32" rx="11" ry="9" ${F(`--i1`, `#FF8A1F`)}/><circle cx="10.5" cy="21" r="5" ${F(`--i1`, `#FF8A1F`)}/><circle cx="18" cy="12" r="5" ${F(`--i1`, `#FF8A1F`)}/><circle cx="30" cy="12" r="5" ${F(`--i1`, `#FF8A1F`)}/><circle cx="37.5" cy="21" r="5" ${F(`--i1`, `#FF8A1F`)}/>`,
    career: `<path d="M13 12H7V15C7 20 10 22 14 22M35 12H41V15C41 20 38 22 34 22" fill="none" stroke-width="4"/><rect x="20" y="28" width="8" height="8" ${F(`--i1`, `#FFD21F`)}/><rect x="12" y="35" width="24" height="7" rx="2" ${F(`--i2`, `#A55BFF`)}/><path d="M13 7H35V17C35 26 30 30 24 30C18 30 13 26 13 17Z" ${F(`--i1`, `#FFD21F`)}/>`,
    parks: `<path d="M5 41H43V9H37C37 29 27 37 5 37Z" ${F(`--i1`, `#1FC7E8`)}/><path d="M37 9V41" fill="none" stroke-width="3"/><circle cx="37" cy="9" r="3.2" fill="#fff"/>`,
    ranks: `<path d="M4 27H17V42H4Z" ${F(`--i2`, `#E3E7F2`)}/><path d="M31 32H44V42H31Z" fill="#FF8A1F"/><path d="M17 19H31V42H17Z" ${F(`--i1`, `#FFD21F`)}/><path d="${R(24, 9.5, 7, 3.2)}" fill="#fff"/>`,
    play: `<path d="M15 8L40 24L15 40Z" ${F(`--i1`, `#fff`)}/>`,
    lock: `<path d="M16 22V16C16 6 32 6 32 16V22" fill="none" stroke-width="5"/><rect x="10" y="21" width="28" height="21" rx="5" ${F(`--i1`, `#FFD21F`)}/><circle cx="24" cy="31" r="3" fill="${I}"/>`,
    check: L(`M9 25L19 35L39 13`, `#2FD67B`),
    plus: `<path d="M19 7H29V19H41V29H29V41H19V29H7V19H19Z" ${F(`--i1`, `#FFD21F`)}/>`,
    star: `<path d="${R(24, 25, 20, 9)}" ${F(`--i1`, `#FFD21F`)}/>`,
    crown: `<path d="M6 16L15 25L24 10L33 25L42 16L38 38H10Z" ${F(`--i1`, `#FFD21F`)}/><circle cx="24" cy="30" r="3" fill="#FF3D7F" stroke-width="3"/>`,
    dice: `<rect x="7" y="7" width="34" height="34" rx="8" ${F(`--i1`, `#fff`)}/><g fill="${I}" stroke="none"><circle cx="16" cy="16" r="3.2"/><circle cx="32" cy="16" r="3.2"/><circle cx="24" cy="24" r="3.2"/><circle cx="16" cy="32" r="3.2"/><circle cx="32" cy="32" r="3.2"/></g>`,
    pencil: `<path d="M12 30L32 10L38 16L18 36Z" ${F(`--i1`, `#FFD21F`)}/><path d="M10 38L12 30L18 36Z" fill="#FFE0B8"/><path d="M32 10L35 7L41 13L38 16Z" fill="#FF3D7F"/>`,
    undo: `${L(`M16 19H28C35 19 40 23.5 40 30C40 36.5 35 41 28 41H16`)}<path d="M5 19L17 9V29Z" ${F(`--i1`, `#fff`)}/>`,
    chat: `<path d="M8 9H40C42 9 43 10 43 12V30C43 32 42 33 40 33H22L13 41V33H8C6 33 5 32 5 30V12C5 10 6 9 8 9Z" ${F(`--i1`, `#fff`)}/><g fill="${I}" stroke="none"><circle cx="15" cy="21" r="2.8"/><circle cx="24" cy="21" r="2.8"/><circle cx="33" cy="21" r="2.8"/></g>`,
    discord: `<g transform="translate(3 8.1) scale(.33)"><path d="M107.7 8.07A105.15 105.15 0 0 0 81.47 0a72.06 72.06 0 0 0-3.36 6.83 97.68 97.68 0 0 0-29.11 0A72.37 72.37 0 0 0 45.64 0a105.89 105.89 0 0 0-26.25 8.09C2.79 32.65-1.71 56.6.54 80.21a105.73 105.73 0 0 0 32.17 16.15 77.7 77.7 0 0 0 6.89-11.11 68.42 68.42 0 0 1-10.85-5.18c.91-.66 1.8-1.34 2.66-2a75.57 75.57 0 0 0 64.32 0c.87.71 1.76 1.39 2.66 2a68.68 68.68 0 0 1-10.87 5.19 77 77 0 0 0 6.89 11.1 105.25 105.25 0 0 0 32.19-16.14c2.64-27.38-4.51-51.11-18.9-72.15Z" stroke-width="15" ${F(`--i1`, `#5865F2`)}/><g fill="#fff" stroke="none"><ellipse cx="42.45" cy="53" rx="11.4" ry="12.7"/><ellipse cx="84.69" cy="53" rx="11.4" ry="12.7"/></g></g>`,
    invite: `<path d="M4 23L44 6L34 42L24 30Z" ${F(`--i1`, `#fff`)}/><path d="M24 30L22 41L29 35Z" fill="#E3E7F2"/><path d="M24 30L44 6" fill="none" stroke-width="3"/>`,
    chevL: L(`M29 9L14 24L29 39`),
    chevR: L(`M19 9L34 24L19 39`),
    home: `<path d="M6 24L24 7L42 24H37V41H11V24Z" ${F(`--i1`, `#fff`)}/><rect x="20" y="29" width="8" height="12" fill="#FF8A1F"/>`,
    menu: `<rect x="6" y="8" width="36" height="8" rx="4" ${F(`--i1`, `#fff`)}/><rect x="6" y="20" width="36" height="8" rx="4" ${F(`--i1`, `#fff`)}/><rect x="6" y="32" width="36" height="8" rx="4" ${F(`--i1`, `#fff`)}/>`,
    build: `<path d="M26 21L30 25L12 43L8 39Z" fill="#D9A066"/><path d="M19 14L30 3L45 18L34 29Z" ${F(`--i1`, `#A9B0C2`)}/>`,
    trash: `<path d="M19 8V5H29V8" fill="none" stroke-width="4"/><path d="M11 14H37L34 42H14Z" ${F(`--i1`, `#fff`)}/><rect x="7" y="8" width="34" height="7" rx="2" ${F(`--i2`, `#E3E7F2`)}/>`,
    missions: `<rect x="8" y="7" width="32" height="37" rx="5" ${F(`--i1`, `#FF8A1F`)}/><rect x="13" y="13" width="22" height="26" rx="2" fill="#fff" stroke-width="3"/><rect x="17" y="3" width="14" height="8" rx="3" ${F(`--i2`, `#FFD21F`)}/><path d="M17 26L22 31L31 20" fill="none" stroke-width="9"/><path d="M17 26L22 31L31 20" fill="none" stroke="#2FD67B" stroke-width="4"/>`,
    crate: `<rect x="7" y="20" width="34" height="22" rx="3" ${F(`--i1`, `#A55BFF`)}/><rect x="5" y="13" width="38" height="9" rx="3" ${F(`--i1`, `#A55BFF`)}/><rect x="21" y="13" width="6" height="29" ${F(`--i2`, `#FFD21F`)}/><path d="M24 13C18 2 9 7 16 13M24 13C30 2 39 7 32 13" fill="none" stroke-width="4"/>`,
    chest: `<path d="M7 22C7 12 14 8 24 8C34 8 41 12 41 22Z" ${F(`--i2`, `#FF8A1F`)}/><rect x="7" y="22" width="34" height="19" rx="3" ${F(`--i1`, `#C9773F`)}/><rect x="21" y="18" width="6" height="10" rx="2" fill="#FFD21F"/>`,
    chestOpen: `<path d="M7 23L10 6C19 3 29 3 38 6L41 23Z" ${F(`--i2`, `#8A4A22`)}/><path d="M10 24C13 15 35 15 38 24Z" fill="#FFD21F"/><rect x="7" y="22" width="34" height="19" rx="3" ${F(`--i1`, `#C9773F`)}/><rect x="21" y="22" width="6" height="7" rx="2" fill="#FFD21F"/>`,
    flame: `<path d="M24 4C27 12 36 16 36 28C36 36 30 43 24 43C18 43 12 36 12 28C12 22 15 18 18 15C18 21 20 23 22 24C22 16 20 10 24 4Z" ${F(`--i1`, `#FF5A36`)}/><path d="M24 27C27 31 30 33 30 37C30 40 27 42 24 42C21 42 18 40 18 37C18 33 22 31 24 27Z" fill="#FFD21F" stroke-width="3"/>`,
    clock: `<circle cx="24" cy="25" r="18" ${F(`--i1`, `#fff`)}/><path d="M24 14V25L31 30" fill="none" stroke-width="4"/>`,
    rail: `<path d="M12 23V41M36 23V41" fill="none" stroke-width="5"/><rect x="4" y="15" width="40" height="8" rx="4" ${F(`--i1`, `#A9B0C2`)}/><path d="M9 9L13 14M19 7L20 13M29 7L28 13" fill="none" stroke="#FFD21F" stroke-width="3"/>`,
    turn: `${L(`M31 12.9A14 14 0 1 1 19.2 11.8`)}<path d="M28 8.6L15.6 5.6L20.6 19.2Z" ${F(`--i1`, `#fff`)}/>`,
    spin: `<path d="M37 17A15 15 0 1 0 39 30" fill="none" stroke="${I}" stroke-width="13"/><path d="M37 17A15 15 0 1 0 39 30" fill="none" style="stroke:var(--i1,#1FC7E8)" stroke-width="6"/><path d="M44 9L42 25L29 17Z" ${F(`--i1`, `#1FC7E8`)}/>`,
    eye: `<path d="M3 24C11 12 37 12 45 24C37 36 11 36 3 24Z" ${F(`--i1`, `#fff`)}/><circle cx="24" cy="24" r="8" ${F(`--i2`, `#1FC7E8`)}/><circle cx="24" cy="24" r="3.5" fill="${I}" stroke="none"/>`,
    bolt: `<path d="M27 3L9 27H22L18 45L39 19H26Z" ${F(`--i1`, `#FFD21F`)}/>`,
    coin: `<circle cx="24" cy="24" r="19" ${F(`--i1`, `#FFD21F`)}/><circle cx="24" cy="24" r="12.5" fill="none" style="stroke:var(--i2,#FF8A1F)" stroke-width="3"/><path d="${R(24, 24.5, 8, 3.6)}" fill="#fff" stroke-width="3"/>`,
    air: `<path d="M24 4L41 22H31V43H17V22H7Z" ${F(`--i1`, `#2FD67B`)}/><path d="M5 31V41M43 31V41" fill="none" stroke-width="4"/>`,
    balance: `<path d="M24 27L34 43H14Z" ${F(`--i2`, `#FF8A1F`)}/><rect x="3" y="20" width="42" height="8" rx="4" ${F(`--i1`, `#1FC7E8`)}/><circle cx="24" cy="11" r="6.5" fill="#FFD21F"/>`,
    gap: `<rect x="3" y="30" width="14" height="13" rx="2" ${F(`--i2`, `#A9B0C2`)}/><rect x="31" y="30" width="14" height="13" rx="2" ${F(`--i2`, `#A9B0C2`)}/>${L(`M9 25Q24 2 39 23`, `#FF3D7F`)}`,
    target: `<circle cx="24" cy="24" r="19" ${F(`--i1`, `#FF3D7F`)}/><circle cx="24" cy="24" r="12" fill="#fff"/><circle cx="24" cy="24" r="5" ${F(`--i1`, `#FF3D7F`)}/>`,
    face: `<path d="M9 23L8 5L22 13Z" ${F(`--i1`, `#FF8A1F`)}/><path d="M39 23L40 5L26 13Z" ${F(`--i1`, `#FF8A1F`)}/><circle cx="24" cy="27" r="16" ${F(`--i1`, `#FF8A1F`)}/><path d="M13 31C13 38 18 42 24 42C30 42 35 38 35 31C31 34 17 34 13 31Z" fill="#FFF4E0" stroke="none"/><g fill="${I}" stroke="none"><circle cx="18" cy="26" r="2.6"/><circle cx="30" cy="26" r="2.6"/><ellipse cx="24" cy="32.5" rx="3.2" ry="2.3"/></g>`,
    tee: `<path d="M16 6L5 12L9 22L14 20V42H34V20L39 22L43 12L32 6C30 11 18 11 16 6Z" ${F(`--i1`, `#1FC7E8`)}/><path d="M14 30H34" fill="none" style="stroke:var(--i2,#FFD21F)" stroke-width="4"/>`,
    shorts: `<path d="M9 8H39L43 38H28L24 22L20 38H5Z" ${F(`--i1`, `#4F6BFF`)}/><rect x="9" y="8" width="30" height="7" rx="2" ${F(`--i2`, `#FFD21F`)}/>`,
    cap: `<path d="M6 31C6 18 14 10 24 10C34 10 40 18 40 31Z" ${F(`--i1`, `#FF3D7F`)}/><path d="M6 31H44C44 35 41 38 37 38H6Z" ${F(`--i2`, `#FFD21F`)}/><circle cx="24" cy="10" r="2.6" fill="#fff" stroke-width="3"/>`,
    backpack: `<path d="M18 12C18 4 30 4 30 12" fill="none" stroke-width="4"/><rect x="9" y="11" width="30" height="32" rx="9" ${F(`--i1`, `#2FD67B`)}/><rect x="15" y="27" width="18" height="11" rx="3" ${F(`--i2`, `#FFD21F`)}/>`,
    note: `<rect x="15" y="12" width="5" height="25" ${F(`--i1`, `#FF3D7F`)}/><rect x="36" y="7" width="5" height="25" ${F(`--i1`, `#FF3D7F`)}/><path d="M15 9L41 3V12L15 18Z" ${F(`--i1`, `#FF3D7F`)}/><ellipse cx="13" cy="37" rx="7.5" ry="5.8" transform="rotate(-20 13 37)" ${F(`--i1`, `#FF3D7F`)}/><ellipse cx="34" cy="32" rx="7.5" ry="5.8" transform="rotate(-20 34 32)" ${F(`--i1`, `#FF3D7F`)}/>`,
    deck: `<g transform="rotate(-32 24 24)"><rect x="9" y="12" width="7" height="4" rx="1" fill="#fff"/><rect x="32" y="12" width="7" height="4" rx="1" fill="#fff"/><rect x="9" y="32" width="7" height="4" rx="1" fill="#fff"/><rect x="32" y="32" width="7" height="4" rx="1" fill="#fff"/><rect x="3" y="16" width="42" height="16" rx="8" ${F(`--i1`, `#FF8A1F`)}/></g>`,
  },
  Ce = document.createElement(`template`);
function B(e, t = ``) {
  return (
    (Ce.innerHTML = `<svg class="ico ico-${e} ${t}" viewBox="0 0 48 48" width="1em" height="1em" aria-hidden="true" stroke="${I}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round" paint-order="stroke">${Se[e]}</svg>`),
    Ce.content.firstElementChild
  );
}
var V = {
  sky: [`#9FDCFF`, `#4F6BFF`],
  teal: [`#8EF2EA`, `#14A9C9`],
  lime: [`#C9F27A`, `#2FBF6B`],
  lemon: [`#FFE680`, `#FFAA1F`],
  tangerine: [`#FFB066`, `#FF6A2A`],
  bubblegum: [`#FFB3D2`, `#FF3D7F`],
  grape: [`#D2B6FF`, `#8B4DFF`],
  ocean: [`#6F8BFF`, `#4536E0`],
  berry: [`#FF9AA8`, `#E8202E`],
  plum: [`#E3A0FF`, `#9B2FD6`],
};
function H(e) {
  let t = parseInt(e.slice(1), 16),
    n = (e) => (
      (e /= 255),
      e <= 0.04045 ? e / 12.92 : ((e + 0.055) / 1.055) ** 2.4
    ),
    r = n(t >> 16),
    i = n((t >> 8) & 255),
    a = n(t & 255),
    o = Math.cbrt(0.4122214708 * r + 0.5363325363 * i + 0.0514459929 * a),
    s = Math.cbrt(0.2119034982 * r + 0.6806995451 * i + 0.1073969566 * a),
    c = Math.cbrt(0.0883024619 * r + 0.2817188376 * i + 0.6299787005 * a);
  return [
    0.2104542553 * o + 0.793617785 * s - 0.0040720468 * c,
    1.9779984951 * o - 2.428592205 * s + 0.4505937099 * c,
    0.0259040371 * o + 0.7827717662 * s - 0.808675766 * c,
  ];
}
var we = (e, t, n) => [
    e[0] + (t[0] - e[0]) * n,
    e[1] + (t[1] - e[1]) * n,
    e[2] + (t[2] - e[2]) * n,
  ],
  Te = (e, t) => Math.hypot(e[0] - t[0], e[1] - t[1], e[2] - t[2]),
  Ee = H(`#FFFFFF`),
  De = Object.fromEntries(
    Object.entries(V).map(([e, [t, n]]) => {
      let r = H(t),
        i = H(n),
        a = we(r, i, 0.5);
      return [e, [r, a, i, we(a, Ee, 0.35)]];
    }),
  );
function Oe(e) {
  let t = e.top === `bare`;
  return [
    [e.c.fur, t ? 5 : 3],
    [e.c.top, t ? 0 : 3],
    [e.c.bottom, 2],
    [e.c.hat, e.hat === `none` ? 0 : 1.5],
    [e.c.acc, e.acc === `none` ? 0 : 0.5],
    [e.c.hair, 0.5],
    [e.c.accent, 0.5],
    [e.c.shoes, 0.5],
    [e.c.deck0, 0.7],
    [e.c.deck1, 0.7],
  ];
}
function ke(e, t) {
  let n = 0,
    r = 0,
    i = 1 / 0;
  for (let [a, o] of Oe(e)) {
    if (!o) continue;
    let e = H(a),
      s = Math.min(...De[t].map((t) => Te(t, e)));
    ((n += o * Math.min(s, 0.3)), (r += o), o >= 2 && (i = Math.min(i, s)));
  }
  return (0.6 * n) / r + 0.4 * Math.min(i, 0.3);
}
function Ae(e) {
  let t = `sky`,
    n = -1;
  for (let r of Object.keys(V)) {
    let i = ke(e, r);
    i > n && ((n = i), (t = r));
  }
  return t;
}
var U = {
    "tawny-hawk": `teal`,
    "bob-burnquack": `bubblegum`,
    "rodney-mullet": `sky`,
    "chad-muskrat": `lime`,
    "andrew-reynfox": `grape`,
    "geoff-howley": `lemon`,
    "eric-koalston": `teal`,
    "steve-caballo": `ocean`,
    "kareem-camelbell": `grape`,
    "elissa-steamotter": `tangerine`,
    "rune-glideberg": `lemon`,
    "jamie-tomcat": `sky`,
    "rayssa-seal": `bubblegum`,
    "yuto-horigoat": `ocean`,
    "nyjah-hustoad": `berry`,
    "leticia-puffoni": `teal`,
    "sky-bruin": `grape`,
    "aurelien-giraffe": `bubblegum`,
    "ishod-hare": `plum`,
    "arisa-shrew": `berry`,
    "bam-margoose": `lime`,
    "chris-collie": `sky`,
    varginha: `sky`,
    abominollie: `berry`,
    chupacabra: `lemon`,
    saci: `lime`,
    curupira: `grape`,
    itsy: `bubblegum`,
    grindula: `tangerine`,
    jester: `teal`,
    sentai: `ocean`,
  },
  je = null;
function Me(e) {
  return `key` in e
    ? V[U[e.key] ?? Ae(e.look)]
    : ((je ??= new Map(
        [...T, ...ie].flatMap((e) => (U[e.key] ? [[u(e.look), U[e.key]]] : [])),
      )),
      V[je.get(u(e)) ?? Ae(e)]);
}
function Ne(e, t) {
  let [n, r] = Me(t);
  (e.style.setProperty(`--fur`, n), e.style.setProperty(`--top`, r));
}
var Pe = `/`.replace(/\/?$/, `/`),
  Fe = (e) => C.test(e),
  Ie = (e) => `${Pe}skaters/portraits/${e}.png`;
function Le(e, t = ``) {
  let n = new Image();
  ((n.className = `species-shadow ${t}`), (n.alt = ``), (n.decoding = `async`));
  let r = T.find((t) => t.species === e);
  return (r && (n.src = Ie(r.key)), n);
}
function Re(e, t = ``, n = !1) {
  let r = `key` in e ? e.look : e,
    i = m(`span`, `portrait ${t} ${n ? `locked` : ``}`);
  (n || Ne(i, e), `key` in e || i.append(Le(r.head, `portrait-fallback`)));
  let a = new Image();
  return (
    (a.alt = ``),
    (a.decoding = `async`),
    (a.onload = () => i.classList.add(`has-img`)),
    `key` in e
      ? (a.src = Ie(e.key))
      : ue(e).then((e) => {
          e && (a.src = e);
        }),
    i.append(a),
    i
  );
}
function ze(e, t, n = ``) {
  let r = w(e, t);
  return Re((!t && T[e]) || r, n);
}
function Be(e, t = ``) {
  let n = m(`span`, `thumb ${t}`);
  return (
    n.style.setProperty(
      `--thumb`,
      `url(${new URL(`${Pe}parks/thumbs/${e}.webp`, document.baseURI).href})`,
    ),
    n
  );
}
function Ve(e) {
  let t = m(`div`, `code-field`),
    n = m(`input`, `code-input`);
  ((n.maxLength = 6),
    (n.placeholder = `••••••`),
    (n.autocapitalize = `characters`),
    (n.autocomplete = `off`),
    (n.spellcheck = !1),
    (n.enterKeyHint = `go`),
    n.setAttribute(`aria-label`, `Code`),
    n.addEventListener(`input`, () => {
      n.value = n.value.toUpperCase().replace(/[^A-Z2-9]/g, ``);
    }));
  let r = () => {
    Fe(n.value)
      ? e(n.value)
      : (n.focus(),
        t.classList.remove(`shake`),
        t.offsetWidth,
        t.classList.add(`shake`));
  };
  return (
    n.addEventListener(`keydown`, (e) => {
      (e.stopPropagation(), e.key === `Enter` && r());
    }),
    t.append(n),
    { el: t, input: n, go: r }
  );
}
var He = (e) => m(`h2`, `page-sub`, e),
  Ue = (e) => m(`p`, `page-note`, e),
  We = 0.012;
function Ge(e, t) {
  if (t.live) return () => {};
  let n = 0,
    r = 0,
    i = -1,
    a = m(`div`, `sd-spin`);
  (a.append(B(`spin`), m(`span`, ``, `Drag to spin`)),
    e.append(a),
    e.classList.add(`can-spin`),
    e.addEventListener(`pointerdown`, (t) => {
      t.target.closest(`button`) ||
        ((i = t.pointerId),
        (r = t.clientX),
        e.setPointerCapture(t.pointerId),
        e.classList.add(`spinning`));
    }),
    e.addEventListener(`pointermove`, (e) => {
      e.pointerId === i &&
        ((n += (e.clientX - r) * We),
        (r = e.clientX),
        t.cue({ turn: n }),
        a.classList.add(`gone`));
    }));
  let o = (t) => {
    t.pointerId === i && ((i = -1), e.classList.remove(`spinning`));
  };
  (e.addEventListener(`pointerup`, o), e.addEventListener(`pointercancel`, o));
  let s = () => {
    ((n = 0), t.cue({ turn: n }));
  };
  return (
    e.addEventListener(`dblclick`, (e) => {
      e.target.closest(`button`) || s();
    }),
    s
  );
}
var Ke = {
  wasd: {
    up: [`KeyW`],
    down: [`KeyS`],
    left: [`KeyA`],
    right: [`KeyD`],
    ollie: [`Space`],
    flip: [`ArrowLeft`],
    grab: [`ArrowRight`],
    grind: [`ArrowUp`],
    spinL: [`KeyQ`],
    spinR: [`KeyE`],
    reset: [`KeyR`],
    look: [`ArrowDown`, `KeyC`],
    walk: [`KeyF`],
  },
  arrows: {
    up: [`ArrowUp`],
    down: [`ArrowDown`],
    left: [`ArrowLeft`],
    right: [`ArrowRight`],
    ollie: [`Space`],
    flip: [`KeyA`],
    grab: [`ShiftLeft`, `ShiftRight`, `KeyD`],
    grind: [`KeyW`],
    spinL: [`KeyQ`],
    spinR: [`KeyE`],
    reset: [`KeyR`],
    look: [`KeyS`, `KeyC`],
    walk: [`KeyF`],
  },
};
function qe(e) {
  return e === `ArrowUp` ||
    e === `ArrowDown` ||
    e === `ArrowLeft` ||
    e === `ArrowRight`
    ? `arrows`
    : e === `KeyW` || e === `KeyA` || e === `KeyS` || e === `KeyD`
      ? `wasd`
      : null;
}
var W = () => Ke[x.layout === `auto` ? `wasd` : x.layout],
  G = new Map(),
  Je = 0;
function K() {
  G = new Map();
  for (let [e, t] of Object.entries(W()))
    if (!x.binds[e]) for (let n of t) G.set(n, e);
  for (let [e, t] of Object.entries(x.binds)) for (let n of t) G.set(n, e);
  Je++;
}
var Ye = [];
function Xe(e) {
  Ye.push(e);
}
function Ze(e, t) {
  if (
    ((x.layout = e),
    t === `pick` && ((x.layoutPicked = !0), (x.binds = {})),
    K(),
    S(),
    mt(`controls`, e, t),
    t === `auto`)
  )
    for (let t of Ye) t(e);
}
function Qe(e) {
  return (
    e instanceof HTMLElement &&
    (e.isContentEditable ||
      e.tagName === `INPUT` ||
      e.tagName === `TEXTAREA` ||
      e.tagName === `SELECT`)
  );
}
function $e() {
  K();
  let e = (e) => {
      if (v.capturing || Qe(e.target)) return;
      if (x.layout === `auto`) {
        let t = qe(e.code);
        t && Ze(t, `auto`);
      }
      let t = G.get(e.code);
      t && (e.preventDefault(), !e.repeat && v.set(`kb`, t, !0));
    },
    t = (e) => {
      let t = G.get(e.code);
      t && v.set(`kb`, t, !1);
    },
    n = () => v.clear(`kb`);
  return (
    window.addEventListener(`keydown`, e),
    window.addEventListener(`keyup`, t),
    window.addEventListener(`blur`, n),
    () => {
      (window.removeEventListener(`keydown`, e),
        window.removeEventListener(`keyup`, t),
        window.removeEventListener(`blur`, n));
    }
  );
}
var et = {
    ArrowUp: `↑`,
    ArrowDown: `↓`,
    ArrowLeft: `←`,
    ArrowRight: `→`,
    ShiftLeft: `Shift`,
    ShiftRight: `Shift`,
  },
  tt = (e) => et[e] ?? e.replace(/^Key/, ``);
function q() {
  let e = v.lastSource;
  return e === `pad`
    ? `pad`
    : e === `touch` || document.body.classList.contains(`touch`)
      ? `touch`
      : `kb`;
}
var nt = {
    look: { xbox: `RS`, playstation: `R3` },
    walk: { xbox: `LS`, playstation: `L3` },
    ollie: { xbox: `A`, playstation: `✕` },
    flip: { xbox: `X`, playstation: `□` },
    grab: { xbox: `B`, playstation: `○` },
    grind: { xbox: `Y`, playstation: `△` },
  },
  rt = {
    ollie: { xbox: `#3ee07f`, playstation: `#8fb1ff` },
    flip: { xbox: `#6a98ff`, playstation: `#ff94dc` },
    grab: { xbox: `#ff6a4a`, playstation: `#ff6b78` },
    grind: { xbox: `#ffd21f`, playstation: `#3fe3b0` },
  },
  it = {
    look: `LOOK`,
    walk: `WALK`,
    ollie: `OLLIE`,
    flip: `FLIP`,
    grab: `GRAB`,
    grind: `GRIND`,
  };
function at(e, t = q()) {
  return t === `pad`
    ? (nt[e]?.[b ?? `xbox`] ?? e)
    : t === `touch`
      ? (it[e] ?? e)
      : tt((x.binds[e] ?? W()[e])[0] ?? ``);
}
var ot = () => `${q()}|${b}|${Je}`;
function st(e, t = q()) {
  let n = document.createElement(`kbd`);
  return ((n.textContent = at(e, t)), n);
}
function ct(e, t = q()) {
  return t === `pad` ? (rt[e]?.[b ?? `xbox`] ?? null) : null;
}
var lt = Array.from(crypto.getRandomValues(new Uint8Array(12)), (e) =>
    (e % 36).toString(36),
  ).join(``),
  J = [],
  Y = { arrows: 0, wasd: 0, space: 0, other: 0, first: [] },
  X = { n: 0, ms: 0, cpu: 0, slow: 0, stall: 0, max: 0 },
  Z = { n: 0, first: [] },
  Q = {},
  ut = ``,
  dt = 0,
  $ = !1,
  ft = () => ({ screen: `boot` }),
  pt = () => Math.round(performance.now() / 100) / 10;
function mt(e, t, n) {
  (g.measure(e, t, n),
    J.push({ t: pt(), e: `${e}/${t}/${n}` }),
    J.length > 40 && J.shift());
}
function ht(e) {
  ft = e;
}
function gt(e, t = 1) {
  Q[e] = (Q[e] ?? 0) + t;
}
function _t(e, t) {
  if (!(e <= 0)) {
    if ($) {
      $ = !1;
      return;
    }
    (X.n++,
      (X.ms += e),
      (X.cpu += t),
      e > 20 && X.slow++,
      e > 50 && X.stall++,
      e > X.max && (X.max = e));
  }
}
function vt(e) {
  ut = e;
}
function yt() {
  let e;
  try {
    e = ft();
  } catch {
    e = { screen: `?` };
  }
  return {
    v: 1,
    sid: lt,
    uid: h.account?.id ?? ``,
    portal: g.id,
    t: pt(),
    where: e,
    tutorial: x.tutorial,
    tips: x.tips,
    trail: J,
    keys: Y,
    device: q(),
    layout: x.layout,
    layoutPicked: x.layoutPicked,
    frames: {
      ...X,
      ms: Math.round(X.ms),
      cpu: Math.round(X.cpu),
      max: Math.round(X.max),
    },
    tier: ut,
    hidden: dt,
    errors: Z,
    counts: Q,
  };
}
function bt() {
  try {
    navigator.sendBeacon?.(
      `${_}/beacon/leave`,
      new Blob([JSON.stringify(yt())], { type: `text/plain` }),
    );
  } catch {}
}
var xt = (e) =>
  e instanceof HTMLElement &&
  (e.isContentEditable || e.tagName === `INPUT` || e.tagName === `TEXTAREA`);
window.addEventListener(
  `keydown`,
  (e) => {
    if (e.repeat || xt(e.target)) return;
    let t = e.code;
    (t.startsWith(`Arrow`)
      ? Y.arrows++
      : t === `KeyW` || t === `KeyA` || t === `KeyS` || t === `KeyD`
        ? Y.wasd++
        : t === `Space`
          ? Y.space++
          : Y.other++,
      Y.first.length < 12 && t && !Y.first.includes(t) && Y.first.push(t));
  },
  { capture: !0, passive: !0 },
);
function St(e) {
  (Z.n++, Z.first.length < 3 && Z.first.push(e.slice(0, 160)));
}
(window.addEventListener(`error`, (e) =>
  St(e.message || String(e.error ?? `error`)),
),
  window.addEventListener(`unhandledrejection`, (e) => {
    let t = e.reason;
    St(
      `unhandled: ${typeof t?.message == `string` ? t.message : String(e.reason)}`,
    );
  }),
  document.addEventListener(`visibilitychange`, () => {
    document.visibilityState === `hidden` && (dt++, ($ = !0), bt());
  }),
  window.addEventListener(`pagehide`, bt));
var Ct = [`#FF3D7F`, `#FFD21F`, `#2FD67B`, `#1FC7E8`, `#A55BFF`, `#FF8A1F`],
  wt = 440,
  Tt = class {
    layer;
    skipping = !1;
    onTap = () => {
      this.skipping = !0;
    };
    constructor(e = !0) {
      ((this.layer = m(`div`, `reward-layer ${e ? `` : `passive`}`)),
        document.body.append(this.layer),
        e && this.layer.addEventListener(`pointerdown`, this.onTap));
    }
    wait(e) {
      return this.skipping || p()
        ? Promise.resolve()
        : new Promise((t) => {
            let n = performance.now(),
              r = () =>
                this.skipping || performance.now() - n >= e
                  ? t()
                  : requestAnimationFrame(r);
            requestAnimationFrame(r);
          });
    }
    confetti(e, t, n = 36, r = 1) {
      if (!p())
        for (let i = 0; i < n; i++) {
          let n = m(`i`, `cf`),
            a = Math.random() * Math.PI * 2,
            o = (120 + Math.random() * 260) * r;
          ((n.style.cssText = `left:${e}px;top:${t}px;--dx:${Math.cos(a) * o}px;--dy:${Math.sin(a) * o * 0.7 - 120 * r}px;--rot:${Math.random() * 900 - 450}deg;--c:${Ct[i % Ct.length]};--d:${Math.random() * 90}ms;--s:${0.6 + Math.random() * 0.8}`),
            this.layer.append(n),
            setTimeout(() => n.remove(), 1700));
        }
    }
    rays(e, t, n = 60, r = 1600) {
      let i = m(`div`, `rays`);
      return (
        (i.style.cssText = `left:${e}px;top:${t}px;--size:${n}rem`),
        this.layer.append(i),
        setTimeout(() => i.classList.add(`out`), r),
        setTimeout(() => i.remove(), r + 500),
        i
      );
    }
    float(e, t, n, r = ``, i) {
      let a = m(`div`, `reward-float ${r}`, n);
      (i && a.prepend(y(i, `lead`)),
        (a.style.cssText = `left:${e}px;top:${t}px`),
        this.layer.append(a));
      let o = a.offsetWidth / 2 + 8;
      return (
        (a.style.left = `${Math.min(Math.max(e, o), innerWidth - o)}px`),
        setTimeout(() => a.remove(), 1400),
        a
      );
    }
    fly(e, t, n, r = 0, i = wt) {
      let a = t.getBoundingClientRect();
      if (p() || this.skipping) return Promise.resolve();
      let o = m(`div`, `reward-fly`);
      o.append(n === `star` || n === `coin` ? y(n) : B(n));
      let s = e.left + e.width / 2,
        c = e.top + e.height / 2,
        l = a.left + a.width / 2,
        u = a.top + a.height / 2,
        d = (s + l) / 2 + (Math.random() - 0.5) * 120,
        ee = Math.min(c, u) - 140 - Math.random() * 60;
      ((o.style.cssText = `left:0;top:0;opacity:0`), this.layer.append(o));
      let f = o.animate(
          [
            {
              transform: `translate(${s}px,${c}px) translate(-50%,-50%) scale(.4)`,
              opacity: 1,
            },
            {
              transform: `translate(${d}px,${ee}px) translate(-50%,-50%) scale(1.5) rotate(180deg)`,
              opacity: 1,
              offset: 0.45,
            },
            {
              transform: `translate(${l}px,${u}px) translate(-50%,-50%) scale(.7) rotate(360deg)`,
              opacity: 1,
            },
          ],
          {
            duration: i,
            delay: r,
            easing: `cubic-bezier(.5,0,.4,1)`,
            fill: `both`,
          },
        ),
        te = setInterval(() => {
          this.skipping && f.finish();
        }, 50);
      return f.finished
        .then(
          () => void 0,
          () => void 0,
        )
        .finally(() => {
          (clearInterval(te), o.remove());
        });
    }
    end() {
      this.layer.classList.contains(`out`) ||
        (this.layer.classList.add(`out`),
        setTimeout(() => this.layer.remove(), 400));
    }
  };
function Et(e = 1800) {
  let t = new Tt(!1);
  return (setTimeout(() => t.end(), e), t);
}
var Dt = (e) => {
  let t = e.getBoundingClientRect();
  return { x: t.left + t.width / 2, y: t.top + t.height / 2, r: t };
};
export {
  Me as A,
  Ue as C,
  Ge as D,
  Le as E,
  le as F,
  be as M,
  B as N,
  He as O,
  de as P,
  Fe as S,
  ze as T,
  Xe as _,
  mt as a,
  Ke as b,
  ht as c,
  st as d,
  ot as f,
  $e as g,
  W as h,
  gt as i,
  Ne as j,
  Be as k,
  q as l,
  tt as m,
  Dt as n,
  _t as o,
  at as p,
  Et as r,
  vt as s,
  Tt as t,
  ct as u,
  K as v,
  Re as w,
  Ve as x,
  Ze as y,
};
