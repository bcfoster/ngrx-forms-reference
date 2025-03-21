export interface RepresentativeInfoForm {
  reportingForSelf: boolean | null;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  relationship: string;
  relationshipOther: string;
}

export interface Form {
  consentIsGiven: boolean | null;
  workerRepresentativesAuthorized: boolean | null;
  employerAndRepresentativesAuthorized: boolean | null;
  healthcareAndServiceProvidersAuthorized: boolean | null;
  representativeInfo: RepresentativeInfoForm;
}

export const initialFormValue: Form = {
  consentIsGiven: null,
  workerRepresentativesAuthorized: null,
  employerAndRepresentativesAuthorized: null,
  healthcareAndServiceProvidersAuthorized: null,
  representativeInfo: {
    reportingForSelf: null,
    firstName: '',
    lastName: '',
    phoneNumber: '',
    relationship: '',
    relationshipOther: '',
  },
};
