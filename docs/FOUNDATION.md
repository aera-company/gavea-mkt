# Foundation · PASS 01

Base visual e técnica da experiência GAVEA × AERA. Decisões vindas do PASS 00 (D1 a D9 adotadas pela recomendação; o Tiago pode reverter qualquer uma).

## Stack

Next 16 (App Router, estático) · React 19 · Tailwind v4 · GSAP + ScrollTrigger (instalado, ainda sem coreografia). Sem Lenis, sem Framer. `turbopack.root` fixado em `next.config.ts`.

## Tokens (`src/app/globals.css`)

| Token | Valor | Uso |
|---|---|---|
| `--paper` | `#EDEEEB` | fundo predominante |
| `--paper-2` | `#E1E4E2` | a mesa (tema `table`) |
| `--rule` | `#C6CBCA` | hairlines |
| `--stone` | `#8B9497` | só fios e não texto (2,7:1) |
| `--slate` | `#56636A` | texto secundário (5,3:1) |
| `--ink` | `#081E2F` | navy oficial do logo |
| `--night` | `#06121C` | momentos de filme (tema `film`) |
| `--signal` | `#006B90` | azul oficial do swoosh (5,1:1 no papel) |
| `--signal-on-dark` | `#B4E3F9` | azul claro oficial (13,8:1 na noite) |

Temas por momento via `data-theme` (`paper` · `film` · `table`), que redefinem `--bg`, `--fg`, `--fg-2`, `--line`, `--accent`.
O azul aparece só onde algo ganha direção: linha da direção, camada AERA, traço de seleção, itens que aguardam decisão, progresso do header.

## Tipografia

Mona Sans (variável, wght + **wdth 75–125**) + IBM Plex Mono 400/500. Sentence case; caps só em labels mono pequenos (tracking 0,06em).

| Classe | Tamanho | Notas |
|---|---|---|
| `.t-display` | clamp(56, 11vw, 200) | uma frase por ato |
| `.t-h1` | clamp(42, 6,4vw, 120) | |
| `.t-h2` | clamp(32, 4vw, 72) | |
| `.t-h3` | clamp(22, 2vw, 34) | frase editorial |
| `.t-body` | clamp(16, 1,15vw, 19) | máx. 6 colunas |
| `.t-word` | clamp(22, 2,6vw, 44), **wdth 82** | palavras do ecossistema, nomes de unidades (eco do logo condensado) |
| `.t-caption` | 11,5 mono | legenda documental: lugar · função |
| `.t-label` | 11 mono caps | rótulos de sistema |
| `.t-folio` | 11 mono tabular | índices |

## Grid

`.grid-x`: 4 colunas (< 768, margem 20, gutter 16) · 8 (768–1023, margem 32, gutter 20) · 12 (≥ 1024, margem 40 → clamp(48, 4,5vw, 88) a partir de 1280, gutter 24). Tecla **G** mostra a grade.

## Header

Fixo, 52/56 px. `GAVEA × AERA` à esquerda; folio do momento + `Direction / 2026` à direita; linha de progresso de 1 px em `--accent`. Transparente sobre a foto de abertura, sólido (cor do tema) depois. Teclas **← →** pulam entre momentos (para apresentar ao vivo).

## Mídia

- `Photo`: `frame`, `bleed` (com grão) e `proof` (prova física para fontes de baixa resolução).
- `Clip`: vídeo mudo em loop, toca só visível; com reduced motion não toca sozinho e mostra "Reproduzir".
- Legendas: lugar e função, nunca nome de pessoa.

## Regras de motion

Quatro verbos: **recortar** (clip-path), **organizar** (Flip do disperso à grade), **desenhar** (stroke de hairlines e do traço de seleção), **subir** (escala/enquadramento no scroll).
Curva única de entrada `cubic-bezier(0.16, 1, 0.3, 1)`, 0,9 s / 1,4 s. Scrub linear nos pins. No máximo 4 pins (01 curto, 03, 04, 06) e nunca dois seguidos sem respiro.

Motion progressivo: o script de boot põe `html.motion` antes do primeiro paint só quando motion é permitido; estados iniciais vivem sob `html.motion`. Sem JS, com reduced motion ou em falha (3 s sem `window.__motionReady`), tudo aparece no estado final. A cena 03 mostra antes e depois lado a lado nesse caso.
Infra: `src/components/motion/gsap.ts` + `useGsapContext.ts` (matchMedia por cena, revert automático).

## QA

```bash
node scripts/qa/shots.mjs http://localhost:3051 docs/qa/pass-01/desktop 1440
node scripts/qa/shots.mjs http://localhost:3051 docs/qa/pass-01/mobile 390 mobile
node scripts/qa/shots.mjs http://localhost:3051 docs/qa/pass-01/reduced 1440 desktop reduce
```
Launch: `../.claude/launch.json` (`gavea-dev` 3050, `gavea-prod` 3051).
