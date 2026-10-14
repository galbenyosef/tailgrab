// assets/juice-6UyTKeka 02 — addeventlistener
// Lines 337-681 of readable/assets/juice-6UyTKeka.pretty.js (statement-aligned).
function H(e) {
  let t = parseInt(e.slice(1), 16),
    n = (e) => (
      (e /= 255),
      e <= 0.04045 ? e / 12.92 : ((e + 0.055) / 1.055) ** 2.4
    ),
    r = n(t >> 16),
    i = n((t >> 8) & 255),
    a = n(t & 255),
    o = Math.cbrt(0.4122214708 * r + 0.5363325363 * i + 0.0514459929 * a),
    s = Math.cbrt(0.2119034982 * r + 0.6806995451 * i + 0.1073969566 * a),
    c = Math.cbrt(0.0883024619 * r + 0.2817188376 * i + 0.6299787005 * a);
  return [
    0.2104542553 * o + 0.793617785 * s - 0.0040720468 * c,
    1.9779984951 * o - 2.428592205 * s + 0.4505937099 * c,
    0.0259040371 * o + 0.7827717662 * s - 0.808675766 * c,
  ];
}
var we = (e, t, n) => [
    e[0] + (t[0] - e[0]) * n,
    e[1] + (t[1] - e[1]) * n,
    e[2] + (t[2] - e[2]) * n,
  ],
  Te = (e, t) => Math.hypot(e[0] - t[0], e[1] - t[1], e[2] - t[2]),
  Ee = H(`#FFFFFF`),
  De = Object.fromEntries(
    Object.entries(V).map(([e, [t, n]]) => {
      let r = H(t),
        i = H(n),
        a = we(r, i, 0.5);
      return [e, [r, a, i, we(a, Ee, 0.35)]];
    }),
  );
function Oe(e) {
  let t = e.top === `bare`;
  return [
    [e.c.fur, t ? 5 : 3],
    [e.c.top, t ? 0 : 3],
    [e.c.bottom, 2],
    [e.c.hat, e.hat === `none` ? 0 : 1.5],
    [e.c.acc, e.acc === `none` ? 0 : 0.5],
    [e.c.hair, 0.5],
    [e.c.accent, 0.5],
    [e.c.shoes, 0.5],
    [e.c.deck0, 0.7],
    [e.c.deck1, 0.7],
  ];
}
function ke(e, t) {
  let n = 0,
    r = 0,
    i = 1 / 0;
  for (let [a, o] of Oe(e)) {
    if (!o) continue;
    let e = H(a),
      s = Math.min(...De[t].map((t) => Te(t, e)));
    ((n += o * Math.min(s, 0.3)), (r += o), o >= 2 && (i = Math.min(i, s)));
  }
  return (0.6 * n) / r + 0.4 * Math.min(i, 0.3);
}
function Ae(e) {
  let t = `sky`,
    n = -1;
  for (let r of Object.keys(V)) {
    let i = ke(e, r);
    i > n && ((n = i), (t = r));
  }
  return t;
}
var U = {
    "tawny-hawk": `teal`,
    "bob-burnquack": `bubblegum`,
    "rodney-mullet": `sky`,
    "chad-muskrat": `lime`,
    "andrew-reynfox": `grape`,
    "geoff-howley": `lemon`,
    "eric-koalston": `teal`,
    "steve-caballo": `ocean`,
    "kareem-camelbell": `grape`,
    "elissa-steamotter": `tangerine`,
    "rune-glideberg": `lemon`,
    "jamie-tomcat": `sky`,
    "rayssa-seal": `bubblegum`,
    "yuto-horigoat": `ocean`,
    "nyjah-hustoad": `berry`,
    "leticia-puffoni": `teal`,
    "sky-bruin": `grape`,
    "aurelien-giraffe": `bubblegum`,
    "ishod-hare": `plum`,
    "arisa-shrew": `berry`,
    "bam-margoose": `lime`,
    "chris-collie": `sky`,
    varginha: `sky`,
    abominollie: `berry`,
    chupacabra: `lemon`,
    saci: `lime`,
    curupira: `grape`,
    itsy: `bubblegum`,
    grindula: `tangerine`,
    jester: `teal`,
    sentai: `ocean`,
  },
  je = null;
