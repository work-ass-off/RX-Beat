import { inject, Injectable, signal } from '@angular/core';
import { JamendoService } from '../jamendo.service';
import { catchError, EMPTY, map, switchMap, type Observable } from 'rxjs';
import type { Album, JamendoAlbumsResponse } from '../../../models/';
import { NotificationService } from '../../notification/notification.service';
import type { HttpErrorResponse } from '@angular/common/http';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class JamendoAlbumsService {
  private _jamendoService = inject(JamendoService);
  private _notificationService = inject(NotificationService);
  public activeAlbumsSearch = signal<string>('');

  public albums$ = toObservable(this.activeAlbumsSearch).pipe(
    switchMap((searchQuery) => {
      const params: Record<string, unknown> = { limit: 30 };
      const namesearch = searchQuery.trim();
      if (namesearch) {
        params['namesearch'] = namesearch;
      }
      return this._jamendoService.getWithHttpClient<JamendoAlbumsResponse>('albums', params, 'albums').pipe(
        map((response) => response.results),
        catchError((error: HttpErrorResponse) => {
          this._notificationService.show(error.message || 'Something went wrong');
          return EMPTY;
        }),
      );
    }),
  );

  public getAlbums(): Observable<Album[]> {
    return this._jamendoService.getWithHttpClient<JamendoAlbumsResponse>('albums', { limit: 30 }, 'albums').pipe(
      map((response) => response.results),
      catchError((error: HttpErrorResponse) => {
        this._notificationService.show(error.message || 'Something went wrong');
        return EMPTY;
      }),
    );
  }

  public getAlbumWithTracks(albumId: string): Observable<Album> {
    return this._jamendoService
      .getWithHttpClient<JamendoAlbumsResponse>('albums/tracks', { limit: 1, id: albumId }, 'tracks')
      .pipe(
        map((response) => response.results[0]),
        catchError((error: HttpErrorResponse) => {
          this._notificationService.show(error.message || 'Something went wrong');
          return EMPTY;
        }),
      );
  }
}
