import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AlbumActions } from './album.actions';
import { catchError, of, switchMap } from 'rxjs';
import { JamendoAlbumsService } from '../../services/jamendo/jamendo-albums/jamendo-albums.service';
import { ArtistActions } from '../artists/artist.actions';
import type { Album } from '../../models';

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
              artists: response.results.map((album: Album) => ({
                id: album.artist_id,
                name: album.artist_name,
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
      switchMap(({ albumId }) =>
        this.jamendoAlbumsService.getAlbumWithTracks(albumId).pipe(
          switchMap((response) => [
            AlbumActions.loadAlbumsWithTracksSuccess({ albums: response.results }),
            ArtistActions.loadExternalArtistsSuccess({
              artists: response.results.map((album: Album) => ({
                id: album.artist_id,
                name: album.artist_name,
              })),
            }),
          ]),
          catchError((err: Error) => of(AlbumActions.loadAlbumsWithTracksFailure({ error: err.message }))),
        ),
      ),
    ),
  );
}
