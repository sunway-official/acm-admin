import React from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import events from './events';
import AddActivity from './addActivity';
import EditActivity from './editActivity';
import { Dialog, IconButton } from 'material-ui';
import { NavigationClose } from 'material-ui/svg-icons';

import {
  getEvents,
  GET_ACTIVITIES_BY_CONFERENCE_ID_QUERY,
  getDateTime,
  INSERT_SCHEDULE_MUTATION,
  INSERT_ACTIVITY_MUTATION,
} from './graphql';
import { graphql, compose } from 'react-apollo';

const style = {
  margin: '200px',
};

BigCalendar.momentLocalizer(moment);

class MyCalendar extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleEdit = this.handleEdit.bind(this);
    this.state = {
      events: events,
      openEdit: false,
    };
    this.submit = this.submit.bind(this);
  }
  handleEdit(events) {
    this.setState({ openEdit: true, events: events });
  }

  handleClose = () => {
    this.setState({ openEdit: false });
  };

  submit(values) {
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
          const newStarTime = getDateTime(schedule.date, schedule.startTime);
          const newEndTime = getDateTime(schedule.date, schedule.endTime);
          INSERT_SCHEDULE_MUTATION({
            variables: {
              activity_id: data.insertActivity.id,
              room_id: schedule.room,
              start: newStarTime,
              end: newEndTime,
            },
            refetchQueries: [
              {
                query: GET_ACTIVITIES_BY_CONFERENCE_ID_QUERY,
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

  render() {
    const { loading, getActivitiesByConferenceID } = this.props.data;

    if (loading) return <div>loading</div>;

    const myEvents = getEvents(getActivitiesByConferenceID);

    return (
      <div style={style}>
        <AddActivity onSubmit={this.submit} />
        <Dialog open={this.state.openEdit}>
          <EditActivity events={this.state.events} />
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
          events={events.concat(myEvents)}
          defaultView="week"
          defaultDate={new Date()}
          onSelectEvent={events => {
            this.handleEdit(events);
          }}
        />
      </div>
    );
  }
}

export default compose(
  graphql(GET_ACTIVITIES_BY_CONFERENCE_ID_QUERY, {
    options: ownProps => ({
      variables: { conference_id: ownProps.match.params.id },
    }),
  }),
  graphql(INSERT_ACTIVITY_MUTATION, {
    name: 'INSERT_ACTIVITY_MUTATION',
  }),
  graphql(INSERT_SCHEDULE_MUTATION, {
    name: 'INSERT_SCHEDULE_MUTATION',
  }),
)(MyCalendar);
