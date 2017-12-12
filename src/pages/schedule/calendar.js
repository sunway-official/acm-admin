import React from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import AddActivityButton from './addActivityButton';
// import EditActivity from './editActivity';
import { IconButton, Subheader, Toggle } from 'material-ui';
import { Link } from 'react-router-dom';
import {
  // NavigationClose,
  HardwareKeyboardArrowRight,
  ActionHome,
} from 'material-ui/svg-icons';
import { withRouter } from 'react-router';

import { functions, queries } from './helpers';
import { graphql, compose } from 'react-apollo';
import './css/style.css';
import Loading from 'components/render/renderLoading';

BigCalendar.momentLocalizer(moment);

const style = {
  width: '94%',
  padding: '20px',
};

class MyCalendar extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleTimeFormat = this.handleTimeFormat.bind(this);
    this.state = {
      timeFormat: 7,
    };
  }

  handleTimeFormat() {
    this.state.timeFormat === 7
      ? this.setState({
          timeFormat: 0,
        })
      : this.setState({
          timeFormat: 7,
        });
  }

  render() {
    const { loading, getActivitiesByConferenceID } = this.props.data;

    if (loading) return <Loading />;

    const events = functions.getEvents(getActivitiesByConferenceID);
    const today = new Date();

    return (
      <div className="conference">
        <Subheader className="subheader paper-title">
          Activity Schedule
        </Subheader>
        <div className="page-breadcrumb d-flex">
          <Link className="d-flex" to="/conference/info">
            <IconButton>
              <ActionHome />
            </IconButton>
            <span>Conference Information</span>
          </Link>
          <IconButton>
            <HardwareKeyboardArrowRight />
          </IconButton>
          <span>Activity Schedule</span>
        </div>
        <div className="dashboard content d-flex">
          <BigCalendar
            style={style}
            popup
            events={events}
            defaultView="week"
            defaultDate={today}
            onSelectEvent={event => {
              const checkDate = moment(event.start).isAfter(moment());

              if (checkDate) {
                // eslint-disable-next-line
                if (event.paper_id == 0) {
                  this.props.history.push(
                    '/conference/activities/edit-activity-title/' + event.id,
                  );
                } else {
                  this.props.history.push(
                    '/conference/activities/edit-activity-paper/' + event.id,
                  );
                }
              }
            }}
            min={
              new Date(
                today.getFullYear(),
                today.getMonth(),
                today.getDate(),
                this.state.timeFormat,
              )
            }
            components={{
              event: functions.Event,
            }}
          />
          <AddActivityButton />
          <div id="format-time">
            <Toggle label="24h" onToggle={this.handleTimeFormat} />
          </div>
        </div>
      </div>
    );
  }
}

export default compose(
  withRouter,
  graphql(queries.GET_ACTIVITIES_BY_CONFERENCE_ID_QUERY),
)(MyCalendar);
