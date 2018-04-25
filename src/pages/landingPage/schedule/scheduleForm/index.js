import React from 'react';
import { Component } from 'react';
import * as moment from 'moment';
import { Col, Grid, Row } from 'react-flexbox-grid';
import './style.css';
import { cutString } from '../../../../utils/stringSolve';

class ScheduleForm extends Component {
  render() {
    const events = this.props.events;
    const noData = (
      <div className="no-data">This conference has no specific calendar</div>
    );
    const content = events.map((event, index) => (
      <Row key={index}>
        <Col xs={3} className="event-time landing-page-th">
          <div>
            {moment(event.start).format('h:mm a')}
            <span> - </span>
            {moment(event.end).format('h:mm a')}
            <br />
            {moment(event.start).format('DD-MM-YYYY')}
          </div>
          <div>{event.schedules[0].room_name}</div>
        </Col>
        <Col xs={9} className="landing-page-th">
          <div className="landing-page-paper-title">{event.title}</div>
          <div className="event-description">
            {cutString(event.description, 300)}
          </div>
        </Col>
      </Row>
    ));
    return (
      <div className="event-body">
        <h1 className="schedule-title">Agenda</h1>
        <div className="schedule-content">
          <Grid className="landing-page-table">
            <Row>
              <Col xs={3} className="landing-page-papers-first-row">
                Time
              </Col>
              <Col xs={9} className="landing-page-papers-first-row">
                Program
              </Col>
            </Row>
            {content}
          </Grid>
          {!events[1] ? noData : ''}
        </div>
      </div>
    );
  }
}

export default ScheduleForm;
