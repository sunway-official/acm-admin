import React from 'react';
import { Field, reduxForm } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import './RegisterForm.css';
import validate from './validate';
import { renderField } from '../../../utils';

const RegisterForm = ({
  error,
  handleSubmit,
  submitting,
  onSubmit,
  invalid,
  pristine,
}) => (
  <form onSubmit={handleSubmit(onSubmit)}>
    <div className="register-field">
      <Field
        className="subname reduxField"
        name="firstName"
        component={renderField}
        label="First Name"
      />
      <Field
        className="subname reduxField"
        name="lastName"
        component={renderField}
        label="Last Name"
      />
    </div>
    <div className="register-field">
      <Field
        name="email"
        component={renderField}
        label="Email"
        className="reduxField"
      />
    </div>
    <div className="register-field">
      <Field
        name="password"
        type="password"
        component={renderField}
        label="Password"
        className="reduxField"
      />
    </div>
    <div className="register-field">
      <Field
        name="confirmPassword"
        type="password"
        component={renderField}
        label="Confirm Password"
        className="reduxField"
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
