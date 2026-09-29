import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { catchError, forkJoin, of } from 'rxjs';
import { CadastroService } from '../../../services/cadastro.service';

interface Empreendimento {
  id: number;
  tipo_proponente?: string;
  nome_empreendimento?: string;
  area_atuacao?: string;
  ass_cadastro_cidade?: {
    nome_municipio?: string;
    ass_municipio_regiao?: { nome?: string };
  };
}

interface Agente {
  id: number;
  user_active?: boolean;
  ass_agente_cidade?: {
    nome_municipio?: string;
    ass_municipio_regiao?: { nome?: string };
  };
  ass_agente_profile?: { perfil?: string };
}

interface GeoFeatureCollection {
  type: 'FeatureCollection';
  features: Array<{
    type: 'Feature';
    properties?: Record<string, unknown>;
    geometry: unknown;
  }>;
}

interface RankingItem {
  nome: string;
  total: number;
  percentual: number;
}

@Component({
  selector: 'app-dashboard-admin',
  standalone: false,
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.css',
})
export class DashboardAdminComponent implements OnInit, AfterViewInit, OnDestroy {
  empreendimentos: Empreendimento[] = [];
  agentes: Agente[] = [];
  tipos: RankingItem[] = [];
  municipios: RankingItem[] = [];
  regioes: RankingItem[] = [];
  perfisAgentes: RankingItem[] = [];
  municipiosAgentes: RankingItem[] = [];
  regioesAgentes: RankingItem[] = [];
  visao: 'empreendimentos' | 'agentes' = 'empreendimentos';
  carregando = true;
  erroDados = false;
  carregandoMapa = true;
  erroMapa = false;
  mapa!: L.Map;
  camadaMunicipios?: L.GeoJSON;
  readonly cores = ['#00aabd', '#2f6fe4', '#c4d52f', '#ff8738', '#ef6370', '#7584a8'];

  private readonly mapaUrl = 'assets/geojson/geojs-mun.json';

  constructor(
    private cadastroService: CadastroService,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    this.carregarDados();
  }

  ngAfterViewInit(): void {
    this.inicializarMapa();
  }

  ngOnDestroy(): void {
    this.mapa?.remove();
  }

  carregarDados(): void {
    this.carregando = true;
    this.erroDados = false;

    forkJoin({
      empreendimentos: this.cadastroService.listarEmpresas().pipe(
        catchError(() => {
          this.erroDados = true;
          return of([]);
        }),
      ),
      agentes: this.cadastroService.listarAgentes().pipe(
        catchError(() => {
          this.erroDados = true;
          return of([]);
        }),
      ),
    }).subscribe({
      next: ({ empreendimentos, agentes }) => {
        this.empreendimentos = Array.isArray(empreendimentos) ? empreendimentos : [];
        this.agentes = Array.isArray(agentes) ? agentes : [];
        this.montarIndicadores();
        this.atualizarMapa();
        this.carregando = false;
      },
      error: () => {
        this.erroDados = true;
        this.carregando = false;
      },
    });
  }

  get agentesAtivos(): number {
    return this.agentes.filter((agente) => agente.user_active).length;
  }

  get totalRegioes(): number {
    return this.regioesVisiveis.length;
  }

  get tiposVisiveis(): RankingItem[] {
    return this.visao === 'empreendimentos' ? this.tipos : this.perfisAgentes;
  }

  get municipiosVisiveis(): RankingItem[] {
    return this.visao === 'empreendimentos' ? this.municipios : this.municipiosAgentes;
  }

  get regioesVisiveis(): RankingItem[] {
    return this.visao === 'empreendimentos' ? this.regioes : this.regioesAgentes;
  }

  get totalVisivel(): number {
    return this.visao === 'empreendimentos' ? this.empreendimentos.length : this.agentes.length;
  }

  selecionarVisao(visao: 'empreendimentos' | 'agentes'): void {
    this.visao = visao;
    this.atualizarMapa();
  }

  get gradienteTipos(): string {
    if (!this.tiposVisiveis.length) return '#e6ebed';

    let inicio = 0;
    const faixas = this.tiposVisiveis.map((tipo, index) => {
      const fim = inicio + tipo.percentual;
      const faixa = `${this.cores[index % this.cores.length]} ${inicio}% ${fim}%`;
      inicio = fim;
      return faixa;
    });

    return `conic-gradient(${faixas.join(', ')})`;
  }

