import { artistsReducer } from './artists/artist.reducer';
import { albumsReducer } from './albums/album.reducer';
import type { Action, ActionReducer } from '@ngrx/store';
import type { artistsFeatureKey } from './artists/artist.selectors';
import type { albumsFeatureKey } from './albums/album.selectors';
import type { ArtistState } from './artists/artist.model';
import type { AlbumsState } from './albums/album.model';

type AppState = {
  [albumsFeatureKey]: ActionReducer<AlbumsState, Action<string>>;
  [artistsFeatureKey]: ActionReducer<ArtistState, Action<string>>;
};

export const appReducer: AppState = {
  albums: albumsReducer,
  artists: artistsReducer,
};
