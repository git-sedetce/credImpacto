import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CadastroService } from '../../../services/cadastro.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cadastro-polo',
  standalone: false,
  templateUrl: './cadastro-polo.component.html',
  styleUrl: './cadastro-polo.component.css',
})
export class CadastroPoloComponent implements OnInit{

  poloForm!: FormGroup;

  // =====================================================
  // CIDADES
  // =====================================================

  city_list: any[] = [];

  cidadesSelecionadas: any[] = [];

  carregandoCidades = false;

  erroCidades = false;


  // =====================================================
  // BAIRROS
  // =====================================================

  bairrosFortaleza: any[] = [];

  bairrosSelecionados: any[] = [];

  carregandoBairros = false;

  erroBairros = false;


  // =====================================================
  // CONTROLE
  // =====================================================

  fortalezaSelecionada = false;

  salvando = false;

  mensagem = '';


  constructor(
    private fb: FormBuilder,
    private cadastroService: CadastroService
  ) {}


  // =====================================================
  // INIT
  // =====================================================

  ngOnInit(): void {

    this.poloForm = this.fb.group({

      nome_polo: [
        '',
        Validators.required
      ]

    });

    this.carregarCidades();

  }


  // =====================================================
  // GETTERS
  // =====================================================

  get nomePoloControl() {
    return this.poloForm.get('nome_polo');
  }


  // =====================================================
  // CARREGAR CIDADES
  // =====================================================

  carregarCidades(): void {

    this.carregandoCidades = true;

    this.cadastroService
      .getCitys('takecitys')
      .subscribe({

        next: (dados) => {

          this.city_list = dados;

          this.carregandoCidades = false;

        },

        error: (erro) => {

          console.error(
            'Erro ao carregar cidades:',
            erro
          );

          this.carregandoCidades = false;

          this.mensagem =
            'Não foi possível carregar os municípios.';

        }

      });

  }


  // =====================================================
  // SELECIONAR / DESSELECIONAR CIDADE
  // =====================================================

  toggleCidade(cidade: any): void {

    const index =
      this.cidadesSelecionadas.findIndex(
        c => c.id === cidade.id
      );


    // ===================================================
    // DESSELECIONAR
    // ===================================================

    if (index >= 0) {

      this.cidadesSelecionadas.splice(index, 1);

    }

    // ===================================================
    // SELECIONAR
    // ===================================================

    else {

      this.cidadesSelecionadas.push(cidade);

    }


    // Atualiza validação

    this.erroCidades =
      this.cidadesSelecionadas.length === 0;


    // Verifica Fortaleza

    this.verificarFortaleza();

  }


  // =====================================================
  // VERIFICAR SE FORTALEZA FOI SELECIONADA
  // =====================================================

  verificarFortaleza(): void {

    this.fortalezaSelecionada =
      this.cidadesSelecionadas.some(
        cidade =>
          cidade.nome_municipio
            ?.trim()
            .toLowerCase() === 'fortaleza'
      );


    // Se Fortaleza foi selecionada
    if (this.fortalezaSelecionada) {

      this.carregarBairrosFortaleza();

    }

    // Se Fortaleza foi retirada
    else {

      this.bairrosFortaleza = [];

      this.bairrosSelecionados = [];

      this.erroBairros = false;

    }

  }


  // =====================================================
  // CARREGAR BAIRROS
  // =====================================================

  carregarBairrosFortaleza(): void {

    // Evita chamadas desnecessárias

    if (this.bairrosFortaleza.length > 0) {
      return;
    }


    this.carregandoBairros = true;


    this.cadastroService
      .getBairros('pegarbairros')
      .subscribe({

        next: (dados) => {

          console.log(
            'Bairros recebidos:',
            dados
          );


          /*
           * Dependendo do retorno da sua API,
           * podemos precisar filtrar Fortaleza aqui.
           *
           * Se /pegarbairros já retornar somente os bairros
           * de Fortaleza, pode deixar assim.
           */

          this.bairrosFortaleza = dados;


          this.carregandoBairros = false;

        },

        error: (erro) => {

          console.error(
            'Erro ao carregar bairros:',
            erro
          );

          this.carregandoBairros = false;

          this.mensagem =
            'Não foi possível carregar os bairros.';

        }

      });

  }


  // =====================================================
  // VERIFICAR CIDADE SELECIONADA
  // =====================================================

  cidadeSelecionada(id: number): boolean {

    return this.cidadesSelecionadas.some(
      cidade => cidade.id === id
    );

  }


  // =====================================================
  // SELECIONAR BAIRRO
  // =====================================================

  toggleBairro(bairro: any): void {

    const index =
      this.bairrosSelecionados.findIndex(
        b => b.id === bairro.id
      );


    // Retirar

    if (index >= 0) {

      this.bairrosSelecionados.splice(index, 1);

    }

    // Adicionar

    else {

      this.bairrosSelecionados.push(bairro);

    }


    this.erroBairros =
      this.bairrosSelecionados.length === 0;

  }


  // =====================================================
  // VERIFICAR BAIRRO SELECIONADO
  // =====================================================

  bairroSelecionado(id: number): boolean {

    return this.bairrosSelecionados.some(
      bairro => bairro.id === id
    );

  }


  // =====================================================
  // SALVAR POLO
  // =====================================================

  salvarPolo(): void {

    this.mensagem = '';


    // Validação do nome

    if (this.poloForm.invalid) {

      this.poloForm.markAllAsTouched();

      return;

    }


    // Validação das cidades

    if (this.cidadesSelecionadas.length === 0) {

      this.erroCidades = true;

      this.mensagem =
        'Selecione pelo menos um município.';

      return;

    }


    // Validação dos bairros de Fortaleza

    if (
      this.fortalezaSelecionada &&
      this.bairrosSelecionados.length === 0
    ) {

      this.erroBairros = true;

      this.mensagem =
        'Selecione pelo menos um bairro para Fortaleza.';

      return;

    }


    this.salvando = true;


    // ===================================================
    // OBJETO QUE SERÁ ENVIADO PARA A API
    // ===================================================

    const dados = {

      nome_polo:
        this.poloForm.value.nome_polo,

      cidades:
        this.cidadesSelecionadas.map(
          cidade => cidade.id
        ),

      bairros:
        this.bairrosSelecionados.map(
          bairro => bairro.id
        )

    };


    console.log(
      'Dados do polo:',
      dados
    );


    /*
     * Aqui vamos chamar a função do service
     * responsável por cadastrar o polo.
     *
     * Exemplo:
     *
     * this.cadastroService.cadastrarPolo(dados)
     *   .subscribe(...)
     */


    this.salvando = false;

  }


  // =====================================================
  // LIMPAR FORMULÁRIO
  // =====================================================

  limparFormulario(): void {

    this.poloForm.reset();

    this.cidadesSelecionadas = [];

    this.bairrosSelecionados = [];

    this.fortalezaSelecionada = false;

    this.erroCidades = false;

    this.erroBairros = false;

    this.mensagem = '';

  }
}
