import { copy } from "@/lib/content";
import { clips, stills } from "@/lib/media";
import { Folio, Moment } from "@/components/ui/Moment";
import { Clip } from "@/components/ui/Clip";
import { Photo } from "@/components/ui/Photo";

const c = copy.pessoas;

/**
 * 08 · Próximo das pessoas. Humanity, no pin. Real people only: the mooring
 * crew at the GAVEA fender (P-35 film), the leadership around a map, the
 * mooring master. Captions name place and function, never people.
 */
export function S08Pessoas() {
  return (
    <Moment id="pessoas" className="pt-[calc(var(--header-h)+40px)] pb-24 md:pb-32">
      <Folio id="pessoas" />

      <div className="grid-x mt-14 md:mt-20">
        <h2 className="t-h1 col-span-4 md:col-span-8 lg:col-span-10">
          {c.title[0]}
          <br />
          {c.title[1]}
        </h2>
      </div>

      <div className="grid-x mt-16 gap-y-10 md:mt-24">
        <Clip clip={clips.defensa} className="col-span-4 md:col-span-8 lg:col-span-7" aspect="2 / 1" />
        <div className="col-span-4 md:col-span-6 lg:col-start-9 lg:col-span-4 lg:self-end">
          <p className="t-h2 balance">{c.lead}</p>
          <p className="t-body fg-2 pretty mt-6">{c.body}</p>
        </div>
      </div>

      <div className="grid-x mt-16 items-end gap-y-8 md:mt-24">
        <Photo still={stills.liderancaReuniao} variant="proof" tilt={-0.8} className="col-span-4 md:col-span-4 lg:col-start-2 lg:col-span-4" />
        <Photo still={stills.mooringSinal} variant="proof" tilt={1.1} className="col-span-2 md:col-span-2 lg:col-start-7 lg:col-span-2" />
        <Photo still={stills.mooringBinoculo} variant="proof" tilt={-1.4} className="col-span-2 md:col-span-2 lg:col-start-10 lg:col-span-2 lg:mb-16" />
      </div>

      <div className="grid-x mt-20 md:mt-28">
        <p className="t-h3 col-span-4 md:col-span-6 lg:col-start-2 lg:col-span-6">{c.with}</p>
      </div>
    </Moment>
  );
}
