import { FormControlState, FormGroupState, setValue, updateGroup } from 'ngrx-forms';
import { maxLength, notEqualTo, required, requiredTrue } from 'ngrx-forms/validation';

import * as formReducer from '../form.reducer';
import { earlierThan } from '../../ngrx-forms/earlier-than';
import { minWords } from '../../ngrx-forms/min-words';
import { minYear } from '../../ngrx-forms/min-year';
import { optional } from '../../ngrx-forms/optional';
import { validate } from '../../ngrx-forms/validate';
import { AccidentInvolved, WeightLifted } from '../../../services/wrio-api.service';

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
  injuriesEffectOnWorkSelected: boolean;
  paychequeAffected: PaychequeAffected;
  paychequeAffectedSelected: boolean;
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
  contributingFactorSelected: boolean;
  accidentInvolved: AccidentInvolved | '';
  accidentInvolvedOther: string;
  reasonMissTimeFromWork: ReasonMissTypeFromWork | '';
  injuryDate: string;
  isInjuryDateApproximate: boolean;
  injuryTime: string;
  weightLifted: WeightLifted | '';
  describeLifting: string;
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
    injuriesEffectOnWorkSelected: false,
    paychequeAffected: {
      payUnaffectedNoImpact: false,
      payAffectedByRegularHours: false,
      payAffectedByOvertime: false,
      payAffectedByAdjustedDuties: false,
      payUnaffectedStillReceivingWage: false,
      payUnaffectedUnknown: false,
    },
    paychequeAffectedSelected: false,
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
  contributingFactorSelected: false,
  accidentInvolved: '',
  accidentInvolvedOther: '',
  reasonMissTimeFromWork: '',
  injuryDate: '',
  isInjuryDateApproximate: false,
  injuryTime: '00:00',
  weightLifted: '',
  describeLifting: '',
  itemsDamaged: {
    hearingAid: false,
    artificialLimb: false,
    dentures: false,
    eyeGlasses: false,
    none: false,
  },
};

const isInjuriesEffectOnWorkSelected = (
  control: FormControlState<boolean>,
  indicators: FormGroupState<TimelossIndicators>,
): FormControlState<boolean> =>
  setValue(
    control,
    Object.values(indicators.value.injuriesEffectOnWork).some((v) => v),
  );

const isPaychequeAffectedSelected = (
  control: FormControlState<boolean>,
  indicators: FormGroupState<TimelossIndicators>,
): FormControlState<boolean> =>
  setValue(
    control,
    Object.values(indicators.value.paychequeAffected).some((v) => v),
  );

const isContributingFactorSelected = (
  control: FormControlState<boolean>,
  form: FormGroupState<Form>,
): FormControlState<boolean> =>
  setValue(
    control,
    Object.values(form.value.contributingFactors).some((v) => v),
  );

export const validator =
  (parent: FormGroupState<formReducer.Form>) =>
  (form: FormGroupState<Form>): FormGroupState<Form> =>
    updateGroup<Form>(
      form,
      {
        timelossIndicators: updateGroup<TimelossIndicators>({
          injuriesEffectOnWorkSelected: isInjuriesEffectOnWorkSelected,
          paychequeAffectedSelected: isPaychequeAffectedSelected,
        }),
        contributingFactorSelected: isContributingFactorSelected,
      },
      {
        howInjuryHappened: validate(required, maxLength(5100), minWords(3)),
        timelossIndicators: updateGroup<TimelossIndicators>({
          injuriesEffectOnWork: updateGroup<InjuriesEffectOnWork>({
            haveNotMissedAnyTime: optional(),
            haveMissedTimeOnTheDay: optional(),
            haveMissedTimeAfterTheDay: optional(),
            likelyToMissMoreWork: optional(),
            dutiesAdjusted: optional(),
            notSureMyInjuryWillAffectWork: optional(),
          }),
          injuriesEffectOnWorkSelected: validate(requiredTrue),
          paychequeAffected: updateGroup<PaychequeAffected>({
            payUnaffectedNoImpact: optional(),
            payAffectedByRegularHours: optional(),
            payAffectedByOvertime: optional(),
            payAffectedByAdjustedDuties: optional(),
            payUnaffectedStillReceivingWage: optional(),
            payUnaffectedUnknown: optional(),
          }),
          paychequeAffectedSelected: validate(requiredTrue),
        }),
        contributingFactors: updateGroup<ContributingFactors>({
          crush: optional(),
          fall: optional(),
          fireOrExplosion: optional(),
          harmfulSubstance: optional(),
          lifting: optional(),
          overexertion: optional(),
          repetition: optional(),
          sharpEdge: optional(),
          slipOrTrip: optional(),
          struck: optional(),
          twist: optional(),
          unSureOther: optional(),
        }),
        contributingFactorSelected: validate(requiredTrue),
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
        isInjuryDateApproximate: optional(),
        injuryTime: validate(notEqualTo('00:00')),
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
        itemsDamaged: updateGroup<ItemsDamaged>({
          hearingAid: optional(),
          artificialLimb: optional(),
          dentures: optional(),
          eyeGlasses: optional(),
          none: optional(),
        }),
      },
    );
