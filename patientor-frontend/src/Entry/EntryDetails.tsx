import React from 'react';
import { Entry, Diagnosis } from '../types';
import {
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry
} from '.';

const EntryDetails: React.FC<{
  entry: Entry,
  diagnoses: Diagnosis[]
}> = ({ entry, diagnoses }) => {
  /**
   * Helper function for exhaustive type checking
   */
   const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheckEntry entry={entry} diagnoses={diagnoses} />;
    case "Hospital":
      return <HospitalEntry entry={entry} diagnoses={diagnoses} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntry entry={entry} diagnoses={diagnoses} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;