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
    $start_date: Date!
    $end_date: Date!
    $bg_image: String!
  ) {
    insertConference(
      organizer_detail_id: $organizer_detail_id
      address_id: $address_id
      title: $title
      description: $description
      start_date: $start_date
      end_date: $end_date
      bg_image: $bg_image
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
      start_date
      end_date
      bg_image
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
