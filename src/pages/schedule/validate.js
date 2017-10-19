import React from 'react';
import { DatePicker, TimePicker, TextField, SelectField } from 'material-ui';

const currentDate = new Date();
const validate = values => {
  const errors = {};
  const ArrayErrors = [];
  const requiredFields = [
    'title',
    'description',
    'date',
    'room',
    'endTime',
    'startTime',
  ];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  if (values.endTime <= values.startTime) {
    alert('Wrong');
  }
  if (!values.schedules || !values.schedules.length) {
    errors.schedules = { _error: '.' };
  } else {
    values.schedules.forEach((schedule, memberIndex) => {
      if (!schedule || !schedule.date) {
        errors.date = 'Required';
        ArrayErrors[memberIndex] = errors;
      }
      if (!schedule || !schedule.room) {
        errors.room = 'Required';
        ArrayErrors[memberIndex] = errors;
      }
      if (!schedule || !schedule.startTime) {
        errors.startTime = 'Required';
        ArrayErrors[memberIndex] = errors;
      }
      if (!schedule || !schedule.endTime) {
        errors.endTime = 'Required';
        ArrayErrors[memberIndex] = errors;
      }
      if (schedule.endTime <= schedule.startTime) {
        alert('Wrong');
        // schedule.startTime = schedule.endTime;
      }
    });
    if (ArrayErrors.length) {
      errors.schedules = ArrayErrors;
    }
  }
  return errors;
};

export const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    errorText={touched && error}
    fullWidth={true}
    multiLine={true}
    rows={1}
    {...input}
    {...custom}
  />
);
export const renderSelectField = ({
  input,
  label,
  meta: { touched, error },
  children,
  ...custom
}) => (
  <SelectField
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    onChange={(event, index, value) => input.onChange(value)}
    children={children}
    {...custom}
  />
);
export const renderDatePicker = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <DatePicker
    minDate={currentDate}
    errorText={touched && error}
    onChange={(e, val) => {
      return input.onChange(val);
    }}
    value={input.value}
    {...custom}
  />
);
export const renderTimePicker = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <TimePicker
    minutesStep={5}
    errorText={touched && error}
    onChange={(e, val) => {
      return input.onChange(val);
    }}
    value={input.value}
    {...custom}
    autoOk={true}
  />
);
export default validate;
