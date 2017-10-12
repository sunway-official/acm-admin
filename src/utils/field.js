import React from 'react';
import { TextField } from 'material-ui';

const renderField = ({
  input,
  className,
  label,
  type,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    errorText={touched && error}
    type={type}
    floatingLabelText={label}
    {...input}
    {...custom}
    className={className}
  />
);
export default renderField;
