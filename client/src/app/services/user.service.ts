import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Md5 } from 'ts-md5';
import { environment } from '../../environments/environment.development';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.loadUserFromToken();
  }

  // ------ UTILIDADES ------ //

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  private loadUserFromToken() {
    if (!this.isBrowser()) return;

    const token = this.getToken();
    if (!token) return;

    try {
      const decoded = jwtDecode<any>(token);
      this.userSubject.next(decoded);
    } catch (e) {
      this.userSubject.next(null);
    }
  }

  CriptografarMD5(value: string | undefined): string | undefined {
    return Md5.hashStr(value!).toString();
  }

  getToken(): string | null {
    if (!this.isBrowser()) return null;
    return localStorage.getItem('access_token');
  }

  getUser() {
    return this.userSubject.value;
  }

  isLogged(): boolean {
    return !!this.userSubject.value;
  }

  hasRole(roles: number[]): boolean {
    const user = this.getUser();
    return user && roles.includes(user._profile_id);
  }

  // ------ AUTENTICAÇÃO ------ //

  login(data: any): Observable<any> {
    // Transforma o campo email/cpf para o formato esperado pelo backend
    const loginData = this.transformLoginData(data);
    
    return this.http.post<any>(environment.apiUrl + 'login', loginData).pipe(
      tap((response) => {
        localStorage.setItem('access_token', response.token);
        const decoded = jwtDecode(response.token);
        this.userSubject.next(decoded);

        this.router.navigate(['/admin']);
      }),
    );
  }

  private transformLoginData(data: any): any {
    const transformedData = { ...data };
    
    // Se o campo é email, mantém como email; se é CPF, transforma para cpf
    if (data.email) {
      const emailOrCpf = data.email;
      
      // Verifica se é um email (contém @) ou um CPF
      if (emailOrCpf.includes('@')) {
        transformedData.email = emailOrCpf;
        delete transformedData.cpf;
      } else {
        // Se não tem @, assume que é CPF
        transformedData.cpf = emailOrCpf;
        delete transformedData.email;
      }
    }
    
    return transformedData;
  }

  logout() {
    localStorage.removeItem('access_token');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  // ------ REQUISIÇÕES ------ //

  resetPin(data: any): Observable<any> {
    // Transforma o campo email/cpf para o formato esperado pelo backend
    const loginData = this.transformLoginData(data);
    return this.http.post(environment.apiUrl + 'newPin', loginData);
  }
}
