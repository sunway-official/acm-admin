import React from 'react';
import { Field, reduxForm } from 'redux-form';
import submit from './submit';
import { TextField, RaisedButton, AppBar } from 'material-ui';
import './style.css';

const renderField = ({
  input,
  label,
  inputStyle,
  type,
  meta: { touched, error },
}) => (
  <div>
    <TextField
      {...input}
      floatingLabelText={label}
      type={type}
      errorText={touched && error}
    />
  </div>
);
const Login = props => {
  const { handleSubmit, submitting } = props;
  return (
    <div className="login-body">
      <div className="login-card" id="login-form-container">
        <AppBar
          className="login-title"
          title="SIGN IN"
          showMenuIconButton={false}
        />
        <div className="card-content">
          <form onSubmit={handleSubmit(submit)}>
            <div className="input">
              <Field
                name="email"
                type="text"
                component={renderField}
                label="Email"
              />
            </div>
            <div className="input">
              <Field
                name="password"
                type="password"
                component={renderField}
                label="Password"
              />
            </div>
            <RaisedButton
              className="btn login"
              disabled={submitting}
              type="submit"
              label="Sign In"
              labelPosition="before"
              primary={true}
            />
          </form>
          <div className="final-row">
            <a className="forgot-password" href="/forgot">
              Forgot Password
            </a>
            <a className="register" href="/register">
              Register
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default reduxForm({
  form: 'submitValidation', // a unique identifier for this form
})(Login);
