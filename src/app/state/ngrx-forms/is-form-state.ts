/* eslint-disable @typescript-eslint/no-explicit-any */

import { FormState } from 'ngrx-forms';

/**
 * This function determines if a value is a form state.
 */
export function isFormState<TValue = any>(state: any): state is FormState<TValue> {
  return (
    !!state &&
    Object.prototype.hasOwnProperty.call(state, 'id') &&
    Object.prototype.hasOwnProperty.call(state, 'value') &&
    Object.prototype.hasOwnProperty.call(state, 'errors')
  );
}
