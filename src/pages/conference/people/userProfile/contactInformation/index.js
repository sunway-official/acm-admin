import './style.css';
import { RaisedButton, ListItem } from 'material-ui';
import React, { Component } from 'react';
import { Col, Grid, Row } from 'react-flexbox-grid';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { compose, gql, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import validate from './validate';
import { renderField } from '../../../../../utils';
import { withRouter } from 'react-router';

class ContactInformation extends Component {
  constructor(props) {
    super(props);
    this.saveContactInfomation = this.saveContactInfomation.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  handleCancel() {
    this.props.history.replace('/');
  }
  saveContactInfomation() {
    console.log(this.props.me);
    const {
      UPDATE_ME_MUTATION,
      firstname,
      lastname,
      email,
      dob,
      linkedin_id,
      facebook_id,
      twitter_id,
    } = this.props;
    UPDATE_ME_MUTATION({
      variables: {
        firstname: firstname,
        lastname: lastname,
        email: email,
        dob: dob,
        linkedin_id: linkedin_id,
        facebook_id: facebook_id,
        twitter_id: twitter_id,
      },
    });
    window.alert('Update successful!');
  }
  render() {
    const { handleSubmit, submitting, pristine, invalid } = this.props;
    return (
      <div>
        <Grid fluid>
          <Row around="xs">
            <Col xs={3}>
              <Row className="firstColunm firstRow">
                <ListItem
                  className="list-item"
                  primaryText="Email"
                  leftIcon={
                    <i className="fa fa-envelope-o fa-lg" aria-hidden="true" />
                  }
                  disabled={true}
                />
              </Row>
              <Row className="firstColunm">
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
              </Row>
              <Row className="firstColunm">
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
              </Row>
              <Row className="firstColunm">
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
              </Row>
            </Col>
            <Col xs={8}>
              <form onSubmit={handleSubmit}>
                <Row className="secondColunm firstRow">
                  <Field
                    id="text-field-default"
                    name="email"
                    type="text"
                    component={renderField}
                    hintText="Email"
                    //className="editField"
                    disabled={true}
                    underlineShow={false}
                  />
                </Row>
                <Row className="secondColunm">
                  <Field
                    id="text-field-default"
                    name="facebook_id"
                    type="text"
                    hintText="Facebook link"
                    component={renderField}
                    fullWidth={true}
                    //className="editField"
                  />
                </Row>
                <Row className="secondColunm">
                  <Field
                    id="text-field-default"
                    name="twitter_id"
                    type="text"
                    hintText="Twitter link"
                    component={renderField}
                    fullWidth={true}
                    //className="editField"
                  />
                </Row>
                <Row className="secondColunm">
                  <Field
                    id="text-field-default"
                    name="linkedin_id"
                    type="text"
                    hintText="LinkedIn link"
                    component={renderField}
                    fullWidth={true}
                    //className="editField"
                  />
                </Row>
              </form>
            </Col>
          </Row>
          <div>
            <RaisedButton
              className="btn contactInformation"
              label="Save"
              disabled={submitting || invalid || pristine}
              primary={true}
              onClick={this.saveContactInfomation}
            />
            <RaisedButton
              className="btn contactInformation"
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

ContactInformation = reduxForm({
  form: 'ContactInformation', // a unique identifier for this form
  validate,
})(ContactInformation);

const mapStateToProps = (state, ownProps) => {
  const me = ownProps.me;
  return {
    initialValues: {
      firstname: me.firstname,
      lastname: me.lastname,
      email: me.email,
      dob: new Date(me.dob),
      linkedin_id: me.linkedin_id,
      facebook_id: me.facebook_id,
      twitter_id: me.twitter_id,
    },
  };
};

const selector = formValueSelector('ContactInformation');
ContactInformation = connect(state => {
  const firstname = selector(state, 'firstname');
  const lastname = selector(state, 'lastname');
  const email = selector(state, 'email');
  const dob = new Date(selector(state, 'dob'));
  dob.setHours(dob.getHours() + 7);
  const linkedin_id = selector(state, 'linkedin_id');
  const facebook_id = selector(state, 'facebook_id');
  const twitter_id = selector(state, 'twitter_id');
  return {
    firstname,
    lastname,
    email,
    dob,
    linkedin_id,
    facebook_id,
    twitter_id,
  };
})(ContactInformation);

const UPDATE_ME_MUTATION = gql`
  mutation UpdateMe(
    $firstname: String!
    $lastname: String!
    $dob: Date
    $linkedin_id: String
    $facebook_id: String
    $twitter_id: String
  ) {
    updateMe(
      firstname: $firstname
      lastname: $lastname
      dob: $dob
      linkedin_id: $linkedin_id
      facebook_id: $facebook_id
      twitter_id: $twitter_id
    ) {
      firstname
      lastname
      dob
      linkedin_id
      facebook_id
      twitter_id
    }
  }
`;

export default compose(
  withRouter,
  connect(mapStateToProps, undefined),
  graphql(UPDATE_ME_MUTATION, {
    name: 'UPDATE_ME_MUTATION',
  }),
)(ContactInformation);
