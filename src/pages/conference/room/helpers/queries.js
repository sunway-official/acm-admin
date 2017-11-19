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
export default {
  GET_ROOMS_BY_CONFERENCE_ID_QUERY,
};
