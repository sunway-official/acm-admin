import './style.css';

import { RaisedButton } from 'material-ui';
import React, { Component } from 'react';
import { Col, Grid, Row } from 'react-flexbox-grid';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import validate from './validate';
import { renderField } from '../../../../../utils';
import { connect } from 'react-redux';
import { graphql, gql } from 'react-apollo';
import { withRouter } from 'react-router';
import { compose } from 'react-apollo';

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.savePassword = this.savePassword.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  handleCancel() {
    this.props.history.replace('/');
  }
  savePassword() {
    const { UPDATE_PASSWORD_MUTATION, oldPassword, newPassword } = this.props;
    UPDATE_PASSWORD_MUTATION({
      variables: {
        oldPassword: oldPassword,
        newPassword: newPassword,
      },
    });
    window.alert('Update successful!');
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
              </form>
            </Col>
          </Row>
          <div>
            <RaisedButton
              className="btn changePass"
              label="Save"
              disabled={submitting || invalid || pristine}
              primary={true}
              onClick={this.savePassword}
            />
            <RaisedButton
              className="btn changePass"
              label="Cancel"
              default={true}
              onClick={this.handleCancel}
            />
          </div>
        </Grid>
      </div>
    );
  }
}

ChangePassword = reduxForm({
  form: 'ChangePassword', // a unique identifier for this form
  validate,
})(ChangePassword);

const UPDATE_PASSWORD_MUTATION = gql`
  mutation UpdatePassword($oldPassword: String, $newPassword: String!) {
    updatePassword(oldPassword: $oldPassword, newPassword: $newPassword) {
      id
    }
  }
`;

const selector = formValueSelector('ChangePassword');
ChangePassword = connect(state => {
  const oldPassword = selector(state, 'oldPassword');
  const newPassword = selector(state, 'newPassword');
  return {
    oldPassword,
    newPassword,
  };
})(ChangePassword);

export default compose(
  withRouter,
  graphql(UPDATE_PASSWORD_MUTATION, {
    name: 'UPDATE_PASSWORD_MUTATION',
  }),
)(ChangePassword);
