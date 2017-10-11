import './style.css';

import { RaisedButton } from 'material-ui';
import React from 'react';
import { Col, Grid, Row } from 'react-flexbox-grid';
import { Field, reduxForm } from 'redux-form';
import CustomInput from 'components/CustomInput';
import { regex } from '../../../../../../utils';

const validate = values => {
  const errors = {};
  const requiredFields = ['oldPassword', 'newPassword', 'retypePassword'];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'This field is required';
    }
    if (values[field] && !regex.passwordRegex.test(values[field])) {
      errors[field] =
        'Password must contains at least 6 character include number and special character';
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

const ChangePassword = props => {
  const { handleSubmit, submitting, invalid, pristine } = props;
  return (
    <div>
      <Grid fluid>
        <Row around="xs">
          <Col xs={3}>
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
                  component={CustomInput}
                  label="Old Password"
                />
              </Row>
              <Row className="changePass">
                <Field
                  name="newPassword"
                  type="password"
                  component={CustomInput}
                  label="New Password"
                />
              </Row>
              <Row className="changePass">
                <Field
                  name="retypePassword"
                  type="password"
                  component={CustomInput}
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
            default={true}
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
