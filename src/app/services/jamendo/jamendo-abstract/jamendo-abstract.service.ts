import { inject, Injectable } from '@angular/core';
import { JamendoService } from '../jamendo.service';
import { NotificationService } from '../../notification/notification.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { catchError, EMPTY, map, type Observable, switchMap } from 'rxjs';
import type { Key, JamendoResponse } from '../../../models';
import type { HttpErrorResponse } from '@angular/common/http';
import { SearchService } from '../../search/search.service';

@Injectable()
export abstract class JamendoAbstractService<T> {
  protected _jamendoService = inject(JamendoService);
  protected _searchService = inject(SearchService);
  protected _notificationService = inject(NotificationService);

  protected abstract endpoint: Key;
  protected abstract defaultParams?: Record<string, unknown>;

  public data$: Observable<T[]> = toObservable(this._searchService.search).pipe(
    switchMap((searchQuery) => {
      const params: Record<string, unknown> = { limit: 30, ...this.defaultParams };
      const namesearch = searchQuery.trim();

      if (namesearch) {
        params['namesearch'] = namesearch;
      }

      return this._jamendoService.getWithHttpClient<JamendoResponse<T[]>>(this.endpoint, params, this.endpoint).pipe(
        map((response) => response.results),
        catchError((error: HttpErrorResponse) => {
          this._notificationService.show(error.message || 'Something went wrong');
          return EMPTY;
        }),
      );
    }),
  );

  public getDataById(id: string): Observable<T> {
    const params: Record<string, unknown> = { limit: 1, id };
    return this._jamendoService
      .getWithHttpClient<JamendoResponse<T[]>>(`${this.endpoint}/tracks`, params, 'tracks')
      .pipe(
        map((response) => response.results[0]),
        catchError((error: HttpErrorResponse) => {
          this._notificationService.show(error.message || 'Something went wrong');
          return EMPTY;
        }),
      );
  }
}
