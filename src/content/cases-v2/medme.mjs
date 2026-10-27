// MedMe case. Sources: Dhiego\'s own account of the project (Oct 2026) and his
// published résumé (role, period, research, +6% checkout, 20+ -> 12-14 fields).
// Screens from Figma file lea2M353Oe9r6wjVSSfupp; scenes generated in Magnific
// (Seedream 5 Pro) with the real screens composited in; artifacts rendered
// from the same account. No figures or citations beyond those sources.
export default {
  slug: 'medme',
  hero: { src: '/assets/img/case/medme/hero.webp' },
  en: {
    seoTitle: 'MedMe | Home appointments and exams | Dhiego Cristofolini',
    description:
      'Product design case: booking for home and in-clinic appointments and exams, with token-verified visits and payment held by MedMe until the service is done.',
    cat: 'Healthtech · Product design',
    title: 'MedMe',
    sub: 'Home appointments & exams',
    cover: 'MedMe',
    introTitle: 'Booking exams and appointments inside a clinic ecommerce',
    intro:
      'MedMe is a Curitiba-based ecommerce for clinics: medicine delivery, health and vaccination campaigns, partner services like eye tests, and stock distribution for clinics across Paraná. I helped restructure the ecommerce and led the design of what brought me in: booking appointments and exams, at home or in a clinic.',
    meta: [
      ['Role', 'Senior Product Designer (contract)'],
      ['Period', 'Jan – Aug 2025'],
      ['Scope', 'Booking, home visits, payment, ecommerce restructure'],
      ['Research', 'Interviews and usability tests with patients and professionals'],
    ],
    blocks: [
      { type: 'wide', img: 'ctx-sofa', alt: 'A patient on her sofa booking exams on the MedMe app', caption: 'Exams and appointments booked from the couch, delivered at home or in a clinic.' },
      {
        type: 'section', num: '01', sub: 'The problem', title: 'Patients had to check each clinic on their own',
        text: 'Competitors made people pick a clinic before knowing if it could do everything they needed. A mismatch meant starting over on another clinic\'s site, with new sign-ups and exam names typed by hand.',
        artifact: { img: 'art-audit', alt: 'Competitive audit comparing competitors\' booking order with MedMe\'s inverted flow' },
      },
      {
        type: 'section', num: '02', sub: 'Research', title: 'The problem was the order of the steps',
        text: 'I interviewed more than ten people from the target audience and tested the flows with patients and healthcare professionals. What slowed people down was the order of the decisions, more than any single screen.',
      },
      {
        type: 'section', num: '03', sub: 'Decision', title: 'The clinic moved to the last step',
        text: 'Patients pick home or clinic and scan or choose their exams. Only then do times appear, and only clinics that cover every service at that time show up, with price.',
        wide: { img: 'board-booking', alt: 'The five booking screens in sequence: schedule, unit, review, payment, confirmation' },
      },
      {
        type: 'section', num: '04', sub: 'Decision', title: 'What could go wrong on a home visit',
        text: 'Sending a health professional to a stranger\'s home raises questions a delivery app never has to answer. I listed the seven that could break a visit, and each one needed an answer inside the product before launch.',
        artifact: { img: 'art-risk', alt: 'Risk map linking seven open questions to the mechanism that answers each' },
      },
      {
        type: 'section', num: '05', sub: 'Decision', title: 'Codes exchanged at each handoff',
        text: 'Clinic and professional swap tokens before the kit and address are released. Patient and professional swap codes at the door. The patient confirms the end, and only then does MedMe release the payment it held.',
        artifact: { img: 'art-blueprint', alt: 'Service blueprint of a home visit across patient, MedMe, clinic and professional' },
        pair: [
          { img: 'ctx-door', alt: 'A patient at the door checks the professional\'s code on the MedMe app', caption: 'At the door: the visit starts only if the codes match.' },
          { img: 'ctx-kitchen', alt: 'The MedMe app on a kitchen counter showing the professional in transit', caption: 'While waiting: live status and how to prepare.' },
        ],
        wide2: { img: 'ctx-hands', alt: 'A gloved professional and a patient each holding a phone, each entering the other\'s code', caption: 'Each side shows its own code and enters the other\'s.' },
      },
      {
        type: 'section', num: '06', sub: 'Decision', title: 'A payment step that opens with the total only',
        text: 'Payment opens with one number, two switches, one coupon field and three ways to pay. The breakdown, what the balance covers and the CPF field open only when someone asks for them.',
        artifact: { img: 'art-disclosure', alt: 'The MedMe payment step closed and open: total, balance switch, coupon and CPF, and the breakdown each one reveals on request' },
      },
    ],
    results: {
      sub: 'Results',
      title: 'Results from testing and the first month',
      text: 'The checkout figures come from the ecommerce restructure: progressive disclosure and fewer fields, measured in the first month after launch.',
      stats: [
        ['48%', 'faster booking in usability tests'],
        ['+6%', 'checkout conversion, measured in the first month'],
        ['12–14', 'checkout fields, down from 20+, with progressive disclosure'],
        ['3', 'verified handoffs before the held payment is released'],
        ['4+', 'APIs used and documented'],
      ],
    },
  },
  pt: {
    seoTitle: 'MedMe | Consultas e exames em casa | Dhiego Cristofolini',
    description:
      'Case de product design: consultas e exames em casa ou na clínica, com visitas verificadas por token e pagamento retido pela MedMe até o fim do serviço.',
    cat: 'Healthtech · Product design',
    title: 'MedMe',
    sub: 'Consultas e exames domiciliares',
    cover: 'MedMe',
    introTitle: 'Agendamento de exames e consultas dentro de um ecommerce de clínicas',
    intro:
      'A MedMe é um ecommerce para clínicas, de Curitiba: delivery de remédios, campanhas de saúde e vacinação, serviços de parceiros como teste de visão e distribuição de estoque para clínicas no Paraná. Participei da reestruturação do ecommerce e liderei o design do que me trouxe para a MedMe: o agendamento de consultas e exames, em casa ou na clínica.',
    meta: [
      ['Papel', 'Senior Product Designer (contrato)'],
      ['Período', 'Jan – Ago 2025'],
      ['Escopo', 'Agendamento, visitas em casa, pagamento, reestruturação do ecommerce'],
      ['Pesquisa', 'Entrevistas e testes de usabilidade com pacientes e profissionais'],
    ],
    blocks: [
      { type: 'wide', img: 'ctx-sofa', alt: 'Uma paciente no sofá agendando exames no app da MedMe', caption: 'Exames e consultas agendados do sofá, feitos em casa ou na clínica.' },
      {
        type: 'section', num: '01', sub: 'O problema', title: 'O paciente tinha que conferir cada clínica sozinho',
        text: 'Nos concorrentes, a pessoa escolhia a clínica antes de saber se ela fazia tudo o que precisava. Qualquer desencontro significava recomeçar no site de outra clínica, com cadastro novo e nome de exame digitado à mão.',
        artifact: { img: 'art-audit', alt: 'Auditoria comparando a ordem de agendamento dos concorrentes com o fluxo invertido da MedMe' },
      },
      {
        type: 'section', num: '02', sub: 'Pesquisa', title: 'O problema estava na ordem das etapas',
        text: 'Entrevistei mais de dez pessoas do público-alvo e testei os fluxos com pacientes e profissionais de saúde. O que travava as pessoas era a ordem das decisões, mais do que qualquer tela.',
      },
      {
        type: 'section', num: '03', sub: 'Decisão', title: 'A clínica passou para o último passo',
        text: 'O paciente escolhe casa ou clínica e escaneia ou escolhe os exames. Só então aparecem os horários, e só as clínicas que fazem todos os serviços naquele horário, com preço.',
        wide: { img: 'board-booking', alt: 'As cinco telas do agendamento em sequência: horário, unidade, revisão, pagamento, confirmação' },
      },
      {
        type: 'section', num: '04', sub: 'Decisão', title: 'O que podia dar errado numa visita em casa',
        text: 'Mandar um profissional de saúde para a casa de um desconhecido levanta perguntas que um app de entrega nunca precisa responder. Listei as sete que podiam quebrar uma visita, e cada uma precisava de resposta dentro do produto antes do lançamento.',
        artifact: { img: 'art-risk', alt: 'Mapa de riscos ligando sete perguntas ao mecanismo que responde cada uma' },
      },
      {
        type: 'section', num: '05', sub: 'Decisão', title: 'Códigos trocados em cada passagem',
        text: 'Clínica e profissional trocam tokens antes de o material e o endereço serem liberados. Cliente e profissional trocam códigos na porta. O cliente confirma o fim, e só então a MedMe libera o pagamento que reteve.',
        artifact: { img: 'art-blueprint', alt: 'Service blueprint de uma visita em casa entre cliente, MedMe, clínica e profissional' },
        pair: [
          { img: 'ctx-door', alt: 'Uma paciente na porta confere o código da profissional no app da MedMe', caption: 'Na porta: a visita só começa se os códigos baterem.' },
          { img: 'ctx-kitchen', alt: 'O app da MedMe no balcão da cozinha mostrando a profissional a caminho', caption: 'Na espera: status ao vivo e como se preparar.' },
        ],
        wide2: { img: 'ctx-hands', alt: 'Uma profissional de luva e uma paciente, cada uma digitando o código da outra', caption: 'Cada lado mostra o seu código e digita o do outro.' },
      },
      {
        type: 'section', num: '06', sub: 'Decisão', title: 'Um pagamento que abre só com o total',
        text: 'O pagamento abre com um número, duas chaves, um campo de cupom e três formas de pagar. O detalhamento, o que o saldo cobre e o campo de CPF só abrem quando a pessoa pede.',
        artifact: { img: 'art-disclosure', alt: 'A etapa de pagamento da MedMe fechada e aberta: total, chave de saldo, cupom e CPF, e o detalhe que cada um revela quando pedido' },
      },
    ],
    results: {
      sub: 'Resultados',
      title: 'Resultados dos testes e do primeiro mês',
      text: 'Os números do checkout vêm da reestruturação do ecommerce: revelação progressiva e menos campos, medidos no primeiro mês após o lançamento.',
      stats: [
        ['48%', 'mais rápido para agendar, em testes de usabilidade'],
        ['+6%', 'de conversão no checkout, medido no primeiro mês'],
        ['12–14', 'campos no checkout, antes eram mais de 20, com revelação progressiva'],
        ['3', 'passagens verificadas antes de liberar o pagamento retido'],
        ['4+', 'APIs usadas e documentadas'],
      ],
    },
  },
};
