import { copy } from "@/lib/content";
import { stills } from "@/lib/media";
import { Folio, Moment } from "@/components/ui/Moment";
import { Photo } from "@/components/ui/Photo";

const c = copy.valor;

/* The real GAVEA as proofs on the table: low-res sources at physical size.
   Placement is deliberate and uneven (desktop); a plain two-up flow on mobile. */
const table = [
  { still: stills.mooringBinoculo, cls: "lg:col-start-1 lg:col-span-3 lg:mt-0", tilt: -1.2 },
  { still: stills.frotaGuindaste, cls: "lg:col-start-5 lg:col-span-3 lg:mt-24", tilt: 0.8 },
  { still: stills.engenhariaCasco, cls: "lg:col-start-9 lg:col-span-2 lg:mt-6", tilt: -0.6 },
  { still: stills.roroOperador, cls: "lg:col-start-11 lg:col-span-2 lg:mt-40", tilt: 1.4 },
  { still: stills.barcacaBobinas, cls: "lg:col-start-2 lg:col-span-3 lg:mt-10", tilt: 0.5 },
  { still: stills.engenhariaColete, cls: "lg:col-start-6 lg:col-span-2 lg:-mt-6", tilt: -1.6 },
  { still: stills.caisNoturno, cls: "lg:col-start-9 lg:col-span-3 lg:mt-12", tilt: 0.7 },
];

/**
 * 02 · O valor já existe. Light tension. PASS 02: the proofs drift apart and
 * lose alignment as "Nem sempre ele é percebido." enters (fragmentation, not
 * failure). No current communication pieces are shown (decision D3).
 */
export function S02Valor() {
  return (
    <Moment id="valor" className="pt-[calc(var(--header-h)+40px)] pb-24 md:pb-32">
      <Folio id="valor" />

      <div className="grid-x mt-14 md:mt-20">
        <h2 className="t-h1 col-span-4 md:col-span-8 lg:col-span-9">{c.title}</h2>
      </div>

      <div className="grid-x mt-14 items-start gap-y-8 md:mt-20">
        {table.map(({ still, cls, tilt }) => (
          <Photo
            key={still.src}
            still={still}
            variant="proof"
            tilt={tilt}
            className={`col-span-2 md:col-span-4 ${cls}`}
          />
        ))}
      </div>

      <div className="grid-x mt-20 gap-y-6 md:mt-28">
        <h3 className="t-h2 col-span-4 md:col-span-6 lg:col-start-1 lg:col-span-6">{c.turn}</h3>
        <p className="t-body fg-2 pretty col-span-4 md:col-span-5 lg:col-start-8 lg:col-span-4 lg:pt-3">{c.body}</p>
      </div>

      <div className="grid-x mt-20 md:mt-28">
        <p className="t-h2 balance col-span-4 md:col-span-7 lg:col-start-4 lg:col-span-8">{c.close}</p>
      </div>
    </Moment>
  );
}
