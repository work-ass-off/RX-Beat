import { createEntityAdapter, type EntityAdapter } from '@ngrx/entity';
import type { Track, TracksState } from '../../models/';

export const tracksAdapter: EntityAdapter<Track> = createEntityAdapter<Track>({
  selectId: (track) => track.id,
  sortComparer: (a, b) => a.position - b.position,
});

export const initialTracksState: TracksState = tracksAdapter.getInitialState({
  loading: false,
  error: null,
});
