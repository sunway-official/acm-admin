import React, { Component } from 'react';
import { Subheader, IconButton, Tabs, Tab } from 'material-ui';
import { Link } from 'react-router-dom';
import { queries, mutations } from './helpers';
import { ActionHome, HardwareKeyboardArrowRight } from 'material-ui/svg-icons';
import ConferenceInfo from './conferenceInfo';
import { connect } from 'react-redux';
import CoOrganizerList from './coOrganizer';
import Deadline from './deadLine';
import { graphql, compose } from 'react-apollo';
import { functions } from 'containers/layout/appbar/helpers';

class Index extends Component {
  componentDidMount() {
    const roles = localStorage.getItem('roles');
    const isShow = functions.checkRoleAllComponents(roles);
    if (isShow['update-all-papers-status']) {
      this.props.UPDATE_ALL_STATUS_PAPERS({
        variables: {
          current_date: new Date(),
        },
        refetchQueries: [
          {
            query: queries.GET_PAPERS_BY_CONFERENCE_ID,
            variables: {
              role_id: roles,
            },
          },
        ],
      });
    }
  }

  render() {
    let conference;
    if (this.props.currentConference) {
      conference = this.props.currentConference;
    } else window.location.reload();

    localStorage.setItem('conferenceTitle', conference.title);
    const coOrganizerDetails = conference.coOrganizerDetails;
    const roles = localStorage.getItem('roles');
    const isShow = functions.checkRoleAllComponents(roles);
    return (
      <div className="conference">
        <Subheader className="subheader conf-infor-title">
          {localStorage.getItem('conferenceTitle')}
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
            </Tab>
            {isShow['edit-deadline'] ? (
              <Tab label="Set Conference Date">
                <Deadline onSubmit={() => {}} conferenceId={conference.id} />
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
  graphql(mutations.UPDATE_ALL_STATUS_PAPERS, {
    name: 'UPDATE_ALL_STATUS_PAPERS',
  }),

  connect(mapStateToProps, undefined),
)(Index);
