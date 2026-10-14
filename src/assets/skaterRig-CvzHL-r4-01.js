// assets/skaterRig-CvzHL-r4 01 — math
// Lines 1-331 of readable/assets/skaterRig-CvzHL-r4.pretty.js (statement-aligned).
import {
  Jn as e,
  St as t,
  Ut as n,
  V as r,
  Xn as i,
  Yn as a,
  a as o,
  bt as s,
  c,
  ht as l,
  j as u,
  l as ee,
  mt as te,
  n as ne,
  r as d,
  xt as re,
  yr as f,
} from "./three.core-DVWDmH0S.js";
import { a as toonMaterial, i as patchToon, n as h } from "./toon-CycGToy9.js";
import "./tuning-D4mSK766.js";
import "./palette-DQTkVEn_.js";
import { r as ie, t as addOutlines } from "./outline-BufNikL2.js";
import {
  J as oe,
  K as se,
  c as g,
  et as _,
  tt as ce,
} from "./table-W1plLavt.js";
import { r as le } from "./poses-DwKBijP_.js";
import { c as v, g as ue, s as de } from "./types-DM-HODfo.js";
import { n as fe, r as pe } from "./skaterView-DCMhULBk.js";
import {
  a as me,
  c as he,
  d as ge,
  f as _e,
  i as ve,
  l as ye,
  m as be,
  o as y,
  p as xe,
  r as Se,
  s as Ce,
  u as b,
} from "./bailPhysics-C1H0uy1H.js";
import { a as we, i as Te, n as Ee, r as De, t as Oe } from "./kit-C-OErpbU.js";
import { n as ke, t as Ae } from "./GLTFLoader-BAb7LzOS.js";
var je = Ne(`#2A2238`),
  Me = [1, 1, 1];
function Ne(e) {
  let t = parseInt(e.slice(1), 16);
  return [((t >> 16) & 255) / 255, ((t >> 8) & 255) / 255, (t & 255) / 255];
}
function Pe(e) {
  let t = Math.floor(e),
    n = e - t;
  return n > 0.5 ? t + 1 : n < 0.5 || t % 2 == 0 ? t : t + 1;
}
function Fe(e) {
  return e.map((e) => Math.max(0, Math.min(255, Pe(e * 255))) / 255);
}
function Ie(e, t, n) {
  return Fe([
    e[0] + (t[0] - e[0]) * n,
    e[1] + (t[1] - e[1]) * n,
    e[2] + (t[2] - e[2]) * n,
  ]);
}
var x = (e) => 0.2126 * e[0] + 0.7152 * e[1] + 0.0722 * e[2];
function S(e, t) {
  switch (e[0]) {
    case `slot`:
      return Ne(t[e[1]]);
    case `lit`:
      return Ne(e[1]);
    case `shade`:
      return Ie(S(e[1], t), e[2] < 0 ? je : Me, Math.abs(e[2]));
    case `mix`:
      return Ie(S(e[1], t), S(e[2], t), e[3]);
    case `lumlt`:
      return x(S(e[1], t)) < e[2] ? S(e[3], t) : S(e[4], t);
    case `lumfar`:
      return Math.abs(x(S(e[1], t)) - x(S(e[2], t))) > e[3]
        ? S(e[4], t)
        : S(e[5], t);
    case `lumnear`:
      return Math.abs(x(S(e[1], t)) - x(S(e[2], t))) < e[3]
        ? S(e[4], t)
        : S(e[5], t);
  }
}
var Le = (e) => (e <= 0.04045 ? e / 12.92 : ((e + 0.055) / 1.055) ** 2.4);
function Re(e, t) {
  let n = new Uint8Array(e.length * 3);
  return (
    e.forEach((e, r) => {
      let i = S(e, t);
      for (let e = 0; e < 3; e++) n[r * 3 + e] = Math.round(Le(i[e]) * 255);
    }),
    n
  );
}
var ze = `/`.replace(/\/?$/, `/`),
  Be = 24;
