import { createReducer, on } from '@ngrx/store';
import type { Track } from '../../models/';
import { TrackActions } from './track.actions';
import { AlbumActions } from '../albums/album.actions';
import { initialTracksState, tracksAdapter } from './track.state';

export const tracksReducer = createReducer(
  initialTracksState,
  on(TrackActions.loadTracks, (state) => ({ ...state, loading: true, error: null })),

  on(TrackActions.loadTracksSuccess, (state, { tracks }) => {
    const clearedTracks: Track[] = tracks.map((track) => ({
      id: track.id,
      name: track.name,
      duration: track.duration,
      releasedate: track.releasedate,
      audio: track.audio,
      image: track.image,
      position: track.position,
      album_id: track.album_id,
      artist_id: track.artist_id,
      album_name: track.album_name,
      artist_name: track.artist_name,
    }));

    return tracksAdapter.upsertMany(clearedTracks, { ...state, loading: false });
  }),

  on(AlbumActions.loadAlbumsWithTracksSuccess, (state, { albums }) => {
    const allTracks: Track[] = [];

    albums.forEach((album) => {
      if (album.tracks) {
        album.tracks.forEach((rawTrack: Track) => {
          allTracks.push({
            id: rawTrack.id,
            name: rawTrack.name,
            duration: rawTrack.duration,
            releasedate: album.releasedate,
            audio: rawTrack.audio,
            image: album.image,
            position: rawTrack.position,
            album_id: album.id,
            artist_id: album.artist_id,
            album_name: album.name,
            artist_name: album.artist_name,
          });
        });
      }
    });

    return tracksAdapter.upsertMany(allTracks, { ...state, loading: false });
  }),

  on(TrackActions.loadTracksFailure, AlbumActions.loadAlbumsWithTracksFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);
