import React, { Component } from 'react';
import { SelectField, MenuItem, RaisedButton } from 'material-ui';
import { Field, reduxForm } from 'redux-form';

const roles = ['Moderator', 'Supporter', 'Ticket Checker'];

const validate = values => {
  const errors = {};
  const requiredFields = ['role'];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  return errors;
};
const renderSelectField = ({
  input,
  label,
  meta: { touched, error },
  children,
  ...custom
}) => (
  <SelectField
    floatingLabelText={label}
    multiple={true}
    errorText={touched && error}
    {...input}
    onChange={(event, index, value) => input.onChange(value)}
    children={children}
    {...custom}
  />
);
class RolesInfo extends Component {
  state = {
    values: [],
  };
  handleChange = (event, index, values) => this.setState({ values });
  menuItems(values) {
    return roles.map(role => (
      <MenuItem
        key={role}
        insetChildren={true}
        checked={values && values.indexOf(role) > -1}
        value={role}
        primaryText={role}
      />
    ));
  }
  render() {
    const { submitting, handleSubmit, pristine } = this.props;
    const { values } = this.state;
    console.log(values);
    return (
      <form onSubmit={handleSubmit}>
        <Field
          name="role"
          component={renderSelectField}
          onChange={this.handleChange}
        >
          {this.menuItems(values)}
        </Field>
        <RaisedButton
          type="submit"
          disabled={pristine || submitting}
          label="save"
        />
      </form>
    );
  }
}

export default reduxForm({
  form: 'RolesInfo',
  validate,
})(RolesInfo);
