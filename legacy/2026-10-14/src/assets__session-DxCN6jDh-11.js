// assets__session-DxCN6jDh 11 — color
// Lines 3421-3768 of readable/assets__session-DxCN6jDh.pretty.js (statement-aligned).
function $(e, t = ``, n = ``) {
  let r = document.createElement(e);
  return (t && (r.className = t), n && (r.textContent = n), r);
}
var ra = Object.assign({
  "./parkModel.ts": () =>
    ne(
      () => import(`./parkModel-D9KlCEyZ.js`),
      __vite__mapDeps([
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
        20,
      ]),
    ),
});
async function ia(e, t) {
  let n = ra[`./parkModel.ts`];
  if (n)
    try {
      return await (await n()).loadPark(e, t);
    } catch (e) {
      console.warn(`[park] baked park unavailable, using recipe mesh`, e);
    }
  let { group: r, zoneOf: i } = Pn(e);
  return {
    group: r,
    zoneOf: i,
    paint: () => {},
    update: () => {},
    rebuild(e) {
      let t = r.children[0],
        n = Pn(e).group.children[0];
      (t.geometry.dispose(), (t.geometry = n.geometry));
    },
    dispose: () => r.removeFromParent(),
  };
}
var aa = [
    {
      secret: `saci`,
      park: `schoolyard`,
      x: 34,
      y: 1.4,
      z: -8,
      nx: 1,
      nz: 0,
      w: 4,
      h: 2,
      lines: [`REDEMOINHO`, `SPIN THREE TIMES ROUND`, `THEN STAND ON ONE LEG`],
      color: `#FF5A36`,
    },
    {
      secret: `curupira`,
      park: `city`,
      x: -44,
      y: 2.1,
      z: -162,
      nx: 0,
      nz: 1,
      w: 6,
      h: 3,
      lines: [`PÉS PRA TRÁS`, `HIS TRACKS RUN BACKWARDS`, `25 IN A ROW`],
      color: `#FF8A1F`,
    },
    {
      secret: `varginha`,
      park: `city`,
      x: -11,
      y: 2.66,
      z: 160,
      nx: 0,
      nz: -1,
      w: 6,
      h: 3,
      lines: [`ABDUZIDO`, `HANG 1.8 SECONDS`, `THEY'RE WATCHING`],
      color: `#1FC7E8`,
    },
    {
      secret: `abominollie`,
      park: `hangar`,
      x: 37,
      y: 5.05,
      z: -25,
      nx: -1,
      nz: 0,
      w: 5,
      h: 2.5,
      lines: [`ONE GIANT OLLIE`, `NO GRABS NO FLIPS NO SPINS`, `28 METRES`],
      color: `#8FD3F5`,
    },
    {
      secret: `itsy`,
      park: `mall`,
      x: -40,
      y: 5,
      z: -0.5,
      nx: 1,
      nz: 0,
      w: 4,
      h: 2,
      lines: [`UP THE WATER SPOUT`, `8 WALLRIDES`, `1 COMBO`],
      color: `#1FC7E8`,
    },
    {
      secret: `grindula`,
      park: `bridge`,
      x: 4,
      y: 1.4,
      z: 10.5,
      nx: 0,
      nz: 1,
      w: 4,
      h: 2,
      lines: [`COUNT TO 13`, `ON THE RAILS`, `BEFORE DAWN`],
      color: `#FF3D7F`,
    },
    {
      secret: `jester`,
      park: `pier`,
      x: 7,
      y: 1.4,
      z: 20.5,
      nx: 0,
      nz: -1,
      w: 4,
      h: 2,
      lines: [`JUGGLE THREE`, `IN ONE AIR`],
      color: `#FFD21F`,
    },
    {
      secret: `chupacabra`,
      park: `plaza`,
      x: 32.5,
      y: 0.75,
      z: -8,
      nx: 0,
      nz: -1,
      w: 3,
      h: 0.7,
      lines: [`TAG THE G.O.A.T.`, `THREE TIMES`],
      color: `#FF5A36`,
    },
    {
      secret: `sentai`,
      park: `warehouse`,
      x: -32,
      y: 1.65,
      z: 17,
      nx: 1,
      nz: 0,
      w: 5,
      h: 2.5,
      lines: [`GATTAI!`, `FLIP GRAB GRIND MANUAL LIP`, `FINISH ON A SPECIAL`],
      color: `#EE2A2A`,
    },
  ],
  oa = (e) => aa.filter((t) => t.park === e && xn(t.secret)),
  sa = null,
  ca = 0.01,
  la = 0.04,
  ua = class {
    group = new i();
    tags = [];
    pxPerM;
    off = null;
    fontReady = !1;
    constructor(e, t = !1) {
      this.pxPerM = t ? 128 : 256;
      for (let t of oa(e)) {
        let e = document.createElement(`canvas`);
        ((e.width = Math.round(t.w * this.pxPerM)),
          (e.height = Math.round(t.h * this.pxPerM)));
        let r = new l(e);
        r.colorSpace = a;
        let i = m({
            map: r,
            transparent: !0,
            depthWrite: !1,
            polygonOffset: !0,
            polygonOffsetFactor: -1,
            polygonOffsetUnits: -4,
          }),
          o = new f(new n(t.w, t.h), i);
        (o.position.set(t.x + t.nx * la, t.y, t.z + t.nz * la),
          (o.rotation.y = Math.atan2(t.nx, t.nz)),
          (o.visible = !1),
          this.group.add(o),
          this.tags.push({ r: t, canvas: e, tex: r, mesh: o, crowned: null }));
      }
      this.tags.length &&
        (tn().then(() => {
          ((this.fontReady = !0), this.paint());
        }),
        (this.off = Xt(() => this.paint())));
    }
    seat(e) {
      let t = new u(),
        n = new p();
      for (let r of this.tags) {
        let { r: i } = r;
        (n.set(i.nx, 0, i.nz),
          t.set(
            new p(i.x + i.nx * 0.4, i.y, i.z + i.nz * 0.4),
            n.clone().negate(),
          ),
          (t.far = 0.6));
        let a = t
          .intersectObject(e, !0)
          .find((e) => e.object !== r.mesh && e.object.visible);
        a && r.mesh.position.copy(a.point).addScaledVector(n, ca);
      }
    }
    update(e, t) {
      if (this.fontReady)
        for (let n of this.tags)
          n.mesh.visible = e.distanceTo(n.mesh.position) < t;
    }
    paint() {
      if (this.fontReady)
        for (let e of this.tags) {
          let t = nn(Zt.profile, e.r.secret);
          t !== e.crowned &&
            ((e.crowned = t), da(e.canvas, e.r, t), (e.tex.needsUpdate = !0));
        }
    }
    dispose() {
      this.off?.();
      for (let e of this.tags)
        (e.mesh.geometry.dispose(), e.mesh.material.dispose(), e.tex.dispose());
      this.group.removeFromParent();
    }
  };
