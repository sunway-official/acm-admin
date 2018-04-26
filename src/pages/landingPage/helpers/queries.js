import { gql } from 'react-apollo';

export const GET_LANDING_PAGE_BY_CONFERENCE_ID_QUERY = gql`
  query getLandingPageByConferenceId($conference_id: ID) {
    getLandingPageByConferenceId(conference_id: $conference_id) {
      id
      speaker_description
      register_description
      call_paper_description
      slogan
      phone_number
      email
      facebook_id
      twitter_id
      linkedin_id
      conference {
        title
        address {
          street
          city
          country
          lat
          long
        }
        description
        start_date
        end_date
        dl_release_final_paper
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
        room_name
      }
    }
  }
`;

export const GET_TOPICS_OF_CONFERENCE_QUERY = gql`
  query getTopicsOfConference {
    getTopicsOfConference {
      id
      name
      papers {
        id
        title
        status
        file
        authors {
          author_name
          corresponding
        }
      }
      conference {
        dl_release_final_paper
      }
    }
  }
`;

export default {
  GET_LANDING_PAGE_BY_CONFERENCE_ID_QUERY,
  GET_ACTIVITIES_BY_CONFERENCE_ID_QUERY,
  GET_TOPICS_OF_CONFERENCE_QUERY,
};
