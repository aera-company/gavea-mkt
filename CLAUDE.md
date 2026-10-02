# GAVEA × AERA · Direção & Gerência de Marketing

One-page de apresentação para a direção da GAVEA. Brief mestre: `../GAVEA_AERA_DIRECAO_MARKETING_MASTER_BRIEF_V01.md`. Interpretação e decisões: `../GAVEA_AERA_PASS00_AUDIT.md`. Trabalho em passes; **não avançar de pass sem aprovação do Tiago**.

## Regras que não mudam

- **Só material real da GAVEA.** Nenhuma imagem de IA (pessoas, contêineres, marca GAVEA aplicada). Assets e recortes em `docs/ASSETS.md`.
- Não inventar fatos da GAVEA (P-35, clientes, números). Conteúdo conceitual sempre marcado.
- Copy: sentence case, **sem travessão (—)**, PT na página, EN só em rótulos de sistema. Toda copy em `src/lib/content.ts`.
- Legendas por lugar e função, nunca nome de pessoa.
- Sem cards arredondados, glow, gradiente decorativo, glass, ícones, gráficos, números animados.
- O azul GAVEA (`--signal`) só onde algo ganha direção.
- Git/Vercel só com ordem do Tiago. Esta pasta está dentro do git acidental da HOME: nunca commitar daqui sem criar repo próprio.

## Estrutura

- `src/app/` layout (fontes, boot de motion), `globals.css` (tokens, tipo, grid, motion).
- `src/lib/content.ts` copy e momentos · `src/lib/media.ts` registro de mídia real.
- `src/components/scenes/S01…S10` um arquivo por momento · `ui/` Moment, Photo, Clip, Marks, SelectionStroke · `chrome/Header` · `motion/` GSAP.
- `scripts/assets/` preparo de mídia (lê a pasta-mãe, grava em `public/media`) · `scripts/qa/` capturas CDP.
- Fundação documentada em `docs/FOUNDATION.md`.

## Comandos

`npm run dev` · `npm run build` · `npm start` · `npm run lint` · `npm run typecheck`. Preview pelo `../.claude/launch.json` (3050 dev, 3051 prod).
Nunca copiar `.next/` de outro projeto.
