import { inject, Injectable } from '@angular/core';
import { NotificationService } from '../../notification/notification.service';
import { JamendoService } from '../jamendo.service';
import { catchError, EMPTY, map, type Observable } from 'rxjs';
import type { JamendoTracksResponse, Track } from '../../../models';
import { type HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class JamendoPlaylistService {
  private _jamendoService = inject(JamendoService);
  private _notificationService = inject(NotificationService);

  public getPlaylistTracks(id: string[]): Observable<Track[]> {
    return this._jamendoService
      .getWithHttpClient<JamendoTracksResponse>('tracks', { limit: 30, id: id.join(' ') })
      .pipe(
        map((response) => response.results),
        catchError((error: HttpErrorResponse) => {
          this._notificationService.show(error.message || 'Something went wrong');
          return EMPTY;
        }),
      );
  }
}
