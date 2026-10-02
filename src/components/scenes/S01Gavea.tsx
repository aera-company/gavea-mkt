import { copy } from "@/lib/content";
import { clips, stills } from "@/lib/media";
import { Moment } from "@/components/ui/Moment";
import { Photo } from "@/components/ui/Photo";
import { Clip } from "@/components/ui/Clip";
import { GaveaLogo } from "@/components/ui/Marks";

const c = copy.gavea;

/**
 * 01 · A GAVEA real. Contemplation. Real photograph at full bleed, then the
 * real P-35 film in a cinemascope band. PASS 02 adds the slow crop change
 * (rente → horizonte) and the beats swapping with the frame.
 */
export function S01Gavea() {
  return (
    <Moment id="gavea">
      {/* Plate 1: the vessel in Guanabara Bay (gavea-group.com hero). */}
      <div className="relative h-[100svh] min-h-[560px] overflow-hidden">
        <Photo
          still={stills.embarcacaoGuanabara}
          variant="bleed"
          priority
          caption={false}
          sizes="100vw"
          className="absolute inset-0 [&_.media]:h-full [&_.media]:!aspect-auto"
        />
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,18,28,0.55)_0%,rgba(6,18,28,0)_28%,rgba(6,18,28,0)_52%,rgba(6,18,28,0.72)_100%)]" />

        <div className="grid-x absolute inset-x-0 top-[calc(var(--header-h)+24px)]">
          <div className="col-span-4 flex items-center gap-4 md:col-span-6">
            <GaveaLogo tone="white" className="h-4 w-auto md:h-5" />
          </div>
        </div>

        <div className="grid-x absolute inset-x-0 bottom-0 pb-8 md:pb-12">
          <p className="t-label col-span-4 mb-5 md:col-span-8 lg:col-span-12">{c.label}</p>
          <h1 className="t-display col-span-4 md:col-span-8 lg:col-span-10">{c.title}</h1>
          <p className="t-caption col-span-4 mt-6 md:col-span-8 lg:col-span-12">
            {stills.embarcacaoGuanabara.caption}
          </p>
        </div>
      </div>

      {/* Plate 2: the P-35 film. Beats sit beside it, small, like captions. */}
      <div className="grid-x gap-y-8 pt-16 pb-20 md:pt-24 md:pb-28">
        <Clip clip={clips.baia} className="col-span-4 md:col-span-8 lg:col-span-12" aspect="2.39 / 1" />
        <ul className="col-span-4 grid grid-cols-2 gap-x-[var(--gutter)] gap-y-3 md:col-span-8 md:grid-cols-4 lg:col-span-12">
          {c.beats.map((b) => (
            <li key={b} className="t-h3 border-t border-[var(--line)] pt-3">
              {b}
            </li>
          ))}
        </ul>
        <p className="t-h1 balance col-span-4 mt-10 md:col-span-7 md:mt-16 lg:col-span-8">{c.close}</p>
      </div>
    </Moment>
  );
}
