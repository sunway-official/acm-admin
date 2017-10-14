import { gql } from 'react-apollo';

export const UPDATE_ACTIVITY_MUTATION = gql`
  mutation updateActivity($id: ID!, $title: String!) {
    updateActivity(id: $id, title: $title) {
      id
      title
      schedules {
        id
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

export const UPDATE_SCHEDULE_MUTATION = gql`
  mutation updateSchedule($id: ID!, $start: Date!, $end: Date!, $room_id: ID!) {
    updateSchedule(id: $id, start: $start, end: $end, room_id: $room_id) {
      id
      start
      end
      room {
        id
        name
      }
    }
  }
`;

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
        id
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

export default {
  UPDATE_ACTIVITY_MUTATION,
  UPDATE_SCHEDULE_MUTATION,
  INSERT_SCHEDULE_MUTATION,
  INSERT_ACTIVITY_MUTATION,
};
