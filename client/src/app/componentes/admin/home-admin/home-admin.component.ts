import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CadastroService } from '../../../services/cadastro.service';

@Component({
  selector: 'app-home-admin',
  standalone: false,
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.css',
})
export class HomeAdminComponent implements OnInit {
  empresas: any[] = [];
  empresasFiltradas: any[] = [];
  paginatedEmpresas: any[] = [];
  anexos: any[] = [];
  empresaSelecionada: any = null;
  empresaForm!: FormGroup;
  filtro = '';
  currentPage = 1;
  pageSize = 10;
  totalPages = 1;
  paginaAtual = 1;
  sortField = 'nome_empreendimento';
  sortDirection: 'asc' | 'desc' = 'asc';
  modalDetalhesAberto = false;
  modalAnexosAberto = false;
  carregando = false;
  mensagem = '';

  constructor(
    private cadastroService: CadastroService,
    private fb: FormBuilder,
  ) {
    this.empresaForm = this.fb.group({
      tipo_proponente: [''],
      nome_responsavel: ['', Validators.required],
      cpf: [''],
      telefone: [''],
      email: ['', [Validators.required, Validators.email]],
      cnpj: [''],
      nome_empreendimento: ['', Validators.required],
      cep: [''],
      cidade: [''],
      bairro: [''],
      rua: [''],
      numero: [''],
      complemento: [''],
      iniciativa_impacto: [''],
      status_atual: [''],
      area_atuacao: [''],
      resumo_negocio: [''],
      aceite_termos: [false],
      linha_credito: [''],
    });
  }

  ngOnInit(): void {
    this.carregarEmpresas();
  }

  carregarEmpresas(): void {
    this.carregando = true;
    this.cadastroService.listarEmpresas().subscribe({
      next: (response: any[]) => {
        this.empresas = Array.isArray(response) ? response : [];
        this.aplicarFiltro();
        this.carregando = false;
      },
      error: () => {
        this.mensagem = 'Não foi possível carregar as empresas.';
        this.carregando = false;
      },
    });
  }

  aplicarFiltro(): void {
    const termo = this.filtro.trim().toLowerCase();

    this.empresasFiltradas = this.empresas.filter((empresa) => {
      const responsavel = empresa.nome_responsavel ?? '';
      const empreendimento = empresa.nome_empreendimento ?? '';
      const area = empresa.area_atuacao ?? '';
      const cidade = empresa.ass_cadastro_cidade?.nome_municipio ?? '';
      const regiao = empresa.ass_cadastro_cidade?.ass_municipio_regiao?.nome ?? '';

      return (
        !termo ||
        responsavel.toLowerCase().includes(termo) ||
        empreendimento.toLowerCase().includes(termo) ||
        area.toLowerCase().includes(termo) ||
        cidade.toLowerCase().includes(termo) ||
        regiao.toLowerCase().includes(termo)
      );
    });

    this.ordenarEmpresas();
    this.totalPages = Math.max(1, Math.ceil(this.empresasFiltradas.length / this.pageSize));
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }

