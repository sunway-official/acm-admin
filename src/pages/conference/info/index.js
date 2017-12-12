import React, { Component } from 'react';
import { Subheader, IconButton, Tabs, Tab } from 'material-ui';
import { Link } from 'react-router-dom';
import { queries } from './helpers';
import { ActionHome, HardwareKeyboardArrowRight } from 'material-ui/svg-icons';
import ConferenceInfo from './conferenceInfo';
import { connect } from 'react-redux';
import CoOrganizerList from './coOrganizer';
import { graphql, compose } from 'react-apollo';
class Index extends Component {
  render() {
    let conference;
    if (this.props.currentConference) {
      conference = this.props.currentConference;
    } else return window.location.reload();
    // khai bao conference dua tren query getConferenceByID
    const coOrganizerDetails = conference.coOrganizerDetails;
    // khai bao coOrganizerDetails dua tren query coOrganizerDetails bang getConferenceByID
    return (
      <div className="conference">
        <Subheader className="subheader conf-infor-title">
          Conference Information
        </Subheader>
        <div className="page-breadcrumb d-flex">
          <Link className="d-flex" to="/">
            <IconButton>
              <ActionHome />
            </IconButton>
            <span>Dashboard</span>
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
                conferenceId={conference.id}
                coOrganizerDetails={coOrganizerDetails}
              />
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  if (
    state.auth &&
    state.auth.currentUser &&
    state.auth.currentUser.currentConference
  ) {
    return { currentConference: state.auth.currentUser.currentConference };
  }
};

export default compose(
  graphql(queries.ME_QUERY, {
    name: 'queryMe',
  }),
  connect(mapStateToProps, undefined),
)(Index);
