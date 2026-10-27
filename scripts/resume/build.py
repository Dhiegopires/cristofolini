"""Builds the résumé HTML (EN + PT) that print.mjs turns into the PDFs.
Layout replicates the original WeasyPrint résumé; text matches cv.md and
the site (2026-10-27 corrections: no 'Founder', no +35% projection)."""
import html, os

HERE = os.path.dirname(os.path.abspath(__file__))
e = html.escape

DATA = {
 'EN': {
  'lang': 'en',
  'contact': ['Email: dhiegopiresc@gmail.com', 'Phone: +55 41 99628 9002', 'Location: Curitiba, Brazil', 'Remote · Contract / B2B / EOR'],
  'h': ['Portfolio & Social', 'Summary', 'Experience', 'Skills', 'Languages', 'Education'],
  'links': [('Portfolio', 'https://cristofolini.site/'), ('LinkedIn', 'https://linkedin.com/in/dhiego-cristofolini'), ('Behance', 'https://behance.net/dhiegopires')],
  'summary': [
   "Senior Product Designer with 7 years building SaaS, B2B, B2C, and B2B2C products, working end to end across Product Discovery, UX Research, Interaction Design, UI Design, and Design Systems.",
   "Some results I carry with me: I redesigned Selo H's landing page and form in one week, generating 5x more leads in 30 days and cutting bounce rate 40%. At Instivo, I translated complex business rules into a rule engine, measuring in real usability testing a ~70% reduction in configuration time. At MedMe, I measured a +6% checkout conversion lift in month one. And I grew Fiter's organic traffic by nearly 100% in three months, implementing measurement that didn't exist before.",
   "I built a four-layer design token architecture that cuts front-end delivery time by up to 70%, apply WCAG 2.2 AA across every component I build, and have hands-on knowledge of HTML, CSS, JavaScript, WordPress, and Webflow beyond the design tool. I've coordinated cross-functional teams of 5-10 people (engineering, product, QA, scrum), including mentoring junior designers.",
  ],
  'jobs': [
   ('AUG 2025 – Present', 'Senior Product Designer, Vellumwire (Independent)', [
    "Product design for international SaaS clients, from discovery to production-ready UI: onboarding, dashboards, pricing, checkout, landing pages, institutional sites, organic traffic strategy, digital presence, and e-commerce, using a User Experience metrics strategy.",
    "Redesigned Selo H's landing page and form in one week, writing the front-end myself, generating 5x more leads in 30 days and cutting bounce rate 40%.",
    "Applied WCAG 2.2 AA across every design system component, documented in specs and validated through accessibility audits.",
    "Implemented performance measurement that didn't exist before, defined SEO and growth strategy, and grew organic traffic by nearly 100% in three months, establishing a 2% conversion rate as a measurable baseline for the first time.",
    "Built a component library and four-layer token design system, ready to serve multiple client styles by swapping only tokens and component versions, even when the change is structural; cuts front-end delivery time by up to 70% and reduces layout errors when coding with AI.",
    "Lead research, define flows, information architecture, and prototyping in partnership with product and engineering stakeholders, validating solutions before delivery.",
   ]),
   ('JAN 2025 – AUG 2025', 'Senior Product Designer, MedMe Saúde (Contractor)', [
    "Designed an on-demand healthcare platform from zero (patients book in-home visits with independent healthcare professionals), including identity verification, escrow payment, and three-sided accountability between patient, professional, and clinic.",
    "Measured a +6% checkout conversion lift in month one after progressive disclosure and field reduction from 20+ to 12-14 fields, informed by Baymard benchmarks.",
    "Built a responsive design system for scheduling and clinical dashboards, consistent across web and mobile.",
    "Ran research and usability testing with patients and healthcare professionals, defining flows and prototyping validated solutions before delivery.",
    "Collaborated with a cross-functional team of 4 engineers and 3 marketing.",
   ]),
   ('JAN 2024 – DEC 2024', 'Product Designer, Freelance', [
    "Built Catalise Capital's site entirely in code, with no visual builder, and published ABGI's site on WordPress: theming, content structure, and on-page performance.",
    "Delivered Product Design, Web Design, and branding projects for businesses and startups at different stages of maturity.",
    "Led discovery, defined requirements, and structured information architecture before any visual decisions.",
    "Delivered responsive interfaces focused on performance, usability, and conversion, aligned to each client's business needs.",
   ]),
   ('JUN 2023 – DEC 2023', 'Product Designer, Instivo (Contractor)', [
    "Worked across multiple squads within the Instivo product, in parallel with other designers responsible for distinct modules of the same system.",
    "Introduced token architecture and a scalable design system at Instivo, building and refining components incrementally, which was later adopted by the rest of the design team.",
    "Designed, together with the design team, the product's complete docking module: registration, calendar, vehicle records, maintenance, parking, driver-to-vehicle assignment, and inventory.",
    "Translated complex business rules into a four-part rule engine that connects and underpins this module and others across the system.",
    "Measured in usability testing with real users a ~70% reduction in configuration time and 5x faster setup and activation of a new unit.",
    "Designed multiple analytics dashboards within the product, covering operational and managerial views for different user profiles.",
    "Led discovery and interviews with retail managers, partnering with the PM, translating governance logic into intuitive operational flows.",
   ]),
   ('JUN 2022 – JUN 2023', 'Product Designer, Nineblocks (Contractor)', [
    "Developed landing pages and web and mobile interfaces focused on conversion for fan-token and NFT digital platforms.",
    "Created 2D illustration and iconography for product and visual identity.",
    "Applied UI design and user experience principles across platform evolution, in collaboration with product and marketing teams.",
   ]),
   ('JAN 2022 – JUN 2022', 'UI/UX Designer, Vega I.T (Contractor)', [
    "Developed high-conversion sites and contributed to UX/UI for a guest-facing product covering the full guest journey: booking, ratings, in-room service requests, TV, internet, and hotel services.",
    "Also worked on the application's front-end for an extended period, covering operational needs when demand required it, in addition to design work.",
    "Developed social media campaigns for clients, in addition to product work.",
    "Developed booking portals and internal management tools for the hospitality tech segment.",
    "Structured journeys and flows for operational applications, with reusable interface components and patterns across products.",
    "Collaborated with a pool of approximately 20 developers organized into on-demand teams.",
   ]),
   ('JUN 2019 – DEC 2021', 'Product Designer, Ensight (Contractor)', [
    "Led the end-to-end product design process (research, discovery, prototyping, UI, and handoff) for B2B SaaS products, on a team of 5.",
    "Designed Meaple, an app combining event discovery, social coordination, ticketing, and in-event payment into one product, with discovery, research, and competitive analysis (13 competitors mapped), defining personas and priorities before any wireframe.",
    "Prototyped solutions and validated design decisions through A/B testing before handoff to development.",
    "Designed QuaQ, an audience data-capture product for TV networks: the host invites viewers to answer a live questionnaire, entering them for prizes in exchange for their response.",
    "Designed Facto, a marketplace connecting local small business owners with service professionals: profiles with portfolio, ratings, ranking, and social proof, service listings, and an in-app chat to handle the entire process. Designed with the professional's needs at the center, using gamification to drive profile completion and engagement in exchange for more visibility and clients. Delivered the full design in one week under a tight deadline, immediately following the research phase.",
    "Delivered documented interface components and specs across the Meaple ecosystem.",
    "Collaborated with product and development teams on the continuous evolution of the solutions.",
   ]),
  ],
  'skills': [
   ('Front-End & Performance', "Production HTML, CSS, JavaScript · Performance and SEO playbook: inline CSS removal, CDN configuration, media optimization · WordPress and Webflow, end to end"),
   ('Design Systems & Governance', "Design tokens and advanced token architecture (Core, Palette, Brand, Semantic) · Atomic design · Style guides and Storybook-style documentation · Scalable design systems and component libraries · WCAG 2.2 AA, accessibility, and inclusive design · Design QA and implementation audits"),
   ('Research & Strategy', "Product discovery, desk research, and UX research · Market research, personas, and empathy mapping · Contextual inquiry / field studies · User interviews · Journey mapping, opportunity framing, and competitive analysis · Jobs-to-be-done · UX writing (PT-BR)"),
   ('Ideation & Validation', "Design thinking · Design sprints · Card sorting and tree testing · Heuristic evaluation · First-click testing · Usability testing · User flows, information architecture, visual design, and interaction design · Rapid prototyping and microinteractions · A/B testing"),
   ('Business Rules & Regulated Flows', "Translating business rules into customer-centered journeys · Service blueprints and end-to-end flows · Regulated, sensitive flows (identity verification, escrow payment) · Requirements gathering and functional specifications"),
   ('Collaboration & Leadership', "Coordinating cross-functional teams of 5-10 (engineering, product, QA, scrum) · Mentoring junior designers · Product OKR/KPI definition · Design-to-development handoff and spec documentation · Agile / Scrum · Stakeholder management"),
   ('Tools', "Figma, FigJam, Miro, Framer, ProtoPie, Penpot · Adobe Creative Cloud · Google Analytics, Hotjar, Maze · Jira, Trello, Notion · AI-assisted workflows (Claude, Claude Code, Cursor, Antigravity, Lovable, Gemini, ChatGPT)"),
  ],
  'languages': "Portuguese (native) · English (C1-C2)",
  'edu': ('2013 – 2017', "Bachelor's Degree in Design", "Universidade Federal de Santa Catarina (UFSC), Florianópolis, Brazil"),
 },
 'PT': {
  'lang': 'pt-BR',
  'contact': ['E-mail: dhiegopiresc@gmail.com', 'Telefone: +55 41 99628 9002', 'Localização: Curitiba, Brasil', 'Remoto · Contrato / B2B / PJ / EOR'],
  'h': ['Portfólio & Redes', 'Resumo', 'Experiência', 'Habilidades e Qualificações', 'Idiomas', 'Formação'],
  'links': [('Portfólio', 'https://cristofolini.site/'), ('LinkedIn', 'https://linkedin.com/in/dhiego-cristofolini'), ('Behance', 'https://behance.net/dhiegopires')],
  'summary': [
   "Senior Product Designer com 7 anos de experiência no desenvolvimento de produtos digitais SaaS, B2B, B2C e B2B2C, atuando de ponta a ponta em Product Discovery, UX Research, Interaction Design, UI Design e Design Systems.",
   "Alguns resultados que carrego comigo: redesenhei a landing page e o formulário da Selo H em uma semana, gerando 5x mais leads em 30 dias e reduzindo o bounce rate em 40%. Na Instivo, traduzi regra de negócio complexa em um motor de regras, medindo em teste de usabilidade real uma redução de ~70% no tempo de configuração. Na MedMe, medi +6% de conversão no checkout já no primeiro mês. E aumentei o tráfego orgânico da Fiter em quase 100% em três meses, implantando medição que não existia antes.",
   "Construí uma arquitetura de design tokens em quatro camadas que reduz em até 70% o tempo de entrega de front-end, aplico WCAG 2.2 AA em todo componente que crio, e tenho conhecimento prático de HTML, CSS, JavaScript, WordPress e Webflow além da ferramenta de design. Já coordenei times multidisciplinares de 5 a 10 pessoas (engenharia, produto, QA, agilista), incluindo mentoria de designers juniores.",
  ],
  'jobs': [
   ('AGO 2025 – Presente', 'Product Designer Sênior, Vellumwire (Independente)', [
    "Product design para clientes SaaS internacionais, de discovery a UI de produção: onboarding, dashboards, pricing, checkout, landing pages, sites institucionais, estratégia de tráfego orgânico, presença digital e e-commerce, utilizando estratégia de métrica de User Experience.",
    "Redesenhei a landing page e o formulário da Selo H em uma semana, escrevendo o front-end eu mesmo, gerando 5x mais leads em 30 dias e reduzindo o bounce rate em 40%.",
    "Apliquei WCAG 2.2 AA em todo componente de design system, documentado em spec e validado por auditoria de acessibilidade.",
    "Implantei medição de performance que não existia, defini a estratégia de SEO e crescimento, e aumentei o tráfego orgânico em quase 100% em três meses, estabelecendo uma taxa de conversão de 2% como baseline mensurável pela primeira vez.",
    "Construí uma biblioteca de componentes e design system em quatro camadas de tokens, pronta pra atender múltiplos estilos de cliente trocando só token e versão de componente, mesmo quando a mudança é estrutural; reduz em até 70% o tempo de entrega de front-end e o erro de layout ao codar com IA.",
    "Conduzo pesquisa, defino fluxo, arquitetura de informação e prototipação em parceria com stakeholders de produto e engenharia, validando solução antes da entrega.",
   ]),
   ('JAN 2025 – AGO 2025', 'Product Designer Sênior, MedMe Saúde (Contrato)', [
    "Desenhei do zero uma plataforma de saúde on-demand (paciente agenda visita domiciliar com profissional de saúde independente), incluindo verificação de identidade, pagamento em escrow e responsabilização de três lados entre paciente, profissional e clínica.",
    "Medi +6% de conversão no checkout já no primeiro mês após progressive disclosure e redução de 20+ para 12-14 campos, informado por benchmarks Baymard.",
    "Construí um design system responsivo para agendamento e dashboards clínicos, consistente entre plataformas web e mobile.",
    "Conduzi pesquisa e teste de usabilidade com pacientes e profissionais de saúde, definindo fluxo e prototipando solução validada antes da entrega.",
    "Colaborei com um time multidisciplinar de 4 engenheiros e 3 pessoas de marketing.",
   ]),
   ('JAN 2024 – DEZ 2024', 'Product Designer, Freelance', [
    "Construí o site da Catalise Capital inteiro em código, sem construtor visual, e publiquei o site da ABGI em WordPress: theming, estrutura de conteúdo e performance on-page.",
    "Desenvolvi projetos de Product Design, Web Design e branding para empresas e startups em diferentes estágios de maturidade.",
    "Conduzi discovery, defini requisito e arquitetura de informação antes de qualquer decisão visual.",
    "Entreguei interfaces responsivas com foco em performance, usabilidade e conversão, alinhadas à necessidade de negócio de cada cliente.",
   ]),
   ('JUN 2023 – DEZ 2023', 'Product Designer, Instivo (Contrato)', [
    "Atuei em múltiplas squads dentro do produto Instivo, em paralelo com outros designers responsáveis por módulos distintos do mesmo sistema.",
    "Introduzi a arquitetura de tokens e design system escalável na Instivo, criando e ajustando componentes de forma incremental, que passou a ser adotada pelos demais designers do time.",
    "Desenhei, em conjunto com o time de design, o módulo completo de docking do produto: cadastro, calendário, registro de veículo, manutenção, parking, atrelamento de condutor a veículo e estoque.",
    "Traduzi regra de negócio complexa em um motor de regras de quatro partes, responsável por conectar e sustentar esse módulo e os demais do sistema.",
    "Medi em teste de usabilidade com usuário real uma redução de ~70% no tempo de configuração e 5x mais velocidade para estruturar e ativar uma unidade nova.",
    "Desenhei múltiplos dashboards analíticos dentro do produto, cobrindo visão operacional e gerencial para diferentes perfis de usuário.",
    "Liderei discovery e entrevistas com gestores de varejo, em parceria com o PM, traduzindo lógica de governança em fluxo operacional intuitivo.",
   ]),
   ('JUN 2022 – JUN 2023', 'Product Designer, Nineblocks (Contrato)', [
    "Desenvolvi landing pages e interfaces web e mobile focadas em conversão para plataformas digitais de fan tokens e NFTs.",
    "Criei ilustração 2D e iconografia para identidade visual e produto.",
    "Apliquei princípios de UI Design e experiência do usuário na evolução das plataformas, em colaboração com equipes de produto e marketing.",
   ]),
   ('JAN 2022 – JUN 2022', 'UI/UX Designer, Vega I.T (Contrato)', [
    "Desenvolvi sites de alta conversão e contribuí com UI/UX de um produto voltado ao hóspede cobrindo a jornada completa: reserva, avaliação, pedidos no quarto, TV, internet e serviços do hotel.",
    "Atuei também no front-end da aplicação por um período extenso, cobrindo a operação quando a demanda exigia, além do trabalho de design.",
    "Desenvolvi campanhas de mídia social para clientes, além do trabalho de produto.",
    "Desenvolvi portais de reserva e ferramentas internas de gestão para o segmento de hospitality tech.",
    "Estruturei jornadas e fluxos para aplicações operacionais, com componentes e padrões de interface reutilizáveis entre os produtos.",
    "Colaborei com um pool de aproximadamente 20 desenvolvedores organizados em times por demanda.",
   ]),
   ('JUN 2019 – DEZ 2021', 'Product Designer, Ensight (Contrato)', [
    "Liderei o processo de product design de ponta a ponta (research, discovery, prototipação, UI e handoff) para produtos SaaS B2B, em um time de 5 pessoas.",
    "Desenhei o Meaple, app que junta descoberta de evento, coordenação social, ticketing e pagamento no evento em um só produto, com discovery, research e análise competitiva (13 concorrentes mapeados), definindo persona e prioridade antes de qualquer wireframe.",
    "Prototipei solução e validei decisão de design com teste A/B antes do handoff para desenvolvimento.",
    "Desenhei o QuaQ, produto de captação de dados de audiência para redes de TV: o apresentador convida o telespectador a responder questionário ao vivo, e em troca da resposta concorre a prêmios.",
    "Desenhei o Facto, marketplace que conecta pequeno empresário local a profissional de serviço: perfil com portfólio, avaliação, ranking e prova social, cadastro de serviço oferecido, e chat interno pra conduzir todo o processo dentro do app. Desenho focado no profissional, com gamificação pra incentivar conclusão de perfil e engajamento em troca de mais visibilidade e cliente. Entreguei o design completo em uma semana, sob prazo apertado, logo após a etapa de research.",
    "Entreguei componentes e especificações de interface documentadas para o ecossistema Meaple.",
    "Colaborei com times de produto e desenvolvimento na evolução contínua das soluções digitais.",
   ]),
  ],
  'skills': [
   ('Front-End & Performance', "HTML, CSS, JavaScript em produção · Playbook de performance e SEO: remoção de CSS inline, configuração de CDN, otimização de mídia · WordPress e Webflow, ponta a ponta"),
   ('Design Systems & Governança', "Design tokens e arquitetura avançada de tokens (Core, Palette, Brand, Semantic) · Atomic design · Style guides e documentação tipo Storybook · Design systems escaláveis e bibliotecas de componentes · WCAG 2.2 AA, acessibilidade e inclusive design · Design QA e auditorias de implementação"),
   ('Pesquisa & Estratégia', "Product discovery, desk research e UX research · Market research, personas e empathy mapping · Contextual inquiry / field studies · Entrevistas com usuário · Journey mapping, opportunity framing e análise competitiva · Jobs-to-be-done · UX writing (PT-BR)"),
   ('Ideação & Validação', "Design thinking · Design sprints · Card sorting e tree testing · Heuristic evaluation · First-click testing · Testes de usabilidade · User flows, arquitetura da informação, design visual e desenho de interação · Rapid prototyping e microinteractions · A/B testing"),
   ('Regras de Negócio & Fluxos Regulados', "Tradução de regras de negócio em jornadas centradas no cliente · Service blueprints e fluxos ponta a ponta · Fluxos regulados e sensíveis (verificação de identidade, pagamento em escrow) · Levantamento de requisitos e especificações funcionais"),
   ('Colaboração & Liderança', "Coordenação de times multidisciplinares de 5-10 pessoas (engenharia, produto, QA, agilista) · Mentoria de designers juniores · Definição de OKR/KPI de produto · Handoff design-desenvolvimento e documentação de specs · Agile / Scrum · Gestão de stakeholders"),
   ('Ferramentas & Workflow', "Figma, FigJam, Miro, Framer, ProtoPie, Penpot · Adobe Creative Cloud · Google Analytics, Hotjar, Maze · Jira, Trello, Notion · Fluxos com IA (Claude, Claude Code, Cursor, Antigravity, Lovable, Gemini, ChatGPT)"),
  ],
  'languages': "Português (nativo) · Inglês (C1-C2)",
  'edu': ('2013 – 2017', "Bacharelado em Design", "Universidade Federal de Santa Catarina (UFSC), Florianópolis – Brasil"),
 },
}

