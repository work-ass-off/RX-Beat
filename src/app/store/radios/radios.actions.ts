import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const RadiosActions = createActionGroup({
  source: 'Radios',
  events: {
    'Load Radioss': emptyProps(),
    'Load Radioss Success': props<{ data: unknown }>(),
    'Load Radioss Failure': props<{ error: unknown }>(),
  },
});
