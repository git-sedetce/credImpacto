export interface FAQItem {
  id: number;
  categoria: string;
  pergunta: string;
  resposta: string;
  open?: boolean;
}

export const FAQ_DATA: FAQItem[] = [
  {
    id: 1,
    categoria: 'Sobre o Cadastro',
    pergunta: 'PRECISO TER CNPJ PARA PARTICIPAR?',
    resposta: 'Sim. O Ceará CredImpacto é destinado a Microempreendedores Individuais (MEIs), Microempresas (MEs) e Organizações da Sociedade Civil (OSCs) formalmente constituídos, observadas as regras e os critérios do programa. Os empreendimentos deverão atender ao tempo mínimo de constituição formal exigido para participação.'
  },
  {
    id: 2,
    categoria: 'Sobre o Cadastro',
    pergunta: 'ORGANIZAÇÕES DA SOCIEDADE CIVIL (OSCs) PODEM PARTICIPAR?',
    resposta: 'Sim. Podem participar Organizações da Sociedade Civil (OSCs), nos termos da Lei Federal nº 13.019/2014, desde que desenvolvam iniciativas alinhadas aos objetivos do programa e atendam aos critérios estabelecidos.'
  },
  {
    id: 3,
    categoria: 'Sobre o Cadastro',
    pergunta: 'POSSO ME CADASTRAR MESMO SEM O NEGÓCIO ESTAR TOTALMENTE ESTRUTURADO?',
    resposta: 'Sim. O programa poderá apoiar negócios em fase de estruturação, implantação ou expansão, desde que estejam formalmente constituídos há, no mínimo, 6 meses e atendam aos critérios de elegibilidade. As propostas estarão sujeitas às etapas de orientação, capacitação, análise e avaliação técnica.'
  },
  {
    id: 4,
    categoria: 'Sobre o Negócio de Impacto',
    pergunta: 'O QUE É UM NEGÓCIO DE IMPACTO?',
    resposta: 'É um negócio que busca gerar renda e, ao mesmo tempo, contribuir para resolver problemas da sociedade ou do meio ambiente. Isso pode acontecer, por exemplo, ao gerar trabalho e renda para pessoas em situação de vulnerabilidade, reduzir o desperdício, reaproveitar materiais ou oferecer produtos e serviços que melhorem a vida das pessoas e da comunidade.'
  },
  {
    id: 5,
    categoria: 'Sobre o Negócio de Impacto',
    pergunta: 'MEU NEGÓCIO PRECISA JÁ ESTAR EM FUNCIONAMENTO?',
    resposta: 'Sim. Para participar, o negócio deve estar formalmente constituído há, no mínimo, 6 meses. Não é necessário que esteja totalmente estruturado, mas deverá atender aos critérios do programa e passar pelas etapas de análise e avaliação técnica.'
  },
  {
    id: 6,
    categoria: 'Sobre o Negócio de Impacto',
    pergunta: 'COMO FUNCIONA A CAPACITAÇÃO?',
    resposta: 'O Ceará CredImpacto oferece orientação e apoio técnico aos participantes. Como incentivo adicional, disponibiliza capacitações para ajudar os empreendedores a fortalecer seus negócios e ampliar suas oportunidades de crescimento. As capacitações abordam temas como modelos de negócio, clientes, redes de contatos e parcerias, soluções e gestão financeira. Além desses conteúdos, o programa oferece um módulo específico sobre Negócios de Impacto, voltado a ajudar o empreendedor a reconhecer o impacto social ou ambiental do próprio negócio, compreender sua relação com os produtos e as práticas adotadas, identificar pontos que precisam ser fortalecidos, transformar intenções em decisões concretas e planejar o uso responsável dos recursos. Dessa forma, a capacitação contribui para o desenvolvimento do negócio, o fortalecimento da gestão e a ampliação de seu impacto positivo na sociedade e no meio ambiente.'
  },
  {
    id: 7,
    categoria: 'Sobre a Análise e o Acompanhamento',
    pergunta: 'QUEM ANALISA AS PROPOSTAS?',
    resposta: 'As propostas serão avaliadas pela equipe técnica do Ceará CredImpacto, que verificará se o negócio atende aos critérios do programa, considerando aspectos como a viabilidade do empreendimento, a capacidade de pagamento e o potencial de impacto social ou ambiental. A aprovação seguirá os critérios estabelecidos pelo programa.'
  },
  {
    id: 8,
    categoria: 'Sobre a Análise e o Acompanhamento',
    pergunta: 'O CADASTRO GARANTE APROVAÇÃO DO CRÉDITO?',
    resposta: 'Não. O cadastro é apenas o primeiro passo para participar do Ceará CredImpacto. Para obter o crédito, o negócio deverá passar por análise técnica e atender aos critérios do programa. A aprovação também dependerá da disponibilidade de recursos financeiros.'
  },
  {
    id: 9,
    categoria: 'Sobre a Análise e o Acompanhamento',
    pergunta: 'O CRÉDITO CONTA COM ACOMPANHAMENTO TÉCNICO?',
    resposta: 'Sim. O Ceará CredImpacto oferece orientação e apoio técnico para contribuir com o desenvolvimento dos negócios. Também poderão ser realizados o acompanhamento da aplicação dos recursos e a avaliação dos resultados e dos impactos gerados pela iniciativa.'
  },
  {
    id: 10,
    categoria: 'Sobre a Análise e o Acompanhamento',
    pergunta: 'COMO POSSO COMPROVAR O IMPACTO SOCIAL OU AMBIENTAL DO MEU NEGÓCIO?',
    resposta: 'Você pode demonstrar o impacto por meio de informações e exemplos que mostrem como seu negócio contribui para melhorar a vida das pessoas ou cuidar do meio ambiente. Isso pode incluir a descrição das atividades realizadas, das pessoas beneficiadas, dos resultados alcançados e de outras evidências que ajudem a demonstrar os benefícios gerados pelo empreendimento.'
  },

];
