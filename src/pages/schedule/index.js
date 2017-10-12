import React from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import events from './events';
import AddActivity from './addActivity';

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

class MyCalendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      events: events,
    };
    this.submit = this.submit.bind(this);
  }

  submit(values) {
    const { INSERT_ACTIVITY_MUTATION, INSERT_SCHEDULE_MUTATION } = this.props;

    const conferenceId = this.props.match.params.id;
    console.log(values);

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
        <BigCalendar
          popup
          events={events.concat(myEvents)}
          defaultView="week"
          defaultDate={new Date()}
          onSelectEvent={event => console.log(event)}
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
