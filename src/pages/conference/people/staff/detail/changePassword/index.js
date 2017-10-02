import './style.css';

import { RaisedButton, TextField } from 'material-ui';
import React from 'react';
import { Col, Grid, Row } from 'react-flexbox-grid';
import { Field, reduxForm } from 'redux-form';

const validate = values => {
  const errors = {};
  const requiredFields = ['oldPassword', 'newPassword', 'retypePassword'];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'This field is required';
    }
  });
  if (
    values.newPassword &&
    values.retypePassword &&
    values.newPassword !== values.retypePassword
  ) {
    errors.retypePassword = 'Password does not match!';
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
    floatingLabelText={label}
    errorText={touched && error}
    type={type}
    {...input}
    {...custom}
    className={className}
    fullWidth={true}
  />
);
const ChangePassword = props => {
  const { handleSubmit, submitting, invalid, pristine } = props;
  return (
    <div>
      <Grid fluid>
        <Row around="xs">
          <Col xs={2}>
            <Row className="firstColunm old"> Old Password </Row>
            <Row className="firstColunm"> New Password </Row>
            <Row className="firstColunm"> Retype Password </Row>
          </Col>
          <Col xs={8}>
            <form onSubmit={handleSubmit}>
              <Row className="changePass">
                <Field
                  name="oldPassword"
                  type="password"
                  component={renderField}
                  label="Old Password"
                />
              </Row>
              <Row className="changePass">
                <Field
                  name="newPassword"
                  type="password"
                  component={renderField}
                  label="New Password"
                />
              </Row>
              <Row className="changePass">
                <Field
                  name="retypePassword"
                  type="password"
                  component={renderField}
                  label="Retype Password"
                />
              </Row>
            </form>
          </Col>
        </Row>
        <div>
          <RaisedButton
            className="btn changePass"
            label="Save"
            disabled={submitting || invalid || pristine}
            primary={true}
          />
          <RaisedButton
            className="btn changePass"
            label="Cancel"
            secondary={true}
          />
        </div>
      </Grid>
    </div>
  );
};

export default reduxForm({
  form: 'MaterialUiForm', // a unique identifier for this form
  validate,
})(ChangePassword);
