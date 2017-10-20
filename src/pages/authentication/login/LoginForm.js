import React from 'react';
import { Field, reduxForm } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import CustomInput from 'components/CustomInput';
import './formStyle.css';
import validate from './validate';

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
    {error && <div className="error">{error}</div>}
    <div className="field">
      <Field
        name="email"
        type="text"
        component={CustomInput}
        label="Email"
        className="reduxField"
      />
    </div>
    <div className="field">
      <Field
        name="password"
        type="password"
        component={CustomInput}
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
