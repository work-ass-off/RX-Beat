import { createActionGroup, emptyProps, props } from '@ngrx/store';
import type { Album } from './album.model';

export const AlbumActions = createActionGroup({
  source: 'Album',
  events: {
    // * ALBUMS

    'Load Albums': emptyProps(),
    'Load Albums Success': props<{ albums: Album[] }>(),
    'Load Albums Failure': props<{ error: string }>(),

    // * ALBUMS/TRACKS

    'Load Albums With Tracks': props<{ albumId: string }>(),
    'Load Albums With Tracks Success': props<{ albums: Album[] }>(),
    'Load Albums With Tracks Failure': props<{ error: string }>(),

    // * ALBUMS/MUSICINFO

    'Load Albums Music Info': emptyProps(),
    'Load Albums Music Info Success': props<{ albums: Album[] }>(),
    'Load Albums Music Info Failure': props<{ error: string }>(),
  },
});
