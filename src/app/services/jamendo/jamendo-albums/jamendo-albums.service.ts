import { inject, Injectable } from '@angular/core';
import { JamendoService } from '../jamendo.service';
import { catchError, EMPTY, map, type Observable } from 'rxjs';
import type { Album, JamendoAlbumsResponse } from '../../../models/';
import { NotificationService } from '../../notification/notification.service';
import type { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class JamendoAlbumsService {
  private jamendoService = inject(JamendoService);
  private notificationService = inject(NotificationService);

  public getAlbums(): Observable<Album[]> {
    return this.jamendoService.getWithHttpClient<JamendoAlbumsResponse>('albums', { limit: 30 }).pipe(
      map((response) => response.results),
      catchError((error: HttpErrorResponse) => {
        this.notificationService.show(error.message || 'Something went wrong');
        return EMPTY;
      }),
    );
  }

  public getAlbumWithTracks(albumId: string): Observable<Album> {
    return this.jamendoService
      .getWithHttpClient<JamendoAlbumsResponse>('albums/tracks', { limit: 1, id: albumId })
      .pipe(
        map((response) => response.results[0]),
        catchError((error: HttpErrorResponse) => {
          this.notificationService.show(error.message || 'Something went wrong');
          return EMPTY;
        }),
      );
  }
}
