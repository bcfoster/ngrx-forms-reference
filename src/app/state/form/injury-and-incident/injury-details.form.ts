import { FormGroupState, setValue, updateGroup } from 'ngrx-forms';
import { required } from 'ngrx-forms/validation';

import { BodyPart } from './body-part';
import { optional } from '../../ngrx-forms/optional';
import { validate } from '../../ngrx-forms/validate';
import { DominantHandSide } from '../../../services/wrio-api.service';

export interface Form {
  bodyParts: BodyPart[];
  dominantHand: DominantHandSide | '';
  haveHadPriorProblemsWithInjuredAreas: boolean | null;
  haveFullyRecoveredFromPriorInjury: boolean | null;
  haveExistingClaimNumber: boolean | null;
  additionalInformationPreviousInjury: string;
  impactToHead: boolean | null;
  diagnosedConcussion: boolean | null;
}

export const initialFormValue: Form = {
  bodyParts: [],
  dominantHand: '',
  haveHadPriorProblemsWithInjuredAreas: null,
  haveFullyRecoveredFromPriorInjury: null,
  haveExistingClaimNumber: null,
  additionalInformationPreviousInjury: '',
  impactToHead: null,
  diagnosedConcussion: null,
};

export const validator = (state: FormGroupState<Form>): FormGroupState<Form> =>
  updateGroup<Form>(
    state,
    {
      haveFullyRecoveredFromPriorInjury: (c, f) =>
        f.value.haveHadPriorProblemsWithInjuredAreas !== true ? setValue(c, null) : c,
    },
    {
      haveExistingClaimNumber: (c, f) =>
        f.value.haveFullyRecoveredFromPriorInjury !== false ? setValue(c, null) : c,
    },
    {
      additionalInformationPreviousInjury: (c, f) =>
        f.value.haveExistingClaimNumber !== false ? setValue(c, '') : c,
    },
    {
      bodyParts: validate(required),
      dominantHand: validate(required),
      haveHadPriorProblemsWithInjuredAreas: validate(required),
      haveFullyRecoveredFromPriorInjury: (c, f) =>
        f.value.haveHadPriorProblemsWithInjuredAreas ? validate(c, required) : optional(c),
      haveExistingClaimNumber: (c, f) =>
        f.value.haveHadPriorProblemsWithInjuredAreas && !f.value.haveFullyRecoveredFromPriorInjury
          ? validate(c, required)
          : optional(c),
      additionalInformationPreviousInjury: optional(),
      impactToHead: (c, f) =>
        f.value.bodyParts.some((bp) => bp.startsWith('head')) ? validate(c, required) : optional(c),
      diagnosedConcussion: (c, f) => (f.value.impactToHead ? validate(c, required) : optional(c)),
    },
  );

// TODO: there are form state updates that need to happen here on the boolean transitions
//       clearing the text area, setting booleans to null, etc.
