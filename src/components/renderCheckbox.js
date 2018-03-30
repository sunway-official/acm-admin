import React from 'react';
import { Checkbox } from 'material-ui';

const renderCheckbox = ({ input, label, ...custom }) => (
  <Checkbox
    {...input}
    {...custom}
    label={label}
    value={input.value}
    onCheck={(e, checked) => input.onChange(checked)}
    type="checkbox"
  />
);

export default renderCheckbox;
