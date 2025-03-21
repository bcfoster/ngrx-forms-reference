export interface RepresentativeInformationForm {
  reportingForSelf: boolean | null;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  relationship: 'coworker' | 'spouse' | 'family' | 'union' | 'other' | '';
  relationshipOther: string;
}

export const initialFormValue: RepresentativeInformationForm = {
  reportingForSelf: null,
  firstName: '',
  lastName: '',
  phoneNumber: '',
  relationship: '',
  relationshipOther: '',
};
