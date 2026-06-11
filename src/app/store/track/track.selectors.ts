import { createFeatureSelector, createSelector, type MemoizedSelector } from '@ngrx/store';
import type { Dictionary } from '@ngrx/entity';
import { tracksAdapter } from './track.state';
import type { Track, TracksState } from '../../models/';

export const tracksFeatureKey = 'tracks';

export const { selectAll, selectEntities } = tracksAdapter.getSelectors();

export const selectTracksState = createFeatureSelector<TracksState>(tracksFeatureKey);

export const selectAllTracks = createSelector(selectTracksState, selectAll);

export const selectTracksEntities = createSelector(selectTracksState, selectEntities);

export const selectTracksLoading = createSelector(selectTracksState, (state) => state.loading);

export const selectTracksByAlbumId = (albumId: string): MemoizedSelector<object, Track[], (s1: Track[]) => Track[]> =>
  createSelector(selectAllTracks, (tracks) => tracks.filter((track) => track.album_id === albumId));

export const selectTracksByArtistId = (artistId: string): MemoizedSelector<object, Track[], (s1: Track[]) => Track[]> =>
  createSelector(selectAllTracks, (tracks) => tracks.filter((track) => track.artist_id === artistId));

export const selectTrackById = (
  id: string,
): MemoizedSelector<object, Track | null, (s1: Dictionary<Track>) => Track | null> =>
  createSelector(selectTracksEntities, (entities) => entities[id] || null);
