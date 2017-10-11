import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { RaisedButton } from 'material-ui';

import { regex } from 'utils/';
import CustomInput from 'components/CustomInput';

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

const ForgotPasswordForm = ({
  error,
  handleSubmit,
  submitting,
  onSubmit,
  invalid,
  pristine,
}) => (
  <form onSubmit={handleSubmit(onSubmit)}>
    <div className="note">
      Please enter your email address and we'll sent you instructions on how to
      reset your password
    </div>
    <div className="forgot-field">
      <Field
        name="email"
        component={CustomInput}
        label="Email"
        className="reduxField"
      />
    </div>
    <div>
      <RaisedButton
        className="btn forgot"
        disabled={pristine || submitting || invalid}
        type="submit"
        label="Submit"
        labelPosition="before"
        primary={true}
      />
    </div>
  </form>
);

export default reduxForm({
  form: 'ForgotPasswordForm',
  validate,
})(ForgotPasswordForm);
