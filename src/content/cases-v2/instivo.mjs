// Instivo case. Sources: Dhiego's published résumé (role, period, company
// size, team, six tools replaced, rule engine, card-linked architecture,
// usability-test results, four-layer tokens, interviews with retail managers)
// and the existing case content where it agrees with it. Screens from Figma
// file lea2M353Oe9r6wjVSSfupp (Data workspace flow); scenes generated in
// Magnific (Seedream 5 Pro) with the real screens composited in.
// TO CONFIRM with Dhiego: the old case called ~70% / 5x projections from
// benchmarks; the résumé says they were measured in usability tests.
export default {
  slug: 'instivo',
  hero: { src: '/assets/img/case/instivo/hero.webp' },
  en: {
    seoTitle: 'Instivo | Data workspace for multi-unit retail | Dhiego Cristofolini',
    description:
      'Product design case: a governed data workspace, rule engine and card-linked entity model that let retail managers run operations without IT.',
    cat: 'B2B SaaS · Retail operations',
    title: 'Instivo',
    sub: 'Governing what no spreadsheet can hold',
    cover: 'Instivo',
    introTitle: 'Operations that run themselves, configured by the people who own them.',
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
        type: 'section', num: '01', sub: 'The problem', title: 'Six tools, and nobody in charge.',
        text: 'Employee records lived in spreadsheets, supplier orders went by phone and stock was counted by hand. A product dropping below 50 units triggered nothing: someone had to notice, call and follow up.',
        wide: { img: 'ctx-stockroom', alt: 'A store manager in a pharmacy stockroom with Instivo’s stock overview open on a laptop', caption: 'Stock status resolved by rules, not by someone remembering to count.' },
      },
      {
        type: 'section', num: '02', sub: 'The product', title: 'One workspace every screen reads from.',
        text: 'The Data Workspace is where data is created and structured. Every form field, category and role across Instivo traces back to it. System workspaces feed the platform and cannot be deleted; free workspaces belong to the user.',
        wide: { img: 'ctx-desk', alt: 'A desk with a monitor showing the Instivo data workspace and a laptop editing a card', caption: 'Workspaces on the monitor, a card being edited on the laptop.' },
      },
      {
        type: 'section', num: '03', sub: 'Research', title: 'Three roles, rules that collide invisibly.',
        text: 'I led discovery and interviews with retail managers alongside the PM. An IT rule could restrict a manager; a manager rule could block an operator IT had allowed. Nobody saw the wall coming.',
        artifact: { img: 'art-roles', alt: 'Manager, IT Admin and operational user, and how their rules stack' },
      },
      {
        type: 'section', num: '04', sub: 'Decision', title: 'Cards, not folders.',
        text: 'The brief asked for folders. But one product belongs to several categories at once, and a folder holds it in one place. Linked cards keep one record that plays a different role in each context.',
        artifact: { img: 'art-model', alt: 'Folder model duplicating a product versus a card-linked model referencing one record' },
        wide: { img: 'ctx-canvas', alt: 'Close-up of the Instivo hierarchy canvas with linked product cards', caption: 'The canvas: linked cards with rule counts, reorganizing as connections grow.' },
      },
      {
        type: 'section', layout: 'split', reverse: true, num: '05', sub: 'Decision', title: 'Rules managers build without writing logic.',
        text: 'A fixed four-part schema, picked from constrained chips: operator, entity, condition, action. Free text came first and failed in testing.',
        portrait: { img: 'ctx-rules', alt: 'A manager editing a card’s rules in Instivo on a laptop', caption: 'Editing a card: name, links and its rules in one modal.' },
        artifact: { img: 'art-rule', alt: 'The four-part rule schema with an example rule and the rejected free-text approach' },
      },
      {
        type: 'section', num: '06', sub: 'Decision', title: 'Explain the limit, don’t hide it.',
        text: 'Critical workspaces show the delete control disabled, with the reason in a tooltip. Inherited rules appear read-only with their origin.',
        artifact: { img: 'art-governance', alt: 'Hidden control versus a disabled control with an explanatory tooltip' },
      },
      {
        type: 'section', pairEven: true, num: '07', sub: 'Fleet & Dock', title: 'One record, every module.',
        text: 'Booking a dock needs a driver, a vehicle, a bay and a warehouse, all built in the Data Workspace. Change a driver’s license there and every booking updates. No duplication, no integration layer.',
        pair: [
          { img: 'ctx-docks', alt: 'The Instivo dock schedule open on a laptop in a warehouse office overlooking loading docks', caption: 'Dock schedule: bays by hour, status by color.' },
          { img: 'ctx-drivers', alt: 'The Instivo driver table open on a laptop in front of numbered loading docks', caption: 'Drivers, pulled from the same records.' },
        ],
      },
      {
        type: 'section', num: '08', sub: 'Design system', title: 'Four layers. A new client touches one.',
        text: 'The inherited system had no tokens and no responsive logic. When mobile came mid-project, the semantic layer already resolved to it.',
        artifact: { img: 'art-tokens', alt: 'Core, Palette, Brand and Semantic token layers' },
      },
    ],
    results: {
      sub: 'Results',
      title: 'Faster to configure. Faster to open a unit.',
      text: 'Measured in usability testing with real users. Managers changed rules, categories and thresholds themselves, without filing IT requests.',
      stats: [
        ['~70%', 'less configuration time'],
        ['5×', 'faster new-unit onboarding'],
        ['6 → 1', 'disconnected tools replaced by one workspace'],
      ],
    },
  },
  pt: {
    seoTitle: 'Instivo | Workspace de dados para varejo multiunidade | Dhiego Cristofolini',
    description:
      'Case de product design: um workspace de dados governado, motor de regras e modelo de entidades em cards que deixam gestores de varejo operar sem a TI.',
    cat: 'SaaS B2B · Operações de varejo',
    title: 'Instivo',
    sub: 'Governando o que nenhuma planilha comporta',
    cover: 'Instivo',
    introTitle: 'Operações que rodam sozinhas, configuradas por quem é dono delas.',
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
        type: 'section', num: '01', sub: 'O problema', title: 'Seis ferramentas, e ninguém no comando.',
        text: 'Cadastro de funcionários em planilha, pedido a fornecedor por telefone e estoque contado à mão. Um produto abaixo de 50 unidades não disparava nada: alguém tinha que perceber, ligar e cobrar.',
        wide: { img: 'ctx-stockroom', alt: 'Um gestor no estoque de uma farmácia com a visão de estoque da Instivo aberta no notebook', caption: 'Status de estoque resolvido por regras, não por alguém lembrar de contar.' },
      },
      {
        type: 'section', num: '02', sub: 'O produto', title: 'Um workspace de onde toda tela lê.',
        text: 'O Data Workspace é onde os dados são criados e estruturados. Todo campo de formulário, categoria e papel da Instivo vem dele. Workspaces de sistema alimentam a plataforma e não podem ser excluídos; workspaces livres são do usuário.',
        wide: { img: 'ctx-desk', alt: 'Uma mesa com um monitor mostrando o workspace de dados da Instivo e um notebook editando um card', caption: 'Workspaces no monitor, um card sendo editado no notebook.' },
      },
      {
        type: 'section', num: '03', sub: 'Pesquisa', title: 'Três papéis, regras que colidem sem ninguém ver.',
        text: 'Liderei a descoberta e as entrevistas com gestores de varejo junto com o PM. Uma regra da TI podia restringir o gestor; uma regra do gestor podia bloquear um operador que a TI liberou. Ninguém via o muro chegando.',
        artifact: { img: 'art-roles', alt: 'Gestor, admin de TI e usuário operacional, e como as regras deles se empilham' },
      },
      {
        type: 'section', num: '04', sub: 'Decisão', title: 'Cards, não pastas.',
        text: 'O briefing pedia pastas. Mas um produto pertence a várias categorias ao mesmo tempo, e uma pasta só guarda em um lugar. Cards ligados mantêm um registro que faz um papel diferente em cada contexto.',
        artifact: { img: 'art-model', alt: 'Modelo de pastas duplicando um produto contra um modelo de cards ligados referenciando um registro' },
        wide: { img: 'ctx-canvas', alt: 'Close do canvas de hierarquia da Instivo com cards de produto ligados', caption: 'O canvas: cards ligados com contagem de regras, se reorganizando conforme as conexões crescem.' },
      },
      {
        type: 'section', layout: 'split', reverse: true, num: '05', sub: 'Decisão', title: 'Regras que o gestor monta sem escrever lógica.',
        text: 'Um esquema fixo de quatro partes, escolhido em chips restritos: operador, entidade, condição, ação. Texto livre veio primeiro e falhou nos testes.',
        portrait: { img: 'ctx-rules', alt: 'Um gestor editando as regras de um card na Instivo num notebook', caption: 'Editando um card: nome, ligações e regras num só modal.' },
        artifact: { img: 'art-rule', alt: 'O esquema de regra em quatro partes com um exemplo e a abordagem de texto livre rejeitada' },
      },
      {
        type: 'section', num: '06', sub: 'Decisão', title: 'Explicar o limite, não esconder.',
        text: 'Workspaces críticos mostram o excluir desabilitado, com o motivo num tooltip. Regras herdadas aparecem como somente leitura, com a origem.',
        artifact: { img: 'art-governance', alt: 'Controle escondido contra controle desabilitado com tooltip explicativo' },
      },
      {
        type: 'section', pairEven: true, num: '07', sub: 'Frota e doca', title: 'Um registro, todos os módulos.',
        text: 'Agendar uma doca exige motorista, veículo, baia e armazém, todos montados no Data Workspace. Mude a CNH de um motorista lá e todo agendamento atualiza. Sem duplicação, sem camada de integração.',
        pair: [
          { img: 'ctx-docks', alt: 'A agenda de docas da Instivo aberta num notebook num escritório com vista para as docas', caption: 'Agenda de docas: baias por hora, status por cor.' },
          { img: 'ctx-drivers', alt: 'A tabela de motoristas da Instivo aberta num notebook em frente às docas numeradas', caption: 'Motoristas, vindos dos mesmos registros.' },
        ],
      },
      {
        type: 'section', num: '08', sub: 'Design system', title: 'Quatro camadas. Cliente novo mexe em uma.',
        text: 'O sistema herdado não tinha tokens nem lógica responsiva. Quando o mobile chegou no meio do projeto, a camada semântica já resolvia para ele.',
        artifact: { img: 'art-tokens', alt: 'Camadas de tokens Core, Palette, Brand e Semantic' },
      },
    ],
    results: {
      sub: 'Resultados',
      title: 'Mais rápido para configurar. Mais rápido para abrir uma unidade.',
      text: 'Medido em testes de usabilidade com usuários reais. Gestores mudavam regras, categorias e limites sozinhos, sem abrir chamado para a TI.',
      stats: [
        ['~70%', 'menos tempo de configuração'],
        ['5×', 'mais rápido para abrir uma nova unidade'],
        ['6 → 1', 'ferramentas desconectadas substituídas por um workspace'],
      ],
    },
  },
};