function Me(e) {
  return `key` in e
    ? V[U[e.key] ?? Ae(e.look)]
    : ((je ??= new Map(
        [...T, ...ie].flatMap((e) => (U[e.key] ? [[u(e.look), U[e.key]]] : [])),
      )),
      V[je.get(u(e)) ?? Ae(e)]);
}
function Ne(e, t) {
  let [n, r] = Me(t);
  (e.style.setProperty(`--fur`, n), e.style.setProperty(`--top`, r));
}
var Pe = `/`.replace(/\/?$/, `/`),
  Fe = (e) => C.test(e),
  Ie = (e) => `${Pe}skaters/portraits/${e}.png`;
function Le(e, t = ``) {
  let n = new Image();
  ((n.className = `species-shadow ${t}`), (n.alt = ``), (n.decoding = `async`));
  let r = T.find((t) => t.species === e);
  return (r && (n.src = Ie(r.key)), n);
}
function Re(e, t = ``, n = !1) {
  let r = `key` in e ? e.look : e,
    i = m(`span`, `portrait ${t} ${n ? `locked` : ``}`);
  (n || Ne(i, e), `key` in e || i.append(Le(r.head, `portrait-fallback`)));
  let a = new Image();
  return (
    (a.alt = ``),
    (a.decoding = `async`),
    (a.onload = () => i.classList.add(`has-img`)),
    `key` in e
      ? (a.src = Ie(e.key))
      : ue(e).then((e) => {
          e && (a.src = e);
        }),
    i.append(a),
    i
  );
}
function ze(e, t, n = ``) {
  let r = w(e, t);
  return Re((!t && T[e]) || r, n);
}
function Be(e, t = ``) {
  let n = m(`span`, `thumb ${t}`);
  return (
    n.style.setProperty(
      `--thumb`,
      `url(${new URL(`${Pe}parks/thumbs/${e}.webp`, document.baseURI).href})`,
    ),
    n
  );
}
function Ve(e) {
  let t = m(`div`, `code-field`),
    n = m(`input`, `code-input`);
  ((n.maxLength = 6),
    (n.placeholder = `••••••`),
    (n.autocapitalize = `characters`),
    (n.autocomplete = `off`),
    (n.spellcheck = !1),
    (n.enterKeyHint = `go`),
    n.setAttribute(`aria-label`, `Code`),
    n.addEventListener(`input`, () => {
      n.value = n.value.toUpperCase().replace(/[^A-Z2-9]/g, ``);
    }));
  let r = () => {
    Fe(n.value)
      ? e(n.value)
      : (n.focus(),
        t.classList.remove(`shake`),
        t.offsetWidth,
        t.classList.add(`shake`));
  };
  return (
    n.addEventListener(`keydown`, (e) => {
      (e.stopPropagation(), e.key === `Enter` && r());
    }),
    t.append(n),
    { el: t, input: n, go: r }
  );
}
var He = (e) => m(`h2`, `page-sub`, e),
  Ue = (e) => m(`p`, `page-note`, e),
  We = 0.012;
