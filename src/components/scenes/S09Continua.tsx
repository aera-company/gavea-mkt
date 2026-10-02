import { copy } from "@/lib/content";
import { Folio, Moment } from "@/components/ui/Moment";

const c = copy.continua;

/**
 * 09 · O que continua. Silence. Two columns, no table: what stays stays in
 * place; the new layer forms beside it. PASS 06: "Evolui" builds line by line
 * next to a "Continua" that never moves.
 */
export function S09Continua() {
  return (
    <Moment id="continua" className="pt-[calc(var(--header-h)+40px)] pb-24 md:pb-32">
      <Folio id="continua" />

      <div className="grid-x mt-16 gap-y-12 md:mt-24">
        {[c.keeps, c.grows].map((col, k) => (
          <div key={col.label} className={`col-span-2 md:col-span-4 ${k === 0 ? "lg:col-start-2 lg:col-span-4" : "lg:col-start-7 lg:col-span-4"}`}>
            <p className={`t-label border-b pb-3 ${k === 1 ? "accent border-[var(--accent)]" : "fg-2 border-[var(--line)]"}`}>{col.label}</p>
            <ul className="mt-4 space-y-1.5">
              {col.items.map((it) => (
                <li key={it} className="t-h3">
                  {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="grid-x mt-24 md:mt-36">
        <p className="t-display col-span-4 md:col-span-8 lg:col-span-11">
          {c.title[0]}
          <br />
          {c.title[1]}
        </p>
      </div>
    </Moment>
  );
}
