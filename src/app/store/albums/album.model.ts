import type { EntityState } from '@ngrx/entity';
import type { JamendoResponse } from '../../models/jamendo.model';

export type Album = {
  id: string;
  name: string;
  releasedate: string;
  artist_id: string;
  artist_name?: string;
  image: string;
  musicinfo?: {
    tags: string[];
    description: Record<string, string>;
  };
};

export type JamendoAlbumsResponse = JamendoResponse<Album[]>;

export type AlbumsState = EntityState<Album> & {
  loading: boolean;
  error: string | null;
};
