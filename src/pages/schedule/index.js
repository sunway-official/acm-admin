import React from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import events from './events';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
// import AddDialog from './addDialog';
import AddDialog from './add';
import { gql, graphql } from 'react-apollo';

import 'react-big-calendar/lib/less/styles.less';
import './styles.less';
import './prism.less';
const DragAndDropCalendar = withDragAndDrop(BigCalendar);

const style = {
  margin: '200px',
};
// const createDateAsUTC = date => {
//   return new Date(
//     Date.UTC(
//       date.getFullYear(),
//       date.getMonth(),
//       date.getDate(),
//       date.getHours(),
//       date.getMinutes(),
//     ),
//   );
// };

const getEvents = array => {
  let myEvents = [];
  array.map(item => {
    item.schedules.map(schedule => {
      const start = new Date(schedule.start);
      const setStart = new Date(start.setHours(start.getHours() - 7));
      console.log(setStart);

      const end = new Date(schedule.end);
      const setEnd = new Date(end.setHours(end.getHours() - 7));

      console.log(setEnd);
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

    this.moveEvent = this.moveEvent.bind(this);
    this.setEvents = this.setEvents.bind(this);
  }

  setEvents(events) {
    this.setState({
      events: events,
    });
  }

  moveEvent({ event, start, end }) {
    const { events } = this.state;

    const idx = events.indexOf(event);
    const updatedEvent = { ...event, start, end };

    const nextEvents = [...events];
    nextEvents.splice(idx, 1, updatedEvent);

    this.setState({
      events: nextEvents,
    });

    alert(`${event.title} was dropped onto ${event.start}`);
  }

  render() {
    const { loading, getActivitiesByConferenceID } = this.props.data;

    if (loading) return <div>loading</div>;

    const myEvents = getEvents(getActivitiesByConferenceID);

    return (
      <div style={style}>
        <AddDialog onSubmit={() => {}} />
        <DragAndDropCalendar
          selectable
          events={events.concat(myEvents)}
          onEventDrop={this.moveEvent}
          defaultView="week"
          defaultDate={new Date()}
          onSelectEvent={event => console.log(event)}
          onSelectSlot={slotInfo =>
            alert(
              `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
                `\nend: ${slotInfo.end.toLocaleString()}`,
            )}
        />
      </div>
    );
  }
}

const GET_ACTIVITIES_BY_CONFERENCE_ID_QUERY = gql`
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

export default DragDropContext(HTML5Backend)(MyCalendarData);
