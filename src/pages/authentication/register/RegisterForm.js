import React from 'react';
import { Field, reduxForm } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import validate from './validate';
import CustomInput from 'components/CustomInput';
import './RegisterForm.css';

const RegisterForm = ({
  error,
  handleSubmit,
  submitting,
  onSubmit,
  invalid,
  pristine,
}) => (
  <form onSubmit={handleSubmit(onSubmit)}>
    {error && <div className="error">{error}</div>}
    <div className="register-field">
      <Field
        className="subname reduxField"
        name="firstname"
        component={CustomInput}
        label="First Name"
      />
      <Field
        className="subname reduxField"
        name="lastname"
        component={CustomInput}
        label="Last Name"
      />
    </div>
    <div className="register-field">
      <Field
        name="email"
        component={CustomInput}
        label="Email"
        className="reduxField"
      />
    </div>
    <div className="register-field">
      <Field
        name="password"
        type="password"
        component={CustomInput}
        label="Password"
        className="reduxField"
      />
    </div>
    <div className="register-field">
      <Field
        name="confirmPassword"
        type="password"
        component={CustomInput}
        label="Confirm Password"
        className="reduxField"
      />
    </div>
    <div className="checkbox-row">
      <Field
        name="author"
        type="checkbox"
        component="input"
        id="register-checkbox"
      />
      <div>Become an author</div>
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
