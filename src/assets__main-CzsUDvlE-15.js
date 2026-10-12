// assets__main-CzsUDvlE 15 — append
// Lines 4443-4732 of readable/assets__main-CzsUDvlE.pretty.js (statement-aligned).
function Bc(e, t) {
  let n = Et(t),
    r = j(`span`, `chip-stat`);
  if (
    (r.append(
      j(`b`, ``, `${Math.round(gn(t) * 100)}%`),
      j(`span`, ``, ` complete`),
    ),
    e.extra.replaceChildren(ka(), r),
    n.free > 0)
  ) {
    let t = V(``, `tiny primary pts-btn glow`, () => void e.push(Tc()));
    (t.append(
      B(`star`),
      j(`span`, ``, ` ${n.free} stat point${n.free > 1 ? `s` : ``}`),
    ),
      e.extra.append(t));
  }
}
function Vc(e) {
  let t = j(`div`, `road-tour`, `Tour ${e}`);
  return ((t.dataset.key = `tour:${e}`), t);
}
function Hc(e, t, n, r, i) {
  let a = nt(e, t.id),
    o = Mt(e, t.id),
    s = Fn(e, t.id).length,
    c = j(
      `button`,
      `lv-tile ${r ? `on` : ``} ${a ? `` : `locked`} ${o ? `cleared` : ``}`,
    );
  ((c.type = `button`),
    (c.dataset.level = t.id),
    (c.dataset.key = t.id),
    (c.dataset.sig = `${a}|${o}|${s}`),
    c.style.setProperty(`--i`, String(n)),
    c.append(tr(t.parkId, `lv-thumb`)),
    c.append(a ? j(`span`, `lv-num`, String(n + 1)) : U(`lock`, `lv-lock`)),
    o && c.append(B(`star`, `lv-star`)));
  let l = j(`span`, `lv-cap`);
  return (
    l.append(
      j(`span`, `lv-name`, t.name),
      j(`span`, `lv-count`, `${s}/${t.goals.length}`),
    ),
    c.append(l),
    c.addEventListener(`click`, i),
    c
  );
}
function Uc(e, t, n, r) {
  let i = nt(e, t.id),
    a = Mt(e, t.id),
    o = new Set(Fn(e, t.id)),
    s = Sr[t.parkId]?.name ?? t.parkId,
    c = j(`div`, `lv-top`),
    l = j(`div`, `lv-names`),
    u =
      (t.tour ?? 1) > 1 ? `Tour ${t.tour} · Level ${n + 1}` : `Level ${n + 1}`;
  if (
    (l.append(
      j(`div`, `lv-kicker`, s === t.name ? u : `${u} · ${s}`),
      j(`div`, `lv-title`, t.name),
    ),
    c.append(l),
    !i)
  ) {
    let e = ln[n - 1],
      t = j(`div`, `lv-locked`);
    return (
      t.append(
        U(`lock`),
        j(
          `span`,
          ``,
          `Clear ${e?.name ?? `the level before`} (${e?.need ?? 0} goals) to unlock.`,
        ),
      ),
      [c, t]
    );
  }
  let d = j(`p`, `lv-blurb`, t.blurb),
    f = [
      `+${hn.goal} XP`,
      ...(Et(e).earned < Qt * Tn.length ? [`a stat point`] : []),
    ].join(` and `),
    p =
      (t.tour ?? 1) === 1 && gn(e, 1) < 1 && Fc
        ? ` · 100% of Tour 1 unlocks ${Fc.name}`
        : ``;
  d.append(j(`span`, `lv-earn`, `Every goal: ${f}${p}`));
  let m = j(`ul`, `lv-goals`);
  t.goals.forEach((e, t) => {
    let n = j(`li`, `lv-goal ${o.has(e.id) ? `done` : ``}`);
    (n.style.setProperty(`--i`, String(t)),
      n.append(j(`span`, `tick`, ``), j(`span`, ``, e.text)),
      o.has(e.id) && n.firstElementChild.append(U(`check`)),
      m.append(n));
  });
  let h = j(`div`, `lv-foot`),
    g = j(`div`, `lv-reward ${a ? `got` : ``}`),
    _ = t.unlocks === void 0 ? Lc(t.id) : null,
    v = t.unlocks === void 0 ? null : qi(t.unlocks),
    y = null,
    b = ``;
  if (v) ((y = G(v, `lv-reward-art`, !ft(e).has(v.id))), (b = v.name));
  else if (_) {
    let e = Me(oi());
    ((e[_.cat] = _.item.id),
      (y = G(e, `lv-reward-art`, !a)),
      (b = `${_.item.name} (${Ic[_.cat]})`));
  }
  let x = j(`div`, `lv-reward-words`);
  (x.append(
    j(
      `span`,
      `lv-reward-kicker`,
      a
        ? `Unlocked`
        : `Land ${t.need - Math.min(t.need, o.size)} more to unlock`,
    ),
    j(`b`, ``, b),
  ),
    y && g.append(y),
    g.append(x),
    h.append(g));
  let S = e.career[t.id]?.best ?? 0;
  S && h.append(j(`div`, `lv-best`, `Best run ${S.toLocaleString()}`));
  let C = V(o.size ? `SKATE` : `START`, `big primary lv-go`, r);
  return ((C.dataset.autofocus = ``), h.append(C), [c, d, m, h]);
}
async function Wc(e) {
  return (await an.http.get(`/parks`, { query: { sort: e } })).data.parks;
}
async function Gc() {
  return (await an.http.get(`/me/parks`)).data.parks;
}
async function Kc(e) {
  return (await an.http.post(`/me/parks`, { body: { name: e } })).data.code;
}
async function qc(e) {
  await an.http.delete(`/me/parks/:code`, { params: { code: e } });
}
async function Jc() {
  return (await an.http.get(`/parks/daily`)).data;
}
async function Yc(e) {
  return (await an.http.get(`/parks/:code/doc`, { params: { code: e } })).data
    .doc;
}
function Xc(e) {
  return I.link({ park: e });
}
var Zc = 480,
  Qc = 300,
  $c = 0.8660254,
  el = [1, 1, 1],
  tl = il([-0.25, 1, 0.65]),
  nl = [43, 29, 74],
  rl = 1.5;
