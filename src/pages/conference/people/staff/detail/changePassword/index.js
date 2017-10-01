import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { TextField, RaisedButton } from 'material-ui';
import './style.css';
import { Grid, Row, Col } from 'react-flexbox-grid';

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
              <Row className="buttonRow">
                <Col xsOffset={3} xs={3}>
                  <RaisedButton
                    className="btn changePass"
                    label="Save"
                    disabled={submitting || invalid || pristine}
                    primary={true}
                  />
                </Col>
                <Col xs={4}>
                  <RaisedButton
                    className="btn changePass"
                    label="Cancel"
                    secondary={true}
                  />
                </Col>
              </Row>
            </form>
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default reduxForm({
  form: 'MaterialUiForm', // a unique identifier for this form
  validate,
})(ChangePassword);
