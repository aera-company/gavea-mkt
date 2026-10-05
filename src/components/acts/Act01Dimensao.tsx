"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/components/motion/gsap";
import { useGsapContext } from "@/components/motion/useGsapContext";
import { registerRests } from "@/components/motion/presenter";
import { FrameSequence } from "@/components/film/frameSequence";
import { act01 } from "@/lib/gate";
import { motionReady, pinned, rise, sink } from "./scene";

/**
 * Act 01 · Uma nova dimensão. One pinned stage, scale growing by occlusion:
 * a hairline opens into a slit with the real P-35 ("Novos projetos.") · a
 * diagonal plane enters over it, the vessel in heavy sea, now full screen
 * ("Novas responsabilidades.") · the camera dives and crosses the waterline,
 * the hull continues below, enormous ("Uma nova dimensão.") · dark, then a
 * clean field where the line is completed: "pede uma nova direção." · the
 * word "direção" leaves alone and becomes the direction rail of Act 02.
 * Positions are progress p of the pin. Without motion, .a1-static tells the
 * same story in four frames.
 */
export function Act01Dimensao() {
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
      const one = <T extends Element = HTMLElement>(s: string) => q(s)[0] as unknown as T;
      const railLine = document.querySelector<HTMLElement>(".rail-line");
      const railLabel = document.querySelector<HTMLElement>(".rail-label");

      // film: the P-35 first, the sea once the P-35 is in
      const ed = portrait ? "m" : "d";
      const p35 = new FrameSequence(one<HTMLCanvasElement>(".a1-p35 canvas"), act01.frames.p35[ed]);
      const sea = new FrameSequence(one<HTMLCanvasElement>(".a1-sea canvas"), act01.frames.sea[ed]);
      p35.load().then(() => sea.load());
      const f = { p35: 0, sea: 0 };
      const drawP35 = () => p35.seek(f.p35);
      const drawSea = () => sea.seek(f.sea);

      // the deep: a tall still panned by the scroll; portrait enlarges it to leave room to pan
      const deep = one<HTMLImageElement>(".a1-deep img");
      const { ratio, waterline } = act01.deep;
      const deepW = () => (portrait ? Math.max(window.innerWidth, (window.innerHeight * 1.3) / ratio) : window.innerWidth);
      const deepH = () => deepW() * ratio;
      const size = () => {
        deep.style.width = `${deepW()}px`;
        deep.style.height = `${deepH()}px`;
        deep.style.left = `${(window.innerWidth - deepW()) * (portrait ? 0.3 : 0.5)}px`;
      };
      size();
      gsap.set(deep, { transformOrigin: "50% 0%" });
      ScrollTrigger.addEventListener("refreshInit", size);

      // the slit: first the height of a 2.76:1 frame, then most of the screen
      const slit = () => {
        const vw = window.innerWidth, vh = window.innerHeight;
        const h = Math.min(vh * 0.94, vw / 2.76);
        return `inset(${(((vh - h) / 2 / vh) * 100).toFixed(2)}% 0% ${(((vh - h) / 2 / vh) * 100).toFixed(2)}% 0%)`;
      };

      // when the waterline passes the line of type, "Uma nova dimensão" appears
      const vh0 = window.innerHeight;
      const tStar = gsap.utils.clamp(0, 1, (waterline * deepH() - vh0 * 0.42) / (deepH() - vh0));
      const pTitle = 0.52 + 0.24 * tStar;

      const tl = pinned(el, one(".a1-stage"), portrait ? 430 : 560);
      const io = "power2.inOut";

      // 01.0 · silence: GAVEA, a hairline
      tl.fromTo(".a1-rule", { scaleX: 0 }, { scaleX: 1, duration: 0.04 }, 0)
        .to([".a1-mark", ".a1-cue"], { autoAlpha: 0, duration: 0.02 }, 0.03);

      // 01.1 · Novos projetos. The hairline opens into the P-35
      if (portrait) {
        tl.fromTo(".a1-p35", { clipPath: "inset(50% 0% 50% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.08, ease: io }, 0.04);
      } else {
        tl.fromTo(".a1-p35", { clipPath: "inset(50% 0% 50% 0%)" }, { clipPath: slit, duration: 0.06, ease: io }, 0.04)
          .to(".a1-p35", { clipPath: "inset(13% 0% 13% 0%)", duration: 0.14, ease: "power1.inOut" }, 0.1);
      }
      tl.to(".a1-rule", { autoAlpha: 0, duration: 0.01 }, 0.06)
        .fromTo(".a1-p35 canvas", { scale: 1.08 }, { scale: 1, duration: 0.23 }, 0.04)
        .to(f, { p35: act01.frames.p35[ed].count - 1, duration: 0.23, onUpdate: drawP35 }, 0.04);
      rise(tl, ".a1-t1", 0.1);
      sink(tl, ".a1-t1", 0.265);

      // 01.2 · Novas responsabilidades. A bigger plane enters from the right, on a diagonal
      tl.fromTo(
        ".a1-sea",
        { clipPath: "polygon(118% 0%, 100% 0%, 100% 100%, 100% 100%)" },
        { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, -18% 100%)", duration: 0.07, ease: io },
        0.24,
      )
        .fromTo(".a1-sea canvas", { xPercent: 6 }, { xPercent: 0, duration: 0.1, ease: "power2.out" }, 0.24)
        .to(".a1-p35", { xPercent: -5, duration: 0.07, ease: io }, 0.24)
        .to(f, { sea: act01.frames.sea[ed].count - 1, duration: 0.2, onUpdate: drawSea }, 0.26);
      rise(tl, ".a1-t2", 0.31);

      // the dive: the sea leaves upwards, the hull below the waterline comes up
      tl.to(".a1-sea", { yPercent: -100, duration: 0.08, ease: io }, 0.44)
        .to(".a1-t2", { y: () => -window.innerHeight, duration: 0.08, ease: io }, 0.44)
        .fromTo(deep, { y: () => window.innerHeight }, { y: 0, duration: 0.08, ease: io }, 0.44)
        .to(deep, { y: () => -(deepH() - window.innerHeight), duration: 0.24, ease: "power1.inOut" }, 0.52)
        .fromTo(deep, { scale: 1.06 }, { scale: 1, duration: 0.32, transformOrigin: "50% 0%" }, 0.44);

      // 01.3 · Uma nova dimensão.
      rise(tl, ".a1-l1", pTitle, 0.045);
      tl.fromTo(".a1-dark", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.04 }, 0.76);

      // 01.4 · the hairline returns and opens a clean field; the line is completed
      tl.fromTo(".a1-rule", { autoAlpha: 1, scaleX: 0 }, { scaleX: 1, duration: 0.02, immediateRender: false }, 0.795)
        .fromTo(".a1-paper", { clipPath: "inset(50% 0% 50% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.04, ease: io }, 0.812)
        .to(".a1-rule", { autoAlpha: 0, duration: 0.01 }, 0.83)
        .fromTo(".a1-head", { color: "#f2f4f3" }, { color: "#081e2f", duration: 0.03 }, 0.812)
        .to(".a1-dot", { autoAlpha: 0, duration: 0.012 }, 0.855);
      rise(tl, ".a1-l2", 0.865, 0.045);

      // bridge · everything but "direção" goes; the word becomes the rail
      const word = one(".a1-word");
      const head = one(".a1-head");
      const fly = () => {
        const fs = parseFloat(getComputedStyle(word).fontSize);
        const label = railLabel?.getBoundingClientRect();
        const lfs = railLabel ? parseFloat(getComputedStyle(railLabel).fontSize) : 14;
        const h = head.getBoundingClientRect();
        const x0 = h.left + word.offsetLeft;
        const y0 = h.top + word.offsetTop;
        return {
          x: (label?.left ?? 24) - x0,
          y: (label?.top ?? 24) - y0 - fs * 0.08,
          scale: lfs / fs,
        };
      };
      tl.set(".a1-l2", { overflow: "visible" }, 0.955)
        .to([".a1-l1", ".a1-l2a", ".a1-l2b"], { autoAlpha: 0, duration: 0.02 }, 0.95)
        .to(word, { x: () => fly().x, y: () => fly().y, scale: () => fly().scale, transformOrigin: "0 0", duration: 0.035, ease: io }, 0.958);
      if (railLabel && railLine) {
        tl.fromTo(railLabel, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.006 }, 0.99)
          .to(word, { autoAlpha: 0, duration: 0.006 }, 0.99)
          .fromTo(railLine, { autoAlpha: 1, scaleY: 0 }, { scaleY: 1, duration: 0.02, transformOrigin: "50% 0%" }, 0.98);
      }
      tl.set({}, {}, 1);

      const off = registerRests("a1", tl.scrollTrigger!, [0, 0.2, 0.42, Math.min(pTitle + 0.06, 0.74), 0.93]);
      document.fonts?.ready.then(() => ScrollTrigger.refresh());
      drawP35();
      return () => {
        off();
        ScrollTrigger.removeEventListener("refreshInit", size);
        p35.destroy();
        sea.destroy();
      };
    },
  );

  const { head } = act01;

  return (
    <section ref={root} className="a1" aria-label="Uma nova dimensão">
      {/* ── Motion edition ─────────────────────────────────────────────── */}
      <div className="a1-stage">
        <div className="a1-p35">
          <canvas aria-hidden="true" />
        </div>
        <div className="a1-sea">
          <canvas aria-hidden="true" />
          <div className="a1-scrim" />
        </div>
        <div className="a1-deep">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={act01.deep.d} srcSet={`${act01.deep.m} 1080w, ${act01.deep.d} 1600w`} sizes="100vw" alt="" decoding="async" />
        </div>
        <div className="a1-dark" />
        <div className="a1-paper" />
        <span className="a1-rule" />

        <p className="a1-mark t-label">{act01.mark}</p>
        <p className="a1-t a1-t1 rise" aria-hidden="true"><span>{act01.t1}</span></p>
        <p className="a1-t a1-t2 rise" aria-hidden="true"><span>{act01.t2}</span></p>
        <h2 className="a1-head">
          <span className="a1-l1 rise">
            <span>{head.l1}<span className="a1-dot">.</span></span>
          </span>
          <span className="a1-l2 rise">
            <span>
              <span className="a1-l2a">{head.l2a}</span>
              <span className="a1-word">{head.word}</span>
              <span className="a1-l2b">{head.l2b}</span>
            </span>
          </span>
        </h2>
        <p className="sr-only">
          {act01.t1} {act01.t2}
        </p>
        <span className="a1-cue t-label" aria-hidden="true">Role ou use as setas</span>
      </div>

      {/* ── Static edition (reduced motion, no JS) ─────────────────────── */}
      <div className="a1-static">
        <div className="st-panel st-film">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/media/gate/p35-photo.webp" alt={act01.alts.p35} />
          <p className="t-label">{act01.mark}</p>
          <p className="st-title">{act01.t1}</p>
        </div>
        <div className="st-panel st-film">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${act01.frames.sea.d.dir}/0030.webp`} alt={act01.alts.sea} />
          <p className="st-title">{act01.t2}</p>
        </div>
        <div className="st-panel st-film st-deep">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={act01.deep.d} alt={act01.deep.alt} />
          <p className="st-title">{head.l1}.</p>
        </div>
        <div className="st-panel st-paper">
          <h2 className="st-head">
            {head.l1}
            <br />
            {head.l2a}
            {head.word}
            {head.l2b}
          </h2>
        </div>
      </div>
    </section>
  );
}
