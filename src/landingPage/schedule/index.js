import React from 'react';
import { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { queries } from '../helpers';
import * as moment from 'moment';
import { functions } from '../helpers';
import ScheduleForm from './scheduleForm';

class LandingPageSchedule extends Component {
  constructor(props) {
    super(props);
    this.sortActivities = this.sortActivities.bind(this);
  }
  sortActivities(events) {
    var i;
    var j;
    var temp;
    for (i = 0; i < events.length; i++) {
      for (j = i + 1; j < events.length; j++) {
        if (moment(events[i].start).isAfter(events[j].start)) {
          temp = events[i];
          events[i] = events[j];
          events[j] = temp;
        }
      }
    }
  }
  render() {
    const { loading, getActivitiesByConferenceID } = this.props.data;
    if (loading) return <div>loading</div>;
    const events = functions.getEvents(getActivitiesByConferenceID);
    this.sortActivities(events);
    return (
      <div className="landingpage-body">
        <div className="container">
          <div className="cbp-af-header">
            <div className="cbp-af-inner">
              <h2>ACM</h2>
              <nav>
                <a href="" className="home">
                  Home
                </a>
                <a href="">Speaker</a>
                <a href="">Paper</a>
                <a href="/landingpage/schedule">Schedule</a>
                <a href="">Contact Us</a>
                <button className="btn get-ticket">Get Ticket</button>
              </nav>
            </div>
          </div>
          <div className="main">
            <ScheduleForm events={events} />
          </div>
        </div>
      </div>
    );
  }
}
export default compose(
  graphql(queries.GET_ACTIVITIES_BY_CONFERENCE_ID_QUERY, {
    options: ownProps => ({
      variables: { conference_id: ownProps.match.params.conference_id },
    }),
  }),
)(LandingPageSchedule);
