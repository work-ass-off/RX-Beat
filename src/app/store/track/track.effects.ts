import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import { TrackActions } from './track.actions';

@Injectable()
export class TrackEffects {
  private actions$ = inject(Actions);
  public loadTracks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TrackActions.loadTracks),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map((tracks) => TrackActions.loadTracks({ tracks })),
          catchError((error: Error) => of(TrackActions.failureTracks({ error: error.message }))),
        ),
      ),
    );
  });
}
