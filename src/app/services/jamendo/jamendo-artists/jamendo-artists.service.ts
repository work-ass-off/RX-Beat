import { inject, Injectable, signal } from '@angular/core';
import { JamendoService } from '../jamendo.service';
import type { Artist, JamnedoArtistsResponse } from '../../../models/';
import { catchError, EMPTY, map, switchMap, type Observable } from 'rxjs';
import { NotificationService } from '../../notification/notification.service';
import type { HttpErrorResponse } from '@angular/common/http';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class JamendoArtistsService {
  private _jamendoService = inject(JamendoService);
  private _notificationService = inject(NotificationService);
  public activeArtistsSearch = signal<string>('');

  public artists$ = toObservable(this.activeArtistsSearch).pipe(
    switchMap((searchQuery) => {
      const params: Record<string, unknown> = { limit: 30 };
      const namesearch = searchQuery.trim();
      if (namesearch) {
        params['namesearch'] = namesearch;
      }
      return this._jamendoService.getWithHttpClient<JamnedoArtistsResponse>('artists', params, 'artists').pipe(
        map((response) => response.results),
        catchError((error: HttpErrorResponse) => {
          this._notificationService.show(error.message || 'Something went wrong');
          return EMPTY;
        }),
      );
    }),
  );

  public getArtists(): Observable<Artist[]> {
    return this._jamendoService.getWithHttpClient<JamnedoArtistsResponse>('artists', { limit: 30 }, 'artists').pipe(
      map((response) => response.results),
      catchError((error: HttpErrorResponse) => {
        this._notificationService.show(error.message || 'Something went wrong');
        return EMPTY;
      }),
    );
  }

  public getArtistWithTracks(artistId: string): Observable<Artist> {
    return this._jamendoService
      .getWithHttpClient<JamnedoArtistsResponse>('artists/tracks', { limit: 1, id: artistId }, 'tracks')
      .pipe(
        map((response) => response.results[0]),
        catchError((error: HttpErrorResponse) => {
          this._notificationService.show(error.message || 'Something went wrong');
          return EMPTY;
        }),
      );
  }
}
