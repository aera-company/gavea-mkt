"use client";

import { useEffect } from "react";
import { gsap } from "@/components/motion/gsap";
import { allRests } from "@/components/motion/presenter";

/**
 * ← → ↑ ↓, PageUp/PageDown and space (what a presentation clicker sends)
 * glide to the next or previous rest point. Free scrolling keeps working.
 * Inactive when no scene registered rests (reduced motion, no JS).
 */
export function Presenter() {
  useEffect(() => {
    let busy: gsap.core.Tween | null = null;
    const go = (dir: 1 | -1) => {
      const rests = allRests();
      if (!rests.length) return false;
      const y = window.scrollY;
      const target = dir > 0 ? rests.find((r) => r > y + 4) : [...rests].reverse().find((r) => r < y - 4);
      if (target === undefined) return false;
      busy?.kill();
      const pos = { y };
      const dist = Math.abs(target - y) / window.innerHeight;
      busy = gsap.to(pos, {
        y: target,
        duration: Math.min(2.6, 1.1 + dist * 0.3),
        ease: "power2.inOut",
        onUpdate: () => window.scrollTo(0, pos.y),
      });
      return true;
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(t.tagName))) return;
      const fwd = ["ArrowRight", "ArrowDown", "PageDown", " "].includes(e.key);
      const back = ["ArrowLeft", "ArrowUp", "PageUp"].includes(e.key);
      if ((fwd || back) && go(fwd ? 1 : -1)) e.preventDefault();
    };
    const stop = () => busy?.kill();
    window.addEventListener("keydown", onKey);
    window.addEventListener("wheel", stop, { passive: true });
    window.addEventListener("touchstart", stop, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchstart", stop);
      busy?.kill();
    };
  }, []);
  return null;
}
