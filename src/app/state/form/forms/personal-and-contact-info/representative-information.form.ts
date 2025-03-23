import { FormGroupState, updateGroup } from 'ngrx-forms';
import { minLength, required } from 'ngrx-forms/validation';

import { optional } from '../../../ngrx-forms/optional';
import { validate } from '../../../ngrx-forms/validate';
import { RepresentativeRelationshipType } from '../../../../services/wrio-api.service';

export interface Form {
  reportingForSelf: boolean | null;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  relationship: RepresentativeRelationshipType | '';
  relationshipOther: string;
}

export const initialFormValue: Form = {
  reportingForSelf: null,
  firstName: '',
  lastName: '',
  phoneNumber: '',
  relationship: '',
  relationshipOther: '',
};

export const validator = (state: FormGroupState<Form>): FormGroupState<Form> =>
  updateGroup<Form>(
    state,
    {
      reportingForSelf: validate(required),
    },
    state.value.reportingForSelf
      ? {
          firstName: (c) => optional(c),
          lastName: (c) => optional(c),
          phoneNumber: (c) => optional(c),
          relationship: (c) => optional(c),
          relationshipOther: (c) => optional(c),
        }
      : {
          firstName: (c) => validate(c, required, minLength(2)),
          lastName: (c) => validate(c, required, minLength(2)),
          phoneNumber: (c) => validate(c, required, minLength(10)),
          relationship: (c) => validate(c, required),
          relationshipOther: (c, f) =>
            f.value.relationship === 'Other' ? validate(c, required, minLength(4)) : optional(c),
        },
  );
