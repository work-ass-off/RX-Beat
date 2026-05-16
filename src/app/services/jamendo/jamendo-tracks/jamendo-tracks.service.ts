import { inject, Injectable, resource, signal } from '@angular/core';
import { JamendoService } from '../jamendo.service';
import type { JamendoResponse, JamendoTrack } from '../../../models/jamendo.model';

@Injectable({
  providedIn: 'root',
})
export class JamendoTracksService {
  private jamendoService = inject(JamendoService);

  readonly query = signal('');
  readonly selectedTrack = signal<JamendoTrack | null>(null);

  readonly tracksResource = resource({
    loader: async ({ abortSignal }) => {
      const query = this.query().trim();
      const response = await this.jamendoService.get<JamendoResponse<JamendoTrack>>(
        'tracks',
        query
          ? {
              search: query,
              limit: 30,
              order: 'popularity_total',
            }
          : {
              limit: 30,
              order: 'popularity_total',
            },
        abortSignal,
      );
      return response.results;
    },
  });

  readonly similarTracksResource = resource({
    loader: async ({ abortSignal }) => {
      const track = this.selectedTrack();

      if (!track) return [];

      const response = await this.jamendoService.get<JamendoResponse<JamendoTrack>>(
        'tracks/similar',
        {
          id: track.id,
          limit: 30,
        },
        abortSignal,
      );

      return response.results;
    },
  });
}
