import { gql } from 'react-apollo';

export const GET_LANDING_PAGE_BY_CONFERENCE_ID_QUERY = gql`
  query getLandingPageByConferenceId($conference_id: ID!) {
    getLandingPageByConferenceId(conference_id: $conference_id) {
      id
      speaker_description
      register_description
      call_paper_description
      slogan
      phone_number
      email
      facebook_id
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

export const GET_ACTIVITIES_BY_CONFERENCE_ID_QUERY = gql`
  query getActivitiesByConferenceID($conference_id: ID!) {
    getActivitiesByConferenceID(conference_id: $conference_id) {
      id
      title
      description
      schedules {
        start
        end
      }
    }
  }
`;

export default {
  GET_LANDING_PAGE_BY_CONFERENCE_ID_QUERY,
  GET_ACTIVITIES_BY_CONFERENCE_ID_QUERY,
};
