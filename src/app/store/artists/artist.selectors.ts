import { createFeatureSelector, createSelector, type MemoizedSelector } from '@ngrx/store';
import { artistAdapter, type ArtistState } from './artist.reducer';
import type { Artist } from './artist.model';
import type { Dictionary } from '@ngrx/entity';

export const artistsFeatureKey = 'artists';

export const { selectAll, selectEntities } = artistAdapter.getSelectors();

export const selectArtistState = createFeatureSelector<ArtistState>(artistsFeatureKey);

export const selectAllArtists = createSelector(selectArtistState, selectAll);

export const selectArtistEntities = createSelector(selectArtistState, selectEntities);

export const selectArtistsLoading = createSelector(selectArtistState, (state) => state.loading);

export const selectArtistById = (
  id: string,
): MemoizedSelector<object, Artist | null, (s1: Dictionary<Artist>) => Artist | null> =>
  createSelector(selectArtistEntities, (entities) => entities[id] || null);
