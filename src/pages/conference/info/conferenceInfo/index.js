import React, { PureComponent } from 'react';
import { SubmissionError } from 'redux-form';
import UPDATE_CONFERENCE_MUTATION from '../helpers/updateConferenceMutation';
import UPDATE_ADDRESS_MUTATION from '../helpers/updateAddressMutation';
import UPDATE_ORGANIZER_DETAIL_MUTATION from '../helpers/updateOrganizerDetailMutation';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import InfoForm from './InfoForm';
import { conferenceOperations } from 'store/ducks/conference';
import './style.css';
class ConferenceInfo extends PureComponent {
  constructor(props) {
    super(props);
    this.handleUpdateConferenceInfo = this.handleUpdateConferenceInfo.bind(
      this,
    );
    this.state = {
      position: {
        lat: this.props.conference.address.lat,
        long: this.props.conference.address.long,
      },
    };
    this.onMapPositionChanged = this.onMapPositionChanged.bind(this);
  }
  async handleUpdateConferenceInfo({
    title,
    description,
    startDate,
    endDate,
    organizerName,
    organizerEmail,
    organizerWebsite,
    organizerPhoneNumber,
  }) {
    try {
      await this.props
        .UPDATE_CONFERENCE_MUTATION({
          variables: {
            id: this.props.conference_id,
            title: title,
            description: description,
            start_date: startDate,
            end_date: endDate,
          },
        })
        .then(({ data }) => {
          console.log(this.props.position);
          const id = data.updateConference.address.id;
          this.props.UPDATE_ADDRESS_MUTATION({
            variables: {
              id: id,
              lat: this.props.position.lat,
              long: this.props.position.lng,
            },
          });
        });

      await this.props.UPDATE_ORGANIZER_DETAIL_MUTATION({
        variables: {
          id: this.props.organizerDetail_id,
          name: organizerName,
          email: organizerEmail,
          website: organizerWebsite,
          phone: organizerPhoneNumber,
        },
      });
    } catch (error) {
      throw new SubmissionError(error);
    }
  }
  onMapPositionChanged(position) {
    this.props.getPosition(position);
  }
  render() {
    return (
      <InfoForm
        initialValues={this.props.initialValues}
        conference={this.props.conference}
        onSubmit={this.handleUpdateConferenceInfo}
        onMapPositionChanged={this.onMapPositionChanged}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const conference = ownProps.conference;
  const organizerDetail = conference.organizerDetail;
  return {
    conference_id: conference.id,
    organizerDetail_id: organizerDetail.id,
    position: state.conference.position,
    initialValues: {
      title: conference.title,
      description: conference.description,
      startDate: new Date(conference.start_date),
      endDate: new Date(conference.end_date),
      lat: parseFloat(conference.address.lat),
      long: parseFloat(conference.address.long),
      organizerName: organizerDetail.name,
      organizerEmail: organizerDetail.email,
      organizerWebsite: organizerDetail.website,
      organizerPhoneNumber: organizerDetail.phone,
    },
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPosition: position =>
      dispatch(conferenceOperations.getPositionOperation(position)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(UPDATE_CONFERENCE_MUTATION, {
    name: 'UPDATE_CONFERENCE_MUTATION',
  }),
  graphql(UPDATE_ORGANIZER_DETAIL_MUTATION, {
    name: 'UPDATE_ORGANIZER_DETAIL_MUTATION',
  }),
  graphql(UPDATE_ADDRESS_MUTATION, {
    name: 'UPDATE_ADDRESS_MUTATION',
  }),
)(ConferenceInfo);
