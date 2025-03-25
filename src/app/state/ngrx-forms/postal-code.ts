import { Boxed, unbox, ValidationErrors } from 'ngrx-forms';

export const NGRX_FORMS_POSTAL_CODE_VALIDATION_REGEXP =
  /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z] \d[ABCEGHJ-NPRSTV-Z]\d$/;

export interface PostalCodeValidationError {
  pattern: string;
  actual: string;
}

declare module 'ngrx-forms' {
  export interface ValidationErrors {
    postalCode?: PostalCodeValidationError;
  }
}

/**
 * A validation function that requires a value to be a valid Canadian postal code.
 * Considers `null`, `undefined`, and `''` as valid. Combine this function with the
 * `required` validation function if these values should be considered invalid.
 *
 * The validation error returned by this validation function has the following shape:
 *
 ```typescript
 {
 postalCode: {
 pattern: string;
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
 userMailAddress: validate(postalCode),
 })
 ```
 *
 * Note that this function is generic to allow the compiler to properly infer the type
 * of the `validate` function for both optional and non-optional controls.
 */
export function postalCode<T extends string | Boxed<string> | null | undefined>(
  value: T,
): ValidationErrors {
  value = unbox(value) as string | null | undefined as T;

  if (value === null || value === undefined || (value as string).length === 0) {
    return {};
  }

  if (NGRX_FORMS_POSTAL_CODE_VALIDATION_REGEXP.test(value as string)) {
    return {};
  }

  return {
    postalCode: {
      pattern: NGRX_FORMS_POSTAL_CODE_VALIDATION_REGEXP.toString(),
      actual: value as string,
    },
  };
}
