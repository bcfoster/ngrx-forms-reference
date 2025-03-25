import { FormGroupState, updateGroup } from 'ngrx-forms';
import { required } from 'ngrx-forms/validation';

import { optional } from '../../../ngrx-forms/optional';
import { validate } from '../../../ngrx-forms/validate';
import { DominantHandSide } from '../../../../services/wrio-api.service';
import * as injuryAndIncident from '../injury-and-incident.form';

export interface Form {
  bodyParts: string[];
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
      f.value.bodyParts.some((bp) => bp.startsWith('head')) &&
      parent.value.incidentOverview.injuryWasCatastrophic
        ? validate(c, required)
        : optional(c),
    diagnosedConcussion: (c, f) => (f.value.impactToHead ? validate(c, required) : optional(c)),
  });
