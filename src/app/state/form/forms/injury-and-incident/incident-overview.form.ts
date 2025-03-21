export interface ContributingFactorsForm {
  additionalProp1: boolean | null;
  additionalProp2: boolean | null;
  additionalProp3: boolean | null;
}

export interface TimeForm {
  hour: string;
  minute: string;
  amPm: string;
}

export interface MissedTimeFromWorkForm {
  notMissed: string;
  missedDayShift: string;
}

export interface ItemsDamagedForm {
  hearingAid: boolean | null;
  artificialLimb: boolean | null;
  dentures: boolean | null;
  eyeGlasses: boolean | null;
}

export interface Form {
  howInjuryHappened: string;
  contributingFactors: ContributingFactorsForm;
  accidentInvolved: string;
  accidentInvolvedOther: string;
  injuryDate: string;
  injuryTime: TimeForm;
  isInjuryDateApproximate: boolean | null;
  weightLifted: string;
  describeLifting: string;
  injuryType: string;
  anticipatedMissingTime: string;
  missedTimeFromWork: MissedTimeFromWorkForm;
  injuryWasCatastrophic: boolean | null;
  itemsDamaged: ItemsDamagedForm;
}

export const initialFormValue: Form = {
  howInjuryHappened: '',
  contributingFactors: {
    additionalProp1: null,
    additionalProp2: null,
    additionalProp3: null,
  },
  accidentInvolved: '',
  accidentInvolvedOther: '',
  injuryDate: '',
  injuryTime: {
    hour: '',
    minute: '',
    amPm: '',
  },
  isInjuryDateApproximate: null,
  weightLifted: '',
  describeLifting: '',
  injuryType: '',
  anticipatedMissingTime: '',
  missedTimeFromWork: {
    notMissed: '',
    missedDayShift: '',
  },
  injuryWasCatastrophic: null,
  itemsDamaged: {
    hearingAid: null,
    artificialLimb: null,
    dentures: null,
    eyeGlasses: null,
  },
};
