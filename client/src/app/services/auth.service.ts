import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable, tap } from 'rxjs';

interface TokenPayload {
  _id: number;
  _profile_id: number;
  _user_name: string;
  iat: number;
  exp: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'access_token';

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getTokenPayload(): TokenPayload | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    try {
      return jwtDecode<TokenPayload>(token);
    } catch (error) {
      console.error(`Token Inválido: `, error);
      return null;
    }
  }

  getPerfil(): number | null {
    const payload = this.getTokenPayload();

    if (!payload) {
      return null;
    }

    return Number(payload._profile_id);
  }

  isAuthenticated(): boolean {
    const payload = this.getTokenPayload();

    if (!payload) {
      return false;
    }

    const agora = Math.floor(Date.now() / 1000);

    return payload.exp > agora;
  }

  redirecionarPorPerfil(): void {
    const perfil = this.getPerfil();

    switch (perfil) {
      // Admin
      case 1:
        this.router.navigate(['/admin/admin']);
        break;

      // Gestão
      case 2:
        this.router.navigate(['/admin/admin']);
        break;

      // Suporte
      case 3:
        this.router.navigate(['/admin/admin']);
        break;

      // Supervisão
      case 4:
        this.router.navigate(['/admin/admin']);
        break;

      // Agente
      case 5:
        this.router.navigate(['/admin/admin']);
        break;

      // Conformidade
      case 6:
        this.router.navigate(['/home']);
        break;

      // Cliente
      case 7:
        this.router.navigate(['/credimpacto/editdados']);
        break;

      default:
        this.router.navigate(['/login']);
        break;
    }
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/login']);
  }
}
