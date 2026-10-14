// assets/tagPaint-BOEtbgNi 12 — math
// Lines 4784-5063 of readable/assets/tagPaint-BOEtbgNi.pretty.js (statement-aligned).
function ja() {
  let e = Aa();
  if (!e) {
    Oa &&= (Si.clear(`pad`), !1);
    return;
  }
  let t = !Oa;
  Oa = !0;
  let n = (e, n, r, i = !1) => {
    (r !== !!Da[e] && !t && Si.set(`pad`, n, r || i), (Da[e] = r));
  };
  for (let [t, r] of Ea) n(t, r, !!e.buttons[t]?.pressed);
  (n(6, `spinL`, (e.buttons[6]?.value ?? 0) > 0.5, !!e.buttons[4]?.pressed),
    n(7, `spinR`, (e.buttons[7]?.value ?? 0) > 0.5, !!e.buttons[5]?.pressed),
    n(11, `look`, !!e.buttons[11]?.pressed || (e.axes[3] ?? 0) > 0.6));
  let r = e.axes[0] ?? 0,
    i = -(e.axes[1] ?? 0);
  Si.setStick(`pad`, Math.abs(r) > 0.2 ? r : 0, Math.abs(i) > 0.2 ? i : 0);
}
function Ma(e, t, n) {
  Aa()
    ?.vibrationActuator?.playEffect?.(`dual-rumble`, {
      duration: n,
      strongMagnitude: e,
      weakMagnitude: t,
    })
    ?.catch(() => {});
}
var Na = `/`.replace(/\/?$/, `/`),
  Pa = (e) => `${Na}stickers/${e}.webp`;
function Fa(e, t = ``) {
  let n = new Image();
  return (
    (n.className = `ico stk ${t}`),
    (n.alt = ``),
    (n.decoding = `async`),
    (n.draggable = !1),
    (n.src = Pa(e)),
    n
  );
}
function Ia(e, t, n, r) {
  let i = $(e, t);
  return (i.append(Fa(n, `lead`), r), i);
}
var La = `/`.replace(/\/?$/, `/`),
  Ra = `Sedgwick Ave Display`,
  za = `"${Ra}", "Lilita One", cursive`,
  Ba = 2500,
  Va = null;
function Ha() {
  return (
    (Va ??= (async () => {
      let e = new FontFace(
        Ra,
        `url(${La}fonts/sedgwick-ave-display.woff2) format("woff2")`,
      );
      (await e.load(), document.fonts.add(e));
    })()),
    Va
  );
}
function Ua() {
  let e = Ha().then(
    () => !0,
    () => !1,
  );
  return Promise.race([e, new Promise((e) => setTimeout(() => e(!1), Ba))]);
}
var Wa = () => Ha().catch(() => {}),
  Ga = `#22181c`,
  Ka = `#FFD21F`,
  qa = Math.PI * 2,
  Ja = (e, t = e.size) => `${t}px ${e.font}`;
