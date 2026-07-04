import { Injectable } from '@angular/core';
import { catchError, EMPTY, map, type Observable } from 'rxjs';
import type { Album, JamendoAlbumsResponse, Key } from '../../../models/';
import type { HttpErrorResponse } from '@angular/common/http';
import { JamendoAbstractService } from '../jamendo-abstract/jamendo-abstract.service';
@Injectable({
  providedIn: 'root',
})
export class JamendoAlbumsService extends JamendoAbstractService<Album> {
  protected override endpoint: Key = 'albums';
  protected override defaultParams: Record<string, unknown> = {};

  public getAlbums(): Observable<Album[]> {
    return this._jamendoService.getWithHttpClient<JamendoAlbumsResponse>('albums', { limit: 30 }, 'albums').pipe(
      map((response) => response.results),
      catchError((error: HttpErrorResponse) => {
        this._notificationService.show(error.message || 'Something went wrong');
        return EMPTY;
      }),
    );
  }
}
