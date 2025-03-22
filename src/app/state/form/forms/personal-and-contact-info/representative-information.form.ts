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
