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
