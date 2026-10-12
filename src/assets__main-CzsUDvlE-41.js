// assets__main-CzsUDvlE 41 — append
// Lines 13453-13516 of readable/assets__main-CzsUDvlE.pretty.js (statement-aligned).
function Tm(e, t, n, r) {
  let { body: i, foot: a, close: o } = rt(e, `Park settings`, `park-settings`),
    s = j(`input`, `field`);
  ((s.maxLength = 28),
    (s.value = t.name),
    (s.spellcheck = !1),
    s.addEventListener(`change`, () => {
      s.value.trim() && n(`build:name`, { name: s.value });
    }),
    s.addEventListener(`keydown`, (e) => {
      (e.stopPropagation(), e.key === `Enter` && s.blur());
    }),
    i.append(j(`h3`, ``, `Name`), s),
    i.append(j(`h3`, ``, `Size`)));
  let c = j(`div`, `row bs-sizes`);
  for (let e of Object.keys(Er)) {
    let r = V(
      `${e} · ${Er[e]} m`,
      `tiny tab ${e === t.size ? `on` : ``}`,
      () => {
        n(`build:size`, { size: e });
        for (let e of c.children) e.classList.toggle(`on`, e === r);
      },
    );
    c.append(r);
  }
  (i.append(
    c,
    j(`p`, `bs-note`, `A park only shrinks when every piece still fits.`),
  ),
    i.append(j(`h3`, ``, `Ground`)));
  let l = j(`div`, `bi-skins`);
  for (let e of Ii) {
    let r = V(``, `swatch ${e === t.floor ? `on` : ``}`, () => {
      n(`build:floor`, { skin: e });
      for (let e of l.children) e.classList.toggle(`on`, e === r);
    });
    ((r.style.background = Te[e]), (r.title = e), l.append(r));
  }
  (i.append(l), i.append(j(`h3`, ``, `Sharing`)));
  let u = (e, t, r) => {
    let i = j(`label`, `set-row`),
      a = j(`input`);
    return (
      (a.type = `checkbox`),
      (a.checked = t),
      a.addEventListener(`change`, () => n(r, { on: a.checked })),
      i.append(j(`span`, ``, e), a),
      i
    );
  };
  i.append(
    u(`Anyone here can build (until you leave)`, t.openBuild, `build:open`),
    u(`Publish to Community parks`, t.published, `build:publish`),
  );
  let d = j(`div`, `bs-link`);
  (d.append(
    j(`span`, ``, `Park code `),
    j(`b`, ``, t.code),
    V(`Copy invite link`, `tiny`, r),
  ),
    i.append(d),
    a.append(V(`DONE`, `primary`, o)));
}
