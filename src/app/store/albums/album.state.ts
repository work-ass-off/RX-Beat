import { createEntityAdapter, type EntityAdapter } from '@ngrx/entity';
import type { Album, AlbumsState } from '../../models/';

export const albumsAdapter: EntityAdapter<Album> = createEntityAdapter<Album>({
  selectId: (album) => album.id,
  sortComparer: (a, b) => b.releasedate.localeCompare(a.releasedate),
});

export const initialAlbumsState: AlbumsState = albumsAdapter.getInitialState({
  loading: false,
  error: null,
});
