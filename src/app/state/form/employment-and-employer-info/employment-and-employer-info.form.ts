import { disable, enable, setValue, updateGroup } from 'ngrx-forms';
import { maxLength, minLength, required } from 'ngrx-forms/validation';

import { accountNumber } from '../../ngrx-forms/account-number';
import { earlierThan } from '../../ngrx-forms/earlier-than';
import { minWords } from '../../ngrx-forms/min-words';
import { minYear } from '../../ngrx-forms/min-year';
import { optional } from '../../ngrx-forms/optional';
import { postalCode } from '../../ngrx-forms/postal-code';
import { validate } from '../../ngrx-forms/validate';
import {
  AttachmentType,
  EmploymentStatus,
  EmploymentType,
} from '../../../services/wrio-api.service';

export interface EmploymentDetailsForm {
  employmentType: EmploymentType | '';
  educationalInstitutionAndProgram: string;
  havePurchasedPersonalOptionalProtection: boolean | null;
  purchasedPersonalOptionalProtectionAccountNumber: string;
  accountantName: string;
  accountantPhoneNumber: string;
  socialInsuranceNumber: string;
  currentlyAttendingSchool: boolean | null;
  completedRecentProgramOfStudy: boolean | null;
  fieldOfStudy: string;
  schoolName: string;
  apprenticeshipProgramName: string;
  apprenticeshipCertificationNumber: string;
  attachmentType: AttachmentType | '';
  employmentStatus: EmploymentStatus | '';
  workedOver12Months: boolean | null;
  whenDidJobBegin: string | null;
  whenDidJobBeginIsApproximate: boolean | null;
  expectedJobEndDate: string | null;
  expectedJobEndDateIsApproximate: boolean | null;
  temporaryJobAdditionalInformation: string;
}

export interface EmployerAddressForm {
  addressLine1: string;
  addressLine2: string;
  city: string;
  province: string;
  country: string;
  postalCode: string;
  addressExtra: string;
}

export interface EmployerInformationForm {
  jobTitle: string;
  name: string;
  contactName: string;
  otherEmployer: boolean | null;
  phoneNumber: string;
  extension: string;
  employerAddress: EmployerAddressForm;
}

export interface ReportingToEmployerForm {
  haveReportedInjury: boolean | null;
  dateReportedInjury: string | null;
  dateReportedInjuryIsApproximate: boolean | null;
  whoReportedInjuryTo: string;
  whyNotReportedInjury: string;
  shouldContactForQuestions: boolean | null;
  phoneNumber: string;
  extension: string;
}

export interface WorkDay {
  hours: number;
  minutes: number;
}

export interface ShiftPatternForm {
  firstDay: string | null;
  pattern: {
    daysOn: number;
    daysOff: number;
  }[];
}

export interface ShiftInformationForm {
  workPattern: string;
  weekPaidHours: {
    monday: WorkDay;
    tuesday: WorkDay;
    wednesday: WorkDay;
    thursday: WorkDay;
    friday: WorkDay;
    saturday: WorkDay;
    sunday: WorkDay;
  };
  daysOnOffRotation: string;
  shiftPattern: ShiftPatternForm;
  haveDaysNeverWorked: boolean | null;
  daysNeverWorked: {
    monday: boolean | null;
    tuesday: boolean | null;
    wednesday: boolean | null;
    thursday: boolean | null;
    friday: boolean | null;
    saturday: boolean | null;
    sunday: boolean | null;
  };
  averageWeeklyWorkHours: number;
  additionalInformation: string;
}

export interface EarningsForm {
  maintainedFullSalary: string;
  maintainedFullSalaryLength: string;
  injuryTimeReceivingBaseSalary: string;
  injuryTimeBaseSalaryAmount: number;
  injuryTimeBaseSalaryPeriod: string;
  additionalCompenstations: {
    bonuses: boolean | null;
    holidays: boolean | null;
    holidayPayPercentage: number;
    livingOutAllowance: boolean | null;
    overtime: boolean | null;
    overtimeHours: number;
    overtimePeriod: string;
    overtimeRegularDays: {
      monday: boolean | null;
      tuesday: boolean | null;
      wednesday: boolean | null;
      thursday: boolean | null;
      friday: boolean | null;
      saturday: boolean | null;
      sunday: boolean | null;
    };
    roomAndBoard: boolean | null;
    roomAndBoardAffectedByInjury: boolean | null;
    shiftDifferentialsPremiums: boolean | null;
    tips: boolean | null;
    tipsAverageAmount: number;
    tipsPeriod: string;
    other: boolean | null;
    describeOther: string;
    totalEarnings12WeeksPriorToInjury: number;
  };
}

