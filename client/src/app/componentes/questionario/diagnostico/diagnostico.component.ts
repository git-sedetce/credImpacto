import { Component, OnInit } from '@angular/core';
import { DiagnosticoService } from '../../../services/diagnostico.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Diagnostico } from '../../../model/diagnostico.model';

@Component({
  selector: 'app-diagnostico',
  standalone: false,
  templateUrl: './diagnostico.component.html',
  styleUrl: './diagnostico.component.css',
})
export class DiagnosticoComponent implements OnInit {
  formulario!: FormGroup;
  perguntas: Diagnostico[] = [];
  perguntasPagina: Diagnostico[] = [];
  paginaAtual = 1;
  perguntasPorPagina = 8;
  totalPaginas = 2;
  pontuacao = 0;
  percentual = 0;
  status = '';
  descricao = '';
  mostrarResultado = false;

  constructor(
    private fb: FormBuilder,
    private diagnosticoService: DiagnosticoService,
  ) {}

  ngOnInit(): void {
    this.perguntas = this.diagnosticoService.getPerguntas();

    this.criarFormulario();

    this.carregarPagina();
  }

  private criarFormulario(): void {
    const group: any = {};

    this.perguntas.forEach((pergunta) => {
      group['pergunta' + pergunta.id] = new FormControl(
        null,
        Validators.required,
      );
    });

    this.formulario = this.fb.group(group);
  }

  carregarPagina(): void {
    const inicio = (this.paginaAtual - 1) * this.perguntasPorPagina;

    const fim = inicio + this.perguntasPorPagina;

    this.perguntasPagina = this.perguntas.slice(inicio, fim);
  }

  proximaPagina(): void {
    if (!this.validarPagina()) {
      alert('Responda todas as perguntas.');

      return;
    }

    this.paginaAtual++;

    this.carregarPagina();

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  voltarPagina(): void {
    this.paginaAtual--;

    this.carregarPagina();

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  validarPagina(): boolean {
    for (const pergunta of this.perguntasPagina) {
      const valor = this.formulario.get('pergunta' + pergunta.id)?.value;

      if (valor == null) {
        return false;
      }
    }

    return true;
  }

  calcularResultado(): void {
    if (!this.validarPagina()) {
      alert('Responda todas as perguntas.');

      return;
    }

    this.pontuacao = 0;

    this.perguntas.forEach((pergunta) => {
      const resposta = Number(
        this.formulario.get('pergunta' + pergunta.id)?.value,
      );

      this.pontuacao += resposta * (pergunta.peso ?? 0);
    });

    this.percentual = (this.pontuacao / 30) * 100;

    this.classificar();

    this.mostrarResultado = true;
  }

  classificar(): void {
    if (this.percentual >= 80) {
      this.status = 'Aderência Ampliada';

      this.descricao =
        'Sua iniciativa demonstra forte alinhamento com os critérios de negócios de impacto e possui elevado potencial para avançar nas próximas etapas do programa.';
    } else if (this.percentual < 20) {
      this.status = 'Aderência Inicial Reduzida';

      this.descricao =
        'Sua iniciativa ainda apresenta baixa aderência aos critérios avaliados. Recomendamos fortalecer sua proposta antes de prosseguir.';
    } else {
      this.status = 'Aderência Intermediária';

      this.descricao =
        'Sua iniciativa possui características relevantes de impacto, porém ainda existem aspectos que podem ser aprimorados para ampliar sua aderência.';
    }
  }

  getCorResultado(): string {
    if (this.percentual >= 80) {
      return '#28A745';
    }

    if (this.percentual < 20) {
      return '#DC3545';
    }
    return '#FFC107';
  }

  getIconeResultado(): string {
    if (this.percentual >= 80) {
      return 'fa-solid fa-circle-check';
    }

    if (this.percentual < 20) {
      return 'fa-solid fa-circle-xmark';
    }

    return 'fa-solid fa-circle-info';
  }

  reiniciar(): void {
    this.formulario.reset();
    this.paginaAtual = 1;
    this.pontuacao = 0;
    this.percentual = 0;
    this.status = '';
    this.descricao = '';
    this.mostrarResultado = false;
    this.carregarPagina();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  get progresso(): number {
    return (this.paginaAtual / this.totalPaginas) * 100;
  }
}
