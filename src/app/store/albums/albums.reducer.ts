import { createReducer, on } from '@ngrx/store';
import { AlbumsActions } from './albums.actions';
import type { JamendoAlbums } from '../../models/jamendo.model';

export const albumsFeatureKey = 'albums';

export type AlbumsState = {
  data: JamendoAlbums[] | null;
  isLoading: boolean;
  error: string | null;
};

export const initialState: AlbumsState = {
  data: null,
  isLoading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,

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
