// assets/debug-BVnJLfS4 09 — style
// Lines 2460-2803 of readable/assets/debug-BVnJLfS4.pretty.js (statement-aligned).
function at(e, t, n) {
  var r = L().getElementById(e);
  if (r) {
    var i = r.getContext(`2d`),
      a = r.width,
      o = r.height;
    if ((i.clearRect(0, 0, a, o), t && t.length !== 0)) {
      var s = Math.max.apply(Math, t),
        c = Math.min.apply(Math, t),
        l = s - c || 1,
        u = 2,
        d = a - u * 2,
        f = o - u * 2;
      ((i.strokeStyle = `rgba(255, 255, 255, 0.1)`), (i.lineWidth = 0.5));
      for (var p = 0; p <= 4; p++) {
        var m = u + (f / 4) * p;
        (i.beginPath(), i.moveTo(u, m), i.lineTo(a - u, m), i.stroke());
      }
      ((i.strokeStyle = n), (i.lineWidth = 1.5), i.beginPath());
      for (var p = 0; p < t.length; p++) {
        var h = u + (d / (t.length - 1 || 1)) * p,
          g = (t[p] - c) / l,
          m = u + f - g * f;
        p === 0 ? i.moveTo(h, m) : i.lineTo(h, m);
      }
      (i.stroke(),
        t.length > 0 &&
          (i.lineTo(a - u, o - u),
          i.lineTo(u, o - u),
          i.closePath(),
          (i.fillStyle = n),
          (i.globalAlpha = 0.2),
          i.fill(),
          (i.globalAlpha = 1)));
    }
  }
}
function ot(e) {
  var t = Date.now(),
    n = (t - e.lastUpdate) / 1e3;
  if (n > 0) {
    ((e.bytesSentPerSec = e.bytesSentDelta / n),
      (e.bytesReceivedPerSec = e.bytesReceivedDelta / n),
      (e.messagesSentPerSec = e.messagesSentDelta / n),
      (e.messagesReceivedPerSec = e.messagesReceivedDelta / n),
      e.bytesSentHistory.push(e.bytesSentPerSec),
      e.bytesReceivedHistory.push(e.bytesReceivedPerSec));
    var r = e.room && e.room.clock;
    r &&
      typeof r.jitter == `function` &&
      typeof r.patchInterval == `function` &&
      r.patchInterval() > 0 &&
      e.jitterHistory.push(r.jitter());
    var i = e.maxHistoryLength || 60;
    (e.bytesSentHistory.length > i &&
      (e.bytesSentHistory.shift(), e.bytesReceivedHistory.shift()),
      e.jitterHistory.length > i && e.jitterHistory.shift(),
      (e.bytesSentDelta = 0),
      (e.bytesReceivedDelta = 0),
      (e.messagesSentDelta = 0),
      (e.messagesReceivedDelta = 0),
      (e.lastUpdate = t));
  }
  it(e.uniquePanelId, e);
}
function st(e) {
  let t = new Map();
  return (
    e.onTrack((e, n) => {
      let r = t.get(e);
      (r || ((r = new Set()), t.set(e, r)), r.add(n));
    }),
    {
      name: e.name,
      mode: () => e.mode(),
      smoothingDefaults: () => e.smoothingDefaults(),
      reckonDefaults: () => e.reckonDefaults(),
      attachedCount: () => e.attachedCount(),
      reconcilers: () => e.reconcilers(),
      setDefaults: (t) => e.setDefaults(t),
      setProfile: (t, n) => e.setProfile(t, n),
      onDispose: (t) => e.onDispose(t),
      profiles: () =>
        e
          .profiles()
          .map((e) => ({ ...e, fields: t.get(e.id) ? [...t.get(e.id)] : [] })),
    }
  );
}
var ct = new Map(),
  $ = null,
  lt = null,
  ut = 250,
  dt = `240px`,
  ft = [`lerp`, `extrapolate`, `damped`, `reckon`, `raw`],
  pt = `width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"`,
  mt = {
    lerp: `<svg ${pt}><circle cx="3.5" cy="12.5" r="1.4" fill="currentColor" stroke="none"/><circle cx="12.5" cy="3.5" r="1.4" fill="currentColor" stroke="none"/><line x1="4.6" y1="11.4" x2="11.4" y2="4.6"/></svg>`,
    extrapolate: `<svg ${pt}><circle cx="2.5" cy="8" r="1.4" fill="currentColor" stroke="none"/><line x1="3.8" y1="8" x2="13" y2="8"/><polyline points="9.5,4.5 13,8 9.5,11.5"/></svg>`,
    damped: `<svg ${pt}><path d="M2 8 C 3 3 5 3 6 8 C 6.8 11 7.8 11 8.6 8 C 9.2 6.2 10 6.2 13 7.6"/></svg>`,
    reckon: `<span style="font:italic 700 11px/1 ui-monospace,monospace">fn</span>`,
    raw: `<svg ${pt}><polyline points="2,13 5.5,13 5.5,9 9,9 9,5 13,5"/></svg>`,
  };