function Ya(e, t, n, r, i = []) {
  let a = e.ctx,
    o = e.size;
  a.font = Ja(e);
  let s = i.slice(),
    c = i.at(-1);
  c && (n = c.x + c.adv);
  for (let e = i.length; e < t.length; e++) {
    let i = t[e],
      c = a.measureText(i).width,
      l = so(co(`${e}${i}`));
    (s.push({
      ch: i,
      x: n,
      y: r + (l() * 2 - 1) * o * 0.06,
      rot: (l() * 2 - 1) * 0.08,
      w: c,
      adv: c * 0.93,
      seed: co(i + e),
      pts: null,
      low: [],
      drips: [],
    }),
      (n += c * 0.93));
  }
  return s;
}
function Xa(e, t) {
  if (t.pts) return t.pts;
  let n = e.size,
    r = Math.ceil(n * 0.27),
    i = Math.ceil(t.w + r * 2),
    a = Math.ceil(n * 1.7),
    o = Math.ceil(n * 1.2),
    s = e.octx;
  ((s.canvas.width = i),
    (s.canvas.height = a),
    (s.font = Ja(e)),
    (s.fillStyle = `#000`),
    s.save(),
    s.translate(r, o),
    s.rotate(t.rot),
    s.fillText(t.ch, 0, 0),
    s.restore());
  let c = s.getImageData(0, 0, i, a).data,
    l = n > 90 ? 2 : 1,
    u = [],
    d = new Map();
  for (let e = 0; e < a; e += l)
    for (let n = 0; n < i; n += l) {
      if (c[(e * i + n) * 4 + 3] <= 150) continue;
      let a = t.x - r + n,
        s = t.y - o + e;
      u.push(a, s);
      let f = Math.floor(n / (l * 4)),
        p = d.get(f);
      (!p || p[1] < s) && d.set(f, [a, s]);
    }
  return ((t.pts = u), (t.low = [...d.values()]), u);
}
function Za(e, t, n, r, i) {
  ((e.globalAlpha = i), e.beginPath(), e.arc(t, n, r, 0, qa), e.fill());
}
function Qa(e, t, n, r = 0, i = 0) {
  let a = e.ctx;
  (a.save(),
    (a.font = Ja(e)),
    a.translate(t.x + r, t.y + i),
    a.rotate(t.rot),
    n(a),
    a.restore());
}
function $a(e, t) {
  Qa(e, t, (n) => {
    ((n.globalAlpha = 1),
      (n.fillStyle = e.color),
      (n.shadowColor = e.color),
      (n.shadowBlur = 3),
      n.fillText(t.ch, 0, 0));
  });
}
function eo(e, t) {
  let n = Xa(e, t),
    r = n.length / 2,
    i = e.size / 150;
  if (!r) return;
  let a = so(t.seed);
  e.ctx.fillStyle = e.color;
  for (let t = 0; t < 160; t++) {
    let t = ((a() * r) | 0) * 2,
      o = a() * qa,
      s = (4 + a() * 16) * i;
    Za(
      e.ctx,
      n[t] + Math.cos(o) * s,
      n[t + 1] + Math.sin(o) * s,
      (0.8 + a() * 1.6) * i,
      0.2,
    );
  }
  e.ctx.globalAlpha = 1;
}
function to(e, t, n, r) {
  let i = e.ctx;
  ((i.globalAlpha = 1),
    (i.strokeStyle = e.color),
    (i.lineWidth = t.w),
    (i.lineCap = `round`),
    i.beginPath(),
    i.moveTo(t.x, t.y + n),
    i.lineTo(t.x, t.y + r),
    i.stroke());
}
function no(e, t) {
  ((e.ctx.fillStyle = e.color),
    Za(e.ctx, t.x, t.y + t.len, t.w * 0.85, 1),
    (e.ctx.globalAlpha = 1));
}
function ro(e, t, n) {
  if ((Xa(e, t), (t.drips = []), !t.low.length)) return;
  let r = so(t.seed ^ 1540483477),
    i = r(),
    a = i < 0.3 ? 0 : i < 0.75 ? 1 : 2,
    o = e.size / 150;
  for (let e = 0; e < a; e++) {
    let e = t.low[(r() * t.low.length) | 0],
      i = (14 + r() * 58) * o;
    t.drips.push({
      x: e[0],
      y: e[1] - 3 * o,
      len: n ? i : 0,
      max: i,
      v: (80 + r() * 60) * o,
      w: (3 + r() * 2.5) * o,
      done: n,
    });
  }
}
function io(e, t) {
  (eo(e, t), $a(e, t));
  for (let n of t.drips) (to(e, n, 0, n.len), n.done && no(e, n));
}
function ao(e, t) {
  let n = e.size / 150;
  (Qa(
    e,
    t,
    (e) => {
      ((e.fillStyle = Ga), e.fillText(t.ch, 0, 0));
    },
    8 * n,
    9 * n,
  ),
    Qa(e, t, (e) => {
      ((e.lineJoin = `round`),
        (e.strokeStyle = Ga),
        (e.lineWidth = 22 * n),
        e.strokeText(t.ch, 0, 0),
        (e.strokeStyle = `#fff`),
        (e.lineWidth = 12 * n),
        e.strokeText(t.ch, 0, 0));
    }));
}
function oo(e, t) {
  let n = e.ctx,
    r = e.size,
    i = r * 0.42,
    a = r * 0.26;
  (n.save(),
    n.translate(t.x + r * 0.03, t.y - r),
    n.rotate(-0.16),
    n.beginPath(),
    n.moveTo(0, a),
    n.lineTo(0, 0),
    n.lineTo(i * 0.25, a * 0.55),
    n.lineTo(i * 0.5, -a * 0.2),
    n.lineTo(i * 0.75, a * 0.55),
    n.lineTo(i, 0),
    n.lineTo(i, a),
    n.closePath(),
    (n.globalAlpha = 1),
    (n.lineJoin = `round`),
    (n.lineWidth = Math.max(2, r * 0.04)),
    (n.strokeStyle = Ga),
    (n.fillStyle = Ka),
    n.fill(),
    n.stroke(),
    n.restore());
}
function so(e) {
  let t = e >>> 0;
  return () => {
    t = (t + 1831565813) | 0;
    let e = Math.imul(t ^ (t >>> 15), 1 | t);
    return (
      (e = (e + Math.imul(e ^ (e >>> 7), 61 | e)) ^ e),
      ((e ^ (e >>> 14)) >>> 0) / 4294967296
    );
  };
}
function co(e) {
  let t = 2166136261;
  for (let n = 0; n < e.length; n++)
    ((t ^= e.charCodeAt(n)), (t = Math.imul(t, 16777619)));
  return t >>> 0;
}
