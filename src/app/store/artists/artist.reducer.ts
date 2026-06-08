import { createReducer, on } from '@ngrx/store';
import { type EntityState, type EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import type { Artist } from './artist.model';
import { ArtistActions } from './artist.actions';

export type ArtistState = EntityState<Artist> & {
  loading: boolean;
  error: string | null;
};

export const artistAdapter: EntityAdapter<Artist> = createEntityAdapter<Artist>({
  selectId: (artist) => artist.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

export const initialArtistState: ArtistState = artistAdapter.getInitialState({
  loading: false,
  error: null,
});

export const artistsReducer = createReducer(
  initialArtistState,

  on(ArtistActions.loadArtists, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(ArtistActions.loadArtistsSuccess, ArtistActions.loadExternalArtistsSuccess, (state, { artists }) => {
    return artistAdapter.upsertMany(artists, {
      ...state,
      loading: false,
    });
  }),

  on(ArtistActions.loadArtistsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);
