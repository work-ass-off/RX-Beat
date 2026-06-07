import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const ArtistsActions = createActionGroup({
  source: 'Artists',
  events: {
    'Load Artistss': emptyProps(),
    'Load Artistss Success': props<{ data: unknown }>(),
    'Load Artistss Failure': props<{ error: unknown }>(),
  },
});
