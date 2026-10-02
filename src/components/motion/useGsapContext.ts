"use client";

import { useEffect, useLayoutEffect, type RefObject } from "react";
import { gsap } from "./gsap";

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type Conditions = Record<string, string>;
type Setup = (active: Record<string, boolean>) => void | (() => void);

/**
 * One GSAP scope per scene, split by media conditions (breakpoint, reduced
 * motion). Everything created inside `setup` — tweens, timelines,
 * ScrollTriggers, sets — is reverted when a condition changes or on unmount.
 *
 * `conditions` and `setup` are read once per mount.
 */
export function useGsapContext(
  scope: RefObject<HTMLElement | null>,
  conditions: Conditions,
  setup: Setup,
) {
  useIsoLayoutEffect(() => {
    if (!scope.current) return;
    const mm = gsap.matchMedia(scope.current);
    mm.add(conditions, (ctx) => {
      const active = Object.fromEntries(
        Object.keys(conditions).map((key) => [key, Boolean(ctx.conditions?.[key])]),
      );
      return setup(active);
    });
    return () => mm.revert();
  }, []);
}
