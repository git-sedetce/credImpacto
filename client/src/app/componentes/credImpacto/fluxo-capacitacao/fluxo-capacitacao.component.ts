import { Component } from '@angular/core';
interface Etapa {
  numero: number;
  // titulo: string;
  descricao: string;
  ativo?: boolean;
  azul?: boolean;
}

interface Trilha {
  titulo: string;
  subtitulo: string;
  descricao: string;
  imagem: string;
  cor: 'azul' | 'verde';
  invertido: boolean;
}

@Component({
  selector: 'app-fluxo-capacitacao',
  standalone: false,
  templateUrl: './fluxo-capacitacao.component.html',
  styleUrl: './fluxo-capacitacao.component.css',
})
export class FluxoCapacitacaoComponent {
  etapas: Etapa[] = [
    {
      numero: 1,
      // titulo: 'Cadastro e',
      descricao: 'Cadastro e pré análise',
      ativo: true,
    },

    {
      numero: 2,
      // titulo: 'Capacitação',
      descricao: 'Capacitação e orientação',
      azul: true,
    },

    {
      numero: 3,
      // titulo: 'Visita Técnica',
      descricao: 'Visita técnica e comitê',
    },

    {
      numero: 4,
      // titulo: 'Aprovação',
      descricao: 'Aprovação e Contratação',
      azul: true,
    },
    {
      numero: 5,
      // titulo: 'Acompanhamento',
      descricao: 'Acompanhamento',
    },
  ];
  trilhas: Trilha[] = [
    {
      titulo: 'TRILHA DE IRECONHECIMENTO DE IMPACTO',
      subtitulo: 'Soluções criativas para desafios sociais',
      descricao:
        'Desenvolvimento de modelos inovadores com foco em impacto territorial, sustentabilidade e transformação comunitária.',
      imagem: 'assets/imgs/imagens/trilha_inovacao.jpg',
      cor: 'azul',
      invertido: false,
    },
    {
      titulo: 'TRILHA DE GESTÃO',
      subtitulo: 'Capacitação em modelos de negócios',
      descricao:
        'Orientação técnica para gestão de clientes, mercados, produtos, receitas e custos.',
      imagem: 'assets/imgs/imagens/trilha_gestao_2.jpg',
      cor: 'verde',
      invertido: true,
    },

    {
      titulo: 'TRILHA DE MONITORAMENTO',
      subtitulo: 'Avaliação e mensuração de impacto',
      descricao:
        'Trilha formativa para mensuração e acompanhamento dos negócios de impacto.',
      imagem: 'assets/imgs/imagens/trilha_monitoramento.jpg',
      cor: 'azul',
      invertido: false,
    },

  ];
}
