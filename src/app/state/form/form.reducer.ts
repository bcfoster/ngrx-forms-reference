import { createReducer, on } from '@ngrx/store';
import {
  createFormGroupState,
  FormGroupState,
  onNgrxForms,
  onNgrxFormsAction,
  ResetAction,
  setValue,
  SetValueAction,
  updateGroup,
  wrapReducerWithFormStateUpdate,
} from 'ngrx-forms';

import { draftActions } from '../drafts/drafts.actions';
import { formActions } from './form.actions';

import { evaluateCompletion } from './form.progress';
import * as contactInfo from './forms/personal-and-contact-info/contact-info.form';
import * as employmentAndEmployer from './forms/employment-and-employer-info.form';
import * as injuryAndIncident from './forms/injury-and-incident.form';
import * as personalAndContactInfo from './forms/personal-and-contact-info.form';
import * as treatmentDetails from './forms/treatment-details.form';

export const FORM_ID = 'form';
export const VERSION = 2;

export interface Form {
  personalAndContactInfo: personalAndContactInfo.Form;
  injuryAndIncident: injuryAndIncident.Form;
  treatmentDetails: treatmentDetails.Form;
  employmentAndEmployerInfo: employmentAndEmployer.Form;
}

export const initialFormValue: Form = {
  personalAndContactInfo: personalAndContactInfo.initialFormValue,
  injuryAndIncident: injuryAndIncident.initialFormValue,
  treatmentDetails: treatmentDetails.initialFormValue,
  employmentAndEmployerInfo: employmentAndEmployer.initialFormValue,
};

export interface State {
  form: FormGroupState<Form>;
  lastEdited: Date | null;
  debug: boolean;
}

export const initialFormState = createFormGroupState<Form>(FORM_ID, initialFormValue);

export const initialState: State = {
  form: initialFormState,
  lastEdited: null,
  debug: false,
};

const rawReducer = createReducer(
  initialState,
  onNgrxForms(),
  onNgrxFormsAction(ResetAction, (state, action) => {
    if (action.controlId == state.form.controls.personalAndContactInfo.id) {
      return {
        ...state,
        form: updateGroup(state.form, {
          personalAndContactInfo: setValue(personalAndContactInfo.initialFormValue),
        }),
        lastEditedDate: new Date().toISOString(),
      };
    }

    return state;
  }),
  onNgrxFormsAction(SetValueAction, (state, action) => {
    if (
      action.controlId ===
      state.form.controls.personalAndContactInfo.controls.contactInformation.controls.address
        .controls.country.id
    ) {
      return {
        ...state,
        lastEdited: new Date(),
        form: updateGroup(state.form, {
          personalAndContactInfo: updateGroup<personalAndContactInfo.Form>({
            contactInformation: updateGroup<contactInfo.Form>({
              address: updateGroup<contactInfo.AddressForm>({
                province: setValue(action.value === 'CA' ? 'AB' : 'AL'),
              }),
            }),
          }),
        }),
      };
    }

    return {
      ...state,
      lastEdited: new Date(),
    };
  }),
  on(draftActions.draftLoaded, (state, action) => ({
    ...state,
    form: setValue(state.form, action.form),
  })),
  on(formActions.reset, (state) => ({
    ...state,
    form: initialFormState,
  })),
  on(formActions.start, (state) => ({
    ...state,
    form: initialFormState,
  })),
);

export const validate = (form: FormGroupState<Form>) =>
  updateGroup<Form>(form, {
    personalAndContactInfo: personalAndContactInfo.validator,
    injuryAndIncident: injuryAndIncident.validator(form),
    treatmentDetails: treatmentDetails.validator(form),
    employmentAndEmployerInfo: employmentAndEmployer.validator,
  });

export const reducer = wrapReducerWithFormStateUpdate(
  rawReducer,
  (state) => state.form,
  (form) => evaluateCompletion(validate(form)),
);
