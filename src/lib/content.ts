/**
 * All visible copy, by moment. Sentence case, no em dashes (Tiago's rules),
 * PT on the page, EN only in system labels. Brief §§8–21, with the PASS 00
 * adjustments (D7: "Não substituir. Conduzir.").
 */

export type Theme = "paper" | "film" | "table";

export const moments = [
  { id: "gavea", folio: "A GAVEA real", theme: "film" },
  { id: "valor", folio: "Valor", theme: "paper" },
  { id: "direcao", folio: "Direção", theme: "paper" },
  { id: "camada", folio: "Nova camada", theme: "paper" },
  { id: "dia-a-dia", folio: "Dia a dia", theme: "paper" },
  { id: "marca", folio: "Marca", theme: "table" },
  { id: "sistema", folio: "Sistema", theme: "paper" },
  { id: "pessoas", folio: "Pessoas", theme: "film" },
  { id: "continua", folio: "O que continua", theme: "paper" },
  { id: "proxima-camada", folio: "Próxima camada", theme: "film" },
] as const satisfies readonly { id: string; folio: string; theme: Theme }[];

export type MomentId = (typeof moments)[number]["id"];

export const momentIndex = (id: MomentId) => moments.findIndex((m) => m.id === id);

export const pad2 = (n: number) => String(n).padStart(2, "0");

