import './style.css';
import { RaisedButton, ListItem } from 'material-ui';
import React, { Component } from 'react';
import { Col, Grid, Row } from 'react-flexbox-grid';
import { Field, reduxForm } from 'redux-form';
import { compose } from 'react-apollo';
import { connect } from 'react-redux';
import validate from './validate';
import { renderField } from '../../../../../utils';
import { withRouter } from 'react-router';
import FaFacebookSquare from 'react-icons/lib/fa/facebook-square';
import FaTwitterSquare from 'react-icons/lib/fa/twitter-square';
import FaLinkedinSquare from 'react-icons/lib/fa/linkedin-square';
import FaEnvelopeO from 'react-icons/lib/fa/envelope-o';

class ContactInformation extends Component {
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
                  primaryText="Email"
                  leftIcon={
                    <FaEnvelopeO
                      className="fa fa-envelope-o fa-lg"
                      aria-hidden="true"
                    />
                  }
                  disabled={true}
                />
              </Row>
              <Row className="firstColunm">
                <ListItem
                  className="list-item"
                  primaryText="Facebook"
                  leftIcon={
                    <FaFacebookSquare
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
                    <FaTwitterSquare
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
                    <FaLinkedinSquare
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
                    name="email"
                    type="text"
                    component={renderField}
                    hintText="Email"
                    disabled={true}
                    underlineShow={false}
                  />
                </Row>
                <Row className="secondColunm">
                  <Field
                    name="facebook_id"
                    type="text"
                    hintText="Facebook link"
                    component={renderField}
                    fullWidth={true}
                  />
                </Row>
                <Row className="secondColunm">
                  <Field
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
                    name="linkedin_id"
                    type="text"
                    hintText="LinkedIn link"
                    component={renderField}
                    fullWidth={true}
                    //className="editField"
                  />
                </Row>
                <div className="contact-information-button">
                  <RaisedButton
                    className="btn contactInformation"
                    label="Save Change"
                    disabled={submitting || invalid || pristine}
                    primary={true}
                    type="submit"
                  />
                  <RaisedButton
                    className="btn contactInformation"
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

ContactInformation = reduxForm({
  form: 'ContactInformation', // a unique identifier for this form
  validate,
})(ContactInformation);

const mapStateToProps = (state, ownProps) => {
  const me = ownProps.me;
  return {
    initialValues: {
      email: me.email,
      linkedin_id: me.linkedin_id,
      facebook_id: me.facebook_id,
      twitter_id: me.twitter_id,
    },
  };
};

export default compose(withRouter, connect(mapStateToProps, undefined))(
  ContactInformation,
);
