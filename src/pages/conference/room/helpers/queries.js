import { gql } from 'react-apollo';

export const GET_ROOMS_BY_CONFERENCE_ID_QUERY = gql`
  query getRoomsByConferenceID($conference_id: ID!) {
    getRoomsByConferenceID(conference_id: $conference_id) {
      id
      name
      seats
      status
    }
  }
`;
export const GET_ROOM_BY_ID_QUERY = gql`
  query getRoomByID($id: ID!) {
    getRoomByID(id: $id) {
      id
      name
      seats
      status
      conference {
        id
      }
    }
  }
`;
export default {
  GET_ROOMS_BY_CONFERENCE_ID_QUERY,
  GET_ROOM_BY_ID_QUERY,
};