function da(e, t, n) {
  let r = e.getContext(`2d`);
  sa ??= document
    .createElement(`canvas`)
    .getContext(`2d`, { willReadFrequently: !0 });
  let i = e.width,
    a = e.height;
  r.clearRect(0, 0, i, a);
  let o = { ctx: r, octx: sa, font: an, size: 1, color: t.color },
    s = a * 0.16,
    c = [];
  t.lines.forEach((e, t) => {
    let n = a * (t === 0 ? 0.36 : 0.22);
    r.font = sn(o, n);
    let l = r.measureText(e).width * 0.93;
    ((o.size = Math.floor(l > i * 0.92 ? (n * i * 0.92) / l : n)),
      (r.font = sn(o)),
      (s += o.size * 0.92));
    let u = (i - r.measureText(e).width * 0.93) / 2;
    (c.push({ letters: dn(o, e, u, s), size: o.size }), (s += o.size * 0.12));
  });
  for (let e of c) {
    o.size = e.size;
    for (let t of e.letters) $t(o, t, !0);
    if (n) for (let t of e.letters) ln(o, t);
    for (let t of e.letters) en(o, t);
  }
  n && c[0]?.letters.length && ((o.size = c[0].size), un(o, c[0].letters[0]));
}
function fa(e) {
  if (!e.layout.arena) return null;
  let t = e.bounds,
    n = te(e.layout),
    i = [],
    a = [],
    o = [],
    s = (t, r, s, c) => {
      let l = Math.max(1, Math.ceil(Math.hypot(s - t, c - r) / 2)),
        u = i.length / 3;
      for (let a = 0; a <= l; a++) {
        let u = t + ((s - t) * a) / l,
          d = r + ((c - r) * a) / l,
          f = n ? n.y(u, d) : ee(e, u, d);
        (i.push(u, f, d, u, f + 1.6, d), o.push(0.5, 0));
      }
      for (let e = 0; e < l; e++) {
        let t = u + e * 2;
        a.push(t, t + 2, t + 1, t + 1, t + 2, t + 3);
      }
    };
  (s(t.x0, t.z0, t.x1, t.z0),
    s(t.x1, t.z0, t.x1, t.z1),
    s(t.x1, t.z1, t.x0, t.z1),
    s(t.x0, t.z1, t.x0, t.z0));
  let l = new d();
  l.setAttribute(`position`, new c(new Float32Array(i), 3));
  let u = new Float32Array((i.length / 3) * 4);
  for (let e = 0; e < o.length; e++) u.set([1, 0.24, 0.5, o[e]], e * 4);
  (l.setAttribute(`color`, new c(u, 4)), l.setIndex(a));
  let p = new f(
    l,
    new r({ vertexColors: !0, transparent: !0, side: 2, depthWrite: !1 }),
  );
  return (
    (p.name = `arena-fence`),
    (p.userData.noOutline = !0),
    (p.renderOrder = 5),
    p
  );
}
var pa = new e(0.42, 0.56, 28).rotateX(-Math.PI / 2).translate(0, 0.03, 0);
function ma(e, t) {
  let n = new f(
    pa,
    new r({
      color: Mn[e] ?? `#fff`,
      transparent: !0,
      opacity: t ? 0.9 : 0.75,
      side: 2,
      forceSinglePass: !0,
      depthWrite: !1,
    }),
  );
  return ((n.renderOrder = 2), n);
}
function ha(e, t, n) {
  (e.position.copy(t.root.position),
    e.quaternion.copy(t.root.quaternion),
    (e.visible = t.root.visible && n !== A.AIR && n !== A.BAIL));
}
function ga(e, t, n = null) {
  let r = Yt(An(t.skater, t.look));
  return (
    (r.col = n),
    {
      view: r,
      sk: t,
      frame: qt(),
      anim: new ta(t),
      sid: e,
      lastMode: -1,
      ring: ma(t.color, !1),
      lag: 0,
      skips: 0,
    }
  );
}
var _a = 4,
  va = 5,
  ya = new t(),
  ba = new s(),
  xa = new o();
function Sa(e) {
  return ya.setFromProjectionMatrix(
    ba.multiplyMatrices(e.projectionMatrix, e.matrixWorldInverse),
  );
}
