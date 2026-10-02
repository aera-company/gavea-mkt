import { copy } from "@/lib/content";
import { clips } from "@/lib/media";
import { Folio, Moment } from "@/components/ui/Moment";
import { Clip } from "@/components/ui/Clip";
import { AeraMark, GaveaLogo } from "@/components/ui/Marks";

const c = copy.camada;

/**
 * 04 · A nova camada (brief scenes 04 + 05). Clarity. One diagram, three
 * tiers: GAVEA → the AERA layer (its six fronts are its anatomy) → the
 * ecosystem that keeps executing. PASS 03 draws the connections and lets each
 * front light up in turn while the lines to the ecosystem change weight.
 * AERA sits between, never above the agency: the lines run through it.
 */
export function S04Camada() {
  return (
    <Moment id="camada" className="pt-[calc(var(--header-h)+40px)] pb-24 md:pb-32">
      <Folio id="camada" />

      <div className="grid-x mt-20 gap-y-10 md:mt-28">
        <div className="col-span-4 md:col-span-8 lg:col-span-9">
          <p className="t-label mb-6 flex items-center gap-3">
            <AeraMark className="h-[11px]" />
            <span className="fg-2">×</span>
            <span>GAVEA</span>
          </p>
          <h2 className="t-display">
            {c.title[0]}
            <br />
            {c.title[1]}
          </h2>
        </div>
        <p className="t-h3 pretty col-span-4 md:col-span-6 lg:col-start-1 lg:col-span-6">{c.body}</p>

        {/* The gávea: the view from above. */}
        <figure className="col-span-4 md:col-span-4 md:col-start-5 lg:col-start-9 lg:col-span-4 lg:row-span-2 lg:self-end">
          <Clip clip={clips.zenital} aspect="2.39 / 1" caption={false} />
          <figcaption className="t-caption mt-3 border-t border-[var(--line)] pt-3">{c.note}</figcaption>
        </figure>
      </div>

      {/* Diagram */}
      <div className="pad-x mt-24 md:mt-32">
        <div className="rule" />
        {/* Tier 1 */}
        <div className="flex items-center justify-between py-6">
          <span className="t-label fg-2">Negócio</span>
          <GaveaLogo className="h-5 w-auto md:h-7" />
          <span className="t-label fg-2 invisible md:visible">Direção</span>
        </div>
        <div className="flex justify-center" aria-hidden>
          <span className="h-12 w-px bg-[var(--accent)]" />
        </div>

        {/* Tier 2: the AERA layer */}
        <div className="border-y border-[var(--accent)] py-6">
          <div className="mb-6 flex items-baseline justify-between">
            <AeraMark className="h-[12px] text-[var(--accent)]" />
            <span className="t-label accent">Direção & Gerência de Marketing</span>
          </div>
          <ol className="grid grid-cols-2 gap-x-[var(--gutter)] gap-y-8 md:grid-cols-3 lg:grid-cols-6">
            {c.fronts.map((f, i) => (
              <li key={f.name} className="border-t border-[var(--line)] pt-3">
                <span className="t-folio fg-2">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="t-word mt-2" style={{ fontSize: "clamp(20px, 1.6vw, 26px)" }}>
                  {f.name}
                </h3>
                <ul className="t-caption mt-3 space-y-1">
                  {f.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>

        {/* Tier 3: the ecosystem */}
        <div className="grid grid-cols-5" aria-hidden>
          {c.ecosystem.map((e) => (
            <span key={e} className="flex justify-center">
              <span className="h-12 w-px bg-[var(--line)]" />
            </span>
          ))}
        </div>
        <ul className="grid grid-cols-2 gap-y-6 md:grid-cols-5">
          {c.ecosystem.map((e) => (
            <li key={e} className="t-word text-center" style={{ fontSize: "clamp(18px, 1.5vw, 24px)" }}>
              {e}
            </li>
          ))}
        </ul>
      </div>

      <div className="grid-x mt-24 md:mt-32">
        <p className="t-h2 balance col-span-4 md:col-span-7 lg:col-start-4 lg:col-span-8">{c.system}</p>
      </div>
    </Moment>
  );
}
