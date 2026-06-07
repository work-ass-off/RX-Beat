import type { JamendoAlbums } from '../../models/jamendo.model';

export const albumsFeatureKey = 'albums';

export type AlbumsState = {
  data: JamendoAlbums[] | null;
  isLoading: boolean;
  error: string | null;
};

export const initialAlbumsState: AlbumsState = {
  data: null,
  isLoading: false,
  error: null,
};
