import React from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import './style.css';

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const validate = values => {
  const errors = {};
  const requiredFields = ['email', 'password'];
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

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <div>
      <TextField
        {...input}
        hintText={label}
        floatingLabelText={label}
        type={type}
      />
      {touched && error && <div> {error} </div>}
    </div>
  </div>
);

const LoginForm = ({
  error,
  handleSubmit,
  submitting,
  onSubmit,
  invalid,
  pristine,
}) => (
  <form onSubmit={handleSubmit(onSubmit)}>
    {/* TODO: Form helper here please! */}
    <Field
      className="field"
      name="email"
      type="text"
      component={renderField}
      label="Email"
    />
    <Field
      className="field"
      name="password"
      type="password"
      component={renderField}
      label="Password"
    />
    {error && <strong> {error} </strong>}
    <RaisedButton
      className="btn login"
      disabled={submitting || invalid || pristine}
      type="submit"
      label="Sign In"
      labelPosition="before"
      primary={true}
    />
  </form>
);

export default reduxForm({
  form: 'LoginForm', // a unique identifier for this form
  validate,
})(LoginForm);
