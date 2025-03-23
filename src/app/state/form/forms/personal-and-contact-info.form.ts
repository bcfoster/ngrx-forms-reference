import { updateGroup } from 'ngrx-forms';
import { required } from 'ngrx-forms/validation';

import { optional } from '../../ngrx-forms/optional';
import { validate } from '../../ngrx-forms/validate';
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
  representativeInformation: updateGroup<representativeInfo.Form>({
    reportingForSelf: validate(required),
    firstName: validate(required),
    lastName: validate(required),
    phoneNumber: validate(required),
    relationship: validate(required),
    relationshipOther: (c, f) =>
      f.value.relationship === 'Other' ? validate(c, required) : optional(c),
  }),
  additionalInformation: (c) => optional(c),
});
