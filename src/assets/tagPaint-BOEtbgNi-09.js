// assets/tagPaint-BOEtbgNi 09 — kind
// Lines 3761-4099 of readable/assets/tagPaint-BOEtbgNi.pretty.js (statement-aligned).
function kr(e, t) {
  return (
    !!e &&
    !!ke(t) &&
    (e.secrets.includes(t) || mr(e, `secrets`) || e.cheats.includes(`secret`))
  );
}
function Ar(e, t) {
  return !!e && e.secrets.includes(t);
}
var jr = [`top`, `bottom`, `hat`, `acc`];
function Mr(e) {
  if (e.startsWith(`color:`)) return !!ve(e);
  let t = e.split(`:`)[0];
  return t === `pro` || t === `skin` || t in ge;
}
function Nr() {
  return {
    v: 3,
    name: ``,
    named: !1,
    xp: 0,
    stats: { air: 0, speed: 0, spin: 0, balance: 0 },
    career: {},
    plaza: [],
    extraSkaters: [],
    starter: null,
    ads: [],
    cheats: [],
    secrets: [],
    kept: [],
    seeded: !1,
    life: {
      banked: 0,
      bestCombo: 0,
      runs: 0,
      matches: 0,
      wins: 0,
      missions: 0,
      bails: 0,
    },
    custom: null,
    missions: Ie(),
    coins: 0,
    bought: {},
    found: [],
    drops: { day: 0, got: [] },
    adDay: 0,
    adTopUps: 0,
    paid: [],
    tutored: !1,
  };
}
var J = (e, t = 2 ** 53 - 1) =>
    typeof e == `number` && Number.isFinite(e)
      ? Math.max(0, Math.min(t, Math.floor(e)))
      : 0,
  Y = (e) =>
    Array.isArray(e) ? [...new Set(e.filter((e) => typeof e == `string`))] : [];
function Pr(e) {
  let t = Nr();
  if (!e || typeof e != `object`) return t;
  let n = e;
  ((t.name = typeof n.name == `string` ? n.name.slice(0, 32) : ``),
    (t.named =
      typeof n.named == `boolean`
        ? n.named
        : !!t.name && !Fe(t.name) && !Bn(t.name)),
    (t.xp = J(n.xp)));
  for (let e of K) t.stats[e] = J(n.stats?.[e], gr);
  if (n.career && typeof n.career == `object`)
    for (let [e, r] of Object.entries(n.career))
      Yn(e) &&
        r &&
        typeof r == `object` &&
        (t.career[e] = { goals: Y(r.goals), best: J(r.best) });
  ((t.plaza = Y(n.plaza)),
    (t.extraSkaters = Array.isArray(n.extraSkaters)
      ? [
          ...new Set(
            n.extraSkaters.filter(
              (e) => Number.isInteger(e) && e >= 0 && e < C.length,
            ),
          ),
        ]
      : []),
    (t.starter =
      typeof n.starter == `number` && yr.includes(n.starter)
        ? n.starter
        : null),
    (t.ads = Y(n.ads)),
    (t.cheats = Y(n.cheats).filter(pi)),
    (t.secrets = Y(n.secrets)),
    (t.kept = Y(n.kept)),
    (t.seeded = n.seeded === !0));
  let r = n.life;
  t.life = {
    banked: J(r?.banked),
    bestCombo: J(r?.bestCombo),
    runs: J(r?.runs),
    matches: J(r?.matches),
    wins: J(r?.wins),
    missions: J(r?.missions),
    bails: J(r?.bails),
  };
  let i = n.custom;
  if (
    (i &&
      typeof i == `object` &&
      typeof i.look == `string` &&
      i.look.length <= 160 &&
      ce(i.look) &&
      Number.isInteger(i.style) &&
      i.style >= 0 &&
      i.style < Me.length &&
      (t.custom = { look: i.look, style: i.style }),
    (t.missions = Le(n.missions)),
    (t.coins = J(n.coins)),
    n.bought && typeof n.bought == `object`)
  )
    for (let [e, r] of Object.entries(n.bought))
      typeof r == `number` && Number.isFinite(r) && (t.bought[e] = J(r));
  t.found = Y(n.found);
  let a = n.drops;
  (a &&
    typeof a == `object` &&
    (t.drops = {
      day: J(a.day),
      got: Array.isArray(a.got)
        ? [...new Set(a.got.filter((e) => Number.isInteger(e) && e >= 0))]
        : [],
    }),
    (t.adDay = J(n.adDay)),
    (t.adTopUps = J(n.adTopUps, 3)),
    (t.paid = Y(n.paid)),
    (t.tutored = n.tutored === !0));
  let o = n.v;
  return (o === 1 && Fr(t), (o === 1 || o === 2) && zr(t), t);
}
function Fr(e) {
  let t = X(e.xp).level,
    n = [0, 2, 3, 5, 6, 8, 9, ...(t >= 3 ? [16] : []), ...(t >= 5 ? [14] : [])];
  e.extraSkaters = [...new Set([...e.extraSkaters, ...n])];
}
var Ir = [
    `FF3D7F`,
    `FF8A1F`,
    `FFD21F`,
    `2FD67B`,
    `1FC7E8`,
    `4F6BFF`,
    `B9804F`,
    `8A5A3C`,
    `FFFFFF`,
    `FFF4E0`,
    `1D1A3A`,
    `3B2C4F`,
  ],
  Lr = [`FF7A7A`, `FFB38A`, `9BE08C`, `5C4033`, `6B6F80`],
  Rr = {
    "hat:bucket": { kind: `xp`, level: 2 },
    "hat:docker": { kind: `xp`, level: 3 },
    "top:tank": { kind: `xp`, level: 4 },
    "bottom:baggies": { kind: `xp`, level: 6 },
    "acc:backpack": { kind: `xp`, level: 8 },
    "top:longsleeve": { kind: `xp`, level: 10 },
    "hat:visor": { kind: `xp`, level: 12 },
  };
