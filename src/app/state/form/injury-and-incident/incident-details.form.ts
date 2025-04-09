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
  activityAtTimeOfInjuryDetails: string;
  occurredWhilePerformingRegularDuties: boolean | null;
  changesOccurredDueToInjury: string[];
}

export const initialFormValue: Form = {
  occurredInBc: null,
  incidentLocation: '',
  incidentLocationDetails: '',
  occurredDuringNormalShift: null,
  shiftAndTimeOfInjuryDetails: '',
  activityAtTimeOfInjuryDetails: '',
  occurredWhilePerformingRegularDuties: null,
  changesOccurredDueToInjury: [],
};

export const validator = updateGroup<Form>({
  occurredInBc: validate(required),
  incidentLocation: validate(required),
  incidentLocationDetails: (c, f) =>
    !(f.value.occurredInBc ?? true) || f.value.incidentLocation !== 'EmployerWorkplace'
      ? validate(c, required, minLength(1), minWords(3), maxLength(200))
      : optional(setValue(c, '')),
  shiftAndTimeOfInjuryDetails: validate(maxLength(250)),
  activityAtTimeOfInjuryDetails: validate(maxLength(250)),
  occurredDuringNormalShift: validate(required),
  occurredWhilePerformingRegularDuties: validate(required),
});
