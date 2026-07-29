import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CadastroService {
  constructor(private http: HttpClient) {}

  buscarCEP(cep: string): Observable<any> {
    return this.http.get(`https://viacep.com.br/ws/${cep}/json/`);
  }
  salvar(formData: FormData) {
    return this.http.post('http://localhost:3000/api/cadastro', formData, {
      reportProgress: true,
      observe: 'events',
    });
  }
}
