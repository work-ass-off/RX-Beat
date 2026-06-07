import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const ReviewsActions = createActionGroup({
  source: 'Reviews',
  events: {
    'Load Reviewss': emptyProps(),
    'Load Reviewss Success': props<{ data: unknown }>(),
    'Load Reviewss Failure': props<{ error: unknown }>(),
  },
});
