import { createActionGroup, emptyProps, props } from '@ngrx/store';
import type { Track } from './track.model';

export const TrackActions = createActionGroup({
  source: 'Track',
  events: {
    'Load Tracks': emptyProps(),
    'Load Tracks Success': props<{ tracks: Track[] }>(),
    'Load Tracks Failure': props<{ error: string }>(),
  },
});
