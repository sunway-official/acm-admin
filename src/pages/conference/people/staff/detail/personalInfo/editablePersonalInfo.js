import React, { Component } from 'react';
import ActionPermIdentity from 'material-ui/svg-icons/action/perm-identity';
import NotificationWC from 'material-ui/svg-icons/notification/wc';
import SocialCake from 'material-ui/svg-icons/social/cake';
import './style.css';
import { RaisedButton } from 'material-ui';
import { DatePicker, TextField, ListItem } from 'material-ui';
import ActionInfoOutline from 'material-ui/svg-icons/action/info-outline';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { compose, gql, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { Col, Grid, Row } from 'react-flexbox-grid';
import validate from './validate';

const renderField = ({
  input,
  className,
  label,
  type,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    errorText={touched && error}
    type={type}
    floatingLabelText={label}
    {...input}
    {...custom}
    className={className}
  />
);

const maxDate = new Date();
maxDate.setFullYear(
  maxDate.getFullYear() - 10,
  maxDate.getMonth(),
  maxDate.getDate() + 1,
);
const renderDatePicker = ({
  input,
  label,
  className,
  meta: { touched, error },
  ...custom
}) => (
  <DatePicker
    maxDate={maxDate}
    className={className}
    errorText={touched && error}
    onChange={(e, val) => {
      return input.onChange(val);
    }}
    value={input.value}
    {...custom}
  />
);
class EditablePersonalInfo extends Component {
  constructor(props) {
    super(props);
    this.saveInfomation = this.saveInfomation.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  handleCancel (){
    window.alert('This function has not implement yet');
  }
  saveInfomation() {
    const {
      UPDATE_ME_MUTATION,
      firstname,
      lastname,
      dob,
      gender,
      bio,
    } = this.props;
    UPDATE_ME_MUTATION({
      variables: {
        firstname: firstname,
        lastname: lastname,
        gender: gender,
        dob: dob,
        bio: bio,
      },
    });
    window.alert('Update successful!');
  }

  render() {
    const { handleSubmit, submitting, pristine, invalid } = this.props;
    return (
      <div>
        <Grid fluid>
          <Row>
            <Col xs={3}>
              <Row className="firstColunm firstRow">
                <ListItem
                  className="list-item"
                  primaryText="Name"
                  leftIcon={<ActionPermIdentity />}
                  disabled={true}
                />
              </Row>
              <Row className="firstColunm">
                <ListItem
                  className="list-item"
                  primaryText="Gender"
                  leftIcon={<NotificationWC />}
                  disabled={true}
                />
              </Row>
              <Row className="firstColunm">
                <ListItem
                  className="list-item"
                  primaryText="Birthday"
                  leftIcon={<SocialCake />}
                  disabled={true}
                />
              </Row>
              <Row className="firstColunm">
                <ListItem
                  className="list-item"
                  primaryText="Description"
                  leftIcon={<ActionInfoOutline />}
                  disabled={true}
                />
              </Row>
            </Col>
            <Col xs={8}>
              <form onSubmit={handleSubmit}>
                <Row className="secondColunm firstRow">
                  <Col xs>
                    <Field
                      id="text-field-default"
                      name="lastname"
                      type="text"
                      hintText="Last name"
                      component={renderField}
                      className="editField subname"
                      fullWidth={true}
                    />
                  </Col>
                  <Col xs>
                    <Field
                      id="text-field-default"
                      name="firstname"
                      type="text"
                      hintText="First name"
                      component={renderField}
                      className="editField subname"
                      fullWidth={true}
                    />
                  </Col>
                </Row>
                <Row className="secondColunm">
                  <Field name="gender" component="select" className="gender">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="unknown">Unknown</option>
                  </Field>
                </Row>
                <Row className="secondColunm">
                  <Field
                    name="dob"
                    component={renderDatePicker}
                    format={null}
                    hintText="Birthday"
                    openToYearSelection={true}
                    className="birthday"
                  />
                </Row>
                <Row className="secondColunm">
                  <Field
                    id="text-field-default"
                    name="bio"
                    type="text"
                    hintText="Description"
                    component={renderField}
                    multiLine
                    rows={1}
                    rowsMax={1}
                    fullWidth={true}
                  />
                </Row>
              </form>
            </Col>
          </Row>
          <div>
            <RaisedButton
              className="btn save-change"
              label="Save Change"
              primary={true}
              disabled={pristine || submitting || invalid}
              onClick={this.saveInfomation}
            />
            <RaisedButton
              className="btn cancel"
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

const mapStateToProps = (state, ownProps) => {
  const me = ownProps.me;
  return {
    initialValues: {
      firstname: me.firstname,
      lastname: me.lastname,
      gender: me.gender,
      dob: new Date(me.dob),
      bio: me.bio,
    },
  };
};

const selector = formValueSelector('EditablePersonalInfo');
EditablePersonalInfo = connect(state => {
  const firstname = selector(state, 'firstname');
  const lastname = selector(state, 'lastname');
  const gender = selector(state, 'gender');
  const dob = new Date(selector(state, 'dob'));
  dob.setHours(dob.getHours() + 7);
  const bio = selector(state, 'bio');
  return {
    firstname,
    lastname,
    gender,
    dob,
    bio,
  };
})(EditablePersonalInfo);

const UPDATE_ME_MUTATION = gql`
  mutation UpdateMe(
    $firstname: String!
    $lastname: String!
    $dob: Date
    $gender: Gender!
    $bio: String
  ) {
    updateMe(
      firstname: $firstname
      lastname: $lastname
      dob: $dob
      gender: $gender
      bio: $bio
    ) {
      firstname
      lastname
      dob
      gender
      bio
    }
  }
`;

EditablePersonalInfo = reduxForm({
  form: 'EditablePersonalInfo', // a unique identifier for this form
  validate,
})(EditablePersonalInfo);

export default compose(
  connect(mapStateToProps, undefined),
  graphql(UPDATE_ME_MUTATION, {
    name: 'UPDATE_ME_MUTATION',
  }),
)(EditablePersonalInfo);
