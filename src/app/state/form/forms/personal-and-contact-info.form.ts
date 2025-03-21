import { setUserDefinedProperty, updateGroup, validate } from 'ngrx-forms';
import { required } from 'ngrx-forms/validation';

import * as contactInfo from './personal-and-contact-info/contact-info.form';
import * as emailConsent from './personal-and-contact-info/email-consent.form';
import * as personalInfo from './personal-and-contact-info/personal-info.form';
import * as representativeInfo from './personal-and-contact-info/representative-info.form';

export interface Form {
  isInjuredWorker: boolean | null;
  personalInformation: personalInfo.Form;
  representativeInformation: representativeInfo.Form;
  contactInformation: contactInfo.Form;
  emailConsent: emailConsent.Form;
  additionalInformation: string;
}

export const initialFormValue: Form = {
  isInjuredWorker: null,
  personalInformation: personalInfo.initialFormValue,
  representativeInformation: representativeInfo.initialFormValue,
  contactInformation: contactInfo.initialFormValue,
  emailConsent: emailConsent.initialFormValue,
  additionalInformation: '',
};

export const validator = updateGroup<Form>(
  {
    isInjuredWorker: setUserDefinedProperty('mandatory', 1),
    representativeInformation: updateGroup<representativeInfo.Form>({
      firstName: setUserDefinedProperty('mandatory', 1),
      lastName: setUserDefinedProperty('mandatory', 1),
      phoneNumber: setUserDefinedProperty('mandatory', 1),
      relationshipToWorker: setUserDefinedProperty('mandatory', 1),
      relationshipToWorkerDescription: setUserDefinedProperty('mandatory', 1),
    }),
    personalInformation: updateGroup<personalInfo.Form>({
      hasClaimNumber: setUserDefinedProperty('mandatory', 1),
      claimNumber: setUserDefinedProperty('mandatory', 1),
      legalFirstName: setUserDefinedProperty('mandatory', 1),
      preferredFirstName: setUserDefinedProperty('mandatory', 1),
      middleName: setUserDefinedProperty('mandatory', 1),
      lastName: setUserDefinedProperty('mandatory', 1),
      dateOfBirth: setUserDefinedProperty('mandatory', 1),
    }),
  },
  {
    isInjuredWorker: validate(required),
    representativeInformation: updateGroup<representativeInfo.Form>({
      firstName: validate(required),
      lastName: validate(required),
      phoneNumber: validate(required),
      relationshipToWorker: validate(required),
      relationshipToWorkerDescription: validate(required),
    }),
    personalInformation: updateGroup<personalInfo.Form>({
      hasClaimNumber: validate(required),
      claimNumber: validate(required),
      legalFirstName: validate(required),
      preferredFirstName: validate(required),
      middleName: validate(required),
      lastName: validate(required),
      dateOfBirth: validate(required),
    }),
  },
);
