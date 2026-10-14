// assets/parks-C2dnYY6C 01 — blurb
// Lines 1-185 of readable/assets/parks-C2dnYY6C.pretty.js (statement-aligned).
import { o as e, s as t } from "./dmath-_BI8hNwF.js";
import {
  A as n,
  F as r,
  I as i,
  M as a,
  N as o,
  P as s,
  S as ee,
  c as te,
  j as c,
} from "./preload-helper-DR1MrGPZ.js";
import "./table-W1plLavt.js";
import {
  a as l,
  i as u,
  n as ne,
  o as d,
  r as re,
  s as ie,
  t as f,
} from "./compose-C1tLg9l9.js";
var modeParks = {
  trick: {
    id: `trick`,
    name: `Trick Attack`,
    blurb: `Biggest score in 2 minutes wins. Land your combos!`,
    min: 1,
    max: 8,
    durationMs: 12e4,
    parks: [
      `warehouse`,
      `schoolyard`,
      `city`,
      `city:downtown`,
      `hangar`,
      `beach`,
      `bridge`,
    ],
    color: `#FFD21F`,
    icon: `star`,
  },
  graffiti: {
    id: `graffiti`,
    name: `Graffiti`,
    blurb: `Trick on pieces to paint them your colour. Beat a combo to steal them!`,
    min: 2,
    max: 8,
    durationMs: 12e4,
    parks: [
      `warehouse`,
      `schoolyard`,
      `city:downtown`,
      `city:underpass`,
      `beach`,
      `bridge`,
    ],
    color: `#FF3D7F`,
    icon: `spray`,
  },
  horse: {
    id: `horse`,
    name: `H-O-R-S-E`,
    blurb: `One combo each. Set a score, everyone else must beat it — or take a letter. Spell HORSE and you're out.`,
    min: 2,
    max: 6,
    durationMs: 48e4,
    parks: [`schoolyard`, `warehouse`, `city`, `hangar`, `beach`],
    color: `#FF8A1F`,
    icon: `horseshoe`,
  },
  skate: {
    id: `skate`,
    name: `S-K-A-T-E`,
    blurb: `Grab all five floating letters before anyone else.`,
    min: 1,
    max: 8,
    durationMs: 18e4,
    parks: [
      `warehouse`,
      `schoolyard`,
      `city:downtown`,
      `city:garage`,
      `city:ditch`,
      `hangar`,
      `bridge`,
      `mall`,
    ],
    color: `#2FD67B`,
    icon: `letters`,
  },
  tag: {
    id: `tag`,
    name: `Tag`,
    blurb: `Bump someone to pass 'it'. Least time as 'it' wins!`,
    min: 2,
    max: 8,
    durationMs: 12e4,
    parks: [
      `schoolyard`,
      `warehouse`,
      `city:garage`,
      `city:downtown`,
      `hangar`,
      `bridge`,
      `mall`,
    ],
    color: `#1FC7E8`,
    icon: `hand-you`,
  },
  career: {
    id: `career`,
    name: `Career`,
    blurb: `Two minutes. Tick off goals — every one you land stays done.`,
    min: 1,
    max: 1,
    durationMs: 12e4,
    parks: [],
    color: `#A55BFF`,
    icon: `trophy`,
    resultsMs: 18e4,
  },
};
Object.keys(modeParks);
function oe(e) {
  return typeof e == `string` && e in modeParks;
}
var se = [`trick`, `graffiti`, `horse`, `skate`, `tag`];
function ce(e) {
  return typeof e == `string` && se.includes(e);
}
var le = {
    GATHER: 0,
    INTRO: 1,
    COUNTDOWN: 2,
    PLAYING: 3,
    OVERTIME: 4,
    RESULTS: 5,
    ABORTED: 6,
  },
  ue = 3500,
  horseWord = `HORSE`,
  fe = 1e4,
  pe = `SKATE`;
function me(e) {
  let t = 0;
  for (; e;) ((t += e & 1), (e >>>= 1));
  return t;
}
function modeNames(e, t, n) {
  switch (e) {
    case `trick`:
    case `career`:
      return n.score - t.score || n.best - t.best || t.bails - n.bails;
    case `graffiti`:
      return n.pieces - t.pieces || n.paint - t.paint || n.score - t.score;
    case `horse`:
      return (
        Number(t.out) - Number(n.out) || t.horse - n.horse || n.best - t.best
      );
    case `skate`:
      return (
        me(n.letters) - me(t.letters) ||
        (t.lettersAt || 0xe8d4a51000) - (n.lettersAt || 0xe8d4a51000)
      );
    case `tag`:
      return t.itMs - n.itMs || n.tags - t.tags;
  }
}
var ge = { graffiti: `spray` };
function _e(e, t) {
  switch (e) {
    case `trick`:
    case `career`:
      return t.score.toLocaleString();
    case `graffiti`:
      return String(t.pieces);
    case `horse`:
      return t.out ? `OUT` : `HORSE`.slice(0, t.horse) || `—`;
    case `skate`:
      return `${me(t.letters)}/5`;
    case `tag`:
      return `${(t.itMs / 1e3).toFixed(1)}s`;
  }
}
