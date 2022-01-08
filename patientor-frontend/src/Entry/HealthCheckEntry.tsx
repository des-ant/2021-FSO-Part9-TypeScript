import React from 'react';
import { Entry } from '../types';
import { Card, Icon } from 'semantic-ui-react';
import { EntryDiagnosis } from '.';

export const HealthCheckEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
  if (entry.type !== 'HealthCheck') {
    return null;
  }

  const getHealthColor = (healthCheckRating: number) => {
    switch(healthCheckRating) {
      case 0:
        return <Icon name='heart' color='green' />;
      case 1:
        return <Icon name='heart' color='yellow' />;
      case 2:
        return <Icon name='heart' color='orange' />;
      case 3:
        return <Icon name='heart' color='red' />;
      default:
        return null;
    }
  };

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          {entry.date}
          <Icon name='user doctor' size='big' />
        </Card.Header>
        <Card.Description>
          <p><i>{entry.description}</i></p>
          {getHealthColor(entry.healthCheckRating)}
          <EntryDiagnosis diagnosisCodes={entry.diagnosisCodes} />
        </Card.Description>
      </Card.Content>
    </Card>
  );
};