function Ve(e) {
  let t = new Map();
  return (
    e.traverse((e) => {
      let n = e;
      if (!n.isMesh || typeof n.userData.item != `string`) return;
      let r = n.geometry,
        i = r.getAttribute(`position`).count,
        a = (e, t) => {
          let n = r.getAttribute(e);
          for (let e = 0; e < i; e++) t[e] = n.getX(e);
          return t;
        },
        o = new Uint8Array(i),
        s = new Int8Array(i * 3),
        c = r.getAttribute(`_ao`),
        l = r.getAttribute(`_outline`);
      for (let e = 0; e < i; e++) o[e] = Math.round(c.getX(e) * 255);
      for (let e = 0; e < i; e++)
        for (let t = 0; t < 3; t++)
          s[e * 3 + t] = Math.round(l.getComponent(e, t) * 127);
      (t.set(n.userData.item, {
        position: r.getAttribute(`position`).array,
        normal: r.getAttribute(`normal`).array,
        paint: a(`_paint`, new Uint16Array(i)),
        bone: a(`_bone`, new Uint8Array(i)),
        ao: o,
        outline: s,
        index: r.index.array,
      }),
        r.dispose());
    }),
    t
  );
}
var He = (e) => ({
    json: (e) =>
      fetch(`${ze}${e}`).then((t) => {
        if (!t.ok) throw Error(`${e}: ${t.status}`);
        return t.json();
      }),
    scene: (t) => e.loadAsync(`${ze}${t}`).then((e) => e.scene),
  }),
  SkaterKit = class n {
    manifest;
    body;
    board;
    heads = new Map();
    pending = new Map();
    protos = new Map();
    src;
    constructor(e, t, n, r) {
      ((this.manifest = e), (this.body = t), (this.board = n), (this.src = r));
    }
    static async load(e = He(new Ae())) {
      let [t, r, i] = await Promise.all([
        e.json(`skaters/kit/kit.json`),
        e.scene(`skaters/kit/body.glb`).then(Ve),
        e.scene(`skaters/kit/board.glb`).then(Ve),
      ]);
      return new n(t, r, i.get(`board`), e);
    }
    hasHead(e) {
      return this.heads.has(e);
    }
    loadHead(e) {
      let t = this.heads.get(e);
      if (t) return Promise.resolve(t);
      let n = this.pending.get(e);
      return (
        n ||
          ((n = this.src.scene(`skaters/kit/head-${e}.glb`).then((t) => {
            let n = Ve(t);
            return (this.heads.set(e, n), this.pending.delete(e), n);
          })),
          n.catch(() => this.pending.delete(e)),
          this.pending.set(e, n)),
        n
      );
    }
    proto(e) {
      let t = _(e),
        n = this.protos.get(t);
      if (n) return (this.protos.delete(t), this.protos.set(t, n), n.proto);
      let r = this.heads.get(e.head);
      if (!r) return null;
      let i = this.build(e, r);
      return (
        this.protos.set(t, { proto: i, users: 0, evicted: !1 }),
        this.evict(),
        i
      );
    }
    async protoAsync(e) {
      return (await this.loadHead(e.head), this.proto(e));
    }
    retain(e) {
      let t = this.protos.get(_(e.look));
      t && t.proto === e
        ? t.users++
        : (e.scene.userData.users = (e.scene.userData.users ?? 0) + 1);
    }
    release(e) {
      let t = this.protos.get(_(e.look));
      if (t && t.proto === e) {
        t.users = Math.max(0, t.users - 1);
        return;
      }
      ((e.scene.userData.users = Math.max(
        0,
        (e.scene.userData.users ?? 1) - 1,
      )),
        e.scene.userData.users || Ge(e));
    }
    evict() {
      for (let [e, t] of this.protos) {
        if (this.protos.size <= Be) break;
        (this.protos.delete(e),
          t.users > 0 ? (t.proto.scene.userData.users = t.users) : Ge(t.proto));
      }
    }
    colors(e, t) {
      return Te(e, Re(this.manifest.paint, t.c));
    }
    build(n, i) {
      let c = this.manifest.heads[n.head],
        l = Ee(n, c),
        u = l.body
          .filter((e) => this.body.has(e))
          .map((e) => ({
            mesh: we(this.body.get(e), c),
            dz: e.startsWith(`acc:`) ? l.back : 0,
          })),
        ee = De([
          ...u,
          ...l.head.map((e) => ({ mesh: i.get(e) })).filter((e) => e.mesh),
        ]),
        te = Re(this.manifest.paint, n.c),
        ne = Oe(n, c),
        d = ge.map((e, t) => {
          let n = new o();
          n.name = e.name;
          let r = ne[t],
            i = e.parent ? ne[_e[e.parent]] : [0, 0, 0];
          return (n.position.set(r[0] - i[0], r[1] - i[1], r[2] - i[2]), n);
        });
      ge.forEach((e, t) => {
        e.parent && d[_e[e.parent]].add(d[t]);
      });
      let f = new r();
      f.name = `skater-${_(n)}`;
      let p = new t({ vertexColors: !0 }),
        m = We(ee, te, !0);
      m.userData.inkHeadStart = u.reduce((e, t) => e + t.mesh.index.length, 0);
      let h = new a(m, p);
      h.name = `body`;
      let ie = new re(We(this.board, te, !1), p);
      return (
        (ie.name = `board`),
        f.add(d[0], h, ie),
        f.updateMatrixWorld(!0),
        h.bind(new e(d), new s()),
        { scene: f, look: n }
      );
    }
  };
