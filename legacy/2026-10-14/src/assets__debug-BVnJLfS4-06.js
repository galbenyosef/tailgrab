// assets__debug-BVnJLfS4 06 — color
// Lines 1484-1822 of readable/assets__debug-BVnJLfS4.pretty.js (statement-aligned).
var Z = {
    string: `#CE9178`,
    number: `#B5CEA8`,
    boolean: `#569CD6`,
    nullish: `#858585`,
  },
  Be = `#DCDCAA`,
  Ve = 200,
  He = class {
    container;
    getState;
    expandedPaths = new Set([`root`]);
    refIds = new Map();
    nextRefId = 1;
    valueIndex = new Map();
    fullRenderTimer = null;
    lastFullRender = 0;
    dirty = !1;
    constructor(e, t) {
      ((this.container = e),
        (this.getState = t),
        this.container.addEventListener(`click`, (e) => {
          let t = e.target.closest(`[data-expand-button]`);
          t && (e.stopPropagation(), this.toggleExpand(t));
        }),
        document.addEventListener(`visibilitychange`, this.onVisibilityChange));
    }
    dispose() {
      (document.removeEventListener(
        `visibilitychange`,
        this.onVisibilityChange,
      ),
        (this.fullRenderTimer &&= (clearTimeout(this.fullRenderTimer), null)));
    }
    onVisibilityChange = () => {
      !document.hidden && this.dirty && ((this.dirty = !1), this.render());
    };
    render() {
      ((this.fullRenderTimer &&= (clearTimeout(this.fullRenderTimer), null)),
        (this.lastFullRender = Date.now()),
        (this.refIds = new Map()),
        (this.nextRefId = 1));
      let e;
      try {
        e = this.renderNode(this.getState() || {});
      } catch (e) {
        ((this.container.innerHTML =
          `<div style="color: #e74856; padding: 20px;">Error accessing room state: ` +
          Q(e.message) +
          `</div>`),
          (this.valueIndex = new Map()));
        return;
      }
      ((this.container.innerHTML =
        `<div style="font-family: 'Consolas', 'Monaco', 'Courier New', monospace; font-size: 12px; line-height: 1.5; color: #d4d4d4; padding: 8px;">` +
        e +
        `</div>`),
        this.buildValueIndex());
    }
    applyChanges(e) {
      if (document.hidden) {
        this.dirty = !0;
        return;
      }
      if (this.dirty) {
        ((this.dirty = !1), this.render());
        return;
      }
      if (this.fullRenderTimer) return;
      let t = this.collectPatches(e);
      if (t === null) {
        this.scheduleFullRender();
        return;
      }
      for (let e = 0; e < t.length; e++) this.applyPatch(t[e]);
    }
    collectPatches(e) {
      let t = [];
      for (let n = 0; n < e.length; n++) {
        let r = e[n];
        if (!Ke(r.value)) return null;
        let i = this.refIds.get(r.ref);
        if (i === void 0) return null;
        let a = r.field === void 0 ? r.dynamicIndex : r.field,
          o = this.valueIndex.get(i + `|` + String(a));
        if (!o || o.length === 0) return null;
        t.push({ els: o, value: r.value });
      }
      return t;
    }
    applyPatch(e) {
      let t = Xe(e.value);
      for (let n = 0; n < e.els.length; n++) {
        let r = e.els[n];
        ((r.textContent = t.text), (r.style.color = t.color));
      }
    }
    scheduleFullRender() {
      if (this.fullRenderTimer) return;
      let e = Math.max(0, Ve - (Date.now() - this.lastFullRender));
      e === 0
        ? this.render()
        : (this.fullRenderTimer = setTimeout(() => {
            ((this.fullRenderTimer = null), this.render());
          }, e));
    }
    buildValueIndex() {
      this.valueIndex = new Map();
      let e = this.container.querySelectorAll(`[data-vk]`);
      for (let t = 0; t < e.length; t++) {
        let n = e[t],
          r = n.getAttribute(`data-vk`);
        if (r === null) continue;
        let i = this.valueIndex.get(r);
        i ? i.push(n) : this.valueIndex.set(r, [n]);
      }
    }
    localIdFor(e) {
      let t = this.refIds.get(e);
      return (
        t === void 0 && ((t = this.nextRefId++), this.refIds.set(e, t)),
        t
      );
    }
    toggleExpand(e) {
      let t = e.nextElementSibling,
        n = e.querySelector(`[data-expand-icon]`);
      if (!t || !t.style) return;
      let r = t.style.display === `none`;
      ((t.style.display = r ? `block` : `none`),
        n && (n.textContent = r ? `▼` : `▶`));
      let i = e.closest(`[data-path]`);
      if (i) {
        let e = i.getAttribute(`data-path`);
        e !== null &&
          (r ? this.expandedPaths.add(e) : this.expandedPaths.delete(e));
      }
    }
    renderNode(e, t = 0, n = ``, r = ``, i = null, a = null) {
      if (t > 10)
        return `<span style="color: #858585; font-style: italic;">[Max depth reached]</span>`;
      if (e == null) return Ze(e, a);
      let o = typeof e;
      if (o === `string` || o === `number` || o === `boolean`) return Ze(e, a);
      let s = t * 6,
        c = r ? r + `.` + (n || ``) : n || `root`,
        l = this.expandedPaths.has(c);
      if (typeof e.forEach == `function`) {
        let n = e.size || e.length || null,
          r = n === null ? `?` : n,
          a = this.localIdFor(e),
          o = Je(t, l),
          u = i === null ? (o.isRoot ? `State` : ``) : i,
          d =
            `<div style="margin-left: ` + s + `px;" data-path="` + Ue(c) + `">`;
        ((d += Ye(o, u, r)),
          (d += `<div style="display: ` + o.initialDisplay + `;">`));
        let f =
          e instanceof Set || (e.constructor && e.constructor.name === `Set`);
        try {
          e.forEach((e, n) => {
            if (f) d += this.renderNode(e, t + 1, String(n), c);
            else {
              let r = typeof n == `number` ? `[` + String(n) + `]` : String(n);
              d += this.renderKeyValue(
                n,
                e,
                t + 1,
                c,
                r,
                typeof n == `string`,
                a,
              );
            }
          });
        } catch (e) {
          let n = (t + 1) * 6;
          d +=
            `<div style="margin-left: ` +
            n +
            `px; color: #e74856;">Error iterating: ` +
            Q(e.message) +
            `</div>`;
        }
        return ((d += `</div></div>`), d);
      }
      if (o === `object`) {
        let n = We(e),
          r = this.localIdFor(e),
          a = Je(t, l),
          o = i === null ? (a.isRoot ? `state` : ``) : i,
          u =
            `<div style="margin-left: ` + s + `px;" data-path="` + Ue(c) + `">`;
        if (n.length === 0)
          u += o
            ? `<span style="color: ` +
              qe(o) +
              `;">` +
              Q(String(o)) +
              `</span><span style="color: #858585;"> {}</span>`
            : `<span style="color: #858585;">{}</span>`;
        else {
          ((u += Ye(a, o, null)),
            (u += `<div style="display: ` + a.initialDisplay + `;">`));
          for (let i = 0; i < n.length; i++) {
            let a = n[i];
            a !== `~refId` &&
              (u += this.renderKeyValue(a, e[a], t + 1, c, a, !1, r));
          }
          u += `</div>`;
        }
        return ((u += `</div>`), u);
      }
      return Ze(e, a);
    }
    renderKeyValue(e, t, n, r, i, a, o) {
      if (Ge(t))
        return i === null
          ? this.renderNode(t, n, String(e), r)
          : this.renderNode(t, n, String(e), r, i);
      let s = n * 6,
        c = o + `|` + String(e),
        l = `<div style="margin-left: ` + s + `px; padding-left: 14px;">`;
      if (i !== null) {
        let e = a ? Z.string : Be,
          t = a ? `"` + Q(String(i)) + `"` : Q(String(i));
        l +=
          `<span style="color: ` +
          e +
          `;">` +
          t +
          `</span><span style="color: #858585;">: </span>`;
      } else
        l +=
          `<span style="color: #DCDCAA;">` +
          Q(String(e)) +
          `</span><span style="color: #858585;">: </span>`;
      return (
        (l += this.renderNode(t, n + 1, String(e), r, null, c)),
        (l += `</div>`),
        l
      );
    }
  };
