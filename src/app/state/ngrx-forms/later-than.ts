import { Boxed, unbox, ValidationErrors } from 'ngrx-forms';

export interface LaterThanValidationError {
  comparand: string;
  actual: string;
}

declare module 'ngrx-forms' {
  export interface ValidationErrors {
    laterThan?: LaterThanValidationError;
  }
}

/**
 * A validation function that requires a `Date` parsable `string` value to later than another date.
 * Considers `null`, `undefined` and empty strings as valid. Combine this
 * function with the `required` validation function if these values should be considered invalid.
 *
 * The validation error returned by this validation function has the following shape:
 *
 ```typescript
 {
 laterThan: {
 comparand: string;
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
 date: validate(laterThan('2011-10-05T14:48:00.000Z')),
 })
 ```
 *
 * Note that this function is generic to allow the compiler to properly infer the type
 * of the `validate` function for both optional and non-optional controls.
 */
export function laterThan(laterThanParam: string) {
  if (laterThanParam === null || laterThanParam === undefined) {
    throw new Error(
      `The laterThan Validation function requires the laterThan parameter to be a non-null string, got ${laterThanParam}!`,
    );
  }

  if (isNaN(Date.parse(laterThanParam))) {
    throw new Error(
      `The laterThan Validation function requires the laterThan parameter to be a parsable Date, got ${laterThanParam}!`,
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

    const date = new Date(timestamp);
    const comparand = new Date(laterThanParam);

    if (date > comparand) {
      return {};
    }

    return {
      laterThan: {
        comparand: comparand.toISOString(),
        actual: date.toISOString(),
      },
    };
  };
}
