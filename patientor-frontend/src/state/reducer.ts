import { State } from "./state";
import { Patient, Diagnosis, Entry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSIS_LIST";
      payload: Diagnosis[];
    }
  | {
      type: "ADD_ENTRY";
      payload: {
        newEntry: Entry;
        patient: Patient;
      };
    }
  | {
      type: "SET_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_ENTRY_TYPE";
      payload: string;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnoses
        }
      };
    case "ADD_ENTRY":
      const patientId = action.payload.patient.id;
      const patientData = state.patient[patientId];
      const newEntry = action.payload.newEntry;
      return {
        ...state,
        patients: {
          ...state.patients,
          [patientId]: {
            ...patientData,
            entries: patientData.entries.concat(newEntry)
          }
        },
        patient: {
          [patientId]: {
            ...patientData,
            entries: patientData.entries.concat(newEntry)
          }
        }
      };
    case "SET_PATIENT":
      return {
        ...state,
        patient: {
          [action.payload.id]: action.payload
        }
      };
    case "SET_ENTRY_TYPE":
      return {
        ...state,
        entryType: action.payload
      };
    default:
      return state;
  }
};

export const setPatientList = (patientListFromApi: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patientListFromApi
  };
};

export const addPatient = (newPatient: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: newPatient
  };
};

export const setDiagnosisList = (diagnosisListFromApi: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSIS_LIST",
    payload: diagnosisListFromApi
  };
};

export const addEntry = (newEntry: Entry, patient: Patient): Action => {
  return {
    type: "ADD_ENTRY",
    payload: {
      newEntry,
      patient
    }
  };
};

export const setPatient = (patient: Patient): Action => {
  return {
    type: "SET_PATIENT",
    payload: patient
  };
};

export const setEntryType = (type: string): Action => {
  return {
    type: "SET_ENTRY_TYPE",
    payload: type
  };
};
