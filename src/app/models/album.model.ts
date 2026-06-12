import type { EntityState } from '@ngrx/entity';
import type { Album } from './';

export type AlbumsState = EntityState<Album> & {
  loading: boolean;
  error: string | null;
};
