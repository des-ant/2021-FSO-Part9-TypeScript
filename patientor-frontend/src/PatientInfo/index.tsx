import React from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";

import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
import { Header, Segment } from 'semantic-ui-react';
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
        // console.log(patientFound.name);
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

  return (
    <div className="App">
      <Header as="h2">{patient.name}</Header>
      <p>
        ssn: {patient.ssn}
        <br />
        occupation: {patient.occupation}
      </p>
    </div>
  );
};

export default PatientInfo;