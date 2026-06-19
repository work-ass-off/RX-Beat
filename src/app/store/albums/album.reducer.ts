import { createReducer, on } from '@ngrx/store';
import type { Album, AlbumsState } from '../../models/';
import { AlbumActions } from './album.actions';
import { albumsAdapter, initialAlbumsState } from './album.state';

export const albumsReducer = createReducer<AlbumsState>(
  initialAlbumsState,

  // * LOADING

  on(AlbumActions.loadAlbums, AlbumActions.loadAlbumWithTracks, AlbumActions.loadAlbumsMusicInfo, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  // * SUCCESS

  on(AlbumActions.loadAlbumsSuccess, AlbumActions.loadAlbumsMusicInfoSuccess, (state, { albums }) =>
    albumsAdapter.upsertMany(albums, { ...state, loading: false }),
  ),

  on(AlbumActions.loadAlbumWithTracksSuccess, (state, { album }) => {
    const albumWithoutTracks: Album[] = [
      {
        id: album.id,
        name: album.name,
        releasedate: album.releasedate,
        artist_id: album.artist_id,
        artist_name: album.artist_name,
        image: album.image,
      },
    ];

    return albumsAdapter.upsertMany(albumWithoutTracks, { ...state, loading: false });
  }),

  // *FAILURE

  on(
    AlbumActions.loadAlbumsFailure,
    AlbumActions.loadAlbumWithTracksFailure,
    AlbumActions.loadAlbumsMusicInfoFailure,
    (state, { error }) => ({
      ...state,
      error,
      isLoading: false,
    }),
  ),
);
