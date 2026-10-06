/**
 * V3.2 · "A próxima dimensão". Copy and media for the first gate:
 * Act 01 (Uma nova dimensão) and Act 02 (Direção). Storyboard in
 * ../GAVEA_V3_FINAL_EXPERIENCE.md. Client-facing copy in Portuguese,
 * sentence case, titles end with a full stop, no em dashes.
 * Media written by scripts/assets/build-gate.py into /media/gate.
 */

const M = "/media/gate";

export const act01 = {
  mark: "GAVEA",
  t1: "Novos projetos.",
  t2: "Novas responsabilidades.",
  /** the closing line is built from these pieces so "direção" can leave on its own */
  head: { l1: "Uma nova dimensão", l2a: "pede uma nova ", word: "direção", l2b: "." },
  /**
   * The hero film (GW-T1 v4, scope 2.39:1, 19.1 s, no titles burned in): macro of the
   * hull pulling back to the P-35, the quay crew, the dive along the hull into the dark.
   * Scroll-driven frame sequence (every other frame of the 24 fps master from frame 10 = 225 frames),
   * written by scripts/assets/build-hero.sh. Titles are HTML, cued on film frames.
   */
  film: {
    frames: { d: { dir: "/media/hero/d", count: 225, step: 1 }, m: { dir: "/media/hero/m", count: 225, step: 1 } },
    poster: "/media/hero/poster.webp",
    cues: { t1: [62, 97], t2: [115, 144], l1: 175 },
    stills: {
      p35: "/media/hero/still-p35.webp",
      cais: "/media/hero/still-cais.webp",
      deep: "/media/hero/still-deep.webp",
    },
  },
  alts: {
    film: "Do aço do casco ao navio inteiro: a P-35 na baía. Depois, a equipe na defensa de um cais e a câmera descendo pelo casco abaixo da linha d'água até o escuro.",
    p35: "A P-35 de través na Baía de Guanabara, com o Pão de Açúcar ao fundo.",
    cais: "Equipe de colete laranja junto à defensa, ao lado de um casco enorme e enferrujado.",
    deep: "O casco continua abaixo da linha d'água, no azul que escurece.",
  },
} as const;

export const rail = { label: "Direção" } as const;

export const posicionamento = {
  title: "Posicionamento.",
  lines: ["O valor existe.", "A percepção precisa acompanhar."],
  img: { d: `${M}/costado-d.webp`, m: `${M}/costado-m.webp` },
  alt: "Costado de um navio em mar aberto, com dois tripulantes pequenos no convés.",
} as const;

export const oportunidades = {
  title: "Oportunidades.",
  parts: ["Marketing conectado à estratégia,", "ao comercial", "e às oportunidades do negócio."],
  strip: [
    { src: `${M}/strip/0`, alt: "Costura do anel MERUS, em macro, com gotas de água." },
    { src: `${M}/strip/1`, alt: "Robô de inspeção com duas luzes dentro de um túnel industrial." },
    { src: `${M}/strip/2`, alt: "Aperto de mão no cais; ao fundo, um módulo industrial sendo içado." },
    { src: `${M}/strip/3`, alt: "Luva de trabalho guiando o gancho de um guindaste." },
    { src: `${M}/strip/4`, alt: "Estande de feira offshore, ainda vazio, antes da abertura." },
  ],
  /** the three frames the portrait edit keeps, one per part of the sentence */
  portrait: [0, 2, 4],
} as const;

export const inteligencia = {
  title: "Uma nova camada de inteligência.",
  steps: [
    "Conectar informações.",
    "Organizar tarefas.",
    "Criar metodologia.",
    "Transformar conhecimento em decisões melhores.",
  ],
  photo: `${M}/p35-photo.webp`,
  drawing: `${M}/p35-drawing.webp`,
  alt: "A P-35 em mar aberto; sobre a foto desce o mesmo navio em desenho técnico.",
  /**
   * The scattered information of a working day, in the order the column
   * later puts it. x/y in % of the stage; `m` marks the six the portrait keeps.
   */
  words: [
    { w: "e-mail", x: 16, y: 50, mx: 22, my: 48, m: true },
    { w: "WhatsApp", x: 10, y: 80, mx: 24, my: 84, m: true },
    { w: "planilha", x: 33, y: 68, mx: 70, my: 56, m: true },
    { w: "fornecedor", x: 40, y: 42, mx: 0, my: 0, m: false },
    { w: "cotação", x: 54, y: 56, mx: 32, my: 66, m: true },
    { w: "medição", x: 82, y: 84, mx: 0, my: 0, m: false },
    { w: "proposta", x: 70, y: 36, mx: 72, my: 74, m: true },
    { w: "contrato", x: 86, y: 56, mx: 0, my: 0, m: false },
    { w: "relatório", x: 60, y: 80, mx: 66, my: 92, m: true },
  ],
  /** pairs of word indexes joined in "Conectar informações." */
  links: [
    [0, 3], [3, 4], [4, 6], [6, 7], [4, 8], [2, 8], [1, 2], [0, 2], [7, 5], [8, 5], [3, 2], [0, 1],
  ],
} as const;

