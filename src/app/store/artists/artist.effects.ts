import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ArtistActions } from './artist.actions';
import { JamendoArtistsService } from '../../services/jamendo/jamendo-artists/jamendo-artists.service';

@Injectable()
export class ArtistsEffects {
  private actions$ = inject(Actions);
  private jamendoArtistsService = inject(JamendoArtistsService);

  public loadArtists$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ArtistActions.loadArtists),
      switchMap(() =>
        this.jamendoArtistsService.getArtists().pipe(
          map((res) => ArtistActions.loadArtistsSuccess({ artists: res.results })),
          catchError((error: Error) => of(ArtistActions.loadArtistsFailure({ error: error.message }))),
        ),
      ),
    ),
  );
}
