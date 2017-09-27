import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { RaisedButton } from 'material-ui';
import { style } from './style.css';
import CoOrganizer from './coOrganizerInfo';
import Organizer from './organizerInfo';
import BasicInfo from './basicInfo';
import { connect } from 'react-redux';
import { graphql, gql, compose } from 'react-apollo';
import { conferenceOperations } from '../../../store/ducks/conference';

class Info extends Component {
  componentDidMount() {
    // console.log(this.props.conference.conference);
    // console.log(this.props);
  }

  render() {
    const { handleSubmit, submitting, pristine } = this.props;
    return (
      <form className="form conference-info" onSubmit={handleSubmit}>
        <div>
          <style dangerouslySetInnerHTML={{ __html: style }} />
          <div>
            <BasicInfo />
            <Organizer />
            <CoOrganizer />
            <div className="d-flex save-btn btn-group">
              <RaisedButton
                label="Save"
                primary={true}
                type="submit"
                disabled={pristine || submitting}
              />
            </div>
          </div>
        </div>
      </form>
    );
  }
}
const minDate = new Date();

Info = reduxForm({
  form: 'conferenceInfo',
  initialValues: {
    title: '12321',
    description: '123',
    startDate: minDate,
    organizerName: 'Duy Tan University',
    organizerEmail: 'duytan@gmail.com',
    organizerWebsite: 'mydtu.com',
    organizerPhoneNumber: '123-123-1233',
  },
})(Info);

const mapStateToProps = (state, ownProps) => {
  console.log(state);
  const conference = ownProps.conference;
  const organizerDetail = conference.organizerDetail;
  return {
    id: state.conference.id,
    initialValues: {
      title: conference.title,
      description: conference.description,
      startDate: new Date(conference.start_date),
      endDate: new Date(conference.end_date),
      organizerName: organizerDetail.name,
      organizerEmail: organizerDetail.email,
      organizerWebsite: organizerDetail.website,
      organizerPhoneNumber: organizerDetail.phone,
    },
  };
};

export default connect(mapStateToProps, undefined)(Info);
