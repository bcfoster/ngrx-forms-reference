import { FormGroupState, setValue, updateGroup } from 'ngrx-forms';
import { required } from 'ngrx-forms/validation';

import * as personalAndContactInfo from './personal-and-contact-info.form';
import { optional } from '../../ngrx-forms/optional';
import { validate } from '../../ngrx-forms/validate';

export interface Form {
  consentIsGiven: boolean | null;
  workerRepresentativesAuthorized: boolean | null;
  employerAndRepresentativesAuthorized: boolean | null;
  healthcareAndServiceProvidersAuthorized: boolean | null;
}

export const initialFormValue: Form = {
  consentIsGiven: null,
  workerRepresentativesAuthorized: null,
  employerAndRepresentativesAuthorized: null,
  healthcareAndServiceProvidersAuthorized: null,
};

export const validator = (
  state: FormGroupState<Form>,
  parent: FormGroupState<personalAndContactInfo.Form>,
): FormGroupState<Form> =>
  updateGroup<Form>(state, {
    consentIsGiven: (c) =>
      (parent.value.representativeInformation.reportingForSelf ?? false)
        ? validate(c, required)
        : optional(c),
    workerRepresentativesAuthorized: (c, f) =>
      f.value.consentIsGiven ? validate(c, required) : optional(setValue(c, null)),
    employerAndRepresentativesAuthorized: (c, f) =>
      f.value.consentIsGiven ? validate(c, required) : optional(setValue(c, null)),
    healthcareAndServiceProvidersAuthorized: (c, f) =>
      f.value.consentIsGiven ? validate(c, required) : optional(setValue(c, null)),
  });
