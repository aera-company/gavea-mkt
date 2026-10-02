/**
 * Real GAVEA media only. Every entry says where it came from; nothing here is
 * AI-generated (decision of PASS 00). Captions name place and function, never
 * people (brief §31). Prepared by scripts/assets/*, documented in docs/ASSETS.md.
 */

export type Still = {
  src: string;
  w: number;
  h: number;
  alt: string;
  caption: string;
  source: "site" | "deck" | "instagram" | "merus";
  /** Low-resolution source: show as a proof, never full-bleed. */
  proof?: boolean;
};

export type Clip = {
  src: string;
  poster: string;
  w: number;
  h: number;
  alt: string;
  caption: string;
};

const img = (name: string) => `/media/img/${name}.webp`;
const vid = (name: string) => ({
  src: `/media/video/${name}.mp4`,
  poster: `/media/video/${name}.webp`,
});

export const stills = {
  embarcacaoGuanabara: {
    src: img("site-embarcacao-guanabara-2400"),
    w: 2400,
    h: 971,
    alt: "Embarcação offshore vermelha e branca navegando na Baía de Guanabara, vista de drone.",
    caption: "Baía de Guanabara",
    source: "site",
  },
  liderancaReuniao: {
    src: img("site-lideranca-reuniao"),
    w: 706,
    h: 562,
    alt: "Seis pessoas da GAVEA reunidas em volta de um mapa aberto sobre a mesa.",
    caption: "Escritório GAVEA · reunião de planejamento",
    source: "site",
    proof: true,
  },
  diqueCasco: {
    src: img("site-dique-casco"),
    w: 552,
    h: 772,
    alt: "Proa vermelha de uma embarcação em dique seco.",
    caption: "Dique seco · engenharia",
    source: "site",
    proof: true,
  },
  engenhariaDupla: {
    src: img("site-engenharia-dupla"),
    w: 457,
    h: 208,
    alt: "Dois profissionais de uniforme Gavea Logística conversando no cais.",
    caption: "Projetos e engenharia · cais",
    source: "site",
    proof: true,
  },
  caisNoturno: {
    src: img("site-cais-noturno"),
    w: 770,
    h: 582,
    alt: "Embarcação atracada à noite, com guindaste e equipe no cais iluminado.",
    caption: "Operação noturna · cais",
    source: "site",
    proof: true,
  },
  barcacaBobinas: {
    src: img("site-barcaca-bobinas"),
    w: 457,
    h: 196,
    alt: "Barcaça Martin Leme XVII carregada com bobinas de cabo.",
    caption: "Operação marítima · barcaça",
    source: "site",
    proof: true,
  },
  guindasteFrota: {
    src: img("site-guindaste-frota"),
    w: 454,
    h: 238,
    alt: "Guindaste da frota própria com a marca Gavea Logística.",
    caption: "Frota própria",
    source: "site",
    proof: true,
  },
  icamentoTubos: {
    src: img("insta-icamento-tubos"),
    w: 438,
    h: 300,
    alt: "Içamento de tubos de aço acompanhado por profissionais da GAVEA.",
    caption: "Içamento · carga de projeto",
    source: "instagram",
    proof: true,
  },
  mooringBinoculo: {
    src: img("deck-mooring-binoculo"),
    w: 472,
    h: 474,
    alt: "Mooring master observando a manobra com binóculo, de costas.",
    caption: "Mooring master · manobra",
    source: "deck",
    proof: true,
  },
  mooringConves: {
    src: img("deck-mooring-conves"),
    w: 376,
    h: 474,
    alt: "Convés de um navio-tanque com plataforma ao fundo.",
    caption: "Mooring master · convés",
    source: "deck",
    proof: true,
  },
  mooringSinal: {
    src: img("deck-mooring-sinal"),
    w: 472,
    h: 420,
    alt: "Profissional de capacete branco sinalizando com a mão durante a manobra.",
    caption: "Mooring master · sinalização",
    source: "deck",
    proof: true,
  },
  mooringEquipe: {
    src: img("deck-mooring-equipe"),
    w: 376,
    h: 268,
    alt: "Equipe de macacão laranja no convés.",
    caption: "Mooring master · equipe",
    source: "deck",
    proof: true,
  },
  engenhariaCasco: {
    src: img("deck-engenharia-casco"),
    w: 450,
    h: 908,
    alt: "Casco vermelho visto de baixo, em dique seco.",
    caption: "Engenharia · docagem",
    source: "deck",
    proof: true,
  },
  engenhariaColete: {
    src: img("deck-engenharia-colete"),
    w: 396,
    h: 460,
    alt: "Profissional de colete Gavea Logística acompanhando um içamento.",
    caption: "Engenharia · plano de içamento",
    source: "deck",
    proof: true,
  },
  roroOperador: {
    src: img("deck-roro-operador"),
    w: 354,
    h: 458,
    alt: "Operador orientando o desembarque de veículos na rampa de um navio Ro-Ro.",
    caption: "Gavea Terminals · Ro-Ro",
    source: "deck",
    proof: true,
  },
  roroPatio: {
    src: img("deck-roro-patio"),
    w: 804,
    h: 282,
    alt: "Pátio com veículos alinhados após desembarque.",
    caption: "Gavea Terminals · pátio",
    source: "deck",
    proof: true,
  },
  frotaGuindaste: {
    src: img("deck-frota-guindaste"),
    w: 574,
    h: 328,
    alt: "Guindaste Zoomlion da frota própria.",
    caption: "Frota própria · guindaste",
    source: "deck",
    proof: true,
  },
  aboutBarcaca: {
    src: img("deck-about-barcaca"),
    w: 644,
    h: 152,
    alt: "Profissional de macacão laranja no convés de uma barcaça, plataforma ao fundo.",
    caption: "Operação marítima",
    source: "deck",
    proof: true,
  },
  merusFamilia: {
    src: img("merus-familia-2400"),
    w: 2400,
    h: 898,
    alt: "Família de anéis MERUS em diferentes tamanhos.",
    caption: "MERUS Ring · representada Gavea Green",
    source: "merus",
  },
  merusAntes: {
    src: img("merus-tubulacao-antes-1400"),
    w: 1400,
    h: 1063,
    alt: "Interior de tubulação com incrustação.",
    caption: "Tubulação · antes",
    source: "merus",
  },
  merusDepois: {
    src: img("merus-tubulacao-depois-1400"),
    w: 1400,
    h: 1083,
    alt: "Interior de tubulação limpa.",
    caption: "Tubulação · depois",
    source: "merus",
  },
} satisfies Record<string, Still>;

