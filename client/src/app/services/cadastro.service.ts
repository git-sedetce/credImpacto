import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

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

  consultarCPF(cpf: string): Observable<any> {
    return this.http.get(environment.apiUrl + 'consultacpf/' + cpf);
  }

  consultarCNPJ(cnpj: string): Observable<any> {
    return this.http.get(environment.apiUrl + 'consultacnpj/' + cnpj);
  }

  consultarEmail(email: string): Observable<any> {
    return this.http.get(environment.apiUrl + 'consultaemail/' + email);
  }
}
