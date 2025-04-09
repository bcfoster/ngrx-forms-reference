import { updateGroup } from 'ngrx-forms';
import { email, maxLength, required } from 'ngrx-forms/validation';

import { optional } from '../../ngrx-forms/optional';
import { postalCode } from '../../ngrx-forms/postal-code';
import { validate } from '../../ngrx-forms/validate';
import { zipCode } from '../../ngrx-forms/zip-code';

export interface AddressForm {
  addressLine1: string;
  addressLine2: string;
  city: string;
  province: string;
  country: string;
  postalCode: string;
  addressExtra: string;
}

export interface PhoneForm {
  homePhone: string;
  cellPhone: string;
  workPhone: string;
  extension: string;
}

export interface Form {
  address: AddressForm;
  phone: PhoneForm;
  email: string;
}

export const initialFormValue: Form = {
  address: {
    addressLine1: '',
    addressLine2: '',
    city: '',
    province: 'BC',
    country: 'CA',
    postalCode: '',
    addressExtra: '',
  },
  phone: {
    homePhone: '',
    cellPhone: '',
    workPhone: '',
    extension: '',
  },
  email: '',
};

export const validator = updateGroup<Form>({
  address: updateGroup<AddressForm>({
    addressLine1: validate(required, maxLength(40)),
    addressLine2: optional(maxLength(40)),
    city: validate(required, maxLength(30)),
    province: optional(),
    country: optional(),
    postalCode: (c, f) => validate(c, required, f.value.country === 'CA' ? postalCode : zipCode),
    addressExtra: (c) => optional(c),
  }),
  // TODO: the validation rules for these controls is FUBAR
  phone: updateGroup<PhoneForm>({
    homePhone: (c) => optional(c),
    cellPhone: (c) => optional(c),
    workPhone: (c) => optional(c),
    extension: (c) => optional(c),
  }),
  email: validate(required, email),
});
