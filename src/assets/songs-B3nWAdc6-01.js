// assets/songs-B3nWAdc6 01 — artist
// Lines 1-45 of readable/assets/songs-B3nWAdc6.pretty.js (statement-aligned).
var e = [
    {
      id: `recomecar`,
      title: `Recomeçar`,
      artist: `Mudo Falante`,
      file: `music/recomecar.mp3`,
      gain: 0.25,
    },
    {
      id: `sobre-voce`,
      title: `Sobre Você`,
      artist: `Mudo Falante`,
      file: `music/sobre-voce.mp3`,
      gain: 0.35,
    },
    {
      id: `reencontrar`,
      title: `Reencontrar`,
      artist: `Mudo Falante`,
      file: `music/reencontrar.mp3`,
      gain: 0.28,
    },
  ],
  t = `recomecar`;
function n(e, t, n = {}) {
  let r = [...e];
  for (let e = r.length - 1; e > 0; e--) {
    let n = Math.floor(t() * (e + 1));
    [r[e], r[n]] = [r[n], r[e]];
  }
  let i = n.first ? r.findIndex((e) => e.id === n.first) : -1;
  if (i > 0) r.unshift(...r.splice(i, 1));
  else if (i < 0 && r.length > 1 && r[0].id === n.after) {
    let e = 1 + Math.floor(t() * (r.length - 1));
    [r[0], r[e]] = [r[e], r[0]];
  }
  return r;
}
var r = new Set();
function i(e) {
  return (r.add(e), () => r.delete(e));
}
function a(e) {
  for (let t of r) t(e);
}
