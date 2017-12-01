import { gql } from 'react-apollo';

export const GET_LANDING_PAGE_BY_CONFERENCE_ID_QUERY = gql`
  query getLandingPageByConferenceId {
    getLandingPageByConferenceId {
      id
    }
  }
`;
export default {
  GET_LANDING_PAGE_BY_CONFERENCE_ID_QUERY,
};
