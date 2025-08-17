import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  // Verifica se o usuário está autenticado.
  if (authService.getIsAuthenticatedValue()) {
    return true; // Permite o acesso à rota
  }

  // Se não estiver autenticado, redireciona para a página de login.
  router.navigate(['/login']);
  return false;
};
