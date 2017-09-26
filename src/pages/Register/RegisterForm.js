import React from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import './style.css';

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const validate = values => {
  const errors = {};
  const requiredFields = [
    'firstname',
    'lastname',
    'email',
    'password',
    'confirmPassword',
  ];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'This field is required!';
    }
  });
  if (values.email && !EMAIL_REGEX.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (
    values.password &&
    values.confirmPassword &&
    values.password !== values.confirmPassword
  ) {
    errors.confirmPassword = 'Password does not match!';
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
    hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    type={type}
    {...input}
    {...custom}
    className={className}
  />
);

const RegisterForm = ({
  error,
  handleSubmit,
  submitting,
  onSubmit,
  invalid,
  pristine,
}) => (
  <form onSubmit={handleSubmit(onSubmit)}>
    <div className="fullname">
      <Field
        className="firstname"
        name="firstname"
        component={renderField}
        label="First Name"
      />
      <Field
        className="firstname"
        name="lastname"
        component={renderField}
        label="Last Name"
      />
    </div>
    <div className="fullname">
      <Field name="email" component={renderField} label="Email" />
    </div>
    <div className="fullname">
      <Field
        name="password"
        type="password"
        component={renderField}
        label="Password"
      />
    </div>
    <div className="fullname">
      <Field
        name="confirmPassword"
        type="password"
        component={renderField}
        label="Confirm Password"
      />
    </div>
    <div>
      <RaisedButton
        className="btn register"
        disabled={submitting || invalid || pristine}
        type="submit"
        label="Create Account"
        labelPosition="before"
        primary={true}
      />
    </div>
  </form>
);

export default reduxForm({
  form: 'RegisterForm',
  validate,
})(RegisterForm);
