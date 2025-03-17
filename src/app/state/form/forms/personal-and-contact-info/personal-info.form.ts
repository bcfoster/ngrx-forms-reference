export interface PersonalInfoForm {
  hasClaimNumber: boolean | null;
  claimNumber: string;
  legalFirstName: string;
  preferredFirstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
}

export const initialFormValue: PersonalInfoForm = {
  hasClaimNumber: null,
  claimNumber: '',
  legalFirstName: '',
  preferredFirstName: '',
  middleName: '',
  lastName: '',
  dateOfBirth: '',
};
