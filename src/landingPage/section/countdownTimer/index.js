import React from 'react';
import { Component } from 'react';
import { Col, Grid, Row } from 'react-flexbox-grid';
import './style.css';
import { images } from '../../../theme';
import * as moment from 'moment';

class CountDownTimer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }
  timeBetweenDates(toDate, timer) {
    var dateEntered = toDate;
    var now = new Date();
    var difference = dateEntered.getTime() - now.getTime();
    if (difference <= 0) {
      // Timer done
      clearInterval(timer);
    } else {
      var seconds = Math.floor(difference / 1000);
      var minutes = Math.floor(seconds / 60);
      var hours = Math.floor(minutes / 60);
      var days = Math.floor(hours / 24);

      hours %= 24;
      minutes %= 60;
      seconds %= 60;

      this.setState({ days, hours, minutes, seconds });
    }
  }
  componentWillMount() {
    let compareDate = new Date();
    let now = moment(new Date()); //todays date
    let end = moment(this.props.landingPage.conference.start_date); // another date
    let duration = moment.duration(end.diff(now));
    let days = duration.asDays();
    compareDate.setDate(compareDate.getDate() + days); // this is just a demo for 100 day
    let timer = setInterval(
      function() {
        this.timeBetweenDates(compareDate, timer);
      }.bind(this),
      1000,
    );
  }
  render() {
    return (
      <div id="timer-body">
        <img
          src={images.timer_background}
          alt=""
          className="timer-background-image"
        />
        <Grid fluid className="timer-grid">
          <Row around="xs">
            <Col xs={10}>
              <h1 className="landingpage-title timer-title"> Hurry Up! </h1>
              <p className="section-text timer-text">
                It's very closed to our conference.
              </p>
            </Col>
          </Row>
          <Row around="xs">
            <Col>
              <div id="timer">
                <div className="small-timer">
                  <span id="days">{this.state.days}</span>
                  <div className="small-text">days</div>
                </div>
                <div className="small-timer">
                  <span id="hours">{this.state.hours}</span>
                  <div className="small-text">hours</div>
                </div>
                <div className="small-timer">
                  <span id="minutes">{this.state.minutes}</span>
                  <div className="small-text">minutes</div>
                </div>
                <div className="small-timer">
                  <span id="seconds">{this.state.seconds}</span>
                  <div className="small-text">seconds</div>
                </div>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
export default CountDownTimer;
