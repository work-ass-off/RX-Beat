import { inject, Injectable, signal } from '@angular/core';
import type { Autocomplete, JamendoAutocompleteResponseNew } from '../../../models';
import { catchError, debounceTime, distinctUntilChanged, EMPTY, map, switchMap, type Observable } from 'rxjs';
import type { HttpErrorResponse } from '@angular/common/http';
import { JamendoService } from '../jamendo.service';
import { NotificationService } from '../../notification/notification.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { RoutingService } from '../../routing/routing.service';

@Injectable({
  providedIn: 'root',
})
export class JamendoAutocompleteService {
  private _jamendoService = inject(JamendoService);
  private _notificationService = inject(NotificationService);
  private routingService = inject(RoutingService);

  public readonly queryData = signal<string>('');
  public readonly isAutocompleteOpen = signal(false);

  public getAutocomplete(prefix: string): Observable<Autocomplete> {
    return this._jamendoService
      .getWithHttpClient<JamendoAutocompleteResponseNew>('autocomplete', {
        limit: 30,
        prefix,
        entity: this.routingService.path(),
      })
      .pipe(
        map((response) => response.results),
        catchError((error: HttpErrorResponse) => {
          this._notificationService.show(error.message || 'Something went wrong');
          return EMPTY;
        }),
      );
  }

  public readonly autocomplete$ = toObservable(this.queryData).pipe(
    debounceTime(300),
    distinctUntilChanged((a, b) => a === b),
    switchMap((queryData) => {
      return this.getAutocomplete(queryData);
    }),
  );

  public getAutocompleteItem(autocomplete: Autocomplete): string[] {
    return Object.values(autocomplete)[0] || [];
  }
}