CSS = """
@page { size: A4; margin: 20pt 0 26pt; }
@page :first { margin-top: 0; }
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: Arial, 'Liberation Sans', Helvetica, sans-serif; color: #1c1c1c; font-size: var(--fs); line-height: 1.5; }
.head { background: #1c1c1c; padding: 22pt 25.5pt 16pt; }
.head h1 { color: #fff; font-size: 20pt; line-height: 1.2; }
.head .tag { color: #c9c9cc; font-size: 8.8pt; margin-top: 8pt; }
.head .contact { color: #a9a9ad; font-size: 8.2pt; margin-top: 8pt; }
.head .contact span + span::before { content: '  ·  '; white-space: pre; }
main { padding: 0 25.5pt; }
h2 { font-size: 11pt; padding-bottom: 3pt; border-bottom: 1px solid #e3e3e3; margin: 15pt 0 6pt; break-after: avoid; }
.links p { font-size: 8.2pt; color: #7a7a7a; line-height: 1.75; }
a { color: #8f5f00; text-decoration: none; }
.summary p { margin-bottom: 4.5pt; }
.jobs { border-left: 1px solid #d6d6d6; margin-left: 2.5pt; }
.job { position: relative; padding-left: 12pt; margin-bottom: 5pt; }
.job::before { content: ''; position: absolute; left: -4.6pt; top: 2.5pt; width: 6pt; height: 6pt; border: 1.6pt solid #8f5f00; border-radius: 50%; background: #fff; }
.job h3 { font-size: 9.6pt; margin-bottom: 3pt; break-after: avoid; }
.job h3 .date { color: #8f5f00; }
.job h3 .sep { color: #1c1c1c; font-weight: normal; }
ul { list-style: none; }
li { position: relative; padding-left: 10pt; color: #333; margin-bottom: 2.6pt; break-inside: avoid; }
li::before { content: ''; position: absolute; left: 1pt; top: 0.62em; width: 2.6pt; height: 2.6pt; background: #7a7a7a; }
.job li { margin-left: 1pt; }
h4 { font-size: 9.2pt; color: #8a8a8a; margin: 8pt 0 3pt; break-after: avoid; }
.skills li, .lang li { color: #1c1c1c; }
.edu h3 { font-size: 9.6pt; font-weight: normal; }
.edu h3 .date { color: #8f5f00; font-weight: bold; }
.edu p { font-size: 8.2pt; color: #7a7a7a; }
"""

