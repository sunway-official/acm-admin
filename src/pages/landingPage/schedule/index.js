import React from 'react';
import { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { queries } from '../helpers';
import * as moment from 'moment';
import { functions } from '../helpers';
import ScheduleForm from './scheduleForm';
import Footer from '../section/footer';
import Header from '../section/header';
import Loading from 'components/render/renderLoading';
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
    const {
      loading,
      getActivitiesByConferenceID,
    } = this.props.GET_ACTIVITIES_BY_CONFERENCE_ID_QUERY;
    if (loading) return <Loading />;
    const events = functions.getEvents(getActivitiesByConferenceID);
    this.sortActivities(events);
    return (
      <div className="landingpage-body">
        <div className="container">
          <div className="cbp-af-header">
            <Header conference_id={this.props.match.params.conference_id} />
          </div>
          <div className="main">
            <ScheduleForm events={events} />
            <Footer conference_id={this.props.match.params.conference_id} />
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
    name: 'GET_ACTIVITIES_BY_CONFERENCE_ID_QUERY',
  }),
)(LandingPageSchedule);
