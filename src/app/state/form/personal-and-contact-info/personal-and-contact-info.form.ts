import { updateGroup } from 'ngrx-forms';

import { optional } from '../../ngrx-forms/optional';
import * as contactInfo from './contact-info.form';
import * as emailConsent from './email-consent.form';
import * as personalInfo from './personal-info.form';
import * as representativeInfo from './representative-information.form';

export interface Form {
  representativeInformation: representativeInfo.Form;
  personalInformation: personalInfo.Form;
  contactInformation: contactInfo.Form;
  emailConsent: emailConsent.Form;
  additionalInformation: string;
}

export const initialFormValue: Form = {
  representativeInformation: representativeInfo.initialFormValue,
  personalInformation: personalInfo.initialFormValue,
  contactInformation: contactInfo.initialFormValue,
  emailConsent: emailConsent.initialFormValue,
  additionalInformation: '',
};

export const validator = updateGroup<Form>({
  representativeInformation: representativeInfo.validator,
  personalInformation: personalInfo.validator,
  contactInformation: contactInfo.validator,
  emailConsent: emailConsent.validator,
  additionalInformation: (c) => optional(c),
});
