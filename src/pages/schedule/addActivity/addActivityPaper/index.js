import React, { Component } from 'react';
import { Subheader, IconButton } from 'material-ui';
import { Link } from 'react-router-dom';
import { ActionHome, HardwareKeyboardArrowRight } from 'material-ui/svg-icons';
import AddActivityPaper from './addActivityPaper';
import {
  queries,
  mutations,
  addActivityWithPaperFunc,
  functions,
} from '../../helpers';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class Index extends Component {
  constructor() {
    super();
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleAdd(values) {
    const {
      INSERT_ACTIVITY_WITH_PAPER_ID_MUTATION,
      INSERT_SCHEDULE_MUTATION,
    } = this.props;
    const data = {
      INSERT_ACTIVITY_WITH_PAPER_ID_MUTATION,
      INSERT_SCHEDULE_MUTATION,
      values,
    };
    this.props.history.replace('/conference/activities');
    addActivityWithPaperFunc(data);
  }

  render() {
    // loading
    const loadingPapers = this.props.GET_PAPER_BY_CONFERENCE_ID.loading;
    const loadingRooms = this.props.GET_ROOMS_BY_STATUS_IN_CONFERENCE_QUERY
      .loading;
    const loadingActivities = this.props.GET_ACTIVITIES_BY_CONFERENCE_ID_QUERY
      .loading;

    // get data
    const { getPapersByConferenceID } = this.props.GET_PAPER_BY_CONFERENCE_ID;
    const {
      getActivitiesByConferenceID,
    } = this.props.GET_ACTIVITIES_BY_CONFERENCE_ID_QUERY;
    const {
      getRoomsByStatusInConference,
    } = this.props.GET_ROOMS_BY_STATUS_IN_CONFERENCE_QUERY;

    // check loading
    if (loadingPapers || loadingRooms || loadingActivities) {
      return <div>Loading...</div>;
    }
    const papers = getPapersByConferenceID;
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
          <span>Add Activity with Paper</span>
        </div>
        <div className="dashboard  content d-flex">
          <AddActivityPaper
            papers={papers}
            rooms={rooms}
            start_date={start_date}
            end_date={end_date}
            allSchedules={allSchedules}
            onSubmit={this.handleAdd}
            status="with-paper"
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
  graphql(queries.GET_ACTIVITIES_BY_CONFERENCE_ID_QUERY, {
    name: 'GET_ACTIVITIES_BY_CONFERENCE_ID_QUERY',
  }),
  graphql(queries.GET_PAPER_BY_CONFERENCE_ID, {
    name: 'GET_PAPER_BY_CONFERENCE_ID',
  }),

  graphql(mutations.INSERT_ACTIVITY_WITH_PAPER_ID_MUTATION, {
    name: 'INSERT_ACTIVITY_WITH_PAPER_ID_MUTATION',
  }),
  graphql(mutations.INSERT_SCHEDULE_MUTATION, {
    name: 'INSERT_SCHEDULE_MUTATION',
  }),
  graphql(queries.GET_ROOMS_BY_STATUS_IN_CONFERENCE_QUERY, {
    options: {
      variables: { status: 'on' },
    },
    name: 'GET_ROOMS_BY_STATUS_IN_CONFERENCE_QUERY',
  }),
)(Index);
