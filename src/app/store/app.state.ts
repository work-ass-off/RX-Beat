import type { Action, ActionReducer } from '@ngrx/store';
import { albumsReducer } from './albums/albums.reducer';
import type { albumsFeatureKey, AlbumsState } from './albums/albums.state';
import { artistsReducer, type ArtistState } from './artists/artist.reducer';
import type { artistsFeatureKey } from './artists/artist.selectors';

type AppState = {
  [albumsFeatureKey]: ActionReducer<AlbumsState, Action<string>>;
  [artistsFeatureKey]: ActionReducer<ArtistState, Action<string>>;
};

export const appReducer: AppState = {
  albums: albumsReducer,
  artists: artistsReducer,
};
