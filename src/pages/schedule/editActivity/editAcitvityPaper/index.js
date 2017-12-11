import React, { Component } from 'react';
import { Subheader, IconButton } from 'material-ui';
import { Link } from 'react-router-dom';
import { ActionHome, HardwareKeyboardArrowRight } from 'material-ui/svg-icons';
import EditActivityPaper from './editActivityPaper';
import {
  queries,
  mutations,
  functions,
  editActivityWithPaperFunc,
} from '../../helpers';
import { graphql, compose, withApollo } from 'react-apollo';
import { connect } from 'react-redux';
// import { withRouter } from 'react-router';
import Loading from '../../../../components/render/renderLoading';

class Index extends Component {
  constructor() {
    super();
    this.handleEdit = this.handleEdit.bind(this);
  }

  // deleteIds
  handleEdit(values) {
    console.log(values);
    values.id = this.props.match.params.id;
    const {
      UPDATE_ACTIVITY_WITH_PAPER_ID_MUTATION,
      UPDATE_SCHEDULE_MUTATION,
      DELETE_SCHEDULE_MUTATION,
      INSERT_SCHEDULE_MUTATION,
    } = this.props;
    const conferenceId = this.props.conference.id;
    const deleteIds = this.props.deleteIds;
    console.log(deleteIds);
    const data = {
      UPDATE_ACTIVITY_WITH_PAPER_ID_MUTATION,
      conferenceId,
      values,
      DELETE_SCHEDULE_MUTATION,
      UPDATE_SCHEDULE_MUTATION,
      INSERT_SCHEDULE_MUTATION,
      deleteIds,
    };

    editActivityWithPaperFunc(data);
    this.props.history.replace('/conference/activities');
  }

  render() {
    // loading
    const loadingRooms = this.props.GET_ROOMS_BY_STATUS_IN_CONFERENCE_QUERY
      .loading;
    const loadingActivity = this.props.GET_ACTIVITY_PAPER_BY_ID_QUERY.loading;
    const loadingActivities = this.props.GET_ACTIVITIES_BY_CONFERENCE_ID_QUERY
      .loading;
    const loadingTopics = this.props.GET_TOPICS_OF_CONFERENCE.loading;

    // get data
    const { getActivityByID } = this.props.GET_ACTIVITY_PAPER_BY_ID_QUERY;
    const {
      getActivitiesByConferenceID,
    } = this.props.GET_ACTIVITIES_BY_CONFERENCE_ID_QUERY;
    const {
      getRoomsByStatusInConference,
    } = this.props.GET_ROOMS_BY_STATUS_IN_CONFERENCE_QUERY;
    const { getTopicsOfConference } = this.props.GET_TOPICS_OF_CONFERENCE;

    // check loading
    if (loadingRooms || loadingActivity || loadingActivities || loadingTopics) {
      return <Loading />;
    }
    const rooms = getRoomsByStatusInConference;
    const topics = getTopicsOfConference;
    const events = functions.getEvents(getActivitiesByConferenceID);
    const allSchedules = functions.getAllSchedules(events);

    const conference = this.props.conference;
    const startDate = conference.start_date;
    const endDate = conference.end_date;

    const event = getActivityByID;
    const topicId = event.paper.papersTopic[0].topic.id;
    const initialValues = {
      topic: topicId,
      paper: event.paper.id,
    };
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
          <EditActivityPaper
            initialValues={initialValues}
            topics={topics}
            topic_id={topicId}
            rooms={rooms}
            event={event}
            allSchedules={allSchedules}
            start_date={startDate}
            end_date={endDate}
            onSubmit={this.handleEdit}
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
      deleteIds: state.schedule.deleteIds,
    };
  }
};

export default compose(
  withApollo,
  connect(mapStateToProps, undefined),
  graphql(queries.GET_ACTIVITIES_BY_CONFERENCE_ID_QUERY, {
    name: 'GET_ACTIVITIES_BY_CONFERENCE_ID_QUERY',
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
  graphql(queries.GET_ACTIVITY_PAPER_BY_ID_QUERY, {
    options: ownProps => ({
      variables: { id: ownProps.match.params.id },
    }),
    name: 'GET_ACTIVITY_PAPER_BY_ID_QUERY',
  }),
  graphql(mutations.DELETE_SCHEDULE_MUTATION, {
    name: 'DELETE_SCHEDULE_MUTATION',
  }),
  graphql(mutations.INSERT_ACTIVITY_MUTATION, {
    name: 'INSERT_ACTIVITY_MUTATION',
  }),
  graphql(mutations.INSERT_SCHEDULE_MUTATION, {
    name: 'INSERT_SCHEDULE_MUTATION',
  }),
  graphql(mutations.UPDATE_ACTIVITY_WITH_PAPER_ID_MUTATION, {
    name: 'UPDATE_ACTIVITY_WITH_PAPER_ID_MUTATION',
  }),
  graphql(mutations.UPDATE_SCHEDULE_MUTATION, {
    name: 'UPDATE_SCHEDULE_MUTATION',
  }),
)(Index);
