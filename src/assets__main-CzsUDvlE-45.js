// assets__main-CzsUDvlE 45 — classlist
// Lines 17655-17758 of readable/assets__main-CzsUDvlE.pretty.js (statement-aligned).
function ah(e) {
  (I.loaded(), rh());
  let t = document.getElementById(`boot`);
  if (!t) return;
  let n = t.querySelector(`.boot-logo`),
    r =
      matchMedia(`(prefers-reduced-motion: reduce)`).matches ||
      document.body.classList.contains(`reduce-motion`);
  if (!e || !n || r) {
    (t.classList.add(`fade`), setTimeout(() => t.remove(), 400));
    return;
  }
  let i = n.getBoundingClientRect(),
    a = e.getBoundingClientRect(),
    o = a.left + a.width / 2 - (i.left + i.width / 2),
    s = a.top + a.height / 2 - (i.top + i.height / 2),
    c = e.offsetWidth / n.offsetWidth;
  ((e.style.visibility = `hidden`), t.classList.add(`gone`));
  let l = n.animate(
      [
        { transform: `rotate(-4deg)`, filter: nh(1) },
        {
          transform: `translate(${o}px, ${s}px) scale(${c}) rotate(-3deg)`,
          filter: nh(1 / c),
        },
      ],
      { duration: 650, easing: `cubic-bezier(.6, 0, .2, 1)`, fill: `forwards` },
    ),
    u = () => {
      ((e.style.visibility = ``), t.remove());
    };
  l.finished.then(u, u);
}
var oh = new URLSearchParams(location.search);
((oh.has(`debug`) || oh.has(`rtt`)) &&
  (await me(() => import(`./debug-BVnJLfS4.js`), __vite__mapDeps([36, 11])),
  oh.has(`rtt`) &&
    globalThis.__net(Number(oh.get(`rtt`)), Number(oh.get(`jitter`) ?? 0))),
  I.reloadOnChunkError &&
    window.addEventListener(`vite:preloadError`, (e) => {
      let t = 0;
      try {
        ((t = Number(sessionStorage.getItem(`chunkReload`)) || 0),
          sessionStorage.setItem(`chunkReload`, String(Date.now())));
      } catch {}
      Date.now() - t < 3e4 || (e.preventDefault(), location.reload());
    }));
var sh = new we(document.getElementById(`game`));
(sh.applyTier(ep()), Vn(sh.renderer));
var ch = document.getElementById(`ui`);
function lh(e, t) {
  let n = document.querySelector(`.boot-fill`);
  n && (n.style.width = `${Math.round(e * 100)}%`);
  let r = document.querySelector(`.boot-msg`);
  r && t && (r.textContent = t);
}
async function uh() {
  (I.init(),
    I.onPause((e) => Y.hide(e)),
    Ko(),
    Qn(),
    Rr(),
    mu() && (gu(document.body), hu()));
  let e = () =>
    document.body.classList.toggle(`reduce-motion`, J.reducedMotion);
  e();
  let t = Se.find((e) => e === oh.get(`tod`)),
    n = () =>
      sh.setTodOverride(t ?? (J.timeOfDay === `auto` ? null : J.timeOfDay));
  n();
  let r = Gf();
  (Lr(() => {
    (Y.applyVolumes(),
      Gf() !== r && ((r = Gf()), Zf(), sh.setScale(1), sh.applyTier(ep())),
      n(),
      vu(),
      e());
  }),
    lh(0.2),
    await document.fonts?.ready,
    lh(0.45, `Loading skaters`),
    await fn(),
    lh(0.8, `Loading the Skate Hub`));
  let i = new th(sh, ch);
  ((window.__skate = {
    app: i,
    get ready() {
      return i.screen !== `boot`;
    },
    perf: i.perf,
    get replay() {
      return wa.feature?.stats ?? null;
    },
  }),
    await i.start(),
    oh.has(`perflab`) &&
      me(
        () => import(`./perfLab-Dt5WuMzb.js`).then((e) => e.runPerfLab(i)),
        __vite__mapDeps([37, 4, 1, 2, 3, 5, 6, 7, 8, 9]),
      ));
}
uh().catch((e) => {
  (console.error(e), lh(1, `Couldn't reach the park. ` + (e?.message ?? ``)));
});
