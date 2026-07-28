import { Injectable } from '@angular/core';
import { Diagnostico } from '../model/diagnostico.model';

@Injectable({
  providedIn: 'root',
})
export class DiagnosticoService {
  constructor() {}

  perguntas: Diagnostico[] = [
    {
      id: 1,
      peso: 5,
      texto:
        'Seu negócio, projeto ou organização busca solucionar algum problema social, ambiental ou econômico?',
    },

    {
      id: 2,
      peso: 3,
      texto:
        'Sua iniciativa beneficia diretamente pessoas, comunidades ou territórios?',
    },

    {
      id: 3,
      peso: 2,
      texto:
        'O empreendimento atua com geração de renda, inclusão produtiva ou fortalecimento econômico local?',
    },

    {
      id: 4,
      peso: 2,
      texto:
        'O negócio desenvolve ações relacionadas à sustentabilidade ambiental, reciclagem, economia circular ou preservação ambiental?',
    },

    {
      id: 5,
      peso: 2,
      texto:
        'A iniciativa atende públicos em situação de vulnerabilidade social?',
    },

    {
      id: 6,
      peso: 2,
      texto:
        'O empreendimento desenvolve soluções inovadoras para desafios da comunidade ou território?',
    },

    {
      id: 7,
      peso: 2,
      texto:
        'O projeto promove impacto positivo em áreas como educação, saúde, cultura, agricultura sustentável, tecnologia social ou desenvolvimento territorial?',
    },

    {
      id: 8,
      peso: 2,
      texto:
        'O empreendimento é sustentável financeiramente por meio de seus produtos ou serviços?',
    },

    {
      id: 9,
      peso: 2,
      texto:
        'O negócio ou organização já desenvolve atividades em funcionamento?',
    },

    {
      id: 10,
      peso: 2,
      texto:
        'Você considera que sua iniciativa gera transformação positiva para a comunidade, território ou público atendido?',
    },

    {
      id: 11,
      peso: 1,
      texto:
        'O empreendimento acompanha ou monitora os resultados e impactos gerados pela iniciativa?',
    },

    {
      id: 12,
      peso: 1,
      texto:
        'O empreendimento consegue identificar quem são os principais públicos beneficiados pela iniciativa?',
    },

    {
      id: 13,
      peso: 1,
      texto:
        'A iniciativa possui indicadores, metas ou formas simples de acompanhar os resultados gerados?',
    },

    {
      id: 14,
      peso: 1,
      texto:
        'O empreendimento pretende ampliar o impacto social, ambiental ou territorial da iniciativa nos próximos anos?',
    },

    {
      id: 15,
      peso: 1,
      texto:
        'O empreendimento realiza ou pretende realizar ações de acompanhamento junto ao público beneficiado?',
    },

    {
      id: 16,
      peso: 1,
      texto:
        'O negócio está alinhado com os Objetivos de Desenvolvimento Sustentável (ODS)?',
    },
  ];

  getPerguntas(): Diagnostico[] {
    return this.perguntas;
  }
}
