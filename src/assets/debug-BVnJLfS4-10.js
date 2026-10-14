// assets/debug-BVnJLfS4 10 — queryselector
// Lines 2804-3018 of readable/assets/debug-BVnJLfS4.pretty.js (statement-aligned).
function It(e) {
  let t = e.querySelector(`[data-role="sliders"]`),
    n = e.querySelector(`[data-role="tune"]`),
    r = e.querySelector(`[data-role="tune-chevron"]`),
    i = e.querySelector(`[data-role="tune-label"]`),
    a = t.children.length;
  if (a === 0) {
    ((n.style.display = `none`), (t.style.display = `none`));
    return;
  }
  let o = St(xt).has(e.dataset.tuneKey);
  ((n.style.display = `flex`),
    (r.textContent = o ? `▾` : `▸`),
    (i.textContent = `${a} parameter${a === 1 ? `` : `s`}`),
    (t.style.display = o ? `flex` : `none`));
}
function Lt(e, t, n) {
  let r = e.querySelector(`[data-role="cat"]`),
    i = e.querySelector(`[data-role="fieldnames"]`);
  ((r.textContent = n.label ? `${n.label} ·` : n.isDefault ? `default ·` : ``),
    (i.textContent =
      n.fields.length === 0 ? `(no fields)` : n.fields.join(`, `)),
    Mt(e.querySelector(`[data-role="modes"]`), n.mode),
    e.querySelector(`[data-role="sliders"]`).dataset.mode !== n.mode &&
      Rt(e, t, n.id, n.mode));
}
function Rt(e, t, n, r) {
  let i = e.querySelector(`[data-role="sliders"]`);
  ((i.dataset.mode = r), (i.innerHTML = ``));
  let a = t.profiles().find((e) => e.id === n);
  if (!a) {
    It(e);
    return;
  }
  if (
    (r === `lerp`
      ? (zt(i, `delay (ms)`, 0, 300, a.delay, (e) =>
          t.setProfile(n, { delay: e }),
        ),
        zt(i, `tickInterval (ms, 0=off)`, 0, 100, a.tickInterval ?? 0, (e) =>
          t.setProfile(n, { tickInterval: e }),
        ),
        zt(i, `smoothMs (0=off)`, 0, 300, a.smoothMs, (e) =>
          t.setProfile(n, { smoothMs: e }),
        ))
      : r === `extrapolate`
        ? (zt(i, `maxExtrapolate (ms)`, 0, 300, a.maxExtrapolate, (e) =>
            t.setProfile(n, { maxExtrapolate: e }),
          ),
          zt(i, `tickInterval (ms, 0=off)`, 0, 100, a.tickInterval ?? 0, (e) =>
            t.setProfile(n, { tickInterval: e }),
          ),
          zt(i, `smoothMs (0=off)`, 0, 300, a.smoothMs, (e) =>
            t.setProfile(n, { smoothMs: e }),
          ))
        : r === `damped` &&
          zt(i, `smoothMs (0=snap)`, 0, 300, a.smoothMs, (e) =>
            t.setProfile(n, { smoothMs: e }),
          ),
    r === `lerp` || r === `extrapolate` || r === `damped`)
  ) {
    let e = a.snap ?? 0;
    zt(i, `snap (units, 0=off)`, 0, Math.max(20, Math.ceil(e * 2)), e, (e) =>
      t.setProfile(n, { snap: e }),
    );
  }
  It(e);
}
function zt(e, t, n, r, i, a) {
  let o = document.createElement(`label`);
  ((o.style.cssText = `display:flex;flex-direction:column;gap:2px;font-size:10px;color:${K}`),
    (o.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:baseline;gap:6px">
            <span>${t}</span>
            <span data-role="val" style="color:#fff;font-variant-numeric:tabular-nums"></span>
        </div>
        <input type="range" min="${n}" max="${r}" value="${i}" style="width:100%;margin:0;accent-color:#fff"/>
    `));
  let s = o.querySelector(`input`),
    c = o.querySelector(`[data-role="val"]`);
  ((c.textContent = String(i)),
    s.addEventListener(`input`, () => {
      let e = Number(s.value);
      c.textContent = String(e);
      try {
        a(e);
      } catch (e) {
        console.error(`[predict-debug] slider update failed:`, e);
      }
    }),
    e.appendChild(o));
}
function Bt(e, t) {
  ((t.el.querySelector(`[data-role="attached"]`).textContent = String(
    e.attachedCount(),
  )),
    qt(t, e),
    Pt(t.el, e));
}
var Vt = 64,
  Ht = 200,
  Ut = 30;
function Wt(e) {
  return e < 0.001
    ? `0`
    : e < 1
      ? e.toFixed(3)
      : e < 10
        ? e.toFixed(2)
        : e.toFixed(1);
}
var Gt = {
  matched: { word: `✓ matched`, color: `#6c9`, action: `` },
  jitter: {
    word: `~ jitter`,
    color: `#dc7`,
    action: `transient spikes (packet loss / reorder) — raise smoothMs or ignore; not a bug`,
  },
  diverging: {
    word: `✗ diverging`,
    color: `#e66`,
    action: `client/server sim disagree — check dt · shared step · constants · skipped inputs`,
  },
};
function Kt(e, t) {
  return `predict-rc-graph-${e.replace(/[^a-z0-9]/gi, `-`)}-${t}`;
}
function qt(e, t) {
  let n = e.el.querySelector(`[data-role="reconcilers"]`),
    r = t.reconcilers();
  if (r.length === 0) {
    n.style.display = `none`;
    return;
  }
  if (((n.style.display = `flex`), n.childElementCount !== r.length)) {
    n.innerHTML = ``;
    for (let e = 0; e < r.length; e++) n.appendChild(Jt(Kt(t.name, e)));
  }
  for (let i = 0; i < r.length; i++) Yt(n.children[i], r[i], e, Kt(t.name, i));
}
function Jt(e) {
  let t = document.createElement(`div`);
  return (
    (t.style.cssText = `border:1px solid ${q};border-left:3px solid ${K};background:rgba(255,255,255,0.04);border-radius:4px;padding:6px;display:flex;flex-direction:column;gap:4px`),
    (t.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;gap:6px">
            <span data-role="rc-label" style="color:#fff;font-weight:bold"></span>
            <span data-role="rc-status" style="font-weight:bold;white-space:nowrap"></span>
        </div>
        <canvas id="${e}" width="${Ht}" height="${Ut}" title="drift peak over time (auto-scaled; flat when matched)" style="display:block;width:100%;height:${Ut}px"></canvas>
        <div data-role="rc-action" style="font-size:10px;line-height:1.3"></div>
        <div data-role="rc-stats" style="color:${K};font-size:10px;font-variant-numeric:tabular-nums"></div>
    `),
    t
  );
}
function Yt(e, t, n, r) {
  let i = n.histories.get(t.label);
  (i || ((i = []), n.histories.set(t.label, i)),
    i.push(t.status === `matched` ? 0 : t.peak),
    i.length > Vt && i.shift());
  let a = Gt[t.status] ?? Gt.matched,
    o =
      t.status === `diverging` && t.severity !== void 0
        ? `  ${t.severity.toFixed(1)}× tol`
        : ``;
  ((e.style.borderLeftColor = a.color),
    (e.querySelector(`[data-role="rc-label"]`).textContent = t.label));
  let s = e.querySelector(`[data-role="rc-status"]`);
  ((s.style.color = a.color),
    (s.textContent = `${a.word}${o}`),
    at(r, i, a.color));
  let c = e.querySelector(`[data-role="rc-action"]`);
  ((c.style.display = a.action ? `block` : `none`),
    (c.style.color = a.color),
    (c.textContent = a.action),
    (e.querySelector(`[data-role="rc-stats"]`).textContent =
      `drift ${Wt(t.ema)} · pk ${Wt(t.peak)} · Δ ${Wt(t.lastCorrectionMag)}`));
}
function Xt() {
  lt === null &&
    (lt = setInterval(() => {
      for (let e of ct.values()) e.refresh();
    }, ut));
}
function Zt() {
  lt !== null && (clearInterval(lt), (lt = null));
}
var Qt = null;
(ee(), S(), y(B), y(yt));
function $t(e, t, n) {
  if (!j.latencySimulation.enabled || (e <= 0 && t <= 0)) return -1;
  let r = t > 0 ? (Math.random() * 2 - 1) * t : 0,
    i = performance.now(),
    a = Math.max(i + e + r, n.t + 0.5);
  return ((n.t = a), a - i);
}
globalThis.__net = (e = 0, t = 0) => {
  ((j.latencySimulation.delay = e),
    (j.latencySimulation.jitter = t),
    (j.latencySimulation.enabled = e > 0 || t > 0),
    M(),
    console.log(
      `[net] RTT ${e}±${t}ms (split both ways) — ${e > 0 || t > 0 ? `ON` : `OFF`}`,
    ));
};
function en() {
  Qt === null &&
    (Qt = setInterval(function () {
      (E.forEach(function (e, t) {
        ot(e);
      }),
        E.size === 0 && (clearInterval(Qt), (Qt = null)));
    }, 1e3));
}