def build(key):
    d = DATA[key]
    fs = '9pt' if key == 'EN' else '8.6pt'
    h = d['h']
    jobs = ''.join(
        f'<section class="job"><h3><span class="date">{e(date)}</span> <span class="sep">&nbsp;|&nbsp;</span> {e(role)}</h3><ul>'
        + ''.join(f'<li>{e(b)}</li>' for b in bullets) + '</ul></section>'
        for date, role, bullets in d['jobs'])
    skills = ''.join(f'<h4>{e(t)}</h4><ul><li>{e(s)}</li></ul>' for t, s in d['skills'])
    date, deg, school = d['edu']
    return f"""<!doctype html><html lang="{d['lang']}"><head><meta charset="utf-8">
<title>Dhiego Pires Cristofolini - Senior Product Designer</title>
<style>:root{{--fs:{fs}}}{CSS}</style></head><body>
<header class="head"><h1>Dhiego Pires Cristofolini</h1>
<p class="tag">Senior Product Designer | Design Systems, Accessibility (WCAG 2.2 AA) &amp; AI-assisted Workflows | B2B SaaS &amp; Conversion-Driven UX</p>
<p class="contact">{''.join(f'<span>{e(c)}</span>' for c in d['contact'])}</p></header>
<main>
<section class="links"><h2>{e(h[0])}</h2>{''.join(f'<p>{e(l)}: <a href="{u}">{u}</a></p>' for l, u in d['links'])}</section>
<section class="summary"><h2>{e(h[1])}</h2>{''.join(f'<p>{e(p)}</p>' for p in d['summary'])}</section>
<section><h2>{e(h[2])}</h2><div class="jobs">{jobs}</div></section>
<section class="skills"><h2>{e(h[3])}</h2>{skills}</section>
<section class="lang"><h2>{e(h[4])}</h2><ul><li>{e(d['languages'])}</li></ul></section>
<section class="edu"><h2>{e(h[5])}</h2><h3><span class="date">{e(date)}</span> &nbsp;|&nbsp; {e(deg)}</h3><p>{e(school)}</p></section>
</main></body></html>"""

for k in DATA:
    with open(os.path.join(HERE, f'{k}.html'), 'w', encoding='utf-8') as f:
        f.write(build(k))
print('ok')
