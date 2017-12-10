import React, { PureComponent } from 'react';
import { mutations } from '../helpers';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import InfoForm from './InfoForm';
import { withRouter } from 'react-router-dom';
import './style.css';
class ConferenceInfoForm extends PureComponent {
  constructor(props) {
    super(props);
    this.handleUpdateConferenceInfo = this.handleUpdateConferenceInfo.bind(
      this,
    );
    this.onMapPositionChanged = this.onMapPositionChanged.bind(this);

    this.state = {
      position: {
        lat: this.props.conference.address.lat,
        long: this.props.conference.address.long,
      },
    };
  }
  componentDidMount() {
    console.log(this.props);
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
      await this.props.UPDATE_CONFERENCE_MUTATION({
        variables: {
          id: this.props.conference_id,
          title: title,
          description: description,
          start_date: startDate,
          end_date: endDate,
        },
      });
      await this.props.UPDATE_ORGANIZER_DETAIL_MUTATION({
        variables: {
          id: this.props.organizer_id,
          name: organizerName,
          email: organizerEmail,
          website: organizerWebsite,
          phone: organizerPhoneNumber,
        },
      });
      await this.props.UPDATE_ADDRESS_MUTATION({
        variables: {
          id: this.props.address_id,
          lat: this.props.position.lat,
          long: this.props.position.lng,
        },
      });
    } catch (error) {
      throw error;
    }
  }
  onMapPositionChanged(position) {
    this.props.getPosition(position);

    console.log(this.props);
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
  const organizer = conference.organizerDetail;
  const address = conference.address;
  return {
    address_id: address.id,
    conference_id: conference.id,
    organizer_id: organizer.id,
    position: state.conference.position,
    initialValues: {
      title: conference.title,
      description: conference.description,
      startDate: new Date(conference.start_date),
      endDate: new Date(conference.end_date),
      lat: parseFloat(conference.address.lat),
      long: parseFloat(conference.address.long),
      organizerName: organizer.name,
      organizerEmail: organizer.email,
      organizerWebsite: organizer.website,
      organizerPhoneNumber: organizer.phone,
    },
  };
};
export default compose(
  withRouter,
  connect(mapStateToProps, undefined),
  graphql(mutations.UPDATE_CONFERENCE_MUTATION, {
    name: 'UPDATE_CONFERENCE_MUTATION',
  }),
  graphql(mutations.UPDATE_ORGANIZER_DETAIL_MUTATION, {
    name: 'UPDATE_ORGANIZER_DETAIL_MUTATION',
  }),
  graphql(mutations.UPDATE_ADDRESS_MUTATION, {
    name: 'UPDATE_ADDRESS_MUTATION',
  }),
)(ConferenceInfoForm);
