import React from 'react';
import { Component } from 'react';
import * as moment from 'moment';
import './style.css';

class ScheduleForm extends Component {
  render() {
    const events = this.props.events;
    const content = events.map((event, index) => (
      <div key={index} className="event-detail">
        <div className="event-time">
          {moment(event.start).format('h:mm a')}
          <span> to </span>
          {moment(event.end).format('h:mm a')}
          <span> </span>
          {moment(event.start).format('DD-MM-YYYY')}
        </div>
        <h1 className="event-title">{event.title}</h1>
        <div className="event-description">{event.description}</div>
      </div>
    ));
    return (
      <div className="event-body">
        <h1 className="schedule-title">Agenda</h1>
        <div className="schedule-content">{content}</div>
      </div>
    );
  }
}

export default ScheduleForm;

// const content = events.map(event => (
//   <div key={i++}>
//     <div>{event.title}</div>
//     <div>{event.description}</div>
//     <div>{moment(event.start).format('h:mm:ss a')}</div>
//     <div>{moment(event.end).format('h:mm:ss a')}</div>
//     <br />
//   </div>
// ));

// array.push(
//   <div key={key++} className="event-date">
//     {moment(events[i].start).format('DD-MM-YYYY')}
//   </div>,
// );
// for (i; i < events.length - 1; i++) {
//   array.push(
//     <div key={key++} className="event-detail">
//       <div className="event-title">{events[i].title}</div>
//       <div className="event-description">{events[i].description}</div>
//       <div className="event-start">
//         {moment(events[i].start).format('h:mm:ss a')}
//       </div>
//       <div className="event-end">
//         {moment(events[i].end).format('h:mm:ss a')}
//       </div>
//       <br />
//     </div>,
//   );
//   if (!moment(events[i].start).isSame(events[i + 1].start, 'day')) {
//     array.push(
//       <div key={key++} className="event-date">
//         {moment(events[i + 1].start).format('DD-MM-YYYY')}
//       </div>,
//     );
//   }
// }
// array.push(
//   <div key={key++} className="event-detail">
//     <div className="event-title">{events[events.length - 1].title}</div>
//     <div className="event-description">
//       {events[events.length - 1].description}
//     </div>
//     <div className="event-start">
//       {moment(events[events.length - 1].start).format('h:mm:ss a')}
//     </div>
//     <div className="event-end">
//       {moment(events[events.length - 1].end).format('h:mm:ss a')}
//     </div>
//     <br />
//   </div>,
// );
