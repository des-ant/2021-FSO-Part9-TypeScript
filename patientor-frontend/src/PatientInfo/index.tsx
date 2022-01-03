import React from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";

import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
import { Header, Icon, Segment } from 'semantic-ui-react';
// import { useStateValue } from "../state";

const PatientInfo = () => {
  const { id } = useParams<{ id: string }>();
  const [error, setError] = React.useState<string | undefined>();
  const [patient, setPatient] = React.useState<Patient | undefined>();

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

  return (
    <div className="App">
      <Header as="h2">{patient.name} {getGenderIcon(patient.gender)}</Header>
      <p>
        ssn: {patient.ssn}
        <br />
        occupation: {patient.occupation}
      </p>
    </div>
  );
};

export default PatientInfo;