export const direcao = {
  title: "Uma direção.",
  bands: [
    { src: posicionamento.img.d, pos: "58% 30%" },
    { src: `${M}/strip/2-d.webp`, pos: "50% 50%" },
    { src: `${M}/p35-drawing.webp`, pos: "52% 40%" },
  ],
} as const;

/* ── Acts 03 to 05 (after the gate) · roteiro aprovado pelo Tiago em 05/10 ── */

const N = "/media/next";

export const aera = {
  mark: "AERA × GAVEA",
  title: "Direção para o próximo movimento.",
  sub: "Marca, marketing, comercial e inteligência na mesma direção.",
  nodes: ["Agência", "Time interno", "Comercial", "Parceiros", "Marcas representadas", "Fornecedores"],
  doing: ["Quem já faz continua fazendo.", "A AERA conduz."],
  model: "A responsabilidade é central. O modelo é flexível.",
  team: {
    title: ["Direção humana.", "Produção com inteligência."],
    agents: ["Planejamento", "Sondagem", "Conceito", "Roteiro", "Arte", "Storyboard", "Operação", "Edição", "Mídia", "Transformação"],
    note: "Esta apresentação foi produzida assim.",
  },
} as const;

export const trade = {
  label: "Gavea Trade",
  title: "De informação a inteligência aplicada.",
  steps: [
    { n: "01", t: "Pedido", s: "e-mail, WhatsApp, planilha" },
    { n: "02", t: "Checklist", s: "especificação, frete, prazo" },
    { n: "03", t: "Cotações", s: "lado a lado" },
    { n: "04", t: "Proposta", s: "versão validada" },
    { n: "05", t: "Decisão", s: "" },
  ],
  close: "Do pedido picotado à proposta validada.",
} as const;

export const marca = {
  label: "Marca",
  logo: "/brand/gavea-white.webp",
  signature: "Beyond the surface.",
  close: "A mesma GAVEA. Vista inteira.",
  applications: [
    { src: `${M}/costado-d.webp`, pos: "50% 8%", alt: "Costado de navio com dois tripulantes no convés." },
    { src: `${M}/deep-d.webp`, pos: "50% 34%", alt: "Casco cortado pela linha d'água." },
  ],
} as const;

export const marketing = {
  label: "Marketing",
  kv: { src: `${N}/merus-seam.webp`, m: `${N}/merus-seam-m.webp`, alt: "Costura do anel MERUS, em macro, com gotas de água." },
  headline: ["Tubulação limpa.", "Operação contínua."],
  post: { src: `${N}/merus-portrait.webp`, line: "O fluxo não para.", alt: "Anel MERUS em estúdio." },
  deck: { label: "Apresentação comercial", title: ["MERUS Ring", "para a operação offshore"] },
  cta: "Solicitar avaliação técnica",
  close: "Marketing que começa no negócio e termina na venda.",
} as const;

export const futuro = {
  label: "Futuro",
  units: [
    { src: "/brand/unit-log.webp", alt: "Gavea Logística" },
    { src: "/brand/unit-terminals.webp", alt: "Gavea Terminals" },
    { src: "/brand/unit-green.webp", alt: "Gavea Green" },
    { src: "/brand/unit-trade.webp", alt: "Gavea Trade" },
  ],
  title: "Quatro frentes. Uma marca.",
  sub: "Logística, terminais, tecnologia e comércio, crescendo na mesma direção.",
} as const;

export const fechamento = {
  mark: "AERA × GAVEA",
  title: "A próxima dimensão.",
  sub: "Direção para transformar o movimento da GAVEA em percepção, oportunidade e inteligência.",
  question: "Vamos construir esse próximo movimento?",
} as const;
