import { Boxed, unbox, ValidationErrors } from 'ngrx-forms';

export interface AccountNumberValidationError {
  actual: string;
}

declare module 'ngrx-forms' {
  export interface ValidationErrors {
    accountNumber?: AccountNumberValidationError;
  }
}

/**
 * A validation function that requires a value to be a valid account number.
 * Considers `null`, `undefined`, and `''` as valid. Combine this function with the
 * `required` validation function if these values should be considered invalid.
 *
 * The validation error returned by this validation function has the following shape:
 *
 ```typescript
 {
 accountNumber: {
 actual: string;
 };
 }
 ```
 *
 * Usually you would use this validation function in conjunction with the `validate`
 * update function to perform synchronous validation in your reducer:
 *
 ```typescript
 updateGroup<MyFormValue>({
 accountNumber: validate(accountNumber),
 })
 ```
 *
 * Note that this function is generic to allow the compiler to properly infer the type
 * of the `validate` function for both optional and non-optional controls.
 */
export function accountNumber<T extends string | Boxed<string> | null | undefined>(
  value: T,
): ValidationErrors {
  value = unbox(value) as string | null | undefined as T;

  if (
    value === null ||
    value === undefined ||
    (value as string).length === 6 ||
    (value as string).length === 9
  ) {
    return {};
  }

  return {
    accountNumber: {
      actual: value as string,
    },
  };
}
