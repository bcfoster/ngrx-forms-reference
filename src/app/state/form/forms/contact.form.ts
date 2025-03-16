import {
  updateGroup,
  setUserDefinedProperty,
  enable,
  disable,
  setValue,
  validate,
  setErrors,
} from 'ngrx-forms';
import { required, email } from 'ngrx-forms/validation';

export interface Checkboxes {
  first: boolean;
  second: boolean;
  third: boolean;
  selected: string[];
}

export interface Form {
  firstName: string;
  middleName: string;
  lastName: string;
  subscribe: boolean;
  email: string;
  checkboxes: Checkboxes;
}

export const initialFormValue: Form = {
  firstName: '',
  middleName: '',
  lastName: '',
  subscribe: false,
  email: '',
  checkboxes: {
    first: false,
    second: false,
    third: false,
    selected: [],
  },
};

export const validator = updateGroup<Form>(
  {
    firstName: setUserDefinedProperty('mandatory', 1),
    lastName: setUserDefinedProperty('mandatory', 1),
    email: (c, f) =>
      f.value.subscribe
        ? setUserDefinedProperty(c, 'mandatory', 1) // TODO: mandatory
        : setUserDefinedProperty(c, 'mandatory', undefined), // TODO: not mandatory
    checkboxes: updateGroup<Checkboxes>({
      selected: setUserDefinedProperty('mandatory', 1),
    }),
  },
  {
    // handle dependent state transitions
    email: (c, f) => (f.value.subscribe ? enable(c) : disable(setValue(c, ''))),
    checkboxes: updateGroup<Checkboxes>({
      third: (c, f) => (!f.value.second ? setValue(c, false) : c),
    }),
  },
  {
    firstName: validate(required),
    lastName: validate(required),
    // TODO: is there an alternative to setErrors? maybe I should create a helper
    email: (c) =>
      'mandatory' in c.userDefinedProperties ? validate(c, required, email) : setErrors(c, {}),
    checkboxes: updateGroup<Checkboxes>({
      // TODO: use updateRecursive to validate? check out the example provided with updateRecursive in the ngrx-forms docs
      selected: validate(required),
    }),
  },
);
