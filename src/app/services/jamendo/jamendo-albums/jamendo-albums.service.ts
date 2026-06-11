import { inject, Injectable } from '@angular/core';
import { JamendoService } from '../jamendo.service';
import type { Observable } from 'rxjs';
import type { JamendoAlbumsResponse } from '../../../models/';

@Injectable({
  providedIn: 'root',
})
export class JamendoAlbumsService {
  private jamendoService = inject(JamendoService);

  public getAlbums(): Observable<JamendoAlbumsResponse> {
    return this.jamendoService.getWithHttpClient<JamendoAlbumsResponse>('albums', { limit: 10 });
  }
  public getAlbumsWithTracks(albumId: string): Observable<JamendoAlbumsResponse> {
    return this.jamendoService.getWithHttpClient<JamendoAlbumsResponse>('albums/tracks', { limit: 10, id: albumId });
  }
  public getAlbumsMusicInfo(): Observable<JamendoAlbumsResponse> {
    return this.jamendoService.getWithHttpClient<JamendoAlbumsResponse>('albums/musicinfo', { limit: 10 });
  }
}
