import React, { Component } from 'react';
import { Subheader, IconButton } from 'material-ui';
import { Link } from 'react-router-dom';
import { ActionHome, HardwareKeyboardArrowRight } from 'material-ui/svg-icons';
import EditActivityTitle from './editActivityTitle';
import { queries, mutations, functions, editActivityFunc } from '../../helpers';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { alertOptions, MyFaCheck } from 'theme/alert';
import AlertContainer from 'react-alert';
import Loading from '../../../../components/render/renderLoading';
class Index extends Component {
  constructor() {
    super();
    this.handleEdit = this.handleEdit.bind(this);
  }
  showAlertSuccess = () => {
    this.msg.success('Saved!', {
      type: 'success',
      icon: <MyFaCheck />,
      onClose: () => {
        this.props.history.replace('/conference/activities');
      },
    });
  };
  // deleteIds
  handleEdit(values) {
    values.id = this.props.match.params.id;
    const {
      UPDATE_ACTIVITY_MUTATION,
      UPDATE_SCHEDULE_MUTATION,
      DELETE_SCHEDULE_MUTATION,
      INSERT_SCHEDULE_MUTATION,
    } = this.props;
    const conferenceId = this.props.conference.id;
    const deleteIds = this.props.deleteIds;
    const data = {
      UPDATE_ACTIVITY_MUTATION,
      conferenceId,
      values,
      DELETE_SCHEDULE_MUTATION,
      UPDATE_SCHEDULE_MUTATION,
      INSERT_SCHEDULE_MUTATION,
      deleteIds,
    };

    editActivityFunc(data);
    this.showAlertSuccess();
  }

  render() {
    // loading
    const loadingRooms = this.props.GET_ROOMS_BY_STATUS_IN_CONFERENCE_QUERY
      .loading;
    const loadingActivity = this.props.GET_ACTIVITY_BY_ID_QUERY.loading;
    const loadingActivities = this.props.GET_ACTIVITIES_BY_CONFERENCE_ID_QUERY
      .loading;

    const { getActivityByID } = this.props.GET_ACTIVITY_BY_ID_QUERY;
    const {
      getActivitiesByConferenceID,
    } = this.props.GET_ACTIVITIES_BY_CONFERENCE_ID_QUERY;
    const {
      getRoomsByStatusInConference,
    } = this.props.GET_ROOMS_BY_STATUS_IN_CONFERENCE_QUERY;

    // check loading
    if (loadingRooms || loadingActivity || loadingActivities) {
      return <Loading />;
    }
    const rooms = getRoomsByStatusInConference;
    const events = functions.getEvents(getActivitiesByConferenceID);
    const allSchedules = functions.getAllSchedules(events);

    const conference = this.props.conference;
    const startDate = conference.start_date;
    const endDate = conference.end_date;

    const event = getActivityByID;
    const initialValues = {
      title: event.title,
      description: event.description,
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
          <EditActivityTitle
            rooms={rooms}
            initialValues={initialValues}
            event={event}
            start_date={startDate}
            end_date={endDate}
            allSchedules={allSchedules}
            onSubmit={this.handleEdit}
            status="without-paper"
          />
        </div>
        <AlertContainer ref={a => (this.msg = a)} {...alertOptions} />
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
  graphql(queries.GET_ACTIVITY_BY_ID_QUERY, {
    options: ownProps => ({
      variables: { id: ownProps.match.params.id },
    }),
    name: 'GET_ACTIVITY_BY_ID_QUERY',
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
  graphql(mutations.UPDATE_ACTIVITY_MUTATION, {
    name: 'UPDATE_ACTIVITY_MUTATION',
  }),
  graphql(mutations.UPDATE_SCHEDULE_MUTATION, {
    name: 'UPDATE_SCHEDULE_MUTATION',
  }),
)(Index);
