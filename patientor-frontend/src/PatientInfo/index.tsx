import React from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";

import { apiBaseUrl } from "../constants";
import { Patient, Entry, Diagnosis } from "../types";
import { Header, Icon, Segment } from 'semantic-ui-react';
import { useStateValue } from "../state";

const PatientInfo = () => {
  const { id } = useParams<{ id: string }>();
  const [error, setError] = React.useState<string | undefined>();
  const [patient, setPatient] = React.useState<Patient | undefined>();
  const [{ diagnoses }] = useStateValue();

  React.useEffect(() => {
    const getPatient = async () => {
      try {
        const { data: patientFound } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        setPatient(patientFound);
      } catch (e) {
        console.error(e.response?.data || 'Unknown Error');
        setError(e.response?.data || 'Unknown error');
      }
    };

    void getPatient();
  }, [patient]);

  if (!patient) {
    return (
      <div>
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        <Header as="h2">Patient not found</Header>
      </div>
    );
  }

  const getGenderIcon = (gender: string) => {
    if (gender === 'male') {
      return <Icon name='mars' />;
    } else if (gender === 'female') {
      return <Icon name='venus' />;
    } else {
      return <Icon name='genderless' />;
    }
  };

  const renderDiagnosis = (diagnosisCode: string) => {
    const diagnosisMatch: Diagnosis | undefined = Object.values(diagnoses).find((diagnosis: Diagnosis) => diagnosis.code === diagnosisCode);

    if (diagnosisMatch) {
      return (
        <p>
          {`${diagnosisMatch.code} ${diagnosisMatch.name}`}
        </p>
      );
    }
    return null;
  };

  const renderEntries = (entries: Entry[]) => {
    if (entries && entries.length) {
      return (
        <div>
          <h3>entries</h3>
          {entries.map(entry => (
            <p key={entry.id}>
              {entry.date} <i>{entry.description}</i>
              {entry.diagnosisCodes &&
              <ul>
                {entry.diagnosisCodes?.map(code => (
                  <li key={code}>
                    {renderDiagnosis(code)}
                  </li>
                ))}
              </ul>
              }
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="App">
      <Header as="h2">{patient.name} {getGenderIcon(patient.gender)}</Header>
      <p>
        ssn: {patient.ssn}
        <br />
        occupation: {patient.occupation}
      </p>
      {renderEntries(patient.entries)}
    </div>
  );
};

export default PatientInfo;