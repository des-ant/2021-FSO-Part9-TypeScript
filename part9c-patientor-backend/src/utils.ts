import {
  NewPatient,
  Gender,
  EntryWithoutId,
  Diagnosis,
  HealthCheckRating,
  Discharge,
  SickLeave,
  NewBaseEntry,
} from "./types";
import diagnoses from "../data/diagnoses";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if(!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseSSN = (ssn: unknown): string => {
  if(!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing SSN');
  }
  return ssn;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }
  return occupation;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewPatient = (object: any): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSSN(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: [],
  };

  return newPatient;
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing description');
  }
  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist');
  }
  return specialist;
};

const parseDiagnosisCodes = (diagnosisCodes: unknown): Array<Diagnosis['code']> => {
  if (!diagnosisCodes || !Array.isArray(diagnosisCodes)) {
    throw new Error('Incorrect or missing diagnosis codes');
  }

  diagnosisCodes.forEach(dC => {
    if (!diagnoses.some(d => d.code === dC)) {
      throw new Error('Invalid diagnosis code[s]');
    }
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return diagnosisCodes;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthRating = (param: any): param is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthRating = (healthRating: unknown): HealthCheckRating => {
  if (!healthRating || !isHealthRating(healthRating)) {
    throw new Error('Incorrect or missing health check rating: ' + healthRating);
  }
  return healthRating;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDischarge = (param: any): param is Discharge => {
  if (!param || !param.date || !param.criteria ||
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    !isDate(param.date) || !isString(param.criteria)) {
    return false;
  }
  return true;
};

const parseDischarge = (discharge: object): Discharge => {
  if (!isDischarge(discharge)) {
    throw new Error('Incorrect or missing discharge');
  }
  return discharge;
};

const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error('Incorrect or missing employer name');
  }
  return employerName;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isSickLeave = (param: any): param is SickLeave => {
  if (!param || !param.startDate || !param.endDate ||
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    !isDate(param.startDate) || !isDate(param.endDate)) {
    return false;
  }
  return true;
};

const parseSickLeave = (sickLeave: object): SickLeave => {
  if (!isSickLeave(sickLeave)) {
    throw new Error('Incorrect or missing sick leave');
  }
  return sickLeave;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewEntry = (object: any): EntryWithoutId | undefined => {
  let newBaseEntry: NewBaseEntry = {
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
  };

  if (object.diagnosisCodes) {
    newBaseEntry = {
      ...newBaseEntry,
      diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
    };
  }

  let newEntry: EntryWithoutId;

  switch (object.type) {
    case "HealthCheck":
      return {
        ...newBaseEntry,
        type: "HealthCheck",
        healthCheckRating: parseHealthRating(object.healthCheckRating)
      };
    case "Hospital":
      return {
        ...newBaseEntry,
        type: "Hospital",
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        discharge: parseDischarge(object.discharge)
      };
    case "OccupationalHealthcare":
      newEntry = {
        ...newBaseEntry,
        type: "OccupationalHealthcare",
        employerName: parseEmployerName(object.employerName)
      };
      if (object.sickLeave) {
        newEntry = {
          ...newEntry,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          sickLeave: parseSickLeave(object.sickLeave)
        };
      }
      return newEntry;
    default:
      return undefined;
  }
};