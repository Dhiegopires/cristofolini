// MedMe case. Sources: Dhiego's own account of the project (Oct 2026) and his
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
    introTitle: 'Ecommerce for clinics. Booking for people.',
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
        type: 'section', num: '01', sub: 'The problem', title: 'Booking care was the patient’s job.',
        text: 'Competitors made people pick a clinic before knowing if it could do everything they needed. A mismatch meant starting over on another clinic’s site, with new sign-ups and exam names typed by hand.',
        artifact: { img: 'art-audit', alt: 'Competitive audit comparing competitors’ booking order with MedMe’s inverted flow' },
      },
      {
        type: 'section', num: '02', sub: 'Research', title: 'More than ten conversations, one pattern.',
        text: 'I interviewed more than ten people from the target audience and tested the flows with patients and healthcare professionals. The friction was never one screen: it was the order of decisions.',
      },
      {
        type: 'section', num: '03', sub: 'Decision', title: 'Exams first. Then time. Then the clinic.',
        text: 'Patients pick home or clinic and scan or choose their exams. Only then do times appear, and only clinics that cover every service at that time show up, with price.',
        wide: { img: 'board-booking', alt: 'The five booking screens in sequence: schedule, unit, review, payment, confirmation' },
      },
      {
        type: 'section', num: '04', sub: 'Decision', title: 'Trust before convenience.',
        text: 'A professional at a stranger’s door is not a delivery. Before anything shipped, every question that could break a visit needed an answer built into the product.',
        artifact: { img: 'art-risk', alt: 'Risk map linking seven open questions to the mechanism that answers each' },
      },
      {
        type: 'section', num: '05', sub: 'Decision', title: 'A token at every handoff.',
        text: 'Clinic and professional swap tokens before the kit and address are released. Patient and professional swap codes at the door. The patient confirms the end, and only then does MedMe release the payment it held.',
        artifact: { img: 'art-blueprint', alt: 'Service blueprint of a home visit across patient, MedMe, clinic and professional' },
        pair: [
          { img: 'ctx-door', alt: 'A patient at the door checks the professional’s code on the MedMe app', caption: 'At the door: the visit starts only if the codes match.' },
          { img: 'ctx-kitchen', alt: 'The MedMe app on a kitchen counter showing the professional in transit', caption: 'While waiting: live status and how to prepare.' },
        ],
        wide2: { img: 'ctx-hands', alt: 'A gloved professional and a patient each holding a phone, each entering the other’s code', caption: 'Each side shows its own code and enters the other’s.' },
      },
    ],
    results: {
      sub: 'Results',
      title: 'Faster to book. Safer to receive.',
      stats: [
        ['+48%', 'faster booking'],
        ['+6%', 'checkout conversion, measured in the first month'],
        ['12–14', 'checkout fields, down from 20+, with progressive disclosure'],
        ['+10', 'target users interviewed'],
        ['3', 'levels of payment custody and security'],
        ['+4', 'APIs used and documented'],
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
    introTitle: 'Ecommerce para clínicas. Agendamento para pessoas.',
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
        type: 'section', num: '01', sub: 'O problema', title: 'Agendar era trabalho do paciente.',
        text: 'Nos concorrentes, a pessoa escolhia a clínica antes de saber se ela fazia tudo o que precisava. Qualquer desencontro significava recomeçar no site de outra clínica, com cadastro novo e nome de exame digitado à mão.',
        artifact: { img: 'art-audit', alt: 'Auditoria comparando a ordem de agendamento dos concorrentes com o fluxo invertido da MedMe' },
      },
      {
        type: 'section', num: '02', sub: 'Pesquisa', title: 'Mais de dez conversas, um padrão.',
        text: 'Entrevistei mais de dez pessoas do público-alvo e testei os fluxos com pacientes e profissionais de saúde. O atrito nunca era uma tela: era a ordem das decisões.',
      },
      {
        type: 'section', num: '03', sub: 'Decisão', title: 'Primeiro os exames. Depois o horário. Por último a clínica.',
        text: 'O paciente escolhe casa ou clínica e escaneia ou escolhe os exames. Só então aparecem os horários, e só as clínicas que fazem todos os serviços naquele horário, com preço.',
        wide: { img: 'board-booking', alt: 'As cinco telas do agendamento em sequência: horário, unidade, revisão, pagamento, confirmação' },
      },
      {
        type: 'section', num: '04', sub: 'Decisão', title: 'Confiança antes de conveniência.',
        text: 'Um profissional na porta de um desconhecido não é uma entrega. Antes de qualquer coisa ir ao ar, cada pergunta que podia quebrar uma visita precisava de uma resposta dentro do produto.',
        artifact: { img: 'art-risk', alt: 'Mapa de riscos ligando sete perguntas ao mecanismo que responde cada uma' },
      },
      {
        type: 'section', num: '05', sub: 'Decisão', title: 'Um token em cada passagem.',
        text: 'Clínica e profissional trocam tokens antes de o material e o endereço serem liberados. Cliente e profissional trocam códigos na porta. O cliente confirma o fim, e só então a MedMe libera o pagamento que reteve.',
        artifact: { img: 'art-blueprint', alt: 'Service blueprint de uma visita em casa entre cliente, MedMe, clínica e profissional' },
        pair: [
          { img: 'ctx-door', alt: 'Uma paciente na porta confere o código da profissional no app da MedMe', caption: 'Na porta: a visita só começa se os códigos baterem.' },
          { img: 'ctx-kitchen', alt: 'O app da MedMe no balcão da cozinha mostrando a profissional a caminho', caption: 'Na espera: status ao vivo e como se preparar.' },
        ],
        wide2: { img: 'ctx-hands', alt: 'Uma profissional de luva e uma paciente, cada uma digitando o código da outra', caption: 'Cada lado mostra o seu código e digita o do outro.' },
      },
    ],
    results: {
      sub: 'Resultados',
      title: 'Mais rápido para agendar. Mais seguro para receber.',
      stats: [
        ['+48%', 'de velocidade no agendamento'],
        ['+6%', 'de conversão no checkout, medido no primeiro mês'],
        ['12–14', 'campos no checkout, antes eram mais de 20, com revelação progressiva'],
        ['+10', 'pessoas do público-alvo entrevistadas'],
        ['3', 'níveis de custódia de pagamento e segurança'],
        ['+4', 'APIs usadas e documentadas'],
      ],
    },
  },
};
