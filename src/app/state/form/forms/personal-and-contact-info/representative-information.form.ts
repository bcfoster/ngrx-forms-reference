import { updateGroup } from 'ngrx-forms';
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

export const validator = updateGroup<Form>({
  reportingForSelf: validate(required),
  firstName: (c, f) =>
    (f.value.reportingForSelf ?? true) ? optional(c) : validate(c, required, minLength(2)),
  lastName: (c, f) =>
    (f.value.reportingForSelf ?? true) ? optional(c) : validate(c, required, minLength(2)),
  phoneNumber: (c, f) =>
    (f.value.reportingForSelf ?? true) ? optional(c) : validate(c, required, minLength(10)),
  relationship: (c, f) =>
    (f.value.reportingForSelf ?? true) ? optional(c) : validate(c, required),
  relationshipOther: (c, f) =>
    f.value.relationship == 'Other' ? validate(c, minLength(4)) : optional(c),
});
