// assets__main-CzsUDvlE 09 — look
// Lines 2402-2422 of readable/assets__main-CzsUDvlE.pretty.js (statement-aligned).
function Ps(e) {
  Ns = e;
  try {
    e
      ? sessionStorage.setItem(
          Ms,
          JSON.stringify({ look: De(e.look), style: e.style, uid: e.uid }),
        )
      : sessionStorage.removeItem(Ms);
  } catch {}
}
var Fs = () => (Ns && Ns.uid === N.account?.id ? Ns : null);
async function Is() {
  let e = Fs();
  if (!e) return !0;
  try {
    return (await Dn(e.look, e.style), Ns === e && Ps(null), !0);
  } catch (e) {
    return (console.warn(`[style]`, P(e)), !1);
  }
}