export const copy = {
  gavea: {
    label: "GAVEA × AERA · 2026",
    title: "A GAVEA cresceu.",
    beats: ["Mais operação.", "Mais negócios.", "Mais relações.", "Mais oportunidades."],
    close: "A marca precisa expressar essa escala.",
  },
  valor: {
    title: "O valor já existe.",
    turn: "Nem sempre ele é percebido.",
    body: "Quando operação, comercial, marca e comunicação evoluem em ritmos diferentes, parte do valor se perde no caminho.",
    close: "O marketing precisa tornar o valor visível.",
  },
  direcao: {
    title: "Não é sobre fazer mais marketing.",
    turn: "É sobre dar direção ao que já acontece.",
    words: [
      "Agência",
      "Time interno",
      "Comercial",
      "Parceiros",
      "Representadas",
      "Eventos",
      "Conteúdo",
      "Site",
      "Apresentações",
      "Campanhas",
      "Projetos",
    ],
    body: [
      "A GAVEA já possui pessoas, parceiros, conhecimento e capacidade de execução.",
      "O próximo passo é fazer tudo isso trabalhar dentro de uma visão comum.",
    ],
    close: "Direção antes de volume.",
  },
  camada: {
    label: "AERA × GAVEA",
    title: ["Direção &", "Gerência de Marketing"],
    body: "Uma camada estratégica conectando negócio, marca, comercial, agência, equipe interna e parceiros.",
    note: "Gávea: o ponto alto do mastro, de onde se vê o caminho inteiro.",
    system: "Uma direção. Várias frentes trabalhando juntas.",
    fronts: [
      { name: "Estratégia", items: ["Posicionamento", "Prioridades", "Oportunidades", "Narrativa"] },
      { name: "Marca", items: ["Design system", "Direção visual", "Tom de voz", "Consistência"] },
      { name: "Planejamento", items: ["Calendário", "Campanhas", "Feiras", "Lançamentos"] },
      { name: "Direção criativa", items: ["Briefings", "Direção", "Curadoria", "Aprovação"] },
      { name: "Comercial", items: ["Apresentações", "Materiais", "Campanhas", "Oportunidades"] },
      { name: "Inteligência", items: ["Dados", "IA", "Conhecimento", "Aprendizado"] },
    ],
    ecosystem: ["Agência", "Time interno", "Comercial", "Parceiros", "Representadas"],
  },
  diaADia: {
    title: ["Menos demanda solta.", "Mais processo."],
    flow: [
      { step: "Negócio", who: "GAVEA" },
      { step: "Oportunidade", who: "GAVEA · Comercial" },
      { step: "Direção", who: "AERA" },
      { step: "Briefing", who: "AERA" },
      { step: "Criação", who: "Agência · Time interno" },
      { step: "Aprovação", who: "GAVEA · AERA" },
      { step: "Distribuição", who: "Time interno · Comercial · Parceiros" },
      { step: "Resultado", who: "Todos" },
    ],
    continues: [
      "A agência continua criando.",
      "O time interno continua participando.",
      "Os parceiros continuam contribuindo.",
    ],
    shift: "O que muda é que todos passam a trabalhar com prioridades, critérios e direção compartilhados.",
    title2: "Marketing começa antes da peça.",
    examples: [
      {
        trigger: "Nova representada entra no portfólio.",
        path: ["Posicionamento", "Lançamento", "Apresentação", "Landing", "Conteúdo", "Comercial"],
      },
      {
        trigger: "Uma operação relevante é conquistada.",
        path: ["Narrativa", "Reputação", "PR", "Institucional", "Conteúdo", "Novas oportunidades"],
      },
      {
        trigger: "Uma feira se aproxima.",
        path: ["Objetivo", "Campanha", "Convites", "Stand", "Conteúdo", "Follow-up"],
      },
    ],
    close: ["A comunicação deixa de reagir ao calendário.", "Passa a acompanhar o movimento do negócio."],
  },
  marca: {
    label: "GAVEA · Brand direction · Concept",
    title: "E se a marca começasse a parecer com a empresa que já existe?",
    applications: [
      { id: "deck", name: "Apresentação institucional", format: "Capa + páginas internas" },
      { id: "arquitetura", name: "Arquitetura de marca", format: "Group + Log · Terminals · Trade · Green" },
      { id: "linkedin", name: "LinkedIn", format: "Sistema de 3 posts" },
      { id: "representada", name: "Lançamento de representada", format: "MERUS · one-page" },
      { id: "feira", name: "Feira", format: "Backdrop + convite" },
    ],
    system: ["Não uma coleção de peças.", "Um sistema de marca."],
    layers: ["Tipografia", "Grid", "Cor", "Fotografia", "Movimento", "Voz", "Templates", "Aplicações"],
  },
  sistema: {
    label: "GAVEA Marketing System",
    note: "Visão operacional · conceito · exemplos ilustrativos",
    title: "Um lugar para enxergar o todo.",
    tabs: ["Overview", "Brand", "Campaigns", "Content", "Commercial", "Calendar", "Approvals", "Assets", "Insights"],
    rows: [
      { front: "Representadas", item: "Campanha MERUS", phase: "Em criação", owner: "Agência", attention: false },
      { front: "Institucional", item: "Calendário institucional", phase: "Em direção", owner: "AERA", attention: false },
      { front: "Eventos", item: "Feira · planejamento", phase: "Em briefing", owner: "AERA · Comercial", attention: false },
      { front: "Representadas", item: "Lançamento de representada", phase: "Em aprovação", owner: "GAVEA", attention: true },
      { front: "Comercial", item: "Apresentação comercial", phase: "Em criação", owner: "Time interno", attention: false },
      { front: "Conteúdo", item: "Revisão de peça · LinkedIn", phase: "Em aprovação", owner: "GAVEA", attention: true },
      { front: "Ativos", item: "Biblioteca de fotos reais", phase: "Contínuo", owner: "AERA · Time interno", attention: false },
      { front: "Conteúdo", item: "Pauta do mês", phase: "Publicado", owner: "Time interno", attention: false },
    ],
    intelligence: {
      title: "Comunicação também gera conhecimento.",
      body: "Campanhas, clientes, projetos, materiais, decisões e aprendizados não precisam permanecer dispersos.",
      sum: ["Brand", "Marketing", "Commercial", "Knowledge"],
      result: "GAVEA Intelligence",
      sub: "Uma estrutura que aprende com o negócio e melhora a próxima decisão.",
    },
  },
  pessoas: {
    title: ["Próximo da operação.", "Próximo das pessoas."],
    lead: "Direção não acontece por e-mail.",
    body: "Ela acontece entendendo prioridades, ouvindo o comercial, acompanhando projetos, conversando com parceiros e transformando contexto em ação.",
    with: "AERA trabalhando junto à GAVEA, com agência, equipe interna e parceiros.",
  },
  continua: {
    keeps: { label: "Continua", items: ["Agência", "Equipe interna", "Parceiros", "Conhecimento", "Relações", "Capacidade de execução"] },
    grows: { label: "Evolui", items: ["Direção", "Planejamento", "Consistência", "Critério", "Integração", "Percepção de valor"] },
    title: ["Não substituir.", "Conduzir."],
  },
  fechamento: {
    one: "A GAVEA já construiu o valor.",
    two: "Agora a marca precisa representar tudo isso.",
    pair: "GAVEA × AERA",
    sign: "Building the next layer.",
    micro: "Direction · Brand · Marketing · Intelligence",
    cta: "Vamos construir essa próxima camada.",
  },
} as const;