function ht(e) {
  if (ct.has(e.name)) return;
  let t = st(e),
    n = Nt(t);
  vt().appendChild(n);
  let r = { handle: t, el: n, refresh: () => Bt(t, r), histories: new Map() };
  (ct.set(t.name, r),
    t.onDispose(() => {
      let e = ct.get(t.name);
      e && (e.el.remove(), ct.delete(t.name), ct.size === 0 && Zt(), gt());
    }),
    Xt(),
    gt());
}
function gt() {
  let e = ct.size > 1;
  for (let t of ct.values()) {
    let n = t.el.querySelector(`[data-role="name"]`);
    n && (n.textContent = e ? ` ${t.handle.name}` : ``);
  }
}
var _t = 12;
function vt() {
  return (
    $ ||
    (($ = document.createElement(`div`)),
    ($.id = H),
    ($.className = `cds-surface`),
    Object.assign($.style, {
      display: U() ? `flex` : `none`,
      flexDirection: `column`,
      gap: `8px`,
      fontFamily: `monospace`,
      fontSize: `11px`,
      color: `#fff`,
      pointerEvents: `auto`,
    }),
    yt(),
    $)
  );
}
function yt() {
  if (!$) return;
  let e = $.style,
    t = $.querySelectorAll(`[data-name]`);
  if (b()) {
    let n = le();
    ($.parentNode !== n && n.appendChild($),
      (e.position = `static`),
      s($),
      (e.width = `auto`),
      (e.maxHeight = `none`),
      (e.zIndex = ``),
      (e.flexShrink = `0`),
      $.classList.remove(`cds-scroll`));
    for (let e of t) e.style.width = `auto`;
    return;
  }
  let n = L();
  $.parentNode !== n && n.appendChild($);
  let r = j.panelPosition.position,
    l = i(r),
    u = a(r) === `right` ? `left` : `right`;
  ((e.position = `fixed`),
    (e.zIndex = `2147483645`),
    (e.width = ``),
    (e.flexShrink = ``),
    $.classList.add(`cds-scroll`),
    s($),
    o($, l, _t),
    o($, u, _t),
    c($, `80vh`));
  for (let e of t) e.style.width = dt;
}
var bt = `colyseus-debug-predict-collapsed`,
  xt = `colyseus-debug-predict-tuning`;
function St(e) {
  try {
    let t = JSON.parse(sessionStorage.getItem(e) || `[]`);
    return new Set(Array.isArray(t) ? t : []);
  } catch {
    return new Set();
  }
}
function Ct(e, t, n) {
  let r = St(e);
  n ? r.add(t) : r.delete(t);
  try {
    sessionStorage.setItem(e, JSON.stringify([...r]));
  } catch {}
}
var wt = () => St(bt),
  Tt = (e, t) => Ct(bt, e, t),
  Et = null;
