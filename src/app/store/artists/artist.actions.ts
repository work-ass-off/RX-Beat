import { createActionGroup, emptyProps, props } from '@ngrx/store';

import type { Artist } from '../../models/';

export const ArtistActions = createActionGroup({
  source: 'Artist',
  events: {
    'Load Artists': emptyProps(),
    'Load Artists Success': props<{ artists: Artist[] }>(),
    'Load Artists Failure': props<{ error: string }>(),

    'Load External Artists Success': props<{ artists: Artist[] }>(),
  },
});
