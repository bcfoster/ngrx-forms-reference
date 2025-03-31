import { setValue, updateGroup } from 'ngrx-forms';
import { validate } from '../../../ngrx-forms/validate';
import {
  greaterThanOrEqualTo,
  lessThanOrEqualTo,
  maxLength,
  minLength,
  number,
  required,
} from 'ngrx-forms/validation';
import { optional } from '../../../ngrx-forms/optional';

export type SexAtBirth = 'Female' | 'Intersex' | 'Male' | 'Unknown';
export type Gender = 'Man' | 'Non-binary' | 'Two-Spirit' | 'Woman' | '__<CUSTOM>__';
export type Pronouns = 'He/him' | 'She/her' | 'They/them' | 'Ze/zir' | '__<CUSTOM>__';
export type IndigenousAncestry = 'Status' | 'NonStatus' | 'Inuit' | 'Metis' | 'Other';

export interface DemographicsForm {
  sexAtBirth: SexAtBirth | '';
  gender: Gender | '';
  customGender: '';
  pronouns: Pronouns | '';
  customPronouns: '';
  indigenousInd: boolean | null;
  associationNation: string;
  ancestrey: IndigenousAncestry | '';
}

export interface DateOfBirthForm {
  year: number | null;
  month: number | null;
  day: number | null;
}

export interface Form {
  haveClaimNumber: boolean | null;
  claimNumber: string;
  legalFirstName: string;
  preferredFirstName: string;
  middleName: string;
  lastName: string;
  demographics: DemographicsForm;
  dateOfBirth: DateOfBirthForm;
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
    customGender: '',
    pronouns: '',
    customPronouns: '',
    indigenousInd: null,
    ancestrey: '',
    associationNation: '',
  },
  dateOfBirth: {
    year: null,
    month: null,
    day: null,
  },
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
  preferredFirstName: optional(maxLength(25)),
  middleName: optional(maxLength(10)),
  lastName: validate(required, minLength(2), maxLength(30)),
  demographics: updateGroup({
    sexAtBirth: validate(required),
    gender: (c) => optional(c),
    customGender: (c) => optional(c),
    pronouns: (c) => optional(c),
    customPronouns: (c) => optional(c),
    indigenousInd: (c) => optional(c),
    ancestrey: (c) => optional(c),
    associationNation: (c) => optional(c),
  }),
  // TODO: fix number/greatThanOrEqualTo/lessThanOrEqualTo validators to accept string values
  dateOfBirth: updateGroup({
    year: validate(required, number, greaterThanOrEqualTo(1925), lessThanOrEqualTo(2013)),
    month: validate(required, number, greaterThanOrEqualTo(1), lessThanOrEqualTo(12)),
    day: validate(required, number, greaterThanOrEqualTo(1), lessThanOrEqualTo(31)),
  }),
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
