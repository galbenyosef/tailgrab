// assets/main-CzsUDvlE 19 — append
// Lines 5632-5840 of readable/assets/main-CzsUDvlE.pretty.js (statement-aligned).
function Hl(e = {}) {
  return {
    id: `help`,
    title: `How to skate`,
    hue: `#1FC7E8`,
    build(t) {
      let n = document.body.classList.contains(`touch`),
        r = n ? [`Touch`] : [`Keyboard`, `Gamepad`],
        i = j(`div`, `controls cols-${r.length}`);
      if (r.length > 1) {
        let e = j(`div`, `ctl ctl-head`);
        (e.append(j(`span`, ``), ...r.map((e) => j(`span`, ``, e))),
          i.append(e));
      }
      Vl.forEach(([e, t, r, a], o) => {
        if (n && !a) return;
        let s = j(`div`, `ctl`);
        (s.style.setProperty(`--i`, String(o)),
          s.append(
            j(
              `span`,
              `ctl-label`,
              n && a === `@chat` ? `Emotes (hold, slide to one, lift)` : e,
            ),
          ));
        let c = t.replace(/\{(\w+)\}/g, (e, t) => or(t, `kb`));
        for (let e of n ? [a] : [c, r]) {
          let t = j(`span`, `ctl-keys`),
            n = j(`kbd`, ``, e.startsWith(`@`) ? `` : e);
          (e.startsWith(`@`) && n.append(U(e.slice(1))),
            t.append(n),
            s.append(t));
        }
        i.append(s);
      });
      let a = j(
          `p`,
          `page-text tip`,
          `Tricks chain into combos: land clean to bank the points × the number of tricks. Manuals link landings together. Repeat a trick and it's worth less, so mix it up!`,
        ),
        o = j(`div`, `help-foot`);
      (o.append(
        V(`REPLAY TUTORIAL`, `ghost`, () => {
          ((J.tutorial = J.tips = 0), Ir(), t.resolve(), e.onReplay?.());
        }),
        V(`CREDITS`, `ghost`, () => void t.push(Bl())),
      ),
        t.body.append(i, a, o));
    },
  };
}
function Ul(e, t = {}) {
  return {
    id: `where`,
    title: `Where to?`,
    hue: `#2C8FD6`,
    build(n) {
      let r = j(`div`, `dest-grid`),
        i = (e) => n.resolve(e),
        a = e.kind === `park` ? e : null,
        o = t.skating?.() ?? 0,
        s = Wl(
          `plaza`,
          `board`,
          `Skate Hub`,
          o ? `Public · ${o} skating` : `Public hub`,
          e.kind === `public`,
          () => i({ kind: `public` }),
        ),
        c = j(`div`, `dest-modes`);
      for (let e of yr) c.append(F(`span`, `mode-chip`, q[e].icon, q[e].name));
      (s.append(c), r.append(s));
      let l = N.profile;
      if (l) {
        let n = Rc(l),
          a = Wl(
            n.parkId,
            `trophy`,
            `Career`,
            t.party
              ? `Solo only — leave the party to play`
              : `${n.name} · ${Fn(l, n.id).length}/${n.goals.length} goals`,
            e.kind === `career`,
            () => i({ kind: `career`, level: n.id }),
          );
        (t.party && ((a.disabled = !0), a.classList.add(`off`)), r.append(a));
      }
      let u = Wl(
        `lab`,
        `star`,
        `Map of the Day`,
        `Loading today's map…`,
        a?.via === `daily`,
        () => {},
      );
      (u.classList.add(`daily`),
        u
          .querySelector(`.dest-thumb`)
          ?.append(j(`span`, `dest-ribbon`, `TODAY`)),
        (u.disabled = !0),
        r.append(u),
        Jc().then(
          ({ park: e, endsAt: t }) => {
            if (n.signal.aborted) return;
            let r = u.querySelector(`.dest-sub`),
              a = u.querySelector(`.dest-title`);
            if (((u.disabled = !1), !e)) {
              ((a.textContent = `Map of the Day`),
                (r.textContent = `No map today — build one and publish it!`),
                u.addEventListener(`click`, () => void d()));
              return;
            }
            ((a.textContent = e.name),
              r.replaceChildren(
                `Map of the Day · by ${e.owner}${e.players ? ` · ● ${e.players} skating` : ``}`,
              ));
            let o = j(`span`, `dest-clock`);
            o.append(U(`clock`), j(`span`, ``, ``));
            let s = () => {
              o.lastElementChild.textContent = `new map in ${vl(t - vn())}`;
            };
            s();
            let c = setInterval(s, 1e3);
            (n.own(() => clearInterval(c)),
              u.querySelector(`.dest-words`).append(o),
              u.addEventListener(`click`, () =>
                i({ kind: `park`, code: e.code, via: `daily`, name: e.name }),
              ));
          },
          () => {
            n.signal.aborted ||
              (u.querySelector(`.dest-sub`).textContent =
                `Couldn't reach the server`);
          },
        ));
      let d = async () => {
          let e = await n.push(El(`mine`));
          e && i({ kind: `park`, code: e.code, via: e.via, name: e.name });
        },
        f = a?.via === `maker`;
      (r.append(
        Wl(
          `lab`,
          `hammer`,
          `Park Maker`,
          f
            ? `Building ${a.name || `Park ${a.code}`}`
            : `Build your own park, with your party`,
          f,
          () => void d(),
        ),
      ),
        a &&
          (a.via === `invite` || a.via === `community`) &&
          r.append(
            Wl(
              `lab`,
              null,
              a.name || `Park ${a.code}`,
              a.via === `invite`
                ? `You were invited to a player park`
                : `A community park`,
              !0,
              () => i(a),
            ),
          ),
        [...r.children].forEach((e, t) =>
          e.style.setProperty(`--i`, String(t)),
        ),
        n.body.append(r));
    },
  };
}
function Wl(e, t, n, r, i, a) {
  let o = j(`button`, `dest ${i ? `on` : ``}`);
  o.type = `button`;
  let s = j(`span`, `dest-words`);
  s.append(j(`span`, `dest-title`, n), j(`span`, `dest-sub`, r));
  let c = tr(e, `dest-thumb`);
  return (
    t && c.append(B(t, `dest-stk`)),
    o.append(c, s),
    i && (o.append(U(`check`, `dest-on`)), (o.dataset.autofocus = ``)),
    o.addEventListener(`click`, a),
    o
  );
}
var Gl = 5,
  Kl = (e, t) => (e.isConnected ? e.getBoundingClientRect() : t),
  ql = (e) => ({ x: e.left + e.width / 2, y: e.top + e.height / 2, r: e });
async function Jl(e, t) {
  let n = j(`div`, `reward-chest`);
  (n.append(
    U(`chest`),
    j(`div`, `reward-chest-kicker`, `STAR ROAD CHEST`),
    j(`div`, `reward-chest-xp`, `+${t.toLocaleString()} XP`),
  ),
    e.layer.append(n));
  let r = ir(n.firstElementChild);
  for (let t = 0; t < 2; t++)
    (L(n, `rattle`), Y.ui(`rattle`), await e.wait(220));
  (n.classList.add(`open`),
    Y.ui(`crate`),
    e.rays(r.x, r.y, 70, 1e3),
    e.confetti(r.x, r.y, 50, 1.3),
    await e.wait(900),
    n.classList.add(`out`),
    setTimeout(() => n.remove(), 400));
}
