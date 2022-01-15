import React from "react";
import { Field } from "formik";
import { Form } from "semantic-ui-react";
import { BaseEntryWithoutId, EntryTypes, EntryWithoutId } from "../types";

// structure of a single option
export type EntryOption = {
  value: EntryTypes;
  label: string;
};

// props for select field component
type SelectFieldProps = {
  name: string;
  label: string;
  options: EntryOption[];
  // onChange: () => void;
};

export const SelectField = ({
  name,
  label,
  options,
  // onChange,
}: SelectFieldProps) => (
  <Form.Field>
    <label>{label}</label>
    <Field as="select" name={name} className="ui dropdown">
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label || option.value}
        </option>
      ))}
    </Field>
  </Form.Field>
);

const baseValues: BaseEntryWithoutId = {
  description: "",
  date: "",
  specialist: "",
  diagnosisCodes: [],
};

export const hospitalValues: EntryWithoutId = {
  ...baseValues,
  type: "Hospital",
  discharge: {
    date: "",
    criteria: ""
  }
};

export const occupationalHealthcare: EntryWithoutId = {
  ...baseValues,
  type: "OccupationalHealthcare",
  employerName: "",
  sickLeave: {
    startDate: "",
    endDate: ""
  }
};

export const healthCheckValues: EntryWithoutId = {
  ...baseValues,
  type: "HealthCheck",
  healthCheckRating: 0,
};

export const validateEntryValues = (values: EntryWithoutId) => {
  const requiredError = "Field is required";
  const errors: { [field: string]: string } = {};
  if (!values.description) {
    errors.description = requiredError;
  }
  if (!values.date) {
    errors.date = requiredError;
  }
  if (!values.specialist) {
    errors.specialist = requiredError;
  }
  if (!values.type) {
    errors.type = requiredError;
  }
  if ("healthCheckRating" in values && !values.healthCheckRating) {
    errors.healthCheckRating = requiredError;
  }
  return errors;
};