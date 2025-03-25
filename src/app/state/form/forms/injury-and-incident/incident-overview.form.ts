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
  selected: string[];
  haveNotMissedAnyTime: boolean;
  haveMissedTimeOnTheDay: boolean;
  haveMissedTimeAfterTheDay: boolean;
  likelyToMissMoreWork: boolean;
  dutiesAdjusted: boolean;
  notSureMyInjuryWillAffectWork: boolean;
}

export interface PaychequeAffected {
  selected: string[];
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

export interface MissedTimeFromWorkForm {
  notMissed: string;
  missedDayShift: string;
}

export interface Form {
  howInjuryHappened: string;
  timelossIndicators: TimelossIndicators;
  contributingFactors: string[];
  accidentInvolved: AccidentInvolved | '';
  accidentInvolvedOther: string;
  reasonMissTimeFromWork: ReasonMissTypeFromWork | '';
  injuryDate: string;
  isInjuryDateApproximate: boolean | null;
  weightLifted: WeightLifted | '';
  describeLifting: string;
  injuryType: string;
  anticipatedMissingTime: string;
  missedTimeFromWork: MissedTimeFromWorkForm;
  injuryWasCatastrophic: boolean | null;
  itemsDamaged: string[];
}

export const initialFormValue: Form = {
  howInjuryHappened: '',
  timelossIndicators: {
    injuriesEffectOnWork: {
      selected: [],
      haveNotMissedAnyTime: false,
      haveMissedTimeOnTheDay: false,
      haveMissedTimeAfterTheDay: false,
      likelyToMissMoreWork: false,
      dutiesAdjusted: false,
      notSureMyInjuryWillAffectWork: false,
    },
    paychequeAffected: {
      selected: [],
      payUnaffectedNoImpact: true,
      payAffectedByRegularHours: false,
      payAffectedByOvertime: false,
      payAffectedByAdjustedDuties: false,
      payUnaffectedStillReceivingWage: false,
      payUnaffectedUnknown: false,
    },
  },
  contributingFactors: [],
  accidentInvolved: '',
  accidentInvolvedOther: '',
  reasonMissTimeFromWork: '',
  injuryDate: '',
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
  itemsDamaged: [],
};

export const validator =
  (parent: FormGroupState<formReducer.Form>) =>
  (form: FormGroupState<Form>): FormGroupState<Form> =>
    updateGroup<Form>(form, {
      howInjuryHappened: validate(required, maxLength(5100), minWords(3)),
      timelossIndicators: updateGroup<TimelossIndicators>({
        injuriesEffectOnWork: updateGroup<InjuriesEffectOnWork>({
          // TODO: adding and removing to this array can be done in the component
          //       at least i'm pretty certain that's the approach i've done before
          selected: validate(required),
        }),
        // TODO: adding and removing to this array can be done in the component
        //       at least i'm pretty certain that's the approach i've done before
        paychequeAffected: updateGroup<PaychequeAffected>({
          selected: validate(required),
        }),
      }),
      contributingFactors: validate(required),
      accidentInvolved: validate(required),
      // TODO: this should have minLength(2) or minWords(3) or some shit?
      accidentInvolvedOther: (c) => optional(c),
      injuryDate: validate(
        required,
        minYear(1900),
        earlierThan(parent.value.treatmentDetails.medicalCare.dateReceivedFirstAid),
        earlierThan(parent.value.treatmentDetails.medicalCare.dateReceivedTreatment),
        // TODO: clean up this validation - remove the bang operator
        earlierThan(parent.value.employmentAndEmployerInfo.reportingToEmployer.dateReportedInjury!),
      ),
      weightLifted: (c, f) =>
        f.value.contributingFactors.some((cf) => cf === 'lifting')
          ? validate(c, required)
          : optional(c),
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
