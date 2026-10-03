"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/components/motion/gsap";
import { useGsapContext } from "@/components/motion/useGsapContext";
import { registerRests } from "@/components/motion/presenter";
import { direcao as copy } from "@/lib/gate";
import { motionReady, pinned, rise } from "./scene";

/**
 * 02.4 · Uma direção. The three territories come back as three bands (the
 * cropped page, a frame of the strip, the drawing) and close like a shutter
 * into the direction rail until only the line is left. Then: "Uma direção."
 * The rail leaves with this scene.
 */
export function A2Direcao() {
  const root = useRef<HTMLElement>(null);

  useGsapContext(
    root,
    {
      motion: "(prefers-reduced-motion: no-preference)",
      portrait: "(max-aspect-ratio: 4/5)",
    },
    ({ motion, portrait }) => {
      if (!motion || !root.current) return;
      motionReady();
      const el = root.current;
      const q = gsap.utils.selector(el);
      const io = "power2.inOut";
      const railX = () => {
        const r = document.querySelector(".rail-line")?.getBoundingClientRect();
        return ((r ? r.left : 20) / window.innerWidth) * 100;
      };

      const tl = pinned(el, q(".a2d-stage")[0] as HTMLElement, portrait ? "+=170%" : "+=190%");
      q(".a2d-band").forEach((b, k) => {
        tl.fromTo(b, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.16, ease: io }, 0.04 + k * 0.06)
          .fromTo(b.querySelector("img"), { scale: 1.15 }, { scale: 1, duration: 0.3, ease: "power2.out" }, 0.04 + k * 0.06);
      });
      // the shutter closes into the rail
      tl.fromTo(".a2d-bands", { clipPath: "inset(0% 0% 0% 0%)" },
        { clipPath: () => `inset(0% ${(100 - railX()).toFixed(2)}% 0% ${railX().toFixed(2)}%)`, duration: 0.22, ease: "power3.inOut" }, 0.42)
        .to(".a2d-bands", { autoAlpha: 0, duration: 0.01 }, 0.64);
      rise(tl, ".a2d-title", 0.66, 0.06);
      tl.set({}, {}, 1);

      // the rail belongs to Act 02: it goes when this scene is left behind
      const rail = document.querySelector(".rail");
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: () => `+=${tl.scrollTrigger!.end - tl.scrollTrigger!.start + window.innerHeight * 0.6}`,
        onLeave: () => gsap.to(rail, { autoAlpha: 0, duration: 0.4 }),
        onEnterBack: () => gsap.to(rail, { autoAlpha: 1, duration: 0.4 }),
      });

      const off = registerRests("a2d", tl.scrollTrigger!, [0.3, 0.86]);
      return () => {
        off();
        st.kill();
        gsap.set(rail, { clearProps: "opacity,visibility" });
      };
    },
  );

  return (
    <section ref={root} className="a2d" aria-labelledby="a2d-h">
      <div className="a2d-stage">
        <div className="a2d-bands" aria-hidden="true">
          {copy.bands.map((b) => (
            <div key={b.src} className="a2d-band">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={b.src} alt="" style={{ objectPosition: b.pos }} loading="lazy" decoding="async" />
            </div>
          ))}
        </div>
        <h2 id="a2d-h" className="a2d-title rise">
          <span>{copy.title}</span>
        </h2>
      </div>
    </section>
  );
}
