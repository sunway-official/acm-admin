import React from 'react';
import { TextField, DatePicker } from 'material-ui';

const validate = values => {
  const errors = {};
  const requiredFields = [
    'address_id',
    'title',
    'description',
    'startDate',
    'endDate',
    'bg_image',
    'organizerAddress',
    'organizerName',
    'organizerWebsite',
    'organizerEmail',
    'organizerPhoneNumber',
  ];
  requiredFields.forEach(field => {
    if (values[field] == null) {
      errors[field] = 'Required';
    }
  });

  if (
    values.organizerEmail &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.organizerEmail)
  ) {
    errors.organizerEmail = 'Invalid email address';
  }

  if (
    values.address_id &&
    (isNaN(Number(values.address_id)) ||
      values.address_id < 0 ||
      values.address_id > 7)
  ) {
    errors.address_id = 'Invalid address id';
  }

  if (values.endDate < values.startDate) {
    errors.endDate = 'End date of conference must be greater than start date';
  }
  return errors;
};

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
    minDate={new Date()}
    errorText={touched && error}
    onChange={(e, val) => {
      return input.onChange(val);
    }}
    value={input.value}
    {...custom}
  />
);

export const minDate = new Date();
export const maxDate = new Date();
maxDate.setFullYear(
  maxDate.getFullYear(),
  maxDate.getMonth(),
  maxDate.getDate() + 1,
);

export default validate;
