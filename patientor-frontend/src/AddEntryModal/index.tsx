import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddEntryForm from './AddEntryForm';
import { Diagnosis, EntryWithoutId } from "../types";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryWithoutId) => void;
  error?: string;
  diagnoses: Diagnosis[];
  initialValues: EntryWithoutId;
  validate: (values: EntryWithoutId) => { [field: string]: string; };
}

const AddEntryModal = (
  { modalOpen,
    onClose,
    onSubmit,
    error,
    diagnoses,
    initialValues,
    validate
  }: Props
) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddEntryForm
        onSubmit={onSubmit}
        onCancel={onClose}
        diagnoses={diagnoses}
        initialValues={initialValues}
        validate={validate}
      />
    </Modal.Content>
  </Modal>
);

export default AddEntryModal;
