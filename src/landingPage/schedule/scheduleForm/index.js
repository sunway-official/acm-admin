import React from 'react';
import { Component } from 'react';
import * as moment from 'moment';
import './style.css';

class ScheduleForm extends Component {
  render() {
    const events = this.props.events;
    const content = events.map((event, index) => (
      <tr key={index} className="event-detail landing-page-tr">
        <th className="event-time landing-page-th">
          {moment(event.start).format('h:mm a')}
          <span> - </span>
          {moment(event.end).format('h:mm a')}
          <br />
          {moment(event.start).format('DD-MM-YYYY')}
        </th>
        <th className="landing-page-th">
          <h3 className="event-title">{event.title}</h3>
          <div className="event-description">{event.description}</div>
        </th>
      </tr>
    ));
    return (
      <div className="event-body">
        <h1 className="schedule-title">Agenda</h1>
        <div className="schedule-content">
          <table className="landing-page-table">
            <thead className="landing-page-thead">
              <tr className="landing-page-tr">
                <th className="table-title landing-page-th">Time</th>
                <th className="table-title landing-page-th">Program</th>
              </tr>
            </thead>
            <tbody className="landing-page-tbody">{content}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ScheduleForm;
