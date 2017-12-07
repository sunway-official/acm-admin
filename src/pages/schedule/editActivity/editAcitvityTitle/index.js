import React, { Component } from 'react';
import { Subheader, IconButton } from 'material-ui';
import { Link } from 'react-router-dom';
import { ActionHome, HardwareKeyboardArrowRight } from 'material-ui/svg-icons';
import EditActivityTitle from './editActivityTitle';
import { queries } from '../../helpers';
import { graphql, compose } from 'react-apollo';
// import { connect } from 'react-redux';
// import { withRouter } from 'react-router';

class Index extends Component {
  render() {
    const loadingRooms = this.props.GET_ROOMS_BY_STATUS_IN_CONFERENCE_QUERY
      .loading;
    const {
      getRoomsByStatusInConference,
    } = this.props.GET_ROOMS_BY_STATUS_IN_CONFERENCE_QUERY;
    if (loadingRooms) {
      return <div>Loading...</div>;
    }

    let rooms;
    if (getRoomsByStatusInConference) {
      rooms = getRoomsByStatusInConference;
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
          <EditActivityTitle rooms={rooms} />
        </div>
      </div>
    );
  }
}

export default compose(
  graphql(queries.GET_ROOMS_BY_STATUS_IN_CONFERENCE_QUERY, {
    options: {
      variables: { status: 'on' },
    },
    name: 'GET_ROOMS_BY_STATUS_IN_CONFERENCE_QUERY',
  }),
)(Index);
