import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const AlbumsActions = createActionGroup({
  source: 'Albums',
  events: {
    'Load Albumss': emptyProps(),
    'Load Albumss Success': props<{ data: unknown }>(),
    'Load Albumss Failure': props<{ error: unknown }>(),
  },
});
