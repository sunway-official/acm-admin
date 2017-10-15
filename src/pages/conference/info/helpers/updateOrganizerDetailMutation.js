import { gql } from 'react-apollo';

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

export default UPDATE_ORGANIZER_DETAIL_MUTATION;
