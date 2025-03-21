export interface IncidentDetailsForm {
  occurredInBc: boolean | null;
  incidentLocation: string;
  incidentLocationDetails: string;
  occurredDuringNormalShift: boolean | null;
  shiftAndTimeOfInjuryDetails: string;
  activityAtTimeOfInjuryDetails: string;
  occurredWhilePerformingRegularDuties: boolean | null;
  changesOccurredDueToInjury: string[];
}

export interface Form {
  incidentDetails: IncidentDetailsForm;
}

export const initialFormValue: Form = {
  incidentDetails: {
    occurredInBc: null,
    incidentLocation: '',
    incidentLocationDetails: '',
    occurredDuringNormalShift: null,
    shiftAndTimeOfInjuryDetails: '',
    activityAtTimeOfInjuryDetails: '',
    occurredWhilePerformingRegularDuties: null,
    changesOccurredDueToInjury: [],
  },
};
