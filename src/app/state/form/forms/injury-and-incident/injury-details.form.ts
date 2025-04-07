import { FormGroupState, updateGroup } from 'ngrx-forms';
import { required } from 'ngrx-forms/validation';

import { optional } from '../../../ngrx-forms/optional';
import { validate } from '../../../ngrx-forms/validate';
import { DominantHandSide } from '../../../../services/wrio-api.service';
import * as injuryAndIncident from '../injury-and-incident.form';

export interface BodyParts {
  head: boolean[];
  torso: boolean[];
  leftArm: boolean[];
  rightArm: boolean[];
  leftLeg: boolean[];
  rightLeg: boolean[];
}

export interface Form {
  bodyParts: BodyParts;
  haveHadPriorProblemsWithInjuredAreas: boolean | null;
  haveFullyRecoveredFromPriorInjury: boolean | null;
  haveExistingClaimNumber: boolean | null;
  additionalInformationPreviousInjury: string;
  impactToHead: boolean | null;
  diagnosedConcussion: boolean | null;
  dominantHand: DominantHandSide | '';
}

export const initialFormValue: Form = {
  bodyParts: {
    head: [false, false, false, false, false, false, false, false, false, false, false],
    torso: [false, false, false, false, false, false, false, false, false],
    leftArm: [false, false, false, false, false, false, false, false, false],
    rightArm: [false, false, false, false, false, false, false, false, false],
    leftLeg: [false, false, false, false, false, false, false],
    rightLeg: [false, false, false, false, false, false, false],
  },
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
    // TODO: revisit validation rules
    bodyParts: validate(required),
    haveHadPriorProblemsWithInjuredAreas: validate(required),
    haveFullyRecoveredFromPriorInjury: (c, f) =>
      f.value.haveHadPriorProblemsWithInjuredAreas ? validate(c, required) : optional(c),
    haveExistingClaimNumber: (c, f) =>
      f.value.haveHadPriorProblemsWithInjuredAreas && !f.value.haveFullyRecoveredFromPriorInjury
        ? validate(c, required)
        : optional(c),
    impactToHead: (c, f) =>
      f.value.bodyParts.head.some((bp) => bp) && parent.value.incidentOverview.injuryWasCatastrophic
        ? validate(c, required)
        : optional(c),
    diagnosedConcussion: (c, f) => (f.value.impactToHead ? validate(c, required) : optional(c)),
  });
