export interface Form {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  relationshipToWorker: string;
  relationshipToWorkerDescription: string;
}

export const initialFormValue: Form = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  relationshipToWorker: '',
  relationshipToWorkerDescription: '',
};
