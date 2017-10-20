import { gql } from 'react-apollo';
export const GET_ACTIVITIES_BY_CONFERENCE_ID_QUERY = gql`
  query getActivitiesByConferenceID($conference_id: ID!) {
    getActivitiesByConferenceID(conference_id: $conference_id) {
      id
      title
      description
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

export const GET_ALL_ROOM_QUERY = gql`
  query getAllRooms {
    getAllRooms {
      id
      name
    }
  }
`;

export default {
  GET_ACTIVITIES_BY_CONFERENCE_ID_QUERY,
  GET_ALL_ROOM_QUERY,
};
