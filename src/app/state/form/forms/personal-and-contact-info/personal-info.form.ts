import { setValue, updateGroup } from 'ngrx-forms';
import { validate } from '../../../ngrx-forms/validate';
import { maxLength, minLength, required } from 'ngrx-forms/validation';
import { optional } from '../../../ngrx-forms/optional';

export type SexAtBirth = 'Female' | 'Intersex' | 'Male' | 'Unknown';
export type Gender = 'Man' | 'Non-binary' | 'Two-Spirit' | 'Woman' | '__<CUSTOM>__';
export type Pronouns = 'He/him' | 'She/her' | 'They/them' | 'Ze/zir' | '__<CUSTOM>__';
export type IndigenousAncestry = 'Status' | 'NonStatus' | 'Inuit' | 'Metis' | 'Other';

export interface DemographicsForm {
  sexAtBirth: SexAtBirth | '';
  gender: Gender | '';
  pronouns: Pronouns | '';
  indigenousInd: boolean | null;
  associationNation: string;
  ancestrey: IndigenousAncestry | '';
}

export interface Form {
  haveClaimNumber: boolean | null;
  claimNumber: string;
  legalFirstName: string;
  preferredFirstName: string;
  middleName: string;
  lastName: string;
  demographics: DemographicsForm;
  dateOfBirth: string;
  havePhn: boolean | null;
  phn: string;
  interpreter: boolean | null;
  preferredLanguage: 'English' | 'French' | ''; // TODO: Add remaining languages
  heightFeet: string;
  heightInches: string;
  weight: string;
}

export const initialFormValue: Form = {
  haveClaimNumber: null,
  claimNumber: '',
  legalFirstName: '',
  preferredFirstName: '',
  middleName: '',
  lastName: '',
  demographics: {
    sexAtBirth: '',
    gender: '',
    pronouns: '',
    indigenousInd: null,
    ancestrey: '',
    associationNation: '',
  },
  dateOfBirth: '',
  havePhn: null,
  phn: '',
  interpreter: null,
  preferredLanguage: '',
  heightFeet: '',
  heightInches: '',
  weight: '',
};

export const validator = updateGroup<Form>({
  haveClaimNumber: validate(required),
  claimNumber: (c, f) =>
    f.value.haveClaimNumber
      ? validate(c, required, minLength(8), maxLength(8))
      : optional(setValue(c, '')),
  legalFirstName: validate(required, minLength(2), maxLength(25)),
  preferredFirstName: validate(maxLength(25)),
  middleName: validate(maxLength(10)),
  lastName: validate(required, minLength(2), maxLength(30)),
  demographics: updateGroup<DemographicsForm>({
    sexAtBirth: validate(required),
    gender: (c) => optional(c),
    pronouns: (c) => optional(c),
    indigenousInd: (c) => optional(c),
    ancestrey: (c) => optional(c),
    associationNation: (c) => optional(c),
  }),
  dateOfBirth: validate(required),
  havePhn: validate(required),
  phn: (c, f) =>
    f.value.havePhn
      ? validate(c, required, minLength(10), maxLength(10))
      : optional(setValue(c, '')),
  interpreter: validate(required),
  preferredLanguage: (c, f) =>
    f.value.interpreter ? validate(c, required) : optional(setValue(c, '')),
  heightFeet: (c) => optional(c),
  heightInches: (c) => optional(c),
  weight: (c) => optional(c),
});
