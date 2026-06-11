import { createReducer, on } from '@ngrx/store';
import type { ArtistState } from '../../models/artist.model';
import { ArtistActions } from './artist.actions';
import { artistAdapter, initialArtistState } from './artist.state';

export const artistsReducer = createReducer<ArtistState>(
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
