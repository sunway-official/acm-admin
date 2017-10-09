import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { RaisedButton, AppBar } from 'material-ui';
import './style.css';
import { renderField } from '../../../utils';
import validate from './validate';

const Forgot = props => {
  const { handleSubmit, submitting, invalid } = props;
  return (
    <div className="forgot-body">
      <div className="forgot-card" id="forgot-form-container">
        <div className="card-content">
          <AppBar
            className="forgot-title"
            title="FORGOT PASSWORD"
            showMenuIconButton={false}
          />
          <form onSubmit={handleSubmit}>
            <div className="note">
              Please enter your email address and we'll sent you instructions on
              how to reset your password
            </div>
            <div className="forgot-field">
              <Field
                name="email"
                component={renderField}
                label="Email"
                className="reduxField"
              />
            </div>
            <div>
              <RaisedButton
                className="btn forgot"
                disabled={submitting || invalid }
                type="submit"
                label="Submit"
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
})(Forgot);
