"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/components/motion/gsap";
import { useGsapContext } from "@/components/motion/useGsapContext";
import { registerRests } from "@/components/motion/presenter";
import { oportunidades as copy } from "@/lib/gate";
import { motionReady, pinned, rise } from "./scene";

/**
 * 02.2 · Oportunidades. The scroll turns sideways: five fronts of the
 * business cross the screen in diagonal slices (product, new capability,
 * relationship, operation, event), each drifting against the track, while
 * the key sentence arrives in three parts. Then the frames compress into a
 * thin band and the whole sentence stands still on paper.
 * Portrait: no track; three frames replace each other, one per part.
 */
export function A2Oportunidades() {
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
      const tl = pinned(el, q(".a2o-stage")[0] as HTMLElement, portrait ? 300 : 340);

      rise(tl, ".a2o-title", 0.0, 0.05);

      if (portrait) {
        const frames = q('.a2o-frame[data-portrait="1"]');
        frames.forEach((fr, k) => {
          tl.fromTo(fr, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.1, ease: io }, 0.1 + k * 0.25)
            .fromTo(fr.querySelector("img"), { yPercent: 8, scale: 1.1 }, { yPercent: -4, scale: 1, duration: 0.3 }, 0.1 + k * 0.25);
          // the frame below goes once it is covered, so the last one can become a band
          if (k > 0) tl.set(frames[k - 1], { autoAlpha: 0 }, 0.2 + k * 0.25);
        });
        tl.to(".a2o-title", { autoAlpha: 0, duration: 0.03 }, 0.12);
        q(".a2o-part").forEach((p, k) => rise(tl, p, 0.2 + k * 0.25, 0.05));
        // the last frame becomes a band behind the whole sentence
        tl.to(frames[frames.length - 1], { clipPath: "inset(40% 0% 52% 0%)", duration: 0.08, ease: io }, 0.86);
      } else {
        const track = q(".a2o-track")[0] as HTMLElement;
        const travel = () => track.scrollWidth - window.innerWidth;
        tl.fromTo(track, { x: () => window.innerWidth }, { x: () => -travel(), duration: 0.76, ease: "none" }, 0.06)
          .fromTo(".a2o-frame img", { xPercent: -6 }, { xPercent: 6, duration: 0.76 }, 0.06)
          .to(".a2o-title", { autoAlpha: 0, duration: 0.03 }, 0.16)
          .fromTo(".a2o-scrim", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.05 }, 0.2);
        q(".a2o-part").forEach((p, k) => rise(tl, p, 0.24 + k * 0.18, 0.05));
        // compress: the track becomes a band, the sentence turns to ink on paper
        tl.to(".a2o-band", { clipPath: "inset(44% 0% 50% 0%)", duration: 0.08, ease: io }, 0.84);
      }
      tl.to(".a2o-scrim", { autoAlpha: 0, duration: 0.05 }, 0.84)
        .fromTo(".a2o-sentence", { color: "#f2f4f3" }, { color: "#081e2f", duration: 0.05 }, 0.85)
        // the band runs into the rail and is gone
        .to(".a2o-band", { clipPath: portrait ? "inset(40% 100% 52% 0%)" : "inset(44% 100% 50% 0%)", duration: 0.05, ease: "power2.in" }, 0.95)
        .set({}, {}, 1);

      const off = registerRests("a2o", tl.scrollTrigger!, portrait ? [0.05, 0.3, 0.55, 0.8, 0.93] : [0.05, 0.3, 0.48, 0.66, 0.93]);
      document.fonts?.ready.then(() => ScrollTrigger.refresh());
      return off;
    },
  );

  return (
    <section ref={root} className="a2o" aria-labelledby="a2o-h">
      <div className="a2o-stage">
        <h2 id="a2o-h" className="a2o-title rise">
          <span>{copy.title}</span>
        </h2>
        <div className="a2o-band">
          <ul className="a2o-track">
            {copy.strip.map((s, k) => (
              <li key={s.src} className="a2o-frame" data-k={k} data-portrait={(copy.portrait as readonly number[]).includes(k) ? "1" : "0"}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${s.src}-d.webp`} srcSet={`${s.src}-m.webp 720w, ${s.src}-d.webp 1100w`} sizes="(max-aspect-ratio: 4/5) 100vw, 46vw" alt={s.alt} loading="lazy" decoding="async" />
              </li>
            ))}
          </ul>
        </div>
        <div className="a2o-scrim" aria-hidden="true" />
        <p className="a2o-sentence">
          {copy.parts.map((p) => (
            <span key={p} className="a2o-part rise">
              <span>{p}</span>
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
