import { createReducer, on } from '@ngrx/store';
import {
  createFormGroupState,
  FormGroupState,
  isArrayState,
  isGroupState,
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
import * as fromContact from './forms/contact.form';

export const FORM_ID = 'form';
export const VERSION = 2;

export interface Form {
  contact: fromContact.Form;
}

export const initialFormValue: Form = {
  contact: fromContact.initialFormValue,
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
    if (action.controlId == state.form.controls.contact.id) {
      return {
        ...state,
        form: updateGroup(state.form, {
          contact: setValue(fromContact.initialFormValue),
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
    form: initialState.form,
  })),
  on(formActions.start, (state) => ({
    ...state,
    form: initialState.form,
  })),
);

const evaluateCompletion = (state: FormGroupState<Form>) =>
  updateRecursive(state, (control) => {
    if (isArrayState(control) || isGroupState(control)) {
      const validatedControls = Object.values(control.controls).filter(
        (c) => isGroupState(c) || c.userDefinedProperties['mandatory'],
      );
      const validControls = validatedControls.filter((c) => c.isValid);
      const percent = validControls.length / validatedControls.length;
      return setUserDefinedProperty(control, 'percentComplete', percent);
    }

    return control;
  });

const validate = updateGroup<Form>({
  contact: fromContact.validator,
});

export const reducer = wrapReducerWithFormStateUpdate(
  rawReducer,
  (state) => state.form,
  (form) => evaluateCompletion(validate(form)),
);
