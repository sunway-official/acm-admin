import React, { Component } from 'react';
import { Table, TableBody, TableRow, TableRowColumn } from 'material-ui/Table';
import ActionPermIdentity from 'material-ui/svg-icons/action/perm-identity';
import NotificationWC from 'material-ui/svg-icons/notification/wc';
import CommunicationMailOutline from 'material-ui/svg-icons/communication/mail-outline';
import SocialCake from 'material-ui/svg-icons/social/cake';
import './style.css';
import { RaisedButton } from 'material-ui';
import { DatePicker, ListItem } from 'material-ui';
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

const maxDate = new Date();
maxDate.setFullYear(
  maxDate.getFullYear(),
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
    this.state = { value: '1' };
    this.saveInfomation = this.saveInfomation.bind(this);
  }
  saveInfomation() {
    const {
      UPDATE_ME_MUTATION,
      firstname,
      lastname,
      email,
      gender,
      //dob,
      bio,
      linkedin_id,
      facebook_id,
      twitter_id,
    } = this.props;
    //console.log(this.props);
    UPDATE_ME_MUTATION({
      variables: {
        firstname: firstname,
        lastname: lastname,
        email: email,
        gender: gender,
        //dob: dob,
        bio: bio,
        linkedin_id: linkedin_id,
        facebook_id: facebook_id,
        twitter_id: twitter_id,
      },
    });
    window.alert('Update successful!');
  }
  handleChange = (event, index, value) => this.setState({ value });
  render() {
    //console.log(this.props.data);
    const { handleSubmit, submitting, pristine, invalid } = this.props;
    return (
      <div>
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
                  <Field
                    name="dob"
                    component={renderDatePicker}
                    format={null}
                    hintText="Birthday"
                    autoOk={true}
                    openToYearSelection={true}
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
                  />
                </TableRowColumn>
                <TableRowColumn className="second-column">
                  <Field
                    id="text-field-default"
                    name="bio"
                    type="text"
                    hintText="Short description"
                    component={CustomInput}
                    className="editField"
                    multiLine
                    rows={1}
                    rowsMax={1}
                  />
                </TableRowColumn>
                <TableRowColumn />
              </TableRow>
            </TableBody>
          </Table>
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
            />
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const me = ownProps.me;
  //console.log(me);
  return {
    initialValues: {
      firstname: me.firstname,
      lastname: me.lastname,
      email: me.email,
      gender: 'male',
      //dob: new Date(me.dob),
      bio: me.bio,
      linkedin_id: me.linkedin_id,
      facebook_id: me.facebook_id,
      twitter_id: me.twitter_id,
    },
  };
};

const selector = formValueSelector('EditablePersonalInfo');
EditablePersonalInfo = connect(state => {
  const firstname = selector(state, 'firstname');
  const lastname = selector(state, 'lastname');
  const email = selector(state, 'email');
  const gender = selector(state, 'gender');
  //const dob = selector(state, 'dob');
  const bio = selector(state, 'bio');
  const linkedin_id = selector(state, 'linkedin_id');
  const facebook_id = selector(state, 'facebook_id');
  const twitter_id = selector(state, 'twitter_id');
  return {
    firstname,
    lastname,
    email,
    gender,
    //dob,
    bio,
    linkedin_id,
    facebook_id,
    twitter_id,
  };
})(EditablePersonalInfo);

const UPDATE_ME_MUTATION = gql`
  mutation UpdateMe(
    $firstname: String!
    $lastname: String!
    $gender: Gender!
    $bio: String
    $linkedin_id: String
    $facebook_id: String
    $twitter_id: String
  ) {
    updateMe(
      firstname: $firstname
      lastname: $lastname
      gender: $gender
      bio: $bio
      linkedin_id: $linkedin_id
      facebook_id: $facebook_id
      twitter_id: $twitter_id
    ) {
      firstname
      lastname
      gender
      bio
      linkedin_id
      facebook_id
      twitter_id
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
