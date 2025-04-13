import { setValue, updateGroup } from 'ngrx-forms';
import { maxLength, minLength, required } from 'ngrx-forms/validation';

import { minWords } from '../../ngrx-forms/min-words';
import { optional } from '../../ngrx-forms/optional';
import { validate } from '../../ngrx-forms/validate';

export type IncidentLocation = 'EmployerWorkplace' | 'AuthorizedLocation' | 'Other';

export interface Form {
  occurredInBc: boolean | null;
  incidentLocation: IncidentLocation | '';
  incidentLocationDetails: string;
  occurredDuringNormalShift: boolean | null;
  shiftAndTimeOfInjuryDetails: string;
  occurredWhilePerformingRegularDuties: boolean | null;
  activityAtTimeOfInjuryDetails: string;
}

export const initialFormValue: Form = {
  occurredInBc: null,
  incidentLocation: '',
  incidentLocationDetails: '',
  occurredDuringNormalShift: null,
  shiftAndTimeOfInjuryDetails: '',
  occurredWhilePerformingRegularDuties: null,
  activityAtTimeOfInjuryDetails: '',
};

export const validator = updateGroup<Form>(
  {
    shiftAndTimeOfInjuryDetails: (c, f) =>
      f.value.occurredDuringNormalShift ? setValue(c, '') : c,
    activityAtTimeOfInjuryDetails: (c, f) =>
      f.value.occurredWhilePerformingRegularDuties ? setValue(c, '') : c,
  },
  {
    occurredInBc: validate(required),
    incidentLocation: validate(required),
    incidentLocationDetails: validate(required, minLength(1), minWords(3), maxLength(200)),
    occurredDuringNormalShift: validate(required),
    shiftAndTimeOfInjuryDetails: optional(maxLength(250)),
    occurredWhilePerformingRegularDuties: validate(required),
    activityAtTimeOfInjuryDetails: optional(maxLength(250)),
  },
);
