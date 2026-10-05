"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/components/motion/gsap";
import { useGsapContext } from "@/components/motion/useGsapContext";
import { registerRests } from "@/components/motion/presenter";
import { aera } from "@/lib/gate";
import { motionReady, pinned, rise } from "./scene";

const conditions = {
  motion: "(prefers-reduced-motion: no-preference)",
  portrait: "(max-aspect-ratio: 4/5)",
};

/**
 * 03.1 · AERA entra. A vertical line draws through the page and the AERA
 * lands on it for the first time: "Direção para o próximo movimento."
 */
export function A3Entra() {
  const root = useRef<HTMLElement>(null);
  useGsapContext(root, conditions, ({ motion, portrait }) => {
    if (!motion || !root.current) return;
    motionReady();
    const q = gsap.utils.selector(root.current);
    const tl = pinned(root.current, q(".a3e-stage")[0] as HTMLElement, portrait ? 150 : 170);
    tl.fromTo(".a3e-line", { scaleY: 0 }, { scaleY: 1, duration: 0.18, ease: "power2.inOut", transformOrigin: "50% 0%" }, 0.02)
      .fromTo(".a3e-mark", { autoAlpha: 0, x: -12 }, { autoAlpha: 1, x: 0, duration: 0.08 }, 0.16);
    rise(tl, ".a3e-title", 0.22, 0.12);
    rise(tl, ".a3e-sub", 0.38, 0.1);
    tl.set({}, {}, 1);
    const off = registerRests("a3e", tl.scrollTrigger!, [0.7]);
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    return off;
  });

  return (
    <section ref={root} className="a3e" aria-labelledby="a3e-h">
      <div className="a3e-stage">
        <span className="a3e-line" aria-hidden="true" />
        <div className="a3e-col">
          <p className="a3e-mark t-label">{aera.mark}</p>
          <h2 id="a3e-h" className="a3e-title rise"><span>{aera.title}</span></h2>
          <p className="a3e-sub rise"><span>{aera.sub}</span></p>
        </div>
      </div>
    </section>
  );
}

/**
 * 03.2 + 03.3 · O modelo. A blue line crosses everything that already exists
 * (agency, internal team, sales, partners, represented brands, suppliers);
 * "Quem já faz continua fazendo." · the line thickens: "A AERA conduz." ·
 * the system draws in: "A responsabilidade é central. O modelo é flexível."
 */
export function A3Modelo() {
  const root = useRef<HTMLElement>(null);
  useGsapContext(root, conditions, ({ motion, portrait }) => {
    if (!motion || !root.current) return;
    motionReady();
    const q = gsap.utils.selector(root.current);
    const nodes = q(".a3m-node");
    const tl = pinned(root.current, q(".a3m-stage")[0] as HTMLElement, portrait ? 220 : 250);
    tl.fromTo(".a3m-line", { scaleX: 0 }, { scaleX: 1, duration: 0.16, ease: "power2.inOut", transformOrigin: "0% 50%" }, 0.02);
    nodes.forEach((n, k) => {
      tl.fromTo(n, { autoAlpha: 0, y: k % 2 ? 14 : -14 }, { autoAlpha: 1, y: 0, duration: 0.06, ease: "power3.out" }, 0.06 + k * 0.025);
    });
    rise(tl, ".a3m-d1", 0.24, 0.08);
    rise(tl, ".a3m-d2", 0.4, 0.08);
    tl.to(".a3m-line", { scaleY: 4, duration: 0.08, ease: "power2.out" }, 0.4);
    // the system draws in around the line
    if (!portrait) {
      nodes.forEach((n) => {
        tl.to(n, { x: () => (window.innerWidth / 2 - (n.offsetLeft + n.offsetWidth / 2)) * 0.3, duration: 0.14, ease: "power2.inOut" }, 0.56);
      });
    }
    rise(tl, ".a3m-model", 0.6, 0.08);
    tl.set({}, {}, 1);
    const off = registerRests("a3m", tl.scrollTrigger!, [0.34, 0.52, 0.86]);
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    return off;
  });

  return (
    <section ref={root} className="a3m" aria-labelledby="a3m-h">
      <div className="a3m-stage">
        <h2 id="a3m-h" className="a3m-doing">
          <span className="a3m-d1 rise"><span>{aera.doing[0]}</span></span>
          <span className="a3m-d2 rise"><span>{aera.doing[1]}</span></span>
        </h2>
        <span className="a3m-line" aria-hidden="true" />
        <ul className="a3m-nodes" aria-label="Quem já trabalha com a GAVEA">
          {aera.nodes.map((n, k) => (
            <li key={n} className="a3m-node" data-k={k}>{n}</li>
          ))}
        </ul>
        <p className="a3m-model rise"><span>{aera.model}</span></p>
      </div>
    </section>
  );
}

/**
 * 03.4 · Capacidade. "Direção humana. Produção com inteligência." The ten
 * roles of the Human Team pass like a production line, then the note that
 * this pitch was made that way. Typography only: no interface, no avatars.
 */
export function A3Time() {
  const root = useRef<HTMLElement>(null);
  useGsapContext(root, conditions, ({ motion, portrait }) => {
    if (!motion || !root.current) return;
    motionReady();
    const q = gsap.utils.selector(root.current);
    const track = q(".a3t-track")[0] as HTMLElement;
    const tl = pinned(root.current, q(".a3t-stage")[0] as HTMLElement, portrait ? 190 : 210);
    rise(tl, ".a3t-l1", 0.02, 0.08);
    rise(tl, ".a3t-l2", 0.08, 0.08);
    if (portrait) {
      // phones: the ten roles wrap and arrive one by one along the rule
      tl.fromTo(".a3t-rule", { scaleX: 0 }, { scaleX: 1, duration: 0.2, ease: "power2.inOut", transformOrigin: "0% 50%" }, 0.18)
        .fromTo(".a3t-track li", { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.05, stagger: 0.045, ease: "power3.out" }, 0.22);
    } else {
      tl.fromTo(track, { x: () => window.innerWidth }, { x: () => (track.scrollWidth <= window.innerWidth ? 0 : window.innerWidth - track.scrollWidth), duration: 0.6, ease: "none" }, 0.18)
        .fromTo(".a3t-rule", { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: "none", transformOrigin: "0% 50%" }, 0.18);
    }
    rise(tl, ".a3t-note", 0.8, 0.08);
    tl.set({}, {}, 1);
    const off = registerRests("a3t", tl.scrollTrigger!, [0.14, 0.94]);
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    return off;
  });

  return (
    <section ref={root} className="a3t" aria-labelledby="a3t-h">
      <div className="a3t-stage">
        <h2 id="a3t-h" className="a3t-title">
          <span className="a3t-l1 rise"><span>{aera.team.title[0]}</span></span>
          <span className="a3t-l2 rise"><span>{aera.team.title[1]}</span></span>
        </h2>
        <div className="a3t-band">
          <span className="a3t-rule" aria-hidden="true" />
          <ol className="a3t-track">
            {aera.team.agents.map((a, k) => (
              <li key={a}><span className="a3t-n">{String(k + 1).padStart(2, "0")}</span>{a}</li>
            ))}
          </ol>
        </div>
        <p className="a3t-note rise"><span>{aera.team.note}</span></p>
      </div>
    </section>
  );
}
