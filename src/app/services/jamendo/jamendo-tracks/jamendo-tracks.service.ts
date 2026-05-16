import { inject, Injectable, resource } from '@angular/core';
import { JamendoService } from '../jamendo.service';
import type { JamendoResponse, JamendoTrack } from '../../../models/jamendo.model';

@Injectable({
  providedIn: 'root',
})
export class JamendoTracksService {
  private jamendoService = inject(JamendoService);

  readonly popularTracksResource = resource({
    loader: async ({ abortSignal }) => {
      const response = await this.jamendoService.get<JamendoResponse<JamendoTrack>>(
        'tracks',
        {
          limit: 30,
          order: 'popularity_total',
        },
        abortSignal,
      );
      return response.results;
    },
  });
}
