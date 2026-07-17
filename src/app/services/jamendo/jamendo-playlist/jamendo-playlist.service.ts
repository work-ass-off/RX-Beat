import { inject, Injectable } from '@angular/core';
import { JamendoService } from '../jamendo.service';
import { catchError, EMPTY, map, type Observable } from 'rxjs';
import type { JamendoTracksResponse, Track } from '../../../models';
import { type HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../../toast/toast.service';

@Injectable({
  providedIn: 'root',
})
export class JamendoPlaylistService {
  private _jamendoService = inject(JamendoService);
  private toastService = inject(ToastService);

  public getPlaylistTracks(id: string[]): Observable<Track[]> {
    return this._jamendoService
      .getWithHttpClient<JamendoTracksResponse>('tracks', { limit: 30, id: id.join(' ') }, 'tracks')
      .pipe(
        map((response) => response.results),
        catchError((error: HttpErrorResponse) => {
          this.toastService.error(error.message || 'Something went wrong');
          return EMPTY;
        }),
      );
  }
}
