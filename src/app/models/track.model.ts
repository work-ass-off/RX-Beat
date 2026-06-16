import type { EntityState } from '@ngrx/entity';
import type { Track } from './';

export type TracksState = EntityState<Track> & {
  loading: boolean;
  error: string | null;
};
