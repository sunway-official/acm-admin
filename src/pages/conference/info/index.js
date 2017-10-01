import React, { PureComponent } from 'react';
import { Subheader, IconButton, Tabs, Tab } from 'material-ui';
import { Link } from 'react-router-dom';
import { ActionHome, HardwareKeyboardArrowRight } from 'material-ui/svg-icons';
import ConferenceInfo from './conferenceInfo';
import showResults from './showResults';
import { graphql, gql } from 'react-apollo';
import CoOrganizerList from './coOrganizer/coOrganizerList';

class Index extends PureComponent {
  render() {
    // console.log(this.props);
    const { loading } = this.props.data;

    if (loading) return <div>loading...</div>;

    const conference = this.props.data.getConferenceByID;
    const coOrganizerDetails = conference.coOrganizerDetails;

    return (
      <div className="conference">
        <Subheader className="subheader"> Conference Information</Subheader>
        <div className="page-breadcrumb d-flex">
          <Link className="d-flex" to="/">
            <IconButton>
              <ActionHome />
            </IconButton>
            <span>Home</span>
          </Link>
          <IconButton>
            <HardwareKeyboardArrowRight />
          </IconButton>
          <span>Conference Information</span>
        </div>
        <div className="dashboard content d-flex">
          <Tabs style={{ width: '100%' }}>
            <Tab label="Basic Information">
              <ConferenceInfo onSubmit={showResults} conference={conference} />
            </Tab>
            <Tab label="Co-Organizer">
              <CoOrganizerList coOrganizerDetails={coOrganizerDetails} />
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }
}

const GET_CONFERENCE_BY_ID_QUERY = gql`
  query getConference($id: ID!) {
    getConferenceByID(id: $id) {
      id
      title
      description
      start_date
      end_date
      organizerDetail {
        id
        name
        email
        website
        phone
      }
      coOrganizerDetails {
        id
        name
        email
        website
        phone
      }
    }
  }
`;

export default graphql(GET_CONFERENCE_BY_ID_QUERY, {
  options: ownProps => ({ variables: { id: ownProps.match.params.id } }),
})(Index);
