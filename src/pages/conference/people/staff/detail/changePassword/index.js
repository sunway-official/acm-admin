import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { TextField, RaisedButton } from 'material-ui';
import './style.css';

const validate = values => {
  const errors = {};
  const requiredFields = ['oldPassword', 'newPassword', 'retypePassword'];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'This field is required';
    }
  });
  if (
    values.newPassword &&
    values.retypePassword &&
    values.newPassword !== values.retypePassword
  ) {
    errors.retypePassword = 'Password does not match!';
  }
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
    <div className="changePassCard" id="changePassContainer">
      <form onSubmit={handleSubmit}>
        <div className="changePassField">
          <Field
            name="oldPassword"
            type="password"
            component={renderField}
            label="Old Password"
          />
        </div>
        <div className="changePassField">
          <Field
            name="newPassword"
            type="password"
            component={renderField}
            label="New Password"
          />
        </div>
        <div className="changePassField">
          <Field
            name="retypePassword"
            type="password"
            component={renderField}
            label="Retype Password"
          />
        </div>
        <div className="buttonRow">
          <RaisedButton
            className="btn changePass"
            label="Save"
            disabled={submitting || invalid || pristine}
            primary={true}
          />
          <RaisedButton
            className="btn changePass"
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
