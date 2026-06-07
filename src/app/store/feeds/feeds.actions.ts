import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const FeedsActions = createActionGroup({
  source: 'Feeds',
  events: {
    'Load Feedss': emptyProps(),
    'Load Feedss Success': props<{ data: unknown }>(),
    'Load Feedss Failure': props<{ error: unknown }>(),
  },
});
