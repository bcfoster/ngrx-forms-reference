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

export const selectTreatmentDetailsFrom = createSelector(
  selectForm,
  (form) => form.controls.treatmentDetails,
);

export const selectEmploymentAndEmployerInfoForm = createSelector(
  selectForm,
  (form) => form.controls.employmentAndEmployerInfo,
);

export const selectFormPercentComplete = createSelector(selectForm, (form) =>
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

export const selectTreatmentDetailsFormPercentComplete = createSelector(
  selectTreatmentDetailsFrom,
  (form) =>
    (form.userDefinedProperties['mandatory'] ?? 0)
      ? form.userDefinedProperties['valid'] / form.userDefinedProperties['mandatory']
      : 1,
);

export const selectIsTimelossInjury = createSelector(
  selectForm,
  (form) => form.value.isTimelossInjury,
);

// export const selectIsTimelossInjury = createSelector(selectIncidentAndInjuryForm, (form) => {
//   const work = form.value.incidentOverview.timelossIndicators.injuriesEffectOnWork;
//   const pay = form.value.incidentOverview.timelossIndicators.paychequeAffected;
//
//   if (work.haveMissedTimeAfterTheDay || work.likelyToMissMoreWork) {
//     return true;
//   }
//
//   return (
//     work.dutiesAdjusted &&
//     (pay.payAffectedByRegularHours ||
//       pay.payAffectedByOvertime ||
//       pay.payAffectedByAdjustedDuties ||
//       pay.payUnaffectedStillReceivingWage)
//   );
// });
