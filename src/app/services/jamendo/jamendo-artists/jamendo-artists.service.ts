import { inject, Injectable } from '@angular/core';
import { JamendoService } from '../jamendo.service';
import type { JamnedoArtistsResponse } from '../../../models/';
import type { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JamendoArtistsService {
  private jamendoService = inject(JamendoService);

  public getArtists(): Observable<JamnedoArtistsResponse> {
    return this.jamendoService.getWithHttpClient<JamnedoArtistsResponse>('artists', { limit: 10 });
  }
}
