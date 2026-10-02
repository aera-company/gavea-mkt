import { copy } from "@/lib/content";
import { Folio, Moment } from "@/components/ui/Moment";

const c = copy.direcao;

/* Scattered state: each word at its own position, size, width and angle,
   like voices working in their own rhythm. Percentages of the field. */
const scatter = [
  { x: 6, y: 10, s: 1.15, w: 92, r: -3 },
  { x: 58, y: 4, s: 0.85, w: 78, r: 2 },
  { x: 30, y: 30, s: 1.3, w: 100, r: 0 },
  { x: 74, y: 26, s: 0.95, w: 88, r: -2 },
  { x: 2, y: 52, s: 0.9, w: 80, r: 4 },
  { x: 46, y: 50, s: 0.75, w: 75, r: -5 },
  { x: 80, y: 56, s: 1.05, w: 96, r: 1.5 },
  { x: 18, y: 76, s: 0.8, w: 84, r: 3 },
  { x: 54, y: 72, s: 1.2, w: 90, r: -1 },
  { x: 36, y: 90, s: 0.9, w: 78, r: 2 },
  { x: 78, y: 86, s: 0.85, w: 100, r: -3 },
];

/**
 * 03 · Do disperso à direção. Tension → clarity. PASS 02 pins this field and
 * moves each word from its scattered spot onto the grid (GSAP Flip), one at a
 * time; when the last one lands, a blue hairline crosses them all.
 * Without motion both states stay visible: before, then after.
 */
export function S03Direcao() {
  return (
    <Moment id="direcao" className="pt-[calc(var(--header-h)+40px)] pb-24 md:pb-32">
      <Folio id="direcao" />

      <div className="grid-x mt-14 gap-y-8 md:mt-20">
        <h2 className="t-h1 balance col-span-4 md:col-span-8 lg:col-span-9">{c.title}</h2>
        <p className="t-h2 fg-2 balance col-span-4 md:col-span-7 lg:col-start-4 lg:col-span-8">{c.turn}</p>
      </div>

      {/* Before: scattered. */}
      <div className="pad-x mt-16 md:mt-24">
        <div className="scatter-field relative h-[70svh] min-h-[420px] max-h-[760px]" data-field="scatter">
          {c.words.map((word, i) => {
            const p = scatter[i];
            return (
              <span
                key={word}
                className="t-word absolute whitespace-nowrap"
                style={{
                  left: `calc(${p.x}% * var(--spread))`,
                  top: `${p.y}%`,
                  fontSize: `calc(clamp(22px, 2.6vw, 44px) * ${p.s})`,
                  fontStretch: `${p.w}%`,
                  rotate: `${p.r}deg`,
                }}
              >
                {word}
              </span>
            );
          })}
        </div>
      </div>

      {/* After: the same words on the grid, one direction line across them. */}
      <div className="grid-x relative mt-10 gap-y-4 md:mt-16" data-field="grid">
        {c.words.map((word, i) => (
          <span
            key={word}
            className="t-word col-span-2 border-t border-[var(--line)] pt-3 md:col-span-2 lg:col-span-3"
          >
            <span className="t-folio fg-2 mb-2 block">{String(i + 1).padStart(2, "0")}</span>
            {word}
          </span>
        ))}
        <span aria-hidden className="col-span-4 mt-6 h-px bg-[var(--accent)] md:col-span-8 lg:col-span-12" />
      </div>

      <div className="grid-x mt-20 gap-y-4 md:mt-28">
        {c.body.map((line, i) => (
          <p
            key={line}
            className={`t-h3 pretty col-span-4 md:col-span-6 ${i === 0 ? "lg:col-start-1 lg:col-span-5" : "lg:col-start-7 lg:col-span-5"}`}
          >
            {line}
          </p>
        ))}
      </div>

      <div className="grid-x mt-24 md:mt-36">
        <p className="t-display col-span-4 md:col-span-8 lg:col-span-11">{c.close}</p>
      </div>
    </Moment>
  );
}
