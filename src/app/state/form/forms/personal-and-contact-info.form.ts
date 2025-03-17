import { setUserDefinedProperty, updateGroup, validate } from 'ngrx-forms';

import { PersonalInfoForm } from './personal-and-contact-info/personal-info.form';
import { required } from 'ngrx-forms/validation';

export interface Form {
  isInjuredWorker: boolean | null;
  personalInfo: PersonalInfoForm;
}

export const initialFormValue: Form = {
  isInjuredWorker: null,
  personalInfo: {
    hasReceivedClaimNumber: null,
    claimNumber: '',
  },
};

export const validator = updateGroup<Form>(
  {
    isInjuredWorker: setUserDefinedProperty('mandatory', 1),
    personalInfo: updateGroup<PersonalInfoForm>({
      hasReceivedClaimNumber: setUserDefinedProperty('mandatory', 1),
      claimNumber: setUserDefinedProperty('mandatory', 1),
    }),
  },
  {
    isInjuredWorker: validate(required),
    personalInfo: updateGroup<PersonalInfoForm>({
      hasReceivedClaimNumber: validate(required),
      claimNumber: validate(required),
    }),
  },
);
