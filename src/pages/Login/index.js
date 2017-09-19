import React from 'react';
import { Field, reduxForm } from 'redux-form';
import submit from './submit';
import TextField from 'material-ui/TextField';
import './style.css';
import RaisedButton from 'material-ui/RaisedButton';

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
const Login = props => {
  const { error, handleSubmit, submitting } = props;
  return (
    <div className="login-body">
      <div className="card" id="form-container">
        <div className="card-content">
          <h1 id="login-title">Login</h1>
          <form onSubmit={handleSubmit(submit)}>
            <Field
              className="vinh"
              name="username"
              type="text"
              component={renderField}
              label="Username"
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
              disabled={submitting}
              type="submit"
              label="Sign In"
              labelPosition="before"
              primary={true}
            />
          </form>
          <div className="final-row">
            <a className="forgot-password" href="/">
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
