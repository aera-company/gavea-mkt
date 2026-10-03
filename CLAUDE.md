# GAVEA × AERA · Direção & Gerência de Marketing

Brand experience para a direção da GAVEA. Brief mestre: `../GAVEA_AERA_DIRECAO_MARKETING_MASTER_BRIEF_V01.md`. Desde 02/10 vale a **Redirection V2** (5 atos, proof of vision); auditoria R0 em `../GAVEA_MKT_REDIRECTION_ASSET_AUDIT.md`, pedidos de asset em `../ASSET_REQUESTS.md`. Trabalho em passes; **não avançar de pass sem aprovação do Tiago**. Desde 03/10 vale a **V3.2 "A próxima dimensão"** (`../GAVEA_V3_FINAL_EXPERIENCE.md`, assets em `../ASSET_REQUESTS_V4.md`). Estado: primeiro gate (Ato 01 + Ato 02) construído (`docs/GATE.md`), aguardando avaliação. O Movimento 01 da V3.1 foi reprovado e está em `../archive/v3.1-m01/`.

## Regras que não mudam

- **Três camadas de asset (V2):** A real GAVEA, B premium AERA, C gerado no Magnific (`../assets-v2/`). Gerado precisa passar no teste "does it look human?". Pessoas geradas só anônimas, sem uniforme nem marca GAVEA. Material real sempre rotulado como real.
- Não inventar fatos da GAVEA (P-35, clientes, números). Conteúdo conceitual sempre marcado.
- Copy: sentence case, **sem travessão (—)**. Português na experiência; inglês só como camada editorial (`GAVEA / 2027`). Copy da V3.2 em `src/lib/gate.ts`; a da V1 segue em `src/lib/content.ts` como referência.
- Legendas por lugar e função, nunca nome de pessoa.
- Sem cards arredondados, glow, gradiente decorativo, glass, ícones, gráficos, números animados.
- O azul GAVEA (`--signal`) só onde algo ganha direção.
- Git/Vercel só com ordem do Tiago. Esta pasta está dentro do git acidental da HOME: nunca commitar daqui sem criar repo próprio.

## Estrutura

- `src/app/` layout (fontes, boot de motion), `globals.css` (tokens, tipo, grid, motion).
- `src/lib/content.ts` copy e momentos · `src/lib/media.ts` registro de mídia real.
- `src/components/acts/` um arquivo por cena da V3.2 (+ rail e apresentação) · `film/` leitor de quadros · `scenes/S01…S10` e `chrome/Header` são da V1, fora da página · `ui/` · `motion/` GSAP.
- `scripts/assets/` preparo de mídia (lê a pasta-mãe, grava em `public/media`; `build-gate.py` gera a mídia do gate) · `scripts/qa/` capturas CDP (`gate.mjs`).
- Fundação documentada em `docs/FOUNDATION.md`.

## Comandos

`npm run dev` · `npm run build` · `npm start` · `npm run lint` · `npm run typecheck`. Preview pelo `../.claude/launch.json` (3050 dev, 3051 prod).
Nunca copiar `.next/` de outro projeto.
