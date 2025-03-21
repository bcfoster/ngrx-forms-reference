export interface DemographicsForm {
  sexAtBirth: 'female' | 'intersex' | 'male' | 'no-answer' | '';
  gender: 'man' | 'non-binary' | 'two-spirit' | 'woman' | 'alternative' | '';
  genderDescription: string;
  pronouns: 'he-him' | 'she-her' | 'they-them' | 'ze-zir' | 'alternative' | '';
  pronounsDescription: string;
  hasIdentifiedAsIndigenous: boolean | null;
  indigenousAncestory: 'status' | 'non-status' | 'unuit' | 'metis' | 'alternative' | '';
  indigenousAncestoryDescription: string;
}

export interface Form {
  hasClaimNumber: boolean | null;
  claimNumber: string;
  legalFirstName: string;
  preferredFirstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  demographics: DemographicsForm;
  hasPersonalHealthNumber: boolean | null;
  interpreter: boolean | null;
  preferredLanguage: 'english' | 'french' | '';
  heightFeet: string;
  heightInches: string;
  weightPounds: string;
}

export const initialFormValue: Form = {
  hasClaimNumber: null,
  claimNumber: '',
  legalFirstName: '',
  preferredFirstName: '',
  middleName: '',
  lastName: '',
  dateOfBirth: '',
  demographics: {
    sexAtBirth: '',
    gender: '',
    genderDescription: '',
    pronouns: '',
    pronounsDescription: '',
    hasIdentifiedAsIndigenous: null,
    indigenousAncestory: '',
    indigenousAncestoryDescription: '',
  },
  hasPersonalHealthNumber: null,
  interpreter: null,
  preferredLanguage: '',
  heightFeet: '',
  heightInches: '',
  weightPounds: '',
};
