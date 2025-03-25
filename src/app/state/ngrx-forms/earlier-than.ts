import { Boxed, unbox, ValidationErrors } from 'ngrx-forms';

export interface EarlierThanValidationError {
  comparand: string;
  actual: string;
}

declare module 'ngrx-forms' {
  export interface ValidationErrors {
    earlierThan?: EarlierThanValidationError;
  }
}

/**
 * A validation function that requires a `Date` parsable `string` value to earlier than another date.
 * Considers `null`, `undefined` and empty strings as valid. Combine this
 * function with the `required` validation function if these values should be considered invalid.
 *
 * The validation error returned by this validation function has the following shape:
 *
 ```typescript
 {
 earlierThan: {
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
 date: validate(earlierThan('2011-10-05T14:48:00.000Z')),
 })
 ```
 *
 * Note that this function is generic to allow the compiler to properly infer the type
 * of the `validate` function for both optional and non-optional controls.
 */
export function earlierThan(earlierThanParam: string) {
  if (earlierThanParam === null || earlierThanParam === undefined) {
    throw new Error(
      `The earlierThan Validation function requires the earlierThan parameter to be a non-null string, got ${earlierThanParam}!`,
    );
  }

  if (isNaN(Date.parse(earlierThanParam))) {
    throw new Error(
      `The earlierThan Validation function requires the earlierThan parameter to be a parsable Date, got ${earlierThanParam}!`,
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
    const comparand = new Date(earlierThanParam);

    if (date < comparand) {
      return {};
    }

    return {
      earlierThan: {
        comparand: comparand.toISOString(),
        actual: date.toISOString(),
      },
    };
  };
}
