// assets__tag-BoiZZ9xV 03 — append
// Lines 398-665 of readable/assets__tag-BoiZZ9xV.pretty.js (statement-aligned).
function z(o) {
  return {
    id: `tag`,
    backdrop: `solid`,
    hue: `#FF8A1F`,
    sticky: !o.rename,
    build(s) {
      o.rename || k(`name`, `tag`, `visible`);
      let c = ue(o.skater),
        u = pe(o.skater) ? me[o.skater] : null,
        p = te(),
        h = o.rename && r.profile?.named && !g(A.name) ? A.name : ``,
        y = !o.rename,
        b = o.color,
        x = !1,
        S = !1,
        C = !!o.rename && e(),
        w = () => C && !!h.trim() && v(h) !== r.profile?.name,
        T = n(`div`, `tg-art`),
        j = new _e(T, { font: _, sfx: I });
      s.own(() => j.dispose());
      let P = n(`div`, `tg-status`);
      P.setAttribute(`aria-live`, `polite`);
      let F = n(`div`, `tg-readout`),
        z = n(`input`, `tg-input`);
      ((z.id = `tag-name`),
        (z.maxLength = 16),
        (z.autocomplete = `off`),
        (z.spellcheck = !1),
        (z.enterKeyHint = `done`),
        (z.placeholder = L),
        z.setAttribute(`aria-label`, `Your skater name`));
      let ve = n(`label`, `tg-field`);
      ve.append(z);
      let B = n(`button`, `ico-btn tg-dice`);
      ((B.type = `button`),
        B.setAttribute(`aria-label`, `Roll a name`),
        B.append(O(`dice`)));
      let V = n(`div`, `tg-swatches`);
      N.forEach((e, t) => {
        let n = D(``, `swatch`, () => Z(t, !0));
        ((n.style.background = e),
          n.setAttribute(`aria-label`, `Paint colour ${t + 1}`),
          V.append(n));
      });
      let H = (e) => {
          let t = n(`span`, `tg-bump`, e === `prev` ? M().lb : M().rb);
          return (
            Object.assign(t.dataset, { pad: e, padLabel: `Colour` }),
            t.addEventListener(`click`, () =>
              Z(b + (e === `next` ? 1 : -1), !0),
            ),
            t
          );
        },
        U = D(`TAG IT`, `big primary tg-go`, () => void Q()),
        W = n(`div`, `tg-colors`);
      W.append(H(`prev`), V, H(`next`));
      let G = n(`div`, `tg-bar`);
      (G.append(ve, B, F, W, U),
        o.rename && G.append(D(`CANCEL`, `tg-cancel`, () => s.resolve(null))));
      let K = ge({
          onChar: (e) => be(e),
          onDel: () => Y(),
          onRoll: () => X(),
          onDone: () => void Q(),
        }),
        q = n(`div`, `tg-pad`);
      q.append(K);
      let ye = K.querySelectorAll(`.pg-k`)[10];
      (s.body.classList.add(`tg-body`),
        s.body.append(
          n(`div`, `tg-ground`),
          T,
          ie(u ?? c, `tg-rider`),
          n(`h1`, `tg-title`, o.rename ? `Retag your name` : `Tag your name`),
          P,
          G,
          q,
        ));
      function J(e, t = !1) {
        ((h = e.slice(0, 16)),
          t || (z.value = h),
          S && j.setName(h || L, !h),
          F.replaceChildren(
            n(`span`, `tg-readout-name ${h ? `` : `blank`}`, h || L),
            n(`span`, `tg-count`, `${h.length}/16`),
          ),
          U.replaceChildren(...(w() && !le() ? [O(`play`)] : []), `TAG IT`),
          (P.textContent = h.trim()
            ? (g(h) ??
              (w() && !le()
                ? fe === `off`
                  ? R
                  : `A new name costs one ad`
                : ``))
            : ``));
      }
      function be(e) {
        let t = l(y ? `` : h, e);
        if (t == null) {
          (m(F, `tg-shake`), I(`nope`));
          return;
        }
        ((y = !1), J(t));
      }
      function Y() {
        ((y = !1), J(h.slice(0, -1)));
      }
      function X() {
        ((y = !0), J(he(c.head)), m(B, `tg-roll`));
      }
      function Z(e, t = !1) {
        ((b = ((e % N.length) + N.length) % N.length),
          j.setColor(N[b]),
          V.querySelectorAll(`.swatch`).forEach((e, t) =>
            e.classList.toggle(`on`, t === b),
          ),
          t && I(`spray`, 0.15));
      }
      async function Q() {
        if (x) return;
        let e = h.trim() || (o.rename ? `` : de()),
          c = g(e);
        if (c) {
          ((P.textContent = c), m(G, `tg-shake`), I(`nope`));
          return;
        }
        let l = w();
        if (l && !oe()) {
          ((P.textContent = R), m(G, `tg-shake`), I(`nope`));
          return;
        }
        let u = document.activeElement;
        if (
          ((x = !0), s.root.classList.add(`busy`), z.blur(), l && !(await se()))
        ) {
          ((P.textContent = `No retag this time: the ad didn't finish`),
            (x = !1),
            s.root.classList.remove(`busy`),
            u?.focus());
          return;
        }
        e !== h && J(e);
        let d = r.account
          ? a(e, l).then(
              () => null,
              (e) => i(e),
            )
          : Promise.resolve(null);
        await j.burner(p);
        let f = await d;
        if (f) {
          (j.unburn(),
            (P.textContent = f),
            I(`nope`),
            (x = !1),
            s.root.classList.remove(`busy`));
          return;
        }
        (I(`fanfare`), o.rename || k(`name`, `tag`, `complete`));
        let _ = n(`div`, `shout tone-pink tg-shout`);
        (_.append(
          n(`div`, `shout-text`, `TAGGED!`),
          n(`div`, `shout-sub`, `${e} ${p}`.trim()),
        ),
          s.body.append(_));
        let v = j.centre();
        (re().confetti(v.x, v.y, 60, 1.2),
          j.spots(3).forEach((e, t) => {
            let n = E(`sparkle`, `tg-spark`);
            ((n.style.translate = `${e.x}px ${e.y}px`),
              (n.style.animationDelay = `${t * 90}ms`),
              T.append(n));
          }),
          (A.name = e),
          (A.color = b),
          ae(),
          ce(),
          await new Promise((e) => setTimeout(e, t() ? 400 : 1300)),
          s.resolve({ name: e, color: b }));
      }
      let xe = null,
        $ = () => {
          let e = ne() === `pad`;
          e !== xe &&
            ((xe = e),
            s.root.classList.toggle(`is-pad`, e),
            (z.readOnly = e),
            z.toggleAttribute(`data-autofocus`, !e),
            ye?.toggleAttribute(`data-autofocus`, e),
            e && z.blur());
        };
      $();
      let Se = window.setInterval($, 250);
      (s.own(() => clearInterval(Se)),
        z.addEventListener(`input`, () => {
          ((y = !1), J(z.value.replace(/\s+/g, ` `).replace(/^ /, ``), !0));
        }),
        z.addEventListener(`focus`, () => {
          y && z.select();
        }),
        z.addEventListener(`keydown`, (e) => {
          if (e.key !== `Escape`) {
            if ((e.stopPropagation(), e.key === ` ` && y)) {
              e.preventDefault();
              return;
            }
            e.key === `Enter` && !e.repeat && (e.preventDefault(), Q());
          }
        }),
        B.addEventListener(`click`, X));
      let Ce = new Set();
      (window.addEventListener(
        `keydown`,
        (e) => {
          if (!e.repeat) {
            Ce.add(e.code);
            return;
          }
          Ce.has(e.code) || (e.preventDefault(), e.stopImmediatePropagation());
        },
        { capture: !0, signal: s.signal },
      ),
        window.addEventListener(
          `keydown`,
          (e) => {
            if (
              !(
                x ||
                e.ctrlKey ||
                e.metaKey ||
                e.altKey ||
                document.activeElement === z
              ) &&
              ((e.key.length === 1 && e.key !== ` `) || e.key === `Backspace`)
            ) {
              if (
                (e.preventDefault(),
                e.stopPropagation(),
                ee.noteSource(`kb`),
                $(),
                e.key === `Backspace`)
              )
                Y();
              else {
                let t = y ? `` : h;
                ((y = !1), J(t + e.key));
              }
              z.focus({ preventScroll: !0 });
            }
          },
          { capture: !0, signal: s.signal },
        ),
        Z(b),
        J(h),
        f().then((e) => {
          s.signal.aborted ||
            ((S = !0),
            j.setName(h || L, t()),
            e ||
              d().then(() => {
                s.signal.aborted || j.relayout();
              }));
        }));
    },
  };
}
