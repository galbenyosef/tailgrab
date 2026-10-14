// assets__sfx-6jovSU2- 01 — tutorial
// Lines 1-72 of readable/assets__sfx-6jovSU2-.pretty.js (statement-aligned).
import { i as e } from "./prims-CECOBLSv.js";
var t = `freeskater-settings-v1`,
  n = {
    name: ``,
    skater: 0,
    color: 0,
    binds: {},
    layout: `auto`,
    layoutPicked: !1,
    master: 0.8,
    music: 0.5,
    sfx: 0.8,
    quality: `auto`,
    timeOfDay: `auto`,
    shake: !0,
    bubbles: !0,
    ping: !0,
    showFps: !1,
    reducedMotion: !1,
    landingMarker: !0,
    landingGlow: !1,
    touchScale: 1,
    touchOpacity: 0.85,
    touchStick: `stay`,
    leftHanded: !1,
    haptics: !0,
    tutorial: 0,
    tips: 0,
    airOut: !1,
  };
function r() {
  try {
    let e = localStorage.getItem(t);
    if (!e) return { ...n };
    let r = JSON.parse(e);
    return (
      r.seenHints && r.tutorial === void 0 && (r.tutorial = -1),
      r.tips === void 0 &&
        r.tutorial !== void 0 &&
        ((r.tips =
          r.tutorial === 4 ? 1 : r.tutorial >= 0 && r.tutorial <= 3 ? 0 : -1),
        r.tutorial >= 3 && (r.tutorial = -1)),
      (r.layout ??= `wasd`),
      delete r.seenHints,
      delete r.lastPlaza,
      { ...n, ...r, binds: { ...(r.binds ?? {}) } }
    );
  } catch {
    return { ...n };
  }
}
var i = r(),
  a = (() => {
    try {
      return !localStorage.getItem(t);
    } catch {
      return !0;
    }
  })();
function o() {
  try {
    localStorage.setItem(t, JSON.stringify(i));
  } catch {}
}
var s = [];
function c(e) {
  s.push(e);
}
function l() {
  o();
  for (let e of s) e();
}
