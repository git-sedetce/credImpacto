import { Component } from '@angular/core';
import { QuestionarioServiceService } from '../../../services/questionario-service.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {

  constructor(
    private service: QuestionarioServiceService
  ) {}

  [x: string]: any;
  respostas: any[] = [];

  pontuacaoTotal = 0;

  selecionarResposta(perguntaId: number, alternativaId: number, peso: number) {
    const index = this.respostas.findIndex((x) => x.pergunta_id === perguntaId);

    if (index >= 0) {
      this.respostas[index] = {
        pergunta_id: perguntaId,
        alternativa_id: alternativaId,
        peso,
      };
    } else {
      this.respostas.push({
        pergunta_id: perguntaId,
        alternativa_id: alternativaId,
        peso,
      });
    }

    this.calcularTotal();
  }

  calcularTotal() {
    this.pontuacaoTotal = this.respostas.reduce(
      (soma, item) => soma + item.peso,
      0,
    );
  }

  finalizar() {
    const payload = {
      questionario_id: this['questionario'].id,
      respostas: this.respostas,
    };

    this.service.salvarQuestionario(payload).subscribe((retorno) => {
      alert(`Pontuação final: ${retorno.pontuacaoTotal}`);
    });
  }
}
