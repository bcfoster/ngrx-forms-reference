import { createSelector } from '@ngrx/store';

import { form } from '.';

export const { selectForm, selectFormState, selectLastEdited } = form.feature;

export const selectFormValue = createSelector(selectForm, (form) => form.value);

export const selectPersonalAndContactInfoForm = createSelector(
  selectForm,
  (form) => form.controls.personalAndContactInfo,
);

export const selectFormPercentComplete = createSelector(selectForm, (form) => {
  const mandatory = form.userDefinedProperties['mandatory'] ?? 0;
  const valid = form.userDefinedProperties['valid'] ?? 0;
  return mandatory > 0 ? valid / mandatory : 0;
});

export const selectPersonalAndContactInfoFormPercentComplete = createSelector(
  selectPersonalAndContactInfoForm,
  (form) => {
    const mandatory = form.userDefinedProperties['mandatory'] ?? 0;
    const valid = form.userDefinedProperties['valid'] ?? 0;
    return mandatory > 0 ? valid / mandatory : 0;
  },
);
