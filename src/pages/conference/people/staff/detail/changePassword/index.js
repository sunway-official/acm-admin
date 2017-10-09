import './style.css';

import { RaisedButton } from 'material-ui';
import React from 'react';
import { Col, Grid, Row } from 'react-flexbox-grid';
import { Field, reduxForm } from 'redux-form';
import validate from './validate';
import { renderField } from '../../../../../../utils';

const ChangePassword = props => {
  const { handleSubmit, submitting, invalid, pristine } = props;
  return (
    <div>
      <Grid fluid>
        <Row around="xs">
          <Col xs={3}>
            <Row className="colunm old"> Old Password </Row>
            <Row className="colunm"> New Password </Row>
            <Row className="colunm"> Retype Password </Row>
          </Col>
          <Col xs={8}>
            <form onSubmit={handleSubmit}>
              <Row className="changePass">
                <Field
                  name="oldPassword"
                  type="password"
                  component={renderField}
                  label="Old Password"
                  fullWidth={true}
                />
              </Row>
              <Row className="changePass">
                <Field
                  name="newPassword"
                  type="password"
                  component={renderField}
                  label="New Password"
                  fullWidth={true}
                />
              </Row>
              <Row className="changePass">
                <Field
                  name="retypePassword"
                  type="password"
                  component={renderField}
                  label="Retype Password"
                  fullWidth={true}
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
