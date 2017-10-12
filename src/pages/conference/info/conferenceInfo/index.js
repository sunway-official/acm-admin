import React, { PureComponent } from 'react';

import { SubmissionError } from 'redux-form';

import { connect } from 'react-redux';
import { gql, graphql, compose } from 'react-apollo';
import InfoForm from './InfoForm';

import './style.css';

class ConferenceInfo extends PureComponent {
  constructor(props) {
    super(props);
    this.handleUpdateConferenceInfo = this.handleUpdateConferenceInfo.bind(
      this,
    );
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
  render() {
    return (
      <InfoForm
        initialValues={this.props.initialValues}
        conference={this.props.conference}
        onSubmit={this.handleUpdateConferenceInfo}
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

const UPDATE_CONFERENCE_MUTATION = gql`
  mutation UpdateConference(
    $id: ID!
    $title: String
    $description: String
    $start_date: Date
    $end_date: Date
  ) {
    updateConference(
      id: $id
      title: $title
      description: $description
      start_date: $start_date
      end_date: $end_date
    ) {
      id
      title
      description
      start_date
      end_date
    }
  }
`;

const UPDATE_ORGANIZER_DETAIL_MUTATION = gql`
  mutation updateOrganizerDetail(
    $id: ID!
    $name: String
    $email: String
    $website: String
    $phone: String
  ) {
    updateOrganizerDetail(
      id: $id
      name: $name
      email: $email
      website: $website
      phone: $phone
    ) {
      id
      name
      email
      website
      phone
    }
  }
`;

export default compose(
  connect(mapStateToProps, undefined),
  graphql(UPDATE_CONFERENCE_MUTATION, {
    name: 'UPDATE_CONFERENCE_MUTATION',
  }),
  graphql(UPDATE_ORGANIZER_DETAIL_MUTATION, {
    name: 'UPDATE_ORGANIZER_DETAIL_MUTATION',
  }),
)(ConferenceInfo);
