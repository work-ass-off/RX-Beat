import { createReducer, on } from '@ngrx/store';
import type { Album, AlbumsState } from './album.model';
import { AlbumActions } from './album.actions';
import { albumsAdapter, initialAlbumsState } from './album.state';

export const albumsReducer = createReducer<AlbumsState>(
  initialAlbumsState,

  // * LOADING

  on(AlbumActions.loadAlbums, AlbumActions.loadAlbumsWithTracks, AlbumActions.loadAlbumsMusicInfo, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  // * SUCCESS

  on(AlbumActions.loadAlbumsSuccess, AlbumActions.loadAlbumsMusicInfoSuccess, (state, { albums }) =>
    albumsAdapter.upsertMany(albums, { ...state, loading: false }),
  ),

  on(AlbumActions.loadAlbumsWithTracksSuccess, (state, { albums }) => {
    const albumsWithoutTracks: Album[] = albums.map((album) => ({
      id: album.id,
      name: album.name,
      releasedate: album.releasedate,
      artist_id: album.artist_id,
      artist_name: album.artist_name,
      image: album.image,
    }));

    return albumsAdapter.upsertMany(albumsWithoutTracks, { ...state, loading: false });
  }),

  // *FAILURE

  on(
    AlbumActions.loadAlbumsFailure,
    AlbumActions.loadAlbumsWithTracksFailure,
    AlbumActions.loadAlbumsMusicInfoFailure,
    (state, { error }) => ({
      ...state,
      error,
      isLoading: false,
    }),
  ),
);
