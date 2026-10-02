/**
 * The director's mark: a hand-drawn loop in GAVEA blue that circles what was
 * chosen. One per moment at most. Path is deliberately uneven (controlled
 * imperfection). Drawn on by the "draw" verb when motion is allowed.
 */
export function SelectionStroke({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 400 160"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute overflow-visible ${className}`}
      data-draw
    >
      <path
        d="M214 14 C 120 8, 22 30, 14 78 C 8 122, 110 150, 214 146 C 318 142, 392 118, 386 72 C 381 34, 300 10, 196 18 C 170 20, 150 24, 132 30"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="2"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        pathLength={1}
      />
    </svg>
  );
}
