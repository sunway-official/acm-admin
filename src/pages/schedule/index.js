import React from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import AddActivity from './addActivity';
import EditActivity from './editActivity';
import { Dialog, IconButton } from 'material-ui';
import { NavigationClose } from 'material-ui/svg-icons';
import { scheduleActions, scheduleOperations } from 'store/ducks/schedule';
import { connect } from 'react-redux';

import { functions, queries, mutations } from './helpers';
import { graphql, compose } from 'react-apollo';

const style = {
  margin: '200px',
};

BigCalendar.momentLocalizer(moment);

class MyCalendar extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleEdit = this.handleEdit.bind(this);
    this.addActivity = this.addActivity.bind(this);
    this.editActivity = this.editActivity.bind(this);
  }
  handleEdit(event) {
    this.props.toggleEdit();
    this.props.setEvent(event);
  }

  handleClose = () => {
    this.props.toggleEdit();
  };

  addActivity(values) {
    const { INSERT_ACTIVITY_MUTATION, INSERT_SCHEDULE_MUTATION } = this.props;

    const conferenceId = this.props.match.params.id;

    INSERT_ACTIVITY_MUTATION({
      variables: {
        conference_id: conferenceId,
        title: values.title,
      },
    })
      .then(({ data }) => {
        // eslint-disable-next-line array-callback-return
        values.schedules.map(schedule => {
          const newStarTime = functions.getDateTime(
            schedule.date,
            schedule.startTime,
          );
          const newEndTime = functions.getDateTime(
            schedule.date,
            schedule.endTime,
          );
          INSERT_SCHEDULE_MUTATION({
            variables: {
              activity_id: data.insertActivity.id,
              room_id: schedule.room,
              start: newStarTime,
              end: newEndTime,
            },
            refetchQueries: [
              {
                query: queries.GET_ACTIVITIES_BY_CONFERENCE_ID_QUERY,
                variables: { conference_id: conferenceId },
              },
            ],
          });
        });
      })
      .catch(error => {
        console.log('there was an error sending the query', error);
      });
  }

  editActivity(values) {
    const { UPDATE_ACTIVITY_MUTATION, UPDATE_SCHEDULE_MUTATION } = this.props;
    const conferenceId = this.props.match.params.id;

    UPDATE_ACTIVITY_MUTATION({
      variables: {
        id: values.id,
        title: values.title,
      },
    })
      .then(({ data }) => {
        const newStarTime = functions.getDateTime(
          values.date,
          values.startTime,
        );
        const newEndTime = functions.getDateTime(values.date, values.endTime);
        // eslint-disable-next-line array-callback-return
        UPDATE_SCHEDULE_MUTATION({
          variables: {
            id: values.scheduleId,
            start: newStarTime,
            end: newEndTime,
            room_id: values.room,
          },
          refetchQueries: [
            {
              query: queries.GET_ACTIVITIES_BY_CONFERENCE_ID_QUERY,
              variables: { conference_id: conferenceId },
            },
          ],
        });
      })
      .catch(error => {
        console.log('there was an error sending the query', error);
      });
  }

  render() {
    const { loading, getActivitiesByConferenceID } = this.props.data;

    if (loading) return <div>loading</div>;

    const events = functions.getEvents(getActivitiesByConferenceID);
    const rooms = this.props.GET_ALL_ROOM_QUERY.getAllRooms;

    return (
      <div style={style}>
        <AddActivity onSubmit={this.addActivity} rooms={rooms} />
        <Dialog open={this.props.openEdit}>
          <EditActivity onSubmit={this.editActivity} rooms={rooms} />
          <IconButton
            tooltip="Close"
            className="cancel-btn dialog"
            onClick={this.handleClose}
          >
            <NavigationClose />
          </IconButton>
        </Dialog>
        <BigCalendar
          popup
          events={events}
          defaultView="week"
          defaultDate={new Date()}
          onSelectEvent={event => {
            this.handleEdit(event);
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    openEdit: state.schedule.openEditFormModal,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleEdit: () => dispatch(scheduleActions.toggleEditActivityFormModal()),
    setEvent: event => dispatch(scheduleOperations.setEventOperation(event)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(queries.GET_ACTIVITIES_BY_CONFERENCE_ID_QUERY, {
    options: ownProps => ({
      variables: { conference_id: ownProps.match.params.id },
    }),
  }),
  graphql(queries.GET_ALL_ROOM_QUERY, {
    name: 'GET_ALL_ROOM_QUERY',
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
)(MyCalendar);
