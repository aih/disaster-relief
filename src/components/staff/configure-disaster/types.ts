
export interface AssistanceProgram {
  name: string;
  programType: string;
  maxAward: number;
  isExpedited: boolean;
  inspectionWaived: boolean;
  rules: string[];
  subjectToCap: string;
  definition: string;
}

export interface GoverningLaw {
  id: string;
  title: string;
  reference: string;
  description: string;
}

export interface BasicInfo {
  disasterId: string;
  disasterName: string;
  state: string;
  counties: string;
  disasterType: string;
  otherDisasterType: string;
  applicationDeadline: string;
  disasterStartDate: string;
}

export interface SpecialProvisions {
  expeditedSNA: boolean;
  cleanSanitizeWaiver: boolean;
  displacementWaiver: boolean;
  geofenceActivated: boolean;
  autoAdjudication: boolean;
}

export interface ConfigureDisasterProps {
  onSave: () => void;
}
