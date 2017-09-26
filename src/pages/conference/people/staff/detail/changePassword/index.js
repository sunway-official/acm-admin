import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { TextField, RaisedButton } from 'material-ui';
import './style.scss';

const validate = values => {
  const errors = {};
  const requiredFields = ['old-password', 'new-password', 'retype-password'];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'This field is required';
    }
  });
  return errors;
};

const renderField = ({
  input,
  label,
  type,
  className,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    floatingLabelText={label}
    errorText={touched && error}
    type={type}
    {...input}
    {...custom}
    className={className}
  />
);
const ChangePassword = props => {
  const { handleSubmit, submitting, invalid, pristine } = props;
  return (
    <div className="change-pass-card" id="change-pass-container">
      <form onSubmit={handleSubmit}>
        <div className="change-pass-field">
          <Field
            name="old-password"
            type="password"
            component={renderField}
            label="Old Password"
          />
        </div>
        <div className="change-pass-field">
          <Field
            name="new-password"
            type="password"
            component={renderField}
            label="New Password"
          />
        </div>
        <div className="change-pass-field">
          <Field
            name="retype-password"
            type="password"
            component={renderField}
            label="Retype Password"
          />
        </div>
        <div>
          <RaisedButton
            className="btn change-pass"
            label="Save"
            disabled={submitting || invalid || pristine}
            primary={true}
          />
          <RaisedButton
            className="btn change-pass"
            label="Cancel"
            secondary={true}
          />
        </div>
      </form>
    </div>
  );
};

export default reduxForm({
  form: 'MaterialUiForm', // a unique identifier for this form
  validate,
})(ChangePassword);