function il(e) {
  let t = Math.hypot(e[0], e[1], e[2]) || 1;
  return [e[0] / t, e[1] / t, e[2] / t];
}
var al = new Map();
function ol(e, t, n) {
  let r = Math.max(0, t[0] * tl[0] + t[1] * tl[1] + t[2] * tl[2]),
    i = Math.round(r * 4) / 4,
    a = `${e}${i}${n}`,
    o = al.get(a);
  if (!o) {
    let t = parseInt((Te[e] ?? Te.concrete).slice(1), 16),
      r = (e) => {
        let n = (t, n) => Math.round(t + (n - t) * e);
        return `rgb(${n(t >> 16, nl[0])},${n((t >> 8) & 255, nl[1])},${n(t & 255, nl[2])})`;
      },
      s = r(0.42 * (1 - i));
    ((o = { fill: s, edge: n ? r(0.42 * (1 - i) + 0.22) : s }), al.set(a, o));
  }
  return o;
}
var sl = (e, t, n) => [(e - n) * $c, (e + n) * 0.5 - t * rl];
function cl(e, t) {
  let n = Fr(e, t),
    r = [],
    i = [],
    a = [];
  for (let e of n.pieces) {
    let t = e.kind === `floor` ? r : i,
      o = e.rot ?? 0,
      s = Math.cos(o),
      c = Math.sin(o),
      l = e.x,
      u = e.y ?? 0,
      d = e.z,
      f = (e, t) => l + e * s + t * c,
      p = (e, t) => d - e * c + t * s,
      m = (e, n, r, i = !0) => {
        let a = il([n[0] * s + n[2] * c, n[1] / rl, -n[0] * c + n[2] * s]);
        if (a[0] * el[0] + a[1] * el[1] + a[2] * el[2] <= 1e-6) return;
        let o = [],
          l = 0;
        for (let t = 0; t < e.length; t += 3) {
          let n = f(e[t], e[t + 2]),
            r = u + e[t + 1],
            i = p(e[t], e[t + 2]);
          (o.push(...sl(n, r, i)), (l += n + r + i));
        }
        t.push({ pts: o, depth: l / (e.length / 3), tint: ol(r, a, i) });
      };
    for (let t of fe(n, e).prims) {
      if (t.type === `tube`) {
        let e = t.path,
          n = [],
          r = 0;
        for (let t = 0; t < e.length; t += 3) {
          let i = f(e[t], e[t + 2]),
            a = u + e[t + 1],
            o = p(e[t], e[t + 2]);
          (n.push(...sl(i, a, o)), (r += i + a + o));
        }
        a.push({
          pts: n,
          depth: r / (e.length / 3) + 0.5,
          width: Math.max(t.radius * 2, 0.1),
        });
        continue;
      }
      if (t.render) {
        if (t.type === `extrude`) {
          let e = t.profile,
            n = e.length / 2;
          for (let r = 0; r < n; r++) {
            if (t.hidden[r]) continue;
            let i = (r + 1) % n,
              a = e[r * 2],
              o = e[r * 2 + 1],
              s = e[i * 2],
              c = e[i * 2 + 1],
              l = Math.hypot(s - a, c - o) || 1;
            m(
              [t.x0, o, a, t.x1, o, a, t.x1, c, s, t.x0, c, s],
              [0, -(s - a) / l, (c - o) / l],
              t.edgeSkin?.[r] ?? t.skin,
            );
          }
          for (let [r, i] of [
            [t.x1, 1],
            [t.x0, -1],
          ]) {
            let a = [];
            for (let t = 0; t < n; t++) a.push(r, e[t * 2 + 1], e[t * 2]);
            m(a, [i, 0, 0], t.skin);
          }
        } else {
          let e = t.pos,
            n = t.tris;
          for (let r = 0; r < n.length; r += 3) {
            let i = n[r] * 3,
              a = n[r + 1] * 3,
              o = n[r + 2] * 3,
              s = e[a] - e[i],
              c = e[a + 1] - e[i + 1],
              l = e[a + 2] - e[i + 2],
              u = e[o] - e[i],
              d = e[o + 1] - e[i + 1],
              f = e[o + 2] - e[i + 2];
            m(
              [
                e[i],
                e[i + 1],
                e[i + 2],
                e[a],
                e[a + 1],
                e[a + 2],
                e[o],
                e[o + 1],
                e[o + 2],
              ],
              il([c * f - l * d, l * u - s * f, s * d - c * u]),
              t.skins[r / 3],
              !1,
            );
          }
        }
      }
    }
  }
  return { floor: r, rest: i, lines: a };
}
