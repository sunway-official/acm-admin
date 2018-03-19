import React, { Component } from 'react';
import { ListItem } from 'material-ui';
import { Field, reduxForm } from 'redux-form';
import { compose } from 'react-apollo';
import { connect } from 'react-redux';
import { Col, Grid, Row } from 'react-flexbox-grid';
import { renderField } from '../../../../../utils';
import { listField } from './listField';

class ParticipantDetail extends Component {
  render() {
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
                name={field.name}
                type="text"
                hintText={field.hintText}
                component={renderField}
                fullWidth={true}
                disabled={true}
                underlineShow={false}
                rowsMax={field.rowsMax}
                multiLine={field.multiLine}
              />
            </Row>
          </Col>
        </Row>
      </div>
    ));
    return (
      <div className="landing-page-form">
        <Grid fluid className="landing-page-grid">
          <Row around="xs">
            <form className="landing-page-redux-form"> {ListFields} </form>
          </Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const participantDetail = ownProps.participantDetail;
  return {
    initialValues: {
      id: participantDetail.id,
      firstname: participantDetail.firstname,
      lastname: participantDetail.lastname,
      email: participantDetail.email,
      gender: participantDetail.gender,
      dob: participantDetail.dob,
      phone_number: participantDetail.phone_number,
      bio: participantDetail.bio,
      position: participantDetail.position,
      organization: participantDetail.organization,
    },
  };
};

ParticipantDetail = reduxForm({
  form: 'ParticipantDetail', // a unique identifier for this form
})(ParticipantDetail);
export default compose(connect(mapStateToProps, undefined))(ParticipantDetail);
