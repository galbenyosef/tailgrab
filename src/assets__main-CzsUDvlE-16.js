// assets__main-CzsUDvlE 16 — math
// Lines 4733-5018 of readable/assets__main-CzsUDvlE.pretty.js (statement-aligned).
function ll(e, t) {
  let n = document.createElement(`canvas`);
  ((n.width = Zc), (n.height = Qc));
  let r = n.getContext(`2d`, { willReadFrequently: !0 }),
    { floor: i, rest: a, lines: o } = cl(e, t),
    s = (e) => {
      let t = 1 / 0,
        n = -1 / 0,
        r = 1 / 0,
        i = -1 / 0;
      for (let a of e)
        for (let e = 0; e < a.pts.length; e += 2)
          ((t = Math.min(t, a.pts[e])),
            (n = Math.max(n, a.pts[e])),
            (r = Math.min(r, a.pts[e + 1])),
            (i = Math.max(i, a.pts[e + 1])));
      return { x0: t, x1: n, y0: r, y1: i };
    },
    c = s(i),
    l = a.length ? s([...a, ...o]) : c,
    u = (e, t) => Math.min((Zc - t) / (e.x1 - e.x0), (Qc - t) / (e.y1 - e.y0)),
    d = Math.min(Math.max(u(c, 24), u(l, 90)), u(c, 24) * 2.2),
    f = (e, t, n, r) =>
      t + r > n - r ? (t + n) / 2 : Math.min(Math.max(e, t + r), n - r),
    p = f((l.x0 + l.x1) / 2, c.x0 - 12 / d, c.x1 + 12 / d, Zc / 2 / d),
    m = f((l.y0 + l.y1) / 2, c.y0 - 12 / d, c.y1 + 12 / d, Qc / 2 / d);
  (r.setTransform(d, 0, 0, d, Zc / 2 - p * d, Qc / 2 - m * d),
    (r.lineJoin = `round`));
  let h = null,
    g = () => {
      h &&=
        ((r.fillStyle = h.fill),
        r.fill(),
        (r.strokeStyle = h.edge),
        (r.lineWidth = 1.1 / d),
        r.stroke(),
        null);
    },
    _ = (e) => {
      (h !== e.tint && (g(), r.beginPath(), (h = e.tint)),
        r.moveTo(e.pts[0], e.pts[1]));
      for (let t = 2; t < e.pts.length; t += 2)
        r.lineTo(e.pts[t], e.pts[t + 1]);
      r.closePath();
    },
    v = Er[t.size] / 2;
  r.beginPath();
  for (let [e, t] of [
    [-v, -v],
    [v, -v],
    [v, v],
    [-v, v],
  ])
    r.lineTo(...sl(e, -2.4, t));
  (r.closePath(),
    (r.fillStyle = `rgba(18, 10, 38, .2)`),
    r.fill(),
    i.sort((e, t) => e.depth - t.depth).forEach(_),
    g());
  let y = [...a, ...o].sort((e, t) => e.depth - t.depth);
  for (let e of y) {
    if (`tint` in e) {
      _(e);
      continue;
    }
    (g(), r.beginPath(), r.moveTo(e.pts[0], e.pts[1]));
    for (let t = 2; t < e.pts.length; t += 2) r.lineTo(e.pts[t], e.pts[t + 1]);
    ((r.strokeStyle = `#22181c`),
      (r.lineWidth = e.width + 2.4 / d),
      r.stroke(),
      (r.strokeStyle = Te.metal),
      (r.lineWidth = e.width),
      r.stroke());
  }
  return (g(), n);
}
var ul = new Map(),
  dl = 0,
  fl = [],
  pl = async (e) => {
    (dl >= 2 && (await new Promise((e) => fl.push(e))), dl++);
    try {
      return await e();
    } finally {
      (dl--, fl.shift()?.());
    }
  };
