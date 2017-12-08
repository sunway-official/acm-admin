import { gql } from 'react-apollo';

export const GET_ALL_CONFERENCES_BY_USER_ID_QUERY = gql`
  query getConferenceByUserID($user_id: ID!) {
    getConferenceByUserID(user_id: $user_id) {
      id
      title
      description
      start_date
      end_date
      bg_image
      address {
        id
        city
      }
      organizerDetail {
        id
        name
        email
        address
        website
        phone
        user {
          id
          lastname
        }
      }
      user {
        currentConference {
          id
        }
      }
    }
  }
`;
export const GET_CONFERENCE_BY_ID_QUERY = gql`
  query getConferenceByID($id: ID!) {
    getConferenceByID(id: $id) {
      id
      title
      description
      start_date
      end_date
      organizerDetail {
        id
        name
        email
        website
        phone
      }
      coOrganizerDetails {
        id
        name
        email
        website
        phone
        conference {
          id
        }
      }
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

export const DELETE_CONFERENCE_BY_ID = gql`
  mutation deleteConference($id: ID!) {
    deleteConference(id: $id) {
      id
      title
    }
  }
`;

export const ME_QUERY = gql`
  query Me {
    me {
      id
    }
  }
`;

export default {
  GET_ALL_CONFERENCES_BY_USER_ID_QUERY,
  GET_CONFERENCE_BY_ID_QUERY,
  INSERT_CONFERENCE_MUTATION,
  INSERT_ORGANIZER_DETAIL_MUTATION,
  DELETE_CONFERENCE_BY_ID,
  ME_QUERY,
};
