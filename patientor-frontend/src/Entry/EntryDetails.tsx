import React from 'react';
import { Entry } from '../types';
import {
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry
} from '.';

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
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
      return <HealthCheckEntry entry={entry} />;
    case "Hospital":
      return <HospitalEntry entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntry entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;