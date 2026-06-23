import { effect, inject, Injectable, resource, signal } from '@angular/core';
import { JamendoService } from '../jamendo.service';
import { catchError, EMPTY, map, type Observable } from 'rxjs';
import type { Track, JamendoAutocompleteResponse, JamendoResponse, JamendoTracksResponse } from '../../../models/';
import { NotificationService } from '../../notification/notification.service';
import type { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class JamendoTracksService {
  private _jamendoService = inject(JamendoService);
  private _notificationService = inject(NotificationService);

  public readonly query = signal('');
  private readonly debouncedQuery = signal('');
  private readonly selectedTrack = signal<Track | null>(null);

  public readonly isAutocompleteOpen = signal(false);

  constructor() {
    effect((onCleanup) => {
      const query = this.query();

      const timeout = setTimeout(() => {
        this.debouncedQuery.set(query);

        this.autocompleteResource.reload();
      }, 300);

      onCleanup(() => clearTimeout(timeout));
    });
  }

  public readonly tracksResource = resource({
    loader: async ({ abortSignal }) => {
      const query = this.query().trim();
      const response = await this._jamendoService.get<JamendoResponse<Track[]>>(
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

  public readonly autocompleteResource = resource({
    loader: async ({ abortSignal }) => {
      const query = this.debouncedQuery().trim();

      if (query.length < 2) {
        return {
          tracks: [],
          artists: [],
          albums: [],
          tags: [],
        };
      }

      const response = await this._jamendoService.get<JamendoResponse<JamendoAutocompleteResponse>>(
        'autocomplete',
        {
          prefix: query,
        },
        abortSignal,
      );
      return response.results;
    },
  });

  public readonly similarTracksResource = resource({
    loader: async ({ abortSignal }) => {
      const track = this.selectedTrack();

      if (!track) return [];

      const response = await this._jamendoService.get<JamendoResponse<Track[]>>(
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

  // * HTTPClient

  public getTracks(): Observable<Track[]> {
    return this._jamendoService.getWithHttpClient<JamendoTracksResponse>('tracks', { limit: 30 }, 'tracks').pipe(
      map((response) => response.results),
      catchError((error: HttpErrorResponse) => {
        this._notificationService.show(error.message || 'Something went wrong');
        return EMPTY;
      }),
    );
  }
}
