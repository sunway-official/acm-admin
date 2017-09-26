import React from 'react';
import { Field, reduxForm } from 'redux-form';
import asyncValidate from './asyncValidate';
import { TextField, RaisedButton, AppBar } from 'material-ui';
import './style.css';

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
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
  if (values.email && !EMAIL_REGEX.test(values.email)) {
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
const Register = props => {
  const { handleSubmit, submitting } = props;
  return (
    <div className="register-body">
      <div className="register-card" id="register-form-container">
        <div className="card-content">
          <AppBar
            className="register-title"
            title="REGISTER"
            showMenuIconButton={false}
          />
          <form onSubmit={handleSubmit}>
            <div className="register-field">
              <Field
                className="firstname"
                name="firstName"
                component={renderField}
                label="First Name"
              />
              <Field
                className="firstname"
                name="lastName"
                component={renderField}
                label="Last Name"
              />
            </div>
            <div className="register-field">
              <Field name="email" component={renderField} label="Email" />
            </div>
            <div className="register-field">
              <Field
                name="password"
                type="password"
                component={renderField}
                label="Password"
              />
            </div>
            <div className="register-field">
              <Field
                name="confirm-password"
                type="password"
                component={renderField}
                label="Confirm Password"
              />
            </div>
            <div>
              <RaisedButton
                className="btn register"
                disabled={submitting}
                type="submit"
                label="Create Account"
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
  asyncValidate,
})(Register);