  private montarIndicadores(): void {
    this.tipos = this.agrupar(
      this.empreendimentos,
      (item) => item.tipo_proponente || 'Não informado',
    );
    this.municipios = this.agrupar(
      this.empreendimentos,
      (item) => item.ass_cadastro_cidade?.nome_municipio || 'Não informado',
    );
    this.regioes = this.agrupar(
      this.empreendimentos,
      (item) => item.ass_cadastro_cidade?.ass_municipio_regiao?.nome || 'Não informada',
    ).slice(0, 5);
    this.perfisAgentes = this.agrupar(
      this.agentes,
      (item) => item.ass_agente_profile?.perfil || 'Não informado',
    );
    this.municipiosAgentes = this.agrupar(
      this.agentes,
      (item) => item.ass_agente_cidade?.nome_municipio || 'Não informado',
    );
    this.regioesAgentes = this.agrupar(
      this.agentes,
      (item) => item.ass_agente_cidade?.ass_municipio_regiao?.nome || 'Não informada',
    ).slice(0, 5);
  }

  private agrupar<T>(
    itens: T[],
    obterNome: (item: T) => string,
  ): RankingItem[] {
    const contagens = new Map<string, number>();
    itens.forEach((item) => {
      const nome = obterNome(item).trim() || 'Não informado';
      contagens.set(nome, (contagens.get(nome) ?? 0) + 1);
    });

    return Array.from(contagens, ([nome, total]) => ({
      nome,
      total,
      percentual: itens.length ? (total / itens.length) * 100 : 0,
    })).sort((a, b) => b.total - a.total);
  }

  private inicializarMapa(): void {
    this.mapa = L.map('mapa-empreendimentos', {
      zoomControl: false,
      scrollWheelZoom: false,
    }).setView([-5.2, -39.5], 6);

    L.control.zoom({ position: 'topright' }).addTo(this.mapa);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',
      maxZoom: 19,
    }).addTo(this.mapa);

    this.http.get<GeoFeatureCollection>(this.mapaUrl).subscribe({
      next: (geojson) => {
        this.camadaMunicipios = L.geoJSON(geojson as GeoJSON.GeoJsonObject, {
          style: (feature) => this.estiloMunicipio(feature?.properties?.['name']),
          onEachFeature: (feature, layer) => {
            const nome = String(feature.properties?.['name'] ?? 'Município');
            const total = this.totalNoMunicipio(nome);
            layer.bindTooltip(this.textoTooltip(nome, total));
          },
        }).addTo(this.mapa);
        this.mapa.fitBounds(this.camadaMunicipios.getBounds(), { padding: [12, 12] });
        this.carregandoMapa = false;
      },
      error: () => {
        this.carregandoMapa = false;
        this.erroMapa = true;
      },
    });
  }

  private atualizarMapa(): void {
    this.camadaMunicipios?.eachLayer((layer) => {
      const feature = (layer as L.Layer & { feature?: GeoJSON.Feature }).feature;
      const nome = String(feature?.properties?.['name'] ?? 'Município');
      const total = this.totalNoMunicipio(nome);
      (layer as L.Path).setStyle(this.estiloMunicipio(nome));
      layer.unbindTooltip();
      layer.bindTooltip(this.textoTooltip(nome, total));
    });
  }

  private estiloMunicipio(nome: unknown): L.PathOptions {
    const total = this.totalNoMunicipio(String(nome ?? ''));
    const maiorContagem = Math.max(1, ...this.municipiosVisiveis.map((item) => item.total));
    const intensidade = total ? Math.max(0.22, total / maiorContagem) : 0.08;

    return {
      color: '#ffffff',
      weight: 1,
      fillColor: '#00aabd',
      fillOpacity: intensidade,
    };
  }

  private totalNoMunicipio(nome: string): number {
    const normalizado = this.normalizar(nome);
    return this.municipiosVisiveis.find((item) => this.normalizar(item.nome) === normalizado)?.total ?? 0;
  }

  private textoTooltip(nome: string, total: number): string {
    const entidade = this.visao === 'empreendimentos' ? 'empreendimento' : 'agente';
    return `${nome}: ${total} ${entidade}${total === 1 ? '' : 's'}`;
  }

  private normalizar(valor: string): string {
    return valor.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
  }
}
