import './style.css';

import { RaisedButton } from 'material-ui';
import React, { Component } from 'react';
import { Col, Grid, Row } from 'react-flexbox-grid';
import { Field, reduxForm } from 'redux-form';
import validate from './validate';
import { renderField } from '../../../../../utils';
import { withRouter } from 'react-router';
import { compose } from 'react-apollo';

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.handleCancel = this.handleCancel.bind(this);
  }
  handleCancel() {
    this.props.history.replace('/');
  }
  render() {
    const { handleSubmit, submitting, invalid, pristine } = this.props;
    return (
      <div>
        <Grid fluid>
          <Row around="xs">
            <Col xs={3}>
              <Row className="colunm old"> Old Password </Row>
              <Row className="colunm"> New Password </Row>
              <Row className="colunm"> Confirm Password </Row>
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
                    name="confirmPassword"
                    type="password"
                    component={renderField}
                    label="Confirm Password"
                    fullWidth={true}
                  />
                </Row>
                <div className="change-password-button">
                  <RaisedButton
                    className="btn changePass"
                    label="Save"
                    disabled={submitting || invalid || pristine}
                    primary={true}
                    type="submit"
                  />
                  <RaisedButton
                    className="btn changePass"
                    label="Cancel"
                    default={true}
                    onClick={this.handleCancel}
                  />
                </div>
              </form>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

ChangePassword = reduxForm({
  form: 'ChangePassword', // a unique identifier for this form
  validate,
})(ChangePassword);

export default compose(withRouter)(ChangePassword);
