import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { type Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';

export type JamendoTrack = {
  id: string;
  name: string;
  artist_name: string;
  album_name: string;
  image: string;
  audio: string;
};
export type JamendoResponse = {
  results: JamendoTrack[];
};
@Injectable({
  providedIn: 'root',
})
export class JamendoService {
  private http = inject(HttpClient);

  private readonly baseUrl = 'https://api.jamendo.com/v3.0';

  private readonly clientId = environment.jamendoClientId;

  getPopularTracks(): Observable<JamendoTrack[]> {
    return this.http
      .get<JamendoResponse>(
        `${this.baseUrl}/tracks/?client_id=${this.clientId}&format=json&limit=20&order=popularity_total`,
      )
      .pipe(map((response) => response.results));
  }
}
