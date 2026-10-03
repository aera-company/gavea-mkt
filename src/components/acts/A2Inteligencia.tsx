"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/components/motion/gsap";
import { useGsapContext } from "@/components/motion/useGsapContext";
import { registerRests } from "@/components/motion/presenter";
import { inteligencia as copy } from "@/lib/gate";
import { motionReady, pinned, rise, sink } from "./scene";

/**
 * 02.3 · Inteligência. The real P-35 returns and the same vessel, as an
 * engineering drawing, comes down over it: the physical object becomes
 * information. Then one system changes state with each sentence: scattered
 * words of a working day connect, line up, become a numbered method, and
 * converge into a single point on the direction rail.
 */
export function A2Inteligencia() {
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
      const words = q(portrait ? '.a2i-word[data-m="1"]' : ".a2i-word");
      const links = q(portrait ? ".a2i-links-m line" : ".a2i-links-d line");
      gsap.set(words, { xPercent: -50, yPercent: -50 });
      const railX = () => {
        const r = document.querySelector(".rail-line")?.getBoundingClientRect();
        return ((r ? r.left : 20) / window.innerWidth) * 100;
      };

      const tl = pinned(el, q(".a2i-stage")[0] as HTMLElement, portrait ? "+=300%" : "+=340%");

      // the real vessel, then the drawing comes down over it
      rise(tl, ".a2i-title", 0.02, 0.05);
      sink(tl, ".a2i-title", 0.11);
      tl.fromTo(".a2i-drawing", { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.12, ease: io }, 0.12)
        .fromTo(".a2i-wipe", { top: "0%", autoAlpha: 1 }, { top: "100%", duration: 0.12, ease: io }, 0.12)
        .to(".a2i-wipe", { autoAlpha: 0, duration: 0.01 }, 0.24)
        .set(".a2i-photo", { autoAlpha: 0 }, 0.245)
        .to(".a2i-drawing", { opacity: 0.13, duration: 0.06 }, 0.26);

      // the words of a working day arrive from the edges
      words.forEach((w, k) => {
        const x = Number(w.dataset.x);
        tl.fromTo(w, { autoAlpha: 0, xPercent: x < 50 ? -260 : 260 }, { autoAlpha: 1, xPercent: -50, duration: 0.06, ease: "power3.out" }, 0.29 + k * 0.008);
      });

      // Conectar informações.
      rise(tl, ".a2i-s0", 0.34);
      tl.fromTo(links, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.03, stagger: 0.007, ease: "power1.inOut" }, 0.38)
        .to(links, { autoAlpha: 0, duration: 0.02 }, 0.5);
      sink(tl, ".a2i-s0", 0.5);

      // Organizar tarefas.
      rise(tl, ".a2i-s1", 0.53);
      words.forEach((w, k) => {
        tl.to(w, {
          left: portrait ? "56%" : "66%",
          top: portrait ? `${46 + k * 7.4}%` : `${21 + k * 7.2}%`,
          duration: 0.09,
          ease: io,
        }, 0.52 + k * 0.004);
      });
      sink(tl, ".a2i-s1", 0.64);

      // Criar metodologia.
      rise(tl, ".a2i-s2", 0.66);
      tl.fromTo(".a2i-colrule", { scaleY: 0 }, { scaleY: 1, duration: 0.06, transformOrigin: "50% 0%" }, 0.66);
      words.forEach((w, k) => {
        tl.fromTo(w.querySelector(".a2i-num"), { autoAlpha: 0, x: -8 }, { autoAlpha: 1, x: 0, duration: 0.02 }, 0.67 + k * 0.006);
      });
      sink(tl, ".a2i-s2", 0.76);

      // Transformar conhecimento em decisões melhores.
      rise(tl, ".a2i-s3", 0.78, 0.05);
      tl.to(".a2i-colrule", { autoAlpha: 0, duration: 0.03 }, 0.8);
      words.forEach((w, k) => {
        tl.to(w, { left: () => `${railX()}%`, top: "50%", scale: 0.3, autoAlpha: 0, duration: 0.07, ease: io }, 0.8 + k * 0.004);
      });
      tl.fromTo(".a2i-dot", { scale: 0, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.02, ease: "back.out(2)" }, 0.875)
        .set({}, {}, 1);

      const off = registerRests("a2i", tl.scrollTrigger!, [0.08, 0.45, 0.6, 0.73, 0.94]);
      document.fonts?.ready.then(() => ScrollTrigger.refresh());
      return off;
    },
  );

  return (
    <section ref={root} className="a2i" aria-labelledby="a2i-h">
      <div className="a2i-stage">
        <div className="a2i-photo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={copy.photo} alt={copy.alt} loading="lazy" decoding="async" />
        </div>
        <div className="a2i-drawing">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={copy.drawing} alt="" loading="lazy" decoding="async" />
        </div>
        <span className="a2i-wipe" aria-hidden="true" />
        <h2 id="a2i-h" className="a2i-title rise">
          <span>{copy.title}</span>
        </h2>

        <svg className="a2i-links a2i-links-d" aria-hidden="true">
          {copy.links.map(([a, b]) => {
            const A = copy.words[a], B = copy.words[b];
            return <line key={`${a}-${b}`} x1={`${A.x}%`} y1={`${A.y}%`} x2={`${B.x}%`} y2={`${B.y}%`} pathLength={1} />;
          })}
        </svg>
        <svg className="a2i-links a2i-links-m" aria-hidden="true">
          {copy.links
            .filter(([a, b]) => copy.words[a].m && copy.words[b].m)
            .map(([a, b]) => {
              const A = copy.words[a], B = copy.words[b];
              return <line key={`${a}-${b}`} x1={`${A.mx}%`} y1={`${A.my}%`} x2={`${B.mx}%`} y2={`${B.my}%`} pathLength={1} />;
            })}
        </svg>
        <span className="a2i-colrule" aria-hidden="true" />
        <ul className="a2i-field" aria-label="Informações de um dia de trabalho">
          {copy.words.map((w, k) => (
            <li
              key={w.w}
              className="a2i-word"
              data-x={w.x}
              data-m={w.m ? "1" : "0"}
              style={{ "--x": `${w.x}%`, "--y": `${w.y}%`, "--mx": `${w.mx}%`, "--my": `${w.my}%` } as React.CSSProperties}
            >
              <span className="a2i-num" aria-hidden="true">
                <span className="a2i-num-d">{String(k + 1).padStart(2, "0")}</span>
                <span className="a2i-num-m">{String(copy.words.filter((v, i) => i <= k && v.m).length).padStart(2, "0")}</span>
              </span>
              {w.w}
            </li>
          ))}
        </ul>
        <span className="a2i-dot" aria-hidden="true" />

        <ol className="a2i-steps">
          {copy.steps.map((s, k) => (
            <li key={s} className={`a2i-step a2i-s${k} rise`}>
              <span>{s}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
