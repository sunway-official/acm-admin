import './style.css';

import { RaisedButton } from 'material-ui';
<<<<<<< HEAD
import React, { Component } from 'react';
import { Col, Grid, Row } from 'react-flexbox-grid';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import validate from './validate';
import { renderField } from '../../../../../../utils';
import { connect } from 'react-redux';
=======
import React from 'react';
import { Col, Grid, Row } from 'react-flexbox-grid';
import { Field, reduxForm } from 'redux-form';
import CustomInput from 'components/CustomInput';
import { regex } from '../../../../../../utils';
>>>>>>> origin

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.savePassword = this.savePassword.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  handleCancel() {
    window.alert('This function has not implement yet');
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

<<<<<<< HEAD
const selector = formValueSelector('ChangePassword');
ChangePassword = connect(state => {
  const oldPassword = selector(state, 'oldPassword');
  const newPassword = selector(state, 'newPassword');
  return {
    oldPassword,
    newPassword,
  };
})(ChangePassword);
=======
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
>>>>>>> origin

export default graphql(UPDATE_PASSWORD_MUTATION, {
  name: 'UPDATE_PASSWORD_MUTATION',
})(ChangePassword);
