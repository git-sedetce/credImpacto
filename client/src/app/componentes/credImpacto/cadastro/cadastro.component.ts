import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CadastroService } from '../../../services/cadastro.service';
import { Cadastro } from '../../../model/cadastro.model';
import { ViewportScroller } from '@angular/common';
import { min } from 'rxjs';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Cidade } from '../../../model/cidade.model';

@Component({
  selector: 'app-cadastro',
  standalone: false,
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css',
})
export class CadastroComponent implements OnInit {
  /*===================================
      WIZARD
  ===================================*/

  step: number = 1;

  /*===================================
      FORMULÁRIO
  ===================================*/

  cadastroForm!: FormGroup;
  cadastro!: Cadastro;

  /*===================================
      LISTAS
  ===================================*/

  city_list: Cidade[] = [];

  /*===================================
      UPLOAD
  ===================================*/

  rgFile?: File;
  cnpjFile?: File;
  fotos: File[] = [];

  /*===================================
      CONTROLE
  ===================================*/

  loading: boolean = false;
  progress: number = 0;

  constructor(
    private fb: FormBuilder,
    private cadastroService: CadastroService,
    private viewportScroller: ViewportScroller,
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.cadastro = new Cadastro();
    this.loadCities();
  }

  /*===================================
      FORM
  ===================================*/

  private createForm(): void {
    this.cadastroForm = this.fb.group({
      /*===================================
      PERFIL
      ===================================*/

      tipo_proponente: ['', Validators.required],
      nome_responsavel: ['', [Validators.required, Validators.minLength(3)]],
      cpf: ['', Validators.required],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cnpj: ['', Validators.required],
      nome_empreendimento: ['', Validators.required],
      cep: ['', Validators.required],
      cidade: [null, Validators.required],
      bairro: ['', Validators.required],
      rua: ['', Validators.required],
      numero: ['', Validators.required],
      complemento: [''],
      aceite_termos: [false, Validators.requiredTrue],

      /*===================================
      IMPACTO
      ===================================*/

      iniciativa_impacto: ['', Validators.required],
      cadastro_cadimpacto: ['', Validators.required],
      status_atual: ['', Validators.required],
      area_atuacao: ['', Validators.required],
      resumo_negocio: ['', [Validators.required, Validators.maxLength(1500)]],

      /*===================================
      PERFIL
      ===================================*/

      rg: [null],
      cartaoCnpj: [null],
      fotos: [null],
    });
  }

  /*===================================
      GETTER
  ===================================*/

  get f() {
    return this.cadastroForm.controls;
  }

  /*===================================
      CARREGAR CIDADES
  ===================================*/

  loadCities(): void {
    this.cadastroService.getCitys('takecitys').subscribe({
      next: (cities: Cidade[]) => {
        this.city_list = cities;
      },
      error: (error) => {
        console.error('Erro ao carregar cidades:', error);
      },
    });
  }

  /*===================================
      BUSCAR CEP
  ===================================*/

  buscarCEP(): void {
    const cep = this.f['cep'].value;
    if (!cep) {
      return;
    }
    const cepLimpo = cep.replace(/\D/g, '');
    if (cepLimpo.length !== 8) {
      alert('CEP inválido. O CEP deve conter 8 dígitos.');
      return;
    }
    this.cadastroService.getAddressByCEP(cepLimpo).subscribe({
      next: (endereco) => {
        this.cadastroForm.patchValue({
          rua: endereco.logradouro,
          bairro: endereco.bairro,
          // cidade: this.city_list.find(city => city.nome === endereco.localidade)?.id || null
        });
        const cidade = this.city_list.find(
          (c) =>
            c.nome_municipio?.toUpperCase() ===
            endereco.localidade.toUpperCase(),
        );
        if (cidade) {
          this.cadastroForm.patchValue({ cidade: cidade.id });
        }
      },
      error: () => {
        console.error('Erro ao buscar endereço pelo CEP.');
      },
    });
  }

  /*===================================
    AVANÇAR ETAPA
===================================*/

  nextStep(): void {
    if (!this.validarEtapaAtual()) {
      this.markFields();
      return;
    }

    if (this.step < 3) {
      this.step++;
      this.scrollTop();
    }
  }

  /*===================================
    VOLTAR ETAPA
===================================*/

  previousStep(): void {
    if (this.step > 1) {
      this.step--;
      this.scrollTop();
    }
  }

  /*===================================
    SCROLL
===================================*/

  private scrollTop(): void {
    window.scroll({
      top: 0,

      behavior: 'smooth',
    });
  }

  /*===================================
    VALIDA ETAPA
===================================*/

