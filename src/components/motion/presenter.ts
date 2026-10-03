import type { ScrollTrigger } from "./gsap";

/**
 * Rest points for presenting live. Each pinned scene registers the progress
 * values where it reads like a slide; the Presenter turns them into scroll
 * positions on demand (so they survive refreshes and resizes).
 */
const scenes = new Map<string, () => number[]>();

export function registerRests(id: string, st: ScrollTrigger, ps: readonly number[]) {
  scenes.set(id, () => ps.map((p) => st.start + (st.end - st.start) * p));
  return () => {
    scenes.delete(id);
  };
}

export function allRests() {
  return [...scenes.values()].flatMap((f) => f()).sort((a, b) => a - b);
}
