import { FormGroupState, updateGroup } from 'ngrx-forms';
import { required } from 'ngrx-forms/validation';

import { BodyPart } from './body-part';
import * as injuryAndIncident from './injury-and-incident.form';
import { optional } from '../../ngrx-forms/optional';
import { validate } from '../../ngrx-forms/validate';
import { DominantHandSide } from '../../../services/wrio-api.service';

export interface Form {
  bodyParts: BodyPart[];
  haveHadPriorProblemsWithInjuredAreas: boolean | null;
  haveFullyRecoveredFromPriorInjury: boolean | null;
  haveExistingClaimNumber: boolean | null;
  additionalInformationPreviousInjury: string;
  impactToHead: boolean | null;
  diagnosedConcussion: boolean | null;
  dominantHand: DominantHandSide | '';
}

export const initialFormValue: Form = {
  bodyParts: [],
  haveHadPriorProblemsWithInjuredAreas: null,
  haveFullyRecoveredFromPriorInjury: null,
  haveExistingClaimNumber: null,
  additionalInformationPreviousInjury: '',
  impactToHead: null,
  diagnosedConcussion: null,
  dominantHand: '',
};

export const validator = (
  state: FormGroupState<Form>,
  parent: FormGroupState<injuryAndIncident.Form>,
): FormGroupState<Form> =>
  updateGroup<Form>(state, {
    bodyParts: validate(required),
    haveHadPriorProblemsWithInjuredAreas: validate(required),
    haveFullyRecoveredFromPriorInjury: (c, f) =>
      f.value.haveHadPriorProblemsWithInjuredAreas ? validate(c, required) : optional(c),
    haveExistingClaimNumber: (c, f) =>
      f.value.haveHadPriorProblemsWithInjuredAreas && !f.value.haveFullyRecoveredFromPriorInjury
        ? validate(c, required)
        : optional(c),
    impactToHead: (c, f) =>
      f.value.bodyParts.some((bp) => bp) && parent.value.incidentOverview.injuryWasCatastrophic
        ? validate(c, required)
        : optional(c),
    diagnosedConcussion: (c, f) => (f.value.impactToHead ? validate(c, required) : optional(c)),
  });

// TODO: there are form state updates that need to happen here on the boolean transitions
//       clearing the text area, setting booleans to null, etc.
