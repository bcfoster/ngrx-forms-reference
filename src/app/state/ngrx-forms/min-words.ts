import { Boxed, unbox, ValidationErrors } from 'ngrx-forms';

export interface MinWordsValidationError {
  minWords: number;
  value: string;
  actualWords: number;
}

declare module 'ngrx-forms' {
  export interface ValidationErrors {
    minWords?: MinWordsValidationError;
  }
}

/**
 * A validation function that requires a `string` value to have a minimum number of words.
 *
 * The validation error returned by this validation function has the following shape:
 *
 ```typescript
 {
 minWords: {
 minWords: number;
 value: string;
 actualWords: number;
 };
 }
 ```
 *
 * Usually you would use this validation function in conjunction with the `validate`
 * update function to perform synchronous validation in your reducer:
 *
 ```typescript
 updateGroup<MyFormValue>({
 password: validate(minWords(8)),
 })
 ```
 *
 * Note that this function is generic to allow the compiler to properly infer the type
 * of the `validate` function for both optional and non-optional controls.
 */
export function minWords(minWordsParam: number) {
  if (minWordsParam === null || minWordsParam === undefined) {
    throw new Error(
      `The minLength Validation function requires the minLength parameter to be a non-null number, got ${minWordsParam}!`,
    );
  }

  return <T extends string | Boxed<string> | null | undefined>(value: T): ValidationErrors => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    value = unbox(value);

    if (value === null || value === undefined) {
      return {};
    }

    const length = (value as string).trim().split(' ').length;

    if (length === 0) {
      return {}; // don't validate empty values to allow optional controls
    }

    if (length >= minWordsParam) {
      return {};
    }

    return {
      minWords: {
        minWords: minWordsParam,
        value: value as string,
        actualWords: length,
      },
    };
  };
}
