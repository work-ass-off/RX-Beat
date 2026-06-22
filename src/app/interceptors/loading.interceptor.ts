import type { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '../services/loading/loading.service';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (request: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const loadingService = inject(LoadingService);

  loadingService.show();

  return next(request).pipe(
    finalize(() => {
      loadingService.hide();
    }),
  );
};
