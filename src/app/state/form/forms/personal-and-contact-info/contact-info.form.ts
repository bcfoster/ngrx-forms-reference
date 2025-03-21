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
    province: '',
    country: '',
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
