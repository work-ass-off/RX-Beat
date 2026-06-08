import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, type EntityAdapter, type EntityState } from '@ngrx/entity';
import type { Album } from './album.model';
import { AlbumActions } from './album.actions';

export type AlbumsState = EntityState<Album> & {
  loading: boolean;
  error: string | null;
};

export const albumsAdapter: EntityAdapter<Album> = createEntityAdapter<Album>({
  selectId: (album) => album.id,
  sortComparer: (a, b) => b.releasedate.localeCompare(a.releasedate),
});

export const initialAlbumsState: AlbumsState = albumsAdapter.getInitialState({
  loading: false,
  error: null,
});

export const albumsReducer = createReducer<AlbumsState>(
  initialAlbumsState,

  // * LOADING

  on(AlbumActions.loadAlbums, AlbumActions.loadAlbumsWithTracks, AlbumActions.loadAlbumsMusicInfo, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  // * SUCCESS

  on(AlbumActions.loadAlbumsSuccess, AlbumActions.loadAlbumsMusicInfoSuccess, (state, { albums }) =>
    albumsAdapter.upsertMany(albums, { ...state, loading: false }),
  ),

  on(AlbumActions.loadAlbumsWithTracksSuccess, (state, { albums }) => {
    const albumsWithoutTracks: Album[] = albums.map((album) => ({
      id: album.id,
      name: album.name,
      releasedate: album.releasedate,
      artist_id: album.artist_id,
      artist_name: album.artist_name,
      image: album.image,
    }));

    return albumsAdapter.upsertMany(albumsWithoutTracks, { ...state, loading: false });
  }),

  // *FAILURE

  on(
    AlbumActions.loadAlbumsFailure,
    AlbumActions.loadAlbumsWithTracksFailure,
    AlbumActions.loadAlbumsMusicInfoFailure,
    (state, { error }) => ({
      ...state,
      error,
      isLoading: false,
    }),
  ),
);
