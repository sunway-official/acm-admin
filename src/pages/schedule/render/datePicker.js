import React from 'react';
import { DatePicker } from 'material-ui';

export const renderDatePicker = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <DatePicker
    /* minDate={new Date()} */
    errorText={touched && error}
    onChange={(e, val) => {
      return input.onChange(val);
    }}
    value={input.value}
    {...custom}
  />
);

export default renderDatePicker;
