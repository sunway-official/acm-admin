import { gql } from 'react-apollo';

export const GET_ACTIVITIES_BY_CONFERENCE_ID_QUERY = gql`
  query getActivitiesByConferenceID($conference_id: ID!) {
    getActivitiesByConferenceID(conference_id: $conference_id) {
      id
      title
      schedules {
        start
        end
        room {
          id
          name
        }
      }
    }
  }
`;

export const getEvents = array => {
  let myEvents = [];
  array.map(item =>
    item.schedules.map(schedule => {
      const start = new Date(schedule.start);
      const setStart = new Date(start.setHours(start.getHours() - 7));

      const end = new Date(schedule.end);
      const setEnd = new Date(end.setHours(end.getHours() - 7));

      const event = {
        title: item.title,
        start: setStart,
        end: setEnd,
        desc: schedule.room.name,
      };
      myEvents.push(event);
      return myEvents;
    }),
  );

  return myEvents;
};

export const getDateTime = (date, time) => {
  const getFullYear = date.getFullYear();
  const getMonth = date.getMonth();
  const getDate = date.getDate();

  const getHours = time.getHours();
  const getMinutes = time.getMinutes();

  const dateTime = new Date(
    Date.UTC(getFullYear, getMonth, getDate, getHours, getMinutes),
  );

  return dateTime;
};

export const INSERT_SCHEDULE_MUTATION = gql`
  mutation insertSchedule(
    $activity_id: ID!
    $room_id: ID!
    $start: Date!
    $end: Date!
  ) {
    insertSchedule(
      activity_id: $activity_id
      room_id: $room_id
      start: $start
      end: $end
    ) {
      id
    }
  }
`;

export const INSERT_ACTIVITY_MUTATION = gql`
  mutation insertActivity($conference_id: ID!, $title: String!) {
    insertActivity(conference_id: $conference_id, title: $title) {
      id
      title
      schedules {
        start
        end
        room {
          id
          name
        }
      }
    }
  }
`;
