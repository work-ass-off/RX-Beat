import { Injectable } from '@angular/core';
import { catchError, EMPTY, map, type Observable } from 'rxjs';
import type { JamendoTracksResponse, Key, Track } from '../../../models/';
import type { HttpErrorResponse } from '@angular/common/http';
import { JamendoAbstractService } from '../jamendo-abstract/jamendo-abstract.service';

@Injectable({
  providedIn: 'root',
})
export class JamendoTracksService extends JamendoAbstractService<Track> {
  protected override endpoint: Key = 'tracks';
  protected override defaultParams: Record<string, unknown> = { order: 'popularity_total' };

  public getTracks(): Observable<Track[]> {
    return this._jamendoService
      .getWithHttpClient<JamendoTracksResponse>('tracks', { limit: 30, order: 'popularity_total' }, 'tracks')
      .pipe(
        map((response) => response.results),
        catchError((error: HttpErrorResponse) => {
          this._notificationService.show(error.message || 'Something went wrong');
          return EMPTY;
        }),
      );
  }
}
