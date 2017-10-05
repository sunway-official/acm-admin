import React, { Component } from 'react';
import { Table, TableBody, TableRow, TableRowColumn } from 'material-ui/Table';
import ActionPermIdentity from 'material-ui/svg-icons/action/perm-identity';
import NotificationWC from 'material-ui/svg-icons/notification/wc';
import CommunicationMailOutline from 'material-ui/svg-icons/communication/mail-outline';
import SocialCake from 'material-ui/svg-icons/social/cake';
import './style.css';
import { RaisedButton } from 'material-ui';
import { DatePicker, TextField, ListItem } from 'material-ui';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import ActionInfoOutline from 'material-ui/svg-icons/action/info-outline';
import { Field, reduxForm } from 'redux-form';
import { regex } from '../../../../../../utils';

const validate = values => {
  const errors = {};
  const requiredFields = [
    'email',
    'firstname',
    'facebook',
    'twitter',
    'linkedin',
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

const renderField = ({
  input,
  className,
  label,
  value,
  type,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    errorText={touched && error}
    type={type}
    floatingLabelText={label}
    value={input.value}
    {...input}
    {...custom}
    className={className}
  />
);

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
                    name="firstname"
                    type="text"
                    hintText="First name"
                    component={renderField}
                    className="editField"
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
                    component={renderField}
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
                    name="birthday"
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
                    name="facebook"
                    type="text"
                    hintText="Facebook link"
                    component={renderField}
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
                    name="twitter"
                    type="text"
                    hintText="Twitter link"
                    component={renderField}
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
                    name="linkedin"
                    type="text"
                    hintText="LinkedIn link"
                    component={renderField}
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
                    component={renderField}
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

export default reduxForm({
  form: 'EditablePersonalInfo', // a unique identifier for this form
  validate,
})(EditablePersonalInfo);
