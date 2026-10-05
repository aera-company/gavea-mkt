import { gsap } from "@/components/motion/gsap";

/** Tell MOTION_BOOT a scene started (keeps the motion start states on). */
export function motionReady() {
  (window as Window & { __motionReady?: boolean }).__motionReady = true;
}

const OUT = "power3.out";

type Target = string | Element | Element[];

/** The moving part of a mask: the span inside each `.rise`. */
const inner = (sel: Target) =>
  typeof sel === "string"
    ? `${sel} > span`
    : (Array.isArray(sel) ? sel : [sel]).map((e) => e.querySelector(":scope > span") ?? e);

/** A line rises out of its mask (`.rise > span`). Positions are progress p. */
export function rise(tl: gsap.core.Timeline, sel: Target, at: number, d = 0.04) {
  return tl.fromTo(
    inner(sel),
    { yPercent: 150, y: 0 },
    { yPercent: 0, duration: d, ease: OUT },
    at,
  );
}

/** The same line leaves upwards through its mask. */
export function sink(tl: gsap.core.Timeline, sel: Target, at: number, d = 0.03) {
  return tl.to(inner(sel), { yPercent: -150, duration: d, ease: "power2.in" }, at);
}

/**
 * Pace of the whole experience: scroll distance per scene is its base length
 * (in % of the viewport) times PACE. Raise it to slow everything down.
 */
export const PACE = 1.6;

/** One scroll-scrubbed timeline per pinned scene; its length is the pin. */
export function pinned(trigger: HTMLElement, stage: HTMLElement, length: number) {
  return gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger,
      start: "top top",
      end: `+=${Math.round(length * PACE)}%`,
      pin: stage,
      scrub: 1.2,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });
}
