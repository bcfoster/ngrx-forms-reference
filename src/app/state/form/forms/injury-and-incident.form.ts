import * as incidentOverview from './injury-and-incident/incident-overview.form';
import * as injuryDetails from './injury-and-incident/injury-details.form';
import * as incidentDetails from './injury-and-incident/incident-details.form';

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
