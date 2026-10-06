"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/components/motion/gsap";
import { useGsapContext } from "@/components/motion/useGsapContext";
import { registerRests } from "@/components/motion/presenter";
import { act01 } from "@/lib/gate";
import { motionReady, pinned, rise } from "./scene";

/**
 * Act 01 · Uma nova dimensão. The hero is a film (GW-T1, scope 2.39:1, 19 s):
 * the macro of the P-35 hull pulls back to the whole vessel ("Novos projetos."),
 * the quay crew at the fender ("Novas responsabilidades."), the dive along the
 * hull into the dark ("Uma nova dimensão"). It plays on its own on load, muted;
 * the titles are HTML timed on the film. Scroll then takes over: the film goes
 * dark, the hairline opens a clean field, "pede uma nova direção." completes the
 * line and "direção" leaves alone to become the direction rail of Act 02.
 * Without motion, .a1-static tells the same story in four frames.
 */
export function Act01Dimensao() {
  const root = useRef<HTMLElement>(null);

  useGsapContext(
    root,
    {
      motion: "(prefers-reduced-motion: no-preference)",
      portrait: "(max-aspect-ratio: 4/5)",
      small: "(max-width: 767px)",
    },
    ({ motion, portrait, small }) => {
      if (!motion || !root.current) return;
      motionReady();

      const el = root.current;
      const q = gsap.utils.selector(el);
      const one = <T extends Element = HTMLElement>(s: string) => q(s)[0] as unknown as T;
      const railLine = document.querySelector<HTMLElement>(".rail-line");
      const railLabel = document.querySelector<HTMLElement>(".rail-label");
      const { film } = act01;

      // ── the film plays on its own; titles follow its clock ───────────────
      const video = one<HTMLVideoElement>(".a1-film video");
      video.src = portrait || small ? film.m : film.d;
      const span = (s: string) => one(`${s} > span`);
      const shown = new Map<string, boolean>();
      // start states in percent only (GSAP would otherwise read the CSS 150% as pixels)
      gsap.set([".a1-t1", ".a1-t2", ".a1-l1"].map(span), { y: 0, yPercent: 150 });
      const show = (s: string, on: boolean) => {
        if (shown.get(s) === on) return;
        shown.set(s, on);
        gsap.to(span(s), on
          ? { y: 0, yPercent: 0, duration: 0.9, ease: "power3.out", overwrite: true }
          : { y: 0, yPercent: -150, duration: 0.5, ease: "power2.in", overwrite: true, onComplete: () => { gsap.set(span(s), { yPercent: 150 }); } });
      };
      let p = 0;                       // pin progress
      let parked = false;              // paused by the scroll, not by its end
      const sync = () => {
        const t = video.currentTime;
        const inFilm = p < 0.34;
        show(".a1-t1", inFilm && t >= film.cues.t1[0] && t < film.cues.t1[1]);
        show(".a1-t2", inFilm && t >= film.cues.t2[0] && t < film.cues.t2[1]);
        show(".a1-l1", t >= film.cues.l1 || !inFilm);
        gsap.to(".a1-cue", { autoAlpha: video.ended && inFilm ? 1 : 0, duration: 0.6, overwrite: true });
      };
      let raf = 0;
      const loop = () => { sync(); raf = requestAnimationFrame(loop); };
      raf = requestAnimationFrame(loop);
      const play = () => video.play().catch(() => {
        // autoplay refused: start on the first gesture
        const go = () => { video.play().catch(() => {}); ["pointerdown", "keydown", "touchstart", "wheel"].forEach((e) => removeEventListener(e, go)); };
        ["pointerdown", "keydown", "touchstart", "wheel"].forEach((e) => addEventListener(e, go, { once: true, passive: true }));
      });
      play();

      // ── scroll: the film goes dark, the line is completed, the word leaves ──
      const tl = pinned(el, one(".a1-stage"), portrait ? 280 : 300);
      const io = "power2.inOut";

      tl.to(".a1-film", { autoAlpha: 0, duration: 0.08, ease: "power1.in" }, 0.32)
        .fromTo(".a1-dark", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.06 }, 0.32);

      // the hairline returns and opens a clean field; the line is completed
      tl.fromTo(".a1-rule", { autoAlpha: 1, scaleX: 0 }, { scaleX: 1, duration: 0.043 }, 0.56)
        .fromTo(".a1-paper", { clipPath: "inset(50% 0% 50% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.086, ease: io }, 0.597)
        .to(".a1-rule", { autoAlpha: 0, duration: 0.02 }, 0.635)
        .fromTo(".a1-head", { color: "#f2f4f3" }, { color: "#081e2f", duration: 0.064 }, 0.597)
        .to(".a1-dot", { autoAlpha: 0, duration: 0.026 }, 0.693);
      rise(tl, ".a1-l2", 0.715, 0.096);

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
        return { x: (label?.left ?? 24) - x0, y: (label?.top ?? 24) - y0 - fs * 0.08, scale: lfs / fs };
      };
      tl.set(".a1-l2", { overflow: "visible" }, 0.9)
        .to([".a1-l1", ".a1-l2a", ".a1-l2b"], { autoAlpha: 0, duration: 0.043 }, 0.89)
        .to(word, { x: () => fly().x, y: () => fly().y, scale: () => fly().scale, transformOrigin: "0 0", duration: 0.075, ease: io }, 0.908);
      if (railLabel && railLine) {
        tl.fromTo(railLabel, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.013 }, 0.979)
          .to(word, { autoAlpha: 0, duration: 0.013 }, 0.979)
          .fromTo(railLine, { autoAlpha: 1, scaleY: 0 }, { scaleY: 1, duration: 0.043, transformOrigin: "50% 0%" }, 0.957);
      }
      tl.set({}, {}, 1);

      // the film and the scroll: leaving pauses it, coming back to the top replays it
      const st = tl.scrollTrigger!;
      const onScroll = () => {
        p = st.progress;
        if (p > 0.36 && !video.paused) { video.pause(); parked = true; }
        else if (p <= 0.3 && parked) { parked = false; play(); }
        if (p < 0.02 && video.ended) { video.currentTime = 0; play(); }
      };
      tl.eventCallback("onUpdate", onScroll);
      ScrollTrigger.addEventListener("scrollEnd", onScroll);

      const off = registerRests("a1", st, [0, 0.46, 0.84]);
      document.fonts?.ready.then(() => ScrollTrigger.refresh());
      return () => {
        off();
        cancelAnimationFrame(raf);
        ScrollTrigger.removeEventListener("scrollEnd", onScroll);
        video.pause();
      };
    },
  );

  const { head, film, alts } = act01;

  return (
    <section ref={root} className="a1" aria-label="Uma nova dimensão">
      {/* ── Motion edition ─────────────────────────────────────────────── */}
      <div className="a1-stage">
        <div className="a1-film">
          <video muted playsInline preload="auto" poster={film.poster} aria-label={alts.film} />
        </div>
        <div className="a1-dark" />
        <div className="a1-paper" />
        <span className="a1-rule" />

        <p className="a1-ft a1-t1 rise" aria-hidden="true"><span>{act01.t1}</span></p>
        <p className="a1-ft a1-t2 rise" aria-hidden="true"><span>{act01.t2}</span></p>
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
          <img src={film.stills.p35} alt={alts.p35} />
          <p className="t-label">{act01.mark}</p>
          <p className="st-title">{act01.t1}</p>
        </div>
        <div className="st-panel st-film">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={film.stills.cais} alt={alts.cais} />
          <p className="st-title">{act01.t2}</p>
        </div>
        <div className="st-panel st-film st-deep">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={film.stills.deep} alt={alts.deep} />
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
