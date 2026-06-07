import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const UsersActions = createActionGroup({
  source: 'Users',
  events: {
    'Load Userss': emptyProps(),
    'Load Userss Success': props<{ data: unknown }>(),
    'Load Userss Failure': props<{ error: unknown }>(),
  },
});
