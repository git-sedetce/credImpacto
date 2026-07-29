import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CadastroService } from '../../../services/cadastro.service';

@Component({
  selector: 'app-cadastro',
  standalone: false,
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css',
})
export class CadastroComponent implements OnInit {
  step = 1;
  cadastroForm!: FormGroup;
  loading = false;
  progress = 0;
  rgFile!: File;
  cnpjFile!: File;
  fotos: File[] = [];
  http: any;

  constructor(
    private fb: FormBuilder,
    private cadastroService: CadastroService,
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.cadastroForm = this.fb.group({
      /*==========================
    ETAPA 1
==========================*/

      tipoProponente: ['', Validators.required],
      nome: ['', [Validators.required, Validators.minLength(5)]],
      cpf: ['', Validators.required],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cnpj: [''],
      empreendimento: ['', Validators.required],
      cep: ['', Validators.required],
      cidade: ['', Validators.required],
      bairro: ['', Validators.required],
      rua: ['', Validators.required],

      /*==========================
        ETAPA 2
      ==========================*/

      eixoImpacto: ['', Validators.required],
      cadimpacto: ['', Validators.required],
      situacao: ['', Validators.required],
      area: ['', Validators.required],
      resumo: ['', [Validators.required, Validators.maxLength(1500)]],

      /*==========================
        ETAPA 3
      ==========================*/

      rg: [null],
      cartaoCnpj: [null],
      fotos: [null],
      aceite: [false, Validators.requiredTrue],
    });
  }

  /*===================================
      Buscar CEP
===================================*/

  buscarCEP(): void {
    const cep = this.f['cep'].value;

    if (!cep) {
      return;
    }

    const cepLimpo = cep.replace(/\D/g, '');
    if (cepLimpo.length != 8) {
      return;
    }
    this.cadastroService.buscarCEP(cepLimpo).subscribe({
      next: (res) => {
        this.cadastroForm.patchValue({
          cidade: res.localidade,
          bairro: res.bairro,
          rua: res.logradouro,
        });
      },

      error: () => {
        console.log('CEP não encontrado');
      },
    });
  }

  /*===================================
      GETTERS
  ===================================*/

  get f() {
    return this.cadastroForm.controls;
  }

  /*===================================
      AVANÇAR
  ===================================*/

  nextStep(): void {
    if (this.step == 1) {
      if (
        this.f['tipoProponente'].invalid ||
        this.f['nome'].invalid ||
        this.f['cpf'].invalid ||
        this.f['telefone'].invalid ||
        this.f['email'].invalid ||
        this.f['empreendimento'].invalid ||
        this.f['cep'].invalid ||
        this.f['cidade'].invalid ||
        this.f['bairro'].invalid ||
        this.f['rua'].invalid
      ) {
        this.markFields();
        return;
      }
    }

    if (this.step == 2) {
      if (
        this.f['eixoImpacto'].invalid ||
        this.f['cadimpacto'].invalid ||
        this.f['situacao'].invalid ||
        this.f['area'].invalid ||
        this.f['resumo'].invalid
      ) {
        this.markFields();
        return;
      }
    }

    if (this.step < 3) {
      this.step++;
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }

  /*===================================
      VOLTAR
  ===================================*/

  previousStep(): void {
    if (this.step > 1) {
      this.step--;
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }

  /*===================================
      MARCAR CAMPOS
  ===================================*/

  markFields(): void {
    Object.values(this.cadastroForm.controls).forEach((control) => {
      control.markAsTouched();
    });
  }

  /*===================================
      UPLOAD RG
  ===================================*/

  uploadRg(event: any): void {
    if (event.target.files.length) {
      this.rgFile = event.target.files[0];
    }
  }

  /*===================================
      UPLOAD CNPJ
  ===================================*/

  uploadCnpj(event: any): void {
    if (event.target.files.length) {
      this.cnpjFile = event.target.files[0];
    }
  }

  /*===================================
      UPLOAD FOTO
  ===================================*/

  uploadFotos(event: any): void {
    this.fotos = [];
    const arquivos = event.target.files;
    for (let i = 0; i < arquivos.length; i++) {
      this.fotos.push(arquivos[i]);
    }
  }
  /*===================================
      ENVIAR
  ===================================*/

  submit(): void {
    if (this.cadastroForm.invalid) {
      this.markFields();
      return;
    }

    const formData = new FormData();

    Object.keys(this.cadastroForm.value)
      .forEach((key) => {
        formData.append(
          key,
          this.cadastroForm.value[key],
        );
      });

    if (this.rgFile) {
      formData.append(
        'rg',
        this.rgFile,
      );
    }

    if (this.cnpjFile) {
      formData.append(
        'cartaoCnpj',
        this.cnpjFile,
      );
    }

    this.fotos.forEach((file) => {
      formData.append(
        'fotos',
        file,
      );
    });

    this.loading = true;

    this.cadastroService
      .salvar(formData)
      .subscribe({
        next: (event: any) => {
          if (event.type === 1) {
            this.progress = Math.round((event.loaded * 100) / event.total);
          }
          if (event.body) {
            this.loading = false;
            alert('Cadastro realizado com sucesso!');
          }
        },

        error: () => {
          this.loading = false;
          alert('Erro ao enviar cadastro.');
        },
      });
  }

  /*===================================
      SELECIONAR EIXO
  ===================================*/

  selecionarImpacto(nome: string): void {
    this.cadastroForm.patchValue({
      eixoImpacto: nome,
    });
  }
}
