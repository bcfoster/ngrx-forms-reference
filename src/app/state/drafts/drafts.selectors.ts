import * as formsReducer from './drafts.reducer';
import { drafts } from '.';
import { createSelector } from '@ngrx/store';

export const { selectActiveDraftId, selectDrafts, selectDraftsState } = drafts.feature;

export const { selectAll, selectEntities, selectIds, selectTotal } =
  formsReducer.adapter.getSelectors(selectDraftsState);

export const selectActiveDraftFormJson = createSelector(
  selectEntities,
  selectActiveDraftId,
  (drafts, id) => {
    if (!id || !(id in drafts)) {
      return null;
    }

    return drafts[id]!.value;
  },
);
