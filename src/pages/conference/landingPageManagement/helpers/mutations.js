import { gql } from 'react-apollo';

const UPDATE_LANDING_PAGE_MUTATION = gql`
  mutation UpdateLandingPage(
    $id: ID!
    $slogan: String
    $register_description: String
    $call_paper_description: String
    $speaker_description: String
    $email: String
    $phone_number: String
    $facebook_id: String
    $twitter_id: String
    $linkedin_id: String
  ) {
    updateLandingPage(
      id: $id
      slogan: $slogan
      register_description: $register_description
      call_paper_description: $call_paper_description
      speaker_description: $speaker_description
      email: $email
      phone_number: $phone_number
      facebook_id: $facebook_id
      twitter_id: $twitter_id
      linkedin_id: $linkedin_id
    ) {
      id
      slogan
      register_description
      call_paper_description
      speaker_description
      email
      phone_number
      facebook_id
      twitter_id
      linkedin_id
    }
  }
`;

const INSERT_LANDING_PAGE_MUTATION = gql`
  mutation insertLandingPage(
    $slogan: String!
    $register_description: String!
    $call_paper_description: String!
    $speaker_description: String!
    $email: String!
    $phone_number: String!
    $facebook_id: String!
    $twitter_id: String!
    $linkedin_id: String!
  ) {
    insertLandingPage(
      slogan: $slogan
      register_description: $register_description
      call_paper_description: $call_paper_description
      speaker_description: $speaker_description
      email: $email
      phone_number: $phone_number
      facebook_id: $facebook_id
      twitter_id: $twitter_id
      linkedin_id: $linkedin_id
    ) {
      conference {
        id
      }
      slogan
      register_description
      call_paper_description
      speaker_description
      email
      phone_number
      facebook_id
      twitter_id
      linkedin_id
    }
  }
`;

export default {
  UPDATE_LANDING_PAGE_MUTATION,
  INSERT_LANDING_PAGE_MUTATION,
};
