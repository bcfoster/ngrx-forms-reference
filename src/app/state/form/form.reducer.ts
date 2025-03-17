import { createReducer, on } from '@ngrx/store';
import {
  createFormGroupState,
  FormGroupState,
  isArrayState,
  isGroupState,
  KeyValue,
  onNgrxForms,
  onNgrxFormsAction,
  ResetAction,
  setUserDefinedProperty,
  setValue,
  SetValueAction,
  updateGroup,
  updateRecursive,
  wrapReducerWithFormStateUpdate,
} from 'ngrx-forms';

import { draftActions } from '../drafts/drafts.actions';
import { formActions } from './form.actions';
import * as personalAndContactInfoForm from './forms/personal-and-contact-info.form';

export const FORM_ID = 'form';
export const VERSION = 2;

export interface Form {
  personalAndContactInfo: personalAndContactInfoForm.Form;
}

export const initialFormValue: Form = {
  personalAndContactInfo: personalAndContactInfoForm.initialFormValue,
};

export interface State {
  form: FormGroupState<Form>;
  lastEdited: Date | null;
}

export const initialFormState = createFormGroupState<Form>(FORM_ID, initialFormValue);

export const initialState: State = {
  form: initialFormState,
  lastEdited: null,
};

const rawReducer = createReducer(
  initialState,
  onNgrxForms(),
  onNgrxFormsAction(ResetAction, (state, action) => {
    if (action.controlId == state.form.controls.personalAndContactInfo.id) {
      return {
        ...state,
        // form: updateGroup(state.form, {
        //   contact: setValue(contactForm.initialFormValue),
        // }),
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
    form: initialState.form,
  })),
  on(formActions.start, (state) => ({
    ...state,
    form: initialState.form,
  })),
);

export const evaluateCompletion = <T extends KeyValue>(state: FormGroupState<T>) =>
  updateRecursive(state, (control) => {
    if (isArrayState(control) || isGroupState(control)) {
      // TODO: would this be cleaner if arrays and groups were handled separately?
      const mandatoryControls: number[] = [];
      const validControls: number[] = [];

      Object.values(control.controls).forEach((c) => {
        if ('mandatory' in c.userDefinedProperties) {
          mandatoryControls.push(c.userDefinedProperties['mandatory'] as number);

          if ('valid' in c.userDefinedProperties) {
            validControls.push(c.userDefinedProperties['valid'] as number);
          } else if (c.isValid) {
            validControls.push(1);
          }
        }
      });

      const mandatory = mandatoryControls.reduce((total, value) => total + value, 0);
      const valid = validControls.reduce((total, value) => total + value, 0);

      let updatedControl = setUserDefinedProperty(
        control,
        'mandatory',
        Math.max(control.userDefinedProperties['mandatory'] ?? 0, mandatory),
      );
      updatedControl = setUserDefinedProperty(
        updatedControl,
        'valid',
        Math.max(updatedControl.isValid ? 1 : 0, valid),
      );
      return updatedControl;
    }

    return control;
  });

export const validate = updateGroup<Form>({
  personalAndContactInfo: personalAndContactInfoForm.validator,
});

export const reducer = wrapReducerWithFormStateUpdate(
  rawReducer,
  (state) => state.form,
  (form) => evaluateCompletion(validate(form)),
);
