import React, { Component } from 'react';
import './style.css';
import { RaisedButton } from 'material-ui';
import { ListItem } from 'material-ui';
import { Field, reduxForm } from 'redux-form';
import { compose } from 'react-apollo';
import { connect } from 'react-redux';
import { Col, Grid, Row } from 'react-flexbox-grid';
import validate from './validate';
import { renderField } from '../../../utils';
import { withRouter } from 'react-router';
import { AppBar } from 'material-ui';
import { normalizePhone } from 'utils';

const listField = [
  {
    id: 1,
    name: 'slogan',
    hintText: 'Slogan',
    rows: 1,
    rowsMax: 1,
    multiLine: false,
    primaryText: 'Slogan',
  },
  {
    id: 2,
    name: 'register_description',
    hintText: ' Register Description',
    rows: 1,
    rowsMax: 2,
    multiLine: true,
    className: 'multi-row',
    primaryText: 'Register Description',
  },
  {
    id: 3,
    name: 'call_paper_description',
    hintText: ' Call For Paper',
    rows: 1,
    rowsMax: 2,
    multiLine: true,
    className: 'multi-row',
    primaryText: 'Call For Paper',
  },
  {
    id: 4,
    name: 'speaker_description',
    hintText: ' Speaker Description',
    rows: 1,
    rowsMax: 2,
    multiLine: true,
    className: 'multi-row',
    primaryText: 'Speaker Description',
  },
  {
    id: 5,
    name: 'email',
    hintText: 'Email',
    multiLine: false,
    rows: 1,
    rowsMax: 1,
    primaryText: 'Email',
  },
  {
    id: 6,
    name: 'facebook_id',
    hintText: 'Facebook',
    rows: 1,
    rowsMax: 1,
    multiLine: false,
    primaryText: 'Facebook Link',
  },
];
class LandingPageForm extends Component {
  constructor(props) {
    super(props);
    this.handleCancel = this.handleCancel.bind(this);
  }
  handleCancel() {
    this.props.history.replace('/');
  }
  render() {
    const { handleSubmit, submitting, pristine, invalid } = this.props;
    const ListFields = listField.map(field => (
      <div key={field.id}>
        <Row around="xs" className={field.className}>
          <Col xs={3}>
            <Row className="firstColunm">
              <ListItem
                className="list-item"
                primaryText={field.primaryText}
                disabled={true}
              />
            </Row>
          </Col>
          <Col xs={9}>
            <Row className="landing-page-second-column">
              <Field
                id="text-field-default"
                name={field.name}
                type="text"
                hintText={field.hintText}
                component={renderField}
                multiLine={field.multiLine}
                rows={field.rows}
                rowsMax={field.rowsMax}
                fullWidth={true}
                normalize={field.normalize}
              />
            </Row>
          </Col>
        </Row>
      </div>
    ));
    return (
      <div className="landing-page-form">
        <AppBar
          className="landing-page-app-bar"
          title="Edit Your Landing Page Information"
          showMenuIconButton={false}
        />
        <Grid fluid className="landing-page-grid">
          <Row around="xs">
            <form onSubmit={handleSubmit} className="landing-page-redux-form">
              {ListFields}
              <Row around="xs">
                <Col xs={3}>
                  <Row className="firstColunm">
                    <ListItem
                      className="list-item"
                      primaryText="Phone Number"
                      disabled={true}
                    />
                  </Row>
                </Col>
                <Col xs={9}>
                  <Row className="landing-page-second-column">
                    <Field
                      id="text-field-default"
                      name="phone_number"
                      type="text"
                      hintText="Phone Number"
                      component={renderField}
                      multiLine={false}
                      rows={1}
                      rowsMax={1}
                      fullWidth={true}
                      normalize={normalizePhone}
                    />
                  </Row>
                </Col>
              </Row>
              <Row className="personal-info-button" center="xs">
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
              </Row>
            </form>
          </Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const landingPage = ownProps.landingPage;
  return {
    initialValues: {
      slogan: landingPage.slogan,
      register_description: landingPage.register_description,
      call_paper_description: landingPage.call_paper_description,
      speaker_description: landingPage.speaker_description,
      email: landingPage.email,
      facebook_id: landingPage.facebook_id,
      phone_number: landingPage.phone_number,
    },
  };
};

LandingPageForm = reduxForm({
  form: 'LandingPageForm', // a unique identifier for this form
  validate,
})(LandingPageForm);
export default compose(withRouter, connect(mapStateToProps, undefined))(
  LandingPageForm,
);
