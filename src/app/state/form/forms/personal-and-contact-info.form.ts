import { setUserDefinedProperty, updateGroup, validate } from 'ngrx-forms';
import { required } from 'ngrx-forms/validation';

import * as personalInfo from './personal-and-contact-info/personal-info.form';
import * as representativeInfo from './personal-and-contact-info/representative-info.form';

export interface Form {
  isInjuredWorker: boolean | null;
  representativeInfo: representativeInfo.RepresentativeInfoForm;
  personalInfo: personalInfo.PersonalInfoForm;
}

export const initialFormValue: Form = {
  isInjuredWorker: null,
  representativeInfo: representativeInfo.initialFormValue,
  personalInfo: personalInfo.initialFormValue,
};

export const validator = updateGroup<Form>(
  {
    isInjuredWorker: setUserDefinedProperty('mandatory', 1),
    representativeInfo: updateGroup<representativeInfo.RepresentativeInfoForm>({
      firstName: setUserDefinedProperty('mandatory', 1),
      lastName: setUserDefinedProperty('mandatory', 1),
      phoneNumber: setUserDefinedProperty('mandatory', 1),
      relationshipToWorker: setUserDefinedProperty('mandatory', 1),
      relationshipToWorkerDescription: setUserDefinedProperty('mandatory', 1),
    }),
    personalInfo: updateGroup<personalInfo.PersonalInfoForm>({
      claimNumber: setUserDefinedProperty('mandatory', 1),
    }),
  },
  {
    isInjuredWorker: validate(required),
    representativeInfo: updateGroup<representativeInfo.RepresentativeInfoForm>({
      firstName: validate(required),
      lastName: validate(required),
      phoneNumber: validate(required),
      relationshipToWorker: validate(required),
      relationshipToWorkerDescription: validate(required),
    }),
    personalInfo: updateGroup<personalInfo.PersonalInfoForm>({
      claimNumber: validate(required),
    }),
  },
);
