import React from 'react';
import { Entry } from '../types';

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  /**
   * Helper function for exhaustive type checking
   */
   const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch(entry.type) {
    case "HealthCheck":
      return (
        <div>
          <h3>{entry.date} {entry.type}</h3>
          <p><i>{entry.description}</i></p>
          {entry.healthCheckRating}
        </div>
      );
    case "Hospital":
      return (
        <div>
          <h3>{entry.date} {entry.type}</h3>
          <p><i>{entry.description}</i></p>
        </div>
      );
    case "OccupationalHealthcare":
      return (
        <div>
          <h3>{entry.date} {entry.type} {entry.employerName}</h3>
          <p><i>{entry.description}</i></p>
        </div>
      );
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;