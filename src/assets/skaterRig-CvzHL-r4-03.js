// assets/skaterRig-CvzHL-r4 03 — find
// Lines 681-690 of readable/assets/skaterRig-CvzHL-r4.pretty.js (statement-aligned).
function Mt(e) {
  let t = e?.tracks.find((e) => e.name === `Hips.position`),
    r = e?.tracks.find((e) => e.name === `Hips.quaternion`);
  if (!t || !r) return null;
  let i = new n().fromArray(r.values, 0);
  return {
    hips: new f().fromArray(t.values, 0),
    spine: new f(0, 1, 0).applyQuaternion(i),
  };
}
