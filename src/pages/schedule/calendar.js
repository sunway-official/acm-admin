import React from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import AddActivity from './addActivity';
import EditActivity from './editActivity';
import { Dialog, IconButton, Subheader, Toggle } from 'material-ui';
import { Link } from 'react-router-dom';
import { scheduleActions, scheduleOperations } from 'store/ducks/schedule';
import { connect } from 'react-redux';

import {
  NavigationClose,
  HardwareKeyboardArrowRight,
  ActionHome,
} from 'material-ui/svg-icons';

import { functions, queries, mutations } from './helpers';
import { graphql, compose } from 'react-apollo';

BigCalendar.momentLocalizer(moment);

const style = {
  width: '94%',
  padding: '20px',
};

class MyCalendar extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleEdit = this.handleEdit.bind(this);
    this.addActivity = this.addActivity.bind(this);
    this.editActivity = this.editActivity.bind(this);
    this.handleTimeFormat = this.handleTimeFormat.bind(this);
    this.state = {
      timeFormat: 7,
    };
  }
  handleEdit(event) {
    this.props.toggleEdit();
    this.props.setEvent(event);
  }

  handleTimeFormat() {
    this.state.timeFormat === 7
      ? this.setState({
          timeFormat: 0,
        })
      : this.setState({
          timeFormat: 7,
        });
  }

  addActivity(values) {
    this.props.toggleAdd();
    const { INSERT_ACTIVITY_MUTATION, INSERT_SCHEDULE_MUTATION } = this.props;

    const conferenceId = this.props.conference.id;

    INSERT_ACTIVITY_MUTATION({
      variables: {
        conference_id: conferenceId,
        title: values.title,
        description: values.description,
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
              conference_id: conferenceId,
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
  // deleteIds
  editActivity(values) {
    console.log(values);
    const schedules = values.schedules;
    const {
      UPDATE_ACTIVITY_MUTATION,
      UPDATE_SCHEDULE_MUTATION,
      DELETE_SCHEDULE_MUTATION,
      INSERT_SCHEDULE_MUTATION,
    } = this.props;
    const conferenceId = this.props.conference.id;
    this.props.toggleEdit();
    UPDATE_ACTIVITY_MUTATION({
      variables: {
        id: values.id,
        title: values.title,
        description: values.description,
      },
    })
      .then(() => {
        const deleteIds = this.props.deleteIds;
        // xoa schedule
        if (deleteIds) {
          deleteIds.map(id => {
            DELETE_SCHEDULE_MUTATION({
              variables: {
                id: id,
              },
            });
          });
        }

        // lap va update schedule
        schedules.map((schedule, index) => {
          const newStarTime = functions.getDateTime(
            schedule.date,
            schedule.startTime,
          );

          const newEndTime = functions.getDateTime(
            schedule.date,
            schedule.endTime,
          );
          // eslint-disable-next-line array-callback-return
          if (schedule.id) {
            if (index < schedules.length - 1) {
              UPDATE_SCHEDULE_MUTATION({
                variables: {
                  id: schedule.id,
                  activity_id: values.id,
                  start: newStarTime,
                  end: newEndTime,
                  room_id: schedule.room,
                },
              });
            } else {
              UPDATE_SCHEDULE_MUTATION({
                variables: {
                  id: schedule.id,
                  activity_id: values.id,
                  start: newStarTime,
                  end: newEndTime,
                  room_id: schedule.room,
                },
                refetchQueries: [
                  {
                    query: queries.GET_ACTIVITIES_BY_CONFERENCE_ID_QUERY,
                    variables: { conference_id: conferenceId },
                  },
                ],
              });
            }
          } else {
            INSERT_SCHEDULE_MUTATION({
              variables: {
                activity_id: values.id,
                room_id: schedule.room,
                conference_id: conferenceId,
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
          }
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
    const start_date = this.props.conference.start_date;
    const end_date = this.props.conference.end_date;

    const today = new Date();

    return (
      <div className="conference">
        <Subheader className="subheader">Activity Schedule</Subheader>
        <div className="page-breadcrumb d-flex">
          <Link className="d-flex" to="/">
            <IconButton>
              <ActionHome />
            </IconButton>
            <span>Home</span>
          </Link>
          <IconButton>
            <HardwareKeyboardArrowRight />
          </IconButton>
          <span>Activity Schedule</span>
        </div>
        <div className="dashboard content d-flex">
          <BigCalendar
            style={style}
            popup
            events={events}
            defaultView="week"
            defaultDate={new Date()}
            onSelectEvent={event => {
              this.handleEdit(event);
            }}
            min={
              new Date(
                today.getFullYear(),
                today.getMonth(),
                today.getDate(),
                this.state.timeFormat,
              )
            }
          />
          <AddActivity
            onSubmit={this.addActivity}
            rooms={rooms}
            start_date={start_date}
            end_date={end_date}
          />
          <div>
            <Toggle label="Format 24h" onToggle={this.handleTimeFormat} />
          </div>
        </div>

        <Dialog
          open={this.props.openEdit}
          title="Edit Activity Schedule Information"
          autoScrollBodyContent={true}
        >
          <EditActivity
            onSubmit={this.editActivity}
            rooms={rooms}
            conferenceId={this.props.conference.id}
            start_date={start_date}
            end_date={end_date}
          />
          <IconButton
            tooltip="Close"
            className="cancel-btn dialog"
            onClick={() => this.props.toggleEdit()}
          >
            <NavigationClose />
          </IconButton>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    openEdit: state.schedule.openEditFormModal,
    deleteIds: state.schedule.deleteIds,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleAdd: () => dispatch(scheduleActions.toggleAddActivityFormModal()),
    toggleEdit: () => dispatch(scheduleActions.toggleEditActivityFormModal()),
    setEvent: event => dispatch(scheduleOperations.setEventOperation(event)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(queries.GET_ACTIVITIES_BY_CONFERENCE_ID_QUERY, {
    options: ownProps => ({
      variables: { conference_id: ownProps.conference.id },
    }),
  }),
  graphql(queries.GET_ALL_ROOM_QUERY, {
    name: 'GET_ALL_ROOM_QUERY',
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
)(MyCalendar);
