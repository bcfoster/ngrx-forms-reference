import { createReducer, on } from '@ngrx/store';
import {
  createFormGroupState,
  FormGroupState,
  markAsSubmitted,
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
  debug: true,
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
  onNgrxFormsAction(SetValueAction, (state) => ({
    ...state,
    lastEdited: new Date(),
  })),
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
  updateGroup<Form>(
    form,
    {
      personalAndContactInfo: personalAndContactInfo.validator,
      injuryAndIncident: injuryAndIncident.validator(form),
      treatmentDetails: treatmentDetails.validator(form),
      employmentAndEmployerInfo: employmentAndEmployer.validator,
    },
    {
      personalAndContactInfo: (c, f) => (f !== initialFormState ? markAsSubmitted(c) : c),
      injuryAndIncident: (c, f) => (f !== initialFormState ? markAsSubmitted(c) : c),
      treatmentDetails: (c, f) => (f !== initialFormState ? markAsSubmitted(c) : c),
      employmentAndEmployerInfo: (c, f) => (f !== initialFormState ? markAsSubmitted(c) : c),
    },
  );

export const reducer = wrapReducerWithFormStateUpdate(
  rawReducer,
  (state) => state.form,
  (form) => evaluateCompletion(validate(form)),
);
