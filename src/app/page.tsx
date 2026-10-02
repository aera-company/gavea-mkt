import { Header } from "@/components/chrome/Header";
import { S01Gavea } from "@/components/scenes/S01Gavea";
import { S02Valor } from "@/components/scenes/S02Valor";
import { S03Direcao } from "@/components/scenes/S03Direcao";
import { S04Camada } from "@/components/scenes/S04Camada";
import { S05DiaADia } from "@/components/scenes/S05DiaADia";
import { S06Marca } from "@/components/scenes/S06Marca";
import { S07Sistema } from "@/components/scenes/S07Sistema";
import { S08Pessoas } from "@/components/scenes/S08Pessoas";
import { S09Continua } from "@/components/scenes/S09Continua";
import { S10Fechamento } from "@/components/scenes/S10Fechamento";

/** Ten moments, PASS 00 architecture. PASS 01: foundation + wireframe. */
export default function Page() {
  return (
    <>
      <Header />
      <main id="main">
        <S01Gavea />
        <S02Valor />
        <S03Direcao />
        <S04Camada />
        <S05DiaADia />
        <S06Marca />
        <S07Sistema />
        <S08Pessoas />
        <S09Continua />
        <S10Fechamento />
      </main>
    </>
  );
}