    this.atualizarPagina();
  }

  ordenarEmpresas(): void {
    this.empresasFiltradas.sort((a, b) => {
      const valorA = this.getValorCampoOrdenacao(a, this.sortField);
      const valorB = this.getValorCampoOrdenacao(b, this.sortField);
      const comparacao = String(valorA).localeCompare(String(valorB), 'pt-BR', {
        numeric: true,
        sensitivity: 'base',
      });

      return this.sortDirection === 'asc' ? comparacao : -comparacao;
    });
  }

  getValorCampoOrdenacao(empresa: any, campo: string): string {
    switch (campo) {
      case 'nome_empreendimento':
        return empresa.nome_empreendimento ?? '';
      case 'nome_responsavel':
        return empresa.nome_responsavel ?? '';
      case 'municipio':
        return empresa.ass_cadastro_cidade?.nome_municipio ?? '';
      case 'regiao':
        return empresa.ass_cadastro_cidade?.ass_municipio_regiao?.nome ?? '';
      case 'status':
        return empresa.iniciativa_impacto ?? '';
      default:
        return '';
    }
  }

  ordenarPor(campo: string): void {
    if (this.sortField === campo) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = campo;
      this.sortDirection = 'asc';
    }

    this.ordenarEmpresas();
    this.atualizarPagina();
  }

  getOrdenacaoIcone(campo: string): string {
    if (this.sortField !== campo) {
      return 'fa-arrows-up-down';
    }

    return this.sortDirection === 'asc' ? 'fa-arrow-up-short-wide' : 'fa-arrow-down-short-wide';
  }

  atualizarPagina(): void {
    const inicio = (this.currentPage - 1) * this.pageSize;
    const fim = inicio + this.pageSize;
    this.paginatedEmpresas = this.empresasFiltradas.slice(inicio, fim);
  }

  get paginas(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  mudarPagina(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.atualizarPagina();
  }

  abrirEmpresa(id: number): void {
    this.cadastroService.empresaId(id).subscribe({
      next: (empresa) => {
        this.empresaSelecionada = empresa;
        this.empresaForm.patchValue({
          tipo_proponente: empresa.tipo_proponente ?? '',
          nome_responsavel: empresa.nome_responsavel ?? '',
          cpf: empresa.cpf ?? '',
          telefone: empresa.telefone ?? '',
          email: empresa.email ?? '',
          cnpj: empresa.cnpj ?? '',
          nome_empreendimento: empresa.nome_empreendimento ?? '',
          cep: empresa.cep ?? '',
          cidade: empresa.ass_cadastro_cidade?.id ?? empresa.cidade ?? '',
          bairro: empresa.bairro ?? '',
          rua: empresa.rua ?? '',
          numero: empresa.numero ?? '',
          complemento: empresa.complemento ?? '',
          iniciativa_impacto: empresa.iniciativa_impacto ?? '',
          status_atual: empresa.status_atual ?? '',
          area_atuacao: empresa.area_atuacao ?? '',
          resumo_negocio: empresa.resumo_negocio ?? '',
          aceite_termos: !!empresa.aceite_termos,
          linha_credito: empresa.linha_credito ?? '',
        });
        this.carregarAnexos(id);
        this.modalDetalhesAberto = true;
      },
      error: () => {
        this.mensagem = 'Não foi possível abrir os dados da empresa.';
      },
    });
  }

  carregarAnexos(id: number): void {
    this.cadastroService.imagensId(id).subscribe({
      next: (response) => {
        this.anexos = Array.isArray(response) ? response : [];
      },
      error: () => {
        this.anexos = [];
      },
    });
  }

  salvarEmpresa(): void {
    if (!this.empresaSelecionada || !this.empresaForm.valid) {
      this.empresaForm.markAllAsTouched();
      return;
    }

    const payload = { ...this.empresaForm.value };
    delete payload.cidade;

    this.cadastroService
      .atualizarEmpresa(this.empresaSelecionada.id, payload)
      .subscribe({
        next: () => {
          this.mensagem = 'Empresa atualizada com sucesso.';
          this.carregarEmpresas();
          this.modalDetalhesAberto = false;
        },
        error: () => {
          this.mensagem = 'Não foi possível salvar as alterações.';
        },
      });
  }

  abrirModalAnexos(): void {
    if (!this.empresaSelecionada) return;
    this.modalAnexosAberto = true;
  }

  fecharModais(): void {
    this.modalDetalhesAberto = false;
    this.modalAnexosAberto = false;
  }

  isImagem(mimetype?: string): boolean {
    return !!mimetype && mimetype.startsWith('image/');
  }

  get nomeResponsavelControl() {
    return this.empresaForm.get('nome_responsavel');
  }

  get nomeEmpreendimentoControl() {
    return this.empresaForm.get('nome_empreendimento');
  }

  get emailControl() {
    return this.empresaForm.get('email');
  }
}
