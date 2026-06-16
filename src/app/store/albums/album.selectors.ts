import { createFeatureSelector, createSelector, type MemoizedSelector } from '@ngrx/store';
import type { Album, AlbumsState } from '../../models/';
import type { Dictionary } from '@ngrx/entity';
import { albumsAdapter } from './album.state';

export const albumsFeatureKey = 'albums';

export const selectAlbumsState = createFeatureSelector<AlbumsState>(albumsFeatureKey);

export const { selectAll, selectEntities } = albumsAdapter.getSelectors();

export const selectAllAlbums = createSelector(selectAlbumsState, selectAll);

export const selectAlbumEntities = createSelector(selectAlbumsState, selectEntities);

export const selectAlbumsLoading = createSelector(selectAlbumsState, (state) => state.loading);

export const selectAlbumsError = createSelector(selectAlbumsState, (state) => state.error);

export const selectAlbumsByArtistId = (artistId: string): MemoizedSelector<object, Album[], (s1: Album[]) => Album[]> =>
  createSelector(selectAllAlbums, (albums) => albums.filter((album) => album.artist_id === artistId));

export const selectAlbumById = (
  id: string,
): MemoizedSelector<object, Album | null, (s1: Dictionary<Album>) => Album | null> =>
  createSelector(selectAlbumEntities, (entities) => entities[id] || null);
