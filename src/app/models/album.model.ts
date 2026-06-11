import type { EntityState } from '@ngrx/entity';
import type { Album } from './';

// export type Album = {
//   id: string;
//   name: string;
//   releasedate: string;
//   artist_id: string;
//   artist_name: string;
//   image: string;
//   musicinfo?: {
//     tags: string[];
//     description: Record<string, string>;
//   };
//   tracks?: Track[];
// };

// export type JamendoAlbumsResponse = JamendoResponse<Album[]>;

export type AlbumsState = EntityState<Album> & {
  loading: boolean;
  error: string | null;
};
