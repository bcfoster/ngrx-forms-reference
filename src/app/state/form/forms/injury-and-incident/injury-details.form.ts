export interface InjuryDetailsForm {
  bodyParts: string[];
  haveHadPriorProblemsWithInjuredAreas: boolean | null;
  haveFullyRecoveredFromPriorInjury: boolean | null;
  haveExistingClaimNumber: boolean | null;
  additionalInformationPreviousInjury: string;
  impactToHead: boolean | null;
  diagnosedConcussion: boolean | null;
  dominantHand: string;
}

export interface Form {
  injuryDetails: InjuryDetailsForm;
}

export const initialFormValue: Form = {
  injuryDetails: {
    bodyParts: [],
    haveHadPriorProblemsWithInjuredAreas: null,
    haveFullyRecoveredFromPriorInjury: null,
    haveExistingClaimNumber: null,
    additionalInformationPreviousInjury: '',
    impactToHead: null,
    diagnosedConcussion: null,
    dominantHand: '',
  },
};
