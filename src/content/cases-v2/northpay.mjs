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
    sub: 'Fintech onboarding and KYC concept',
    cover: 'Onboard',
    introTitle: 'Onboarding for a fintech account',
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
        type: 'section', num: '01', sub: 'Problem', title: 'Users, the business and compliance want different things',
        text: 'Users want to know why it takes so long, the business wants to know where people drop, and compliance needs every field. Cutting fields was off the table, so the work went into how they are presented.',
        stats: [
          ['18%', 'of US shoppers who abandoned a checkout blame forced account creation (Baymard)'],
          ['3', 'phases: account type, identity, verification'],
          ['6', 'steps, all visible from the first screen'],
        ],
      },
      {
        type: 'section', num: '02', sub: 'Flow', title: 'Choosing the account type before any form',
        text: 'Choosing the account type before any form opens removes the worst failure: switching type mid-form and losing everything already typed.',
        artifact: { img: 'art-flow', alt: 'Onboarding flow in three phases: account type (freelancer or business), identity with field-by-field validation, and verification ending in a setup checklist' },
      },
      {
        type: 'section', num: '03', sub: 'Wireframes', title: 'One job per screen.',
        text: 'Low fidelity locked structure and order first. A rejected version put the account toggle next to the first fields; switching type there would wipe everything already typed. Keeping the decision on its own screen prevents that loss.',
        layout: 'split', portrait: { img: 'wireframes', alt: 'Low-fidelity wireframes of the onboarding steps' },
      },
      {
        type: 'section', num: '04', sub: 'Key screens', title: 'The first screen asks one question',
        text: 'The first screen asks one thing. Personal details come grouped, with the stepper always showing what is left.',
        pair: [
          { img: 'choose', alt: 'Choose your account screen with business and freelancer options' },
          { img: 'personal', alt: 'Personal details form with the persistent stepper' },
        ],
        pairEven: true,
      },
      {
        type: 'section', num: '05', sub: 'States', title: 'Errors and waiting',
        text: 'Errors appear field by field as people leave each input, instead of all at once on submit. Verification has a pending state with a timeline, so people can tell the wait is normal.',
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
      text: 'This concept never shipped, so there are no live metrics. Each decision is mapped to a documented cause of abandonment instead.',
      stats: [
        ['1', 'decision before the first field'],
        ['1', 'question per screen'],
        ['6', 'steps visible from screen one'],
      ],
      source: 'Benchmark: Baymard Institute, checkout abandonment research.',
    },
  },
  pt: {
    seoTitle: 'NorthPay | Onboarding fintech | Dhiego Cristofolini',
    description:
      'Conceito de onboarding e KYC fintech: tipo de conta primeiro, uma pergunta por tela e um stepper visível desde o primeiro passo.',
    cat: 'Conceito de produto · Fintech',
    title: 'NorthPay',
    sub: 'Conceito de onboarding e KYC fintech',
    cover: 'Onboard',
    introTitle: 'Onboarding de uma conta fintech',
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
        type: 'section', num: '01', sub: 'Problema', title: 'Usuário, negócio e compliance querem coisas diferentes',
        text: 'O usuário quer saber por que demora tanto, o negócio quer saber onde as pessoas desistem, e o compliance precisa de todos os campos. Cortar campo não era opção, então o trabalho foi em como eles são apresentados.',
        stats: [
          ['18%', 'de quem abandonou um checkout nos EUA culpa a criação de conta obrigatória (Baymard)'],
          ['3', 'fases: tipo de conta, identidade, verificação'],
          ['6', 'etapas, todas visíveis desde a primeira tela'],
        ],
      },
      {
        type: 'section', num: '02', sub: 'Fluxo', title: 'Escolher o tipo de conta antes de qualquer formulário',
        text: 'Escolher o tipo de conta antes de abrir qualquer formulário elimina a pior falha: trocar de tipo no meio do cadastro e perder tudo o que já foi digitado.',
        artifact: { img: 'art-flow', alt: 'Fluxo do onboarding em três fases: tipo de conta (freelancer ou empresa), identidade com validação campo a campo e verificação terminando num checklist de configuração' },
      },
      {
        type: 'section', num: '03', sub: 'Wireframes', title: 'Uma tarefa por tela.',
        text: 'A baixa fidelidade travou estrutura e ordem primeiro. Uma versão descartada colocava a escolha de conta ao lado dos primeiros campos; trocar de tipo ali apagaria tudo o que já foi digitado. Deixar a decisão numa tela própria evita essa perda.',
        layout: 'split', portrait: { img: 'wireframes', alt: 'Wireframes de baixa fidelidade das etapas do onboarding' },
      },
      {
        type: 'section', num: '04', sub: 'Telas-chave', title: 'A primeira tela faz uma pergunta só',
        text: 'A primeira tela pergunta uma coisa só. Os dados pessoais vêm agrupados, com o stepper sempre mostrando o que falta.',
        pair: [
          { img: 'choose', alt: 'Tela de escolha de conta com opções empresa e autônomo' },
          { img: 'personal', alt: 'Formulário de dados pessoais com o stepper fixo' },
        ],
        pairEven: true,
      },
      {
        type: 'section', num: '05', sub: 'Estados', title: 'Erros e espera',
        text: 'Os erros aparecem campo a campo quando a pessoa sai de cada input, em vez de todos juntos no envio. A verificação tem um estado pendente com prazo, para a pessoa saber que a espera é normal.',
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
      text: 'Este conceito não foi lançado, então não tem métricas reais. Cada decisão está ligada a uma causa documentada de abandono.',
      stats: [
        ['1', 'decisão antes do primeiro campo'],
        ['1', 'pergunta por tela'],
        ['6', 'etapas visíveis desde a primeira tela'],
      ],
      source: 'Referência: Baymard Institute, pesquisa de abandono de checkout.',
    },
  },
};