function We(e, t, n) {
  let r = new ee();
  if (
    (r.setAttribute(`position`, new c(e.position, 3)),
    r.setAttribute(`normal`, new c(e.normal, 3)),
    r.setAttribute(`color`, new c(Te(e.paint, t), 3, !0)),
    r.setAttribute(`ao`, new c(e.ao, 1, !0)),
    r.setAttribute(`outlineNormal`, new c(e.outline, 3, !0)),
    n)
  ) {
    let t = e.bone.length,
      n = new Uint8Array(t * 4),
      i = new Uint8Array(t * 4);
    for (let r = 0; r < t; r++) ((n[r * 4] = e.bone[r]), (i[r * 4] = 255));
    (r.setAttribute(`skinIndex`, new c(n, 4)),
      r.setAttribute(`skinWeight`, new c(i, 4, !0)));
  }
  return (
    r.setIndex(new c(e.index, 1)),
    (r.userData.paint = e.paint),
    r.computeBoundingBox(),
    r.computeBoundingSphere(),
    r
  );
}
function Ge(e) {
  e.scene.traverse((e) => {
    let t = e;
    t.isMesh && (t.geometry.dispose(), t.material.dispose());
  });
}
var C = Math.PI * 2,
  w = (e) => e * e * (3 - 2 * e),
  T = new n(),
  Ke = new f(),
  qe = new f(),
  E = new f(),
  D = new f(),
  O = new f(),
  k = new u(0, 0, 0, `YXZ`),
  Je = new n(0, 1, 0, 0),
  Ye = 0.12;
function Xe(e) {
  if (e >= 1) return 0;
  let t = 1 - e;
  return t * t * t * t * (1 + 4 * e);
}
var Ze = 20,
  Qe = 12,
  $e = 4;
function et(e, t, n, r) {
  (T.copy(e).invert().premultiply(t).normalize(),
    T.w < 0 && T.set(-T.x, -T.y, -T.z, -T.w));
  let i = Math.hypot(T.x, T.y, T.z);
  return i < 1e-9
    ? r.set(0, 0, 0)
    : (r.set(T.x, T.y, T.z).multiplyScalar((2 * Math.atan2(i, T.w)) / i / n),
      r.length() > Qe ? r.setLength(Qe) : r);
}
