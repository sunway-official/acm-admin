import { gql } from 'react-apollo';

export const GET_LANDING_PAGE_BY_CONFERENCE_ID_QUERY = gql`
  query getLandingPageByConferenceId($conference_id: ID!) {
    getLandingPageByConferenceId(conference_id: $conference_id) {
      id
      speaker_description
      register_description
      call_paper_description
      slogan
      conference {
        title
        address {
          street
          city
          country
        }
        description
        start_date
        end_date
      }
    }
  }
`;

export default {
  GET_LANDING_PAGE_BY_CONFERENCE_ID_QUERY,
};
