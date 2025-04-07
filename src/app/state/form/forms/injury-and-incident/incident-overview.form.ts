import { FormGroupState, updateGroup } from 'ngrx-forms';
import { maxLength, required } from 'ngrx-forms/validation';

import * as formReducer from '../../form.reducer';
import { earlierThan } from '../../../ngrx-forms/earlier-than';
import { minWords } from '../../../ngrx-forms/min-words';
import { minYear } from '../../../ngrx-forms/min-year';
import { optional } from '../../../ngrx-forms/optional';
import { validate } from '../../../ngrx-forms/validate';
import { AccidentInvolved, WeightLifted } from '../../../../services/wrio-api.service';

export type ReasonMissTypeFromWork = 'AttendMedicalAppointment' | 'InjuryPrevented' | 'Both';

export interface InjuriesEffectOnWork {
  haveNotMissedAnyTime: boolean;
  haveMissedTimeOnTheDay: boolean;
  haveMissedTimeAfterTheDay: boolean;
  likelyToMissMoreWork: boolean;
  dutiesAdjusted: boolean;
  notSureMyInjuryWillAffectWork: boolean;
}

export interface PaychequeAffected {
  payUnaffectedNoImpact: boolean;
  payAffectedByRegularHours: boolean;
  payAffectedByOvertime: boolean;
  payAffectedByAdjustedDuties: boolean;
  payUnaffectedStillReceivingWage: boolean;
  payUnaffectedUnknown: boolean;
}

export interface TimelossIndicators {
  injuriesEffectOnWork: InjuriesEffectOnWork;
  paychequeAffected: PaychequeAffected;
}

export interface ContributingFactors {
  crush: boolean;
  fall: boolean;
  fireOrExplosion: boolean;
  harmfulSubstance: boolean;
  lifting: boolean;
  overexertion: boolean;
  repetition: boolean;
  sharpEdge: boolean;
  slipOrTrip: boolean;
  struck: boolean;
  twist: boolean;
  unSureOther: boolean;
}

export interface MissedTimeFromWorkForm {
  notMissed: string;
  missedDayShift: string;
}

export interface ItemsDamaged {
  hearingAid: boolean;
  artificialLimb: boolean;
  dentures: boolean;
  eyeGlasses: boolean;
  none: boolean;
}

export interface Form {
  howInjuryHappened: string;
  timelossIndicators: TimelossIndicators;
  contributingFactors: ContributingFactors;
  accidentInvolved: AccidentInvolved | '';
  accidentInvolvedOther: string;
  reasonMissTimeFromWork: ReasonMissTypeFromWork | '';
  injuryDate: string;
  isInjuryDateApproximate: boolean;
  injuryTime: string;
  weightLifted: WeightLifted | '';
  describeLifting: string;
  injuryType: string;
  anticipatedMissingTime: string;
  missedTimeFromWork: MissedTimeFromWorkForm;
  injuryWasCatastrophic: boolean;
  itemsDamaged: ItemsDamaged;
}

export const initialFormValue: Form = {
  howInjuryHappened: '',
  timelossIndicators: {
    injuriesEffectOnWork: {
      haveNotMissedAnyTime: false,
      haveMissedTimeOnTheDay: false,
      haveMissedTimeAfterTheDay: false,
      likelyToMissMoreWork: false,
      dutiesAdjusted: false,
      notSureMyInjuryWillAffectWork: false,
    },
    paychequeAffected: {
      payUnaffectedNoImpact: false,
      payAffectedByRegularHours: false,
      payAffectedByOvertime: false,
      payAffectedByAdjustedDuties: false,
      payUnaffectedStillReceivingWage: false,
      payUnaffectedUnknown: false,
    },
  },
  contributingFactors: {
    crush: false,
    fall: false,
    fireOrExplosion: false,
    harmfulSubstance: false,
    lifting: false,
    overexertion: false,
    repetition: false,
    sharpEdge: false,
    slipOrTrip: false,
    struck: false,
    twist: false,
    unSureOther: false,
  },
  accidentInvolved: '',
  accidentInvolvedOther: '',
  reasonMissTimeFromWork: '',
  injuryDate: '',
  isInjuryDateApproximate: false,
  injuryTime: '00:00',
  weightLifted: '',
  describeLifting: '',
  injuryType: '',
  anticipatedMissingTime: '',
  missedTimeFromWork: {
    notMissed: '',
    missedDayShift: '',
  },
  injuryWasCatastrophic: false,
  itemsDamaged: {
    hearingAid: false,
    artificialLimb: false,
    dentures: false,
    eyeGlasses: false,
    none: false,
  },
};

export const validator =
  (parent: FormGroupState<formReducer.Form>) =>
  (form: FormGroupState<Form>): FormGroupState<Form> =>
    updateGroup<Form>(form, {
      howInjuryHappened: validate(required, maxLength(5100), minWords(3)),
      timelossIndicators: updateGroup<TimelossIndicators>({
        injuriesEffectOnWork: updateGroup<InjuriesEffectOnWork>({
          // TODO: validate at least one child is true
        }),
        paychequeAffected: updateGroup<PaychequeAffected>({
          // TODO: validate at least one child is true
        }),
      }),
      contributingFactors: validate(required),
      accidentInvolved: validate(required),
      // TODO: this should have minLength(2) or minWords(3) or some shit?
      accidentInvolvedOther: (c) => optional(c),
      injuryDate: validate(
        required,
        earlierThan(new Date().toISOString()),
        minYear(1900),
        parent.value.treatmentDetails.dateReceivedFirstAid
          ? earlierThan(parent.value.treatmentDetails.dateReceivedFirstAid)
          : () => ({}),
        parent.value.treatmentDetails.dateReceivedTreatment
          ? earlierThan(parent.value.treatmentDetails.dateReceivedTreatment)
          : () => ({}),
        // TODO: clean up this validation - remove the bang operator
        parent.value.employmentAndEmployerInfo.reportingToEmployer.dateReportedInjury
          ? earlierThan(
              parent.value.employmentAndEmployerInfo.reportingToEmployer.dateReportedInjury,
            )
          : () => ({}),
      ),
      injuryTime: validate(required),
      weightLifted: (c, f) =>
        f.value.contributingFactors.lifting ? validate(c, required) : optional(c),
      describeLifting: (c, f) =>
        f.value.weightLifted === 'NotSure'
          ? validate(c, required, maxLength(250), minWords(3))
          : optional(c),
      reasonMissTimeFromWork: (c, f) =>
        f.value.timelossIndicators.injuriesEffectOnWork.haveMissedTimeOnTheDay ||
        f.value.timelossIndicators.injuriesEffectOnWork.likelyToMissMoreWork
          ? validate(c, required)
          : optional(c),
    });
