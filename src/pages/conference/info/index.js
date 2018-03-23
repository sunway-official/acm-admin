import React, { Component } from 'react';
import { Subheader, IconButton, Tabs, Tab } from 'material-ui';
import { Link } from 'react-router-dom';
import { queries } from './helpers';
import { ActionHome, HardwareKeyboardArrowRight } from 'material-ui/svg-icons';
import ConferenceInfo from './conferenceInfo';
import { connect } from 'react-redux';
import CoOrganizerList from './coOrganizer';
import OrganizationDate from './organizationDate';
import { graphql, compose } from 'react-apollo';
import { functions } from 'containers/layout/appbar/helpers';

class Index extends Component {
  render() {
    let conference;
    if (this.props.currentConference) {
      conference = this.props.currentConference;
    } else return window.location.reload();
    const { loading, getCurrentConference } = this.props.GET_CURRENT_CONFERENCE;
    let deadline, initialValues;

    if (getCurrentConference) {
      deadline = getCurrentConference;
      initialValues = {
        dl_submit_abstract: new Date(deadline.dl_submit_abstract),
        dl_review_abstract: new Date(deadline.dl_review_abstract),
        dl_release_abstract: new Date(deadline.dl_release_abstract),
        dl_re_submit_abstract: new Date(deadline.dl_re_submit_abstract),
        dl_re_review_abstract: new Date(deadline.dl_re_review_abstract),
        dl_release_final_abstract: new Date(deadline.dl_release_final_abstract),
        dl_submit_paper: new Date(deadline.dl_submit_paper),
        dl_review_paper: new Date(deadline.dl_review_paper),
        dl_release_paper: new Date(deadline.dl_release_paper),
        dl_re_submit_paper: new Date(deadline.dl_re_submit_paper),
        dl_re_review_paper: new Date(deadline.dl_re_review_paper),
        dl_release_final_paper: new Date(deadline.dl_release_final_paper),
      };
    }
    if (loading) {
      return <div>Loading...</div>;
    }
    // khai bao conference dua tren query getConferenceByID
    const coOrganizerDetails = conference.coOrganizerDetails;
    // khai bao coOrganizerDetails dua tren query coOrganizerDetails bang getConferenceByID

    const roles = localStorage.getItem('roles');
    const isShow = functions.checkRoleAllComponents(roles);
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
              <ConferenceInfo
                isShow={isShow}
                conference={conference}
                onSubmit={() => {}}
              />
              {/* truyen conference qua conferenceInfo  */}
            </Tab>
            {isShow['edit-conference-date'] ? (
              <Tab label="Deadline">
                <OrganizationDate
                  initialValues={initialValues}
                  onSubmit={() => {}}
                />
              </Tab>
            ) : (
              ''
            )}
            {isShow['view-co-organizer'] ? (
              <Tab label="Co-Organizer">
                <CoOrganizerList
                  conferenceId={conference.id}
                  coOrganizerDetails={coOrganizerDetails}
                />
              </Tab>
            ) : (
              ''
            )}
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
  graphql(queries.GET_CURRENT_CONFERENCE, {
    name: 'GET_CURRENT_CONFERENCE',
  }),
  connect(mapStateToProps, undefined),
)(Index);
