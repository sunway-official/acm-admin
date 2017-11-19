import { gql } from 'react-apollo';

export const UPDATE_ACTIVITY_MUTATION = gql`
  mutation updateActivity($id: ID!, $title: String!, $description: String!) {
    updateActivity(id: $id, title: $title, description: $description) {
      id
    }
  }
`;

export const UPDATE_SCHEDULE_MUTATION = gql`
  mutation updateSchedule(
    $id: ID!
    $activity_id: ID!
    $start: Date!
    $end: Date!
    $room_id: ID!
  ) {
    updateSchedule(
      id: $id
      activity_id: $activity_id
      start: $start
      end: $end
      room_id: $room_id
    ) {
      id
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
  mutation insertActivity(
    $conference_id: ID!
    $title: String!
    $description: String!
  ) {
    insertActivity(
      conference_id: $conference_id
      title: $title
      description: $description
    ) {
      id
    }
  }
`;

export const DELETE_SCHEDULE_MUTATION = gql`
  mutation deleteSchedule($id: ID!) {
    deleteSchedule(id: $id) {
      id
    }
  }
`;
export const DELETE_ACTIVITY_MUTATION = gql`
  mutation deleteActivity($id: ID!) {
    deleteActivity(id: $id) {
      id
    }
  }
`;

export default {
  UPDATE_ACTIVITY_MUTATION,
  UPDATE_SCHEDULE_MUTATION,
  INSERT_SCHEDULE_MUTATION,
  INSERT_ACTIVITY_MUTATION,
  DELETE_SCHEDULE_MUTATION,
  DELETE_ACTIVITY_MUTATION,
};
