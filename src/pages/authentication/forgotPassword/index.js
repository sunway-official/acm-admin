import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { TextField, RaisedButton, AppBar } from 'material-ui';
import './style.css';
import { regex } from '../../../utils';

const validate = values => {
  const errors = {};
  const requiredFields = [
    'firstName',
    'lastName',
    'email',
    'password',
    'confirm-password',
  ];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'This field is required';
    }
  });
  if (values.email && !regex.EMAIL_REGEX.test(values.email)) {
    errors.email = 'Invalid email address';
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
const Forgot = props => {
  const { handleSubmit, submitting, invalid } = props;
  return (
    <div className="forgot-body">
      <div className="forgot-card" id="forgot-form-container">
        <div className="card-content">
          <AppBar
            className="forgot-title"
            title="FORGOT PASSWORD"
            showMenuIconButton={false}
          />
          <form onSubmit={handleSubmit}>
            <div className="note">
              Please enter your email address and we'll sent you instructions on
              how to reset your password
            </div>
            <div className="forgot-field">
              <Field
                name="email"
                component={renderField}
                label="Email"
                className="reduxField"
              />
            </div>
            <div>
              <RaisedButton
                className="btn forgot"
                disabled={submitting || invalid }
                type="submit"
                label="Submit"
                labelPosition="before"
                primary={true}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default reduxForm({
  form: 'MaterialUiForm', // a unique identifier for this form
  validate,
})(Forgot);
