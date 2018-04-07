import React from 'react';
import DatePicker from 'material-ui/DatePicker';

const CustomDatePicker = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <DatePicker
    mode="landscape"
    errorText={touched && error}
    onChange={(e, val) => {
      return input.onChange(val);
    }}
    value={input.value}
    {...custom}
  />
);

export default CustomDatePicker;
