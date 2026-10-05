"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/components/motion/gsap";
import { useGsapContext } from "@/components/motion/useGsapContext";
import { registerRests } from "@/components/motion/presenter";
import { posicionamento as copy } from "@/lib/gate";
import { motionReady, pinned, rise } from "./scene";

/**
 * 02.1 · Posicionamento. A raw, monumental image rises over the word; an
 * editorial crop closes on it while the image grows inside, the word shrinks
 * into the page's grid and the two lines lock to the crop. The same value,
 * now with direction. Then the finished page leaves to the left: the
 * horizontal movement of Act 02 begins.
 */
export function A2Posicionamento() {
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

      // the crop, in % of the stage (top right bottom left); the growth is
      // anchored so the crew on deck lands in the upper third of the crop
      const crop = portrait ? [8, 6, 44, 6] : [10, 5, 16, 45];
      const origin = portrait ? "50% -30%" : "10% -23%";
      const inset = crop.map((v) => `${v}%`).join(" ");

      const tl = pinned(el, q(".a2p-stage")[0] as HTMLElement, portrait ? 230 : 270);
      const io = "power2.inOut";

      rise(tl, ".a2p-title", 0.02, 0.06);
      tl.fromTo(".a2p-media", { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.16, ease: io }, 0.12)
        .fromTo(".a2p-media img", { scale: 1.12, transformOrigin: origin }, { scale: 1, duration: 0.2, ease: "power2.out" }, 0.12)
        // the crop closes, the image grows inside it
        .to(".a2p-media", { clipPath: `inset(${inset})`, duration: 0.34, ease: io }, 0.34)
        .to(".a2p-media img", { scale: 1.25, transformOrigin: origin, duration: 0.34, ease: io }, 0.34)
        .fromTo(".a2p-marks", { top: "0%", right: "0%", bottom: "0%", left: "0%", autoAlpha: 0 },
          { top: `${crop[0]}%`, right: `${crop[1]}%`, bottom: `${crop[2]}%`, left: `${crop[3]}%`, autoAlpha: 1, duration: 0.34, ease: io }, 0.34)
        // the word locks into the page grid
        .to(".a2p-title", { scale: portrait ? 0.62 : 0.4, duration: 0.24, ease: io }, 0.46);
      rise(tl, ".a2p-l1", 0.68, 0.05);
      rise(tl, ".a2p-l2", 0.71, 0.05);

      // the finished page leaves to the left
      tl.to(".a2p-page", { xPercent: -100, duration: 0.14, ease: "power2.in" }, 0.86).set({}, {}, 1);

      const off = registerRests("a2p", tl.scrollTrigger!, [0.1, 0.8]);
      document.fonts?.ready.then(() => ScrollTrigger.refresh());
      return off;
    },
  );

  return (
    <section ref={root} className="a2p" aria-labelledby="a2p-h">
      <div className="a2p-stage">
        <div className="a2p-page">
          <h2 id="a2p-h" className="a2p-title rise">
            <span>{copy.title}</span>
          </h2>
          <div className="a2p-media">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={copy.img.d} srcSet={`${copy.img.m} 1400w, ${copy.img.d} 2400w`} sizes="100vw" alt={copy.alt} loading="lazy" decoding="async" />
          </div>
          <div className="a2p-marks crop-marks" aria-hidden="true" />
          <p className="a2p-lines">
            <span className="a2p-l1 rise"><span>{copy.lines[0]}</span></span>
            <span className="a2p-l2 rise"><span>{copy.lines[1]}</span></span>
          </p>
        </div>
      </div>
    </section>
  );
}
