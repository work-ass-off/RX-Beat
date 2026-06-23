import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { TrackActions } from './track.actions';
import { JamendoTracksService } from '../../services/jamendo/jamendo-tracks/jamendo-tracks.service';
import { ArtistActions } from '../artists/artist.actions';

@Injectable()
export class TracksEffects {
  private actions$ = inject(Actions);
  private jamendoTracksService = inject(JamendoTracksService);
  public loadTracks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrackActions.loadTracks),
      switchMap(() =>
        this.jamendoTracksService.getTracks().pipe(
          switchMap((tracks) => [
            TrackActions.loadTracksSuccess({ tracks: tracks }),
            ArtistActions.loadExternalArtistsSuccess({
              artists: tracks.map((track) => ({
                id: track.artist_id,
                name: track.artist_name,
              })),
            }),
          ]),
          catchError((error: Error) => of(TrackActions.loadTracksFailure({ error: error.message }))),
        ),
      ),
    ),
  );
}