function Q(e) {
  let t = document.createElement(`div`);
  return ((t.textContent = e), t.innerHTML);
}
function Ue(e) {
  return String(e)
    .replace(/&/g, `&amp;`)
    .replace(/"/g, `&quot;`)
    .replace(/</g, `&lt;`)
    .replace(/>/g, `&gt;`);
}
function We(e) {
  return r.isSchema(e)
    ? Object.keys(n.getFields(e.constructor))
    : Object.keys(e);
}
function Ge(e) {
  if (e == null) return !1;
  let t = typeof e,
    n = t === `object` && !(e instanceof Array),
    r = t === `object` && typeof e.forEach == `function`,
    i = e instanceof Array;
  return n || i || r;
}
function Ke(e) {
  if (e === null) return !0;
  let t = typeof e;
  return t === `string` || t === `number` || t === `boolean`;
}
function qe(e) {
  return typeof e == `string` && e.startsWith(`"`) ? Z.string : Be;
}
function Je(e, t) {
  let n = e === 0;
  return {
    isRoot: n,
    initialDisplay: n || t ? `block` : `none`,
    initialIcon: n || t ? `▼` : `▶`,
    rootClass: n ? ` data-root-node="true"` : ``,
  };
}
function Ye(e, t, n) {
  let r = e.isRoot ? `default` : `pointer`,
    i = e.isRoot ? `` : `this.style.backgroundColor='rgba(255,255,255,0.05)'`,
    a = e.isRoot ? `` : `this.style.backgroundColor='transparent'`,
    o =
      `<div data-expand-button` +
      e.rootClass +
      ` style="display: flex; align-items: center; cursor: ` +
      r +
      `; user-select: none; margin: 0; padding: 1px 0;" onmouseover="` +
      i +
      `" onmouseout="` +
      a +
      `">`;
  return (
    (o +=
      `<span data-expand-icon style="margin-right: 4px; color: #858585; font-size: 10px; width: 10px; display: inline-block; text-align: center; user-select: none;">` +
      e.initialIcon +
      `</span>`),
    t &&
      (o += `<span style="color: ` + qe(t) + `;">` + Q(String(t)) + `</span>`),
    n != null &&
      n !== `?` &&
      (o += ` <span style="color: #858585;">(` + n + `) </span>`),
    (o += `</div>`),
    o
  );
}
function Xe(e) {
  if (e === null) return { text: `null`, color: Z.nullish };
  if (e === void 0) return { text: `undefined`, color: Z.nullish };
  switch (typeof e) {
    case `string`:
      return { text: `"` + e + `"`, color: Z.string };
    case `number`:
      return { text: String(e), color: Z.number };
    case `boolean`:
      return { text: String(e), color: Z.boolean };
    default:
      return { text: String(e), color: Z.nullish };
  }
}
function Ze(e, t) {
  let n = Xe(e);
  return (
    `<span` +
    (t === null ? `` : ` data-vk="` + Ue(t) + `" data-kind="value"`) +
    ` style="color: ` +
    n.color +
    `;">` +
    Q(n.text) +
    `</span>`
  );
}
