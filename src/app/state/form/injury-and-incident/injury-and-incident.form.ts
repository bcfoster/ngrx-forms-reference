import { FormGroupState, updateGroup } from 'ngrx-forms';

import { optional } from '../../ngrx-forms/optional';
import * as formReducer from '../form.reducer';
import * as incidentOverview from './incident-overview.form';
import * as injuryDetails from './injury-details.form';
import * as incidentDetails from './incident-details.form';

export interface Form {
  incidentOverview: incidentOverview.Form;
  injuryDetails: injuryDetails.Form;
  incidentDetails: incidentDetails.Form;
  additionalInformation: string;
}

export const initialFormValue: Form = {
  incidentOverview: incidentOverview.initialFormValue,
  injuryDetails: injuryDetails.initialFormValue,
  incidentDetails: incidentDetails.initialFormValue,
  additionalInformation: '',
};

export const validator = (form: FormGroupState<formReducer.Form>) =>
  updateGroup<Form>({
    incidentOverview: incidentOverview.validator(form),
    injuryDetails: injuryDetails.validator,
    incidentDetails: incidentDetails.validator,
    additionalInformation: (c) => optional(c),
  });
