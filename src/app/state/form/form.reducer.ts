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
import { injuryAndIncidentActions } from './injury-and-incident.actions';
import * as employmentAndEmployer from './employment-and-employer-info/employment-and-employer-info.form';
import * as incidentOverview from './injury-and-incident/incident-overview.form';
import * as injuryAndIncident from './injury-and-incident/injury-and-incident.form';
import * as injuryDetails from './injury-and-incident/injury-details.form';
import * as contactInfo from './personal-and-contact-info/contact-info.form';
import * as personalAndContactInfo from './personal-and-contact-info/personal-and-contact-info.form';
import * as personalInfo from './personal-and-contact-info/personal-info.form';
import * as treatmentDetails from './treatment-details/treatment-details.form';

export const FORM_ID = 'form';
export const VERSION = 2;

export interface Form {
  personalAndContactInfo: personalAndContactInfo.Form;
  injuryAndIncident: injuryAndIncident.Form;
  treatmentDetails: treatmentDetails.Form;
  employmentAndEmployerInfo: employmentAndEmployer.Form;
  isTimelossInjury: boolean;
}

export const initialFormValue: Form = {
  personalAndContactInfo: personalAndContactInfo.initialFormValue,
  injuryAndIncident: injuryAndIncident.initialFormValue,
  treatmentDetails: treatmentDetails.initialFormValue,
  employmentAndEmployerInfo: employmentAndEmployer.initialFormValue,
  isTimelossInjury: true,
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
      action.controlId.startsWith(
        state.form.controls.personalAndContactInfo.controls.personalInformation.controls.dateOfBirth
          .id,
      )
    ) {
      return {
        ...state,
        lastEdited: new Date(),
        form: updateGroup(state.form, {
          personalAndContactInfo: updateGroup<personalAndContactInfo.Form>({
            personalInformation: updateGroup<personalInfo.Form>({
              dateOfBirth: updateGroup<personalInfo.DateOfBirthForm>({
                year: (c) => setValue(c, isNaN(action.value as number) ? c.value : +c.value!),
                month: (c) => setValue(c, isNaN(action.value as number) ? c.value : +c.value!),
                day: (c) => setValue(c, isNaN(action.value as number) ? c.value : +c.value!),
              }),
            }),
          }),
        }),
      };
    }

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

    if (
      action.controlId.startsWith(
        state.form.controls.injuryAndIncident.controls.incidentOverview.controls.itemsDamaged.id,
      )
    ) {
      const isNone =
        action.controlId ===
        state.form.controls.injuryAndIncident.controls.incidentOverview.controls.itemsDamaged
          .controls.none.id;

      return {
        ...state,
        form: updateGroup(state.form, {
          injuryAndIncident: updateGroup<injuryAndIncident.Form>({
            incidentOverview: updateGroup<incidentOverview.Form>({
              itemsDamaged: (c) =>
                isNone
                  ? updateGroup(c, {
                      hearingAid: setValue(false),
                      artificialLimb: setValue(false),
                      dentures: setValue(false),
                      eyeGlasses: setValue(false),
                    })
                  : updateGroup(c, {
                      none: setValue(false),
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
  on(injuryAndIncidentActions.addBodyPart, (state, action) => ({
    ...state,
    form: updateGroup(state.form, {
      injuryAndIncident: updateGroup<injuryAndIncident.Form>({
        injuryDetails: updateGroup<injuryDetails.Form>({
          bodyParts: (c) => setValue(c, [...c.value, action.id]),
        }),
      }),
    }),
  })),
  on(injuryAndIncidentActions.removeBodyPart, (state, action) => ({
    ...state,
    form: updateGroup(state.form, {
      injuryAndIncident: updateGroup<injuryAndIncident.Form>({
        injuryDetails: updateGroup<injuryDetails.Form>({
          bodyParts: (c) =>
            setValue(
              c,
              c.value.filter((v) => v !== action.id),
            ),
        }),
      }),
    }),
  })),
);

export const validate = (form: FormGroupState<Form>) =>
  updateGroup<Form>(form, {
    personalAndContactInfo: personalAndContactInfo.validator,
    injuryAndIncident: injuryAndIncident.validator(form),
    treatmentDetails: treatmentDetails.validator(form),
    employmentAndEmployerInfo: employmentAndEmployer.validator(form),
  });

export const reducer = wrapReducerWithFormStateUpdate(
  rawReducer,
  (state) => state.form,
  (form) => evaluateCompletion(validate(form)),
);
