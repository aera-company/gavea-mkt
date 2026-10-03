import { rail } from "@/lib/gate";

/**
 * The direction line: one hairline and one word, fixed to the left margin.
 * It is born when "direção" leaves the closing line of Act 01 and runs
 * through all of Act 02; the scenes animate it (it starts hidden under
 * html.motion and never shows without motion).
 */
export function DirectionRail() {
  return (
    <div className="rail" aria-hidden="true">
      <span className="rail-line" />
      <span className="rail-label">{rail.label}</span>
    </div>
  );
}
