import React, { Component } from 'react';
import ActionPermIdentity from 'material-ui/svg-icons/action/perm-identity';
import NotificationWC from 'material-ui/svg-icons/notification/wc';
import SocialCake from 'material-ui/svg-icons/social/cake';
import './style.css';
import { RaisedButton } from 'material-ui';
import { DatePicker, ListItem } from 'material-ui';
<<<<<<< HEAD
import ActionInfoOutline from 'material-ui/svg-icons/action/info-outline';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { compose, gql, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { Col, Grid, Row } from 'react-flexbox-grid';
import validate from './validate';
import { renderField } from '../../../../../../utils';
=======
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import ActionInfoOutline from 'material-ui/svg-icons/action/info-outline';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { regex } from '../../../../../../utils';
import CustomInput from 'components/CustomInput';
import { compose, gql, graphql } from 'react-apollo';
import { connect } from 'react-redux';

const validate = values => {
  const errors = {};
  const requiredFields = [
    'email',
    'firstname',
    'lastname',
    'facebook_id',
    'twitter_id',
    'linkedin_id',
    'bio',
  ];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'This field is required';
    }
  });
  if (values.email && !regex.EMAIL_REGEX.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  return errors;
};
>>>>>>> origin

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
<<<<<<< HEAD
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
=======
        <form onSubmit={handleSubmit}>
          <Table selectable={false}>
            <TableBody
              displayRowCheckbox={false}
              deselectOnClickaway={false}
              showRowHover={true}
              stripedRows={false}
            >
              <TableRow>
                <TableRowColumn className="first-column">
                  <ListItem
                    className="list-item"
                    primaryText="Name"
                    leftIcon={<ActionPermIdentity />}
                    disabled={true}
                  />
                </TableRowColumn>
                <TableRowColumn className="second-column">
                  <Field
                    id="text-field-default"
                    name="lastname"
                    type="text"
                    hintText="Last name"
                    component={CustomInput}
                    className="editField subname"
                  />
                  <Field
                    id="text-field-default"
                    name="firstname"
                    type="text"
                    hintText="First name"
                    component={CustomInput}
                    className="editField subname"
                  />
                </TableRowColumn>
                <TableRowColumn />
              </TableRow>
              <TableRow>
                <TableRowColumn className="first-column">
                  <ListItem
                    className="list-item"
                    primaryText="Gender"
                    leftIcon={<NotificationWC />}
                    disabled={true}
                  />
                </TableRowColumn>
                <TableRowColumn className="second-column">
                  <RadioButtonGroup
                    name="shipSpeed"
                    defaultSelected="male"
                    className="radio gender"
                  >
                    <RadioButton value="male" label="Male" className="male" />
                    <RadioButton
                      value="female"
                      label="Female"
                      className="female"
                    />
                  </RadioButtonGroup>
                </TableRowColumn>
                <TableRowColumn />
              </TableRow>
              <TableRow>
                <TableRowColumn className="first-column">
                  <ListItem
                    className="list-item"
                    primaryText="Email"
                    leftIcon={<CommunicationMailOutline />}
                    disabled={true}
                  />
                </TableRowColumn>
                <TableRowColumn className="second-column">
                  <Field
                    id="text-field-default"
                    name="email"
                    type="text"
                    component={CustomInput}
                    hintText="Email"
                    className="editField"
                  />
                </TableRowColumn>
                <TableRowColumn />
              </TableRow>
              <TableRow>
                <TableRowColumn className="first-column">
                  <ListItem
                    className="list-item"
                    primaryText="Birthday"
                    leftIcon={<SocialCake />}
                    disabled={true}
                  />
                </TableRowColumn>
                <TableRowColumn className="second-column">
>>>>>>> origin
                  <Field
                    name="dob"
                    component={renderDatePicker}
                    format={null}
                    hintText="Birthday"
                    openToYearSelection={true}
<<<<<<< HEAD
                    className="birthday"
=======
                    className="editField"
                  />
                </TableRowColumn>
                <TableRowColumn />
              </TableRow>
              <TableRow>
                <TableRowColumn className="first-column">
                  <ListItem
                    className="list-item"
                    primaryText="Facebook"
                    leftIcon={
                      <i
                        className="fa fa-facebook-square fa-lg"
                        aria-hidden="true"
                      />
                    }
                    disabled={true}
                  />
                </TableRowColumn>
                <TableRowColumn className="second-column">
                  <Field
                    id="text-field-default"
                    name="facebook_id"
                    type="text"
                    hintText="Facebook link"
                    component={CustomInput}
                    className="editField"
                  />
                </TableRowColumn>
                <TableRowColumn />
              </TableRow>
              <TableRow>
                <TableRowColumn className="first-column">
                  <ListItem
                    className="list-item"
                    primaryText="Twitter"
                    leftIcon={
                      <i
                        className="fa fa-twitter-square fa-lg"
                        aria-hidden="true"
                      />
                    }
                    disabled={true}
                  />
                </TableRowColumn>
                <TableRowColumn className="second-column">
                  <Field
                    id="text-field-default"
                    name="twitter_id"
                    type="text"
                    hintText="Twitter link"
                    component={CustomInput}
                    className="editField"
                  />
                </TableRowColumn>
                <TableRowColumn />
              </TableRow>
              <TableRow>
                <TableRowColumn className="first-column">
                  <ListItem
                    className="list-item"
                    primaryText="LinkedIn"
                    leftIcon={
                      <i
                        className="fa fa-linkedin-square fa-lg"
                        aria-hidden="true"
                      />
                    }
                    disabled={true}
                  />
                </TableRowColumn>
                <TableRowColumn className="second-column">
                  <Field
                    id="text-field-default"
                    name="linkedin_id"
                    type="text"
                    hintText="LinkedIn link"
                    component={CustomInput}
                    className="editField"
                  />
                </TableRowColumn>
                <TableRowColumn />
              </TableRow>
              <TableRow>
                <TableRowColumn className="first-column">
                  <ListItem
                    className="list-item"
                    primaryText="More Info"
                    leftIcon={<ActionInfoOutline />}
                    disabled={true}
>>>>>>> origin
                  />
                </Row>
                <Row className="secondColunm">
                  <Field
                    id="text-field-default"
                    name="bio"
                    type="text"
<<<<<<< HEAD
                    hintText="Description"
                    component={renderField}
=======
                    hintText="Short description"
                    component={CustomInput}
                    className="editField"
>>>>>>> origin
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
