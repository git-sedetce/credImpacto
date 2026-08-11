import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  const roles = route.data['roles'] as number[];

  const perfil = authService.getPerfil();

  if (
    perfil !== null &&
    roles.includes(perfil)
  ) {
    return true;
  }

  return router.createUrlTree(['/acesso-negado']);
};
