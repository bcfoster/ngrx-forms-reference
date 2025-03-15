import { createSelector } from '@ngrx/store';

import { form } from '.';

export const { selectForm, selectFormState, selectLastEdited } = form.feature;

export const selectFormValue = createSelector(selectForm, (form) => form.value);

export const selectContactForm = createSelector(selectForm, (form) => form.controls.contact);

export const selectCheckboxesForm = createSelector(
  selectContactForm,
  (form) => form.controls.checkboxes,
);

export const selectFormPercentComplete = createSelector(selectForm, (form) => {
  const controls = Object.values(form.controls);
  const percentages = controls.map((c) => c.userDefinedProperties['percentComplete'] ?? 0);
  const percentSum = percentages.reduce((prev, curr) => prev + curr, 0);
  return percentSum / controls.length;
});

export const selectContactFormPercentComplete = createSelector(
  selectContactForm,
  (form) => form.userDefinedProperties['percentComplete'] ?? 0,
);
