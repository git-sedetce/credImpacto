import { Component } from '@angular/core';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-questionario-admin',
  standalone: false,
  templateUrl: './questionario-admin.component.html',
  styleUrl: './questionario-admin.component.css'
})
export class QuestionarioAdminComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {

    this.form = this.fb.group({
      nome: [''],
      descricao: [''],
      perguntas: this.fb.array([])
    });

    this.adicionarPergunta();
  }

  get perguntas(): FormArray {
    return this.form.get('perguntas') as FormArray;
  }

  adicionarPergunta() {

    const pergunta = this.fb.group({
      descricao: [''],
      ordem: [this.perguntas.length + 1],
      alternativas: this.fb.array([])
    });

    this.perguntas.push(pergunta);

    this.adicionarAlternativa(
      this.perguntas.length - 1
    );
  }

  adicionarAlternativa(indexPergunta: number) {

    const alternativas =
      this.perguntas
        .at(indexPergunta)
        .get('alternativas') as FormArray;

    alternativas.push(
      this.fb.group({
        descricao: [''],
        peso: [0]
      })
    );
  }

  salvar() {
    console.log(this.form.value);
  }

  getAlternativas(index: number): FormArray {
  return this.perguntas.at(index).get('alternativas') as FormArray;
}

}
