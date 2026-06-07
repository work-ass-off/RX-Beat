import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const PlaylistsActions = createActionGroup({
  source: 'Playlists',
  events: {
    'Load Playlistss': emptyProps(),
    'Load Playlistss Success': props<{ data: unknown }>(),
    'Load Playlistss Failure': props<{ error: unknown }>(),
  },
});
