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
  frames: {
    p35: { d: { dir: `${M}/p35/d`, count: 60, step: 1 }, m: { dir: `${M}/p35/m`, count: 44, step: 1 } },
    sea: { d: { dir: `${M}/sea/d`, count: 60, step: 1 }, m: { dir: `${M}/sea/m`, count: 44, step: 1 } },
  },
  deep: {
    d: `${M}/deep-d.webp`,
    m: `${M}/deep-m.webp`,
    ratio: 5504 / 3072, // height / width
    waterline: 0.36, // waterline height as a share of the image
    alt: "Casco de uma grande unidade offshore cortado pela linha d'água: acima, o céu; abaixo, o casco continua até o azul profundo, com um robô submarino pequeno junto ao aço.",
  },
  alts: {
    p35: "A P-35, unidade de produção da Petrobras, vista do alto em mar aberto, com dois rebocadores.",
    sea: "Embarcação de apoio offshore furando mar pesado ao entardecer.",
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
  next: "A seguir · Ato 03 em construção",
} as const;
