import { createActionGroup, emptyProps, props } from '@ngrx/store';

import * as draftsReducer from './drafts.reducer';
import * as formReducer from '../form/form.reducer';

export const draftActions = createActionGroup({
  source: 'Drafts',
  events: {
    'Load Drafts': emptyProps(),
    'Draft Loaded': props<{ form: formReducer.Form }>(),
    'Drafts Loaded': props<{ forms: draftsReducer.DraftForm[] }>(),
    'Drafts Load Failed': emptyProps(),
    'Updated': props<{
      id: string;
      lastEdited: Date | null;
      percentComplete: number;
      form: formReducer.Form;
    }>(),
  },
});
