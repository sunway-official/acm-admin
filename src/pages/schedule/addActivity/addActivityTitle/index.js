import React, { Component } from 'react';
import { Subheader, IconButton } from 'material-ui';
import { Link } from 'react-router-dom';
import { ActionHome, HardwareKeyboardArrowRight } from 'material-ui/svg-icons';
import AddActivityTitle from './addActivityTitle';
import { queries, functions, addActivityFunc, mutations } from '../../helpers';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Loading from '../../../../components/render/renderLoading';

class Index extends Component {
  constructor() {
    super();
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleAdd(values) {
    console.log(values);
    const { INSERT_ACTIVITY_MUTATION, INSERT_SCHEDULE_MUTATION } = this.props;
    const data = {
      INSERT_ACTIVITY_MUTATION,
      INSERT_SCHEDULE_MUTATION,
      values,
    };
    addActivityFunc(data);
    this.props.history.replace('/conference/activities');
  }

  render() {
    const {
      getRoomsByStatusInConference,
    } = this.props.GET_ROOMS_BY_STATUS_IN_CONFERENCE_QUERY;
    const loadingRooms = this.props.GET_ROOMS_BY_STATUS_IN_CONFERENCE_QUERY
      .loading;
    const loadingActivities = this.props.GET_ACTIVITIES_BY_CONFERENCE_ID_QUERY
      .loading;
    if (loadingRooms || loadingActivities) {
      return <Loading />;
    }
    const {
      getActivitiesByConferenceID,
    } = this.props.GET_ACTIVITIES_BY_CONFERENCE_ID_QUERY;

    const rooms = getRoomsByStatusInConference;
    const events = functions.getEvents(getActivitiesByConferenceID);
    const allSchedules = functions.getAllSchedules(events);
    const conference = this.props.conference;
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
            allSchedules={allSchedules}
            status="without-paper"
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
  graphql(queries.GET_ACTIVITIES_BY_CONFERENCE_ID_QUERY, {
    name: 'GET_ACTIVITIES_BY_CONFERENCE_ID_QUERY',
  }),
  graphql(mutations.INSERT_ACTIVITY_MUTATION, {
    name: 'INSERT_ACTIVITY_MUTATION',
  }),
  graphql(mutations.INSERT_SCHEDULE_MUTATION, {
    name: 'INSERT_SCHEDULE_MUTATION',
  }),
)(Index);
