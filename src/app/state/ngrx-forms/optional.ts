import {
  AbstractControlState,
  FormState,
  formStateReducer,
  SetErrorsAction,
  SetUserDefinedPropertyAction,
  ValidationErrors,
  ValidationFn,
} from 'ngrx-forms';
import { ensureState } from './ensure-state';
import { isFormState } from './is-form-state';

/**
 * This update function possibly takes no arguments.
 */
export function optional<TValue>(state?: AbstractControlState<TValue>): FormState<TValue>;

/**
 * This update function takes an array of validation functions and a form
 * state and sets the errors of the state to the result of applying the given
 * validation function(s) to the state's value.
 */
export function optional<TValue>(
  state: AbstractControlState<TValue>,
  ...rest: ValidationFn<TValue>[]
): FormState<TValue>;

/**
 * This update function takes one or more validation functions and returns
 * a projection function that sets the errors of a form state to the result
 * of applying the given validation function(s) to the state's value.
 */
export function optional<TValue>(
  fn: ValidationFn<TValue>,
  ...rest: ValidationFn<TValue>[]
): (state: AbstractControlState<TValue>) => FormState<TValue>;

/**
 * This update function takes an array of validation functions and returns a
 * projection function that sets the errors of a form state to the result of
 * applying the given validation function(s) to the state's value.
 */
export function optional<TValue>(
  rest: ValidationFn<TValue>[],
): (state: AbstractControlState<TValue>) => FormState<TValue>;

export function optional<TValue>(
  stateOrFunctionOrFunctionArray?:
    | FormState<TValue>
    | ValidationFn<TValue>
    | ValidationFn<TValue>[],
  ...rest: ValidationFn<TValue>[]
) {
  if (stateOrFunctionOrFunctionArray === undefined) {
    return (s: AbstractControlState<TValue>) => optional<TValue>(ensureState(s));
  }

  if (isFormState<TValue>(stateOrFunctionOrFunctionArray)) {
    const state = stateOrFunctionOrFunctionArray as AbstractControlState<TValue>;
    const errors = rest.reduce(
      (agg, validationFn) => Object.assign(agg, validationFn(state.value)),
      {} as ValidationErrors,
    );

    const optionalAdded = formStateReducer<TValue>(
      stateOrFunctionOrFunctionArray,
      new SetUserDefinedPropertyAction(state.id, 'optional', true),
    );

    return formStateReducer<TValue>(optionalAdded, new SetErrorsAction(state.id, errors));
  }

  return (s: AbstractControlState<TValue>) => optional<TValue>(ensureState(s), ...rest);
}
