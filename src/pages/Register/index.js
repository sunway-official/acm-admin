import React from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import asyncValidate from './asyncValidate';
import RaisedButton from 'material-ui/RaisedButton';
import './style.css';

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
      errors[field] = 'Required!';
    }
  });
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address';
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
const Register = props => {
  const { handleSubmit, submitting } = props;
  return (
    <div className="register-body">
      <div className="card" id="form-container">
        <div className="card-content">
          <h1 id="register-title">Register</h1>
          <form onSubmit={handleSubmit}>
            <div className="fullname">
              <Field
                className="firstname"
                name="firstName"
                component={renderField}
                label="First Name"
              />
              <Field
                className="firstname"
                name="lastName"
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
                name="confirm-password"
                type="password"
                component={renderField}
                label="Confirm Password"
              />
            </div>
            <div>
              <RaisedButton
                className="btn register"
                disabled={submitting}
                type="submit"
                label="Create Account"
                labelPosition="before"
                primary={true}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default reduxForm({
  form: 'MaterialUiForm', // a unique identifier for this form
  validate,
  asyncValidate,
})(Register);
