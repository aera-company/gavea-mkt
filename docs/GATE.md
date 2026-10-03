# V3.2 · primeiro gate (Ato 01 + Ato 02)

Storyboard: `../../GAVEA_V3_FINAL_EXPERIENCE.md` §3 (01.0–02.4). Assets: `../../assets-v2/generated/round-03-v4/` (escolhas do Tiago: linha d'água A, cais B).

## Arquivos

| O quê | Onde |
|---|---|
| Copy, mídia, posições das palavras | `src/lib/gate.ts` |
| Ato 01 (um pin, ~560vh desktop / 430vh retrato) | `src/components/acts/Act01Dimensao.tsx` |
| 02.1 Posicionamento · 02.2 Oportunidades · 02.3 Inteligência · 02.4 Uma direção | `src/components/acts/A2*.tsx` |
| Linha de direção (fixa, `mix-blend-mode: difference`) | `DirectionRail.tsx`; nasce no fim do Ato 01, some ao sair do 02.4 |
| Modo apresentação | `Presenter.tsx` + `motion/presenter.ts` (cada cena registra seus pontos de repouso) |
| Helpers de cena (pin, rise/sink com máscara) | `src/components/acts/scene.ts` |
| Mídia | `scripts/assets/build-gate.py` → `public/media/gate/` |
| QA | `scripts/qa/gate.mjs` → `docs/qa/gate/{desktop,mobile,reduced}` |

## Notas técnicas

- O desenho da P-35 é alinhado à foto por cinco pontos de referência (`LANDMARKS` em `build-gate.py`, resíduo ~5 px) e repintado nas cores da página.
- Sem motion, cada cena mostra o quadro final (02.x) ou a edição estática (`.a1-static`).
- Peso: desktop ~11,6 MB (quadros P-35 5,1 + mar 4,9 + imagens ~1,6); retrato ~6 MB. O mar só começa a carregar depois da P-35.
- 19 pontos de repouso; PageDown/→/espaço avançam, PageUp/← voltam; roda do mouse ou toque cancelam a viagem.
- O Movimento 01 da V3.1 está arquivado em `../../archive/v3.1-m01/` (fora do repositório).
