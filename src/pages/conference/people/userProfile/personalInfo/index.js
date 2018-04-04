import React, { Component } from 'react';
import ActionPermIdentity from 'material-ui/svg-icons/action/perm-identity';
import NotificationWC from 'material-ui/svg-icons/notification/wc';
import SocialCake from 'material-ui/svg-icons/social/cake';
import './style.css';
import { RaisedButton } from 'material-ui';
import { DatePicker, ListItem } from 'material-ui';
import ActionInfoOutline from 'material-ui/svg-icons/action/info-outline';
import SocialLocationCity from 'material-ui/svg-icons/social/location-city';
import ActionWork from 'material-ui/svg-icons/action/work';
import { Field, reduxForm } from 'redux-form';
import { compose } from 'react-apollo';
import { connect } from 'react-redux';
import { Col, Grid, Row } from 'react-flexbox-grid';
import validate from './validate';
import { renderField } from '../../../../../utils';
import { withRouter } from 'react-router';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

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
const renderSelectField = ({
  input,
  label,
  meta: { touched, error },
  children,
  ...custom
}) => (
  <SelectField
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    onChange={(event, index, value) => input.onChange(value)}
    children={children}
    {...custom}
  />
);
class EditablePersonalInfo extends Component {
  constructor(props) {
    super(props);
    this.handleCancel = this.handleCancel.bind(this);
  }
  handleCancel() {
    this.props.history.replace('/conference/info');
  }
  render() {
    const { handleSubmit, submitting, pristine, invalid } = this.props;
    return (
      <div>
        <Grid fluid>
          <Row around="xs">
            <Col xs={4}>
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
                  primaryText="Position"
                  leftIcon={<ActionWork />}
                  disabled={true}
                />
              </Row>
              <Row className="firstColunm">
                <ListItem
                  className="list-item"
                  primaryText="Organization"
                  leftIcon={<SocialLocationCity />}
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
                  <Col xs className="subname">
                    <Field
                      name="lastname"
                      type="text"
                      hintText="Last name"
                      component={renderField}
                      className="editField"
                      fullWidth={true}
                    />
                  </Col>
                  <Col xs>
                    <Field
                      name="firstname"
                      type="text"
                      hintText="First name"
                      component={renderField}
                      className="editField"
                      fullWidth={true}
                    />
                  </Col>
                </Row>
                <Row className="secondColunm">
                  <Field
                    name="gender"
                    component={renderSelectField}
                    fullWidth={true}
                  >
                    <MenuItem value="male" primaryText="Male" />
                    <MenuItem value="female" primaryText="Female" />
                    <MenuItem value="unknown" primaryText="Unknown" />
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
                    name="position"
                    type="text"
                    hintText="Position"
                    component={renderField}
                    fullWidth={true}
                  />
                </Row>
                <Row className="secondColunm">
                  <Field
                    name="organization"
                    type="text"
                    hintText="Organization"
                    component={renderField}
                    fullWidth={true}
                  />
                </Row>
                <Row className="secondColunm">
                  <Field
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
                <div className="personal-info-button">
                  <RaisedButton
                    className="btn save-change"
                    label="Save Change"
                    primary={true}
                    disabled={pristine || submitting || invalid}
                    type="submit"
                  />
                  <RaisedButton
                    className="btn cancel"
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

const mapStateToProps = (state, ownProps) => {
  const me = ownProps.me;
  return {
    initialValues: {
      firstname: me.firstname,
      lastname: me.lastname,
      gender: me.gender,
      dob: new Date(me.dob),
      bio: me.bio,
      position: me.position,
      organization: me.organization,
    },
  };
};

EditablePersonalInfo = reduxForm({
  form: 'EditablePersonalInfo', // a unique identifier for this form
  validate,
})(EditablePersonalInfo);
export default compose(withRouter, connect(mapStateToProps, undefined))(
  EditablePersonalInfo,
);
