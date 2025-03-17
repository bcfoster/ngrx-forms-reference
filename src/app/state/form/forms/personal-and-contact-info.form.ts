import { setUserDefinedProperty, updateGroup, validate } from 'ngrx-forms';
import { required } from 'ngrx-forms/validation';

import * as personalInfo from './personal-and-contact-info/personal-info.form';

export interface Form {
  personalInfo: personalInfo.PersonalInfoForm;
}

export const initialFormValue: Form = {
  personalInfo: personalInfo.initialFormValue,
};

export const validator = updateGroup<Form>(
  {
    personalInfo: updateGroup<personalInfo.PersonalInfoForm>({
      claimNumber: setUserDefinedProperty('mandatory', 1),
    }),
  },
  {
    personalInfo: updateGroup<personalInfo.PersonalInfoForm>({
      claimNumber: validate(required),
    }),
  },
);
