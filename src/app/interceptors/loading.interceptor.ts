import type { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '../services/loading/loading.service';
import { finalize } from 'rxjs';
import { LOADER_TYPE } from '../services/loading/loading.context';

export const loadingInterceptor: HttpInterceptorFn = (request: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const loadingService = inject(LoadingService);

  const loaderType = request.context.get(LOADER_TYPE);

  loadingService.show(loaderType);

  return next(request).pipe(
    finalize(() => {
      loadingService.hide(loaderType);
    }),
  );
};
