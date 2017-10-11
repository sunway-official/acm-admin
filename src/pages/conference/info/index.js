import React, { PureComponent } from 'react';
import { Subheader, IconButton, Tabs, Tab } from 'material-ui';
import { Link } from 'react-router-dom';
import { ActionHome, HardwareKeyboardArrowRight } from 'material-ui/svg-icons';
import ConferenceInfo from './conferenceInfo';
import { graphql } from 'react-apollo';
import CoOrganizerList from './coOrganizer/coOrganizerList';
import GET_CONFERENCE_BY_ID_QUERY from './helpers/getConferenceByIdQuery';

class Index extends PureComponent {
  render() {
    // console.log(this.props);
    const { loading } = this.props.data;

    if (loading) return <div>loading...</div>;

    const conference = this.props.data.getConferenceByID;
    // khai bao conference dua tren query getConferenceByID
    const coOrganizerDetails = conference.coOrganizerDetails;
    // khai bao coOrganizerDetails dua tren query coOrganizerDetails bang getConferenceByID

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
              <ConferenceInfo conference={conference} onSubmit={() => {}} />
              {/* truyen conference qua conferenceInfo  */}
            </Tab>
            <Tab label="Co-Organizer">
              <CoOrganizerList
                conferenceId={this.props.match.params.id}
                coOrganizerDetails={coOrganizerDetails}
              />
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default graphql(GET_CONFERENCE_BY_ID_QUERY, {
  options: ownProps => ({ variables: { id: ownProps.match.params.id } }),
})(Index);
