import { type HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { inject } from '@angular/core';
import { catchError, EMPTY } from 'rxjs';
import { ToastService } from '../services/toast/toast.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const localStorageService = inject(LocalStorageService);
  const toastService = inject(ToastService);
  if (!req.url.startsWith(environment.rxBeatUrl)) {
    return next(req);
  }

  const token = localStorageService.getItem('token');
  const authReq = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
    : req;

  return next(authReq).pipe(
    catchError((err) => {
      if (err.status === 401) {
        localStorageService.removeItem('token');
      }
      toastService.info('Please log in to continue');
      return EMPTY;
    }),
  );
};
