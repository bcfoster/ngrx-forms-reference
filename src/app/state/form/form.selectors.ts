import { createSelector } from '@ngrx/store';

import { form } from '.';

export const { selectForm, selectFormState, selectLastEdited } = form.feature;

export const selectFormValue = createSelector(selectForm, (form) => form.value);

export const selectPersonalAndContactInfoForm = createSelector(
  selectForm,
  (form) => form.controls.personalAndContactInfo,
);

export const selectIncidentAndInjuryForm = createSelector(
  selectForm,
  (form) => form.controls.injuryAndIncident,
);

export const selectFormPercentComplete = createSelector(selectForm, (form) =>
  (form.userDefinedProperties['mandatory'] ?? 0)
    ? form.userDefinedProperties['valid'] / form.userDefinedProperties['mandatory']
    : 1,
);

export const selectPersonalAndContactInfoFormPercentComplete = createSelector(
  selectPersonalAndContactInfoForm,
  (form) =>
    (form.userDefinedProperties['mandatory'] ?? 0)
      ? form.userDefinedProperties['valid'] / form.userDefinedProperties['mandatory']
      : 1,
);
export const selectIncidentAndInjuryDetailsFormPercentComplete = createSelector(
  selectIncidentAndInjuryForm,
  (form) =>
    (form.userDefinedProperties['mandatory'] ?? 0)
      ? form.userDefinedProperties['valid'] / form.userDefinedProperties['mandatory']
      : 1,
);
