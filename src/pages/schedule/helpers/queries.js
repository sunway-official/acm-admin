import { gql } from 'react-apollo';
export const GET_ACTIVITIES_BY_CONFERENCE_ID_QUERY = gql`
  query getActivitiesByConferenceID($conference_id: ID!) {
    getActivitiesByConferenceID(conference_id: $conference_id) {
      id
      title
      description
      conference {
        start_date
        end_date
      }
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

export const GET_CONFERENCE_BY_ID = gql`
  query getConferenceByID($id: ID!) {
    getConferenceByID(id: $id) {
      id
      start_date
      end_date
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
  GET_CONFERENCE_BY_ID,
};
