import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class QuestionarioServiceService {

  constructor(private http: HttpClient) {}

  salvarQuestionario(data: any): Observable<any> {
    return this.http.post(environment.apiUrl + 'novaAtracao', data);
  }
}
