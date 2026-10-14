// assets/main-CzsUDvlE 02 — append
// Lines 344-642 of readable/assets/main-CzsUDvlE.pretty.js (statement-aligned).
import {
  _ as Ci,
  a as wi,
  b as Ti,
  c as Ei,
  d as Di,
  f as Oi,
  g as ki,
  h as Ai,
  i as ji,
  l as Mi,
  m as Ni,
  o as Pi,
  p as Fi,
  r as Ii,
  s as Li,
  t as Ri,
  u as zi,
  v as Bi,
  x as Vi,
  y as Hi,
} from "./catalog-CGuOpeY8.js";
import {
  a as Ui,
  c as Wi,
  f as Gi,
  i as Ki,
  m as qi,
  n as Ji,
  o as Yi,
  r as Xi,
  t as Zi,
} from "./skaters-pUdq6stw.js";
import {
  _ as Qi,
  a as $i,
  c as ea,
  d as ta,
  g as na,
  h as ra,
  i as ia,
  l as aa,
  n as oa,
  o as sa,
  p as ca,
  r as la,
  s as ua,
  t as da,
  u as fa,
  v as pa,
} from "./missions-eXNMrvRm.js";
import {
  a as ma,
  c as ha,
  n as ga,
  o as _a,
  r as va,
  t as ya,
} from "./session-DxCN6jDh.js";
import { r as ba, t as xa } from "./parkMesh-CjoleZJz.js";
import {
  a as Sa,
  c as Ca,
  d as wa,
  f as Ta,
  i as Ea,
  l as Da,
  n as Oa,
  o as ka,
  p as Aa,
  r as ja,
  s as Ma,
  t as Z,
  u as Na,
} from "./fxHooks-Cvx_8YWC.js";
import { n as Pa } from "./verlet-BVVzuOqv.js";
import { n as Fa } from "./kit-C-OErpbU.js";
import { n as Ia, r as La } from "./songs-B3nWAdc6.js";
import { r as Ra, t as za } from "./stickers-9pAHXWwr.js";
import { r as loadProps } from "./decor-Tyb8Za1u.js";
import { t as Va } from "./OrbitControls-CQWqkYLs.js";
import { r as Ha } from "./ground-ufcYH9Hx.js";
async function Ua(e, t) {
  let n = await e,
    r = navigator;
  if (r.share && matchMedia(`(pointer: coarse)`).matches)
    try {
      return (await r.share({ title: `Tailgrab`, text: t, url: n }), `shared`);
    } catch {
      return `failed`;
    }
  try {
    return (await navigator.clipboard.writeText(n), `copied`);
  } catch {
    return `failed`;
  }
}
function Wa(e) {
  return {
    id: `invite`,
    title: `Invite friends`,
    hue: `#FF3D7F`,
    build(t) {
      let n = j(`div`, `invite`),
        r = j(`div`, `invite-said`),
        i = j(`button`, `invite-code`);
      ((i.type = `button`),
        i.setAttribute(
          `aria-label`,
          `Party code ${e.split(``).join(` `)}: copy`,
        ),
        [...e].forEach((e, t) => {
          let n = j(`span`, `invite-ch`, e);
          (n.style.setProperty(`--i`, String(t)), i.append(n));
        }));
      let a = () => {
        navigator.clipboard?.writeText(e).then(
          () => {
            ((r.textContent = `Code copied!`), L(r));
          },
          () => {},
        );
      };
      i.addEventListener(`click`, a);
      let o = V(``, `primary big invite-share`, async () => {
        (await Ua(Wr(e), `Skate with me in Tailgrab! Party ${e}`)) ===
          `copied` && ((r.textContent = `Invite link copied!`), L(r));
      });
      (o.append(U(`invite`), j(`span`, ``, `SHARE LINK`)),
        (o.dataset.autofocus = ``));
      let s = j(`div`, `invite-btns`);
      (s.append(o, V(`COPY CODE`, `secondary`, a)),
        n.append(
          U(`party`, `invite-ico`),
          j(
            `p`,
            `invite-lead`,
            `Up to 3 friends skate with you: they stand beside you on the home screen, and PLAY takes everyone.`,
          ),
          i,
          r,
          s,
          H(
            `Friends open the link, or tap JOIN PARTY on their home screen and type the code.`,
          ),
        ),
        t.body.append(n));
    },
  };
}
function Ga() {
  return {
    id: `join-party`,
    title: `Join a party`,
    hue: `#FF3D7F`,
    build(e) {
      let t = j(`div`, `invite`),
        n = fr((t) => e.resolve({ code: t }));
      n.input.dataset.autofocus = ``;
      let r = j(`div`, `invite-btns`);
      r.append(n.el, V(`JOIN`, `primary`, n.go));
      let i = V(``, `secondary invite-create`, () => e.resolve({ create: !0 }));
      (i.append(U(`plus`), j(`span`, ``, `CREATE A PARTY`)),
        t.append(
          U(`party`, `invite-ico`),
          j(
            `p`,
            `invite-lead`,
            `Got a code from a friend? Type it in and you'll stand beside them.`,
          ),
          r,
          j(`p`, `invite-or`, `No code? Start your own and invite friends.`),
          i,
        ),
        e.body.append(t));
    },
  };
}
var Ka = [
    `simTick`,
    `x`,
    `y`,
    `z`,
    `yaw`,
    `ux`,
    `uy`,
    `uz`,
    `vx`,
    `vy`,
    `vz`,
    `mode`,
    `modeTick`,
    `trickId`,
    `trickTick`,
    `trickEnd`,
    `crouch`,
    `bal`,
  ],
  qa = 0.35;
