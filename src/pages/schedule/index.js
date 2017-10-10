import React from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import events from './events';
import AddDialog from './addDialog';
import { gql, graphql } from 'react-apollo';

const style = {
  margin: '200px',
};

const getEvents = array => {
  let myEvents = [];
  array.map(item => {
    item.schedules.map(schedule => {
      const start = new Date(schedule.start);
      const setStart = new Date(start.setHours(start.getHours() - 7));

      const end = new Date(schedule.end);
      const setEnd = new Date(end.setHours(end.getHours() - 7));

      const event = {
        title: item.title,
        start: setStart,
        end: setEnd,
        desc: schedule.room.name,
      };
      myEvents.push(event);
    });
  });

  return myEvents;
};

BigCalendar.momentLocalizer(moment);

class MyCalendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      events: events,
    };
  }

  render() {
    const { loading, getActivitiesByConferenceID } = this.props.data;

    if (loading) return <div>loading</div>;

    const myEvents = getEvents(getActivitiesByConferenceID);

    return (
      <div style={style}>
        <AddDialog
          conferenceId={this.props.match.params.id}
          onSubmit={() => {}}
        />
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

export const GET_ACTIVITIES_BY_CONFERENCE_ID_QUERY = gql`
  query getActivitiesByConferenceID($conference_id: ID!) {
    getActivitiesByConferenceID(conference_id: $conference_id) {
      id
      title
      schedules {
        start
        end
        room {
          id
          name
        }
      }
    }
  }
`;

const MyCalendarData = graphql(GET_ACTIVITIES_BY_CONFERENCE_ID_QUERY, {
  options: ownProps => ({
    variables: { conference_id: ownProps.match.params.id },
  }),
})(MyCalendar);

export default MyCalendarData;
