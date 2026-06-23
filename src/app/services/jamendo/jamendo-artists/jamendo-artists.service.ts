import { inject, Injectable } from '@angular/core';
import { JamendoService } from '../jamendo.service';
import type { Artist, JamnedoArtistsResponse } from '../../../models/';
import { catchError, EMPTY, map, type Observable } from 'rxjs';
import { NotificationService } from '../../notification/notification.service';
import type { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class JamendoArtistsService {
  private _jamendoService = inject(JamendoService);
  private _notificationService = inject(NotificationService);

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
