import type { EntityState } from '@ngrx/entity';
import type { JamendoResponse } from '../../models/jamendo.model';

export type Artist = {
  id: string;
  name: string;
  website?: string;
  joindate?: string;
  image?: string;
};

export type JamnedoArtistsResponse = JamendoResponse<Artist[]>;

export type ArtistState = EntityState<Artist> & {
  loading: boolean;
  error: string | null;
};
