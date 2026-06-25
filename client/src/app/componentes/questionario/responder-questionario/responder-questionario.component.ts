import { Component } from '@angular/core';

@Component({
  selector: 'app-responder-questionario',
  standalone: false,
  templateUrl: './responder-questionario.component.html',
  styleUrl: './responder-questionario.component.css'
})
export class ResponderQuestionarioComponent {
  pontuacao = 0;

respostas: any[] = [];
questionario: any;

responder(
  perguntaId: number,
  alternativaId: number,
  peso: number
) {

  const index =
    this.respostas.findIndex(
      x => x.perguntaId === perguntaId
    );

  if (index >= 0) {

    this.respostas[index] = {
      perguntaId,
      alternativaId,
      peso
    };

  } else {

    this.respostas.push({
      perguntaId,
      alternativaId,
      peso
    });
  }
}

finalizar() {

  this.pontuacao =
    this.respostas.reduce(
      (soma, item) => soma + item.peso,
      0
    );

  let classificacao = '';

  if (this.pontuacao <= 50)
    classificacao = 'Baixo Impacto';

  else if (this.pontuacao <= 100)
    classificacao = 'Impacto Moderado';

  else if (this.pontuacao <= 150)
    classificacao = 'Alto Impacto';

  else
    classificacao = 'Transformador';

  alert(
    `Pontuação: ${this.pontuacao}
     Classificação: ${classificacao}`
  );
}

}
