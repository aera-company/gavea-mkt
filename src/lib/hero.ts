/**
 * ACT 01 · The shift (PASS R1). Hero copy and scroll timeline.
 * English in the hero by decision R-2; the rest of the experience stays in
 * Portuguese. Sentence case everywhere, no em dashes.
 */

export const heroCopy = {
  mark: "GAVEA / 2027",
  cue: "Scroll",
  act: "Act 01 · The shift",
  lineA: ["The business", "has evolved."],
  lineB: ["The brand", "should too."],
  words: [
    { word: "Business.", img: "business" },
    { word: "Brand.", img: "brand" },
    { word: "Commercial.", img: "commercial" },
    { word: "Intelligence.", img: "intelligence" },
  ],
  pair: "AERA × GAVEA",
  close: ["Building", "what's next."],
  second: "Real footage · P-35 · Guanabara Bay",
  next: "Act 02 · The gap",
  nextNote: "Em construção · PASS R2",
} as const;

/** Montage labels, one per shot of S2 (order matches build-hero.py). */
export const heroShots = [
  "Direction",
  "Operation · P-35, real",
  "Scale",
  "Lifting",
  "Inspection · Gavea Green Tech",
  "Open sea",
] as const;

/** Frame sequences written by scripts/assets/build-hero.py. */
export const heroFrames = {
  desktop: { dir: "/media/hero/d", count: 242, step: 1 },
  mobile: { dir: "/media/hero/m", count: 121, step: 2 },
  /** Desktop frame ranges. */
  s1: [0, 121],
  s2: [122, 241],
  shotLength: 20,
} as const;

/**
 * Scroll timeline, as progress p of the pinned section (0 to 1).
 * F00 silence · F01 macro · F02 recuo · F03 brand film · F04 peak ·
 * F05 white silence · F06 AERA reveal. See GAVEA_MKT_REDIRECTION_ASSET_AUDIT.md §4.3.
 */
export const heroChapters = [
  { id: "F00", label: "Silence", at: 0 },
  { id: "F01", label: "Macro", at: 0.05 },
  { id: "F02", label: "Pull back", at: 0.2 },
  { id: "F03", label: "Film", at: 0.36 },
  { id: "F04", label: "Peak", at: 0.66 },
  { id: "F05", label: "Silence", at: 0.84 },
  { id: "F06", label: "Reveal", at: 0.9 },
] as const;
