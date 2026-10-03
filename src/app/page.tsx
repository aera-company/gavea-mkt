import { Act01Dimensao } from "@/components/acts/Act01Dimensao";
import { A2Posicionamento } from "@/components/acts/A2Posicionamento";
import { A2Oportunidades } from "@/components/acts/A2Oportunidades";
import { A2Inteligencia } from "@/components/acts/A2Inteligencia";
import { A2Direcao } from "@/components/acts/A2Direcao";
import { DirectionRail } from "@/components/acts/DirectionRail";
import { Presenter } from "@/components/acts/Presenter";
import { direcao } from "@/lib/gate";

/**
 * V3.2 · "A próxima dimensão". First gate: Act 01 (Uma nova dimensão) and
 * Act 02 (Direção). Storyboard in ../GAVEA_V3_FINAL_EXPERIENCE.md.
 */
export default function Page() {
  return (
    <main id="main">
      <Act01Dimensao />
      <A2Posicionamento />
      <A2Oportunidades />
      <A2Inteligencia />
      <A2Direcao />
      <footer className="gate-next t-label">
        <span>{direcao.next}</span>
      </footer>
      <DirectionRail />
      <Presenter />
    </main>
  );
}
