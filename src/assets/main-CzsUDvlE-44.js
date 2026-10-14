// assets/main-CzsUDvlE 44 — announcer
// Lines 15457-17654 of readable/assets/main-CzsUDvlE.pretty.js (statement-aligned).
var Ym = [
    [O.high, 1],
    [O.med, 1],
    [O.low, 1],
    [O.low, 0.85],
    [O.low, 0.7],
  ],
  Xm = 2e3,
  Zm = 1 / 3,
  Qm = 3,
  $m = 0.03,
  eh = 15,
  GameApp = class {
    stage;
    ui;
    announcer;
    transition;
    bubbles;
    nav;
    padNav;
    zones;
    dock;
    chat = null;
    screen = `boot`;
    showroom = null;
    session = null;
    hub = null;
    match = null;
    park = null;
    roomAt = 0;
    arrowsNote = !1;
    parkHud = null;
    builder = null;
    meshTimer = null;
    plazaHud = null;
    matchHud = null;
    portalFx = null;
    letters = null;
    finds = null;
    ghosts = null;
    ghostGen = 0;
    coinChip;
    unlockCard;
    coach = null;
    goals = null;
    missionsChip = null;
    markers = null;
    lastHubId = ``;
    parkInUrl = ``;
    lastMode = null;
    roomMenu = null;
    last = performance.now();
    leaving = !1;
    perf;
    constructor(e, t) {
      ((this.stage = e),
        (this.ui = t),
        (this.announcer = new Oa(t)),
        (this.transition = new ScreenWipe(document.body)),
        (this.bubbles = new SkaterTags(t)),
        (this.bubbles.enabled = J.bubbles),
        (this.zones = qo(t)),
        (this.dock = this.zones.me),
        new Ea(this.dock, () => this.openStats()),
        (this.coinChip = new CoinChip(this.dock)),
        (this.unlockCard = new UnlockQueue(() => this.unlockWait())),
        this.dock.append(this.unlockCard.el),
        new NowPlaying(this.dock),
        (this.nav = new AppRouter(t)),
        (this.padNav = new _i(this.nav, t)),
        (this.padNav.onMenu = () => this.openMenu()),
        Lr(() => this.ping?.refresh()),
        (this.perf = new PerfMeter(
          () => Object.keys(O).find((e) => O[e] === this.stage.tier) ?? ``,
        )),
        Lr(() => this.perf.refresh()),
        (e.renderer.info.autoReset = !1),
        Yn(() => this.where()),
        Kn((e) => {
          this.arrowsNote = e === `arrows`;
        }),
        M((e, t) => {
          let n = e.named ? e.name : vi();
          (n && n !== J.name && ((J.name = n), Ir()),
            e.starter !== null &&
              ai() !== J.skater &&
              (Us({ skater: e.starter, color: J.color }), Yr()),
            this.announceProgress(t));
        }),
        qr((e) => {
          e.kind === `toast` &&
            this.announcer.toast(e.text, e.tone, void 0, e.icon);
        }),
        Vr((e) => {
          (this.showroom?.setParty(Gm(e)),
            this.plazaHud?.setParty(e?.code ?? ``, e?.members.length ?? 0),
            this.screen !== `boot` && this.setUrl());
        }),
        Tl(
          (e, t) => this.announcer.toast(e, `sky`, 2200, t),
          () =>
            this.screen === `plaza` ||
            this.screen === `match` ||
            this.screen === `park`,
        ),
        (wa.host = {
          stage: e,
          zones: this.zones,
          announcer: this.announcer,
          open: (e) =>
            this.session || wa.feature
              ? !1
              : ((wa.feature = e), this.showroom?.setHidden(!0), !0),
          close: (e) => {
            wa.feature === e &&
              ((wa.feature = null), this.showroom?.setHidden(!1));
          },
          link: (e) => {
            let t = new URL(location.href);
            (e
              ? t.searchParams.set(`replay`, e)
              : t.searchParams.delete(`replay`),
              t.href !== location.href && this.nav.replaceUrl(t));
          },
        }));
      let n = 0;
      (setInterval(() => {
        let e = N.profile;
        !e ||
          !bl(e) ||
          performance.now() < n ||
          ((n = performance.now() + 3e4), Dt());
      }, 1e3),
        requestAnimationFrame(this.loop),
        setInterval(() => {
          document.hidden && this.tickHidden();
        }, 50));
    }
    capped = matchMedia(`(pointer: coarse)`).matches;
    refreshMs = 1e3 / 60;
    gapMin = 1 / 0;
    gaps = 0;
    lastRaf = 0;
    pace(e) {
      let t = e - this.lastRaf;
      ((this.lastRaf = e),
        t > 4 && (this.gapMin = Math.min(this.gapMin, t)),
        ++this.gaps >= 120 &&
          ((this.refreshMs = Math.min(this.gapMin, 1e3 / 60)),
          (this.gapMin = 1 / 0),
          (this.gaps = 0)));
      let n = Math.max(1, Math.floor(1e3 / 60 / this.refreshMs + 0.25));
      return n > 1 && e - this.last < (n - 0.5) * this.refreshMs;
    }
    loop = (e) => {
      if (this.capped && this.pace(e)) {
        requestAnimationFrame(this.loop);
        return;
      }
      let t = Math.min(0.1, (e - this.last) / 1e3);
      ((this.last = e), this.governor(t));
      let n = performance.now();
      (this.stage.renderer.info.reset(),
        this.frame(e, t),
        this.perf.frame(e, performance.now() - n, this.stage.renderer),
        requestAnimationFrame(this.loop));
    };
    tickHidden() {
      let e = performance.now();
      e - this.last > 200 && this.session && this.frame(e, 0.05);
    }
    govFor = null;
    govFrames = 0;
    govMs = 0;
    govMissed = 0;
    govSlow = 0;
    govSmooth = 0;
    govSkip = !0;
    govClimbed = !1;
    govNoClimb = !1;
    govPaused = !1;
    governor(e) {
      if (
        Gf() !== `auto` ||
        !this.session ||
        document.hidden ||
        this.govPaused ||
        (this.govFor !== this.session &&
          ((this.govFor = this.session),
          (this.govFrames =
            this.govMs =
            this.govMissed =
            this.govSlow =
            this.govSmooth =
              0),
          (this.govSkip = !0)),
        this.govFrames++,
        (this.govMs += e * 1e3),
        e > 0.02 && this.govMissed++,
        this.govMs < Xm)
      )
        return;
      let t = this.govMissed / this.govFrames;
      if (((this.govFrames = this.govMs = this.govMissed = 0), this.govSkip)) {
        this.govSkip = !1;
        return;
      }
      ((this.govSlow = t > Zm ? this.govSlow + 1 : 0),
        (this.govSmooth = t <= $m ? this.govSmooth + 1 : 0));
      let n = this.stage,
        r = Ym.findIndex(([e, t]) => e === n.tier && t === n.scale);
      r < 0 ||
        (this.govSlow >= Qm && r + 1 < Ym.length
          ? (this.govClimbed && (this.govNoClimb = !0),
            this.govStep(
              r + 1,
              `stepping down (${Math.round(t * 100)}% of frames missed)`,
            ))
          : this.govSmooth >= eh &&
            !this.govNoClimb &&
            r > Ym.findIndex(([e, t]) => e === $f() && t === 1) &&
            ((this.govClimbed = !0), this.govStep(r - 1, `climbing back up`)));
    }
    govStep(e, t) {
      let [n, r] = Ym[e],
        i = this.stage;
      (i.applyTier(n),
        i.setScale(r),
        n === $f() ? Zf() : Xf(n),
        (this.govSlow = this.govSmooth = 0),
        (this.govSkip = !0),
        console.info(`[quality] ${t}`));
    }
    frame(e, t) {
      this.markers?.measure(e);
      let n = this.skating();
      if (
        (I.playing(n),
        this.arrowsNote &&
          n &&
          ((this.arrowsNote = !1),
          this.announcer.toast(
            `Steering with the arrow keys · switch in Settings`,
            `sky`,
            4500,
          )),
        this.padNav.update(e),
        this.announcer.update(e),
        this.unlockCard.update(e),
        wa.feature)
      )
        (this.showroom?.idle(e), wa.feature.frame(e, t), Z.update(t));
      else if (this.session) {
        (this.session.frame(e, t), Z.update(this.session.holding ? 0 : t));
        let n = this.session;
        this.bubbles.update(
          this.stage.camera,
          (e, t) => n.anchor(e, t) || !!this.ghosts?.anchor(e, t),
          e,
        );
      } else this.showroom && this.showroom.frameUpdate(t, e);
    }
    async start() {
      let e = new URLSearchParams(location.search),
        t = (I.param(`party`, e) ?? I.param(`plaza`, e) ?? ``).toUpperCase(),
        n = (I.param(`park`, e) ?? ``).toUpperCase();
      zr &&
        ((J.color = Math.floor(Math.random() * Xi.length)), (J.name = vi()));
      let r = In();
      r.then(() => this.bootParty(t));
      let i = I.param(`haack`, e);
      i !== null && r.then(() => this.haack(i));
      let a = e.get(`career`),
        o = J.tutorial === 0 && !Wn(t) && !n;
      if (!a && !e.has(`quick`) && !o) {
        await this.lobby(n, r, !0);
        return;
      }
      ((this.showroom = new ParkStage(this.stage)),
        await this.showroom.load(),
        (this.screen = `title`),
        ah(),
        (a || o) && (await r));
      let s = a
        ? { kind: `career`, level: a }
        : n
          ? { kind: `park`, code: n, via: `invite` }
          : { kind: `public` };
      await this.leaveTitle(s, null, r);
    }
    async bootParty(e) {
      if (!Wn(e)) {
        await Xr();
        return;
      }
      try {
        (await Jr(e),
          this.announcer.toast(
            `You're in the party!`,
            `mint`,
            void 0,
            `popper`,
          ));
      } catch (t) {
        (console.warn(`party`, t),
          this.announcer.toast(
            `Party ${e} is gone or full — start your own with +`,
            `red`,
          ),
          await Xr());
      }
      this.setUrl();
    }
    async haack(e) {
      let t = [];
      for (let n of new Set(e.split(`,`)))
        if (Nn(n) && !N.profile?.cheats.includes(n))
          try {
            (await $e(n), t.push(n));
          } catch (e) {
            console.warn(`[haack]`, P(e));
          }
      let n = new URL(location.href);
      if (
        (n.searchParams.delete(`haack`),
        n.href !== location.href && this.nav.replaceUrl(n),
        t.length)
      ) {
        (await ih, Y.ui(`fanfare`));
        for (let e of t)
          this.announcer.toast(`CHEAT! ${Wm[e]}`, `pink`, void 0, `sparkle`);
      }
    }
    async lobby(e, t, n) {
      let r = new ParkStage(this.stage);
      ((this.showroom = r), await r.load());
      let i = t.then(() => this.openLobby());
      ((this.screen = `title`), Kr(``), r.show(oi()), r.setParty(Gm(X.view)));
      let a = qm();
      (r.setBest(a),
        (this.nav.onCue = (e) => {
          (r.setShot(e.shot),
            r.setTurn(e.turn ?? 0),
            r.show(e.look ?? $r(e.skater ?? ai()), !!e.locked, !!e.preview));
        }));
      let o = M(() => this.nav.recue()),
        s = Tu(this.nav, {
          park: e,
          skating: () => r.crowdSize,
          slots: () => r.slotRects(),
          wave: (e) => r.wave(e),
          best: a,
          tv: () => r.tvRect(),
          rider: () => r.riderRect(),
          preview: (e) => void r.setPark(...Um(e)),
          toast: (e, t, n) => this.announcer.toast(e, t, void 0, n),
        });
      n
        ? ah(this.ui.querySelector(`.lb-logo`))
        : this.transition.covered && (await this.transition.reveal());
      let c = n ? I.param(`replay`) : null;
      c &&
        this.nav.open(
          me(
            () =>
              import(`./replay-_5kwzkRi.js`).then((e) => e.replayLinkPage(c)),
            __vite__mapDeps([
              28, 1, 7, 4, 2, 3, 5, 6, 8, 9, 13, 10, 11, 12, 14, 15, 16, 17, 18,
              19, 20, 29, 30, 31, 21, 22, 32, 24, 33, 27,
            ]),
          ),
        );
      let l = await s;
      (o(), (this.nav.onCue = null), await this.leaveTitle(l, i, t));
    }
    async leaveTitle(e, t, n) {
      if (
        (this.showroom?.show(null),
        this.showroom?.setParty([]),
        e.kind === `public`)
      ) {
        (X.view || (await ti()),
          await this.enterPlaza(e, await this.claimLobby(t, e)));
        return;
      }
      (this.claimLobby(t, e),
        e.kind === `career`
          ? await this.startCareer(e.level)
          : e.kind === `go`
            ? await this.takeSeat(e.go)
            : e.kind === `follow`
              ? await this.follow(e.where, e.room)
              : (await n, await this.enterPark(e.code, e.via === `daily`)));
    }
    async takeSeat(e) {
      this.screen = `transition`;
      let t = e.dest;
      t.kind === `park` &&
        (await this.transition.cover(
          t.via === `daily` ? `MAP OF THE DAY` : `PLAYER PARK`,
          t.name || `Park ${t.code}`,
          { icon: t.via === `daily` ? `star` : `hammer` },
        ));
      let n;
      try {
        n = await Gt(e);
      } catch (e) {
        (console.warn(`party seat`, e),
          this.announcer.toast(
            `Couldn't catch up with your party — heading to the Skate Hub`,
            `red`,
          ),
          await this.enterPlaza({ kind: `public` }));
        return;
      }
      if (n.kind === `hub`) {
        await this.enterPlaza({ kind: `public` }, n);
        return;
      }
      (this.showroom?.dispose(),
        (this.showroom = null),
        await this.openPark(n));
    }
    async follow(e, t) {
      if (((this.screen = `transition`), e === `park`)) {
        await this.transition.cover(
          `PLAYER PARK`,
          `Catching up with your party`,
          { icon: `hammer` },
        );
        try {
          let e = await tt(t);
          (this.showroom?.dispose(),
            (this.showroom = null),
            await this.openPark(e));
          return;
        } catch (e) {
          (console.warn(`follow`, e),
            this.announcer.toast(
              `Your party's park is full or gone — heading to the Skate Hub`,
              `red`,
            ));
        }
        await this.enterPlaza({ kind: `public` });
        return;
      }
      let n;
      try {
        n = await jn({ id: t });
      } catch (e) {
        (console.warn(`follow`, e),
          this.announcer.toast(
            `Your party's Skate Hub is full — heading to another`,
            `red`,
          ));
      }
      await this.enterPlaza({ kind: `public` }, n);
    }
    firstRunDue() {
      return !X.view && N.profile?.life.runs === 0;
    }
    async firstRun(e) {
      let t = performance.now();
      for (;;) {
        if (
          (await new Promise((e) => setTimeout(e, 100)),
          this.hub?.room !== e || this.screen !== `plaza`)
        )
          return;
        let n = performance.now() - t;
        if (
          !this.nav.pagesOpen &&
          (n > 8e3 || (n > 1500 && !Z.levelPending && !this.announcer.busy()))
        )
          break;
      }
      await this.startCareer(ln[0].id, !1);
    }
    async pickCareer() {
      let e = await this.nav.open(zc());
      e && this.startCareer(e);
    }
    announceProgress(e) {
      if (this.screen === `match` && this.matchHud)
        for (let t of e) this.matchHud.addNews(t);
      let t = e.reduce(
        (e, t) => (t.kind === `levelUp` ? Math.max(e, t.level) : e),
        0,
      );
      for (let t of e) {
        if (t.kind === `coins`) {
          this.coinsPicked(t);
          continue;
        }
        if (t.kind === `plazaGoal`)
          (this.announcer.big(`GOAL!`, `mint`, t.text, 1500), Z.ui(`letter`));
        else if (t.kind === `mission`)
          (this.announcer.big(
            `MISSION COMPLETE!`,
            `gold`,
            `${t.text} · claim it in Missions`,
            2200,
            !0,
          ),
            Z.celebrate());
        else if (t.kind === `banked`)
          this.announcer.toast(
            `New missions! Last ${t.crates && !t.missions ? `crate` : `rewards`} banked: +${t.xp.toLocaleString()} XP · ${t.stars} star${t.stars === 1 ? `` : `s`}`,
            `mint`,
            4200,
            `star`,
          );
        else if (t.kind === `chest`)
          this.announcer.toast(
            `Star Road chest: +${t.xp.toLocaleString()} XP`,
            `gold`,
          );
        else if (t.kind === `paid` && t.product === `pros`)
          (this.announcer.big(
            `THE WHOLE CREW!`,
            `gold`,
            `Every pro is yours`,
            2400,
            !0,
          ),
            Z.celebrate());
        else if (t.kind === `paid` && t.product === `noads`)
          this.announcer.toast(
            `Supporter: no more ad breaks. Thank you!`,
            `gold`,
            3600,
            `star`,
          );
        else if (t.kind === `unpaid`)
          this.announcer.toast(
            `${ht(t.product) ? ut[t.product].name : `A pack`} is no longer on this account`,
            `white`,
            4200,
          );
        else if (t.kind === `cleared`) {
          let e = t.next
            ? `${R(t.next)?.name ?? `next level`} unlocked`
            : `career complete!`;
          this.announcer.big(
            `CLEARED!`,
            `gold`,
            `${R(t.level)?.name ?? ``} · ${e}`,
            2400,
            !0,
          );
        }
      }
      t && Z.levelUp(t, t <= Ji.full ? [`faster`, `higher pop`] : []);
      let n = e.flatMap((e) =>
          e.kind === `paid` && e.product !== `pros` ? e.keys : [],
        ),
        r = mt([...At(e), ...n]);
      if (r.length) {
        if (
          this.screen === `plaza` ||
          this.screen === `match` ||
          this.screen === `park`
        )
          document.body.classList.contains(`in-results`) ||
            this.unlockCard.add(r);
        else
          for (let e of r)
            this.announcer.toast(Jm(e), `mint`, void 0, `sparkle`);
      }
    }
    where() {
      let e = { screen: this.screen };
      (this.match ?? this.hub ?? this.park) &&
        (e.roomS = Math.round((performance.now() - this.roomAt) / 100) / 10);
      let t = this.match?.room;
      if (!t) return e;
      let n = t.state;
      return (
        (e.mode = n.mode),
        (e.phase =
          Object.keys(K).find((e) => K[e] === n.phase) ?? String(n.phase)),
        n.mode === `career` &&
          ((e.level = n.career.level),
          (e.goals = n.career.goals.filter((e) => e.done).length)),
        n.phase === K.PLAYING &&
          (e.runLeftS = Math.max(
            0,
            Math.round((n.phaseEndsAt - t.clock.serverNow()) / 1e3),
          )),
        e
      );
    }
    skating() {
      let e = document.body.classList;
      if (
        this.screen === `transition` ||
        !e.contains(`playing`) ||
        e.contains(`nav-open`) ||
        e.contains(`in-results`)
      )
        return !1;
      let t = this.screen === `match` ? this.match?.room.state : null;
      return !t || t.phase === K.PLAYING || t.phase === K.OVERTIME;
    }
    unlockWait() {
      let e = document.body.classList;
      return e.contains(`in-results`)
        ? (this.unlockCard.clear(), !0)
        : !this.skating() || e.contains(`building`)
          ? !0
          : this.announcer.busy() ||
            Z.levelPending ||
            !!this.chat?.showing ||
            !!this.dock.querySelector(`.goals.open`);
    }
    devUnlock(
      e = [
        `pro:15`,
        `hat:bandana`,
        `bottom:pants`,
        `color:top:FF8FB8`,
        `color:hat:B9A4FF`,
        `color:riding:FFB3C7`,
        `hat:visor`,
      ],
    ) {
      this.announceProgress(
        e.map((e) =>
          e.startsWith(`pro:`)
            ? { kind: `skater`, skater: Number(e.slice(4)) }
            : e.startsWith(`skin:`)
              ? { kind: `secret`, skin: e.slice(5) }
              : { kind: `item`, item: e },
        ),
      );
    }
    coinsPicked(e) {
      let t = e.drop === void 0 ? void 0 : Ot[e.drop],
        n = e.find ? _n(e.find) : void 0,
        r = t ?? n;
      (r &&
        (Z.burst(
          r.x,
          r.y,
          r.z,
          t
            ? [cf[t.tier], `#FFFFFF`, `#FFD21F`]
            : [`#FFD21F`, `#FFFFFF`, `#FF8A1F`, `#A55BFF`],
        ),
        this.coinChip.fly(pf(this.stage.camera, r.x, r.y, r.z), e.gained)),
        t && Z.ui(`coin`, t.tier),
        n &&
          (Z.ui(`stash`),
          this.announcer.big(
            n.kind === `deck` ? `SECRET DECK!` : `STASH!`,
            `gold`,
            `+${e.gained} coins`,
            1600,
          )));
    }
    async openLobby() {
      let e = await jn({ spectate: !0 }).catch(
        (e) => (console.warn(`lobby`, e), null),
      );
      return e
        ? (e.room.onMessage(`*`, () => {}),
          e.room.onMessage(`profile`, (e) => Tt(e.profile)),
          e.room.onLeave(() => {
            this.screen === `title` && this.showroom?.unwatch();
          }),
          this.showroom?.watch(e),
          e)
        : null;
    }
    async claimLobby(e, t) {
      let n = await e;
      if (n) {
        if (
          (this.showroom?.unwatch(), t.kind === `public` && !n.room.state.code)
        )
          try {
            return (await at(n), n);
          } catch (e) {
            console.warn(`lobby`, e);
          }
        (n.predict.dispose(), n.room.leave(!0).catch(() => {}));
      }
    }
    chatSend = () => {};
    installChat(e) {
      ((this.chatSend = e),
        (this.chat ??= new ChatPanel(
          this.dock,
          this.ui,
          (e) => this.chatSend(`chat`, { text: e }),
          (e) => this.chatSend(`emote`, { id: e }),
          I.freeChat && !Jo(),
        )));
    }
    async enterPlaza(e, t) {
      this.screen = `transition`;
      let n;
      if (t) n = t;
      else
        try {
          n =
            e.kind === `rejoin` && this.lastHubId
              ? await jn({ id: this.lastHubId }).catch(() => jn())
              : await jn();
        } catch (e) {
          (console.warn(e),
            this.announcer.toast(`Couldn't join — retrying…`, `red`),
            (n = await jn()));
        }
      ((this.hub = n), (this.roomAt = performance.now()));
      let r = n.room,
        i = r.state;
      ((this.lastHubId = r.roomId),
        this.setUrl(null),
        Kr(`plaza`, r.roomId),
        e.kind === `rejoin` &&
          e.requeue &&
          wr(e.requeue) &&
          r.send(`queue`, { mode: e.requeue }),
        this.showroom?.dispose(),
        (this.showroom = null));
      let a = new ya(this.stage, n, this.zones);
      (this.wireCommon(a, n.room, () => n.room.state.skaters, `plaza`),
        await a.loadPark(),
        (this.session = a));
      let o = n.world.layout.portals ?? [],
        s = {
          career: {
            ...q.career,
            verb: `TAP TO ENTER`,
            does: `to pick a level`,
            shut: () => ``,
            enter: () => void this.pickCareer(),
          },
        };
      ((this.portalFx = new GatePopup(
        o,
        (e) => s[e] ?? (wr(e) ? q[e] : null),
        a.park?.group,
      )),
        this.stage.scene.add(this.portalFx.group));
      let c = o,
        l = () => {
          ((c = this.coach?.active ? [] : o),
            this.portalFx?.show((e) => c.some((t) => t.mode === e)));
        };
      this.finds = new Collectibles(n.world.layout.id, null, (e) =>
        this.stage.scene.add(e.group),
      );
      let u = () => void this.invite(),
        d = r.sessionId,
        f = new PortalPrompts(
          this.zones,
          (e, t) => r.send(e, t),
          u,
          {
            joined: (e, t) => {
              let n = o.find((t) => t.mode === e);
              (t && this.portalFx?.burst(t, `out`),
                this.portalFx?.burst(e, `in`),
                Z.queue(`in`, q[e].color, n && { x: n.x, y: n.y ?? 0, z: n.z }),
                this.bubbles.pop(d, `YOU'RE IN!`, `queue-in`, 1600));
            },
            left: (e) => {
              (this.portalFx?.burst(e, `out`),
                Z.queue(`out`, q[e].color),
                this.bubbles.pop(d, `LEFT THE QUEUE`, `queue-out`, 1400));
            },
            ready: (e, t) => {
              (this.portalFx?.burst(e, `in`),
                Z.ui(`stamp`),
                t || this.bubbles.pop(d, `READY!`, `queue-in`, 1200));
            },
            gate: () => Z.ui(`gate`),
            press: () => Z.ui(`click`),
            tick: (e) => Z.ui(`tick`, e / 3),
          },
          s,
        );
      (f.setParty(X.view?.code ?? ``, X.view?.members.length ?? 0),
        (this.plazaHud = f),
        this.bubbles.prompt(d, f.prompt));
      let p = ``,
        m = () => {
          let e = ``;
          for (let [t, n] of i.skaters) n.bot || (e += `${t}:${n.queue}|`);
          if (e !== p) {
            p = e;
            for (let [e, t] of i.skaters) {
              if (t.bot) continue;
              let n = gr(t.queue) ? q[t.queue] : null;
              this.bubbles.badge(
                e,
                n ? n.name : null,
                `queue`,
                n?.color,
                n?.icon,
              );
            }
          }
        };
      this.markers = new EdgeMarkers(this.ui);
      let h = o.filter((e) => wr(e.mode)),
        g = [
          {
            key: `portals`,
            x: h.reduce((e, t) => e + t.x, 0) / Math.max(1, h.length),
            y: 2,
            z: h.reduce((e, t) => e + t.z, 0) / Math.max(1, h.length),
            label: `PORTALS`,
            color: `#FFD21F`,
            sticker: `flag`,
          },
        ],
        _ = (e, t) => Xu(i, e, t),
        v = (e) => {
          if (this.coach?.active) return [];
          let t = [];
          for (let n of h) {
            let r = i.portals.get(n.mode)?.count ?? 0;
            if (!r || !gr(n.mode)) continue;
            let a = q[n.mode],
              o = _(n.mode, e);
            t.push({
              key: `portal:${n.mode}`,
              x: n.x,
              y: (n.y ?? 0) + 2,
              z: n.z,
              label: `${a.name} · ${o >= 0 ? Nt(o) : r}`,
              color: a.color,
              sticker: a.icon,
              hot: o >= 0,
            });
          }
          return t.length ? t : g;
        };
      ((a.onFrame = (e) => {
        let t = a.localFrame,
          n = r.clock.serverNow(),
          o = this.plazaHud?.update(i, r.sessionId, t, c, n) ?? ``,
          l = i.skaters.get(r.sessionId);
        (this.coach?.frame(),
          this.portalFx?.update(e, (e) => ({
            count: i.portals.get(e)?.count ?? 0,
            mine: l?.queue === e,
            armed: o === e && l?.queue !== e,
            left: _(e, n),
            shut: !!s[e]?.shut(),
          })),
          this.finds?.update(e, ua(vn()), N.profile),
          this.markers?.update(this.stage.camera, l?.queue ? [] : v(n)),
          m());
      }),
        r.onMessage(`matchFound`, (e) => void this.toMatch(e)),
        r.onMessage(`toast`, (e) => this.announcer.toast(e.text)),
        r.onLeave((e) => {
          this.leaving ||
            this.hub?.room !== r ||
            (this.announcer.toast(`Disconnected (${e}). Reconnecting…`, `red`),
            this.recover());
        }));
      let y = Jo() && this.corner ? this.corner : this.dock,
        b = new GoalsPanel(y, J.tutorial < 0);
      ((this.goals = b),
        (this.missionsChip = new MissionsDock(
          y,
          () => void this.nav.open($l()),
          J.tutorial < 0,
        )));
      let x = new Coach(
        Jo() ? this.zones.lane : this.ui,
        `hub`,
        () => Z.ui(`letter`),
        (e) => {
          (b.reveal(),
            this.missionsChip?.reveal(),
            l(),
            !e &&
              (r.send(`tutorial`),
              this.firstRunDue()
                ? this.firstRun(r)
                : this.screen === `plaza` &&
                  this.announcer.big(
                    `YOU'RE READY!`,
                    `gold`,
                    `portals open`,
                    1800,
                    !0,
                    `trophy`,
                  )));
        },
      );
      ((this.coach = x),
        l(),
        !x.active &&
          ot(N.profile) &&
          (sn(),
          me(
            () => import(`./tag-BoiZZ9xV.js`),
            __vite__mapDeps([
              34, 10, 11, 5, 6, 7, 1, 8, 12, 13, 14, 2, 3, 15, 16, 17, 18, 19,
              20, 29, 9, 30, 31, 35,
            ]),
          )),
        x.active ||
          this.chat?.system(
            `Welcome to the Skate Hub! Roll into a portal, tap ${or(`grind`)} to join, hold it to start.`,
          ),
        x.active || this.offerName(r),
        (this.roomMenu = () => {
          let e = f.actions(),
            t = {
              id: `invite`,
              label: `Invite friends`,
              short: `Invite`,
              icon: `party`,
              act: ju(u),
            },
            n = x.active
              ? [
                  {
                    id: `skip-tutorial`,
                    label: `Skip tutorial`,
                    short: `Skip`,
                    icon: `close`,
                    act: ju(() => x.skip()),
                  },
                  t,
                ]
              : e
                ? e.map((e) => ({
                    id: e.id,
                    label: e.label,
                    short: e.short,
                    icon: e.icon,
                    act: ju(e.run),
                  }))
                : [
                    {
                      id: `play`,
                      label: `Play a mode`,
                      short: `Play`,
                      icon: `star`,
                      act: (e) =>
                        void e
                          .push(
                            qu((e) => ({
                              count: i.portals.get(e)?.count ?? 0,
                              left: Xu(i, e, r.clock.serverNow()),
                            })),
                          )
                          .then((t) => {
                            t && (e.resolve(), f.join(t));
                          }),
                    },
                    `career`,
                    `skaters`,
                    t,
                  ],
            a = [
              `missions`,
              `parks`,
              `ranks`,
              `profile`,
              `packs`,
              `settings`,
              `help`,
            ];
          return {
            place: X.view ? `Skate Hub · Party ${X.view.code}` : `Skate Hub`,
            hue: `#4F6BFF`,
            actions: n,
            more: n.includes(`career`) ? a : [`career`, `skaters`, ...a],
            board: () =>
              Zu(
                i,
                r.sessionId,
                r.clock.serverNow(),
                X.view,
                r.roomId,
                x.active,
              ),
          };
        }),
        (a.local.onEvents = (e, t) => {
          (Z.simEvents(e, t, a), x.events(e, t));
        }),
        (this.screen = `plaza`),
        document.body.classList.add(`playing`),
        Dt(),
        this.transition.covered && (await this.transition.reveal()),
        Z.enterPark(n.world.layout.id));
    }
    async recover() {
      (await this.teardown(), await this.enterPlaza({ kind: `rejoin` }));
    }
    async invite() {
      if (X.connecting) {
        this.announcer.toast(`Your party is still connecting…`, `white`);
        return;
      }
      let e = X.view?.code;
      if (e) {
        this.share(Wr(e), `Skate with me in Tailgrab! Party ${e}`);
        return;
      }
      try {
        await Ur();
      } catch (e) {
        this.announcer.toast(`Couldn't start a party: ${P(e)}`, `red`);
        return;
      }
      X.view && this.nav.open(Wa(X.view.code));
    }
    share(e, t) {
      Ua(e, t).then((e) => {
        e === `copied` && this.announcer.toast(`Invite link copied!`, `mint`);
      });
    }
    setUrl(e = this.parkInUrl) {
      this.parkInUrl = e ?? ``;
      let t = new URL(location.href);
      for (let e of [`plaza`, `park`, `party`]) t.searchParams.delete(e);
      this.parkInUrl && t.searchParams.set(`park`, this.parkInUrl);
      let n = X.view?.code;
      (n && t.searchParams.set(`party`, n),
        t.href !== location.href && this.nav.replaceUrl(t));
    }
    async enterPark(e, t = !1) {
      let n = this.screen;
      if (n !== `title` && n !== `plaza` && n !== `park` && n !== `boot`)
        return;
      ((this.screen = `transition`),
        await this.transition.cover(
          t ? `MAP OF THE DAY` : `PLAYER PARK`,
          `Park ${e}`,
          { icon: t ? `star` : `hammer` },
        ));
      let r;
      try {
        r = await jt(e, t);
      } catch (e) {
        (console.warn(`park`, e),
          this.announcer.toast(P(e), `red`),
          n === `plaza` || n === `park`
            ? ((this.screen = n), await this.transition.reveal())
            : await this.enterPlaza({ kind: `public` }));
        return;
      }
      let i = this.hub?.room ?? this.park?.room;
      ((this.leaving = !0),
        await this.teardown(),
        i?.leave(!0).catch(() => {}),
        (this.leaving = !1),
        (this.hub = null),
        (this.park = null),
        this.showroom?.dispose(),
        (this.showroom = null),
        await this.openPark(r));
    }
    async openPark(e) {
      ((this.park = e), (this.roomAt = performance.now()));
      let t = e.room,
        n = t.state,
        r = t.sessionId;
      (this.setUrl(n.daily ? null : n.code), Kr(`park`, t.roomId));
      let i = new ya(this.stage, e, this.zones, {
        canSkate: () => !n.editing.get(r),
      });
      (this.wireCommon(i, t, () => n.skaters, `park`),
        await i.loadPark({ baked: !1 }),
        (this.session = i));
      let a = () => !!n.owners.get(r),
        o = () => !n.daily && (a() || n.openBuild || !!n.builders.get(r)),
        s = () =>
          this.share(Xc(n.code), `Skate my park "${n.name}" in Tailgrab!`),
        c = () => void this.invite(),
        l = new ParkEditor({
          stage: this.stage,
          session: i,
          room: t,
          state: n,
          ui: this.ui,
          canBuild: o,
          isOwner: a,
          share: s,
          toast: (e, t) => this.announcer.toast(e, t),
          menu: () => this.openMenu(),
          padOverlay: (e) => {
            this.padNav.overlay = e;
          },
        });
      ((this.builder = l),
        (this.parkHud = new ParkPill(this.ui, this.dock, n.ownerName, c, () =>
          l.enter(),
        )),
        (this.roomMenu = () => {
          let e = {
              id: `invite`,
              label: `Invite friends`,
              short: `Invite`,
              icon: `party`,
              act: ju(c),
            },
            t = {
              id: `share`,
              label: `Share park`,
              short: `Share`,
              icon: `invite`,
              act: ju(s),
            },
            i = (e, t, n, r, i) => ({
              id: e,
              label: t,
              short: n,
              icon: r,
              act: ju(i),
            }),
            u = l.active
              ? [
                  i(`skate`, `Skate ▶`, `Skate`, `deck`, () => l.exit()),
                  i(`spawn`, `Move spawn`, `Spawn`, `target`, () =>
                    l.startSpawn(),
                  ),
                  ...(a()
                    ? [
                        i(`park`, `Park settings`, `Settings`, `pencil`, () =>
                          l.openSettings(),
                        ),
                      ]
                    : []),
                  t,
                  e,
                ]
              : [
                  ...(o()
                    ? [i(`build`, `Build`, `Build`, `build`, () => l.enter())]
                    : []),
                  i(`respawn`, `Back to spawn`, `Respawn`, `target`, () =>
                    z.tap(`reset`),
                  ),
                  ...(n.daily ? [] : [t]),
                  e,
                ];
          return {
            place: n.daily
              ? `Map of the Day · ${n.name}`
              : `${n.name} · Park ${n.code}`,
            hue: `#1FC7E8`,
            resume: l.active ? `Back to building` : void 0,
            actions: u,
            more: [
              `missions`,
              `parks`,
              `ranks`,
              `profile`,
              `packs`,
              `settings`,
              `help`,
            ],
            out: {
              id: `plaza`,
              label: `Back to the Skate Hub`,
              short: `Skate Hub`,
              icon: `home`,
              act: () => void this.leavePark(),
            },
            board: () => rd(n, r),
          };
        }));
      let u = n.rev,
        d = n.openBuild,
        f = new Set();
      (t.onStateChange(() => {
        if (this.park?.room !== t) return;
        if (n.rev !== u) {
          u = n.rev;
          let e = se(Pt(n));
          (i.setWorld(e),
            l.onWorld(e),
            this.meshTimer && clearTimeout(this.meshTimer),
            (this.meshTimer = setTimeout(() => {
              ((this.meshTimer = null), i.park?.rebuild(i.net.world.layout));
            }, 80)));
        }
        n.openBuild !== d &&
          ((d = n.openBuild),
          a() ||
            this.chat?.system(
              d ? `Building is open — press B to build!` : `Building closed.`,
            ));
        let e = new Set(n.editing.keys());
        for (let t of f) e.has(t) || this.bubbles.badge(t, null);
        for (let t of e)
          f.has(t) || this.bubbles.badge(t, `building`, `build`, ``, `hammer`);
        f = e;
      }),
        (i.onFrame = () => {
          (l.active && !o() && l.exit(!1),
            this.parkHud?.update(n.name, o() && !l.active));
        }),
        t.onLeave((e) => {
          this.leaving ||
            this.park?.room !== t ||
            (this.announcer.toast(`Disconnected (${e}). Reconnecting…`, `red`),
            this.recoverPark(n.code, n.daily));
        }),
        this.chat?.system(
          n.daily
            ? `Today's Map of the Day: ${n.name} by ${n.ownerName}!`
            : `Welcome to ${n.name} by ${n.ownerName}!${o() ? ` Press B to build.` : ``}`,
        ),
        (this.screen = `park`),
        document.body.classList.add(`playing`),
        Dt(),
        this.transition.covered && (await this.transition.reveal()),
        Z.enterPark(e.world.layout.id),
        a() && n.pieces.size === 0 && l.enter());
    }
    async recoverPark(e, t) {
      (await this.teardown(),
        (this.park = null),
        (this.screen = `park`),
        await this.enterPark(e, t));
    }
    async leavePark() {
      if (this.screen !== `park`) return;
      ((this.screen = `transition`),
        await this.transition.cover(`BACK TO THE SKATE HUB`, `Skate Hub`));
      let e = this.park?.room;
      ((this.leaving = !0),
        await this.teardown(),
        e?.leave(!0).catch(() => {}),
        (this.leaving = !1),
        (this.park = null),
        await ti(),
        await this.enterPlaza({ kind: `rejoin` }));
    }
    async toMatch(e) {
      if (!gr(e.mode) || this.screen !== `plaza`) return;
      ((this.screen = `transition`),
        (this.lastMode = e.mode),
        Z.ui(`matchFound`),
        await this.transition.cover(`MATCH FOUND!`, ad(e.parkId), {
          mode: e.mode,
          roster: e.roster,
        }));
      let t;
      try {
        t = await Mn(e.reservation);
      } catch (t) {
        (console.warn(`seat reservation failed`, t),
          this.hub?.room.send(`matchFailed`, { mode: e.mode }),
          (this.screen = `plaza`),
          await this.transition.reveal(),
          this.announcer.toast(
            `Match slipped away — you're back in the queue.`,
            `red`,
          ));
        return;
      }
      let n = this.hub?.room;
      ((this.leaving = !0),
        await this.teardown(),
        n?.leave(!0).catch(() => {}),
        (this.leaving = !1),
        (this.hub = null),
        Kr(`match`),
        await this.enterMatch(t));
    }
    async startCareer(e, t = !0) {
      let n = R(e),
        r = this.screen;
      if (
        !n ||
        (r !== `title` && r !== `plaza` && r !== `match` && r !== `boot`)
      )
        return;
      this.screen = `transition`;
      let i = ad(n.parkId);
      (await this.transition.cover(
        `CAREER`,
        i === n.name ? n.name : `${n.name} · ${i}`,
        { mode: `career` },
      ),
        t && (await ti()));
      let a;
      try {
        a = await kn(n.id);
      } catch (e) {
        (console.warn(`career`, e),
          this.announcer.toast(P(e), `red`),
          r === `plaza` || r === `match`
            ? ((this.screen = r), await this.transition.reveal())
            : await this.enterPlaza({ kind: `public` }));
        return;
      }
      let o = this.hub?.room ?? this.match?.room;
      ((this.leaving = !0),
        await this.teardown(),
        o?.leave(!0).catch(() => {}),
        (this.leaving = !1),
        (this.hub = null),
        this.showroom?.dispose(),
        (this.showroom = null),
        Kr(`career`),
        await this.enterMatch(a));
    }
    async enterMatch(e) {
      ((this.match = e), (this.roomAt = performance.now()));
      let t = e.room,
        n = t.state,
        r = n.mode,
        i = new ya(this.stage, e, this.zones, {
          canSkate: (e) => _f(n, t.sessionId, e),
          camTarget: () =>
            r === `horse` &&
            (n.phase === K.PLAYING || n.phase === K.OVERTIME) &&
            n.horse.activeId
              ? n.horse.activeId
              : t.sessionId,
          hidden: (e) =>
            r === `horse` &&
            (n.phase === K.PLAYING || n.phase === K.OVERTIME) &&
            !!n.horse.activeId &&
            e !== n.horse.activeId,
          orbit: () => {
            if (n.phase !== K.INTRO || !n.countdownAt || J.reducedMotion)
              return 0;
            let e = Math.max(
              0,
              Math.min(1, (t.clock.serverNow() - n.countdownAt) / br),
            );
            return Math.PI * 0.85 * (1 - e * e * (3 - 2 * e));
          },
        });
      (this.wireCommon(i, t, () => n.skaters, `match`),
        await i.loadPark(),
        (this.session = i),
        (this.matchHud = new MatchHud(
          this.zones,
          r,
          (e, n) => t.send(e, n),
          () => void this.backToPlaza(),
        )),
        (this.matchHud.onCount = (e) => Z.ui(`count${e}`)),
        (this.matchHud.onGo = () => Z.ui(`go`)),
        (this.matchHud.sfx = (e, t) => Z.ui(e, t)),
        (this.matchHud.now = () => t.clock.serverNow()),
        (this.matchHud.comboOf = (e) => {
          let r = e === t.sessionId ? i.local.state : n.skaters.get(e);
          return r && r.comboMult > 0 ? r.comboBase * r.comboMult : 0;
        }));
      let a = [() => document.body.classList.remove(`in-results`, `is-it`)];
      this.matchHud.onRound = () => {
        for (let e of a) e();
      };
      let o = r === `career` ? `career` : `mode`,
        s = r === `career` ? n.career.level : r;
      if ((a.push(() => qn(o, s, `start`)), r === `skate`)) {
        this.markers = new EdgeMarkers(this.ui);
        let e = () => [...n.letters].map((e) => ({ x: e.x, y: e.y, z: e.z })),
          r = ``;
        i.onFrame = (i) => {
          let a = e(),
            o = a.map((e) => `${e.x},${e.z}`).join(`|`);
          o !== r &&
            a.length &&
            ((r = o),
            this.letters?.dispose(),
            (this.letters = new SkateLetters(a)),
            this.stage.scene.add(this.letters.group));
          let s = n.roster.get(t.sessionId)?.letters ?? 0;
          this.letters?.update(i, s);
          let c = n.phase === K.PLAYING || n.phase === K.COUNTDOWN;
          (this.markers?.update(
            this.stage.camera,
            c
              ? a.flatMap((e, t) =>
                  s & (1 << t)
                    ? []
                    : [
                        {
                          key: `L${t}`,
                          x: e.x,
                          y: e.y,
                          z: e.z,
                          label: `SKATE`[t],
                          color: [
                            `#FF3D7F`,
                            `#FF8A1F`,
                            `#FFD21F`,
                            `#2FD67B`,
                            `#1FC7E8`,
                          ][t],
                        },
                      ],
                )
              : [],
          ),
            this.matchHud?.update(n, t.sessionId, t.clock.serverNow()));
        };
      } else if (r === `career`) {
        this.markers = new EdgeMarkers(this.ui);
        let r = R(n.career.level);
        this.finds = r
          ? new Collectibles(r.parkId, r.id, (e) => this.stage.scene.add(e.group))
          : null;
        let a =
          J.tips >= 0
            ? new Coach(
                Jo() ? this.zones.lane : this.ui,
                `run`,
                () => Z.ui(`letter`),
                () => {},
              )
            : null;
        ((this.coach = a),
          a &&
            (i.local.onEvents = (e, t) => {
              (Z.simEvents(e, t, i), a.events(e, t));
            }));
        let o = ++this.ghostGen;
        GhostNet.open(
          n.career.level,
          this.stage.scene,
          e.world.col,
          this.bubbles,
        ).then((e) => {
          o === this.ghostGen ? (this.ghosts = e) : e?.dispose();
        });
        let s = ``;
        ((i.onFrame = (e, o) => {
          let c = n.career;
          (a?.hold(n.phase !== K.PLAYING && n.phase !== K.OVERTIME),
            a?.frame(),
            this.ghosts?.frame(
              o,
              e,
              i.local.state,
              n.phase === K.PLAYING || n.phase === K.OVERTIME,
            ),
            this.finds?.update(
              e,
              ua(vn()),
              N.profile,
              n.phase === K.PLAYING || n.phase === K.OVERTIME,
            ));
          let l = [...c.spots].map((e) => `${e.x},${e.z},${e.item}`).join(`|`);
          (l !== s &&
            ((s = l),
            this.letters?.dispose(),
            (this.letters = c.spots.length
              ? new SkateLetters(
                  [...c.spots].map((e) => ({
                    x: e.x,
                    y: e.y,
                    z: e.z,
                    item: e.item,
                  })),
                )
              : null),
            this.letters && this.stage.scene.add(this.letters.group)),
            this.letters?.update(e, c.got));
          let u =
              n.phase === K.PLAYING ||
              n.phase === K.COUNTDOWN ||
              n.phase === K.OVERTIME,
            d = (e) => !e || e.kind === `spot`,
            f = (e) => !!c.goals[e]?.done,
            p = !!r && Zt(r, f),
            m = (e) =>
              [...c.spots].some((t, n) => t.goal === e && !!(c.got & (1 << n))),
            h =
              !u || !p
                ? []
                : r.starter
                    .flatMap((e) => {
                      let t = r.goals.findIndex((t) => t.id === e),
                        n = r.goals[t]?.at;
                      return n && !f(t)
                        ? [
                            {
                              key: `G${t}`,
                              ...n,
                              label: r.goals[t].text,
                              color: `#2FD67B`,
                              sticker: `flag`,
                            },
                          ]
                        : [];
                    })
                    .slice(0, 3),
            g = u
              ? [...c.spots].flatMap((e, t) => {
                  let n = r?.goals[e.goal];
                  return c.got & (1 << t) ||
                    d(n) ||
                    f(e.goal) ||
                    (p && !r.starter.includes(n.id) && !m(e.goal))
                    ? []
                    : [
                        {
                          key: `C${t}`,
                          x: e.x,
                          y: e.y,
                          z: e.z,
                          label: e.item,
                          color: `#A55BFF`,
                          sticker: Ra(e.item) ? e.item : void 0,
                        },
                      ];
                })
              : [],
            _ = [...h, ...g];
          (this.markers?.update(this.stage.camera, _),
            this.matchHud?.update(n, t.sessionId, t.clock.serverNow()));
        }),
          t.onMessage(`pickup`, (e) => {
            if (e.sid !== t.sessionId) return;
            let i = n.career.spots[e.i];
            i &&
              (Z.ui(`letter`),
              Z.burst(i.x, i.y, i.z, [`#FFD21F`, `#FFFFFF`, `#A55BFF`]),
              r?.goals[i.goal]?.kind === `skate` &&
                this.announcer.big(i.item, `mint`, `letter get!`));
          }),
          t.onMessage(`goal`, (e) => {
            if (e.sid !== t.sessionId) return;
            let n =
              N.profile && Et(N.profile).earned < yc ? ` · +1 stat point` : ``;
            (this.announcer.big(`GOAL!`, `mint`, e.text + n, 1600),
              Z.ui(`letter`));
          }),
          (this.matchHud.onMenu = () => void this.toMenu()),
          (this.matchHud.onLevels = () => void this.pickCareer()),
          (this.matchHud.onNext = (e) => void this.startCareer(e)),
          (this.matchHud.onStats = () => this.openStats()));
      } else if (r === `tag`) {
        this.markers = new EdgeMarkers(this.ui);
        let e = ``,
          r = ``,
          o = 0,
          s = (e) =>
            this.bubbles.badge(e, n.skaters.get(e)?.bot ? `PRO` : null, `pro`);
        (a.push(() => {
          (e && s(e), r && s(r), (e = r = ``));
        }),
          (i.onFrame = () => {
            let a = n.phase === K.PLAYING || n.phase === K.OVERTIME,
              c = t.clock.serverNow(),
              l = a ? n.tag.itId : ``;
            l !== e &&
              (e && e !== r && s(e),
              l && this.bubbles.badge(l, `IT!`, `it`),
              (e = l));
            let u =
              a && n.tag.noBackId !== l && c < n.tag.noBackUntil
                ? n.tag.noBackId
                : ``;
            u !== r &&
              (r && r !== l && s(r),
              u && this.bubbles.badge(u, `SAFE`, `safe`),
              (r = u));
            let d = t.sessionId,
              f = [];
            if (l === d)
              for (let [e, t] of n.skaters) {
                let n = e !== d && e !== u ? i.posOf(e) : null;
                n &&
                  f.push({
                    key: e,
                    x: n.x,
                    y: n.y + 1.6,
                    z: n.z,
                    label: t.name.split(` `)[0].slice(0, 8),
                    color: Xi[t.color] ?? `#fff`,
                  });
              }
            else if (l) {
              let e = i.posOf(l);
              e &&
                f.push({
                  key: `it`,
                  x: e.x,
                  y: e.y + 1.6,
                  z: e.z,
                  label: `IT`,
                  color: `#FF5A4F`,
                });
            }
            this.markers?.update(this.stage.camera, f);
            let p = !1,
              m = l && l !== d ? i.posOf(l) : null;
            if (m) {
              let e = i.localFrame,
                t = m.x - e.x,
                n = m.z - e.z,
                r = Math.hypot(t, n),
                a = this.stage.camera.matrixWorld.elements,
                s = t * -a[8] + n * -a[10] < 0;
              if (r < 10) {
                p = s && !z.isHeld(`look`);
                let e = performance.now();
                e - o > 260 + r * 70 && ((o = e), Z.ui(`tagNear`));
              }
            }
            (this.matchHud?.danger(p),
              this.matchHud?.update(n, t.sessionId, c));
          }));
      } else
        i.onFrame = () =>
          this.matchHud?.update(n, t.sessionId, t.clock.serverNow());
      if (r === `graffiti`) {
        let e = () => {
          for (let [e, t] of n.graffiti) {
            let r = t.owner ? n.roster.get(t.owner) : null;
            i.park?.paint(Number(e), r ? Xi[r.color] : null);
          }
        };
        (e(),
          a.push(e),
          t.onMessage(`paint`, (e) => {
            let r = n.roster.get(e.sid),
              a = r ? Xi[r.color] : `#fff`;
            for (let t of [...e.claimed, ...e.stolen.map((e) => e.piece)])
              i.park?.paint(t, a, { x: e.x, z: e.z });
            Z.paint(e.x, e.z, a, e.sid === t.sessionId);
            let o = e.claimed.length + e.stolen.length;
            e.sid === t.sessionId
              ? this.announcer.big(
                  e.stolen.length ? `STOLEN!` : `TAGGED!`,
                  `pink`,
                  `${o} piece${o > 1 ? `s` : ``}`,
                )
              : e.stolen.some((e) => e.from === t.sessionId) &&
                this.announcer.toast(
                  `${r?.name} stole your paint!`,
                  `red`,
                  void 0,
                  `spray`,
                );
          }),
          t.onMessage(`results`, e));
      }
      (t.onMessage(`letter`, (e) => {
        if (e.sid !== t.sessionId) return;
        (this.announcer.big(`SKATE`[e.i] ?? `!`, `mint`, `letter get!`),
          Z.ui(`letter`));
        let r = n.letters[e.i];
        r && Z.burst(r.x, r.y, r.z, [`#FFD21F`, `#FFFFFF`, `#2FD67B`]);
      }),
        t.onMessage(`tagged`, (e) => {
          let r = t.sessionId,
            a = (e) => n.roster.get(e)?.name ?? ``;
          if ((document.body.classList.toggle(`is-it`, e.it === r), !e.by)) {
            let i = () => {
                e.it === r &&
                  (this.announcer.big(
                    `YOU'RE IT!`,
                    `red`,
                    `bump someone to pass it on`,
                  ),
                  Z.ui(`tagged`));
              },
              a = n.playStartsAt + 800 - t.clock.serverNow();
            a > 0 ? setTimeout(i, a) : i();
            return;
          }
          let o =
            e.x === void 0
              ? i.posOf(e.it)
              : { x: e.x, y: e.y ?? 0, z: e.z ?? 0 };
          (this.bubbles.pop(e.it, `BONK!`, `tag-bonk`, 900),
            Z.skinTag(e.by, e.it),
            e.it === r
              ? (this.announcer.big(
                  `YOU'RE IT!`,
                  `red`,
                  `tagged by ${a(e.by)} — pass it on!`,
                ),
                o && Z.tag(o, `victim`))
              : e.by === r
                ? (this.announcer.big(
                    `TAGGED ${a(e.it).toUpperCase()}!`,
                    `gold`,
                    `you're free`,
                  ),
                  o && Z.tag(o, `tagger`))
                : (this.announcer.toast(
                    `${a(e.by)} tagged ${a(e.it)}!`,
                    `white`,
                    2e3,
                  ),
                  o && Z.tag(o, `other`)));
        }),
        t.onMessage(`results`, (e) => {
          (qn(
            o,
            s,
            r === `career` && !(N.profile && Mt(N.profile, s))
              ? `fail`
              : `complete`,
          ),
            Z.ui(`results`),
            document.body.classList.add(`in-results`),
            document.body.classList.remove(`is-it`),
            e.order.forEach((e, n) =>
              i
                .viewOf(e)
                ?.playPose?.(n === 0 ? `win` : `lose`, pe(de(t.roomId, e))),
            ));
        }),
        t.onMessage(`backToPlaza`, () => void this.backToPlaza()),
        t.onMessage(`abort`, (e) => {
          (this.announcer.toast(e.reason, `red`),
            setTimeout(() => void this.backToPlaza(wr(r) ? r : void 0), 1500));
        }),
        t.onLeave(() => {
          !this.leaving && this.match?.room === t && this.backToPlaza();
        }),
        (this.roomMenu = () => {
          let e = r === `career`,
            i =
              n.phase === K.COUNTDOWN ||
              n.phase === K.PLAYING ||
              n.phase === K.OVERTIME,
            a = n.phase === K.PLAYING || n.phase === K.OVERTIME,
            o = {
              id: `plaza`,
              label: `Quit to the Skate Hub`,
              short: e ? `Quit` : i ? `Forfeit` : `Skate Hub`,
              icon: `home`,
              confirm: i
                ? e
                  ? `Quit this run? Again to go`
                  : `Forfeit? Again to go`
                : void 0,
              act: () => void this.backToPlaza(),
            },
            s = i ? `The clock keeps running in here.` : void 0,
            c = [`missions`, `ranks`, `profile`, `packs`, `settings`, `help`];
          if (e)
            return {
              place: `Career · ${R(n.career.level)?.name ?? ``}`,
              hue: q.career.color,
              note: s,
              out: o,
              more: c,
              actions: [
                ...(a
                  ? [
                      {
                        id: `retry`,
                        label: `Retry run`,
                        short: `Retry`,
                        icon: `spin`,
                        confirm: `Retry? Again to go`,
                        act: ju(() => void ti().then(() => t.send(`retry`))),
                      },
                      {
                        id: `end`,
                        label: `End run`,
                        icon: `clock`,
                        confirm: `End the run? Again to go`,
                        act: ju(() => t.send(`endRun`)),
                      },
                    ]
                  : []),
                {
                  id: `levels`,
                  label: `Change level`,
                  short: `Levels`,
                  icon: `career`,
                  act: (e) =>
                    void e.push(zc()).then((e) => {
                      e && this.startCareer(e);
                    }),
                },
              ],
              board: () => td(n, t.clock.serverNow(), N.profile),
            };
          let l =
            [...n.roster.entries()].filter(
              ([e, t]) => !t.left && !n.skaters.get(e)?.bot,
            ).length === 1;
          return {
            place: `${q[r].name} · ${ad(n.parkId)}`,
            hue: q[r].color,
            note: s,
            out: o,
            more: c,
            actions:
              a && l
                ? [
                    {
                      id: `retry`,
                      label: `Restart`,
                      icon: `spin`,
                      confirm: `Restart? Again to go`,
                      act: ju(() => t.send(`retry`)),
                    },
                  ]
                : [],
            board: () => nd(n, t.sessionId, t.clock.serverNow()),
          };
        }),
        t.send(`loaded`, {}),
        Dt(),
        this.chat?.system(
          r === `career`
            ? `— Career: ${R(n.career.level)?.name ?? ``} —`
            : `— ${q[r].name} @ ${ad(n.parkId)} —`,
        ),
        (this.screen = `match`),
        document.body.classList.add(`playing`),
        await this.transition.reveal(),
        Z.enterPark(e.world.layout.id));
    }
    async backToPlaza(e) {
      if (this.screen !== `match`) return;
      ((this.screen = `transition`),
        await this.transition.cover(`BACK TO THE SKATE HUB`, `Skate Hub`));
      let t = this.match?.room;
      ((this.leaving = !0),
        await this.teardown(),
        t?.leave(!0).catch(() => {}),
        (this.leaving = !1),
        (this.match = null),
        await ti(),
        await this.enterPlaza({ kind: `rejoin`, requeue: e }));
    }
    wireCommon(e, t, n, r) {
      this.installChat((e, n) => t.send(e, n));
      let i = (e) =>
          n().get(e)?.name ?? (e.startsWith(`bot-`) ? `A pro` : `Someone`),
        a = (e) => Xi[n().get(e)?.color ?? 0] ?? `#fff`,
        o = (e) => {
          (this.bubbles.upsert(e, i(e), a(e), e === t.sessionId),
            n().get(e)?.bot && this.bubbles.badge(e, `PRO`, `pro`));
        };
      o(t.sessionId);
      for (let e of n().keys()) o(e);
      ((e.onRemoteAdd = (e) => {
        (o(e),
          (this.screen === `plaza` || this.screen === `park`) &&
            !n().get(e)?.bot &&
            this.chat?.system(`${i(e)} rolled in`));
      }),
        (e.onRemoteRemove = (e) => this.bubbles.remove(e)),
        t.onMessage(`chat`, (e) => {
          I.freeChat &&
            (this.chat?.line(i(e.sid), a(e.sid), e.text, e.sid),
            this.chat?.muted.has(e.sid) || this.bubbles.say(e.sid, e.text),
            Z.ui(`chat`));
        }),
        t.onMessage(`emote`, (t) => {
          (this.bubbles.emote(t.sid, t.id),
            e
              .viewOf(t.sid)
              ?.playEmote?.(
                [
                  `emote-cheer`,
                  `emote-dance`,
                  `emote-wave`,
                  `emote-cheer`,
                  `emote-dance`,
                  `emote-shrug`,
                  `emote-wave`,
                  `emote-wave`,
                ][t.id] ?? `emote-wave`,
              ),
            this.chat?.line(i(t.sid), a(t.sid), nn[t.id] ?? ``, t.sid));
        }),
        t.onMessage(`profile`, (e) => Tt(e.profile, e.events)),
        t.onMessage(`lvlup`, (e) => {
          e.sid !== t.sessionId &&
            (this.bubbles.pop(e.sid, `LEVEL ${e.level}!`, `lvl`, 2200),
            Z.levelUpAt(e.sid),
            (this.screen === `plaza` || this.screen === `park`) &&
              this.chat?.system(`${i(e.sid)} hit LV ${e.level}!`));
        }),
        t.onMessage(`combo`, (n) => {
          n.sid === t.sessionId
            ? e.local.combos.confirm(n.seq)
            : n.score >= 5e3 &&
              this.announcer.toast(
                `${i(n.sid)} landed ${n.score.toLocaleString()}!`,
                `white`,
              );
        }),
        (e.local.onCombo = (e) => {
          if (r === `match` && t.state.mode === `horse`) {
            Z.landed(e.score);
            return;
          }
          let n = ja(e.score),
            i = r === `match` ? this.matchHud : null,
            a = i?.scoreEl
              ? { to: () => i.scoreEl, land: () => i.releaseScore() }
              : void 0;
          (a && i.holdScore(2400),
            this.announcer.landing(
              `+${e.score.toLocaleString()}`,
              n?.tone ?? `white`,
              n?.text,
              n ? 1300 : 900,
              a,
            ),
            Z.landed(e.score));
        }),
        (e.local.onComboRejected = () =>
          this.announcer.toast(`…the server saw a bail`, `red`)),
        (e.local.onEvents = (t, n) => Z.simEvents(t, n, e)),
        Z.bind(e, this.announcer),
        this.addCorner(t),
        this.watchConnection(t));
    }
    reconnectPill = null;
    watchConnection(e) {
      let t = () =>
        e === this.hub?.room || e === this.match?.room || e === this.park?.room;
      (e.onDrop(() => {
        t() &&
          ((this.reconnectPill ??= j(`div`, `reconnect-pill`, `Reconnecting…`)),
          this.ui.append(this.reconnectPill));
      }),
        e.onReconnect(() => {
          t() &&
            (this.reconnectPill?.remove(),
            this.announcer.toast(`Back online!`, `mint`, void 0, `board`));
        }));
    }
    corner = null;
    ping = null;
    addCorner(e) {
      (this.corner?.remove(), this.ping?.dispose(), (this.ping = new PingPill(e)));
      let t = j(`div`, `corner-btns interactive`);
      this.chat?.mountButton(t);
      let n = j(`button`, `ico-btn menu-btn`);
      ((n.type = `button`),
        n.setAttribute(`aria-label`, `Menu`),
        n.append(U(`menu`), j(`span`, `ico-label`, `Menu`)),
        n.addEventListener(`click`, () => this.openMenu()),
        t.append(n),
        t.prepend(this.ping.el),
        (this.corner = t),
        (Jo() ? this.zones.head : this.ui).append(t));
    }
    openStats() {
      this.nav.level > 0 || this.nav.open(Tc());
    }
    openMenu() {
      let e = this.screen;
      if (
        (e !== `plaza` && e !== `match` && e !== `park`) ||
        this.nav.level > 0 ||
        this.chat?.showing ||
        this.ui.querySelector(`.modal-back`)
      )
        return;
      let t = this.roomMenu?.();
      if (!t) return;
      let n = this.sharedEntries(),
        r = (e) =>
          e.flatMap((e) => (typeof e == `string` ? (n[e] ?? []) : [e])),
        i = {
          id: `main`,
          label: `Main menu`,
          icon: `deck`,
          confirm: t.out?.confirm,
          act: () => void this.toMenu(),
        };
      this.nav.open(
        Pu({ ...t, actions: r(t.actions), more: r(t.more), quits: [i] }),
      );
    }
    sharedEntries() {
      let e = this.hub?.room,
        t = N.profile ? $i(N.profile.missions) : 0,
        n = bc();
      return {
        skaters: e
          ? {
              id: `skaters`,
              label: `Change skater`,
              short: `Skaters`,
              icon: `skaters`,
              badge: ni() ? `NEW` : void 0,
              act: (t) =>
                void t
                  .push(qs())
                  .then((t) =>
                    t && `career` in t
                      ? this.startCareer(t.career)
                      : this.rideAs(e, t, `NEW LOOK!`),
                  ),
            }
          : null,
        career: {
          id: `career`,
          label: `Career`,
          icon: `career`,
          act: (e) =>
            void e.push(zc()).then((e) => {
              e && this.startCareer(e);
            }),
        },
        missions: {
          id: `missions`,
          label: `Missions`,
          icon: `missions`,
          badge: t ? String(t) : void 0,
          act: (e) => void e.push($l()),
        },
        parks: {
          id: `parks`,
          label: `Parks`,
          icon: `parks`,
          act: (e) =>
            void e.push(El()).then((e) => {
              e && this.enterPark(e.code, e.via === `daily`);
            }),
        },
        ranks: {
          id: `ranks`,
          label: `Ranks`,
          icon: `ranks`,
          act: (e) => void e.push(Ml({ watch: !1 })),
        },
        profile: {
          id: `profile`,
          label: `Profile`,
          icon: `user`,
          badge: n ? `+${n}` : void 0,
          act: (e) => void e.push(Tc()),
        },
        packs: Lo
          ? {
              id: `packs`,
              label: `Packs`,
              icon: `chest`,
              act: (e) => void e.push(gs()),
            }
          : null,
        settings: {
          id: `settings`,
          label: `Settings`,
          icon: `gear`,
          act: (e) => void e.push(Pl()),
        },
        help: {
          id: `help`,
          label: `Help`,
          icon: `help`,
          act: (e) =>
            void e.push(
              Hl({
                onReplay: () => {
                  (this.coach?.restart(),
                    this.goals?.hide(),
                    this.missionsChip?.hide(),
                    e.resolve());
                },
              }),
            ),
        },
      };
    }
    async toMenu() {
      let e = this.screen;
      if (e !== `plaza` && e !== `match` && e !== `park`) return;
      ((this.screen = `transition`),
        await this.transition.cover(`MAIN MENU`, `See you soon!`));
      let t = this.hub?.room ?? this.match?.room ?? this.park?.room;
      ((this.leaving = !0),
        await this.teardown(),
        t?.leave(!0).catch(() => {}),
        (this.leaving = !1),
        (this.hub = null),
        (this.match = null),
        (this.park = null),
        this.setUrl(null),
        await this.lobby(``, In(), !1));
    }
    async offerName(e) {
      if (!ot(N.profile)) return;
      sn();
      let t = () => !!e.state.skaters.get(e.sessionId)?.queue;
      for (let n = 0; n < 250;) {
        if ((await new Promise((e) => setTimeout(e, 50)), this.hub?.room !== e))
          return;
        n = z.heldBits() || t() || this.transition.covered ? 0 : n + 50;
      }
      this.screen === `plaza` &&
        ot(N.profile) &&
        this.nav.top !== `tag` &&
        (await this.rideAs(e, { skater: ai(), color: J.color }, ``));
    }
    async rideAs(e, t, n) {
      if (!t || this.screen !== `plaza` || this.hub?.room !== e) return;
      let r = null;
      if (ot(N.profile)) {
        let i = t.skater,
          a = t.color;
        if (
          ((r = await this.nav.open(
            me(
              () =>
                import(`./tag-BoiZZ9xV.js`).then((e) =>
                  e.tagPage({ skater: i, color: a }),
                ),
              __vite__mapDeps([
                34, 10, 11, 5, 6, 7, 1, 8, 12, 13, 14, 2, 3, 15, 16, 17, 18, 19,
                20, 29, 9, 30, 31, 35,
              ]),
            ),
          )),
          this.screen !== `plaza` || this.hub?.room !== e)
        )
          return;
        r && ((t = { ...t, color: r.color }), (n = `${r.name.toUpperCase()}!`));
      }
      (Us(t) || r) &&
        (Yr(),
        (this.screen = `transition`),
        await this.transition.cover(n, `Skate Hub`),
        (this.leaving = !0),
        await this.teardown(),
        e.leave(!0).catch(() => {}),
        (this.leaving = !1),
        (this.hub = null),
        await this.enterPlaza({ kind: `rejoin` }));
    }
    async teardown() {
      (this.nav.closeAll(),
        (this.roomMenu = null),
        this.builder?.dispose(),
        (this.builder = null),
        this.parkHud?.dispose(),
        (this.parkHud = null),
        (this.meshTimer &&= (clearTimeout(this.meshTimer), null)),
        document.body.classList.remove(
          `playing`,
          `is-it`,
          `in-results`,
          `building`,
        ),
        this.reconnectPill?.remove(),
        this.session?.dispose(),
        (this.session = null),
        this.plazaHud?.dispose(),
        (this.plazaHud = null),
        this.matchHud?.dispose(),
        (this.matchHud = null),
        this.portalFx?.dispose(),
        (this.portalFx = null),
        this.letters?.dispose(),
        (this.letters = null),
        this.finds?.dispose(),
        (this.finds = null),
        this.ghostGen++,
        this.ghosts?.dispose(),
        (this.ghosts = null),
        this.coach?.dispose(),
        (this.coach = null),
        this.goals?.dispose(),
        (this.goals = null),
        this.missionsChip?.dispose(),
        (this.missionsChip = null),
        this.markers?.dispose(),
        (this.markers = null),
        this.corner?.remove(),
        (this.corner = null),
        this.ping?.dispose(),
        (this.ping = null),
        this.bubbles.clear(),
        Z.unbind());
    }
  },
  nh = (e) =>
    [
      [0.3, 0],
      [-0.3, 0],
      [0, 0.3],
      [0, -0.3],
    ]
      .map(([t, n]) => `drop-shadow(${t * e}rem ${n * e}rem 0 #fff)`)
      .join(` `) + ` drop-shadow(0 ${0.8 * e}rem 0 rgba(34, 24, 28, .25))`,
  rh,
  ih = new Promise((e) => {
    rh = e;
  });
