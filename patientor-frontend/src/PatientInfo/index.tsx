import React from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";

import { apiBaseUrl } from "../constants";
import { Patient, Entry, EntryWithoutId, EntryTypes } from "../types";
import { Header, Icon, Segment, Button } from 'semantic-ui-react';
import EntryDetails from '../Entry/EntryDetails';
import AddEntryModal from '../AddEntryModal';
import { useStateValue, addEntry, setPatient, setEntryType } from "../state";
import {
  hospitalValues,
  occupationalHealthcareValues,
  healthCheckValues,
  validateEntryValues,
  EntryOption,
  SelectField
} from '../AddEntryModal/FormField';
import { Form, Formik } from 'formik';

const entryOptions: EntryOption[] = [
  { value: EntryTypes.HospitalEntry, label: "Hospital" },
  { value: EntryTypes.OccupationalHealthcareEntry, label: "OccupationalHealthcare" },
  { value: EntryTypes.HealthCheckEntry, label: "HealthCheck" }
];

const PatientInfo = () => {
  const { id } = useParams<{ id: string }>();
  const [error, setError] = React.useState<string | undefined>();
  const [{ diagnoses, patient, entryType }, dispatch] = useStateValue();
  
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
        dispatch(setPatient(patientFound));
      } catch (e) {
        console.error(e);
      }
    };
    void getPatient();
  }, [dispatch]);

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
      dispatch(addEntry(newEntry, Object.values(patient)[0]));
      closeModal();
    } catch (e) {
      console.error(e.response?.data || 'Unknown Error');
      setError(e.response?.data || 'Unknown error');
    }
  };

  const submitEntryType = (values: {
    type: string
  }) => {
    dispatch(setEntryType(values.type));
    openModal();
  };

  const getInitialValues = () => {
    switch (entryType) {
      case "Hospital":
        return hospitalValues;
      case "OccupationalHealthcare":
        return occupationalHealthcareValues;
      case "HealthCheck":
        return healthCheckValues;
      default:
        return hospitalValues;
    }
  };

  return (
    <div className="App">
      {Object.values(patient).map((p: Patient) => (
        <div key={p.id}>
          <Header as="h2">{p.name} {getGenderIcon(p.gender)}</Header>
          <p>
            ssn: {p.ssn}
            <br />
            occupation: {p.occupation}
          </p>
          {renderEntries(p.entries)}
        </div>
      ))}
      <div style={{ marginTop: '14px' }}>
        {validateEntryValues !== undefined && 
          <AddEntryModal
            modalOpen={modalOpen}
            onSubmit={submitNewEntry}
            error={error}
            onClose={closeModal}
            diagnoses={Object.values(diagnoses)}
            initialValues={getInitialValues()}
            validate={validateEntryValues}
          />
        }
        <Formik
          initialValues={{
            type: "Hospital"
          }}
          onSubmit={submitEntryType}
          // validate={values => {
          //   const requiredError = "Field is required";
          //   const errors: { [field: string]: string } = {};
          //   if (!values.type) {
          //     errors.type = requiredError;
          //   }
          //   return errors;
          // }}
        >
          <Form className="form ui" style={{ marginTop: '28px' }}>
            <h3>Add New Entry</h3>
            <SelectField
              label="Entry Type"
              name="type"
              options={entryOptions}
            />
            <Button type="submit">Add New Entry</Button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default PatientInfo;