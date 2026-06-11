import type { CanActivateChildFn } from '@angular/router';

import { inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

export const guestGuard: CanActivateChildFn = () => {
  const authService = inject(AuthService);
  return !authService.isLoggedIn();
};
