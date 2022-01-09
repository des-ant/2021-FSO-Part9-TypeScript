import React from 'react';
import { Entry, Diagnosis } from '../types';
import { Card, Icon } from 'semantic-ui-react';
import { EntryDiagnosis } from '.';

export const OccupationalHealthcareEntry: React.FC<{
  entry: Entry,
  diagnoses: Diagnosis[]
}> = ({ entry, diagnoses }) => {
  if (entry.type !== 'OccupationalHealthcare') {
    return null;
  }

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          {entry.date}
          <Icon name='stethoscope' size='big' />
          {entry.employerName}
        </Card.Header>
        <Card.Description>
          <p><i>{entry.description}</i></p>
          <EntryDiagnosis
            diagnosisCodes={entry.diagnosisCodes}
            diagnoses={diagnoses}
          />
        </Card.Description>
      </Card.Content>
    </Card>
  );
};