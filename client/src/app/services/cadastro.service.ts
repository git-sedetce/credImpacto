import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Cadastro } from '../model/cadastro.model';

@Injectable({
  providedIn: 'root',
})
export class CadastroService {
  constructor(private http: HttpClient) {}

  getAddressByCEP(cep: string): Observable<any> {
    return this.http.get(`https://viacep.com.br/ws/${cep}/json/`);
  }

  getCitys(metodo: string): Observable<any> {
    return this.http.get(environment.apiUrl + metodo);
  }

  salvar(formData: FormData) {
    return this.http.post(environment.apiUrl + 'registerCompleto', formData, {
      reportProgress: true,
      observe: 'events',
    });
  }

  salvarAdmin(data: Cadastro) {
    return this.http.post(environment.apiUrl + 'registeradmin', data);
  }

  consultarCPF(cpf: string): Observable<any> {
    return this.http.get(environment.apiUrl + 'consultacpf/' + cpf);
  }

  consultarCNPJ(cnpj: string): Observable<any> {
    return this.http.get(environment.apiUrl + 'consultacnpj/' + cnpj);
  }

  consultarEmail(email: string): Observable<any> {
    return this.http.get(environment.apiUrl + 'consultaemail/' + email);
  }

  getProfiles(metodo: string): Observable<any> {
    return this.http.get(environment.apiUrl + metodo);
  }

  empresaId(id: number): Observable<any> {
    // return this.http.get<any>(`${environment.apiUrl}/companiebyid/${id}`);
    return this.http.get(environment.apiUrl + 'companiebyid/' + id);
  }

  imagensId(id: number): Observable<any> {
    // return this.http.get<any>(`${environment.apiUrl}/companiebyid/${id}`);
    return this.http.get(environment.apiUrl + 'imagens/' + id);
  }

  atualizarEmpresa(id: number, dados: any): Observable<any> {
    return this.http.put<any>(
      `${environment.apiUrl}/updatecompanie/${id}`,
      dados,
    );
  }
}
