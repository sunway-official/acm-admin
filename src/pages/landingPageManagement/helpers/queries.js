import { gql } from 'react-apollo';

export const GET_LANDING_PAGE_BY_CONFERENCE_ID_QUERY = gql`
  query getLandingPageByConferenceId {
    getLandingPageByConferenceId {
      id
      speaker_description
      register_description
      call_paper_description
      slogan
      email
      facebook_id
      twitter_id
      linkedin_id
      phone_number
      conference {
        id
      }
    }
  }
`;

export default {
  GET_LANDING_PAGE_BY_CONFERENCE_ID_QUERY,
};
