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
    resposta: 'Sim. O Ceará CredImpacto é destinado a Microempresas (ME) e Organizações da Sociedade Civil (OSCs) formalmente constituídas, observadas as regras e critérios definidos pelo programa. Empreendimentos em fase inicial poderão participar das etapas de orientação e capacitação, observadas as diretrizes operacionais do programa.'
  },
  {
    id: 2,
    categoria: 'Sobre o Cadastro',
    pergunta: 'ORGANIZAÇÕES DA SOCIEDADE CIVIL (OSCs) PODEM PARTICIPAR?',
    resposta: 'Sim. Poderão participar Organizações da Sociedade Civil (OSCs), nos termos da Lei Federal nº 13.019/2014, desde que desenvolvam iniciativas alinhadas aos objetivos do programa.'
  },
  {
    id: 3,
    categoria: 'Sobre o Cadastro',
    pergunta: 'POSSO ME CADASTRAR MESMO SEM O NEGÓCIO ESTAR TOTALMENTE ESTRUTURADO?',
    resposta: 'Sim. O programa também poderá apoiar negócios e projetos em fase inicial, implantação ou expansão, observadas as etapas de capacitação, análise e avaliação técnica.'
  },
  {
    id: 4,
    categoria: 'Sobre o o Negócio de Impacto',
    pergunta: 'O QUE É UM NEGÓCIO DE IMPACTO?',
    resposta: 'Negócios de impacto são empreendimentos que buscam gerar resultado financeiro ao mesmo tempo em que promovem soluções para problemas sociais, ambientais ou econômicos.'
  },
  {
    id: 5,
    categoria: 'Sobre o o Negócio de Impacto',
    pergunta: 'PRECISO JÁ ESTAR EM FUNCIONAMENTO?',
    resposta: 'Não necessariamente. O Ceará CredImpacto poderá apoiar tanto iniciativas já em funcionamento quanto projetos em fase inicial de desenvolvimento.'
  },
  {
    id: 6,
    categoria: 'Sobre o o Negócio de Impacto',
    pergunta: 'COMO FUNCIONA A CAPACITAÇÃO?',
    resposta: 'Os participantes poderão passar por etapas de orientação, capacitação e apoio técnico voltadas ao fortalecimento da proposta, estruturação do empreendimento e compreensão da metodologia do programa.'
  },
  {
    id: 7,
    categoria: 'Sobre Analises',
    pergunta: 'QUEM ANALISA AS PROPOSTAS?',
    resposta: 'As propostas serão analisadas pela equipe técnica responsável pelo programa e submetidas à avaliação do Comitê de Crédito e Impacto, observados os critérios técnicos, metodológicos e operacionais definidos.'
  },
  {
    id: 8,
    categoria: 'Sobre Analises',
    pergunta: 'O CADASTRO GARANTE APROVAÇÃO DO CRÉDITO?',
    resposta: 'Não. O cadastro representa apenas a etapa inicial de inscrição, estando a aprovação sujeita à análise técnica, disponibilidade orçamentária e aderência aos objetivos do programa.'
  },
  {
    id: 9,
    categoria: 'Sobre Analises',
    pergunta: 'O CRÉDITO POSSUI ACOMPANHAMENTO?',
    resposta: 'Sim. O Ceará CredImpacto poderá realizar acompanhamento técnico, monitoramento da execução da proposta, avaliação de impacto e procedimentos relacionados à aplicação dos recursos.'
  },
  {
    id: 10,
    categoria: 'Sobre Analises',
    pergunta: 'COMO POSSO COMPROVAR O IMPACTO SOCIAL OU AMBIENTAL DA MINHA INICIATIVA?',
    resposta: 'O impacto poderá ser demonstrado por meio da descrição das atividades desenvolvidas, público beneficiado, resultados alcançados, evidências da atuação do empreendimento ou outras informações apresentadas durante o processo de análise.'
  },

];
