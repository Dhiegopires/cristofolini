// NorthPay fintech onboarding concept. Source: the existing case content
// (Dhiego's). Images are the original case mockups and process artifacts.
export default {
  slug: 'northpay',
  hero: { src: '/assets/img/case/northpay/hero.webp' },
  en: {
    seoTitle: 'NorthPay | Fintech onboarding concept | Dhiego Cristofolini',
    description:
      'Fintech onboarding and KYC concept: account type first, one question per screen and a stepper visible from step one.',
    cat: 'Product concept · Fintech',
    title: 'NorthPay',
    sub: 'Onboarding as a product surface.',
    cover: 'Onboard',
    introTitle: 'Every field sits between the user and the product.',
    intro:
      'Financial products have to collect sensitive data before anyone sees value, which makes onboarding the most fragile part of the flow. Every field is there because regulation requires it. The order those fields appear in is a design decision.',
    meta: [
      ['Role', 'Product Designer'],
      ['Type', 'Concept project'],
      ['Scope', 'Account setup, KYC, first use'],
      ['Duration', '8 weeks'],
    ],
    blocks: [
      {
        type: 'section', num: '01', sub: 'Problem', title: 'Three parties, one fragile sequence.',
        text: 'Users ask why it takes so long. The business asks where people drop. Compliance needs every field. The fix is not fewer fields, it is how they are presented.',
        stats: [
          ['19%', 'abandon when forced to create an account before seeing value (Baymard, 2024)'],
          ['3', 'phases: account type, identity, verification'],
          ['6', 'steps, all visible from the first screen'],
        ],
      },
      {
        type: 'section', num: '02', sub: 'Flow & IA', title: 'Account type first. Every field after depends on it.',
        text: 'Choosing the account type before any form opens removes the worst failure: switching type mid-form and losing everything already typed.',
        wide: { img: 'flow', alt: 'Onboarding flowchart with personal and business branches', caption: 'User flow: one entry, two branches, one verification step.' },
        wide2: { img: 'ia', alt: 'Information architecture of the onboarding and dashboard', caption: 'Information architecture: public entry, gated product flow.' },
      },
      {
        type: 'section', num: '03', sub: 'Wireframes', title: 'One job per screen.',
        text: 'Low fidelity locked structure and order first. A rejected version put the account toggle next to the first fields; people switched type and lost their data. Separating the decision from the data is a data-loss prevention pattern, not a preference.',
        layout: 'split', portrait: { img: 'wireframes', alt: 'Low-fidelity wireframes of the onboarding steps' },
      },
      {
        type: 'section', num: '04', sub: 'Key screens', title: 'A decision, then a form.',
        text: 'The first screen asks one thing. Personal details come grouped, with the stepper always showing what is left.',
        pair: [
          { img: 'choose', alt: 'Choose your account screen with business and freelancer options' },
          { img: 'personal', alt: 'Personal details form with the persistent stepper' },
        ],
        pairEven: true,
      },
      {
        type: 'section', num: '05', sub: 'States', title: 'Designed for the moments that fail.',
        text: 'Errors appear field by field as people leave each input, not on submit. Verification has a pending state with a timeline, so waiting reads as expected, not broken.',
        pair: [
          { img: 'errors', alt: 'Personal details form showing inline validation errors' },
          { img: 'verify', alt: 'Verify your account screen with pending document review' },
        ],
        pairEven: true,
      },
      {
        type: 'section', num: '06', sub: 'First use', title: 'A checklist instead of an empty dashboard.',
        text: 'After verification, people land on a setup checklist with one clear next action instead of every option at once.',
        layout: 'split', reverse: true, portrait: { img: 'dashboard', alt: 'Dashboard with a setup checklist and progress' },
      },
      {
        type: 'section', num: '07', sub: 'Reflections', title: 'What a real engagement would change.',
        text: 'KYC can span days, so the flow needs save and resume. Compliance was simulated here; with real AML rules I would map legal requirements before locking one question per screen. And the rejected layout deserved a fair build to test against, not a strawman.',
      },
    ],
    results: {
      sub: 'Outcome',
      title: 'Designed against the known drop-off points.',
      text: 'A concept, not a shipped product: no live metrics. What it does measure is structure, each decision mapped to a documented cause of abandonment.',
      stats: [
        ['0', 'account gates before first value'],
        ['1', 'question per screen'],
        ['6', 'steps visible from screen one'],
      ],
      source: 'Benchmarks: Baymard Institute, 2024.',
    },
  },
  pt: {
    seoTitle: 'NorthPay | Onboarding fintech | Dhiego Cristofolini',
    description:
      'Conceito de onboarding e KYC fintech: tipo de conta primeiro, uma pergunta por tela e um stepper visível desde o primeiro passo.',
    cat: 'Conceito de produto · Fintech',
    title: 'NorthPay',
    sub: 'Onboarding como superfície de produto.',
    cover: 'Onboard',
    introTitle: 'Todo campo fica entre o usuário e o produto.',
    intro:
      'Produtos financeiros precisam coletar dados sensíveis antes de alguém ver valor, o que faz do onboarding a parte mais frágil do fluxo. Todo campo está ali porque a regulação exige. A ordem em que esses campos aparecem é decisão de design.',
    meta: [
      ['Papel', 'Product Designer'],
      ['Tipo', 'Projeto conceitual'],
      ['Escopo', 'Cadastro, KYC, primeiro uso'],
      ['Duração', '8 semanas'],
    ],
    blocks: [
      {
        type: 'section', num: '01', sub: 'Problema', title: 'Três partes, uma sequência frágil.',
        text: 'O usuário pergunta por que demora tanto. O negócio pergunta onde as pessoas desistem. O compliance precisa de todos os campos. A solução não é ter menos campos, é como eles são apresentados.',
        stats: [
          ['19%', 'desistem quando obrigados a criar conta antes de ver valor (Baymard, 2024)'],
          ['3', 'fases: tipo de conta, identidade, verificação'],
          ['6', 'etapas, todas visíveis desde a primeira tela'],
        ],
      },
      {
        type: 'section', num: '02', sub: 'Fluxo e AI', title: 'Tipo de conta primeiro. Todo campo depois depende dele.',
        text: 'Escolher o tipo de conta antes de abrir qualquer formulário elimina a pior falha: trocar de tipo no meio do cadastro e perder tudo o que já foi digitado.',
        wide: { img: 'flow', alt: 'Fluxograma do onboarding com ramos pessoal e empresa', caption: 'Fluxo: uma entrada, dois ramos, uma etapa de verificação.' },
        wide2: { img: 'ia', alt: 'Arquitetura de informação do onboarding e do dashboard', caption: 'Arquitetura de informação: entrada pública, fluxo do produto protegido.' },
      },
      {
        type: 'section', num: '03', sub: 'Wireframes', title: 'Uma tarefa por tela.',
        text: 'A baixa fidelidade travou estrutura e ordem primeiro. Uma versão descartada colocava a escolha de conta ao lado dos primeiros campos; as pessoas trocavam de tipo e perdiam os dados. Separar a decisão dos dados é um padrão contra perda de dados, não preferência.',
        layout: 'split', portrait: { img: 'wireframes', alt: 'Wireframes de baixa fidelidade das etapas do onboarding' },
      },
      {
        type: 'section', num: '04', sub: 'Telas-chave', title: 'Uma decisão, depois um formulário.',
        text: 'A primeira tela pergunta uma coisa só. Os dados pessoais vêm agrupados, com o stepper sempre mostrando o que falta.',
        pair: [
          { img: 'choose', alt: 'Tela de escolha de conta com opções empresa e autônomo' },
          { img: 'personal', alt: 'Formulário de dados pessoais com o stepper fixo' },
        ],
        pairEven: true,
      },
      {
        type: 'section', num: '05', sub: 'Estados', title: 'Desenhado para os momentos que falham.',
        text: 'Os erros aparecem campo a campo quando a pessoa sai de cada input, não no envio. A verificação tem um estado pendente com prazo, então esperar parece previsto, não quebrado.',
        pair: [
          { img: 'errors', alt: 'Formulário de dados pessoais mostrando erros de validação inline' },
          { img: 'verify', alt: 'Tela de verificação de conta com análise de documento pendente' },
        ],
        pairEven: true,
      },
      {
        type: 'section', num: '06', sub: 'Primeiro uso', title: 'Um checklist em vez de um dashboard vazio.',
        text: 'Depois da verificação, a pessoa chega a um checklist de configuração com uma próxima ação clara, em vez de todas as opções de uma vez.',
        layout: 'split', reverse: true, portrait: { img: 'dashboard', alt: 'Dashboard com checklist de configuração e progresso' },
      },
      {
        type: 'section', num: '07', sub: 'Reflexões', title: 'O que um projeto real mudaria.',
        text: 'KYC pode levar dias, então o fluxo precisa salvar e retomar. O compliance foi simulado aqui; com regras reais de PLD eu mapearia os requisitos legais antes de fechar uma pergunta por tela. E o layout descartado merecia uma versão bem feita para comparar, não um espantalho.',
      },
    ],
    results: {
      sub: 'Resultado',
      title: 'Desenhado contra os pontos de abandono conhecidos.',
      text: 'Um conceito, não um produto lançado: sem métricas reais. O que ele mede é estrutura, cada decisão ligada a uma causa documentada de abandono.',
      stats: [
        ['0', 'barreiras de cadastro antes do primeiro valor'],
        ['1', 'pergunta por tela'],
        ['6', 'etapas visíveis desde a primeira tela'],
      ],
      source: 'Referências: Baymard Institute, 2024.',
    },
  },
};