/** GAVEA's own P-35 film (watermark cropped out). 848 px source: band crops. */
export const clips = {
  baia: { ...vid("p35-baia"), w: 848, h: 355, alt: "A P-35 rebocada pela Baía de Guanabara, com o Pão de Açúcar ao fundo.", caption: "P-35 · Baía de Guanabara" },
  baiaTall: { ...vid("p35-baia-tall"), w: 344, h: 430, alt: "A P-35 rebocada pela Baía de Guanabara.", caption: "P-35 · Baía de Guanabara" },
  heliponto: { ...vid("p35-heliponto"), w: 848, h: 355, alt: "Sobrevoo do heliponto da P-35 durante o reboque.", caption: "P-35 · reboque" },
  reboque: { ...vid("p35-reboque"), w: 848, h: 355, alt: "Rebocador puxando a P-35 em mar aberto.", caption: "P-35 · reboque" },
  zenital: { ...vid("p35-zenital"), w: 848, h: 355, alt: "A P-35 vista de cima, inteira.", caption: "P-35 · vista zenital" },
  zenitalReboque: { ...vid("p35-zenital-reboque"), w: 848, h: 355, alt: "Vista de cima da proa com rebocadores.", caption: "P-35 · vista zenital" },
  pao: { ...vid("p35-pao"), w: 848, h: 355, alt: "A P-35 passando diante do Pão de Açúcar.", caption: "P-35 · Pão de Açúcar" },
  casco: { ...vid("p35-casco"), w: 848, h: 424, alt: "Casco da P-35 com o nome pintado.", caption: "P-35 · casco" },
  estrutura: { ...vid("p35-estrutura"), w: 848, h: 424, alt: "Estrutura da P-35 com equipe no convés.", caption: "P-35 · convés" },
  atracacao: { ...vid("p35-atracacao"), w: 848, h: 355, alt: "A P-35 atracando ao longo do cais.", caption: "P-35 · atracação" },
  zenitalCais: { ...vid("p35-zenital-cais"), w: 848, h: 355, alt: "A P-35 atracada, vista de cima.", caption: "P-35 · atracada" },
  defensa: { ...vid("p35-defensa"), w: 848, h: 424, alt: "Equipe de colete laranja na amarração, junto à defensa Gavea Logística.", caption: "Amarração · equipe Gavea Logística" },
  defensaTall: { ...vid("p35-defensa-tall"), w: 344, h: 430, alt: "Defensa Gavea Logística e cabo de amarração.", caption: "Amarração · defensa" },
  equipamento: { ...vid("p35-equipamento"), w: 848, h: 424, alt: "Equipamento com a marca Gavea Logística no cais.", caption: "Equipamento Gavea Logística" },
  equipe: { ...vid("p35-equipe"), w: 848, h: 424, alt: "Equipe Gavea Logística preparando a amarração.", caption: "Amarração · equipe" },
} satisfies Record<string, Clip>;

export const logos = {
  groupCor: { src: "/media/logos/gavea-group-cor.png", w: 1200, h: 232 },
  groupBranco: { src: "/media/logos/gavea-group-branco.png", w: 1200, h: 232 },
  simbolo: { src: "/media/logos/gavea-simbolo.png", w: 771, h: 563 },
  log: { src: "/media/logos/gavea-log.png", w: 1200, h: 598 },
  terminals: { src: "/media/logos/gavea-terminals.png", w: 1200, h: 437 },
  trade: { src: "/media/logos/gavea-trade.png", w: 1200, h: 611 },
  green: { src: "/media/logos/gavea-green.png", w: 1200, h: 624 },
};
