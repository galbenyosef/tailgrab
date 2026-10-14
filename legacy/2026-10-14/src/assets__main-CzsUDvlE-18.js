// assets__main-CzsUDvlE 18 — append
// Lines 5319-5631 of readable/assets__main-CzsUDvlE.pretty.js (statement-aligned).
function Pl() {
  return {
    id: `settings`,
    title: `Settings`,
    hue: `#3B3A8F`,
    build(e) {
      let t = e.body;
      (t.classList.add(`set-list`),
        t.append(
          W(`Audio`),
          Fl(`Master`, `master`, 0, 1, 0.05),
          Fl(`Music`, `music`, 0, 1, 0.05),
          Fl(`Effects`, `sfx`, 0, 1, 0.05),
        ),
        t.append(
          W(`Game`),
          Ll(`Graphics`, `quality`, [
            [`auto`, `AUTO`],
            [`low`, `LOW`],
            [`med`, `MED`],
            [`high`, `HIGH`],
          ]),
          Ll(`Time of day`, `timeOfDay`, [
            [`auto`, `AUTO`],
            [`morning`, `MORNING`],
            [`day`, `DAY`],
            [`evening`, `DUSK`],
            [`night`, `NIGHT`],
          ]),
          Il(`Landing marker`, `landingMarker`),
          Il(`Skater warning glow`, `landingGlow`),
          Il(`Camera shake`, `shake`),
          Il(`Chat bubbles`, `bubbles`),
          Il(`Show ping`, `ping`),
          Il(`Show FPS`, `showFps`),
          Il(`Reduced motion`, `reducedMotion`),
        ),
        document.body.classList.contains(`touch`)
          ? t.append(
              W(`Touch`),
              Ll(`Joystick`, `touchStick`, [
                [`stay`, `STAYS PUT`],
                [`follow`, `FOLLOWS THUMB`],
              ]),
              Fl(`Button size`, `touchScale`, 0.7, 1.4, 0.05),
              Fl(`Opacity`, `touchOpacity`, 0.3, 1, 0.05),
              Il(`Left-handed`, `leftHanded`),
              Il(`Vibration`, `haptics`),
            )
          : Jt() && t.append(W(`Gamepad`), Il(`Rumble`, `haptics`)),
        matchMedia(`(any-pointer: fine)`).matches &&
          t.append(W(`Keyboard`), Rl(e.signal)));
    },
  };
}
function Fl(e, t, n, r, i) {
  let a = j(`label`, `set-row`),
    o = j(`input`, `slider`);
  ((o.type = `range`),
    (o.min = String(n)),
    (o.max = String(r)),
    (o.step = String(i)),
    (o.value = String(J[t])));
  let s = () =>
    o.style.setProperty(`--p`, `${((Number(o.value) - n) / (r - n)) * 100}%`);
  return (
    o.addEventListener(`input`, () => {
      ((J[t] = Number(o.value)), s(), Br());
    }),
    s(),
    a.append(j(`span`, `set-label`, e), o),
    a
  );
}
function Il(e, t) {
  let n = j(`label`, `set-row`),
    r = j(`input`, `switch`);
  return (
    (r.type = `checkbox`),
    (r.role = `switch`),
    (r.checked = J[t]),
    r.addEventListener(`change`, () => {
      ((J[t] = r.checked), Br());
    }),
    n.append(j(`span`, `set-label`, e), r),
    n
  );
}
function Ll(e, t, n) {
  let r = j(`div`, `set-row`),
    i = j(`div`, `seg`);
  (i.setAttribute(`role`, `radiogroup`), i.setAttribute(`aria-label`, e));
  for (let [e, r] of n) {
    let n = V(r, `seg-btn ${J[t] === e ? `on` : ``}`, () => {
      ((J[t] = e),
        i
          .querySelectorAll(`.seg-btn`)
          .forEach((e) => e.classList.toggle(`on`, e === n)),
        Br());
    });
    (n.setAttribute(`role`, `radio`), i.append(n));
  }
  return (r.append(j(`span`, `set-label`, e), i), r);
}
function Rl(e) {
  let t = j(`div`, `binds`),
    n = null;
  e.addEventListener(`abort`, () => n?.());
  let r = () => {
    t.replaceChildren();
    let e = j(`div`, `set-row`),
      i = j(`div`, `seg`);
    (i.setAttribute(`role`, `radiogroup`),
      i.setAttribute(`aria-label`, `Layout`));
    for (let [e, t] of [
      [`wasd`, `WASD`],
      [`arrows`, `ARROW KEYS`],
    ]) {
      let a = V(t, `seg-btn ${J.layout === e ? `on` : ``}`, () => {
        (n?.(), pr(e, `pick`), r());
      });
      (a.setAttribute(`role`, `radio`), i.append(a));
    }
    (e.append(j(`span`, `set-label`, `Layout`), i), t.append(e));
    for (let [e, i] of Nl) {
      let a = J.binds[e] ?? $n()[e],
        o = j(`div`, `set-row`),
        s = V([...new Set(a.map(rr))].join(` · `), `tiny ghost keycap`, () => {
          (n?.(),
            (s.textContent = `press a key…`),
            s.classList.add(`listening`));
          let t = (t) => {
            if (
              (t.preventDefault(),
              t.stopPropagation(),
              n?.(),
              t.code === `Escape`)
            ) {
              r();
              return;
            }
            J.layout === `auto` && (J.layout = `wasd`);
            let i = t.code.startsWith(`Shift`)
              ? [`ShiftLeft`, `ShiftRight`]
              : [t.code];
            for (let [t] of Nl) {
              let n = J.binds[t] ?? $n()[t];
              t !== e &&
                n.some((e) => i.includes(e)) &&
                (J.binds[t] = n.filter((e) => !i.includes(e)));
            }
            ((J.binds[e] = i), dr(), Br(), r());
          };
          (window.addEventListener(`keydown`, t, !0),
            (n = () => {
              (window.removeEventListener(`keydown`, t, !0), (n = null));
            }));
        });
      ((s.dataset.padSkip = ``),
        o.append(j(`span`, `set-label`, i), s),
        t.append(o));
    }
    t.append(
      V(`Reset keys`, `tiny ghost`, () => {
        ((J.binds = {}), dr(), Br(), r());
      }),
    );
  };
  return (r(), t);
}
var zl = [
  [`Game`, [[`Endel Dreyer`, `Game Developer`, `https://x.com/endel`]]],
  [
    `Built with`,
    [
      [`Colyseus`, `Multiplayer`, `https://colyseus.io`],
      [`Three.js`, `3D`, `https://threejs.org`],
    ],
  ],
  [`Music`, Ia.map((e) => [`“${e.title}”`, e.artist]), `note`],
  [
    `Fonts`,
    [
      [`Lilita One`, `Juan Montoreano`],
      [`Baloo 2`, `Ek Type`],
      [`Sedgwick Ave Display`, `Kevin Burke`],
    ],
  ],
];
function Bl() {
  return {
    id: `credits`,
    title: `Credits`,
    hue: `#2FD67B`,
    build(e) {
      let t = 0;
      for (let [n, r, i] of zl) {
        let a = j(`div`, `cred-list`);
        for (let [e, n, o] of r) {
          let r = j(`div`, `cred`);
          r.style.setProperty(`--i`, String(t++));
          let s = o && I.linksOut,
            c = j(s ? `a` : `span`, `cred-name`, e);
          (s &&
            Object.assign(c, { href: o, target: `_blank`, rel: `noopener` }),
            i && c.prepend(U(i, `cred-ico`)),
            r.append(c, j(`span`, `cred-role`, n)),
            a.append(r));
        }
        e.body.append(W(n), a);
      }
      e.body.append(
        j(`p`, `page-note`, `Fonts under the SIL Open Font License.`),
      );
    },
  };
}
var Vl = [
  [
    `Steer / spin / trick direction`,
    `{up}{left}{down}{right}`,
    `Left stick · D-pad`,
    `Stick (left thumb)`,
  ],
  [
    `Ollie (hold to crouch and pick up speed, release to pop)`,
    `{ollie}`,
    `✕ / A`,
    `OLLIE`,
  ],
  [
    `Brake · stand still (hold Ollie too to pop in place)`,
    `{down}`,
    `↓`,
    `Stick ↓`,
  ],
  [`Flip trick (+ direction)`, `{flip}`, `□ / X`, `FLIP`],
  [`Grab trick (+ direction, hold for points)`, `{grab}`, `○ / B`, `GRAB`],
  [
    `Grind / lip trick (near rails, ledges, coping)`,
    `{grind}`,
    `△ / Y`,
    `GRIND`,
  ],
  [`Spin`, `{spinL} · {spinR}`, `L1 · R1`, `⟲ · ⟳`],
  [`Look behind (hold)`, `{look}`, `R3 · right stick ↓`, `@eye`],
  [
    `Step off and walk (turn in place, ↓ backs up) · back on the board`,
    `{walk}`,
    `L3`,
    `@deck`,
  ],
  [`Manual`, `{up} then {down} (or {down} {up})`, `↑ ↓`, `Drag GRIND ↓ (or ↑)`],
  [`Manual trick: Grab in a manual (+ ← / →)`, `{grab}`, `○ / B`, `GRAB`],
  [
    `Special (meter full)`,
    `two taps + button`,
    `see card`,
    `two flicks + button`,
  ],
  [
    `Lip trick: Grind at the coping on vert (+ direction picks it), Ollie drops back in`,
    `{grind} · {ollie}`,
    `△ · ✕`,
    `GRIND · OLLIE`,
  ],
  [
    `Transfer: Ollie on the way up a vert air, or hold ↑ into it: over a spine or out of a pool`,
    `{ollie} · hold {up}`,
    `✕ / A · hold ↑`,
    `OLLIE · hold stick ↑`,
  ],
  [
    `Revert: Spin as you land from vert, then ↑ ↓ to manual`,
    `{spinL} / {spinR}`,
    `L1 / R1`,
    `⟲ / ⟳`,
  ],
  [
    `Pivot: Spin in a manual or a grind turns the board round`,
    `{spinL} / {spinR}`,
    `L1 / R1`,
    `⟲ / ⟳`,
  ],
  [
    `Ride fakie: tap Spin while rolling to turn the board round`,
    `{spinL} / {spinR}`,
    `L1 / R1`,
    `⟲ / ⟳`,
  ],
  [
    `Skate Hub: join a mode in its portal's gate · leave the queue`,
    `{grind} · hold {grab}`,
    `△ / Y · hold ○ / B`,
    `GRIND · hold GRAB`,
  ],
  I.freeChat
    ? [
        `Chat · Emotes (hold, point at one, let go)`,
        `Enter · hold G`,
        `@chat`,
        `@chat`,
      ]
    : [`Emotes (hold, point at one, let go)`, `hold G`, `@chat`, `@chat`],
  [`Reset to spawn`, `{reset}`, `Select`, ``],
  [
    `Menus: move · pick · back · switch tabs`,
    `Arrows/WASD · Enter · Esc · Q/E`,
    `D-pad · ✕/A · ○/B · L1/R1`,
    ``,
  ],
  [`Menu while skating (Skaters, Settings, queue, quit)`, `Esc`, `Start`, `☰`],
];
