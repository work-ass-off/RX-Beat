import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AlbumActions } from './album.actions';
import { catchError, of, switchMap } from 'rxjs';
import { JamendoAlbumsService } from '../../services/jamendo/jamendo-albums/jamendo-albums.service';
import { ArtistActions } from '../artists/artist.actions';

@Injectable()
export class AlbumsEffects {
  private actions$ = inject(Actions);
  private jamendoAlbumsService = inject(JamendoAlbumsService);

  public loadAlbums$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AlbumActions.loadAlbums),
      switchMap(() =>
        this.jamendoAlbumsService.getAlbums().pipe(
          switchMap((response) => [
            AlbumActions.loadAlbumsSuccess({ albums: response.results }),
            ArtistActions.loadExternalArtistsSuccess({
              artists: response.results.map((artist) => ({
                id: artist.artist_id,
                name: artist.artist_name,
                image: artist.image,
              })),
            }),
          ]),
          catchError((err: Error) => of(AlbumActions.loadAlbumsFailure({ error: err.message }))),
        ),
      ),
    ),
  );

  public loadAldumsTracks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AlbumActions.loadAlbumsWithTracks),
      switchMap(() =>
        this.jamendoAlbumsService.getAlbumsWithTracks().pipe(
          switchMap((response) => [
            AlbumActions.loadAlbumsWithTracksSuccess({ albums: response.results }),
            ArtistActions.loadExternalArtistsSuccess({
              artists: response.results.map((artist) => ({
                id: artist.artist_id,
                name: artist.name,
                image: artist.image,
              })),
            }),
          ]),
          catchError((err: Error) => of(AlbumActions.loadAlbumsWithTracksFailure({ error: err.message }))),
        ),
      ),
    ),
  );
}
