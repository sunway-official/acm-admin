import React from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import events from './events';
import AddDialog from './addDialog';

import 'react-big-calendar/lib/less/styles.less';
import './styles.less';
import './prism.less';
import {
  getEvents,
  GET_ACTIVITIES_BY_CONFERENCE_ID_QUERY,
  getDateTime,
  INSERT_SCHEDULE_MUTATION,
  INSERT_ACTIVITY_MUTATION,
} from './graphql';
import { graphql, compose } from 'react-apollo';

// const DragAndDropCalendar = withDragAndDrop(BigCalendar);

const style = {
  margin: '200px',
};

BigCalendar.momentLocalizer(moment);

class MyCalendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      events: events,
    };
    this.submit = this.submit.bind(this);
  }

  submit(values) {
    const { INSERT_ACTIVITY_MUTATION, INSERT_SCHEDULE_MUTATION } = this.props;
    const newStarTime = getDateTime(values.date, values.startTime);
    const newEndTime = getDateTime(values.date, values.endTime);
    console.log(newStarTime);
    console.log(newEndTime);
    const title = 'My new Title 5 to test function';
    const conferenceId = this.props.match.params.id;

    INSERT_ACTIVITY_MUTATION({
      variables: {
        conference_id: conferenceId,
        title: title,
      },
    })
      .then(({ data }) => {
        INSERT_SCHEDULE_MUTATION({
          variables: {
            activity_id: data.insertActivity.id,
            room_id: 1,
            start: newStarTime,
            end: newEndTime,
          },
          refetchQueries: [
            {
              query: GET_ACTIVITIES_BY_CONFERENCE_ID_QUERY,
              variables: { conference_id: conferenceId },
            },
          ],
        });
      })
      .catch(error => {
        console.log('there was an error sending the query', error);
      });
  }

  render() {
    const { loading, getActivitiesByConferenceID } = this.props.data;

    if (loading) return <div>loading</div>;

    const myEvents = getEvents(getActivitiesByConferenceID);

    return (
      <div style={style}>
        <AddDialog onSubmit={this.submit} />
        <BigCalendar
          popup
          events={events.concat(myEvents)}
          defaultView="week"
          defaultDate={new Date()}
          onSelectEvent={event => console.log(event)}
        />
      </div>
    );
  }
}

export default compose(
  graphql(GET_ACTIVITIES_BY_CONFERENCE_ID_QUERY, {
    options: ownProps => ({
      variables: { conference_id: ownProps.match.params.id },
    }),
  }),
  graphql(INSERT_ACTIVITY_MUTATION, {
    name: 'INSERT_ACTIVITY_MUTATION',
  }),
  graphql(INSERT_SCHEDULE_MUTATION, {
    name: 'INSERT_SCHEDULE_MUTATION',
  }),
)(MyCalendar);
