import type { JamendoResponse } from '../../models/jamendo.model';

export type Artist = {
  id: string;
  name: string;
  website?: string;
  joindate?: string;
  image: string;
};

export type JamnedoArtistsResponse = JamendoResponse<Artist[]>;
