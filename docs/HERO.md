# Hero · ACT 01 · The shift (PASS R1)

Redirection V2, conceito "Do aço ao horizonte" (`../GAVEA_MKT_REDIRECTION_ASSET_AUDIT.md` §4, fora do repo).
Só o herói. A página termina nele até o gate ser aprovado.

## Arquivos

- `src/components/hero/Hero.tsx`: palco pinado, timeline GSAP, edição estática.
- `src/components/hero/frameSequence.ts`: sequência de quadros em canvas 2D, carregamento priorizado.
- `src/lib/hero.ts`: copy (EN no herói, decisão R-2), rótulos da montagem, capítulos.
- `scripts/assets/build-hero.py`: gera `public/media/hero/` a partir de `../assets-v2/generated/round-01`, da foto Green Tech e do clipe da P-35.
- `scripts/qa/hero.mjs`: capturas nos pontos da timeline.

## Timeline (progresso p do trecho pinado)

| p | Quadro | O que acontece |
|---|---|---|
| 0–0,05 | F00 | preto, `GAVEA / 2027`, um fio cresce |
| 0,05–0,20 | F01 | o filme abre de uma fresta; macro do aço (quadros 0–40); "The business / has evolved." |
| 0,20–0,36 | F02 | recuo até o dique (40–121); P-35 real em P&B atravessa em outro plano; "The brand / should too." |
| 0,36–0,66 | F03 | montagem de 6 planos (122–241) com cortes em movimento; contador e rótulo por plano |
| 0,66–0,84 | F04 | Business. Brand. Commercial. Intelligence. Letra clara com a imagem do plano como textura, eixo wdth 75 → 125 |
| 0,84–0,90 | F05 | papel, silêncio |
| 0,90–1 | F06 | marca AERA × GAVEA, "Building / what's next.", fio azul |

Pin: 360vh no desktop, 290vh em retrato (`max-aspect-ratio: 4/5`). Scrub 0,6 s.

## Mídia

| Sequência | Quadros | Peso |
|---|---|---|
| Desktop 1920×1080 WebP | 242 | 17,3 MB |
| Retrato 720×1280 WebP (um a cada dois) | 121 | 3,9 MB |
| Palavras (4 stills) + P-35 P&B | | 1,3 MB |

Grão em CSS (não fica no WebP). Os 42 primeiros quadros carregam primeiro, depois um a cada quatro, depois o resto.
No retrato, a P-35 real entra como faixa sobre o escuro (fonte de 848 px).

## Sem motion

Reduced motion ou sem JS: o palco some e entram cinco quadros estáticos (F01, F02, P-35 real, as quatro palavras, o reveal).

## Pendências conhecidas (para R6 e R7)

- AVIF e quadros menores para conexão lenta; hoje o desktop puxa cerca de 17 MB.
- A P-35 real no desktop aparece em tela cheia por 20 quadros e mostra a resolução de origem.