Object.keys(Ge).length - 1;
function Ja(e) {
  return Ka.map((t) => e[t]);
}
var Ya = (e) => `g:${e}`,
  GhostNet = class e {
    net;
    tags;
    ghosts = new Map();
    offs = [];
    lastSend = 0;
    sending = !1;
    gone = !1;
    static async open(t, n, r, i) {
      try {
        return new e(await Yt(t), n, r, i);
      } catch (e) {
        return (console.warn(`ghosts`, e), null);
      }
    }
    constructor(e, t, n, r) {
      ((this.net = e), (this.tags = r));
      let i = e.room.sessionId,
        a = e.callbacks;
      (this.offs.push(
        a.onAdd(`skaters`, (e, a) => {
          if (a === i || this.ghosts.has(a) || this.gone) return;
          let o = ma(a, e, n);
          ((o.view.root.visible = !1),
            t.add(o.view.root),
            this.ghosts.set(a, o),
            r.upsert(Ya(a), e.name, Xi[e.color] ?? `#fff`, !1, !0));
        }),
      ),
        this.offs.push(a.onRemove(`skaters`, (e, t) => this.remove(t))),
        e.room.onLeave(() => this.clear()));
    }
    frame(e, t, n, r) {
      if (this.gone) return;
      let i = this.net.predict;
      i.tick(e);
      for (let e of this.ghosts.values()) ga(e, i, t, e.sk.live, qa);
      r && e - this.lastSend >= 100
        ? ((this.lastSend = e), (this.sending = !0), this.send(`pose`, Ja(n)))
        : !r && this.sending && ((this.sending = !1), this.send(`rest`));
    }
    anchor(e, t) {
      if (!e.startsWith(`g:`)) return !1;
      let n = this.ghosts.get(e.slice(2));
      return n?.view.root.visible ? (n.view.headAnchor(t), !0) : !1;
    }
    dispose() {
      for (let e of this.offs) e();
      (this.clear(),
        this.net.predict.dispose(),
        this.net.room.leave(!0).catch(() => {}));
    }
    send(e, t) {
      try {
        this.net.room.send(e, t);
      } catch {}
    }
    remove(e) {
      let t = this.ghosts.get(e);
      t && (va(t), this.ghosts.delete(e), this.tags.remove(Ya(e)));
    }
    clear() {
      this.gone = !0;
      for (let e of [...this.ghosts.keys()]) this.remove(e);
    }
  },
  Za = 0.18;
function Qa(e, t, n, r, i) {
  if (e < n) return (e > n - Za && (t.crouch = 1), -1);
  let a = e - n;
  if (a >= r) return -1;
  let o = (8 * i) / (r * r),
    s = (o * r) / 2;
  return (
    (t.mode = Ge.AIR),
    (t.y += s * a - (o * a * a) / 2),
    (t.vy = s - o * a),
    a
  );
}
var $a = (e) => e * e * (3 - 2 * e);
function eo(e, t, n, r, i) {
  let a = (e) =>
    $a(Math.max(0, Math.min(1, e / 0.5, (r - e) / 0.4))) *
    (i + 0.04 * Math.sin(e * 9));
  if (e < n) {
    e > n - Za && (t.crouch = 1);
    return;
  }
  let o = e - n;
  o >= r ||
    ((t.mode = Ge.AIR),
    (t.y += a(o)),
    (t.vy = Math.max(0.6, (a(o) - a(o - 0.02)) / 0.02)));
}
