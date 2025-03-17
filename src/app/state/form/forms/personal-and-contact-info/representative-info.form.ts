export interface RepresentativeInfoForm {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  relationshipToWorker: 'coworker' | 'spouse' | 'family' | 'union' | 'other' | '';
  relationshipToWorkerDescription: string;
}

export const initialFormValue: RepresentativeInfoForm = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  relationshipToWorker: '',
  relationshipToWorkerDescription: '',
};
