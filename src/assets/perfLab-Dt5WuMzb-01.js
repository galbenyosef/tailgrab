// assets/perfLab-Dt5WuMzb 01 — tier
// Lines 1-113 of readable/assets/perfLab-Dt5WuMzb.pretty.js (statement-aligned).
import { n as e } from "./scene-DiAs2bfK.js";
var t = 1500,
  n = 3e3;
async function r(r) {
  let s = r.stage,
    c = s.renderer;
  for (; !r.session;) await o(250);
  (await o(3e3), (r.govPaused = !0));
  let l = s.tier,
    u = [document.getElementById(`ui`), document.querySelector(`.touch-layer`)],
    d = c.render,
    f = [
      { name: `as is` },
      { name: `pixels 1x`, tier: { pixelRatio: 1 } },
      { name: `no textures`, tier: { textures: !1 } },
      { name: `no outlines`, tier: { outlines: !1 } },
      { name: `no world shadows`, tier: { worldShadows: !1 } },
      {
        name: `no shadows`,
        on: () => {
          s.sun.castShadow = !1;
        },
        off: () => {
          s.sun.castShadow = !0;
        },
      },
      { name: `lite scenery`, tier: { liteScenery: !0 } },
      {
        name: `no HUD`,
        on: () => u.forEach((e) => e && (e.style.visibility = `hidden`)),
        off: () => u.forEach((e) => e && (e.style.visibility = ``)),
      },
      {
        name: `no 3D draw`,
        on: () => {
          c.render = () => {};
        },
        off: () => {
          c.render = d;
        },
      },
      { name: `LOW`, tier: e.low },
      { name: `HIGH`, tier: e.high },
      { name: `as is (again)` },
    ],
    p = document.createElement(`div`);
  ((p.style.cssText = `position:fixed;z-index:200;left:8px;top:8px;max-width:calc(100% - 16px);max-height:calc(100% - 16px);overflow:auto;padding:8px 10px;border-radius:8px;background:rgba(10,6,20,.82);color:#fff;font:600 11px/1.35 ui-monospace,Menlo,monospace;white-space:pre-wrap;pointer-events:auto`),
    document.body.append(p));
  let m = a(r),
    h = [],
    g = (e) => {
      let t = h.map(
        (e) =>
          `${e.name.padEnd(17)}${String(e.fps).padStart(4)}${e.p90.toFixed(1).padStart(7)}${(e.slow + `%`).padStart(6)}${e.cpu.toFixed(1).padStart(7)}`,
      );
      p.textContent = `${m}\n${``.padEnd(17)} fps  p90ms  >20ms  cpums\n${t.join(`
`)}\n${e}`;
    };
  for (let e = 0; e < f.length; e++) {
    let a = f[e];
    (g(`${e + 1}/${f.length} ${a.name}… (don't touch)`),
      a.tier && s.applyTier({ ...l, ...a.tier }),
      a.on?.(),
      await o(t),
      r.perf.drain(),
      await o(n));
    let c = r.perf.drain();
    (a.off?.(),
      a.tier && s.applyTier(l),
      h.push(i(a.name, c.dt.slice(1), c.cpu)));
  }
  ((r.govPaused = !1),
    g(`tap to close`),
    p.addEventListener(`click`, () => p.remove(), { once: !0 }),
    console.table(h));
  let _ = { device: m, rows: h, query: location.search };
  window.__perflab = _;
  let v = new URLSearchParams(location.search).get(`perflab`);
  return (
    v &&
      fetch(v, {
        method: `POST`,
        mode: `no-cors`,
        body: JSON.stringify(_),
      }).catch(() => {}),
    h
  );
}
function i(e, t, n) {
  if (!t.length) return { name: e, fps: 0, p90: 0, slow: 0, cpu: 0 };
  let r = [...t].sort((e, t) => e - t),
    i = t.reduce((e, t) => e + t, 0) / t.length;
  return {
    name: e,
    fps: Math.round(1e3 / i),
    p90: r[Math.floor(r.length * 0.9)],
    slow: Math.round((t.filter((e) => e > 20).length / t.length) * 100),
    cpu: n.reduce((e, t) => e + t, 0) / n.length,
  };
}
function a(e) {
  let t = e.stage.renderer.getContext(),
    n = t.getExtension(`WEBGL_debug_renderer_info`),
    r = String(
      n
        ? t.getParameter(n.UNMASKED_RENDERER_WEBGL)
        : t.getParameter(t.RENDERER),
    ),
    i = t.drawingBufferWidth,
    a = t.drawingBufferHeight;
  return `${navigator.userAgent.replace(/^Mozilla\/5\.0 \(([^)]*)\).*$/, `$1`)}\n${r} · MSAA ${t.getParameter(t.SAMPLES)} · dpr ${devicePixelRatio} · ${screen.width}x${screen.height} · buffer ${i}x${a}`;
}
var o = (e) => new Promise((t) => setTimeout(t, e));
