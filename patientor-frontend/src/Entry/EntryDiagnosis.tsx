import React from 'react';
import { useStateValue } from "../state";
import { Diagnosis } from '../types';
import { List } from 'semantic-ui-react';

export const EntryDiagnosis: React.FC<{ diagnosisCodes: string[] | undefined }> = ({ diagnosisCodes }) => {
  const [{ diagnoses }] = useStateValue();

  if (!diagnosisCodes || !diagnosisCodes.length) {
    return null;
  }

  const DiagnosisItem: React.FC<{ diagnosisCode: string }> = ({ diagnosisCode }) => {
    const diagnosisMatch: Diagnosis | undefined = Object.values(diagnoses).find((diagnosis: Diagnosis) => diagnosis.code === diagnosisCode);

    if (!diagnosisMatch) {
      return null;
    }

    return (
      <List.Item as='li'>
        <b>{diagnosisMatch.code}</b> {diagnosisMatch.name}
      </List.Item>
    );
  };

  return (
    <List as='ul'>
      {diagnosisCodes.map(code => (
        <DiagnosisItem diagnosisCode={code} key={code} />
      ))}
    </List>
  );
};

