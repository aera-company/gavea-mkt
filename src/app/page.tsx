import { Act01Dimensao } from "@/components/acts/Act01Dimensao";
import { A2Posicionamento } from "@/components/acts/A2Posicionamento";
import { A2Oportunidades } from "@/components/acts/A2Oportunidades";
import { A2Inteligencia } from "@/components/acts/A2Inteligencia";
import { A2Direcao } from "@/components/acts/A2Direcao";
import { A3Entra, A3Modelo, A3Time } from "@/components/acts/A3Aera";
import { A4Trade } from "@/components/acts/A4Trade";
import { A5Fechamento, A5Futuro, A5Marca, A5Marketing } from "@/components/acts/A5Nova";
import { DirectionRail } from "@/components/acts/DirectionRail";
import { Presenter } from "@/components/acts/Presenter";

/**
 * V3.2 · "A próxima dimensão". Act 01 (Uma nova dimensão), Act 02 (Direção),
 * Act 03 (AERA entra), Act 04 (prova: Gavea Trade) and Act 05 (marca,
 * marketing, futuro, fechamento). Storyboard in ../GAVEA_V3_FINAL_EXPERIENCE.md
 * and ../Human Team/Campanhas/2026-10-04-gavea-proxima-dimensao.
 */
export default function Page() {
  return (
    <main id="main">
      <Act01Dimensao />
      <A2Posicionamento />
      <A2Oportunidades />
      <A2Inteligencia />
      <A2Direcao />
      <A3Entra />
      <A3Modelo />
      <A3Time />
      <A4Trade />
      <A5Marca />
      <A5Marketing />
      <A5Futuro />
      <A5Fechamento />
      <DirectionRail />
      <Presenter />
    </main>
  );
}
