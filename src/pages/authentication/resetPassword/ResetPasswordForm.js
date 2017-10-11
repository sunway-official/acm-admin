import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { RaisedButton } from 'material-ui';

import { regex } from 'utils/';
import CustomInput from 'components/CustomInput';

const validate = values => {
  const errors = {};
  const requiredFields = ['password', 'passwordConfirm'];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'This field is required';
    }
  });
  if (!regex.passwordRegex.test(values.password)) {
    errors.password = 'Password is too weak!';
  }
  if (
    values.password &&
    values.passwordConfirm &&
    values.password !== values.passwordConfirm
  ) {
    errors.passwordConfirm = 'Password does not match!';
  }
  return errors;
};

const ResetPasswordForm = ({
  error,
  handleSubmit,
  submitting,
  onSubmit,
  invalid,
  pristine,
}) => (
  <form onSubmit={handleSubmit(onSubmit)}>
    <div className="forgot-field">
      <Field
        name="password"
        type="password"
        component={CustomInput}
        label="Password"
        className="reduxField"
      />
    </div>
    <div className="forgot-field">
      <Field
        name="passwordConfirm"
        type="password"
        component={CustomInput}
        label="Password Confirm"
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
  form: 'ResetPasswordForm',
  validate,
})(ResetPasswordForm);
