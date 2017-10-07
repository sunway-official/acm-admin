import React from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import './formStyle.css';
import { regex } from '../../../utils';

const validate = values => {
  const errors = {};
  const requiredFields = ['email', 'password'];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'This field is required';
    }
  });
  if (values.email && !regex.EMAIL_REGEX.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (values.password && !regex.passwordRegex.test(values.password)) {
    errors.password =
      'Password must contains at least 6 character include number and special character ';
  }
  return errors;
};

const renderField = ({
  input,
  className,
  label,
  type,
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
    <div className="field">
      <Field
        name="email"
        type="text"
        component={renderField}
        label="Email"
        className="reduxField"
      />
    </div>
    <div className="field">
      <Field
        name="password"
        type="password"
        component={renderField}
        label="Password"
        className="reduxField"
      />
    </div>
    <div>
      <RaisedButton
        className="btn login"
        disabled={submitting || invalid || pristine}
        type="submit"
        label="Sign In"
        labelPosition="before"
        primary={true}
      />
    </div>
  </form>
);

export default reduxForm({
  form: 'LoginForm', // a unique identifier for this form
  validate,
})(LoginForm);