export interface ReturnToWorkForm {
  missedTimeFromWorkAfterInjury: string;
  dateOfFirstMissedShiftAfterInjury: string | null;
  dateOfFirstMissedShiftAfterInjuryIsApproximate: boolean | null;
  lastDayWorkedForEmployer: string | null;
  lastDayWorkedForEmployerIsApproximate: boolean | null;
  workedPastDateOfInjury: boolean | null;
  lastDayWorkedScheduledHours: number;
  lastDayWorkedActualHours: number;
  haveReturnedToWork: string;
  noJobDescription: string;
  dateReturnedToWork: string | null;
  dateReturnedToWorkIsApproximate: boolean | null;
  changesToHoursOrDuties: boolean | null;
  changesToHoursOrDutiesDescription: string;
  estimatedReturnToWork: string;
  nextScheduledShiftDate: string | null;
  employerOfferedModifiedDuties: boolean | null;
  acceptedModifiedDuties: string;
  modifiedDutiesOfferDate: string | null;
  modifiedDutiesStartDate: string | null;
  modifiedDutiesStartDateIsApproximate: boolean | null;
  modifiedDutiesDescription: string;
}

export interface Form {
  employmentDetails: EmploymentDetailsForm;
  employerInformation: EmployerInformationForm;
  reportingToEmployer: ReportingToEmployerForm;
  shiftInformation: ShiftInformationForm;
  earnings: EarningsForm;
  returnToWork: ReturnToWorkForm;
  additionalInformation: string;
}

export const initialFormValue: Form = {
  employmentDetails: {
    employmentType: '',
    educationalInstitutionAndProgram: '',
    havePurchasedPersonalOptionalProtection: null,
    purchasedPersonalOptionalProtectionAccountNumber: '',
    accountantName: '',
    accountantPhoneNumber: '',
    socialInsuranceNumber: '',
    currentlyAttendingSchool: null,
    completedRecentProgramOfStudy: null,
    fieldOfStudy: '',
    schoolName: '',
    apprenticeshipProgramName: '',
    apprenticeshipCertificationNumber: '',
    attachmentType: '',
    employmentStatus: '',
    workedOver12Months: null,
    whenDidJobBegin: null,
    whenDidJobBeginIsApproximate: null,
    expectedJobEndDate: null,
    expectedJobEndDateIsApproximate: null,
    temporaryJobAdditionalInformation: '',
  },
  employerInformation: {
    jobTitle: '',
    name: '',
    contactName: '',
    otherEmployer: null,
    phoneNumber: '',
    extension: '',
    employerAddress: {
      addressLine1: '',
      addressLine2: '',
      city: '',
      province: '',
      country: '',
      postalCode: '',
      addressExtra: '',
    },
  },
  reportingToEmployer: {
    haveReportedInjury: null,
    dateReportedInjury: null,
    dateReportedInjuryIsApproximate: null,
    whoReportedInjuryTo: '',
    whyNotReportedInjury: '',
    shouldContactForQuestions: null,
    phoneNumber: '',
    extension: '',
  },
  shiftInformation: {
    workPattern: '',
    weekPaidHours: {
      monday: { hours: 0, minutes: 0 },
      tuesday: { hours: 0, minutes: 0 },
      wednesday: { hours: 0, minutes: 0 },
      thursday: { hours: 0, minutes: 0 },
      friday: { hours: 0, minutes: 0 },
      saturday: { hours: 0, minutes: 0 },
      sunday: { hours: 0, minutes: 0 },
    },
    daysOnOffRotation: '',
    shiftPattern: {
      firstDay: null,
      pattern: [{ daysOn: 0, daysOff: 0 }],
    },
    haveDaysNeverWorked: null,
    daysNeverWorked: {
      monday: null,
      tuesday: null,
      wednesday: null,
      thursday: null,
      friday: null,
      saturday: null,
      sunday: null,
    },
    averageWeeklyWorkHours: 0,
    additionalInformation: '',
  },
  earnings: {
    maintainedFullSalary: '',
    maintainedFullSalaryLength: '',
    injuryTimeReceivingBaseSalary: '',
    injuryTimeBaseSalaryAmount: 0,
    injuryTimeBaseSalaryPeriod: '',
    additionalCompenstations: {
      bonuses: null,
      holidays: null,
      holidayPayPercentage: 0,
      livingOutAllowance: null,
      overtime: null,
      overtimeHours: 0,
      overtimePeriod: '',
      overtimeRegularDays: {
        monday: null,
        tuesday: null,
        wednesday: null,
        thursday: null,
        friday: null,
        saturday: null,
        sunday: null,
      },
      roomAndBoard: null,
      roomAndBoardAffectedByInjury: null,
      shiftDifferentialsPremiums: null,
      tips: null,
      tipsAverageAmount: 0,
      tipsPeriod: '',
      other: null,
      describeOther: '',
      totalEarnings12WeeksPriorToInjury: 0,
    },
  },
  returnToWork: {
    missedTimeFromWorkAfterInjury: '',
    dateOfFirstMissedShiftAfterInjury: null,
    dateOfFirstMissedShiftAfterInjuryIsApproximate: null,
    lastDayWorkedForEmployer: null,
    lastDayWorkedForEmployerIsApproximate: null,
    workedPastDateOfInjury: null,
    lastDayWorkedScheduledHours: 0,
    lastDayWorkedActualHours: 0,
    haveReturnedToWork: '',
    noJobDescription: '',
    dateReturnedToWork: null,
    dateReturnedToWorkIsApproximate: null,
    changesToHoursOrDuties: null,
    changesToHoursOrDutiesDescription: '',
    estimatedReturnToWork: '',
    nextScheduledShiftDate: null,
    employerOfferedModifiedDuties: null,
    acceptedModifiedDuties: '',
    modifiedDutiesOfferDate: null,
    modifiedDutiesStartDate: null,
    modifiedDutiesStartDateIsApproximate: null,
    modifiedDutiesDescription: '',
  },
  additionalInformation: '',
};

