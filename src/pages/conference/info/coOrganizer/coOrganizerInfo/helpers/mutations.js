import { gql } from 'react-apollo';

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

export default {
  INSERT_COORGANIZER,
  UPDATE_COORGANIZER_MUTATION,
};
