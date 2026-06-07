import { createReducer, on } from '@ngrx/store';
import { AlbumsActions } from './albums.actions';
import { type AlbumsState, initialAlbumsState } from './albums.state';

export const albumsReducer = createReducer<AlbumsState>(
  initialAlbumsState,

  // * LOADING

  on(AlbumsActions.loadAlbums, AlbumsActions.loadAlbumsTracks, AlbumsActions.loadAlbumsMusicInfo, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  // * SUCCESS

  on(
    AlbumsActions.loadAlbumsSuccess,
    AlbumsActions.loadAlbumsTracksSuccess,
    AlbumsActions.loadAlbumsMusicInfoSuccess,
    (state, { data }) => ({
      ...state,
      data,
      isLoading: false,
    }),
  ),

  // *FAILURE

  on(
    AlbumsActions.loadAlbumsFailure,
    AlbumsActions.loadAlbumsTracksFailure,
    AlbumsActions.loadAlbumsMusicInfoFailure,
    (state, { error }) => ({
      ...state,
      error,
      isLoading: false,
    }),
  ),
);
