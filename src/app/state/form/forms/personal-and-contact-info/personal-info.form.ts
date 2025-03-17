export interface PersonalInfoForm {
  claimNumber: string;
  legalFirstName: string;
}

export const initialFormValue: PersonalInfoForm = {
  claimNumber: '',
  legalFirstName: '',
};
