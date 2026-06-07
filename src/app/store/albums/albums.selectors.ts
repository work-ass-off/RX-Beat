import { createFeatureSelector, createSelector } from '@ngrx/store';
import type { AlbumsState } from './albums.reducer';

export const selectAlbumsState = createFeatureSelector<AlbumsState>('albums');

export const selectAlbums = createSelector(selectAlbumsState, (state) => state.data);
export const selectAlbumsError = createSelector(selectAlbumsState, (state) => state.error);
export const selectAlbumsLoading = createSelector(selectAlbumsState, (state) => state.isLoading);
