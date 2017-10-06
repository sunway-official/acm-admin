import React, { Component } from 'react';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import { TextField, DatePicker } from 'material-ui';
export const validate = values => {
  const fieldValues = {};
  const errors = {};
  const requiredFields = [...fieldValues];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  if (
    values.fieldValues &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.fieldValues)
  ) {
    errors.fieldValues = 'Invalid email address';
  }
  return errors;
};
const minDate = new Date();
export const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => <TextField errorText={touched && error} {...input} {...custom} />;

export const renderDatePicker = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <DatePicker
    minDate={minDate}
    errorText={touched && error}
    onChange={(e, val) => {
      return input.onChange(val);
    }}
    value={input.value}
    {...custom}
  />
);