function Ge(e, t) {
  if (t.live) return () => {};
  let n = 0,
    r = 0,
    i = -1,
    a = m(`div`, `sd-spin`);
  (a.append(B(`spin`), m(`span`, ``, `Drag to spin`)),
    e.append(a),
    e.classList.add(`can-spin`),
    e.addEventListener(`pointerdown`, (t) => {
      t.target.closest(`button`) ||
        ((i = t.pointerId),
        (r = t.clientX),
        e.setPointerCapture(t.pointerId),
        e.classList.add(`spinning`));
    }),
    e.addEventListener(`pointermove`, (e) => {
      e.pointerId === i &&
        ((n += (e.clientX - r) * We),
        (r = e.clientX),
        t.cue({ turn: n }),
        a.classList.add(`gone`));
    }));
  let o = (t) => {
    t.pointerId === i && ((i = -1), e.classList.remove(`spinning`));
  };
  (e.addEventListener(`pointerup`, o), e.addEventListener(`pointercancel`, o));
  let s = () => {
    ((n = 0), t.cue({ turn: n }));
  };
  return (
    e.addEventListener(`dblclick`, (e) => {
      e.target.closest(`button`) || s();
    }),
    s
  );
}
var Ke = {
  wasd: {
    up: [`KeyW`],
    down: [`KeyS`],
    left: [`KeyA`],
    right: [`KeyD`],
    ollie: [`Space`],
    flip: [`ArrowLeft`],
    grab: [`ArrowRight`],
    grind: [`ArrowUp`],
    spinL: [`KeyQ`],
    spinR: [`KeyE`],
    reset: [`KeyR`],
    look: [`ArrowDown`, `KeyC`],
    walk: [`KeyF`],
  },
  arrows: {
    up: [`ArrowUp`],
    down: [`ArrowDown`],
    left: [`ArrowLeft`],
    right: [`ArrowRight`],
    ollie: [`Space`],
    flip: [`KeyA`],
    grab: [`ShiftLeft`, `ShiftRight`, `KeyD`],
    grind: [`KeyW`],
    spinL: [`KeyQ`],
    spinR: [`KeyE`],
    reset: [`KeyR`],
    look: [`KeyS`, `KeyC`],
    walk: [`KeyF`],
  },
};
function qe(e) {
  return e === `ArrowUp` ||
    e === `ArrowDown` ||
    e === `ArrowLeft` ||
    e === `ArrowRight`
    ? `arrows`
    : e === `KeyW` || e === `KeyA` || e === `KeyS` || e === `KeyD`
      ? `wasd`
      : null;
}
var W = () => Ke[x.layout === `auto` ? `wasd` : x.layout],
  G = new Map(),
  Je = 0;
function K() {
  G = new Map();
  for (let [e, t] of Object.entries(W()))
    if (!x.binds[e]) for (let n of t) G.set(n, e);
  for (let [e, t] of Object.entries(x.binds)) for (let n of t) G.set(n, e);
  Je++;
}
var Ye = [];
function Xe(e) {
  Ye.push(e);
}
function Ze(e, t) {
  if (
    ((x.layout = e),
    t === `pick` && ((x.layoutPicked = !0), (x.binds = {})),
    K(),
    S(),
    mt(`controls`, e, t),
    t === `auto`)
  )
    for (let t of Ye) t(e);
}
function Qe(e) {
  return (
    e instanceof HTMLElement &&
    (e.isContentEditable ||
      e.tagName === `INPUT` ||
      e.tagName === `TEXTAREA` ||
      e.tagName === `SELECT`)
  );
}
function $e() {
  K();
  let e = (e) => {
      if (v.capturing || Qe(e.target)) return;
      if (x.layout === `auto`) {
        let t = qe(e.code);
        t && Ze(t, `auto`);
      }
      let t = G.get(e.code);
      t && (e.preventDefault(), !e.repeat && v.set(`kb`, t, !0));
    },
    t = (e) => {
      let t = G.get(e.code);
      t && v.set(`kb`, t, !1);
    },
    n = () => v.clear(`kb`);
  return (
    window.addEventListener(`keydown`, e),
    window.addEventListener(`keyup`, t),
    window.addEventListener(`blur`, n),
    () => {
      (window.removeEventListener(`keydown`, e),
        window.removeEventListener(`keyup`, t),
        window.removeEventListener(`blur`, n));
    }
  );
}
var et = {
    ArrowUp: `↑`,
    ArrowDown: `↓`,
    ArrowLeft: `←`,
    ArrowRight: `→`,
    ShiftLeft: `Shift`,
    ShiftRight: `Shift`,
  },
  tt = (e) => et[e] ?? e.replace(/^Key/, ``);
function q() {
  let e = v.lastSource;
  return e === `pad`
    ? `pad`
    : e === `touch` || document.body.classList.contains(`touch`)
      ? `touch`
      : `kb`;
}
