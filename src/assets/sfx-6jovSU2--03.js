// assets/sfx-6jovSU2- 03 — math
// Lines 1328-1392 of readable/assets/sfx-6jovSU2-.pretty.js (statement-aligned).
function p(e, t) {
  let n = e.sampleRate * 2,
    r = e.createBuffer(1, n, e.sampleRate),
    i = r.getChannelData(0),
    a = 0;
  for (let e = 0; e < n; e++) {
    let n = Math.random() * 2 - 1;
    t ? ((a = (a + 0.02 * n) / 1.02), (i[e] = a * 3.5)) : (i[e] = n);
  }
  return r;
}
function m(e) {
  let t = e.sampleRate,
    n = t * 2,
    r = e.createBuffer(1, n, t),
    i = r.getChannelData(0),
    a = 1 - Math.exp(-1 / (t * 0.004)),
    o = 0,
    s = 0,
    c = 0;
  for (let e = 0; e < n; e++)
    (--c <= 0 &&
      ((c = Math.round(t * (0.006 + Math.random() * 0.03))),
      (o = (Math.random() * 2 - 1) * (Math.random() < 0.16 ? 1 : 0.48))),
      (s += (o - s) * a),
      (i[e] = s));
  return r;
}
function h() {
  let e = 2205,
    t = new DataView(new ArrayBuffer(2249)),
    n = (e, n) => {
      for (let r = 0; r < n.length; r++) t.setUint8(e + r, n.charCodeAt(r));
    };
  (n(0, `RIFF`),
    t.setUint32(4, 2241, !0),
    n(8, `WAVE`),
    n(12, `fmt `),
    t.setUint32(16, 16, !0),
    t.setUint16(20, 1, !0),
    t.setUint16(22, 1, !0),
    t.setUint32(24, 22050, !0),
    t.setUint32(28, 22050, !0),
    t.setUint16(32, 1, !0),
    t.setUint16(34, 8, !0),
    n(36, `data`),
    t.setUint32(40, e, !0));
  for (let n = 0; n < e; n++) t.setUint8(44 + n, 128);
  return URL.createObjectURL(new Blob([t.buffer], { type: `audio/wav` }));
}
var g = new f();
function _() {
  let e = () => {
    g.unlock();
  };
  for (let t of [
    `pointerdown`,
    `pointerup`,
    `keydown`,
    `touchstart`,
    `touchend`,
  ])
    window.addEventListener(t, e, { passive: !0 });
  document.addEventListener(`visibilitychange`, () => g.hide(document.hidden));
}
