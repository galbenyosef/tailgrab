// assets/music-D6fpJLig 01 — connect
// Lines 1-162 of readable/assets/music-D6fpJLig.pretty.js (statement-aligned).
import { o as e, t } from "./sfx-6jovSU2-.js";
import { a as n, i as r, n as i, t as a } from "./songs-B3nWAdc6.js";
var o = 60 / 88 / 4,
  s = [
    [53, 57, 60, 64],
    [52, 55, 59, 62],
    [50, 53, 57, 60],
    [48, 52, 55, 59],
  ],
  c = [46, 50, 53, 57],
  l = [41, 40, 38, 36],
  u = [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0],
  d = [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
  f = [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0],
  p = null,
  m = 0,
  h = 0,
  g = 0,
  _ = null,
  v = 0,
  y = !1,
  b = !1,
  x = [],
  S = -1,
  C = !1,
  w = new Set(),
  T = (e) => 440 * 2 ** ((e - 69) / 12);
function startMusic() {
  t.onUnlock(D);
}
function D() {
  let o = t.track;
  !y &&
    t.ctx &&
    ((y = !0),
    k(!0),
    o &&
      i.length &&
      (b ||
        ((b = !0),
        (x = r(i, Math.random, e.tutorial >= 0 ? { first: a } : {})),
        o.addEventListener(`playing`, () => {
          C && ((C = !1), k(!1), n(x[S]));
        }),
        o.addEventListener(`ended`, O),
        o.addEventListener(`error`, () => {
          (S >= 0 && w.add(x[S].id), O());
        })),
      O()));
}
function O() {
  if (y) {
    for (let e = 0; e < i.length; e++) {
      ++S >= x.length &&
        ((x = r(i, Math.random, { after: x[x.length - 1]?.id })), (S = 0));
      let e = x[S];
      if (!w.has(e.id)) {
        ((C = !0), t.playTrack(`/` + e.file, e.gain));
        return;
      }
    }
    (t.stopTrack(), k(!0));
  }
}
function k(e) {
  let n = t.ctx;
  if (!n) return;
  _ || ((_ = n.createGain()), _.connect(t.music));
  let r = _.gain,
    i = n.currentTime;
  if (
    (r.cancelScheduledValues(i),
    r.setTargetAtTime(+!!e, i, e ? 0.01 : 0.3),
    clearTimeout(v),
    !e)
  ) {
    v = window.setTimeout(A, 1500);
    return;
  }
  p === null && ((m = n.currentTime + 0.1), (p = window.setInterval(j, 25)));
}
function A() {
  (p !== null && clearInterval(p), (p = null));
}
function j() {
  let e = t.ctx;
  if (e)
    for (; m < e.currentTime + 0.12;)
      (M(h % 16, Math.floor(h / 16) % 4, m),
        (m += o * (h % 2 ? 0.92 : 1.08)),
        h++,
        h % 64 == 0 && g++);
}
function M(e, n, r) {
  let i = t.ctx,
    a = _;
  if (u[e]) {
    let e = i.createOscillator();
    (e.frequency.setValueAtTime(110, r),
      e.frequency.exponentialRampToValueAtTime(40, r + 0.14));
    let t = i.createGain();
    (t.gain.setValueAtTime(0.7, r),
      t.gain.exponentialRampToValueAtTime(0.001, r + 0.2),
      e.connect(t).connect(a),
      e.start(r),
      e.stop(r + 0.22));
  }
  if (
    (d[e] && P(r, 1800, 0.18, 0.25),
    f[e] && P(r, 7500, 0.04, e % 4 == 2 ? 0.07 : 0.045),
    e === 0 || e === 10)
  ) {
    let t = n === 3 && g % 4 == 3 ? c : s[n];
    for (let n of t) N(T(n), r, e === 0 ? 1.6 : 0.5, e === 0 ? 0.05 : 0.03);
  }
  if (e === 0 || e === 7 || e === 11) {
    let t = i.createOscillator();
    ((t.type = `sine`), (t.frequency.value = T(l[n] + (e === 7 ? 7 : 0))));
    let o = i.createGain();
    (o.gain.setValueAtTime(1e-4, r),
      o.gain.exponentialRampToValueAtTime(0.22, r + 0.02),
      o.gain.exponentialRampToValueAtTime(1e-4, r + 0.4),
      t.connect(o).connect(a),
      t.start(r),
      t.stop(r + 0.45));
  }
}
function N(e, n, r, i) {
  let a = t.ctx,
    o = a.createOscillator();
  ((o.type = `triangle`), (o.frequency.value = e));
  let s = a.createOscillator();
  ((s.type = `sine`), (s.frequency.value = e * 2.001));
  let c = a.createBiquadFilter();
  ((c.type = `lowpass`), (c.frequency.value = 1800));
  let l = a.createGain();
  (l.gain.setValueAtTime(1e-4, n),
    l.gain.exponentialRampToValueAtTime(i, n + 0.01),
    l.gain.exponentialRampToValueAtTime(1e-4, n + r));
  let u = a.createGain();
  ((u.gain.value = 0.25),
    o.connect(c),
    s.connect(u).connect(c),
    c.connect(l).connect(_),
    o.start(n),
    s.start(n),
    o.stop(n + r + 0.05),
    s.stop(n + r + 0.05));
}
function P(e, n, r, i) {
  let a = t.ctx,
    o = Math.floor(a.sampleRate * r),
    s = a.createBuffer(1, o, a.sampleRate),
    c = s.getChannelData(0);
  for (let e = 0; e < o; e++) c[e] = (Math.random() * 2 - 1) * (1 - e / o);
  let l = a.createBufferSource();
  l.buffer = s;
  let u = a.createBiquadFilter();
  ((u.type = `highpass`), (u.frequency.value = n));
  let d = a.createGain();
  ((d.gain.value = i), l.connect(u).connect(d).connect(_), l.start(e));
}