function Dt() {
  return (
    Et ||
    ((Et = document.createElement(`div`)),
    (Et.style.cssText = `position:fixed;z-index:2147483646;pointer-events:none;display:none;white-space:nowrap;background:rgba(0,0,0,0.95);color:#fff;font-family:monospace;font-size:10px;padding:3px 6px;border-radius:4px;box-shadow:0 2px 8px rgba(0,0,0,0.5)`),
    L().appendChild(Et),
    Et)
  );
}
function Ot(e, t) {
  let n = Dt();
  ((n.textContent = e), (n.style.display = `block`));
  let r = t.getBoundingClientRect();
  ((n.style.left = `${r.left}px`), (n.style.top = `${r.bottom + 4}px`));
}
function kt() {
  Et && (Et.style.display = `none`);
}
function At(e, t, n) {
  let r = document.createElement(`button`);
  return (
    (r.type = `button`),
    (r.className = `cds-hit-y`),
    (r.dataset.value = e),
    r.setAttribute(`aria-label`, e),
    (r.innerHTML = mt[e] ?? e),
    (r.style.cssText = `flex:1;display:inline-flex;align-items:center;justify-content:center;padding:4px 6px;line-height:0;border:1px solid;border-radius:4px;cursor:pointer;transition:background .2s,border-color .2s`),
    Oe(r, t),
    ke(
      r,
      () => {
        x() || Ot(e, r);
      },
      kt,
    ),
    r.addEventListener(`click`, (e) => {
      (e.stopPropagation(), n());
    }),
    r
  );
}
function jt(e, t, n) {
  e.innerHTML = ``;
  for (let r of ft)
    e.appendChild(
      At(r, r === t, () => {
        for (let t of e.querySelectorAll(`button`))
          Oe(t, t.dataset.value === r);
        n(r);
      }),
    );
}
function Mt(e, t) {
  for (let n of e.querySelectorAll(`button`)) Oe(n, n.dataset.value === t);
}
function Nt(e) {
  let t = document.createElement(`div`);
  ((t.dataset.name = e.name),
    (t.style.cssText = `width:${dt};background:rgba(0,0,0,0.85);color:#fff;font-family:monospace;font-size:11px;border-radius:6px;padding:8px;box-shadow:0 4px 12px rgba(0,0,0,0.5)`),
    b() && (t.style.width = `auto`));
  let n = wt().has(e.name);
  ((t.innerHTML = `
        <div data-role="header" class="cds-hit-y" style="display:flex;align-items:center;justify-content:space-between;gap:8px;font-weight:bold;border-bottom:1px solid ${q};padding-bottom:4px;cursor:pointer;user-select:none">
            <span>Predict<span data-role="name" style="color:${K};font-weight:normal"></span></span>
            <span style="display:flex;align-items:center;gap:8px;font-weight:normal">
                <span data-role="attached" title="attached instances" style="color:${K};font-variant-numeric:tabular-nums"></span>
                <span data-role="chevron" style="color:${K}">${n ? `▸` : `▾`}</span>
            </span>
        </div>
        <div data-role="body" style="display:${n ? `none` : `flex`};flex-direction:column;gap:8px;margin-top:6px">
            <div data-role="reconcilers" style="display:none;flex-direction:column;gap:6px"></div>
            <div data-role="profiles" style="display:none;flex-direction:column;gap:6px"></div>
        </div>
    `),
    (t.querySelector(`[data-role="attached"]`).textContent = String(
      e.attachedCount(),
    )));
  let r = t.querySelector(`[data-role="header"]`),
    i = t.querySelector(`[data-role="body"]`),
    a = t.querySelector(`[data-role="chevron"]`);
  return (
    r.addEventListener(`click`, () => {
      let t = i.style.display !== `none`;
      ((i.style.display = t ? `none` : `flex`),
        (a.textContent = t ? `▸` : `▾`),
        Tt(e.name, t));
    }),
    Pt(t, e),
    t
  );
}
function Pt(e, t) {
  let n = e.querySelector(`[data-role="profiles"]`),
    r = t.profiles().filter((e) => !e.isDefault || e.fields.length > 0);
  n.style.display = r.length ? `flex` : `none`;
  let i = r.map((e) => e.id).join(`,`);
  if (n.dataset.key !== i) {
    ((n.dataset.key = i), (n.innerHTML = ``));
    for (let e of r) n.appendChild(Ft(t, e));
  } else {
    let e = n.children;
    for (let n = 0; n < r.length; n++) Lt(e[n], t, r[n]);
  }
}
function Ft(e, t) {
  let n = document.createElement(`div`);
  ((n.dataset.profileId = String(t.id)),
    (n.dataset.tuneKey = `${e.name}#${t.id}`),
    (n.style.cssText = `border-top:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.03);border-radius:4px;padding:6px;display:flex;flex-direction:column;gap:4px`),
    (n.innerHTML = `
        <div data-role="fields" style="font-size:10px;display:flex;align-items:baseline;gap:6px">
            <span data-role="cat" style="color:#fff;font-weight:bold"></span>
            <span data-role="fieldnames" style="color:${K}"></span>
        </div>
        <div data-role="modes" style="display:flex;gap:4px;flex-wrap:wrap"></div>
        <button data-role="tune" type="button" class="cds-hit-y" style="display:none;align-items:center;gap:5px;
            width:100%;padding:3px 2px;border:none;border-radius:3px;background:none;color:${K};
            font-family:inherit;font-size:10px;text-align:left;cursor:pointer;
            transition:background .15s,color .15s">
            <span data-role="tune-chevron">▸</span><span data-role="tune-label"></span>
        </button>
        <div data-role="sliders" style="display:none;flex-direction:column;gap:3px"></div>
    `),
    jt(n.querySelector(`[data-role="modes"]`), t.mode, (r) => {
      try {
        (e.setProfile(t.id, { mode: r }), Rt(n, e, t.id, r));
      } catch (e) {
        console.error(`[predict-debug] setProfile failed:`, e);
      }
    }));
  let r = n.querySelector(`[data-role="tune"]`);
  return (
    r.addEventListener(`mouseenter`, () => {
      ((r.style.background = J.background), (r.style.color = `#fff`));
    }),
    r.addEventListener(`mouseleave`, () => {
      ((r.style.background = `none`), (r.style.color = K));
    }),
    r.addEventListener(`click`, (e) => {
      e.stopPropagation();
      let t = n.dataset.tuneKey;
      (Ct(xt, t, !St(xt).has(t)), It(n));
    }),
    Lt(n, e, t),
    n
  );
}
