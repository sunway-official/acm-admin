import React from 'react';
import { Component } from 'react';
import * as moment from 'moment';
import './style.css';

class ScheduleForm extends Component {
  render() {
    const events = this.props.events;
    const content = events.map((event, index) => (
      <tr key={index} className="event-detail">
        <th className="event-time">
          {moment(event.start).format('h:mm a')}
          <span> - </span>
          {moment(event.end).format('h:mm a')}
          <br />
          {moment(event.start).format('DD-MM-YYYY')}
        </th>
        <th>
          <h3 className="event-title">{event.title}</h3>
          <div className="event-description">{event.description}</div>
        </th>
      </tr>
    ));
    return (
      <div className="event-body">
        <h1 className="schedule-title">Agenda</h1>
        <div className="schedule-content">
          <table>
            <thead className="landing-page-thead">
              <tr>
                <th className="table-title">Time</th>
                <th className="table-title">Program</th>
              </tr>
            </thead>
            <tbody>{content}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ScheduleForm;
