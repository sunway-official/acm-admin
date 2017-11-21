import { gql } from 'react-apollo';

export const SWITCH_CURRENT_CONFERENCE = gql`
  mutation switchCurrentConference($conference_id: ID!) {
    switchCurrentConference(conference_id: $conference_id) {
      id
    }
  }
`;

export default {
  SWITCH_CURRENT_CONFERENCE,
};
