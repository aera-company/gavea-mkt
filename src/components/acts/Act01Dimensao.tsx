"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/components/motion/gsap";
import { useGsapContext } from "@/components/motion/useGsapContext";
import { registerRests } from "@/components/motion/presenter";
import { FrameSequence } from "@/components/film/frameSequence";
import { act01 } from "@/lib/gate";
import { motionReady, pinned, rise, sink } from "./scene";

/**
 * Act 01 · Uma nova dimensão. The hero is a film (GW-T1, scope 2.39:1) driven by
 * the scroll, frame by frame: the macro of the P-35 hull pulls back to the whole
 * vessel ("Novos projetos."), the quay crew at the fender ("Novas
 * responsabilidades."), the dive along the hull into the dark ("Uma nova
 * dimensão"). Guided steps, Emons-like: the presenter rests stop on each idea.
 * Then the hairline opens a clean field, "pede uma nova direção." completes the
 * line and "direção" leaves alone to become the direction rail of Act 02.
 * Positions are progress p of the pin. Without motion, .a1-static tells the
 * same story in four frames.
 */
const FILM_END = 0.58; // share of the pin the film takes

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

      // ── the film, frame by frame with the scroll ───────────────────────────
      const spec = portrait || small ? film.frames.m : film.frames.d;
      const seq = new FrameSequence(one<HTMLCanvasElement>(".a1-film canvas"), spec);
      seq.load();
      const last = spec.count - 1;
      const at = (frame: number) => (frame / last) * FILM_END; // film frame -> pin progress
      const f = { frame: 0 };
      const draw = () => seq.seek(f.frame);

      const tl = pinned(el, one(".a1-stage"), portrait ? 520 : 560);
      const io = "power2.inOut";

      tl.fromTo(".a1-cue", { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.02 }, 0.01)
        .to(f, { frame: last, duration: FILM_END, ease: "none", onUpdate: draw }, 0);

      // titles on the film
      rise(tl, ".a1-t1", at(film.cues.t1[0]), 0.03);
      sink(tl, ".a1-t1", at(film.cues.t1[1]) - 0.02, 0.02);
      rise(tl, ".a1-t2", at(film.cues.t2[0]), 0.03);
      sink(tl, ".a1-t2", at(film.cues.t2[1]) - 0.02, 0.02);
      rise(tl, ".a1-l1", at(film.cues.l1), 0.04);

      // the film has gone dark; the hairline returns and opens a clean field
      tl.fromTo(".a1-dark", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.03 }, FILM_END)
        .fromTo(".a1-rule", { autoAlpha: 1, scaleX: 0 }, { scaleX: 1, duration: 0.03, immediateRender: false }, 0.64)
        .fromTo(".a1-paper", { clipPath: "inset(50% 0% 50% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.06, ease: io }, 0.66)
        .to(".a1-rule", { autoAlpha: 0, duration: 0.015 }, 0.69)
        .fromTo(".a1-head", { color: "#f2f4f3" }, { color: "#081e2f", duration: 0.045 }, 0.66)
        .to(".a1-dot", { autoAlpha: 0, duration: 0.02 }, 0.73);
      rise(tl, ".a1-l2", 0.745, 0.07);

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
      tl.set(".a1-l2", { overflow: "visible" }, 0.905)
        .to([".a1-l1", ".a1-l2a", ".a1-l2b"], { autoAlpha: 0, duration: 0.03 }, 0.895)
        .to(word, { x: () => fly().x, y: () => fly().y, scale: () => fly().scale, transformOrigin: "0 0", duration: 0.06, ease: io }, 0.91);
      if (railLabel && railLine) {
        tl.fromTo(railLabel, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01 }, 0.98)
          .to(word, { autoAlpha: 0, duration: 0.01 }, 0.98)
          .fromTo(railLine, { autoAlpha: 1, scaleY: 0 }, { scaleY: 1, duration: 0.03, transformOrigin: "50% 0%" }, 0.96);
      }
      tl.set({}, {}, 1);

      // guided steps: the macro, the P-35, the quay, the deep, the line
      const mid = (a: number, b: number) => (at(a) + at(b)) / 2;
      const off = registerRests("a1", tl.scrollTrigger!, [
        0,
        mid(film.cues.t1[0] + 14, film.cues.t1[1]),
        mid(film.cues.t2[0] + 10, film.cues.t2[1]),
        at(film.cues.l1 + 26),
        0.84,
      ]);
      document.fonts?.ready.then(() => ScrollTrigger.refresh());
      draw();
      return () => {
        off();
        seq.destroy();
      };
    },
  );

  const { head, film, alts } = act01;

  return (
    <section ref={root} className="a1" aria-label="Uma nova dimensão">
      {/* ── Motion edition ─────────────────────────────────────────────── */}
      <div className="a1-stage">
        <div className="a1-film" role="img" aria-label={alts.film}>
          <canvas aria-hidden="true" style={{ backgroundImage: `url(${film.poster})` }} />
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
