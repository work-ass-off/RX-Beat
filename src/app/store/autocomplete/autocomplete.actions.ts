import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const AutocompleteActions = createActionGroup({
  source: 'Autocomplete',
  events: {
    'Load Autocompletes': emptyProps(),
    'Load Autocompletes Success': props<{ data: unknown }>(),
    'Load Autocompletes Failure': props<{ error: unknown }>(),
  },
});
