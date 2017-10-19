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
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { compose, gql, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { Col, Grid, Row } from 'react-flexbox-grid';
import validate from './validate';
import { renderField } from '../../../../../utils';
import { withRouter } from 'react-router';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { queries } from '../helpers';

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
    this.saveInfomation = this.saveInfomation.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  handleCancel() {
    this.props.history.replace('/');
  }
  saveInfomation() {
    const {
      UPDATE_ME_MUTATION,
      firstname,
      lastname,
      dob,
      gender,
      bio,
      position,
      organization,
    } = this.props;
    UPDATE_ME_MUTATION({
      variables: {
        firstname: firstname,
        lastname: lastname,
        gender: gender,
        dob: dob,
        bio: bio,
        position: position,
        organization: organization,
      },
      refetchQueries: [
        {
          query: queries.ME_QUERY,
        },
      ],
    });
    window.alert('Update successful!');
  }

  render() {
    console.log(this.props);
    const { handleSubmit, submitting, pristine, invalid, me } = this.props;
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
                      id="text-field-default"
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
                      id="text-field-default"
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
                    id="text-field-default"
                    name="position"
                    type="text"
                    hintText="Position"
                    component={renderField}
                    fullWidth={true}
                  />
                </Row>
                <Row className="secondColunm">
                  <Field
                    id="text-field-default"
                    name="organization"
                    type="text"
                    hintText="Organization"
                    component={renderField}
                    fullWidth={true}
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
      position: me.position,
      organization: me.organization,
    },
  };
};

// const selector = formValueSelector('EditablePersonalInfo');
// EditablePersonalInfo = connect(state => {
//   const firstname = selector(state, 'firstname');
//   const lastname = selector(state, 'lastname');
//   const gender = selector(state, 'gender');
//   const dob = new Date(selector(state, 'dob'));
//   dob.setHours(dob.getHours() + 7);
//   const bio = selector(state, 'bio');
//   const position = selector(state, 'position');
//   const organization = selector(state, 'organization');
//   return {
//     firstname,
//     lastname,
//     gender,
//     dob,
//     bio,
//     position,
//     organization,
//   };
// })(EditablePersonalInfo);

const UPDATE_ME_MUTATION = gql`
  mutation UpdateMe(
    $firstname: String!
    $lastname: String!
    $dob: Date
    $gender: Gender!
    $bio: String
    $organization: String
    $position: String
  ) {
    updateMe(
      firstname: $firstname
      lastname: $lastname
      dob: $dob
      gender: $gender
      bio: $bio
      position: $position
      organization: $organization
    ) {
      firstname
      lastname
      dob
      gender
      bio
      position
      organization
    }
  }
`;
EditablePersonalInfo = reduxForm({
  form: 'EditablePersonalInfo', // a unique identifier for this form
  validate,
})(EditablePersonalInfo);
export default compose(
  withRouter,
  connect(mapStateToProps, undefined),
  graphql(UPDATE_ME_MUTATION, {
    name: 'UPDATE_ME_MUTATION',
  }),
  graphql(queries.ME_QUERY, {
    name: 'ME_QUERY',
  }),
)(EditablePersonalInfo);
