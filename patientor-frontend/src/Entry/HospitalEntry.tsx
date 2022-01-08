import React from 'react';
import { Entry } from '../types';
import { Card, Icon } from 'semantic-ui-react';
import { EntryDiagnosis } from '.';

export const HospitalEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
  if (entry.type !== 'Hospital') {
    return null;
  }

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          {entry.date}
          <Icon name='hospital' size='big' />
        </Card.Header>
        <Card.Description>
          <p><i>{entry.description}</i></p>
          <EntryDiagnosis diagnosisCodes={entry.diagnosisCodes} />
        </Card.Description>
      </Card.Content>
    </Card>
  );
};