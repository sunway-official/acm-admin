import React from 'react';
import { Component } from 'react';
import * as moment from 'moment';

class ScheduleForm extends Component {
  render() {
    const events = this.props.events;
    var i = 0;
    console.log(events);
    const content = events.map(event => (
      <div key={i++}>
        <div>{event.title}</div>
        <div>{event.description}</div>
        <div>{moment(event.start).format('h:mm:ss a')}</div>
        <div>{moment(event.end).format('h:mm:ss a')}</div>
        <br />
      </div>
    ));
    return <div> {content} </div>;
  }
}

export default ScheduleForm;
