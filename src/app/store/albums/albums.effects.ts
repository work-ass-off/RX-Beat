import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AlbumsActions } from './albums.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { JamendoAlbumsService } from '../../services/jamendo/jamendo-albums/jamendo-albums.service';

@Injectable()
export class AlbumsEffects {
  private actions$ = inject(Actions);
  private jamendoAlbumsService = inject(JamendoAlbumsService);

  public loadAldums$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AlbumsActions.loadAlbums),
      switchMap(() =>
        this.jamendoAlbumsService.getAlbums().pipe(
          map((res) => AlbumsActions.loadAlbumsSuccess({ data: res.results })),
          catchError((err: Error) => of(AlbumsActions.loadAlbumsFailure({ error: err.message }))),
        ),
      ),
    ),
  );

  public loadAldumsTracks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AlbumsActions.loadAlbumsTracks),
      switchMap(() =>
        this.jamendoAlbumsService.getAlbums().pipe(
          map((res) => AlbumsActions.loadAlbumsTracksSuccess({ data: res.results })),
          catchError((err: Error) => of(AlbumsActions.loadAlbumsTracksFailure({ error: err.message }))),
        ),
      ),
    ),
  );

  public loadAldumsMusicInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AlbumsActions.loadAlbumsMusicInfo),
      switchMap(() =>
        this.jamendoAlbumsService.getAlbums().pipe(
          map((res) => AlbumsActions.loadAlbumsMusicInfoSuccess({ data: res.results })),
          catchError((err: Error) => of(AlbumsActions.loadAlbumsMusicInfoFailure({ error: err.message }))),
        ),
      ),
    ),
  );
}
