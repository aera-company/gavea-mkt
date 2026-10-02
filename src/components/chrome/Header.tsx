"use client";

import { useEffect, useRef, useState } from "react";
import { moments, pad2 } from "@/lib/content";

/**
 * Minimal header: pairing on the left, folio of the moment under it on the
 * right, a 1 px progress line in GAVEA blue. It takes the theme of the moment
 * it sits on. Keys: ← → jump between moments (live presenting), G toggles
 * the 12-column overlay (review).
 */
export function Header() {
  const [active, setActive] = useState(0);
  const [theme, setTheme] = useState<string>(moments[0].theme);
  const [grid, setGrid] = useState(false);
  const [solid, setSolid] = useState(false);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const read = () => {
      raf = 0;
      const probe = 28; // middle of the header band
      const sections = document.querySelectorAll<HTMLElement>("[data-moment]");
      let current = 0;
      let under: HTMLElement | null = null;
      sections.forEach((s) => {
        const r = s.getBoundingClientRect();
        if (r.top <= probe && r.bottom > probe) under = s;
        if (r.top <= window.innerHeight * 0.5) current = Number(s.dataset.moment);
      });
      setActive(current);
      // Transparent only over the opening photograph.
      setSolid(window.scrollY > window.innerHeight - 160);
      if (under) setTheme((under as HTMLElement).dataset.theme ?? "paper");
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (e.metaKey || e.ctrlKey || e.altKey || t.closest("input, textarea, [contenteditable]")) return;
      if (e.key === "g" || e.key === "G") setGrid((g) => !g);
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-moment]"));
      const tops = sections.map((s) => s.getBoundingClientRect().top + window.scrollY);
      const y = window.scrollY + 4;
      const target =
        e.key === "ArrowRight"
          ? tops.find((top) => top > y + 8)
          : [...tops].reverse().find((top) => top < y - 8);
      if (target === undefined) return;
      e.preventDefault();
      const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: target, behavior: reduce ? "auto" : "smooth" });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const m = moments[active];

  return (
    <>
      <header
        data-theme={theme}
        className={`fixed inset-x-0 top-0 z-50 text-[var(--fg)] transition-colors duration-500 ${solid ? "bg-[var(--bg)]" : "bg-transparent"}`}
        style={{ height: "var(--header-h)" }}
      >
        <div className="pad-x flex h-full items-center justify-between gap-6">
          <a href="#gavea" className="t-label flex items-center gap-2" aria-label="GAVEA × AERA, voltar ao início">
            <span>GAVEA</span>
            <span aria-hidden className="fg-2">×</span>
            <span>AERA</span>
          </a>
          <p className="t-folio flex items-center gap-4" aria-live="polite">
            <span>
              {pad2(active + 1)} · {m.folio}
            </span>
            <span className="fg-2 hidden md:inline">Direction / 2026</span>
          </p>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-px overflow-hidden">
          <div ref={bar} className="h-full origin-left bg-[var(--accent)]" style={{ transform: "scaleX(0)" }} />
        </div>
      </header>

      {grid && (
        <div aria-hidden className="grid-overlay grid-x">
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} className={i >= 8 ? "hidden lg:block" : i >= 4 ? "hidden md:block" : ""} />
          ))}
        </div>
      )}
    </>
  );
}