function zr(e) {
  let t = new Set([...Ir, ...(X(e.xp).level >= 5 ? Lr : [])]);
  for (let n in e.bought) /^color:[0-9A-F]{6}$/.test(n) && t.add(n.slice(6));
  let n = new Set();
  for (let r of Yr(e)) {
    let e = C[r];
    n.add(`head:${e.species}`);
    for (let t of jr) n.add(`${t}:${e.look[t]}`);
    for (let n of le) t.add(e.look.c[n].slice(1));
  }
  for (let [t, r] of Object.entries(Rr)) qr(e, r, t) && n.add(t);
  for (let e of t) for (let t of pe) n.add(de(t, e));
  let r = Jr(e);
  e.kept = [...new Set([...e.kept, ...[...n].filter((e) => !r.has(e))])];
}
function Br(e) {
  return 250 * e * (e - 1);
}
function X(e) {
  let t = 1;
  for (; e >= Br(t + 1);) t++;
  return { level: t, into: e - Br(t), span: Br(t + 1) - Br(t) };
}
function Vr(e, t) {
  let n = Yn(t),
    r = e.career[t]?.goals ?? [];
  return n ? r.filter((e) => n.goals.some((t) => t.id === e)) : [];
}
function Hr(e, t) {
  let n = Yn(t);
  return !!n && Vr(e, t).length >= n.need;
}
function Ur(e, t) {
  let n = Xn(t);
  return n === 0 || (n > 0 && Hr(e, z[n - 1].id));
}
function Wr(e, t) {
  let n = 0,
    r = 0;
  for (let i of z)
    (t === void 0 || (i.tour ?? 1) === t) &&
      ((n += Vr(e, i.id).length), (r += i.goals.length));
  return r ? n / r : 0;
}
function Gr(e) {
  let t = 0;
  for (let n of z) t += Vr(e, n.id).length;
  let n = K.reduce((t, n) => t + e.stats[n], 0);
  return {
    earned: t,
    spent: n,
    free: Math.max(0, Math.min(t, gr * K.length) - n),
  };
}
function Kr(e, t = !0) {
  let n = Ne(X(e.xp).level) << 16;
  return (
    t &&
      K.forEach((t, r) => {
        n |= (Math.min(gr, e.stats[t]) & 15) << (r * 4);
      }),
    n
  );
}
function qr(e, t, n) {
  if (!t) return !0;
  if (t.kind === `any`) return t.of.some((t) => qr(e, t, n));
  if (!e) return !1;
  switch (t.kind) {
    case `career`:
      return Hr(e, t.level);
    case `xp`:
      return X(e.xp).level >= t.level;
    case `feat`:
      return e.life[t.stat] >= t.n;
    case `complete`:
      return Wr(e, 1) >= 1;
    case `stars`:
      return e.missions.stars >= t.n;
    case `starter`:
      return e.starter !== null && n === `pro:${e.starter}`;
    case `ad`:
      return e.ads.includes(n);
    case `shop`:
      return n in e.bought;
  }
}
function Jr(e) {
  let t = new Set(),
    n = !!e?.cheats.includes(`skaters`) || mr(e, `pros`);
  for (let r of C)
    (n || qr(e, q(r.id), `pro:${r.id}`) || e?.extraSkaters.includes(r.id)) &&
      t.add(`pro:${r.id}`);
  for (let n of Ae) kr(e, n.key) && t.add(`skin:${n.key}`);
  for (let [n, r] of Object.entries(ge))
    for (let i of r) qr(e, i.unlock, `${n}:${i.id}`) && t.add(`${n}:${i.id}`);
  for (let n of pe)
    for (let r of _e) {
      let i = de(n, r.id);
      (fe[n].has(r.id) || (e && i in e.bought)) && t.add(i);
    }
  for (let n of e?.kept ?? []) t.add(n);
  for (let n of e?.paid ?? [])
    for (let e of (fr(n) && dr[n].keys) || []) t.add(e);
  return t;
}
function Yr(e) {
  let t = new Set();
  for (let n of Jr(e)) n.startsWith(`pro:`) && t.add(Number(n.slice(4)));
  return t;
}
function Xr(e) {
  let [t, n] = e.split(`:`);
  if (t === `pro`) return q(Number(n));
  if (t === `color`) {
    let t = ve(e);
    return t && !fe[t.tab].has(t.id) ? { kind: `shop`, price: 40 } : null;
  }
  return t in ge ? (me(t, n)?.unlock ?? null) : null;
}
function Zr(e) {
  if (!e) return ``;
  switch (e.kind) {
    case `any`:
      return e.of
        .filter(
          (e) => e.kind !== `ad` && e.kind !== `starter` && e.kind !== `shop`,
        )
        .map(Zr)
        .filter(Boolean)
        .join(` or `);
    case `starter`:
      return `Pick as your starter`;
    case `ad`:
      return `Watch an ad`;
    case `shop`:
      return ``;
    case `career`:
      return `Clear ${Yn(e.level)?.name ?? e.level} in Career`;
    case `xp`:
      return `Reach LV ${e.level}`;
    case `stars`:
      return `Collect ${e.n} stars on the Star Road`;
    case `complete`:
      return `Finish 100% of the Career`;
    case `feat`: {
      let t = e.n.toLocaleString(`en-US`);
      return {
        wins: `Win ${t} matches`,
        matches: `Play ${t} matches`,
        runs: `Skate ${t} career runs`,
        bestCombo: `Land a ${t}-point combo`,
        banked: `Bank ${t} combo points`,
        missions: `Complete ${t} missions`,
        bails: `Bail ${t} times`,
      }[e.stat];
    }
  }
}
function Qr(e) {
  if (!e) return null;
  if (e.kind !== `any`)
    return e.kind === `starter` || e.kind === `ad` || e.kind === `shop`
      ? null
      : e;
  for (let t of e.of) {
    let e = Qr(t);
    if (e) return e;
  }
  return null;
}
