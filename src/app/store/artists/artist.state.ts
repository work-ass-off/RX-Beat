import { createEntityAdapter, type EntityAdapter } from '@ngrx/entity';
import type { Artist, ArtistState } from './artist.model';

export const artistAdapter: EntityAdapter<Artist> = createEntityAdapter<Artist>({
  selectId: (artist) => artist.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

export const initialArtistState: ArtistState = artistAdapter.getInitialState({
  loading: false,
  error: null,
});
