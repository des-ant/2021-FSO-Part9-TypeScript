import React from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";

import { apiBaseUrl } from "../constants";
import { Patient, Entry, EntryWithoutId } from "../types";
import { Header, Icon, Segment, Button } from 'semantic-ui-react';
import EntryDetails from '../Entry/EntryDetails';
import AddEntryModal from '../AddEntryModal';
import { useStateValue, addEntry } from "../state";

const PatientInfo = () => {
  const { id } = useParams<{ id: string }>();
  const [error, setError] = React.useState<string | undefined>();
  const [patient, setPatient] = React.useState<Patient | undefined>();
  const [{ diagnoses }, dispatch] = useStateValue();
  
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

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
    switch (gender){
      case 'male':
        return <Icon name='mars' />;
      case 'female':
        return <Icon name='venus' />;
      default:
        return <Icon name='genderless' />;
    }
  };

  const renderEntries = (entries: Entry[]) => {
    if (entries && entries.length) {
      return (
        <div>
          <h3>entries</h3>
          {entries.map(entry => (
            <div key={entry.id}>
              <EntryDetails entry={entry} diagnoses={Object.values(diagnoses)} />
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const submitNewEntry = async (values: EntryWithoutId) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addEntry(newEntry, patient));
      closeModal();
    } catch (e) {
      console.error(e.response?.data || 'Unknown Error');
      setError(e.response?.data?.error || 'Unknown error');
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
      {renderEntries(patient.entries)}
      <div style={{ marginTop: '15px' }}>
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
          diagnoses={Object.values(diagnoses)}
        />
        <Button onClick={() => openModal()}>Add New Entry</Button>
      </div>
    </div>
  );
};

export default PatientInfo;