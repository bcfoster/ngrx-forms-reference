import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { formActions } from '../form/form.actions';
import * as formReducer from '../form/form.reducer';
import { draftActions } from './drafts.actions';

export interface DraftForm {
  id: string;
  createdDate: string;
  editedDate: string | null;
  percentComplete: number;
  version: number;
  value: string;
}

export interface State extends EntityState<DraftForm> {
  drafts: DraftForm[];
  activeDraftId: string | null;
}

export function selectFormId(form: DraftForm): string {
  return form.id;
}

export const adapter: EntityAdapter<DraftForm> = createEntityAdapter<DraftForm>({
  selectId: selectFormId,
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
  drafts: [],
  activeDraftId: null,
});

export const reducer = createReducer(
  initialState,
  on(draftActions.draftsLoaded, (state, action) => adapter.setAll(action.forms, state)),
  on(draftActions.updated, (state, action) =>
    adapter.updateOne(
      {
        id: action.id,
        changes: {
          editedDate: action.lastEdited?.toISOString(),
          percentComplete: action.percentComplete,
          value: JSON.stringify(action.form),
        },
      },
      {
        ...state,
        activeDraftId: null,
      },
    ),
  ),
  on(formActions.continue, (state, action) => ({ ...state, activeDraftId: action.id })),
  on(formActions.remove, (state, action) => adapter.removeOne(action.id, state)),
  on(formActions.start, (state) => {
    const id = Date.now().toString();
    return adapter.addOne(
      {
        id: id,
        createdDate: new Date().toISOString(),
        editedDate: null,
        percentComplete: 0,
        version: formReducer.VERSION,
        value: JSON.stringify(formReducer.initialFormValue),
      },
      {
        ...state,
        activeDraftId: id,
      },
    );
  }),
  on(formActions.submit, (state, action) => ({
    ...state,
    activeDraftId: action.id,
  })),
);