  private validarEtapaAtual(): boolean {
    switch (this.step) {
      case 1:
        return this.validarPerfil();

      case 2:
        return this.validarImpacto();

      case 3:
        return this.validarDocumento();
      default:
        return true;
    }
  }

  private validarPerfil(): boolean {
    const campos = [
      'tipo_proponente',
      'nome_responsavel',
      'cpf',
      'telefone',
      'email',
      'cnpj',
      'nome_empreendimento',
      'cep',
      'cidade',
      'bairro',
      'rua',
      'numero',
    ];

    return this.validarCampos(campos);
  }

  private validarImpacto(): boolean {
    const campos = ['iniciativa_impacto', 'cadastro_cadimpacto', 'status_atual', 'area_atuacao', 'resumo_negocio'];

    return this.validarCampos(campos);
  }

  private validarDocumento(): boolean {
    return this.f['aceite_termos'].valid;
  }

  private validarCampos(campos: string[]): boolean {
    return campos.every((campo) => this.f[campo].valid);
  }

  markFields(): void {
    Object.values(this.cadastroForm.controls)

      .forEach((control) => {
        control.markAsTouched();
        control.updateValueAndValidity();
      });
  }

  selecionarImpacto(eixo: string): void {
    this.cadastroForm.patchValue({
      iniciativa_impacto: eixo,
    });
  }

  /*===================================
      UPLOAD RG
  ===================================*/

  uploadRg(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      return;
    }

    this.rgFile = input.files[0];
    this.cadastroForm.patchValue({
      rg: this.rgFile.name,
    });
  }

  /*===================================
      UPLOAD CARTÃO CNPJ
  ===================================*/

  uploadCnpj(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files?.length) {
      return;
    }

    this.cnpjFile = input.files[0];
    this.cadastroForm.patchValue({
      cartaoCnpj: this.cnpjFile.name,
    });
  }

  /*===================================
      UPLOAD FOTOS
  ===================================*/

  uploadFotos(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      return;
    }

    this.fotos = Array.from(input.files);
    this.cadastroForm.patchValue({
      fotos: this.fotos.map((f) => f.name).join(','),
    });
  }

  /*===================================
      MODEL
  ===================================*/

  private montarCadastro(): Cadastro {
    return Object.assign(
      new Cadastro(),
      this.cadastro,
      this.cadastroForm.getRawValue(),
    );
  }

  /*===================================
      FORMDATA
  ===================================*/

  private criarFormData(cadastro: Cadastro): FormData {
    const formData = new FormData();

    // Cria uma cópia para remover os campos de arquivos
    const dados = { ...cadastro };

    delete dados.rg;
    delete dados.cartaoCnpj;
    delete dados.fotos;

    // Envia o objeto inteiro como JSON
    formData.append('dados', JSON.stringify(dados));

    // RG
    if (this.rgFile) {
      formData.append('rgFile', this.rgFile);
    }

    // Cartão CNPJ
    if (this.cnpjFile) {
      formData.append('cnpjFile', this.cnpjFile);
    }

    // Fotos
    this.fotos.forEach((foto) => {
      formData.append('fotos', foto);
    });

    return formData;
  }

  /*===================================
      ENVIAR
  ===================================*/

  submit(): void {
    if (this.cadastroForm.invalid) {
      this.markFields();
      return;
    }

    this.loading = true;
    this.progress = 0;
    this.cadastro = this.montarCadastro();
    console.log('Cadastro montado:', this.cadastro);
    const formData = this.criarFormData(this.cadastro);

    this.cadastroService.salvar(formData).subscribe({
      next: (event) => {
        this.processarUpload(event);
      },

      error: (erro) => {
        console.error(erro);
        this.loading = false;
        alert('Erro ao enviar cadastro.');
      },
    });
  }

  /*===================================
      UPLOAD
  ===================================*/

  private processarUpload(event: HttpEvent<any>): void {
    switch (event.type) {
      case HttpEventType.UploadProgress:
        if (event.total) {
          this.progress = Math.round((event.loaded * 100) / event.total);
        }

        break;

      case HttpEventType.Response:
        this.loading = false;
        this.progress = 100;
        alert('Cadastro realizado com sucesso!');

        this.resetFormulario();
        break;
    }
  }

  /*===================================
      LIMPAR
  ===================================*/

  private resetFormulario(): void {
    this.step = 1;
    this.cadastro = new Cadastro();
    this.cadastroForm.reset();
    this.cadastroForm.patchValue({
      aceite_termos: false,
    });

    this.rgFile = undefined;
    this.cnpjFile = undefined;
    this.fotos = [];
  }

  /*===================================
      CONTADOR CARACTERE
  ===================================*/

  get resumoLength(): number {
    return this.f['resumo_negocio'].value?.length ?? 0;
  }
}