function ml(e, t) {
  let n = `${e}@${t}`,
    r = ul.get(n);
  return (
    r ||
      ((r = pl(async () => {
        let t = await Yc(e);
        await new Promise((e) => requestAnimationFrame(e));
        let n = await new Promise((n) => ll(e, t).toBlob(n, `image/webp`, 0.9));
        if (!n) throw Error(`no thumbnail`);
        return URL.createObjectURL(n);
      })),
      r.catch(() => ul.delete(n)),
      ul.set(n, r)),
    r
  );
}
var hl = new IntersectionObserver(
  (e) => {
    for (let t of e)
      t.isIntersecting && (hl.unobserve(t.target), t.target.load?.());
  },
  { rootMargin: `200px` },
);
function gl(e, t, n = ``) {
  let r = j(`span`, `park-thumb ${n}`);
  return (
    r.append(U(`parks`, `park-thumb-ph`)),
    (r.load = () => {
      ml(e, t).then(
        (e) => {
          let t = new Image();
          ((t.alt = ``),
            (t.decoding = `async`),
            (t.onload = () => r.classList.add(`has-img`)),
            (t.src = e),
            r.append(t));
        },
        () => {},
      );
    }),
    hl.observe(r),
    r
  );
}
function _l(e) {
  let t = e.obj;
  switch (t.kind) {
    case `tricks`: {
      let e = t.f.kinds ?? [];
      return e.includes(k.SPECIAL_AIR)
        ? `bolt`
        : e.includes(k.GRIND) || e.includes(k.SLIDE) || e.includes(k.WALLRIDE)
          ? `rail`
          : e.includes(k.LIP)
            ? `parks`
            : t.f.spin
              ? `spin`
              : `deck`;
    }
    case `gaps`:
      return `gap`;
    case `grind`:
      return `rail`;
    case `manual`:
      return `deck`;
    case `best`:
    case `chain`:
    case `combos`:
    case `bank`:
      return `target`;
    case `matches`:
    case `modes`:
      return `play`;
    case `wins`:
    case `runs`:
    case `runScore`:
      return `career`;
    case `parks`:
      return `parks`;
    case `pickups`:
      return `coin`;
  }
}
function vl(e) {
  let t = Math.max(0, Math.floor(e / 1e3)),
    n = Math.floor(t / 86400),
    r = Math.floor((t % 86400) / 3600),
    i = Math.floor((t % 3600) / 60);
  return n ? `${n}d ${r}h` : r ? `${r}h ${i}m` : i ? `${i}m` : `${t}s`;
}
function yl(e, t) {
  return ra(t, e.missions[t].period) - vn();
}
function bl(e) {
  return da.some((t) => e.missions[t].period > 0 && yl(e, t) <= 0);
}
function xl(e, t) {
  let n = j(`div`, `xp-bar ms-bar ${ea(t) ? `full` : ``}`),
    r = j(`i`, ``);
  return (
    (r.style.width = `${Math.round(Math.min(1, t.n / t.goal) * 100)}%`),
    n.append(r, j(`span`, `xp-txt`, na(e, t))),
    n
  );
}
function Sl(e, t, n) {
  let r = j(`span`, `ms-clock`),
    i = j(`span`, ``);
  r.append(U(`clock`), i);
  let a = !1,
    o = () => {
      let t = N.profile;
      if (!t) return;
      let r = yl(t, e);
      ((i.textContent = vl(r)), r <= 0 && !a && ((a = !0), n?.()));
    };
  o();
  let s = setInterval(() => {
    r.isConnected ? o() : clearInterval(s);
  }, 1e3);
  return (t.addEventListener(`abort`, () => clearInterval(s)), r);
}
var Cl = null;
function wl(e) {
  Cl = e;
}
function Tl(e, t) {
  let n = new Map(),
    r = 0,
    i = (e, t, n) => `${e}:${t.missions[e].period}:${n.id}`;
  return M((a, o) => {
    let s = [];
    for (let e of da)
      for (let t of a.missions[e].slots) {
        let r = i(e, a, t),
          o = n.get(r);
        n.set(r, t.n);
        let c = aa(t.id);
        o === void 0 ||
          t.n <= o ||
          ea(t) ||
          !c ||
          ((e !== `weekly` ||
            Math.floor((o / t.goal) * 4) !== Math.floor((t.n / t.goal) * 4)) &&
            s.push({ c: e, def: c, s: t, k: t.n / t.goal }));
      }
    let c = performance.now();
    if (!t() || !s.length || o.some((e) => e.kind === `mission`) || c - r < 3e3)
      return;
    r = c;
    let l = s.sort((e, t) => t.k - e.k)[0];
    e(fa(l.def, l.s), U(`missions`));
  });
}
function El(e = `community`) {
  return {
    id: `parks`,
    title: e === `mine` ? `Park Maker` : `Parks`,
    hue: `#1FC7E8`,
    build(t) {
      let n = (e) => t.resolve(e),
        r = j(`div`, `pk-body`);
      (r.append(
        Al(n, t.signal, e === `community`),
        jl(n, t.signal, e === `mine`),
      ),
        t.body.append(r));
    },
  };
}
var Dl = (e, t) => `${e.toLocaleString()} ${t}${e === 1 ? `` : `s`}`;
function Ol(e) {
  let t = j(`span`, `pk-live`);
  return (t.append(j(`i`), `${e} skating`), t);
}
function kl(e, t, n) {
  let r = j(`button`, `pk-card`);
  ((r.type = `button`),
    (r.dataset.code = e.code),
    r.style.setProperty(`--i`, String(t)));
  let i = gl(e.code, e.updatedAt, `pk-art`);
  e.players && i.append(Ol(e.players));
  let a = j(`span`, `pk-words`);
  return (
    a.append(
      j(`b`, `pk-name`, e.name),
      j(`span`, `pk-by`, `by ${e.owner}`),
      j(
        `span`,
        `pk-stats`,
        `${Dl(e.pieces, `piece`)} · ${Dl(e.plays, `visit`)}`,
      ),
    ),
    r.append(i, a),
    r.addEventListener(`click`, n),
    r
  );
}
