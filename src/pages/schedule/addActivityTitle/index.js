import React, { Component } from 'react';
import { Subheader, IconButton } from 'material-ui';
import { Link } from 'react-router-dom';
import { ActionHome, HardwareKeyboardArrowRight } from 'material-ui/svg-icons';
import AddActivityTitle from './addActivityTitle';
import { queries } from '../helpers';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class Index extends Component {
  constructor() {
    super();
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleAdd(values) {
    console.log(values);
    // const {
    //   INSERT_ACTIVITY_WITH_PAPER_ID_MUTATION,
    //   INSERT_SCHEDULE_MUTATION,
    // } = this.props;
    // const conferenceId = this.props.conference.id;
    // console.log(conferenceId);
    // const data = {
    //   INSERT_ACTIVITY_WITH_PAPER_ID_MUTATION,
    //   INSERT_SCHEDULE_MUTATION,
    //   conferenceId,
    //   values,
    // };
    // console.log('done');
    // this.props.history.replace('/conference/activities');
    // addActivityFunc(data);
  }

  render() {
    const {
      getRoomsByStatusInConference,
    } = this.props.GET_ROOMS_BY_STATUS_IN_CONFERENCE_QUERY;
    const loadingRooms = this.props.GET_ROOMS_BY_STATUS_IN_CONFERENCE_QUERY
      .loading;
    if (loadingRooms) {
      return <div>Loading...</div>;
    }
    let rooms;
    if (getRoomsByStatusInConference) {
      rooms = getRoomsByStatusInConference;
    }
    const conference = this.props.conference;
    if (!conference) return <div>Loading</div>;
    const start_date = conference.start_date;
    const end_date = conference.end_date;
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
          <span>Add Activity</span>
        </div>
        <div className="dashboard  content d-flex">
          <AddActivityTitle
            rooms={rooms}
            start_date={start_date}
            end_date={end_date}
            // allSchedules={allSchedules}
            onSubmit={this.handleAdd}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  if (state.auth.currentUser.currentConference) {
    return {
      conference: state.auth.currentUser.currentConference,
    };
  }
};

export default compose(
  withRouter,

  connect(mapStateToProps, undefined),
  graphql(queries.GET_ROOMS_BY_STATUS_IN_CONFERENCE_QUERY, {
    options: {
      variables: { status: 'on' },
    },
    name: 'GET_ROOMS_BY_STATUS_IN_CONFERENCE_QUERY',
  }),
)(Index);
