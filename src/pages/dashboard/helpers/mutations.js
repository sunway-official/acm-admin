import { gql } from 'react-apollo';

export const SWITCH_CURRENT_CONFERENCE = gql`
  mutation switchCurrentConference($conference_id: ID!) {
    switchCurrentConference(conference_id: $conference_id) {
      id
    }
  }
`;

export const INSERT_CONFERENCE_MUTATION = gql`
  mutation insertConference(
    $organizer_detail_id: ID!
    $address_id: ID!
    $title: String!
    $description: String!
    $category_id: Int!
    $start_date: Date!
    $end_date: Date!
    $bg_image: String!
    $dl_submit_abstract: Date!
    $dl_review_abstract: Date!
    $dl_release_abstract: Date!
    $dl_re_submit_abstract: Date!
    $dl_re_review_abstract: Date!
    $dl_release_final_abstract: Date!
    $dl_submit_paper: Date!
    $dl_review_paper: Date!
    $dl_release_paper: Date!
    $dl_re_submit_paper: Date!
    $dl_re_review_paper: Date!
    $dl_release_final_paper: Date!
    $dl_registration: Date!
  ) {
    insertConference(
      organizer_detail_id: $organizer_detail_id
      address_id: $address_id
      title: $title
      description: $description
      category_id: $category_id
      start_date: $start_date
      end_date: $end_date
      bg_image: $bg_image
      dl_submit_abstract: $dl_submit_abstract
      dl_review_abstract: $dl_review_abstract
      dl_release_abstract: $dl_release_abstract
      dl_re_submit_abstract: $dl_re_submit_abstract
      dl_re_review_abstract: $dl_re_review_abstract
      dl_release_final_abstract: $dl_release_final_abstract
      dl_submit_paper: $dl_submit_paper
      dl_review_paper: $dl_review_paper
      dl_release_paper: $dl_release_paper
      dl_re_submit_paper: $dl_re_submit_paper
      dl_re_review_paper: $dl_re_review_paper
      dl_release_final_paper: $dl_release_final_paper
      dl_registration: $dl_registration
    ) {
      id
      organizerDetail {
        id
        name
        address
      }
      address {
        street
        city
        country
      }
      title
      description
      category_id
      start_date
      end_date
      bg_image
      dl_submit_abstract
      dl_review_abstract
      dl_release_abstract
      dl_re_submit_abstract
      dl_re_review_abstract
      dl_release_final_abstract
      dl_submit_paper
      dl_review_paper
      dl_release_paper
      dl_re_submit_paper
      dl_re_review_paper
      dl_release_final_paper
      dl_registration
    }
  }
`;

export const INSERT_ORGANIZER_DETAIL_MUTATION = gql`
  mutation insertOrganizerDetail(
    $user_id: ID!
    $address: String!
    $name: String!
    $email: String!
    $website: String!
    $phone: String!
  ) {
    insertOrganizerDetail(
      user_id: $user_id
      address: $address
      name: $name
      email: $email
      website: $website
      phone: $phone
    ) {
      id
      name
      address
      email
      website
      phone
    }
  }
`;

export const INSERT_ADDRESS_MUTATION = gql`
  mutation insertAddress(
    $street: String!
    $city: String!
    $country: String!
    $lat: String!
    $long: String!
  ) {
    insertAddress(
      street: $street
      city: $city
      country: $country
      lat: $lat
      long: $long
    ) {
      id
    }
  }
`;

export const INSERT_CONFERENCE_ATTENDEE_MUTATION = gql`
  mutation insertConferenceAttendee($conference_id: ID!, $user_id: ID!) {
    insertConferenceAttendee(conference_id: $conference_id, user_id: $user_id) {
      id
    }
  }
`;

const ME_QUERY = gql`
  query Me {
    me {
      id
      firstname
      lastname
      gender
      email
      bio
      dob
      avatar
      linkedin_id
      facebook_id
      twitter_id
      position
      organization
      currentConference {
        id
        title
        description
        start_date
        end_date
        address {
          id
          lat
          long
        }
        organizerDetail {
          id
          name
          email
          website
          phone
        }
      }
    }
  }
`;

export default {
  SWITCH_CURRENT_CONFERENCE,
  INSERT_CONFERENCE_MUTATION,
  INSERT_ORGANIZER_DETAIL_MUTATION,
  INSERT_ADDRESS_MUTATION,
  ME_QUERY,
  INSERT_CONFERENCE_ATTENDEE_MUTATION,
};
