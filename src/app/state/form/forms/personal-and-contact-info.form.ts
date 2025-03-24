import { updateGroup } from 'ngrx-forms';

import { optional } from '../../ngrx-forms/optional';
import * as contactInfo from './personal-and-contact-info/contact-info.form';
import * as emailConsent from './personal-and-contact-info/email-consent.form';
import * as personalInfo from './personal-and-contact-info/personal-info.form';
import * as representativeInfo from './personal-and-contact-info/representative-information.form';

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
