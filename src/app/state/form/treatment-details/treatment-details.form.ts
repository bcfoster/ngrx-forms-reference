import { FormGroupState, updateGroup } from 'ngrx-forms';

import { optional } from '../../ngrx-forms/optional';
import { validate } from '../../ngrx-forms/validate';
import { required } from 'ngrx-forms/validation';
import { minYear } from '../../ngrx-forms/min-year';
import { earlierThan } from '../../ngrx-forms/earlier-than';
import * as formReducer from '../form.reducer';

export interface AuthorizationForm {
  authorizedToAccessInjuryInformation: boolean | null;
  isSigned: boolean | null;
  workerSignature: string;
}

export interface Form {
  haveReceivedFirstAid: boolean | null;
  dateReceivedFirstAid: string;
  typeOfFirstAidReceived: string;
  haveVisitedPractitioner: boolean | null;
  dateReceivedTreatment: string;
  isApproximateDate: boolean;
  clinicOrHospitalName: string;
  practitionerName: string;
  practitionerLastName: string;
  clinicOrHospitalAddress: string;
  clinicOrHospitalPhoneNumber: string;
  clinicTreatmentDetails: string;
  haveAppointmentBooked: boolean | null;
  firstAidReceivedDateApproximateIndicator: boolean | null;
  authorization: AuthorizationForm;
  additionalInformation: string;
}

export const initialFormValue: Form = {
  haveReceivedFirstAid: null,
  dateReceivedFirstAid: '',
  typeOfFirstAidReceived: '',
  haveVisitedPractitioner: null,
  dateReceivedTreatment: '',
  isApproximateDate: false,
  clinicOrHospitalName: '',
  practitionerName: '',
  practitionerLastName: '',
  clinicOrHospitalAddress: '',
  clinicOrHospitalPhoneNumber: '',
  clinicTreatmentDetails: '',
  haveAppointmentBooked: null,
  firstAidReceivedDateApproximateIndicator: null,
  authorization: {
    authorizedToAccessInjuryInformation: null,
    isSigned: null,
    workerSignature: '',
  },
  additionalInformation: '',
};

export const validator = (form: FormGroupState<formReducer.Form>) =>
  updateGroup<Form>(
    {
      haveReceivedFirstAid: validate(required),
      dateReceivedFirstAid: (c, f) =>
        f.value.haveReceivedFirstAid
          ? optional(
              c,
              required,
              earlierThan(new Date().toISOString()),
              // laterThan(form.value.injuryAndIncident.incidentOverview.injuryDate),
              minYear(1900),
            )
          : optional(c),
      typeOfFirstAidReceived: (c, f) =>
        f.value.haveReceivedFirstAid ? validate(c, required) : optional(c),
      haveVisitedPractitioner: validate(required),
      haveAppointmentBooked: (c, f) =>
        f.value.haveVisitedPractitioner ? optional(c) : validate(c, required),
      dateReceivedTreatment: (c, f) =>
        f.value.haveVisitedPractitioner
          ? validate(c, required, earlierThan(new Date().toISOString()))
          : optional(c),
      isApproximateDate: optional(),
      clinicOrHospitalName: optional(),
      practitionerName: optional(),
      practitionerLastName: optional(),
      clinicOrHospitalAddress: optional(),
      clinicOrHospitalPhoneNumber: optional(),
      clinicTreatmentDetails: (c, f) =>
        f.value.haveVisitedPractitioner ? validate(c, required) : optional(c),
      firstAidReceivedDateApproximateIndicator: optional(),
      authorization: updateGroup<AuthorizationForm>({
        authorizedToAccessInjuryInformation: (c) =>
          form.value.personalAndContactInfo.representativeInformation.reportingForSelf
            ? validate(c, required)
            : optional(c),
      }),
      additionalInformation: (c) => optional(c),
    },
    {},
    {
      authorization: updateGroup<AuthorizationForm>({
        isSigned: (c, f) =>
          f.value.authorizedToAccessInjuryInformation ? validate(c, required) : optional(c),
        workerSignature: (c, f) =>
          f.value.authorizedToAccessInjuryInformation ? validate(c, required) : optional(c),
      }),
    },
  );
