import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { Field } from 'redux-form';

const renderSelectField = ({
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

const styles = {
  customWidth: {
    width: '100%',
  },
};

export default class SelectPoint extends Component {
  state = {
    value: null,
  };

  handleChange = (event, index, value) => this.setState({ value });

  render() {
    return (
      <div>
        <Field
          name={this.props.id}
          component={renderSelectField}
          label="Select point"
          style={styles.customWidth}
        >
          <MenuItem value={1.0} primaryText="1.0" />
          <MenuItem value={2.0} primaryText="2.0" />
          <MenuItem value={3.0} primaryText="3.0" />
          <MenuItem value={4.0} primaryText="4.0" />
          <MenuItem value={5.0} primaryText="5.0" />
        </Field>
      </div>
    );
  }
}
