import { artistsReducer } from './artists/artist.reducer';
import { albumsReducer } from './albums/album.reducer';
import { tracksReducer } from './track/track.reducer';
import type { Action, ActionReducer } from '@ngrx/store';
import type { artistsFeatureKey } from './artists/artist.selectors';
import type { albumsFeatureKey } from './albums/album.selectors';
import type { ArtistState, AlbumsState, TracksState } from '../models/';
import type { tracksFeatureKey } from './track/track.selectors';

type AppState = {
  [albumsFeatureKey]: ActionReducer<AlbumsState, Action<string>>;
  [artistsFeatureKey]: ActionReducer<ArtistState, Action<string>>;
  [tracksFeatureKey]: ActionReducer<TracksState, Action<string>>;
};

export const appReducer: AppState = {
  albums: albumsReducer,
  artists: artistsReducer,
  tracks: tracksReducer,
};
