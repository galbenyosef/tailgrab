// assets/palette-DQTkVEn_ 01 — paint
// Lines 1-57 of readable/assets/palette-DQTkVEn_.pretty.js (statement-aligned).
import { h as e } from "./three.core-DVWDmH0S.js";
var t = {
    concrete: `#EDE8F5`,
    concreteDark: `#D2C9E6`,
    wood: `#F4C58A`,
    woodSide: `#E79D6A`,
    metal: `#8FA3C8`,
    brick: `#F2A7A0`,
    grass: `#9BE08C`,
    bubblegum: `#FF8FB8`,
    mint: `#7FE3C4`,
    lemon: `#FFE27A`,
    peach: `#FFB38A`,
    lilac: `#B9A4FF`,
    coral: `#FF7A7A`,
    sky: `#8FD3F5`,
    asphalt: `#A59CC0`,
    paint: `#FFF4D6`,
  },
  n = {
    PAINT: 0,
    CONCRETE: 1,
    TARMAC: 2,
    WOOD: 3,
    BRICK: 4,
    GRASS: 5,
    METAL: 6,
  },
  r = {
    concrete: n.CONCRETE,
    concreteDark: n.CONCRETE,
    asphalt: n.TARMAC,
    wood: n.WOOD,
    woodSide: n.WOOD,
    brick: n.BRICK,
    grass: n.GRASS,
    metal: n.METAL,
    bubblegum: n.PAINT,
    mint: n.PAINT,
    lemon: n.PAINT,
    peach: n.PAINT,
    lilac: n.PAINT,
    coral: n.PAINT,
    sky: n.PAINT,
    paint: n.PAINT,
  },
  i = `#3B2C4F`,
  a = `#7EC8F5`,
  o = `#FFE3EC`,
  s = `#F9E4EE`,
  c = `#FFF3DC`,
  l = `#9B8CF0`,
  u = new Map();
function d(t) {
  let n = u.get(t);
  return (n || u.set(t, (n = new e(t))), n);
}
