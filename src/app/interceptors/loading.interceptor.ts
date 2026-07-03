import type { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '../services/loading/loading.service';
import { delay, finalize } from 'rxjs';
import { LOADER_TYPE } from '../services/loading/loading.context';
import type { Key } from '../models';

export const loadingInterceptor: HttpInterceptorFn = (request: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const loadingService = inject(LoadingService);

  const loaderType = request.context.get<Key>(LOADER_TYPE);

  loadingService.show(loaderType);

  return next(request).pipe(
    delay(250),
    finalize(() => {
      loadingService.hide(loaderType);
    }),
  );
};
