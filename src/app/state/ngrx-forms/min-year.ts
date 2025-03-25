import { Boxed, unbox, ValidationErrors } from 'ngrx-forms';

export interface MinYearValidationError {
  minYear: number;
  value: string;
  actualYear: number;
}

declare module 'ngrx-forms' {
  export interface ValidationErrors {
    minYear?: MinYearValidationError;
  }
}

/**
 * A validation function that requires a `Date` parsable `string` value to have a minimum year.
 * Considers `null`, `undefined` and empty strings as valid. Combine this
 * function with the `required` validation function if these values should be considered invalid.
 *
 * The validation error returned by this validation function has the following shape:
 *
 ```typescript
 {
 minYear: {
 minYear: number;
 value: string;
 actualYear: number;
 };
 }
 ```
 *
 * Usually you would use this validation function in conjunction with the `validate`
 * update function to perform synchronous validation in your reducer:
 *
 ```typescript
 updateGroup<MyFormValue>({
 date: validate(minYear(1900)),
 })
 ```
 *
 * Note that this function is generic to allow the compiler to properly infer the type
 * of the `validate` function for both optional and non-optional controls.
 */
export function minYear(minYearParam: number) {
  if (minYearParam === null || minYearParam === undefined) {
    throw new Error(
      `The minYear Validation function requires the minYear parameter to be a non-null number, got ${minYearParam}!`,
    );
  }

  return <T extends string | Boxed<string> | null | undefined>(value: T): ValidationErrors => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    value = unbox(value);

    if (value === null || value === undefined) {
      return {};
    }

    const timestamp = Date.parse(value);

    if (isNaN(timestamp)) {
      return {};
    }

    const year = new Date(timestamp).getFullYear();

    if (year >= minYearParam) {
      return {};
    }

    return {
      minYear: {
        minYear: minYearParam,
        value: value as string,
        actualYear: year,
      },
    };
  };
}
