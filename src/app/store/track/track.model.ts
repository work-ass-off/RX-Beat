import type { EntityState } from '@ngrx/entity';
import type { JamendoResponse } from '../../models/jamendo.model';

export type Track = {
  id: string;
  name: string;
  duration: number;
  releasedate: string;
  position: number;
  audio: string;
  image: string;
  artist_id: string;
  artist_name: string;
  album_id: string;
  album_name: string;
};

export type JamendoTracksResponse = JamendoResponse<Track[]>;

export type TracksState = EntityState<Track> & {
  loading: boolean;
  error: string | null;
};
