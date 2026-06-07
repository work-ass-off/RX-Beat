import type { Action, ActionReducer } from '@ngrx/store';
import { albumsReducer } from './albums/albums.reducer';
import type { albumsFeatureKey, AlbumsState } from './albums/albums.state';

type AppState = {
  [albumsFeatureKey]: ActionReducer<AlbumsState, Action<string>>;
};

export const appReducer: AppState = {
  albums: albumsReducer,
};
