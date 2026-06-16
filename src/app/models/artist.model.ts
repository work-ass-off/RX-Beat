import type { EntityState } from '@ngrx/entity';
import type { Artist } from './';

export type ArtistState = EntityState<Artist> & {
  loading: boolean;
  error: string | null;
};
