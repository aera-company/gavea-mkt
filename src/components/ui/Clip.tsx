"use client";

import { useEffect, useRef, useState } from "react";
import type { Clip as ClipData } from "@/lib/media";

/**
 * Real footage, muted, looped, played only while on screen. Under reduced
 * motion it never autoplays: the poster stays, with a plain play control.
 * The 848 px source is shown in band crops; grain hides the upscale.
 */
export function Clip({
  clip,
  className = "",
  aspect,
  caption = true,
  eager = false,
  grain = true,
}: {
  clip: ClipData;
  className?: string;
  aspect?: string;
  caption?: boolean;
  eager?: boolean;
  grain?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const mq = matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!v || reduced) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { rootMargin: "120px 0px" },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [reduced]);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };

  return (
    <figure className={className}>
      <div
        className={`media ${grain ? "grain" : ""}`}
        style={{ aspectRatio: aspect ?? `${clip.w} / ${clip.h}` }}
      >
        <video
          ref={ref}
          src={clip.src}
          poster={clip.poster}
          muted
          loop
          playsInline
          preload={eager ? "auto" : "metadata"}
          aria-label={clip.alt}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
        {reduced && (
          <button
            type="button"
            onClick={toggle}
            className="t-label absolute bottom-3 left-3 z-10 bg-[var(--paper)] px-2.5 py-1.5 text-[var(--ink)]"
          >
            {playing ? "Pausar" : "Reproduzir"}
          </button>
        )}
      </div>
      {caption && <figcaption className="t-caption mt-2">{clip.caption}</figcaption>}
    </figure>
  );
}
