"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/components/motion/gsap";
import { useGsapContext } from "@/components/motion/useGsapContext";
import { registerRests } from "@/components/motion/presenter";
import { trade } from "@/lib/gate";
import { motionReady, pinned, rise } from "./scene";

/**
 * 04.2 · Gavea Trade. "De informação a inteligência aplicada." The reasoning
 * of a sale in five steps along one rule, a blue point walking it from the
 * scattered request to the decision. No screens, no numbers, nothing internal.
 */
export function A4Trade() {
  const root = useRef<HTMLElement>(null);
  useGsapContext(
    root,
    { motion: "(prefers-reduced-motion: no-preference)", portrait: "(max-aspect-ratio: 4/5)" },
    ({ motion, portrait }) => {
      if (!motion || !root.current) return;
      motionReady();
      const q = gsap.utils.selector(root.current);
      const steps = q(".a4-step");
      const dot = q(".a4-dot")[0] as HTMLElement;
      const at = (k: number) => 0.3 + k * 0.1;
      const tl = pinned(root.current, q(".a4-stage")[0] as HTMLElement, portrait ? 220 : 230);
      tl.fromTo(".a4-label", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.05 }, 0.02);
      rise(tl, ".a4-title", 0.06, 0.1);
      tl.fromTo(".a4-rule", portrait ? { scaleY: 0 } : { scaleX: 0 }, { ...(portrait ? { scaleY: 1 } : { scaleX: 1 }), duration: 0.12, ease: "power2.inOut", transformOrigin: "0% 0%" }, 0.18)
        .fromTo(dot, { autoAlpha: 0, scale: 0 }, { autoAlpha: 1, scale: 1, duration: 0.03 }, 0.29);
      steps.forEach((s, k) => {
        tl.fromTo(s, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.06, ease: "power3.out" }, at(k));
        if (k > 0) {
          tl.to(dot, portrait
            ? { y: () => s.offsetTop - (steps[0] as HTMLElement).offsetTop, duration: 0.08, ease: "power2.inOut" }
            : { x: () => s.offsetLeft - (steps[0] as HTMLElement).offsetLeft, duration: 0.08, ease: "power2.inOut" }, at(k) - 0.02);
        }
      });
      tl.to(".a4-step:last-child", { color: "#006b90", duration: 0.04 }, at(4) + 0.04);
      rise(tl, ".a4-close", 0.84, 0.08);
      tl.set({}, {}, 1);
      const off = registerRests("a4", tl.scrollTrigger!, [0.16, 0.95]);
      document.fonts?.ready.then(() => ScrollTrigger.refresh());
      return off;
    },
  );

  return (
    <section ref={root} className="a4" aria-labelledby="a4-h">
      <div className="a4-stage">
        <p className="a4-label t-label">{trade.label}</p>
        <h2 id="a4-h" className="a4-title rise"><span>{trade.title}</span></h2>
        <div className="a4-flow">
          <span className="a4-rule" aria-hidden="true" />
          <span className="a4-dot" aria-hidden="true" />
          <ol className="a4-steps">
            {trade.steps.map((s) => (
              <li key={s.n} className="a4-step">
                <span className="a4-n">{s.n}</span>
                <span className="a4-t">{s.t}</span>
                {s.s && <span className="a4-s">{s.s}</span>}
              </li>
            ))}
          </ol>
        </div>
        <p className="a4-close rise"><span>{trade.close}</span></p>
      </div>
    </section>
  );
}
