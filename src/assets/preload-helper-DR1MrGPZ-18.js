// assets/preload-helper-DR1MrGPZ 18 — math
// Lines 5671-5911 of readable/assets/preload-helper-DR1MrGPZ.pretty.js (statement-aligned).
function ni(e) {
  let t = Zr.get(e.id);
  (t ? Zr.delete(e.id) : (t = { now: new Map(), last: new Map() }),
    Zr.set(e.id, t),
    Zr.size > Qr && Zr.delete(Zr.keys().next().value));
  let n = fr(e),
    r = e.pieces.filter((e) => e.kind === `floor`),
    i = (e, t) =>
      (
        r.find(
          (n) => Math.abs(e - n.x) <= n.w / 2 && Math.abs(t - n.z) <= n.d / 2,
        ) ?? r[0]
      )?.id ?? 0,
    a = qr(e),
    o = new Map(),
    s = [];
  for (let [r, c] of e.pieces.entries()) {
    let l = a[r],
      u = o.get(l) ?? t.now.get(l) ?? t.last.get(l) ?? ii(e, c, n, i);
    (o.set(l, u), s.push({ piece: c, key: l, chunk: u }));
  }
  ((t.last = t.now), (t.now = o));
  let c = 0,
    l = 0;
  for (let { chunk: e } of s) ((c += e.pcs.length), (l += e.idx.length));
  let u = {
      positions: new Float32Array(c * 3),
      normals: new Float32Array(c * 3),
      pieces: new Uint16Array(c),
      indices: new Uint32Array(l),
      surf: new Uint8Array(c),
    },
    d = 0,
    f = 0;
  for (let { chunk: e } of s) {
    (u.positions.set(e.pos, d * 3),
      u.normals.set(e.nrm, d * 3),
      u.pieces.set(e.pcs, d),
      u.surf.set(e.srf, d));
    for (let t = 0; t < e.idx.length; t++) u.indices[f + t] = e.idx[t] + d;
    ((d += e.pcs.length), (f += e.idx.length));
  }
  return {
    data: u,
    rails: (e) => {
      let t = [],
        n = [];
      for (let { chunk: r } of s) {
        let i = t.length;
        for (let e of r.raw)
          t.push({
            ...e,
            id: e.id + i,
            prev: e.prev < 0 ? -1 : e.prev + i,
            next: e.next < 0 ? -1 : e.next + i,
          });
        if (!r.reach) continue;
        let a = ri(r.reach, s);
        (r.cut?.sig !== a &&
          (r.cut = { sig: a, spans: r.raw.map((n, r) => Ar(e, t[i + r])) }),
          r.cut.spans.forEach((e, t) => {
            n[i + t] = e;
          }));
      }
      let r = jr(t, e, n);
      return (Br(r), Pr(r), r);
    },
  };
}
function ri(e, t) {
  let n = [];
  for (let { key: r, chunk: i } of t) {
    let t = i.box;
    t &&
      t.x1 >= e.x0 &&
      t.x0 <= e.x1 &&
      t.y1 >= e.y0 &&
      t.y0 <= e.y1 &&
      t.z1 >= e.z0 &&
      t.z0 <= e.z1 &&
      n.push(r);
  }
  return n.join(`
`);
}
function ii(e, t, r, a) {
  let o = [],
    s = [],
    c = [],
    l = [],
    u = [],
    d = t.rot ?? 0;
  if (t.kind === `floor` && r.length) {
    if (d !== 0) throw Error(`floor ${t.id}: holes need an unrotated floor`);
    _r(mr(t, r), t, t.id, 1, 0, o, s, c, l, u);
  } else {
    let r = n(d),
      f = i(d);
    for (let n of ur(e, t).prims)
      n.type !== `tube` &&
        n.collide &&
        (n.type === `extrude`
          ? vr(n, t, r, f, o, s, c, l, u)
          : _r(n, t, n.floorLike ? a(t.x, t.z) : t.id, r, f, o, s, c, l, u));
  }
  let f = [];
  Nr(e, t, f);
  let p = new Float32Array(o);
  return {
    pos: p,
    nrm: new Float32Array(s),
    pcs: new Uint16Array(c),
    srf: new Uint8Array(l),
    idx: new Uint32Array(u),
    box: ai(p, 0, 0, 0),
    raw: f,
    reach: f.length
      ? ai(
          new Float32Array(
            f.flatMap((e) => [e.ax, e.ay, e.az, e.bx, e.by, e.bz]),
          ),
          $r,
          ei,
          ti,
        )
      : null,
    cut: null,
  };
}
function ai(e, t, n, r) {
  if (!e.length) return null;
  let i = {
    x0: 1 / 0,
    x1: -1 / 0,
    y0: 1 / 0,
    y1: -1 / 0,
    z0: 1 / 0,
    z1: -1 / 0,
  };
  for (let t = 0; t < e.length; t += 3)
    ((i.x0 = Math.min(i.x0, e[t])),
      (i.x1 = Math.max(i.x1, e[t])),
      (i.y0 = Math.min(i.y0, e[t + 1])),
      (i.y1 = Math.max(i.y1, e[t + 1])),
      (i.z0 = Math.min(i.z0, e[t + 2])),
      (i.z1 = Math.max(i.z1, e[t + 2])));
  return (
    (i.x0 -= t),
    (i.x1 += t),
    (i.z0 -= t),
    (i.z1 += t),
    (i.y0 -= n),
    (i.y1 += r),
    i
  );
}
function oi(...e) {
  let t = 2166136261,
    n = e.join(`|`);
  for (let e = 0; e < n.length; e++)
    ((t ^= n.charCodeAt(e)), (t = Math.imul(t, 16777619)));
  return t >>> 0;
}
function si(e) {
  let t = e >>> 0;
  return () => {
    t = (t + 1831565813) >>> 0;
    let e = t;
    return (
      (e = Math.imul(e ^ (e >>> 15), e | 1)),
      (e ^= e + Math.imul(e ^ (e >>> 7), e | 61)),
      ((e ^ (e >>> 14)) >>> 0) / 4294967296
    );
  };
}
var ci = `modulepreload`,
  li = function (e) {
    return `/` + e;
  },
  ui = {},
  di = function (e, t, n) {
    let r = Promise.resolve();
    if (t && t.length > 0) {
      let e = document.getElementsByTagName(`link`),
        i = document.querySelector(`meta[property=csp-nonce]`),
        a = i?.nonce || i?.getAttribute(`nonce`);
      function o(e) {
        return Promise.all(
          e.map((e) =>
            Promise.resolve(e).then(
              (e) => ({ status: `fulfilled`, value: e }),
              (e) => ({ status: `rejected`, reason: e }),
            ),
          ),
        );
      }
      function s(e) {
        return import.meta.resolve
          ? import.meta.resolve(e)
          : new URL(e, import.meta.url).href;
      }
      r = o(
        t
          .map((t) => {
            if (((t = li(t, n)), (t = s(t)), t in ui)) return;
            ui[t] = !0;
            let r = t.endsWith(`.css`);
            for (let n = e.length - 1; n >= 0; n--) {
              let i = e[n];
              if (i.href === t && (!r || i.rel === `stylesheet`)) return;
            }
            let i = document.createElement(`link`);
            if (
              ((i.rel = r ? `stylesheet` : ci),
              r || (i.as = `script`),
              (i.crossOrigin = ``),
              (i.href = t),
              a && i.setAttribute(`nonce`, a),
              document.head.appendChild(i),
              r)
            )
              return new Promise((e, n) => {
                (i.addEventListener(`load`, e),
                  i.addEventListener(`error`, () =>
                    n(Error(`Unable to preload CSS for ${t}`)),
                  ));
              });
          })
          .filter((e) => e !== void 0),
      );
    }
    function i(e) {
      let t = new Event(`vite:preloadError`, { cancelable: !0 });
      if (((t.payload = e), window.dispatchEvent(t), !t.defaultPrevented))
        throw e;
    }
    return r.then((t) => {
      for (let e of t || []) e.status === `rejected` && i(e.reason);
      return e().catch(i);
    });
  };
