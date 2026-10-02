import { copy } from "@/lib/content";
import { clips } from "@/lib/media";
import { Moment } from "@/components/ui/Moment";
import { Clip } from "@/components/ui/Clip";
import { AeraMark, GaveaLogo } from "@/components/ui/Marks";

const c = copy.fechamento;

/**
 * 10 · Fechamento. Silence, image, few words. Back to the real GAVEA: the
 * P-35 crossing Guanabara Bay. No commercial CTA; one quiet line.
 */
export function S10Fechamento() {
  return (
    <Moment id="proxima-camada" className="pt-[calc(var(--header-h)+40px)]">
      <div className="grid-x gap-y-16 pt-16 md:pt-24">
        <p className="t-h2 balance col-span-4 md:col-span-7 lg:col-span-7">{c.one}</p>
        <Clip clip={clips.baia} className="col-span-4 md:col-span-8 lg:col-span-12" aspect="2.39 / 1" caption={false} />
        <p className="t-h2 balance col-span-4 md:col-span-7 lg:col-start-5 lg:col-span-8">{c.two}</p>
      </div>

      <div className="grid-x min-h-[90svh] content-end gap-y-8 pt-32 pb-10 md:pb-14">
        <div className="col-span-4 flex items-center gap-5 md:col-span-8 lg:col-span-12">
          <GaveaLogo tone="white" className="h-5 w-auto md:h-6" />
          <span className="t-h3 fg-2" aria-hidden>
            ×
          </span>
          <AeraMark className="h-[15px] md:h-[19px]" />
        </div>
        <p className="t-display col-span-4 md:col-span-8 lg:col-span-11">{c.sign}</p>
        <div className="col-span-4 flex flex-col gap-3 border-t border-[var(--line)] pt-5 md:col-span-8 md:flex-row md:justify-between lg:col-span-12">
          <span className="t-label fg-2">{c.micro}</span>
          <span className="t-caption">{c.cta}</span>
        </div>
        <p className="t-caption col-span-4 md:col-span-8 lg:col-span-12">
          Fotografia e filme: acervo GAVEA (site, apresentação institucional, filme da P-35). Nenhuma imagem gerada por IA.
        </p>
      </div>
    </Moment>
  );
}
