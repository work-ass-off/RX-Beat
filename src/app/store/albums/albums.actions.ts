import { createActionGroup, emptyProps, props } from '@ngrx/store';
import type { JamendoAlbums } from '../../models/jamendo.model';

export const AlbumsActions = createActionGroup({
  source: 'Albums',
  events: {
    // * ALBUMS

    'Load Albums': emptyProps(),
    'Load Albums Success': props<{ data: JamendoAlbums[] }>(),
    'Load Albums Failure': props<{ error: string }>(),

    // * ALBUMS/TRACKS

    'Load Albums Tracks': emptyProps(),
    'Load Albums Tracks Success': props<{ data: JamendoAlbums[] }>(),
    'Load Albums Tracks Failure': props<{ error: string }>(),

    // * ALBUMS/MUSICINFO

    'Load Albums MusicInfo': emptyProps(),
    'Load Albums MusicInfo Success': props<{ data: JamendoAlbums[] }>(),
    'Load Albums MusicInfo Failure': props<{ error: string }>(),
  },
});
