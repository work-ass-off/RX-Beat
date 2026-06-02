import { Router, type CanActivateChildFn } from '@angular/router';

import { inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

export const userGuard: CanActivateChildFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isLoggedIn() ? true : router.createUrlTree(['/login']);
};
