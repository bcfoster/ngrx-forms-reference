import { createFormGroupState, setUserDefinedProperty, updateGroup, validate } from 'ngrx-forms';
import { required } from 'ngrx-forms/validation';

import * as formReducer from './form.reducer';

describe('form reducer', () => {
  describe('evaluate completion', () => {
    describe('form control', () => {
      it('should evaluate 0% when single mandatory field is invalid', () => {
        interface Form {
          mandatory: string;
        }

        const state = createFormGroupState<Form>('id', {
          mandatory: '',
        });

        const result = formReducer.evaluateCompletion(
          updateGroup<Form>(
            state,
            {
              mandatory: validate(required),
            },
            {
              mandatory: setUserDefinedProperty('mandatory', true),
            },
          ),
        );

        expect(result.userDefinedProperties['mandatory']).toBe(1);
        expect(result.userDefinedProperties['valid']).toBe(0);
      });

      it('should evaluate 100% when single mandatory field is valid', () => {
        interface Form {
          mandatory: string;
        }

        const state = createFormGroupState<Form>('id', {
          mandatory: 'value',
        });

        const result = formReducer.evaluateCompletion(
          updateGroup<Form>(
            state,
            {
              mandatory: validate(required),
            },
            {
              mandatory: setUserDefinedProperty('mandatory', true),
            },
          ),
        );

        expect(result.userDefinedProperties['mandatory']).toBe(1);
        expect(result.userDefinedProperties['valid']).toBe(1);
      });

      describe('with sibling form control', () => {
        it('should evaluate 0% when single mandatory field is invalid', () => {
          interface Form {
            mandatory: string;
            optional: string;
          }

          const state = createFormGroupState<Form>('id', {
            mandatory: '',
            optional: '',
          });

          const result = formReducer.evaluateCompletion(
            updateGroup<Form>(
              state,
              {
                mandatory: validate(required),
              },
              {
                mandatory: setUserDefinedProperty('mandatory', 1),
              },
            ),
          );

          expect(result.userDefinedProperties['mandatory']).toBe(1);
          expect(result.userDefinedProperties['valid']).toBe(0);
        });

        it('should evaluate 100% when single mandatory field is valid', () => {
          interface Form {
            mandatory: string;
            optional: string;
          }

          const state = createFormGroupState<Form>('id', {
            mandatory: 'value',
            optional: '',
          });

          const result = formReducer.evaluateCompletion(
            updateGroup<Form>(
              state,
              {
                mandatory: validate(required),
              },
              {
                mandatory: setUserDefinedProperty('mandatory', true),
              },
            ),
          );

          expect(result.userDefinedProperties['mandatory']).toBe(1);
          expect(result.userDefinedProperties['valid']).toBe(1);
        });
      });

      describe('with sibling form group', () => {
        it('should evaluate 50% when single mandatory field is valid and form group evaluates 0%', () => {
          interface NestedForm {
            mandatory: string;
          }

          interface Form {
            mandatory: string;
            nested: NestedForm;
          }

          const state = createFormGroupState<Form>('id', {
            mandatory: 'value',
            nested: {
              mandatory: '',
            },
          });

          const result = formReducer.evaluateCompletion(
            updateGroup<Form>(
              state,
              {
                mandatory: validate(required),
                nested: updateGroup<NestedForm>({
                  mandatory: validate(required),
                }),
              },
              {
                mandatory: setUserDefinedProperty('mandatory', 1),
                nested: updateGroup<NestedForm>({
                  mandatory: setUserDefinedProperty('mandatory', 1),
                }),
              },
            ),
          );

          expect(result.userDefinedProperties['mandatory']).toBe(2);
          expect(result.userDefinedProperties['valid']).toBe(1);

          expect(result.controls.nested.userDefinedProperties['mandatory']).toBe(1);
          expect(result.controls.nested.userDefinedProperties['valid']).toBe(0);
        });
      });
    });

    describe('form array', () => {
      it('should evaluate 0% when single mandatory field in array is invalid', () => {
        interface Form {
          mandatory: string[];
        }

        const state = createFormGroupState<Form>('id', {
          mandatory: [],
        });

        const result = formReducer.evaluateCompletion(
          updateGroup<Form>(
            state,
            {
              mandatory: validate(required),
            },
            {
              mandatory: setUserDefinedProperty('mandatory', 1),
            },
          ),
        );

        expect(result.userDefinedProperties['mandatory']).toBe(1);
        expect(result.userDefinedProperties['valid']).toBe(0);
      });

      it('should evaluate 100% when single mandatory field in array is valid', () => {
        interface Form {
          mandatory: string[];
        }

        const state = createFormGroupState<Form>('id', {
          mandatory: ['string'],
        });

        const result = formReducer.evaluateCompletion(
          updateGroup<Form>(
            state,
            {
              mandatory: validate(required),
            },
            {
              mandatory: setUserDefinedProperty('mandatory', 1),
            },
          ),
        );

        expect(result.userDefinedProperties['mandatory']).toBe(1);
        expect(result.userDefinedProperties['valid']).toBe(1);
      });
    });
  });
});
