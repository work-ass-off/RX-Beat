import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const TracksActions = createActionGroup({
  source: 'Tracks',
  events: {
    'Load Trackss': emptyProps(),
    'Load Trackss Success': props<{ data: unknown }>(),
    'Load Trackss Failure': props<{ error: unknown }>(),
  },
});
