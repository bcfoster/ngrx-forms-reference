import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const formActions = createActionGroup({
  source: 'Form',
  events: {
    'Continue': props<{ id: string }>(),
    'Exit': emptyProps(),
    'Remove': props<{ id: string }>(),
    'Reset': emptyProps(),
    'Save': emptyProps(),
    'Start': emptyProps(),
    'Submit': props<{ id: string }>(),
  },
});
