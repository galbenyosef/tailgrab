// assets/bailPhysics-C1H0uy1H 02 — starfish
// Lines 349-369 of readable/assets/bailPhysics-C1H0uy1H.pretty.js (statement-aligned).
function ee(e, t) {
  return e.speed < 1.5
    ? A.starfish
    : e.lean < -0.5
      ? A.backslam
      : e.off > 2.3
        ? j
        : e.lean > 0.5
          ? e.speed > 6 && t() < 0.6
            ? A.superman
            : A.starfish
          : e.leaned || e.off > 0.7
            ? A.starfish
            : e.speed > 6
              ? t() < 0.6
                ? A.superman
                : A.backslam
              : t() < 0.5
                ? A.starfish
                : A.backslam;
}
