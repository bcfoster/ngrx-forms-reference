export interface MedicalCareForm {
  haveReceivedFirstAid: boolean | null;
  dateReceivedFirstAid: string;
  typeOfFirstAidReceived: string;
  haveVisitedPractitioner: boolean | null;
  dateReceivedTreatment: string;
  isApproximateDate: boolean | null;
  clinicOrHospitalName: string;
  practitionerName: string;
  practitionerLastName: string;
  clinicOrHospitalAddress: string;
  clinicOrHospitalPhoneNumber: string;
  clinicTreatmentDetails: string;
  haveAppointmentBooked: boolean | null;
  firstAidReceivedDateApproximateIndicator: boolean | null;
}

export interface AuthorizationForm {
  authorizedToAccessInjuryInformation: boolean | null;
  workerSignature: string;
}

export interface Form {
  medicalCare: MedicalCareForm;
  authorization: AuthorizationForm;
  additionalInformation: string;
}

export const initialFormValue: Form = {
  medicalCare: {
    haveReceivedFirstAid: null,
    dateReceivedFirstAid: '',
    typeOfFirstAidReceived: '',
    haveVisitedPractitioner: null,
    dateReceivedTreatment: '',
    isApproximateDate: null,
    clinicOrHospitalName: '',
    practitionerName: '',
    practitionerLastName: '',
    clinicOrHospitalAddress: '',
    clinicOrHospitalPhoneNumber: '',
    clinicTreatmentDetails: '',
    haveAppointmentBooked: null,
    firstAidReceivedDateApproximateIndicator: null,
  },
  authorization: {
    authorizedToAccessInjuryInformation: null,
    workerSignature: '',
  },
  additionalInformation: '',
};
