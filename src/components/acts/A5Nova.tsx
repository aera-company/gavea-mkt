"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/components/motion/gsap";
import { useGsapContext } from "@/components/motion/useGsapContext";
import { registerRests } from "@/components/motion/presenter";
import { fechamento, futuro, marca, marketing } from "@/lib/gate";
import { motionReady, pinned, rise } from "./scene";

const conditions = {
  motion: "(prefers-reduced-motion: no-preference)",
  portrait: "(max-aspect-ratio: 4/5)",
};

/**
 * 05.1 · Marca. On navy, the line becomes a horizon; the GAVEA mark lands
 * above it and the proposed signature below: "Beyond the surface." The
 * images of the pitch return as applications, without labels.
 */
export function A5Marca() {
  const root = useRef<HTMLElement>(null);
  useGsapContext(root, conditions, ({ motion, portrait }) => {
    if (!motion || !root.current) return;
    motionReady();
    const q = gsap.utils.selector(root.current);
    const tl = pinned(root.current, q(".a5m-stage")[0] as HTMLElement, portrait ? 200 : 230);
    tl.fromTo(".a5m-line", { scaleX: 0 }, { scaleX: 1, duration: 0.16, ease: "power2.inOut", transformOrigin: "0% 50%" }, 0.02)
      .fromTo(".a5m-logo", { autoAlpha: 0, y: 26 }, { autoAlpha: 1, y: 0, duration: 0.1, ease: "power3.out" }, 0.12);
    rise(tl, ".a5m-sig", 0.24, 0.1);
    q(".a5m-app").forEach((a, k) => {
      tl.fromTo(a, { clipPath: "inset(0% 0% 0% 100%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.12, ease: "power2.inOut" }, 0.36 + k * 0.1)
        .fromTo(a.querySelector("img"), { scale: 1.18 }, { scale: 1, duration: 0.3, ease: "power2.out" }, 0.36 + k * 0.1);
    });
    rise(tl, ".a5m-close", 0.64, 0.08);
    tl.fromTo(".a5m-label", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.05 }, 0.02).set({}, {}, 1);
    const off = registerRests("a5m", tl.scrollTrigger!, [0.32, 0.84]);
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    return off;
  });

  return (
    <section ref={root} className="a5m" aria-labelledby="a5m-h">
      <div className="a5m-stage">
        <p className="a5m-label t-label">{marca.label}</p>
        <span className="a5m-line" aria-hidden="true" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="a5m-logo" src={marca.logo} alt="GAVEA Group" width={1200} height={233} />
        <h2 id="a5m-h" className="a5m-sig rise"><span>{marca.signature}</span></h2>
        <p className="a5m-close rise"><span>{marca.close}</span></p>
        <div className="a5m-apps" aria-hidden="true">
          {marca.applications.map((a) => (
            <figure key={a.src} className="a5m-app">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={a.src} alt="" style={{ objectPosition: a.pos }} loading="lazy" decoding="async" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * 05.2 · Marketing. One represented brand, one key visual, and the pieces
 * that come from it (a 4:5 post, a sales deck, an invitation to a technical
 * evaluation): marketing that starts in the business and ends in a sale.
 */
export function A5Marketing() {
  const root = useRef<HTMLElement>(null);
  useGsapContext(root, conditions, ({ motion, portrait }) => {
    if (!motion || !root.current) return;
    motionReady();
    const q = gsap.utils.selector(root.current);
    const tl = pinned(root.current, q(".a5k-stage")[0] as HTMLElement, portrait ? 230 : 250);
    tl.fromTo(".a5k-label", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.05 }, 0.02)
      .fromTo(".a5k-kv", { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.14, ease: "power2.inOut" }, 0.04)
      .fromTo(".a5k-kv img", { scale: 1.15 }, { scale: 1, duration: 0.3, ease: "power2.out" }, 0.04);
    rise(tl, ".a5k-h1", 0.16, 0.08);
    rise(tl, ".a5k-h2", 0.2, 0.08);
    tl.fromTo(".a5k-post", { autoAlpha: 0, x: () => window.innerWidth * 0.25 }, { autoAlpha: 1, x: 0, duration: 0.12, ease: "power3.out" }, 0.32)
      .fromTo(".a5k-deck", { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.1, ease: "power3.out" }, 0.44)
      .fromTo(".a5k-cta", { autoAlpha: 0, scale: 0.92 }, { autoAlpha: 1, scale: 1, duration: 0.06, ease: "power3.out" }, 0.54);
    rise(tl, ".a5k-close", 0.66, 0.1);
    tl.set({}, {}, 1);
    const off = registerRests("a5k", tl.scrollTrigger!, [0.28, 0.86]);
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    return off;
  });

  return (
    <section ref={root} className="a5k" aria-labelledby="a5k-h">
      <div className="a5k-stage">
        <p className="a5k-label t-label">{marketing.label}</p>
        <figure className="a5k-kv">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={marketing.kv.src} srcSet={`${marketing.kv.m} 900w, ${marketing.kv.src} 1600w`} sizes="(max-aspect-ratio: 4/5) 100vw, 50vw" alt={marketing.kv.alt} loading="lazy" decoding="async" />
        </figure>
        <h2 id="a5k-h" className="a5k-head">
          <span className="a5k-h1 rise"><span>{marketing.headline[0]}</span></span>
          <span className="a5k-h2 rise"><span>{marketing.headline[1]}</span></span>
        </h2>
        <figure className="a5k-post">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={marketing.post.src} alt={marketing.post.alt} loading="lazy" decoding="async" />
          <figcaption>{marketing.post.line}</figcaption>
        </figure>
        <div className="a5k-deck">
          <p className="t-label">{marketing.deck.label}</p>
          <p className="a5k-deck-t">{marketing.deck.title[0]}<br />{marketing.deck.title[1]}</p>
        </div>
        <span className="a5k-cta">{marketing.cta}</span>
        <p className="a5k-close rise"><span>{marketing.close}</span></p>
      </div>
    </section>
  );
}

/**
 * 05.3 · Futuro. The four official unit marks land one by one on the line:
 * "Quatro frentes. Uma marca."
 */
export function A5Futuro() {
  const root = useRef<HTMLElement>(null);
  useGsapContext(root, conditions, ({ motion, portrait }) => {
    if (!motion || !root.current) return;
    motionReady();
    const q = gsap.utils.selector(root.current);
    const tl = pinned(root.current, q(".a5f-stage")[0] as HTMLElement, portrait ? 190 : 200);
    tl.fromTo(".a5f-label", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.05 }, 0.02)
      .fromTo(".a5f-line", { scaleX: 0 }, { scaleX: 1, duration: 0.14, ease: "power2.inOut", transformOrigin: "0% 50%" }, 0.04);
    q(".a5f-unit").forEach((u, k) => {
      tl.fromTo(u, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.08, ease: "power3.out" }, 0.16 + k * 0.09);
    });
    rise(tl, ".a5f-title", 0.56, 0.1);
    rise(tl, ".a5f-sub", 0.64, 0.08);
    tl.set({}, {}, 1);
    const off = registerRests("a5f", tl.scrollTrigger!, [0.86]);
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    return off;
  });

  return (
    <section ref={root} className="a5f" aria-labelledby="a5f-h">
      <div className="a5f-stage">
        <p className="a5f-label t-label">{futuro.label}</p>
        <ul className="a5f-units">
          {futuro.units.map((u) => (
            <li key={u.src} className="a5f-unit">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={u.src} alt={u.alt} loading="lazy" decoding="async" />
            </li>
          ))}
        </ul>
        <span className="a5f-line" aria-hidden="true" />
        <h2 id="a5f-h" className="a5f-title rise"><span>{futuro.title}</span></h2>
        <p className="a5f-sub rise"><span>{futuro.sub}</span></p>
      </div>
    </section>
  );
}

/**
 * 05.5 · Fechamento. One vertical line, AERA × GAVEA, "A próxima dimensão.",
 * and the question that stays. The line closes in a blue point.
 */
export function A5Fechamento() {
  const root = useRef<HTMLElement>(null);
  useGsapContext(root, conditions, ({ motion, portrait }) => {
    if (!motion || !root.current) return;
    motionReady();
    const q = gsap.utils.selector(root.current);
    const tl = pinned(root.current, q(".a5c-stage")[0] as HTMLElement, portrait ? 170 : 180);
    tl.fromTo(".a5c-line", { scaleY: 0 }, { scaleY: 1, duration: 0.18, ease: "power2.inOut", transformOrigin: "50% 0%" }, 0.02)
      .fromTo(".a5c-mark", { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.08 }, 0.12);
    rise(tl, ".a5c-title", 0.18, 0.1);
    rise(tl, ".a5c-sub", 0.32, 0.08);
    rise(tl, ".a5c-q", 0.46, 0.1);
    tl.fromTo(".a5c-dot", { scale: 0, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.05, ease: "back.out(2)" }, 0.6)
      .set({}, {}, 1);
    const off = registerRests("a5c", tl.scrollTrigger!, [0.86]);
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    return off;
  });

  return (
    <section ref={root} className="a5c" aria-labelledby="a5c-h">
      <div className="a5c-stage">
        <span className="a5c-line" aria-hidden="true" />
        <span className="a5c-dot" aria-hidden="true" />
        <div className="a5c-left">
          <div className="a5c-mark">
            <span className="aera-mark a5c-aera" role="img" aria-label="AERA" />
            <p className="t-label">{fechamento.mark}</p>
          </div>
          <h2 id="a5c-h" className="a5c-title rise"><span>{fechamento.title}</span></h2>
        </div>
        <div className="a5c-right">
          <p className="a5c-sub rise"><span>{fechamento.sub}</span></p>
          <p className="a5c-q rise"><span>{fechamento.question}</span></p>
        </div>
      </div>
    </section>
  );
}
