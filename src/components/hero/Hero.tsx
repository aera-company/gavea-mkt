"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/components/motion/gsap";
import { useGsapContext } from "@/components/motion/useGsapContext";
import { heroChapters, heroCopy, heroFrames, heroShots } from "@/lib/hero";
import { FrameSequence } from "./frameSequence";

const pad = (n: number, l = 2) => String(n).padStart(l, "0");

/**
 * ACT 01 · The shift. One pinned scroll film ("do aço ao horizonte"):
 * the camera pulls back from painted steel to the sea, a six-shot montage
 * runs under the scroll, four words take the screen, then white silence and
 * the first AERA reveal. Timeline positions are progress p (0 to 1).
 *
 * Without motion (reduced motion, no JS) the stage is hidden and the static
 * edition below it shows five frames in sequence.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGsapContext(
    root,
    {
      motion: "(prefers-reduced-motion: no-preference)",
      portrait: "(max-aspect-ratio: 4/5)",
    },
    ({ motion, portrait }) => {
      if (!motion || !root.current) return;
      (window as Window & { __motionReady?: boolean }).__motionReady = true;

      const el = root.current;
      const q = gsap.utils.selector(el);
      const one = <T extends Element = HTMLElement>(s: string) => q(s)[0] as unknown as T;

      const seq = new FrameSequence(
        one<HTMLCanvasElement>(".hero-canvas"),
        portrait ? heroFrames.mobile : heroFrames.desktop,
      );
      seq.load();

      // HUD: chapter, frame number, montage shot
      const hudChapter = one(".hero-hud-chapter");
      const hudFrame = one(".hero-hud-frame");
      const shotLabel = one(".hero-shot-label");
      const shotIndex = one(".hero-shot-index");
      const ticks = q(".hero-shot-tick");
      const film = { f: 0 };
      let lastShot = -1;
      const onFrame = () => {
        seq.seek(film.f);
        hudFrame.textContent = pad(Math.round(film.f), 4);
        const shot = Math.min(5, Math.floor((film.f - heroFrames.s2[0]) / heroFrames.shotLength));
        if (shot !== lastShot && shot >= 0) {
          lastShot = shot;
          shotIndex.textContent = `${pad(shot + 1)} / 06`;
          shotLabel.textContent = heroShots[shot];
          ticks.forEach((t, k) => t.classList.toggle("is-on", k <= shot));
        }
      };
      let lastChapter = "";
      const onProgress = (p: number) => {
        const c = [...heroChapters].reverse().find((ch) => p >= ch.at) ?? heroChapters[0];
        if (c.id !== lastChapter) {
          lastChapter = c.id;
          hudChapter.textContent = `${c.id} · ${c.label}`;
          el.dataset.chapter = c.id;
        }
      };

      // Fit each peak word to the viewport width at its landed width axis.
      const words = q(".hero-word-text");
      const fit = () => {
        const target = window.innerWidth * (portrait ? 0.9 : 0.92);
        words.forEach((w) => {
          w.style.setProperty("--fs", "100px");
          w.style.setProperty("--w", "125");
          const size = Math.min(target / w.scrollWidth, portrait ? 3.2 : 4.2) * 100;
          w.style.setProperty("--fs", `${size.toFixed(1)}px`);
        });
      };
      fit();
      document.fonts?.ready.then(() => ScrollTrigger.refresh());
      ScrollTrigger.addEventListener("refreshInit", fit);

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: portrait ? "+=190%" : "+=260%",
          pin: one(".hero-stage"),
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
      const io = "power2.inOut";
      const out = "power3.out";

      // F00 · silence
      tl.fromTo(".hero-mark-rule", { scaleX: 0 }, { scaleX: 1, duration: 0.05 }, 0)
        .to(".hero-cue", { autoAlpha: 0, duration: 0.03 }, 0)
        .to(".hero-mark", { autoAlpha: 0, duration: 0.03 }, 0.04);

      // F01 · macro: the film opens from a slit, the camera settles
      tl.fromTo(".hero-film", { clipPath: "inset(50% 0% 50% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.09, ease: io }, 0.035)
        .fromTo(".hero-film-inner", { scale: 1.14 }, { scale: 1, duration: 0.31 }, 0.035)
        .to(film, { f: 40, duration: 0.15, onUpdate: onFrame }, 0.05)
        .fromTo(".hero-a1 > span", { yPercent: 108, y: 0 }, { yPercent: 0, duration: 0.045, ease: out }, 0.08)
        .fromTo(".hero-a2 > span", { yPercent: 108, y: 0 }, { yPercent: 0, duration: 0.045, ease: out }, 0.105)
        .fromTo(".hero-line-a", { letterSpacing: "-0.055em", scale: 1.04 }, { letterSpacing: "-0.03em", scale: 1, duration: 0.14 }, 0.08)
        .to(".hero-line-a", { y: () => -window.innerHeight * 0.7, duration: 0.04, ease: "power2.in" }, 0.19)
        .to(".hero-line-a", { autoAlpha: 0, duration: 0.015 }, 0.215);

      // F02 · pull back: dry dock revealed, a second reality crosses in front
      tl.to(film, { f: heroFrames.s1[1], duration: 0.16, onUpdate: onFrame }, 0.2)
        .fromTo(".hero-b1 > span", { yPercent: 108, y: 0 }, { yPercent: 0, duration: 0.045, ease: out }, 0.24)
        .fromTo(".hero-b2 > span", { yPercent: 108, y: 0 }, { yPercent: 0, duration: 0.045, ease: out }, 0.265)
        .fromTo(".hero-line-b", { y: () => window.innerHeight * 0.06 }, { y: 0, duration: 0.1 }, 0.24)
        .to(".hero-line-b", { y: () => -window.innerHeight * 0.7, duration: 0.035, ease: "power2.in" }, 0.33)
        .to(".hero-line-b", { autoAlpha: 0, duration: 0.012 }, 0.353);
      if (!portrait) {
        tl.fromTo(
          ".hero-second",
          { x: 0 },
          { x: () => -(window.innerWidth * 1.45), duration: 0.22 },
          0.19,
        ).fromTo(".hero-second-media", { scale: 1.25 }, { scale: 1, duration: 0.22 }, 0.19);
      }

      // F03 · brand film: six shots edited by the scroll
      tl.to(film, { f: heroFrames.s2[1], duration: 0.3, onUpdate: onFrame }, 0.36)
        .fromTo(".hero-shots", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.02 }, 0.36)
        .to(".hero-shots", { autoAlpha: 0, duration: 0.02 }, 0.645)
        .to(".hero-film-inner", { scale: 1.05, duration: 0.3 }, 0.36);

      // F04 · peak: four words, each filled with its own plane
      tl.to(".hero-film", { autoAlpha: 0, duration: 0.03 }, 0.645);
      const slot = 0.045;
      q(".hero-word").forEach((word, k) => {
        const s = 0.665 + k * slot;
        const text = word.querySelector(".hero-word-text");
        const bg = word.querySelector(".hero-word-bg");
        tl.fromTo(word, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.012 }, s)
          .fromTo(text, { "--w": 75, scale: 1.08 }, { "--w": 125, scale: 1, duration: 0.024, ease: out }, s)
          .fromTo(text, { backgroundPosition: "0% 0%, 0% 50%" }, { backgroundPosition: "0% 0%, 100% 50%", duration: slot }, s)
          .fromTo(bg, { xPercent: 4, scale: 1.08 }, { xPercent: -4, scale: 1, duration: slot }, s)
          .to(word, { autoAlpha: 0, duration: 0.008 }, s + slot - 0.008);
      });
      tl.fromTo(".hero-word-index", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01 }, 0.665)
        .to(".hero-word-index", { autoAlpha: 0, duration: 0.01 }, 0.835);

      // F05 · white silence, F06 · AERA reveal
      tl.fromTo(".hero-paper", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.02 }, 0.84)
        .fromTo(".hero-pair", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.025 }, 0.9)
        .fromTo(".hero-c1 > span", { yPercent: 108, y: 0 }, { yPercent: 0, duration: 0.04, ease: out }, 0.92)
        .fromTo(".hero-c2 > span", { yPercent: 108, y: 0 }, { yPercent: 0, duration: 0.04, ease: out }, 0.945)
        .fromTo(".hero-close-rule", { scaleX: 0 }, { scaleX: 1, duration: 0.04, ease: out }, 0.955)
        .set({}, {}, 1);

      // keep the shot word index in step with the peak words; the second
      // reality only plays while it crosses the screen
      const wordIndex = one(".hero-word-index");
      const second = one<HTMLVideoElement>(".hero-second-media");
      second.muted = true;
      let secondOn = false;
      tl.eventCallback("onUpdate", function (this: gsap.core.Timeline) {
        const p = this.progress();
        onProgress(p);
        const k = Math.min(3, Math.max(0, Math.floor((p - 0.665) / slot)));
        wordIndex.textContent = `${pad(k + 1)} / 04`;
        const on = !portrait && p > 0.17 && p < 0.42;
        if (on !== secondOn) {
          secondOn = on;
          if (on) second.play().catch(() => {});
          else second.pause();
        }
      });

      onFrame();
      return () => {
        ScrollTrigger.removeEventListener("refreshInit", fit);
        seq.destroy();
      };
    },
  );

  const { lineA, lineB, words, close } = heroCopy;

  return (
    <section ref={root} id="hero" className="hero" lang="en" aria-label="Act 01, the shift">
      {/* ── Motion edition: pinned stage ─────────────────────────────── */}
      <div className="hero-stage" data-theme="film">
        <div className="hero-film">
          <div className="hero-film-inner">
            <canvas className="hero-canvas" aria-hidden="true" />
          </div>
          <div className="hero-scrim" aria-hidden="true" />
        </div>

        <figure className="hero-second" aria-hidden="true">
          <div className="hero-second-frame">
            <video
              className="hero-second-media"
              src="/media/hero/p35-zenital-bw.mp4"
              poster="/media/hero/p35-zenital-bw.webp"
              muted
              loop
              playsInline
              preload="metadata"
            />
          </div>
          <figcaption className="t-caption">{heroCopy.second}</figcaption>
        </figure>

        <div className="hero-mark">
          <span className="t-label">{heroCopy.mark}</span>
          <span className="hero-mark-rule" />
        </div>

        <h1 className="hero-type">
          <span className="hero-line hero-line-a">
            <span className="hero-mask hero-a1"><span>{lineA[0]}</span></span>{" "}
            <span className="hero-mask hero-a2"><span>{lineA[1]}</span></span>
          </span>
          <span className="hero-line hero-line-b">
            <span className="hero-mask hero-b1"><span>{lineB[0]}</span></span>{" "}
            <span className="hero-mask hero-b2"><span>{lineB[1]}</span></span>
          </span>
        </h1>

        <div className="hero-shots" aria-hidden="true">
          <span className="hero-shot-index t-folio">01 / 06</span>
          <span className="hero-shot-ticks">
            {heroShots.map((s) => (
              <span key={s} className="hero-shot-tick" />
            ))}
          </span>
          <span className="hero-shot-label t-label">{heroShots[0]}</span>
        </div>

        <ul className="hero-words">
          {words.map(({ word, img }) => (
            <li
              key={word}
              className="hero-word"
              style={{ "--img": `url(/media/hero/words/${img}.webp)`, "--img-sm": `url(/media/hero/words/${img}-sm.webp)` } as React.CSSProperties}
            >
              <span className="hero-word-bg" aria-hidden="true" />
              <span className="hero-word-text">{word}</span>
            </li>
          ))}
        </ul>
        <span className="hero-word-index t-folio" aria-hidden="true">01 / 04</span>

        <div className="hero-paper" data-theme="paper">
          <p className="hero-pair t-label">
            <span className="aera-mark hero-pair-mark" role="img" aria-label="AERA" />
            <span>× GAVEA</span>
          </p>
          <p className="hero-close">
            <span className="hero-mask hero-c1"><span>{close[0]}</span></span>{" "}
            <span className="hero-mask hero-c2"><span>{close[1]}</span></span>
          </p>
          <span className="hero-close-rule" aria-hidden="true" />
        </div>

        <div className="hero-hud" aria-hidden="true">
          <span className="t-label hero-hud-brand">GAVEA × AERA</span>
          <span className="t-label hero-hud-act">{heroCopy.act}</span>
          <span className="t-folio hero-hud-chapter">F00 · Silence</span>
          <span className="t-folio hero-hud-frame">0000</span>
          <span className="t-label hero-cue">{heroCopy.cue}</span>
        </div>
      </div>

      {/* ── Static edition: reduced motion and no JS ─────────────────── */}
      <div className="hero-static">
        <div className="hero-panel">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/media/hero/d/0000.webp" alt="" />
          <p className="t-label hero-panel-mark">{heroCopy.mark}</p>
          <h1 className="hero-line">{lineA.join(" ")}</h1>
        </div>
        <div className="hero-panel">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/media/hero/d/0121.webp" alt="Casco de navio em dique seco, uma pessoa na base." />
          <p className="hero-line">{lineB.join(" ")}</p>
        </div>
        <div className="hero-panel">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/media/hero/d/0150.webp" alt="Equipe da Gavea Logística na amarração da P-35." />
          <p className="t-label hero-panel-mark">{heroShots[1]}</p>
        </div>
        <ul className="hero-panel hero-panel-words">
          {words.map(({ word, img }) => (
            <li
              key={word}
              className="hero-word-text"
              style={{ "--img": `url(/media/hero/words/${img}-sm.webp)` } as React.CSSProperties}
            >
              {word}
            </li>
          ))}
        </ul>
        <div className="hero-panel hero-panel-paper" data-theme="paper">
          <p className="t-label">{heroCopy.pair}</p>
          <p className="hero-close">{close.join(" ")}</p>
        </div>
      </div>
    </section>
  );
}
