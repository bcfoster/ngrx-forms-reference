import {
  FormState,
  formStateReducer,
  SetErrorsAction,
  SetUserDefinedPropertyAction,
  ValidationErrors,
} from 'ngrx-forms';
import { AbstractControlState } from 'ngrx-forms/src/state';

/**
 * This update function takes one or more validation functions and a form
 * state and sets the errors of the state to the result of applying the
 * given validation function(s) to the state's value.
 */
export function optional<TValue>(state: AbstractControlState<TValue>): FormState<TValue>;

/**
 * This update function takes an array of validation functions and a form
 * state and sets the errors of the state to the result of applying the given
 * validation function(s) to the state's value.
 */
export function optional<TValue>(state: AbstractControlState<TValue>): FormState<TValue>;

export function optional<TValue>(state: FormState<TValue>) {
  const setPropAction = new SetUserDefinedPropertyAction(state.id, 'optional', true);
  state = formStateReducer<TValue>(state, setPropAction);

  const setErrorsAction = new SetErrorsAction(state.id, {} as ValidationErrors);
  return formStateReducer<TValue>(state, setErrorsAction);
}
