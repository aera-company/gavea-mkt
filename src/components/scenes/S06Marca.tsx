import { copy } from "@/lib/content";
import { Folio, Moment } from "@/components/ui/Moment";
import { SelectionStroke } from "@/components/ui/SelectionStroke";

const c = copy.marca;

/* Physical proportions of each application on the art director's table. */
const formats: Record<string, { ratio: string; cls: string; tilt: number }> = {
  deck: { ratio: "16 / 9", cls: "lg:col-start-1 lg:col-span-6", tilt: -0.6 },
  arquitetura: { ratio: "3 / 2", cls: "lg:col-start-8 lg:col-span-4 lg:mt-16", tilt: 0.9 },
  linkedin: { ratio: "3 / 1", cls: "lg:col-start-2 lg:col-span-5 lg:mt-4", tilt: 0.4 },
  representada: { ratio: "3 / 4", cls: "lg:col-start-8 lg:col-span-3 lg:-mt-10", tilt: -1.1 },
  feira: { ratio: "21 / 9", cls: "lg:col-start-1 lg:col-span-7 lg:mt-6", tilt: 0.5 },
};

/**
 * 06 · Brand direction (brief scenes 08 + 09). Desire, the longest pin.
 * PASS 01 lays out the table; the applications themselves are built in
 * HTML/CSS in PASS 04 (live type, real photos, official logos untouched).
 */
export function S06Marca() {
  return (
    <Moment id="marca" className="pt-[calc(var(--header-h)+40px)] pb-24 md:pb-32">
      <Folio id="marca" />

      <div className="grid-x mt-14 gap-y-6 md:mt-20">
        <p className="t-label col-span-4 md:col-span-8 lg:col-span-12">{c.label}</p>
        <h2 className="t-h1 balance col-span-4 md:col-span-8 lg:col-span-10">{c.title}</h2>
      </div>

      {/* The table */}
      <div className="grid-x mt-16 items-start gap-y-12 md:mt-24">
        {c.applications.map((a, i) => {
          const f = formats[a.id];
          return (
            <figure key={a.id} className={`relative col-span-4 md:col-span-4 ${f.cls}`} style={{ rotate: `${f.tilt}deg` }}>
              <div className="relative">
                <div
                  className="crop-marks flex items-end bg-[var(--paper)] p-4 shadow-[0_18px_30px_-26px_rgba(8,30,47,0.6)]"
                  style={{ aspectRatio: f.ratio }}
                >
                  <span className="t-caption">Aplicação {String(i + 1).padStart(2, "0")} · PASS 04</span>
                </div>
                {a.id === "arquitetura" && <SelectionStroke className="-left-[6%] -top-[12%] h-[124%] w-[112%]" />}
              </div>
              <figcaption className="mt-4 flex items-baseline justify-between gap-4">
                <span className="t-word" style={{ fontSize: "clamp(17px, 1.3vw, 21px)" }}>
                  {a.name}
                </span>
                <span className="t-caption text-right">{a.format}</span>
              </figcaption>
            </figure>
          );
        })}
      </div>

      {/* The system under the pieces */}
      <div className="grid-x mt-24 gap-y-10 md:mt-36">
        <h3 className="t-h1 col-span-4 md:col-span-8 lg:col-span-7">
          {c.system[0]}
          <br />
          <span className="fg-2">{c.system[1]}</span>
        </h3>
        <ol className="col-span-4 grid grid-cols-2 gap-x-[var(--gutter)] md:col-span-8 md:grid-cols-4 lg:col-start-9 lg:col-span-4 lg:grid-cols-2 lg:self-end">
          {c.layers.map((l, i) => (
            <li key={l} className="flex items-baseline gap-3 border-t border-[var(--line)] py-2.5">
              <span className="t-folio fg-2">{String(i + 1).padStart(2, "0")}</span>
              <span className="t-body">{l}</span>
            </li>
          ))}
        </ol>
      </div>
    </Moment>
  );
}
