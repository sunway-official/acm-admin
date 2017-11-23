import { gql } from 'react-apollo';

const UPDATE_ADDRESS_MUTATION = gql`
  mutation updateAddress($id: ID!, $lat: String!, $long: String!) {
    updateAddress(id: $id, lat: $lat, long: $long) {
      id
    }
  }
`;
const UPDATE_CONFERENCE_MUTATION = gql`
  mutation updateConference(
    $id: ID!
    $title: String
    $description: String
    $start_date: Date
    $end_date: Date
  ) {
    updateConference(
      id: $id
      title: $title
      description: $description
      start_date: $start_date
      end_date: $end_date
    ) {
      id
      title
      description
      start_date
      end_date
      address {
        id
      }
    }
  }
`;
const UPDATE_ORGANIZER_DETAIL_MUTATION = gql`
  mutation updateOrganizerDetail(
    $id: ID!
    $name: String
    $email: String
    $website: String
    $phone: String
  ) {
    updateOrganizerDetail(
      id: $id
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

const UPDATE_COORGANIZER_MUTATION = gql`
  mutation updateCoOrganizerDetail(
    $id: ID!
    $name: String!
    $email: String!
    $website: String!
    $phone: String!
  ) {
    updateCoOrganizerDetail(
      id: $id
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

const INSERT_COORGANIZER = gql`
  mutation insertCoOrganizerDetail(
    $name: String!
    $email: String!
    $website: String!
    $phone: String!
    $address: String!
  ) {
    insertCoOrganizerDetail(
      name: $name
      email: $email
      website: $website
      phone: $phone
      address: $address
    ) {
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
`;
const DELETE_COORGANIZER = gql`
  mutation deleteCoOrganizerDetail($id: ID!) {
    deleteCoOrganizerDetail(id: $id) {
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
`;

export default {
  UPDATE_ADDRESS_MUTATION,
  UPDATE_CONFERENCE_MUTATION,
  UPDATE_ORGANIZER_DETAIL_MUTATION,
  INSERT_COORGANIZER,
  UPDATE_COORGANIZER_MUTATION,
  DELETE_COORGANIZER,
};
