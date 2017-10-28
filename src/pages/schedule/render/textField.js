import React from 'react';
import { TextField } from 'material-ui';

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

export default renderTextField;
