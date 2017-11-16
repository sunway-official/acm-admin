import { gql } from 'react-apollo';

export const GET_ALL_PARTICIPANTS_IN_CONFERENCE = gql`
  query getAllParticipantsInConference($conference_id: ID!) {
    getAllParticipantsInConference(conference_id: $conference_id) {
      id
      firstname
      lastname
      email
    }
  }
`;

export default {
  GET_ALL_PARTICIPANTS_IN_CONFERENCE,
};
