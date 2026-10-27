// Instivo case. Sources: Dhiego\'s published résumé (role, period, company
// size, team, six tools replaced, rule engine, card-linked architecture,
// usability-test results, four-layer tokens, interviews with retail managers)
// and the existing case content where it agrees with it. Screens from Figma
// file lea2M353Oe9r6wjVSSfupp (Data workspace flow); scenes generated in
// Magnific (Seedream 5 Pro) with the real screens composited in.
// ~70% / 5x: measured in usability tests (confirmed by Dhiego, Oct 2026).
export default {
  slug: 'instivo',
  hero: { src: '/assets/img/case/instivo/hero.webp' },
  en: {
    seoTitle: 'Instivo | Retail data workspace | Dhiego Cristofolini',
    description:
      'Product design case: a governed data workspace, rule engine and card-linked entity model that let retail managers run operations without IT.',
    cat: 'B2B SaaS · Retail operations',
    title: 'Instivo',
    sub: 'A data workspace for multi-unit retail',
    cover: 'Instivo',
    introTitle: 'Letting store managers set their own rules without calling IT',
    intro:
      'Instivo is a SaaS for multi-unit retail, a company of around 50 people. I turned its business rules into a data workspace, a rule engine and a card-linked entity model that replaced six disconnected tools, and rebuilt the design system underneath.',
    meta: [
      ['Role', 'Product Designer (contract)'],
      ['Period', 'Jun – Dec 2023'],
      ['Team', 'Cross-functional, 5–10 per task'],
      ['Research', 'Interviews with retail managers, usability tests'],
    ],
    blocks: [
      {
        type: 'section', num: '01', sub: 'The problem', title: 'Six tools that never talked to each other',
        text: 'Employee records lived in spreadsheets, supplier orders went by phone and stock was counted by hand, across six tools that never talked to each other. A product dropping below 50 units triggered nothing: someone had to notice, call and follow up.',
        wide: { img: 'ctx-stockroom', alt: 'A store manager in a pharmacy stockroom with Instivo\'s stock overview open on a laptop', caption: 'Stock status updated by rules instead of someone remembering to count.' },
      },
      {
        type: 'section', num: '02', sub: 'The product', title: 'The Data Workspace',
        text: 'The Data Workspace is where data is created and structured. Every form field, category and role across Instivo traces back to it. System workspaces feed the platform and cannot be deleted; free workspaces belong to the user.',
        wide: { img: 'ctx-desk', alt: 'A desk with a monitor showing the Instivo data workspace and a laptop editing a card', caption: 'Workspaces on the monitor, a card being edited on the laptop.' },
      },
      {
        type: 'section', num: '03', sub: 'Research', title: 'IT, managers and operators were blocking each other',
        text: 'I led discovery and interviews with retail managers alongside the PM. An IT rule could restrict a manager, and a manager rule could block an operator IT had allowed. Nobody found out until someone hit the block.',
        artifact: { img: 'art-roles', alt: 'Manager, IT Admin and operational user, and how their rules stack' },
      },
      {
        type: 'section', num: '04', sub: 'Decision', title: 'Products became linked cards',
        text: 'The brief asked for folders, but one product belongs to several categories at once and a folder holds it in one place. A linked card keeps a single record that plays a different role in each context.',
        artifact: { img: 'art-model', alt: 'Folder model duplicating a product versus a card-linked model referencing one record' },
        wide: { img: 'ctx-canvas', alt: 'Close-up of the Instivo hierarchy canvas with linked product cards', caption: 'The canvas: linked cards with rule counts, reorganizing as connections grow.' },
      },
      {
        type: 'section', layout: 'split', reverse: true, num: '05', sub: 'Decision', title: 'A rule builder with four fixed parts',
        text: 'The first version used free text, and it failed in testing. What shipped is a fixed four-part schema that managers fill in from chips: operator, entity, condition, action.',
        portrait: { img: 'ctx-rules', alt: 'A manager editing a card\'s rules in Instivo on a laptop', caption: 'Editing a card: name, links and its rules in one modal.' },
        artifact: { img: 'art-rule', alt: 'The four-part rule schema with an example rule and the rejected free-text approach' },
      },
      {
        type: 'section', num: '06', sub: 'Decision', title: 'Disabled controls say why',
        text: 'Critical workspaces show the delete control disabled, with the reason in a tooltip. Inherited rules appear read-only with their origin.',
        artifact: { img: 'art-governance', alt: 'Hidden control versus a disabled control with an explanatory tooltip' },
      },
      {
        type: 'section', pairEven: true, num: '07', sub: 'Fleet & Dock', title: 'Fleet and dock read the same records',
        text: 'Booking a dock needs a driver, a vehicle, a bay and a warehouse, all built in the Data Workspace. If a driver\'s license changes there, every booking picks it up, with no copied data and no integration layer in between.',
        pair: [
          { img: 'ctx-docks', alt: 'The Instivo dock schedule open on a laptop in a warehouse office overlooking loading docks', caption: 'Dock schedule: bays by hour, status by color.' },
          { img: 'ctx-drivers', alt: 'The Instivo driver table open on a laptop in front of numbered loading docks', caption: 'Drivers, pulled from the same records.' },
        ],
      },
      {
        type: 'section', num: '08', sub: 'Design system', title: 'Rebuilding the design system in four token layers',
        text: 'The inherited system had no tokens and no responsive logic. When mobile came mid-project, the semantic layer already resolved to it.',
        artifact: { img: 'art-tokens', alt: 'Core, Palette, Brand and Semantic token layers' },
      },
    ],
    results: {
      sub: 'Results',
      title: 'Usability test results',
      text: 'Measured in usability testing with real users. In the test tasks, managers changed rules, categories and thresholds on their own, with no help from IT.',
      stats: [
        ['~70%', 'less configuration time'],
        ['5×', 'faster new-unit onboarding'],
        ['6 → 1', 'disconnected tools replaced by one workspace'],
      ],
    },
  },
  pt: {
    seoTitle: 'Instivo | Workspace de dados de varejo | Dhiego Cristofolini',
    description:
      'Case de product design: um workspace de dados governado, motor de regras e modelo de entidades em cards que deixam gestores de varejo operar sem a TI.',
    cat: 'SaaS B2B · Operações de varejo',
    title: 'Instivo',
    sub: 'Um workspace de dados para varejo multiunidade',
    cover: 'Instivo',
    introTitle: 'Deixar o gestor da loja criar as próprias regras sem chamar a TI',
    intro:
      'A Instivo é um SaaS para varejo multiunidade, uma empresa de cerca de 50 pessoas. Transformei as regras de negócio num workspace de dados, num motor de regras e num modelo de entidades em cards que substituiu seis ferramentas desconectadas, e refiz o design system por baixo.',
    meta: [
      ['Papel', 'Product Designer (contrato)'],
      ['Período', 'Jun – Dez 2023'],
      ['Time', 'Multidisciplinar, 5 a 10 por tarefa'],
      ['Pesquisa', 'Entrevistas com gestores de varejo, testes de usabilidade'],
    ],
    blocks: [
      {
        type: 'section', num: '01', sub: 'O problema', title: 'Seis ferramentas que não conversavam',
        text: 'Cadastro de funcionários em planilha, pedido a fornecedor por telefone e estoque contado à mão, em seis ferramentas que não conversavam. Um produto abaixo de 50 unidades não disparava nada: alguém tinha que perceber, ligar e cobrar.',
        wide: { img: 'ctx-stockroom', alt: 'Um gestor no estoque de uma farmácia com a visão de estoque da Instivo aberta no notebook', caption: 'Status de estoque atualizado por regras em vez de alguém lembrar de contar.' },
      },
      {
        type: 'section', num: '02', sub: 'O produto', title: 'O Data Workspace',
        text: 'O Data Workspace é onde os dados são criados e estruturados. Todo campo de formulário, categoria e papel da Instivo vem dele. Workspaces de sistema alimentam a plataforma e não podem ser excluídos; workspaces livres são do usuário.',
        wide: { img: 'ctx-desk', alt: 'Uma mesa com um monitor mostrando o workspace de dados da Instivo e um notebook editando um card', caption: 'Workspaces no monitor, um card sendo editado no notebook.' },
      },
      {
        type: 'section', num: '03', sub: 'Pesquisa', title: 'TI, gestores e operadores se bloqueavam',
        text: 'Liderei a descoberta e as entrevistas com gestores de varejo junto com o PM. Uma regra da TI podia restringir o gestor, e uma regra do gestor podia bloquear um operador que a TI liberou. Ninguém percebia até alguém dar de cara com o bloqueio.',
        artifact: { img: 'art-roles', alt: 'Gestor, admin de TI e usuário operacional, e como as regras deles se empilham' },
      },
      {
        type: 'section', num: '04', sub: 'Decisão', title: 'Os produtos viraram cards ligados',
        text: 'O briefing pedia pastas, mas um produto pertence a várias categorias ao mesmo tempo e uma pasta só guarda em um lugar. Um card ligado mantém um registro só, que faz um papel diferente em cada contexto.',
        artifact: { img: 'art-model', alt: 'Modelo de pastas duplicando um produto contra um modelo de cards ligados referenciando um registro' },
        wide: { img: 'ctx-canvas', alt: 'Close do canvas de hierarquia da Instivo com cards de produto ligados', caption: 'O canvas: cards ligados com contagem de regras, se reorganizando conforme as conexões crescem.' },
      },
      {
        type: 'section', layout: 'split', reverse: true, num: '05', sub: 'Decisão', title: 'Um construtor de regras com quatro partes fixas',
        text: 'A primeira versão usava texto livre e falhou nos testes. O que foi ao ar é um esquema fixo de quatro partes que o gestor preenche com chips: operador, entidade, condição, ação.',
        portrait: { img: 'ctx-rules', alt: 'Um gestor editando as regras de um card na Instivo num notebook', caption: 'Editando um card: nome, ligações e regras num só modal.' },
        artifact: { img: 'art-rule', alt: 'O esquema de regra em quatro partes com um exemplo e a abordagem de texto livre rejeitada' },
      },
      {
        type: 'section', num: '06', sub: 'Decisão', title: 'Controle desabilitado explica o motivo',
        text: 'Workspaces críticos mostram o excluir desabilitado, com o motivo num tooltip. Regras herdadas aparecem como somente leitura, com a origem.',
        artifact: { img: 'art-governance', alt: 'Controle escondido contra controle desabilitado com tooltip explicativo' },
      },
      {
        type: 'section', pairEven: true, num: '07', sub: 'Frota e doca', title: 'Frota e doca leem os mesmos registros',
        text: 'Agendar uma doca exige motorista, veículo, baia e armazém, todos montados no Data Workspace. Se a CNH de um motorista muda lá, todo agendamento já pega a mudança, sem dado copiado e sem camada de integração no meio.',
        pair: [
          { img: 'ctx-docks', alt: 'A agenda de docas da Instivo aberta num notebook num escritório com vista para as docas', caption: 'Agenda de docas: baias por hora, status por cor.' },
          { img: 'ctx-drivers', alt: 'A tabela de motoristas da Instivo aberta num notebook em frente às docas numeradas', caption: 'Motoristas, vindos dos mesmos registros.' },
        ],
      },
      {
        type: 'section', num: '08', sub: 'Design system', title: 'O design system refeito em quatro camadas de tokens',
        text: 'O sistema herdado não tinha tokens nem lógica responsiva. Quando o mobile chegou no meio do projeto, a camada semântica já resolvia para ele.',
        artifact: { img: 'art-tokens', alt: 'Camadas de tokens Core, Palette, Brand e Semantic' },
      },
    ],
    results: {
      sub: 'Resultados',
      title: 'Resultados dos testes de usabilidade',
      text: 'Medido em testes de usabilidade com usuários reais. Nas tarefas do teste, gestores mudaram regras, categorias e limites sozinhos, sem ajuda da TI.',
      stats: [
        ['~70%', 'menos tempo de configuração'],
        ['5×', 'mais rápido para abrir uma nova unidade'],
        ['6 → 1', 'ferramentas desconectadas substituídas por um workspace'],
      ],
    },
  },
};