export const validator = updateGroup<Form>(
  {
    // employmentDetails: {
    //   employmentType: '',
    //   educationalInstitutionAndProgram: '',
    //   havePurchasedPersonalOptionalProtection: null,
    //   purchasedPersonalOptionalProtectionAccountNumber: '',
    //   accountantName: '',
    //   accountantPhoneNumber: '',
    //   socialInsuranceNumber: '',
    //   currentlyAttendingSchool: null,
    //   completedRecentProgramOfStudy: null,
    //   fieldOfStudy: '',
    //   schoolName: '',
    //   apprenticeshipProgramName: '',
    //   apprenticeshipCertificationNumber: '',
    //   attachmentType: '',
    //   employmentStatus: '',
    //   workedOver12Months: null,
    //   whenDidJobBegin: null,
    //   whenDidJobBeginIsApproximate: null,
    //   expectedJobEndDate: null,
    //   expectedJobEndDateIsApproximate: null,
    //   temporaryJobAdditionalInformation: '',
    // },
    employmentDetails: updateGroup<EmploymentDetailsForm>({
      employmentType: validate(required),
      educationalInstitutionAndProgram: (c, f) =>
        f.value.employmentType === 'Student' ? validate(c, required, minWords(3)) : optional(c),
      havePurchasedPersonalOptionalProtection: (c, f) =>
        f.value.employmentType === 'Incorporated' || f.value.employmentType === 'Proprietor'
          ? validate(c, required)
          : optional(c),
      purchasedPersonalOptionalProtectionAccountNumber: (c, f) =>
        f.value.havePurchasedPersonalOptionalProtection
          ? validate(c, required, accountNumber)
          : optional(c),
      accountantName: optional(), // TODO: timeloss
      accountantPhoneNumber: optional(), // TODO: timeloss

      apprenticeshipProgramName: (c, f) =>
        f.value.employmentType === 'Apprenticeship' ? validate(c, required) : optional(c),
    }),
    employerInformation: updateGroup<EmployerInformationForm>({
      jobTitle: validate(required),
      name: validate(required, minLength(1), maxLength(100)),
      employerAddress: updateGroup<EmployerAddressForm>({
        addressLine1: validate(required, maxLength(40)),
        // TODO: this is optional, but has validation rules - optional will have to support validators
        addressLine2: validate(maxLength(40)),
        city: validate(required, maxLength(30)),
        // TODO: revisit validation
        province: validate(required),
        country: validate(required),
        postalCode: (c, f) =>
          f.value.country === 'CA' ? validate(c, required, postalCode) : validate(c, required),
      }),
      // TODO: this is optional
      contactName: validate(maxLength(56)),
      // TODO: this is optional
      phoneNumber: validate(minLength(10), maxLength(12)),
      otherEmployer: validate(required),
    }),
    reportingToEmployer: updateGroup<ReportingToEmployerForm>({
      haveReportedInjury: validate(required),
      // TODO: some garbage date validation
      dateReportedInjury: (c, f) =>
        f.value.haveReportedInjury
          ? validate(c, required, earlierThan(new Date().toISOString()), minYear(1900))
          : optional(c),
      whoReportedInjuryTo: (c, f) =>
        f.value.haveReportedInjury ? validate(c, required, minWords(2)) : optional(c),
    }),
    additionalInformation: (c) => optional(c),
  },
  {
    employerInformation: updateGroup<EmployerInformationForm>({
      extension: (c, f) => (f.value.phoneNumber.length > 0 ? enable(c) : disable(setValue(c, ''))),
    }),
  },
);
