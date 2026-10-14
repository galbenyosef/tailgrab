// assets/missions-eXNMrvRm 01 — kind
// Lines 1-10 of readable/assets/missions-eXNMrvRm.pretty.js (statement-aligned).
import { c as e } from "./table-W1plLavt.js";
import { i as t } from "./skaters-pUdq6stw.js";
var missionPeriods = [`daily`, `weekly`];
function r(e) {
  return e.kind === `best` || e.kind === `chain` || e.kind === `runScore`
    ? `max`
    : e.kind === `modes` || e.kind === `parks`
      ? `set`
      : `sum`;
}
