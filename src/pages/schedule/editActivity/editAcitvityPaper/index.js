import React, { Component } from 'react';
import { Subheader, IconButton } from 'material-ui';
import { Link } from 'react-router-dom';
import { ActionHome, HardwareKeyboardArrowRight } from 'material-ui/svg-icons';
import EditActivityPaper from './editActivityPaper';
import { queries } from '../../helpers';
import { graphql, compose } from 'react-apollo';
// import { connect } from 'react-redux';
// import { withRouter } from 'react-router';

class Index extends Component {
  render() {
    const loadingPapers = this.props.GET_PAPER_BY_CONFERENCE_ID.loading;
    const loadingRooms = this.props.GET_ROOMS_BY_STATUS_IN_CONFERENCE_QUERY
      .loading;
    const loadingTopics = this.props.GET_TOPICS_OF_CONFERENCE.loading;

    const { getPapersByConferenceID } = this.props.GET_PAPER_BY_CONFERENCE_ID;
    const {
      getRoomsByStatusInConference,
    } = this.props.GET_ROOMS_BY_STATUS_IN_CONFERENCE_QUERY;
    const { getTopicsOfConference } = this.props.GET_TOPICS_OF_CONFERENCE;

    if (loadingPapers || loadingRooms || loadingTopics) {
      return <div>Loading...</div>;
    }
    let papers, rooms, topics;
    if (getPapersByConferenceID) {
      papers = getPapersByConferenceID;
    }
    if (getRoomsByStatusInConference) {
      rooms = getRoomsByStatusInConference;
    }
    if (getTopicsOfConference) {
      topics = getTopicsOfConference;
    }
    return (
      <div className="conference">
        <Subheader className="subheader"> Activity Management</Subheader>
        <div className="page-breadcrumb d-flex">
          <Link className="d-flex" to="/conference/info">
            <IconButton>
              <ActionHome />
            </IconButton>
            <span>Home</span>
          </Link>
          <Link className="d-flex" to="/conference/activities">
            <IconButton>
              <HardwareKeyboardArrowRight />
            </IconButton>
            <span>Activity Schedule</span>
          </Link>
          <IconButton>
            <HardwareKeyboardArrowRight />
          </IconButton>
          <span>Edit Activity</span>
        </div>
        <div className="dashboard  content d-flex">
          <EditActivityPaper papers={papers} rooms={rooms} topics={topics} />
        </div>
      </div>
    );
  }
}
export default compose(
  graphql(queries.GET_PAPER_BY_CONFERENCE_ID, {
    name: 'GET_PAPER_BY_CONFERENCE_ID',
  }),
  graphql(queries.GET_TOPICS_OF_CONFERENCE, {
    name: 'GET_TOPICS_OF_CONFERENCE',
  }),
  graphql(queries.GET_ROOMS_BY_STATUS_IN_CONFERENCE_QUERY, {
    options: {
      variables: { status: 'on' },
    },
    name: 'GET_ROOMS_BY_STATUS_IN_CONFERENCE_QUERY',
  }),
)(Index);
