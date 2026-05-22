import { CanActivateChildFn } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { inject } from '@angular/core';

export const guestGuard: CanActivateChildFn = () => {
  const localStorageService = inject(LocalStorageService);
  return localStorageService.getItem('user') !== null;
};
