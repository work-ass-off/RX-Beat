import { Injectable } from '@angular/core';
import type { Artist, JamnedoArtistsResponse, Key } from '../../../models/';
import { catchError, EMPTY, map, type Observable } from 'rxjs';
import type { HttpErrorResponse } from '@angular/common/http';
import { JamendoAbstractService } from '../jamendo-abstract/jamendo-abstract.service';

@Injectable({
  providedIn: 'root',
})
export class JamendoArtistsService extends JamendoAbstractService<Artist> {
  protected override endpoint: Key = 'artists';
  protected override defaultParams: Record<string, unknown> = {};

  public getArtists(): Observable<Artist[]> {
    return this._jamendoService.getWithHttpClient<JamnedoArtistsResponse>('artists', { limit: 30 }, 'artists').pipe(
      map((response) => response.results),
      catchError((error: HttpErrorResponse) => {
        this._notificationService.show(error.message || 'Something went wrong');
        return EMPTY;
      }),
    );
  }
}
